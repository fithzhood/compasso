(function () {
const R = String.raw;
/* Matematica finanziaria (istituti tecnici AFM, livello 2). Ogni numero di teoria, esempi, esercizi, quiz e
   flashcard è stato ricalcolato con node. Gli esempi della teoria sono quelli dei video:
   - interesse-composto: C = 1000 €, i = 5 %, t = 10 anni; semplice 1500 €, composto 1000 · 1,05¹⁰ ≈ 1628,89 €;
     secondo anno 50 € contro 52,50 €; dopo 10 anni ≈ 129 € in più.
   - ammortamento: S = 10 000 € al 4 % in 5 rate annue posticipate; R ≈ 2246,27 €; interessi 400 → 86,40 €,
     quote capitale 1846,27 → 2159,88 € (somma 10 000,00 €), interessi totali 1231,36 €.
   Simboli dei video e dei libri italiani: C capitale, i tasso (è la r di esponenziali.js), t tempo in anni,
   M montante, I interesse; V valore attuale; d tasso di sconto commerciale; R rata, n numero di rate, S debito.
   Gli importi: fino a quattro cifre senza separatore (1628,89), da cinque in su con lo spazio sottile
   (10\,000 in KaTeX, 10 000 con lo spazio stretto non separabile nel testo e nelle tabelle).
   Fra numero e unità c'è lo spazio non separabile. */

/* ---- allenamento: risposte ---- */
const SIMB_E = ['/', '^', '(', ')'];
/* un importo in euro, al centesimo */
const euro = (v, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.011, segnaposto: 'in euro, es. 12,50', simboli: SIMB_E });
/* un tasso in percentuale (lo studente scrive 2,5 oppure 2,5%) */
/* un tasso in percentuale: si accettano 2,5 / 2,5% / 0,025 (anche con gli zeri in coda), non 250% né 0,025% */
const perc = v => {
  const p = [String(v), v.toFixed(2), v.toFixed(1)].filter((x, k, a) => a.indexOf(x) === k && +x === v);
  const fr = String(+(v / 100).toFixed(8));
  return { tipo: 'testo', accettate: p.flatMap(x => [x, x + '%']).concat([fr]), segnaposto: 'in %, es. 7,25', simboli: ['%'] };
};
/* un numero di anni */
const anni = (v, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol || 0.011, segnaposto: 'in anni', simboli: ['/'] });
const parola = (lista, seg) => ({ tipo: 'testo', accettate: lista, segnaposto: seg, simboli: [] });

/* ---- le figure ---- */
/* PAC: 100 € a fine mese al 4 % annuo; tasso mensile equivalente 1,04^(1/12) − 1; x in anni */
/* un importo con due decimali in un'etichetta che cambia: il motore scrive 1102,5, qui si compone 1102,50
   cifra per cifra a partire dai centesimi interi */
const centesimi = e => { const c = 'floor(100*(' + e + ') + 0.5)'; return '{{floor(' + c + '/100)}},{{floor(' + c + '/10) - 10*floor(' + c + '/100)}}{{' + c + ' - 10*floor(' + c + '/10)}}'; };
/* una barra verticale larga 0,6 sull'ascissa k, da y0 a y1 */
const barra = (k, y0, y1, colore) => ({ tipo: 'poligono', punti: [[k - 0.3, y0], [k + 0.3, y0], [k + 0.3, y1], [k - 0.3, y1]], colore });
const PAC = '100*(1.04^x - 1)/(1.04^(1/12) - 1)';

COMPASSO.registra({
  id: 'matematica-finanziaria',
  titolo: 'Matematica finanziaria',

  introduzione: R`La matematica finanziaria risponde a domande di tutti i giorni. Quanto rende un deposito in banca? Quanto costa davvero un prestito? Conviene pagare subito o a rate? Al centro c'è un'idea sola: **il denaro cambia valore con il tempo**. Mille euro oggi valgono più di mille euro fra un anno, perché nel frattempo possono fruttare interessi.

Bastano pochi simboli: il capitale, il tasso, il tempo, il montante. Con questi si calcolano gli interessi e si spostano le somme avanti e indietro nel tempo. Si costruisce anche il piano delle rate di un mutuo.

Ti servono le potenze e la funzione esponenziale, perché l'interesse composto è una crescita esponenziale. E ti serve la somma della progressione geometrica, che regge rendite e rate.`,

  inBreve: [
    R`Il montante è capitale più interessi: $M = C + I$. Nei conti il tasso si scrive come numero decimale: $5\% = 0{,}05$.`,
    R`Interesse semplice: $M = C(1 + i\,t)$, una retta. Interesse composto: $M = C(1 + i)^t$, un'esponenziale. Dopo il primo anno il composto dà di più.`,
    R`Per portare una somma indietro nel tempo la dividi per $(1 + i)^t$: ottieni il suo valore attuale.`,
    R`Il montante e il valore attuale di una rendita sono somme di progressioni geometriche di ragione $1 + i$.`,
    R`Nell'ammortamento francese la rata è costante: la quota interessi cala, la quota capitale cresce.`,
    R`Per confrontare due offerte guarda il TAEG e i valori attuali, non la somma delle rate.`
  ],

  sezioni: [
    { id: 'capitale-interesse', titolo: 'Capitale, interesse, montante e tasso', testo: R`Chi presta dei soldi riceve un compenso per il tempo in cui l'altro li usa. Vale per un deposito in banca, che è un prestito alla banca. Vale anche al contrario: con un mutuo è la banca che presta a te.

>* Il **capitale** $C$ è la somma impiegata. L'**interesse** $I$ è il compenso per averla prestata. Il **montante** $M$ è la somma che hai alla fine: $$M = C + I.$$ Il **tasso** annuo $i$ è l'interesse prodotto in un anno da $1$ euro di capitale. Il **tempo** $t$ si misura in anni.

Il tasso si dà in percentuale, ma nei conti va scritto come numero decimale: $5\% = \frac{5}{100} = 0{,}05$.

~ C = 1000, \quad i = 5\% = 0{,}05 :: verso $1000$ € al $5\%$ annuo
~ I = 1000 \cdot 0{,}05 = \evid{50} :: l'interesse di un anno: il $5\%$ del capitale
~ M = 1000 + 50 = \evidb{1050} :: il montante dopo un anno, in euro

Il tasso si può anche ricavare. Presti $800$ € e dopo un anno ne ricevi $836$: l'interesse è di $36$ €. Il tasso è l'interesse diviso il capitale: $i = \frac{36}{800} = 0{,}045$, cioè il $4{,}5\%$.

> Qui la lettera $i$ è il **tasso**, non l'unità immaginaria dei numeri complessi. È la stessa grandezza che nell'argomento «Esponenziali» si chiama $r$, nella formula $C(t) = C_0(1 + r)^t$.

>! Tasso e tempo devono usare la stessa unità. Con un tasso annuo, sei mesi sono $t = \frac{6}{12} = 0{,}5$ anni, non $t = 6$.

>! Il tasso va scritto in forma decimale. Con $i = 5$ al posto di $0{,}05$, l'interesse di un anno sarebbe cinque volte il capitale.

?? Depositi $2000$ € e dopo un anno trovi $2060$ €. Qual è il tasso annuo?
[ ] $60\%$
[x] $3\%$
[ ] $0{,}3\%$
=> L'interesse è di $60$ €, e il tasso è $\frac{60}{2000} = 0{,}03$, cioè il $3\%$. Il $60\%$ scambia l'interesse in euro per il tasso. Lo $0{,}3\%$ sbaglia di dieci volte il passaggio alla percentuale.` },

    { id: 'semplice-composta', titolo: 'Capitalizzazione semplice e composta', testo: R`Lasci il capitale impiegato per più anni. Che fine fanno gli interessi del primo anno? Ci sono due regole, dette **regimi** di capitalizzazione.

[[video:matematica-finanziaria/interesse-composto]]

>* **Capitalizzazione semplice:** gli interessi si calcolano sempre sul capitale iniziale. Ogni anno si aggiunge lo stesso importo $C \cdot i$: $$I = C\,i\,t \qquad M = C(1 + i\,t).$$ **Capitalizzazione composta:** alla fine di ogni anno gli interessi si sommano al capitale, e poi fruttano anche loro. Ogni anno il montante si moltiplica per $1 + i$: $$M = C(1 + i)^t.$$

Riprendi $1000$ € al $5\%$. Il primo anno i due regimi danno lo stesso montante, $1050$ €. Dal secondo anno si separano.

~ M_1 = 1000 \cdot 1{,}05 = 1050 :: fine del primo anno: uguale nei due regimi
~ M_2 = 1050 \cdot 1{,}05 = \evid{1102{,}50} :: composto: il $5\%$ si calcola su $1050$ e fa $52{,}50$
~ M_2 = 1000 \cdot 1{,}05^{\evid{2}} :: ogni anno un fattore $1{,}05$ in più
~ M_{10} = 1000 \cdot 1{,}05^{10} \approx \evidb{1628{,}89} :: dopo dieci anni; col semplice $1000 \cdot (1 + 0{,}05 \cdot 10) = 1500$

I $2{,}50$ € in più del secondo anno sono **interessi sugli interessi**. Anno dopo anno pesano sempre di più: dopo dieci anni il composto dà circa $129$ € in più.

[[grafico:gSempliceComposto]]

Il grafico mostra la differenza di forma. Il montante semplice è una funzione **lineare** del tempo: una retta di pendenza $C\,i$. Il montante composto è una funzione **esponenziale**. È proprio la $C(t) = C_0(1 + r)^t$ di «Esponenziali», con $C_0 = C$ e $r = i$.

> Anno per anno, i montanti formano due progressioni (vedi «Successioni e progressioni»). Nel semplice è una progressione aritmetica di differenza $C\,i$. Nel composto è una progressione geometrica di ragione $q = 1 + i$.

>! Per durate **minori di un anno** il semplice dà un po' di più. Sei mesi al $5\%$: col semplice $1000 \cdot 1{,}025 = 1025$ €, col composto $1000 \cdot 1{,}05^{0{,}5} \approx 1024{,}70$ €. Nella pratica il regime semplice si usa per le durate brevi, il composto per quelle lunghe.

?? Al $5\%$ composto, in quanti anni circa un capitale raddoppia?
=> In circa $14$ anni: $1{,}05^{14} \approx 1{,}98$. Una vecchia regola pratica dice di dividere $72$ per il tasso in percentuale: $72 : 5 = 14{,}4$. Col semplice servirebbero $20$ anni, perché ogni anno si aggiunge solo il $5\%$ del capitale iniziale.` },

    { id: 'tassi-equivalenti', titolo: 'Tassi equivalenti, TAN e TAEG', testo: R`Non sempre gli interessi si contano a fine anno. Un conto può pagarli ogni sei mesi, un prestito si rimborsa ogni mese. Serve allora un tasso per il **periodo**: il semestre, il trimestre, il mese.

>* Due tassi sono **equivalenti** se danno lo stesso montante, con lo stesso capitale e nello stesso tempo. In capitalizzazione composta, se un anno contiene $k$ periodi: $$1 + i = (1 + i_k)^k,$$ cioè $$i_k = (1 + i)^{\frac{1}{k}} - 1.$$ $i_2$ è il tasso semestrale, $i_4$ il trimestrale, $i_{12}$ il mensile.

Un esempio con il tasso annuo del $6\%$.

~ (1 + i_2)^2 = 1{,}06 :: due semestri devono rendere quanto un anno
~ i_2 = \sqrt{1{,}06} - 1 \approx \evidb{0{,}0296} :: il tasso semestrale: circa il $2{,}96\%$
~ i_{12} = 1{,}06^{\frac{1}{12}} - 1 \approx \evidb{0{,}00487} :: il tasso mensile: circa lo $0{,}487\%$

>! Il tasso mensile **non** è il tasso annuo diviso $12$. Con lo $0{,}5\%$ al mese, in un anno il capitale si moltiplica per $1{,}005^{12} \approx 1{,}0617$. Fa il $6{,}17\%$, non il $6\%$: gli interessi di ogni mese fruttano nei mesi dopo.

> In capitalizzazione **semplice**, invece, i tassi equivalenti sono proporzionali: $i_k = \frac{i}{k}$. Il $6\%$ annuo equivale al $3\%$ semestrale e allo $0{,}5\%$ mensile.

### TAN e TAEG

Nelle offerte di prestito compaiono due sigle. Il **TAN**, tasso annuo nominale, è il tasso del periodo per il numero di periodi dell'anno. Con rate mensili vale $\text{TAN} = 12 \cdot i_{12}$. È solo un altro modo di dire il tasso mensile.

Il tasso che paghi davvero in un anno è più alto. Con un TAN del $12\%$ e rate mensili, il tasso mensile è l'$1\%$. In un anno: $1{,}01^{12} - 1 \approx 0{,}1268$, cioè il $12{,}68\%$.

Il **TAEG**, tasso annuo effettivo globale, fa un passo in più. Mette nel conto anche le spese obbligatorie: istruttoria, incasso delle rate, assicurazioni richieste. È il costo vero del prestito, in percentuale all'anno. Nell'Unione europea la legge lo rende obbligatorio. In Italia lo prevede il Testo unico bancario, agli articoli 121–125. Il TAEG va indicato negli annunci che citano tassi o costi, e nei contratti di credito ai consumatori. È il numero da guardare per confrontare le offerte.

?? Un prestito ha TAN $6\%$ e rate mensili. Qual è il tasso mensile?
[x] $0{,}5\%$
[ ] $6\%$
[ ] $1{,}06^{\frac{1}{12}} - 1 \approx 0{,}49\%$
=> Il TAN è per definizione dodici volte il tasso mensile: $6 : 12 = 0{,}5\%$. Il conto con la radice dà il tasso mensile equivalente a un $6\%$ **effettivo**: è un'altra cosa.` },

    { id: 'sconto-valore-attuale', titolo: 'Sconto e valore attuale', testo: R`Finora il denaro è andato avanti nel tempo, dal capitale al montante. Ora il viaggio è all'indietro. Riceverai una somma fra qualche anno: quanto vale **oggi**?

>* Prendi una somma $M$ disponibile fra $t$ anni. Il suo **valore attuale** $V$ è il capitale che oggi, al tasso $i$, diventa $M$. La differenza $M - V$ si chiama **sconto**. In regime composto, cioè con lo **sconto composto**: $$V = \frac{M}{(1 + i)^t} = M(1 + i)^{-t}.$$

È la formula del montante letta al contrario. **Capitalizzare** vuol dire moltiplicare per $(1 + i)^t$, **attualizzare** vuol dire dividere.

~ M = 1628{,}89, \quad i = 0{,}05, \quad t = 10 :: una somma che arriverà fra dieci anni
~ V = 1628{,}89 \cdot 1{,}05^{\evid{-10}} :: la porto indietro di dieci anni
~ V \approx \evidb{1000} :: oggi vale $1000$ €: lo sconto è di $628{,}89$ €

[[grafico:gAttualizza]]

Il valore attuale serve a **confrontare** somme che arrivano in date diverse. Prima si portano tutte alla stessa data, poi si confrontano.

### Lo sconto commerciale

Per le scadenze brevi si usa un'altra regola. Una ditta ha una cambiale da $5000$ € che scade fra $3$ mesi. La porta in banca e riceve subito il denaro, meno uno sconto.

>* **Sconto commerciale:** lo sconto è proporzionale alla somma che scade e al tempo che manca, con un **tasso di sconto** $d$: $$\text{sconto} = M\,d\,t,$$ e il valore attuale è $$V = M(1 - d\,t).$$

Con $d = 8\%$ annuo lo sconto è $5000 \cdot 0{,}08 \cdot \frac{3}{12} = 100$ €. La ditta riceve $V = 4900$ €.

>! Lo sconto commerciale funziona solo per tempi brevi. Con $d = 10\%$ e $t = 10$ anni darebbe $V = M(1 - 1) = 0$: una somma futura che oggi non vale niente.

Se la scadenza è data in giorni, si usa l'**anno commerciale** di $360$ giorni: $t = \frac{g}{360}$. Per esempio $90$ giorni sono $t = \frac{90}{360} = 0{,}25$.

### Lo sconto razionale

Lo **sconto razionale** è la capitalizzazione semplice letta al contrario. $V$ è il capitale che, a interesse semplice, diventa $M$.

>* **Sconto razionale:** con il tasso di interesse $i$, $$V = \frac{M}{1 + i\,t} \qquad \text{sconto} = M - V.$$

Con la stessa cambiale, $5000$ € fra $3$ mesi e $i = 8\%$: $1 + 0{,}08 \cdot 0{,}25 = 1{,}02$, quindi $V = \dfrac{5000}{1{,}02} \approx 4901{,}96$ €. È poco più dei $4900$ € del commerciale: a parità di tasso, lo sconto razionale è più piccolo.

> Tre regole, dunque. Lo sconto composto vale per le durate lunghe. Il commerciale e il razionale si usano per le scadenze brevi, sotto l'anno.

?? Al $4\%$ annuo composto, che cosa preferisci: $1000$ € oggi o $1100$ € fra $2$ anni?
[ ] $1000$ € oggi: il denaro di oggi vale sempre di più.
[x] $1100$ € fra $2$ anni: oggi valgono circa $1017$ €.
[ ] È lo stesso: $100$ € in più compensano due anni di attesa.
=> Attualizzo: $1100 \cdot 1{,}04^{-2} \approx 1017{,}01$ €. È più di $1000$, quindi conviene aspettare. Il denaro di oggi vale di più, ma non sempre abbastanza.` },

    { id: 'rendite', titolo: 'Le rendite e il loro montante', testo: R`Molti contratti non sono un versamento solo. Sono tante somme uguali, a intervalli regolari: l'affitto, le rate di un prestito, i versamenti in un fondo pensione.

>* Una **rendita** è una successione di somme, le **rate** $R$, disponibili a intervalli regolari. È **annua** se arriva una rata all'anno. È **posticipata** se ogni rata si paga alla **fine** del suo periodo, **anticipata** se all'**inizio**. Il numero delle rate si indica con $n$.

Il **montante** di una rendita è il valore di tutte le rate alla fine dell'ultimo periodo. Ogni rata frutta interessi composti dal giorno in cui viene versata.

Versi $1000$ € alla fine di ogni anno, per $5$ anni, al $5\%$. L'ultima rata arriva alla fine e non frutta niente. La penultima frutta per un anno, la prima per quattro.

[[grafico:gRendita]]

Il montante è la somma delle barre. Lette da destra a sinistra, formano una progressione geometrica di ragione $q = 1{,}05$. Nell'argomento «Successioni e progressioni» c'è la sua somma: $S_n = a_1 \cdot \frac{q^n - 1}{q - 1}$.

~ M = R + Rq + \dots + Rq^{n - 1} :: dall'ultima rata alla prima, con $q = 1 + i$
~ M = R \cdot \frac{(1 + i)^n - 1}{\evid{(1 + i) - 1}} :: somma geometrica con $a_1 = R$ e $q = 1 + i$
~ M = \evidb{R \cdot \frac{(1 + i)^n - 1}{i}} :: il denominatore $q - 1$ è proprio il tasso
~ M = 1000 \cdot \frac{1{,}05^5 - 1}{0{,}05} \approx 5525{,}63 :: con i nostri numeri: $525{,}63$ € sono interessi

Se la rendita è **anticipata**, ogni rata arriva un anno prima e frutta per un anno in più. Il montante si moltiplica per $1 + i$: $$M_{\text{ant}} = R(1 + i) \cdot \frac{(1 + i)^n - 1}{i}.$$ Con gli stessi numeri: $5525{,}63 \cdot 1{,}05 \approx 5801{,}91$ €.

>! Il montante non è $R \cdot n$. Le rate fruttano interessi: $5 \cdot 1000 = 5000$ € è solo quello che hai versato.

>! Conta bene gli anni di interesse. Nella posticipata l'ultima rata non frutta niente. Nell'anticipata anche l'ultima frutta per un anno.

?? Le stesse cinque rate si versano a inizio anno invece che a fine anno. Che cosa cambia nel montante?
=> Ogni rata resta impiegata un anno in più, quindi il montante si moltiplica per $1 + i$. Da $5525{,}63$ € si passa a circa $5801{,}91$ €.` },

    { id: 'valore-attuale-rendita', titolo: 'Il valore attuale di una rendita', testo: R`Il **valore attuale** di una rendita è il valore di tutte le rate **oggi**, all'inizio del primo periodo. Risponde a due domande pratiche. Quanto devo avere oggi per pagare quelle rate? Quanto mi possono prestare, se restituisco quelle rate?

>* Per una rendita annua posticipata di $n$ rate $R$ al tasso $i$: $$V = R \cdot \frac{1 - (1 + i)^{-n}}{i}.$$ Per una rendita anticipata si moltiplica per $1 + i$: $V_{\text{ant}} = R(1 + i) \cdot \frac{1 - (1 + i)^{-n}}{i}$.

La formula viene dal montante: il valore attuale è il montante portato indietro di $n$ anni.

~ V = M \cdot (1 + i)^{-n} :: attualizzo il montante alla data di oggi
~ V = R \cdot \frac{(1 + i)^n - 1}{i} \cdot \evid{(1 + i)^{-n}} :: scrivo la formula del montante
~ V = \evidb{R \cdot \frac{1 - (1 + i)^{-n}}{i}} :: moltiplico: $(1 + i)^n \cdot (1 + i)^{-n} = 1$

Si arriva allo stesso punto attualizzando le rate una per una: $R(1 + i)^{-1} + R(1 + i)^{-2} + \dots + R(1 + i)^{-n}$. È di nuovo una progressione geometrica, di ragione $(1 + i)^{-1}$.

Con le rate di prima, $1000$ € per $5$ anni al $5\%$, il valore attuale è $V = 1000 \cdot \frac{1 - 1{,}05^{-5}}{0{,}05} \approx 4329{,}48$ €. Chi oggi ha questa somma e la impiega al $5\%$ può pagare cinque rate da $1000$ €. Alla fine non gli resta niente.

>! $V$ è sempre **minore** di $R \cdot n$, perché le rate future oggi valgono meno. Se ti viene più grande, hai capitalizzato invece di attualizzare.

### La rata di un debito

Se la rendita serve a pagare un **debito**, il valore attuale delle rate è la somma prestata. Un debito $S = 10\,000$ € al $4\%$ si restituisce con $5$ rate annue posticipate. La rata si ricava dalla formula con $V = S$.

~ 10\,000 = R \cdot \frac{1 - 1{,}04^{-5}}{0{,}04} :: il debito è il valore attuale delle cinque rate
~ R = \frac{10\,000 \cdot 0{,}04}{1 - 1{,}04^{-5}} \approx \evidb{2246{,}27} :: la rata annua, in euro

?? Una rendita posticipata e una anticipata hanno le stesse rate. Quale ha il valore attuale più alto?
[x] L'anticipata, perché ogni rata arriva un anno prima.
[ ] La posticipata, perché le rate arrivano dopo e fruttano di più.
[ ] Nessuna delle due: le rate sono uguali.
=> Una somma che arriva prima si attualizza per un anno in meno, quindi oggi vale di più. Il valore attuale dell'anticipata è quello della posticipata moltiplicato per $1 + i$.` },

    { id: 'ammortamento', titolo: 'L\'ammortamento e il piano delle rate', testo: R`**Ammortizzare** un debito vuol dire restituirlo a rate, con gli interessi. Per mutui e prestiti il modo più diffuso è l'ammortamento **francese**, con tutte le rate uguali.

[[video:matematica-finanziaria/ammortamento]]

>* **Ammortamento francese**, o a rata costante: un debito $S$ al tasso $i$ si restituisce con $n$ rate posticipate uguali, $$R = S \cdot \frac{i}{1 - (1 + i)^{-n}}.$$ Ogni rata ha due parti. La **quota interessi** è il debito residuo per il tasso. La **quota capitale** è il resto della rata, e fa scendere il debito.

Il debito è di $10\,000$ € al $4\%$, in $5$ rate annue. La rata è $R \approx 2246{,}27$ €. Il primo anno si devono ancora tutti i $10\,000$ €.

~ I_1 = 10\,000 \cdot 0{,}04 = \evid{400} :: quota interessi: il $4\%$ del debito residuo
~ Q_1 = 2246{,}27 - 400 = \evid{1846{,}27} :: quota capitale: il resto della rata
~ D_1 = 10\,000 - 1846{,}27 = \evidb{8153{,}73} :: il debito residuo dopo la prima rata
~ I_2 = 8153{,}73 \cdot 0{,}04 \approx 326{,}15 :: secondo anno: gli interessi si calcolano sul debito che resta

Gli anni dopo si fanno allo stesso modo. I risultati si scrivono in una tabella, il **piano di ammortamento**. La rata è di $2246{,}27$ €. Nella riga dell'anno $k$ ci sono gli interessi $I_k$, la quota capitale $Q_k$ e il debito residuo $D_k$. I valori sono arrotondati al centesimo.

| $k$ | $I_k$ (€) | $Q_k$ (€) | $D_k$ (€) |
|---|---|---|---|
| 0 | | | 10 000,00 |
| 1 | 400,00 | 1846,27 | 8153,73 |
| 2 | 326,15 | 1920,12 | 6233,61 |
| 3 | 249,34 | 1996,93 | 4236,68 |
| 4 | 169,47 | 2076,80 | 2159,88 |
| 5 | 86,40 | 2159,88 | 0,00 |

Per gli arrotondamenti l'ultima rata viene $2246{,}28$ €: nella riga $5$ si sommano $86{,}40$ e $2159{,}88$. Le quote capitale, sommate, fanno $10\,000$ €: tutto il debito. La colonna degli interessi somma $1231{,}36$ €: è il costo del prestito.

[[grafico:gAmmortamento]]

Gli interessi **calano**, perché il debito scende. La rata è fissa, quindi la quota capitale **cresce** di quanto calano gli interessi.

>! Gli interessi si calcolano sul **debito residuo**, non sul debito iniziale. Chi ogni anno paga il $4\%$ di $10\,000$ € sbaglia gli interessi dal secondo anno in poi.

> Il debito residuo è il valore attuale delle rate che mancano. Dopo quattro rate ne manca una: $2246{,}27 \cdot 1{,}04^{-1} \approx 2159{,}88$ €.

### Un cenno all'ammortamento italiano

Nell'ammortamento **italiano** è costante la quota capitale, $\frac{S}{n}$. Con gli stessi numeri sono $2000$ € all'anno. Gli interessi valgono $400$, $320$, $240$, $160$ e $80$ €. Le rate scendono da $2400$ a $2080$ €. In tutto si pagano $1200$ € di interessi, meno che col francese: il debito scende più in fretta. In cambio le prime rate sono più alte.

?? Nell'ammortamento francese, la quota capitale dell'ultima rata è uguale…
[ ] alla rata intera.
[x] al debito residuo dopo la penultima rata.
[ ] alla quota capitale della prima rata.
=> L'ultima quota capitale deve chiudere tutto quello che resta: $2159{,}88$ €, il debito residuo dopo la quarta rata. Non è la rata intera, perché una parte paga ancora gli interessi.` },

    { id: 'confronto', titolo: 'Prestito, mutuo e piano di accumulo', testo: R`Gli stessi strumenti servono nelle scelte vere. Ecco tre casi con numeri realistici: un prestito, un mutuo e un risparmio a rate.

### Un prestito personale

Chiedi $6000$ € da restituire in $24$ rate mensili, con TAN del $6\%$. Il tasso mensile è $i_{12} = 0{,}06 : 12 = 0{,}005$.

~ R = \frac{6000 \cdot 0{,}005}{1 - 1{,}005^{-24}} \approx \evid{265{,}92} :: la rata mensile, con l'ammortamento francese
~ 24 \cdot 265{,}92 \approx 6382 :: quanto restituisci in tutto
~ 6382 - 6000 = \evidb{382} :: circa $382$ € di interessi

Ora aggiungi $200$ € di spese di istruttoria, pagate subito. In pratica ricevi $5800$ €, ma le rate restano le stesse. Il TAEG sale a circa il $9{,}8\%$. Senza spese il tasso effettivo sarebbe il $6{,}17\%$. Il TAEG si trova cercando il tasso mensile che rende $5800$ € il valore attuale delle $24$ rate. Si procede per tentativi, o con un foglio di calcolo.

### Un mutuo per la casa

Un mutuo di $120\,000$ € dura $20$ anni, con rate mensili e TAN del $3\%$. Il tasso mensile è $0{,}0025$ e le rate sono $240$.

~ R = \frac{120\,000 \cdot 0{,}0025}{1 - 1{,}0025^{-240}} \approx \evid{665{,}52} :: la rata mensile
~ 240 \cdot 665{,}52 \approx 159\,725 :: quanto si restituisce in vent'anni: quasi $40\,000$ € di interessi
~ I_1 = 120\,000 \cdot 0{,}0025 = \evidb{300} :: gli interessi della prima rata: quasi metà della rata

Nei primi anni la rata paga soprattutto interessi. Chi estingue il mutuo dopo pochi anni ha restituito ancora poco capitale.

### Un piano di accumulo

Un piano di accumulo, o PAC, è una rendita in cui versi tu. Metti da parte $100$ € alla fine di ogni mese per $10$ anni, con un rendimento del $4\%$ annuo. Il tasso mensile equivalente è $i_{12} = 1{,}04^{\frac{1}{12}} - 1 \approx 0{,}00327$.

~ n = 12 \cdot 10 = 120 :: le rate mensili in dieci anni
~ M = 100 \cdot \frac{(1 + i_{12})^{120} - 1}{i_{12}} :: il montante della rendita
~ M \approx \evidb{14\,669{,}59} :: in euro
~ M - 12\,000 \approx 2669{,}59 :: hai versato $12\,000$ €: il resto sono interessi

[[grafico:gPac]]

>! Un rendimento del $4\%$ non è garantito. In un fondo vero cambia ogni anno, e può anche essere negativo. Il conto dice che cosa succede **se** il tasso resta quello.

>* Nei tre casi contano il tasso **effettivo** e la durata. Una rata bassa per molti anni può costare più di una rata alta per pochi.

?? Due prestiti da $6000$ € hanno lo stesso TAN e le stesse rate. Il primo ha $200$ € di spese, il secondo nessuna. Quale ha il TAEG più alto?
[x] Il primo, perché il TAEG conta anche le spese.
[ ] Nessuno dei due: con lo stesso TAN il TAEG è uguale.
[ ] Il secondo, perché senza spese si paga tutto con le rate.
=> Con le spese ricevi meno denaro, ma restituisci le stesse rate: il costo vero sale. Il TAN non lo vede, il TAEG sì.` }
  ],
  grafici: {
    /* video interesse-composto: 1000 € per 10 anni; al 5 % 1500 € e 1628,89 €; nel primo anno coincidono */
    gSempliceComposto: { tipo: 'piano', x: [-0.95, 11.8], y: [900, 2300], passo: [2, 200], mirino: true,
      etichette: { x: 'anni', y: 'euro' },
      parametri: [ { nome: 'i', min: 0.01, max: 0.08, passo: 0.01, valore: 0.05, etichetta: 'tasso i' } ],
      funzioni: [
        { f: '1000*(1 + i*x)', colore: 2, dominio: [0, 10] },
        { f: '1000*(1 + i)^x', colore: 1, dominio: [0, 10] }
      ],
      elementi: [
        { tipo: 'testo', p: [5.6, '1000*(1 + i)^5.6 + 90'], testo: 'composto', ancora: 'end' },
        { tipo: 'testo', p: [6.4, '1000*(1 + 6.4*i) - 70'], testo: 'semplice', ancora: 'start' },
        { tipo: 'punto', p: [0, 1000], colore: 4 },
        { tipo: 'punto', p: [1, '1000*(1 + i)'], colore: 4 },
        { tipo: 'punto', p: [10, '1000*(1 + 10*i)'], etichetta: '{{1000*(1 + 10*i)}}', posizione: 'basso-sinistra', colore: 2 },
        { tipo: 'punto', p: [10, '1000*(1 + i)^10'], etichetta: '{{1000*(1 + i)^10}}', posizione: 'alto-sinistra', colore: 1 }
      ],
      didascalia: '1000 € impiegati per 10 anni. La retta è la capitalizzazione semplice, la curva la composta. Al 5% finiscono a 1500 € e a 1628,89 €. Le due crescite coincidono alla fine del primo anno; più il tasso è alto, più la curva si stacca dalla retta.' },

    /* la stessa curva letta nei due versi: 1000 € oggi equivalgono a 1000 · 1,05ᵗ € fra t anni */
    gAttualizza: { tipo: 'piano', x: [-0.95, 11.8], y: [800, 1800], passo: [2, 200], mirino: false,
      etichette: { x: 'anni', y: 'euro' },
      parametri: [ { nome: 't', min: 0, max: 10, passo: 1, valore: 2, nascosto: true } ],
      funzioni: [ { f: '1000*1.05^x', colore: 1, dominio: [0, 10] } ],
      elementi: [
        { tipo: 'punto', p: [0, 1000], etichetta: 'V', posizione: 'alto-destra', colore: 1 },
        { tipo: 'punto', p: [10, '1000*1.05^10'], etichetta: 'M', posizione: 'alto-sinistra', colore: 1 },
        { tipo: 'punto', p: ['t', '1000*1.05^t'], trascina: true, colore: 2 },
        { tipo: 'testo', p: [0.5, 1560], testo: 'anno {{t}}: ' + centesimi('1000*1.05^t') + ' €', ancora: 'start' },
        { tipo: 'vettore', da: [5.2, 1080], a: [9.6, 1080], colore: 3 },
        { tipo: 'testo', p: [7.4, 1120], testo: 'capitalizzo: × 1,05ᵗ' },
        { tipo: 'vettore', da: [9.6, 900], a: [5.2, 900], colore: 2 },
        { tipo: 'testo', p: [7.4, 940], testo: 'attualizzo: × 1,05⁻ᵗ' }
      ],
      didascalia: 'Al 5% i punti della curva sono somme equivalenti: 1000 € oggi (V), 1102,50 € fra 2 anni, 1628,89 € fra 10 anni (M). Verso destra si capitalizza, verso sinistra si attualizza.' },

    /* rendita posticipata: 5 rate da 1000 € al 5 %, valore di ciascuna alla fine del quinto anno */
    gRendita: { tipo: 'piano', x: [-0.95, 5.8], y: [0, 1400], passo: [1, 200], mirino: false, proporzioni: 'libere',
      etichette: { x: 'rata', y: 'euro' },
      elementi: [
        barra(1, 0, 1215.51, 1), barra(2, 0, 1157.63, 1), barra(3, 0, 1102.50, 1), barra(4, 0, 1050, 1), barra(5, 0, 1000, 1),
        { tipo: 'orizzontale', y: 1000, tratteggio: true, colore: 4 }
      ],
      didascalia: 'Cinque rate da 1000 € a fine anno, al 5%: il valore di ognuna alla fine del quinto anno. La 1ª vale 1000 · 1,05⁴ ≈ 1215,51 €, poi 1157,63 €, 1102,50 € e 1050 €; la 5ª, appena versata, 1000 €. In tutto 5525,63 €.' },

    /* video ammortamento: 10 000 € al 4 % in 5 rate da 2246,27 €; in ogni barra sotto la quota capitale, sopra gli interessi */
    gAmmortamento: { tipo: 'piano', x: [-0.95, 5.8], y: [0, 2600], passo: [1, 500], mirino: false, proporzioni: 'libere',
      etichette: { x: 'anno', y: 'euro' },
      elementi: [
        barra(1, 0, 1846.27, 3), barra(1, 1846.27, 2246.27, 2),
        barra(2, 0, 1920.12, 3), barra(2, 1920.12, 2246.27, 2),
        barra(3, 0, 1996.93, 3), barra(3, 1996.93, 2246.27, 2),
        barra(4, 0, 2076.80, 3), barra(4, 2076.80, 2246.27, 2),
        barra(5, 0, 2159.88, 3), barra(5, 2159.88, 2246.27, 2),
        { tipo: 'testo', p: [3, 2420], testo: 'rata 2246,27 €' }
      ],
      didascalia: 'Le rate da 2246,27 €, anno per anno. In verde la quota capitale, che sale da 1846,27 € a 2159,88 €; in arancio, sopra, la quota interessi, che scende da 400 € a 86,40 €.' },

    /* PAC: 100 € a fine mese al 4 % annuo per 10 anni */
    gPac: { tipo: 'piano', x: [-0.95, 11.8], y: [0, 16000], passo: [2, 2000], mirino: true,
      etichette: { x: 'anni', y: 'euro' },
      funzioni: [
        { f: '1200*x', colore: 2, dominio: [0, 10] },
        { f: PAC, colore: 1, dominio: [0, 10] }
      ],
      elementi: [
        { tipo: 'testo', p: [3.6, 6400], testo: 'montante', ancora: 'end' },
        { tipo: 'testo', p: [7, 6400], testo: 'versato', ancora: 'start' }
      ],
      punti: [
        { x: 10, y: 12000, etichetta: '12 000', posizione: 'basso-sinistra', colore: 2 },
        { x: 10, y: 14669.59, etichetta: '14 669,59', posizione: 'alto-sinistra', colore: 1 }
      ],
      didascalia: 'Piano di accumulo: 100 € a fine mese, al 4% annuo. La retta è quanto hai versato, 1200 € all\'anno. La curva è il montante: dopo 10 anni vale 14 669,59 €, contro 12 000 € versati.' }
  },

  esempi: [
    { titolo: 'Montante composto e confronto con il semplice', problema: R`Un capitale di $3500$ € è impiegato al $3\%$ annuo per $4$ anni. Calcola montante e interessi in capitalizzazione composta. Poi confronta con la capitalizzazione semplice.`, passi: [
      R`I dati sono $C = 3500$, $i = 0{,}03$, $t = 4$. Il tasso è annuo e il tempo è in anni: le unità tornano.`,
      R`In capitalizzazione composta $M = C(1 + i)^t = 3500 \cdot 1{,}03^4$. Con $1{,}03^4 \approx 1{,}125509$ ottieni $M \approx 3939{,}28$ €.`,
      R`Gli interessi sono la differenza fra montante e capitale: $I = M - C \approx 439{,}28$ €.`,
      R`In capitalizzazione semplice $M = 3500 \cdot (1 + 0{,}03 \cdot 4) = 3500 \cdot 1{,}12 = 3920$ €, con $420$ € di interessi.`,
      R`Il composto dà $19{,}28$ € in più: sono gli interessi prodotti dagli interessi degli anni prima.`
    ], risultato: R`$M \approx 3939{,}28$ € e $I \approx 439{,}28$ €; col semplice $M = 3920$ €` },

    { titolo: 'Dal TAN al tasso effettivo', problema: R`Un acquisto a rate applica un TAN del $18\%$, con interessi mensili. Qual è il tasso effettivo annuo? Qual è il tasso semestrale equivalente?`, passi: [
      R`Il TAN è dodici volte il tasso mensile, quindi $i_{12} = 0{,}18 : 12 = 0{,}015$.`,
      R`Un anno contiene $12$ mesi: $1 + i = 1{,}015^{12} \approx 1{,}1956$.`,
      R`Il tasso effettivo annuo è circa il $19{,}56\%$. È più del $18\%$ del TAN, perché gli interessi di ogni mese fruttano nei mesi dopo.`,
      R`Un semestre contiene $6$ mesi: $1 + i_2 = 1{,}015^6 \approx 1{,}0934$. Il tasso semestrale è circa il $9{,}34\%$.`,
      R`Controllo: $1{,}015^{12} = \left(1{,}015^6\right)^2$, quindi due semestri rendono quanto un anno. I tre tassi sono equivalenti.`
    ], risultato: R`Tasso effettivo annuo $\approx 19{,}56\%$, tasso semestrale $\approx 9{,}34\%$` },

    { titolo: 'Lo sconto di una cambiale', problema: R`Una cambiale da $4500$ € scade fra $4$ mesi. La banca applica lo sconto commerciale con tasso $d = 9\%$ annuo. Quanto riceve oggi la ditta? Confronta con lo sconto composto al $9\%$.`, passi: [
      R`Il tasso è annuo, quindi il tempo va in anni: $t = \frac{4}{12} = \frac{1}{3}$.`,
      R`Lo sconto commerciale è $M\,d\,t = 4500 \cdot 0{,}09 \cdot \frac{1}{3} = 135$ €.`,
      R`La ditta riceve $V = 4500 - 135 = 4365$ €.`,
      R`Con lo sconto composto: $V = 4500 \cdot 1{,}09^{-\frac{1}{3}} \approx 4372{,}57$ €.`,
      R`Lo sconto commerciale toglie $7{,}57$ € in più. Per tempi brevi i due regimi sono vicini, e il commerciale è più semplice.`
    ], risultato: R`$4365$ € con lo sconto commerciale; circa $4372{,}57$ € con lo sconto composto` },

    { titolo: 'Quanto versare ogni anno per arrivare a una cifra', problema: R`Vuoi avere $20\,000$ € fra $8$ anni. Versi una somma fissa alla fine di ogni anno, al $3\%$. Quanto devi versare ogni volta?`, passi: [
      R`È una rendita annua posticipata di cui conosci il montante: $M = 20\,000$, $n = 8$, $i = 0{,}03$. L'incognita è la rata $R$.`,
      R`Scrivi la formula del montante: $20\,000 = R \cdot \dfrac{1{,}03^8 - 1}{0{,}03}$.`,
      R`$1{,}03^8 \approx 1{,}266770$, quindi la frazione vale circa $8{,}892336$.`,
      R`Dividi: $R = 20\,000 : 8{,}892336 \approx 2249{,}13$ €.`,
      R`In tutto versi $8 \cdot 2249{,}13 \approx 17\,993$ €. Gli altri $2007$ € circa sono interessi.`
    ], risultato: R`$R \approx 2249{,}13$ € all'anno` },

    { titolo: 'Un piano di ammortamento in tre rate', problema: R`Un debito di $8000$ € al $5\%$ si restituisce con $3$ rate annue posticipate costanti. Calcola la rata e scrivi il piano di ammortamento.`, passi: [
      R`Ammortamento francese: $R = 8000 \cdot \dfrac{0{,}05}{1 - 1{,}05^{-3}} \approx 2937{,}67$ €.`,
      R`Primo anno. Interessi: $8000 \cdot 0{,}05 = 400$. Quota capitale: $2937{,}67 - 400 = 2537{,}67$. Debito residuo: $8000 - 2537{,}67 = 5462{,}33$.`,
      R`Secondo anno. Interessi: $5462{,}33 \cdot 0{,}05 \approx 273{,}12$. Quota capitale: $2664{,}55$. Debito residuo: $2797{,}78$.`,
      R`Terzo anno. Interessi: $2797{,}78 \cdot 0{,}05 \approx 139{,}89$. Quota capitale: $2797{,}78$, proprio il debito che restava. Debito residuo: $0$.`,
      R`Controllo: le quote capitale sommano $8000$ €. Gli interessi in tutto sono $400 + 273{,}12 + 139{,}89 = 813{,}01$ €.`
    ], risultato: R`$R \approx 2937{,}67$ €; interessi totali $813{,}01$ €` },

    { titolo: 'Pagare subito o a rate?', problema: R`Un'auto costa $9500$ € in contanti. In alternativa si pagano $3$ rate annue da $3400$ €, la prima fra un anno. Al tasso del $4\%$, quale scelta conviene?`, passi: [
      R`Le rate formano una rendita annua posticipata con $n = 3$, $R = 3400$ e $i = 0{,}04$.`,
      R`Il suo valore attuale è $V = 3400 \cdot \dfrac{1 - 1{,}04^{-3}}{0{,}04} \approx 9435{,}31$ €.`,
      R`Ora le due somme stanno alla stessa data, oggi: $9435{,}31$ € contro $9500$ €.`,
      R`Le rate costano meno, anche se in tutto si pagano $10\,200$ €. Chi paga in contanti rinuncia agli interessi che quei soldi produrrebbero al $4\%$.`
    ], risultato: R`Conviene pagare a rate: oggi valgono circa $9435{,}31$ €, contro $9500$ €` }
  ],

  formulario: [
    { nome: 'Montante', formula: R`M = C + I`, nota: R`Capitale più interessi. Il tasso $i$ va scritto in forma decimale: $5\% = 0{,}05$.` },
    { nome: 'Capitalizzazione semplice', formula: R`I = C\,i\,t \qquad M = C(1 + i\,t)`, nota: R`Interessi sempre sul capitale iniziale: il montante è una retta. Si usa per durate brevi.` },
    { nome: 'Capitalizzazione composta', formula: R`M = C(1 + i)^t`, nota: R`Gli interessi fruttano a loro volta: il montante è un'esponenziale, la $C(t) = C_0(1 + r)^t$ di «Esponenziali».` },
    { nome: 'Tassi equivalenti (composta)', formula: R`1 + i = (1 + i_k)^k \qquad i_k = (1 + i)^{\frac{1}{k}} - 1`, nota: R`$k$ periodi in un anno: $k = 2$ semestri, $k = 4$ trimestri, $k = 12$ mesi.` },
    { nome: 'Tassi equivalenti (semplice)', formula: R`i_k = \frac{i}{k}`, nota: R`Solo in capitalizzazione semplice i tassi equivalenti sono proporzionali.` },
    { nome: 'TAN', formula: R`\text{TAN} = k \cdot i_k`, nota: R`Il tasso effettivo annuo è $(1 + i_k)^k - 1$, più alto del TAN. Il TAEG aggiunge anche le spese.` },
    { nome: 'Valore attuale (sconto composto)', formula: R`V = M(1 + i)^{-t} = \frac{M}{(1 + i)^t}`, nota: R`Lo sconto è $M - V$. Attualizzare è l'operazione inversa di capitalizzare.` },
    { nome: 'Sconto razionale', formula: R`V = \frac{M}{1 + i\,t}`, nota: R`La capitalizzazione semplice al contrario. Per le scadenze brevi; con i giorni, $t = \frac{g}{360}$.` },
    { nome: 'Sconto commerciale', formula: R`\text{sconto} = M\,d\,t \qquad V = M(1 - d\,t)`, nota: R`Solo per tempi brevi: con $d\,t \ge 1$ darebbe un valore attuale nullo o negativo.` },
    { nome: 'Montante di una rendita posticipata', formula: R`M = R \cdot \frac{(1 + i)^n - 1}{i}`, nota: R`È la somma di una progressione geometrica con $a_1 = R$ e $q = 1 + i$.` },
    { nome: 'Montante di una rendita anticipata', formula: R`M = R(1 + i) \cdot \frac{(1 + i)^n - 1}{i}`, nota: R`Ogni rata frutta un anno in più che nella posticipata.` },
    { nome: 'Valore attuale di una rendita posticipata', formula: R`V = R \cdot \frac{1 - (1 + i)^{-n}}{i}`, nota: R`È il montante attualizzato: $V = M(1 + i)^{-n}$.` },
    { nome: 'Valore attuale di una rendita anticipata', formula: R`V = R(1 + i) \cdot \frac{1 - (1 + i)^{-n}}{i}` },
    { nome: 'Rata dell\'ammortamento francese', formula: R`R = S \cdot \frac{i}{1 - (1 + i)^{-n}}`, nota: R`$S$ è il debito, $n$ il numero di rate posticipate costanti.` },
    { nome: 'Quote di una rata', formula: R`\begin{gathered} I_k = D_{k-1} \cdot i \qquad Q_k = R - I_k \\ D_k = D_{k-1} - Q_k \end{gathered}`, nota: R`Gli interessi si calcolano sul debito residuo $D_{k-1}$, con $D_0 = S$.` }
  ],
  flashcards: [
    { id: 'fc-01', sezione: 'capitale-interesse', tipo: 'definizione', fronte: R`Che cos'è il montante?`, retro: R`La somma che hai alla fine dell'impiego: capitale più interessi, $M = C + I$.` },
    { id: 'fc-02', sezione: 'capitale-interesse', tipo: 'definizione', fronte: R`Che cos'è il tasso annuo $i$?`, retro: R`L'interesse prodotto in un anno da $1$ euro di capitale. Nei conti si scrive in forma decimale: $4\% = 0{,}04$.` },
    { id: 'fc-03', sezione: 'capitale-interesse', tipo: 'concetto', fronte: R`In matematica finanziaria, che cosa indica la lettera $i$?`, retro: R`Il tasso di interesse, non l'unità immaginaria. È la $r$ della formula $C(t) = C_0(1 + r)^t$ di «Esponenziali».` },
    { id: 'fc-04', sezione: 'semplice-composta', tipo: 'formula', fronte: R`Interesse e montante in capitalizzazione semplice`, retro: R`$I = C\,i\,t$ e $M = C(1 + i\,t)$.` },
    { id: 'fc-05', sezione: 'semplice-composta', tipo: 'formula', fronte: R`Montante in capitalizzazione composta`, retro: R`$M = C(1 + i)^t$: ogni anno il montante si moltiplica per $1 + i$.` },
    { id: 'fc-06', sezione: 'semplice-composta', tipo: 'concetto', fronte: R`Che grafico ha il montante in funzione del tempo, nei due regimi?`, retro: R`Semplice: una retta di pendenza $C\,i$. Composto: una curva esponenziale. Si incontrano per $t = 0$ e $t = 1$.` },
    { id: 'fc-07', sezione: 'semplice-composta', tipo: 'concetto', fronte: R`Quando il regime semplice dà più del composto?`, retro: R`Per durate minori di un anno, con $0 < t < 1$. Dopo il primo anno dà di più il composto.` },
    { id: 'fc-08', sezione: 'semplice-composta', tipo: 'concetto', fronte: R`Anno per anno, che progressioni formano i montanti semplice e composto?`, retro: R`Semplice: aritmetica di differenza $C\,i$. Composto: geometrica di ragione $1 + i$.` },
    { id: 'fc-09', sezione: 'tassi-equivalenti', tipo: 'definizione', fronte: R`Quando due tassi sono equivalenti?`, retro: R`Quando danno lo stesso montante, con lo stesso capitale e nello stesso tempo.` },
    { id: 'fc-10', sezione: 'tassi-equivalenti', tipo: 'formula', fronte: R`Tasso periodale equivalente, in capitalizzazione composta`, retro: R`$i_k = (1 + i)^{\frac{1}{k}} - 1$, con $k$ periodi in un anno ($12$ per il mensile).` },
    { id: 'fc-11', sezione: 'tassi-equivalenti', tipo: 'definizione', fronte: R`Che cos'è il TAN?`, retro: R`Il tasso annuo nominale: il tasso del periodo per il numero di periodi dell'anno, $\text{TAN} = k \cdot i_k$.` },
    { id: 'fc-12', sezione: 'tassi-equivalenti', tipo: 'definizione', fronte: R`Che cos'è il TAEG?`, retro: R`Il tasso annuo effettivo globale: il costo vero di un prestito in percentuale all'anno, spese obbligatorie comprese.` },
    { id: 'fc-13', sezione: 'sconto-valore-attuale', tipo: 'definizione', fronte: R`Che cos'è il valore attuale di una somma futura?`, retro: R`Il capitale che oggi, al tasso dato, diventa quella somma alla scadenza. In regime composto $V = M(1 + i)^{-t}$.` },
    { id: 'fc-14', sezione: 'sconto-valore-attuale', tipo: 'formula', fronte: R`Sconto commerciale`, retro: R`Sconto $= M\,d\,t$ e valore attuale $V = M(1 - d\,t)$. Solo per tempi brevi.` },
    { id: 'fc-25', sezione: 'sconto-valore-attuale', tipo: 'formula', fronte: R`Sconto razionale`, retro: R`$V = \dfrac{M}{1 + i\,t}$: il capitale che a interesse semplice diventa $M$. Con la scadenza in giorni, $t = \frac{g}{360}$.` },
    { id: 'fc-15', sezione: 'sconto-valore-attuale', tipo: 'procedura', fronte: R`Come si confrontano due somme disponibili in date diverse?`, retro: R`Si portano alla stessa data, di solito oggi, e si confrontano i loro valori attuali.` },
    { id: 'fc-16', sezione: 'rendite', tipo: 'definizione', fronte: R`Rendita posticipata e rendita anticipata`, retro: R`Posticipata: ogni rata si paga alla fine del suo periodo. Anticipata: all'inizio.` },
    { id: 'fc-17', sezione: 'rendite', tipo: 'formula', fronte: R`Montante di una rendita annua posticipata`, retro: R`$M = R \cdot \dfrac{(1 + i)^n - 1}{i}$` },
    { id: 'fc-18', sezione: 'rendite', tipo: 'concetto', fronte: R`Da dove viene la formula del montante di una rendita?`, retro: R`Dalla somma di una progressione geometrica con primo termine $R$ e ragione $q = 1 + i$. Il denominatore $q - 1$ è il tasso $i$.` },
    { id: 'fc-19', sezione: 'valore-attuale-rendita', tipo: 'formula', fronte: R`Valore attuale di una rendita annua posticipata`, retro: R`$V = R \cdot \dfrac{1 - (1 + i)^{-n}}{i}$` },
    { id: 'fc-20', sezione: 'valore-attuale-rendita', tipo: 'concetto', fronte: R`Come si passa dalle formule della rendita posticipata a quelle dell'anticipata?`, retro: R`Si moltiplica per $1 + i$, sia il montante sia il valore attuale: ogni rata arriva un periodo prima.` },
    { id: 'fc-21', sezione: 'ammortamento', tipo: 'formula', fronte: R`Rata costante dell'ammortamento francese`, retro: R`$R = S \cdot \dfrac{i}{1 - (1 + i)^{-n}}$, con $S$ debito e $n$ rate posticipate.` },
    { id: 'fc-22', sezione: 'ammortamento', tipo: 'procedura', fronte: R`Come si divide una rata nel piano di ammortamento?`, retro: R`Quota interessi = debito residuo per $i$. Quota capitale = rata meno quota interessi. Nuovo debito = debito meno quota capitale.` },
    { id: 'fc-23', sezione: 'ammortamento', tipo: 'concetto', fronte: R`Ammortamento francese e italiano: che cosa è costante?`, retro: R`Nel francese la rata. Nell'italiano la quota capitale $\frac{S}{n}$, e le rate scendono.` },
    { id: 'fc-24', sezione: 'confronto', tipo: 'concetto', fronte: R`Perché le spese iniziali fanno salire il TAEG sopra il TAN?`, retro: R`Ricevi meno denaro ma restituisci le stesse rate: il costo effettivo sale, e il TAEG lo misura.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Presti $2400$ € al $3\%$ annuo, in capitalizzazione semplice, per $2$ anni. Quanti euro di interesse ricevi?`, suggerimenti: [R`Usa $I = C\,i\,t$, con $i = 0{,}03$.`], risposta: euro(144), soluzione: [R`$I = 2400 \cdot 0{,}03 \cdot 2$.`, R`$I = 144$ €.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola il montante di $1500$ € al $4\%$ annuo in capitalizzazione semplice, dopo $3$ anni.`, suggerimenti: [R`$M = C(1 + i\,t)$.`], risposta: euro(1680), soluzione: [R`$M = 1500 \cdot (1 + 0{,}04 \cdot 3) = 1500 \cdot 1{,}12$.`, R`$M = 1680$ €.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Depositi $1250$ € e dopo un anno trovi $1287{,}50$ €. Qual è il tasso annuo, in percentuale?`, suggerimenti: [R`Prima trova l'interesse, poi dividilo per il capitale.`], risposta: perc(3), soluzione: [R`L'interesse è $1287{,}50 - 1250 = 37{,}50$ €.`, R`$i = \frac{37{,}50}{1250} = 0{,}03$, cioè il $3\%$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`In capitalizzazione semplice, $2000$ € al $5\%$ annuo hanno prodotto $300$ € di interessi. Per quanti anni sono stati impiegati?`, suggerimenti: [R`Parti da $I = C\,i\,t$ e ricava $t$.`], risposta: anni(3), soluzione: [R`$t = \frac{I}{C\,i} = \frac{300}{2000 \cdot 0{,}05} = \frac{300}{100}$.`, R`$t = 3$ anni.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Calcola il montante di $2000$ € al $3\%$ annuo composto, dopo $2$ anni.`, suggerimenti: [R`$M = C(1 + i)^t$.`], risposta: euro(2121.80), soluzione: [R`$M = 2000 \cdot 1{,}03^2 = 2000 \cdot 1{,}0609$.`, R`$M = 2121{,}80$ €.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Impieghi $1200$ € al $5\%$ annuo composto per $2$ anni. Quanti euro di interessi ottieni?`, suggerimenti: [R`Calcola il montante, poi togli il capitale.`], risposta: euro(123), soluzione: [R`$M = 1200 \cdot 1{,}05^2 = 1200 \cdot 1{,}1025 = 1323$ €.`, R`$I = 1323 - 1200 = 123$ €.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola il montante di $5000$ € al $2\%$ annuo composto, dopo $3$ anni.`, suggerimenti: [R`Il fattore annuo è $1{,}02$, da elevare alla terza.`], risposta: euro(5306.04), soluzione: [R`$1{,}02^3 = 1{,}061208$.`, R`$M = 5000 \cdot 1{,}061208 = 5306{,}04$ €.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Impieghi $3000$ € al $4\%$ annuo in capitalizzazione semplice, per $6$ mesi. Quanti euro di interesse ottieni?`, suggerimenti: [R`Il tasso è annuo: il tempo va scritto in anni.`], risposta: euro(60), soluzione: [R`Sei mesi sono $t = \frac{6}{12} = 0{,}5$ anni.`, R`$I = 3000 \cdot 0{,}04 \cdot 0{,}5 = 60$ €.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Il tasso annuo composto è il $4\%$. Trova il tasso semestrale equivalente, in percentuale con due decimali.`, suggerimenti: [R`Due semestri devono rendere quanto un anno: $(1 + i_2)^2 = 1{,}04$.`], risposta: perc(1.98), soluzione: [R`$1 + i_2 = \sqrt{1{,}04} \approx 1{,}0198$.`, R`$i_2 \approx 0{,}0198$, cioè circa l'$1{,}98\%$. Non il $2\%$: quello sarebbe il tasso semplice.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Un conto rende lo $0{,}8\%$ al mese, in capitalizzazione composta. Qual è il tasso annuo equivalente, in percentuale con due decimali?`, suggerimenti: [R`In un anno il capitale si moltiplica dodici volte per $1{,}008$.`], risposta: perc(10.03), soluzione: [R`$1 + i = 1{,}008^{12} \approx 1{,}1003$.`, R`Il tasso annuo è circa il $10{,}03\%$, più di $12 \cdot 0{,}8\% = 9{,}6\%$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Un prestito ha un TAN del $9\%$, con rate mensili. Qual è il tasso mensile, in percentuale?`, suggerimenti: [R`Il TAN è dodici volte il tasso mensile.`], risposta: perc(0.75, 0.001), soluzione: [R`$i_{12} = 9 : 12$.`, R`Il tasso mensile è lo $0{,}75\%$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`A quale tasso annuo composto equivale un tasso trimestrale del $2\%$? Scrivilo in percentuale, con due decimali.`, suggerimenti: [R`Un anno contiene quattro trimestri.`], risposta: perc(8.24), soluzione: [R`$1 + i = 1{,}02^4 \approx 1{,}0824$.`, R`Il tasso annuo è circa l'$8{,}24\%$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Una cambiale da $3000$ € scade fra $72$ giorni. Calcola lo sconto commerciale, con tasso di sconto $d = 6\%$ annuo.`, suggerimenti: [R`Con i giorni si usa l'anno commerciale: $t = \frac{g}{360}$.`], risposta: euro(36), soluzione: [R`$t = \frac{72}{360} = 0{,}2$.`, R`Sconto $= 3000 \cdot 0{,}06 \cdot 0{,}2 = 36$ €.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Una fattura da $8000$ € scade fra $3$ mesi. Con lo sconto commerciale al $5\%$ annuo, quanto vale oggi?`, suggerimenti: [R`$V = M(1 - d\,t)$, con $t = \frac{3}{12}$.`], risposta: euro(7900), soluzione: [R`Lo sconto è $8000 \cdot 0{,}05 \cdot 0{,}25 = 100$ €.`, R`$V = 8000 - 100 = 7900$ €.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Fra $3$ anni riceverai $2662$ €. Al $10\%$ annuo composto, quanto vale oggi questa somma?`, suggerimenti: [R`$V = M(1 + i)^{-t}$: dividi per $1{,}1^3$.`], risposta: euro(2000), soluzione: [R`$1{,}1^3 = 1{,}331$.`, R`$V = 2662 : 1{,}331 = 2000$ €.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Versi $500$ € alla fine di ogni anno per $3$ anni, al $2\%$ composto. Calcola il montante subito dopo l'ultimo versamento.`, suggerimenti: [R`È una rendita posticipata: $M = R \cdot \frac{(1 + i)^n - 1}{i}$.`], risposta: euro(1530.20), soluzione: [R`$\frac{1{,}02^3 - 1}{0{,}02} = \frac{0{,}061208}{0{,}02} = 3{,}0604$.`, R`$M = 500 \cdot 3{,}0604 = 1530{,}20$ €.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Versi $500$ € all'inizio di ogni anno per $3$ anni, al $2\%$ composto. Calcola il montante alla fine del terzo anno.`, suggerimenti: [R`È una rendita anticipata: ogni rata frutta un anno in più.`, R`Moltiplica per $1{,}02$ il montante della posticipata.`], risposta: euro(1560.80), soluzione: [R`La posticipata darebbe $500 \cdot 3{,}0604 = 1530{,}20$ €.`, R`L'anticipata dà $1530{,}20 \cdot 1{,}02 \approx 1560{,}80$ €.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Calcola il valore attuale di $3$ rate annue posticipate da $1000$ €, al $10\%$.`, suggerimenti: [R`$V = R \cdot \frac{1 - (1 + i)^{-n}}{i}$.`], risposta: euro(2486.85), soluzione: [R`$1{,}1^{-3} \approx 0{,}751315$, quindi la frazione vale $\frac{0{,}248685}{0{,}1} \approx 2{,}48685$.`, R`$V \approx 1000 \cdot 2{,}48685 \approx 2486{,}85$ €: meno dei $3000$ € delle rate.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Un debito di $7000$ € al $3\%$ si restituisce con l'ammortamento francese. Quanto vale la quota interessi della prima rata?`, suggerimenti: [R`La quota interessi è il debito residuo per il tasso.`], risposta: euro(210), soluzione: [R`Alla prima rata il debito residuo è ancora tutto il debito.`, R`Quota interessi $= 7000 \cdot 0{,}03 = 210$ €.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Un debito di $9000$ € al $5\%$ si restituisce in $3$ anni con l'ammortamento italiano. Quanto vale la prima rata?`, suggerimenti: [R`Nell'italiano la quota capitale è sempre $\frac{S}{n}$.`, R`Alla quota capitale aggiungi gli interessi sul debito di partenza.`], risposta: euro(3450), soluzione: [R`Quota capitale: $9000 : 3 = 3000$ €. Quota interessi: $9000 \cdot 0{,}05 = 450$ €.`, R`Prima rata: $3000 + 450 = 3450$ €.`] },

    { id: 'es-01', difficolta: 2, testo: R`In quanti anni un capitale raddoppia al $4\%$ annuo composto? Confronta il risultato con la regola del $72$.`, suggerimenti: [R`Imponi $(1{,}04)^t = 2$.`, R`Passa ai logaritmi: $t = \frac{\ln 2}{\ln 1{,}04}$.`], risposta: anni(17.67, 0.035), soluzione: [R`$1{,}04^t = 2$, quindi $t = \frac{\ln 2}{\ln 1{,}04} \approx \frac{0{,}69315}{0{,}03922} \approx 17{,}67$ anni.`, R`La regola del $72$ dà $72 : 4 = 18$ anni: un errore di pochi mesi.`, R`Contando anni interi: dopo $17$ anni il fattore è $1{,}04^{17} \approx 1{,}95$, dopo $18$ è circa $2{,}03$.`] },
    { id: 'es-02', difficolta: 2, testo: R`Quanti anni servono perché $2500$ € diventino $3000$ €, al $3\%$ annuo composto?`, suggerimenti: [R`$2500 \cdot 1{,}03^t = 3000$: dividi per $2500$.`, R`Poi usa i logaritmi.`], risposta: anni(6.17, 0.01), soluzione: [R`$1{,}03^t = \frac{3000}{2500} = 1{,}2$.`, R`$t = \frac{\ln 1{,}2}{\ln 1{,}03} \approx 6{,}17$ anni, cioè circa $6$ anni e $2$ mesi.`] },
    { id: 'es-03', difficolta: 2, testo: R`In capitalizzazione composta, un capitale di $5000$ € dopo $3$ anni è diventato $5788{,}13$ €. A che tasso annuo è stato impiegato? Rispondi in percentuale.`, suggerimenti: [R`$(1 + i)^3 = \frac{5788{,}13}{5000}$.`, R`Fai la radice cubica.`], risposta: perc(5, 0.01), soluzione: [R`$(1 + i)^3 = 1{,}157626$.`, R`$1 + i = \sqrt[3]{1{,}157626} \approx 1{,}05$, quindi $i \approx 5\%$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Una finanziaria presta $1000$ € al TAN del $10\%$ e chiede di restituire $1100$ € fra un anno. Al momento del prestito trattiene però $20$ € di spese. Qual è il tasso effettivo che si paga, in percentuale?`, suggerimenti: [R`Quanto denaro ricevi davvero, oggi?`, R`Il tasso effettivo lega quello che ricevi a quello che restituisci.`], risposta: perc(12.24, 0.01), soluzione: [R`In mano arrivano $1000 - 20 = 980$ €, e fra un anno se ne restituiscono $1100$.`, R`$1 + i = \frac{1100}{980} \approx 1{,}1224$: il tasso effettivo è circa il $12{,}24\%$.`, R`È il TAEG di questo prestito: le spese lo alzano di oltre due punti rispetto al TAN.`] },
    { id: 'es-05', difficolta: 2, testo: R`Un macchinario costa $12\,000$ € in contanti, oppure $4$ rate annue posticipate da $3200$ €. Al tasso del $3\%$, conviene pagare subito o a rate?`, suggerimenti: [R`Le due somme vanno confrontate alla stessa data.`, R`Calcola il valore attuale delle rate.`], risposta: parola(['a rate', 'rate', 'le rate', 'pagare a rate', 'conviene a rate', 'conviene pagare a rate', 'con le rate', 'a rate conviene'], 'subito o a rate'), soluzione: [R`$V = 3200 \cdot \dfrac{1 - 1{,}03^{-4}}{0{,}03} \approx 3200 \cdot 3{,}717098 \approx 11\,894{,}71$ €.`, R`Oggi le rate valgono meno di $12\,000$ €: conviene pagare a rate, anche se in tutto si versano $12\,800$ €.`] },
    { id: 'es-06', difficolta: 2, testo: R`Un debito di $5000$ € al $4\%$ si restituisce con $2$ rate annue posticipate costanti. Calcola la rata e la quota interessi della seconda rata. Scrivi i due numeri separati da punto e virgola.`, suggerimenti: [R`$R = S \cdot \frac{i}{1 - (1 + i)^{-n}}$.`, R`Per la seconda quota interessi ti serve il debito residuo dopo la prima rata.`], risposta: { tipo: 'numeri', valori: [2650.98, 101.96], ordinati: true, tolleranza: 0.011, segnaposto: 'rata; interessi', simboli: [';'] }, soluzione: [R`$R = 5000 \cdot \dfrac{0{,}04}{1 - 1{,}04^{-2}} \approx 2650{,}98$ €.`, R`Primo anno: interessi $200$, quota capitale $2450{,}98$, debito residuo $2549{,}02$ €.`, R`Secondo anno: interessi $2549{,}02 \cdot 0{,}04 \approx 101{,}96$ €. La quota capitale, $2549{,}02$ €, chiude il debito.`] },
    { id: 'es-07', difficolta: 2, testo: R`Vuoi avere $10\,000$ € fra $5$ anni, versando una somma fissa alla fine di ogni mese. Il tasso mensile è lo $0{,}3\%$. Quanto devi versare ogni mese?`, suggerimenti: [R`Le rate sono mensili: $n = 60$ e $i = 0{,}003$.`, R`Ricava $R$ dalla formula del montante.`], risposta: euro(152.37), soluzione: [R`$\frac{1{,}003^{60} - 1}{0{,}003} \approx \frac{0{,}196895}{0{,}003} \approx 65{,}6316$.`, R`$R = 10\,000 : 65{,}6316 \approx 152{,}37$ € al mese.`] },
    { id: 'es-08', difficolta: 3, testo: R`Un debito di $12\,000$ € al $5\%$ si ammortizza con $4$ rate annue costanti posticipate. Quanto resta da pagare subito dopo la seconda rata?`, suggerimenti: [R`Calcola prima la rata.`, R`Il debito residuo è il valore attuale delle rate che mancano.`], risposta: euro(6292.51, 0.02), soluzione: [R`$R = 12\,000 \cdot \dfrac{0{,}05}{1 - 1{,}05^{-4}} \approx 3384{,}14$ €.`, R`Mancano due rate: $D_2 = 3384{,}14 \cdot \dfrac{1 - 1{,}05^{-2}}{0{,}05} \approx 6292{,}51$ €.`, R`Controllo col piano: $D_1 = 12\,000 - (3384{,}14 - 600) = 9215{,}86$; $D_2 = 9215{,}86 - (3384{,}14 - 460{,}79) = 6292{,}51$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Un debito di $6000$ € al $6\%$ si restituisce in $3$ rate annue. Quanti euro di interessi in più si pagano con l'ammortamento francese, rispetto all'italiano?`, suggerimenti: [R`Nel francese gli interessi totali sono la somma delle rate meno il debito.`, R`Nell'italiano la quota capitale è $2000$ € all'anno: calcola gli interessi anno per anno.`], risposta: euro(13.98, 0.02), soluzione: [R`Francese: $R = 6000 \cdot \dfrac{0{,}06}{1 - 1{,}06^{-3}} \approx 2244{,}66$ €. Interessi: $3 \cdot 2244{,}66 - 6000 = 733{,}98$ €.`, R`Italiano: debito residuo $6000$, $4000$, $2000$. Interessi: $360 + 240 + 120 = 720$ €.`, R`Differenza: $733{,}98 - 720 = 13{,}98$ €. Nel francese il debito scende più piano all'inizio, e produce più interessi.`] },
    { id: 'es-10', difficolta: 2, testo: R`Un affitto di $600$ € si paga all'inizio di ogni mese, per un anno. Al tasso mensile dello $0{,}5\%$, quanto vale oggi l'intero anno di affitto?`, suggerimenti: [R`È una rendita anticipata di $12$ rate mensili.`, R`$V = R(1 + i) \cdot \frac{1 - (1 + i)^{-n}}{i}$.`], risposta: euro(7006.22, 0.02), soluzione: [R`$\frac{1 - 1{,}005^{-12}}{0{,}005} \approx 11{,}618932$.`, R`$V = 600 \cdot 1{,}005 \cdot 11{,}618932 \approx 7006{,}22$ €, contro $7200$ € di rate.`] },
    { id: 'es-13', difficolta: 2, testo: R`Una somma di $2060$ € scade fra $6$ mesi. Calcola il suo valore attuale con lo sconto razionale al $6\%$ annuo, e confrontalo con lo sconto commerciale allo stesso tasso.`, suggerimenti: [R`$V = \frac{M}{1 + i\,t}$, con $t = 0{,}5$.`], risposta: euro(2000), soluzione: [R`$V = \frac{2060}{1 + 0{,}06 \cdot 0{,}5} = \frac{2060}{1{,}03} = 2000$ €: lo sconto razionale è di $60$ €.`, R`Col commerciale: $2060 \cdot (1 - 0{,}03) = 1998{,}20$ €. Lo sconto commerciale, $61{,}80$ €, è più alto.`] },
    { id: 'es-11', difficolta: 2, testo: R`Con lo sconto commerciale al tasso $d = 8\%$ annuo, dopo quanti anni il valore attuale di una somma diventerebbe zero? Che cosa dice questo risultato?`, suggerimenti: [R`Imponi $1 - d\,t = 0$.`], risposta: anni(12.5), soluzione: [R`$1 - 0{,}08\,t = 0$ per $t = \frac{1}{0{,}08} = 12{,}5$ anni.`, R`Oltre quella durata il valore attuale verrebbe negativo: un assurdo. Lo sconto commerciale ha senso solo per scadenze brevi.`] },
    { id: 'es-12', difficolta: 3, testo: R`Versi $200$ € alla fine di ogni trimestre per $3$ anni. Il tasso annuo composto è il $4\%$. Calcola il montante subito dopo l'ultimo versamento.`, suggerimenti: [R`Ti serve il tasso trimestrale equivalente: $i_4 = 1{,}04^{\frac{1}{4}} - 1$.`, R`Le rate sono $12$, e $(1 + i_4)^{12} = 1{,}04^3$.`], risposta: euro(2534.43, 0.15), soluzione: [R`$i_4 = 1{,}04^{\frac{1}{4}} - 1 \approx 0{,}0098534$.`, R`$(1 + i_4)^{12} = 1{,}04^3 = 1{,}124864$.`, R`$M = 200 \cdot \dfrac{0{,}124864}{0{,}0098534} \approx 2534{,}43$ €, contro $2400$ € versati.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`In matematica finanziaria, il montante è…`, opzioni: [R`l'interesse che si riceve ogni anno`, R`la somma di capitale e interessi`, R`il capitale diviso per il tempo`, R`il tasso espresso in euro`], corretta: 1, spiegazione: R`Il montante è la somma che si ha alla fine: $M = C + I$. L'interesse di un anno è solo una parte di questa somma. Il tasso è un numero puro, non una somma in euro.` },
    { id: 'q-02', domanda: R`Che cosa rappresenta la lettera $i$ nella formula $M = C(1 + i)^t$?`, opzioni: [R`l'unità immaginaria, con $i^2 = -1$`, R`il numero di anni dell'impiego`, R`il tasso, in forma decimale`, R`l'interesse prodotto, in euro`], corretta: 2, spiegazione: R`Qui $i$ è il tasso: per il $5\%$ vale $0{,}05$. Non ha niente a che fare con i numeri complessi. Gli anni sono $t$, l'interesse in euro è $I$.` },
    { id: 'q-03', domanda: R`In capitalizzazione semplice, il grafico del montante in funzione del tempo è…`, opzioni: [R`una retta`, R`una parabola`, R`una curva esponenziale`, R`un ramo di iperbole`], corretta: 0, spiegazione: R`$M = C + C\,i\,t$ è di primo grado in $t$: una retta di pendenza $C\,i$. La curva esponenziale è quella del regime composto.` },
    { id: 'q-04', domanda: R`Stesso capitale e stesso tasso annuo, per $3$ anni. Quale regime dà il montante più alto?`, opzioni: [R`il semplice`, R`danno lo stesso montante`, R`dipende dal capitale`, R`il composto`], corretta: 3, spiegazione: R`Dopo il primo anno il composto calcola gli interessi anche sugli interessi, quindi dà di più. Il capitale non c'entra: compare come fattore in tutte e due le formule.` },
    { id: 'q-05', domanda: R`Stesso capitale e stesso tasso annuo, per $6$ mesi. Che cosa succede?`, opzioni: [R`il composto dà un montante più alto`, R`il semplice dà un montante più alto`, R`danno lo stesso montante`, R`il composto non si può usare sotto l'anno`], corretta: 1, spiegazione: R`Per $0 < t < 1$ vale $(1 + i)^t < 1 + i\,t$: la retta sta sopra la curva. Il composto si può usare anche con $t$ non intero, ma sotto l'anno dà meno.` },
    { id: 'q-06', domanda: R`Un conto paga lo $0{,}5\%$ al mese, con interessi composti. Il tasso annuo equivalente è…`, opzioni: [R`esattamente il $6\%$`, R`il $5{,}5\%$`, R`un po' più del $6\%$`, R`un po' meno del $6\%$`], corretta: 2, spiegazione: R`$1{,}005^{12} \approx 1{,}0617$: circa il $6{,}17\%$. Il $6\%$ esatto è il TAN, che non conta gli interessi sugli interessi dei mesi.` },
    { id: 'q-07', domanda: R`Che differenza c'è fra TAN e TAEG?`, opzioni: [R`il TAN conta le spese, il TAEG solo gli interessi`, R`sono lo stesso tasso, scritto in due modi`, R`il TAEG si usa solo per i mutui per la casa`, R`il TAEG conta anche le spese, il TAN no`], corretta: 3, spiegazione: R`Il TAN è un tasso nominale: il tasso del periodo per il numero di periodi. Il TAEG è effettivo e comprende le spese obbligatorie. Vale per ogni prestito ai consumatori, non solo per i mutui.` },
    { id: 'q-08', domanda: R`Con un tasso positivo, il valore attuale di una somma che arriverà fra qualche anno è…`, opzioni: [R`minore della somma`, R`maggiore della somma`, R`uguale alla somma`, R`sempre la metà della somma`], corretta: 0, spiegazione: R`$V = M(1 + i)^{-t}$ e $(1 + i)^{-t} < 1$: una somma futura oggi vale meno. Di quanto meno dipende da tasso e tempo, non è sempre la metà.` },
    { id: 'q-09', domanda: R`Perché lo sconto commerciale si usa solo per scadenze brevi?`, opzioni: [R`perché su tempi lunghi dà valori attuali troppo alti`, R`perché su tempi lunghi il valore attuale si annulla`, R`perché la legge lo vieta oltre i tre mesi`, R`perché su tempi lunghi coincide con quello composto`], corretta: 1, spiegazione: R`$V = M(1 - d\,t)$ si annulla per $t = \frac{1}{d}$, e poi diventa negativo. Su tempi brevi, invece, è vicino allo sconto composto ed è più semplice da calcolare.` },
    { id: 'q-10', domanda: R`Una rendita si dice posticipata quando…`, opzioni: [R`le rate crescono di anno in anno`, R`la prima rata si paga subito, oggi`, R`ogni rata si paga a fine periodo`, R`il tasso cambia da un anno all'altro`], corretta: 2, spiegazione: R`Posticipata vuol dire «dopo»: alla fine di ogni periodo. Se la prima rata si paga oggi, all'inizio del periodo, la rendita è anticipata.` },
    { id: 'q-11', domanda: R`Il montante di $n$ rate da $R$ euro, con tasso $i > 0$, rispetto a $n \cdot R$ è…`, opzioni: [R`minore`, R`uguale`, R`uguale, ma solo se la rendita è anticipata`, R`maggiore`], corretta: 3, spiegazione: R`Ogni rata, tranne al massimo l'ultima, frutta interessi fino alla fine. Quindi il montante supera la somma dei versamenti, sia nella rendita posticipata sia nell'anticipata.` },
    { id: 'q-12', domanda: R`La formula del montante di una rendita nasce dalla somma di…`, opzioni: [R`una progressione geometrica di ragione $1 + i$`, R`una progressione aritmetica con differenza uguale a $i$`, R`una progressione geometrica di ragione $i$`, R`una serie geometrica con infiniti termini`], corretta: 0, spiegazione: R`Le rate valgono alla fine $R$, $R(1 + i)$, $R(1 + i)^2$, …: ogni termine è il precedente per $1 + i$. I termini sono $n$, quindi la somma è finita.` },
    { id: 'q-13', domanda: R`Nell'ammortamento francese, anno dopo anno…`, opzioni: [R`la rata cala e gli interessi restano uguali`, R`la quota capitale cala e la quota interessi cresce`, R`la quota interessi cala e la quota capitale cresce`, R`rata, interessi e quota capitale restano uguali`], corretta: 2, spiegazione: R`Gli interessi si calcolano sul debito residuo, che scende: quindi calano. La rata è costante, quindi la quota capitale cresce di quanto calano gli interessi.` },
    { id: 'q-14', domanda: R`Nell'ammortamento italiano, che cosa resta costante?`, opzioni: [R`la rata`, R`la quota capitale`, R`la quota interessi`, R`il debito residuo`], corretta: 1, spiegazione: R`Ogni anno si restituisce la stessa parte del debito, $\frac{S}{n}$. Gli interessi calano con il debito, quindi calano anche le rate. La rata costante è quella del francese.` },
    { id: 'q-15', domanda: R`Un debito si estingue con rate posticipate costanti. Il debito iniziale è uguale…`, opzioni: [R`al montante delle rate`, R`alla somma delle rate`, R`alla somma delle quote interessi`, R`al valore attuale delle rate`], corretta: 3, spiegazione: R`Il debito si riceve oggi, le rate arrivano dopo: si confrontano alla stessa data, oggi. La somma delle rate è più alta del debito, perché contiene gli interessi.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Nei conti il tasso va in forma decimale: il $3\%$ è $0{,}03$, non $3$.` },
    { tipo: 'errore', testo: R`Tasso e tempo devono usare la stessa unità. Con un tasso annuo, $9$ mesi sono $t = 0{,}75$.` },
    { tipo: 'trucco', testo: R`Controllo rapido: dopo il primo anno il composto dà più del semplice. Se per $t = 5$ ti viene il contrario, c'è un errore.` },
    { tipo: 'errore', testo: R`Il tasso mensile equivalente al $6\%$ annuo non è lo $0{,}5\%$. Lo $0{,}5\%$ è il tasso di un TAN del $6\%$, e rende un po' di più.` },
    { tipo: 'metodo', testo: R`Per confrontare somme in date diverse portale tutte alla stessa data, di solito oggi, con il valore attuale.` },
    { tipo: 'metodo', testo: R`Prima di usare le formule delle rendite chiediti: le rate sono a inizio o a fine periodo? L'anticipata vale la posticipata per $1 + i$.` },
    { tipo: 'trucco', testo: R`Nel piano di ammortamento le quote capitale sommano il debito. L'ultima quota capitale è uguale al debito residuo dopo la penultima rata.` },
    { tipo: 'trucco', testo: R`Regola del $72$: al $p\%$ composto, un capitale raddoppia in circa $72 : p$ anni. Al $6\%$, in circa $12$ anni.` }
  ],

  aneddoti: [
    { matematico: 'Luca Pacioli', anni: '1445 circa–1517', titolo: 'La regola del 72 in un libro del 1494', testo: R`Luca Pacioli era un frate francescano di Sansepolcro, in Toscana. Insegnò matematica in molte città italiane e fu amico di Leonardo da Vinci. Nel 1494 stampò a Venezia la *Summa de arithmetica, geometria, proportioni et proportionalità*. Era un'enciclopedia della matematica del tempo, scritta in volgare e pensata anche per i mercanti. Una parte spiegava la **partita doppia**, il metodo di contabilità che le aziende usano ancora oggi. Fra i problemi di interessi c'è una regola data senza dimostrazione. Per sapere in quanti anni un capitale raddoppia, dividi $72$ per il tasso. Pacioli fa l'esempio del $6\%$: $72 : 6 = 12$ anni. Il conto esatto dà $1{,}06^{12} \approx 2{,}01$. Da dove venisse la regola, Pacioli non lo dice: forse era un trucco già noto ai mercanti.`, legame: R`La regola del $72$ stima il tempo di raddoppio in capitalizzazione composta, che con i logaritmi vale $t = \frac{\ln 2}{\ln(1 + i)}$.` },

    { matematico: 'Simon Stevin', anni: '1548 circa–1620', titolo: 'Le tavole degli interessi diventano pubbliche', testo: R`Simon Stevin era nato a Bruges e da giovane lavorò ad Anversa come contabile e cassiere. Nel 1582 pubblicò le *Tafelen van Interest*, le «Tavole degli interessi». Erano pagine di numeri già calcolati, per molti tassi e molte durate. Dicevano quanto vale oggi una somma che arriverà fra un certo numero di anni. Con quelle tavole chiunque poteva trovare il valore attuale di un prestito o di una rendita, senza lunghi conti. Tavole simili esistevano già: le aveva scritte il mercante fiorentino Pegolotti verso il 1340, e Jean Trenchant a Lione nel 1558. Si dice però che chi le aveva, come i banchieri, le tenesse per sé. Stevin le pubblicò con le regole per usarle. Tre anni dopo uscì un altro suo libretto, *De Thiende*, che insegnava a tutti a calcolare con i numeri decimali.`, legame: R`Le tavole di Stevin contenevano i fattori di attualizzazione $(1 + i)^{-t}$ di questo argomento, già moltiplicati e pronti all'uso.` },

    { matematico: 'Johan de Witt', anni: '1625–1672', titolo: 'Il capo del governo che calcolò le rendite', testo: R`Johan de Witt guidò la politica dell'Olanda per quasi vent'anni, con il titolo di Gran Pensionario. Da giovane aveva scritto un trattato sulle coniche. L'Olanda finanziava le sue guerre vendendo **rendite vitalizie**. Si pagava una somma allo Stato, e lo Stato versava una rata ogni anno, finché si era vivi. Nel 1671 de Witt presentò agli Stati d'Olanda un breve scritto sul giusto prezzo di queste rendite. Calcolò il valore attuale di ogni rata e lo pesò con la probabilità che la persona fosse ancora viva. Concluse che lo Stato le vendeva a un prezzo troppo basso. L'anno dopo, il 1672, l'Olanda fu invasa dalla Francia. De Witt e il fratello Cornelis furono uccisi da una folla all'Aia.`, legame: R`Una rendita vitalizia è una rendita come quelle di questo argomento, con una differenza: ogni rata conta solo se chi la riceve è ancora vivo.` },

    { matematico: 'Richard Price', anni: '1723–1791', titolo: 'Il penny prestato alla nascita di Cristo', testo: R`Richard Price era un pastore gallese, filosofo e matematico. Si occupava di assicurazioni sulla vita e di tavole di mortalità. Nel 1772 scrisse un opuscolo sul debito pubblico inglese, con un esempio rimasto famoso. Un penny prestato al $5\%$ composto alla nascita di Cristo sarebbe diventato una montagna d'oro. Secondo il suo conto, più oro di quanto ne servirebbe per milioni di pianeti grandi come la Terra. Allo stesso tasso, ma con l'interesse semplice, sarebbe arrivato a pochi scellini. Price voleva convincere il governo a mettere da parte ogni anno una somma fissa, lasciandola crescere a interesse composto, per ripagare il debito. L'idea piacque al primo ministro William Pitt, che nel 1786 creò un fondo di questo tipo.`, legame: R`Il suo esempio confronta i due regimi su un tempo lunghissimo: la retta del semplice e l'esponenziale del composto.` }
  ]
});
})();
