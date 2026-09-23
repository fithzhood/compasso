(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'numeri-complessi',
  titolo: 'Numeri complessi',

  introduzione: R`Quale numero, elevato al quadrato, dà $-1$? Fra i numeri reali nessuno: un quadrato non è mai negativo. Eppure nel Cinquecento i matematici si accorsero che, per risolvere certe equazioni di terzo grado con soluzioni del tutto normali, la formula li costringeva a passare per $\sqrt{-1}$. Invece di fermarsi, provarono a usarla come un numero nuovo, e i conti tornavano.

Quel numero nuovo si chiama $i$, e con lui si costruiscono i **numeri complessi**, scritti come $a + bi$ con $a$ e $b$ reali. L'insieme si indica con $\mathbb{C}$ e contiene i numeri reali (quelli con $b = 0$). In $\mathbb{C}$ ogni equazione di secondo grado ha soluzioni, anche con $\Delta < 0$. E i numeri complessi si possono disegnare come punti di un piano: moltiplicarli vuol dire far girare quei punti. Per questo servono in fisica per le onde e le correnti alternate, e in grafica per le rotazioni.

Servono le equazioni di secondo grado (discriminante e formula risolutiva) e seno e coseno, perché la forma più utile dei numeri complessi, quella trigonometrica, è scritta con loro.`,

  inBreve: [
    R`$i$ è il numero con $i^2 = -1$. Ogni volta che in un calcolo compare $i^2$, al suo posto si scrive $-1$.`,
    R`Un numero complesso $a + bi$ si somma, si sottrae e si moltiplica come un binomio; per dividere si moltiplicano sopra e sotto per il **coniugato** del denominatore, $c - di$.`,
    R`Nel piano di Gauss $a + bi$ è il punto $(a; b)$. Il **modulo** $\lvert z \rvert = \sqrt{a^2 + b^2}$ è la sua distanza dall'origine, l'**argomento** $\theta$ è l'angolo con l'asse reale positivo.`,
    R`In forma trigonometrica $z = \rho(\cos\theta + i\sin\theta)$: nel prodotto i moduli si moltiplicano e gli argomenti si **sommano**. Moltiplicare vuol dire girare e allungare.`,
    R`Le radici $n$-esime di un numero complesso sono sempre $n$: stanno sui vertici di un poligono regolare con centro nell'origine.`
  ],

  sezioni: [
    { id: 'perche-servono', titolo: 'Perché servono i numeri complessi', testo: R`L'equazione $x^2 + 1 = 0$, cioè $x^2 = -1$, non ha soluzioni reali, perché il quadrato di un numero reale non è mai negativo. Per le equazioni di secondo grado con $\Delta < 0$ si dice lo stesso: nessuna soluzione reale.

Finché si trattava di equazioni di secondo grado, ci si poteva fermare lì. Il problema vero arrivò nel Cinquecento con le equazioni di terzo grado. La formula di del Ferro, Tartaglia e Cardano per risolvere $x^3 = px + q$, in certi casi, chiede di calcolare la radice quadrata di un numero negativo **anche quando l'equazione ha tre soluzioni reali**.

Per esempio $x^3 = 15x + 4$ ha la soluzione $x = 4$ (basta sostituire: $64 = 60 + 4$), ma la formula, a metà strada, porta a $\sqrt{-121}$. Sono i **casi irriducibili**: il risultato è un normalissimo numero reale, ma per arrivarci si passa per una radice "impossibile".

Rafael Bombelli, nel 1572, decise di non buttare via quella radice e scrisse le regole per farci i conti. Con quelle regole la formula dava $x = 4$, il risultato giusto.

>* I numeri complessi nascono aggiungendo ai reali un numero nuovo, $i$, con la proprietà $i^2 = -1$. Così anche $x^2 + 1 = 0$ ha soluzioni: $x = i$ e $x = -i$.

?? Quante soluzioni ha l'equazione $x^2 + 4 = 0$?
[x] nessuna reale, due complesse: $2i$ e $-2i$
[ ] nessuna, in nessun insieme numerico
[ ] una sola: $x = -2$
=> $(2i)^2 = 4i^2 = -4$ e $(-2i)^2 = -4$: tutti e due verificano $x^2 = -4$. Dire "nessuna soluzione" è corretto solo se ci si limita ai reali. E $-2$ non va bene: $(-2)^2 = 4$, non $-4$.

>! "Impossibile" vuol dire "impossibile nei reali". Un'equazione di secondo grado con $\Delta < 0$ in $\mathbb{C}$ ha sempre due soluzioni.` },

    { id: 'unita-immaginaria', titolo: "L'unità immaginaria e le potenze di i", testo: R`>* L'**unità immaginaria** è il numero $i$ tale che $$i^2 = -1.$$ Non è un numero reale, perché nessun numero reale ha quadrato negativo.

Con $i$ si scrive la radice quadrata di qualsiasi numero negativo: si separa il segno meno e si porta fuori come $i$. Per esempio $\sqrt{-9} = \sqrt{9}\cdot\sqrt{-1} = 3i$, e $\sqrt{-5} = i\sqrt5$.

Che cosa succede moltiplicando $i$ per sé stesso più volte? Ogni potenza è la precedente per $i$, e ogni volta che compare $i^2$ si scrive $-1$:

| potenza | calcolo | valore |
|---|---|---|
| $i^1$ | si parte da $i$ | $i$ |
| $i^2$ | per definizione | $-1$ |
| $i^3$ | $i^2 \cdot i = -1 \cdot i$ | $-i$ |
| $i^4$ | $i^3 \cdot i = -i^2$ | $1$ |
| $i^5$ | $i^4 \cdot i = 1 \cdot i$ | $i$ |

Con $i^4 = 1$ si torna al punto di partenza, e da lì i quattro valori $i, -1, -i, 1$ si ripetono sempre nello stesso ordine: le potenze di $i$ hanno **periodo 4**. Per calcolare $i^n$ con $n$ grande conta solo il resto della divisione di $n$ per $4$.

~ i^{102} :: esponente grande: tolgo i giri completi da $4$
~ i^{\evid{4\cdot 25 + 2}} :: $102$ diviso $4$ fa $25$ con resto $2$
~ \evid{\left(i^4\right)^{25}}\cdot i^2 :: proprietà delle potenze
~ \evid{1}\cdot i^2 :: $i^4 = 1$, e $1$ elevato a qualunque numero resta $1$
~ i^2 = \evidb{-1} :: conta solo il resto

?? Quanto vale $i^{37}$?
[x] $i$
[ ] $-1$
[ ] $-i$
[ ] $1$
=> $37 = 4\cdot 9 + 1$: il resto è $1$, quindi $i^{37} = i^1 = i$. Il quoziente $9$ conta solo i giri completi, che valgono $1$: non va usato come esponente.

>! $i^2$ non va lasciato com'è: vale $-1$, un numero reale negativo. Dimenticare il segno meno quando si sostituisce $i^2$ è l'errore più frequente in ogni calcolo con i numeri complessi.` },

    { id: 'forma-algebrica', titolo: 'La forma algebrica', testo: R`Mettendo insieme un numero reale e un multiplo di $i$ si ottiene un numero complesso.

>* Un numero complesso in **forma algebrica** si scrive $$z = a + bi, \qquad a, b \in \mathbb{R}.$$ $a$ è la **parte reale**, $\text{Re}(z) = a$; $b$ è la **parte immaginaria**, $\text{Im}(z) = b$. L'insieme dei numeri complessi si indica con $\mathbb{C}$.

Due casi particolari hanno un nome:

- se $b = 0$, $z = a$ è un numero **reale**: i reali sono complessi con parte immaginaria nulla, quindi $\mathbb{R} \subset \mathbb{C}$;
- se $a = 0$ e $b \ne 0$, $z = bi$ si dice **immaginario puro**.

?? Qual è la parte immaginaria di $z = 4 - 7i$?
[x] $-7$
[ ] $-7i$
[ ] $7$
[ ] $4$
=> La parte immaginaria è il **numero reale** che moltiplica $i$, con il suo segno: $-7$. Scrivere $-7i$ è l'errore più frequente, perché $\text{Im}(z)$ è un numero reale e la $i$ non ne fa parte.

Due numeri complessi sono **uguali** solo se hanno la stessa parte reale **e** la stessa parte immaginaria: $a+bi = c+di$ vuol dire $a=c$ e $b=d$. Così un'uguaglianza fra numeri complessi si spezza in due equazioni fra numeri reali.

~ (x+2) + (y-3)i = 5 - i :: cerco $x$ e $y$ reali
~ \evid{x+2 = 5} \quad\text{e}\quad \evidb{y-3 = -1} :: parte reale con parte reale, parte immaginaria con parte immaginaria
~ x = 3 \quad\text{e}\quad y = 2 :: due equazioni di primo grado

> $3+2i$, $2i+3$ e $3+i\cdot2$ sono lo stesso numero: l'ordine degli addendi non conta. La scrittura $a+bi$, con la parte reale davanti, si usa perché si confronta a colpo d'occhio.` },

    { id: 'piano-di-gauss', titolo: 'Il piano di Gauss: modulo e argomento', testo: R`I numeri reali si disegnano su una retta. Un numero complesso ha due parti, $a$ e $b$, e per disegnarlo serve un piano.

>* Nel **piano di Gauss** il numero $z = a + bi$ è il punto di coordinate $(a; b)$. Sull'asse orizzontale, l'**asse reale**, stanno i numeri reali; sull'asse verticale, l'**asse immaginario**, gli immaginari puri.

Per esempio $3 + 2i$ è il punto $(3; 2)$, il numero reale $-2$ è il punto $(-2; 0)$ e l'immaginario puro $3i$ è il punto $(0; 3)$.

Un punto del piano si può anche individuare dicendo **quanto è lontano** dall'origine e **in che direzione**. Per i numeri complessi queste due informazioni hanno un nome.

>* Il **modulo** $\lvert z \rvert$ è la distanza di $z$ dall'origine. Per il teorema di Pitagora, $$\lvert z \rvert = \sqrt{a^2 + b^2}.$$ L'**argomento** $\theta$ è l'angolo fra il semiasse reale positivo e la semiretta che va dall'origine a $z$, misurato in senso antiorario.

Trascina il punto $z$. Guarda il triangolo rettangolo con i cateti lunghi $\lvert a \rvert$ e $\lvert b \rvert$: il modulo è la sua ipotenusa. Poi porta $z$ sotto l'asse reale e guarda che cosa fa l'argomento.

[[grafico:gauss]]

~ \lvert 3 - 4i \rvert :: modulo di $z = 3 - 4i$, cioè del punto $(3; -4)$
~ \sqrt{3^2 + \evid{(-4)^2}} :: Pitagora: il segno di $b$ sparisce nel quadrato
~ \sqrt{9 + 16} = \sqrt{25} = \evidb{5} :: il punto dista $5$ dall'origine

?? Quanto vale il modulo di $z = -6i$?
[x] $6$
[ ] $-6$
[ ] $6i$
[ ] $36$
=> $-6i$ è il punto $(0; -6)$, che dista $6$ dall'origine: $\sqrt{0^2 + (-6)^2} = 6$. Il modulo è una distanza, quindi è un numero reale e mai negativo: $-6$ e $6i$ non possono esserlo. $36$ è il quadrato del modulo, a cui manca la radice.

>! $\lvert a + bi \rvert$ **non** è $a + b$: per $3 - 4i$ darebbe $-1$, un numero negativo, mentre la distanza è $5$. I quadrati sotto radice non si saltano.` },

    { id: 'coniugato-modulo', titolo: 'Il coniugato', testo: R`Dato $z = a + bi$, il numero che ha la stessa parte reale e la parte immaginaria cambiata di segno si chiama **coniugato** di $z$.

>* Il **coniugato** di $z = a + bi$ è $$\overline{z} = a - bi.$$ Nel piano di Gauss è il simmetrico di $z$ rispetto all'asse reale: stessa $a$, $b$ con il segno cambiato. Per questo ha lo stesso modulo: $\lvert \overline z \rvert = \lvert z \rvert$.

Per esempio il coniugato di $3 - 4i$ è $3 + 4i$, e il coniugato del numero reale $5$ è $5$ stesso.

Il coniugato serve soprattutto per una proprietà: moltiplicando un numero per il suo coniugato, la $i$ sparisce.

~ z \cdot \overline{z} = (a + bi)(a - bi) :: somma per differenza
~ a^2 - \evid{(bi)^2} :: prodotto notevole: quadrato del primo meno quadrato del secondo
~ a^2 - b^2\evid{i^2} :: $(bi)^2 = b^2 i^2$
~ a^2 - b^2\cdot\evid{(-1)} = \evidb{a^2 + b^2} :: $i^2 = -1$: il risultato è reale, ed è il quadrato del modulo

>* $z \cdot \overline z = a^2 + b^2 = \lvert z \rvert^2$: il prodotto di un numero complesso per il suo coniugato è sempre un numero reale, positivo o nullo. È il trucco che permette di dividere.

Controllo con $z = 3 - 4i$: $(3 - 4i)(3 + 4i) = 9 + 16 = 25 = 5^2$.

?? Qual è il coniugato di $-2 + 5i$?
[x] $-2 - 5i$
[ ] $2 - 5i$
[ ] $2 + 5i$
=> Si cambia segno **solo** alla parte immaginaria: $-2 - 5i$. La risposta $2 - 5i$ cambia segno a tutte e due le parti: quello è $-z$, l'opposto, che nel piano è il simmetrico rispetto all'origine e non rispetto all'asse reale.

>! $\overline z = a - bi$, non $-a - bi$: la parte reale resta com'è. $-a - bi$ è $-z$, un numero diverso.` },

    { id: 'operazioni', titolo: 'Le operazioni fra numeri complessi', testo: R`Con i numeri complessi si fanno i conti come con i binomi, trattando $i$ come una lettera. L'unica regola in più è che $i^2$ si sostituisce con $-1$.

### Somma e differenza

Si sommano (o si sottraggono) le parti reali fra loro e le parti immaginarie fra loro, come i termini simili di un polinomio: $$(a+bi) \pm (c+di) = (a\pm c) + (b\pm d)i.$$ Esempio: $(2+3i) + (-5+i) = (2-5)+(3+1)i = -3+4i$.

### Prodotto

Si moltiplica ogni termine del primo per ogni termine del secondo, come per due binomi, e alla fine si sostituisce $i^2 = -1$.

~ (1+2i)(3-i) :: due binomi
~ 3 - i + 6i \evid{- 2i^2} :: proprietà distributiva: quattro prodotti
~ 3 - i + 6i \evid{+ 2} :: $-2i^2 = -2\cdot(-1) = +2$
~ \evidb{5 + 5i} :: sommo le parti reali ($3 + 2$) e le immaginarie ($-i + 6i$)

In generale $(a+bi)(c+di) = (ac-bd) + (ad+bc)i$: il $-bd$ viene proprio da $bd\,i^2$.

?? Quanto fa $(2 + i)(2 - i)$?
[x] $5$
[ ] $3$
[ ] $4 - i^2$, che non si può semplificare
[ ] $5 - 4i$
=> È una somma per differenza: $4 - i^2 = 4 - (-1) = 5$, un numero reale. Chi risponde $3$ ha scritto $i^2 = 1$; $4 - i^2$ è giusto a metà, perché $i^2$ va sempre sostituito con $-1$.

### Quoziente

Per dividere, il trucco è far sparire la $i$ dal denominatore. Come nella razionalizzazione, si moltiplicano numeratore e denominatore per lo stesso numero: il **coniugato del denominatore**. Il denominatore diventa $c^2 + d^2$, un numero reale.

~ \frac{3+i}{1-i} :: al denominatore c'è $1 - i$: il suo coniugato è $1 + i$
~ \frac{(3+i)\evid{(1+i)}}{(1-i)\evid{(1+i)}} :: moltiplico sopra e sotto per $1+i$: la frazione non cambia valore
~ \frac{3 + 3i + i + \evid{i^2}}{1 - \evid{i^2}} :: sopra la distributiva, sotto la somma per differenza
~ \frac{2 + 4i}{\evid{2}} :: $i^2 = -1$: sopra $3 - 1 = 2$, sotto $1 + 1 = 2$
~ \evidb{1 + 2i} :: divido per $2$ la parte reale e quella immaginaria

>* Somma: parti reali con parti reali, immaginarie con immaginarie. Prodotto: distributiva e $i^2 = -1$. Quoziente: sopra e sotto per il coniugato del denominatore, $$\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{c^2+d^2}.$$

>! Nel quoziente si moltiplica per il coniugato del **denominatore**, non del numeratore: con il coniugato del numeratore la $i$ resta sotto, e non si è concluso niente.` },

    { id: 'forma-trigonometrica', titolo: 'La forma trigonometrica', testo: R`Un numero complesso si può dare con le coordinate $a$ e $b$, oppure con il modulo e l'argomento: quanto è lontano dall'origine e in che direzione. Il modulo si indica anche con $\rho$ (si legge "ro"), l'argomento con $\theta$.

Come si passa da $\rho$ e $\theta$ ad $a$ e $b$? Nel triangolo rettangolo che ha per ipotenusa il segmento da $O$ a $z$, i cateti sono $a$ e $b$. Con la trigonometria: $$a = \rho\cos\theta, \qquad b = \rho\sin\theta.$$ Sostituendo in $z = a + bi$ e raccogliendo $\rho$ si ottiene la forma trigonometrica.

>* **Forma trigonometrica:** $$z = \rho(\cos\theta+i\sin\theta),$$ dove $\rho = \lvert z \rvert = \sqrt{a^2+b^2}$ è il modulo e $\theta$ è l'argomento, con $\cos\theta=\dfrac{a}{\rho}$ e $\sin\theta=\dfrac{b}{\rho}$.

Trascina il punto $z$ lungo la circonferenza, e con il cursore cambia il modulo $\rho$. I numeri in alto sono la parte reale e la parte immaginaria: guarda quando diventano negativi.

[[grafico:argomento]]

Dalla forma trigonometrica a quella algebrica basta fare i conti: $2(\cos 30^\circ + i\sin 30^\circ) = 2\cdot\frac{\sqrt3}{2} + 2\cdot\frac12 i = \sqrt3 + i$. Il verso opposto chiede più attenzione, perché bisogna trovare l'angolo.

~ z = 1 + i\sqrt3 :: $a = 1$, $b = \sqrt3$
~ \rho = \sqrt{1 + 3} = \evid{2} :: prima il modulo
~ \cos\theta = \evid{\frac12}, \quad \sin\theta = \evid{\frac{\sqrt3}{2}} :: divido $a$ e $b$ per il modulo
~ \theta = \evid{60^\circ} :: coseno e seno positivi: primo quadrante, e l'angolo noto è $60^\circ$
~ z = \evidb{2\left(\cos 60^\circ + i\sin 60^\circ\right)} :: si mettono insieme modulo e argomento

?? Qual è l'argomento di $z = -1 - i$?
[x] $225^\circ$
[ ] $45^\circ$
[ ] $135^\circ$
[ ] $315^\circ$
=> $-1 - i$ è il punto $(-1; -1)$, nel terzo quadrante: $\theta = 180^\circ + 45^\circ = 225^\circ$. Chi risponde $45^\circ$ ha usato solo $\tan\theta = \frac{b}{a} = \frac{-1}{-1} = 1$, ma la tangente vale $1$ sia a $45^\circ$ sia a $225^\circ$: per scegliere bisogna guardare i segni di $a$ e $b$.

>! Per trovare $\theta$ non basta $\tan\theta = \frac{b}{a}$: la tangente si ripete ogni $180^\circ$ e non distingue il primo quadrante dal terzo, né il secondo dal quarto. Prima di scrivere l'angolo, disegna il punto e guarda in che quadrante sta.` },

    { id: 'de-moivre', titolo: 'Prodotto, quoziente e De Moivre', testo: R`Che cosa succede, nel piano di Gauss, quando si moltiplica per $i$? Prendi $z = 2 + i$: $\;i(2 + i) = 2i + i^2 = -1 + 2i$. Il punto $(2; 1)$ è finito in $(-1; 2)$: stessa distanza dall'origine, ruotato di un quarto di giro. Moltiplicare per $i$ fa girare di $90^\circ$.

In generale, se $z_1=\rho_1(\cos\theta_1+i\sin\theta_1)$ e $z_2=\rho_2(\cos\theta_2+i\sin\theta_2)$, facendo il prodotto e usando le formule di addizione del seno e del coseno si trova:

$$z_1 z_2 = \rho_1\rho_2\left[\cos(\theta_1+\theta_2) + i\sin(\theta_1+\theta_2)\right]$$

$$\frac{z_1}{z_2} = \frac{\rho_1}{\rho_2}\left[\cos(\theta_1-\theta_2) + i\sin(\theta_1-\theta_2)\right]$$

>* Nel **prodotto** i moduli si moltiplicano e gli argomenti si **sommano**; nel **quoziente** i moduli si dividono e gli argomenti si sottraggono.

Trascina $z_1$ dove vuoi e fai girare $z_2$ sulla sua circonferenza; con il cursore cambia il modulo di $z_2$. Confronta l'argomento del prodotto con la somma dei due argomenti.

[[grafico:prodotto]]

Moltiplicando $z$ per sé stesso $n$ volte, il modulo si moltiplica $n$ volte per $\rho$ e l'argomento si somma $n$ volte a sé stesso.

>* **Formula di De Moivre**, per $n$ naturale: $$z^n = \rho^n\left(\cos n\theta + i\sin n\theta\right)$$ Il modulo si **eleva** alla $n$, l'argomento si **moltiplica** per $n$.

~ (1+i)^6 :: sei moltiplicazioni in forma algebrica sarebbero lunghe
~ \left[\evid{\sqrt2\left(\cos45^\circ + i\sin45^\circ\right)}\right]^6 :: forma trigonometrica: $\rho = \sqrt{1+1} = \sqrt2$, e $(1;1)$ sta sulla bisettrice del primo quadrante
~ \evid{(\sqrt2)^6}\left(\cos(\evid{6\cdot45^\circ}) + i\sin(\evid{6\cdot45^\circ})\right) :: De Moivre: il modulo alla sesta, l'argomento per sei
~ 8\left(\cos 270^\circ + i\sin 270^\circ\right) :: $(\sqrt2)^6 = 2^3 = 8$ e $6\cdot45^\circ = 270^\circ$
~ 8(0 - i) = \evidb{-8i} :: $\cos 270^\circ = 0$ e $\sin 270^\circ = -1$

?? Quanto vale $\left[2(\cos 30^\circ + i\sin 30^\circ)\right]^3$?
[x] $8(\cos 90^\circ + i\sin 90^\circ) = 8i$
[ ] $6(\cos 90^\circ + i\sin 90^\circ) = 6i$
[ ] $8(\cos 30^\circ + i\sin 30^\circ)$
[ ] $2(\cos 90^\circ + i\sin 90^\circ) = 2i$
=> Il modulo si eleva al cubo, $2^3 = 8$, e l'argomento si moltiplica per tre, $3\cdot 30^\circ = 90^\circ$: il risultato è $8i$. La risposta $6i$ moltiplica il modulo per $3$ invece di elevarlo; la terza eleva il modulo ma dimentica di moltiplicare l'argomento.

>! $(\sqrt2)^6$ non è $6\sqrt2$: il modulo va **elevato** alla $n$, l'argomento va **moltiplicato** per $n$. Sono due operazioni diverse su due numeri diversi.` },

    { id: 'radici-equazioni-esponenziale', titolo: 'Radici n-esime, equazioni e forma esponenziale', testo: R`### Le radici n-esime

Una radice $n$-esima di $w$ è un numero $z$ tale che $z^n = w$. Con De Moivre, elevare alla $n$ vuol dire elevare il modulo e moltiplicare l'argomento per $n$. Per fare il contrario si prende la radice del modulo e si **divide** l'argomento per $n$.

C'è però una sorpresa. Un angolo non cambia se gli si aggiunge un giro intero: $\theta$, $\theta + 360^\circ$, $\theta + 720^\circ$, … indicano la stessa direzione. Divisi per $n$, invece, danno angoli **diversi**. Per questo le radici non sono una sola.

>* Un numero complesso non nullo $w=\rho(\cos\theta+i\sin\theta)$ ha esattamente $n$ **radici $n$-esime**. Hanno tutte modulo $\sqrt[n]{\rho}$ e argomenti distanti $\frac{360^\circ}{n}$ l'uno dall'altro: sono i vertici di un **poligono regolare** di $n$ lati con centro nell'origine.

La formula, con $k=0,1,\ldots,n-1$:

$$z_k = \sqrt[n]{\rho}\left(\cos\frac{\theta+360^\circ k}{n} + i\sin\frac{\theta+360^\circ k}{n}\right)$$

~ z^3 = 1 = 1\left(\cos 0^\circ + i\sin 0^\circ\right) :: radici cubiche di $1$: modulo $1$, argomento $0^\circ$
~ z_k = \cos(\evid{120^\circ k}) + i\sin(\evid{120^\circ k}) :: $\sqrt[3]{1} = 1$; all'argomento $0^\circ$ aggiungo $k$ giri e divido per $3$: $\frac{360^\circ k}{3} = 120^\circ k$
~ z_0 = \cos 0^\circ + i\sin 0^\circ = \evidb{1} :: $k = 0$
~ z_1 = \evidb{-\frac12 + \frac{\sqrt3}{2}i} :: $k = 1$: argomento $120^\circ$, con $\cos 120^\circ = -\frac12$ e $\sin 120^\circ = \frac{\sqrt3}{2}$
~ z_2 = \evidb{-\frac12 - \frac{\sqrt3}{2}i} :: $k = 2$: argomento $240^\circ$; con $k = 3$ si tornerebbe a $z_0$

Le tre radici sono i vertici di un triangolo equilatero. Nel grafico scegli $n$ con il cursore e trascina $w$ lungo la sua circonferenza: guarda di quanto si spostano le radici quando $w$ fa un giro completo.

[[grafico:radici]]

### Equazioni di secondo grado in $\mathbb{C}$

La formula risolutiva funziona anche con $\Delta < 0$: basta scrivere $\sqrt\Delta = i\sqrt{\lvert\Delta\rvert}$.

~ x^2 - 2x + 5 = 0 :: $a = 1$, $b = -2$, $c = 5$
~ \Delta = 4 - 20 = \evid{-16} :: negativo: nessuna soluzione reale
~ x = \frac{2 \pm \evid{\sqrt{-16}}}{2} :: formula risolutiva
~ x = \frac{2 \pm \evid{4i}}{2} :: $\sqrt{-16} = \sqrt{16}\cdot\sqrt{-1} = 4i$
~ x = \evidb{1 \pm 2i} :: divido per $2$ tutti e due i termini

Le due soluzioni, $1 + 2i$ e $1 - 2i$, sono una la coniugata dell'altra. Succede sempre quando i coefficienti sono reali e $\Delta < 0$, perché il $\pm$ davanti alla radice cambia segno solo alla parte immaginaria.

### Cenni alla forma esponenziale

In analisi si dimostra la **formula di Eulero**, $e^{i\theta} = \cos\theta+i\sin\theta$, con $\theta$ in radianti. Così $z=\rho(\cos\theta+i\sin\theta)$ si scrive anche $z=\rho\, e^{i\theta}$: è la **forma esponenziale**. Con questa scrittura la regola del prodotto è quella delle potenze, $e^{i\alpha}\cdot e^{i\beta} = e^{i(\alpha+\beta)}$: gli argomenti si sommano. Per $\theta = \pi$ si ottiene $e^{i\pi} = -1$, cioè $e^{i\pi} + 1 = 0$, una formula che mette insieme $0$, $1$, $e$, $i$ e $\pi$.

?? Quante sono le radici quarte di $-16$?
[x] quattro: $\sqrt2 \pm \sqrt2\, i$ e $-\sqrt2 \pm \sqrt2\, i$
[ ] nessuna, perché $-16$ è negativo
[ ] due: $2i$ e $-2i$
[ ] una: $-2$
=> $-16 = 16(\cos 180^\circ + i\sin 180^\circ)$: le radici quarte hanno modulo $\sqrt[4]{16} = 2$ e argomenti $45^\circ$, $135^\circ$, $225^\circ$, $315^\circ$, cioè $\pm\sqrt2 \pm \sqrt2\,i$. In $\mathbb{C}$ un numero negativo ha radici di ogni indice. $2i$ non va bene: $(2i)^4 = 16i^4 = 16$, non $-16$.

>! Le radici $n$-esime sono **$n$**, non una sola: fermarsi a $k = 0$ è l'errore più frequente. Vanno scritte tutte, per $k=0,1,\ldots,n-1$.` }
  ],

  grafici: {
    gauss: {
      tipo: 'piano', x: [-5, 5], y: [-5, 5], proporzioni: 'uguali',
      etichette: { x: 'Re', y: 'Im' },
      parametri: [
        { nome: 'a', min: -4, max: 4, passo: 0.5, valore: 3, nascosto: true },
        { nome: 'b', min: -4, max: 4, passo: 0.5, valore: 2, nascosto: true }
      ],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: ['a', 0], tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: ['a', 0], a: ['a', 'b'], tratteggio: true, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['cos((pi - sign(b + 0.000001)*(pi - acos(a/sqrt(a^2 + b^2 + 0.0000001))))/2)', 'sin((pi - sign(b + 0.000001)*(pi - acos(a/sqrt(a^2 + b^2 + 0.0000001))))/2)'], raggio: 0.9, colore: 2 },
        { tipo: 'angolo', vertice: [0, 0], da: ['cos((pi - sign(b + 0.000001)*(pi - acos(a/sqrt(a^2 + b^2 + 0.0000001))))/2)', 'sin((pi - sign(b + 0.000001)*(pi - acos(a/sqrt(a^2 + b^2 + 0.0000001))))/2)'], a: ['a', 'b'], raggio: 0.9, colore: 2, etichetta: 'θ' },
        { tipo: 'vettore', da: [0, 0], a: ['a', 'b'], colore: 1 },
        { tipo: 'punto', p: ['a', 'b'], trascina: true, etichetta: 'z', posizione: 'alto-destra', colore: 1 },
        { tipo: 'testo', p: [-4.8, 4.5], testo: 'Re z = {{a}}   Im z = {{b}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.8, 3.8], testo: '|z| = {{sqrt(a^2 + b^2)}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.8, 3.1], testo: 'θ = {{round(10*(180 - sign(b + 0.000001)*(180 - acos(a/sqrt(a^2 + b^2 + 0.0000001))*180/pi)))/10}}°', ancora: 'start' }
      ],
      didascalia: 'Trascina z. Il modulo è la lunghezza della freccia, l\'argomento θ l\'angolo che parte dal semiasse reale positivo e gira in senso antiorario.'
    },
    argomento: {
      tipo: 'piano', x: [-2.6, 2.6], y: [-2.6, 3.7], passo: [1, 1],
      etichette: { x: 'Re', y: 'Im' },
      parametri: [
        { nome: 't', min: 0, max: 360, passo: 5, valore: 60, nascosto: true },
        { nome: 'r', min: 0.5, max: 2.2, passo: 0.1, valore: 2, etichetta: 'ρ (modulo)' }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 'r', tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: ['r*cos(t*pi/180)', 0], colore: 3 },
        { tipo: 'segmento', da: ['r*cos(t*pi/180)', 0], a: ['r*cos(t*pi/180)', 'r*sin(t*pi/180)'], tratteggio: true, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['cos(t*pi/360)', 'sin(t*pi/360)'], raggio: 0.5, colore: 2 },
        { tipo: 'angolo', vertice: [0, 0], da: ['cos(t*pi/360)', 'sin(t*pi/360)'], a: ['cos(t*pi/180)', 'sin(t*pi/180)'], raggio: 0.5, colore: 2, etichetta: 'θ' },
        { tipo: 'vettore', da: [0, 0], a: ['r*cos(t*pi/180)', 'r*sin(t*pi/180)'], colore: 1 },
        { tipo: 'punto', p: ['r*cos(t*pi/180)', 'r*sin(t*pi/180)'], trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true }, etichetta: 'z', posizione: 'alto-destra', colore: 1 },
        { tipo: 'testo', p: [-2.5, 3.4], testo: 'θ = {{t}}°', ancora: 'start' },
        { tipo: 'testo', p: [-2.5, 2.95], testo: 'a = {{r*cos(t*pi/180)}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.5, 2.5], testo: 'b = {{r*sin(t*pi/180)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina z lungo la circonferenza e cambia ρ con il cursore. In alto a = ρ cos θ e b = ρ sin θ.'
    },
    prodotto: {
      tipo: 'piano', x: [-4.5, 4.5], y: [-4.5, 4.5], proporzioni: 'uguali',
      etichette: { x: 'Re', y: 'Im' },
      parametri: [
        { nome: 'a', min: -2, max: 2, passo: 0.1, valore: 2, nascosto: true },
        { nome: 'b', min: -2, max: 2, passo: 0.1, valore: 1, nascosto: true },
        { nome: 't', min: 0, max: 360, passo: 5, valore: 90, nascosto: true },
        { nome: 'r', min: 0.5, max: 1.5, passo: 0.1, valore: 1, etichetta: 'modulo di z₂' }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 'r', tratteggio: true, colore: 2 },
        { tipo: 'vettore', da: [0, 0], a: ['a*r*cos(t*pi/180) - b*r*sin(t*pi/180)', 'a*r*sin(t*pi/180) + b*r*cos(t*pi/180)'], colore: 3 },
        { tipo: 'punto', p: ['a*r*cos(t*pi/180) - b*r*sin(t*pi/180)', 'a*r*sin(t*pi/180) + b*r*cos(t*pi/180)'], etichetta: 'z₁·z₂', posizione: 'alto-sinistra', colore: 3 },
        { tipo: 'vettore', da: [0, 0], a: ['a', 'b'], colore: 1 },
        { tipo: 'punto', p: ['a', 'b'], trascina: true, etichetta: 'z₁', posizione: 'alto-destra', colore: 1 },
        { tipo: 'vettore', da: [0, 0], a: ['r*cos(t*pi/180)', 'r*sin(t*pi/180)'], colore: 2 },
        { tipo: 'punto', p: ['r*cos(t*pi/180)', 'r*sin(t*pi/180)'], trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true }, etichetta: 'z₂', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [-4.4, 4.1], testo: 'arg z₁ = {{round(10*(180 - sign(b + 0.000001)*(180 - acos(a/sqrt(a^2 + b^2 + 0.0000001))*180/pi)))/10}}°', ancora: 'start' },
        { tipo: 'testo', p: [-4.4, 3.5], testo: 'arg z₂ = {{t}}°', ancora: 'start' },
        { tipo: 'testo', p: [-4.4, 2.9], testo: 'arg z₁·z₂ = {{round(10*(180 - sign(a*r*sin(t*pi/180) + b*r*cos(t*pi/180) + 0.000001)*(180 - acos((a*r*cos(t*pi/180) - b*r*sin(t*pi/180))/sqrt((a*r*cos(t*pi/180) - b*r*sin(t*pi/180))^2 + (a*r*sin(t*pi/180) + b*r*cos(t*pi/180))^2 + 0.0000001))*180/pi)))/10}}°', ancora: 'start' },
        { tipo: 'testo', p: [-4.4, -3.6], testo: '|z₁|·|z₂| = {{sqrt(a^2 + b^2)*r}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.4, -4.2], testo: '|z₁·z₂| = {{sqrt((a*r*cos(t*pi/180) - b*r*sin(t*pi/180))^2 + (a*r*sin(t*pi/180) + b*r*cos(t*pi/180))^2)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina z₁ e fai girare z₂. Il prodotto z₁·z₂ ha per argomento la somma degli argomenti, a meno di un giro intero, e per modulo il prodotto dei moduli.'
    },
    radici: {
      tipo: 'piano', x: [-2.4, 2.4], y: [-2.4, 3.1], proporzioni: 'uguali', passo: [1, 1],
      etichette: { x: 'Re', y: 'Im' },
      parametri: [
        { nome: 'n', min: 2, max: 6, passo: 1, valore: 3, etichetta: 'n (indice della radice)' },
        { nome: 't', min: 0, max: 360, passo: 5, valore: 0, nascosto: true }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 2, tratteggio: true, colore: 2 },
        { tipo: 'cerchio', centro: [0, 0], raggio: '2^(1/n)', colore: 1 },
        { tipo: 'segmento', da: ['2^(1/n)*cos(t*pi/(180*n))', '2^(1/n)*sin(t*pi/(180*n))'], a: ['2^(1/n)*cos((t + 360*min(1, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(1, n))*pi/(180*n))'], colore: 1 },
        { tipo: 'segmento', da: ['2^(1/n)*cos((t + 360*min(1, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(1, n))*pi/(180*n))'], a: ['2^(1/n)*cos((t + 360*min(2, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(2, n))*pi/(180*n))'], colore: 1 },
        { tipo: 'segmento', da: ['2^(1/n)*cos((t + 360*min(2, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(2, n))*pi/(180*n))'], a: ['2^(1/n)*cos((t + 360*min(3, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(3, n))*pi/(180*n))'], colore: 1 },
        { tipo: 'segmento', da: ['2^(1/n)*cos((t + 360*min(3, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(3, n))*pi/(180*n))'], a: ['2^(1/n)*cos((t + 360*min(4, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(4, n))*pi/(180*n))'], colore: 1 },
        { tipo: 'segmento', da: ['2^(1/n)*cos((t + 360*min(4, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(4, n))*pi/(180*n))'], a: ['2^(1/n)*cos((t + 360*min(5, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(5, n))*pi/(180*n))'], colore: 1 },
        { tipo: 'segmento', da: ['2^(1/n)*cos((t + 360*min(5, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(5, n))*pi/(180*n))'], a: ['2^(1/n)*cos((t + 360*min(6, n))*pi/(180*n))', '2^(1/n)*sin((t + 360*min(6, n))*pi/(180*n))'], colore: 1 },
        { tipo: 'punto', p: ['2^(1/n)*cos(t*pi/(180*n))', '2^(1/n)*sin(t*pi/(180*n))'], etichetta: 'z₀', colore: 1 },
        { tipo: 'punto', p: ['2^(1/n)*cos((t + 360)*pi/(180*n))', '2^(1/n)*sin((t + 360)*pi/(180*n))'], etichetta: 'z₁', colore: 1 },
        { tipo: 'punto', p: ['sqrt(n - 2.5)/sqrt(n - 2.5)*2^(1/n)*cos((t + 720)*pi/(180*n))', '2^(1/n)*sin((t + 720)*pi/(180*n))'], etichetta: 'z₂', colore: 1 },
        { tipo: 'punto', p: ['sqrt(n - 3.5)/sqrt(n - 3.5)*2^(1/n)*cos((t + 1080)*pi/(180*n))', '2^(1/n)*sin((t + 1080)*pi/(180*n))'], etichetta: 'z₃', colore: 1 },
        { tipo: 'punto', p: ['sqrt(n - 4.5)/sqrt(n - 4.5)*2^(1/n)*cos((t + 1440)*pi/(180*n))', '2^(1/n)*sin((t + 1440)*pi/(180*n))'], etichetta: 'z₄', colore: 1 },
        { tipo: 'punto', p: ['sqrt(n - 5.5)/sqrt(n - 5.5)*2^(1/n)*cos((t + 1800)*pi/(180*n))', '2^(1/n)*sin((t + 1800)*pi/(180*n))'], etichetta: 'z₅', colore: 1 },
        { tipo: 'punto', p: ['2*cos(t*pi/180)', '2*sin(t*pi/180)'], trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true }, etichetta: 'w', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-2.3, 2.9], testo: 'arg w = {{t}}°', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 2.55], testo: 'arg z₀ = {{t/n}}°', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 2.2], testo: 'passo {{360/n}}°', ancora: 'start' }
      ],
      didascalia: 'Le n radici di w stanno sulla circonferenza piena, di raggio ⁿ√2. Trascina w (sulla circonferenza tratteggiata) per un giro intero: ogni radice avanza di un solo passo.'
    }
  },

  esempi: [
    { titolo: 'Potenze di i', problema: R`Calcola $i^{37}$.`, passi: [
      R`Le potenze di $i$ si ripetono con periodo $4$: basta dividere l'esponente per $4$ e guardare il resto.`,
      R`$37 = 4\cdot 9 + 1$, quindi il resto è $1$.`,
      R`I $9$ giri completi valgono $(i^4)^9 = 1$ e non cambiano niente: resta $i^{37} = i^{1} = i$.`
    ], risultato: R`$i^{37} = i$` },

    { titolo: 'Coniugato e modulo', problema: R`Trova il coniugato e il modulo di $z = 3 - 4i$.`, passi: [
      R`Il coniugato cambia segno solo alla parte immaginaria: $\overline z = 3 + 4i$.`,
      R`Il modulo è $|z| = \sqrt{3^2 + (-4)^2} = \sqrt{9+16} = \sqrt{25} = 5$: è la stessa terna pitagorica $3$-$4$-$5$.`
    ], risultato: R`$\overline z = 3+4i$ e $|z| = 5$` },

    { titolo: 'Il quoziente di due numeri complessi', problema: R`Calcola il quoziente $\dfrac{3+i}{1-i}$.`, passi: [
      R`Moltiplico numeratore e denominatore per il coniugato del denominatore, $1+i$: la frazione non cambia valore, e il denominatore diventerà un numero reale.`,
      R`Numeratore, con la proprietà distributiva: $(3+i)(1+i) = 3+3i+i+i^2 = 3+4i-1 = 2+4i$, perché $i^2 = -1$.`,
      R`Denominatore, con la somma per differenza: $(1-i)(1+i) = 1 - i^2 = 1+1 = 2$. È reale, come previsto.`,
      R`Si divide per $2$ sia la parte reale sia quella immaginaria: $\dfrac{2+4i}{2} = 1+2i$.`
    ], risultato: R`$\dfrac{3+i}{1-i} = 1+2i$` },

    { titolo: 'Dalla forma algebrica alla trigonometrica', problema: R`Scrivi in forma trigonometrica $z = 1 + i\sqrt3$.`, passi: [
      R`Modulo: $\rho = \sqrt{1^2+(\sqrt3)^2} = \sqrt{1+3} = 2$.`,
      R`$\cos\theta = \dfrac{1}{2}$ e $\sin\theta = \dfrac{\sqrt3}{2}$: entrambi positivi, primo quadrante, quindi $\theta = 60^\circ$.`,
      R`$z = 2\left(\cos60^\circ + i\sin60^\circ\right)$.`
    ], risultato: R`$z = 2(\cos60^\circ + i\sin60^\circ)$` },

    { titolo: 'Una potenza con la formula di De Moivre', problema: R`Usa la formula di De Moivre per calcolare $(1+i)^6$.`, passi: [
      R`Forma trigonometrica di $1+i$: $\rho=\sqrt2$, $\theta=45^\circ$.`,
      R`De Moivre: $(1+i)^6 = (\sqrt2)^6\left(\cos(6\cdot45^\circ) + i\sin(6\cdot45^\circ)\right) = 8\left(\cos270^\circ+i\sin270^\circ\right)$.`,
      R`$\cos270^\circ = 0$ e $\sin270^\circ = -1$, quindi $(1+i)^6 = 8(0-i) = -8i$.`
    ], risultato: R`$(1+i)^6 = -8i$` },

    { titolo: "Un'equazione di secondo grado in campo complesso", problema: R`Risolvi in $\mathbb{C}$ l'equazione $x^2 - 2x + 5 = 0$.`, passi: [
      R`Discriminante: $\Delta = (-2)^2 - 4\cdot1\cdot5 = 4-20=-16$, negativo: nessuna soluzione reale, due soluzioni complesse coniugate.`,
      R`$\sqrt{\Delta} = \sqrt{-16} = 4i$.`,
      R`$x_{1,2} = \dfrac{2 \pm 4i}{2} = 1 \pm 2i$.`
    ], risultato: R`$x = 1-2i \lor x = 1+2i$` }
  ],

  formulario: [
    { nome: 'Unità immaginaria e potenze di i', formula: R`i^2 = -1, \qquad i^0=1,\ i^1=i,\ i^2=-1,\ i^3=-i`, nota: R`Le potenze di $i$ si ripetono con periodo $4$.` },
    { nome: 'Forma algebrica', formula: R`z = a+bi, \quad a,b \in \mathbb{R}`, nota: R`$a = \text{Re}(z)$ parte reale, $b = \text{Im}(z)$ parte immaginaria.` },
    { nome: 'Modulo', formula: R`|z| = \sqrt{a^2+b^2}` },
    { nome: 'Coniugato', formula: R`\overline{z} = a - bi`, nota: R`$z \cdot \overline{z} = a^2+b^2 = |z|^2$.` },
    { nome: 'Somma e differenza', formula: R`(a+bi) \pm (c+di) = (a\pm c) + (b\pm d)i` },
    { nome: 'Prodotto (forma algebrica)', formula: R`(a+bi)(c+di) = (ac-bd) + (ad+bc)i` },
    { nome: 'Quoziente (forma algebrica)', formula: R`\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{c^2+d^2}`, nota: R`Si moltiplica per il coniugato del denominatore.` },
    { nome: 'Forma trigonometrica', formula: R`z = \rho(\cos\theta + i\sin\theta)`, nota: R`$\rho = |z|$ modulo, $\theta$ argomento: $\cos\theta = a/\rho$, $\sin\theta = b/\rho$.` },
    { nome: 'Prodotto in forma trigonometrica', formula: R`z_1 z_2 = \rho_1\rho_2\left[\cos(\theta_1+\theta_2) + i\sin(\theta_1+\theta_2)\right]` },
    { nome: 'Quoziente in forma trigonometrica', formula: R`\frac{z_1}{z_2} = \frac{\rho_1}{\rho_2}\left[\cos(\theta_1-\theta_2) + i\sin(\theta_1-\theta_2)\right]` },
    { nome: 'Formula di De Moivre', formula: R`z^n = \rho^n\left(\cos(n\theta) + i\sin(n\theta)\right)` },
    { nome: 'Radici n-esime', formula: R`z_k = \sqrt[n]{\rho}\left(\cos\frac{\theta+360^\circ k}{n} + i\sin\frac{\theta+360^\circ k}{n}\right), \quad k=0,1,\ldots,n-1` },
    { nome: 'Equazione di secondo grado in C con Δ negativo', formula: R`x_{1,2} = \frac{-b \pm i\sqrt{|\Delta|}}{2a}`, nota: R`Valida quando $\Delta = b^2-4ac < 0$; le due soluzioni sono complesse coniugate.` },
    { nome: 'Forma esponenziale e identità di Eulero', formula: R`z = \rho e^{i\theta}, \qquad e^{i\pi}+1=0` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'perche-servono', tipo: 'concetto', fronte: R`Perché nasce l'esigenza dei numeri complessi?`, retro: R`Per risolvere $x^2+1=0$ e, soprattutto, per i "casi irriducibili" della formula di Cardano-Tartaglia: equazioni di terzo grado con tre soluzioni reali la cui formula generale richiede comunque una radice quadrata di un numero negativo.` },
    { id: 'fc-02', sezione: 'perche-servono', tipo: 'concetto', fronte: R`Che cos'è un "caso irriducibile"?`, retro: R`Un'equazione di terzo grado con tre soluzioni reali distinte, per la quale la formula risolutiva generale richiede di calcolare la radice quadrata di un numero negativo.` },
    { id: 'fc-03', sezione: 'unita-immaginaria', tipo: 'definizione', fronte: R`Unità immaginaria`, retro: R`Il numero $i$ tale che $i^2=-1$.` },
    { id: 'fc-04', sezione: 'unita-immaginaria', tipo: 'formula', fronte: R`Ciclo delle potenze di $i$`, retro: R`$i^0=1,\ i^1=i,\ i^2=-1,\ i^3=-i$, poi si ripete: periodo $4$.` },
    { id: 'fc-05', sezione: 'unita-immaginaria', tipo: 'procedura', fronte: R`Come calcolare $i^n$ con $n$ grande?`, retro: R`Si divide $n$ per $4$ e si guarda il resto $r$: $i^n=i^r$.` },
    { id: 'fc-06', sezione: 'forma-algebrica', tipo: 'definizione', fronte: R`Forma algebrica di un numero complesso`, retro: R`$z=a+bi$, con $a=\text{Re}(z)$ parte reale e $b=\text{Im}(z)$ parte immaginaria, entrambi reali.` },
    { id: 'fc-07', sezione: 'forma-algebrica', tipo: 'concetto', fronte: R`Quando due numeri complessi sono uguali?`, retro: R`Quando hanno la stessa parte reale e la stessa parte immaginaria.` },
    { id: 'fc-08', sezione: 'coniugato-modulo', tipo: 'definizione', fronte: R`Coniugato di $z=a+bi$`, retro: R`$\overline z = a-bi$: cambia segno solo alla parte immaginaria.` },
    { id: 'fc-09', sezione: 'piano-di-gauss', tipo: 'formula', fronte: R`Modulo di $z=a+bi$`, retro: R`$|z|=\sqrt{a^2+b^2}$: la distanza del punto $(a;b)$ dall'origine.` },
    { id: 'fc-10', sezione: 'coniugato-modulo', tipo: 'concetto', fronte: R`Quanto vale $z\cdot\overline z$?`, retro: R`$z\cdot\overline z = a^2+b^2=|z|^2$: un numero reale non negativo.` },
    { id: 'fc-11', sezione: 'operazioni', tipo: 'procedura', fronte: R`Come si sommano due numeri complessi?`, retro: R`Si sommano separatamente le parti reali e le parti immaginarie.` },
    { id: 'fc-12', sezione: 'operazioni', tipo: 'procedura', fronte: R`Come si moltiplicano due numeri complessi?`, retro: R`Con la proprietà distributiva, sostituendo $i^2=-1$ nel risultato.` },
    { id: 'fc-13', sezione: 'operazioni', tipo: 'procedura', fronte: R`Come si divide per un numero complesso?`, retro: R`Si moltiplicano numeratore e denominatore per il coniugato del denominatore, rendendolo reale.` },
    { id: 'fc-14', sezione: 'piano-di-gauss', tipo: 'definizione', fronte: R`Piano di Gauss`, retro: R`Il piano in cui $z = a + bi$ è il punto $(a;b)$: sull'asse orizzontale si legge la parte reale, su quello verticale la parte immaginaria.` },
    { id: 'fc-25', sezione: 'piano-di-gauss', tipo: 'definizione', fronte: R`Argomento di un numero complesso`, retro: R`L'angolo $\theta$ fra il semiasse reale positivo e la semiretta che va dall'origine a $z$, misurato in senso antiorario.` },
    { id: 'fc-15', sezione: 'coniugato-modulo', tipo: 'concetto', fronte: R`Dove sta il coniugato di $z$ nel piano di Gauss?`, retro: R`Nel punto simmetrico di $z$ rispetto all'asse reale (non rispetto all'origine, che darebbe $-z$).` },
    { id: 'fc-16', sezione: 'forma-trigonometrica', tipo: 'definizione', fronte: R`Forma trigonometrica di $z$`, retro: R`$z=\rho(\cos\theta+i\sin\theta)$, con $\rho=|z|$ modulo e $\theta$ argomento di $z$.` },
    { id: 'fc-17', sezione: 'forma-trigonometrica', tipo: 'procedura', fronte: R`Come si passa dalla forma algebrica a quella trigonometrica?`, retro: R`$\rho=\sqrt{a^2+b^2}$; per $\theta$ si usa $\cos\theta=a/\rho$ e $\sin\theta=b/\rho$, controllando il quadrante.` },
    { id: 'fc-18', sezione: 'forma-trigonometrica', tipo: 'concetto', fronte: R`Perché non basta $\tan\theta=b/a$ per trovare l'argomento?`, retro: R`Perché la tangente ha lo stesso valore in due quadranti opposti: serve controllare i segni di $a$ e $b$.` },
    { id: 'fc-19', sezione: 'de-moivre', tipo: 'formula', fronte: R`Prodotto in forma trigonometrica`, retro: R`$\rho_1\rho_2[\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)]$: i moduli si moltiplicano, gli argomenti si sommano.` },
    { id: 'fc-20', sezione: 'de-moivre', tipo: 'formula', fronte: R`Formula di De Moivre`, retro: R`$z^n=\rho^n(\cos(n\theta)+i\sin(n\theta))$.` },
    { id: 'fc-21', sezione: 'de-moivre', tipo: 'concetto', fronte: R`Nella formula di De Moivre, cosa succede al modulo e cosa all'argomento?`, retro: R`Il modulo si eleva alla potenza $n$; l'argomento si moltiplica per $n$.` },
    { id: 'fc-22', sezione: 'radici-equazioni-esponenziale', tipo: 'formula', fronte: R`Radici n-esime di un numero complesso`, retro: R`Sono $n$, con lo stesso modulo $\sqrt[n]{\rho}$ e argomenti equidistanziati di $360^\circ/n$: stanno ai vertici di un poligono regolare.` },
    { id: 'fc-23', sezione: 'radici-equazioni-esponenziale', tipo: 'concetto', fronte: R`Soluzioni di $ax^2+bx+c=0$ con $\Delta<0$`, retro: R`Due numeri complessi coniugati: $x=\dfrac{-b\pm i\sqrt{|\Delta|}}{2a}$.` },
    { id: 'fc-24', sezione: 'radici-equazioni-esponenziale', tipo: 'formula', fronte: R`Identità di Eulero`, retro: R`$e^{i\pi}+1=0$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola $i^{23}$.`, suggerimenti: [R`Le potenze di $i$ si ripetono con periodo $4$.`, R`$23 = 4\cdot 5 + 3$: guarda il resto.`], risposta: { tipo: 'testo', accettate: ['-i', '-1i', '0-i', '-i+0'] }, soluzione: [R`$23 = 4\cdot5+3$, resto $3$.`, R`$i^{23} = i^3 = -i$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola il modulo di $z = 5 - 12i$.`, suggerimenti: [R`Usa $|z|=\sqrt{a^2+b^2}$.`, R`$5^2=25$ e $(-12)^2=144$: la somma è un quadrato perfetto.`], risposta: { tipo: 'numero', valore: 13, tolleranza: 0.01 }, soluzione: [R`$|z| = \sqrt{5^2+(-12)^2} = \sqrt{25+144} = \sqrt{169} = 13$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Calcola la somma $(2+3i) + (-5+i)$.`, suggerimenti: [R`Somma separatamente le parti reali e le parti immaginarie.`], risposta: { tipo: 'testo', accettate: ['-3+4i', '-3 + 4i', '4i-3', '4i - 3'] }, soluzione: [R`Parte reale: $2+(-5) = -3$. Parte immaginaria: $3+1=4$.`, R`Risultato: $-3+4i$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Risolvi in $\mathbb{C}$ l'equazione $x^2+9=0$ e scrivi la soluzione con parte immaginaria positiva.`, suggerimenti: [R`Isola $x^2$: che segno ha $-9$?`, R`$x^2=-9$: scrivi $-9$ come $9\cdot(-1)$.`], risposta: { tipo: 'testo', accettate: ['3i', '+3i', '0+3i', '3i+0'] }, soluzione: [R`$x^2=-9 \Rightarrow x = \pm\sqrt{-9} = \pm\sqrt{9}\cdot\sqrt{-1} = \pm3i$.`, R`La soluzione con parte immaginaria positiva è $3i$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Calcola il prodotto $(1+2i)(3-i)$.`, suggerimenti: [R`Applica la proprietà distributiva come per due binomi.`, R`Ricorda che $i^2=-1$ quando semplifichi.`], risposta: { tipo: 'testo', accettate: ['5+5i', '5 + 5i', '5i+5', '5i + 5'] }, soluzione: [R`$(1+2i)(3-i) = 3 - i + 6i - 2i^2 = 3+5i+2 = 5+5i$ (perché $-2i^2 = -2\cdot(-1)=2$).`] },
    { id: 'es-06', difficolta: 2, testo: R`Calcola il quoziente $\dfrac{1+3i}{1-i}$.`, suggerimenti: [R`Moltiplica sopra e sotto per il coniugato del denominatore.`, R`Il coniugato di $1-i$ è $1+i$.`], risposta: { tipo: 'testo', accettate: ['-1+2i', '-1 + 2i', '2i-1', '2i - 1'] }, soluzione: [R`$\dfrac{(1+3i)(1+i)}{(1-i)(1+i)} = \dfrac{1+i+3i+3i^2}{1+1} = \dfrac{1+4i-3}{2} = \dfrac{-2+4i}{2} = -1+2i$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Scrivi in forma trigonometrica $z = -1+i\sqrt3$: quanto vale il modulo $\rho$?`, suggerimenti: [R`Usa $\rho=\sqrt{a^2+b^2}$ con $a=-1$, $b=\sqrt3$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`$\rho = \sqrt{(-1)^2+(\sqrt3)^2} = \sqrt{1+3} = 2$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Per lo stesso numero $z=-1+i\sqrt3$ dell'esercizio precedente, quanto vale l'argomento $\theta$ in gradi (fra $0^\circ$ e $360^\circ$)?`, suggerimenti: [R`$\cos\theta = a/\rho$ e $\sin\theta=b/\rho$, con $\rho=2$.`, R`$\cos\theta = -\dfrac12$ e $\sin\theta=\dfrac{\sqrt3}{2}$: in che quadrante siamo?`], risposta: { tipo: 'numero', valore: 120, tolleranza: 0.5 }, soluzione: [R`$\cos\theta=-\dfrac12$, $\sin\theta=\dfrac{\sqrt3}{2}$: segno di $a$ negativo e di $b$ positivo, secondo quadrante.`, R`$\theta = 120^\circ$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Usa la formula di De Moivre per calcolare $(1+i)^8$.`, suggerimenti: [R`Scrivi prima $1+i$ in forma trigonometrica: $\rho=\sqrt2$, $\theta=45^\circ$.`, R`Il modulo va elevato alla potenza, l'argomento va moltiplicato.`], risposta: { tipo: 'numero', valore: 16, tolleranza: 0.01 }, soluzione: [R`$1+i = \sqrt2(\cos45^\circ+i\sin45^\circ)$.`, R`$(1+i)^8 = (\sqrt2)^8(\cos360^\circ+i\sin360^\circ) = 16\cdot(1+0i) = 16$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Risolvi in $\mathbb{C}$ l'equazione $x^2-4x+13=0$ e scrivi la soluzione con parte immaginaria positiva.`, suggerimenti: [R`Calcola il discriminante: è negativo.`, R`$\Delta=16-52=-36$: scrivi $\sqrt{-36}=6i$.`], risposta: { tipo: 'testo', accettate: ['2+3i', '2 + 3i', '3i+2', '3i + 2'] }, soluzione: [R`$\Delta = (-4)^2-4\cdot1\cdot13 = 16-52=-36$.`, R`$x_{1,2} = \dfrac{4\pm\sqrt{-36}}{2} = \dfrac{4\pm6i}{2} = 2\pm3i$.`, R`La soluzione con parte immaginaria positiva è $2+3i$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Verifica che $z=-\dfrac12+i\dfrac{\sqrt3}{2}$ sia una radice cubica di $1$, cioè che $z^3=1$.`, suggerimenti: [R`Calcola prima $z^2$, poi moltiplica il risultato per $z$.`, R`In alternativa, scrivi $z$ in forma trigonometrica ($\rho=1$, $\theta=120^\circ$) e usa De Moivre con $n=3$.`], soluzione: [R`Forma trigonometrica: $z=\cos120^\circ+i\sin120^\circ$, con $\rho=1$.`, R`Per De Moivre, $z^3 = 1^3(\cos360^\circ+i\sin360^\circ) = \cos360^\circ+i\sin360^\circ = 1+0i = 1$.`, R`In forma algebrica si arriva allo stesso risultato: $z^2=-\dfrac12-i\dfrac{\sqrt3}{2}$, e $z^2\cdot z = 1$.`] },
    { id: 'es-12', difficolta: 2, testo: R`L'equazione $x^3-15x-4=0$ ha $x=4$ come soluzione (verificalo per sostituzione). Dividendo per $(x-4)$ si ottiene $x^2+4x+1=0$. Quante soluzioni reali ha in totale l'equazione di partenza?`, suggerimenti: [R`Verifica prima che $4^3-15\cdot4-4=0$.`, R`Guarda il discriminante di $x^2+4x+1=0$: è positivo o negativo?`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0 }, soluzione: [R`$4^3-15\cdot4-4 = 64-60-4=0$: $x=4$ è soluzione.`, R`$x^2+4x+1=0$ ha $\dfrac{\Delta}{4}=4-1=3>0$: due soluzioni reali, $x=-2\pm\sqrt3$.`, R`In totale l'equazione di terzo grado ha $3$ soluzioni reali: $4$, $-2+\sqrt3$ e $-2-\sqrt3$. Eppure la formula generale, per arrivarci, chiede di passare per $\sqrt{-121}$: è il caso irriducibile citato all'inizio.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Perché fu necessario introdurre i numeri complessi?`, opzioni: [R`Per risolvere qualunque equazione di primo grado`, R`Per definire l'insieme dei numeri razionali`, R`Per contare gli insiemi infiniti`, R`Per dare significato alle radici quadrate di numeri negativi che comparivano nei calcoli, anche quando il risultato finale era un numero reale`], corretta: 3, spiegazione: R`È il problema dei "casi irriducibili" della formula di Cardano-Tartaglia: un'equazione di terzo grado con soluzioni reali che richiede, nei calcoli intermedi, la radice quadrata di un numero negativo. Le altre opzioni descrivono problemi risolti da altri strumenti.` },
    { id: 'q-02', domanda: R`Quanto vale $i^2$?`, opzioni: [R`$-1$`, R`$1$`, R`$i$`, R`$-i$`], corretta: 0, spiegazione: R`Per definizione $i^2=-1$: è la proprietà che definisce l'unità immaginaria. Le potenze successive di $i$ si calcolano da questa.` },
    { id: 'q-03', domanda: R`Quanto vale $i^4$?`, opzioni: [R`$-1$`, R`$i$`, R`$1$`, R`$-i$`], corretta: 2, spiegazione: R`$i^4=(i^2)^2=(-1)^2=1$: dopo quattro potenze il ciclo ricomincia da capo.` },
    { id: 'q-04', domanda: R`Il coniugato di $z=a+bi$ è...`, opzioni: [R`$-a-bi$`, R`$a-bi$`, R`$-a+bi$`, R`$b+ai$`], corretta: 1, spiegazione: R`Il coniugato cambia segno solo alla parte immaginaria: $a$ resta invariato. $-a-bi$ è $-z$, un numero diverso.` },
    { id: 'q-05', domanda: R`Il modulo di $z=a+bi$ è...`, opzioni: [R`$a+b$`, R`$\sqrt{a^2+b^2}$`, R`$a^2+b^2$`, R`$\sqrt{a^2-b^2}$`], corretta: 1, spiegazione: R`Il modulo è la distanza di $z$ dall'origine nel piano di Gauss, calcolata con Pitagora: $\sqrt{a^2+b^2}$. Il quadrato del modulo, $a^2+b^2$, è invece $z\cdot\overline z$.` },
    { id: 'q-06', domanda: R`Per dividere due numeri complessi conviene...`, opzioni: [R`moltiplicare numeratore e denominatore per il coniugato del denominatore`, R`sommare separatamente le parti reali e immaginarie`, R`moltiplicare numeratore e denominatore per il coniugato del numeratore`, R`la divisione non è definita in $\mathbb{C}$`], corretta: 0, spiegazione: R`Moltiplicare per il coniugato del denominatore lo rende un numero reale (per la proprietà $z\overline z=|z|^2$), così si può dividere come in una frazione normale.` },
    { id: 'q-07', domanda: R`Nel piano di Gauss, l'asse verticale rappresenta...`, opzioni: [R`i numeri reali`, R`il modulo`, R`la parte immaginaria`, R`l'argomento`], corretta: 2, spiegazione: R`Per convenzione l'asse orizzontale (Re) porta la parte reale e l'asse verticale (Im) la parte immaginaria; modulo e argomento sono le coordinate polari dello stesso punto.` },
    { id: 'q-08', domanda: R`Nel piano di Gauss, il coniugato di $z$ è...`, opzioni: [R`il simmetrico di $z$ rispetto all'origine`, R`il simmetrico di $z$ rispetto all'asse reale`, R`il simmetrico di $z$ rispetto all'asse immaginario`, R`sempre uguale a $z$`], corretta: 1, spiegazione: R`Cambiare segno solo alla parte immaginaria corrisponde geometricamente a riflettere il punto rispetto all'asse reale. Il simmetrico rispetto all'origine sarebbe $-z$.` },
    { id: 'q-09', domanda: R`Nella forma trigonometrica $z=\rho(\cos\theta+i\sin\theta)$, che cos'è $\rho$?`, opzioni: [R`l'argomento di $z$`, R`la parte reale di $z$`, R`la parte immaginaria di $z$`, R`il modulo di $z$`], corretta: 3, spiegazione: R`$\rho=|z|$ è il modulo, cioè la distanza dall'origine; $\theta$ è l'argomento, l'angolo con l'asse reale.` },
    { id: 'q-10', domanda: R`Moltiplicando due numeri complessi in forma trigonometrica...`, opzioni: [R`i moduli si sommano e gli argomenti si moltiplicano`, R`i moduli si moltiplicano e gli argomenti si sommano`, R`sia i moduli sia gli argomenti si sommano`, R`sia i moduli sia gli argomenti si moltiplicano`], corretta: 1, spiegazione: R`Nel prodotto in forma trigonometrica i moduli si moltiplicano fra loro e gli argomenti si sommano; nel quoziente i moduli si dividono e gli argomenti si sottraggono.` },
    { id: 'q-11', domanda: R`La formula di De Moivre afferma che $z^n$ vale...`, opzioni: [R`$\rho^n(\cos(n\theta)+i\sin(n\theta))$`, R`$n\rho(\cos\theta+i\sin\theta)$`, R`$\rho(\cos(n\theta)+i\sin(n\theta))$`, R`$\rho^n(\cos\theta+i\sin(n\theta))$`], corretta: 0, spiegazione: R`Il modulo va elevato alla potenza $n$ e l'argomento va moltiplicato per $n$: entrambe le trasformazioni, non solo una.` },
    { id: 'q-12', domanda: R`Quante sono le radici $n$-esime distinte di un numero complesso non nullo?`, opzioni: [R`$1$`, R`$2$`, R`$n$`, R`infinite`], corretta: 2, spiegazione: R`Per ogni $k=0,1,\ldots,n-1$ si ottiene una radice diversa: sono esattamente $n$, tutte con lo stesso modulo.` },
    { id: 'q-13', domanda: R`Le $n$ radici $n$-esime di un numero complesso, nel piano di Gauss, si trovano...`, opzioni: [R`allineate su una retta passante per l'origine`, R`ai vertici di un poligono regolare di $n$ lati, inscritto in una circonferenza`, R`tutte sovrapposte in un unico punto`, R`sparse senza alcuna regolarità`], corretta: 1, spiegazione: R`Hanno tutte lo stesso modulo (stessa circonferenza) e argomenti equidistanziati di $360^\circ/n$: la disposizione tipica di un poligono regolare.` },
    { id: 'q-14', domanda: R`Un'equazione di secondo grado a coefficienti reali con $\Delta<0$ ammette in $\mathbb{C}$...`, opzioni: [R`nessuna soluzione`, R`una sola soluzione reale`, R`due soluzioni complesse coniugate`, R`infinite soluzioni`], corretta: 2, spiegazione: R`La formula risolutiva resta valida scrivendo $\sqrt\Delta=i\sqrt{|\Delta|}$: le due soluzioni sono numeri complessi coniugati, mai reali quando $\Delta<0$.` },
    { id: 'q-15', domanda: R`L'identità di Eulero $e^{i\pi}+1=0$ lega tra loro...`, opzioni: [R`solo i numeri $e$ e $\pi$`, R`le costanti $0$, $1$, $e$, $i$, $\pi$`, R`solo i numeri complessi e i numeri razionali`, R`le funzioni trigonometriche e i logaritmi`], corretta: 1, spiegazione: R`In un'unica uguaglianza compaiono le cinque costanti forse più importanti della matematica: $0$, $1$, $e$, $i$ e $\pi$.` },
    { id: 'q-16', domanda: R`Calcolando l'argomento di $z=-1-i$ con la sola relazione $\tan\theta=b/a$ si rischia di sbagliare perché...`, opzioni: [R`la tangente non è mai definita per i numeri complessi`, R`bisogna sempre lavorare in radianti, mai in gradi`, R`la tangente ha lo stesso valore in due quadranti opposti: bisogna controllare i segni di $a$ e $b$`, R`l'argomento di un numero complesso non esiste`], corretta: 2, spiegazione: R`$\tan\theta$ ha periodo $180^\circ$, quindi dà lo stesso valore in due quadranti opposti: occorre guardare i segni di $a$ e $b$ per scegliere quello giusto.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di iniziare un calcolo con i numeri complessi, scrivi chiaramente $a$, $b$ (forma algebrica) oppure $\rho$, $\theta$ (forma trigonometrica): mischiare le due forme a metà calcolo è la fonte più comune di errori.` },
    { tipo: 'errore', testo: R`$i^2$ non va lasciato "così com'è": vale $-1$, un numero reale. Sostituiscilo subito ogni volta che compare in un calcolo.` },
    { tipo: 'errore', testo: R`Il coniugato $\overline z=a-bi$ cambia segno solo alla parte immaginaria. $-a-bi$ è un altro numero, $-z$: il simmetrico rispetto all'origine, non rispetto all'asse reale.` },
    { tipo: 'trucco', testo: R`Per calcolare $i^n$ con $n$ grande, dividi $n$ per $4$ e guarda solo il resto: la potenza si ripete ogni $4$.` },
    { tipo: 'metodo', testo: R`Per dividere per un numero complesso, moltiplica sopra e sotto per il coniugato del denominatore: è la stessa idea della razionalizzazione dei radicali.` },
    { tipo: 'errore', testo: R`Per trovare l'argomento non basta $\tan\theta=b/a$: controlla sempre in che quadrante sta il punto $(a; b)$, perché la tangente si ripete ogni $180^\circ$.` },
    { tipo: 'trucco', testo: R`Controllo lampo su un prodotto o un quoziente in forma trigonometrica: il modulo del risultato deve essere il prodotto (o il rapporto) dei moduli di partenza. Se non torna, c'è un errore.` },
    { tipo: 'errore', testo: R`Le radici $n$-esime di un numero non nullo sono sempre $n$, non una sola: fermarsi al primo valore di $k$ è l'errore più frequente.` },
    { tipo: 'metodo', testo: R`In un'equazione di secondo grado a coefficienti reali con $\Delta<0$, trovata una soluzione complessa l'altra si scrive subito: è la sua coniugata.` }
  ],

  aneddoti: [
    { matematico: 'Girolamo Cardano', anni: '1501–1576', titolo: 'Il problema con soluzione "impossibile" che tornava giusto', testo: R`Nel 1545, nell'*Ars Magna*, Cardano affrontò un problema all'apparenza innocuo: dividere $10$ in due parti il cui prodotto sia $40$. Chiamate $x$ e $y$ le due parti, $x+y=10$ e $xy=40$: sono le radici di $t^2-10t+40=0$, e il discriminante è negativo, $\Delta=100-160=-60$. Cardano non si fermò: scrisse formalmente le due "parti" come $5+\sqrt{-15}$ e $5-\sqrt{-15}$, chiamandole "quantità sofistiche" e ammettendo che operare con esse fosse una "tortura mentale". Poi, per curiosità, ne calcolò il prodotto: $(5+\sqrt{-15})(5-\sqrt{-15}) = 25-(-15) = 40$. Tornava. Cardano mise da parte il risultato come una curiosità inutile, senza immaginare che quella "tortura" sarebbe diventata un intero campo della matematica.`, legame: R`È il primo calcolo scritto della storia con un discriminante negativo maneggiato fino in fondo, invece di fermarsi a "impossibile".` },
    { matematico: 'Rafael Bombelli', anni: '1526–1572', titolo: 'L\'ingegnere che diede regole al "più di meno"', testo: R`Bombelli lavorava alla bonifica delle paludi della Val di Chiana quando, nei tempi morti fra un cantiere e l'altro, scrisse *L'Algebra*, pubblicata nel 1572. Il libro affronta di petto un problema che altri evitavano: l'equazione $x^3=15x+4$ ha la soluzione reale $x=4$, ma la formula di Cardano-Tartaglia porta a scrivere $\sqrt{-121}$ nei calcoli intermedi. Invece di arrendersi, Bombelli inventò un nome e delle regole per queste quantità: chiamò $\sqrt{-1}$ "più di meno" e $-\sqrt{-1}$ "meno di meno", e stabilì che "più di meno via più di meno fa meno" (con la nostra notazione, $i\cdot i=-1$). Applicando queste regole ai calcoli con $\sqrt{-121}$, ottenne correttamente $x=4$: la prova che le nuove quantità, pur "assurde", funzionavano.`, legame: R`Le regole di Bombelli per il "più di meno" sono, con altro nome, le regole con cui oggi si moltiplicano i numeri complessi.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'Una lettera per un numero che prima non si scriveva', testo: R`Prima del 1777 chi scriveva la radice di $-1$ doveva ripetere ogni volta il simbolo $\sqrt{-1}$, con il rischio di trattarlo per sbaglio come una radice qualunque (per esempio scrivendo $\sqrt{-1}\cdot\sqrt{-1}=\sqrt{1}=1$, invece di $-1$). Eulero, in una memoria del 1777 presentata all'Accademia di San Pietroburgo, propose di indicare quella quantità con una sola lettera, $i$ (iniziale di "imaginarius"), fissando una volta per tutte la regola $i^2=-1$. Eulero perse la vista da un occhio prima dei trentacinque anni e negli ultimi dodici fu quasi del tutto cieco, ma continuò a lavorare dettando calcoli e articoli a memoria: la notazione $i$ è solo uno dei tanti simboli che usiamo ancora oggi per merito suo, insieme a $e$, $\pi$ e alla scrittura $f(x)$.`, legame: R`Il simbolo $i$ di questo intero argomento è la sua notazione: prima di lui si scriveva sempre e solo $\sqrt{-1}$.` },
    { matematico: 'Carl Friedrich Gauss', anni: '1777–1855', titolo: 'Il nome "complessi" al posto di "immaginari"', testo: R`Il primo a disegnare i numeri $a+bi$ come punti di un piano fu un agrimensore danese, Caspar Wessel, nel 1799, ma il suo lavoro, scritto in danese, passò inosservato per un secolo. La stessa idea fu riscoperta nel 1806 dal contabile svizzero Jean-Robert Argand, in un opuscolo pubblicato a proprie spese: da lui viene il nome "diagramma di Argand" ancora usato per questa rappresentazione. Fu però Gauss, nel 1831, a rendere popolare l'immagine geometrica e, soprattutto, a proporre il nome che ha vinto: **numeri complessi**, al posto di "numeri immaginari". Gauss trovava fuorviante la parola "immaginario", che sembrava dire che quei numeri fossero finti o inesistenti, mentre nel piano erano punti concreti quanto qualsiasi altro.`, legame: R`Il piano in cui si disegnano i numeri complessi porta il suo nome perché fu lui a far conoscere a tutti quella rappresentazione; e il nome «complessi» è una sua proposta.` },
    { matematico: 'William Rowan Hamilton', anni: '1805–1865', titolo: 'La formula incisa su un ponte', testo: R`Hamilton cercò per anni un modo di moltiplicare terne di numeri, per rappresentare le rotazioni dello spazio come i numeri complessi rappresentano quelle del piano. Ogni tentativo falliva. La soluzione arrivò all'improvviso il 16 ottobre 1843, mentre passeggiava lungo il Royal Canal di Dublino con la moglie, diretto a una riunione della Royal Irish Academy: servivano non tre numeri, ma **quattro**. Per paura di dimenticare l'intuizione prima di arrivare a casa, incise con il coltellino sulla pietra del ponte di Broom la formula $i^2=j^2=k^2=ijk=-1$: le regole dei suoi **quaternioni**. La scritta originale non è più leggibile, ma da allora ogni anno i matematici di Dublino ripercorrono in pellegrinaggio quel tragitto lungo il canale.`, legame: R`I quaternioni estendono a quattro dimensioni la stessa idea di $i$ studiata in questo argomento: un'unità che, moltiplicata per se stessa, dà $-1$.` }
  ]
});
})();
