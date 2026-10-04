(function () {
const R = String.raw;
/* risposte dell'allenamento: un numero (anche una radice o una frazione), oppure una percentuale */
const num = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'un numero, es. 6,5', simboli: ['√', '/', '−'] });
const pc = (n, ...fr) => ({ tipo: 'testo', accettate: [n + '%', String(n), String(n / 100), (n / 100).toFixed(2), ...fr], segnaposto: 'es. 40%', simboli: ['%'] });
COMPASSO.registra({
  id: 'statistica',
  titolo: 'Statistica descrittiva',

  introduzione: R`Hai i voti della classe nell'ultima verifica: venticinque numeri. Com'è andata? Guardarli uno per uno non basta.

Allora li conti, li metti in tabella e li riassumi in pochi numeri. Per esempio la media, il voto che sta a metà, quanto sono sparpagliati. Questo è il lavoro della **statistica descrittiva**.

La incontri ogni giorno: la media sul registro, i grafici al telegiornale, i sondaggi. Capire come nascono quei numeri ti aiuta a non farti ingannare.

Ti bastano frazioni, numeri decimali e percentuali.`,

  inBreve: [
    R`Prima chiediti che dati hai: parole (qualitativo), numeri che si contano (discreto) o numeri che si misurano (continuo).`,
    R`Le frequenze relative e le percentuali servono a confrontare gruppi di grandezza diversa. Le relative sommano sempre a $1$.`,
    R`Nella media di una tabella moltiplichi ogni valore per la sua frequenza.`,
    R`La mediana si trova dopo aver ordinato i dati. Un valore anomalo sposta la media, ma quasi non tocca la mediana.`,
    R`La deviazione standard misura quanto i dati stanno lontani dalla media: fai la media dei quadrati degli scarti, poi la radice.`,
    R`Due grandezze possono crescere insieme senza che una causi l'altra.`
  ],

  sezioni: [
    { id: 'popolazione-campione', titolo: 'Popolazione, unità statistica, caratteri', testo: R`Vuoi sapere quante ore dormono gli studenti del tuo liceo. Il liceo ha $900$ iscritti, e tu ne intervisti $90$.

>* La **popolazione** è l'insieme di tutti gli individui che studi: qui i $900$ studenti. Ogni individuo è un'**unità statistica**. Un **campione** è una parte della popolazione: qui i $90$ intervistati.

Il campione deve somigliare alla popolazione, cioè essere **rappresentativo**. Se intervisti solo la squadra di pallavolo, ottieni un'immagine sbagliata della scuola.

Di ogni unità osservi un **carattere**, per esempio le ore di sonno o il colore degli occhi. I valori del carattere si chiamano **modalità**.

- Carattere **qualitativo**: le modalità sono parole (colore degli occhi, sport). Se hanno un ordine naturale, come «insufficiente, sufficiente, buono», il carattere è *ordinabile*. Altrimenti è *sconnesso*.
- Carattere **quantitativo discreto**: le modalità sono numeri che si **contano** (fratelli, voti, errori in un dettato).
- Carattere **quantitativo continuo**: le modalità sono numeri che si **misurano** (altezza, peso, tempo).

?? Il numero di maglia dei giocatori di una squadra di calcio è un carattere…
[x] qualitativo
[ ] quantitativo discreto
[ ] quantitativo continuo
=> Il numero di maglia è un nome scritto con le cifre. La media dei numeri di maglia non vuol dire niente, e il 10 non è «più» del 5.

>! Un carattere fatto di numeri non è per forza quantitativo. Se fare la media non ha senso, il carattere è qualitativo.` },

    { id: 'frequenze', titolo: 'Frequenze assolute, relative, percentuali e cumulate', testo: R`Ecco i voti di una verifica in una classe di $N = 25$ studenti. Il $6$ l'hanno preso in $7$. Allora $7$ è la sua frequenza assoluta, $\dfrac{7}{25} = 0{,}28$ la relativa, $28\%$ la percentuale.

>* La **frequenza assoluta** $n_i$ dice quante volte compare il valore $x_i$. La **frequenza relativa** è $f_i = \dfrac{n_i}{N}$. La **frequenza percentuale** è $f_i \cdot 100$.

| voto $x_i$ | $n_i$ | $f_i$ | % | $N_i$ |
|---|---|---|---|---|
| 3 | 1 | 0,04 | 4 | 1 |
| 4 | 2 | 0,08 | 8 | 3 |
| 5 | 4 | 0,16 | 16 | 7 |
| 6 | 7 | 0,28 | 28 | 14 |
| 7 | 5 | 0,20 | 20 | 19 |
| 8 | 4 | 0,16 | 16 | 23 |
| 9 | 1 | 0,04 | 4 | 24 |
| 10 | 1 | 0,04 | 4 | 25 |
| totale | 25 | 1,00 | 100 | |

Controlla sempre i totali. Le frequenze assolute sommano a $N$, le relative a $1$, le percentuali a $100$.

Le frequenze relative servono a **confrontare gruppi di grandezza diversa**.

?? In 3ªA (25 studenti) ci sono 5 insufficienze, in 3ªB (20 studenti) anche 5. Dove è andata peggio?
[x] in 3ªB: $25\%$ contro $20\%$
[ ] è andata uguale: 5 e 5
[ ] in 3ªA, che ha più studenti
=> In 3ªA le insufficienze sono $\dfrac{5}{25} = 0{,}20$, cioè il $20\%$. In 3ªB sono $\dfrac{5}{20} = 0{,}25$, cioè il $25\%$. Lo stesso numero pesa di più nella classe più piccola.

La **frequenza cumulata** $N_i$ risponde alla domanda «quanti hanno preso *al più* 6?». Sommi le frequenze fino a quel valore: $1 + 2 + 4 + 7 = 14$. Ha senso solo se le modalità hanno un ordine.` },

    { id: 'classi', titolo: 'Tabelle per classi e densità di frequenza', testo: R`Misuri l'altezza di 40 studenti al millimetro. Quasi di sicuro non ci sono due misure uguali. Una tabella con 40 righe, tutte con frequenza 1, non direbbe niente. Allora raggruppi i dati in **classi**.

>* Una **classe** è un intervallo di valori, come $[165; 170)$. La sua **ampiezza** $a_i$ è la differenza fra gli estremi. Il suo **valore centrale** $c_i$ è la media dei due estremi.

Ecco le altezze in centimetri, in classi di ampiezza 5:

| classe | $c_i$ | $n_i$ | $f_i$ | $h_i$ |
|---|---|---|---|---|
| [155; 160) | 157,5 | 3 | 0,075 | 0,6 |
| [160; 165) | 162,5 | 7 | 0,175 | 1,4 |
| [165; 170) | 167,5 | 12 | 0,300 | 2,4 |
| [170; 175) | 172,5 | 11 | 0,275 | 2,2 |
| [175; 180) | 177,5 | 5 | 0,125 | 1,0 |
| [180; 185) | 182,5 | 2 | 0,050 | 0,4 |

Le classi sono chiuse a sinistra e aperte a destra. Così uno studente alto 170 cm finisce solo in $[170; 175)$.

Se le classi hanno **ampiezze diverse**, le frequenze ingannano. Una classe larga raccoglie più dati solo perché è larga. Allora dividi la frequenza per l'ampiezza.

>* La **densità di frequenza** di una classe è $$h_i = \frac{n_i}{a_i}$$

La densità dice quanti dati ci sono per ogni centimetro di classe.

?? Un circolo ha 30 iscritti fra 0 e 10 anni e 60 iscritti fra 10 e 30 anni. In quale fascia le età sono più «fitte»?
[ ] fra 10 e 30, perché ha il doppio degli iscritti
[x] sono fitte uguali
[ ] fra 0 e 10, perché è la classe più stretta
=> Le densità sono $\dfrac{30}{10} = 3$ e $\dfrac{60}{20} = 3$ iscritti per anno di età: uguali. La seconda classe ha il doppio degli iscritti, ma è anche larga il doppio.

>! Con le classi perdi i dati originali. Per questo la media calcolata con i valori centrali è **approssimata**.` },

    { id: 'rappresentazioni', titolo: 'Quale grafico usare', testo: R`Un grafico fa vedere i dati tutti insieme. Ogni tipo di grafico serve per un tipo di dati.

- **Ortogramma** (a barre): barre staccate, alte quanto la frequenza. Per caratteri qualitativi e discreti.
- **Istogramma**: barre attaccate, una per classe. Per caratteri continui divisi in classi.
- **Aerogramma** (a torta): un cerchio diviso in settori. Per le parti di un totale.
- **Diagramma cartesiano**: punti uniti da una spezzata, con il tempo in orizzontale. Per un andamento nel tempo, cioè una **serie storica**.

Nell'ortogramma le barre sono **staccate**, perché fra 2 fratelli e 3 fratelli non c'è niente. Nell'istogramma sono **attaccate**, perché le classi si toccano.

Nell'istogramma conta l'**area** dei rettangoli. Se le classi hanno ampiezze diverse, l'altezza è la densità $h_i$.

Nell'aerogramma l'angolo di un settore è $\alpha_i = f_i \cdot 360^\circ$. Se il $45\%$ degli studenti va a scuola in autobus, il settore è $0{,}45 \cdot 360^\circ = 162^\circ$.

?? Vuoi mostrare come sono cambiati, mese per mese, gli iscritti alla palestra della scuola. Quale grafico scegli?
[x] un diagramma cartesiano
[ ] un aerogramma
[ ] un istogramma
=> Vuoi vedere un **andamento nel tempo**: mesi in orizzontale, iscritti in verticale. Gli iscritti dei vari mesi non sono parti di un totale, quindi la torta non va bene.

>! Guarda sempre da dove parte l'asse verticale. Se parte da 700 invece che da 0, un aumento da 700 a 710 sembra enorme. Invece è poco più dell'$1\%$.` }
,

    { id: 'indici-posizione', titolo: 'Media, mediana e moda', testo: R`«Com'è andata la verifica?» Nessuno risponde leggendo venticinque voti. Si dice un numero solo, per esempio «la media è 6,36». Un numero così si chiama **indice di posizione**. I più usati sono media, mediana e moda.

[[video:statistica/media-mediana-moda]]

I voti $4, 6, 8$ hanno media $\dfrac{4 + 6 + 8}{3} = 6$: sommi i dati e dividi per quanti sono.

>* **Media aritmetica**: $$\overline{x} = \frac{x_1 + x_2 + \dots + x_N}{N}$$

In una tabella, ogni valore conta tante volte quanta è la sua frequenza. Allora usi la **media ponderata**: $$\overline{x} = \frac{\sum x_i n_i}{N}$$

Con i voti della tabella delle frequenze:

~ 3 + 8 + 20 + 42 + 35 + 32 + 9 + 10 :: moltiplico ogni voto per quanti l'hanno preso: $3 \cdot 1$, $4 \cdot 2$, $5 \cdot 4$, $6 \cdot 7$, ... e metto in fila i prodotti $x_i n_i$
~ \textstyle\sum x_i n_i = \evid{159} :: sommo i prodotti
~ \overline{x} = \dfrac{159}{\evid{25}} = \evidb{6{,}36} :: divido per il numero di studenti, $25$, non per il numero di voti diversi, $8$

I pesi possono essere anche altri numeri. Lo scritto vale il doppio dell'orale, e hai 7 allo scritto e 6 all'orale. La media è $\dfrac{7 \cdot 2 + 6 \cdot 1}{3} = \dfrac{20}{3} \approx 6{,}67$, non $6{,}5$.

La media è il punto di **equilibrio** dei dati: la somma degli scarti $x_i - \overline{x}$ fa sempre zero. Nel laboratorio «La tavola in equilibrio» lo vedi con dei pesi su una tavola.

>* **Mediana**: il valore al centro, dopo aver **ordinato** i dati. Con $N$ pari è la media dei due valori centrali. **Moda**: il valore con la frequenza più alta.

Nei 25 voti in ordine, il tredicesimo è un 6: la mediana è $6$. Anche la moda è $6$, preso da 7 studenti.

Con $N$ pari, per esempio $2, 4, 6, 10$, i centrali sono $4$ e $6$. La mediana è $\dfrac{4 + 6}{2} = 5$.

?? Qual è la mediana dei dati $2, 9, 4, 7, 5$?
[x] $5$
[ ] $4$
[ ] $5{,}4$
=> In ordine i dati sono $2, 4, 5, 7, 9$, e quello centrale è $5$. Il $4$ sta a metà dell'elenco **non ordinato**. $5{,}4$ è la media.

Un **valore anomalo** è un dato molto lontano dagli altri. La media lo sente molto, la mediana quasi per niente. Prendi cinque stipendi annui, in migliaia di euro: 20, 24, 28, 32 e 200. La media è $60{,}8$, ma nessuno prende quella cifra. La mediana è $28$ e descrive meglio l'azienda.

[[video:statistica/valore-anomalo]]

Nel grafico trascina il quinto stipendio (il punto arancione) e guarda le due linee.

[[grafico:outlier]]

La mediana si muove solo quando il quinto stipendio sta fra 24 e 28. La media invece lo segue sempre.

>! Per un carattere qualitativo, come il colore degli occhi, la media non esiste: usi la moda.` },

    { id: 'variabilita', titolo: 'Indici di variabilità', testo: R`Due classi hanno entrambe media $6$. Nella prima i voti sono $5, 6, 6, 6, 7$: tutti vicini. Nella seconda sono $1, 2, 6, 10, 11$: molto sparpagliati. La media non vede la differenza, quindi serve un altro numero.

[[video:statistica/varianza]]

Lavoriamo sui dati $3, 5, 6, 7, 9$, che hanno media $6$.

Il **campo di variazione** è il dato più grande meno il più piccolo: $9 - 3 = 6$. È facile, ma guarda solo due dati.

Per usare tutti i dati, guardi quanto ognuno dista dalla media. La differenza $x_i - \overline{x}$ si chiama **scarto**. Gli scarti però sommano sempre zero. Per togliere il segno ci sono due strade:

- il valore assoluto: lo **scarto medio assoluto** è $S = \dfrac{1}{N}\sum |x_i - \overline{x}|$, qui $\dfrac{3 + 1 + 0 + 1 + 3}{5} = 1{,}6$;
- il quadrato: è la strada della varianza, la più usata.

>* **Varianza**: la media dei quadrati degli scarti, $$\sigma^2 = \frac{1}{N}\sum (x_i - \overline{x})^2$$ **Deviazione standard** (o scarto quadratico medio): $\sigma = \sqrt{\sigma^2}$.

~ \overline{x} = \dfrac{3 + 5 + 6 + 7 + 9}{5} = 6 :: prima di tutto la media
~ x_i - \overline{x}:\quad \evid{-3,\ -1,\ 0,\ 1,\ 3} :: gli scarti: ogni dato meno la media (controllo: sommano $0$)
~ (x_i - \overline{x})^2:\quad \evid{9,\ 1,\ 0,\ 1,\ 9} :: al quadrato: spariscono i segni, e gli scarti grandi pesano molto di più
~ \sigma^2 = \dfrac{9 + 1 + 0 + 1 + 9}{5} = \evid{4} :: la varianza è la media dei quadrati
~ \sigma = \sqrt{4} = \evidb{2} :: con la radice si torna all'unità di misura dei dati

Perché la radice alla fine? Se i dati sono in centimetri, la varianza è in centimetri **quadrati**. Con la radice torni ai centimetri. Così $\sigma$ si confronta con i dati: è la distanza tipica di un dato dalla media.

Nel grafico ogni dato ha un quadrato con il lato uguale al suo scarto. La varianza è la media delle aree. Trascina i due punti arancioni lontano dalla media: i quadrati crescono molto più in fretta degli scarti.

[[grafico:scarto]]

?? I dati $3, 5, 6, 7, 9$ hanno $\sigma = 2$. Se aggiungi $10$ a ogni dato ($13, 15, 16, 17, 19$), quanto vale $\sigma$?
[x] ancora $2$
[ ] $12$
[ ] $4$
=> Anche la media si sposta, e diventa $16$. Gli scarti restano $-3, -1, 0, 1, 3$, quindi $\sigma$ non cambia. $\sigma$ misura quanto i dati sono sparsi, non dove stanno.

Per la varianza c'è anche una **formula rapida**: la media dei quadrati meno il quadrato della media. È comoda quando la media non è un numero tondo.

~ \sigma^2 = \overline{x^2} - \overline{x}^{\,2} :: media dei quadrati, meno la media al quadrato
~ \overline{x^2} = \dfrac{9 + 25 + 36 + 49 + 81}{5} = \evid{40} :: elevo al quadrato ogni **dato** (non lo scarto) e faccio la media
~ \sigma^2 = 40 - \evid{6^2} = \evidb{4} :: tolgo il quadrato della media: stesso risultato di prima

Il **coefficiente di variazione** è $\text{CV} = \dfrac{\sigma}{\overline{x}}$, qui $\dfrac{2}{6} \approx 33\%$. Non ha unità di misura, quindi confronta grandezze diverse, come altezze e pesi.

>! La varianza non è mai negativa. Se ti viene negativa, forse hai confuso $\overline{x^2}$, la media dei quadrati, con $\overline{x}^{\,2}$, il quadrato della media.` },

    { id: 'doppia-entrata', titolo: 'Due caratteri insieme: tabelle e correlazione', testo: R`Chiedi a 120 studenti se sono maschi o femmine, e quale sport fanno. Ogni studente ha **due** caratteri. I dati vanno in una **tabella a doppia entrata**: un carattere sulle righe, l'altro sulle colonne.

| | maschi | femmine | tot. |
|---|---|---|---|
| calcio | 40 | 10 | 50 |
| pallavolo | 10 | 30 | 40 |
| nuoto | 20 | 10 | 30 |
| totale | 70 | 50 | 120 |

I totali di riga e di colonna sono le **frequenze marginali**. Descrivono un carattere alla volta: quanti maschi, quanti calciatori.

Ora guarda una colonna sola e dividi per il suo totale: ottieni le **frequenze condizionate**. Fra i maschi il calcio ha $\dfrac{40}{70} \approx 57\%$, fra le femmine $\dfrac{10}{50} = 20\%$. Le percentuali sono diverse, quindi i due caratteri **non sono indipendenti**.

?? Nella tabella, fra i maschi, che percentuale fa nuoto?
[x] circa il $29\%$
[ ] circa il $67\%$
[ ] circa il $17\%$
=> I maschi sono $70$ e di questi $20$ nuotano: $\dfrac{20}{70} \approx 0{,}29$. Il $67\%$ è $\dfrac{20}{30}$, la percentuale di maschi **fra chi nuota**. Il $17\%$ è $\dfrac{20}{120}$, su tutti gli studenti.

Se i due caratteri sono numeri, ogni studente diventa un punto $(x_i, y_i)$. L'insieme dei punti è una **nuvola di punti**. Nel grafico ci sono otto studenti: in orizzontale le ore di studio a settimana, in verticale il voto medio.

>* Il **coefficiente di correlazione** $r$ va da $-1$ a $1$ e dice quanto i punti stanno su una retta. Vicino a $1$: retta che sale. Vicino a $-1$: retta che scende. Vicino a $0$: nessun legame lineare.

La **retta di regressione** passa «in mezzo» ai punti nel modo migliore. Per gli otto studenti è $y = 0{,}5x + 3{,}75$, con $r \approx 0{,}98$. Lo $0{,}5$ vuol dire: un'ora di studio in più vale in media mezzo punto.

Trascina l'ottavo studente (il punto arancione) in basso a destra. Un solo punto anomalo piega la retta e fa crollare $r$.

[[grafico:regressione]]

>! Due grandezze possono crescere insieme senza che una causi l'altra. I gelati venduti e gli annegamenti crescono insieme, ma per una terza causa: il caldo.` },

    { id: 'normale', titolo: 'La distribuzione normale', testo: R`Misura l'altezza di migliaia di persone e disegna l'istogramma. Viene una **campana**: simmetrica, alta al centro e bassa ai lati. Si chiama **distribuzione normale**, o gaussiana. La stessa forma esce per il peso dei neonati e per gli errori di misura.

[[video:statistica/campana]]

Queste grandezze nascono da tanti piccoli effetti a caso che si sommano. Lo vedi nella macchina di Galton: ogni pallina riceve tanti urti a caso, e le palline si ammucchiano a campana.

[[animazione:galton]]

La campana dipende da due numeri. La media $\mu$ dice **dove** sta il centro. La deviazione standard $\sigma$ dice **quanto** è larga. Muovi i cursori: con $\mu$ la campana scivola di lato, con $\sigma$ si allarga e si abbassa.

[[grafico:gaussiana]]

>* **Regola 68 - 95 - 99,7**: circa il $68\%$ dei dati sta fra $\mu - \sigma$ e $\mu + \sigma$. Circa il $95\%$ sta fra $\mu - 2\sigma$ e $\mu + 2\sigma$. Circa il $99{,}7\%$ sta fra $\mu - 3\sigma$ e $\mu + 3\sigma$.

Le altezze dei diciottenni hanno $\mu = 170$ cm e $\sigma = 8$ cm. Allora circa 68 ragazzi su 100 stanno fra 162 e 178 cm. Circa 95 su 100 stanno fra 154 e 186 cm.

?? Sempre con $\mu = 170$ cm e $\sigma = 8$ cm, circa quanti ragazzi su 100 superano i 178 cm?
[x] circa $16$
[ ] circa $32$
[ ] circa $68$
=> Fra 162 e 178 cm ce ne sono circa $68$, quindi fuori ne restano $32$. La campana è simmetrica: metà sta sotto i 162 cm e metà sopra i 178 cm. Quindi circa $16$.

>! Non tutti i dati hanno forma di campana. I redditi, per esempio, sono molto asimmetrici: lì la regola del 68 non vale.` }
  ],

  grafici: {
    outlier: {
      tipo: 'piano', x: [0, 210], y: [-1.2, 2.6], altezza: 300,
      proporzioni: 'libere', assi: false, griglia: false,
      parametri: [{ nome: 'd', min: 0, max: 205, passo: 1, valore: 200, nascosto: true }],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [210, 0] },
        { tipo: 'testo', p: [0, -0.55], testo: '0', ancora: 'start' },
        { tipo: 'testo', p: [50, -0.55], testo: '50' },
        { tipo: 'testo', p: [100, -0.55], testo: '100' },
        { tipo: 'testo', p: [150, -0.55], testo: '150' },
        { tipo: 'testo', p: [210, 2.1], testo: 'migliaia di €', ancora: 'end' },
        { tipo: 'verticale', x: 'min(max(d, 24), 28)', tratteggio: true, colore: 4 },
        { tipo: 'verticale', x: '(104 + d)/5', tratteggio: true, colore: 3 },
        { tipo: 'punto', p: [20, 0], colore: 1 },
        { tipo: 'punto', p: [24, 0], colore: 1 },
        { tipo: 'punto', p: [28, 0], colore: 1 },
        { tipo: 'punto', p: [32, 0], colore: 1 },
        { tipo: 'punto', p: ['d', 0], trascina: true, colore: 2, etichetta: '{{d}}', posizione: 'basso' },
        { tipo: 'testo', p: [60, 2.1], testo: 'media = {{(104 + d)/5}}', ancora: 'start' },
        { tipo: 'testo', p: [60, 1.4], testo: 'mediana = {{min(max(d, 24), 28)}}', ancora: 'start' }
      ],
      didascalia: 'Quattro stipendi fermi (20, 24, 28 e 32 mila euro) e il quinto da trascinare. Linea verde: la media. Linea viola: la mediana. Porta il quinto stipendio da 200 fino a 0 e guarda quale delle due linee lo segue.'
    },
    scarto: {
      tipo: 'piano', x: [0, 12], y: [-1.3, 7.2], altezza: 440,
      proporzioni: 'uguali', assi: false, griglia: false,
      parametri: [
        { nome: 'a', min: 0, max: 12, passo: 0.5, valore: 3, nascosto: true },
        { nome: 'b', min: 0, max: 12, passo: 0.5, valore: 9, nascosto: true }
      ],
      elementi: [
        { tipo: 'poligono', colore: 2, punti: [['a', 0], ['(a + b + 18)/5', 0], ['(a + b + 18)/5', 'abs(a - (a + b + 18)/5)'], ['a', 'abs(a - (a + b + 18)/5)']] },
        { tipo: 'poligono', colore: 2, punti: [['b', 0], ['(a + b + 18)/5', 0], ['(a + b + 18)/5', 'abs(b - (a + b + 18)/5)'], ['b', 'abs(b - (a + b + 18)/5)']] },
        { tipo: 'poligono', colore: 1, punti: [[5, 0], ['(a + b + 18)/5', 0], ['(a + b + 18)/5', 'abs(5 - (a + b + 18)/5)'], [5, 'abs(5 - (a + b + 18)/5)']] },
        { tipo: 'poligono', colore: 1, punti: [[6, 0], ['(a + b + 18)/5', 0], ['(a + b + 18)/5', 'abs(6 - (a + b + 18)/5)'], [6, 'abs(6 - (a + b + 18)/5)']] },
        { tipo: 'poligono', colore: 1, punti: [[7, 0], ['(a + b + 18)/5', 0], ['(a + b + 18)/5', 'abs(7 - (a + b + 18)/5)'], [7, 'abs(7 - (a + b + 18)/5)']] },
        { tipo: 'segmento', da: [0, 0], a: [12, 0] },
        { tipo: 'testo', p: [0, -0.75], testo: '0' },
        { tipo: 'testo', p: [3, -0.75], testo: '3' },
        { tipo: 'testo', p: [6, -0.75], testo: '6' },
        { tipo: 'testo', p: [9, -0.75], testo: '9' },
        { tipo: 'testo', p: [12, -0.75], testo: '12' },
        { tipo: 'segmento', da: ['(a + b + 18)/5', -0.3], a: ['(a + b + 18)/5', 5.9], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: [5, 0], colore: 1 },
        { tipo: 'punto', p: [6, 0], colore: 1 },
        { tipo: 'punto', p: [7, 0], colore: 1 },
        { tipo: 'punto', p: ['a', 0], trascina: true, colore: 2 },
        { tipo: 'punto', p: ['b', 0], trascina: true, colore: 2 },
        { tipo: 'testo', p: [0.1, 6.8], testo: 'media = {{(a + b + 18)/5}}', ancora: 'start' },
        { tipo: 'testo', p: [0.1, 6.1], testo: 'σ² = {{(a^2 + b^2 + 110)/5 - ((a + b + 18)/5)^2}}   σ = {{sqrt(abs((a^2 + b^2 + 110)/5 - ((a + b + 18)/5)^2))}}', ancora: 'start' }
      ],
      didascalia: 'Cinque dati: tre fermi (5, 6, 7) e due arancioni da trascinare. Ogni quadrato ha per lato lo scarto di un dato dalla media (linea verde): la varianza è la media delle aree dei cinque quadrati.'
    },
    regressione: {
      tipo: 'piano', x: [0, 9], y: [0, 10], passo: [1, 1], altezza: 380,
      proporzioni: 'libere',
      etichette: { x: 'ore di studio', y: 'voto' },
      parametri: [
        { nome: 'u', min: 0, max: 9, passo: 0.5, valore: 8, nascosto: true },
        { nome: 'v', min: 1, max: 9.5, passo: 0.5, valore: 8, nascosto: true }
      ],
      punti: [
        { x: 1, y: 4 }, { x: 2, y: 5 }, { x: 3, y: 5.5 }, { x: 4, y: 5.5 },
        { x: 5, y: 6.5 }, { x: 6, y: 6.5 }, { x: 7, y: 7 }
      ],
      elementi: [
        { tipo: 'retta', colore: 3,
          m: '(8*(173 + u*v) - (28 + u)*(40 + v))/(8*(140 + u^2) - (28 + u)^2)',
          q: '((40 + v) - (28 + u)*(8*(173 + u*v) - (28 + u)*(40 + v))/(8*(140 + u^2) - (28 + u)^2))/8' },
        { tipo: 'punto', p: ['(28 + u)/8', '(40 + v)/8'], colore: 4, vuoto: true },
        { tipo: 'punto', p: ['u', 'v'], trascina: true, colore: 2 },
        { tipo: 'testo', p: [1, 9.4], testo: 'r = {{(8*(173 + u*v) - (28 + u)*(40 + v))/sqrt((8*(140 + u^2) - (28 + u)^2)*(8*(235 + v^2) - (40 + v)^2))}}    m = {{(8*(173 + u*v) - (28 + u)*(40 + v))/(8*(140 + u^2) - (28 + u)^2)}}', ancora: 'start' }
      ],
      didascalia: 'Otto studenti: ore di studio e voto. Il punto arancione è l\'ottavo studente e si trascina; la retta verde è la retta di regressione, il cerchietto viola il punto delle medie. Guarda come cambiano la retta e r.'
    },
    gaussiana: {
      tipo: 'piano', x: [-6, 6], y: [-0.05, 0.9], passo: [1, 0.1], altezza: 320,
      funzioni: [{ f: 'exp(-((x-m)^2)/(2*s^2))/(s*sqrt(2*pi))', etichetta: 'campana', colore: 1 }],
      elementi: [
        { tipo: 'area', f: 'exp(-((x-m)^2)/(2*s^2))/(s*sqrt(2*pi))', da: 'm-s', a: 'm+s', etichetta: '68%' },
        { tipo: 'verticale', x: 'm', tratteggio: true, colore: 4 }
      ],
      parametri: [
        { nome: 'm', min: -3, max: 3, passo: 0.1, valore: 0, etichetta: 'media' },
        { nome: 's', min: 0.5, max: 3, passo: 0.1, valore: 1, etichetta: 'dev. standard' }
      ],
      didascalia: 'Muovi la media e la deviazione standard. La zona colorata va da μ − σ a μ + σ: cambia forma, ma contiene sempre circa il 68% dei dati.'
    }
  },

  esempi: [
    { titolo: 'Dalla lista grezza alla tabella', problema: R`In una classe di 20 studenti si è chiesto il numero di fratelli. Le risposte, nell'ordine in cui sono arrivate, sono: 1, 0, 2, 1, 3, 1, 0, 2, 1, 1, 0, 4, 2, 1, 0, 2, 1, 3, 1, 2. Costruisci la tabella delle frequenze assolute, relative e percentuali.`, passi: [
      R`Il carattere «numero di fratelli» è quantitativo **discreto**: le modalità sono i numeri interi che compaiono, cioè $0, 1, 2, 3, 4$.`,
      R`Conto una modalità alla volta, spuntando i valori: lo $0$ compare 4 volte, l'$1$ otto volte, il $2$ cinque volte, il $3$ due volte, il $4$ una volta.`,
      R`Controllo subito: $4 + 8 + 5 + 2 + 1 = 20 = N$. Se non tornasse, avrei perso o contato due volte un dato.`,
      R`Le frequenze relative si ottengono dividendo per $20$: $0{,}20$; $0{,}40$; $0{,}25$; $0{,}10$; $0{,}05$. Moltiplicate per 100 danno 20, 40, 25, 10, 5 per cento, che sommano 100.`,
      R`| fratelli | $n_i$ | $f_i$ | percentuale |
|---|---|---|---|
| 0 | 4 | 0,20 | 20 |
| 1 | 8 | 0,40 | 40 |
| 2 | 5 | 0,25 | 25 |
| 3 | 2 | 0,10 | 10 |
| 4 | 1 | 0,05 | 5 |`
    ], risultato: R`Frequenze assolute $4, 8, 5, 2, 1$; relative $0{,}20$; $0{,}40$; $0{,}25$; $0{,}10$; $0{,}05$.` },

    { titolo: 'Media, mediana e moda da una tabella', problema: R`Usando la tabella dell'esempio precedente (20 studenti, numero di fratelli), calcola media, mediana e moda.`, passi: [
      R`**Media ponderata**: ogni modalità pesa quanto la sua frequenza. $\overline{x} = \dfrac{0 \cdot 4 + 1 \cdot 8 + 2 \cdot 5 + 3 \cdot 2 + 4 \cdot 1}{20} = \dfrac{0 + 8 + 10 + 6 + 4}{20} = \dfrac{28}{20} = 1{,}4$.`,
      R`Un valore non intero non è un errore: nessuno ha $1{,}4$ fratelli, ma la media è comunque il baricentro dei dati.`,
      R`**Mediana**: $N = 20$ è pari, quindi servono il decimo e l'undicesimo dato ordinato. Le frequenze cumulate sono $4$ (fino a 0) e $12$ (fino a 1): sia il decimo sia l'undicesimo valore sono un $1$.`,
      R`Quindi la mediana è $\dfrac{1 + 1}{2} = 1$.`,
      R`**Moda**: la frequenza più alta è $8$, in corrispondenza della modalità $1$. La moda è $1$.`
    ], risultato: R`Media $1{,}4$, mediana $1$, moda $1$.` },

    { titolo: 'Media di dati raggruppati in classi', problema: R`Calcola l'altezza media dei 40 studenti della tabella per classi, e indica la classe modale e la classe mediana.`, passi: [
      R`Dei dati originali resta solo la classe, quindi si assume che tutti gli studenti di una classe abbiano il **valore centrale**: $157{,}5$; $162{,}5$; $167{,}5$; $172{,}5$; $177{,}5$; $182{,}5$.`,
      R`Si applica la media ponderata con pesi le frequenze: $157{,}5 \cdot 3 + 162{,}5 \cdot 7 + 167{,}5 \cdot 12 + 172{,}5 \cdot 11 + 177{,}5 \cdot 5 + 182{,}5 \cdot 2$.`,
      R`I prodotti valgono $472{,}5$; $1137{,}5$; $2010$; $1897{,}5$; $887{,}5$; $365$, e la loro somma è $6770$.`,
      R`Quindi $\overline{x} = \dfrac{6770}{40} = 169{,}25$ cm. È un valore **approssimato**: il raggruppamento in classi ha cancellato le misure esatte.`,
      R`La **classe modale** è quella con la frequenza più alta: $[165; 170)$, con 12 studenti.`,
      R`Per la mediana servono il ventesimo e il ventunesimo dato ($N = 40$ è pari). Le frequenze cumulate sono $3, 10, 22$: i dati dall'undicesimo al ventiduesimo stanno in $[165; 170)$, quindi anche il ventesimo e il ventunesimo. È la **classe mediana**.`
    ], risultato: R`$\overline{x} = 169{,}25$ cm; classe modale e classe mediana entrambe $[165; 170)$.` },

    { titolo: 'Varianza e deviazione standard', problema: R`Calcola campo di variazione, scarto medio assoluto, varianza, deviazione standard e coefficiente di variazione dei dati $4, 6, 8, 10, 12$.`, passi: [
      R`Media: $\overline{x} = \dfrac{4 + 6 + 8 + 10 + 12}{5} = \dfrac{40}{5} = 8$.`,
      R`Campo di variazione: $R = 12 - 4 = 8$.`,
      R`Scarti dalla media: $-4, -2, 0, 2, 4$. In valore assoluto $4, 2, 0, 2, 4$, che sommano $12$: lo scarto medio assoluto è $\dfrac{12}{5} = 2{,}4$.`,
      R`Quadrati degli scarti: $16, 4, 0, 4, 16$, somma $40$. Varianza: $\sigma^2 = \dfrac{40}{5} = 8$.`,
      R`Deviazione standard: la radice della varianza, $\sigma = \sqrt{8} = 2\sqrt{2} \approx 2{,}83$.`,
      R`Controllo con la formula rapida: la media dei quadrati dei dati è $\dfrac{16 + 36 + 64 + 100 + 144}{5} = \dfrac{360}{5} = 72$, e $72 - 8^2 = 72 - 64 = 8$. ✓`,
      R`Coefficiente di variazione: $\text{CV} = \dfrac{2{,}83}{8} \approx 0{,}35$, cioè circa il 35%.`
    ], risultato: R`$R = 8$, $S = 2{,}4$, $\sigma^2 = 8$, $\sigma \approx 2{,}83$, $\text{CV} \approx 0{,}35$.` },

    { titolo: 'Retta di regressione e correlazione', problema: R`Otto studenti hanno dichiarato le ore di studio settimanali $x$ e hanno ottenuto il voto medio $y$: $(1; 4)$, $(2; 5)$, $(3; 5{,}5)$, $(4; 5{,}5)$, $(5; 6{,}5)$, $(6; 6{,}5)$, $(7; 7)$, $(8; 8)$. Trova la retta di regressione e il coefficiente di correlazione.`, passi: [
      R`Medie: $\overline{x} = \dfrac{1 + 2 + \dots + 8}{8} = \dfrac{36}{8} = 4{,}5$ e $\overline{y} = \dfrac{48}{8} = 6$.`,
      R`Scarti di $x$: $-3{,}5$; $-2{,}5$; $-1{,}5$; $-0{,}5$; $0{,}5$; $1{,}5$; $2{,}5$; $3{,}5$. Scarti di $y$: $-2$; $-1$; $-0{,}5$; $-0{,}5$; $0{,}5$; $0{,}5$; $1$; $2$.`,
      R`Prodotti degli scarti: $7$; $2{,}5$; $0{,}75$; $0{,}25$; $0{,}25$; $0{,}75$; $2{,}5$; $7$. Somma: $\sum (x_i - \overline{x})(y_i - \overline{y}) = 21$.`,
      R`Quadrati degli scarti di $x$: somma $42$. Quadrati degli scarti di $y$: somma $11$.`,
      R`Coefficiente angolare: $m = \dfrac{21}{42} = 0{,}5$. Termine noto: $q = \overline{y} - m\overline{x} = 6 - 0{,}5 \cdot 4{,}5 = 3{,}75$.`,
      R`Correlazione: $r = \dfrac{21}{\sqrt{42 \cdot 11}} = \dfrac{21}{\sqrt{462}} \approx \dfrac{21}{21{,}49} \approx 0{,}98$: legame lineare positivo molto forte.`
    ], risultato: R`$y = 0{,}5x + 3{,}75$, con $r \approx 0{,}98$.` }
  ]
,

  formulario: [
    { nome: 'Frequenza relativa', formula: R`f_i = \frac{n_i}{N}`, nota: R`$\sum f_i = 1$ sempre.` },
    { nome: 'Frequenza percentuale', formula: R`p_i = \frac{n_i}{N} \cdot 100`, nota: R`La somma delle percentuali è 100.` },
    { nome: 'Densità di frequenza', formula: R`h_i = \frac{n_i}{a_i}`, nota: R`$a_i$ è l'ampiezza della classe. Serve nell'istogramma con classi di ampiezza diversa.` },
    { nome: 'Angolo di un settore (aerogramma)', formula: R`\alpha_i = f_i \cdot 360^\circ` },
    { nome: 'Media aritmetica', formula: R`\overline{x} = \frac{x_1 + x_2 + \dots + x_N}{N} = \frac{1}{N}\sum_{i=1}^{N} x_i` },
    { nome: 'Media ponderata (da tabella di frequenze)', formula: R`\overline{x} = \frac{\sum_{i=1}^{k} x_i\, n_i}{N}`, nota: R`Con dati in classi, al posto di $x_i$ si usa il valore centrale $c_i$.` },
    { nome: 'Mediana', formula: R`Me = x_{\frac{N+1}{2}} \ (N \text{ dispari}), \qquad Me = \frac{x_{\frac{N}{2}} + x_{\frac{N}{2}+1}}{2} \ (N \text{ pari})`, nota: R`I dati vanno prima ordinati.` },
    { nome: 'Campo di variazione', formula: R`R = x_{\max} - x_{\min}` },
    { nome: 'Scarto medio assoluto', formula: R`S = \frac{1}{N}\sum_{i=1}^{N} \left| x_i - \overline{x} \right|` },
    { nome: 'Varianza', formula: R`\sigma^2 = \frac{1}{N}\sum_{i=1}^{N} \left( x_i - \overline{x} \right)^2` },
    { nome: 'Varianza (formula rapida)', formula: R`\sigma^2 = \overline{x^2} - \left( \overline{x} \right)^2`, nota: R`Media dei quadrati meno quadrato della media.` },
    { nome: 'Deviazione standard', formula: R`\sigma = \sqrt{\sigma^2}`, nota: R`Ha la stessa unità di misura dei dati.` },
    { nome: 'Coefficiente di variazione', formula: R`\text{CV} = \frac{\sigma}{\overline{x}}`, nota: R`Numero puro: confronta la variabilità di grandezze diverse.` },
    { nome: 'Coefficiente di correlazione lineare', formula: R`r = \frac{\sum (x_i - \overline{x})(y_i - \overline{y})}{\sqrt{\sum (x_i - \overline{x})^2 \cdot \sum (y_i - \overline{y})^2}}`, nota: R`Sempre $-1 \le r \le 1$.` },
    { nome: 'Retta di regressione (minimi quadrati)', formula: R`m = \frac{\sum (x_i - \overline{x})(y_i - \overline{y})}{\sum (x_i - \overline{x})^2}, \qquad q = \overline{y} - m\,\overline{x}`, nota: R`Passa sempre per il punto $(\overline{x}, \overline{y})$.` },
    { nome: 'Curva normale', formula: R`y = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x - \mu)^2}{2\sigma^2}}`, nota: R`Simmetrica rispetto a $x = \mu$; l'area totale sotto la curva vale $1$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'popolazione-campione', tipo: 'definizione', fronte: R`Popolazione e unità statistica`, retro: R`La popolazione è l'insieme di tutti gli individui su cui si indaga; l'unità statistica è il singolo individuo.` },
    { id: 'fc-02', sezione: 'popolazione-campione', tipo: 'definizione', fronte: R`Campione rappresentativo`, retro: R`Un sottoinsieme della popolazione scelto in modo che rispecchi le sue caratteristiche, così che i risultati si possano estendere a tutta la popolazione.` },
    { id: 'fc-03', sezione: 'popolazione-campione', tipo: 'definizione', fronte: R`Carattere e modalità`, retro: R`Il carattere è la proprietà osservata (per esempio l'altezza); le modalità sono i valori che può assumere.` },
    { id: 'fc-04', sezione: 'popolazione-campione', tipo: 'concetto', fronte: R`Differenza fra carattere quantitativo discreto e continuo`, retro: R`Il discreto si conta e assume valori isolati (numero di fratelli); il continuo si misura e può assumere tutti i valori di un intervallo (altezza).` },
    { id: 'fc-05', sezione: 'popolazione-campione', tipo: 'concetto', fronte: R`Un carattere fatto di numeri è sempre quantitativo?`, retro: R`No. Il numero di maglia o il CAP sono etichette: se farne la media non ha senso, il carattere è qualitativo.` },
    { id: 'fc-06', sezione: 'frequenze', tipo: 'formula', fronte: R`Frequenza relativa`, retro: R`$f_i = \dfrac{n_i}{N}$, cioè la frequenza assoluta divisa per il numero totale di dati.` },
    { id: 'fc-07', sezione: 'frequenze', tipo: 'concetto', fronte: R`Quanto vale la somma di tutte le frequenze relative?`, retro: R`Sempre $1$ (e quella delle percentuali sempre 100). È il primo controllo su una tabella.` },
    { id: 'fc-08', sezione: 'frequenze', tipo: 'definizione', fronte: R`Frequenza cumulata`, retro: R`La somma delle frequenze di tutte le modalità minori o uguali a quella considerata. Ha senso solo per caratteri ordinabili.` },
    { id: 'fc-09', sezione: 'frequenze', tipo: 'concetto', fronte: R`Perché servono le frequenze relative?`, retro: R`Per confrontare gruppi di dimensione diversa: 5 insufficienze su 25 e 7 su 20 si confrontano solo in percentuale.` },
    { id: 'fc-10', sezione: 'classi', tipo: 'definizione', fronte: R`Classe, ampiezza e valore centrale`, retro: R`La classe è un intervallo di valori, come $[165; 170)$; l'ampiezza è la differenza fra gli estremi, il valore centrale la loro media.` },
    { id: 'fc-11', sezione: 'classi', tipo: 'formula', fronte: R`Densità di frequenza`, retro: R`$h_i = \dfrac{n_i}{a_i}$: frequenza divisa per l'ampiezza della classe.` },
    { id: 'fc-12', sezione: 'classi', tipo: 'concetto', fronte: R`Quando serve la densità di frequenza?`, retro: R`Nell'istogramma con classi di ampiezza diversa: altrimenti una classe larga sembra più numerosa solo perché raccoglie più valori.` },
    { id: 'fc-13', sezione: 'rappresentazioni', tipo: 'concetto', fronte: R`Ortogramma o istogramma?`, retro: R`Ortogramma (barre staccate) per caratteri qualitativi e discreti; istogramma (barre attaccate) per caratteri continui divisi in classi.` },
    { id: 'fc-14', sezione: 'rappresentazioni', tipo: 'formula', fronte: R`Ampiezza del settore in un aerogramma`, retro: R`$\alpha_i = f_i \cdot 360^\circ$, cioè la frequenza relativa moltiplicata per l'angolo giro.` },
    { id: 'fc-15', sezione: 'rappresentazioni', tipo: 'concetto', fronte: R`Quale grafico per una serie storica?`, retro: R`Il diagramma cartesiano: tempo in ascissa, punti uniti da una spezzata, per far vedere l'andamento.` },
    { id: 'fc-16', sezione: 'indici-posizione', tipo: 'formula', fronte: R`Media ponderata da una tabella di frequenze`, retro: R`$\overline{x} = \dfrac{\sum x_i n_i}{N}$: ogni valore pesa quanto la sua frequenza.` },
    { id: 'fc-17', sezione: 'indici-posizione', tipo: 'procedura', fronte: R`Come si calcola la mediana`, retro: R`Si ordinano i dati. Con $N$ dispari è il valore centrale; con $N$ pari è la media dei due centrali.` },
    { id: 'fc-18', sezione: 'indici-posizione', tipo: 'concetto', fronte: R`Media o mediana in presenza di valori anomali?`, retro: R`La mediana: non risente dei valori estremi, mentre la media viene trascinata verso di essi.` },
    { id: 'fc-19', sezione: 'indici-posizione', tipo: 'definizione', fronte: R`Moda`, retro: R`La modalità con la frequenza più alta. Può non essere unica ed è l'unico indice possibile per un carattere qualitativo sconnesso.` },
    { id: 'fc-20', sezione: 'variabilita', tipo: 'formula', fronte: R`Varianza`, retro: R`$\sigma^2 = \dfrac{1}{N}\sum (x_i - \overline{x})^2$: la media dei quadrati degli scarti dalla media.` },
    { id: 'fc-21', sezione: 'variabilita', tipo: 'concetto', fronte: R`Perché si usa la deviazione standard e non la varianza?`, retro: R`Perché ha la stessa unità di misura dei dati: la varianza di misure in cm è in centimetri quadrati.` },
    { id: 'fc-22', sezione: 'variabilita', tipo: 'formula', fronte: R`Coefficiente di variazione`, retro: R`$\text{CV} = \dfrac{\sigma}{\overline{x}}$: numero puro, serve a confrontare la variabilità di grandezze con unità diverse.` },
    { id: 'fc-23', sezione: 'variabilita', tipo: 'concetto', fronte: R`Quando la varianza vale zero?`, retro: R`Solo se tutti i dati sono uguali fra loro. Non è mai negativa.` },
    { id: 'fc-24', sezione: 'doppia-entrata', tipo: 'definizione', fronte: R`Frequenze marginali`, retro: R`I totali di riga e di colonna di una tabella a doppia entrata: descrivono un carattere alla volta, ignorando l'altro.` },
    { id: 'fc-25', sezione: 'doppia-entrata', tipo: 'concetto', fronte: R`Che cosa misura il coefficiente $r$?`, retro: R`Quanto i punti si allineano su una retta: $r$ vicino a $1$ o $-1$ legame lineare forte, vicino a $0$ nessun legame lineare.` },
    { id: 'fc-26', sezione: 'normale', tipo: 'concetto', fronte: R`Regola 68 - 95 - 99,7`, retro: R`In una distribuzione normale il 68% dei dati sta entro $\sigma$ dalla media, il 95% entro $2\sigma$, il 99,7% entro $3\sigma$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola la media dei dati $5, 7, 9$.`, suggerimenti: [R`Somma i dati e dividi per quanti sono.`], risposta: num(7), soluzione: [R`Somma: $5 + 7 + 9 = 21$.`, R`I dati sono $3$: $\overline{x} = \dfrac{21}{3} = 7$.`] },

    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Qual è la moda dei dati $3, 5, 5, 6, 8$?`, suggerimenti: [R`La moda è il valore che compare più volte.`], risposta: num(5), soluzione: [R`Il $5$ compare due volte, gli altri una volta sola.`, R`La moda è $5$.`] },

    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Qual è la mediana dei dati $2, 4, 7, 8, 9$?`, suggerimenti: [R`I dati sono già in ordine: cerca quello al centro.`], risposta: num(7), soluzione: [R`I dati sono $5$, già in ordine.`, R`Il valore centrale è il terzo: la mediana è $7$.`] },

    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Calcola il campo di variazione dei dati $12, 5, 9, 20, 7$.`, suggerimenti: [R`Trova il dato più grande e il più piccolo.`], risposta: num(15), soluzione: [R`Il dato più grande è $20$, il più piccolo è $5$.`, R`Campo di variazione: $20 - 5 = 15$.`] },

    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`In una classe di $20$ studenti, $5$ hanno preso $8$. Qual è la frequenza relativa del voto $8$?`, suggerimenti: [R`Frequenza relativa: frequenza assoluta diviso numero totale.`], risposta: num(0.25), soluzione: [R`Frequenza assoluta: $5$. Totale: $N = 20$.`, R`$f = \dfrac{5}{20} = \dfrac{1}{4} = 0{,}25$.`] },

    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola la media dei dati $3, 5, 6, 10$.`, suggerimenti: [R`I dati sono $4$: dividi la somma per $4$.`], risposta: num(6), soluzione: [R`Somma: $3 + 5 + 6 + 10 = 24$.`, R`$\overline{x} = \dfrac{24}{4} = 6$.`] },

    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Qual è la mediana dei dati $9, 3, 7, 1, 5$?`, suggerimenti: [R`Prima metti i dati in ordine.`], risposta: num(5), soluzione: [R`In ordine: $1, 3, 5, 7, 9$.`, R`Il valore centrale è il terzo: la mediana è $5$.`] },

    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`In una classe di $30$ studenti, $6$ vanno a scuola a piedi. Che percentuale è?`, suggerimenti: [R`Calcola la frequenza relativa, poi moltiplica per $100$.`], risposta: pc(20, '6/30', '1/5'), soluzione: [R`Frequenza relativa: $\dfrac{6}{30} = 0{,}2$.`, R`Percentuale: $0{,}2 \cdot 100 = 20\%$.`] },

    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Sei amici dicono il colore preferito: rosso, blu, blu, verde, blu, rosso. Qual è la moda?`, suggerimenti: [R`Conta quante volte compare ogni colore.`], risposta: { tipo: 'testo', accettate: ['blu', 'il blu', 'moda blu', 'la moda è blu'], segnaposto: 'un colore', simboli: [] }, soluzione: [R`Rosso: $2$ volte. Blu: $3$ volte. Verde: $1$ volta.`, R`La moda è il colore più frequente: **blu**.`] },

    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Qual è la mediana dei dati $2, 5, 7, 10$?`, suggerimenti: [R`I dati sono $4$, un numero pari: i valori centrali sono due.`], risposta: num(6), soluzione: [R`I dati sono già in ordine. I due centrali sono $5$ e $7$.`, R`Mediana: $\dfrac{5 + 7}{2} = 6$.`] },

    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Hai $6$ all'orale e $9$ allo scritto. Lo scritto vale il doppio dell'orale. Qual è la tua media?`, suggerimenti: [R`Media ponderata: l'orale ha peso $1$, lo scritto peso $2$.`], risposta: num(8), soluzione: [R`Moltiplica ogni voto per il suo peso: $6 \cdot 1 + 9 \cdot 2 = 24$.`, R`Dividi per la somma dei pesi, $1 + 2 = 3$: $\dfrac{24}{3} = 8$.`] },

    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Le temperature minime di cinque giorni sono $-3, 2, 5, -1, 4$ gradi. Calcola il campo di variazione.`, suggerimenti: [R`Il valore più piccolo è negativo: attento al segno.`], risposta: num(8), soluzione: [R`Il valore più grande è $5$, il più piccolo è $-3$.`, R`Campo di variazione: $5 - (-3) = 5 + 3 = 8$.`] },

    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Qual è la mediana dei dati $4, 8, 6, 2, 8, 10$?`, suggerimenti: [R`Metti i dati in ordine.`, R`I dati sono $6$: la mediana è la media del terzo e del quarto.`], risposta: num(7), soluzione: [R`In ordine: $2, 4, 6, 8, 8, 10$.`, R`I dati sono $6$, quindi i centrali sono il terzo e il quarto: $6$ e $8$.`, R`Mediana: $\dfrac{6 + 8}{2} = 7$.`] },

    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`In una verifica, $2$ studenti hanno preso $5$, $5$ hanno preso $6$ e $3$ hanno preso $7$. Calcola la media dei voti.`, suggerimenti: [R`Moltiplica ogni voto per quanti l'hanno preso.`, R`Dividi per il numero di studenti, non per il numero di voti diversi.`], risposta: num(6.1), soluzione: [R`Prodotti: $5 \cdot 2 = 10$, $6 \cdot 5 = 30$, $7 \cdot 3 = 21$.`, R`Somma: $10 + 30 + 21 = 61$.`, R`Gli studenti sono $2 + 5 + 3 = 10$: $\overline{x} = \dfrac{61}{10} = 6{,}1$.`] },

    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`La media di quattro numeri è $6$. Tre di questi sono $5$, $6$ e $8$. Qual è il quarto?`, suggerimenti: [R`Se la media di $4$ numeri è $6$, la loro somma è $4 \cdot 6$.`], risposta: num(5), soluzione: [R`La somma dei quattro numeri è $4 \cdot 6 = 24$.`, R`I tre noti sommano $5 + 6 + 8 = 19$.`, R`Il quarto è $24 - 19 = 5$.`] },

    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Calcola la varianza dei dati $1, 3, 5, 7$.`, suggerimenti: [R`Calcola la media, poi gli scarti dalla media.`, R`La varianza è la media dei quadrati degli scarti.`], risposta: num(5), soluzione: [R`Media: $\dfrac{1 + 3 + 5 + 7}{4} = 4$.`, R`Scarti: $-3, -1, 1, 3$. Quadrati: $9, 1, 1, 9$.`, R`Varianza: $\dfrac{9 + 1 + 1 + 9}{4} = \dfrac{20}{4} = 5$.`] },

    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Calcola la deviazione standard $\sigma$ dei dati $2, 8, 2, 8$. Se serve, scrivi una radice o un decimale con due cifre.`, suggerimenti: [R`Calcola prima la varianza, poi fai la radice.`], risposta: num(3), soluzione: [R`Media: $\dfrac{2 + 8 + 2 + 8}{4} = 5$.`, R`Scarti: $-3, 3, -3, 3$. Quadrati: tutti $9$.`, R`Varianza: $\dfrac{9 \cdot 4}{4} = 9$, quindi $\sigma = \sqrt{9} = 3$.`] },

    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`In una classe, $12$ studenti hanno media $6$ e gli altri $8$ hanno media $7{,}5$. Qual è la media di tutta la classe?`, suggerimenti: [R`Non fare la media fra $6$ e $7{,}5$: i due gruppi hanno grandezze diverse.`, R`Usa la media ponderata, con pesi $12$ e $8$.`], risposta: num(6.6), soluzione: [R`Somma dei voti del primo gruppo: $12 \cdot 6 = 72$. Del secondo: $8 \cdot 7{,}5 = 60$.`, R`Gli studenti sono $12 + 8 = 20$.`, R`Media: $\dfrac{72 + 60}{20} = \dfrac{132}{20} = 6{,}6$.`] },

    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Calcola la deviazione standard $\sigma$ dei dati $3, 5, 7, 9, 11$. Se serve, scrivi una radice o un decimale con due cifre.`, suggerimenti: [R`La media è il dato centrale, perché i dati sono equidistanti.`, R`Varianza: media dei quadrati degli scarti. Poi fai la radice.`], risposta: num(Math.sqrt(8)), soluzione: [R`Media: $\dfrac{3 + 5 + 7 + 9 + 11}{5} = 7$.`, R`Scarti: $-4, -2, 0, 2, 4$. Quadrati: $16, 4, 0, 4, 16$.`, R`Varianza: $\dfrac{40}{5} = 8$.`, R`$\sigma = \sqrt{8} \approx 2{,}83$.`] },

    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Calcola la varianza dei dati $2, 3, 3, 4, 8$.`, suggerimenti: [R`La media è $4$.`, R`Gli scarti sono $-2, -1, -1, 0, 4$.`], risposta: num(4.4), soluzione: [R`Media: $\dfrac{2 + 3 + 3 + 4 + 8}{5} = \dfrac{20}{5} = 4$.`, R`Scarti: $-2, -1, -1, 0, 4$. Quadrati: $4, 1, 1, 0, 16$.`, R`Varianza: $\dfrac{4 + 1 + 1 + 0 + 16}{5} = \dfrac{22}{5} = 4{,}4$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Su 50 studenti intervistati, 18 vanno a scuola in autobus. Calcola la frequenza relativa di questa modalità (scrivila come numero decimale).`, suggerimenti: [R`La frequenza relativa è la frequenza assoluta divisa per il totale.`, R`Calcola $\dfrac{18}{50}$.`], risposta: { tipo: 'numero', valore: 0.36, tolleranza: 0.005 }, soluzione: [R`$f = \dfrac{18}{50} = 0{,}36$.`, R`In percentuale: il 36% degli studenti prende l'autobus.`] },
    { id: 'es-02', difficolta: 1, testo: R`I voti di 9 studenti sono $4, 5, 5, 6, 6, 7, 8, 8, 9$. Calcola la media aritmetica arrotondata ai centesimi.`, suggerimenti: [R`Somma tutti i voti e dividi per quanti sono.`, R`La somma è $58$.`], risposta: { tipo: 'numero', valore: 6.44, tolleranza: 0.01 }, soluzione: [R`Somma: $4 + 5 + 5 + 6 + 6 + 7 + 8 + 8 + 9 = 58$.`, R`$\overline{x} = \dfrac{58}{9} = 6{,}4\overline{4} \approx 6{,}44$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Calcola la mediana dei dati $4, 5, 5, 6, 6, 7, 8, 8, 9$.`, suggerimenti: [R`I dati sono già ordinati: conta quanti sono.`, R`$N = 9$ è dispari, quindi la mediana è il valore di posto $\dfrac{9+1}{2}$.`], risposta: { tipo: 'numero', valore: 6, tolleranza: 0.01 }, soluzione: [R`$N = 9$ è dispari: la mediana è il valore di posto $5$.`, R`Contando: $4, 5, 5, 6, \mathbf{6}, 7, 8, 8, 9$. La mediana è $6$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Calcola la mediana dei dati $3, 7, 8, 12$.`, suggerimenti: [R`Qui $N$ è pari: i valori centrali sono due.`, R`Fai la media del secondo e del terzo dato.`], risposta: { tipo: 'numero', valore: 7.5, tolleranza: 0.01 }, soluzione: [R`$N = 4$ è pari: i valori centrali sono il secondo e il terzo, cioè $7$ e $8$.`, R`$Me = \dfrac{7 + 8}{2} = 7{,}5$. La mediana non deve per forza essere uno dei dati.`] },
    { id: 'es-05', difficolta: 2, testo: R`Uno studente ha preso $6$ e $7$ nei due compiti scritti (peso $2$ ciascuno) e $8$ nell'interrogazione (peso $1$). Calcola la media ponderata.`, suggerimenti: [R`Moltiplica ogni voto per il suo peso, poi dividi per la somma dei pesi.`, R`La somma dei pesi è $2 + 2 + 1 = 5$.`], risposta: { tipo: 'numero', valore: 6.8, tolleranza: 0.01 }, soluzione: [R`Numeratore: $6 \cdot 2 + 7 \cdot 2 + 8 \cdot 1 = 12 + 14 + 8 = 34$.`, R`Denominatore: $2 + 2 + 1 = 5$.`, R`$\overline{x} = \dfrac{34}{5} = 6{,}8$. La media semplice dei tre voti sarebbe stata $7$: i pesi contano.`] },
    { id: 'es-06', difficolta: 2, testo: R`Calcola la deviazione standard dei dati $2, 4, 4, 4, 5, 5, 7, 9$.`, suggerimenti: [R`Prima la media, poi gli scarti, poi i loro quadrati.`, R`La media è $5$.`, R`La somma dei quadrati degli scarti è $32$, e i dati sono $8$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`$\overline{x} = \dfrac{2 + 4 + 4 + 4 + 5 + 5 + 7 + 9}{8} = \dfrac{40}{8} = 5$.`, R`Scarti: $-3, -1, -1, -1, 0, 0, 2, 4$. Quadrati: $9, 1, 1, 1, 0, 0, 4, 16$, somma $32$.`, R`$\sigma^2 = \dfrac{32}{8} = 4$, quindi $\sigma = \sqrt{4} = 2$.`] },
    { id: 'es-07', difficolta: 2, testo: R`In una classe i voti hanno frequenze: $5$ preso da 6 studenti, $6$ da 9, $7$ da 7, $8$ da 3. Quanti studenti hanno preso al più $6$?`, suggerimenti: [R`«Al più 6» vuol dire 6 oppure meno di 6.`, R`È la frequenza cumulata della modalità $6$.`], risposta: { tipo: 'numero', valore: 15, tolleranza: 0.01 }, soluzione: [R`La frequenza cumulata del $6$ è $6 + 9 = 15$.`, R`Quindi 15 studenti su $6 + 9 + 7 + 3 = 25$, cioè il 60% della classe.`] },
    { id: 'es-08', difficolta: 2, testo: R`Le età degli iscritti a un circolo sono raggruppate così: $[0; 10)$ con 30 persone, $[10; 30)$ con 60, $[30; 70)$ con 80. Calcola la densità di frequenza della terza classe.`, suggerimenti: [R`La densità è la frequenza divisa per l'ampiezza della classe.`, R`L'ampiezza della terza classe è $70 - 30 = 40$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`Ampiezza della terza classe: $70 - 30 = 40$.`, R`$h_3 = \dfrac{80}{40} = 2$.`, R`Le altre densità valgono $\dfrac{30}{10} = 3$ e $\dfrac{60}{20} = 3$: la terza classe è la **meno** densa, pur avendo la frequenza più alta. È esattamente l'inganno che l'istogramma corretto evita.`] },
    { id: 'es-09', difficolta: 2, testo: R`In un sondaggio su 240 persone, 90 preferiscono la montagna. Quanti gradi misura il settore corrispondente in un aerogramma?`, suggerimenti: [R`Trova prima la frequenza relativa.`, R`Moltiplica la frequenza relativa per $360^\circ$.`], risposta: { tipo: 'numero', valore: 135, tolleranza: 0.5 }, soluzione: [R`$f = \dfrac{90}{240} = 0{,}375$.`, R`$\alpha = 0{,}375 \cdot 360^\circ = 135^\circ$.`] },
    { id: 'es-10', difficolta: 3, testo: R`I compensi mensili di cinque collaboratori sono $1200$, $1300$, $1400$, $1500$ e $9600$ euro. Calcola media e mediana (scrivi i due numeri in quest'ordine: prima la media, poi la mediana).`, suggerimenti: [R`Per la media somma tutto e dividi per $5$; per la mediana i dati sono già ordinati.`, R`La somma dei cinque compensi è $15\,000$.`, R`Con $N = 5$ la mediana è il terzo valore.`], risposta: { tipo: 'numeri', valori: [3000, 1400], ordinati: true }, soluzione: [R`Somma: $1200 + 1300 + 1400 + 1500 + 9600 = 15\,000$, quindi $\overline{x} = \dfrac{15\,000}{5} = 3000$ euro.`, R`$N = 5$ è dispari: la mediana è il terzo valore, cioè $1400$ euro.`, R`Quattro collaboratori su cinque guadagnano meno della media: qui la mediana descrive molto meglio la situazione, perché il compenso di $9600$ euro è un valore anomalo.`] },
    { id: 'es-11', difficolta: 3, testo: R`Per quattro studenti si sono rilevate le coppie (ore di allenamento; punti segnati): $(2; 4)$, $(4; 5)$, $(6; 8)$, $(8; 9)$. Calcola il coefficiente angolare $m$ della retta di regressione.`, suggerimenti: [R`Calcola prima le due medie $\overline{x}$ e $\overline{y}$.`, R`$m$ è il rapporto fra la somma dei prodotti degli scarti e la somma dei quadrati degli scarti di $x$.`, R`Gli scarti di $x$ sono $-3, -1, 1, 3$ e quelli di $y$ sono $-2{,}5$; $-1{,}5$; $1{,}5$; $2{,}5$.`], risposta: { tipo: 'numero', valore: 0.9, tolleranza: 0.01 }, soluzione: [R`$\overline{x} = \dfrac{2 + 4 + 6 + 8}{4} = 5$ e $\overline{y} = \dfrac{4 + 5 + 8 + 9}{4} = 6{,}5$.`, R`Prodotti degli scarti: $(-3)(-2{,}5) = 7{,}5$; $(-1)(-1{,}5) = 1{,}5$; $(1)(1{,}5) = 1{,}5$; $(3)(2{,}5) = 7{,}5$. Somma: $18$.`, R`Quadrati degli scarti di $x$: $9 + 1 + 1 + 9 = 20$.`, R`$m = \dfrac{18}{20} = 0{,}9$; per completezza $q = 6{,}5 - 0{,}9 \cdot 5 = 2$, quindi la retta è $y = 0{,}9x + 2$.`] },
    { id: 'es-12', difficolta: 3, testo: R`I tempi di produzione di un pezzo seguono una distribuzione normale con media $\mu = 50$ minuti e deviazione standard $\sigma = 4$ minuti. Fra quali due valori cade circa il 95% dei pezzi?`, suggerimenti: [R`Applica la regola 68 - 95 - 99,7.`, R`Il 95% corrisponde all'intervallo fra $\mu - 2\sigma$ e $\mu + 2\sigma$.`], risposta: { tipo: 'intervallo', da: 42, a: 58, chiusoDa: true, chiusoA: true }, soluzione: [R`Il 95% dei dati sta fra $\mu - 2\sigma$ e $\mu + 2\sigma$.`, R`$\mu - 2\sigma = 50 - 8 = 42$ e $\mu + 2\sigma = 50 + 8 = 58$.`, R`Circa il 95% dei pezzi richiede fra $42$ e $58$ minuti; fuori dall'intervallo $[38; 62]$ (tre sigma) cade solo lo $0{,}3$ per cento.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`In un'indagine sulle ore di sonno degli studenti di un liceo, l'unità statistica è…`, opzioni: [R`il singolo studente`, R`il numero di ore di sonno`, R`l'intero liceo`, R`il campione intervistato`], corretta: 0, spiegazione: R`L'unità statistica è l'individuo su cui si fa la rilevazione, cioè lo studente. Le ore di sonno sono il carattere, il liceo è la popolazione, il campione è un sottoinsieme della popolazione.` },
    { id: 'q-02', domanda: R`Quale di questi caratteri è quantitativo **continuo**?`, opzioni: [R`il numero di fratelli`, R`il colore degli occhi`, R`il tempo impiegato per andare a scuola`, R`il voto di matematica`], corretta: 2, spiegazione: R`Il tempo si misura e può assumere tutti i valori di un intervallo. Fratelli e voto sono quantitativi discreti (si contano), il colore degli occhi è qualitativo sconnesso.` },
    { id: 'q-03', domanda: R`La somma di tutte le frequenze relative di una distribuzione vale…`, opzioni: [R`$N$`, R`100`, R`$1$`, R`dipende dai dati`], corretta: 2, spiegazione: R`Ogni $f_i = \dfrac{n_i}{N}$ e la somma degli $n_i$ è $N$, quindi la somma vale $\dfrac{N}{N} = 1$. È 100 solo se si usano le percentuali.` },
    { id: 'q-04', domanda: R`La frequenza cumulata di una modalità dice…`, opzioni: [R`quante unità hanno quella modalità`, R`quante unità hanno quella modalità o una minore`, R`la percentuale di quella modalità`, R`la modalità più frequente`], corretta: 1, spiegazione: R`È la somma delle frequenze fino a quella modalità compresa, e risponde alla domanda «quanti al più…?». Serve solo con modalità ordinabili.` },
    { id: 'q-05', domanda: R`Perché in un istogramma le barre sono attaccate, mentre in un ortogramma sono staccate?`, opzioni: [R`per ragioni estetiche`, R`perché l'istogramma usa sempre più dati`, R`perché nell'istogramma le classi sono intervalli contigui di un carattere continuo`, R`perché l'ortogramma usa le percentuali`], corretta: 2, spiegazione: R`Le classi di un carattere continuo si toccano, quindi le barre si toccano. Nell'ortogramma, fra una modalità e l'altra non esiste nulla, e lo spazio vuoto lo dice.` },
    { id: 'q-06', domanda: R`In un istogramma con classi di ampiezza diversa, in ordinata si deve mettere…`, opzioni: [R`la densità di frequenza $\dfrac{n_i}{a_i}$`, R`la frequenza assoluta $n_i$`, R`la frequenza cumulata`, R`il valore centrale della classe`], corretta: 0, spiegazione: R`In un istogramma è l'**area** del rettangolo a rappresentare la frequenza. Usando $n_i$ come altezza, una classe larga apparirebbe molto più numerosa di quanto sia davvero.` },
    { id: 'q-07', domanda: R`In un aerogramma, una modalità con frequenza relativa $0{,}25$ occupa un settore di…`, opzioni: [R`$25^\circ$`, R`$60^\circ$`, R`$90^\circ$`, R`$120^\circ$`], corretta: 2, spiegazione: R`$\alpha = 0{,}25 \cdot 360^\circ = 90^\circ$, un quarto del cerchio. L'errore tipico è confondere la percentuale con i gradi.` },
    { id: 'q-08', domanda: R`In una distribuzione con un forte valore anomalo, quale indice di posizione lo descrive meglio?`, opzioni: [R`la media aritmetica`, R`la mediana`, R`il campo di variazione`, R`la varianza`], corretta: 1, spiegazione: R`La mediana dipende solo dalla posizione centrale, quindi non risente dei valori estremi; la media viene trascinata verso l'anomalia. Campo di variazione e varianza non sono indici di posizione ma di variabilità.` },
    { id: 'q-09', domanda: R`Per un carattere qualitativo sconnesso, come il colore degli occhi, quale indice si può calcolare?`, opzioni: [R`solo la media`, R`media e mediana`, R`solo la mediana`, R`solo la moda`], corretta: 3, spiegazione: R`Senza numeri non c'è media; senza un ordine fra le modalità non c'è nemmeno mediana. Resta la moda, cioè la modalità più frequente.` },
    { id: 'q-10', domanda: R`Con $N$ pari, la mediana…`, opzioni: [R`non esiste`, R`è la media dei due valori centrali dei dati ordinati`, R`è il valore di posto $\dfrac{N}{2}$`, R`coincide sempre con la moda`], corretta: 1, spiegazione: R`Con $N$ pari non c'è un unico valore centrale: si prendono i due di posto $\dfrac{N}{2}$ e $\dfrac{N}{2}+1$ e se ne fa la media. Il risultato può non essere uno dei dati.` },
    { id: 'q-11', domanda: R`La varianza di un insieme di dati è zero. Che cosa si può dire?`, opzioni: [R`i dati sono tutti uguali fra loro`, R`la media è zero`, R`i dati sono metà positivi e metà negativi`, R`è impossibile, la varianza è sempre positiva`], corretta: 0, spiegazione: R`La varianza è una media di quadrati: si annulla solo se ogni scarto è nullo, cioè se tutti i dati coincidono con la media. Non ha niente a che vedere con il segno dei dati.` },
    { id: 'q-12', domanda: R`Se i dati sono altezze in centimetri, la deviazione standard si misura in…`, opzioni: [R`centimetri quadrati`, R`nessuna unità, è un numero puro`, R`centimetri`, R`percentuale`], corretta: 2, spiegazione: R`La varianza è in centimetri quadrati; la radice quadrata riporta la deviazione standard nella stessa unità dei dati. Il numero puro è invece il coefficiente di variazione.` },
    { id: 'q-13', domanda: R`Il coefficiente di variazione serve a…`, opzioni: [R`decidere se i dati sono normali`, R`confrontare la variabilità di grandezze con unità di misura diverse`, R`trovare la mediana`, R`misurare la correlazione fra due caratteri`], corretta: 1, spiegazione: R`$\text{CV} = \dfrac{\sigma}{\overline{x}}$ è un numero puro: permette di dire se pesano di più le oscillazioni delle altezze o quelle dei pesi, che hanno unità diverse.` },
    { id: 'q-14', domanda: R`Il coefficiente di correlazione fra due caratteri vale $r = 0$. Si può concludere che…`, opzioni: [R`i due caratteri sono certamente indipendenti`, R`fra i due caratteri non c'è alcun legame **lineare**`, R`uno dei due caratteri è costante`, R`la retta di regressione non esiste`], corretta: 1, spiegazione: R`$r$ misura solo l'allineamento su una retta: dati disposti lungo una parabola possono avere $r = 0$ pur essendo legatissimi. L'indipendenza è un'altra cosa.` },
    { id: 'q-15', domanda: R`Le vendite di gelati e il numero di annegamenti crescono insieme di mese in mese. Che cosa se ne deduce?`, opzioni: [R`che il gelato provoca annegamenti`, R`che i dati sono sbagliati`, R`che c'è correlazione, ma non necessariamente un rapporto di causa`, R`che il coefficiente $r$ vale $1$`], corretta: 2, spiegazione: R`Due grandezze possono muoversi insieme perché dipendono entrambe da una terza (qui il caldo). La correlazione misura l'andamento comune, non la causa.` },
    { id: 'q-16', domanda: R`In una distribuzione normale con $\mu = 170$ e $\sigma = 8$, circa il 68% dei dati sta…`, opzioni: [R`fra $154$ e $186$`, R`fra $162$ e $178$`, R`fra $146$ e $194$`, R`sotto $170$`], corretta: 1, spiegazione: R`Il 68% dei dati cade entro una deviazione standard dalla media: $170 - 8 = 162$ e $170 + 8 = 178$. L'intervallo $[154; 186]$ è quello del 95% (due sigma), $[146; 194]$ quello del 99,7%.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di ogni calcolo, chiediti che tipo di carattere hai davanti: qualitativo, discreto o continuo. Da quella risposta dipendono la tabella, il grafico e gli indici che puoi usare.` },
    { tipo: 'trucco', testo: R`Controllo lampo su ogni tabella: le frequenze assolute devono sommare $N$, le relative $1$, le percentuali 100. Se non torna, hai perso un dato.` },
    { tipo: 'errore', testo: R`La media di una tabella di frequenze non è la media dei valori $x_i$: ogni valore va moltiplicato per la sua frequenza. Fare $\dfrac{3+4+5+6+7+8+9+10}{8}$ sui voti della classe è l'errore più comune di tutti.` },
    { tipo: 'errore', testo: R`Per la mediana i dati vanno **ordinati** prima. Cercare il valore centrale nell'elenco così com'è dà quasi sempre un numero sbagliato.` },
    { tipo: 'trucco', testo: R`La mediana sta sempre fra il minimo e il massimo, e la media anche: se ti viene un valore fuori da quell'intervallo, hai sbagliato una somma o una divisione.` },
    { tipo: 'metodo', testo: R`Per varianza e deviazione standard conviene incolonnare: una colonna con $x_i$, una con $x_i - \overline{x}$, una con il quadrato. Gli errori di segno spariscono da soli.` },
    { tipo: 'trucco', testo: R`Verifica della media: la somma degli scarti $x_i - \overline{x}$ deve fare esattamente zero. Se non fa zero, la media è sbagliata.` },
    { tipo: 'errore', testo: R`Non confondere varianza e deviazione standard: la seconda è la radice quadrata della prima. Se il testo chiede $\sigma$ e tu scrivi $\sigma^2$, la risposta è errata anche se i conti sono giusti.` },
    { tipo: 'errore', testo: R`Un istogramma con classi di ampiezze diverse va disegnato con la densità, mai con le frequenze: altrimenti il grafico mente, anche senza volerlo.` },
    { tipo: 'metodo', testo: R`Davanti a un grafico su un giornale, guarda subito tre cose: da dove parte l'asse verticale, quanti sono i dati e se sono valori assoluti o percentuali. Quasi tutti i grafici ingannevoli cadono su una di queste.` }
  ],

  aneddoti: [
    { matematico: 'John Graunt', anni: '1620–1674', titolo: 'Il merciaio che contò i morti di Londra', testo: R`Graunt vendeva stoffe e bottoni a Londra e non era un matematico di professione. Nel 1662 pubblicò le *Natural and Political Observations Made upon the Bills of Mortality*: aveva passato anni a spogliare i bollettini settimanali con cui le parrocchie registravano battesimi e decessi, e per la prima volta ne aveva ricavato delle regolarità. Scoprì che nascono più maschi che femmine, che la mortalità infantile era enorme, che la peste non spiegava tutti i picchi di morti e che si poteva stimare la popolazione di Londra senza contarla persona per persona. Costruì anche la prima **tavola di mortalità**, l'antenata di quelle che ancora oggi usano le assicurazioni. Carlo II volle che fosse ammesso alla Royal Society, nonostante non fosse un gentiluomo studioso.`, legame: R`È il primo a fare quello che facciamo in questa unità: prendere una montagna di dati grezzi, metterli in tabella e farne uscire un'informazione.` },
    { matematico: 'William Playfair', anni: '1759–1823', titolo: 'Il grafico a barre nato da un dato mancante', testo: R`Ingegnere scozzese, disegnatore per James Watt, spia e avventuriero, Playfair pubblicò nel 1786 il *Commercial and Political Atlas*, dove i dati economici non erano più elencati in tabella ma **disegnati**. Per l'andamento del commercio inglese nel tempo usò le curve; ma per la Scozia aveva soltanto i dati di un anno, senza serie storica. Non potendo disegnare un andamento, disegnò diciassette coppie di barre affiancate, una coppia (importazioni ed esportazioni) per ciascun paese con cui la Scozia commerciava: era il primo diagramma a barre della storia, nato da un dato che mancava. Nel 1801, nello *Statistical Breviary*, aggiunse il primo diagramma a torta. I contemporanei lo trovarono poco serio; oggi quei due grafici sono ovunque.`, legame: R`Ortogramma e aerogramma, i due grafici della sezione sulle rappresentazioni, sono entrambi una sua invenzione.` },
    { matematico: 'Florence Nightingale', anni: '1820–1910', titolo: 'La statistica che vinse una guerra contro i burocrati', testo: R`Durante la guerra di Crimea (1853-1856) Nightingale organizzò l'assistenza infermieristica negli ospedali militari britannici e cominciò a registrare con precisione le cause di morte dei soldati. I numeri dicevano una cosa scomoda: morivano molto più di infezioni e malattie evitabili che per le ferite in battaglia. Sapeva che una tabella non avrebbe convinto ministri e generali, così inventò un diagramma polare, una specie di torta a settori di raggio variabile, in cui il pezzo azzurro delle morti evitabili schiacciava tutto il resto. Il grafico funzionò: le riforme igieniche negli ospedali militari furono approvate. Nel 1858 fu la prima donna eletta alla Royal Statistical Society.`, legame: R`È l'esempio più celebre del principio della sezione sui grafici: la scelta della rappresentazione decide se i dati vengono capiti o ignorati.` },
    { matematico: 'Adolphe Quetelet', anni: '1796–1874', titolo: 'L\'invenzione dell\'uomo medio', testo: R`Astronomo belga, Quetelet ebbe un'idea che allora sembrò stravagante: applicare agli esseri umani gli stessi metodi con cui gli astronomi trattavano gli errori di misura. Raccolse migliaia di dati su altezze, pesi, tassi di criminalità e di matrimonio e osservò che si distribuivano lungo la stessa curva a campana degli errori di osservazione. Nel 1835, in *Sur l'homme*, propose l'idea dell'*homme moyen*, l'uomo medio: un individuo fittizio, con i valori medi di tutti i caratteri, attorno al quale gli altri si distribuirebbero come errori attorno a una misura vera. Da quelle ricerche nacque anche l'indice che confronta peso e altezza, per lungo tempo chiamato indice di Quetelet e oggi noto come indice di massa corporea.`, legame: R`È lui a portare la media aritmetica e la curva normale dalla fisica alle scienze umane, cioè a fondare la statistica come la usiamo.` },
    { matematico: 'Francis Galton', anni: '1822–1911', titolo: 'La regressione verso la media', testo: R`Cugino di Charles Darwin, Galton misurava tutto: teste, impronte digitali, perfino la «noia» durante le conferenze. Confrontando le stature di genitori e figli notò un fatto sorprendente: i figli di genitori altissimi sono in media più bassi dei genitori, e i figli di genitori bassissimi più alti. Chiamò il fenomeno **regressione verso la media**, e da lì nacquero la retta di regressione e l'idea di correlazione, poi formalizzata dal suo allievo Karl Pearson. Costruì anche la *quincunx*, la macchina in cui palline che rimbalzano su una griglia di chiodi formano da sole una campana. Va detto che Galton usò la statistica anche per fondare l'eugenetica, un programma che la scienza ha poi respinto: gli strumenti che inventò sono sopravvissuti, le sue conclusioni no.`, legame: R`La retta di regressione e l'idea di correlazione vengono da lui, e la macchina di Galton della sezione sulla distribuzione normale porta il suo nome.` }
  ]
});
})();
