(function () {
const R = String.raw;
/* risposte dell'allenamento: un numero (anche frazione o percentuale: «2,28%» vale 0,0228) */
const val = (v, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol == null ? 0.01 : tol, segnaposto: 'un numero', simboli: ['−', '/', '√'] });
const pr = (v, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol == null ? 0.001 : tol, segnaposto: 'es. 0,05 o 5%', simboli: ['%', '−'] });
/* grafici: una barra come poligono; l'altezza può essere un'espressione con i parametri */
const barra = (x, h, larg, colore) => ({ tipo: 'poligono', riempi: true, colore: colore || 1, punti: [[x - larg / 2, 0], [x + larg / 2, 0], [x + larg / 2, h], [x - larg / 2, h]] });
/* «vale 1 solo quando il parametro intero vale k, altrimenti 0»: max(0, 1 − |par − k|) */
const solo = (par, k) => 'max(0, 1 - abs(' + par + ' - ' + k + '))';
/* Φ(a) come espressione: formula 7.1.26 di Abramowitz e Stegun per erf (errore < 2·10⁻⁷, controllato con node) */
const phiE = a => '(0.5 + sign(' + a + ')*(0.5 - 0.5*exp(-(' + a + ')^2/2)*(1/(1 + 0.3275911*abs(' + a + ')/1.4142135624))*(0.254829592 + (1/(1 + 0.3275911*abs(' + a + ')/1.4142135624))*(-0.284496736 + (1/(1 + 0.3275911*abs(' + a + ')/1.4142135624))*(1.421413741 + (1/(1 + 0.3275911*abs(' + a + ')/1.4142135624))*(-1.453152027 + (1/(1 + 0.3275911*abs(' + a + ')/1.4142135624))*1.061405429))))))';
const DENS = 'exp(-x^2/2)/sqrt(2*pi)';
/* l'asse z disegnato a mano, con le tacche da −3 a 3 */
const ASSE_Z = L => [{ tipo: 'segmento', da: [-L, 0], a: [L, 0] }].concat([-3, -2, -1, 0, 1, 2, 3].map(k => ({ tipo: 'testo', p: [k, -0.035], testo: k < 0 ? '−' + (-k) : String(k) })));
/* z dal livello di confidenza c (in %): formula 26.2.23 di Abramowitz e Stegun, più un passo di Newton con phiE.
   Controllato con node su c = 50; 50,5; …; 99,5: errore < 10⁻⁵, terza cifra decimale sempre giusta. */
const TC = 'sqrt(-2*ln((1 - c/100)/2))';
const Z0C = '(' + TC + ' - (2.515517 + 0.802853*' + TC + ' + 0.010328*' + TC + '^2)/(1 + 1.432788*' + TC + ' + 0.189269*' + TC + '^2 + 0.001308*' + TC + '^3))';
const ZC = '(' + Z0C + ' - (' + phiE(Z0C) + ' - (1 + c/100)/2)*sqrt(2*pi)*exp((' + Z0C + ')^2/2))';
/* z scritto con tre decimali, cifra per cifra (le etichette arrotondano a due) */
const MZ = 'round(1000*' + ZC + ')', FZ = '(' + MZ + ' - 1000*floor(' + MZ + '/1000))';
const Z3 = '{{floor(' + MZ + '/1000)}},{{floor(' + FZ + '/100)}}{{floor(' + FZ + '/10) - 10*floor(' + FZ + '/100)}}{{' + FZ + ' - 10*floor(' + FZ + '/10)}}';
/* la media di n dadi (n = 1…4): distribuzione esatta della somma, per convoluzione */
const dadi = n => { let d = [1]; for (let i = 0; i < n; i++) { const nd = new Array(d.length + 6).fill(0); d.forEach((v, s) => { for (let f = 1; f <= 6; f++) nd[s + f] += v / 6; }); d = nd; } return d; };
const BARRE_DADI = [];
[1, 2, 3, 4].forEach(n => { const d = dadi(n); for (let s = n; s <= 6 * n; s++) BARRE_DADI.push(barra(s / n, (d[s] * n).toFixed(6) + '*' + solo('n', n), 1 / n)); });
/* la binomiale del video: 100 lanci di una moneta onesta */
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
const PK = []; for (let k = 0; k <= 100; k++) PK.push(binom(100, k) / Math.pow(2, 100));
const coda = k0 => { let s = 0; for (let k = k0; k <= 100; k++) s += PK[k]; return s; };
const CODA_K = []; for (let k = 50; k <= 70; k++) CODA_K.push(coda(k).toFixed(7) + '*' + solo('K', k));
const BARRE_MONETA = [];
for (let k = 30; k <= 70; k++) {
  const h = PK[k].toFixed(6);
  BARRE_MONETA.push(barra(k, h + '*max(0, min(1, K - ' + k + '))', 0.8, 1));
  BARRE_MONETA.push(barra(k, h + '*max(0, min(1, ' + (k + 1) + ' - K))', 0.8, 2));
}

COMPASSO.registra({
  id: 'statistica-inferenziale',
  titolo: 'Statistica inferenziale',

  introduzione: R`Prima delle elezioni un istituto intervista mille persone e annuncia: «il partito A ha il $32\%$». Gli elettori sono milioni, e nessuno li ha contati tutti. Come si passa da mille risposte a una frase su tutto il Paese? E quanto ci si può fidare?

La **statistica inferenziale** risponde a queste domande. Si osserva una parte, il **campione**, e si dice qualcosa sul tutto, la **popolazione**. Il campione è scelto a caso, quindi entra in gioco la probabilità. Così si può dire anche quanto si rischia di sbagliare. Sondaggi, controlli di qualità e prove sui farmaci funzionano tutti così.

Ti servono la statistica descrittiva e le variabili aleatorie, soprattutto la normale e la tavola di $\Phi$. Qui le usi per due lavori: **stimare** un valore che non conosci e **mettere alla prova** un'ipotesi.`,

  inBreve: [
    R`Il campione si sceglie **a caso**: solo così la probabilità dice quanto può sbagliare una stima.`,
    R`La proporzione $\hat{p}$ e la media $\bar{x}$ di un campione cambiano da un campione all'altro. La loro deviazione standard si chiama **errore standard**: $\sqrt{\frac{p(1-p)}{n}}$ e $\frac{\sigma}{\sqrt{n}}$.`,
    R`Per il teorema del limite centrale, con campioni grandi $\bar{x}$ e $\hat{p}$ hanno una distribuzione quasi normale.`,
    R`L'intervallo di confidenza al $95\%$ è la stima più o meno $1{,}96$ errori standard. Il $95\%$ è del metodo: su $100$ campioni, circa $95$ intervalli prendono il valore vero.`,
    R`Per dimezzare il margine d'errore serve un campione quattro volte più grande.`,
    R`In un test si suppone vera l'ipotesi nulla $H_0$. Se il risultato osservato, con $H_0$ vera, è più raro della soglia $\alpha$, $H_0$ si rifiuta.`
  ],

  sezioni: [
    { id: 'popolazione-campione', titolo: 'Popolazione e campione', testo: R`Un liceo ha $1200$ studenti. Il preside vuole sapere quanti vengono a scuola in bus. Chiedere a tutti richiede troppo tempo. Allora ne sceglie $100$ e chiede solo a loro.

>* La **popolazione** è l'insieme di tutti gli elementi che interessano. Un **campione** è la parte della popolazione che si osserva davvero. Il numero $n$ dei suoi elementi è la **dimensione** del campione.

Qui la popolazione sono i $1200$ studenti, il campione i $100$ intervistati, e $n = 100$.

### Parametri e stime

Un numero che descrive la popolazione si chiama **parametro**. È fisso, ma di solito non lo conosci. Un numero calcolato sul campione si chiama **statistica**. Lo conosci, ma cambia se cambi campione.

| | popolazione (parametro) | campione (statistica) |
|---|---|---|
| proporzione | $p$ | $\hat{p}$ |
| media | $\mu$ | $\bar{x}$ |

Se $38$ intervistati su $100$ vengono in bus, $\hat{p} = 0{,}38$. Si legge «p cappello». La proporzione vera $p$, fra tutti i $1200$, resta ignota.

### Il campionamento casuale

Il campione deve somigliare alla popolazione. Il modo più sicuro è sceglierlo **a caso**.

>* Un campione è **casuale semplice** se ogni elemento della popolazione ha la stessa probabilità di entrarci. Inoltre le scelte sono indipendenti.

Per esempio il preside estrae a sorte $100$ numeri del registro, come in una tombola.

>! Un campione «di comodo» non è casuale. Se il preside intervista chi aspetta alla fermata, trova quasi solo chi prende il bus. Il campione è **distorto**, e nessuna formula lo raddrizza.

?? Un sito chiede ai lettori di votare online: la benzina costa troppo? È un campione casuale?
[ ] Sì, perché chiunque può votare.
[ ] Sì, se i voti sono più di mille.
[x] No, perché vota solo chi ha voglia di farlo.
=> Votano i lettori di quel sito, e fra loro soprattutto chi ha un'opinione forte. Non tutti hanno la stessa probabilità di entrare nel campione. Tanti voti non correggono una distorsione.

> In questo argomento la popolazione è molto più grande del campione. Così le estrazioni si possono considerare indipendenti, anche senza rimettere dentro gli elementi già scelti.

Solo su un campione casuale la probabilità dice quanto può sbagliare una stima. È il lavoro della statistica inferenziale.` },

    { id: 'proporzione-campionaria', titolo: 'La distribuzione della proporzione campionaria', testo: R`Un'urna contiene tantissime palline, e il $40\%$ è rosso: $p = 0{,}4$. Estrai $25$ palline a caso. Le rosse sono $11$, quindi $\hat{p} = \dfrac{11}{25} = 0{,}44$. Un altro campione ne ha $8$, e $\hat{p} = 0{,}32$. Ogni campione sbaglia un po', ognuno a modo suo.

[[video:statistica-inferenziale/campioni]]

$\hat{p}$ è una variabile aleatoria: dipende da quali palline escono. Il numero $X$ di rosse è binomiale, con $n$ prove e probabilità $p$. E $\hat{p} = \dfrac{X}{n}$.

~ E(\hat{p}) = \dfrac{E(X)}{n} = \dfrac{np}{n} = \evid{p} :: dividere per $n$ divide anche la media
~ \text{Var}(\hat{p}) = \dfrac{\text{Var}(X)}{n^2} = \dfrac{np(1-p)}{n^2} :: il fattore $\frac{1}{n}$ entra al quadrato nella varianza
~ = \dfrac{p(1-p)}{n} :: si semplifica una $n$
~ \sigma_{\hat{p}} = \evidb{\sqrt{\dfrac{p(1-p)}{n}}} :: la deviazione standard è la radice della varianza

>* La **distribuzione campionaria** di $\hat{p}$ ha media $p$ e deviazione standard $$\sigma_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}}$$ Questa deviazione standard si chiama **errore standard** della proporzione. Se $np \ge 5$ e $n(1-p) \ge 5$, la distribuzione è quasi normale.

Media $p$ vuol dire che $\hat{p}$ non sbaglia sempre dalla stessa parte. A volte sta sopra $p$, a volte sotto, ma in media è giusto.

Per l'urna, con $n = 25$: $\sigma_{\hat{p}} = \sqrt{\dfrac{0{,}4 \cdot 0{,}6}{25}} \approx 0{,}098$. Per la regola del $95\%$, circa $95$ campioni su $100$ cadono entro $2\sigma \approx 0{,}2$ da $0{,}4$. Cioè fra $0{,}2$ e $0{,}6$: un campione di $25$ è poco preciso.

[[grafico:campionaria]]

Con $n = 100$ l'errore standard è $0{,}049$, con $n = 400$ è $0{,}0245$. La $n$ sta sotto radice: per dimezzare l'errore standard serve un campione **quattro volte** più grande.

?? Con $p = 0{,}2$ e $n = 100$, quanto vale l'errore standard di $\hat{p}$?
[ ] $0{,}0016$
[x] $0{,}04$
[ ] $0{,}16$
=> $\sqrt{\dfrac{0{,}2 \cdot 0{,}8}{100}} = \sqrt{0{,}0016} = 0{,}04$. $0{,}0016$ è la varianza: manca la radice. $0{,}16$ è $p(1-p)$, senza dividere per $n$.

>! La dimensione della popolazione non entra nella formula: conta solo $n$. Mille intervistati a caso danno la stessa precisione in una città e in una nazione intera.` },

    { id: 'media-campionaria', titolo: 'La media campionaria e il limite centrale', testo: R`In una fabbrica il peso delle confezioni di pasta è normale. La media è $500$ g, la deviazione standard $4$ g. Un controllore ne pesa $16$ e calcola la media $\bar{x}$. Anche $\bar{x}$ cambia da un campione all'altro. Però oscilla meno del peso di una confezione sola: i pesi alti e quelli bassi si compensano.

~ \bar{x} = \dfrac{X_1 + X_2 + \dots + X_n}{n} :: la somma dei pesi, divisa per $n$
~ \text{Var}(X_1 + \dots + X_n) = n\sigma^2 :: i pesi sono indipendenti: le varianze si sommano
~ \text{Var}(\bar{x}) = \dfrac{n\sigma^2}{n^2} = \dfrac{\sigma^2}{n} :: dividere per $n$ divide la varianza per $n^2$
~ \sigma_{\bar{x}} = \evidb{\dfrac{\sigma}{\sqrt{n}}} :: la deviazione standard è la radice

>* La popolazione ha media $\mu$ e deviazione standard $\sigma$. Allora la media $\bar{x}$ di un campione casuale di $n$ elementi ha $$E(\bar{x}) = \mu \qquad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}$$ Anche $\sigma_{\bar{x}}$ si chiama **errore standard**: è l'errore standard della media.

Per la pasta $\sigma_{\bar{x}} = \dfrac{4}{\sqrt{16}} = 1$ g. Una confezione sola si allontana dalla media di circa $4$ g. Una media di $16$ confezioni, di circa $1$ g.

### Il teorema del limite centrale

Che forma ha la distribuzione di $\bar{x}$? Lancia un dado: ogni faccia ha probabilità $\dfrac{1}{6}$, e l'istogramma è piatto. Ora lancia due dadi e fai la media dei punteggi: i valori centrali escono più spesso. Con quattro dadi l'istogramma ha già la forma di una campana.

[[grafico:mediaDadi]]

>* **Teorema del limite centrale.** Se $n$ è abbastanza grande, $\bar{x}$ ha una distribuzione quasi normale, con media $\mu$ e deviazione standard $\dfrac{\sigma}{\sqrt{n}}$. Vale qualunque sia la forma della popolazione. In pratica basta $n \ge 30$. Se la popolazione è già normale, $\bar{x}$ è normale per ogni $n$.

Lo mostra anche la macchina di Galton dell'argomento «Variabili aleatorie». Ogni pallina somma tanti piccoli passi a caso, a destra o a sinistra. E le palline si ammucchiano a campana.

> Anche $\hat{p}$ è una media: la media di tanti $1$ (pallina rossa) e $0$ (pallina non rossa). Per questo, con $n$ grande, anche $\hat{p}$ diventa normale.

Il peso è normale, quindi anche $\bar{x}$ lo è. Qual è la probabilità che la media di $16$ confezioni stia sotto $498$ g?

~ \sigma_{\bar{x}} = \dfrac{4}{\sqrt{16}} = 1 :: l'errore standard della media, in grammi
~ z = \dfrac{498 - 500}{1} = -2 :: si standardizza con l'errore standard, non con $\sigma$
~ P(\bar{x} < 498) = \Phi(-2) = 1 - 0{,}9772 :: la tavola e la simmetria
~ = \evidb{0{,}0228} :: circa $2$ controlli su $100$

>! Per una confezione sola $z = \dfrac{498 - 500}{4} = -0{,}5$, e $P(X < 498) \approx 0{,}31$. Quando parli di una media, dividi per $\sigma_{\bar{x}}$, non per $\sigma$.` },

    { id: 'intervallo-proporzione', titolo: 'Stima puntuale e intervallo di confidenza', testo: R`Un sondaggio intervista $n = 400$ persone a caso, e $208$ dicono sì. Nel campione $\hat{p} = \dfrac{208}{400} = 0{,}52$. Il valore vero $p$, fra tutti, non lo conosciamo.

>* Una **stima puntuale** è un solo numero, calcolato sul campione, che prende il posto del parametro. $\hat{p}$ stima $p$, e $\bar{x}$ stima $\mu$.

Il $52\%$ è la stima migliore, ma quasi certamente non è il valore esatto. Un altro campione darebbe un altro numero. Allora conviene dare una **forchetta**: un intervallo che, con buona fiducia, contiene $p$.

[[video:statistica-inferenziale/intervallo]]

### Da dove viene 1,96

Nella normale standard il $95\%$ dell'area sta fra $-1{,}96$ e $1{,}96$. Infatti $\Phi(1{,}96) = 0{,}975$, e su ogni lato resta il $2{,}5\%$. Quindi in $95$ campioni su $100$ la stima $\hat{p}$ dista da $p$ meno di $1{,}96$ errori standard.

[[grafico:areaCentrale]]

>* **Intervallo di confidenza al 95% per una proporzione:** $$\hat{p} \pm 1{,}96\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$ Il numero dopo il $\pm$ è il **margine d'errore**. Si usa se $n\hat{p} \ge 5$ e $n(1-\hat{p}) \ge 5$.

$p$ non si conosce, quindi nell'errore standard si mette la stima $\hat{p}$. È lo stesso errore standard della proporzione campionaria, calcolato con la stima.

~ \sqrt{\dfrac{0{,}52 \cdot 0{,}48}{400}} \approx \evid{0{,}025} :: l'errore standard, con $\hat{p}$ al posto di $p$
~ 1{,}96 \cdot 0{,}025 \approx 0{,}049 :: il margine d'errore, cioè $4{,}9\%$
~ 0{,}52 \pm 0{,}049 :: la stima puntuale, più o meno il margine
~ \evidb{\Icc{0{,}471}{0{,}569}} :: la forchetta: dal $47{,}1\%$ al $56{,}9\%$

### Che cosa vuol dire «al 95%»

Il valore vero $p$ è fisso: o sta nella forchetta, o no. A cambiare da un campione all'altro è la forchetta. Il $95\%$ dice quanto è affidabile il **metodo**. Su tanti sondaggi, circa $95$ forchette su $100$ prendono il valore vero.

>! Non si dice «$p$ sta nell'intervallo con probabilità $95\%$»: $p$ non è aleatorio. Si dice «al livello di confidenza del $95\%$». Vuol dire che il metodo sbaglia circa una volta su venti.

?? La forchetta del sondaggio va dal $47{,}1\%$ al $56{,}9\%$. Si può dire che il sì vincerà?
[ ] Sì, perché il $52\%$ supera il $50\%$.
[x] No, perché anche valori sotto il $50\%$ stanno nella forchetta.
[ ] Sì, con probabilità del $95\%$.
=> La forchetta contiene valori sopra e sotto il $50\%$: i dati non escludono una vittoria del no. Il $52\%$ è solo la stima puntuale. E il $95\%$ parla del metodo, non della vittoria del sì.` },

    { id: 'intervallo-media', titolo: 'L\'intervallo di confidenza per la media', testo: R`Un corriere vuole stimare il tempo medio $\mu$ di una consegna. Dai dati degli anni passati sa che la deviazione standard è $\sigma = 8$ minuti. Controlla $64$ consegne scelte a caso, e la media è $\bar{x} = 42$ minuti.

Il ragionamento è lo stesso della proporzione. $\bar{x}$ è quasi normale, con media $\mu$ ed errore standard $\dfrac{\sigma}{\sqrt{n}}$. In $95$ campioni su $100$ dista da $\mu$ meno di $1{,}96$ errori standard.

>* **Intervallo di confidenza al 95% per la media**, con $\sigma$ nota: $$\bar{x} \pm 1{,}96\,\frac{\sigma}{\sqrt{n}}$$ Vale se la popolazione è normale, oppure se $n \ge 30$.

~ \dfrac{\sigma}{\sqrt{n}} = \dfrac{8}{\sqrt{64}} = 1 :: l'errore standard: un minuto
~ 1{,}96 \cdot 1 = 1{,}96 :: il margine d'errore
~ 42 \pm 1{,}96 :: la stima puntuale, più o meno il margine
~ \evidb{\Icc{40{,}04}{43{,}96}} :: il tempo medio sta fra $40$ e $44$ minuti circa

### Al 99%

Per essere più sicuri si usa il $99\%$. Al centro deve stare il $99\%$ dell'area, e su ogni lato lo $0{,}5\%$. Serve $\Phi(z) = 0{,}995$: sulla tavola $z \approx 2{,}58$.

| livello di confidenza | $90\%$ | $95\%$ | $99\%$ |
|---|---|---|---|
| $z$ | $1{,}645$ | $1{,}96$ | $2{,}58$ |

Per il corriere il margine diventa $2{,}58 \cdot 1 = 2{,}58$ minuti. L'intervallo va da $39{,}42$ a $44{,}58$ minuti: è più largo.

[[grafico:dueIntervalli]]

>* Più fiducia vuol dire un intervallo più largo. Con lo stesso campione non si ha insieme più sicurezza e più precisione.

?? Con gli stessi dati calcoli un intervallo al $95\%$ e uno al $99\%$. Quale è più largo?
[x] Quello al $99\%$.
[ ] Quello al $95\%$.
[ ] Sono larghi uguali, perché il campione è lo stesso.
=> Al $99\%$ si usa $z = 2{,}58$ al posto di $1{,}96$, quindi il margine cresce. Per prendere il valore vero più spesso, la forchetta deve allargarsi.

> Qui $\sigma$ è sempre nota. Di solito invece va stimata anche lei dai dati. Allora, con campioni piccoli, al posto di $1{,}96$ si usano numeri un po' più grandi: quelli della distribuzione $t$ di Student.` },

    { id: 'dimensione-campione', titolo: 'Quanto deve essere grande il campione', testo: R`Il margine d'errore dipende da tre cose. Dal livello di confidenza, attraverso $z$. Dalla variabilità, cioè da $\sigma$. E dalla dimensione $n$. Se si vuole un margine fissato $E$, si ricava $n$.

~ E = z\,\dfrac{\sigma}{\sqrt{n}} :: il margine d'errore per la media
~ \sqrt{n} = \dfrac{z\,\sigma}{E} :: isolo la radice
~ n = \evidb{\left(\dfrac{z\,\sigma}{E}\right)^2} :: elevo al quadrato

>* Per stimare una media con margine $E$ serve $$n \ge \left(\frac{z\,\sigma}{E}\right)^2$$ Per una proporzione serve $$n \ge \frac{z^2\,p(1-p)}{E^2}$$ Il risultato si arrotonda sempre **per eccesso**.

Il corriere vuole un margine di $1$ minuto al $95\%$, con $\sigma = 8$ minuti. Allora $n \ge (1{,}96 \cdot 8)^2 = 245{,}86$, e servono $246$ consegne.

### Il caso peggiore

Per una proporzione, prima del sondaggio $p$ non si conosce. Allora si usa $p = 0{,}5$, il valore che rende più grande $p(1-p)$: vale $0{,}25$. Così il campione basta per qualunque $p$.

~ n \ge \dfrac{1{,}96^2 \cdot 0{,}25}{0{,}03^2} :: margine del $3\%$ al $95\%$, nel caso peggiore
~ = \dfrac{0{,}9604}{0{,}0009} \approx 1067{,}1 :: il conto
~ n = \evidb{1068} :: per eccesso. Ecco perché i sondaggi intervistano circa mille persone

[[grafico:margine]]

Il margine scende in fretta all'inizio, poi sempre più piano. Per dimezzarlo serve un campione quattro volte più grande.

>! Arrotondare per difetto è un errore: con $n = 1067$ il margine supera di poco il $3\%$. E un margine piccolo costa caro: per l'$1\%$ servono $9604$ persone.

?? Un sondaggio con $500$ intervistati ha un margine del $4\%$. Che margine avrebbe con $2000$ intervistati?
[ ] l'$1\%$
[ ] il $3\%$
[x] il $2\%$
=> $n$ è diventato quattro volte più grande, e nel margine c'è $\sqrt{n}$. Poiché $\sqrt{4} = 2$, il margine si dimezza. Per arrivare all'$1\%$ servirebbe un campione sedici volte più grande.` },

    { id: 'test-ipotesi', titolo: 'Il test d\'ipotesi', testo: R`Lanci una moneta $100$ volte ed escono $60$ teste. La moneta favorisce la testa, o è solo un caso? Un **test d'ipotesi** lo decide con una specie di ragionamento per assurdo, fatto con la probabilità.

[[video:statistica-inferenziale/test]]

>* L'**ipotesi nulla** $H_0$ è l'ipotesi «niente di speciale», quella che si mette alla prova. Qui è $p = 0{,}5$: la moneta è onesta. L'**ipotesi alternativa** $H_1$ è quella che si sospetta. Qui è $p > 0{,}5$.

Si suppone vera $H_0$ e si guarda il risultato. Se, con $H_0$ vera, un risultato così sarebbe molto raro, $H_0$ si rifiuta.

~ H_0: p = 0{,}5 \qquad H_1: p > 0{,}5 :: le ipotesi si fissano prima di guardare i dati
~ \alpha = 0{,}05 :: il **livello di significatività**: sotto questa soglia un risultato è «troppo raro»
~ X = \text{numero di teste} :: con $H_0$ vera è binomiale, con $n = 100$ e $p = 0{,}5$
~ P(X \ge 60) \approx \evidb{0{,}028} :: la somma delle barre da $60$ a $100$: è il **p-value**

>* Il **p-value** è la probabilità di ottenere, supponendo vera $H_0$, un risultato estremo almeno quanto quello osservato. Se il p-value è minore di $\alpha$, $H_0$ **si rifiuta**. Altrimenti $H_0$ non si rifiuta.

Qui $0{,}028 < 0{,}05$, quindi si rifiuta $H_0$ al livello del $5\%$. I dati dicono che la moneta favorisce la testa.

[[grafico:codaMoneta]]

Con $55$ teste il p-value è $P(X \ge 55) \approx 0{,}184$. È sopra il $5\%$: per una moneta onesta $55$ teste su $100$ sono normali. $H_0$ non si rifiuta.

>! Il p-value non è la probabilità che $H_0$ sia vera: è calcolato **supponendo** $H_0$ vera. E non è la proporzione $p$, anche se usa la stessa lettera.

Non rifiutare $H_0$ non dimostra che sia vera. Vuol dire solo che i dati non bastano a smentirla. Molti libri dicono «si accetta $H_0$», con questo significato.

?? Un test dà un p-value di $0{,}12$, con $\alpha = 0{,}05$. Che cosa si conclude?
[ ] $H_0$ è vera con probabilità $0{,}88$.
[ ] $H_0$ si rifiuta, perché $0{,}12$ è un numero piccolo.
[x] $H_0$ non si rifiuta: i dati sono compatibili con $H_0$.
=> $0{,}12$ supera $\alpha = 0{,}05$, quindi $H_0$ non si rifiuta. Questo non dimostra che $H_0$ sia vera. E il p-value non è la probabilità di $H_0$.` },

    { id: 'test-normale', titolo: 'Il test con la normale: una coda o due code', testo: R`Sommare a mano le barre di una binomiale è lungo. Con campioni grandi si usa la normale, come per gli intervalli. Si misura di quanti errori standard la stima si allontana dal valore di $H_0$.

>* La **statistica test** standardizza la stima con i valori di $H_0$: $$z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}} \qquad z = \frac{\bar{x} - \mu_0}{\frac{\sigma}{\sqrt{n}}}$$ $p_0$ e $\mu_0$ sono i valori che $H_0$ assegna a $p$ e a $\mu$.

### Una coda o due code

La domanda decide dove guardare. «La moneta favorisce la testa?» si preoccupa solo delle **troppe** teste: il test è a **una coda**, con $H_1: p > 0{,}5$. «La moneta è truccata?» si preoccupa anche delle teste **troppo poche**: il test è a **due code**, con $H_1: p \ne 0{,}5$.

>* Nel test a due code il p-value somma le aree delle due code: $$\text{p-value} = 2\,[1 - \Phi(|z|)]$$ È il doppio di quello a una coda.

Con la moneta e due code il p-value diventa circa $2 \cdot 0{,}0284 \approx 0{,}057$. È sopra il $5\%$: con la domanda «è truccata?» $H_0$ non si rifiuta. Per questo la domanda va scelta **prima** di guardare i dati.

Con la normale la moneta darebbe $z = 2$ e circa il $4{,}6\%$. Così vicino alla soglia l'approssimazione sposta il verdetto: vale il conto esatto con la binomiale.

### Un esempio sulla media

Una macchina deve riempire le bottiglie con $1000$ ml in media, e la deviazione standard è $6$ ml. Si controllano $36$ bottiglie: la media è $998$ ml. La macchina è starata? Lo è sia se mette troppo sia se mette poco: due code.

~ H_0: \mu = 1000 \qquad H_1: \mu \ne 1000 :: starata in un verso o nell'altro
~ \dfrac{\sigma}{\sqrt{n}} = \dfrac{6}{\sqrt{36}} = 1 :: l'errore standard, in ml
~ z = \dfrac{998 - 1000}{1} = -2 :: due errori standard sotto il valore di $H_0$
~ \text{p-value} = 2\,[1 - \Phi(2)] = 2 \cdot 0{,}0228 = \evidb{0{,}0456} :: le due code insieme

$0{,}0456 < 0{,}05$: al livello del $5\%$ si rifiuta $H_0$, e la macchina va regolata.

[[grafico:dueCode]]

Allo stesso modo si confronta $z$ con un **valore critico**: si rifiuta $H_0$ se $z$ cade oltre.

| | $\alpha = 5\%$ | $\alpha = 1\%$ |
|---|---|---|
| una coda | $1{,}645$ | $2{,}33$ |
| due code | $1{,}96$ | $2{,}58$ |

>! Con le due code il $5\%$ si divide a metà: $2{,}5\%$ per lato. Per questo il valore critico è $1{,}96$, e non $1{,}645$.` },

    { id: 'errori', titolo: 'Errori di primo e di secondo tipo', testo: R`Un test decide con dati presi a caso, quindi può sbagliare. Gli errori possibili sono due.

| | $H_0$ vera | $H_0$ falsa |
|---|---|---|
| si rifiuta $H_0$ | errore di **primo tipo** | decisione giusta |
| non si rifiuta $H_0$ | decisione giusta | errore di **secondo tipo** |

>* **Errore di primo tipo**: rifiutare $H_0$ quando è vera. La sua probabilità è il livello di significatività $\alpha$. **Errore di secondo tipo**: non rifiutare $H_0$ quando è falsa. La sua probabilità si chiama $\beta$.

Pensa a un processo, con $H_0$ = «l'imputato è innocente». L'errore di primo tipo condanna un innocente. Quello di secondo tipo assolve un colpevole. Per la legge il primo è più grave, quindi $\alpha$ si tiene piccolo.

Con le bottiglie, l'errore di primo tipo ferma una macchina che funziona. Quello di secondo tipo lascia lavorare una macchina starata.

### I due errori si fanno la guerra

Con $\alpha = 1\%$ si condannano meno innocenti. Ma la soglia per rifiutare è più alta, e passano più colpevoli: $\beta$ cresce. Con un campione fissato, se un errore scende l'altro sale. Per ridurli tutti e due serve un campione più grande.

[[grafico:errori]]

$\beta$ dipende anche da quanto $H_0$ è falsa. Se la moneta dà testa il $51\%$ delle volte, $100$ lanci quasi mai se ne accorgono. Se dà testa il $90\%$ delle volte, se ne accorgono quasi sempre.

>! $\alpha$ si sceglie prima del test. Cambiarlo dopo aver visto il p-value, per avere il risultato che si voleva, è barare.

?? Un test dichiara truccata una moneta che invece è onesta. Che cosa è successo?
[ ] Un errore di secondo tipo.
[x] Un errore di primo tipo.
[ ] Nessun errore: il p-value era piccolo.
=> Si è rifiutata $H_0$ («la moneta è onesta») mentre era vera: è un errore di primo tipo. Capita con probabilità $\alpha$. Un p-value piccolo non garantisce che $H_0$ sia falsa: con $H_0$ vera i risultati rari capitano, di rado.` }
  ],

  grafici: {
    campionaria: {
      tipo: 'piano', x: [0.05, 0.75], y: [-1, 21], passo: [0.1, 5], altezza: 360,
      proporzioni: 'libere', etichette: { x: 'p̂', y: '' },
      parametri: [{ nome: 'n', min: 25, max: 400, passo: 25, valore: 25, etichetta: 'dimensione del campione n' }],
      funzioni: [
        { f: 'exp(-(x - 0.4)^2*25/0.48)/sqrt(2*pi*0.24/25)', colore: 3, tratteggio: true, dominio: [0.05, 0.75] },
        { f: 'exp(-(x - 0.4)^2*n/0.48)/sqrt(2*pi*0.24/n)', colore: 1, dominio: [0.05, 0.75] }
      ],
      elementi: [
        { tipo: 'segmento', da: [0.4, -1], a: [0.4, 17], tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [0.43, 17.4], testo: 'p = 0,4', ancora: 'start' },
        { tipo: 'testo', p: [0.1, 20.2], testo: 'n = {{n}}', ancora: 'start' },
        { tipo: 'testo', p: [0.1, 18.7], testo: 'errore standard ≈ {{100*sqrt(0.24/n)}} %', ancora: 'start' }
      ],
      didascalia: 'La distribuzione di p̂ per campioni dall\'urna con p = 0,4. La curva tratteggiata è quella di n = 25, la blu cambia con n. L\'errore standard è scritto in percentuale: 9,8 % vuol dire 0,098. Con n = 100 vale 4,9 %, con n = 400 vale 2,45 %: n per quattro, larghezza a metà.'
    },
    mediaDadi: {
      tipo: 'piano', x: [0.3, 6.7], y: [-0.06, 0.56], altezza: 340,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'n', min: 1, max: 4, passo: 1, valore: 1, etichetta: 'numero di dadi n' }],
      funzioni: [{ f: 'exp(-(x - 3.5)^2*n/(2*35/12))/sqrt(2*pi*35/(12*n))', colore: 2, dominio: [0.3, 6.7] }],
      elementi: BARRE_DADI.concat(
        [{ tipo: 'segmento', da: [0.35, 0], a: [6.65, 0] }],
        [1, 2, 3, 4, 5, 6].map(k => ({ tipo: 'testo', p: [k, -0.035], testo: String(k) })),
        [{ tipo: 'testo', p: [0.4, 0.52], testo: 'dadi: {{n}}    μ = 3,5    σ/√n ≈ {{1.7078/sqrt(n)}}', ancora: 'start' }]),
      didascalia: 'L\'istogramma della media dei punteggi di n dadi, disegnato in modo che l\'area totale sia 1. Con un dado è piatto. Con due è un triangolo, con quattro è già una campana. La curva arancione è la normale con media 3,5 e deviazione standard σ/√n, con σ ≈ 1,71 per un dado solo.'
    },
    areaCentrale: {
      tipo: 'piano', x: [-3.6, 3.6], y: [-0.06, 0.62], altezza: 320,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'c', min: 50, max: 99.5, passo: 0.5, valore: 95, etichetta: 'livello di confidenza (%)' }],
      funzioni: [{ f: DENS, colore: 1 }],
      elementi: [
        { tipo: 'area', f: DENS, da: '-' + ZC, a: ZC, colore: 1 },
        { tipo: 'segmento', da: ['-' + ZC, 0], a: ['-' + ZC, 0.45], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: [ZC, 0], a: [ZC, 0.45], tratteggio: true, colore: 2 },
        ...ASSE_Z(3.6),
        { tipo: 'testo', p: [-3.4, 0.58], testo: 'area centrale {{c}} %:   z ≈ ' + Z3, ancora: 'start' },
        { tipo: 'testo', p: [-3.4, 0.51], testo: 'su ogni lato: {{(100 - c)/2}} %', ancora: 'start' }
      ],
      didascalia: 'La normale standard: l\'area colorata sta fra −z e z, ed è il livello di confidenza. Al 95 % z ≈ 1,960, e su ogni lato resta il 2,5 %. Al 99 % z ≈ 2,576 (sulla tavola 2,58), al 90 % z ≈ 1,645.'
    },
    dueIntervalli: {
      tipo: 'piano', x: [38.3, 45.7], y: [-0.7, 2.8], altezza: 230,
      proporzioni: 'libere', griglia: false, assi: false,
      elementi: [
        { tipo: 'segmento', da: [38.4, 0], a: [45.6, 0] },
        ...[39, 40, 41, 42, 43, 44, 45].map(k => ({ tipo: 'segmento', da: [k, -0.08], a: [k, 0.08] })),
        ...[39, 40, 41, 42, 43, 44, 45].map(k => ({ tipo: 'testo', p: [k, -0.45], testo: String(k) })),
        { tipo: 'segmento', da: [42, 0], a: [42, 1], tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: [42, 1.6], a: [42, 2], tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: [40.04, 1], a: [43.96, 1], colore: 1 },
        { tipo: 'segmento', da: [39.42, 2], a: [44.58, 2], colore: 2 },
        { tipo: 'punto', p: [40.04, 1], colore: 1 }, { tipo: 'punto', p: [43.96, 1], colore: 1 },
        { tipo: 'punto', p: [39.42, 2], colore: 2 }, { tipo: 'punto', p: [44.58, 2], colore: 2 },
        { tipo: 'testo', p: [42, 1.35], testo: '95 %: da 40,04 a 43,96' },
        { tipo: 'testo', p: [42, 2.35], testo: '99 %: da 39,42 a 44,58' },
        { tipo: 'testo', p: [42.35, 0.45], testo: 'x̄', ancora: 'start' }
      ],
      didascalia: 'Il tempo medio di consegna del corriere: due intervalli di confidenza costruiti con lo stesso campione, intorno alla stessa stima x̄ = 42 minuti. Quello al 99 % è più largo.'
    },
    margine: {
      tipo: 'piano', x: [-250, 2700], y: [0, 0.2], passo: [500, 0.05], altezza: 300,
      proporzioni: 'libere', etichette: { x: 'n', y: 'margine' },
      funzioni: [{ f: '0.98/sqrt(x)', colore: 1, dominio: [24, 2600] }],
      punti: [
        { x: 100, y: 0.098, etichetta: '9,8 %', posizione: 'destra' },
        { x: 400, y: 0.049, etichetta: '4,9 %', posizione: 'alto-destra' },
        { x: 1068, y: 0.03, etichetta: '3 % con n = 1068', posizione: 'alto-destra' },
        { x: 1600, y: 0.0245, etichetta: '2,45 %', posizione: 'basso' }
      ],
      didascalia: 'Il margine d\'errore al 95 % per una proporzione, nel caso peggiore p = 0,5: E = 1,96 · √(0,25/n) = 0,98/√n. Da n = 100 a n = 400 il margine si dimezza, e da 400 a 1600 di nuovo.'
    },
    codaMoneta: {
      tipo: 'piano', x: [28.5, 71.5], y: [-0.012, 0.1], altezza: 320,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'K', min: 50, max: 66, passo: 1, valore: 60, etichetta: 'teste osservate' }],
      elementi: BARRE_MONETA.concat(
        [{ tipo: 'segmento', da: [29, 0], a: [71, 0] }],
        [30, 40, 50, 60, 70].map(k => ({ tipo: 'testo', p: [k, -0.007], testo: String(k) })),
        [
          { tipo: 'segmento', da: ['K - 0.5', 0], a: ['K - 0.5', 0.07], tratteggio: true, colore: 2 },
          { tipo: 'testo', p: [29, 0.093], testo: 'p-value = P(X ≥ {{K}}) ≈ {{100*(' + CODA_K.join(' + ') + ')}} %', ancora: 'start' }
        ]),
      didascalia: 'X = numero di teste in 100 lanci, se la moneta è onesta: la binomiale con n = 100 e p = 0,5 (sotto 30 e sopra 70 le barre sono troppo basse per vedersi). Le barre arancioni sono la coda da K in su, e la loro somma è il p-value. Con 60 teste è circa il 2,8 %, con 55 circa il 18,4 %.'
    },
    dueCode: {
      tipo: 'piano', x: [-3.8, 3.8], y: [-0.06, 0.62], altezza: 320,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'z', min: 0, max: 3.5, passo: 0.05, valore: 2, etichetta: '|z| osservato' }],
      funzioni: [{ f: DENS, colore: 1 }],
      elementi: [
        { tipo: 'area', f: DENS, da: -3.8, a: '-z', colore: 2 },
        { tipo: 'area', f: DENS, da: 'z', a: 3.8, colore: 2 },
        ...ASSE_Z(3.8),
        { tipo: 'segmento', da: [-1.96, 0], a: [-1.96, 0.5], tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: [1.96, 0], a: [1.96, 0.5], tratteggio: true, colore: 4 },
        { tipo: 'testo', p: [-2.05, 0.44], testo: '−1,96', ancora: 'end' },
        { tipo: 'testo', p: [2.05, 0.44], testo: '1,96', ancora: 'start' },
        { tipo: 'testo', p: [-3.6, 0.58], testo: 'p-value (due code) ≈ {{200*(1 - ' + phiE('z') + ')}} %', ancora: 'start' }
      ],
      didascalia: 'Il test a due code: il p-value è l\'area delle due code oltre −|z| e |z|. Con |z| = 2, come per le bottiglie, vale circa 4,55 %. Le linee viola sono i valori critici ±1,96 del livello 5 %: se z cade oltre, H₀ si rifiuta.'
    },
    errori: {
      tipo: 'piano', x: [-3.5, 6.5], y: [-0.05, 0.6], passo: [1, 0.1], altezza: 340,
      proporzioni: 'libere', etichette: { x: 'z', y: '' },
      parametri: [{ nome: 'd', min: 0, max: 4, passo: 0.1, valore: 2, etichetta: 'distanza d da H₀' }],
      funzioni: [
        { f: DENS, colore: 1 },
        { f: 'exp(-(x - d)^2/2)/sqrt(2*pi)', colore: 2 }
      ],
      elementi: [
        { tipo: 'area', f: DENS, da: 1.645, a: 6.5, colore: 1 },
        { tipo: 'area', f: 'exp(-(x - d)^2/2)/sqrt(2*pi)', da: -3.5, a: 1.645, colore: 2 },
        { tipo: 'verticale', x: 1.645, tratteggio: true, colore: 4 },
        { tipo: 'testo', p: [-1.5, 0.3], testo: 'H₀' },
        { tipo: 'testo', p: ['d + 1.6', 0.3], testo: 'verità' },
        { tipo: 'testo', p: [2.1, 0.55], testo: 'α = 5 %    β ≈ {{100*' + phiE('1.645 - d') + '}} %', ancora: 'start' }
      ],
      didascalia: 'Un test a una coda al 5 %: si rifiuta H₀ se z supera 1,645 (linea viola). Curva blu: z se H₀ è vera; l\'area blu a destra della linea è α. Curva arancione: z se la verità sta d errori standard più in là; l\'area arancione a sinistra della linea è β. Più d cresce, più β scende.'
    }
  },

  esempi: [
    { titolo: 'La proporzione in un campione', problema: R`In una città il $30\%$ degli abitanti va al lavoro in treno. Si intervistano $210$ abitanti scelti a caso. Qual è la probabilità che nel campione la proporzione di chi usa il treno superi il $35\%$?`, passi: [
      R`La popolazione ha $p = 0{,}3$ e il campione $n = 210$. Controllo la normalità: $np = 63$ e $n(1-p) = 147$, tutti e due almeno $5$.`,
      R`Quindi $\hat{p}$ è quasi normale, con media $p = 0{,}3$ ed errore standard $\sigma_{\hat{p}} = \sqrt{\frac{0{,}3 \cdot 0{,}7}{210}} = \sqrt{0{,}001} \approx 0{,}0316$.`,
      R`Standardizzo $0{,}35$ con l'errore standard: $z = \frac{0{,}35 - 0{,}3}{0{,}0316} \approx 1{,}58$.`,
      R`Mi serve l'area a destra: $P(\hat{p} > 0{,}35) = 1 - \Phi(1{,}58) = 1 - 0{,}9429 = 0{,}0571$.`,
      R`Circa $6$ campioni su $100$ sbagliano per eccesso di più di $5$ punti percentuali.`
    ], risultato: R`$P(\hat{p} > 0{,}35) \approx 0{,}057$` },

    { titolo: 'Il limite centrale al call center', problema: R`Le telefonate a un call center durano in media $5$ minuti, con deviazione standard $4$ minuti. La distribuzione delle durate non è normale: tante telefonate brevi, poche molto lunghe. Si scelgono a caso $64$ telefonate. Qual è la probabilità che la loro durata media stia fra $4{,}5$ e $5{,}5$ minuti?`, passi: [
      R`La popolazione non è normale, ma $n = 64 \ge 30$. Per il teorema del limite centrale $\bar{x}$ è quasi normale.`,
      R`La media di $\bar{x}$ è $\mu = 5$. L'errore standard è $\sigma_{\bar{x}} = \frac{4}{\sqrt{64}} = 0{,}5$ minuti.`,
      R`Standardizzo i due estremi: $z = \frac{4{,}5 - 5}{0{,}5} = -1$ e $z = \frac{5{,}5 - 5}{0{,}5} = 1$.`,
      R`$P(-1 \le Z \le 1) = \Phi(1) - \Phi(-1) = 2\,\Phi(1) - 1 = 2 \cdot 0{,}8413 - 1 = 0{,}6826$.`,
      R`Per una telefonata sola non si potrebbe fare questo conto: la durata non è normale, e la tavola di $\Phi$ non vale.`
    ], risultato: R`$P(4{,}5 \le \bar{x} \le 5{,}5) \approx 0{,}683$` },

    { titolo: 'Un intervallo per una proporzione, al 95% e al 99%', problema: R`Su $625$ studenti scelti a caso in una regione, $375$ fanno sport almeno due volte a settimana. Stima la proporzione di tutti gli studenti della regione che fanno sport, con un intervallo di confidenza al $95\%$. Poi rifallo al $99\%$.`, passi: [
      R`La stima puntuale è $\hat{p} = \frac{375}{625} = 0{,}6$. Le condizioni valgono: $n\hat{p} = 375$ e $n(1-\hat{p}) = 250$.`,
      R`Errore standard, con $\hat{p}$ al posto di $p$: $\sqrt{\frac{0{,}6 \cdot 0{,}4}{625}} = \sqrt{0{,}000384} \approx 0{,}0196$.`,
      R`Al $95\%$ il margine è $1{,}96 \cdot 0{,}0196 \approx 0{,}038$. L'intervallo è $0{,}6 \pm 0{,}038$, cioè $\Icc{0{,}562}{0{,}638}$.`,
      R`Al $99\%$ il margine è $2{,}58 \cdot 0{,}0196 \approx 0{,}051$. L'intervallo è $\Icc{0{,}549}{0{,}651}$: più largo.`,
      R`Lettura: con il metodo al $95\%$, la proporzione di chi fa sport sta fra il $56\%$ e il $64\%$ circa.`
    ], risultato: R`al $95\%$: $\Icc{0{,}562}{0{,}638}$; al $99\%$: $\Icc{0{,}549}{0{,}651}$` },

    { titolo: 'Intervallo per una media e dimensione del campione', problema: R`Una macchina produce viti. La loro lunghezza ha deviazione standard $0{,}2$ mm, nota da tempo. Si misurano $100$ viti a caso: la media è $30{,}05$ mm. Trova l'intervallo di confidenza al $95\%$ per la lunghezza media. Poi trova quante viti servono per avere un margine di $0{,}02$ mm.`, passi: [
      R`$n = 100 \ge 30$, quindi $\bar{x}$ è quasi normale. L'errore standard è $\frac{\sigma}{\sqrt{n}} = \frac{0{,}2}{10} = 0{,}02$ mm.`,
      R`Il margine al $95\%$ è $1{,}96 \cdot 0{,}02 = 0{,}0392$ mm.`,
      R`L'intervallo è $30{,}05 \pm 0{,}0392$, cioè $\Icc{30{,}011}{30{,}089}$ mm, arrotondando ai millesimi.`,
      R`Per un margine $E = 0{,}02$: $n \ge \left(\frac{1{,}96 \cdot 0{,}2}{0{,}02}\right)^2 = 19{,}6^2 = 384{,}16$.`,
      R`Si arrotonda per eccesso: servono $385$ viti. Il margine scende circa a metà, e il campione è quasi quattro volte più grande.`
    ], risultato: R`$\Icc{30{,}011}{30{,}089}$ mm; per il margine di $0{,}02$ mm servono $385$ viti` },

    { titolo: 'Un test a una coda sui pezzi difettosi', problema: R`Un fornitore garantisce che i pezzi difettosi sono al massimo il $10\%$. Un cliente controlla $400$ pezzi scelti a caso e ne trova $52$ difettosi. Al livello del $5\%$, il cliente può dire che i difettosi sono più del $10\%$? E al livello dell'$1\%$?`, passi: [
      R`Le ipotesi: $H_0: p = 0{,}10$ (il fornitore ha ragione), $H_1: p > 0{,}10$. Interessano solo i difettosi in più: il test è a una coda.`,
      R`La stima è $\hat{p} = \frac{52}{400} = 0{,}13$. L'errore standard si calcola con $p_0 = 0{,}10$: $\sqrt{\frac{0{,}1 \cdot 0{,}9}{400}} = 0{,}015$.`,
      R`La statistica test è $z = \frac{0{,}13 - 0{,}10}{0{,}015} = 2$.`,
      R`Il p-value è l'area a destra di $2$: $1 - \Phi(2) = 1 - 0{,}9772 = 0{,}0228$.`,
      R`Al $5\%$: $0{,}0228 < 0{,}05$, si rifiuta $H_0$. All'$1\%$: $0{,}0228 > 0{,}01$, $H_0$ non si rifiuta. Con lo stesso campione la decisione dipende da $\alpha$: per questo $\alpha$ si fissa prima.`
    ], risultato: R`p-value $\approx 0{,}023$: si rifiuta $H_0$ al $5\%$, non all'$1\%$` }
  ],

  formulario: [
    { nome: 'Proporzione campionaria', formula: R`E(\hat{p}) = p \qquad \sigma_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}}`, nota: R`$\sigma_{\hat{p}}$ è l'errore standard della proporzione. Quasi normale se $np \ge 5$ e $n(1-p) \ge 5$.` },
    { nome: 'Media campionaria', formula: R`E(\bar{x}) = \mu \qquad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}`, nota: R`$\sigma_{\bar{x}}$ è l'errore standard della media.` },
    { nome: 'Teorema del limite centrale', formula: R`\bar{x} \approx N\left(\mu, \frac{\sigma}{\sqrt{n}}\right)`, nota: R`Per $n$ grande (in pratica $n \ge 30$), qualunque sia la popolazione. Esatto per ogni $n$ se la popolazione è normale. Qui il secondo numero è la deviazione standard.` },
    { nome: 'Standardizzare una media', formula: R`z = \frac{\bar{x} - \mu}{\sigma / \sqrt{n}}`, nota: R`Si divide per l'errore standard, non per $\sigma$.` },
    { nome: 'Intervallo di confidenza per una proporzione', formula: R`\hat{p} \pm z\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}`, nota: R`Con $n\hat{p} \ge 5$ e $n(1-\hat{p}) \ge 5$. Il termine dopo $\pm$ è il margine d'errore.` },
    { nome: 'Intervallo di confidenza per una media', formula: R`\bar{x} \pm z\,\frac{\sigma}{\sqrt{n}}`, nota: R`Con $\sigma$ nota; popolazione normale oppure $n \ge 30$.` },
    { nome: 'Valori di z per la confidenza', formula: R`90\%: 1{,}645 \qquad 95\%: 1{,}96 \qquad 99\%: 2{,}58`, nota: R`Al livello $c$ l'area fra $-z$ e $z$ vale $c$: per il $95\%$, $\Phi(1{,}96) = 0{,}975$.` },
    { nome: 'Dimensione del campione', formula: R`\begin{gathered} n \ge \left(\frac{z\,\sigma}{E}\right)^2 \\ n \ge \frac{z^2\,p(1-p)}{E^2} \end{gathered}`, nota: R`Per la media e per la proporzione, con margine $E$. Si arrotonda per eccesso. Se $p$ non si conosce, $p = 0{,}5$.` },
    { nome: 'Statistica test', formula: R`z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}} \qquad z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}`, nota: R`$p_0$ e $\mu_0$ sono i valori dell'ipotesi nulla $H_0$.` },
    { nome: 'p-value', formula: R`\begin{gathered} H_1: \mu > \mu_0 \ \Rightarrow \ 1 - \Phi(z) \\ H_1: \mu < \mu_0 \ \Rightarrow \ \Phi(z) \\ H_1: \mu \ne \mu_0 \ \Rightarrow \ 2\,[1 - \Phi(|z|)] \end{gathered}`, nota: R`Si rifiuta $H_0$ se il p-value è minore di $\alpha$.` },
    { nome: 'Valori critici', formula: R`\begin{gathered} \text{una coda: } 1{,}645 \; (5\%), \ 2{,}33 \; (1\%) \\ \text{due code: } 1{,}96 \; (5\%), \ 2{,}58 \; (1\%) \end{gathered}`, nota: R`Si rifiuta $H_0$ se $z$ va oltre il valore critico, dalla parte di $H_1$.` },
    { nome: 'Errori di un test', formula: R`\begin{gathered} P(\text{errore di primo tipo}) = \alpha \\ P(\text{errore di secondo tipo}) = \beta \end{gathered}`, nota: R`Primo tipo: rifiutare $H_0$ vera. Secondo tipo: non rifiutare $H_0$ falsa.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'popolazione-campione', tipo: 'definizione', fronte: R`Popolazione e campione`, retro: R`La popolazione è l'insieme di tutti gli elementi che interessano. Il campione è la parte che si osserva davvero; $n$ è la sua dimensione.` },
    { id: 'fc-02', sezione: 'popolazione-campione', tipo: 'concetto', fronte: R`Parametro e statistica`, retro: R`Il parametro descrive la popolazione ($p$, $\mu$): è fisso ma ignoto. La statistica si calcola sul campione ($\hat{p}$, $\bar{x}$): è nota ma cambia da campione a campione.` },
    { id: 'fc-03', sezione: 'popolazione-campione', tipo: 'definizione', fronte: R`Campione casuale semplice`, retro: R`Un campione in cui ogni elemento della popolazione ha la stessa probabilità di entrare, con scelte indipendenti.` },
    { id: 'fc-04', sezione: 'popolazione-campione', tipo: 'concetto', fronte: R`Che cos'è un campione distorto?`, retro: R`Un campione che non rappresenta la popolazione, per come è stato scelto: per esempio chi risponde volontariamente. Ingrandirlo non lo corregge.` },
    { id: 'fc-05', sezione: 'proporzione-campionaria', tipo: 'formula', fronte: R`Media ed errore standard della proporzione campionaria $\hat{p}$`, retro: R`$E(\hat{p}) = p$ e $\sigma_{\hat{p}} = \sqrt{\dfrac{p(1-p)}{n}}$. Quasi normale se $np \ge 5$ e $n(1-p) \ge 5$.` },
    { id: 'fc-06', sezione: 'proporzione-campionaria', tipo: 'definizione', fronte: R`Errore standard`, retro: R`La deviazione standard di una stima, come $\hat{p}$ o $\bar{x}$, al variare del campione. Misura quanto la stima oscilla intorno al valore vero.` },
    { id: 'fc-07', sezione: 'proporzione-campionaria', tipo: 'concetto', fronte: R`Che cosa succede all'errore standard se $n$ diventa quattro volte più grande?`, retro: R`Si dimezza, perché $n$ sta sotto radice: $\sqrt{4} = 2$.` },
    { id: 'fc-08', sezione: 'media-campionaria', tipo: 'formula', fronte: R`Media ed errore standard della media campionaria $\bar{x}$`, retro: R`$E(\bar{x}) = \mu$ e $\sigma_{\bar{x}} = \dfrac{\sigma}{\sqrt{n}}$.` },
    { id: 'fc-09', sezione: 'media-campionaria', tipo: 'concetto', fronte: R`Teorema del limite centrale`, retro: R`Per $n$ grande ($n \ge 30$ in pratica) la media campionaria è quasi normale, con media $\mu$ e deviazione standard $\frac{\sigma}{\sqrt{n}}$, qualunque sia la popolazione.` },
    { id: 'fc-10', sezione: 'media-campionaria', tipo: 'concetto', fronte: R`Quando $\bar{x}$ è normale anche con un campione piccolo?`, retro: R`Quando la popolazione è già normale: allora $\bar{x}$ è normale per ogni $n$.` },
    { id: 'fc-11', sezione: 'intervallo-proporzione', tipo: 'definizione', fronte: R`Stima puntuale`, retro: R`Un solo numero, calcolato sul campione, al posto del parametro: $\hat{p}$ per $p$, $\bar{x}$ per $\mu$.` },
    { id: 'fc-12', sezione: 'intervallo-proporzione', tipo: 'formula', fronte: R`Intervallo di confidenza al $95\%$ per una proporzione`, retro: R`$\hat{p} \pm 1{,}96\sqrt{\dfrac{\hat{p}(1-\hat{p})}{n}}$, con $n\hat{p} \ge 5$ e $n(1-\hat{p}) \ge 5$.` },
    { id: 'fc-13', sezione: 'intervallo-proporzione', tipo: 'concetto', fronte: R`Perché nell'intervallo al $95\%$ c'è $1{,}96$?`, retro: R`Nella normale standard il $95\%$ dell'area sta fra $-1{,}96$ e $1{,}96$: $\Phi(1{,}96) = 0{,}975$, e su ogni lato resta il $2{,}5\%$.` },
    { id: 'fc-14', sezione: 'intervallo-proporzione', tipo: 'concetto', fronte: R`Che cosa vuol dire «intervallo di confidenza al $95\%$»?`, retro: R`Che il metodo, ripetuto su tanti campioni, dà intervalli che contengono il valore vero circa $95$ volte su $100$. Il valore vero è fisso: cambia l'intervallo.` },
    { id: 'fc-15', sezione: 'intervallo-media', tipo: 'formula', fronte: R`Intervallo di confidenza per la media, con $\sigma$ nota`, retro: R`$\bar{x} \pm z\,\dfrac{\sigma}{\sqrt{n}}$, con $z = 1{,}96$ al $95\%$ e $z = 2{,}58$ al $99\%$. Popolazione normale oppure $n \ge 30$.` },
    { id: 'fc-16', sezione: 'intervallo-media', tipo: 'concetto', fronte: R`Passando dal $95\%$ al $99\%$, l'intervallo di confidenza…`, retro: R`…si allarga: $z$ passa da $1{,}96$ a $2{,}58$. Più fiducia costa meno precisione.` },
    { id: 'fc-17', sezione: 'dimensione-campione', tipo: 'formula', fronte: R`Dimensione del campione per stimare una media con margine $E$`, retro: R`$n \ge \left(\dfrac{z\,\sigma}{E}\right)^2$, arrotondando per eccesso.` },
    { id: 'fc-18', sezione: 'dimensione-campione', tipo: 'procedura', fronte: R`Dimensione del campione per una proporzione, se $p$ non si conosce`, retro: R`Si usa il caso peggiore $p = 0{,}5$: $n \ge \dfrac{z^2 \cdot 0{,}25}{E^2}$. Al $95\%$ con $E = 3\%$ servono $1068$ persone.` },
    { id: 'fc-19', sezione: 'test-ipotesi', tipo: 'definizione', fronte: R`Ipotesi nulla e ipotesi alternativa`, retro: R`$H_0$ è l'ipotesi «niente di speciale» che si mette alla prova, per esempio $p = 0{,}5$. $H_1$ è quella che si sospetta, per esempio $p > 0{,}5$.` },
    { id: 'fc-20', sezione: 'test-ipotesi', tipo: 'definizione', fronte: R`Livello di significatività $\alpha$`, retro: R`La soglia, fissata prima del test, sotto cui un risultato si considera troppo raro per $H_0$. Di solito $5\%$ o $1\%$.` },
    { id: 'fc-21', sezione: 'test-ipotesi', tipo: 'definizione', fronte: R`p-value`, retro: R`La probabilità di un risultato estremo almeno quanto quello osservato, calcolata supponendo vera $H_0$. Non è la probabilità che $H_0$ sia vera.` },
    { id: 'fc-22', sezione: 'test-ipotesi', tipo: 'procedura', fronte: R`Come si decide in un test d'ipotesi?`, retro: R`Se il p-value è minore di $\alpha$, si rifiuta $H_0$. Altrimenti $H_0$ non si rifiuta, il che non dimostra che sia vera.` },
    { id: 'fc-23', sezione: 'test-normale', tipo: 'concetto', fronte: R`Test a una coda e a due code`, retro: R`Una coda se $H_1$ guarda da una parte sola ($p > p_0$); due code se guarda da tutte e due ($p \ne p_0$). Con due code il p-value raddoppia.` },
    { id: 'fc-24', sezione: 'test-normale', tipo: 'formula', fronte: R`Statistica test per una media, con $\sigma$ nota`, retro: R`$z = \dfrac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$, dove $\mu_0$ è la media secondo $H_0$.` },
    { id: 'fc-25', sezione: 'errori', tipo: 'definizione', fronte: R`Errore di primo tipo ed errore di secondo tipo`, retro: R`Primo tipo: rifiutare $H_0$ quando è vera (probabilità $\alpha$). Secondo tipo: non rifiutare $H_0$ quando è falsa (probabilità $\beta$).` },
    { id: 'fc-26', sezione: 'errori', tipo: 'concetto', fronte: R`Come si riducono insieme i due errori di un test?`, retro: R`Con un campione più grande. A campione fisso, se $\alpha$ scende, $\beta$ sale.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Su $80$ persone intervistate a caso, $28$ leggono almeno un libro al mese. Quanto vale la proporzione campionaria $\hat{p}$?`, suggerimenti: [R`$\hat{p}$ è il numero di sì diviso per la dimensione del campione.`], risposta: pr(0.35), soluzione: [R`$\hat{p} = \frac{28}{80} = 0{,}35$.`, R`È una stima della proporzione $p$ fra tutti, che resta ignota.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Nella popolazione $p = 0{,}5$. Si estraggono campioni di $n = 100$ elementi. Quanto vale l'errore standard di $\hat{p}$?`, suggerimenti: [R`$\sigma_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}}$.`], risposta: pr(0.05), soluzione: [R`$\sigma_{\hat{p}} = \sqrt{\frac{0{,}5 \cdot 0{,}5}{100}} = \sqrt{0{,}0025}$.`, R`$\sigma_{\hat{p}} = 0{,}05$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Il $10\%$ dei pezzi di un lotto è difettoso. Si controllano campioni di $100$ pezzi. Quanto vale l'errore standard della proporzione di difettosi nel campione?`, suggerimenti: [R`Qui $p = 0{,}1$ e $n = 100$.`, R`$p(1-p) = 0{,}1 \cdot 0{,}9 = 0{,}09$.`], risposta: pr(0.03), soluzione: [R`$\sigma_{\hat{p}} = \sqrt{\frac{0{,}1 \cdot 0{,}9}{100}} = \sqrt{0{,}0009}$.`, R`$\sigma_{\hat{p}} = 0{,}03$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Con campioni di $100$ elementi l'errore standard di $\hat{p}$ vale $0{,}04$. Quanto vale con campioni di $400$ elementi?`, suggerimenti: [R`$n$ diventa quattro volte più grande, e nell'errore standard c'è $\sqrt{n}$ al denominatore.`], risposta: pr(0.02), soluzione: [R`$\sqrt{400} = 2\sqrt{100}$: il denominatore raddoppia.`, R`L'errore standard si dimezza: $0{,}04 : 2 = 0{,}02$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Una popolazione ha deviazione standard $\sigma = 12$. Quanto vale l'errore standard della media per campioni di $36$ elementi?`, suggerimenti: [R`$\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}$.`], risposta: val(2), soluzione: [R`$\sigma_{\bar{x}} = \frac{12}{\sqrt{36}} = \frac{12}{6} = 2$.`] },
    { id: 'b-06', livello: 'base', difficolta: 2, testo: R`Una popolazione ha deviazione standard $\sigma = 20$. Quanti elementi deve avere il campione perché l'errore standard della media sia $4$?`, suggerimenti: [R`$\frac{20}{\sqrt{n}} = 4$: trova prima $\sqrt{n}$.`], risposta: val(25), soluzione: [R`$\frac{20}{\sqrt{n}} = 4$ dà $\sqrt{n} = 5$.`, R`Quindi $n = 25$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Un campione di quattro mele pesa $120$ g, $150$ g, $90$ g e $140$ g. Qual è la stima puntuale del peso medio $\mu$ di tutte le mele, in grammi?`, suggerimenti: [R`La stima puntuale di $\mu$ è la media del campione $\bar{x}$.`], risposta: val(125), soluzione: [R`$\bar{x} = \frac{120 + 150 + 90 + 140}{4} = \frac{500}{4}$.`, R`$\bar{x} = 125$ g: è la stima di $\mu$.`] },
    { id: 'b-08', livello: 'base', difficolta: 2, testo: R`Una popolazione è normale, con media $50$ e deviazione standard $8$. Si estrae un campione di $16$ elementi. Qual è la probabilità che la media del campione superi $51$? Sulla tavola $\Phi(0{,}5) = 0{,}6915$.`, suggerimenti: [R`L'errore standard è $\frac{8}{\sqrt{16}}$.`, R`Standardizza $51$ con l'errore standard, poi prendi l'area a destra.`], risposta: pr(0.3085), soluzione: [R`$\sigma_{\bar{x}} = \frac{8}{4} = 2$, quindi $z = \frac{51 - 50}{2} = 0{,}5$.`, R`$P(\bar{x} > 51) = 1 - \Phi(0{,}5) = 1 - 0{,}6915 = 0{,}3085$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Quale valore di $z$ si usa per un intervallo di confidenza al $99\%$?`, suggerimenti: [R`Al centro deve stare il $99\%$ dell'area, quindi su ogni lato lo $0{,}5\%$.`, R`Cerca $z$ con $\Phi(z) = 0{,}995$.`], risposta: val(2.58), soluzione: [R`Serve $\Phi(z) = 1 - 0{,}005 = 0{,}995$.`, R`Sulla tavola $z \approx 2{,}58$ (più precisamente $2{,}576$).`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Un campione di $100$ persone dà $\hat{p} = 0{,}5$. Quanto vale il margine d'errore al $95\%$?`, suggerimenti: [R`Prima l'errore standard $\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$, poi moltiplica per $1{,}96$.`], risposta: pr(0.098), soluzione: [R`Errore standard: $\sqrt{\frac{0{,}25}{100}} = 0{,}05$.`, R`Margine: $1{,}96 \cdot 0{,}05 = 0{,}098$, cioè circa $10$ punti percentuali.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Un campione di $400$ elementi dà $\hat{p} = 0{,}2$. Quanto vale l'errore standard di $\hat{p}$, calcolato con la stima?`, suggerimenti: [R`$\hat{p}(1-\hat{p}) = 0{,}2 \cdot 0{,}8$.`], risposta: pr(0.02), soluzione: [R`$\sqrt{\frac{0{,}2 \cdot 0{,}8}{400}} = \sqrt{\frac{0{,}16}{400}} = \frac{0{,}4}{20}$.`, R`L'errore standard è $0{,}02$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Una popolazione normale ha deviazione standard $15$. Un campione di $25$ elementi ha media $20$. Qual è l'estremo **inferiore** dell'intervallo di confidenza al $95\%$ per la media?`, suggerimenti: [R`L'errore standard è $\frac{15}{\sqrt{25}} = 3$.`, R`L'estremo inferiore è $\bar{x} - 1{,}96 \cdot$ errore standard.`], risposta: val(14.12), soluzione: [R`Errore standard: $\frac{15}{5} = 3$. Margine: $1{,}96 \cdot 3 = 5{,}88$.`, R`Estremo inferiore: $20 - 5{,}88 = 14{,}12$. L'intervallo è $\Icc{14{,}12}{25{,}88}$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Una popolazione ha deviazione standard $12$. Un campione di $36$ elementi ha media $150$. Qual è l'estremo **superiore** dell'intervallo di confidenza al $95\%$ per la media?`, suggerimenti: [R`L'errore standard è $\frac{12}{6}$.`], risposta: val(153.92), soluzione: [R`Errore standard: $\frac{12}{\sqrt{36}} = 2$. Margine: $1{,}96 \cdot 2 = 3{,}92$.`, R`Estremo superiore: $150 + 3{,}92 = 153{,}92$.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Un intervallo di confidenza per una proporzione va da $0{,}42$ a $0{,}50$. Quanto vale il margine d'errore?`, suggerimenti: [R`L'intervallo è stima $\pm$ margine: la sua ampiezza è il doppio del margine.`], risposta: pr(0.04), soluzione: [R`L'ampiezza è $0{,}50 - 0{,}42 = 0{,}08$.`, R`Il margine è la metà: $0{,}04$. La stima puntuale sta al centro, $\hat{p} = 0{,}46$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Una popolazione ha deviazione standard $10$. Quanti elementi servono, al minimo, per stimare la media al $95\%$ con un margine di $2$?`, suggerimenti: [R`$n \ge \left(\frac{z\,\sigma}{E}\right)^2$ con $z = 1{,}96$.`, R`Arrotonda per eccesso.`], risposta: val(97), soluzione: [R`$n \ge \left(\frac{1{,}96 \cdot 10}{2}\right)^2 = 9{,}8^2 = 96{,}04$.`, R`Per eccesso: servono $97$ elementi. Con $96$ il margine supererebbe appena $2$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Un sondaggio con $250$ intervistati ha un certo margine d'errore. Quanti intervistati servono per dimezzarlo?`, suggerimenti: [R`Il margine dipende da $\sqrt{n}$.`], risposta: val(1000), soluzione: [R`Per dimezzare il margine, $\sqrt{n}$ deve raddoppiare, cioè $n$ deve diventare quattro volte più grande.`, R`$4 \cdot 250 = 1000$ intervistati.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`L'ipotesi nulla dice $\mu = 80$. La deviazione standard è $10$. Un campione di $25$ elementi ha media $84$. Quanto vale la statistica test $z$?`, suggerimenti: [R`$z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$.`], risposta: val(2), soluzione: [R`Errore standard: $\frac{10}{\sqrt{25}} = 2$.`, R`$z = \frac{84 - 80}{2} = 2$: la media del campione sta due errori standard sopra $\mu_0$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`In un test a una coda, con $H_1: \mu > \mu_0$, la statistica test vale $z = 1{,}5$. Quanto vale il p-value? Sulla tavola $\Phi(1{,}5) = 0{,}9332$.`, suggerimenti: [R`Con $H_1: \mu > \mu_0$ il p-value è l'area a destra di $z$.`], risposta: pr(0.0668), soluzione: [R`p-value $= 1 - \Phi(1{,}5) = 1 - 0{,}9332 = 0{,}0668$.`, R`È sopra il $5\%$: $H_0$ non si rifiuta.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`In un test a due code la statistica test vale $z = -2{,}5$. Quanto vale il p-value? Sulla tavola $\Phi(2{,}5) = 0{,}9938$.`, suggerimenti: [R`Con due code si sommano le aree oltre $-2{,}5$ e oltre $2{,}5$.`, R`p-value $= 2\,[1 - \Phi(|z|)]$.`], risposta: pr(0.0124), soluzione: [R`Ogni coda vale $1 - 0{,}9938 = 0{,}0062$.`, R`p-value $= 2 \cdot 0{,}0062 = 0{,}0124$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Un test ha livello di significatività $\alpha = 1\%$. Qual è la probabilità di commettere un errore di primo tipo?`, suggerimenti: [R`L'errore di primo tipo è rifiutare $H_0$ quando è vera.`], risposta: pr(0.01), soluzione: [R`Se $H_0$ è vera, la si rifiuta con probabilità $\alpha$.`, R`La probabilità è $0{,}01$, cioè l'$1\%$.`] },

    { id: 'es-01', difficolta: 2, testo: R`In un'indagine su $500$ lavoratori scelti a caso, $140$ vanno al lavoro in bicicletta. Trova l'intervallo di confidenza al $95\%$ per la proporzione di ciclisti fra tutti i lavoratori. Scrivi i due estremi separati da punto e virgola, arrotondati ai millesimi.`, suggerimenti: [R`Prima $\hat{p}$, poi l'errore standard con $\hat{p}$.`, R`L'errore standard è $\sqrt{\frac{0{,}28 \cdot 0{,}72}{500}} \approx 0{,}0201$.`], risposta: { tipo: 'numeri', valori: [0.241, 0.319], ordinati: true, tolleranza: 0.002, segnaposto: 'es. 0,2; 0,3', simboli: [';'] }, soluzione: [R`$\hat{p} = \frac{140}{500} = 0{,}28$. Le condizioni valgono: $n\hat{p} = 140$ e $n(1-\hat{p}) = 360$.`, R`Errore standard: $\sqrt{\frac{0{,}28 \cdot 0{,}72}{500}} = \sqrt{0{,}0004032} \approx 0{,}0201$.`, R`Margine: $1{,}96 \cdot 0{,}0201 \approx 0{,}039$.`, R`Intervallo: $0{,}28 \pm 0{,}039$, cioè $\Icc{0{,}241}{0{,}319}$: fra il $24\%$ e il $32\%$ circa.`] },
    { id: 'es-02', difficolta: 2, testo: R`Il peso dei meloni di una serra ha deviazione standard $0{,}35$ kg. Si pesano $49$ meloni scelti a caso: la media è $1{,}8$ kg. Trova l'intervallo di confidenza al $99\%$ per il peso medio. Scrivi i due estremi separati da punto e virgola.`, suggerimenti: [R`Al $99\%$ si usa $z = 2{,}58$.`, R`L'errore standard è $\frac{0{,}35}{7}$.`], risposta: { tipo: 'numeri', valori: [1.671, 1.929], ordinati: true, tolleranza: 0.002, segnaposto: 'es. 1,6; 2', simboli: [';'] }, soluzione: [R`$n = 49 \ge 30$, quindi $\bar{x}$ è quasi normale. Errore standard: $\frac{0{,}35}{\sqrt{49}} = 0{,}05$ kg.`, R`Margine al $99\%$: $2{,}58 \cdot 0{,}05 = 0{,}129$ kg.`, R`Intervallo: $1{,}8 \pm 0{,}129$, cioè $\Icc{1{,}671}{1{,}929}$ kg.`] },
    { id: 'es-03', difficolta: 2, testo: R`Un'indagine dell'anno scorso ha stimato al $20\%$ la quota di famiglie con un'auto elettrica. Quest'anno si vuole stimarla al $95\%$, con un margine di $2$ punti percentuali. Usando il $20\%$ come stima di $p$, quante famiglie bisogna intervistare?`, suggerimenti: [R`$n \ge \frac{z^2\,p(1-p)}{E^2}$ con $p = 0{,}2$ ed $E = 0{,}02$.`, R`Arrotonda per eccesso.`], risposta: val(1537), soluzione: [R`$n \ge \frac{1{,}96^2 \cdot 0{,}2 \cdot 0{,}8}{0{,}02^2} = \frac{3{,}8416 \cdot 0{,}16}{0{,}0004}$.`, R`$= \frac{0{,}614656}{0{,}0004} = 1536{,}64$.`, R`Servono $1537$ famiglie. Nel caso peggiore, con $p = 0{,}5$, ne servirebbero $2401$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Un intervallo di confidenza al $95\%$ per una media va da $46{,}08$ a $53{,}92$. La deviazione standard della popolazione è $14$. Quanti elementi aveva il campione?`, suggerimenti: [R`Il margine è metà dell'ampiezza dell'intervallo.`, R`$1{,}96 \cdot \frac{14}{\sqrt{n}} = $ margine: ricava $\sqrt{n}$.`], risposta: val(49), soluzione: [R`L'ampiezza è $53{,}92 - 46{,}08 = 7{,}84$, quindi il margine è $3{,}92$. La media del campione è il centro, $50$.`, R`$1{,}96 \cdot \frac{14}{\sqrt{n}} = 3{,}92$ dà $\frac{14}{\sqrt{n}} = 2$, cioè $\sqrt{n} = 7$.`, R`Il campione aveva $n = 49$ elementi.`] },
    { id: 'es-05', difficolta: 2, testo: R`Un produttore dichiara che le sue batterie durano in media $500$ ore, con deviazione standard $40$ ore. Un'associazione di consumatori ne prova $64$: la durata media è $489$ ore. Si può dire che durano meno di quanto dichiarato, al livello del $5\%$? E dell'$1\%$? Scrivi il p-value. Sulla tavola $\Phi(2{,}2) = 0{,}9861$.`, suggerimenti: [R`Interessa solo una durata **minore**: $H_1: \mu < 500$, test a una coda.`, R`Errore standard: $\frac{40}{\sqrt{64}} = 5$.`, R`Con $H_1: \mu < \mu_0$ il p-value è l'area a sinistra di $z$.`], risposta: pr(0.0139), soluzione: [R`$H_0: \mu = 500$, $H_1: \mu < 500$. Errore standard: $\frac{40}{8} = 5$ ore.`, R`$z = \frac{489 - 500}{5} = -2{,}2$.`, R`p-value $= \Phi(-2{,}2) = 1 - 0{,}9861 = 0{,}0139$.`, R`$0{,}0139 < 0{,}05$: al $5\%$ si rifiuta $H_0$, e le batterie durano meno di quanto dichiarato. All'$1\%$ invece no: $0{,}0139 > 0{,}01$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Un partito sostiene di avere il $30\%$ dei voti. In un sondaggio su $400$ elettori scelti a caso, $100$ dicono di votarlo. Si fa un test a due code, con $H_0: p = 0{,}3$. Quanto vale la statistica test $z$? Poi decidi al livello del $5\%$, sapendo che $\Phi(2{,}18) = 0{,}9854$.`, suggerimenti: [R`$\hat{p} = \frac{100}{400}$. L'errore standard si calcola con $p_0 = 0{,}3$.`, R`$\sqrt{\frac{0{,}3 \cdot 0{,}7}{400}} \approx 0{,}0229$.`], risposta: val(-2.18, 0.01), soluzione: [R`$\hat{p} = 0{,}25$. Errore standard con $p_0$: $\sqrt{\frac{0{,}21}{400}} \approx 0{,}0229$.`, R`$z = \frac{0{,}25 - 0{,}3}{0{,}0229} \approx -2{,}18$.`, R`Due code: p-value $= 2\,[1 - \Phi(2{,}18)] = 2 \cdot 0{,}0146 = 0{,}0292$.`, R`$0{,}0292 < 0{,}05$: si rifiuta $H_0$. Il $30\%$ dichiarato non è compatibile con il sondaggio.`] },
    { id: 'es-07', difficolta: 2, testo: R`Si sospetta che un dado favorisca il $6$. Lo si lancia $120$ volte, e il $6$ esce $30$ volte. Con $H_0: p = \frac{1}{6}$ e $H_1: p > \frac{1}{6}$, quanto vale la statistica test $z$? Arrotonda ai centesimi.`, suggerimenti: [R`$\hat{p} = \frac{30}{120} = 0{,}25$.`, R`Errore standard con $p_0 = \frac{1}{6}$: $\sqrt{\frac{\frac{1}{6} \cdot \frac{5}{6}}{120}} \approx 0{,}034$.`], risposta: val(2.45, 0.01), soluzione: [R`Errore standard: $\sqrt{\frac{5/36}{120}} = \sqrt{\frac{1}{864}} \approx 0{,}0340$.`, R`$z = \frac{0{,}25 - 0{,}1667}{0{,}0340} \approx 2{,}45$.`, R`p-value $= 1 - \Phi(2{,}45) = 1 - 0{,}9929 = 0{,}0071$: si rifiuta $H_0$ anche all'$1\%$. Il dado sembra davvero favorire il $6$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Un test sulla media dà $z = 1{,}8$. Sulla tavola $\Phi(1{,}8) = 0{,}9641$. Calcola il p-value nel test a una coda, con $H_1: \mu > \mu_0$, e in quello a due code. Scrivi i due p-value in quest'ordine, separati da punto e virgola. Che cosa decidi, al $5\%$, nei due casi?`, suggerimenti: [R`Una coda: l'area a destra di $1{,}8$.`, R`Due code: il doppio.`], risposta: { tipo: 'numeri', valori: [0.0359, 0.0718], ordinati: true, tolleranza: 0.001, segnaposto: 'es. 0,02; 0,04', simboli: [';'] }, soluzione: [R`Una coda: $1 - 0{,}9641 = 0{,}0359$. È sotto il $5\%$: si rifiuta $H_0$.`, R`Due code: $2 \cdot 0{,}0359 = 0{,}0718$. È sopra il $5\%$: $H_0$ non si rifiuta.`, R`Stessi dati, decisioni opposte: per questo una coda o due code si scelgono prima di vedere i dati, guardando la domanda.`] },
    { id: 'es-09', difficolta: 3, testo: R`Una popolazione ha deviazione standard $15$. Si fa un test con $H_0: \mu = 100$ e $H_1: \mu > 100$, su campioni di $25$ elementi, al livello del $5\%$. Si rifiuta $H_0$ se $\bar{x}$ supera $100 + 1{,}645 \cdot \frac{15}{5}$. Se in realtà $\mu = 106$, qual è la probabilità $\beta$ di un errore di secondo tipo?`, suggerimenti: [R`La soglia di rifiuto è $100 + 1{,}645 \cdot 3 = 104{,}935$.`, R`L'errore di secondo tipo è non rifiutare: $\bar{x} \le 104{,}935$, quando $\mu = 106$.`, R`Standardizza la soglia con $\mu = 106$ e l'errore standard $3$.`], risposta: pr(0.36, 0.01), soluzione: [R`Errore standard: $\frac{15}{\sqrt{25}} = 3$. Soglia: $100 + 1{,}645 \cdot 3 = 104{,}935$.`, R`Se $\mu = 106$, $\bar{x}$ è normale con media $106$ ed errore standard $3$.`, R`$\beta = P(\bar{x} \le 104{,}935) = \Phi\left(\frac{104{,}935 - 106}{3}\right) = \Phi(-0{,}355) \approx 1 - 0{,}6387 \approx 0{,}36$.`, R`Più di una volta su tre il test non si accorge che $\mu$ è salita a $106$. Con un campione più grande $\beta$ scenderebbe.`] },
    { id: 'es-10', difficolta: 3, testo: R`*Problema in stile seconda prova.* Una macchina confeziona sacchetti di caffè. Per progetto il peso medio è $250$ g, e la deviazione standard, nota, è $5$ g. Il peso è distribuito normalmente.

a) Con la macchina ben regolata, qual è la probabilità che la media di $25$ sacchetti stia sotto $248{,}5$ g?
b) Un controllo di $100$ sacchetti dà una media di $249{,}2$ g. Trova l'intervallo di confidenza al $95\%$ per il peso medio.
c) Con gli stessi dati fai un test a due code con $H_0: \mu = 250$, al livello del $5\%$. Calcola il p-value e decidi.
d) Quanti sacchetti servono per stimare la media al $95\%$ con un margine di $0{,}4$ g?

Sulla tavola: $\Phi(1{,}5) = 0{,}9332$, $\Phi(1{,}6) = 0{,}9452$. Scrivi le risposte di a), c) e d) in quest'ordine, separate da punto e virgola.`, suggerimenti: [R`a) L'errore standard per $n = 25$ è $\frac{5}{5} = 1$.`, R`b) e c) Per $n = 100$ l'errore standard è $0{,}5$; nel test $z = \frac{249{,}2 - 250}{0{,}5}$.`, R`d) $n \ge \left(\frac{1{,}96 \cdot 5}{0{,}4}\right)^2$, per eccesso.`], risposta: { tipo: 'numeri', valori: [0.0668, 0.1096, 601], ordinati: true, tolleranza: 0.002, segnaposto: 'es. 0,05; 0,1; 400', simboli: [';'] }, soluzione: [R`a) $\sigma_{\bar{x}} = \frac{5}{\sqrt{25}} = 1$, $z = \frac{248{,}5 - 250}{1} = -1{,}5$. $P(\bar{x} < 248{,}5) = 1 - 0{,}9332 = 0{,}0668$.`, R`b) $\sigma_{\bar{x}} = \frac{5}{\sqrt{100}} = 0{,}5$. Margine: $1{,}96 \cdot 0{,}5 = 0{,}98$. Intervallo: $\Icc{248{,}22}{250{,}18}$ g.`, R`c) $z = \frac{249{,}2 - 250}{0{,}5} = -1{,}6$. p-value $= 2\,[1 - \Phi(1{,}6)] = 2 \cdot 0{,}0548 = 0{,}1096$. È sopra il $5\%$: $H_0$ non si rifiuta.`, R`Le risposte b) e c) vanno d'accordo: l'intervallo al $95\%$ contiene $250$, e il test a due code al $5\%$ non rifiuta $\mu = 250$. Non è un caso: le due procedure usano lo stesso $1{,}96$.`, R`d) $n \ge \left(\frac{1{,}96 \cdot 5}{0{,}4}\right)^2 = 24{,}5^2 = 600{,}25$. Servono $601$ sacchetti.`] },
    { id: 'es-11', difficolta: 2, testo: R`La spesa dei clienti di un bar ha media $6$ euro e deviazione standard $4{,}5$ euro. La distribuzione non è normale: molti caffè, pochi pranzi. Si scelgono a caso $81$ scontrini. Qual è la probabilità che la spesa media superi $6{,}5$ euro? Sulla tavola $\Phi(1) = 0{,}8413$.`, suggerimenti: [R`$n = 81 \ge 30$: vale il teorema del limite centrale.`, R`L'errore standard è $\frac{4{,}5}{9}$.`], risposta: pr(0.1587), soluzione: [R`Per il teorema del limite centrale $\bar{x}$ è quasi normale, con media $6$ ed errore standard $\frac{4{,}5}{\sqrt{81}} = 0{,}5$ euro.`, R`$z = \frac{6{,}5 - 6}{0{,}5} = 1$.`, R`$P(\bar{x} > 6{,}5) = 1 - 0{,}8413 = 0{,}1587$, circa una volta su sei.`] },
    { id: 'es-12', difficolta: 2, testo: R`Un sondaggio su $1000$ elettori dà il candidato A al $51\%$ e il candidato B al $49\%$. Quanto vale il margine d'errore al $95\%$ per la quota di A? Arrotonda ai millesimi. Il sondaggio dice chi vincerà?`, suggerimenti: [R`Errore standard: $\sqrt{\frac{0{,}51 \cdot 0{,}49}{1000}}$.`, R`Guarda se la forchetta di A contiene il $50\%$.`], risposta: pr(0.031), soluzione: [R`Errore standard: $\sqrt{\frac{0{,}2499}{1000}} \approx 0{,}0158$. Margine: $1{,}96 \cdot 0{,}0158 \approx 0{,}031$.`, R`La forchetta di A va dal $47{,}9\%$ al $54{,}1\%$ circa, e contiene il $50\%$.`, R`Il sondaggio non dice chi vincerà: i giornali lo chiamano «pareggio statistico».`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale di questi numeri è un **parametro**?`, opzioni: [R`La proporzione di sì fra le $500$ persone intervistate`, R`La media dei voti di un campione di $30$ studenti`, R`L'altezza media di tutti gli studenti della scuola`, R`Il numero delle persone scelte per l'intervista`], corretta: 2, spiegazione: R`Un parametro descrive l'intera popolazione: l'altezza media di **tutti** gli studenti. La proporzione fra gli intervistati e la media del campione sono statistiche, calcolate sul campione. Il numero degli intervistati è la dimensione $n$.` },
    { id: 'q-02', domanda: R`Perché il campione si sceglie a caso?`, opzioni: [R`Perché solo così si può misurare l'errore della stima`, R`Perché così il campione dà sempre il valore esatto della popolazione`, R`Perché un campione casuale può essere più piccolo`, R`Perché così non serve calcolare l'errore standard`], corretta: 0, spiegazione: R`Con la scelta a caso la stima diventa una variabile aleatoria, e la probabilità dice quanto può sbagliare. Il campione casuale non dà il valore esatto, e l'errore standard va calcolato comunque.` },
    { id: 'q-03', domanda: R`Se la dimensione $n$ del campione diventa quattro volte più grande, l'errore standard di $\hat{p}$…`, opzioni: [R`diventa quattro volte più piccolo`, R`si dimezza`, R`raddoppia`, R`non cambia`], corretta: 1, spiegazione: R`Nell'errore standard $\sqrt{\frac{p(1-p)}{n}}$ la $n$ sta sotto radice. Moltiplicare $n$ per $4$ divide l'errore standard per $\sqrt{4} = 2$. Diventerebbe quattro volte più piccolo senza la radice.` },
    { id: 'q-04', domanda: R`Che cosa dice il teorema del limite centrale?`, opzioni: [R`Una popolazione molto grande ha sempre una distribuzione normale`, R`L'istogramma di un campione grande ha sempre la forma di una campana`, R`La media di un campione grande coincide sempre con $\mu$`, R`Per $n$ grande la media campionaria ha distribuzione quasi normale`], corretta: 3, spiegazione: R`Il teorema parla della distribuzione di $\bar{x}$ al variare del campione, non della popolazione né dei dati di un campione. E $\bar{x}$ resta una stima: oscilla intorno a $\mu$, con errore standard $\frac{\sigma}{\sqrt{n}}$.` },
    { id: 'q-05', domanda: R`Una popolazione ha una distribuzione molto asimmetrica. Si prendono campioni di $5$ elementi. Che cosa si può dire di $\bar{x}$?`, opzioni: [R`È normale, per il teorema del limite centrale`, R`Ha una media diversa da $\mu$`, R`Non si può dire che sia quasi normale`, R`Ha errore standard $\sigma\sqrt{5}$`], corretta: 2, spiegazione: R`Con $n = 5$ il campione è troppo piccolo perché il teorema del limite centrale valga, e la popolazione non è normale. La media di $\bar{x}$ è comunque $\mu$, e l'errore standard è $\frac{\sigma}{\sqrt{5}}$, non $\sigma\sqrt{5}$.` },
    { id: 'q-06', domanda: R`Che cosa vuol dire $E(\hat{p}) = p$?`, opzioni: [R`Che $\hat{p}$ è sempre uguale a $p$`, R`Che in media, su tanti campioni, $\hat{p}$ vale $p$`, R`Che $\hat{p}$ è uguale a $p$ ogni volta che $n \ge 30$`, R`Che metà dei campioni dà esattamente il valore $p$`], corretta: 1, spiegazione: R`Il valore atteso è una media su tanti campioni: $\hat{p}$ oscilla intorno a $p$ senza sbagliare sempre dalla stessa parte. Un singolo $\hat{p}$ di solito è diverso da $p$, qualunque sia $n$.` },
    { id: 'q-07', domanda: R`Un intervallo di confidenza al $95\%$ per $p$ va da $0{,}47$ a $0{,}57$. Quale frase è corretta?`, opzioni: [R`Il metodo prende il valore vero in circa $95$ campioni su $100$`, R`$p$ sta fra $0{,}47$ e $0{,}57$ con probabilità del $95\%$`, R`Il $95\%$ della popolazione sta fra $0{,}47$ e $0{,}57$`, R`Il $95\%$ dei prossimi campioni darà $\hat{p}$ fra $0{,}47$ e $0{,}57$`], corretta: 0, spiegazione: R`$p$ è un numero fisso: o sta nell'intervallo o no, e non ha probabilità. Il $95\%$ è l'affidabilità del metodo. L'intervallo non parla della popolazione, e non prevede i prossimi $\hat{p}$: ogni campione ha la sua forchetta.` },
    { id: 'q-08', domanda: R`Con lo stesso campione si passa da un intervallo al $95\%$ a uno al $99\%$. Che cosa succede?`, opzioni: [R`L'intervallo si restringe`, R`Il margine d'errore resta lo stesso`, R`Cambia la stima puntuale`, R`L'intervallo si allarga`], corretta: 3, spiegazione: R`$z$ passa da $1{,}96$ a $2{,}58$, quindi il margine cresce e l'intervallo si allarga. La stima puntuale, il centro, resta la stessa: dipende solo dal campione.` },
    { id: 'q-09', domanda: R`Come si dimezza il margine d'errore, a parità di livello di confidenza?`, opzioni: [R`Raddoppiando $n$`, R`Dimezzando $n$`, R`Moltiplicando $n$ per $4$`, R`Non si può: dipende solo da $\sigma$`], corretta: 2, spiegazione: R`Il margine contiene $\frac{1}{\sqrt{n}}$. Per dimezzarlo $\sqrt{n}$ deve raddoppiare, quindi $n$ diventa quattro volte più grande. Raddoppiando $n$ il margine scende solo di circa il $29\%$.` },
    { id: 'q-10', domanda: R`Per calcolare quante persone intervistare, se $p$ non si conosce, si usa $p = 0{,}5$. Perché?`, opzioni: [R`Perché $0{,}5$ è il valore più probabile di $p$`, R`Perché rende massimo il prodotto $p(1-p)$`, R`Perché rende il margine d'errore il più piccolo possibile`, R`Perché $0{,}5$ è la media fra $0$ e $1$`], corretta: 1, spiegazione: R`$p(1-p)$ vale al massimo $0{,}25$, proprio per $p = 0{,}5$. È il caso peggiore: il campione trovato così è abbastanza grande per qualunque $p$. Non dice niente su quale $p$ sia probabile.` },
    { id: 'q-11', domanda: R`Due sondaggi casuali intervistano $1000$ persone ciascuno: uno in un comune di $20\,000$ abitanti, l'altro in tutta Italia. Come sono i margini d'errore?`, opzioni: [R`Circa uguali`, R`Molto più grande quello sull'Italia`, R`Molto più grande quello sul comune`, R`Non si possono confrontare`], corretta: 0, spiegazione: R`Nell'errore standard c'è $n$, la dimensione del campione, non quella della popolazione. Se la popolazione è molto più grande del campione, la sua dimensione non conta.` },
    { id: 'q-12', domanda: R`In un test, che cos'è l'ipotesi nulla $H_0$?`, opzioni: [R`L'ipotesi che lo sperimentatore vuole dimostrare`, R`L'ipotesi che i dati raccolti siano sbagliati`, R`Un'ipotesi che ha probabilità zero di essere vera`, R`L'ipotesi di partenza, che si mette alla prova`], corretta: 3, spiegazione: R`$H_0$ è l'ipotesi «niente di speciale»: la moneta è onesta, la macchina è regolata. Si suppone vera e si guarda se i dati la smentiscono. Quello che si sospetta, e magari si vuole dimostrare, è $H_1$.` },
    { id: 'q-13', domanda: R`Un test dà un p-value di $0{,}03$. Che cosa vuol dire?`, opzioni: [R`$H_0$ è vera con probabilità $3\%$, falsa con il $97\%$`, R`Con $H_0$ vera, dati così estremi hanno probabilità $3\%$`, R`$H_1$ è vera con una probabilità del $97\%$`, R`Il test sbaglia il $3\%$ delle volte che si ripete`], corretta: 1, spiegazione: R`Il p-value si calcola supponendo vera $H_0$, quindi non può essere la probabilità di $H_0$ o di $H_1$. La probabilità di sbagliare rifiutando $H_0$ vera è $\alpha$, fissata prima.` },
    { id: 'q-14', domanda: R`Il p-value di un test è $0{,}03$. Che cosa si decide al livello del $5\%$ e a quello dell'$1\%$?`, opzioni: [R`$H_0$ si rifiuta a tutti e due i livelli`, R`$H_0$ non si rifiuta a nessuno dei due livelli`, R`$H_0$ si rifiuta al $5\%$, ma non all'$1\%$`, R`$H_0$ si rifiuta all'$1\%$, ma non al $5\%$`], corretta: 2, spiegazione: R`Si rifiuta quando il p-value è minore di $\alpha$. $0{,}03 < 0{,}05$, ma $0{,}03 > 0{,}01$. Un livello più severo chiede una prova più forte.` },
    { id: 'q-15', domanda: R`Quando si sceglie un test a due code?`, opzioni: [R`Quando contano gli scarti in tutti e due i versi`, R`Quando il campione ha meno di $30$ elementi in tutto`, R`Quando il p-value a una coda è troppo grande`, R`Ogni volta che il livello è $\alpha = 1\%$`], corretta: 0, spiegazione: R`La scelta dipende dalla domanda, ed è fatta prima di vedere i dati. «La macchina è starata?» guarda in tutti e due i versi: due code. Cambiare tipo di test dopo aver visto il p-value è barare.` },
    { id: 'q-16', domanda: R`Con lo stesso campione si abbassa $\alpha$ dal $5\%$ all'$1\%$. Che cosa succede agli errori?`, opzioni: [R`Diminuiscono tutti e due, perché il test è più severo`, R`Diminuisce soltanto l'errore di secondo tipo`, R`L'errore di secondo tipo resta esattamente lo stesso`, R`Il primo tipo diventa più raro, il secondo più frequente`], corretta: 3, spiegazione: R`Con $\alpha$ più piccolo si rifiuta più di rado: si sbaglia meno rifiutando $H_0$ vera, ma di più tenendo $H_0$ falsa. Per ridurre tutti e due gli errori serve un campione più grande.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Quando standardizzi una media, dividi per l'errore standard $\frac{\sigma}{\sqrt{n}}$, non per $\sigma$. È lo sbaglio più comune.` },
    { tipo: 'metodo', testo: R`Un intervallo di confidenza si fa sempre in quattro righe: stima puntuale, errore standard, margine, intervallo.` },
    { tipo: 'trucco', testo: R`La stima puntuale sta al centro dell'intervallo, e il margine è metà della sua ampiezza. Così da un intervallo ricavi subito tutti e due.` },
    { tipo: 'errore', testo: R`La dimensione del campione si arrotonda sempre per eccesso: $96{,}04$ diventa $97$. Con $96$ il margine sarebbe un po' troppo grande.` },
    { tipo: 'metodo', testo: R`In un test scrivi $H_0$ e $H_1$ prima di ogni conto. È $H_1$ a dire se il test è a una coda o a due code.` },
    { tipo: 'errore', testo: R`Nel test su una proporzione l'errore standard si calcola con $p_0$, il valore di $H_0$. Nell'intervallo di confidenza, invece, con la stima $\hat{p}$.` },
    { tipo: 'trucco', testo: R`Intervallo e test vanno d'accordo. Se l'intervallo al $95\%$ contiene $\mu_0$, il test a due code al $5\%$ non rifiuta $\mu = \mu_0$. Se non lo contiene, lo rifiuta.` },
    { tipo: 'errore', testo: R`Il p-value non è la probabilità che $H_0$ sia vera. È la probabilità di dati così estremi, calcolata supponendo vera $H_0$.` },
    { tipo: 'metodo', testo: R`Nei conti scrivi le percentuali come decimali: un margine del $4{,}9\%$ è $0{,}049$. Torna alle percentuali solo alla fine.` }
  ],

  aneddoti: [
    { matematico: 'John Arbuthnot', anni: '1667–1735', titolo: 'Ottantadue anni con più maschi che femmine', testo: R`John Arbuthnot era un medico scozzese, medico della regina Anna e amico di Jonathan Swift. Scriveva anche satire: è lui l'inventore di John Bull, il personaggio che rappresenta l'Inghilterra. Nel 1710 pubblicò una nota dal titolo solenne, un «argomento per la Divina Provvidenza». Aveva preso i registri dei battesimi di Londra dal 1629 al 1710. In tutti gli $82$ anni i maschi battezzati erano stati più delle femmine. Se maschi e femmine fossero ugualmente probabili, ogni anno sarebbe come il lancio di una moneta. Ottantadue volte di fila la stessa faccia ha probabilità $\left(\frac{1}{2}\right)^{82}$, circa una su $5 \cdot 10^{24}$. Arbuthnot concluse che non poteva essere un caso. La sua conclusione religiosa oggi fa sorridere. Il ragionamento invece è quello di un test d'ipotesi, forse il primo della storia.`, legame: R`Arbuthnot suppone vera l'ipotesi nulla «maschi e femmine sono ugualmente probabili», trova un p-value minuscolo e la rifiuta.` },

    { matematico: 'William Sealy Gosset', anni: '1876–1937', titolo: 'Il birraio che firmava «Student»', testo: R`Gosset aveva studiato chimica e matematica a Oxford. Nel 1899 entrò nella birreria Guinness di Dublino, che assumeva giovani scienziati. Doveva scegliere orzi e lieviti, ma ogni prova costava. Così lavorava con campioni piccoli, a volte di pochi elementi. Con così pochi dati le formule basate sulla normale sbagliavano. Gosset studiò il problema e passò anche un anno a Londra, nel laboratorio di Karl Pearson. Nel 1908 pubblicò la soluzione in un articolo intitolato «L'errore probabile di una media». La Guinness però non voleva che i suoi dipendenti pubblicassero. Gosset firmò allora con uno pseudonimo: «Student», cioè «studente». Per anni pochi seppero chi ci fosse dietro. La distribuzione che aveva trovato si chiama ancora oggi $t$ di Student.`, legame: R`Se $\sigma$ non è nota e il campione è piccolo, nell'intervallo per la media al posto di $1{,}96$ si usano i valori della $t$ di Student.` },

    { matematico: 'Ronald Aylmer Fisher', anni: '1890–1962', titolo: 'La signora che assaggiava il tè', testo: R`Negli anni Venti Ronald Fisher lavorava a Rothamsted, una stazione di ricerca agraria a nord di Londra. Si racconta che un pomeriggio offrì una tazza di tè alla collega Muriel Bristol, una biologa che studiava le alghe. Lei la rifiutò: preferiva il latte versato prima del tè, e diceva di sentire la differenza. Fisher pensò a un esperimento. Otto tazze, quattro con il latte prima e quattro dopo, in ordine casuale: lei doveva trovare le quattro giuste. Tirando a indovinare, le avrebbe trovate tutte con probabilità $\frac{1}{70}$, meno del $2\%$. Secondo il racconto di un presente, la signora le indovinò tutte. Fisher descrisse l'esperimento nel 1935, nel libro *Il disegno degli esperimenti*. In quelle pagine compare per la prima volta l'espressione «ipotesi nulla».`, legame: R`L'ipotesi nulla è «la signora tira a indovinare». Con tutte le tazze giuste il p-value è $\frac{1}{70} \approx 0{,}014$, e $H_0$ si rifiuta al $5\%$.` },

    { matematico: 'Jerzy Neyman', anni: '1894–1981', titolo: 'Il 95% è del metodo, non dell\'intervallo', testo: R`Jerzy Neyman nacque a Bendery, in Bessarabia, allora parte dell'impero russo, da una famiglia polacca. Studiò a Char'kov e poi lavorò a Varsavia. Fra il 1928 e il 1933 scrisse con l'inglese Egon Pearson, figlio di Karl, gli articoli che diedero ai test la forma di oggi. Lì comparvero l'ipotesi alternativa e i due tipi di errore. Nel 1934, a Londra, Neyman presentò gli **intervalli di confidenza**. Su un punto era intransigente, e confonde ancora molti studenti. Il valore vero è un numero fisso: non ha una probabilità. Il $95\%$ è la frequenza con cui il metodo ci prende, ripetuto su tanti campioni. Nel 1938 si trasferì a Berkeley, in California, dove costruì uno dei più importanti centri di statistica del mondo.`, legame: R`Gli intervalli di confidenza e gli errori di primo e secondo tipo di questo argomento sono le idee di Neyman e Pearson.` },

    { matematico: 'George Gallup', anni: '1901–1984', titolo: 'Due milioni di risposte sbagliate', testo: R`Nel 1936 gli Stati Uniti sceglievano il presidente: Franklin Roosevelt contro Alf Landon. La rivista *Literary Digest* spedì circa dieci milioni di schede, e ne tornarono circa due milioni e quattrocentomila. Il verdetto: vince Landon, con il $57\%$. Gli indirizzi però venivano da elenchi del telefono e registri delle automobili. Era il tempo della Grande Depressione, e telefono e auto li avevano soprattutto i più ricchi. In più rispose solo chi ne aveva voglia. Il giovane George Gallup intervistò un campione molto più piccolo, costruito per somigliare agli elettori veri. E diede vincente Roosevelt. Roosevelt vinse con circa il $61\%$ dei voti, in $46$ stati su $48$. Il *Literary Digest* chiuse due anni dopo.`, legame: R`Un campione enorme ma distorto sbaglia, uno più piccolo ma rappresentativo no: la grandezza non corregge la distorsione.` }
  ]
});
})();
