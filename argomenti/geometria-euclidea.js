(function () {
const R = String.raw;
/* ampiezza in gradi dell'angolo in V fra le semirette VU e VW (punti come coppie di espressioni) */
const ANG = (V, U, W) => {
  const ux = '((' + U[0] + ')-(' + V[0] + '))', uy = '((' + U[1] + ')-(' + V[1] + '))';
  const wx = '((' + W[0] + ')-(' + V[0] + '))', wy = '((' + W[1] + ')-(' + V[1] + '))';
  return 'acos((' + ux + '*' + wx + '+' + uy + '*' + wy + ')/(sqrt(' + ux + '^2+' + uy + '^2)*sqrt(' + wx + '^2+' + wy + '^2)))*180/pi';
};
const PA = ['4*cos((90 + w/2)*pi/180)', '4*sin((90 + w/2)*pi/180)'];
const PB = ['4*cos((90 - w/2)*pi/180)', '4*sin((90 - w/2)*pi/180)'];
const PC = ['4*cos(t*pi/180)', '4*sin(t*pi/180)'];
/* allenamento: una sola risposta numerica, ma con il tipo 'numeri', che pesca il numero dentro
   la scritta. Così passano anche «70°», «70 gradi», «20 cm» e «9π»; con 'numero' il segno ° la bocciava.
   In cambio non legge le radici («√64»): per questo il tasto √ non c'è, e i risultati sono numeri finiti. */
const gradi = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'in gradi, es. 40', simboli: ['°'] });
const num = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'solo il numero, es. 12', simboli: ['/'] });
/* aree: 'numero', perché la casella a un numero toglie l'unità in fondo («20 cm^2») e legge «25 π» con lo spazio */
const area = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'solo il numero, es. 12', simboli: ['/'] });
const conPi = v => ({ tipo: 'numero', valore: v * Math.PI, tolleranza: 0.01, segnaposto: 'con π, es. 4π', simboli: ['π'] });
const SI = { tipo: 'testo', accettate: ['sì', 'si', 'sì, è rettangolo', 'si, è rettangolo', 'sì è rettangolo', 'si è rettangolo', 'è rettangolo', 'rettangolo'], segnaposto: 'sì o no', simboli: [] };
COMPASSO.registra({
  id: 'geometria-euclidea',
  titolo: 'Geometria euclidea',

  introduzione: R`Come fai a sapere che gli angoli di un triangolo sommano sempre $180^\circ$? Puoi misurarne dieci con il goniometro, ma l'undicesimo potrebbe fare eccezione.

La geometria euclidea parte da poche affermazioni accettate senza prova, i **postulati**. Da queste ricava tutte le altre, i **teoremi**, con il ragionamento.

I risultati li usi ancora oggi. Con Pitagora trovi la diagonale di uno schermo. Con la similitudine misuri un albero dalla sua ombra.

Ti servono le proporzioni, le frazioni e le radici quadrate.`,

  inBreve: [
    R`Un teorema si dimostra con una catena di passaggi. Un disegno, anche preciso, non è una dimostrazione.`,
    R`Due parallele tagliate da una trasversale formano angoli alterni interni congruenti. Da qui viene che gli angoli di un triangolo sommano $180^\circ$.`,
    R`Due triangoli sono congruenti con i criteri LAL, ALA o LLL. Con tre angoli uguali sono solo simili.`,
    R`Pitagora: nel triangolo rettangolo $c^2=a^2+b^2$. Euclide: un cateto al quadrato è l'ipotenusa per la sua proiezione, e l'altezza al quadrato è il prodotto delle due proiezioni.`,
    R`Se due figure sono simili con rapporto $k$, i perimetri stanno nel rapporto $k$ e le aree nel rapporto $k^2$.`,
    R`L'angolo al centro è il doppio di quello alla circonferenza sullo stesso arco. Per questo un triangolo inscritto in una semicirconferenza è rettangolo.`
  ],

  sezioni: [
    { id: 'enti-primitivi-assiomi', titolo: 'Enti primitivi, assiomi e dimostrazioni', testo: R`Prova a definire «retta». Dici «una linea dritta», ma poi devi definire «linea» e «dritta». Per non girare in tondo, la geometria sceglie da dove partire.

- Gli **enti primitivi** non si definiscono: sono punto, retta e piano.
- I **postulati** (o assiomi) si accettano senza dimostrarli. Per esempio: per due punti passa una sola retta.

Il più famoso è il **quinto postulato**: *per un punto fuori da una retta passa una sola parallela a quella retta*.

>* **Dimostrare** un teorema vuol dire arrivare alla tesi con una catena di passaggi. Ogni passaggio si appoggia a un postulato o a un teorema già dimostrato.

Un teorema ha la forma «se **ipotesi**, allora **tesi**». L'ipotesi è quello che supponi vero. La tesi è quello che devi dimostrare.

?? «Se un quadrilatero è un rettangolo, allora le sue diagonali sono congruenti.» Qual è l'ipotesi?
[x] è un rettangolo
[ ] ha le diagonali congruenti
[ ] ha quattro angoli
=> L'ipotesi viene dopo «se». Se scambi ipotesi e tesi, il teorema cambia. Anche il trapezio isoscele ha le diagonali congruenti, ma non è un rettangolo.

>! Misurare con il righello non è una dimostrazione. Il disegno può sbagliare di un millimetro, e mostra un solo caso.` },

    { id: 'angoli-parallele', titolo: 'Angoli, e rette parallele tagliate da una trasversale', testo: R`Un **angolo** è la parte di piano fra due semirette che partono dallo stesso punto, il vertice.

| nome | misura |
|---|---|
| acuto | meno di $90^\circ$ |
| retto | $90^\circ$ |
| ottuso | fra $90^\circ$ e $180^\circ$ |
| piatto | $180^\circ$ (le due semirette formano una retta) |
| giro | $360^\circ$ |

Due angoli sono **complementari** se insieme fanno $90^\circ$, **supplementari** se fanno $180^\circ$. Per esempio, $35^\circ$ ha complementare $55^\circ$ e supplementare $145^\circ$.

### Angoli opposti al vertice

Due rette che si incrociano formano quattro angoli. Due angoli uno di fronte all'altro sono **opposti al vertice**, e sono congruenti. Chiama $\alpha$ e $\gamma$ due angoli opposti, e $\beta$ quello in mezzo:

~ \alpha+\beta=180^\circ :: $\alpha$ e $\beta$ insieme formano un angolo piatto
~ \gamma+\beta=180^\circ :: anche $\gamma$ e $\beta$ formano un angolo piatto
~ \evidb{\alpha=\gamma} :: sono supplementari dello stesso angolo $\beta$, quindi sono uguali

### Due parallele e una trasversale

Taglia due rette parallele $r$ e $s$ con una terza retta $t$, la **trasversale**. Si formano otto angoli, e alcune coppie hanno un nome:

- **corrispondenti**: nella stessa posizione nei due incroci. Sono **congruenti**.
- **alterni interni**: fra le parallele, da parti opposte di $t$. Sono **congruenti**.
- **coniugati interni**: fra le parallele, dalla stessa parte di $t$. Sono **supplementari**.

Trascina il punto $Q$: gli angoli $\alpha$ cambiano insieme e restano uguali.

[[grafico:trasversale]]

>* Vale anche il contrario: se due rette formano con una trasversale angoli alterni interni congruenti, sono parallele.

?? Due rette tagliate da una trasversale formano angoli coniugati interni di $70^\circ$ e $110^\circ$. Le due rette sono parallele?
[x] sì
[ ] no, i due angoli sono diversi
[ ] non si può dire
=> Sì. I coniugati interni sommano $180^\circ$ solo con due parallele, e qui $70^\circ+110^\circ=180^\circ$. Gli angoli *uguali* sono gli alterni interni e i corrispondenti, non i coniugati.

>! Gli opposti al vertice stanno nello stesso incrocio. Gli alterni interni stanno in due incroci diversi, uno su $r$ e uno su $s$.` },

    { id: 'triangoli-classificazione', titolo: 'Triangoli: classificazione, somma degli angoli e disuguaglianza triangolare', testo: R`Un triangolo si classifica in due modi: guardando i lati oppure guardando gli angoli.

| per i lati | |
|---|---|
| scaleno | tre lati diversi |
| isoscele | almeno due lati congruenti |
| equilatero | tre lati congruenti |

| per gli angoli | |
|---|---|
| acutangolo | tre angoli acuti |
| rettangolo | un angolo retto |
| ottusangolo | un angolo ottuso |

Nel triangolo rettangolo i lati che formano l'angolo retto sono i **cateti**, il terzo è l'**ipotenusa**.

>* Nel triangolo isoscele gli **angoli alla base**, opposti ai lati congruenti, sono congruenti. Nel triangolo equilatero i tre angoli misurano $60^\circ$.

### La somma degli angoli

Due angoli di un triangolo misurano $50^\circ$ e $60^\circ$. Il terzo misura $180^\circ-50^\circ-60^\circ=70^\circ$, perché gli angoli di qualunque triangolo sommano $180^\circ$.

[[video:geometria-euclidea/centottanta-gradi]]

Guarda l'animazione, poi la dimostrazione. Chiama $\alpha$, $\beta$, $\gamma$ gli angoli in $A$, $B$, $C$. Poi traccia per $C$ la parallela $r$ ad $AB$.

[[animazione:somma-angoli]]

~ r\parallel AB :: per $C$ traccio la parallela ad $AB$ (per il quinto postulato ce n'è una sola)
~ \alpha'=\evid{\alpha} :: $\alpha'$, l'angolo in $C$ fra $r$ e $CA$, e $\alpha$ sono alterni interni fra $r$ e $AB$, tagliate da $AC$
~ \beta'=\evid{\beta} :: stesso ragionamento con la trasversale $BC$
~ \alpha'+\gamma+\beta'=180^\circ :: i tre angoli in $C$, uno accanto all'altro, formano l'angolo piatto su $r$
~ \evidb{\alpha+\beta+\gamma=180^\circ} :: sostituisco $\alpha'$ e $\beta'$

?? Un triangolo può avere due angoli retti?
=> No. Due angoli retti fanno già $180^\circ$, e per il terzo angolo non resta niente. Per lo stesso motivo un triangolo ha al massimo un angolo ottuso.

### La disuguaglianza triangolare

Con bastoncini lunghi $2$, $3$ e $10$ non fai un triangolo. I due corti, in fila, arrivano solo a $5$.

>* **Disuguaglianza triangolare:** ogni lato è minore della somma degli altri due, e maggiore della loro differenza. Con due lati di $4$ e $9$, il terzo sta fra $9-4=5$ e $9+4=13$.` },

    { id: 'congruenza-punti-notevoli', titolo: 'Congruenza dei triangoli e punti notevoli', testo: R`Due triangoli sono **congruenti** se, ritagliati, si sovrappongono perfettamente. Per esserne sicuro bastano tre elementi, scelti bene.

>* **Criteri di congruenza** (L = lato, A = angolo). **LAL:** due lati e l'angolo fra loro. **ALA:** due angoli e il lato fra loro. **LLL:** i tre lati.

?? Due triangoli hanno gli angoli di $50^\circ$, $60^\circ$ e $70^\circ$. Sono congruenti?
[ ] sì, per il criterio ALA
[x] non per forza: uno può essere più grande
[ ] sì, perché hanno tre angoli uguali
=> Con tre angoli uguali i triangoli sono **simili**. Pensa a un triangolo e alla sua fotocopia ingrandita. Il criterio ALA chiede anche un **lato** uguale, e qui dei lati non sai niente.

### I punti notevoli

In ogni triangolo ci sono quattro terne di linee speciali. Le tre linee di ogni terna si incontrano in un punto.

- Le **mediane** vanno da un vertice al punto medio del lato opposto. Si incontrano nel **baricentro**, che divide ogni mediana in due parti: una è il doppio dell'altra.
- Le **altezze** partono da un vertice e sono perpendicolari al lato opposto. Si incontrano nell'**ortocentro**.
- Le **bisettrici** dividono a metà gli angoli. Si incontrano nell'**incentro**, il centro della circonferenza inscritta.
- Gli **assi** sono le perpendicolari ai lati nel punto medio. Si incontrano nel **circocentro**, il centro della circonferenza circoscritta.

>! Mediana, altezza e bisettrice dallo stesso vertice sono tre segmenti diversi. Coincidono solo nel triangolo isoscele, partendo dal vertice fra i lati congruenti.` },

    { id: 'quadrilateri', titolo: 'I quadrilateri', testo: R`Una diagonale divide un quadrilatero in due triangoli. Per questo gli angoli di un quadrilatero sommano $2\cdot180^\circ=360^\circ$.

Il **parallelogramma** ha i lati opposti paralleli.

>* In ogni **parallelogramma** i lati opposti sono congruenti, e anche gli angoli opposti. Due angoli consecutivi sono supplementari. Le diagonali si tagliano a metà.

Esempio: un angolo misura $65^\circ$. Quello consecutivo misura $180^\circ-65^\circ=115^\circ$, quello opposto di nuovo $65^\circ$.

- Il **rettangolo** ha quattro angoli retti e le diagonali congruenti.
- Il **rombo** ha quattro lati congruenti e le diagonali perpendicolari.
- Il **quadrato** è rettangolo e rombo insieme.

Il **trapezio** ha una sola coppia di lati paralleli, le basi. Nel trapezio **isoscele** gli altri due lati sono congruenti.

?? Un quadrilatero ha le diagonali perpendicolari. È per forza un rombo?
=> No. Nel rombo le diagonali sono perpendicolari **e** si tagliano a metà. Pensa all'aquilone: ha le diagonali perpendicolari, ma non è un parallelogramma.

>! «Ogni quadrato è un rombo» è vero. «Ogni rombo è un quadrato» è falso, perché al rombo mancano gli angoli retti.` },

    { id: 'pitagora-euclide', titolo: 'Il teorema di Pitagora e i teoremi di Euclide', testo: R`Una scala lunga $5$ metri è appoggiata al muro, con il piede a $3$ metri dal muro. Muro, pavimento e scala formano un triangolo rettangolo. La scala è l'ipotenusa, il lato opposto all'angolo retto.

Per trovare l'altezza $h$ scrivi $3^2+h^2=5^2$, quindi $h^2=25-9=16$ e $h=4$ metri.

>* **Teorema di Pitagora:** $$c^2=a^2+b^2$$ con $c$ ipotenusa e $a$, $b$ cateti.

[[video:geometria-euclidea/pitagora]]

[[animazione:pitagora]]

?? Un triangolo rettangolo ha ipotenusa $13$ e un cateto $5$. Quanto misura l'altro cateto?
[x] $12$
[ ] $\sqrt{194}$
[ ] $8$
[ ] $18$
=> $\sqrt{13^2-5^2}=\sqrt{169-25}=\sqrt{144}=12$. Per un cateto si fa la **differenza** dei quadrati; $\sqrt{194}$ viene dalla somma, come se $13$ fosse un cateto. $8$ e $18$ vengono dai lati senza elevare al quadrato.

### Il teorema inverso

I lati $5$, $12$, $13$ formano un triangolo rettangolo, perché $25+144=169$. Vale infatti anche il contrario: se il quadrato del lato più lungo è la somma degli altri due quadrati, il triangolo è rettangolo.

Trascina il vertice $C$. Quando $AC^2+BC^2=AB^2$, l'angolo in $C$ è retto e $C$ sta sulla semicirconferenza.

[[grafico:pitagoraInverso]]

### I teoremi di Euclide

Traccia l'altezza $h$ relativa all'ipotenusa. Divide l'ipotenusa $c$ in due pezzi, $m$ e $n$: sono le **proiezioni** dei cateti. La proiezione di un cateto è il pezzo di ipotenusa attaccato a lui.

[[animazione:euclide-primo]]

>* **Primo teorema di Euclide:** un cateto al quadrato è uguale all'ipotenusa per la sua proiezione: $b^2=c\cdot m$ e $a^2=c\cdot n$. **Secondo teorema di Euclide:** l'altezza al quadrato è il prodotto delle due proiezioni: $h^2=m\cdot n$.

Sul libro trovi spesso la stessa cosa scritta come proporzione: $c:b=b:m$. Per questo si dice che il cateto è **medio proporzionale** fra l'ipotenusa e la sua proiezione. Allo stesso modo l'altezza è medio proporzionale fra le due proiezioni.

Dal primo teorema viene fuori Pitagora:

~ b^2=c\cdot m :: primo teorema per il cateto $b$
~ a^2=c\cdot n :: primo teorema per il cateto $a$
~ a^2+b^2=c\cdot n+c\cdot m :: sommo membro a membro
~ a^2+b^2=c\,(\evid{m+n}) :: raccolgo $c$
~ a^2+b^2=c\cdot\evid{c}=\evidb{c^2} :: le due proiezioni, messe in fila, formano tutta l'ipotenusa

Esempio: cateti $12$ e $16$. Trova ipotenusa, proiezioni e altezza.

~ c=\sqrt{144+256}=20 :: Pitagora
~ m=\frac{12^2}{20}=7{,}2 :: primo teorema per il cateto $12$: $m=\frac{b^2}{c}$
~ n=\frac{16^2}{20}=12{,}8 :: primo teorema per l'altro cateto; controllo: $7{,}2+12{,}8=20$
~ h=\sqrt{7{,}2\cdot12{,}8}=\evidb{9{,}6} :: secondo teorema

>! Ogni cateto va con la **sua** proiezione: $20\cdot7{,}2=144=12^2$. Con l'altra viene $20\cdot12{,}8=256=16^2$, il quadrato dell'altro cateto.` },

    { id: 'talete-similitudine', titolo: 'Il teorema di Talete e la similitudine', testo: R`Un palo alto $3$ metri fa un'ombra di $2$ metri. Nello stesso momento un albero fa un'ombra di $10$ metri. Quanto è alto l'albero?

I raggi del sole arrivano paralleli, quindi i due triangoli hanno la stessa forma. L'ombra dell'albero è $5$ volte quella del palo. Allora anche l'albero è alto $5$ volte il palo: $15$ metri.

[[video:geometria-euclidea/piramide]]

>* **Teorema di Talete:** un fascio di rette parallele taglia due trasversali in segmenti proporzionali.

[[video:geometria-euclidea/talete]]

[[animazione:talete]]

### La similitudine

Due figure sono **simili** se una è un ingrandimento dell'altra. Gli angoli corrispondenti sono congruenti. I lati corrispondenti sono moltiplicati tutti per lo stesso numero $k$, il **rapporto di similitudine**.

>* **Criteri di similitudine dei triangoli.** **Primo:** due angoli congruenti. **Secondo:** due lati in proporzione e l'angolo fra loro congruente. **Terzo:** i tre lati in proporzione.

### Perimetri e aree

Se i lati si moltiplicano per $k$, il perimetro si moltiplica per $k$. L'area invece si moltiplica per $k^2$:

~ A=\frac{b\cdot h}{2} :: area del triangolo di partenza
~ A'=\frac{\evid{k\,b}\cdot \evid{k\,h}}{2} :: nel triangolo simile base e altezza sono moltiplicate tutte e due per $k$
~ A'=\evidb{k^2}\cdot\frac{b\cdot h}{2}=k^2A :: i due $k$ si moltiplicano fra loro

>* Rapporto dei perimetri: $k$. Rapporto delle aree: $k^2$.

Trascina il vertice $B'$: quando i lati raddoppiano, l'area diventa quattro volte tanto.

[[grafico:simili]]

?? Una pizza ha diametro $30$ cm, un'altra $15$ cm. Quante pizze piccole fanno una pizza grande?
[x] $4$
[ ] $2$
[ ] $3{,}14$
=> Le due pizze sono simili con $k=2$, quindi le aree stanno nel rapporto $k^2=4$. Chi risponde $2$ confronta i diametri, non le superfici.

>! Se raddoppi i lati, l'area non raddoppia: si moltiplica per $4$.` },

    { id: 'circonferenza', titolo: 'La circonferenza e il cerchio', testo: R`La **circonferenza** è fatta dai punti che hanno la stessa distanza, il **raggio**, da un punto fisso, il **centro**. Il **cerchio** è la circonferenza con tutto quello che c'è dentro.

Una **corda** unisce due punti della circonferenza. Il **diametro** è la corda che passa per il centro.

### Angoli al centro e alla circonferenza

Prendi due punti $A$ e $B$ sulla circonferenza di centro $O$.

- $A\widehat{O}B$ ha il vertice nel centro: è un **angolo al centro**.
- $A\widehat{C}B$ ha il vertice $C$ sulla circonferenza: è un **angolo alla circonferenza**.

Tutti e due **insistono** sull'arco $AB$. Trascina $C$ lungo l'arco grande: l'angolo in $C$ non cambia, ed è la metà di $A\widehat{O}B$.

[[grafico:angoliCerchio]]

>* L'angolo al centro è il **doppio** dell'angolo alla circonferenza che insiste sullo stesso arco.

Perché il doppio? Guarda il caso in cui $CA$ è un diametro:

~ OC=OB :: sono due raggi
~ O\widehat{B}C=O\widehat{C}B=\alpha :: il triangolo $OBC$ è isoscele, quindi ha gli angoli alla base congruenti
~ A\widehat{O}B=\alpha+\alpha :: $A\widehat{O}B$ è un angolo esterno del triangolo $OBC$: è la somma dei due angoli interni non adiacenti
~ A\widehat{O}B=\evidb{2\alpha} :: l'angolo al centro è il doppio di quello in $C$

Gli altri casi si riportano a questo.

Se l'arco è una semicirconferenza, l'angolo al centro è piatto. Quindi l'angolo alla circonferenza è retto.

>* Un triangolo inscritto in una semicirconferenza, con un lato sul diametro, è **rettangolo**.

?? Un angolo alla circonferenza misura $40^\circ$. Quanto misura l'angolo al centro sullo stesso arco?
[x] $80^\circ$
[ ] $20^\circ$
[ ] $40^\circ$
[ ] $140^\circ$
=> L'angolo al centro è il doppio: $80^\circ$. Chi risponde $20^\circ$ ha dimezzato invece di raddoppiare. L'angolo con il vertice nel centro è sempre il più grande dei due.

### Rette e circonferenza

Confronta la distanza $d$ della retta dal centro con il raggio $r$:

- $d<r$: la retta è **secante** (due punti in comune);
- $d=r$: la retta è **tangente** (un punto);
- $d>r$: la retta è **esterna** (nessun punto).

>* La **tangente** in un punto è **perpendicolare** al raggio che arriva in quel punto.` },

    { id: 'aree-poligoni', titolo: 'Aree, lunghezza della circonferenza e poligoni regolari', testo: R`Le formule delle aree vengono quasi tutte dal rettangolo, base per altezza. Un triangolo è metà di un parallelogramma.

| figura | area |
|---|---|
| parallelogramma | $b\cdot h$ |
| triangolo | $\frac{b\cdot h}{2}$ |
| trapezio | $\frac{(B+b)\cdot h}{2}$ |
| rombo | $\frac{d\cdot d'}{2}$ (diagonali) |

Nel triangolo la base può essere un lato qualunque. L'altezza è la distanza del vertice opposto dalla retta di **quel** lato.

Trascina il vertice $C$ in orizzontale: il triangolo cambia forma, ma base e altezza restano uguali, e quindi anche l'area.

[[grafico:areaTriangolo]]

?? Un triangolo ha un lato di $6$ cm. Il vertice opposto dista $4$ cm dalla retta di quel lato, ma l'altezza cade fuori dal lato. Quanto vale l'area?
[x] $12\ \text{cm}^2$
[ ] $24\ \text{cm}^2$
[ ] non si può calcolare
=> $\frac{6\cdot4}{2}=12$. L'altezza è la distanza dalla **retta** della base, e può cadere fuori dal lato. La formula vale lo stesso. $24$ è l'area del parallelogramma: manca la divisione per $2$.

### Circonferenza e cerchio

Con raggio $5$ cm la circonferenza è lunga $2\pi\cdot5=10\pi\approx31{,}4$ cm. Il cerchio ha area $\pi\cdot5^2=25\pi\approx78{,}5\ \text{cm}^2$.

>* $$C=2\pi r\qquad A=\pi r^2$$

L'animazione taglia il cerchio in spicchi e li mette in fila. Viene quasi un rettangolo di base $\pi r$ e altezza $r$.

[[animazione:area-cerchio]]

### Poligoni regolari

Un poligono è **regolare** se ha i lati tutti congruenti e gli angoli tutti congruenti.

Le diagonali che partono da un vertice dividono un poligono di $n$ lati in $n-2$ triangoli. Quindi gli angoli interni sommano $(n-2)\cdot180^\circ$.

~ (n-2)\cdot180^\circ :: somma degli angoli interni di un poligono di $n$ lati
~ (6-2)\cdot180^\circ=\evid{720^\circ} :: per l'esagono, $n=6$: quattro triangoli
~ 720^\circ:6=\evidb{120^\circ} :: nell'esagono regolare i sei angoli sono uguali

>! $\pi$ vale **circa** $3{,}14$: ha infinite cifre decimali. Nei conti tieni $\pi$ fino alla fine, per esempio $25\pi$. Approssima solo il risultato.` }
  ],

  grafici: {
    trasversale: {
      tipo: 'piano', x: [-3, 7], y: [0, 8], assi: false, griglia: false,
      parametri: [ { nome: 'qx', min: -1.5, max: 4, passo: 0.5, valore: 3, nascosto: true } ],
      elementi: [
        { tipo: 'orizzontale', y: 2, etichetta: 'r', colore: 1 },
        { tipo: 'orizzontale', y: 5, etichetta: 's', colore: 1 },
        { tipo: 'retta', per: [[1, 2], ['qx', 5]], etichetta: 't', colore: 4 },
        { tipo: 'angolo', vertice: [1, 2], da: [3.5, 2], a: ['qx', 5], etichetta: 'α', raggio: 0.7, colore: 2 },
        { tipo: 'angolo', vertice: ['qx', 5], da: ['qx - 2.5', 5], a: [1, 2], etichetta: 'α', raggio: 0.7, colore: 2 },
        { tipo: 'angolo', vertice: ['qx', 5], da: ['qx + 2.5', 5], a: ['2*qx - 1', 8], etichetta: 'α', raggio: 0.7, colore: 2 },
        { tipo: 'angolo', vertice: ['qx', 5], da: ['qx + 2.5', 5], a: [1, 2], etichetta: 'β', raggio: 0.5, colore: 3 },
        { tipo: 'punto', p: [1, 2], etichetta: 'P', posizione: 'basso-sinistra' },
        { tipo: 'punto', p: ['qx', 5], trascina: true, etichetta: 'Q', posizione: 'alto-sinistra', colore: 4 },
        { tipo: 'testo', p: [-2.8, 7.4], testo: 'α = {{' + ANG([1, 2], [3.5, 2], ['qx', 5]) + '}}°', ancora: 'start' },
        { tipo: 'testo', p: [-2.8, 6.6], testo: 'β = {{180 - ' + ANG([1, 2], [3.5, 2], ['qx', 5]) + '}}°', ancora: 'start' }
      ],
      didascalia: "Trascina Q lungo s. In P e in Q gli angoli α (alterno interno e corrispondente) restano uguali; β, coniugato interno, è sempre 180° − α."
    },
    pitagoraInverso: {
      tipo: 'piano', x: [-2.5, 7.5], y: [-1, 5.5], assi: false, proporzioni: 'uguali',
      parametri: [
        { nome: 'cx', min: -2, max: 7, passo: 0.5, valore: 3, nascosto: true },
        { nome: 'cy', min: 0.5, max: 5, passo: 0.5, valore: 3.5, nascosto: true }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [2.5, 0], raggio: 2.5, tratteggio: true, colore: 4 },
        { tipo: 'poligono', punti: [[0, 0], [5, 0], ['cx', 'cy']], etichette: ['A', 'B', ''], colore: 1 },
        { tipo: 'angolo', vertice: ['cx', 'cy'], da: [0, 0], a: [5, 0], raggio: 0.6, colore: 2 },
        { tipo: 'punto', p: ['cx', 'cy'], trascina: true, etichetta: 'C', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-2.3, -0.6], testo: 'C = ({{cx}}; {{cy}})', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 5.1], testo: 'AC² + BC² = {{cx^2 + cy^2 + (cx-5)^2 + cy^2}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 4.4], testo: 'AB² = 25', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 3.7], testo: 'angolo in C = {{' + ANG(['cx', 'cy'], [0, 0], [5, 0]) + '}}°', ancora: 'start' }
      ],
      didascalia: "Trascina C. La somma AC² + BC² vale 25 solo quando C è sulla semicirconferenza, e lì l'angolo in C è retto: prova (4; 2), (1; 2), (2,5; 2,5)."
    },
    simili: {
      tipo: 'piano', x: [-0.5, 12], y: [-0.8, 6.5], assi: false, griglia: false,
      parametri: [ { nome: 'bx', min: 4.5, max: 11.5, passo: 0.5, valore: 7.5, nascosto: true } ],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [2, 0], [0, 1.5]], etichette: ['A', 'B', 'C'], colore: 1 },
        { tipo: 'poligono', punti: [[3.5, 0], ['bx', 0], [3.5, '0.75*(bx - 3.5)']], etichette: ['A′', '', 'C′'], colore: 2 },
        { tipo: 'punto', p: ['bx', 0], trascina: true, etichetta: 'B′', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [11.8, 6.0], testo: 'lati × {{(bx - 3.5)/2}}', ancora: 'end' },
        { tipo: 'testo', p: [11.8, 5.2], testo: 'perimetro × {{(bx - 3.5)/2}}', ancora: 'end' },
        { tipo: 'testo', p: [11.8, 4.4], testo: 'area × {{((bx - 3.5)/2)^2}}', ancora: 'end' }
      ],
      didascalia: "Trascina B′ per ingrandire A′B′C′, che resta simile ad ABC. Con i lati × 2 l'area è × 4; con i lati × 3 è × 9."
    },
    angoliCerchio: {
      tipo: 'piano', x: [-5.5, 5.5], y: [-5.5, 5.5], assi: false, griglia: false,
      parametri: [
        { nome: 't', min: 0, max: 360, passo: 1, valore: 250, nascosto: true },
        { nome: 'w', min: 20, max: 180, passo: 2, valore: 100, etichetta: 'angolo AOB (°)' }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 4, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: PA, colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: PB, colore: 2 },
        { tipo: 'segmento', da: PC, a: PA, colore: 3 },
        { tipo: 'segmento', da: PC, a: PB, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: PB, a: PA, raggio: 0.9, colore: 2 },
        { tipo: 'angolo', vertice: PC, da: PA, a: PB, raggio: 0.9, colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-destra' },
        { tipo: 'punto', p: PA, etichetta: 'A', posizione: 'alto-sinistra' },
        { tipo: 'punto', p: PB, etichetta: 'B', posizione: 'alto-destra' },
        { tipo: 'punto', p: PC, etichetta: 'C', posizione: 'basso', colore: 3, trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true } },
        { tipo: 'testo', p: [-5.3, 5.1], testo: 'angolo AOB = {{w}}°', ancora: 'start' },
        { tipo: 'testo', p: [-5.3, 4.4], testo: 'angolo ACB = {{' + ANG(PC, PA, PB) + '}}°', ancora: 'start' }
      ],
      didascalia: "Trascina C lungo la circonferenza: sull'arco grande l'angolo in C resta la metà di AOB. Porta AOB a 180°: l'angolo in C è retto. Sull'arco piccolo, invece, diventa 180° meno quella metà."
    },
    areaTriangolo: {
      tipo: 'piano', x: [-2, 8], y: [-6, 7], assi: false,
      parametri: [
        { nome: 'cx', min: -1, max: 7, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'cy', min: -6, max: 6, passo: 0.5, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [6, 0], etichetta: 'B', posizione: 'basso' },
        { tipo: 'punto', p: ['cx', 'cy'], trascina: true, etichetta: 'C', posizione: 'alto', colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: [6, 0], etichetta: 'AB = 6' },
        { tipo: 'segmento', da: [0, 0], a: ['cx', 'cy'], colore: 1 },
        { tipo: 'segmento', da: [6, 0], a: ['cx', 'cy'], colore: 1 },
        { tipo: 'segmento', da: ['cx', 'cy'], a: ['cx', 0], tratteggio: true, etichetta: 'h', colore: 4 },
        { tipo: 'testo', p: [-1.8, 6.3], testo: 'area = {{3*abs(cy)}}', ancora: 'start' }
      ],
      didascalia: "Trascina C in orizzontale: la forma cambia, l'area no, perché l'altezza resta la stessa. In verticale invece l'area cresce con l'altezza h."
    }
  },

  esempi: [
    { titolo: 'Il terzo angolo di un triangolo', problema: R`In un triangolo due angoli misurano $42^\circ$ e $81^\circ$. Quanto misura il terzo?`, passi: [
      R`La somma degli angoli interni di un triangolo vale sempre $180^\circ$, qualunque sia la forma del triangolo.`,
      R`Il terzo angolo si trova per differenza: $180^\circ - 42^\circ - 81^\circ = 57^\circ$.`
    ], risultato: R`Il terzo angolo misura $57^\circ$.` },

    { titolo: 'Il teorema di Pitagora, in modo diretto', problema: R`In un triangolo rettangolo i cateti misurano $9\ \text{cm}$ e $12\ \text{cm}$. Quanto misura l'ipotenusa?`, passi: [
      R`Il teorema di Pitagora lega ipotenusa e cateti: $c^2 = a^2 + b^2$.`,
      R`$c^2 = 9^2 + 12^2 = 81 + 144 = 225$.`,
      R`$c = \sqrt{225} = 15\ \text{cm}$.`
    ], risultato: R`L'ipotenusa misura $15\ \text{cm}$.` },

    { titolo: "Angolo al centro e angolo alla circonferenza", problema: R`In una circonferenza, un angolo alla circonferenza che insiste su un certo arco misura $35^\circ$. Quanto misura l'angolo al centro che insiste sullo stesso arco?`, passi: [
      R`L'angolo al centro è sempre il doppio dell'angolo alla circonferenza che insiste sullo stesso arco.`,
      R`$2 \cdot 35^\circ = 70^\circ$.`
    ], risultato: R`L'angolo al centro misura $70^\circ$.` },

    { titolo: 'Riconoscere un triangolo rettangolo dai lati', problema: R`Un triangolo ha lati $8\ \text{cm}$, $15\ \text{cm}$ e $17\ \text{cm}$. È un triangolo rettangolo?`, passi: [
      R`Si applica il teorema di Pitagora *inverso*: se il quadrato del lato maggiore è uguale alla somma dei quadrati degli altri due, il triangolo è rettangolo.`,
      R`Il lato maggiore è $17\ \text{cm}$: $17^2 = 289$.`,
      R`Gli altri due: $8^2 + 15^2 = 64 + 225 = 289$.`,
      R`I due valori coincidono: il triangolo è rettangolo, con l'angolo retto opposto al lato di $17\ \text{cm}$.`
    ], risultato: R`Sì, è un triangolo rettangolo, perché $8^2 + 15^2 = 17^2$.` },

    { titolo: 'Similitudine: trovare i lati mancanti', problema: R`Il triangolo $ABC$, con $AB = 4\ \text{cm}$, $BC = 6\ \text{cm}$ e $CA = 8\ \text{cm}$, è simile al triangolo $A'B'C'$, in cui $A'B' = 6\ \text{cm}$. Quanto misurano $B'C'$ e $C'A'$?`, passi: [
      R`Il rapporto di similitudine si trova dal lato corrispondente noto: $k = \dfrac{A'B'}{AB} = \dfrac{6}{4} = 1{,}5$.`,
      R`Tutti i lati del secondo triangolo sono quelli del primo moltiplicati per $k$: $B'C' = 6 \cdot 1{,}5 = 9\ \text{cm}$.`,
      R`$C'A' = 8 \cdot 1{,}5 = 12\ \text{cm}$.`
    ], risultato: R`$B'C' = 9\ \text{cm}$ e $C'A' = 12\ \text{cm}$.` },

    { titolo: 'I teoremi di Euclide, insieme', problema: R`In un triangolo rettangolo i cateti misurano $12\ \text{cm}$ e $16\ \text{cm}$. Trova le proiezioni dei cateti sull'ipotenusa e l'altezza relativa a essa.`, passi: [
      R`Prima serve l'ipotenusa, con il teorema di Pitagora: $c = \sqrt{12^2+16^2} = \sqrt{144+256} = \sqrt{400} = 20\ \text{cm}$.`,
      R`Dal primo teorema di Euclide, $b^2 = c\cdot m$, si ricava la proiezione: $m = \dfrac{b^2}{c}$. Per il cateto di $12\ \text{cm}$: $m = \dfrac{144}{20} = 7{,}2\ \text{cm}$.`,
      R`Per il cateto di $16\ \text{cm}$: $n = \dfrac{256}{20} = 12{,}8\ \text{cm}$. Controllo: $m+n = 7{,}2+12{,}8=20\ \text{cm}$, l'intera ipotenusa. ✓`,
      R`Dal secondo teorema di Euclide, $h^2 = m\cdot n = 7{,}2 \cdot 12{,}8 = 92{,}16$, quindi $h = \sqrt{92{,}16} = 9{,}6\ \text{cm}$.`
    ], risultato: R`Proiezioni $7{,}2\ \text{cm}$ e $12{,}8\ \text{cm}$; altezza relativa all'ipotenusa $9{,}6\ \text{cm}$.` }
  ],

  formulario: [
    { nome: 'Somma degli angoli interni di un triangolo', formula: R`\alpha + \beta + \gamma = 180^\circ` },
    { nome: 'Somma degli angoli interni di un poligono', formula: R`(n-2)\cdot 180^\circ`, nota: R`$n$ = numero dei lati. Per un poligono regolare, l'angolo interno si trova dividendo questa somma per $n$.` },
    { nome: 'Disuguaglianza triangolare', formula: R`a < b + c`, nota: R`Vale per ciascun lato del triangolo; equivale anche a $a > |b-c|$.` },
    { nome: 'Teorema di Pitagora', formula: R`c^2 = a^2 + b^2`, nota: R`$c$ = ipotenusa, $a$, $b$ = cateti.` },
    { nome: 'Primo teorema di Euclide', formula: R`b^2 = c \cdot m`, nota: R`$m$ = proiezione del cateto $b$ sull'ipotenusa $c$.` },
    { nome: 'Secondo teorema di Euclide', formula: R`h^2 = m \cdot n`, nota: R`$m$, $n$ = proiezioni dei due cateti sull'ipotenusa; $h$ = altezza relativa all'ipotenusa.` },
    { nome: 'Rapporto di similitudine', formula: R`\frac{A'B'}{AB} = \frac{B'C'}{BC} = \frac{C'A'}{CA} = k`, nota: R`Vale per due triangoli simili, con vertici corrispondenti nello stesso ordine.` },
    { nome: 'Rapporto fra i perimetri di poligoni simili', formula: R`\frac{2p'}{2p} = k`, nota: R`Uguale al rapporto di similitudine $k$.` },
    { nome: 'Rapporto fra le aree di poligoni simili', formula: R`\frac{A'}{A} = k^2` },
    { nome: 'Area del triangolo', formula: R`\frac{b \cdot h}{2}`, nota: R`$b$ = un lato qualsiasi (base), $h$ = altezza relativa a quel lato.` },
    { nome: 'Area del trapezio', formula: R`\frac{(B + b)\cdot h}{2}`, nota: R`$B$, $b$ = basi maggiore e minore, $h$ = altezza.` },
    { nome: 'Area del rombo', formula: R`\frac{d \cdot d'}{2}`, nota: R`$d$, $d'$ = le due diagonali.` },
    { nome: 'Lunghezza della circonferenza', formula: R`C = 2\pi r` },
    { nome: 'Area del cerchio', formula: R`A = \pi r^2` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'enti-primitivi-assiomi', tipo: 'definizione', fronte: R`Enti primitivi`, retro: R`Punto, retta e piano: nozioni che non si definiscono con altre più semplici, ma solo si descrivono.` },
    { id: 'fc-02', sezione: 'enti-primitivi-assiomi', tipo: 'definizione', fronte: R`Postulato (o assioma)`, retro: R`Un'affermazione che si assume vera senza dimostrazione: è il punto di partenza per dimostrare i teoremi.` },
    { id: 'fc-03', sezione: 'enti-primitivi-assiomi', tipo: 'concetto', fronte: R`Che cosa vuol dire «dimostrare» un teorema?`, retro: R`Costruire una catena di passaggi logici che, partendo da assiomi e teoremi già noti, arriva alla tesi senza usare il disegno come prova.` },
    { id: 'fc-04', sezione: 'angoli-parallele', tipo: 'definizione', fronte: R`Angoli complementari`, retro: R`La loro somma misura $90^\circ$.` },
    { id: 'fc-05', sezione: 'angoli-parallele', tipo: 'definizione', fronte: R`Angoli supplementari`, retro: R`La loro somma misura $180^\circ$.` },
    { id: 'fc-06', sezione: 'angoli-parallele', tipo: 'concetto', fronte: R`Angoli opposti al vertice`, retro: R`Si formano quando due rette si incontrano; sono sempre congruenti.` },
    { id: 'fc-07', sezione: 'angoli-parallele', tipo: 'concetto', fronte: R`Angoli alterni interni fra due parallele`, retro: R`Se una trasversale taglia due rette parallele, gli angoli alterni interni sono congruenti (e viceversa: se sono congruenti, le rette sono parallele).` },
    { id: 'fc-08', sezione: 'triangoli-classificazione', tipo: 'definizione', fronte: R`Classificazione dei triangoli per lati`, retro: R`Scaleno (lati tutti diversi), isoscele (almeno due lati congruenti), equilatero (tre lati congruenti).` },
    { id: 'fc-09', sezione: 'triangoli-classificazione', tipo: 'concetto', fronte: R`Somma degli angoli interni di un triangolo`, retro: R`Vale sempre $180^\circ$, qualunque triangolo si consideri.` },
    { id: 'fc-10', sezione: 'triangoli-classificazione', tipo: 'concetto', fronte: R`Disuguaglianza triangolare`, retro: R`Ogni lato di un triangolo è minore della somma degli altri due (e maggiore della loro differenza).` },
    { id: 'fc-11', sezione: 'congruenza-punti-notevoli', tipo: 'concetto', fronte: R`Primo criterio di congruenza (LAL)`, retro: R`Due lati e l'angolo compreso fra essi congruenti.` },
    { id: 'fc-12', sezione: 'congruenza-punti-notevoli', tipo: 'concetto', fronte: R`Terzo criterio di congruenza (LLL)`, retro: R`I tre lati congruenti.` },
    { id: 'fc-13', sezione: 'congruenza-punti-notevoli', tipo: 'concetto', fronte: R`Perché AAA non è un criterio di congruenza`, retro: R`Tre angoli congruenti garantiscono la stessa forma (similitudine), non la stessa grandezza.` },
    { id: 'fc-14', sezione: 'congruenza-punti-notevoli', tipo: 'definizione', fronte: R`Baricentro`, retro: R`Punto d'incontro delle tre mediane; divide ciascuna mediana in due parti, una doppia dell'altra.` },
    { id: 'fc-15', sezione: 'congruenza-punti-notevoli', tipo: 'definizione', fronte: R`Incentro e circocentro`, retro: R`L'incentro (bisettrici) è centro della circonferenza inscritta; il circocentro (assi dei lati) è centro della circonferenza circoscritta.` },
    { id: 'fc-16', sezione: 'quadrilateri', tipo: 'concetto', fronte: R`Angoli in un parallelogramma`, retro: R`Gli angoli opposti sono congruenti, quelli consecutivi (sullo stesso lato) sono supplementari.` },
    { id: 'fc-17', sezione: 'quadrilateri', tipo: 'definizione', fronte: R`Rombo`, retro: R`Parallelogramma con tutti i lati congruenti; le diagonali sono perpendicolari e bisettrici degli angoli.` },
    { id: 'fc-18', sezione: 'pitagora-euclide', tipo: 'formula', fronte: R`Teorema di Pitagora`, retro: R`$c^2 = a^2 + b^2$, con $c$ ipotenusa e $a$, $b$ cateti.` },
    { id: 'fc-19', sezione: 'pitagora-euclide', tipo: 'concetto', fronte: R`Teorema di Pitagora inverso`, retro: R`Se in un triangolo il quadrato del lato maggiore è uguale alla somma dei quadrati degli altri due, il triangolo è rettangolo.` },
    { id: 'fc-20', sezione: 'pitagora-euclide', tipo: 'formula', fronte: R`Primo teorema di Euclide`, retro: R`$b^2 = c \cdot m$: ogni cateto è medio proporzionale fra l'ipotenusa e la propria proiezione su di essa.` },
    { id: 'fc-21', sezione: 'pitagora-euclide', tipo: 'formula', fronte: R`Secondo teorema di Euclide`, retro: R`$h^2 = m \cdot n$: l'altezza relativa all'ipotenusa è medio proporzionale fra le due proiezioni dei cateti.` },
    { id: 'fc-22', sezione: 'talete-similitudine', tipo: 'concetto', fronte: R`Teorema di Talete`, retro: R`Un fascio di rette parallele taglia su due trasversali segmenti corrispondenti proporzionali.` },
    { id: 'fc-23', sezione: 'talete-similitudine', tipo: 'concetto', fronte: R`Rapporto fra le aree di poligoni simili`, retro: R`È il quadrato del rapporto di similitudine, $k^2$.` },
    { id: 'fc-24', sezione: 'circonferenza', tipo: 'concetto', fronte: R`Angolo al centro e angolo alla circonferenza`, retro: R`L'angolo al centro è il doppio dell'angolo alla circonferenza che insiste sullo stesso arco.` },
    { id: 'fc-25', sezione: 'circonferenza', tipo: 'concetto', fronte: R`Retta tangente a una circonferenza`, retro: R`Ha un solo punto in comune con la circonferenza ed è perpendicolare al raggio in quel punto.` },
    { id: 'fc-26', sezione: 'aree-poligoni', tipo: 'formula', fronte: R`Area del cerchio e lunghezza della circonferenza`, retro: R`$A = \pi r^2$ e $C = 2\pi r$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Due angoli di un triangolo misurano $45^\circ$ e $75^\circ$. Quanto misura il terzo angolo?`, suggerimenti: [R`Gli angoli di un triangolo sommano $180^\circ$.`], risposta: gradi(60), soluzione: [R`I tre angoli insieme fanno $180^\circ$.`, R`Il terzo misura $180^\circ-45^\circ-75^\circ=60^\circ$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`In un triangolo rettangolo un angolo acuto misura $35^\circ$. Quanto misura l'altro angolo acuto?`, suggerimenti: [R`L'angolo retto prende già $90^\circ$: ai due angoli acuti restano $90^\circ$.`], risposta: gradi(55), soluzione: [R`I due angoli acuti insieme fanno $180^\circ-90^\circ=90^\circ$.`, R`L'altro misura $90^\circ-35^\circ=55^\circ$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Due rette parallele sono tagliate da una trasversale. Un angolo alterno interno misura $65^\circ$. Quanto misura l'altro?`, suggerimenti: [R`Fra due parallele gli angoli alterni interni sono congruenti.`], risposta: gradi(65), soluzione: [R`Gli alterni interni fra due parallele sono congruenti.`, R`Anche l'altro misura $65^\circ$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Due rette parallele sono tagliate da una trasversale. Un angolo coniugato interno misura $110^\circ$. Quanto misura l'altro?`, suggerimenti: [R`I coniugati interni sono supplementari: insieme fanno $180^\circ$.`], risposta: gradi(70), soluzione: [R`I coniugati interni fra due parallele sommano $180^\circ$.`, R`L'altro misura $180^\circ-110^\circ=70^\circ$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha i cateti di $3$ e $4$. Quanto misura l'ipotenusa?`, suggerimenti: [R`Usa Pitagora: $c^2=a^2+b^2$.`], risposta: num(5), soluzione: [R`$c^2=3^2+4^2=9+16=25$.`, R`$c=\sqrt{25}=5$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Un triangolo isoscele ha l'angolo al vertice di $80^\circ$. Quanto misura ciascun angolo alla base?`, suggerimenti: [R`Togli $80^\circ$ da $180^\circ$: quello che resta va ai due angoli alla base.`, R`Gli angoli alla base sono uguali: dividi per $2$.`], risposta: gradi(50), soluzione: [R`Ai due angoli alla base restano $180^\circ-80^\circ=100^\circ$.`, R`Sono congruenti, quindi ciascuno misura $100^\circ:2=50^\circ$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha l'ipotenusa di $10$ e un cateto di $6$. Quanto misura l'altro cateto?`, suggerimenti: [R`Per trovare un cateto fai la **differenza** dei quadrati.`], risposta: num(8), soluzione: [R`$b^2=10^2-6^2=100-36=64$.`, R`$b=\sqrt{64}=8$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Un angolo alla circonferenza misura $35^\circ$. Quanto misura l'angolo al centro che insiste sullo stesso arco?`, suggerimenti: [R`L'angolo al centro è il doppio di quello alla circonferenza.`], risposta: gradi(70), soluzione: [R`L'angolo al centro è il doppio.`, R`$2\cdot35^\circ=70^\circ$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Un angolo al centro misura $100^\circ$. Quanto misura un angolo alla circonferenza che insiste sullo stesso arco?`, suggerimenti: [R`L'angolo alla circonferenza è la metà di quello al centro.`], risposta: gradi(50), soluzione: [R`L'angolo alla circonferenza è la metà di quello al centro.`, R`$100^\circ:2=50^\circ$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Un triangolo ha base $8$ cm e altezza $5$ cm. Quanto vale l'area, in $\text{cm}^2$?`, suggerimenti: [R`Area del triangolo: base per altezza, diviso $2$.`], risposta: area(20), soluzione: [R`$A=\frac{b\cdot h}{2}=\frac{8\cdot5}{2}$.`, R`$A=\frac{40}{2}=20\ \text{cm}^2$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Un trapezio ha le basi di $10$ cm e $6$ cm e l'altezza di $4$ cm. Quanto vale l'area, in $\text{cm}^2$?`, suggerimenti: [R`Somma le due basi, moltiplica per l'altezza e dividi per $2$.`], risposta: area(32), soluzione: [R`Somma delle basi: $10+6=16$.`, R`$A=\frac{16\cdot4}{2}=32\ \text{cm}^2$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Un rombo ha le diagonali di $6$ cm e $8$ cm. Quanto vale l'area, in $\text{cm}^2$?`, suggerimenti: [R`Area del rombo: diagonale per diagonale, diviso $2$.`], risposta: area(24), soluzione: [R`$A=\frac{d\cdot d'}{2}=\frac{6\cdot8}{2}$.`, R`$A=\frac{48}{2}=24\ \text{cm}^2$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`I lati di un triangolo misurano $8$, $15$ e $17$. È un triangolo rettangolo? Scrivi *sì* o *no*.`, suggerimenti: [R`Confronta il quadrato del lato più lungo con la somma dei quadrati degli altri due.`], risposta: SI, soluzione: [R`$8^2+15^2=64+225=289$.`, R`$17^2=289$: sono uguali.`, R`Per il teorema di Pitagora inverso il triangolo è rettangolo.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Due triangoli sono simili. Il primo ha i lati di $3$, $4$ e $5$. Nel secondo il lato che corrisponde a $3$ misura $6$. Quanto misura il lato che corrisponde a $5$?`, suggerimenti: [R`Trova prima il rapporto di similitudine: $6:3$.`], risposta: num(10), soluzione: [R`Il rapporto di similitudine è $k=6:3=2$.`, R`Ogni lato si moltiplica per $2$: $5\cdot2=10$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Due triangoli sono simili con rapporto $2$. Il più piccolo ha area $7\ \text{cm}^2$. Quanto vale l'area del più grande, in $\text{cm}^2$?`, suggerimenti: [R`Le aree stanno nel rapporto $k^2$, non nel rapporto $k$.`], risposta: area(28), soluzione: [R`Le aree stanno nel rapporto $k^2=2^2=4$.`, R`L'area grande è $7\cdot4=28\ \text{cm}^2$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Un triangolo è inscritto in una semicirconferenza, con un lato sul diametro. Un suo angolo acuto misura $25^\circ$. Quanto misura l'altro angolo acuto?`, suggerimenti: [R`Che triangolo è un triangolo inscritto in una semicirconferenza?`, R`È rettangolo: i due angoli acuti sommano $90^\circ$.`], risposta: gradi(65), soluzione: [R`Il triangolo è rettangolo: l'angolo opposto al diametro è retto.`, R`I due angoli acuti sommano $90^\circ$.`, R`L'altro misura $90^\circ-25^\circ=65^\circ$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`In un triangolo rettangolo l'ipotenusa misura $25$ e un cateto $15$. Quanto misura la proiezione di questo cateto sull'ipotenusa?`, suggerimenti: [R`Usa il primo teorema di Euclide: $b^2=c\cdot m$.`, R`Ricava $m=\frac{b^2}{c}$.`], risposta: num(9), soluzione: [R`Primo teorema di Euclide: $15^2=25\cdot m$.`, R`$225=25\cdot m$, quindi $m=\frac{225}{25}=9$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`In un triangolo rettangolo le proiezioni dei cateti sull'ipotenusa misurano $4$ e $9$. Quanto misura l'altezza relativa all'ipotenusa?`, suggerimenti: [R`Usa il secondo teorema di Euclide: $h^2=m\cdot n$.`], risposta: num(6), soluzione: [R`Secondo teorema di Euclide: $h^2=4\cdot9=36$.`, R`$h=\sqrt{36}=6$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Una circonferenza è lunga $10\pi$ cm. Quanto vale l'area del cerchio? Scrivi il risultato con $\pi$, per esempio *4π*.`, suggerimenti: [R`Da $C=2\pi r$ ricava il raggio.`, R`Poi usa $A=\pi r^2$.`], risposta: conPi(25), soluzione: [R`$2\pi r=10\pi$, quindi $r=5$ cm.`, R`$A=\pi\cdot5^2=25\pi\ \text{cm}^2$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Un triangolo rettangolo ha i cateti di $6$ e $8$. Quanto misura l'altezza relativa all'ipotenusa?`, suggerimenti: [R`Trova prima l'ipotenusa con Pitagora.`, R`L'area si calcola in due modi: $\frac{6\cdot8}{2}$ oppure $\frac{c\cdot h}{2}$.`], risposta: num(4.8), soluzione: [R`Ipotenusa: $c=\sqrt{36+64}=\sqrt{100}=10$.`, R`Area con i cateti: $\frac{6\cdot8}{2}=24$.`, R`Area con l'ipotenusa: $\frac{10\cdot h}{2}=24$, quindi $h=\frac{48}{10}=4{,}8$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Due angoli sono complementari. Il primo misura $42^\circ$. Quanto misura il secondo (in gradi)?`, suggerimenti: [R`Complementare vuol dire che la somma con l'altro angolo dà un valore preciso: quale?`, R`La somma di due angoli complementari è $90^\circ$.`], risposta: { tipo: 'numero', valore: 48 }, soluzione: [R`Angoli complementari: la somma vale $90^\circ$.`, R`Il secondo angolo misura $90^\circ - 42^\circ = 48^\circ$.`] },

    { id: 'es-02', difficolta: 1, testo: R`In un triangolo rettangolo i cateti misurano $6\ \text{cm}$ e $8\ \text{cm}$. Quanto misura l'ipotenusa (in cm)?`, suggerimenti: [R`Usa il teorema di Pitagora.`, R`L'ipotenusa al quadrato è la somma dei quadrati dei cateti: $36+64$.`], risposta: { tipo: 'numero', valore: 10 }, soluzione: [R`Teorema di Pitagora: $c^2=a^2+b^2=6^2+8^2=36+64=100$.`, R`$c=\sqrt{100}=10\ \text{cm}$.`] },

    { id: 'es-03', difficolta: 2, testo: R`Un triangolo ha lati $5\ \text{cm}$, $12\ \text{cm}$ e $13\ \text{cm}$. Verifica che è rettangolo e calcola la sua area (in $\text{cm}^2$).`, suggerimenti: [R`Controlla se il quadrato del lato maggiore è uguale alla somma dei quadrati degli altri due (teorema di Pitagora inverso).`, R`Trovato che è rettangolo, i cateti sono i due lati minori: l'area è metà del loro prodotto.`], risposta: { tipo: 'numero', valore: 30 }, soluzione: [R`$5^2+12^2=25+144=169=13^2$: per il teorema di Pitagora inverso, il triangolo è rettangolo, con cateti $5\ \text{cm}$ e $12\ \text{cm}$.`, R`Area $=\dfrac{5\cdot 12}{2}=\dfrac{60}{2}=30\ \text{cm}^2$.`] },

    { id: 'es-04', difficolta: 2, testo: R`In un triangolo rettangolo l'ipotenusa misura $25\ \text{cm}$ e la proiezione di un cateto sull'ipotenusa misura $9\ \text{cm}$. Quanto misura quel cateto (in cm)?`, suggerimenti: [R`Usa il primo teorema di Euclide: lega il cateto, l'ipotenusa e la sua proiezione.`, R`$b^2 = c \cdot m$: qui $c=25$ e $m=9$.`], risposta: { tipo: 'numero', valore: 15 }, soluzione: [R`Primo teorema di Euclide: $b^2 = c\cdot m = 25\cdot 9 = 225$.`, R`$b=\sqrt{225}=15\ \text{cm}$.`] },

    { id: 'es-05', difficolta: 2, testo: R`In un triangolo rettangolo le proiezioni dei due cateti sull'ipotenusa misurano $4\ \text{cm}$ e $9\ \text{cm}$. Quanto misura l'altezza relativa all'ipotenusa (in cm)?`, suggerimenti: [R`Usa il secondo teorema di Euclide.`, R`$h^2 = m\cdot n$, con $m=4$ e $n=9$.`], risposta: { tipo: 'numero', valore: 6 }, soluzione: [R`Secondo teorema di Euclide: $h^2=m\cdot n=4\cdot 9=36$.`, R`$h=\sqrt{36}=6\ \text{cm}$.`] },

    { id: 'es-06', difficolta: 1, testo: R`In un triangolo due angoli misurano $55^\circ$ e $65^\circ$. Quanto misura il terzo (in gradi)?`, suggerimenti: [R`La somma degli angoli interni di un triangolo è sempre la stessa, qualunque sia il triangolo.`, R`Sottrai dalla somma totale i due angoli noti.`], risposta: { tipo: 'numero', valore: 60 }, soluzione: [R`La somma degli angoli interni vale $180^\circ$.`, R`Il terzo angolo misura $180^\circ-55^\circ-65^\circ=60^\circ$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Un palo alto $3\ \text{m}$ proietta un'ombra di $2\ \text{m}$. Nello stesso istante un albero vicino proietta un'ombra di $10\ \text{m}$. Quanto è alto l'albero (in metri)?`, suggerimenti: [R`I raggi del sole sono paralleli: il rapporto fra altezza e ombra è lo stesso per il palo e per l'albero (teorema di Talete).`, R`Imposta la proporzione $\dfrac{3}{2} = \dfrac{h}{10}$.`], risposta: { tipo: 'numero', valore: 15 }, soluzione: [R`Per il teorema di Talete, altezza e ombra sono proporzionali: $\dfrac{3}{2}=\dfrac{h}{10}$.`, R`$h = 3\cdot\dfrac{10}{2}=15\ \text{m}$.`] },

    { id: 'es-08', difficolta: 1, testo: R`In un parallelogramma un angolo misura $65^\circ$. Quanto misura l'angolo consecutivo, cioè quello sullo stesso lato (in gradi)?`, suggerimenti: [R`Gli angoli consecutivi di un parallelogramma non sono congruenti: c'è un'altra relazione fra loro.`, R`Sono supplementari: la somma fa $180^\circ$.`], risposta: { tipo: 'numero', valore: 115 }, soluzione: [R`Angoli consecutivi in un parallelogramma: supplementari, somma $180^\circ$.`, R`L'angolo cercato misura $180^\circ-65^\circ=115^\circ$.`] },

    { id: 'es-09', difficolta: 1, testo: R`Un angolo alla circonferenza misura $40^\circ$. Quanto misura l'angolo al centro che insiste sullo stesso arco (in gradi)?`, suggerimenti: [R`C'è un rapporto preciso, sempre lo stesso, fra angolo al centro e angolo alla circonferenza sullo stesso arco.`, R`L'angolo al centro è il doppio.`], risposta: { tipo: 'numero', valore: 80 }, soluzione: [R`L'angolo al centro è il doppio dell'angolo alla circonferenza sullo stesso arco.`, R`$2\cdot 40^\circ=80^\circ$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Un triangolo ha due lati di $4\ \text{cm}$ e $9\ \text{cm}$. Fra quali due valori deve stare la misura del terzo lato (in cm)? Estremi esclusi.`, suggerimenti: [R`Usa la disuguaglianza triangolare: ogni lato è minore della somma degli altri due, e maggiore della loro differenza.`, R`Calcola $9+4$ e $9-4$: il terzo lato sta strettamente fra questi due valori.`], risposta: { tipo: 'intervallo', da: 5, a: 13, chiusoDa: false, chiusoA: false }, soluzione: [R`Il terzo lato $x$ deve essere minore della somma degli altri due: $x < 9+4=13$.`, R`...e maggiore della loro differenza: $x > 9-4=5$.`, R`Quindi $5\ \text{cm} < x < 13\ \text{cm}$.`] },

    { id: 'es-11', difficolta: 3, testo: R`Quanto misura l'angolo interno di un esagono regolare (in gradi)?`, suggerimenti: [R`Prima trova la somma degli angoli interni di un poligono di $6$ lati: $(n-2)\cdot 180^\circ$.`, R`Poi dividi quella somma per il numero di angoli, perché nel poligono regolare sono tutti uguali.`], risposta: { tipo: 'numero', valore: 120 }, soluzione: [R`Somma degli angoli interni: $(6-2)\cdot 180^\circ=4\cdot 180^\circ=720^\circ$.`, R`Nell'esagono regolare gli angoli sono tutti congruenti: ciascuno misura $720^\circ:6=120^\circ$.`] },

    { id: 'es-12', difficolta: 3, testo: R`Due triangoli sono simili con rapporto di similitudine $3$. Il triangolo più piccolo ha area $5\ \text{cm}^2$. Quanto vale l'area del triangolo più grande (in $\text{cm}^2$)?`, suggerimenti: [R`Il rapporto fra le aree di due poligoni simili non è uguale al rapporto di similitudine: è il suo quadrato.`, R`Moltiplica l'area piccola per $3^2$.`], risposta: { tipo: 'numero', valore: 45 }, soluzione: [R`Il rapporto fra le aree vale $k^2=3^2=9$.`, R`Area grande $=5\cdot 9=45\ \text{cm}^2$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cosa si intende per «ente primitivo» in geometria?`, opzioni: [R`Un termine che non si definisce, assunto come base della teoria`, R`Un termine definito a partire da altri più semplici`, R`Un teorema dimostrato molto spesso`, R`Un sinonimo di «postulato»`], corretta: 0, spiegazione: R`Punto, retta e piano non si definiscono con nozioni più semplici: sono le basi indefinite su cui si costruisce la teoria. Un postulato è un'affermazione, non un termine.` },
    { id: 'q-02', domanda: R`A differenza di un teorema, un postulato…`, opzioni: [R`si dimostra a partire dagli assiomi`, R`si assume vero senza dimostrazione`, R`vale solo per alcune figure particolari`, R`è sempre conseguenza di un teorema`], corretta: 1, spiegazione: R`Il postulato è un punto di partenza, assunto vero; il teorema va invece dimostrato usando postulati e teoremi precedenti.` },
    { id: 'q-03', domanda: R`Che cosa serve, soprattutto, per dimostrare un teorema di geometria?`, opzioni: [R`Un disegno molto preciso fatto con il righello`, R`La conferma di un insegnante`, R`Una catena di passaggi logici che parte da fatti già accettati`, R`Il controllo su molti casi numerici`], corretta: 2, spiegazione: R`Una dimostrazione è una deduzione logica valida per ogni figura del tipo considerato, non la verifica di un singolo disegno o di alcuni casi.` },
    { id: 'q-04', domanda: R`Due angoli complementari hanno somma…`, opzioni: [R`$360^\circ$`, R`$180^\circ$`, R`il doppio di uno dei due`, R`$90^\circ$`], corretta: 3, spiegazione: R`Complementari significa che la somma vale $90^\circ$; $180^\circ$ è invece la somma degli angoli supplementari.` },
    { id: 'q-05', domanda: R`Gli angoli opposti al vertice sono sempre…`, opzioni: [R`supplementari`, R`congruenti`, R`complementari`, R`uno il triplo dell'altro`], corretta: 1, spiegazione: R`Si formano quando due rette si incrociano, e sono sempre congruenti: non c'entrano supplementarità o complementarità in generale.` },
    { id: 'q-06', domanda: R`Un triangolo con almeno due lati congruenti si dice…`, opzioni: [R`scaleno`, R`rettangolo`, R`isoscele`, R`equilatero soltanto`], corretta: 2, spiegazione: R`Isoscele richiede almeno due lati congruenti (l'equilatero, con tre, ne è un caso particolare); scaleno e rettangolo si riferiscono ad altro.` },
    { id: 'q-07', domanda: R`Quale terna di elementi congruenti NON garantisce la congruenza di due triangoli?`, opzioni: [R`I tre lati (LLL)`, R`Due lati e l'angolo compreso (LAL)`, R`Due angoli e il lato compreso (ALA)`, R`I tre angoli (AAA)`], corretta: 3, spiegazione: R`AAA garantisce solo la stessa forma (similitudine): due triangoli possono avere gli stessi angoli ed essere di grandezza diversa.` },
    { id: 'q-08', domanda: R`In ogni triangolo, un lato rispetto alla somma degli altri due è sempre…`, opzioni: [R`minore`, R`congruente`, R`maggiore`, R`il doppio`], corretta: 0, spiegazione: R`È la disuguaglianza triangolare: se un lato fosse maggiore o uguale alla somma degli altri due, il triangolo non potrebbe chiudersi.` },
    { id: 'q-09', domanda: R`La somma degli angoli interni di un poligono convesso di $n$ lati vale…`, opzioni: [R`$n \cdot 90^\circ$`, R`$360^\circ$ sempre`, R`$(n-2)\cdot 180^\circ$`, R`$180^\circ$ sempre`], corretta: 2, spiegazione: R`La formula generale è $(n-2)\cdot 180^\circ$: per $n=3$ dà $180^\circ$, per $n=4$ dà $360^\circ$, coerente con i casi noti.` },
    { id: 'q-10', domanda: R`Il baricentro di un triangolo è il punto d'incontro…`, opzioni: [R`delle tre altezze`, R`dei tre assi dei lati`, R`delle tre bisettrici`, R`delle tre mediane`], corretta: 3, spiegazione: R`Le altezze si incontrano nell'ortocentro, gli assi nel circocentro, le bisettrici nell'incentro: solo le mediane danno il baricentro.` },
    { id: 'q-11', domanda: R`Il circocentro di un triangolo è il centro della circonferenza…`, opzioni: [R`inscritta`, R`circoscritta`, R`tangente ai tre lati`, R`che passa per i punti medi dei lati`], corretta: 1, spiegazione: R`Il circocentro è equidistante dai vertici: è il centro della circonferenza circoscritta. La circonferenza inscritta ha invece centro nell'incentro.` },
    { id: 'q-12', domanda: R`In un parallelogramma, due angoli consecutivi (sullo stesso lato) sono sempre…`, opzioni: [R`congruenti`, R`opposti al vertice`, R`supplementari`, R`complementari`], corretta: 2, spiegazione: R`Angoli consecutivi in un parallelogramma sono supplementari (sommano $180^\circ$); gli angoli opposti, invece, sono quelli congruenti.` },
    { id: 'q-13', domanda: R`Il teorema di Pitagora inverso serve a…`, opzioni: [R`trovare il perimetro di un rettangolo`, R`riconoscere se un triangolo, di cui si conoscono i lati, è rettangolo`, R`dimostrare che due triangoli sono simili`, R`calcolare l'area di un triangolo qualsiasi`], corretta: 1, spiegazione: R`Se il quadrato del lato maggiore è uguale alla somma dei quadrati degli altri due, il triangolo è rettangolo: è un modo per riconoscerlo senza misurare angoli.` },
    { id: 'q-14', domanda: R`Il primo teorema di Euclide afferma che ogni cateto è medio proporzionale fra…`, opzioni: [R`i due cateti`, R`le due proiezioni dei cateti sull'ipotenusa`, R`l'ipotenusa e l'altezza relativa a essa`, R`l'ipotenusa e la propria proiezione sull'ipotenusa`], corretta: 3, spiegazione: R`$b^2 = c \cdot m$: il cateto è medio proporzionale fra l'intera ipotenusa e la propria proiezione. Il secondo teorema riguarda invece l'altezza e le due proiezioni.` },
    { id: 'q-15', domanda: R`Il teorema di Talete riguarda…`, opzioni: [R`le diagonali di un parallelogramma`, R`un fascio di rette parallele tagliato da due trasversali`, R`gli angoli di un triangolo rettangolo`, R`il rapporto fra le aree di due cerchi`], corretta: 1, spiegazione: R`Talete: rette parallele tagliano su due trasversali qualsiasi segmenti proporzionali. È alla base della similitudine dei triangoli.` },
    { id: 'q-16', domanda: R`Se il rapporto di similitudine fra due poligoni è $k$, il rapporto fra le loro aree è…`, opzioni: [R`$\sqrt{k}$`, R`$2k$`, R`$k^2$`, R`$k$`], corretta: 2, spiegazione: R`Le aree si comportano come prodotti di due lunghezze, quindi il rapporto è $k^2$; il rapporto fra i perimetri, invece, resta $k$.` },
    { id: 'q-17', domanda: R`L'angolo al centro di una circonferenza, rispetto all'angolo alla circonferenza che insiste sullo stesso arco, è…`, opzioni: [R`la metà`, R`uguale`, R`il triplo`, R`il doppio`], corretta: 3, spiegazione: R`L'angolo al centro è sempre il doppio dell'angolo alla circonferenza sullo stesso arco: per questo ogni triangolo inscritto in una semicirconferenza è rettangolo.` },
    { id: 'q-18', domanda: R`Una retta tangente a una circonferenza in un punto $P$…`, opzioni: [R`interseca la circonferenza in due punti`, R`passa per il centro`, R`è perpendicolare al raggio in $P$`, R`è parallela al raggio in $P$`], corretta: 2, spiegazione: R`La tangente ha un solo punto in comune con la circonferenza (P) ed è perpendicolare al raggio condotto in quel punto.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`AAA (angoli congruenti) non è un criterio di congruenza: garantisce solo la stessa forma, non la stessa grandezza. Serve almeno un lato per parlare di congruenza.` },
    { tipo: 'errore', testo: R`Nella proiezione di un cateto sull'ipotenusa, non confondere quale segmento appartiene a quale cateto: la proiezione di un cateto è il pezzo di ipotenusa che ha un estremo in comune con lui.` },
    { tipo: 'trucco', testo: R`Per verificare al volo se un triangolo di lati interi è rettangolo, cerca prima le terne pitagoriche più comuni: $(3,4,5)$, $(5,12,13)$, $(8,15,17)$, $(7,24,25)$, e i loro multipli.` },
    { tipo: 'metodo', testo: R`Prima di applicare una formula di area, controlla sempre l'unità di misura: se i lati sono in centimetri, l'area viene in centimetri quadrati, non in centimetri.` },
    { tipo: 'errore', testo: R`Raddoppiare i lati di una figura non raddoppia l'area: la moltiplica per $4 = 2^2$. Il rapporto fra le aree è sempre il quadrato del rapporto di similitudine.` },
    { tipo: 'metodo', testo: R`Davanti a un problema di geometria, disegna sempre la figura (anche approssimativa) e scrivi su di essa i dati noti: aiuta a vedere subito quale teorema si applica.` },
    { tipo: 'trucco', testo: R`Se un triangolo è inscritto in una semicirconferenza con un lato sul diametro, è automaticamente rettangolo: è una scorciatoia che evita calcoli.` },
    { tipo: 'errore', testo: R`Mediana, altezza e bisettrice uscenti dallo stesso vertice non sono lo stesso segmento, salvo nel triangolo isoscele (dal vertice giusto) o equilatero: non scambiarle.` },
    { tipo: 'metodo', testo: R`Prima di usare $\pi \approx 3{,}14$, ricorda che è un'approssimazione: nei passaggi intermedi tienilo come $\pi$ e sostituisci il valore decimale solo alla fine.` }
  ],

  aneddoti: [
    { matematico: 'Talete di Mileto', anni: '625–546 a.C. circa', titolo: "La piramide misurata con un'ombra", testo: R`Talete è considerato il primo filosofo e matematico della tradizione greca, tanto che gli antichi lo inserivano fra i Sette Savi. Diogene Laerzio e Plutarco raccontano che in Egitto stupì i sacerdoti misurando l'altezza della grande piramide senza scalarla: piantò un bastone verticale e aspettò il momento del giorno in cui la sua ombra era lunga quanto il bastone stesso, perché in quell'istante anche l'ombra della piramide doveva essere lunga quanto la sua altezza. È un aneddoto tramandato con diverse varianti (talvolta si parla di un rapporto qualsiasi fra ombra e altezza, non necessariamente uno a uno), ma il principio geometrico è sempre lo stesso: il sole, così lontano, manda raggi che si possono considerare paralleli, e allora bastone e ombra, piramide e ombra, formano triangoli simili.`, legame: R`È la prima applicazione storica nota della similitudine dei triangoli e del teorema che porta il suo nome.` },

    { matematico: 'Pitagora di Samo', anni: '570–495 a.C. circa', titolo: 'La setta per cui tutto era numero', testo: R`Pitagora fondò a Crotone una comunità che era insieme scuola filosofica e confraternita religiosa, con regole di vita rigide (secondo la tradizione, persino il divieto di mangiare fave) e il motto «tutto è numero»: pensavano che ogni rapporto in natura si potesse esprimere con numeri interi o loro rapporti. Il teorema che porta il suo nome era in realtà già noto, applicato empiricamente, presso babilonesi ed egizi: il merito attribuito a Pitagora (o alla sua scuola, dato che lavoravano in gruppo e pubblicavano sotto un solo nome) è di averne dato una dimostrazione generale. Proprio dentro quella scuola, si racconta, la scoperta che la diagonale di un quadrato non si può scrivere come rapporto di due numeri interi fu vissuta come uno scandalo capace di minare l'intero programma pitagorico.`, legame: R`Il numero irrazionale scoperto è proprio $\sqrt{2}$, la diagonale del quadrato: la stessa quantità che si ottiene applicando il teorema di Pitagora al triangolo rettangolo isoscele di cateti $1$.` },

    { matematico: 'Euclide di Alessandria', anni: 'circa 325–265 a.C.', titolo: "«Non c'è via regia per la geometria»", testo: R`Si sa pochissimo della vita di Euclide: nemmeno il luogo di nascita è certo. Ciò che ha attraversato i secoli è il suo libro, gli *Elementi*: tredici libri che raccolgono e sistemano in ordine rigorosamente deduttivo tutta la geometria e parte dell'aritmetica greca, partendo da poche definizioni e cinque postulati. È rimasto il libro di testo di geometria più usato al mondo per oltre duemila anni, fino al Novecento. Una tradizione (riportata secoli dopo da Proclo, quindi da prendere come aneddoto e non come fatto certo) racconta che il re Tolomeo I, faticando con la materia, gli chiese se esistesse una scorciatoia più facile per imparare la geometria: Euclide rispose che "non c'è via regia per la geometria": nemmeno un re può evitare la fatica del ragionamento.`, legame: R`L'intero impianto di questo argomento (enti primitivi, postulati, dimostrazioni) è esattamente il metodo che Euclide ha fissato negli Elementi.` },

    { matematico: 'Archimede di Siracusa', anni: '287–212 a.C. circa', titolo: 'La sfera nel cilindro', testo: R`Archimede fu matematico, fisico e ingegnere: scoprì il principio della spinta idrostatica, costruì macchine da guerra per difendere Siracusa dall'assedio romano, e calcolò un'approssimazione di $\pi$ inscrivendo e circoscrivendo poligoni sempre più numerosi a una circonferenza. Fra tutti i suoi risultati, quello di cui andava più fiero era il rapporto fra il volume di una sfera e quello del cilindro che la contiene esattamente: stanno nel rapporto $2$ a $3$. Chiese che sulla sua tomba fosse scolpita una sfera inscritta in un cilindro, a memoria di quella scoperta, e più di un secolo dopo l'oratore romano Cicerone, questore in Sicilia, raccontò di averla ritrovata, nascosta fra i rovi, proprio grazie a quel disegno. Secondo la tradizione morì durante il sacco della città, ucciso da un soldato romano mentre era assorto nello studio di figure geometriche tracciate sulla sabbia.`, legame: R`Il rapporto fra i volumi di sfera e cilindro si ottiene con gli stessi strumenti di quest'argomento: aree di cerchi e proporzioni fra figure simili.` },

    { matematico: 'János Bolyai', anni: '1802–1860', titolo: 'La geometria che Gauss non pubblicò mai', testo: R`Per duemila anni i matematici avevano cercato di dimostrare il quinto postulato di Euclide (quello delle parallele) a partire dagli altri quattro, convinti che dovesse essere una conseguenza e non un'ipotesi indipendente. L'ufficiale ungherese János Bolyai, contro il parere di suo padre Farkas (che aveva passato la vita a inseguire la stessa dimostrazione, senza successo, e temeva per il figlio), esplorò invece che cosa succede se si *nega* quel postulato: ne uscì una geometria diversa ma perfettamente coerente, priva di contraddizioni. La pubblicò nel 1832 come appendice a un libro del padre. Quasi nello stesso periodo, in Russia, Nikolaj Lobačevskij arrivava per conto suo alle stesse conclusioni. Quando Farkas mandò il lavoro del figlio a Carl Friedrich Gauss, sperando in un giudizio entusiasta, Gauss rispose di non poterlo lodare pubblicamente: lui stesso, disse, ci era arrivato decenni prima, ma non l'aveva mai pubblicato per non attirarsi polemiche. La notizia, invece di consolare Bolyai, lo segnò profondamente.`, legame: R`Mostra che il quinto postulato, quello delle parallele, non è una conseguenza logica degli altri quattro: negandolo nascono le geometrie non euclidee.` }
  ]
});
})();
