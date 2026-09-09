(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'funzioni-goniometriche',
  titolo: 'Funzioni goniometriche',

  introduzione: R`Le funzioni goniometriche nascono da un'idea semplice: far ruotare un punto attorno a un centro e osservare le sue coordinate. Sono l'evoluzione dei rapporti trigonometrici che si studiano nei triangoli rettangoli (cateto opposto su ipotenusa, e simili), ma liberata dal vincolo di un angolo acuto: seno, coseno e tangente diventano funzioni definite per *qualsiasi* angolo, anche superiore a un angolo giro o negativo, e per questo si esprimono in funzione di un numero reale — l'angolo in radianti — invece che di una figura geometrica.

Compaiono ovunque ci sia qualcosa che oscilla o che ruota: la tensione alternata che esce da una presa di corrente è una sinusoide, il suono di una nota musicale è la sovrapposizione di sinusoidi di frequenze diverse, la durata del giorno varia nell'arco dell'anno seguendo (circa) una sinusoide, un rilievo topografico ricava per triangolazione distanze che non si possono misurare direttamente. Anche il moto di un pendolo o di una molla, per piccole oscillazioni, si descrive con seno e coseno.

Per affrontare bene l'argomento serve sapere cos'è una funzione (dominio, codominio, grafico) e conoscere un po' di geometria euclidea: triangoli simili, teorema di Pitagora, elementi della circonferenza.`,

  sezioni: [
    { id: 'gradi-radianti', titolo: 'Gradi e radianti', testo: R`Un angolo si può misurare in due unità diverse: i **gradi sessagesimali**, che dividono l'angolo giro in 360 parti uguali, e i **radianti**, l'unità che useremo quasi sempre da qui in avanti.

>* **Radiante:** l'angolo al centro che sottende, su una circonferenza di raggio $r$, un arco lungo quanto il raggio stesso. È un rapporto fra due lunghezze (arco fratto raggio), quindi è un numero puro, senza unità di misura.

Poiché la lunghezza dell'intera circonferenza è $2\pi r$, l'angolo giro misura $2\pi$ radianti: da qui viene la corrispondenza fondamentale $360^\circ = 2\pi$ rad, e quindi $180^\circ = \pi$ rad.

Per convertire si imposta una proporzione:

$$\alpha_{\text{rad}} = \alpha_{\text{gradi}} \cdot \frac{\pi}{180} \qquad\qquad \alpha_{\text{gradi}} = \alpha_{\text{rad}} \cdot \frac{180}{\pi}$$

Esempio: $60^\circ$ in radianti è $60 \cdot \dfrac{\pi}{180} = \dfrac{\pi}{3} \approx 1{,}047$; viceversa $\dfrac{3\pi}{4}$ radianti sono $\dfrac{3\pi}{4} \cdot \dfrac{180}{\pi} = 135^\circ$.

Il vantaggio dei radianti si vede nella **lunghezza di un arco**: se l'angolo al centro $\theta$ è espresso in radianti, l'arco che sottende su una circonferenza di raggio $r$ misura semplicemente $l = r\theta$, senza alcuna costante di conversione. In gradi la stessa formula avrebbe bisogno del fattore $\dfrac{\pi}{180}$.

>! I radianti restano quasi sempre espressi come frazioni di $\pi$ (per esempio $\dfrac{\pi}{6}$), non come numeri decimali: scrivere $0{,}524$ al posto di $\dfrac{\pi}{6}$ non è sbagliato, ma nasconde la struttura dell'angolo ed è scomodo nei calcoli successivi.` },

    { id: 'angoli-orientati', titolo: 'Angoli orientati e circonferenza goniometrica', testo: R`Finora un angolo era una figura, sempre positiva, senza un verso. In goniometria un angolo diventa **orientato**: ha un lato origine e un lato termine, e un verso di rotazione dal primo al secondo.

>* Per convenzione il verso **antiorario** (contrario al movimento delle lancette dell'orologio) è positivo; il verso orario è negativo. Un angolo di $-90^\circ$ è quindi lo stesso angolo di $90^\circ$ percorso nell'altro verso.

Per lavorare con angoli orientati si usa la **circonferenza goniometrica**: una circonferenza di raggio $1$, centrata nell'origine degli assi cartesiani. Un angolo $\alpha$ si rappresenta a partire dal semiasse positivo delle $x$ (il lato origine, fissato una volta per tutte): si ruota di $\alpha$ in verso antiorario (orario se $\alpha < 0$) e si arriva a un punto $P$ sulla circonferenza, il **punto associato** all'angolo $\alpha$.

Ruotando oltre l'angolo giro si torna sullo stesso punto: angoli come $30^\circ$, $390^\circ$ e $-330^\circ$ hanno lo stesso punto associato, perché differiscono per multipli dell'angolo giro. Si dice che sono **angoli congruenti**.

Nel grafico qui sotto il cursore fa scorrere l'angolo $t$: osserva come il punto $P$ percorre la circonferenza, e come le sue coordinate cambiano a seconda del quadrante.

[[grafico:puntoMobile]]

>! Un angolo orientato non è "compreso fra $0^\circ$ e $360^\circ$" per forza: $780^\circ$ (cioè $360^\circ + 360^\circ + 60^\circ$) è un angolo perfettamente legittimo, associato allo stesso punto di $60^\circ$.` },

    { id: 'seno-coseno', titolo: 'Seno e coseno', testo: R`Sulla circonferenza goniometrica, seno e coseno si definiscono nel modo più semplice possibile: sono le **coordinate** del punto associato all'angolo.

>* Se $P$ è il punto della circonferenza goniometrica associato all'angolo $\alpha$, si definisce $\cos\alpha$ l'**ascissa** di $P$ e $\sin\alpha$ la sua **ordinata**: $P = (\cos\alpha, \sin\alpha)$.

Questa definizione generalizza quella del triangolo rettangolo (cateto adiacente e cateto opposto sull'ipotenusa) a un angolo qualsiasi, perché quando $\alpha$ è acuto il punto $P$, l'origine e la proiezione di $P$ sull'asse $x$ formano proprio un triangolo rettangolo con ipotenusa $1$.

Siccome $P$ sta sempre sulla circonferenza di raggio $1$, le sue coordinate non escono mai da $[-1, 1]$: $-1 \le \sin\alpha \le 1$ e $-1 \le \cos\alpha \le 1$ per ogni angolo $\alpha$.

Il segno di seno e coseno dipende solo dal quadrante in cui cade $P$: nel primo quadrante sono entrambi positivi, nel secondo il coseno è negativo (ascissa a sinistra dell'asse $y$) e il seno resta positivo, nel terzo sono entrambi negativi, nel quarto il seno è negativo e il coseno torna positivo.

Esempio: l'angolo $\alpha = 120^\circ$ cade nel secondo quadrante: ci si aspetta $\sin 120^\circ > 0$ e $\cos 120^\circ < 0$, ed è proprio così: $\sin 120^\circ = \dfrac{\sqrt3}{2}$, $\cos 120^\circ = -\dfrac12$.

Muovi il cursore dell'angolo nel grafico e osserva come seno (segmento verticale) e coseno (segmento orizzontale) cambiano segno passando da un quadrante all'altro.

[[grafico:circonferenzaGoniometrica]]

>! È facile scambiare seno e coseno: il coseno è l'ascissa (coordinata orizzontale), il seno è l'ordinata (coordinata verticale). Nella scrittura $P = (\cos\alpha, \sin\alpha)$ l'ordine è lo stesso della coppia $(x, y)$.` },

    { id: 'tangente-cotangente', titolo: 'Tangente e cotangente', testo: R`La tangente si definisce come rapporto fra seno e coseno:

>* $$\tan\alpha = \frac{\sin\alpha}{\cos\alpha}, \qquad \text{con } \cos\alpha \ne 0.$$ In modo analogo si definisce la **cotangente**: $\cot\alpha = \dfrac{\cos\alpha}{\sin\alpha} = \dfrac{1}{\tan\alpha}$, con $\sin\alpha \ne 0$.

La tangente ha anche un significato geometrico diretto, da cui viene il nome: si traccia la retta **tangente** alla circonferenza goniometrica nel punto $(1,0)$, parallela all'asse $y$. Prolungando il raggio che porta al punto $P$ associato all'angolo $\alpha$ fino a incontrare questa retta, si ottiene un punto $T$: l'ordinata di $T$ è proprio $\tan\alpha$, positiva sopra l'asse $x$ e negativa sotto. È lo stesso rapporto cateto opposto su cateto adiacente del triangolo rettangolo, letto come lunghezza di un segmento invece che come frazione.

La cotangente ha una costruzione gemella sulla retta tangente alla circonferenza nel punto $(0,1)$, parallela all'asse $x$.

### Secante e cosecante

Due funzioni meno usate, ma comode in alcune formule, sono i reciproci di coseno e seno:

$$\sec\alpha = \frac{1}{\cos\alpha} \qquad\qquad \csc\alpha = \frac{1}{\sin\alpha}$$

con le stesse condizioni di esistenza di tangente e cotangente, rispettivamente.

Esempio: per $\alpha = 45^\circ$, $\sin\alpha = \cos\alpha = \dfrac{\sqrt2}{2}$, quindi $\tan 45^\circ = 1$ e $\sec 45^\circ = \dfrac{2}{\sqrt2} = \sqrt2$.

>! La tangente non è definita quando $\cos\alpha = 0$, cioè per $\alpha = 90^\circ + k \cdot 180^\circ$: in quei punti il punto $P$ ha ascissa $0$ e il raggio che porta a $P$ è parallelo alla retta tangente, quindi non la incontra mai.` },

    { id: 'angoli-notevoli', titolo: 'Gli angoli notevoli', testo: R`Per alcuni angoli, seno, coseno e tangente si esprimono con radicali semplici: si chiamano **angoli notevoli**, e conviene impararli a memoria perché tornano continuamente.

| $\alpha$ | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ |
|---|---|---|---|---|---|
| radianti | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
| $\sin\alpha$ | $0$ | $1/2$ | $\sqrt2/2$ | $\sqrt3/2$ | $1$ |
| $\cos\alpha$ | $1$ | $\sqrt3/2$ | $\sqrt2/2$ | $1/2$ | $0$ |
| $\tan\alpha$ | $0$ | $\sqrt3/3$ | $1$ | $\sqrt3$ | non definita |

Si notano due simmetrie utili per ricordare la tabella: seno di $30^\circ$ e coseno di $60^\circ$ coincidono ($1/2$), così come seno di $60^\circ$ e coseno di $30^\circ$ ($\sqrt3/2$); e la tangente si ottiene sempre dividendo la riga del seno per quella del coseno.

Anche i **multipli degli assi** hanno valori immediati, perché il punto associato coincide con un vertice degli assi:

| $\alpha$ | $0^\circ$ | $90^\circ$ | $180^\circ$ | $270^\circ$ | $360^\circ$ |
|---|---|---|---|---|---|
| $\sin\alpha$ | $0$ | $1$ | $0$ | $-1$ | $0$ |
| $\cos\alpha$ | $1$ | $0$ | $-1$ | $0$ | $1$ |

I valori degli altri angoli (per esempio $120^\circ$, $150^\circ$, $210^\circ$...) non vanno imparati uno per uno: si ottengono da questi con la regola degli **angoli associati**, nella prossima sezione.

Esempio: $\tan 60^\circ = \dfrac{\sin 60^\circ}{\cos 60^\circ} = \dfrac{\sqrt3/2}{1/2} = \sqrt3$, coerente con la tabella.

>! $\tan 90^\circ$ non vale "infinito" in senso numerico: la funzione tangente semplicemente non è definita in quel punto, perché lì il coseno si annulla.` },

    { id: 'relazioni-fondamentali', titolo: 'Le relazioni fondamentali', testo: R`Le funzioni goniometriche non sono indipendenti fra loro: conoscendone una (e il quadrante) si ricavano tutte le altre.

>* **Relazione fondamentale:** $$\sin^2\alpha + \cos^2\alpha = 1 \qquad \text{per ogni angolo } \alpha.$$

Si dimostra con il teorema di Pitagora: $P = (\cos\alpha, \sin\alpha)$ sta sulla circonferenza di raggio $1$ centrata nell'origine, quindi la sua distanza dall'origine — l'ipotenusa del triangolo rettangolo con cateti $|\cos\alpha|$ e $|\sin\alpha|$ — vale $1$, cioè $\cos^2\alpha + \sin^2\alpha = 1^2$.

Da questa relazione si ricava una funzione dall'altra:

$$\sin\alpha = \pm\sqrt{1 - \cos^2\alpha} \qquad\qquad \cos\alpha = \pm\sqrt{1 - \sin^2\alpha}$$

Il segno **non** si sceglie a caso: dipende dal quadrante in cui si trova $\alpha$, che va sempre specificato o dedotto da altre informazioni del problema.

Esempio: se $\sin\alpha = \dfrac35$ e $\alpha$ è un angolo del secondo quadrante, allora $\cos\alpha = -\sqrt{1 - \dfrac9{25}} = -\sqrt{\dfrac{16}{25}} = -\dfrac45$ (negativo, perché nel secondo quadrante il coseno è negativo).

Una seconda relazione lega tangente e coseno: dividendo la relazione fondamentale per $\cos^2\alpha$ si ottiene

$$1 + \tan^2\alpha = \frac{1}{\cos^2\alpha},$$

comoda quando si conosce la tangente e serve il coseno.

>! Da $\sin^2\alpha = \dfrac9{25}$ **non** segue $\sin\alpha = \dfrac35$: bisogna scegliere fra $+\dfrac35$ e $-\dfrac35$ guardando il quadrante, altrimenti si perde metà dell'informazione.` },

    { id: 'angoli-associati', titolo: 'Gli angoli associati', testo: R`Si chiamano **angoli associati** a $\alpha$ tutti gli angoli che si ottengono da $\alpha$ sommando o sottraendo multipli di $90^\circ$, oppure cambiandone il segno: $-\alpha$, $180^\circ - \alpha$, $180^\circ + \alpha$, $90^\circ - \alpha$, $90^\circ + \alpha$, e così via. Le loro funzioni goniometriche si esprimono sempre in funzione di quelle di $\alpha$, senza bisogno di nuove tabelle.

[[animazione:angoli-associati]]

L'animazione mostra il motivo geometrico: i punti associati a questi angoli sono **simmetrici** rispetto agli assi o alla bisettrice, quindi le loro coordinate coincidono con quelle di $\alpha$, a meno del segno o dello scambio fra le due.

>* **Regola pratica:** sommando o sottraendo un multiplo di $180^\circ$ (o cambiando solo il segno), la funzione **resta la stessa** (seno resta seno, coseno resta coseno); sommando o sottraendo $90^\circ$ (o un suo multiplo dispari), seno e coseno **si scambiano**. In ogni caso il segno finale si legge dal quadrante in cui cade l'angolo risultante, trattando $\alpha$ come se fosse un angolo acuto del primo quadrante.

Per esempio, $\sin(180^\circ + \alpha)$: si somma un multiplo di $180^\circ$, quindi la funzione resta il seno; $180^\circ + \alpha$ cade nel terzo quadrante (se $\alpha$ è acuto), dove il seno è negativo. Quindi $\sin(180^\circ + \alpha) = -\sin\alpha$. Invece $\cos(90^\circ - \alpha)$: si somma/sottrae $90^\circ$, quindi il coseno diventa seno; $90^\circ - \alpha$ resta nel primo quadrante (se $\alpha$ è acuto), dove il coseno è positivo. Quindi $\cos(90^\circ - \alpha) = \sin\alpha$ (angoli **complementari**).

Le coppie più usate hanno nomi propri: $\alpha$ e $-\alpha$ sono **opposti**, $\alpha$ e $180^\circ - \alpha$ sono **supplementari**, $\alpha$ e $90^\circ - \alpha$ sono **complementari**.

Esempio numerico: $\cos 150^\circ = \cos(180^\circ - 30^\circ) = -\cos 30^\circ = -\dfrac{\sqrt3}{2}$.

>! La regola pratica funziona pensando $\alpha$ come acuto, ma il risultato — la relazione fra $\sin\alpha$ e $\cos\alpha$ — vale per **ogni** valore di $\alpha$, non solo per quelli acuti.` },

    { id: 'grafici-periodicita', titolo: 'I grafici delle funzioni goniometriche', testo: R`Seno e coseno, come funzioni di un numero reale $x$ (l'angolo in radianti), hanno un grafico caratteristico chiamato **sinusoide** (per il coseno si dice anche cosinusoide, anche se è la stessa curva traslata).

[[animazione:circonferenza-sinusoide]]

L'animazione mostra da dove viene quella forma: mentre il punto gira sulla circonferenza goniometrica a velocità costante, la sua ordinata (il seno) sale e scende, e riportata su un asse orizzontale disegna esattamente l'onda della sinusoide.

>* **Periodicità:** ruotando di un angolo giro si torna allo stesso punto, quindi $\sin(x + 2\pi) = \sin x$ e $\cos(x + 2\pi) = \cos x$ per ogni $x$: seno e coseno sono funzioni **periodiche di periodo $2\pi$**.

Il grafico di entrambe oscilla fra $-1$ e $1$ (l'ampiezza è $1$), è definito per ogni $x$ reale, e le due curve sono identiche a meno di una traslazione orizzontale di $\dfrac{\pi}{2}$: $\cos x = \sin\left(x + \dfrac{\pi}{2}\right)$.

[[grafico:senoCoseno]]

La **tangente** ha un grafico molto diverso: cresce sempre (dove è definita), non è limitata, e ha un **asintoto verticale** ogni volta che il coseno si annulla, cioè in $x = \dfrac{\pi}{2} + k\pi$. Fra un asintoto e il successivo il grafico si ripete identico: la tangente ha periodo $\pi$, la metà di quello di seno e coseno.

[[grafico:tangentePiano]]

Esempio: vicino a $x = \dfrac{\pi}{2}$, da sinistra $\tan x$ cresce senza limite verso $+\infty$; subito dopo $\dfrac{\pi}{2}$, a destra, riparte da $-\infty$: per questo il grafico "si spezza" in tanti rami identici, uno per intervallo fra due asintoti.

>! Il periodo della tangente è $\pi$, non $2\pi$ come per seno e coseno: $\tan(x + \pi) = \tan x$, ma già $\tan\left(x + \dfrac{\pi}{2}\right) \ne \tan x$ in generale.` },

    { id: 'inverse-sinusoidi', titolo: 'Funzioni inverse e sinusoidi generali', testo: R`Le funzioni goniometriche non sono invertibili su tutto il loro dominio, perché non sono iniettive (infiniti angoli hanno lo stesso seno): per definire un'inversa si sceglie un intervallo dove la funzione è **monotona**, cioè cresce sempre o decresce sempre.

>* Si definiscono così le funzioni **inverse**: $\arcsin x$ (dominio $[-1,1]$, immagine $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$), $\arccos x$ (dominio $[-1,1]$, immagine $[0, \pi]$), $\arctan x$ (dominio $\mathbb{R}$, immagine $\left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$).

$\arcsin x$ risponde alla domanda «qual è l'angolo, fra $-\frac\pi2$ e $\frac\pi2$, il cui seno è $x$?»; analogamente per le altre due, ciascuna con il proprio intervallo di angoli ammessi.

Esempio: $\arcsin\left(\dfrac12\right) = \dfrac\pi6$, non $\dfrac{5\pi}{6}$: anche se anche $\dfrac{5\pi}{6}$ ha seno $\dfrac12$, quell'angolo non è nell'intervallo scelto per l'arcoseno.

### Sinusoidi generali

Una sinusoide più generale ha equazione

$$y = A \sin(\omega x + \varphi)$$

dove $A$ è l'**ampiezza** (l'oscillazione va da $-A$ ad $A$), $\omega$ è la **pulsazione** e regola il **periodo** $T = \dfrac{2\pi}{\omega}$ (più $\omega$ è grande, più le oscillazioni sono ravvicinate), e $\varphi$ è la **fase**, che trasla il grafico orizzontalmente di $-\dfrac{\varphi}{\omega}$ (a destra se questo valore è positivo, a sinistra se è negativo).

Prova a cambiare $A$, $\omega$ e $\varphi$ nel grafico e confronta con $y = \sin x$, sempre presente come riferimento tratteggiato.

[[grafico:sinusoideGenerale]]

Esempio: $y = 3\sin\left(2x - \dfrac{\pi}{2}\right)$ ha ampiezza $3$, periodo $\dfrac{2\pi}{2} = \pi$, ed è traslata a destra di $\dfrac{\pi}{4}$ rispetto a $y = 3\sin(2x)$.

>! Il periodo dipende solo da $\omega$, **non** da $A$ o $\varphi$: cambiare l'ampiezza allunga o comprime la curva in verticale, cambiare la fase la trasla, ma la distanza fra due massimi consecutivi resta $\dfrac{2\pi}{\omega}$.` }
  ],

  grafici: {
    puntoMobile: {
      tipo: 'piano', x: [-1.6, 1.6], y: [-1.6, 1.6],
      parametri: [{ nome: 't', min: 0, max: 360, passo: 1, valore: 40, etichetta: 't' }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1 },
        { tipo: 'segmento', da: [0, 0], a: ['cos(t*pi/180)', 'sin(t*pi/180)'] },
        { tipo: 'segmento', da: ['cos(t*pi/180)', 0], a: ['cos(t*pi/180)', 'sin(t*pi/180)'], tratteggio: true, colore: 1, etichetta: 'sin t' },
        { tipo: 'segmento', da: [0, 0], a: ['cos(t*pi/180)', 0], tratteggio: true, colore: 2, etichetta: 'cos t' },
        { tipo: 'punto', p: ['cos(t*pi/180)', 'sin(t*pi/180)'], etichetta: 'P', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [-1.55, 1.45], testo: 'sin t = {{sin(t*pi/180)}}   cos t = {{cos(t*pi/180)}}', ancora: 'start' }
      ],
      didascalia: 'Muovi il cursore t (in gradi): il punto P = (cos t; sin t) percorre la circonferenza, e i due segmenti colorati sono seno e coseno.'
    },
    circonferenzaGoniometrica: {
      tipo: 'circonferenza-goniometrica', angolo: 60, mostra: ['sin', 'cos', 'tan'],
      didascalia: 'Sposta il cursore dell\'angolo: seno (blu, verticale) e coseno (arancio, orizzontale) sono le proiezioni di P sugli assi; la tangente (verde-acqua) è il segmento sulla retta tangente in (1,0).'
    },
    senoCoseno: {
      tipo: 'piano', x: [-7, 7], y: [-1.6, 1.6], passo: [1, 0.5],
      funzioni: [
        { f: 'sin(x)', etichetta: 'y = sin x', colore: 1 },
        { f: 'cos(x)', etichetta: 'y = cos x', colore: 2, tratteggio: true }
      ],
      didascalia: 'Le due sinusoidi hanno la stessa forma, spostata di π/2: cos x = sin(x + π/2).'
    },
    tangentePiano: {
      tipo: 'piano', x: [-7, 7], y: [-6, 6], passo: [1, 1],
      funzioni: [{ f: 'tan(x)', etichetta: 'y = tan x', colore: 1 }],
      elementi: [
        { tipo: 'verticale', x: 1.5708, asintoto: true, etichetta: 'x = π/2' },
        { tipo: 'verticale', x: -1.5708, asintoto: true, etichetta: 'x = −π/2' }
      ],
      didascalia: 'La tangente ha periodo π e un asintoto verticale ogni volta che il coseno si annulla.'
    },
    sinusoideGenerale: {
      tipo: 'piano', x: [-7, 7], y: [-3.5, 3.5], passo: [1, 1],
      parametri: [
        { nome: 'A', min: 0.5, max: 3, passo: 0.1, valore: 1, etichetta: 'A' },
        { nome: 'w', min: 0.5, max: 3, passo: 0.1, valore: 1, etichetta: 'ω' },
        { nome: 'phi', min: -3.14, max: 3.14, passo: 0.1, valore: 0, etichetta: 'φ' }
      ],
      funzioni: [
        { f: 'sin(x)', etichetta: 'y = sin x', colore: 2, tratteggio: true },
        { f: 'A*sin(w*x + phi)', etichetta: 'y = A·sin(ωx + φ)', colore: 1 }
      ],
      didascalia: 'Cambia A, ω e φ: A regola l\'ampiezza, ω il periodo (2π/ω), φ lo spostamento orizzontale.'
    }
  },

  esempi: [
    { titolo: 'Conversione e quadrante', problema: R`Converti $210^\circ$ in radianti e stabilisci in quale quadrante cade.`, passi: [
      R`Uso la formula di conversione: $\alpha_{\text{rad}} = 210 \cdot \dfrac{\pi}{180} = \dfrac{210}{180}\pi = \dfrac{7\pi}{6}$.`,
      R`$\dfrac{7\pi}{6}$ è poco più di $\pi$ (cioè poco più di $180^\circ$): il punto associato ha appena superato il semiasse negativo delle $x$.`,
      R`$210^\circ$ sta fra $180^\circ$ e $270^\circ$: è nel terzo quadrante.`
    ], risultato: R`$210^\circ = \dfrac{7\pi}{6}$ rad, terzo quadrante.` },

    { titolo: 'Coordinate di un angolo notevole', problema: R`Trova le coordinate del punto della circonferenza goniometrica associato a $135^\circ$.`, passi: [
      R`$135^\circ = 180^\circ - 45^\circ$: è il supplementare di $45^\circ$, quindi cade nel secondo quadrante, dove il coseno è negativo e il seno positivo.`,
      R`Il valore assoluto è quello di $45^\circ$: $\sin 45^\circ = \cos 45^\circ = \dfrac{\sqrt2}{2}$.`,
      R`Applicando i segni del secondo quadrante: $\cos 135^\circ = -\dfrac{\sqrt2}{2}$, $\sin 135^\circ = \dfrac{\sqrt2}{2}$.`
    ], risultato: R`$P = \left(-\dfrac{\sqrt2}{2},\ \dfrac{\sqrt2}{2}\right)$` },

    { titolo: 'Dalla relazione fondamentale alla tangente', problema: R`Sapendo che $\cos\alpha = -\dfrac{5}{13}$ e che $\alpha$ è un angolo del terzo quadrante, trova $\sin\alpha$ e $\tan\alpha$.`, passi: [
      R`Dalla relazione fondamentale: $\sin^2\alpha = 1 - \cos^2\alpha = 1 - \dfrac{25}{169} = \dfrac{144}{169}$.`,
      R`$\sin\alpha = \pm\dfrac{12}{13}$; nel terzo quadrante il seno è negativo, quindi $\sin\alpha = -\dfrac{12}{13}$.`,
      R`$\tan\alpha = \dfrac{\sin\alpha}{\cos\alpha} = \dfrac{-12/13}{-5/13} = \dfrac{12}{5}$, positiva come ci si aspetta nel terzo quadrante.`
    ], risultato: R`$\sin\alpha = -\dfrac{12}{13}$, $\tan\alpha = \dfrac{12}{5}$` },

    { titolo: 'Angoli associati: angolo opposto', problema: R`Calcola $\sin 300^\circ$ usando gli angoli associati.`, passi: [
      R`$300^\circ$ è congruente a $-60^\circ$ (differiscono di un angolo giro): $300^\circ = 360^\circ - 60^\circ$.`,
      R`$-60^\circ$ è l'opposto di $60^\circ$; per gli angoli opposti $\sin(-\alpha) = -\sin\alpha$.`,
      R`Quindi $\sin 300^\circ = \sin(-60^\circ) = -\sin 60^\circ = -\dfrac{\sqrt3}{2}$.`
    ], risultato: R`$\sin 300^\circ = -\dfrac{\sqrt3}{2} \approx -0{,}866$` },

    { titolo: 'Ampiezza, periodo e fase', problema: R`Data $y = -2\sin\left(3x + \dfrac{\pi}{2}\right)$, trova ampiezza, periodo e traslazione orizzontale rispetto a $y = -2\sin(3x)$.`, passi: [
      R`L'ampiezza è il valore assoluto del coefficiente davanti al seno: $|-2| = 2$ (il segno meno ribalta il grafico, ma non cambia l'ampiezza).`,
      R`Il periodo dipende dalla pulsazione $\omega = 3$: $T = \dfrac{2\pi}{3}$.`,
      R`La fase è $\varphi = \dfrac{\pi}{2}$: la traslazione orizzontale è $-\dfrac{\varphi}{\omega} = -\dfrac{\pi}{6}$, cioè verso sinistra di $\dfrac{\pi}{6}$.`
    ], risultato: R`Ampiezza $2$, periodo $\dfrac{2\pi}{3}$, traslazione di $\dfrac{\pi}{6}$ a sinistra.` },

    { titolo: 'Una funzione inversa', problema: R`Calcola $\arccos\left(-\dfrac12\right)$.`, passi: [
      R`Cerco l'angolo, fra $0$ e $\pi$ (l'immagine di $\arccos$), il cui coseno vale $-\dfrac12$.`,
      R`So che $\cos 60^\circ = \dfrac12$; l'angolo supplementare $180^\circ - 60^\circ = 120^\circ$ ha coseno opposto, $\cos 120^\circ = -\dfrac12$, ed è nell'intervallo $[0^\circ, 180^\circ]$ richiesto.`,
      R`In radianti, $120^\circ = \dfrac{2\pi}{3}$.`
    ], risultato: R`$\arccos\left(-\dfrac12\right) = \dfrac{2\pi}{3}$ (cioè $120^\circ$)` }
  ],

  formulario: [
    { nome: 'Conversione gradi → radianti', formula: R`\alpha_{\text{rad}} = \alpha_{\text{gradi}} \cdot \frac{\pi}{180}` },
    { nome: 'Conversione radianti → gradi', formula: R`\alpha_{\text{gradi}} = \alpha_{\text{rad}} \cdot \frac{180}{\pi}` },
    { nome: 'Lunghezza dell\'arco', formula: R`l = r\,\theta`, nota: R`Valida solo se $\theta$ è espresso in radianti.` },
    { nome: 'Seno e coseno come coordinate', formula: R`P = (\cos\alpha,\ \sin\alpha)`, nota: R`$P$ è il punto della circonferenza goniometrica associato ad $\alpha$.` },
    { nome: 'Tangente', formula: R`\tan\alpha = \frac{\sin\alpha}{\cos\alpha}`, nota: R`Richiede $\cos\alpha \ne 0$.` },
    { nome: 'Cotangente', formula: R`\cot\alpha = \frac{\cos\alpha}{\sin\alpha} = \frac{1}{\tan\alpha}`, nota: R`Richiede $\sin\alpha \ne 0$.` },
    { nome: 'Secante e cosecante', formula: R`\sec\alpha = \frac{1}{\cos\alpha}, \qquad \csc\alpha = \frac{1}{\sin\alpha}` },
    { nome: 'Relazione fondamentale', formula: R`\sin^2\alpha + \cos^2\alpha = 1` },
    { nome: 'Dalla relazione fondamentale', formula: R`1 + \tan^2\alpha = \frac{1}{\cos^2\alpha}`, nota: R`Si ottiene dividendo la relazione fondamentale per $\cos^2\alpha$.` },
    { nome: 'Angoli opposti', formula: R`\sin(-\alpha) = -\sin\alpha, \qquad \cos(-\alpha) = \cos\alpha` },
    { nome: 'Angoli supplementari', formula: R`\sin(\pi - \alpha) = \sin\alpha, \qquad \cos(\pi - \alpha) = -\cos\alpha` },
    { nome: 'Angoli complementari', formula: R`\sin\left(\frac{\pi}{2} - \alpha\right) = \cos\alpha, \qquad \cos\left(\frac{\pi}{2} - \alpha\right) = \sin\alpha` },
    { nome: 'Periodo delle funzioni goniometriche', formula: R`\sin(x + 2\pi) = \sin x, \quad \cos(x + 2\pi) = \cos x, \quad \tan(x + \pi) = \tan x` },
    { nome: 'Sinusoide generale', formula: R`y = A \sin(\omega x + \varphi)`, nota: R`Ampiezza $A$, periodo $T = \dfrac{2\pi}{\omega}$, sfasamento $-\dfrac{\varphi}{\omega}$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'gradi-radianti', tipo: 'definizione', fronte: R`Che cos'è un radiante?`, retro: R`L'angolo al centro che sottende, su una circonferenza di raggio $r$, un arco lungo quanto $r$: è un numero puro (rapporto fra due lunghezze).` },
    { id: 'fc-02', sezione: 'gradi-radianti', tipo: 'formula', fronte: R`Conversione da gradi a radianti`, retro: R`$\alpha_{\text{rad}} = \alpha_{\text{gradi}} \cdot \dfrac{\pi}{180}$` },
    { id: 'fc-03', sezione: 'gradi-radianti', tipo: 'formula', fronte: R`Conversione da radianti a gradi`, retro: R`$\alpha_{\text{gradi}} = \alpha_{\text{rad}} \cdot \dfrac{180}{\pi}$` },
    { id: 'fc-04', sezione: 'gradi-radianti', tipo: 'formula', fronte: R`Lunghezza di un arco di circonferenza`, retro: R`$l = r\theta$, con $\theta$ espresso in radianti.` },
    { id: 'fc-05', sezione: 'angoli-orientati', tipo: 'definizione', fronte: R`Circonferenza goniometrica`, retro: R`Circonferenza di raggio $1$ centrata nell'origine degli assi, usata per rappresentare angoli orientati a partire dal semiasse positivo delle $x$.` },
    { id: 'fc-06', sezione: 'angoli-orientati', tipo: 'concetto', fronte: R`Qual è il verso positivo di un angolo orientato?`, retro: R`Il verso antiorario (contrario alle lancette dell'orologio). Il verso orario è negativo.` },
    { id: 'fc-07', sezione: 'angoli-orientati', tipo: 'concetto', fronte: R`Angoli congruenti`, retro: R`Angoli con lo stesso punto associato sulla circonferenza goniometrica: differiscono per multipli dell'angolo giro ($2\pi$).` },
    { id: 'fc-08', sezione: 'seno-coseno', tipo: 'definizione', fronte: R`Definizione di seno e coseno`, retro: R`Se $P$ è il punto della circonferenza goniometrica associato ad $\alpha$: $\cos\alpha$ è l'ascissa di $P$, $\sin\alpha$ è la sua ordinata.` },
    { id: 'fc-09', sezione: 'seno-coseno', tipo: 'concetto', fronte: R`In quale intervallo variano seno e coseno?`, retro: R`Sempre in $[-1, 1]$, perché sono le coordinate di un punto sulla circonferenza di raggio $1$.` },
    { id: 'fc-10', sezione: 'seno-coseno', tipo: 'concetto', fronte: R`Segno di seno e coseno nel secondo quadrante`, retro: R`Seno positivo, coseno negativo (l'ascissa è a sinistra dell'asse $y$).` },
    { id: 'fc-11', sezione: 'tangente-cotangente', tipo: 'definizione', fronte: R`Definizione di tangente`, retro: R`$\tan\alpha = \dfrac{\sin\alpha}{\cos\alpha}$, definita quando $\cos\alpha \ne 0$.` },
    { id: 'fc-12', sezione: 'tangente-cotangente', tipo: 'concetto', fronte: R`Significato geometrico della tangente`, retro: R`Lunghezza (con segno) del segmento staccato sulla retta tangente alla circonferenza goniometrica nel punto $(1,0)$, prolungando il raggio fino a incontrarla.` },
    { id: 'fc-13', sezione: 'tangente-cotangente', tipo: 'definizione', fronte: R`Definizione di cotangente`, retro: R`$\cot\alpha = \dfrac{\cos\alpha}{\sin\alpha} = \dfrac{1}{\tan\alpha}$, definita quando $\sin\alpha \ne 0$.` },
    { id: 'fc-14', sezione: 'tangente-cotangente', tipo: 'definizione', fronte: R`Secante e cosecante`, retro: R`$\sec\alpha = \dfrac{1}{\cos\alpha}$, $\csc\alpha = \dfrac{1}{\sin\alpha}$: i reciproci di coseno e seno.` },
    { id: 'fc-15', sezione: 'angoli-notevoli', tipo: 'formula', fronte: R`Seno, coseno e tangente di $30^\circ$, $45^\circ$, $60^\circ$`, retro: R`$\sin$: $\frac12, \frac{\sqrt2}{2}, \frac{\sqrt3}{2}$. $\cos$: gli stessi valori in ordine inverso. $\tan$: $\frac{\sqrt3}{3}, 1, \sqrt3$.` },
    { id: 'fc-16', sezione: 'angoli-notevoli', tipo: 'concetto', fronte: R`Seno e coseno di $0^\circ$, $90^\circ$, $180^\circ$, $270^\circ$`, retro: R`$\sin$: $0,1,0,-1$. $\cos$: $1,0,-1,0$: sono le coordinate dei quattro punti sugli assi.` },
    { id: 'fc-17', sezione: 'relazioni-fondamentali', tipo: 'formula', fronte: R`Relazione fondamentale della goniometria`, retro: R`$\sin^2\alpha + \cos^2\alpha = 1$, per ogni angolo $\alpha$.` },
    { id: 'fc-18', sezione: 'relazioni-fondamentali', tipo: 'procedura', fronte: R`Come si ricava $\cos\alpha$ da $\sin\alpha$?`, retro: R`$\cos\alpha = \pm\sqrt{1 - \sin^2\alpha}$: il segno si sceglie in base al quadrante di $\alpha$.` },
    { id: 'fc-19', sezione: 'angoli-associati', tipo: 'concetto', fronte: R`Regola pratica per gli angoli associati`, retro: R`Sommando o sottraendo un multiplo di $180^\circ$ la funzione resta la stessa; sommando o sottraendo $90^\circ$ seno e coseno si scambiano. Il segno si legge dal quadrante finale.` },
    { id: 'fc-20', sezione: 'angoli-associati', tipo: 'formula', fronte: R`Angoli opposti`, retro: R`$\sin(-\alpha) = -\sin\alpha$, $\cos(-\alpha) = \cos\alpha$.` },
    { id: 'fc-21', sezione: 'angoli-associati', tipo: 'formula', fronte: R`Angoli supplementari e complementari`, retro: R`Supplementari: $\sin(\pi-\alpha)=\sin\alpha$, $\cos(\pi-\alpha)=-\cos\alpha$. Complementari: seno e coseno si scambiano.` },
    { id: 'fc-22', sezione: 'grafici-periodicita', tipo: 'concetto', fronte: R`Periodo di seno, coseno, tangente`, retro: R`Seno e coseno hanno periodo $2\pi$; tangente e cotangente hanno periodo $\pi$.` },
    { id: 'fc-23', sezione: 'grafici-periodicita', tipo: 'concetto', fronte: R`Dove sono gli asintoti della tangente?`, retro: R`In $x = \dfrac{\pi}{2} + k\pi$, dove il coseno si annulla e la tangente non è definita.` },
    { id: 'fc-24', sezione: 'inverse-sinusoidi', tipo: 'definizione', fronte: R`Domini e immagini di arcoseno, arcocoseno, arcotangente`, retro: R`$\arcsin$: $[-1,1] \to \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$. $\arccos$: $[-1,1] \to [0,\pi]$. $\arctan$: $\mathbb{R} \to \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$.` },
    { id: 'fc-25', sezione: 'inverse-sinusoidi', tipo: 'formula', fronte: R`Sinusoide generale $y = A\sin(\omega x + \varphi)$`, retro: R`Ampiezza $A$, periodo $T = \dfrac{2\pi}{\omega}$, sfasamento orizzontale $-\dfrac{\varphi}{\omega}$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Converti l'angolo di $135^\circ$ in radianti.`, suggerimenti: [R`Usa la formula di conversione gradi → radianti.`, R`$135^\circ = 135 \cdot \dfrac{\pi}{180}$: semplifica la frazione prima di moltiplicare per $\pi$.`], risposta: { tipo: 'numero', valore: 2.356, tolleranza: 0.01 }, soluzione: [R`$\alpha_{\text{rad}} = 135 \cdot \dfrac{\pi}{180} = \dfrac{135}{180}\pi = \dfrac{3\pi}{4}$.`, R`In decimale, $\dfrac{3\pi}{4} \approx 2{,}356$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Converti $\dfrac{5\pi}{6}$ radianti in gradi.`, suggerimenti: [R`Usa la formula di conversione radianti → gradi.`, R`Il fattore $\pi$ si semplifica con quello al numeratore.`], risposta: { tipo: 'numero', valore: 150, tolleranza: 0.01 }, soluzione: [R`$\alpha_{\text{gradi}} = \dfrac{5\pi}{6} \cdot \dfrac{180}{\pi} = \dfrac{5 \cdot 180}{6} = 150^\circ$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Una circonferenza ha raggio $10$ cm. Quanto misura l'arco corrispondente a un angolo al centro di $45^\circ$? (Due cifre decimali, in cm.)`, suggerimenti: [R`Prima converti l'angolo in radianti: la formula $l = r\theta$ vuole $\theta$ in radianti.`, R`$45^\circ = \dfrac{\pi}{4}$ rad.`], risposta: { tipo: 'numero', valore: 7.854, tolleranza: 0.01 }, soluzione: [R`$45^\circ = \dfrac{\pi}{4} \approx 0{,}785$ rad.`, R`$l = r\theta = 10 \cdot \dfrac{\pi}{4} = 2{,}5\pi \approx 7{,}854$ cm.`] },
    { id: 'es-04', difficolta: 1, testo: R`Calcola $\sin 150^\circ$.`, suggerimenti: [R`$150^\circ = 180^\circ - 30^\circ$: è il supplementare di $30^\circ$.`, R`Gli angoli supplementari hanno lo stesso seno.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`$150^\circ$ è nel secondo quadrante, dove il seno è positivo.`, R`$\sin 150^\circ = \sin(180^\circ - 30^\circ) = \sin 30^\circ = \dfrac12$.`] },
    { id: 'es-05', difficolta: 1, testo: R`Calcola $\cos 210^\circ$.`, suggerimenti: [R`$210^\circ = 180^\circ + 30^\circ$.`, R`Nel terzo quadrante il coseno è negativo.`], risposta: { tipo: 'numero', valore: -0.866, tolleranza: 0.01 }, soluzione: [R`$210^\circ$ è nel terzo quadrante: $\cos 210^\circ = \cos(180^\circ + 30^\circ) = -\cos 30^\circ$.`, R`$-\cos 30^\circ = -\dfrac{\sqrt3}{2} \approx -0{,}866$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Sapendo che $\sin\alpha = \dfrac35$ e che $\alpha$ è un angolo del primo quadrante, trova $\cos\alpha$.`, suggerimenti: [R`Usa la relazione fondamentale $\sin^2\alpha + \cos^2\alpha = 1$.`, R`Nel primo quadrante il coseno è positivo.`], risposta: { tipo: 'numero', valore: 0.8, tolleranza: 0.01 }, soluzione: [R`$\cos^2\alpha = 1 - \dfrac9{25} = \dfrac{16}{25}$.`, R`$\cos\alpha = +\sqrt{\dfrac{16}{25}} = \dfrac45 = 0{,}8$ (positivo, primo quadrante).`] },
    { id: 'es-07', difficolta: 2, testo: R`Sapendo che $\tan\alpha = -1$ e che $\alpha$ è un angolo del secondo quadrante (fra $90^\circ$ e $180^\circ$), trova $\alpha$ in gradi.`, suggerimenti: [R`Il valore assoluto di $\tan\alpha$ corrisponde a un angolo notevole.`, R`$\tan 45^\circ = 1$: cerca il supplementare di $45^\circ$.`], risposta: { tipo: 'numero', valore: 135, tolleranza: 0.5 }, soluzione: [R`$|\tan\alpha| = 1$ corrisponde all'angolo notevole $45^\circ$.`, R`Nel secondo quadrante la tangente è negativa, e l'angolo cercato è il supplementare di $45^\circ$: $\alpha = 180^\circ - 45^\circ = 135^\circ$.`] },
    { id: 'es-08', difficolta: 2, testo: R`In quale quadrante si trova un angolo $\alpha$ per cui $\sin\alpha < 0$ e $\tan\alpha > 0$?`, suggerimenti: [R`Elenca i quadranti dove il seno è negativo.`, R`Fra questi, in quale la tangente (cioè seno e coseno con lo stesso segno) è positiva?`], risposta: { tipo: 'testo', accettate: ['terzo quadrante', 'terzo', 'iii quadrante', '3 quadrante', 'q3', 'quadrante iii'] }, soluzione: [R`$\sin\alpha < 0$ nel terzo e nel quarto quadrante.`, R`$\tan\alpha > 0$ quando seno e coseno hanno lo stesso segno: succede nel primo e nel terzo quadrante.`, R`L'unico quadrante comune alle due condizioni è il terzo.`] },
    { id: 'es-09', difficolta: 2, testo: R`Usa gli angoli associati per calcolare $\sin(180^\circ + 30^\circ)$.`, suggerimenti: [R`Sommare $180^\circ$ non cambia la funzione (resta seno).`, R`L'angolo $180^\circ + 30^\circ$ cade nel terzo quadrante: che segno ha lì il seno?`], risposta: { tipo: 'numero', valore: -0.5, tolleranza: 0.01 }, soluzione: [R`$180^\circ + 30^\circ$ è nel terzo quadrante, dove il seno è negativo.`, R`$\sin(180^\circ + 30^\circ) = -\sin 30^\circ = -\dfrac12$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Qual è il periodo della funzione $y = \sin(3x)$?`, suggerimenti: [R`Il periodo di $\sin(\omega x)$ è $\dfrac{2\pi}{\omega}$.`, R`Qui $\omega = 3$.`], risposta: { tipo: 'numero', valore: 2.094, tolleranza: 0.01 }, soluzione: [R`$T = \dfrac{2\pi}{\omega} = \dfrac{2\pi}{3} \approx 2{,}094$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Sapendo che $\cos\alpha = -\dfrac{12}{13}$ e che $\alpha$ è un angolo del terzo quadrante, trova $\sin\alpha$ (in forma decimale, tre cifre).`, suggerimenti: [R`Relazione fondamentale: $\sin^2\alpha = 1 - \cos^2\alpha$.`, R`Nel terzo quadrante anche il seno è negativo.`], risposta: { tipo: 'numero', valore: -0.385, tolleranza: 0.01 }, soluzione: [R`$\sin^2\alpha = 1 - \dfrac{144}{169} = \dfrac{25}{169}$.`, R`$\sin\alpha = \pm\dfrac{5}{13}$; nel terzo quadrante è negativo: $\sin\alpha = -\dfrac{5}{13} \approx -0{,}385$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Qual è il periodo della funzione $y = 3\sin\left(2x + \dfrac{\pi}{4}\right)$?`, suggerimenti: [R`L'ampiezza e la fase non contano per il periodo: guarda solo $\omega$.`, R`$\omega = 2$.`], risposta: { tipo: 'numero', valore: 3.1416, tolleranza: 0.01 }, soluzione: [R`Il periodo dipende solo dalla pulsazione $\omega = 2$: $T = \dfrac{2\pi}{2} = \pi$.`, R`$\pi \approx 3{,}1416$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quanti radianti corrispondono a un angolo giro ($360^\circ$)?`, opzioni: [R`$2\pi$`, R`$\pi$`, R`$\dfrac{\pi}{2}$`, R`$360$`], corretta: 0, spiegazione: R`L'angolo giro corrisponde all'intera circonferenza: $2\pi r$ diviso il raggio $r$ dà $2\pi$. $\pi$ è l'angolo piatto ($180^\circ$), $\dfrac{\pi}{2}$ è l'angolo retto, e $360$ senza unità non è un valore in radianti.` },
    { id: 'q-02', domanda: R`La formula corretta per convertire un angolo dai gradi ai radianti è:`, opzioni: [R`$\alpha_{\text{rad}} = \alpha_{\text{gradi}} \cdot \dfrac{180}{\pi}$`, R`$\alpha_{\text{rad}} = \alpha_{\text{gradi}} \cdot \dfrac{\pi}{180}$`, R`$\alpha_{\text{rad}} = \alpha_{\text{gradi}} + \pi$`, R`$\alpha_{\text{rad}} = \dfrac{\alpha_{\text{gradi}}}{\pi}$`], corretta: 1, spiegazione: R`La prima opzione è la formula inversa (da radianti a gradi); le altre due non corrispondono a nessuna proporzione valida fra le due unità.` },
    { id: 'q-03', domanda: R`La lunghezza $l$ di un arco di circonferenza di raggio $r$ e angolo al centro $\theta$ vale $l = r\theta$ a condizione che:`, opzioni: [R`$\theta$ sia espresso in gradi`, R`$r$ sia maggiore di $1$`, R`$\theta$ sia espresso in radianti`, R`vale sempre, qualunque unità si usi per $\theta$`], corretta: 2, spiegazione: R`Il radiante è definito proprio perché $l = r\theta$ funzioni senza costanti aggiuntive; in gradi servirebbe moltiplicare anche per $\dfrac{\pi}{180}$.` },
    { id: 'q-04', domanda: R`Per convenzione, un angolo orientato è positivo se il punto si sposta in senso:`, opzioni: [R`orario`, R`dipende dal quadrante di partenza`, R`non ha un verso, è sempre positivo`, R`antiorario`], corretta: 3, spiegazione: R`Il verso antiorario, cioè contrario al movimento delle lancette dell'orologio, è per convenzione il verso positivo.` },
    { id: 'q-05', domanda: R`Il raggio della circonferenza goniometrica vale:`, opzioni: [R`$1$`, R`dipende dal problema`, R`il diametro diviso $2\pi$`, R`il valore massimo del seno moltiplicato per $2$`], corretta: 0, spiegazione: R`Per definizione la circonferenza goniometrica ha raggio $1$: è questo che rende seno e coseno direttamente le coordinate del punto, senza bisogno di dividere per il raggio.` },
    { id: 'q-06', domanda: R`Se $P = (\cos\alpha, \sin\alpha)$ è il punto associato ad $\alpha$ sulla circonferenza goniometrica, allora:`, opzioni: [R`l'ordinata di $P$ è il coseno`, R`l'ascissa di $P$ è il coseno`, R`$P$ dipende dal raggio scelto`, R`$\cos\alpha$ e $\sin\alpha$ possono superare $1$ in valore assoluto`], corretta: 1, spiegazione: R`Per definizione l'ascissa di $P$ è $\cos\alpha$ e l'ordinata è $\sin\alpha$; entrambe restano in $[-1,1]$ perché $P$ sta su una circonferenza di raggio $1$.` },
    { id: 'q-07', domanda: R`L'insieme dei valori che possono assumere $\sin\alpha$ e $\cos\alpha$ è:`, opzioni: [R`tutto $\mathbb{R}$`, R`$[0, 1]$`, R`$[-1, 1]$`, R`$(-\infty, +\infty)$ tranne lo $0$`], corretta: 2, spiegazione: R`Sono le coordinate di un punto su una circonferenza di raggio $1$: non possono mai uscire dall'intervallo $[-1,1]$.` },
    { id: 'q-08', domanda: R`La tangente di un angolo non è definita quando:`, opzioni: [R`$\alpha = 0^\circ$`, R`$\alpha = 180^\circ$`, R`è sempre definita, per ogni $\alpha$`, R`$\alpha = 90^\circ + k \cdot 180^\circ$`], corretta: 3, spiegazione: R`$\tan\alpha = \dfrac{\sin\alpha}{\cos\alpha}$ non esiste quando $\cos\alpha = 0$, cioè per $\alpha = 90^\circ + k \cdot 180^\circ$. Negli altri angoli elencati il coseno non si annulla.` },
    { id: 'q-09', domanda: R`Geometricamente, $\tan\alpha$ è la misura (con segno) del segmento staccato sulla retta:`, opzioni: [R`tangente alla circonferenza goniometrica nel punto $(1,0)$, parallela all'asse $y$`, R`che congiunge l'origine con il punto $P$`, R`coincidente con l'asse $x$`, R`tangente alla circonferenza nel punto $(0,1)$, parallela all'asse $x$`], corretta: 0, spiegazione: R`La costruzione della tangente usa la retta verticale tangente alla circonferenza in $(1,0)$; l'ultima opzione descrive invece la costruzione della cotangente.` },
    { id: 'q-10', domanda: R`La relazione fondamentale della goniometria afferma che, per ogni angolo $\alpha$:`, opzioni: [R`$\sin\alpha + \cos\alpha = 1$`, R`$\sin^2\alpha + \cos^2\alpha = 1$`, R`$\sin\alpha \cdot \cos\alpha = 1$`, R`$\tan^2\alpha + 1 = \cos^2\alpha$`], corretta: 1, spiegazione: R`Segue dal teorema di Pitagora applicato al punto $(\cos\alpha, \sin\alpha)$ sulla circonferenza di raggio $1$. Le altre uguaglianze sono false in generale.` },
    { id: 'q-11', domanda: R`Nel primo quadrante ($0^\circ < \alpha < 90^\circ$), seno e coseno sono:`, opzioni: [R`entrambi negativi`, R`seno positivo, coseno negativo`, R`entrambi positivi`, R`seno negativo, coseno positivo`], corretta: 2, spiegazione: R`Nel primo quadrante il punto $P$ ha entrambe le coordinate positive.` },
    { id: 'q-12', domanda: R`In quale quadrante seno e coseno sono entrambi negativi?`, opzioni: [R`primo`, R`secondo`, R`quarto`, R`terzo`], corretta: 3, spiegazione: R`Nel terzo quadrante il punto $P$ ha ascissa e ordinata entrambe negative.` },
    { id: 'q-13', domanda: R`La relazione $\cos\left(\dfrac{\pi}{2} - \alpha\right)$ è uguale a:`, opzioni: [R`$\sin\alpha$`, R`$\cos\alpha$`, R`$-\sin\alpha$`, R`$-\cos\alpha$`], corretta: 0, spiegazione: R`$\alpha$ e $\dfrac{\pi}{2} - \alpha$ sono angoli complementari: seno e coseno si scambiano, ed entrambi restano nel primo quadrante (se $\alpha$ è acuto), quindi positivi.` },
    { id: 'q-14', domanda: R`La relazione $\sin(\pi - \alpha)$ è uguale a:`, opzioni: [R`$-\sin\alpha$`, R`$\sin\alpha$`, R`$\cos\alpha$`, R`$-\cos\alpha$`], corretta: 1, spiegazione: R`$\alpha$ e $\pi - \alpha$ sono angoli supplementari: la funzione resta il seno, e nel secondo quadrante il seno è ancora positivo.` },
    { id: 'q-15', domanda: R`Il periodo della funzione tangente è:`, opzioni: [R`$2\pi$`, R`$\dfrac{\pi}{2}$`, R`$\pi$`, R`$4\pi$`], corretta: 2, spiegazione: R`A differenza di seno e coseno (periodo $2\pi$), la tangente si ripete già dopo mezzo giro: $\tan(x + \pi) = \tan x$.` },
    { id: 'q-16', domanda: R`Il dominio della funzione $\arcsin$ è:`, opzioni: [R`tutto $\mathbb{R}$`, R`$\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$`, R`$[0,\pi]$`, R`$[-1,1]$`], corretta: 3, spiegazione: R`$\arcsin x$ ha senso solo se $x$ è un valore che il seno può assumere, cioè $x \in [-1,1]$; l'intervallo con $\pi$ è invece la sua immagine.` },
    { id: 'q-17', domanda: R`L'immagine (codominio) della funzione $\arctan$ è:`, opzioni: [R`$\left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$`, R`$\mathbb{R}$`, R`$[-1,1]$`, R`$[0,\pi]$`], corretta: 0, spiegazione: R`$\arctan x$ restituisce sempre un angolo strettamente compreso fra $-\dfrac{\pi}{2}$ e $\dfrac{\pi}{2}$, mai uguale agli estremi (che sono asintoti della tangente).` },
    { id: 'q-18', domanda: R`Nella sinusoide $y = A\sin(\omega x + \varphi)$, il periodo vale:`, opzioni: [R`$2\pi\omega$`, R`$\dfrac{2\pi}{\omega}$`, R`$\dfrac{\omega}{2\pi}$`, R`$A \cdot 2\pi$`], corretta: 1, spiegazione: R`Il periodo dipende solo dalla pulsazione $\omega$, non dall'ampiezza $A$ né dalla fase $\varphi$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di calcolare qualunque valore, individua il quadrante dell'angolo: da lì conosci già i segni di seno, coseno e tangente, ancora prima di fare i conti.` },
    { tipo: 'errore', testo: R`$\sin\alpha$ e $\cos\alpha$ non sono mai maggiori di $1$ in valore assoluto: se un calcolo restituisce $\sin\alpha = 1{,}3$, c'è un errore da qualche parte.` },
    { tipo: 'trucco', testo: R`Per ricordare i valori di $30^\circ$, $45^\circ$, $60^\circ$: al numeratore compaiono $1, \sqrt2, \sqrt3$ (crescenti per il seno, decrescenti per il coseno), tutti divisi per $2$.` },
    { tipo: 'errore', testo: R`Negli angoli associati, lo scambio fra seno e coseno riguarda solo i multipli di $90^\circ$; sommando un multiplo di $180^\circ$ la funzione resta la stessa. Confondere le due regole è l'errore più comune.` },
    { tipo: 'metodo', testo: R`Per applicare la regola pratica degli angoli associati, immagina sempre $\alpha$ come un angolo acuto del primo quadrante: il segno finale si legge da dove cade l'angolo associato, non da $\alpha$.` },
    { tipo: 'trucco', testo: R`Un radiante misura circa $57$ gradi: un modo rapido per farsi un'idea della grandezza di un angolo dato in radianti, prima ancora di convertirlo con precisione.` },
    { tipo: 'errore', testo: R`Il periodo della tangente è $\pi$, non $2\pi$: copiare per la tangente il periodo di seno e coseno è un errore frequente.` },
    { tipo: 'trucco', testo: R`Controllo lampo su un seno o un coseno appena calcolati: eleva al quadrato entrambi (se li conosci) e verifica che la somma faccia $1$.` }
  ],

  aneddoti: [
    { matematico: 'Ipparco di Nicea', anni: 'circa 190–120 a.C.', titolo: 'La tavola delle corde per misurare il cielo', testo: R`Ipparco, astronomo greco attivo a Rodi, è considerato il padre della trigonometria: per calcolare posizioni di stelle e pianeti costruì quella che le fonti successive (la sua opera originale è andata perduta) descrivono come la prima tavola delle corde, un elenco che associava a ogni angolo al centro di una circonferenza la lunghezza della corda che quell'angolo sottende. Non esisteva ancora il seno: si ragionava sulla corda intera, non sulla sua metà. Ipparco usò questi strumenti anche per confrontare le proprie osservazioni astronomiche con quelle greche di 150 anni prima, e scoprì così la precessione degli equinozi: l'asse terrestre "dondola" lentissimamente, come una trottola, con un periodo di circa 26000 anni.`, legame: R`La tavola delle corde è l'antenata diretta delle tavole di seno e coseno: la corda di un angolo doppio è, a meno di un fattore, il seno dell'angolo stesso.` },
    { matematico: 'Aryabhata', anni: '476–550', titolo: 'Il seno come mezza corda', testo: R`Nel 499 d.C. l'astronomo e matematico indiano Aryabhata completò l'Aryabhatiya, un trattato in versi sanscriti che contiene tavole trigonometriche costruite in modo diverso da quelle greche: invece della corda intera di un angolo doppio, Aryabhata tabulò la sua metà, cioè esattamente quello che oggi chiamiamo seno. La chiamò jya-ardha ("mezza corda"), spesso abbreviato in jya. È un cambio di prospettiva piccolo sulla carta ma enorme nelle conseguenze: da lì in poi si ragiona su un segmento legato a un solo angolo, non su una corda legata al suo doppio. Aryabhata calcolò anche un valore di pi greco accurato a quattro cifre decimali ($3{,}1416$), dichiarando esplicitamente che si trattava di un valore approssimato: un'onestà scientifica non scontata per l'epoca.`, legame: R`Jya, la "mezza corda" di Aryabhata, è il seno che oggi si definisce come ordinata del punto sulla circonferenza goniometrica.` },
    { matematico: 'Gherardo da Cremona', anni: '1114–1187', titolo: 'Un errore di traduzione diventato la parola "seno"', testo: R`Il termine sanscrito jya passò agli astronomi arabi come jiba, una semplice trascrizione fonetica priva di significato in arabo. Ma l'arabo si scrive senza le vocali brevi, e jiba, riletto da chi non conosceva il termine tecnico, fu scambiato per jaib, una parola araba comune che vuol dire "insenatura", "piega della veste" o "seno" nel senso di golfo. Quando nel XII secolo i traduttori della scuola di Toledo — fra cui si ricorda soprattutto Gherardo da Cremona, che tradusse in latino un centinaio di opere scientifiche arabe — trovarono jaib nei testi di astronomia, lo resero con il latino sinus, che ha esattamente lo stesso campo di significati. Da sinus vengono l'italiano "seno", l'inglese sine, il francese sinus.`, legame: R`Ogni volta che si scrive $\sin\alpha$ si sta usando, senza saperlo, la parola scelta per un fraintendimento fra due lingue, otto secoli fa.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'Le funzioni al posto delle corde', testo: R`Fino al Settecento seno e coseno erano pensati come lunghezze di segmenti dentro una circonferenza di raggio scelto di volta in volta: cambiava il raggio, cambiavano i numeri delle tavole. Nel trattato Introductio in analysin infinitorum (1748), Eulero cambiò impostazione: trattò seno e coseno come funzioni di un numero reale, l'angolo misurato in radianti su una circonferenza di raggio $1$, esattamente come si studia oggi al liceo. Standardizzò anche le abbreviazioni sin, cos, tang che usiamo ancora, al posto di scritture più macchinose dei matematici precedenti. Ed è sempre Eulero a collegare trigonometria, numeri complessi ed esponenziali nella formula $e^{i\theta} = \cos\theta + i\sin\theta$, definita da molti "la più bella formula della matematica".`, legame: R`L'idea di seno e coseno come funzioni di un angolo in radianti, con dominio $\mathbb{R}$ e periodo $2\pi$, è esattamente l'impostazione di Eulero, non quella dei greci o degli indiani.` },
    { matematico: 'James Thomson', anni: '1822–1892', titolo: 'Il radiante, un\'unità di misura recente', testo: R`Il radiante come unità di misura degli angoli è sorprendentemente giovane: la parola stessa compare, per quanto si sa, per la prima volta nel 1873, in un compito d'esame scritto da James Thomson — ingegnere e matematico, fratello del più celebre Lord Kelvin — per gli studenti del Queen's College di Belfast, dove insegnava ingegneria. Prima di allora ci si riferiva a quella misura con perifrasi come "misura circolare". Il termine piacque, si diffuse rapidamente fra i matematici britannici e in pochi decenni divenne lo standard internazionale che è ancora oggi. Un'unità così centrale in analisi (basti pensare a $\dfrac{d}{dx}\sin x = \cos x$, valida solo misurando gli angoli in radianti) ha quindi una data di nascita più recente di molte delle scoperte matematiche che la usano.`, legame: R`Ogni volta che si scrive un angolo come $\dfrac{\pi}{3}$ invece che $60^\circ$ si sta usando l'unità introdotta da Thomson nel 1873.` }
  ]
});
})();
