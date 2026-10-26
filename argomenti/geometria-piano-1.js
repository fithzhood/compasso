(function () {
const R = String.raw;
/* Geometria del piano 1 (primo anno): nata il 26/10/2026 dalla divisione di geometria-euclidea.
   Il materiale del primo anno è stato spostato da lì; il secondo anno sta in geometria-piano-2. */
/* ampiezza in gradi dell'angolo in V fra le semirette VU e VW (punti come coppie di espressioni) */
const ANG = (V, U, W) => {
  const ux = '((' + U[0] + ')-(' + V[0] + '))', uy = '((' + U[1] + ')-(' + V[1] + '))';
  const wx = '((' + W[0] + ')-(' + V[0] + '))', wy = '((' + W[1] + ')-(' + V[1] + '))';
  return 'acos((' + ux + '*' + wx + '+' + uy + '*' + wy + ')/(sqrt(' + ux + '^2+' + uy + '^2)*sqrt(' + wx + '^2+' + wy + '^2)))*180/pi';
};
/* allenamento: una sola risposta numerica, ma con il tipo 'numeri', che pesca il numero dentro
   la scritta. Così passano anche «70°», «70 gradi» e «20 cm». */
const gradi = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'in gradi, es. 40', simboli: ['°'] });
const num = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'solo il numero, es. 12', simboli: ['/'] });
/* il nome di un criterio di congruenza */
const CRIT = {
  LAL: ['LAL', 'L.A.L.', 'L-A-L', 'L A L', 'primo', 'primo criterio', 'il primo', 'il primo criterio', 'criterio LAL', 'il criterio LAL', 'primo criterio LAL', 'lato angolo lato', 'lato-angolo-lato', '1° criterio', '1'],
  ALA: ['ALA', 'A.L.A.', 'A-L-A', 'A L A', 'secondo', 'secondo criterio', 'il secondo', 'il secondo criterio', 'criterio ALA', 'il criterio ALA', 'secondo criterio ALA', 'angolo lato angolo', 'angolo-lato-angolo', '2° criterio', '2'],
  LLL: ['LLL', 'L.L.L.', 'L-L-L', 'L L L', 'terzo', 'terzo criterio', 'il terzo', 'il terzo criterio', 'criterio LLL', 'il criterio LLL', 'terzo criterio LLL', 'lato lato lato', 'lato-lato-lato', '3° criterio', '3']
};
const crit = n => ({ tipo: 'testo', accettate: CRIT[n], segnaposto: 'il criterio, es. LLL', simboli: [] });
COMPASSO.registra({
  id: 'geometria-piano-1',
  titolo: 'Geometria del piano 1',

  introduzione: R`Come fai a sapere che gli angoli di un triangolo sommano sempre $180^\circ$? Puoi misurarne dieci con il goniometro, ma l'undicesimo potrebbe fare eccezione.

La geometria euclidea parte da poche affermazioni accettate senza prova, i **postulati**. Da queste ricava tutte le altre, i **teoremi**, con il ragionamento.

Qui impari a dimostrare. Vedrai quando due triangoli sono congruenti e perché il triangolo isoscele ha gli angoli alla base uguali. Scoprirai quando un quadrilatero è un parallelogramma. Sono ragionamenti che si usano anche in cantiere. Chi traccia una stanza controlla che i lati opposti siano uguali. Poi misura le due diagonali: se sono uguali, gli angoli sono retti.

Non serve sapere niente di particolare. Bastano righello, compasso e la voglia di chiederti «perché?».`,

  inBreve: [
    R`Un teorema si dimostra con una catena di passaggi. Un disegno, anche preciso, non è una dimostrazione.`,
    R`Due triangoli sono congruenti con i criteri LAL, ALA o LLL. Con tre angoli uguali sono solo simili.`,
    R`Nel triangolo isoscele gli angoli alla base sono congruenti, e la bisettrice dell'angolo al vertice è anche mediana e altezza.`,
    R`Due parallele tagliate da una trasversale formano angoli alterni interni congruenti. Da qui viene che gli angoli di un triangolo sommano $180^\circ$.`,
    R`L'angolo esterno di un triangolo è la somma dei due interni non adiacenti. Al lato maggiore sta opposto l'angolo maggiore.`,
    R`Un quadrilatero con le diagonali che si tagliano a metà è un parallelogramma. Unisci i punti medi di due lati di un triangolo: il segmento è parallelo al terzo lato e lungo la metà.`
  ],

  sezioni: [
    { id: 'enti-primitivi-assiomi', titolo: 'Enti primitivi, segmenti e angoli', testo: R`Prova a definire «retta». Dici «una linea dritta», ma poi devi definire «linea» e «dritta». Per non girare in tondo, la geometria sceglie da dove partire.

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

>! Misurare con il righello non è una dimostrazione. Il disegno può sbagliare di un millimetro, e mostra un solo caso.

### Segmenti e figure congruenti

Un punto divide una retta in due **semirette**. Due punti $A$ e $B$ delimitano il **segmento** $AB$. Il **punto medio** $M$ lo divide in due parti uguali: $AM=MB$.

Due figure sono **congruenti** se un movimento rigido le porta a coincidere, senza deformarle. Sui libri trovi il simbolo $\cong$. Per i segmenti e gli angoli scriviamo anche solo $=$.

### Gli angoli

Un **angolo** è la parte di piano fra due semirette che partono dallo stesso punto, il vertice. La **bisettrice** è la semiretta che lo divide in due angoli congruenti.

| nome | misura |
|---|---|
| acuto | meno di $90^\circ$ |
| retto | $90^\circ$ |
| ottuso | fra $90^\circ$ e $180^\circ$ |
| piatto | $180^\circ$ (le due semirette formano una retta) |
| giro | $360^\circ$ |

Due angoli sono **complementari** se insieme fanno $90^\circ$, **supplementari** se fanno $180^\circ$. Per esempio, $35^\circ$ ha complementare $55^\circ$ e supplementare $145^\circ$.

### Il primo teorema: angoli opposti al vertice

Due rette che si incrociano formano quattro angoli. Due angoli uno di fronte all'altro sono **opposti al vertice**, e sono congruenti. Chiama $\alpha$ e $\gamma$ due angoli opposti, e $\beta$ quello in mezzo:

~ \alpha+\beta=180^\circ :: $\alpha$ e $\beta$ insieme formano un angolo piatto
~ \gamma+\beta=180^\circ :: anche $\gamma$ e $\beta$ formano un angolo piatto
~ \evidb{\alpha=\gamma} :: sono supplementari dello stesso angolo $\beta$, quindi sono uguali` },

    { id: 'criteri-congruenza', titolo: 'Triangoli e criteri di congruenza', testo: R`Un triangolo si classifica in due modi: guardando i lati oppure guardando gli angoli.

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

### I tre criteri

Due triangoli sono **congruenti** se, ritagliati, si sovrappongono perfettamente. Per esserne sicuro bastano tre elementi, scelti bene.

[[video:geometria-piano-1/criteri]]

>* **Criteri di congruenza** (L = lato, A = angolo). **Primo, LAL:** due lati e l'angolo fra loro. **Secondo, ALA:** un lato e i due angoli adiacenti a esso. **Terzo, LLL:** i tre lati.

In due triangoli congruenti, di fronte a lati congruenti stanno angoli congruenti. È così che i criteri si usano. Prima dimostri che due triangoli sono congruenti, poi ne ricavi altri lati e angoli uguali.

?? Due triangoli hanno gli angoli di $50^\circ$, $60^\circ$ e $70^\circ$. Sono congruenti?
[ ] sì, per il criterio ALA
[x] non per forza: uno può essere più grande
[ ] sì, perché hanno tre angoli uguali
=> Con tre angoli uguali i triangoli sono **simili**. Pensa a un triangolo e alla sua fotocopia ingrandita. Il criterio ALA chiede anche un **lato** uguale, e qui dei lati non sai niente.

>! Due lati e un angolo **non** compreso fra loro non bastano. Come nel video, a volte escono due triangoli diversi.

### Il secondo criterio, dimostrato

Qui il primo criterio non si dimostra: molti libri, come Hilbert, lo prendono come postulato. Il secondo invece si ricava dal primo.

Ipotesi: $AB=A'B'$, $\alpha=\alpha'$ e $\beta=\beta'$. Tesi: $ABC\cong A'B'C'$. Basta mostrare che $AC=A'C'$: poi vale LAL.

~ A'C''=AC :: sulla semiretta $A'C'$ prendo il punto $C''$ con $A'C''=AC$
~ ABC\cong A'B'C'' :: per LAL: $AB=A'B'$, $\alpha=\alpha'$, $AC=A'C''$
~ A'\widehat{B'}C''=\beta=\beta' :: angoli corrispondenti, poi l'ipotesi
~ C''=C' :: le semirette $B'C''$ e $B'C'$ fanno lo stesso angolo con $B'A'$: coincidono
~ \evidb{AC=A'C'} :: quindi $ABC\cong A'B'C'$ per LAL

Il terzo criterio si dimostra con il triangolo isoscele, nella prossima sezione.` },

    { id: 'triangolo-isoscele', titolo: "Il triangolo isoscele e l'asse di un segmento", testo: R`Nel triangolo **isoscele** $ABC$ con $AB=AC$, il lato $BC$ è la **base**. Gli angoli $\beta$ e $\gamma$, in $B$ e in $C$, sono gli **angoli alla base**.

>* **Teorema del triangolo isoscele.** In un triangolo isoscele gli angoli alla base sono congruenti.

[[video:geometria-piano-1/isoscele]]

Ipotesi: $AB=AC$. Tesi: $\beta=\gamma$. Traccia la bisettrice dell'angolo in $A$: taglia $BC$ nel punto $D$.

~ AB=AC :: lo dice l'ipotesi
~ B\widehat{A}D=D\widehat{A}C :: $AD$ è la bisettrice
~ AD=AD :: è un lato in comune
~ ABD\cong ACD :: primo criterio, LAL
~ \evidb{\beta=\gamma} :: angoli corrispondenti: stanno tutti e due di fronte al lato $AD$

Vale anche il **teorema inverso**: se $\beta=\gamma$, allora $AB=AC$. Confronta il triangolo $ABC$ con se stesso, letto come $ACB$. Hanno $BC=CB$, $\beta=\gamma$ e $\gamma=\beta$. Per ALA sono congruenti, quindi $AB=AC$.

### Bisettrice, mediana e altezza

In un triangolo, la **mediana** va da un vertice al punto medio del lato opposto. L'**altezza** parte da un vertice ed è perpendicolare al lato opposto.

Nella dimostrazione, i triangoli $ABD$ e $ACD$ sono congruenti. Quindi $BD=DC$: $AD$ è anche la mediana. Gli angoli in $D$ sono uguali e insieme fanno $180^\circ$: sono retti, e $AD$ è anche l'altezza.

>* Nel triangolo isoscele, bisettrice, mediana e altezza relative alla base coincidono. Il triangolo equilatero ha i tre angoli congruenti.

Con il triangolo isoscele si dimostra anche il criterio LLL. Si accostano i due triangoli lungo un lato, e compaiono due triangoli isosceli.

### L'asse di un segmento come luogo

L'**asse** del segmento $AB$ è la retta perpendicolare ad $AB$ nel punto medio $M$. Un **luogo geometrico** è l'insieme di tutti i punti che hanno una certa proprietà.

>* L'asse di $AB$ è il luogo dei punti **equidistanti** da $A$ e da $B$. Ogni punto dell'asse ha $PA=PB$, e ogni punto con $PA=PB$ sta sull'asse.

Le due metà si dimostrano con quello che sai già.

- Se $P$ sta sull'asse, i triangoli $PMA$ e $PMB$ sono congruenti per LAL: $AM=MB$, angoli retti in $M$, $PM$ in comune. Quindi $PA=PB$.
- Se $PA=PB$, il triangolo $PAB$ è isoscele. La mediana $PM$ è anche altezza, quindi $P$ sta sull'asse.

Trascina $P$: le due distanze sono uguali solo sulla retta tratteggiata.

[[grafico:asseLuogo]]

>! Un luogo si dimostra nei due versi. I punti della figura hanno la proprietà, e chi ha la proprietà sta sulla figura.` },

    { id: 'perpendicolari-parallele', titolo: 'Perpendicolari e parallele', testo: R`Due rette sono **perpendicolari** se, incontrandosi, formano quattro angoli retti. Per parlarne serve prima un teorema sui triangoli.

### Il primo teorema dell'angolo esterno

Nel triangolo $ABC$ prolunga il lato $BC$ oltre $C$, fino a $D$. L'angolo $A\widehat{C}D$ è un **angolo esterno**. I due angoli interni **non adiacenti** a lui sono $\alpha$, in $A$, e $\beta$, in $B$.

>* **Primo teorema dell'angolo esterno.** Ogni angolo esterno di un triangolo è maggiore di ciascuno dei due angoli interni non adiacenti.

Dimostriamo che $A\widehat{C}D>\alpha$. Chiama $M$ il punto medio di $AC$.

~ AM=MC :: $M$ è il punto medio di $AC$
~ BM=ME :: prolungo $BM$ oltre $M$ fino a $E$, con $ME=BM$
~ AMB\cong CME :: LAL: anche gli angoli in $M$ sono congruenti, perché opposti al vertice
~ \alpha=M\widehat{C}E :: sono angoli corrispondenti dei due triangoli
~ \evidb{\alpha<A\widehat{C}D} :: $E$ sta dentro l'angolo $A\widehat{C}D$: $M\widehat{C}E$ ne è solo una parte

Per $\beta$ si fa lo stesso con il punto medio di $BC$.

### Una sola perpendicolare

>* Per un punto $P$ passa **una e una sola** retta perpendicolare a una retta $r$.

Perché una sola? Supponi che ce ne siano due, con i piedi $H$ e $K$ su $r$. Nel triangolo $PHK$ l'angolo esterno in $K$ è retto, e l'angolo interno in $H$ è retto anche lui. Ma l'angolo esterno deve essere maggiore: impossibile.

Il punto $H$ dove la perpendicolare incontra $r$ è la **proiezione** di $P$ su $r$. La lunghezza di $PH$ è la **distanza** di $P$ da $r$.

Trascina $Q$ lungo la retta: $PQ$ è sempre più lungo di $PH$, finché $Q$ non arriva in $H$.

[[grafico:distanza]]

>* La distanza di un punto da una retta si misura sulla perpendicolare. È il segmento più corto fra il punto e la retta.

### Rette parallele

Due rette del piano sono **parallele** se non hanno punti in comune, oppure se coincidono. Taglia due rette con una terza retta, la **trasversale**.

>* Se due rette formano con una trasversale angoli alterni interni congruenti, sono parallele.

Se invece si incontrassero in un punto, formerebbero un triangolo con la trasversale. In quel triangolo un angolo esterno sarebbe uguale a un interno non adiacente: impossibile per il primo teorema dell'angolo esterno.

Per il quinto postulato, per un punto fuori da una retta passa una sola parallela. Da qui viene il **teorema inverso**: se due rette sono parallele, formano con ogni trasversale angoli alterni interni congruenti.

Taglia due rette parallele $r$ e $s$ con una trasversale $t$. Si formano otto angoli, e alcune coppie hanno un nome:

- **corrispondenti**: nella stessa posizione nei due incroci. Sono **congruenti**.
- **alterni interni**: fra le parallele, da parti opposte di $t$. Sono **congruenti**.
- **coniugati interni**: fra le parallele, dalla stessa parte di $t$. Sono **supplementari**.

Trascina il punto $Q$: gli angoli $\alpha$ cambiano insieme e restano uguali.

[[grafico:trasversale]]

Per esempio, due rette perpendicolari alla stessa retta sono parallele: con lei formano angoli corrispondenti retti.

?? Due rette tagliate da una trasversale formano angoli coniugati interni di $70^\circ$ e $110^\circ$. Le due rette sono parallele?
[x] sì
[ ] no, i due angoli sono diversi
[ ] non si può dire
=> Sì. I coniugati interni sommano $180^\circ$ solo con due parallele, e qui $70^\circ+110^\circ=180^\circ$. Gli angoli *uguali* sono gli alterni interni e i corrispondenti, non i coniugati.

>! Gli opposti al vertice stanno nello stesso incrocio. Gli alterni interni stanno in due incroci diversi, uno su $r$ e uno su $s$.` },

    { id: 'somma-angoli-esterno', titolo: 'Somma degli angoli e angolo esterno', testo: R`Due angoli di un triangolo misurano $50^\circ$ e $60^\circ$. Il terzo misura $180^\circ-50^\circ-60^\circ=70^\circ$, perché gli angoli di qualunque triangolo sommano $180^\circ$.

[[video:geometria-piano-1/centottanta-gradi]]

Ecco la dimostrazione. Chiama $\alpha$, $\beta$, $\gamma$ gli angoli in $A$, $B$, $C$. Poi traccia per $C$ la parallela $r$ ad $AB$.

~ r\parallel AB :: per $C$ traccio la parallela ad $AB$ (per il quinto postulato ce n'è una sola)
~ \alpha'=\evid{\alpha} :: $\alpha'$ è l'angolo in $C$ fra $r$ e $CA$; con $\alpha$ è alterno interno, e la trasversale è $AC$
~ \beta'=\evid{\beta} :: stesso ragionamento con la trasversale $BC$
~ \alpha'+\gamma+\beta'=180^\circ :: i tre angoli in $C$, uno accanto all'altro, formano l'angolo piatto su $r$
~ \evidb{\alpha+\beta+\gamma=180^\circ} :: sostituisco $\alpha'$ e $\beta'$

?? Un triangolo può avere due angoli retti?
=> No. Due angoli retti fanno già $180^\circ$, e per il terzo angolo non resta niente. Per lo stesso motivo un triangolo ha al massimo un angolo ottuso.

Nel triangolo equilatero i tre angoli sono congruenti: ognuno misura $180^\circ:3=60^\circ$.

### Il secondo teorema dell'angolo esterno

Con la somma degli angoli si sa di più sull'angolo esterno. Prolunga il lato $BC$ oltre $C$, fino a un punto $D$. L'angolo $\delta=A\widehat{C}D$ è un **angolo esterno** del triangolo, adiacente a $\gamma$.

[[video:geometria-piano-1/angolo-esterno]]

~ \gamma+\delta=180^\circ :: $\gamma$ e $\delta$ sono adiacenti: formano un angolo piatto
~ \alpha+\beta+\gamma=180^\circ :: è la somma degli angoli del triangolo
~ \evidb{\delta=\alpha+\beta} :: tolgo $\gamma$ da tutte e due le uguaglianze

>* **Secondo teorema dell'angolo esterno.** Un angolo esterno è la somma dei due angoli interni **non adiacenti**.

È la forma precisa del primo teorema, visto con le perpendicolari. Se $\delta=\alpha+\beta$, allora $\delta$ è maggiore sia di $\alpha$ sia di $\beta$.

Trascina $A$: $\delta$ e $\alpha+\beta$ cambiano, ma restano uguali.

[[grafico:angoloEsterno]]

### Gli angoli di un poligono

Le diagonali che partono da un vertice dividono un poligono convesso di $n$ lati in $n-2$ triangoli. Quindi gli angoli interni sommano $(n-2)\cdot180^\circ$. Con $7$ lati: $5\cdot180^\circ=900^\circ$.

In ogni vertice, angolo interno e angolo esterno fanno $180^\circ$. Allora gli $n$ angoli esterni sommano $n\cdot180^\circ-(n-2)\cdot180^\circ=360^\circ$, qualunque sia $n$.

>! Nella somma degli angoli esterni conta **un** angolo esterno per ogni vertice, non due.` },

    { id: 'disuguaglianze', titolo: 'Disuguaglianze fra lati e angoli', testo: R`In un triangolo lati e angoli non sono indipendenti. Il lato più lungo sta sempre di fronte all'angolo più grande.

>* In ogni triangolo, a lato maggiore sta opposto angolo maggiore. E viceversa: ad angolo maggiore sta opposto lato maggiore.

Dimostriamo il primo verso. Ipotesi: $AB>AC$. Tesi: $\gamma>\beta$, perché $\gamma$ sta di fronte ad $AB$ e $\beta$ di fronte ad $AC$.

~ AD=AC :: su $AB$ prendo $D$ con $AD=AC$; $D$ sta fra $A$ e $B$, perché $AB>AC$
~ A\widehat{C}D=A\widehat{D}C :: il triangolo $ACD$ è isoscele
~ A\widehat{D}C>\beta :: $A\widehat{D}C$ è un angolo esterno del triangolo $DBC$
~ \gamma>A\widehat{C}D :: $A\widehat{C}D$ è solo una parte dell'angolo $\gamma$
~ \evidb{\gamma>\beta} :: in fila: $\gamma>A\widehat{C}D=A\widehat{D}C>\beta$

Esempio: nel triangolo $ABC$ gli angoli sono $\alpha=40^\circ$, $\beta=65^\circ$ e $\gamma=75^\circ$. Il lato più lungo è $AB$, opposto a $\gamma$. Il più corto è $BC$, opposto ad $\alpha$.

Nel triangolo rettangolo l'angolo retto è il più grande: gli altri due sono acuti. Per questo l'**ipotenusa** è il lato più lungo.

?? In un triangolo isoscele l'angolo al vertice misura $100^\circ$. Qual è il lato più lungo?
[x] la base
[ ] uno dei due lati congruenti
[ ] i tre lati sono uguali
=> Gli angoli alla base misurano $40^\circ$ ciascuno. L'angolo più grande è quello al vertice, e di fronte c'è la base.

### La disuguaglianza triangolare

Con bastoncini lunghi $2$, $3$ e $10$ non fai un triangolo. I due corti, in fila, arrivano solo a $5$.

>* **Disuguaglianza triangolare:** ogni lato è minore della somma degli altri due, e maggiore della loro differenza. Con due lati di $4$ e $9$, il terzo sta fra $9-4=5$ e $9+4=13$ esclusi.` },

    { id: 'triangoli-rettangoli', titolo: 'Triangoli rettangoli e bisettrice di un angolo', testo: R`Gli angoli retti sono tutti congruenti. Per questo, fra due triangoli rettangoli, bastano **due** elementi oltre all'angolo retto.

>* **Criteri per i triangoli rettangoli.** Oltre all'angolo retto bastano due elementi congruenti. Possono essere i due cateti, o un cateto e un angolo acuto. Oppure l'ipotenusa e un angolo acuto, o l'ipotenusa e un cateto.

Con i due cateti si usa LAL: l'angolo retto sta fra loro. Con un cateto e l'angolo acuto **adiacente** a lui si usa ALA.

Se l'angolo acuto è **opposto** al cateto, serve prima la somma degli angoli. L'altro angolo acuto vale $90^\circ$ meno il primo, ed è adiacente al cateto. Poi si usa ALA. Lo stesso vale con l'ipotenusa e un angolo acuto.

È il **secondo criterio generalizzato**: due triangoli con un lato e due angoli qualsiasi congruenti sono congruenti. Il terzo angolo si ricava dalla somma, e si torna ad ALA.

L'ultimo è un criterio speciale. Si dimostra accostando i due triangoli lungo il cateto congruente: insieme formano un triangolo isoscele.

>! Due angoli acuti uguali non bastano: i triangoli sono solo simili, come con tre angoli uguali.

### La bisettrice come luogo

La distanza di un punto da un lato dell'angolo si misura sulla perpendicolare a quel lato.

>* La bisettrice di un angolo è il luogo dei punti **equidistanti** dai due lati dell'angolo.

Prendi un angolo di vertice $O$ e un punto $P$ al suo interno. Chiama $H$ e $K$ le proiezioni di $P$ sui due lati. I triangoli $OHP$ e $OKP$ sono rettangoli e hanno l'ipotenusa $OP$ in comune.

- Se $P$ sta sulla bisettrice, i due angoli in $O$ sono uguali. Per ipotenusa e angolo acuto i triangoli sono congruenti: $PH=PK$.
- Se $PH=PK$, i triangoli sono congruenti per ipotenusa e cateto. Gli angoli in $O$ sono uguali: $P$ sta sulla bisettrice.

Trascina $P$: le due distanze coincidono solo sulla bisettrice, tratteggiata.

[[grafico:bisettriceLuogo]]

?? Un punto dista $3$ cm da un lato di un angolo e $5$ cm dall'altro. Sta sulla bisettrice?
[x] no
[ ] sì
[ ] dipende dall'ampiezza dell'angolo
=> No. Sulla bisettrice le due distanze sono uguali, qualunque sia l'angolo. Qui sono diverse, quindi il punto sta più vicino a uno dei lati.` },

    { id: 'quadrilateri', titolo: 'Parallelogrammi e trapezi', testo: R`Una diagonale divide un quadrilatero in due triangoli. Per questo gli angoli di un quadrilatero sommano $2\cdot180^\circ=360^\circ$.

Il **parallelogramma** ha i lati opposti paralleli.

>* In ogni **parallelogramma** i lati opposti sono congruenti, e anche gli angoli opposti. Due angoli consecutivi sono supplementari. Le diagonali si tagliano a metà.

Esempio: un angolo misura $65^\circ$. Quello consecutivo misura $180^\circ-65^\circ=115^\circ$, quello opposto di nuovo $65^\circ$.

- Il **rettangolo** ha quattro angoli retti e le diagonali congruenti.
- Il **rombo** ha quattro lati congruenti e le diagonali perpendicolari.
- Il **quadrato** è rettangolo e rombo insieme.

Il **trapezio** ha una sola coppia di lati paralleli, le basi. Nel trapezio **isoscele** gli altri due lati sono congruenti.

?? Un quadrilatero ha le diagonali perpendicolari. È per forza un rombo?
=> No. Nel rombo le diagonali sono perpendicolari **e** si tagliano a metà. Pensa all'aquilone: ha le diagonali perpendicolari, ma non è un parallelogramma.

>! «Ogni quadrato è un rombo» è vero. «Ogni rombo è un quadrato» è falso, perché al rombo mancano gli angoli retti.

### Quando un quadrilatero è un parallelogramma

Le proprietà si possono rovesciare. Un quadrilatero convesso è un parallelogramma se vale **una** di queste condizioni:

1. i lati opposti sono congruenti a due a due;
2. gli angoli opposti sono congruenti a due a due;
3. le diagonali si tagliano a metà;
4. due lati opposti sono paralleli e congruenti.

Vediamo la terza. Le diagonali $AC$ e $BD$ si incontrano in $O$, con $AO=OC$ e $BO=OD$.

~ AOB\cong COD :: LAL: $AO=OC$, $BO=OD$, angoli in $O$ opposti al vertice
~ O\widehat{A}B=O\widehat{C}D :: angoli corrispondenti dei due triangoli
~ \evidb{AB\parallel CD} :: sono alterni interni rispetto alla trasversale $AC$

Allo stesso modo $AD\parallel BC$, con i triangoli $AOD$ e $COB$. Trascina $A$ e $B$: le diagonali si tagliano sempre a metà, e $ABCD$ resta un parallelogramma.

[[grafico:diagonaliParallelogramma]]

Per i parallelogrammi speciali bastano le diagonali. Se sono **congruenti**, è un rettangolo. Se sono **perpendicolari**, è un rombo.

>! Due lati opposti congruenti e gli altri due paralleli non bastano. Il trapezio isoscele li ha, e non è un parallelogramma.

### Il trapezio isoscele

>* Nel trapezio isoscele gli angoli adiacenti a ciascuna base sono congruenti, e le diagonali sono congruenti. Vale anche il contrario: un trapezio con gli angoli adiacenti a una base congruenti è isoscele.

Gli angoli sullo stesso lato obliquo sono coniugati interni fra le basi: sommano $180^\circ$. Se un angolo alla base maggiore misura $70^\circ$, gli altri tre misurano $70^\circ$, $110^\circ$ e $110^\circ$.` },

    { id: 'punti-medi', titolo: 'Il teorema dei punti medi e il piccolo Talete', testo: R`Nel triangolo $ABC$ chiama $M$ il punto medio di $AB$ e $N$ il punto medio di $BC$.

>* **Teorema dei punti medi.** Unisci i punti medi di due lati di un triangolo. Il segmento è parallelo al terzo lato e lungo la metà: $MN\parallel AC$ e $MN=\frac{AC}{2}$.

Trascina $B$: il triangolo cambia, ma $MN$ resta parallelo ad $AC$ e lungo $4$, la metà di $8$.

[[grafico:puntiMedi]]

La dimostrazione usa i criteri e i parallelogrammi. Prolunga $MN$ oltre $N$ fino a $P$, con $NP=MN$.

~ MBN\cong PCN :: LAL: $BN=NC$, $MN=NP$, angoli in $N$ opposti al vertice
~ PC=MB=AM :: lati corrispondenti; e $MB=AM$ perché $M$ è il punto medio
~ PC\parallel AM :: $N\widehat{C}P=N\widehat{B}M$ sono alterni interni, con la trasversale $BC$
~ AMPC\ \text{parallelogramma} :: ha due lati opposti, $AM$ e $PC$, paralleli e congruenti
~ \evidb{MN=\tfrac{MP}{2}=\tfrac{AC}{2}} :: $MP$ è parallelo e uguale ad $AC$, e $N$ ne è il punto medio

Unisci i punti medi dei quattro lati di un quadrilatero qualunque. Con questo teorema, usato due volte per diagonale, esce sempre un parallelogramma.

[[video:geometria-piano-1/punti-medi]]

### Il piccolo teorema di Talete

>* **Piccolo teorema di Talete.** Se un fascio di rette parallele taglia su una trasversale segmenti congruenti, taglia segmenti congruenti anche su ogni altra trasversale.

Ne viene il teorema inverso dei punti medi. La parallela a un lato, condotta dal punto medio di un altro lato, passa per il punto medio del terzo.

Anche nel trapezio c'è un segmento dei punti medi. Quello che unisce i punti medi dei lati obliqui è parallelo alle basi. È lungo la loro **semisomma**, $\frac{B+b}{2}$: con basi $9$ e $5$ misura $7$. Basta tracciare una diagonale e usare il teorema dei punti medi nei due triangoli.

?? Nel triangolo $ABC$ il lato $AC$ misura $11$. Quanto misura il segmento che unisce i punti medi di $AB$ e di $BC$?
[x] $5{,}5$
[ ] $11$
[ ] $22$
[ ] dipende dagli altri due lati
=> È la metà di $AC$, qualunque siano gli altri due lati. $22$ sarebbe il doppio: il segmento dei punti medi è più corto del lato, non più lungo.

>! Il piccolo Talete parla di segmenti **congruenti**. Quello con i segmenti proporzionali è il teorema di Talete, che studierai con la similitudine.` }
  ],

  grafici: {
    asseLuogo: {
      tipo: 'piano', x: [-1, 7], y: [-3.5, 4.5], assi: false, griglia: false,
      parametri: [
        { nome: 'px', min: -0.5, max: 6.5, passo: 0.5, valore: 4.5, nascosto: true },
        { nome: 'py', min: -3, max: 3.5, passo: 0.5, valore: 2.5, nascosto: true }
      ],
      elementi: [
        { tipo: 'verticale', x: 3, tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: [0, 0], a: [6, 0], colore: 1 },
        { tipo: 'angolo', vertice: [3, 0], da: [6, 0], a: [3, 3], raggio: 0.45, colore: 4 },
        { tipo: 'segmento', da: ['px', 'py'], a: [0, 0], colore: 2 },
        { tipo: 'segmento', da: ['px', 'py'], a: [6, 0], colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso-sinistra' },
        { tipo: 'punto', p: [6, 0], etichetta: 'B', posizione: 'basso-destra' },
        { tipo: 'punto', p: [3, 0], etichetta: 'M', posizione: 'basso-destra' },
        { tipo: 'punto', p: ['px', 'py'], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-0.8, 4.0], testo: 'PA = {{sqrt(px^2 + py^2)}}', ancora: 'start' },
        { tipo: 'testo', p: [-0.8, 3.3], testo: 'PB = {{sqrt((px - 6)^2 + py^2)}}', ancora: 'start' }
      ],
      didascalia: "Trascina P. PA e PB sono uguali solo quando P sta sull'asse di AB, la retta tratteggiata perpendicolare ad AB nel punto medio M."
    },
    distanza: {
      tipo: 'piano', x: [-1, 9], y: [-1, 5.5], assi: false, griglia: false,
      parametri: [ { nome: 'qx', min: -0.5, max: 8.5, passo: 0.5, valore: 6.5, nascosto: true } ],
      elementi: [
        { tipo: 'orizzontale', y: 0, etichetta: 'r', colore: 1 },
        { tipo: 'segmento', da: [3, 4], a: [3, 0], colore: 3 },
        { tipo: 'angolo', vertice: [3, 0], da: [5, 0], a: [3, 4], raggio: 0.45, colore: 3 },
        { tipo: 'segmento', da: [3, 4], a: ['qx', 0], colore: 2, tratteggio: true },
        { tipo: 'punto', p: [3, 4], etichetta: 'P', posizione: 'alto' },
        { tipo: 'punto', p: [3, 0], etichetta: 'H', posizione: 'basso-sinistra' },
        { tipo: 'punto', p: ['qx', 0], trascina: true, etichetta: 'Q', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-0.8, 5.0], testo: 'PH = 4', ancora: 'start' },
        { tipo: 'testo', p: [-0.8, 4.3], testo: 'PQ = {{sqrt((qx - 3)^2 + 16)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina Q lungo la retta r. PQ è sempre più lungo di PH, il segmento perpendicolare; i due coincidono solo quando Q arriva in H.'
    },
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
    angoloEsterno: {
      tipo: 'piano', x: [-1.5, 9], y: [-1, 5.6], assi: false, griglia: false,
      parametri: [
        { nome: 'ax', min: 0, max: 6, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'ay', min: 1.5, max: 4, passo: 0.5, valore: 3.5, nascosto: true }
      ],
      elementi: [
        { tipo: 'segmento', da: [5, 0], a: [8.5, 0], tratteggio: true, colore: 1 },
        { tipo: 'poligono', punti: [[0, 0], [5, 0], ['ax', 'ay']], etichette: ['B', 'C', ''], colore: 1 },
        { tipo: 'angolo', vertice: ['ax', 'ay'], da: [0, 0], a: [5, 0], etichetta: 'α', raggio: 0.6, colore: 2 },
        { tipo: 'angolo', vertice: [0, 0], da: [5, 0], a: ['ax', 'ay'], etichetta: 'β', raggio: 0.7, colore: 3 },
        { tipo: 'angolo', vertice: [5, 0], da: ['ax', 'ay'], a: [0, 0], etichetta: 'γ', raggio: 0.5, colore: 4 },
        { tipo: 'angolo', vertice: [5, 0], da: [8.5, 0], a: ['ax', 'ay'], etichetta: 'δ', raggio: 0.9, colore: 2 },
        { tipo: 'punto', p: [8.5, 0], etichetta: 'D', posizione: 'basso' },
        { tipo: 'punto', p: ['ax', 'ay'], trascina: true, etichetta: 'A', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-1.3, 5.1], testo: 'δ = {{round(' + ANG([5, 0], [8.5, 0], ['ax', 'ay']) + ')}}°', ancora: 'start' },
        { tipo: 'testo', p: [-1.3, 4.4], testo: 'α + β = {{round(' + ANG(['ax', 'ay'], [0, 0], [5, 0]) + ' + ' + ANG([0, 0], [5, 0], ['ax', 'ay']) + ')}}°', ancora: 'start' }
      ],
      didascalia: "Trascina A. L'angolo esterno δ, fra il lato CA e il prolungamento di BC, è sempre uguale ad α + β, la somma dei due angoli interni non adiacenti."
    },
    bisettriceLuogo: {
      tipo: 'piano', x: [-1, 9], y: [-1, 7], assi: false, griglia: false,
      parametri: [
        { nome: 'px', min: 0.5, max: 8, passo: 0.5, valore: 5, nascosto: true },
        { nome: 'py', min: 0.5, max: 5.5, passo: 0.5, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [9, 0], colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: [5.1, 6.8], colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: [9, 4.5], tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: ['px', 'py'], a: ['px', 0], colore: 2 },
        { tipo: 'segmento', da: ['px', 'py'], a: ['px - 4*(4*px - 3*py)/25', 'py + 3*(4*px - 3*py)/25'], colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-sinistra' },
        { tipo: 'punto', p: ['px', 0], etichetta: 'H', posizione: 'basso' },
        { tipo: 'punto', p: ['px - 4*(4*px - 3*py)/25', 'py + 3*(4*px - 3*py)/25'], etichetta: 'K', posizione: 'alto-sinistra' },
        { tipo: 'punto', p: ['px', 'py'], trascina: true, etichetta: 'P', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [8.8, 6.5], testo: 'PH = {{py}}', ancora: 'end' },
        { tipo: 'testo', p: [8.8, 5.8], testo: 'PK = {{abs(4*px - 3*py)/5}}', ancora: 'end' }
      ],
      didascalia: "Trascina P. PH e PK sono le distanze di P dai due lati dell'angolo: sono uguali solo quando P sta sulla bisettrice tratteggiata."
    },
    diagonaliParallelogramma: {
      tipo: 'piano', x: [-0.5, 8.5], y: [-2.2, 6.5], assi: false, griglia: false,
      parametri: [
        { nome: 'ax', min: 0, max: 3, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'ay', min: 0, max: 2.5, passo: 0.5, valore: 0.5, nascosto: true },
        { nome: 'bx', min: 5, max: 8, passo: 0.5, valore: 6, nascosto: true },
        { nome: 'by', min: 0, max: 2.5, passo: 0.5, valore: 1, nascosto: true }
      ],
      elementi: [
        { tipo: 'poligono', punti: [['ax', 'ay'], ['bx', 'by'], ['8 - ax', '6 - ay'], ['8 - bx', '6 - by']], etichette: ['', '', 'C', 'D'], colore: 1 },
        { tipo: 'segmento', da: ['ax', 'ay'], a: ['8 - ax', '6 - ay'], tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: ['bx', 'by'], a: ['8 - bx', '6 - by'], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [4, 3], etichetta: 'O', posizione: 'destra' },
        { tipo: 'punto', p: ['ax', 'ay'], trascina: true, etichetta: 'A', posizione: 'basso-sinistra', colore: 2 },
        { tipo: 'punto', p: ['bx', 'by'], trascina: true, etichetta: 'B', posizione: 'basso-destra', colore: 2 },
        { tipo: 'testo', p: [-0.3, -1.1], testo: 'AB = {{sqrt((bx - ax)^2 + (by - ay)^2)}}   CD = {{sqrt((bx - ax)^2 + (by - ay)^2)}}', ancora: 'start' },
        { tipo: 'testo', p: [-0.3, -1.9], testo: 'AD = {{sqrt((8 - bx - ax)^2 + (6 - by - ay)^2)}}   BC = {{sqrt((8 - ax - bx)^2 + (6 - ay - by)^2)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina A e B; C e D stanno dall’altra parte di O, alla stessa distanza. Le diagonali si tagliano a metà, e i lati opposti restano paralleli e uguali.'
    },
    puntiMedi: {
      tipo: 'piano', x: [-1.5, 9.5], y: [-2, 6], assi: false, griglia: false,
      parametri: [
        { nome: 'bx', min: 0, max: 9, passo: 0.5, valore: 2.5, nascosto: true },
        { nome: 'by', min: 1.5, max: 5.5, passo: 0.5, valore: 5, nascosto: true }
      ],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], ['bx', 'by'], [8, 0]], etichette: ['A', '', 'C'], colore: 1 },
        { tipo: 'segmento', da: ['bx/2', 'by/2'], a: ['(bx + 8)/2', 'by/2'], colore: 2 },
        { tipo: 'punto', p: ['bx/2', 'by/2'], etichetta: 'M', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: ['(bx + 8)/2', 'by/2'], etichetta: 'N', posizione: 'destra', colore: 2 },
        { tipo: 'punto', p: ['bx', 'by'], trascina: true, etichetta: 'B', posizione: 'alto', colore: 3 },
        { tipo: 'testo', p: [-1.3, -1.0], testo: 'AC = 8', ancora: 'start' },
        { tipo: 'testo', p: [-1.3, -1.7], testo: 'MN = {{(bx + 8)/2 - bx/2}}, parallelo ad AC', ancora: 'start' }
      ],
      didascalia: 'Trascina B. M ed N sono i punti medi di AB e BC: il segmento MN resta parallelo ad AC e lungo la metà, 4.'
    }
  },

  esempi: [
    { titolo: 'Il terzo angolo di un triangolo', problema: R`In un triangolo due angoli misurano $42^\circ$ e $81^\circ$. Quanto misura il terzo?`, passi: [
      R`La somma degli angoli interni di un triangolo vale sempre $180^\circ$, qualunque sia la forma del triangolo.`,
      R`Il terzo angolo si trova per differenza: $180^\circ - 42^\circ - 81^\circ = 57^\circ$.`
    ], risultato: R`Il terzo angolo misura $57^\circ$.` },

    { titolo: 'Le bisettrici di due angoli adiacenti', problema: R`Due angoli adiacenti $A\widehat{O}B$ e $B\widehat{O}C$ formano insieme un angolo piatto. Dimostra che le loro bisettrici sono perpendicolari.`, passi: [
      R`Ipotesi: $A\widehat{O}B+B\widehat{O}C=180^\circ$. Tesi: l'angolo fra le due bisettrici è retto.`,
      R`Chiama $2x$ l'angolo $A\widehat{O}B$ e $2y$ l'angolo $B\widehat{O}C$. Allora $2x+2y=180^\circ$, quindi $x+y=90^\circ$.`,
      R`La prima bisettrice divide $A\widehat{O}B$ in due angoli di $x$. La seconda divide $B\widehat{O}C$ in due angoli di $y$.`,
      R`Fra le due bisettrici ci sono due mezzi angoli, uno per parte rispetto a $OB$. Insieme fanno $x+y=90^\circ$.`
    ], risultato: R`L'angolo fra le bisettrici misura $90^\circ$: sono perpendicolari, qualunque sia la coppia di angoli adiacenti.` },

    { titolo: "Dall'angolo esterno ai tre angoli", problema: R`Nel triangolo $ABC$ l'angolo esterno in $C$ misura $126^\circ$, e l'angolo $\alpha$ è il doppio dell'angolo $\beta$. Quanto misurano i tre angoli del triangolo?`, passi: [
      R`Per il secondo teorema dell'angolo esterno, $\alpha+\beta=126^\circ$: sono i due interni non adiacenti all'angolo esterno in $C$.`,
      R`Con $\alpha=2\beta$ viene $2\beta+\beta=126^\circ$, cioè $3\beta=126^\circ$ e $\beta=42^\circ$. Quindi $\alpha=84^\circ$.`,
      R`L'angolo $\gamma$ è adiacente all'angolo esterno: $\gamma=180^\circ-126^\circ=54^\circ$.`,
      R`Controllo: $84^\circ+42^\circ+54^\circ=180^\circ$. ✓`
    ], risultato: R`$\alpha=84^\circ$, $\beta=42^\circ$, $\gamma=54^\circ$.` },

    { titolo: 'Le diagonali del rettangolo, dimostrato', problema: R`Dimostra che le diagonali $AC$ e $BD$ di un rettangolo $ABCD$ sono congruenti.`, passi: [
      R`Ipotesi: $ABCD$ è un rettangolo. Tesi: $AC=BD$. Le due diagonali stanno nei triangoli $ABC$ e $BAD$: conviene dimostrare che sono congruenti.`,
      R`$AB=BA$: è un lato in comune.`,
      R`$BC=AD$: il rettangolo è un parallelogramma, e i lati opposti sono congruenti.`,
      R`$A\widehat{B}C=B\widehat{A}D=90^\circ$: gli angoli del rettangolo sono retti, ed è l'angolo compreso fra i due lati.`,
      R`Per il primo criterio, LAL, $ABC\cong BAD$. I lati corrispondenti $AC$ e $BD$ stanno di fronte agli angoli retti: sono congruenti.`
    ], risultato: R`$AC=BD$: in ogni rettangolo le diagonali sono congruenti.` },

    { titolo: 'Il triangolo dei punti medi', problema: R`Un triangolo ha i lati di $8$, $10$ e $12$ cm. Unisci a due a due i punti medi dei tre lati. Quanto misura il perimetro del triangolo che ottieni?`, passi: [
      R`Ogni lato del nuovo triangolo unisce i punti medi di due lati. Per il teorema dei punti medi è lungo la metà del terzo lato.`,
      R`I tre lati misurano quindi $8:2=4$, $10:2=5$ e $12:2=6$ cm.`,
      R`Perimetro: $4+5+6=15$ cm, la metà del perimetro di partenza, che è $30$ cm.`,
      R`I quattro triangolini che si formano hanno tutti i lati di $4$, $5$ e $6$ cm: sono congruenti per LLL.`
    ], risultato: R`Il perimetro è $15$ cm, la metà di quello del triangolo di partenza.` },

    { titolo: 'Un isoscele con due lati dati', problema: R`Un triangolo isoscele ha due lati di $3$ cm e $7$ cm. Quanto misura il perimetro?`, passi: [
      R`Il terzo lato è uguale a uno dei due: può essere $3$ oppure $7$ cm.`,
      R`Con i lati $3$, $3$ e $7$: i due lati corti in fila arrivano a $6$, meno di $7$. La disuguaglianza triangolare non vale, il triangolo non esiste.`,
      R`Con i lati $7$, $7$ e $3$: ogni lato è minore della somma degli altri due ($3<14$ e $7<10$). Il triangolo esiste.`,
      R`Perimetro: $7+7+3=17$ cm.`
    ], risultato: R`Il perimetro è $17$ cm: i lati sono $7$, $7$ e $3$ cm.` }
  ],

  formulario: [
    { nome: 'Angoli complementari e supplementari', formula: R`\alpha+\beta=90^\circ \qquad \alpha+\beta=180^\circ`, nota: R`Complementari a sinistra, supplementari a destra.` },
    { nome: 'Somma degli angoli interni di un triangolo', formula: R`\alpha + \beta + \gamma = 180^\circ` },
    { nome: "Secondo teorema dell'angolo esterno", formula: R`\delta = \alpha + \beta`, nota: R`$\delta$ è l'angolo esterno adiacente a $\gamma$; $\alpha$ e $\beta$ sono i due interni non adiacenti.` },
    { nome: 'Somma degli angoli interni di un poligono', formula: R`(n-2)\cdot 180^\circ`, nota: R`$n$ = numero dei lati. Per un poligono regolare, l'angolo interno si trova dividendo questa somma per $n$.` },
    { nome: 'Somma degli angoli esterni di un poligono convesso', formula: R`360^\circ`, nota: R`Un angolo esterno per vertice, qualunque sia il numero dei lati.` },
    { nome: 'Disuguaglianza triangolare', formula: R`|b-c| < a < b+c`, nota: R`Vale per ciascun lato. Le tre disuguaglianze $a<b+c$, $b<a+c$, $c<a+b$ insieme equivalgono a questa.` },
    { nome: 'Angoli consecutivi di un parallelogramma', formula: R`\alpha + \beta = 180^\circ`, nota: R`Gli angoli opposti, invece, sono congruenti.` },
    { nome: 'Teorema dei punti medi', formula: R`MN \parallel AC \qquad MN = \frac{AC}{2}`, nota: R`$M$ ed $N$ sono i punti medi di $AB$ e $BC$.` },
    { nome: 'Segmento dei punti medi dei lati obliqui di un trapezio', formula: R`\frac{B+b}{2}`, nota: R`$B$, $b$ = le due basi; il segmento è parallelo alle basi.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'enti-primitivi-assiomi', tipo: 'definizione', fronte: R`Enti primitivi`, retro: R`Punto, retta e piano: nozioni che non si definiscono con altre più semplici, ma solo si descrivono.` },
    { id: 'fc-02', sezione: 'enti-primitivi-assiomi', tipo: 'definizione', fronte: R`Postulato (o assioma)`, retro: R`Un'affermazione che si assume vera senza dimostrazione: è il punto di partenza per dimostrare i teoremi.` },
    { id: 'fc-03', sezione: 'enti-primitivi-assiomi', tipo: 'concetto', fronte: R`Che cosa vuol dire «dimostrare» un teorema?`, retro: R`Costruire una catena di passaggi logici che arriva alla tesi. Si parte da assiomi e teoremi già noti, e il disegno non vale come prova.` },
    { id: 'fc-04', sezione: 'enti-primitivi-assiomi', tipo: 'definizione', fronte: R`Angoli complementari`, retro: R`La loro somma misura $90^\circ$.` },
    { id: 'fc-05', sezione: 'enti-primitivi-assiomi', tipo: 'definizione', fronte: R`Angoli supplementari`, retro: R`La loro somma misura $180^\circ$.` },
    { id: 'fc-06', sezione: 'enti-primitivi-assiomi', tipo: 'concetto', fronte: R`Angoli opposti al vertice`, retro: R`Si formano quando due rette si incontrano; sono sempre congruenti.` },
    { id: 'fc-07', sezione: 'criteri-congruenza', tipo: 'definizione', fronte: R`Classificazione dei triangoli per lati`, retro: R`Scaleno (lati tutti diversi), isoscele (almeno due lati congruenti), equilatero (tre lati congruenti).` },
    { id: 'fc-08', sezione: 'criteri-congruenza', tipo: 'concetto', fronte: R`Primo criterio di congruenza (LAL)`, retro: R`Due lati e l'angolo compreso fra essi congruenti.` },
    { id: 'fc-09', sezione: 'criteri-congruenza', tipo: 'concetto', fronte: R`Secondo criterio di congruenza (ALA)`, retro: R`Un lato e i due angoli adiacenti a esso congruenti. Si dimostra a partire dal primo criterio.` },
    { id: 'fc-10', sezione: 'criteri-congruenza', tipo: 'concetto', fronte: R`Terzo criterio di congruenza (LLL)`, retro: R`I tre lati congruenti.` },
    { id: 'fc-11', sezione: 'criteri-congruenza', tipo: 'concetto', fronte: R`Perché AAA non è un criterio di congruenza`, retro: R`Tre angoli congruenti garantiscono la stessa forma (similitudine), non la stessa grandezza.` },
    { id: 'fc-12', sezione: 'triangolo-isoscele', tipo: 'concetto', fronte: R`Teorema del triangolo isoscele e il suo inverso`, retro: R`Un triangolo è isoscele se e solo se ha due angoli congruenti: gli angoli alla base, opposti ai lati congruenti.` },
    { id: 'fc-13', sezione: 'triangolo-isoscele', tipo: 'definizione', fronte: R`Asse di un segmento come luogo`, retro: R`La perpendicolare al segmento nel punto medio. È il luogo dei punti equidistanti dagli estremi.` },
    { id: 'fc-14', sezione: 'perpendicolari-parallele', tipo: 'concetto', fronte: R`Angoli alterni interni fra due parallele`, retro: R`Se una trasversale taglia due parallele, gli alterni interni sono congruenti. Vale anche il viceversa: con alterni interni congruenti, le rette sono parallele.` },
    { id: 'fc-15', sezione: 'perpendicolari-parallele', tipo: 'definizione', fronte: R`Distanza di un punto da una retta`, retro: R`La lunghezza del segmento perpendicolare dal punto alla retta. È il più corto fra tutti i segmenti dal punto alla retta.` },
    { id: 'fc-16', sezione: 'somma-angoli-esterno', tipo: 'concetto', fronte: R`Somma degli angoli interni di un triangolo`, retro: R`Vale sempre $180^\circ$, qualunque triangolo si consideri.` },
    { id: 'fc-17', sezione: 'somma-angoli-esterno', tipo: 'concetto', fronte: R`I due teoremi dell'angolo esterno`, retro: R`Primo: un angolo esterno è maggiore di ciascuno dei due interni non adiacenti. Secondo: ne è la somma.` },
    { id: 'fc-18', sezione: 'disuguaglianze', tipo: 'concetto', fronte: R`Lati e angoli in un triangolo`, retro: R`A lato maggiore sta opposto angolo maggiore, e viceversa. Nel triangolo rettangolo l'ipotenusa è il lato più lungo.` },
    { id: 'fc-19', sezione: 'disuguaglianze', tipo: 'concetto', fronte: R`Disuguaglianza triangolare`, retro: R`Ogni lato di un triangolo è minore della somma degli altri due (e maggiore della loro differenza).` },
    { id: 'fc-20', sezione: 'triangoli-rettangoli', tipo: 'concetto', fronte: R`Criteri di congruenza dei triangoli rettangoli`, retro: R`Bastano due elementi congruenti. I due cateti, o un cateto e un angolo acuto. Oppure l'ipotenusa e un angolo acuto, o l'ipotenusa e un cateto.` },
    { id: 'fc-21', sezione: 'triangoli-rettangoli', tipo: 'definizione', fronte: R`Bisettrice di un angolo come luogo`, retro: R`È il luogo dei punti equidistanti dai due lati dell'angolo.` },
    { id: 'fc-22', sezione: 'quadrilateri', tipo: 'concetto', fronte: R`Angoli in un parallelogramma`, retro: R`Gli angoli opposti sono congruenti, quelli consecutivi (sullo stesso lato) sono supplementari.` },
    { id: 'fc-23', sezione: 'quadrilateri', tipo: 'definizione', fronte: R`Rombo`, retro: R`Parallelogramma con tutti i lati congruenti; le diagonali sono perpendicolari e bisettrici degli angoli.` },
    { id: 'fc-24', sezione: 'quadrilateri', tipo: 'procedura', fronte: R`Quando un quadrilatero convesso è un parallelogramma?`, retro: R`Basta una condizione. Lati opposti congruenti, o angoli opposti congruenti. Oppure diagonali che si tagliano a metà, o due lati opposti paralleli e congruenti.` },
    { id: 'fc-25', sezione: 'punti-medi', tipo: 'concetto', fronte: R`Teorema dei punti medi`, retro: R`Unisci i punti medi di due lati di un triangolo. Il segmento è parallelo al terzo lato e lungo la metà.` },
    { id: 'fc-26', sezione: 'punti-medi', tipo: 'concetto', fronte: R`Piccolo teorema di Talete`, retro: R`Se un fascio di parallele taglia segmenti congruenti su una trasversale, li taglia congruenti su ogni altra trasversale.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Quanto misura il supplementare di un angolo di $38^\circ$?`, suggerimenti: [R`Due angoli supplementari insieme fanno $180^\circ$.`], risposta: gradi(142), soluzione: [R`Supplementari vuol dire che la somma è $180^\circ$.`, R`Il supplementare misura $180^\circ-38^\circ=142^\circ$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Due rette si incontrano e uno dei quattro angoli misura $72^\circ$. Quanto misura un angolo adiacente a lui, cioè accanto, non opposto?`, suggerimenti: [R`Un angolo e quello accanto formano un angolo piatto.`], risposta: gradi(108), soluzione: [R`Due angoli adiacenti sulla stessa retta sommano $180^\circ$.`, R`L'angolo accanto misura $180^\circ-72^\circ=108^\circ$. Quello opposto al vertice, invece, misura ancora $72^\circ$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Due triangoli hanno $AB=A'B'$, $\beta=\beta'$ e $BC=B'C'$. Con quale criterio sono congruenti? Scrivi la sigla, per esempio *LLL*.`, suggerimenti: [R`L'angolo $\beta$ sta in $B$: è compreso fra i lati $AB$ e $BC$?`], risposta: crit('LAL'), soluzione: [R`L'angolo $\beta$ ha il vertice in $B$, fra i lati $BA$ e $BC$: è l'angolo compreso.`, R`Due lati e l'angolo compreso: primo criterio, LAL.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Un triangolo isoscele ha l'angolo al vertice di $80^\circ$. Quanto misura ciascun angolo alla base?`, suggerimenti: [R`Togli $80^\circ$ da $180^\circ$: quello che resta va ai due angoli alla base.`, R`Gli angoli alla base sono uguali: dividi per $2$.`], risposta: gradi(50), soluzione: [R`Ai due angoli alla base restano $180^\circ-80^\circ=100^\circ$.`, R`Sono congruenti, quindi ciascuno misura $100^\circ:2=50^\circ$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`In un triangolo isoscele ogni angolo alla base misura $35^\circ$. Quanto misura l'angolo al vertice?`, suggerimenti: [R`I due angoli alla base sono uguali: insieme fanno $70^\circ$.`], risposta: gradi(110), soluzione: [R`I due angoli alla base insieme fanno $2\cdot35^\circ=70^\circ$.`, R`L'angolo al vertice misura $180^\circ-70^\circ=110^\circ$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Due rette parallele sono tagliate da una trasversale. Un angolo alterno interno misura $65^\circ$. Quanto misura l'altro?`, suggerimenti: [R`Fra due parallele gli angoli alterni interni sono congruenti.`], risposta: gradi(65), soluzione: [R`Gli alterni interni fra due parallele sono congruenti.`, R`Anche l'altro misura $65^\circ$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Due rette parallele sono tagliate da una trasversale. Un angolo coniugato interno misura $110^\circ$. Quanto misura l'altro?`, suggerimenti: [R`I coniugati interni sono supplementari: insieme fanno $180^\circ$.`], risposta: gradi(70), soluzione: [R`I coniugati interni fra due parallele sommano $180^\circ$.`, R`L'altro misura $180^\circ-110^\circ=70^\circ$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Due angoli di un triangolo misurano $45^\circ$ e $75^\circ$. Quanto misura il terzo angolo?`, suggerimenti: [R`Gli angoli di un triangolo sommano $180^\circ$.`], risposta: gradi(60), soluzione: [R`I tre angoli insieme fanno $180^\circ$.`, R`Il terzo misura $180^\circ-45^\circ-75^\circ=60^\circ$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`In un triangolo due angoli misurano $48^\circ$ e $67^\circ$. Quanto misura l'angolo esterno adiacente al terzo angolo?`, suggerimenti: [R`L'angolo esterno è la somma dei due interni non adiacenti.`], risposta: gradi(115), soluzione: [R`I due angoli dati sono i due interni non adiacenti all'angolo esterno.`, R`L'angolo esterno misura $48^\circ+67^\circ=115^\circ$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Un angolo esterno di un triangolo misura $130^\circ$. Uno dei due angoli interni non adiacenti misura $55^\circ$. Quanto misura l'altro?`, suggerimenti: [R`L'angolo esterno è la somma dei due interni non adiacenti: $55^\circ+x=130^\circ$.`], risposta: gradi(75), soluzione: [R`Per il teorema dell'angolo esterno, $55^\circ+x=130^\circ$.`, R`L'altro angolo misura $130^\circ-55^\circ=75^\circ$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Quanto vale la somma degli angoli interni di un pentagono, in gradi?`, suggerimenti: [R`Usa $(n-2)\cdot180^\circ$ con $n=5$.`], risposta: gradi(540), soluzione: [R`Un pentagono ha $n=5$ lati: le diagonali da un vertice lo dividono in $3$ triangoli.`, R`Somma: $3\cdot180^\circ=540^\circ$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Quanto misura ciascun angolo esterno di un ottagono regolare?`, suggerimenti: [R`Gli angoli esterni di un poligono convesso sommano sempre $360^\circ$.`, R`Nell'ottagono regolare gli $8$ angoli esterni sono uguali.`], risposta: gradi(45), soluzione: [R`Gli angoli esterni sommano $360^\circ$.`, R`Sono $8$ e tutti uguali: $360^\circ:8=45^\circ$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Nel triangolo $ABC$ i lati misurano $BC=9$, $AC=7$ e $AB=5$. In quale vertice c'è l'angolo più grande? Scrivi la lettera.`, suggerimenti: [R`L'angolo più grande sta di fronte al lato più lungo.`, R`Il lato più lungo è $BC$: quale vertice gli sta di fronte?`], risposta: { tipo: 'testo', accettate: ['A', 'in A', 'angolo A', "l'angolo A", 'angolo in A', "l'angolo in A", 'vertice A', 'il vertice A', 'α', 'alfa', 'alpha'], segnaposto: 'una lettera', simboli: [] }, soluzione: [R`Il lato più lungo è $BC=9$.`, R`Di fronte a $BC$ c'è il vertice $A$: l'angolo più grande è $\alpha$, in $A$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Un triangolo ha due lati di $3$ e $4$. Il terzo lato è un numero intero. Quanti valori diversi può avere?`, suggerimenti: [R`Il terzo lato sta fra la differenza e la somma degli altri due, estremi esclusi.`, R`Fra $1$ e $7$, esclusi: conta gli interi.`], risposta: num(5), soluzione: [R`Per la disuguaglianza triangolare il terzo lato $x$ sta fra $4-3=1$ e $4+3=7$, estremi esclusi.`, R`Gli interi possibili sono $2$, $3$, $4$, $5$, $6$: in tutto $5$ valori.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`In un triangolo rettangolo un angolo acuto misura $35^\circ$. Quanto misura l'altro angolo acuto?`, suggerimenti: [R`L'angolo retto prende già $90^\circ$: ai due angoli acuti restano $90^\circ$.`], risposta: gradi(55), soluzione: [R`I due angoli acuti insieme fanno $180^\circ-90^\circ=90^\circ$.`, R`L'altro misura $90^\circ-35^\circ=55^\circ$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Un punto $P$ sta sulla bisettrice di un angolo e dista $4$ cm da uno dei due lati. Quanto dista dall'altro lato, in cm?`, suggerimenti: [R`La bisettrice è il luogo dei punti equidistanti dai lati dell'angolo.`], risposta: num(4), soluzione: [R`Ogni punto della bisettrice ha la stessa distanza dai due lati.`, R`Anche dall'altro lato $P$ dista $4$ cm.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Nel parallelogramma $ABCD$ le diagonali si incontrano in $O$. La diagonale $AC$ misura $14$ cm. Quanto misura $AO$, in cm?`, suggerimenti: [R`Nel parallelogramma le diagonali si tagliano a metà.`], risposta: num(7), soluzione: [R`Le diagonali di un parallelogramma si tagliano a metà: $O$ è il punto medio di $AC$.`, R`$AO=14:2=7$ cm.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`In un trapezio isoscele un angolo adiacente alla base maggiore misura $64^\circ$. Quanto misura ciascun angolo adiacente alla base minore?`, suggerimenti: [R`Gli angoli sullo stesso lato obliquo sono coniugati interni fra le basi parallele.`], risposta: gradi(116), soluzione: [R`Sullo stesso lato obliquo, i due angoli sono coniugati interni fra le basi: sommano $180^\circ$.`, R`L'angolo alla base minore misura $180^\circ-64^\circ=116^\circ$. Nel trapezio isoscele gli angoli alla base minore sono uguali: tutti e due $116^\circ$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Nel triangolo $ABC$ il lato $AC$ misura $18$ cm. $M$ ed $N$ sono i punti medi di $AB$ e di $BC$. Quanto misura $MN$, in cm?`, suggerimenti: [R`Il segmento che unisce i punti medi di due lati è lungo la metà del terzo lato.`], risposta: num(9), soluzione: [R`Per il teorema dei punti medi, $MN=\frac{AC}{2}$.`, R`$MN=18:2=9$ cm.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`In un triangolo, il segmento che unisce i punti medi di due lati misura $6{,}5$ cm. Quanto misura il terzo lato, in cm?`, suggerimenti: [R`Il segmento dei punti medi è la metà del terzo lato: qui fai il contrario.`], risposta: num(13), soluzione: [R`Il segmento dei punti medi è la metà del terzo lato.`, R`Il terzo lato misura $2\cdot6{,}5=13$ cm.`] },

    { id: 'es-01', difficolta: 2, testo: R`Nel parallelogramma $ABCD$ le diagonali si incontrano in $O$. Dimostra che si tagliano a metà: $AO=OC$ e $BO=OD$. Con quale criterio confronti i triangoli $AOB$ e $COD$?`, suggerimenti: [R`$AB$ e $CD$ sono lati opposti: che cosa sai di loro?`, R`$AB\parallel CD$: con la trasversale $AC$ e con la trasversale $BD$ ci sono angoli alterni interni congruenti.`, R`Un lato e i due angoli adiacenti a esso.`], risposta: crit('ALA'), soluzione: [R`Ipotesi: $ABCD$ è un parallelogramma. Tesi: $AO=OC$ e $BO=OD$.`, R`$AB=CD$: nel parallelogramma i lati opposti sono congruenti.`, R`$O\widehat{A}B=O\widehat{C}D$: alterni interni fra le parallele $AB$ e $CD$, con la trasversale $AC$.`, R`$O\widehat{B}A=O\widehat{D}C$: alterni interni con la trasversale $BD$.`, R`Per ALA $AOB\cong COD$. I lati corrispondenti danno $AO=OC$ e $BO=OD$.`] },

    { id: 'es-02', difficolta: 2, testo: R`Nel trapezio isoscele $ABCD$ le basi sono $AB$ e $CD$, e i lati obliqui $AD=BC$. Dimostra che le diagonali $AC$ e $BD$ sono congruenti. Con quale criterio confronti i triangoli $ABC$ e $BAD$?`, suggerimenti: [R`Le diagonali stanno nei triangoli $ABC$ e $BAD$, che hanno la base $AB$ in comune.`, R`$BC=AD$, e gli angoli in $A$ e in $B$ sono adiacenti alla stessa base.`, R`Due lati e l'angolo compreso.`], risposta: crit('LAL'), soluzione: [R`Ipotesi: $ABCD$ trapezio isoscele, $AD=BC$. Tesi: $AC=BD$.`, R`$AB=BA$: lato in comune.`, R`$BC=AD$: sono i lati obliqui.`, R`$A\widehat{B}C=B\widehat{A}D$: nel trapezio isoscele gli angoli adiacenti a una base sono congruenti.`, R`Per LAL $ABC\cong BAD$, quindi $AC=BD$.`] },

    { id: 'es-03', difficolta: 1, testo: R`In un parallelogramma un angolo misura $72^\circ$. Quanto misura l'angolo consecutivo, cioè quello sullo stesso lato (in gradi)?`, suggerimenti: [R`Gli angoli consecutivi di un parallelogramma non sono congruenti: c'è un'altra relazione fra loro.`, R`Sono supplementari: la somma fa $180^\circ$.`], risposta: { tipo: 'numero', valore: 108 }, soluzione: [R`Angoli consecutivi in un parallelogramma: supplementari, somma $180^\circ$.`, R`L'angolo cercato misura $180^\circ-72^\circ=108^\circ$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Un triangolo ha due lati di $6\ \text{cm}$ e $11\ \text{cm}$. Fra quali due valori deve stare la misura del terzo lato (in cm)? Estremi esclusi.`, suggerimenti: [R`Usa la disuguaglianza triangolare: ogni lato è minore della somma degli altri due, e maggiore della loro differenza.`, R`Calcola $11+6$ e $11-6$: il terzo lato sta strettamente fra questi due valori.`], risposta: { tipo: 'intervallo', da: 5, a: 17, chiusoDa: false, chiusoA: false }, soluzione: [R`Il terzo lato $x$ deve essere minore della somma degli altri due: $x < 11+6=17$.`, R`...e maggiore della loro differenza: $x > 11-6=5$.`, R`Quindi $5\ \text{cm} < x < 17\ \text{cm}$.`] },

    { id: 'es-05', difficolta: 1, testo: R`Quanto misura l'angolo interno di un esagono regolare (in gradi)?`, suggerimenti: [R`Prima trova la somma degli angoli interni di un poligono di $6$ lati: $(n-2)\cdot 180^\circ$.`, R`Poi dividi quella somma per il numero di angoli, perché nel poligono regolare sono tutti uguali.`], risposta: { tipo: 'numero', valore: 120 }, soluzione: [R`Somma degli angoli interni: $(6-2)\cdot 180^\circ=4\cdot 180^\circ=720^\circ$.`, R`Nell'esagono regolare gli angoli sono tutti congruenti: ciascuno misura $720^\circ:6=120^\circ$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Nel triangolo isoscele $ABC$ si ha $AB=AC$. Chiama $M$ il punto medio di $AB$ e $N$ quello di $AC$. Dimostra che le mediane $CM$ e $BN$ sono congruenti. Con quale criterio confronti i triangoli $MBC$ e $NCB$?`, suggerimenti: [R`Le due mediane stanno nei triangoli $MBC$ e $NCB$, che hanno il lato $BC$ in comune.`, R`$MB$ e $NC$ sono metà di lati congruenti. E gli angoli in $B$ e in $C$?`, R`Sono gli angoli alla base del triangolo isoscele: due lati e l'angolo compreso.`], risposta: crit('LAL'), soluzione: [R`Ipotesi: $AB=AC$, $M$ e $N$ punti medi. Tesi: $CM=BN$.`, R`$BC=CB$: lato in comune.`, R`$MB=NC$: sono le metà di $AB$ e di $AC$, che sono congruenti.`, R`$M\widehat{B}C=N\widehat{C}B$: sono gli angoli alla base del triangolo isoscele.`, R`Per LAL $MBC\cong NCB$, quindi i lati corrispondenti $CM$ e $BN$ sono congruenti.`] },

    { id: 'es-07', difficolta: 2, testo: R`Nel triangolo $ABC$ la bisettrice $AD$ dell'angolo in $A$ è anche altezza. Dimostra che il triangolo è isoscele. Con quale criterio confronti i triangoli $ABD$ e $ACD$?`, suggerimenti: [R`Che cosa sai degli angoli in $A$? E di quelli in $D$?`, R`I due angoli in $D$ sono retti, perché $AD$ è altezza. Il lato $AD$ è in comune.`, R`Un lato e i due angoli adiacenti a esso.`], risposta: crit('ALA'), soluzione: [R`Ipotesi: $AD$ è bisettrice e altezza. Tesi: $AB=AC$.`, R`$B\widehat{A}D=D\widehat{A}C$, perché $AD$ è la bisettrice.`, R`$A\widehat{D}B=A\widehat{D}C=90^\circ$, perché $AD$ è l'altezza.`, R`$AD$ è in comune, ed è il lato compreso fra i due angoli.`, R`Per ALA $ABD\cong ACD$, quindi $AB=AC$: il triangolo è isoscele.`] },

    { id: 'es-08', difficolta: 2, testo: R`Il quadrilatero $ABCD$ ha $AB=CD$ e $BC=DA$. Traccia la diagonale $AC$ e dimostra che $A\widehat{B}C=C\widehat{D}A$. Con quale criterio confronti i triangoli $ABC$ e $CDA$?`, suggerimenti: [R`Conta i lati congruenti dei due triangoli. Quale lato hanno in comune?`, R`$AB=CD$, $BC=DA$ e $AC$ in comune: tre lati.`], risposta: crit('LLL'), soluzione: [R`Ipotesi: $AB=CD$ e $BC=DA$. Tesi: $A\widehat{B}C=C\widehat{D}A$.`, R`Nei triangoli $ABC$ e $CDA$: $AB=CD$, $BC=DA$, e $AC$ è in comune.`, R`Per LLL $ABC\cong CDA$.`, R`Gli angoli $A\widehat{B}C$ e $C\widehat{D}A$ stanno di fronte al lato $AC$ in comune: sono corrispondenti, quindi congruenti.`] },

    { id: 'es-09', difficolta: 3, testo: R`Nel parallelogramma $ABCD$ chiama $M$ il punto medio di $AB$ e $N$ il punto medio di $CD$. Dimostra che $AMCN$ è un parallelogramma.`, suggerimenti: [R`Fra le condizioni per essere un parallelogramma ce n'è una con due soli lati.`, R`Guarda $AM$ e $NC$: stanno su due lati opposti del parallelogramma.`, R`Sono paralleli, e sono metà di lati congruenti.`], soluzione: [R`Ipotesi: $ABCD$ parallelogramma, $M$ e $N$ punti medi di $AB$ e $CD$. Tesi: $AMCN$ è un parallelogramma.`, R`$AM$ sta su $AB$ e $NC$ sta su $CD$. Siccome $AB\parallel CD$, anche $AM\parallel NC$.`, R`$AM=\frac{AB}{2}$ e $NC=\frac{CD}{2}$. Nel parallelogramma $AB=CD$, quindi $AM=NC$.`, R`Il quadrilatero $AMCN$ ha due lati opposti, $AM$ e $NC$, paralleli e congruenti: è un parallelogramma.`] },

    { id: 'es-10', difficolta: 2, testo: R`Nel triangolo $ABC$ l'angolo esterno in $A$ misura $128^\circ$, e l'angolo $\beta$ supera l'angolo $\gamma$ di $14^\circ$. Quanto misura $\gamma$, in gradi?`, suggerimenti: [R`L'angolo esterno in $A$ è la somma degli interni non adiacenti: $\beta+\gamma=128^\circ$.`, R`Scrivi $\beta=\gamma+14^\circ$ e sostituisci.`], risposta: gradi(57), soluzione: [R`Per il teorema dell'angolo esterno, $\beta+\gamma=128^\circ$.`, R`Con $\beta=\gamma+14^\circ$: $2\gamma+14^\circ=128^\circ$, quindi $2\gamma=114^\circ$ e $\gamma=57^\circ$.`, R`Controllo: $\beta=71^\circ$, $\alpha=180^\circ-128^\circ=52^\circ$, e $52^\circ+71^\circ+57^\circ=180^\circ$. ✓`] },

    { id: 'es-11', difficolta: 2, testo: R`Ogni angolo interno di un poligono regolare misura $156^\circ$. Quanti lati ha il poligono?`, suggerimenti: [R`Passa agli angoli esterni: ognuno fa $180^\circ$ con l'angolo interno.`, R`Gli angoli esterni sommano $360^\circ$ e sono tutti uguali.`], risposta: num(15), soluzione: [R`Ogni angolo esterno misura $180^\circ-156^\circ=24^\circ$.`, R`Gli angoli esterni sommano $360^\circ$: sono $360^\circ:24^\circ=15$.`, R`Il poligono ha $15$ lati. Controllo: $(15-2)\cdot180^\circ=2340^\circ$ e $2340^\circ:15=156^\circ$. ✓`] },

    { id: 'es-12', difficolta: 2, testo: R`Un triangolo isoscele ha due lati di $5$ cm e $12$ cm. Quanto misura il perimetro, in cm?`, suggerimenti: [R`Il terzo lato può essere $5$ oppure $12$ cm. Prova i due casi.`, R`Con la disuguaglianza triangolare scarta il caso impossibile.`], risposta: num(29), soluzione: [R`Lati $5$, $5$ e $12$: $5+5=10$, che è minore di $12$. Il triangolo non esiste.`, R`Lati $12$, $12$ e $5$: ogni lato è minore della somma degli altri due. Il triangolo esiste.`, R`Perimetro: $12+12+5=29$ cm.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cosa si intende per «ente primitivo» in geometria?`, opzioni: [R`Un termine che non si definisce, assunto come base della teoria`, R`Un termine definito a partire da altri più semplici`, R`Un teorema dimostrato molto spesso`, R`Un sinonimo di «postulato»`], corretta: 0, spiegazione: R`Punto, retta e piano non si definiscono con nozioni più semplici. Sono le basi su cui si costruisce la teoria. Un postulato è un'affermazione, non un termine.` },
    { id: 'q-02', domanda: R`A differenza di un teorema, un postulato…`, opzioni: [R`si dimostra a partire dagli assiomi`, R`si assume vero senza dimostrazione`, R`vale solo per alcune figure particolari`, R`è sempre conseguenza di un teorema`], corretta: 1, spiegazione: R`Il postulato è un punto di partenza, assunto vero; il teorema va invece dimostrato usando postulati e teoremi precedenti.` },
    { id: 'q-03', domanda: R`Che cosa serve, soprattutto, per dimostrare un teorema di geometria?`, opzioni: [R`Un disegno molto preciso, fatto con riga e squadra`, R`La conferma dell'insegnante o del libro di testo`, R`Un ragionamento che parte da fatti già accettati`, R`Il controllo su molti casi, con numeri diversi`], corretta: 2, spiegazione: R`Una dimostrazione è una deduzione logica, valida per ogni figura di quel tipo. Un disegno o qualche caso numerico mostrano solo degli esempi.` },
    { id: 'q-04', domanda: R`Due angoli complementari hanno somma…`, opzioni: [R`$360^\circ$`, R`$180^\circ$`, R`il doppio di uno dei due`, R`$90^\circ$`], corretta: 3, spiegazione: R`Complementari significa che la somma vale $90^\circ$; $180^\circ$ è invece la somma degli angoli supplementari.` },
    { id: 'q-05', domanda: R`Gli angoli opposti al vertice sono sempre…`, opzioni: [R`supplementari`, R`congruenti`, R`complementari`, R`uno il triplo dell'altro`], corretta: 1, spiegazione: R`Si formano quando due rette si incrociano, e sono sempre congruenti: non c'entrano supplementarità o complementarità in generale.` },
    { id: 'q-06', domanda: R`Un triangolo con almeno due lati congruenti si dice…`, opzioni: [R`scaleno`, R`rettangolo`, R`isoscele`, R`equilatero soltanto`], corretta: 2, spiegazione: R`Isoscele vuol dire almeno due lati congruenti: l'equilatero, con tre, ne è un caso particolare. Scaleno e rettangolo si riferiscono ad altro.` },
    { id: 'q-07', domanda: R`Quale terna di elementi congruenti NON garantisce la congruenza di due triangoli?`, opzioni: [R`I tre lati (LLL)`, R`Due lati e l'angolo compreso (LAL)`, R`Due angoli e il lato compreso (ALA)`, R`I tre angoli (AAA)`], corretta: 3, spiegazione: R`AAA garantisce solo la stessa forma (similitudine): due triangoli possono avere gli stessi angoli ed essere di grandezza diversa.` },
    { id: 'q-08', domanda: R`In ogni triangolo, un lato rispetto alla somma degli altri due è sempre…`, opzioni: [R`minore`, R`congruente`, R`maggiore`, R`il doppio`], corretta: 0, spiegazione: R`È la disuguaglianza triangolare. Se un lato fosse lungo quanto gli altri due messi in fila, o di più, il triangolo non si chiuderebbe.` },
    { id: 'q-09', domanda: R`La somma degli angoli interni di un poligono convesso di $n$ lati vale…`, opzioni: [R`$n \cdot 90^\circ$`, R`$360^\circ$ sempre`, R`$(n-2)\cdot 180^\circ$`, R`$180^\circ$ sempre`], corretta: 2, spiegazione: R`La formula generale è $(n-2)\cdot 180^\circ$: per $n=3$ dà $180^\circ$, per $n=4$ dà $360^\circ$, coerente con i casi noti.` },
    { id: 'q-10', domanda: R`In un parallelogramma, due angoli consecutivi (sullo stesso lato) sono sempre…`, opzioni: [R`congruenti`, R`opposti al vertice`, R`supplementari`, R`complementari`], corretta: 2, spiegazione: R`Angoli consecutivi in un parallelogramma sono supplementari (sommano $180^\circ$); gli angoli opposti, invece, sono quelli congruenti.` },
    { id: 'q-11', domanda: R`Due triangoli hanno due lati congruenti e un angolo congruente, che però non sta fra quei due lati. Che cosa si può dire?`, opzioni: [R`sono congruenti per il criterio LAL`, R`possono anche non essere congruenti`, R`sono congruenti per il criterio ALA`, R`sono congruenti per il criterio LLL`], corretta: 1, spiegazione: R`LAL chiede l'angolo **compreso** fra i due lati. Con l'angolo non compreso possono uscire due triangoli diversi. ALA e LLL chiedono altri elementi: due angoli, o tutti e tre i lati.` },
    { id: 'q-12', domanda: R`In un triangolo isoscele, la bisettrice dell'angolo al vertice è anche…`, opzioni: [R`la mediana, ma non l'altezza`, R`l'altezza, ma non la mediana`, R`parallela alla base`, R`mediana e altezza relative alla base`], corretta: 3, spiegazione: R`I due triangoli tagliati dalla bisettrice sono congruenti per LAL. Quindi divide la base a metà (mediana) e forma con lei due angoli retti (altezza).` },
    { id: 'q-13', domanda: R`Un angolo esterno di un triangolo è sempre uguale…`, opzioni: [R`alla somma dei due angoli interni non adiacenti`, R`all'angolo interno adiacente`, R`alla somma dei tre angoli interni`, R`alla differenza dei due interni non adiacenti`], corretta: 0, spiegazione: R`$\delta=\alpha+\beta$: si toglie $\gamma$ da $\gamma+\delta=180^\circ$ e da $\alpha+\beta+\gamma=180^\circ$. Con l'angolo interno adiacente, invece, l'esterno è supplementare.` },
    { id: 'q-14', domanda: R`Nel triangolo $ABC$ si sa che $AB>BC$. Quale disuguaglianza fra gli angoli è vera?`, opzioni: [R`$\alpha>\gamma$`, R`$\gamma>\alpha$`, R`$\beta>\gamma$`, R`$\alpha>\beta$`], corretta: 1, spiegazione: R`Di fronte ad $AB$ c'è l'angolo $\gamma$, in $C$. Di fronte a $BC$ c'è $\alpha$, in $A$. Al lato maggiore sta opposto l'angolo maggiore: $\gamma>\alpha$. Degli altri confronti, con questi dati, non si sa niente.` },
    { id: 'q-15', domanda: R`Quale condizione NON basta per dire che un quadrilatero convesso è un parallelogramma?`, opzioni: [R`le diagonali si tagliano a metà`, R`i lati opposti sono congruenti a due a due`, R`due lati opposti congruenti, gli altri due paralleli`, R`due lati opposti paralleli e congruenti`], corretta: 2, spiegazione: R`Il trapezio isoscele ha due lati opposti paralleli (le basi) e gli altri due congruenti, ma non è un parallelogramma. Le altre tre condizioni invece bastano.` },
    { id: 'q-16', domanda: R`Il segmento che unisce i punti medi di due lati di un triangolo…`, opzioni: [R`è perpendicolare al terzo lato e lungo la sua metà`, R`è lungo quanto il terzo lato, ma non è parallelo`, R`è parallelo al terzo lato e lungo un terzo di esso`, R`è parallelo al terzo lato e lungo la sua metà`], corretta: 3, spiegazione: R`È il teorema dei punti medi. Si dimostra prolungando il segmento fino al doppio: esce un parallelogramma con un lato uguale al terzo lato del triangolo.` },
    { id: 'q-17', domanda: R`Il luogo dei punti equidistanti dagli estremi di un segmento $AB$ è…`, opzioni: [R`l'asse del segmento $AB$`, R`la bisettrice di un angolo con vertice in $A$`, R`la retta parallela ad $AB$ per il suo punto medio`, R`la retta $AB$ stessa`], corretta: 0, spiegazione: R`L'asse, perpendicolare ad $AB$ nel punto medio, contiene tutti e soli i punti con $PA=PB$. La parallela per il punto medio no: i suoi punti sono più vicini a uno dei due estremi.` },
    { id: 'q-18', domanda: R`Quale proprietà ha sempre un trapezio isoscele?`, opzioni: [R`le diagonali si tagliano sempre a metà`, R`gli angoli sulla stessa base sono uguali`, R`le diagonali sono sempre perpendicolari`, R`gli angoli opposti sono sempre congruenti`], corretta: 1, spiegazione: R`Nel trapezio isoscele gli angoli adiacenti a ciascuna base sono congruenti, e le diagonali sono congruenti. Diagonali che si tagliano a metà e angoli opposti congruenti sono proprietà del parallelogramma.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`AAA (angoli congruenti) non è un criterio di congruenza: garantisce solo la stessa forma, non la stessa grandezza. Serve almeno un lato per parlare di congruenza.` },
    { tipo: 'errore', testo: R`Due lati e un angolo **non** compreso fra loro non sono un criterio. A volte escono due triangoli diversi.` },
    { tipo: 'metodo', testo: R`Prima di cominciare una dimostrazione, scrivi ipotesi e tesi. Accanto a ogni passaggio annota il motivo: ipotesi, costruzione o teorema.` },
    { tipo: 'metodo', testo: R`Per dimostrare che due segmenti o due angoli sono congruenti, cercali in due triangoli che puoi dimostrare congruenti. Poi sono elementi corrispondenti.` },
    { tipo: 'trucco', testo: R`Segna sulla figura i lati congruenti con i trattini e gli angoli congruenti con gli archetti. Spesso il criterio giusto salta all'occhio.` },
    { tipo: 'metodo', testo: R`Davanti a un problema di geometria disegna sempre la figura, anche approssimativa. Scrivi sopra i dati noti: così vedi subito quale teorema usare.` },
    { tipo: 'errore', testo: R`Nel secondo teorema dell'angolo esterno si sommano i due angoli interni **non** adiacenti. Con quello adiacente l'angolo esterno fa $180^\circ$.` },
    { tipo: 'errore', testo: R`Quattro lati congruenti fanno un rombo, non per forza un quadrato. Per il quadrato serve anche un angolo retto.` }
  ],

  aneddoti: [
    { matematico: 'Euclide di Alessandria', anni: 'circa 325–265 a.C.', titolo: "«Non c'è via regia per la geometria»", testo: R`Si sa pochissimo della vita di Euclide: nemmeno il luogo di nascita è certo. Ciò che ha attraversato i secoli è il suo libro, gli *Elementi*. Sono tredici libri che mettono in ordine deduttivo tutta la geometria greca e parte dell'aritmetica. Si parte da poche definizioni e cinque postulati. È rimasto il libro di geometria più usato al mondo per oltre duemila anni, fino al Novecento. Una tradizione racconta che il re Tolomeo I, faticando con la materia, gli chiese una scorciatoia. Euclide rispose: «Non c'è via regia per la geometria». Nemmeno un re può evitare la fatica del ragionamento. L'episodio è riportato secoli dopo da Proclo: va preso come aneddoto, non come fatto certo.`, legame: R`L'intero impianto di questo argomento (enti primitivi, postulati, dimostrazioni) è esattamente il metodo che Euclide ha fissato negli Elementi.` },

    { matematico: 'David Hilbert', anni: '1862–1943', titolo: 'Tavoli, sedie e boccali di birra', testo: R`Nel 1891 David Hilbert tornava da una conferenza sui fondamenti della geometria. Nella sala d'aspetto della stazione di Berlino disse una frase rimasta famosa. Al posto di «punti, rette, piani» si deve poter dire «tavoli, sedie, boccali di birra». Intendeva questo: in una dimostrazione conta solo quello che dicono i postulati, non l'immagine che hai in testa. Nel 1899 pubblicò i *Fondamenti della geometria*, dove rifece da capo il lavoro di Euclide. Trovò anche qualche punto debole negli *Elementi*. Euclide «dimostrava» il primo criterio di congruenza sovrapponendo i triangoli, ma nessun postulato parlava di spostare figure. Hilbert risolse il problema in modo netto: mise quel criterio, in una forma un po' ridotta, fra gli assiomi.`, legame: R`Il primo criterio, LAL, che in questa pagina non si dimostra, è proprio quello che Hilbert prese come assioma.` },

    { matematico: 'Pappo di Alessandria', anni: '290–350 d.C. circa', titolo: 'Il ponte degli asini', testo: R`Il teorema del triangolo isoscele è la proposizione 5 del primo libro degli *Elementi*. Euclide lo dimostra in modo faticoso: prolunga i due lati congruenti e confronta due coppie di triangoli. Nel Medioevo il teorema prese il soprannome di *pons asinorum*, il «ponte degli asini». Secondo una spiegazione, la figura con i prolungamenti ricordava un ponte. Secondo un'altra, era il ponte che gli studenti meno svegli non riuscivano ad attraversare. Molto prima, secondo il commento di Proclo, Pappo di Alessandria aveva trovato una scorciatoia. Confrontò il triangolo $ABC$ con se stesso, letto al contrario come $ACB$. Due lati e l'angolo compreso coincidono, quindi i due triangoli sono congruenti. E l'angolo in $B$ corrisponde a quello in $C$.`, legame: R`In questa pagina la stessa idea dimostra il teorema inverso del triangolo isoscele.` },

    { matematico: 'János Bolyai', anni: '1802–1860', titolo: 'La geometria che Gauss non pubblicò mai', testo: R`Per duemila anni i matematici avevano cercato di dimostrare il quinto postulato, quello delle parallele, a partire dagli altri quattro. Erano convinti che fosse una conseguenza, non un'ipotesi indipendente. Il padre di János Bolyai, Farkas, aveva passato la vita a inseguire quella dimostrazione, senza successo. Temeva che il figlio facesse la stessa fine. János, ufficiale dell'esercito ungherese, esplorò invece che cosa succede se si *nega* quel postulato. Ne uscì una geometria diversa ma coerente, senza contraddizioni. La pubblicò nel 1832, come appendice a un libro del padre. Quasi nello stesso periodo, in Russia, Nikolaj Lobačevskij arrivava per conto suo alle stesse conclusioni. Farkas mandò il lavoro del figlio a Carl Friedrich Gauss, sperando in un giudizio entusiasta. Gauss rispose che non poteva lodarlo: ci era arrivato lui stesso decenni prima. Non l'aveva mai pubblicato, per non attirarsi polemiche. La notizia, invece di consolare Bolyai, lo segnò profondamente.`, legame: R`Il quinto postulato, quello delle parallele, non segue dagli altri quattro. Negandolo nascono le geometrie non euclidee.` },

    { matematico: 'Pierre Varignon', anni: '1654–1722', titolo: 'Un teorema uscito dopo la morte', testo: R`Pierre Varignon era figlio di un costruttore di Caen e studiò per diventare prete. Si appassionò alla matematica leggendo gli *Elementi* di Euclide. A Parigi insegnò per più di trent'anni. Fu fra i primi in Francia a usare il calcolo di Leibniz, con cui era in corrispondenza. Il suo lavoro più importante riguarda la meccanica: come si compongono le forze, con la regola del parallelogramma. Il teorema che oggi porta il suo nome è molto più semplice. Unendo i punti medi dei lati di un quadrilatero qualunque si ottiene sempre un parallelogramma. Comparve solo nel 1731, nove anni dopo la sua morte, in un suo libro di elementi di matematica.`, legame: R`È il teorema del video sui punti medi, e si dimostra con il teorema dei punti medi di questa pagina.` }
  ]
});
})();
