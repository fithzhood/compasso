(function () {
const R = String.raw;
/* allenamento: una sola risposta, ma con il tipo 'numeri', che pesca il numero dentro la scritta:
   così passano anche «36,87°» e «5 cm» (con 'numero' il segno ° la bocciava). Non legge le radici,
   perciò i risultati irrazionali si chiedono con due decimali. Tolleranza 0,015 per chi arrotonda a metà conto. */
const num = (v, tol) => ({ tipo: 'numeri', valori: [v], tolleranza: tol, segnaposto: tol ? 'due decimali, es. 4,33' : 'solo il numero, es. 6', simboli: [] });
const gradi = (v, tol) => ({ tipo: 'numeri', valori: [v], tolleranza: tol, segnaposto: tol ? 'in gradi, due decimali, es. 41,81' : 'in gradi, es. 45', simboli: ['°'] });
COMPASSO.registra({
  id: 'trigonometria',
  titolo: 'Trigonometria',

  introduzione: R`Vuoi sapere quanto è alto un campanile, ma non puoi salirci. Puoi misurare quanto sei lontano dalla base e sotto che angolo vedi la cima. Con questi due numeri calcoli l'altezza.

La **trigonometria** serve a questo: ricava i lati e gli angoli che non puoi misurare da quelli che puoi misurare. Prima vengono i triangoli rettangoli, poi i triangoli qualunque.

Ti servono seno, coseno e tangente, con i loro valori negli angoli notevoli, e il teorema di Pitagora. Tieni vicino una calcolatrice scientifica impostata in gradi.`,

  inBreve: [
    R`In un triangolo rettangolo un cateto è l'ipotenusa per il seno dell'angolo **opposto**, o per il coseno dell'angolo **adiacente**. È anche l'altro cateto per la tangente dell'angolo opposto.`,
    R`Opposto e adiacente dipendono dall'angolo che guardi. Segna sempre l'angolo sulla figura, prima di scegliere la formula.`,
    R`L'area di un triangolo è $\frac12 ab\sin\gamma$, con $\gamma$ l'angolo **compreso** fra i due lati.`,
    R`Teorema dei seni: un lato diviso il seno dell'angolo opposto dà lo stesso numero per tutti e tre i lati. Serve quando conosci un lato e l'angolo di fronte. Con due lati e un angolo non compreso i triangoli possono essere due.`,
    R`Teorema del coseno: $c^2=a^2+b^2-2ab\cos\gamma$. È Pitagora corretto per un angolo non retto.`
  ],

  sezioni: [
    { id: 'teoremi-triangoli-rettangoli', titolo: 'I teoremi sui triangoli rettangoli', testo: R`Una scala lunga $5\ \text{m}$ è appoggiata a un muro e forma con il pavimento un angolo di $60^\circ$. A che altezza tocca il muro? La scala è l'ipotenusa di un triangolo rettangolo, e l'altezza è un cateto.

Guarda un angolo acuto $\alpha$. Il cateto **opposto** sta di fronte ad $\alpha$ e non lo tocca. Il cateto **adiacente** forma $\alpha$ insieme all'ipotenusa.

[[grafico:rettangoloAlpha]]

Nel grafico tieni fermo l'angolo e ingrandisci il triangolo. I lati cambiano, ma i rapporti fra i lati restano uguali. Quei rapporti dipendono solo dall'angolo:

- $\sin\alpha$ è il cateto opposto diviso l'ipotenusa;
- $\cos\alpha$ è il cateto adiacente diviso l'ipotenusa;
- $\tan\alpha$ è il cateto opposto diviso il cateto adiacente.

Moltiplica per l'ipotenusa, o per l'altro cateto, e ottieni i due teoremi.

>* **Primo teorema:** un cateto è l'ipotenusa per il seno dell'angolo **opposto**, oppure per il coseno dell'angolo **adiacente**: $$a = c\sin\alpha \qquad\qquad b = c\cos\alpha$$ **Secondo teorema:** un cateto è l'altro cateto per la tangente dell'angolo opposto al primo: $$a = b\tan\alpha$$

Con la scala: l'altezza è opposta all'angolo di $60^\circ$, quindi $h = 5\sin 60^\circ = 5 \cdot \dfrac{\sqrt3}{2} \approx 4{,}33\ \text{m}$. Il piede della scala dista dal muro $5\cos 60^\circ = 2{,}5\ \text{m}$.

Il secondo teorema viene dal primo:

~ a = c\sin\alpha \qquad b = c\cos\alpha :: le due formule del primo teorema
~ \dfrac{a}{b} = \dfrac{\evid{c}\sin\alpha}{\evid{c}\cos\alpha} :: divido la prima per la seconda: $c$ si semplifica
~ \dfrac{a}{b} = \evid{\tan\alpha} :: seno diviso coseno è la tangente
~ a = \evidb{b\tan\alpha} :: moltiplico per $b$: è il secondo teorema

>! Lo stesso cateto $a$ è opposto ad $\alpha$, ma adiacente all'altro angolo acuto $\beta$. Prima di scrivere la formula, segna l'angolo sulla figura.

?? Il triangolo è rettangolo, con ipotenusa $c$. L'angolo acuto $\beta$ sta di fronte al cateto $b$. Quanto vale $b$?
[x] $c\sin\beta$
[ ] $c\cos\beta$
[ ] $c\tan\beta$
=> $b$ sta di fronte a $\beta$: è il cateto opposto, quindi ipotenusa per il seno. Chi sceglie $c\cos\beta$ pensa ancora ad $\alpha$. La tangente lega i due cateti, non un cateto e l'ipotenusa.` },

    { id: 'risoluzione-triangoli-rettangoli', titolo: 'Risolvere un triangolo rettangolo', testo: R`**Risolvere** un triangolo vuol dire trovare tutti i suoi lati e tutti i suoi angoli. Nel triangolo rettangolo l'angolo retto lo conosci già. Bastano altri **due** elementi, e almeno uno deve essere un lato.

Gli strumenti sono i due teoremi, Pitagora e $\alpha + \beta = 90^\circ$, perché gli angoli acuti sono complementari.

| dati | da dove parti |
|---|---|
| ipotenusa e un angolo acuto | i cateti con il primo teorema |
| un cateto e un angolo acuto | l'altro cateto con il secondo teorema, l'ipotenusa con il primo |
| i due cateti | l'ipotenusa con Pitagora, l'angolo con $\tan\alpha = \frac{a}{b}$ |
| ipotenusa e un cateto | l'altro cateto con Pitagora, l'angolo con $\sin\alpha = \frac{a}{c}$ |

Conosci la tangente e ti serve l'angolo? Usa la funzione inversa della calcolatrice, $\arctan$, che sul tasto è scritta $\tan^{-1}$. Allo stesso modo ci sono $\arcsin$ e $\arccos$. Esempio con i cateti $a = 3$ e $b = 4$:

~ c = \sqrt{a^2 + b^2} = \sqrt{9 + 16} = \evidb{5} :: l'ipotenusa con Pitagora
~ \tan\alpha = \dfrac{a}{b} = \evid{\dfrac{3}{4}} = 0{,}75 :: $a$ è opposto ad $\alpha$, $b$ è adiacente
~ \alpha = \arctan 0{,}75 \approx \evidb{36{,}87^\circ} :: la funzione inversa restituisce l'angolo
~ \beta = 90^\circ - 36{,}87^\circ = \evidb{53{,}13^\circ} :: gli angoli acuti sono complementari

?? Di un triangolo rettangolo conosci solo i due angoli acuti, $30^\circ$ e $60^\circ$. Puoi trovare i lati?
[ ] sì, con i teoremi
[ ] sì, con Pitagora
[x] no
=> Manca un lato. I lati $1$, $2$, $\sqrt3$ e i lati $10$, $20$, $10\sqrt3$ danno gli stessi angoli.

>! Controlla che la calcolatrice sia in gradi (DEG), non in radianti (RAD). In radianti $\arctan 0{,}75$ dà $0{,}6435$, che non è un angolo in gradi.` },

    { id: 'applicazioni', titolo: 'Applicazioni: altezze, angoli di elevazione, pendenze', testo: R`Sei a $40\ \text{m}$ dalla base di un campanile e guardi la cima. La linea dei tuoi occhi forma con l'orizzontale un angolo di $35^\circ$. I tuoi occhi, la cima e il punto del campanile all'altezza degli occhi formano un triangolo rettangolo.

>* **Angolo di elevazione:** l'angolo fra l'orizzontale e la linea verso un oggetto più in alto di te. **Angolo di depressione:** lo stesso, verso un oggetto più in basso. La depressione da $A$ verso $B$ è uguale all'elevazione da $B$ verso $A$, perché sono angoli alterni interni.

?? Quale conto dà il tratto di campanile sopra i tuoi occhi?
[x] $40\tan 35^\circ$
[ ] $40\sin 35^\circ$
[ ] $\dfrac{40}{\tan 35^\circ}$
=> I $40\ \text{m}$ sono il cateto adiacente, l'altezza è il cateto opposto: serve la tangente. Con il seno ti servirebbe l'ipotenusa, che non conosci. Dividere per la tangente dà un cateto adiacente.

Il conto completo, con gli occhi a $1{,}6\ \text{m}$ da terra:

~ x = d\tan\alpha :: $x$ è il tratto di campanile sopra l'altezza degli occhi (secondo teorema)
~ x = 40 \cdot \tan 35^\circ \approx 40 \cdot 0{,}700 \approx \evid{28{,}0} :: con la calcolatrice in gradi
~ h = \evid{1{,}6} + 28{,}0 = \evidb{29{,}6\ \text{m}} :: aggiungo il tratto dal suolo agli occhi

Nella scheda **Laboratorio** c'è *Misura la torre*: punti il clinometro sulla cima e fai proprio questo conto.

>! Il triangolo parte dai tuoi occhi. Se il testo dà l'altezza dell'osservatore, sommala alla fine. Se non la dà, l'osservatore è a terra.

**Pendenza di una strada.** Un cartello del $10\%$ vuol dire: ogni $100\ \text{m}$ in orizzontale sali di $10\ \text{m}$. La pendenza è la tangente dell'angolo di salita, in percentuale: $p = 100\tan\alpha$. Una pendenza del $100\%$ vuol dire $\tan\alpha = 1$, cioè $45^\circ$.` },

    { id: 'area-triangolo', titolo: "Area di un triangolo con due lati e l'angolo compreso", testo: R`Di un triangolo conosci due lati, $a = 8\ \text{cm}$ e $b = 5\ \text{cm}$, e l'angolo fra loro, $\gamma = 30^\circ$. Per l'area ti serve l'altezza, e la ricavi dall'angolo.

Prendi $a$ come base. L'altezza $h$ forma un triangolo rettangolo con ipotenusa $b$. In quel triangolo $h$ è il cateto opposto a $\gamma$:

~ h = b\sin\gamma :: primo teorema: cateto uguale ipotenusa per il seno dell'angolo opposto
~ \text{Area} = \dfrac{1}{2}\,a\,\evid{h} :: la solita formula, base per altezza diviso due
~ \text{Area} = \dfrac{1}{2}\,a\,\evid{b\sin\gamma} :: al posto di $h$ metto quello che ho trovato
~ \text{Area} = \dfrac{1}{2}\cdot 8 \cdot 5 \cdot \sin 30^\circ = \evidb{10\ \text{cm}^2} :: con i numeri: $20 \cdot \frac12 = 10$

>* **Area con due lati e l'angolo compreso:** $$\text{Area} = \frac{1}{2}\,a\,b\,\sin\gamma$$ L'angolo è quello **compreso** fra i due lati che usi.

Se $\gamma$ è ottuso la formula vale lo stesso, perché $\sin\gamma$ resta positivo. Con $\gamma = 90^\circ$ si ha $\sin\gamma = 1$, e torna cateto per cateto diviso due.

[[grafico:triangoloArea]]

?? Due lati misurano $6$ e $10$. L'angolo **opposto** al lato $10$ misura $40^\circ$. L'area è $\frac12\cdot 6\cdot 10\cdot\sin 40^\circ$?
[ ] sì
[x] no
[ ] solo se $40^\circ$ è acuto
=> No. L'altezza viene $b\sin\gamma$ solo se $\gamma$ sta fra i due lati. Qui prima devi ricavare l'angolo compreso, con il teorema dei seni.` },

    { id: 'teorema-della-corda', titolo: 'Il teorema della corda', testo: R`In una circonferenza prendi una corda $AB$ e un punto $V$ sull'arco più grande. L'angolo $A\widehat{V}B$ è un **angolo alla circonferenza**. Se sposti $V$ lungo l'arco, quell'angolo non cambia. Provalo nel grafico.

[[grafico:cordaCirconferenza]]

Allora metti $V$ nel posto più comodo: all'altro estremo del diametro che parte da $A$. Chiama $A'$ quel punto e guarda il triangolo $ABA'$:

~ A\widehat{B}A' = 90^\circ :: è inscritto in una semicirconferenza (teorema di Talete)
~ A\widehat{A'}B = \gamma :: insiste sulla stessa corda $AB$, quindi è uguale all'angolo in $V$
~ AB = \evid{AA'} \cdot \sin\gamma :: primo teorema: $AB$ è il cateto opposto a $\gamma$, $AA'$ l'ipotenusa
~ AB = \evidb{2R\sin\gamma} :: l'ipotenusa $AA'$ è un diametro

>* **Teorema della corda:** una corda è uguale al diametro per il seno di un qualunque angolo alla circonferenza che insiste su di essa: $$AB = 2R\sin\gamma$$

Esempio: raggio $7{,}5\ \text{cm}$ e corda di $10\ \text{cm}$. Allora $\sin\gamma = \dfrac{10}{15} \approx 0{,}667$, quindi $\gamma \approx 41{,}81^\circ$. Dall'arco **piccolo** la corda si vede sotto $180^\circ - 41{,}81^\circ = 138{,}19^\circ$, che ha lo stesso seno.

?? In una circonferenza di raggio $R$ c'è una corda lunga proprio $R$. Sotto che angolo acuto la vede un punto della circonferenza?
[x] $30^\circ$
[ ] $60^\circ$
[ ] $90^\circ$
=> $\sin\gamma = \frac{R}{2R} = \frac12$, quindi $\gamma = 30^\circ$. $60^\circ$ è l'angolo **al centro**, che è il doppio.

>! Nella formula c'è $2R$, il **diametro**. Scrivere $AB = R\sin\gamma$ è l'errore più comune.` },

    { id: 'teorema-dei-seni', titolo: 'Il teorema dei seni e il caso ambiguo', testo: R`Ogni triangolo ha una **circonferenza circoscritta**, che passa per i tre vertici. Chiama $R$ il suo raggio. Ogni lato è una corda di questa circonferenza, e l'angolo opposto insiste su quella corda. Quindi vale il teorema della corda:

~ a = 2R\sin\alpha :: teorema della corda per il lato $a$ e l'angolo opposto $\alpha$
~ \dfrac{a}{\sin\alpha} = \evid{2R} :: divido per $\sin\alpha$
~ \dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma} = \evidb{2R} :: con $b$ e $c$ il conto è identico: i tre rapporti valgono tutti $2R$

>* **Teorema dei seni:** in ogni triangolo il rapporto fra un lato e il seno dell'angolo opposto è sempre lo stesso: $$\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R$$

Per usarlo ti serve una **coppia completa**: un lato e l'angolo di fronte. Da quella coppia ricavi il rapporto. Con il rapporto trovi gli altri lati, o gli altri angoli.

### Il caso ambiguo

Conosci due lati $a$, $b$ e l'angolo $\alpha$ opposto ad $a$. Il teorema dei seni dà $\sin\beta = \dfrac{b\sin\alpha}{a}$. Ma fra $0^\circ$ e $180^\circ$ ci sono **due** angoli con lo stesso seno: uno acuto e il suo supplementare. A volte vanno bene tutti e due.

[[grafico:casoAmbiguo]]

Nel grafico il lato $a$ parte da $C$ e deve toccare la semiretta che parte da $A$. La distanza di $C$ dalla semiretta è $b\sin\alpha$. Con $\alpha$ acuto:

| confronto | triangoli |
|---|---|
| $a < b\sin\alpha$ | nessuno: $a$ non arriva alla semiretta |
| $a = b\sin\alpha$ | uno, con $\beta = 90^\circ$ |
| $b\sin\alpha < a < b$ | **due** |
| $a \ge b$ | uno |

Esempio: $a = 5$, $b = 8$, $\alpha = 30^\circ$. Qui $b\sin\alpha = 4$ e $4 < 5 < 8$: i triangoli sono due.

~ \sin\beta = \dfrac{b\sin\alpha}{a} = \dfrac{8 \cdot 0{,}5}{5} = \evid{0{,}8} :: teorema dei seni risolto rispetto a $\sin\beta$
~ \beta_1 = \arcsin 0{,}8 \approx \evidb{53{,}13^\circ} :: la calcolatrice dà solo l'angolo acuto
~ \beta_2 = 180^\circ - 53{,}13^\circ = \evidb{126{,}87^\circ} :: il supplementare ha lo stesso seno
~ \alpha + \beta_2 = 156{,}87^\circ < 180^\circ :: $30^\circ + 126{,}87^\circ$: resta posto per il terzo angolo, quindi anche $\beta_2$ va bene

>! La calcolatrice con $\arcsin$ ti dà solo l'angolo acuto. Il supplementare lo controlli tu: se sommato all'angolo noto resta sotto $180^\circ$, è una seconda soluzione.

?? Con $a = 10$, $b = 8$ e $\alpha = 30^\circ$ opposto ad $a$, quanti triangoli ci sono?
[x] uno
[ ] due
[ ] nessuno
=> Da $\sin\beta = \frac{8\cdot 0{,}5}{10} = 0{,}4$ vengono $\beta \approx 23{,}58^\circ$ e $156{,}42^\circ$. Ma $30^\circ + 156{,}42^\circ$ supera $180^\circ$, quindi il secondo non va bene.` },

    { id: 'teorema-del-coseno', titolo: 'Il teorema del coseno (di Carnot)', testo: R`Di un triangolo conosci due lati e l'angolo **fra** loro. Nessun lato ha di fronte un angolo noto, quindi il teorema dei seni non parte. Serve il teorema di Pitagora, corretto.

Pitagora vale solo se l'angolo fra $a$ e $b$ è retto. Se l'angolo si chiude, il lato di fronte si accorcia. Se si apre, si allunga. Prova nel grafico.

[[grafico:carnot]]

>* **Teorema del coseno (di Carnot):** $$c^2 = a^2 + b^2 - 2ab\cos\gamma$$ dove $\gamma$ è l'angolo **compreso** fra $a$ e $b$, cioè quello di fronte a $c$.

Con $\gamma = 90^\circ$ si ha $\cos\gamma = 0$, e torna Pitagora. Con $\gamma$ ottuso $\cos\gamma$ è negativo: togliere un numero negativo vuol dire aggiungere, e $c$ si allunga.

Per dimostrarlo metti il vertice di $\gamma$ nell'origine e il lato $a$ sull'asse $x$. Gli estremi di $c$ sono $(a;\ 0)$ e $(b\cos\gamma;\ b\sin\gamma)$, e $c$ è la loro distanza:

~ c^2 = (b\cos\gamma - a)^2 + (b\sin\gamma)^2 :: distanza fra due punti, al quadrato
~ \begin{array}{rl} &= \evid{b^2\cos^2\gamma - 2ab\cos\gamma + a^2} \\ &\quad {}+ b^2\sin^2\gamma \end{array} :: sviluppo il quadrato del binomio
~ = \evid{b^2(\cos^2\gamma + \sin^2\gamma)} + a^2 - 2ab\cos\gamma :: raccolgo $b^2$ fra il primo e l'ultimo termine
~ c^2 = \evidb{a^2 + b^2 - 2ab\cos\gamma} :: $\cos^2\gamma + \sin^2\gamma = 1$

Esempio: $a = 6\ \text{cm}$, $b = 9\ \text{cm}$, $\gamma = 70^\circ$. Allora $c^2 = 36 + 81 - 108\cos 70^\circ \approx 117 - 36{,}94 = 80{,}06$, quindi $c \approx 8{,}95\ \text{cm}$.

?? Un triangolo ha $a = 3$, $b = 5$ e l'angolo fra loro $\gamma = 120^\circ$. Quanto vale $c^2$?
[x] $49$
[ ] $19$
[ ] $34$
=> $c^2 = 9 + 25 - 2\cdot 3\cdot 5\cos 120^\circ = 34 - 30\cdot\left(-\frac12\right) = 34 + 15 = 49$. Con $19$ hai tolto $15$ invece di aggiungerlo. $34$ è Pitagora, che qui non vale.

Con tre lati trovi un angolo, isolando il coseno: $$\cos\gamma = \frac{a^2 + b^2 - c^2}{2ab}$$

>! L'angolo della formula è quello **compreso** fra i due lati che moltiplichi. È l'angolo di fronte al lato che sta da solo a sinistra.` },

    { id: 'risoluzione-triangoli-qualunque', titolo: 'Risolvere un triangolo qualunque', testo: R`Un triangolo ha tre lati e tre angoli. Per trovarli tutti ne servono tre, e almeno uno deve essere un lato. Da quali tre conosci dipende da dove parti:

| dati | si comincia con |
|---|---|
| tre lati (LLL) | teorema del coseno, per trovare un angolo |
| due lati e l'angolo compreso (LAL) | teorema del coseno, per trovare il terzo lato |
| due angoli e un lato (ALA, AAL) | il terzo angolo per differenza da $180^\circ$, poi il teorema dei seni |
| due lati e un angolo non compreso (LLA) | teorema dei seni, controllando il caso ambiguo |

>* Il teorema dei seni ha bisogno di una **coppia completa**, un lato e l'angolo di fronte. Se ce l'hai, parti dai seni. Se non ce l'hai, parti dal coseno.

Esempio (ALA): $\alpha = 50^\circ$, $\beta = 60^\circ$, $a = 10\ \text{cm}$.

~ \gamma = 180^\circ - 50^\circ - 60^\circ = \evidb{70^\circ} :: gli angoli di un triangolo sommano $180^\circ$
~ \dfrac{a}{\sin\alpha} = \dfrac{10}{\sin 50^\circ} \approx \evid{13{,}054} :: $a$ e $\alpha$ sono la coppia completa: danno il rapporto
~ b = 13{,}054 \cdot \sin 60^\circ \approx \evidb{11{,}31\ \text{cm}} :: lo stesso rapporto vale per $b$ e $\beta$
~ c = 13{,}054 \cdot \sin 70^\circ \approx \evidb{12{,}27\ \text{cm}} :: e per $c$ e $\gamma$

?? Di un triangolo conosci $a = 7$, $b = 9$ e l'angolo $\gamma = 50^\circ$ compreso fra loro. Con che cosa cominci?
[x] teorema del coseno
[ ] teorema dei seni
[ ] somma degli angoli
=> $\gamma$ sta di fronte a $c$, che non conosci: non hai una coppia completa. Il teorema del coseno invece dà subito $c$.

Nel caso LLL cerca prima l'angolo di fronte al lato **più lungo**. È l'unico che può essere ottuso, e il coseno lo riconosce perché viene negativo.

>! Alla fine controlla che gli angoli sommino $180^\circ$, a meno degli arrotondamenti.` },

    { id: 'problemi-geometria', titolo: 'Problemi di geometria: quadrilateri, poligoni, triangolazione', testo: R`Molte figure si risolvono tagliandole in triangoli.

### Poligoni regolari

L'**apotema** di un poligono regolare è la distanza del centro da un lato. Unisci il centro con i vertici: il poligono si divide in triangoli isosceli uguali. L'apotema è l'altezza di uno di loro, e lo taglia in due triangoli rettangoli. Con $n$ lati lunghi $l$:

~ \text{angolo al centro} = \dfrac{360^\circ}{n} :: il centro vede ogni lato sotto lo stesso angolo
~ \text{metà} = \dfrac{180^\circ}{n} :: l'apotema taglia a metà l'angolo al centro e il lato
~ \dfrac{l}{2} = \text{apotema}\cdot\tan\dfrac{180^\circ}{n} :: secondo teorema: $\frac{l}{2}$ è opposto a quell'angolo, l'apotema è adiacente
~ \text{apotema} = \evidb{\dfrac{l}{2\tan\left(\frac{180^\circ}{n}\right)}} :: isolo l'apotema

Pentagono di lato $6\ \text{cm}$: $\text{apotema} = \dfrac{6}{2\tan 36^\circ} \approx 4{,}13\ \text{cm}$. L'area è $\frac12 \cdot \text{perimetro} \cdot \text{apotema}$, cioè $\frac12 \cdot 30 \cdot 4{,}129 \approx 61{,}94\ \text{cm}^2$.

### Quadrilateri

Una diagonale divide un quadrilatero in due triangoli. L'area è la somma delle due aree, ciascuna con $\frac12 ab\sin\gamma$. Se conosci le diagonali e l'angolo $\theta$ fra loro, c'è una formula diretta:

>* **Area di un quadrilatero dalle diagonali:** $$\text{Area} = \frac{1}{2}\,d_1 d_2 \sin\theta$$

Le diagonali tagliano il quadrilatero in quattro triangoli. Ognuno ha area $\frac12\cdot(\text{pezzo di } d_1)\cdot(\text{pezzo di } d_2)\cdot\sin\theta$, perché $\theta$ e $180^\circ - \theta$ hanno lo stesso seno. Sommando, i pezzi ricompongono le diagonali intere.

Con $d_1 = 8\ \text{cm}$, $d_2 = 10\ \text{cm}$ e $\theta = 70^\circ$: $\text{Area} \approx \frac12\cdot 8\cdot 10\cdot 0{,}940 \approx 37{,}59\ \text{cm}^2$.

>! L'angolo $\theta$ è quello fra le **diagonali**, dove si incrociano. Non è un angolo del quadrilatero.

### Triangolazione

Con la **triangolazione** misuri una distanza che non puoi percorrere, per esempio fra due cime. Misuri una base e i due angoli ai suoi estremi, poi usi il teorema dei seni.` }
  ],

  grafici: {
    rettangoloAlpha: {
      tipo: 'piano', x: [-0.4, 5], y: [-0.6, 5.6], assi: false, griglia: false,
      parametri: [
        { nome: 'alpha', min: 20, max: 50, passo: 1, valore: 35, etichetta: 'α (gradi)' },
        { nome: 'k', min: 1.5, max: 4.5, passo: 0.1, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], ['k', 0], ['k', 'k*tan(alpha*pi/180)']], riempi: true, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: ['k', 0], etichetta: 'b', colore: 2 },
        { tipo: 'segmento', da: ['k', 0], a: ['k', 'k*tan(alpha*pi/180)'], etichetta: 'a', colore: 3 },
        { tipo: 'segmento', da: ['k', 'k*tan(alpha*pi/180)'], a: [0, 0], etichetta: 'c', colore: 4 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['k', 'k*tan(alpha*pi/180)'], etichetta: 'α', raggio: 0.8, colore: 1 },
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: ['k', 0], trascina: true, etichetta: 'B', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['k', 'k*tan(alpha*pi/180)'], etichetta: 'C', posizione: 'destra' },
        { tipo: 'testo', p: [-1.6, 5.3], testo: 'a = {{k*tan(alpha*pi/180)}}  |  c = {{k/cos(alpha*pi/180)}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.6, 4.6], testo: 'a : c = {{(k*tan(alpha*pi/180))/(k/cos(alpha*pi/180))}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.6, 3.9], testo: 'b : c = {{k/(k/cos(alpha*pi/180))}}', ancora: 'start' }
      ],
      didascalia: "Trascina B per ingrandire o rimpicciolire il triangolo: a e c cambiano, i rapporti a : c e b : c no. Poi cambia α con il cursore: adesso i rapporti cambiano. Dipendono solo dall'angolo: sono sin α e cos α."
    },
    triangoloArea: {
      tipo: 'piano', x: [-2, 8], y: [-1, 7.5], assi: false, griglia: false,
      parametri: [
        { nome: 'cx', min: -1, max: 7, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'cy', min: 0.5, max: 6.5, passo: 0.5, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'segmento', da: ['cx', 0], a: ['cx', 'cy'], etichetta: 'h', tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: [0, 0], a: [6, 0], etichetta: 'AB = 6' },
        { tipo: 'segmento', da: [0, 0], a: ['cx', 'cy'], etichetta: 'AC', colore: 1 },
        { tipo: 'segmento', da: [6, 0], a: ['cx', 'cy'], colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [6, 0], a: ['cx', 'cy'], raggio: 0.8, colore: 2 },
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [6, 0], etichetta: 'B', posizione: 'basso' },
        { tipo: 'punto', p: ['cx', 'cy'], trascina: true, etichetta: 'C', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-1.8, 7.1], testo: 'AC = {{sqrt(cx^2+cy^2)}}  |  angolo A = {{acos(cx/sqrt(cx^2+cy^2))*180/pi}}°', ancora: 'start' },
        { tipo: 'testo', p: [-1.8, 6.4], testo: 'AC · sin A = {{sqrt(cx^2+cy^2)*sin(acos(cx/sqrt(cx^2+cy^2)))}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.8, 5.7], testo: 'area = ½ · 6 · AC · sin A = {{3*cy}}', ancora: 'start' }
      ],
      didascalia: "Trascina C in orizzontale, senza cambiarne l'altezza: il lato AC e l'angolo A cambiano, l'area no. Guarda AC · sin A: è sempre l'altezza h. Poi trascina C in su e in giù."
    },
    cordaCirconferenza: {
      tipo: 'piano', x: [-4.2, 4.2], y: [-3.4, 4.8], assi: false, griglia: false,
      parametri: [
        { nome: 'vx', min: -2.8, max: 2.8, passo: 0.05, valore: -1.2, nascosto: true }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 3 },
        { tipo: 'segmento', da: [-2.4, -1.8], a: [2.4, 1.8], tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: [2.4, 1.8], a: [2.4, -1.8], tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: [-2.4, -1.8], a: [2.4, -1.8], etichetta: 'corda AB', colore: 2 },
        { tipo: 'segmento', da: ['vx', 'sqrt(9-vx^2)'], a: [-2.4, -1.8], colore: 1 },
        { tipo: 'segmento', da: ['vx', 'sqrt(9-vx^2)'], a: [2.4, -1.8], colore: 1 },
        { tipo: 'angolo', vertice: ['vx', 'sqrt(9-vx^2)'], da: [-2.4, -1.8], a: [2.4, -1.8], etichetta: 'γ', raggio: 0.8, colore: 1 },
        { tipo: 'angolo', vertice: [2.4, 1.8], da: [-2.4, -1.8], a: [2.4, -1.8], raggio: 0.7, colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'sinistra' },
        { tipo: 'punto', p: [-2.4, -1.8], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [2.4, -1.8], etichetta: 'B', posizione: 'basso' },
        { tipo: 'punto', p: [2.4, 1.8], etichetta: "A′", posizione: 'destra', colore: 3 },
        { tipo: 'punto', p: ['vx', 'sqrt(9-vx^2)'], trascina: true, etichetta: 'V', posizione: 'alto', colore: 1 },
        { tipo: 'testo', p: [-4.1, 4.6], testo: 'γ = {{acos((vx^2-5.76+(1.8+sqrt(9-vx^2))^2)/(sqrt((2.4+vx)^2+(1.8+sqrt(9-vx^2))^2)*sqrt((2.4-vx)^2+(1.8+sqrt(9-vx^2))^2)))*180/pi}}°', ancora: 'start' },
        { tipo: 'testo', p: [-4.1, 4.0], testo: 'AB = 4,8  |  2R · sin γ = 6 · sin γ = {{6*sin(acos((vx^2-5.76+(1.8+sqrt(9-vx^2))^2)/(sqrt((2.4+vx)^2+(1.8+sqrt(9-vx^2))^2)*sqrt((2.4-vx)^2+(1.8+sqrt(9-vx^2))^2))))}}', ancora: 'start' }
      ],
      didascalia: "Trascina V lungo l'arco: l'angolo γ non cambia. Portalo sopra A′, all'estremo del diametro che parte da A: il triangolo ABA′ (tratteggiato) è rettangolo in B, e lì si vede che AB = 2R · sin γ. Il raggio è R = 3."
    },
    carnot: {
      tipo: 'piano', x: [-3.4, 4.8], y: [-0.8, 5.2], assi: false, griglia: false,
      parametri: [
        { nome: 'g', min: 20, max: 160, passo: 1, valore: 60, etichetta: 'γ (gradi)' }
      ],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [4, 0], ['3*cos(g*pi/180)', '3*sin(g*pi/180)']], riempi: true, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: [4, 0], etichetta: 'a = 4', colore: 2 },
        { tipo: 'segmento', da: ['3*cos(g*pi/180)', '3*sin(g*pi/180)'], a: [0, 0], etichetta: 'b = 3', colore: 3 },
        { tipo: 'segmento', da: [4, 0], a: ['3*cos(g*pi/180)', '3*sin(g*pi/180)'], etichetta: 'c', colore: 4 },
        { tipo: 'angolo', vertice: [0, 0], da: [4, 0], a: ['3*cos(g*pi/180)', '3*sin(g*pi/180)'], etichetta: 'γ', raggio: 0.7, colore: 1 },
        { tipo: 'testo', p: [-3.3, 4.9], testo: 'c² = {{(3*cos(g*pi/180)-4)^2+(3*sin(g*pi/180))^2}}  |  a² + b² = 25', ancora: 'start' },
        { tipo: 'testo', p: [-3.3, 4.2], testo: 'a² + b² − c² = {{25-((3*cos(g*pi/180)-4)^2+(3*sin(g*pi/180))^2)}}', ancora: 'start' },
        { tipo: 'testo', p: [-3.3, 3.5], testo: '2ab · cos γ = {{24*cos(g*pi/180)}}', ancora: 'start' }
      ],
      didascalia: "Muovi γ. A 90° c² vale proprio a² + b² = 25: è Pitagora. Con γ acuto c² è meno di 25, con γ ottuso di più. Confronta le ultime due righe: la differenza è sempre 2ab · cos γ."
    },
    casoAmbiguo: {
      tipo: 'piano', x: [-0.8, 12], y: [-1.2, 7], assi: false, griglia: false,
      parametri: [
        { nome: 'a', min: 2, max: 8.5, passo: 0.1, valore: 5, etichetta: 'a' }
      ],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [11.6, 6.7], tratteggio: true },
        { tipo: 'cerchio', centro: [7, 0], raggio: 'a', tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: [7, 0], etichetta: 'b = 7' },
        { tipo: 'segmento', da: [7, 0], a: [6.0621778*0.8660254, 3.0310889], tratteggio: true, colore: 4, etichetta: 'b·sin α' },
        { tipo: 'segmento', da: [7, 0], a: ['7+((a-3.499+abs(a-3.499))/(2*abs(a-3.499)+0.000001))*((6.0621778+sqrt((a^2-12.25+abs(a^2-12.25))/2))*0.8660254-7)', '((a-3.499+abs(a-3.499))/(2*abs(a-3.499)+0.000001))*(6.0621778+sqrt((a^2-12.25+abs(a^2-12.25))/2))*0.5'], colore: 1 },
        { tipo: 'segmento', da: [7, 0], a: ['7+(((a-3.499+abs(a-3.499))/(2*abs(a-3.499)+0.000001))*((6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2))+abs((6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2))))/(2*abs((6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2)))+0.000001))*((6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2))*0.8660254-7)', '(((a-3.499+abs(a-3.499))/(2*abs(a-3.499)+0.000001))*((6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2))+abs((6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2))))/(2*abs((6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2)))+0.000001))*(6.0621778-sqrt((a^2-12.25+abs(a^2-12.25))/2))*0.5'], colore: 2 },
        { tipo: 'angolo', vertice: [0, 0], da: [7, 0], a: [8.66, 5], etichetta: 'α', raggio: 1.3, colore: 4 },
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [7, 0], etichetta: 'C', posizione: 'basso' },
        { tipo: 'punto', p: ['(6.0621778+sqrt(a^2-12.25))*0.8660254', '(6.0621778+sqrt(a^2-12.25))*0.5'], etichetta: 'B₁', posizione: 'alto', colore: 1 },
        { tipo: 'punto', p: ['(6.0621778-sqrt(a^2-12.25))*0.8660254+0*sqrt(6.0621778-sqrt(a^2-12.25))', '(6.0621778-sqrt(a^2-12.25))*0.5+0*sqrt(6.0621778-sqrt(a^2-12.25))'], etichetta: 'B₂', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-0.6, 6.6], testo: 'a = {{a}}  |  b · sin α = 3,5  |  b = 7', ancora: 'start' },
        { tipo: 'testo', p: [-0.6, 5.9], testo: 'α = 30°', ancora: 'start' }
      ],
      didascalia: "Muovi a. Il lato a parte da C e deve toccare la semiretta da A: la circonferenza tratteggiata mostra dove può arrivare. Sotto 3,5 non la tocca (nessun triangolo); fra 3,5 e 7 la taglia in due punti, B₁ e B₂ (due triangoli); da 7 in su il secondo punto finisce dietro A (un triangolo solo)."
    }
  },

  esempi: [
    { titolo: 'Risolvere un triangolo rettangolo: ipotenusa e angolo', problema: R`Un triangolo rettangolo ha ipotenusa $c = 12\ \text{cm}$ e un angolo acuto $\alpha = 42^\circ$. Trova i due cateti e l'altro angolo.`, passi: [
      R`L'altro angolo acuto si trova subito: $\beta = 90^\circ - 42^\circ = 48^\circ$.`,
      R`Il cateto opposto ad $\alpha$: $a = c\sin\alpha = 12 \cdot \sin 42^\circ \approx 12 \cdot 0{,}6691 \approx 8{,}03\ \text{cm}$.`,
      R`Il cateto adiacente ad $\alpha$: $b = c\cos\alpha = 12 \cdot \cos 42^\circ \approx 12 \cdot 0{,}7431 \approx 8{,}92\ \text{cm}$.`,
      R`Verifica con Pitagora: $a^2+b^2 \approx 64{,}5 + 79{,}6 = 144{,}1 \approx 12^2$. ✓ (la piccola differenza è dovuta agli arrotondamenti)`
    ], risultato: R`$a \approx 8{,}03\ \text{cm}$, $\ b \approx 8{,}92\ \text{cm}$, $\ \beta = 48^\circ$` },

    { titolo: "Applicazione: l'altezza di una torre", problema: R`Da un punto a $40\ \text{m}$ dalla base di una torre, l'angolo di elevazione della cima è $35^\circ$. Quanto è alta la torre? (Trascura l'altezza degli occhi dell'osservatore.)`, passi: [
      R`La distanza orizzontale ($40\ \text{m}$) è il cateto adiacente all'angolo di elevazione; l'altezza $h$ cercata è il cateto opposto: si usa il secondo teorema, $h = d\tan\alpha$.`,
      R`$h = 40 \cdot \tan 35^\circ \approx 40 \cdot 0{,}7002 \approx 28{,}01\ \text{m}$.`,
      R`Il risultato è ragionevole: con un angolo minore di $45^\circ$ (dove $\tan 45^\circ = 1$), l'altezza deve venire minore della distanza orizzontale, e infatti $28 < 40$.`
    ], risultato: R`$h \approx 28{,}0\ \text{m}$` },

    { titolo: "Area con due lati e l'angolo compreso", problema: R`Un triangolo ha $a = 8\ \text{cm}$, $b = 5\ \text{cm}$ e l'angolo compreso $\gamma = 30^\circ$. Calcola l'area.`, passi: [
      R`Si applica direttamente la formula $\text{Area} = \frac{1}{2}ab\sin\gamma$, senza bisogno di conoscere l'altezza.`,
      R`$\text{Area} = \frac{1}{2}\cdot 8\cdot 5\cdot \sin 30^\circ = 20 \cdot 0{,}5 = 10\ \text{cm}^2$.`
    ], risultato: R`$\text{Area} = 10\ \text{cm}^2$` },

    { titolo: 'Teorema dei seni: due angoli e un lato', problema: R`In un triangolo, $\alpha = 50^\circ$, $\beta = 60^\circ$ e il lato $a$ (opposto ad $\alpha$) misura $10\ \text{cm}$. Trova $\gamma$, $b$ e $c$.`, passi: [
      R`Il terzo angolo si trova per differenza: $\gamma = 180^\circ - 50^\circ - 60^\circ = 70^\circ$.`,
      R`Il lato $a$ e l'angolo $\alpha$ sono una coppia completa (lato e angolo opposto): danno il rapporto comune del teorema dei seni, $\dfrac{a}{\sin\alpha} = \dfrac{10}{\sin 50^\circ} \approx 13{,}054$.`,
      R`Lo stesso rapporto vale per $b$ e $\beta$: $b = 13{,}054\cdot\sin 60^\circ \approx 11{,}31\ \text{cm}$.`,
      R`E per $c$ e $\gamma$: $c = 13{,}054\cdot\sin 70^\circ \approx 12{,}27\ \text{cm}$.`
    ], risultato: R`$\gamma = 70^\circ$, $\ b \approx 11{,}31\ \text{cm}$, $\ c \approx 12{,}27\ \text{cm}$` },

    { titolo: 'Il caso ambiguo del teorema dei seni', problema: R`In un triangolo, $a = 5\ \text{cm}$ (opposto ad $\alpha$), $b = 8\ \text{cm}$ e $\alpha = 30^\circ$. Trova tutte le possibili misure di $c$.`, passi: [
      R`Prima si controlla se il caso è ambiguo: $b\sin\alpha = 8 \cdot 0{,}5 = 4$. Poiché $4 < 5 < 8$ (cioè $b\sin\alpha < a < b$), esistono **due** triangoli.`,
      R`Dal teorema dei seni, $\sin\beta = \dfrac{b\sin\alpha}{a} = \dfrac{4}{5} = 0{,}8$, quindi $\beta_1 \approx 53{,}13^\circ$ oppure $\beta_2 = 180^\circ - 53{,}13^\circ \approx 126{,}87^\circ$.`,
      R`Il rapporto comune viene dalla coppia completa $a$, $\alpha$: $\dfrac{a}{\sin\alpha} = \dfrac{5}{0{,}5} = 10$.`,
      R`Primo triangolo: il terzo angolo è $\gamma_1 = 180^\circ - 30^\circ - 53{,}13^\circ \approx 96{,}87^\circ$, quindi $c_1 = 10\cdot\sin 96{,}87^\circ \approx 9{,}93\ \text{cm}$.`,
      R`Secondo triangolo: $\gamma_2 = 180^\circ - 30^\circ - 126{,}87^\circ \approx 23{,}13^\circ$, quindi $c_2 = 10\cdot\sin 23{,}13^\circ \approx 3{,}93\ \text{cm}$.`
    ], risultato: R`$c_1 \approx 9{,}93\ \text{cm}$ oppure $c_2 \approx 3{,}93\ \text{cm}$` },

    { titolo: 'Teorema del coseno: due lati e l\'angolo compreso', problema: R`Un triangolo ha $a = 6\ \text{cm}$, $b = 9\ \text{cm}$ e l'angolo compreso $\gamma = 70^\circ$. Trova il terzo lato $c$.`, passi: [
      R`Nessun lato ha di fronte un angolo noto, quindi il teorema dei seni non parte: si usa il teorema del coseno, $c^2 = a^2+b^2-2ab\cos\gamma$.`,
      R`$c^2 = 36 + 81 - 2\cdot 6\cdot 9\cdot\cos 70^\circ \approx 117 - 108\cdot 0{,}342 \approx 117 - 36{,}94 = 80{,}06$.`,
      R`$c \approx \sqrt{80{,}06} \approx 8{,}95\ \text{cm}$.`,
      R`Controllo di ragionevolezza: se $\gamma$ fosse stato $90^\circ$ (Pitagora), sarebbe stato $c = \sqrt{36+81} = \sqrt{117} \approx 10{,}82\ \text{cm}$; con $\gamma = 70^\circ < 90^\circ$ il lato $c$ deve venire più corto, e infatti $8{,}95 < 10{,}82$.`
    ], risultato: R`$c \approx 8{,}95\ \text{cm}$` }
  ],

  formulario: [
    { nome: 'Primo teorema (con il seno)', formula: R`a = c \sin\alpha`, nota: R`$a$ è il cateto opposto ad $\alpha$, $c$ l'ipotenusa.` },
    { nome: 'Primo teorema (con il coseno)', formula: R`b = c \cos\alpha`, nota: R`$b$ è il cateto adiacente ad $\alpha$.` },
    { nome: 'Secondo teorema', formula: R`a = b \tan\alpha`, nota: R`$a$ è il cateto opposto ad $\alpha$, $b$ l'altro cateto.` },
    { nome: 'Somma degli angoli di un triangolo', formula: R`\alpha + \beta + \gamma = 180^\circ` },
    { nome: "Area con due lati e l'angolo compreso", formula: R`\text{Area} = \frac{1}{2}\,a\,b\,\sin\gamma`, nota: R`$\gamma$ è l'angolo compreso fra i lati $a$ e $b$.` },
    { nome: 'Teorema della corda', formula: R`AB = 2R\sin\gamma`, nota: R`$R$ è il raggio della circonferenza, $\gamma$ l'angolo alla circonferenza che sottende $AB$.` },
    { nome: 'Teorema dei seni', formula: R`\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R`, nota: R`$R$ è il raggio della circonferenza circoscritta al triangolo.` },
    { nome: 'Teorema del coseno (di Carnot)', formula: R`c^2 = a^2 + b^2 - 2ab\cos\gamma`, nota: R`$\gamma$ è l'angolo compreso fra $a$ e $b$, opposto a $c$. Con $\gamma = 90^\circ$ si ritrova Pitagora.` },
    { nome: 'Pendenza di una strada', formula: R`p\% = 100 \cdot \tan\alpha`, nota: R`$\alpha$ è l'angolo di inclinazione rispetto all'orizzontale.` },
    { nome: 'Apotema di un poligono regolare', formula: R`\text{apotema} = \frac{l}{2\tan\left(\frac{180^\circ}{n}\right)}`, nota: R`$l$ è il lato, $n$ il numero dei lati.` },
    { nome: 'Area di un quadrilatero dalle diagonali', formula: R`\text{Area} = \frac{1}{2}\,d_1 d_2 \sin\theta`, nota: R`$d_1$, $d_2$ le diagonali, $\theta$ l'angolo fra loro nel punto di intersezione. Vale per un quadrilatero qualunque.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'teoremi-triangoli-rettangoli', tipo: 'formula', fronte: R`Primo teorema sui triangoli rettangoli`, retro: R`$a = c\sin\alpha$ (cateto = ipotenusa × seno dell'angolo opposto) oppure $b = c\cos\alpha$ (cateto = ipotenusa × coseno dell'angolo adiacente).` },
    { id: 'fc-02', sezione: 'teoremi-triangoli-rettangoli', tipo: 'formula', fronte: R`Secondo teorema sui triangoli rettangoli`, retro: R`$a = b\tan\alpha$: un cateto è uguale all'altro cateto per la tangente dell'angolo opposto al primo.` },
    { id: 'fc-03', sezione: 'teoremi-triangoli-rettangoli', tipo: 'concetto', fronte: R`Cateto opposto e cateto adiacente: da cosa dipendono?`, retro: R`Dipendono da quale angolo acuto si considera: lo stesso cateto è opposto a un angolo e adiacente all'altro.` },
    { id: 'fc-04', sezione: 'risoluzione-triangoli-rettangoli', tipo: 'procedura', fronte: R`I quattro casi per risolvere un triangolo rettangolo`, retro: R`1) Ipotenusa e un angolo. 2) Un cateto e un angolo. 3) I due cateti (Pitagora + arcotangente). 4) Ipotenusa e un cateto (Pitagora + arcoseno).` },
    { id: 'fc-05', sezione: 'risoluzione-triangoli-rettangoli', tipo: 'concetto', fronte: R`Come si trova il secondo angolo acuto, noto il primo?`, retro: R`$\beta = 90^\circ - \alpha$, perché l'angolo retto vale già $90^\circ$ e la somma degli angoli è $180^\circ$.` },
    { id: 'fc-06', sezione: 'applicazioni', tipo: 'definizione', fronte: R`Angolo di elevazione`, retro: R`L'angolo, misurato dall'orizzontale verso l'alto, sotto cui si vede un oggetto più in alto dell'osservatore.` },
    { id: 'fc-07', sezione: 'applicazioni', tipo: 'definizione', fronte: R`Angolo di depressione`, retro: R`L'angolo, misurato dall'orizzontale verso il basso, sotto cui si vede un oggetto più in basso. È congruente all'angolo di elevazione visto dall'altro punto.` },
    { id: 'fc-08', sezione: 'applicazioni', tipo: 'concetto', fronte: R`Pendenza di una strada del 10%`, retro: R`Significa $\tan\alpha = 0{,}10$: ogni 100 m percorsi in orizzontale si sale di 10 m. Non è l'angolo in gradi.` },
    { id: 'fc-09', sezione: 'area-triangolo', tipo: 'formula', fronte: R`Area di un triangolo con due lati e l'angolo compreso`, retro: R`$\text{Area} = \dfrac{1}{2}ab\sin\gamma$, con $\gamma$ compreso fra $a$ e $b$.` },
    { id: 'fc-10', sezione: 'area-triangolo', tipo: 'concetto', fronte: R`Perché $\frac12 ab\sin\gamma$ funziona anche con $\gamma$ ottuso?`, retro: R`Perché il seno di un angolo ottuso è comunque positivo: la formula resta valida senza modifiche.` },
    { id: 'fc-11', sezione: 'teorema-della-corda', tipo: 'formula', fronte: R`Teorema della corda`, retro: R`$AB = 2R\sin\gamma$, con $\gamma$ angolo alla circonferenza che sottende la corda $AB$.` },
    { id: 'fc-12', sezione: 'teorema-della-corda', tipo: 'procedura', fronte: R`Idea della dimostrazione del teorema della corda`, retro: R`Si traccia il diametro da un estremo della corda: per Talete l'angolo opposto è retto, e si applica il primo teorema dei triangoli rettangoli.` },
    { id: 'fc-13', sezione: 'teorema-dei-seni', tipo: 'formula', fronte: R`Teorema dei seni`, retro: R`$\dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma} = 2R$, con $R$ raggio della circonferenza circoscritta.` },
    { id: 'fc-14', sezione: 'teorema-dei-seni', tipo: 'concetto', fronte: R`Quando può presentarsi il caso ambiguo?`, retro: R`Quando si conoscono due lati e l'angolo opposto a uno di essi (non compreso fra i due lati).` },
    { id: 'fc-15', sezione: 'teorema-dei-seni', tipo: 'concetto', fronte: R`Condizione per due triangoli nel caso ambiguo (con $\alpha$ acuto)`, retro: R`$b\sin\alpha < a < b$: la calcolatrice dà una soluzione acuta per $\beta$, ma va controllata anche $180^\circ - \beta$.` },
    { id: 'fc-16', sezione: 'teorema-dei-seni', tipo: 'concetto', fronte: R`Quando il caso ambiguo non ha soluzioni?`, retro: R`Quando $a < b\sin\alpha$ (con $\alpha$ acuto): il lato $a$ è troppo corto per chiudere il triangolo.` },
    { id: 'fc-17', sezione: 'teorema-del-coseno', tipo: 'formula', fronte: R`Teorema del coseno (di Carnot)`, retro: R`$c^2 = a^2+b^2-2ab\cos\gamma$, con $\gamma$ angolo compreso fra $a$ e $b$, opposto a $c$.` },
    { id: 'fc-18', sezione: 'teorema-del-coseno', tipo: 'concetto', fronte: R`Cosa diventa il teorema del coseno se $\gamma = 90^\circ$?`, retro: R`Il teorema di Pitagora: $\cos 90^\circ = 0$, quindi $c^2 = a^2+b^2$.` },
    { id: 'fc-19', sezione: 'teorema-del-coseno', tipo: 'concetto', fronte: R`Il termine $-2ab\cos\gamma$: quando allunga e quando accorcia $c$?`, retro: R`Se $\gamma$ è acuto il termine è negativo ($c$ più corto che nel caso rettangolo); se $\gamma$ è ottuso è positivo ($c$ più lungo).` },
    { id: 'fc-20', sezione: 'risoluzione-triangoli-qualunque', tipo: 'procedura', fronte: R`I quattro casi per risolvere un triangolo qualunque`, retro: R`LLL (tre lati), LAL (due lati e l'angolo compreso), ALA/AAL (due angoli e un lato), LLA (due lati e un angolo non compreso).` },
    { id: 'fc-21', sezione: 'risoluzione-triangoli-qualunque', tipo: 'concetto', fronte: R`Nel caso LLL, perché conviene partire dal lato più lungo?`, retro: R`L'angolo opposto al lato più lungo è il più ampio ed è l'unico che può essere ottuso: gli altri due, trovati dopo, sono sicuramente acuti.` },
    { id: 'fc-22', sezione: 'problemi-geometria', tipo: 'formula', fronte: R`Area di un quadrilatero dalle diagonali`, retro: R`$\text{Area} = \dfrac{1}{2}d_1 d_2 \sin\theta$, con $\theta$ angolo fra le diagonali nel loro punto di intersezione.` },
    { id: 'fc-23', sezione: 'problemi-geometria', tipo: 'formula', fronte: R`Apotema di un poligono regolare di $n$ lati`, retro: R`$\text{apotema} = \dfrac{l}{2\tan\left(\frac{180^\circ}{n}\right)}$, con $l$ lato del poligono.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha l'ipotenusa di $10$ e un angolo acuto di $30^\circ$. Quanto misura il cateto opposto a quell'angolo?`, suggerimenti: [R`Cateto opposto: ipotenusa per il seno dell'angolo.`], risposta: num(5), soluzione: [R`Il cateto è opposto all'angolo di $30^\circ$, quindi uso il seno.`, R`$10\sin 30^\circ = 10\cdot\frac12 = 5$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha l'ipotenusa di $8$ e un angolo acuto di $60^\circ$. Quanto misura il cateto adiacente a quell'angolo?`, suggerimenti: [R`Cateto adiacente: ipotenusa per il coseno dell'angolo.`], risposta: num(4), soluzione: [R`Il cateto è adiacente all'angolo di $60^\circ$, quindi uso il coseno.`, R`$8\cos 60^\circ = 8\cdot\frac12 = 4$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`In un triangolo rettangolo un cateto misura $7$ e l'angolo acuto adiacente a lui misura $45^\circ$. Quanto misura l'altro cateto?`, suggerimenti: [R`L'altro cateto è opposto all'angolo: usa la tangente.`], risposta: num(7), soluzione: [R`L'altro cateto è opposto all'angolo di $45^\circ$.`, R`Secondo teorema: $7\tan 45^\circ = 7\cdot 1 = 7$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha un angolo acuto di $38^\circ$. Quanto misura l'altro angolo acuto, in gradi?`, suggerimenti: [R`I due angoli acuti di un triangolo rettangolo sommano $90^\circ$.`], risposta: gradi(52), soluzione: [R`Gli angoli acuti sono complementari: $\alpha + \beta = 90^\circ$.`, R`$\beta = 90^\circ - 38^\circ = 52^\circ$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`In un triangolo rettangolo il cateto opposto all'angolo $\alpha$ misura $3$ e l'ipotenusa $6$. Quanto misura $\alpha$, in gradi?`, suggerimenti: [R`Calcola $\sin\alpha = \frac{3}{6}$.`, R`Quale angolo notevole ha seno $\frac12$?`], risposta: gradi(30), soluzione: [R`$\sin\alpha = \frac{3}{6} = \frac12$.`, R`L'angolo acuto con seno $\frac12$ è $\alpha = 30^\circ$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha l'ipotenusa di $12$ e un angolo acuto di $25^\circ$. Quanto misura il cateto opposto a quell'angolo? Rispondi con due decimali.`, suggerimenti: [R`Ipotenusa per il seno dell'angolo, con la calcolatrice in gradi.`], risposta: num(5.07, 0.015), soluzione: [R`Il cateto è opposto all'angolo: $12\sin 25^\circ$.`, R`$12 \cdot 0{,}4226 \approx 5{,}07$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha l'ipotenusa di $9$ e un angolo acuto di $40^\circ$. Quanto misura il cateto adiacente a quell'angolo? Rispondi con due decimali.`, suggerimenti: [R`Ipotenusa per il coseno dell'angolo, con la calcolatrice in gradi.`], risposta: num(6.89, 0.015), soluzione: [R`Il cateto è adiacente all'angolo: $9\cos 40^\circ$.`, R`$9 \cdot 0{,}7660 \approx 6{,}89$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`In un triangolo rettangolo un cateto misura $5$ e l'angolo acuto adiacente a lui misura $35^\circ$. Quanto misura l'altro cateto? Rispondi con due decimali.`, suggerimenti: [R`L'altro cateto è opposto all'angolo: usa la tangente.`], risposta: num(3.50, 0.015), soluzione: [R`Secondo teorema: l'altro cateto è $5\tan 35^\circ$.`, R`$5 \cdot 0{,}7002 \approx 3{,}50$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`I cateti di un triangolo rettangolo misurano $5$ e $12$. Quanto misura l'angolo opposto al cateto $5$? Rispondi in gradi, con due decimali.`, suggerimenti: [R`La tangente dell'angolo è opposto diviso adiacente: $\frac{5}{12}$.`, R`Poi usa il tasto $\tan^{-1}$, con la calcolatrice in gradi.`], risposta: gradi(22.62, 0.015), soluzione: [R`$\tan\alpha = \frac{5}{12} \approx 0{,}4167$.`, R`$\alpha = \tan^{-1} 0{,}4167 \approx 22{,}62^\circ$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`L'ipotenusa di un triangolo rettangolo misura $10$ e un cateto $6$. Quanto misura l'angolo opposto al cateto $6$? Rispondi in gradi, con due decimali.`, suggerimenti: [R`Il seno dell'angolo è opposto diviso ipotenusa: $\frac{6}{10}$.`, R`Poi usa il tasto $\sin^{-1}$.`], risposta: gradi(36.87, 0.015), soluzione: [R`$\sin\alpha = \frac{6}{10} = 0{,}6$.`, R`$\alpha = \sin^{-1} 0{,}6 \approx 36{,}87^\circ$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Sei a $20$ m dalla base di un albero e vedi la cima sotto un angolo di $40^\circ$. Quanto è alto l'albero, in metri? Considerati a terra e rispondi con due decimali.`, suggerimenti: [R`I $20$ m sono il cateto adiacente all'angolo, l'altezza è il cateto opposto.`, R`Usa la tangente.`], risposta: num(16.78, 0.015), soluzione: [R`L'altezza è il cateto opposto all'angolo di $40^\circ$, i $20$ m sono il cateto adiacente.`, R`$h = 20\tan 40^\circ \approx 20 \cdot 0{,}8391 \approx 16{,}78$ m.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Un triangolo ha due lati di $6$ e $8$, e l'angolo fra loro misura $30^\circ$. Quanto vale l'area?`, suggerimenti: [R`Usa $\text{Area} = \frac12 ab\sin\gamma$.`], risposta: num(12), soluzione: [R`$\text{Area} = \frac12 \cdot 6 \cdot 8 \cdot \sin 30^\circ$.`, R`$= 24 \cdot \frac12 = 12$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Un triangolo ha due lati di $4$ e $10$, e l'angolo fra loro misura $150^\circ$. Quanto vale l'area?`, suggerimenti: [R`Usa $\text{Area} = \frac12 ab\sin\gamma$.`, R`$\sin 150^\circ = \sin 30^\circ = \frac12$.`], risposta: num(10), soluzione: [R`$\text{Area} = \frac12 \cdot 4 \cdot 10 \cdot \sin 150^\circ$.`, R`$\sin 150^\circ = \frac12$, quindi $\text{Area} = 20 \cdot \frac12 = 10$.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Un triangolo ha due lati di $5$ e $7$, e l'angolo fra loro misura $50^\circ$. Quanto vale l'area? Rispondi con due decimali.`, suggerimenti: [R`Usa $\text{Area} = \frac12 ab\sin\gamma$, con la calcolatrice in gradi.`], risposta: num(13.41, 0.015), soluzione: [R`$\text{Area} = \frac12 \cdot 5 \cdot 7 \cdot \sin 50^\circ = 17{,}5 \cdot \sin 50^\circ$.`, R`$17{,}5 \cdot 0{,}7660 \approx 13{,}41$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Un triangolo ha due lati di $5$ e $8$, e l'angolo fra loro misura $60^\circ$. Quanto misura il terzo lato?`, suggerimenti: [R`Conosci due lati e l'angolo compreso: usa il teorema del coseno.`], risposta: num(7), soluzione: [R`Teorema del coseno: $c^2 = 5^2 + 8^2 - 2\cdot 5\cdot 8\cos 60^\circ$.`, R`$c^2 = 89 - 80\cdot\frac12 = 89 - 40 = 49$.`, R`$c = \sqrt{49} = 7$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Un triangolo ha due lati di $7$ e $8$, e l'angolo fra loro misura $120^\circ$. Quanto misura il terzo lato?`, suggerimenti: [R`Usa il teorema del coseno.`, R`$\cos 120^\circ = -\frac12$: attento al segno.`], risposta: num(13), soluzione: [R`Teorema del coseno: $c^2 = 7^2 + 8^2 - 2\cdot 7\cdot 8\cos 120^\circ$.`, R`$\cos 120^\circ = -\frac12$, quindi $c^2 = 113 - 112\cdot\left(-\frac12\right) = 113 + 56 = 169$.`, R`$c = \sqrt{169} = 13$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`In un triangolo il lato $a = 10$ ha di fronte l'angolo $\alpha = 30^\circ$, e l'angolo $\beta$ misura $45^\circ$. Quanto misura il lato $b$, opposto a $\beta$? Rispondi con due decimali.`, suggerimenti: [R`$a$ e $\alpha$ sono una coppia completa: usa il teorema dei seni.`, R`$\frac{b}{\sin 45^\circ} = \frac{10}{\sin 30^\circ}$.`], risposta: num(14.14, 0.015), soluzione: [R`Teorema dei seni: $\frac{b}{\sin 45^\circ} = \frac{10}{\sin 30^\circ} = \frac{10}{0{,}5} = 20$.`, R`$b = 20\sin 45^\circ = 20 \cdot \frac{\sqrt2}{2} = 10\sqrt2$.`, R`$10\sqrt2 \approx 14{,}14$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`In un triangolo $a = 8$, $b = 6$ e l'angolo $\alpha = 30^\circ$ sta di fronte ad $a$. Quanto misura l'angolo $\beta$, opposto a $b$? Rispondi in gradi, con due decimali.`, suggerimenti: [R`Teorema dei seni: $\sin\beta = \frac{b\sin\alpha}{a}$.`, R`Poi usa $\sin^{-1}$. Controlla se anche il supplementare va bene.`], risposta: gradi(22.02, 0.015), soluzione: [R`$\sin\beta = \frac{6 \cdot 0{,}5}{8} = 0{,}375$.`, R`$\beta = \sin^{-1} 0{,}375 \approx 22{,}02^\circ$.`, R`Il supplementare, $157{,}98^\circ$, non va: sommato a $30^\circ$ supera $180^\circ$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`I lati di un triangolo misurano $5$, $7$ e $8$. Quanto misura l'angolo opposto al lato $7$, in gradi?`, suggerimenti: [R`Conosci tre lati: usa il teorema del coseno, isolando il coseno.`, R`$\cos\gamma = \frac{a^2 + b^2 - c^2}{2ab}$, con $c = 7$.`], risposta: gradi(60), soluzione: [R`$\cos\gamma = \frac{5^2 + 8^2 - 7^2}{2\cdot 5\cdot 8}$.`, R`$\cos\gamma = \frac{25 + 64 - 49}{80} = \frac{40}{80} = \frac12$.`, R`L'angolo con coseno $\frac12$ è $\gamma = 60^\circ$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`In un triangolo $\alpha = 50^\circ$, $\beta = 70^\circ$ e il lato $c = 10$. Quanto misura il lato $a$, opposto ad $\alpha$? Rispondi con due decimali.`, suggerimenti: [R`Trova prima $\gamma$, che sta di fronte a $c$.`, R`Poi usa il teorema dei seni con la coppia $c$, $\gamma$.`], risposta: num(8.85, 0.015), soluzione: [R`$\gamma = 180^\circ - 50^\circ - 70^\circ = 60^\circ$.`, R`Teorema dei seni: $\frac{a}{\sin 50^\circ} = \frac{10}{\sin 60^\circ}$.`, R`$a = \frac{10\sin 50^\circ}{\sin 60^\circ} \approx \frac{7{,}660}{0{,}866} \approx 8{,}85$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Un triangolo rettangolo ha ipotenusa $c = 10\ \text{cm}$ e un angolo acuto $\alpha = 36{,}87^\circ$. Calcola i due cateti $a$ (opposto ad $\alpha$) e $b$ (adiacente), arrotondati al centesimo.`, suggerimenti: [
      R`Usa il primo teorema sui triangoli rettangoli: un cateto è ipotenusa per seno o coseno dell'angolo.`,
      R`$a = c\sin\alpha$, $b = c\cos\alpha$.`
    ], risposta: { tipo: 'numeri', valori: [6, 8], ordinati: true, tolleranza: 0.05 }, soluzione: [
      R`$a = 10 \cdot \sin 36{,}87^\circ \approx 10 \cdot 0{,}6 = 6\ \text{cm}$.`,
      R`$b = 10 \cdot \cos 36{,}87^\circ \approx 10 \cdot 0{,}8 = 8\ \text{cm}$.`,
      R`Non è un caso: $36{,}87^\circ$ è l'angolo del triangolo 3-4-5, con $\sin\alpha = 0{,}6$ e $\cos\alpha = 0{,}8$ esatti.`
    ] },
    { id: 'es-02', difficolta: 1, testo: R`In un triangolo rettangolo un cateto misura $6\ \text{cm}$ ed è opposto a un angolo di $25^\circ$. Quanto misura l'ipotenusa? (arrotonda al centesimo)`, suggerimenti: [
      R`Il cateto è opposto all'angolo dato: quale dei tre teoremi lo lega direttamente all'ipotenusa?`,
      R`$a = c\sin\alpha$, quindi $c = a/\sin\alpha$.`
    ], risposta: { tipo: 'numero', valore: 14.2, tolleranza: 0.05 }, soluzione: [
      R`Da $a = c\sin\alpha$ si ricava $c = \dfrac{a}{\sin\alpha} = \dfrac{6}{\sin 25^\circ} \approx \dfrac{6}{0{,}4226} \approx 14{,}20\ \text{cm}$.`
    ] },
    { id: 'es-03', difficolta: 1, testo: R`Una strada ha una pendenza dell'$8\%$. Quanti gradi misura l'angolo di inclinazione rispetto all'orizzontale? (arrotonda al centesimo di grado)`, suggerimenti: [
      R`La pendenza in percentuale è $100\tan\alpha$.`,
      R`$\tan\alpha = 0{,}08$; usa l'arcotangente.`
    ], risposta: { tipo: 'numero', valore: 4.57, tolleranza: 0.1 }, soluzione: [
      R`$\tan\alpha = \dfrac{8}{100} = 0{,}08$.`,
      R`$\alpha = \arctan(0{,}08) \approx 4{,}57^\circ$.`
    ] },
    { id: 'es-04', difficolta: 2, testo: R`Da un punto a $25\ \text{m}$ dalla base di una torre, l'angolo di elevazione della cima è $40^\circ$. Quanto è alta la torre? (trascura l'altezza dell'osservatore; arrotonda al centesimo)`, suggerimenti: [
      R`La distanza orizzontale è il cateto adiacente all'angolo di elevazione.`,
      R`Usa il secondo teorema: $h = d\tan\alpha$.`
    ], risposta: { tipo: 'numero', valore: 20.98, tolleranza: 0.1 }, soluzione: [
      R`$h = 25\cdot\tan 40^\circ \approx 25\cdot 0{,}8391 \approx 20{,}98\ \text{m}$.`
    ] },
    { id: 'es-05', difficolta: 1, testo: R`Calcola l'area di un triangolo con lati $a = 8\ \text{cm}$, $b = 5\ \text{cm}$ e l'angolo compreso $\gamma = 30^\circ$.`, suggerimenti: [
      R`Non serve l'altezza: c'è una formula diretta con due lati e l'angolo compreso.`,
      R`$\text{Area} = \frac12 ab\sin\gamma$.`
    ], risposta: { tipo: 'numero', valore: 10, tolleranza: 0.05 }, soluzione: [
      R`$\text{Area} = \frac12\cdot 8\cdot 5\cdot\sin 30^\circ = 20\cdot 0{,}5 = 10\ \text{cm}^2$.`
    ] },
    { id: 'es-06', difficolta: 2, testo: R`In una circonferenza di raggio $7{,}5\ \text{cm}$, una corda lunga $10\ \text{cm}$ sottende un angolo alla circonferenza $\gamma$. Quanto misura $\gamma$, l'angolo acuto, in gradi? (arrotonda al centesimo)`, suggerimenti: [
      R`Usa il teorema della corda: $AB = 2R\sin\gamma$.`,
      R`$\sin\gamma = \dfrac{AB}{2R} = \dfrac{10}{15}$.`
    ], risposta: { tipo: 'numero', valore: 41.81, tolleranza: 0.1 }, soluzione: [
      R`$\sin\gamma = \dfrac{10}{2\cdot 7{,}5} = \dfrac{10}{15} \approx 0{,}6667$.`,
      R`$\gamma = \arcsin(0{,}6667) \approx 41{,}81^\circ$ (l'angolo acuto; dall'altra parte della corda l'angolo sarebbe il supplementare, $\approx 138{,}19^\circ$).`
    ] },
    { id: 'es-07', difficolta: 2, testo: R`In un triangolo, $\alpha = 50^\circ$, $\beta = 60^\circ$ e il lato $a$ (opposto ad $\alpha$) misura $10\ \text{cm}$. Trova i lati $b$ e $c$ (arrotonda al centesimo).`, suggerimenti: [
      R`Prima trova $\gamma$ per differenza da $180^\circ$.`,
      R`Usa il teorema dei seni: $\dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma}$.`
    ], risposta: { tipo: 'numeri', valori: [11.31, 12.27], ordinati: true, tolleranza: 0.05 }, soluzione: [
      R`$\gamma = 180^\circ - 50^\circ - 60^\circ = 70^\circ$.`,
      R`Rapporto comune: $\dfrac{a}{\sin\alpha} = \dfrac{10}{\sin 50^\circ} \approx 13{,}05$.`,
      R`$b \approx 13{,}05\cdot\sin 60^\circ \approx 11{,}31\ \text{cm}$; $c \approx 13{,}05\cdot\sin 70^\circ \approx 12{,}27\ \text{cm}$.`
    ] },
    { id: 'es-08', difficolta: 3, testo: R`In un triangolo, $\alpha = 35^\circ$, $a = 7\ \text{cm}$ (opposto ad $\alpha$) e $b = 10\ \text{cm}$. Il problema ha due soluzioni: trova le due possibili misure del lato $c$ (arrotonda al centesimo).`, suggerimenti: [
      R`Controlla prima che sia davvero il caso ambiguo: confronta $a$ con $b\sin\alpha$ e con $b$.`,
      R`Trova $\beta$ con il teorema dei seni: ci sono due valori possibili, $\beta$ e $180^\circ - \beta$.`,
      R`Per ciascuno dei due $\beta$, trova $\gamma$ e poi $c$ con il teorema dei seni.`
    ], risposta: { tipo: 'numeri', valori: [12.2, 4.18], tolleranza: 0.05 }, soluzione: [
      R`$b\sin\alpha = 10\cdot\sin 35^\circ \approx 5{,}74$. Poiché $5{,}74 < 7 < 10$, ci sono due soluzioni.`,
      R`$\sin\beta = \dfrac{b\sin\alpha}{a} = \dfrac{5{,}74}{7} \approx 0{,}8194$, quindi $\beta_1 \approx 55{,}02^\circ$ oppure $\beta_2 \approx 124{,}98^\circ$.`,
      R`Rapporto comune: $\dfrac{a}{\sin\alpha} = \dfrac{7}{\sin 35^\circ} \approx 12{,}20$.`,
      R`Primo triangolo: $\gamma_1 = 180^\circ-35^\circ-55{,}02^\circ \approx 89{,}98^\circ$, $c_1 \approx 12{,}20\cdot\sin 89{,}98^\circ \approx 12{,}20\ \text{cm}$. Secondo: $\gamma_2 = 180^\circ-35^\circ-124{,}98^\circ \approx 20{,}02^\circ$, $c_2 \approx 12{,}20\cdot\sin 20{,}02^\circ \approx 4{,}18\ \text{cm}$.`
    ] },
    { id: 'es-09', difficolta: 3, testo: R`Un triangolo ha lati $a = 7\ \text{cm}$, $b = 8\ \text{cm}$, $c = 5\ \text{cm}$. Trova l'ampiezza dell'angolo $\gamma$, opposto al lato $c$, in gradi (arrotonda al centesimo).`, suggerimenti: [
      R`Con i tre lati noti serve il teorema del coseno, risolto rispetto al coseno.`,
      R`$\cos\gamma = \dfrac{a^2+b^2-c^2}{2ab}$.`
    ], risposta: { tipo: 'numero', valore: 38.21, tolleranza: 0.1 }, soluzione: [
      R`$\cos\gamma = \dfrac{49+64-25}{2\cdot 7\cdot 8} = \dfrac{88}{112} \approx 0{,}7857$.`,
      R`$\gamma = \arccos(0{,}7857) \approx 38{,}21^\circ$.`
    ] },
    { id: 'es-10', difficolta: 2, testo: R`Un esagono regolare ha lato $6\ \text{cm}$. Calcola la sua area (arrotonda al centesimo).`, suggerimenti: [
      R`L'esagono si divide in 6 triangoli isosceli dal centro; l'apotema è l'altezza di ciascuno.`,
      R`$\text{apotema} = \dfrac{l}{2\tan(180^\circ/n)}$, poi $\text{Area} = \dfrac12\cdot\text{perimetro}\cdot\text{apotema}$.`
    ], risposta: { tipo: 'numero', valore: 93.53, tolleranza: 0.1 }, soluzione: [
      R`Per l'esagono $n = 6$, quindi $\dfrac{180^\circ}{n} = 30^\circ$: $\text{apotema} = \dfrac{6}{2\tan 30^\circ} \approx \dfrac{6}{1{,}1547} \approx 5{,}196\ \text{cm}$.`,
      R`Il perimetro è $6\cdot 6 = 36\ \text{cm}$, e l'area di un poligono regolare è metà perimetro per apotema: $\text{Area} = \dfrac12\cdot 36\cdot 5{,}196 \approx 93{,}53\ \text{cm}^2$.`
    ] },
    { id: 'es-11', difficolta: 2, testo: R`Un quadrilatero ha le diagonali di $8\ \text{cm}$ e $10\ \text{cm}$, che si incontrano formando un angolo di $70^\circ$. Calcola l'area del quadrilatero (arrotonda al centesimo).`, suggerimenti: [
      R`C'è una formula diretta per l'area di un quadrilatero dalle sue diagonali e dall'angolo fra loro.`,
      R`$\text{Area} = \frac12 d_1 d_2\sin\theta$.`
    ], risposta: { tipo: 'numero', valore: 37.59, tolleranza: 0.1 }, soluzione: [
      R`$\text{Area} = \frac12\cdot 8\cdot 10\cdot\sin 70^\circ \approx 40\cdot 0{,}9397 \approx 37{,}59\ \text{cm}^2$.`
    ] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`In un triangolo rettangolo, il cateto adiacente a un angolo acuto $\alpha$ è...`, opzioni: [
      R`il cateto che, insieme all'ipotenusa, forma l'angolo $\alpha$`,
      R`il cateto opposto ad $\alpha$`,
      R`l'ipotenusa`,
      R`sempre il cateto più corto`
    ], corretta: 0, spiegazione: R`Il cateto adiacente è quello che "tocca" l'angolo, insieme all'ipotenusa. Il cateto opposto non lo tocca; l'ipotenusa è sempre opposta all'angolo retto, non ad $\alpha$; quale cateto sia più corto dipende dai valori, non dalla definizione.` },
    { id: 'q-02', domanda: R`Il teorema del coseno $c^2 = a^2+b^2-2ab\cos\gamma$, quando $\gamma = 90^\circ$, diventa...`, opzioni: [
      R`$c^2 = a^2 - b^2$`,
      R`il teorema di Pitagora, $c^2 = a^2+b^2$`,
      R`$c = a+b$`,
      R`$c^2 = 2ab$`
    ], corretta: 1, spiegazione: R`$\cos 90^\circ = 0$, quindi il termine $-2ab\cos\gamma$ sparisce e resta $c^2=a^2+b^2$: il teorema del coseno generalizza Pitagora.` },
    { id: 'q-03', domanda: R`Il teorema dei seni $\dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma}$ è anche uguale a...`, opzioni: [
      R`il perimetro del triangolo`,
      R`il raggio $R$ della circonferenza circoscritta`,
      R`il diametro $2R$ della circonferenza circoscritta`,
      R`l'area del triangolo`
    ], corretta: 2, spiegazione: R`Ogni lato è una corda che sottende l'angolo opposto, quindi $a=2R\sin\alpha$ e così via: il rapporto comune vale $2R$, il diametro, non il raggio.` },
    { id: 'q-04', domanda: R`Quando si presenta il "caso ambiguo" nella risoluzione di un triangolo?`, opzioni: [
      R`quando si conoscono i tre lati`,
      R`quando si conoscono due angoli e un lato`,
      R`quando si conoscono due lati e l'angolo compreso fra essi`,
      R`quando si conoscono due lati e l'angolo opposto a uno di essi`
    ], corretta: 3, spiegazione: R`Nel caso LLA (due lati e un angolo non compreso) l'equazione del teorema dei seni può avere due soluzioni accettabili per l'angolo incognito. Negli altri casi (LLL, ALA, LAL) la soluzione, se esiste, è unica.` },
    { id: 'q-05', domanda: R`Con $\alpha$ acuto, se $a < b\sin\alpha$ nel caso ambiguo, quanti triangoli esistono?`, opzioni: [
      R`due`, R`uno`, R`nessuno`, R`infiniti`
    ], corretta: 2, spiegazione: R`$b\sin\alpha$ è la distanza minima che il lato $a$ deve poter "raggiungere" per chiudere il triangolo: se $a$ è più corto di questa distanza minima, nessun triangolo è possibile.` },
    { id: 'q-06', domanda: R`Per calcolare l'area di un triangolo con la formula $\frac12 ab\sin\gamma$, l'angolo $\gamma$ deve essere...`, opzioni: [
      R`un angolo qualunque del triangolo`,
      R`l'angolo opposto al lato $a$`,
      R`l'angolo compreso fra i lati $a$ e $b$`,
      R`sempre un angolo acuto`
    ], corretta: 2, spiegazione: R`La formula usa l'angolo compreso fra i due lati noti, perché è da lì che si ricava l'altezza $h = b\sin\gamma$. Un angolo qualsiasi del triangolo non basta.` },
    { id: 'q-07', domanda: R`Il teorema della corda lega la lunghezza di una corda $AB$ a...`, opzioni: [
      R`il raggio della circonferenza e l'angolo al centro`,
      R`il diametro della circonferenza e un angolo alla circonferenza che la sottende`,
      R`solo il raggio della circonferenza`,
      R`la lunghezza dell'arco sotteso`
    ], corretta: 1, spiegazione: R`$AB = 2R\sin\gamma$: compaiono il diametro $2R$ e un angolo alla circonferenza $\gamma$, non l'angolo al centro né la lunghezza dell'arco.` },
    { id: 'q-08', domanda: R`Nella risoluzione di un triangolo rettangolo, se sono noti i due cateti $a$ e $b$, come si trova un angolo acuto?`, opzioni: [
      R`con il teorema del coseno`,
      R`con $\tan\alpha = a/b$ e poi l'arcotangente`,
      R`con il teorema della corda`,
      R`non è possibile senza conoscere un angolo`
    ], corretta: 1, spiegazione: R`Il rapporto fra i due cateti è la tangente dell'angolo opposto al primo; l'arcotangente lo restituisce. Il teorema del coseno e quello della corda non sono necessari in un triangolo rettangolo con i cateti noti.` },
    { id: 'q-09', domanda: R`Una strada con pendenza del $100\%$ corrisponde a un'inclinazione di...`, opzioni: [
      R`$100^\circ$`, R`$90^\circ$ (parete verticale)`, R`$45^\circ$`, R`$50^\circ$`
    ], corretta: 2, spiegazione: R`Pendenza $100\%$ significa $\tan\alpha = 1$, cioè $\alpha = 45^\circ$: molto ripida, ma non verticale. La pendenza in percentuale non è l'angolo in gradi.` },
    { id: 'q-10', domanda: R`Dato un triangolo di cui si conoscono tutti e tre i lati (caso LLL), come si comincia a risolverlo?`, opzioni: [
      R`con il teorema dei seni, per trovare subito un angolo`,
      R`con il teorema del coseno, per trovare un angolo`,
      R`con $\frac12 ab\sin\gamma$, per trovare l'area`,
      R`non si può risolvere senza conoscere almeno un angolo`
    ], corretta: 1, spiegazione: R`Il teorema dei seni richiederebbe già un angolo, che non si conosce. Il teorema del coseno, risolto rispetto al coseno, dà un primo angolo usando solo i tre lati.` },
    { id: 'q-11', domanda: R`L'angolo di depressione da un punto $A$ a un punto $B$ più in basso è congruente...`, opzioni: [
      R`all'angolo di elevazione da $B$ ad $A$`,
      R`al doppio dell'angolo di elevazione da $B$ ad $A$`,
      R`al complementare dell'angolo di elevazione da $B$ ad $A$`,
      R`non c'è nessuna relazione generale`
    ], corretta: 0, spiegazione: R`Le due linee orizzontali (in $A$ e in $B$) sono parallele, e i due angoli sono alterni interni rispetto alla linea di vista $AB$: quindi sono congruenti.` },
    { id: 'q-12', domanda: R`Nel caso ambiguo del teorema dei seni, quando la calcolatrice restituisce l'arcoseno di un valore, quale soluzione dà?`, opzioni: [
      R`sempre entrambe le soluzioni possibili`,
      R`solo la soluzione ottusa`,
      R`solo la soluzione acuta; l'eventuale soluzione ottusa va cercata a mano`,
      R`nessuna delle due, serve un'altra funzione`
    ], corretta: 2, spiegazione: R`L'arcoseno restituisce per convenzione un valore fra $-90^\circ$ e $90^\circ$, quindi solo l'angolo acuto. La soluzione ottusa, se esiste, è il suo supplementare e va controllata separatamente.` },
    { id: 'q-13', domanda: R`In un poligono regolare di $n$ lati, l'apotema è...`, opzioni: [
      R`la distanza fra due vertici opposti`,
      R`la distanza dal centro a un vertice`,
      R`la distanza dal centro a un lato`,
      R`il perimetro diviso per $n$`
    ], corretta: 2, spiegazione: R`L'apotema è l'altezza dei triangoli isosceli in cui il centro divide il poligono, cioè la distanza (perpendicolare) dal centro a un lato. La distanza dal centro a un vertice è il raggio della circonferenza circoscritta, un'altra grandezza.` },
    { id: 'q-14', domanda: R`Per l'area di un quadrilatero qualunque dalle diagonali $d_1$, $d_2$ e dall'angolo $\theta$ fra loro, si usa...`, opzioni: [
      R`$\text{Area} = d_1\cdot d_2$`,
      R`$\text{Area} = \frac12 d_1 d_2 \sin\theta$`,
      R`$\text{Area} = \frac12 d_1 d_2 \cos\theta$`,
      R`la formula vale solo per i quadrati`
    ], corretta: 1, spiegazione: R`La formula $\frac12 d_1 d_2\sin\theta$ vale per qualunque quadrilatero, non solo per quelli regolari, ed è la formula $\frac12 ab\sin\gamma$ applicata ai quattro triangoli in cui le diagonali tagliano il quadrilatero. Il coseno darebbe un'area negativa con $\theta$ ottuso; il prodotto delle diagonali da solo è il doppio dell'area di un rombo, e non vale in generale.` },
    { id: 'q-15', domanda: R`Nel teorema del coseno, per trovare un angolo conoscendo i tre lati, quale lato va isolato a sinistra dell'uguale?`, opzioni: [
      R`uno qualunque dei tre, è indifferente`,
      R`il lato più corto`,
      R`il lato opposto all'angolo che si vuole trovare`,
      R`il lato più lungo, sempre`
    ], corretta: 2, spiegazione: R`La formula $c^2=a^2+b^2-2ab\cos\gamma$ lega $\gamma$ al lato $c$ che gli sta opposto: per trovare un certo angolo, va isolato il lato a esso opposto, non uno scelto a caso.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`"Opposto" e "adiacente" dipendono da quale angolo si sta usando: nello stesso triangolo, un cateto è opposto a un angolo e adiacente all'altro. Prima di scrivere una formula, individua sempre rispetto a *quale* angolo il cateto in questione è opposto o adiacente.` },
    { tipo: 'errore', testo: R`Nel teorema del coseno, l'angolo nella formula deve essere quello compreso fra i due lati noti (per trovare il terzo lato) oppure quello opposto al lato isolato a sinistra (per trovare un angolo dai tre lati). Usare l'angolo sbagliato è l'errore più comune.` },
    { tipo: 'trucco', testo: R`Dopo aver trovato tutti gli angoli di un triangolo, controlla sempre che la loro somma faccia $180^\circ$: è un controllo immediato che smaschera quasi ogni errore di calcolo.` },
    { tipo: 'errore', testo: R`Nel caso ambiguo, la calcolatrice con l'arcoseno dà solo la soluzione acuta. Prima di scartare la soluzione ottusa ($180^\circ$ meno quella trovata), controlla se, sommata all'angolo già noto, resta sotto $180^\circ$: se sì, è una seconda soluzione valida.` },
    { tipo: 'metodo', testo: R`Prima di scegliere una formula, individua che tipo di dati hai: tre lati (LLL), due lati e l'angolo compreso (LAL), due angoli e un lato (ALA/AAL), oppure due lati e un angolo non compreso (LLA). Ogni caso ha il suo punto di partenza naturale.` },
    { tipo: 'trucco', testo: R`La pendenza di una strada in percentuale è $100\tan\alpha$, non l'angolo stesso: una pendenza del $100\%$ è già un'inclinazione di $45^\circ$, molto ripida ma non verticale.` },
    { tipo: 'errore', testo: R`Nel teorema della corda e nel teorema dei seni compare $2R$, il diametro, non il raggio $R$. Dimenticare il $2$ è l'errore più frequente in queste due formule.` },
    { tipo: 'metodo', testo: R`Disegna sempre la figura con i dati noti scritti sopra, prima di scrivere qualunque formula: nella trigonometria quasi ogni errore nasce dall'aver scambiato un lato o un angolo con un altro, non da un calcolo sbagliato.` }
  ],

  aneddoti: [
    { matematico: 'Ipparco di Nicea', anni: '190–120 a.C. circa', titolo: 'Le tavole delle corde e la Terra dondolante', testo: R`Ipparco è considerato il padre della trigonometria: per calcolare le posizioni di Sole e Luna costruì la prima tavola delle corde della storia, un elenco che associava a ogni arco di circonferenza la lunghezza della corda corrispondente, l'antenato diretto delle nostre tavole di seni. Usò questo strumento anche per un risultato sorprendente: confrontando le sue osservazioni astronomiche con quelle di Timocari di Alessandria, vecchie di circa 150 anni, si accorse che le stelle sembravano essersi spostate rispetto agli equinozi. Non erano le stelle a muoversi: era l'asse terrestre a "dondolare" lentamente come una trottola, un fenomeno oggi chiamato precessione degli equinozi, con un periodo di circa 26.000 anni. Quasi nessuna delle sue opere originali è sopravvissuta: le conosciamo soprattutto attraverso Tolomeo, che le riprese tre secoli dopo.`, legame: R`La tavola delle corde di Ipparco è esattamente l'oggetto descritto dal teorema della corda: la relazione fra un arco (o l'angolo che vede) e la lunghezza della corda sottesa.` },
    { matematico: 'Eratostene di Cirene', anni: '276–194 a.C.', titolo: "La circonferenza della Terra misurata con un bastone", testo: R`Bibliotecario ad Alessandria, Eratostene sapeva che a Siene (l'odierna Assuan), a mezzogiorno del solstizio d'estate, il Sole illuminava il fondo di un pozzo senza proiettare ombra: era allo zenit. Nello stesso istante, ad Alessandria, un bastone verticale (uno gnomone) proiettava un'ombra che formava un angolo di circa $7{,}2^\circ$ con la verticale, cioè un cinquantesimo di angolo giro. Se le due città stavano sullo stesso meridiano, quell'angolo doveva essere anche l'angolo al centro della Terra fra le due località. Conoscendo la distanza fra Alessandria e Siene (circa 5000 stadi, misurata da uomini addestrati a contare i passi con un ritmo costante), Eratostene moltiplicò per 50 e ottenne la circonferenza dell'intero pianeta: un risultato notevolmente vicino a quello reale, anche se la lunghezza esatta dello "stadio" usato resta incerta oggi.`, legame: R`Il metodo di Eratostene è lo stesso delle applicazioni con l'angolo di elevazione: un'ombra, un angolo e una distanza nota bastano per misurare qualcosa di irraggiungibile.` },
    { matematico: 'Regiomontano (Johannes Müller)', anni: '1436–1476', titolo: 'Il trattato che rese la trigonometria indipendente', testo: R`Il vero nome di Regiomontano era Johannes Müller, nato a Königsberg in Franconia ("monte del re", da cui il nome latinizzato). Nel 1464 completò il *De triangulis omnimodis*, il primo trattato europeo a studiare la trigonometria come disciplina a sé stante, staccata dall'astronomia che l'aveva sempre ospitata: vi compaiono il teorema dei seni per i triangoli piani e sferici e metodi sistematici per risolverli in ogni caso. Il libro fu pubblicato solo nel 1533, dopo la sua morte, ma le sue tavole astronomiche circolavano già prima: pare che Cristoforo Colombo, bloccato in Giamaica nel 1504 con le navi in avaria, le abbia usate per prevedere un'eclissi di Luna e convincere gli abitanti del posto, spaventati dalla scomparsa della Luna, a continuare a rifornirlo di cibo.`, legame: R`Il *De triangulis* è il primo libro a raccogliere in modo sistematico proprio quello che si fa qui: risolvere un triangolo qualunque conoscendo alcuni dei suoi elementi.` },
    { matematico: 'Willebrord Snellius', anni: '1580–1626', titolo: 'Misurare l\'Olanda senza percorrerla tutta', testo: R`Professore a Leida, nel 1615 Snellius affrontò un problema pratico: misurare la lunghezza di un grado di meridiano nei Paesi Bassi, per stimare le dimensioni della Terra senza ripetere il viaggio di Eratostene. Invece di percorrere a passi l'intera distanza fra due città, misurò con cura una sola breve base e una rete di triangoli che collegava torri e campanili visibili da un punto all'altro, per circa 130 km fra Alkmaar e Bergen op Zoom: misurando solo gli angoli di ogni triangolo, il teorema dei seni permetteva di calcolare tutti i lati della catena a partire da quell'unica base. Pubblicò il risultato nel 1617 in un'opera che chiamò, in onore del suo predecessore greco, *Eratosthenes Batavus* ("l'Eratostene d'Olanda").`, legame: R`È il primo esempio moderno di triangolazione: la tecnica descritta a fine scheda per misurare grandi distanze incatenando triangoli risolti con il teorema dei seni.` },
    { matematico: 'Lazare Carnot', anni: '1753–1823', titolo: 'Un generale rivoluzionario e Pitagora generalizzato', testo: R`Ingegnere militare e matematico, Carnot fu anche una figura politica di primo piano nella Rivoluzione francese: come organizzatore degli eserciti della giovane Repubblica contro le monarchie europee coalizzate, guadagnò il soprannome di "l'organizzatore della vittoria". Nel tempo che gli restava alla matematica, nel trattato *Géométrie de position* (1803) trattò sistematicamente lunghezze e angoli con segno, ottenendo in forma generale la relazione che oggi porta il suo nome in Italia. La stessa relazione, però, era già nota: in forma puramente geometrica compare nel libro II degli *Elementi* di Euclide, e già nel Quattrocento l'astronomo persiano al-Kashi l'aveva usata a Samarcanda per costruire tavole trigonometriche accuratissime. Non a caso, in Francia lo stesso teorema si chiama spesso "teorema di al-Kashi": il nome cambia da un paese all'altro a seconda di chi se ne prende il merito.`, legame: R`Il teorema del coseno, generalizzazione di Pitagora a un angolo qualunque, è chiamato in Italia proprio "teorema di Carnot".` }
  ]
});
})();
