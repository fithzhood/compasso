(function () {
const R = String.raw;
/* Vettori nel piano (istituti tecnici AFM/CAT, livello 2; utile anche al liceo). Ogni numero di teoria, esempi,
   esercizi, quiz e flashcard è stato ricalcolato con node (componenti, moduli, angoli, prodotti scalari, proiezioni).
   Gli esempi della teoria sono quelli dei video: u⃗ = (3; 1) e v⃗ = (1; 2) con u⃗ + v⃗ = (4; 3) e |u⃗ + v⃗| = 5
   (video somma); u⃗ = (4; 3) fermo e v⃗ lungo 5 che ruota: (0; 5) → 15, (4; 3) → 25, (−3; 4) → 0, (−5; 0) → −20
   (video prodotto-scalare). Notazione dei video: freccia sopra la lettera, u⃗ · v⃗ = u₁v₁ + u₂v₂, componenti
   come coppie (3; 1) col punto e virgola, regola «testa-coda». Nello spazio (geometria-analitica-spazio) le
   componenti si chiamano u_x, u_y, u_z: la teoria lo dice. */

/* ---- allenamento: risposte ---- */
const SIMB_P = ['(', ')', ';', '−', '/', '√'];
const cop = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. (2; −7)', simboli: SIMB_P });
const num = (v, seg, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.01, segnaposto: seg || 'un numero', simboli: ['−', '/', '√'] });
const gradi = v => ({ tipo: 'numero', valore: v, tolleranza: 0.06, segnaposto: 'in gradi', simboli: ['−', '°'] });
const parola = (lista, seg) => ({ tipo: 'testo', accettate: lista, segnaposto: seg, simboli: [] });
const SI = parola(['sì', 'si', 'sì, sono perpendicolari', 'si, sono perpendicolari', 'sono perpendicolari', 'perpendicolari', 'sì perpendicolari'], 'sì o no');

/* ---- le figure ---- */
/* il vettore che gira: modulo m e angolo t in gradi (polari → cartesiane) */
const VX = 'm*cos(t*pi/180)', VY = 'm*sin(t*pi/180)';
/* l'arco dell'angolo di direzione: il motore disegna l'arco più corto, quindi oltre 180° si spezza in due */
const MEZZO = ['cos(min(t, 179.9)*pi/180)', 'sin(min(t, 179.9)*pi/180)'];
/* video prodotto-scalare: v⃗ lungo 5 con direzione t; il piede dell'ombra su u⃗ = (4; 3) è K·(4; 3) */
const WX = '5*cos(t*pi/180)', WY = '5*sin(t*pi/180)';
const K = '((4*cos(t*pi/180) + 3*sin(t*pi/180))/5)';

COMPASSO.registra({
  id: 'vettori',
  titolo: 'Vettori nel piano',

  introduzione: R`Un aereo vola verso est a $800$ km/h, e un vento laterale lo spinge verso nord. Dove va davvero? Un numero solo non basta: conta anche **dove** punta la velocità. Grandezze così si rappresentano con frecce, i **vettori**.

I vettori servono in fisica per forze, velocità e spostamenti. Chi progetta un tetto o un ponte li usa per sommare i carichi. Compaiono anche nei conti di un negozio: con le quantità e i prezzi, la spesa è un prodotto fra due vettori.

Ti servono il piano cartesiano, il teorema di Pitagora e il seno, il coseno e la tangente di un angolo.`,

  inBreve: [
    R`Un vettore è una freccia: ha un **modulo** (la lunghezza), una **direzione** e un **verso**. Due frecce con le stesse tre cose sono lo stesso vettore, anche se partono da punti diversi.`,
    R`I vettori si sommano con la regola testa-coda o con il parallelogramma. Con le componenti basta sommare i numeri: $(3; 1) + (1; 2) = (4; 3)$.`,
    R`Le componenti di $\vec{AB}$ sono «arrivo meno partenza». Il modulo si trova con Pitagora, la direzione con la tangente, guardando il quadrante.`,
    R`Il prodotto scalare $\vec u \cdot \vec v = |\vec u|\,|\vec v| \cos\theta = u_1 v_1 + u_2 v_2$ è un **numero**. Vale zero se e solo se i due vettori sono perpendicolari.`,
    R`Il lavoro di una forza è il prodotto scalare fra la forza e lo spostamento: conta solo la parte della forza che va nella direzione del moto.`
  ],

  sezioni: [
    { id: 'scalari-vettori', titolo: 'Grandezze scalari e vettori', testo: R`Quanto fa caldo? $25$ gradi. Quanto pesa lo zaino? $6$ chili. A queste domande basta un numero con la sua unità di misura. Sono **grandezze scalari**, come la temperatura, la massa, il tempo, il prezzo.

Ora un'altra domanda. Parti da casa e cammini per $2$ km: dove sei? Il numero non basta. Serve sapere lungo quale strada sei andato, e da che parte. Lo spostamento è una **grandezza vettoriale**, come la velocità e la forza.

>* Un **vettore** è una freccia con tre caratteristiche: il **modulo**, cioè la lunghezza; la **direzione**, cioè la retta su cui sta; il **verso**, cioè da che parte punta.

Una freccia ha una **coda**, il punto da cui parte, e una **testa**, la punta. Se la coda è $A$ e la testa è $B$, il vettore si scrive $\vec{AB}$. Spesso si usa una lettera sola con la freccetta: $\vec u$, $\vec v$. Il modulo si scrive $|\vec u|$.

Direzione e verso sono due cose diverse. Pensa all'autostrada fra Milano e Bologna. Chi va a Bologna e chi torna a Milano hanno la stessa direzione, ma versi opposti.

Nelle figure la freccetta sopra la lettera non si scrive: la freccia disegnata basta.

[[grafico:gFrecce]]

### Vettori uguali e opposti

Due frecce sono lo **stesso vettore** se hanno lo stesso modulo, la stessa direzione e lo stesso verso. Non importa da dove partono: una freccia si può spostare parallelamente a sé stessa.

Il **vettore opposto** di $\vec u$ ha lo stesso modulo e la stessa direzione, ma il verso contrario. Si scrive $-\vec u$. Per esempio $\vec{BA} = -\vec{AB}$: è la stessa freccia, percorsa all'indietro.

Il **vettore nullo** $\vec 0$ ha modulo zero: coda e testa coincidono. Direzione e verso non sono definiti.

?? Due frecce hanno lo stesso modulo e stanno su rette parallele, ma puntano da parti opposte. Che cosa sono?
[ ] Lo stesso vettore.
[x] Due vettori opposti.
[ ] Due vettori con direzioni diverse.
=> Rette parallele vuol dire stessa direzione. Il verso però è contrario, quindi uno è l'opposto dell'altro. Per essere lo stesso vettore dovrebbero puntare dalla stessa parte.

>! Lo stesso modulo non basta per avere lo stesso vettore. Una spinta di $10$ newton verso l'alto e una di $10$ newton verso destra hanno effetti molto diversi.` },

    { id: 'somma-differenza', titolo: 'Somma e differenza', testo: R`Fai $3$ passi a destra e $1$ in su. Poi, da dove sei arrivato, $1$ passo a destra e $2$ in su. Dove sei rispetto alla partenza? La freccia che lo dice è la **somma** dei due spostamenti.

[[video:vettori/somma]]

>* **Regola testa-coda.** Per sommare $\vec u$ e $\vec v$, fai partire $\vec v$ dalla testa di $\vec u$. La somma $\vec u + \vec v$ va dalla coda di $\vec u$ alla testa di $\vec v$. Nei libri di fisica si chiama anche regola punta-coda.

C'è un secondo modo, comodo per le forze. Fai partire $\vec u$ e $\vec v$ dallo stesso punto e completa il **parallelogramma** che hanno per lati. La somma è la **diagonale** che parte dal punto comune.

Le due regole danno la stessa freccia. Nel parallelogramma, il lato opposto a $\vec v$ è proprio $\vec v$ appoggiato sulla testa di $\vec u$.

[[grafico:gSomma]]

Il parallelogramma mostra anche che l'ordine non conta: $\vec u + \vec v = \vec v + \vec u$. Con tre o più vettori si continua la catena: ognuno parte dalla testa del precedente.

>! La lunghezza della somma **non** è la somma delle lunghezze. Qui $\vec u$ è lungo circa $3{,}16$ e $\vec v$ circa $2{,}24$: insieme fanno $5{,}40$. La somma invece è lunga $5$. In generale vale $|\vec u + \vec v| \le |\vec u| + |\vec v|$.

L'uguale vale solo per due frecce con la stessa direzione e lo stesso verso, una in fila all'altra.

### La differenza

Sottrarre un vettore vuol dire sommare il suo opposto:

$$\vec u - \vec v = \vec u + (-\vec v)$$

Si rovescia $\vec v$ e si applica la regola testa-coda. C'è anche una lettura più veloce. Fai partire $\vec u$ e $\vec v$ dallo stesso punto: la differenza $\vec u - \vec v$ va dalla testa di $\vec v$ alla testa di $\vec u$. Infatti $\vec v + (\vec u - \vec v) = \vec u$.

?? $\vec u$ e $\vec v$ partono dallo stesso punto. Dove va la freccia $\vec u - \vec v$?
[x] Dalla testa di $\vec v$ alla testa di $\vec u$.
[ ] Dalla testa di $\vec u$ alla testa di $\vec v$.
[ ] Dal punto comune a metà della diagonale.
=> Deve valere $\vec v + (\vec u - \vec v) = \vec u$: partendo dalla testa di $\vec v$ si arriva alla testa di $\vec u$. La freccia nel verso opposto è $\vec v - \vec u$.` },

    { id: 'prodotto-numero', titolo: 'Il prodotto per un numero', testo: R`Se cammini il doppio nella stessa direzione, lo spostamento raddoppia. Se torni indietro, cambia il verso. È il **prodotto di un vettore per un numero**.

>* Il prodotto del numero $k$ per il vettore $\vec v$ è il vettore $k\,\vec v$. Ha modulo $|k| \cdot |\vec v|$ e la stessa direzione di $\vec v$. Il verso è lo stesso se $k > 0$, opposto se $k < 0$.

Qualche caso:

- $2\vec v$ è lungo il doppio e punta come $\vec v$;
- $\frac{1}{2}\vec v$ è lungo la metà;
- $-3\vec v$ è lungo il triplo e punta all'indietro;
- $0 \cdot \vec v$ è il vettore nullo, e $(-1) \cdot \vec v$ è l'opposto $-\vec v$.

[[grafico:gMultiplo]]

In fisica un numero come $k$ si chiama **scalare**. Per questo si parla anche di prodotto per uno scalare.

?? Quanto è lungo $-3\vec v$, se $|\vec v| = 2$?
[ ] $-6$
[x] $6$
[ ] $2$
=> Il modulo è $|-3| \cdot 2 = 6$. Il segno meno cambia il verso, non rende negativa la lunghezza. Un modulo non è mai negativo.

### Vettori paralleli

Due vettori non nulli sono **paralleli** quando hanno la stessa direzione. Allora uno è un multiplo dell'altro: $\vec w = k\,\vec v$. Una spinta di $10$ newton verso nord e una di $4$ newton verso sud sono parallele. La seconda è $-0{,}4$ volte la prima.

>! Il prodotto per uno scalare dà un **vettore**. Non confonderlo con il prodotto scalare fra due vettori, che dà un **numero**.` },

    { id: 'componenti', titolo: 'Componenti cartesiane e versori', testo: R`Nel piano cartesiano una freccia si descrive con due numeri. Basta dire di quanto ci si sposta in orizzontale e in verticale, dalla coda alla testa.

Per $\vec u$ sono $3$ passi a destra e $1$ in su. Sono le **componenti** di $\vec u$, e si scrive $\vec u = (3; 1)$. Se la coda sta nell'origine, la testa è il punto $(3; 1)$.

>* Le **componenti cartesiane** di un vettore sono gli spostamenti lungo $x$ e lungo $y$: $\vec u = (u_1; u_2)$. Fra due punti si fa «arrivo meno partenza»: $$\vec{AB} = (x_B - x_A; \ y_B - y_A)$$

Con $A(1; 2)$ e $B(4; 3)$ viene $\vec{AB} = (4 - 1; \ 3 - 2) = (3; 1)$. È di nuovo $\vec u$: la freccia sta altrove, ma il vettore è lo stesso. Due vettori sono uguali se e solo se hanno le stesse componenti.

[[grafico:gComponenti]]

### I versori

Un **versore** è un vettore di modulo $1$. I versori degli assi hanno un nome: $\vec i = (1; 0)$ punta lungo l'asse $x$, $\vec j = (0; 1)$ lungo l'asse $y$. Ogni vettore si scrive con questi due:

$$\vec u = (3; 1) = 3\,\vec i + 1\,\vec j$$

### Le operazioni con le componenti

Con le componenti le operazioni diventano conti fra numeri, una coordinata alla volta. Con $\vec u = (3; 1)$ e $\vec v = (1; 2)$:

~ \vec u + \vec v = (3 + 1; \ 1 + 2) = (4; 3) :: si sommano le componenti, quelle di $x$ fra loro e quelle di $y$ fra loro
~ \vec u - \vec v = (3 - 1; \ 1 - 2) = (2; -1) :: si sottraggono, nello stesso ordine
~ 2\vec u = (2 \cdot 3; \ 2 \cdot 1) = (6; 2) :: il numero moltiplica tutte e due le componenti
~ 2\vec u - \vec v = (6 - 1; \ 2 - 2) = \evidb{(5; 0)} :: si mettono insieme i passi

Con le componenti si riconoscono anche i vettori paralleli: le componenti sono proporzionali. Per esempio $(-4; 6) = -2 \cdot (2; -3)$, quindi i due vettori sono paralleli, con versi opposti.

?? Quali sono le componenti di $\vec{AB}$, con $A(2; 5)$ e $B(-1; 1)$?
[x] $(-3; -4)$
[ ] $(3; 4)$
[ ] $(1; 6)$
=> Arrivo meno partenza: $(-1 - 2; \ 1 - 5) = (-3; -4)$. Con l'ordine scambiato si trova $(3; 4)$, cioè l'opposto $\vec{BA}$. $(1; 6)$ viene sommando le coordinate invece di sottrarle.

>! In $\vec{AB}$ si parte dalle coordinate della testa $B$ e si tolgono quelle della coda $A$. Con l'ordine scambiato si trova il vettore opposto.

> Un punto e un vettore si scrivono con la stessa coppia, ma sono cose diverse. $A(3; 1)$ è un posto; $(3; 1)$ è uno spostamento, che può partire da qualunque punto. Nello spazio i vettori hanno tre componenti: le trovi nell'argomento «Geometria analitica nello spazio», scritte $(u_x; u_y; u_z)$.` },

    { id: 'modulo-direzione', titolo: 'Modulo e direzione', testo: R`Dalle componenti si ricavano la lunghezza e la direzione della freccia. Basta guardare il triangolo rettangolo che la freccia forma con le sue componenti.

### Il modulo

Le componenti sono i cateti, la freccia è l'ipotenusa. Per il teorema di Pitagora:

>* **Modulo** di $\vec v = (v_1; v_2)$: $$|\vec v| = \sqrt{v_1^2 + v_2^2}$$

Per $(4; 3)$ viene $\sqrt{16 + 9} = \sqrt{25} = 5$. Per $\vec u = (3; 1)$ viene $\sqrt{10}$, per $\vec v = (1; 2)$ viene $\sqrt{5}$. La loro somma $(4; 3)$ è lunga $5$, non $\sqrt{10} + \sqrt{5} \approx 5{,}40$.

### La direzione

La direzione si dà con l'**angolo** $\alpha$ che il vettore forma con il semiasse positivo delle $x$. Si misura in senso antiorario, da $0^\circ$ a $360^\circ$. Il cateto opposto ad $\alpha$ è $v_2$, quello adiacente è $v_1$:

$$\tan\alpha = \frac{v_2}{v_1}$$

Per $(4; 3)$: $\tan\alpha = 0{,}75$ e $\alpha = \arctan 0{,}75 \approx 36{,}87^\circ$.

>! La calcolatrice dà l'arcotangente solo fra $-90^\circ$ e $90^\circ$. Guarda sempre i segni delle componenti. Se $v_1 < 0$, aggiungi $180^\circ$. Se $v_1 > 0$ e $v_2 < 0$, aggiungi $360^\circ$.

~ \vec v = (-2; 2) :: la testa sta nel secondo quadrante
~ \arctan\frac{2}{-2} = \arctan(-1) = -45^\circ :: la calcolatrice risponde con un angolo del quarto quadrante
~ \alpha = -45^\circ + 180^\circ = \evidb{135^\circ} :: con $v_1 < 0$ si aggiunge mezzo giro

Se $v_1 = 0$ la tangente non esiste: la freccia è verticale. L'angolo è $90^\circ$ se punta in su, $270^\circ$ se punta in giù.

### Dalle polari alle cartesiane

A volte si conoscono il modulo e l'angolo: «una forza di $6$ newton inclinata di $30^\circ$». Per le componenti servono coseno e seno.

>* Con modulo $|\vec v|$ e angolo $\alpha$: $$v_1 = |\vec v| \cos\alpha \qquad v_2 = |\vec v| \sin\alpha$$

Per la forza: $v_1 = 6\cos 30^\circ = 3\sqrt{3} \approx 5{,}20$ e $v_2 = 6\sin 30^\circ = 3$.

[[grafico:gDirezione]]

Modulo e angolo sono le **coordinate polari** della testa, quando la coda sta nell'origine. Le trovi nell'argomento «Funzioni goniometriche», dove il modulo si chiama $r$ e l'angolo $\theta$.

?? Qual è l'angolo di direzione di $(-3; -3)$?
[ ] $45^\circ$
[ ] $135^\circ$
[x] $225^\circ$
=> Le due componenti sono negative: la testa sta nel terzo quadrante. La calcolatrice dà $\arctan 1 = 45^\circ$. Con $v_1 < 0$ si aggiunge $180^\circ$ e viene $225^\circ$.` },

    { id: 'prodotto-scalare', titolo: 'Il prodotto scalare', testo: R`Due vettori si possono moltiplicare fra loro in un modo che dà un **numero**. Il numero dice quanto i due vettori vanno nella stessa direzione.

[[video:vettori/prodotto-scalare]]

Prendi $\vec u = (4; 3)$, lungo $5$, e un vettore $\vec v$ lungo anche lui $5$. Fra i due c'è l'angolo $\theta$. Dalla testa di $\vec v$ scendi in perpendicolare sulla retta di $\vec u$. Il segmento che trovi sulla retta è l'**ombra** di $\vec v$ su $\vec u$: è lunga $|\vec v| \cos\theta$.

>* Il **prodotto scalare** di $\vec u$ e $\vec v$ è il numero $$\vec u \cdot \vec v = |\vec u| \cdot |\vec v| \cdot \cos\theta$$ dove $\theta$ è l'angolo fra i due vettori, da $0^\circ$ a $180^\circ$. È l'ombra di $\vec v$ moltiplicata per $|\vec u|$.

Con $\vec v = (0; 5)$, che punta in su, l'angolo è circa $53^\circ$ e il suo coseno vale $0{,}6$. L'ombra è $5 \cdot 0{,}6 = 3$ e il prodotto è $3 \cdot 5 = 15$.

Il segno del prodotto dipende dall'angolo:

| angolo $\theta$ | $\cos\theta$ | $\vec u \cdot \vec v$ |
|---|---|---|
| acuto | positivo | positivo |
| retto | $0$ | $0$ |
| ottuso | negativo | negativo |

Se $\vec v = (4; 3)$ è allineato a $\vec u$, il prodotto è $5 \cdot 5 = 25$, il massimo. Con $\vec v = (-5; 0)$ l'angolo è ottuso e il prodotto vale $-20$.

[[grafico:gOmbra]]

### Con le componenti

>* Se $\vec u = (u_1; u_2)$ e $\vec v = (v_1; v_2)$: $$\vec u \cdot \vec v = u_1 v_1 + u_2 v_2$$ Si moltiplicano le componenti a coppie e si sommano i prodotti.

~ \vec u = (4; 3), \quad \vec v = (-5; 0) :: l'ultima posizione del video
~ \vec u \cdot \vec v = 4 \cdot (-5) + 3 \cdot 0 :: le prime componenti insieme, le seconde insieme
~ \vec u \cdot \vec v = \evidb{-20} :: lo stesso numero della formula con il coseno

Perché le due formule vanno d'accordo? I versori sono lunghi $1$ e perpendicolari: $\vec i \cdot \vec i = 1$, $\vec j \cdot \vec j = 1$, $\vec i \cdot \vec j = 0$. Moltiplicando $(u_1\vec i + u_2\vec j) \cdot (v_1\vec i + v_2\vec j)$ restano solo $u_1 v_1$ e $u_2 v_2$.

Due proprietà utili. L'ordine non conta: $\vec u \cdot \vec v = \vec v \cdot \vec u$. E un vettore per sé stesso dà il quadrato del modulo: $\vec u \cdot \vec u = |\vec u|^2$.

?? Quanto vale $(2; -1) \cdot (3; 4)$?
[x] $2$
[ ] $(6; -4)$
[ ] $10$
=> $2 \cdot 3 + (-1) \cdot 4 = 6 - 4 = 2$. Il risultato è un numero: $(6; -4)$ sono i due prodotti lasciati separati. $10$ viene dimenticando il segno meno.

>! Il prodotto scalare non è un vettore. Scrivere $\vec u \cdot \vec v = (u_1 v_1; u_2 v_2)$ è l'errore più comune.` },

    { id: 'angolo-perpendicolarita', titolo: 'Angolo fra due vettori e perpendicolarità', testo: R`Dalla definizione del prodotto scalare si ricava il coseno dell'angolo. Il prodotto si calcola con le componenti, i moduli con Pitagora. Così l'angolo fra due vettori si trova senza goniometro.

>* **Angolo fra due vettori** non nulli: $$\cos\theta = \frac{\vec u \cdot \vec v}{|\vec u| \cdot |\vec v|}$$ con $\theta$ fra $0^\circ$ e $180^\circ$.

Prendi $\vec u = (3; 1)$ e $\vec v = (1; 2)$, i vettori del video sulla somma.

~ \vec u \cdot \vec v = 3 \cdot 1 + 1 \cdot 2 = 5 :: il prodotto scalare con le componenti
~ |\vec u| = \sqrt{10}, \quad |\vec v| = \sqrt{5} :: i moduli con Pitagora
~ \cos\theta = \frac{5}{\sqrt{10} \cdot \sqrt{5}} = \frac{5}{\sqrt{50}} = \frac{1}{\sqrt{2}} :: perché $\sqrt{50} = 5\sqrt{2}$
~ \theta = \evidb{45^\circ} :: l'angolo acuto che ha coseno $\frac{\sqrt{2}}{2}$

Qui la calcolatrice non tradisce: l'arcocoseno dà già un angolo fra $0^\circ$ e $180^\circ$.

[[grafico:gAngolo]]

### Vettori perpendicolari

Se l'angolo è retto, $\cos 90^\circ = 0$ e il prodotto scalare si annulla. Vale anche il contrario.

>* Due vettori non nulli sono **perpendicolari** se e solo se $\vec u \cdot \vec v = 0$, cioè $u_1 v_1 + u_2 v_2 = 0$.

Per esempio $(4; 3) \cdot (-3; 4) = -12 + 12 = 0$: i due vettori sono perpendicolari. È la posizione del video in cui l'ombra sparisce.

> Un trucco per trovare un vettore perpendicolare: scambia le componenti e cambia segno a una delle due. Da $(a; b)$ ottieni $(-b; a)$, e infatti $a \cdot (-b) + b \cdot a = 0$.

Agli estremi ci sono i vettori paralleli. Con lo stesso verso $\theta = 0^\circ$ e $\cos\theta = 1$; con versi opposti $\theta = 180^\circ$ e $\cos\theta = -1$.

?? I vettori $(6; -2)$ e $(1; 3)$ sono perpendicolari?
[x] Sì, perché $6 - 6 = 0$.
[ ] No, perché hanno moduli diversi.
[ ] No, perché le componenti non sono proporzionali.
=> $6 \cdot 1 + (-2) \cdot 3 = 6 - 6 = 0$: sono perpendicolari. Il modulo non c'entra. Le componenti proporzionali servono per i vettori paralleli.

>! Per le rette del piano cartesiano la condizione è $m_1 \cdot m_2 = -1$, che non funziona con le rette verticali. La condizione con i vettori vale sempre.

> Il prodotto scalare è legato al teorema del coseno dell'argomento «Trigonometria». Infatti $|\vec u - \vec v|^2 = |\vec u|^2 + |\vec v|^2 - 2\,\vec u \cdot \vec v$, e $\vec u - \vec v$ è il terzo lato del triangolo. Nello spazio vale tutto con una componente in più: lo trovi in «Geometria analitica nello spazio».` },

    { id: 'proiezione', titolo: 'La proiezione di un vettore', testo: R`Una forza spinge un vagone lungo un binario. Il vagone non può uscire dal binario: conta solo la parte della forza che va nella sua direzione. È la **proiezione** della forza sul binario.

La proiezione di $\vec v$ sulla direzione di $\vec u$ è l'ombra del prodotto scalare. Ha un segno: è positiva se l'angolo è acuto, negativa se è ottuso.

>* **Componente di $\vec v$ lungo $\vec u$**: $$v_u = |\vec v| \cos\theta = \frac{\vec u \cdot \vec v}{|\vec u|}$$ **Vettore proiezione**: la stessa ombra, come freccia sulla direzione di $\vec u$: $$\vec v_u = \frac{\vec u \cdot \vec v}{|\vec u|^2}\,\vec u$$

Prendi $\vec u = (4; 3)$ e $\vec v = (2; 4)$.

~ \vec u \cdot \vec v = 8 + 12 = 20, \quad |\vec u| = 5 :: prima i due ingredienti
~ v_u = \frac{20}{5} = 4 :: l'ombra di $\vec v$ è lunga $4$
~ \vec v_u = \frac{20}{25}\,(4; 3) = \evidb{(3{,}2; \ 2{,}4)} :: i $\frac{4}{5}$ di $\vec u$, che è lungo $5$

Controllo: il pezzo che resta, $\vec v - \vec v_u = (-1{,}2; \ 1{,}6)$, è perpendicolare a $\vec u$. Infatti $4 \cdot (-1{,}2) + 3 \cdot 1{,}6 = 0$. Così $\vec v$ si spezza in due parti: una lungo $\vec u$ e una perpendicolare.

[[grafico:gProiezione]]

Anche le componenti cartesiane sono proiezioni: $\vec v \cdot \vec i = v_1$ e $\vec v \cdot \vec j = v_2$. Sono le ombre di $\vec v$ sui due assi.

?? Quanto vale la componente di $\vec v = (5; 2)$ lungo $\vec u = (0; 3)$?
[ ] $6$
[x] $2$
[ ] $5$
=> $\vec u \cdot \vec v = 0 + 6 = 6$ e $|\vec u| = 3$, quindi la componente è $\frac{6}{3} = 2$. $\vec u$ punta in su: conta solo la seconda componente di $\vec v$. $6$ è il prodotto scalare non ancora diviso per $|\vec u|$.

>! Si divide per il modulo del vettore **su cui** si proietta, cioè $|\vec u|$, non per $|\vec v|$.` },

    { id: 'applicazioni', titolo: 'Forze, spostamenti e lavoro', testo: R`I vettori servono soprattutto per descrivere il movimento e le forze. Ecco tre usi concreti.

### Spostamenti

Un drone vola per $120$ m verso est, poi per $50$ m verso nord. Metti l'asse $x$ verso est e l'asse $y$ verso nord. Lo spostamento totale è $(120; 0) + (0; 50) = (120; 50)$. Dalla partenza il drone dista $\sqrt{120^2 + 50^2} = 130$ m, anche se ha volato per $170$ m.

### Forze

Più forze sullo stesso corpo hanno lo stesso effetto della loro somma, la **risultante**. Due persone tirano una cassa con $\vec F_1 = (30; 40)$ N e $\vec F_2 = (50; -40)$ N. La risultante è $(80; 0)$ N: la cassa va dritta lungo l'asse $x$, come se la tirasse una forza sola di $80$ N. Se la risultante è il vettore nullo, il corpo è in **equilibrio**.

### Il lavoro

>* Il **lavoro** di una forza costante $\vec F$ in uno spostamento $\vec s$ è il prodotto scalare $$L = \vec F \cdot \vec s = |\vec F| \cdot |\vec s| \cdot \cos\theta$$ Si misura in joule: $1\ \text{J} = 1\ \text{N} \cdot 1\ \text{m}$.

Tiri un trolley per $10$ m con una forza di $40$ N. La maniglia è inclinata di $60^\circ$ sul pavimento. Il lavoro è $40 \cdot 10 \cdot \cos 60^\circ = 200$ J. Solo la parte orizzontale della forza, $40 \cos 60^\circ = 20$ N, fa avanzare il trolley.

[[grafico:gLavoro]]

Un cameriere porta un vassoio camminando in piano. La sua forza è verticale, lo spostamento è orizzontale: $\theta = 90^\circ$ e il lavoro è zero. L'attrito invece va contro lo spostamento: $\theta = 180^\circ$ e il lavoro è negativo.

?? Una forza è perpendicolare allo spostamento. Quanto vale il suo lavoro?
[ ] Dipende dal modulo della forza.
[x] Zero.
[ ] Il prodotto dei due moduli.
=> Con $\theta = 90^\circ$ il coseno vale $0$, quindi $L = 0$ qualunque sia la forza. Il prodotto dei moduli è il lavoro solo quando $\theta = 0^\circ$.

### Prezzi e quantità

Il prodotto scalare compare anche nei conti di un negozio. Compri $5$ kg di mele a $2$ euro al kg e $4$ kg di pere a $3$ euro al kg. Con le quantità $\vec q = (5; 4)$ e i prezzi $\vec p = (2; 3)$, la spesa è $\vec q \cdot \vec p = 10 + 12 = 22$ euro.

>! Il lavoro e la spesa sono numeri, non vettori. Il lavoro ha un segno, e si somma agli altri lavori come un numero qualunque.` }
  ],

  grafici: {
    gFrecce: { tipo: 'piano', x: [-6, 6], y: [-3, 4], proporzioni: 'uguali',
      elementi: [
        { tipo: 'vettore', da: [-5, -2], a: [-2, -1], colore: 1, etichetta: 'u' },
        { tipo: 'punto', p: [-5, -2], colore: 1, etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [-2, -1], colore: 1, etichetta: 'B', posizione: 'alto' },
        { tipo: 'vettore', da: [-1, 2], a: [2, 3], colore: 1, etichetta: 'u' },
        { tipo: 'vettore', da: [5, -1], a: [2, -2], colore: 2, etichetta: '−u' },
        { tipo: 'vettore', da: [3, 1], a: [5, 3], colore: 3, etichetta: 'w' }
      ],
      didascalia: "Le due frecce blu sono lo stesso vettore u = AB: stesso modulo, stessa direzione, stesso verso, anche se partono da punti diversi. La freccia arancio è l'opposto −u: stessa direzione, verso contrario. La freccia verde w ha un'altra direzione." },

    gSomma: { tipo: 'piano', x: [-3, 6], y: [-2, 5], proporzioni: 'uguali',
      parametri: [
        { nome: 'a', min: -2, max: 2, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'b', min: -1, max: 3, passo: 0.5, valore: 2, nascosto: true }
      ],
      elementi: [
        { tipo: 'vettore', da: [3, 1], a: ['3 + a', '1 + b'], colore: 2, tratteggio: true },
        { tipo: 'vettore', da: ['a', 'b'], a: ['3 + a', '1 + b'], colore: 1, tratteggio: true },
        { tipo: 'vettore', da: [0, 0], a: ['3 + a', '1 + b'], colore: 3, etichetta: 'u + v' },
        { tipo: 'vettore', da: [0, 0], a: [3, 1], colore: 1, etichetta: 'u' },
        { tipo: 'vettore', da: [0, 0], a: ['a', 'b'], colore: 2, etichetta: 'v' },
        { tipo: 'punto', p: ['a', 'b'], trascina: true, colore: 2 },
        { tipo: 'testo', p: [-2.8, 4.5], testo: 'u + v = ({{3 + a}}; {{1 + b}})', ancora: 'start' }
      ],
      didascalia: "u = (3; 1) in blu e v in arancio partono dall'origine. Le frecce tratteggiate chiudono il parallelogramma: v appoggiato sulla testa di u (testa-coda) e u appoggiato sulla testa di v. La diagonale verde è la somma. La punta di v si può spostare." },

    gMultiplo: { tipo: 'piano', x: [-7, 7], y: [-4, 5], proporzioni: 'uguali',
      parametri: [ { nome: 'k', min: -3, max: 3, passo: 0.5, valore: 2, etichetta: 'k' } ],
      elementi: [
        { tipo: 'vettore', da: [0, 2], a: [2, 3], colore: 1, etichetta: 'v' },
        { tipo: 'vettore', da: [0, 0], a: ['2*k', 'k'], colore: 2, etichetta: 'k·v' },
        { tipo: 'testo', p: [-6.8, 4.4], testo: '|k·v| = {{abs(k)}} · |v|', ancora: 'start' }
      ],
      didascalia: "v = (2; 1) in blu e il suo multiplo k·v in arancio, che resta sempre parallelo a v. Con k negativo il verso si rovescia; con k = 0 la freccia si riduce a un punto." },

    gComponenti: { tipo: 'piano', x: [-1, 5], y: [-1, 4], passo: [1, 1], proporzioni: 'uguali',
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [3, 0], colore: 3, tratteggio: true },
        { tipo: 'segmento', da: [3, 0], a: [3, 1], colore: 3, tratteggio: true },
        { tipo: 'testo', p: [2.2, 0.15], testo: '3' },
        { tipo: 'testo', p: [3.3, 0.6], testo: '1' },
        { tipo: 'vettore', da: [0, 0], a: [3, 1], colore: 1, etichetta: 'u' },
        { tipo: 'vettore', da: [0, 0], a: [1, 0], colore: 4 },
        { tipo: 'vettore', da: [0, 0], a: [0, 1], colore: 4 },
        { tipo: 'testo', p: [0.5, -0.45], testo: 'i' },
        { tipo: 'testo', p: [-0.4, 0.6], testo: 'j' },
        { tipo: 'vettore', da: [1, 2], a: [4, 3], colore: 1 },
        { tipo: 'punto', p: [1, 2], colore: 1, etichetta: 'A', posizione: 'alto-sinistra' },
        { tipo: 'punto', p: [4, 3], colore: 1, etichetta: 'B', posizione: 'alto' }
      ],
      didascalia: "u = (3; 1) = 3i + 1j: 3 passi lungo x e 1 lungo y (in verde). I versori i e j, in viola, sono lunghi 1. La freccia da A(1; 2) a B(4; 3) ha le stesse componenti: è lo stesso vettore." },

    gDirezione: { tipo: 'piano', x: [-6, 6], y: [-6, 6], proporzioni: 'uguali',
      parametri: [
        { nome: 'm', min: 1, max: 5, passo: 0.5, valore: 4, etichetta: 'modulo' },
        { nome: 't', min: 0, max: 359, passo: 1, valore: 30, etichetta: 'α (gradi)' }
      ],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [VX, 0], colore: 3, tratteggio: true },
        { tipo: 'segmento', da: [VX, 0], a: [VX, VY], colore: 3, tratteggio: true },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: MEZZO, raggio: 1, colore: 2, etichetta: 'α' },
        { tipo: 'angolo', vertice: [0, 0], da: MEZZO, a: ['cos(t*pi/180)', 'sin(t*pi/180)'], raggio: 1, colore: 2, retto: false },
        { tipo: 'vettore', da: [0, 0], a: [VX, VY], colore: 1, etichetta: 'v' },
        { tipo: 'punto', p: [VX, VY], trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true }, colore: 1 },
        { tipo: 'testo', p: [-5.8, 5.3], testo: 'v = ({{m*cos(t*pi/180)}}; {{m*sin(t*pi/180)}})', ancora: 'start' }
      ],
      didascalia: "Dal modulo e dall'angolo α alle componenti: v₁ = |v| cos α e v₂ = |v| sin α (i tratti verdi). La testa di v gira intorno all'origine; il modulo si cambia con il cursore." },

    gOmbra: { tipo: 'piano', x: [-6, 6], y: [-6, 6], proporzioni: 'uguali',
      parametri: [ { nome: 't', min: 0, max: 360, passo: 1, valore: 90, etichetta: 'direzione di v (gradi)' } ],
      elementi: [
        { tipo: 'retta', per: [[0, 0], [4, 3]], colore: 4, tratteggio: true },
        { tipo: 'vettore', da: [0, 0], a: [4, 3], colore: 1, etichetta: 'u' },
        { tipo: 'segmento', da: [WX, WY], a: ['4*' + K, '3*' + K], colore: 2, tratteggio: true },
        { tipo: 'segmento', da: [0, 0], a: ['4*' + K, '3*' + K], colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [4, 3], a: [WX, WY], raggio: 1, colore: 4, etichetta: 'θ' },
        { tipo: 'vettore', da: [0, 0], a: [WX, WY], colore: 2, etichetta: 'v' },
        { tipo: 'punto', p: [WX, WY], trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true }, colore: 2 },
        { tipo: 'testo', p: [-5.8, -5.4], testo: 'u · v = {{20*cos(t*pi/180) + 15*sin(t*pi/180)}}', ancora: 'start' }
      ],
      didascalia: "u = (4; 3) resta fermo, v è lungo 5 e gira. Il tratto verde sulla retta di u è l'ombra di v, lunga |v| cos θ: il prodotto scalare è l'ombra per 5. Quando l'ombra cade dalla parte opposta a u, il prodotto è negativo." },

    gAngolo: { tipo: 'piano', x: [-2, 4], y: [-1, 4], proporzioni: 'uguali',
      elementi: [
        { tipo: 'angolo', vertice: [0, 0], da: [3, 1], a: [-1, 3], raggio: 0.45, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [3, 1], a: [1, 2], raggio: 1, colore: 2, etichetta: '45°' },
        { tipo: 'vettore', da: [0, 0], a: [3, 1], colore: 1, etichetta: 'u' },
        { tipo: 'vettore', da: [0, 0], a: [1, 2], colore: 2, etichetta: 'v' },
        { tipo: 'vettore', da: [0, 0], a: [-1, 3], colore: 3, etichetta: 'w' }
      ],
      didascalia: "u = (3; 1) e v = (1; 2) formano un angolo di 45°: cos θ = 5/(√10 · √5). w = (−1; 3) è perpendicolare a u, perché 3 · (−1) + 1 · 3 = 0." },

    gProiezione: { tipo: 'piano', x: [-1, 5], y: [-1, 5], proporzioni: 'uguali',
      elementi: [
        { tipo: 'retta', per: [[0, 0], [4, 3]], colore: 4, tratteggio: true },
        { tipo: 'vettore', da: [0, 0], a: [4, 3], colore: 1 },
        { tipo: 'testo', p: [4.1, 3.4], testo: 'u' },
        { tipo: 'vettore', da: [0, 0], a: [3.2, 2.4], colore: 3 },
        { tipo: 'segmento', da: [2, 4], a: [3.2, 2.4], colore: 2, tratteggio: true },
        { tipo: 'angolo', vertice: [3.2, 2.4], da: [0, 0], a: [2, 4], raggio: 0.35, colore: 4 },
        { tipo: 'vettore', da: [0, 0], a: [2, 4], colore: 2, etichetta: 'v' },
        { tipo: 'testo', p: [2.1, 1], testo: 'ombra' }
      ],
      didascalia: "v = (2; 4) proiettato sulla direzione di u = (4; 3). La freccia verde è il vettore proiezione (3,2; 2,4), lungo 4. Il tratto arancio, perpendicolare a u, è la parte di v che resta." },

    gLavoro: { tipo: 'piano', x: [-1, 9], y: [-2, 6], proporzioni: 'uguali',
      elementi: [
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: [3, 5.1962], raggio: 0.8, colore: 4, etichetta: 'θ' },
        { tipo: 'segmento', da: [3, 5.1962], a: [3, 0], colore: 2, tratteggio: true },
        { tipo: 'vettore', da: [0, 0], a: [3, 0], colore: 1 },
        { tipo: 'testo', p: [1.5, -1], testo: 'F cos θ' },
        { tipo: 'vettore', da: [0, 0], a: [3, 5.1962], colore: 2, etichetta: 'F' },
        { tipo: 'vettore', da: [0, -1.5], a: [8, -1.5], colore: 3, etichetta: 's' }
      ],
      didascalia: "La forza F tira con un angolo θ = 60° sull'orizzontale; lo spostamento s è orizzontale. Solo la parte blu, F cos θ, fa avanzare: il lavoro è F cos θ · s." }
  },

  esempi: [
    { titolo: 'Componenti, modulo e direzione', problema: R`Dati $A(-1; 2)$ e $B(5; -6)$, trova le componenti di $\vec{AB}$, il suo modulo e il suo angolo di direzione.`, passi: [
      R`Le componenti sono «arrivo meno partenza»: $\vec{AB} = (5 - (-1); \ -6 - 2) = (6; -8)$. Attento al doppio meno: $5 - (-1) = 6$.`,
      R`Il modulo viene da Pitagora, con le componenti come cateti: $|\vec{AB}| = \sqrt{36 + 64} = \sqrt{100} = 10$. È anche la distanza fra $A$ e $B$.`,
      R`Per la direzione: $\arctan\frac{-8}{6} \approx -53{,}13^\circ$. La calcolatrice dà un angolo negativo, che va sistemato.`,
      R`Con $v_1 > 0$ e $v_2 < 0$ la freccia punta nel quarto quadrante. Si aggiunge un giro: $\alpha \approx -53{,}13^\circ + 360^\circ = 306{,}87^\circ$.`
    ], risultato: R`$\vec{AB} = (6; -8)$, $|\vec{AB}| = 10$, $\alpha \approx 306{,}87^\circ$` },

    { titolo: 'Dalle polari alle cartesiane', problema: R`Una forza di $20$ N forma un angolo di $150^\circ$ con il semiasse positivo delle $x$. Trova le sue componenti.`, passi: [
      R`La prima componente è $F_1 = 20\cos 150^\circ$. L'angolo sta nel secondo quadrante, dove il coseno è negativo: $\cos 150^\circ = -\frac{\sqrt{3}}{2}$.`,
      R`Quindi $F_1 = 20 \cdot \left(-\frac{\sqrt{3}}{2}\right) = -10\sqrt{3} \approx -17{,}32$. La forza tira verso sinistra.`,
      R`La seconda è $F_2 = 20\sin 150^\circ = 20 \cdot \frac{1}{2} = 10$. Nel secondo quadrante il seno è positivo: la forza tira anche verso l'alto.`,
      R`Controllo con il modulo: $\sqrt{(-10\sqrt{3})^2 + 10^2} = \sqrt{300 + 100} = 20$. Torna.`
    ], risultato: R`$\vec F = (-10\sqrt{3}; \ 10) \approx (-17{,}32; \ 10)$ N` },

    { titolo: 'La risultante di due forze', problema: R`Su un corpo agiscono due forze: $\vec F_1$ di $30$ N lungo il semiasse positivo delle $x$ e $\vec F_2$ di $40$ N inclinata di $60^\circ$. Trova modulo e direzione della risultante.`, passi: [
      R`Scrivo le componenti. $\vec F_1 = (30; 0)$. $\vec F_2 = (40\cos 60^\circ; \ 40\sin 60^\circ) = (20; \ 20\sqrt{3}) \approx (20; \ 34{,}64)$.`,
      R`La risultante è la somma: $\vec R = (30 + 20; \ 0 + 20\sqrt{3}) \approx (50; \ 34{,}64)$.`,
      R`Modulo: $|\vec R| = \sqrt{50^2 + (20\sqrt{3})^2} = \sqrt{2500 + 1200} = \sqrt{3700} \approx 60{,}83$ N. È meno di $30 + 40 = 70$: le forze non tirano nella stessa direzione.`,
      R`Direzione: $\alpha = \arctan\frac{34{,}64}{50} \approx 34{,}72^\circ$. Le componenti sono positive, quindi non serve correggere.`,
      R`Controllo con il teorema del coseno. Nel triangolo testa-coda l'angolo fra $\vec F_1$ e $\vec F_2$ diventa $120^\circ$: $30^2 + 40^2 - 2 \cdot 30 \cdot 40 \cos 120^\circ = 900 + 1600 + 1200 = 3700$.`
    ], risultato: R`$|\vec R| = \sqrt{3700} \approx 60{,}83$ N, inclinata di circa $34{,}72^\circ$` },

    { titolo: 'Un angolo ottuso', problema: R`Trova l'angolo fra $\vec u = (2; 1)$ e $\vec v = (-3; 1)$.`, passi: [
      R`Prodotto scalare: $\vec u \cdot \vec v = 2 \cdot (-3) + 1 \cdot 1 = -5$. È negativo, quindi l'angolo è ottuso: lo sai prima di finire i conti.`,
      R`Moduli: $|\vec u| = \sqrt{4 + 1} = \sqrt{5}$ e $|\vec v| = \sqrt{9 + 1} = \sqrt{10}$.`,
      R`$\cos\theta = \frac{-5}{\sqrt{5} \cdot \sqrt{10}} = \frac{-5}{\sqrt{50}} = \frac{-5}{5\sqrt{2}} = -\frac{1}{\sqrt{2}}$.`,
      R`L'angolo fra $0^\circ$ e $180^\circ$ con coseno $-\frac{\sqrt{2}}{2}$ è $135^\circ$. L'arcocoseno della calcolatrice lo dà direttamente.`
    ], risultato: R`$\theta = 135^\circ$` },

    { titolo: 'Spezzare un vettore in due direzioni', problema: R`Scrivi $\vec v = (7; 1)$ come somma di un vettore parallelo a $\vec u = (3; 4)$ e di uno perpendicolare a $\vec u$.`, passi: [
      R`La parte parallela è il vettore proiezione di $\vec v$ su $\vec u$. Servono $\vec u \cdot \vec v = 21 + 4 = 25$ e $|\vec u|^2 = 9 + 16 = 25$.`,
      R`$\vec v_u = \frac{25}{25}\,(3; 4) = (3; 4)$. La componente di $\vec v$ lungo $\vec u$ è $\frac{25}{5} = 5$.`,
      R`La parte perpendicolare è quello che resta: $\vec v - \vec v_u = (7 - 3; \ 1 - 4) = (4; -3)$.`,
      R`Controllo: $(3; 4) \cdot (4; -3) = 12 - 12 = 0$, quindi i due pezzi sono davvero perpendicolari. E $(3; 4) + (4; -3) = (7; 1)$.`
    ], risultato: R`$(7; 1) = (3; 4) + (4; -3)$` },

    { titolo: 'Il lavoro con le componenti', problema: R`La forza costante $\vec F = (30; 40)$ N sposta un oggetto da $A(1; 1)$ a $B(7; 3)$, con le coordinate in metri. Calcola il lavoro e l'angolo fra forza e spostamento.`, passi: [
      R`Lo spostamento è il vettore $\vec s = \vec{AB} = (7 - 1; \ 3 - 1) = (6; 2)$ m.`,
      R`Il lavoro è il prodotto scalare: $L = 30 \cdot 6 + 40 \cdot 2 = 180 + 80 = 260$ J.`,
      R`Moduli: $|\vec F| = \sqrt{900 + 1600} = 50$ N e $|\vec s| = \sqrt{36 + 4} = \sqrt{40} \approx 6{,}32$ m.`,
      R`$\cos\theta = \frac{260}{50\sqrt{40}} \approx 0{,}822$, quindi $\theta \approx 34{,}70^\circ$. Angolo acuto: il lavoro è positivo, come deve.`
    ], risultato: R`$L = 260$ J, con $\theta \approx 34{,}70^\circ$` }
  ],

  formulario: [
    { nome: 'Componenti del vettore AB', formula: R`\vec{AB} = (x_B - x_A; \ y_B - y_A)`, nota: R`Arrivo meno partenza. Con l'ordine scambiato si trova l'opposto $\vec{BA}$.` },
    { nome: 'Somma e differenza', formula: R`\vec u \pm \vec v = (u_1 \pm v_1; \ u_2 \pm v_2)`, nota: R`Graficamente: regola testa-coda o del parallelogramma. $\vec u - \vec v = \vec u + (-\vec v)$.` },
    { nome: 'Prodotto per un numero', formula: R`k\,\vec v = (k v_1; \ k v_2) \qquad |k\,\vec v| = |k| \cdot |\vec v|`, nota: R`Stessa direzione di $\vec v$; stesso verso se $k > 0$, opposto se $k < 0$.` },
    { nome: 'Versori degli assi', formula: R`\vec v = v_1\,\vec i + v_2\,\vec j \qquad \vec i = (1; 0), \ \vec j = (0; 1)`, nota: R`Un versore è un vettore di modulo $1$.` },
    { nome: 'Modulo', formula: R`|\vec v| = \sqrt{v_1^2 + v_2^2}`, nota: R`È il teorema di Pitagora; il modulo di $\vec{AB}$ è la distanza fra $A$ e $B$.` },
    { nome: 'Angolo di direzione', formula: R`\tan\alpha = \frac{v_2}{v_1}`, nota: R`$\alpha$ si misura dal semiasse positivo delle $x$, in senso antiorario. Se $v_1 < 0$ si aggiunge $180^\circ$ all'arcotangente; se $v_1 > 0$ e $v_2 < 0$ si aggiunge $360^\circ$.` },
    { nome: 'Dalle polari alle cartesiane', formula: R`v_1 = |\vec v| \cos\alpha \qquad v_2 = |\vec v| \sin\alpha` },
    { nome: 'Prodotto scalare con il coseno', formula: R`\vec u \cdot \vec v = |\vec u| \cdot |\vec v| \cdot \cos\theta`, nota: R`$\theta$ è l'angolo fra i due vettori, da $0^\circ$ a $180^\circ$. Il risultato è un numero.` },
    { nome: 'Prodotto scalare con le componenti', formula: R`\vec u \cdot \vec v = u_1 v_1 + u_2 v_2`, nota: R`Inoltre $\vec u \cdot \vec u = |\vec u|^2$.` },
    { nome: 'Angolo fra due vettori', formula: R`\cos\theta = \frac{\vec u \cdot \vec v}{|\vec u| \cdot |\vec v|}`, nota: R`Prodotto positivo: angolo acuto; nullo: retto; negativo: ottuso.` },
    { nome: 'Perpendicolari e paralleli', formula: R`\begin{gathered} \vec u \perp \vec v \iff u_1 v_1 + u_2 v_2 = 0 \\ \vec u \parallel \vec v \iff \vec v = k\,\vec u \end{gathered}`, nota: R`Per vettori non nulli. Un perpendicolare a $(a; b)$ è $(-b; a)$.` },
    { nome: 'Proiezione di v su u', formula: R`v_u = \frac{\vec u \cdot \vec v}{|\vec u|} \qquad \vec v_u = \frac{\vec u \cdot \vec v}{|\vec u|^2}\,\vec u`, nota: R`$v_u$ è la componente con segno lungo $\vec u$; $\vec v_u$ è il vettore proiezione.` },
    { nome: 'Lavoro di una forza costante', formula: R`L = \vec F \cdot \vec s = |\vec F| \cdot |\vec s| \cdot \cos\theta`, nota: R`In joule, con la forza in newton e lo spostamento in metri. Nullo se forza e spostamento sono perpendicolari.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'scalari-vettori', tipo: 'definizione', fronte: R`Grandezza scalare e grandezza vettoriale`, retro: R`Una scalare è data da un numero con l'unità (temperatura, massa). Una vettoriale ha bisogno anche di direzione e verso (spostamento, velocità, forza).` },
    { id: 'fc-02', sezione: 'scalari-vettori', tipo: 'definizione', fronte: R`Le tre caratteristiche di un vettore`, retro: R`Il **modulo** (la lunghezza), la **direzione** (la retta su cui sta) e il **verso** (da che parte punta).` },
    { id: 'fc-03', sezione: 'scalari-vettori', tipo: 'concetto', fronte: R`Che differenza c'è fra direzione e verso?`, retro: R`La direzione è la retta, il verso è il senso di percorrenza. Andata e ritorno sulla stessa strada: stessa direzione, versi opposti.` },
    { id: 'fc-04', sezione: 'scalari-vettori', tipo: 'definizione', fronte: R`Quando due frecce rappresentano lo stesso vettore?`, retro: R`Quando hanno stesso modulo, stessa direzione e stesso verso, anche se partono da punti diversi.` },
    { id: 'fc-05', sezione: 'scalari-vettori', tipo: 'definizione', fronte: R`Vettore opposto di $\vec u$`, retro: R`$-\vec u$: stesso modulo e stessa direzione, verso contrario. Per esempio $\vec{BA} = -\vec{AB}$.` },
    { id: 'fc-06', sezione: 'somma-differenza', tipo: 'procedura', fronte: R`Regola testa-coda per $\vec u + \vec v$`, retro: R`$\vec v$ parte dalla testa di $\vec u$. La somma va dalla coda di $\vec u$ alla testa di $\vec v$.` },
    { id: 'fc-07', sezione: 'somma-differenza', tipo: 'procedura', fronte: R`Regola del parallelogramma`, retro: R`$\vec u$ e $\vec v$ partono dallo stesso punto. Si completa il parallelogramma: la somma è la diagonale che parte dal punto comune.` },
    { id: 'fc-08', sezione: 'somma-differenza', tipo: 'concetto', fronte: R`$|\vec u + \vec v|$ è uguale a $|\vec u| + |\vec v|$?`, retro: R`Di solito no: $|\vec u + \vec v| \le |\vec u| + |\vec v|$. L'uguale vale solo per vettori con stessa direzione e stesso verso.` },
    { id: 'fc-09', sezione: 'somma-differenza', tipo: 'procedura', fronte: R`$\vec u$ e $\vec v$ partono dallo stesso punto: dove va $\vec u - \vec v$?`, retro: R`Dalla testa di $\vec v$ alla testa di $\vec u$, perché $\vec v + (\vec u - \vec v) = \vec u$.` },
    { id: 'fc-10', sezione: 'prodotto-numero', tipo: 'definizione', fronte: R`Il vettore $k\,\vec v$`, retro: R`Modulo $|k| \cdot |\vec v|$, stessa direzione di $\vec v$. Stesso verso se $k > 0$, opposto se $k < 0$.` },
    { id: 'fc-11', sezione: 'prodotto-numero', tipo: 'concetto', fronte: R`Quando due vettori non nulli sono paralleli?`, retro: R`Quando uno è multiplo dell'altro, $\vec w = k\,\vec v$: le componenti sono proporzionali.` },
    { id: 'fc-12', sezione: 'componenti', tipo: 'formula', fronte: R`Componenti del vettore $\vec{AB}$`, retro: R`$\vec{AB} = (x_B - x_A; \ y_B - y_A)$: arrivo meno partenza.` },
    { id: 'fc-13', sezione: 'componenti', tipo: 'definizione', fronte: R`Versore; i versori $\vec i$ e $\vec j$`, retro: R`Un versore è un vettore di modulo $1$. $\vec i = (1; 0)$, $\vec j = (0; 1)$, e $(v_1; v_2) = v_1\,\vec i + v_2\,\vec j$.` },
    { id: 'fc-14', sezione: 'componenti', tipo: 'procedura', fronte: R`Come si fanno somma e prodotto per un numero con le componenti?`, retro: R`Una componente alla volta: $(u_1; u_2) + (v_1; v_2) = (u_1 + v_1; \ u_2 + v_2)$ e $k\,(v_1; v_2) = (k v_1; \ k v_2)$.` },
    { id: 'fc-15', sezione: 'modulo-direzione', tipo: 'formula', fronte: R`Modulo di $\vec v = (v_1; v_2)$`, retro: R`$|\vec v| = \sqrt{v_1^2 + v_2^2}$, per il teorema di Pitagora.` },
    { id: 'fc-16', sezione: 'modulo-direzione', tipo: 'procedura', fronte: R`Come si trova l'angolo di direzione $\alpha$ di $(v_1; v_2)$?`, retro: R`$\arctan\frac{v_2}{v_1}$, poi si guarda il quadrante: $+180^\circ$ se $v_1 < 0$, $+360^\circ$ se $v_1 > 0$ e $v_2 < 0$.` },
    { id: 'fc-17', sezione: 'modulo-direzione', tipo: 'formula', fronte: R`Componenti di un vettore di modulo $|\vec v|$ e angolo $\alpha$`, retro: R`$v_1 = |\vec v| \cos\alpha$, $v_2 = |\vec v| \sin\alpha$.` },
    { id: 'fc-18', sezione: 'prodotto-scalare', tipo: 'formula', fronte: R`Prodotto scalare con il coseno`, retro: R`$\vec u \cdot \vec v = |\vec u| \cdot |\vec v| \cdot \cos\theta$, con $\theta$ angolo fra i vettori. È un numero, non un vettore.` },
    { id: 'fc-19', sezione: 'prodotto-scalare', tipo: 'formula', fronte: R`Prodotto scalare con le componenti`, retro: R`$\vec u \cdot \vec v = u_1 v_1 + u_2 v_2$: si moltiplicano le componenti a coppie e si sommano.` },
    { id: 'fc-20', sezione: 'prodotto-scalare', tipo: 'concetto', fronte: R`Che cosa dice il segno del prodotto scalare?`, retro: R`Positivo: angolo acuto. Zero: angolo retto. Negativo: angolo ottuso.` },
    { id: 'fc-21', sezione: 'angolo-perpendicolarita', tipo: 'formula', fronte: R`Coseno dell'angolo fra $\vec u$ e $\vec v$`, retro: R`$\cos\theta = \frac{\vec u \cdot \vec v}{|\vec u| \cdot |\vec v|}$, con $\theta$ fra $0^\circ$ e $180^\circ$.` },
    { id: 'fc-22', sezione: 'angolo-perpendicolarita', tipo: 'concetto', fronte: R`Condizione di perpendicolarità fra due vettori non nulli`, retro: R`$u_1 v_1 + u_2 v_2 = 0$. Un perpendicolare a $(a; b)$ è $(-b; a)$.` },
    { id: 'fc-23', sezione: 'proiezione', tipo: 'formula', fronte: R`Componente di $\vec v$ lungo la direzione di $\vec u$`, retro: R`$v_u = \frac{\vec u \cdot \vec v}{|\vec u|} = |\vec v| \cos\theta$. Negativa se l'angolo è ottuso.` },
    { id: 'fc-24', sezione: 'applicazioni', tipo: 'formula', fronte: R`Lavoro di una forza costante $\vec F$ nello spostamento $\vec s$`, retro: R`$L = \vec F \cdot \vec s = |\vec F| \cdot |\vec s| \cdot \cos\theta$, in joule. Zero se $\vec F$ è perpendicolare a $\vec s$.` },
    { id: 'fc-25', sezione: 'applicazioni', tipo: 'concetto', fronte: R`Risultante ed equilibrio`, retro: R`La risultante è la somma vettoriale delle forze su un corpo. Il corpo è in equilibrio se la risultante è il vettore nullo.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Trova le componenti del vettore $\vec{AB}$, con $A(2; -1)$ e $B(6; 4)$.`, suggerimenti: [R`Arrivo meno partenza: le coordinate di $B$ meno quelle di $A$.`], risposta: cop(4, 5), soluzione: [R`$\vec{AB} = (6 - 2; \ 4 - (-1))$.`, R`$\vec{AB} = (4; 5)$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $(2; -3) + (-5; 1)$.`, suggerimenti: [R`Somma le prime componenti fra loro e le seconde fra loro.`], risposta: cop(-3, -2), soluzione: [R`$(2 - 5; \ -3 + 1)$.`, R`$= (-3; -2)$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $(4; 1) - (-2; 3)$.`, suggerimenti: [R`Sottrai componente per componente. Attento al meno davanti a $-2$.`], risposta: cop(6, -2), soluzione: [R`$(4 - (-2); \ 1 - 3)$.`, R`$= (6; -2)$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Calcola $3 \cdot (-2; 5)$.`, suggerimenti: [R`Il numero moltiplica tutte e due le componenti.`], risposta: cop(-6, 15), soluzione: [R`$(3 \cdot (-2); \ 3 \cdot 5)$.`, R`$= (-6; 15)$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Con $\vec u = (1; -2)$ e $\vec v = (4; -3)$, calcola $2\vec u - \vec v$.`, suggerimenti: [R`Prima calcola $2\vec u$, poi togli $\vec v$ componente per componente.`], risposta: cop(-2, -1), soluzione: [R`$2\vec u = (2; -4)$.`, R`$2\vec u - \vec v = (2 - 4; \ -4 - (-3)) = (-2; -1)$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola il modulo del vettore $(-5; 12)$.`, suggerimenti: [R`$|\vec v| = \sqrt{v_1^2 + v_2^2}$. Il quadrato di un numero negativo è positivo.`], risposta: num(13), soluzione: [R`$\sqrt{(-5)^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169}$.`, R`$= 13$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola il modulo del vettore $(2; 4)$.`, suggerimenti: [R`Usa Pitagora; il risultato non è intero, puoi lasciarlo con la radice.`], risposta: num(Math.sqrt(20), 'es. √7 o 2,65'), soluzione: [R`$\sqrt{4 + 16} = \sqrt{20}$.`, R`$\sqrt{20} = 2\sqrt{5} \approx 4{,}47$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Con $A(3; 0)$ e $B(1; 5)$, trova le componenti di $\vec{BA}$.`, suggerimenti: [R`In $\vec{BA}$ la coda è $B$ e la testa è $A$: si fa $A - B$.`], risposta: cop(2, -5), soluzione: [R`$\vec{BA} = (3 - 1; \ 0 - 5) = (2; -5)$.`, R`È l'opposto di $\vec{AB} = (-2; 5)$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Scrivi il vettore $4\,\vec i - 7\,\vec j$ con le componenti.`, suggerimenti: [R`$\vec i = (1; 0)$ e $\vec j = (0; 1)$: il numero davanti a $\vec i$ è la prima componente.`], risposta: cop(4, -7), soluzione: [R`$4\,(1; 0) - 7\,(0; 1) = (4; 0) + (0; -7)$.`, R`$= (4; -7)$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Trova l'angolo di direzione del vettore $(2; \ 2\sqrt{3})$, in gradi.`, suggerimenti: [R`$\tan\alpha = \frac{v_2}{v_1}$. Le due componenti sono positive: primo quadrante.`], risposta: gradi(60), soluzione: [R`$\tan\alpha = \frac{2\sqrt{3}}{2} = \sqrt{3}$.`, R`Nel primo quadrante $\alpha = 60^\circ$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Trova l'angolo di direzione del vettore $(-2; \ -2\sqrt{3})$, fra $0^\circ$ e $360^\circ$.`, suggerimenti: [R`Le due componenti sono negative: in che quadrante sta la testa?`, R`La calcolatrice dà $\arctan\sqrt{3} = 60^\circ$: con $v_1 < 0$ aggiungi $180^\circ$.`], risposta: gradi(240), soluzione: [R`$\tan\alpha = \frac{-2\sqrt{3}}{-2} = \sqrt{3}$, e $\arctan\sqrt{3} = 60^\circ$.`, R`La testa è nel terzo quadrante: $\alpha = 60^\circ + 180^\circ = 240^\circ$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Un vettore ha modulo $10$ e angolo di direzione $60^\circ$. Trova le sue componenti.`, suggerimenti: [R`$v_1 = |\vec v| \cos\alpha$ e $v_2 = |\vec v| \sin\alpha$.`], risposta: cop(5, 5 * Math.sqrt(3)), soluzione: [R`$v_1 = 10\cos 60^\circ = 10 \cdot \frac{1}{2} = 5$.`, R`$v_2 = 10\sin 60^\circ = 10 \cdot \frac{\sqrt{3}}{2} = 5\sqrt{3} \approx 8{,}66$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Calcola il prodotto scalare $(3; -2) \cdot (4; 5)$.`, suggerimenti: [R`$u_1 v_1 + u_2 v_2$: moltiplica a coppie e somma.`], risposta: num(2), soluzione: [R`$3 \cdot 4 + (-2) \cdot 5 = 12 - 10$.`, R`$= 2$.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Due vettori hanno moduli $4$ e $5$ e formano un angolo di $60^\circ$. Calcola il loro prodotto scalare.`, suggerimenti: [R`$\vec u \cdot \vec v = |\vec u| \cdot |\vec v| \cdot \cos\theta$.`], risposta: num(10), soluzione: [R`$4 \cdot 5 \cdot \cos 60^\circ = 20 \cdot \frac{1}{2}$.`, R`$= 10$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`I vettori $(6; 4)$ e $(-2; 3)$ sono perpendicolari? Scrivi *sì* o *no*.`, suggerimenti: [R`Calcola il prodotto scalare: se vale zero, sono perpendicolari.`], risposta: SI, soluzione: [R`$6 \cdot (-2) + 4 \cdot 3 = -12 + 12 = 0$.`, R`Il prodotto scalare è zero: sì, sono perpendicolari.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Per quale valore di $k$ i vettori $(k; 3)$ e $(2; -4)$ sono perpendicolari?`, suggerimenti: [R`Scrivi il prodotto scalare e ponilo uguale a zero.`], risposta: num(6), soluzione: [R`$k \cdot 2 + 3 \cdot (-4) = 2k - 12$.`, R`$2k - 12 = 0$ per $k = 6$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Trova l'angolo fra $\vec u = (2; 0)$ e $\vec v = (-1; \sqrt{3})$, in gradi.`, suggerimenti: [R`$\cos\theta = \frac{\vec u \cdot \vec v}{|\vec u| \cdot |\vec v|}$.`, R`Il prodotto scalare è negativo: l'angolo è ottuso.`], risposta: gradi(120), soluzione: [R`$\vec u \cdot \vec v = -2 + 0 = -2$, $|\vec u| = 2$, $|\vec v| = \sqrt{1 + 3} = 2$.`, R`$\cos\theta = \frac{-2}{4} = -\frac{1}{2}$, quindi $\theta = 120^\circ$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Per quale valore di $k$ il vettore $(k; 4)$ è parallelo a $(3; -1)$?`, suggerimenti: [R`Paralleli vuol dire $(k; 4) = c \cdot (3; -1)$ per un numero $c$.`, R`Dalla seconda componente: $4 = c \cdot (-1)$.`], risposta: num(-12), soluzione: [R`$4 = -c$, quindi $c = -4$.`, R`$k = -4 \cdot 3 = -12$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Calcola la componente di $\vec v = (6; 2)$ lungo la direzione di $\vec u = (3; 4)$.`, suggerimenti: [R`$v_u = \frac{\vec u \cdot \vec v}{|\vec u|}$: si divide per il modulo di $\vec u$.`], risposta: num(5.2), soluzione: [R`$\vec u \cdot \vec v = 18 + 8 = 26$ e $|\vec u| = 5$.`, R`$v_u = \frac{26}{5} = 5{,}2$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Una forza di $50$ N sposta una cassa di $4$ m. Forza e spostamento formano un angolo di $60^\circ$. Calcola il lavoro, in joule.`, suggerimenti: [R`$L = |\vec F| \cdot |\vec s| \cdot \cos\theta$.`], risposta: num(100, 'in joule'), soluzione: [R`$L = 50 \cdot 4 \cdot \cos 60^\circ = 200 \cdot \frac{1}{2}$.`, R`$L = 100$ J.`] },

    { id: 'es-01', difficolta: 2, testo: R`Tre vertici consecutivi del parallelogramma $ABCD$ sono $A(1; 1)$, $B(5; 2)$ e $C(6; 5)$. Trova il quarto vertice $D$.`, suggerimenti: [R`In un parallelogramma i lati opposti sono lo stesso vettore: $\vec{AD} = \vec{BC}$.`, R`Calcola $\vec{BC}$ e applicalo ad $A$.`], risposta: cop(2, 4), soluzione: [R`$\vec{BC} = (6 - 5; \ 5 - 2) = (1; 3)$.`, R`$D = A + \vec{BC} = (1 + 1; \ 1 + 3) = (2; 4)$.`, R`Controllo: $\vec{DC} = (4; 1) = \vec{AB}$.`] },
    { id: 'es-02', difficolta: 2, testo: R`Nel triangolo $A(1; 1)$, $B(4; 2)$, $C(2; 4)$ calcola l'ampiezza dell'angolo in $A$, in gradi, con due decimali.`, suggerimenti: [R`L'angolo in $A$ è l'angolo fra i vettori $\vec{AB}$ e $\vec{AC}$, che partono da $A$.`, R`Usa $\cos\theta = \frac{\vec{AB} \cdot \vec{AC}}{|\vec{AB}| \cdot |\vec{AC}|}$.`], risposta: gradi(53.13), soluzione: [R`$\vec{AB} = (3; 1)$ e $\vec{AC} = (1; 3)$.`, R`$\vec{AB} \cdot \vec{AC} = 3 + 3 = 6$; i moduli sono $\sqrt{10}$ e $\sqrt{10}$.`, R`$\cos\theta = \frac{6}{10} = 0{,}6$, quindi $\theta \approx 53{,}13^\circ$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Verifica che il triangolo $A(1; 2)$, $B(5; 4)$, $C(3; 8)$ è rettangolo e calcola la sua area.`, suggerimenti: [R`Cerca il vertice dove due lati hanno prodotto scalare nullo.`, R`In un triangolo rettangolo l'area è il semiprodotto dei cateti.`], risposta: num(10, 'l\'area'), soluzione: [R`$\vec{BA} = (-4; -2)$ e $\vec{BC} = (-2; 4)$: $\vec{BA} \cdot \vec{BC} = 8 - 8 = 0$. L'angolo retto è in $B$.`, R`Cateti: $|\vec{BA}| = \sqrt{20}$ e $|\vec{BC}| = \sqrt{20}$. Il triangolo è anche isoscele.`, R`Area $= \frac{\sqrt{20} \cdot \sqrt{20}}{2} = \frac{20}{2} = 10$.`, R`Controllo con Pitagora: $|\vec{AC}|^2 = 2^2 + 6^2 = 40 = 20 + 20$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Trova il versore che ha la stessa direzione e lo stesso verso di $\vec v = (8; -6)$.`, suggerimenti: [R`Un versore è lungo $1$: dividi $\vec v$ per il suo modulo.`], risposta: cop(0.8, -0.6), soluzione: [R`$|\vec v| = \sqrt{64 + 36} = 10$.`, R`Il versore è $\frac{1}{10}\,(8; -6) = (0{,}8; \ -0{,}6)$.`, R`Controllo: $0{,}64 + 0{,}36 = 1$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Trova i vettori di modulo $10$ perpendicolari a $(3; 4)$. Scrivi quello con la prima componente positiva.`, suggerimenti: [R`Un perpendicolare a $(a; b)$ è $(-b; a)$. Poi aggiusta la lunghezza.`, R`I vettori cercati sono due, uno opposto all'altro.`], risposta: cop(8, -6), soluzione: [R`$(-4; 3)$ è perpendicolare a $(3; 4)$: $-12 + 12 = 0$. È lungo $5$.`, R`Per arrivare a modulo $10$ lo raddoppio: $(-8; 6)$. Anche l'opposto $(8; -6)$ va bene.`, R`Quello con la prima componente positiva è $(8; -6)$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Su un corpo agiscono le forze $\vec F_1 = (12; 5)$ N, $\vec F_2 = (-4; 10)$ N e $\vec F_3 = (-2; -3)$ N. Trova il modulo della risultante e la forza che, aggiunta alle tre, mette il corpo in equilibrio. Scrivi questa forza.`, suggerimenti: [R`La risultante è la somma delle tre forze.`, R`In equilibrio la somma di tutte le forze è il vettore nullo: la forza che manca è l'opposta della risultante.`], risposta: cop(-6, -12), soluzione: [R`$\vec R = (12 - 4 - 2; \ 5 + 10 - 3) = (6; 12)$ N.`, R`$|\vec R| = \sqrt{36 + 144} = \sqrt{180} = 6\sqrt{5} \approx 13{,}42$ N.`, R`La forza che equilibra è $-\vec R = (-6; -12)$ N.`] },
    { id: 'es-07', difficolta: 2, testo: R`Una barca punta dritta verso l'altra riva a $3$ m/s. La corrente la spinge lungo il fiume a $1{,}5$ m/s. Quanto vale il modulo della velocità della barca rispetto alla riva, in m/s?`, suggerimenti: [R`La velocità vera è la somma dei due vettori, che sono perpendicolari.`, R`Metti l'asse $y$ verso l'altra riva e l'asse $x$ lungo la corrente.`], risposta: num(Math.sqrt(11.25), 'in m/s'), soluzione: [R`$\vec v = (1{,}5; \ 3)$ m/s.`, R`$|\vec v| = \sqrt{2{,}25 + 9} = \sqrt{11{,}25} \approx 3{,}35$ m/s.`, R`La barca devia dalla direzione in cui punta di un angolo con $\tan\beta = \frac{1{,}5}{3} = 0{,}5$, cioè $\beta \approx 26{,}57^\circ$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Una cassa viene trascinata per $15$ m con una fune inclinata di $25^\circ$ sul pavimento. La forza nella fune è $120$ N. L'attrito, di $80$ N, va contro lo spostamento. Calcola il lavoro della forza della fune, in joule, arrotondato all'unità.`, suggerimenti: [R`$L = |\vec F| \cdot |\vec s| \cdot \cos\theta$, con $\theta = 25^\circ$.`, R`Per l'attrito $\theta = 180^\circ$.`], risposta: num(1631.35, 'in joule', 1), soluzione: [R`Fune: $L = 120 \cdot 15 \cdot \cos 25^\circ \approx 1800 \cdot 0{,}9063 \approx 1631$ J.`, R`Attrito: $L = 80 \cdot 15 \cdot \cos 180^\circ = -1200$ J. È negativo: frena.`, R`Il lavoro totale è circa $1631 - 1200 = 431$ J.`] },
    { id: 'es-09', difficolta: 3, testo: R`Per quali valori di $k$ i vettori $\vec u = (1; k)$ e $\vec v = (2; 1)$ formano un angolo di $45^\circ$?`, suggerimenti: [R`Scrivi $\cos 45^\circ = \frac{\vec u \cdot \vec v}{|\vec u| \cdot |\vec v|}$ con $k$ dentro.`, R`Eleva al quadrato i due membri, ma ricorda che il prodotto scalare deve essere positivo.`], risposta: { tipo: 'numeri', valori: [3, -1 / 3], segnaposto: 'es. 2; −1/5', simboli: [';', '−', '/'] }, soluzione: [R`$\vec u \cdot \vec v = 2 + k$, $|\vec u| = \sqrt{1 + k^2}$, $|\vec v| = \sqrt{5}$.`, R`$\frac{2 + k}{\sqrt{5}\,\sqrt{1 + k^2}} = \frac{\sqrt{2}}{2}$. Al quadrato: $\frac{(2 + k)^2}{5(1 + k^2)} = \frac{1}{2}$.`, R`$2(4 + 4k + k^2) = 5 + 5k^2$, cioè $3k^2 - 8k - 3 = 0$.`, R`$k = \frac{8 \pm \sqrt{64 + 36}}{6} = \frac{8 \pm 10}{6}$: $k = 3$ oppure $k = -\frac{1}{3}$.`, R`Controllo del segno: $2 + k$ vale $5$ e $\frac{5}{3}$, positivo in tutti e due i casi. Le due soluzioni vanno bene.`] },
    { id: 'es-10', difficolta: 3, testo: R`Una cassa sta su una rampa che sale nella direzione $\vec d = (4; 3)$. Su di lei agisce la forza $\vec F = (10; 5)$ N. Spezza $\vec F$ in una parte lungo la rampa e una perpendicolare. Quanto vale la componente di $\vec F$ lungo la rampa, in newton?`, suggerimenti: [R`La componente lungo la rampa è $\frac{\vec F \cdot \vec d}{|\vec d|}$.`, R`La parte perpendicolare è $\vec F$ meno il vettore proiezione.`], risposta: num(11, 'in newton'), soluzione: [R`$\vec F \cdot \vec d = 40 + 15 = 55$ e $|\vec d| = 5$: la componente lungo la rampa è $\frac{55}{5} = 11$ N.`, R`Vettore proiezione: $\frac{55}{25}\,(4; 3) = (8{,}8; \ 6{,}6)$ N.`, R`Parte perpendicolare: $(10 - 8{,}8; \ 5 - 6{,}6) = (1{,}2; \ -1{,}6)$ N.`, R`Controllo: $(1{,}2; -1{,}6) \cdot (4; 3) = 4{,}8 - 4{,}8 = 0$.`] },
    { id: 'es-11', difficolta: 3, testo: R`I punti $A(1; 0)$, $B(4; 1)$, $C(5; 4)$, $D(2; 3)$ sono i vertici di un quadrilatero. Dimostra che è un rombo usando i vettori, e calcola la sua area.`, suggerimenti: [R`Parallelogramma: $\vec{AB} = \vec{DC}$. Rombo: in più, due lati consecutivi hanno lo stesso modulo.`, R`Le diagonali di un rombo sono perpendicolari, e l'area è il semiprodotto delle diagonali.`], risposta: num(8, 'l\'area'), soluzione: [R`$\vec{AB} = (3; 1)$ e $\vec{DC} = (3; 1)$: sono uguali, quindi $ABCD$ è un parallelogramma.`, R`$\vec{AD} = (1; 3)$ e $|\vec{AB}| = |\vec{AD}| = \sqrt{10}$: due lati consecutivi uguali, quindi è un rombo.`, R`Diagonali: $\vec{AC} = (4; 4)$ e $\vec{BD} = (-2; 2)$. Il prodotto scalare è $-8 + 8 = 0$: sono perpendicolari, come deve essere.`, R`Area $= \frac{|\vec{AC}| \cdot |\vec{BD}|}{2} = \frac{4\sqrt{2} \cdot 2\sqrt{2}}{2} = \frac{16}{2} = 8$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Dimostra che $|\vec u + \vec v|^2 = |\vec u|^2 + 2\,\vec u \cdot \vec v + |\vec v|^2$. Poi deduci: se $|\vec u + \vec v| = |\vec u - \vec v|$, allora $\vec u$ e $\vec v$ sono perpendicolari. Che cosa dice questo sulle diagonali di un parallelogramma?`, suggerimenti: [R`Parti da $|\vec w|^2 = \vec w \cdot \vec w$ con $\vec w = \vec u + \vec v$, e sviluppa come un quadrato di binomio.`, R`Allo stesso modo $|\vec u - \vec v|^2 = |\vec u|^2 - 2\,\vec u \cdot \vec v + |\vec v|^2$. Uguaglia le due espressioni.`], soluzione: [R`$|\vec u + \vec v|^2 = (\vec u + \vec v) \cdot (\vec u + \vec v) = \vec u \cdot \vec u + 2\,\vec u \cdot \vec v + \vec v \cdot \vec v$, perché $\vec u \cdot \vec v = \vec v \cdot \vec u$.`, R`Quindi $|\vec u + \vec v|^2 = |\vec u|^2 + 2\,\vec u \cdot \vec v + |\vec v|^2$. Con $-\vec v$ al posto di $\vec v$: $|\vec u - \vec v|^2 = |\vec u|^2 - 2\,\vec u \cdot \vec v + |\vec v|^2$.`, R`Se $|\vec u + \vec v| = |\vec u - \vec v|$, i quadrati sono uguali: $2\,\vec u \cdot \vec v = -2\,\vec u \cdot \vec v$, cioè $\vec u \cdot \vec v = 0$.`, R`$\vec u + \vec v$ e $\vec u - \vec v$ sono le due diagonali del parallelogramma di lati $\vec u$ e $\vec v$. Se le diagonali sono lunghe uguali, i lati sono perpendicolari: il parallelogramma è un rettangolo.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale di queste grandezze è vettoriale?`, opzioni: [R`la temperatura di una stanza`, R`la massa di un sasso`, R`la forza su una vela`, R`la durata di un viaggio`], corretta: 2, spiegazione: R`Una forza ha un'intensità, ma anche una direzione e un verso: spinge da qualche parte. Temperatura, massa e durata si danno con un numero e l'unità di misura: sono grandezze scalari.` },
    { id: 'q-02', domanda: R`Due frecce rappresentano lo stesso vettore quando hanno…`, opzioni: [R`solo lo stesso modulo`, R`modulo, direzione e verso uguali`, R`modulo e direzione uguali, verso qualsiasi`, R`la stessa coda e la stessa lunghezza`], corretta: 1, spiegazione: R`Servono tutte e tre le caratteristiche. Con il verso contrario si ha il vettore opposto. La coda invece non conta: lo stesso vettore può partire da punti diversi.` },
    { id: 'q-03', domanda: R`Che relazione c'è fra $\vec{AB}$ e $\vec{BA}$?`, opzioni: [R`sono perpendicolari`, R`hanno moduli diversi`, R`sono lo stesso vettore`, R`sono vettori opposti`], corretta: 3, spiegazione: R`È la stessa freccia percorsa al contrario: stesso modulo, stessa direzione, verso opposto. Quindi $\vec{BA} = -\vec{AB}$.` },
    { id: 'q-04', domanda: R`Con la regola testa-coda, $\vec v$ parte dalla testa di $\vec u$. La somma $\vec u + \vec v$ va…`, opzioni: [R`dalla coda di $\vec u$ alla testa di $\vec v$`, R`dalla testa di $\vec u$ alla coda di $\vec v$`, R`dalla coda di $\vec v$ alla testa di $\vec u$`, R`dalla testa di $\vec u$ alla testa di $\vec v$`], corretta: 0, spiegazione: R`La somma è lo spostamento totale: si parte dove parte il primo vettore e si arriva dove arriva il secondo. Qui la testa di $\vec u$ e la coda di $\vec v$ coincidono, quindi non c'è nessuna freccia fra loro.` },
    { id: 'q-05', domanda: R`$|\vec u| = 3$ e $|\vec v| = 4$. Quanto può valere $|\vec u + \vec v|$?`, opzioni: [R`sempre $7$`, R`sempre $5$`, R`un numero da $1$ a $7$`, R`più di $7$, con angolo ottuso`], corretta: 2, spiegazione: R`Dipende dall'angolo. Con stessa direzione e stesso verso la somma è lunga $7$; con versi opposti $1$; con vettori perpendicolari $5$, per Pitagora. Non può mai superare $|\vec u| + |\vec v| = 7$.` },
    { id: 'q-06', domanda: R`Rispetto a $\vec v$, il vettore $-2\vec v$ ha…`, opzioni: [R`modulo doppio e verso opposto`, R`modulo negativo e stesso verso`, R`modulo dimezzato e verso opposto`, R`modulo doppio e direzione perpendicolare`], corretta: 0, spiegazione: R`Il modulo è $|-2| \cdot |\vec v| = 2|\vec v|$, mai negativo. Il segno meno rovescia il verso. La direzione resta la stessa: $-2\vec v$ è parallelo a $\vec v$.` },
    { id: 'q-07', domanda: R`Le componenti del vettore $\vec{AB}$ si ottengono con…`, opzioni: [R`le coordinate di $A$ meno quelle di $B$`, R`le coordinate di $B$ meno quelle di $A$`, R`la media delle coordinate di $A$ e $B$`, R`la somma delle coordinate di $A$ e $B$`], corretta: 1, spiegazione: R`Arrivo meno partenza: la testa è $B$, la coda è $A$. Con $A - B$ si trova l'opposto $\vec{BA}$. La media delle coordinate dà invece il punto medio di $AB$.` },
    { id: 'q-08', domanda: R`Qual è l'angolo di direzione del vettore $(-1; \sqrt{3})$?`, opzioni: [R`$60^\circ$`, R`$-60^\circ$`, R`$300^\circ$`, R`$120^\circ$`], corretta: 3, spiegazione: R`La calcolatrice dà $\arctan(-\sqrt{3}) = -60^\circ$, un angolo del quarto quadrante. Ma la testa sta nel secondo: $v_1 < 0$ e $v_2 > 0$. Si aggiunge $180^\circ$ e viene $120^\circ$.` },
    { id: 'q-09', domanda: R`Il prodotto scalare di due vettori è…`, opzioni: [R`un numero`, R`un vettore perpendicolare ai due`, R`il vettore dei prodotti delle componenti`, R`un vettore parallelo al primo`], corretta: 0, spiegazione: R`$\vec u \cdot \vec v = u_1 v_1 + u_2 v_2$: i due prodotti si sommano, e il risultato è un numero. Lasciare i prodotti separati in una coppia è l'errore tipico.` },
    { id: 'q-10', domanda: R`Se $\vec u \cdot \vec v < 0$, l'angolo fra $\vec u$ e $\vec v$ è…`, opzioni: [R`acuto`, R`ottuso`, R`retto`, R`nullo`], corretta: 1, spiegazione: R`I moduli sono positivi, quindi il segno del prodotto è quello di $\cos\theta$. Il coseno è negativo per gli angoli fra $90^\circ$ e $180^\circ$: angolo ottuso. Con l'angolo retto il prodotto è zero.` },
    { id: 'q-11', domanda: R`Due vettori non nulli $\vec u$ e $\vec v$ sono perpendicolari se e solo se…`, opzioni: [R`$u_1 v_2 - u_2 v_1 = 0$`, R`$|\vec u| = |\vec v|$`, R`$u_1 v_1 + u_2 v_2 = 0$`, R`$u_1 u_2 + v_1 v_2 = 0$`], corretta: 2, spiegazione: R`Perpendicolari vuol dire prodotto scalare nullo, con le componenti moltiplicate a coppie: $u_1 v_1 + u_2 v_2$. La condizione $u_1 v_2 - u_2 v_1 = 0$ dice invece che le componenti sono proporzionali, cioè che i vettori sono paralleli.` },
    { id: 'q-12', domanda: R`Quanto vale $\vec u \cdot \vec u$?`, opzioni: [R`$0$`, R`$|\vec u|$`, R`$|\vec u|^2$`, R`$2|\vec u|$`], corretta: 2, spiegazione: R`L'angolo di un vettore con sé stesso è $0^\circ$ e $\cos 0^\circ = 1$: resta $|\vec u| \cdot |\vec u|$. Con le componenti: $u_1^2 + u_2^2$, il quadrato del modulo.` },
    { id: 'q-13', domanda: R`Il lavoro di una forza costante è nullo quando la forza…`, opzioni: [R`ha lo stesso verso dello spostamento`, R`è opposta allo spostamento`, R`ha un modulo molto piccolo`, R`è perpendicolare allo spostamento`], corretta: 3, spiegazione: R`$L = |\vec F| \cdot |\vec s| \cdot \cos\theta$ e $\cos 90^\circ = 0$. Con lo stesso verso il lavoro è positivo e massimo; con verso opposto è negativo. Una forza piccola fa un lavoro piccolo, non nullo.` },
    { id: 'q-14', domanda: R`Che cos'è un versore?`, opzioni: [R`un vettore con il verso opposto`, R`un vettore di modulo $1$`, R`un vettore parallelo all'asse $x$`, R`il vettore nullo`], corretta: 1, spiegazione: R`Un versore è lungo $1$ e serve a indicare una direzione e un verso. $\vec i$ e $\vec j$ sono i versori degli assi; ma un versore può puntare in qualunque direzione.` },
    { id: 'q-15', domanda: R`La componente di $\vec v$ lungo la direzione di $\vec u$ è…`, opzioni: [R`$\frac{\vec u \cdot \vec v}{|\vec u|}$`, R`$\frac{\vec u \cdot \vec v}{|\vec v|}$`, R`$\vec u \cdot \vec v$`, R`$\frac{|\vec v|}{|\vec u|}$`], corretta: 0, spiegazione: R`È $|\vec v| \cos\theta$, cioè il prodotto scalare diviso per il modulo del vettore su cui si proietta. Dividendo per $|\vec v|$ si troverebbe invece la componente di $\vec u$ lungo $\vec v$.` },
    { id: 'q-16', domanda: R`Quale vettore è parallelo a $(2; -3)$?`, opzioni: [R`$(3; 2)$`, R`$(-2; -3)$`, R`$(4; -3)$`, R`$(-4; 6)$`], corretta: 3, spiegazione: R`$(-4; 6) = -2 \cdot (2; -3)$: è un multiplo, quindi è parallelo, con verso opposto. $(3; 2)$ è perpendicolare, perché $6 - 6 = 0$. Negli altri due le componenti non sono proporzionali.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di fare i conti, disegna le frecce a mano. Uno schizzo dice già il segno delle componenti e se l'angolo è acuto o ottuso.` },
    { tipo: 'errore', testo: R`Le componenti di $\vec{AB}$ sono $B - A$: arrivo meno partenza. Con $A - B$ trovi il vettore opposto, con tutti i segni sbagliati.` },
    { tipo: 'errore', testo: R`$|\vec u + \vec v|$ non è $|\vec u| + |\vec v|$. Prima fai la somma con le componenti, poi calcoli il modulo.` },
    { tipo: 'trucco', testo: R`Per un vettore perpendicolare a $(a; b)$ scambia le componenti e cambia un segno: $(-b; a)$. Il prodotto scalare fa zero.` },
    { tipo: 'errore', testo: R`La calcolatrice dà l'arcotangente fra $-90^\circ$ e $90^\circ$. Se la prima componente è negativa, aggiungi $180^\circ$.` },
    { tipo: 'errore', testo: R`Il prodotto scalare è un numero. Se ti viene una coppia, hai dimenticato di sommare i due prodotti.` },
    { tipo: 'trucco', testo: R`Il segno di $\vec u \cdot \vec v$ dice subito com'è l'angolo: positivo acuto, zero retto, negativo ottuso. Usalo per controllare l'angolo che trovi.` },
    { tipo: 'metodo', testo: R`Forze date con modulo e angolo? Passa alle componenti con coseno e seno, somma i numeri, poi torna a modulo e angolo.` },
    { tipo: 'errore', testo: R`$-3\vec v$ è lungo $3|\vec v|$, non $-3|\vec v|$. Un modulo non è mai negativo: il segno meno cambia solo il verso.` }
  ],

  aneddoti: [
    { matematico: 'Simon Stevin', anni: '1548 circa–1620', titolo: 'La collana di sfere che sta ferma', testo: R`Simon Stevin era un ingegnere fiammingo, nato a Bruges. Nel 1586 pubblicò un libro di statica, *De Beghinselen der Weeghconst*, «I principi dell'arte di pesare». Sul frontespizio mise un disegno diventato famoso. Una collana di sfere uguali è appoggiata su un prisma triangolare, con due facce di lunghezza diversa. Se la collana cominciasse a scivolare, girerebbe per sempre: ma il moto perpetuo è impossibile, quindi resta ferma. La parte che pende sotto è simmetrica e si può togliere. Allora le sfere sulle due facce si fanno equilibrio, anche se su quella lunga ce ne sono di più. Da qui Stevin ricavò le leggi del piano inclinato. Sotto il disegno scrisse un motto: «un prodigio che non è un prodigio».`, legame: R`Sul piano inclinato Stevin spezzava il peso in una parte lungo la faccia e una che la preme: è la proiezione di un vettore su una direzione.` },
    { matematico: 'Giusto Bellavitis', anni: '1803–1880', titolo: 'L\'impiegato di Bassano e le equipollenze', testo: R`Giusto Bellavitis nacque a Bassano, in Veneto, e non frequentò l'università: la matematica la studiò da solo. Per molti anni lavorò come impiegato negli uffici del comune della sua città. Nel tempo libero faceva ricerca. Nel 1835 pubblicò un saggio su un metodo nuovo, il **calcolo delle equipollenze**. Due segmenti orientati erano *equipollenti* se avevano la stessa lunghezza, la stessa direzione e lo stesso verso. Bellavitis insegnava a sommarli mettendoli in fila, e così risolveva problemi di geometria con poche righe di calcolo. È l'idea di vettori uguali che usiamo ancora oggi. Nel 1845 diventò professore all'Università di Padova, e più tardi senatore del Regno d'Italia.`, legame: R`I segmenti equipollenti di Bellavitis sono le frecce con stesso modulo, direzione e verso: rappresentano lo stesso vettore.` },
    { matematico: 'Gaspard-Gustave de Coriolis', anni: '1792–1843', titolo: 'Un nome per la fatica delle macchine', testo: R`Gaspard-Gustave de Coriolis studiò all'École polytechnique di Parigi, dove poi insegnò analisi. La meccanica la insegnò in altre scuole della città. Gli ingegneri del suo tempo volevano misurare quanto rende una macchina: un mulino, una pompa, una macchina a vapore. Nel 1829 Coriolis pubblicò un libro su questo, *Du calcul de l'effet des machines*. Lì usò la parola *travail*, cioè **lavoro**, per il prodotto fra la forza e lo spostamento nella direzione della forza. Nello stesso libro scrisse l'energia di un corpo in moto con il fattore un mezzo davanti, come la scriviamo oggi. Qualche anno dopo studiò che cosa succede nei sistemi che ruotano. Da quel lavoro prende il nome la forza di Coriolis, che fa girare i venti intorno ai cicloni.`, legame: R`Il lavoro di Coriolis, forza per spostamento nella stessa direzione, è il prodotto scalare $\vec F \cdot \vec s$ della sezione sulle applicazioni.` }
  ]
});
})();
