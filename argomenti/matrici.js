(function () {
const R = String.raw;
/* Matrici e determinanti (istituti tecnici AFM/CAT, livello 2; utile anche al liceo). Ogni numero di teoria, esempi,
   esercizi, quiz e flashcard è stato ricalcolato con node (prodotti, determinanti, inverse, sistemi, costi).
   Gli esempi della teoria sono quelli dei video: la matrice (2 1; 1 3) manda (1; 0) in (2; 1), (0; 1) in (1; 3)
   e (1; 1) in (3; 4) (video muovere-il-piano); il quadratino diventa un parallelogramma di area 5 = 2 · 3 − 1 · 1,
   con (2 4; 1 2) si schiaccia (det 0), con le colonne scambiate (1 2; 3 1) si ribalta (det −5) (video determinante).
   Notazione: matrici fra tonde, determinanti fra barre come in sistemi-lineari; le colonne si dicono anche come
   coppie (2; 1) col punto e virgola; versori i⃗ = (1; 0), j⃗ = (0; 1) come in vettori. Nei grafici lettere semplici. */

/* ---- allenamento: risposte ---- */
const SIMB_M = [';', '−', '/'];
/* una matrice si scrive per righe: (1 2; 3 4) → «1; 2; 3; 4» oppure «1 2 3 4» */
const mat = (...v) => ({ tipo: 'numeri', valori: v, ordinati: true, segnaposto: 'per righe, es. 1; 0; 5; 2', simboli: SIMB_M });
const cop = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. (2; −7)', simboli: ['(', ')', ';', '−', '/'] });
const num = (v, seg, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.01, segnaposto: seg || 'un numero', simboli: ['−', '/'] });
const parola = (lista, seg, simboli) => ({ tipo: 'testo', accettate: lista, segnaposto: seg, simboli: simboli || [] });
const tipo = (m, n) => parola([m + 'x' + n, m + '×' + n, m + '*' + n, m + 'per' + n, m + 'righee' + n + 'colonne', m + 'righe' + n + 'colonne'], 'es. 5 × 1', ['×']);
const SI = parola(['sì', 'si', 'sì, esiste', 'si, esiste', 'esiste', 'sì esiste'], 'sì o no');
const NO = parola(['no', 'no, non esiste', 'non esiste', 'non si può', 'non si puo', 'no, non si può', 'no, non si puo'], 'sì o no');

/* ---- le figure ---- */
/* la quadrettatura deformata dalla matrice (a b; c d): l'immagine della retta x = k è k·(a; c) + t·(b; d) */
const RIGHE = [];
for (let k = -3; k <= 3; k++) {
  RIGHE.push({ tipo: 'segmento', da: [k + '*a - 9*b', k + '*c - 9*d'], a: [k + '*a + 9*b', k + '*c + 9*d'], colore: 4 });
  RIGHE.push({ tipo: 'segmento', da: [k + '*b - 9*a', k + '*d - 9*c'], a: [k + '*b + 9*a', k + '*d + 9*c'], colore: 4 });
}
/* l'immagine del punto (x; y) con la matrice (a b; c d) */
const IM = (x, y) => [x + '*a + ' + y + '*b', x + '*c + ' + y + '*d'];
/* la bandierina del video, dentro il quadratino: asta da (0,25; 0,15) a (0,25; 0,85), drappo fino a (0,75; 0,7) */
const ASTA = [[0.25, 0.15], [0.25, 0.85]], DRAPPO = [[0.25, 0.85], [0.75, 0.7], [0.25, 0.55]];

COMPASSO.registra({
  id: 'matrici',
  titolo: 'Matrici e determinanti',

  introduzione: R`Un negozio segna ogni mese quanti pezzi di ogni prodotto vende in ogni punto vendita. Ne viene una tabella di numeri, con una riga per negozio e una colonna per prodotto. Le **matrici** sono tabelle così, con le regole per fare i conti.

Le matrici sono dappertutto. Nei fogli di calcolo fanno i conti di prezzi, quantità e costi di produzione. Nei videogiochi ruotano e ingrandiscono le figure sullo schermo. Con le matrici si scrivono e si risolvono i sistemi di equazioni, anche con centinaia di incognite.

Ti servono i sistemi lineari, con il metodo di Cramer. Servono anche i vettori nel piano, con le componenti e il prodotto scalare.`,

  inBreve: [
    R`Una matrice $m \times n$ è una tabella con $m$ righe e $n$ colonne. Si sommano e si moltiplicano per un numero elemento per elemento, come i vettori.`,
    R`Il prodotto si fa **righe per colonne**: esiste solo se le colonne della prima sono tante quante le righe della seconda. E l'ordine conta: in generale $AB \ne BA$.`,
    R`Una matrice $2 \times 2$ muove il piano: la prima colonna dice dove va $(1; 0)$, la seconda dove va $(0; 1)$. Il resto del piano segue.`,
    R`Il determinante $ad - bc$ dice per quanto si moltiplicano le aree. Se è negativo la figura si ribalta; se è zero il piano si schiaccia su una retta.`,
    R`L'inversa esiste solo se il determinante non è zero. Con l'inversa il sistema $AX = B$ si risolve in un colpo: $X = A^{-1}B$.`
  ],

  sezioni: [
    { id: 'matrice', titolo: "Che cos'è una matrice", testo: R`Un negozio di bici ha due punti vendita, in centro e in stazione. A gennaio ha venduto caschi, luci e borracce. I numeri stanno bene in una tabella:

| | caschi | luci | borracce |
|---|---|---|---|
| centro | $4$ | $10$ | $7$ |
| stazione | $2$ | $5$ | $9$ |

Tolti i nomi, resta una tabella di numeri fra parentesi tonde:

$$A = \begin{pmatrix} 4 & 10 & 7 \\ 2 & 5 & 9 \end{pmatrix}$$

>* Una **matrice** è una tabella di numeri disposti in righe e colonne. Se ha $m$ righe e $n$ colonne, è di **tipo** $m \times n$, e si legge «$m$ per $n$». Prima le righe, poi le colonne.

$A$ ha $2$ righe e $3$ colonne: è di tipo $2 \times 3$. Le righe sono i punti vendita, le colonne i prodotti.

### Gli elementi

Ogni numero della tabella è un **elemento**. L'elemento nella riga $i$ e nella colonna $j$ si scrive $a_{ij}$. In $A$ vale $a_{13} = 7$: riga $1$, colonna $3$, cioè le borracce vendute in centro.

Due matrici sono **uguali** se hanno lo stesso tipo e gli stessi elementi, posto per posto.

?? Nella matrice $A$, quanto vale $a_{12}$?
[x] $10$
[ ] $2$
[ ] $4$
=> Prima la riga, poi la colonna: riga $1$ e colonna $2$, cioè le luci vendute in centro. Il $2$ è $a_{21}$, con riga e colonna scambiate. Il $4$ è $a_{11}$, il primo elemento.

### Matrici quadrate, righe e colonne

Se le righe sono tante quante le colonne, la matrice è **quadrata**. Una matrice quadrata ha una **diagonale principale**: va dall'angolo in alto a sinistra a quello in basso a destra. In $\begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$ la diagonale principale è fatta da $2$ e $3$.

Una matrice con una riga sola si chiama **matrice riga**; con una colonna sola, **matrice colonna**. Una matrice colonna come $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$ è un vettore scritto in piedi.

### La trasposta

>* La **trasposta** di $A$ si scrive $A^T$ e si ottiene scambiando le righe con le colonne. La prima riga diventa la prima colonna, la seconda riga la seconda colonna. Se $A$ è $m \times n$, $A^T$ è $n \times m$.

$$A^T = \begin{pmatrix} 4 & 2 \\ 10 & 5 \\ 7 & 9 \end{pmatrix}$$

Ora le righe sono i prodotti e le colonne i punti vendita. I dati sono gli stessi, letti nell'altro verso.

>! Il tipo si dice sempre righe per colonne. $A$ è $2 \times 3$, non $3 \times 2$: quella è la sua trasposta.` },

    { id: 'somma', titolo: 'Somma e prodotto per un numero', testo: R`A febbraio il negozio di bici vende ancora caschi, luci e borracce. Le vendite stanno in una matrice dello stesso tipo:

$$B = \begin{pmatrix} 3 & 8 & 5 \\ 6 & 4 & 2 \end{pmatrix}$$

Quanti pezzi in tutto, nei due mesi? Si sommano i numeri che stanno nello stesso posto.

>* La **somma** di due matrici dello **stesso tipo** si fa elemento per elemento: $(A + B)_{ij} = a_{ij} + b_{ij}$. Due matrici di tipo diverso non si sommano.

$$A + B = \begin{pmatrix} 7 & 18 & 12 \\ 8 & 9 & 11 \end{pmatrix}$$

Per esempio, i caschi venduti in centro sono $4 + 3 = 7$. Come con i numeri, l'ordine non conta: $A + B = B + A$.

La **matrice nulla** $O$ ha tutti gli elementi uguali a zero. Sommata a una matrice, la lascia com'è: $A + O = A$.

### La differenza

Anche la differenza si fa elemento per elemento. $B - A$ dice come sono cambiate le vendite da gennaio a febbraio:

$$B - A = \begin{pmatrix} -1 & -2 & -2 \\ 4 & -1 & -7 \end{pmatrix}$$

In stazione si sono venduti $4$ caschi in più e $7$ borracce in meno.

### Il prodotto per un numero

Anche un numero può moltiplicare una matrice.

>* Il **prodotto** di un numero $k$ per una matrice $A$ si fa moltiplicando **ogni** elemento per $k$: $(kA)_{ij} = k\,a_{ij}$.

Se a marzo le vendite di gennaio raddoppiano:

$$2A = \begin{pmatrix} 8 & 20 & 14 \\ 4 & 10 & 18 \end{pmatrix}$$

La matrice **opposta** di $A$ è $-A = (-1) \cdot A$, con tutti i segni cambiati. Si ha $A + (-A) = O$.

Sono le stesse regole dei vettori con le componenti. Un vettore come $(3; 1)$ è una piccola matrice con una riga.

?? Si possono sommare una matrice $2 \times 3$ e la sua trasposta?
[ ] Sì, perché hanno gli stessi numeri.
[x] No, perché sono di tipo diverso.
[ ] Sì, e il risultato è $2 \times 3$.
=> La trasposta è $3 \times 2$. Nella somma ogni elemento deve avere un compagno nello stesso posto: serve lo stesso tipo. Avere gli stessi numeri non basta.

>! Nel prodotto per un numero si moltiplicano **tutti** gli elementi, non solo la prima riga o la diagonale.` },

    { id: 'prodotto', titolo: 'Il prodotto righe per colonne', testo: R`Il negozio vende i caschi a $30$ euro, le luci a $12$ euro e le borracce a $8$ euro. Quanto ha incassato in centro a gennaio? Ogni quantità va moltiplicata per il suo prezzo, poi si somma:

$$4 \cdot 30 + 10 \cdot 12 + 7 \cdot 8 = 296$$

È la prima **riga** di $A$ per la **colonna** dei prezzi, che chiamiamo $P$. La seconda riga per la stessa colonna dà l'incasso in stazione, $192$ euro.

$$\begin{pmatrix} 4 & 10 & 7 \\ 2 & 5 & 9 \end{pmatrix} \begin{pmatrix} 30 \\ 12 \\ 8 \end{pmatrix} = \begin{pmatrix} 296 \\ 192 \end{pmatrix}$$

>* **Riga per colonna**: si moltiplicano gli elementi a coppie, il primo con il primo, il secondo con il secondo, e così via. Poi si sommano i prodotti. In $AB$, l'elemento di posto $ij$ è la riga $i$ di $A$ per la colonna $j$ di $B$.

È il prodotto scalare dei vettori, fatto fra una riga e una colonna.

### Quando si può fare

La riga e la colonna devono avere la stessa lunghezza. Quindi:

>* Il prodotto $AB$ esiste solo se le **colonne di $A$** sono tante quante le **righe di $B$**. Se $A$ è $m \times n$ e $B$ è $n \times p$, il prodotto $AB$ è $m \times p$.

Un trucco: scrivi i tipi uno accanto all'altro. I due numeri in mezzo devono essere uguali, quelli esterni danno il tipo del risultato.

$$\underset{2 \times 3}{A} \cdot \underset{3 \times 1}{P} = \underset{2 \times 1}{AP}$$

### Due matrici quadrate

Con $V = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$ e $W = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$ ogni elemento di $VW$ è un conto riga per colonna:

~ 2 \cdot 1 + 1 \cdot 2 = 4 :: prima riga di $V$ per prima colonna di $W$: è l'elemento in alto a sinistra
~ 2 \cdot 0 + 1 \cdot 1 = 1 :: prima riga per seconda colonna: in alto a destra
~ 1 \cdot 1 + 3 \cdot 2 = 7 :: seconda riga per prima colonna: in basso a sinistra
~ 1 \cdot 0 + 3 \cdot 1 = 3 :: seconda riga per seconda colonna: in basso a destra
~ VW = \evidb{\begin{pmatrix} 4 & 1 \\ 7 & 3 \end{pmatrix}} :: ogni risultato al suo posto

### L'ordine conta

Con l'ordine scambiato viene $WV = \begin{pmatrix} 2 & 1 \\ 5 & 5 \end{pmatrix}$, un'altra matrice.

>! Il prodotto di matrici **non è commutativo**: in generale $AB \ne BA$. A volte il prodotto al contrario non esiste nemmeno. Qui sopra $P$ è $3 \times 1$ e $A$ è $2 \times 3$: $PA$ non si può fare.

### La matrice identità

>* La **matrice identità** $I$ è quadrata, con $1$ sulla diagonale principale e $0$ altrove: $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$. Fa come il numero $1$: $AI = IA = A$.

Una matrice quadrata con tutti zeri fuori dalla diagonale principale si chiama **diagonale**. L'identità è la matrice diagonale con tutti $1$.

?? $A$ è di tipo $4 \times 2$ e $B$ di tipo $2 \times 3$. Che tipo ha $AB$?
[x] $4 \times 3$
[ ] $2 \times 2$
[ ] $AB$ non esiste.
=> Le colonne di $A$ sono $2$, come le righe di $B$: il prodotto esiste. I numeri esterni danno il tipo, $4 \times 3$. I due numeri in mezzo servono solo a controllare che il prodotto si possa fare.` },

    { id: 'trasformazioni', titolo: 'Matrici e trasformazioni del piano', testo: R`Una matrice $2 \times 2$ può muovere tutti i punti del piano. Il punto $(x; y)$ si scrive in colonna e si moltiplica per la matrice, riga per colonna.

[[video:matrici/muovere-il-piano]]

Con la matrice del video:

$$\begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 2x + y \\ x + 3y \end{pmatrix}$$

Il punto $(x; y)$ va in $(2x + y; \ x + 3y)$. Per esempio $(1; 1)$ va in $(3; 4)$.

### Le colonne dicono tutto

Guarda dove vanno i versori $\vec i = (1; 0)$ e $\vec j = (0; 1)$. Con $x = 1$ e $y = 0$ si trova $(2; 1)$: la prima colonna. Con $x = 0$ e $y = 1$ si trova $(1; 3)$: la seconda colonna.

>* Nella matrice di una trasformazione, la **prima colonna** è il punto dove va $(1; 0)$. La **seconda colonna** è il punto dove va $(0; 1)$. Con la matrice $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ il punto $(x; y)$ va in $(ax + by; \ cx + dy)$.

Il resto del piano segue. Il punto $(1; 1)$ è $\vec i + \vec j$, quindi va in $(2; 1) + (1; 3) = (3; 4)$. La quadrettatura si deforma, ma le sue linee restano dritte, parallele ed equidistanti. L'origine resta ferma.

[[grafico:gQuadrettatura]]

### Le trasformazioni che conosci

Molte trasformazioni dell'argomento «Trasformazioni geometriche» hanno una matrice. Per scriverla basta seguire $\vec i$ e $\vec j$.

| trasformazione | matrice |
|---|---|
| simmetria rispetto all'asse $x$ | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ |
| simmetria rispetto all'asse $y$ | $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ |
| simmetria rispetto a $y = x$ | $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ |
| rotazione di $90^\circ$ in senso antiorario | $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$ |
| omotetia di centro $O$ e rapporto $k$ | $\begin{pmatrix} k & 0 \\ 0 & k \end{pmatrix}$ |

Per esempio, la simmetria rispetto all'asse $x$ lascia $(1; 0)$ dov'è e manda $(0; 1)$ in $(0; -1)$. Le traslazioni invece non hanno una matrice: spostano anche l'origine.

### Una dopo l'altra

Fai prima la simmetria rispetto all'asse $x$, poi quella rispetto a $y = x$. Il risultato è la rotazione di $90^\circ$ in senso antiorario. Con le matrici:

$$\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

>* Fare prima la trasformazione di matrice $A$ e poi quella di matrice $B$ equivale a usare la matrice $BA$. A sinistra va la trasformazione fatta per ultima, come nella composizione $T_2 \circ T_1$.

Con l'ordine scambiato viene $\begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$: la rotazione di $90^\circ$ in senso orario. Ecco perché il prodotto non è commutativo: cambiando l'ordine delle mosse cambia il risultato.

?? Che trasformazione ha la matrice $\begin{pmatrix} 3 & 0 \\ 0 & 3 \end{pmatrix}$?
[ ] La traslazione di vettore $(3; 3)$.
[x] L'omotetia di centro $O$ e rapporto $3$.
[ ] La simmetria rispetto alla retta $y = x$.
=> Il punto $(x; y)$ va in $(3x; 3y)$: tutto si allontana dall'origine di un fattore $3$. Una traslazione sposterebbe anche l'origine, e nessuna matrice lo fa. La simmetria rispetto a $y = x$ ha gli zeri sulla diagonale.

>! Il punto va scritto in colonna, a destra della matrice. Con la riga a sinistra il conto si può fare, ma di solito dà un altro punto. Con $\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$, il punto $(1; 1)$ in colonna va in $(3; 1)$; come riga a sinistra dà $(1; 3)$.` },

    { id: 'determinante', titolo: 'Il determinante', testo: R`Una matrice muove il piano e deforma le figure. Di quanto si allargano? Lo dice un numero solo, il **determinante**.

[[video:matrici/determinante]]

>* Il **determinante** della matrice $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ è il numero $$\det A = \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$$ È il prodotto della diagonale principale meno il prodotto dell'altra diagonale.

Si scrive con le barre al posto delle parentesi. È lo stesso $D$ del metodo di Cramer, nell'argomento «Sistemi lineari».

### Un'area

Il quadratino di lato $1$ ha i lati su $\vec i$ e $\vec j$, e area $1$. La matrice $\begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$ lo trasforma in un parallelogramma, con i lati sulle colonne $(2; 1)$ e $(1; 3)$.

Per l'area, chiudi il parallelogramma in un rettangolo $3 \times 4$, di area $12$. Intorno restano sei pezzi: $1 + 1 + 1 + 1 + 1{,}5 + 1{,}5 = 7$. Il parallelogramma ha area $12 - 7 = 5$. E infatti $2 \cdot 3 - 1 \cdot 1 = 5$.

>* Il valore assoluto $|\det A|$ dice per quanto si moltiplicano **tutte** le aree. Il quadratino diventa una figura di area $|\det A|$. Una figura di area $S$ diventa una figura di area $|\det A| \cdot S$.

[[grafico:gDeterminante]]

### Il segno e lo zero

Con le colonne scambiate, $\begin{pmatrix} 1 & 2 \\ 3 & 1 \end{pmatrix}$, il parallelogramma è lo stesso. Ma il determinante è $1 \cdot 1 - 2 \cdot 3 = -5$. Il segno meno dice che la figura si è **ribaltata**, come in uno specchio. L'area è sempre $\lvert -5 \rvert = 5$.

Con $\begin{pmatrix} 2 & 4 \\ 1 & 2 \end{pmatrix}$ le colonne $(2; 1)$ e $(4; 2)$ stanno sulla stessa retta. Il quadratino si schiaccia su un segmento, che ha area $0$. E infatti $2 \cdot 2 - 4 \cdot 1 = 0$.

>* $\det A = 0$ se e solo se le due colonne stanno su una stessa retta per l'origine. Allora la matrice schiaccia tutto il piano su quella retta, o addirittura su un punto.

?? Quanto vale $\begin{vmatrix} 3 & 2 \\ 5 & 4 \end{vmatrix}$?
[x] $2$
[ ] $22$
[ ] $-2$
=> $3 \cdot 4 - 2 \cdot 5 = 12 - 10 = 2$. Con $22$ si sono sommati i due prodotti invece di sottrarli. Con $-2$ si è fatta la sottrazione al contrario.

>! Se moltiplichi la matrice per $2$, il determinante non raddoppia: diventa $4$ volte tanto. Ogni lato del parallelogramma raddoppia, quindi l'area quadruplica: $\det(kA) = k^2 \det A$.

> Anche il prodotto si comporta bene: $\det(AB) = \det A \cdot \det B$. Due trasformazioni di fila moltiplicano le aree due volte.` },

    { id: 'determinante-3x3', titolo: 'Il determinante di una matrice 3 × 3', testo: R`Anche una matrice quadrata $3 \times 3$ ha un determinante. Nello spazio dice per quanto si moltiplicano i volumi. Per calcolarlo ci sono due strade.

### La regola di Sarrus

>* **Regola di Sarrus.** Ricopia le prime due colonne a destra della matrice. Somma i prodotti delle tre diagonali che scendono verso destra. Togli i prodotti delle tre diagonali che salgono verso destra.

Prendi $M = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 2 & 1 & 1 \end{pmatrix}$. Con le due colonne ricopiate:

$$\left|\begin{array}{ccc} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 2 & 1 & 1 \end{array}\right| \begin{array}{cc} 1 & 2 \\ 0 & 1 \\ 2 & 1 \end{array}$$

~ 1 \cdot 1 \cdot 1 + 2 \cdot 4 \cdot 2 + 3 \cdot 0 \cdot 1 = \evid{17} :: le tre diagonali che scendono, partendo dagli elementi della prima riga
~ 2 \cdot 1 \cdot 3 + 1 \cdot 4 \cdot 1 + 1 \cdot 0 \cdot 2 = \evid{10} :: le tre diagonali che salgono, partendo dagli elementi dell'ultima riga
~ \det M = 17 - 10 = \evidb{7} :: le prime meno le seconde

>! La regola di Sarrus vale **solo** per le matrici $3 \times 3$. Per una $2 \times 2$ basta $ad - bc$. Per una $4 \times 4$ serve il metodo di Laplace.

### Un cenno al metodo di Laplace

Il metodo di Laplace riduce un determinante grande a determinanti più piccoli. Si sceglie una riga. Ogni suo elemento si moltiplica per il suo **minore complementare**. È il determinante che resta cancellando la riga e la colonna dell'elemento. I segni si alternano.

Lungo la prima riga di $M$:

$$\det M = 1 \begin{vmatrix} 1 & 4 \\ 1 & 1 \end{vmatrix} - 2 \begin{vmatrix} 0 & 4 \\ 2 & 1 \end{vmatrix} + 3 \begin{vmatrix} 0 & 1 \\ 2 & 1 \end{vmatrix}$$

Viene $1 \cdot (-3) - 2 \cdot (-8) + 3 \cdot (-2)$, cioè $-3 + 16 - 6 = 7$: lo stesso numero trovato con Sarrus.

>* **Sviluppo di Laplace.** Si sceglie una riga o una colonna. Il determinante è la somma dei suoi elementi, ognuno per il suo minore complementare con il segno giusto. I segni vanno a scacchiera, con $+$ nell'angolo in alto a sinistra.

Il minore con il suo segno si chiama **complemento algebrico**. Conviene scegliere la riga o la colonna con più zeri: i prodotti per zero non si calcolano. Il metodo vale per le matrici quadrate di ogni grandezza.

?? Quanto vale il determinante di $\begin{pmatrix} 2 & 5 & 1 \\ 0 & 3 & 7 \\ 0 & 0 & 4 \end{pmatrix}$?
[x] $24$
[ ] $9$
[ ] $0$
=> Sviluppando lungo la prima colonna resta solo $2 \cdot \begin{vmatrix} 3 & 7 \\ 0 & 4 \end{vmatrix} = 2 \cdot 12 = 24$. Con tutti zeri sotto la diagonale, il determinante è il prodotto della diagonale. $9$ è la sua somma. Gli zeri da soli non annullano il determinante.` },

    { id: 'inversa', titolo: 'La matrice inversa', testo: R`La matrice del video manda il punto $(1; 1)$ in $(3; 4)$. Si può tornare indietro? Serve una matrice che disfa il lavoro della prima: l'**inversa**.

>* L'**inversa** di una matrice quadrata $A$ è la matrice $A^{-1}$ tale che $AA^{-1} = A^{-1}A = I$. Fa per le matrici quello che $\frac{1}{5}$ fa per il numero $5$.

### La formula per le matrici 2 × 2

>* Se $\det A \ne 0$: $$\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$$ Si scambiano i due elementi della diagonale principale e si cambia segno agli altri due. Poi si divide per il determinante.

Con $A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$, che ha determinante $5$:

~ \begin{pmatrix} \evid{3} & \evid{-1} \\ \evid{-1} & \evid{2} \end{pmatrix} :: scambio il $2$ e il $3$, cambio segno ai due $1$
~ A^{-1} = \evidb{\frac{1}{5}} \begin{pmatrix} 3 & -1 \\ -1 & 2 \end{pmatrix} :: divido per il determinante, $5$
~ A^{-1} \begin{pmatrix} 3 \\ 4 \end{pmatrix} = \frac{1}{5} \begin{pmatrix} 9 - 4 \\ -3 + 8 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \end{pmatrix} :: controllo: $(3; 4)$ torna in $(1; 1)$

Un secondo controllo: $A$ per la matrice del primo passo dà $\begin{pmatrix} 5 & 0 \\ 0 & 5 \end{pmatrix}$. Diviso per $5$, è proprio $I$.

### Quando non esiste

Se il determinante è zero, l'inversa non c'è. La matrice $\begin{pmatrix} 2 & 4 \\ 1 & 2 \end{pmatrix}$ schiaccia il piano sulla retta $y = \frac{x}{2}$. Il punto $(2; -1)$ finisce nell'origine, proprio come l'origine stessa. Chi arriva nell'origine non sa più da dove è partito: non si torna indietro.

[[grafico:gSchiacciata]]

>* Una matrice quadrata ha l'inversa se e solo se il suo determinante è diverso da zero. Si dice allora **invertibile**.

È come per i numeri: ogni numero ha l'inverso, tranne lo zero. Per le matrici però non basta essere diverse dalla matrice nulla.

?? La matrice $\begin{pmatrix} 3 & 6 \\ 1 & 2 \end{pmatrix}$ ha l'inversa?
[ ] Sì, perché nessun elemento è zero.
[x] No, perché il determinante è zero.
[ ] Sì, ed è $\begin{pmatrix} 2 & -6 \\ -1 & 3 \end{pmatrix}$.
=> $3 \cdot 2 - 6 \cdot 1 = 0$: le colonne $(3; 1)$ e $(6; 2)$ stanno sulla stessa retta. Gli elementi diversi da zero non bastano. La matrice con gli elementi scambiati è il primo passo della formula, ma poi bisognerebbe dividere per zero.

>! L'inversa **non** si ottiene facendo l'inverso di ogni elemento. Per $A$, la matrice $\begin{pmatrix} 1/2 & 1 \\ 1 & 1/3 \end{pmatrix}$ moltiplicata per $A$ non dà $I$.` },

    { id: 'sistemi', titolo: 'I sistemi lineari con le matrici', testo: R`Un sistema lineare si scrive con una sola uguaglianza fra matrici. Prendi il sistema

$$\begin{cases} 2x + y = 7 \\ x + 3y = 11 \end{cases}$$

Con le matrici diventa:

$$\begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 7 \\ 11 \end{pmatrix}$$

Fai il prodotto riga per colonna: la prima riga dà $2x + y$, la seconda $x + 3y$. Sono i primi membri delle due equazioni.

>* **Forma matriciale** di un sistema: $AX = B$. $A$ è la **matrice dei coefficienti**, $X$ è la colonna delle incognite, $B$ è la colonna dei termini noti.

Ora il sistema ha anche un senso geometrico. La matrice è quella del video: quale punto $(x; y)$ va a finire in $(7; 11)$?

### Risolvere con l'inversa

Se $\det A \ne 0$, si moltiplicano i due membri per $A^{-1}$, a sinistra. Da $A^{-1}AX = A^{-1}B$ resta $X = A^{-1}B$.

~ A^{-1} = \frac{1}{5} \begin{pmatrix} 3 & -1 \\ -1 & 2 \end{pmatrix} :: l'inversa della sezione precedente
~ X = \frac{1}{5} \begin{pmatrix} 21 - 11 \\ -7 + 22 \end{pmatrix} = \frac{1}{5} \begin{pmatrix} 10 \\ 15 \end{pmatrix} :: riga per colonna con $(7; 11)$
~ X = \evidb{\begin{pmatrix} 2 \\ 3 \end{pmatrix}} :: la soluzione è $x = 2$, $y = 3$

Controllo: $2 \cdot 2 + 3 = 7$ e $2 + 3 \cdot 3 = 11$.

>! $A^{-1}$ va scritta a **sinistra** di $B$. Il prodotto $BA^{-1}$ non si può nemmeno fare: $B$ è $2 \times 1$ e $A^{-1}$ è $2 \times 2$.

### E il metodo di Cramer?

Il metodo di Cramer, che trovi in «Sistemi lineari», arriva allo stesso punto con i determinanti. Qui $D = \det A = 5$. Poi $D_x = \begin{vmatrix} 7 & 1 \\ 11 & 3 \end{vmatrix} = 10$ e $D_y = \begin{vmatrix} 2 & 7 \\ 1 & 11 \end{vmatrix} = 15$. Quindi $x = \frac{10}{5} = 2$ e $y = \frac{15}{5} = 3$.

>* Il sistema $AX = B$, con $A$ quadrata, ha **una sola soluzione** se e solo se $\det A \ne 0$. Con tre equazioni in tre incognite, Cramer funziona allo stesso modo: $x = \frac{D_x}{D}$, $y = \frac{D_y}{D}$, $z = \frac{D_z}{D}$.

I determinanti, ora, sono $3 \times 3$: si calcolano con Sarrus. Se invece $\det A = 0$, il sistema è impossibile o indeterminato. La matrice schiaccia il piano su una retta: $B$ o non si raggiunge, o si raggiunge da infiniti punti.

?? Quale sistema ha la matrice dei coefficienti $\begin{pmatrix} 1 & -2 \\ 4 & 0 \end{pmatrix}$?
[x] $\begin{cases} x - 2y = 3 \\ 4x = 8 \end{cases}$
[ ] $\begin{cases} x + 4y = 3 \\ -2x = 8 \end{cases}$
[ ] $\begin{cases} x - 2y = 3 \\ 4y = 8 \end{cases}$
=> Ogni riga è un'equazione. Gli elementi della prima colonna vanno con la $x$, quelli della seconda con la $y$. Scambiando righe e colonne si legge la trasposta. Nella seconda riga lo zero sta sotto la $y$: il $4$ va con la $x$.` },

    { id: 'applicazioni', titolo: 'Prezzi, quantità e costi di produzione', testo: R`Nelle aziende le matrici sono tabelle di dati, e il prodotto righe per colonne fa i conti. Un caso tipico sono i costi di produzione.

Una falegnameria fa tavoli e sedie. Per ogni pezzo servono legno, ore di lavoro e vernice:

| | legno (kg) | lavoro (ore) | vernice (litri) |
|---|---|---|---|
| tavolo | $20$ | $3$ | $1$ |
| sedia | $6$ | $1$ | $0{,}5$ |

Il legno costa $2$ euro al kg, il lavoro $25$ euro all'ora, la vernice $10$ euro al litro. Quanto costa fare un pezzo?

~ Q = \begin{pmatrix} 20 & 3 & 1 \\ 6 & 1 & 0{,}5 \end{pmatrix} \qquad C = \begin{pmatrix} 2 \\ 25 \\ 10 \end{pmatrix} :: la matrice dei consumi e la colonna dei costi unitari
~ QC = \begin{pmatrix} 40 + 75 + 10 \\ 12 + 25 + 5 \end{pmatrix} :: riga per colonna: ogni consumo per il suo costo, poi la somma
~ QC = \evidb{\begin{pmatrix} 125 \\ 42 \end{pmatrix}} :: un tavolo costa $125$ euro, una sedia $42$ euro

>* Perché un prodotto abbia senso, guarda le **colonne** della prima tabella e le **righe** della seconda. Devono parlare della stessa cosa. Qui le colonne di $Q$ e le righe di $C$ sono le tre risorse.

### Un ordine

Arriva un ordine di $4$ tavoli e $16$ sedie. Le quantità formano la matrice riga $R = \begin{pmatrix} 4 & 16 \end{pmatrix}$. Ora si possono fare due conti:

- $R \cdot QC = 4 \cdot 125 + 16 \cdot 42 = 1172$: è il costo totale, in euro;
- $RQ = \begin{pmatrix} 176 & 28 & 12 \end{pmatrix}$: sono i kg di legno, le ore di lavoro e i litri di vernice da procurarsi.

Con $RQ$ per $C$ si ritrova $176 \cdot 2 + 28 \cdot 25 + 12 \cdot 10 = 1172$. Non importa quale prodotto si fa prima: $(RQ)C = R(QC)$. È la proprietà **associativa**, che vale per tutti i prodotti di matrici.

Nei fogli di calcolo c'è una funzione apposta per il prodotto righe per colonne. Si chiama MATR.PRODOTTO.

?? La matrice $Q$ ha una riga per ogni prodotto e una colonna per ogni materiale. Per avere il costo di ogni prodotto, per che cosa la moltiplichi a destra?
[x] Per la colonna dei prezzi dei materiali.
[ ] Per la riga delle quantità ordinate.
[ ] Per la trasposta di $Q$.
=> Le colonne di $Q$ sono i materiali: vanno accoppiate con una colonna che parli di materiali, cioè i loro prezzi. Le quantità ordinate parlano di prodotti, e vanno a sinistra di $Q$. $QQ^T$ si può calcolare, ma non è un costo.

>! Il prodotto al contrario, $CQ$, non esiste: $C$ ha una colonna e $Q$ ha due righe. E quando il prodotto al contrario esiste, di solito non vuol dire niente.` }
  ],

  grafici: {
    gQuadrettatura: { tipo: 'piano', x: [-3, 6], y: [-2, 6], proporzioni: 'uguali',
      parametri: [
        { nome: 'a', min: -3, max: 4, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'c', min: -3, max: 4, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'b', min: -3, max: 4, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'd', min: -3, max: 4, passo: 0.5, valore: 3, nascosto: true }
      ],
      elementi: RIGHE.concat([
        { tipo: 'poligono', punti: [[0, 0], IM(1, 0), IM(1, 1), IM(0, 1)], colore: 3 },
        { tipo: 'vettore', da: [0, 0], a: ['a', 'c'], colore: 1 },
        { tipo: 'vettore', da: [0, 0], a: ['b', 'd'], colore: 2 },
        { tipo: 'punto', p: IM(1, 1), colore: 3, etichetta: '({{a + b}}; {{c + d}})', posizione: 'alto-destra' },
        { tipo: 'punto', p: ['a', 'c'], trascina: true, colore: 1, etichetta: '({{a}}; {{c}})', posizione: 'destra' },
        { tipo: 'punto', p: ['b', 'd'], trascina: true, colore: 2, etichetta: '({{b}}; {{d}})', posizione: 'alto-sinistra' }
      ]),
      didascalia: "La matrice del video manda (1; 0) nella prima colonna, in blu, e (0; 1) nella seconda, in arancio. Il quadratino diventa il parallelogramma verde e il punto (1; 1) va nel suo quarto vertice. Le linee viola sono la quadrettatura deformata. Se cambiano le colonne cambia tutta la quadrettatura, ma le sue linee restano dritte e parallele." },

    gDeterminante: { tipo: 'piano', x: [-3, 5], y: [-2, 5], proporzioni: 'uguali',
      parametri: [
        { nome: 'a', min: -3, max: 4, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'c', min: -3, max: 4, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'b', min: -3, max: 4, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'd', min: -3, max: 4, passo: 0.5, valore: 3, nascosto: true }
      ],
      elementi: [
        { tipo: 'segmento', da: [1, 0], a: [1, 1], colore: 4, tratteggio: true },
        { tipo: 'segmento', da: [0, 1], a: [1, 1], colore: 4, tratteggio: true },
        { tipo: 'poligono', punti: [[0, 0], IM(1, 0), IM(1, 1), IM(0, 1)], colore: 1 },
        { tipo: 'segmento', da: IM(ASTA[0][0], ASTA[0][1]), a: IM(ASTA[1][0], ASTA[1][1]), colore: 2 },
        { tipo: 'poligono', punti: DRAPPO.map(p => IM(p[0], p[1])), colore: 2 },
        { tipo: 'vettore', da: [0, 0], a: ['a', 'c'], colore: 1 },
        { tipo: 'vettore', da: [0, 0], a: ['b', 'd'], colore: 1 },
        { tipo: 'punto', p: ['a', 'c'], trascina: true, colore: 1, etichetta: '({{a}}; {{c}})', posizione: 'destra' },
        { tipo: 'punto', p: ['b', 'd'], trascina: true, colore: 1, etichetta: '({{b}}; {{d}})', posizione: 'alto-sinistra' },
        { tipo: 'testo', p: [-2.8, 4.5], testo: 'det = {{a*d - b*c}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.8, 3.8], testo: 'area = {{abs(a*d - b*c)}}', ancora: 'start' }
      ],
      didascalia: "Il quadratino tratteggiato ha area 1. La matrice con colonne (2; 1) e (1; 3) lo trasforma nel parallelogramma blu, di area 5 = det. La bandierina arancio mostra il verso: quando il determinante diventa negativo, si ribalta. Se le due colonne finiscono sulla stessa retta, il parallelogramma si schiaccia e l'area va a zero." },

    gSchiacciata: { tipo: 'piano', x: [-1, 7], y: [-2, 4], proporzioni: 'uguali',
      elementi: [
        { tipo: 'retta', per: [[0, 0], [2, 1]], colore: 4, tratteggio: true },
        { tipo: 'vettore', da: [0, 0], a: [4, 2], colore: 2 },
        { tipo: 'vettore', da: [0, 0], a: [2, 1], colore: 1 },
        { tipo: 'testo', p: [1.4, 0.3], testo: '(2; 1)' },
        { tipo: 'testo', p: [4.3, 1.6], testo: '(4; 2)' },
        { tipo: 'vettore', da: [1, 1], a: [6, 3], colore: 3, tratteggio: true },
        { tipo: 'punto', p: [1, 1], colore: 3, etichetta: 'P(1; 1)', posizione: 'alto' },
        { tipo: 'punto', p: [6, 3], colore: 3, etichetta: "P'(6; 3)", posizione: 'alto' },
        { tipo: 'vettore', da: [2, -1], a: [0, 0], colore: 2, tratteggio: true },
        { tipo: 'punto', p: [2, -1], colore: 2, etichetta: 'Q(2; −1)', posizione: 'destra' },
        { tipo: 'testo', p: [6, 2.3], testo: 'y = x/2' }
      ],
      didascalia: "Le colonne (2; 1) e (4; 2) stanno sulla retta y = x/2: la matrice manda tutto il piano su quella retta. P(1; 1) va in P'(6; 3). Q(2; −1) va nell'origine, come l'origine stessa: da lì non si può tornare indietro." }
  },

  esempi: [
    { titolo: 'Il prodotto di due matrici rettangolari', problema: R`Con $A = \begin{pmatrix} 1 & 0 & 2 \\ -1 & 3 & 1 \end{pmatrix}$ e $B = \begin{pmatrix} 2 & 1 \\ 0 & -1 \\ 3 & 4 \end{pmatrix}$, calcola $AB$. Che tipo ha $BA$?`, passi: [
      R`$A$ è $2 \times 3$ e $B$ è $3 \times 2$: i numeri in mezzo sono uguali, quindi $AB$ esiste ed è $2 \times 2$.`,
      R`Prima riga di $A$ per le due colonne di $B$: $1 \cdot 2 + 0 \cdot 0 + 2 \cdot 3 = 8$ e $1 \cdot 1 + 0 \cdot (-1) + 2 \cdot 4 = 9$.`,
      R`Seconda riga di $A$: $-1 \cdot 2 + 3 \cdot 0 + 1 \cdot 3 = 1$ e $-1 \cdot 1 + 3 \cdot (-1) + 1 \cdot 4 = 0$.`,
      R`Quindi $AB = \begin{pmatrix} 8 & 9 \\ 1 & 0 \end{pmatrix}$.`,
      R`$BA$ esiste anche lui: $B$ è $3 \times 2$ e $A$ è $2 \times 3$. Ma è di tipo $3 \times 3$. Non può essere uguale ad $AB$: non hanno nemmeno lo stesso tipo.`
    ], risultato: R`$AB = \begin{pmatrix} 8 & 9 \\ 1 & 0 \end{pmatrix}$; $BA$ è $3 \times 3$` },

    { titolo: 'La matrice di una trasformazione e le aree', problema: R`Trova la matrice che manda $(1; 0)$ in $(3; 1)$ e $(0; 1)$ in $(-1; 2)$. In che cosa trasforma il triangolo di vertici $O(0; 0)$, $P(2; 0)$, $Q(0; 1)$? Calcola l'area del triangolo trasformato.`, passi: [
      R`Le colonne sono le immagini dei versori: $M = \begin{pmatrix} 3 & -1 \\ 1 & 2 \end{pmatrix}$. Il punto $(x; y)$ va in $(3x - y; \ x + 2y)$.`,
      R`$O$ resta fermo. $P(2; 0)$ va in $(6; 2)$, cioè il doppio della prima colonna. $Q(0; 1)$ va in $(-1; 2)$, la seconda colonna.`,
      R`Il triangolo $OPQ$ ha i cateti lunghi $2$ e $1$: la sua area è $1$. Le aree si moltiplicano per $|\det M|$.`,
      R`$\det M = 3 \cdot 2 - (-1) \cdot 1 = 6 + 1 = 7$. Il determinante è positivo: il triangolo non si ribalta.`,
      R`Controllo con le coordinate: il triangolo $O$, $(6; 2)$, $(-1; 2)$ ha base orizzontale $7$ e altezza $2$. L'area è $\frac{7 \cdot 2}{2} = 7$.`
    ], risultato: R`$M = \begin{pmatrix} 3 & -1 \\ 1 & 2 \end{pmatrix}$; il triangolo $O(0; 0)$, $(6; 2)$, $(-1; 2)$ ha area $7$` },

    { titolo: 'Un determinante 3 × 3 in due modi', problema: R`Calcola il determinante di $N = \begin{pmatrix} 1 & 2 & -1 \\ 0 & 3 & 2 \\ 4 & 1 & 1 \end{pmatrix}$ con la regola di Sarrus, poi controlla con Laplace.`, passi: [
      R`Sarrus, diagonali che scendono: $1 \cdot 3 \cdot 1 + 2 \cdot 2 \cdot 4 + (-1) \cdot 0 \cdot 1$, cioè $3 + 16 + 0 = 19$.`,
      R`Diagonali che salgono: $(-1) \cdot 3 \cdot 4 + 1 \cdot 2 \cdot 1 + 2 \cdot 0 \cdot 1$, cioè $-12 + 2 + 0 = -10$.`,
      R`$\det N = 19 - (-10) = 29$. Attento al doppio meno: togliere $-10$ vuol dire aggiungere $10$.`,
      R`Laplace lungo la prima colonna, che ha uno zero: $\det N = 1 \begin{vmatrix} 3 & 2 \\ 1 & 1 \end{vmatrix} - 0 + 4 \begin{vmatrix} 2 & -1 \\ 3 & 2 \end{vmatrix}$. Il segno di $4$ è $+$, perché sta nella terza riga della prima colonna.`,
      R`I due determinanti $2 \times 2$ valgono $1$ e $7$. Quindi $\det N = 1 \cdot 1 + 4 \cdot 7 = 29$: i due metodi danno lo stesso numero.`
    ], risultato: R`$\det N = 29$` },

    { titolo: "L'inversa per risolvere un sistema", problema: R`Trova l'inversa di $A = \begin{pmatrix} 5 & 2 \\ 3 & 2 \end{pmatrix}$ e usala per risolvere $\begin{cases} 5x + 2y = 12 \\ 3x + 2y = 8 \end{cases}$`, passi: [
      R`$\det A = 5 \cdot 2 - 2 \cdot 3 = 4$. Non è zero, quindi l'inversa esiste.`,
      R`Scambio $5$ e $2$ sulla diagonale, cambio segno agli altri due, divido per $4$: $A^{-1} = \frac{1}{4} \begin{pmatrix} 2 & -2 \\ -3 & 5 \end{pmatrix}$.`,
      R`Il sistema è $AX = B$ con $B = \begin{pmatrix} 12 \\ 8 \end{pmatrix}$. Quindi $X = A^{-1}B = \frac{1}{4} \begin{pmatrix} 24 - 16 \\ -36 + 40 \end{pmatrix} = \frac{1}{4} \begin{pmatrix} 8 \\ 4 \end{pmatrix}$.`,
      R`$X = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$. Controllo: $5 \cdot 2 + 2 \cdot 1 = 12$ e $3 \cdot 2 + 2 \cdot 1 = 8$.`
    ], risultato: R`$A^{-1} = \frac{1}{4} \begin{pmatrix} 2 & -2 \\ -3 & 5 \end{pmatrix}$; $x = 2$, $y = 1$` },

    { titolo: 'Cramer con tre incognite', problema: R`Risolvi con la regola di Cramer: $\begin{cases} x + y + z = 6 \\ 2x - y + z = 3 \\ x + 2y - z = 2 \end{cases}$`, passi: [
      R`La matrice dei coefficienti è $\begin{pmatrix} 1 & 1 & 1 \\ 2 & -1 & 1 \\ 1 & 2 & -1 \end{pmatrix}$. Con Sarrus: $(1 + 1 + 4) - (-1 + 2 - 2)$, cioè $6 + 1 = 7$. Quindi $D = 7$, e il sistema ha una sola soluzione.`,
      R`$D_x$: i termini noti $6$, $3$, $2$ al posto della prima colonna. $D_x = \begin{vmatrix} 6 & 1 & 1 \\ 3 & -1 & 1 \\ 2 & 2 & -1 \end{vmatrix}$. Con Sarrus: $(6 + 2 + 6) - (-2 + 12 - 3)$, cioè $14 - 7 = 7$.`,
      R`$D_y$: i termini noti al posto della seconda colonna. $D_y = \begin{vmatrix} 1 & 6 & 1 \\ 2 & 3 & 1 \\ 1 & 2 & -1 \end{vmatrix}$. Con Sarrus: $(-3 + 6 + 4) - (3 + 2 - 12)$, cioè $7 + 7 = 14$.`,
      R`$D_z$: al posto della terza colonna. $D_z = \begin{vmatrix} 1 & 1 & 6 \\ 2 & -1 & 3 \\ 1 & 2 & 2 \end{vmatrix}$. Con Sarrus: $(-2 + 3 + 24) - (-6 + 6 + 4)$, cioè $25 - 4 = 21$.`,
      R`$x = \frac{7}{7} = 1$, $y = \frac{14}{7} = 2$, $z = \frac{21}{7} = 3$. Controllo nella seconda equazione: $2 - 2 + 3 = 3$.`
    ], risultato: R`$(x; y; z) = (1; 2; 3)$` },

    { titolo: 'Quando la matrice non è invertibile', problema: R`Per quali valori di $k$ la matrice $\begin{pmatrix} k & 3 \\ 2 & k + 1 \end{pmatrix}$ non ha l'inversa?`, passi: [
      R`L'inversa manca quando il determinante è zero. $\det = k(k + 1) - 3 \cdot 2 = k^2 + k - 6$.`,
      R`$k^2 + k - 6 = 0$ ha $\Delta = 1 + 24 = 25$, quindi $k = \frac{-1 \pm 5}{2}$: $k = 2$ oppure $k = -3$.`,
      R`Controllo con $k = 2$: la matrice è $\begin{pmatrix} 2 & 3 \\ 2 & 3 \end{pmatrix}$. Le colonne $(2; 2)$ e $(3; 3)$ stanno sulla bisettrice $y = x$.`,
      R`Con $k = -3$: $\begin{pmatrix} -3 & 3 \\ 2 & -2 \end{pmatrix}$. Le colonne $(-3; 2)$ e $(3; -2)$ sono opposte, quindi sulla stessa retta.`
    ], risultato: R`$k = 2$ oppure $k = -3$; per ogni altro $k$ l'inversa esiste` }
  ],

  formulario: [
    { nome: 'Tipo ed elementi', formula: R`A = (a_{ij}) \quad \text{di tipo } m \times n`, nota: R`$m$ righe e $n$ colonne. In $a_{ij}$ il primo indice è la riga, il secondo la colonna.` },
    { nome: 'Trasposta', formula: R`(A^T)_{ij} = a_{ji}`, nota: R`Le righe diventano colonne. Se $A$ è $m \times n$, $A^T$ è $n \times m$.` },
    { nome: 'Somma e prodotto per un numero', formula: R`(A + B)_{ij} = a_{ij} + b_{ij} \qquad (kA)_{ij} = k\,a_{ij}`, nota: R`La somma solo fra matrici dello stesso tipo.` },
    { nome: 'Prodotto righe per colonne', formula: R`(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj}`, nota: R`Se $A$ è $m \times n$ e $B$ è $n \times p$, $AB$ è $m \times p$. In generale $AB \ne BA$.` },
    { nome: 'Matrice identità', formula: R`I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \qquad AI = IA = A` },
    { nome: 'Matrice di una trasformazione', formula: R`\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}`, nota: R`La prima colonna è l'immagine di $(1; 0)$, la seconda di $(0; 1)$. Prima $A$ e poi $B$: matrice $BA$.` },
    { nome: 'Determinante 2 × 2', formula: R`\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc`, nota: R`$|\det A|$ moltiplica le aree; se $\det A < 0$ le figure si ribaltano; se $\det A = 0$ il piano si schiaccia.` },
    { nome: 'Regola di Sarrus', formula: R`\det = aei + bfg + cdh - ceg - afh - bdi`, nota: R`Per $A = \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix}$, e solo per le matrici $3 \times 3$: tre diagonali che scendono meno tre che salgono.` },
    { nome: 'Sviluppo di Laplace lungo la prima riga', formula: R`\det A = a_{11} C_{11} + a_{12} C_{12} + a_{13} C_{13}`, nota: R`$C_{ij} = (-1)^{i+j} M_{ij}$ è il complemento algebrico; $M_{ij}$ è il determinante senza la riga $i$ e la colonna $j$.` },
    { nome: 'Proprietà del determinante', formula: R`\det(AB) = \det A \cdot \det B`, nota: R`Per una matrice $2 \times 2$ vale anche $\det(kA) = k^2 \det A$; per una $3 \times 3$ il fattore è $k^3$.` },
    { nome: 'Inversa di una matrice 2 × 2', formula: R`\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}`, nota: R`Esiste solo se $ad - bc \ne 0$. Controllo: $AA^{-1} = I$.` },
    { nome: 'Sistema in forma matriciale', formula: R`AX = B \quad \Rightarrow \quad X = A^{-1}B`, nota: R`Vale se $\det A \ne 0$. Con Cramer: $x = \frac{D_x}{D}$, $y = \frac{D_y}{D}$, $z = \frac{D_z}{D}$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'matrice', tipo: 'definizione', fronte: R`Matrice di tipo $m \times n$`, retro: R`Una tabella di numeri con $m$ righe e $n$ colonne. Prima si dicono le righe, poi le colonne.` },
    { id: 'fc-02', sezione: 'matrice', tipo: 'definizione', fronte: R`Che cosa indica $a_{ij}$?`, retro: R`L'elemento nella riga $i$ e nella colonna $j$. In $a_{23}$: seconda riga, terza colonna.` },
    { id: 'fc-03', sezione: 'matrice', tipo: 'definizione', fronte: R`Matrice quadrata e diagonale principale`, retro: R`Quadrata: tante righe quante colonne. La diagonale principale va dall'angolo in alto a sinistra a quello in basso a destra: $a_{11}, a_{22}, \dots$` },
    { id: 'fc-04', sezione: 'matrice', tipo: 'definizione', fronte: R`Trasposta $A^T$`, retro: R`Si scambiano righe e colonne: la prima riga diventa la prima colonna. Se $A$ è $m \times n$, $A^T$ è $n \times m$.` },
    { id: 'fc-05', sezione: 'somma', tipo: 'procedura', fronte: R`Come si sommano due matrici?`, retro: R`Elemento per elemento, posto per posto. Solo se sono dello stesso tipo.` },
    { id: 'fc-06', sezione: 'somma', tipo: 'procedura', fronte: R`Come si moltiplica una matrice per un numero $k$?`, retro: R`Si moltiplica **ogni** elemento per $k$. La matrice opposta è $-A = (-1) \cdot A$.` },
    { id: 'fc-07', sezione: 'somma', tipo: 'definizione', fronte: R`Matrice nulla`, retro: R`Ha tutti gli elementi uguali a zero. Si scrive $O$, e $A + O = A$.` },
    { id: 'fc-08', sezione: 'prodotto', tipo: 'procedura', fronte: R`Prodotto righe per colonne: come si trova l'elemento di posto $ij$ di $AB$?`, retro: R`Riga $i$ di $A$ per colonna $j$ di $B$: si moltiplicano gli elementi a coppie e si sommano i prodotti.` },
    { id: 'fc-09', sezione: 'prodotto', tipo: 'concetto', fronte: R`Quando esiste il prodotto $AB$? Che tipo ha?`, retro: R`Quando le colonne di $A$ sono tante quante le righe di $B$. Con $A$ di tipo $m \times n$ e $B$ di tipo $n \times p$, $AB$ è $m \times p$.` },
    { id: 'fc-10', sezione: 'prodotto', tipo: 'concetto', fronte: R`$AB$ è uguale a $BA$?`, retro: R`In generale no: il prodotto di matrici non è commutativo. A volte $BA$ non esiste nemmeno.` },
    { id: 'fc-11', sezione: 'prodotto', tipo: 'definizione', fronte: R`Matrice identità $I$`, retro: R`Quadrata, con $1$ sulla diagonale principale e $0$ altrove. $AI = IA = A$, come il numero $1$.` },
    { id: 'fc-12', sezione: 'trasformazioni', tipo: 'concetto', fronte: R`Che cosa dicono le colonne della matrice di una trasformazione del piano?`, retro: R`La prima colonna è dove va $(1; 0)$, la seconda è dove va $(0; 1)$. Il resto del piano segue.` },
    { id: 'fc-13', sezione: 'trasformazioni', tipo: 'formula', fronte: R`Dove va il punto $(x; y)$ con la matrice $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$?`, retro: R`In $(ax + by; \ cx + dy)$: il punto si scrive in colonna e si moltiplica riga per colonna.` },
    { id: 'fc-14', sezione: 'trasformazioni', tipo: 'concetto', fronte: R`Prima la trasformazione di matrice $A$, poi quella di matrice $B$: quale matrice fa tutto insieme?`, retro: R`$BA$: a sinistra la trasformazione fatta per ultima, come in $T_2 \circ T_1$.` },
    { id: 'fc-15', sezione: 'trasformazioni', tipo: 'formula', fronte: R`Matrice della rotazione di $90^\circ$ in senso antiorario intorno all'origine`, retro: R`$\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$: manda $(1; 0)$ in $(0; 1)$ e $(0; 1)$ in $(-1; 0)$.` },
    { id: 'fc-16', sezione: 'determinante', tipo: 'formula', fronte: R`Determinante di $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$`, retro: R`$ad - bc$: prodotto della diagonale principale meno prodotto dell'altra.` },
    { id: 'fc-17', sezione: 'determinante', tipo: 'concetto', fronte: R`Che cosa dice il determinante di una matrice $2 \times 2$ sulle figure?`, retro: R`$|\det A|$ è il fattore per cui si moltiplicano le aree. Se $\det A < 0$ le figure si ribaltano.` },
    { id: 'fc-18', sezione: 'determinante', tipo: 'concetto', fronte: R`Quando $\det A = 0$?`, retro: R`Quando le due colonne stanno su una stessa retta per l'origine: la matrice schiaccia il piano su una retta, o su un punto.` },
    { id: 'fc-19', sezione: 'determinante-3x3', tipo: 'procedura', fronte: R`Regola di Sarrus`, retro: R`Solo per le $3 \times 3$. Si ricopiano le prime due colonne a destra; si sommano i prodotti delle tre diagonali che scendono e si tolgono quelli delle tre che salgono.` },
    { id: 'fc-20', sezione: 'determinante-3x3', tipo: 'procedura', fronte: R`Sviluppo di Laplace`, retro: R`Si sceglie una riga o una colonna. Ogni elemento si moltiplica per il determinante senza la sua riga e la sua colonna, con i segni a scacchiera; poi si somma.` },
    { id: 'fc-21', sezione: 'inversa', tipo: 'definizione', fronte: R`Matrice inversa $A^{-1}$`, retro: R`La matrice quadrata con $AA^{-1} = A^{-1}A = I$. Esiste se e solo se $\det A \ne 0$.` },
    { id: 'fc-22', sezione: 'inversa', tipo: 'formula', fronte: R`Inversa di $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$`, retro: R`$\frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$: si scambia la diagonale, si cambia segno agli altri due, si divide per il determinante.` },
    { id: 'fc-23', sezione: 'sistemi', tipo: 'formula', fronte: R`Forma matriciale di un sistema lineare e sua soluzione`, retro: R`$AX = B$, con $A$ matrice dei coefficienti. Se $\det A \ne 0$: $X = A^{-1}B$, con $A^{-1}$ a sinistra.` },
    { id: 'fc-24', sezione: 'sistemi', tipo: 'concetto', fronte: R`Un sistema quadrato $AX = B$ quando ha una sola soluzione?`, retro: R`Quando $\det A \ne 0$. Se $\det A = 0$ è impossibile o indeterminato.` },
    { id: 'fc-25', sezione: 'applicazioni', tipo: 'concetto', fronte: R`Matrice dei consumi $Q$ (prodotti × materiali) e colonna $C$ dei costi dei materiali: che cosa dà $QC$?`, retro: R`Il costo di ogni prodotto: per ogni riga, consumo per costo, sommati.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Di che tipo è la matrice $\begin{pmatrix} 3 & 0 \\ -1 & 2 \\ 5 & 1 \end{pmatrix}$?`, suggerimenti: [R`Conta prima le righe, poi le colonne.`], risposta: tipo(3, 2), soluzione: [R`Ha $3$ righe e $2$ colonne.`, R`È di tipo $3 \times 2$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Nella matrice $\begin{pmatrix} 7 & -2 & 5 \\ 0 & 4 & -3 \\ 6 & 1 & 8 \end{pmatrix}$, quanto vale l'elemento $a_{23}$?`, suggerimenti: [R`Il primo indice è la riga, il secondo la colonna.`], risposta: num(-3), soluzione: [R`Seconda riga: $0$, $4$, $-3$. Terza colonna: $-3$.`, R`$a_{23} = -3$. Attento a non confonderlo con $a_{32} = 1$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Scrivi la trasposta di $\begin{pmatrix} 1 & -4 & 0 \\ 2 & 5 & 3 \end{pmatrix}$, elemento per elemento, riga dopo riga.`, suggerimenti: [R`La prima riga diventa la prima colonna, la seconda riga la seconda colonna.`, R`La trasposta è $3 \times 2$: ha sei elementi.`], risposta: Object.assign(mat(1, 2, -4, 5, 0, 3), { segnaposto: 'es. 1; 0; 5; 2; 6; 7' }), soluzione: [R`Le colonne della trasposta sono $(1; -4; 0)$ e $(2; 5; 3)$.`, R`$\begin{pmatrix} 1 & 2 \\ -4 & 5 \\ 0 & 3 \end{pmatrix}$, cioè per righe $1; 2; -4; 5; 0; 3$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Calcola $\begin{pmatrix} 3 & -1 \\ 0 & 4 \end{pmatrix} + \begin{pmatrix} -5 & 2 \\ 6 & 1 \end{pmatrix}$. Scrivi gli elementi riga per riga.`, suggerimenti: [R`Somma i numeri che stanno nello stesso posto.`], risposta: mat(-2, 1, 6, 5), soluzione: [R`$\begin{pmatrix} 3 - 5 & -1 + 2 \\ 0 + 6 & 4 + 1 \end{pmatrix}$.`, R`$= \begin{pmatrix} -2 & 1 \\ 6 & 5 \end{pmatrix}$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Con $A = \begin{pmatrix} 1 & 2 \\ -1 & 0 \end{pmatrix}$ e $B = \begin{pmatrix} 0 & 3 \\ 2 & -1 \end{pmatrix}$, calcola $3A - 2B$. Scrivi gli elementi riga per riga.`, suggerimenti: [R`Prima moltiplica ogni elemento di $A$ per $3$ e ogni elemento di $B$ per $2$.`, R`Poi sottrai posto per posto.`], risposta: mat(3, 0, -7, 2), soluzione: [R`$3A = \begin{pmatrix} 3 & 6 \\ -3 & 0 \end{pmatrix}$ e $2B = \begin{pmatrix} 0 & 6 \\ 4 & -2 \end{pmatrix}$.`, R`$3A - 2B = \begin{pmatrix} 3 & 0 \\ -7 & 2 \end{pmatrix}$. Attento: $0 - (-2) = 2$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola il prodotto della riga $\begin{pmatrix} 2 & -1 & 3 \end{pmatrix}$ per la colonna $\begin{pmatrix} 4 \\ 1 \\ -2 \end{pmatrix}$.`, suggerimenti: [R`Il primo per il primo, il secondo per il secondo, il terzo per il terzo; poi somma.`], risposta: num(1), soluzione: [R`$2 \cdot 4 + (-1) \cdot 1 + 3 \cdot (-2) = 8 - 1 - 6$.`, R`$= 1$. Il risultato è un numero solo.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`$A$ è di tipo $3 \times 2$ e $B$ è di tipo $2 \times 5$. Di che tipo è il prodotto $AB$?`, suggerimenti: [R`Scrivi i tipi uno accanto all'altro: i numeri in mezzo devono coincidere, quelli esterni danno il tipo.`], risposta: tipo(3, 5), soluzione: [R`Le colonne di $A$ sono $2$, come le righe di $B$: il prodotto esiste.`, R`$AB$ è di tipo $3 \times 5$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Con le matrici dell'esercizio precedente, $A$ di tipo $3 \times 2$ e $B$ di tipo $2 \times 5$, il prodotto $BA$ esiste? Scrivi *sì* o *no*.`, suggerimenti: [R`Ora la prima matrice è $B$: confronta le sue colonne con le righe di $A$.`], risposta: NO, soluzione: [R`$B$ ha $5$ colonne, $A$ ha $3$ righe.`, R`$5 \ne 3$: $BA$ non esiste, anche se $AB$ esiste.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Calcola $\begin{pmatrix} 1 & 2 \\ 3 & -1 \end{pmatrix} \begin{pmatrix} 2 & 0 \\ 1 & 4 \end{pmatrix}$. Scrivi gli elementi riga per riga.`, suggerimenti: [R`Ogni elemento è una riga della prima per una colonna della seconda.`, R`In alto a sinistra: $1 \cdot 2 + 2 \cdot 1$.`], risposta: mat(4, 8, 5, -4), soluzione: [R`Prima riga: $1 \cdot 2 + 2 \cdot 1 = 4$ e $1 \cdot 0 + 2 \cdot 4 = 8$.`, R`Seconda riga: $3 \cdot 2 + (-1) \cdot 1 = 5$ e $3 \cdot 0 + (-1) \cdot 4 = -4$.`, R`Il prodotto è $\begin{pmatrix} 4 & 8 \\ 5 & -4 \end{pmatrix}$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Dove va il punto $(2; 1)$ con la matrice $\begin{pmatrix} 3 & -1 \\ 2 & 4 \end{pmatrix}$?`, suggerimenti: [R`Scrivi il punto in colonna, a destra della matrice, e fai riga per colonna.`], risposta: cop(5, 8), soluzione: [R`Prima riga: $3 \cdot 2 + (-1) \cdot 1 = 5$. Seconda riga: $2 \cdot 2 + 4 \cdot 1 = 8$.`, R`Il punto va in $(5; 8)$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Scrivi la matrice che manda $(1; 0)$ in $(-1; 2)$ e $(0; 1)$ in $(3; 0)$. Le immagini sono le colonne, ma gli elementi scrivili riga per riga.`, suggerimenti: [R`Le immagini dei versori sono le colonne della matrice.`], risposta: mat(-1, 3, 2, 0), soluzione: [R`Prima colonna $(-1; 2)$, seconda colonna $(3; 0)$.`, R`$\begin{pmatrix} -1 & 3 \\ 2 & 0 \end{pmatrix}$: per righe, $-1; 3; 2; 0$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Scrivi la matrice della simmetria rispetto all'asse $y$. Scrivi gli elementi riga per riga.`, suggerimenti: [R`Dove va $(1; 0)$ con lo specchio nell'asse $y$? E $(0; 1)$?`], risposta: mat(-1, 0, 0, 1), soluzione: [R`$(1; 0)$ va in $(-1; 0)$; $(0; 1)$ sta sull'asse e resta dov'è.`, R`La matrice è $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$: il punto $(x; y)$ va in $(-x; y)$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Calcola $\begin{vmatrix} 5 & 3 \\ 2 & 4 \end{vmatrix}$.`, suggerimenti: [R`Diagonale principale meno l'altra diagonale.`], risposta: num(14), soluzione: [R`$5 \cdot 4 - 3 \cdot 2 = 20 - 6$.`, R`$= 14$.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Calcola $\begin{vmatrix} -2 & 3 \\ 4 & -1 \end{vmatrix}$.`, suggerimenti: [R`$ad - bc$, con attenzione ai segni: $(-2) \cdot (-1)$ è positivo.`], risposta: num(-10), soluzione: [R`$(-2) \cdot (-1) - 3 \cdot 4 = 2 - 12$.`, R`$= -10$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Un parallelogramma ha un vertice nell'origine e i lati sui vettori $(3; 1)$ e $(1; 4)$. Calcola la sua area.`, suggerimenti: [R`È l'immagine del quadratino con la matrice che ha per colonne i due vettori.`, R`L'area è il valore assoluto del determinante.`], risposta: num(11, "l'area"), soluzione: [R`La matrice è $\begin{pmatrix} 3 & 1 \\ 1 & 4 \end{pmatrix}$, con determinante $3 \cdot 4 - 1 \cdot 1 = 11$.`, R`Il quadratino ha area $1$, quindi il parallelogramma ha area $11$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Per quale valore di $k$ il determinante di $\begin{pmatrix} k & 6 \\ 2 & 3 \end{pmatrix}$ vale zero?`, suggerimenti: [R`Scrivi il determinante con $k$ dentro e ponilo uguale a zero.`], risposta: num(4), soluzione: [R`$\det = 3k - 12$.`, R`$3k - 12 = 0$ per $k = 4$. Allora le colonne $(4; 2)$ e $(6; 3)$ sono allineate.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Calcola con la regola di Sarrus il determinante di $\begin{pmatrix} 2 & 0 & 1 \\ 1 & 3 & 0 \\ 0 & 1 & 2 \end{pmatrix}$.`, suggerimenti: [R`Ricopia le prime due colonne a destra.`, R`Le diagonali che scendono danno $2 \cdot 3 \cdot 2$, $0 \cdot 0 \cdot 0$ e $1 \cdot 1 \cdot 1$.`], risposta: num(13), soluzione: [R`Diagonali che scendono: $12 + 0 + 1 = 13$.`, R`Diagonali che salgono: $1 \cdot 3 \cdot 0 + 2 \cdot 0 \cdot 1 + 0 \cdot 1 \cdot 2 = 0$.`, R`Il determinante è $13 - 0 = 13$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Trova l'inversa di $\begin{pmatrix} 3 & 1 \\ 5 & 2 \end{pmatrix}$. Scrivi gli elementi riga per riga.`, suggerimenti: [R`Calcola prima il determinante.`, R`Scambia i due elementi della diagonale principale, cambia segno agli altri due, dividi per il determinante.`], risposta: mat(2, -1, -5, 3), soluzione: [R`$\det = 3 \cdot 2 - 1 \cdot 5 = 1$.`, R`L'inversa è $\begin{pmatrix} 2 & -1 \\ -5 & 3 \end{pmatrix}$: dividere per $1$ non cambia niente.`, R`Controllo: $\begin{pmatrix} 3 & 1 \\ 5 & 2 \end{pmatrix} \begin{pmatrix} 2 & -1 \\ -5 & 3 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Risolvi il sistema $\begin{pmatrix} 1 & 2 \\ 3 & 5 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 4 \\ 11 \end{pmatrix}$. Scrivi la soluzione come $(x; y)$.`, suggerimenti: [R`Puoi usare l'inversa o Cramer. Il determinante è $1 \cdot 5 - 2 \cdot 3$.`], risposta: cop(2, 1), soluzione: [R`$D = 5 - 6 = -1$, $D_x = \begin{vmatrix} 4 & 2 \\ 11 & 5 \end{vmatrix} = 20 - 22 = -2$, $D_y = \begin{vmatrix} 1 & 4 \\ 3 & 11 \end{vmatrix} = 11 - 12 = -1$.`, R`$x = \frac{-2}{-1} = 2$ e $y = \frac{-1}{-1} = 1$: la soluzione è $(2; 1)$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Il negozio Nord vende $5$ magliette e $3$ felpe, il negozio Sud $2$ magliette e $4$ felpe. Una maglietta costa $12$ euro, una felpa $25$ euro. Calcola l'incasso dei due negozi con un prodotto di matrici. Scrivi i due incassi come (Nord; Sud).`, suggerimenti: [R`Matrice delle quantità: una riga per negozio. Colonna dei prezzi: una riga per articolo.`], risposta: cop(135, 124), soluzione: [R`$\begin{pmatrix} 5 & 3 \\ 2 & 4 \end{pmatrix} \begin{pmatrix} 12 \\ 25 \end{pmatrix} = \begin{pmatrix} 60 + 75 \\ 24 + 100 \end{pmatrix}$.`, R`Nord incassa $135$ euro, Sud $124$ euro.`] },

    { id: 'es-01', difficolta: 2, testo: R`Con $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$, calcola $A^2 = AA$ e $A^3$. Indovina la regola e scrivi $A^5$. Scrivi gli elementi riga per riga.`, suggerimenti: [R`$A^3 = A^2 \cdot A$.`, R`Guarda l'elemento in alto a destra: come cresce?`], risposta: mat(1, 5, 0, 1), soluzione: [R`$A^2 = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$ e $A^3 = \begin{pmatrix} 1 & 3 \\ 0 & 1 \end{pmatrix}$.`, R`A ogni prodotto l'elemento in alto a destra cresce di $1$: $A^n = \begin{pmatrix} 1 & n \\ 0 & 1 \end{pmatrix}$.`, R`$A^5 = \begin{pmatrix} 1 & 5 \\ 0 & 1 \end{pmatrix}$. Nel piano, $A$ fa scivolare ogni punto in orizzontale di una quantità pari alla sua $y$.`] },
    { id: 'es-02', difficolta: 2, testo: R`Trova il valore di $a$ per cui le matrici $A = \begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}$ e $B = \begin{pmatrix} 1 & a \\ 0 & 3 \end{pmatrix}$ commutano, cioè $AB = BA$.`, suggerimenti: [R`Calcola $AB$ e $BA$ con $a$ dentro.`, R`Uguaglia gli elementi che non vengono già uguali.`], risposta: num(-2), soluzione: [R`$AB = \begin{pmatrix} 2 & 2a + 3 \\ 0 & 3 \end{pmatrix}$ e $BA = \begin{pmatrix} 2 & 1 + a \\ 0 & 3 \end{pmatrix}$.`, R`Serve $2a + 3 = 1 + a$, cioè $a = -2$.`, R`Controllo: con $a = -2$ tutti e due i prodotti valgono $\begin{pmatrix} 2 & -1 \\ 0 & 3 \end{pmatrix}$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Fai prima la simmetria rispetto all'asse $y$, poi la rotazione di $90^\circ$ in senso antiorario intorno all'origine. Scrivi la matrice della trasformazione composta, con gli elementi riga per riga. Che trasformazione è?`, suggerimenti: [R`Matrici: $S = \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ e $R = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$.`, R`La trasformazione fatta per ultima va a sinistra: calcola $RS$.`], risposta: mat(0, -1, -1, 0), soluzione: [R`$RS = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$, cioè $\begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}$.`, R`Il punto $(x; y)$ va in $(-y; -x)$. I punti della retta $y = -x$ restano fermi: per esempio $(1; -1)$ va in $(1; -1)$.`, R`È la simmetria rispetto alla retta $y = -x$. Il determinante è $-1$: la figura si ribalta e le aree non cambiano.`] },
    { id: 'es-04', difficolta: 2, testo: R`Il triangolo $A(1; 1)$, $B(3; 1)$, $C(1; 2)$ viene trasformato con la matrice $\begin{pmatrix} 2 & -1 \\ 1 & 3 \end{pmatrix}$. Calcola l'area del triangolo trasformato.`, suggerimenti: [R`Calcola prima l'area del triangolo di partenza.`, R`Le aree si moltiplicano per il valore assoluto del determinante.`], risposta: num(7, "l'area"), soluzione: [R`$ABC$ è rettangolo in $A$, con cateti $2$ e $1$: ha area $1$.`, R`Il determinante è $2 \cdot 3 - (-1) \cdot 1 = 7$, quindi l'area diventa $7$.`, R`Controllo: i vertici vanno in $(1; 4)$, $(5; 6)$, $(0; 7)$. Con i vettori $(4; 2)$ e $(-1; 3)$ dal primo vertice: $\frac{|4 \cdot 3 - 2 \cdot (-1)|}{2} = 7$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Con $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ e $B = \begin{pmatrix} 0 & 1 \\ 5 & 2 \end{pmatrix}$, trova $\det(AB)$ senza calcolare $AB$. Poi controlla calcolando $AB$.`, suggerimenti: [R`$\det(AB) = \det A \cdot \det B$.`], risposta: num(10), soluzione: [R`$\det A = 4 - 6 = -2$ e $\det B = 0 - 5 = -5$.`, R`$\det(AB) = (-2) \cdot (-5) = 10$.`, R`Controllo: $AB = \begin{pmatrix} 10 & 5 \\ 20 & 11 \end{pmatrix}$, e $10 \cdot 11 - 5 \cdot 20 = 110 - 100 = 10$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi con la regola di Cramer: $\begin{cases} x + y + z = 4 \\ 2x - y + z = 8 \\ x + 3y - 2z = -7 \end{cases}$ Scrivi la soluzione come $(x; y; z)$.`, suggerimenti: [R`Calcola $D$ con Sarrus. Poi metti i termini noti al posto di una colonna alla volta.`, R`Viene $D = 11$.`], risposta: { tipo: 'numeri', valori: [2, -1, 3], ordinati: true, segnaposto: 'es. (1; 0; −4)', simboli: ['(', ')', ';', '−'] }, soluzione: [R`$D = \begin{vmatrix} 1 & 1 & 1 \\ 2 & -1 & 1 \\ 1 & 3 & -2 \end{vmatrix}$. Con Sarrus: $(2 + 1 + 6) - (-1 + 3 - 4)$, cioè $9 + 2 = 11$.`, R`$D_x = \begin{vmatrix} 4 & 1 & 1 \\ 8 & -1 & 1 \\ -7 & 3 & -2 \end{vmatrix} = 22$, $D_y = \begin{vmatrix} 1 & 4 & 1 \\ 2 & 8 & 1 \\ 1 & -7 & -2 \end{vmatrix} = -11$, $D_z = \begin{vmatrix} 1 & 1 & 4 \\ 2 & -1 & 8 \\ 1 & 3 & -7 \end{vmatrix} = 33$.`, R`$x = 2$, $y = -1$, $z = 3$. Controllo nella terza equazione: $2 - 3 - 6 = -7$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Per quali valori di $k$ il sistema $\begin{cases} kx + 2y = 3 \\ 2x + ky = 3 \end{cases}$ **non** ha una sola soluzione? Che cosa succede in quei casi?`, suggerimenti: [R`Il sistema ha una sola soluzione se e solo se il determinante della matrice dei coefficienti non è zero.`, R`Per ogni valore trovato, riscrivi il sistema e guardalo.`], risposta: { tipo: 'numeri', valori: [2, -2], segnaposto: 'i valori di k, separati da ;', simboli: [';', '−'] }, soluzione: [R`$\det = k^2 - 4$, che vale zero per $k = 2$ e per $k = -2$.`, R`Con $k = 2$ le due equazioni sono $2x + 2y = 3$: sono la stessa. Il sistema è indeterminato.`, R`Con $k = -2$: $-2x + 2y = 3$ e $2x - 2y = 3$. Sommandole viene $0 = 6$: il sistema è impossibile.`] },
    { id: 'es-08', difficolta: 2, testo: R`In un negozio, $4$ caschi e $10$ luci costano in tutto $290$ euro; $2$ caschi e $7$ luci costano $175$ euro. Scrivi il problema come $AX = B$ e trova i due prezzi. Scrivi la risposta come (prezzo del casco; prezzo della luce).`, suggerimenti: [R`$A = \begin{pmatrix} 4 & 10 \\ 2 & 7 \end{pmatrix}$, $X$ è la colonna dei due prezzi.`, R`$\det A = 28 - 20 = 8$.`], risposta: cop(35, 15), soluzione: [R`$A^{-1} = \frac{1}{8} \begin{pmatrix} 7 & -10 \\ -2 & 4 \end{pmatrix}$.`, R`$X = A^{-1} \begin{pmatrix} 290 \\ 175 \end{pmatrix} = \frac{1}{8} \begin{pmatrix} 2030 - 1750 \\ -580 + 700 \end{pmatrix}$, cioè $\frac{1}{8} \begin{pmatrix} 280 \\ 120 \end{pmatrix}$.`, R`Il casco costa $35$ euro e la luce $15$ euro. Controllo: $4 \cdot 35 + 10 \cdot 15 = 290$ e $2 \cdot 35 + 7 \cdot 15 = 175$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Una pasticceria fa torte e crostate. Una torta richiede $0{,}5$ kg di farina, $0{,}25$ kg di burro e $4$ uova; una crostata $0{,}4$ kg di farina, $0{,}2$ kg di burro e $2$ uova. La farina costa $1{,}20$ euro al kg, il burro $9$ euro al kg, un uovo $0{,}25$ euro. Quanto costano gli ingredienti per $20$ torte e $30$ crostate, in euro?`, suggerimenti: [R`Matrice dei consumi: una riga per dolce, una colonna per ingrediente. Moltiplicala per la colonna dei costi.`, R`Poi moltiplica la riga delle quantità, $(20 \ \ 30)$, per i costi dei due dolci.`], risposta: num(160.4, 'in euro'), soluzione: [R`Costo di ogni dolce: $\begin{pmatrix} 0{,}5 & 0{,}25 & 4 \\ 0{,}4 & 0{,}2 & 2 \end{pmatrix} \begin{pmatrix} 1{,}2 \\ 9 \\ 0{,}25 \end{pmatrix} = \begin{pmatrix} 3{,}85 \\ 2{,}78 \end{pmatrix}$.`, R`Costo totale: $20 \cdot 3{,}85 + 30 \cdot 2{,}78$, cioè $77 + 83{,}4 = 160{,}4$ euro.`, R`Controllo per l'altra strada: servono $22$ kg di farina, $11$ kg di burro e $140$ uova. E $22 \cdot 1{,}2 + 11 \cdot 9 + 140 \cdot 0{,}25$ fa $26{,}4 + 99 + 35 = 160{,}4$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Trova la matrice $X$ tale che $\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} X = \begin{pmatrix} 3 & 5 \\ 2 & 4 \end{pmatrix}$. Scrivi gli elementi riga per riga.`, suggerimenti: [R`Moltiplica i due membri a sinistra per l'inversa della prima matrice.`, R`Attento all'ordine: $X = A^{-1}B$, non $BA^{-1}$.`], risposta: mat(1, 1, 1, 3), soluzione: [R`Con $A = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$: $\det A = 1$ e $A^{-1} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$.`, R`$X = A^{-1}B = \begin{pmatrix} 3 - 2 & 5 - 4 \\ -3 + 4 & -5 + 8 \end{pmatrix}$, cioè $\begin{pmatrix} 1 & 1 \\ 1 & 3 \end{pmatrix}$.`, R`Controllo: $\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & 3 \end{pmatrix} = \begin{pmatrix} 3 & 5 \\ 2 & 4 \end{pmatrix}$. Con $BA^{-1}$ si troverebbe un'altra matrice, sbagliata.`] },
    { id: 'es-11', difficolta: 3, testo: R`Il quadrato di vertici $(0; 0)$, $(2; 0)$, $(2; 2)$, $(0; 2)$ viene trasformato con la matrice $\begin{pmatrix} 1 & 3 \\ 2 & 1 \end{pmatrix}$. Calcola l'area della figura trasformata. La figura si ribalta?`, suggerimenti: [R`L'area del quadrato è $4$. Calcola il determinante.`, R`Il segno del determinante dice se la figura si ribalta.`], risposta: num(20, "l'area"), soluzione: [R`$\det = 1 \cdot 1 - 3 \cdot 2 = -5$.`, R`L'area diventa $\lvert -5 \rvert \cdot 4 = 20$.`, R`Il determinante è negativo: la figura si ribalta. Infatti $(1; 0)$ va in $(1; 2)$ e $(0; 1)$ in $(3; 1)$. Prima, dal primo lato al secondo si girava in senso antiorario; ora si gira in senso orario.`] },
    { id: 'es-12', difficolta: 3, testo: R`Calcola il determinante della matrice $4 \times 4$ $$\begin{pmatrix} 2 & 0 & 0 & 0 \\ 1 & 3 & 0 & 0 \\ 4 & 1 & -1 & 0 \\ 5 & 2 & 7 & 2 \end{pmatrix}$$ con lo sviluppo di Laplace.`, suggerimenti: [R`Sviluppa lungo la prima riga: ha un solo elemento diverso da zero.`, R`Il determinante $3 \times 3$ che resta ha di nuovo una prima riga quasi tutta di zeri.`], risposta: num(-12), soluzione: [R`Lungo la prima riga resta solo $2 \cdot \begin{vmatrix} 3 & 0 & 0 \\ 1 & -1 & 0 \\ 2 & 7 & 2 \end{vmatrix}$.`, R`Di nuovo lungo la prima riga: $3 \cdot \begin{vmatrix} -1 & 0 \\ 7 & 2 \end{vmatrix} = 3 \cdot (-2) = -6$.`, R`Il determinante è $2 \cdot (-6) = -12$: il prodotto degli elementi della diagonale, $2 \cdot 3 \cdot (-1) \cdot 2$. Succede sempre quando sopra la diagonale ci sono solo zeri.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Una matrice ha $3$ righe e $2$ colonne. Di che tipo è?`, opzioni: [R`$2 \times 3$`, R`$3 \times 2$`, R`$6$`, R`$5$`], corretta: 1, spiegazione: R`Il tipo si dice righe per colonne: $3 \times 2$. Con $2 \times 3$ si descrive la trasposta. $6$ è il numero degli elementi, che da solo non basta: anche una $1 \times 6$ ne ha sei.` },
    { id: 'q-02', domanda: R`Nell'elemento $a_{ij}$ di una matrice, che cosa indicano $i$ e $j$?`, opzioni: [R`la colonna e la riga`, R`il valore e la posizione`, R`la riga e la colonna`, R`il numero di righe e di colonne`], corretta: 2, spiegazione: R`Il primo indice è la riga, il secondo la colonna, come nel tipo $m \times n$. Il numero di righe e di colonne è il tipo della matrice, non la posizione di un elemento.` },
    { id: 'q-03', domanda: R`Quando si possono sommare due matrici?`, opzioni: [R`quando sono dello stesso tipo`, R`sempre`, R`quando sono quadrate`, R`quando le colonne della prima sono tante quante le righe della seconda`], corretta: 0, spiegazione: R`La somma è elemento per elemento: ogni posto deve esserci in tutte e due. Quadrate non basta, perché una $2 \times 2$ e una $3 \times 3$ non si sommano. La condizione sulle colonne e sulle righe è quella del prodotto.` },
    { id: 'q-04', domanda: R`$A$ è di tipo $2 \times 3$ e $B$ di tipo $3 \times 4$. Quale affermazione è vera?`, opzioni: [R`esistono sia $AB$ sia $BA$`, R`non esistono né $AB$ né $BA$`, R`esiste solo $BA$, di tipo $3 \times 3$`, R`esiste solo $AB$, di tipo $2 \times 4$`], corretta: 3, spiegazione: R`Per $AB$: le colonne di $A$ sono $3$ come le righe di $B$, e il tipo è $2 \times 4$. Per $BA$: $B$ ha $4$ colonne e $A$ ha $2$ righe, quindi non si può fare.` },
    { id: 'q-05', domanda: R`Per due matrici quadrate $A$ e $B$ dello stesso tipo, vale sempre $AB = BA$?`, opzioni: [R`sì, come per i numeri`, R`no: in generale $AB \ne BA$`, R`sì, se sono $2 \times 2$`, R`no: $BA$ non esiste mai`], corretta: 1, spiegazione: R`Il prodotto di matrici non è commutativo, nemmeno per le $2 \times 2$. Per esempio fare prima uno specchio e poi un altro dà una rotazione in un verso, e con l'ordine scambiato nel verso opposto. Fra quadrate dello stesso tipo, però, $BA$ esiste sempre.` },
    { id: 'q-06', domanda: R`Che cos'è la matrice identità?`, opzioni: [R`una matrice quadrata con tutti gli elementi uguali a $1$`, R`una matrice quadrata con tutti gli elementi uguali a $0$`, R`una matrice quadrata con $1$ sulla diagonale e $0$ altrove`, R`una matrice quadrata uguale alla sua trasposta`], corretta: 2, spiegazione: R`L'identità ha $1$ solo sulla diagonale principale, e fa come il numero $1$: $AI = IA = A$. Quella con tutti zeri è la matrice nulla. Una matrice con tutti $1$ non lascia invariati i prodotti.` },
    { id: 'q-07', domanda: R`Nella matrice di una trasformazione del piano, che cosa è la prima colonna?`, opzioni: [R`il punto dove va $(1; 0)$`, R`il punto dove va $(0; 1)$`, R`il punto dove va $(1; 1)$`, R`il punto che resta fermo`], corretta: 0, spiegazione: R`Moltiplicando la matrice per la colonna $(1; 0)$ si legge proprio la prima colonna. Dove va $(0; 1)$ lo dice la seconda colonna; $(1; 1)$ va nella somma delle due colonne.` },
    { id: 'q-08', domanda: R`Quale trasformazione **non** si può scrivere come $(x; y) \to (ax + by; \ cx + dy)$ con una matrice $2 \times 2$?`, opzioni: [R`la simmetria rispetto all'asse $x$`, R`la rotazione di $90^\circ$ intorno all'origine`, R`l'omotetia di centro $O$ e rapporto $2$`, R`la traslazione di vettore $(1; 0)$`], corretta: 3, spiegazione: R`Con una matrice l'origine resta sempre ferma: $(0; 0)$ va in $(0; 0)$. La traslazione invece sposta anche l'origine, in $(1; 0)$. Le altre tre lasciano ferma l'origine e hanno una matrice.` },
    { id: 'q-09', domanda: R`Una matrice $2 \times 2$ ha determinante $3$. Un triangolo di area $4$ viene trasformato con questa matrice. Che area ha il triangolo trasformato?`, opzioni: [R`$7$`, R`$12$`, R`$\frac{4}{3}$`, R`$4$`], corretta: 1, spiegazione: R`Ogni area si moltiplica per $|\det A| = 3$: $4 \cdot 3 = 12$. Le aree non si sommano al determinante e non si dividono. Restano uguali solo con un determinante uguale a $1$ o a $-1$.` },
    { id: 'q-10', domanda: R`Che cosa vuol dire che il determinante di una matrice $2 \times 2$ è negativo?`, opzioni: [R`che le aree diventano numeri negativi`, R`che la matrice non ha l'inversa`, R`che le figure si rimpiccioliscono sempre`, R`che le figure si ribaltano`], corretta: 3, spiegazione: R`Il segno dice il verso: con il segno meno la figura si ribalta. Le aree si moltiplicano per il valore assoluto, quindi restano positive. Una matrice con determinante negativo è invertibile, perché il determinante non è zero.` },
    { id: 'q-11', domanda: R`Il determinante di una matrice $2 \times 2$ è zero. Che cosa si può dire?`, opzioni: [R`le due colonne sono allineate con l'origine`, R`almeno un elemento della matrice è zero`, R`è la matrice nulla, con tutti zeri`, R`è la matrice identità`], corretta: 0, spiegazione: R`Con $\det A = 0$ le colonne sono allineate e il piano si schiaccia. Gli zeri fra gli elementi non c'entrano: $\begin{pmatrix} 2 & 4 \\ 1 & 2 \end{pmatrix}$ non ne ha, eppure il suo determinante è zero. L'identità ha determinante $1$.` },
    { id: 'q-12', domanda: R`Per quali matrici vale la regola di Sarrus?`, opzioni: [R`per tutte le matrici quadrate`, R`solo per le $3 \times 3$`, R`solo per le $2 \times 2$`, R`anche per le matrici rettangolari`], corretta: 1, spiegazione: R`Sarrus ricopia due colonne e prende tre diagonali per verso: funziona solo con tre righe e tre colonne. Per le $2 \times 2$ si usa $ad - bc$, per le più grandi lo sviluppo di Laplace. Le matrici rettangolari non hanno determinante.` },
    { id: 'q-13', domanda: R`Quando una matrice quadrata ha l'inversa?`, opzioni: [R`quando nessuno dei suoi elementi è uguale a zero`, R`sempre`, R`quando il determinante è diverso da zero`, R`quando è diversa dalla matrice nulla`], corretta: 2, spiegazione: R`Serve $\det A \ne 0$: se il piano si schiaccia, non si torna indietro. Una matrice senza zeri può avere determinante zero, come $\begin{pmatrix} 3 & 6 \\ 1 & 2 \end{pmatrix}$. Non basta nemmeno essere diversa dalla matrice nulla.` },
    { id: 'q-14', domanda: R`Qual è l'inversa di $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, se $ad - bc \ne 0$?`, opzioni: [R`$\begin{pmatrix} 1/a & 1/b \\ 1/c & 1/d \end{pmatrix}$`, R`$\frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$`, R`$\frac{1}{ad - bc} \begin{pmatrix} a & c \\ b & d \end{pmatrix}$`, R`$\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$`], corretta: 1, spiegazione: R`Si scambiano gli elementi della diagonale, si cambia segno agli altri due e si divide per il determinante. Senza la divisione il prodotto con la matrice dà $(ad - bc)\,I$, non $I$. Gli inversi elemento per elemento non funzionano, e la trasposta divisa per il determinante nemmeno.` },
    { id: 'q-15', domanda: R`Il sistema $AX = B$ ha $\det A \ne 0$. Come si scrive la soluzione?`, opzioni: [R`$X = A^{-1}B$`, R`$X = BA^{-1}$`, R`$X = \frac{B}{A}$`, R`$X = AB$`], corretta: 0, spiegazione: R`Si moltiplicano i due membri per $A^{-1}$ a sinistra, dove sta $A$: resta $X = A^{-1}B$. $BA^{-1}$ non si può nemmeno fare, perché $B$ è una colonna. La divisione fra matrici non esiste: il suo posto lo prende l'inversa.` },
    { id: 'q-16', domanda: R`$A$ è una matrice $2 \times 2$ con $\det A = 5$. Quanto vale $\det(2A)$?`, opzioni: [R`$10$`, R`$7$`, R`$25$`, R`$20$`], corretta: 3, spiegazione: R`Moltiplicare per $2$ raddoppia tutte e due le colonne: l'area del parallelogramma diventa $4$ volte tanto. Quindi $\det(2A) = 2^2 \cdot 5 = 20$. $10$ è l'errore tipico: il fattore $2$ conta una volta per ogni colonna.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Il tipo di una matrice si dice righe per colonne. Una tabella con $2$ righe e $3$ colonne è $2 \times 3$, non $3 \times 2$.` },
    { tipo: 'trucco', testo: R`Prima di moltiplicare, scrivi i tipi in fila: $(2 \times 3)(3 \times 4)$. I numeri in mezzo devono essere uguali, quelli esterni danno il tipo del risultato.` },
    { tipo: 'errore', testo: R`Il prodotto di matrici non si fa posto per posto. Ogni elemento del risultato è una riga per una colonna.` },
    { tipo: 'errore', testo: R`$AB$ e $BA$ di solito sono diversi. Non scambiare mai l'ordine dei fattori, nemmeno per risolvere $AX = B$: $X = A^{-1}B$.` },
    { tipo: 'trucco', testo: R`Per scrivere la matrice di una trasformazione, segui solo $(1; 0)$ e $(0; 1)$: le loro immagini sono le due colonne.` },
    { tipo: 'metodo', testo: R`Dopo aver trovato un'inversa, controlla: la matrice per la sua inversa deve dare l'identità. Bastano quattro conti.` },
    { tipo: 'errore', testo: R`Nella regola di Sarrus le tre diagonali che salgono si **sottraggono**, con il loro segno. Se un prodotto è già negativo, togliendolo diventa una somma.` },
    { tipo: 'trucco', testo: R`Per un determinante grande, scegli la riga o la colonna con più zeri e sviluppa con Laplace lungo quella.` },
    { tipo: 'metodo', testo: R`Con prezzi e quantità, dai un nome alle righe e alle colonne di ogni tabella. Le colonne della prima e le righe della seconda devono parlare della stessa cosa.` }
  ],

  aneddoti: [
    { matematico: 'James Joseph Sylvester', anni: '1814–1897', titolo: 'Il nome preso dalla parola grembo', testo: R`James Joseph Sylvester studiò matematica a Cambridge e nel 1837 superò gli esami finali fra i primi. Ma non ebbe la laurea: era ebreo, e per laurearsi bisognava aderire alla Chiesa d'Inghilterra. Per anni lavorò come attuario per una compagnia di assicurazioni, e intanto studiò legge. Nel 1850, in un articolo, chiamò **matrix** una tabella rettangolare di numeri. In latino *matrix* vuol dire grembo, ed è parente di *mater*, madre. Per Sylvester la tabella era la madre dei determinanti: cancellando righe e colonne se ne ricavano tanti. Il nome restò. Più tardi Sylvester insegnò negli Stati Uniti, alla Johns Hopkins, e nel 1878 fondò l'*American Journal of Mathematics*.`, legame: R`I determinanti che «nascono» cancellando una riga e una colonna sono i minori complementari dello sviluppo di Laplace.` },
    { matematico: 'Arthur Cayley', anni: '1821–1895', titolo: "L'avvocato che inventò l'algebra delle matrici", testo: R`Arthur Cayley si laureò a Cambridge nel 1842, primo del suo anno. Per restare all'università avrebbe dovuto prendere gli ordini religiosi, e non volle. Così per quattordici anni fece l'avvocato a Londra. Nel tempo libero scrisse circa duecentocinquanta articoli di matematica. Fra gli avvocati conobbe Sylvester, e i due diventarono amici per la vita. Nel 1858 Cayley pubblicò una *Memoria sulla teoria delle matrici*. Per la prima volta le matrici erano trattate come numeri di un tipo nuovo: si sommavano, si moltiplicavano, avevano un'inversa. Cayley notò che nel prodotto l'ordine conta. Nel 1863 tornò a Cambridge come professore, e accettò di guadagnare molto meno che in tribunale.`, legame: R`Somma, prodotto righe per colonne e inversa sono le operazioni messe in ordine nella Memoria del 1858.` },
    { matematico: 'Max Born', anni: '1882–1970', titolo: 'Le tabelle di Heisenberg erano matrici', testo: R`Nel giugno del 1925 il giovane fisico Werner Heisenberg aveva una forte febbre da fieno. Per guarire andò sull'isola di Helgoland, nel Mare del Nord, quasi senza pollini. Lì trovò un modo nuovo di descrivere gli atomi, con tabelle di numeri. Ma c'era una stranezza: moltiplicando due tabelle, il risultato cambiava con l'ordine. Tornato a Gottinga, consegnò il lavoro al suo professore, Max Born. Born riconobbe subito quelle tabelle: erano matrici, e la stranezza era il prodotto righe per colonne. Le aveva studiate da ragazzo, all'università di Breslavia. Con Pascual Jordan, e poi con lo stesso Heisenberg, scrisse le regole della «meccanica delle matrici». Era nata la meccanica quantistica. Heisenberg ebbe il Nobel per il 1932, Born nel 1954.`, legame: R`La stranezza di Heisenberg è il prodotto non commutativo: $AB \ne BA$.` },
    { matematico: 'Wassily Leontief', anni: '1905–1999', titolo: "L'economia di un paese in una tabella", testo: R`Wassily Leontief crebbe a San Pietroburgo e lasciò l'Unione Sovietica nel 1925. Dopo il dottorato a Berlino lavorò a Kiel. Nel 1931 si trasferì negli Stati Uniti, e dal 1932 insegnò a Harvard. Lì costruì una tabella dell'economia americana, con una riga e una colonna per ogni settore: agricoltura, acciaio, trasporti e così via. Ogni casella diceva quanto un settore compra da un altro per produrre. La presentò nel 1936 e la sviluppò in un libro del 1941. Con questa matrice si risponde a domande concrete: se serve più acciaio, quanta energia e quanto carbone servono? Il conto richiede l'inversa di una matrice con decine di righe. Per questo Leontief fu fra i primi economisti a usare i calcolatori. Nel 1973 ebbe il premio Nobel per l'economia.`, legame: R`Le tavole di Leontief sono matrici di consumi, come la tabella della falegnameria, e si usano con prodotti e inverse.` }
  ]
});
})();
