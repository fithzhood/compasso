(function () {
const R = String.raw;
/* Matematica per l'economia (istituti tecnici AFM, livello 2). Ogni numero di teoria, esempi, esercizi, quiz e
   flashcard è stato ricalcolato con node. Gli esempi della teoria sono quelli dei video:
   - domanda-offerta: domanda q = 100 − 2p, offerta q = 3p − 20; equilibrio p = 24 €, q = 52; con 15 pezzi offerti
     in più l'offerta diventa q = 3p − 5 e l'equilibrio p = 21 €, q = 58.
   - pareggio: C(q) = 2000 + 5q, R(q) = 15q; pareggio q = 200, R = C = 3000 €; P(q) = 10q − 2000, P(100) = −1000 €,
     P(300) = +1000 €.
   Le altre funzioni guida della teoria: costo dei vasi C(q) = 0,5q² + 2q + 200 (costo medio minimo 22 € a q = 20);
   ricavo con la domanda del video R(q) = 50q − 0,5q² (massimo 1250 € a q = 50, p = 25 €); costo C(q) = 10q + 600
   e profitto P(q) = −0,5q² + 40q − 600 (pareggi 20 e 60, massimo 200 € a q = 40, p = 30 €).
   Notazione dei libri di economia: nei grafici di domanda e offerta il prezzo p sta sull'asse verticale e la
   quantità q su quello orizzontale; le funzioni dei grafici sono quindi scritte come p in funzione di q (= x).
   Fra un numero e la sua unità c'è lo spazio non separabile. */

/* ---- allenamento: risposte (il motore ignora «€» ed «euro», e legge il punto delle migliaia) ---- */
const euro = (v, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.011, segnaposto: 'in euro, es. 12,50', simboli: ['/'] });
const pezzi = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'numero di pezzi', simboli: [] });
const numero = (v, tol, seg) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.011, segnaposto: seg || 'un numero', simboli: ['/', '−'] });
/* due numeri in quell'ordine, separati da punto e virgola */
const coppia = (a, b, seg) => ({ tipo: 'numeri', valori: [a, b], ordinati: true, segnaposto: seg, simboli: [';', '−'] });

/* ---- le figure ---- */
/* piano per domanda e offerta: q in orizzontale (x), p in verticale */
const PIANO_DO = { tipo: 'piano', x: [0, 110], y: [0, 55], passo: [10, 10], etichette: { x: 'q', y: 'p' }, mirino: false };
const conPiano = (base, extra) => Object.assign({}, base, extra);

COMPASSO.registra({
  id: 'matematica-economia',
  titolo: 'Matematica per l\'economia',

  introduzione: R`Un'azienda deve decidere quanto produrre e a che prezzo vendere. Quanto costa un pezzo in più? A che prezzo la gente compra? Quanti pezzi bisogna vendere per non andare in perdita? Sono domande di economia aziendale, ma le risposte vengono da rette e parabole.

Qui ogni grandezza dell'economia diventa una funzione. La domanda e l'offerta legano la quantità al prezzo. Il costo, il ricavo e il profitto dipendono dai pezzi prodotti. Il prezzo di equilibrio è l'incrocio di due rette. Il punto di pareggio e il profitto massimo si leggono su un grafico.

Ti servono la retta nel piano cartesiano e la parabola, con il suo vertice. L'ultima parte usa le derivate: costo e ricavo marginale, elasticità della domanda.`,

  inBreve: [
    R`Più il prezzo sale, meno si compra: la domanda scende. L'offerta invece sale. Il prezzo di equilibrio sta dove le due rette si incrociano.`,
    R`Nei grafici dell'economia il prezzo $p$ va sull'asse verticale e la quantità $q$ su quello orizzontale.`,
    R`Il costo totale è la somma dei costi fissi e dei costi variabili. Il costo medio è il costo totale diviso per i pezzi.`,
    R`Il profitto è ricavo meno costo. Il punto di pareggio è dove ricavo e costo si incontrano: da lì in poi si guadagna.`,
    R`Se il profitto è una parabola rivolta verso il basso, il massimo sta nel vertice. Con le derivate: profitto massimo dove $R'(q) = C'(q)$.`,
    R`L'elasticità misura quanto la domanda reagisce al prezzo: rigida sotto $1$, elastica sopra $1$. Il ricavo è massimo dove vale $1$.`
  ],

  sezioni: [
    { id: 'domanda', titolo: 'La funzione della domanda', testo: R`La **domanda** dice quanti pezzi di un bene la gente vuole comprare, a ogni prezzo. Chiamiamo $p$ il prezzo, in euro, e $q$ la quantità, in pezzi.

>* La **funzione della domanda** lega la quantità domandata al prezzo: $q = f(p)$. Di solito è **decrescente**: più il prezzo sale, meno si compra. La più semplice è una retta, $q = a - bp$, con $a > 0$ e $b > 0$.

Prendi la domanda di una maglietta, $q = 100 - 2p$. Ogni euro in più di prezzo fa perdere $2$ pezzi venduti.

| prezzo $p$ (€) | domanda $q$ |
|---|---|
| $0$ | $100$ |
| $10$ | $80$ |
| $20$ | $60$ |
| $40$ | $20$ |
| $50$ | $0$ |

Due valori hanno un nome. A prezzo zero si chiederebbero $100$ pezzi: è la **domanda massima**. A $50$ € la domanda si annulla: è il **prezzo massimo**, oltre il quale nessuno compra. Il prezzo ha senso solo fra $0$ e $50$ €.

>! Attenzione agli assi. In economia il prezzo $p$ va sull'asse **verticale** e la quantità $q$ su quello orizzontale. Sembra il contrario di $q = f(p)$, ma così fanno tutti i libri di economia.

Per disegnare la retta con $p$ in verticale, conviene ricavare $p$.

~ q = 100 - 2p :: la domanda
~ 2p = 100 - q :: porto $2p$ a sinistra e $q$ a destra
~ p = \evidb{50 - \frac{q}{2}} :: divido per $2$: è la stessa retta, scritta per l'asse verticale

[[grafico:gDomanda]]

?? Con la domanda $q = 100 - 2p$ il prezzo passa da $20$ a $25$ €. Che cosa succede alla quantità domandata?
[x] Scende di $10$ pezzi, da $60$ a $50$.
[ ] Scende di $5$ pezzi, da $60$ a $55$.
[ ] Sale di $10$ pezzi, perché il prezzo è più alto.
=> Ogni euro in più toglie $2$ pezzi, quindi $5$ euro ne tolgono $10$. Infatti $q = 100 - 50 = 50$.

### La domanda iperbolica

Non tutte le domande sono rette. Se la gente spende sempre la stessa somma, la domanda è un ramo di **iperbole**: $$q = \frac{k}{p}.$$ Con $q = \frac{600}{p}$, a $10$ € si comprano $60$ pezzi, a $20$ € se ne comprano $30$. La spesa totale $p \cdot q$ vale sempre $600$ €.

[[grafico:gIperbolica]]

>! La domanda iperbolica non tocca mai gli assi. Non c'è un prezzo massimo: anche a prezzi altissimi si compra qualcosa, ma pochissimo.` },

    { id: 'equilibrio', titolo: 'Offerta e prezzo di equilibrio', testo: R`L'**offerta** dice quanti pezzi i produttori vogliono vendere, a ogni prezzo. Qui la regola è opposta: più il prezzo sale, più conviene vendere.

>* La **funzione dell'offerta** $q = g(p)$ è **crescente**. Il **prezzo di equilibrio** è il prezzo per cui la quantità domandata è uguale a quella offerta: $$f(p) = g(p).$$ Nel grafico è il punto in cui le due rette si incrociano.

[[video:matematica-economia/domanda-offerta]]

Prendi la domanda $q = 100 - 2p$ e l'offerta $q = 3p - 20$. Sotto i $\frac{20}{3}$ €, circa $6{,}67$ €, l'offerta sarebbe negativa: a quei prezzi nessuno vende.

~ 100 - 2p = 3p - 20 :: domanda uguale a offerta
~ 120 = 5p :: porto i termini con $p$ a destra e i numeri a sinistra
~ p = \evidb{24} :: il prezzo di equilibrio, in euro
~ q = 100 - 2 \cdot 24 = \evidb{52} :: la quantità: sostituisco in una delle due

L'equilibrio è $p = 24$ €, $q = 52$. A quel prezzo si comprano e si vendono $52$ pezzi.

[[grafico:gEquilibrio]]

Se l'offerta cambia, la retta si sposta e l'equilibrio la segue. Con $15$ pezzi offerti in più a ogni prezzo, l'offerta diventa $q = 3p - 5$. Il nuovo equilibrio è $p = 21$ €, $q = 58$: il prezzo scende e la quantità sale.

>! L'equilibrio è una **coppia**: un prezzo e una quantità. Trovato $p$, non dimenticare di calcolare $q$.

### Fuori dall'equilibrio

A un prezzo diverso da $24$ € le due quantità non coincidono. A $30$ € si chiedono $40$ pezzi, ma se ne offrono $70$: c'è un **eccesso di offerta** di $30$ pezzi. A $20$ € si chiedono $60$ pezzi e se ne offrono $40$: c'è un **eccesso di domanda** di $20$ pezzi.

[[grafico:gEccesso]]

> Con un eccesso di offerta la merce resta in magazzino, e i venditori abbassano il prezzo. Con un eccesso di domanda il prezzo sale. In tutti e due i casi il prezzo si avvicina all'equilibrio.

?? Con la domanda $q = 100 - 2p$ e l'offerta $q = 3p - 20$, il prezzo è $35$ €. Che cosa succede?
[ ] C'è un eccesso di domanda di $55$ pezzi.
[x] C'è un eccesso di offerta di $55$ pezzi.
[ ] Il mercato è in equilibrio, perché $35$ è più di $24$.
=> Si chiedono $100 - 70 = 30$ pezzi e se ne offrono $105 - 20 = 85$. L'offerta supera la domanda di $55$ pezzi: il prezzo è troppo alto.` },

    { id: 'costi', titolo: 'Costi fissi, variabili e totali', testo: R`Produrre costa. Una parte dei costi c'è anche se l'azienda non produce niente. Un'altra parte cresce con i pezzi prodotti.

>* I **costi fissi** $C_F$ non dipendono dalla quantità: affitto, macchinari, stipendi fissi. I **costi variabili** $C_V(q)$ crescono con i pezzi prodotti: materie prime, energia. Il **costo totale** è la loro somma: $$C(q) = C_F + C_V(q).$$

Il caso più semplice: ogni pezzo costa sempre la stessa cifra $c$, il **costo variabile unitario**. Allora $C_V(q) = c\,q$ e il costo totale è una retta: $$C(q) = C_F + c\,q.$$

Un laboratorio stampa magliette. Paga $2000$ € al mese di costi fissi e $5$ € per ogni maglietta.

~ C(q) = 2000 + 5q :: costi fissi più $5$ euro a pezzo
~ C(0) = \evidb{2000} :: senza produrre niente si pagano i costi fissi
~ C(100) = 2000 + 500 = \evidb{2500} :: $100$ magliette
~ C(300) = 2000 + 1500 = \evidb{3500} :: $300$ magliette

Nel grafico il costo totale è una retta che **non parte dall'origine**. Parte da $2000$ €, all'altezza dei costi fissi. La sua pendenza è il costo variabile unitario.

[[grafico:gCosti]]

>! $q$ è una quantità: ha senso solo per $q \ge 0$. Spesso c'è anche un limite superiore, la **capacità produttiva**. Sono i pezzi che l'azienda riesce a fare al massimo.

Non sempre i costi variabili crescono in modo regolare. Oltre una certa quantità servono straordinari e macchine più spinte. Allora ogni pezzo in più costa più del precedente. Il costo totale diventa una curva, per esempio una parabola: $$C(q) = 0{,}5q^2 + 2q + 200.$$ Qui i costi fissi sono $200$ €, il valore per $q = 0$.

?? Il costo totale è $C(q) = 1500 + 8q$. Che cosa vuol dire il numero $8$?
[ ] Il costo di produzione di $8$ pezzi.
[x] Quanto costa ogni pezzo in più.
[ ] I costi fissi, in centinaia di euro.
=> È il coefficiente di $q$, cioè la pendenza della retta: ogni pezzo in più aggiunge $8$ € al costo. I costi fissi sono $1500$ €, il valore per $q = 0$.` },

    { id: 'costo-medio', titolo: 'Il costo medio e il suo minimo', testo: R`Il costo totale dice quanto spendi in tutto. Per fissare un prezzo serve sapere quanto costa **ogni pezzo**, in media.

>* Il **costo medio unitario** è il costo totale diviso per i pezzi prodotti: $$C_m(q) = \frac{C(q)}{q}, \qquad q > 0.$$ Se il prezzo di vendita supera il costo medio, ogni pezzo in media porta un guadagno.

Con le magliette il costo è $C(q) = 2000 + 5q$.

~ C_m(q) = \frac{2000 + 5q}{q} = \evid{\frac{2000}{q}} + 5 :: divido ogni termine per $q$
~ C_m(100) = 20 + 5 = \evidb{25} :: con $100$ magliette, $25$ euro l'una
~ C_m(400) = 5 + 5 = \evidb{10} :: con $400$, solo $10$ euro l'una

I costi fissi si dividono fra più pezzi, quindi il costo medio scende. Si avvicina a $5$ €, ma non lo raggiunge mai. Il grafico è un ramo d'iperbole con asintoto $C_m = 5$.

### Quando il costo medio ha un minimo

Un artigiano fa $q$ vasi al mese, con il costo $C(q) = 0{,}5q^2 + 2q + 200$ euro. Qui succede qualcosa di nuovo.

~ C_m(q) = 0{,}5q + 2 + \frac{200}{q} :: divido ogni termine per $q$

Due termini cambiano con $q$. Il primo, $0{,}5q$, cresce. Il secondo, $\frac{200}{q}$, cala. Il loro prodotto è sempre $100$. La somma di due numeri positivi con prodotto fisso è minima quando sono **uguali**.

~ 0{,}5q = \frac{200}{q} :: i due termini uguali
~ q^2 = 400 :: moltiplico per $2q$
~ q = \evidb{20} :: ha senso solo la soluzione positiva
~ C_m(20) = 10 + 2 + 10 = \evidb{22} :: il costo medio minimo, in euro a vaso

>* Se $C_m(q) = aq + b + \frac{c}{q}$, con $a$ e $c$ positivi, il minimo sta dove $aq = \frac{c}{q}$, cioè in $$q = \sqrt{\frac{c}{a}}.$$

[[grafico:gCostoMedio]]

Il motivo sta in una riga. Per ogni $q > 0$ vale $\left(\sqrt{aq} - \sqrt{\frac{c}{q}}\right)^2 \ge 0$. Sviluppando il quadrato, $aq + \frac{c}{q} \ge 2\sqrt{ac}$. L'uguale vale solo quando i due termini sono uguali.

Il costo medio si vede anche sul grafico del costo totale. È la **pendenza del segmento** che va dall'origine al punto $(q; C(q))$. Il segmento meno ripido è quello che tocca la curva senza attraversarla.

[[grafico:gRaggio]]

>! Il costo medio minimo non è il costo totale minimo. Il costo totale cresce sempre: il più basso è $C(0)$, quando non produci niente.

?? Il costo medio dei vasi è $22$ € con $20$ vasi. Quanto costano in tutto i $20$ vasi?
=> $C(20) = 22 \cdot 20 = 440$ €. Il costo totale è il costo medio per il numero dei pezzi: $0{,}5 \cdot 400 + 40 + 200 = 440$.` },

    { id: 'ricavo', titolo: 'Il ricavo', testo: R`Il **ricavo** è quello che l'azienda incassa vendendo. Si suppone che i pezzi prodotti siano tutti venduti.

>* Il ricavo è il prezzo per la quantità venduta: $$R = p \cdot q.$$ Se il prezzo è **fisso**, $R(q) = p\,q$ è una retta che passa per l'origine. Se il prezzo segue una domanda lineare, il ricavo è una **parabola**.

### Prezzo fisso

Le magliette si vendono a $15$ € l'una, comunque vada il mercato. Allora $R(q) = 15q$. Con $100$ magliette incassi $1500$ €, con $200$ ne incassi $3000$. La retta parte da zero, perché senza vendere non si incassa niente. La sua pendenza è il prezzo.

### Prezzo che dipende dalla domanda

Spesso, per vendere di più, bisogna abbassare il prezzo. Il prezzo allora si ricava dalla domanda. Con $q = 100 - 2p$ hai $p = 50 - \frac{q}{2}$.

~ R(q) = p \cdot q = \left(50 - \frac{q}{2}\right) q :: il prezzo dipende dai pezzi venduti
~ R(q) = \evid{-0{,}5q^2 + 50q} :: una parabola rivolta verso il basso
~ q_V = -\frac{50}{2 \cdot (-0{,}5)} = \evidb{50} :: l'ascissa del vertice, $-\frac{b}{2a}$
~ R(50) = -1250 + 2500 = \evidb{1250} :: il ricavo massimo, in euro

Per il ricavo massimo il prezzo giusto è $p = 50 - 25 = 25$ €.

[[grafico:gRicavo]]

La parabola taglia l'asse $q$ in $0$ e in $100$. Con $q = 100$ il prezzo è zero: vendi tutto, ma regali la merce. Con $q = 0$ il prezzo è il massimo, ma non vendi niente. Il vertice sta a metà fra i due zeri.

>! Il ricavo massimo non è il guadagno massimo. Il ricavo non tiene conto dei costi: per quello serve il profitto.

?? Con la domanda $q = 100 - 2p$, l'azienda alza il prezzo da $20$ € a $22$ €. Che cosa succede al ricavo?
[x] Sale da $1200$ € a $1232$ €.
[ ] Scende, perché si vendono meno pezzi.
[ ] Resta uguale: il prezzo sale quanto cala la quantità.
=> A $20$ € si vendono $60$ pezzi, e $R = 1200$ €. A $22$ € se ne vendono $56$, e $R = 22 \cdot 56 = 1232$ €. Si vende meno, ma ogni pezzo rende di più. Sotto i $25$ € alzare il prezzo conviene.` },

    { id: 'pareggio', titolo: 'Profitto e punto di pareggio', testo: R`Ora metti insieme costo e ricavo. La loro differenza dice se l'azienda guadagna o perde.

>* Il **profitto** (o utile) è ricavo meno costo: $$P(q) = R(q) - C(q).$$ Il **punto di pareggio** (in inglese *break-even point*) è la quantità per cui $R(q) = C(q)$, cioè $P(q) = 0$. Il grafico con le linee del costo e del ricavo si chiama **diagramma di redditività**.

[[video:matematica-economia/pareggio]]

Il laboratorio di magliette ha il costo $C(q) = 2000 + 5q$ e vende a $15$ €: $R(q) = 15q$.

~ 15q = 2000 + 5q :: ricavo uguale a costo
~ 10q = 2000 :: ogni maglietta copre $10$ euro di costi fissi
~ q = \evidb{200} :: il punto di pareggio
~ R(200) = C(200) = \evidb{3000} :: incassi e spese, in euro

Prima di $200$ magliette il costo sta sopra il ricavo: è la **zona di perdita**. Dopo, il ricavo sta sopra: è la **zona di guadagno**. Il profitto è la distanza verticale fra le due rette.

[[grafico:gPareggio]]

~ P(q) = 15q - (2000 + 5q) :: ricavo meno costo, con il costo tutto fra parentesi
~ P(q) = \evid{10q - 2000} :: il profitto
~ P(100) = \evidb{-1000} :: con $100$ magliette si perdono $1000$ euro
~ P(300) = \evidb{1000} :: con $300$ se ne guadagnano $1000$

>* Con il prezzo $p$ e il costo variabile unitario $c$, ogni pezzo venduto copre $p - c$ euro di costi fissi. È il **margine di contribuzione** unitario. Il pareggio sta in $$q = \frac{C_F}{p - c}.$$

Con un prezzo più alto il margine cresce e il pareggio arriva prima. Se $p \le c$ il pareggio non c'è: ogni pezzo venduto fa perdere.

>! I pezzi sono numeri interi. Se il pareggio viene $166{,}7$, servono almeno $167$ pezzi: si arrotonda **per eccesso**. Con $166$ pezzi sei ancora in perdita.

?? Il costo è $C(q) = 3000 + 4q$ e ogni pezzo si vende a $10$ €. Dov'è il pareggio?
[ ] A $300$ pezzi.
[ ] A $750$ pezzi.
[x] A $500$ pezzi.
=> Ogni pezzo copre $10 - 4 = 6$ € di costi fissi: servono $\frac{3000}{6} = 500$ pezzi. Chi divide $3000$ per il prezzo, o per il costo variabile, dimentica l'altra parte.` },

    { id: 'profitto-massimo', titolo: 'Il profitto massimo', testo: R`Con il prezzo fisso e il costo lineare, il profitto è una retta: più vendi, più guadagni. Il limite è solo la capacità produttiva. Se invece il prezzo dipende dalla domanda, il profitto ha un **massimo**.

>* Quando il profitto è una parabola rivolta verso il basso, $P(q) = aq^2 + bq + c$ con $a < 0$, il profitto massimo sta nel **vertice**: $$q_V = -\frac{b}{2a}.$$ Gli zeri della parabola sono i due punti di pareggio.

Riprendi il ricavo della domanda $q = 100 - 2p$, cioè $R(q) = -0{,}5q^2 + 50q$. I costi sono $C(q) = 10q + 600$.

~ P(q) = -0{,}5q^2 + 50q - (10q + 600) :: ricavo meno costo: attento alla parentesi
~ P(q) = \evid{-0{,}5q^2 + 40q - 600} :: una parabola rivolta verso il basso
~ q_V = -\frac{40}{2 \cdot (-0{,}5)} = \evidb{40} :: la quantità che rende di più
~ P(40) = -800 + 1600 - 600 = \evidb{200} :: il profitto massimo, in euro

Il prezzo da fissare è $p = 50 - \frac{40}{2} = 30$ €.

Per i punti di pareggio risolvi $P(q) = 0$. Moltiplicando per $-2$ ottieni $q^2 - 80q + 1200 = 0$, con soluzioni $q = 20$ e $q = 60$. Fra $20$ e $60$ pezzi l'azienda guadagna, fuori perde.

[[grafico:gRedditivita]]

Il grafico del profitto mostra le stesse cose in un altro modo. Il vertice è il massimo, gli zeri sono i pareggi. Per $q = 0$ il profitto vale $-600$ €: senza vendere niente perdi i costi fissi.

[[grafico:gProfitto]]

>! Il profitto massimo non sta dove il ricavo è massimo. Il ricavo è massimo con $q = 50$, ma lì $P(50) = 150$ €, meno di $200$.

>! Il vertice deve stare nel **dominio economico**. Se la capacità produttiva fosse di $30$ pezzi, il vertice non si potrebbe raggiungere. Fino a $30$ la parabola sale, e il massimo sarebbe $P(30) = 150$ €.

> Il vertice sta sempre a metà fra i due pareggi: $\frac{20 + 60}{2} = 40$. È un buon controllo dei conti.

?? Un'azienda vende a prezzo fisso e ha il costo lineare. Il suo profitto ha un massimo nel vertice?
[ ] Sì, il profitto ha sempre un vertice.
[x] No: il profitto è una retta, e cresce fino alla capacità produttiva.
[ ] No: il profitto è sempre negativo.
=> $R(q) = pq$ e $C(q) = C_F + cq$ sono rette, quindi anche $P(q) = (p - c)q - C_F$ è una retta. Se $p > c$ sale sempre: il massimo sta all'estremo del dominio, cioè alla capacità produttiva.` },

    { id: 'marginali', titolo: 'Costo marginale e ricavo marginale', testo: R`Questa sezione e la prossima usano le **derivate**: le regole sono nell'argomento «Derivate». I problemi di massimo e di minimo in generale sono in «Studio di funzione».

>* Il **costo marginale** è la derivata del costo totale, $C'(q)$. Dice quanto costa, circa, **un pezzo in più**. Il **ricavo marginale** $R'(q)$ dice quanto si incassa in più vendendo un pezzo in più.

Perché «circa»? La derivata è la pendenza della tangente. Per un passo di un pezzo vale $C(q + 1) - C(q) \approx C'(q)$.

~ C(q) = 0{,}5q^2 + 2q + 200 :: il costo dei vasi
~ C'(q) = \evid{q + 2} :: derivo termine per termine
~ C'(20) = \evidb{22} :: il ventunesimo vaso costa circa $22$ euro
~ C(21) - C(20) = 462{,}5 - 440 = 22{,}5 :: il conto esatto: quasi uguale

### Il profitto massimo con le derivate

Il profitto è massimo dove la sua derivata passa da $+$ a $-$. E la derivata del profitto è $P'(q) = R'(q) - C'(q)$.

>* Il profitto massimo si ha dove **ricavo marginale e costo marginale sono uguali**: $$R'(q) = C'(q).$$ Prima conviene produrre di più, perché un pezzo in più rende più di quanto costa. Dopo non conviene più.

Con $R(q) = -0{,}5q^2 + 50q$ e $C(q) = 10q + 600$:

~ R'(q) = -q + 50, \quad C'(q) = 10 :: le due derivate
~ -q + 50 = 10 :: ricavo marginale uguale a costo marginale
~ q = \evidb{40} :: lo stesso risultato del vertice
~ P'(q) = 40 - q :: positiva prima di $40$, negativa dopo: è un massimo

[[grafico:gSegnoProfitto]]

Con le derivate puoi trattare anche costi che non sono parabole, per esempio un costo di terzo grado. Lì il vertice non c'è, ma la regola $R' = C'$ funziona sempre. Se il prezzo $p$ è fisso, $R'(q) = p$: conviene produrre finché il costo marginale arriva al prezzo.

>! $R' = C'$ da solo non basta. Controlla il segno di $P'$ prima e dopo, come in ogni problema di massimo.

### Costo marginale e costo medio

C'è un legame che vale sempre: **nel minimo del costo medio, il costo marginale è uguale al costo medio**. Per i vasi, $C_m(20) = 22$ e anche $C'(20) = 22$.

Il motivo sta nella derivata del costo medio, $C_m'(q) = \frac{C'(q)\,q - C(q)}{q^2}$. Si annulla quando $C'(q) = \frac{C(q)}{q}$, cioè quando il costo marginale è uguale al costo medio.

[[grafico:gMarginali]]

?? Il costo marginale a $q = 50$ è $12$ €, il ricavo marginale è $18$ €. Conviene produrre il cinquantunesimo pezzo?
[x] Sì: rende circa $18$ € e costa circa $12$ €, quindi il profitto cresce.
[ ] No: il costo marginale è positivo, quindi il profitto cala.
[ ] Non si può dire senza conoscere i costi fissi.
=> $P'(50) = 18 - 12 = 6 > 0$: con un pezzo in più il profitto aumenta di circa $6$ €. I costi fissi non cambiano con $q$, quindi non entrano nelle derivate.` },

    { id: 'elasticita', titolo: 'L\'elasticità della domanda', testo: R`Una domanda può reagire tanto o poco al prezzo. Il pane si compra anche se rincara un po'. Un viaggio di piacere, invece, si rimanda. L'**elasticità** misura questa reazione con le percentuali.

>* L'**elasticità della domanda** è il rapporto fra la variazione percentuale della quantità e quella del prezzo, cambiato di segno: $$\varepsilon = -\frac{\Delta q / q}{\Delta p / p}.$$ Il segno meno serve ad avere un numero positivo: $q$ e $p$ cambiano in versi opposti.

> Alcuni libri non mettono il meno: lì l'elasticità della domanda è negativa, e si confronta $|\varepsilon|$ con $1$. Le conclusioni sono le stesse.

Con la domanda $q = 100 - 2p$, porta il prezzo da $20$ a $21$ €. Il prezzo sale del $5\%$. La quantità passa da $60$ a $58$: cala di circa il $3{,}33\%$.

~ \varepsilon = \frac{3{,}33\%}{5\%} \approx \evidb{0{,}67} :: la quantità cambia meno del prezzo

Se $\Delta p$ tende a zero, il rapporto $\frac{\Delta q}{\Delta p}$ diventa la derivata. Si ottiene l'**elasticità puntuale**: $$\varepsilon(p) = -q'(p) \cdot \frac{p}{q(p)}.$$

~ q'(p) = -2 :: la derivata della domanda
~ \varepsilon(p) = \frac{2p}{100 - 2p} :: l'elasticità a ogni prezzo
~ \varepsilon(20) = \frac{40}{60} \approx \evidb{0{,}67} :: lo stesso valore di prima

>* Se $\varepsilon < 1$ la domanda è **rigida** (o anelastica): la quantità cambia meno del prezzo. Se $\varepsilon > 1$ è **elastica**: cambia di più. Se $\varepsilon = 1$ l'elasticità è **unitaria**.

| prezzo $p$ (€) | $\varepsilon(p)$ | domanda |
|---|---|---|
| $20$ | $0{,}67$ | rigida |
| $24$ | $0{,}92$ | rigida |
| $25$ | $1$ | unitaria |
| $30$ | $1{,}5$ | elastica |

[[grafico:gElasticita]]

L'elasticità dice come cambia il **ricavo**. Con una domanda rigida, alzare il prezzo fa salire il ricavo. Con una domanda elastica lo fa scendere. Il ricavo è massimo dove $\varepsilon = 1$: qui a $25$ €, come nella sezione sul ricavo.

Infatti $R(p) = p \cdot q(p)$ ha derivata $R'(p) = q + p\,q' = q\,(1 - \varepsilon)$. Si annulla proprio per $\varepsilon = 1$.

> Per la domanda iperbolica $q = \frac{k}{p}$ l'elasticità vale $1$ a ogni prezzo. È la domanda di chi spende sempre la stessa somma: il ricavo resta $k$.

>! Una retta di domanda **non** ha la stessa elasticità dappertutto. La pendenza è costante, ma il rapporto $\frac{p}{q}$ cambia lungo la retta.

?? A $30$ € la domanda di un bene ha elasticità $1{,}5$. Conviene alzare il prezzo per incassare di più?
[ ] Sì: con un prezzo più alto si incassa sempre di più.
[x] No: la quantità cala più del prezzo, e il ricavo scende.
[ ] Sì, perché $1{,}5$ è maggiore di $1$.
=> Con $\varepsilon > 1$ la domanda è elastica. Se il prezzo sale dell'$1\%$, la quantità cala di circa l'$1{,}5\%$: il ricavo diminuisce.` }
  ],

  grafici: {
    /* ---- domanda e offerta: q in orizzontale, p in verticale ---- */
    gDomanda: conPiano(PIANO_DO, {
      parametri: [{ nome: 'pr', min: 0, max: 50, passo: 1, valore: 20, nascosto: true }],
      funzioni: [{ f: '50 - x/2', colore: 1, dominio: [0, 100] }],
      punti: [
        { x: 0, y: 50, etichetta: 'prezzo massimo', posizione: 'basso-destra', colore: 1 },
        { x: 100, y: 0, etichetta: 'q = 100', posizione: 'alto-destra', colore: 1 }
      ],
      elementi: [
        { tipo: 'segmento', da: ['100 - 2*pr', 0], a: ['100 - 2*pr', 'pr'], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: [0, 'pr'], a: ['100 - 2*pr', 'pr'], tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [64, 27], testo: 'q = 100 − 2p', ancora: 'start' },
        { tipo: 'punto', p: ['100 - 2*pr', 'pr'], trascina: true, etichetta: 'A', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [56, 50], testo: 'p = {{pr}} €    q = {{100 - 2*pr}}', ancora: 'start' }
      ],
      didascalia: 'La domanda q = 100 − 2p, con il prezzo p in verticale e la quantità q in orizzontale. Il punto A scorre sulla retta: a ogni prezzo corrisponde la quantità domandata. Più il prezzo è alto, più A sta a sinistra. A prezzo zero si ha la domanda massima, 100 pezzi.'
    }),
    gIperbolica: conPiano(PIANO_DO, {
      proporzioni: 'libere',
      parametri: [{ nome: 'qq', min: 12, max: 100, passo: 1, valore: 30, nascosto: true }],
      funzioni: [{ f: '600/x', colore: 1, dominio: [10.9, 110] }],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], ['qq', 0], ['qq', '600/qq'], [0, '600/qq']], colore: 3 },
        { tipo: 'punto', p: ['qq', '600/qq'], trascina: true, etichetta: 'A', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [56, 50], testo: 'p = {{600/qq}} €    q = {{qq}}', ancora: 'start' },
        { tipo: 'testo', p: [56, 44], testo: 'area = p · q = 600 €', ancora: 'start' }
      ],
      didascalia: 'La domanda iperbolica q = 600/p. Il rettangolo sotto A ha base q e altezza p: la sua area è la spesa totale p · q, e resta sempre 600 €.'
    }),
    gEquilibrio: conPiano(PIANO_DO, {
      parametri: [{ nome: 's', min: 0, max: 30, passo: 1, valore: 0, etichetta: 'pezzi offerti in più' }],
      funzioni: [
        { f: '50 - x/2', colore: 1, dominio: [0, 100] },
        { f: '(x + 20 - s)/3', colore: 2 }
      ],
      elementi: [
        { tipo: 'retta', m: 1 / 3, q: 20 / 3, tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: ['100 - 2*(120 - s)/5', 0], a: ['100 - 2*(120 - s)/5', '(120 - s)/5'], tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: [0, '(120 - s)/5'], a: ['100 - 2*(120 - s)/5', '(120 - s)/5'], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['100 - 2*(120 - s)/5', '(120 - s)/5'], etichetta: 'E', posizione: 'alto', colore: 3 },
        { tipo: 'testo', p: [86, 11], testo: 'domanda' },
        { tipo: 'testo', p: [100, 44], testo: 'offerta', ancora: 'end' },
        { tipo: 'testo', p: [11, 52], testo: 'equilibrio:  p = {{(120 - s)/5}} €,  q = {{100 - 2*(120 - s)/5}}', ancora: 'start' }
      ],
      didascalia: 'Domanda (blu) e offerta (arancio). L\'equilibrio E sta all\'incrocio: p = 24 €, q = 52. Con più pezzi offerti a ogni prezzo l\'offerta si sposta a destra (il tratteggio viola è quella di partenza) e il prezzo di equilibrio scende. Con 15 pezzi in più: p = 21 €, q = 58.'
    }),
    gEccesso: conPiano(PIANO_DO, {
      parametri: [{ nome: 'pr', min: 8, max: 36, passo: 1, valore: 30, etichetta: 'prezzo p (€)' }],
      funzioni: [
        { f: '50 - x/2', colore: 1, dominio: [0, 100] },
        { f: '(x + 20)/3', colore: 2 }
      ],
      elementi: [
        { tipo: 'orizzontale', y: 'pr', tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: ['100 - 2*pr', 'pr'], a: ['3*pr - 20', 'pr'], colore: 3 },
        { tipo: 'punto', p: ['100 - 2*pr', 'pr'], etichetta: 'D', posizione: 'basso', colore: 1 },
        { tipo: 'punto', p: ['3*pr - 20', 'pr'], etichetta: 'O', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [44, 53], testo: 'domanda {{100 - 2*pr}}    offerta {{3*pr - 20}}', ancora: 'start' },
        { tipo: 'testo', p: [44, 46], testo: 'eccesso di offerta: {{(5*pr - 120 + abs(5*pr - 120))/2}}', ancora: 'start' },
        { tipo: 'testo', p: [44, 39], testo: 'eccesso di domanda: {{(120 - 5*pr + abs(120 - 5*pr))/2}}', ancora: 'start' }
      ],
      didascalia: 'A un prezzo diverso da 24 € la domanda D e l\'offerta O non coincidono. Sopra l\'equilibrio l\'offerta supera la domanda: eccesso di offerta. Sotto, la domanda supera l\'offerta: eccesso di domanda. Il segmento verde è la differenza, in pezzi.'
    }),

    /* ---- costi ---- */
    /* gli importi grandi stanno sull'asse in migliaia (o centinaia) di euro: le tacche a quattro cifre verrebbero tagliate */
    gCosti: {
      tipo: 'piano', altezza: 380, x: [0, 400], y: [0, 5], passo: [50, 1], etichette: { x: 'q', y: 'migliaia di €' }, mirino: false,
      funzioni: [{ f: '(2000 + 5x)/1000', colore: 2 }],
      elementi: [
        { tipo: 'area', f: '2', g: '0', da: 0, a: 400, colore: 4 },
        { tipo: 'area', f: '(2000 + 5x)/1000', g: '2', da: 0, a: 400, colore: 2 },
        { tipo: 'orizzontale', y: 2, tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [0, 2], colore: 2 },
        { tipo: 'testo', p: [200, 1], testo: 'costi fissi: 2000 €' },
        { tipo: 'testo', p: [300, 2.65], testo: 'costi variabili: 5q' },
        { tipo: 'testo', p: [30, 4.3], testo: 'C(q) = 2000 + 5q', ancora: 'start' }
      ],
      didascalia: 'Il costo delle magliette, C(q) = 2000 + 5q, in migliaia di euro. La fascia viola sono i costi fissi, uguali per ogni q. Quella arancio sono i costi variabili, che crescono di 5 € a pezzo. La retta del costo totale parte da 2000 €, non dall\'origine.'
    },
    gCostoMedio: {
      tipo: 'piano', x: [0, 60], y: [0, 60], passo: [10, 10], etichette: { x: 'q', y: 'euro' }, mirino: false,
      funzioni: [{ f: '0.5x + 2 + 200/x', colore: 1, dominio: [3.7, 60] }],
      elementi: [
        { tipo: 'retta', m: 0.5, q: 2, tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: [20, 0], a: [20, 22], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: [20, 22], etichetta: 'minimo (20; 22)', posizione: 'basso-destra', colore: 2 },
        { tipo: 'testo', p: [52, 19], testo: '0,5q + 2' },
        { tipo: 'testo', p: [12, 52], testo: 'Cₘ(q) = 0,5q + 2 + 200/q', ancora: 'start' }
      ],
      didascalia: 'Il costo medio dei vasi, Cₘ(q) = 0,5q + 2 + 200/q. Con pochi vasi pesano i costi fissi e la curva scende. Con tanti vasi pesa il termine 0,5q, e la curva risale verso la retta tratteggiata. Il minimo è 22 € a vaso, con 20 vasi.'
    },
    gRaggio: {
      tipo: 'piano', altezza: 400, x: [0, 40], y: [0, 1.1], passo: [5, 0.1], etichette: { x: 'q', y: 'migliaia di €' }, mirino: false,
      parametri: [{ nome: 'qq', min: 2, max: 40, passo: 1, valore: 8, nascosto: true }],
      funzioni: [{ f: '(0.5x^2 + 2x + 200)/1000', colore: 2, dominio: [0, 40] }],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: ['qq', '(0.5*qq^2 + 2*qq + 200)/1000'], colore: 1 },
        { tipo: 'punto', p: ['qq', '(0.5*qq^2 + 2*qq + 200)/1000'], trascina: true, etichetta: 'A', posizione: 'alto-sinistra', colore: 1 },
        { tipo: 'testo', p: [9, 1.03], testo: 'C({{qq}}) = {{0.5*qq^2 + 2*qq + 200}} €    Cₘ = {{0.5*qq + 2 + 200/qq}} €', ancora: 'start' }
      ],
      didascalia: 'Il costo totale dei vasi (arancio, in migliaia di euro) e il segmento OA. La pendenza di OA è C(q)/q, cioè il costo medio. Il segmento è meno ripido quando tocca la curva senza attraversarla: succede con 20 vasi, e il costo medio vale 22 €.'
    },

    /* ---- ricavo, pareggio, profitto ---- */
    gRicavo: {
      tipo: 'piano', altezza: 400, x: [0, 110], y: [0, 1.6], passo: [10, 0.2], etichette: { x: 'q', y: 'migliaia di €' }, mirino: false,
      parametri: [{ nome: 'qq', min: 0, max: 100, passo: 1, valore: 30, nascosto: true }],
      funzioni: [{ f: '(50x - 0.5x^2)/1000', colore: 1, dominio: [0, 100] }],
      elementi: [
        { tipo: 'segmento', da: ['qq', 0], a: ['qq', '(50*qq - 0.5*qq^2)/1000'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: [50, 1.25], etichetta: 'V', posizione: 'alto', colore: 1 },
        { tipo: 'punto', p: ['qq', '(50*qq - 0.5*qq^2)/1000'], trascina: true, etichetta: 'A', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'testo', p: [50, 0.35], testo: 'q = {{qq}}    p = {{50 - qq/2}} €    R = {{50*qq - 0.5*qq^2}} €' }
      ],
      didascalia: 'Il ricavo R(q) = 50q − 0,5q², in migliaia di euro, con il prezzo che segue la domanda q = 100 − 2p. Ogni punto A della parabola dà la quantità, il prezzo e l\'incasso. Il ricavo è massimo nel vertice V: 1250 €, con 50 pezzi a 25 €.'
    },
    gPareggio: {
      tipo: 'piano', altezza: 420, x: [0, 400], y: [0, 6], passo: [50, 1], etichette: { x: 'q', y: 'migliaia di €' }, mirino: false,
      parametri: [{ nome: 'pr', min: 12, max: 20, passo: 0.5, valore: 15, etichetta: 'prezzo di vendita (€)' }],
      funzioni: [{ f: '(2000 + 5x)/1000', colore: 2 }, { f: 'pr*x/1000', colore: 1 }],
      elementi: [
        { tipo: 'area', f: '(2000 + 5x)/1000', g: 'pr*x/1000', da: 0, a: '2000/(pr - 5)', colore: 2 },
        { tipo: 'area', f: 'pr*x/1000', g: '(2000 + 5x)/1000', da: '2000/(pr - 5)', a: 400, colore: 3 },
        { tipo: 'segmento', da: ['2000/(pr - 5)', 0], a: ['2000/(pr - 5)', '2 + 10/(pr - 5)'], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['2000/(pr - 5)', '2 + 10/(pr - 5)'], colore: 3 },
        { tipo: 'testo', p: ['2000/(pr - 5)/3', '1 + (5 + pr)*2/(pr - 5)/6'], testo: 'perdita' },
        { tipo: 'testo', p: [355, '(2000 + (5 + pr)*355)/2000'], testo: 'guadagno' },
        { tipo: 'testo', p: [395, 3.5], testo: 'C(q)', ancora: 'end' },
        { tipo: 'testo', p: ['3600/pr - 8', 3.6], testo: 'R(q) = {{pr}}q', ancora: 'end' },
        { tipo: 'testo', p: [90, 5.55], testo: 'pareggio: q = {{2000/(pr - 5)}}', ancora: 'start' }
      ],
      didascalia: 'Il diagramma di redditività delle magliette, in migliaia di euro: il costo C(q) = 2000 + 5q (arancio) e il ricavo R(q) = pq (blu). Prima del pareggio la zona arancio è la perdita, dopo la zona verde è il guadagno. A 15 € il pareggio è a 200 magliette; con un prezzo più alto arriva prima.'
    },
    gRedditivita: {
      tipo: 'piano', altezza: 400, x: [0, 110], y: [0, 1.8], passo: [10, 0.2], etichette: { x: 'q', y: 'migliaia di €' }, mirino: false,
      funzioni: [{ f: '(50x - 0.5x^2)/1000', colore: 1, dominio: [0, 100] }, { f: '(10x + 600)/1000', colore: 2 }],
      elementi: [
        { tipo: 'area', f: '(10x + 600)/1000', g: '(50x - 0.5x^2)/1000', da: 0, a: 20, colore: 2 },
        { tipo: 'area', f: '(50x - 0.5x^2)/1000', g: '(10x + 600)/1000', da: 20, a: 60, colore: 3 },
        { tipo: 'area', f: '(50x - 0.5x^2)/1000', g: '(10x + 600)/1000', da: 20, a: 60, colore: 3 },   /* due volte: in scuro una sola velatura quasi non si vede */
        { tipo: 'area', f: '(10x + 600)/1000', g: '(50x - 0.5x^2)/1000', da: 60, a: 100, colore: 2 },
        { tipo: 'segmento', da: [40, 1], a: [40, 1.2], colore: 3 },
        { tipo: 'punto', p: [20, 0.8], etichetta: 'q = 20', posizione: 'alto-sinistra', colore: 3 },
        { tipo: 'punto', p: [60, 1.2], etichetta: 'q = 60', posizione: 'destra', colore: 3 },
        { tipo: 'testo', p: [104, 1.76], testo: 'C(q)', ancora: 'end' },
        { tipo: 'testo', p: [28, 1.3], testo: 'R(q)' }
      ],
      didascalia: 'Il ricavo R(q) = 50q − 0,5q² (blu) e il costo C(q) = 10q + 600 (arancio), in migliaia di euro. Le due linee si incontrano nei pareggi, a 20 e a 60 pezzi. Fra i due c\'è la zona di guadagno (verde), fuori quella di perdita. Il segmento verde a 40 pezzi è il profitto massimo, 200 €.'
    },
    gProfitto: {
      tipo: 'piano', altezza: 380, x: [0, 85], y: [-7, 3], passo: [10, 1], etichette: { x: 'q', y: 'centinaia di €' }, mirino: false,
      funzioni: [{ f: '(-0.5x^2 + 40x - 600)/100', colore: 3, dominio: [0, 80] }],
      punti: [
        { x: 40, y: 2, etichetta: 'M', posizione: 'alto', colore: 3 },
        { x: 20, y: 0, colore: 3 },
        { x: 60, y: 0, colore: 3 },
        { x: 0, y: -6, etichetta: '−600 €', posizione: 'destra', colore: 3 }
      ],
      elementi: [{ tipo: 'area', f: '(-0.5x^2 + 40x - 600)/100', g: '0', da: 20, a: 60, colore: 3 }],
      didascalia: 'Il profitto P(q) = −0,5q² + 40q − 600, in centinaia di euro: una parabola rivolta verso il basso. Taglia l\'asse q nei due pareggi, 20 e 60. Il vertice M è il profitto massimo: 200 € con 40 pezzi. Per q = 0 vale −600 €: i costi fissi persi.'
    },

    /* ---- con le derivate ---- */
    gSegnoProfitto: { tipo: 'segni', valori: ['0', '40'], variabile: 'q',
      righe: [{ nome: "P'", segni: ['', '+', '−'], zeri: [1] }],
      andamento: { nome: 'P', frecce: ['', '↗', '↘'], punti: ['', 'max'] },
      didascalia: 'Segno di P′(q) = 40 − q per q ≥ 0: positivo fino a 40, negativo dopo. Il profitto sale e poi scende: il massimo è con 40 pezzi.' },
    gMarginali: {
      tipo: 'piano', x: [0, 50], y: [0, 60], passo: [10, 10], etichette: { x: 'q', y: 'euro' }, mirino: false,
      funzioni: [{ f: '0.5x + 2 + 200/x', colore: 1, dominio: [3.7, 50] }, { f: 'x + 2', colore: 2 }],
      punti: [{ x: 20, y: 22, etichetta: '(20; 22)', posizione: 'basso-destra', colore: 3 }],
      elementi: [
        { tipo: 'testo', p: [9, 40], testo: 'Cₘ(q)' },
        { tipo: 'testo', p: [43, 52], testo: 'C′(q) = q + 2', ancora: 'end' }
      ],
      didascalia: 'Il costo medio Cₘ(q) (blu) e il costo marginale C′(q) = q + 2 (arancio) dei vasi. Il costo marginale attraversa il costo medio proprio nel suo minimo, (20; 22). Prima il costo medio scende, dopo risale.'
    },
    gElasticita: conPiano(PIANO_DO, {
      parametri: [{ nome: 'pr', min: 2, max: 45, passo: 1, valore: 20, nascosto: true }],
      elementi: [
        { tipo: 'segmento', da: [0, 50], a: [50, 25], colore: 2 },
        { tipo: 'segmento', da: [50, 25], a: [100, 0], colore: 3 },
        { tipo: 'punto', p: [50, 25], etichetta: 'ε = 1', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [30, 44], testo: 'elastica' },
        { tipo: 'testo', p: [80, 16], testo: 'rigida' },
        { tipo: 'punto', p: ['100 - 2*pr', 'pr'], trascina: true, etichetta: 'A', posizione: 'basso-sinistra', colore: 1 },
        { tipo: 'testo', p: [56, 50], testo: 'p = {{pr}} €    ε = {{2*pr/(100 - 2*pr)}}', ancora: 'start' }
      ],
      didascalia: 'Lungo la retta di domanda q = 100 − 2p l\'elasticità cambia. Nella metà alta (arancio) la domanda è elastica, nella metà bassa (verde) è rigida. Nel punto di mezzo, p = 25 €, vale esattamente 1.'
    })
  },

  esempi: [
    { titolo: 'Equilibrio e prezzo sbagliato', problema: R`La domanda di un bene è $q = 260 - 4p$, l'offerta è $q = 6p - 40$. Trova l'equilibrio. Che cosa succede se il prezzo viene fissato a $25$ €?`, passi: [
      R`All'equilibrio la quantità domandata è uguale a quella offerta: $260 - 4p = 6p - 40$.`,
      R`Porto i termini con $p$ da una parte: $300 = 10p$, quindi $p = 30$ €.`,
      R`La quantità si trova sostituendo in una delle due: $q = 260 - 4 \cdot 30 = 140$. Controllo con l'offerta: $6 \cdot 30 - 40 = 140$. Torna.`,
      R`A $25$ € si chiedono $260 - 100 = 160$ pezzi e se ne offrono $150 - 40 = 110$. Mancano $50$ pezzi: è un eccesso di domanda.`,
      R`Con un eccesso di domanda i compratori sono disposti a pagare di più: il prezzo tende a salire verso i $30$ €.`
    ], risultato: R`Equilibrio $p = 30$ €, $q = 140$; a $25$ € c'è un eccesso di domanda di $50$ pezzi` },

    { titolo: 'Il costo medio minimo', problema: R`Un'officina produce $q$ telai di bicicletta al mese. Il costo totale, in euro, è $C(q) = 0{,}8q^2 + 12q + 2000$. Per quale produzione il costo medio è minimo? Quanto vale?`, passi: [
      R`Il costo medio è il costo totale diviso per $q$: $C_m(q) = 0{,}8q + 12 + \dfrac{2000}{q}$, per $q > 0$.`,
      R`Il termine $0{,}8q$ cresce, il termine $\dfrac{2000}{q}$ cala, e il loro prodotto è fisso: $1600$. La somma è minima quando sono uguali.`,
      R`$0{,}8q = \dfrac{2000}{q}$ dà $q^2 = 2500$, quindi $q = 50$. In alternativa: $q = \sqrt{\dfrac{c}{a}} = \sqrt{\dfrac{2000}{0{,}8}} = 50$.`,
      R`$C_m(50) = 40 + 12 + 40 = 92$ € a telaio.`,
      R`Controllo vicino: $C_m(40) = 32 + 12 + 50 = 94$ € e $C_m(60) = 48 + 12 + 33{,}33 \approx 93{,}33$ €. Tutti e due più alti: il minimo è giusto.`
    ], risultato: R`Costo medio minimo $92$ € a telaio, con $50$ telai al mese` },

    { titolo: 'Pareggio e capacità produttiva', problema: R`Un'azienda ha $4500$ € di costi fissi al mese e spende $9$ € per ogni pezzo. Vende a $15$ € e può produrre al massimo $1000$ pezzi al mese. Trova il pareggio e il profitto massimo. Quanti pezzi servono per guadagnare $1200$ €?`, passi: [
      R`Costo e ricavo sono rette: $C(q) = 4500 + 9q$ e $R(q) = 15q$, con $0 \le q \le 1000$.`,
      R`Ogni pezzo copre $15 - 9 = 6$ € di costi fissi. Il pareggio è $q = \dfrac{4500}{6} = 750$ pezzi, dentro la capacità.`,
      R`Il profitto $P(q) = 6q - 4500$ è una retta che sale: il massimo sta alla capacità piena. $P(1000) = 6000 - 4500 = 1500$ €.`,
      R`Per guadagnare $1200$ €: $6q - 4500 = 1200$, cioè $6q = 5700$ e $q = 950$ pezzi.`,
      R`Controllo con il costo medio: a $1000$ pezzi $C_m = 4{,}5 + 9 = 13{,}5$ €, meno del prezzo di $15$ €. Ogni pezzo in media porta $1{,}5$ €, e $1{,}5 \cdot 1000 = 1500$. Torna.`
    ], risultato: R`Pareggio a $750$ pezzi; profitto massimo $1500$ € a capacità piena; $950$ pezzi per guadagnare $1200$ €` },

    { titolo: 'Un monopolista sceglie il prezzo', problema: R`Un'azienda è l'unica a vendere un prodotto. La domanda è $q = 120 - 2p$ e il costo è $C(q) = 12q + 640$. Trova i pareggi, la quantità che rende massimo il profitto, il prezzo da fissare e il profitto massimo.`, passi: [
      R`Il prezzo si ricava dalla domanda: $2p = 120 - q$, quindi $p = 60 - \dfrac{q}{2}$.`,
      R`Il ricavo è $R(q) = \left(60 - \dfrac{q}{2}\right) q = 60q - 0{,}5q^2$.`,
      R`Il profitto è $P(q) = 60q - 0{,}5q^2 - 12q - 640 = -0{,}5q^2 + 48q - 640$: una parabola rivolta verso il basso.`,
      R`Pareggi: moltiplico $P(q) = 0$ per $-2$ e ottengo $q^2 - 96q + 1280 = 0$. Le soluzioni sono $q = 16$ e $q = 80$, perché $16 + 80 = 96$ e $16 \cdot 80 = 1280$.`,
      R`Il vertice sta a metà fra i pareggi: $q = \dfrac{16 + 80}{2} = 48$. Con la formula: $-\dfrac{48}{2 \cdot (-0{,}5)} = 48$.`,
      R`$P(48) = -1152 + 2304 - 640 = 512$ €, con il prezzo $p = 60 - 24 = 36$ €.`
    ], risultato: R`Pareggi a $16$ e $80$ pezzi; profitto massimo $512$ € con $48$ pezzi venduti a $36$ €` },

    { titolo: 'Un costo di terzo grado, con le derivate', problema: R`Un'azienda vende un prodotto a $120$ € al quintale. Il costo di produzione di $q$ quintali, in euro, è $C(q) = q^3 - 12q^2 + 60q + 100$. Quanti quintali conviene produrre?`, passi: [
      R`Il profitto è $P(q) = 120q - C(q)$. Non è una parabola: per il massimo servono le derivate.`,
      R`Il ricavo marginale è $R'(q) = 120$, perché il prezzo è fisso. Il costo marginale è $C'(q) = 3q^2 - 24q + 60$.`,
      R`Impongo $R'(q) = C'(q)$: $3q^2 - 24q + 60 = 120$, cioè $q^2 - 8q - 20 = 0$. Le soluzioni sono $q = 10$ e $q = -2$, che non ha senso.`,
      R`Controllo il segno: $P'(q) = 120 - C'(q) = -3(q - 10)(q + 2)$. Per $0 \le q < 10$ è positiva, dopo è negativa: in $q = 10$ c'è il massimo.`,
      R`$C(10) = 1000 - 1200 + 600 + 100 = 500$ €, quindi $P(10) = 1200 - 500 = 700$ €.`
    ], risultato: R`Conviene produrre $10$ quintali; il profitto massimo è $700$ €` },

    { titolo: 'Elasticità e ricavo', problema: R`La domanda di un bene è $q = 280 - 4p$. Calcola l'elasticità a $20$ € e a $50$ €. Per quale prezzo l'elasticità è unitaria? Confronta i ricavi.`, passi: [
      R`La derivata della domanda è $q'(p) = -4$, quindi $\varepsilon(p) = 4 \cdot \dfrac{p}{280 - 4p}$.`,
      R`$\varepsilon(20) = \dfrac{80}{200} = 0{,}4$: domanda rigida. $\varepsilon(50) = \dfrac{200}{80} = 2{,}5$: domanda elastica.`,
      R`Elasticità unitaria: $4p = 280 - 4p$, cioè $8p = 280$ e $p = 35$ €.`,
      R`Ricavi: $R(20) = 20 \cdot 200 = 4000$ €, $R(35) = 35 \cdot 140 = 4900$ €, $R(50) = 50 \cdot 80 = 4000$ €.`,
      R`Da $20$ a $35$ € la domanda è rigida e il ricavo sale. Da $35$ a $50$ € è elastica e il ricavo scende. Il massimo sta dove $\varepsilon = 1$.`
    ], risultato: R`$\varepsilon(20) = 0{,}4$, $\varepsilon(50) = 2{,}5$; elasticità unitaria e ricavo massimo, $4900$ €, a $35$ €` }
  ],

  formulario: [
    { nome: 'Domanda lineare', formula: R`q = a - b\,p \qquad (a > 0,\ b > 0)`, nota: R`$a$ è la domanda massima (a prezzo zero), $\frac{a}{b}$ il prezzo massimo. Nei grafici $p$ sta in verticale.` },
    { nome: 'Domanda iperbolica', formula: R`q = \frac{k}{p} \qquad p \cdot q = k`, nota: R`La spesa totale è sempre $k$; l'elasticità vale $1$ a ogni prezzo.` },
    { nome: 'Prezzo di equilibrio', formula: R`\text{domanda}(p) = \text{offerta}(p)`, nota: R`Trovato $p$, la quantità si ottiene sostituendo in una delle due funzioni.` },
    { nome: 'Costo totale', formula: R`C(q) = C_F + C_V(q) \qquad C(q) = C_F + c\,q`, nota: R`La seconda forma vale quando ogni pezzo costa sempre $c$ (costo variabile unitario).` },
    { nome: 'Costo medio unitario', formula: R`C_m(q) = \frac{C(q)}{q}`, nota: R`Per $q > 0$. Con il costo lineare: $C_m(q) = \frac{C_F}{q} + c$.` },
    { nome: 'Minimo del costo medio', formula: R`C_m(q) = aq + b + \frac{c}{q} \ \Rightarrow \ q_{\min} = \sqrt{\frac{c}{a}}`, nota: R`Con $a > 0$ e $c > 0$: il minimo sta dove $aq = \frac{c}{q}$.` },
    { nome: 'Ricavo', formula: R`R = p \cdot q`, nota: R`Con il prezzo fisso è una retta per l'origine; se il prezzo segue una domanda lineare è una parabola. Con la domanda iperbolica è costante.` },
    { nome: 'Profitto', formula: R`P(q) = R(q) - C(q)`, nota: R`Il costo va sottratto tutto: attenzione alla parentesi.` },
    { nome: 'Punto di pareggio', formula: R`R(q) = C(q) \qquad q = \frac{C_F}{p - c}`, nota: R`La seconda formula vale con prezzo fisso e costo lineare. I pezzi si arrotondano per eccesso.` },
    { nome: 'Vertice della parabola', formula: R`q_V = -\frac{b}{2a}`, nota: R`Per $P(q) = aq^2 + bq + c$ con $a < 0$: il profitto massimo, se $q_V$ sta nel dominio economico. Attenzione alle lettere: qui $a$, $b$, $c$ sono i coefficienti della parabola; in $C_F + c\,q$ la $c$ è il costo unitario, in $aq + b + \frac{c}{q}$ è il coefficiente di $\frac{1}{q}$ (i costi fissi).` },
    { nome: 'Profitto massimo con le derivate', formula: R`R'(q) = C'(q)`, nota: R`Ricavo marginale uguale a costo marginale; poi si controlla il segno di $P'$.` },
    { nome: 'Elasticità della domanda', formula: R`\varepsilon = -\frac{\Delta q / q}{\Delta p / p} \qquad \varepsilon(p) = -q'(p)\cdot\frac{p}{q(p)}`, nota: R`$\varepsilon < 1$ rigida, $\varepsilon > 1$ elastica, $\varepsilon = 1$ unitaria.` },
    { nome: 'Ricavo ed elasticità', formula: R`R'(p) = q\,(1 - \varepsilon)`, nota: R`Il ricavo cresce col prezzo se la domanda è rigida, cala se è elastica, è massimo per $\varepsilon = 1$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'domanda', tipo: 'definizione', fronte: R`Funzione della domanda`, retro: R`Lega la quantità domandata $q$ al prezzo $p$: $q = f(p)$. Di solito è decrescente: più il prezzo sale, meno si compra.` },
    { id: 'fc-02', sezione: 'domanda', tipo: 'concetto', fronte: R`Nella domanda $q = a - bp$, che cosa sono $a$ e $\frac{a}{b}$?`, retro: R`$a$ è la domanda massima, a prezzo zero. $\frac{a}{b}$ è il prezzo massimo: oltre quel prezzo la domanda si annulla.` },
    { id: 'fc-03', sezione: 'domanda', tipo: 'concetto', fronte: R`Nei grafici di domanda e offerta, su quale asse va il prezzo?`, retro: R`Sull'asse verticale; la quantità $q$ va su quello orizzontale. È la convenzione dei libri di economia.` },
    { id: 'fc-04', sezione: 'domanda', tipo: 'definizione', fronte: R`Domanda iperbolica`, retro: R`$q = \frac{k}{p}$: la spesa totale $p \cdot q$ vale sempre $k$. Il grafico è un ramo d'iperbole che non tocca gli assi.` },
    { id: 'fc-05', sezione: 'equilibrio', tipo: 'definizione', fronte: R`Prezzo di equilibrio`, retro: R`Il prezzo a cui la quantità domandata è uguale a quella offerta. Nel grafico è l'incrocio delle due linee.` },
    { id: 'fc-06', sezione: 'equilibrio', tipo: 'procedura', fronte: R`Come si trova l'equilibrio fra la domanda $q = f(p)$ e l'offerta $q = g(p)$?`, retro: R`Si risolve $f(p) = g(p)$ e si trova $p$. Poi si sostituisce $p$ in una delle due funzioni per avere $q$.` },
    { id: 'fc-07', sezione: 'equilibrio', tipo: 'concetto', fronte: R`Eccesso di offerta`, retro: R`Al prezzo fissato l'offerta supera la domanda e la merce resta invenduta. Succede sopra il prezzo di equilibrio: il prezzo tende a scendere.` },
    { id: 'fc-08', sezione: 'costi', tipo: 'definizione', fronte: R`Costi fissi e costi variabili`, retro: R`I fissi non dipendono dalla quantità (affitto, macchinari). I variabili crescono con i pezzi prodotti (materie prime, energia).` },
    { id: 'fc-09', sezione: 'costi', tipo: 'formula', fronte: R`Costo totale lineare`, retro: R`$C(q) = C_F + c\,q$: costi fissi più il costo variabile unitario per i pezzi. È una retta che parte da $C_F$, non dall'origine.` },
    { id: 'fc-10', sezione: 'costo-medio', tipo: 'formula', fronte: R`Costo medio unitario`, retro: R`$C_m(q) = \frac{C(q)}{q}$, per $q > 0$: quanto costa in media ogni pezzo.` },
    { id: 'fc-11', sezione: 'costo-medio', tipo: 'procedura', fronte: R`Minimo del costo medio $C_m(q) = aq + b + \frac{c}{q}$`, retro: R`Sta dove $aq = \frac{c}{q}$, cioè in $q = \sqrt{\frac{c}{a}}$ (con $a$ e $c$ positivi).` },
    { id: 'fc-12', sezione: 'costo-medio', tipo: 'concetto', fronte: R`Come si legge il costo medio sul grafico del costo totale?`, retro: R`È la pendenza del segmento che va dall'origine al punto $(q; C(q))$.` },
    { id: 'fc-13', sezione: 'ricavo', tipo: 'formula', fronte: R`Ricavo`, retro: R`$R = p \cdot q$. Con il prezzo fisso è una retta per l'origine; se il prezzo segue una domanda lineare è una parabola rivolta verso il basso.` },
    { id: 'fc-14', sezione: 'ricavo', tipo: 'procedura', fronte: R`Come si scrive il ricavo in funzione di $q$ quando il prezzo dipende dalla domanda?`, retro: R`Si ricava $p$ dalla domanda e si moltiplica per $q$. Con $q = 100 - 2p$: $p = 50 - \frac{q}{2}$ e $R(q) = 50q - 0{,}5q^2$.` },
    { id: 'fc-15', sezione: 'pareggio', tipo: 'definizione', fronte: R`Punto di pareggio (break-even point)`, retro: R`La quantità per cui ricavo e costo sono uguali, cioè il profitto è zero. Oltre il pareggio si guadagna.` },
    { id: 'fc-16', sezione: 'pareggio', tipo: 'formula', fronte: R`Pareggio con prezzo fisso $p$, costi fissi $C_F$ e costo unitario $c$`, retro: R`$q = \frac{C_F}{p - c}$. Se non viene intero, si arrotonda per eccesso.` },
    { id: 'fc-17', sezione: 'pareggio', tipo: 'definizione', fronte: R`Diagramma di redditività`, retro: R`Il grafico con le linee del costo e del ricavo: mostra il pareggio, la zona di perdita e la zona di guadagno.` },
    { id: 'fc-18', sezione: 'profitto-massimo', tipo: 'procedura', fronte: R`Profitto a parabola $P(q) = aq^2 + bq + c$, con $a < 0$: dov'è il massimo?`, retro: R`Nel vertice, $q_V = -\frac{b}{2a}$, se sta nel dominio economico. Altrimenti all'estremo del dominio più vicino al vertice.` },
    { id: 'fc-19', sezione: 'profitto-massimo', tipo: 'concetto', fronte: R`Il profitto massimo sta dove il ricavo è massimo?`, retro: R`No: il ricavo non tiene conto dei costi. Di solito il profitto massimo arriva con meno pezzi.` },
    { id: 'fc-20', sezione: 'marginali', tipo: 'definizione', fronte: R`Costo marginale`, retro: R`La derivata $C'(q)$: circa quanto costa produrre un pezzo in più. $C(q + 1) - C(q) \approx C'(q)$.` },
    { id: 'fc-21', sezione: 'marginali', tipo: 'formula', fronte: R`Condizione del profitto massimo con le derivate`, retro: R`$R'(q) = C'(q)$: ricavo marginale uguale a costo marginale, con $P'$ che passa da $+$ a $-$.` },
    { id: 'fc-22', sezione: 'marginali', tipo: 'concetto', fronte: R`Che relazione c'è fra costo marginale e costo medio, nel minimo del costo medio?`, retro: R`Sono uguali: nel minimo di $C_m$ vale $C'(q) = C_m(q)$.` },
    { id: 'fc-23', sezione: 'elasticita', tipo: 'formula', fronte: R`Elasticità puntuale della domanda`, retro: R`$\varepsilon(p) = -q'(p) \cdot \frac{p}{q(p)}$: variazione percentuale della quantità su quella del prezzo, cambiata di segno.` },
    { id: 'fc-24', sezione: 'elasticita', tipo: 'definizione', fronte: R`Domanda rigida, elastica, unitaria`, retro: R`Rigida se $\varepsilon < 1$, elastica se $\varepsilon > 1$, unitaria se $\varepsilon = 1$.` },
    { id: 'fc-25', sezione: 'elasticita', tipo: 'concetto', fronte: R`Elasticità e ricavo`, retro: R`Domanda rigida: alzare il prezzo fa salire il ricavo. Elastica: lo fa scendere. Il ricavo è massimo dove $\varepsilon = 1$.` }
  ],

  esercizi: [
    /* ---- allenamento ---- */
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`La domanda di un bene è $q = 120 - 3p$. Quanti pezzi si chiedono al prezzo di $15$ €?`, suggerimenti: [R`Sostituisci $p = 15$ nella domanda.`], risposta: pezzi(75), soluzione: [R`$q = 120 - 3 \cdot 15 = 120 - 45 = 75$ pezzi.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`La domanda di un bene è $q = 90 - 2p$. Qual è il prezzo massimo, oltre il quale nessuno compra?`, suggerimenti: [R`Il prezzo massimo è quello per cui la domanda vale zero.`], risposta: euro(45), soluzione: [R`$90 - 2p = 0$, quindi $p = 45$ €.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`L'offerta di un bene è $q = 4p - 24$. Sotto quale prezzo i produttori non offrono niente?`, suggerimenti: [R`Cerca il prezzo per cui l'offerta vale zero.`], risposta: euro(6), soluzione: [R`$4p - 24 = 0$ per $p = 6$ €.`, R`Sotto i $6$ € la formula darebbe un'offerta negativa: non si vende niente.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`La domanda è $q = 150 - 3p$, l'offerta è $q = 2p - 10$. Trova il prezzo e la quantità di equilibrio. Scrivi prima $p$ e poi $q$, separati da punto e virgola.`, suggerimenti: [R`Uguaglia domanda e offerta, e trova $p$.`, R`Poi sostituisci $p$ nella domanda.`], risposta: coppia(32, 54, 'es. p = 10; q = 35'), soluzione: [R`$150 - 3p = 2p - 10$, quindi $5p = 160$ e $p = 32$ €.`, R`$q = 150 - 96 = 54$. Controllo con l'offerta: $2 \cdot 32 - 10 = 54$.`] },
    { id: 'b-05', livello: 'base', difficolta: 2, testo: R`La domanda è $q = 80 - 2p$, l'offerta è $q = 2p - 8$. Il prezzo è fissato a $25$ €. Di quanti pezzi una quantità supera l'altra?`, suggerimenti: [R`Calcola domanda e offerta a $25$ €.`], risposta: pezzi(12), soluzione: [R`Domanda: $80 - 50 = 30$ pezzi. Offerta: $50 - 8 = 42$ pezzi.`, R`L'offerta supera la domanda di $12$ pezzi: è un eccesso di offerta, e il prezzo tenderà a scendere.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Un'azienda ha $1200$ € di costi fissi e spende $8$ € per ogni pezzo. Quanto costa produrre $150$ pezzi?`, suggerimenti: [R`Il costo totale è $C(q) = 1200 + 8q$.`], risposta: euro(2400), soluzione: [R`$C(q) = 1200 + 8q$.`, R`$C(150) = 1200 + 1200 = 2400$ €.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Il costo è $C(q) = 1200 + 8q$. Quanto vale il costo medio unitario se si producono $300$ pezzi?`, suggerimenti: [R`Dividi il costo totale per il numero di pezzi.`], risposta: euro(12), soluzione: [R`$C(300) = 1200 + 2400 = 3600$ €.`, R`$C_m(300) = \frac{3600}{300} = 12$ € a pezzo.`] },
    { id: 'b-08', livello: 'base', difficolta: 2, testo: R`Un costo totale è lineare. Produrre $200$ pezzi costa $3400$ €, produrne $300$ costa $4000$ €. Quanto sono i costi fissi?`, suggerimenti: [R`$100$ pezzi in più costano $600$ € in più: trova il costo di un pezzo.`, R`Togli da $3400$ € il costo variabile dei $200$ pezzi.`], risposta: euro(2200), soluzione: [R`Costo variabile unitario: $\frac{4000 - 3400}{100} = 6$ €.`, R`$C_F = 3400 - 200 \cdot 6 = 3400 - 1200 = 2200$ €.`] },
    { id: 'b-09', livello: 'base', difficolta: 2, testo: R`Il costo totale è $C(q) = 0{,}2q^2 + 3q + 320$. Per quale quantità il costo medio è minimo?`, suggerimenti: [R`Il costo medio è $C_m(q) = 0{,}2q + 3 + \frac{320}{q}$.`, R`Il minimo sta dove $0{,}2q = \frac{320}{q}$.`], risposta: pezzi(40), soluzione: [R`$0{,}2q^2 = 320$, quindi $q^2 = 1600$ e $q = 40$.`, R`Il costo medio minimo è $C_m(40) = 8 + 3 + 8 = 19$ €.`] },
    { id: 'b-10', livello: 'base', difficolta: 2, testo: R`Il costo medio è $C_m(q) = 2q + 10 + \frac{50}{q}$. Quanto vale il costo medio minimo?`, suggerimenti: [R`Il minimo sta in $q = \sqrt{\frac{c}{a}}$.`], risposta: euro(30), soluzione: [R`$q = \sqrt{\frac{50}{2}} = 5$.`, R`$C_m(5) = 10 + 10 + 10 = 30$ €.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Si vendono $250$ pezzi a $18$ € l'uno. Qual è il ricavo?`, suggerimenti: [R`Ricavo = prezzo per quantità.`], risposta: euro(4500), soluzione: [R`$R = 18 \cdot 250 = 4500$ €.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`La domanda è $q = 200 - 4p$. Quanto incassa l'azienda se fissa il prezzo a $35$ €?`, suggerimenti: [R`Prima trova quanti pezzi vende, poi moltiplica per il prezzo.`], risposta: euro(2100), soluzione: [R`$q = 200 - 140 = 60$ pezzi.`, R`$R = 35 \cdot 60 = 2100$ €.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`La domanda è $q = 240 - 4p$. Quale prezzo rende massimo il ricavo?`, suggerimenti: [R`$R(p) = p\,(240 - 4p) = -4p^2 + 240p$ è una parabola.`, R`Il massimo sta nel vertice, $-\frac{b}{2a}$.`], risposta: euro(30), soluzione: [R`$R(p) = -4p^2 + 240p$.`, R`Vertice: $p = -\frac{240}{2 \cdot (-4)} = 30$ €. Il ricavo massimo è $30 \cdot 120 = 3600$ €.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Costi fissi $1800$ €, costo variabile $4$ € a pezzo, prezzo di vendita $10$ €. Dov'è il punto di pareggio?`, suggerimenti: [R`Ogni pezzo copre $10 - 4$ euro di costi fissi.`], risposta: pezzi(300), soluzione: [R`$q = \frac{1800}{10 - 4} = \frac{1800}{6} = 300$ pezzi.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Costi fissi $1000$ €, costo variabile $3$ € a pezzo, prezzo $9$ €. Quanti pezzi bisogna vendere, come minimo, per non essere in perdita?`, suggerimenti: [R`Calcola il pareggio, e ricorda che i pezzi sono numeri interi.`], risposta: pezzi(167), soluzione: [R`$q = \frac{1000}{6} \approx 166{,}7$.`, R`Con $166$ pezzi il profitto è $6 \cdot 166 - 1000 = -4$ €: si perde ancora. Servono $167$ pezzi.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Il costo è $C(q) = 2400 + 6q$ e il prezzo di vendita è $14$ €. Quanto si guadagna vendendo $500$ pezzi?`, suggerimenti: [R`Profitto = ricavo − costo.`], risposta: euro(1600), soluzione: [R`$P(q) = 14q - (2400 + 6q) = 8q - 2400$.`, R`$P(500) = 4000 - 2400 = 1600$ €.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Il costo è $C(q) = 2500 + 7q$ e il prezzo è $12$ €. Quanti pezzi bisogna vendere per guadagnare $900$ €?`, suggerimenti: [R`Scrivi il profitto e ponilo uguale a $900$.`], risposta: pezzi(680), soluzione: [R`$P(q) = 12q - (2500 + 7q) = 5q - 2500$.`, R`$5q - 2500 = 900$, quindi $5q = 3400$ e $q = 680$ pezzi.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Il profitto è $P(q) = -2q^2 + 120q - 1000$. Trova la quantità che lo rende massimo e il profitto massimo. Scrivi prima la quantità e poi il profitto, separati da punto e virgola.`, suggerimenti: [R`È una parabola rivolta verso il basso: il massimo sta nel vertice.`], risposta: coppia(30, 800, 'es. 15; 250'), soluzione: [R`Vertice: $q = -\frac{120}{2 \cdot (-2)} = 30$.`, R`$P(30) = -1800 + 3600 - 1000 = 800$ €.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Il costo è $C(q) = 0{,}1q^2 + 5q + 400$. Calcola il costo marginale per $q = 30$.`, suggerimenti: [R`Il costo marginale è la derivata $C'(q)$.`], risposta: euro(11), soluzione: [R`$C'(q) = 0{,}2q + 5$.`, R`$C'(30) = 6 + 5 = 11$ €: il trentunesimo pezzo costa circa $11$ €.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`La domanda è $q = 90 - 3p$. Calcola l'elasticità della domanda al prezzo di $10$ €.`, suggerimenti: [R`$\varepsilon(p) = -q'(p) \cdot \frac{p}{q(p)}$, con $q'(p) = -3$.`], risposta: numero(0.5, 0.01, 'es. 1,2'), soluzione: [R`$q(10) = 90 - 30 = 60$.`, R`$\varepsilon(10) = 3 \cdot \frac{10}{60} = 0{,}5$: la domanda è rigida.`] },

    /* ---- avanzati ---- */
    { id: 'es-01', difficolta: 2, testo: R`La domanda di un bene è $q = 300 - 5p$, l'offerta è $q = 4p - 60$. Trova l'equilibrio. Poi una moda fa crescere la domanda di $27$ pezzi a ogni prezzo: trova il nuovo equilibrio. Scrivi il nuovo $p$ e il nuovo $q$, separati da punto e virgola.`, suggerimenti: [R`All'inizio: $300 - 5p = 4p - 60$.`, R`La nuova domanda è $q = 327 - 5p$.`], risposta: coppia(43, 112, 'es. p = 10; q = 35'), soluzione: [R`Equilibrio iniziale: $9p = 360$, $p = 40$ €, $q = 300 - 200 = 100$.`, R`Nuova domanda: $327 - 5p = 4p - 60$, quindi $9p = 387$ e $p = 43$ €.`, R`$q = 327 - 215 = 112$. Con più domanda salgono sia il prezzo sia la quantità.`] },
    { id: 'es-02', difficolta: 2, testo: R`La domanda di un bene è iperbolica, $q = \frac{1200}{p}$, e l'offerta è $q = p + 10$. Trova il prezzo e la quantità di equilibrio. Scrivi $p$ e $q$, separati da punto e virgola.`, suggerimenti: [R`Uguaglia le due funzioni e moltiplica per $p$.`, R`Ottieni $p^2 + 10p - 1200 = 0$.`], risposta: coppia(30, 40, 'es. p = 10; q = 35'), soluzione: [R`$\frac{1200}{p} = p + 10$; moltiplico per $p > 0$: $p^2 + 10p - 1200 = 0$.`, R`$\Delta = 100 + 4800 = 4900$, quindi $p = \frac{-10 \pm 70}{2}$: $p = 30$ oppure $p = -40$, da scartare.`, R`$q = \frac{1200}{30} = 40$, e anche $30 + 10 = 40$. L'equilibrio è $p = 30$ €, $q = 40$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Un costo totale è lineare. Con $100$ pezzi il costo medio è $30$ €, con $400$ pezzi è $12$ €. Trova i costi fissi e il costo variabile unitario. Scrivi prima i costi fissi, poi il costo unitario, separati da punto e virgola.`, suggerimenti: [R`Dal costo medio passa al costo totale: $C(100) = 30 \cdot 100$.`, R`$300$ pezzi in più fanno crescere il costo totale di quanto?`], risposta: coppia(2400, 6, 'es. 1500; 4'), soluzione: [R`$C(100) = 30 \cdot 100 = 3000$ € e $C(400) = 12 \cdot 400 = 4800$ €.`, R`$c = \frac{4800 - 3000}{300} = 6$ €.`, R`$C_F = 3000 - 100 \cdot 6 = 2400$ €. Il costo è $C(q) = 2400 + 6q$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Un'azienda ha $6000$ € di costi fissi al mese, spende $14$ € a pezzo e vende a $20$ €. Può produrre al massimo $800$ pezzi al mese. Raggiunge il pareggio? Qual è il prezzo minimo per arrivare al pareggio a capacità piena? Scrivi questo prezzo, in euro.`, suggerimenti: [R`Calcola il pareggio e confrontalo con $800$.`, R`Imponi $\frac{6000}{p - 14} = 800$.`], risposta: euro(21.5), soluzione: [R`Pareggio: $\frac{6000}{20 - 14} = 1000$ pezzi, più della capacità. Con $20$ € l'azienda perde sempre.`, R`A capacità piena il profitto è $6 \cdot 800 - 6000 = -1200$ €.`, R`Serve $p - 14 = \frac{6000}{800} = 7{,}5$, cioè $p = 21{,}50$ €.`] },
    { id: 'es-05', difficolta: 2, testo: R`Un prodotto si vende a $40$ € al pezzo. Il costo è $C(q) = 0{,}25q^2 + 10q + 500$. Trova i pareggi, la quantità che rende massimo il profitto e il profitto massimo. Scrivi la quantità e il profitto massimo, separati da punto e virgola.`, suggerimenti: [R`$P(q) = 40q - C(q) = -0{,}25q^2 + 30q - 500$.`, R`I pareggi sono gli zeri della parabola, il massimo è nel vertice.`], risposta: coppia(60, 400, 'es. 15; 250'), soluzione: [R`$P(q) = -0{,}25q^2 + 30q - 500$.`, R`Pareggi: moltiplico per $-4$, $q^2 - 120q + 2000 = 0$, quindi $q = \frac{120 \pm 80}{2}$: $20$ e $100$ pezzi.`, R`Vertice a metà: $q = 60$. $P(60) = -900 + 1800 - 500 = 400$ €.`] },
    { id: 'es-06', difficolta: 3, testo: R`Un'azienda è l'unica a vendere un prodotto. La domanda è $q = 180 - 2p$ e il costo è $C(q) = 20q + 1000$. Quale prezzo rende massimo il profitto? Quanto vale il profitto massimo? Scrivi il prezzo e il profitto, separati da punto e virgola.`, suggerimenti: [R`Ricava $p$ dalla domanda: $p = 90 - \frac{q}{2}$.`, R`Il profitto è $P(q) = -0{,}5q^2 + 70q - 1000$.`], risposta: coppia(55, 1450, 'es. 40; 900'), soluzione: [R`$R(q) = \left(90 - \frac{q}{2}\right) q = 90q - 0{,}5q^2$.`, R`$P(q) = 90q - 0{,}5q^2 - 20q - 1000 = -0{,}5q^2 + 70q - 1000$; vertice $q = 70$.`, R`Il prezzo è $p = 90 - 35 = 55$ €, e $P(70) = -2450 + 4900 - 1000 = 1450$ €.`] },
    { id: 'es-07', difficolta: 2, testo: R`Il profitto di un'azienda è $P(q) = -0{,}5q^2 + 60q - 1000$, ma la capacità produttiva è di $45$ pezzi. Qual è il profitto massimo possibile?`, suggerimenti: [R`Dove sta il vertice? Si può raggiungere?`, R`Prima del vertice la parabola sale.`], risposta: euro(687.5), soluzione: [R`Il vertice è in $q = 60$, fuori dal dominio economico $0 \le q \le 45$.`, R`Fra $0$ e $45$ la parabola sale sempre: il massimo è a capacità piena.`, R`$P(45) = -1012{,}5 + 2700 - 1000 = 687{,}50$ €.`] },
    { id: 'es-08', difficolta: 2, testo: R`Il costo è $C(q) = 0{,}4q^2 + 6q + 1000$. Trova la quantità che rende minimo il costo medio e il costo medio minimo. Verifica che lì il costo marginale è uguale al costo medio. Scrivi la quantità e il costo medio minimo, separati da punto e virgola.`, suggerimenti: [R`$C_m(q) = 0{,}4q + 6 + \frac{1000}{q}$.`, R`Il costo marginale è $C'(q) = 0{,}8q + 6$.`], risposta: coppia(50, 46, 'es. 20; 35'), soluzione: [R`$q = \sqrt{\frac{1000}{0{,}4}} = \sqrt{2500} = 50$.`, R`$C_m(50) = 20 + 6 + 20 = 46$ €.`, R`$C'(50) = 40 + 6 = 46$ €: costo marginale e costo medio coincidono, come succede sempre nel minimo del costo medio.`] },
    { id: 'es-09', difficolta: 3, testo: R`La domanda è $q = 240 - 2p$ e il costo è $C(q) = 0{,}25q^2 + 30q + 800$. Con la condizione $R'(q) = C'(q)$ trova la produzione migliore. Che prezzo conviene fissare? Qual è il profitto massimo? Scrivi il prezzo e il profitto, separati da punto e virgola.`, suggerimenti: [R`$p = 120 - 0{,}5q$, quindi $R(q) = 120q - 0{,}5q^2$.`, R`$R'(q) = 120 - q$ e $C'(q) = 0{,}5q + 30$.`], risposta: coppia(90, 1900, 'es. 40; 900'), soluzione: [R`$R(q) = 120q - 0{,}5q^2$, quindi $R'(q) = 120 - q$. Il costo marginale è $C'(q) = 0{,}5q + 30$.`, R`$120 - q = 0{,}5q + 30$ dà $1{,}5q = 90$, $q = 60$. Prima di $60$ vale $R' > C'$, dopo $R' < C'$: è un massimo.`, R`Il prezzo è $p = 120 - 30 = 90$ €.`, R`$R(60) = 7200 - 1800 = 5400$ €, $C(60) = 900 + 1800 + 800 = 3500$ €: il profitto massimo è $1900$ €.`] },
    { id: 'es-10', difficolta: 2, testo: R`La domanda è $q = 360 - 8p$. A $20$ € la domanda è rigida o elastica? Per quale prezzo l'elasticità è unitaria? Scrivi questo prezzo, in euro.`, suggerimenti: [R`$\varepsilon(p) = \frac{8p}{360 - 8p}$.`, R`Unitaria: $8p = 360 - 8p$.`], risposta: euro(22.5), soluzione: [R`$\varepsilon(20) = \frac{160}{200} = 0{,}8 < 1$: rigida. Alzare un po' il prezzo fa salire il ricavo.`, R`Elasticità unitaria: $16p = 360$, cioè $p = 22{,}50$ €.`, R`Lì il ricavo è massimo: $q = 180$ e $R = 22{,}5 \cdot 180 = 4050$ €.`] },
    { id: 'es-11', difficolta: 2, testo: R`Un cinema alza il biglietto da $8$ € a $10$ €. Gli spettatori della settimana scendono da $500$ a $420$. Calcola l'elasticità della domanda, con le variazioni misurate rispetto ai valori di partenza. Il ricavo sale o scende? Scrivi l'elasticità.`, suggerimenti: [R`Il prezzo sale di $\frac{2}{8}$, gli spettatori calano di $\frac{80}{500}$.`], risposta: numero(0.64, 0.005, 'es. 1,2'), soluzione: [R`Il prezzo sale del $25\%$, gli spettatori calano del $16\%$.`, R`$\varepsilon = \frac{16\%}{25\%} = 0{,}64 < 1$: la domanda è rigida.`, R`Il ricavo sale: da $8 \cdot 500 = 4000$ € a $10 \cdot 420 = 4200$ €.`] },
    { id: 'es-12', difficolta: 3, testo: R`**Problema completo.** Un'azienda vende un prodotto a $25$ € al pezzo. Il costo di produzione è $C(q) = 0{,}01q^2 + 5q + 3600$ euro. La capacità produttiva è di $1500$ pezzi al mese.

a) Scrivi il profitto e trova i punti di pareggio. Per quali quantità l'azienda guadagna?

b) Trova la produzione che rende massimo il profitto e il profitto massimo.

c) Trova il costo medio minimo e confrontalo con il prezzo.

Scrivi il profitto massimo, in euro.`, suggerimenti: [R`$P(q) = 25q - C(q) = -0{,}01q^2 + 20q - 3600$.`, R`Per i pareggi moltiplica per $-100$: $q^2 - 2000q + 360\,000 = 0$.`], risposta: euro(6400), soluzione: [
      R`a) $P(q) = -0{,}01q^2 + 20q - 3600$. Moltiplico $P(q) = 0$ per $-100$: $q^2 - 2000q + 360\,000 = 0$.`,
      R`$\frac{\Delta}{4} = 1\,000\,000 - 360\,000 = 640\,000$ e $\sqrt{640\,000} = 800$, quindi $q = 1000 \pm 800$: i pareggi sono $200$ e $1800$.`,
      R`Il secondo pareggio supera la capacità: l'azienda guadagna per $200 < q \le 1500$.`,
      R`b) Il vertice è a metà fra i pareggi: $q = 1000$, dentro la capacità. $P(1000) = -10\,000 + 20\,000 - 3600 = 6400$ €.`,
      R`c) $C_m(q) = 0{,}01q + 5 + \frac{3600}{q}$, minimo in $q = \sqrt{\frac{3600}{0{,}01}} = 600$: $C_m(600) = 6 + 5 + 6 = 17$ €.`,
      R`Il prezzo, $25$ €, supera di $8$ € il costo medio minimo: per questo esiste una zona di guadagno.`
    ] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Una funzione della domanda $q = a - bp$, con $a$ e $b$ positivi, è…`, opzioni: [R`decrescente: più il prezzo sale, meno si compra`, R`crescente: più il prezzo sale, più si compra`, R`costante, perché $a$ e $b$ non cambiano`, R`decrescente solo se $a$ è maggiore di $b$, altrimenti crescente`], corretta: 0, spiegazione: R`Il coefficiente di $p$ è $-b$, negativo: la retta scende. Crescente è l'offerta. $a$ e $b$ sono fissi, ma $q$ cambia con $p$; il confronto fra $a$ e $b$ non c'entra con la pendenza.` },
    { id: 'q-02', domanda: R`Nella domanda $q = 100 - 2p$, che cosa rappresenta il numero $50$?`, opzioni: [R`la domanda massima, cioè i pezzi chiesti a prezzo zero`, R`il prezzo di equilibrio`, R`il prezzo oltre il quale la domanda si annulla`, R`i pezzi persi per ogni euro in più`], corretta: 2, spiegazione: R`Per $p = 50$ si ha $q = 0$: è il prezzo massimo. La domanda massima è $100$. Un euro in più toglie $2$ pezzi, non $50$. L'equilibrio dipende anche dall'offerta, che qui non c'è.` },
    { id: 'q-03', domanda: R`Nei grafici di domanda e offerta dei libri di economia…`, opzioni: [R`il prezzo sta sull'asse orizzontale e la quantità su quello verticale`, R`il prezzo sta sull'asse verticale e la quantità su quello orizzontale`, R`tutti e due gli assi portano il prezzo, in due monete diverse`, R`c'è un asse solo, quello del prezzo, e le quantità si scrivono sopra`], corretta: 1, spiegazione: R`È la convenzione dell'economia: $p$ in verticale, $q$ in orizzontale. Per disegnare $q = 100 - 2p$ conviene scriverla come $p = 50 - \frac{q}{2}$.` },
    { id: 'q-04', domanda: R`Al prezzo fissato l'offerta supera la domanda. Che cosa ci si aspetta?`, opzioni: [R`il prezzo tende a salire`, R`la domanda cresce da sola fino a raggiungere l'offerta`, R`il prezzo tende a scendere verso l'equilibrio`, R`l'offerta diventa negativa`], corretta: 2, spiegazione: R`C'è merce invenduta, e i venditori abbassano il prezzo. Il prezzo sale con un eccesso di domanda. La domanda cresce solo perché il prezzo scende, non da sola.` },
    { id: 'q-05', domanda: R`A ogni prezzo i produttori offrono più pezzi di prima. Che cosa succede all'equilibrio?`, opzioni: [R`il prezzo scende e la quantità sale`, R`il prezzo e la quantità salgono`, R`il prezzo sale e la quantità scende`, R`non cambia, perché la domanda è la stessa`], corretta: 0, spiegazione: R`La retta dell'offerta si sposta a destra e incontra la domanda più in basso. Con i numeri del video: da $p = 24$ €, $q = 52$ si passa a $p = 21$ €, $q = 58$.` },
    { id: 'q-06', domanda: R`Quale di queste spese è un costo fisso per un panificio?`, opzioni: [R`la farina`, R`l'energia per cuocere il pane`, R`l'affitto del negozio`, R`i sacchetti per il pane`], corretta: 2, spiegazione: R`L'affitto si paga anche se non si sforna niente. Farina, energia del forno e sacchetti crescono con il pane prodotto: sono costi variabili.` },
    { id: 'q-07', domanda: R`Il costo totale è $C(q) = 900 + 3q$. Che cosa fa il costo medio quando $q$ cresce?`, opzioni: [R`cresce, perché insieme a $q$ cresce anche il costo totale`, R`resta sempre $3$ €, il costo di ogni pezzo`, R`scende e si avvicina a $3$ €, senza raggiungerli`, R`scende fino ad arrivare a zero`], corretta: 2, spiegazione: R`$C_m(q) = \frac{900}{q} + 3$: i costi fissi si dividono fra più pezzi. Il termine $\frac{900}{q}$ tende a zero, quindi $C_m$ tende a $3$ € ma resta sopra.` },
    { id: 'q-08', domanda: R`Il costo medio $C_m(q) = aq + b + \frac{c}{q}$, con $a$ e $c$ positivi, è minimo quando…`, opzioni: [R`$q = \frac{c}{a}$`, R`$aq = \frac{c}{q}$`, R`$aq + b = 0$`, R`$q = \sqrt{a \cdot c}$`], corretta: 1, spiegazione: R`Il prodotto di $aq$ e $\frac{c}{q}$ è fisso, quindi la loro somma è minima quando sono uguali: $q = \sqrt{\frac{c}{a}}$. Le altre condizioni dimenticano la radice, o combinano $a$ e $c$ nel modo sbagliato.` },
    { id: 'q-09', domanda: R`Il prezzo segue una domanda lineare decrescente. Il grafico del ricavo in funzione di $q$ è…`, opzioni: [R`una retta che passa per l'origine degli assi`, R`una parabola rivolta verso l'alto`, R`un ramo d'iperbole`, R`una parabola rivolta verso il basso`], corretta: 3, spiegazione: R`Il prezzo è $p = m - nq$, con $n > 0$, e $R(q) = mq - nq^2$: il coefficiente di $q^2$ è negativo. La retta per l'origine è il ricavo a prezzo fisso.` },
    { id: 'q-10', domanda: R`Il punto di pareggio è la quantità per cui…`, opzioni: [R`il ricavo raggiunge il suo massimo`, R`il costo totale è il più basso possibile`, R`il profitto è massimo`, R`il ricavo è uguale al costo`], corretta: 3, spiegazione: R`Al pareggio $R(q) = C(q)$, cioè $P(q) = 0$: non si guadagna e non si perde. Ricavo massimo e profitto massimo sono altri punti; il costo totale è minimo per $q = 0$.` },
    { id: 'q-11', domanda: R`Prezzo fisso $p$, costi fissi $C_F$ e costo unitario $c$: quando il pareggio non esiste?`, opzioni: [R`quando $C_F$ è maggiore di $p$`, R`quando $p \le c$`, R`quando $c = 0$`, R`quando la capacità produttiva è molto grande`], corretta: 1, spiegazione: R`Ogni pezzo copre $p - c$ euro di costi fissi: serve $p - c > 0$. Se $p \le c$ ogni pezzo fa perdere. Con $c = 0$ il pareggio è $\frac{C_F}{p}$; costi fissi alti spostano il pareggio, non lo cancellano.` },
    { id: 'q-12', domanda: R`Il profitto è $P(q) = -q^2 + 80q - 700$ e la capacità produttiva è di $30$ pezzi. Dove sta il profitto massimo?`, opzioni: [R`in $q = 40$, nel vertice della parabola`, R`in $q = 0$`, R`non c'è un massimo`, R`in $q = 30$, a capacità piena`], corretta: 3, spiegazione: R`Il vertice $q = 40$ è fuori dal dominio $0 \le q \le 30$. Prima del vertice la parabola sale: il massimo sta all'estremo, $q = 30$.` },
    { id: 'q-13', domanda: R`Il costo marginale $C'(q)$ indica…`, opzioni: [R`il costo medio di ogni pezzo prodotto`, R`quanto costa in tutto produrre $q$ pezzi`, R`i costi fissi dell'azienda`, R`circa quanto costa un pezzo in più`], corretta: 3, spiegazione: R`$C'(q) \approx C(q + 1) - C(q)$: il costo del pezzo successivo. Il costo di tutti i $q$ pezzi è $C(q)$, non la sua derivata. I costi fissi spariscono derivando.` },
    { id: 'q-14', domanda: R`Con le derivate, dove sta il profitto massimo?`, opzioni: [R`dove $R'(q) = C'(q)$ e $P'$ passa da $+$ a $-$`, R`dove $R'(q) = 0$, cioè dove il ricavo smette di crescere`, R`dove $C'(q) = 0$, cioè dove il costo smette di crescere`, R`dove $R(q) = C(q)$, cioè dove ricavo e costo si incontrano`], corretta: 0, spiegazione: R`$P' = R' - C'$ si annulla quando i marginali sono uguali, e serve il cambio di segno. $R' = 0$ dà il ricavo massimo. $R = C$ è il pareggio.` },
    { id: 'q-15', domanda: R`La domanda di un bene ha elasticità $0{,}4$. Che cosa vuol dire?`, opzioni: [R`la domanda è elastica`, R`se il prezzo sale dell'$1\%$, la quantità cala di circa lo $0{,}4\%$`, R`se il prezzo sale di $1$ €, la quantità domandata cala di $0{,}4$ pezzi`, R`se il prezzo sale, il ricavo scende`], corretta: 1, spiegazione: R`L'elasticità confronta percentuali, non euro e pezzi. Con $\varepsilon < 1$ la domanda è rigida: alzando il prezzo il ricavo sale.` },
    { id: 'q-16', domanda: R`Per la domanda iperbolica $q = \frac{k}{p}$, l'elasticità…`, opzioni: [R`vale $1$ a ogni prezzo`, R`è minore di $1$ per i prezzi bassi`, R`cresce con il prezzo`, R`vale zero, perché la spesa non cambia`], corretta: 0, spiegazione: R`$q'(p) = -\frac{k}{p^2}$, quindi $\varepsilon = \frac{k}{p^2} \cdot \frac{p}{q} = \frac{k}{p^2} \cdot \frac{p^2}{k} = 1$. La spesa resta $k$ proprio perché l'elasticità è unitaria.` },
    { id: 'q-17', domanda: R`Lungo una retta di domanda $q = a - bp$, l'elasticità…`, opzioni: [R`vale $b$ dappertutto`, R`vale $1$ dappertutto`, R`è piccola per i prezzi bassi e grande per quelli alti`, R`è grande per i prezzi bassi e piccola per quelli alti`], corretta: 2, spiegazione: R`$\varepsilon = \frac{bp}{a - bp}$: vicino a $0$ per $p$ piccolo, sempre più grande verso il prezzo massimo. La pendenza $b$ è costante, l'elasticità no.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Nei grafici dell'economia il prezzo va in verticale. Per disegnare $q = 100 - 2p$, ricava prima $p = 50 - \frac{q}{2}$.` },
    { tipo: 'errore', testo: R`Nel profitto il costo va sottratto **tutto**: $15q - (2000 + 5q)$, non $15q - 2000 + 5q$.` },
    { tipo: 'trucco', testo: R`Il vertice della parabola del profitto sta a metà fra i due pareggi. Se li hai già trovati, basta fare la media.` },
    { tipo: 'errore', testo: R`Il pareggio, con i pezzi interi, si arrotonda per eccesso: $166{,}7$ diventa $167$.` },
    { tipo: 'metodo', testo: R`Prima di cercare un massimo, scrivi il dominio economico: $q \ge 0$ e, se c'è, la capacità produttiva.` },
    { tipo: 'trucco', testo: R`Per il minimo del costo medio $aq + b + \frac{c}{q}$ non servono derivate: $q = \sqrt{\frac{c}{a}}$.` },
    { tipo: 'errore', testo: R`Ricavo massimo e profitto massimo sono due cose diverse: il ricavo ignora i costi.` },
    { tipo: 'trucco', testo: R`Controllo veloce: nel minimo del costo medio, il costo marginale vale quanto il costo medio.` },
    { tipo: 'metodo', testo: R`Trovato il prezzo di equilibrio, sostituiscilo in **tutte e due** le funzioni. Se le quantità non vengono uguali, c'è un errore.` }
  ],

  aneddoti: [
    { matematico: 'Antoine-Augustin Cournot', anni: '1801–1877', titolo: 'Il libro che nessuno lesse per trent\'anni', testo: R`Cournot era un matematico francese: fu rettore dell'accademia di Grenoble e poi ispettore generale dell'istruzione. Nel 1838 pubblicò le *Ricerche sui principi matematici della teoria delle ricchezze*. Fu il primo a scrivere la domanda come una funzione del prezzo, $D = F(p)$, e a disegnarla come una curva che scende. Studiò anche il proprietario di una sorgente di acqua minerale, l'unico a venderla. Per sapere a che prezzo incassa di più, cercò il massimo di $p\,F(p)$ con le derivate. Il libro non lo lesse quasi nessuno: gli economisti di allora non usavano la matematica. Nel 1863 Cournot ne scrisse una versione senza formule, ma ebbe poco successo anche quella. Solo negli anni Settanta dell'Ottocento Jevons e Walras lo riscoprirono e lo indicarono come un precursore.`, legame: R`La domanda come funzione del prezzo e la ricerca del ricavo massimo vengono dal suo libro del 1838.` },
    { matematico: 'Jules Dupuit', anni: '1804–1866', titolo: 'Il pedaggio del ponte e la tassa troppo alta', testo: R`Dupuit nacque a Fossano, in Piemonte, quando la regione faceva parte della Francia. Diventò ingegnere di Ponti e strade e lavorò su strade, fiumi e acquedotti; a Parigi fu ingegnere capo del servizio municipale, con le acque e le fogne. Nel 1844 si chiese quanto vale davvero un'opera pubblica, per esempio un ponte con il pedaggio. Se il pedaggio è zero, il ponte non incassa niente. Se è troppo alto, non passa nessuno e l'incasso torna a zero. In mezzo c'è un pedaggio che fa incassare di più. Dupuit scrisse la stessa cosa delle tasse: oltre un certo punto, alzarle fa incassare meno allo Stato. Per ragionare disegnò curve di domanda, decenni prima che diventassero comuni nei libri di economia.`, legame: R`Il pedaggio che fa incassare di più è il vertice della parabola del ricavo.` },
    { matematico: 'Fleeming Jenkin', anni: '1833–1885', titolo: 'L\'ingegnere dei cavi che disegnò il mercato', testo: R`Jenkin era un ingegnere britannico. Posava cavi telegrafici sul fondo del mare e lavorò a lungo con William Thomson, il futuro Lord Kelvin. Dal 1868 insegnò ingegneria all'università di Edimburgo. Fra i suoi studenti c'era Robert Louis Stevenson, il futuro autore dell'*Isola del tesoro*. Nel 1870 pubblicò un saggio sulla rappresentazione grafica delle leggi della domanda e dell'offerta. Con due curve che si incrociano spiegava come si forma il prezzo di mercato. Fu uno dei primi a farlo in inglese, vent'anni prima del libro di Marshall. Stevenson gli restò amico per tutta la vita, e dopo la sua morte ne scrisse una biografia.`, legame: R`Il prezzo di equilibrio all'incrocio di domanda e offerta è il disegno del suo saggio del 1870.` },
    { matematico: 'Alfred Marshall', anni: '1842–1924', titolo: 'Usa la matematica, poi bruciala', testo: R`Marshall studiò matematica a Cambridge e nel 1865 arrivò secondo nell'esame finale, il difficilissimo *Tripos*. Poi passò all'economia. Nel 1890 pubblicò i *Principi di economia*, il libro su cui studiarono generazioni di economisti. Nelle sue figure le curve di domanda e di offerta si incrociano con la quantità in orizzontale e il prezzo in verticale: da allora i libri di economia fanno così. Nello stesso libro definì l'elasticità della domanda. Eppure non amava mostrare le formule. In una lettera del 1906 a un collega diede le sue regole: usa la matematica come stenografia, traduci tutto in parole, trova esempi presi dalla vita reale. Poi brucia la matematica.`, legame: R`Il prezzo sull'asse verticale e l'elasticità della domanda vengono dai suoi *Principi* del 1890.` }
  ]
});
})();
