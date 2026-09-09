(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'numeri-complessi',
  titolo: 'Numeri complessi',

  introduzione: R`I numeri complessi nascono da un problema semplice da enunciare e impossibile da risolvere con i soli numeri reali: trovare un $x$ tale che $x^2 = -1$. Nessun numero reale, elevato al quadrato, può dare un risultato negativo, eppure fin dal Cinquecento i matematici si accorsero che espressioni come $\sqrt{-1}$ comparivano nei calcoli anche quando il problema di partenza aveva soluzioni reali del tutto normali: bastava definire un nuovo numero, chiamarlo $i$, e le formule tornavano a funzionare.

Un numero complesso è una coppia di numeri reali scritta come $a+bi$; l'insieme di tutti si indica con $\mathbb{C}$ e contiene $\mathbb{R}$ come caso particolare (quando $b=0$). Non sono un'astrazione fine a se stessa: servono per risolvere ogni equazione algebrica (non solo quelle di secondo grado), per descrivere le correnti alternate e le onde in fisica, e sono lo strumento con cui si costruiscono le rotazioni nel piano.

Per seguire bene questo argomento serve saper risolvere le equazioni di secondo grado (discriminante e formula risolutiva) e conoscere seno e coseno: la parte più utile dei numeri complessi, la forma trigonometrica, è scritta proprio con quelli.`,

  sezioni: [
    { id: 'perche-servono', titolo: 'Perché servono i numeri complessi', testo: R`L'equazione $x^2 + 1 = 0$, cioè $x^2 = -1$, non ha soluzioni reali: il quadrato di un numero reale non è mai negativo. È lo stesso discorso già visto per il discriminante negativo delle equazioni di secondo grado, e per secoli ci si è fermati lì, dicendo semplicemente che l'equazione è impossibile.

>* **Idea chiave:** i numeri complessi nascono definendo un nuovo numero $i$ tale che $i^2 = -1$, in modo che equazioni come $x^2+1=0$ abbiano finalmente una soluzione: $x = \pm i$.

Il motivo per cui i matematici non poterono più far finta di niente arrivò nel Cinquecento, con le equazioni di terzo grado. La formula di Scipione del Ferro, Tartaglia e Cardano per risolvere $x^3 = px + q$ chiede, in certi casi, di calcolare la radice quadrata di un numero negativo, anche quando l'equazione ha **tre soluzioni reali e distinte**. Per esempio $x^3 = 15x + 4$ ha la soluzione reale $x = 4$ (si verifica per sostituzione: $64 = 60 + 4$), ma la formula generale porta a scrivere $\sqrt{-121}$ in un passaggio intermedio. Questi sono i cosiddetti **casi irriducibili**: il risultato finale è un numero reale del tutto ordinario, ma per arrivarci la formula obbliga a passare per una radice "impossibile".

Fu l'ingegnere Rafael Bombelli, nel 1572, a prendere sul serio questa radice invece di scartarla, definendo le regole di calcolo per queste nuove quantità. Da quel momento le radici di numeri negativi non sono più un vicolo cieco, ma un nuovo insieme di numeri da esplorare: i numeri complessi.

>! Dire che un'equazione di secondo grado con $\Delta < 0$ "non ha soluzioni" è corretto solo se ci si limita ai numeri reali. In $\mathbb{C}$ ha sempre due soluzioni: tutta la storia dei numeri complessi nasce dal prendere sul serio ciò che nei reali sembrava un vicolo cieco.` },

    { id: 'unita-immaginaria', titolo: "L'unità immaginaria e le potenze di i", testo: R`Si definisce **unità immaginaria** il numero $i$ tale che $$i^2 = -1.$$ Non è un numero reale: nessun numero reale ha questa proprietà. Con questa unica definizione si dà significato alla radice quadrata di ogni numero reale negativo: $\sqrt{-9} = \sqrt{9}\cdot\sqrt{-1} = 3i$, $\sqrt{-5} = i\sqrt5$.

>* **Definizione:** $i^2 = -1$, cioè $i = \sqrt{-1}$.

Le potenze di $i$ si ripetono con **periodo 4**: $$i^0 = 1, \quad i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1, \quad i^5 = i, \ldots$$ perché $i^4 = (i^2)^2 = (-1)^2 = 1$ riporta al punto di partenza, e da lì il ciclo ricomincia. Per calcolare $i^n$ con $n$ grande basta dividere $n$ per $4$ e guardare il resto $r$: $i^n = i^r$.

Esempio: $i^{37}$. Poiché $37 = 4\cdot 9 + 1$, il resto è $1$ e $i^{37} = i^1 = i$. Analogamente per $i^{102}$: $102 = 4\cdot 25 + 2$, resto $2$, quindi $i^{102} = i^2 = -1$.

>! $i^2$ non va lasciato "così com'è": vale $-1$, un numero reale negativo. Scrivere $i^2 = i$, o dimenticarsi il segno meno quando si sostituisce, è l'errore più comune in ogni calcolo con i numeri complessi.` },

    { id: 'forma-algebrica', titolo: 'La forma algebrica', testo: R`Un numero complesso in **forma algebrica** si scrive $$z = a + bi, \qquad a, b \in \mathbb{R},$$ dove $a$ è la **parte reale** di $z$ (si scrive $a = \text{Re}(z)$) e $b$ è la **parte immaginaria** (si scrive $b = \text{Im}(z)$; attenzione, $\text{Im}(z)$ è il numero reale $b$, non $bi$). L'insieme di tutti i numeri complessi si indica $\mathbb{C}$.

>* Se $b=0$, $z=a$ è un numero reale: $\mathbb{R} \subset \mathbb{C}$. Se $a=0$ e $b\ne0$, $z=bi$ si dice **immaginario puro**.

Due numeri complessi sono **uguali** se e solo se hanno la stessa parte reale e la stessa parte immaginaria: $$a+bi = c+di \quad \text{esattamente quando} \quad a=c \ \text{e} \ b=d.$$ Questo permette, in un'equazione fra numeri complessi, di separare parte reale e parte immaginaria e trattarle come due equazioni distinte fra numeri reali.

Esempio: per quali $x, y$ reali vale $(x+2) + (y-3)i = 5 - i$? Uguagliando le parti: $x+2=5$ e $y-3=-1$, quindi $x=3$ e $y=2$.

>! $3+2i$, $2i+3$ e $3+i\cdot2$ sono lo stesso numero scritto in modi diversi: l'ordine degli addendi non conta. La forma "standard" $a+bi$, però, è quella più facile da confrontare a colpo d'occhio.` },

    { id: 'coniugato-modulo', titolo: 'Coniugato e modulo', testo: R`Dato $z=a+bi$, il suo **coniugato** si ottiene cambiando segno alla sola parte immaginaria: $$\overline{z} = a - bi.$$ Il **modulo** di $z$ è invece $$|z| = \sqrt{a^2+b^2},$$ un numero reale non negativo che, come si vedrà, è la distanza di $z$ dall'origine nel piano di Gauss.

>* $\overline{z} = a-bi$ (cambia segno solo a $b$). $|z| = \sqrt{a^2+b^2} \ge 0$, e $|z|=0$ se e solo se $z=0$.

Coniugato e modulo sono legati da un'identità utile: $$z\cdot\overline{z} = (a+bi)(a-bi) = a^2 - (bi)^2 = a^2+b^2 = |z|^2,$$ cioè il prodotto di un numero per il suo coniugato è sempre reale, uguale al quadrato del modulo. Questa proprietà, come si vedrà, serve per dividere due numeri complessi.

Esempio: $z=3-4i$. Allora $\overline{z}=3+4i$ e $|z|=\sqrt{9+16}=\sqrt{25}=5$ (la stessa terna pitagorica $3$-$4$-$5$). Si nota che $|\overline z| = \sqrt{9+16}=5=|z|$: coniugare non cambia il modulo.

Trascina il punto $z$ nel grafico e osserva come cambia $|z|$: è sempre la lunghezza del segmento che unisce $z$ all'origine.

[[grafico:moduloTrascina]]

>! $\overline z = a-bi$, non $-a-bi$: cambia segno solo alla parte immaginaria, la parte reale resta invariata. $-a-bi$ è invece $-z$, un numero diverso.` },

    { id: 'operazioni', titolo: 'Le operazioni fra numeri complessi', testo: R`### Somma e differenza

Si sommano (o sottraggono) separatamente le parti reali e le parti immaginarie: $$(a+bi) \pm (c+di) = (a\pm c) + (b\pm d)i.$$ Esempio: $(2+3i) + (-5+i) = (2-5)+(3+1)i = -3+4i$.

### Prodotto

Si applica la proprietà distributiva come per due binomi, ricordando che $i^2=-1$: $$(a+bi)(c+di) = ac+adi+bci+bdi^2 = (ac-bd) + (ad+bc)i.$$ Esempio: $(1+2i)(3-i) = 3-i+6i-2i^2 = 3+5i+2 = 5+5i$.

### Quoziente

Per dividere si moltiplicano numeratore e denominatore per il **coniugato del denominatore**, così il denominatore diventa reale, esattamente come si razionalizza una frazione con una radice al denominatore: $$\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{(c+di)(c-di)} = \frac{(a+bi)(c-di)}{c^2+d^2}.$$

>* Somma: parti separate. Prodotto: distributiva con $i^2=-1$. Quoziente: si moltiplica per il coniugato del denominatore.

Esempio: $\dfrac{3+i}{1-i}$. Moltiplico sopra e sotto per $1+i$: $$\frac{(3+i)(1+i)}{(1-i)(1+i)} = \frac{3+3i+i+i^2}{1+1} = \frac{2+4i}{2} = 1+2i.$$

>! Nel quoziente si moltiplica per il coniugato del **denominatore**, non del numeratore: scambiare l'uno con l'altro dà un risultato completamente diverso.` },

    { id: 'piano-di-gauss', titolo: 'Il piano di Gauss', testo: R`Ogni numero complesso $z=a+bi$ si può rappresentare come un punto, o come un vettore uscente dall'origine, nel **piano di Gauss**: sull'asse orizzontale si legge la parte reale, su quello verticale la parte immaginaria. Il piano cartesiano diventa così un modo di *vedere* i numeri complessi, non solo di calcolarli.

>* **Piano di Gauss:** asse Re orizzontale, asse Im verticale; $z=a+bi$ corrisponde al punto $(a,b)$, o al vettore che va dall'origine a quel punto.

In questa immagine geometrica, il modulo $|z|=\sqrt{a^2+b^2}$ è semplicemente la **lunghezza** del vettore (il teorema di Pitagora applicato ai due cateti $a$ e $b$), e il coniugato $\overline z = a-bi$ è il simmetrico di $z$ rispetto all'asse reale: stessa $a$, $b$ cambiato di segno.

L'angolo che il vettore forma con la direzione positiva dell'asse reale si chiama **argomento** di $z$ (si vedrà come calcolarlo nella prossima sezione, con la forma trigonometrica).

[[grafico:gaussVettori]]

Esempio: $z=3+2i$ è il punto $(3,2)$; il suo coniugato $3-2i$ è il punto $(3,-2)$, simmetrico di $(3,2)$ rispetto all'asse orizzontale.

>! Il simmetrico di $z$ rispetto all'**origine** è $-z=-a-bi$, un punto diverso dal coniugato $\overline z = a-bi$ (simmetrico rispetto all'asse reale): sono due trasformazioni geometriche diverse, da non confondere.` },

    { id: 'forma-trigonometrica', titolo: 'La forma trigonometrica', testo: R`Nel piano di Gauss, il punto $z=a+bi$ è individuato anche da due altre coordinate: la distanza dall'origine (il modulo $\rho=|z|$) e l'angolo $\theta$ formato con l'asse reale positivo, che si chiama **argomento** di $z$ e si indica $\theta = \text{arg}(z)$. Dalla trigonometria del triangolo rettangolo: $$a = \rho\cos\theta, \qquad b = \rho\sin\theta,$$ quindi $$z = \rho(\cos\theta+i\sin\theta),$$ che si chiama **forma trigonometrica** (o polare) di $z$.

>* $z=\rho(\cos\theta+i\sin\theta)$, con $\rho=\sqrt{a^2+b^2}$ e $\theta$ tale che $\cos\theta=\dfrac{a}{\rho}$, $\sin\theta=\dfrac{b}{\rho}$.

Per passare dalla forma algebrica alla trigonometrica si calcola $\rho$ e poi si cerca $\theta$ guardando i segni di $a$ e $b$, cioè il quadrante: non basta il valore di $\tan\theta = b/a$, perché la tangente da sola non distingue, per esempio, il primo quadrante dal terzo.

Esempio: $z=1+i\sqrt3$. Allora $\rho=\sqrt{1+3}=2$, $\cos\theta=\dfrac12$, $\sin\theta=\dfrac{\sqrt3}{2}$: $\theta=60^\circ$ (primo quadrante, coerente con $a=1>0$ e $b=\sqrt3>0$). Quindi $$1+i\sqrt3 = 2\left(\cos60^\circ+i\sin60^\circ\right).$$

Sposta il cursore dell'angolo e osserva come il punto percorre la circonferenza unitaria: $\cos\theta$ e $\sin\theta$ sono proprio le sue coordinate.

[[grafico:circonferenzaArgomento]]

>! Il passaggio inverso, da trigonometrica ad algebrica, è più semplice: basta calcolare $a=\rho\cos\theta$ e $b=\rho\sin\theta$. L'errore tipico sta nel verso opposto: dimenticare di controllare il quadrante.` },

    { id: 'de-moivre', titolo: 'Prodotto, quoziente e formula di De Moivre', testo: R`La forma trigonometrica rende semplicissimi prodotto e quoziente. Se $z_1=\rho_1(\cos\theta_1+i\sin\theta_1)$ e $z_2=\rho_2(\cos\theta_2+i\sin\theta_2)$: $$z_1 z_2 = \rho_1\rho_2\left[\cos(\theta_1+\theta_2) + i\sin(\theta_1+\theta_2)\right], \qquad \frac{z_1}{z_2} = \frac{\rho_1}{\rho_2}\left[\cos(\theta_1-\theta_2) + i\sin(\theta_1-\theta_2)\right].$$

>* **Nel prodotto i moduli si moltiplicano e gli argomenti si sommano; nel quoziente i moduli si dividono e gli argomenti si sottraggono.**

Applicando il prodotto ripetutamente a $z$ per se stesso si ottiene la **formula di De Moivre**: $$z^n = \rho^n\left(\cos(n\theta) + i\sin(n\theta)\right), \qquad n \in \mathbb{N}.$$ Elevare a potenza in forma trigonometrica è molto più comodo che moltiplicare ripetutamente in forma algebrica.

Esempio: $(1+i)^6$. In forma trigonometrica $1+i = \sqrt2\left(\cos45^\circ+i\sin45^\circ\right)$, quindi $$(1+i)^6 = (\sqrt2)^6\left(\cos270^\circ + i\sin270^\circ\right) = 8(0-i) = -8i,$$ perché $(\sqrt2)^6 = 2^3 = 8$ e $6\cdot45^\circ=270^\circ$.

>! $(\sqrt2)^6$ non è $\sqrt2\cdot6$: il modulo va elevato alla potenza $n$, l'argomento va **moltiplicato** per $n$. Sono due operazioni diverse, su due numeri diversi.` },

    { id: 'radici-equazioni-esponenziale', titolo: 'Radici n-esime, equazioni in campo complesso e forma esponenziale', testo: R`### Le radici n-esime

Un numero complesso non nullo $w=\rho(\cos\theta+i\sin\theta)$ ha esattamente $n$ **radici n-esime** distinte: $$z_k = \sqrt[n]{\rho}\left(\cos\frac{\theta+360^\circ k}{n} + i\sin\frac{\theta+360^\circ k}{n}\right), \qquad k=0,1,\ldots,n-1.$$ Tutte hanno lo stesso modulo $\sqrt[n]{\rho}$, quindi stanno sulla stessa circonferenza; i loro argomenti sono equidistanziati di $360^\circ/n$, quindi occupano i vertici di un **poligono regolare** di $n$ lati.

Esempio: le radici cubiche di $1 = 1(\cos0^\circ+i\sin0^\circ)$ sono $z_k = \cos\dfrac{360^\circ k}{3} + i\sin\dfrac{360^\circ k}{3}$ per $k=0,1,2$, cioè $z_0=1$, $z_1=\cos120^\circ+i\sin120^\circ=-\dfrac12+i\dfrac{\sqrt3}{2}$, $z_2=\cos240^\circ+i\sin240^\circ=-\dfrac12-i\dfrac{\sqrt3}{2}$: un triangolo equilatero inscritto nella circonferenza unitaria.

[[grafico:radiciCubiche]]

### Equazioni di secondo grado in campo complesso

La formula risolutiva $x_{1,2}=\dfrac{-b\pm\sqrt\Delta}{2a}$ resta valida anche quando $\Delta<0$: basta scrivere $\sqrt\Delta = i\sqrt{|\Delta|}$. Le due soluzioni sono allora **complesse coniugate**. Esempio: $x^2-2x+5=0$ ha $\Delta=4-20=-16$, quindi $$x_{1,2} = \frac{2\pm\sqrt{-16}}{2} = \frac{2\pm4i}{2} = 1\pm2i.$$

### Cenni alla forma esponenziale

Con le serie di Taylor (argomento di analisi, non ancora affrontato) si dimostra la **formula di Eulero**: $$e^{i\theta} = \cos\theta+i\sin\theta,$$ per cui $z=\rho(\cos\theta+i\sin\theta)$ si scrive anche $z=\rho e^{i\theta}$, la **forma esponenziale**. Per $\theta=180^\circ=\pi$ radianti si ottiene $e^{i\pi}=-1$, cioè $$e^{i\pi}+1=0,$$ un'uguaglianza che lega in una sola formula le costanti $0,1,e,i,\pi$.

>* Radici n-esime: $n$ soluzioni, stesso modulo, argomenti a passo $360^\circ/n$. Con $\Delta<0$: soluzioni complesse coniugate. Forma esponenziale: $z=\rho e^{i\theta}$.

>! Le radici n-esime sono **$n$**, non una sola: fermarsi alla prima trovata ($k=0$) è l'errore più comune. Vanno elencate tutte, per $k=0,1,\ldots,n-1$.` }
  ],

  grafici: {
    gaussVettori: {
      tipo: 'piano', x: [-1, 5], y: [-3, 4],
      etichette: { x: 'Re', y: 'Im' },
      elementi: [
        { tipo: 'vettore', da: [0, 0], a: [3, 2], etichetta: 'z = 3 + 2i', colore: 1 },
        { tipo: 'vettore', da: [0, 0], a: [3, -2], etichetta: 'coniugato: 3 − 2i', colore: 2 },
        { tipo: 'segmento', da: [3, 2], a: [3, -2], tratteggio: true },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: [3, 2], etichetta: 'θ', raggio: 0.8 }
      ],
      didascalia: 'Il numero z = 3 + 2i e il suo coniugato 3 − 2i sono simmetrici rispetto all\'asse reale; θ è l\'argomento di z.'
    },
    moduloTrascina: {
      tipo: 'piano', x: [-5, 5], y: [-5, 5],
      etichette: { x: 'Re', y: 'Im' },
      parametri: [
        { nome: 'a', min: -4, max: 4, passo: 0.5, valore: 3, nascosto: true },
        { nome: 'b', min: -4, max: 4, passo: 0.5, valore: 2, nascosto: true }
      ],
      elementi: [
        { tipo: 'vettore', da: [0, 0], a: ['a', 'b'], colore: 1 },
        { tipo: 'punto', p: ['a', 'b'], trascina: true, etichetta: 'z', posizione: 'alto-destra', colore: 1 },
        { tipo: 'testo', p: [-4.7, 4.5], testo: 'z = {{a}} + {{b}}i', ancora: 'start' },
        { tipo: 'testo', p: [-4.7, 3.7], testo: '|z| = {{sqrt(a^2+b^2)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto z: il modulo |z| è la distanza dall\'origine, cioè la lunghezza del vettore.'
    },
    radiciCubiche: {
      tipo: 'piano', x: [-1.6, 1.6], y: [-1.6, 1.6],
      etichette: { x: 'Re', y: 'Im' },
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1, etichetta: '|z| = 1' },
        { tipo: 'poligono', punti: [[1, 0], [-0.5, 0.866], [-0.5, -0.866]], etichette: ['1', 'z₁', 'z₂'], riempi: false }
      ],
      didascalia: 'Le tre radici cubiche di 1 stanno sulla circonferenza unitaria, ai vertici di un triangolo equilatero: z₁ = cos120° + i sin120°, z₂ = cos240° + i sin240°.'
    },
    circonferenzaArgomento: {
      tipo: 'piano', x: [-1.6, 1.6], y: [-1.6, 1.6],
      etichette: { x: 'Re', y: 'Im' },
      parametri: [{ nome: 't', min: 0, max: 360, passo: 1, valore: 60, etichetta: 'θ (gradi)' }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1 },
        { tipo: 'vettore', da: [0, 0], a: ['cos(t*pi/180)', 'sin(t*pi/180)'], etichetta: 'z', colore: 1 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['cos(t*pi/180)', 'sin(t*pi/180)'], etichetta: 'θ', raggio: 0.4 }
      ],
      didascalia: 'Sposta il cursore: il punto z = cos θ° + i sin θ° percorre la circonferenza unitaria al variare dell\'argomento.'
    }
  },

  esempi: [
    { titolo: 'Potenze di i', problema: R`Calcola $i^{37}$.`, passi: [
      R`Le potenze di $i$ si ripetono con periodo $4$: basta dividere l'esponente per $4$ e guardare il resto.`,
      R`$37 = 4\cdot 9 + 1$, quindi il resto è $1$.`,
      R`$i^{37} = i^{1} = i$.`
    ], risultato: R`$i^{37} = i$` },

    { titolo: 'Coniugato e modulo', problema: R`Trova il coniugato e il modulo di $z = 3 - 4i$.`, passi: [
      R`Il coniugato cambia segno solo alla parte immaginaria: $\overline z = 3 + 4i$.`,
      R`Il modulo è $|z| = \sqrt{3^2 + (-4)^2} = \sqrt{9+16} = \sqrt{25} = 5$: è la stessa terna pitagorica $3$-$4$-$5$.`
    ], risultato: R`$\overline z = 3+4i$ e $|z| = 5$` },

    { titolo: 'Il quoziente di due numeri complessi', problema: R`Calcola il quoziente $\dfrac{3+i}{1-i}$.`, passi: [
      R`Moltiplico numeratore e denominatore per il coniugato del denominatore, $1+i$.`,
      R`Numeratore: $(3+i)(1+i) = 3+3i+i+i^2 = 3+4i-1 = 2+4i$.`,
      R`Denominatore: $(1-i)(1+i) = 1 - i^2 = 1+1 = 2$.`,
      R`$\dfrac{2+4i}{2} = 1+2i$.`
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
    { id: 'fc-09', sezione: 'coniugato-modulo', tipo: 'formula', fronte: R`Modulo di $z=a+bi$`, retro: R`$|z|=\sqrt{a^2+b^2}$.` },
    { id: 'fc-10', sezione: 'coniugato-modulo', tipo: 'concetto', fronte: R`Quanto vale $z\cdot\overline z$?`, retro: R`$z\cdot\overline z = a^2+b^2=|z|^2$: un numero reale non negativo.` },
    { id: 'fc-11', sezione: 'operazioni', tipo: 'procedura', fronte: R`Come si sommano due numeri complessi?`, retro: R`Si sommano separatamente le parti reali e le parti immaginarie.` },
    { id: 'fc-12', sezione: 'operazioni', tipo: 'procedura', fronte: R`Come si moltiplicano due numeri complessi?`, retro: R`Con la proprietà distributiva, sostituendo $i^2=-1$ nel risultato.` },
    { id: 'fc-13', sezione: 'operazioni', tipo: 'procedura', fronte: R`Come si divide per un numero complesso?`, retro: R`Si moltiplicano numeratore e denominatore per il coniugato del denominatore, rendendolo reale.` },
    { id: 'fc-14', sezione: 'piano-di-gauss', tipo: 'definizione', fronte: R`Piano di Gauss`, retro: R`Piano cartesiano in cui l'asse orizzontale rappresenta la parte reale e l'asse verticale la parte immaginaria di $z$.` },
    { id: 'fc-15', sezione: 'piano-di-gauss', tipo: 'concetto', fronte: R`Dove sta il coniugato di $z$ nel piano di Gauss?`, retro: R`Nel punto simmetrico di $z$ rispetto all'asse reale (non rispetto all'origine, che darebbe $-z$).` },
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
    { tipo: 'errore', testo: R`Per trovare l'argomento non basta $\tan\theta=b/a$: controlla sempre in che quadrante sta il punto $(a,b)$, perché la tangente si ripete ogni $180^\circ$.` },
    { tipo: 'trucco', testo: R`Controllo lampo su un prodotto o un quoziente in forma trigonometrica: il modulo del risultato deve essere il prodotto (o il rapporto) dei moduli di partenza. Se non torna, c'è un errore.` },
    { tipo: 'errore', testo: R`Le radici $n$-esime di un numero non nullo sono sempre $n$, non una sola: fermarsi al primo valore di $k$ è l'errore più frequente.` },
    { tipo: 'metodo', testo: R`In un'equazione di secondo grado a coefficienti reali con $\Delta<0$, trovata una soluzione complessa l'altra si scrive subito: è la sua coniugata.` }
  ],

  aneddoti: [
    { matematico: 'Girolamo Cardano', anni: '1501–1576', titolo: 'Il problema con soluzione "impossibile" che tornava giusto', testo: R`Nel 1545, nell'*Ars Magna*, Cardano affrontò un problema all'apparenza innocuo: dividere $10$ in due parti il cui prodotto sia $40$. Chiamate $x$ e $y$ le due parti, $x+y=10$ e $xy=40$: sono le radici di $t^2-10t+40=0$, e il discriminante è negativo, $\Delta=100-160=-60$. Cardano non si fermò: scrisse formalmente le due "parti" come $5+\sqrt{-15}$ e $5-\sqrt{-15}$, chiamandole "quantità sofistiche" e ammettendo che operare con esse fosse una "tortura mentale". Poi, per curiosità, ne calcolò il prodotto: $(5+\sqrt{-15})(5-\sqrt{-15}) = 25-(-15) = 40$. Tornava. Cardano mise da parte il risultato come una curiosità inutile, senza immaginare che quella "tortura" sarebbe diventata un intero campo della matematica.`, legame: R`È il primo calcolo scritto della storia con un discriminante negativo maneggiato fino in fondo, invece di fermarsi a "impossibile".` },
    { matematico: 'Rafael Bombelli', anni: '1526–1572', titolo: 'L\'ingegnere che diede regole al "più di meno"', testo: R`Bombelli lavorava alla bonifica delle paludi della Val di Chiana quando, nei tempi morti fra un cantiere e l'altro, scrisse *L'Algebra*, pubblicata nel 1572. Il libro affronta di petto un problema che altri evitavano: l'equazione $x^3=15x+4$ ha la soluzione reale $x=4$, ma la formula di Cardano-Tartaglia porta a scrivere $\sqrt{-121}$ nei calcoli intermedi. Invece di arrendersi, Bombelli inventò un nome e delle regole per queste quantità: chiamò $\sqrt{-1}$ "più di meno" e $-\sqrt{-1}$ "meno di meno", e stabilì che "più di meno via più di meno fa meno" (con la nostra notazione, $i\cdot i=-1$). Applicando queste regole ai calcoli con $\sqrt{-121}$, ottenne correttamente $x=4$: la prova che le nuove quantità, pur "assurde", funzionavano.`, legame: R`Le regole di Bombelli per il "più di meno" sono, con altro nome, le regole con cui oggi si moltiplicano i numeri complessi.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'Una lettera per un numero che prima non si scriveva', testo: R`Prima del 1777 chi scriveva la radice di $-1$ doveva ripetere ogni volta il simbolo $\sqrt{-1}$, con il rischio di trattarlo per sbaglio come una radice qualunque (per esempio scrivendo $\sqrt{-1}\cdot\sqrt{-1}=\sqrt{1}=1$, invece di $-1$). Eulero, in una memoria del 1777 presentata all'Accademia di San Pietroburgo, propose di indicare quella quantità con una sola lettera, $i$ (iniziale di "imaginarius"), fissando una volta per tutte la regola $i^2=-1$. Eulero lavorò gran parte della vita quasi o del tutto cieco, dettando calcoli e articoli a memoria: la notazione $i$ è solo uno dei tanti simboli che usiamo ancora oggi per merito suo, insieme a $e$, $\pi$ e alla scrittura $f(x)$.`, legame: R`Il simbolo $i$ di questo intero argomento è la sua notazione: prima di lui si scriveva sempre e solo $\sqrt{-1}$.` },
    { matematico: 'Carl Friedrich Gauss', anni: '1777–1855', titolo: 'Il nome "complessi" al posto di "immaginari"', testo: R`Il primo a disegnare i numeri $a+bi$ come punti di un piano fu un agrimensore danese, Caspar Wessel, nel 1799, ma il suo lavoro, scritto in danese, passò inosservato per un secolo. La stessa idea fu riscoperta nel 1806 dal contabile svizzero Jean-Robert Argand, in un opuscolo pubblicato a proprie spese: da lui viene il nome "diagramma di Argand" ancora usato per questa rappresentazione. Fu però Gauss, nel 1831, a rendere popolare l'immagine geometrica e, soprattutto, a proporre il nome che ha vinto: **numeri complessi**, al posto di "numeri immaginari". Gauss trovava fuorviante la parola "immaginario", che sembrava dire che quei numeri fossero finti o inesistenti, mentre nel piano erano punti concreti quanto qualsiasi altro.`, legame: R`Il piano in cui si disegnano i numeri complessi porta il suo nome proprio per questa battaglia terminologica, vinta insieme alla rappresentazione geometrica.` },
    { matematico: 'William Rowan Hamilton', anni: '1805–1865', titolo: 'La formula incisa su un ponte', testo: R`Hamilton cercò per anni un modo di moltiplicare terne di numeri, per rappresentare le rotazioni dello spazio come i numeri complessi rappresentano quelle del piano. Ogni tentativo falliva. La soluzione arrivò all'improvviso il 16 ottobre 1843, mentre passeggiava lungo il Royal Canal di Dublino con la moglie, diretto a una riunione della Royal Irish Academy: servivano non tre numeri, ma **quattro**. Per paura di dimenticare l'intuizione prima di arrivare a casa, incise con il coltellino sulla pietra del ponte di Broom la formula $i^2=j^2=k^2=ijk=-1$: le regole dei suoi **quaternioni**. La scritta originale non è più leggibile, ma da allora ogni anno i matematici di Dublino ripercorrono in pellegrinaggio quel tragitto lungo il canale.`, legame: R`I quaternioni estendono a quattro dimensioni la stessa idea di $i$ studiata in questo argomento: un'unità che, moltiplicata per se stessa, dà $-1$.` }
  ]
});
})();
