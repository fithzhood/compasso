(function () {
const R = String.raw;
/* risposte degli esercizi di base */
const num = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'es. 7/13 oppure √5/3' });
const dec = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'due decimali, es. 0,42' });
COMPASSO.registra({
  id: 'formule-goniometriche',
  titolo: 'Formule goniometriche',

  introduzione: R`Conosci $\sin30°$ e $\sin45°$. Quanto vale $\sin75°$? Verrebbe da sommare, ma $\sin30° + \sin45° \approx 1{,}21$. È più di $1$, quindi non può essere un seno.

Le **formule goniometriche** dicono come si calcola davvero. Quasi tutte vengono da una formula sola, il coseno di una differenza. Se capisci come si ricavano, puoi ricostruirle quando le dimentichi.

Servono a calcolare valori esatti, a semplificare espressioni e a risolvere le equazioni goniometriche. Prima ripassa gli angoli notevoli, gli angoli associati e la relazione $\sin^2\alpha + \cos^2\alpha = 1$.`,

  inBreve: [
    R`$\sin(\alpha+\beta) \ne \sin\alpha + \sin\beta$. Si usa la formula: $\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$.`,
    R`Nel coseno il segno in mezzo va al contrario: $\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$.`,
    R`Con $\beta = \alpha$ le formule di addizione danno la duplicazione: $\sin2\alpha = 2\sin\alpha\cos\alpha$.`,
    R`Nella bisezione il segno si decide con il quadrante di $\frac{\alpha}{2}$, non di $\alpha$.`,
    R`$a\sin x + b\cos x$ è una sinusoide di ampiezza $\sqrt{a^2+b^2}$: il massimo è questo, non $a+b$.`,
    R`Un'identità si verifica trasformando un membro solo, fino a ottenere l'altro.`
  ],

  sezioni: [
    { id: 'addizione-sottrazione', titolo: 'Le formule di addizione e sottrazione', testo: R`Le formule di **addizione** danno seno, coseno e tangente di una somma di angoli. Quelle di **sottrazione** fanno lo stesso con una differenza.

[[video:formule-goniometriche/addizione]]

>* **Addizione e sottrazione:** $$\begin{array}{rl}\sin(\alpha\pm\beta) &= \sin\alpha\cos\beta \\ &\quad {}\pm \cos\alpha\sin\beta\end{array}$$ $$\begin{array}{rl}\cos(\alpha\pm\beta) &= \cos\alpha\cos\beta \\ &\quad {}\mp \sin\alpha\sin\beta\end{array}$$ $$\tan(\alpha\pm\beta) = \frac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}$$ Il simbolo $\mp$ vuol dire «il segno opposto»: nel coseno, con la somma c'è il meno.

Esempio: calcola $\sin75°$.

~ \sin75° = \sin(\evid{45° + 30°}) :: scrivo $75°$ come somma di due angoli notevoli
~ = \sin45°\cos30° + \cos45°\sin30° :: formula di addizione del seno
~ = \dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2} + \dfrac{\sqrt2}{2}\cdot\dfrac12 :: metto i valori degli angoli notevoli
~ = \evidb{\dfrac{\sqrt6+\sqrt2}{4}} \approx 0{,}966 :: moltiplico e sommo le frazioni

?? Quanto vale $\cos(\alpha - \beta)$?
[x] $\cos\alpha\cos\beta + \sin\alpha\sin\beta$
[ ] $\cos\alpha\cos\beta - \sin\alpha\sin\beta$
[ ] $\cos\alpha - \cos\beta$
=> Nel coseno il segno in mezzo è opposto a quello fra gli angoli: con la differenza c'è il più. La formula con il meno è quella della somma. $\cos\alpha - \cos\beta$ è sbagliata: con $\alpha = \beta$ darebbe $0$, ma $\cos 0 = 1$.

### Da dove vengono

Tutto parte dal coseno di una differenza. Prendi sulla circonferenza goniometrica i punti $A = (\cos\alpha,\ \sin\alpha)$ e $B = (\cos\beta,\ \sin\beta)$. Calcola la loro distanza in due modi.

~ \begin{array}{rl} AB^2 &= (\cos\alpha - \cos\beta)^2 \\ &\quad {}+ (\sin\alpha - \sin\beta)^2 \end{array} :: distanza fra due punti, al quadrato
~ \begin{array}{rl} AB^2 &= \evid{(\cos^2\alpha + \sin^2\alpha)} \\ &\quad {}+ \evid{(\cos^2\beta + \sin^2\beta)} \\ &\quad {}- 2\cos\alpha\cos\beta \\ &\quad {}- 2\sin\alpha\sin\beta \end{array} :: sviluppo i quadrati e riordino i termini
~ = 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta) :: ogni parentesi di quadrati vale $1$
~ AB^2 = \evid{2 - 2\cos(\alpha - \beta)} :: ruoto la figura finché $B$ va in $(1,\ 0)$: $A$ va nel punto dell'angolo $\alpha - \beta$ e la distanza non cambia; rifaccio lo stesso conto
~ \cos(\alpha - \beta) = \evidb{\cos\alpha\cos\beta + \sin\alpha\sin\beta} :: confronto le due espressioni di $AB^2$

Il coseno della somma viene cambiando $\beta$ in $-\beta$, perché $\cos(-\beta) = \cos\beta$ e $\sin(-\beta) = -\sin\beta$. Per il seno si passa dagli angoli complementari:

~ \sin(\alpha+\beta) = \cos\big(90° - (\alpha+\beta)\big) :: il seno di un angolo è il coseno del suo complementare
~ = \cos\big(\evid{(90° - \alpha) - \beta}\big) :: riscrivo l'angolo come una differenza
~ \begin{array}{rl} &= \cos(90°-\alpha)\cos\beta \\ &\quad {}+ \sin(90°-\alpha)\sin\beta \end{array} :: coseno di una differenza
~ = \evidb{\sin\alpha\cos\beta + \cos\alpha\sin\beta} :: di nuovo i complementari: $\cos(90°-\alpha) = \sin\alpha$ e viceversa

La tangente viene dividendo $\sin(\alpha+\beta)$ per $\cos(\alpha+\beta)$. Poi dividi sopra e sotto per $\cos\alpha\cos\beta$.

>! Nel coseno il segno si **inverte**: addizione con il meno, sottrazione con il più. Nella tangente non dimenticare l'$1$ al denominatore.` },

    { id: 'angolo-tra-rette', titolo: "L'angolo fra due rette", testo: R`Due rette si incrociano: che angolo formano? Una retta non verticale forma con l'asse $x$ un angolo $\theta$, con $\tan\theta = m$. L'angolo fra due rette è la differenza fra i loro due angoli. Quindi serve la tangente di una differenza:

~ \theta = \theta_2 - \theta_1 :: l'angolo fra le rette è la differenza degli angoli con l'asse $x$
~ \tan\theta = \dfrac{\tan\theta_2 - \tan\theta_1}{1 + \tan\theta_1\tan\theta_2} :: tangente di una differenza
~ \tan\theta = \evidb{\dfrac{m_2 - m_1}{1 + m_1 m_2}} :: al posto delle tangenti metto i coefficienti angolari

>* **Angolo fra due rette:** $$\tan\theta = \left|\frac{m_2-m_1}{1+m_1m_2}\right|$$ Il valore assoluto serve a prendere l'angolo acuto fra le due rette.

Esempio: $r: y = 2x + 1$ e $s: y = -\dfrac13 x + 4$, quindi $m_1 = 2$ e $m_2 = -\dfrac13$. $$\tan\theta = \left|\frac{-\frac13-2}{1+2\cdot\left(-\frac13\right)}\right| = \left|\frac{-\frac73}{\frac13}\right| = 7$$ Quindi $\theta = \arctan 7 \approx 81{,}9°$.

[[grafico:angoloRette]]

Nel grafico hai trovato due casi speciali.
- Se $m_1 = m_2$ il numeratore vale zero: le rette sono **parallele**.
- Se $m_1 m_2 = -1$ il denominatore vale zero: l'angolo è di $90°$, le rette sono **perpendicolari**.

?? Che angolo formano le rette $y = 2x$ e $y = -\dfrac12 x + 3$?
[x] $90°$
[ ] non si può calcolare: il denominatore vale zero
[ ] $0°$
=> $m_1 m_2 = 2\cdot\left(-\frac12\right) = -1$: il denominatore si annulla e la tangente di $\theta$ non esiste. L'angolo però c'è: fra $0°$ e $90°$ l'unico senza tangente è $90°$. $0°$ è il caso delle rette parallele.

>! Il valore assoluto si prende sul risultato, non sui coefficienti angolari. Nell'esempio devi sostituire proprio $m_2 = -\frac13$. Con $+\frac13$ verrebbe $45°$, che è sbagliato.` },

    { id: 'duplicazione', titolo: 'Le formule di duplicazione', testo: R`Se raddoppi l'angolo, il seno raddoppia? No: $\sin 30° = \frac12$, ma $\sin 60° = \frac{\sqrt3}{2}$, che non è $1$. La formula giusta viene dall'addizione con due angoli uguali, $\beta = \alpha$:

~ \sin2\alpha = \sin(\evid{\alpha + \alpha}) :: l'angolo doppio è una somma
~ = \sin\alpha\cos\alpha + \cos\alpha\sin\alpha :: formula di addizione del seno
~ = \evidb{2\sin\alpha\cos\alpha} :: i due termini sono uguali

[[video:formule-goniometriche/duplicazione]]

Lo stesso vale per il coseno, che poi riscrivi in tre forme grazie a $\sin^2\alpha + \cos^2\alpha = 1$:

~ \cos2\alpha = \cos\alpha\cos\alpha - \sin\alpha\sin\alpha :: formula di addizione del coseno con $\beta = \alpha$
~ \cos2\alpha = \evidb{\cos^2\alpha - \sin^2\alpha} :: prima forma
~ \cos2\alpha = \cos^2\alpha - (\evid{1 - \cos^2\alpha}) :: al posto di $\sin^2\alpha$ metto $1 - \cos^2\alpha$
~ \cos2\alpha = \evidb{2\cos^2\alpha - 1} :: seconda forma
~ \cos2\alpha = (\evid{1 - \sin^2\alpha}) - \sin^2\alpha :: dalla prima forma, al posto di $\cos^2\alpha$ metto $1 - \sin^2\alpha$
~ \cos2\alpha = \evidb{1 - 2\sin^2\alpha} :: terza forma

>* **Duplicazione:** $$\sin2\alpha = 2\sin\alpha\cos\alpha$$ $$\begin{array}{rl}\cos2\alpha &= \cos^2\alpha-\sin^2\alpha \\ &= 2\cos^2\alpha-1 \\ &= 1-2\sin^2\alpha\end{array}$$ $$\tan2\alpha = \frac{2\tan\alpha}{1-\tan^2\alpha}$$ Delle tre forme di $\cos2\alpha$ scegli quella che usa il dato che hai.

Esempio: $\sin\alpha = \dfrac35$ con $\alpha$ acuto. Allora $\cos\alpha = \dfrac45$ (primo quadrante), e $$\sin2\alpha = 2\cdot\frac35\cdot\frac45 = \frac{24}{25}$$ $$\cos2\alpha = 1 - 2\cdot\frac{9}{25} = \frac{7}{25}$$ $$\tan2\alpha = \frac{24/25}{7/25} = \frac{24}{7}$$

?? Se $\sin\alpha = 0{,}6$ e $\alpha$ è acuto, quanto vale $\sin2\alpha$?
[x] $0{,}96$
[ ] $1{,}2$
[ ] $0{,}48$
=> $\cos\alpha = 0{,}8$, quindi $\sin2\alpha = 2\cdot 0{,}6\cdot 0{,}8 = 0{,}96$. $1{,}2$ è $2\sin\alpha$: supera $1$, quindi non può essere un seno. $0{,}48$ è il prodotto senza il $2$.

>! $\sin2\alpha \ne 2\sin\alpha$ e $\cos2\alpha \ne 2\cos\alpha$: il $2$ sta dentro, sull'angolo, e non si può portare fuori.` },

    { id: 'bisezione', titolo: 'Le formule di bisezione', testo: R`Le formule di **bisezione** fanno il viaggio al contrario della duplicazione. Dal coseno di un angolo danno seno e coseno della sua metà. Si ricavano dalla duplicazione del coseno:

~ \cos2x = 1 - 2\sin^2 x :: una delle tre forme della duplicazione
~ 2\sin^2 x = 1 - \cos2x :: isolo il termine con il seno
~ \sin^2 x = \dfrac{1 - \cos2x}{2} :: divido per $2$
~ \sin^2\dfrac{\alpha}{2} = \dfrac{1 - \cos\alpha}{\evid{2}} :: chiamo $\alpha$ l'angolo doppio: $x = \frac{\alpha}{2}$ e $2x = \alpha$
~ \sin\dfrac{\alpha}{2} = \evidb{\pm\sqrt{\dfrac{1-\cos\alpha}{2}}} :: estraggo la radice, con i due segni

Da $\cos2x = 2\cos^2 x - 1$ viene allo stesso modo la formula del coseno.

>* **Bisezione:** $$\sin\frac{\alpha}{2} = \pm\sqrt{\frac{1-\cos\alpha}{2}}$$ $$\cos\frac{\alpha}{2} = \pm\sqrt{\frac{1+\cos\alpha}{2}}$$ Il segno si sceglie guardando in quale quadrante cade $\dfrac{\alpha}{2}$.

Per la tangente c'è una formula con la radice. Ci sono anche due forme senza radice, che hanno già il segno giusto:

$$\tan\frac{\alpha}{2} = \pm\sqrt{\frac{1-\cos\alpha}{1+\cos\alpha}}$$ $$\tan\frac{\alpha}{2} = \frac{\sin\alpha}{1+\cos\alpha} = \frac{1-\cos\alpha}{\sin\alpha}$$

Esempio: $\cos22{,}5°$, cioè $\cos\dfrac{45°}{2}$, con $\cos45° = \dfrac{\sqrt2}{2}$. $$\begin{array}{rl}\cos22{,}5° &= \displaystyle\sqrt{\frac{1+\frac{\sqrt2}{2}}{2}} = \sqrt{\frac{2+\sqrt2}{4}} \\ &= \displaystyle\frac{\sqrt{2+\sqrt2}}{2}\end{array}$$ Il segno è più perché $22{,}5°$ sta nel primo quadrante.

?? Se $\alpha = 300°$, quanto vale $\sin\dfrac{\alpha}{2}$?
[x] $\dfrac12$
[ ] $-\dfrac12$
[ ] $\dfrac{\sqrt3}{2}$
=> $\sqrt{\frac{1-\cos300°}{2}} = \sqrt{\frac{1-\frac12}{2}} = \frac12$. Per il segno conta $\frac{\alpha}{2} = 150°$, nel secondo quadrante: il seno è positivo. Con $-\frac12$ hai guardato $300°$, ed è l'errore tipico. $\frac{\sqrt3}{2}$ viene dalla formula del coseno, con $1 + \cos\alpha$.

>! Il segno si decide guardando $\dfrac{\alpha}{2}$, non $\alpha$. E va deciso ogni volta, non messo positivo per abitudine.` },

    { id: 'parametriche', titolo: 'Le formule parametriche', testo: R`In $\sin x + \cos x = 1$ ci sono due funzioni diverse della stessa incognita. Le **formule parametriche** scrivono seno e coseno con un solo numero, $t = \tan\dfrac{\alpha}{2}$. Così l'equazione diventa algebrica in $t$.

Ecco la formula del seno:

~ \sin\alpha = 2\sin\dfrac{\alpha}{2}\cos\dfrac{\alpha}{2} :: duplicazione, con $\frac{\alpha}{2}$ come angolo di partenza
~ = \dfrac{2\sin\frac{\alpha}{2}\cos\frac{\alpha}{2}}{\evid{\sin^2\frac{\alpha}{2} + \cos^2\frac{\alpha}{2}}} :: divido per $1$, scritto con la relazione fondamentale
~ = \dfrac{2\tan\frac{\alpha}{2}}{\tan^2\frac{\alpha}{2} + 1} :: divido sopra e sotto per $\cos^2\frac{\alpha}{2}$
~ = \evidb{\dfrac{2t}{1 + t^2}} :: chiamo $t$ la tangente di $\frac{\alpha}{2}$

La formula del coseno si ottiene allo stesso modo, da $\cos\alpha = \cos^2\frac{\alpha}{2} - \sin^2\frac{\alpha}{2}$.

>* **Formule parametriche**, con $t = \tan\dfrac{\alpha}{2}$: $$\sin\alpha = \frac{2t}{1+t^2} \qquad \cos\alpha = \frac{1-t^2}{1+t^2}$$ $$\tan\alpha = \frac{2t}{1-t^2}$$

Esempio: se $t = \dfrac12$, allora $\sin\alpha = \dfrac{1}{1+\frac14} = \dfrac45$ e $\cos\alpha = \dfrac{1-\frac14}{1+\frac14} = \dfrac35$.

Le formule valgono solo se $t$ esiste. Quindi $\frac{\alpha}{2}$ non può essere $90°$ più mezzi giri, cioè $\alpha \ne 180° + k\cdot360°$.

?? Per quale angolo le formule parametriche **non** si possono usare?
[x] $\alpha = 180°$
[ ] $\alpha = 90°$
[ ] $\alpha = 0°$
=> Con $\alpha = 180°$ l'angolo metà è $90°$, e $\tan 90°$ non esiste. Con $\alpha = 90°$ hai $t = \tan 45° = 1$, che va bene: infatti $\sin 90° = \frac{2}{1+1} = 1$. Con $\alpha = 0°$ hai $t = 0$, nessun problema.

>! Con le parametriche gli angoli $180° + k\cdot360°$ spariscono dal conto. Prima di cominciare, controlla a parte se sono soluzioni.` },

    { id: 'prostaferesi-werner', titolo: 'Prostaferesi e formule di Werner', testo: R`Le formule di **Werner** trasformano un prodotto di seni e coseni in una somma. Quelle di **prostaferesi** trasformano una somma in un prodotto. Nascono sommando le formule di addizione e di sottrazione:

~ \sin(\alpha+\beta) = \sin\alpha\cos\beta + \evid{\cos\alpha\sin\beta} :: formula di addizione
~ \sin(\alpha-\beta) = \sin\alpha\cos\beta - \evid{\cos\alpha\sin\beta} :: formula di sottrazione
~ \begin{array}{rl} &\sin(\alpha+\beta) + \sin(\alpha-\beta) \\ &\quad {}= 2\sin\alpha\cos\beta \end{array} :: sommo membro a membro: i termini evidenziati si cancellano
~ \begin{array}{rl} &\sin\alpha\cos\beta \\ &{}= \evidb{\tfrac12\big[\sin(\alpha+\beta) + \sin(\alpha-\beta)\big]} \end{array} :: divido per $2$ e scambio i membri: il prodotto è diventato una somma

Ora leggi la stessa uguaglianza da destra a sinistra. Chiama $p = \alpha + \beta$ e $q = \alpha - \beta$, quindi $\alpha = \frac{p+q}{2}$ e $\beta = \frac{p-q}{2}$. La somma $\sin p + \sin q$ diventa un prodotto: è una formula di prostaferesi.

>* **Werner** trasforma un prodotto in una somma, la **prostaferesi** una somma in un prodotto. Sono le stesse uguaglianze lette nei due versi.

Le formule di Werner:

$$\sin\alpha\cos\beta = \tfrac12\big[\sin(\alpha+\beta)+\sin(\alpha-\beta)\big]$$

$$\cos\alpha\cos\beta = \tfrac12\big[\cos(\alpha-\beta)+\cos(\alpha+\beta)\big]$$

$$\sin\alpha\sin\beta = \tfrac12\big[\cos(\alpha-\beta)-\cos(\alpha+\beta)\big]$$

Le due formule di prostaferesi più usate:

$$\sin p+\sin q = 2\sin\frac{p+q}{2}\cos\frac{p-q}{2}$$

$$\cos p+\cos q = 2\cos\frac{p+q}{2}\cos\frac{p-q}{2}$$

Esempio: $\sin75° + \sin15°$. Con la prostaferesi diventa $2\sin45°\cos30° = 2\cdot\dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2} = \dfrac{\sqrt6}{2}$.

Werner con $\alpha = \beta = x$ dà $\cos^2 x = \dfrac{1+\cos2x}{2}$. Così un quadrato diventa un termine di primo grado.

?? Vuoi scrivere $2\cos3x\cos x$ come somma. Quale formula ti serve?
[x] Werner
[ ] prostaferesi
[ ] duplicazione
=> Hai un **prodotto** e vuoi una somma: serve Werner. Viene $2\cos3x\cos x = \cos2x + \cos4x$. La prostaferesi parte invece da una somma. La duplicazione servirebbe con due angoli uguali.

>! Werner e prostaferesi si confondono perché una è l'inversa dell'altra. Guarda che cosa hai all'inizio: un **prodotto** vuole Werner, una **somma** vuole la prostaferesi.` },

    { id: 'angolo-aggiunto', titolo: "Il metodo dell'angolo aggiunto", testo: R`Qual è il valore massimo di $y = 3\sin x + 4\cos x$? Verrebbe $3 + 4 = 7$, ma seno e coseno non arrivano a $1$ insieme: quando uno è al massimo, l'altro vale zero. Guardalo nel grafico.

[[grafico:angoloAggiunto]]

La curva è ancora un'onda, solo più alta e spostata. Succede sempre: $a\sin x + b\cos x$ si scrive come un'unica sinusoide $r\sin(x + \varphi)$. Per trovare $r$ sviluppi la sinusoide con la formula di addizione e confronti:

~ \begin{array}{rl} r\sin(x+\varphi) &= r\sin x\cos\varphi \\ &\quad {}+ r\cos x\sin\varphi \end{array} :: formula di addizione del seno
~ = (\evid{r\cos\varphi})\sin x + (\evid{r\sin\varphi})\cos x :: raccolgo $\sin x$ e $\cos x$
~ r\cos\varphi = a \qquad r\sin\varphi = b :: perché sia uguale ad $a\sin x + b\cos x$
~ r^2\cos^2\varphi + r^2\sin^2\varphi = a^2 + b^2 :: elevo al quadrato e sommo
~ r = \evidb{\sqrt{a^2 + b^2}} :: la parte con $\varphi$ vale $r^2 \cdot 1$

>* **Angolo aggiunto:** $$a\sin x + b\cos x = r\sin(x+\varphi)$$ con $r = \sqrt{a^2+b^2}$, $\cos\varphi = \dfrac{a}{r}$ e $\sin\varphi = \dfrac{b}{r}$. Il massimo della somma è $r$, il minimo $-r$.

Con $3\sin x + 4\cos x$ hai $r = \sqrt{9+16} = 5$. L'angolo $\varphi$ ha coseno $\frac35$ e seno $\frac45$, quindi $\varphi \approx 53{,}1°$. Allora $3\sin x + 4\cos x = 5\sin(x + 53{,}1°)$, e il massimo è $5$.

?? Qual è il valore massimo di $5\sin x + 12\cos x$?
[x] $13$
[ ] $17$
[ ] $12$
=> $r = \sqrt{25 + 144} = \sqrt{169} = 13$. $17 = 5 + 12$ vorrebbe seno e coseno uguali a $1$ insieme, cosa impossibile. $12$ è troppo poco: la somma arriva più in alto del coefficiente più grande.

>! Se $a > 0$ puoi calcolare $\varphi = \arctan\dfrac{b}{a}$. Se $a < 0$ la calcolatrice dà un angolo del quadrante sbagliato: aggiungi $180°$.` },

    { id: 'valori-esatti', titolo: 'Calcolare valori esatti con le formule', testo: R`Con le formule calcoli il valore esatto di molti angoli, non solo di $30°$, $45°$ e $60°$. Scrivi l'angolo come somma, differenza o metà di angoli che conosci:

| angolo | come lo scrivi | formule |
|---|---|---|
| $15°$ | $45° - 30°$ | sottrazione |
| $75°$ | $45° + 30°$ | addizione |
| $22{,}5°$ | $\frac{45°}{2}$ | bisezione |
| $105°$ | $60° + 45°$, oppure $\frac{210°}{2}$ | addizione o bisezione |

Esempio: $\tan15°$.

~ \tan15° = \tan(\evid{45° - 30°}) :: $15°$ come differenza di angoli notevoli
~ = \dfrac{\tan45° - \tan30°}{1 + \tan45°\tan30°} = \dfrac{1 - \frac{\sqrt3}{3}}{1 + \frac{\sqrt3}{3}} :: tangente di una differenza: nel denominatore il segno è più
~ = \dfrac{3 - \sqrt3}{3 + \sqrt3} :: moltiplico sopra e sotto per $3$
~ = \dfrac{(3 - \sqrt3)^2}{9 - 3} = \dfrac{12 - 6\sqrt3}{6} :: razionalizzo moltiplicando sopra e sotto per $3 - \sqrt3$
~ = \evidb{2 - \sqrt3} :: divido per $6$

Controlla con la calcolatrice: $2 - \sqrt3 \approx 0{,}268$, e anche $\tan15° \approx 0{,}268$. Con i radicali questo controllo scopre quasi tutti gli errori.

?? Quanto vale $\cos75°$?
[x] $\dfrac{\sqrt6 - \sqrt2}{4}$
[ ] $\dfrac{\sqrt6 + \sqrt2}{4}$
[ ] $\dfrac{\sqrt3 + \sqrt2}{2}$
=> $\cos(45° + 30°) = \cos45°\cos30° - \sin45°\sin30° = \frac{\sqrt6}{4} - \frac{\sqrt2}{4}$. Con il più ottieni $\cos15°$: è l'errore del segno nel coseno. $\frac{\sqrt3 + \sqrt2}{2}$ è $\cos30° + \cos45°$, e supera $1$.

>! Lo stesso valore può avere forme diverse: $\dfrac{\sqrt6 - \sqrt2}{4}$ e $\dfrac{\sqrt2(\sqrt3 - 1)}{4}$ sono lo stesso numero. Se la tua risposta sembra diversa da quella del libro, confrontale con la calcolatrice.` },

    { id: 'identita-semplificazione', titolo: 'Identità goniometriche e semplificazione', testo: R`Un'**identità goniometrica** è un'uguaglianza vera per **tutti** gli angoli in cui ha senso, mentre un'equazione è vera solo per alcuni.

Per verificare un'identità prendi un membro, di solito il più complicato. Poi trasformalo con le formule finché diventa uguale all'altro.

Esempio: verifica che $\dfrac{\sin2x}{1+\cos2x} = \tan x$, dove i due membri esistono.

~ \dfrac{\sin2x}{1+\cos2x} :: parto dal primo membro, il più complicato
~ = \dfrac{\evid{2\sin x\cos x}}{1 + \evid{2\cos^2 x - 1}} :: duplicazione: per $\cos2x$ scelgo la forma con $2\cos^2 x - 1$, così l'$1$ si cancella
~ = \dfrac{2\sin x\cos x}{2\cos^2 x} :: $1 - 1 = 0$
~ = \dfrac{\sin x}{\cos x} = \evidb{\tan x} :: semplifico $2\cos x$: è il secondo membro

>* Trasforma **un membro solo** fino a ottenere l'altro. Se lavori sui due membri insieme, come in un'equazione, puoi arrivare a $0 = 0$ senza aver dimostrato niente.

Le stesse formule servono a **semplificare**, cioè a scrivere un'espressione nella forma più corta:

~ \cos^4 x - \sin^4 x :: si semplifica così
~ = (\cos^2 x - \sin^2 x)(\evid{\cos^2 x + \sin^2 x}) :: è una differenza di quadrati
~ = (\cos^2 x - \sin^2 x)\cdot\evid{1} :: relazione fondamentale
~ = \evidb{\cos2x} :: duplicazione del coseno

?? A che cosa è uguale $\sin^2 x - \cos^2 x$?
[x] $-\cos2x$
[ ] $\cos2x$
[ ] $1$
=> $\cos2x = \cos^2 x - \sin^2 x$. Qui l'ordine è rovesciato, quindi il risultato è $-\cos2x$. $1$ è $\sin^2 x + \cos^2 x$, con il più.

>! Prima di dire che un'identità è falsa, provala con un numero, per esempio $x = 30°$. Se i due membri vengono diversi, è falsa di sicuro. Se vengono uguali, prova a dimostrarla.` }
  ],

  grafici: {
    angoloRette: {
      tipo: 'piano', x: [-4, 4], y: [-4, 4],
      parametri: [
        { nome: 'm1', min: -3, max: 3, passo: 0.1, valore: 2, etichetta: 'm₁' },
        { nome: 'm2', min: -3, max: 3, passo: 0.1, valore: -0.3, etichetta: 'm₂' }
      ],
      elementi: [
        { tipo: 'retta', m: 'm1', q: 0, etichetta: 'r', colore: 2 },
        { tipo: 'retta', m: 'm2', q: 0, etichetta: 's', colore: 3 },
        { tipo: 'testo', p: [-3.8, 3.6], testo: 'm₁ · m₂ = {{m1*m2}}', ancora: 'start' },
        { tipo: 'testo', p: [-3.8, 3.1], testo: 'θ = {{atan(abs((m2-m1)/(1+m1*m2)))*180/pi}}°', ancora: 'start' }
      ],
      didascalia: 'Lascia m₁ = 2 e muovi m₂ finché le rette non diventano perpendicolari (θ = 90°): quanto vale m₁ · m₂? Riprova con un altro m₁. Poi cerca quando θ = 0°.'
    },
    angoloAggiunto: {
      tipo: 'piano', x: [-6.3, 6.3], y: [-7.5, 8], passo: [1, 1],
      parametri: [
        { nome: 'a', min: 0, max: 4, passo: 0.1, valore: 3, etichetta: 'a' },
        { nome: 'b', min: 0, max: 4, passo: 0.1, valore: 4, etichetta: 'b' }
      ],
      funzioni: [
        { f: 'a*sin(x) + b*cos(x)', etichetta: 'y = a sin x + b cos x', colore: 1 }
      ],
      elementi: [
        { tipo: 'orizzontale', y: 'sqrt(a^2+b^2)', etichetta: 'r', tratteggio: true, colore: 3 },
        { tipo: 'orizzontale', y: '-sqrt(a^2+b^2)', etichetta: '−r', tratteggio: true, colore: 3 },
        { tipo: 'orizzontale', y: 'a+b', etichetta: 'a + b', tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [-6.1, -6.2], testo: 'a + b = {{a+b}}', ancora: 'start' },
        { tipo: 'testo', p: [-6.1, -7.1], testo: 'r = √(a² + b²) = {{sqrt(a^2+b^2)}}', ancora: 'start' }
      ],
      didascalia: 'Muovi a e b. Le creste della curva toccano sempre la retta verde-acqua y = r = √(a² + b²), e non superano mai quella arancio y = a + b. Quando le due rette coincidono?'
    }
  },

  esempi: [
    { titolo: 'Un valore esatto con la formula di sottrazione', problema: R`Calcola il valore esatto di $\cos15°$.`, passi: [
      R`$15°=45°-30°$: uso la formula di sottrazione del coseno, $\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta$.`,
      R`Sostituisco $\alpha=45°$, $\beta=30°$: $\cos15° = \cos45°\cos30°+\sin45°\sin30° = \dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2}+\dfrac{\sqrt2}{2}\cdot\dfrac12$.`,
      R`Sommo le frazioni: $\cos15° = \dfrac{\sqrt6}{4}+\dfrac{\sqrt2}{4} = \dfrac{\sqrt6+\sqrt2}{4}$.`,
      R`Controllo numerico: $\dfrac{\sqrt6+\sqrt2}{4}\approx\dfrac{2{,}449+1{,}414}{4}\approx0{,}966$, e infatti $\cos15°\approx0{,}966$. ✓`
    ], risultato: R`$\cos15° = \dfrac{\sqrt6+\sqrt2}{4} \approx 0{,}966$` },

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
      R`Controllo: se $\alpha$ è fra $90°$ e $180°$, allora $2\alpha$ è fra $180°$ e $360°$, dove il seno è negativo: coerente con $\sin2\alpha<0$.`
    ], risultato: R`$\sin2\alpha=-\dfrac{4\sqrt2}{9}, \quad \cos2\alpha=-\dfrac{7}{9}$` },

    { titolo: 'Bisezione con scelta del segno', problema: R`Calcola $\sin15°$ con le formule di bisezione, sapendo che $15°=\dfrac{30°}{2}$.`, passi: [
      R`Uso $\sin\dfrac\alpha2=\pm\sqrt{\dfrac{1-\cos\alpha}{2}}$ con $\alpha=30°$, dove $\cos30°=\dfrac{\sqrt3}{2}$.`,
      R`$\sin15° = \sqrt{\dfrac{1-\frac{\sqrt3}{2}}{2}} = \sqrt{\dfrac{2-\sqrt3}{4}} = \dfrac{\sqrt{2-\sqrt3}}{2}$.`,
      R`Il segno è positivo perché $15°$ è un angolo del primo quadrante.`,
      R`Controllo numerico: $\sqrt{2-\sqrt3}\approx\sqrt{0{,}268}\approx0{,}518$, quindi $\sin15°\approx0{,}259$: coincide con $\dfrac{\sqrt6-\sqrt2}{4}\approx0{,}259$, lo stesso valore scritto in un altro modo.`
    ], risultato: R`$\sin15° = \dfrac{\sqrt{2-\sqrt3}}{2} \approx 0{,}259$` },

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
    { nome: 'Duplicazione del coseno', formula: R`\begin{array}{rl} \cos2\alpha &= \cos^2\alpha-\sin^2\alpha \\ &= 2\cos^2\alpha-1 \\ &= 1-2\sin^2\alpha \end{array}`, nota: R`Tre forme equivalenti: si sceglie quella comoda a seconda del dato disponibile.` },
    { nome: 'Duplicazione della tangente', formula: R`\tan2\alpha = \frac{2\tan\alpha}{1-\tan^2\alpha}`, nota: R`Serve che $\tan\alpha$ esista ($\alpha\ne90°+k\cdot180°$) e che $\tan\alpha\ne\pm1$, cioè $\alpha\ne45°+k\cdot90°$.` },
    { nome: 'Bisezione del seno', formula: R`\sin\frac{\alpha}{2} = \pm\sqrt{\frac{1-\cos\alpha}{2}}`, nota: R`Il segno si sceglie guardando in quale quadrante cade $\dfrac\alpha2$.` },
    { nome: 'Bisezione del coseno', formula: R`\cos\frac{\alpha}{2} = \pm\sqrt{\frac{1+\cos\alpha}{2}}`, nota: R`Il segno si sceglie guardando in quale quadrante cade $\dfrac\alpha2$.` },
    { nome: 'Bisezione della tangente', formula: R`\begin{array}{rl} \tan\dfrac{\alpha}{2} &= \pm\sqrt{\dfrac{1-\cos\alpha}{1+\cos\alpha}} \\[1.2em] &= \dfrac{\sin\alpha}{1+\cos\alpha} = \dfrac{1-\cos\alpha}{\sin\alpha} \end{array}`, nota: R`Le ultime due forme hanno già il segno corretto incorporato.` },
    { nome: 'Formule parametriche', formula: R`\begin{array}{c} \sin\alpha = \dfrac{2t}{1+t^2} \qquad \cos\alpha = \dfrac{1-t^2}{1+t^2} \\[1.2em] \tan\alpha = \dfrac{2t}{1-t^2} \end{array}`, nota: R`Con $t=\tan\dfrac\alpha2$. Non valgono per $\alpha=180°+k\cdot360°$.` },
    { nome: 'Prostaferesi (somma di seni)', formula: R`\sin p+\sin q = 2\sin\frac{p+q}{2}\cos\frac{p-q}{2}`, nota: R`Trasforma una somma in un prodotto; esistono formule analoghe per $\sin p-\sin q$, $\cos p+\cos q$, $\cos p-\cos q$.` },
    { nome: 'Werner (prodotto seno-coseno)', formula: R`\sin\alpha\cos\beta = \frac12\left[\sin(\alpha+\beta)+\sin(\alpha-\beta)\right]`, nota: R`Trasforma un prodotto in una somma; esistono formule analoghe per $\cos\alpha\cos\beta$ e $\sin\alpha\sin\beta$.` },
    { nome: 'Angolo aggiunto', formula: R`\begin{array}{c} a\sin x+b\cos x = r\sin(x+\varphi) \\ r=\sqrt{a^2+b^2} \end{array}`, nota: R`$\varphi$ soddisfa $\cos\varphi=\dfrac{a}{r}$ e $\sin\varphi=\dfrac{b}{r}$; se $a>0$, $\varphi=\arctan\dfrac{b}{a}$.` }
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
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Sai che $\sin\alpha = \dfrac35$ e $\cos\alpha = \dfrac45$. Calcola $\sin2\alpha$.`, suggerimenti: [R`$\sin2\alpha = 2\sin\alpha\cos\alpha$.`], risposta: num(24 / 25), soluzione: [R`Duplicazione del seno: $\sin2\alpha = 2\sin\alpha\cos\alpha$.`, R`$2 \cdot \dfrac35 \cdot \dfrac45 = \dfrac{24}{25}$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $\sin(30° + 60°)$ con la formula di addizione.`, suggerimenti: [R`$\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$.`], risposta: num(1), soluzione: [R`$\sin(30°+60°) = \sin30°\cos60° + \cos30°\sin60°$.`, R`$= \dfrac12 \cdot \dfrac12 + \dfrac{\sqrt3}{2} \cdot \dfrac{\sqrt3}{2} = \dfrac14 + \dfrac34 = 1$.`, R`Torna: $30° + 60° = 90°$, e $\sin90° = 1$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $\cos(60° - 30°)$ con la formula di sottrazione. Scrivi la forma esatta (per esempio «√5/3») oppure il decimale con due cifre.`, suggerimenti: [R`$\cos(\alpha-\beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta$: con la differenza, in mezzo c'è il più.`], risposta: num(Math.sqrt(3) / 2), soluzione: [R`$\cos(60°-30°) = \cos60°\cos30° + \sin60°\sin30°$.`, R`$= \dfrac12 \cdot \dfrac{\sqrt3}{2} + \dfrac{\sqrt3}{2} \cdot \dfrac12 = \dfrac{\sqrt3}{4} + \dfrac{\sqrt3}{4} = \dfrac{\sqrt3}{2}$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Sai che $\cos\alpha = \dfrac35$. Calcola $\cos2\alpha$.`, suggerimenti: [R`Usa la forma che contiene solo il coseno: $\cos2\alpha = 2\cos^2\alpha - 1$.`], risposta: num(-7 / 25), soluzione: [R`$\cos2\alpha = 2\cos^2\alpha - 1 = 2 \cdot \dfrac{9}{25} - 1$.`, R`$= \dfrac{18}{25} - \dfrac{25}{25} = -\dfrac{7}{25}$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Qual è il valore massimo di $6\sin x + 8\cos x$?`, suggerimenti: [R`Metodo dell'angolo aggiunto: il massimo di $a\sin x + b\cos x$ è $r = \sqrt{a^2 + b^2}$.`], risposta: num(10), soluzione: [R`Qui $a = 6$ e $b = 8$: $r = \sqrt{36 + 64} = \sqrt{100} = 10$.`, R`Il massimo è $10$, non $6 + 8 = 14$: seno e coseno non valgono $1$ insieme.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola $\cos(30° + 60°)$ con la formula di addizione.`, suggerimenti: [R`$\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$: con la somma, in mezzo c'è il meno.`], risposta: num(0), soluzione: [R`$\cos(30°+60°) = \cos30°\cos60° - \sin30°\sin60°$.`, R`$= \dfrac{\sqrt3}{2} \cdot \dfrac12 - \dfrac12 \cdot \dfrac{\sqrt3}{2} = 0$.`, R`Torna: $\cos90° = 0$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola $\sin(60° - 30°)$ con la formula di sottrazione.`, suggerimenti: [R`$\sin(\alpha-\beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta$.`], risposta: num(0.5), soluzione: [R`$\sin(60°-30°) = \sin60°\cos30° - \cos60°\sin30°$.`, R`$= \dfrac{\sqrt3}{2} \cdot \dfrac{\sqrt3}{2} - \dfrac12 \cdot \dfrac12 = \dfrac34 - \dfrac14 = \dfrac12$.`, R`Torna: $\sin30° = \dfrac12$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Sai che $\sin\alpha = \dfrac13$. Calcola $\cos2\alpha$.`, suggerimenti: [R`Usa la forma che contiene solo il seno: $\cos2\alpha = 1 - 2\sin^2\alpha$.`], risposta: num(7 / 9), soluzione: [R`$\cos2\alpha = 1 - 2\sin^2\alpha = 1 - 2 \cdot \dfrac19$.`, R`$= \dfrac99 - \dfrac29 = \dfrac79$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Sai che $\tan\alpha = \dfrac12$ e $\tan\beta = \dfrac13$. Calcola $\tan(\alpha + \beta)$.`, suggerimenti: [R`$\tan(\alpha+\beta) = \dfrac{\tan\alpha + \tan\beta}{1 - \tan\alpha\tan\beta}$.`], risposta: num(1), soluzione: [R`Numeratore: $\dfrac12 + \dfrac13 = \dfrac56$.`, R`Denominatore: $1 - \dfrac12 \cdot \dfrac13 = 1 - \dfrac16 = \dfrac56$.`, R`$\tan(\alpha+\beta) = \dfrac56 : \dfrac56 = 1$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Sai che $\tan\alpha = \dfrac12$. Calcola $\tan2\alpha$.`, suggerimenti: [R`$\tan2\alpha = \dfrac{2\tan\alpha}{1 - \tan^2\alpha}$.`], risposta: num(4 / 3), soluzione: [R`Numeratore: $2 \cdot \dfrac12 = 1$. Denominatore: $1 - \dfrac14 = \dfrac34$.`, R`$\tan2\alpha = 1 : \dfrac34 = \dfrac43$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Sai che $\sin\alpha = \dfrac35$ e che $\alpha$ è nel secondo quadrante. Calcola $\cos\alpha$.`, suggerimenti: [R`$\cos^2\alpha = 1 - \sin^2\alpha$.`, R`Nel secondo quadrante il coseno è negativo.`], risposta: num(-4 / 5), soluzione: [R`$\cos^2\alpha = 1 - \dfrac{9}{25} = \dfrac{16}{25}$, quindi $\cos\alpha = \pm\dfrac45$.`, R`Nel secondo quadrante il coseno è negativo: $\cos\alpha = -\dfrac45$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Le rette $y = 2x$ e $y = 3x$ formano un angolo acuto $\theta$. Calcola $\tan\theta$.`, suggerimenti: [R`$\tan\theta = \left|\dfrac{m_2 - m_1}{1 + m_1 m_2}\right|$, con $m_1 = 2$ e $m_2 = 3$.`], risposta: num(1 / 7), soluzione: [R`Numeratore: $m_2 - m_1 = 3 - 2 = 1$. Denominatore: $1 + m_1 m_2 = 1 + 6 = 7$.`, R`$\tan\theta = \dfrac17$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Sai che $\tan\alpha = 3$ e $\tan\beta = 1$. Calcola $\tan(\alpha - \beta)$.`, suggerimenti: [R`$\tan(\alpha-\beta) = \dfrac{\tan\alpha - \tan\beta}{1 + \tan\alpha\tan\beta}$: con la differenza, sotto c'è il più.`], risposta: num(0.5), soluzione: [R`Numeratore: $3 - 1 = 2$. Denominatore: $1 + 3 \cdot 1 = 4$.`, R`$\tan(\alpha-\beta) = \dfrac24 = \dfrac12$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Sai che $\sin\alpha = -\dfrac45$ e che $\alpha$ è nel terzo quadrante. Calcola $\cos\alpha$.`, suggerimenti: [R`Il quadrato di $-\dfrac45$ è positivo.`, R`Nel terzo quadrante anche il coseno è negativo.`], risposta: num(-3 / 5), soluzione: [R`$\cos^2\alpha = 1 - \left(-\dfrac45\right)^2 = 1 - \dfrac{16}{25} = \dfrac{9}{25}$.`, R`Quindi $\cos\alpha = \pm\dfrac35$.`, R`Nel terzo quadrante il coseno è negativo: $\cos\alpha = -\dfrac35$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Qual è il valore massimo di $\sin x + \sqrt3\cos x$?`, suggerimenti: [R`Il massimo di $a\sin x + b\cos x$ è $r = \sqrt{a^2 + b^2}$.`, R`Qui $a = 1$ e $b = \sqrt3$, quindi $b^2 = 3$.`], risposta: num(2), soluzione: [R`Qui $a = 1$ e $b = \sqrt3$.`, R`$r = \sqrt{1^2 + (\sqrt3)^2} = \sqrt{1 + 3} = 2$.`, R`Il massimo è $2$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Sai che $\cos\alpha = \dfrac{7}{25}$ e che $\alpha$ è acuto. Calcola $\sin\dfrac{\alpha}{2}$.`, suggerimenti: [R`Bisezione: $\sin\dfrac{\alpha}{2} = \pm\sqrt{\dfrac{1 - \cos\alpha}{2}}$.`, R`Se $\alpha$ è acuto, anche $\dfrac{\alpha}{2}$ è nel primo quadrante.`], risposta: num(3 / 5), soluzione: [R`$\dfrac{1 - \cos\alpha}{2} = \dfrac{1 - \frac{7}{25}}{2} = \dfrac{18}{25} : 2 = \dfrac{9}{25}$.`, R`$\sqrt{\dfrac{9}{25}} = \dfrac35$.`, R`$\dfrac{\alpha}{2}$ è nel primo quadrante, quindi il segno è più: $\sin\dfrac{\alpha}{2} = \dfrac35$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Sai che $\sin\alpha = \dfrac35$ e che $\alpha$ è nel secondo quadrante. Calcola $\sin2\alpha$.`, suggerimenti: [R`Ti serve anche $\cos\alpha$: trovalo con la relazione fondamentale.`, R`Nel secondo quadrante il coseno è negativo.`], risposta: num(-24 / 25), soluzione: [R`$\cos^2\alpha = 1 - \dfrac{9}{25} = \dfrac{16}{25}$. Nel secondo quadrante $\cos\alpha = -\dfrac45$.`, R`$\sin2\alpha = 2\sin\alpha\cos\alpha = 2 \cdot \dfrac35 \cdot \left(-\dfrac45\right)$.`, R`$= -\dfrac{24}{25}$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`$\alpha$ e $\beta$ sono acuti, $\sin\alpha = \dfrac35$ e $\cos\beta = \dfrac{12}{13}$. Calcola $\sin(\alpha + \beta)$.`, suggerimenti: [R`Trova prima $\cos\alpha$ e $\sin\beta$: sono positivi, perché gli angoli sono acuti.`, R`Poi $\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$.`], risposta: num(56 / 65), soluzione: [R`$\cos\alpha = \sqrt{1 - \dfrac{9}{25}} = \dfrac45$ e $\sin\beta = \sqrt{1 - \dfrac{144}{169}} = \dfrac{5}{13}$.`, R`$\sin(\alpha+\beta) = \dfrac35 \cdot \dfrac{12}{13} + \dfrac45 \cdot \dfrac{5}{13}$.`, R`$= \dfrac{36}{65} + \dfrac{20}{65} = \dfrac{56}{65}$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Calcola $\sin75°$ scrivendo $75° = 45° + 30°$. Rispondi con il decimale a due cifre.`, suggerimenti: [R`Formula di addizione del seno, con $\alpha = 45°$ e $\beta = 30°$.`], risposta: dec(0.96593), soluzione: [R`$\sin75° = \sin45°\cos30° + \cos45°\sin30°$.`, R`$= \dfrac{\sqrt2}{2} \cdot \dfrac{\sqrt3}{2} + \dfrac{\sqrt2}{2} \cdot \dfrac12 = \dfrac{\sqrt6 + \sqrt2}{4}$.`, R`$\dfrac{2{,}449 + 1{,}414}{4} \approx 0{,}97$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Calcola $\cos105°$ scrivendo $105° = 60° + 45°$. Rispondi con il decimale a due cifre.`, suggerimenti: [R`$\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$.`, R`$105°$ è nel secondo quadrante: il risultato deve venire negativo.`], risposta: dec(-0.25882), soluzione: [R`$\cos105° = \cos60°\cos45° - \sin60°\sin45°$.`, R`$= \dfrac12 \cdot \dfrac{\sqrt2}{2} - \dfrac{\sqrt3}{2} \cdot \dfrac{\sqrt2}{2} = \dfrac{\sqrt2 - \sqrt6}{4}$.`, R`$\dfrac{1{,}414 - 2{,}449}{4} \approx -0{,}26$: negativo, come deve essere nel secondo quadrante.`] },
    { id: 'es-01', difficolta: 1, testo: R`Calcola il valore di $\sin105°$ usando le formule di addizione (scrivi $105°=60°+45°$).`, suggerimenti: [R`Scrivi $105°$ come somma di due angoli noti.`, R`Applica la formula di addizione del seno.`, R`$\sin60°=\dfrac{\sqrt3}{2}$, $\cos60°=\dfrac12$, $\sin45°=\cos45°=\dfrac{\sqrt2}{2}$.`], risposta: { tipo: 'numero', valore: 0.9659, tolleranza: 0.005 }, soluzione: [R`$105°=60°+45°$.`, R`$\sin105° = \sin60°\cos45°+\cos60°\sin45° = \dfrac{\sqrt3}{2}\cdot\dfrac{\sqrt2}{2}+\dfrac12\cdot\dfrac{\sqrt2}{2}$.`, R`$=\dfrac{\sqrt6}{4}+\dfrac{\sqrt2}{4}=\dfrac{\sqrt6+\sqrt2}{4}\approx0{,}966$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Sapendo che $\cos\alpha=\dfrac45$, calcola $\cos2\alpha$.`, suggerimenti: [R`$\cos2\alpha$ ha tre forme equivalenti: scegli quella che usa solo $\cos\alpha$.`, R`$\cos2\alpha = 2\cos^2\alpha-1$.`], risposta: { tipo: 'numero', valore: 0.28, tolleranza: 0.001 }, soluzione: [R`$\cos\alpha=\dfrac45$, quindi $\cos^2\alpha=\dfrac{16}{25}$.`, R`$\cos2\alpha = 2\cdot\dfrac{16}{25}-1=\dfrac{32}{25}-1=\dfrac{7}{25}=0{,}28$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Calcola $\tan22{,}5°$ con le formule di bisezione, sapendo che $22{,}5°=\dfrac{45°}{2}$.`, suggerimenti: [R`$22{,}5°$ è la metà di un angolo noto.`, R`Usa la forma senza radicali: $\tan\dfrac\alpha2 = \dfrac{\sin\alpha}{1+\cos\alpha}$, con $\alpha=45°$.`, R`$\cos45°=\sin45°=\dfrac{\sqrt2}{2}$.`], risposta: { tipo: 'numero', valore: 0.4142, tolleranza: 0.005 }, soluzione: [R`$22{,}5°=\dfrac{45°}{2}$, con $\cos45°=\sin45°=\dfrac{\sqrt2}{2}$.`, R`$\tan22{,}5° = \dfrac{\sin45°}{1+\cos45°} = \dfrac{\frac{\sqrt2}{2}}{1+\frac{\sqrt2}{2}} = \dfrac{\sqrt2}{2+\sqrt2}$.`, R`Razionalizzando: $\dfrac{\sqrt2(2-\sqrt2)}{(2+\sqrt2)(2-\sqrt2)} = \dfrac{2\sqrt2-2}{2} = \sqrt2-1\approx0{,}414$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Trova l'ampiezza dell'angolo (in gradi) fra le rette $y=3x-2$ e $y=-2x+5$.`, suggerimenti: [R`Il coefficiente angolare di una retta è la tangente dell'angolo che forma con l'asse $x$.`, R`Applica la formula dell'angolo fra due rette con $m_1=3$ e $m_2=-2$.`], risposta: { tipo: 'numero', valore: 45, tolleranza: 0.5 }, soluzione: [R`$m_1=3$, $m_2=-2$.`, R`$\tan\theta = \left|\dfrac{-2-3}{1+3\cdot(-2)}\right| = \left|\dfrac{-5}{-5}\right| = 1$.`, R`$\theta = \arctan1 = 45°$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Sapendo che $\tan\alpha=2$, calcola $\tan2\alpha$.`, suggerimenti: [R`Usa direttamente la formula di duplicazione della tangente.`, R`$\tan2\alpha = \dfrac{2\tan\alpha}{1-\tan^2\alpha}$, con $\tan\alpha=2$.`], risposta: { tipo: 'numero', valore: -1.3333, tolleranza: 0.005 }, soluzione: [R`$\tan2\alpha = \dfrac{2\cdot2}{1-4}$.`, R`$=\dfrac{4}{-3}=-\dfrac43\approx-1{,}333$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Scrivi $y=\sin x+\cos x$ nella forma $r\sin(x+\varphi)$ e trova il valore massimo di $y$.`, suggerimenti: [R`Identifica $a$ e $b$ nella scrittura $a\sin x+b\cos x$.`, R`Calcola $r=\sqrt{a^2+b^2}$: è anche il valore massimo della funzione.`], risposta: { tipo: 'numero', valore: 1.4142, tolleranza: 0.005 }, soluzione: [R`$a=1$, $b=1$: $r=\sqrt{1^2+1^2}=\sqrt2$.`, R`$\varphi=\arctan\dfrac11=45°$, quindi $y=\sqrt2\sin(x+45°)$.`, R`Il massimo è $r=\sqrt2\approx1{,}414$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Semplifica l'espressione $\dfrac{\sin2x}{2\sin x}$ (per $\sin x\ne0$).`, suggerimenti: [R`Scrivi $\sin2x$ con la formula di duplicazione.`, R`Dopo aver sostituito, semplifica il fattore comune $2\sin x$ (lecito perché $\sin x\ne0$).`], risposta: { tipo: 'testo', accettate: ['cosx', 'cos(x)'] }, soluzione: [R`$\sin2x = 2\sin x\cos x$.`, R`$\dfrac{2\sin x\cos x}{2\sin x} = \cos x$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Usa le formule parametriche per calcolare $\sin\alpha$, sapendo che $\tan\dfrac\alpha2=\dfrac13$.`, suggerimenti: [R`Le formule parametriche esprimono $\sin\alpha$ in funzione di $t=\tan\dfrac\alpha2$.`, R`$\sin\alpha = \dfrac{2t}{1+t^2}$: sostituisci $t=\dfrac13$.`], risposta: { tipo: 'numero', valore: 0.6, tolleranza: 0.001 }, soluzione: [R`$t=\tan\dfrac\alpha2=\dfrac13$.`, R`$\sin\alpha = \dfrac{2t}{1+t^2} = \dfrac{2/3}{1+1/9} = \dfrac{2/3}{10/9} = \dfrac23\cdot\dfrac{9}{10}=\dfrac{18}{30}=0{,}6$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Verifica, calcolando entrambi i membri, che $\dfrac{\sin60°}{1+\cos60°}=\tan30°$.`, suggerimenti: [R`Calcola separatamente il primo membro (con $\sin60°$ e $\cos60°$) e il secondo ($\tan30°$).`, R`Se coincidono, la formula di bisezione della tangente è verificata in questo caso.`], risposta: { tipo: 'numero', valore: 0.5774, tolleranza: 0.005 }, soluzione: [R`Primo membro: $\dfrac{\sin60°}{1+\cos60°} = \dfrac{\frac{\sqrt3}{2}}{1+\frac12} = \dfrac{\frac{\sqrt3}{2}}{\frac32} = \dfrac{\sqrt3}{3}$.`, R`Secondo membro: $\tan30° = \dfrac{\sqrt3}{3}$.`, R`I due membri coincidono ($\approx0{,}577$): la formula di bisezione della tangente è verificata in questo caso.`] },
    { id: 'es-10', difficolta: 3, testo: R`Un'onda è descritta da $y=12\sin x+5\cos x$ (in cm). Trova l'ampiezza massima dell'oscillazione.`, suggerimenti: [R`Nella somma $a\sin x+b\cos x$, l'ampiezza massima è $r=\sqrt{a^2+b^2}$.`, R`Qui $a=12$ e $b=5$.`], risposta: { tipo: 'numero', valore: 13, tolleranza: 0.01 }, soluzione: [R`Qui $a=12$ (coefficiente del seno) e $b=5$ (coefficiente del coseno).`, R`$r=\sqrt{a^2+b^2}=\sqrt{144+25}=\sqrt{169}=13$.`, R`L'ampiezza massima dell'oscillazione è $13\ \text{cm}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è la formula corretta di $\cos(\alpha+\beta)$?`, opzioni: [R`$\cos\alpha\cos\beta+\sin\alpha\sin\beta$`, R`$\cos\alpha\cos\beta-\sin\alpha\sin\beta$`, R`$\sin\alpha\cos\beta+\cos\alpha\sin\beta$`, R`$\cos\alpha\sin\beta-\sin\alpha\cos\beta$`], corretta: 1, spiegazione: R`Nell'addizione del coseno il segno centrale è un meno: $\cos\alpha\cos\beta-\sin\alpha\sin\beta$. Con il più si ottiene $\cos(\alpha-\beta)$; $\sin\alpha\cos\beta+\cos\alpha\sin\beta$ è invece $\sin(\alpha+\beta)$.` },
    { id: 'q-02', domanda: R`Perché $\sin(\alpha+\beta)\ne\sin\alpha+\sin\beta$ in generale?`, opzioni: [R`Perché il seno non è una funzione lineare`, R`Perché $\alpha$ e $\beta$ devono essere uguali`, R`Perché la formula vale solo per angoli ottusi`, R`Perché serve sempre la calcolatrice`], corretta: 0, spiegazione: R`Il controesempio $\alpha=\beta=45°$ basta: $\sin90°=1$, mentre $\sin45°+\sin45°=\sqrt2\approx1{,}41$.` },
    { id: 'q-03', domanda: R`Quando due rette di coefficienti angolari $m_1$ e $m_2$ sono perpendicolari?`, opzioni: [R`$m_1=m_2$`, R`$m_1+m_2=0$`, R`$m_1\cdot m_2=-1$`, R`$m_1\cdot m_2=1$`], corretta: 2, spiegazione: R`Con $m_1m_2=-1$ il denominatore $1+m_1m_2$ si annulla e la tangente dell'angolo non è definita: l'angolo è retto.` },
    { id: 'q-04', domanda: R`Quale delle seguenti è una forma corretta di $\cos2\alpha$?`, opzioni: [R`$2\sin\alpha\cos\alpha$`, R`$\sin^2\alpha-\cos^2\alpha$`, R`$\dfrac{2\tan\alpha}{1-\tan^2\alpha}$`, R`$1-2\sin^2\alpha$`], corretta: 3, spiegazione: R`$1-2\sin^2\alpha$ è una delle tre forme corrette. $2\sin\alpha\cos\alpha$ è $\sin2\alpha$, la frazione con le tangenti è $\tan2\alpha$, e $\sin^2\alpha-\cos^2\alpha$ ha i termini in ordine rovesciato: vale $-\cos2\alpha$.` },
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
