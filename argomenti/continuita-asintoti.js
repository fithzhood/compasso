(function () {
const R = String.raw;
/* allenamento. Gli asintoti si scrivono come equazioni di rette (x = 2, y = 3, y = 2x + 1); la casella
   toglie gli spazi e legge − come -. Con una risposta «x = …» fra le accettate, il «2» da solo non basta.
   La specie di una discontinuità si scrive a parole, con la stessa casella per le tre specie così la
   casella non suggerisce niente. I parametri sono numeri. */
const SIMB = ['=', '−', '/', '±', ';'];
const SEGNA_AS = 'es. x = 5 oppure y = 2';
const vert = c => ({ tipo: 'testo', accettate: ['x=' + c, 'retta x=' + c, 'la retta x=' + c, 'asintoto x=' + c], segnaposto: SEGNA_AS, simboli: SIMB });
const vertDue = c => ({ tipo: 'testo', accettate: ['x=' + c + ';x=-' + c, 'x=-' + c + ';x=' + c, 'x=' + c + ',x=-' + c, 'x=-' + c + ',x=' + c, 'x=' + c + ' e x=-' + c, 'x=-' + c + ' e x=' + c, 'x=±' + c, 'x=+-' + c, 'x=' + c + ';-' + c, 'x=-' + c + ';' + c], segnaposto: 'es. x = 1; x = −1', simboli: SIMB });
const orizz = q => ({ tipo: 'testo', accettate: ['y=' + q, 'retta y=' + q, 'la retta y=' + q, 'asintoto y=' + q], segnaposto: SEGNA_AS, simboli: SIMB });
/* asintoto obliquo y = mx + q (m, q interi, m ≠ 0): anche con q davanti, 2*x, e in forma implicita */
function obliquo(m, q) {
  const mx = m === 1 ? 'x' : m === -1 ? '-x' : m + 'x';
  const segno = t => (t[0] === '-' ? t : '+' + t);
  const acc = [];
  [mx].concat(/^-?\d/.test(mx) ? [mx.replace('x', '*x')] : []).forEach(t => {
    acc.push('y=' + t + (q ? segno(String(q)) : ''));
    if (q) acc.push('y=' + q + segno(t));
  });
  [1, -1].forEach(s => {
    const A = s * m, C = s * q;
    const ax = A === 1 ? 'x' : A === -1 ? '-x' : A + 'x', by = s === 1 ? '-y' : '+y';
    acc.push(ax + by + (C ? segno(String(C)) : '') + '=0');
    acc.push(ax + by + '=' + (C ? -C : 0));
  });
  return { tipo: 'testo', accettate: Array.from(new Set(acc)), segnaposto: 'es. y = 2x + 1', simboli: SIMB };
}
const SEGNA_SP = 'prima, seconda o terza specie';
const specie = (nome, n, extra) => ({ tipo: 'testo', accettate: [nome, nome + ' specie', 'di ' + nome, 'di ' + nome + ' specie', 'discontinuità di ' + nome + ' specie', n, n + 'a', n + 'ª', n + '° specie', n + 'a specie', n + 'ª specie'].concat(extra), segnaposto: SEGNA_SP, simboli: [] });
const PRIMA = specie('prima', '1', ['i', 'salto', 'a salto', 'prima (salto)', 'prima specie (salto)', 'prima, salto', 'prima specie, salto']);
const SECONDA = specie('seconda', '2', ['ii']);
const TERZA = specie('terza', '3', ['iii', 'eliminabile', 'discontinuità eliminabile', 'terza (eliminabile)', 'terza specie (eliminabile)', 'terza, eliminabile', 'terza specie, eliminabile']);
/* per gli avanzati: le stesse liste dell'allenamento, più le forme che accettavano già */
const piu = (r, ...f) => Object.assign({}, r, { accettate: r.accettate.concat(f) });
const num = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'un numero, es. −2', simboli: ['−', '/'] });
COMPASSO.registra({
  id: 'continuita-asintoti',
  titolo: 'Continuità e asintoti',

  introduzione: R`Un termometro segna $36{,}5$ gradi alle otto e $37{,}8$ alle nove. È passato per $37$? Sì, se la temperatura è salita senza fare salti.

«Senza salti» è l'idea di **funzione continua**. Il suo grafico si disegna senza staccare la penna dal foglio.

Qui impari a trovare i punti dove una funzione non è continua, e a classificarli. Poi trovi gli **asintoti**: le rette a cui il grafico si avvicina sempre di più. Con queste due cose puoi già abbozzare un grafico.

Ti servono i limiti (destro, sinistro e all'infinito) e il dominio di una funzione.`,

  inBreve: [
    R`$f$ è continua in $x_0$ se $\lim_{x \to x_0} f(x) = f(x_0)$. Il valore esiste, il limite è finito, e i due numeri sono uguali.`,
    R`Polinomi, frazioni, radici, esponenziali, logaritmi, seno e coseno sono continui dove sono definiti. Per il loro limite basta sostituire.`,
    R`La specie di una discontinuità si legge dai due limiti laterali. Finiti e diversi: prima specie (salto). Almeno uno infinito o inesistente: seconda specie. Uguali e finiti, ma il valore manca o è diverso: terza specie (eliminabile).`,
    R`Teorema degli zeri: se $f$ è continua su $[a, b]$ e agli estremi ha segni opposti, in mezzo si annulla almeno una volta.`,
    R`Asintoto verticale $x = c$: in $c$ un limite laterale è infinito. Asintoto orizzontale $y = q$: all'infinito $f(x)$ tende a $q$. Asintoto obliquo $y = mx + q$: prima $m = \lim \frac{f(x)}{x}$, poi $q = \lim (f(x) - mx)$.`
  ],

  sezioni: [
    { id: 'definizione', titolo: 'Funzione continua in un punto e in un intervallo', testo: R`Prendi $f(x) = x^2 - 3x$ e avvicina $x$ a $2$. I valori di $f$ si avvicinano a $-2$. E $f(2)$ vale proprio $-2$.

Il numero a cui $f$ *tende* è uguale al valore che $f$ *ha*. Allora lì il grafico non ha strappi: $f$ è **continua**.

>* **Continuità in un punto.** $f$ è continua in $x_0$ se $$\lim_{x \to x_0} f(x) = f(x_0).$$

Questa uguaglianza chiede tre cose. Ogni discontinuità nasce da una che manca.

1. $f(x_0)$ esiste.
2. Il limite per $x \to x_0$ esiste ed è **finito**.
3. I due numeri sono uguali.

$f$ è **continua a destra** in $x_0$ se $\lim_{x \to x_0^+} f(x) = f(x_0)$. Allo stesso modo è continua a sinistra.

>* **Continuità in un intervallo.** $f$ è continua in $[a, b]$ se lo è in ogni punto. In $a$ basta da destra, in $b$ da sinistra.

?? Sia $f(x) = x + 1$ per $x < 0$, $f(0) = 3$, $f(x) = x^2 + 1$ per $x > 0$. È continua in $0$?
[ ] sì: $f(0)$ esiste
[ ] sì: i limiti laterali sono uguali
[x] no: limite e valore sono diversi
=> Il limite vale $1$. Da sinistra e da destra, infatti, $f$ tende a $1$. Il valore però è $3$: manca la terza condizione.

>! $\frac{1}{x}$ è continua nel suo dominio, ma in $x = 0$ non esiste. Quindi $0$ è un punto di discontinuità.` },

    { id: 'funzioni-elementari', titolo: 'Le funzioni elementari sono continue', testo: R`Quasi tutte le funzioni che usi a scuola sono continue nel loro dominio.

>* Sono continue dove sono definite: **polinomi**, **razionali fratte**, **radici**, $\sin x$, $\cos x$, $\tan x$, **esponenziali**, **logaritmi**, valore assoluto.

>* Somma, differenza, prodotto e quoziente di funzioni continue sono continui. Per il quoziente $\frac{f}{g}$ serve $g(x_0) \ne 0$. Anche la **composta** di funzioni continue è continua.

Quindi per il limite di una funzione continua **basta sostituire**.

~ \lim_{x \to 0} \frac{e^x + \cos x}{x + 2} :: sopra e sotto ci sono funzioni continue, e in $0$ il denominatore vale $2 \ne 0$
~ = \frac{\evid{e^0} + \evid{\cos 0}}{\evid{0} + 2} :: quindi si sostituisce $x = 0$
~ = \frac{1 + 1}{2} = \evidb{1} :: finito: nessuna forma indeterminata da sciogliere

Le discontinuità stanno in pochi posti:

- dove si annulla un denominatore;
- al bordo del dominio di un logaritmo o di una radice;
- dove una funzione **definita a tratti** cambia formula.

?? In quali punti $f(x) = \dfrac{x + 1}{x^2 - 4}$ non è continua?
[x] in $x = -2$ e in $x = 2$
[ ] solo in $x = -1$
[ ] in nessun punto
=> Il denominatore si annulla per $x = \pm 2$: lì $f$ non esiste. In $x = -1$ si annulla il numeratore, e $f(-1) = 0$ è un valore come un altro.

>! Continua non vuol dire derivabile: $|x|$ è continua in $0$, ma lì fa un angolo. Invece una funzione derivabile è sempre continua.` },

    { id: 'discontinuita', titolo: 'I punti di discontinuità e la loro classificazione', testo: R`Dove $f$ non è continua, il grafico ha un buco, un salto o una fuga verso l'infinito. Per sapere quale, calcola i due **limiti laterali**: $$l^- = \lim_{x \to x_0^-} f(x), \qquad l^+ = \lim_{x \to x_0^+} f(x).$$

Un **punto di discontinuità** può stare nel dominio, oppure esserne escluso. Esempio: $x_0 = 0$ per $\frac{1}{x}$.

| specie | limiti laterali | come appare il grafico |
|---|---|---|
| prima (salto) | finiti e diversi | salta; il **salto** è $s = l^+ - l^-$ |
| seconda | almeno uno infinito o inesistente | fugge all'infinito, o oscilla |
| terza (eliminabile) | uguali e finiti, ma $f(x_0)$ manca o è diverso | un buco in una curva intera |

>* Prima calcoli i due limiti laterali, poi leggi la specie nella tabella.

### Terza specie: il buco

$f(x) = \frac{x^2 - 4}{x - 2}$ non esiste in $x = 2$, ma il limite c'è.

~ \lim_{x \to 2} \frac{x^2 - 4}{x - 2} :: sostituendo viene $\frac{0}{0}$: bisogna trasformare
~ \lim_{x \to 2} \frac{\evid{(x - 2)(x + 2)}}{x - 2} :: scompongo la differenza di quadrati
~ \lim_{x \to 2} \evid{(x + 2)} :: semplifico: si può, perché nel limite $x \ne 2$
~ = \evidb{4} :: ora la funzione è continua e sostituisco

Il limite vale $4$, ma il valore non c'è: discontinuità **eliminabile**. Il grafico è una retta con un buco in $(2; 4)$. Per chiuderlo basta porre $f(2) = 4$. Questo si chiama **prolungamento per continuità**.

[[grafico:eliminabile]]

### Prima specie: il salto

Sia $f(x) = x + 1$ per $x < 1$ e $f(x) = x - 2$ per $x \ge 1$. In $x = 1$ hai $l^- = 2$ e $l^+ = -1$: finiti e diversi.

Il **salto** vale $s = l^+ - l^- = -1 - 2 = -3$. Cambiare il valore in un punto non ricuce i due pezzi.

[[grafico:salto]]

### Seconda specie: la fuga

$\frac{1}{x^2}$ in $x = 0$ ha i due limiti laterali uguali a $+\infty$. La retta $x = 0$ è un asintoto verticale.

> Anche $\sin\frac{1}{x}$ in $0$ è di seconda specie: oscilla, e i limiti laterali non esistono.

>! Per la seconda specie basta **un solo** limite laterale infinito. $2^{1/x}$ in $0$ ha $l^- = 0$ e $l^+ = +\infty$: seconda specie, non prima.

?? In $x_0$ il limite sinistro vale $5$ e il limite destro vale $+\infty$. Di che specie è la discontinuità?
[ ] prima, perché uno dei due limiti è finito
[x] seconda
[ ] terza
=> Basta un limite laterale infinito. La prima specie vuole **tutti e due** i limiti finiti.` },

    { id: 'teoremi', titolo: 'I teoremi sulle funzioni continue', testo: R`Questi tre teoremi sembrano ovvi, ma valgono solo con le loro ipotesi. Tutti chiedono $f$ continua su un intervallo **chiuso e limitato** $[a, b]$.

>* **Teorema di Weierstrass.** Se $f$ è continua in $[a, b]$, in $[a, b]$ ha un **massimo assoluto** e un **minimo assoluto**.

>* **Teorema degli zeri** (di Bolzano). Sia $f$ continua in $[a, b]$, con segni opposti agli estremi: $f(a) \cdot f(b) < 0$. Allora esiste almeno un $c \in (a, b)$ con $f(c) = 0$.

>* **Teorema dei valori intermedi.** Se $f$ è continua in $[a, b]$, assume **tutti** i valori fra il suo minimo e il suo massimo.

È il teorema del termometro: da $36{,}5$ a $37{,}8$ senza salti, la temperatura passa per $37$.

Se manca un'ipotesi, il teorema può fallire:

| ipotesi che manca | controesempio | che cosa va storto |
|---|---|---|
| intervallo chiuso | $\frac{1}{x}$ su $(0, 1]$ | vicino a $0$ cresce senza fine: nessun massimo |
| continuità | $-1$ per $x < 0$ e $1$ per $x \ge 0$, su $[-1, 1]$ | cambia segno saltando lo zero |

Esempio: $x^3 - x - 1 = 0$ ha una soluzione fra $1$ e $2$. Infatti il polinomio è continuo, $f(1) = -1$ e $f(2) = 5$.

Trascina $A$ e $B$ sulla curva e guarda il segno di $f(a) \cdot f(b)$.

[[grafico:zeri]]

>! Il teorema degli zeri vale in un verso solo. $x^2 - 1$ su $[-2, 2]$ ha $f(-2) \cdot f(2) = 9 > 0$, eppure ha due zeri. E garantisce **almeno** uno zero, non uno solo.

?? $f$ è continua in $[0, 4]$, con $f(0) = 3$ e $f(4) = 7$. Che cosa si può dire con certezza?
[x] $f$ vale $5$ in qualche punto
[ ] $f$ si annulla
[ ] $f$ non ha zeri
=> Il minimo è al più $3$. Il massimo è almeno $7$. Quindi, per i valori intermedi, $f$ assume anche $5$. Sugli zeri non si sa niente.` }
,

    { id: 'bisezione', titolo: 'Il metodo di bisezione', testo: R`Il teorema degli zeri dice che una soluzione **c'è**, ma non dove. Il **metodo di bisezione** la chiude in un intervallo sempre più piccolo.

Parti da $[a, b]$, con $f$ continua e $f(a) \cdot f(b) < 0$. Poi:

1. Calcola il punto medio $m = \frac{a + b}{2}$ e il valore $f(m)$.
2. Se $f(m) = 0$, la soluzione è $m$.
3. Se $f(a)$ e $f(m)$ hanno segni opposti, tieni $[a, m]$.
4. Altrimenti tieni $[m, b]$.
5. Ricomincia dal passo 1 con il nuovo intervallo, lungo la metà.

Esempio con $f(x) = x^3 - x - 1$ su $[1, 2]$, dove $f(1) = -1$ e $f(2) = 5$:

| passo | $m$ | $f(m)$ | nuovo intervallo |
|---|---|---|---|
| 1 | 1,5 | 0,875 | [1; 1,5] |
| 2 | 1,25 | −0,297 | [1,25; 1,5] |
| 3 | 1,375 | 0,225 | [1,25; 1,375] |

Dopo tre passi sai che lo zero sta fra $1{,}25$ e $1{,}375$. Il valore vero è $1{,}3247\ldots$

Ogni passo dimezza l'intervallo. Dopo $n$ passi è lungo $\frac{b - a}{2^n}$. Se prendi il punto medio come stima, l'errore è al massimo la metà: $\frac{b - a}{2^{n+1}}$.

?? Partendo da $[1, 2]$, quanti passi di bisezione servono perché l'intervallo sia lungo meno di $0{,}01$?
[ ] $5$
[x] $7$
[ ] $100$
=> Dopo $n$ passi la lunghezza è $\frac{1}{2^n}$. Con $n = 6$ viene $\frac{1}{64} \approx 0{,}016$, troppo. Con $n = 7$ viene $\frac{1}{128} \approx 0{,}008$. L'intervallo si dimezza, non cala di $0{,}01$ a ogni passo.

>! Se in $[a, b]$ ci sono più zeri, la bisezione ne trova **uno**, e non sai quale. Prima separali con lo studio del segno.` },

    { id: 'asintoti-verticali-orizzontali', titolo: 'Asintoti verticali e orizzontali', testo: R`Un **asintoto** è una retta a cui il grafico si avvicina sempre di più, senza fine. Succede vicino a un punto escluso dal dominio, oppure all'infinito.

>* **Asintoto verticale.** La retta $x = c$ è asintoto verticale se in $c$ almeno un limite laterale è infinito.

Cercalo **solo** dove $f$ non è definita, per esempio dove si annulla un denominatore. Per $f(x) = \frac{3x - 1}{x + 2}$ l'unico candidato è $x = -2$.

~ \lim_{x \to -2^-} \frac{3x - 1}{x + 2} :: il denominatore si annulla: vediamo che cosa fa il numeratore
~ = \frac{\evid{-7}}{\evid{0^-}} :: in $-2$ il numeratore vale $-7$; a sinistra di $-2$ il denominatore è negativo e vicinissimo a zero
~ = \evidb{+\infty} :: $-7$ diviso un numero negativo vicino a zero dà un numero positivo enorme

Da destra il limite vale $-\infty$. La retta $x = -2$ è asintoto verticale.

>* **Asintoto orizzontale.** La retta $y = q$ è asintoto orizzontale se $\lim_{x \to +\infty} f(x) = q$, con $q$ finito. Lo stesso per $x \to -\infty$.

Calcola separatamente i limiti verso $+\infty$ e verso $-\infty$. Per esempio $e^x$ ha l'asintoto $y = 0$ solo a sinistra.

Per una razionale fratta basta confrontare i gradi di numeratore e denominatore.

| gradi | asintoto orizzontale |
|---|---|
| numeratore minore | $y = 0$ |
| uguali | $y =$ rapporto dei coefficienti direttivi |
| numeratore maggiore | nessuno |

Per $\frac{3x - 1}{x + 2}$ i gradi sono uguali. L'asintoto è $y = \frac{3}{1} = 3$.

[[grafico:asintoti]]

?? Il denominatore di una razionale fratta si annulla in $x = 3$. La retta $x = 3$ è sicuramente un asintoto verticale?
[ ] sì, sempre
[ ] solo se il denominatore è di primo grado
[x] no: può esserci un buco
=> Dipende dal numeratore. Se in $3$ si annulla anche lui, esce $\frac{0}{0}$: prima semplifica. Per esempio $\frac{x^2 - 9}{x - 3}$ in $3$ tende a $6$. Il grafico ha un buco, non un asintoto.

>! Un asintoto orizzontale si può **attraversare**. $\frac{\sin x}{x}$ ha l'asintoto $y = 0$ e lo taglia in ogni $x = k\pi$, con $k \ne 0$.` },

    { id: 'asintoto-obliquo', titolo: 'L\'asintoto obliquo', testo: R`Certe funzioni, all'infinito, si stendono lungo una retta inclinata. Quella retta è un asintoto **obliquo**.

>* **Asintoto obliquo.** La retta $y = mx + q$ è asintoto obliquo per $x \to +\infty$ se questi due limiti sono finiti: $$\begin{aligned} m &= \lim_{x \to +\infty} \frac{f(x)}{x} \quad (\text{con } m \ne 0) \\ q &= \lim_{x \to +\infty} \big(f(x) - mx\big) \end{aligned}$$ Lo stesso vale per $x \to -\infty$.

Perché? Lontano, $f(x)$ è quasi $mx + q$. Diviso per $x$ è quasi $m + \frac{q}{x}$, che tende a $m$. Tolto $mx$, resta quasi $q$. Quindi prima trovi $m$, poi $q$.

Esempio: $f(x) = \frac{x^2 + 1}{x - 1}$.

~ m = \lim_{x \to \infty} \frac{f(x)}{x} = \lim_{x \to \infty} \frac{x^2 + 1}{\evid{x(x - 1)}} :: dividere la frazione per $x$ vuol dire moltiplicare il denominatore per $x$
~ m = \evidb{1} :: sopra e sotto c'è grado $2$: conta il rapporto dei coefficienti di $x^2$
~ q = \lim_{x \to \infty} \left(\frac{x^2 + 1}{x - 1} \evid{- x}\right) :: ora tolgo $mx$, cioè $x$
~ q = \lim_{x \to \infty} \frac{x^2 + 1 \evid{- x^2 + x}}{x - 1} :: denominatore comune: $x$ diventa $\frac{x(x - 1)}{x - 1} = \frac{x^2 - x}{x - 1}$
~ q = \lim_{x \to \infty} \frac{x + 1}{x - 1} = \evidb{1} :: di nuovo gradi uguali
~ y = x + 1 :: l'asintoto obliquo, a destra e a sinistra

C'è anche l'asintoto verticale $x = 1$. Trascina $P$ lontano e guarda quanto manca alla retta.

[[grafico:obliquo]]

L'asintoto obliquo manca in tre casi:

- $m$ è infinito: per $x^2$ hai $\frac{x^2}{x} = x \to \infty$.
- $m = 0$: allora l'asintoto, se c'è, è orizzontale.
- $q$ è infinito o non esiste: per $x + \sin x$ hai $m = 1$, ma $f(x) - x = \sin x$ oscilla.

>* Da ogni lato c'è **al massimo un** asintoto non verticale: orizzontale oppure obliquo.

>! Per una razionale fratta l'obliquo c'è solo se il numeratore ha grado **esattamente uno** in più. Lo trovi anche dividendo i polinomi: $\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x - 1}$. Il quoziente $x + 1$ è l'asintoto.

?? Qual è l'asintoto obliquo di $f(x) = \dfrac{2x^2 + x}{x - 1}$?
[x] $y = 2x + 3$
[ ] $y = 2x$
[ ] $y = 2x + 1$
=> $m = \lim \frac{2x^2 + x}{x^2 - x} = 2$. Poi $q = \lim \left(\frac{2x^2 + x}{x - 1} - 2x\right) = \lim \frac{3x}{x - 1} = 3$. Con $y = 2x$ hai dimenticato $q$. Con $y = 2x + 1$ hai copiato il $+x$ del numeratore.` },

    { id: 'tratti-parametro', titolo: 'Funzioni a tratti, parametri e grafico probabile', testo: R`In una funzione **definita a tratti** la formula cambia in certi punti. Dentro ogni tratto $f$ è già continua. Quindi controlli solo i **punti di raccordo**, dove cambia la formula.

>* Nel punto di raccordo $x_0$ imponi $$\lim_{x \to x_0^-} f(x) = \lim_{x \to x_0^+} f(x) = f(x_0).$$ Se c'è un parametro, questa uguaglianza diventa un'equazione da risolvere.

Esempio: $$f(x) = \begin{cases} x^2 & x \le 1 \\ 2x + k & x > 1 \end{cases}$$

~ f(1) = 1^2 = 1 :: in $x = 1$ vale la prima formula, perché lì c'è $x \le 1$
~ \lim_{x \to 1^-} x^2 = 1 :: da sinistra si usa ancora $x^2$
~ \lim_{x \to 1^+} (2x + k) = \evid{2 + k} :: da destra si usa $2x + k$
~ 2 + k = 1 :: i tre numeri devono essere uguali
~ k = \evidb{-1} :: l'unico valore che ricuce i due tratti

Per ogni altro $k$ resta un salto $s = (2 + k) - 1 = 1 + k$. Muovi il cursore $k$: il salto si chiude per un solo valore.

[[grafico:parametroK]]

?? $f(x) = 3x$ per $x < 2$ e $f(x) = x^2 + k$ per $x \ge 2$. Per quale $k$ è continua in $x = 2$?
[x] $k = 2$
[ ] $k = 6$
[ ] $k = -2$
=> Da sinistra $3x \to 6$. Da destra, e in $2$, vale la seconda formula: $4 + k$. Quindi $4 + k = 6$ e $k = 2$. Con $k = 6$ hai dimenticato il $4$ di $x^2$. Con $k = -2$ hai scritto $4 = 6 + k$.

### Il grafico probabile

Con continuità, limiti e asintoti puoi già abbozzare un grafico. Segui quest'ordine:

1. Trova dominio e simmetrie (pari, dispari).
2. Trova le intersezioni con gli assi e il segno.
3. Calcola i limiti agli estremi del dominio.
4. Trova gli asintoti.
5. Disegna prima gli asintoti, poi raccorda i pezzi rispettando il segno.

>! Senza le derivate non sai dove la curva sale e dove scende. Sai però dove non può passare. Spesso basta a scoprire un errore di calcolo.` }
  ],

  grafici: {
    eliminabile: {
      tipo: 'piano', x: [-4, 5], y: [-3, 8],
      parametri: [{ nome: 'p', min: -3.9, max: 4.9, passo: 0.03, valore: 0.5, nascosto: true }],
      funzioni: [{ f: '(x^2 - 4)/(x - 2)', etichetta: 'y = (x² − 4)/(x − 2)', colore: 1 }],
      punti: [{ x: 2, y: 4, etichetta: '(2; 4)', posizione: 'alto-sinistra', vuoto: true, colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['p', '(p^2 - 4)/(p - 2)'], trascina: true, etichetta: 'P', posizione: 'basso-destra', colore: 2 },
        { tipo: 'testo', p: [-3.8, 7.2], testo: 'x = {{p}}     f(x) = {{(p^2 - 4)/(p - 2)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P verso x = 2, prima da sinistra e poi da destra, e leggi f(x): si avvicina a 4 da tutte e due le parti. Però in x = 2 la funzione non c\'è: il punto (2; 4) resta vuoto.'
    },
    salto: {
      tipo: 'piano', x: [-4, 5], y: [-5, 6],
      parametri: [{ nome: 'p', min: -3.9, max: 4.9, passo: 0.03, valore: -1.5, nascosto: true }],
      funzioni: [
        { f: 'x + 1', etichetta: 'y = x + 1', colore: 1, dominio: [-4, 1] },
        { f: 'x - 2', etichetta: 'y = x − 2', colore: 3, dominio: [1, 5] }
      ],
      punti: [
        { x: 1, y: 2, vuoto: true, colore: 1 },
        { x: 1, y: -1, colore: 3 }
      ],
      elementi: [
        { tipo: 'punto', p: ['p', 'p + 1 - 3*(1 + sign(p - 1))/2'], trascina: true, etichetta: 'P', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'testo', p: [-3.8, 5.2], testo: 'x = {{p}}     f(x) = {{p + 1 - 3*(1 + sign(p - 1))/2}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P verso x = 1 da sinistra: f(x) si avvicina a 2. Poi fallo arrivare da destra: si avvicina a −1. Due limiti laterali finiti e diversi: è un salto.'
    },
    asintoti: {
      tipo: 'piano', x: [-10, 8], y: [-8, 14], passo: [2, 2],
      parametri: [{ nome: 'p', min: -9.9, max: 7.9, passo: 0.03, valore: 3, nascosto: true }],
      funzioni: [{ f: '(3x - 1)/(x + 2)', colore: 1 }],
      elementi: [
        { tipo: 'verticale', x: -2, asintoto: true, colore: 3 },
        { tipo: 'orizzontale', y: 3, asintoto: true, etichetta: 'y = 3', colore: 3 },
        { tipo: 'punto', p: ['p', '(3p - 1)/(p + 2)'], trascina: true, etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-9.7, 13], testo: 'x = {{p}}     f(x) = {{(3p - 1)/(p + 2)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P vicino a x = −2, da una parte e dall\'altra: f(x) scappa verso +∞ o verso −∞. Poi portalo lontano, a destra e a sinistra: f(x) si avvicina a 3 senza arrivarci mai.'
    },
    obliquo: {
      tipo: 'piano', x: [-6, 8], y: [-8, 12], passo: [2, 2],
      parametri: [{ nome: 'p', min: -5.9, max: 7.9, passo: 0.03, valore: 3, nascosto: true }],
      funzioni: [{ f: '(x^2 + 1)/(x - 1)', etichetta: 'y = (x² + 1)/(x − 1)', colore: 1 }],
      elementi: [
        { tipo: 'retta', m: 1, q: 1, etichetta: 'y = x + 1', tratteggio: true, colore: 3 },
        { tipo: 'verticale', x: 1, asintoto: true, tratteggio: true, etichetta: 'x = 1', colore: 3 },
        { tipo: 'segmento', da: ['p', 'p + 1'], a: ['p', '(p^2 + 1)/(p - 1)'], colore: 4 },
        { tipo: 'punto', p: ['p', '(p^2 + 1)/(p - 1)'], trascina: true, etichetta: 'P', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'testo', p: [-5.8, 11], testo: 'f(x) − (x + 1) = {{(p^2 + 1)/(p - 1) - p - 1}}', ancora: 'start' }
      ],
      didascalia: 'Il segmento viola misura quanto la curva dista dalla retta y = x + 1. Trascina P lontano a destra e poi lontano a sinistra: la distanza si riduce verso zero, ed è questo che dice q = lim (f(x) − mx).'
    },
    parametroK: {
      tipo: 'piano', x: [-4.5, 4.5], y: [-5, 12],
      parametri: [{ nome: 'k', min: -3, max: 3, passo: 0.5, valore: 1, etichetta: 'k' }],
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [-4, 1] },
        { f: '2x + k', etichetta: 'y = 2x + k', colore: 3, dominio: [1, 4] }
      ],
      punti: [
        { x: 1, y: 1, etichetta: 'f(1) = 1', posizione: 'basso-destra', vuoto: false, colore: 1 },
        { x: 1, y: '2 + k', etichetta: 'limite destro = {{2 + k}}', posizione: 'destra', vuoto: true, colore: 3 }
      ],
      elementi: [{ tipo: 'testo', p: [-4.2, 11], testo: 'salto = {{2 + k - 1}}', ancora: 'start' }],
      didascalia: 'Muovi k: il salto vale 1 + k e si annulla solo per k = −1, l\'unico valore che rende continua la funzione a tratti.'
    },
    zeri: {
      tipo: 'piano', x: [-2.5, 2.5], y: [-4, 5],
      parametri: [
        { nome: 'a', min: -2.4, max: 2.4, passo: 0.05, valore: -1.5, nascosto: true },
        { nome: 'b', min: -2.4, max: 2.4, passo: 0.05, valore: 1, nascosto: true }
      ],
      funzioni: [{ f: 'x^3 - 3x + 1', etichetta: 'y = x³ − 3x + 1', colore: 1 }],
      elementi: [
        { tipo: 'segmento', da: ['a', 0], a: ['b', 0], colore: 2 },
        { tipo: 'segmento', da: ['a', 0], a: ['a', 'a^3 - 3a + 1'], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: ['b', 0], a: ['b', 'b^3 - 3b + 1'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['a', 'a^3 - 3a + 1'], trascina: true, etichetta: 'A', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: ['b', 'b^3 - 3b + 1'], trascina: true, etichetta: 'B', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [-2.4, 4.5], testo: 'f(a) · f(b) = {{(a^3 - 3a + 1)*(b^3 - 3b + 1)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina A e B lungo la curva. Quando il prodotto f(a) · f(b) è negativo, fra a e b la curva taglia sempre l\'asse x. Poi cerca due punti con prodotto positivo e con due zeri in mezzo: il teorema non li prevede, ma possono esserci.'
    }
  },

  esempi: [
    { titolo: 'Una discontinuità eliminabile', problema: R`Studia la continuità di $f(x) = \dfrac{x^2 - 9}{x - 3}$ in $x_0 = 3$ e, se possibile, prolunga la funzione con continuità.`, passi: [
      R`Dominio: $x \ne 3$. Il punto $x_0 = 3$ non appartiene al dominio, quindi la prima delle tre condizioni di continuità già non vale.`,
      R`Calcolo il limite. La forma è $\dfrac{0}{0}$: scompongo il numeratore, $x^2 - 9 = (x-3)(x+3)$, e semplifico per $x \ne 3$: $$\lim_{x \to 3} \frac{(x-3)(x+3)}{x-3} = \lim_{x \to 3}(x+3) = 6.$$`,
      R`Il limite esiste ed è finito, e i due limiti laterali coincidono: la discontinuità è di **terza specie**, cioè eliminabile.`,
      R`Basta definire $g(3) = 6$: la funzione $g(x) = x + 3$ coincide con $f$ dove $f$ è definita ed è continua ovunque. È il **prolungamento per continuità**.`
    ], risultato: R`Discontinuità eliminabile in $x = 3$; il prolungamento continuo è $g(x) = x + 3$.` },

    { titolo: 'Un salto', problema: R`Classifica la discontinuità di $f(x) = \dfrac{|x - 2|}{x - 2}$ in $x_0 = 2$ e calcola il salto.`, passi: [
      R`Tolgo il valore assoluto: per $x > 2$ si ha $|x-2| = x-2$, quindi $f(x) = 1$; per $x < 2$ si ha $|x-2| = -(x-2)$, quindi $f(x) = -1$.`,
      R`Limite sinistro: $\lim_{x \to 2^-} f(x) = -1$. Limite destro: $\lim_{x \to 2^+} f(x) = 1$.`,
      R`Sono entrambi finiti ma diversi: discontinuità di **prima specie**.`,
      R`Salto: $s = l^+ - l^- = 1 - (-1) = 2$. Cambiare il valore di $f$ in $2$ non serve: da una parte la funzione vale $-1$, dall'altra $1$.`
    ], risultato: R`Prima specie (salto) in $x = 2$, con salto $s = 2$.` },

    { titolo: 'Trovare il parametro', problema: R`Determina $k$ in modo che $f(x) = \begin{cases} x^2 + 1 & x \le 2 \\ kx - 3 & x > 2 \end{cases}$ sia continua su tutto $\mathbb{R}$.`, passi: [
      R`Su $(-\infty, 2)$ e su $(2, +\infty)$ la funzione è polinomiale, quindi continua qualunque sia $k$: l'unico punto da controllare è il raccordo $x_0 = 2$.`,
      R`Valore e limite sinistro (dove vale la prima formula, che include $x = 2$): $f(2) = 4 + 1 = 5$ e $\lim_{x \to 2^-} f(x) = 5$.`,
      R`Limite destro: $\lim_{x \to 2^+} (kx - 3) = 2k - 3$.`,
      R`Impongo l'uguaglianza dei tre numeri: $2k - 3 = 5$, da cui $k = 4$.`,
      R`Controllo: con $k = 4$ il ramo destro è $4x - 3$, che in $2$ vale $5$. I due tratti si raccordano. ✓`
    ], risultato: R`$k = 4$` },

    { titolo: 'Asintoto verticale e orizzontale', problema: R`Trova gli asintoti di $f(x) = \dfrac{3x - 1}{x + 2}$.`, passi: [
      R`Dominio: $x \ne -2$. L'unico candidato per un asintoto verticale è $x = -2$.`,
      R`In $x = -2$ il numeratore vale $-7 \ne 0$, quindi il limite è infinito: $\lim_{x \to -2^-} f(x) = \dfrac{-7}{0^-} = +\infty$ e $\lim_{x \to -2^+} f(x) = \dfrac{-7}{0^+} = -\infty$. La retta $x = -2$ è asintoto verticale.`,
      R`All'infinito, numeratore e denominatore hanno lo stesso grado: $\lim_{x \to \pm\infty} \dfrac{3x-1}{x+2} = 3$, il rapporto dei coefficienti di $x$.`,
      R`La retta $y = 3$ è asintoto orizzontale da entrambe le parti; l'obliquo non si cerca nemmeno, perché su ogni lato c'è al massimo un asintoto non verticale.`
    ], risultato: R`Asintoto verticale $x = -2$, asintoto orizzontale $y = 3$.` },

    { titolo: 'Asintoto obliquo', problema: R`Trova tutti gli asintoti di $f(x) = \dfrac{2x^2 - x + 1}{x - 1}$.`, passi: [
      R`Dominio: $x \ne 1$. In $x = 1$ il numeratore vale $2 - 1 + 1 = 2 \ne 0$, quindi $x = 1$ è asintoto verticale ($-\infty$ da sinistra, $+\infty$ da destra).`,
      R`Orizzontale: $\lim_{x \to \pm\infty} f(x) = \pm\infty$, perché il numeratore ha grado maggiore. Non c'è.`,
      R`Coefficiente angolare: $$m = \lim_{x \to \pm\infty} \frac{f(x)}{x} = \lim_{x \to \pm\infty} \frac{2x^2 - x + 1}{x^2 - x} = 2,$$ finito e diverso da zero.`,
      R`Termine noto: $$q = \lim_{x \to \pm\infty}\left(\frac{2x^2 - x + 1}{x - 1} - 2x\right) = \lim_{x \to \pm\infty} \frac{2x^2 - x + 1 - 2x^2 + 2x}{x - 1} = \lim_{x \to \pm\infty} \frac{x + 1}{x - 1} = 1.$$`,
      R`Verifica con la divisione fra polinomi: $\dfrac{2x^2 - x + 1}{x - 1} = 2x + 1 + \dfrac{2}{x-1}$, e il resto $\dfrac{2}{x-1}$ tende a zero. ✓`
    ], risultato: R`Asintoto verticale $x = 1$ e asintoto obliquo $y = 2x + 1$ (da entrambe le parti).` },

    { titolo: 'Teorema degli zeri e bisezione', problema: R`Mostra che $x^3 - x - 1 = 0$ ha una soluzione in $[1, 2]$ e localizzala con tre passi di bisezione.`, passi: [
      R`$f(x) = x^3 - x - 1$ è polinomiale, quindi continua in $[1, 2]$. Inoltre $f(1) = 1 - 1 - 1 = -1 < 0$ e $f(2) = 8 - 2 - 1 = 5 > 0$: per il teorema degli zeri esiste $c \in (1, 2)$ con $f(c) = 0$.`,
      R`Primo passo: $m = 1{,}5$ e $f(1{,}5) = 3{,}375 - 2{,}5 = 0{,}875 > 0$. Lo zero sta dove i segni sono discordi, cioè in $[1;\ 1{,}5]$.`,
      R`Secondo passo: $m = 1{,}25$ e $f(1{,}25) = 1{,}953125 - 2{,}25 = -0{,}296875 < 0$. Ora il cambio di segno è fra $1{,}25$ e $1{,}5$: nuovo intervallo $[1{,}25;\ 1{,}5]$.`,
      R`Terzo passo: $m = 1{,}375$ e $f(1{,}375) = 2{,}599609\ldots - 2{,}375 = 0{,}2246\ldots > 0$. Nuovo intervallo $[1{,}25;\ 1{,}375]$, lungo $\dfrac{1}{8}$.`,
      R`Come stima si prende il punto medio, $1{,}3125$, con errore al più $0{,}0625$. Il valore esatto è $1{,}3247\ldots$ ✓`
    ], risultato: R`Lo zero esiste ed è compreso fra $1{,}25$ e $1{,}375$.` }
  ]
,

  formulario: [
    { nome: 'Continuità in un punto', formula: R`\lim_{x \to x_0} f(x) = f(x_0)`, nota: R`Richiede tre cose insieme: $f(x_0)$ esiste, il limite esiste finito, i due valori coincidono.` },
    { nome: 'Continuità con i limiti laterali', formula: R`\lim_{x \to x_0^-} f(x) = \lim_{x \to x_0^+} f(x) = f(x_0)`, nota: R`È la forma da usare nelle funzioni definite a tratti.` },
    { nome: 'Discontinuità di prima specie (salto)', formula: R`l^- \ne l^+ \ \text{entrambi finiti}, \qquad s = l^+ - l^-`, nota: R`Il numero $s$ è il salto; non si può eliminare ridefinendo $f$.` },
    { nome: 'Discontinuità di seconda specie', formula: R`l^- = \pm\infty \quad \text{oppure} \quad l^+ = \pm\infty \quad \text{oppure un limite laterale non esiste}` },
    { nome: 'Discontinuità di terza specie (eliminabile)', formula: R`\lim_{x \to x_0} f(x) = l \ \text{finito}, \quad \text{ma } f(x_0) \ne l \ \text{o non definita}`, nota: R`Si elimina ponendo $f(x_0) = l$: è il prolungamento per continuità.` },
    { nome: 'Teorema di Weierstrass', formula: R`f \ \text{continua in} \ [a, b] \ \Rightarrow \ \exists \ \max_{[a,b]} f \ \text{e} \ \min_{[a,b]} f`, nota: R`Servono intervallo chiuso e limitato, e continuità su tutto l'intervallo.` },
    { nome: 'Teorema degli zeri (Bolzano)', formula: R`f \ \text{continua in} \ [a,b], \ f(a) \cdot f(b) < 0 \ \Rightarrow \ \exists \, c \in (a,b) : f(c) = 0`, nota: R`Garantisce almeno uno zero, non esattamente uno.` },
    { nome: 'Teorema dei valori intermedi', formula: R`f \ \text{continua in} \ [a,b] \ \Rightarrow \ f \ \text{assume ogni valore fra} \ \min f \ \text{e} \ \max f` },
    { nome: 'Bisezione: ampiezza dopo n passi', formula: R`\frac{b - a}{2^n}`, nota: R`Prendendo il punto medio come stima, l'errore è al più $\dfrac{b-a}{2^{n+1}}$.` },
    { nome: 'Asintoto verticale', formula: R`\lim_{x \to c^-} f(x) = \pm\infty \ \ \text{o} \ \ \lim_{x \to c^+} f(x) = \pm\infty \ \Rightarrow \ x = c`, nota: R`Si cerca solo nei punti esclusi dal dominio.` },
    { nome: 'Asintoto orizzontale', formula: R`\lim_{x \to +\infty} f(x) = q \ \text{finito} \ \Rightarrow \ y = q`, nota: R`Da calcolare separatamente per $x \to +\infty$ e per $x \to -\infty$.` },
    { nome: 'Asintoto obliquo', formula: R`m = \lim_{x \to \pm\infty} \frac{f(x)}{x}, \qquad q = \lim_{x \to \pm\infty} \big(f(x) - mx\big)`, nota: R`Esiste solo se $m$ è finito e diverso da $0$ e $q$ è finito.` },
    { nome: 'Asintoti di una funzione razionale fratta', formula: R`\frac{a_n x^n + \ldots}{b_m x^m + \ldots} \ : \quad n < m \Rightarrow y = 0; \quad n = m \Rightarrow y = \frac{a_n}{b_m}; \quad n = m + 1 \Rightarrow \text{obliquo}` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Funzione continua in $x_0$`, retro: R`$\lim_{x \to x_0} f(x) = f(x_0)$, con il limite finito e $x_0$ nel dominio.` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Le tre condizioni della continuità in $x_0$`, retro: R`1) $f(x_0)$ esiste; 2) il limite per $x \to x_0$ esiste finito; 3) i due numeri coincidono.` },
    { id: 'fc-03', sezione: 'definizione', tipo: 'definizione', fronte: R`Funzione continua in $[a, b]$`, retro: R`Continua in ogni punto interno, continua a destra in $a$ e a sinistra in $b$.` },
    { id: 'fc-04', sezione: 'definizione', tipo: 'concetto', fronte: R`$f(x) = \dfrac{1}{x}$ è continua?`, retro: R`Sì, in ogni punto del suo dominio $\mathbb{R} \setminus \{0\}$. In $0$ non è definita, quindi lì non è continua: $0$ è un punto di discontinuità di seconda specie.` },
    { id: 'fc-05', sezione: 'funzioni-elementari', tipo: 'concetto', fronte: R`Quali funzioni elementari sono continue nel loro dominio?`, retro: R`Tutte: polinomiali, razionali, irrazionali, goniometriche, esponenziali, logaritmiche, valore assoluto.` },
    { id: 'fc-06', sezione: 'funzioni-elementari', tipo: 'procedura', fronte: R`Limite di una funzione continua in $x_0$`, retro: R`Si calcola sostituendo: $\lim_{x \to x_0} f(x) = f(x_0)$.` },
    { id: 'fc-07', sezione: 'funzioni-elementari', tipo: 'concetto', fronte: R`Somma, prodotto e quoziente di funzioni continue`, retro: R`Somma, differenza e prodotto sono continue; il quoziente $\dfrac{f}{g}$ lo è dove $g(x_0) \ne 0$. Anche la composta è continua.` },
    { id: 'fc-08', sezione: 'funzioni-elementari', tipo: 'concetto', fronte: R`Continuità e derivabilità`, retro: R`Derivabile $\Rightarrow$ continua. Il viceversa è falso: $|x|$ è continua in $0$ ma non derivabile.` },
    { id: 'fc-09', sezione: 'discontinuita', tipo: 'definizione', fronte: R`Discontinuità di prima specie`, retro: R`I due limiti laterali esistono, sono finiti e diversi. Si chiama anche salto.` },
    { id: 'fc-10', sezione: 'discontinuita', tipo: 'formula', fronte: R`Salto in un punto di prima specie`, retro: R`$s = l^+ - l^-$, differenza fra limite destro e limite sinistro.` },
    { id: 'fc-11', sezione: 'discontinuita', tipo: 'definizione', fronte: R`Discontinuità di seconda specie`, retro: R`Almeno uno dei due limiti laterali è infinito oppure non esiste.` },
    { id: 'fc-12', sezione: 'discontinuita', tipo: 'definizione', fronte: R`Discontinuità di terza specie`, retro: R`Il limite esiste finito, ma $f(x_0)$ non esiste o è diverso dal limite. Si dice eliminabile.` },
    { id: 'fc-13', sezione: 'discontinuita', tipo: 'procedura', fronte: R`Come si classifica una discontinuità`, retro: R`Si calcolano i due limiti laterali: diversi e finiti $\to$ prima specie; almeno uno infinito o inesistente $\to$ seconda; uguali e finiti $\to$ terza.` },
    { id: 'fc-14', sezione: 'discontinuita', tipo: 'concetto', fronte: R`Prolungamento per continuità`, retro: R`Nel caso eliminabile, si ridefinisce $f(x_0) = \lim_{x \to x_0} f(x)$ e la nuova funzione è continua.` },
    { id: 'fc-15', sezione: 'teoremi', tipo: 'definizione', fronte: R`Teorema di Weierstrass`, retro: R`Se $f$ è continua in $[a, b]$ (chiuso e limitato), ammette massimo e minimo assoluti in $[a, b]$.` },
    { id: 'fc-16', sezione: 'teoremi', tipo: 'definizione', fronte: R`Teorema degli zeri`, retro: R`Se $f$ è continua in $[a,b]$ e $f(a) \cdot f(b) < 0$, esiste almeno un $c \in (a,b)$ con $f(c) = 0$.` },
    { id: 'fc-17', sezione: 'teoremi', tipo: 'definizione', fronte: R`Teorema dei valori intermedi`, retro: R`Una funzione continua in $[a,b]$ assume tutti i valori compresi fra il suo minimo e il suo massimo.` },
    { id: 'fc-18', sezione: 'teoremi', tipo: 'concetto', fronte: R`Controesempio a Weierstrass`, retro: R`$f(x) = \dfrac{1}{x}$ su $(0, 1]$: continua, ma senza massimo. L'intervallo non è chiuso.` },
    { id: 'fc-19', sezione: 'bisezione', tipo: 'procedura', fronte: R`I passi del metodo di bisezione`, retro: R`Si calcola $m = \dfrac{a+b}{2}$ e $f(m)$; si tiene la metà agli estremi della quale $f$ cambia segno; si ripete.` },
    { id: 'fc-20', sezione: 'bisezione', tipo: 'formula', fronte: R`Ampiezza dell'intervallo dopo $n$ bisezioni`, retro: R`$\dfrac{b-a}{2^n}$.` },
    { id: 'fc-21', sezione: 'asintoti-verticali-orizzontali', tipo: 'definizione', fronte: R`Asintoto verticale`, retro: R`La retta $x = c$, quando almeno uno dei limiti laterali di $f$ in $c$ è infinito.` },
    { id: 'fc-22', sezione: 'asintoti-verticali-orizzontali', tipo: 'definizione', fronte: R`Asintoto orizzontale`, retro: R`La retta $y = q$, quando $\lim_{x \to +\infty} f(x) = q$ (o lo stesso per $x \to -\infty$), con $q$ finito.` },
    { id: 'fc-23', sezione: 'asintoti-verticali-orizzontali', tipo: 'concetto', fronte: R`Il grafico può tagliare un asintoto orizzontale?`, retro: R`Sì, anche infinite volte: $\dfrac{\sin x}{x}$ ha asintoto $y = 0$ e lo attraversa in ogni $x = k\pi$.` },
    { id: 'fc-24', sezione: 'asintoto-obliquo', tipo: 'formula', fronte: R`Come si trovano $m$ e $q$ dell'asintoto obliquo`, retro: R`$m = \lim_{x \to \pm\infty} \dfrac{f(x)}{x}$ e poi $q = \lim_{x \to \pm\infty} (f(x) - mx)$.` },
    { id: 'fc-25', sezione: 'asintoto-obliquo', tipo: 'concetto', fronte: R`Quando l'asintoto obliquo non esiste`, retro: R`Se $m$ è infinito, se $m = 0$ (allora è orizzontale), o se il limite di $f(x) - mx$ non è finito.` },
    { id: 'fc-26', sezione: 'tratti-parametro', tipo: 'procedura', fronte: R`Trovare il parametro che rende continua una funzione a tratti`, retro: R`Nel punto di raccordo si impone limite sinistro $=$ limite destro $=$ valore della funzione, e si risolve rispetto al parametro.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto verticale di $f(x) = \dfrac{1}{x - 3}$. Scrivi l'equazione della retta, per esempio x = 5.`, suggerimenti: [R`Cerca dove si annulla il denominatore.`], risposta: vert(3), soluzione: [R`Il denominatore si annulla per $x = 3$.`, R`Lì il numeratore vale $1$, non zero: il limite è infinito.`, R`L'asintoto verticale è $x = 3$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto orizzontale di $f(x) = \dfrac{2x + 1}{x - 4}$. Scrivi l'equazione, per esempio y = 5.`, suggerimenti: [R`Numeratore e denominatore hanno lo stesso grado.`, R`Fai il rapporto dei coefficienti di $x$.`], risposta: orizz(2), soluzione: [R`I gradi sono uguali: tutti e due $1$.`, R`Il rapporto dei coefficienti di $x$ è $\dfrac{2}{1} = 2$.`, R`L'asintoto orizzontale è $y = 2$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto orizzontale di $f(x) = \dfrac{5}{x + 2}$.`, suggerimenti: [R`Confronta i gradi: sopra c'è un numero, sotto un polinomio di grado $1$.`], risposta: orizz(0), soluzione: [R`Il numeratore ha grado $0$, il denominatore grado $1$.`, R`Il grado più alto è sotto, quindi all'infinito $f(x) \to 0$.`, R`L'asintoto orizzontale è $y = 0$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto verticale di $f(x) = \dfrac{x + 1}{x + 5}$.`, suggerimenti: [R`Poni il denominatore uguale a zero.`, R`Attento al segno: $x + 5 = 0$ dà $x = -5$.`], risposta: vert(-5), soluzione: [R`Il denominatore si annulla per $x = -5$.`, R`Lì il numeratore vale $-4$, non zero.`, R`L'asintoto verticale è $x = -5$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto orizzontale di $f(x) = \dfrac{6x - 1}{2x + 3}$.`, suggerimenti: [R`I gradi sono uguali: conta il rapporto dei coefficienti di $x$.`], risposta: orizz(3), soluzione: [R`I gradi sono uguali.`, R`Il rapporto dei coefficienti di $x$ è $\dfrac{6}{2} = 3$.`, R`L'asintoto orizzontale è $y = 3$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Trova gli asintoti verticali di $f(x) = \dfrac{x}{x^2 - 9}$. Separali con punto e virgola, per esempio x = 1; x = −1.`, suggerimenti: [R`Risolvi $x^2 - 9 = 0$.`, R`Controlla che in quei punti il numeratore non sia zero.`], risposta: vertDue(3), soluzione: [R`$x^2 - 9 = 0$ per $x = 3$ e per $x = -3$.`, R`Lì il numeratore vale $3$ e $-3$: non si annulla.`, R`Gli asintoti verticali sono $x = 3$ e $x = -3$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto orizzontale di $f(x) = \dfrac{3x^2 + 1}{x^2 + 4}$.`, suggerimenti: [R`I gradi sono uguali: conta il rapporto dei coefficienti di $x^2$.`], risposta: orizz(3), soluzione: [R`I gradi sono uguali: tutti e due $2$.`, R`Il rapporto dei coefficienti di $x^2$ è $\dfrac{3}{1} = 3$.`, R`L'asintoto orizzontale è $y = 3$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Di che specie è la discontinuità di $f(x) = \dfrac{x^2 - 16}{x - 4}$ in $x = 4$? Rispondi prima, seconda o terza.`, suggerimenti: [R`Scomponi il numeratore: è una differenza di quadrati.`, R`Il limite è finito? E $f(4)$ esiste?`], risposta: TERZA, soluzione: [R`$x^2 - 16 = (x - 4)(x + 4)$, quindi per $x \ne 4$ hai $f(x) = x + 4$.`, R`Il limite vale $8$, finito. Però $f(4)$ non esiste.`, R`È di terza specie: la discontinuità è eliminabile.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Di che specie è la discontinuità di $f(x) = \dfrac{3}{x + 1}$ in $x = -1$?`, suggerimenti: [R`Calcola i due limiti laterali in $-1$.`], risposta: SECONDA, soluzione: [R`Da sinistra: $\dfrac{3}{0^-} = -\infty$.`, R`Da destra: $\dfrac{3}{0^+} = +\infty$.`, R`Basta un limite laterale infinito: seconda specie.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Sia $f(x) = \begin{cases} x + 2 & x < 0 \\ x - 1 & x \ge 0 \end{cases}$. Di che specie è la discontinuità in $x = 0$?`, suggerimenti: [R`Da sinistra usa $x + 2$, da destra $x - 1$.`], risposta: PRIMA, soluzione: [R`Da sinistra: $l^- = 0 + 2 = 2$.`, R`Da destra: $l^+ = 0 - 1 = -1$.`, R`Sono finiti e diversi: prima specie, con salto $-3$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Quale valore deve avere $f(0)$ perché $f(x) = \dfrac{x^2 + 3x}{x}$ diventi continua in $0$?`, suggerimenti: [R`Raccogli $x$ al numeratore e semplifica.`, R`Il valore giusto è il limite per $x \to 0$.`], risposta: num(3), soluzione: [R`$\dfrac{x(x + 3)}{x} = x + 3$ per $x \ne 0$.`, R`Il limite per $x \to 0$ è $3$.`, R`Poni $f(0) = 3$: la discontinuità sparisce.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Di che specie è la discontinuità di $f(x) = \dfrac{|x|}{x}$ in $x = 0$?`, suggerimenti: [R`Togli il valore assoluto: per $x > 0$ vale $|x| = x$, per $x < 0$ vale $|x| = -x$.`], risposta: PRIMA, soluzione: [R`Per $x > 0$: $f(x) = \dfrac{x}{x} = 1$.`, R`Per $x < 0$: $f(x) = \dfrac{-x}{x} = -1$.`, R`$l^- = -1$ e $l^+ = 1$: finiti e diversi, prima specie.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Trova $k$ perché sia continua in $x = 2$: $$f(x) = \begin{cases} x + k & x \le 2 \\ 3x & x > 2 \end{cases}$$`, suggerimenti: [R`In $x = 2$ vale la prima formula. Il limite destro viene dalla seconda.`, R`Uguaglia i due numeri.`], risposta: num(4), soluzione: [R`Valore e limite sinistro: $f(2) = 2 + k$.`, R`Limite destro: $3 \cdot 2 = 6$.`, R`$2 + k = 6$, quindi $k = 4$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Trova $k$ perché sia continua in $x = 1$: $$f(x) = \begin{cases} x^2 + k & x < 1 \\ 4x - 1 & x \ge 1 \end{cases}$$`, suggerimenti: [R`Calcola il limite sinistro con $x^2 + k$ e il valore $f(1)$ con $4x - 1$.`], risposta: num(2), soluzione: [R`Limite sinistro: $1 + k$.`, R`Valore e limite destro: $f(1) = 4 - 1 = 3$.`, R`$1 + k = 3$, quindi $k = 2$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Trova $k$ perché sia continua in $x = 3$: $$f(x) = \begin{cases} kx & x \le 3 \\ x + 6 & x > 3 \end{cases}$$`, suggerimenti: [R`$f(3) = 3k$. Il limite destro viene da $x + 6$.`], risposta: num(3), soluzione: [R`Valore e limite sinistro: $f(3) = 3k$.`, R`Limite destro: $3 + 6 = 9$.`, R`$3k = 9$, quindi $k = 3$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Trova $k$ perché sia continua in $x = 2$: $$f(x) = \begin{cases} kx + 1 & x < 2 \\ x^2 - 5 & x \ge 2 \end{cases}$$`, suggerimenti: [R`Limite sinistro: sostituisci $x = 2$ in $kx + 1$.`, R`Valore: $f(2) = 4 - 5$.`], risposta: num(-1), soluzione: [R`Limite sinistro: $2k + 1$.`, R`Valore e limite destro: $f(2) = 4 - 5 = -1$.`, R`$2k + 1 = -1$, quindi $2k = -2$ e $k = -1$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Trova gli asintoti verticali di $f(x) = \dfrac{x - 1}{x^2 - 1}$. Se sono più d'uno, separali con punto e virgola.`, suggerimenti: [R`Il denominatore si annulla in due punti. Guarda anche il numeratore.`, R`Scomponi: $x^2 - 1 = (x - 1)(x + 1)$.`], risposta: Object.assign(vert(-1), { segnaposto: 'es. x = 5; x = −5' }), soluzione: [R`$x^2 - 1 = 0$ per $x = 1$ e per $x = -1$.`, R`Per $x \ne 1$ semplifichi: $f(x) = \dfrac{1}{x + 1}$. In $x = 1$ il limite è $\dfrac12$: c'è un buco.`, R`In $x = -1$ il limite è infinito. L'unico asintoto verticale è $x = -1$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Trova l'asintoto obliquo di $f(x) = \dfrac{x^2 + 1}{x}$. Scrivi l'equazione, per esempio y = 2x + 1.`, suggerimenti: [R`Dividi ogni termine del numeratore per $x$.`], risposta: obliquo(1, 0), soluzione: [R`$f(x) = \dfrac{x^2}{x} + \dfrac{1}{x} = x + \dfrac{1}{x}$.`, R`All'infinito $\dfrac{1}{x} \to 0$.`, R`L'asintoto obliquo è $y = x$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Trova l'asintoto obliquo di $f(x) = \dfrac{x^2 + 2x}{x - 1}$.`, suggerimenti: [R`Prima $m = \lim \dfrac{f(x)}{x}$, poi $q = \lim (f(x) - mx)$.`, R`Oppure dividi $x^2 + 2x$ per $x - 1$: il quoziente è l'asintoto.`], risposta: obliquo(1, 3), soluzione: [R`$m = \lim \dfrac{x^2 + 2x}{x^2 - x} = 1$.`, R`$q = \lim \left(\dfrac{x^2 + 2x}{x - 1} - x\right) = \lim \dfrac{3x}{x - 1} = 3$.`, R`L'asintoto obliquo è $y = x + 3$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Trova l'asintoto obliquo di $f(x) = \dfrac{2x^2 - x}{x + 1}$.`, suggerimenti: [R`Prima $m = \lim \dfrac{f(x)}{x}$, poi $q = \lim (f(x) - mx)$.`, R`Nel calcolo di $q$ metti tutto sotto lo stesso denominatore $x + 1$.`], risposta: obliquo(2, -3), soluzione: [R`$m = \lim \dfrac{2x^2 - x}{x^2 + x} = 2$.`, R`$q = \lim \dfrac{2x^2 - x - 2x(x + 1)}{x + 1} = \lim \dfrac{-3x}{x + 1} = -3$.`, R`L'asintoto obliquo è $y = 2x - 3$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Determina $k$ in modo che $f(x) = \begin{cases} 3x + k & x \le 1 \\ x^2 & x > 1 \end{cases}$ sia continua in $x = 1$.`, suggerimenti: [R`L'unico punto da controllare è il raccordo $x = 1$.`, R`Calcola $f(1)$ con la prima formula e il limite destro con la seconda, poi uguagliali.`], risposta: { tipo: 'numero', valore: -2, tolleranza: 0.01 }, soluzione: [R`Limite sinistro e valore: $f(1) = 3 + k$.`, R`Limite destro: $\lim_{x \to 1^+} x^2 = 1$.`, R`Continuità: $3 + k = 1$, quindi $k = -2$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Di che specie è la discontinuità di $f(x) = \dfrac{x^2 - 1}{x - 1}$ in $x = 1$?`, suggerimenti: [R`Semplifica la frazione: il numeratore è una differenza di quadrati.`, R`Se il limite esiste finito ma il punto non appartiene al dominio, la discontinuità è eliminabile.`], risposta: piu(TERZA, 'terza specie o eliminabile'), soluzione: [R`$\dfrac{x^2-1}{x-1} = \dfrac{(x-1)(x+1)}{x-1} = x + 1$ per $x \ne 1$.`, R`$\lim_{x \to 1} f(x) = 2$, finito, ma $f(1)$ non esiste.`, R`È una discontinuità di **terza specie**, cioè eliminabile: ponendo $f(1) = 2$ la funzione diventa continua.`] },

    { id: 'es-03', difficolta: 1, testo: R`Trova l'asintoto orizzontale di $f(x) = \dfrac{2x + 5}{x - 3}$.`, suggerimenti: [R`Numeratore e denominatore hanno lo stesso grado.`, R`In questo caso il limite all'infinito è il rapporto dei coefficienti di $x$.`], risposta: piu(orizz(2), '2'), soluzione: [R`$\lim_{x \to \pm\infty} \dfrac{2x+5}{x-3} = \dfrac{2}{1} = 2$.`, R`L'asintoto orizzontale è la retta $y = 2$, sia a destra sia a sinistra.`] },

    { id: 'es-04', difficolta: 1, testo: R`Trova l'asintoto verticale di $f(x) = \dfrac{x + 1}{x - 4}$.`, suggerimenti: [R`Cerca i punti esclusi dal dominio.`, R`Controlla che in quel punto il numeratore non si annulli.`], risposta: piu(vert(4), '4'), soluzione: [R`Il denominatore si annulla per $x = 4$, dove il numeratore vale $5 \ne 0$.`, R`$\lim_{x \to 4^-} f(x) = -\infty$ e $\lim_{x \to 4^+} f(x) = +\infty$: la retta $x = 4$ è asintoto verticale.`] },

    { id: 'es-05', difficolta: 2, testo: R`Classifica la discontinuità di $f(x) = \dfrac{1}{x - 2}$ in $x = 2$.`, suggerimenti: [R`Calcola i due limiti laterali.`, R`Se anche uno solo dei due è infinito, la specie è già decisa.`], risposta: piu(SECONDA, 'specie seconda'), soluzione: [R`$\lim_{x \to 2^-} \dfrac{1}{x-2} = \dfrac{1}{0^-} = -\infty$ e $\lim_{x \to 2^+} \dfrac{1}{x-2} = +\infty$.`, R`Entrambi i limiti laterali sono infiniti: discontinuità di **seconda specie**. La retta $x = 2$ è asintoto verticale.`] },

    { id: 'es-06', difficolta: 2, testo: R`Trova l'asintoto obliquo di $f(x) = \dfrac{x^2 + 3x}{x - 1}$.`, suggerimenti: [R`Il grado del numeratore supera di uno quello del denominatore: l'asintoto obliquo c'è.`, R`Calcola prima $m = \lim \dfrac{f(x)}{x}$, poi $q = \lim (f(x) - mx)$.`, R`In alternativa, esegui la divisione fra polinomi e guarda il quoziente.`], risposta: piu(obliquo(1, 4), 'x+4'), soluzione: [R`$m = \lim_{x \to \pm\infty} \dfrac{x^2+3x}{x(x-1)} = 1$.`, R`$q = \lim_{x \to \pm\infty}\left(\dfrac{x^2+3x}{x-1} - x\right) = \lim_{x \to \pm\infty} \dfrac{x^2+3x-x^2+x}{x-1} = \lim_{x \to \pm\infty} \dfrac{4x}{x-1} = 4$.`, R`L'asintoto obliquo è $y = x + 4$. Verifica con la divisione: $\dfrac{x^2+3x}{x-1} = x + 4 + \dfrac{4}{x-1}$. ✓`] },

    { id: 'es-07', difficolta: 2, testo: R`Calcola il salto di $f(x) = \dfrac{x - 3}{|x - 3|}$ nel suo punto di discontinuità.`, suggerimenti: [R`Il punto critico è $x = 3$: togli il valore assoluto distinguendo $x > 3$ e $x < 3$.`, R`Il salto è $s = l^+ - l^-$, e l'ordine dei due limiti conta.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`Per $x > 3$: $|x-3| = x-3$, quindi $f(x) = 1$ e $l^+ = 1$.`, R`Per $x < 3$: $|x-3| = 3-x$, quindi $f(x) = -1$ e $l^- = -1$.`, R`Prima specie, con salto $s = 1 - (-1) = 2$.`] },

    { id: 'es-08', difficolta: 2, testo: R`L'equazione $x^3 + x - 3 = 0$ ha una soluzione in $[1, 2]$. Applica **due** passi di bisezione e indica l'intervallo che ottieni.`, suggerimenti: [R`Verifica prima che $f(1)$ e $f(2)$ abbiano segni opposti.`, R`Primo punto medio: $m = 1{,}5$. Calcola $f(1{,}5)$ e guarda con quale estremo ha segno discorde.`], risposta: { tipo: 'intervallo', da: 1, a: 1.25, chiusoDa: true, chiusoA: true }, soluzione: [R`$f(1) = 1 + 1 - 3 = -1 < 0$ e $f(2) = 8 + 2 - 3 = 7 > 0$: le ipotesi del teorema degli zeri valgono.`, R`Primo passo: $f(1{,}5) = 3{,}375 + 1{,}5 - 3 = 1{,}875 > 0$. Il segno cambia fra $1$ e $1{,}5$: nuovo intervallo $[1;\ 1{,}5]$.`, R`Secondo passo: $f(1{,}25) = 1{,}953125 + 1{,}25 - 3 = 0{,}203125 > 0$. Il segno cambia fra $1$ e $1{,}25$.`, R`Intervallo finale $[1;\ 1{,}25]$, di ampiezza $0{,}25$.`] },

    { id: 'es-09', difficolta: 2, testo: R`Quale valore bisogna assegnare a $f(2)$ perché $f(x) = \dfrac{x^2 - 5x + 6}{x - 2}$ diventi continua in $x = 2$?`, suggerimenti: [R`Scomponi il numeratore: le sue radici sono $2$ e $3$.`, R`Il valore da assegnare è il limite per $x \to 2$.`], risposta: { tipo: 'numero', valore: -1, tolleranza: 0.01 }, soluzione: [R`$x^2 - 5x + 6 = (x-2)(x-3)$, quindi per $x \ne 2$ si ha $f(x) = x - 3$.`, R`$\lim_{x \to 2} f(x) = 2 - 3 = -1$: la discontinuità è eliminabile.`, R`Ponendo $f(2) = -1$ la funzione è continua su tutto $\mathbb{R}$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Determina $a$ e $b$ perché $f(x) = \begin{cases} x^2 + a & x < 2 \\ bx - 1 & x \ge 2 \end{cases}$ sia continua in $x = 2$ e valga $f(2) = 5$. Scrivi $a$ e $b$ in quest'ordine, separati da punto e virgola.`, suggerimenti: [R`Comincia dalla condizione $f(2) = 5$: il punto $x = 2$ è governato dalla seconda formula.`, R`Trovato $b$, imponi che il limite sinistro valga anch'esso $5$.`], risposta: { tipo: 'numeri', valori: [1, 3], ordinati: true }, soluzione: [R`$f(2) = 2b - 1 = 5$, quindi $b = 3$.`, R`Limite sinistro: $\lim_{x \to 2^-}(x^2 + a) = 4 + a$. Per la continuità deve valere $5$, quindi $a = 1$.`, R`Con $a = 1$ e $b = 3$ i due rami si raccordano in $(2;\ 5)$.`] },

    { id: 'es-11', difficolta: 3, testo: R`Sia $f(x) = \dfrac{x^2 - k^2}{x - k}$ per $x \ne k$ e $f(k) = 6$, con $k > 0$. Per quale valore di $k$ la funzione è continua?`, suggerimenti: [R`Scomponi il numeratore come differenza di quadrati.`, R`Calcola il limite per $x \to k$ e imponi che valga $6$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.01 }, soluzione: [R`$\dfrac{x^2 - k^2}{x - k} = \dfrac{(x-k)(x+k)}{x-k} = x + k$ per $x \ne k$.`, R`$\lim_{x \to k} f(x) = 2k$.`, R`Continuità: $2k = 6$, cioè $k = 3$ (accettabile perché positivo).`] },

    { id: 'es-12', difficolta: 3, testo: R`Trova tutti gli asintoti di $f(x) = \dfrac{2x^2 + 3}{x + 1}$ e scrivi l'equazione di quello obliquo.`, suggerimenti: [R`Il dominio esclude un solo punto: lì cerca l'asintoto verticale.`, R`Il grado del numeratore supera di uno quello del denominatore: niente orizzontale, ma c'è l'obliquo.`, R`$m = \lim \dfrac{2x^2+3}{x^2+x}$, poi $q = \lim \left(f(x) - mx\right)$.`], risposta: piu(obliquo(2, -2), '2x-2'), soluzione: [R`Dominio $x \ne -1$; in $-1$ il numeratore vale $5 \ne 0$, quindi $x = -1$ è asintoto verticale.`, R`$m = \lim_{x \to \pm\infty} \dfrac{2x^2+3}{x^2+x} = 2$.`, R`$q = \lim_{x \to \pm\infty}\left(\dfrac{2x^2+3}{x+1} - 2x\right) = \lim_{x \to \pm\infty} \dfrac{2x^2+3-2x^2-2x}{x+1} = \lim_{x \to \pm\infty}\dfrac{3-2x}{x+1} = -2$.`, R`Asintoto obliquo $y = 2x - 2$. Verifica: $\dfrac{2x^2+3}{x+1} = 2x - 2 + \dfrac{5}{x+1}$. ✓`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Una funzione $f$ è continua in $x_0$ quando…`, opzioni: [R`$f$ è definita in $x_0$`, R`il limite di $f$ per $x \to x_0$ esiste finito`, R`il limite di $f$ per $x \to x_0$ esiste, è finito e vale $f(x_0)$`, R`i limiti laterali in $x_0$ sono entrambi infiniti`], corretta: 2, spiegazione: R`Servono tutte e tre le condizioni insieme: esistenza di $f(x_0)$, esistenza del limite finito, e coincidenza dei due valori. «Definita in $x_0$» e «limite finito» sono ciascuna solo un pezzo della definizione; due limiti laterali infiniti descrivono una discontinuità di seconda specie.` },

    { id: 'q-02', domanda: R`In $x_0$ il limite sinistro di $f$ vale $3$ e il limite destro vale $-1$. La discontinuità è…`, opzioni: [R`di prima specie, con salto $-4$`, R`di prima specie, con salto $4$`, R`di seconda specie`, R`eliminabile`], corretta: 0, spiegazione: R`I limiti laterali sono finiti e diversi: prima specie. Il salto è $s = l^+ - l^- = -1 - 3 = -4$; scriverlo $+4$ significa aver invertito destra e sinistra. Non è di seconda specie (nessun limite infinito) né eliminabile (i limiti sono diversi).` },

    { id: 'q-03', domanda: R`Il teorema di Weierstrass richiede che la funzione sia…`, opzioni: [R`derivabile in $(a, b)$`, R`continua in un intervallo chiuso e limitato`, R`continua in un intervallo qualsiasi`, R`monotòna in $[a, b]$`], corretta: 1, spiegazione: R`Le due ipotesi sono continuità e intervallo chiuso e limitato: su $(0, 1]$ la funzione continua $\frac1x$ non ha massimo. La derivabilità non serve ($|x|$ su $[-1,1]$ ha massimo e minimo), la monotonia nemmeno.` },

    { id: 'q-04', domanda: R`Quali sono le ipotesi del teorema degli zeri?`, opzioni: [R`$f$ continua in $[a,b]$ e $f(a) \cdot f(b) > 0$`, R`$f$ derivabile in $[a,b]$`, R`$f$ continua in $[a,b]$ e $f(a) \cdot f(b) < 0$`, R`$f$ continua in $(a,b)$ e $f(a) = f(b)$`], corretta: 2, spiegazione: R`Serve la continuità sull'intervallo chiuso e il cambio di segno agli estremi, cioè prodotto **negativo**. Con prodotto positivo il teorema non dice nulla; $f(a) = f(b)$ è l'ipotesi del teorema di Rolle, che riguarda le derivate.` },

    { id: 'q-05', domanda: R`Che tipo di discontinuità presenta $f(x) = \dfrac{1}{x - 1}$ in $x = 1$?`, opzioni: [R`di prima specie`, R`di terza specie, eliminabile`, R`nessuna, perché in $1$ la funzione non è definita`, R`di seconda specie`], corretta: 3, spiegazione: R`I limiti laterali valgono $-\infty$ e $+\infty$: basta che uno sia infinito perché la discontinuità sia di seconda specie. Il fatto che $1$ non appartenga al dominio non annulla la domanda: la funzione è definita in punti vicini quanto vuoi a $1$, e la retta $x = 1$ è asintoto verticale.` },

    { id: 'q-06', domanda: R`Perché nella ricerca dell'asintoto obliquo si richiede $m \ne 0$?`, opzioni: [R`perché altrimenti il limite di $f(x) - mx$ non esiste`, R`perché con $m = 0$ la retta è orizzontale, e si ricade nell'asintoto orizzontale`, R`perché con $m = 0$ la funzione non è continua`, R`perché $m$ compare a denominatore`], corretta: 1, spiegazione: R`Se $m = 0$ la retta $y = q$ è orizzontale: non è un caso escluso, è semplicemente un asintoto di un altro tipo, già trovato con il limite di $f(x)$. Il limite di $f(x) - mx$ esiste eccome (vale $q$), e $m$ non sta a nessun denominatore.` },

    { id: 'q-07', domanda: R`Quante volte il grafico di una funzione può intersecare un suo asintoto orizzontale?`, opzioni: [R`mai`, R`al massimo una volta`, R`anche infinite volte`, R`esattamente due volte`], corretta: 2, spiegazione: R`L'asintoto descrive il comportamento all'infinito, non vieta gli incontri al finito: $f(x) = \frac{\sin x}{x}$ ha asintoto $y = 0$ e lo taglia in tutti i punti $x = k\pi$. Sono gli asintoti verticali a non poter essere attraversati, perché lì la funzione non è definita.` },

    { id: 'q-08', domanda: R`Una discontinuità si dice eliminabile quando…`, opzioni: [R`i limiti laterali sono finiti e diversi`, R`il limite esiste finito ma non coincide con $f(x_0)$, oppure $f(x_0)$ non esiste`, R`almeno un limite laterale è infinito`, R`la funzione non è derivabile in $x_0$`], corretta: 1, spiegazione: R`Se il limite esiste finito, basta ridefinire (o definire) $f(x_0)$ uguale al limite. Limiti laterali diversi danno la prima specie, un limite infinito la seconda; la derivabilità non c'entra con la classificazione delle discontinuità.` },

    { id: 'q-09', domanda: R`La funzione $f(x) = \dfrac{1}{x}$ è continua su $(0, 1]$ ma non ha massimo. Perché questo non contraddice Weierstrass?`, opzioni: [R`perché $f$ non è continua`, R`perché l'intervallo non è chiuso`, R`perché $f$ non è limitata inferiormente`, R`perché Weierstrass vale solo per i polinomi`], corretta: 1, spiegazione: R`L'estremo $0$ è escluso: l'intervallo non è chiuso, quindi un'ipotesi del teorema non vale. La funzione è continua in tutto $(0,1]$, ed è limitata inferiormente (vale sempre almeno $1$); il teorema si applica a qualunque funzione continua, non solo ai polinomi.` },

    { id: 'q-10', domanda: R`Partendo da $[a, b]$, dopo $n$ passi di bisezione l'intervallo è lungo…`, opzioni: [R`$\dfrac{b-a}{n}$`, R`$\dfrac{b-a}{2n}$`, R`$(b-a) \cdot 2^n$`, R`$\dfrac{b-a}{2^n}$`], corretta: 3, spiegazione: R`Ogni passo dimezza l'ampiezza, quindi dopo $n$ passi si è diviso $n$ volte per $2$: il fattore è $2^n$, non $n$ né $2n$. La lunghezza diminuisce, quindi non può moltiplicarsi per $2^n$.` },

    { id: 'q-11', domanda: R`La funzione di Dirichlet, che vale $1$ sui razionali e $0$ sugli irrazionali…`, opzioni: [R`è continua solo in $x = 0$`, R`è continua su tutto $\mathbb{R}$`, R`non è continua in nessun punto`, R`ha una discontinuità di prima specie in ogni numero intero`], corretta: 2, spiegazione: R`In ogni intervallo, per piccolo che sia, ci sono sia razionali sia irrazionali: nessun limite laterale esiste, in nessun punto. Non è quindi di prima specie da nessuna parte, e non è continua da nessuna parte, nemmeno in $0$.` },

    { id: 'q-12', domanda: R`Quali asintoti orizzontali ha $y = e^x$?`, opzioni: [R`$y = 0$, ma solo per $x \to -\infty$`, R`$y = 0$, sia per $x \to +\infty$ sia per $x \to -\infty$`, R`$y = 1$ per $x \to +\infty$`, R`nessuno`], corretta: 0, spiegazione: R`$\lim_{x \to -\infty} e^x = 0$, quindi $y = 0$ è asintoto a sinistra; a destra $\lim_{x \to +\infty} e^x = +\infty$, e non c'è asintoto orizzontale. È un buon promemoria: i due limiti all'infinito vanno calcolati separatamente.` },

    { id: 'q-13', domanda: R`Se $f$ e $g$ sono continue in $x_0$, la funzione $\dfrac{f}{g}$…`, opzioni: [R`è sempre continua in $x_0$`, R`è continua in $x_0$ purché $g(x_0) \ne 0$`, R`non è mai continua in $x_0$`, R`è continua solo se $f(x_0) = 0$`], corretta: 1, spiegazione: R`Il quoziente di funzioni continue è continuo dove il denominatore non si annulla; se $g(x_0) = 0$ il punto è addirittura escluso dal dominio. La condizione riguarda $g$, non $f$.` },

    { id: 'q-14', domanda: R`Una funzione può avere, per $x \to +\infty$, sia un asintoto orizzontale sia uno obliquo?`, opzioni: [R`sì, se è periodica`, R`sì, sempre`, R`no: il limite di $\dfrac{f(x)}{x}$ è unico, o vale $0$ o vale $m \ne 0$`, R`sì, se ha anche un asintoto verticale`], corretta: 2, spiegazione: R`Su ogni lato c'è al massimo un asintoto non verticale, perché il limite di $\frac{f(x)}{x}$, se esiste, è un solo numero: se è $0$ l'asintoto (eventuale) è orizzontale, altrimenti è obliquo. La presenza di asintoti verticali o la periodicità non cambiano nulla.` },

    { id: 'q-15', domanda: R`Se $f$ è continua in $[a,b]$ e $f(a) \cdot f(b) > 0$, allora…`, opzioni: [R`$f$ non ha zeri in $[a,b]$`, R`$f$ ha esattamente due zeri`, R`il teorema degli zeri non dice nulla: zeri possono esserci oppure no`, R`$f$ ha almeno uno zero`], corretta: 2, spiegazione: R`Il teorema dà una condizione **sufficiente**, non necessaria. Con $f(x) = x^2 - 1$ su $[-2, 2]$ il prodotto vale $9 > 0$ eppure ci sono due zeri; con $f(x) = x^2 + 1$ non ce n'è nessuno. Senza il cambio di segno non si può concludere niente.` },

    { id: 'q-16', domanda: R`Dove si cercano gli asintoti verticali di una funzione?`, opzioni: [R`nei punti in cui la funzione si annulla`, R`nei punti esclusi dal dominio e negli estremi finiti esclusi`, R`solo in $x = 0$`, R`nei punti di massimo e di minimo`], corretta: 1, spiegazione: R`Un asintoto verticale nasce da un limite infinito, che può accadere solo dove la funzione non è definita: denominatori che si annullano, argomenti di logaritmi che tendono a zero, estremi esclusi del dominio. Dove la funzione vale zero il grafico taglia l'asse $x$, il contrario di un asintoto verticale.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Per classificare una discontinuità calcola sempre i **due** limiti laterali separatamente: la specie si legge da lì, senza altre considerazioni.` },
    { tipo: 'errore', testo: R`«Continua nel suo dominio» non è «continua su $\mathbb{R}$». $\dfrac{1}{x}$ è continua ovunque sia definita, ma il suo grafico è spezzato in due rami.` },
    { tipo: 'trucco', testo: R`Per una razionale fratta il confronto dei gradi decide tutto: numeratore di grado minore $\to$ asintoto $y = 0$; gradi uguali $\to$ rapporto dei coefficienti direttivi; numeratore di un grado in più $\to$ asintoto obliquo.` },
    { tipo: 'errore', testo: R`Nell'asintoto obliquo l'ordine non è invertibile: prima $m$, perché $q = \lim (f(x) - mx)$ ha bisogno di $m$ già calcolato.` },
    { tipo: 'trucco', testo: R`Se la funzione è una frazione di polinomi, la divisione fra polinomi regala l'asintoto obliquo senza calcolare limiti: è il quoziente, e il resto tende a zero.` },
    { tipo: 'errore', testo: R`Un denominatore che si annulla non garantisce l'asintoto verticale: se si annulla anche il numeratore, semplifica prima. In $\dfrac{x^2-4}{x-2}$ il punto $x = 2$ dà un buco, non un asintoto.` },
    { tipo: 'metodo', testo: R`In una funzione definita a tratti controlla solo i punti di raccordo: dentro ogni tratto ci sono funzioni elementari, già continue per conto loro.` },
    { tipo: 'errore', testo: R`Weierstrass e il teorema degli zeri chiedono un intervallo **chiuso e limitato**: su un intervallo aperto le conclusioni cadono, e non per un cavillo.` },
    { tipo: 'trucco', testo: R`I limiti per $x \to +\infty$ e per $x \to -\infty$ vanno sempre calcolati separatamente: una funzione può avere un asintoto orizzontale da una parte e uno obliquo dall'altra.` }
  ],

  aneddoti: [
    { matematico: 'Bernard Bolzano', anni: '1781–1848', titolo: 'Il prete di Praga che diffidava dei disegni', testo: R`Bolzano era un sacerdote cattolico e insegnava scienza della religione all'Università di Praga. Le sue prediche pacifiste e le sue idee sociali non piacquero alle autorità austriache: nel 1819 fu rimosso dalla cattedra, messo sotto sorveglianza dalla polizia e gli fu proibito di pubblicare. Due anni prima, nel 1817, aveva stampato un opuscolo dal titolo che è già un programma: *Dimostrazione puramente analitica del teorema che fra due valori di segno opposto sta almeno una radice dell'equazione*. Fino ad allora quel fatto si dava per ovvio guardando il grafico: la curva passa dall'altra parte, quindi da qualche parte taglia l'asse. Bolzano rifiutò l'evidenza del disegno e pretese una dimostrazione fatta solo di disuguaglianze. Stampate in poche copie a Praga, le sue opere restarono quasi sconosciute per decenni; quando furono riscoperte si vide che aveva anticipato Cauchy e Weierstrass.`, legame: R`Il teorema degli zeri porta il suo nome: è lui a trasformare un'evidenza grafica in un teorema dimostrato.` },

    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Il professore di ginnastica che rifondò l\'analisi', testo: R`Il padre lo voleva funzionario delle imposte e lo mandò a studiare legge a Bonn: Weierstrass passò quattro anni fra scherma e birra e tornò a casa senza laurea. Ripiegò sull'insegnamento e per quattordici anni fece il professore in licei di provincia, con in orario anche ginnastica e calligrafia, facendo matematica di notte e senza una biblioteca. Nel 1854 un suo lavoro sulle funzioni abeliane, uscito su una rivista che contava, fece il giro d'Europa: Königsberg gli diede la laurea honoris causa e due anni dopo era professore a Berlino, saltando tutta la gavetta. È lui a dare al limite e alla continuità la definizione con $\varepsilon$ e $\delta$ che si usa ancora. Nel 1872 presentò all'Accademia di Berlino una funzione continua in ogni punto e derivabile in nessuno: molti colleghi la giudicarono una mostruosità inutile.`, legame: R`La definizione rigorosa di funzione continua e il teorema del massimo e del minimo sono suoi.` },

    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'La funzione che non si può disegnare', testo: R`Dirichlet insegnò a Berlino e poi a Gottinga, sulla cattedra che era stata di Gauss, e sposò Rebecka Mendelssohn, sorella del compositore Felix. Era famoso per essere laconico: si racconta che alla nascita del primo figlio abbia mandato al suocero un telegramma con scritto soltanto «$2+1=3$». Nel 1829, studiando la convergenza delle serie di Fourier, ebbe bisogno di un esempio estremo e costruì la funzione che oggi porta il suo nome: vale $1$ se $x$ è razionale e $0$ se $x$ è irrazionale. In ogni intervallo, per quanto piccolo, si trovano sia razionali sia irrazionali, quindi la funzione salta di continuo fra $0$ e $1$ ed è discontinua in **ogni** punto della retta reale. Non la si può disegnare, eppure è definita in modo perfettamente preciso.`, legame: R`È il controesempio che misura quanto sia forte la richiesta di continuità: senza di essa nessuno dei tre teoremi funziona.` },

    { matematico: 'Giuseppe Peano', anni: '1858–1932', titolo: 'La curva che riempie tutto il quadrato', testo: R`Nato in una cascina vicino a Cuneo e diventato professore a Torino, Peano aveva il gusto del controesempio: correggeva i colleghi in pubblico e si divertiva a trovare errori nei manuali più diffusi. Nel 1890 pubblicò un articolo di poche pagine, senza una sola figura, in cui costruiva una curva continua che passa per **tutti** i punti di un quadrato. Fino a quel momento sembrava ovvio che una curva fosse un oggetto a una dimensione e che la continuità bastasse a garantirlo: Peano dimostrò di no, con una costruzione puramente aritmetica basata sulle cifre dei numeri scritti in base tre. Negli ultimi anni si dedicò al *latino sine flexione*, una lingua internazionale ottenuta dal latino togliendo le declinazioni, e ci scriveva perfino articoli di matematica.`, legame: R`Un promemoria severo: «continua» non significa «come me l'aspetto», e l'intuizione grafica va sempre controllata con la definizione.` }
  ]
});
})();
