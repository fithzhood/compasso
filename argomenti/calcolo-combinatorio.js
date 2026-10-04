(function () {
const R = String.raw;
/* allenamento: risposte intere, senza tasti di simboli (la casella capisce anche «7*6», ma non «6!» né «1.000» col punto delle migliaia) */
const num = v => ({ tipo: 'numero', valore: v, tolleranza: 0, segnaposto: 'un numero intero', simboli: [] });
COMPASSO.registra({
  id: 'calcolo-combinatorio',
  titolo: 'Calcolo combinatorio',

  introduzione: R`Quante targhe diverse esistono? Quanti anagrammi ha la parola ROMA? In quanti modi scegli tre persone in una classe di venti? È sempre la stessa domanda: **in quanti modi si può fare una cosa?** Il calcolo combinatorio risponde senza scrivere l'elenco, che può essere lunghissimo.

Ti servirà in probabilità, dove bisogna contare i casi possibili e quelli favorevoli.

Bastano potenze e frazioni. La parte difficile è capire dal testo **se conta l'ordine** e **se gli elementi si ripetono**. Poi la formula viene quasi da sola.`,

  inBreve: [
    R`Scelte fatte una dopo l'altra («un antipasto **e** un primo»): i modi si moltiplicano. Scelte alternative («un antipasto **oppure** un primo»): si sommano.`,
    R`Prima di ogni formula, due domande: conta l'ordine? Lo stesso elemento può comparire più volte?`,
    R`Ordine sì: disposizioni. Con ripetizione sono $n^k$, senza sono $n(n-1)\cdots(n-k+1)$. Se metti in fila **tutti** gli elementi sono permutazioni, $n!$.`,
    R`Ordine no: combinazioni, $\binom{n}{k}$. Sono le disposizioni divise per $k!$.`,
    R`I fattoriali non si calcolano per intero: si semplificano, come in $\dfrac{10!}{8!} = 10 \cdot 9$.`
  ],

  sezioni: [
    { id: 'principio-conteggio', titolo: 'Il principio fondamentale del conteggio', testo: R`Hai 2 magliette e 3 paia di pantaloni: quanti completi puoi fare? Con ognuna delle 2 magliette puoi mettere uno qualunque dei 3 pantaloni, quindi i completi sono $2 \cdot 3 = 6$.

[[video:calcolo-combinatorio/conteggio]]

>* **Principio fondamentale del conteggio (regola del prodotto).** Una scelta si fa in più passi, uno dopo l'altro. Il primo passo si fa in $n_1$ modi, il secondo in $n_2$ modi, e così via. I modi in tutto sono $$n_1 \cdot n_2 \cdot \ldots \cdot n_k.$$

Puoi disegnare il conto con un **diagramma ad albero**, come nel laboratorio «L'albero delle scelte». Ogni percorso dall'inizio a una punta è un completo.

C'è una condizione: il numero di scelte di un passo non deve dipendere da quello che hai scelto prima.

Un esempio più grande sono le targhe: due lettere, tre cifre e due lettere, con 22 lettere ammesse.

~ 22 \cdot 22 \cdot 10 \cdot 10 \cdot 10 \cdot 22 \cdot 22 :: sette posti: 22 scelte per ogni lettera, 10 per ogni cifra
~ \evid{22^4} \cdot \evid{10^3} :: raccolgo i fattori uguali in potenze
~ \evid{234\,256} \cdot 1000 :: $22^4 = 484 \cdot 484 = 234\,256$
~ \evidb{234\,256\,000} :: più di 234 milioni di targhe

>! Se le scelte sono **alternative**, un antipasto **oppure** un primo, i modi si sommano. Con 4 antipasti e 6 primi hai $4 + 6 = 10$ modi di prendere un piatto solo.

?? Al bar puoi prendere un panino (5 tipi) oppure una piadina (3 tipi). Quante scelte diverse hai?
[x] $8$
[ ] $15$
[ ] $5^3 = 125$
=> Prendi **una** cosa sola, panino o piadina. Le due possibilità si escludono, quindi si sommano. Il $15$ conta le coppie «panino **e** piadina».` },

    { id: 'fattoriale', titolo: 'Il fattoriale', testo: R`In quanti modi metti in fila 4 amici? Per il primo posto hai 4 scelte, per il secondo ne restano 3, poi 2, poi 1. In tutto $4 \cdot 3 \cdot 2 \cdot 1 = 24$. Questo prodotto torna così spesso che ha un nome.

>* **Fattoriale.** Per $n$ intero positivo, $n!$ (si legge «$n$ fattoriale») è il prodotto degli interi da $1$ a $n$: $$n! = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot n.$$ Inoltre si pone $0! = 1$.

I primi valori sono $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$, $5! = 120$ e $6! = 720$. Ogni fattoriale è il precedente per un numero in più, perché $n! = n \cdot (n-1)!$. Con $n = 1$ questa regola dà $1! = 1 \cdot 0!$, e funziona solo se $0! = 1$.

Il fattoriale cresce in fretta, quindi nei conti non si calcola per intero ma si semplifica.

~ \dfrac{10!}{8!} :: sopra e sotto c'è lo stesso prodotto $1 \cdot 2 \cdot \ldots \cdot 8$
~ \dfrac{10 \cdot 9 \cdot \evid{8!}}{\evid{8!}} :: scrivo $10!$ fermandomi a $8!$: $10! = 10 \cdot 9 \cdot 8!$
~ 10 \cdot 9 = \evidb{90} :: semplifico $8!$

Con le lettere il metodo è lo stesso: scendi dal fattoriale più grande finché compare quello più piccolo.

~ \dfrac{(n+1)!}{(n-1)!} :: il fattoriale più grande è sopra
~ \dfrac{(n+1) \cdot n \cdot \evid{(n-1)!}}{\evid{(n-1)!}} :: scendo di un fattore alla volta: $(n+1)! = (n+1) \cdot n \cdot (n-1)!$
~ \evidb{n(n+1)} :: semplifico $(n-1)!$

?? Quanto vale $\dfrac{12!}{10!}$?
[x] $132$
[ ] $2$
[ ] $\left(\dfrac{6}{5}\right)!$
=> $12! = 12 \cdot 11 \cdot 10!$, quindi il risultato è $12 \cdot 11 = 132$. Il $2$ viene da $12 - 10$, ma con i fattoriali non si fa così.

>! Il fattoriale non si distribuisce: $\dfrac{10!}{8!} \ne \left(\dfrac{10}{8}\right)!$ e $(a+b)! \ne a! + b!$. Con $a = b = 2$ trovi $4! = 24$, ma $2! + 2! = 4$.` },

    { id: 'disposizioni', titolo: 'Le disposizioni', testo: R`In una gara corrono 8 atleti. Quanti podi diversi ci possono essere, con oro, argento e bronzo? Qui **l'ordine conta**, perché Anna prima e Bruno secondo è un podio diverso da Bruno primo e Anna seconda. E nessuno sta su due gradini.

~ 8 :: per l'oro va bene uno qualunque degli 8 atleti
~ 8 \cdot \evid{7} :: per l'argento ne restano 7: chi ha vinto l'oro non può avere anche l'argento
~ 8 \cdot 7 \cdot \evid{6} :: per il bronzo ne restano 6
~ \evidb{336} :: tre posti, tre fattori che scendono di uno alla volta

Questa è una **disposizione semplice** di $n$ elementi di classe $k$: scegli $k$ elementi fra $n$, l'ordine conta e nessuno si ripete. $k$ è il numero dei posti.

>* **Disposizioni semplici** ($k \le n$): $$\begin{aligned} D_{n,k} &= \underbrace{n(n-1)\cdots(n-k+1)}_{k \text{ fattori}} \\ &= \frac{n!}{(n-k)!} \end{aligned}$$

A mano usa la prima forma: $k$ fattori che partono da $n$ e scendono di uno. La seconda è la stessa cosa scritta in breve, perché $8 \cdot 7 \cdot 6 = \dfrac{8!}{5!}$.

Se invece un elemento si può usare più volte, ogni posto ha di nuovo tutte le $n$ scelte.

>* **Disposizioni con ripetizione**: $$D'_{n,k} = n^k$$ La base è il numero degli elementi, l'esponente il numero dei posti. Qui $k$ può anche superare $n$.

?? Quanti PIN di 4 cifre si possono formare, se le cifre si possono ripetere?
[x] $10^4 = 10\,000$
[ ] $10 \cdot 9 \cdot 8 \cdot 7 = 5040$
[ ] $4^{10} = 1\,048\,576$
=> Ogni cifra ha 10 scelte, qualunque siano le altre. Il conto $10 \cdot 9 \cdot 8 \cdot 7$ vieta le ripetizioni, ma 1111 è un PIN valido. $4^{10}$ scambia base ed esponente.

>! Chiediti sempre se lo stesso elemento può comparire due volte. Se sì, usa $n^k$. Se no, usa $n(n-1)\cdots(n-k+1)$.` },

    { id: 'permutazioni', titolo: 'Le permutazioni e gli anagrammi', testo: R`Quanti anagrammi ha ROMA, contando anche quelli senza senso come AMRO? Usi **tutte** le 4 lettere e conta l'ordine. Hai 4 scelte per la prima lettera, 3 per la seconda, 2 per la terza e 1 per l'ultima: in tutto $4! = 24$.

>* Una **permutazione** di $n$ oggetti diversi è un modo di metterli tutti in fila. Le permutazioni sono $$P_n = n!$$

È il caso $k = n$ delle disposizioni semplici, e qui serve $0! = 1$: $D_{n,n} = \dfrac{n!}{0!} = n!$. Per esempio 6 persone si siedono su 6 sedie in $6! = 720$ modi.

Le cose cambiano se alcuni oggetti sono **uguali**. MAMMA ha 5 lettere, ma scambiare due M non dà una parola nuova. Allora conta come se le lettere fossero tutte diverse, e poi dividi.

~ 5! = 120 :: se le lettere fossero tutte diverse ($M_1\,A_1\,M_2\,M_3\,A_2$)
~ \dfrac{120}{\evid{3!}} = 20 :: le tre M si scambiano fra loro in $3! = 6$ modi, e la parola resta la stessa: ogni anagramma era contato 6 volte
~ \dfrac{20}{\evid{2!}} = \evidb{10} :: lo stesso per le due A, che si scambiano in $2! = 2$ modi

>* **Permutazioni con ripetizione.** Hai $n$ oggetti: $n_1$ uguali fra loro, $n_2$ uguali fra loro, e così via. Le file diverse sono $$P_n^{(n_1,\, n_2,\, \ldots,\, n_h)} = \frac{n!}{n_1! \cdot n_2! \cdot \ldots \cdot n_h!}$$

I numeri $n_1, n_2, \ldots$ si chiamano **molteplicità**: dicono quante volte compare ogni oggetto. Le lettere che compaiono una volta sola hanno molteplicità $1$ e danno $1! = 1$, quindi non cambiano niente.

?? Quanti anagrammi ha la parola NONNA?
[x] $\dfrac{5!}{3!} = 20$
[ ] $\dfrac{5!}{3} = 40$
[ ] $5! = 120$
=> Le lettere sono 5 e la N compare 3 volte, quindi dividi per $3! = 6$. Dividere per $3$ è l'errore classico, perché le tre N si scambiano in $6$ modi.

>! Dividi per il **fattoriale** di quante volte compare ogni lettera. Per MAMMA il denominatore è $3! \cdot 2! = 12$, non $3 \cdot 2 = 6$.` },

    { id: 'combinazioni', titolo: 'Le combinazioni e il coefficiente binomiale', testo: R`Fra 8 studenti scegli una commissione di 3. Qui l'ordine **non** conta, perché Anna, Bruno e Carla sono la stessa commissione in qualunque ordine. Il trucco è contare come se l'ordine contasse, e poi correggere.

[[video:calcolo-combinatorio/disposizioni-combinazioni]]

~ 8 \cdot 7 \cdot 6 = 336 :: se l'ordine contasse (presidente, vice, segretario) sarebbero disposizioni
~ \dfrac{336}{\evid{3!}} :: ma ogni terzetto, come Anna-Bruno-Carla, compare nel conto $3! = 6$ volte, una per ogni ordine possibile
~ \dfrac{336}{6} = \evidb{56} :: le commissioni sono 56

Un gruppo di $k$ elementi scelti fra $n$ senza ordine è una **combinazione semplice**.

>* **Combinazioni semplici** ($k \le n$): $$C_{n,k} = \binom{n}{k} = \frac{D_{n,k}}{k!} = \frac{n!}{k!\,(n-k)!}$$ Il simbolo $\binom{n}{k}$ si legge «$n$ su $k$» e si chiama **coefficiente binomiale**.

A mano scrivi sopra $k$ fattori che scendono da $n$, e sotto $k!$. Per esempio 10 persone si stringono tutte la mano. Una stretta di mano è una coppia senza ordine, quindi sono $\binom{10}{2} = \dfrac{10 \cdot 9}{2} = 45$.

?? In una classe di 20 studenti si eleggono 2 rappresentanti, con lo stesso ruolo. In quanti modi?
[x] $\binom{20}{2} = 190$
[ ] $20 \cdot 19 = 380$
[ ] $20^2 = 400$
=> I due hanno lo stesso ruolo, quindi Luca-Sara è la stessa coppia di Sara-Luca. Il $380$ conta ogni coppia due volte. Il $400$ permette di eleggere due volte la stessa persona.

> **Combinazioni con ripetizione.** Se un elemento si può scegliere più volte e l'ordine non conta, le scelte sono $\binom{n+k-1}{k}$. Per 3 palline di gelato fra 5 gusti sono $\binom{7}{3} = 35$.

>! Chiediti se scambiare due elementi cambia il risultato. In un podio sì, in una commissione no: con 8 elementi e 3 posti trovi $336$ contro $56$.` },

    { id: 'proprieta-binomiale', titolo: 'Proprietà del coefficiente binomiale e triangolo di Tartaglia', testo: R`Quanto vale $\binom{20}{18}$? Scegliere i 18 che entrano è come scegliere i 2 che restano fuori. Quindi $\binom{20}{18} = \binom{20}{2} = \dfrac{20 \cdot 19}{2} = 190$, con due soli fattori. Le proprietà dei coefficienti binomiali servono a risparmiare conti.

| proprietà | formula | perché |
|---|---|---|
| casi limite | $\binom{n}{0} = \binom{n}{n} = 1$ | un solo modo di non prendere nulla, uno solo di prendere tutto |
| | $\binom{n}{1} = \binom{n}{n-1} = n$ | scegliere un elemento, o l'unico da lasciare fuori |
| simmetria | $\binom{n}{k} = \binom{n}{n-k}$ | scegliere chi entra equivale a scegliere chi resta fuori |
| Stifel | $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ | vedi sotto |
| somma di una riga | $\binom{n}{0} + \binom{n}{1} + \ldots + \binom{n}{n} = 2^n$ | ogni elemento o c'è o non c'è: $2^n$ sottoinsiemi |

La **formula di Stifel** vale per $1 \le k \le n-1$. Per capirla, fissa una persona, Anna. Se il gruppo contiene Anna, scegli le altre $k-1$ persone fra $n-1$. Se non la contiene, scegli tutte le $k$ fra le altre $n-1$. I due casi si escludono, quindi si sommano.

?? Quanto vale $\binom{20}{17}$?
[x] $1140$
[ ] $6840$
[ ] $340$
=> Per la simmetria $\binom{20}{17} = \binom{20}{3} = \dfrac{20 \cdot 19 \cdot 18}{3!} = 1140$. Chi risponde $6840$ ha dimenticato di dividere per $3!$.

Con la formula di Stifel costruisci il **triangolo di Tartaglia**. Ogni riga comincia e finisce con 1, e ogni altro numero è la somma dei due che gli stanno sopra.

[[video:calcolo-combinatorio/tartaglia]]

$$\begin{array}{c} 1 \\ 1 \quad 1 \\ 1 \quad 2 \quad 1 \\ 1 \quad 3 \quad 3 \quad 1 \\ 1 \quad 4 \quad 6 \quad 4 \quad 1 \\ 1 \quad 5 \quad 10 \quad 10 \quad 5 \quad 1 \\ 1 \quad 6 \quad 15 \quad 20 \quad 15 \quad 6 \quad 1 \end{array}$$

La riga $n$, contando da 0, contiene $\binom{n}{0}, \binom{n}{1}, \ldots, \binom{n}{n}$. Nella riga 6, per esempio, $\binom{6}{2} = 15$ è il terzo numero, e la somma della riga è $64 = 2^6$.

I numeri di una riga crescono verso il centro e poi calano, come una campana. Nella macchina di Galton le palline fanno la stessa forma: i percorsi verso ogni casella si contano con $\binom{n}{k}$.

[[animazione:galton]]

>! $\binom{n}{k}$ è sempre un numero **intero**: se ti viene un numero con la virgola, hai sbagliato un conto.` },

    { id: 'binomio-newton', titolo: 'Il binomio di Newton', testo: R`Conosci già $(a+b)^2 = a^2 + 2ab + b^2$ e $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. Guarda i coefficienti: $1, 2, 1$ e $1, 3, 3, 1$. Sono le righe 2 e 3 del triangolo di Tartaglia, e per questo i $\binom{n}{k}$ si chiamano coefficienti *binomiali*.

[[video:calcolo-combinatorio/binomio-newton]]

Scrivi $(a+b)^3 = (a+b)(a+b)(a+b)$. Da ogni parentesi prendi $a$ oppure $b$, e moltiplichi. Ottieni $a^2b$ quando prendi $b$ da una parentesi sola. Quella parentesi si sceglie in $\binom{3}{1} = 3$ modi, quindi il coefficiente è $3$.

>* **Binomio di Newton.** Per ogni $n$ intero positivo $$(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k$$ cioè $(a+b)^n = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \ldots + \binom{n}{n}b^n$.

Regole pratiche per scrivere lo sviluppo:

- i termini sono $n+1$;
- l'esponente di $a$ scende da $n$ a 0, quello di $b$ sale da 0 a $n$;
- i coefficienti sono la riga $n$ del triangolo di Tartaglia;
- il **termine generale**, al posto $k+1$, è $\binom{n}{k}a^{n-k}b^k$.

Per esempio $(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$. Se nel binomio c'è un segno meno o un coefficiente, mettilo dentro $a$ o $b$.

~ (2x-1)^3 :: $a = 2x$, $b = -1$; i coefficienti sono la riga 3: $1, 3, 3, 1$
~ \begin{aligned} &(2x)^3 + 3(2x)^2(\evid{-1}) \\ &+ 3(2x)(\evid{-1})^2 + (\evid{-1})^3 \end{aligned} :: l'esponente di $2x$ scende da 3 a 0, quello di $-1$ sale da 0 a 3
~ \evid{8x^3} + 3 \cdot \evid{4x^2} \cdot (-1) + 3 \cdot 2x \cdot 1 - 1 :: calcolo le potenze elevando **tutta** la parentesi: $(2x)^2 = 4x^2$
~ \evidb{8x^3 - 12x^2 + 6x - 1} :: i segni si alternano: le potenze dispari di $-1$ valgono $-1$

Se ti serve un solo termine, usa il termine generale. Per esempio, cerca il termine con $x^2$ in $(x-3)^5$.

~ \binom{5}{k}\, x^{5-k} (-3)^k :: termine generale con $a = x$, $b = -3$, $n = 5$
~ 5 - k = 2 \;\Rightarrow\; \evid{k = 3} :: voglio $x^2$: impongo che l'esponente di $x$ sia 2
~ \binom{5}{\evid{3}} x^2 (-3)^{\evid{3}} = 10 \cdot (-27)\, x^2 :: sostituisco $k = 3$
~ \evidb{-270\,x^2} :: il segno è meno perché $-3$ è elevato a una potenza dispari

?? Qual è il primo termine dello sviluppo di $(2x+1)^4$?
[x] $16x^4$
[ ] $2x^4$
[ ] $8x^4$
=> Il primo termine è $(2x)^4 = 16x^4$. Con $2x^4$ hai elevato solo la $x$, con $8x^4$ hai fatto $2 \cdot 4$ invece di $2^4$.

>! Se $a$ o $b$ non sono lettere semplici, mettili **tra parentesi** ed elevali per intero: $(2x)^3 = 8x^3$, non $2x^3$.` },

    { id: 'riconoscere', titolo: 'Come riconoscere il raggruppamento', testo: R`Nei problemi di calcolo combinatorio si sbaglia soprattutto la scelta della formula. Per sceglierla bastano due domande.

>* 1. **Conta l'ordine?** Se scambio due elementi, il risultato cambia? 2. **Lo stesso elemento può comparire più volte?**

| ordine? | ripetizioni? | si usano |
|---|---|---|
| sì | sì | disposizioni con ripetizione: $n^k$ |
| sì | no | disposizioni semplici: $\dfrac{n!}{(n-k)!}$ |
| sì, tutti | no | permutazioni: $n!$ |
| sì, tutti | oggetti uguali | permutazioni con ripetizione: $\dfrac{n!}{n_1!\cdots n_h!}$ |
| no | no | combinazioni: $\dbinom{n}{k}$ |
| no | sì | combinazioni con ripetizione: $\dbinom{n+k-1}{k}$ |

Una terza domanda aiuta: **li prendo tutti o solo alcuni?** Se metti in fila tutti gli $n$ elementi, sono permutazioni.

?? Con le cifre da 1 a 9, quanti numeri di 3 cifre **tutte diverse** si possono scrivere?
[x] $9 \cdot 8 \cdot 7 = 504$
[ ] $\binom{9}{3} = 84$
[ ] $9^3 = 729$
=> In un numero l'ordine conta, perché 123 e 321 sono diversi, e le cifre non si ripetono. $\binom{9}{3}$ conta solo i gruppi di cifre, $9^3$ ammette anche 555.

I problemi più comuni:

- **targhe, PIN, password, lanci ripetuti di un dado**: ordine sì, ripetizioni sì, quindi $n^k$;
- **podio, cariche diverse (presidente, vice, segretario)**: ordine sì, ripetizioni no, quindi $D_{n,k}$;
- **anagrammi, persone in fila, libri su uno scaffale**: permutazioni;
- **commissioni, squadre, strette di mano, mani di carte**: ordine no, quindi $\binom{n}{k}$;
- **percorsi su un reticolo**: scegli *quali* passi vanno in alto.

Nella griglia qui sotto vai da $A$ a $B$ solo a destra (D) o in alto (A). Ogni percorso fa 6 passi, 3 D e 3 A. Basta scegliere quali 3 passi vanno in alto, quindi i percorsi sono $\binom{6}{3} = 20$.

[[grafico:reticolo]]

>! Con un vincolo come «almeno una vocale» può convenire contare **tutti** i casi. Poi togli quelli che non vanno bene.` }
  ],

  grafici: {
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
        { tipo: 'punto', p: [3, 3], etichetta: 'B', posizione: 'alto' }
      ],
      didascalia: 'Segui il percorso arancione da A a B e scrivi un passo alla volta: D D A A D A. Qualunque altro percorso è un\'altra parola con 3 D e 3 A.'
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
      R`L'ordine conta: ABC e BAC sono sigle diverse. Sono quindi disposizioni.`,
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
    { nome: 'Disposizioni con ripetizione', formula: R`D'_{n,k} = n^k`, nota: R`Ordine sì, ripetizioni sì. Qui $k$ può superare $n$.` },
    { nome: 'Permutazioni semplici', formula: R`P_n = n!`, nota: R`Tutti gli $n$ oggetti, distinti, messi in fila.` },
    { nome: 'Permutazioni con ripetizione', formula: R`P_n^{(n_1, n_2, \ldots, n_h)} = \frac{n!}{n_1! \cdot n_2! \cdot \ldots \cdot n_h!}`, nota: R`Gli anagrammi di una parola con lettere ripetute, dove $n_1 + \ldots + n_h = n$.` },
    { nome: 'Combinazioni semplici', formula: R`C_{n,k} = \binom{n}{k} = \frac{n!}{k!\,(n-k)!}`, nota: R`Ordine no, ripetizioni no. Vale anche $\binom{n}{k} = \dfrac{D_{n,k}}{k!}$.` },
    { nome: 'Combinazioni con ripetizione', formula: R`C'_{n,k} = \binom{n+k-1}{k}`, nota: R`Ordine no, ripetizioni sì.` },
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
    { id: 'fc-03', sezione: 'principio-conteggio', tipo: 'concetto', fronte: R`Che cosa rappresentano le punte finali (le «foglie») di un diagramma ad albero?`, retro: R`Tutti i raggruppamenti possibili: ogni percorso dal punto di partenza a una punta finale è una scelta completa.` },
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
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola $4!$.`, suggerimenti: [R`$4! = 4 \cdot 3 \cdot 2 \cdot 1$.`], risposta: num(24), soluzione: [R`$4! = 4 \cdot 3 \cdot 2 \cdot 1$.`, R`$4 \cdot 3 = 12$, $12 \cdot 2 = 24$: il risultato è $24$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $\dfrac{7!}{5!}$.`, suggerimenti: [R`Scrivi $7! = 7 \cdot 6 \cdot 5!$ e semplifica.`], risposta: num(42), soluzione: [R`$7! = 7 \cdot 6 \cdot 5!$.`, R`Semplifico $5!$: resta $7 \cdot 6 = 42$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $\dbinom{6}{2}$.`, suggerimenti: [R`Sopra due fattori che scendono da $6$, sotto $2!$.`], risposta: num(15), soluzione: [R`$\dbinom{6}{2} = \dfrac{6 \cdot 5}{2!}$.`, R`$\dfrac{30}{2} = 15$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`In quanti modi 6 amici si mettono in fila per una foto?`, suggerimenti: [R`Metti in fila tutti e 6: sono permutazioni.`], risposta: num(720), soluzione: [R`Si usano tutti e l'ordine conta: permutazioni, $6!$.`, R`$6! = 6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 720$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Lanci una moneta 3 volte e scrivi la sequenza di teste e croci. Quante sequenze sono possibili?`, suggerimenti: [R`Ogni lancio ha 2 esiti, e i lanci sono 3.`], risposta: num(8), soluzione: [R`Ogni lancio ha 2 esiti, anche ripetuti, e l'ordine conta.`, R`$2 \cdot 2 \cdot 2 = 2^3 = 8$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Quanti anagrammi, anche senza senso, ha la parola LIBRO?`, suggerimenti: [R`Le 5 lettere sono tutte diverse.`], risposta: num(120), soluzione: [R`Le 5 lettere sono tutte diverse: permutazioni, $5!$.`, R`$5! = 120$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Un lucchetto ha 3 rotelle con le cifre da 0 a 9. Quanti codici diversi si possono impostare?`, suggerimenti: [R`Le cifre si possono ripetere, come in 000.`], risposta: num(1000), soluzione: [R`Ogni rotella ha 10 cifre, anche ripetute, e l'ordine conta.`, R`$10^3 = 1000$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`In una gara con 6 corridori, in quanti modi possono arrivare il primo e il secondo?`, suggerimenti: [R`L'ordine conta e nessuno arriva due volte.`], risposta: num(30), soluzione: [R`Primo: 6 scelte. Secondo: ne restano 5.`, R`$6 \cdot 5 = 30$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`In una classe di 10 studenti si scelgono 2 rappresentanti con lo stesso ruolo. In quanti modi?`, suggerimenti: [R`Lo stesso ruolo: l'ordine non conta.`], risposta: num(45), soluzione: [R`L'ordine non conta: combinazioni, $\dbinom{10}{2}$.`, R`$\dfrac{10 \cdot 9}{2} = 45$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Quante sigle di 2 lettere puoi scrivere con A, B, C, D, E, anche con lettere ripetute?`, suggerimenti: [R`Ogni posto ha 5 scelte, anche uguali.`], risposta: num(25), soluzione: [R`L'ordine conta e le lettere si ripetono: $n^k$.`, R`$5^2 = 25$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Quanti anagrammi ha la parola ANNA?`, suggerimenti: [R`4 lettere: la A due volte, la N due volte.`], risposta: num(6), soluzione: [R`4 lettere, con A due volte e N due volte.`, R`$\dfrac{4!}{2! \cdot 2!} = \dfrac{24}{4} = 6$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`In un club di 7 persone si scelgono presidente, vice e segretario. In quanti modi?`, suggerimenti: [R`Le tre cariche sono diverse: l'ordine conta.`, R`Tre fattori che scendono da 7.`], risposta: num(210), soluzione: [R`Cariche diverse e nessuno ne ha due: disposizioni semplici.`, R`$7 \cdot 6 \cdot 5 = 210$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Una coppetta ha 3 gusti diversi scelti fra 7. Quante coppette diverse puoi avere?`, suggerimenti: [R`Nella coppetta l'ordine dei gusti non conta.`, R`Usa $\dbinom{7}{3}$.`], risposta: num(35), soluzione: [R`Gusti diversi e ordine che non conta: combinazioni.`, R`$\dbinom{7}{3} = \dfrac{7 \cdot 6 \cdot 5}{3!} = \dfrac{210}{6} = 35$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Quanti numeri di 3 cifre tutte diverse puoi scrivere con le cifre 1, 2, 3, 4, 5?`, suggerimenti: [R`In un numero l'ordine conta.`, R`Le cifre non si ripetono: tre fattori che scendono da 5.`], risposta: num(60), soluzione: [R`L'ordine conta e le cifre non si ripetono: disposizioni semplici.`, R`$5 \cdot 4 \cdot 3 = 60$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Lanci un dado 3 volte e scrivi i risultati in ordine. Quante sequenze sono possibili?`, suggerimenti: [R`Ogni lancio ha 6 esiti, e i numeri si possono ripetere.`], risposta: num(216), soluzione: [R`L'ordine conta e i risultati si ripetono: $n^k$.`, R`$6^3 = 216$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Calcola $\dbinom{8}{6}$.`, suggerimenti: [R`Usa la simmetria: $\dbinom{8}{6} = \dbinom{8}{2}$.`], risposta: num(28), soluzione: [R`Per la simmetria $\dbinom{8}{6} = \dbinom{8}{2}$.`, R`$\dbinom{8}{2} = \dfrac{8 \cdot 7}{2} = 28$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Quanti anagrammi ha la parola ROSSO?`, suggerimenti: [R`Conta quante volte compare ogni lettera.`, R`5 lettere: O due volte, S due volte.`], risposta: num(30), soluzione: [R`5 lettere: R una volta, O due volte, S due volte.`, R`$\dfrac{5!}{2! \cdot 2!} = \dfrac{120}{4} = 30$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Fra 9 amici scegli una squadra di 4 giocatori, senza ruoli. Quante squadre puoi formare?`, suggerimenti: [R`Senza ruoli l'ordine non conta.`, R`$\dbinom{9}{4}$: quattro fattori sopra, $4!$ sotto.`], risposta: num(126), soluzione: [R`L'ordine non conta: combinazioni, $\dbinom{9}{4}$.`, R`$\dfrac{9 \cdot 8 \cdot 7 \cdot 6}{4!} = \dfrac{3024}{24}$.`, R`Il risultato è $126$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`5 amici si siedono su 5 sedie in fila, ma Anna vuole la prima sedia. In quanti modi?`, suggerimenti: [R`Il posto di Anna è deciso: restano 4 persone e 4 sedie.`], risposta: num(24), soluzione: [R`Anna sta sulla prima sedia: per lei c'è un solo modo.`, R`Gli altri 4 si mettono in fila sulle 4 sedie rimaste: $4! = 24$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Quanti anagrammi ha la parola BANANA?`, suggerimenti: [R`6 lettere: quante A e quante N?`, R`Dividi $6!$ per il fattoriale di ogni ripetizione.`], risposta: num(60), soluzione: [R`6 lettere: B una volta, A tre volte, N due volte.`, R`$\dfrac{6!}{3! \cdot 2!} = \dfrac{720}{12} = 60$.`] },
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
    { id: 'q-05', domanda: R`Perché $\dbinom{n}{k} = \dfrac{D_{n,k}}{k!}$?`, opzioni: [R`perché ogni combinazione, ordinata in tutti i modi, dà $k!$ disposizioni diverse`, R`perché $k!$ conta gli elementi che restano fuori`, R`perché le combinazioni sono raggruppamenti ordinati`, R`perché $n! = k! \cdot (n-k)!$`], corretta: 0, spiegazione: R`Le disposizioni sono $k!$ volte più numerose delle combinazioni, perché ogni gruppo di $k$ elementi si può ordinare in $k!$ modi. L'uguaglianza $n! = k!\,(n-k)!$ invece è falsa: con $n = 4$ e $k = 2$ darebbe $24 = 4$.` },
    { id: 'q-06', domanda: R`Usando la simmetria del coefficiente binomiale, $\dbinom{12}{10}$ vale…`, opzioni: [R`$66$`, R`$120$`, R`$220$`, R`$12$`], corretta: 0, spiegazione: R`$\dbinom{12}{10} = \dbinom{12}{2} = \dfrac{12 \cdot 11}{2} = 66$. Il valore $220$ è $\dbinom{12}{3}$ e $12$ è $\dbinom{12}{1}$.` },
    { id: 'q-07', domanda: R`La formula di Stifel afferma che…`, opzioni: [R`$\dbinom{n}{k} = \dbinom{n}{n-k}$`, R`$\dbinom{n}{k} = \dbinom{n+1}{k} + \dbinom{n+1}{k+1}$`, R`$\dbinom{n}{k} = \dbinom{n-1}{k-1} + \dbinom{n-1}{k}$`, R`$\dbinom{n}{k} = \dbinom{n-1}{k} \cdot k$`], corretta: 2, spiegazione: R`Ogni numero del triangolo di Tartaglia è la somma dei due che gli stanno sopra, cioè dei due coefficienti della riga precedente. L'uguaglianza $\dbinom{n}{k} = \dbinom{n}{n-k}$ è vera, ma è la simmetria, non Stifel.` },
    { id: 'q-08', domanda: R`La somma dei numeri della riga $n$ del triangolo di Tartaglia vale…`, opzioni: [R`$2^n$`, R`$n!$`, R`$n^2$`, R`$2n$`], corretta: 0, spiegazione: R`$\displaystyle\sum_{k=0}^{n}\binom{n}{k} = 2^n$: contando i sottoinsiemi di un insieme di $n$ elementi in base a quanti elementi hanno si ottengono i coefficienti binomiali, e in totale i sottoinsiemi sono $2^n$ perché ogni elemento o c'è o non c'è.` },
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
    { matematico: 'Blaise Pascal e Pierre de Fermat', anni: '1623–1662 e 1601–1665', titolo: 'Una partita interrotta e poche lettere', testo: R`Nel 1654 il cavaliere de Méré, un nobile giocatore, pose a Pascal un vecchio rompicapo: se una partita a più riprese viene interrotta prima della fine, come si divide equamente la posta fra due giocatori che sono a punteggi diversi? Pascal ne scrisse a Fermat, e i due si scambiarono una manciata di lettere in cui, per risolvere il "problema delle parti", contarono tutti i modi in cui la partita avrebbe potuto proseguire. Fermat elencava i casi, Pascal usava il triangolo aritmetico: strade diverse, stesso risultato. Da quella corrispondenza nasce il calcolo delle probabilità. Poco dopo Pascal ebbe la sua celebre esperienza mistica, si cucì nella giacca il *Mémorial* che la ricordava e lasciò quasi del tutto la matematica per la teologia.`, legame: R`Contare i casi possibili con i coefficienti binomiali: è esattamente il ponte fra questo argomento e la probabilità.` },

    { matematico: 'Niccolò Tartaglia', anni: '1500–1557', titolo: 'Il triangolo che cambia nome a ogni confine', testo: R`In Italia si chiama triangolo di Tartaglia perché il matematico bresciano lo pubblicò nel *General trattato di numeri et misure* (1556); in Francia e nei paesi anglosassoni si chiama triangolo di Pascal, dal *Traité du triangle arithmétique* che Pascal scrisse nel 1654. Nessuno dei due, però, lo inventò. In India la disposizione era nota come *meru-prastara* e compare nel commento di Halayudha (X secolo) a un trattato di metrica di Pingala, di oltre mille anni prima, dove serviva a contare le combinazioni di sillabe lunghe e brevi nei versi. In Cina è il "triangolo di Yang Hui", che nel 1261 lo attribuiva a Jia Xian, vissuto due secoli prima. In Persia lo usavano al-Karaji e Omar Khayyam.`, legame: R`È la tabella dei coefficienti binomiali: la stessa figura che genera lo sviluppo di $(a+b)^n$ con la formula di Stifel.` },

    { matematico: 'Jacob Bernoulli', anni: '1655–1705', titolo: 'Un libro pubblicato otto anni dopo la morte', testo: R`Jacob Bernoulli, il maggiore della famiglia di matematici basilesi, lavorò per anni all'*Ars conjectandi*, il primo trattato sistematico di combinatoria e probabilità. La seconda parte del libro è una teoria ordinata di permutazioni, disposizioni e combinazioni, con la dimostrazione delle proprietà dei coefficienti binomiali; la quarta contiene il teorema che oggi chiamiamo legge dei grandi numeri. Bernoulli morì nel 1705 senza averlo finito, e l'opera uscì solo nel 1713, per iniziativa del nipote Nicolaus. Aveva chiesto che sulla sua tomba fosse incisa una spirale logaritmica con il motto *Eadem mutata resurgo*, «pur cambiata, risorgo la stessa»: lo scalpellino sbagliò e incise una spirale di Archimede.`, legame: R`L'*Ars conjectandi* è il testo in cui permutazioni, disposizioni e combinazioni diventano per la prima volta una teoria unitaria.` },

    { matematico: 'Christian Kramp', anni: '1760–1826', titolo: 'Chi ha inventato il punto esclamativo', testo: R`Il simbolo $n!$ è molto più recente delle idee che rappresenta. Per tutto il Settecento i matematici scrivevano il fattoriale con notazioni ingombranti e diverse fra loro. Fu Christian Kramp, medico e poi professore di matematica a Strasburgo, a introdurre nel 1808, negli *Éléments d'arithmétique universelle*, il punto esclamativo posposto, spiegando che gli serviva una scrittura compatta perché nei suoi calcoli quel prodotto compariva di continuo. Il nome, invece, non è suo: la parola *factorielle* era stata usata nel 1800 da Louis Arbogast, e Kramp la adottò al posto del suo *faculté*. La notazione si diffuse in fretta proprio per la sua economia: un solo carattere al posto di una fila di puntini.`, legame: R`Quasi ogni formula di questo argomento si scrive con il punto esclamativo di Kramp.` },

    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'A vent\'anni, l\'arte di combinare tutto', testo: R`Nel 1666, ad appena vent'anni, Leibniz pubblicò la *Dissertatio de arte combinatoria*. Il suo sogno era smisurato: costruire un alfabeto dei pensieri, in cui ogni concetto complesso fosse una combinazione di concetti semplici, e ridurre così il ragionamento a un calcolo. In caso di disaccordo, scriveva, non resterebbe che dirsi «calcoliamo». La parte matematica del libro studia in modo sistematico permutazioni e combinazioni, e vi compare la parola stessa «combinatoria» nel senso che le diamo oggi. Leibniz da vecchio giudicava quel testo giovanile e immaturo; eppure il progetto di una logica calcolabile che vi si intravede ha aspettato solo due secoli e mezzo, fino ai calcolatori.`, legame: R`È il testo che dà il nome al calcolo combinatorio e ne fa una disciplina a sé.` },
    { matematico: 'Srinivasa Ramanujan', anni: '1887–1920', titolo: 'In quanti modi si scrive un numero', testo: R`Ramanujan crebbe nel sud dell'India e imparò la matematica quasi da solo, su un vecchio libro di formule. Nel 1913 mandò una lettera piena di risultati al matematico inglese G. H. Hardy, che lo invitò a Cambridge. Insieme studiarono le **partizioni**: in quanti modi si può scrivere un numero come somma di numeri interi positivi, senza badare all'ordine. Il $4$ ha $5$ partizioni: $4$, $3+1$, $2+2$, $2+1+1$ e $1+1+1+1$. Crescono in fretta: il $200$ ne ha $3\,972\,999\,029\,388$. Hardy e Ramanujan trovarono una formula che le stima, e un collega le contò tutte a mano fino a $200$ per controllarla. La formula funzionava. Ramanujan si ammalò in Inghilterra e morì a trentadue anni, dopo essere tornato in India.`, legame: R`Contare le partizioni è un problema di calcolo combinatorio in cui l'ordine non conta, come nelle combinazioni: $3+1$ e $1+3$ sono lo stesso modo.` }
  ]
});
})();
