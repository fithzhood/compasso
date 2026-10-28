(function () {
const R = String.raw;
/* allenamento. Le risposte si controllano con le funzioni vere di compasso.js:
   - el(…): elementi di un insieme, in ordine libero; si possono scrivere con le graffe, «{1; 3; 5}», o senza;
   - num(v): un numero (cardinalità, conteggi);
   - VF(true/false): valore di verità, «V», «vero», «vera»…
   Tutte le forme sono state provate con controllaRisposta, insieme alle sbagliate tipiche. */
const el = (...v) => ({ tipo: 'numeri', valori: v, segnaposto: 'es. 1; 5; 9', simboli: [';', '−', '{', '}'] });
const num = v => ({ tipo: 'numero', valore: v, tolleranza: 0.001, segnaposto: 'un numero', simboli: [] });
const VERO = ['v', 'vero', 'vera', 'è vera', 'e vera', 'è vero', 'true'];
const FALSO = ['f', 'falso', 'falsa', 'è falsa', 'e falsa', 'è falso', 'false'];
const VF = v => ({ tipo: 'testo', accettate: v ? VERO : FALSO, segnaposto: 'V oppure F', simboli: [] });

/* diagrammi di Venn sul piano (senza assi): A ha centro (−1,1; 0), B ha centro (1,1; 0), raggio 2;
   l'universo U è il rettangolo [−3,8; 3,8] × [−2,7; 2,7]. Le zone si colorano a pezzi con 'area' fra due archi:
   a sinistra di x = 0 il bordo di B sta dentro A, a destra il bordo di A sta dentro B. */
const UA = 'sqrt(4 - (x + 1.1)^2)', UB = 'sqrt(4 - (x - 1.1)^2)';
const neg = f => '-' + f;
const pz = (f, g, da, a) => ({ tipo: 'area', f, g, da, a, colore: 3 });
const SOLO_A = [pz(UA, neg(UA), -3.1, -0.9), pz(UA, UB, -0.9, 0), pz(neg(UB), neg(UA), -0.9, 0)];
const SOLO_B = [pz(UB, neg(UB), 0.9, 3.1), pz(UB, UA, 0, 0.9), pz(neg(UA), neg(UB), 0, 0.9)];
const LENTE = [pz(UB, neg(UB), -0.9, 0), pz(UA, neg(UA), 0, 0.9)];
const FUORI = [pz('2.7', '-2.7', -3.8, -3.1), pz('2.7', UA, -3.1, 0), pz(neg(UA), '-2.7', -3.1, 0),
  pz('2.7', UB, 0, 3.1), pz(neg(UB), '-2.7', 0, 3.1), pz('2.7', '-2.7', 3.1, 3.8)];
const CERCHI = [
  { tipo: 'cerchio', centro: [-1.1, 0], raggio: 2, colore: 1 },
  { tipo: 'cerchio', centro: [1.1, 0], raggio: 2, colore: 2 },
  { tipo: 'testo', p: [-2.7, 1.95], testo: 'A' }, { tipo: 'testo', p: [2.7, 1.95], testo: 'B' }
];
const UNIVERSO = [
  { tipo: 'poligono', punti: [[-3.8, -2.7], [3.8, -2.7], [3.8, 2.7], [-3.8, 2.7]], riempi: false, colore: 4 },
  { tipo: 'testo', p: [-3.45, 2.25], testo: 'U' }
];
const scritte = numeri => numeri.map(([t, x, y]) => ({ tipo: 'testo', p: [x, y], testo: String(t) }));
const venn = (zone, numeri, conU, didascalia) => ({ tipo: 'piano', x: [-4, 4], y: [-2.9, 2.9], assi: false, griglia: false, mirino: false,
  elementi: zone.concat(conU ? UNIVERSO : [], CERCHI, scritte(numeri)), didascalia });
/* U = {1, …, 10}, A = pari, B = multipli di 3: posto di ogni numero nella sua zona */
const DIECI = [[2, -2.4, 0.4], [4, -1.7, 0.4], [8, -2.4, -0.75], [10, -1.7, -0.75], [6, 0, -0.2],
  [3, 2.1, 0.4], [9, 2.1, -0.75], [1, -3.4, -2.25], [5, 0, -2.35], [7, 3.4, -2.25]];

/* diagramma a frecce: «x divide y» da A = {2, 3, 5} a B = {4, 6, 9, 10} */
const YA = { 2: 3, 3: 2, 5: 1 }, YB = { 4: 3.5, 6: 2.5, 9: 1.5, 10: 0.5 };
const FRECCE = [[2, 4], [2, 6], [2, 10], [3, 6], [3, 9], [5, 10]];

/* divisori di 12 ordinati da «divide»: da a si sale a b lungo le linee quando a divide b */
const POS12 = { 1: [0, 0], 2: [-1, 1], 3: [1, 1], 4: [-2, 2], 6: [0, 2], 12: [-1, 3] };
const LATI12 = [[1, 2], [1, 3], [2, 4], [2, 6], [3, 6], [4, 12], [6, 12]];

COMPASSO.registra({
  id: 'insiemi-logica',
  titolo: 'Insiemi e logica',

  introduzione: R`In un negozio online scegli il filtro «taglia M» e poi il filtro «colore blu». Restano solo le magliette che hanno **tutte e due** le proprietà. Senza saperlo, hai fatto l'intersezione di due insiemi e hai usato il connettivo «e».

Un **insieme** raccoglie oggetti che hanno qualcosa in comune: numeri, persone, punti. La **logica** studia le frasi che sono vere o false, e come si combinano con «non», «e», «o», «se… allora». Le due cose si somigliano molto. Ogni proprietà individua un insieme: quello degli oggetti che la rendono vera.

Sono il linguaggio di tutta la matematica che viene dopo. Le soluzioni di una disequazione formano un insieme, e anche il dominio di una funzione. Un teorema è quasi sempre un «se… allora». Per cominciare basta saper contare e conoscere i numeri naturali.`,

  inBreve: [
    R`Un insieme è ben definito quando, per ogni oggetto, si può dire con certezza se ci sta oppure no.`,
    R`$\in$ lega un elemento a un insieme, $\subseteq$ lega due insiemi: $2 \in \{1, 2\}$, ma $\{2\} \subseteq \{1, 2\}$.`,
    R`Intersezione: gli elementi che stanno in **tutti e due** gli insiemi. Unione: quelli che stanno in **almeno uno**.`,
    R`Una relazione riflessiva, simmetrica e transitiva è di equivalenza: divide l'insieme in classi separate, cioè in una partizione.`,
    R`$p \Rightarrow q$ è falsa in un caso solo: quando $p$ è vera e $q$ è falsa.`,
    R`Per negare «tutti sono…» basta dire «almeno uno non è…». Per smentire una frase con «per ogni» basta un controesempio.`
  ],

  sezioni: [
    { id: 'insiemi', titolo: 'Gli insiemi e come si descrivono', testo: R`In matematica un **insieme** è una raccolta di oggetti, che si chiamano **elementi**. Serve però un criterio sicuro. Per ogni oggetto si deve poter dire se appartiene all'insieme oppure no.

«I numeri pari minori di $10$» è un insieme: lo $0$ ci sta, il $7$ no. «I film belli» invece non lo è. Su un film le opinioni possono essere diverse.

>* Se $x$ è un elemento di $A$ si scrive $x \in A$, e si legge «$x$ appartiene ad $A$». Se non lo è si scrive $x \notin A$.

Gli insiemi si indicano con le lettere maiuscole. Ci sono tre modi per descriverli.

- **Per elencazione.** Si scrivono gli elementi fra parentesi graffe, separati da virgole. Le vocali sono $V = \{a, e, i, o, u\}$.
- **Con la proprietà caratteristica.** Si scrive la regola che hanno tutti gli elementi, e solo loro. Per esempio $P = \{x \in \mathbb{N} \mid x \text{ è pari e } x < 10\}$.
- **Con un diagramma di Venn.** Una linea chiusa: gli elementi stanno dentro, gli altri oggetti fuori.

La scrittura di $P$ si legge così: «l'insieme degli $x$ naturali tali che $x$ è pari e minore di $10$». Il rettangolo del disegno è l'insieme $U$ di tutti gli oggetti di cui si parla.

[[grafico:vennUno]]

L'elencazione va bene per gli insiemi piccoli. Per un insieme infinito, come quello dei numeri pari, serve la proprietà. Nell'elenco l'ordine non conta e ogni elemento si scrive una volta sola: $\{1, 2, 3\}$ e $\{3, 1, 2\}$ sono lo stesso insieme.

L'insieme senza elementi si chiama **insieme vuoto** e si scrive $\varnothing$. Per esempio, nessun naturale risolve $x + 5 = 3$: l'insieme delle soluzioni è $\varnothing$.

Il numero di elementi di un insieme finito è la sua **cardinalità**, e si scrive $|A|$. Per le vocali vale $|V| = 5$.

?? Quale di queste frasi descrive un insieme?
[ ] Le canzoni più famose del 2020.
[x] I numeri naturali che dividono $15$.
[ ] I numeri molto grandi.
=> I divisori di $15$ sono $1$, $3$, $5$ e $15$: per ogni numero si sa se ci sta. «Famose» e «molto grandi» dipendono da chi giudica.

>! $\varnothing$ e $\{0\}$ non sono la stessa cosa. $\{0\}$ ha un elemento, lo zero. $\varnothing$ non ne ha nessuno.` },

    { id: 'sottoinsiemi', titolo: 'Sottoinsiemi e insieme delle parti', testo: R`Prendi $A = \{1, 2, 3, 4, 6, 12\}$, i divisori di $12$, e $B = \{1, 2, 3, 6\}$, i divisori di $6$. Ogni elemento di $B$ sta anche in $A$.

>* $B$ è un **sottoinsieme** di $A$ se ogni elemento di $B$ appartiene anche ad $A$. Si scrive $B \subseteq A$, e si dice che $B$ è **contenuto** in $A$.

[[grafico:vennSotto]]

Nel diagramma il cerchio di $B$ sta tutto dentro quello di $A$. Se in $A$ c'è almeno un elemento che manca a $B$, allora $B$ è un **sottoinsieme proprio**. Si scrive $B \subset A$, e il simbolo $\subset$ si legge «è contenuto strettamente in». Qui è così, perché $4$ e $12$ stanno solo in $A$. Per lo stesso motivo $\mathbb{N} \subset \mathbb{Z}$.

> Attenzione ai libri: molti usano $\subset$ anche per l'inclusione larga, al posto di $\subseteq$. Guarda sempre come il libro definisce il simbolo.

Ogni insieme $A$ ha sempre due sottoinsiemi: $\varnothing$ e $A$ stesso. Si chiamano sottoinsiemi **impropri**. Due insiemi sono **uguali** quando ognuno è contenuto nell'altro, cioè quando hanno gli stessi elementi.

### L'insieme delle parti

L'insieme di **tutti** i sottoinsiemi di $A$ si chiama **insieme delle parti**, e si scrive $\mathcal{P}(A)$. Per $A = \{a, b, c\}$ i sottoinsiemi sono questi.

| quanti elementi | sottoinsiemi |
|---|---|
| $0$ | $\varnothing$ |
| $1$ | $\{a\}$, $\{b\}$, $\{c\}$ |
| $2$ | $\{a, b\}$, $\{a, c\}$, $\{b, c\}$ |
| $3$ | $\{a, b, c\}$ |

In tutto sono $8$. Perché? Per costruire un sottoinsieme decidi, elemento per elemento, se prenderlo o lasciarlo. Le scelte possibili sono $2 \cdot 2 \cdot 2 = 8$.

>* Se $A$ ha $n$ elementi, $\mathcal{P}(A)$ ne ha $2^n$.

?? $A = \{1, 2, 3\}$. Quale scrittura è **sbagliata**?
[ ] $1 \in A$
[x] $1 \subseteq A$
[ ] $\{1\} \subseteq A$
[ ] $\varnothing \subseteq A$
=> $1$ è un elemento, non un insieme: si scrive $1 \in A$. A sinistra di $\subseteq$ ci vuole un insieme, come $\{1\}$. E $\varnothing$ è un sottoinsieme di ogni insieme.

>! $\in$ collega un elemento a un insieme. $\subseteq$ collega due insiemi. I due simboli non si scambiano.` },

    { id: 'unione-intersezione', titolo: 'Unione e intersezione', testo: R`Quali numeri dividono sia $12$ sia $18$? Metti i divisori in due insiemi: $A = \{1, 2, 3, 4, 6, 12\}$ e $B = \{1, 2, 3, 6, 9, 18\}$.

[[video:insiemi-logica/venn]]

>* L'**intersezione** $A \cap B$ è l'insieme degli elementi che stanno in $A$ **e** in $B$. L'**unione** $A \cup B$ è l'insieme degli elementi che stanno in $A$ **o** in $B$, cioè in almeno uno dei due.

[[grafico:vennInter]]

Qui $A \cap B = \{1, 2, 3, 6\}$. Sono i divisori comuni, e il più grande, $6$, è il MCD. L'unione è $A \cup B = \{1, 2, 3, 4, 6, 9, 12, 18\}$. Gli elementi comuni si scrivono una volta sola.

Quanti elementi ha l'unione? Se sommi $|A| + |B| = 6 + 6$, gli elementi comuni li conti due volte. Allora li togli una volta.

$$|A \cup B| = |A| + |B| - |A \cap B|$$

Qui $6 + 6 - 4 = 8$.

Se $A \cap B = \varnothing$, i due insiemi si dicono **disgiunti**. In quel caso non c'è niente da togliere: $|A \cup B|$ è la somma di $|A|$ e $|B|$ e basta.

> Unione e intersezione non dipendono dall'ordine: $A \cap B = B \cap A$ e $A \cup B = B \cup A$. Con tre insiemi si possono anche raggruppare come si vuole: $(A \cup B) \cup C = A \cup (B \cup C)$.

?? $A = \{2, 4, 6\}$ e $B = \{1, 3, 5\}$. Che cos'è $A \cap B$?
[ ] $\{0\}$
[x] $\varnothing$
[ ] $\{1, 2, 3, 4, 5, 6\}$
=> Nessun numero sta in tutti e due: l'intersezione è vuota, e $A$ e $B$ sono disgiunti. $\{1, 2, 3, 4, 5, 6\}$ è l'unione. $\{0\}$ non è vuoto, perché contiene lo zero.

>! Nell'unione «o» vuol dire «almeno uno dei due». Gli elementi comuni ci stanno anche loro, una volta sola.

> Le stesse operazioni tornano altrove. In probabilità $A \cup B$ è l'evento «$A$ oppure $B$». In un sistema di disequazioni le soluzioni sono l'intersezione degli intervalli.` },

    { id: 'differenza-complementare', titolo: 'Differenza e complementare', testo: R`Spesso si lavora dentro un insieme fissato, l'**insieme universo** $U$. Qui $U = \{1, 2, \dots, 10\}$, poi $A = \{2, 4, 6, 8, 10\}$ sono i pari e $B = \{3, 6, 9\}$ i multipli di $3$.

>* La **differenza** $A \setminus B$ è l'insieme degli elementi di $A$ che **non** stanno in $B$. Il **complementare** di $A$ è $\overline{A} = U \setminus A$: gli elementi di $U$ che non stanno in $A$.

[[grafico:vennDiff]]

Qui $A \setminus B = \{2, 4, 8, 10\}$. Dai pari hai tolto il $6$, che è anche multiplo di $3$. Invece $B \setminus A = \{3, 9\}$. Nella differenza l'ordine conta.

[[grafico:vennCompl]]

Il complementare dei pari è l'insieme dei dispari: $\overline{A} = \{1, 3, 5, 7, 9\}$. Il complementare dipende da $U$. Se l'universo fosse $\mathbb{N}$, $\overline{A}$ conterrebbe tutti i numeri dispari.

Una differenza si scrive anche con il complementare: $A \setminus B = A \cap \overline{B}$. Sono gli elementi che stanno in $A$ **e** non in $B$.

### Le leggi di De Morgan

Il complementare scambia l'unione con l'intersezione.

$$\overline{A \cup B} = \overline{A} \cap \overline{B} \qquad \overline{A \cap B} = \overline{A} \cup \overline{B}$$

Controlla con i numeri. $A \cup B = \{2, 3, 4, 6, 8, 9, 10\}$, quindi $\overline{A \cup B} = \{1, 5, 7\}$. Anche $\overline{A} \cap \overline{B}$ dà $\{1, 5, 7\}$: i numeri che non sono né pari né multipli di $3$.

>! Il complementare di un'intersezione **non** è l'intersezione dei complementari. Il simbolo si capovolge: $\cap$ diventa $\cup$.

?? Con gli insiemi $U$ e $B$ di questa sezione, quanti elementi ha $\overline{B}$?
=> Sette. $U$ ha $10$ elementi e $B$ ne ha $3$, quindi $\overline{B}$ ne ha $10 - 3 = 7$.` },

    { id: 'cartesiano-partizioni', titolo: 'Prodotto cartesiano e partizioni', testo: R`Una maglietta si vende in tre taglie e in due colori. Le taglie $T = \{S, M, L\}$ e i colori $C = \{\text{rosso}, \text{blu}\}$ formano due insiemi. Ogni modello è una **coppia**: prima la taglia, poi il colore.

| | rosso | blu |
|---|---|---|
| **S** | (S; rosso) | (S; blu) |
| **M** | (M; rosso) | (M; blu) |
| **L** | (L; rosso) | (L; blu) |

>* Il **prodotto cartesiano** $A \times B$ è l'insieme di tutte le **coppie ordinate** $(a; b)$, con $a \in A$ e $b \in B$. Se $|A| = m$ e $|B| = n$, allora $|A \times B| = m \cdot n$.

I modelli di maglietta sono $3 \cdot 2 = 6$. In una coppia ordinata l'ordine conta: $(1; 2) \ne (2; 1)$. Per questo, di solito, $A \times B \ne B \times A$.

Con due insiemi di numeri, $A \times B$ si disegna sul piano. Gli elementi di $A$ vanno sull'asse orizzontale, quelli di $B$ sull'asse verticale. Con $A = \{1, 2, 3\}$ e $B = \{1, 2\}$ ottieni $6$ punti.

[[grafico:cartesiano]]

Il piano cartesiano intero è $\mathbb{R} \times \mathbb{R}$, che si scrive anche $\mathbb{R}^2$. Ogni punto è una coppia di numeri reali.

### Le partizioni

>* Una **partizione** di $A$ divide $A$ in sottoinsiemi. Nessuno è **vuoto**, due di loro non hanno **mai elementi in comune**, e insieme danno **tutto $A$**.

I dispari $\{1, 3, 5\}$ e i pari $\{2, 4\}$ formano una partizione di $\{1, 2, 3, 4, 5\}$. Succede lo stesso quando una classe si divide in squadre: ogni studente sta in una squadra, e in una sola.

>! $\{1, 2\}$ e $\{2, 3\}$ non sono una partizione di $\{1, 2, 3\}$, perché il $2$ sta in due pezzi. Anche $\{1\}$ e $\{3\}$ non lo sono, perché il $2$ resta fuori.

?? Quale di queste è una partizione di $\mathbb{Z}$?
[x] I negativi, $\{0\}$ e i positivi.
[ ] I negativi e i positivi.
[ ] I pari, i dispari e $\{0\}$.
=> Ogni intero sta in uno solo dei tre pezzi. Con i soli negativi e positivi lo zero resta fuori. Con pari, dispari e $\{0\}$ lo zero sta in due pezzi, perché è pari.` },

    { id: 'relazioni', titolo: 'Le relazioni e le loro proprietà', testo: R`Prendi $A = \{2, 3, 5\}$ e $B = \{4, 6, 9, 10\}$. Collega ogni numero di $A$ ai numeri di $B$ che divide. Ottieni sei coppie: $(2; 4)$, $(2; 6)$, $(2; 10)$, $(3; 6)$, $(3; 9)$, $(5; 10)$.

>* Una **relazione** $\mathcal{R}$ da $A$ a $B$ è un sottoinsieme di $A \times B$: dice quali coppie sono collegate. Se $(a; b) \in \mathcal{R}$ si scrive $a \mathrel{\mathcal{R}} b$.

Una relazione si può dare con l'elenco delle coppie, con i punti sul piano o con un **diagramma a frecce**. Nel diagramma c'è una freccia da $a$ a $b$ per ogni coppia.

[[grafico:frecce]]

> Una **funzione** è una relazione speciale: da ogni elemento di $A$ parte **una e una sola** freccia. Questa relazione non è una funzione, perché dal $2$ partono tre frecce.

Spesso la relazione lega elementi dello **stesso** insieme $A$. Allora contano quattro proprietà.

- **Riflessiva**: ogni elemento è in relazione con se stesso, $a \mathrel{\mathcal{R}} a$.
- **Simmetrica**: se $a \mathrel{\mathcal{R}} b$, allora $b \mathrel{\mathcal{R}} a$. Ogni freccia ha quella di ritorno.
- **Transitiva**: se $a \mathrel{\mathcal{R}} b$ e $b \mathrel{\mathcal{R}} c$, allora $a \mathrel{\mathcal{R}} c$. Ogni percorso di due frecce ha la sua scorciatoia.
- **Antisimmetrica**: $a \mathrel{\mathcal{R}} b$ e $b \mathrel{\mathcal{R}} a$ insieme succedono solo se $a = b$. Fra due elementi diversi non c'è mai andata e ritorno.

Fra le persone, «è più alto di» è transitiva, ma non è riflessiva né simmetrica. «È amico di» è simmetrica, ma non transitiva: gli amici dei tuoi amici non sono per forza tuoi amici.

Su un insieme piccolo una relazione si legge bene in una tabella. Qui la relazione è «divide» su $\{1, 2, 3, 4\}$: il segno ✓ dice che il numero della riga divide quello della colonna.

| divide | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **1** | ✓ | ✓ | ✓ | ✓ |
| **2** | · | ✓ | · | ✓ |
| **3** | · | · | ✓ | · |
| **4** | · | · | · | ✓ |

La diagonale è tutta piena: la relazione è riflessiva. Fuori dalla diagonale i segni ✓ non sono mai simmetrici: è antisimmetrica. Ed è transitiva, perché se $a$ divide $b$ e $b$ divide $c$, allora $a$ divide $c$.

?? Su $\mathbb{N}$, la relazione «$a < b$» è…
[ ] riflessiva.
[ ] simmetrica.
[x] transitiva.
=> Se $a < b$ e $b < c$, allora $a < c$. Non è riflessiva, perché $3 < 3$ è falso. Non è simmetrica, perché da $2 < 5$ non segue $5 < 2$.

>! Per dire che una proprietà **non** vale basta un controesempio. Per dire che vale bisogna ragionare su **tutti** i casi.` },

    { id: 'equivalenza-ordine', titolo: 'Relazioni di equivalenza e d\'ordine', testo: R`Le frazioni $\dfrac{1}{2}$, $\dfrac{2}{4}$ e $\dfrac{3}{6}$ sono scritte in modo diverso, ma valgono lo stesso numero. Sono frazioni **equivalenti**. In generale $\dfrac{a}{b}$ e $\dfrac{c}{d}$ lo sono se $a \cdot d = b \cdot c$.

[[video:insiemi-logica/equivalenza]]

>* Una relazione riflessiva, simmetrica e transitiva si chiama **relazione di equivalenza**. La **classe di equivalenza** di $a$ è l'insieme degli elementi in relazione con $a$, e si scrive $[a]$.

«Essere equivalenti» è una relazione di equivalenza fra le frazioni. La classe di $\dfrac{1}{2}$ contiene $\dfrac{2}{4}$, $\dfrac{3}{6}$, $\dfrac{4}{8}$, e così via. Disegna la frazione $\dfrac{a}{b}$ come punto $(b; a)$, con $b > 0$. Allora ogni classe sta su una semiretta che parte dall'origine.

[[grafico:classi]]

Due classi diverse non hanno elementi in comune, e ogni elemento sta in una classe. Quindi le classi formano una **partizione**. Ogni classe di frazioni è un numero razionale.

Un altro esempio, in $\mathbb{N}$: «ha lo stesso resto nella divisione per $3$». Le classi sono tre.

- Resto $0$: $\{0, 3, 6, 9, \dots\}$.
- Resto $1$: $\{1, 4, 7, 10, \dots\}$.
- Resto $2$: $\{2, 5, 8, 11, \dots\}$.

### Le relazioni d'ordine

>* Una relazione riflessiva, **antisimmetrica** e transitiva si chiama **relazione d'ordine**.

L'esempio tipico è $\le$ fra i numeri. Due numeri si confrontano sempre: l'ordine è **totale**. Anche «divide» è una relazione d'ordine, ma lascia coppie senza confronto. Né $2$ divide $3$, né $3$ divide $2$: l'ordine è **parziale**.

Nel disegno ci sono i divisori di $12$. Da $a$ si sale a $b$ lungo le linee quando $a$ divide $b$.

[[grafico:hasse]]

> La relazione $<$ non è riflessiva: si chiama ordine **stretto**.

>! «Antisimmetrica» non vuol dire «non simmetrica». L'uguaglianza $a = b$ è simmetrica e antisimmetrica insieme.

?? In una classe, «è nato nello stesso mese di» è una relazione di equivalenza. Quante classi di equivalenza ci sono, al massimo?
=> Dodici, una per ogni mese. Se in un mese non è nato nessuno, le classi sono meno: una classe di equivalenza non è mai vuota.` },

    { id: 'proposizioni-connettivi', titolo: 'Proposizioni e connettivi', testo: R`In logica una **proposizione** è una frase di cui si può dire se è vera o falsa. «$7$ è un numero primo» è vera. «Roma è in Francia» è falsa. «Chiudi la porta!» non è una proposizione, e nemmeno «Che bel tramonto».

>* Ogni proposizione ha un **valore di verità**: V (vera) oppure F (falsa). I **connettivi** costruiscono proposizioni nuove a partire da altre.

Le proposizioni si indicano con lettere minuscole, come $p$ e $q$.

| connettivo | simbolo | è vera quando… |
|---|---|---|
| non | $\neg p$ | $p$ è falsa |
| e | $p \wedge q$ | sono vere **tutte e due** |
| o | $p \vee q$ | è vera **almeno una** |
| o esclusivo | $p \mathbin{\dot{\vee}} q$ | è vera **una sola** |

Molti libri scrivono la negazione $\overline{p}$. La **tavola di verità** elenca tutti i casi possibili. Con due proposizioni i casi sono $4$.

| $p$ | $q$ | $\neg p$ | $p \wedge q$ | $p \vee q$ | $p \mathbin{\dot{\vee}} q$ |
|---|---|---|---|---|---|
| V | V | F | V | V | F |
| V | F | F | F | V | V |
| F | V | V | F | V | V |
| F | F | V | F | F | F |

L'«o» della matematica è **inclusivo**. «Studio o ascolto musica» è vera anche se faccio tutte e due le cose. I latini distinguevano *vel*, inclusivo, da *aut*, esclusivo.

Connettivi e insiemi si corrispondono: «e» è l'intersezione, «o» è l'unione, «non» è il complementare.

### Tautologie e leggi di De Morgan

Una **tautologia** è sempre vera, qualunque valore abbiano le proposizioni: per esempio $p \vee \neg p$, «piove o non piove». Una **contraddizione** è sempre falsa, come $p \wedge \neg p$. Due proposizioni con la stessa colonna nella tavola sono **equivalenti**, e si scrive $\equiv$.

$$\neg(p \wedge q) \equiv \neg p \vee \neg q \qquad \neg(p \vee q) \equiv \neg p \wedge \neg q$$

Sono le leggi di De Morgan. «Non è vero che ho studiato e capito» vuol dire «non ho studiato **oppure** non ho capito».

>! Negando, «e» diventa «o» e viceversa. La negazione di «$x > 2$ e $x < 5$» è «$x \le 2$ o $x \ge 5$».

?? $p$ è «$4$ è pari», $q$ è «$4$ è primo». Quale proposizione è vera?
[ ] $p \wedge q$
[x] $p \mathbin{\dot{\vee}} q$
[ ] $\neg p \vee q$
[ ] $\neg(p \vee q)$
=> $p$ è vera e $q$ è falsa. È vera esattamente una delle due, quindi $p \mathbin{\dot{\vee}} q$ è vera. $p \wedge q$ chiede tutte e due vere. In $\neg p \vee q$ sono false tutte e due le parti. E $p \vee q$ è vera, quindi la sua negazione è falsa.` },

    { id: 'implicazione-quantificatori', titolo: 'Implicazione e quantificatori', testo: R`«Se piove, prendo l'ombrello.» È una promessa del tipo «se $p$, allora $q$». Qui $p$ è «piove» e $q$ è «prendo l'ombrello».

[[video:insiemi-logica/implicazione]]

>* L'**implicazione** $p \Rightarrow q$, «se $p$, allora $q$», è falsa solo quando $p$ è vera e $q$ è falsa. In tutti gli altri casi è vera.

| $p$ | $q$ | $p \Rightarrow q$ | $p \Leftrightarrow q$ |
|---|---|---|---|
| V | V | V | V |
| V | F | F | F |
| F | V | V | F |
| F | F | V | V |

Se non piove, la promessa non è tradita, qualunque cosa io faccia. Che da una premessa falsa segua qualunque cosa è una **scelta dei matematici**. All'inizio sembra strana, ma serve.

Prendi «se $n$ è multiplo di $4$, allora $n$ è pari». Deve essere vera per ogni $n$, anche per $n = 7$. Con $n = 7$ l'ipotesi è falsa. Se in quel caso l'implicazione fosse falsa, la regola non varrebbe più per tutti gli $n$.

Per la stessa scelta, «se $2 + 2 = 5$, allora Roma è in Francia» è vera. È un esempio strano, che non dice niente di utile: l'ipotesi non succede mai.

In pratica $p \Rightarrow q$ dice «$p$ è falsa, oppure $q$ è vera». In simboli $p \Rightarrow q \equiv \neg p \vee q$, come si vede confrontando le colonne della tavola.

$p$ si chiama **ipotesi** e $q$ **tesi**. Si dice anche che $p$ è condizione **sufficiente** per $q$, e $q$ è condizione **necessaria** per $p$.

La **doppia implicazione** $p \Leftrightarrow q$ si legge «$p$ se e solo se $q$». È vera quando $p$ e $q$ hanno lo stesso valore. Equivale a $(p \Rightarrow q) \wedge (q \Rightarrow p)$.

>! $p \Rightarrow q$ non dà $q \Rightarrow p$. «Se un numero è multiplo di $4$, allora è pari» è vera. «Se è pari, allora è multiplo di $4$» è falsa: guarda il $6$. È equivalente invece la **contronominale** $\neg q \Rightarrow \neg p$: «se non è pari, non è multiplo di $4$».

### I quantificatori

«$x > 3$» non è una proposizione: dipende da $x$. È un **predicato**, e diventa vero o falso quando scegli $x$. Le $x$ che lo rendono vero formano il suo **insieme di verità**.

>* $\forall$ si legge «per ogni», $\exists$ si legge «esiste almeno un». $\forall x \in \mathbb{R},\ x^2 \ge 0$ è vera. $\exists x \in \mathbb{N} : x + 5 = 3$ è falsa.

[[video:insiemi-logica/negare]]

Per smentire «tutti i gatti sono neri» basta un gatto che non è nero. Quindi la negazione è «almeno un gatto non è nero», e **non** «nessun gatto è nero». Negando, $\forall$ diventa $\exists$, e la proprietà si nega.

$$\neg(\forall x,\ P(x)) \equiv \exists x : \neg P(x)$$

$$\neg(\exists x : P(x)) \equiv \forall x,\ \neg P(x)$$

?? Qual è la negazione di «ogni numero primo è dispari»?
[ ] Ogni numero primo è pari.
[ ] Nessun numero primo è dispari.
[x] Esiste un numero primo pari.
=> Basta un controesempio: il $2$ è primo ed è pari. Quindi la frase di partenza è falsa e la sua negazione è vera. «Ogni primo è pari» e «nessun primo è dispari» sono false anche loro.` }
  ],

  grafici: {
    vennUno: { tipo: 'piano', x: [-4, 4], y: [-2.9, 2.9], assi: false, griglia: false, mirino: false,
      elementi: UNIVERSO.concat([
        { tipo: 'cerchio', centro: [-0.9, 0], raggio: 2, colore: 1, riempi: true },
        { tipo: 'testo', p: [-2.6, 1.95], testo: 'V' }
      ], scritte([['a', -1.7, 0.45], ['e', -0.9, 0.95], ['i', -0.1, 0.45], ['o', -1.4, -0.75], ['u', -0.4, -0.75],
        ['b', 2.0, 1.5], ['m', 2.9, 0.3], ['r', 1.8, -0.6], ['t', 3.0, -1.6], ['z', 1.6, -2.0]])),
      didascalia: 'V = {a, e, i, o, u}, l\'insieme delle vocali, dentro l\'universo U delle lettere dell\'alfabeto. Le vocali stanno dentro la linea, le consonanti fuori.' },
    vennSotto: { tipo: 'piano', x: [-3.4, 3], y: [-2.7, 2.7], assi: false, griglia: false, mirino: false,
      elementi: [
        { tipo: 'cerchio', centro: [-0.3, 0], raggio: 2.4, colore: 1 },
        { tipo: 'cerchio', centro: [0.45, -0.15], raggio: 1.25, colore: 2, riempi: true },
        { tipo: 'testo', p: [-2.4, 2.1], testo: 'A' }, { tipo: 'testo', p: [1.65, 1.0], testo: 'B' }
      ].concat(scritte([[1, 0.05, 0.3], [2, 0.85, 0.3], [3, 0.05, -0.75], [6, 0.85, -0.75], [4, -1.6, 0.4], [12, -1.6, -0.8]])),
      didascalia: 'B = {1, 2, 3, 6}, i divisori di 6, è contenuto in A = {1, 2, 3, 4, 6, 12}, i divisori di 12: B ⊂ A. I numeri 4 e 12 stanno in A ma non in B.' },
    vennInter: venn(LENTE, [[4, -2.2, 0.4], [12, -2.2, -0.75], [1, -0.32, 0.4], [2, 0.32, 0.4], [3, -0.32, -0.75], [6, 0.32, -0.75], [9, 2.2, 0.4], [18, 2.2, -0.75]], false,
      'A = divisori di 12, B = divisori di 18. In verde l\'intersezione A ∩ B = {1, 2, 3, 6}, i divisori comuni. L\'unione A ∪ B è tutto quello che sta dentro i due cerchi: 8 numeri.'),
    vennDiff: venn(SOLO_A, DIECI, true,
      'U = {1, …, 10}, A = pari, B = multipli di 3. In verde la differenza A \\ B = {2, 4, 8, 10}: i pari che non sono multipli di 3.'),
    vennCompl: venn(FUORI.concat(SOLO_B), DIECI, true,
      'Stessi insiemi. In verde il complementare di A: tutto quello che in U sta fuori dal cerchio A, cioè i dispari {1, 3, 5, 7, 9}.'),
    cartesiano: { tipo: 'piano', x: [-0.5, 4], y: [-0.5, 3], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      punti: [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2]].map(([x, y]) => ({ x, y, etichetta: '(' + x + '; ' + y + ')', posizione: 'alto', colore: 1 })),
      didascalia: 'A × B con A = {1, 2, 3} sull\'asse orizzontale e B = {1, 2} su quello verticale: 3 · 2 = 6 coppie, cioè 6 punti.' },
    frecce: { tipo: 'piano', x: [-1.3, 5.3], y: [-0.5, 5.1], assi: false, griglia: false, mirino: false,
      elementi: [
        { tipo: 'ellisse', centro: [0, 2], a: 0.8, b: 1.8, colore: 1 },
        { tipo: 'ellisse', centro: [4, 2], a: 0.8, b: 2.4, colore: 2 },
        { tipo: 'testo', p: [0, 4.15], testo: 'A' }, { tipo: 'testo', p: [4, 4.75], testo: 'B' }
      ].concat(FRECCE.map(([a, b]) => ({ tipo: 'segmento', da: [0.15, YA[a]], a: [3.78, YB[b]], freccia: true, colore: 3 })),
        Object.keys(YA).map(k => ({ tipo: 'punto', p: [0, YA[k]], etichetta: k, posizione: 'sinistra', colore: 1 })),
        Object.keys(YB).map(k => ({ tipo: 'punto', p: [4, YB[k]], etichetta: k, posizione: 'destra', colore: 2 }))),
      didascalia: 'La relazione «x divide y» da A = {2, 3, 5} a B = {4, 6, 9, 10}: una freccia per ogni coppia. Dal 2 partono tre frecce.' },
    classi: { tipo: 'piano', x: [-0.4, 7], y: [-0.4, 4.6], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      etichette: { x: 'denominatore', y: 'numeratore' },
      funzioni: [
        { f: '2x/3', colore: 2, tratteggio: true, dominio: [0, 6.9] },
        { f: 'x/2', colore: 1, tratteggio: true, dominio: [0, 7] },
        { f: 'x/3', colore: 3, tratteggio: true, dominio: [0, 7] }
      ],
      punti: [
        { x: 0, y: 0, vuoto: true, colore: 4 },
        { x: 3, y: 2, etichetta: '2/3', posizione: 'alto-sinistra', colore: 2 },
        { x: 6, y: 4, etichetta: '4/6', posizione: 'alto-sinistra', colore: 2 },
        { x: 2, y: 1, etichetta: '1/2', posizione: 'alto-sinistra', colore: 1 },
        { x: 4, y: 2, etichetta: '2/4', posizione: 'basso-destra', colore: 1 },
        { x: 6, y: 3, etichetta: '3/6', posizione: 'basso-destra', colore: 1 },
        { x: 3, y: 1, etichetta: '1/3', posizione: 'basso-destra', colore: 3 },
        { x: 6, y: 2, etichetta: '2/6', posizione: 'basso-destra', colore: 3 }
      ],
      didascalia: 'La frazione a/b è il punto (b; a). Le frazioni equivalenti stanno sulla stessa semiretta per l\'origine: ogni semiretta è una classe di equivalenza. L\'origine non è una frazione.' },
    hasse: { tipo: 'piano', x: [-3, 2], y: [-0.6, 3.6], assi: false, griglia: false, mirino: false,
      elementi: LATI12.map(([a, b]) => ({ tipo: 'segmento', da: POS12[a], a: POS12[b], colore: 1 }))
        .concat(Object.keys(POS12).map(k => ({ tipo: 'punto', p: POS12[k], etichetta: k, posizione: 'destra', colore: 2 }))),
      didascalia: 'I divisori di 12 ordinati da «divide». 2 divide 12: si sale da 2 a 12 lungo le linee. Fra 2 e 3, o fra 4 e 6, non c\'è una salita: non si confrontano.' }
  },

  esempi: [
    { titolo: 'Lo stesso insieme in tre modi', problema: R`Descrivi in tre modi l'insieme $M$ dei multipli di $4$ maggiori di $10$ e minori di $30$. Quanti elementi ha?`, passi: [
      R`I multipli di $4$ sono $0, 4, 8, 12, 16, \dots$ Fra $10$ e $30$, esclusi, ci sono $12$, $16$, $20$, $24$ e $28$.`,
      R`**Per elencazione**: $M = \{12, 16, 20, 24, 28\}$.`,
      R`**Con la proprietà caratteristica**: $M = \{x \in \mathbb{N} \mid x \text{ è multiplo di } 4 \text{ e } 10 < x < 30\}$.`,
      R`**Con un diagramma di Venn**: una linea chiusa con dentro i cinque numeri. Numeri come $8$ o $32$ stanno fuori.`,
      R`Gli elementi sono cinque, quindi $|M| = 5$.`
    ], risultato: R`$M = \{12, 16, 20, 24, 28\}$ e $|M| = 5$` },

    { titolo: 'Tutte le operazioni su due insiemi', problema: R`In $U = \{1, 2, \dots, 12\}$ sono dati $A$, i multipli di $2$, e $B$, i multipli di $3$. Trova $A \cap B$, $A \cup B$, $A \setminus B$, $B \setminus A$ e $\overline{A \cup B}$.`, passi: [
      R`Elenco gli elementi: $A = \{2, 4, 6, 8, 10, 12\}$ e $B = \{3, 6, 9, 12\}$.`,
      R`$A \cap B = \{6, 12\}$: i multipli di $2$ e di $3$, cioè i multipli di $6$.`,
      R`$A \cup B = \{2, 3, 4, 6, 8, 9, 10, 12\}$. Controllo con la formula: $6 + 4 - 2 = 8$ elementi.`,
      R`$A \setminus B = \{2, 4, 8, 10\}$: tolgo da $A$ i numeri che stanno anche in $B$. Allo stesso modo $B \setminus A = \{3, 9\}$.`,
      R`$\overline{A \cup B}$ contiene i numeri di $U$ fuori dall'unione: $\{1, 5, 7, 11\}$. Non sono né pari né multipli di $3$.`
    ], risultato: R`$A \cap B = \{6, 12\}$, $A \cup B$ ha $8$ elementi, $A \setminus B = \{2, 4, 8, 10\}$, $B \setminus A = \{3, 9\}$, $\overline{A \cup B} = \{1, 5, 7, 11\}$` },

    { titolo: 'Un sondaggio con il diagramma di Venn', problema: R`Su $30$ persone, $18$ bevono tè, $15$ bevono caffè e $4$ non bevono né l'uno né l'altro. Quante bevono tutte e due le bevande? Quante solo il tè?`, passi: [
      R`Chiamo $T$ chi beve tè e $C$ chi beve caffè. Chi beve almeno una delle due è $30 - 4 = 26$: quindi $|T \cup C| = 26$.`,
      R`Dalla formula dell'unione: $|T \cap C| = |T| + |C| - |T \cup C| = 18 + 15 - 26 = 7$.`,
      R`Nel diagramma riempio prima la zona comune, con $7$. Poi le altre: solo tè $18 - 7 = 11$, solo caffè $15 - 7 = 8$.`,
      R`Controllo: $11 + 7 + 8 + 4 = 30$. Tutte le persone sono contate una volta sola.`
    ], risultato: R`$7$ persone bevono tutte e due le bevande, $11$ solo il tè, $8$ solo il caffè` },

    { titolo: 'Le proprietà di una relazione', problema: R`Su $A = \{1, 2, 3, 4\}$ si dice $a \mathrel{\mathcal{R}} b$ quando $a + b$ è pari. Quali proprietà ha la relazione? Se è di equivalenza, trova le classi.`, passi: [
      R`$a + b$ è pari quando $a$ e $b$ sono tutti e due pari o tutti e due dispari. Le coppie sono $8$: $(1; 1)$, $(1; 3)$, $(3; 1)$, $(3; 3)$, $(2; 2)$, $(2; 4)$, $(4; 2)$, $(4; 4)$.`,
      R`**Riflessiva**: $a + a = 2a$ è sempre pari. Sì.`,
      R`**Simmetrica**: $a + b = b + a$, quindi se una somma è pari lo è anche l'altra. Sì.`,
      R`**Transitiva**: se $a$ e $b$ sono dello stesso tipo, e anche $b$ e $c$, allora $a$ e $c$ sono dello stesso tipo. Quindi $a + c$ è pari. Sì.`,
      R`È una relazione di equivalenza. Le classi sono $[1] = \{1, 3\}$ e $[2] = \{2, 4\}$: i dispari e i pari, una partizione di $A$.`,
      R`Non è antisimmetrica: $1 \mathrel{\mathcal{R}} 3$ e $3 \mathrel{\mathcal{R}} 1$, ma $1 \ne 3$.`
    ], risultato: R`Riflessiva, simmetrica e transitiva: classi $\{1, 3\}$ e $\{2, 4\}$` },

    { titolo: 'Una legge di De Morgan con la tavola di verità', problema: R`Verifica con la tavola di verità che $\neg(p \wedge q) \equiv \neg p \vee \neg q$.`, passi: [
      R`Con due proposizioni le righe sono $4$: VV, VF, FV, FF. Costruisco una colonna alla volta.

| $p$ | $q$ | $p \wedge q$ | $\neg(p \wedge q)$ | $\neg p$ | $\neg q$ | $\neg p \vee \neg q$ |
|---|---|---|---|---|---|---|
| V | V | V | F | F | F | F |
| V | F | F | V | F | V | V |
| F | V | F | V | V | F | V |
| F | F | F | V | V | V | V |`,
      R`La quarta colonna viene dalla terza, cambiando ogni V in F e ogni F in V.`,
      R`L'ultima colonna è vera dove almeno una fra $\neg p$ e $\neg q$ è vera.`,
      R`La quarta e l'ultima colonna sono uguali, riga per riga: le due proposizioni sono equivalenti.`
    ], risultato: R`Le colonne di $\neg(p \wedge q)$ e di $\neg p \vee \neg q$ coincidono: F, V, V, V` },

    { titolo: 'Negare una frase con due quantificatori', problema: R`Scrivi la negazione di «in ogni classe della scuola c'è almeno uno studente che ha preso $10$».`, passi: [
      R`La struttura è: **per ogni** classe, **esiste** uno studente con $10$.`,
      R`Negando, «per ogni» diventa «esiste» ed «esiste» diventa «per ogni». La proprietà finale si nega.`,
      R`Si ottiene: **esiste** una classe in cui **ogni** studente non ha preso $10$.`,
      R`Detto in modo più naturale: c'è almeno una classe in cui nessuno ha preso $10$.`,
      R`Attenzione a «in nessuna classe c'è qualcuno con $10$». È una frase molto più forte, e non è la negazione.`
    ], risultato: R`«C'è almeno una classe della scuola in cui nessuno studente ha preso $10$»` }
  ],

  formulario: [
    { nome: 'Appartenenza e inclusione', formula: R`\begin{gathered} x \in A \\ B \subseteq A \iff (\forall x,\ x \in B \Rightarrow x \in A) \end{gathered}`, nota: R`$\in$ fra un elemento e un insieme, $\subseteq$ fra due insiemi.` },
    { nome: 'Elementi dell\'insieme delle parti', formula: R`|A| = n \ \Rightarrow \ |\mathcal{P}(A)| = 2^n`, nota: R`Contano anche $\varnothing$ e $A$ stesso.` },
    { nome: 'Elementi dell\'unione', formula: R`|A \cup B| = |A| + |B| - |A \cap B|`, nota: R`Se $A$ e $B$ sono disgiunti, $|A \cup B| = |A| + |B|$.` },
    { nome: 'Differenza e complementare', formula: R`A \setminus B = A \cap \overline{B} \qquad \overline{A} = U \setminus A`, nota: R`Il complementare dipende dall'universo $U$.` },
    { nome: 'Leggi di De Morgan per gli insiemi', formula: R`\overline{A \cup B} = \overline{A} \cap \overline{B} \qquad \overline{A \cap B} = \overline{A} \cup \overline{B}` },
    { nome: 'Prodotto cartesiano', formula: R`A \times B = \{(a; b) \mid a \in A,\ b \in B\}`, nota: R`Ha $|A \times B| = |A| \cdot |B|$ elementi. Le coppie sono ordinate: di solito $A \times B \ne B \times A$.` },
    { nome: 'Proprietà di una relazione', formula: R`\begin{aligned} &\text{riflessiva: } a \mathrel{\mathcal{R}} a \\ &\text{simmetrica: } a \mathrel{\mathcal{R}} b \Rightarrow b \mathrel{\mathcal{R}} a \\ &\text{transitiva: } a \mathrel{\mathcal{R}} b \wedge b \mathrel{\mathcal{R}} c \Rightarrow a \mathrel{\mathcal{R}} c \\ &\text{antisimmetrica: } a \mathrel{\mathcal{R}} b \wedge b \mathrel{\mathcal{R}} a \Rightarrow a = b \end{aligned}`, nota: R`Equivalenza: riflessiva, simmetrica, transitiva. Ordine: riflessiva, antisimmetrica, transitiva.` },
    { nome: 'Leggi di De Morgan per le proposizioni', formula: R`\begin{gathered} \neg(p \wedge q) \equiv \neg p \vee \neg q \\ \neg(p \vee q) \equiv \neg p \wedge \neg q \end{gathered}` },
    { nome: 'Implicazione', formula: R`p \Rightarrow q \ \equiv \ \neg p \vee q \ \equiv \ \neg q \Rightarrow \neg p`, nota: R`Falsa solo se $p$ è vera e $q$ è falsa. L'ultima forma è la contronominale.` },
    { nome: 'Doppia implicazione', formula: R`p \Leftrightarrow q \ \equiv \ (p \Rightarrow q) \wedge (q \Rightarrow p)`, nota: R`Vera quando $p$ e $q$ hanno lo stesso valore di verità.` },
    { nome: 'Negazione di «per ogni»', formula: R`\neg(\forall x,\ P(x)) \equiv \exists x : \neg P(x)`, nota: R`Per smentire un «per ogni» basta un controesempio.` },
    { nome: 'Negazione di «esiste»', formula: R`\neg(\exists x : P(x)) \equiv \forall x,\ \neg P(x)`, nota: R`Per smentire un «esiste» bisogna controllare tutti i casi.` },
    { nome: 'Righe di una tavola di verità', formula: R`n \text{ proposizioni} \ \Rightarrow \ 2^n \text{ righe}`, nota: R`Ogni proposizione può essere V o F: le scelte si moltiplicano.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'insiemi', tipo: 'definizione', fronte: R`Quando una raccolta di oggetti è un insieme?`, retro: R`Quando c'è un criterio sicuro: per ogni oggetto si può dire se appartiene o no. «I divisori di $15$» sì, «i film belli» no.` },
    { id: 'fc-02', sezione: 'insiemi', tipo: 'procedura', fronte: R`I tre modi per rappresentare un insieme`, retro: R`Per elencazione, $\{1, 2, 3\}$; con la proprietà caratteristica, $\{x \in \mathbb{N} \mid 1 \le x \le 3\}$; con un diagramma di Venn.` },
    { id: 'fc-03', sezione: 'insiemi', tipo: 'definizione', fronte: R`Insieme vuoto`, retro: R`L'insieme senza elementi, $\varnothing$. Non è $\{0\}$, che ha un elemento.` },
    { id: 'fc-04', sezione: 'insiemi', tipo: 'definizione', fronte: R`Cardinalità di un insieme finito`, retro: R`Il numero dei suoi elementi, $|A|$. Per $A = \{a, e, i, o, u\}$ vale $|A| = 5$.` },
    { id: 'fc-05', sezione: 'sottoinsiemi', tipo: 'definizione', fronte: R`Che cosa vuol dire $B \subseteq A$?`, retro: R`Ogni elemento di $B$ è anche un elemento di $A$. Se in $A$ c'è almeno un elemento in più, $B \subset A$ (sottoinsieme proprio).` },
    { id: 'fc-06', sezione: 'sottoinsiemi', tipo: 'concetto', fronte: R`Differenza fra $\in$ e $\subseteq$`, retro: R`$\in$ lega un elemento a un insieme: $1 \in \{1, 2\}$. $\subseteq$ lega due insiemi: $\{1\} \subseteq \{1, 2\}$.` },
    { id: 'fc-07', sezione: 'sottoinsiemi', tipo: 'formula', fronte: R`Quanti elementi ha $\mathcal{P}(A)$, se $|A| = n$?`, retro: R`$2^n$: per ogni elemento si sceglie se prenderlo o no. Contano anche $\varnothing$ e $A$.` },
    { id: 'fc-08', sezione: 'sottoinsiemi', tipo: 'definizione', fronte: R`Sottoinsiemi impropri di $A$`, retro: R`$\varnothing$ e $A$ stesso: ogni insieme li ha sempre.` },
    { id: 'fc-09', sezione: 'unione-intersezione', tipo: 'definizione', fronte: R`Unione e intersezione`, retro: R`$A \cup B$: gli elementi che stanno in almeno uno dei due insiemi. $A \cap B$: quelli che stanno in tutti e due.` },
    { id: 'fc-10', sezione: 'unione-intersezione', tipo: 'formula', fronte: R`Quanti elementi ha $A \cup B$?`, retro: R`$|A \cup B| = |A| + |B| - |A \cap B|$: gli elementi comuni si contano una volta sola.` },
    { id: 'fc-11', sezione: 'unione-intersezione', tipo: 'definizione', fronte: R`Insiemi disgiunti`, retro: R`Insiemi senza elementi in comune: $A \cap B = \varnothing$.` },
    { id: 'fc-12', sezione: 'differenza-complementare', tipo: 'definizione', fronte: R`Differenza $A \setminus B$`, retro: R`Gli elementi di $A$ che non stanno in $B$. In generale $A \setminus B \ne B \setminus A$.` },
    { id: 'fc-13', sezione: 'differenza-complementare', tipo: 'definizione', fronte: R`Complementare di $A$`, retro: R`$\overline{A} = U \setminus A$: gli elementi dell'universo $U$ che non stanno in $A$. Dipende da $U$.` },
    { id: 'fc-14', sezione: 'differenza-complementare', tipo: 'formula', fronte: R`Leggi di De Morgan per gli insiemi`, retro: R`$\overline{A \cup B} = \overline{A} \cap \overline{B}$ e $\overline{A \cap B} = \overline{A} \cup \overline{B}$.` },
    { id: 'fc-15', sezione: 'cartesiano-partizioni', tipo: 'definizione', fronte: R`Prodotto cartesiano $A \times B$`, retro: R`L'insieme delle coppie ordinate $(a; b)$ con $a \in A$ e $b \in B$. Ha $|A| \cdot |B|$ elementi.` },
    { id: 'fc-16', sezione: 'cartesiano-partizioni', tipo: 'definizione', fronte: R`Partizione di un insieme $A$`, retro: R`Sottoinsiemi non vuoti, a due a due disgiunti, la cui unione è $A$: ogni elemento sta in un pezzo, e in uno solo.` },
    { id: 'fc-17', sezione: 'relazioni', tipo: 'definizione', fronte: R`Relazione da $A$ a $B$`, retro: R`Un sottoinsieme di $A \times B$: le coppie collegate. Si scrive $a \mathrel{\mathcal{R}} b$ se $(a; b)$ è una di quelle coppie.` },
    { id: 'fc-18', sezione: 'relazioni', tipo: 'definizione', fronte: R`Riflessiva, simmetrica, transitiva, antisimmetrica`, retro: R`R: $a \mathrel{\mathcal{R}} a$. S: da $a \mathrel{\mathcal{R}} b$ segue $b \mathrel{\mathcal{R}} a$. T: da $a \mathrel{\mathcal{R}} b$ e $b \mathrel{\mathcal{R}} c$ segue $a \mathrel{\mathcal{R}} c$. A: da $a \mathrel{\mathcal{R}} b$ e $b \mathrel{\mathcal{R}} a$ segue $a = b$.` },
    { id: 'fc-19', sezione: 'equivalenza-ordine', tipo: 'definizione', fronte: R`Relazione di equivalenza e classi di equivalenza`, retro: R`Riflessiva, simmetrica e transitiva. La classe $[a]$ contiene gli elementi in relazione con $a$; le classi formano una partizione.` },
    { id: 'fc-20', sezione: 'equivalenza-ordine', tipo: 'definizione', fronte: R`Relazione d'ordine; ordine totale e parziale`, retro: R`Riflessiva, antisimmetrica e transitiva. Totale se due elementi si confrontano sempre ($\le$), parziale se no («divide»).` },
    { id: 'fc-21', sezione: 'proposizioni-connettivi', tipo: 'definizione', fronte: R`Proposizione`, retro: R`Una frase che è vera o falsa: «$7$ è primo». Un ordine o una domanda non lo sono, e nemmeno «$x > 3$».` },
    { id: 'fc-22', sezione: 'proposizioni-connettivi', tipo: 'concetto', fronte: R`Quando sono vere $p \wedge q$, $p \vee q$ e $p \mathbin{\dot{\vee}} q$?`, retro: R`$p \wedge q$: tutte e due vere. $p \vee q$: almeno una vera. $p \mathbin{\dot{\vee}} q$: una sola vera.` },
    { id: 'fc-23', sezione: 'proposizioni-connettivi', tipo: 'formula', fronte: R`Leggi di De Morgan per le proposizioni`, retro: R`$\neg(p \wedge q) \equiv \neg p \vee \neg q$ e $\neg(p \vee q) \equiv \neg p \wedge \neg q$.` },
    { id: 'fc-24', sezione: 'implicazione-quantificatori', tipo: 'concetto', fronte: R`Quando è falsa $p \Rightarrow q$?`, retro: R`Solo quando $p$ è vera e $q$ è falsa. Se $p$ è falsa, l'implicazione è vera.` },
    { id: 'fc-25', sezione: 'implicazione-quantificatori', tipo: 'definizione', fronte: R`Contronominale di $p \Rightarrow q$`, retro: R`$\neg q \Rightarrow \neg p$: è equivalente a $p \Rightarrow q$. L'inversa $q \Rightarrow p$ invece non lo è.` },
    { id: 'fc-26', sezione: 'implicazione-quantificatori', tipo: 'procedura', fronte: R`Come si nega una frase con $\forall$ o con $\exists$?`, retro: R`$\forall$ diventa $\exists$, $\exists$ diventa $\forall$, e la proprietà si nega. «Tutti sono neri» diventa «almeno uno non è nero».` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Elenca gli elementi di $A = \{x \in \mathbb{N} \mid 3 \le x < 8\}$.`, suggerimenti: [R`Parti da $3$, che è incluso, e fermati prima di $8$.`], risposta: el(3, 4, 5, 6, 7), soluzione: [R`I naturali da $3$ a $7$: $A = \{3, 4, 5, 6, 7\}$.`, R`Il $3$ c'è, perché $3 \le 3$. L'$8$ no, perché $8 < 8$ è falso.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Quanti elementi ha l'insieme $D = \{x \in \mathbb{N} \mid x \text{ è un divisore di } 20\}$?`, suggerimenti: [R`Cerca le coppie di numeri che moltiplicati danno $20$.`], risposta: num(6), soluzione: [R`$20 = 1 \cdot 20 = 2 \cdot 10 = 4 \cdot 5$.`, R`$D = \{1, 2, 4, 5, 10, 20\}$, quindi $|D| = 6$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Quanti sottoinsiemi ha l'insieme $\{a, b, c, d\}$?`, suggerimenti: [R`Per ogni elemento decidi se prenderlo o lasciarlo.`], risposta: num(16), soluzione: [R`L'insieme ha $4$ elementi.`, R`I sottoinsiemi sono $2^4 = 16$, contando anche $\varnothing$ e l'insieme intero.`] },
    { id: 'b-04', livello: 'base', difficolta: 2, testo: R`Quanti sottoinsiemi di $\{1, 2, 3\}$ contengono il numero $1$?`, suggerimenti: [R`Il $1$ c'è di sicuro: resta da scegliere che cosa fare con $2$ e $3$.`], risposta: num(4), soluzione: [R`Per $2$ e $3$ ci sono $2 \cdot 2 = 4$ scelte.`, R`Sono $\{1\}$, $\{1, 2\}$, $\{1, 3\}$, $\{1, 2, 3\}$: quattro.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`$A = \{2, 4, 6, 8\}$ e $B = \{1, 2, 3, 4\}$. Elenca gli elementi di $A \cap B$.`, suggerimenti: [R`Servono i numeri che stanno in tutti e due gli insiemi.`], risposta: el(2, 4), soluzione: [R`$2$ e $4$ stanno sia in $A$ sia in $B$.`, R`$A \cap B = \{2, 4\}$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`$A = \{1, 3, 5, 7\}$ e $B = \{3, 4, 5, 6\}$. Elenca gli elementi di $A \cup B$.`, suggerimenti: [R`Metti insieme tutti i numeri, scrivendo una volta sola quelli comuni.`], risposta: el(1, 3, 4, 5, 6, 7), soluzione: [R`Da $A$: $1, 3, 5, 7$. Da $B$ aggiungo $4$ e $6$, perché $3$ e $5$ ci sono già.`, R`$A \cup B = \{1, 3, 4, 5, 6, 7\}$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`$|A| = 12$, $|B| = 9$ e $|A \cap B| = 4$. Quanti elementi ha $A \cup B$?`, suggerimenti: [R`Gli elementi comuni non vanno contati due volte.`], risposta: num(17), soluzione: [R`$|A \cup B| = |A| + |B| - |A \cap B|$.`, R`$12 + 9 - 4 = 17$.`] },
    { id: 'b-08', livello: 'base', difficolta: 2, testo: R`In una classe di $30$ studenti, $17$ giocano a calcio, $11$ a pallavolo e $6$ a nessuno dei due sport. Quanti giocano a tutti e due?`, suggerimenti: [R`Quanti giocano ad almeno uno sport?`, R`Usa la formula dell'unione al contrario.`], risposta: num(4), soluzione: [R`Ad almeno uno sport giocano $30 - 6 = 24$ studenti.`, R`$|C \cap P| = 17 + 11 - 24 = 4$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`$A = \{1, 2, 3, 4, 5, 6\}$ e $B = \{2, 4, 6, 8\}$. Elenca gli elementi di $A \setminus B$.`, suggerimenti: [R`Da $A$ togli i numeri che stanno anche in $B$.`], risposta: el(1, 3, 5), soluzione: [R`$2$, $4$ e $6$ stanno anche in $B$: li tolgo. L'$8$ non conta, perché non sta in $A$.`, R`$A \setminus B = \{1, 3, 5\}$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`L'universo è $U = \{1, 2, 3, 4, 5, 6, 7, 8\}$ e $A = \{1, 2, 3\}$. Elenca gli elementi di $\overline{A}$.`, suggerimenti: [R`Il complementare contiene gli elementi di $U$ che non stanno in $A$.`], risposta: el(4, 5, 6, 7, 8), soluzione: [R`Da $U$ tolgo $1$, $2$ e $3$.`, R`$\overline{A} = \{4, 5, 6, 7, 8\}$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`$A = \{a, b, c\}$ e $B = \{1, 2, 3, 4\}$. Quanti elementi ha $A \times B$?`, suggerimenti: [R`Ogni elemento di $A$ fa coppia con ogni elemento di $B$.`], risposta: num(12), soluzione: [R`$|A \times B| = |A| \cdot |B|$.`, R`$3 \cdot 4 = 12$ coppie, da $(a; 1)$ a $(c; 4)$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`$A = \{1, 2, 3, 4\}$. Quante coppie $(x; y)$ di $A \times A$ hanno $x < y$?`, suggerimenti: [R`Parti da $x = 1$: quante $y$ sono più grandi? Poi $x = 2$, e così via.`], risposta: num(6), soluzione: [R`Con $x = 1$: tre coppie. Con $x = 2$: due. Con $x = 3$: una. Con $x = 4$: nessuna.`, R`In tutto $3 + 2 + 1 = 6$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Su $A = \{1, 2, 3, 4, 5, 6\}$ considera la relazione «$a$ divide $b$». Quante coppie $(a; b)$ contiene?`, suggerimenti: [R`Ogni numero divide se stesso: questo dà già sei coppie.`, R`Poi conta, per ogni $a$, i suoi multipli in $A$.`], risposta: num(14), soluzione: [R`$1$ divide tutti: $6$ coppie. $2$ divide $2$, $4$, $6$: $3$ coppie. $3$ divide $3$ e $6$: $2$ coppie.`, R`$4$, $5$ e $6$ dividono solo se stessi: $3$ coppie.`, R`In tutto $6 + 3 + 2 + 3 = 14$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Fra le rette del piano, la relazione «è perpendicolare a» quali proprietà ha, fra riflessiva, simmetrica e transitiva?`, suggerimenti: [R`Una retta è perpendicolare a se stessa?`, R`Se $r \perp s$ e $s \perp t$, come sono $r$ e $t$?`], risposta: { tipo: 'testo', accettate: ['simmetrica', 'solo simmetrica', 'è simmetrica', 'e simmetrica', 'solo la simmetrica', 'la simmetrica', 'soltanto simmetrica', 's', 'solo s'], segnaposto: 'es. riflessiva, transitiva', simboli: [] }, soluzione: [R`Non è riflessiva: nessuna retta è perpendicolare a se stessa.`, R`È simmetrica: se $r \perp s$, anche $s \perp r$.`, R`Non è transitiva: se $r \perp s$ e $s \perp t$, allora $r$ e $t$ sono parallele, non perpendicolari.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`In $\mathbb{N}$, la relazione «ha lo stesso resto nella divisione per $4$» è di equivalenza. Quante classi di equivalenza ha?`, suggerimenti: [R`Quali resti si possono ottenere dividendo per $4$?`], risposta: num(4), soluzione: [R`I resti possibili sono $0$, $1$, $2$ e $3$.`, R`Una classe per ogni resto: quattro classi.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Su $\{0, 1, 2, \dots, 20\}$, con la relazione «ha lo stesso resto nella divisione per $5$», elenca la classe di equivalenza di $3$.`, suggerimenti: [R`Servono i numeri che, divisi per $5$, danno resto $3$.`], risposta: el(3, 8, 13, 18), soluzione: [R`Parto da $3$ e aggiungo $5$ ogni volta: $3$, $8$, $13$, $18$.`, R`Il numero dopo, $23$, è fuori dall'insieme. La classe è $\{3, 8, 13, 18\}$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`$p$ è «$7$ è un numero pari», $q$ è «$7$ è un numero primo». La proposizione $p \vee q$ è vera o falsa?`, suggerimenti: [R`Per «o» basta che una delle due sia vera.`], risposta: VF(true), soluzione: [R`$p$ è falsa, $q$ è vera.`, R`$p \vee q$ è vera, perché almeno una delle due è vera.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Quante righe ha la tavola di verità di una proposizione costruita con $3$ proposizioni $p$, $q$, $r$?`, suggerimenti: [R`Ognuna delle tre può essere V oppure F.`], risposta: num(8), soluzione: [R`Le scelte si moltiplicano: $2 \cdot 2 \cdot 2$.`, R`Le righe sono $2^3 = 8$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`«Se $12$ è multiplo di $4$, allora $12$ è multiplo di $8$.» Questa implicazione è vera o falsa?`, suggerimenti: [R`Trova il valore di verità dell'ipotesi e della tesi.`], risposta: VF(false), soluzione: [R`L'ipotesi è vera: $12 = 4 \cdot 3$. La tesi è falsa: $12$ diviso $8$ non dà un intero.`, R`Ipotesi vera e tesi falsa: è l'unico caso in cui l'implicazione è falsa.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Quanti numeri naturali sono un controesempio alla frase «per ogni $n \in \mathbb{N}$, $n^2 > n$»?`, suggerimenti: [R`Prova i primi numeri: $0$, $1$, $2$…`, R`Da $2$ in poi, $n^2 = n \cdot n$ è almeno il doppio di $n$.`], risposta: num(2), soluzione: [R`$0^2 = 0$, che non è maggiore di $0$. $1^2 = 1$, che non è maggiore di $1$.`, R`Per $n \ge 2$ vale $n^2 \ge 2n > n$.`, R`I controesempi sono $0$ e $1$: due. Ne bastava uno per dire che la frase è falsa.`] },

    { id: 'es-01', difficolta: 3, testo: R`In una scuola di lingue ci sono $40$ studenti. $18$ studiano inglese, $14$ francese e $10$ spagnolo. $6$ studiano inglese e francese, $4$ inglese e spagnolo, $3$ francese e spagnolo; $2$ studiano tutte e tre le lingue. Quanti studiano una lingua sola?`, suggerimenti: [R`Disegna tre cerchi che si sovrappongono e riempi le zone partendo dal centro.`, R`Chi studia inglese e francese ma non spagnolo è $6 - 2 = 4$.`, R`Solo inglese: $18$ meno quelli che stanno nelle zone comuni di inglese.`], risposta: num(22), soluzione: [R`Centro: $2$. Due lingue sole: inglese e francese $6 - 2 = 4$, inglese e spagnolo $4 - 2 = 2$, francese e spagnolo $3 - 2 = 1$.`, R`Solo inglese: $18 - 4 - 2 - 2 = 10$. Solo francese: $14 - 4 - 1 - 2 = 7$. Solo spagnolo: $10 - 2 - 1 - 2 = 5$.`, R`Una lingua sola: $10 + 7 + 5 = 22$.`, R`Controllo: in tutto $22 + 4 + 2 + 1 + 2 = 31$ studiano almeno una lingua, e $9$ nessuna. $31 + 9 = 40$.`] },
    { id: 'es-02', difficolta: 2, testo: R`$U = \{1, 2, \dots, 10\}$, $A = \{1, 2, 3, 4\}$ e $B = \{3, 4, 5, 6\}$. Elenca gli elementi di $\overline{A \cap B}$, poi controlla che coincida con $\overline{A} \cup \overline{B}$.`, suggerimenti: [R`Prima l'intersezione, poi il complementare.`], risposta: el(1, 2, 5, 6, 7, 8, 9, 10), soluzione: [R`$A \cap B = \{3, 4\}$, quindi $\overline{A \cap B} = \{1, 2, 5, 6, 7, 8, 9, 10\}$.`, R`$\overline{A} = \{5, 6, 7, 8, 9, 10\}$ e $\overline{B} = \{1, 2, 7, 8, 9, 10\}$.`, R`$\overline{A} \cup \overline{B} = \{1, 2, 5, 6, 7, 8, 9, 10\}$: è lo stesso insieme, come dice la legge di De Morgan.`] },
    { id: 'es-03', difficolta: 3, testo: R`L'insieme $A$ ha $3$ elementi più di $B$, e $\mathcal{P}(A)$ ha $56$ elementi più di $\mathcal{P}(B)$. Quanti elementi ha $B$?`, suggerimenti: [R`Chiama $n$ il numero di elementi di $B$: $A$ ne ha $n + 3$.`, R`$2^{n+3} = 8 \cdot 2^n$.`], risposta: num(3), soluzione: [R`$|\mathcal{P}(A)| - |\mathcal{P}(B)| = 2^{n+3} - 2^n = 8 \cdot 2^n - 2^n = 7 \cdot 2^n$.`, R`$7 \cdot 2^n = 56$ dà $2^n = 8$, cioè $n = 3$.`, R`Controllo: $2^6 - 2^3 = 64 - 8 = 56$.`] },
    { id: 'es-04', difficolta: 2, testo: R`$A = \{1, 2, 3\}$ e $B = \{2, 3, 4\}$. Quanti elementi ha $(A \times B) \cap (B \times A)$?`, suggerimenti: [R`Una coppia $(x; y)$ sta in tutti e due i prodotti solo se $x$ e $y$ stanno sia in $A$ sia in $B$.`], risposta: num(4), soluzione: [R`In $A \times B$ la prima coordinata sta in $A$; in $B \times A$ sta in $B$. Quindi deve stare in $A \cap B = \{2, 3\}$.`, R`Lo stesso vale per la seconda coordinata.`, R`Le coppie sono $(2; 2)$, $(2; 3)$, $(3; 2)$, $(3; 3)$: quattro.`] },
    { id: 'es-05', difficolta: 3, testo: R`Su $A = \{1, 2, 3\}$ è data $\mathcal{R} = \{(1; 1), (2; 2), (3; 3), (1; 2), (2; 1), (2; 3)\}$. Quante coppie, al minimo, bisogna aggiungere perché $\mathcal{R}$ diventi una relazione di equivalenza?`, suggerimenti: [R`Che cosa manca per la simmetria?`, R`Se $1$ è in relazione con $2$ e $2$ con $3$, la transitività che cosa chiede?`], risposta: num(3), soluzione: [R`È già riflessiva. Per la simmetria serve $(3; 2)$, la coppia di ritorno di $(2; 3)$.`, R`Per la transitività, da $(1; 2)$ e $(2; 3)$ serve $(1; 3)$. Per la simmetria serve allora anche $(3; 1)$.`, R`Ora i tre elementi sono tutti in relazione fra loro: $\mathcal{R} = A \times A$, con $9$ coppie. Ne ho aggiunte $3$, e c'è una sola classe, $\{1, 2, 3\}$.`] },
    { id: 'es-06', difficolta: 2, testo: R`In $\mathbb{Z}$, $a \mathrel{\mathcal{R}} b$ quando $a - b$ è un multiplo di $3$. Quali fra $-7$, $-4$, $2$, $5$, $9$, $11$ stanno nella stessa classe di $2$?`, suggerimenti: [R`Calcola $a - 2$ per ogni numero.`, R`Attenzione ai negativi: anche $-9$ è un multiplo di $3$.`], risposta: el(-7, -4, 2, 5, 11), soluzione: [R`$-7 - 2 = -9$, $-4 - 2 = -6$, $2 - 2 = 0$, $5 - 2 = 3$, $11 - 2 = 9$: tutti multipli di $3$.`, R`$9 - 2 = 7$ non è multiplo di $3$: il $9$ sta in un'altra classe, quella di $0$.`, R`La classe di $2$ contiene $-7$, $-4$, $2$, $5$ e $11$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Sull'insieme dei divisori di $18$, $\{1, 2, 3, 6, 9, 18\}$, considera l'ordine «divide». Quante coppie di elementi diversi **non** si possono confrontare?`, suggerimenti: [R`Le coppie di elementi diversi sono $15$.`, R`Conta quelle in cui uno dei due divide l'altro, e sottrai.`], risposta: num(3), soluzione: [R`$1$ si confronta con tutti gli altri $5$. $2$ divide $6$ e $18$; $3$ divide $6$, $9$ e $18$; $6$ divide $18$; $9$ divide $18$.`, R`Le coppie confrontabili sono $5 + 2 + 3 + 1 + 1 = 12$.`, R`Restano $15 - 12 = 3$ coppie: $\{2, 3\}$, $\{2, 9\}$, $\{6, 9\}$.`] },
    { id: 'es-08', difficolta: 2, testo: R`In quante righe della tavola di verità la proposizione $(p \vee q) \Rightarrow (p \wedge q)$ è vera?`, suggerimenti: [R`Calcola prima $p \vee q$ e $p \wedge q$ nelle quattro righe.`, R`L'implicazione è falsa solo con l'ipotesi vera e la tesi falsa.`], risposta: num(2), soluzione: [R`VV: $V \Rightarrow V$, vera. VF: $V \Rightarrow F$, falsa. FV: $V \Rightarrow F$, falsa. FF: $F \Rightarrow F$, vera.`, R`È vera in $2$ righe: proprio quando $p$ e $q$ hanno lo stesso valore. È equivalente a $p \Leftrightarrow q$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Scrivi la negazione di «tutti i quadrati sono rombi e alcuni rombi non sono quadrati». La negazione è vera o falsa?`, suggerimenti: [R`È una frase con «e»: per De Morgan la negazione ha «o».`, R`Poi nega ciascuna parte, scambiando i quantificatori.`], risposta: VF(false), soluzione: [R`$\neg(p \wedge q) \equiv \neg p \vee \neg q$.`, R`$\neg p$: «esiste un quadrato che non è un rombo». $\neg q$: «tutti i rombi sono quadrati».`, R`Negazione: «esiste un quadrato che non è un rombo, oppure tutti i rombi sono quadrati».`, R`La frase di partenza è vera: ogni quadrato ha i lati uguali, e un rombo con angoli non retti non è un quadrato. Quindi la negazione è falsa.`] },
    { id: 'es-10', difficolta: 2, testo: R`Considera «se un numero è multiplo di $6$, allora è pari». Scrivi l'inversa e la contronominale. Quali delle tre frasi sono vere?`, suggerimenti: [R`L'inversa scambia ipotesi e tesi. La contronominale le scambia e le nega.`, R`Cerca un controesempio per l'inversa.`], soluzione: [R`La frase data è vera: $6k = 2 \cdot 3k$ è pari.`, R`Inversa: «se un numero è pari, allora è multiplo di $6$». È falsa: $4$ è pari, ma non è multiplo di $6$.`, R`Contronominale: «se un numero non è pari, allora non è multiplo di $6$». È vera, perché è equivalente alla frase data.`, R`Essere multiplo di $6$ è condizione sufficiente per essere pari, ma non necessaria.`] },
    { id: 'es-11', difficolta: 3, testo: R`Su un'isola i cavalieri dicono sempre il vero e i furfanti mentono sempre. $A$ dice: «$B$ è un furfante». $B$ dice: «$A$ e io siamo dello stesso tipo». Che cos'è $A$, cavaliere o furfante?`, suggerimenti: [R`Fai un'ipotesi su $A$ e guarda se porta a una contraddizione.`, R`Se $A$ è un furfante, la sua frase è falsa: allora $B$ è un cavaliere.`], risposta: { tipo: 'testo', accettate: ['cavaliere', 'a è un cavaliere', 'a e un cavaliere', 'è un cavaliere', 'e un cavaliere', 'a cavaliere', 'a è cavaliere', 'un cavaliere'], segnaposto: 'cavaliere o furfante', simboli: [] }, soluzione: [R`Se $A$ fosse un furfante, $B$ sarebbe un cavaliere. Ma allora la frase di $B$ sarebbe vera, e $A$ e $B$ sarebbero dello stesso tipo: contraddizione.`, R`Quindi $A$ è un cavaliere, e dice il vero: $B$ è un furfante.`, R`Controllo: la frase di $B$ è falsa, perché sono di tipo diverso. Torna: i furfanti mentono.`] },
    { id: 'es-12', difficolta: 3, testo: R`La frase «$\exists y \in \mathbb{R} : \forall x \in \mathbb{R},\ y > x$» è vera o falsa? Poi confrontala con la frase che ha i quantificatori scambiati: «$\forall x \in \mathbb{R},\ \exists y \in \mathbb{R} : y > x$».`, suggerimenti: [R`La prima dice che c'è un numero più grande di **tutti** i numeri reali.`, R`Nella seconda $y$ si può scegliere dopo aver visto $x$.`], risposta: VF(false), soluzione: [R`La prima è falsa. Qualunque $y$ si scelga, $x = y + 1$ non è minore di $y$.`, R`La seconda è vera: dato $x$, basta prendere $y = x + 1$.`, R`L'ordine dei quantificatori conta: con «esiste» davanti, lo stesso $y$ deve andare bene per tutti gli $x$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale di questi insiemi è vuoto?`, opzioni: [R`$\{0\}$`, R`$\{x \in \mathbb{N} \mid x < 0\}$`, R`$\{\varnothing\}$`, R`$\{x \in \mathbb{Z} \mid x^2 = 1\}$`], corretta: 1, spiegazione: R`Nessun numero naturale è negativo, quindi il secondo insieme non ha elementi. $\{0\}$ contiene lo zero. $\{\varnothing\}$ ha un elemento, l'insieme vuoto. L'ultimo è $\{-1, 1\}$.` },
    { id: 'q-02', domanda: R`$A = \{x \in \mathbb{N} \mid x \text{ divide } 10\}$. Qual è l'elencazione giusta?`, opzioni: [R`$\{2, 5\}$`, R`$\{0, 1, 2, 5, 10\}$`, R`$\{1, 10\}$`, R`$\{1, 2, 5, 10\}$`], corretta: 3, spiegazione: R`I divisori di $10$ sono $1$, $2$, $5$ e $10$: anche $1$ e il numero stesso sono divisori. Lo $0$ non divide $10$: nessun numero moltiplicato per $0$ dà $10$.` },
    { id: 'q-03', domanda: R`$A$ ha $5$ elementi. Quanti elementi ha $\mathcal{P}(A)$?`, opzioni: [R`$32$`, R`$10$`, R`$25$`, R`$31$`], corretta: 0, spiegazione: R`$2^5 = 32$: per ognuno dei $5$ elementi si sceglie se prenderlo o no. $31$ dimentica l'insieme vuoto, che è un sottoinsieme anche lui. $10$ e $25$ vengono da $2 \cdot 5$ e $5^2$.` },
    { id: 'q-04', domanda: R`Quale affermazione è vera per **ogni** insieme $A$?`, opzioni: [R`$A \in A$`, R`$\varnothing \in A$`, R`$\varnothing \subseteq A$`, R`$A \subset A$`], corretta: 2, spiegazione: R`Il vuoto non ha elementi, quindi nessuno di essi manca ad $A$: $\varnothing \subseteq A$ sempre. $\varnothing \in A$ vale solo se $A$ ha il vuoto fra i suoi elementi. $A \subset A$ è falsa, perché un sottoinsieme proprio deve essere più piccolo. $A \in A$ chiederebbe che $A$ fosse uno dei suoi stessi elementi: per $\{1, 2\}$ vorrebbe dire che $\{1, 2\}$ è $1$ oppure $2$.` },
    { id: 'q-05', domanda: R`$|A| = 7$, $|B| = 5$ e $A \cap B = \varnothing$. Quanto vale $|A \cup B|$?`, opzioni: [R`$2$`, R`$12$`, R`$35$`, R`$7$`], corretta: 1, spiegazione: R`Gli insiemi sono disgiunti, quindi non c'è niente da togliere: $7 + 5 = 12$. $35$ sarebbe il numero di coppie di $A \times B$.` },
    { id: 'q-06', domanda: R`Se $B \subseteq A$, allora $A \cap B$ è uguale a…`, opzioni: [R`$B$`, R`$A$`, R`$\varnothing$`, R`$A \cup B$`], corretta: 0, spiegazione: R`Tutti gli elementi di $B$ stanno anche in $A$, quindi la parte comune è tutto $B$. È l'unione $A \cup B$ a essere uguale ad $A$.` },
    { id: 'q-07', domanda: R`Quale uguaglianza vale per tutti gli insiemi?`, opzioni: [R`$A \setminus B = B \setminus A$`, R`$\overline{A \cap B} = \overline{A} \cap \overline{B}$`, R`$A \setminus B = A \cup \overline{B}$`, R`$\overline{A \cup B} = \overline{A} \cap \overline{B}$`], corretta: 3, spiegazione: R`È una legge di De Morgan: fuori dall'unione vuol dire fuori da $A$ e fuori da $B$. Il complementare dell'intersezione è invece $\overline{A} \cup \overline{B}$. La differenza non è commutativa, e $A \setminus B = A \cap \overline{B}$, con l'intersezione.` },
    { id: 'q-08', domanda: R`$A = \{1, 2\}$ e $B = \{x, y, z\}$. Quale coppia appartiene ad $A \times B$?`, opzioni: [R`$(x; 1)$`, R`$(1; 2)$`, R`$(2; z)$`, R`$(y; z)$`], corretta: 2, spiegazione: R`In $A \times B$ il primo elemento viene da $A$ e il secondo da $B$. $(x; 1)$ ha l'ordine scambiato: sta in $B \times A$. $(1; 2)$ sta in $A \times A$, $(y; z)$ in $B \times B$.` },
    { id: 'q-09', domanda: R`Quale condizione **non** serve perché alcuni sottoinsiemi formino una partizione di $A$?`, opzioni: [R`che abbiano tutti lo stesso numero di elementi`, R`che nessuno di essi sia vuoto`, R`che a due a due non abbiano elementi in comune`, R`che la loro unione sia tutto $A$`], corretta: 0, spiegazione: R`I pezzi di una partizione possono avere grandezze diverse: $\{1\}$ e $\{2, 3, 4\}$ vanno bene. Le altre tre condizioni sono la definizione.` },
    { id: 'q-10', domanda: R`Nel diagramma a frecce di una relazione su $A$, come si riconosce che è riflessiva?`, opzioni: [R`ogni freccia ha anche quella di ritorno`, R`ogni elemento ha una freccia verso se stesso`, R`da ogni elemento parte una sola freccia`, R`nessuna freccia torna sul suo punto di partenza`], corretta: 1, spiegazione: R`Riflessiva vuol dire $a \mathrel{\mathcal{R}} a$ per ogni $a$: un anello su ogni punto. Le frecce di ritorno dicono la simmetria. Una sola freccia per elemento è la condizione delle funzioni.` },
    { id: 'q-11', domanda: R`La relazione «è amico di» fra le persone, di solito, è…`, opzioni: [R`riflessiva e transitiva`, R`transitiva ma non simmetrica`, R`una relazione d'ordine`, R`simmetrica ma non transitiva`], corretta: 3, spiegazione: R`Se Anna è amica di Bruno, Bruno è amico di Anna: è simmetrica. Ma gli amici di Bruno non sono per forza amici di Anna: non è transitiva. Non può essere d'ordine, perché un ordine è antisimmetrico.` },
    { id: 'q-12', domanda: R`Una relazione di equivalenza su $A$ ha tre classi. Che cosa si può dire?`, opzioni: [R`le classi possono avere elementi in comune`, R`le classi hanno lo stesso numero di elementi`, R`le tre classi formano una partizione di $A$`, R`$A$ ha esattamente tre elementi`], corretta: 2, spiegazione: R`Le classi di equivalenza non sono vuote, non si sovrappongono e coprono tutto $A$. Possono però avere grandezze diverse, e $A$ può avere molti elementi: $\mathbb{N}$ con i resti nella divisione per $3$ ha tre classi infinite.` },
    { id: 'q-13', domanda: R`Quale di queste è una relazione d'ordine su $\mathbb{N}$?`, opzioni: [R`«ha lo stesso resto nella divisione per $2$»`, R`«è minore o uguale a»`, R`«è diverso da»`, R`«è minore di»`], corretta: 1, spiegazione: R`$\le$ è riflessiva, antisimmetrica e transitiva. Lo stesso resto dà una relazione di equivalenza. «È diverso da» non è riflessiva né transitiva. «È minore di» non è riflessiva: è un ordine stretto.` },
    { id: 'q-14', domanda: R`Quale di queste frasi è una proposizione?`, opzioni: [R`«$12$ è divisibile per $5$»`, R`«Risolvi l'equazione»`, R`«$x + 1 = 4$»`, R`«Che numero è?»`], corretta: 0, spiegazione: R`È falsa, ma è una proposizione: se ne può dire se è vera o falsa. Un ordine e una domanda non lo sono. «$x + 1 = 4$» è un predicato: diventa vero o falso solo quando scegli $x$.` },
    { id: 'q-15', domanda: R`$p \vee q$ è falsa. Che cosa sai di $p$ e di $q$?`, opzioni: [R`che almeno una delle due è falsa`, R`che $p$ è vera e $q$ è falsa`, R`che una è vera e l'altra falsa`, R`che sono false tutte e due`], corretta: 3, spiegazione: R`«$p$ o $q$» è vera appena una delle due è vera. Per essere falsa servono tutte e due false. «Almeno una falsa» è la condizione perché sia falsa $p \wedge q$.` },
    { id: 'q-16', domanda: R`$p \Rightarrow q$ è falsa. Allora…`, opzioni: [R`$p$ è falsa e $q$ è vera`, R`$p$ e $q$ sono false`, R`$p$ è vera e $q$ è falsa`, R`$p$ e $q$ sono vere`], corretta: 2, spiegazione: R`L'implicazione è falsa in un solo caso: ipotesi vera e tesi falsa, come la promessa tradita. Quando $p$ è falsa l'implicazione è sempre vera.` },
    { id: 'q-17', domanda: R`Qual è la negazione di «$\forall x \in \mathbb{R},\ x^2 > 0$»?`, opzioni: [R`$\forall x \in \mathbb{R},\ x^2 < 0$`, R`$\exists x \in \mathbb{R} : x^2 \le 0$`, R`$\exists x \in \mathbb{R} : x^2 < 0$`, R`$\forall x \in \mathbb{R},\ x^2 \le 0$`], corretta: 1, spiegazione: R`$\forall$ diventa $\exists$ e la proprietà si nega: il contrario di $x^2 > 0$ è $x^2 \le 0$, con l'uguale. La negazione è vera: $x = 0$ è un controesempio. Con $<$ invece di $\le$ lo zero si perde.` },
    { id: 'q-18', domanda: R`Quale frase è equivalente a «se un triangolo è equilatero, allora è isoscele»?`, opzioni: [R`«se un triangolo è isoscele, allora è equilatero»`, R`«se un triangolo non è equilatero, allora non è isoscele»`, R`«un triangolo è equilatero se e solo se è isoscele»`, R`«se un triangolo non è isoscele, allora non è equilatero»`], corretta: 3, spiegazione: R`È la contronominale, $\neg q \Rightarrow \neg p$: si scambiano ipotesi e tesi e si negano tutte e due. L'inversa e la frase con «se e solo se» sono false: un triangolo con due soli lati uguali è isoscele ma non equilatero. Anche negare senza scambiare dà una frase falsa.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`$1 \in \{1, 2\}$ ma $\{1\} \subseteq \{1, 2\}$. A sinistra di $\in$ c'è un elemento, a sinistra di $\subseteq$ un insieme.` },
    { tipo: 'errore', testo: R`$\varnothing$ non ha elementi, $\{0\}$ ne ha uno. Anche $\{\varnothing\}$ ne ha uno: l'insieme vuoto.` },
    { tipo: 'trucco', testo: R`Controllo rapido sull'unione: $|A \cup B|$ non supera mai $|A| + |B|$, e non è mai più piccolo del più grande fra $|A|$ e $|B|$.` },
    { tipo: 'metodo', testo: R`Nei problemi con il diagramma di Venn riempi le zone partendo dal centro, dove si sovrappongono tutti gli insiemi. Poi scendi verso le zone esterne, sottraendo.` },
    { tipo: 'errore', testo: R`La negazione di «tutti sono…» non è «nessuno è…», ma «almeno uno non è…». Basta un controesempio.` },
    { tipo: 'errore', testo: R`Da $p \Rightarrow q$ non segue $q \Rightarrow p$. Segue invece la contronominale: $\neg q \Rightarrow \neg p$.` },
    { tipo: 'trucco', testo: R`Per smontare la transitività cerca tre elementi: $a$ in relazione con $b$, $b$ con $c$, ma $a$ non con $c$. Con «è amico di» li trovi subito.` },
    { tipo: 'metodo', testo: R`In una tavola di verità con $n$ proposizioni le righe sono $2^n$. Nella prima colonna alterna V e F a blocchi di metà righe, nella seconda a blocchi di un quarto, e così via: così non salti nessun caso.` }
  ],

  aneddoti: [
    { matematico: 'John Venn', anni: '1834–1923', titolo: 'I cerchi di Venn, e una macchina da cricket', testo: R`John Venn era un sacerdote anglicano e insegnava logica a Cambridge, al Gonville and Caius College. Nel 1880 pubblicò un articolo su come rappresentare i ragionamenti con i disegni. Propose cerchi che si sovrappongono in tutti i modi possibili: con due insiemi le zone sono quattro, contando il fuori, con tre insiemi sono otto. L'idea dei cerchi non era del tutto nuova. Eulero li aveva usati nelle sue *Lettere a una principessa tedesca*, scritte fra il 1760 e il 1762. Venn però disegnava sempre tutte le zone, e ombreggiava quelle che dovevano restare vuote. Era anche un inventore curioso: costruì una macchina per lanciare le palle da cricket. Nel 1909, durante una visita della squadra australiana a Cambridge, la macchina eliminò più volte uno dei loro battitori migliori. Oggi una vetrata del suo college mostra tre cerchi colorati.`, legame: R`I diagrammi con cui si disegnano unione, intersezione e complementare portano il suo nome.` },
    { matematico: 'George Boole', anni: '1815–1864', titolo: 'Il figlio del calzolaio che fece i conti con la logica', testo: R`George Boole era figlio di un calzolaio di Lincoln, in Inghilterra. La famiglia non poteva pagargli gli studi, e lui imparò da solo il latino, il greco e la matematica. A sedici anni insegnava già in una scuola, per aiutare i genitori. Nel 1847 pubblicò un libretto, *L'analisi matematica della logica*, e nel 1854 il libro più famoso, *Le leggi del pensiero*. La sua idea era trattare i ragionamenti come calcoli: usava $1$ per «tutto», $0$ per «niente», e il connettivo «e» si comportava come una moltiplicazione. Nel 1849, senza nessuna laurea, era diventato professore di matematica a Cork, in Irlanda. Morì nel 1864, a quarantanove anni, di polmonite. Nel 1937 uno studente americano, Claude Shannon, mostrò che i circuiti elettrici con gli interruttori seguono le stesse regole dell'algebra di Boole. È una delle idee alla base dei computer.`, legame: R`Le tavole di verità con V e F sono l'algebra di Boole: nei computer V e F diventano $1$ e $0$.` },
    { matematico: 'Augustus De Morgan', anni: '1806–1871', titolo: 'Il professore che aveva x anni nell\'anno x al quadrato', testo: R`Augustus De Morgan nacque nel 1806 in India, dove il padre era ufficiale dell'esercito, e da piccolo perse la vista da un occhio. A poco più di vent'anni diventò il primo professore di matematica della nuova università di Londra, l'odierno University College. Era un uomo di principi: due volte lasciò la cattedra per protesta contro decisioni che riteneva ingiuste. Amava gli indovinelli. Sulla sua età diceva: «Avevo $x$ anni nell'anno $x^2$». La risposta è $43$ anni, nel 1849, perché $43^2 = 1849$. Nel 1847, lo stesso anno del primo libro di Boole, pubblicò un trattato di logica formale. Lì scrisse le regole per negare «e» e «o», che oggi portano il suo nome, anche se i logici medievali le conoscevano già. Nel 1865 fu il primo presidente della Società matematica di Londra.`, legame: R`Le leggi di De Morgan valgono due volte in questo argomento: per il complementare degli insiemi e per la negazione delle proposizioni.` },
    { matematico: 'Bertrand Russell', anni: '1872–1970', titolo: 'L\'insieme che non sa se contiene se stesso', testo: R`Nel 1901 il giovane Bertrand Russell si fece una domanda strana. Alcuni insiemi contengono se stessi come elemento: per esempio, l'insieme di tutte le cose che non sono gatti non è un gatto, quindi contiene se stesso. Considera allora l'insieme $R$ di tutti gli insiemi che **non** contengono se stessi. $R$ contiene se stesso? Se sì, per la sua definizione non dovrebbe. Se no, allora dovrebbe. Nel 1902 Russell lo scrisse in una lettera al logico tedesco Gottlob Frege. Frege stava per pubblicare il secondo volume della sua opera sui fondamenti dell'aritmetica, costruita proprio su questa idea libera di insieme. Fece in tempo solo ad aggiungere un'appendice, in cui ammetteva che le basi del suo lavoro vacillavano. Più tardi il paradosso fu raccontato anche con un barbiere che rade tutti e soli gli uomini del paese che non si radono da sé. E il barbiere, chi lo rade?`, legame: R`Non ogni proprietà definisce un insieme senza problemi: per questo oggi la teoria degli insiemi segue regole precise su quali insiemi si possono costruire.` }
  ]
});
})();
