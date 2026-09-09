(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'calcolo-combinatorio',
  titolo: 'Calcolo combinatorio',

  introduzione: R`Il calcolo combinatorio risponde a una domanda sola, ripetuta in mille forme: **in quanti modi si può fare una certa cosa?** Quante targhe diverse esistono, quanti anagrammi ha una parola, quante commissioni di tre persone si possono formare in una classe, quante colonne diverse si possono giocare a Superenalotto. Contare non significa elencare: quando i casi sono milioni, l'elenco è impossibile e serve una formula.

Serve in prima battuta alla probabilità: la definizione classica dice che la probabilità di un evento è il rapporto fra casi favorevoli e casi possibili, e per calcolare quel rapporto bisogna saper contare bene sia il numeratore sia il denominatore. Ma il calcolo combinatorio si incontra anche altrove: nella lunghezza di una password, nel numero di partite possibili a scacchi, nel numero di modi in cui si possono distribuire i turni di un torneo.

Gli strumenti da conoscere già sono pochi: le potenze, le frazioni e la capacità di leggere con attenzione un testo. È soprattutto questo, in realtà, l'ostacolo vero: la formula giusta si sceglie **dopo** aver capito se nel problema conta l'ordine e se gli elementi si possono ripetere.`,

  sezioni: [
    { id: 'principio-conteggio', titolo: 'Il principio fondamentale del conteggio', testo: R`Se ho 2 magliette e 3 paia di pantaloni, per sapere quanti completi diversi posso indossare non serve elencarli: per ognuna delle 2 magliette ci sono 3 pantaloni possibili, quindi i completi sono $2 \cdot 3 = 6$.

>* **Principio fondamentale del conteggio (regola del prodotto):** se una scelta si compone di $k$ scelte successive, la prima realizzabile in $n_1$ modi, la seconda in $n_2$ modi, ..., la $k$-esima in $n_k$ modi, allora il numero totale di modi è $$n_1 \cdot n_2 \cdot \ldots \cdot n_k.$$

Il **diagramma ad albero** rende visibile il conto: dalla radice escono 2 rami (le magliette), da ciascuno ne escono altri 3 (i pantaloni). I percorsi completi dalla radice alle foglie sono 6, e ogni percorso è un completo.

[[grafico:albero]]

La condizione da rispettare è che il numero di possibilità di un passo non dipenda da *quale* scelta è stata fatta al passo precedente: solo così i rami sono tutti larghi uguali e si può moltiplicare. Nell'albero questo si vede benissimo, perché tutti i nodi di uno stesso livello hanno lo stesso numero di figli.

Un esempio serio: quante targhe italiane esistono nella forma due lettere, tre cifre, due lettere, se le lettere ammesse sono 22? Si moltiplicano le sette scelte: $22 \cdot 22 \cdot 10 \cdot 10 \cdot 10 \cdot 22 \cdot 22 = 22^4 \cdot 10^3 = 234\,256\,000$.

>! Non confondere la regola del prodotto con il **principio della somma**. Se le scelte sono *successive* («un antipasto **e** un primo») i modi si moltiplicano; se sono *alternative* e si escludono a vicenda («un antipasto **oppure** un primo») i modi si sommano. Con 4 antipasti e 6 primi: 24 pasti completi, ma 10 piatti singoli.` },

    { id: 'fattoriale', titolo: 'Il fattoriale', testo: R`Quasi tutte le formule del calcolo combinatorio si scrivono con il fattoriale.

>* **Fattoriale:** per $n$ intero positivo, $$n! = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot n.$$ Si pone inoltre, per definizione, $0! = 1$.

Così $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$, $5! = 120$, $6! = 720$. Vale la relazione ricorsiva $n! = n \cdot (n-1)!$, che è il modo più rapido per passare da un fattoriale al successivo: $7! = 7 \cdot 720 = 5040$.

La posizione $0! = 1$ non è un capriccio. Da un lato serve perché la relazione ricorsiva continui a valere anche per $n = 1$: da $1! = 1 \cdot 0!$ segue $0! = 1$. Dall'altro ha un significato: c'è esattamente **un** modo di ordinare zero oggetti, cioè non fare niente. Come il prodotto di nessun fattore, che vale 1.

Il fattoriale cresce in modo impressionante, più in fretta di qualunque esponenziale: $10! = 3\,628\,800$, $13! = 6\,227\,020\,800$ supera già i sei miliardi, e $20! \approx 2{,}4 \cdot 10^{18}$. Nel grafico puoi confrontare $2^x$ e $x^3$ e leggere, per il valore di $n$ scelto, quanto valgono $n!$ e $2^n$: il fattoriale stacca tutti.

[[grafico:crescita]]

Nelle formule il fattoriale non va quasi mai calcolato per intero: conviene semplificare. Per esempio $\dfrac{10!}{8!} = \dfrac{10 \cdot 9 \cdot 8!}{8!} = 10 \cdot 9 = 90$, e $\dfrac{(n+1)!}{n!} = n+1$.

>! Il fattoriale non si distribuisce: $\dfrac{10!}{8!} \ne \left(\dfrac{10}{8}\right)!$ e $(a+b)! \ne a! + b!$. Con $a = b = 2$: $4! = 24$, mentre $2! + 2! = 4$.` },

    { id: 'disposizioni', titolo: 'Le disposizioni', testo: R`Si parla di disposizioni quando si scelgono $k$ elementi fra $n$ e **l'ordine conta**: cambiando l'ordine si ottiene un raggruppamento diverso.

>* **Disposizioni semplici** di $n$ elementi di classe $k$ (con $k \le n$, senza ripetizioni): $$D_{n,k} = n(n-1)(n-2)\cdots(n-k+1) = \frac{n!}{(n-k)!}$$

La forma da usare a mano è la prima: si moltiplicano $k$ fattori consecutivi decrescenti a partire da $n$. Il motivo è la regola del prodotto: per il primo posto ci sono $n$ scelte, per il secondo ne restano $n-1$, e così via fino al $k$-esimo posto, dove ne restano $n-k+1$.

Esempio: in una gara con 8 atleti, in quanti modi si può formare il podio (oro, argento, bronzo)? L'ordine conta e nessuno può occupare due posti, quindi $D_{8,3} = 8 \cdot 7 \cdot 6 = 336$.

>* **Disposizioni con ripetizione** di $n$ elementi di classe $k$: $$D'_{n,k} = n^k$$ Qui ogni elemento può essere riusato, quindi $k$ può essere anche maggiore di $n$.

Ogni posto ha sempre tutte le $n$ possibilità, perché quanto scelto prima resta disponibile: $n \cdot n \cdot \ldots \cdot n$, con $k$ fattori.

Esempio: quanti PIN di 4 cifre esistono? $D'_{10,4} = 10^4 = 10\,000$, da 0000 a 9999. Quante colonne diverse ci sono in una schedina di 13 partite con tre esiti possibili? $3^{13} = 1\,594\,323$.

>! La domanda da farsi è sempre la stessa: *lo stesso elemento può comparire due volte?* Se sì, $n^k$; se no, $\dfrac{n!}{(n-k)!}$. Con 5 elementi di classe 3 si passa da $125$ a $60$: non è una differenza da poco.` },

    { id: 'permutazioni', titolo: 'Le permutazioni e gli anagrammi', testo: R`Una **permutazione** è un modo di mettere in fila *tutti* gli elementi disponibili: è il caso $k = n$ delle disposizioni semplici.

>* **Permutazioni semplici** di $n$ oggetti distinti: $$P_n = n!$$ Infatti $D_{n,n} = \dfrac{n!}{0!} = n!$, e qui si vede a cosa serve la convenzione $0! = 1$.

Esempi: gli anagrammi (anche senza senso) della parola ROMA sono $4! = 24$; i modi di disporre 10 libri su uno scaffale sono $10! = 3\,628\,800$; i modi di far sedere 6 persone su 6 sedie sono $6! = 720$.

Quando però alcuni oggetti sono **indistinguibili**, scambiarli fra loro non produce una fila nuova, e $n!$ conta più volte lo stesso risultato.

>* **Permutazioni con ripetizione:** se fra $n$ oggetti ce ne sono $n_1$ uguali fra loro, $n_2$ uguali fra loro, ..., $n_h$ uguali fra loro (con $n_1 + n_2 + \ldots + n_h = n$), le disposizioni distinte sono $$P_n^{(n_1,\, n_2,\, \ldots,\, n_h)} = \frac{n!}{n_1! \cdot n_2! \cdot \ldots \cdot n_h!}$$

Esempio: gli anagrammi di MAMMA. Le lettere sono 5, con la M ripetuta 3 volte e la A ripetuta 2 volte, quindi $\dfrac{5!}{3! \cdot 2!} = \dfrac{120}{12} = 10$. In effetti le tre M sono uguali: le loro $3! = 6$ permutazioni interne danno sempre la stessa parola, e lo stesso vale per le due A.

Esempio più impegnativo: MATEMATICA ha 10 lettere, con A ripetuta 3 volte, M e T ripetute 2 volte ciascuna. Gli anagrammi sono $\dfrac{10!}{3! \cdot 2! \cdot 2!} = \dfrac{3\,628\,800}{24} = 151\,200$.

>! Si divide per il **fattoriale** delle molteplicità, non per le molteplicità: per MAMMA il denominatore è $3! \cdot 2! = 12$, non $3 \cdot 2 = 6$. Le lettere che compaiono una volta sola contribuiscono con $1! = 1$ e si possono ignorare.` },

    { id: 'combinazioni', titolo: 'Le combinazioni e il coefficiente binomiale', testo: R`Nelle disposizioni l'ordine conta. Ma se devo scegliere 3 rappresentanti fra 8 studenti, la terna Anna-Bruno-Carla è la stessa di Carla-Anna-Bruno: qui l'ordine **non** conta.

>* **Combinazioni semplici** di $n$ elementi di classe $k$ ($k \le n$): i sottoinsiemi di $k$ elementi distinti scelti fra $n$, senza tenere conto dell'ordine. $$C_{n,k} = \binom{n}{k} = \frac{D_{n,k}}{k!} = \frac{n!}{k!\,(n-k)!}$$

Il ragionamento è questo: ogni gruppo di $k$ elementi, se lo si ordina, produce $k!$ disposizioni diverse. Le disposizioni sono dunque $k!$ volte più numerose delle combinazioni, e per passare dalle une alle altre si divide per $k!$.

Il simbolo $\binom{n}{k}$ si legge «$n$ su $k$» e si chiama **coefficiente binomiale**.

Esempio: quante commissioni di 3 persone si possono formare in un gruppo di 8? $$\binom{8}{3} = \frac{8 \cdot 7 \cdot 6}{3!} = \frac{336}{6} = 56.$$

Esempio: in una stanza con 10 persone che si salutano tutte, quante strette di mano avvengono? Una stretta di mano è una coppia non ordinata: $\binom{10}{2} = \dfrac{10 \cdot 9}{2} = 45$.

Il conto pratico più comodo è $\dfrac{n(n-1)\cdots(n-k+1)}{k!}$: $k$ fattori sopra e $k!$ sotto. Per il Superenalotto, $\binom{90}{6} = 622\,614\,630$.

### Combinazioni con ripetizione (cenno)

Se lo stesso elemento può essere scelto più volte e l'ordine non conta (per esempio 3 palline di gelato scegliendo fra 5 gusti, anche ripetuti), il numero di scelte è $$C'_{n,k} = \binom{n+k-1}{k}.$$ Nel caso del gelato: $\binom{7}{3} = 35$.

>! Chiedersi sempre se l'ordine cambia il risultato. «Podio» sì (oro e argento non sono la stessa cosa), «commissione» no. Con 8 elementi di classe 3 la differenza è fra $336$ e $56$.` },

    { id: 'proprieta-binomiale', titolo: 'Proprietà del coefficiente binomiale e triangolo di Tartaglia', testo: R`I coefficienti binomiali hanno proprietà che permettono di calcolarli senza fattoriali.

- **Casi limite:** $\binom{n}{0} = \binom{n}{n} = 1$ (c'è un solo modo di non scegliere nulla, e uno solo di prendere tutto) e $\binom{n}{1} = \binom{n}{n-1} = n$.
- **Simmetria:** $\binom{n}{k} = \binom{n}{n-k}$. Scegliere i $k$ elementi che entrano equivale a scegliere gli $n-k$ che restano fuori. Per esempio $\binom{20}{18} = \binom{20}{2} = 190$.
- **Formula di Stifel:** $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$, per $1 \le k \le n-1$. Fissato un elemento, i gruppi di $k$ o lo contengono (e allora restano $k-1$ posti da riempire fra $n-1$) oppure no (e allora tutti i $k$ posti si scelgono fra gli altri $n-1$).
- **Somma di una riga:** $\displaystyle\sum_{k=0}^{n} \binom{n}{k} = 2^n$: è il numero di tutti i sottoinsiemi di un insieme di $n$ elementi, perché ogni elemento o c'è o non c'è.

La formula di Stifel genera il **triangolo di Tartaglia**: si parte da 1, ogni riga comincia e finisce con 1 e ogni altro numero è la somma dei due che gli stanno sopra.

$$\begin{matrix} & & & 1 & & & \\ & & 1 & & 1 & & \\ & 1 & & 2 & & 1 & \\ 1 & & 3 & & 3 & & 1 \end{matrix}$$

La riga $n$ (contando da 0) contiene i coefficienti $\binom{n}{0}, \binom{n}{1}, \ldots, \binom{n}{n}$. Le righe sono simmetriche, il massimo sta al centro e la somma dei numeri della riga $n$ vale $2^n$: la riga 6, qui sotto, somma $1+6+15+20+15+6+1 = 64 = 2^6$.

[[grafico:binomiali]]

Quella forma "a campana" non è casuale: è la stessa che si vede quando tante palline cadono in una macchina di Galton, deviando a destra o a sinistra a ogni chiodo.

[[animazione:galton]]

>! $\binom{n}{k}$ è sempre un numero **intero**, anche se la formula contiene una divisione. Se ti viene un numero con la virgola, hai sbagliato un conto.` },

    { id: 'binomio-newton', titolo: 'Il binomio di Newton', testo: R`I coefficienti binomiali si chiamano così perché compaiono nello sviluppo delle potenze di un binomio. Si conoscono già i primi casi: $(a+b)^2 = a^2 + 2ab + b^2$ e $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. I coefficienti $1, 2, 1$ e $1, 3, 3, 1$ sono le righe 2 e 3 del triangolo di Tartaglia.

>* **Binomio di Newton:** per ogni $n$ intero positivo $$(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k.$$

Il motivo è combinatorio: $(a+b)^n$ è il prodotto di $n$ fattori uguali, e sviluppando si sceglie da ciascun fattore o $a$ o $b$. Un termine contiene $b^k$ quando si è scelto $b$ in $k$ fattori su $n$: i modi di farlo sono $\binom{n}{k}$, ed è quello il coefficiente.

Da qui si leggono le regole pratiche dello sviluppo:

- i termini sono $n+1$;
- l'esponente di $a$ scende da $n$ a 0, quello di $b$ sale da 0 a $n$, e la loro somma è sempre $n$;
- il **termine generale** (quello di posto $k+1$) è $\binom{n}{k}a^{n-k}b^k$;
- i coefficienti sono la riga $n$ del triangolo di Tartaglia, quindi simmetrici;
- ponendo $a = b = 1$ si ritrova che la somma dei coefficienti vale $2^n$.

Esempio: $$(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4.$$

Se un termine è negativo basta trattarlo come tale. Per $(2x-1)^3$ si pone $a = 2x$ e $b = -1$:
$$(2x-1)^3 = (2x)^3 + 3(2x)^2(-1) + 3(2x)(-1)^2 + (-1)^3 = 8x^3 - 12x^2 + 6x - 1.$$
I segni si alternano, perché le potenze pari di $-1$ danno $+1$ e quelle dispari $-1$.

>! Quando $a$ o $b$ non sono lettere semplici vanno messi **tra parentesi** ed elevati per intero: in $(2x-1)^3$ il primo termine è $(2x)^3 = 8x^3$, non $2x^3$.` },

    { id: 'riconoscere', titolo: 'Come riconoscere il raggruppamento', testo: R`La difficoltà vera non è calcolare, è capire quale formula usare. Due domande bastano quasi sempre.

>* 1. **Conta l'ordine?** Cioè: scambiando due elementi ottengo un raggruppamento diverso? 2. **Gli elementi si possono ripetere?**

| Ordine | Ripetizioni | Raggruppamento | Formula |
|---|---|---|---|
| sì | sì | disposizioni con ripetizione | $n^k$ |
| sì | no | disposizioni semplici | $\dfrac{n!}{(n-k)!}$ |
| sì, tutti gli elementi | no | permutazioni | $n!$ |
| sì, con elementi uguali | — | permutazioni con ripetizione | $\dfrac{n!}{n_1!\cdots n_h!}$ |
| no | no | combinazioni | $\dbinom{n}{k}$ |
| no | sì | combinazioni con ripetizione | $\dbinom{n+k-1}{k}$ |

Una terza domanda utile: **li prendo tutti o solo alcuni?** Se $k = n$ e non ci sono ripetizioni si è nel caso delle permutazioni.

I problemi ricorrenti, con la loro etichetta:

- **targhe, PIN, password, colonne di una schedina, risultati di lanci ripetuti**: ordine sì, ripetizioni sì → $n^k$;
- **podio, primi tre classificati, assegnare cariche diverse (presidente, vice, segretario)**: ordine sì, ripetizioni no → $D_{n,k}$;
- **anagrammi**: permutazioni, con ripetizione se ci sono lettere uguali;
- **commissioni, squadre, strette di mano, mani di carte, sottoinsiemi, diagonali di un poligono**: ordine no → $\binom{n}{k}$;
- **percorsi su un reticolo**: si conta *quali* passi sono verticali.

Quest'ultimo merita un esempio. Per andare da $A$ a $B$ nella griglia $3 \times 3$ muovendosi solo a destra (D) o in alto (A), ogni percorso è una parola di 6 lettere con 3 D e 3 A: basta decidere quali 3 dei 6 passi sono verso l'alto. I percorsi sono $\binom{6}{3} = 20$.

[[grafico:reticolo]]

>! Se il problema aggiunge un vincolo («almeno una vocale», «i due fratelli non insieme»), spesso conviene contare **tutti** i casi e poi togliere quelli che non vanno bene.` }
  ],

  grafici: {
    albero: {
      tipo: 'piano', x: [0, 10], y: [0, 7], assi: false, griglia: false, proporzioni: 'libere',
      elementi: [
        { tipo: 'segmento', da: [0.8, 3.5], a: [4, 5.4], colore: 1 },
        { tipo: 'segmento', da: [0.8, 3.5], a: [4, 1.6], colore: 1 },
        { tipo: 'segmento', da: [4, 5.4], a: [7.6, 6.6], colore: 3 },
        { tipo: 'segmento', da: [4, 5.4], a: [7.6, 5.4], colore: 3 },
        { tipo: 'segmento', da: [4, 5.4], a: [7.6, 4.2], colore: 3 },
        { tipo: 'segmento', da: [4, 1.6], a: [7.6, 2.8], colore: 3 },
        { tipo: 'segmento', da: [4, 1.6], a: [7.6, 1.6], colore: 3 },
        { tipo: 'segmento', da: [4, 1.6], a: [7.6, 0.4], colore: 3 },
        { tipo: 'punto', p: [0.8, 3.5], etichetta: 'inizio', posizione: 'sinistra' },
        { tipo: 'punto', p: [4, 5.4], etichetta: 'A', posizione: 'alto', colore: 1 },
        { tipo: 'punto', p: [4, 1.6], etichetta: 'B', posizione: 'basso', colore: 1 },
        { tipo: 'punto', p: [7.6, 6.6], etichetta: 'A1', posizione: 'destra', colore: 3 },
        { tipo: 'punto', p: [7.6, 5.4], etichetta: 'A2', posizione: 'destra', colore: 3 },
        { tipo: 'punto', p: [7.6, 4.2], etichetta: 'A3', posizione: 'destra', colore: 3 },
        { tipo: 'punto', p: [7.6, 2.8], etichetta: 'B1', posizione: 'destra', colore: 3 },
        { tipo: 'punto', p: [7.6, 1.6], etichetta: 'B2', posizione: 'destra', colore: 3 },
        { tipo: 'punto', p: [7.6, 0.4], etichetta: 'B3', posizione: 'destra', colore: 3 },
        { tipo: 'testo', p: [0.4, 6.6], testo: '2 magliette (A, B) × 3 pantaloni (1, 2, 3) = 6 completi', ancora: 'start' }
      ],
      didascalia: 'Diagramma ad albero: 2 rami al primo livello, 3 rami da ciascuno al secondo. Le foglie sono 2 · 3 = 6.'
    },
    crescita: {
      tipo: 'piano', x: [1, 10], y: [0, 1150], passo: [1, 200], proporzioni: 'libere',
      etichette: { x: 'n', y: 'valore' },
      funzioni: [
        { f: '2^x', etichetta: 'y = 2ˣ', colore: 1, dominio: [1, 10] },
        { f: 'x^3', etichetta: 'y = x³', colore: 3, dominio: [1, 10] }
      ],
      elementi: [
        { tipo: 'verticale', x: 'n', tratteggio: true, colore: 4 },
        { tipo: 'testo', p: [1.3, 1080], testo: 'n = {{n}}     n! = {{fact(n)}}     2ⁿ = {{2^n}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'n', min: 1, max: 10, passo: 1, valore: 5, etichetta: 'n' }],
      didascalia: 'Muovi n: la potenza 2ⁿ supera il cubo n³ solo da n = 10, ma il fattoriale n! li lascia entrambi indietro molto prima.'
    },
    binomiali: {
      tipo: 'barre',
      categorie: ['0', '1', '2', '3', '4', '5', '6'],
      valori: [1, 6, 15, 20, 15, 6, 1],
      etichettaX: 'k', etichettaY: 'C(6, k)',
      didascalia: 'La riga n = 6 del triangolo di Tartaglia: simmetrica, massima al centro, di somma 64 = 2⁶.'
    },
    reticolo: {
      tipo: 'piano', x: [-0.7, 3.7], y: [-0.7, 3.7], assi: false, griglia: false,
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [0, 3] },
        { tipo: 'segmento', da: [1, 0], a: [1, 3] },
        { tipo: 'segmento', da: [2, 0], a: [2, 3] },
        { tipo: 'segmento', da: [3, 0], a: [3, 3] },
        { tipo: 'segmento', da: [0, 0], a: [3, 0] },
        { tipo: 'segmento', da: [0, 1], a: [3, 1] },
        { tipo: 'segmento', da: [0, 2], a: [3, 2] },
        { tipo: 'segmento', da: [0, 3], a: [3, 3] },
        { tipo: 'segmento', da: [0, 0], a: [2, 0], colore: 2 },
        { tipo: 'segmento', da: [2, 0], a: [2, 2], colore: 2 },
        { tipo: 'segmento', da: [2, 2], a: [3, 2], colore: 2 },
        { tipo: 'segmento', da: [3, 2], a: [3, 3], colore: 2 },
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [3, 3], etichetta: 'B', posizione: 'alto' },
        { tipo: 'testo', p: [-0.6, 3.5], testo: 'percorso D D A A D A — in tutto C(6, 3) = 20 percorsi', ancora: 'start' }
      ],
      didascalia: 'Da A a B con soli passi a destra (D) e in alto (A): 6 passi, di cui 3 verso l\'alto. I percorsi sono C(6, 3) = 20.'
    }
  },

  esempi: [
    { titolo: 'Il menù del ristorante', problema: R`Un menù propone 3 antipasti, 4 primi e 2 dolci. Quanti pasti completi (antipasto, primo, dolce) si possono comporre? E se si può anche rinunciare al dolce?`, passi: [
      R`Le scelte sono successive e indipendenti: si applica la regola del prodotto.`,
      R`Pasti completi: $3 \cdot 4 \cdot 2 = 24$.`,
      R`Se si può rinunciare al dolce, le possibilità per il dolce diventano 3 (i due dolci più l'opzione "niente"): $3 \cdot 4 \cdot 3 = 36$.`,
      R`Nota la differenza con la domanda «quanti piatti diversi posso ordinare, uno solo?»: lì le scelte sono alternative e si somma, $3 + 4 + 2 = 9$.`
    ], risultato: R`24 pasti completi; 36 se il dolce è facoltativo` },

    { titolo: 'Sigle di tre lettere', problema: R`Con le 21 lettere dell'alfabeto italiano, quante sigle di 3 lettere si possono formare (a) se le lettere possono ripetersi, (b) se devono essere tutte diverse?`, passi: [
      R`L'ordine conta: AB C e BAC sono sigle diverse. Sono quindi disposizioni.`,
      R`(a) Con ripetizione: ogni posto ha 21 possibilità, $D'_{21,3} = 21^3 = 9261$.`,
      R`(b) Senza ripetizione: $D_{21,3} = 21 \cdot 20 \cdot 19 = 7980$.`,
      R`Le sigle con almeno una lettera ripetuta sono la differenza: $9261 - 7980 = 1281$.`
    ], risultato: R`(a) 9261, (b) 7980` },

    { titolo: 'Gli anagrammi di SUCCESSO', problema: R`Quanti anagrammi (anche privi di senso) ha la parola SUCCESSO? Quanti di essi cominciano con la lettera O?`, passi: [
      R`Le lettere sono 8: S compare 3 volte, C compare 2 volte, U, E, O una volta ciascuna.`,
      R`Permutazioni con ripetizione: $\dfrac{8!}{3! \cdot 2!} = \dfrac{40\,320}{6 \cdot 2} = 3360$.`,
      R`Per quelli che iniziano con O: la O è fissata al primo posto, restano da permutare le altre 7 lettere (S tre volte, C due volte, U, E).`,
      R`$\dfrac{7!}{3! \cdot 2!} = \dfrac{5040}{12} = 420$.`
    ], risultato: R`3360 anagrammi, di cui 420 iniziano con O` },

    { titolo: 'Una commissione mista', problema: R`In una classe ci sono 7 ragazze e 5 ragazzi. Quante commissioni di 4 studenti si possono formare? Quante ne hanno esattamente 2 ragazze e 2 ragazzi?`, passi: [
      R`In una commissione l'ordine non conta: sono combinazioni.`,
      R`Totale: $\dbinom{12}{4} = \dfrac{12 \cdot 11 \cdot 10 \cdot 9}{4!} = \dfrac{11\,880}{24} = 495$.`,
      R`Per la commissione mista si contano separatamente le scelte e poi si moltiplicano (regola del prodotto): le ragazze in $\dbinom{7}{2} = 21$ modi, i ragazzi in $\dbinom{5}{2} = 10$ modi.`,
      R`$21 \cdot 10 = 210$ commissioni con 2 ragazze e 2 ragazzi.`
    ], risultato: R`495 commissioni in tutto, 210 con 2 ragazze e 2 ragazzi` },

    { titolo: 'Uno sviluppo con il binomio di Newton', problema: R`Sviluppa $(2x - 1)^4$ e trova il coefficiente di $x^5$ nello sviluppo di $(x + 2)^8$.`, passi: [
      R`Per $(2x-1)^4$ pongo $a = 2x$, $b = -1$, $n = 4$: i coefficienti sono la riga 4 del triangolo, cioè $1, 4, 6, 4, 1$.`,
      R`$(2x)^4 + 4(2x)^3(-1) + 6(2x)^2(-1)^2 + 4(2x)(-1)^3 + (-1)^4 = 16x^4 - 32x^3 + 24x^2 - 8x + 1$.`,
      R`Per $(x+2)^8$ il termine generale è $\dbinom{8}{k} x^{8-k} 2^k$. Serve $x^5$, quindi $8 - k = 5$, cioè $k = 3$.`,
      R`Coefficiente: $\dbinom{8}{3} \cdot 2^3 = 56 \cdot 8 = 448$.`
    ], risultato: R`$16x^4 - 32x^3 + 24x^2 - 8x + 1$; il coefficiente di $x^5$ è 448` },

    { titolo: 'Percorsi su un reticolo', problema: R`In una griglia di strade, per andare dall'angolo $A$ all'angolo $B$ bisogna percorrere 5 isolati verso destra e 3 verso l'alto, senza mai tornare indietro. Quanti percorsi diversi esistono?`, passi: [
      R`Ogni percorso è una sequenza di 8 passi, di cui 5 di tipo D (destra) e 3 di tipo A (alto): la lunghezza totale è sempre la stessa.`,
      R`Un percorso è individuato dalla scelta di quali 3 degli 8 passi sono verso l'alto; l'ordine di questa scelta non conta, perché i passi verso l'alto sono indistinguibili.`,
      R`$\dbinom{8}{3} = \dfrac{8 \cdot 7 \cdot 6}{6} = 56$.`,
      R`Allo stesso risultato si arriva con le permutazioni con ripetizione della "parola" DDDDDAAA: $\dfrac{8!}{5! \cdot 3!} = 56$, che è la stessa formula.`
    ], risultato: R`56 percorsi` }
  ],

  formulario: [
    { nome: 'Regola del prodotto', formula: R`n_1 \cdot n_2 \cdot \ldots \cdot n_k`, nota: R`Vale per scelte **successive** e indipendenti. Se le scelte sono alternative, i modi si sommano.` },
    { nome: 'Fattoriale', formula: R`n! = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot n, \qquad 0! = 1`, nota: R`Relazione ricorsiva: $n! = n \cdot (n-1)!$.` },
    { nome: 'Disposizioni semplici', formula: R`D_{n,k} = \frac{n!}{(n-k)!} = n(n-1)\cdots(n-k+1)`, nota: R`Ordine sì, ripetizioni no, con $k \le n$. A mano: $k$ fattori decrescenti a partire da $n$.` },
    { nome: 'Disposizioni con ripetizione', formula: R`D^{\,r}_{n,k} = n^k`, nota: R`Ordine sì, ripetizioni sì. Qui $k$ può superare $n$.` },
    { nome: 'Permutazioni semplici', formula: R`P_n = n!`, nota: R`Tutti gli $n$ oggetti, distinti, messi in fila.` },
    { nome: 'Permutazioni con ripetizione', formula: R`P_n^{(n_1, n_2, \ldots, n_h)} = \frac{n!}{n_1! \cdot n_2! \cdot \ldots \cdot n_h!}`, nota: R`Gli anagrammi di una parola con lettere ripetute, dove $n_1 + \ldots + n_h = n$.` },
    { nome: 'Combinazioni semplici', formula: R`C_{n,k} = \binom{n}{k} = \frac{n!}{k!\,(n-k)!}`, nota: R`Ordine no, ripetizioni no. Vale anche $\binom{n}{k} = \dfrac{D_{n,k}}{k!}$.` },
    { nome: 'Combinazioni con ripetizione', formula: R`C^{\,r}_{n,k} = \binom{n+k-1}{k}`, nota: R`Ordine no, ripetizioni sì.` },
    { nome: 'Simmetria del coefficiente binomiale', formula: R`\binom{n}{k} = \binom{n}{n-k}`, nota: R`Scegliere chi entra equivale a scegliere chi resta fuori. Conviene calcolare con il $k$ più piccolo.` },
    { nome: 'Formula di Stifel', formula: R`\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}`, nota: R`Con $1 \le k \le n-1$: è la regola che costruisce il triangolo di Tartaglia.` },
    { nome: 'Somma di una riga del triangolo', formula: R`\sum_{k=0}^{n} \binom{n}{k} = 2^n`, nota: R`È il numero dei sottoinsiemi di un insieme di $n$ elementi.` },
    { nome: 'Casi limite', formula: R`\binom{n}{0} = \binom{n}{n} = 1, \qquad \binom{n}{1} = \binom{n}{n-1} = n` },
    { nome: 'Binomio di Newton', formula: R`(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k`, nota: R`Lo sviluppo ha $n+1$ termini e i coefficienti sono la riga $n$ del triangolo di Tartaglia.` },
    { nome: 'Termine generale dello sviluppo', formula: R`T_{k+1} = \binom{n}{k} a^{n-k} b^k`, nota: R`Serve quando si cerca un solo termine: si impone la condizione sull'esponente e si ricava $k$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'principio-conteggio', tipo: 'definizione', fronte: R`Principio fondamentale del conteggio`, retro: R`Se una scelta si compone di $k$ scelte successive, realizzabili rispettivamente in $n_1, n_2, \ldots, n_k$ modi, i modi complessivi sono $n_1 \cdot n_2 \cdot \ldots \cdot n_k$.` },
    { id: 'fc-02', sezione: 'principio-conteggio', tipo: 'concetto', fronte: R`Quando si moltiplica e quando si somma?`, retro: R`Scelte successive («A **e** B»): si moltiplica. Scelte alternative che si escludono («A **oppure** B»): si somma.` },
    { id: 'fc-03', sezione: 'principio-conteggio', tipo: 'concetto', fronte: R`Che cosa rappresentano le foglie di un diagramma ad albero?`, retro: R`Tutti i raggruppamenti possibili: ogni percorso dalla radice a una foglia è una scelta completa.` },
    { id: 'fc-04', sezione: 'fattoriale', tipo: 'definizione', fronte: R`Fattoriale di $n$`, retro: R`$n! = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot n$, il prodotto di tutti gli interi da 1 a $n$.` },
    { id: 'fc-05', sezione: 'fattoriale', tipo: 'concetto', fronte: R`Perché si pone $0! = 1$?`, retro: R`Perché la relazione $n! = n \cdot (n-1)!$ valga anche per $n = 1$, e perché c'è esattamente un modo di ordinare zero oggetti.` },
    { id: 'fc-06', sezione: 'fattoriale', tipo: 'procedura', fronte: R`Come si semplifica $\dfrac{10!}{8!}$?`, retro: R`Si scrive $10! = 10 \cdot 9 \cdot 8!$ e si semplifica: $10 \cdot 9 = 90$. Mai calcolare i fattoriali per intero.` },
    { id: 'fc-07', sezione: 'disposizioni', tipo: 'definizione', fronte: R`Disposizioni semplici`, retro: R`Gruppi **ordinati** di $k$ elementi distinti scelti fra $n$ (con $k \le n$).` },
    { id: 'fc-08', sezione: 'disposizioni', tipo: 'formula', fronte: R`Formula delle disposizioni semplici`, retro: R`$D_{n,k} = \dfrac{n!}{(n-k)!} = n(n-1)\cdots(n-k+1)$, cioè $k$ fattori decrescenti da $n$.` },
    { id: 'fc-09', sezione: 'disposizioni', tipo: 'formula', fronte: R`Disposizioni con ripetizione di $n$ elementi di classe $k$`, retro: R`$n^k$: ogni posto ha tutte le $n$ possibilità.` },
    { id: 'fc-10', sezione: 'disposizioni', tipo: 'concetto', fronte: R`In quale raggruppamento $k$ può superare $n$?`, retro: R`Solo dove sono ammesse le ripetizioni (disposizioni o combinazioni con ripetizione). Senza ripetizioni serve $k \le n$.` },
    { id: 'fc-11', sezione: 'permutazioni', tipo: 'formula', fronte: R`Permutazioni semplici di $n$ oggetti distinti`, retro: R`$P_n = n!$. È il caso $k = n$ delle disposizioni semplici.` },
    { id: 'fc-12', sezione: 'permutazioni', tipo: 'formula', fronte: R`Permutazioni con ripetizione`, retro: R`$\dfrac{n!}{n_1! \cdot n_2! \cdot \ldots \cdot n_h!}$, dove $n_1, \ldots, n_h$ sono le molteplicità degli oggetti uguali.` },
    { id: 'fc-13', sezione: 'permutazioni', tipo: 'procedura', fronte: R`Quanti anagrammi ha MAMMA?`, retro: R`5 lettere con 3 M e 2 A: $\dfrac{5!}{3! \cdot 2!} = 10$.` },
    { id: 'fc-14', sezione: 'permutazioni', tipo: 'concetto', fronte: R`Perché negli anagrammi si divide?`, retro: R`Perché le permutazioni delle lettere uguali fra loro danno la stessa parola: $n!$ conterebbe più volte lo stesso anagramma.` },
    { id: 'fc-15', sezione: 'combinazioni', tipo: 'definizione', fronte: R`Combinazioni semplici`, retro: R`Sottoinsiemi di $k$ elementi distinti scelti fra $n$: l'ordine **non** conta.` },
    { id: 'fc-16', sezione: 'combinazioni', tipo: 'formula', fronte: R`Coefficiente binomiale $\binom{n}{k}$`, retro: R`$\dbinom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$. Si legge «$n$ su $k$».` },
    { id: 'fc-17', sezione: 'combinazioni', tipo: 'concetto', fronte: R`Che legame c'è fra $D_{n,k}$ e $\binom{n}{k}$?`, retro: R`$D_{n,k} = \dbinom{n}{k} \cdot k!$: ogni combinazione, ordinata in tutti i modi, produce $k!$ disposizioni.` },
    { id: 'fc-18', sezione: 'combinazioni', tipo: 'formula', fronte: R`Combinazioni con ripetizione`, retro: R`$\dbinom{n+k-1}{k}$: si scelgono $k$ elementi fra $n$, ripetizioni ammesse, ordine irrilevante.` },
    { id: 'fc-19', sezione: 'proprieta-binomiale', tipo: 'formula', fronte: R`Proprietà di simmetria`, retro: R`$\dbinom{n}{k} = \dbinom{n}{n-k}$. Per esempio $\dbinom{20}{18} = \dbinom{20}{2} = 190$.` },
    { id: 'fc-20', sezione: 'proprieta-binomiale', tipo: 'formula', fronte: R`Formula di Stifel`, retro: R`$\dbinom{n}{k} = \dbinom{n-1}{k-1} + \dbinom{n-1}{k}$, per $1 \le k \le n-1$.` },
    { id: 'fc-21', sezione: 'proprieta-binomiale', tipo: 'formula', fronte: R`Quanto vale la somma della riga $n$ del triangolo di Tartaglia?`, retro: R`$2^n$, cioè il numero di tutti i sottoinsiemi di un insieme di $n$ elementi.` },
    { id: 'fc-22', sezione: 'proprieta-binomiale', tipo: 'procedura', fronte: R`Come si costruisce il triangolo di Tartaglia?`, retro: R`Ogni riga inizia e finisce con 1; ogni altro numero è la somma dei due che gli stanno sopra (formula di Stifel).` },
    { id: 'fc-23', sezione: 'binomio-newton', tipo: 'formula', fronte: R`Binomio di Newton`, retro: R`$(a+b)^n = \displaystyle\sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k$` },
    { id: 'fc-24', sezione: 'binomio-newton', tipo: 'formula', fronte: R`Termine generale dello sviluppo di $(a+b)^n$`, retro: R`Il termine di posto $k+1$ è $\dbinom{n}{k} a^{n-k} b^k$.` },
    { id: 'fc-25', sezione: 'binomio-newton', tipo: 'concetto', fronte: R`Quanti termini ha lo sviluppo di $(a+b)^n$?`, retro: R`$n+1$ termini; in ognuno la somma degli esponenti di $a$ e $b$ vale $n$.` },
    { id: 'fc-26', sezione: 'riconoscere', tipo: 'procedura', fronte: R`Le due domande per scegliere la formula`, retro: R`1) Conta l'ordine? 2) Gli elementi si possono ripetere? Le risposte individuano il raggruppamento.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Quanti numeri di 3 cifre si possono scrivere usando solo le cifre 1, 2, 3, 4, 5, se le cifre possono ripetersi?`, suggerimenti: [R`L'ordine conta e ogni cifra resta disponibile a ogni posto.`, R`Sono disposizioni con ripetizione: $n^k$ con $n = 5$ e $k = 3$.`], risposta: { tipo: 'numero', valore: 125, tolleranza: 0 }, soluzione: [R`Per ciascuno dei 3 posti ci sono 5 possibilità.`, R`$5 \cdot 5 \cdot 5 = 5^3 = 125$.`] },
    { id: 'es-02', difficolta: 1, testo: R`In quanti modi 6 persone possono sedersi su 6 sedie allineate?`, suggerimenti: [R`Si usano tutte le persone e l'ordine conta: sono permutazioni.`], risposta: { tipo: 'numero', valore: 720, tolleranza: 0 }, soluzione: [R`$P_6 = 6! = 720$.`, R`Con la regola del prodotto: 6 scelte per la prima sedia, 5 per la seconda, ..., 1 per l'ultima.`] },
    { id: 'es-03', difficolta: 1, testo: R`Calcola $\dbinom{9}{2}$.`, suggerimenti: [R`Due fattori decrescenti a partire da 9, divisi per $2!$.`], risposta: { tipo: 'numero', valore: 36, tolleranza: 0 }, soluzione: [R`$\dbinom{9}{2} = \dfrac{9 \cdot 8}{2!} = \dfrac{72}{2} = 36$.`, R`Controllo con la simmetria: $\dbinom{9}{2} = \dbinom{9}{7}$.`] },
    { id: 'es-04', difficolta: 1, testo: R`In una classe di 20 studenti si devono eleggere un rappresentante e un vicerappresentante (persone diverse). In quanti modi si può fare?`, suggerimenti: [R`Le due cariche sono diverse: scambiando le persone il risultato cambia.`, R`Disposizioni semplici di 20 elementi di classe 2.`], risposta: { tipo: 'numero', valore: 380, tolleranza: 0 }, soluzione: [R`$D_{20,2} = 20 \cdot 19 = 380$.`, R`Se invece si dovessero scegliere due delegati senza distinzione di ruolo, sarebbero $\dbinom{20}{2} = 190$: esattamente la metà.`] },
    { id: 'es-05', difficolta: 2, testo: R`Quanti anagrammi, anche privi di significato, ha la parola LIBRERIA?`, suggerimenti: [R`Conta le lettere e le loro ripetizioni.`, R`Sono 8 lettere: la I compare 2 volte e la R compare 2 volte.`], risposta: { tipo: 'numero', valore: 10080, tolleranza: 0 }, soluzione: [R`Le lettere sono 8: L, I, B, R, E, R, I, A. Ripetute: I (2 volte) e R (2 volte).`, R`$\dfrac{8!}{2! \cdot 2!} = \dfrac{40\,320}{4} = 10\,080$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Quante diagonali ha un poligono convesso di 10 lati?`, suggerimenti: [R`Ogni coppia di vertici individua un segmento; l'ordine dei due vertici non conta.`, R`I segmenti sono $\dbinom{10}{2}$, ma 10 di essi sono i lati, non diagonali.`], risposta: { tipo: 'numero', valore: 35, tolleranza: 0 }, soluzione: [R`I segmenti che uniscono due vertici sono $\dbinom{10}{2} = \dfrac{10 \cdot 9}{2} = 45$.`, R`Di questi, 10 sono i lati del poligono.`, R`Le diagonali sono $45 - 10 = 35$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Determina il coefficiente di $x^3$ nello sviluppo di $(x + 2)^6$.`, suggerimenti: [R`Usa il termine generale $\dbinom{6}{k} x^{6-k} 2^k$.`, R`Imponi $6 - k = 3$ e ricava $k$.`], risposta: { tipo: 'numero', valore: 160, tolleranza: 0 }, soluzione: [R`Termine generale: $\dbinom{6}{k} x^{6-k} \cdot 2^k$.`, R`Serve $x^3$, quindi $6 - k = 3$, cioè $k = 3$.`, R`Coefficiente: $\dbinom{6}{3} \cdot 2^3 = 20 \cdot 8 = 160$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Quante mani diverse di 5 carte si possono ricevere da un mazzo italiano di 40 carte?`, suggerimenti: [R`In una mano l'ordine con cui arrivano le carte non conta.`, R`Combinazioni di 40 elementi di classe 5.`], risposta: { tipo: 'numero', valore: 658008, tolleranza: 0 }, soluzione: [R`$\dbinom{40}{5} = \dfrac{40 \cdot 39 \cdot 38 \cdot 37 \cdot 36}{5!}$.`, R`Numeratore $= 78\,960\,960$, denominatore $= 120$.`, R`$\dbinom{40}{5} = 658\,008$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Quanti numeri di 4 cifre tutte diverse si possono formare con le cifre da 0 a 9? (Un numero di 4 cifre non può iniziare per 0.)`, suggerimenti: [R`Tratta a parte la prima cifra, che ha un vincolo in più.`, R`Per la prima cifra ci sono 9 possibilità; poi restano 9 cifre fra cui scegliere le altre tre, in ordine.`], risposta: { tipo: 'numero', valore: 4536, tolleranza: 0 }, soluzione: [R`Prima cifra: 9 scelte (tutte tranne lo 0).`, R`Le altre tre cifre sono una disposizione semplice delle 9 cifre rimaste: $9 \cdot 8 \cdot 7 = 504$.`, R`Totale: $9 \cdot 504 = 4536$.`] },
    { id: 'es-10', difficolta: 3, testo: R`In quanti modi si possono allineare su uno scaffale 4 libri di matematica e 3 di fisica, in modo che i 4 libri di matematica stiano tutti vicini fra loro? (I libri sono tutti diversi.)`, suggerimenti: [R`Considera il blocco dei 4 libri di matematica come se fosse un unico oggetto.`, R`Con il blocco, gli oggetti da ordinare diventano 4. Ma anche dentro il blocco i libri si possono scambiare.`], risposta: { tipo: 'numero', valore: 576, tolleranza: 0 }, soluzione: [R`Tratto i 4 libri di matematica come un blocco unico: gli oggetti da mettere in fila sono il blocco più i 3 libri di fisica, cioè 4.`, R`Modi di ordinare i 4 oggetti: $4! = 24$.`, R`Dentro il blocco i 4 libri si possono ordinare in $4! = 24$ modi.`, R`Per la regola del prodotto: $24 \cdot 24 = 576$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Una commissione di 5 persone va scelta fra 6 uomini e 4 donne, con la condizione che vi siano **almeno 3 donne**. Quante commissioni sono possibili?`, suggerimenti: [R`"Almeno 3 donne" con sole 4 donne disponibili significa: esattamente 3, oppure esattamente 4.`, R`Conta i due casi separatamente e poi somma.`, R`Caso 3 donne: $\dbinom{4}{3} \cdot \dbinom{6}{2}$.`], risposta: { tipo: 'numero', valore: 66, tolleranza: 0 }, soluzione: [R`Esattamente 3 donne e 2 uomini: $\dbinom{4}{3} \cdot \dbinom{6}{2} = 4 \cdot 15 = 60$.`, R`Esattamente 4 donne e 1 uomo: $\dbinom{4}{4} \cdot \dbinom{6}{1} = 1 \cdot 6 = 6$.`, R`I due casi sono alternativi, quindi si sommano: $60 + 6 = 66$.`] },
    { id: 'es-12', difficolta: 3, testo: R`In una griglia di strade bisogna andare da $A$ a $B$ percorrendo 4 isolati verso destra e 2 verso l'alto, senza mai tornare indietro. Quanti percorsi diversi esistono?`, suggerimenti: [R`Ogni percorso è una sequenza di lettere D (destra) e A (alto): quante lettere in tutto?`, R`I passi sono 6, di cui 2 verso l'alto: basta scegliere quali.`], risposta: { tipo: 'numero', valore: 15, tolleranza: 0 }, soluzione: [R`Ogni percorso è formato da $4 + 2 = 6$ passi, di cui 2 verso l'alto.`, R`Il percorso è individuato dalla scelta di quali 2 passi sui 6 sono verticali, e l'ordine di questa scelta non conta.`, R`$\dbinom{6}{2} = \dfrac{6 \cdot 5}{2} = 15$.`, R`Allo stesso risultato porta $\dfrac{6!}{4! \cdot 2!} = 15$, gli anagrammi della parola DDDDAA.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Secondo il principio fondamentale del conteggio, i modi di compiere scelte successive e indipendenti si…`, opzioni: [R`sommano`, R`moltiplicano`, R`sottraggono`, R`elevano a potenza l'uno dell'altro`], corretta: 1, spiegazione: R`Per ogni esito della prima scelta si ripetono tutti gli esiti della seconda: i modi si moltiplicano. Si sommano invece quando le scelte sono alternative e si escludono a vicenda.` },
    { id: 'q-02', domanda: R`Quanto vale $0!$?`, opzioni: [R`$0$`, R`$1$`, R`non è definito`, R`dipende dal contesto`], corretta: 1, spiegazione: R`Si pone $0! = 1$ perché la relazione $n! = n\cdot(n-1)!$ valga anche per $n = 1$ e perché c'è un solo modo di ordinare zero oggetti. Senza questa convenzione la formula $P_n = D_{n,n} = \dfrac{n!}{0!}$ non funzionerebbe.` },
    { id: 'q-03', domanda: R`In quale raggruppamento l'ordine degli elementi **non** conta?`, opzioni: [R`disposizioni semplici`, R`permutazioni`, R`combinazioni`, R`disposizioni con ripetizione`], corretta: 2, spiegazione: R`Le combinazioni sono sottoinsiemi: $\{A, B, C\}$ e $\{C, A, B\}$ sono lo stesso gruppo. In tutti gli altri casi elencati scambiare due elementi produce un raggruppamento diverso.` },
    { id: 'q-04', domanda: R`Il numero di disposizioni con ripetizione di $n$ elementi di classe $k$ è…`, opzioni: [R`$n^k$`, R`$k^n$`, R`$\dfrac{n!}{(n-k)!}$`, R`$\dbinom{n}{k}$`], corretta: 0, spiegazione: R`Ogni posto ha tutte le $n$ possibilità e i posti sono $k$: $n \cdot n \cdot \ldots \cdot n = n^k$. La base è il numero di elementi disponibili, l'esponente il numero di posti.` },
    { id: 'q-05', domanda: R`Perché $\dbinom{n}{k} = \dfrac{D_{n,k}}{k!}$?`, opzioni: [R`perché ogni combinazione, ordinata in tutti i modi, dà $k!$ disposizioni diverse`, R`perché $k!$ conta gli elementi che restano fuori`, R`perché le combinazioni sono raggruppamenti ordinati`, R`perché $n! = k! \cdot (n-k)!$`], corretta: 0, spiegazione: R`Le disposizioni sono $k!$ volte più numerose delle combinazioni, perché ogni gruppo di $k$ elementi si può ordinare in $k!$ modi. L'ultima opzione è falsa: in generale $n! \ne k!(n-k)!$.` },
    { id: 'q-06', domanda: R`Usando la simmetria del coefficiente binomiale, $\dbinom{12}{10}$ vale…`, opzioni: [R`$66$`, R`$120$`, R`$220$`, R`$12$`], corretta: 0, spiegazione: R`$\dbinom{12}{10} = \dbinom{12}{2} = \dfrac{12 \cdot 11}{2} = 66$. Il valore $220$ è $\dbinom{12}{3}$ e $12$ è $\dbinom{12}{1}$.` },
    { id: 'q-07', domanda: R`La formula di Stifel afferma che…`, opzioni: [R`$\dbinom{n}{k} = \dbinom{n}{n-k}$`, R`$\dbinom{n}{k} = \dbinom{n+1}{k} + \dbinom{n+1}{k+1}$`, R`$\dbinom{n}{k} = \dbinom{n-1}{k-1} + \dbinom{n-1}{k}$`, R`$\dbinom{n}{k} = \dbinom{n-1}{k} \cdot k$`], corretta: 2, spiegazione: R`Ogni numero del triangolo di Tartaglia è la somma dei due che gli stanno sopra, cioè dei due coefficienti della riga precedente. La prima opzione è vera, ma è la simmetria, non Stifel.` },
    { id: 'q-08', domanda: R`La somma dei numeri della riga $n$ del triangolo di Tartaglia vale…`, opzioni: [R`$2^n$`, R`$n!$`, R`$n^2$`, R`$2n$`], corretta: 0, spiegazione: R`$\displaystyle\sum_{k=0}^{n}\binom{n}{k} = 2^n$: contando i sottoinsiemi di un insieme di $n$ elementi per cardinalità si ottengono i coefficienti binomiali, e in totale i sottoinsiemi sono $2^n$ perché ogni elemento o c'è o non c'è.` },
    { id: 'q-09', domanda: R`Quanti termini ha lo sviluppo di $(a+b)^7$?`, opzioni: [R`$7$`, R`$8$`, R`$14$`, R`$128$`], corretta: 1, spiegazione: R`L'indice $k$ va da 0 a 7, quindi i termini sono $7 + 1 = 8$. Il numero $128 = 2^7$ è la somma dei coefficienti, non il numero dei termini.` },
    { id: 'q-10', domanda: R`In ogni termine dello sviluppo di $(a+b)^n$, la somma degli esponenti di $a$ e di $b$ vale…`, opzioni: [R`$n$`, R`$n+1$`, R`$2n$`, R`dipende dal termine`], corretta: 0, spiegazione: R`Il termine generale è $\dbinom{n}{k}a^{n-k}b^k$ e $(n-k) + k = n$ sempre. È un controllo rapido per accorgersi di un errore nello sviluppo.` },
    { id: 'q-11', domanda: R`Quale di questi problemi si risolve con le **combinazioni**?`, opzioni: [R`il numero di podi possibili in una gara con 8 atleti`, R`il numero di PIN di 5 cifre`, R`il numero di commissioni di 3 persone scelte in una classe`, R`il numero di anagrammi della parola ROMA`], corretta: 2, spiegazione: R`In una commissione l'ordine è irrilevante. Il podio distingue oro, argento e bronzo (disposizioni semplici), il PIN ammette cifre ripetute e ordinate (disposizioni con ripetizione), gli anagrammi usano tutte le lettere (permutazioni).` },
    { id: 'q-12', domanda: R`Le permutazioni semplici di $n$ oggetti distinti sono…`, opzioni: [R`$n^n$`, R`$n!$`, R`$(n-1)!$`, R`$2^n$`], corretta: 1, spiegazione: R`Sono le disposizioni semplici con $k = n$: $D_{n,n} = \dfrac{n!}{0!} = n!$. Il valore $2^n$ conta i sottoinsiemi, non gli ordinamenti.` },
    { id: 'q-13', domanda: R`Gli anagrammi di una parola con lettere ripetute si contano…`, opzioni: [R`con $n!$, dove $n$ è il numero di lettere`, R`dividendo $n!$ per il prodotto dei fattoriali delle molteplicità`, R`dividendo $n!$ per il numero delle lettere ripetute`, R`con $n^k$`], corretta: 1, spiegazione: R`Le permutazioni delle lettere uguali fra loro non producono parole nuove, quindi si divide per $n_1! \cdot n_2! \cdot \ldots$. Per MAMMA il denominatore è $3! \cdot 2! = 12$, non $3 \cdot 2 = 6$.` },
    { id: 'q-14', domanda: R`Se $k > n$, quale raggruppamento di $n$ elementi di classe $k$ ha ancora senso?`, opzioni: [R`le disposizioni semplici`, R`le combinazioni semplici`, R`le permutazioni semplici`, R`le disposizioni con ripetizione`], corretta: 3, spiegazione: R`Senza ripetizioni non si possono scegliere più elementi di quanti ce ne siano: servirebbe $k \le n$. Con le ripetizioni, invece, $n^k$ ha senso per qualunque $k$ (per esempio $10^{20}$ password di 20 caratteri da 10 simboli).` },
    { id: 'q-15', domanda: R`Quanto vale $\dbinom{n}{0}$?`, opzioni: [R`$0$`, R`$1$`, R`$n$`, R`non è definito`], corretta: 1, spiegazione: R`$\dbinom{n}{0} = \dfrac{n!}{0!\,n!} = 1$: c'è un solo modo di non scegliere nulla, cioè l'insieme vuoto. È il primo 1 di ogni riga del triangolo di Tartaglia.` },
    { id: 'q-16', domanda: R`Quanti sono i sottoinsiemi di un insieme di $n$ elementi?`, opzioni: [R`$n!$`, R`$2^n$`, R`$n^2$`, R`$\dbinom{n}{2}$`], corretta: 1, spiegazione: R`Per ogni elemento si decide se prenderlo o no: due possibilità ripetute $n$ volte, cioè $2^n$ (compresi l'insieme vuoto e l'insieme stesso). È anche la somma di una riga del triangolo di Tartaglia.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima della formula, due domande: **conta l'ordine?** e **gli elementi si possono ripetere?** Le risposte scelgono il raggruppamento da sole.` },
    { tipo: 'errore', testo: R`«E» moltiplica, «oppure» somma. Un antipasto **e** un primo: $4 \cdot 6 = 24$. Un antipasto **oppure** un primo: $4 + 6 = 10$.` },
    { tipo: 'trucco', testo: R`Non calcolare mai i fattoriali per intero: semplifica prima. $\dfrac{12!}{10!}$ è $12 \cdot 11 = 132$, non un conto da calcolatrice.` },
    { tipo: 'errore', testo: R`Negli anagrammi si divide per il **fattoriale** delle molteplicità: per MAMMA è $3! \cdot 2! = 12$, non $3 \cdot 2 = 6$.` },
    { tipo: 'trucco', testo: R`Per la simmetria $\dbinom{n}{k} = \dbinom{n}{n-k}$, calcola sempre con il $k$ più piccolo: $\dbinom{50}{48}$ è $\dbinom{50}{2} = 1225$, due moltiplicazioni.` },
    { tipo: 'trucco', testo: R`Il coefficiente binomiale è sempre intero. Se ti viene un numero con la virgola, hai sbagliato: rifai la semplificazione.` },
    { tipo: 'metodo', testo: R`Con un vincolo del tipo «almeno uno», spesso conviene contare **tutti** i casi e togliere quelli che non vanno bene, invece di sommare tanti sottocasi.` },
    { tipo: 'metodo', testo: R`Quando due gruppi si scelgono indipendentemente (per esempio 2 ragazze **e** 2 ragazzi), si contano separatamente e si moltiplicano i risultati.` },
    { tipo: 'trucco', testo: R`Se il problema è piccolo, disegna l'albero o elenca i primi casi: chiarisce subito se l'ordine conta, e serve da controllo sul risultato.` },
    { tipo: 'errore', testo: R`«Un gruppo di 3 su 8» non è $8 \cdot 7 \cdot 6 = 336$: quello conta anche l'ordine. Le commissioni sono $\dfrac{336}{3!} = 56$.` }
  ],

  aneddoti: [
    { matematico: 'Blaise Pascal e Pierre de Fermat', anni: '1623–1662 e 1601–1665', titolo: 'Una partita interrotta e cinque lettere', testo: R`Nel 1654 il cavaliere de Méré, un nobile giocatore, pose a Pascal un vecchio rompicapo: se una partita a più riprese viene interrotta prima della fine, come si divide equamente la posta fra due giocatori che sono a punteggi diversi? Pascal ne scrisse a Fermat, e i due si scambiarono una manciata di lettere in cui, per risolvere il "problema delle parti", contarono tutti i modi in cui la partita avrebbe potuto proseguire. Fermat elencava i casi, Pascal usava il triangolo aritmetico: strade diverse, stesso risultato. Da quella corrispondenza nasce il calcolo delle probabilità. Poco dopo Pascal ebbe la sua celebre esperienza mistica, si cucì nella giacca il *Mémorial* che la ricordava e lasciò quasi del tutto la matematica per la teologia.`, legame: R`Contare i casi possibili con i coefficienti binomiali: è esattamente il ponte fra questo argomento e la probabilità.` },

    { matematico: 'Niccolò Tartaglia', anni: '1500–1557', titolo: 'Il triangolo che cambia nome a ogni confine', testo: R`In Italia si chiama triangolo di Tartaglia perché il matematico bresciano lo pubblicò nel *General trattato di numeri et misure* (1556); in Francia e nei paesi anglosassoni si chiama triangolo di Pascal, dal *Traité du triangle arithmétique* che Pascal scrisse nel 1654. Nessuno dei due, però, lo inventò. In India la disposizione era nota come *meru-prastara* e compare nel commento di Halayudha (X secolo) a un trattato di metrica di Pingala, di oltre mille anni prima, dove serviva a contare le combinazioni di sillabe lunghe e brevi nei versi. In Cina è il "triangolo di Yang Hui", che nel 1261 lo attribuiva a Jia Xian, vissuto due secoli prima. In Persia lo usavano al-Karaji e Omar Khayyam.`, legame: R`È la tabella dei coefficienti binomiali: la stessa figura che genera lo sviluppo di $(a+b)^n$ con la formula di Stifel.` },

    { matematico: 'Jacob Bernoulli', anni: '1655–1705', titolo: 'Un libro pubblicato otto anni dopo la morte', testo: R`Jacob Bernoulli, il maggiore della famiglia di matematici basilesi, lavorò per anni all'*Ars conjectandi*, il primo trattato sistematico di combinatoria e probabilità. La seconda parte del libro è una teoria ordinata di permutazioni, disposizioni e combinazioni, con la dimostrazione delle proprietà dei coefficienti binomiali; la quarta contiene il teorema che oggi chiamiamo legge dei grandi numeri. Bernoulli morì nel 1705 senza averlo finito, e l'opera uscì solo nel 1713, per iniziativa del nipote Nicolaus. Aveva chiesto che sulla sua tomba fosse incisa una spirale logaritmica con il motto *Eadem mutata resurgo*, «pur cambiata, risorgo la stessa»: lo scalpellino sbagliò e incise una spirale di Archimede.`, legame: R`L'*Ars conjectandi* è il testo in cui permutazioni, disposizioni e combinazioni diventano per la prima volta una teoria unitaria.` },

    { matematico: 'Christian Kramp', anni: '1760–1826', titolo: 'Chi ha inventato il punto esclamativo', testo: R`Il simbolo $n!$ è molto più recente delle idee che rappresenta. Per tutto il Settecento i matematici scrivevano il fattoriale con notazioni ingombranti e diverse fra loro. Fu Christian Kramp, medico e poi professore di matematica a Strasburgo, a introdurre nel 1808, negli *Éléments d'arithmétique universelle*, il punto esclamativo posposto, spiegando che gli serviva una scrittura compatta perché nei suoi calcoli quel prodotto compariva di continuo. Fu Kramp anche a chiamare "fattoriale" quel numero. La notazione si diffuse in fretta proprio per la sua economia: un solo carattere al posto di una fila di puntini.`, legame: R`Quasi ogni formula di questo argomento si scrive con il punto esclamativo di Kramp.` },

    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'A vent\'anni, l\'arte di combinare tutto', testo: R`Nel 1666, ad appena vent'anni, Leibniz pubblicò la *Dissertatio de arte combinatoria*. Il suo sogno era smisurato: costruire un alfabeto dei pensieri, in cui ogni concetto complesso fosse una combinazione di concetti semplici, e ridurre così il ragionamento a un calcolo. In caso di disaccordo, scriveva, non resterebbe che dirsi «calcoliamo». La parte matematica del libro studia in modo sistematico permutazioni e combinazioni, e vi compare la parola stessa «combinatoria» nel senso che le diamo oggi. Leibniz da vecchio giudicava quel testo giovanile e immaturo; eppure il progetto di una logica calcolabile che vi si intravede ha aspettato solo due secoli e mezzo, fino ai calcolatori.`, legame: R`È il testo che dà il nome al calcolo combinatorio e ne fa una disciplina a sé.` }
  ]
});
})();
