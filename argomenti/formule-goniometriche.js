(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'formule-goniometriche',
  titolo: 'Formule goniometriche',

  introduzione: R`Le formule goniometriche mettono in relazione seno, coseno e tangente di angoli diversi: la somma di due angoli, il doppio di un angolo, la metà di un angolo. Senza di esse la trigonometria si fermerebbe agli angoli notevoli ($30°$, $45°$, $60°$) letti sulla circonferenza goniometrica: con le formule si calcola $\sin75°$ sapendo solo $\sin30°$ e $\sin45°$, si trova $\cos2\alpha$ senza disegnare un nuovo triangolo, si trasforma $3\sin x + 4\cos x$ in un'unica sinusoide.

Sono lo strumento con cui si risolvono le equazioni e le disequazioni goniometriche (l'argomento successivo), si semplificano espressioni con seno e coseno, si calcola l'angolo fra due rette a partire dai loro coefficienti angolari. Per secoli sono state anche un metodo di calcolo vero e proprio: prima dei logaritmi, gli astronomi trasformavano un prodotto di seni e coseni in una somma (le formule di Werner) per moltiplicare numeri grandi con la sola addizione.

Per seguire bene serve conoscere le funzioni goniometriche di base (seno, coseno, tangente, la circonferenza goniometrica, gli angoli associati) e saper risolvere equazioni di secondo grado e sistemi semplici.`,

  sezioni: [
    { id: 'addizione-sottrazione', titolo: 'Le formule di addizione e sottrazione', testo: R`Le formule di addizione permettono di calcolare seno, coseno e tangente della somma (o della differenza) di due angoli a partire dai valori dei singoli angoli.

>* **Formule di addizione:** $$\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$$ $$\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$$ Cambiando il segno di $\beta$ (con $\cos(-\beta)=\cos\beta$ e $\sin(-\beta)=-\sin\beta$) si ottengono le formule di sottrazione, con il segno centrale invertito.

Attenzione: $\sin(\alpha+\beta)$ **non** è $\sin\alpha+\sin\beta$, perché il seno non è una funzione lineare. Si vede subito con $\alpha=\beta=45°$: $\sin90°=1$, mentre $\sin45°+\sin45°=\sqrt2\approx1,41$.

Una dimostrazione parte dalla distanza fra due punti della circonferenza goniometrica: i punti $A=(\cos\alpha,\sin\alpha)$ e $B=(\cos\beta,\sin\beta)$ distano $AB$ come si calcola con il teorema di Pitagora sulle coordinate, ma $AB$ è anche la corda dell'angolo al centro $\alpha-\beta$; uguagliando le due espressioni si ricava $\cos(\alpha-\beta)$, e da lì le altre formule. La stessa idea, in una forma più antica, usa il teorema di Tolomeo sui quadrilateri ciclici (vedi l'aneddoto in fondo alla pagina).

Dividendo numeratore e denominatore per $\cos\alpha\cos\beta$ si ottiene la tangente:

>* $$\tan(\alpha+\beta) = \frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}$$

Esempio: $\sin75° = \sin(45°+30°) = \sin45°\cos30°+\cos45°\sin30° = \dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2}+\dfrac{\sqrt2}{2}\cdot\dfrac12 = \dfrac{\sqrt6+\sqrt2}{4}$.

Il grafico verifica numericamente la formula: qualunque siano $\alpha$ e $\beta$, $\sin(\alpha+\beta)$ e $\sin\alpha\cos\beta+\cos\alpha\sin\beta$ restano uguali.

[[grafico:sommaAngoli]]

>! Nella formula del coseno il segno si **inverte**: addizione con il meno, sottrazione con il più (l'esatto contrario del seno). È l'errore più comune, insieme a dimenticare l'$1$ al denominatore della tangente.` },

    { id: 'angolo-tra-rette', titolo: "L'angolo fra due rette", testo: R`Ogni retta non verticale forma con l'asse $x$ un angolo la cui tangente è il coefficiente angolare: $m=\tan\theta$. Se due rette hanno coefficienti angolari $m_1$ e $m_2$, l'angolo compreso fra loro si trova applicando la formula di sottrazione della tangente ai due angoli $\theta_1=\arctan m_1$ e $\theta_2=\arctan m_2$.

>* **Angolo fra due rette:** $$\tan\theta = \left|\frac{m_2-m_1}{1+m_1m_2}\right|$$ Il valore assoluto serve perché si prende sempre l'angolo acuto (o retto) fra le due rette, non quello ottuso supplementare.

Due casi particolari si riconoscono senza calcolare $\theta$: se $1+m_1m_2=0$ (cioè $m_1m_2=-1$) le rette sono **perpendicolari** ($\theta=90°$, la tangente non è definita); se $m_1=m_2$ il numeratore è zero e le rette sono **parallele** ($\theta=0°$), a meno che non siano la stessa retta.

Esempio: $r: y=2x+1$ e $s: y=-\dfrac13x+4$. Qui $m_1=2$ e $m_2=-\dfrac13$, quindi $$\tan\theta = \left|\frac{-\frac13-2}{1+2\cdot\left(-\frac13\right)}\right| = \left|\frac{-\frac73}{\frac13}\right| = 7,$$ da cui $\theta=\arctan7\approx81,9°$: le due rette formano un angolo quasi retto, ma non sono perpendicolari (per esserlo servirebbe $m_1m_2=-1$, mentre qui $m_1m_2=-\dfrac23$).

[[grafico:angoloRette]]

>! Il modulo va calcolato **sulla frazione intera**, dopo aver fatto tutti i calcoli, non separatamente su numeratore e denominatore: altrimenti si rischia di perdere il segno che indica se le rette sono perpendicolari.` },

    { id: 'duplicazione', titolo: 'Le formule di duplicazione', testo: R`Ponendo $\beta=\alpha$ nelle formule di addizione si ottengono le **formule di duplicazione**, che esprimono seno, coseno e tangente dell'angolo doppio.

>* $$\sin2\alpha = 2\sin\alpha\cos\alpha$$ $$\cos2\alpha = \cos^2\alpha-\sin^2\alpha = 2\cos^2\alpha-1 = 1-2\sin^2\alpha$$ $$\tan2\alpha = \frac{2\tan\alpha}{1-\tan^2\alpha}$$

Le tre forme di $\cos2\alpha$ sono la stessa formula riscritta con l'identità $\sin^2\alpha+\cos^2\alpha=1$: si sceglie quella più comoda a seconda di cosa si conosce (solo $\cos\alpha$, solo $\sin\alpha$, o entrambi).

Esempio: se $\sin\alpha=\dfrac35$ e $\alpha$ è acuto, allora $\cos\alpha=\dfrac45$ (positivo, primo quadrante), e $$\sin2\alpha = 2\cdot\frac35\cdot\frac45=\frac{24}{25}, \qquad \cos2\alpha = 1-2\cdot\frac{9}{25}=\frac{7}{25}, \qquad \tan2\alpha=\frac{24/25}{7/25}=\frac{24}{7}.$$

Il grafico mostra $y=\sin2x$ e $y=2\sin x\cos x$: la stessa curva, sovrapposta esattamente. La tratteggiata $y=2\sin x$ è invece l'errore tipico: raddoppiare l'angolo **non** raddoppia il seno.

[[grafico:duplicazioneSeno]]

>! $\sin2\alpha\ne2\sin\alpha$ e $\cos2\alpha\ne2\cos\alpha$: seno e coseno non sono funzioni lineari. Un altro errore frequente è confondere le tre forme equivalenti di $\cos2\alpha$ o usarne una senza controllare cosa è dato nel problema.` },

    { id: 'bisezione', titolo: 'Le formule di bisezione', testo: R`Risolvendo le formule di $\cos2\alpha$ rispetto a $\sin\alpha$ e $\cos\alpha$, e sostituendo $\alpha$ con $\dfrac\alpha2$, si ottengono le **formule di bisezione**.

>* $$\sin\frac{\alpha}{2} = \pm\sqrt{\frac{1-\cos\alpha}{2}} \qquad\qquad \cos\frac{\alpha}{2} = \pm\sqrt{\frac{1+\cos\alpha}{2}}$$ Il segno **non** segue una regola fissa: si guarda in quale quadrante cade $\dfrac\alpha2$ e si sceglie il segno coerente con quel quadrante.

Per la tangente esiste una forma senza radicali, che ha già il segno giusto incorporato:

>* $$\tan\frac{\alpha}{2} = \pm\sqrt{\frac{1-\cos\alpha}{1+\cos\alpha}} = \frac{\sin\alpha}{1+\cos\alpha} = \frac{1-\cos\alpha}{\sin\alpha}$$

Esempio: calcolare $\cos22,5°$, cioè $\cos\dfrac{45°}{2}$. Con $\cos45°=\dfrac{\sqrt2}{2}$: $$\cos22,5° = \sqrt{\frac{1+\frac{\sqrt2}{2}}{2}} = \sqrt{\frac{2+\sqrt2}{4}} = \frac{\sqrt{2+\sqrt2}}{2}.$$ Il segno è positivo perché $22,5°$ è un angolo del primo quadrante.

>! Dimenticarsi di scegliere il segno (o metterlo sempre positivo) è l'errore più comune: $\sin\dfrac\alpha2$, per esempio, è negativo se $\alpha$ è fra $360°$ e $720°$, perché allora $\dfrac\alpha2$ cade nel terzo o quarto quadrante. Il segno si decide guardando $\dfrac\alpha2$, non $\alpha$.` },

    { id: 'parametriche', titolo: 'Le formule parametriche', testo: R`Ponendo $t=\tan\dfrac\alpha2$ si scrivono $\sin\alpha$, $\cos\alpha$ e $\tan\alpha$ come funzioni razionali di $t$: sono le **formule parametriche**, utili perché trasformano un'equazione goniometrica in un'equazione algebrica in $t$.

>* $$\sin\alpha = \frac{2t}{1+t^2} \qquad \cos\alpha = \frac{1-t^2}{1+t^2} \qquad \tan\alpha = \frac{2t}{1-t^2} \qquad \text{con } t=\tan\frac{\alpha}{2}$$

Si ricavano dalla duplicazione applicata all'angolo $\dfrac\alpha2$: $\sin\alpha=\sin\left(2\cdot\dfrac\alpha2\right)=2\sin\dfrac\alpha2\cos\dfrac\alpha2$, e dividendo e moltiplicando per $\cos\dfrac\alpha2$ tutto si riscrive in funzione di $t=\tan\dfrac\alpha2$.

Esempio: se $t=\tan\dfrac\alpha2=\dfrac12$, allora $$\sin\alpha = \frac{2\cdot\frac12}{1+\frac14} = \frac{1}{\frac54} = \frac45, \qquad \cos\alpha = \frac{1-\frac14}{1+\frac14} = \frac{\frac34}{\frac54} = \frac35.$$

Le formule parametriche hanno un limite: valgono solo se $\dfrac\alpha2$ non è un angolo retto, cioè se $\alpha\ne180°+k\cdot360°$, perché lì $\tan\dfrac\alpha2$ non esiste.

>! Sostituendo $t=\tan\dfrac\alpha2$ in un'equazione si perde temporaneamente il valore $\alpha=180°$ (e i suoi multipli dispari): prima di usare le formule parametriche conviene controllare a parte se $180°$, più i giri, è soluzione.` },

    { id: 'prostaferesi-werner', titolo: 'Prostaferesi e formule di Werner', testo: R`Le formule di **Werner** trasformano un prodotto di seni o coseni in una somma; le formule di **prostaferesi** fanno il percorso inverso, da una somma (o differenza) a un prodotto. Si ricavano sommando o sottraendo le formule di addizione e sottrazione.

>* **Werner (prodotto → somma):** $$\sin\alpha\cos\beta = \frac12\big[\sin(\alpha+\beta)+\sin(\alpha-\beta)\big]$$ $$\cos\alpha\cos\beta = \frac12\big[\cos(\alpha-\beta)+\cos(\alpha+\beta)\big] \qquad \sin\alpha\sin\beta = \frac12\big[\cos(\alpha-\beta)-\cos(\alpha+\beta)\big]$$

>* **Prostaferesi (somma → prodotto):** $$\sin p+\sin q = 2\sin\frac{p+q}{2}\cos\frac{p-q}{2} \qquad\qquad \cos p+\cos q = 2\cos\frac{p+q}{2}\cos\frac{p-q}{2}$$

Un uso tipico: $\sin75°+\sin15°$ non si calcola sommando due valori con radicali diversi, ma con la prostaferesi diventa $2\sin45°\cos30° = 2\cdot\dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2} = \dfrac{\sqrt6}{2}$, molto più semplice. Un caso particolare di Werner con $\alpha=\beta=x$ dà $\cos^2x=\dfrac{1+\cos2x}{2}$, la stessa formula vista al contrario nella sezione sulla duplicazione: utile per "abbassare il grado" nelle equazioni e negli integrali.

[[grafico:cosQuadro]]

Prima dei logaritmi, la prostaferesi (dal greco, "addizione e sottrazione") era un metodo di calcolo reale: per moltiplicare due numeri grandi si cercavano i loro coseni su una tavola, si sommava, e si tornava indietro con la tavola inversa. Un prodotto costoso diventava un'addizione. Il metodo, sviluppato da Johannes Werner e usato nell'osservatorio di Tycho Brahe, restò lo standard finché Napier non pubblicò i logaritmi, nel 1614 (vedi l'aneddoto in fondo alla pagina).

>! Prostaferesi e Werner si confondono facilmente perché sono l'una l'inversa dell'altra: Werner parte da un **prodotto** e arriva a una somma, la prostaferesi parte da una **somma** e arriva a un prodotto. Un modo per non sbagliare: guardare cosa c'è a sinistra dell'uguale nella formula che serve.` },

    { id: 'angolo-aggiunto', titolo: "Il metodo dell'angolo aggiunto", testo: R`Una somma $a\sin x+b\cos x$, con $a$ e $b$ non entrambi nulli, si può sempre scrivere come un'unica sinusoide con un angolo "aggiunto" $\varphi$.

>* $$a\sin x+b\cos x = r\sin(x+\varphi), \qquad r=\sqrt{a^2+b^2}$$ dove $\varphi$ è l'angolo con $\cos\varphi=\dfrac{a}{r}$ e $\sin\varphi=\dfrac{b}{r}$ (se $a>0$, semplicemente $\varphi=\arctan\dfrac{b}{a}$).

Si dimostra sviluppando il secondo membro con la formula di addizione: $r\sin(x+\varphi)=r\cos\varphi\sin x+r\sin\varphi\cos x$, che coincide con $a\sin x+b\cos x$ proprio quando $r\cos\varphi=a$ e $r\sin\varphi=b$; elevando al quadrato e sommando si trova $r^2=a^2+b^2$.

Esempio: $3\sin x+4\cos x$. Qui $r=\sqrt{9+16}=5$ e $\varphi=\arctan\dfrac43\approx53,1°$ (l'angolo con coseno $\dfrac35$ e seno $\dfrac45$, entrambi positivi). Quindi $3\sin x+4\cos x=5\sin(x+53,1°)$: il massimo della funzione è $5$, non $3+4=7$.

Il grafico sovrappone $y=a\sin x+b\cos x$ e $y=r\sin(x+\varphi)$ per i valori di $a$ e $b$ che scegli: coincidono sempre, quando $a>0$.

[[grafico:angoloAggiunto]]

>* L'ampiezza $r=\sqrt{a^2+b^2}$ è anche il valore massimo che $a\sin x+b\cos x$ può assumere, e $-r$ il minimo: per questo il metodo serve nelle equazioni e disequazioni lineari in seno e coseno.

>! $\varphi=\arctan\dfrac ba$ è corretto solo se $a>0$: con $a<0$ la calcolatrice restituisce un angolo del quadrante sbagliato, e va corretto aggiungendo $180°$.` },

    { id: 'valori-esatti', titolo: 'Calcolare valori esatti con le formule', testo: R`Le formule di addizione, sottrazione, duplicazione e bisezione permettono di calcolare il valore esatto (con i radicali, non decimale) di molti angoli oltre ai classici $30°$, $45°$, $60°$: basta scrivere l'angolo come somma, differenza o metà di angoli noti.

- $15° = 45°-30°$ (oppure $60°-45°$): formule di sottrazione.
- $75° = 45°+30°$: formule di addizione.
- $22,5° = \dfrac{45°}{2}$: formule di bisezione.
- $105° = 60°+45°$, oppure $105°=\dfrac{210°}{2}$: entrambe le strade portano allo stesso risultato.

Esempio: $\tan15° = \tan(45°-30°) = \dfrac{\tan45°-\tan30°}{1+\tan45°\tan30°} = \dfrac{1-\frac{\sqrt3}{3}}{1+\frac{\sqrt3}{3}}$. Moltiplicando numeratore e denominatore per $3$ si ottiene $\dfrac{3-\sqrt3}{3+\sqrt3}$, e razionalizzando (per $3-\sqrt3$) si arriva a $\tan15° = 2-\sqrt3$.

Un controllo numerico è un'abitudine utile ogni volta che si manipolano radicali: $2-\sqrt3\approx0,268$, e infatti $\tan15°\approx0,268$. Se il valore decimale non torna, c'è un errore nei passaggi precedenti.

>* Non esiste un solo modo di scrivere un angolo come combinazione di angoli noti: conviene scegliere la scomposizione che porta ai calcoli più semplici, spesso quella con meno frazioni sotto radice.

>! Uno stesso valore esatto può comparire in forme diverse ma equivalenti (per esempio $\dfrac{\sqrt6-\sqrt2}{4}$ e $\dfrac{\sqrt2(\sqrt3-1)}{4}$): prima di dire che due risposte sono diverse, conviene calcolarle numericamente e confrontarle.` },

    { id: 'identita-semplificazione', titolo: 'Identità goniometriche e semplificazione', testo: R`Un'**identità goniometrica** è un'uguaglianza vera per ogni valore ammissibile dell'angolo, non solo per alcuni (a differenza di un'equazione). Per verificarla si trasforma **un solo membro** — di solito il più complicato — fino a farlo coincidere con l'altro, usando le formule di duplicazione, bisezione o l'identità fondamentale $\sin^2\alpha+\cos^2\alpha=1$.

Esempio: verificare che $\dfrac{\sin2x}{1+\cos2x}=\tan x$ (per $\cos2x\ne-1$). Dal primo membro, sostituendo $\sin2x=2\sin x\cos x$ e $\cos2x=2\cos^2x-1$: $$\frac{2\sin x\cos x}{1+2\cos^2x-1} = \frac{2\sin x\cos x}{2\cos^2x} = \frac{\sin x}{\cos x} = \tan x. \ \checkmark$$

Le stesse formule servono per **semplificare** un'espressione, cioè scriverla nella forma più corta possibile: $\sin^2x-\cos^2x$ diventa subito $-\cos2x$, invece di restare con due quadrati.

>* Per verificare un'identità **non si opera sui due membri come in un'equazione** (sommando o moltiplicando entrambi i lati): si trasforma un solo membro, con passaggi di equivalenza, fino a ottenere l'altro. Lavorare su entrambi rischia di "dimostrare" $0=0$ senza aver detto nulla sull'identità di partenza.

>! Due espressioni possono sembrare diverse e valere lo stesso: prima di dichiarare falsa un'identità, conviene controllarla con un valore numerico dell'angolo (per esempio $x=30°$) invece di fidarsi solo dell'aspetto delle due scritture.` }
  ],

  grafici: {
    sommaAngoli: {
      tipo: 'piano', x: [-1.7, 1.7], y: [-1.7, 2.1],
      parametri: [
        { nome: 'a', min: 0, max: 90, passo: 1, valore: 40, etichetta: 'α' },
        { nome: 'b', min: 0, max: 90, passo: 1, valore: 35, etichetta: 'β' }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1 },
        { tipo: 'segmento', da: [0, 0], a: ['cos(a*pi/180)', 'sin(a*pi/180)'], etichetta: 'α', colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: ['cos(b*pi/180)', 'sin(b*pi/180)'], etichetta: 'β', colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['cos((a+b)*pi/180)', 'sin((a+b)*pi/180)'], etichetta: 'α+β', raggio: 0.5, colore: 4 },
        { tipo: 'testo', p: [-1.65, 1.95], testo: 'sin(α+β) = {{sin((a+b)*pi/180)}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.65, 1.68], testo: 'sinα cosβ + cosα sinβ = {{sin(a*pi/180)*cos(b*pi/180)+cos(a*pi/180)*sin(b*pi/180)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina α e β: i due numeri restano sempre uguali, qualunque angolo scegli. È la verifica numerica della formula di addizione del seno.'
    },
    angoloRette: {
      tipo: 'piano', x: [-4, 4], y: [-4, 4],
      parametri: [
        { nome: 'm1', min: -3, max: 3, passo: 0.1, valore: 2, etichetta: 'm₁' },
        { nome: 'm2', min: -3, max: 3, passo: 0.1, valore: -0.3, etichetta: 'm₂' }
      ],
      elementi: [
        { tipo: 'retta', m: 'm1', q: 0, etichetta: 'r', colore: 2 },
        { tipo: 'retta', m: 'm2', q: 0, etichetta: 's', colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 'm1'], a: [1, 'm2'], etichetta: 'θ', raggio: 1, colore: 4 },
        { tipo: 'testo', p: [-3.8, 3.6], testo: 'tan θ = {{abs((m2-m1)/(1+m1*m2))}}', ancora: 'start' }
      ],
      didascalia: 'Trascina m₁ e m₂: l\'ampiezza dell\'angolo fra le due rette dipende solo dai coefficienti angolari.'
    },
    duplicazioneSeno: {
      tipo: 'piano', x: [-6.3, 6.3], y: [-2.3, 2.3],
      funzioni: [
        { f: 'sin(2x)', etichetta: 'y = sin 2x', colore: 1 },
        { f: '2*sin(x)*cos(x)', etichetta: 'y = 2 sin x cos x', colore: 3 },
        { f: '2*sin(x)', etichetta: 'y = 2 sin x (errore)', colore: 4, tratteggio: true }
      ],
      didascalia: 'Le prime due curve coincidono sempre: sin 2x e 2 sin x cos x sono la stessa funzione. La tratteggiata è l\'errore tipico di raddoppiare solo il seno.'
    },
    angoloAggiunto: {
      tipo: 'piano', x: [-6.3, 6.3], y: [-6, 6],
      parametri: [
        { nome: 'a', min: -3, max: 3, passo: 0.1, valore: 3, etichetta: 'a' },
        { nome: 'b', min: -4, max: 4, passo: 0.1, valore: 4, etichetta: 'b' }
      ],
      funzioni: [
        { f: 'a*sin(x) + b*cos(x)', etichetta: 'y = a sin x + b cos x', colore: 1 },
        { f: 'sqrt(a^2+b^2)*sin(x+atan(b/a))', etichetta: 'y = r sin(x + φ)', colore: 3, tratteggio: true }
      ],
      elementi: [
        { tipo: 'testo', p: [-6.1, 5.4], testo: 'r = {{sqrt(a^2+b^2)}}', ancora: 'start' }
      ],
      didascalia: 'Con a > 0 le due curve coincidono sempre: a sin x + b cos x è una sinusoide di ampiezza r = √(a² + b²).'
    },
    cosQuadro: {
      tipo: 'piano', x: [-6.3, 6.3], y: [-0.3, 1.3],
      funzioni: [
        { f: 'cos(x)^2', etichetta: 'y = cos²x', colore: 1 },
        { f: '(1+cos(2x))/2', etichetta: 'y = (1 + cos 2x)/2', colore: 3, tratteggio: true }
      ],
      didascalia: 'cos²x e (1 + cos 2x)/2 sono la stessa funzione: la formula di duplicazione del coseno riscritta per isolare cos²x.'
    }
  },

  esempi: [
    { titolo: 'Un valore esatto con la formula di sottrazione', problema: R`Calcola il valore esatto di $\cos15°$.`, passi: [
      R`$15°=45°-30°$: uso la formula di sottrazione del coseno, $\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta$.`,
      R`Sostituisco $\alpha=45°$, $\beta=30°$: $\cos15° = \cos45°\cos30°+\sin45°\sin30° = \dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2}+\dfrac{\sqrt2}{2}\cdot\dfrac12$.`,
      R`Sommo le frazioni: $\cos15° = \dfrac{\sqrt6}{4}+\dfrac{\sqrt2}{4} = \dfrac{\sqrt6+\sqrt2}{4}$.`,
      R`Controllo numerico: $\dfrac{\sqrt6+\sqrt2}{4}\approx\dfrac{2,449+1,414}{4}\approx0,966$, e infatti $\cos15°\approx0,966$. ✓`
    ], risultato: R`$\cos15° = \dfrac{\sqrt6+\sqrt2}{4} \approx 0,966$` },

    { titolo: 'Addizione con due triangoli rettangoli', problema: R`Sapendo che $\sin\alpha=\dfrac{5}{13}$ con $\alpha$ acuto e $\cos\beta=\dfrac{3}{5}$ con $\beta$ acuto, calcola $\sin(\alpha+\beta)$.`, passi: [
      R`Con $\alpha$ acuto e $\sin\alpha=\dfrac{5}{13}$, dalla terna pitagorica $5$-$12$-$13$: $\cos\alpha=\dfrac{12}{13}$ (positivo, primo quadrante).`,
      R`Con $\beta$ acuto e $\cos\beta=\dfrac35$, dalla terna $3$-$4$-$5$: $\sin\beta=\dfrac45$ (positivo).`,
      R`Applico la formula di addizione: $\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta = \dfrac{5}{13}\cdot\dfrac35+\dfrac{12}{13}\cdot\dfrac45$.`,
      R`Calcolo: $\dfrac{15}{65}+\dfrac{48}{65}=\dfrac{63}{65}$.`
    ], risultato: R`$\sin(\alpha+\beta) = \dfrac{63}{65}$` },

    { titolo: "Duplicazione nel secondo quadrante", problema: R`Sapendo che $\cos\alpha=-\dfrac13$ e che $\alpha$ è un angolo del secondo quadrante, calcola $\sin2\alpha$ e $\cos2\alpha$.`, passi: [
      R`Nel secondo quadrante il seno è positivo: $\sin\alpha=\sqrt{1-\cos^2\alpha}=\sqrt{1-\dfrac19}=\sqrt{\dfrac89}=\dfrac{2\sqrt2}{3}$.`,
      R`$\sin2\alpha = 2\sin\alpha\cos\alpha = 2\cdot\dfrac{2\sqrt2}{3}\cdot\left(-\dfrac13\right) = -\dfrac{4\sqrt2}{9}$.`,
      R`$\cos2\alpha = 2\cos^2\alpha-1 = 2\cdot\dfrac19-1 = \dfrac29-1=-\dfrac79$.`,
      R`Controllo: se $\alpha$ è fra $90°$ e $180°$, allora $2\alpha$ è fra $180°$ e $360°$, dove il seno può essere negativo: coerente con $\sin2\alpha<0$.`
    ], risultato: R`$\sin2\alpha=-\dfrac{4\sqrt2}{9}, \quad \cos2\alpha=-\dfrac{7}{9}$` },

    { titolo: 'Bisezione con scelta del segno', problema: R`Calcola $\sin15°$ con le formule di bisezione, sapendo che $15°=\dfrac{30°}{2}$.`, passi: [
      R`Uso $\sin\dfrac\alpha2=\pm\sqrt{\dfrac{1-\cos\alpha}{2}}$ con $\alpha=30°$, dove $\cos30°=\dfrac{\sqrt3}{2}$.`,
      R`$\sin15° = \sqrt{\dfrac{1-\frac{\sqrt3}{2}}{2}} = \sqrt{\dfrac{2-\sqrt3}{4}} = \dfrac{\sqrt{2-\sqrt3}}{2}$.`,
      R`Il segno è positivo perché $15°$ è un angolo del primo quadrante.`,
      R`Controllo numerico: $\sqrt{2-\sqrt3}\approx\sqrt{0,268}\approx0,518$, quindi $\sin15°\approx0,259$: coincide con $\dfrac{\sqrt6-\sqrt2}{4}\approx0,259$, lo stesso valore scritto in un altro modo.`
    ], risultato: R`$\sin15° = \dfrac{\sqrt{2-\sqrt3}}{2} \approx 0,259$` },

    { titolo: "Il metodo dell'angolo aggiunto", problema: R`Scrivi $y=\sin x-\sqrt3\cos x$ nella forma $r\sin(x+\varphi)$ e trova il valore massimo di $y$.`, passi: [
      R`Qui $a=1$ e $b=-\sqrt3$, quindi $r=\sqrt{a^2+b^2}=\sqrt{1+3}=2$.`,
      R`Poiché $a=1>0$: $\varphi=\arctan\dfrac{b}{a}=\arctan(-\sqrt3)=-60°$.`,
      R`Quindi $y = 2\sin(x-60°)$. Verifica: $2\sin(x-60°)=2\cos60°\sin x-2\sin60°\cos x = 2\cdot\dfrac12\sin x-2\cdot\dfrac{\sqrt3}{2}\cos x=\sin x-\sqrt3\cos x$. ✓`,
      R`Il massimo di $2\sin(x-60°)$ è $r=2$, raggiunto quando $x-60°=90°$, cioè $x=150°$.`
    ], risultato: R`$y=2\sin(x-60°)$, massimo $=2$` },

    { titolo: "Verifica di un'identità", problema: R`Verifica l'identità $\dfrac{1-\cos2x}{\sin2x}=\tan x$ (per $\sin x\ne0$ e $\cos x\ne0$).`, passi: [
      R`Parto dal primo membro e sostituisco $\cos2x=1-2\sin^2x$ e $\sin2x=2\sin x\cos x$.`,
      R`$\dfrac{1-(1-2\sin^2x)}{2\sin x\cos x} = \dfrac{2\sin^2x}{2\sin x\cos x}$.`,
      R`Semplifico $2\sin x$, lecito perché $\sin x\ne0$: $\dfrac{\sin x}{\cos x}=\tan x$. ✓`,
      R`L'identità è verificata: il primo membro coincide con il secondo per ogni $x$ che rispetta le condizioni.`
    ], risultato: R`Identità verificata: $\dfrac{1-\cos2x}{\sin2x}=\tan x$` }
  ],

  formulario: [
    { nome: 'Addizione del seno', formula: R`\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta`, nota: R`Nel seno il segno centrale è lo stesso che compare fra i due angoli: $\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta$.` },
    { nome: 'Addizione del coseno', formula: R`\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta`, nota: R`Per la sottrazione il segno centrale si inverte: $\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta$.` },
    { nome: 'Addizione della tangente', formula: R`\tan(\alpha+\beta) = \frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}`, nota: R`Per la sottrazione il segno del denominatore si inverte: $\tan(\alpha-\beta)=\dfrac{\tan\alpha-\tan\beta}{1+\tan\alpha\tan\beta}$.` },
    { nome: 'Angolo fra due rette', formula: R`\tan\theta = \left|\frac{m_2-m_1}{1+m_1m_2}\right|`, nota: R`$1+m_1m_2=0$ significa rette perpendicolari; $m_1=m_2$ significa rette parallele.` },
    { nome: 'Duplicazione del seno', formula: R`\sin2\alpha = 2\sin\alpha\cos\alpha` },
    { nome: 'Duplicazione del coseno', formula: R`\cos2\alpha = \cos^2\alpha-\sin^2\alpha = 2\cos^2\alpha-1 = 1-2\sin^2\alpha`, nota: R`Tre forme equivalenti: si sceglie quella comoda a seconda del dato disponibile.` },
    { nome: 'Duplicazione della tangente', formula: R`\tan2\alpha = \frac{2\tan\alpha}{1-\tan^2\alpha}`, nota: R`Non definita quando $\tan\alpha=\pm1$, cioè quando $\alpha=45°+k\cdot90°$.` },
    { nome: 'Bisezione del seno', formula: R`\sin\frac{\alpha}{2} = \pm\sqrt{\frac{1-\cos\alpha}{2}}`, nota: R`Il segno si sceglie guardando in quale quadrante cade $\dfrac\alpha2$.` },
    { nome: 'Bisezione del coseno', formula: R`\cos\frac{\alpha}{2} = \pm\sqrt{\frac{1+\cos\alpha}{2}}`, nota: R`Il segno si sceglie guardando in quale quadrante cade $\dfrac\alpha2$.` },
    { nome: 'Bisezione della tangente', formula: R`\tan\frac{\alpha}{2} = \pm\sqrt{\frac{1-\cos\alpha}{1+\cos\alpha}} = \frac{\sin\alpha}{1+\cos\alpha} = \frac{1-\cos\alpha}{\sin\alpha}`, nota: R`Le ultime due forme hanno già il segno corretto incorporato.` },
    { nome: 'Formule parametriche', formula: R`\sin\alpha = \frac{2t}{1+t^2}, \qquad \cos\alpha = \frac{1-t^2}{1+t^2}, \qquad \tan\alpha = \frac{2t}{1-t^2}`, nota: R`Con $t=\tan\dfrac\alpha2$. Non valgono per $\alpha=180°+k\cdot360°$.` },
    { nome: 'Prostaferesi (somma di seni)', formula: R`\sin p+\sin q = 2\sin\frac{p+q}{2}\cos\frac{p-q}{2}`, nota: R`Trasforma una somma in un prodotto; esistono formule analoghe per $\sin p-\sin q$, $\cos p+\cos q$, $\cos p-\cos q$.` },
    { nome: 'Werner (prodotto seno-coseno)', formula: R`\sin\alpha\cos\beta = \frac12\left[\sin(\alpha+\beta)+\sin(\alpha-\beta)\right]`, nota: R`Trasforma un prodotto in una somma; esistono formule analoghe per $\cos\alpha\cos\beta$ e $\sin\alpha\sin\beta$.` },
    { nome: 'Angolo aggiunto', formula: R`a\sin x+b\cos x = r\sin(x+\varphi), \qquad r=\sqrt{a^2+b^2}`, nota: R`$\varphi$ soddisfa $\cos\varphi=\dfrac{a}{r}$ e $\sin\varphi=\dfrac{b}{r}$; se $a>0$, $\varphi=\arctan\dfrac{b}{a}$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'addizione-sottrazione', tipo: 'formula', fronte: R`Formula di addizione del seno`, retro: R`$\sin(\alpha+\beta) = \sin\alpha\cos\beta+\cos\alpha\sin\beta$.` },
    { id: 'fc-02', sezione: 'addizione-sottrazione', tipo: 'formula', fronte: R`Formula di addizione del coseno`, retro: R`$\cos(\alpha+\beta) = \cos\alpha\cos\beta-\sin\alpha\sin\beta$.` },
    { id: 'fc-03', sezione: 'addizione-sottrazione', tipo: 'formula', fronte: R`Formula di addizione della tangente`, retro: R`$\tan(\alpha+\beta) = \dfrac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}$.` },
    { id: 'fc-04', sezione: 'addizione-sottrazione', tipo: 'concetto', fronte: R`Perché $\sin(\alpha+\beta)\ne\sin\alpha+\sin\beta$?`, retro: R`Perché il seno non è una funzione lineare: basta il controesempio $\alpha=\beta=45°$.` },
    { id: 'fc-05', sezione: 'addizione-sottrazione', tipo: 'procedura', fronte: R`Come si passa dall'addizione alla sottrazione nel coseno?`, retro: R`Il segno centrale si inverte: $\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta$.` },
    { id: 'fc-06', sezione: 'angolo-tra-rette', tipo: 'formula', fronte: R`Angolo fra due rette dai coefficienti angolari`, retro: R`$\tan\theta = \left|\dfrac{m_2-m_1}{1+m_1m_2}\right|$.` },
    { id: 'fc-07', sezione: 'angolo-tra-rette', tipo: 'concetto', fronte: R`Quando due rette (dati $m_1$, $m_2$) sono perpendicolari?`, retro: R`Quando $m_1m_2=-1$: in quel caso la formula dell'angolo non è definita.` },
    { id: 'fc-08', sezione: 'duplicazione', tipo: 'formula', fronte: R`Formula di duplicazione del seno`, retro: R`$\sin2\alpha = 2\sin\alpha\cos\alpha$.` },
    { id: 'fc-09', sezione: 'duplicazione', tipo: 'formula', fronte: R`Le tre forme di $\cos2\alpha$`, retro: R`$\cos^2\alpha-\sin^2\alpha = 2\cos^2\alpha-1 = 1-2\sin^2\alpha$.` },
    { id: 'fc-10', sezione: 'duplicazione', tipo: 'formula', fronte: R`Formula di duplicazione della tangente`, retro: R`$\tan2\alpha = \dfrac{2\tan\alpha}{1-\tan^2\alpha}$.` },
    { id: 'fc-11', sezione: 'duplicazione', tipo: 'concetto', fronte: R`Vero o falso: $\sin2\alpha = 2\sin\alpha$`, retro: R`Falso: seno e coseno non sono funzioni lineari, raddoppiare l'angolo non raddoppia il valore.` },
    { id: 'fc-12', sezione: 'bisezione', tipo: 'formula', fronte: R`Formula di bisezione del seno`, retro: R`$\sin\dfrac\alpha2 = \pm\sqrt{\dfrac{1-\cos\alpha}{2}}$, segno secondo il quadrante di $\dfrac\alpha2$.` },
    { id: 'fc-13', sezione: 'bisezione', tipo: 'formula', fronte: R`Formula di bisezione della tangente (senza radicali)`, retro: R`$\tan\dfrac\alpha2 = \dfrac{\sin\alpha}{1+\cos\alpha} = \dfrac{1-\cos\alpha}{\sin\alpha}$.` },
    { id: 'fc-14', sezione: 'bisezione', tipo: 'concetto', fronte: R`Come si sceglie il segno nella bisezione?`, retro: R`Si guarda il quadrante di $\dfrac\alpha2$, non quello di $\alpha$.` },
    { id: 'fc-15', sezione: 'parametriche', tipo: 'formula', fronte: R`Formule parametriche`, retro: R`Con $t=\tan\dfrac\alpha2$: $\sin\alpha=\dfrac{2t}{1+t^2}$, $\cos\alpha=\dfrac{1-t^2}{1+t^2}$, $\tan\alpha=\dfrac{2t}{1-t^2}$.` },
    { id: 'fc-16', sezione: 'parametriche', tipo: 'concetto', fronte: R`Limite delle formule parametriche`, retro: R`Non valgono per $\alpha=180°+k\cdot360°$, dove $\tan\dfrac\alpha2$ non esiste.` },
    { id: 'fc-17', sezione: 'prostaferesi-werner', tipo: 'definizione', fronte: R`Differenza fra Werner e prostaferesi`, retro: R`Werner trasforma un prodotto in una somma; la prostaferesi fa il percorso inverso, da una somma a un prodotto.` },
    { id: 'fc-18', sezione: 'prostaferesi-werner', tipo: 'formula', fronte: R`Formula di Werner per $\sin\alpha\cos\beta$`, retro: R`$\sin\alpha\cos\beta = \dfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]$.` },
    { id: 'fc-19', sezione: 'prostaferesi-werner', tipo: 'formula', fronte: R`Formula di prostaferesi per $\sin p+\sin q$`, retro: R`$\sin p+\sin q = 2\sin\dfrac{p+q}{2}\cos\dfrac{p-q}{2}$.` },
    { id: 'fc-20', sezione: 'angolo-aggiunto', tipo: 'formula', fronte: R`Metodo dell'angolo aggiunto`, retro: R`$a\sin x+b\cos x = r\sin(x+\varphi)$, con $r=\sqrt{a^2+b^2}$.` },
    { id: 'fc-21', sezione: 'angolo-aggiunto', tipo: 'concetto', fronte: R`Cosa rappresenta $r$ nel metodo dell'angolo aggiunto?`, retro: R`È l'ampiezza della sinusoide risultante, cioè il valore massimo che $a\sin x+b\cos x$ può assumere.` },
    { id: 'fc-22', sezione: 'valori-esatti', tipo: 'procedura', fronte: R`Come si calcola un valore esatto come $\sin75°$?`, retro: R`Si scrive l'angolo come somma o differenza di angoli noti (qui $45°+30°$) e si applica la formula corrispondente.` },
    { id: 'fc-23', sezione: 'identita-semplificazione', tipo: 'procedura', fronte: R`Come si verifica un'identità goniometrica?`, retro: R`Si trasforma un solo membro, di solito il più complicato, fino a farlo coincidere con l'altro.` },
    { id: 'fc-24', sezione: 'identita-semplificazione', tipo: 'concetto', fronte: R`Perché non si opera sui due membri di un'identità come in un'equazione?`, retro: R`Perché sommando o moltiplicando entrambi i lati si rischia di ottenere $0=0$ senza aver dimostrato nulla.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola il valore di $\sin105°$ usando le formule di addizione (scrivi $105°=60°+45°$).`, suggerimenti: [R`Scrivi $105°$ come somma di due angoli noti.`, R`Applica la formula di addizione del seno.`, R`$\sin60°=\dfrac{\sqrt3}{2}$, $\cos60°=\dfrac12$, $\sin45°=\cos45°=\dfrac{\sqrt2}{2}$.`], risposta: { tipo: 'numero', valore: 0.9659, tolleranza: 0.001 }, soluzione: [R`$105°=60°+45°$.`, R`$\sin105° = \sin60°\cos45°+\cos60°\sin45° = \dfrac{\sqrt3}{2}\cdot\dfrac{\sqrt2}{2}+\dfrac12\cdot\dfrac{\sqrt2}{2}$.`, R`$=\dfrac{\sqrt6}{4}+\dfrac{\sqrt2}{4}=\dfrac{\sqrt6+\sqrt2}{4}\approx0,966$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Sapendo che $\cos\alpha=\dfrac45$, calcola $\cos2\alpha$.`, suggerimenti: [R`$\cos2\alpha$ ha tre forme equivalenti: scegli quella che usa solo $\cos\alpha$.`, R`$\cos2\alpha = 2\cos^2\alpha-1$.`], risposta: { tipo: 'numero', valore: 0.28, tolleranza: 0.001 }, soluzione: [R`$\cos\alpha=\dfrac45$, quindi $\cos^2\alpha=\dfrac{16}{25}$.`, R`$\cos2\alpha = 2\cdot\dfrac{16}{25}-1=\dfrac{32}{25}-1=\dfrac{7}{25}=0,28$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Calcola $\tan22,5°$ con le formule di bisezione, sapendo che $22,5°=\dfrac{45°}{2}$.`, suggerimenti: [R`$22,5°$ è la metà di un angolo noto.`, R`Usa la forma senza radicali: $\tan\dfrac\alpha2 = \dfrac{\sin\alpha}{1+\cos\alpha}$, con $\alpha=45°$.`, R`$\cos45°=\sin45°=\dfrac{\sqrt2}{2}$.`], risposta: { tipo: 'numero', valore: 0.4142, tolleranza: 0.001 }, soluzione: [R`$22,5°=\dfrac{45°}{2}$, con $\cos45°=\sin45°=\dfrac{\sqrt2}{2}$.`, R`$\tan22,5° = \dfrac{\sin45°}{1+\cos45°} = \dfrac{\frac{\sqrt2}{2}}{1+\frac{\sqrt2}{2}} = \dfrac{\sqrt2}{2+\sqrt2}$.`, R`Razionalizzando: $\dfrac{\sqrt2(2-\sqrt2)}{(2+\sqrt2)(2-\sqrt2)} = \dfrac{2\sqrt2-2}{2} = \sqrt2-1\approx0,414$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Trova l'ampiezza dell'angolo (in gradi) fra le rette $y=3x-2$ e $y=-2x+5$.`, suggerimenti: [R`Il coefficiente angolare di una retta è la tangente dell'angolo che forma con l'asse $x$.`, R`Applica la formula dell'angolo fra due rette con $m_1=3$ e $m_2=-2$.`], risposta: { tipo: 'numero', valore: 45, tolleranza: 0.5 }, soluzione: [R`$m_1=3$, $m_2=-2$.`, R`$\tan\theta = \left|\dfrac{-2-3}{1+3\cdot(-2)}\right| = \left|\dfrac{-5}{-5}\right| = 1$.`, R`$\theta = \arctan1 = 45°$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Sapendo che $\tan\alpha=2$, calcola $\tan2\alpha$.`, suggerimenti: [R`Usa direttamente la formula di duplicazione della tangente.`, R`$\tan2\alpha = \dfrac{2\tan\alpha}{1-\tan^2\alpha}$, con $\tan\alpha=2$.`], risposta: { tipo: 'numero', valore: -1.3333, tolleranza: 0.001 }, soluzione: [R`$\tan2\alpha = \dfrac{2\cdot2}{1-4}$.`, R`$=\dfrac{4}{-3}=-\dfrac43\approx-1,333$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Scrivi $y=\sin x+\cos x$ nella forma $r\sin(x+\varphi)$ e trova il valore massimo di $y$.`, suggerimenti: [R`Identifica $a$ e $b$ nella scrittura $a\sin x+b\cos x$.`, R`Calcola $r=\sqrt{a^2+b^2}$: è anche il valore massimo della funzione.`], risposta: { tipo: 'numero', valore: 1.4142, tolleranza: 0.001 }, soluzione: [R`$a=1$, $b=1$: $r=\sqrt{1^2+1^2}=\sqrt2$.`, R`$\varphi=\arctan\dfrac11=45°$, quindi $y=\sqrt2\sin(x+45°)$.`, R`Il massimo è $r=\sqrt2\approx1,414$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Semplifica l'espressione $\dfrac{\sin2x}{2\sin x}$ (per $\sin x\ne0$).`, suggerimenti: [R`Scrivi $\sin2x$ con la formula di duplicazione.`, R`Dopo aver sostituito, semplifica il fattore comune $2\sin x$ (lecito perché $\sin x\ne0$).`], risposta: { tipo: 'testo', accettate: ['cosx', 'cos(x)'] }, soluzione: [R`$\sin2x = 2\sin x\cos x$.`, R`$\dfrac{2\sin x\cos x}{2\sin x} = \cos x$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Usa le formule parametriche per calcolare $\sin\alpha$, sapendo che $\tan\dfrac\alpha2=\dfrac13$.`, suggerimenti: [R`Le formule parametriche esprimono $\sin\alpha$ in funzione di $t=\tan\dfrac\alpha2$.`, R`$\sin\alpha = \dfrac{2t}{1+t^2}$: sostituisci $t=\dfrac13$.`], risposta: { tipo: 'numero', valore: 0.6, tolleranza: 0.001 }, soluzione: [R`$t=\tan\dfrac\alpha2=\dfrac13$.`, R`$\sin\alpha = \dfrac{2t}{1+t^2} = \dfrac{2/3}{1+1/9} = \dfrac{2/3}{10/9} = \dfrac23\cdot\dfrac{9}{10}=\dfrac{18}{30}=0,6$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Verifica, calcolando entrambi i membri, che $\dfrac{\sin60°}{1+\cos60°}=\tan30°$.`, suggerimenti: [R`Calcola separatamente il primo membro (con $\sin60°$ e $\cos60°$) e il secondo ($\tan30°$).`, R`Se coincidono, la formula di bisezione della tangente è verificata in questo caso.`], risposta: { tipo: 'numero', valore: 0.5774, tolleranza: 0.001 }, soluzione: [R`Primo membro: $\dfrac{\sin60°}{1+\cos60°} = \dfrac{\frac{\sqrt3}{2}}{1+\frac12} = \dfrac{\frac{\sqrt3}{2}}{\frac32} = \dfrac{\sqrt3}{3}$.`, R`Secondo membro: $\tan30° = \dfrac{\sqrt3}{3}$.`, R`I due membri coincidono ($\approx0,577$): la formula di bisezione della tangente è verificata in questo caso.`] },
    { id: 'es-10', difficolta: 3, testo: R`Un'onda è descritta da $y=12\sin x+5\cos x$ (in cm). Trova l'ampiezza massima dell'oscillazione.`, suggerimenti: [R`Nella somma $a\sin x+b\cos x$, l'ampiezza massima è $r=\sqrt{a^2+b^2}$.`, R`Qui $a=12$ e $b=5$.`], risposta: { tipo: 'numero', valore: 13, tolleranza: 0.01 }, soluzione: [R`Qui $a=12$ (coefficiente del seno) e $b=5$ (coefficiente del coseno).`, R`$r=\sqrt{a^2+b^2}=\sqrt{144+25}=\sqrt{169}=13$.`, R`L'ampiezza massima dell'oscillazione è $13\ \text{cm}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è la formula corretta di $\cos(\alpha+\beta)$?`, opzioni: [R`$\cos\alpha\cos\beta+\sin\alpha\sin\beta$`, R`$\cos\alpha\cos\beta-\sin\alpha\sin\beta$`, R`$\sin\alpha\cos\beta+\cos\alpha\sin\beta$`, R`$\cos\alpha\sin\beta-\sin\alpha\cos\beta$`], corretta: 1, spiegazione: R`La prima opzione è la formula di $\cos(\alpha-\beta)$; la terza è $\sin(\alpha+\beta)$. Il segno centrale nell'addizione del coseno è un meno.` },
    { id: 'q-02', domanda: R`Perché $\sin(\alpha+\beta)\ne\sin\alpha+\sin\beta$ in generale?`, opzioni: [R`Perché il seno non è una funzione lineare`, R`Perché $\alpha$ e $\beta$ devono essere uguali`, R`Perché la formula vale solo per angoli ottusi`, R`Perché serve sempre la calcolatrice`], corretta: 0, spiegazione: R`Il controesempio $\alpha=\beta=45°$ basta: $\sin90°=1$, mentre $\sin45°+\sin45°=\sqrt2\approx1,41$.` },
    { id: 'q-03', domanda: R`Quando due rette di coefficienti angolari $m_1$ e $m_2$ sono perpendicolari?`, opzioni: [R`$m_1=m_2$`, R`$m_1+m_2=0$`, R`$m_1\cdot m_2=-1$`, R`$m_1\cdot m_2=1$`], corretta: 2, spiegazione: R`Con $m_1m_2=-1$ il denominatore $1+m_1m_2$ si annulla e la tangente dell'angolo non è definita: l'angolo è retto.` },
    { id: 'q-04', domanda: R`Quale delle seguenti è una forma corretta di $\cos2\alpha$?`, opzioni: [R`$2\sin\alpha\cos\alpha$`, R`$\sin^2\alpha-\cos^2\alpha$`, R`$\dfrac{2\tan\alpha}{1-\tan^2\alpha}$`, R`$1-2\sin^2\alpha$`], corretta: 3, spiegazione: R`La prima è $\sin2\alpha$, la terza è $\tan2\alpha$, la seconda è $-\cos2\alpha$ (segno sbagliato). $1-2\sin^2\alpha$ è una delle tre forme corrette.` },
    { id: 'q-05', domanda: R`La formula $\tan2\alpha=\dfrac{2\tan\alpha}{1-\tan^2\alpha}$ non è definita quando…`, opzioni: [R`$\tan\alpha=0$`, R`$\tan\alpha=\pm1$`, R`$\alpha=0°$`, R`$\alpha=180°$`], corretta: 1, spiegazione: R`Con $\tan\alpha=\pm1$ il denominatore $1-\tan^2\alpha$ si annulla.` },
    { id: 'q-06', domanda: R`Nelle formule di bisezione, da cosa dipende il segno davanti alla radice?`, opzioni: [R`Dal quadrante in cui cade $\dfrac\alpha2$`, R`Dal quadrante in cui cade $\alpha$`, R`Dal segno di $\alpha$`, R`Non dipende da nulla, è sempre positivo`], corretta: 0, spiegazione: R`Il segno di $\sin\dfrac\alpha2$ e $\cos\dfrac\alpha2$ dipende dal quadrante dell'angolo $\dfrac\alpha2$, non da quello di $\alpha$.` },
    { id: 'q-07', domanda: R`Le formule parametriche esprimono $\sin\alpha$, $\cos\alpha$ e $\tan\alpha$ in funzione di…`, opzioni: [R`$t=\tan\alpha$`, R`$t=\sin\dfrac\alpha2$`, R`$t=\tan\dfrac\alpha2$`, R`$t=\cos2\alpha$`], corretta: 2, spiegazione: R`Le formule parametriche usano sempre $t=\tan\dfrac\alpha2$, la tangente della metà dell'angolo.` },
    { id: 'q-08', domanda: R`Le formule parametriche non si possono applicare quando…`, opzioni: [R`$\alpha=90°$`, R`$\alpha=0°$`, R`$\alpha=45°$`, R`$\alpha=180°+k\cdot360°$`], corretta: 3, spiegazione: R`In quel caso $\dfrac\alpha2=90°+k\cdot180°$, dove la tangente non è definita.` },
    { id: 'q-09', domanda: R`Le formule di Werner trasformano…`, opzioni: [R`Una somma in un prodotto`, R`Un prodotto in una somma`, R`Un angolo nella sua metà`, R`Un angolo nel suo doppio`], corretta: 1, spiegazione: R`Werner parte da un prodotto di seni o coseni e lo riscrive come una somma (o differenza).` },
    { id: 'q-10', domanda: R`Le formule di prostaferesi trasformano…`, opzioni: [R`Una somma (o differenza) in un prodotto`, R`Un prodotto in una somma`, R`Una tangente in un seno`, R`Un angolo acuto in uno ottuso`], corretta: 0, spiegazione: R`La prostaferesi è l'inversa di Werner: parte da una somma e arriva a un prodotto.` },
    { id: 'q-11', domanda: R`Nel metodo dell'angolo aggiunto, $a\sin x+b\cos x=r\sin(x+\varphi)$: quanto vale $r$?`, opzioni: [R`$a+b$`, R`$a\cdot b$`, R`$\sqrt{a^2+b^2}$`, R`$\sqrt{a^2-b^2}$`], corretta: 2, spiegazione: R`$r$ è l'ampiezza della sinusoide risultante, ricavata elevando al quadrato e sommando $r\cos\varphi=a$ e $r\sin\varphi=b$.` },
    { id: 'q-12', domanda: R`Se $a<0$ nel metodo dell'angolo aggiunto, la formula $\varphi=\arctan\dfrac ba$…`, opzioni: [R`Resta comunque corretta`, R`Dà un angolo del quadrante sbagliato, da correggere`, R`Non è mai calcolabile`, R`Dà sempre $\varphi=0$`], corretta: 1, spiegazione: R`L'arcotangente restituisce sempre un angolo fra $-90°$ e $90°$: con $a<0$ va corretta aggiungendo $180°$.` },
    { id: 'q-13', domanda: R`Qual è la strategia corretta per verificare un'identità goniometrica?`, opzioni: [R`Sommare la stessa quantità a entrambi i membri`, R`Trasformare un solo membro fino a ottenere l'altro`, R`Elevare al quadrato entrambi i membri`, R`Sostituire un valore qualunque di $x$ e basta`], corretta: 1, spiegazione: R`Operare su un solo membro evita di "dimostrare" $0=0$ senza aver detto nulla sull'identità di partenza.` },
    { id: 'q-14', domanda: R`Nell'Almagesto, Tolomeo calcolò le corde della somma e della differenza di due archi usando…`, opzioni: [R`Il teorema di Tolomeo sui quadrilateri ciclici`, R`Il teorema di Pitagora da solo`, R`Il teorema di Talete`, R`Il teorema dei seni`], corretta: 0, spiegazione: R`Applicando il proprio teorema a un quadrilatero ciclico con un diametro come lato, Tolomeo ricavò le formule equivalenti alle nostre formule di addizione.` },
    { id: 'q-15', domanda: R`Perché conviene scrivere $15°$ come $45°-30°$?`, opzioni: [R`Perché è l'unico modo possibile`, R`Perché la sottrazione dà sempre risultati più semplici dell'addizione`, R`Perché $45°$ e $30°$ sono angoli di cui si conoscono i valori esatti`, R`Perché $20°$ e $5°$ non sono angoli validi`], corretta: 2, spiegazione: R`Qualunque scomposizione in angoli noti funziona; si sceglie quella con i calcoli più semplici, di solito con $30°$, $45°$, $60°$.` },
    { id: 'q-16', domanda: R`La formula $\cos^2x=\dfrac{1+\cos2x}{2}$ si ottiene…`, opzioni: [R`Dal teorema di Tolomeo`, R`Dalla formula dell'angolo aggiunto`, R`Dalla formula di prostaferesi per due seni`, R`Da Werner con $\cos\alpha\cos\beta$, ponendo $\alpha=\beta=x$`], corretta: 3, spiegazione: R`Werner dà $\cos\alpha\cos\beta=\frac12[\cos(\alpha-\beta)+\cos(\alpha+\beta)]$; con $\alpha=\beta=x$ diventa $\cos^2x=\frac12[1+\cos2x]$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di applicare qualunque formula, scrivi l'angolo come combinazione (somma, differenza o metà) di angoli di cui conosci già i valori: $30°$, $45°$, $60°$, $90°$.` },
    { tipo: 'errore', testo: R`Nel coseno il segno si comporta al contrario del seno: addizione con il meno, sottrazione con il più. Controlla sempre quale operazione stai facendo.` },
    { tipo: 'trucco', testo: R`Per un controllo lampo, calcola il valore decimale con la calcolatrice e confrontalo con il risultato esatto: se non coincidono (a meno di arrotondamenti), c'è un errore nei passaggi.` },
    { tipo: 'errore', testo: R`$\sin2\alpha$ non è $2\sin\alpha$, così come $\cos2\alpha$ non è $2\cos\alpha$: raddoppiare l'angolo non raddoppia il valore della funzione.` },
    { tipo: 'metodo', testo: R`Nelle formule di bisezione il segno si decide guardando il quadrante di $\dfrac\alpha2$, non quello di $\alpha$: disegna la circonferenza goniometrica se hai dubbi.` },
    { tipo: 'trucco', testo: R`Per verificare un'identità, trasforma solo il membro più complicato: se dopo pochi passaggi non ti stai avvicinando all'altro membro, prova a partire dal lato opposto.` },
    { tipo: 'errore', testo: R`$\arctan\dfrac ba$ dà l'angolo giusto solo se $a>0$: con $a$ negativo va corretto di $180°$, altrimenti il metodo dell'angolo aggiunto sbaglia quadrante.` },
    { tipo: 'metodo', testo: R`Nell'angolo fra due rette, il modulo va calcolato sulla frazione intera, alla fine: non separatamente su numeratore e denominatore.` },
    { tipo: 'trucco', testo: R`Prostaferesi e Werner sono l'una l'inversa dell'altra: se nella formula che ti serve a sinistra dell'uguale c'è un prodotto, ti serve Werner; se c'è una somma, la prostaferesi.` }
  ],

  aneddoti: [
    { matematico: 'Ipparco di Nicea', anni: '190–120 a.C. circa', titolo: 'Le prime tavole di corde', testo: R`Ipparco è considerato il padre della trigonometria: fu il primo, per quanto si sa, a costruire una tavola sistematica che associava a ogni arco di circonferenza la lunghezza della corda corrispondente, calcolata a intervalli di pochi gradi. Gli serviva per l'astronomia: prevedere le posizioni del Sole e della Luna richiedeva calcoli che oggi chiameremmo trigonometrici, anche se i greci usavano le corde e non ancora seno e coseno. Confrontando le proprie osservazioni con quelle di Timocari di Alessandria, di circa centocinquant'anni prima, Ipparco scoprì anche che l'asse terrestre "dondola" lentamente come una trottola: la precessione degli equinozi, un moto che compie un giro completo in circa 26.000 anni. Nessuna copia della sua tavola è sopravvissuta: la conosciamo solo attraverso i riferimenti di Tolomeo, tre secoli più tardi.`, legame: R`La tavola delle corde di Ipparco è l'antenata delle tavole di seno e coseno che stanno dietro a ogni formula di questa pagina.` },
    { matematico: 'Claudio Tolomeo', anni: '100–170 d.C. circa', titolo: "Il teorema nascosto nell'Almagesto", testo: R`Nell'Almagesto, il trattato astronomico che restò il riferimento per oltre mille anni, Tolomeo incluse una tavola delle corde calcolata per ogni mezzo grado, molto più precisa di quella di Ipparco. Per costruirla dimostrò un teorema di geometria pura, oggi noto come teorema di Tolomeo: in un quadrilatero inscritto in una circonferenza, il prodotto delle diagonali è uguale alla somma dei prodotti dei lati opposti. Applicando questo teorema a un quadrilatero con un diametro come lato, Tolomeo ricavò esattamente le formule che oggi scriviamo come addizione e sottrazione di seno e coseno, oltre alla formula di bisezione. Tutto questo senza algebra simbolica: ogni passaggio era descritto a parole e illustrato con un disegno.`, legame: R`Le formule di addizione di questa pagina sono, nella sostanza, il contenuto geometrico del teorema di Tolomeo, riscritto con seno e coseno al posto delle corde.` },
    { matematico: 'Johannes Werner e Tycho Brahe', anni: '1468–1522 e 1546–1601', titolo: 'Moltiplicare con le tavole, prima dei logaritmi', testo: R`Nel Cinquecento gli astronomi dovevano moltiplicare fra loro numeri con molte cifre decimali, un lavoro lento e pieno di errori. Johannes Werner, astronomo e cartografo tedesco, osservò che le formule che trasformano un prodotto di coseni in una somma (quelle che oggi portano il suo nome) permettevano di sostituire una moltiplicazione con un'addizione, purché si avesse a disposizione una buona tavola di seni e coseni. Il metodo, chiamato prostaferesi, fu adottato e perfezionato nell'osservatorio di Tycho Brahe sull'isola di Hven, dove serviva a ridurre gli errori nei calcoli astronomici quotidiani. Restò lo strumento di calcolo più veloce a disposizione degli astronomi finché, nel 1614, John Napier non pubblicò i logaritmi, che facevano la stessa cosa in modo ancora più diretto.`, legame: R`La prostaferesi di questa pagina, vista al contrario, è proprio la formula di Werner: dal prodotto alla somma, e viceversa.` },
    { matematico: 'François Viète', anni: '1540–1603', titolo: "L'equazione di grado 45 nascosta in un angolo", testo: R`Nel 1593 il matematico fiammingo Adriaan van Roomen lanciò una sfida a tutti i matematici d'Europa: risolvere un'equazione di grado 45. L'ambasciatore olandese, in visita alla corte di Francia mentre il re Enrico IV si vantava dei suoi scienziati, fece notare che nessun francese aveva ancora risposto. Il re chiamò allora Viète, che riconobbe subito la natura del problema: quell'equazione mostruosa era, in realtà, la formula che lega $\sin\theta$ a $\sin45\theta$, ottenuta applicando ripetutamente le formule di duplicazione e di addizione per angoli multipli (dato che $45=3^2\cdot5$). Usando questa intuizione, Viète trovò in poco tempo ventitré soluzioni positive (le altre erano negative, numeri che allora si scartavano) e le presentò il giorno dopo.`, legame: R`Le formule di duplicazione di questa pagina sono il primo gradino di una scala di formule per i multipli di un angolo: Viète la percorse fino al multiplo 45.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'Una formula che ne riscrive altre due', testo: R`Euler dimostrò che $e^{ix}=\cos x+i\sin x$, un'identità che collega in un'unica scrittura l'esponenziale, i numeri complessi e la trigonometria. Da questa formula, le formule di addizione di questa pagina diventano quasi immediate: $e^{i(\alpha+\beta)}=e^{i\alpha}e^{i\beta}$ è solo una proprietà delle potenze, ma sviluppando entrambi i membri con la formula di Euler ed eguagliando parte reale e parte immaginaria si ritrovano esattamente $\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta$ e $\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$, senza disegnare nessun triangolo. È una delle ragioni per cui viene spesso definita una delle formule più belle della matematica: unisce con un solo simbolo cose che sembravano venire da mondi diversi.`, legame: R`Le formule di addizione di questa pagina si dimostrano anche così, in poche righe, moltiplicando due esponenziali complessi invece di confrontare due triangoli.` }
  ]
});
})();
