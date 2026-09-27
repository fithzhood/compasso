(function () {
const R = String.raw;
/* allenamento: stessa casella e stessi simboli per tutti gli esercizi (in radianti o in gradi),
   così la casella non suggerisce quante soluzioni ci sono né se non ce ne sono.
   rad(1/6, 5/6) = π/6 e 5π/6: la casella accetta «π/6; 5π/6» e i decimali. */
const SIMBOLI = ['π', '/', ';', '°', '−'];
const SEGNA_RAD = 'es. π/5; 4π/5 o nessuna', SEGNA_GRADI = 'in gradi, es. 40; 140 o nessuna';
const NESSUNA = ['nessuna', 'nessuna soluzione', 'nessuno', 'non ci sono soluzioni', 'non ha soluzioni', 'impossibile', 'nessun angolo', '∅', 'ø', '{}', 'insieme vuoto', 'non ha soluzione', 'nessuna soluzione reale', 'non esiste', 'non esistono', 'non ci sono', 'nessun valore', 'mai'];
const rad = (...v) => ({ tipo: 'numeri', valori: v.map(k => k * Math.PI), segnaposto: SEGNA_RAD, simboli: SIMBOLI });
const gradi = (...v) => ({ tipo: 'numeri', valori: v, segnaposto: SEGNA_GRADI, simboli: SIMBOLI });
const nessunaRad = { tipo: 'testo', accettate: NESSUNA, segnaposto: SEGNA_RAD, simboli: SIMBOLI };
const nessunaGradi = { tipo: 'testo', accettate: NESSUNA, segnaposto: SEGNA_GRADI, simboli: SIMBOLI };
COMPASSO.registra({
  id: 'equazioni-goniometriche',
  titolo: 'Equazioni e disequazioni goniometriche',

  introduzione: R`Una cabina della ruota panoramica sale e scende a ogni giro. In quali istanti si trova a $10$ metri di quota? In ogni giro ci sono due istanti: uno mentre sale, uno mentre scende.

Le **equazioni goniometriche** funzionano allo stesso modo. Hanno l'incognita dentro $\sin x$, $\cos x$ o $\tan x$. Seno e coseno si ripetono a ogni giro, cioè ogni $2\pi$. La tangente si ripete ogni mezzo giro, cioè ogni $\pi$. Per questo le soluzioni si scrivono con $+2n\pi$ (o $+n\pi$), dove $n$ è un intero qualsiasi.

Il metodo è quasi sempre lo stesso. Trasformi l'equazione finché diventa una delle tre **elementari**: $\sin x = k$, $\cos x = k$, $\tan x = k$. Poi la risolvi sulla circonferenza goniometrica. Ti servono i valori di seno, coseno e tangente degli angoli notevoli.`,

  inBreve: [
    R`Seno e coseno stanno sempre fra $-1$ e $1$. Quindi $\sin x = k$ e $\cos x = k$ hanno soluzioni solo se $-1 \le k \le 1$. La tangente può valere qualunque numero.`,
    R`$\sin x = k$ ha due soluzioni per giro: $\arcsin k$ e $\pi - \arcsin k$. $\cos x = k$ ne ha due opposte: $\pm\arccos k$. A tutte aggiungi $2n\pi$.`,
    R`$\tan x = k$ ha una soluzione ogni mezzo giro: $x = \arctan k + n\pi$.`,
    R`Le equazioni più difficili si riportano alle elementari. Se poni $t = \sin x$, tieni solo le $t$ fra $-1$ e $1$. Nelle omogenee dividi per $\cos^2 x$, dopo aver controllato che $\cos x = 0$ non sia soluzione.`,
    R`Le disequazioni si risolvono sulla circonferenza. Colori l'arco giusto, lo scrivi in senso antiorario e aggiungi $2n\pi$ agli estremi.`
  ],

  sezioni: [
    { id: 'elementari-seno-coseno', titolo: 'Le equazioni elementari: seno e coseno', testo: R`Per quali angoli il seno vale $\frac12$? Il seno di un angolo è l'**ordinata** del suo punto sulla circonferenza goniometrica.

Traccia la retta orizzontale $y = \frac12$. Taglia la circonferenza in due punti, simmetrici rispetto all'asse $y$. Sono gli angoli $\frac{\pi}{6}$ e $\frac{5\pi}{6}$.

[[grafico:senoCirconferenza]]

Il secondo angolo è sempre $\pi$ meno il primo. Due angoli con somma $\pi$ si dicono **supplementari**, e hanno lo stesso seno.

Con $k = 1$ o $k = -1$ i due punti diventano uno solo. Con $|k| > 1$ la retta non tocca la circonferenza.

>* Se $-1 \le k \le 1$, le soluzioni di $\sin x = k$ sono $$x = \arcsin k + 2n\pi$$ oppure $$x = \pi - \arcsin k + 2n\pi$$ con $n$ intero qualsiasi. Se $|k| > 1$ non ci sono soluzioni.

$\arcsin k$ è l'angolo fra $-\frac{\pi}{2}$ e $\frac{\pi}{2}$ con seno $k$. È quello che dà la calcolatrice.

~ \sin x = -\frac{\sqrt3}{2} :: $k$ è fra $-1$ e $1$: ci sono soluzioni
~ \arcsin\left(-\frac{\sqrt3}{2}\right) = \evid{-\frac{\pi}{3}} :: il primo punto, nel quarto quadrante
~ \pi - \left(-\frac{\pi}{3}\right) = \evid{\frac{4\pi}{3}} :: il suo simmetrico rispetto all'asse $y$, nel terzo quadrante
~ x = \evidb{-\frac{\pi}{3} + 2n\pi} \ \lor\ x = \evidb{\frac{4\pi}{3} + 2n\pi} :: aggiungo i giri interi a tutte e due

Per il coseno guardi l'**ascissa**. La retta diventa verticale: $x = k$. Taglia la circonferenza in due punti simmetrici rispetto all'asse $x$. I loro angoli sono opposti, perché $\cos(-x) = \cos x$.

[[grafico:cosenoCirconferenza]]

>* Per il coseno, se $-1 \le k \le 1$: $$x = \pm\arccos k + 2n\pi, \qquad n \in \mathbb{Z}.$$ $\arccos k$ è l'angolo fra $0$ e $\pi$ che ha coseno $k$.

?? Quante soluzioni ha $\sin x = \frac12$ nell'intervallo $[0, 2\pi)$?
[x] due: $\frac{\pi}{6}$ e $\frac{5\pi}{6}$
[ ] una sola: $\frac{\pi}{6}$
[ ] due: $\frac{\pi}{6}$ e $-\frac{\pi}{6}$
[ ] infinite
=> La retta $y = \frac12$ taglia la circonferenza in $\frac{\pi}{6}$ e in $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$. Il $\pm$ è la regola del coseno: $-\frac{\pi}{6}$ ha seno $-\frac12$.

>! Non dimenticare la seconda soluzione, $\pi - \arcsin k$. E non scambiare le regole: il $\pm$ vale per il coseno. Nel dubbio disegna la retta: orizzontale per il seno, verticale per il coseno.

Nella scheda **Laboratorio** c'è *La ruota panoramica*: trova i due istanti in cui la cabina passa alla quota giusta.` },

    { id: 'elementare-tangente', titolo: 'L\'equazione elementare: la tangente', testo: R`La tangente è il rapporto $\dfrac{\sin x}{\cos x}$. Sulla circonferenza la leggi così. Prolunga il raggio del punto fino alla retta verticale $x = 1$. L'ordinata del punto d'incontro è $\tan x$.

Quella retta non finisce mai. Quindi la tangente può valere qualunque numero, e $\tan x = k$ ha soluzioni **per ogni** $k$.

Quanti angoli in un giro hanno la stessa tangente? Due, a mezzo giro di distanza. Per esempio $\frac{\pi}{4}$ e $\frac{5\pi}{4}$ hanno tutti e due tangente $1$.

>* Per ogni numero reale $k$: $$\tan x = k \iff x = \arctan k + n\pi$$ con $n$ intero qualsiasi. $\arctan k$ è l'angolo fra $-\frac{\pi}{2}$ e $\frac{\pi}{2}$ con tangente $k$. Il passo è $\pi$: mezzo giro.

Esempio: $\tan x = -1$. Qui $\arctan(-1) = -\frac{\pi}{4}$, quindi $x = -\frac{\pi}{4} + n\pi$. Fra $0$ e $2\pi$ trovi $\frac{3\pi}{4}$ (con $n = 1$) e $\frac{7\pi}{4}$ (con $n = 2$).

?? Uno studente risolve $\tan x = \sqrt3$ e scrive $x = \frac{\pi}{3} + 2n\pi$. Che cosa ha perso?
[x] le soluzioni $\frac{4\pi}{3} + 2n\pi$
[ ] le soluzioni $\frac{2\pi}{3} + 2n\pi$
[ ] niente: la risposta è completa
=> La tangente si ripete ogni $\pi$: la risposta giusta è $x = \frac{\pi}{3} + n\pi$. Con $2n\pi$ perdi $\frac{4\pi}{3}$, dove seno e coseno sono tutti e due negativi. $\frac{2\pi}{3}$ ha tangente $-\sqrt3$.

> La tangente non esiste dove $\cos x = 0$, cioè per $x = \frac{\pi}{2} + n\pi$. Nelle equazioni più complicate scrivi la condizione $x \ne \frac{\pi}{2} + n\pi$.` },

    { id: 'riconducibili-elementari', titolo: 'Equazioni riconducibili alle elementari', testo: R`Come risolvi $\sin 2x = \sin\left(x + \frac{\pi}{3}\right)$? A destra non c'è un numero, ma la circonferenza aiuta lo stesso. Due angoli hanno lo stesso seno se sono uguali oppure supplementari, a meno di giri interi.

>* Due angoli $\alpha$ e $\beta$ hanno lo stesso **seno** se $\alpha = \beta + 2n\pi$ oppure $\alpha = \pi - \beta + 2n\pi$. Hanno lo stesso **coseno** se $\alpha = \pm\beta + 2n\pi$. Hanno la stessa **tangente** se $\alpha = \beta + n\pi$.

Qui $\alpha = 2x$ e $\beta = x + \frac{\pi}{3}$. Primo caso: $2x = x + \frac{\pi}{3} + 2n\pi$, quindi $x = \frac{\pi}{3} + 2n\pi$. Il secondo caso ha qualche passaggio in più:

~ 2x = \pi - \left(x + \frac{\pi}{3}\right) + 2n\pi :: gli angoli sono supplementari
~ 2x = \evid{\frac{2\pi}{3} - x} + 2n\pi :: tolgo la parentesi: $\pi - \frac{\pi}{3} = \frac{2\pi}{3}$
~ \evid{3x} = \frac{2\pi}{3} + 2n\pi :: porto $-x$ al primo membro
~ x = \evidb{\frac{2\pi}{9} + \frac{2n\pi}{3}} :: divido **ogni** termine per $3$, anche $2n\pi$

Le soluzioni sono le due famiglie insieme.

?? Dividendo per $3$ l'uguaglianza $3x = \frac{2\pi}{3} + 2n\pi$, che cosa si ottiene?
[x] $x = \frac{2\pi}{9} + \frac{2n\pi}{3}$
[ ] $x = \frac{2\pi}{9} + 2n\pi$
[ ] $x = \frac{2\pi}{3} + \frac{2n\pi}{3}$
=> Dividi per $3$ ogni termine, anche $2n\pi$. Se lasci $2n\pi$, perdi due soluzioni su tre in ogni giro.

Se c'è un seno e un coseno, trasforma il coseno con gli angoli complementari: $\cos\beta = \sin\left(\frac{\pi}{2} - \beta\right)$. Così hai due seni.

> A volte una famiglia sta già dentro l'altra. In $\cos 2x = \cos x$ trovi $x = 2n\pi$ e $x = \frac{2n\pi}{3}$. La prima è compresa nella seconda: basta scrivere $x = \frac{2n\pi}{3}$.

>! Per il coseno servono tutti e due i segni: $\alpha = \beta + 2n\pi$ **e** $\alpha = -\beta + 2n\pi$. Per la tangente basta una condizione, con passo $n\pi$.` },

    { id: 'secondo-grado-in-una-funzione', titolo: 'Equazioni di secondo grado in una funzione goniometrica', testo: R`In $2\sin^2x - \sin x - 1 = 0$ compare solo $\sin x$: una volta al quadrato, una volta al primo grado. È un'equazione **di secondo grado in $\sin x$**. Poni $t = \sin x$, e diventa un'equazione che sai già risolvere.

~ 2\sin^2x - \sin x - 1 = 0 :: compare solo $\sin x$
~ 2\evid{t}^2 - \evid{t} - 1 = 0 :: pongo $t = \sin x$
~ t = \frac{1 \pm 3}{4} :: formula risolutiva, con $\Delta = 1 + 8 = 9$
~ \evid{t = 1} \ \lor\ \evid{t = -\frac12} :: tutte e due fra $-1$ e $1$: si tengono
~ \sin x = 1 \ \lor\ \sin x = -\frac12 :: torno alla $x$: due equazioni elementari
~ x = \evidb{\frac{\pi}{2} + 2n\pi} \ \lor\ x = \evidb{\frac{7\pi}{6} + 2n\pi} \ \lor\ x = \evidb{\frac{11\pi}{6} + 2n\pi} :: $\sin x = 1$ ha una sola soluzione per giro, $\sin x = -\frac12$ ne ha due

I passi sono sempre questi:

1. Poni $t = \sin x$ (o $\cos x$, o $\tan x$).
2. Risolvi l'equazione in $t$.
3. Controlla le $t$ che hai trovato.
4. Risolvi le equazioni elementari che restano.

>* Se $t$ è un seno o un coseno, **tieni solo le $t$ fra $-1$ e $1$**. Con la tangente le tieni tutte.

Con seno e coseno insieme, spesso basta $\sin^2 x = 1 - \cos^2 x$ per lasciarne uno solo:

~ 2\sin^2 x - 3\cos x = 0 :: c'è il seno al quadrato
~ 2\evid{(1 - \cos^2 x)} - 3\cos x = 0 :: sostituisco $\sin^2 x = 1 - \cos^2 x$
~ 2 - 2\cos^2 x - 3\cos x = 0 :: tolgo la parentesi
~ \evidb{2\cos^2 x + 3\cos x - 2 = 0} :: cambio tutti i segni: è di secondo grado in $\cos x$

?? Risolvendo $2\cos^2x + 3\cos x - 2 = 0$ con $t = \cos x$ trovi $t = \frac12$ e $t = -2$. Che cosa fai con $t = -2$?
[x] la scarto
[ ] scrivo $x = \pm\arccos(-2) + 2n\pi$
[ ] uso $t = 2$
=> Il coseno sta sempre fra $-1$ e $1$, quindi $\cos x = -2$ è impossibile. Restano le soluzioni di $\cos x = \frac12$, cioè $x = \pm\frac{\pi}{3} + 2n\pi$.

>! Se dimentichi il controllo su $t$, scrivi cose come $x = \arcsin 2$, che non esistono.` },

    { id: 'lineari-seno-coseno', titolo: 'Equazioni lineari in seno e coseno', testo: R`In $\sqrt3\sin x + \cos x = 1$ ci sono seno e coseno, tutti e due al primo grado. Un'equazione $a\sin x + b\cos x = c$ si chiama **lineare in seno e coseno**. Le funzioni sono due: i metodi che seguono ne lasciano una sola.

### Il metodo dell'angolo aggiunto
$a\sin x + b\cos x$ somiglia alla formula di addizione $\sin(x + \varphi) = \sin x\cos\varphi + \cos x\sin\varphi$. Per farla diventare uguale, raccogli $R = \sqrt{a^2 + b^2}$:

~ \sqrt3\sin x + \cos x = 1 :: qui $a = \sqrt3$, $b = 1$, $c = 1$
~ \evid{2}\left(\frac{\sqrt3}{2}\sin x + \frac12\cos x\right) = 1 :: raccolgo $R = \sqrt{3 + 1} = 2$
~ 2\left(\sin x\,\evid{\cos\frac{\pi}{6}} + \cos x\,\evid{\sin\frac{\pi}{6}}\right) = 1 :: $\frac{\sqrt3}{2}$ e $\frac12$ sono coseno e seno di $\frac{\pi}{6}$
~ 2\,\evid{\sin\left(x + \frac{\pi}{6}\right)} = 1 :: riconosco la formula di addizione del seno
~ x + \frac{\pi}{6} = \frac{\pi}{6} + 2n\pi \ \lor\ x + \frac{\pi}{6} = \frac{5\pi}{6} + 2n\pi :: $\sin\left(x + \frac{\pi}{6}\right) = \frac12$ è elementare
~ x = \evidb{2n\pi} \ \lor\ x = \evidb{\frac{2\pi}{3} + 2n\pi} :: tolgo $\frac{\pi}{6}$ da tutte e due

>* $a\sin x + b\cos x = R\sin(x + \varphi)$, con $R = \sqrt{a^2 + b^2}$, $\cos\varphi = \frac{a}{R}$ e $\sin\varphi = \frac{b}{R}$. Il seno non supera mai $1$. Quindi $a\sin x + b\cos x = c$ ha soluzioni **solo se** $|c| \le R$, cioè $a^2 + b^2 \ge c^2$.

Muovi $a$ e $b$ nel grafico. Guarda quando la curva smette di toccare la retta $y = 1$.

[[grafico:linearAB]]

?? Quante soluzioni ha $3\sin x + 4\cos x = 6$ in un giro?
[x] nessuna
[ ] due
[ ] una
=> $R = \sqrt{9 + 16} = 5$. Il primo membro è $5\sin(x + \varphi)$: non supera mai $5$, quindi non arriva a $6$. Fai il controllo $a^2 + b^2 \ge c^2$ **prima** dei conti: qui $25 \ge 36$ è falso.

### Il metodo grafico
Chiama $X = \cos x$ e $Y = \sin x$. L'equazione diventa la retta $bX + aY = c$, e il punto $(X; Y)$ sta sulla circonferenza $X^2 + Y^2 = 1$. Le soluzioni sono i punti comuni.

### Le formule parametriche
Poni $t = \tan\frac{x}{2}$, così $\sin x = \frac{2t}{1 + t^2}$ e $\cos x = \frac{1 - t^2}{1 + t^2}$. Sostituisci e moltiplica per $1 + t^2$: ottieni un'equazione in $t$.

>! $t = \tan\frac{x}{2}$ non esiste per $x = \pi + 2n\pi$. Quindi prova quei valori **a parte**, nell'equazione di partenza, o rischi di perdere una soluzione.` },

    { id: 'omogenee', titolo: 'Equazioni omogenee di secondo grado', testo: R`In $\sin^2x - \sin x\cos x - 2\cos^2x = 0$ ogni termine ha due fattori fra seno e coseno, e il termine noto manca. Un'equazione così si chiama **omogenea di secondo grado**: $$a\sin^2x + b\sin x\cos x + c\cos^2x = 0.$$

L'idea è dividere tutto per $\cos^2 x$: così ogni termine diventa una potenza di $\tan x$. Ma puoi dividere solo per qualcosa diverso da zero, quindi **prima** controlla se $\cos x = 0$ è soluzione.

~ \sin^2x - \sin x\cos x - 2\cos^2x = 0 :: omogenea, con $a = 1$
~ \cos x = 0 \Rightarrow \sin^2 x = 1 \Rightarrow 1 - 0 - 0 = \evid{1 \ne 0} :: con $\cos x = 0$ l'equazione è falsa: non è soluzione
~ \evid{\tan^2x - \tan x - 2 = 0} :: ora posso dividere per $\cos^2 x$
~ (\tan x - 2)(\tan x + 1) = 0 :: due numeri con somma $1$ e prodotto $-2$
~ x = \evidb{\arctan 2 + n\pi} \ \lor\ x = \evidb{-\frac{\pi}{4} + n\pi} :: due equazioni elementari in tangente

>* Con $\cos x = 0$ hai $\sin^2 x = 1$, e l'omogenea diventa $a = 0$. Quindi $\cos x = 0$ è soluzione **solo se $a = 0$**, cioè se manca il termine in $\sin^2 x$.

Se $a \ne 0$, dividi e risolvi $a\tan^2 x + b\tan x + c = 0$. Con la tangente non scarti nessuna soluzione.

Se $a = 0$, non dividere: raccogli $\cos x$. Ottieni $\cos x\,(b\sin x + c\cos x) = 0$, e risolvi i due fattori.

C'è anche un termine noto $d$? Scrivi $d = d\,(\sin^2 x + \cos^2 x)$ e porta tutto a sinistra. L'equazione diventa omogenea.

?? Nell'equazione $\sin^2x + \sin x\cos x = 1$ si scrive $1 = \sin^2x + \cos^2x$ e si porta tutto a sinistra. Che cosa si ottiene?
[x] $\sin x\cos x - \cos^2x = 0$
[ ] $\tan^2x + \tan x = 1$
[ ] $\sin x\cos x = 0$
=> $\sin^2 x$ si cancella: resta $\sin x\cos x - \cos^2 x = 0$. Scrivere $\tan^2x + \tan x = 1$ è sbagliato due volte. $1$ diviso $\cos^2 x$ non fa $1$, e perdi le soluzioni con $\cos x = 0$.` },

    { id: 'disequazioni-elementari', titolo: 'Disequazioni elementari', testo: R`Per quali angoli $\sin x > \frac12$? Il seno è l'ordinata: cerchi i punti della circonferenza **sopra** la retta $y = \frac12$. Formano un arco da $\frac{\pi}{6}$ a $\frac{5\pi}{6}$, passando per $\frac{\pi}{2}$. Le soluzioni sono $\frac{\pi}{6} + 2n\pi < x < \frac{5\pi}{6} + 2n\pi$.

[[grafico:disequazioneCirconferenza]]

Porta $k$ sotto lo zero: l'arco scende sotto l'asse $x$ e parte da un angolo negativo. Per $\sin x > -\frac12$ va da $-\frac{\pi}{6}$ a $\frac{7\pi}{6}$.

1. Risolvi l'equazione associata e segna i due punti sulla circonferenza.
2. Scegli l'arco giusto.
3. Scrivi l'arco in senso antiorario, dal primo estremo al secondo.
4. Aggiungi $2n\pi$ a tutti e due gli estremi.

>* Per il seno guardi sopra o sotto la retta orizzontale $y = k$. Per il coseno guardi a destra o a sinistra della retta verticale $x = k$.

~ 2\cos x - 1 > 0 :: disequazione di partenza
~ \cos x > \evid{\frac12} :: isolo il coseno
~ x = \evid{\pm\frac{\pi}{3}} :: l'equazione associata dà gli estremi dell'arco
~ \evidb{-\frac{\pi}{3} + 2n\pi < x < \frac{\pi}{3} + 2n\pi} :: l'arco a destra della retta $x = \frac12$ passa per l'angolo $0$: in senso antiorario parte da $-\frac{\pi}{3}$

Fra $0$ e $2\pi$ quell'arco si spezza in due pezzi: $0 \le x < \frac{\pi}{3}$ e $\frac{5\pi}{3} < x < 2\pi$.

?? Quale intervallo risolve $\cos x > \frac12$?
[x] $-\frac{\pi}{3} + 2n\pi < x < \frac{\pi}{3} + 2n\pi$
[ ] $\frac{\pi}{3} + 2n\pi < x < \frac{5\pi}{3} + 2n\pi$
[ ] $\frac{5\pi}{3} + 2n\pi < x < \frac{\pi}{3} + 2n\pi$
=> I punti con ascissa maggiore di $\frac12$ stanno sull'arco di destra, che contiene l'angolo $0$. Da $\frac{\pi}{3}$ a $\frac{5\pi}{3}$ c'è l'arco di sinistra, dove $\cos x < \frac12$. Da $\frac{5\pi}{3}$ a $\frac{\pi}{3}$ non ha senso: il primo estremo è più grande.

Per la tangente basta mezzo giro, da $-\frac{\pi}{2}$ a $\frac{\pi}{2}$. Lì la tangente cresce sempre. Per esempio $\tan x > 1$ vale per $\frac{\pi}{4} + n\pi < x < \frac{\pi}{2} + n\pi$.

>! Con $\ge$ e $\le$ gli estremi sono compresi. Fanno eccezione i valori $\frac{\pi}{2} + n\pi$ con la tangente. Lì la tangente non esiste, quindi sono sempre esclusi.` },

    { id: 'disequazioni-riconducibili', titolo: 'Disequazioni riconducibili', testo: R`Prodotti e frazioni si trattano come nelle disequazioni algebriche. Solo che ogni fattore dà archi sulla circonferenza.

1. Studia il segno di **ogni fattore** da solo.
2. Riporta i segni in una **tabella dei segni** su un solo giro, per esempio da $0$ a $2\pi$.
3. Leggi dove il prodotto ha il segno richiesto.

Esempio: $\sin x\,(2\cos x - 1) > 0$ fra $0$ e $2\pi$.

- $\sin x > 0$ per $0 < x < \pi$.
- $2\cos x - 1 > 0$ quando $\cos x > \frac12$: per $0 \le x < \frac{\pi}{3}$ e per $\frac{5\pi}{3} < x < 2\pi$.

I punti $0$, $\frac{\pi}{3}$, $\pi$, $\frac{5\pi}{3}$ dividono il giro in quattro tratti:

| tratto | $\sin x$ | $2\cos x - 1$ | prodotto |
|---|---|---|---|
| $0 < x < \frac{\pi}{3}$ | $+$ | $+$ | $+$ |
| $\frac{\pi}{3} < x < \pi$ | $+$ | $-$ | $-$ |
| $\pi < x < \frac{5\pi}{3}$ | $-$ | $-$ | $+$ |
| $\frac{5\pi}{3} < x < 2\pi$ | $-$ | $+$ | $-$ |

Le soluzioni sono $0 < x < \frac{\pi}{3}$ e $\pi < x < \frac{5\pi}{3}$, più $2n\pi$.

>* Nelle **fratte** studi il denominatore come gli altri fattori. Ma i valori che lo annullano non sono mai soluzioni.

?? Nella disequazione $\dfrac{2\cos x - 1}{\sin x} \ge 0$, quali valori vanno esclusi in ogni caso?
[x] $x = 0$ e $x = \pi$
[ ] $x = \frac{\pi}{3}$ e $x = \frac{5\pi}{3}$
[ ] nessuno, perché c'è il $\ge$
=> $0$ e $\pi$ annullano il denominatore. Lì la frazione non esiste, anche con il $\ge$. $\frac{\pi}{3}$ e $\frac{5\pi}{3}$ annullano il numeratore: la frazione vale $0$, e con $\ge$ sono soluzioni.

Nelle disequazioni di secondo grado fai la sostituzione, come nelle equazioni:

~ 2\sin^2x - \sin x - 1 \ge 0 :: di secondo grado in $\sin x$
~ 2t^2 - t - 1 \ge 0 :: pongo $t = \sin x$
~ t \le -\frac12 \ \lor\ t \ge 1 :: zeri $-\frac12$ e $1$, parabola verso l'alto: valori esterni
~ \sin x \le -\frac12 \ \lor\ \evid{\sin x = 1} :: il seno non supera mai $1$: $\sin x \ge 1$ vale solo con l'uguale
~ \evidb{\frac{7\pi}{6} + 2n\pi \le x \le \frac{11\pi}{6} + 2n\pi} \ \lor\ x = \evidb{\frac{\pi}{2} + 2n\pi} :: una disequazione e un'equazione elementari

>! Usa lo stesso giro per tutti i fattori, per esempio sempre da $0$ a $2\pi$. Con giri diversi i tratti non si corrispondono.` },

    { id: 'sistemi-cenni', titolo: 'Sistemi di equazioni e disequazioni goniometriche (cenni)', testo: R`A volte le condizioni sono più di una e devono valere **insieme**. È un **sistema**. Risolvi ogni condizione da sola. Poi tieni solo i valori che le soddisfano tutte: la loro **intersezione**.

Esempio: quali soluzioni di $\sin x = \frac12$, fra $0$ e $2\pi$, hanno anche $\cos x > 0$?

- $\sin x = \frac12$ dà $x = \frac{\pi}{6}$ e $x = \frac{5\pi}{6}$.
- $\frac{5\pi}{6}$ sta nel secondo quadrante. Lì il coseno è negativo: lo scarti.
- $\frac{\pi}{6}$ sta nel primo quadrante. Lì il coseno è positivo: lo tieni.

Resta solo $x = \frac{\pi}{6}$.

>* Le soluzioni di un sistema sono l'**intersezione** delle soluzioni delle condizioni. Se una condizione non vale, il valore si scarta.

Usa lo stesso giro per tutte le condizioni. Scrivile su righe una sotto l'altra, e leggi la parte comune in colonna.

>! Due famiglie con passi diversi, come $\frac{\pi}{4} + n\pi$ e $\frac{\pi}{4} + 2n\pi$, non si confrontano a occhio. Scrivi i valori di ciascuna fra $0$ e $2\pi$, poi confrontali.` }
  ],

  grafici: {
    senoCirconferenza: {
      tipo: 'piano', x: [-1.7, 1.7], y: [-1.35, 1.35], proporzioni: 'uguali', passo: [0.5, 0.5],
      parametri: [{ nome: 'k', min: -1, max: 1, passo: 0.05, valore: 0.5, nascosto: true }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1, colore: 1 },
        { tipo: 'orizzontale', y: 'k', colore: 2, tratteggio: true },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['sqrt(1-k^2)', 'k'], raggio: 0.28, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [-1, 0], a: ['-sqrt(1-k^2)', 'k'], raggio: 0.28, colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: ['sqrt(1-k^2)', 'k'], colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: ['-sqrt(1-k^2)', 'k'], colore: 3 },
        { tipo: 'punto', p: ['sqrt(1-k^2)', 'k'], etichetta: 'α₁', posizione: 'alto-destra', colore: 3 },
        { tipo: 'punto', p: ['-sqrt(1-k^2)', 'k'], etichetta: 'α₂', posizione: 'alto-sinistra', colore: 3 },
        { tipo: 'punto', p: [0, 'k'], trascina: true, etichetta: 'k = {{k}}', posizione: 'basso-destra', colore: 2 },
        { tipo: 'testo', p: [-1.65, 1.2], testo: 'α₁ = {{asin(k)*180/pi}}°', ancora: 'start' },
        { tipo: 'testo', p: [1.65, 1.2], testo: 'α₂ = {{180 - asin(k)*180/pi}}°', ancora: 'end' }
      ],
      didascalia: 'Trascina k su e giù lungo l\'asse y. La retta y = k taglia la circonferenza nei due angoli che hanno seno k: confronta α₁ e α₂, e guarda che cosa succede per k = 1.'
    },
    cosenoCirconferenza: {
      tipo: 'piano', x: [-1.7, 1.7], y: [-1.35, 1.35], proporzioni: 'uguali', passo: [0.5, 0.5],
      parametri: [{ nome: 'k', min: -1, max: 1, passo: 0.05, valore: 0.5, nascosto: true }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1, colore: 1 },
        { tipo: 'verticale', x: 'k', colore: 2, tratteggio: true },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['k', 'sqrt(1-k^2)'], raggio: 0.28, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['k', '-sqrt(1-k^2)'], raggio: 0.28, colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: ['k', 'sqrt(1-k^2)'], colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: ['k', '-sqrt(1-k^2)'], colore: 3 },
        { tipo: 'punto', p: ['k', 'sqrt(1-k^2)'], etichetta: 'α', posizione: 'alto-destra', colore: 3 },
        { tipo: 'punto', p: ['k', '-sqrt(1-k^2)'], etichetta: '−α', posizione: 'basso-destra', colore: 3 },
        { tipo: 'punto', p: ['k', 0], trascina: true, etichetta: 'k = {{k}}', posizione: 'basso-destra', colore: 2 },
        { tipo: 'testo', p: [-1.65, 1.2], testo: 'α = {{acos(k)*180/pi}}°', ancora: 'start' }
      ],
      didascalia: 'Trascina k lungo l\'asse x. La retta x = k taglia la circonferenza in due punti simmetrici rispetto all\'asse x: i loro angoli sono α e −α.'
    },
    disequazioneCirconferenza: {
      tipo: 'piano', x: [-1.7, 1.7], y: [-1.35, 1.35], proporzioni: 'uguali', passo: [0.5, 0.5], mirino: false,
      parametri: [{ nome: 'k', min: -1, max: 1, passo: 0.05, valore: 0.5, nascosto: true }],
      funzioni: [
        { f: 'sqrt(1-x^2)', dominio: ['-sqrt(1-((k+abs(k))/2)^2)', 'sqrt(1-((k+abs(k))/2)^2)'], colore: 2 },
        { f: '-sqrt(1-x^2)', dominio: [-1, '-sqrt(1-((k-abs(k))/2)^2)'], colore: 2 },
        { f: '-sqrt(1-x^2)', dominio: ['sqrt(1-((k-abs(k))/2)^2)', 1], colore: 2 }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1, colore: 1, tratteggio: true },
        { tipo: 'orizzontale', y: 'k', colore: 3, tratteggio: true },
        { tipo: 'punto', p: ['sqrt(1-k^2)', 'k'], colore: 2 },
        { tipo: 'punto', p: ['-sqrt(1-k^2)', 'k'], colore: 2 },
        { tipo: 'punto', p: [0, 'k'], trascina: true, etichetta: 'k = {{k}}', posizione: 'basso-destra', colore: 4 },
        { tipo: 'testo', p: [-1.65, 1.2], testo: '{{asin(k)*180/pi}}° < x < {{180 - asin(k)*180/pi}}°', ancora: 'start' }
      ],
      didascalia: 'L\'arco colorato è quello dove sin x > k. Trascina k: sopra lo zero l\'arco resta in alto, sotto lo zero scende a coprire anche una parte del semicerchio inferiore.'
    },
    linearAB: {
      tipo: 'piano', x: [-7, 7], y: [-2.5, 2.5], passo: [1, 1], altezza: 420,
      parametri: [
        { nome: 'a', min: -2, max: 2, passo: 0.1, valore: 0.6, etichetta: 'a' },
        { nome: 'b', min: -2, max: 2, passo: 0.1, valore: 0.5, etichetta: 'b' }
      ],
      funzioni: [{ f: 'a*sin(x) + b*cos(x)', colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: 1, colore: 2 },
        { tipo: 'testo', p: [-6.8, 1.2], testo: 'y = 1', ancora: 'start' },
        { tipo: 'orizzontale', y: 'sqrt(a^2+b^2)', colore: 4, tratteggio: true },
        { tipo: 'orizzontale', y: '-sqrt(a^2+b^2)', colore: 4, tratteggio: true },
        { tipo: 'testo', p: [-6.8, 2.15], testo: 'R = {{sqrt(a^2+b^2)}}', ancora: 'start' }
      ],
      didascalia: 'Muovi a e b. La curva blu y = a·sin x + b·cos x resta sempre fra le due linee tratteggiate y = R e y = −R, con R = √(a² + b²). Tocca la retta y = 1 solo quando R arriva almeno a 1.'
    }
  },

  esempi: [
    { titolo: 'Un\'equazione elementare in coseno', problema: R`Risolvi $2\cos x + \sqrt3 = 0$.`, passi: [
      R`Isolo il coseno, come in un'equazione di primo grado: $\cos x = -\dfrac{\sqrt3}{2}$.`,
      R`$k = -\dfrac{\sqrt3}{2}$ è fra $-1$ e $1$, quindi ci sono soluzioni.`,
      R`L'angolo fra $0$ e $\pi$ con coseno $-\dfrac{\sqrt3}{2}$ è $\dfrac{5\pi}{6}$: nel secondo quadrante il coseno è negativo, e $\cos\dfrac{\pi}{6} = \dfrac{\sqrt3}{2}$.`,
      R`Con il coseno le due soluzioni sono opposte: $x = \pm\dfrac{5\pi}{6} + 2n\pi$. Fra $0$ e $2\pi$ sono $\dfrac{5\pi}{6}$ e $-\dfrac{5\pi}{6} + 2\pi = \dfrac{7\pi}{6}$.`
    ], risultato: R`$x = \pm\dfrac{5\pi}{6}+2n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Seno uguale a coseno', problema: R`Risolvi $\sin 3x = \cos x$.`, passi: [
      R`A sinistra c'è un seno, a destra un coseno: trasformo il coseno con gli angoli complementari, $\cos x = \sin\left(\dfrac{\pi}{2} - x\right)$.`,
      R`L'equazione diventa $\sin 3x = \sin\left(\dfrac{\pi}{2} - x\right)$: due seni uguali, quindi angoli uguali oppure supplementari.`,
      R`Angoli uguali: $3x = \dfrac{\pi}{2} - x + 2n\pi$, cioè $4x = \dfrac{\pi}{2} + 2n\pi$. Divido ogni termine per $4$: $x = \dfrac{\pi}{8} + \dfrac{n\pi}{2}$.`,
      R`Angoli supplementari: $3x = \pi - \left(\dfrac{\pi}{2} - x\right) + 2n\pi = \dfrac{\pi}{2} + x + 2n\pi$, cioè $2x = \dfrac{\pi}{2} + 2n\pi$. Divido per $2$: $x = \dfrac{\pi}{4} + n\pi$.`
    ], risultato: R`$x = \dfrac{\pi}{8} + \dfrac{n\pi}{2} \ \lor\ x = \dfrac{\pi}{4} + n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Secondo grado in seno, con una soluzione da scartare', problema: R`Risolvi $2\sin^2x + 5\sin x - 3 = 0$.`, passi: [
      R`Compare solo $\sin x$: pongo $t = \sin x$ e ottengo $2t^2 + 5t - 3 = 0$.`,
      R`$\Delta = 25 + 24 = 49$, quindi $t = \dfrac{-5 \pm 7}{4}$: $t = \dfrac12$ oppure $t = -3$.`,
      R`$t = -3$ si scarta: il seno non scende mai sotto $-1$.`,
      R`Resta $\sin x = \dfrac12$: $x = \dfrac{\pi}{6} + 2n\pi$ oppure $x = \pi - \dfrac{\pi}{6} + 2n\pi = \dfrac{5\pi}{6} + 2n\pi$.`
    ], risultato: R`$x=\dfrac{\pi}{6}+2n\pi \ \lor\ x=\dfrac{5\pi}{6}+2n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Un\'omogenea in cui cos x = 0 è soluzione', problema: R`Risolvi $\sin x\cos x - \sqrt3\cos^2x = 0$.`, passi: [
      R`È omogenea di secondo grado, ma manca il termine in $\sin^2 x$: $a = 0$.`,
      R`Controllo $\cos x = 0$: il primo membro vale $0 - 0 = 0$, quindi è soluzione. Dividere per $\cos^2 x$ la farebbe perdere.`,
      R`Raccolgo $\cos x$: $\cos x\,(\sin x - \sqrt3\cos x) = 0$. Un prodotto è zero se lo è uno dei fattori.`,
      R`Primo fattore: $\cos x = 0$, cioè $x = \dfrac{\pi}{2} + n\pi$.`,
      R`Secondo fattore: $\sin x = \sqrt3\cos x$. Qui $\cos x$ non può essere zero (sarebbe zero anche $\sin x$, impossibile), quindi divido per $\cos x$: $\tan x = \sqrt3$, cioè $x = \dfrac{\pi}{3} + n\pi$.`
    ], risultato: R`$x=\dfrac{\pi}{2}+n\pi \ \lor\ x=\dfrac{\pi}{3}+n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Un\'equazione lineare con le formule parametriche', problema: R`Risolvi $\sin x+\cos x=1$ con le formule parametriche.`, passi: [
      R`Pongo $t=\tan\dfrac{x}{2}$, così $\sin x=\dfrac{2t}{1+t^2}$ e $\cos x=\dfrac{1-t^2}{1+t^2}$. Mi segno di controllare alla fine $x=\pi+2n\pi$, dove $t$ non esiste.`,
      R`Sostituisco e moltiplico tutto per $1+t^2$, che non è mai zero: $2t+1-t^2=1+t^2$.`,
      R`Porto tutto a sinistra: $2t-2t^2=0$, cioè $2t(1-t)=0$. Quindi $t=0$ oppure $t=1$.`,
      R`$t=0$ vuol dire $\tan\dfrac{x}{2}=0$: $\dfrac{x}{2}=n\pi$, cioè $x=2n\pi$.`,
      R`$t=1$ vuol dire $\tan\dfrac{x}{2}=1$: $\dfrac{x}{2}=\dfrac{\pi}{4}+n\pi$, cioè $x=\dfrac{\pi}{2}+2n\pi$.`,
      R`Controllo $x=\pi$: $\sin\pi+\cos\pi=0-1=-1\ne1$. Non è soluzione, quindi non ho perso niente.`
    ], risultato: R`$x=2n\pi \ \lor\ x=\dfrac{\pi}{2}+2n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Una disequazione elementare', problema: R`Risolvi $\sqrt2\cos x + 1 < 0$.`, passi: [
      R`Isolo il coseno: $\cos x < -\dfrac{1}{\sqrt2} = -\dfrac{\sqrt2}{2}$.`,
      R`Equazione associata: $\cos x = -\dfrac{\sqrt2}{2}$ per $x = \pm\dfrac{3\pi}{4}$. Sono gli estremi dell'arco.`,
      R`Il coseno è l'ascissa: cerco i punti a **sinistra** della retta verticale $x = -\dfrac{\sqrt2}{2}$. È l'arco che contiene $\pi$.`,
      R`Percorso in senso antiorario, l'arco va da $\dfrac{3\pi}{4}$ a $-\dfrac{3\pi}{4} + 2\pi = \dfrac{5\pi}{4}$. Aggiungo $2n\pi$ agli estremi.`
    ], risultato: R`$\dfrac{3\pi}{4}+2n\pi < x < \dfrac{5\pi}{4}+2n\pi, \quad n\in\mathbb{Z}$` }
  ],

  formulario: [
    { nome: 'Equazione elementare: seno', formula: R`\sin x = k \quad\Longrightarrow\quad x = \arcsin k + 2n\pi \ \lor\ x = \pi - \arcsin k + 2n\pi`, nota: R`Ha soluzioni solo se $-1 \le k \le 1$; con $n \in \mathbb{Z}$.` },
    { nome: 'Equazione elementare: coseno', formula: R`\cos x = k \quad\Longrightarrow\quad x = \pm\arccos k + 2n\pi`, nota: R`Ha soluzioni solo se $-1 \le k \le 1$.` },
    { nome: 'Equazione elementare: tangente', formula: R`\tan x = k \quad\Longrightarrow\quad x = \arctan k + n\pi`, nota: R`Ha sempre soluzione, per ogni $k \in \mathbb{R}$: il periodo è $\pi$, non $2\pi$.` },
    { nome: 'Archi con lo stesso seno, coseno o tangente', formula: R`\sin\alpha = \sin\beta \iff \alpha = \beta + 2n\pi \ \lor\ \alpha = \pi - \beta + 2n\pi`, nota: R`Analogamente $\cos\alpha = \cos\beta \iff \alpha = \pm\beta + 2n\pi$ e $\tan\alpha = \tan\beta \iff \alpha = \beta + n\pi$.` },
    { nome: 'Sostituzione nel secondo grado in una funzione', formula: R`a\,t^2+b\,t+c=0, \qquad t=\sin x \ \text{(o } \cos x\text{)}`, nota: R`Si accettano solo le soluzioni $t$ con $-1 \le t \le 1$; nessun limite se $t = \tan x$.` },
    { nome: 'Metodo dell\'angolo aggiunto', formula: R`a\sin x + b\cos x = R\sin(x + \varphi), \qquad R = \sqrt{a^2+b^2}`, nota: R`Con $\cos\varphi = \dfrac{a}{R}$ e $\sin\varphi = \dfrac{b}{R}$.` },
    { nome: 'Condizione di esistenza (equazione lineare)', formula: R`a\sin x + b\cos x = c \quad \text{ha soluzioni} \iff a^2+b^2 \ge c^2`, nota: R`Cioè $R \ge |c|$, con $R = \sqrt{a^2+b^2}$.` },
    { nome: 'Formule parametriche', formula: R`\sin x = \frac{2t}{1+t^2}, \qquad \cos x = \frac{1-t^2}{1+t^2}, \qquad t = \tan\frac{x}{2}`, nota: R`Va sempre controllato a parte $x = \pi + 2n\pi$, dove $t$ non è definito.` },
    { nome: 'Equazione omogenea di secondo grado', formula: R`a\sin^2x + b\sin x\cos x + c\cos^2x = 0`, nota: R`Se $\cos x \ne 0$ si divide per $\cos^2x$: $a\tan^2x + b\tan x + c = 0$.` },
    { nome: 'Caso cos x = 0 nell\'omogenea', formula: R`\cos x = 0 \ \text{è soluzione} \iff a = 0`, nota: R`Va controllato prima di dividere per $\cos^2x$.` },
    { nome: 'Disequazione elementare: schema risolutivo', formula: R`\sin x > k \quad\Longrightarrow\quad x \in (\text{arco dove l'ordinata supera } k), \ \text{ripetuto ogni } 2\pi`, nota: R`Analogo per $\cos x$ (ascissa) e per $\tan x$ (periodo $\pi$).` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'elementari-seno-coseno', tipo: 'formula', fronte: R`Soluzione generale di $\sin x = k$ (con $|k|\le1$)`, retro: R`$x = \arcsin k + 2n\pi \ \lor\ x = \pi - \arcsin k + 2n\pi$` },
    { id: 'fc-02', sezione: 'elementari-seno-coseno', tipo: 'formula', fronte: R`Soluzione generale di $\cos x = k$ (con $|k|\le1$)`, retro: R`$x = \pm\arccos k + 2n\pi$` },
    { id: 'fc-03', sezione: 'elementari-seno-coseno', tipo: 'concetto', fronte: R`Quando $\sin x = k$ o $\cos x = k$ sono impossibili?`, retro: R`Quando $|k| > 1$: seno e coseno non superano mai $1$ in valore assoluto.` },
    { id: 'fc-04', sezione: 'elementari-seno-coseno', tipo: 'concetto', fronte: R`Perché $\sin x = k$ ha due famiglie di soluzioni?`, retro: R`Perché $\sin(\pi - x) = \sin x$: archi supplementari hanno lo stesso seno.` },
    { id: 'fc-05', sezione: 'elementare-tangente', tipo: 'formula', fronte: R`Soluzione generale di $\tan x = k$`, retro: R`$x = \arctan k + n\pi$, per ogni $k \in \mathbb{R}$.` },
    { id: 'fc-06', sezione: 'elementare-tangente', tipo: 'concetto', fronte: R`Perché $\tan x = k$ ha sempre soluzione, qualunque sia $k$?`, retro: R`Perché il codominio della tangente è tutto $\mathbb{R}$: nessun valore di $k$ è escluso.` },
    { id: 'fc-07', sezione: 'elementare-tangente', tipo: 'concetto', fronte: R`Perché il periodo di $\tan x = k$ è $\pi$ e non $2\pi$?`, retro: R`Perché $\tan(x+\pi) = \tan x$: un mezzo giro basta a ripetere la tangente.` },
    { id: 'fc-08', sezione: 'riconducibili-elementari', tipo: 'procedura', fronte: R`Come si risolve $\sin\alpha = \sin\beta$?`, retro: R`$\alpha = \beta + 2n\pi$ oppure $\alpha = \pi - \beta + 2n\pi$.` },
    { id: 'fc-09', sezione: 'riconducibili-elementari', tipo: 'procedura', fronte: R`Come si risolve $\cos\alpha = \cos\beta$?`, retro: R`$\alpha = \pm\beta + 2n\pi$.` },
    { id: 'fc-10', sezione: 'riconducibili-elementari', tipo: 'procedura', fronte: R`Come si risolve $\tan\alpha = \tan\beta$?`, retro: R`$\alpha = \beta + n\pi$ (con $\cos\alpha \ne 0$, $\cos\beta \ne 0$).` },
    { id: 'fc-11', sezione: 'secondo-grado-in-una-funzione', tipo: 'procedura', fronte: R`Come si risolve un'equazione di secondo grado in $\sin x$?`, retro: R`Si pone $t=\sin x$, si risolve la quadratica in $t$, si scartano le soluzioni con $|t|>1$, poi si risolvono le equazioni elementari rimaste.` },
    { id: 'fc-12', sezione: 'secondo-grado-in-una-funzione', tipo: 'concetto', fronte: R`Perché serve controllare che $t \in [-1,1]$?`, retro: R`Perché $\sin x$ e $\cos x$ sono limitati fra $-1$ e $1$: un valore fuori da quell'intervallo non corrisponde a nessun $x$.` },
    { id: 'fc-13', sezione: 'lineari-seno-coseno', tipo: 'formula', fronte: R`Metodo dell'angolo aggiunto`, retro: R`$a\sin x + b\cos x = R\sin(x+\varphi)$, con $R=\sqrt{a^2+b^2}$, $\cos\varphi=\frac{a}{R}$, $\sin\varphi=\frac{b}{R}$.` },
    { id: 'fc-14', sezione: 'lineari-seno-coseno', tipo: 'concetto', fronte: R`Quando $a\sin x + b\cos x = c$ ha soluzioni?`, retro: R`Quando $a^2+b^2 \ge c^2$, cioè $R \ge |c|$.` },
    { id: 'fc-15', sezione: 'lineari-seno-coseno', tipo: 'formula', fronte: R`Formule parametriche con $t=\tan\frac{x}{2}$`, retro: R`$\sin x = \dfrac{2t}{1+t^2}$, $\cos x = \dfrac{1-t^2}{1+t^2}$.` },
    { id: 'fc-16', sezione: 'lineari-seno-coseno', tipo: 'concetto', fronte: R`Perché va controllato $x=\pi+2n\pi$ nel metodo parametrico?`, retro: R`Perché lì $\tan\frac{x}{2}$ non esiste: la sostituzione non può trovare quei valori, quindi vanno provati a mano nell'equazione di partenza.` },
    { id: 'fc-17', sezione: 'omogenee', tipo: 'definizione', fronte: R`Equazione omogenea di secondo grado (in seno e coseno)`, retro: R`$a\sin^2x+b\sin x\cos x+c\cos^2x=0$: ogni termine ha grado $2$, il termine noto è zero.` },
    { id: 'fc-18', sezione: 'omogenee', tipo: 'procedura', fronte: R`Come si risolve un'equazione omogenea?`, retro: R`Si controlla se $\cos x=0$ è soluzione, poi (se non lo è) si divide per $\cos^2x$: si ottiene $a\tan^2x+b\tan x+c=0$.` },
    { id: 'fc-19', sezione: 'omogenee', tipo: 'concetto', fronte: R`Quando $\cos x = 0$ è soluzione dell'omogenea?`, retro: R`Solo se $a=0$: sostituendo $\cos x=0$ (e quindi $\sin^2x=1$) l'equazione diventa $a=0$.` },
    { id: 'fc-20', sezione: 'disequazioni-elementari', tipo: 'procedura', fronte: R`Come si risolve $\sin x > k$ con la circonferenza?`, retro: R`Si traccia $y=k$ e si individua l'arco (o gli archi) dove l'ordinata dei punti supera $k$.` },
    { id: 'fc-21', sezione: 'disequazioni-elementari', tipo: 'concetto', fronte: R`Che forma ha la soluzione di una disequazione goniometrica elementare?`, retro: R`Uno o più intervalli, ripetuti con periodo $2\pi$ (o $\pi$ per la tangente): quasi mai punti isolati.` },
    { id: 'fc-22', sezione: 'disequazioni-riconducibili', tipo: 'procedura', fronte: R`Come si risolve una disequazione goniometrica prodotto o fratta?`, retro: R`Si studia il segno di ciascun fattore (disequazioni elementari), si costruisce la tabella dei segni sullo stesso periodo, si legge il segno finale.` },
    { id: 'fc-23', sezione: 'sistemi-cenni', tipo: 'concetto', fronte: R`Le soluzioni di un sistema di condizioni goniometriche sono...`, retro: R`L'intersezione delle soluzioni di ciascuna condizione, non l'unione.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Risolvi $\sin x = 1$ con $x$ in $[0; 2\pi)$. Scrivi le soluzioni con $\pi$, separate da punto e virgola. Se non ce ne sono, scrivi *nessuna*.`, suggerimenti: [R`Il seno è l'ordinata: quale punto della circonferenza ha ordinata $1$?`], risposta: rad(1 / 2), soluzione: [R`Il seno è l'ordinata del punto sulla circonferenza.`, R`L'ordinata vale $1$ solo nel punto più alto, $(0; 1)$.`, R`Quel punto è l'angolo $x = \dfrac{\pi}{2}$: una sola soluzione.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Risolvi $\cos x = 0$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Il coseno è l'ascissa: quali punti della circonferenza stanno sull'asse $y$?`], risposta: rad(1 / 2, 3 / 2), soluzione: [R`Il coseno è l'ascissa: cerco i punti con ascissa $0$.`, R`Sono il punto più alto e il punto più basso della circonferenza.`, R`Soluzioni: $x = \dfrac{\pi}{2}$ e $x = \dfrac{3\pi}{2}$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Risolvi $\sin x = \dfrac12$ con $x$ in $[0°; 360°)$. Scrivi le soluzioni in gradi, separate da punto e virgola.`, suggerimenti: [R`Quale angolo notevole ha seno $\dfrac12$?`, R`L'altra soluzione è il supplementare: $180°$ meno la prima.`], risposta: gradi(30, 150), soluzione: [R`$\sin 30° = \dfrac12$: la prima soluzione è $30°$.`, R`Il supplementare ha lo stesso seno: $180° - 30° = 150°$.`, R`Soluzioni: $30°$ e $150°$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Risolvi $\cos x = \dfrac12$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Quale angolo notevole ha coseno $\dfrac12$?`, R`Con il coseno le soluzioni sono opposte. Riporta quella negativa fra $0$ e $2\pi$.`], risposta: rad(1 / 3, 5 / 3), soluzione: [R`$\cos\dfrac{\pi}{3} = \dfrac12$: la prima soluzione è $\dfrac{\pi}{3}$.`, R`L'angolo opposto, $-\dfrac{\pi}{3}$, ha lo stesso coseno.`, R`Aggiungo un giro per portarlo in $[0; 2\pi)$: $-\dfrac{\pi}{3} + 2\pi = \dfrac{5\pi}{3}$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Risolvi $\tan x = 1$ con $x$ in $[0°; 360°)$, in gradi.`, suggerimenti: [R`Quale angolo notevole ha tangente $1$?`, R`La tangente si ripete ogni $180°$.`], risposta: gradi(45, 225), soluzione: [R`$\tan 45° = 1$: la prima soluzione è $45°$.`, R`La tangente si ripete ogni $180°$: $45° + 180° = 225°$.`, R`Soluzioni: $45°$ e $225°$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Risolvi $\sin x = 2$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Fra quali valori sta sempre il seno?`], risposta: nessunaRad, soluzione: [R`Il seno è l'ordinata di un punto della circonferenza di raggio $1$.`, R`Quindi sta sempre fra $-1$ e $1$: non arriva mai a $2$.`, R`L'equazione non ha soluzioni.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Risolvi $\cos x = -\dfrac12$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`$\cos\dfrac{\pi}{3} = \dfrac12$. Il coseno è negativo nel secondo e nel terzo quadrante.`, R`Nel secondo quadrante l'angolo è $\pi - \dfrac{\pi}{3}$, nel terzo è $\pi + \dfrac{\pi}{3}$.`], risposta: rad(2 / 3, 4 / 3), soluzione: [R`L'angolo di riferimento è $\dfrac{\pi}{3}$, perché $\cos\dfrac{\pi}{3} = \dfrac12$.`, R`Il coseno è negativo a sinistra dell'asse $y$: secondo e terzo quadrante.`, R`Secondo quadrante: $\pi - \dfrac{\pi}{3} = \dfrac{2\pi}{3}$. Terzo: $\pi + \dfrac{\pi}{3} = \dfrac{4\pi}{3}$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Risolvi $\sin x = -\dfrac{\sqrt2}{2}$ con $x$ in $[0°; 360°)$, in gradi.`, suggerimenti: [R`$\sin 45° = \dfrac{\sqrt2}{2}$. Il seno è negativo nel terzo e nel quarto quadrante.`], risposta: gradi(225, 315), soluzione: [R`L'angolo di riferimento è $45°$, perché $\sin 45° = \dfrac{\sqrt2}{2}$.`, R`Il seno è negativo sotto l'asse $x$: terzo e quarto quadrante.`, R`Terzo quadrante: $180° + 45° = 225°$. Quarto: $360° - 45° = 315°$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Risolvi $\tan x = -\sqrt3$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`$\tan\dfrac{\pi}{3} = \sqrt3$. La tangente è negativa nel secondo e nel quarto quadrante.`, R`La seconda soluzione è la prima più $\pi$.`], risposta: rad(2 / 3, 5 / 3), soluzione: [R`L'angolo di riferimento è $\dfrac{\pi}{3}$, perché $\tan\dfrac{\pi}{3} = \sqrt3$.`, R`Nel secondo quadrante la tangente è negativa: $\pi - \dfrac{\pi}{3} = \dfrac{2\pi}{3}$.`, R`La tangente si ripete ogni $\pi$: $\dfrac{2\pi}{3} + \pi = \dfrac{5\pi}{3}$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Risolvi $\cos x = \dfrac{\sqrt3}{2}$ con $x$ in $[0°; 360°)$, in gradi.`, suggerimenti: [R`Quale angolo notevole ha coseno $\dfrac{\sqrt3}{2}$?`, R`L'altra soluzione è l'angolo opposto, riportato fra $0°$ e $360°$.`], risposta: gradi(30, 330), soluzione: [R`$\cos 30° = \dfrac{\sqrt3}{2}$: la prima soluzione è $30°$.`, R`Anche $-30°$ ha lo stesso coseno.`, R`Aggiungo un giro: $-30° + 360° = 330°$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Risolvi $2\sin x - 1 = 0$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Isola $\sin x$, come in un'equazione di primo grado.`], risposta: rad(1 / 6, 5 / 6), soluzione: [R`Porto $-1$ a destra: $2\sin x = 1$.`, R`Divido per $2$: $\sin x = \dfrac12$.`, R`Soluzioni: $\dfrac{\pi}{6}$ e $\pi - \dfrac{\pi}{6} = \dfrac{5\pi}{6}$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Risolvi $2\cos x + \sqrt2 = 0$ con $x$ in $[0°; 360°)$, in gradi.`, suggerimenti: [R`Isola $\cos x$.`, R`Trovi $\cos x = -\dfrac{\sqrt2}{2}$: il coseno è negativo nel secondo e nel terzo quadrante.`], risposta: gradi(135, 225), soluzione: [R`Isolo il coseno: $2\cos x = -\sqrt2$, quindi $\cos x = -\dfrac{\sqrt2}{2}$.`, R`L'angolo di riferimento è $45°$. Il coseno è negativo nel secondo e nel terzo quadrante.`, R`Secondo quadrante: $180° - 45° = 135°$. Terzo: $180° + 45° = 225°$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt3\tan x - 1 = 0$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Isola $\tan x$.`, R`$\dfrac{1}{\sqrt3} = \dfrac{\sqrt3}{3}$ è la tangente di un angolo notevole.`], risposta: rad(1 / 6, 7 / 6), soluzione: [R`Isolo la tangente: $\tan x = \dfrac{1}{\sqrt3} = \dfrac{\sqrt3}{3}$.`, R`$\tan\dfrac{\pi}{6} = \dfrac{\sqrt3}{3}$: la prima soluzione è $\dfrac{\pi}{6}$.`, R`La tangente si ripete ogni $\pi$: $\dfrac{\pi}{6} + \pi = \dfrac{7\pi}{6}$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Risolvi $2\cos x + 3 = 0$ con $x$ in $[0°; 360°)$, in gradi.`, suggerimenti: [R`Isola $\cos x$ e guarda bene il numero che trovi.`], risposta: nessunaGradi, soluzione: [R`Isolo il coseno: $\cos x = -\dfrac32 = -1{,}5$.`, R`Il coseno sta sempre fra $-1$ e $1$, e $-1{,}5$ è minore di $-1$.`, R`L'equazione non ha soluzioni.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Risolvi $2\sin x + \sqrt3 = 0$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Isola $\sin x$.`, R`Il seno è negativo nel terzo e nel quarto quadrante.`], risposta: rad(4 / 3, 5 / 3), soluzione: [R`Isolo il seno: $\sin x = -\dfrac{\sqrt3}{2}$.`, R`L'angolo di riferimento è $\dfrac{\pi}{3}$. Il seno è negativo sotto l'asse $x$.`, R`Terzo quadrante: $\pi + \dfrac{\pi}{3} = \dfrac{4\pi}{3}$. Quarto: $2\pi - \dfrac{\pi}{3} = \dfrac{5\pi}{3}$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Risolvi $\sin^2 x = \dfrac14$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Se il quadrato vale $\dfrac14$, il seno vale $\dfrac12$ oppure $-\dfrac12$.`, R`Risolvi tutte e due le equazioni.`], risposta: rad(1 / 6, 5 / 6, 7 / 6, 11 / 6), soluzione: [R`Estraggo la radice con tutti e due i segni: $\sin x = \dfrac12$ oppure $\sin x = -\dfrac12$.`, R`$\sin x = \dfrac12$: $x = \dfrac{\pi}{6}$ e $x = \dfrac{5\pi}{6}$.`, R`$\sin x = -\dfrac12$: $x = \dfrac{7\pi}{6}$ e $x = \dfrac{11\pi}{6}$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Risolvi $\sin 2x = \dfrac12$ con $x$ in $[0°; 360°)$, in gradi.`, suggerimenti: [R`Trova prima i valori di $2x$, poi dividi per $2$.`, R`Se $x$ va da $0°$ a $360°$, allora $2x$ va da $0°$ a $720°$: due giri.`], risposta: gradi(15, 75, 195, 255), soluzione: [R`Il seno vale $\dfrac12$ in $30°$ e $150°$, più i giri interi.`, R`$2x$ va da $0°$ a $720°$. Nel secondo giro trovo $2x = 390°$ e $2x = 510°$.`, R`Divido per $2$: $x = 15°$, $75°$, $195°$, $255°$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Risolvi $\cos 2x = 0$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Trova prima i valori di $2x$, poi dividi per $2$.`, R`Se $x$ va da $0$ a $2\pi$, allora $2x$ va da $0$ a $4\pi$: due giri.`], risposta: rad(1 / 4, 3 / 4, 5 / 4, 7 / 4), soluzione: [R`Il coseno vale $0$ in $\dfrac{\pi}{2}$ e $\dfrac{3\pi}{2}$, più i giri interi.`, R`$2x$ va da $0$ a $4\pi$: $2x = \dfrac{\pi}{2}$, $\dfrac{3\pi}{2}$, $\dfrac{5\pi}{2}$, $\dfrac{7\pi}{2}$.`, R`Divido per $2$: $x = \dfrac{\pi}{4}$, $\dfrac{3\pi}{4}$, $\dfrac{5\pi}{4}$, $\dfrac{7\pi}{4}$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Risolvi $\tan^2 x = 3$ con $x$ in $[0°; 360°)$, in gradi.`, suggerimenti: [R`Se il quadrato vale $3$, la tangente vale $\sqrt3$ oppure $-\sqrt3$.`, R`La tangente si ripete ogni $180°$.`], risposta: gradi(60, 120, 240, 300), soluzione: [R`Estraggo la radice con tutti e due i segni: $\tan x = \sqrt3$ oppure $\tan x = -\sqrt3$.`, R`$\tan x = \sqrt3$: $x = 60°$ e $x = 60° + 180° = 240°$.`, R`$\tan x = -\sqrt3$: $x = 120°$ e $x = 120° + 180° = 300°$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Risolvi $2\sin^2 x - \sin x = 0$ con $x$ in $[0; 2\pi)$.`, suggerimenti: [R`Manca il termine noto: raccogli $\sin x$.`, R`Un prodotto vale zero se vale zero uno dei fattori.`], risposta: rad(0, 1 / 6, 5 / 6, 1), soluzione: [R`Raccolgo $\sin x$: $\sin x\,(2\sin x - 1) = 0$.`, R`Primo fattore: $\sin x = 0$ per $x = 0$ e $x = \pi$.`, R`Secondo fattore: $\sin x = \dfrac12$ per $x = \dfrac{\pi}{6}$ e $x = \dfrac{5\pi}{6}$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Risolvi $\sin x = \dfrac{1}{2}$ nell'intervallo $[0, 2\pi)$ (nella casella scrivi i valori separati da punto e virgola, con $\pi$ o in decimali: per esempio «π/5» oppure «0,63»).`, suggerimenti: [R`Pensa alla circonferenza goniometrica: per quali archi l'ordinata vale $\frac12$?`, R`Ci sono due soluzioni: una nel primo quadrante, una nel secondo.`], risposta: { tipo: 'numeri', valori: [0.5236, 2.618] }, soluzione: [R`$\arcsin\dfrac12 = \dfrac{\pi}{6}$.`, R`Le due soluzioni in $[0,2\pi)$ sono $x=\dfrac{\pi}{6}$ e $x=\pi-\dfrac{\pi}{6}=\dfrac{5\pi}{6}$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Risolvi $\cos x = -1$ nell'intervallo $[0, 2\pi)$ (nella casella scrivi il valore decimale: per esempio $\frac{\pi}{5}\approx 0{,}63$).`, suggerimenti: [R`Su quale punto della circonferenza goniometrica il coseno vale esattamente $-1$?`, R`È un unico punto, non due.`], risposta: { tipo: 'numero', valore: 3.1416, tolleranza: 0.01 }, soluzione: [R`Il coseno vale $-1$ solo nel punto $(-1,0)$ della circonferenza, cioè per $x=\pi$.`, R`In $[0,2\pi)$ c'è un'unica soluzione: $x=\pi$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Risolvi $\tan x = -1$ nell'intervallo $[0, 2\pi)$ (nella casella scrivi i valori separati da punto e virgola, con $\pi$ o in decimali: per esempio «π/5» oppure «0,63»).`, suggerimenti: [R`$\arctan(-1) = -\dfrac{\pi}{4}$: cerca l'angolo equivalente in $[0,2\pi)$.`, R`Il periodo della tangente è $\pi$: la seconda soluzione è la prima più $\pi$.`], risposta: { tipo: 'numeri', valori: [2.3562, 5.4978] }, soluzione: [R`$\tan x = -1$ per $x=\dfrac{3\pi}{4}$ (secondo quadrante).`, R`La seconda soluzione in $[0,2\pi)$ è $\dfrac{3\pi}{4}+\pi=\dfrac{7\pi}{4}$.`] },

    { id: 'es-04', difficolta: 2, testo: R`Risolvi $\sin(2x) = \sin x$ nell'intervallo $[0, 2\pi)$ (nella casella scrivi i valori separati da punto e virgola, con $\pi$ o in decimali: per esempio «π/5» oppure «0,63»).`, suggerimenti: [R`Porta tutto a un membro e usa la formula di duplicazione $\sin 2x = 2\sin x\cos x$.`, R`Dovresti arrivare a $\sin x\,(2\cos x - 1) = 0$: un prodotto nullo.`], risposta: { tipo: 'numeri', valori: [0, 1.0472, 3.1416, 5.236] }, soluzione: [R`$2\sin x\cos x - \sin x = 0 \Rightarrow \sin x\,(2\cos x-1)=0$.`, R`$\sin x = 0 \Rightarrow x=0 \lor x=\pi$.`, R`$\cos x = \dfrac12 \Rightarrow x=\dfrac{\pi}{3} \lor x=\dfrac{5\pi}{3}$.`, R`In $[0,2\pi)$: $x \in \left\{0, \dfrac{\pi}{3}, \pi, \dfrac{5\pi}{3}\right\}$.`] },

    { id: 'es-05', difficolta: 2, testo: R`Risolvi $2\sin^2x + \sin x - 1 = 0$ nell'intervallo $[0, 2\pi)$ (nella casella scrivi i valori separati da punto e virgola, con $\pi$ o in decimali: per esempio «π/5» oppure «0,63»).`, suggerimenti: [R`Poni $t = \sin x$ e risolvi la quadratica in $t$.`, R`Dovresti trovare $t=\dfrac12$ e $t=-1$: entrambi accettabili.`], risposta: { tipo: 'numeri', valori: [0.5236, 2.618, 4.7124] }, soluzione: [R`$t=\sin x$: $2t^2+t-1=0$, $\Delta=1+8=9$, $t=\dfrac{-1\pm3}{4}$: $t=\dfrac12$ o $t=-1$.`, R`$\sin x=\dfrac12 \Rightarrow x=\dfrac{\pi}{6} \lor x=\dfrac{5\pi}{6}$.`, R`$\sin x=-1 \Rightarrow x=\dfrac{3\pi}{2}$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Risolvi l'equazione omogenea $\sqrt3\sin^2x - 2\sin x\cos x - \sqrt3\cos^2x = 0$ nell'intervallo $[0, 2\pi)$ (nella casella scrivi i valori separati da punto e virgola, con $\pi$ o in decimali: per esempio «π/5» oppure «0,63»).`, suggerimenti: [R`Controlla prima se $\cos x=0$ è soluzione: qui $a=\sqrt3\ne0$, quindi no.`, R`Dividi per $\cos^2x$: ottieni $\sqrt3\tan^2x-2\tan x-\sqrt3=0$.`], risposta: { tipo: 'numeri', valori: [1.0472, 2.618, 4.1888, 5.7596] }, soluzione: [R`$\cos x=0$ darebbe $\sqrt3\cdot1-0-0=\sqrt3\ne0$: non è soluzione, si può dividere per $\cos^2x$.`, R`$\sqrt3\tan^2x-2\tan x-\sqrt3=0$: $\Delta=4+12=16$, $\tan x=\dfrac{2\pm4}{2\sqrt3}$, cioè $\tan x=\sqrt3$ o $\tan x=-\dfrac{1}{\sqrt3}$.`, R`$\tan x=\sqrt3 \Rightarrow x=\dfrac{\pi}{3} \lor x=\dfrac{4\pi}{3}$.`, R`$\tan x=-\dfrac{1}{\sqrt3} \Rightarrow x=\dfrac{5\pi}{6} \lor x=\dfrac{11\pi}{6}$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Risolvi $\sin x - \sqrt3\cos x = 1$ nell'intervallo $[0, 2\pi)$ con il metodo dell'angolo aggiunto (nella casella scrivi i valori separati da punto e virgola, con $\pi$ o in decimali: per esempio «π/5» oppure «0,63»).`, suggerimenti: [R`Calcola $R=\sqrt{a^2+b^2}$ con $a=1$, $b=-\sqrt3$: dovresti trovare $R=2$.`, R`Riscrivi come $2\sin\left(x-\dfrac{\pi}{3}\right)=1$.`], risposta: { tipo: 'numeri', valori: [1.5708, 3.6652] }, soluzione: [R`$R=\sqrt{1+3}=2$. Poiché $\cos\dfrac{\pi}{3}=\dfrac12$ e $\sin\dfrac{\pi}{3}=\dfrac{\sqrt3}{2}$, si ha $\sin x-\sqrt3\cos x = 2\sin\left(x-\dfrac{\pi}{3}\right)$.`, R`L'equazione diventa $\sin\left(x-\dfrac{\pi}{3}\right)=\dfrac12$: $x-\dfrac{\pi}{3}=\dfrac{\pi}{6}+2n\pi$ oppure $x-\dfrac{\pi}{3}=\dfrac{5\pi}{6}+2n\pi$.`, R`$x=\dfrac{\pi}{2}+2n\pi$ oppure $x=\dfrac{7\pi}{6}+2n\pi$. In $[0,2\pi)$: $x=\dfrac{\pi}{2}$ e $x=\dfrac{7\pi}{6}$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Risolvi la disequazione $2\sin x + 1 \le 0$ nell'intervallo $[0, 2\pi)$ (nelle caselle scrivi gli estremi in decimale: per esempio $\frac{\pi}{5}\approx 0{,}63$).`, suggerimenti: [R`Isola il seno: $\sin x \le -\dfrac12$.`, R`Pensa alla circonferenza: dove l'ordinata è minore o uguale a $-\dfrac12$?`], risposta: { tipo: 'intervallo', da: 3.6652, a: 5.7596, chiusoDa: true, chiusoA: true }, soluzione: [R`$\sin x \le -\dfrac12$.`, R`$\sin x = -\dfrac12$ per $x=\dfrac{7\pi}{6}$ e $x=\dfrac{11\pi}{6}$; il seno è minore o uguale a $-\dfrac12$ nell'arco fra questi due punti (quello "sotto").`, R`Soluzione in $[0,2\pi)$: $\dfrac{7\pi}{6} \le x \le \dfrac{11\pi}{6}$.`] },

    { id: 'es-09', difficolta: 3, testo: R`Risolvi la disequazione $(2\sin x - 1)(2\cos x + 1) > 0$ nell'intervallo $[0, 2\pi)$.`, suggerimenti: [R`Studia il segno di ciascun fattore separatamente, come per una disequazione algebrica.`, R`$2\sin x - 1 > 0$ per $x \in \left(\dfrac{\pi}{6}, \dfrac{5\pi}{6}\right)$; $2\cos x+1>0$ per $x \in \left[0,\dfrac{2\pi}{3}\right)\cup\left(\dfrac{4\pi}{3},2\pi\right)$.`, R`Costruisci la tabella dei segni sui quattro punti $\dfrac{\pi}{6}, \dfrac{2\pi}{3}, \dfrac{5\pi}{6}, \dfrac{4\pi}{3}$ e cerca dove concordano.`], soluzione: [R`Primo fattore: $2\sin x-1>0 \iff \sin x>\dfrac12 \iff x\in\left(\dfrac{\pi}{6},\dfrac{5\pi}{6}\right)$.`, R`Secondo fattore: $2\cos x+1>0 \iff \cos x>-\dfrac12 \iff x\in\left[0,\dfrac{2\pi}{3}\right)\cup\left(\dfrac{4\pi}{3},2\pi\right)$.`, R`Tabella dei segni sui quattro punti $\dfrac{\pi}{6}<\dfrac{2\pi}{3}<\dfrac{5\pi}{6}<\dfrac{4\pi}{3}$: il prodotto è positivo su $\left(\dfrac{\pi}{6},\dfrac{2\pi}{3}\right)$ e su $\left(\dfrac{5\pi}{6},\dfrac{4\pi}{3}\right)$.`, R`Soluzione: $x\in\left(\dfrac{\pi}{6},\dfrac{2\pi}{3}\right)\cup\left(\dfrac{5\pi}{6},\dfrac{4\pi}{3}\right)$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Trova, con $x \in [0, 2\pi)$, l'unica soluzione del sistema $\cos x = -\dfrac12$, $\sin x < 0$ (nella casella scrivi il valore decimale: per esempio $\frac{\pi}{5}\approx 0{,}63$).`, suggerimenti: [R`Risolvi prima $\cos x=-\dfrac12$ da sola: due soluzioni.`, R`Fra le due, tieni solo quella con seno negativo.`], risposta: { tipo: 'numero', valore: 4.1888, tolleranza: 0.01 }, soluzione: [R`$\cos x=-\dfrac12 \Rightarrow x=\dfrac{2\pi}{3} \lor x=\dfrac{4\pi}{3}$.`, R`$\sin\dfrac{2\pi}{3}=\dfrac{\sqrt3}{2}>0$: scartata. $\sin\dfrac{4\pi}{3}=-\dfrac{\sqrt3}{2}<0$: accettata.`, R`Soluzione del sistema: $x=\dfrac{4\pi}{3}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale condizione rende risolvibile $\sin x = k$?`, opzioni: [R`$k$ è un numero intero`, R`$-1 \le k \le 1$`, R`$k > 0$`, R`$k$ è multiplo di $\pi$`], corretta: 1, spiegazione: R`Il seno ha codominio $[-1,1]$: solo i valori di $k$ in quell'intervallo sono raggiunti.` },
    { id: 'q-02', domanda: R`L'equazione $\cos x = 2$…`, opzioni: [R`ha due soluzioni per periodo`, R`ha una sola soluzione`, R`è impossibile`, R`ha soluzione $x=0$`], corretta: 2, spiegazione: R`Il coseno non supera mai $1$ in valore assoluto: $2$ non è mai raggiunto, l'equazione è impossibile.` },
    { id: 'q-03', domanda: R`La soluzione generale di $\sin x = k$ (con $|k|\le1$) è…`, opzioni: [R`$x=\arcsin k + k\pi$`, R`$x=\pm\arcsin k+2n\pi$`, R`$x=\arcsin k+2n\pi \ \lor\ x=\pi-\arcsin k+2n\pi$`, R`$x=\arcsin k + n\pi$`], corretta: 2, spiegazione: R`Servono entrambe le famiglie: quella dell'arco stesso e quella del suo supplementare, ciascuna ripetuta ogni $2\pi$.` },
    { id: 'q-04', domanda: R`La soluzione generale di $\cos x = k$ (con $|k|\le1$) è…`, opzioni: [R`$x=\pm\arccos k+2n\pi$`, R`$x=\arccos k + n\pi$`, R`$x=\arccos k+2n\pi \ \lor\ x=\pi-\arccos k+2n\pi$`, R`$x=\arccos k+\frac{n\pi}{2}$`], corretta: 0, spiegazione: R`Due archi opposti hanno lo stesso coseno: $x=\arccos k+2n\pi$ oppure $x=-\arccos k+2n\pi$, cioè $\pm\arccos k+2n\pi$.` },
    { id: 'q-05', domanda: R`Perché $\tan x=k$ ha sempre soluzione, per qualunque $k$ reale?`, opzioni: [R`Perché la tangente ha periodo $2\pi$`, R`Perché il codominio della tangente è tutto $\mathbb{R}$`, R`Perché $\tan x$ è sempre positiva`, R`Perché $\tan x$ non è mai definita`], corretta: 1, spiegazione: R`A differenza di seno e coseno, la tangente assume ogni valore reale: nessuna condizione su $k$ è necessaria.` },
    { id: 'q-06', domanda: R`Qual è il periodo della soluzione generale di $\tan x=k$?`, opzioni: [R`$2\pi$`, R`$\pi/2$`, R`$4\pi$`, R`$\pi$`], corretta: 3, spiegazione: R`$\tan(x+\pi)=\tan x$: la tangente si ripete ogni mezzo giro, non ogni giro intero come seno e coseno.` },
    { id: 'q-07', domanda: R`Per risolvere $\sin 2x=\sin\left(x+\frac{\pi}{3}\right)$ si impone…`, opzioni: [R`$2x=x+\frac{\pi}{3}$ soltanto`, R`$2x=x+\frac{\pi}{3}+2n\pi$ oppure $2x=\pi-\left(x+\frac{\pi}{3}\right)+2n\pi$`, R`$4x=x^2+\frac{\pi}{3}$`, R`la sostituzione $t=\sin 2x$`], corretta: 1, spiegazione: R`Due seni uguali richiedono argomenti uguali a meno di $2n\pi$, oppure supplementari a meno di $2n\pi$: entrambi i casi vanno considerati.` },
    { id: 'q-08', domanda: R`$\cos\alpha=\cos\beta$ se e solo se…`, opzioni: [R`$\alpha$ e $\beta$ sono supplementari`, R`$\alpha=\beta+n\pi$`, R`$\alpha=\pm\beta+2n\pi$`, R`$\alpha-\beta=\pi$`], corretta: 2, spiegazione: R`Due archi hanno lo stesso coseno se sono uguali o opposti, a meno di multipli interi di $2\pi$.` },
    { id: 'q-09', domanda: R`Nell'equazione $2\sin^2x-\sin x-1=0$, posto $t=\sin x$, quale controllo va fatto sulle soluzioni della quadratica in $t$?`, opzioni: [R`Che $t$ sia un numero intero`, R`Che $t$ appartenga a $[-1,1]$`, R`Che $t$ sia positivo`, R`Nessuno: si accettano tutte`], corretta: 1, spiegazione: R`$\sin x$ non può uscire da $[-1,1]$: una soluzione della quadratica fuori da quell'intervallo va scartata.` },
    { id: 'q-10', domanda: R`In un'equazione omogenea $a\sin^2x+b\sin x\cos x+c\cos^2x=0$, prima di dividere per $\cos^2x$ bisogna…`, opzioni: [R`Controllare se $\cos x=0$ è soluzione`, R`Controllare se $\sin x=0$ è soluzione`, R`Moltiplicare tutto per $\cos^2x$`, R`Porre $t=\sin x$`], corretta: 0, spiegazione: R`Si può dividere per $\cos^2x$ solo se non è zero: va verificato prima se $\cos x=0$ soddisfa l'equazione.` },
    { id: 'q-11', domanda: R`Nel metodo dell'angolo aggiunto, $a\sin x+b\cos x$ si scrive come…`, opzioni: [R`$R\sin(x+\varphi)$, con $R=\sqrt{a^2+b^2}$`, R`$(a+b)\sin x$`, R`$R\cos(x-\varphi)$, con $R=ab$`, R`$a\sin x\cdot b\cos x$`], corretta: 0, spiegazione: R`È l'identità del seno della somma usata al contrario, con $R$ l'ampiezza $\sqrt{a^2+b^2}$.` },
    { id: 'q-12', domanda: R`L'equazione $a\sin x+b\cos x=c$ ammette soluzioni se e solo se…`, opzioni: [R`$c=0$`, R`$a=b$`, R`$c \ge 0$`, R`$a^2+b^2\ge c^2$`], corretta: 3, spiegazione: R`Serve $\left|\frac{c}{R}\right|\le1$ con $R=\sqrt{a^2+b^2}$, cioè $a^2+b^2\ge c^2$.` },
    { id: 'q-13', domanda: R`Nelle formule parametriche con $t=\tan\frac{x}{2}$, perché va controllato a parte $x=\pi+2n\pi$?`, opzioni: [R`Perché lì $t$ non è definito`, R`Perché lì $\sin x=0$ sempre`, R`Perché è sempre soluzione`, R`Perché $\cos x$ non esiste`], corretta: 0, spiegazione: R`$\tan\frac{x}{2}$ non è definita per $x=\pi+2n\pi$: la sostituzione non "vede" quel valore, va controllato sostituendolo nell'equazione originale.` },
    { id: 'q-14', domanda: R`Per risolvere graficamente $\sin x > k$ con la circonferenza goniometrica si cerca…`, opzioni: [R`L'arco in cui l'ascissa supera $k$`, R`L'arco in cui l'ordinata supera $k$`, R`Il punto in cui $x=k$`, R`L'angolo il cui coseno è $k$`], corretta: 1, spiegazione: R`Il seno è l'ordinata del punto sulla circonferenza: si cerca dove quell'ordinata supera $k$.` },
    { id: 'q-15', domanda: R`Una disequazione come $(2\sin x-1)(2\cos x+1)>0$ si affronta…`, opzioni: [R`Risolvendola come un'equazione`, R`Studiando il segno dei due fattori, come per le disequazioni algebriche`, R`Sommando membro a membro`, R`Ignorando uno dei due fattori`], corretta: 1, spiegazione: R`Vale lo stesso schema delle disequazioni algebriche: segno di ciascun fattore, tabella dei segni, lettura del risultato.` },
    { id: 'q-16', domanda: R`In un sistema di condizioni goniometriche (equazioni e/o disequazioni), l'insieme delle soluzioni è…`, opzioni: [R`L'unione delle soluzioni di ciascuna condizione`, R`Sempre l'insieme vuoto`, R`Solo i valori interi`, R`L'intersezione delle soluzioni di ciascuna condizione`], corretta: 3, spiegazione: R`Un sistema richiede che tutte le condizioni valgano insieme: le soluzioni sono quelle comuni a tutte, cioè l'intersezione.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Dimenticare il $+2n\pi$ (o il $+n\pi$ per la tangente) e dare solo la soluzione "principale": un'equazione goniometrica ha quasi sempre infinite soluzioni.` },
    { tipo: 'errore', testo: R`Nell'equazione omogenea, dividere per $\cos^2x$ senza aver controllato se $\cos x=0$ è soluzione: si rischia di perderla.` },
    { tipo: 'trucco', testo: R`Nelle equazioni riconducibili, ricorda sempre entrambi i casi: argomenti uguali **e** supplementari per il seno, argomenti uguali **e** opposti per il coseno.` },
    { tipo: 'metodo', testo: R`Prima di scrivere $\arcsin k$ o $\arccos k$, controlla che $|k|\le 1$: se non lo è, l'equazione è impossibile e hai già finito.` },
    { tipo: 'trucco', testo: R`Nell'equazione lineare $a\sin x+b\cos x=c$, calcola subito $R=\sqrt{a^2+b^2}$: se $R<|c|$ non serve nemmeno risolvere, non ci sono soluzioni.` },
    { tipo: 'errore', testo: R`Nel metodo delle formule parametriche, dimenticare di controllare $x=\pi+2n\pi$ a parte: è l'unico valore che la sostituzione $t=\tan\frac{x}{2}$ non può rappresentare.` },
    { tipo: 'metodo', testo: R`Per le disequazioni disegna sempre la circonferenza, con la retta $y = k$ o $x = k$, e colora l'arco giusto: è il modo più sicuro per non prendere l'arco opposto.` },
    { tipo: 'trucco', testo: R`In una disequazione fratta, il denominatore va sempre escluso dalla soluzione finale, anche quando il segno richiesto sembrerebbe includerlo.` }
  ],

  aneddoti: [
    { matematico: 'Galileo Galilei', anni: '1564–1642', titolo: 'Il lampadario che misurava il tempo', testo: R`Si racconta che un giovane Galileo, ancora studente di medicina, osservasse durante una funzione nel Duomo di Pisa il lampadario appeso al soffitto oscillare per una corrente d'aria, e ne misurasse il tempo con il proprio polso, non avendo un orologio. Si accorse che il periodo delle oscillazioni restava lo stesso anche quando l'ampiezza diminuiva: è l'**isocronismo del pendolo**, valido con buona approssimazione per piccole oscillazioni. L'aneddoto del polso è probabilmente abbellito nei secoli, ma l'osservazione è autentica: Galileo la descrisse nei *Discorsi e dimostrazioni matematiche* (1638) e la usò per proporre un orologio a pendolo, che però non costruì mai.`, legame: R`Un pendolo che oscilla descrive, nel tempo, una funzione sinusoidale: la sua posizione è (in buona approssimazione) del tipo $A\sin(\omega t)$, la stessa forma delle equazioni lineari in seno e coseno.` },
    { matematico: 'Christiaan Huygens', anni: '1629–1695', titolo: 'Dall\'isocronismo al primo orologio preciso', testo: R`Nel 1656 l'olandese Christiaan Huygens trasformò l'intuizione di Galileo in una macchina funzionante: il primo **orologio a pendolo**, brevettato l'anno dopo. L'errore degli orologi meccanici dell'epoca, che potevano sbagliare anche quindici minuti al giorno, scese a pochi secondi. Huygens però scoprì anche il limite dell'idea di Galileo: un pendolo che oscilla lungo un arco di cerchio è isocrono solo *approssimativamente*, per piccole oscillazioni; per un isocronismo perfetto, a qualunque ampiezza, il punto dovrebbe muoversi lungo una **cicloide**, non un arco di cerchio. Costruì persino guance metalliche sagomate per costringere il filo del pendolo a seguire quella curva.`, legame: R`L'orologio di Huygens funziona perché la posizione del pendolo è una funzione periodica del tempo: risolvere "quando il pendolo è a una certa altezza" è, in sostanza, un'equazione o disequazione goniometrica.` },
    { matematico: 'François Viète', anni: '1540–1603', titolo: 'Una sfida a tutti i matematici del mondo', testo: R`Nel 1593 il fiammingo Adriaan van Roomen lanciò una sfida "a tutti i matematici del mondo": risolvere un'equazione di **grado 45**. L'ambasciatore olandese alla corte di Francia si vantò che nessun francese ne sarebbe stato capace; il re Enrico IV convocò allora François Viète, già noto come crittografo (decifrava per il re i codici segreti spagnoli). Viète riconobbe che l'equazione di van Roomen era, nascosta dentro coefficienti numerici, la formula che esprime $\sin(45\theta)$ in funzione di $\sin\theta$: un problema trigonometrico travestito da equazione algebrica. Usando questa chiave trovò in poche ore tutte le $23$ soluzioni positive, sbalordendo la corte.`, legame: R`Van Roomen aveva scritto un'equazione di grado altissimo in una funzione goniometrica: Viète la riconobbe e la risolse con la sostituzione giusta, proprio come in "secondo grado in una funzione goniometrica".` },
    { matematico: 'Joseph Fourier', anni: '1768–1830', titolo: 'Ogni onda è una somma di seni e coseni', testo: R`Nel 1822 Joseph Fourier pubblicò la *Théorie analytique de la chaleur*, dove sosteneva una tesi che i matematici avevano accolto con diffidenza fin dalla prima memoria del 1807 (Lagrange per primo): qualunque fenomeno periodico, per quanto complicato o spigoloso, si può scrivere come una **somma di seni e coseni** di frequenze diverse. L'idea nacque studiando come il calore si propaga in una sbarra metallica, ma si rivelò universale: oggi le "serie di Fourier" stanno dietro alla compressione audio, alle immagini digitali e all'analisi di qualunque segnale che oscilli nel tempo. Ci vollero decenni perché la comunità matematica accettasse pienamente il risultato, oggi alla base dell'analisi armonica.`, legame: R`L'espressione $a\sin x+b\cos x$ delle equazioni lineari in seno e coseno è, in miniatura, il mattone più semplice di una somma di Fourier: un'onda sola, prima di sommarne altre.` },
    { matematico: 'William Thomson (Lord Kelvin)', anni: '1824–1907', titolo: 'La macchina che prevedeva le maree', testo: R`Le maree non sono un'unica sinusoide: sono la somma di decine di componenti periodiche, legate ai moti della Luna e del Sole, ciascuna con la propria ampiezza e il proprio periodo. Negli anni 1870 il fisico britannico William Thomson, poi nominato Lord Kelvin, progettò una **macchina analogica** che sommava meccanicamente queste componenti tramite un sistema di pulegge e ruote dentate, tracciando su carta la previsione del livello del mare per mesi in anticipo. Macchine di questo tipo, perfezionate nei decenni successivi, furono usate da marine e porti in tutto il mondo fino a metà Novecento, quando i calcolatori elettronici presero il loro posto.`, legame: R`Ogni componente della marea è un termine del tipo $a\sin x+b\cos x$: prevedere quando il livello supera una soglia è, per ciascuna componente, risolvere una disequazione lineare in seno e coseno.` }
  ]
});
})();
