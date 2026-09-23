(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'derivate',
  titolo: 'Derivate',

  introduzione: R`Quanto sta cambiando una quantità, proprio adesso? Per la velocità di un'auto risponde il tachimetro: non dice quanti chilometri hai fatto nell'ultima ora, dice quanto vai veloce in questo istante. La **derivata** dà la stessa risposta per qualunque funzione: la pendenza di una strada in un punto, la velocità con cui cresce una popolazione, il costo di un pezzo in più.

Nasce da due problemi che sembrano lontani: trovare la retta tangente a una curva in un punto, e calcolare la velocità di un corpo in un istante. Si risolvono tutti e due con lo stesso limite, e quel limite è la derivata.

Qui impari la definizione, che cosa vuol dire sul grafico, le derivate delle funzioni elementari e le regole per derivare somme, prodotti, quozienti e funzioni composte. Nello studio di funzione la derivata servirà a trovare dove un grafico sale, dove scende e dove ha massimi e minimi.

Servono i limiti, soprattutto quelli che si presentano nella forma $\frac{0}{0}$, e la continuità.`,

  inBreve: [
    R`Il rapporto incrementale $\frac{f(x_0 + h) - f(x_0)}{h}$ è la pendenza della secante; la derivata $f'(x_0)$ è il suo limite per $h \to 0$, cioè la pendenza della tangente.`,
    R`La tangente nel punto di ascissa $x_0$ è $y = f(x_0) + f'(x_0)(x - x_0)$: servono due numeri, $f(x_0)$ e $f'(x_0)$.`,
    R`Derivabile vuol dire anche continua, ma non il contrario: $|x|$ è continua in $0$ e lì ha uno spigolo, quindi non è derivabile.`,
    R`Le regole: $(f + g)' = f' + g'$, $(fg)' = f'g + fg'$, $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$. Nella funzione composta si deriva l'esterna e si moltiplica per la derivata dell'interna.`,
    R`Se $s(t)$ è la posizione di un corpo, $s'(t)$ è la sua velocità e $s''(t)$ la sua accelerazione.`
  ],

  sezioni: [
    { id: 'tangente-velocita', titolo: 'Il problema della tangente e della velocità istantanea', testo: R`Due domande, una di geometria e una di fisica, portano allo stesso calcolo.

La prima: data una curva e un suo punto, qual è la **retta tangente** in quel punto, cioè la retta che segue la direzione della curva proprio lì? Per la circonferenza si sa (è perpendicolare al raggio), ma per una parabola o una sinusoide non è chiaro che cosa voglia dire «avere la stessa direzione» in un punto solo.

La seconda: un corpo si muove secondo una **legge oraria** $s(t)$, che dà la posizione all'istante $t$. Fra gli istanti $t_0$ e $t_0 + h$ la velocità media è spazio diviso tempo: $\dfrac{s(t_0 + h) - s(t_0)}{h}$. Ma quanto vale la velocità in un istante preciso? Un istante non dura niente, e per zero non si divide.

>* **L'idea che risolve tutti e due i problemi.** Si calcola il rapporto su un intervallo piccolo (la pendenza di una secante, oppure la velocità media) e si guarda a quale numero si avvicina quando l'intervallo si restringe verso zero. Quel numero è la pendenza della tangente, oppure la velocità nell'istante.

Un sasso lasciato cadere percorre $s(t) = 5t^2$ metri in $t$ secondi. Calcoliamo la velocità media fra $t = 1$ e $t = 1 + h$.

~ \frac{s(1 + h) - s(1)}{h} = \frac{5(1 + h)^2 - 5}{h} :: spazio percorso diviso tempo impiegato
~ = \frac{5 + \evid{10h + 5h^2} - 5}{h} :: sviluppo il quadrato: $5(1 + 2h + h^2) = 5 + 10h + 5h^2$
~ = \frac{10h + 5h^2}{h} = \evidb{10 + 5h} :: il $5$ se ne va e divido per $h$, che non è zero

Più $h$ è piccolo, più $10 + 5h$ si avvicina a $10$.

| $h$ | velocità media (m/s) |
|---|---|
| 0,1 | 10,5 |
| 0,01 | 10,05 |
| 0,001 | 10,005 |

La velocità del sasso nell'istante $t = 1$ è il numero a cui si avvicinano: $10$ m/s.

>! La velocità media non è quella istantanea. Un'auto può fare $100\ \text{km}$ in un'ora, quindi una media di $100\ \text{km/h}$, andando piano in città e forte in autostrada. Il tachimetro segna la velocità istantanea.` },

    { id: 'rapporto-incrementale', titolo: 'Il rapporto incrementale e la derivata come limite', testo: R`Il numero a cui si avvicinano la pendenza della secante e la velocità media ha un nome: **derivata**.

>* **Rapporto incrementale** di $f$ in $x_0$: $$\frac{f(x_0 + h) - f(x_0)}{h}, \qquad h \ne 0.$$ È la pendenza della retta secante che passa per $(x_0; f(x_0))$ e $(x_0 + h; f(x_0 + h))$.

>* **Derivata** di $f$ in $x_0$: $$f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h},$$ se questo limite esiste ed è finito. Allora $f$ si dice **derivabile** in $x_0$. Si scrive anche $\frac{df}{dx}(x_0)$.

Quando $h$ diminuisce, il secondo punto scivola verso il primo e la secante ruota fino a diventare la tangente.

[[animazione:secante-tangente]]

Ora fallo tu con $f(x) = \sin x$ in $x_0 = 1$: trascina $Q$ verso $P$, da destra e da sinistra, e guarda la pendenza della secante.

[[grafico:rapporto-sin]]

Per calcolare una derivata con la definizione si scrive il rapporto incrementale, lo si semplifica finché $h$ sparisce dal denominatore, e solo allora si fa il limite. Per $f(x) = x^2$:

~ \frac{(x + h)^2 - x^2}{h} :: il rapporto incrementale in un punto $x$ qualunque
~ \frac{\evid{2xh + h^2}}{h} :: sviluppo $(x + h)^2 = x^2 + 2xh + h^2$: il termine $x^2$ se ne va
~ \evid{2x + h} :: divido per $h$, che nel rapporto incrementale non è zero
~ f'(x) = \lim_{h \to 0} (2x + h) = \evidb{2x} :: ora il limite si fa sostituendo $h = 0$

Per $f(x) = \frac{1}{x}$, con $x \ne 0$:

~ \frac{1}{h}\left(\frac{1}{x + h} - \frac{1}{x}\right) :: il rapporto incrementale, con la divisione per $h$ scritta davanti
~ \frac{1}{h} \cdot \evid{\frac{x - (x + h)}{x(x + h)}} :: denominatore comune dentro la parentesi
~ \frac{1}{h} \cdot \frac{\evid{-h}}{x(x + h)} = \evid{-\frac{1}{x(x + h)}} :: nel numeratore resta $-h$, che si semplifica con $\frac{1}{h}$
~ f'(x) = \evidb{-\frac{1}{x^2}} :: per $h \to 0$ il prodotto $x(x + h)$ tende a $x^2$

?? Uno studente vuole $f'(3)$ per $f(x) = x^2$ e mette subito $h = 0$ in $\frac{(3 + h)^2 - 9}{h}$. Che cosa ottiene?
[x] $\frac{0}{0}$, che non è un numero
[ ] $6$, la derivata
[ ] $0$
=> Con $h = 0$ viene $\frac{9 - 9}{0} = \frac{0}{0}$: il rapporto incrementale per $h = 0$ non esiste. Bisogna prima sviluppare, $\frac{6h + h^2}{h} = 6 + h$, e solo dopo far tendere $h$ a $0$: così si ottiene $6$. Chi risponde $0$ ha guardato solo il numeratore.

>! Il rapporto incrementale **da solo** non è la derivata: è un numero che dipende da $h$. La derivata è il suo limite, non il valore calcolato con un $h$ piccolo.` },

    { id: 'significato-geometrico', titolo: 'Significato geometrico: la retta tangente', testo: R`La derivata $f'(x_0)$ è il **coefficiente angolare**, cioè la pendenza, della retta tangente al grafico nel punto $(x_0; f(x_0))$. Se è positiva il grafico lì sale, se è negativa scende, se è zero la tangente è orizzontale. Più è grande (in valore assoluto), più il grafico è ripido.

>* **Retta tangente** al grafico di $f$ nel punto di ascissa $x_0$: $$y = f(x_0) + f'(x_0)(x - x_0).$$ Servono due numeri: $f(x_0)$ e $f'(x_0)$.

Nel grafico c'è $f(x) = \frac{x^2}{4}$, che ha derivata $f'(x) = \frac{x}{2}$ (con la regola della potenza, più avanti). Trascina $P$: la tangente ruota e la pendenza scritta in alto cambia senza salti. In quale punto vale zero?

[[grafico:tangente-mobile]]

Esempio: la tangente al grafico di $f(x) = x^3$ nel punto di ascissa $2$.

~ f(2) = 2^3 = \evid{8} :: primo numero: il punto di tangenza è $(2; 8)$
~ f'(x) = 3x^2, \quad f'(2) = \evid{12} :: secondo numero: la pendenza
~ y = 8 + 12(x - 2) :: sostituisco nella formula della tangente
~ y = 8 + \evid{12x - 24} :: moltiplico $12$ per **tutti e due** i termini della parentesi
~ y = \evidb{12x - 16} :: sommo i termini noti

>! Il prodotto $f'(x_0)(x - x_0)$ va svolto per intero. Scrivere $y = 8 + 12x - 2$, cioè dimenticare di moltiplicare anche il $2$ per $12$, dà la retta $y = 12x + 6$, che non passa nemmeno per il punto di tangenza: in $x = 2$ vale $30$, non $8$.

?? La tangente al grafico di $f$ nel punto di ascissa $1$ è $y = 3x - 2$. Quanto valgono $f(1)$ e $f'(1)$?
[x] $f(1) = 1$ e $f'(1) = 3$
[ ] $f(1) = -2$ e $f'(1) = 3$
[ ] $f(1) = 3$ e $f'(1) = 1$
=> La pendenza della tangente è $f'(1)$, cioè il coefficiente di $x$: $3$. Il punto di tangenza sta sulla retta, quindi $f(1) = 3 \cdot 1 - 2 = 1$. Il termine noto $-2$ è l'ordinata del punto in cui la retta taglia l'asse $y$, non $f(1)$.

Nella scheda **Laboratorio** c'è *La macchina sulla curva*: guidi una macchinina lungo una strada, il fanale disegna la tangente e il tachimetro segna la pendenza.` },

    { id: 'continuita-derivabilita', titolo: 'Derivata destra e sinistra; continuità e derivabilità', testo: R`Nel rapporto incrementale $h$ può tendere a $0$ da una parte sola: con $h > 0$ il secondo punto sta a destra di $x_0$, con $h < 0$ sta a sinistra. I due limiti possono essere diversi.

>* **Derivata destra e sinistra**: $$\begin{aligned} f'_+(x_0) &= \lim_{h \to 0^+} \frac{f(x_0 + h) - f(x_0)}{h} \\ f'_-(x_0) &= \lim_{h \to 0^-} \frac{f(x_0 + h) - f(x_0)}{h} \end{aligned}$$ $f$ è derivabile in $x_0$ se e solo se queste due derivate esistono, sono finite e sono uguali.

L'esempio da ricordare è $f(x) = |x|$ in $x_0 = 0$, dove $f(0) = 0$.

~ f'_-(0) = \lim_{h \to 0^-} \frac{|h|}{h} :: da sinistra: $h$ è negativo
~ f'_-(0) = \lim_{h \to 0^-} \frac{\evid{-h}}{h} = \evidb{-1} :: per $h < 0$ si ha $|h| = -h$
~ f'_+(0) = \lim_{h \to 0^+} \frac{\evid{h}}{h} = \evidb{1} :: da destra $h > 0$ e $|h| = h$

Le due derivate esistono e sono finite, ma sono diverse: $|x|$ non è derivabile in $0$. Il grafico lì ha uno spigolo: a sinistra scende con pendenza $-1$, a destra sale con pendenza $1$, e nessuna retta segue la curva da tutte e due le parti.

Eppure in $0$ la funzione $|x|$ è continua. Il legame fra le due proprietà va in un senso solo.

>* Se $f$ è derivabile in $x_0$, allora è continua in $x_0$. Il contrario è **falso**: ci sono funzioni continue che non sono derivabili.

?? Una funzione non è continua in $x_0$. Può essere derivabile in $x_0$?
[x] no, mai
[ ] sì, se le derivate destra e sinistra sono uguali
[ ] sì, se il salto è piccolo
=> Se fosse derivabile sarebbe anche continua, e non lo è: quindi non è derivabile. È il teorema letto al contrario, ed è l'unico modo lecito di rovesciarlo. Un salto, piccolo o grande, basta a impedire la derivabilità.

>! Continua non vuol dire derivabile: $|x|$ si disegna senza staccare la penna dal foglio, ma nel vertice la direzione cambia di colpo, e lì non c'è un'unica tangente.` },

    { id: 'punti-non-derivabili', titolo: 'Punti di non derivabilità', testo: R`Quando una funzione continua non è derivabile in un punto $x_0$, si guarda che cosa fanno la derivata destra e la derivata sinistra. I casi sono tre.

| tipo | derivate destra e sinistra | esempio in $0$ |
|---|---|---|
| **punto angoloso** | finite e diverse | $\lvert x \rvert$ |
| **cuspide** | infinite, di segno opposto | $\sqrt[3]{x^2}$ |
| **flesso a tangente verticale** | infinite, dello stesso segno | $\sqrt[3]{x}$ |

Nel punto angoloso ci sono due tangenti diverse, una per lato. Nella cuspide il grafico fa una punta: arriva scendendo sempre più ripido, fino alla verticale, e riparte salendo in verticale. Nel flesso a tangente verticale la curva passa attraverso la retta verticale senza fare punte, e intanto cambia il verso in cui si piega.

>* In tutti e tre i casi la funzione è **continua**: niente salti, solo una direzione che non si decide.

Per la cuspide il conto si fa con la regola della potenza (nella prossima sezione).

~ f(x) = \sqrt[3]{x^2} = x^{\frac{2}{3}} :: scrivo la radice come potenza
~ f'(x) = \frac{2}{3} x^{\evid{-\frac{1}{3}}} = \frac{2}{3\sqrt[3]{x}} :: l'esponente scende di uno; vale per $x \ne 0$
~ \lim_{x \to 0^+} f'(x) = \evidb{+\infty} :: da destra il denominatore tende a $0$ restando positivo
~ \lim_{x \to 0^-} f'(x) = \evidb{-\infty} :: da sinistra tende a $0$ restando negativo: segni opposti, cuspide

Nel grafico le due curve passano per l'origine. Trascina $P$ (o $Q$) verso $0$, prima da destra e poi da sinistra, e confronta i segni delle due pendenze.

[[grafico:cuspide-flesso]]

>! Cuspide e flesso a tangente verticale si confondono facilmente. Guarda il **segno** delle due derivate: se è opposto è una cuspide (il grafico fa la punta), se è uguale è un flesso (il grafico passa dritto, in verticale).` },

    { id: 'derivate-elementari', titolo: 'Le derivate delle funzioni elementari', testo: R`Rifare il limite per ogni funzione sarebbe lungo. Le derivate delle funzioni elementari si ricavano una volta per tutte dalla definizione e si raccolgono in una tabella, da sapere a memoria.

| $f(x)$ | $f'(x)$ | condizione |
|---|---|---|
| $c$ (costante) | $0$ | — |
| $x^n$ | $n\,x^{n-1}$ | dove $x^{n-1}$ ha senso |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ | $x>0$ |
| $\sin x$ | $\cos x$ | — |
| $\cos x$ | $-\sin x$ | — |
| $\tan x$ | $\dfrac{1}{\cos^2 x}$ | $\cos x \ne 0$ |
| $e^x$ | $e^x$ | — |
| $a^x$ | $a^x \ln a$ | $a>0,\ a \ne 1$ |
| $\ln x$ | $\dfrac{1}{x}$ | $x>0$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ | $x>0,\ a>0,\ a\ne 1$ |

La regola della potenza contiene i due casi già calcolati con la definizione: con $n = 2$ dà $2x$, con $n = -1$ (perché $\frac{1}{x} = x^{-1}$) dà $-x^{-2} = -\frac{1}{x^2}$. Vale anche con esponenti non interi: $\sqrt{x} = x^{\frac12}$ ha derivata $\frac{1}{2}x^{-\frac12} = \frac{1}{2\sqrt{x}}$, come nella tabella.

La derivata di $\tan x$ si ricava con la regola del quoziente, nella prossima sezione.

>* $(e^x)' = e^x$: l'esponenziale di base $e$ coincide con la sua derivata, ed è il motivo per cui in analisi si usa quasi sempre la base $e$. Seno e coseno invece si passano la mano: $\sin \to \cos \to -\sin \to -\cos \to \sin$, e dopo quattro derivate si torna al punto di partenza.

?? Qual è la derivata di $f(x) = \dfrac{1}{x^3}$?
[x] $-\dfrac{3}{x^4}$
[ ] $\dfrac{1}{3x^2}$
[ ] $-\dfrac{3}{x^2}$
=> $\frac{1}{x^3} = x^{-3}$, e la regola della potenza dà $-3x^{-4} = -\frac{3}{x^4}$: l'esponente scende di uno, da $-3$ a $-4$. $\frac{1}{3x^2}$ viene derivando il denominatore e lasciandolo sotto la frazione; $-\frac{3}{x^2}$ nasce dal far salire l'esponente invece di farlo scendere.

>! La derivata di $a^x$ **non** è $x\,a^{x-1}$. La regola della potenza vale quando la variabile è nella base e l'esponente è fisso; in $a^x$ la variabile sta nell'esponente, e compare il fattore $\ln a$: $(2^x)' = 2^x \ln 2$.` },

    { id: 'regole-derivazione', titolo: 'Le regole di derivazione', testo: R`Con la tabella e quattro regole si deriva qualunque funzione costruita a partire da quelle elementari.

>* **Somma**: $(f + g)' = f' + g'$. **Prodotto**: $(fg)' = f'g + fg'$. **Quoziente**: $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$, dove $g \ne 0$.

Il prodotto **non** si deriva come la somma. Con $f(x) = g(x) = x$ il prodotto è $x^2$, che ha derivata $2x$; invece $f' \cdot g' = 1 \cdot 1 = 1$.

**Prodotto.** $f(x) = x^2 \sin x$:

~ (x^2 \sin x)' = \evid{(x^2)'} \sin x + x^2 \evid{(\sin x)'} :: $f'g + fg'$: si deriva un fattore alla volta, lasciando l'altro com'è
~ = \evidb{2x \sin x + x^2 \cos x} :: $(x^2)' = 2x$ e $(\sin x)' = \cos x$

**Quoziente.** La derivata di $\tan x = \frac{\sin x}{\cos x}$, data nella tabella senza spiegazione:

~ \left(\frac{\sin x}{\cos x}\right)' :: è un quoziente con $f = \sin x$ e $g = \cos x$
~ = \frac{\evid{\cos x} \cdot \cos x - \sin x \cdot (\evid{-\sin x})}{\cos^2 x} :: $\frac{f'g - fg'}{g^2}$, con $f' = \cos x$ e $g' = -\sin x$
~ = \frac{\evid{\cos^2 x + \sin^2 x}}{\cos^2 x} :: meno per meno fa più
~ = \evidb{\frac{1}{\cos^2 x}} :: identità fondamentale: $\sin^2 x + \cos^2 x = 1$

>* **Funzione composta (regola della catena)**: se $y = f(g(x))$, allora $$[f(g(x))]' = f'(g(x)) \cdot g'(x).$$ Si deriva la funzione **esterna** $f$ lasciandoci dentro la funzione **interna** $g(x)$ così com'è, e si moltiplica per la derivata dell'interna.

~ \left(\sqrt{x^2 + 1}\right)' :: esterna: la radice; interna: $x^2 + 1$
~ \frac{1}{2\sqrt{\evid{x^2 + 1}}} \cdot \ldots :: derivo la radice, $(\sqrt{u})' = \frac{1}{2\sqrt{u}}$, con dentro l'interna com'è
~ \frac{1}{2\sqrt{x^2 + 1}} \cdot \evid{2x} :: moltiplico per la derivata dell'interna
~ \evidb{\frac{x}{\sqrt{x^2 + 1}}} :: semplifico il $2$

>! Nella regola della catena si dimentica spesso il fattore $g'(x)$. $[\sin(3x)]'$ non è $\cos(3x)$: è $3\cos(3x)$, perché l'interna $3x$ ha derivata $3$.

?? Qual è la derivata di $(x^2 + 1)^3$?
[x] $6x(x^2 + 1)^2$
[ ] $3(x^2 + 1)^2$
[ ] $3(2x)^2$
=> Esterna $u^3$, con derivata $3u^2$; interna $x^2 + 1$, con derivata $2x$. Quindi $3(x^2 + 1)^2 \cdot 2x = 6x(x^2 + 1)^2$. $3(x^2 + 1)^2$ dimentica il fattore $2x$; $3(2x)^2$ deriva prima l'interna e poi ci applica la potenza.

**Funzione inversa (cenni).** Se $f$ è invertibile e derivabile in $x_0$, con $f'(x_0) \ne 0$, e $y_0 = f(x_0)$, anche $f^{-1}$ è derivabile in $y_0$ e $$(f^{-1})'(y_0) = \frac{1}{f'(x_0)}.$$ I grafici di $f$ e $f^{-1}$ sono simmetrici rispetto alla bisettrice $y = x$, e la simmetria scambia ogni pendenza con la sua reciproca.` },

    { id: 'derivate-successive-differenziale', titolo: 'Derivate di ordine superiore e il differenziale', testo: R`La derivata $f'(x)$ è a sua volta una funzione, e si può derivare di nuovo. Si ottiene la **derivata seconda**, $f''(x)$ (si scrive anche $\frac{d^2y}{dx^2}$); poi la terza $f'''(x)$, la quarta $f^{(4)}(x)$, e così via.

~ f(x) = x^4 - 2x^3 :: la funzione di partenza
~ f'(x) = \evid{4x^3 - 6x^2} :: regola della potenza, termine per termine
~ f''(x) = \evid{12x^2 - 12x} :: si deriva $f'$, non $f$
~ f'''(x) = \evid{24x - 12} :: e poi ancora
~ f^{(4)}(x) = \evidb{24} :: una costante: dalla quinta derivata in poi viene sempre $0$

>* Se $f'$ dice come cambia $f$, $f''$ dice come cambia la pendenza. Se $f$ è una posizione, $f'$ è la velocità e $f''$ l'accelerazione. Sul grafico, $f''$ dice da che parte si piega la curva: lo si userà nello studio di funzione.

>! $f''$ non è $(f')^2$. Con $f(x) = x^2$ si ha $f'(x) = 2x$: il quadrato della derivata è $4x^2$, mentre la derivata seconda è $f''(x) = 2$.

?? Se $f(x) = x^3$, quanto vale $f''(2)$?
[x] $12$
[ ] $144$
[ ] $6$
=> $f'(x) = 3x^2$ e $f''(x) = 6x$, quindi $f''(2) = 12$. $144 = (f'(2))^2 = 12^2$ è il quadrato della derivata prima; $6$ è il coefficiente di $6x$ senza aver sostituito $x = 2$.

**Il differenziale (cenni).** Il differenziale di $f$ in $x_0$ è $$df = f'(x_0)\,dx,$$ dove $dx$ è un incremento piccolo, ma non nullo, della $x$. È l'approssimazione **lineare** della variazione vera $f(x_0 + dx) - f(x_0)$: vicino a $x_0$ il grafico si confonde con la tangente, e più $dx$ è piccolo, migliore è l'approssimazione.` },

    { id: 'applicazioni', titolo: 'Applicazioni: velocità, accelerazione e tasso di variazione', testo: R`La derivata misura il **tasso di variazione istantaneo**: di quanto cambia una quantità per ogni unità in più dell'altra, in quel momento.

>* Se $s(t)$ è la posizione di un corpo all'istante $t$, la sua **velocità** è $v(t) = s'(t)$ e la sua **accelerazione** è $a(t) = v'(t) = s''(t)$.

Esempio: un punto si muove sulla retta secondo la legge oraria $s(t) = t^3 - 6t^2 + 9t$ (metri e secondi).

~ v(t) = s'(t) = 3t^2 - 12t + 9 :: la velocità è la derivata della posizione
~ v(1) = 3 - 12 + 9 = \evidb{0} :: in $t = 1$ il punto è fermo, per un attimo
~ a(t) = v'(t) = 6t - 12 :: l'accelerazione è la derivata della velocità
~ a(1) = 6 - 12 = \evidb{-6}\ \text{m/s}^2 :: negativa: la velocità sta calando, e da positiva diventa negativa

Sul grafico di $s(t)$ la velocità è la pendenza della tangente. Trascina $P$: dove la tangente sale il punto avanza, dove scende torna indietro, dove è orizzontale è fermo.

[[grafico:moto]]

Vale per ogni funzione: dove $f'(x) > 0$ il grafico sale, dove $f'(x) < 0$ scende. Nello studio di funzione sarà il modo di trovare massimi e minimi.

?? In quale intervallo di tempo il punto con $s(t) = t^3 - 6t^2 + 9t$ torna indietro?
[x] per $1 < t < 3$
[ ] per $t > 2$, dove l'accelerazione è positiva
[ ] per $t < 1$
=> Torna indietro quando la velocità è negativa: $v(t) = 3(t - 1)(t - 3)$ è negativa fra $1$ e $3$. Il segno dell'accelerazione dice se la velocità cresce o cala, non in che verso va il punto: fra $2$ e $3$ l'accelerazione è positiva ma il punto va ancora all'indietro, sempre più piano.

La stessa idea funziona fuori dalla fisica. Se $P(t)$ è una popolazione, $P'(t)$ dice quanti individui in più ci sono per ogni anno che passa. Se $C(x)$ è il costo per produrre $x$ pezzi, $C'(x)$ è il **costo marginale**: quanto costa, più o meno, un pezzo in più.

>! Velocità e accelerazione possono essere negative: il segno dice il verso rispetto a quello scelto come positivo. Quanto si va veloci lo dice il valore assoluto $|v(t)|$.` }
  ],

  grafici: {
    'tangente-mobile': {
      tipo: 'piano', x: [-4, 4], y: [-1, 5],
      parametri: [{ nome: 'p', min: -3.5, max: 3.5, passo: 0.1, valore: 2, etichetta: 'p' }],
      funzioni: [{ f: 'x^2/4', etichetta: 'y = x²/4', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['p', 'p^2/4'], trascina: true, etichetta: 'P', posizione: 'basso', colore: 2 },
        { tipo: 'tangente', f: 'x^2/4', x0: 'p', colore: 3 },
        { tipo: 'testo', p: [-3.8, 4.5], testo: "f'(p) = {{p/2}}", ancora: 'start' }
      ],
      didascalia: "Trascina P lungo la parabola: la tangente ruota e la sua pendenza f'(p) = p/2 cambia senza salti. Cerca il punto dove la tangente è orizzontale."
    },
    'rapporto-sin': {
      tipo: 'piano', x: [-0.6, 3.4], y: [-1.2, 1.9],
      parametri: [{ nome: 'q', min: -0.5, max: 3.3, passo: 0.03, valore: 2.5, nascosto: true }],
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1 }],
      punti: [{ x: 1, y: 'sin(1)', etichetta: 'P', posizione: 'basso-destra', colore: 1 }],
      elementi: [
        { tipo: 'tangente', f: 'sin(x)', x0: 1, colore: 4, tratteggio: true, etichetta: false },
        { tipo: 'retta', per: [[1, 'sin(1)'], ['q', 'sin(q)']], colore: 2 },
        { tipo: 'punto', p: ['q', 'sin(q)'], trascina: true, etichetta: 'Q', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [0.1, 1.75], testo: 'h = {{q - 1}}     secante: m = {{(sin(q) - sin(1))/(q - 1)}}', ancora: 'start' },
        { tipo: 'testo', p: [0.1, 1.5], testo: 'tangente in P: m = 0,54', ancora: 'start' }
      ],
      didascalia: 'Trascina Q verso P, prima da destra e poi da sinistra. La secante arancio si avvicina alla tangente tratteggiata, e la sua pendenza si avvicina a 0,54: è la derivata di sin x in x = 1.'
    },
    'cuspide-flesso': {
      tipo: 'piano', x: [-2.5, 2.5], y: [-1.6, 2.7],
      parametri: [{ nome: 'p', min: -2.4, max: 2.4, passo: 0.005, valore: 1.8, nascosto: true }],
      funzioni: [
        { f: 'cbrt(x)^2', etichetta: 'y = ∛(x²)', colore: 1 },
        { f: 'cbrt(x)', etichetta: 'y = ∛x', colore: 3 },
        { f: 'cbrt(p)^2 + 2/(3*cbrt(p))*(x - p)', colore: 1, tratteggio: true },
        { f: 'cbrt(p) + 1/(3*cbrt(p)^2)*(x - p)', colore: 3, tratteggio: true }
      ],
      elementi: [
        { tipo: 'punto', p: ['p', 'cbrt(p)^2'], trascina: true, etichetta: 'P', posizione: 'alto-sinistra', colore: 1 },
        { tipo: 'punto', p: ['p', 'cbrt(p)'], trascina: true, etichetta: 'Q', posizione: 'basso-destra', colore: 3 },
        { tipo: 'testo', p: [-2.4, 2.5], testo: 'pendenza in P = {{2/(3*cbrt(p))}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.4, 2.15], testo: 'pendenza in Q = {{1/(3*cbrt(p)^2)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P verso 0 da destra, poi passa dall\'altra parte. Sulla curva blu (cuspide) la pendenza diventa enorme e cambia segno; sulla curva verde (flesso a tangente verticale) diventa enorme ma resta positiva. In 0 nessuna delle due ha una tangente con pendenza finita.'
    },
    moto: {
      tipo: 'piano', x: [-0.3, 4.4], y: [-1, 7.5],
      etichette: { x: 't', y: 's' },
      parametri: [{ nome: 'p', min: 0, max: 4.2, passo: 0.05, valore: 0.4, nascosto: true }],
      funzioni: [{ f: 'x^3 - 6x^2 + 9x', etichetta: 's(t) = t³ − 6t² + 9t', colore: 1, dominio: [0, 4.2] }],
      elementi: [
        { tipo: 'tangente', f: 'x^3 - 6x^2 + 9x', x0: 'p', colore: 2, etichetta: false },
        { tipo: 'punto', p: ['p', 'p^3 - 6p^2 + 9p'], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [0.2, 7], testo: 't = {{p}} s      v = s′(t) = {{3p^2 - 12p + 9}} m/s', ancora: 'start' }
      ],
      didascalia: 'Trascina P lungo il grafico della posizione. La pendenza della tangente è la velocità: positiva mentre il punto avanza, zero in t = 1 e t = 3, negativa quando torna indietro.'
    }
  },

  esempi: [
    { titolo: 'Una derivata calcolata con la definizione (potenza)', problema: R`Calcola $f'(x)$ per $f(x) = x^2$ usando la **definizione** di derivata.`, passi: [
      R`Scrivo il rapporto incrementale: $\dfrac{f(x+h)-f(x)}{h} = \dfrac{(x+h)^2 - x^2}{h}$.`,
      R`Sviluppo il quadrato: $(x+h)^2 = x^2+2xh+h^2$, quindi il numeratore diventa $2xh+h^2$.`,
      R`Metto in evidenza $h$ e semplifico, lecito perché nel rapporto incrementale $h \ne 0$: $\dfrac{h(2x+h)}{h} = 2x+h$.`,
      R`Calcolo il limite per $h \to 0$: il termine $h$ sparisce e resta $2x$.`
    ], risultato: R`$f'(x) = 2x$` },

    { titolo: 'Una derivata calcolata con la definizione (reciproco)', problema: R`Calcola $f'(x)$ per $f(x) = \dfrac{1}{x}$ (con $x \ne 0$) usando la definizione di derivata.`, passi: [
      R`Scrivo il rapporto incrementale: $\dfrac{\frac{1}{x+h}-\frac{1}{x}}{h}$.`,
      R`Riduco il numeratore allo stesso denominatore: $\dfrac{1}{x+h}-\dfrac{1}{x} = \dfrac{x-(x+h)}{x(x+h)} = \dfrac{-h}{x(x+h)}$.`,
      R`Divido per $h$ (lecito perché $h \ne 0$): $\dfrac{-h}{x(x+h)} \cdot \dfrac{1}{h} = \dfrac{-1}{x(x+h)}$.`,
      R`Calcolo il limite per $h \to 0$: $x(x+h) \to x^2$, quindi il rapporto tende a $-\dfrac{1}{x^2}$.`
    ], risultato: R`$f'(x) = -\dfrac{1}{x^2}$, con $x \ne 0$` },

    { titolo: "L'equazione della retta tangente", problema: R`Scrivi l'equazione della retta tangente al grafico di $f(x) = x^3$ nel punto di ascissa $x_0 = 2$.`, passi: [
      R`Calcolo $f(x_0)$: $f(2) = 2^3 = 8$.`,
      R`Calcolo la derivata con la regola della potenza: $f'(x) = 3x^2$, quindi $f'(2) = 3 \cdot 4 = 12$.`,
      R`Uso l'equazione della tangente $y = f(x_0) + f'(x_0)(x-x_0)$: $y = 8 + 12(x-2)$.`,
      R`Svolgo il prodotto e riduco: $y = 8 + 12x - 24 = 12x - 16$.`
    ], risultato: R`$y = 12x - 16$` },

    { titolo: 'Derivata di un prodotto', problema: R`Deriva $f(x) = x^2 \sin x$.`, passi: [
      R`Riconosco un prodotto di due funzioni: $u(x) = x^2$ e $v(x) = \sin x$.`,
      R`Uso la regola del prodotto $(uv)' = u'v + uv'$, con $u' = 2x$ e $v' = \cos x$.`,
      R`Sostituisco: $f'(x) = 2x \sin x + x^2 \cos x$.`
    ], risultato: R`$f'(x) = 2x\sin x + x^2\cos x$` },

    { titolo: 'Derivata di una funzione composta', problema: R`Deriva $f(x) = \sqrt{x^2+1}$.`, passi: [
      R`Riconosco una funzione composta: la funzione esterna è $\sqrt{u}$, quella interna è $u = x^2+1$.`,
      R`Derivata dell'esterna rispetto a $u$: $\dfrac{1}{2\sqrt{u}}$. Derivata dell'interna: $u' = 2x$.`,
      R`Regola della catena: $f'(x) = \dfrac{1}{2\sqrt{x^2+1}} \cdot 2x$.`,
      R`Semplifico il fattore $2$: $f'(x) = \dfrac{x}{\sqrt{x^2+1}}$.`
    ], risultato: R`$f'(x) = \dfrac{x}{\sqrt{x^2+1}}$` },

    { titolo: 'Velocità e accelerazione di un moto', problema: R`Un punto materiale si muove secondo la legge oraria $s(t) = t^3 - 6t^2 + 9t$ (metri, $t$ in secondi, $t \ge 0$). Trova velocità e accelerazione all'istante $t=1$ e interpreta i risultati.`, passi: [
      R`La velocità è la derivata della posizione: $v(t) = s'(t) = 3t^2 - 12t + 9$.`,
      R`Calcolo $v(1) = 3 - 12 + 9 = 0$: all'istante $t=1$ il punto è momentaneamente fermo.`,
      R`L'accelerazione è la derivata della velocità: $a(t) = v'(t) = 6t - 12$.`,
      R`Calcolo $a(1) = 6 - 12 = -6$: l'accelerazione è negativa, quindi la velocità sta diminuendo (subito dopo $t=1$ il punto inizia a muoversi nel verso opposto).`
    ], risultato: R`$v(1) = 0\ \text{m/s}$, $a(1) = -6\ \text{m/s}^2$` }
  ],

  formulario: [
    { nome: 'Definizione di derivata', formula: R`f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}`, nota: R`Vale se il limite esiste ed è finito; si dice allora che $f$ è derivabile in $x_0$.` },
    { nome: 'Retta tangente', formula: R`y = f(x_0) + f'(x_0)(x - x_0)` },
    { nome: 'Derivata di una costante', formula: R`\frac{d}{dx}(c) = 0`, nota: R`Vale per ogni $c \in \mathbb{R}$.` },
    { nome: 'Derivata della potenza', formula: R`(x^n)' = n\,x^{n-1}`, nota: R`Vale per ogni esponente reale $n$, nei punti in cui $x^{n-1}$ ha senso (per $n$ non intero, $x > 0$).` },
    { nome: 'Derivata della radice quadrata', formula: R`(\sqrt{x})' = \frac{1}{2\sqrt{x}}`, nota: R`Richiede $x > 0$.` },
    { nome: 'Derivata del seno', formula: R`(\sin x)' = \cos x` },
    { nome: 'Derivata del coseno', formula: R`(\cos x)' = -\sin x` },
    { nome: R`Derivata dell'esponenziale`, formula: R`(e^x)' = e^x` },
    { nome: 'Derivata del logaritmo naturale', formula: R`(\ln x)' = \frac{1}{x}`, nota: R`Richiede $x > 0$.` },
    { nome: 'Regola della somma', formula: R`(f(x)+g(x))' = f'(x) + g'(x)` },
    { nome: 'Regola del prodotto', formula: R`(f(x)\,g(x))' = f'(x)\,g(x) + f(x)\,g'(x)` },
    { nome: 'Regola del quoziente', formula: R`\left(\frac{f(x)}{g(x)}\right)' = \frac{f'(x)\,g(x) - f(x)\,g'(x)}{[g(x)]^2}`, nota: R`Richiede $g(x) \ne 0$.` },
    { nome: 'Regola della catena', formula: R`[f(g(x))]' = f'(g(x)) \cdot g'(x)`, nota: R`Si deriva la funzione esterna nel punto $g(x)$ e si moltiplica per $g'(x)$.` },
    { nome: 'Differenziale', formula: R`df = f'(x_0)\, dx`, nota: R`Approssima linearmente la variazione di $f$ vicino a $x_0$, per $dx$ piccolo.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'tangente-velocita', tipo: 'concetto', fronte: R`Che cosa hanno in comune il problema della tangente e quello della velocità istantanea?`, retro: R`Entrambi si risolvono calcolando un rapporto (pendenza di una secante, oppure velocità media) su un intervallo che si fa sempre più piccolo, fino al limite.` },
    { id: 'fc-02', sezione: 'tangente-velocita', tipo: 'concetto', fronte: R`Velocità media e velocità istantanea`, retro: R`La velocità media è $\dfrac{s(t_0+h)-s(t_0)}{h}$ su un intervallo; quella istantanea è il limite di questo rapporto per $h \to 0$.` },
    { id: 'fc-03', sezione: 'rapporto-incrementale', tipo: 'definizione', fronte: R`Rapporto incrementale di $f$ in $x_0$`, retro: R`$\dfrac{f(x_0+h)-f(x_0)}{h}$, con $h \ne 0$: è la pendenza della secante per $(x_0; f(x_0))$ e $(x_0+h; f(x_0+h))$.` },
    { id: 'fc-04', sezione: 'rapporto-incrementale', tipo: 'definizione', fronte: R`Derivata di $f$ in $x_0$`, retro: R`$f'(x_0) = \displaystyle\lim_{h \to 0}\dfrac{f(x_0+h)-f(x_0)}{h}$, quando il limite esiste finito.` },
    { id: 'fc-05', sezione: 'rapporto-incrementale', tipo: 'formula', fronte: R`Derivata di $f(x)=x^2$ con la definizione`, retro: R`Il rapporto incrementale è $2x+h$; il limite per $h\to 0$ dà $f'(x)=2x$.` },
    { id: 'fc-06', sezione: 'rapporto-incrementale', tipo: 'formula', fronte: R`Derivata di $f(x)=\dfrac{1}{x}$ con la definizione`, retro: R`Il rapporto incrementale è $-\dfrac{1}{x(x+h)}$; il limite per $h\to 0$ dà $f'(x)=-\dfrac{1}{x^2}$.` },
    { id: 'fc-07', sezione: 'significato-geometrico', tipo: 'concetto', fronte: R`Cosa rappresenta $f'(x_0)$ geometricamente?`, retro: R`Il coefficiente angolare della retta tangente al grafico di $f$ nel punto $(x_0; f(x_0))$.` },
    { id: 'fc-08', sezione: 'significato-geometrico', tipo: 'formula', fronte: R`Equazione della retta tangente in $x_0$`, retro: R`$y = f(x_0)+f'(x_0)(x-x_0)$` },
    { id: 'fc-09', sezione: 'continuita-derivabilita', tipo: 'definizione', fronte: R`Derivata destra e sinistra`, retro: R`Limiti del rapporto incrementale per $h\to 0^+$ e $h\to 0^-$; $f$ è derivabile in $x_0$ se coincidono.` },
    { id: 'fc-10', sezione: 'continuita-derivabilita', tipo: 'concetto', fronte: R`La derivabilità implica la continuità?`, retro: R`Sì: se $f$ è derivabile in $x_0$ allora è continua in $x_0$. Il viceversa è falso.` },
    { id: 'fc-11', sezione: 'continuita-derivabilita', tipo: 'concetto', fronte: R`Un controesempio di funzione continua ma non derivabile`, retro: R`$f(x)=|x|$ in $x_0=0$: è continua, ma le derivate destra e sinistra valgono $1$ e $-1$.` },
    { id: 'fc-12', sezione: 'punti-non-derivabili', tipo: 'definizione', fronte: R`Punto angoloso`, retro: R`Le derivate destra e sinistra esistono, sono finite, ma sono diverse tra loro.` },
    { id: 'fc-13', sezione: 'punti-non-derivabili', tipo: 'definizione', fronte: R`Cuspide`, retro: R`Le derivate destra e sinistra sono infinite e di segno opposto (per esempio $\sqrt[3]{x^2}$ in $x_0=0$).` },
    { id: 'fc-14', sezione: 'punti-non-derivabili', tipo: 'definizione', fronte: R`Flesso a tangente verticale`, retro: R`Le derivate destra e sinistra sono infinite e dello stesso segno (per esempio $\sqrt[3]{x}$ in $x_0=0$): la tangente è verticale.` },
    { id: 'fc-15', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivata di $x^n$`, retro: R`$(x^n)' = n\,x^{n-1}$` },
    { id: 'fc-16', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivate di $\sin x$ e $\cos x$`, retro: R`$(\sin x)' = \cos x$; $(\cos x)' = -\sin x$.` },
    { id: 'fc-17', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivate di $e^x$ e $a^x$`, retro: R`$(e^x)' = e^x$; $(a^x)' = a^x\ln a$.` },
    { id: 'fc-18', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivate di $\ln x$ e $\log_a x$`, retro: R`$(\ln x)' = \dfrac1x$; $(\log_a x)' = \dfrac{1}{x\ln a}$.` },
    { id: 'fc-19', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivata di $\tan x$`, retro: R`$(\tan x)' = \dfrac{1}{\cos^2 x}$` },
    { id: 'fc-20', sezione: 'regole-derivazione', tipo: 'formula', fronte: R`Regola del prodotto`, retro: R`$(fg)' = f'g+fg'$` },
    { id: 'fc-21', sezione: 'regole-derivazione', tipo: 'formula', fronte: R`Regola del quoziente`, retro: R`$\left(\dfrac{f}{g}\right)' = \dfrac{f'g-fg'}{g^2}$, con $g\ne 0$.` },
    { id: 'fc-22', sezione: 'regole-derivazione', tipo: 'procedura', fronte: R`Regola della catena (funzione composta)`, retro: R`$[f(g(x))]' = f'(g(x))\cdot g'(x)$: si deriva l'esterna nel punto interno e si moltiplica per la derivata dell'interna.` },
    { id: 'fc-23', sezione: 'regole-derivazione', tipo: 'concetto', fronte: R`Derivata della funzione inversa`, retro: R`$(f^{-1})'(y_0) = \dfrac{1}{f'(x_0)}$, con $y_0=f(x_0)$ e $f'(x_0)\ne 0$.` },
    { id: 'fc-24', sezione: 'derivate-successive-differenziale', tipo: 'definizione', fronte: R`Derivata seconda`, retro: R`$f''(x)$ è la derivata di $f'(x)$; si indica anche $\dfrac{d^2y}{dx^2}$.` },
    { id: 'fc-25', sezione: 'derivate-successive-differenziale', tipo: 'definizione', fronte: R`Differenziale di $f$ in $x_0$`, retro: R`$df = f'(x_0)\,dx$: l'approssimazione lineare della variazione di $f$ vicino a $x_0$.` },
    { id: 'fc-26', sezione: 'applicazioni', tipo: 'formula', fronte: R`Velocità e accelerazione da $s(t)$`, retro: R`$v(t)=s'(t)$, $a(t)=v'(t)=s''(t)$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola $f'(x)$ per $f(x) = x^3 - 2x$.`, suggerimenti: [R`Deriva termine per termine usando la regola della potenza.`, R`La derivata di $-2x$ è semplicemente $-2$.`], risposta: { tipo: 'testo', accettate: ['3x^2-2', '3x²-2', '3x^2 - 2'] }, soluzione: [R`Deriva $x^3$: $(x^3)' = 3x^2$.`, R`Deriva $-2x$: $(-2x)' = -2$.`, R`Somma i risultati: $f'(x) = 3x^2 - 2$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $f'(x)$ per $f(x) = 5x^4 + 3x^2 - 7$.`, suggerimenti: [R`Applica la regola della potenza a ciascun termine.`, R`La derivata di una costante (qui $-7$) è $0$.`], risposta: { tipo: 'testo', accettate: ['20x^3+6x', '20x³+6x', '20x^3 + 6x'] }, soluzione: [R`$(5x^4)' = 20x^3$.`, R`$(3x^2)' = 6x$.`, R`$(-7)' = 0$.`, R`$f'(x) = 20x^3 + 6x$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Scrivi l'equazione della retta tangente al grafico di $f(x)=x^2$ nel punto di ascissa $x_0=2$.`, suggerimenti: [R`Calcola $f(2)$ e $f'(2)$ separatamente.`, R`Usa $y = f(x_0) + f'(x_0)(x-x_0)$.`], risposta: { tipo: 'testo', accettate: ['y=4x-4', 'y = 4x - 4', 'y = 4x − 4', 'y=4x−4'] }, soluzione: [R`$f(2) = 4$.`, R`$f'(x) = 2x$, quindi $f'(2) = 4$.`, R`$y = 4 + 4(x-2)$.`, R`Semplifico: $y = 4x - 4$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Usando la **definizione** di derivata, calcola $f'(x)$ per $f(x) = 3x^2$.`, suggerimenti: [R`Scrivi il rapporto incrementale $\dfrac{f(x+h)-f(x)}{h}$ con $f(x)=3x^2$.`, R`Sviluppa $(x+h)^2$ e semplifica prima di fare il limite.`], risposta: { tipo: 'testo', accettate: ['6x'] }, soluzione: [R`Rapporto incrementale: $\dfrac{3(x+h)^2 - 3x^2}{h}$.`, R`Sviluppo: $3(x^2+2xh+h^2)-3x^2 = 6xh+3h^2$.`, R`Divido per $h$: $6x+3h$.`, R`Limite per $h \to 0$: $f'(x) = 6x$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Deriva $f(x) = (x^2+1)(x-3)$.`, suggerimenti: [R`Riconosci un prodotto $u \cdot v$ con $u=x^2+1$, $v=x-3$.`, R`Usa $(uv)'=u'v+uv'$.`], risposta: { tipo: 'testo', accettate: ['3x^2-6x+1', '3x²-6x+1'] }, soluzione: [R`$u' = 2x$, $v' = 1$.`, R`$f'(x) = 2x(x-3) + (x^2+1)\cdot 1$.`, R`Sviluppo: $2x^2-6x+x^2+1$.`, R`Sommo i termini simili: $f'(x) = 3x^2-6x+1$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Deriva $f(x) = \dfrac{x}{x^2+1}$.`, suggerimenti: [R`Usa $\left(\dfrac{u}{v}\right)' = \dfrac{u'v-uv'}{v^2}$ con $u=x$ e $v=x^2+1$.`, R`$u'=1$, $v'=2x$.`], risposta: { tipo: 'testo', accettate: ['(1-x^2)/(x^2+1)^2', '(1-x²)/(x²+1)²'] }, soluzione: [R`$u'=1$, $v'=2x$.`, R`Numeratore: $1\cdot(x^2+1) - x\cdot 2x = x^2+1-2x^2 = 1-x^2$.`, R`Denominatore: $(x^2+1)^2$.`, R`$f'(x) = \dfrac{1-x^2}{(x^2+1)^2}$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Deriva $f(x) = (3x-1)^4$.`, suggerimenti: [R`Riconosci la funzione composta: esterna $u^4$, interna $u=3x-1$.`, R`Deriva l'esterna ($4u^3$) e moltiplica per la derivata dell'interna.`], risposta: { tipo: 'testo', accettate: ['12(3x-1)^3', '12(3x-1)³'] }, soluzione: [R`Derivata dell'esterna in $u$: $4u^3$, cioè $4(3x-1)^3$.`, R`Derivata dell'interna: $(3x-1)'=3$.`, R`Regola della catena: $f'(x) = 4(3x-1)^3 \cdot 3 = 12(3x-1)^3$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Stabilisci per quale valore di $x$ la funzione $f(x) = |x-2|$ non è derivabile.`, suggerimenti: [R`Pensa al grafico di $|x-2|$: è una traslazione di $|x|$.`, R`Cerca il punto in cui il grafico ha uno spigolo.`], risposta: { tipo: 'numero', valore: 2 }, soluzione: [R`Il grafico di $f(x)=|x-2|$ è quello di $|x|$ traslato di $2$ verso destra.`, R`Lo spigolo di $|x|$ in $x=0$ si sposta in $x=2$.`, R`In $x=2$ le derivate destra e sinistra valgono $+1$ e $-1$: sono diverse, quindi $f$ non è derivabile in $x=2$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Un punto si muove secondo la legge oraria $s(t)=t^3-9t^2+24t$ ($t\ge 0$, $s$ in metri, $t$ in secondi). Trova gli istanti in cui la velocità è nulla.`, suggerimenti: [R`Calcola $v(t) = s'(t)$.`, R`Risolvi $v(t)=0$: è un'equazione di secondo grado in $t$.`], risposta: { tipo: 'numeri', valori: [2, 4] }, soluzione: [R`$v(t) = 3t^2 - 18t + 24$.`, R`Pongo $v(t)=0$: $3t^2-18t+24=0$, cioè $t^2-6t+8=0$.`, R`$\dfrac{\Delta}{4} = 9-8=1$, $t = 3 \pm 1$: $t=2$ oppure $t=4$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Per quali valori di $k$ la retta $y = kx$ è tangente alla parabola $y = x^2+1$?`, suggerimenti: [R`Una retta è tangente a una parabola quando il sistema retta-parabola ha una sola soluzione doppia.`, R`Sostituisci $y=kx$ nell'equazione della parabola e imponi $\Delta = 0$.`], risposta: { tipo: 'numeri', valori: [2, -2] }, soluzione: [R`Sostituendo: $x^2+1 = kx$, cioè $x^2-kx+1=0$.`, R`Condizione di tangenza: $\Delta = k^2 - 4 = 0$.`, R`$k = 2$ oppure $k = -2$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Determina $a$ e $b$ affinché la funzione $f(x) = \begin{cases} x^2 & x\le 1 \\ ax+b & x>1\end{cases}$ sia derivabile in $x=1$.`, suggerimenti: [R`Prima imponi la continuità in $x=1$: i due pezzi devono dare lo stesso valore.`, R`Poi imponi che le derivate destra e sinistra in $x=1$ coincidano.`], soluzione: [R`Continuità in $x=1$: $1^2 = a\cdot 1+b$, cioè $a+b=1$.`, R`Derivata a sinistra di $x^2$ in $x=1$: $2\cdot 1 = 2$. Derivata a destra di $ax+b$: $a$.`, R`Uguagliando: $a=2$.`, R`Dalla continuità: $b = 1-a = -1$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Cos'è il rapporto incrementale di $f$ in $x_0$?`, opzioni: [R`$\dfrac{f(x_0+h)-f(x_0)}{h}$`, R`$\dfrac{f(x_0+h)-f(x_0)}{x_0}$`, R`$\dfrac{f(x_0)+h}{h}$`, R`$\dfrac{f(h)-f(x_0)}{h-x_0}$`], corretta: 0, spiegazione: R`È il rapporto fra la variazione della funzione, $f(x_0+h)-f(x_0)$, e la variazione della variabile, $h$: rappresenta la pendenza della secante fra i due punti.` },
    { id: 'q-02', domanda: R`La derivata $f'(x_0)$ è definita come…`, opzioni: [R`il rapporto incrementale calcolato ponendo $h=0$`, R`il limite del rapporto incrementale per $h \to 0$`, R`la pendenza di una secante qualunque`, R`il valore di $f$ in $x_0$`], corretta: 1, spiegazione: R`Ponendo $h=0$ nel rapporto incrementale si otterrebbe una divisione per zero: serve il limite. Una secante qualunque ha, in generale, una pendenza diversa da quella della tangente.` },
    { id: 'q-03', domanda: R`Se $f$ è derivabile in $x_0$, allora $f$ è sicuramente…`, opzioni: [R`crescente in $x_0$`, R`pari`, R`continua in $x_0$`, R`invertibile`], corretta: 2, spiegazione: R`Derivabilità implica continuità. Non implica invece che $f$ sia crescente, pari o invertibile: sono proprietà indipendenti.` },
    { id: 'q-04', domanda: R`Una funzione continua in un punto è sempre derivabile in quel punto?`, opzioni: [R`Sì, sempre`, R`Sì, se è un polinomio`, R`No, nessuna funzione continua è derivabile`, R`No: per esempio $f(x)=|x|$ in $x_0=0$ è continua ma non derivabile`], corretta: 3, spiegazione: R`La continuità non implica la derivabilità: $|x|$ è l'esempio classico. Un polinomio, in particolare, è sempre derivabile ovunque, ma questa non è la regola generale.` },
    { id: 'q-05', domanda: R`In un punto angoloso, le derivate destra e sinistra sono…`, opzioni: [R`infinite e di segno opposto`, R`finite ma diverse tra loro`, R`finite e uguali`, R`infinite e dello stesso segno`], corretta: 1, spiegazione: R`Nel punto angoloso i due limiti esistono e sono finiti, ma diversi: il grafico ha uno spigolo con due direzioni distinte.` },
    { id: 'q-06', domanda: R`In una cuspide le derivate destra e sinistra sono…`, opzioni: [R`finite e uguali`, R`finite e diverse`, R`infinite e dello stesso segno`, R`infinite e di segno opposto`], corretta: 3, spiegazione: R`Nella cuspide entrambe le derivate divergono, ma con segni opposti (una a $+\infty$, l'altra a $-\infty$): il grafico forma una "punta".` },
    { id: 'q-07', domanda: R`In un flesso a tangente verticale, le derivate destra e sinistra sono…`, opzioni: [R`infinite e dello stesso segno`, R`infinite e di segno opposto`, R`finite e diverse`, R`entrambe nulle`], corretta: 0, spiegazione: R`In questo caso le due derivate divergono con lo stesso segno: la tangente è verticale, ma il grafico attraversa il punto senza formare una punta.` },
    { id: 'q-08', domanda: R`Qual è la derivata di $f(x)=\sqrt{x}$?`, opzioni: [R`$\dfrac{1}{\sqrt{x}}$`, R`$2\sqrt{x}$`, R`$\dfrac{1}{2\sqrt{x}}$`, R`$\dfrac{\sqrt{x}}{2}$`], corretta: 2, spiegazione: R`Scrivendo $\sqrt{x}=x^{1/2}$ e applicando $(x^n)'=n\,x^{n-1}$ si ottiene $\dfrac12 x^{-1/2} = \dfrac{1}{2\sqrt{x}}$.` },
    { id: 'q-09', domanda: R`Qual è la derivata di $f(x)=a^x$ (con $a>0$, $a\ne 1$)?`, opzioni: [R`$x\,a^{x-1}$`, R`$a^x$`, R`$\dfrac{a^x}{\ln a}$`, R`$a^x \ln a$`], corretta: 3, spiegazione: R`Qui la variabile è all'esponente, non alla base: la regola della potenza non si applica. Compare invece il fattore $\ln a$; con $a=e$ si ritrova $(e^x)'=e^x$, perché $\ln e = 1$.` },
    { id: 'q-10', domanda: R`La regola del prodotto dice che $(fg)'$ è uguale a…`, opzioni: [R`$f'g+fg'$`, R`$f'g'$`, R`$f'g-fg'$`, R`$\dfrac{f'g-fg'}{g^2}$`], corretta: 0, spiegazione: R`$(fg)'=f'g+fg'$. $f'g'$ è l'errore tipico di trattare il prodotto come la somma; $f'g - fg'$ ha un segno sbagliato; $\dfrac{f'g-fg'}{g^2}$ è la regola del quoziente.` },
    { id: 'q-11', domanda: R`La regola della catena per $f(g(x))$ dà come derivata…`, opzioni: [R`$f'(x)\cdot g'(x)$`, R`$f'(g(x)) \cdot g'(x)$`, R`$f'(g(x))$`, R`$f(g'(x))$`], corretta: 1, spiegazione: R`Bisogna derivare la funzione esterna $f$ nel punto interno $g(x)$, e moltiplicare per la derivata dell'interna $g'(x)$: dimenticare quest'ultimo fattore è l'errore più comune.` },
    { id: 'q-12', domanda: R`La derivata seconda $f''(x)$ è…`, opzioni: [R`il quadrato di $f'(x)$`, R`la derivata di $f(x^2)$`, R`la derivata di $f'(x)$`, R`sempre uguale a $f(x)$`], corretta: 2, spiegazione: R`$f''(x)$ si ottiene derivando $f'(x)$ una seconda volta; non ha nulla a che vedere con $(f'(x))^2$ né con $f(x^2)$.` },
    { id: 'q-13', domanda: R`Il differenziale $df$ in $x_0$ è…`, opzioni: [R`$f'(x_0)$`, R`$f(x_0+dx)-f(x_0)$ esatto`, R`$f'(x_0)\,dx$`, R`$\dfrac{dx}{f'(x_0)}$`], corretta: 2, spiegazione: R`$df=f'(x_0)\,dx$ è l'approssimazione lineare della variazione reale $f(x_0+dx)-f(x_0)$, tanto migliore quanto più $dx$ è piccolo.` },
    { id: 'q-14', domanda: R`Se $v(t)=s'(t)$ è negativa in un istante, il corpo…`, opzioni: [R`si muove nel verso opposto a quello scelto come positivo`, R`è fermo`, R`sta accelerando`, R`ha velocità nulla`], corretta: 0, spiegazione: R`Il segno della velocità dice il verso del moto rispetto a quello scelto come positivo. Con $v \ne 0$ il corpo non è fermo; se stia accelerando o frenando non lo dice $v$ da sola, ma il confronto fra i segni di $v(t)$ e $a(t)$.` },
    { id: 'q-15', domanda: R`Se $f'(x) > 0$ in un intervallo, la funzione $f$ in quell'intervallo…`, opzioni: [R`è costante`, R`è decrescente`, R`ha un massimo assoluto`, R`è crescente`], corretta: 3, spiegazione: R`Una derivata positiva significa che il grafico sta salendo: la funzione è crescente in quell'intervallo.` },
    { id: 'q-16', domanda: R`L'accelerazione $a(t)$ è…`, opzioni: [R`la derivata prima della posizione`, R`la derivata seconda della posizione`, R`l'integrale della velocità`, R`uguale alla velocità media`], corretta: 1, spiegazione: R`$a(t)=v'(t)=s''(t)$: l'accelerazione è la derivata della velocità, cioè la derivata seconda della posizione.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Il rapporto incrementale calcolato per un $h$ fissato non è la derivata: è solo un'approssimazione. La derivata è il valore-limite per $h \to 0$.` },
    { tipo: 'errore', testo: R`Nella regola del quoziente l'ordine conta: $\left(\dfrac{f}{g}\right)' = \dfrac{f'g-fg'}{g^2}$, non $\dfrac{fg'-f'g}{g^2}$.` },
    { tipo: 'errore', testo: R`Nella regola della catena non basta derivare la funzione esterna: va sempre moltiplicata per la derivata della funzione interna. $[\sin(3x)]' = 3\cos(3x)$, non $\cos(3x)$.` },
    { tipo: 'metodo', testo: R`Per stabilire se una funzione "sospetta" (valore assoluto, radice, funzione a tratti) è derivabile in un punto, calcola separatamente la derivata destra e quella sinistra e confrontale.` },
    { tipo: 'errore', testo: R`$|x|$ è continua ovunque ma non è derivabile in $x=0$: la continuità non implica la derivabilità, anche se il viceversa è sempre vero.` },
    { tipo: 'trucco', testo: R`Il segno di $f'(x)$ si studia come quello di una qualunque espressione algebrica (tabella dei segni): non serve disegnare $f$ per sapere dove cresce o decresce.` },
    { tipo: 'metodo', testo: R`Per la retta tangente calcola sempre due numeri, in quest'ordine: $f(x_0)$ e $f'(x_0)$; poi sostituisci in $y = f(x_0)+f'(x_0)(x-x_0)$ e solo alla fine semplifica.` },
    { tipo: 'errore', testo: R`La derivata di $a^x$ ha un fattore $\ln a$ che sparisce spesso per distrazione: $(a^x)' = a^x \ln a$, non $a^x$ soltanto (che vale solo per $a=e$).` },
    { tipo: 'errore', testo: R`Velocità e accelerazione possono essere negative: il segno indica il verso rispetto a quello scelto come positivo. Una velocità negativa vuol dire che il corpo va all'indietro, non che va piano.` }
  ],

  aneddoti: [
    { matematico: R`Pierre de Fermat`, anni: R`1601–1665`, titolo: R`Il metodo dei massimi e dei minimi, prima del calcolo`, testo: R`Trent'anni prima che Newton e Leibniz sistemassero il calcolo infinitesimale, l'avvocato e matematico dilettante Pierre de Fermat aveva già in mano un pezzo importante del problema. In un manoscritto del 1636, il *Methodus ad disquirendam maximam et minimam*, descrisse una tecnica per trovare i punti di massimo e minimo di una curva: si confronta $f(x)$ con $f(x+e)$ per un incremento $e$ molto piccolo, si sviluppano i calcoli, si dividono i termini per $e$ e infine si pone $e$ uguale a zero. È, alla lettera, il calcolo di un rapporto incrementale seguito da un passaggio al limite, fatto quasi mezzo secolo prima che esistesse un linguaggio per giustificarlo con rigore. Fermat non parlava di "derivata" né di "limite": trattava $e$ come una quantità che, alla fine, si annulla senza troppe spiegazioni.`, legame: R`Il metodo di Fermat è, in sostanza, il rapporto incrementale di questo argomento applicato a un problema specifico: trovare dove la tangente è orizzontale.` },
    { matematico: R`Isaac Newton e Gottfried Wilhelm Leibniz`, anni: R`1642–1727 e 1646–1716`, titolo: R`Due invenzioni indipendenti, una disputa furiosa`, testo: R`Tra il 1665 e il 1675, a distanza e senza saperlo, Newton in Inghilterra e Leibniz in Germania inventarono lo stesso strumento matematico partendo da problemi diversi: Newton pensava alla velocità ("flussioni", con la notazione $\dot x$, un punto sopra la lettera), Leibniz pensava al rapporto fra incrementi infinitesimi ("differenziali", con la notazione $\dfrac{dy}{dx}$ che usiamo ancora oggi). Quando Leibniz pubblicò per primo, nel 1684, scoppiò una disputa sulla priorità che durò decenni e avvelenò i rapporti tra la matematica inglese e quella continentale. La Royal Society nominò una commissione per stabilire chi avesse ragione: il suo presidente, guarda caso, era Newton, che ne scrisse anche in parte il rapporto finale senza firmarlo. Il verdetto, prevedibilmente, fu a suo favore. Oggi si riconosce che entrambi arrivarono al risultato in modo indipendente; la notazione di Leibniz, più flessibile, è quella che si usa nei libri di analisi.`, legame: R`La derivata $f'(x_0)$ di questo argomento è la stessa idea di Newton e Leibniz: solo la notazione ($\dot x$ oppure $\dfrac{dy}{dx}$) tradisce da quale dei due viene.` },
    { matematico: R`Guillaume de L'Hôpital e Johann Bernoulli`, anni: R`1661–1704 e 1667–1748`, titolo: R`Il primo libro di analisi, comprato per abbonamento`, testo: R`Nel 1696 il marchese Guillaume de L'Hôpital pubblicò *Analyse des infiniment petits*, il primo manuale a stampa di calcolo differenziale: conteneva, sistemate in un ordine chiaro, le regole di derivazione (somma, prodotto, quoziente, funzione composta) che ancora oggi si insegnano quasi allo stesso modo. Quello che i lettori dell'epoca non sapevano è che L'Hôpital, nobile facoltoso ma matematico modesto, pagava uno stipendio regolare al giovane e brillantissimo Johann Bernoulli in cambio delle sue scoperte, che poi pubblicava a proprio nome: un accordo scritto, ritrovato molto più tardi, lo dimostra senza ambiguità. Anche la regola per calcolare limiti di forme indeterminate che porta ancora il nome di "de L'Hôpital" era, quasi certamente, farina del sacco di Bernoulli.`, legame: R`Le regole di derivazione (somma, prodotto, quoziente, catena) di questo argomento sono, storicamente, il contenuto di quel libro: il primo a raccoglierle tutte insieme per gli studenti.` },
    { matematico: R`Joseph-Louis Lagrange`, anni: R`1736–1813`, titolo: R`La notazione f', nata per fare a meno degli infinitesimi`, testo: R`Alla fine del Settecento gli infinitesimi di Leibniz (quantità "più piccole di ogni numero ma non nulle") mettevano a disagio molti matematici: non si capiva bene cosa fossero. Lagrange, nella sua *Théorie des fonctions analytiques* del 1797, tentò di fondare il calcolo senza infinitesimi né limiti, usando gli sviluppi in serie di potenze; il tentativo non reggerà del tutto (il rigore arriverà solo con Cauchy e Weierstrass nell'Ottocento), ma da quel libro resta un'eredità che si usa ancora ogni giorno: la notazione $f'(x)$, $f''(x)$, $f'''(x)$ per le derivate successive, più compatta sia della notazione a punto di Newton sia delle frazioni $\dfrac{dy}{dx}$ di Leibniz.`, legame: R`La notazione $f'(x)$ usata in tutto questo argomento è quella di Lagrange; conta il fatto che siano rimaste in uso, fianco a fianco, tre notazioni diverse per la stessa idea.` }
  ]
});
})();
