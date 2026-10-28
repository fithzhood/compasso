(function () {
const R = String.raw;
/* Ricerca operativa e programmazione lineare (istituti tecnici AFM, quinto anno, livello 3). Ogni numero di teoria,
   esempi, esercizi, quiz e flashcard è stato ricalcolato con node. Gli esempi della teoria sono quelli dei video:
   - vertice: vincoli x ≥ 0, y ≥ 0, x + y ≤ 6, x ≤ 4, y ≤ 5; vertici O(0; 0), A(4; 0), B(4; 2), C(1; 5), D(0; 5);
     z = 3x + 2y vale 0, 12, 16, 13, 10: massimo 16 in B. Con z = x + y il massimo 6 sta su tutto il lato BC.
   - scorte: D = 1200 pezzi all'anno, c_o = 50 € a ordine, c_g = 3 € a pezzo all'anno; lotto economico q* = 200,
     6 ordini, 300 € + 300 € = 600 €; con 100 o 400 pezzi a ordine 750 €.
   Le altre guide della teoria: cornici P(q) = 12q − 900 su [0, 200]; cioccolato p = 50 €/kg, C(q) = 0,2q² + 10q + 720,
   P(q) = −0,2q² + 40q − 720 (vertice 100, P = 1280; con capacità 80, P = 1200); infornate P(q) = −2q² + 25q − 30
   (vertice 6,25: P(6) = 48, P(7) = 47); furgone A = 60 + 0,4x, B = 20 + 0,6x, C = 150 (indifferenza 200 km e 225 km);
   mangimi x + y ≥ 4, x + 3y ≥ 6, z = 2x + 3y (minimo 9 in (3; 1)); mobilificio 2x + y ≤ 100, x + 3y ≤ 150, y ≤ 45,
   z = 40x + 30y (massimo 2400 in (30; 40)).
   Simboli come in matematica-economia.js: q quantità, C costo, R ricavo, P profitto (P(q) sempre con l'argomento);
   nelle scorte D domanda annua, c_o costo di un'ordinazione, c_g costo annuo di magazzino di un pezzo.
   Fra un numero e la sua unità c'è lo spazio non separabile. */

/* ---- allenamento: risposte (il motore ignora «€» ed «euro», e legge il punto delle migliaia) ---- */
const euro = (v, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.011, segnaposto: 'in euro, es. 1250', simboli: ['/'] });
const pezzi = (v, seg) => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: seg || 'numero di pezzi', simboli: [] });
const numero = (v, tol, seg) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.011, segnaposto: seg || 'un numero', simboli: ['/', '−'] });
/* più numeri in quell'ordine, separati da punto e virgola */
const lista = (valori, seg) => ({ tipo: 'numeri', valori: valori, ordinati: true, tolleranza: 0.011, segnaposto: seg, simboli: [';'] });
const parola = (accettate, seg) => ({ tipo: 'testo', accettate: accettate, segnaposto: seg, simboli: [] });

/* ---- le figure ---- */
const conPiano = (base, extra) => Object.assign({}, base, extra);
/* il pentagono del video: x ≥ 0, y ≥ 0, x + y ≤ 6, x ≤ 4, y ≤ 5 */
const PIANO_PL = { tipo: 'piano', x: [-0.5, 7], y: [-0.5, 7], passo: [1, 1], proporzioni: 'uguali', mirino: false };
const REGIONE = { tipo: 'area', f: 'min(5, 6 - x)', g: '0', da: 0, a: 4, colore: 3 };
const BORDI = [
  { tipo: 'retta', per: [[0, 6], [6, 0]], colore: 4 },
  { tipo: 'verticale', x: 4, colore: 4 },
  { tipo: 'orizzontale', y: 5, colore: 4 }
];
const VERTICI = [
  { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-sinistra', colore: 3 },
  { tipo: 'punto', p: [4, 0], etichetta: 'A', posizione: 'alto-destra', colore: 3 },
  { tipo: 'punto', p: [4, 2], etichetta: 'B', posizione: 'destra', colore: 3 },
  { tipo: 'punto', p: [1, 5], etichetta: 'C', posizione: 'alto-destra', colore: 3 },
  { tipo: 'punto', p: [0, 5], etichetta: 'D', posizione: 'alto-sinistra', colore: 3 }
];
/* i punti interi del caso discreto */
const INFORNATE = [];
for (let q = 1; q <= 11; q++) INFORNATE.push({ x: q, y: -2 * q * q + 25 * q - 30, colore: q === 6 ? 3 : 1, etichetta: q === 6 ? '(6; 48)' : '', posizione: 'alto-sinistra' });

COMPASSO.registra({
  id: 'ricerca-operativa',
  titolo: 'Ricerca operativa e programmazione lineare',

  introduzione: R`Un'azienda deve decidere quanto produrre, che cosa comprare, quando riordinare la merce. Ogni scelta ha dei limiti: le ore delle macchine, il denaro, lo spazio in magazzino. La **ricerca operativa** è la parte della matematica che cerca la scelta migliore dentro questi limiti.

Qui trovi i problemi di scelta più comuni. Si cerca il massimo di un profitto o il minimo di un costo, con una retta o con una parabola. Si confrontano due o tre tariffe. Si calcola quanta merce ordinare ogni volta, con il lotto economico. Infine la **programmazione lineare** risolve i problemi con due variabili e tanti vincoli, con un disegno nel piano.

Ti servono la retta, le disequazioni in due incognite e il vertice della parabola. Aiutano le funzioni di costo, ricavo e profitto di «Matematica per l'economia».`,

  inBreve: [
    R`Un problema di scelta ha tre ingredienti: le variabili d'azione, i vincoli e la funzione obiettivo da rendere massima o minima.`,
    R`Con una funzione obiettivo lineare l'ottimo sta a un estremo dell'intervallo. Con una parabola sta nel vertice, se il vertice rispetta i vincoli.`,
    R`Fra due tariffe con costi lineari decide il punto di indifferenza: prima conviene una, dopo l'altra.`,
    R`In questo modello delle scorte il lotto economico è $q^* = \sqrt{\frac{2\,c_o D}{c_g}}$. Lì il costo delle ordinazioni è uguale a quello di magazzino.`,
    R`Nella programmazione lineare la regione ammissibile è un poligono, e il massimo si raggiunge in un vertice: basta calcolare la funzione obiettivo nei vertici.`
  ],

  sezioni: [
    { id: 'ricerca-operativa', titolo: 'Che cos\'è la ricerca operativa', testo: R`La **ricerca operativa** studia come prendere la decisione migliore quando le risorse sono limitate. Le risorse sono ore di lavoro, materie prime, denaro, spazio. Il nome nacque in Inghilterra nel 1937–38, alla vigilia della Seconda guerra mondiale. Gli scienziati della stazione radar di Bawdsey studiavano come usare al meglio i nuovi radar. In inglese si diceva *operational research*: la ricerca sulle operazioni militari. Dopo la guerra gli stessi metodi passarono alle aziende.

>* Un problema di scelta ha tre ingredienti. Le **variabili d'azione** sono le quantità che decidi tu. I **vincoli** sono i limiti che devono rispettare. La **funzione obiettivo** è la grandezza da rendere massima, come un profitto, o minima, come un costo.

Il lavoro si fa in quattro fasi.

1. **Il problema.** Si raccolgono i dati e si chiarisce che cosa si vuole ottenere.
2. **Il modello.** Si traducono i dati in formule: la funzione obiettivo e i vincoli, con equazioni e disequazioni.
3. **La soluzione.** Si trova il massimo o il minimo con un metodo matematico.
4. **La verifica.** Si controlla che la soluzione abbia senso nella realtà. Se non ce l'ha, si corregge il modello.

Un esempio. Un artigiano fa cornici e guadagna $12$ € su ogni cornice venduta. Ha costi fissi di $900$ € al mese. Ne può fare al massimo $200$ al mese.

~ q = \text{cornici fatte in un mese} :: la variabile d'azione
~ 0 \le q \le 200 :: i vincoli: non negativa, e non oltre la capacità
~ P(q) = 12q - 900 :: la funzione obiettivo: il profitto, da rendere massimo

>! Il modello è una semplificazione. Qui si suppone che tutte le cornici si vendano, allo stesso prezzo. La verifica serve proprio a controllare queste ipotesi.

### Certezza e incertezza

Se tutti i dati sono noti con sicurezza, il problema è **in condizioni di certezza**. Se qualche dato dipende dal caso, come le vendite di domani, è **in condizioni di incertezza**. Qui si studiano i problemi in condizioni di certezza. Fra questi ci sono quelli **con effetti immediati**, che si chiudono subito. In quelli **con effetti differiti** contano anche il tempo e gli interessi, come in «Matematica finanziaria».

?? Nel modello delle cornici, che cos'è il numero $200$?
[ ] La funzione obiettivo.
[x] Un vincolo: la capacità produttiva.
[ ] La variabile d'azione.
=> La variabile d'azione è $q$, il numero di cornici. La funzione obiettivo è il profitto $P(q)$. Il $200$ limita le scelte possibili: è un vincolo.` },

    { id: 'caso-continuo', titolo: 'Scelte nel caso continuo: retta e parabola', testo: R`Nel **caso continuo** la variabile d'azione può prendere tutti i valori di un intervallo. Per esempio i chili di un prodotto: anche $12{,}5$ kg ha senso. L'intervallo fissato dai vincoli è il **campo di scelta**.

### Funzione obiettivo lineare

Riprendi le cornici: $P(q) = 12q - 900$, con $0 \le q \le 200$. Il coefficiente di $q$ è positivo, quindi il profitto cresce sempre. Il massimo sta all'estremo destro: $P(200) = 2400 - 900 = 1500$ €.

>* Con una funzione obiettivo **lineare** il massimo e il minimo stanno agli **estremi** del campo di scelta. Se la retta sale, il massimo è a destra. Se scende, è a sinistra.

Il valore per cui $P(q) = 0$ è il **punto di pareggio**: qui $q = 75$. Con meno di $75$ cornici l'artigiano perde.

### Funzione obiettivo quadratica

Un laboratorio vende cioccolato a $50$ € al kg. Produrre $q$ kg al giorno costa $C(q) = 0{,}2q^2 + 10q + 720$ euro. Ogni chilo in più costa più del precedente, perché servono straordinari.

~ P(q) = 50q - (0{,}2q^2 + 10q + 720) :: il profitto è ricavo meno costo, con $R(q) = 50q$
~ P(q) = \evid{-0{,}2q^2 + 40q - 720} :: una parabola rivolta verso il basso
~ q_V = -\frac{40}{2 \cdot (-0{,}2)} = \evidb{100} :: l'ascissa del vertice, $-\frac{b}{2a}$
~ P(100) = -2000 + 4000 - 720 = \evidb{1280} :: il profitto massimo, in euro

>* Con una parabola rivolta verso il basso il massimo sta nel **vertice**, se il vertice rispetta i vincoli. Se il vertice cade fuori dal campo di scelta, il massimo sta nell'estremo più vicino al vertice.

Se il laboratorio può fare al massimo $150$ kg al giorno, il vertice va bene: $100$ kg danno $1280$ €. Se ne può fare solo $80$, il vertice non si raggiunge. Fino a $80$ la parabola sale, quindi il massimo è $P(80) = 1200$ €.

[[grafico:gContinuo]]

>! Prima di scrivere il risultato guarda dove sta il vertice. Il vertice è il massimo della parabola, non sempre il massimo del problema.

Se si cerca il minimo di un costo, la parabola è rivolta verso l'alto. Il vertice allora è il punto più basso. Valgono le stesse regole. Per funzioni che non sono rette né parabole servono le derivate: è il metodo di «Studio di funzione».

?? Il profitto è $P(q) = -q^2 + 80q - 1000$, con $0 \le q \le 50$. Dove sta il massimo?
[x] A $q = 40$, nel vertice.
[ ] A $q = 50$, all'estremo destro.
[ ] A $q = 80$, il coefficiente di $q$.
=> Il vertice ha $q_V = -\frac{80}{2 \cdot (-1)} = 40$, che sta fra $0$ e $50$. Quindi il massimo è nel vertice: $P(40) = 600$ €. Dopo $40$ la parabola scende.` },

    { id: 'caso-discreto', titolo: 'Scelte nel caso discreto', testo: R`Nel **caso discreto** la variabile d'azione prende solo valori isolati, di solito numeri interi. Non si fanno $6{,}25$ infornate, e non si comprano $2{,}5$ furgoni.

>* Nel caso discreto il campo di scelta è un insieme di punti. La funzione obiettivo si calcola nei valori ammessi, e si sceglie il migliore. Se il modello è una parabola, si trova il vertice e si provano gli **interi più vicini**.

Un forno industriale lavora a infornate, $q$ al giorno. Il profitto giornaliero è $P(q) = -2q^2 + 25q - 30$ euro.

~ q_V = -\frac{25}{2 \cdot (-2)} = 6{,}25 :: il vertice non è intero
~ P(6) = -72 + 150 - 30 = \evidb{48} :: l'intero a sinistra del vertice
~ P(7) = -98 + 175 - 30 = \evidb{47} :: l'intero a destra del vertice

Conviene fare $6$ infornate al giorno, con $48$ € di profitto. Il vertice darebbe $48{,}125$ €, ma non si può raggiungere.

[[grafico:gDiscreto]]

La parabola è simmetrica rispetto al vertice. Per questo vince l'intero **più vicino** al vertice: $6$ dista $0{,}25$, $7$ dista $0{,}75$. Se i due interi sono alla stessa distanza, vanno bene tutti e due.

>! Non arrotondare il vertice senza fare i conti. Con modelli non simmetrici l'intero più vicino può non essere il migliore. Calcola sempre la funzione nei due interi.

### Quando non c'è una formula

A volte la funzione obiettivo è data solo da una tabella. Allora si calcola il risultato di ogni scelta e si confrontano i numeri. Una gelateria decide quanti commessi assumere per l'estate. Ogni commesso costa $1500$ €, e il ricavo previsto dipende dal servizio. Gli importi della tabella sono in euro.

| commessi | ricavo | costo | profitto |
|---|---|---|---|
| $1$ | $9000$ | $1500$ | $7500$ |
| $2$ | $12\,500$ | $3000$ | $9500$ |
| $3$ | $15\,000$ | $4500$ | $10\,500$ |
| $4$ | $16\,000$ | $6000$ | $10\,000$ |

Il profitto più alto è con $3$ commessi. Il quarto porta $1000$ € di ricavo in più, ma costa $1500$ €.

?? Il profitto è $P(q) = -q^2 + 9q$, con $q$ intero. Quali valori di $q$ danno il massimo?
=> Il vertice è $q_V = 4{,}5$, esattamente a metà fra $4$ e $5$. Infatti $P(4) = P(5) = 20$: vanno bene tutti e due.` },

    { id: 'alternative', titolo: 'Scelta fra più alternative', testo: R`Spesso non si sceglie una quantità, ma **fra due o più offerte**. Ogni offerta ha un costo che dipende dall'uso. Conviene quella che costa meno, e la risposta cambia con la quantità.

Un'azienda deve noleggiare un furgone per un giorno. Ci sono due tariffe.

- Tariffa A: $60$ € fissi più $0{,}40$ € al km.
- Tariffa B: $20$ € fissi più $0{,}60$ € al km.

Con $x$ km percorsi i costi sono due rette: $y_A = 60 + 0{,}4x$ e $y_B = 20 + 0{,}6x$. B parte più in basso, ma sale più in fretta.

~ 60 + 0{,}4x = 20 + 0{,}6x :: i due costi uguali
~ 40 = 0{,}2x :: porto i numeri a sinistra e le $x$ a destra
~ x = \evidb{200} :: il punto di indifferenza, in km
~ y_A = y_B = 60 + 80 = \evidb{140} :: il costo comune, in euro

>* Il **punto di indifferenza** è il valore della variabile per cui due alternative costano uguale. Nel grafico è l'incrocio delle due rette di costo. Prima di quel punto conviene un'alternativa, dopo conviene l'altra.

Sotto i $200$ km conviene B, perché pesa meno la quota fissa. Sopra i $200$ km conviene A, perché pesa meno il costo al km.

[[grafico:gAlternative]]

### Tre alternative

Arriva una terza offerta, C: $150$ € al giorno, con i km illimitati. Il suo costo è una retta orizzontale. C costa meno di A quando $60 + 0{,}4x > 150$, cioè oltre i $225$ km. Per scegliere si guarda la linea più bassa, tratto per tratto.

| km percorsi | tariffa migliore |
|---|---|
| fino a $200$ | B |
| da $200$ a $225$ | A |
| oltre $225$ | C |

>! Non basta confrontare le rette a due a due. B e C si incrociano a circa $217$ km, ma lì A costa meno di tutte e due. Conta solo la linea più bassa.

?? Due abbonamenti: $10$ € al mese più $0{,}05$ € al minuto, oppure $0{,}15$ € al minuto senza canone. Chi parla $150$ minuti al mese, che cosa sceglie?
[x] Il primo: spende $17{,}50$ € invece di $22{,}50$ €.
[ ] Il secondo, perché non ha il canone.
[ ] È indifferente: il punto di indifferenza è a $150$ minuti.
=> I due costi sono uguali per $10 + 0{,}05x = 0{,}15x$, cioè a $100$ minuti. Oltre i $100$ minuti conviene l'abbonamento con il canone: $10 + 7{,}50 = 17{,}50$ €.` },

    { id: 'scorte', titolo: 'Le scorte: il lotto economico', testo: R`Un negozio vende ogni anno $1200$ pezzi di un articolo e li ordina al fornitore. Può ordinarli tutti insieme, o pochi per volta. Ordinare spesso costa: ogni ordine ha spese di trasporto e di ufficio. Ordinare tanto costa anche lui: la merce ferma occupa spazio e tiene fermo il denaro.

[[video:ricerca-operativa/scorte]]

Il modello più semplice parte da quattro ipotesi.

- La domanda è **costante** durante l'anno e nota in anticipo.
- La merce arriva appena serve: **nessuna rottura di stock**, cioè il magazzino non resta mai vuoto con clienti in attesa.
- Ogni ordine costa sempre lo stesso, qualunque sia la quantità.
- Il prezzo d'acquisto non dipende dalla quantità ordinata.

I simboli: $D$ è la domanda di un anno, in pezzi. $c_o$ è il costo di un'ordinazione. $c_g$ è il costo di magazzino, o di giacenza, di un pezzo per un anno. $q$ sono i pezzi di ogni ordine.

### I due costi

In un anno si fanno $\frac{D}{q}$ ordini. Il costo delle ordinazioni è $c_o \cdot \frac{D}{q}$: più grande è $q$, più scende.

La scorta arriva a $q$ pezzi e si svuota piano piano, fino a zero. Allora arriva il nuovo ordine. In media in magazzino ci sono $\frac{q}{2}$ pezzi. Il costo di magazzino è $c_g \cdot \frac{q}{2}$: più grande è $q$, più sale.

[[grafico:gDenteSega]]

>* In questo modello il costo annuo di gestione delle scorte è $$C(q) = c_o \frac{D}{q} + c_g \frac{q}{2}.$$ Il minimo sta nel **lotto economico** $$q^* = \sqrt{\frac{2\,c_o D}{c_g}}.$$ Lì il costo delle ordinazioni è uguale al costo di magazzino.

Con $D = 1200$ pezzi, $c_o = 50$ € e $c_g = 3$ €:

~ 50 \cdot \frac{1200}{q} = 3 \cdot \frac{q}{2} :: i due costi uguali
~ 60\,000 = 1{,}5\,q^2 :: moltiplico i due membri per $q$
~ q^2 = 40\,000 \Rightarrow q^* = \evidb{200} :: il lotto economico, in pezzi
~ C(200) = 300 + 300 = \evidb{600} :: il costo annuo minimo, in euro

Si fanno $6$ ordini all'anno, uno ogni due mesi. Con $100$ o con $400$ pezzi per ordine il costo sale a $750$ €.

[[grafico:gScorte]]

Perché il minimo cade dove i due costi sono uguali? Il loro prodotto è fisso: $c_o \frac{D}{q} \cdot c_g \frac{q}{2} = \frac{c_o c_g D}{2}$. La somma di due numeri positivi con prodotto fisso è minima quando sono uguali. È la stessa idea del costo medio minimo, in «Matematica per l'economia».

>! Le unità devono combaciare. Se la domanda è mensile, anche il costo di magazzino va preso al mese. Mescolare dati annui e mensili dà un lotto sbagliato.

>! Il costo d'acquisto della merce non entra nella formula. In un anno si comprano comunque $D$ pezzi, allo stesso prezzo: è una spesa fissa, che non sposta il minimo.

?? Il costo di ogni ordine raddoppia. Che cosa succede al lotto economico?
[ ] Raddoppia anche lui.
[ ] Si dimezza.
[x] Cresce, ma meno: si moltiplica per $\sqrt{2}$.
=> $c_o$ sta sotto la radice: se raddoppia, $q^*$ si moltiplica per $\sqrt{2} \approx 1{,}41$. Ordini più cari spingono a ordinare più merce per volta, ma non il doppio.` },

    { id: 'pl-modello', titolo: 'La programmazione lineare: il modello', testo: R`Nei problemi visti finora c'era una sola variabile. Spesso le scelte sono due: quanti pezzi di un prodotto e quanti di un altro. Ogni risorsa limitata dà un vincolo, e i vincoli sono tanti.

>* Un problema di **programmazione lineare** in due variabili ha una funzione obiettivo lineare, $z = ax + by$, da rendere massima o minima. I vincoli sono disequazioni di primo grado in $x$ e $y$. Ci sono quasi sempre anche i **vincoli di segno**, $x \ge 0$ e $y \ge 0$.

Ogni vincolo è una disequazione in due incognite: le sue soluzioni sono un **semipiano**. Come si disegna è spiegato in «Piano cartesiano e retta», nella parte sulle disequazioni in due incognite. In breve: disegni la retta di bordo e provi un punto, per esempio l'origine.

>* La **regione ammissibile** è l'insieme dei punti che rispettano tutti i vincoli insieme: l'intersezione dei semipiani. I suoi punti sono le **soluzioni ammissibili**. Se la regione è limitata, è un poligono convesso.

Prendi i vincoli $x \ge 0$, $y \ge 0$, $x + y \le 6$, $x \le 4$, $y \le 5$.

- $x \ge 0$ e $y \ge 0$: il primo quadrante.
- $x + y \le 6$: sotto la retta $x + y = 6$. Infatti l'origine dà $0 \le 6$, che è vero.
- $x \le 4$: a sinistra della retta verticale $x = 4$.
- $y \le 5$: sotto la retta orizzontale $y = 5$.

[[grafico:gRegione]]

La regione è un pentagono. I suoi **vertici** sono incroci di rette di bordo, e ognuno si trova con un sistema.

~ x = 4,\ x + y = 6 \Rightarrow \evidb{B(4; 2)} :: la retta verticale e la retta obliqua
~ y = 5,\ x + y = 6 \Rightarrow \evidb{C(1; 5)} :: la retta orizzontale e la retta obliqua

Gli altri vertici si leggono subito: $O(0; 0)$, $A(4; 0)$ e $D(0; 5)$.

>! Non ogni incrocio di due rette è un vertice. Le rette $x = 4$ e $y = 5$ si incontrano in $(4; 5)$, ma lì $x + y = 9 > 6$. Quel punto è fuori dalla regione. Ogni vertice va controllato in tutti i vincoli.

?? Il punto $(3; 2)$ è una soluzione ammissibile di questo problema?
=> Sì. Le coordinate non sono negative, $3 + 2 = 5 \le 6$, $3 \le 4$ e $2 \le 5$. Rispetta tutti i vincoli, quindi sta nella regione ammissibile.` },

    { id: 'metodo-grafico', titolo: 'La programmazione lineare: metodo grafico', testo: R`Nella regione ammissibile ci sono infiniti punti. Bisogna trovare quello in cui la funzione obiettivo è più grande. Prendi il pentagono $OABCD$ dei vincoli $x + y \le 6$, $x \le 4$, $y \le 5$, con $x$ e $y$ non negativi. La funzione obiettivo è $z = 3x + 2y$.

[[video:ricerca-operativa/vertice]]

### Le rette di livello

Fissa un numero $k$. I punti dove $z = k$ stanno sulla retta $3x + 2y = k$. Si chiama **retta di livello**: lungo questa retta $z$ non cambia.

Con $k = 6$ la retta passa per $(2; 0)$ e $(0; 3)$. Con $k = 12$ passa per $(4; 0)$ e $(0; 6)$. Tutte le rette di livello hanno pendenza $-\frac{3}{2}$: sono **parallele**. Più $k$ è grande, più la retta è lontana dall'origine.

[[grafico:gLivello]]

Per avere $z$ grande, la retta deve andare più in là possibile, toccando ancora la regione. L'ultimo punto che tocca prima di uscire è $B(4; 2)$. Lì $z = 3 \cdot 4 + 2 \cdot 2 = 16$.

>* **Teorema fondamentale della programmazione lineare**: se la funzione obiettivo ha un massimo sulla regione ammissibile, lo raggiunge in un vertice. Lo stesso vale per il minimo. In breve: **il massimo si raggiunge in un vertice**.

Il teorema dà un metodo che non ha bisogno delle rette di livello: si calcola $z$ in ogni vertice.

| vertice | $z = 3x + 2y$ |
|---|---|
| $O(0; 0)$ | $0$ |
| $A(4; 0)$ | $12$ |
| $B(4; 2)$ | $16$ |
| $C(1; 5)$ | $13$ |
| $D(0; 5)$ | $10$ |

Il massimo è $16$, in $B$. Il minimo è $0$, in $O$.

>! Il massimo non sta per forza nel vertice più lontano dall'origine. $C(1; 5)$ è più lontano di $B$, ma $z$ dà più peso alla $x$. Conta la pendenza della funzione obiettivo.

### Il metodo in quattro passi

1. Scrivi le variabili, i vincoli e la funzione obiettivo.
2. Disegna la regione ammissibile.
3. Trova i vertici con i sistemi.
4. Calcola $z$ nei vertici, oppure fai scorrere la retta di livello.

Per il **minimo** si fa lo stesso. La retta di livello scorre verso valori di $k$ sempre più piccoli.

?? Nella stessa regione la funzione obiettivo diventa $z = x + 3y$. In quale vertice è massima?
[ ] In $B(4; 2)$.
[x] In $C(1; 5)$.
[ ] In $D(0; 5)$.
=> Calcola $z$ nei vertici: $O$ dà $0$, $A$ dà $4$, $B$ dà $10$. Poi $C$ dà $16$ e $D$ dà $15$. Il massimo è $16$, in $C$. Con un'altra funzione obiettivo cambia il vertice migliore.` },

    { id: 'casi-particolari', titolo: 'Regioni illimitate e casi particolari', testo: R`Non sempre la regione è un poligono chiuso. E non sempre c'è un solo punto migliore. Ci sono tre casi da riconoscere.

### Regione illimitata

Un allevatore mescola due mangimi: $x$ kg del primo e $y$ kg del secondo. Per avere abbastanza proteine e fibre servono $x + y \ge 4$ e $x + 3y \ge 6$. Il primo mangime costa $2$ € al kg, il secondo $3$ €. Il costo da rendere minimo è $z = 2x + 3y$.

I vincoli sono del tipo «$\ge$». La regione sta sopra le rette, e verso l'alto non finisce: è **illimitata**. I suoi vertici sono $(0; 4)$, $(3; 1)$ e $(6; 0)$.

~ x + y = 4,\ x + 3y = 6 :: il vertice in mezzo: sottraggo la prima equazione dalla seconda
~ 2y = 2 \Rightarrow y = 1,\ x = 3 :: il punto $(3; 1)$
~ z(0; 4) = 12,\ z(3; 1) = \evidb{9},\ z(6; 0) = 12 :: il costo nei tre vertici

Il costo minimo è $9$ €, con $3$ kg del primo mangime e $1$ kg del secondo.

[[grafico:gIllimitata]]

>! Su una regione illimitata il minimo può esistere e il massimo no. Qui il costo cresce senza limite: più mangime metti, più spendi. Prima di usare i vertici, controlla che la retta di livello non possa scorrere all'infinito.

### Nessuna soluzione

Se i vincoli si contraddicono, la regione è **vuota**. Per esempio, $x + y \le 2$ e $x + y \ge 5$ non valgono mai insieme. Il problema non ha soluzione, e il modello va rivisto.

### Infinite soluzioni ottime

Riprendi il pentagono $OABCD$, con $z = x + y$. Nei vertici vale $0$, $4$, $6$, $6$ e $5$. Il massimo $6$ si raggiunge in due vertici, $B$ e $C$.

Le rette di livello $x + y = k$ sono parallele al lato $BC$, che sta sulla retta $x + y = 6$. Quando la retta lascia la regione, tocca tutto il lato insieme. Ogni punto del lato $BC$ è una soluzione ottima, per esempio $(2; 4)$ o $(2{,}5; 3{,}5)$.

[[grafico:gLatoIntero]]

>* Se le rette di livello sono parallele a un lato della regione, l'ottimo può stare su **tutto il lato**. Il teorema resta vero: l'ottimo si raggiunge anche nei due vertici del lato.

?? Nel pentagono $OABCD$ il lato $AB$ sta sulla retta $x = 4$. Quale funzione obiettivo ha il massimo su tutto il lato $AB$?
[x] $z = 2x$
[ ] $z = 2y$
[ ] $z = x + y$
=> Le rette di livello di $z = 2x$ sono verticali, parallele al lato $AB$. Nella regione $x$ arriva al massimo a $4$: tutto il lato $AB$ dà $z = 8$. Con $z = x + y$ il lato ottimo è $BC$.` },

    { id: 'problema-produzione', titolo: 'Un problema completo: due prodotti', testo: R`Un mobilificio produce ogni settimana $x$ tavoli e $y$ librerie. Ogni tavolo dà un profitto di $40$ €, ogni libreria di $30$ €. Due reparti hanno le ore contate, e il mercato assorbe al massimo $45$ librerie alla settimana.

| | taglio | montaggio |
|---|---|---|
| un tavolo | $2$ ore | $1$ ora |
| una libreria | $1$ ora | $3$ ore |
| ore disponibili | $100$ | $150$ |

### Il modello

~ z = 40x + 30y :: il profitto della settimana, da rendere massimo
~ 2x + y \le 100 :: le ore del taglio
~ x + 3y \le 150 :: le ore del montaggio
~ y \le 45,\quad x \ge 0,\quad y \ge 0 :: il mercato e i vincoli di segno

### La soluzione

[[grafico:gProduzione]]

I vertici della regione sono $(0; 0)$, $(50; 0)$, $(30; 40)$, $(15; 45)$ e $(0; 45)$. Quello in mezzo nasce dai due reparti.

~ 2x + y = 100,\ x + 3y = 150 :: taglio e montaggio usati per intero
~ y = 100 - 2x \Rightarrow x + 300 - 6x = 150 :: sostituisco la $y$ nella seconda
~ x = \evidb{30},\ y = \evidb{40} :: il vertice $(30; 40)$

| vertice | profitto $z$ (€) |
|---|---|
| $(0; 0)$ | $0$ |
| $(50; 0)$ | $2000$ |
| $(30; 40)$ | $2400$ |
| $(15; 45)$ | $1950$ |
| $(0; 45)$ | $1350$ |

Il massimo si raggiunge nel vertice $(30; 40)$: $30$ tavoli e $40$ librerie, con $2400$ € di profitto.

### La verifica

Le soluzioni sono numeri interi, quindi si possono davvero produrre. Il taglio usa $60 + 40 = 100$ ore e il montaggio $30 + 120 = 150$ ore: i due reparti sono pieni. Le librerie sono $40$, sotto il limite di $45$. Il vincolo del mercato non serve all'ottimo: si dice **non attivo**.

>! Produrre solo l'articolo che rende di più non conviene. Con soli tavoli il taglio si riempie a $50$ tavoli, e il profitto è $2000$ €. Mescolando i due prodotti le ore si usano meglio.

> Se il vertice migliore avesse coordinate non intere, bisognerebbe provare i punti interi vicini, dentro la regione. Il più vicino non è sempre il migliore.

?? Il profitto di una libreria scende a $10$ €. Il vertice $(30; 40)$ resta il migliore?
[ ] Sì: il vertice ottimo dipende solo dai vincoli.
[x] No: conviene $(50; 0)$, cioè solo tavoli.
[ ] No: conviene $(0; 45)$, cioè solo librerie.
=> Con $z = 40x + 10y$ il vertice $(50; 0)$ dà $2000$ € e $(30; 40)$ solo $1600$ €. La regione è la stessa, ma le rette di livello hanno un'altra pendenza.` }
  ],

  grafici: {
    /* ---- una variabile ---- */
    gContinuo: {
      tipo: 'piano', x: [-35, 220], y: [-800, 1900], passo: [40, 400], etichette: { x: 'q', y: 'P' }, mirino: false,
      parametri: [{ nome: 'cap', min: 40, max: 180, passo: 10, valore: 150, etichetta: 'capacità produttiva (kg)' }],
      funzioni: [
        { f: '-0.2x^2 + 40x - 720', colore: 4, tratteggio: true, dominio: [0, 190] },
        { f: '-0.2x^2 + 40x - 720', colore: 1, dominio: [0, 'cap'] }
      ],
      elementi: [
        { tipo: 'verticale', x: 'cap', tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['min(100, cap)', '-0.2*min(100, cap)^2 + 40*min(100, cap) - 720'], etichetta: 'massimo', posizione: 'alto', colore: 3 },
        { tipo: 'testo', p: [22, 1780], testo: 'massimo: q = {{min(100, cap)}} kg, P = {{-0.2*min(100, cap)^2 + 40*min(100, cap) - 720}} €', ancora: 'start' }
      ],
      didascalia: 'Il profitto del cioccolato, P(q) = −0,2q² + 40q − 720. Il tratto continuo è il campo di scelta, da 0 alla capacità produttiva (linea arancio). Con una capacità di almeno 100 kg il massimo è il vertice, 1280 €. Con una capacità più bassa il vertice resta fuori, e il massimo sta all\'estremo destro.'
    },
    gDiscreto: {
      tipo: 'piano', x: [-1.5, 13.5], y: [-20, 60], passo: [2, 10], etichette: { x: 'q', y: 'P' }, mirino: false,
      funzioni: [{ f: '-2x^2 + 25x - 30', colore: 4, tratteggio: true, dominio: [0.5, 12] }],
      punti: INFORNATE.concat([{ x: 6.25, y: 48.125, vuoto: true, colore: 2, etichetta: 'V', posizione: 'alto-destra' }]),
      didascalia: 'Il profitto delle infornate, P(q) = −2q² + 25q − 30. Hanno senso solo i punti con q intero (blu). Il vertice V, a q = 6,25, non è raggiungibile. Fra i punti interi il più alto è (6; 48), quello più vicino al vertice.'
    },
    gAlternative: {
      tipo: 'piano', x: [-45, 380], y: [0, 250], passo: [50, 50], etichette: { x: 'km', y: 'euro' }, mirino: false,
      funzioni: [
        { f: '60 + 0.4x', colore: 1 },
        { f: '20 + 0.6x', colore: 2 },
        { f: '150', colore: 4 }
      ],
      elementi: [
        { tipo: 'area', f: 'min(60 + 0.4x, 20 + 0.6x, 150)', g: '0', da: 0, a: 350, colore: 3 },
        { tipo: 'punto', p: [200, 140], etichetta: '(200; 140)', posizione: 'basso-destra', colore: 3 },
        { tipo: 'punto', p: [225, 150], etichetta: '(225; 150)', posizione: 'alto-destra', colore: 3 },
        { tipo: 'testo', p: [8, 74], testo: 'A', ancora: 'start' },
        { tipo: 'testo', p: [8, 34], testo: 'B', ancora: 'start' },
        { tipo: 'testo', p: [8, 162], testo: 'C', ancora: 'start' },
        { tipo: 'testo', p: [100, 30], testo: 'conviene B' },
        { tipo: 'testo', p: [300, 30], testo: 'conviene C' }
      ],
      didascalia: 'Il costo del furgone con le tariffe A (blu), B (arancio) e C (viola), al variare dei km. La zona verde arriva fino alla linea più bassa, cioè al costo della tariffa migliore. B vince fino a 200 km, A da 200 a 225 km, C oltre i 225 km.'
    },

    /* ---- le scorte ---- */
    gDenteSega: {
      tipo: 'piano', x: [-0.9, 13.5], y: [0, 500], passo: [2, 100], etichette: { x: 'mesi', y: 'pezzi' }, mirino: false,
      parametri: [{ nome: 'qq', min: 100, max: 400, passo: 100, valore: 200, etichetta: 'pezzi per ordine' }],
      funzioni: [{ f: 'qq - 100*(x - (qq/100)*floor(x/(qq/100)))', colore: 1, dominio: [0, 12] }],
      elementi: [
        { tipo: 'orizzontale', y: 'qq/2', tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [1.2, 465], testo: "ordini all'anno: {{1200/qq}}   scorta media: {{qq/2}}", ancora: 'start' }
      ],
      didascalia: 'La scorta del negozio durante l\'anno, con 1200 pezzi venduti, cioè 100 al mese. A ogni ordine la scorta sale di q pezzi, poi scende fino a zero. La linea arancio è la scorta media, q/2. Con ordini più grandi gli ordini sono meno, ma la scorta media cresce.'
    },
    gScorte: {
      tipo: 'piano', x: [-90, 540], y: [0, 1400], passo: [100, 200], etichette: { x: 'q', y: 'euro' }, mirino: false,
      parametri: [{ nome: 'qq', min: 50, max: 500, passo: 10, valore: 100, nascosto: true }],
      funzioni: [
        { f: '60000/x', colore: 1, dominio: [43, 500] },
        { f: '1.5x', colore: 2, dominio: [0, 500] },
        { f: '60000/x + 1.5x', colore: 3, dominio: [50, 500] }
      ],
      elementi: [
        { tipo: 'segmento', da: [200, 0], a: [200, 600], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [200, 300], colore: 4 },
        { tipo: 'punto', p: [200, 600], etichetta: 'minimo (200; 600)', posizione: 'basso-destra', colore: 3 },
        { tipo: 'punto', p: ['qq', '60000/qq + 1.5*qq'], trascina: true, etichetta: 'Q', posizione: 'alto-destra', colore: 3 },
        { tipo: 'testo', p: [480, 160], testo: 'ordinazioni', ancora: 'end' },
        { tipo: 'testo', p: [470, 640], testo: 'magazzino', ancora: 'end' },
        { tipo: 'testo', p: [470, 960], testo: 'totale', ancora: 'end' },
        { tipo: 'testo', p: [70, 1330], testo: 'q = {{qq}}:  {{60000/qq}} € + {{1.5*qq}} € = {{60000/qq + 1.5*qq}} €', ancora: 'start' }
      ],
      didascalia: 'Il costo delle ordinazioni 50 · 1200/q (blu) scende, quello di magazzino 3 · q/2 (arancio) sale. Il totale (verde) è la loro somma. Il punto Q scorre sul totale e mostra i due costi. Il minimo, 600 €, sta a q = 200, proprio sopra l\'incrocio delle due curve.'
    },

    /* ---- programmazione lineare ---- */
    gRegione: conPiano(PIANO_PL, {
      parametri: [
        { nome: 'qx', min: 0, max: 6.5, passo: 0.5, valore: 2.5, nascosto: true },
        { nome: 'qy', min: 0, max: 6.5, passo: 0.5, valore: 2, nascosto: true }
      ],
      elementi: [REGIONE].concat(BORDI, VERTICI, [
        { tipo: 'testo', p: [7, 1.3], testo: 'x + y = 6', ancora: 'end' },
        { tipo: 'testo', p: [4.15, 3.6], testo: 'x = 4', ancora: 'start' },
        { tipo: 'testo', p: [6.9, 5.3], testo: 'y = 5', ancora: 'end' },
        { tipo: 'punto', p: ['qx', 'qy'], trascina: true, etichetta: 'Q', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [0.3, 6.6], testo: 'Q: x + y = {{qx + qy}}', ancora: 'start' }
      ]),
      didascalia: 'La regione ammissibile (verde) dei vincoli x ≥ 0, y ≥ 0, x + y ≤ 6, x ≤ 4, y ≤ 5: un pentagono con vertici O, A, B, C, D. Il punto Q è ammissibile quando sta nella zona verde: x + y non supera 6, x non supera 4 e y non supera 5.'
    }),
    gLivello: conPiano(PIANO_PL, {
      parametri: [{ nome: 'k', min: 0, max: 20, passo: 1, valore: 6, etichetta: 'valore di k' }],
      funzioni: [{ f: '(k - 3x)/2', colore: 2 }],
      elementi: [REGIONE].concat(VERTICI, [
        { tipo: 'testo', p: [1.2, 6.6], testo: 'retta 3x + 2y = {{k}}', ancora: 'start' }
      ]),
      didascalia: 'Le rette di livello 3x + 2y = k (arancio) sono tutte parallele. Più k cresce, più la retta si allontana dall\'origine. Con k = 16 tocca la regione solo nel vertice B(4; 2); con k più grande non la tocca più. Il massimo di z = 3x + 2y è 16.'
    }),
    gLatoIntero: conPiano(PIANO_PL, {
      funzioni: [
        { f: '2 - x', colore: 2, tratteggio: true, dominio: [-0.5, 2.5] },
        { f: '4 - x', colore: 2, tratteggio: true, dominio: [-0.5, 4.5] }
      ],
      elementi: [REGIONE].concat(VERTICI, [
        { tipo: 'retta', per: [[0, 6], [6, 0]], colore: 2, tratteggio: true },
        { tipo: 'segmento', da: [4, 2], a: [1, 5], colore: 2 },
        { tipo: 'testo', p: [3.4, 4.4], testo: 'z = 6' },
        { tipo: 'testo', p: [2.6, 0.9], testo: 'z = 4' },
        { tipo: 'testo', p: [1.3, 0.25], testo: 'z = 2' }
      ]),
      didascalia: 'Le rette di livello di z = x + y (arancio) sono parallele al lato BC. La retta z = 6 lascia la regione toccando tutto il lato: ogni punto di BC è una soluzione ottima, con z = 6.'
    }),
    gIllimitata: {
      tipo: 'piano', x: [-0.5, 8], y: [-0.5, 7], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      parametri: [{ nome: 'k', min: 0, max: 24, passo: 1, valore: 15, etichetta: 'valore di k' }],
      funzioni: [{ f: '(k - 2x)/3', colore: 2 }],
      elementi: [
        { tipo: 'area', f: '7', g: 'max(4 - x, (6 - x)/3, 0)', da: 0, a: 8, colore: 3 },
        { tipo: 'retta', per: [[0, 4], [4, 0]], colore: 4 },
        { tipo: 'retta', per: [[0, 2], [6, 0]], colore: 4 },
        { tipo: 'punto', p: [0, 4], etichetta: '(0; 4)', posizione: 'alto-destra', colore: 3 },
        { tipo: 'punto', p: [3, 1], etichetta: '(3; 1)', posizione: 'basso-sinistra', colore: 3 },
        { tipo: 'punto', p: [6, 0], etichetta: '(6; 0)', posizione: 'alto', colore: 3 },
        { tipo: 'testo', p: [3.2, 6.6], testo: 'retta 2x + 3y = {{k}}', ancora: 'start' }
      ],
      didascalia: 'La regione dei mangimi (verde) è illimitata: sta sopra le rette x + y = 4, la più ripida, e x + 3y = 6, e non finisce. Le rette di costo 2x + 3y = k (arancio) sono parallele. Scendendo, l\'ultimo punto della regione che toccano è (3; 1), con k = 9: il costo minimo. Salendo, toccano la regione per ogni k: il massimo non c\'è.'
    },
    gProduzione: {
      tipo: 'piano', x: [-4, 66], y: [-2, 62], passo: [10, 10], proporzioni: 'uguali', mirino: false,
      funzioni: [{ f: '80 - 4x/3', colore: 2, tratteggio: true, dominio: [15, 60] }],
      elementi: [
        { tipo: 'area', f: 'min(45, (150 - x)/3, 100 - 2x)', g: '0', da: 0, a: 50, colore: 3 },
        { tipo: 'retta', per: [[0, 100], [50, 0]], colore: 4 },
        { tipo: 'retta', per: [[0, 50], [150, 0]], colore: 4 },
        { tipo: 'orizzontale', y: 45, colore: 4 },
        { tipo: 'punto', p: [0, 0], colore: 3 },
        { tipo: 'punto', p: [50, 0], etichetta: '(50; 0)', posizione: 'alto-destra', colore: 3 },
        { tipo: 'punto', p: [30, 40], etichetta: 'M(30; 40)', posizione: 'destra', colore: 2 },
        { tipo: 'punto', p: [15, 45], etichetta: '(15; 45)', posizione: 'alto', colore: 3 },
        { tipo: 'punto', p: [0, 45], colore: 3 },
        { tipo: 'testo', p: [50, 14], testo: 'taglio', ancora: 'start' },
        { tipo: 'testo', p: [58, 33], testo: 'montaggio', ancora: 'end' },
        { tipo: 'testo', p: [59, 47], testo: 'mercato', ancora: 'end' },
        { tipo: 'testo', p: [12, 22], testo: 'ammissibili' },
        { tipo: 'testo', p: [58, 6], testo: 'z = 2400', ancora: 'end' }
      ],
      didascalia: 'La regione del mobilificio (verde): sotto le rette del taglio 2x + y = 100, del montaggio x + 3y = 150 e del mercato y = 45. La retta tratteggiata è 40x + 30y = 2400: tocca la regione solo nel vertice M(30; 40), dove il profitto è massimo.'
    }
  },

  esempi: [
    { titolo: 'Il profitto massimo con un limite di capacità', problema: R`Un'azienda vende un articolo a $30$ € al pezzo. Il costo di $q$ pezzi al mese è $C(q) = 0{,}05q^2 + 6q + 1200$ euro. Può produrre al massimo $300$ pezzi al mese. Quanti pezzi conviene produrre? E se la capacità scende a $200$ pezzi?`, passi: [
      R`La variabile d'azione è $q$, i pezzi al mese. Il campo di scelta è $0 \le q \le 300$.`,
      R`Il profitto è ricavo meno costo: $P(q) = 30q - (0{,}05q^2 + 6q + 1200) = -0{,}05q^2 + 24q - 1200$. È una parabola rivolta verso il basso.`,
      R`L'ascissa del vertice è $q_V = -\frac{24}{2 \cdot (-0{,}05)} = 240$. Sta fra $0$ e $300$, quindi rispetta il vincolo.`,
      R`Il profitto massimo è $P(240) = -0{,}05 \cdot 57\,600 + 24 \cdot 240 - 1200 = -2880 + 5760 - 1200 = 1680$ €.`,
      R`Con la capacità di $200$ pezzi il vertice resta fuori. Fino a $200$ la parabola sale, quindi il massimo è all'estremo: $P(200) = -2000 + 4800 - 1200 = 1600$ €.`
    ], risultato: R`$240$ pezzi, con $1680$ € di profitto; con la capacità di $200$ pezzi, $200$ pezzi e $1600$ €` },

    { titolo: 'Due contratti e il punto di indifferenza', problema: R`Due contratti per la luce. Il primo costa $12$ € al mese più $0{,}25$ € per kWh. Il secondo costa $0{,}31$ € per kWh, senza quota fissa. Trova il punto di indifferenza. Quale contratto conviene a una famiglia che consuma $270$ kWh al mese?`, passi: [
      R`Con $x$ kWh al mese i costi sono $y_1 = 12 + 0{,}25x$ e $y_2 = 0{,}31x$: due rette.`,
      R`Il punto di indifferenza è dove costano uguale: $12 + 0{,}25x = 0{,}31x$, cioè $0{,}06x = 12$ e $x = 200$ kWh. Lì si spendono $62$ € con tutti e due.`,
      R`Il secondo contratto parte da zero ma sale più in fretta. Sotto i $200$ kWh conviene il secondo, sopra conviene il primo.`,
      R`Con $270$ kWh il primo costa $12 + 67{,}50 = 79{,}50$ € e il secondo $83{,}70$ €. La famiglia risparmia $4{,}20$ € al mese con il primo.`
    ], risultato: R`Indifferenza a $200$ kWh; con $270$ kWh conviene il primo contratto ($79{,}50$ € contro $83{,}70$ €)` },

    { titolo: 'Il lotto economico di una ferramenta', problema: R`Una ferramenta vende $2400$ confezioni di viti all'anno, a ritmo costante. Ogni ordine al fornitore costa $60$ €. Tenere una confezione in magazzino per un anno costa $0{,}80$ €. Quante confezioni conviene ordinare ogni volta? Quanto costa in un anno la gestione delle scorte?`, passi: [
      R`I dati sono $D = 2400$, $c_o = 60$ € e $c_g = 0{,}80$ €. Valgono le ipotesi del modello: domanda costante, nessuna rottura di stock.`,
      R`Il lotto economico è $q^* = \sqrt{\frac{2 \cdot 60 \cdot 2400}{0{,}80}} = \sqrt{360\,000} = 600$ confezioni.`,
      R`Si fanno $\frac{2400}{600} = 4$ ordini all'anno, uno ogni tre mesi.`,
      R`Le ordinazioni costano $4 \cdot 60 = 240$ €. In magazzino ci sono in media $300$ confezioni: $300 \cdot 0{,}80 = 240$ €. I due costi sono uguali, come deve essere nel minimo.`,
      R`Controprova: con $400$ confezioni a ordine si spende $360 + 160 = 520$ €, con $900$ si spende $160 + 360 = 520$ €. Tutti e due più di $480$ €.`
    ], risultato: R`$600$ confezioni per ordine, $4$ ordini all'anno, $480$ € di costo annuo` },

    { titolo: 'Programmazione lineare: il massimo col metodo grafico', problema: R`Trova il massimo di $z = 4x + 5y$ con i vincoli $x \ge 0$, $y \ge 0$, $x + y \le 8$, $x + 3y \le 18$.`, passi: [
      R`Disegna le rette $x + y = 8$, per $(8; 0)$ e $(0; 8)$, e $x + 3y = 18$, per $(18; 0)$ e $(0; 6)$. L'origine rispetta tutti e due i vincoli: la regione sta sotto le due rette, nel primo quadrante.`,
      R`Sull'asse $y$ comanda la seconda retta, che arriva più in basso: vertice $(0; 6)$. Sull'asse $x$ comanda la prima: vertice $(8; 0)$.`,
      R`Il vertice in mezzo è l'incrocio delle due rette. Sottraendo $x + y = 8$ da $x + 3y = 18$ ottieni $2y = 10$, quindi $y = 5$ e $x = 3$.`,
      R`Calcola $z$ nei vertici: $z(0; 0) = 0$, $z(8; 0) = 32$, $z(3; 5) = 12 + 25 = 37$, $z(0; 6) = 30$.`,
      R`Il massimo si raggiunge nel vertice $(3; 5)$. Le rette di livello $4x + 5y = k$ hanno pendenza $-\frac{4}{5}$, fra le pendenze dei due lati: per questo escono proprio da quel vertice.`
    ], risultato: R`$z_{\max} = 37$ nel vertice $(3; 5)$` },

    { titolo: 'Il costo minimo su una regione illimitata', problema: R`Un dietista combina due integratori. Una confezione del primo dà $3$ unità di vitamine e $1$ di minerali; una del secondo $1$ unità di vitamine e $2$ di minerali. Servono almeno $9$ unità di vitamine e $8$ di minerali. Il primo costa $4$ € a confezione, il secondo $3$ €. Come si spende il meno possibile?`, passi: [
      R`Le variabili: $x$ confezioni del primo integratore e $y$ del secondo, non negative. Il costo da rendere minimo è $z = 4x + 3y$.`,
      R`I vincoli: $3x + y \ge 9$ per le vitamine e $x + 2y \ge 8$ per i minerali. Sono «$\ge$»: la regione sta sopra le due rette ed è illimitata.`,
      R`I vertici sono $(0; 9)$, $(8; 0)$ e l'incrocio delle due rette. Da $y = 9 - 3x$ ottieni $x + 18 - 6x = 8$, cioè $x = 2$ e $y = 3$.`,
      R`Il costo nei vertici: $z(0; 9) = 27$, $z(2; 3) = 8 + 9 = 17$, $z(8; 0) = 32$ €.`,
      R`Il minimo esiste: i coefficienti di $z$ sono positivi, e la retta di costo che scende lascia la regione in $(2; 3)$. Il massimo invece non c'è.`
    ], risultato: R`$2$ confezioni del primo e $3$ del secondo, con il costo minimo di $17$ €` }
  ],

  formulario: [
    { nome: 'Profitto', formula: R`P(q) = R(q) - C(q)`, nota: R`Ricavo meno costo. Il punto di pareggio è dove $P(q) = 0$.` },
    { nome: 'Vertice della parabola', formula: R`q_V = -\frac{b}{2a}`, nota: R`Per $P(q) = aq^2 + bq + c$. È l'ottimo solo se sta nel campo di scelta; altrimenti l'ottimo è l'estremo più vicino.` },
    { nome: 'Punto di indifferenza', formula: R`a_1 + b_1 x = a_2 + b_2 x \quad\Rightarrow\quad x = \frac{a_1 - a_2}{b_2 - b_1}`, nota: R`$a$ è la quota fissa, $b$ il costo per unità. Prima del punto conviene l'alternativa con $b$ più grande, dopo quella con $b$ più piccolo.` },
    { nome: 'Costo annuo delle scorte', formula: R`C(q) = c_o\,\frac{D}{q} + c_g\,\frac{q}{2}`, nota: R`$D$ domanda annua, $c_o$ costo di un'ordinazione, $c_g$ costo annuo di magazzino di un pezzo, $q$ pezzi per ordine.` },
    { nome: 'Lotto economico', formula: R`q^* = \sqrt{\frac{2\,c_o D}{c_g}}`, nota: R`In questo modello: domanda costante, nessuna rottura di stock, prezzo d'acquisto fisso. Detta anche formula di Wilson.` },
    { nome: 'Costo minimo delle scorte', formula: R`C(q^*) = \sqrt{2\,c_o\,c_g D}`, nota: R`Nel lotto economico il costo delle ordinazioni e quello di magazzino sono uguali.` },
    { nome: 'Ordini e scorta media', formula: R`n = \frac{D}{q} \qquad T = \frac{q}{D} \qquad \text{scorta media} = \frac{q}{2}`, nota: R`$n$ ordini all'anno, uno ogni $T$ anni. Per avere $T$ in mesi, moltiplica per $12$.` },
    { nome: 'Funzione obiettivo lineare', formula: R`z = ax + by`, nota: R`Da rendere massima o minima sulla regione ammissibile.` },
    { nome: 'Retta di livello', formula: R`ax + by = k \qquad m = -\frac{a}{b}`, nota: R`Per ogni $k$ una retta: sono tutte parallele. Con $a$ e $b$ positivi, $k$ cresce allontanandosi dall'origine.` },
    { nome: 'Teorema fondamentale della programmazione lineare', formula: R`z_{\max} = \max\{z(V_1),\, z(V_2),\, \dots,\, z(V_n)\}`, nota: R`Se il massimo esiste, si raggiunge in un vertice $V_i$ della regione ammissibile. Lo stesso vale per il minimo.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'ricerca-operativa', tipo: 'definizione', fronte: R`Che cos'è la ricerca operativa?`, retro: R`La parte della matematica che cerca la decisione migliore quando le risorse sono limitate.` },
    { id: 'fc-02', sezione: 'ricerca-operativa', tipo: 'definizione', fronte: R`Quali sono i tre ingredienti di un problema di scelta?`, retro: R`Le variabili d'azione (che cosa decidi), i vincoli (i limiti) e la funzione obiettivo (da rendere massima o minima).` },
    { id: 'fc-03', sezione: 'ricerca-operativa', tipo: 'procedura', fronte: R`Le quattro fasi della ricerca operativa`, retro: R`Il problema, il modello, la soluzione, la verifica. Se la verifica va male, si torna a correggere il modello.` },
    { id: 'fc-04', sezione: 'ricerca-operativa', tipo: 'concetto', fronte: R`Problemi in condizioni di certezza e di incertezza`, retro: R`In condizioni di certezza tutti i dati sono noti. In condizioni di incertezza qualche dato dipende dal caso.` },
    { id: 'fc-05', sezione: 'caso-continuo', tipo: 'concetto', fronte: R`Dove sta l'ottimo di una funzione obiettivo lineare su un intervallo?`, retro: R`A un estremo dell'intervallo: a destra se la retta sale, a sinistra se scende.` },
    { id: 'fc-06', sezione: 'caso-continuo', tipo: 'concetto', fronte: R`Il profitto è una parabola rivolta verso il basso. Dove sta il massimo?`, retro: R`Nel vertice, $q_V = -\frac{b}{2a}$, se il vertice sta nel campo di scelta. Altrimenti nell'estremo più vicino al vertice.` },
    { id: 'fc-07', sezione: 'caso-continuo', tipo: 'definizione', fronte: R`Che cos'è il campo di scelta?`, retro: R`L'insieme dei valori della variabile d'azione che rispettano tutti i vincoli.` },
    { id: 'fc-08', sezione: 'caso-discreto', tipo: 'procedura', fronte: R`Caso discreto con una parabola: come si trova l'ottimo?`, retro: R`Si calcola il vertice. Se non è intero, si calcola la funzione nei due interi vicini e si sceglie il migliore.` },
    { id: 'fc-09', sezione: 'caso-discreto', tipo: 'concetto', fronte: R`Quando la variabile d'azione è discreta?`, retro: R`Quando prende solo valori isolati, di solito interi: pezzi, infornate, persone, mezzi.` },
    { id: 'fc-10', sezione: 'alternative', tipo: 'definizione', fronte: R`Che cos'è il punto di indifferenza?`, retro: R`Il valore della variabile per cui due alternative costano uguale. Nel grafico è l'incrocio delle due rette di costo.` },
    { id: 'fc-11', sezione: 'alternative', tipo: 'procedura', fronte: R`Come si sceglie fra tre o più alternative con costi lineari?`, retro: R`Si disegnano tutte le rette di costo e si segue la linea più bassa, tratto per tratto. I punti di indifferenza utili sono i suoi spigoli.` },
    { id: 'fc-12', sezione: 'scorte', tipo: 'concetto', fronte: R`Le ipotesi del modello del lotto economico`, retro: R`Domanda costante e nota, nessuna rottura di stock, costo fisso per ogni ordine, prezzo d'acquisto che non dipende dalla quantità.` },
    { id: 'fc-13', sezione: 'scorte', tipo: 'formula', fronte: R`Costo annuo di gestione delle scorte`, retro: R`$C(q) = c_o \frac{D}{q} + c_g \frac{q}{2}$: costo delle ordinazioni più costo di magazzino.` },
    { id: 'fc-14', sezione: 'scorte', tipo: 'formula', fronte: R`Formula del lotto economico`, retro: R`$q^* = \sqrt{\frac{2\,c_o D}{c_g}}$, con $D$ domanda annua, $c_o$ costo di un ordine, $c_g$ costo annuo di magazzino di un pezzo.` },
    { id: 'fc-15', sezione: 'scorte', tipo: 'concetto', fronte: R`Che cosa succede ai due costi nel lotto economico?`, retro: R`Il costo delle ordinazioni è uguale al costo di magazzino. Il costo totale è il doppio di ciascuno.` },
    { id: 'fc-16', sezione: 'scorte', tipo: 'concetto', fronte: R`Perché la scorta media è $\frac{q}{2}$?`, retro: R`La scorta parte da $q$ e scende a ritmo costante fino a zero: in media vale la metà.` },
    { id: 'fc-17', sezione: 'pl-modello', tipo: 'definizione', fronte: R`Che cos'è la regione ammissibile?`, retro: R`L'insieme dei punti che rispettano tutti i vincoli: l'intersezione dei semipiani. Se è limitata, è un poligono convesso.` },
    { id: 'fc-18', sezione: 'pl-modello', tipo: 'procedura', fronte: R`Come si trovano i vertici della regione ammissibile?`, retro: R`Con il sistema fra le rette di bordo che si incontrano. Ogni incrocio va controllato in tutti i vincoli.` },
    { id: 'fc-19', sezione: 'pl-modello', tipo: 'definizione', fronte: R`Che cosa sono i vincoli di segno?`, retro: R`$x \ge 0$ e $y \ge 0$: le quantità prodotte o comprate non possono essere negative.` },
    { id: 'fc-20', sezione: 'metodo-grafico', tipo: 'definizione', fronte: R`Che cos'è una retta di livello?`, retro: R`L'insieme dei punti dove la funzione obiettivo ha lo stesso valore $k$: la retta $ax + by = k$. Le rette di livello sono parallele.` },
    { id: 'fc-21', sezione: 'metodo-grafico', tipo: 'concetto', fronte: R`Teorema fondamentale della programmazione lineare`, retro: R`Se la funzione obiettivo ha un massimo (o un minimo) sulla regione ammissibile, lo raggiunge in un vertice.` },
    { id: 'fc-22', sezione: 'metodo-grafico', tipo: 'procedura', fronte: R`Il metodo grafico in quattro passi`, retro: R`Scrivi il modello, disegna la regione, trova i vertici, calcola $z$ nei vertici e scegli il migliore.` },
    { id: 'fc-23', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando un problema di programmazione lineare ha infinite soluzioni ottime?`, retro: R`Quando le rette di livello sono parallele a un lato e l'ottimo sta su quel lato: ogni punto del lato è ottimo.` },
    { id: 'fc-24', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Regione illimitata: il massimo e il minimo esistono?`, retro: R`Non sempre. Uno dei due può mancare, perché la retta di livello scorre all'infinito restando nella regione.` },
    { id: 'fc-25', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando un problema di programmazione lineare non ha soluzione?`, retro: R`Quando la regione ammissibile è vuota (vincoli contraddittori), oppure quando l'ottimo cercato non esiste su una regione illimitata.` },
    { id: 'fc-26', sezione: 'problema-produzione', tipo: 'definizione', fronte: R`Che cos'è un vincolo non attivo?`, retro: R`Un vincolo rispettato con il segno «$<$» nella soluzione ottima: la risorsa non è usata tutta, e il vincolo non decide l'ottimo.` }
  ],

  esercizi: [
    /* ---- allenamento ---- */
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Nella ricerca operativa, come si chiama la fase in cui i dati diventano una funzione obiettivo e dei vincoli?`, suggerimenti: [R`Le fasi sono quattro: problema, ..., soluzione, verifica.`], risposta: parola(['modello', 'il modello', 'costruzione del modello', 'la costruzione del modello', 'formulazione del modello', 'la formulazione del modello', 'fase del modello', 'la fase del modello', 'modellizzazione'], 'una parola'), soluzione: [R`È la fase del **modello**: si traducono i dati in formule, cioè la funzione obiettivo e i vincoli.`, R`Viene dopo il problema e prima della soluzione.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Il profitto mensile di un artigiano è $P(q) = 15q - 600$ euro, con $0 \le q \le 120$. Qual è il profitto massimo?`, suggerimenti: [R`È una retta che sale: il massimo sta a un estremo.`], risposta: euro(1200), soluzione: [R`Il coefficiente di $q$ è positivo, quindi il massimo è all'estremo destro, $q = 120$.`, R`$P(120) = 1800 - 600 = 1200$ €.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Il profitto mensile di un artigiano è $P(q) = 15q - 600$ euro. Qual è il numero minimo di pezzi da vendere per non andare in perdita?`, suggerimenti: [R`Cerca il punto di pareggio: $P(q) = 0$.`], risposta: pezzi(40), soluzione: [R`$15q - 600 = 0$ dà $q = 40$.`, R`Con almeno $40$ pezzi l'artigiano non perde.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Il profitto è $P(q) = -q^2 + 60q - 500$ euro, con $0 \le q \le 50$. Quanti pezzi danno il profitto massimo?`, suggerimenti: [R`La parabola è rivolta verso il basso: cerca il vertice.`, R`$q_V = -\frac{b}{2a}$. Controlla che stia fra $0$ e $50$.`], risposta: pezzi(30), soluzione: [R`$q_V = -\frac{60}{2 \cdot (-1)} = 30$.`, R`$30$ sta fra $0$ e $50$, quindi il massimo è nel vertice.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Il profitto è $P(q) = -0{,}5q^2 + 30q - 200$ euro, con $0 \le q \le 80$. Qual è il profitto massimo?`, suggerimenti: [R`Trova prima il vertice, poi calcola $P$ lì.`], risposta: euro(250), soluzione: [R`$q_V = -\frac{30}{2 \cdot (-0{,}5)} = 30$, dentro il campo di scelta.`, R`$P(30) = -450 + 900 - 200 = 250$ €.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Il profitto è $P(q) = -0{,}5q^2 + 50q - 300$ euro. L'azienda può produrre al massimo $40$ pezzi. Quanti pezzi conviene produrre?`, suggerimenti: [R`Dove sta il vertice? È raggiungibile?`], risposta: pezzi(40), soluzione: [R`$q_V = -\frac{50}{2 \cdot (-0{,}5)} = 50$: oltre la capacità.`, R`Fino a $50$ la parabola sale, quindi il massimo è all'estremo: $40$ pezzi, con $P(40) = 900$ €.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Il costo di un servizio è $C(x) = x^2 - 40x + 600$ euro, con $0 \le x \le 30$. Qual è il costo minimo?`, suggerimenti: [R`La parabola è rivolta verso l'alto: il minimo è nel vertice, se è raggiungibile.`], risposta: euro(200), soluzione: [R`$x_V = \frac{40}{2} = 20$, che sta fra $0$ e $30$.`, R`$C(20) = 400 - 800 + 600 = 200$ €.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Il profitto è $P(q) = -2q^2 + 27q - 50$ euro, e $q$ deve essere intero. Quale valore di $q$ dà il profitto massimo?`, suggerimenti: [R`Il vertice non è intero: prova i due interi vicini.`], risposta: pezzi(7, 'un numero intero'), soluzione: [R`$q_V = \frac{27}{4} = 6{,}75$.`, R`$P(6) = -72 + 162 - 50 = 40$ e $P(7) = -98 + 189 - 50 = 41$. Conviene $q = 7$, l'intero più vicino al vertice.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Il profitto è $P(q) = -q^2 + 11q$ euro, con $q$ intero. Qual è il profitto massimo?`, suggerimenti: [R`Il vertice è a metà fra due interi.`], risposta: euro(30), soluzione: [R`$q_V = 5{,}5$: i due interi vicini sono alla stessa distanza.`, R`$P(5) = -25 + 55 = 30$ e $P(6) = -36 + 66 = 30$. Il massimo è $30$ €, con $5$ o con $6$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Due tariffe: A costa $30$ € più $0{,}50$ € per unità, B costa $10$ € più $0{,}90$ € per unità. Per quante unità le due tariffe costano uguale?`, suggerimenti: [R`Uguaglia i due costi.`], risposta: pezzi(50, 'numero di unità'), soluzione: [R`$30 + 0{,}5x = 10 + 0{,}9x$, cioè $20 = 0{,}4x$.`, R`$x = 50$ unità: è il punto di indifferenza.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Due tariffe: A costa $30$ € più $0{,}50$ € per unità, B costa $10$ € più $0{,}90$ € per unità. Ti servono $80$ unità. Quanto spendi con la tariffa più conveniente?`, suggerimenti: [R`Calcola tutte e due le spese.`], risposta: euro(70), soluzione: [R`A: $30 + 40 = 70$ €. B: $10 + 72 = 82$ €.`, R`Conviene A, con $70$ €: $80$ unità sono oltre il punto di indifferenza.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Un negozio riordina $500$ pezzi alla volta, quando il magazzino è vuoto. Le vendite sono costanti. Quanti pezzi ci sono in media in magazzino?`, suggerimenti: [R`La scorta scende da $500$ a zero a ritmo costante.`], risposta: pezzi(250), soluzione: [R`La scorta media è $\frac{q}{2} = \frac{500}{2}$.`, R`In media ci sono $250$ pezzi.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Un'azienda usa $1800$ pezzi all'anno, a ritmo costante. Ogni ordine costa $25$ €, e tenere un pezzo in magazzino per un anno costa $1$ €. Calcola il lotto economico.`, suggerimenti: [R`$q^* = \sqrt{\frac{2\,c_o D}{c_g}}$.`], risposta: pezzi(300), soluzione: [R`$q^* = \sqrt{\frac{2 \cdot 25 \cdot 1800}{1}} = \sqrt{90\,000}$.`, R`$q^* = 300$ pezzi.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Un negozio vende $2400$ pezzi all'anno e li ordina $300$ alla volta. Quanti ordini fa in un anno?`, suggerimenti: [R`Dividi la domanda annua per i pezzi di ogni ordine.`], risposta: pezzi(8, 'numero di ordini'), soluzione: [R`$\frac{D}{q} = \frac{2400}{300} = 8$ ordini.`, R`Uno ogni mese e mezzo.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Domanda annua $1800$ pezzi, costo di un ordine $25$ €, costo annuo di magazzino $1$ € a pezzo. Con il lotto economico di $300$ pezzi, quanto costa in un anno la gestione delle scorte?`, suggerimenti: [R`Calcola il costo delle ordinazioni e quello di magazzino, poi sommali.`], risposta: euro(300), soluzione: [R`Ordini: $\frac{1800}{300} = 6$, quindi $6 \cdot 25 = 150$ €. Magazzino: $1 \cdot \frac{300}{2} = 150$ €.`, R`Totale $300$ €. I due costi sono uguali, come deve essere nel lotto economico.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Un vertice della regione ammissibile è l'incrocio delle rette $x + y = 10$ e $x + 3y = 18$. Trova le sue coordinate.`, suggerimenti: [R`Risolvi il sistema: sottrai la prima equazione dalla seconda.`], risposta: lista([6, 4], 'x; y'), soluzione: [R`Sottraendo: $2y = 8$, quindi $y = 4$.`, R`Poi $x = 10 - 4 = 6$: il vertice è $(6; 4)$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Trova il massimo di $z = 3x + 2y$ con i vincoli $x \ge 0$, $y \ge 0$, $2x + y \le 12$, $x + y \le 8$.`, suggerimenti: [R`I vertici sono quattro: l'origine, due sugli assi e l'incrocio delle due rette.`, R`L'incrocio: sottrai $x + y = 8$ da $2x + y = 12$.`], risposta: numero(20), soluzione: [R`I vertici sono $(0; 0)$, $(6; 0)$, $(4; 4)$ e $(0; 8)$.`, R`$z$ vale $0$, $18$, $20$ e $16$. Il massimo è $20$, nel vertice $(4; 4)$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`La regione ammissibile ha i vertici $(0; 0)$, $(8; 0)$, $(6; 4)$ e $(0; 6)$. Qual è il massimo di $z = 2x + 5y$?`, suggerimenti: [R`Calcola $z$ in ogni vertice.`], risposta: numero(32), soluzione: [R`$z$ vale $0$, $16$, $12 + 20 = 32$ e $30$.`, R`Il massimo è $32$, nel vertice $(6; 4)$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Una regione ammissibile illimitata ha i vertici $(0; 6)$, $(2; 2)$ e $(5; 0)$. Il costo minimo esiste. Quanto vale il minimo di $z = 4x + 3y$?`, suggerimenti: [R`Il minimo sta in un vertice.`], risposta: numero(14), soluzione: [R`$z(0; 6) = 18$, $z(2; 2) = 8 + 6 = 14$, $z(5; 0) = 20$.`, R`Il minimo è $14$, nel vertice $(2; 2)$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Qual è la pendenza delle rette di livello di $z = 2x + 3y$?`, suggerimenti: [R`Ricava $y$ da $2x + 3y = k$.`], risposta: numero(-2 / 3, 0.011, 'es. −1/2'), soluzione: [R`$3y = k - 2x$, cioè $y = -\frac{2}{3}x + \frac{k}{3}$.`, R`La pendenza è $m = -\frac{2}{3}$, uguale per ogni $k$: le rette sono parallele.`] },

    /* ---- esercizi avanzati ---- */
    { id: 'es-01', difficolta: 2, testo: R`Il prezzo di un articolo dipende dalla quantità venduta: $p = 100 - 0{,}4q$ euro. Il costo è $C(q) = 20q + 1500$ euro, e si possono produrre al massimo $80$ pezzi. Quanti pezzi conviene produrre, e con che profitto? Scrivi i due numeri separati da punto e virgola.`, suggerimenti: [R`Il ricavo è $R(q) = p \cdot q$.`, R`Trova il vertice del profitto e controlla se rispetta la capacità.`], risposta: lista([80, 2340], 'pezzi; profitto'), soluzione: [R`$R(q) = 100q - 0{,}4q^2$, quindi $P(q) = -0{,}4q^2 + 80q - 1500$.`, R`Il vertice è a $q_V = \frac{80}{0{,}8} = 100$: oltre la capacità di $80$ pezzi.`, R`Fino a $100$ la parabola sale, quindi il massimo è all'estremo: $P(80) = -2560 + 6400 - 1500 = 2340$ €, con il prezzo $p = 68$ €.`] },
    { id: 'es-02', difficolta: 2, testo: R`Per una produzione si può affittare una di tre macchine. A: $4000$ € all'anno più $6$ € a pezzo. B: $1000$ € più $10$ € a pezzo. C: $7000$ € più $4$ € a pezzo. Per quali quantità annue conviene A? Scrivi i due estremi, separati da punto e virgola.`, suggerimenti: [R`Disegna o immagina le tre rette: conta la più bassa.`, R`Trova dove A pareggia con B e dove pareggia con C.`], risposta: lista([750, 1500], 'da; a'), soluzione: [R`A = B: $4000 + 6x = 1000 + 10x$, cioè $x = 750$. A = C: $4000 + 6x = 7000 + 4x$, cioè $x = 1500$.`, R`Sotto $750$ pezzi conviene B, che ha la quota fissa più bassa. Sopra $1500$ conviene C, che ha il costo a pezzo più basso.`, R`A conviene fra $750$ e $1500$ pezzi. Controllo con $1200$ pezzi: A costa $11\,200$ €, B $13\,000$ €, C $11\,800$ €.`] },
    { id: 'es-03', difficolta: 2, testo: R`Un'azienda compra ogni anno $6000$ componenti a $8$ € l'uno, a ritmo costante. Ogni ordine costa $45$ €, e tenere un componente in magazzino per un anno costa $1{,}50$ €. Con il lotto economico, quanto spende in un anno fra acquisto, ordini e magazzino?`, suggerimenti: [R`Il prezzo d'acquisto non cambia il lotto economico, ma entra nella spesa totale.`, R`$q^* = \sqrt{\frac{2 \cdot 45 \cdot 6000}{1{,}5}}$.`], risposta: euro(48900), soluzione: [R`$q^* = \sqrt{360\,000} = 600$ componenti, con $10$ ordini all'anno.`, R`Ordini: $10 \cdot 45 = 450$ €. Magazzino: $1{,}5 \cdot 300 = 450$ €. Gestione delle scorte: $900$ €.`, R`Acquisto: $6000 \cdot 8 = 48\,000$ €. In tutto $48\,900$ €.`] },
    { id: 'es-04', difficolta: 2, testo: R`Un laboratorio consuma $400$ confezioni di materiale al mese, a ritmo costante. Ogni ordine costa $54$ €. Tenere una confezione in magazzino costa $0{,}12$ € al mese. Trova il lotto economico e il numero di ordini in un anno, separati da punto e virgola.`, suggerimenti: [R`Domanda e costo di magazzino devono avere la stessa unità di tempo.`, R`Porta tutto all'anno: $D = 4800$, $c_g = 1{,}44$ €.`], risposta: lista([600, 8], 'lotto; ordini'), soluzione: [R`All'anno: $D = 400 \cdot 12 = 4800$ e $c_g = 0{,}12 \cdot 12 = 1{,}44$ €.`, R`$q^* = \sqrt{\frac{2 \cdot 54 \cdot 4800}{1{,}44}} = \sqrt{360\,000} = 600$ confezioni. Con i dati tutti mensili viene lo stesso.`, R`Gli ordini sono $\frac{4800}{600} = 8$ all'anno. Chi mescola la domanda annua con il costo mensile trova circa $2078$: un errore.`] },
    { id: 'es-05', difficolta: 2, testo: R`Un mangime si ottiene mescolando due farine. Un kg della prima dà $2$ unità di proteine e $1$ di fibre; un kg della seconda dà $1$ unità di proteine e $3$ di fibre. Servono almeno $10$ unità di proteine e $15$ di fibre. La prima farina costa $3$ € al kg, la seconda $2$ €. Trova i kg di ciascuna e il costo minimo, separati da punto e virgola.`, suggerimenti: [R`I vincoli sono $2x + y \ge 10$ e $x + 3y \ge 15$: la regione è illimitata.`, R`I vertici sono tre: due sugli assi e l'incrocio delle rette.`], risposta: lista([3, 4, 17], 'x; y; costo'), soluzione: [R`Il costo da rendere minimo è $z = 3x + 2y$.`, R`I vertici: $(0; 10)$, $(15; 0)$ e l'incrocio. Da $y = 10 - 2x$ ottieni $x + 30 - 6x = 15$, quindi $x = 3$ e $y = 4$.`, R`$z(0; 10) = 20$, $z(3; 4) = 9 + 8 = 17$, $z(15; 0) = 45$. Il minimo è $17$ €, con $3$ kg della prima farina e $4$ della seconda.`] },
    { id: 'es-06', difficolta: 3, testo: R`I vincoli sono $x \ge 0$, $y \ge 0$, $x + 2y \le 10$, $x \le 6$, $y \le 4$. Trova i vertici della regione ammissibile. Poi trova il valore di $k > 0$ per cui $z = kx + 4y$ ha il massimo su tutto il lato che sta sulla retta $x + 2y = 10$. Per quali $k$ il massimo è in un vertice solo?`, suggerimenti: [R`La regione è un pentagono: due vertici stanno sulla retta $x + 2y = 10$.`, R`Le rette di livello di $z = kx + 4y$ hanno pendenza $-\frac{k}{4}$; la retta $x + 2y = 10$ ha pendenza $-\frac{1}{2}$.`], risposta: numero(2, 0.011, 'il valore di k'), soluzione: [R`I vertici sono $O(0; 0)$, $A(6; 0)$, $B(6; 2)$, $C(2; 4)$, $D(0; 4)$. $B$ viene da $x = 6$ e $x + 2y = 10$; $C$ da $y = 4$ e $x + 2y = 10$.`, R`Le rette di livello sono parallele al lato $BC$ quando $-\frac{k}{4} = -\frac{1}{2}$, cioè $k = 2$. Allora $z = 2x + 4y$ vale $20$ in $B$, in $C$ e su tutto il lato.`, R`Con $k > 2$ vince solo $B$: $z(B) = 6k + 8$ supera $z(C) = 2k + 16$, e anche $z(A) = 6k$. Con $0 < k < 2$ vince solo $C$, che batte anche $D$: $2k + 16 > 16$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Una sartoria produce $x$ giacche e $y$ gonne al giorno. Una giacca richiede $3$ ore di lavoro e $1$ m di stoffa; una gonna $2$ ore e $2$ m. Ogni giorno ci sono $120$ ore di lavoro e $80$ m di stoffa. Una giacca rende $50$ €, una gonna $40$ €. Trova la produzione migliore e il profitto, separati da punto e virgola.`, suggerimenti: [R`I vincoli sono $3x + 2y \le 120$ e $x + 2y \le 80$, con $x$ e $y$ non negativi.`, R`Il vertice in mezzo è l'incrocio delle due rette.`], risposta: lista([20, 30, 2200], 'giacche; gonne; profitto'), soluzione: [R`Il modello: $z = 50x + 40y$ da rendere massimo, con $3x + 2y \le 120$, $x + 2y \le 80$, $x \ge 0$, $y \ge 0$.`, R`I vertici: $(0; 0)$, $(40; 0)$, $(0; 40)$ e l'incrocio. Sottraendo le due equazioni, $2x = 40$: $x = 20$, $y = 30$.`, R`$z$ vale $0$, $2000$, $1600$ e $1000 + 1200 = 2200$. Il massimo è $2200$ €, con $20$ giacche e $30$ gonne. Ore e stoffa sono usate tutte.`] },
    { id: 'es-08', difficolta: 3, testo: R`**Problema completo.** Una cooperativa produce marmellata di albicocche e di fragole. Ogni giorno ne prepara $x$ centinaia di vasetti di albicocche e $y$ di fragole. Un centinaio di vasetti di albicocche richiede $2$ ore di cottura e $1$ di confezionamento; uno di fragole $1$ ora di cottura e $1$ di confezionamento. Ogni giorno ci sono $16$ ore di cottura e $10$ di confezionamento. Le fragole bastano per non più di $8$ centinaia di vasetti. Il profitto è di $120$ € per centinaio di vasetti di albicocche e $100$ € per centinaio di fragole.

1. Scrivi il modello e disegna la regione ammissibile.
2. Trova la produzione che rende di più e il profitto massimo.
3. Fino a quale profitto per centinaio di vasetti di fragole la soluzione del punto 2 resta la migliore?
4. Con $18$ ore di cottura, quanto cresce il profitto massimo?

Come risposta scrivi $x$, $y$ e il profitto del punto 2, separati da punto e virgola.`, suggerimenti: [R`I vincoli: $2x + y \le 16$, $x + y \le 10$, $y \le 8$, più quelli di segno.`, R`Il vertice decisivo è l'incrocio di cottura e confezionamento.`, R`Per il punto 3 la pendenza $-\frac{120}{p}$ deve stare fra le pendenze dei due lati che si incontrano nel vertice.`], risposta: lista([6, 4, 1120], 'x; y (centinaia); profitto'), soluzione: [
      R`**1.** $z = 120x + 100y$ da rendere massimo, con $2x + y \le 16$ (cottura), $x + y \le 10$ (confezionamento), $y \le 8$ (fragole), $x \ge 0$, $y \ge 0$. La regione è un pentagono.`,
      R`**2.** I vertici: $(0; 0)$, $(8; 0)$, $(6; 4)$, $(2; 8)$, $(0; 8)$. Il vertice $(6; 4)$ viene da $2x + y = 16$ e $x + y = 10$: sottraendo, $x = 6$. Il vertice $(2; 8)$ viene da $x + y = 10$ e $y = 8$.`,
      R`I profitti: $0$, $960$, $720 + 400 = 1120$, $240 + 800 = 1040$, $800$ €. Il massimo è $1120$ €, con $600$ vasetti di albicocche e $400$ di fragole.`,
      R`**3.** Con il profitto $p$ per le fragole le rette di livello hanno pendenza $-\frac{120}{p}$. Nel vertice $(6; 4)$ si incontrano due lati, di pendenza $-2$ e $-1$. Il vertice resta ottimo finché $-2 \le -\frac{120}{p} \le -1$, cioè $60 \le p \le 120$. Oltre $120$ € conviene $(2; 8)$.`,
      R`**4.** Con $2x + y \le 18$ il vertice diventa $(8; 2)$, con $z = 960 + 200 = 1160$ €. Gli altri: $(9; 0)$ dà $1080$, $(2; 8)$ dà $1040$. Il profitto cresce di $40$ €: $20$ € per ogni ora di cottura in più.`
    ] },
    { id: 'es-09', difficolta: 3, testo: R`Un negozio vende $7200$ pezzi all'anno, a ritmo costante. Ogni ordine costa $50$ €, il magazzino costa $2$ € a pezzo all'anno, e un pezzo si paga $5$ €. Il fornitore propone: per ordini da almeno $1000$ pezzi, il prezzo scende a $4{,}90$ €. Conviene accettare? Quanto si risparmia in un anno? Come risposta scrivi il risparmio annuo.`, suggerimenti: [R`Calcola la spesa annua totale (acquisto, ordini, magazzino) con il lotto economico.`, R`Poi calcolala con ordini da $1000$ pezzi e lo sconto. Il magazzino resta a $2$ € a pezzo.`], risposta: euro(560), soluzione: [R`Senza sconto: $q^* = \sqrt{\frac{2 \cdot 50 \cdot 7200}{2}} = 600$ pezzi. Ordini $12 \cdot 50 = 600$ €, magazzino $2 \cdot 300 = 600$ €, acquisto $36\,000$ €: in tutto $37\,200$ €.`, R`Con lo sconto conviene il lotto più piccolo ammesso, $1000$ pezzi. Ordini $7{,}2 \cdot 50 = 360$ €, magazzino $2 \cdot 500 = 1000$ €, acquisto $7200 \cdot 4{,}90 = 35\,280$ €: in tutto $36\,640$ €.`, R`Conviene accettare: si risparmiano $560$ € all'anno. In questo modello il prezzo era fisso: con lo sconto non basta la formula, si confrontano le spese totali.`] },
    { id: 'es-10', difficolta: 3, testo: R`Massimizza $z = 5x + 4y$ con $6x + 4y \le 24$, $x + 2y \le 6$, $x \ge 0$, $y \ge 0$, sapendo che $x$ e $y$ devono essere **interi**. Scrivi $x$, $y$ e il massimo, separati da punto e virgola.`, suggerimenti: [R`Prima risolvi senza la condizione di interi: il vertice ottimo non è intero.`, R`Poi prova tutti i punti interi della regione vicini all'ottimo, non solo l'arrotondamento.`], risposta: lista([4, 0, 20], 'x; y; massimo'), soluzione: [R`I vertici: $(0; 0)$, $(4; 0)$, $(0; 3)$ e l'incrocio $(3; 1{,}5)$. Lì $z = 15 + 6 = 21$, ma il punto non è intero.`, R`Punti interi vicini: $(3; 1)$ dà $19$, $(2; 2)$ dà $18$, $(4; 0)$ dà $20$. Il punto $(3; 2)$ non è ammissibile: $18 + 8 = 26 > 24$.`, R`Il massimo con gli interi è $20$, in $(4; 0)$. Arrotondare il vertice per difetto, a $(3; 1)$, avrebbe dato solo $19$.`] },
    { id: 'es-11', difficolta: 2, testo: R`Trova il minimo di $z = 3x + 2y$ con i vincoli $x + y \ge 6$, $x \ge 1$, $y \ge 2$. Esiste anche il massimo?`, suggerimenti: [R`La regione è illimitata: ha solo due vertici.`], risposta: numero(13), soluzione: [R`I vertici sono $(1; 5)$, da $x = 1$ e $x + y = 6$, e $(4; 2)$, da $y = 2$ e $x + y = 6$.`, R`$z(1; 5) = 3 + 10 = 13$ e $z(4; 2) = 12 + 4 = 16$. Il minimo è $13$.`, R`Il massimo non esiste: $x$ e $y$ possono crescere senza limite, e $z$ con loro.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un'agenzia organizza un viaggio a $400$ € a persona e ha $40$ iscritti. Ogni sconto di $10$ € porta $2$ iscritti in più. Il pullman ha $50$ posti. Che prezzo conviene fissare, e quanto si incassa? Scrivi i due numeri separati da punto e virgola.`, suggerimenti: [R`Chiama $x$ il numero di sconti da $10$ €: è un numero intero.`, R`L'incasso è $(400 - 10x)(40 + 2x)$. Il pullman impone $40 + 2x \le 50$.`], risposta: lista([350, 17500], 'prezzo; incasso'), soluzione: [R`$R(x) = (400 - 10x)(40 + 2x) = -20x^2 + 400x + 16\,000$, con $x$ intero.`, R`Il vertice è $x = 10$, cioè $300$ € con $60$ persone e $18\,000$ €. Ma il pullman dà $40 + 2x \le 50$, quindi $x \le 5$.`, R`Fino a $5$ la parabola sale, quindi conviene $x = 5$: prezzo $350$ €, $50$ persone, incasso $17\,500$ €.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`In un problema di scelta, la funzione obiettivo è…`, opzioni: [R`l'insieme dei limiti che le variabili devono rispettare`, R`la quantità che decide chi gestisce l'azienda`, R`la grandezza da rendere massima o minima`, R`il valore ottimo della variabile d'azione`], corretta: 2, spiegazione: R`La funzione obiettivo è ciò che si vuole ottimizzare: un profitto da rendere massimo, un costo da rendere minimo. I limiti sono i vincoli. La quantità decisa è la variabile d'azione.` },
    { id: 'q-02', domanda: R`Qual è l'ordine giusto delle fasi della ricerca operativa?`, opzioni: [R`problema, modello, soluzione, verifica`, R`modello, problema, verifica, soluzione`, R`problema, soluzione, modello, verifica`, R`soluzione, verifica, problema, modello`], corretta: 0, spiegazione: R`Prima si capisce il problema, poi lo si traduce in formule, poi si risolve. Alla fine si controlla che la soluzione abbia senso. Senza un modello non c'è niente da risolvere.` },
    { id: 'q-03', domanda: R`La funzione obiettivo è lineare e decrescente sul campo di scelta $\Icc{a}{b}$. Il massimo sta…`, opzioni: [R`nel punto medio dell'intervallo`, R`in $b$, l'estremo destro`, R`dove la retta taglia l'asse delle ascisse`, R`in $a$, l'estremo sinistro`], corretta: 3, spiegazione: R`Una retta che scende ha i valori più alti a sinistra. L'ottimo di una funzione lineare sta sempre a un estremo. Lo zero della retta è il punto di pareggio, non il massimo.` },
    { id: 'q-04', domanda: R`Il profitto è una parabola con il vertice in $q = 90$. Il campo di scelta è $0 \le q \le 60$. Dove sta il massimo?`, opzioni: [R`in $q = 90$, nel vertice`, R`in $q = 60$`, R`in $q = 0$`, R`il massimo non esiste`], corretta: 1, spiegazione: R`Il vertice non è raggiungibile. Fino a $90$ la parabola sale, quindi nel campo di scelta il valore più alto è all'estremo $60$. Su un intervallo chiuso il massimo c'è sempre.` },
    { id: 'q-05', domanda: R`La variabile d'azione è intera, e il vertice della parabola del profitto è $q = 4{,}3$. Che cosa conviene?`, opzioni: [R`$q = 4$, l'intero più vicino`, R`$q = 5$, perché si arrotonda sempre per eccesso`, R`$q = 4{,}3$, il vertice`, R`$q = 0$, perché il vertice non è intero`], corretta: 0, spiegazione: R`La parabola è simmetrica rispetto al vertice: vince l'intero più vicino, qui $4$. Il vertice non è ammesso, perché non è intero. Arrotondare sempre per eccesso è un errore.` },
    { id: 'q-06', domanda: R`Due tariffe hanno il punto di indifferenza a $300$ km. Che cosa vuol dire?`, opzioni: [R`oltre i $300$ km nessuna delle due conviene`, R`a $300$ km le due tariffe costano uguale`, R`le due tariffe costano $300$ € ciascuna`, R`la tariffa con la quota fissa più alta conviene sempre`], corretta: 1, spiegazione: R`Nel punto di indifferenza i due costi sono uguali. Prima conviene una tariffa, dopo l'altra. Il numero $300$ è una quantità di km, non un costo.` },
    { id: 'q-07', domanda: R`Nel lotto economico, che legame c'è fra il costo delle ordinazioni e il costo di magazzino?`, opzioni: [R`il costo di magazzino è il doppio`, R`il costo delle ordinazioni è zero`, R`sono uguali`, R`il costo delle ordinazioni è il doppio`], corretta: 2, spiegazione: R`Il minimo del costo totale cade dove le due curve si incrociano: lì i due costi sono uguali. Il totale vale il doppio di ciascuno.` },
    { id: 'q-08', domanda: R`La domanda annua quadruplica e gli altri dati restano uguali. Il lotto economico…`, opzioni: [R`quadruplica`, R`resta uguale`, R`si dimezza`, R`raddoppia`], corretta: 3, spiegazione: R`$D$ sta sotto la radice: se si moltiplica per $4$, $q^*$ si moltiplica per $\sqrt{4} = 2$. Gli ordini all'anno raddoppiano anche loro.` },
    { id: 'q-09', domanda: R`Quale di queste **non** è un'ipotesi del modello del lotto economico?`, opzioni: [R`la domanda è costante durante l'anno`, R`il magazzino non resta mai senza merce per i clienti`, R`il prezzo d'acquisto scende per gli ordini grandi`, R`ogni ordine costa la stessa cifra`], corretta: 2, spiegazione: R`Nel modello il prezzo d'acquisto non dipende dalla quantità: per questo il costo d'acquisto non entra nella formula. Con gli sconti di quantità si confrontano le spese totali.` },
    { id: 'q-10', domanda: R`Che cos'è la regione ammissibile di un problema di programmazione lineare?`, opzioni: [R`l'insieme dei punti che rispettano tutti i vincoli`, R`il primo quadrante, dove $x$ e $y$ sono positive`, R`l'insieme dei vertici del poligono`, R`la retta su cui la funzione obiettivo è massima`], corretta: 0, spiegazione: R`È l'intersezione dei semipiani dei vincoli. Il primo quadrante viene solo dai vincoli di segno. I vertici sono alcuni punti della regione, non tutta.` },
    { id: 'q-11', domanda: R`Le rette di livello di $z = 3x + 2y$ sono…`, opzioni: [R`tutte perpendicolari alla retta $3x + 2y = 0$`, R`tutte parallele, con pendenza $-\frac{3}{2}$`, R`tutte passanti per l'origine`, R`tutte parallele, con pendenza $\frac{2}{3}$`], corretta: 1, spiegazione: R`Le rette $3x + 2y = k$ cambiano solo il termine noto: hanno tutte pendenza $-\frac{3}{2}$. Solo quella con $k = 0$ passa per l'origine.` },
    { id: 'q-12', domanda: R`Che cosa dice il teorema fondamentale della programmazione lineare?`, opzioni: [R`ogni problema ha sempre un massimo e un minimo`, R`il massimo sta nel vertice più lontano dall'origine`, R`il massimo sta nel punto medio della regione`, R`se il massimo esiste, si raggiunge in un vertice`], corretta: 3, spiegazione: R`Il massimo si raggiunge in un vertice, ma solo se esiste: su una regione illimitata può mancare. Quale vertice dipende dalla funzione obiettivo, non dalla distanza dall'origine.` },
    { id: 'q-13', domanda: R`Il massimo di $z$ si raggiunge in due vertici vicini, $B$ e $C$. Che cosa si può dire?`, opzioni: [R`il problema è sbagliato: il massimo deve essere uno solo`, R`il massimo si raggiunge in tutti i punti del lato $BC$`, R`il massimo è la somma dei due valori`, R`bisogna scegliere il vertice con la $x$ più grande`], corretta: 1, spiegazione: R`Se due vertici vicini danno lo stesso valore, le rette di livello sono parallele al lato $BC$. Tutti i punti del lato danno lo stesso valore massimo: le soluzioni ottime sono infinite.` },
    { id: 'q-14', domanda: R`Con i vincoli $x \ge 0$, $y \ge 0$, $x + y \ge 5$ si cerca il massimo di $z = x + 2y$. Che cosa succede?`, opzioni: [R`il massimo è nel vertice $(0; 5)$, dove $y$ è più grande`, R`il massimo è nel vertice $(5; 0)$`, R`il massimo non esiste`, R`il massimo è $0$, nell'origine`], corretta: 2, spiegazione: R`La regione sta sopra la retta $x + y = 5$ e non finisce. Per esempio $(0; 100)$ è ammissibile e dà $z = 200$. Esiste invece il minimo, $5$, in $(5; 0)$. L'origine non è ammissibile.` },
    { id: 'q-15', domanda: R`Nella soluzione ottima un vincolo è rispettato con il segno «$<$», non con l'uguale. Che cosa vuol dire?`, opzioni: [R`la soluzione non è ammissibile e va cercata altrove`, R`quella risorsa è usata tutta`, R`il vincolo è superfluo e va tolto dal modello`, R`quella risorsa non è usata tutta`], corretta: 3, spiegazione: R`Avanza una parte della risorsa, quindi quel vincolo non decide l'ottimo. Il vincolo però non si toglie: con altri dati potrebbe tornare decisivo.` },
    { id: 'q-16', domanda: R`Perché nel lotto economico il prezzo d'acquisto della merce non entra nella formula?`, opzioni: [R`perché la spesa d'acquisto è la stessa per ogni $q$`, R`perché lo paga il cliente insieme alla merce`, R`perché è sempre più piccolo del costo di magazzino`, R`perché si paga solo alla fine dell'anno`], corretta: 0, spiegazione: R`La spesa d'acquisto è prezzo per $D$, uguale per ogni $q$. Una costante sommata al costo non sposta il minimo. Cambia solo se il prezzo dipende dalla quantità ordinata.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di fare conti scrivi le tre cose: che cosa decidi (le variabili), che limiti hai (i vincoli), che cosa vuoi ottimizzare (la funzione obiettivo).` },
    { tipo: 'errore', testo: R`Il vertice della parabola non è sempre la risposta. Se cade fuori dal campo di scelta, l'ottimo sta all'estremo più vicino.` },
    { tipo: 'errore', testo: R`Nel caso discreto non arrotondare il vertice a occhio: calcola la funzione nei due interi vicini.` },
    { tipo: 'trucco', testo: R`Nel lotto economico i due costi sono uguali. Se ti vengono diversi, hai sbagliato un conto.` },
    { tipo: 'errore', testo: R`Domanda e costo di magazzino vanno nella stessa unità di tempo: tutti e due annui o tutti e due mensili.` },
    { tipo: 'metodo', testo: R`Per un problema di programmazione lineare: regione, vertici, valore di $z$ in ogni vertice. Il massimo si raggiunge in un vertice.` },
    { tipo: 'errore', testo: R`Non ogni incrocio di due rette di bordo è un vertice. Controlla ogni punto in tutti i vincoli.` },
    { tipo: 'trucco', testo: R`Per capire da che parte sta un semipiano prova l'origine, se non sta sulla retta: se il vincolo è vero, la parte giusta è quella dell'origine.` },
    { tipo: 'errore', testo: R`Su una regione illimitata controlla che l'ottimo esista prima di usare i vertici. Il massimo di un costo, di solito, non c'è.` }
  ],

  aneddoti: [
    { matematico: 'Patrick Blackett', anni: '1897–1974', titolo: 'Gli scienziati che contavano le navi', testo: R`Patrick Blackett era stato ufficiale di marina nella Prima guerra mondiale, poi era diventato fisico. Nel 1940 riunì al Comando antiaereo dell'esercito un gruppo di scienziati: fisici, matematici e fisiologi. Li chiamavano «il circo di Blackett». Nel marzo 1941 passò al Comando costiero della RAF, poi all'Ammiragliato. Non inventavano armi nuove. Studiavano i dati delle operazioni, per usare meglio quello che c'era già. Uno studio riguardava i convogli di navi mercantili. Le perdite in un attacco dipendevano dai sottomarini e dalle scorte, quasi non dal numero dei mercantili. Quindi convogli più grandi perdevano una parte più piccola delle navi. Nel 1948 Blackett ricevette il premio Nobel per la fisica, per le sue ricerche sui raggi cosmici.`, legame: R`I gruppi come il suo fecero conoscere la ricerca operativa: usare i dati per decidere meglio.` },
    { matematico: 'Ford Whitman Harris', anni: '1877–1962', titolo: 'La formula del lotto rimasta senza padre', testo: R`Ford Whitman Harris aveva lavorato per anni come ingegnere alla Westinghouse, negli Stati Uniti. Nel 1913 pubblicò su una rivista per dirigenti d'azienda un articolo breve. Il titolo era «Quanti pezzi produrre in una volta». Conteneva la formula del lotto economico, ricavata da ragionamenti pratici sui costi. L'articolo fu presto dimenticato. Nel 1934 R. H. Wilson diffuse la stessa formula fra le aziende, e per decenni la si chiamò «formula di Wilson». Solo nel 1988 Donald Erlenkotter, un professore della California, ritrovò l'articolo originale di Harris. Oggi molti libri gli rendono il merito, ma il nome di Wilson è rimasto.`, legame: R`È la formula $q^* = \sqrt{\frac{2\,c_o D}{c_g}}$ della sezione sulle scorte.` },
    { matematico: 'Leonid Kantorovič', anni: '1912–1986', titolo: 'Il compensato di Leningrado', testo: R`Leonid Kantorovič era un giovane professore di matematica a Leningrado. Verso la fine degli anni Trenta un'azienda del compensato gli chiese aiuto. Aveva diverse macchine e diversi tipi di legno. Come dividere il lavoro fra le macchine per produrre il più possibile? Kantorovič capì che molti problemi della produzione avevano la stessa forma. C'era una funzione lineare da rendere massima, con tanti vincoli lineari. Nel 1939 pubblicò un libretto sui metodi matematici per organizzare la produzione. In Unione Sovietica il lavoro fu guardato con sospetto, e in Occidente rimase sconosciuto per vent'anni. Nel 1975 vinse il premio Nobel per l'economia, con l'olandese-americano Tjalling Koopmans.`, legame: R`Il problema del compensato era un problema di programmazione lineare, come quello del mobilificio.` },
    { matematico: 'George Dantzig', anni: '1914–2005', titolo: 'I compiti sulla lavagna', testo: R`Nel 1939 George Dantzig studiava statistica all'università di Berkeley. Un giorno arrivò tardi alla lezione del professor Jerzy Neyman. Sulla lavagna c'erano due problemi, e lui li copiò pensando che fossero compiti per casa. Li trovò più difficili del solito, ma dopo qualche giorno consegnò le soluzioni. Settimane dopo Neyman andò a cercarlo, entusiasta: erano due problemi famosi, che nessuno aveva ancora risolto. Lo racconta Dantzig stesso, in un'intervista. Nel 1947, lavorando per l'aviazione americana, inventò il **metodo del simplesso**. Il metodo parte da un vertice della regione ammissibile e passa a un vertice vicino migliore, finché non trova l'ottimo.`, legame: R`Il simplesso usa proprio il fatto che il massimo si raggiunge in un vertice, anche con migliaia di variabili.` },
    { matematico: 'George Stigler', anni: '1911–1991', titolo: 'La dieta più economica del mondo', testo: R`Nel 1945 l'economista George Stigler si chiese quanto costa, al minimo, nutrirsi bene per un anno. Prese $77$ alimenti e $9$ sostanze nutritive necessarie, come calorie, proteine e vitamine. Cercava la combinazione più economica. Erano troppe variabili per un disegno, e Stigler procedette per tentativi. Trovò una dieta da circa $40$ dollari all'anno, ai prezzi del 1939. Nel 1947 il problema fu risolto con il metodo del simplesso. Servirono nove impiegati con le calcolatrici da tavolo, per circa $120$ giornate di lavoro in tutto. La dieta migliore costava $39{,}69$ dollari, appena meno di quella di Stigler. Nel 1982 Stigler vinse il premio Nobel per l'economia, per altri studi.`, legame: R`È un problema di minimo come quello dei mangimi, ma con $77$ variabili invece di due.` }
  ]
});
})();
