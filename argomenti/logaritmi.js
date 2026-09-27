(function () {
const R = String.raw;
/* allenamento: tre caselle. valore(v) per i logaritmi da calcolare (accetta anche 1/2, -2, 0,5);
   sol(v) e NESSUNA per le equazioni logaritmiche (stessa casella e stessi simboli, così la casella
   non dice se la soluzione c'è); dec(v) per le equazioni esponenziali risolte con i logaritmi:
   si chiede il risultato con due cifre decimali, e la tolleranza 0,01 accetta sia l'arrotondamento
   sia il troncamento (si allena il metodo, non l'ultima cifra). */
const SIMB = ['/', '−', '√', '^', '(', ')'];
const SEGNA_EQ = 'es. 5/2 oppure nessuna';
const valore = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'es. -5 oppure 2/3', simboli: SIMB });
const sol = v => ({ tipo: 'numeri', valori: [v], tolleranza: 0.005, segnaposto: SEGNA_EQ, simboli: SIMB });
const NESSUNA = { tipo: 'testo', accettate: ['nessuna', 'nessuna soluzione', 'nessuno', 'impossibile', 'non ci sono soluzioni', 'non ha soluzioni', '∅', 'ø', '{}', 'S = ∅', 'insieme vuoto'], segnaposto: SEGNA_EQ, simboli: SIMB };
const dec = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'es. 1,23', simboli: ['−', '(', ')'] });
COMPASSO.registra({
  id: 'logaritmi',
  titolo: 'Logaritmi',

  introduzione: R`Un capitale cresce del $5\%$ all'anno: dopo quanti anni raddoppia? Devi risolvere $1{,}05^x = 2$, dove l'incognita è un **esponente**. Per trovarla serve il logaritmo.

Il **logaritmo** $\log_a b$ è l'esponente da dare ad $a$ per ottenere $b$. Per esempio $\log_2 8 = 3$, perché $2^3 = 8$.

Ti servono le proprietà delle potenze e il grafico di $y = a^x$.`,

  inBreve: [
    R`$\log_a b = x$ vuol dire $a^x = b$: il logaritmo è un esponente. Esiste solo con base $a > 0$, $a \ne 1$ e argomento $b > 0$.`,
    R`Il logaritmo trasforma i prodotti in somme: $\log_a(bc) = \log_a b + \log_a c$. Poi $\log_a \frac{b}{c} = \log_a b - \log_a c$ e $\log_a b^k = k\log_a b$. Per una somma dentro l'argomento non c'è nessuna regola.`,
    R`Per cambiare base: $\log_a b = \dfrac{\log b}{\log a}$, oppure con $\ln$. Così lo calcoli con la calcolatrice.`,
    R`Il grafico di $y = \log_a x$ è il simmetrico di $y = a^x$ rispetto alla retta $y = x$. Passa per $(1;0)$, esiste solo per $x > 0$ e ha l'asintoto verticale $x = 0$.`,
    R`Nelle equazioni e disequazioni logaritmiche scrivi **prima** le condizioni di esistenza: argomenti positivi. Con base fra $0$ e $1$, nelle disequazioni il verso si rovescia.`,
    R`Un'equazione come $a^x = b$ si risolve prendendo il logaritmo dei due membri: $x = \dfrac{\log b}{\log a}$.`
  ],

  sezioni: [
    { id: 'definizione', titolo: 'Definizione di logaritmo', testo: R`A quale numero devi elevare $2$ per ottenere $8$? A $3$. Questo $3$ è il **logaritmo in base $2$ di $8$** e si scrive $\log_2 8 = 3$. Il $2$ in basso è la **base**, l'$8$ è l'**argomento**.

>* **Definizione:** $$\log_a b = x \iff a^x = b$$ con $a > 0$, $a \ne 1$, $b > 0$. Il logaritmo è l'esponente da dare alla base per ottenere l'argomento.

Per calcolare un logaritmo, scrivi l'argomento come potenza della base:

~ \log_3 \frac19 = x :: cerco l'esponente $x$
~ 3^x = \frac19 :: stessa cosa, detta con la definizione
~ 3^x = \evid{3^{-2}} :: $\frac19 = \frac{1}{3^2} = 3^{-2}$
~ x = \evidb{-2} :: stessa base, esponenti uguali

Una potenza con base positiva è sempre positiva, quindi l'argomento deve essere **positivo**: $\log_2(-4)$ e $\log_2 0$ non esistono. La base $1$ è esclusa perché $1^x$ vale sempre $1$.

Trascina $P$ lungo la curva e porta $p$ a $1$, $2$, $4$, $8$: che cosa fa il logaritmo? E vicino a $0$?

[[grafico:puntoMobile]]

?? Quanto vale $\log_4 2$?
[x] $\frac12$
[ ] $2$
[ ] $-2$
[ ] $8$
=> Cerco $x$ con $4^x = 2$, e siccome $\sqrt4 = 2$, $x = \frac12$. La risposta $2$ scambia base e argomento: è $\log_2 4$.

>! Deve essere positivo l'**argomento**, non il risultato: $\log_3 \frac19 = -2$ va bene. Con base maggiore di $1$, il logaritmo è negativo se l'argomento sta fra $0$ e $1$.` },

    { id: 'logaritmi-notevoli', titolo: 'Logaritmi notevoli: decimale e naturale', testo: R`Due logaritmi hanno lo stesso valore con qualunque base.

>* Per ogni base $\log_a 1 = 0$, perché $a^0 = 1$, e $\log_a a = 1$, perché $a^1 = a$.

Due basi hanno un simbolo tutto loro e sono le uniche sui tasti della calcolatrice.

| nome | si scrive | base | tasto |
|---|---|---|---|
| logaritmo decimale | $\log b$ | $10$ | log |
| logaritmo naturale | $\ln b$ | $e \approx 2{,}718$ | ln |

Il **logaritmo decimale** conta gli zeri: $\log 1000 = 3$, $\log 0{,}01 = -2$. Il **logaritmo naturale** ha come base il numero di Nepero $e$ e lo userai molto con le derivate.

?? Quanto vale $\log 0{,}001$?
[x] $-3$
[ ] $3$
[ ] $-2$
[ ] non esiste, perché l'argomento è minore di $1$
=> $0{,}001 = \frac{1}{1000} = 10^{-3}$, quindi $\log 0{,}001 = -3$. L'argomento è positivo, quindi il logaritmo esiste, ma è minore di $1$ e il logaritmo viene negativo. Chi risponde $-2$ conta solo gli zeri dopo la virgola.

>! Senza base scritta, $\log$ vuol dire base $10$, mentre $\ln$ vuol dire base $e$: $\log 10 = 1$, ma $\ln 10 \approx 2{,}303$.` },

    { id: 'proprieta', titolo: 'Le proprietà dei logaritmi', testo: R`Guarda: $8 \cdot 4 = 32$, cioè $2^3 \cdot 2^2 = 2^5$. Moltiplicando le potenze, gli esponenti si **sommano**.

I logaritmi sono esponenti, quindi il logaritmo di un prodotto è la somma dei logaritmi: $\log_2 32 = \log_2 8 + \log_2 4 = 3 + 2$. Con le lettere:

~ \log_a b = x,\quad \log_a c = y :: do un nome ai due logaritmi
~ \evid{a^x = b},\quad \evid{a^y = c} :: per la definizione
~ b \cdot c = a^x \cdot a^y = a^{\evid{x+y}} :: prodotto di potenze con la stessa base
~ \log_a(bc) = \evidb{x + y} = \log_a b + \log_a c :: di nuovo la definizione, letta al contrario

>* Con $a > 0$, $a \ne 1$, $b > 0$, $c > 0$: $$\log_a(b \cdot c) = \log_a b + \log_a c$$ $$\log_a\frac{b}{c} = \log_a b - \log_a c$$ $$\log_a b^k = k \log_a b$$ Sono le proprietà del **prodotto**, del **quoziente** e della **potenza**.

La proprietà della potenza vale anche per le radici: $\log_a \sqrt[n]{b} = \log_a b^{\frac1n} = \frac1n\log_a b$.

Le proprietà servono anche al contrario, per riunire più logaritmi in uno solo:

~ 2\log_3 6 - \log_3 4 :: due logaritmi nella stessa base
~ \log_3 \evid{6^2} - \log_3 4 :: potenza: il $2$ davanti diventa esponente
~ \log_3 \evid{\frac{36}{4}} :: quoziente: la differenza diventa una divisione
~ \log_3 9 = \evidb{2} :: perché $3^2 = 9$

?? Quanto fa $\log 2 + \log 5$?
[x] $1$
[ ] $\log 7$
[ ] $\log 2 \cdot \log 5$
[ ] $\log 25$
=> Per la proprietà del prodotto $\log 2 + \log 5 = \log(2 \cdot 5) = \log 10 = 1$. $\log 7$ somma gli argomenti invece di moltiplicarli: è l'errore più diffuso.

Nella scheda **Laboratorio** c'è *Il regolo calcolatore*: moltiplica i numeri sommando lunghezze.

>! Non c'è nessuna regola per una somma **dentro** l'argomento: $\log_a(b + c)$ non si spezza. Prova con $b = c = 1$: $\log(1 + 1) = \log 2 \approx 0{,}301$, ma $\log 1 + \log 1 = 0$.` },

    { id: 'cambiamento-base', titolo: 'Il cambiamento di base', testo: R`Quanto vale $\log_2 5$? Sta fra $2$ e $3$, perché $2^2 = 4$ e $2^3 = 8$. Sulla calcolatrice però ci sono solo log e ln, quindi serve una formula per cambiare base.

~ \log_2 5 = x :: cerco questo numero
~ 2^x = 5 :: definizione di logaritmo
~ \evid{\ln}(2^x) = \evid{\ln} 5 :: prendo il logaritmo naturale dei due membri
~ \evid{x}\ln 2 = \ln 5 :: proprietà della potenza: l'esponente scende davanti
~ x = \evidb{\frac{\ln 5}{\ln 2}} \approx \frac{1{,}609}{0{,}693} \approx 2{,}32 :: divido per $\ln 2$

>* **Cambiamento di base**: $$\log_a b = \frac{\log_c b}{\log_c a}$$ con $c > 0$, $c \ne 1$, di solito $10$ oppure $e$. Sopra l'argomento, sotto la base.

Controllo: $2^{2{,}32} \approx 4{,}99$, quasi $5$.

> Con $c = b$ ottieni $\log_a b = \dfrac{1}{\log_b a}$, perché $\log_b b = 1$.

?? Quanto vale $\log_9 27$?
[x] $\frac32$
[ ] $3$
[ ] $\frac23$
[ ] $\frac13$
=> Con la base $3$: $\log_9 27 = \frac{\log_3 27}{\log_3 9} = \frac32$. Controllo: $9^{\frac32} = \left(\sqrt9\right)^3 = 27$. La risposta $\frac23$ mette la base sopra: è $\log_{27} 9$.

>! Il $\ln$ non si semplifica: $\frac{\ln 5}{\ln 2}$ non è $\ln\frac52$.` },

    { id: 'inversa-esponenziale', titolo: 'Logaritmo ed esponenziale: funzioni inverse', testo: R`La funzione $y = 2^x$ prende un esponente e dà una potenza: $3 \mapsto 8$. Il logaritmo in base $2$ fa il viaggio opposto, $8 \mapsto 3$: è la **funzione inversa** di $y = 2^x$.

Il punto $(3;8)$ del primo grafico diventa il punto $(8;3)$ del secondo. Scambiare le coordinate vuol dire ribaltare il punto rispetto alla retta $y = x$: trascina $P$ e guarda dove finisce $Q$.

[[grafico:inversa]]

>* $y = \log_a x$ è l'inversa di $y = a^x$: i due grafici sono simmetrici rispetto alla retta $y = x$. Una funzione disfa l'altra: $$a^{\log_a x} = x$$ per ogni $x > 0$, e $$\log_a\left(a^x\right) = x$$ per ogni $x$.

Dalla simmetria leggi le proprietà del logaritmo:

| | $y = a^x$ | $y = \log_a x$ |
|---|---|---|
| passa per | $(0;1)$ | $(1;0)$ |
| asintoto | orizzontale, $y = 0$ | verticale, $x = 0$ |
| accetta | tutti i numeri | solo $x > 0$ |
| dà | solo valori positivi | tutti i valori |

?? Quanto fa $2^{\log_2 7}$?
[x] $7$
[ ] $14$
[ ] $2^7$
[ ] $\log_2 7$
=> $\log_2 7$ è l'esponente da dare a $2$ per ottenere $7$. Se dai a $2$ proprio quell'esponente, ottieni $7$.

>! «Inversa» non vuol dire reciproca: l'inversa di $2^x$ è $\log_2 x$, non $\frac{1}{2^x}$.` },

    { id: 'funzione-logaritmica', titolo: 'Dominio, andamento e asintoto', testo: R`Come cambia il grafico di $y = \log_a x$ se cambi la base? La curva passa sempre per $(a;1)$, perché $\log_a a = 1$, quindi trascinando quel punto cambi la base. Guarda cosa succede quando $a$ scende sotto $1$.

[[grafico:baseVariabile]]

>* **Funzione logaritmica** $y = \log_a x$, con $a > 0$ e $a \ne 1$. Il dominio è $x > 0$ e l'asintoto verticale è $x = 0$, cioè l'asse $y$. Passa sempre per $(1;0)$, perché $\log_a 1 = 0$. È **crescente** se $a > 1$, **decrescente** se $0 < a < 1$.

Con $a > 1$ la curva sale sempre, ma sempre più piano: da $x = 1000$ a $x = 1\,000\,000$, $\log x$ passa solo da $3$ a $6$. Però non ha un asintoto orizzontale, perché prima o poi supera qualunque altezza.

?? Per quali $x$ si ha $\log_{\frac12} x > 0$?
[x] $0 < x < 1$
[ ] $x > 1$
[ ] $x > 0$
[ ] $x > \frac12$
=> Con base $\frac12$ la funzione è decrescente e passa per $(1;0)$, quindi sta sopra l'asse $x$ a **sinistra** di $1$. Controllo: $\log_{\frac12}\frac14 = 2 > 0$. La risposta $x > 1$ vale per le basi maggiori di $1$.

>! Il dominio è $x > 0$ con qualunque base, e $x = 0$ è escluso. Il valore del logaritmo invece può essere negativo.` },

    { id: 'equazioni-logaritmiche', titolo: 'Le equazioni logaritmiche', testo: R`Un'**equazione logaritmica** ha l'incognita dentro un logaritmo. Le più semplici si risolvono con la definizione: $\log_2(x+1) = 3$ vuol dire $x + 1 = 2^3 = 8$, quindi $x = 7$.

Con più logaritmi, segui questi passi:

1. Scrivi le **condizioni di esistenza** (c.e.): ogni argomento deve essere positivo.
2. Usa le proprietà: un solo logaritmo per parte, nella stessa base.
3. Togli i logaritmi e uguaglia gli argomenti.
4. Risolvi, e tieni solo le soluzioni che rispettano le c.e.

>* Se $\log_a f(x) = \log_a g(x)$, allora $f(x) = g(x)$. Ogni soluzione però va confrontata con le c.e.

~ \log(x-1) + \log(x+2) = \log(2x+10) :: tre logaritmi
~ x - 1 > 0,\quad x + 2 > 0,\quad 2x + 10 > 0 \ \Rightarrow\ \evid{x > 1} :: c.e., sugli argomenti di partenza: devono valere tutte
~ \log\left[\evid{(x-1)(x+2)}\right] = \log(2x+10) :: proprietà del prodotto
~ (x-1)(x+2) = 2x + 10 :: tolgo i logaritmi: argomenti uguali
~ x^2 - x - 12 = 0 :: svolgo e porto tutto a sinistra
~ x = \evidb{4} \quad (x = -3 \text{ scartata}) :: $-3$ non rispetta $x > 1$

?? Risolvendo $\log_2 x + \log_2(x-2) = 3$ arrivi a $x^2 - 2x - 8 = 0$, con soluzioni $4$ e $-2$. Quali sono le soluzioni dell'equazione?
[x] solo $x = 4$
[ ] $x = 4$ e $x = -2$
[ ] solo $x = -2$
[ ] nessuna
=> Le c.e. sono $x > 0$ e $x - 2 > 0$, cioè $x > 2$. $x = -2$ non le rispetta: $\log_2(-2)$ non esiste. Controllo con $x = 4$: $\log_2 4 + \log_2 2 = 2 + 1 = 3$.

Alcune equazioni si risolvono con una **sostituzione**. In $(\ln x)^2 - \ln x - 2 = 0$, con c.e. $x > 0$, poni $t = \ln x$ e ottieni $t^2 - t - 2 = 0$. Le soluzioni sono $t = 2$ e $t = -1$, quindi $x = e^2$ oppure $x = e^{-1}$. Nessuna $t$ va scartata, perché il logaritmo può valere qualunque numero.

>! Scrivi le c.e. **prima** di usare le proprietà, sugli argomenti di partenza, perché dopo il dominio sembra più largo. Per esempio $(x-1)(x+2) > 0$ vale anche per $x < -2$, dove $\log(x-1)$ non esiste.` },

    { id: 'disequazioni-logaritmiche', titolo: 'Le disequazioni logaritmiche', testo: R`Le **disequazioni logaritmiche** si risolvono come le equazioni: c.e., un logaritmo per parte, poi togli i logaritmi. Il passo delicato è l'ultimo, perché devi decidere il verso.

| base | il logaritmo è | togliendo i logaritmi, il verso |
|---|---|---|
| $a > 1$ | crescente | **resta** |
| $0 < a < 1$ | decrescente | **si rovescia** |

>* Da $\log_a f(x) > \log_a g(x)$ passi a $f(x) > g(x)$ se $a > 1$, e a $f(x) < g(x)$ se $0 < a < 1$. Alla fine prendi la parte comune con le c.e.

Con base maggiore di $1$: $\log_2(x-1) \le 3$, con c.e. $x > 1$. Scrivi $3 = \log_2 8$ e togli i logaritmi: $x - 1 \le 8$, cioè $x \le 9$. Con le c.e.: $1 < x \le 9$.

Con base minore di $1$:

~ \log_{\frac12}(x+3) \ge -2 :: base $\frac12$, fra $0$ e $1$
~ \evid{x > -3} :: c.e.: l'argomento deve essere positivo
~ \log_{\frac12}(x+3) \ge \log_{\frac12} \evid{4} :: $-2 = \log_{\frac12} 4$, perché $\left(\frac12\right)^{-2} = 4$
~ x + 3 \ \evid{\le}\ 4 :: tolgo i logaritmi e **rovescio il verso**
~ x \le 1 :: porto il $3$ a destra
~ \evidb{-3 < x \le 1} :: parte comune con le c.e.

?? Risolvi $\log_{\frac13} x > 1$.
[x] $0 < x < \frac13$
[ ] $x > \frac13$
[ ] $x < \frac13$
[ ] $x > 3$
=> C.e.: $x > 0$. Scrivo $1 = \log_{\frac13}\frac13$ e, siccome la base è minore di $1$, rovescio il verso: $x < \frac13$. Con le c.e.: $0 < x < \frac13$. La risposta $x < \frac13$ dimentica le c.e., la risposta $x > \frac13$ non rovescia il verso.

>! Due dimenticanze tipiche: non rovesciare il verso con base fra $0$ e $1$, e non fare la parte comune con le c.e.` },

    { id: 'esponenziali-con-logaritmi', titolo: 'Risolvere le equazioni esponenziali con i logaritmi', testo: R`$2^x = 8$ si risolve scrivendo $8 = 2^3$. E $2^x = 5$? $5$ non è una potenza intera di $2$, ma la soluzione c'è lo stesso: è $x = \log_2 5$. Per calcolarla prendi il logaritmo dei due membri, così l'incognita scende dall'esponente.

>* Da $a^x = b$, con $b > 0$, prendi il logaritmo dei due membri: $$x \log a = \log b \quad\Longrightarrow\quad x = \frac{\log b}{\log a}.$$ Va bene anche $\ln$ al posto di $\log$.

Serve per le domande «dopo quanto tempo». Una colonia di batteri cresce del $10\%$ all'ora: dopo quante ore raddoppia?

~ N_0 \cdot 1{,}1^t = 2N_0 :: crescere del $10\%$ vuol dire moltiplicare per $1{,}1$ ogni ora
~ 1{,}1^t = 2 :: divido per $N_0$: la quantità iniziale non conta
~ \evid{\ln}\left(1{,}1^t\right) = \evid{\ln} 2 :: logaritmo naturale dei due membri
~ \evid{t} \ln 1{,}1 = \ln 2 :: l'esponente scende davanti
~ t = \frac{\ln 2}{\ln 1{,}1} \approx \frac{0{,}693}{0{,}0953} \approx \evidb{7{,}27} :: divido per $\ln 1{,}1$

Poco più di $7$ ore. Lo schema funziona anche con esponenti più complicati: da $3^{x+1} = 20$ ottieni $(x + 1)\ln 3 = \ln 20$, cioè $x = \frac{\ln 20}{\ln 3} - 1 \approx 1{,}727$.

?? Qual è la soluzione di $2^x = 5$?
[x] $x = \frac{\log 5}{\log 2}$
[ ] $x = \frac52$
[ ] $x = \log 5 - \log 2$
[ ] $x = \frac{\log 2}{\log 5}$
=> Prendendo il logaritmo, $x \log 2 = \log 5$, quindi $x = \frac{\log 5}{\log 2} \approx 2{,}32$. La risposta $\log 5 - \log 2$ è $\log\frac52$: è il logaritmo di una divisione, non una divisione fra logaritmi. La risposta $\frac{\log 2}{\log 5}$ scambia base e argomento.

>! Prendi il logaritmo di **tutto** il membro: da $2^x = 5$ scrivi $\ln(2^x) = \ln 5$, non $x\ln 2 = 5$. Se c'è una somma, come in $2^x + 1 = 5$, prima isola la potenza: $2^x = 4$.` },

    { id: 'applicazioni', titolo: 'Le scale logaritmiche: decibel, pH e Richter', testo: R`Il suono più debole che senti e il rumore di un aereo differiscono di circa mille miliardi di volte. Con il logaritmo decimale, mille miliardi ($10^{12}$) diventano $12$. Una **scala logaritmica** trasforma ogni fattore $10$ in un gradino di $1$.

>* In una scala logaritmica, **sommare** un numero fisso vuol dire **moltiplicare** la grandezza per un fattore fisso. È la proprietà del prodotto: $\log(10 \cdot I) = 1 + \log I$.

| scala | formula | un passo sulla scala |
|---|---|---|
| decibel (suono) | $L = 10\log\frac{I}{I_0}$ | $+10$ dB: intensità $\times 10$ |
| pH (acidità) | $\text{pH} = -\log[\text{H}^+]$ | pH $-1$: ioni $\text{H}^+$ $\times 10$ |
| Richter (terremoti) | magnitudo | $+1$: ampiezza delle onde $\times 10$ |

Nei decibel, $I$ è l'intensità del suono e $I_0$ quella appena udibile. Nel pH, $[\text{H}^+]$ è la concentrazione di ioni idrogeno in moli per litro. Con $[\text{H}^+] = 10^{-7}$ il pH è $7$: la soluzione è neutra.

?? Un suono passa da $60$ a $80$ decibel. Di quanto è aumentata la sua intensità?
[x] è diventata $100$ volte maggiore
[ ] è aumentata di un terzo
[ ] è diventata $20$ volte maggiore
[ ] è raddoppiata
=> $+20$ dB sono due passi da $10$ dB. Ogni passo moltiplica l'intensità per $10$: $10 \cdot 10 = 100$. «$80$ è un terzo più di $60$» legge la scala come una scala normale: è l'errore tipico.

>! Sulle scale logaritmiche una differenza si legge come un rapporto. Fra magnitudo $7$ e $5$ ci sono due gradi: le onde sono $10 \cdot 10 = 100$ volte più ampie.` }
  ],

  grafici: {
    puntoMobile: {
      tipo: 'piano', x: [-1, 9], y: [-5, 5],
      parametri: [{ nome: 'p', min: 0.1, max: 8, passo: 0.1, valore: 2, nascosto: true }],
      funzioni: [{ f: 'log2(x)', etichetta: 'y = log₂x', dominio: [0.03, 8], colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['p', 'log2(p)'], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [2.5, -3.5], testo: 'log₂ {{p}} = {{log2(p)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P: la sua altezza è il logaritmo in base 2 della sua ascissa. Ogni volta che p raddoppia, il logaritmo sale di 1.'
    },
    inversa: {
      tipo: 'piano', x: [-3, 7], y: [-3, 7],
      proporzioni: 'uguali',
      parametri: [{ nome: 'p', min: -2.5, max: 2.8, passo: 0.1, valore: 1.5, nascosto: true }],
      funzioni: [
        { f: '2^x', etichetta: 'y = 2ˣ', colore: 1, dominio: [-3, 2.85] },
        { f: 'log2(x)', etichetta: 'y = log₂x', colore: 2, dominio: [0.05, 7] }
      ],
      elementi: [
        { tipo: 'retta', m: 1, q: 0, etichetta: 'y = x', tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: ['p', '2^p'], a: ['2^p', 'p'], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['p', '2^p'], trascina: true, etichetta: 'P({{p}}; {{2^p}})', posizione: 'sinistra', colore: 1 },
        { tipo: 'punto', p: ['2^p', 'p'], etichetta: 'Q({{2^p}}; {{p}})', posizione: 'basso-destra', colore: 2 }
      ],
      didascalia: 'Trascina P lungo y = 2ˣ. Il punto Q ha le stesse coordinate scambiate, ed è sempre sulla curva y = log₂x: la retta y = x fa da specchio.'
    },
    baseVariabile: {
      tipo: 'piano', x: [-1, 7], y: [-3.5, 3.5],
      funzioni: [{ f: 'ln(x)/ln(a)', etichetta: 'y = logₐx', dominio: [0.02, 7], colore: 1 }],
      elementi: [
        { tipo: 'verticale', x: 0, asintoto: true },
        { tipo: 'orizzontale', y: 1, tratteggio: true, colore: 4 },
        { tipo: 'punto', p: ['a', 1], trascina: true, etichetta: 'a = {{a}}', posizione: 'alto', colore: 2 }
      ],
      punti: [{ x: 1, y: 0, etichetta: '(1; 0)', posizione: 'alto-sinistra', colore: 3 }],
      parametri: [{ nome: 'a', min: 0.2, max: 6, passo: 0.1, valore: 2, etichetta: 'base a' }],
      didascalia: 'Trascina il punto sulla retta y = 1 (o usa il cursore): la curva passa sempre per (a; 1), quindi la sua ascissa è la base. Prova basi minori di 1.'
    }
  },

  esempi: [
    { titolo: 'Calcolare un logaritmo dalla definizione', problema: R`Calcola $\log_3 81$ e $\log_4 \dfrac{1}{16}$.`, passi: [
      R`Per la definizione, $\log_3 81$ è l'esponente da dare a $3$ per ottenere $81$: $3^4 = 81$, quindi $\log_3 81 = 4$.`,
      R`Per $\log_4 \frac{1}{16}$ bisogna trovare $x$ tale che $4^x = \frac{1}{16}$. Siccome $16 = 4^2$, si ha $\frac{1}{16} = 4^{-2}$, quindi $x = -2$.`
    ], risultato: R`$\log_3 81 = 4$, $\log_4\frac1{16} = -2$` },

    { titolo: 'Usare le proprietà dei logaritmi', problema: R`Calcola $2\log_3 2 + \log_3 18 - \log_3 8$.`, passi: [
      R`Proprietà della potenza: $2\log_3 2 = \log_3 2^2 = \log_3 4$.`,
      R`Proprietà del prodotto: $\log_3 4 + \log_3 18 = \log_3(4 \cdot 18) = \log_3 72$.`,
      R`Proprietà del quoziente: $\log_3 72 - \log_3 8 = \log_3\dfrac{72}{8} = \log_3 9$.`,
      R`$\log_3 9 = 2$ perché $3^2 = 9$.`
    ], risultato: R`$2$` },

    { titolo: 'Il cambiamento di base', problema: R`Calcola $\log_5 12$ con tre cifre decimali, usando il logaritmo naturale.`, passi: [
      R`Formula del cambiamento di base: $\log_5 12 = \dfrac{\ln 12}{\ln 5}$.`,
      R`$\ln 12 \approx 2{,}485$, $\ln 5 \approx 1{,}609$.`,
      R`$\log_5 12 \approx \dfrac{2{,}485}{1{,}609} \approx 1{,}544$.`
    ], risultato: R`$\log_5 12 \approx 1{,}544$` },

    { titolo: "Un'equazione logaritmica", problema: R`Risolvi $\log_2(x+3) - \log_2(x-1) = 2$.`, passi: [
      R`C.e.: $x+3>0$ e $x-1>0$, cioè $x>1$.`,
      R`Proprietà del quoziente: $\log_2 \dfrac{x+3}{x-1} = 2$.`,
      R`Per definizione di logaritmo: $\dfrac{x+3}{x-1} = 2^2 = 4$.`,
      R`$x+3 = 4(x-1) \Rightarrow x+3=4x-4 \Rightarrow 3x=7 \Rightarrow x=\dfrac{7}{3}$.`,
      R`Verifica c.e.: $\dfrac{7}{3} >1$. ✓`
    ], risultato: R`$x=\dfrac{7}{3}$` },

    { titolo: 'Una disequazione logaritmica', problema: R`Risolvi $\log_{1/3}(2x-1) > -2$.`, passi: [
      R`C.e.: $2x-1>0 \Rightarrow x>\dfrac{1}{2}$.`,
      R`Scrivo $-2$ come logaritmo in base $\frac13$: $-2 = \log_{1/3} 9$ (perché $\left(\frac13\right)^{-2}=9$).`,
      R`$\log_{1/3}(2x-1) > \log_{1/3} 9$: la base è minore di $1$, quindi il verso si inverte, $2x-1 < 9 \Rightarrow x<5$.`,
      R`Intersezione con la c.e.: $\dfrac{1}{2} < x < 5$.`
    ], risultato: R`$\dfrac{1}{2} < x < 5$` },

    { titolo: "Un'equazione esponenziale risolta con il logaritmo", problema: R`Risolvi $3^{2x-1} = 10$.`, passi: [
      R`Applico $\ln$ a entrambi i membri: $\ln(3^{2x-1}) = \ln 10 \Rightarrow (2x-1)\ln 3 = \ln 10$.`,
      R`$2x - 1 = \dfrac{\ln10}{\ln3} \approx \dfrac{2{,}303}{1{,}099} \approx 2{,}096$.`,
      R`$2x \approx 3{,}096 \Rightarrow x \approx 1{,}548$.`
    ], risultato: R`$x \approx 1{,}548$` }
  ],
  formulario: [
    { nome: 'Definizione di logaritmo', formula: R`\log_a b = x \iff a^x = b`, nota: R`Condizioni: $a > 0$, $a \ne 1$, $b > 0$.` },
    { nome: 'Logaritmo di 1', formula: R`\log_a 1 = 0` },
    { nome: 'Logaritmo della base', formula: R`\log_a a = 1` },
    { nome: 'Proprietà del prodotto', formula: R`\log_a(b \cdot c) = \log_a b + \log_a c`, nota: R`Con $b > 0$, $c > 0$.` },
    { nome: 'Proprietà del quoziente', formula: R`\log_a\frac{b}{c} = \log_a b - \log_a c`, nota: R`Con $b > 0$, $c > 0$.` },
    { nome: 'Proprietà della potenza', formula: R`\log_a b^k = k \log_a b` },
    { nome: 'Cambiamento di base', formula: R`\log_a b = \frac{\log_c b}{\log_c a}`, nota: R`Con $c > 0$, $c \ne 1$; spesso $c = 10$ o $c = e$.` },
    { nome: 'Basi scambiate', formula: R`\log_a b = \frac{1}{\log_b a}` },
    { nome: 'Logaritmo decimale', formula: R`\log b = \log_{10} b` },
    { nome: 'Logaritmo naturale', formula: R`\ln b = \log_e b`, nota: R`Con $e \approx 2{,}718$.` },
    { nome: 'Identità logaritmo-esponenziale', formula: R`a^{\log_a x} = x, \qquad \log_a(a^x) = x`, nota: R`La prima vale per $x > 0$, la seconda per ogni $x$.` },
    { nome: 'Equazione esponenziale con i logaritmi', formula: R`a^x = b \ \Rightarrow\ x = \frac{\log b}{\log a}`, nota: R`Con $a>0$, $a\ne1$, $b>0$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Definizione di logaritmo`, retro: R`$\log_a b = x \iff a^x = b$, con $a>0$, $a\ne1$, $b>0$.` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Condizioni per $\log_a b$`, retro: R`$a>0$, $a\ne1$ e $b>0$ (l'argomento deve essere positivo).` },
    { id: 'fc-03', sezione: 'definizione', tipo: 'concetto', fronte: R`Perché l'argomento di un logaritmo deve essere positivo?`, retro: R`Una potenza con base positiva è sempre positiva: nessun esponente dà un risultato negativo o nullo.` },
    { id: 'fc-04', sezione: 'logaritmi-notevoli', tipo: 'formula', fronte: R`$\log_a 1$`, retro: R`$=0$ per ogni base valida, perché $a^0=1$.` },
    { id: 'fc-05', sezione: 'logaritmi-notevoli', tipo: 'formula', fronte: R`$\log_a a$`, retro: R`$=1$ per ogni base valida, perché $a^1=a$.` },
    { id: 'fc-06', sezione: 'logaritmi-notevoli', tipo: 'definizione', fronte: R`Logaritmo decimale`, retro: R`$\log b$ senza base indicata: sottintende base $10$.` },
    { id: 'fc-07', sezione: 'logaritmi-notevoli', tipo: 'definizione', fronte: R`Logaritmo naturale`, retro: R`$\ln b$: logaritmo in base $e \approx 2{,}718$.` },
    { id: 'fc-08', sezione: 'proprieta', tipo: 'formula', fronte: R`Proprietà del prodotto`, retro: R`$\log_a(bc)=\log_a b+\log_a c$, con $b,c>0$.` },
    { id: 'fc-09', sezione: 'proprieta', tipo: 'formula', fronte: R`Proprietà del quoziente`, retro: R`$\log_a\frac{b}{c}=\log_a b-\log_a c$, con $b,c>0$.` },
    { id: 'fc-10', sezione: 'proprieta', tipo: 'formula', fronte: R`Proprietà della potenza`, retro: R`$\log_a b^k=k\log_a b$.` },
    { id: 'fc-11', sezione: 'proprieta', tipo: 'concetto', fronte: R`Vale $\log_a(b+c)=\log_a b+\log_a c$?`, retro: R`No: le proprietà valgono per prodotto e quoziente, non per somma e differenza.` },
    { id: 'fc-12', sezione: 'cambiamento-base', tipo: 'formula', fronte: R`Cambiamento di base`, retro: R`$\log_a b=\dfrac{\log_c b}{\log_c a}$, con $c>0$, $c\ne1$.` },
    { id: 'fc-13', sezione: 'cambiamento-base', tipo: 'formula', fronte: R`Basi scambiate`, retro: R`$\log_a b=\dfrac{1}{\log_b a}$.` },
    { id: 'fc-14', sezione: 'inversa-esponenziale', tipo: 'concetto', fronte: R`Di quale funzione è inverso il logaritmo?`, retro: R`Della funzione esponenziale $y=a^x$: $\log_a$ e l'elevamento a potenza in base $a$ si "disfano" a vicenda.` },
    { id: 'fc-15', sezione: 'inversa-esponenziale', tipo: 'formula', fronte: R`$a^{\log_a x}$`, retro: R`$=x$, per $x>0$.` },
    { id: 'fc-16', sezione: 'funzione-logaritmica', tipo: 'concetto', fronte: R`Dominio di $y=\log_a x$`, retro: R`$x>0$: l'argomento deve essere positivo.` },
    { id: 'fc-17', sezione: 'funzione-logaritmica', tipo: 'concetto', fronte: R`Asintoto di $y=\log_a x$`, retro: R`La retta verticale $x=0$ (l'asse $y$).` },
    { id: 'fc-18', sezione: 'funzione-logaritmica', tipo: 'concetto', fronte: R`Quando $y=\log_a x$ è decrescente?`, retro: R`Quando $0<a<1$. È crescente quando $a>1$.` },
    { id: 'fc-19', sezione: 'equazioni-logaritmiche', tipo: 'procedura', fronte: R`Passi per risolvere un'equazione logaritmica`, retro: R`1) Condizioni di esistenza. 2) Un solo logaritmo per parte, stessa base. 3) Uguagliare gli argomenti e risolvere. 4) Tenere solo le soluzioni che rispettano le c.e.` },
    { id: 'fc-20', sezione: 'equazioni-logaritmiche', tipo: 'concetto', fronte: R`Quando si scrivono le c.e. di un'equazione logaritmica?`, retro: R`Prima di applicare le proprietà, sugli argomenti originali.` },
    { id: 'fc-21', sezione: 'disequazioni-logaritmiche', tipo: 'concetto', fronte: R`Verso di una disequazione logaritmica con $a>1$`, retro: R`Si mantiene: $\log_a f(x) > \log_a g(x) \iff f(x) > g(x)$.` },
    { id: 'fc-22', sezione: 'disequazioni-logaritmiche', tipo: 'concetto', fronte: R`Verso di una disequazione logaritmica con $0<a<1$`, retro: R`Si inverte: $\log_a f(x) > \log_a g(x) \iff f(x) < g(x)$.` },
    { id: 'fc-23', sezione: 'esponenziali-con-logaritmi', tipo: 'procedura', fronte: R`Come risolvere $a^x=b$ quando $b$ non è una potenza esatta di $a$?`, retro: R`Si applica il logaritmo a entrambi i membri: $x=\dfrac{\log b}{\log a}$.` },
    { id: 'fc-24', sezione: 'applicazioni', tipo: 'formula', fronte: R`Formula del pH`, retro: R`$\text{pH}=-\log_{10}[\text{H}^+]$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola $\log_2 8$.`, suggerimenti: [R`Quale potenza di $2$ fa $8$?`], risposta: valore(3), soluzione: [R`$2^3 = 8$.`, R`Quindi $\log_2 8 = 3$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $\log 1000$.`, suggerimenti: [R`Senza base scritta, la base è $10$.`], risposta: valore(3), soluzione: [R`$\log$ senza base vuol dire base $10$.`, R`$10^3 = 1000$, quindi $\log 1000 = 3$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $\log_5 1$.`, suggerimenti: [R`A quale esponente devi elevare $5$ per ottenere $1$?`], risposta: valore(0), soluzione: [R`$5^0 = 1$.`, R`Quindi $\log_5 1 = 0$. Con ogni base, il logaritmo di $1$ vale $0$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Calcola $\log_3 \dfrac19$.`, suggerimenti: [R`Scrivi $\dfrac19$ come potenza di $3$: l'esponente è negativo.`], risposta: valore(-2), soluzione: [R`$9 = 3^2$, quindi $\dfrac19 = 3^{-2}$.`, R`Quindi $\log_3 \dfrac19 = -2$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Calcola $\log 0{,}01$.`, suggerimenti: [R`$0{,}01 = \dfrac{1}{100}$: scrivilo come potenza di $10$.`], risposta: valore(-2), soluzione: [R`$0{,}01 = \dfrac{1}{100} = 10^{-2}$.`, R`Quindi $\log 0{,}01 = -2$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola $\log_4 2$. Scrivi il risultato come frazione, per esempio «1/3».`, suggerimenti: [R`Quale operazione trasforma $4$ in $2$? Pensa alla radice quadrata.`], risposta: valore(1 / 2), soluzione: [R`$\sqrt4 = 2$, cioè $4^{\frac12} = 2$.`, R`Quindi $\log_4 2 = \dfrac12$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola $\log_6 4 + \log_6 9$.`, suggerimenti: [R`Somma di logaritmi con la stessa base: moltiplica gli argomenti.`], risposta: valore(2), soluzione: [R`Proprietà del prodotto: $\log_6 4 + \log_6 9 = \log_6(4 \cdot 9) = \log_6 36$.`, R`$6^2 = 36$, quindi il risultato è $2$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Calcola $\log_2 24 - \log_2 3$.`, suggerimenti: [R`Differenza di logaritmi con la stessa base: dividi gli argomenti.`], risposta: valore(3), soluzione: [R`Proprietà del quoziente: $\log_2 24 - \log_2 3 = \log_2 \dfrac{24}{3} = \log_2 8$.`, R`$2^3 = 8$, quindi il risultato è $3$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Calcola $\log 2 + \log 50$.`, suggerimenti: [R`Somma di logaritmi: moltiplica gli argomenti.`], risposta: valore(2), soluzione: [R`Proprietà del prodotto: $\log 2 + \log 50 = \log(2 \cdot 50) = \log 100$.`, R`$10^2 = 100$, quindi il risultato è $2$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Calcola $\log_3 9^5$.`, suggerimenti: [R`Proprietà della potenza: l'esponente $5$ scende davanti.`], risposta: valore(10), soluzione: [R`Proprietà della potenza: $\log_3 9^5 = 5\log_3 9$.`, R`$\log_3 9 = 2$, perché $3^2 = 9$.`, R`$5 \cdot 2 = 10$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Risolvi $\log_2 x = 5$. Se non ci sono soluzioni, scrivi *nessuna*.`, suggerimenti: [R`Usa la definizione: $x$ è la potenza $2^5$.`], risposta: sol(32), soluzione: [R`C.e.: $x > 0$.`, R`Per la definizione, $x = 2^5 = 32$.`, R`$32 > 0$: la soluzione va bene.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Risolvi $\log_3(x - 1) = 2$.`, suggerimenti: [R`C.e.: l'argomento $x - 1$ deve essere positivo.`, R`Per la definizione, $x - 1 = 3^2$.`], risposta: sol(10), soluzione: [R`C.e.: $x - 1 > 0$, cioè $x > 1$.`, R`Per la definizione, $x - 1 = 3^2 = 9$.`, R`$x = 10$, che rispetta le c.e.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Risolvi $\log(2x) = 2$.`, suggerimenti: [R`La base è $10$: per la definizione, $2x = 10^2$.`], risposta: sol(50), soluzione: [R`C.e.: $2x > 0$, cioè $x > 0$.`, R`Per la definizione, $2x = 10^2 = 100$.`, R`$x = 50$, che rispetta le c.e.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Risolvi $\log_2(x + 3) = \log_2(2x - 1)$.`, suggerimenti: [R`Prima le c.e.: tutti e due gli argomenti devono essere positivi.`, R`Stessa base da tutte e due le parti: uguaglia gli argomenti.`], risposta: sol(4), soluzione: [R`C.e.: $x + 3 > 0$ e $2x - 1 > 0$, cioè $x > \dfrac12$.`, R`Uguaglio gli argomenti: $x + 3 = 2x - 1$.`, R`$x = 4$, che rispetta le c.e.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Risolvi $\log_3 x = \log_3(2x + 4)$. Se non ci sono soluzioni, scrivi *nessuna*.`, suggerimenti: [R`Prima le c.e.: tutti e due gli argomenti devono essere positivi.`, R`Uguaglia gli argomenti, poi confronta il risultato con le c.e.`], risposta: NESSUNA, soluzione: [R`C.e.: $x > 0$ e $2x + 4 > 0$. Insieme: $x > 0$.`, R`Uguaglio gli argomenti: $x = 2x + 4$, quindi $x = -4$.`, R`$-4$ non rispetta $x > 0$: l'equazione non ha soluzioni.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Risolvi $2^x = 5$. Scrivi $x$ con due cifre decimali, per esempio «1,23».`, suggerimenti: [R`Prendi il logaritmo dei due membri: l'esponente scende davanti.`, R`$x = \dfrac{\log 5}{\log 2}$: fai la divisione con la calcolatrice.`], risposta: dec(Math.log(5) / Math.log(2)), soluzione: [R`Logaritmo dei due membri: $x \log 2 = \log 5$.`, R`Divido per $\log 2$: $x = \dfrac{\log 5}{\log 2}$.`, R`$x \approx \dfrac{0{,}699}{0{,}301} \approx 2{,}32$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Risolvi $3^x = 10$. Scrivi $x$ con due cifre decimali.`, suggerimenti: [R`Prendi il logaritmo decimale dei due membri. Quanto vale $\log 10$?`], risposta: dec(Math.log(10) / Math.log(3)), soluzione: [R`Logaritmo dei due membri: $x \log 3 = \log 10 = 1$.`, R`Divido per $\log 3$: $x = \dfrac{1}{\log 3}$.`, R`$x \approx \dfrac{1}{0{,}477} \approx 2{,}10$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Risolvi $10^x = 50$. Scrivi $x$ con due cifre decimali.`, suggerimenti: [R`La base è $10$: per la definizione, $x = \log 50$.`], risposta: dec(Math.log10(50)), soluzione: [R`Per la definizione di logaritmo, $x = \log 50$.`, R`Con la calcolatrice: $x \approx 1{,}70$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Risolvi $e^x = 7$. Scrivi $x$ con due cifre decimali.`, suggerimenti: [R`La base è $e$: prendi il logaritmo naturale dei due membri.`], risposta: dec(Math.log(7)), soluzione: [R`Logaritmo naturale dei due membri: $\ln e^x = \ln 7$.`, R`$\ln e^x = x$, quindi $x = \ln 7$.`, R`Con la calcolatrice: $x \approx 1{,}95$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Risolvi $5^{x-1} = 3$. Scrivi $x$ con due cifre decimali.`, suggerimenti: [R`Prendi il logaritmo dei due membri: scende tutto l'esponente $x - 1$.`, R`Trovi $x - 1 = \dfrac{\log 3}{\log 5}$. Poi aggiungi $1$.`], risposta: dec(1 + Math.log(3) / Math.log(5)), soluzione: [R`Logaritmo dei due membri: $(x - 1)\log 5 = \log 3$.`, R`Divido per $\log 5$: $x - 1 = \dfrac{\log 3}{\log 5} \approx 0{,}683$.`, R`Aggiungo $1$: $x \approx 1{,}68$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Calcola $\log_2 32$.`, suggerimenti: [R`Pensa a che potenza di $2$ fa $32$.`, R`$2^5 = 32$.`], risposta: { tipo: 'numero', valore: 5, tolleranza: 0.01 }, soluzione: [R`$2^5=32$, quindi $\log_2 32 = 5$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $\log_5 \dfrac{1}{25}$.`, suggerimenti: [R`Scrivi $\dfrac{1}{25}$ come potenza di $5$.`, R`$25 = 5^2$, quindi $\dfrac{1}{25} = 5^{-2}$.`], risposta: { tipo: 'numero', valore: -2, tolleranza: 0.01 }, soluzione: [R`$\dfrac{1}{25}=5^{-2}$, quindi $\log_5\dfrac{1}{25}=-2$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Usa le proprietà dei logaritmi per calcolare $\log_2 6 + \log_2 8 - \log_2 3$.`, suggerimenti: [R`Applica prima la proprietà del prodotto, poi quella del quoziente.`, R`Dovresti arrivare a $\log_2 16$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.01 }, soluzione: [R`$\log_2 6 + \log_2 8 = \log_2(6\cdot8) = \log_2 48$.`, R`$\log_2 48 - \log_2 3 = \log_2\dfrac{48}{3} = \log_2 16$.`, R`$\log_2 16 = 4$ perché $2^4=16$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Risolvi $\log_3 x = 4$.`, suggerimenti: [R`Usa direttamente la definizione di logaritmo.`, R`$x = 3^4$.`], risposta: { tipo: 'numero', valore: 81, tolleranza: 0.01 }, soluzione: [R`Per definizione, $x = 3^4 = 81$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Calcola $\log_2 5$ con il cambiamento di base, sapendo che $\ln 5\approx1{,}609$ e $\ln 2\approx0{,}693$. Arrotonda a due cifre decimali.`, suggerimenti: [R`$\log_2 5 = \dfrac{\ln 5}{\ln 2}$.`, R`Esegui la divisione.`], risposta: { tipo: 'numero', valore: 2.32, tolleranza: 0.01 }, soluzione: [R`$\log_2 5 = \dfrac{\ln 5}{\ln 2} \approx \dfrac{1{,}609}{0{,}693} \approx 2{,}32$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $\log(x+2) + \log(x-2) = \log 5$.`, suggerimenti: [R`Scrivi prima la condizione di esistenza: entrambi gli argomenti devono essere positivi.`, R`Usa la proprietà del prodotto per unire i due logaritmi a sinistra.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.01 }, soluzione: [R`C.e.: $x+2>0$ e $x-2>0$, cioè $x>2$.`, R`$\log[(x+2)(x-2)] = \log 5 \Rightarrow x^2-4=5 \Rightarrow x^2=9 \Rightarrow x=\pm3$.`, R`Solo $x=3$ rispetta la c.e. $x>2$; $x=-3$ va scartato.`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi la disequazione $\log_2(x-3) \le 4$.`, suggerimenti: [R`C.e.: l'argomento deve essere positivo.`, R`Scrivi $4$ come $\log_2 16$: la base è maggiore di $1$, il verso non cambia.`], risposta: { tipo: 'intervallo', da: 3, a: 19, chiusoDa: false, chiusoA: true }, soluzione: [R`C.e.: $x-3>0 \Rightarrow x>3$.`, R`$4 = \log_2 16$, quindi $\log_2(x-3) \le \log_2 16$; la base $2>1$ mantiene il verso: $x-3\le16 \Rightarrow x\le19$.`, R`Con la c.e.: $3 < x \le 19$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Risolvi $2^x = 12$ (usa i logaritmi, arrotonda a tre cifre decimali).`, suggerimenti: [R`Applica $\ln$ a entrambi i membri.`, R`$x = \dfrac{\ln 12}{\ln 2}$.`], risposta: { tipo: 'numero', valore: 3.585, tolleranza: 0.01 }, soluzione: [R`$\ln(2^x) = \ln 12 \Rightarrow x \ln 2 = \ln 12 \Rightarrow x = \dfrac{\ln 12}{\ln 2}$.`, R`$x \approx \dfrac{2{,}485}{0{,}693} \approx 3{,}585$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi $(\log_2 x)^2 - 3\log_2 x + 2 = 0$.`, suggerimenti: [R`C.e.: $x>0$.`, R`Sostituisci $t = \log_2 x$ e risolvi l'equazione di secondo grado in $t$.`, R`Trovati i valori di $t$, ricava $x$ da $\log_2 x = t$.`], risposta: { tipo: 'numeri', valori: [2, 4] }, soluzione: [R`C.e.: $x>0$. Pongo $t=\log_2 x$: $t^2-3t+2=0 \Rightarrow t=1$ oppure $t=2$.`, R`$\log_2 x = 1 \Rightarrow x=2$. $\log_2 x = 2 \Rightarrow x=4$. Entrambe rispettano la c.e.`] },
    { id: 'es-10', difficolta: 3, testo: R`Una soluzione ha concentrazione di ioni idrogeno $[\text{H}^+] = 10^{-4}$ mol/L. Calcola il suo pH.`, suggerimenti: [R`Usa la formula $\text{pH} = -\log_{10}[\text{H}^+]$.`, R`$-\log_{10}(10^{-4}) = ?$`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.01 }, soluzione: [R`$\text{pH} = -\log_{10}(10^{-4}) = -(-4) = 4$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Un capitale cresce del $5\%$ ogni anno, cioè si moltiplica per $1{,}05$: $C = C_0 \cdot 1{,}05^{\,t}$. Dopo quanti anni raddoppia? (Approssima all'intero più vicino.)`, suggerimenti: [R`Devi risolvere $1{,}05^{\,t} = 2$.`, R`Applica il logaritmo a entrambi i membri: $t = \dfrac{\ln 2}{\ln 1{,}05}$.`], risposta: { tipo: 'numero', valore: 14, tolleranza: 0.5 }, soluzione: [R`$1{,}05^{\,t}=2 \Rightarrow t\ln(1{,}05) = \ln 2 \Rightarrow t = \dfrac{\ln 2}{\ln 1{,}05} \approx \dfrac{0{,}693}{0{,}0488} \approx 14{,}2$.`, R`Il capitale raddoppia dopo circa $14$ anni.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un terremoto di magnitudo $7$, rispetto a uno di magnitudo $5$, quante volte più ampie sono le onde sismiche che produce? (Ogni unità in più sulla scala Richter corrisponde a un fattore $10$ di ampiezza.)`, suggerimenti: [R`La differenza di magnitudo è $2$ unità.`, R`Un fattore $10$ per ogni unità, applicato due volte, si moltiplica.`], risposta: { tipo: 'numero', valore: 100, tolleranza: 1 }, soluzione: [R`La differenza è $2$ unità: il fattore di ampiezza è $10^2 = 100$.`, R`Il terremoto di magnitudo $7$ produce onde circa $100$ volte più ampie di quello di magnitudo $5$ (l'energia rilasciata, invece, è circa $1000$ volte maggiore).`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale condizione è indispensabile perché $\log_a b$ sia definito?`, opzioni: [R`$b>0$ soltanto`, R`$a>0$, $a\ne1$ e $b>0$`, R`$a\ne1$ soltanto`, R`$a>0$ e $b$ qualsiasi`], corretta: 1, spiegazione: R`Servono tutte e tre le condizioni insieme: $a>0$ e $a\ne1$ sulla base, $b>0$ sull'argomento. Nessuna delle tre da sola basta.` },
    { id: 'q-02', domanda: R`Quanto vale $\log_a 1$, qualunque sia la base valida $a$?`, opzioni: [R`$0$`, R`$1$`, R`$a$`, R`non è definito`], corretta: 0, spiegazione: R`$a^0=1$ per ogni $a>0$, $a\ne1$: quindi l'esponente da dare ad $a$ per ottenere $1$ è sempre $0$.` },
    { id: 'q-03', domanda: R`Quanto vale $\log_a a$?`, opzioni: [R`$0$`, R`$a$`, R`$a^2$`, R`$1$`], corretta: 3, spiegazione: R`$a^1=a$: l'esponente da dare ad $a$ per ottenere $a$ stesso è $1$.` },
    { id: 'q-04', domanda: R`Quale delle seguenti è la proprietà del prodotto dei logaritmi?`, opzioni: [R`$\log_a(bc) = \log_a b \cdot \log_a c$`, R`$\log_a(b+c) = \log_a b + \log_a c$`, R`$\log_a(bc) = \log_a b + \log_a c$`, R`$\log_a(bc) = \log_a b - \log_a c$`], corretta: 2, spiegazione: R`Il logaritmo di un prodotto è la somma dei logaritmi dei fattori. Scrivere $\log_a b \cdot \log_a c$ confonde prodotto e somma dei logaritmi; $\log_a(b+c)$ applica la proprietà a una somma dentro l'argomento; la differenza $\log_a b - \log_a c$ è la proprietà del quoziente, non del prodotto.` },
    { id: 'q-05', domanda: R`$\log_a b^k$ è uguale a…`, opzioni: [R`$k + \log_a b$`, R`$k \log_a b$`, R`$(\log_a b)^k$`, R`$\log_a(bk)$`], corretta: 1, spiegazione: R`La proprietà della potenza porta giù l'esponente come fattore moltiplicativo: $\log_a b^k = k\log_a b$.` },
    { id: 'q-06', domanda: R`La formula del cambiamento di base afferma che $\log_a b$ è uguale a…`, opzioni: [R`$\dfrac{\log_c b}{\log_c a}$`, R`$\dfrac{\log_c a}{\log_c b}$`, R`$\log_c b - \log_c a$`, R`$\log_b c \cdot \log_c a$`], corretta: 0, spiegazione: R`Si divide il logaritmo dell'argomento per il logaritmo della base, nella nuova base $c$. Scambiare numeratore e denominatore darebbe il reciproco.` },
    { id: 'q-07', domanda: R`Il grafico di $y=\log_a x$ è il simmetrico, rispetto alla bisettrice $y=x$, del grafico di…`, opzioni: [R`$y = x^2$`, R`$y = \dfrac{1}{x}$`, R`$y = a x$`, R`$y = a^x$`], corretta: 3, spiegazione: R`Il logaritmo in base $a$ è la funzione inversa dell'esponenziale in base $a$: i loro grafici sono sempre simmetrici rispetto a $y=x$.` },
    { id: 'q-08', domanda: R`L'asintoto della funzione $y = \log_a x$ è…`, opzioni: [R`la retta orizzontale $y = 0$`, R`la retta orizzontale $y = 1$`, R`la retta verticale $x = 0$`, R`la retta verticale $x = 1$`], corretta: 2, spiegazione: R`Il logaritmo ha dominio $x>0$ e si avvicina indefinitamente all'asse $y$ (la retta $x=0$) senza mai toccarlo. L'asintoto orizzontale $y=0$ appartiene invece all'esponenziale.` },
    { id: 'q-09', domanda: R`Per quali valori di $a$ la funzione $y = \log_a x$ è decrescente?`, opzioni: [R`$a > 1$`, R`$0 < a < 1$`, R`$a < 0$`, R`$a = 1$`], corretta: 1, spiegazione: R`Come per l'esponenziale, il comportamento dipende dal confronto con $1$: crescente per $a>1$, decrescente per $0<a<1$. $a\le0$ e $a=1$ non sono basi ammesse.` },
    { id: 'q-10', domanda: R`Il dominio della funzione $y = \log_a x$ è…`, opzioni: [R`$x > 0$`, R`tutto $\mathbb{R}$`, R`$x \ge 0$`, R`$x \ne 0$`], corretta: 0, spiegazione: R`L'argomento di un logaritmo deve essere positivo, quindi il dominio è $x>0$: $x=0$ resta escluso, non incluso come richiederebbe $x\ge0$.` },
    { id: 'q-11', domanda: R`Perché nelle equazioni logaritmiche si scrivono le condizioni di esistenza sugli argomenti originali, prima di usare le proprietà?`, opzioni: [R`Perché altrimenti l'equazione diventa di secondo grado`, R`Per abitudine: non cambia nulla`, R`Perché altrimenti la base cambia`, R`Perché unendo i logaritmi in uno solo il dominio apparente può allargarsi`], corretta: 3, spiegazione: R`Dopo aver applicato le proprietà, l'argomento unico può risultare positivo anche per valori di $x$ in cui uno degli argomenti originali non lo era: le c.e. vanno fissate prima.` },
    { id: 'q-12', domanda: R`In una disequazione logaritmica con base $0 < a < 1$, tolto il logaritmo il verso della disequazione…`, opzioni: [R`si mantiene sempre`, R`dipende dal segno di $b$`, R`si inverte sempre`, R`non si può togliere il logaritmo`], corretta: 2, spiegazione: R`Con base minore di $1$ la funzione logaritmica è decrescente, quindi togliendo il logaritmo il verso della disequazione si inverte sempre.` },
    { id: 'q-13', domanda: R`Come si risolve un'equazione come $3^x = 20$, dove $20$ non è una potenza esatta di $3$?`, opzioni: [R`Non si può risolvere con i numeri reali`, R`Si applica il logaritmo a entrambi i membri`, R`Si approssima per tentativi, non esiste un metodo esatto`, R`Si cambia la base dell'esponenziale finché non torna esatta`], corretta: 1, spiegazione: R`Applicando il logaritmo a entrambi i membri si ottiene $x\log 3 = \log 20$, quindi $x = \log 20 / \log 3$: un valore esatto, anche se irrazionale.` },
    { id: 'q-14', domanda: R`Il logaritmo naturale $\ln b$ è il logaritmo di $b$ in quale base?`, opzioni: [R`$e \approx 2{,}718$`, R`$10$`, R`$2$`, R`$1$`], corretta: 0, spiegazione: R`$\ln b = \log_e b$, dove $e$ è il numero di Nepero. La base $10$ corrisponde invece al logaritmo decimale $\log b$.` },
    { id: 'q-15', domanda: R`Dire che il pH è una scala logaritmica significa che…`, opzioni: [R`il pH cresce linearmente con la concentrazione di ioni`, R`il pH non ha un'unità di misura`, R`il pH è sempre un numero intero`, R`una differenza di un'unità di pH corrisponde a un fattore $10$ nella concentrazione di ioni idrogeno`], corretta: 3, spiegazione: R`$\text{pH}=-\log_{10}[\text{H}^+]$: una unità di pH in meno corrisponde a una concentrazione $10$ volte maggiore, non a una differenza lineare.` },
    { id: 'q-16', domanda: R`Un terremoto di magnitudo $6$, rispetto a uno di magnitudo $4$, sulla scala Richter produce onde sismiche di ampiezza…`, opzioni: [R`doppia`, R`uguale`, R`circa $100$ volte maggiore`, R`circa $6$ volte maggiore`], corretta: 2, spiegazione: R`La differenza è di $2$ unità di magnitudo, e ogni unità corrisponde a un fattore $10$ di ampiezza: $10^2=100$. L'energia rilasciata cresce più in fretta, circa $32$ volte per ogni unità.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di tutto le condizioni di esistenza: l'argomento di ogni logaritmo deve essere positivo, in equazioni e disequazioni allo stesso modo.` },
    { tipo: 'errore', testo: R`Il logaritmo di una somma non è la somma dei logaritmi: $\log_a(b+c) \ne \log_a b + \log_a c$. Le proprietà valgono solo per prodotto, quoziente e potenza.` },
    { tipo: 'errore', testo: R`Con base $0<a<1$ la funzione logaritmica è decrescente: nelle disequazioni il verso si inverte, esattamente come dividendo per un numero negativo.` },
    { tipo: 'trucco', testo: R`Per calcolare un logaritmo con la calcolatrice quando la base non è $10$ né $e$: cambia base con $\log_a b = \ln b / \ln a$.` },
    { tipo: 'metodo', testo: R`In un'equazione logaritmica, riduci sempre a un solo logaritmo per parte, nella stessa base, prima di togliere i logaritmi.` },
    { tipo: 'trucco', testo: R`Controllo lampo: la definizione $\log_a b = x \iff a^x=b$ funziona anche al contrario per verificare un risultato, elevando $a$ al valore trovato.` },
    { tipo: 'errore', testo: R`$\log_2 8$ e $\log_8 2$ non sono la stessa cosa: la base e l'argomento non si possono scambiare senza cambiare il valore.` },
    { tipo: 'metodo', testo: R`Nelle scale logaritmiche (decibel, pH, Richter) una differenza costante di unità corrisponde sempre a uno stesso fattore moltiplicativo, non a una somma: pensa in termini di "quante volte", non di "quanto in più".` }
  ],

  aneddoti: [
    { matematico: 'John Napier', anni: '1550–1617', titolo: "Vent'anni di calcoli per evitare le moltiplicazioni", testo: R`John Napier (o Nepero), barone scozzese di Merchiston, dedicò circa vent'anni al problema di semplificare i calcoli degli astronomi, oberati da moltiplicazioni e divisioni fra numeri con molte cifre. Nel 1614 pubblicò la *Mirifici Logarithmorum Canonis Descriptio*, che introduceva i logaritmi insieme a una tavola per usarli: da allora, per moltiplicare due numeri bastava sommare i loro logaritmi. Inventò anche i "bastoncini di Nepero", un abaco portatile per le moltiplicazioni. Nella sua tenuta aveva fama di stregone: si racconta che, sospettando un servitore di furto, li facesse entrare uno alla volta in una stanza buia ad accarezzare un gallo nero coperto di fuliggine, dicendo che l'uccello avrebbe "riconosciuto" il colpevole. Chi usciva con le mani pulite, per la paura di toccarlo, era proprio lui il ladro.`, legame: R`L'invenzione di Napier è l'oggetto stesso di questa pagina: il logaritmo come strumento per trasformare moltiplicazioni in addizioni.` },
    { matematico: 'Henry Briggs', anni: '1561–1630', titolo: "Il viaggio a Edimburgo che ci ha dato la base 10", testo: R`Quando lesse il lavoro di Napier, il matematico inglese Henry Briggs ne rimase così colpito da affrontare un viaggio di giorni a cavallo da Londra a Edimburgo solo per conoscerlo, nell'estate del 1615. Insieme concordarono che i logaritmi sarebbero stati più comodi calcolati in base $10$, legata al nostro sistema di numerazione, invece della base scelta inizialmente da Napier. Dopo la morte di Napier, Briggs proseguì il lavoro da solo, calcolando a mano, cifra dopo cifra, i logaritmi decimali di migliaia di numeri: li pubblicò nel 1624 nell'*Arithmetica Logarithmica*, con quattordici cifre di precisione. Per due secoli, chiunque dovesse affrontare un calcolo scientifico o commerciale complicato usava tavole come le sue.`, legame: R`Il logaritmo decimale di questa pagina, quello del tasto "log" della calcolatrice, è l'invenzione di Briggs.` },
    { matematico: 'Pierre-Simon Laplace', anni: '1749–1827', titolo: 'I logaritmi che raddoppiarono la vita degli astronomi', testo: R`Pierre-Simon Laplace, fra i più importanti astronomi e matematici a cavallo fra Settecento e Ottocento, scrisse che l'invenzione dei logaritmi, riducendo a poche settimane il lavoro di molti mesi, "raddoppia, per così dire, la vita degli astronomi". Non era un'esagerazione: prima dei logaritmi, calcolare a mano l'orbita di un pianeta richiedeva moltiplicazioni e divisioni fra numeri di molte cifre, ripetute migliaia di volte; con le tavole logaritmiche quei calcoli diventavano somme e sottrazioni. Per quasi tre secoli e mezzo, dalle tavole di Briggs fino agli anni Settanta del Novecento, ingegneri e scienziati calcolarono con le tavole logaritmiche o con il regolo calcolatore, un righello a scale logaritmiche scorrevoli capace di moltiplicare e dividere spostando due aste, reso superfluo solo dalle calcolatrici tascabili.`, legame: R`È la ragione pratica per cui i logaritmi furono inventati e usati per secoli: trasformare calcoli lunghi in calcoli brevi.` },
    { matematico: 'Charles Richter', anni: '1900–1985', titolo: 'Una scala pensata per non scrivere numeri enormi', testo: R`Nel 1935 il sismologo Charles Richter, insieme al collega Beno Gutenberg, cercava un modo per confrontare l'intensità dei terremoti della California registrati da stazioni a distanze diverse dall'epicentro. L'energia rilasciata da un terremoto forte può essere miliardi di volte quella di una scossa lieve: scriverla in numeri normali avrebbe prodotto cifre da capogiro, diverse per ogni evento. Richter ebbe l'idea di usare il logaritmo dell'ampiezza delle onde sismiche registrate da un sismografo: ogni unità in più sulla sua scala corrisponde a un fattore dieci nell'ampiezza, e a circa trentadue volte più energia. Lo stesso trucco, applicato a grandezze diverse, sta dietro ai decibel del suono, proposti pochi anni prima dai laboratori telefonici Bell, e al pH delle soluzioni, ideato nel 1909 dal chimico danese Søren Sørensen.`, legame: R`Richter, i decibel e il pH sono la stessa idea applicata a tre campi diversi: comprimere numeri enormi in una scala logaritmica leggibile.` }
  ]
});
})();
