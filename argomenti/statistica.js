(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'statistica',
  titolo: 'Statistica descrittiva',

  introduzione: R`La statistica descrittiva è il mestiere di far parlare i numeri: si raccolgono dati su un gruppo di individui, li si mette in tabella, li si disegna e infine li si riassume in pochi valori. Non serve a prevedere che cosa succederà (quello è il compito della probabilità e della statistica inferenziale): serve a **descrivere con onestà** quello che si è misurato.

La si incontra dappertutto, spesso senza accorgersene: la media dei voti sul registro, il grafico dei contagi al telegiornale, il sondaggio elettorale con il suo margine di errore, la scritta «7 dentisti su 10 consigliano» sulla scatola del dentifricio. Sapere come si costruiscono quei numeri serve soprattutto a difendersi: la stessa tabella, disegnata in due modi diversi, può raccontare due storie opposte, ed entrambe sono «vere».

Per seguire bene basta saper lavorare con frazioni, numeri decimali e percentuali, e leggere un piano cartesiano. Tutto il resto si costruisce qui.`,

  sezioni: [
    { id: 'popolazione-campione', titolo: 'Popolazione, unità statistica, caratteri', testo: R`Ogni indagine statistica comincia decidendo **chi** si osserva e **che cosa** si osserva di lui.

>* La **popolazione** (o collettivo statistico) è l'insieme di tutti gli individui su cui si indaga; il singolo individuo è l'**unità statistica**; un **campione** è un sottoinsieme della popolazione, scelto per studiarla senza esaminarla tutta.

Se voglio sapere quante ore dormono gli studenti del mio liceo, la popolazione sono i 900 iscritti, l'unità statistica è il singolo studente e, se ne intervisto 90, quelli sono il campione. Un campione è utile solo se è **rappresentativo**: intervistando soltanto i ragazzi della squadra di pallavolo otterrei un'immagine distorta della scuola.

Di ogni unità si osserva un **carattere** (le ore di sonno, il colore degli occhi, il voto). I valori che il carattere assume si chiamano **modalità**.

- Carattere **qualitativo**: le modalità sono parole, non numeri. È *ordinabile* se le modalità hanno un ordine naturale (insufficiente, sufficiente, buono, ottimo), *sconnesso* se non ce l'hanno (colore degli occhi, sport praticato).
- Carattere **quantitativo discreto**: le modalità sono numeri isolati, che si **contano** (numero di fratelli, voto, numero di errori in un dettato).
- Carattere **quantitativo continuo**: le modalità possono essere tutti i numeri di un intervallo e si **misurano** (altezza, peso, tempo). Fra due valori ce n'è sempre un terzo.

>! Un carattere fatto di numeri non è automaticamente quantitativo: il numero sulla maglia di un calciatore e il codice di avviamento postale sono etichette. Se fare la media non ha senso, il carattere è qualitativo.` },

    { id: 'frequenze', titolo: 'Frequenze assolute, relative, percentuali e cumulate', testo: R`Contare quante volte compare ogni modalità è il primo passo di qualunque indagine.

>* La **frequenza assoluta** $n_i$ è il numero di unità che presentano la modalità $x_i$. La **frequenza relativa** è $f_i = \dfrac{n_i}{N}$, dove $N$ è il numero totale di unità. La **frequenza percentuale** si ottiene moltiplicando $f_i$ per 100.

Ecco i voti dell'ultima verifica in una classe di $N = 25$ studenti.

| voto $x_i$ | $n_i$ | $f_i$ | percentuale | cumulata $N_i$ |
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

La somma delle frequenze assolute è sempre $N$, quella delle relative è sempre $1$, quella delle percentuali è sempre 100: è il primo controllo da fare su una tabella, e smaschera subito un errore di conteggio.

Le frequenze relative servono a **confrontare gruppi di dimensione diversa**: dire che in 3ªA cinque studenti sono insufficienti e in 3ªB sette non significa niente finché non si sa quanti sono in tutto.

La **frequenza cumulata** $N_i$ è la somma delle frequenze di tutte le modalità minori o uguali a $x_i$: risponde alla domanda «quanti hanno preso *al più* 6?». Qui vale 14, cioè il 56% della classe. Ha senso solo per caratteri ordinabili.

[[grafico:voti]]` },

    { id: 'classi', titolo: 'Tabelle per classi e densità di frequenza', testo: R`Con un carattere continuo elencare le modalità non funziona: su 40 studenti misurati al millimetro si otterrebbero 40 righe con frequenza 1 ciascuna, cioè nessuna informazione. I dati si raggruppano allora in **classi**, intervalli contigui che non si sovrappongono.

>* Una **classe** è un intervallo di valori, di solito chiuso a sinistra e aperto a destra, come $[165; 170)$. La sua **ampiezza** $a_i$ è la differenza fra gli estremi; il suo **valore centrale** $c_i$ è la media dei due estremi.

Le altezze in centimetri di 40 studenti, in classi di ampiezza 5:

| classe | $c_i$ | $n_i$ | $f_i$ | densità |
|---|---|---|---|---|
| [155; 160) | 157,5 | 3 | 0,075 | 0,6 |
| [160; 165) | 162,5 | 7 | 0,175 | 1,4 |
| [165; 170) | 167,5 | 12 | 0,300 | 2,4 |
| [170; 175) | 172,5 | 11 | 0,275 | 2,2 |
| [175; 180) | 177,5 | 5 | 0,125 | 1,0 |
| [180; 185) | 182,5 | 2 | 0,050 | 0,4 |

Perché la convenzione «chiuso a sinistra, aperto a destra»? Perché uno studente alto esattamente 170 cm deve finire in una classe sola: con $[165; 170)$ e $[170; 175)$ non c'è ambiguità.

Quando le classi hanno **ampiezze diverse** le frequenze non sono più confrontabili, e serve la **densità di frequenza**:

$$h_i = \frac{n_i}{a_i}.$$

Se nella tabella unissi le ultime due classi in $[175; 185)$, la nuova classe avrebbe frequenza $7$ e ampiezza $10$. Una barra alta 7 la farebbe sembrare numerosa quanto la classe $[160; 165)$, che però è larga la metà. La densità dice la verità: $0{,}7$ contro $1{,}4$, esattamente la metà.

>! Raggruppare in classi fa perdere informazione: dopo, dei dati originali resta solo il valore centrale. Per questo la media calcolata dalle classi è **approssimata**.

[[grafico:altezze]]` },

    { id: 'rappresentazioni', titolo: 'Quale grafico usare', testo: R`Un grafico non è una decorazione: è un modo di far vedere in un colpo d'occhio ciò che nella tabella è nascosto. Ogni tipo ha il suo mestiere.

**Ortogramma (diagramma a barre).** Barre separate, tutte della stessa larghezza, alte quanto la frequenza. È il grafico dei caratteri **qualitativi** e **quantitativi discreti**. Le barre sono staccate proprio per dire che fra una modalità e l'altra non c'è niente in mezzo. Con due o più gruppi si affiancano le barre, come qui, dove si confrontano due classi usando le percentuali (le classi hanno 25 e 20 studenti: i valori assoluti ingannerebbero).

[[grafico:confronto]]

**Istogramma.** Barre **attaccate**, una per classe, usato per i caratteri **continui**. L'area di ogni rettangolo, non la sua altezza, rappresenta la frequenza: per questo con classi di ampiezza diversa in ordinata si mette la densità $h_i$.

**Aerogramma (diagramma a torta).** Il cerchio è il totale e ogni settore ha un angolo al centro proporzionale alla frequenza: $\alpha_i = f_i \cdot 360^\circ$. Serve a mostrare **come si ripartisce un tutto**, quindi solo per poche modalità e solo se sommano al 100%.

[[grafico:torta]]

**Diagramma cartesiano.** Punti uniti da una spezzata, con il tempo in ascissa: è il grafico delle **serie storiche**, perché fa vedere l'andamento e non le singole quantità.

[[grafico:temporale]]

>! Il trucco più comune per mentire con un grafico è tagliare l'asse verticale: partendo da 700 invece che da 0, una crescita dello 0,5% sembra un'esplosione. Prima di stupirsi, si guarda sempre da dove parte l'ordinata.

>* Qualitativo o discreto → barre. Continuo in classi → istogramma. Parti di un tutto → torta. Andamento nel tempo → diagramma cartesiano.` }
,

    { id: 'indici-posizione', titolo: 'Media, mediana e moda', testo: R`Un **indice di posizione** è un numero che prende il posto dell'intera distribuzione e dice dove sta il gruppo.

>* **Media aritmetica**: $\overline{x} = \dfrac{x_1 + x_2 + \dots + x_N}{N}$. Se i dati sono in una tabella di frequenze, ogni valore va contato tante volte quanta è la sua frequenza: $\overline{x} = \dfrac{\sum x_i n_i}{N}$. È la **media ponderata**, con pesi $n_i$.

Con i voti della classe: $\overline{x} = \dfrac{3 \cdot 1 + 4 \cdot 2 + 5 \cdot 4 + 6 \cdot 7 + 7 \cdot 5 + 8 \cdot 4 + 9 + 10}{25} = \dfrac{159}{25} = 6{,}36$.

I pesi non sono per forza frequenze: se lo scritto vale il doppio dell'orale, chi ha 7 allo scritto e 6 all'orale ha media $\dfrac{7 \cdot 2 + 6 \cdot 1}{3} = \dfrac{20}{3} \approx 6{,}67$, non $6{,}5$.

La media è il **baricentro** dei dati: la somma degli scarti $x_i - \overline{x}$ vale sempre zero, quindi l'asta starebbe in equilibrio proprio lì.

[[grafico:baricentro]]

>* **Mediana**: il valore che occupa il posto centrale dopo aver **ordinato** i dati. Con $N$ dispari è quello di posto $\dfrac{N+1}{2}$; con $N$ pari è la media dei due centrali. **Moda**: la modalità con la frequenza più alta.

Nei 25 voti ordinati il tredicesimo è un 6: la mediana è $6$. La moda è ancora $6$, con 7 studenti.

Quale usare? La media usa tutti i dati, ma un solo **valore anomalo** la trascina via. Cinque stipendi annui, in migliaia di euro: 20, 24, 28, 32 e 200. La media è $60{,}8$, cioè uno stipendio che non prende nessuno; la mediana è $28$ e racconta molto meglio come si vive in quell'azienda. Trascina il punto arancione e guarda chi si muove.

[[grafico:outlier]]

>! La moda è l'unico indice utilizzabile per un carattere qualitativo sconnesso: la media dei colori degli occhi non esiste. La mediana richiede almeno che le modalità siano ordinabili.` },

    { id: 'variabilita', titolo: 'Indici di variabilità', testo: R`Due gruppi possono avere la stessa media ed essere completamente diversi: $5, 6, 6, 6, 7$ e $1, 2, 6, 10, 11$ hanno entrambi media $6$. Serve un numero che misuri quanto i dati sono **sparpagliati**.

Lavoriamo sui cinque dati $3, 5, 6, 7, 9$, che hanno media $\overline{x} = \dfrac{30}{5} = 6$.

**Campo di variazione** (o range): $R = x_{\max} - x_{\min} = 9 - 3 = 6$. Semplicissimo, ma guarda solo due dati su cinque: un unico valore anomalo lo fa esplodere.

**Scarto medio assoluto**: la media delle distanze dalla media, $S = \dfrac{1}{N}\sum |x_i - \overline{x}|$. Qui gli scarti in valore assoluto sono $3, 1, 0, 1, 3$, quindi $S = \dfrac{8}{5} = 1{,}6$.

>* **Varianza**: la media dei quadrati degli scarti, $\sigma^2 = \dfrac{1}{N}\sum (x_i - \overline{x})^2$. **Deviazione standard** (o scarto quadratico medio): $\sigma = \sqrt{\sigma^2}$.

Gli scarti sono $-3, -1, 0, 1, 3$; i loro quadrati $9, 1, 0, 1, 9$, che sommano $20$. Allora $\sigma^2 = \dfrac{20}{5} = 4$ e $\sigma = 2$.

Perché i quadrati e non i valori assoluti? Perché il quadrato punisce di più gli scarti grandi e si maneggia molto meglio in tutti i conti successivi. Il prezzo è che la varianza non ha la stessa unità di misura dei dati (sono centimetri **al quadrato**): per questo si estrae la radice e si usa $\sigma$.

Formula rapida: $\sigma^2 = \overline{x^2} - \overline{x}^2$. Qui i quadrati sono $9, 25, 36, 49, 81$, la loro media è $\dfrac{200}{5} = 40$, e $40 - 36 = 4$.

**Coefficiente di variazione**: $\text{CV} = \dfrac{\sigma}{\overline{x}}$, un numero puro che permette di confrontare la variabilità di grandezze diverse. Qui vale $\dfrac{2}{6} \approx 0{,}33$, cioè il 33%.

>! La varianza non è mai negativa, ed è zero **solo** se tutti i dati sono uguali. Se calcolando ti viene negativa, hai sbagliato un segno o hai dimenticato di elevare al quadrato.` },

    { id: 'doppia-entrata', titolo: 'Due caratteri insieme: tabelle e correlazione', testo: R`Quando su ogni unità si osservano **due** caratteri, i dati si mettono in una **tabella a doppia entrata**: le modalità del primo carattere sulle righe, quelle del secondo sulle colonne.

| | calcio | pallavolo | nuoto | totale |
|---|---|---|---|---|
| maschi | 40 | 10 | 20 | 70 |
| femmine | 10 | 30 | 10 | 50 |
| totale | 50 | 40 | 30 | 120 |

I totali di riga e di colonna sono le **frequenze marginali**: da soli descrivono un carattere alla volta. Le righe interne danno le **frequenze condizionate**: fra i maschi il calcio raccoglie $\dfrac{40}{70} \approx 57$ per cento, fra le femmine solo $\dfrac{10}{50} = 20$ per cento. Le due distribuzioni sono diverse, quindi i due caratteri **non sono indipendenti**: sapere il genere cambia la previsione sullo sport.

Se i due caratteri sono entrambi quantitativi, la coppia $(x_i, y_i)$ diventa un punto e l'insieme dei punti è la **nuvola di punti** (o diagramma di dispersione). Qui, per otto studenti, le ore di studio settimanali e il voto medio.

[[grafico:regressione]]

>* Il **coefficiente di correlazione lineare** $r$ è un numero compreso fra $-1$ e $1$: vicino a $1$ i punti si allineano su una retta crescente, vicino a $-1$ su una retta decrescente, vicino a $0$ non c'è legame lineare. Nei dati del grafico $r \approx 0{,}98$.

La **retta di regressione** è la retta che rende minima la somma dei quadrati delle distanze verticali dai punti (metodo dei **minimi quadrati**). Passa sempre per il punto $(\overline{x}, \overline{y})$; qui è $y = 0{,}5x + 3{,}75$, e il coefficiente $0{,}5$ si legge così: un'ora di studio in più vale in media mezzo punto.

>! Correlazione non è causa. Il numero di gelati venduti e quello degli annegamenti crescono insieme, ma il gelato non annega nessuno: c'è una terza variabile, il caldo. E $r$ misura solo il legame **lineare**: dati disposti su una parabola possono avere $r = 0$.` },

    { id: 'normale', titolo: 'La distribuzione normale', testo: R`Se si misura un carattere continuo su moltissime unità e si affinano le classi, l'istogramma di tantissimi fenomeni naturali prende la stessa forma: una **campana** simmetrica, alta al centro e sottile ai lati. È la **distribuzione normale**, o gaussiana.

Non è un caso. Quando un valore è il risultato di tanti piccoli effetti indipendenti che si sommano, la campana compare da sola: è quello che fa la macchina di Galton, dove ogni pallina viene spostata a destra o a sinistra da una sequenza di urti casuali.

[[animazione:galton]]

La curva ha equazione $y = \dfrac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ e dipende da due soli numeri: la media $\mu$, che dice **dove** sta il centro, e la deviazione standard $\sigma$, che dice **quanto** è larga. Muovi i due cursori e guarda che cosa cambia: spostando $\mu$ la campana trasla, aumentando $\sigma$ si abbassa e si allarga (l'area sotto la curva resta sempre $1$).

[[grafico:gaussiana]]

>* **Regola 68 - 95 - 99,7**: in una distribuzione normale, circa il 68% dei dati sta fra $\mu - \sigma$ e $\mu + \sigma$, circa il 95% fra $\mu - 2\sigma$ e $\mu + 2\sigma$, circa il 99,7% fra $\mu - 3\sigma$ e $\mu + 3\sigma$.

Se le altezze dei diciottenni italiani hanno $\mu = 170$ cm e $\sigma = 8$ cm, allora circa 68 ragazzi su 100 stanno fra 162 e 178 cm, 95 su 100 fra 154 e 186 cm, mentre superare i 194 cm (tre deviazioni standard) capita a poco più di una persona su mille.

>! La campana non è una legge universale: i redditi, i tempi di attesa a uno sportello e i prezzi delle case non sono normali, sono fortemente asimmetrici. Applicare la regola del 68 a dati che non hanno forma di campana porta a conclusioni sbagliate.` }
  ],

  grafici: {
    voti: {
      tipo: 'barre',
      categorie: ['3', '4', '5', '6', '7', '8', '9', '10'],
      valori: [1, 2, 4, 7, 5, 4, 1, 1],
      etichettaY: 'numero di studenti', etichettaX: 'voto',
      didascalia: 'Ortogramma dei voti di 25 studenti: le barre sono staccate perché fra un voto e l\'altro non c\'è niente.'
    },
    altezze: {
      tipo: 'barre',
      categorie: ['155-160', '160-165', '165-170', '170-175', '175-180', '180-185'],
      valori: [3, 7, 12, 11, 5, 2],
      etichettaY: 'numero di studenti', etichettaX: 'altezza (cm)',
      didascalia: 'Le altezze di 40 studenti in classi di ampiezza 5 cm. Essendo le classi tutte uguali, l\'altezza delle barre è anche la densità (a meno del fattore 5).'
    },
    confronto: {
      tipo: 'barre',
      categorie: ['insufficiente', 'sufficiente', 'buono', 'ottimo'],
      serie: [
        { nome: '3A (25 studenti)', valori: [20, 40, 28, 12] },
        { nome: '3B (20 studenti)', valori: [35, 35, 20, 10] }
      ],
      etichettaY: 'percentuale di studenti',
      didascalia: 'Due classi di dimensione diversa si confrontano solo in percentuale: le barre affiancate mostrano che 3B ha più insufficienze in proporzione.'
    },
    torta: {
      tipo: 'svg',
      codice: '<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M100,100 L100,20 A80,80 0 0,1 124.7,176.1 Z" fill="var(--s1)" stroke="var(--g-sfondo)" stroke-width="1.5"/>' +
        '<path d="M100,100 L124.7,176.1 A80,80 0 0,1 23.9,124.7 Z" fill="var(--s2)" stroke="var(--g-sfondo)" stroke-width="1.5"/>' +
        '<path d="M100,100 L23.9,124.7 A80,80 0 0,1 53.0,35.3 Z" fill="var(--s3)" stroke="var(--g-sfondo)" stroke-width="1.5"/>' +
        '<path d="M100,100 L53.0,35.3 A80,80 0 0,1 100,20 Z" fill="var(--s4)" stroke="var(--g-sfondo)" stroke-width="1.5"/>' +
        '<rect x="205" y="34" width="12" height="12" rx="2" fill="var(--s1)"/><text x="223" y="44" fill="currentColor" font-size="13">autobus - 45% (162 gradi)</text>' +
        '<rect x="205" y="62" width="12" height="12" rx="2" fill="var(--s2)"/><text x="223" y="72" fill="currentColor" font-size="13">a piedi - 25% (90 gradi)</text>' +
        '<rect x="205" y="90" width="12" height="12" rx="2" fill="var(--s3)"/><text x="223" y="100" fill="currentColor" font-size="13">auto - 20% (72 gradi)</text>' +
        '<rect x="205" y="118" width="12" height="12" rx="2" fill="var(--s4)"/><text x="223" y="128" fill="currentColor" font-size="13">bicicletta - 10% (36 gradi)</text>' +
        '</svg>',
      didascalia: 'Aerogramma: come raggiungono la scuola 200 studenti. Ogni settore ha un angolo al centro proporzionale alla frequenza relativa.'
    },
    temporale: {
      tipo: 'piano', x: [2018.5, 2025.5], y: [0, 800], passo: [1, 100], altezza: 300,
      griglia: true, etichette: { x: 'anno', y: 'prestiti' },
      punti: [
        { x: 2019, y: 420 }, { x: 2020, y: 300 }, { x: 2021, y: 380 }, { x: 2022, y: 520 },
        { x: 2023, y: 610 }, { x: 2024, y: 700 }, { x: 2025, y: 760 }
      ],
      elementi: [
        { tipo: 'segmento', da: [2019, 420], a: [2020, 300] },
        { tipo: 'segmento', da: [2020, 300], a: [2021, 380] },
        { tipo: 'segmento', da: [2021, 380], a: [2022, 520] },
        { tipo: 'segmento', da: [2022, 520], a: [2023, 610] },
        { tipo: 'segmento', da: [2023, 610], a: [2024, 700] },
        { tipo: 'segmento', da: [2024, 700], a: [2025, 760] }
      ],
      didascalia: 'Serie storica: i prestiti della biblioteca scolastica anno per anno. La spezzata mostra l\'andamento, compreso il crollo del 2020.'
    },
    baricentro: {
      tipo: 'retta-reale', x: [0, 9],
      punti: [
        { x: 1, colore: 1 }, { x: 2, colore: 1 }, { x: 3, colore: 1 },
        { x: 6, colore: 1 }, { x: 8, colore: 1 },
        { x: 4, colore: 2, etichetta: 'media = 4' }
      ],
      didascalia: 'I dati 1, 2, 3, 6, 8 e la loro media. A sinistra gli scarti valgono 3 + 2 + 1 = 6, a destra 2 + 4 = 6: la media è il punto di equilibrio.'
    },
    outlier: {
      tipo: 'piano', x: [0, 210], y: [-1.5, 2.5], passo: [20, 1], altezza: 230,
      griglia: false, etichette: { x: 'migliaia di euro', y: ' ' },
      parametri: [{ nome: 'd', min: 32, max: 200, passo: 1, valore: 32, etichetta: 'quinto stipendio' }],
      punti: [{ x: 20, y: 0 }, { x: 24, y: 0 }, { x: 28, y: 0 }, { x: 32, y: 0 }],
      elementi: [
        { tipo: 'verticale', x: 28, tratteggio: true, colore: 4 },
        { tipo: 'verticale', x: '(104 + d)/5', tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['d', 0], trascina: true, colore: 2 },
        { tipo: 'testo', p: [6, 2], testo: 'media = {{(104 + d)/5}}', ancora: 'start' },
        { tipo: 'testo', p: [6, 1.3], testo: 'mediana = 28', ancora: 'start' }
      ],
      didascalia: 'Quattro stipendi fissi (20, 24, 28, 32) e il quinto trascinabile. La linea verde è la media, quella viola la mediana: solo la media insegue il valore anomalo.'
    },
    regressione: {
      tipo: 'piano', x: [0, 9], y: [0, 9], passo: [1, 1], altezza: 340,
      etichette: { x: 'ore di studio', y: 'voto' },
      punti: [
        { x: 1, y: 4 }, { x: 2, y: 5 }, { x: 3, y: 5.5 }, { x: 4, y: 5.5 },
        { x: 5, y: 6.5 }, { x: 6, y: 6.5 }, { x: 7, y: 7 }, { x: 8, y: 8 }
      ],
      elementi: [
        { tipo: 'retta', m: 0.5, q: 3.75, colore: 2, etichetta: 'y = 0,5x + 3,75' },
        { tipo: 'punto', p: [4.5, 6], colore: 4, etichetta: 'baricentro (4,5 ; 6)', posizione: 'alto-sinistra' }
      ],
      didascalia: 'Nuvola di punti (ore di studio, voto) di otto studenti e retta di regressione ai minimi quadrati. Il coefficiente di correlazione vale circa 0,98.'
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
      didascalia: 'La curva normale: la media la sposta, la deviazione standard la allarga. L\'area colorata, fra media meno sigma e media più sigma, vale sempre circa il 68%.'
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

    { titolo: 'Media, mediana e moda da una tabella', problema: R`Usando la tabella dell'esercizio precedente (20 studenti, numero di fratelli), calcola media, mediana e moda.`, passi: [
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
      R`La **classe modale** è quella con la frequenza più alta, $[165; 170)$ con 12 studenti. Per la mediana servono il ventesimo e il ventunesimo dato: le cumulate sono $3, 10, 22$, quindi entrambi cadono in $[165; 170)$, che è la **classe mediana**.`
    ], risultato: R`$\overline{x} = 169{,}25$ cm; classe modale e classe mediana entrambe $[165; 170)$.` },

    { titolo: 'Varianza e deviazione standard', problema: R`Calcola campo di variazione, scarto medio assoluto, varianza, deviazione standard e coefficiente di variazione dei dati $4, 6, 8, 10, 12$.`, passi: [
      R`Media: $\overline{x} = \dfrac{4 + 6 + 8 + 10 + 12}{5} = \dfrac{40}{5} = 8$.`,
      R`Campo di variazione: $R = 12 - 4 = 8$.`,
      R`Scarti dalla media: $-4, -2, 0, 2, 4$. In valore assoluto $4, 2, 0, 2, 4$, che sommano $12$: lo scarto medio assoluto è $\dfrac{12}{5} = 2{,}4$.`,
      R`Quadrati degli scarti: $16, 4, 0, 4, 16$, somma $40$. Varianza: $\sigma^2 = \dfrac{40}{5} = 8$.`,
      R`Deviazione standard: $\sigma = \sqrt{8} = 2\sqrt{2} \approx 2{,}83$. Controllo con la formula rapida: la media dei quadrati è $\dfrac{16 + 36 + 64 + 100 + 144}{5} = \dfrac{360}{5} = 72$, e $72 - 8^2 = 72 - 64 = 8$. ✓`,
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
    { id: 'es-01', difficolta: 1, testo: R`Su 50 studenti intervistati, 18 vanno a scuola in autobus. Calcola la frequenza relativa di questa modalità (scrivila come numero decimale).`, suggerimenti: [R`La frequenza relativa è la frequenza assoluta divisa per il totale.`, R`Calcola $\dfrac{18}{50}$.`], risposta: { tipo: 'numero', valore: 0.36, tolleranza: 0.005 }, soluzione: [R`$f = \dfrac{18}{50} = 0{,}36$.`, R`In percentuale: il 36% degli studenti prende l'autobus.`] },
    { id: 'es-02', difficolta: 1, testo: R`I voti di 9 studenti sono $4, 5, 5, 6, 6, 7, 8, 8, 9$. Calcola la media aritmetica arrotondata ai centesimi.`, suggerimenti: [R`Somma tutti i voti e dividi per quanti sono.`, R`La somma è $58$.`], risposta: { tipo: 'numero', valore: 6.44, tolleranza: 0.01 }, soluzione: [R`Somma: $4 + 5 + 5 + 6 + 6 + 7 + 8 + 8 + 9 = 58$.`, R`$\overline{x} = \dfrac{58}{9} = 6{,}4\overline{4} \approx 6{,}44$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Calcola la mediana dei dati $4, 5, 5, 6, 6, 7, 8, 8, 9$.`, suggerimenti: [R`I dati sono già ordinati: conta quanti sono.`, R`$N = 9$ è dispari, quindi la mediana è il valore di posto $\dfrac{9+1}{2}$.`], risposta: { tipo: 'numero', valore: 6, tolleranza: 0.01 }, soluzione: [R`$N = 9$ è dispari: la mediana è il valore di posto $5$.`, R`Contando: $4, 5, 5, 6, \mathbf{6}, 7, 8, 8, 9$. La mediana è $6$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Calcola la mediana dei dati $3, 7, 8, 12$.`, suggerimenti: [R`Qui $N$ è pari: i valori centrali sono due.`, R`Fai la media del secondo e del terzo dato.`], risposta: { tipo: 'numero', valore: 7.5, tolleranza: 0.01 }, soluzione: [R`$N = 4$ è pari: i valori centrali sono il secondo e il terzo, cioè $7$ e $8$.`, R`$Me = \dfrac{7 + 8}{2} = 7{,}5$. La mediana non deve per forza essere uno dei dati.`] },
    { id: 'es-05', difficolta: 2, testo: R`Uno studente ha preso $6$ e $7$ nei due compiti scritti (peso $2$ ciascuno) e $8$ nell'interrogazione (peso $1$). Calcola la media ponderata.`, suggerimenti: [R`Moltiplica ogni voto per il suo peso, poi dividi per la somma dei pesi.`, R`La somma dei pesi è $2 + 2 + 1 = 5$.`], risposta: { tipo: 'numero', valore: 6.8, tolleranza: 0.01 }, soluzione: [R`Numeratore: $6 \cdot 2 + 7 \cdot 2 + 8 \cdot 1 = 12 + 14 + 8 = 34$.`, R`Denominatore: $2 + 2 + 1 = 5$.`, R`$\overline{x} = \dfrac{34}{5} = 6{,}8$. La media semplice dei tre voti sarebbe stata $7$: i pesi contano.`] },
    { id: 'es-06', difficolta: 2, testo: R`Calcola la deviazione standard dei dati $2, 4, 4, 4, 5, 5, 7, 9$.`, suggerimenti: [R`Prima la media, poi gli scarti, poi i loro quadrati.`, R`La media è $5$.`, R`La somma dei quadrati degli scarti è $32$, e i dati sono $8$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`$\overline{x} = \dfrac{2 + 4 + 4 + 4 + 5 + 5 + 7 + 9}{8} = \dfrac{40}{8} = 5$.`, R`Scarti: $-3, -1, -1, -1, 0, 0, 2, 4$. Quadrati: $9, 1, 1, 1, 0, 0, 4, 16$, somma $32$.`, R`$\sigma^2 = \dfrac{32}{8} = 4$, quindi $\sigma = \sqrt{4} = 2$.`] },
    { id: 'es-07', difficolta: 2, testo: R`In una classe i voti hanno frequenze: $5$ preso da 6 studenti, $6$ da 9, $7$ da 7, $8$ da 3. Quanti studenti hanno preso al più $6$?`, suggerimenti: [R`«Al più 6» vuol dire 6 oppure meno di 6.`, R`È la frequenza cumulata della modalità $6$.`], risposta: { tipo: 'numero', valore: 15, tolleranza: 0.01 }, soluzione: [R`La frequenza cumulata del $6$ è $6 + 9 = 15$.`, R`Quindi 15 studenti su $6 + 9 + 7 + 3 = 25$, cioè il 60% della classe.`] },
    { id: 'es-08', difficolta: 2, testo: R`Le età degli iscritti a un circolo sono raggruppate così: $[0; 10)$ con 30 persone, $[10; 30)$ con 60, $[30; 70)$ con 80. Calcola la densità di frequenza della terza classe.`, suggerimenti: [R`La densità è la frequenza divisa per l'ampiezza della classe.`, R`L'ampiezza della terza classe è $70 - 30 = 40$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`Ampiezza della terza classe: $70 - 30 = 40$.`, R`$h_3 = \dfrac{80}{40} = 2$.`, R`Le altre densità valgono $\dfrac{30}{10} = 3$ e $\dfrac{60}{20} = 3$: la terza classe è la **meno** densa, pur avendo la frequenza più alta. È esattamente l'inganno che l'istogramma corretto evita.`] },
    { id: 'es-09', difficolta: 2, testo: R`In un sondaggio su 240 persone, 90 preferiscono la montagna. Quanti gradi misura il settore corrispondente in un aerogramma?`, suggerimenti: [R`Trova prima la frequenza relativa.`, R`Moltiplica la frequenza relativa per $360^\circ$.`], risposta: { tipo: 'numero', valore: 135, tolleranza: 0.5 }, soluzione: [R`$f = \dfrac{90}{240} = 0{,}375$.`, R`$\alpha = 0{,}375 \cdot 360^\circ = 135^\circ$.`] },
    { id: 'es-10', difficolta: 3, testo: R`I compensi mensili di cinque collaboratori sono $1200$, $1300$, $1400$, $1500$ e $9600$ euro. Calcola media e mediana (scrivi i due numeri).`, suggerimenti: [R`Per la media somma tutto e dividi per $5$; per la mediana i dati sono già ordinati.`, R`La somma dei cinque compensi è $15\,000$.`, R`Con $N = 5$ la mediana è il terzo valore.`], risposta: { tipo: 'numeri', valori: [3000, 1400] }, soluzione: [R`Somma: $1200 + 1300 + 1400 + 1500 + 9600 = 15\,000$, quindi $\overline{x} = \dfrac{15\,000}{5} = 3000$ euro.`, R`$N = 5$ è dispari: la mediana è il terzo valore, cioè $1400$ euro.`, R`Quattro collaboratori su cinque guadagnano meno della media: qui la mediana descrive molto meglio la situazione, perché il compenso di $9600$ euro è un valore anomalo.`] },
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
    { matematico: 'William Playfair', anni: '1759–1823', titolo: 'Il grafico a barre nato da un dato mancante', testo: R`Ingegnere scozzese, disegnatore per James Watt, spia e avventuriero, Playfair pubblicò nel 1786 il *Commercial and Political Atlas*, dove i dati economici non erano più elencati in tabella ma **disegnati**. Per l'andamento del commercio inglese nel tempo usò le curve; ma della Scozia possedeva soltanto le importazioni e le esportazioni di un anno, senza serie storica. Non potendo disegnare un andamento, disegnò diciassette coppie di barre affiancate, una coppia per paese (importazioni ed esportazioni): era il primo diagramma a barre della storia, nato da un dato che mancava. Nel 1801, nello *Statistical Breviary*, aggiunse il primo diagramma a torta. I contemporanei lo trovarono poco serio; oggi quei due grafici sono ovunque.`, legame: R`Ortogramma e aerogramma, i due grafici della sezione sulle rappresentazioni, sono entrambi una sua invenzione.` },
    { matematico: 'Florence Nightingale', anni: '1820–1910', titolo: 'La statistica che vinse una guerra contro i burocrati', testo: R`Durante la guerra di Crimea (1853-1856) Nightingale organizzò l'assistenza infermieristica negli ospedali militari britannici e cominciò a registrare con precisione le cause di morte dei soldati. I numeri dicevano una cosa scomoda: morivano molto più di infezioni e malattie evitabili che per le ferite in battaglia. Sapeva che una tabella non avrebbe convinto ministri e generali, così inventò un diagramma polare, una specie di torta a settori di raggio variabile, in cui il pezzo azzurro delle morti evitabili schiacciava tutto il resto. Il grafico funzionò: le riforme igieniche negli ospedali militari furono approvate. Nel 1858 fu la prima donna eletta alla Royal Statistical Society.`, legame: R`È l'esempio più celebre del principio della sezione sui grafici: la scelta della rappresentazione decide se i dati vengono capiti o ignorati.` },
    { matematico: 'Adolphe Quetelet', anni: '1796–1874', titolo: 'L\'invenzione dell\'uomo medio', testo: R`Astronomo belga, Quetelet ebbe un'idea che allora sembrò stravagante: applicare agli esseri umani gli stessi metodi con cui gli astronomi trattavano gli errori di misura. Raccolse migliaia di dati su altezze, pesi, tassi di criminalità e di matrimonio e osservò che si distribuivano lungo la stessa curva a campana degli errori di osservazione. Nel 1835, in *Sur l'homme*, propose l'idea dell'*homme moyen*, l'uomo medio: un individuo fittizio, con i valori medi di tutti i caratteri, attorno al quale gli altri si distribuirebbero come errori attorno a una misura vera. Da quelle ricerche nacque anche l'indice che confronta peso e altezza, per lungo tempo chiamato indice di Quetelet e oggi noto come indice di massa corporea.`, legame: R`È lui a portare la media aritmetica e la curva normale dalla fisica alle scienze umane, cioè a fondare la statistica come la usiamo.` },
    { matematico: 'Francis Galton', anni: '1822–1911', titolo: 'La regressione verso la media', testo: R`Cugino di Charles Darwin, Galton misurava tutto: teste, impronte digitali, perfino la «noia» durante le conferenze. Confrontando le stature di genitori e figli notò un fatto sorprendente: i figli di genitori altissimi sono in media più bassi dei genitori, e i figli di genitori bassissimi più alti. Chiamò il fenomeno **regressione verso la media**, e da lì nacquero la retta di regressione e l'idea di correlazione, poi formalizzata dal suo allievo Karl Pearson. Costruì anche la *quincunx*, la macchina in cui palline che rimbalzano su una griglia di chiodi formano da sole una campana. Va detto che Galton usò la statistica anche per fondare l'eugenetica, un programma che la scienza ha poi respinto: gli strumenti che inventò sono sopravvissuti, le sue conclusioni no.`, legame: R`La retta di regressione, il coefficiente di correlazione e la macchina di Galton dell'ultima sezione vengono tutti da lui.` }
  ]
});
})();
