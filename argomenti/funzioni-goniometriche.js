(function () {
const R = String.raw;
/* risposte degli esercizi di base */
const rad = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'con π, es. 2π/5' });
const gradi = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'in gradi, es. 40', simboli: ['°'] });
const esatto = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'es. √5/3 oppure 1/4' });
const quadrante = (nome, n, romano) => {
  const accettate = [];
  [nome, n, n + '°', n + 'º', romano].forEach(q => { ['', 'il ', 'nel '].forEach(p => ['', ' quadrante'].forEach(s => accettate.push(p + q + s))); accettate.push('quadrante ' + q, 'q' + n); });
  return { tipo: 'testo', accettate, segnaposto: 'primo, secondo, terzo o quarto', simboli: [] };
};
const negativo = { tipo: 'testo', accettate: ['negativo', 'negativa', 'è negativo', 'meno', '-', '<0', 'neg'], segnaposto: 'positivo o negativo', simboli: [] };
const positivo = { tipo: 'testo', accettate: ['positivo', 'positiva', 'è positivo', 'più', 'piu', '+', '>0', 'pos'], segnaposto: 'positivo o negativo', simboli: [] };
COMPASSO.registra({
  id: 'funzioni-goniometriche',
  titolo: 'Funzioni goniometriche',

  introduzione: R`Sali su una ruota panoramica. Mentre gira, la tua altezza sale, scende e risale sempre allo stesso modo. Se sai di quanto è girata la ruota, sai a che altezza sei.

La funzione che dall'angolo ti dà l'altezza si chiama **seno**. Quella che ti dà lo spostamento a destra o a sinistra si chiama **coseno**.

Nel triangolo rettangolo l'angolo era sempre acuto. Qui invece può essere un angolo qualunque: ottuso, negativo, più grande di un giro. Per questo servono due strumenti nuovi, il radiante e la circonferenza goniometrica.

Queste funzioni descrivono le cose che oscillano o girano, come un pendolo o la corrente delle prese di casa. Prima di cominciare ripassa il teorema di Pitagora e che cos'è una funzione.`,

  inBreve: [
    R`Da gradi a radianti moltiplichi per $\dfrac{\pi}{180}$. Per esempio $180^\circ = \pi$ e $90^\circ = \dfrac{\pi}{2}$.`,
    R`Sulla circonferenza goniometrica il punto dell'angolo $\alpha$ è $P = (\cos\alpha,\ \sin\alpha)$. Il coseno è l'ascissa, il seno è l'ordinata.`,
    R`Seno e coseno stanno sempre fra $-1$ e $1$.`,
    R`Il segno di seno, coseno e tangente dipende dal quadrante. Guardalo prima di fare i conti.`,
    R`$\sin^2\alpha + \cos^2\alpha = 1$: dal seno ricavi il coseno, e il segno lo decide il quadrante.`,
    R`Seno e coseno si ripetono ogni $2\pi$, la tangente ogni $\pi$.`
  ],

  sezioni: [
    { id: 'gradi-radianti', titolo: 'Gradi e radianti', testo: R`Il **radiante** è un'unità per gli angoli che nasce dalla circonferenza stessa. Con i radianti molte formule diventano più semplici.

>* **Radiante:** l'angolo al centro che stacca un arco lungo quanto il raggio. La misura in radianti di un angolo è $\dfrac{\text{arco}}{\text{raggio}}$.

La circonferenza è lunga $2\pi r$, cioè $2\pi$ raggi. Quindi il giro completo misura $2\pi$ radianti, e un radiante è circa $57^\circ$.

| gradi | radianti |
|---|---|
| $360^\circ$ | $2\pi$ |
| $180^\circ$ | $\pi$ |
| $90^\circ$ | $\frac{\pi}{2}$ |
| $60^\circ$ | $\frac{\pi}{3}$ |
| $45^\circ$ | $\frac{\pi}{4}$ |
| $30^\circ$ | $\frac{\pi}{6}$ |

Per convertire usi una proporzione: i gradi stanno a $180$ come i radianti stanno a $\pi$.

~ \alpha^\circ : 180 = \alpha_{\text{rad}} : \pi :: la proporzione fra le due misure
~ \alpha_{\text{rad}} = \alpha^\circ \cdot \evid{\dfrac{\pi}{180}} :: isolo la misura in radianti
~ \alpha_{\text{rad}} = 135 \cdot \dfrac{\pi}{180} = \evid{\dfrac{135}{180}}\,\pi :: per esempio con $135^\circ$
~ \alpha_{\text{rad}} = \evidb{\dfrac{3}{4}\pi} :: semplifico: $135$ e $180$ si dividono tutti e due per $45$

Per tornare da radianti a gradi moltiplichi per $\dfrac{180}{\pi}$. Per esempio $\dfrac{5\pi}{6} \cdot \dfrac{180}{\pi} = 150^\circ$.

?? Quanto misura in radianti un angolo di $60^\circ$?
[x] $\dfrac{\pi}{3}$
[ ] $\dfrac{\pi}{6}$
[ ] $60\pi$
=> $60 \cdot \frac{\pi}{180} = \frac{\pi}{3}$. $\frac{\pi}{6}$ è $30^\circ$. $60\pi$ viene fuori se moltiplichi per $\pi$ e dimentichi di dividere per $180$.

Con i radianti la **lunghezza di un arco** è semplice: $l = r\,\theta$, con $\theta$ in radianti.

>! Lascia gli angoli in radianti come frazioni di $\pi$: scrivi $\dfrac{\pi}{6}$, non $0{,}524$. Il decimale nasconde di che angolo si tratta.` },

    { id: 'angoli-orientati', titolo: 'Angoli orientati e circonferenza goniometrica', testo: R`Una ruota può fare più di un giro, e può anche girare all'indietro. Per descrivere le rotazioni usi gli angoli **orientati**, cioè angoli con un verso.

>* Il verso **antiorario** (contrario alle lancette dell'orologio) è positivo. Il verso orario è negativo: $-90^\circ$ è un quarto di giro in senso orario.

La **circonferenza goniometrica** ha raggio $1$ e il centro nell'origine degli assi. Ogni angolo parte dal semiasse positivo delle $x$. Ruoti di $\alpha$ e arrivi a un punto $P$ della circonferenza: è il **punto associato** ad $\alpha$.

[[grafico:puntoMobile]]

Se fai un giro in più, torni sullo stesso punto. Per esempio $30^\circ$, $390^\circ$ e $-330^\circ$ hanno lo stesso punto associato. Questi angoli si dicono **congruenti**: differiscono di un numero intero di giri. In radianti sono $\alpha$ e $\alpha + 2k\pi$, con $k$ intero.

?? Quale di questi angoli ha lo stesso punto associato di $60^\circ$?
[ ] $-60^\circ$
[x] $-300^\circ$
[ ] $240^\circ$
=> $-300^\circ + 360^\circ = 60^\circ$: i due angoli differiscono di un giro. $-60^\circ$ porta al punto simmetrico rispetto all'asse $x$. $240^\circ$ porta al punto opposto.

I quattro **quadranti** si contano in verso antiorario, partendo da quello in alto a destra.

| quadrante | gradi | radianti |
|---|---|---|
| primo | da $0^\circ$ a $90^\circ$ | da $0$ a $\frac{\pi}{2}$ |
| secondo | da $90^\circ$ a $180^\circ$ | da $\frac{\pi}{2}$ a $\pi$ |
| terzo | da $180^\circ$ a $270^\circ$ | da $\pi$ a $\frac{3\pi}{2}$ |
| quarto | da $270^\circ$ a $360^\circ$ | da $\frac{3\pi}{2}$ a $2\pi$ |

>! Un angolo può essere più grande di $360^\circ$ o negativo. Per sapere dove cade, togli o aggiungi giri interi. Per esempio $780^\circ - 2 \cdot 360^\circ = 60^\circ$, nel primo quadrante. E $-120^\circ + 360^\circ = 240^\circ$, nel terzo.` },

    { id: 'seno-coseno', titolo: 'Seno e coseno', testo: R`Con un angolo acuto, il raggio $OP$ è l'ipotenusa di un triangolo rettangolo e vale $1$. Il seno è il cateto opposto, cioè l'ordinata di $P$. Il coseno è il cateto adiacente, cioè l'ascissa di $P$.

Questa lettura funziona per ogni angolo, e diventa la definizione.

>* Se $P$ è il punto associato ad $\alpha$: $$\cos\alpha = \text{ascissa di } P$$ $$\sin\alpha = \text{ordinata di } P$$ Quindi $P = (\cos\alpha,\ \sin\alpha)$. Il coseno viene prima, come la $x$.

Due cose si vedono subito dal disegno.
- $P$ sta su una circonferenza di raggio $1$. Quindi seno e coseno stanno sempre fra $-1$ e $1$.
- Il segno dipende dal quadrante in cui cade $P$.

[[grafico:circonferenzaGoniometrica]]

| quadrante | $\sin\alpha$ | $\cos\alpha$ |
|---|---|---|
| primo | $+$ | $+$ |
| secondo | $+$ | $-$ |
| terzo | $-$ | $-$ |
| quarto | $-$ | $+$ |

Esempio: $120^\circ$ cade nel secondo quadrante. Quindi il seno è positivo e il coseno è negativo. Infatti $\sin 120^\circ = \dfrac{\sqrt3}{2}$ e $\cos 120^\circ = -\dfrac12$.

?? Che segni hanno seno e coseno di $200^\circ$?
[ ] seno positivo, coseno negativo
[x] tutti e due negativi
[ ] seno negativo, coseno positivo
=> $200^\circ$ sta fra $180^\circ$ e $270^\circ$, nel terzo quadrante. Lì $P$ è in basso a sinistra, e ha tutte e due le coordinate negative. Seno positivo e coseno negativo è il secondo quadrante.

>! Non scambiare seno e coseno. Il coseno è l'ascissa (orizzontale), il seno è l'ordinata (verticale).` },

    { id: 'tangente-cotangente', titolo: 'Tangente e cotangente', testo: R`Nel triangolo rettangolo la tangente era cateto opposto diviso cateto adiacente. Qui i due cateti sono $\sin\alpha$ e $\cos\alpha$.

>* **Tangente:** $$\tan\alpha = \frac{\sin\alpha}{\cos\alpha}$$ Esiste solo se $\cos\alpha \ne 0$.

Il coseno vale zero a $90^\circ$ e a $270^\circ$, quindi lì la tangente non esiste.

La tangente è positiva dove seno e coseno hanno lo stesso segno, cioè nel primo e nel terzo quadrante. È negativa nel secondo e nel quarto.

La tangente si può anche **vedere** sul disegno.
1. Traccia la retta verticale che tocca la circonferenza in $(1,\ 0)$.
2. Prolunga il raggio $OP$ fino al punto $T$ dove incontra quella retta.
3. L'ordinata di $T$ è $\tan\alpha$.

Nel grafico della sezione precedente è il segmento verde-acqua. Vicino a $90^\circ$ il raggio diventa quasi verticale, e $T$ sale senza limite. A $90^\circ$ il raggio non incontra più la retta.

?? Quanto vale $\tan 135^\circ$?
[x] $-1$
[ ] $1$
[ ] non esiste
=> Seno e coseno di $135^\circ$ sono $\frac{\sqrt2}{2}$ e $-\frac{\sqrt2}{2}$, quindi il rapporto è $-1$. Il valore $1$ ha il segno sbagliato, perché nel secondo quadrante la tangente è negativa.

### Cotangente, secante, cosecante

Le altre tre funzioni sono i reciproci di tangente, coseno e seno:

| funzione | definizione | esiste se |
|---|---|---|
| cotangente | $\cot\alpha = \dfrac{\cos\alpha}{\sin\alpha}$ | $\sin\alpha \ne 0$ |
| secante | $\sec\alpha = \dfrac{1}{\cos\alpha}$ | $\cos\alpha \ne 0$ |
| cosecante | $\csc\alpha = \dfrac{1}{\sin\alpha}$ | $\sin\alpha \ne 0$ |

La cotangente si legge come la tangente, sulla retta orizzontale che tocca la circonferenza in $(0,\ 1)$.

Esempio: a $45^\circ$ seno e coseno valgono $\frac{\sqrt2}{2}$. Quindi $\tan 45^\circ = \cot 45^\circ = 1$ e $\sec 45^\circ = \frac{2}{\sqrt2} = \sqrt2$.

>! $\cot\alpha = \dfrac{1}{\tan\alpha}$ vale solo dove la tangente esiste e non è zero. Per esempio $\tan 90^\circ$ non esiste, ma $\cot 90^\circ = \dfrac{\cos 90^\circ}{\sin 90^\circ} = 0$.` },

    { id: 'angoli-notevoli', titolo: 'Gli angoli notevoli', testo: R`Per alcuni angoli seno e coseno hanno un valore esatto, con una radice. Sono gli **angoli notevoli**: $30^\circ$, $45^\circ$, $60^\circ$ e gli angoli sugli assi. Se li dimentichi, puoi ricostruirli così.

**Angolo di $45^\circ$.** Il punto $P$ sta sulla bisettrice del primo quadrante. Quindi ascissa e ordinata sono uguali: chiamale $x$.

~ x^2 + x^2 = 1 :: $P$ sta sulla circonferenza di raggio $1$ (Pitagora)
~ \evid{2x^2} = 1 :: sommo i due termini uguali
~ x^2 = \evid{\dfrac12} :: divido per $2$
~ x = \dfrac{1}{\sqrt2} = \evidb{\dfrac{\sqrt2}{2}} :: prendo la radice positiva (primo quadrante) e razionalizzo

Quindi $\sin 45^\circ = \cos 45^\circ = \dfrac{\sqrt2}{2}$.

**Angoli di $30^\circ$ e $60^\circ$.** Prendi un triangolo equilatero di lato $1$ e taglialo a metà con l'altezza $h$. Ottieni un triangolo rettangolo con angoli di $30^\circ$ e $60^\circ$ e ipotenusa $1$. Il cateto corto è metà lato, cioè $\dfrac12$. Il cateto lungo è $h$:

~ h^2 + \left(\dfrac12\right)^2 = 1^2 :: Pitagora nel mezzo triangolo
~ h^2 = 1 - \evid{\dfrac14} = \dfrac34 :: isolo $h^2$
~ h = \evidb{\dfrac{\sqrt3}{2}} :: prendo la radice positiva: è una lunghezza

Il cateto corto sta di fronte all'angolo di $30^\circ$. Quindi $\sin 30^\circ = \dfrac12$ e $\cos 30^\circ = \dfrac{\sqrt3}{2}$. Per $60^\circ$ i due valori si scambiano.

| $\alpha$ | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ |
|---|---|---|---|---|---|
| radianti | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
| $\sin\alpha$ | $0$ | $1/2$ | $\sqrt2/2$ | $\sqrt3/2$ | $1$ |
| $\cos\alpha$ | $1$ | $\sqrt3/2$ | $\sqrt2/2$ | $1/2$ | $0$ |
| $\tan\alpha$ | $0$ | $\sqrt3/3$ | $1$ | $\sqrt3$ | non definita |

La riga del coseno è quella del seno letta al contrario. La tangente è seno diviso coseno: $\tan 60^\circ = \dfrac{\sqrt3/2}{1/2} = \sqrt3$.

?? Quanto vale $\cos 60^\circ$?
[x] $\dfrac12$
[ ] $\dfrac{\sqrt3}{2}$
[ ] $\dfrac{\sqrt2}{2}$
=> L'angolo di $60^\circ$ tocca il cateto corto, $\frac12$: è il suo cateto adiacente. $\frac{\sqrt3}{2}$ è $\sin 60^\circ$: scambiare $30^\circ$ con $60^\circ$ è l'errore più comune. $\frac{\sqrt2}{2}$ è il valore di $45^\circ$.

Gli angoli **sugli assi** hanno valori immediati, perché $P$ sta su un asse:

| $\alpha$ | $0^\circ$ | $90^\circ$ | $180^\circ$ | $270^\circ$ | $360^\circ$ |
|---|---|---|---|---|---|
| $\sin\alpha$ | $0$ | $1$ | $0$ | $-1$ | $0$ |
| $\cos\alpha$ | $1$ | $0$ | $-1$ | $0$ | $1$ |

Gli altri angoli, come $120^\circ$ o $210^\circ$, si ricavano da questi con gli **angoli associati**.

>! $\tan 90^\circ$ non vale «infinito». Non esiste, perché $\cos 90^\circ = 0$ e non si divide per zero.` },

    { id: 'relazioni-fondamentali', titolo: 'Le relazioni fondamentali', testo: R`Se conosci il seno di un angolo, conosci anche il coseno? Quasi: ti manca solo il segno.

>* **Relazione fondamentale:** $$\sin^2\alpha + \cos^2\alpha = 1 \qquad \text{per ogni } \alpha$$ $\sin^2\alpha$ vuol dire $(\sin\alpha)^2$.

È il teorema di Pitagora. Guarda il triangolo con vertici $O$, $P$ e la proiezione di $P$ sull'asse $x$. L'ipotenusa è il raggio, che vale $1$. I cateti sono lunghi $|\cos\alpha|$ e $|\sin\alpha|$.

Esempio: $\sin\alpha = \dfrac35$, con $\alpha$ nel secondo quadrante. Quanto vale $\cos\alpha$?

~ \cos^2\alpha = 1 - \sin^2\alpha :: isolo $\cos^2\alpha$ nella relazione fondamentale
~ \cos^2\alpha = 1 - \evid{\dfrac{9}{25}} = \dfrac{16}{25} :: sostituisco $\sin\alpha = \frac35$, elevato al quadrato
~ \cos\alpha = \evid{\pm}\dfrac45 :: i numeri con quadrato $\frac{16}{25}$ sono due
~ \cos\alpha = \evidb{-\dfrac45} :: nel secondo quadrante il coseno è negativo

?? Sai che $\cos\alpha = \dfrac{5}{13}$ e che $\alpha$ sta nel quarto quadrante. Quanto vale $\sin\alpha$?
[ ] $\dfrac{12}{13}$
[x] $-\dfrac{12}{13}$
[ ] $\dfrac{8}{13}$
=> $\sin^2\alpha = 1 - \frac{25}{169} = \frac{144}{169}$, quindi $\sin\alpha = \pm\frac{12}{13}$. Nel quarto quadrante il seno è negativo. $\frac{12}{13}$ ha il segno sbagliato: succede se non guardi il quadrante. $\frac{8}{13}$ viene da $1 - \frac{5}{13}$, cioè dal dimenticare i quadrati.

Quando conosci la tangente serve una seconda relazione. Si ricava dalla prima:

~ \sin^2\alpha + \cos^2\alpha = 1 :: la relazione fondamentale
~ \dfrac{\sin^2\alpha}{\evid{\cos^2\alpha}} + \dfrac{\cos^2\alpha}{\evid{\cos^2\alpha}} = \dfrac{1}{\evid{\cos^2\alpha}} :: divido tutto per $\cos^2\alpha$, che deve essere diverso da zero
~ \evidb{\tan^2\alpha + 1} = \dfrac{1}{\cos^2\alpha} :: il primo rapporto è la tangente al quadrato, il secondo vale $1$

>! Da $\sin^2\alpha = \frac{9}{25}$ segue $\sin\alpha = \pm\frac35$, con due segni. Il segno lo decide il quadrante. Se il testo non dice il quadrante, le risposte sono due.` },

    { id: 'angoli-associati', titolo: 'Gli angoli associati', testo: R`Quanto vale $\cos 150^\circ$? Il punto di $150^\circ$ è il simmetrico del punto di $30^\circ$ rispetto all'asse $y$. Ha la stessa altezza, e l'ascissa con il segno cambiato. Quindi $\cos 150^\circ = -\cos 30^\circ = -\dfrac{\sqrt3}{2}$.

Gli **angoli associati** ad $\alpha$ hanno il punto simmetrico a quello di $\alpha$. L'animazione mostra le simmetrie una alla volta.

[[animazione:angoli-associati]]

| angolo | simmetria | seno | coseno |
|---|---|---|---|
| $-\alpha$ (opposto) | asse $x$ | $-\sin\alpha$ | $\cos\alpha$ |
| $180^\circ - \alpha$ (supplementare) | asse $y$ | $\sin\alpha$ | $-\cos\alpha$ |
| $180^\circ + \alpha$ | origine | $-\sin\alpha$ | $-\cos\alpha$ |
| $90^\circ - \alpha$ (complementare) | bisettrice | $\cos\alpha$ | $\sin\alpha$ |

Per un angolo preciso, come $210^\circ$, fai così.
1. Trova il quadrante: $210^\circ$ è nel terzo.
2. Trova quanto dista da $180^\circ$ o da $360^\circ$: $210^\circ = 180^\circ + 30^\circ$, quindi $30^\circ$.
3. Prendi il valore di $30^\circ$ dalla tabella.
4. Metti il segno del quadrante: $\sin 210^\circ = -\sin 30^\circ = -\dfrac12$.

Con una lettera, come in $\cos(90^\circ + \alpha)$, usa questa regola.

>* **Regola pratica.** 1) Con $180^\circ$ o $360^\circ$, o con il solo cambio di segno, la funzione resta la stessa. Con $90^\circ$ o $270^\circ$ seno e coseno si scambiano. 2) Il segno è quello della funzione **di partenza** nel quadrante dove cade l'angolo nuovo. Per trovarlo, pensa $\alpha$ acuto.

~ \cos(90^\circ + \alpha) :: esempio: lo voglio scrivere con le funzioni di $\alpha$
~ \cos(90^\circ + \alpha) = \evid{\pm\sin\alpha} :: c'è $90^\circ$: il coseno diventa seno
~ 90^\circ + \alpha \text{ sta nel secondo quadrante} :: con $\alpha$ acuto, l'angolo è fra $90^\circ$ e $180^\circ$
~ \cos(90^\circ + \alpha) = \evidb{-\sin\alpha} :: nel secondo quadrante il coseno, la funzione di partenza, è negativo

?? Quanto vale $\sin(180^\circ + \alpha)$?
[x] $-\sin\alpha$
[ ] $\sin\alpha$
[ ] $-\cos\alpha$
=> Con $180^\circ$ la funzione resta il seno. $180^\circ + \alpha$ cade nel terzo quadrante, dove il seno è negativo: $-\sin\alpha$. Con $-\cos\alpha$ hai scambiato le funzioni, ma lo scambio c'è solo con $90^\circ$ e $270^\circ$.

Pensi $\alpha$ acuto solo per trovare il segno. Le uguaglianze che ottieni valgono per ogni $\alpha$.` },

    { id: 'grafici-periodicita', titolo: 'I grafici delle funzioni goniometriche', testo: R`Che forma ha il grafico di $y = \sin x$? Segui l'altezza del punto che gira.
- parte da $0$;
- dopo un quarto di giro vale $1$;
- a mezzo giro vale $0$;
- a tre quarti vale $-1$;
- dopo un giro torna a $0$, e ricomincia.

L'animazione riporta quell'altezza su un asse orizzontale. L'onda che si disegna è la **sinusoide**.

[[animazione:circonferenza-sinusoide]]

Sull'asse $x$ ci sono i radianti: un giro è lungo $2\pi \approx 6{,}28$.

>* **Periodo:** dopo un giro torni allo stesso punto. Quindi $\sin(x + 2\pi) = \sin x$ e $\cos(x + 2\pi) = \cos x$. Il grafico si ripete uguale ogni $2\pi$: seno e coseno hanno **periodo** $2\pi$.

| | dominio | valori | periodo | zeri |
|---|---|---|---|---|
| $\sin x$ | $\mathbb{R}$ | $[-1,\ 1]$ | $2\pi$ | $x = k\pi$ |
| $\cos x$ | $\mathbb{R}$ | $[-1,\ 1]$ | $2\pi$ | $x = \frac{\pi}{2} + k\pi$ |
| $\tan x$ | $x \ne \frac{\pi}{2} + k\pi$ | $\mathbb{R}$ | $\pi$ | $x = k\pi$ |

Il grafico del coseno è la stessa onda del seno, spostata di lato. Di quanto? Scoprilo nel grafico.

[[grafico:senoCoseno]]

?? Quale uguaglianza è vera per ogni $x$?
[x] $\cos x = \sin\left(x + \dfrac{\pi}{2}\right)$
[ ] $\cos x = \sin x + \dfrac{\pi}{2}$
[ ] $\cos x = \sin(x - \pi)$
=> Per spostare la sinusoide a sinistra di $\frac{\pi}{2}$ scrivi $x + \frac{\pi}{2}$ **dentro** il seno. Se sommi $\frac{\pi}{2}$ fuori, come in $\sin x + \frac{\pi}{2}$, alzi la curva. $\sin(x - \pi)$ è $-\sin x$, l'onda rovesciata.

La **tangente** è diversa. Dove il coseno vale zero ha un **asintoto verticale**: una retta a cui il grafico si avvicina senza toccarla. Fra due asintoti la curva sale sempre, e il disegno si ripete ogni $\pi$.

[[grafico:tangentePiano]]

>! Il periodo della tangente è $\pi$, non $2\pi$. Il punto $P$ e il suo opposto stanno sulla stessa retta per l'origine, quindi danno la stessa tangente.` },

    { id: 'inverse-sinusoidi', titolo: 'Funzioni inverse e sinusoidi generali', testo: R`Se $\sin x = \dfrac12$, quanto vale $x$? Le risposte sono infinite: $\dfrac{\pi}{6}$, $\dfrac{5\pi}{6}$ e tutti gli angoli che ottieni aggiungendo giri. Una funzione inversa invece deve dare **un** risultato solo. Per questo cerchi l'angolo in un intervallo fissato.

>* **Funzioni inverse.** $\arcsin x$ è l'angolo fra $-\frac{\pi}{2}$ e $\frac{\pi}{2}$ che ha seno $x$. $\arccos x$ è l'angolo fra $0$ e $\pi$ che ha coseno $x$. $\arctan x$ è l'angolo fra $-\frac{\pi}{2}$ e $\frac{\pi}{2}$, estremi esclusi, che ha tangente $x$.

| funzione | dominio | valori |
|---|---|---|
| $\arcsin x$ | $[-1,\ 1]$ | $\left[-\frac{\pi}{2},\ \frac{\pi}{2}\right]$ |
| $\arccos x$ | $[-1,\ 1]$ | $[0,\ \pi]$ |
| $\arctan x$ | $\mathbb{R}$ | $\left(-\frac{\pi}{2},\ \frac{\pi}{2}\right)$ |

Per esempio $\arcsin\dfrac12 = \dfrac{\pi}{6}$. Non vale $\dfrac{5\pi}{6}$, perché è fuori dall'intervallo. E $\arcsin 2$ non esiste, perché il seno non supera mai $1$.

?? Quanto vale $\arccos\left(-\dfrac12\right)$?
[ ] $-\dfrac{\pi}{3}$
[x] $\dfrac{2\pi}{3}$
[ ] $\dfrac{4\pi}{3}$
=> L'arcocoseno dà un angolo fra $0$ e $\pi$. Lì l'angolo con coseno $-\frac12$ è $\frac{2\pi}{3}$, cioè $120^\circ$. $-\frac{\pi}{3}$ è sbagliato: $\cos\left(-\frac{\pi}{3}\right) = +\frac12$. Anche $\frac{4\pi}{3}$ ha coseno $-\frac12$, però è fuori dall'intervallo.

### Sinusoidi generali

Una sinusoide generale ha equazione $$y = A\sin(\omega x + \varphi)$$ Ogni numero cambia il grafico in un modo:

| numero | nome | effetto sul grafico |
|---|---|---|
| $A$ | ampiezza | l'onda va da $-\lvert A\rvert$ a $\lvert A\rvert$ |
| $\omega$ | pulsazione | il periodo diventa $T = \dfrac{2\pi}{\omega}$ |
| $\varphi$ | fase | sposta l'onda di lato |

L'ampiezza è sempre positiva: con $y = -3\sin x$ è $3$. Il segno meno rovescia l'onda.

[[grafico:sinusoideGenerale]]

Per trovare lo spostamento, raccogli $\omega$ dentro la parentesi. Esempio: $y = 3\sin\left(2x - \dfrac{\pi}{2}\right)$.

~ y = 3\sin\left(2x - \dfrac{\pi}{2}\right) :: ampiezza $3$, pulsazione $2$
~ y = 3\sin\left(\evid{2}\left(x - \dfrac{\pi}{4}\right)\right) :: raccolgo il $2$: $\frac{\pi}{2}$ diviso $2$ fa $\frac{\pi}{4}$
~ T = \dfrac{2\pi}{2} = \evidb{\pi} :: il periodo dipende solo da $\omega$
~ \text{spostamento: } \evidb{\dfrac{\pi}{4}} \text{ verso destra} :: con $x - \frac{\pi}{4}$ ogni cosa succede $\frac{\pi}{4}$ più tardi che in $y = 3\sin 2x$

?? Qual è il periodo di $y = 5\sin(3x + 1)$?
[x] $\dfrac{2\pi}{3}$
[ ] $\dfrac{2\pi}{5}$
[ ] $6\pi$
=> Il periodo dipende solo dalla pulsazione: $T = \frac{2\pi}{3}$. Il $5$ è l'ampiezza: cambia l'altezza delle creste, non la loro distanza. $6\pi$ viene dal moltiplicare per $3$ invece di dividere.

Nella scheda **Laboratorio** c'è *Sintonizza l'onda*: muovi le creste finché la tua onda non copre quella grigia.

>! Lo spostamento è $-\dfrac{\varphi}{\omega}$: la fase va divisa per la pulsazione. In $y = \sin\left(2x - \frac{\pi}{2}\right)$ l'onda si sposta di $\frac{\pi}{4}$, e non di $\frac{\pi}{2}$.` }
  ],

  grafici: {
    puntoMobile: {
      tipo: 'piano', x: [-2.3, 1.8], y: [-1.5, 2.1], passo: [0.5, 0.5],
      parametri: [{ nome: 't', min: -360, max: 720, passo: 5, valore: 390, etichetta: 't (gradi)' }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1 },
        { tipo: 'segmento', da: [0, 0], a: ['cos(t*pi/180)', 'sin(t*pi/180)'], colore: 4 },
        { tipo: 'punto', p: [1, 0], colore: 2 },
        { tipo: 'punto', p: ['cos(t*pi/180)', 'sin(t*pi/180)'], etichetta: 'P', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [-2.2, 1.95], testo: 't = {{t}}°  |  giri interi: {{floor(t/360)}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.2, 1.7], testo: 'stesso punto di {{t-360*floor(t/360)}}°', ancora: 'start' }
      ],
      didascalia: 'Il punto arancio è la partenza, (1, 0). Porta t oltre 360° e poi sotto 0°: il punto P ripassa sempre dagli stessi posti. «Stesso punto di» è l\'angolo fra 0° e 360° che finisce dove finisce t.'
    },
    circonferenzaGoniometrica: {
      tipo: 'circonferenza-goniometrica', angolo: 60, mostra: ['sin', 'cos', 'tan'],
      didascalia: 'Porta P in ciascuno dei quattro quadranti e guarda i segni: il seno (blu, verticale) è negativo sotto l\'asse x, il coseno (arancio, orizzontale) a sinistra dell\'asse y. Il segmento verde-acqua è la tangente: che cosa succede quando ti avvicini a 90°?'
    },
    senoCoseno: {
      tipo: 'piano', x: [-7, 7.6], y: [-1.5, 2.2], passo: [1, 1], altezza: 330,
      parametri: [
        { nome: 's', min: -3.14159265, max: 3.14159265, passo: 0.2617993878, valore: 0, etichetta: 's' }
      ],
      funzioni: [
        { f: 'cos(x)', etichetta: 'y = cos x', colore: 2, tratteggio: true },
        { f: 'sin(x + s)', etichetta: 'y = sin(x + s)', colore: 1 }
      ],
      elementi: [
        { tipo: 'testo', p: [-6.8, 1.95], testo: 's = {{s}}  ({{s*180/pi}}°)', ancora: 'start' }
      ],
      didascalia: 'Muovi s: la curva blu y = sin(x + s) scorre di lato. Per quale valore di s si posa esattamente sulla tratteggiata y = cos x? Guarda quanto vale s in gradi.'
    },
    tangentePiano: {
      tipo: 'piano', x: [-7, 7], y: [-6, 6], passo: [1, 1],
      funzioni: [{ f: 'tan(x)', etichetta: 'y = tan x', colore: 1 }],
      elementi: [
        { tipo: 'verticale', x: -4.7124, asintoto: true },
        { tipo: 'verticale', x: -1.5708, asintoto: true, etichetta: '−π/2' },
        { tipo: 'verticale', x: 1.5708, asintoto: true, etichetta: 'π/2' },
        { tipo: 'verticale', x: 4.7124, asintoto: true, etichetta: '3π/2' }
      ],
      didascalia: 'Guarda dove il grafico si spezza: sono le rette x = π/2 + kπ, dove cos x = 0. Passa il dito sulla curva: fra due asintoti la tangente sale sempre, e ogni π tutto si ripete.'
    },
    sinusoideGenerale: {
      tipo: 'piano', x: [-7, 7], y: [-3.5, 3.5], passo: [1, 1],
      parametri: [
        { nome: 'A', min: 0.5, max: 3, passo: 0.1, valore: 2, etichetta: 'A' },
        { nome: 'w', min: 0.5, max: 3, passo: 0.1, valore: 1, etichetta: 'ω' },
        { nome: 'phi', min: -3.14, max: 3.14, passo: 0.1, valore: 0, etichetta: 'φ' }
      ],
      funzioni: [
        { f: 'sin(x)', etichetta: 'y = sin x', colore: 2, tratteggio: true },
        { f: 'A*sin(w*x + phi)', etichetta: 'y = A·sin(ωx + φ)', colore: 1 }
      ],
      elementi: [
        { tipo: 'testo', p: [-6.8, 3.2], testo: 'T = 2π/ω = {{2*pi/w}}', ancora: 'start' },
        { tipo: 'testo', p: [-6.8, 2.6], testo: 'spostamento = {{-phi/w}}', ancora: 'start' }
      ],
      didascalia: 'Muovi un cursore alla volta. A alza e abbassa le creste; ω le avvicina o le allontana (guarda il periodo); φ fa scorrere l\'onda di lato senza cambiarne la forma. La tratteggiata è y = sin x, per confronto.'
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
    { nome: 'Cotangente', formula: R`\cot\alpha = \frac{\cos\alpha}{\sin\alpha} = \frac{1}{\tan\alpha}`, nota: R`Richiede $\sin\alpha \ne 0$. La forma $\frac{1}{\tan\alpha}$ vale solo dove la tangente esiste ed è diversa da zero: $\cot 90^\circ = 0$.` },
    { nome: 'Secante e cosecante', formula: R`\sec\alpha = \frac{1}{\cos\alpha}, \qquad \csc\alpha = \frac{1}{\sin\alpha}` },
    { nome: 'Relazione fondamentale', formula: R`\sin^2\alpha + \cos^2\alpha = 1` },
    { nome: 'Dalla relazione fondamentale', formula: R`1 + \tan^2\alpha = \frac{1}{\cos^2\alpha}`, nota: R`Si ottiene dividendo la relazione fondamentale per $\cos^2\alpha$.` },
    { nome: 'Angoli opposti', formula: R`\sin(-\alpha) = -\sin\alpha, \qquad \cos(-\alpha) = \cos\alpha` },
    { nome: 'Angoli supplementari', formula: R`\begin{array}{c} \sin(\pi - \alpha) = \sin\alpha \\ \cos(\pi - \alpha) = -\cos\alpha \end{array}` },
    { nome: 'Angoli complementari', formula: R`\begin{array}{c} \sin\left(\dfrac{\pi}{2} - \alpha\right) = \cos\alpha \\ \cos\left(\dfrac{\pi}{2} - \alpha\right) = \sin\alpha \end{array}` },
    { nome: 'Periodo delle funzioni goniometriche', formula: R`\begin{array}{c} \sin(x + 2\pi) = \sin x \\ \cos(x + 2\pi) = \cos x \\ \tan(x + \pi) = \tan x \end{array}` },
    { nome: 'Sinusoide generale', formula: R`y = A \sin(\omega x + \varphi)`, nota: R`Ampiezza $|A|$, periodo $T = \dfrac{2\pi}{\omega}$, sfasamento $-\dfrac{\varphi}{\omega}$.` }
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
    { id: 'fc-13', sezione: 'tangente-cotangente', tipo: 'definizione', fronte: R`Definizione di cotangente`, retro: R`$\cot\alpha = \dfrac{\cos\alpha}{\sin\alpha}$, definita quando $\sin\alpha \ne 0$. Dove la tangente esiste ed è diversa da zero vale anche $\cot\alpha = \dfrac{1}{\tan\alpha}$.` },
    { id: 'fc-14', sezione: 'tangente-cotangente', tipo: 'definizione', fronte: R`Secante e cosecante`, retro: R`$\sec\alpha = \dfrac{1}{\cos\alpha}$, $\csc\alpha = \dfrac{1}{\sin\alpha}$: i reciproci di coseno e seno.` },
    { id: 'fc-15', sezione: 'angoli-notevoli', tipo: 'formula', fronte: R`Seno, coseno e tangente di $30^\circ$, $45^\circ$, $60^\circ$`, retro: R`$\sin$: $\frac12, \frac{\sqrt2}{2}, \frac{\sqrt3}{2}$. $\cos$: gli stessi valori in ordine inverso. $\tan$: $\frac{\sqrt3}{3}, 1, \sqrt3$.` },
    { id: 'fc-16', sezione: 'angoli-notevoli', tipo: 'concetto', fronte: R`Seno e coseno di $0^\circ$, $90^\circ$, $180^\circ$, $270^\circ$`, retro: R`$\sin$: $0,1,0,-1$. $\cos$: $1,0,-1,0$: sono le coordinate dei quattro punti sugli assi.` },
    { id: 'fc-17', sezione: 'relazioni-fondamentali', tipo: 'formula', fronte: R`Relazione fondamentale della goniometria`, retro: R`$\sin^2\alpha + \cos^2\alpha = 1$, per ogni angolo $\alpha$.` },
    { id: 'fc-18', sezione: 'relazioni-fondamentali', tipo: 'procedura', fronte: R`Come si ricava $\cos\alpha$ da $\sin\alpha$?`, retro: R`$\cos\alpha = \pm\sqrt{1 - \sin^2\alpha}$: il segno si sceglie in base al quadrante di $\alpha$.` },
    { id: 'fc-19', sezione: 'angoli-associati', tipo: 'concetto', fronte: R`Regola pratica per gli angoli associati`, retro: R`Sommando o sottraendo un multiplo di $180^\circ$ la funzione resta la stessa; sommando o sottraendo $90^\circ$ o $270^\circ$ seno e coseno si scambiano. Il segno è quello della funzione **di partenza** nel quadrante dove cade l'angolo (pensando $\alpha$ acuto).` },
    { id: 'fc-20', sezione: 'angoli-associati', tipo: 'formula', fronte: R`Angoli opposti`, retro: R`$\sin(-\alpha) = -\sin\alpha$, $\cos(-\alpha) = \cos\alpha$.` },
    { id: 'fc-21', sezione: 'angoli-associati', tipo: 'formula', fronte: R`Angoli supplementari e complementari`, retro: R`Supplementari: $\sin(\pi-\alpha)=\sin\alpha$, $\cos(\pi-\alpha)=-\cos\alpha$. Complementari: seno e coseno si scambiano.` },
    { id: 'fc-22', sezione: 'grafici-periodicita', tipo: 'concetto', fronte: R`Periodo di seno, coseno, tangente`, retro: R`Seno e coseno hanno periodo $2\pi$; tangente e cotangente hanno periodo $\pi$.` },
    { id: 'fc-23', sezione: 'grafici-periodicita', tipo: 'concetto', fronte: R`Dove sono gli asintoti della tangente?`, retro: R`In $x = \dfrac{\pi}{2} + k\pi$, dove il coseno si annulla e la tangente non è definita.` },
    { id: 'fc-24', sezione: 'inverse-sinusoidi', tipo: 'definizione', fronte: R`Domini e immagini di arcoseno, arcocoseno, arcotangente`, retro: R`$\arcsin$: $[-1,1] \to \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$. $\arccos$: $[-1,1] \to [0,\pi]$. $\arctan$: $\mathbb{R} \to \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$.` },
    { id: 'fc-25', sezione: 'inverse-sinusoidi', tipo: 'formula', fronte: R`Sinusoide generale $y = A\sin(\omega x + \varphi)$`, retro: R`Ampiezza $|A|$, periodo $T = \dfrac{2\pi}{\omega}$, sfasamento orizzontale $-\dfrac{\varphi}{\omega}$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Converti $60^\circ$ in radianti. Scrivi il risultato con π, per esempio «π/4».`, suggerimenti: [R`Moltiplica per $\dfrac{\pi}{180}$ e semplifica.`], risposta: rad(Math.PI / 3), soluzione: [R`$60 \cdot \dfrac{\pi}{180} = \dfrac{60}{180}\,\pi$.`, R`Divido sopra e sotto per $60$: $\dfrac{\pi}{3}$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Converti $\dfrac{\pi}{6}$ in gradi.`, suggerimenti: [R`Moltiplica per $\dfrac{180}{\pi}$: il $\pi$ si semplifica.`], risposta: gradi(30), soluzione: [R`$\dfrac{\pi}{6} \cdot \dfrac{180}{\pi} = \dfrac{180}{6}$.`, R`$\dfrac{180}{6} = 30$, quindi $30^\circ$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Quanto vale $\cos 60^\circ$?`, suggerimenti: [R`Pensa al triangolo equilatero tagliato a metà: l'angolo di $60^\circ$ tocca il cateto corto.`], risposta: esatto(0.5), soluzione: [R`Nel mezzo triangolo equilatero il cateto adiacente a $60^\circ$ è metà lato, cioè $\dfrac12$.`, R`Quindi $\cos 60^\circ = \dfrac12$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Quanto vale $\sin 45^\circ$? Scrivi la forma esatta (per esempio «√5/2») oppure il decimale con due cifre.`, suggerimenti: [R`A $45^\circ$ seno e coseno sono uguali.`], risposta: esatto(Math.SQRT2 / 2), soluzione: [R`A $45^\circ$ il punto sta sulla bisettrice: seno e coseno sono uguali, chiamali $x$.`, R`Da $x^2 + x^2 = 1$ viene $x = \dfrac{\sqrt2}{2} \approx 0{,}71$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Quanto vale $\sin 270^\circ$?`, suggerimenti: [R`Dove sta il punto associato a $270^\circ$? Il seno è la sua ordinata.`], risposta: esatto(-1), soluzione: [R`$270^\circ$ sono tre quarti di giro: il punto è $(0,\ -1)$, in basso sulla circonferenza.`, R`Il seno è l'ordinata: $\sin 270^\circ = -1$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Converti $135^\circ$ in radianti. Scrivi il risultato con π.`, suggerimenti: [R`Moltiplica per $\dfrac{\pi}{180}$. $135$ e $180$ si dividono tutti e due per $45$.`], risposta: rad(3 * Math.PI / 4), soluzione: [R`$135 \cdot \dfrac{\pi}{180} = \dfrac{135}{180}\,\pi$.`, R`Divido sopra e sotto per $45$: $\dfrac{3}{4}\pi$, cioè $\dfrac{3\pi}{4}$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Converti $\dfrac{5\pi}{3}$ in gradi.`, suggerimenti: [R`Moltiplica per $\dfrac{180}{\pi}$.`], risposta: gradi(300), soluzione: [R`$\dfrac{5\pi}{3} \cdot \dfrac{180}{\pi} = \dfrac{5 \cdot 180}{3}$.`, R`$\dfrac{900}{3} = 300$, quindi $300^\circ$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Quanto vale $\tan 60^\circ$?`, suggerimenti: [R`$\tan 60^\circ = \dfrac{\sin 60^\circ}{\cos 60^\circ}$.`], risposta: esatto(Math.sqrt(3)), soluzione: [R`$\sin 60^\circ = \dfrac{\sqrt3}{2}$ e $\cos 60^\circ = \dfrac12$.`, R`$\tan 60^\circ = \dfrac{\sqrt3}{2} : \dfrac12 = \sqrt3 \approx 1{,}73$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`In quale quadrante cade l'angolo di $200^\circ$?`, suggerimenti: [R`Confronta $200^\circ$ con $90^\circ$, $180^\circ$ e $270^\circ$.`], risposta: quadrante('terzo', '3', 'iii'), soluzione: [R`$200^\circ$ sta fra $180^\circ$ e $270^\circ$.`, R`Quindi cade nel terzo quadrante.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`$\sin 250^\circ$ è positivo o negativo?`, suggerimenti: [R`Trova prima il quadrante di $250^\circ$.`, R`Il seno è l'ordinata: è negativo sotto l'asse $x$.`], risposta: negativo, soluzione: [R`$250^\circ$ sta fra $180^\circ$ e $270^\circ$: terzo quadrante.`, R`Nel terzo quadrante il punto sta sotto l'asse $x$, quindi il seno è negativo.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`In quale quadrante cade l'angolo di $480^\circ$?`, suggerimenti: [R`Togli un giro, cioè $360^\circ$.`], risposta: quadrante('secondo', '2', 'ii'), soluzione: [R`$480^\circ - 360^\circ = 120^\circ$: il punto associato è lo stesso.`, R`$120^\circ$ sta fra $90^\circ$ e $180^\circ$: secondo quadrante.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`$\cos 300^\circ$ è positivo o negativo?`, suggerimenti: [R`Trova il quadrante di $300^\circ$. Il coseno è l'ascissa.`], risposta: positivo, soluzione: [R`$300^\circ$ sta fra $270^\circ$ e $360^\circ$: quarto quadrante.`, R`Nel quarto quadrante il punto sta a destra dell'asse $y$, quindi il coseno è positivo.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Qual è il periodo di $y = \sin(2x)$? Scrivi il risultato con π.`, suggerimenti: [R`Il periodo è $T = \dfrac{2\pi}{\omega}$. Qui $\omega = 2$.`], risposta: rad(Math.PI), soluzione: [R`La pulsazione è $\omega = 2$.`, R`$T = \dfrac{2\pi}{2} = \pi$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Qual è l'ampiezza di $y = -3\sin(2x)$?`, suggerimenti: [R`L'ampiezza è il numero davanti al seno, preso senza segno.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.01, segnaposto: 'solo il numero' }, soluzione: [R`Il numero davanti al seno è $A = -3$.`, R`L'ampiezza è $|A| = 3$. Il segno meno rovescia l'onda, ma non la rende più bassa.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Qual è il periodo di $y = 4\cos(3x)$? Scrivi il risultato con π.`, suggerimenti: [R`Il $4$ è l'ampiezza: per il periodo conta solo $\omega$.`], risposta: rad(2 * Math.PI / 3), soluzione: [R`L'ampiezza $4$ non cambia il periodo. La pulsazione è $\omega = 3$.`, R`$T = \dfrac{2\pi}{3}$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Quanto vale $\sin 150^\circ$?`, suggerimenti: [R`$150^\circ = 180^\circ - 30^\circ$.`, R`Nel secondo quadrante il seno è positivo.`], risposta: esatto(0.5), soluzione: [R`$150^\circ$ è nel secondo quadrante, dove il seno è positivo.`, R`$150^\circ = 180^\circ - 30^\circ$: l'angolo di riferimento è $30^\circ$.`, R`$\sin 150^\circ = \sin 30^\circ = \dfrac12$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Quanto vale $\cos 225^\circ$?`, suggerimenti: [R`$225^\circ = 180^\circ + 45^\circ$.`, R`Nel terzo quadrante il coseno è negativo.`], risposta: esatto(-Math.SQRT2 / 2), soluzione: [R`$225^\circ$ è nel terzo quadrante, dove il coseno è negativo.`, R`$225^\circ = 180^\circ + 45^\circ$: l'angolo di riferimento è $45^\circ$.`, R`$\cos 225^\circ = -\cos 45^\circ = -\dfrac{\sqrt2}{2} \approx -0{,}71$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Quanto vale $\sin 300^\circ$?`, suggerimenti: [R`$300^\circ = 360^\circ - 60^\circ$.`, R`Nel quarto quadrante il seno è negativo.`], risposta: esatto(-Math.sqrt(3) / 2), soluzione: [R`$300^\circ$ è nel quarto quadrante, dove il seno è negativo.`, R`$300^\circ = 360^\circ - 60^\circ$: l'angolo di riferimento è $60^\circ$.`, R`$\sin 300^\circ = -\sin 60^\circ = -\dfrac{\sqrt3}{2} \approx -0{,}87$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Quanto vale $\tan 240^\circ$?`, suggerimenti: [R`$240^\circ = 180^\circ + 60^\circ$.`, R`Nel terzo quadrante seno e coseno sono tutti e due negativi: che segno ha il loro rapporto?`], risposta: esatto(Math.sqrt(3)), soluzione: [R`$240^\circ$ è nel terzo quadrante: seno e coseno sono negativi, quindi la tangente è positiva.`, R`$240^\circ = 180^\circ + 60^\circ$: l'angolo di riferimento è $60^\circ$.`, R`$\tan 240^\circ = \tan 60^\circ = \sqrt3 \approx 1{,}73$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Quanto vale $\cos(-120^\circ)$?`, suggerimenti: [R`Aggiungi un giro: $-120^\circ + 360^\circ$.`, R`Poi trova il quadrante e l'angolo di riferimento.`], risposta: esatto(-0.5), soluzione: [R`$-120^\circ + 360^\circ = 240^\circ$: il punto associato è lo stesso.`, R`$240^\circ$ è nel terzo quadrante, dove il coseno è negativo. L'angolo di riferimento è $60^\circ$.`, R`$\cos(-120^\circ) = -\cos 60^\circ = -\dfrac12$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Converti l'angolo di $135^\circ$ in radianti. (Nella casella puoi scrivere il risultato con π (per esempio «π/3») oppure in decimali.)`, suggerimenti: [R`Usa la formula di conversione gradi → radianti.`, R`$135^\circ = 135 \cdot \dfrac{\pi}{180}$: semplifica la frazione prima di moltiplicare per $\pi$.`], risposta: { tipo: 'numero', valore: 2.356, tolleranza: 0.01 }, soluzione: [R`$\alpha_{\text{rad}} = 135 \cdot \dfrac{\pi}{180} = \dfrac{135}{180}\pi = \dfrac{3\pi}{4}$.`, R`In decimale, $\dfrac{3\pi}{4} \approx 2{,}356$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Converti $\dfrac{5\pi}{6}$ radianti in gradi.`, suggerimenti: [R`Usa la formula di conversione radianti → gradi.`, R`Il fattore $\pi$ si semplifica con quello al numeratore.`], risposta: { tipo: 'numero', valore: 150, tolleranza: 0.01 }, soluzione: [R`$\alpha_{\text{gradi}} = \dfrac{5\pi}{6} \cdot \dfrac{180}{\pi} = \dfrac{5 \cdot 180}{6} = 150^\circ$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Una circonferenza ha raggio $10$ cm. Quanto misura l'arco corrispondente a un angolo al centro di $45^\circ$? (Due cifre decimali, in cm.)`, suggerimenti: [R`Prima converti l'angolo in radianti: la formula $l = r\theta$ vuole $\theta$ in radianti.`, R`$45^\circ = \dfrac{\pi}{4}$ rad.`], risposta: { tipo: 'numero', valore: 7.854, tolleranza: 0.01 }, soluzione: [R`$45^\circ = \dfrac{\pi}{4} \approx 0{,}785$ rad.`, R`$l = r\theta = 10 \cdot \dfrac{\pi}{4} = 2{,}5\pi \approx 7{,}854$ cm.`] },
    { id: 'es-04', difficolta: 1, testo: R`Calcola $\sin 150^\circ$.`, suggerimenti: [R`$150^\circ = 180^\circ - 30^\circ$: è il supplementare di $30^\circ$.`, R`Gli angoli supplementari hanno lo stesso seno.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`$150^\circ$ è nel secondo quadrante, dove il seno è positivo.`, R`$\sin 150^\circ = \sin(180^\circ - 30^\circ) = \sin 30^\circ = \dfrac12$.`] },
    { id: 'es-05', difficolta: 1, testo: R`Calcola $\cos 210^\circ$.`, suggerimenti: [R`$210^\circ = 180^\circ + 30^\circ$.`, R`Nel terzo quadrante il coseno è negativo.`], risposta: { tipo: 'numero', valore: -0.866, tolleranza: 0.01 }, soluzione: [R`$210^\circ$ è nel terzo quadrante: $\cos 210^\circ = \cos(180^\circ + 30^\circ) = -\cos 30^\circ$.`, R`$-\cos 30^\circ = -\dfrac{\sqrt3}{2} \approx -0{,}866$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Sapendo che $\sin\alpha = \dfrac35$ e che $\alpha$ è un angolo del primo quadrante, trova $\cos\alpha$.`, suggerimenti: [R`Usa la relazione fondamentale $\sin^2\alpha + \cos^2\alpha = 1$.`, R`Nel primo quadrante il coseno è positivo.`], risposta: { tipo: 'numero', valore: 0.8, tolleranza: 0.01 }, soluzione: [R`$\cos^2\alpha = 1 - \dfrac9{25} = \dfrac{16}{25}$.`, R`$\cos\alpha = +\sqrt{\dfrac{16}{25}} = \dfrac45 = 0{,}8$ (positivo, primo quadrante).`] },
    { id: 'es-07', difficolta: 2, testo: R`Sapendo che $\tan\alpha = -1$ e che $\alpha$ è un angolo del secondo quadrante (fra $90^\circ$ e $180^\circ$), trova $\alpha$ in gradi.`, suggerimenti: [R`Il valore assoluto di $\tan\alpha$ corrisponde a un angolo notevole.`, R`$\tan 45^\circ = 1$: cerca il supplementare di $45^\circ$.`], risposta: { tipo: 'numero', valore: 135, tolleranza: 0.5 }, soluzione: [R`$|\tan\alpha| = 1$ corrisponde all'angolo notevole $45^\circ$.`, R`Nel secondo quadrante la tangente è negativa, e l'angolo cercato è il supplementare di $45^\circ$: $\alpha = 180^\circ - 45^\circ = 135^\circ$.`] },
    { id: 'es-08', difficolta: 2, testo: R`In quale quadrante si trova un angolo $\alpha$ per cui $\sin\alpha < 0$ e $\tan\alpha > 0$?`, suggerimenti: [R`Elenca i quadranti dove il seno è negativo.`, R`Fra questi, in quale la tangente (cioè seno e coseno con lo stesso segno) è positiva?`], risposta: quadrante('terzo', '3', 'iii'), soluzione: [R`$\sin\alpha < 0$ nel terzo e nel quarto quadrante.`, R`$\tan\alpha > 0$ quando seno e coseno hanno lo stesso segno: succede nel primo e nel terzo quadrante.`, R`L'unico quadrante comune alle due condizioni è il terzo.`] },
    { id: 'es-09', difficolta: 2, testo: R`Usa gli angoli associati per calcolare $\sin(180^\circ + 30^\circ)$.`, suggerimenti: [R`Sommare $180^\circ$ non cambia la funzione (resta seno).`, R`L'angolo $180^\circ + 30^\circ$ cade nel terzo quadrante: che segno ha lì il seno?`], risposta: { tipo: 'numero', valore: -0.5, tolleranza: 0.01 }, soluzione: [R`$180^\circ + 30^\circ$ è nel terzo quadrante, dove il seno è negativo.`, R`$\sin(180^\circ + 30^\circ) = -\sin 30^\circ = -\dfrac12$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Qual è il periodo della funzione $y = \sin(3x)$? (Nella casella puoi scrivere il risultato con π (per esempio «π/3») oppure in decimali.)`, suggerimenti: [R`Il periodo di $\sin(\omega x)$ è $\dfrac{2\pi}{\omega}$.`, R`Qui $\omega = 3$.`], risposta: { tipo: 'numero', valore: 2.094, tolleranza: 0.01 }, soluzione: [R`$T = \dfrac{2\pi}{\omega} = \dfrac{2\pi}{3} \approx 2{,}094$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Sapendo che $\cos\alpha = -\dfrac{12}{13}$ e che $\alpha$ è un angolo del terzo quadrante, trova $\sin\alpha$ (in forma decimale, tre cifre).`, suggerimenti: [R`Relazione fondamentale: $\sin^2\alpha = 1 - \cos^2\alpha$.`, R`Nel terzo quadrante anche il seno è negativo.`], risposta: { tipo: 'numero', valore: -0.385, tolleranza: 0.01 }, soluzione: [R`$\sin^2\alpha = 1 - \dfrac{144}{169} = \dfrac{25}{169}$.`, R`$\sin\alpha = \pm\dfrac{5}{13}$; nel terzo quadrante è negativo: $\sin\alpha = -\dfrac{5}{13} \approx -0{,}385$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Qual è il periodo della funzione $y = 3\sin\left(2x + \dfrac{\pi}{4}\right)$? (Nella casella puoi scrivere il risultato con π (per esempio «π/3») oppure in decimali.)`, suggerimenti: [R`L'ampiezza e la fase non contano per il periodo: guarda solo $\omega$.`, R`$\omega = 2$.`], risposta: { tipo: 'numero', valore: 3.1416, tolleranza: 0.01 }, soluzione: [R`Il periodo dipende solo dalla pulsazione $\omega = 2$: $T = \dfrac{2\pi}{2} = \pi$.`, R`$\pi \approx 3{,}1416$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quanti radianti corrispondono a un angolo giro ($360^\circ$)?`, opzioni: [R`$2\pi$`, R`$\pi$`, R`$\dfrac{\pi}{2}$`, R`$360$`], corretta: 0, spiegazione: R`L'angolo giro corrisponde all'intera circonferenza: $2\pi r$ diviso il raggio $r$ dà $2\pi$. $\pi$ è l'angolo piatto ($180^\circ$), $\dfrac{\pi}{2}$ è l'angolo retto, e $360$ senza unità non è un valore in radianti.` },
    { id: 'q-02', domanda: R`La formula corretta per convertire un angolo dai gradi ai radianti è:`, opzioni: [R`$\alpha_{\text{rad}} = \alpha_{\text{gradi}} \cdot \dfrac{180}{\pi}$`, R`$\alpha_{\text{rad}} = \alpha_{\text{gradi}} \cdot \dfrac{\pi}{180}$`, R`$\alpha_{\text{rad}} = \alpha_{\text{gradi}} + \pi$`, R`$\alpha_{\text{rad}} = \dfrac{\alpha_{\text{gradi}}}{\pi}$`], corretta: 1, spiegazione: R`Dalla proporzione $\alpha_{\text{gradi}} : 180 = \alpha_{\text{rad}} : \pi$ si isola $\alpha_{\text{rad}}$ e resta il fattore $\dfrac{\pi}{180}$. Il fattore $\dfrac{180}{\pi}$ serve per la conversione inversa, da radianti a gradi; sommare $\pi$ o dividere per $\pi$ non viene da nessuna proporzione fra le due unità.` },
    { id: 'q-03', domanda: R`La lunghezza $l$ di un arco di circonferenza di raggio $r$ e angolo al centro $\theta$ vale $l = r\theta$ a condizione che:`, opzioni: [R`$\theta$ sia espresso in gradi`, R`$r$ sia maggiore di $1$`, R`$\theta$ sia espresso in radianti`, R`vale sempre, qualunque unità si usi per $\theta$`], corretta: 2, spiegazione: R`Il radiante è definito proprio perché $l = r\theta$ funzioni senza costanti aggiuntive; in gradi servirebbe moltiplicare anche per $\dfrac{\pi}{180}$.` },
    { id: 'q-04', domanda: R`Per convenzione, un angolo orientato è positivo se il punto si sposta in senso:`, opzioni: [R`orario`, R`dipende dal quadrante di partenza`, R`non ha un verso, è sempre positivo`, R`antiorario`], corretta: 3, spiegazione: R`Il verso antiorario, cioè contrario al movimento delle lancette dell'orologio, è per convenzione il verso positivo.` },
    { id: 'q-05', domanda: R`Il raggio della circonferenza goniometrica vale:`, opzioni: [R`$1$`, R`dipende dal problema`, R`il diametro diviso $2\pi$`, R`il valore massimo del seno moltiplicato per $2$`], corretta: 0, spiegazione: R`Per definizione la circonferenza goniometrica ha raggio $1$: è questo che rende seno e coseno direttamente le coordinate del punto, senza bisogno di dividere per il raggio.` },
    { id: 'q-06', domanda: R`Se $P = (\cos\alpha, \sin\alpha)$ è il punto associato ad $\alpha$ sulla circonferenza goniometrica, allora:`, opzioni: [R`l'ordinata di $P$ è il coseno`, R`l'ascissa di $P$ è il coseno`, R`$P$ dipende dal raggio scelto`, R`$\cos\alpha$ e $\sin\alpha$ possono superare $1$ in valore assoluto`], corretta: 1, spiegazione: R`Per definizione l'ascissa di $P$ è $\cos\alpha$ e l'ordinata è $\sin\alpha$; entrambe restano in $[-1,1]$ perché $P$ sta su una circonferenza di raggio $1$.` },
    { id: 'q-07', domanda: R`L'insieme dei valori che possono assumere $\sin\alpha$ e $\cos\alpha$ è:`, opzioni: [R`tutto $\mathbb{R}$`, R`$[0, 1]$`, R`$[-1, 1]$`, R`$(-\infty, +\infty)$ tranne lo $0$`], corretta: 2, spiegazione: R`Sono le coordinate di un punto su una circonferenza di raggio $1$: non possono mai uscire dall'intervallo $[-1,1]$.` },
    { id: 'q-08', domanda: R`La tangente di un angolo non è definita quando:`, opzioni: [R`$\alpha = 0^\circ$`, R`$\alpha = 180^\circ$`, R`è sempre definita, per ogni $\alpha$`, R`$\alpha = 90^\circ + k \cdot 180^\circ$`], corretta: 3, spiegazione: R`$\tan\alpha = \dfrac{\sin\alpha}{\cos\alpha}$ non esiste quando $\cos\alpha = 0$, cioè per $\alpha = 90^\circ + k \cdot 180^\circ$. Negli altri angoli elencati il coseno non si annulla.` },
    { id: 'q-09', domanda: R`Geometricamente, $\tan\alpha$ è la misura (con segno) del segmento staccato sulla retta:`, opzioni: [R`tangente alla circonferenza goniometrica nel punto $(1,0)$, parallela all'asse $y$`, R`che congiunge l'origine con il punto $P$`, R`coincidente con l'asse $x$`, R`tangente alla circonferenza nel punto $(0,1)$, parallela all'asse $x$`], corretta: 0, spiegazione: R`La costruzione della tangente usa la retta verticale tangente alla circonferenza in $(1,0)$; la retta orizzontale tangente in $(0,1)$ serve invece per la cotangente.` },
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
    { tipo: 'errore', testo: R`Negli angoli associati, lo scambio fra seno e coseno avviene solo con $90^\circ$ e $270^\circ$; sommando un multiplo di $180^\circ$ la funzione resta la stessa. Confondere le due regole è l'errore più comune.` },
    { tipo: 'metodo', testo: R`Per applicare la regola pratica degli angoli associati, immagina sempre $\alpha$ come un angolo acuto del primo quadrante: il segno finale si legge da dove cade l'angolo associato, non da $\alpha$.` },
    { tipo: 'trucco', testo: R`Un radiante misura circa $57$ gradi: un modo rapido per farsi un'idea della grandezza di un angolo dato in radianti, prima ancora di convertirlo con precisione.` },
    { tipo: 'errore', testo: R`Il periodo della tangente è $\pi$, non $2\pi$: copiare per la tangente il periodo di seno e coseno è un errore frequente.` },
    { tipo: 'trucco', testo: R`Controllo lampo su un seno o un coseno appena calcolati: eleva al quadrato entrambi (se li conosci) e verifica che la somma faccia $1$.` }
  ],

  aneddoti: [
    { matematico: 'Ipparco di Nicea', anni: 'circa 190–120 a.C.', titolo: 'La tavola delle corde per misurare il cielo', testo: R`Ipparco, astronomo greco attivo a Rodi, è considerato il padre della trigonometria: per calcolare posizioni di stelle e pianeti costruì quella che le fonti successive (la sua opera originale è andata perduta) descrivono come la prima tavola delle corde, un elenco che associava a ogni angolo al centro di una circonferenza la lunghezza della corda che quell'angolo sottende. Non esisteva ancora il seno: si ragionava sulla corda intera, non sulla sua metà. Ipparco usò questi strumenti anche per confrontare le proprie osservazioni astronomiche con quelle greche di 150 anni prima, e scoprì così la precessione degli equinozi: l'asse terrestre "dondola" lentissimamente, come una trottola, con un periodo di circa 26000 anni.`, legame: R`La tavola delle corde è l'antenata diretta delle tavole di seno e coseno: la corda di un angolo doppio è, a meno di un fattore, il seno dell'angolo stesso.` },
    { matematico: 'Aryabhata', anni: '476–550', titolo: 'Il seno come mezza corda', testo: R`Nel 499 d.C. l'astronomo e matematico indiano Aryabhata completò l'Aryabhatiya, un trattato in versi sanscriti che contiene tavole trigonometriche costruite in modo diverso da quelle greche: invece della corda intera di un angolo doppio, Aryabhata tabulò la sua metà, cioè esattamente quello che oggi chiamiamo seno. La chiamò jya-ardha ("mezza corda"), spesso abbreviato in jya. È un cambio di prospettiva piccolo sulla carta ma enorme nelle conseguenze: da lì in poi si ragiona su un segmento legato a un solo angolo, non su una corda legata al suo doppio. Aryabhata calcolò anche un valore di pi greco accurato a quattro cifre decimali ($3{,}1416$), dichiarando esplicitamente che si trattava di un valore approssimato: un'onestà scientifica non scontata per l'epoca.`, legame: R`Jya, la "mezza corda" di Aryabhata, è il seno che oggi si definisce come ordinata del punto sulla circonferenza goniometrica.` },
    { matematico: 'Gherardo da Cremona', anni: '1114–1187', titolo: 'Un errore di traduzione diventato la parola "seno"', testo: R`Il termine sanscrito jya passò agli astronomi arabi come jiba, una semplice trascrizione fonetica priva di significato in arabo. Ma l'arabo si scrive senza le vocali brevi, e jiba, riletto da chi non conosceva il termine tecnico, fu scambiato per jaib, una parola araba comune che vuol dire "insenatura", "piega della veste" o "seno" nel senso di golfo. Quando nel XII secolo i traduttori della scuola di Toledo (fra cui si ricorda soprattutto Gherardo da Cremona, che tradusse in latino un centinaio di opere scientifiche arabe) trovarono jaib nei testi di astronomia, lo resero con il latino sinus, che ha esattamente lo stesso campo di significati. Da sinus vengono l'italiano "seno", l'inglese sine, il francese sinus.`, legame: R`Ogni volta che si scrive $\sin\alpha$ si sta usando, senza saperlo, la parola scelta per un fraintendimento fra due lingue, otto secoli fa.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'Le funzioni al posto delle corde', testo: R`Fino al Settecento seno e coseno erano pensati come lunghezze di segmenti dentro una circonferenza di raggio scelto di volta in volta: cambiava il raggio, cambiavano i numeri delle tavole. Nel trattato Introductio in analysin infinitorum (1748), Eulero cambiò impostazione: trattò seno e coseno come funzioni di un numero reale, l'angolo misurato in radianti su una circonferenza di raggio $1$, esattamente come si studia oggi al liceo. Standardizzò anche le abbreviazioni sin, cos, tang che usiamo ancora, al posto di scritture più macchinose dei matematici precedenti. Ed è sempre Eulero a collegare trigonometria, numeri complessi ed esponenziali nella formula $e^{i\theta} = \cos\theta + i\sin\theta$, definita da molti "la più bella formula della matematica".`, legame: R`L'idea di seno e coseno come funzioni di un angolo in radianti, con dominio $\mathbb{R}$ e periodo $2\pi$, è esattamente l'impostazione di Eulero, non quella dei greci o degli indiani.` },
    { matematico: 'James Thomson', anni: '1822–1892', titolo: 'Il radiante, un\'unità di misura recente', testo: R`Il radiante come unità di misura degli angoli è sorprendentemente giovane: la parola stessa compare, per quanto si sa, per la prima volta nel 1873, in un compito d'esame scritto da James Thomson, ingegnere e matematico e fratello del più celebre Lord Kelvin, per gli studenti del Queen's College di Belfast, dove insegnava ingegneria. Prima di allora ci si riferiva a quella misura con perifrasi come "misura circolare". Il termine piacque, si diffuse rapidamente fra i matematici britannici e in pochi decenni divenne lo standard internazionale che è ancora oggi. Un'unità così centrale in analisi (basti pensare a $\dfrac{d}{dx}\sin x = \cos x$, valida solo misurando gli angoli in radianti) ha quindi una data di nascita più recente di molte delle scoperte matematiche che la usano.`, legame: R`Ogni volta che si scrive un angolo come $\dfrac{\pi}{3}$ invece che $60^\circ$ si sta usando l'unità introdotta da Thomson nel 1873.` }
  ]
});
})();
