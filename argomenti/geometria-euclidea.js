(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'geometria-euclidea',
  titolo: 'Geometria euclidea',

  introduzione: R`La geometria euclidea è lo studio delle figure del piano e dello spazio — punti, rette, angoli, poligoni, cerchi — con un metodo molto particolare: si parte da poche affermazioni assunte come vere (i **postulati**) e si arriva a tutte le altre (i **teoremi**) solo con la logica, senza mai fidarsi del disegno. Prende il nome da Euclide di Alessandria, che intorno al 300 a.C. raccolse questo sapere negli *Elementi*, il libro di testo più copiato e tradotto della storia dopo la Bibbia.

Non è un esercizio astratto: un architetto che calcola la spinta di un tetto, un geometra che misura un terreno senza attraversarlo, un telefono che si localizza incrociando le distanze da più antenne usano triangoli, angoli e proporzioni identici a quelli di questo capitolo. Anche il teorema di Pitagora, la cosa più citata di tutta la geometria, è un attrezzo che serve ogni volta che serve una distanza in linea retta a partire da due misure perpendicolari.

Per seguire bene basta saper maneggiare le proporzioni, le frazioni e le radici quadrate: qui non si risolvono equazioni, si dimostra e si calcola con le figure.`,

  sezioni: [
    { id: 'enti-primitivi-assiomi', titolo: 'Enti primitivi, assiomi e dimostrazioni', testo: R`Ogni teoria matematica deve partire da qualcosa che non si dimostra, altrimenti si finirebbe per dimostrare le cose l'una con l'altra all'infinito. In geometria queste basi sono di due tipi.

Gli **enti primitivi** sono nozioni che non si definiscono con altre più semplici: **punto**, **retta** e **piano**. Si possono solo descrivere (il punto non ha dimensioni, la retta è illimitata nelle due direzioni...), non definire davvero: ogni tentativo userebbe parole altrettanto primitive.

Gli **assiomi** (o **postulati**) sono affermazioni su questi enti che si assumono vere senza dimostrazione, perché sono il punto di partenza. Euclide ne fissò cinque per la geometria piana; il più discusso è il quinto, quello delle parallele: **per un punto esterno a una retta passa una e una sola retta parallela alla retta data**. Per secoli i matematici hanno cercato di dedurlo dagli altri quattro, senza riuscirci: solo nell'Ottocento si è capito che è davvero indipendente, e che negandolo si ottengono geometrie diverse ma altrettanto coerenti (l'aneddoto qui sotto racconta come).

>* **Dimostrare** un teorema vuol dire costruire una catena di passaggi logici che, partendo dagli assiomi e dai teoremi già dimostrati, arriva alla tesi senza salti. Non basta "vedere" che una cosa è vera in un disegno: il disegno aiuta a capire, ma la dimostrazione deve valere per *ogni* figura dello stesso tipo, non solo per quella disegnata.

Un teorema ha sempre un'**ipotesi** (quello che si suppone vero) e una **tesi** (quello che si vuole dimostrare): confonderle è un errore comune di chi comincia.

>! Verificare un fatto su un disegno con il righello non è una dimostrazione: un disegno impreciso può nascondere il fatto che due segmenti che sembrano uguali non lo sono. La geometria si fida della logica, non dell'occhio.` },

    { id: 'angoli-parallele', titolo: 'Angoli, e rette parallele tagliate da una trasversale', testo: R`Un **angolo** è la parte di piano compresa fra due semirette con la stessa origine (il **vertice**). Si misura in gradi: l'angolo **retto** misura $90^\circ$, l'angolo **piatto** $180^\circ$, l'angolo **giro** $360^\circ$. Un angolo minore di $90^\circ$ è **acuto**, uno maggiore (e minore di $180^\circ$) è **ottuso**.

Due angoli sono **complementari** se la loro somma è $90^\circ$, **supplementari** se la loro somma è $180^\circ$. Per esempio, un angolo di $35^\circ$ ha come complementare un angolo di $55^\circ$ e come supplementare un angolo di $145^\circ$.

Quando due rette si incontrano formano quattro angoli; quelli non adiacenti (che non condividono un lato) si dicono **opposti al vertice** e sono sempre congruenti.

>* Angoli opposti al vertice: **congruenti**, sempre. Angoli complementari: somma $90^\circ$. Angoli supplementari: somma $180^\circ$.

Quando due rette parallele $r$ ed $s$ sono tagliate da una terza retta, la **trasversale** $t$, si formano otto angoli con relazioni precise: gli **angoli corrispondenti** (stessa posizione rispetto a $r$ e $s$) sono congruenti; gli **angoli alterni interni** (da parti opposte della trasversale, fra le due parallele) sono congruenti; gli **angoli coniugati interni** sono supplementari. Vale anche il viceversa: se una coppia di angoli alterni interni è congruente, le due rette *sono* parallele — è così che si dimostra il parallelismo senza misurare mai una distanza.

[[grafico:trasversale]]

>! "Alterni" non vuol dire "opposti al vertice": gli alterni stanno su due rette diverse ($r$ e $s$), gli opposti al vertice sulla stessa coppia di rette che si incrocia in un punto solo.` },

    { id: 'triangoli-classificazione', titolo: 'Triangoli: classificazione, somma degli angoli e disuguaglianza triangolare', testo: R`Un **triangolo** ha tre lati e tre angoli. Si classifica in due modi indipendenti.

Per i **lati**: **scaleno** (tre lati diversi), **isoscele** (almeno due lati congruenti), **equilatero** (tre lati congruenti, caso particolare di isoscele). Per gli **angoli**: **acutangolo** (tre angoli acuti), **rettangolo** (un angolo retto: i due lati che lo formano si chiamano **cateti**, il terzo **ipotenusa**), **ottusangolo** (un angolo ottuso).

>* In un triangolo isoscele gli angoli alla base (opposti ai lati congruenti) sono congruenti; in un triangolo equilatero tutti e tre gli angoli valgono $60^\circ$.

La **somma degli angoli interni** di ogni triangolo vale sempre $180^\circ$: si dimostra tracciando dal vertice opposto alla base la parallela alla base stessa, e usando gli angoli alterni interni della sezione precedente per "srotolare" i tre angoli lungo una retta.

[[animazione:somma-angoli]]

[[grafico:triangolo]]

Per esempio, se due angoli di un triangolo misurano $50^\circ$ e $70^\circ$, il terzo vale $180^\circ - 50^\circ - 70^\circ = 60^\circ$.

La **disuguaglianza triangolare** dice che ogni lato è minore della somma degli altri due (ed è anche maggiore della loro differenza): con lati $4\ \text{cm}$ e $9\ \text{cm}$ il terzo lato deve stare fra $5\ \text{cm}$ e $13\ \text{cm}$, estremi esclusi. È il motivo per cui tre bastoncini qualsiasi non formano sempre un triangolo: se uno è troppo lungo rispetto agli altri due messi insieme, non si chiude.

>! Tre angoli che sommano a $180^\circ$ non bastano a determinare un triangolo unico: ne esistono infiniti, tutti simili fra loro (lo si vedrà con la similitudine). Per avere *un* triangolo preciso servono anche le misure dei lati.` },

    { id: 'congruenza-punti-notevoli', titolo: 'Congruenza dei triangoli e punti notevoli', testo: R`Due triangoli sono **congruenti** quando hanno la stessa forma e la stessa grandezza: sovrapposti con un movimento rigido, coincidono perfettamente. Per non dover controllare tutti e sei gli elementi (tre lati, tre angoli), bastano tre condizioni scelte bene: i **criteri di congruenza**.

>* **Primo criterio (LAL):** due lati e l'angolo fra essi congruenti. **Secondo criterio (ALA):** due angoli e il lato fra essi congruenti. **Terzo criterio (LLL):** i tre lati congruenti.

Un quarto criterio, valido solo per i triangoli rettangoli, confronta l'ipotenusa e un cateto. Nota che **tre angoli congruenti (AAA) non bastano**: garantiscono la stessa forma (la similitudine, più avanti) ma non la stessa grandezza — un triangolo piccolo e uno grande possono avere gli stessi angoli.

Ogni triangolo ha quattro **punti notevoli**, ciascuno intersezione di un tipo di segmento:

- il **baricentro** è il punto d'incontro delle tre **mediane** (dal vertice al punto medio del lato opposto); divide ciascuna mediana in due parti, di cui quella verso il vertice è il doppio dell'altra;
- l'**ortocentro** è il punto d'incontro delle tre **altezze** (le rette per un vertice perpendicolari al lato opposto);
- l'**incentro** è il punto d'incontro delle tre **bisettrici** degli angoli; è equidistante dai tre lati, quindi centro della circonferenza **inscritta**;
- il **circocentro** è il punto d'incontro degli **assi** dei tre lati (le rette perpendicolari ai lati nel loro punto medio); è equidistante dai tre vertici, quindi centro della circonferenza **circoscritta**.

>! Mediana, altezza e bisettrice uscenti dallo stesso vertice coincidono solo nel triangolo isoscele (rispetto al vertice fra i due lati congruenti) o equilatero: in generale sono tre segmenti diversi, e i quattro punti notevoli sono quattro punti distinti. Solo nel triangolo equilatero coincidono tutti in uno solo.` },

    { id: 'quadrilateri', titolo: 'I quadrilateri', testo: R`Un **quadrilatero** ha quattro lati e quattro angoli, la cui somma è sempre $360^\circ$ (due triangoli, tracciando una diagonale). La famiglia più importante è quella dei **parallelogrammi**: quadrilateri con i lati opposti paralleli a due a due.

>* In ogni parallelogramma: i lati opposti sono congruenti, gli angoli opposti sono congruenti, gli angoli consecutivi (sullo stesso lato) sono supplementari, e le diagonali si dimezzano a vicenda nel loro punto d'incontro.

Da qui nascono tre casi particolari, ciascuno con proprietà in più:

- il **rettangolo** è un parallelogramma con un angolo retto (e quindi tutti e quattro retti); le sue diagonali sono anche **congruenti**;
- il **rombo** è un parallelogramma con due lati consecutivi congruenti (e quindi tutti e quattro congruenti); le sue diagonali sono anche **perpendicolari** e bisettrici degli angoli;
- il **quadrato** è insieme rettangolo e rombo: ha tutte le proprietà di entrambi.

Il **trapezio** è invece un quadrilatero con una sola coppia di lati paralleli, detti **base maggiore** e **base minore**; gli altri due lati si dicono obliqui. Se gli obliqui sono congruenti il trapezio è **isoscele**, e allora gli angoli alla base sono congruenti a coppie; se un obliquo è perpendicolare alle basi il trapezio è **rettangolo**.

Per esempio, in un parallelogramma un angolo misura $65^\circ$: l'angolo consecutivo (sullo stesso lato) è supplementare, quindi misura $180^\circ - 65^\circ = 115^\circ$; l'angolo opposto ai $65^\circ$ misura invece $65^\circ$, perché angoli opposti sono congruenti.

>! Non tutti i quadrilateri con le diagonali che si incontrano a metà sono rettangoli, e non tutti i rombi sono quadrati: il rettangolo aggiunge gli angoli retti, il rombo aggiunge i lati congruenti, e servono entrambe le condizioni per avere un quadrato.` },

    { id: 'pitagora-euclide', titolo: 'Il teorema di Pitagora e i teoremi di Euclide', testo: R`Nel triangolo rettangolo, il lato più lungo è l'**ipotenusa** (opposta all'angolo retto), gli altri due sono i **cateti**. Il **teorema di Pitagora** lega le loro misure:

>* $$c^2 = a^2 + b^2$$ dove $c$ è l'ipotenusa e $a$, $b$ i cateti: **il quadrato costruito sull'ipotenusa ha area uguale alla somma delle aree dei quadrati costruiti sui due cateti.**

[[animazione:pitagora]]

[[grafico:pitagora]]

Il caso più citato è il triangolo $3$-$4$-$5$: $3^2 + 4^2 = 9 + 16 = 25 = 5^2$. Con i cateti $6\ \text{cm}$ e $8\ \text{cm}$ l'ipotenusa misura $\sqrt{36+64} = \sqrt{100} = 10\ \text{cm}$.

Vale anche l'**inverso**: se in un triangolo il quadrato del lato più lungo è uguale alla somma dei quadrati degli altri due, quel triangolo è rettangolo (con l'angolo retto opposto al lato più lungo). Serve a *riconoscere* un triangolo rettangolo conoscendo solo i lati: $5$, $12$, $13$ è rettangolo perché $5^2+12^2=25+144=169=13^2$.

I **teoremi di Euclide** collegano cateti, ipotenusa, altezza e le loro **proiezioni** sull'ipotenusa (i due segmenti in cui l'altezza relativa all'ipotenusa la divide, $m$ e $n$).

[[animazione:euclide-primo]]

>* **Primo teorema:** ogni cateto è medio proporzionale fra l'ipotenusa e la propria proiezione: $$b^2 = c \cdot m$$ **Secondo teorema:** l'altezza relativa all'ipotenusa è medio proporzionale fra le due proiezioni: $$h^2 = m \cdot n$$

Per esempio, se l'ipotenusa misura $25\ \text{cm}$ e la proiezione di un cateto è $9\ \text{cm}$, quel cateto misura $\sqrt{25 \cdot 9} = \sqrt{225} = 15\ \text{cm}$.

>! Nel primo teorema di Euclide, il cateto e la sua proiezione devono corrispondersi: la proiezione di un cateto è il segmento dell'ipotenusa più vicino a quel cateto, non quello vicino all'altro.` },

    { id: 'talete-similitudine', titolo: 'Il teorema di Talete e la similitudine', testo: R`Il **teorema di Talete** riguarda un fascio di rette parallele tagliato da due trasversali: i segmenti che le parallele staccano su una trasversale sono proporzionali ai segmenti corrispondenti sull'altra. È lo strumento che sta dietro alla famosa misura dell'altezza della piramide fatta da Talete confrontando le ombre (l'aneddoto qui sotto lo racconta).

[[animazione:talete]]

Per esempio: un palo alto $3\ \text{m}$ proietta un'ombra di $2\ \text{m}$; nello stesso istante un albero proietta un'ombra di $10\ \text{m}$. Il rapporto altezza/ombra è lo stesso per entrambi (i raggi del sole sono paralleli), quindi l'altezza dell'albero è $3 \cdot \dfrac{10}{2} = 15\ \text{m}$.

Due figure sono **simili** quando hanno la stessa forma ma non necessariamente la stessa grandezza: angoli corrispondenti congruenti e lati corrispondenti in proporzione, secondo un unico numero, il **rapporto di similitudine** $k$.

[[grafico:simili]]

>* Criteri di similitudine dei triangoli: **primo** (due angoli congruenti, e quindi tutti e tre, perché il terzo è determinato dagli altri due); **secondo** (due lati in proporzione e l'angolo fra essi congruente); **terzo** (tre lati in proporzione).

Se il rapporto di similitudine è $k$, il **rapporto fra i perimetri** di due poligoni simili vale ancora $k$ (i perimetri sono somme di lati, tutti moltiplicati per $k$), mentre il **rapporto fra le aree** vale $k^2$ (le aree si comportano come prodotti di due lunghezze). Con $k=3$, un triangolo di area $5\ \text{cm}^2$ corrisponde a uno simile di area $5 \cdot 3^2 = 45\ \text{cm}^2$.

>! Raddoppiare tutti i lati di una figura non raddoppia l'area: la quadruplica ($k^2 = 4$). È un errore comune, e costa caro nei problemi reali (una pizza di diametro doppio non ha superficie doppia, ma quadrupla).` },

    { id: 'circonferenza', titolo: 'La circonferenza e il cerchio', testo: R`La **circonferenza** è l'insieme dei punti del piano che hanno la stessa distanza (il **raggio**) da un punto fisso (il **centro**); il **cerchio** è la parte di piano che essa racchiude. Una **corda** è un segmento che unisce due punti della circonferenza; il **diametro** è la corda che passa per il centro, lunga il doppio del raggio.

Un angolo si dice **al centro** se ha il vertice nel centro della circonferenza, **alla circonferenza** se ha il vertice su di essa; entrambi possono "insistere" sullo stesso arco, cioè avere i lati che passano per gli stessi due punti dell'arco.

>* L'angolo al centro è il **doppio** dell'angolo alla circonferenza che insiste sullo stesso arco. Di conseguenza, tutti gli angoli alla circonferenza che insistono sullo stesso arco sono congruenti fra loro.

[[grafico:angoliCerchio]]

Per esempio, se un angolo alla circonferenza misura $40^\circ$, l'angolo al centro sullo stesso arco misura $80^\circ$; se l'angolo alla circonferenza insiste su una semicirconferenza (i suoi lati passano per le due estremità di un diametro), l'angolo al centro è piatto ($180^\circ$) e quello alla circonferenza è retto: ogni triangolo inscritto in una semicirconferenza, con un lato sul diametro, è rettangolo.

Una retta può stare rispetto a una circonferenza in tre modi: **esterna** (nessun punto in comune), **secante** (due punti in comune) o **tangente** (un solo punto in comune, il **punto di tangenza**). La proprietà chiave della tangente:

>* La retta tangente in un punto è **perpendicolare** al raggio condotto in quel punto.

>! Non basta che una retta "sfiori" il disegno per essere tangente: la tangenza è una condizione precisa (un solo punto in comune, raggio perpendicolare) che va verificata, non stimata a occhio.` },

    { id: 'aree-poligoni', titolo: 'Aree, lunghezza della circonferenza e poligoni regolari', testo: R`L'**area** del triangolo è $\dfrac{b \cdot h}{2}$, con $b$ un lato qualsiasi (base) e $h$ l'altezza relativa. Da parallelogrammi e trapezi si ricavano formule analoghe: area del parallelogramma $b \cdot h$, area del trapezio $\dfrac{(B+b)\cdot h}{2}$ (semisomma delle basi per l'altezza), area del rombo $\dfrac{d \cdot d'}{2}$ (semiprodotto delle diagonali).

Prova a trascinare il vertice C nel grafico: la base resta fissa, ma l'area cambia con l'altezza.

[[grafico:areaTriangolo]]

La **lunghezza della circonferenza** e l'**area del cerchio** dipendono dal raggio $r$ tramite lo stesso numero, $\pi$ (circa $3,14$, un numero irrazionale: il suo valore esatto ha infinite cifre decimali non periodiche):

>* $$C = 2\pi r \qquad\qquad A = \pi r^2$$

[[animazione:area-cerchio]]

Per esempio, una circonferenza di raggio $5\ \text{cm}$ è lunga $2\pi\cdot 5 \approx 31,4\ \text{cm}$ e racchiude un cerchio di area $\pi\cdot 25 \approx 78,5\ \text{cm}^2$.

Un cenno ai **poligoni regolari** (tutti i lati e tutti gli angoli congruenti): la somma dei loro angoli interni segue la stessa regola di ogni poligono convesso, $(n-2)\cdot 180^\circ$, e dividendola per $n$ si trova l'angolo interno di quel poligono regolare. In un esagono regolare ($n=6$) la somma è $(6-2)\cdot 180^\circ = 720^\circ$, e ogni angolo interno misura $720^\circ : 6 = 120^\circ$. Ogni poligono regolare ha un centro equidistante da tutti i vertici (e da tutti i lati): da lì si "vede" il poligono in modo simmetrico, come il baricentro nel triangolo equilatero.

>! $\pi$ non è $3,14$: è un'approssimazione. Usare $3,14$ va benissimo per i calcoli scolastici, ma scrivere $\pi = 3,14$ come se fosse un'uguaglianza esatta è un errore concettuale.` }
  ],

  grafici: {
    triangolo: {
      tipo: 'piano', x: [-1, 8], y: [-1, 6], assi: false, griglia: false,
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [7, 0], [2, 5]], etichette: ['A', 'B', 'C'], riempi: false, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: [7, 0], etichetta: 'c', colore: 2 },
        { tipo: 'segmento', da: [7, 0], a: [2, 5], etichetta: 'a', colore: 3 },
        { tipo: 'segmento', da: [2, 5], a: [0, 0], etichetta: 'b', colore: 4 },
        { tipo: 'angolo', vertice: [0, 0], da: [7, 0], a: [2, 5], etichetta: 'α', raggio: 1.1, colore: 1 }
      ],
      didascalia: "Il triangolo ABC: i lati a, b, c sono opposti ai vertici A, B, C; α è l'angolo in A."
    },
    trasversale: {
      tipo: 'piano', x: [-2, 6], y: [-1, 7], assi: false, griglia: false,
      elementi: [
        { tipo: 'orizzontale', y: 2, etichetta: 'r', colore: 1 },
        { tipo: 'orizzontale', y: 5, etichetta: 's', colore: 1 },
        { tipo: 'retta', per: [[-1, -2], [4, 8]], etichetta: 't', colore: 4 },
        { tipo: 'punto', p: [1, 2], etichetta: 'P', posizione: 'basso-sinistra' },
        { tipo: 'punto', p: [2.5, 5], etichetta: 'Q', posizione: 'alto-sinistra' },
        { tipo: 'angolo', vertice: [1, 2], da: [4, 2], a: [2.5, 5], etichetta: 'α', raggio: 0.8, colore: 2 },
        { tipo: 'angolo', vertice: [2.5, 5], da: [-1, 5], a: [1, 2], etichetta: 'α', raggio: 0.8, colore: 2 }
      ],
      didascalia: "Le rette r ed s sono parallele, tagliate dalla trasversale t: i due angoli alterni interni, entrambi α, sono congruenti."
    },
    pitagora: {
      tipo: 'piano', x: [-4, 9], y: [-5, 9], assi: false, griglia: false,
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [4, 0], [0, 3]], etichette: ['A', 'B', 'C'], riempi: false, colore: 1 },
        { tipo: 'poligono', punti: [[0, 0], [4, 0], [4, -4], [0, -4]], riempi: true, colore: 2 },
        { tipo: 'poligono', punti: [[0, 0], [0, 3], [-3, 3], [-3, 0]], riempi: true, colore: 3 },
        { tipo: 'poligono', punti: [[4, 0], [0, 3], [3, 7], [7, 4]], riempi: true, colore: 4 },
        { tipo: 'segmento', da: [0, 0], a: [4, 0], etichetta: '4', colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: [0, 3], etichetta: '3', colore: 1 },
        { tipo: 'segmento', da: [4, 0], a: [0, 3], etichetta: '5', colore: 1 },
        { tipo: 'angolo', vertice: [0, 0], da: [4, 0], a: [0, 3], etichetta: '90°', raggio: 0.6, colore: 1 },
        { tipo: 'testo', p: [2, -2], testo: '16' },
        { tipo: 'testo', p: [-1.5, 1.5], testo: '9' },
        { tipo: 'testo', p: [3.5, 3.5], testo: '25' }
      ],
      didascalia: "Il triangolo rettangolo 3-4-5: l'area del quadrato sull'ipotenusa (25) è uguale alla somma delle aree dei quadrati sui cateti (16 + 9)."
    },
    simili: {
      tipo: 'piano', x: [-1, 12], y: [-1, 5], assi: false, griglia: false,
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [3, 0], [0, 2]], etichette: ['A', 'B', 'C'], riempi: false, colore: 1 },
        { tipo: 'poligono', punti: [[5, 0], [11, 0], [5, 4]], etichette: ['A′', 'B′', 'C′'], riempi: false, colore: 2 },
        { tipo: 'angolo', vertice: [0, 0], da: [3, 0], a: [0, 2], etichetta: 'α', raggio: 0.5, colore: 1 },
        { tipo: 'angolo', vertice: [5, 0], da: [11, 0], a: [5, 4], etichetta: 'α', raggio: 0.5, colore: 2 },
        { tipo: 'testo', p: [-0.8, 4.5], testo: "AB/A′B′ = BC/B′C′ = CA/C′A′ = 1/2", ancora: 'start' }
      ],
      didascalia: "I triangoli ABC e A′B′C′ sono simili: hanno gli angoli ordinatamente congruenti e i lati in proporzione, con rapporto 2."
    },
    angoliCerchio: {
      tipo: 'piano', x: [-6, 6], y: [-6, 6], assi: false, griglia: false,
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 4, etichetta: 'γ', colore: 1 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-destra' },
        { tipo: 'punto', p: [-3.46, 2], etichetta: 'A', posizione: 'alto-sinistra' },
        { tipo: 'punto', p: [3.46, 2], etichetta: 'B', posizione: 'alto-destra' },
        { tipo: 'punto', p: [0, -4], etichetta: 'C', posizione: 'basso' },
        { tipo: 'segmento', da: [0, 0], a: [-3.46, 2], colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: [3.46, 2], colore: 1 },
        { tipo: 'segmento', da: [0, -4], a: [-3.46, 2], colore: 3 },
        { tipo: 'segmento', da: [0, -4], a: [3.46, 2], colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [3.46, 2], a: [-3.46, 2], etichetta: 'β', raggio: 1.3, colore: 2 },
        { tipo: 'angolo', vertice: [0, -4], da: [-3.46, 2], a: [3.46, 2], etichetta: 'α', raggio: 1.3, colore: 3 }
      ],
      didascalia: "L'angolo al centro β e l'angolo alla circonferenza α insistono sullo stesso arco AB: β è il doppio di α."
    },
    areaTriangolo: {
      tipo: 'piano', x: [-2, 8], y: [-6, 7],
      parametri: [
        { nome: 'cx', min: -1, max: 7, passo: 0.5, valore: 3, nascosto: true },
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
      didascalia: "Trascina il vertice C: la base AB resta 6, l'altezza è |cy|, e l'area vale base per altezza diviso due, cioè 3 · |cy|."
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
      R`Il rapporto di similitudine si trova dal lato corrispondente noto: $k = \dfrac{A'B'}{AB} = \dfrac{6}{4} = 1,5$.`,
      R`Tutti i lati del secondo triangolo sono quelli del primo moltiplicati per $k$: $B'C' = 6 \cdot 1,5 = 9\ \text{cm}$.`,
      R`$C'A' = 8 \cdot 1,5 = 12\ \text{cm}$.`
    ], risultato: R`$B'C' = 9\ \text{cm}$ e $C'A' = 12\ \text{cm}$.` },

    { titolo: 'I teoremi di Euclide, insieme', problema: R`In un triangolo rettangolo i cateti misurano $12\ \text{cm}$ e $16\ \text{cm}$. Trova le proiezioni dei cateti sull'ipotenusa e l'altezza relativa a essa.`, passi: [
      R`Prima serve l'ipotenusa, con il teorema di Pitagora: $c = \sqrt{12^2+16^2} = \sqrt{144+256} = \sqrt{400} = 20\ \text{cm}$.`,
      R`Dal primo teorema di Euclide, $b^2 = c\cdot m$, si ricava la proiezione: $m = \dfrac{b^2}{c}$. Per il cateto di $12\ \text{cm}$: $m = \dfrac{144}{20} = 7,2\ \text{cm}$.`,
      R`Per il cateto di $16\ \text{cm}$: $n = \dfrac{256}{20} = 12,8\ \text{cm}$. Controllo: $m+n = 7,2+12,8=20\ \text{cm}$, l'intera ipotenusa. ✓`,
      R`Dal secondo teorema di Euclide, $h^2 = m\cdot n = 7,2 \cdot 12,8 = 92,16$, quindi $h = \sqrt{92,16} = 9,6\ \text{cm}$.`
    ], risultato: R`Proiezioni $7,2\ \text{cm}$ e $12,8\ \text{cm}$; altezza relativa all'ipotenusa $9,6\ \text{cm}$.` }
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
    { tipo: 'errore', testo: R`Nella proiezione di un cateto sull'ipotenusa, non confondere quale segmento appartiene a quale cateto: la proiezione è il pezzo di ipotenusa più vicino a quel cateto.` },
    { tipo: 'trucco', testo: R`Per verificare al volo se un triangolo di lati interi è rettangolo, cerca prima le terne pitagoriche più comuni: $(3,4,5)$, $(5,12,13)$, $(8,15,17)$, $(7,24,25)$, e i loro multipli.` },
    { tipo: 'metodo', testo: R`Prima di applicare una formula di area, controlla sempre l'unità di misura: se i lati sono in centimetri, l'area viene in centimetri quadrati, non in centimetri.` },
    { tipo: 'errore', testo: R`Raddoppiare i lati di una figura non raddoppia l'area: la moltiplica per $4 = 2^2$. Il rapporto fra le aree è sempre il quadrato del rapporto di similitudine.` },
    { tipo: 'metodo', testo: R`Davanti a un problema di geometria, disegna sempre la figura (anche approssimativa) e scrivi su di essa i dati noti: aiuta a vedere subito quale teorema si applica.` },
    { tipo: 'trucco', testo: R`Se un triangolo è inscritto in una semicirconferenza con un lato sul diametro, è automaticamente rettangolo: è una scorciatoia che evita calcoli.` },
    { tipo: 'errore', testo: R`Mediana, altezza e bisettrice uscenti dallo stesso vertice non sono lo stesso segmento, salvo nel triangolo isoscele (dal vertice giusto) o equilatero: non scambiarle.` },
    { tipo: 'metodo', testo: R`Prima di usare $\pi \approx 3,14$, ricorda che è un'approssimazione: nei passaggi intermedi tienilo come $\pi$ e sostituisci il valore decimale solo alla fine.` }
  ],

  aneddoti: [
    { matematico: 'Talete di Mileto', anni: '625–546 a.C. circa', titolo: "La piramide misurata con un'ombra", testo: R`Talete è considerato il primo filosofo e matematico della tradizione greca, tanto che gli antichi lo inserivano fra i Sette Savi. Diogene Laerzio e Plutarco raccontano che in Egitto stupì i sacerdoti misurando l'altezza della grande piramide senza scalarla: piantò un bastone verticale e aspettò il momento del giorno in cui la sua ombra era lunga quanto il bastone stesso, perché in quell'istante anche l'ombra della piramide doveva essere lunga quanto la sua altezza. È un aneddoto tramandato con diverse varianti (talvolta si parla di un rapporto qualsiasi fra ombra e altezza, non necessariamente uno a uno), ma il principio geometrico è sempre lo stesso: il sole, così lontano, manda raggi che si possono considerare paralleli, e allora bastone e ombra, piramide e ombra, formano triangoli simili.`, legame: R`È la prima applicazione storica nota della similitudine dei triangoli e del teorema che porta il suo nome.` },

    { matematico: 'Pitagora di Samo', anni: '570–495 a.C. circa', titolo: 'La setta per cui tutto era numero', testo: R`Pitagora fondò a Crotone una comunità che era insieme scuola filosofica e confraternita religiosa, con regole di vita rigide (secondo la tradizione, persino il divieto di mangiare fave) e il motto «tutto è numero»: pensavano che ogni rapporto in natura si potesse esprimere con numeri interi o loro rapporti. Il teorema che porta il suo nome era in realtà già noto, applicato empiricamente, presso babilonesi ed egizi: il merito attribuito a Pitagora (o alla sua scuola, dato che lavoravano in gruppo e pubblicavano sotto un solo nome) è di averne dato una dimostrazione generale. Proprio dentro quella scuola, si racconta, la scoperta che la diagonale di un quadrato non si può scrivere come rapporto di due numeri interi fu vissuta come uno scandalo capace di minare l'intero programma pitagorico.`, legame: R`Il numero irrazionale scoperto è proprio $\sqrt{2}$, la diagonale del quadrato: la stessa quantità che si ottiene applicando il teorema di Pitagora al triangolo rettangolo isoscele di cateti $1$.` },

    { matematico: 'Euclide di Alessandria', anni: 'circa 325–265 a.C.', titolo: "«Non c'è via regia per la geometria»", testo: R`Si sa pochissimo della vita di Euclide: nemmeno il luogo di nascita è certo. Ciò che ha attraversato i secoli è il suo libro, gli *Elementi*: tredici libri che raccolgono e sistemano in ordine rigorosamente deduttivo tutta la geometria e parte dell'aritmetica greca, partendo da poche definizioni e cinque postulati. È rimasto il libro di testo di geometria più usato al mondo per oltre duemila anni, fino al Novecento. Una tradizione (riportata secoli dopo da Proclo, quindi da prendere come aneddoto e non come fatto certo) racconta che il re Tolomeo I, faticando con la materia, gli chiese se esistesse una scorciatoia più facile per imparare la geometria: Euclide rispose che "non c'è via regia per la geometria" — nemmeno un re può evitare la fatica del ragionamento.`, legame: R`L'intero impianto di questo argomento — enti primitivi, postulati, dimostrazioni — è esattamente il metodo che Euclide ha fissato negli Elementi.` },

    { matematico: 'Archimede di Siracusa', anni: '287–212 a.C. circa', titolo: 'La sfera nel cilindro', testo: R`Archimede fu matematico, fisico e ingegnere: scoprì il principio della spinta idrostatica, costruì macchine da guerra per difendere Siracusa dall'assedio romano, e calcolò un'approssimazione di $\pi$ inscrivendo e circoscrivendo poligoni sempre più numerosi a una circonferenza. Fra tutti i suoi risultati, quello di cui andava più fiero era il rapporto fra il volume di una sfera e quello del cilindro che la contiene esattamente: stanno nel rapporto $2$ a $3$. Chiese che sulla sua tomba fosse scolpita una sfera inscritta in un cilindro, a memoria di quella scoperta, e più di un secolo dopo l'oratore romano Cicerone, questore in Sicilia, raccontò di averla ritrovata, nascosta fra i rovi, proprio grazie a quel disegno. Secondo la tradizione morì durante il sacco della città, ucciso da un soldato romano mentre era assorto nello studio di figure geometriche tracciate sulla sabbia.`, legame: R`Il rapporto fra i volumi di sfera e cilindro si ottiene con gli stessi strumenti di quest'argomento: aree di cerchi e proporzioni fra figure simili.` },

    { matematico: 'János Bolyai', anni: '1802–1860', titolo: 'La geometria che Gauss non pubblicò mai', testo: R`Per duemila anni i matematici avevano cercato di dimostrare il quinto postulato di Euclide (quello delle parallele) a partire dagli altri quattro, convinti che dovesse essere una conseguenza e non un'ipotesi indipendente. L'ufficiale ungherese János Bolyai, contro il parere di suo padre Farkas (che aveva passato la vita a inseguire la stessa dimostrazione, senza successo, e temeva per il figlio), esplorò invece che cosa succede se si *nega* quel postulato: ne uscì una geometria diversa ma perfettamente coerente, priva di contraddizioni. La pubblicò nel 1832 come appendice a un libro del padre. Quasi nello stesso periodo, in Russia, Nikolaj Lobačevskij arrivava per conto suo alle stesse conclusioni. Quando Farkas mandò il lavoro del figlio a Carl Friedrich Gauss, sperando in un giudizio entusiasta, Gauss rispose di non poterlo lodare pubblicamente: lui stesso, disse, ci era arrivato decenni prima, ma non l'aveva mai pubblicato per non attirarsi polemiche. La notizia, invece di consolare Bolyai, lo segnò profondamente.`, legame: R`Mostra che il quinto postulato — le parallele di questo argomento — non è una conseguenza logica degli altri quattro: negandolo nascono le geometrie non euclidee.` }
  ]
});
})();
