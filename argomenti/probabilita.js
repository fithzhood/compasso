(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'probabilita',
  titolo: 'Probabilità',

  introduzione: R`Lanci un dado: che cosa esce non lo sai. Però sai che il $6$ esce una volta su sei, e che un numero pari esce una volta su due. La probabilità è il modo di mettere un numero su frasi come queste: un numero fra $0$, per ciò che non può succedere, e $1$, per ciò che succede di sicuro.

Nasce nel Seicento dai giochi d'azzardo, ma la usa chiunque debba decidere senza sapere come andrà: un'assicurazione quando fissa il prezzo di una polizza, un medico quando legge un esame che a volte sbaglia, il meteo quando annuncia «70% di pioggia».

Ti serve il calcolo combinatorio, perché molte probabilità si calcolano contando i casi, e un po' di pazienza: qui l'intuito sbaglia spesso, e conviene fidarsi del conto.`,

  inBreve: [
    R`Se i casi possibili sono tutti ugualmente probabili, la probabilità di un evento è casi favorevoli diviso casi possibili.`,
    R`Quando leggi «almeno uno», passa al contrario: $P(\text{almeno uno}) = 1 - P(\text{nessuno})$.`,
    R`«Oppure»: si sommano le probabilità e si toglie quella dei casi comuni. «E»: si moltiplicano, ma la seconda probabilità va calcolata sapendo com'è andata la prima.`,
    R`$P(A \mid B)$ e $P(B \mid A)$ sono numeri diversi: il teorema di Bayes serve a passare dall'uno all'altro.`,
    R`Incompatibili non vuol dire indipendenti: se due eventi possibili si escludono, sapere che è accaduto uno ti dice che l'altro non è accaduto, quindi sono dipendenti.`,
    R`In $n$ prove indipendenti, la probabilità di esattamente $k$ successi è $\binom{n}{k}p^k(1-p)^{n-k}$: il $\binom{n}{k}$ conta in quali prove cadono i successi.`
  ],

  sezioni: [
    { id: 'spazio-campionario', titolo: 'Eventi e spazio campionario', testo: R`Lanciare un dado, estrarre una carta, pescare un numero alla tombola: sono prove di cui conosci tutti i risultati possibili, ma non sai quale uscirà. Si chiamano **esperimenti aleatori** («aleatorio» viene da *alea*, il dado in latino).

>* Lo **spazio campionario** $U$ (detto anche universo; molti libri lo indicano con $\Omega$) è l'insieme di **tutti** i risultati possibili dell'esperimento. Un **evento** è un sottoinsieme di $U$: l'insieme dei risultati che rendono vera una certa frase.

Per il lancio di un dado, $U = \{1, 2, 3, 4, 5, 6\}$. L'evento «esce un numero pari» è il sottoinsieme $A = \{2, 4, 6\}$. L'evento «esce il $5$» è $\{5\}$: contiene un solo risultato e si chiama **evento elementare**. Un evento con più risultati si dice **composto**.

Tre eventi hanno un nome proprio:

- l'**evento certo** è $U$ stesso: si verifica sempre («esce un numero minore di $7$»);
- l'**evento impossibile** è l'insieme vuoto $\emptyset$: non si verifica mai («esce $8$»);
- l'**evento contrario** (o complementare) di $A$, indicato con $\overline{A}$, si verifica esattamente quando $A$ non si verifica. Per $A = \{2, 4, 6\}$ si ha $\overline{A} = \{1, 3, 5\}$.

Poiché gli eventi sono insiemi, si combinano con le operazioni insiemistiche:

- $A \cup B$ («$A$ **oppure** $B$») si verifica se almeno uno dei due si verifica;
- $A \cap B$ («$A$ **e** $B$») si verifica se si verificano entrambi.

Con $A = \{2, 4, 6\}$ e $B = \{4, 5, 6\}$ («esce più di $3$») si ottiene $A \cup B = \{2, 4, 5, 6\}$ e $A \cap B = \{4, 6\}$.

Due eventi si dicono **incompatibili** (o disgiunti) se non possono verificarsi insieme, cioè se $A \cap B = \emptyset$: «esce pari» e «esce $3$» sono incompatibili, «esce pari» e «esce più di $3$» no.

?? Lanci un dado. «Esce un numero pari» ed «esce un multiplo di $3$» sono eventi incompatibili?
[ ] sì, perché i pari e i multipli di $3$ sono numeri diversi
[x] no, perché con il $6$ si verificano tutti e due
=> I pari sono $\{2, 4, 6\}$, i multipli di $3$ sono $\{3, 6\}$: l'intersezione è $\{6\}$, non vuota. Per dire che due eventi sono incompatibili bisogna controllare che **nessun** risultato stia in entrambi.

>! In matematica la «o» è sempre **inclusiva**: $A \cup B$ si verifica anche quando accadono tutti e due. Se serve l'alternativa esclusiva bisogna dirlo, e si scrive con l'unione dei due eventi incompatibili $A \cap \overline{B}$ e $\overline{A} \cap B$.` },

    { id: 'definizione-classica', titolo: 'La definizione classica', testo: R`Con un dado regolare, quanto è probabile che esca un numero pari? Le facce sono 6, tutte con la stessa possibilità di uscire, e 3 di esse sono pari: la probabilità è $\dfrac{3}{6} = \dfrac{1}{2}$. È la definizione più antica, quella che Laplace fissò nel 1812.

>* **Definizione classica.** Se i casi possibili sono in numero **finito** e **ugualmente possibili**, la probabilità di un evento $E$ è $$P(E) = \frac{\text{casi favorevoli a } E}{\text{casi possibili}}$$

«Casi favorevoli» non vuol dire «casi buoni»: sono i risultati in cui $E$ si verifica.

Con due dadi i casi possibili sono le $6 \cdot 6 = 36$ coppie ordinate (risultato del primo dado, risultato del secondo). La somma $7$ esce con $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$: sei casi, quindi $P = \dfrac{6}{36} = \dfrac{1}{6}$. Nota che $(1,6)$ e $(6,1)$ sono due casi diversi: i dadi sono due oggetti distinti.

Dalla definizione seguono tre fatti: $0 \le P(E) \le 1$, perché i casi favorevoli sono fra nessuno e tutti; l'evento impossibile ha probabilità $0$; l'evento certo ha probabilità $1$.

Spesso contare i casi è un problema di **calcolo combinatorio**: estraendo $2$ palline da un'urna che ne contiene $10$, i casi possibili sono $\binom{10}{2} = 45$.

?? Lanci due monete. Qual è la probabilità di ottenere una testa e una croce?
[x] $\dfrac{1}{2}$
[ ] $\dfrac{1}{3}$
[ ] $\dfrac{1}{4}$
=> I casi ugualmente possibili sono quattro: $TT$, $TC$, $CT$, $CC$. Una testa e una croce escono in due di questi, $TC$ e $CT$, quindi $\dfrac{2}{4} = \dfrac{1}{2}$. Il $\dfrac{1}{3}$ viene dal contare tre casi, «due teste», «una testa», «nessuna testa», che però **non** hanno la stessa probabilità.

>! La condizione «ugualmente possibili» è quella che si dimentica. Il $\dfrac{1}{3}$ della domanda qui sopra è lo stesso errore che fece d'Alembert, matematico famoso, nel Settecento. Prima di dividere, chiediti se i casi che hai contato hanno davvero tutti la stessa probabilità.

La definizione classica ha due limiti. Non si usa quando i casi sono infiniti (il punto in cui una freccia colpisce un bersaglio), e non si usa quando i casi non sono equiprobabili: per un dado truccato, o per la probabilità che domani piova, la formula non dice nulla. Servono altre definizioni.` },

    { id: 'altre-definizioni', titolo: 'Frequentista, soggettiva, assiomatica', testo: R`### La definizione frequentista

Se l'esperimento si può ripetere tante volte nelle stesse condizioni, si prova e si conta. La **frequenza relativa** di un evento $E$ è la frazione di prove in cui $E$ si è verificato: $$f = \frac{\text{numero delle prove in cui } E \text{ si verifica}}{\text{numero delle prove}}$$

>* **Legge empirica del caso.** Su un gran numero di prove ripetute, la frequenza relativa di un evento si avvicina alla sua probabilità, tanto più quanto più le prove sono numerose. Per questo si può prendere $P(E) \approx f$.

Buffon lanciò una moneta $4040$ volte e ottenne $2048$ teste ($f \approx 0{,}507$); Pearson arrivò a $24\,000$ lanci con $12\,012$ teste ($f \approx 0{,}5005$). È l'unica strada per un dado truccato, o per la probabilità che un neonato sia maschio: dai registri anagrafici viene circa $0{,}51$.

Nel laboratorio «Il banco e le tre porte» puoi lanciare monete e dadi migliaia di volte e guardare la frequenza che, dopo i primi lanci ballerini, si posa sulla probabilità.

?? Una moneta regolare ha dato testa 5 volte di fila. Qual è la probabilità che al sesto lancio esca croce?
[x] $\dfrac{1}{2}$
[ ] più di $\dfrac{1}{2}$, perché le croci devono recuperare
[ ] $\left(\dfrac{1}{2}\right)^6 = \dfrac{1}{64}$
=> La moneta non ricorda i lanci precedenti: al sesto lancio testa e croce hanno ancora probabilità $\dfrac{1}{2}$ ciascuna. $\dfrac{1}{64}$ è la probabilità, calcolata **prima** di cominciare, di una sequenza precisa di sei lanci (per esempio cinque teste e poi croce); ma cinque teste sono già uscite, e resta da decidere un solo lancio.

>! La legge empirica **non** dice che dopo tante teste arriveranno più croci «per compensare». Nessuno compensa niente: è la *proporzione* di teste che si avvicina a $\dfrac{1}{2}$, perché su migliaia di lanci qualche testa in più conta sempre meno. Credere il contrario si chiama *fallacia del giocatore*.

### La definizione soggettiva

Per un evento che non si può ripetere («la mia squadra vince domenica») si usa il **grado di fiducia** di una persona: il prezzo che è disposta a pagare per una scommessa che le rende $1$ euro se l'evento si verifica e $0$ se non si verifica. È l'impostazione dell'italiano Bruno de Finetti. La probabilità così è soggettiva ma non arbitraria: le valutazioni devono essere **coerenti**, cioè non devono permettere a chi scommette contro di vincere in ogni caso.

### Gli assiomi

Nel 1933 Kolmogorov scelse un'altra strada: invece di dire che cosa *sia* la probabilità, fissò le tre regole che deve rispettare.

>* **Assiomi di Kolmogorov:** 1) $P(E) \ge 0$; 2) $P(U) = 1$; 3) se $A$ e $B$ sono incompatibili, $P(A \cup B) = P(A) + P(B)$.

Tutte le altre regole (evento contrario, unione, condizionata) si dimostrano da queste tre. Le definizioni classica, frequentista e soggettiva diventano modi diversi di *assegnare* i numeri, e le regole di calcolo sono le stesse per tutte.` },

    { id: 'contrario-unione', titolo: 'Evento contrario e unione', testo: R`### L'evento contrario

Lanci tre monete: qual è la probabilità di ottenere almeno una testa? Potresti contare i casi con una, due o tre teste. Ma è molto più corto guardare il contrario: «almeno una testa» fallisce **solo** se escono tre croci.

>* **Evento contrario:** $$P(\overline{E}) = 1 - P(E)$$ perché $E$ e $\overline{E}$ si escludono e insieme coprono tutti i casi, quindi $P(E) + P(\overline{E}) = 1$.

~ P(\text{almeno una } T) :: $T$ sta per testa, $C$ per croce
~ = 1 - P(\evid{\text{nessuna } T}) :: il contrario di «almeno una testa» è «nessuna testa»
~ = 1 - P(\evid{CCC}) :: nessuna testa vuol dire tre croci
~ = 1 - \dfrac{1}{8} = \evidb{\dfrac{7}{8}} :: $CCC$ è uno solo degli $8$ risultati equiprobabili

?? Lanci un dado tre volte. Qual è il contrario dell'evento «esce almeno un $6$»?
[x] non esce nessun $6$
[ ] esce esattamente un $6$
[ ] escono tre $6$
[ ] esce al più un $6$
=> «Almeno un $6$» è falso solo quando i $6$ sono zero, quindi il contrario è «nessun $6$». «Tre $6$» è un caso *dentro* «almeno un $6$», non il suo contrario; «al più un $6$» comprende anche il caso con un $6$, che sta in tutti e due.

### Unione di eventi incompatibili

Con un dado, qual è la probabilità che esca $1$ oppure $6$? I due eventi non possono accadere insieme, quindi i casi favorevoli si sommano senza sovrapporsi: $\dfrac{1}{6} + \dfrac{1}{6} = \dfrac{1}{3}$.

>* Se $A \cap B = \emptyset$: $$P(A \cup B) = P(A) + P(B)$$

### Unione di eventi compatibili

Se invece i due eventi possono accadere insieme, sommando le probabilità i casi comuni si contano **due volte**. Bisogna toglierli una volta.

>* **Probabilità dell'unione:** $$\begin{aligned} P(A \cup B) = {} & P(A) + P(B) \\ & - P(A \cap B) \end{aligned}$$

Da un mazzo di $40$ carte napoletane si estrae una carta. Qual è la probabilità che sia un asso oppure una carta di bastoni? Gli assi sono $4$, le carte di bastoni $10$, e l'asso di bastoni sta in tutti e due i gruppi.

~ P(A) + P(B) - P(A \cap B) :: $A$ = «asso», $B$ = «bastoni»: possono accadere insieme, quindi uso la formula dell'unione
~ = \dfrac{4}{40} + \dfrac{10}{40} - \evid{\dfrac{1}{40}} :: l'asso di bastoni è stato contato due volte: lo tolgo una volta
~ = \evidb{\dfrac{13}{40}} = 0{,}325 :: controllo: $10$ bastoni più i $3$ assi degli altri semi fanno proprio $13$ carte

La formula per gli eventi incompatibili è il caso in cui $P(A \cap B) = 0$: basta ricordare questa.

>! Se sommando probabilità ottieni più di $1$, quasi sempre hai dimenticato di togliere l'intersezione. Una probabilità maggiore di $1$ è sempre un errore di calcolo.`
    }
    ,

    { id: 'condizionata', titolo: 'Probabilità condizionata', testo: R`Un amico lancia un dado senza fartelo vedere e ti dice solo: «è uscito un numero pari». Qual è ora la probabilità che sia uscito il $2$? Non è più $\dfrac{1}{6}$: i casi rimasti sono $2$, $4$ e $6$, e il $2$ è uno di tre, quindi $\dfrac{1}{3}$. L'informazione ha ristretto i casi possibili.

>* La **probabilità condizionata** di $A$ dato $B$ (con $P(B) \ne 0$) è $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$ e si legge «probabilità di $A$ sapendo che si è verificato $B$».

La formula dice la stessa cosa del dado: $B$ diventa il nuovo spazio campionario, e fra i suoi casi si contano quelli che stanno anche in $A$. Con $A = \{2\}$ e $B = \{2, 4, 6\}$ si ha $P(A \mid B) = \dfrac{1/6}{1/2} = \dfrac{1}{3}$.

?? Lanci un dado. Sapendo che è uscito il $6$, qual è la probabilità che sia uscito un numero pari?
[x] $1$
[ ] $\dfrac{1}{3}$
[ ] $\dfrac{1}{2}$
=> Se è uscito il $6$, il numero è pari di sicuro: $P(\text{pari} \mid 6) = 1$. La risposta $\dfrac{1}{3}$ è $P(6 \mid \text{pari})$, la domanda rovesciata; $\dfrac{1}{2}$ è $P(\text{pari})$ senza nessuna informazione. Tre numeri diversi per tre domande diverse.

Moltiplicando in croce la definizione si ottiene la formula dei problemi a più passi.

>* **Regola del prodotto:** $$P(A \cap B) = P(B) \cdot P(A \mid B)$$ La probabilità che accadano tutti e due è la probabilità del primo per la probabilità del secondo **sapendo** che il primo è accaduto.

Un'urna contiene $5$ palline bianche e $3$ nere, e se ne estraggono due **senza rimetterle dentro**. Qual è la probabilità che siano bianche tutte e due? Chiamo $B_1$ «la prima è bianca» e $B_2$ «la seconda è bianca».

~ P(B_1 \cap B_2) = P(B_1) \cdot P(B_2 \mid B_1) :: regola del prodotto: la seconda estrazione dipende da com'è andata la prima
~ = \dfrac{5}{8} \cdot P(B_2 \mid B_1) :: all'inizio le bianche sono $5$ su $8$
~ = \dfrac{5}{8} \cdot \evid{\dfrac{4}{7}} :: tolta una bianca, restano $7$ palline e le bianche sono $4$
~ = \dfrac{20}{56} = \evidb{\dfrac{5}{14}} \approx 0{,}357 :: semplifico dividendo per $4$

>! $P(A \mid B)$ e $P(B \mid A)$ sono due numeri diversi, e scambiarli è l'errore più grave di questo capitolo. La probabilità che un malato risulti positivo a un test può essere altissima, e la probabilità che un positivo sia malato bassissima: cambia il gruppo di persone su cui si conta.` },

    { id: 'indipendenza', titolo: 'Eventi indipendenti', testo: R`A volte un'informazione non cambia niente. Sapere che il primo lancio di una moneta ha dato testa non dice nulla sul secondo: la probabilità di testa resta $\dfrac{1}{2}$.

>* $A$ e $B$ sono **indipendenti** se sapere che $B$ è accaduto non cambia la probabilità di $A$: $P(A \mid B) = P(A)$. Per la regola del prodotto questo equivale a $$P(A \cap B) = P(A) \cdot P(B)$$ Se non è così, sono **dipendenti**.

Per controllare se due eventi sono indipendenti si usa la seconda formula: si calcolano i due lati e si confrontano.

L'esempio tipico è l'estrazione **con rimessa** (o reimmissione): si estrae una pallina, la si rimette nell'urna e si estrae di nuovo. Dall'urna con $5$ bianche e $3$ nere, la seconda estrazione trova l'urna com'era, e $P(\text{due bianche}) = \dfrac{5}{8} \cdot \dfrac{5}{8} = \dfrac{25}{64}$. Senza rimessa veniva $\dfrac{5}{8} \cdot \dfrac{4}{7} = \dfrac{5}{14}$: lì le due estrazioni sono dipendenti.

Le prove indipendenti ripetute si combinano con l'evento contrario. Lanciando un dado quattro volte, qual è la probabilità di ottenere almeno un $6$?

~ P(\text{almeno un } 6) = 1 - P(\text{nessun } 6) :: «almeno uno»: passo al contrario
~ = 1 - \evid{\left(\dfrac{5}{6}\right)^4} :: ogni lancio non dà $6$ con probabilità $\dfrac{5}{6}$; i lanci sono indipendenti, quindi moltiplico quattro volte
~ = 1 - \dfrac{625}{1296} :: $5^4 = 625$ e $6^4 = 1296$
~ = \evidb{\dfrac{671}{1296}} \approx 0{,}518 :: poco più di una volta su due

>* **Almeno un successo in $n$ prove indipendenti**, ciascuna con probabilità $p$: $$P = 1 - (1-p)^n$$

Nel grafico trascina il punto per cambiare il numero di prove, e guarda quando la curva supera la linea del 50%. Con un evento da «1 caso su 6» bastano 4 prove. Poi porta il cursore a 36, cioè il doppio $6$ lanciando due dadi, e cerca quante prove servono: è la domanda che il cavaliere de Méré fece a Pascal.

[[grafico:almenoUno]]

?? Lanci un dado. Gli eventi $A$ = «esce $1$» e $B$ = «esce $2$» sono indipendenti?
[x] no: sono incompatibili, quindi dipendenti
[ ] sì: non hanno risultati in comune
[ ] sì: $P(A \cap B) = 0$
=> Se sai che è uscito $2$, allora l'$1$ è diventato impossibile: $P(A \mid B) = 0$, mentre $P(A) = \dfrac{1}{6}$. L'informazione ha cambiato tutto, quindi sono dipendenti. Con la formula: $P(A \cap B) = 0$, ma $P(A) \cdot P(B) = \dfrac{1}{36}$, e i due numeri sono diversi.

>! **Incompatibili** e **indipendenti** non sono sinonimi, anzi. Due eventi incompatibili, entrambi possibili, sono sempre **dipendenti**: se accade uno, l'altro è escluso.` },

    { id: 'totale-bayes', titolo: 'Probabilità totale e teorema di Bayes', testo: R`Una malattia colpisce l'$1\%$ della popolazione. Un test la riconosce bene: è positivo sul $99\%$ dei malati. Però sbaglia sul $5\%$ dei sani, che risultano positivi anche se stanno bene. Fai il test e sei positivo: quanto è probabile che tu sia malato? Per rispondere servono due teoremi.

### Probabilità totale

Un positivo può venire da due strade: dai malati o dai sani. Le strade si disegnano con un **diagramma ad albero**: al primo livello le cause (malato $M$ o sano $S$), al secondo l'esito del test ($T^+$ positivo, $T^-$ negativo). Lungo un ramo le probabilità si moltiplicano (regola del prodotto); i rami che finiscono nello stesso esito si sommano.

Nel grafico l'albero è disegnato su $10\,000$ persone, così al posto delle probabilità ci sono persone da contare. Muovi i cursori e guarda quanti dei positivi sono davvero malati.

[[grafico:albero]]

In generale le cause $H_1, H_2, \dots, H_n$ devono escludersi a vicenda e coprire tutti i casi (si dice che formano una **partizione**).

>* **Teorema della probabilità totale:** $$P(E) = \sum_{i=1}^{n} P(H_i) \cdot P(E \mid H_i)$$ cioè la somma, su tutti i rami che portano a $E$, dei prodotti lungo il ramo.

### Il teorema di Bayes

Il teorema di Bayes percorre l'albero al contrario: vedi l'effetto (il test positivo) e ti chiedi da quale causa venga.

>* **Teorema di Bayes:** $$P(H_i \mid E) = \frac{P(H_i) \cdot P(E \mid H_i)}{P(E)}$$ Sopra c'è il ramo che ti interessa, sotto tutti i rami che portano a $E$.

$P(H_i)$ si chiama probabilità *a priori* (prima di sapere com'è andato il test), $P(H_i \mid E)$ probabilità *a posteriori* (dopo averlo saputo). Per il test il conto è questo.

~ \begin{aligned} P(T^+) &= P(M)\,P(T^+ \mid M) \\ &+ P(S)\,P(T^+ \mid S) \end{aligned} :: probabilità totale: i due rami che finiscono in $T^+$
~ = 0{,}01 \cdot 0{,}99 + 0{,}99 \cdot 0{,}05 :: malati per sensibilità del test, sani per errore del test
~ = 0{,}0099 + 0{,}0495 = \evid{0{,}0594} :: il ramo dei sani pesa cinque volte quello dei malati
~ P(M \mid T^+) = \dfrac{0{,}0099}{\evid{0{,}0594}} :: Bayes: il ramo «malato e positivo» diviso tutti i positivi
~ = \evidb{\dfrac{1}{6}} \approx 16{,}7\% :: su sei positivi, uno solo è malato

>! Il risultato sembra assurdo, ma è giusto: su $10\,000$ persone i malati positivi sono $99$, i sani positivi $495$. I sani sono così tanti che il loro $5\%$ di errori supera tutti i malati. Per questo un test di screening positivo si conferma sempre con un secondo esame.

?? Se la malattia colpisse il $10\%$ della popolazione, con lo stesso test, quanto varrebbe $P(M \mid T^+)$?
[x] circa $69\%$
[ ] ancora circa $17\%$
[ ] $99\%$
=> Su $10\,000$ persone i malati positivi sarebbero $990$ e i sani positivi il $5\%$ di $9000$, cioè $450$: $\dfrac{990}{1440} \approx 0{,}69$. La probabilità a priori conta moltissimo, ed è per questo che il risultato cambia. Il $99\%$ è $P(T^+ \mid M)$: la domanda rovesciata. Puoi controllare con i cursori del grafico.` },

    { id: 'binomiale', titolo: 'Prove ripetute e distribuzione binomiale', testo: R`Lanci un dado $5$ volte. Qual è la probabilità di fare $6$ esattamente due volte? Ogni lancio è una prova con due soli esiti che ci interessano: $6$ (successo) o non $6$ (insuccesso).

>* Uno **schema di Bernoulli** è una serie di $n$ prove in cui: ogni prova ha due soli esiti, successo e insuccesso; la probabilità di successo $p$ è la stessa in ogni prova; le prove sono indipendenti.

Il conto si fa in due tempi: prima la probabilità di **una** sequenza precisa, poi quante sono le sequenze.

~ P(6,\,6,\,\overline{6},\,\overline{6},\,\overline{6}) = \left(\tfrac{1}{6}\right)^2 \left(\tfrac{5}{6}\right)^3 :: una sequenza precisa: prima due $6$, poi tre lanci senza $6$; le prove sono indipendenti, quindi moltiplico
~ \text{sequenze con due } 6 = \binom{5}{2} = \evid{10} :: i due $6$ possono cadere in $2$ qualsiasi dei $5$ lanci
~ P(2) = \evid{10} \cdot \dfrac{1}{36} \cdot \dfrac{125}{216} :: le $10$ sequenze hanno tutte la stessa probabilità e si escludono: sommo $10$ volte
~ = \dfrac{1250}{7776} \approx \evidb{0{,}161} :: circa una volta su sei

>* **Formula di Bernoulli:** la probabilità di ottenere esattamente $k$ successi in $n$ prove è $$P(k) = \binom{n}{k}\, p^k (1-p)^{n-k}$$

?? Lanci una moneta $3$ volte. Qual è la probabilità di ottenere esattamente una testa?
[x] $\dfrac{3}{8}$
[ ] $\dfrac{1}{8}$
[ ] $\dfrac{1}{3}$
=> Una sequenza precisa, come $TCC$, ha probabilità $\left(\dfrac{1}{2}\right)^3 = \dfrac{1}{8}$; ma la testa può stare in uno qualsiasi dei $3$ lanci ($TCC$, $CTC$, $CCT$), quindi $\binom{3}{1} \cdot \dfrac{1}{8} = \dfrac{3}{8}$. Chi risponde $\dfrac{1}{8}$ ha dimenticato il coefficiente binomiale.

Se calcoli $P(k)$ per tutti i $k$ da $0$ a $n$ ottieni la **distribuzione binomiale**, e i valori sommano a $1$. Nel grafico, muovi $p$ e guarda dove si sposta la barra più alta: sta sempre vicino a $n \cdot p$, qui $5p$. Con $p = 0{,}5$ le barre sono simmetriche: sono la riga $5$ del triangolo di Tartaglia ($1, 5, 10, 10, 5, 1$) divisa per $2^5 = 32$.

[[grafico:binomiale]]

La macchina di Galton fa lo stesso esperimento con le palline: ogni pallina a ogni chiodo va a destra o a sinistra con probabilità $\dfrac{1}{2}$, e la casella in cui cade conta quante volte è andata a destra.

[[animazione:galton]]

>! $\binom{n}{k}$ non va dimenticato. Senza, $\left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^3$ è la probabilità di **una** sequenza precisa, non quella di due successi in un ordine qualunque.` },

    { id: 'valore-atteso-paradossi', titolo: 'Valore atteso, gioco equo e paradossi', testo: R`### Valore atteso

Alla roulette francese ci sono $37$ numeri. Punti $1$ euro su un numero: se esce ne ricevi $36$, altrimenti niente. Quanto ricevi in media, se giochi moltissime volte? È la domanda a cui risponde il valore atteso.

>* Se una grandezza $X$ assume i valori $x_1, \dots, x_n$ con probabilità $p_1, \dots, p_n$, il suo **valore atteso** (o speranza matematica) è $$E(X) = \sum_{i=1}^{n} x_i\, p_i$$ cioè la media dei valori, ognuno pesato con la sua probabilità.

~ E = 36 \cdot \dfrac{1}{37} + 0 \cdot \dfrac{36}{37} :: ricevi $36$ euro in $1$ caso su $37$, niente negli altri $36$
~ = \dfrac{36}{37} \approx \evid{0{,}973} :: in media ricevi un po' meno di un euro a giocata
~ 0{,}973 - 1 = \evidb{-0{,}027} :: tolgo l'euro della puntata: in media perdi quasi $3$ centesimi a giocata

>* Un gioco è **equo** quando il guadagno atteso è zero, cioè quando la posta che paghi è uguale al valore atteso di quello che ricevi.

La roulette non è equa: il banco non ha bisogno di barare, gli basta che il valore atteso sia a suo favore e che si giochi tanto.

?? Paghi $2$ euro per lanciare un dado: se esce $6$ ricevi $10$ euro, altrimenti niente. Il gioco è equo?
[x] no: in media perdi circa $33$ centesimi a partita
[ ] sì, perché $10$ euro sono più della posta
[ ] no: in media guadagni circa $33$ centesimi a partita
=> Il valore atteso di quello che ricevi è $10 \cdot \dfrac{1}{6} \approx 1{,}67$ euro, meno dei $2$ che paghi: in media perdi $2 - 1{,}67 \approx 0{,}33$ euro. Confrontare la vincita con la posta non basta: bisogna pesare la vincita con la sua probabilità. Il gioco sarebbe equo con una posta di $1{,}67$ euro.

### Monty Hall

Tre porte chiuse: dietro una c'è un'auto, dietro le altre due una capra. Scegli una porta. Il conduttore, che sa dove sta l'auto, apre una delle altre due e ti mostra una capra, poi ti chiede se vuoi cambiare. Conviene?

Sì. La porta che hai scelto all'inizio ha probabilità $\dfrac{1}{3}$ di nascondere l'auto, e la mossa del conduttore non la cambia: una capra da mostrarti fra le altre due porte c'è sempre. Le altre due porte, insieme, valgono $\dfrac{2}{3}$; il conduttore ne ha aperta una vuota, e quel $\dfrac{2}{3}$ resta tutto sull'altra. Cambiando vinci due volte su tre. Se non ti convince, gioca un centinaio di volte nel laboratorio «Il banco e le tre porte».

### Il compleanno

In un gruppo di $23$ persone, la probabilità che almeno due compiano gli anni lo stesso giorno supera il $50\%$. Si calcola con il contrario, «tutti i compleanni diversi»: il secondo deve evitare il giorno del primo, il terzo i due giorni già presi, e così via: $\dfrac{365}{365}\cdot\dfrac{364}{365}\cdots\dfrac{343}{365} \approx 0{,}493$. Il contrario vale $1 - 0{,}493 = 0{,}507$.

Muovi il cursore per cambiare il numero di persone e guarda dove la curva supera il 50%.

[[grafico:compleanno]]

>* In tutti e due i paradossi l'intuito sbaglia per lo stesso motivo: guarda una porta sola o una coppia sola di persone, invece di contare tutti i casi. Fra $23$ persone le coppie sono $\binom{23}{2} = 253$.` }
  ],

  grafici: {
    almenoUno: {
      tipo: 'piano', x: [0, 40], y: [0, 1.15], passo: [5, 0.25], altezza: 420,
      proporzioni: 'libere',
      etichette: { x: 'prove', y: 'P' },
      parametri: [
        { nome: 'd', min: 2, max: 40, passo: 1, valore: 6, etichetta: 'l\'evento esce 1 volta su' },
        { nome: 'n', min: 1, max: 40, passo: 1, valore: 3, nascosto: true }
      ],
      funzioni: [{ f: '1 - (1 - 1/d)^x', colore: 1, dominio: [0, 40] }],
      elementi: [
        { tipo: 'orizzontale', y: 0.5, tratteggio: true, colore: 3, etichetta: '50%' },
        { tipo: 'verticale', x: 'n', tratteggio: true, colore: 4 },
        { tipo: 'punto', p: ['n', '1 - (1 - 1/d)^n'], trascina: true, colore: 2, etichetta: '{{n}} prove', posizione: 'basso-destra' },
        { tipo: 'testo', p: [2, 1.07], testo: 'almeno una volta: {{round(1000*(1 - (1 - 1/d)^n))/10}}%', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto arancione per cambiare il numero di prove, e guarda quando la curva passa sopra il 50%. Poi porta il cursore a 36 e cerca di nuovo il punto giusto.'
    },
    albero: {
      tipo: 'piano', x: [-1.4, 10], y: [-4.2, 4], assi: false, griglia: false, altezza: 460,
      proporzioni: 'libere',
      parametri: [
        { nome: 'm', min: 0.1, max: 20, passo: 0.1, valore: 1, etichetta: 'malati nella popolazione (%)' },
        { nome: 'f', min: 1, max: 20, passo: 1, valore: 5, etichetta: 'sani con test positivo (%)' }
      ],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [3, 2], colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: [3, -2], colore: 3 },
        { tipo: 'segmento', da: [3, 2], a: [6, 3], colore: 2 },
        { tipo: 'segmento', da: [3, 2], a: [6, 1], colore: 2 },
        { tipo: 'segmento', da: [3, -2], a: [6, -1], colore: 3 },
        { tipo: 'segmento', da: [3, -2], a: [6, -3], colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: '10 000', posizione: 'sinistra' },
        { tipo: 'punto', p: [3, 2], etichetta: 'M: {{round(100*m)}}', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'punto', p: [3, -2], etichetta: 'S: {{round(10000 - 100*m)}}', posizione: 'basso-sinistra', colore: 3 },
        { tipo: 'testo', p: [1.1, 1.45], testo: '{{m}}%' },
        { tipo: 'testo', p: [1.1, -1.75], testo: '{{100 - m}}%' },
        { tipo: 'testo', p: [4.5, 3.05], testo: '99%' },
        { tipo: 'testo', p: [4.5, 0.85], testo: '1%' },
        { tipo: 'testo', p: [4.5, -0.95], testo: '{{f}}%' },
        { tipo: 'testo', p: [4.5, -3.15], testo: '{{100 - f}}%' },
        { tipo: 'punto', p: [6, 3], colore: 2 },
        { tipo: 'punto', p: [6, 1], colore: 1 },
        { tipo: 'punto', p: [6, -1], colore: 2 },
        { tipo: 'punto', p: [6, -3], colore: 1 },
        { tipo: 'testo', p: [6.35, 2.9], testo: 'T⁺ {{round(99*m)}}', ancora: 'start' },
        { tipo: 'testo', p: [6.35, 0.9], testo: 'T⁻ {{round(m)}}', ancora: 'start' },
        { tipo: 'testo', p: [6.35, -1.1], testo: 'T⁺ {{round((100 - m)*f)}}', ancora: 'start' },
        { tipo: 'testo', p: [6.35, -3.1], testo: 'T⁻ {{round((100 - m)*(100 - f))}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.3, 3.6], testo: 'positivi davvero malati: {{round(1000*99*m/(99*m + (100 - m)*f))/10}}%', ancora: 'start' }
      ],
      didascalia: 'Il test su 10 000 persone: M malati, S sani, T⁺ positivi al test. Muovi i cursori e confronta le due foglie T⁺ arancioni: quando i malati sono pochi, i positivi sani sono molti di più.'
    },
    binomiale: {
      tipo: 'piano', x: [-0.7, 5.7], y: [-0.14, 1.1], altezza: 460,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'p', min: 0, max: 1, passo: 0.01, valore: 0.5, etichetta: 'probabilità di successo p' }],
      elementi: [
        { tipo: 'poligono', riempi: true, colore: 1, punti: [[-0.35, 0], [0.35, 0], [0.35, '(1-p)^5'], [-0.35, '(1-p)^5']] },
        { tipo: 'poligono', riempi: true, colore: 1, punti: [[0.65, 0], [1.35, 0], [1.35, '5*p*(1-p)^4'], [0.65, '5*p*(1-p)^4']] },
        { tipo: 'poligono', riempi: true, colore: 1, punti: [[1.65, 0], [2.35, 0], [2.35, '10*p^2*(1-p)^3'], [1.65, '10*p^2*(1-p)^3']] },
        { tipo: 'poligono', riempi: true, colore: 1, punti: [[2.65, 0], [3.35, 0], [3.35, '10*p^3*(1-p)^2'], [2.65, '10*p^3*(1-p)^2']] },
        { tipo: 'poligono', riempi: true, colore: 1, punti: [[3.65, 0], [4.35, 0], [4.35, '5*p^4*(1-p)'], [3.65, '5*p^4*(1-p)']] },
        { tipo: 'poligono', riempi: true, colore: 1, punti: [[4.65, 0], [5.35, 0], [5.35, 'p^5'], [4.65, 'p^5']] },
        { tipo: 'testo', p: [0, '(1-p)^5 + 0.04'], testo: '{{(1-p)^5}}' },
        { tipo: 'testo', p: [1, '5*p*(1-p)^4 + 0.04'], testo: '{{5*p*(1-p)^4}}' },
        { tipo: 'testo', p: [2, '10*p^2*(1-p)^3 + 0.04'], testo: '{{10*p^2*(1-p)^3}}' },
        { tipo: 'testo', p: [3, '10*p^3*(1-p)^2 + 0.04'], testo: '{{10*p^3*(1-p)^2}}' },
        { tipo: 'testo', p: [4, '5*p^4*(1-p) + 0.04'], testo: '{{5*p^4*(1-p)}}' },
        { tipo: 'testo', p: [5, 'p^5 + 0.04'], testo: '{{p^5}}' },
        { tipo: 'segmento', da: [-0.6, 0], a: [5.6, 0] },
        { tipo: 'testo', p: [0, -0.09], testo: 'k = 0' },
        { tipo: 'testo', p: [1, -0.09], testo: '1' },
        { tipo: 'testo', p: [2, -0.09], testo: '2' },
        { tipo: 'testo', p: [3, -0.09], testo: '3' },
        { tipo: 'testo', p: [4, -0.09], testo: '4' },
        { tipo: 'testo', p: [5, -0.09], testo: '5' },
        { tipo: 'segmento', da: ['5*p', 0], a: ['5*p', 0.9], tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [-0.6, 1.03], testo: 'n = 5    n · p = {{5*p}}', ancora: 'start' }
      ],
      didascalia: 'Distribuzione binomiale con 5 prove. Muovi p: la linea arancione segna n · p, e la barra più alta le resta sempre accanto. Con p = 1/6 (circa 0,17) sono i lanci di un dado in attesa del 6.'
    },
    compleanno: {
      tipo: 'piano', x: [1, 60], y: [0, 1.15], passo: [5, 0.25], altezza: 400,
      proporzioni: 'libere',
      etichette: { x: 'n', y: 'P' },
      funzioni: [{ f: '1 - exp(-x*(x - 1)/730 - (x - 1)*x*(2*x - 1)/1598700)', etichetta: 'P(almeno due compleanni uguali)', colore: 1, dominio: [1, 60] }],
      elementi: [
        { tipo: 'segmento', da: [1, 0.5], a: [60, 0.5], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['n', '1 - exp(-n*(n - 1)/730 - (n - 1)*n*(2*n - 1)/1598700)'], etichetta: 'n = {{n}}', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [4, 1.08], testo: 'P = {{1 - exp(-n*(n - 1)/730 - (n - 1)*n*(2*n - 1)/1598700)}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'n', min: 1, max: 60, passo: 1, valore: 23, etichetta: 'n' }],
      didascalia: 'Muovi n, il numero di persone, e trova dove la curva passa sopra la linea del 50%. Poi guarda quanto vale con 50 persone. (La curva usa una formula approssimata, che si discosta da quella esatta di meno di un millesimo.)'
    }
  },

  esempi: [
    { titolo: 'Somma di due dadi', problema: R`Si lanciano due dadi regolari. Qual è la probabilità che la somma dei punti sia $7$?`, passi: [
      R`Lo spazio campionario è fatto di **coppie ordinate**: il primo dado può dare $6$ risultati e per ciascuno il secondo ne può dare $6$, quindi i casi possibili sono $6 \cdot 6 = 36$, tutti equiprobabili.`,
      R`I casi favorevoli sono le coppie con somma $7$: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$. Sono $6$. Attenzione: $(1,6)$ e $(6,1)$ sono due casi distinti, perché i dadi sono distinguibili.`,
      R`Definizione classica: $P = \dfrac{6}{36} = \dfrac{1}{6} \approx 0{,}167$.`,
      R`Controllo di ragionevolezza: $7$ è la somma più frequente, e infatti $\dfrac{1}{6}$ è il valore più alto fra tutte le somme da $2$ a $12$.`
    ], risultato: R`$P = \dfrac{1}{6} \approx 0{,}167$` },

    { titolo: 'Unione di eventi compatibili', problema: R`Da un mazzo di $40$ carte napoletane si estrae una carta. Qual è la probabilità che sia una figura **oppure** una carta di coppe?`, passi: [
      R`Le figure sono $3$ per ciascuno dei $4$ semi (fante, cavallo, re): $P(F) = \dfrac{12}{40}$.`,
      R`Le carte di coppe sono $10$: $P(C) = \dfrac{10}{40}$.`,
      R`I due eventi sono **compatibili**: le figure di coppe sono $3$, quindi $P(F \cap C) = \dfrac{3}{40}$.`,
      R`$P(F \cup C) = \dfrac{12}{40} + \dfrac{10}{40} - \dfrac{3}{40} = \dfrac{19}{40} = 0{,}475$.`,
      R`Verifica per conteggio diretto: le carte favorevoli sono le $10$ di coppe più le $9$ figure degli altri tre semi, cioè $19$. ✓`
    ], risultato: R`$P = \dfrac{19}{40} = 0{,}475$` },

    { titolo: 'Almeno uno: si passa al contrario', problema: R`Si lancia un dado $4$ volte. Qual è la probabilità di ottenere almeno un $6$?`, passi: [
      R`Contare direttamente «almeno un $6$» richiederebbe di sommare i casi con uno, due, tre o quattro $6$: lungo. Si passa all'evento **contrario**, «nessun $6$».`,
      R`I quattro lanci sono indipendenti e in ciascuno la probabilità di non fare $6$ è $\dfrac{5}{6}$, quindi $P(\text{nessun } 6) = \left(\dfrac{5}{6}\right)^4 = \dfrac{625}{1296}$.`,
      R`$P(\text{almeno un } 6) = 1 - \dfrac{625}{1296} = \dfrac{671}{1296} \approx 0{,}518$.`,
      R`Poco più di $\dfrac{1}{2}$: scommettere su questo evento è leggermente vantaggioso. Il cavaliere de Méré ci guadagnava, ed è da qui che parte la storia della probabilità.`
    ], risultato: R`$P = \dfrac{671}{1296} \approx 0{,}518$` },

    { titolo: 'Estrazioni senza rimessa', problema: R`Un'urna contiene $4$ palline rosse e $6$ blu. Si estraggono due palline **senza** rimetterle dentro. Qual è la probabilità che siano di colore diverso?`, passi: [
      R`«Colore diverso» si realizza in due modi incompatibili: prima rossa e poi blu, oppure prima blu e poi rossa. Le probabilità si sommano.`,
      R`Rossa e poi blu: $P = \dfrac{4}{10} \cdot \dfrac{6}{9}$, perché dopo la prima estrazione restano $9$ palline di cui $6$ blu. Vale $\dfrac{24}{90}$.`,
      R`Blu e poi rossa: $P = \dfrac{6}{10} \cdot \dfrac{4}{9} = \dfrac{24}{90}$.`,
      R`Totale: $\dfrac{24}{90} + \dfrac{24}{90} = \dfrac{48}{90} = \dfrac{8}{15} \approx 0{,}533$.`,
      R`Controllo con le combinazioni: casi possibili $\binom{10}{2} = 45$, favorevoli $4 \cdot 6 = 24$, e $\dfrac{24}{45} = \dfrac{8}{15}$. ✓`
    ], risultato: R`$P = \dfrac{8}{15} \approx 0{,}533$` },

    { titolo: 'Bayes: quanto vale un test positivo', problema: R`Una malattia colpisce l'$1\%$ della popolazione. Un test risulta positivo sul $99\%$ dei malati e sul $5\%$ dei sani. Una persona scelta a caso risulta positiva: qual è la probabilità che sia malata?`, passi: [
      R`Le due cause possibili sono $M$ (malato) e $S$ (sano), con $P(M) = 0{,}01$ e $P(S) = 0{,}99$: formano una partizione.`,
      R`Dati del test: $P(T^+ \mid M) = 0{,}99$ e $P(T^+ \mid S) = 0{,}05$.`,
      R`Probabilità totale: $P(T^+) = 0{,}01 \cdot 0{,}99 + 0{,}99 \cdot 0{,}05 = 0{,}0099 + 0{,}0495 = 0{,}0594$.`,
      R`Bayes: $P(M \mid T^+) = \dfrac{0{,}0099}{0{,}0594} = \dfrac{1}{6} \approx 0{,}167$.`,
      R`Lettura con i numeri interi: su $10\,000$ persone, $99$ sono malate e positive, $495$ sono sane e positive. Fra i $594$ positivi i malati sono $99$, cioè uno su sei.`
    ], risultato: R`$P(M \mid T^+) = \dfrac{1}{6} \approx 16{,}7\%$` },

    { titolo: 'Formula di Bernoulli', problema: R`Una macchina produce pezzi difettosi con probabilità $0{,}1$, indipendentemente l'uno dall'altro. Su $6$ pezzi, qual è la probabilità che ce ne sia esattamente uno difettoso? E che ce ne sia al più uno?`, passi: [
      R`Siamo in uno schema di Bernoulli: $n = 6$, successo = «pezzo difettoso», $p = 0{,}1$, prove indipendenti.`,
      R`$P(1) = \binom{6}{1}(0{,}1)^1(0{,}9)^5 = 6 \cdot 0{,}1 \cdot 0{,}59049 = 0{,}354294$.`,
      R`«Al più uno» significa nessuno oppure uno: due eventi incompatibili, quindi le probabilità si sommano. Manca $P(0)$.`,
      R`$P(0) = \binom{6}{0}(0{,}1)^0(0{,}9)^6 = 0{,}531441$: tutti e sei i pezzi buoni.`,
      R`$P(\text{al più uno}) = 0{,}531441 + 0{,}354294 = 0{,}885735 \approx 0{,}886$.`,
      R`Nota: $P(0)$ e $P(1)$ da sole coprono già l'$88{,}6\%$ dei casi, perché con $p$ piccolo la distribuzione è schiacciata sui valori bassi di $k$.`
    ], risultato: R`$P(1) \approx 0{,}354$ e $P(\text{al più uno}) \approx 0{,}886$` }
  ]
  ,

  formulario: [
    { nome: 'Definizione classica', formula: R`P(E) = \frac{\text{casi favorevoli}}{\text{casi possibili}}`, nota: R`Vale solo se i casi possibili sono in numero finito e ugualmente possibili.` },
    { nome: 'Frequenza relativa', formula: R`f = \frac{\text{prove in cui } E \text{ si verifica}}{\text{numero delle prove}}`, nota: R`Legge empirica del caso: per un gran numero di prove $f \approx P(E)$.` },
    { nome: 'Assiomi di Kolmogorov', formula: R`P(E) \ge 0, \quad P(U) = 1, \quad P(A \cup B) = P(A) + P(B) \ \text{ se } A \cap B = \emptyset`, nota: R`Da qui segue $0 \le P(E) \le 1$ e $P(\emptyset) = 0$.` },
    { nome: 'Evento contrario', formula: R`P(\overline{E}) = 1 - P(E)`, nota: R`La via più corta per i problemi con «almeno uno».` },
    { nome: 'Unione di eventi incompatibili', formula: R`P(A \cup B) = P(A) + P(B)`, nota: R`Solo se $A \cap B = \emptyset$.` },
    { nome: 'Unione di eventi qualsiasi', formula: R`P(A \cup B) = P(A) + P(B) - P(A \cap B)` },
    { nome: 'Probabilità condizionata', formula: R`P(A \mid B) = \frac{P(A \cap B)}{P(B)}`, nota: R`Richiede $P(B) \ne 0$.` },
    { nome: 'Regola del prodotto', formula: R`P(A \cap B) = P(B) \cdot P(A \mid B)`, nota: R`Vale sempre; è la formula dei problemi in più passi (estrazioni senza rimessa).` },
    { nome: 'Eventi indipendenti', formula: R`P(A \cap B) = P(A) \cdot P(B)`, nota: R`Equivale a $P(A \mid B) = P(A)$.` },
    { nome: 'Almeno un successo', formula: R`P = 1 - (1 - p)^n`, nota: R`Con $n$ prove indipendenti di probabilità $p$ ciascuna.` },
    { nome: 'Probabilità totale', formula: R`P(E) = \sum_{i=1}^{n} P(H_i)\, P(E \mid H_i)`, nota: R`Gli $H_i$ devono essere incompatibili e coprire tutto $U$.` },
    { nome: 'Teorema di Bayes', formula: R`P(H_i \mid E) = \frac{P(H_i)\, P(E \mid H_i)}{P(E)}` },
    { nome: 'Formula di Bernoulli', formula: R`P(k) = \binom{n}{k}\, p^k (1-p)^{n-k}`, nota: R`$k$ successi in $n$ prove indipendenti con $p$ costante.` },
    { nome: 'Valore atteso', formula: R`E(X) = \sum_{i=1}^{n} x_i\, p_i`, nota: R`Il gioco è equo se il guadagno atteso è nullo.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Spazio campionario`, retro: R`L'insieme $U$ di tutti i risultati possibili di un esperimento aleatorio.` },
    { id: 'fc-02', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Evento`, retro: R`Un sottoinsieme dello spazio campionario. È **elementare** se contiene un solo risultato.` },
    { id: 'fc-03', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Evento certo ed evento impossibile`, retro: R`Certo: $U$, probabilità $1$. Impossibile: $\emptyset$, probabilità $0$.` },
    { id: 'fc-04', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Eventi incompatibili`, retro: R`Due eventi con $A \cap B = \emptyset$: non possono verificarsi insieme.` },
    { id: 'fc-05', sezione: 'definizione-classica', tipo: 'formula', fronte: R`Definizione classica di probabilità`, retro: R`$P(E) = \dfrac{\text{casi favorevoli}}{\text{casi possibili}}$, con i casi finiti e ugualmente possibili.` },
    { id: 'fc-06', sezione: 'definizione-classica', tipo: 'concetto', fronte: R`Quali sono i limiti della definizione classica?`, retro: R`Non si applica se i casi sono infiniti né se non sono equiprobabili (dado truccato, eventi non ripetibili).` },
    { id: 'fc-07', sezione: 'altre-definizioni', tipo: 'concetto', fronte: R`Legge empirica del caso`, retro: R`In un gran numero di prove la frequenza relativa di un evento si avvicina alla sua probabilità.` },
    { id: 'fc-08', sezione: 'altre-definizioni', tipo: 'concetto', fronte: R`Definizione soggettiva`, retro: R`La probabilità è il grado di fiducia di una persona, misurato dal prezzo che pagherebbe per una scommessa che rende $1$ se l'evento accade.` },
    { id: 'fc-09', sezione: 'altre-definizioni', tipo: 'definizione', fronte: R`Gli assiomi di Kolmogorov`, retro: R`$P(E) \ge 0$; $P(U) = 1$; se $A \cap B = \emptyset$ allora $P(A \cup B) = P(A) + P(B)$.` },
    { id: 'fc-10', sezione: 'contrario-unione', tipo: 'formula', fronte: R`Probabilità dell'evento contrario`, retro: R`$P(\overline{E}) = 1 - P(E)$` },
    { id: 'fc-11', sezione: 'contrario-unione', tipo: 'procedura', fronte: R`Come si affronta un problema con «almeno uno»?`, retro: R`Si calcola la probabilità dell'evento contrario, «nessuno», e si sottrae da $1$.` },
    { id: 'fc-12', sezione: 'contrario-unione', tipo: 'formula', fronte: R`Probabilità dell'unione di due eventi qualsiasi`, retro: R`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$` },
    { id: 'fc-13', sezione: 'contrario-unione', tipo: 'formula', fronte: R`Unione di due eventi incompatibili`, retro: R`$P(A \cup B) = P(A) + P(B)$, perché $P(A \cap B) = 0$.` },
    { id: 'fc-14', sezione: 'condizionata', tipo: 'formula', fronte: R`Probabilità condizionata`, retro: R`$P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$, con $P(B) \ne 0$.` },
    { id: 'fc-15', sezione: 'condizionata', tipo: 'concetto', fronte: R`Che cosa cambia in $P(A \mid B)$ rispetto a $P(A)$?`, retro: R`Lo spazio campionario si restringe a $B$: si contano solo i casi dentro $B$.` },
    { id: 'fc-16', sezione: 'condizionata', tipo: 'formula', fronte: R`Regola del prodotto`, retro: R`$P(A \cap B) = P(B) \cdot P(A \mid B)$. Vale sempre, anche per eventi dipendenti.` },
    { id: 'fc-17', sezione: 'indipendenza', tipo: 'definizione', fronte: R`Eventi indipendenti`, retro: R`$P(A \cap B) = P(A) \cdot P(B)$, cioè $P(A \mid B) = P(A)$: sapere che $B$ è accaduto non cambia nulla.` },
    { id: 'fc-18', sezione: 'indipendenza', tipo: 'concetto', fronte: R`Incompatibili e indipendenti sono la stessa cosa?`, retro: R`No: due eventi incompatibili di probabilità non nulla sono **dipendenti**, perché se accade uno l'altro è escluso.` },
    { id: 'fc-19', sezione: 'indipendenza', tipo: 'formula', fronte: R`Almeno un successo in $n$ prove indipendenti`, retro: R`$P = 1 - (1-p)^n$` },
    { id: 'fc-20', sezione: 'totale-bayes', tipo: 'formula', fronte: R`Teorema della probabilità totale`, retro: R`$P(E) = \sum_i P(H_i)\,P(E \mid H_i)$, con gli $H_i$ incompatibili e che coprono tutto $U$.` },
    { id: 'fc-21', sezione: 'totale-bayes', tipo: 'formula', fronte: R`Teorema di Bayes`, retro: R`$P(H_i \mid E) = \dfrac{P(H_i)\,P(E \mid H_i)}{P(E)}$` },
    { id: 'fc-22', sezione: 'totale-bayes', tipo: 'concetto', fronte: R`Perché un test positivo per una malattia rara dice poco?`, retro: R`Perché i sani sono molti di più: i loro falsi positivi superano i veri positivi dei malati.` },
    { id: 'fc-23', sezione: 'binomiale', tipo: 'definizione', fronte: R`Schema di Bernoulli`, retro: R`$n$ prove indipendenti, ognuna con due soli esiti e con la stessa probabilità di successo $p$.` },
    { id: 'fc-24', sezione: 'binomiale', tipo: 'formula', fronte: R`Formula di Bernoulli`, retro: R`$P(k) = \dbinom{n}{k} p^k (1-p)^{n-k}$: esattamente $k$ successi su $n$ prove.` },
    { id: 'fc-25', sezione: 'valore-atteso-paradossi', tipo: 'formula', fronte: R`Valore atteso`, retro: R`$E(X) = \sum_i x_i p_i$: la media dei valori pesata con le probabilità.` },
    { id: 'fc-26', sezione: 'valore-atteso-paradossi', tipo: 'concetto', fronte: R`Quando un gioco è equo?`, retro: R`Quando il guadagno atteso è nullo, cioè quando la posta è uguale al valore atteso della vincita.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Si lancia un dado regolare. Qual è la probabilità che esca un numero pari? (come frazione o decimale)`, suggerimenti: [R`Elenca lo spazio campionario e conta i casi favorevoli.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`Casi possibili: $6$, tutti equiprobabili.`, R`Casi favorevoli: $\{2, 4, 6\}$, cioè $3$.`, R`$P = \dfrac{3}{6} = \dfrac{1}{2} = 0{,}5$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Un'urna contiene $5$ palline rosse, $4$ verdi e $3$ gialle. Si estrae una pallina: qual è la probabilità che **non** sia gialla? (come frazione o decimale)`, suggerimenti: [R`Conviene passare all'evento contrario.`, R`$P(\text{gialla}) = \dfrac{3}{12}$.`], risposta: { tipo: 'numero', valore: 0.75, tolleranza: 0.01 }, soluzione: [R`Le palline sono in tutto $5 + 4 + 3 = 12$.`, R`$P(\text{gialla}) = \dfrac{3}{12} = \dfrac{1}{4}$.`, R`$P(\text{non gialla}) = 1 - \dfrac{1}{4} = \dfrac{3}{4} = 0{,}75$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Da un mazzo di $40$ carte napoletane si estrae una carta. Qual è la probabilità che sia un asso oppure una carta di spade? (come frazione o decimale)`, suggerimenti: [R`I due eventi sono compatibili: c'è una carta che appartiene a entrambi.`, R`Usa $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ e ricorda l'asso di spade.`], risposta: { tipo: 'numero', valore: 0.325, tolleranza: 0.01 }, soluzione: [R`Assi: $4$, quindi $P(A) = \dfrac{4}{40}$. Carte di spade: $10$, quindi $P(S) = \dfrac{10}{40}$.`, R`L'asso di spade sta in entrambi: $P(A \cap S) = \dfrac{1}{40}$.`, R`$P(A \cup S) = \dfrac{4 + 10 - 1}{40} = \dfrac{13}{40} = 0{,}325$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Si lanciano due dadi regolari. Qual è la probabilità che la somma sia $9$? (come frazione o decimale)`, suggerimenti: [R`I casi possibili sono $36$ coppie ordinate.`, R`Elenca le coppie: $(3,6), (4,5), \dots$`], risposta: { tipo: 'numero', valore: 0.1111, tolleranza: 0.01 }, soluzione: [R`Casi possibili: $6 \cdot 6 = 36$.`, R`Coppie con somma $9$: $(3,6), (4,5), (5,4), (6,3)$, cioè $4$.`, R`$P = \dfrac{4}{36} = \dfrac{1}{9} \approx 0{,}111$.`] },

    { id: 'es-05', difficolta: 2, testo: R`Si lancia una moneta $4$ volte. Qual è la probabilità di ottenere almeno una croce? (come frazione o decimale)`, suggerimenti: [R`«Almeno una» chiede l'evento contrario.`, R`Il contrario è «tutte teste»: quanto vale la sua probabilità?`], risposta: { tipo: 'numero', valore: 0.9375, tolleranza: 0.01 }, soluzione: [R`Evento contrario: «nessuna croce», cioè quattro teste.`, R`I lanci sono indipendenti: $P(TTTT) = \left(\dfrac{1}{2}\right)^4 = \dfrac{1}{16}$.`, R`$P(\text{almeno una croce}) = 1 - \dfrac{1}{16} = \dfrac{15}{16} = 0{,}9375$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Un'urna contiene $6$ palline bianche e $4$ nere. Si estraggono due palline **senza** rimetterle dentro. Qual è la probabilità che siano entrambe nere? (come frazione o decimale)`, suggerimenti: [R`Le due estrazioni non sono indipendenti: usa la regola del prodotto con la probabilità condizionata.`, R`Dopo la prima nera restano $9$ palline di cui $3$ nere.`], risposta: { tipo: 'numero', valore: 0.1333, tolleranza: 0.01 }, soluzione: [R`Prima nera: $P = \dfrac{4}{10}$.`, R`Seconda nera sapendo che la prima lo era: $P = \dfrac{3}{9}$.`, R`$P(\text{entrambe nere}) = \dfrac{4}{10} \cdot \dfrac{3}{9} = \dfrac{12}{90} = \dfrac{2}{15} \approx 0{,}133$.`] },

    { id: 'es-07', difficolta: 2, testo: R`In una scuola il $30\%$ degli studenti gioca a calcio, il $20\%$ a pallavolo e il $10\%$ a entrambi. Scelto a caso uno studente che gioca a calcio, qual è la probabilità che giochi anche a pallavolo? (come frazione o decimale)`, suggerimenti: [R`Ti stanno chiedendo una probabilità condizionata.`, R`$P(V \mid C) = \dfrac{P(V \cap C)}{P(C)}$.`], risposta: { tipo: 'numero', valore: 0.3333, tolleranza: 0.01 }, soluzione: [R`$P(C) = 0{,}30$, $P(V) = 0{,}20$, $P(V \cap C) = 0{,}10$.`, R`$P(V \mid C) = \dfrac{0{,}10}{0{,}30} = \dfrac{1}{3} \approx 0{,}333$.`, R`Il valore di $P(V)$ da solo non serviva: lo spazio si è ristretto a chi gioca a calcio.`] },

    { id: 'es-08', difficolta: 2, testo: R`Due tiratori sparano indipendentemente a un bersaglio: il primo lo colpisce con probabilità $0{,}7$, il secondo con probabilità $0{,}6$. Qual è la probabilità che il bersaglio venga colpito almeno una volta? (come frazione o decimale)`, suggerimenti: [R`Contrario: nessuno dei due colpisce.`, R`I due eventi sono indipendenti, quindi le probabilità di mancare si moltiplicano.`], risposta: { tipo: 'numero', valore: 0.88, tolleranza: 0.01 }, soluzione: [R`Il primo manca con probabilità $0{,}3$, il secondo con $0{,}4$.`, R`Per indipendenza, $P(\text{nessuno colpisce}) = 0{,}3 \cdot 0{,}4 = 0{,}12$.`, R`$P(\text{almeno uno}) = 1 - 0{,}12 = 0{,}88$.`, R`Sommare $0{,}7 + 0{,}6 = 1{,}3$ sarebbe assurdo: una probabilità non supera mai $1$.`] },

    { id: 'es-09', difficolta: 2, testo: R`Si lancia un dado $6$ volte. Qual è la probabilità di ottenere esattamente due volte il numero $6$? (come frazione o decimale)`, suggerimenti: [R`È uno schema di Bernoulli con $n = 6$ e $p = \dfrac{1}{6}$.`, R`Non dimenticare il coefficiente $\dbinom{6}{2}$.`], risposta: { tipo: 'numero', valore: 0.2009, tolleranza: 0.01 }, soluzione: [R`$P(2) = \dbinom{6}{2}\left(\dfrac{1}{6}\right)^2\left(\dfrac{5}{6}\right)^4$.`, R`$\dbinom{6}{2} = 15$ e $\left(\dfrac{5}{6}\right)^4 = \dfrac{625}{1296}$.`, R`$P(2) = 15 \cdot \dfrac{1}{36} \cdot \dfrac{625}{1296} = \dfrac{9375}{46656} \approx 0{,}201$.`] },

    { id: 'es-10', difficolta: 3, testo: R`L'urna $A$ contiene $3$ palline bianche e $7$ nere; l'urna $B$ contiene $6$ bianche e $4$ nere. Si sceglie a caso un'urna (con la stessa probabilità) e si estrae una pallina, che risulta bianca. Qual è la probabilità che provenga dall'urna $B$? (come frazione o decimale)`, suggerimenti: [R`Disegna l'albero: primo livello la scelta dell'urna, secondo livello il colore.`, R`Calcola prima $P(\text{bianca})$ con la probabilità totale.`, R`Poi applica Bayes: $P(B \mid \text{bianca}) = \dfrac{P(B)\,P(\text{bianca} \mid B)}{P(\text{bianca})}$.`], risposta: { tipo: 'numero', valore: 0.6667, tolleranza: 0.01 }, soluzione: [R`$P(A) = P(B) = 0{,}5$; $P(\text{bianca} \mid A) = 0{,}3$ e $P(\text{bianca} \mid B) = 0{,}6$.`, R`Probabilità totale: $P(\text{bianca}) = 0{,}5 \cdot 0{,}3 + 0{,}5 \cdot 0{,}6 = 0{,}15 + 0{,}30 = 0{,}45$.`, R`Bayes: $P(B \mid \text{bianca}) = \dfrac{0{,}30}{0{,}45} = \dfrac{2}{3} \approx 0{,}667$.`, R`Ha senso: l'urna $B$ ha il doppio delle palline bianche, quindi una bianca «accusa» $B$ con probabilità doppia rispetto ad $A$.`] },

    { id: 'es-11', difficolta: 3, testo: R`In un gioco si lanciano due dadi: si vincono $20$ euro se la somma è $7$, niente altrimenti. Quale posta rende il gioco equo? (rispondi in euro, come frazione o decimale)`, suggerimenti: [R`Calcola il valore atteso della vincita.`, R`$P(\text{somma } 7) = \dfrac{1}{6}$.`], risposta: { tipo: 'numero', valore: 3.3333, tolleranza: 0.02 }, soluzione: [R`$P(\text{somma } 7) = \dfrac{6}{36} = \dfrac{1}{6}$.`, R`Valore atteso della vincita: $E = 20 \cdot \dfrac{1}{6} + 0 \cdot \dfrac{5}{6} = \dfrac{20}{6} = \dfrac{10}{3}$ euro.`, R`Il gioco è equo se la posta vale quanto il valore atteso: circa $3{,}33$ euro. Con una posta di $5$ euro il giocatore perderebbe in media $1{,}67$ euro a partita.`] },

    { id: 'es-12', difficolta: 3, testo: R`In un gruppo di $4$ persone, qual è la probabilità che almeno due siano nate nello stesso giorno della settimana? (come frazione o decimale)`, suggerimenti: [R`È il paradosso del compleanno con $7$ giorni invece di $365$.`, R`Passa al contrario: tutte e quattro nate in giorni diversi.`, R`I casi possibili sono $7^4$; quelli con giorni tutti diversi sono $7 \cdot 6 \cdot 5 \cdot 4$.`], risposta: { tipo: 'numero', valore: 0.65, tolleranza: 0.01 }, soluzione: [R`Casi possibili: ogni persona può essere nata in $7$ giorni, quindi $7^4 = 2401$.`, R`Casi con tutti i giorni diversi: $7 \cdot 6 \cdot 5 \cdot 4 = 840$.`, R`$P(\text{tutti diversi}) = \dfrac{840}{2401} \approx 0{,}350$.`, R`$P(\text{almeno due uguali}) = 1 - \dfrac{840}{2401} = \dfrac{1561}{2401} \approx 0{,}650$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cos'è lo spazio campionario di un esperimento aleatorio?`, opzioni: [R`L'insieme dei risultati che ci interessano`, R`L'insieme di tutti i risultati possibili`, R`L'insieme dei risultati più probabili`, R`Il numero dei casi favorevoli`], corretta: 1, spiegazione: R`Lo spazio campionario $U$ contiene **tutti** i risultati possibili, non solo quelli che ci interessano: quelli formano un evento, cioè un suo sottoinsieme.` },
    { id: 'q-02', domanda: R`Quanto vale la probabilità dell'evento impossibile?`, opzioni: [R`$1$`, R`$-1$`, R`$0$`, R`Dipende dall'esperimento`], corretta: 2, spiegazione: R`L'evento impossibile è $\emptyset$: non ha casi favorevoli, quindi $P(\emptyset) = 0$. L'evento certo è $U$ e ha probabilità $1$; una probabilità non è mai negativa.` },
    { id: 'q-03', domanda: R`Se $P(E) = 0{,}3$, quanto vale $P(\overline{E})$?`, opzioni: [R`$0{,}7$`, R`$0{,}3$`, R`$-0{,}3$`, R`$1{,}3$`], corretta: 0, spiegazione: R`$P(\overline{E}) = 1 - P(E) = 1 - 0{,}3 = 0{,}7$. L'evento e il suo contrario si escludono e coprono tutto $U$, quindi le loro probabilità sommano a $1$.` },
    { id: 'q-04', domanda: R`Due eventi $A$ e $B$ si dicono incompatibili quando…`, opzioni: [R`$P(A) = P(B)$`, R`$P(A \cap B) = P(A) \cdot P(B)$`, R`$A \cup B = U$`, R`$A \cap B = \emptyset$`], corretta: 3, spiegazione: R`Incompatibili significa che non possono verificarsi insieme: la loro intersezione è vuota. La condizione $P(A \cap B) = P(A)P(B)$ è invece l'**indipendenza**, che è tutt'altro.` },
    { id: 'q-05', domanda: R`Per due eventi qualsiasi, $P(A \cup B)$ è uguale a…`, opzioni: [R`$P(A) + P(B)$`, R`$P(A) + P(B) - P(A \cap B)$`, R`$P(A) \cdot P(B)$`, R`$P(A) + P(B) + P(A \cap B)$`], corretta: 1, spiegazione: R`I casi comuni verrebbero contati due volte, quindi si sottrae $P(A \cap B)$. La formula $P(A) + P(B)$ vale solo se gli eventi sono incompatibili, cioè quando quel termine è nullo.` },
    { id: 'q-06', domanda: R`La definizione classica di probabilità richiede che…`, opzioni: [R`l'esperimento sia ripetibile molte volte`, R`i casi possibili siano finiti e ugualmente possibili`, R`gli eventi siano indipendenti`, R`la probabilità sia già nota per frequenza`], corretta: 1, spiegazione: R`Il rapporto «favorevoli su possibili» ha senso solo se i casi sono in numero finito e hanno tutti lo stesso peso. La ripetibilità serve invece alla definizione frequentista.` },
    { id: 'q-07', domanda: R`Che cosa afferma la legge empirica del caso?`, opzioni: [R`Dopo molte teste diventa più probabile croce`, R`La frequenza relativa, su molte prove, si avvicina alla probabilità`, R`Ogni evento ha probabilità $\dfrac{1}{2}$ se non si sa nulla`, R`La probabilità di un evento cambia con il numero di prove`], corretta: 1, spiegazione: R`È il legame fra dati osservati e probabilità teorica. L'idea che dopo molte teste diventi più probabile croce è la *fallacia del giocatore*: la moneta non ha memoria e la probabilità di ogni singolo lancio resta $\dfrac{1}{2}$.` },
    { id: 'q-08', domanda: R`La formula $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$ ha senso…`, opzioni: [R`sempre`, R`solo se $A$ e $B$ sono indipendenti`, R`solo se $P(B) \ne 0$`, R`solo se $A \subseteq B$`], corretta: 2, spiegazione: R`Il denominatore non può essere nullo: non ha senso condizionare a un evento impossibile. L'indipendenza non è richiesta, anzi la formula serve soprattutto quando manca.` },
    { id: 'q-09', domanda: R`Quale uguaglianza caratterizza due eventi indipendenti?`, opzioni: [R`$P(A \cap B) = P(A) \cdot P(B)$`, R`$P(A \cup B) = P(A) + P(B)$`, R`$P(A \cap B) = 0$`, R`$P(A) + P(B) = 1$`], corretta: 0, spiegazione: R`Indipendenza significa $P(A \mid B) = P(A)$, che per la regola del prodotto equivale a $P(A \cap B) = P(A)P(B)$. Le altre uguaglianze riguardano eventi incompatibili ($P(A \cap B) = 0$, che permette di sommare) o contrari ($P(A) + P(B) = 1$).` },
    { id: 'q-10', domanda: R`Due eventi incompatibili, entrambi con probabilità non nulla, sono anche indipendenti?`, opzioni: [R`Sì, sempre`, R`No: sono fortemente dipendenti`, R`Solo se hanno la stessa probabilità`, R`Solo se la loro unione è $U$`], corretta: 1, spiegazione: R`Se $A$ e $B$ sono incompatibili, sapere che è accaduto $B$ rende $A$ impossibile: $P(A \mid B) = 0 \ne P(A)$. Quindi sono dipendenti, e in effetti $P(A \cap B) = 0 \ne P(A)P(B)$.` },
    { id: 'q-11', domanda: R`Nel teorema di Bayes, che cosa sta al denominatore?`, opzioni: [R`La probabilità a priori $P(H)$`, R`La probabilità condizionata $P(E \mid H)$`, R`Il numero dei casi possibili`, R`La probabilità totale $P(E)$ dell'evento osservato`], corretta: 3, spiegazione: R`$P(H \mid E) = \dfrac{P(H)P(E \mid H)}{P(E)}$, e $P(E)$ si ottiene sommando i contributi di tutte le cause con il teorema della probabilità totale.` },
    { id: 'q-12', domanda: R`Un test per una malattia rara è positivo. Perché la probabilità di essere davvero malati può restare bassa?`, opzioni: [R`Perché i sani sono molti di più e i loro falsi positivi sono numerosi`, R`Perché il test non è affidabile sui malati`, R`Perché $P(M \mid T^+) = P(T^+ \mid M)$`, R`Perché la probabilità a priori non conta nel calcolo`], corretta: 0, spiegazione: R`Anche una piccola percentuale di errori su una popolazione grande produce più positivi di quanti ne producano i pochi malati. La probabilità a priori (la rarità della malattia) è invece decisiva, e $P(M \mid T^+)$ non è affatto uguale a $P(T^+ \mid M)$.` },
    { id: 'q-13', domanda: R`La formula di Bernoulli $\binom{n}{k}p^k(1-p)^{n-k}$ si può usare quando…`, opzioni: [R`le prove sono indipendenti e $p$ è costante`, R`le prove sono a due a due incompatibili`, R`i casi possibili sono equiprobabili`, R`$p = \dfrac{1}{2}$`], corretta: 0, spiegazione: R`Serve uno schema di Bernoulli: due soli esiti, probabilità di successo costante, prove indipendenti. Se $p$ cambia da una prova all'altra (per esempio estrazioni senza rimessa) la formula non vale.` },
    { id: 'q-14', domanda: R`In uno schema di Bernoulli con $n = 4$ e $p = 0{,}5$, quale numero di successi è il più probabile?`, opzioni: [R`$k = 0$`, R`$k = 1$`, R`$k = 2$`, R`$k = 4$`], corretta: 2, spiegazione: R`I valori sono $\dfrac{1}{16}, \dfrac{4}{16}, \dfrac{6}{16}, \dfrac{4}{16}, \dfrac{1}{16}$: la distribuzione è simmetrica e il massimo cade al centro, in $k = 2$.` },
    { id: 'q-15', domanda: R`Un gioco d'azzardo si dice equo quando…`, opzioni: [R`la probabilità di vincere è $\dfrac{1}{2}$`, R`il guadagno atteso del giocatore è nullo`, R`la vincita è maggiore della posta`, R`tutti i giocatori hanno la stessa posta`], corretta: 1, spiegazione: R`Equo significa che, giocando molte volte, in media non si guadagna né si perde: la posta è uguale al valore atteso della vincita. Alla roulette il valore atteso è minore della posta, e il gioco non è equo.` },
    { id: 'q-16', domanda: R`Nel problema di Monty Hall, cambiando porta la probabilità di vincere l'auto diventa…`, opzioni: [R`$\dfrac{1}{3}$, come all'inizio`, R`$\dfrac{1}{2}$, perché restano due porte`, R`$\dfrac{2}{3}$`, R`$1$`], corretta: 2, spiegazione: R`La porta scelta all'inizio vale $\dfrac{1}{3}$ e il conduttore, che sa dove sta l'auto, non porta informazione su di essa; il rimanente $\dfrac{2}{3}$ si concentra sull'unica altra porta ancora chiusa. Le due porte finali non sono equiprobabili.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di calcolare, scrivi qual è lo spazio campionario e quali eventi stai considerando. Metà degli errori di probabilità sono errori di conteggio dei casi possibili.` },
    { tipo: 'errore', testo: R`Una probabilità sta sempre fra $0$ e $1$. Se ti viene $1{,}3$ hai quasi certamente sommato le probabilità di eventi compatibili senza togliere l'intersezione.` },
    { tipo: 'trucco', testo: R`Quando leggi «almeno uno», pensa subito al contrario: $1 - P(\text{nessuno})$. Quasi sempre è un conto solo invece di quattro.` },
    { tipo: 'errore', testo: R`$P(A \mid B)$ e $P(B \mid A)$ sono numeri diversi. «La maggior parte dei malati è positiva» non significa «la maggior parte dei positivi è malata».` },
    { tipo: 'metodo', testo: R`Nei problemi in più passi (estrazioni, urne, test) disegna l'albero: lungo un ramo si moltiplica, fra rami diversi si somma. Le probabilità che escono da uno stesso nodo devono sommare a $1$.` },
    { tipo: 'errore', testo: R`Con o senza rimessa cambia tutto: con rimessa le prove sono indipendenti e si moltiplicano probabilità uguali, senza rimessa la seconda probabilità è condizionata dalla prima.` },
    { tipo: 'trucco', testo: R`Se un risultato di Bayes ti sembra assurdo, riscrivilo con una popolazione di $10\,000$ persone e conta le teste: i numeri interi convincono più delle frazioni.` },
    { tipo: 'errore', testo: R`Nella formula di Bernoulli non dimenticare $\binom{n}{k}$: senza, stai calcolando la probabilità di **una** particolare sequenza, non di $k$ successi in qualunque ordine.` },
    { tipo: 'metodo', testo: R`Controlla sempre la somma: le probabilità di tutti i valori di $k$ in una binomiale devono fare $1$, e $P(E) + P(\overline{E})$ pure.` },
    { tipo: 'trucco', testo: R`Il paradosso del compleanno diventa ovvio contando le coppie: fra $23$ persone ci sono $\binom{23}{2} = 253$ coppie, non $23$ persone da confrontare con te.` }
  ],

  aneddoti: [
    { matematico: 'Girolamo Cardano', anni: '1501–1576', titolo: 'Il primo manuale per vincere ai dadi', testo: R`Cardano era medico, astrologo, algebrista e giocatore d'azzardo incallito: per anni visse letteralmente di dadi e di carte. Verso il 1560 scrisse il *Liber de ludo aleae*, il primo testo che affronta il gioco con il calcolo invece che con la superstizione: ci sono già l'idea di contare i casi «ugualmente possibili», il conto dei modi di ottenere ciascuna somma con due dadi e perfino un capitolo su come barare, incluso per riconoscere chi bara. Il libro rimase nel cassetto e fu stampato solo nel 1663, quasi un secolo dopo la sua morte e nove anni dopo la corrispondenza fra Pascal e Fermat: se fosse uscito subito, la probabilità sarebbe nata con cent'anni di anticipo.`, legame: R`Il rapporto «casi favorevoli su casi possibili» compare per la prima volta nelle pagine di Cardano dedicate ai dadi.` },

    { matematico: 'Blaise Pascal e Pierre de Fermat', anni: '1623–1662 e 1601–1665', titolo: 'Il cavaliere, i dadi e poche lettere', testo: R`Nel 1654 Antoine Gombaud, cavaliere de Méré, giocatore e uomo di lettere, pose a Pascal due domande. La prima veniva dai suoi conti al tavolo: scommettere su «almeno un $6$ in quattro lanci» conveniva, scommettere su «almeno un doppio $6$ in ventiquattro lanci di due dadi» no, e lui non capiva perché. La seconda era il *problema delle parti*: come dividere la posta se una partita viene interrotta a punteggio incompleto. Pascal ne scrisse a Fermat, e in un carteggio di poche lettere i due fondarono il calcolo delle probabilità, arrivando per due strade diverse alla stessa risposta. Poco dopo, la notte del 23 novembre 1654, Pascal ebbe un'esperienza mistica: cucì il resoconto nella fodera della giacca e lasciò quasi del tutto la matematica.`, legame: R`Il problema di de Méré si risolve con $1 - (1-p)^n$: $1 - (5/6)^4 \approx 0{,}518$ contro $1 - (35/36)^{24} \approx 0{,}491$.` },

    { matematico: 'Jacob Bernoulli', anni: '1655–1705', titolo: 'Vent\'anni per dimostrare l\'ovvio', testo: R`Che lanciando molte volte una moneta la frequenza delle teste si avvicini a un mezzo lo sapevano tutti; Jacob Bernoulli volle **dimostrarlo**. Ci lavorò per vent'anni e lo chiamò il suo «teorema aureo»: è la prima legge dei grandi numeri, che quantifica quante prove servono perché la frequenza si discosti dalla probabilità meno di una soglia fissata, con la fiducia voluta. Scrisse anche che il risultato è tale «che perfino l'uomo più stupido lo riconosce per istinto naturale», e proprio per questo andava provato. L'opera, l'*Ars conjectandi*, restò incompiuta alla sua morte e fu pubblicata dal nipote Nicolaus nel 1713.`, legame: R`È la giustificazione teorica della legge empirica del caso e delle prove ripetute: da lui prendono nome lo schema di Bernoulli e la sua formula.` },

    { matematico: 'Thomas Bayes', anni: '1702–1761', titolo: 'Un teorema pubblicato dopo la morte', testo: R`Bayes era un pastore presbiteriano inglese che si occupava di matematica per interesse personale. Fra le sue carte, alla sua morte, l'amico Richard Price trovò un saggio inedito, *An Essay towards solving a Problem in the Doctrine of Chances*, e lo presentò alla Royal Society nel 1763. Il problema affrontato è il rovescio di quello di Pascal: non «date le cause, che effetti aspettarsi», ma «osservato l'effetto, quanto credere a ciascuna causa». Per due secoli il risultato rimase marginale e contestato, perché richiede di assegnare una probabilità a priori. Oggi regge i filtri antispam, la diagnostica medica, la ricerca dei relitti in mare e buona parte dell'apprendimento automatico. Bayes non lo seppe mai.`, legame: R`Il suo teorema è quello che trasforma $P(T^+ \mid M)$ in $P(M \mid T^+)$: il conto del test medico.` },

    { matematico: 'Andrej Nikolaevič Kolmogorov', anni: '1903–1987', titolo: 'Tre assiomi e la probabilità diventa matematica', testo: R`All'inizio del Novecento la probabilità era una tecnica utile ma senza fondamenta: Hilbert la mise nel 1900 fra i suoi problemi aperti, chiedendo di darle una base rigorosa come alla geometria. La risposta arrivò nel 1933 da un trentenne di Mosca: nel breve libro *Grundbegriffe der Wahrscheinlichkeitsrechnung*, Kolmogorov smise di chiedersi che cosa *sia* la probabilità e la definì con tre assiomi, appoggiandosi alla teoria della misura di Lebesgue. Da quel momento gli eventi sono insiemi, la probabilità è una misura di massa totale $1$, e tutto il resto si dimostra. Kolmogorov lavorò poi su turbolenza, complessità e balistica, e fu anche un instancabile organizzatore di scuole per ragazzi dotati.`, legame: R`Gli assiomi $P(E) \ge 0$, $P(U) = 1$ e l'additività sugli eventi incompatibili sono la base da cui si ricavano tutte le formule di questo argomento.` }
  ]
});
})();
