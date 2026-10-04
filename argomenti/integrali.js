(function () {
const R = String.raw;
/* allenamento. Una primitiva si scrive in tanti modi giusti, quindi prim() genera quelli ragionevoli
   (stessa idea di der() in derivate.js): i termini in qualunque ordine, 2x oppure 2*x, sin(x) oppure
   sinx, con o senza F(x) = davanti, con o senza + c in fondo. Le forme in «altre» seguono le stesse
   regole. Tutte sono state controllate valutandole in punti a caso contro la primitiva giusta, e le
   primitive sbagliate tipiche (dimenticare di dividere, derivare invece di integrare, segno del
   coseno) sono rifiutate. Gli integrali definiti si controllano come numeri: la casella capisce
   e - 1, (e - 1)/2, π/2 - 1, 32/3. Non capisce ln, quindi nessun risultato di base contiene un logaritmo. */
const SIMB = ['^', '/', '(', ')', 'π', '√', '−', '+'];
const permuta = a => a.length <= 1 ? [a] : a.flatMap((t, i) => permuta(a.slice(0, i).concat(a.slice(i + 1))).map(r => [t].concat(r)));
const somma = t => t.map((s, i) => (i && s[0] !== '-' ? '+' : '') + s).join('');
function prim(termini, altre) {
  const perX = s => s.replace(/(\d)(?=x)/g, '$1*');
  const forme = permuta(termini).map(somma).concat(altre || [])
    .flatMap(s => [s, perX(s)])
    .flatMap(s => [s, s.replace(/(sin|cos)\(x\)/g, '$1x')])
    .flatMap(s => [s, s.replace(/sin/g, 'sen')]);             /* sen x, come si scrive a scuola */
  const acc = forme.flatMap(s => [s, s + '+c', 'F(x)=' + s, 'F(x)=' + s + '+c']);
  return { tipo: 'testo', accettate: Array.from(new Set(acc)), segnaposto: 'es. x^3 + 2x + c', simboli: SIMB };
}
const val = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'es. 5/2 oppure e − 2', simboli: SIMB });
COMPASSO.registra({
  id: 'integrali',
  titolo: 'Integrali',

  introduzione: R`Un'auto va sempre a $60$ km/h per un'ora: fa $60$ km. È l'area di un rettangolo alto $60$ e largo $1$. Ma se la velocità cambia, la strada è l'area sotto la curva della velocità. Quella figura ha un lato storto, e la geometria non basta.

L'**integrale** misura queste aree. Più in generale misura tutto quello che si accumula, come l'acqua in una vasca o il volume di un solido.

L'argomento ha due metà. Nella prima impari a fare la derivata al contrario: le primitive. Nella seconda torni alle aree, e scopri che per calcolarle bastano proprio le primitive.

Ti serve saper derivare bene: ogni integrale si controlla derivando il risultato.`,

  inBreve: [
    R`Una **primitiva** di $f$ è una funzione che, derivata, dà $f$. Le primitive differiscono per una costante, quindi si scrive $\int f(x)\,dx = F(x) + c$.`,
    R`L'integrale si spezza sulle somme e porta fuori le costanti. Con i prodotti no: lì servono la sostituzione o l'integrazione per parti.`,
    R`L'integrale definito $\int_a^b f(x)\,dx$ è un **numero**: l'area sotto la curva fra $a$ e $b$, con il meno dove la curva sta sotto l'asse $x$.`,
    R`Si calcola con una primitiva qualunque: $\int_a^b f(x)\,dx = G(b) - G(a)$.`,
    R`Se il testo chiede un'**area**, studia prima il segno della funzione. Per l'area fra due curve integri (curva sopra) meno (curva sotto).`
  ],

  sezioni: [
    { id: 'primitive', titolo: 'Primitive e integrale indefinito', testo: R`Quale funzione ha per derivata $3x^2$? La risposta è $x^3$, perché $D(x^3) = 3x^2$.

[[video:integrali/primitive]]

>* $F$ è una **primitiva** di $f$ in un intervallo se $F'(x) = f(x)$ in ogni punto dell'intervallo.

Vanno bene anche $x^3 + 5$ e $x^3 - 2$. La derivata di una costante è zero, quindi aggiungere un numero non cambia la derivata.

In un **intervallo** vale anche il contrario: due primitive della stessa funzione differiscono solo per una costante. Quindi, trovata una primitiva, le hai trovate tutte.

>* L'**integrale indefinito** di $f$ è l'insieme di tutte le sue primitive: $$\int f(x)\,dx = F(x) + c.$$ $f$ si chiama **funzione integranda**, il numero $c$ **costante di integrazione**.

Il $dx$ dice rispetto a quale variabile integri.

La **linearità**: l'integrale di una somma è la somma degli integrali, e le costanti escono dal segno di integrale.

$$\int \big[\alpha f + \beta g\big]\,dx = \alpha \int f\,dx + \beta \int g\,dx$$

~ \int (6x^2 - 4x + 5)\,dx :: una somma di tre termini
~ \evid{6\int x^2\,dx - 4\int x\,dx + 5\int dx} :: linearità: si integra un termine alla volta e le costanti escono
~ 6\cdot\evid{\frac{x^3}{3}} - 4\cdot\evid{\frac{x^2}{2}} + 5\evid{x} + c :: ogni potenza di $x$ aumenta l'esponente di uno e si divide per il nuovo esponente
~ \evidb{2x^3 - 2x^2 + 5x + c} :: controllo: derivando si ritrova $6x^2 - 4x + 5$

?? Quanto vale $\int x \cdot x\,dx$?
[x] $\dfrac{x^3}{3} + c$
[ ] $\dfrac{x^2}{2}\cdot\dfrac{x^2}{2} + c$
[ ] $x \cdot \dfrac{x^2}{2} + c$
=> Prima fai il prodotto, $x \cdot x = x^2$, poi integri: $\frac{x^3}{3} + c$. Chi integra i due fattori e li moltiplica ottiene $\frac{x^4}{4}$, che derivato dà $x^3$. Chi porta fuori una $x$ come se fosse una costante ottiene $\frac{x^3}{2}$, che derivato dà $\frac{3}{2}x^2$. La $x$ non è una costante.

>! Non dimenticare $+c$: senza, hai scritto *una* primitiva sola.

>! $\int f\,g\,dx$ **non** è $\int f\,dx \cdot \int g\,dx$. La linearità vale per somme e costanti, non per prodotti.` },

    { id: 'immediati', titolo: 'Integrali immediati e quasi immediati', testo: R`Ogni derivata, letta al contrario, dà un integrale. Da $D(\sin x) = \cos x$ ricavi $\int \cos x\,dx = \sin x + c$. Questi integrali si chiamano **immediati**. La tabella va saputa a memoria.

| $f(x)$ | $\int f(x)\,dx$ |
|---|---|
| $x^\alpha$, con $\alpha \ne -1$ | $\dfrac{x^{\alpha+1}}{\alpha+1} + c$ |
| $\dfrac{1}{x}$ | $\ln \lvert x \rvert + c$ |
| $e^x$ | $e^x + c$ |
| $a^x$ | $\dfrac{a^x}{\ln a} + c$ |
| $\sin x$ | $-\cos x + c$ |
| $\cos x$ | $\sin x + c$ |
| $\dfrac{1}{\cos^2 x}$ | $\tan x + c$ |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x + c$ |
| $\dfrac{1}{1+x^2}$ | $\arctan x + c$ |

La prima riga vale anche per radici e frazioni. Prima le scrivi come potenze:

~ \int \sqrt{x}\,dx :: la radice non è nella tabella, ma è una potenza
~ \int \evid{x^{\frac12}}\,dx :: $\sqrt{x} = x^{\frac12}$
~ \frac{x^{\evid{\frac32}}}{\evid{\frac32}} + c :: regola della potenza: $\frac12 + 1 = \frac32$
~ \evidb{\frac{2}{3}x\sqrt{x} + c} :: dividere per $\frac32$ vuol dire moltiplicare per $\frac23$, e $x^{\frac32} = x\sqrt{x}$

Allo stesso modo $\int \dfrac{1}{x^2}\,dx = \int x^{-2}\,dx = \dfrac{x^{-1}}{-1} + c = -\dfrac{1}{x} + c$.

>! $\int \dfrac{1}{x}\,dx$ non segue la regola della potenza: con $\alpha = -1$ divideresti per zero. Il risultato è $\ln \lvert x \rvert + c$. Il valore assoluto serve perché $\frac1x$ esiste anche per $x$ negativi.

### Quasi immediati

Se al posto di $x$ c'è una funzione $f(x)$, le formule della tabella valgono ancora. Serve però che accanto ci sia **anche la derivata** $f'(x)$. È la regola della catena letta al contrario.

$$\int [f(x)]^\alpha f'(x)\,dx = \frac{[f(x)]^{\alpha+1}}{\alpha+1} + c$$

$$\int \frac{f'(x)}{f(x)}\,dx = \ln \lvert f(x) \rvert + c$$

$$\int e^{f(x)} f'(x)\,dx = e^{f(x)} + c$$

$$\int f'(x)\cos f(x)\,dx = \sin f(x) + c$$

A volte alla derivata manca solo un numero. Lo aggiusti moltiplicando e dividendo.

~ \int \frac{x}{x^2+3}\,dx :: la derivata del denominatore è $2x$, al numeratore c'è solo $x$
~ \evid{\frac{1}{2}}\int \frac{\evid{2}x}{x^2+3}\,dx :: moltiplico dentro per $2$ e divido fuori per $2$: il valore non cambia
~ \frac{1}{2}\evidb{\ln(x^2+3)} + c :: ora al numeratore c'è la derivata del denominatore: è $\int \frac{f'}{f}$

Il valore assoluto non serve: $x^2+3$ è sempre positivo.

?? Quanto vale $\int \sin(2x)\,dx$?
[x] $-\dfrac{1}{2}\cos(2x) + c$
[ ] $-\cos(2x) + c$
[ ] $-2\cos(2x) + c$
[ ] $\dfrac{1}{2}\cos(2x) + c$
=> La derivata di $2x$ è $2$. Quindi scrivi $\frac12\int 2\sin(2x)\,dx = -\frac12\cos(2x) + c$. Chi risponde $-\cos(2x)$ dimentica quel $2$: derivando ottiene $2\sin 2x$, il doppio.

>! Puoi aggiustare solo le **costanti**. La $x$ non esce dal segno di integrale: $\int e^{x^2}dx$ **non** è $\dfrac{1}{2x}e^{x^2}$.` },

    { id: 'sostituzione', titolo: 'Integrazione per sostituzione', testo: R`A volte dentro l'integranda c'è un pezzo scomodo. Gli dai un nome nuovo, $t$: **cambi variabile**, e l'integrale diventa uno della tabella.

1. Poni $t = g(x)$ e calcola $dt = g'(x)\,dx$.
2. Riscrivi tutto l'integrale in $t$, $dx$ compreso.
3. Integra.
4. Torna a $x$: rimetti $g(x)$ al posto di $t$.

>* Nella **sostituzione** $t = g(x)$ si trasforma tutto, anche il $dx$: $dt = g'(x)\,dx$.

~ \int x\sqrt{x^2+1}\,dx :: il pezzo che dà fastidio è $x^2+1$ sotto radice
~ t = x^2+1 \quad\Rightarrow\quad \evid{dt = 2x\,dx} :: gli do un nome e derivo: anche il $dx$ va trasformato
~ \int \sqrt{\evid{t}}\cdot\evid{\frac{dt}{2}} :: nell'integrale c'è proprio $x\,dx$, che vale $\frac{dt}{2}$
~ \frac{1}{2}\cdot\evid{\frac{2}{3}t\sqrt{t}} + c :: ora è un integrale immediato: $\int t^{\frac12}dt = \frac23 t^{\frac32}$
~ \evidb{\frac{1}{3}(x^2+1)\sqrt{x^2+1} + c} :: si torna a $x$ rimettendo $x^2+1$ al posto di $t$

Un altro caso: in $\int \dfrac{1}{x \ln x}\,dx$ poni $t = \ln x$. Allora $dt = \dfrac{dx}{x}$ e ottieni $\int \dfrac{dt}{t} = \ln \lvert \ln x \rvert + c$.

?? Con la sostituzione $t = x^2$, in che cosa si trasforma $\int x\,e^{x^2}\,dx$?
[x] $\dfrac{1}{2}\int e^{t}\,dt$
[ ] $\int e^{t}\,dx$
[ ] $\int x\,e^{t}\,dt$
[ ] $2\int e^{t}\,dt$
=> Da $t = x^2$ viene $dt = 2x\,dx$, quindi $x\,dx = \frac{dt}{2}$. La $x$ davanti e il $dx$ spariscono insieme. Lasciare il $dx$ è l'errore più frequente: l'integrale mescola due variabili.

> Si può anche porre $x = \varphi(t)$, con $dx = \varphi'(t)\,dt$. Serve per togliere una radice: in $\int \sqrt{1-x^2}\,dx$ poni $x = \sin t$.

### Negli integrali definiti

Se ci sono gli estremi, **cambia anche quelli**. Con $t = g(x)$, al posto di $a$ e $b$ metti $g(a)$ e $g(b)$. Così non torni alla variabile $x$.

~ \int_0^1 x\,e^{x^2}\,dx :: pongo $t = x^2$, quindi $x\,dx = \frac{dt}{2}$
~ \frac{1}{2}\int_{\evid{0}}^{\evid{1}} e^t\,dt :: nuovi estremi: per $x = 0$ si ha $t = 0^2 = 0$, per $x = 1$ si ha $t = 1^2 = 1$
~ \frac{1}{2}\evid{\big[e^t\big]_0^1} :: la primitiva di $e^t$ è $e^t$
~ \evidb{\frac{e-1}{2}} :: $e^1 - e^0 = e - 1$; qui non si torna a $x$, gli estremi erano già quelli di $t$

>! Se hai cambiato gli estremi, non tornare a $x$: i nuovi estremi valgono per $t$.` },

    { id: 'per-parti', titolo: 'Integrazione per parti', testo: R`Come si integra $x\,e^x$? Non è quasi immediato, e l'integrale di un prodotto non è il prodotto degli integrali.

Serve un metodo per i **prodotti**. Nasce dalla derivata del prodotto: $D[f g] = f' g + f g'$. Integri i due membri e isoli un pezzo.

>* **Formula di integrazione per parti:** $$\int f\,g'\,dx = f\,g - \int f'\,g\,dx$$ Un fattore si deriva: è $f$, il **fattore finito**. L'altro si integra: è $g'$, il **fattore differenziale**.

La formula cambia l'integrale in un altro. Conviene se il nuovo è più facile. Dipende da quale fattore scegli come $f$.

| fattore finito $f$ (si deriva) | fattore differenziale $g'$ (si integra) |
|---|---|
| ciò che derivando si semplifica: $\ln x$, $\arctan x$, un polinomio | ciò che si integra facilmente: $e^x$, $\sin x$, $\cos x$ |

~ \int x\,e^x\,dx :: prodotto di un polinomio e di un esponenziale
~ \evid{f' = 1}, \quad \evid{g = e^x} :: scelgo $f = x$ da derivare (diventa $1$) e $g' = e^x$ da integrare (resta $e^x$)
~ \evid{x\,e^x} - \int \evid{1 \cdot e^x}\,dx :: formula: $f\,g$ meno l'integrale di $f'\,g$
~ x\,e^x - \evid{e^x} + c = \evidb{e^x(x-1) + c} :: l'integrale rimasto è immediato; poi raccolgo $e^x$

?? Per calcolare $\int x\cos x\,dx$ per parti, quale scelta porta a un integrale più facile?
[x] $f = x$ da derivare, $g' = \cos x$ da integrare
[ ] $f = \cos x$ da derivare, $g' = x$ da integrare
[ ] è indifferente, il risultato è lo stesso
=> Derivando $x$ ottieni $1$, e resta $\int \sin x\,dx$, immediato. Con la scelta opposta resta $\int \frac{x^2}{2}\sin x\,dx$: il grado sale, e l'integrale è più difficile di prima.

A volte il prodotto non si vede. $\ln x$ non sai integrarlo, ma sai derivarlo. Allora scrivi $\ln x = \ln x \cdot 1$.

~ \int \ln x\,dx = \int \ln x \cdot \evid{1}\,dx :: il fattore $1$ c'è sempre, basta scriverlo
~ \evid{f' = \frac{1}{x}}, \quad \evid{g = x} :: scelgo $f = \ln x$ da derivare e $g' = 1$ da integrare
~ x\ln x - \int \evid{x\cdot\frac{1}{x}}\,dx :: formula per parti
~ x\ln x - \int \evid{1}\,dx = \evidb{x\ln x - x + c} :: la $x$ si semplifica e resta un integrale immediato

> A volte, dopo due passaggi per parti, ricompare l'integrale di partenza. Con $I = \int e^x \sin x\,dx$ arrivi a $I = e^x(\sin x - \cos x) - I$. Porti $I$ a sinistra come in un'equazione: $I = \dfrac{e^x(\sin x - \cos x)}{2} + c$.

Nell'integrale definito metti gli estremi su tutti e due i pezzi: $\int_a^b f g'\,dx = \big[f g\big]_a^b - \int_a^b f' g\,dx$.

>! Se il nuovo integrale è peggiore, hai scelto male. Torna all'inizio e scambia i ruoli dei due fattori.` },

    { id: 'razionali-fratte', titolo: 'Funzioni razionali fratte', testo: R`Una **funzione razionale fratta** è un rapporto di due polinomi, $\dfrac{N(x)}{D(x)}$. Per integrarla segui sempre lo stesso ordine.

1. **Confronta i gradi.** Se il numeratore ha grado maggiore o uguale, esegui la divisione. Ottieni un polinomio più una frazione con il numeratore di grado più basso.
2. **Guarda il denominatore.** Il metodo dipende dal suo grado e dal suo $\Delta$.

| denominatore | metodo | risultato |
|---|---|---|
| 1° grado | divisione | logaritmo |
| $\Delta > 0$ | fratti semplici | due logaritmi |
| $\Delta = 0$ | si scrive $N$ con $x - x_1$ | logaritmo e frazione |
| $\Delta < 0$ | si completa il quadrato | arcotangente |

### Denominatore di primo grado

Esempio: $\int \dfrac{2x+1}{x-3}\,dx$. La divisione dà $2x+1 = 2(x-3)+7$, quindi
$$\int \left(2 + \frac{7}{x-3}\right)dx = 2x + 7\ln \lvert x-3 \rvert + c.$$

### Secondo grado con $\Delta > 0$

Il denominatore si scompone in $a(x-x_1)(x-x_2)$. Allora spezzi la frazione in due **fratti semplici**, ognuno con un fattore al denominatore.

~ \int \frac{x+3}{x^2-x-2}\,dx :: il numeratore ha grado minore: niente divisione
~ \frac{x+3}{\evid{(x-2)(x+1)}} = \frac{A}{x-2} + \frac{B}{x+1} :: scompongo il denominatore (radici $2$ e $-1$) e cerco due fratti semplici
~ x+3 = \evid{A(x+1) + B(x-2)} :: denominatore comune: i numeratori devono essere uguali per ogni $x$
~ x = 2:\quad 5 = 3A \ \Rightarrow\ A = \evid{\frac{5}{3}} :: do a $x$ il valore che annulla $x-2$: il termine con $B$ sparisce
~ x = -1:\quad 2 = -3B \ \Rightarrow\ B = \evid{-\frac{2}{3}} :: ora il valore che annulla $x+1$: sparisce il termine con $A$
~ \evidb{\frac{5}{3}\ln \lvert x-2 \rvert - \frac{2}{3}\ln \lvert x+1 \rvert + c} :: ogni fratto semplice dà un logaritmo

### Secondo grado con $\Delta = 0$

C'è una radice doppia: $D(x) = a(x-x_1)^2$. Riscrivi il numeratore con $x - x_1$. Esempio: $\int \dfrac{x+1}{(x-2)^2}\,dx$. Poiché $x+1 = (x-2)+3$,
$$\begin{aligned} &\int \left(\frac{1}{x-2} + \frac{3}{(x-2)^2}\right)dx \\ &= \ln \lvert x-2 \rvert - \frac{3}{x-2} + c \end{aligned}$$

Il secondo pezzo è la regola della potenza con $\alpha = -2$: $\int 3(x-2)^{-2}\,dx = -3(x-2)^{-1}$.

### Secondo grado con $\Delta < 0$

Il denominatore non si scompone. Completi il quadrato e arrivi a $\int \dfrac{du}{u^2+k^2} = \dfrac{1}{k}\arctan\dfrac{u}{k} + c$.

~ \int \frac{dx}{x^2+2x+5} :: $\Delta = 4 - 20 < 0$: non si scompone
~ \int \frac{dx}{\evid{(x+1)^2 + 4}} :: completo il quadrato: $x^2+2x+1$ è $(x+1)^2$, e restano $4$
~ \int \frac{du}{u^2 + \evid{2^2}} :: con $u = x+1$ (e $du = dx$) è la forma dell'arcotangente con $k = 2$
~ \evidb{\frac{1}{2}\arctan\frac{x+1}{2} + c} :: $\frac{1}{k}\arctan\frac{u}{k}$, poi torno a $x$

Se al numeratore c'è anche un termine in $x$, separi due pezzi. La parte multipla di $D'(x)$ dà un logaritmo, il resto l'arcotangente.

?? Il denominatore di $\dfrac{3}{x^2+4x+8}$ ha $\Delta = 16 - 32 < 0$. Che cosa compare nell'integrale?
[x] un'arcotangente
[ ] due logaritmi, dopo aver scomposto in fratti semplici
[ ] un logaritmo e una frazione
=> Con $\Delta < 0$ il denominatore non ha radici, quindi non si scompone. Completi il quadrato, $(x+2)^2 + 4$, e arrivi a $\frac{3}{2}\arctan\frac{x+2}{2} + c$.

>! Con $\Delta < 0$ il denominatore non si annulla mai. Non si scompone in fratti semplici, e nel logaritmo il valore assoluto **non serve**.` },

    { id: 'definito', titolo: 'L\'integrale definito e le somme di Riemann', testo: R`Torniamo alle aree. La regione fra il grafico di $f$, l'asse $x$ e le rette $x=a$ e $x=b$ ha un lato curvo. Quanto vale la sua area?

[[video:integrali/area]]

L'idea è riempirla di rettangoli.

1. Dividi $[a;b]$ in $n$ parti uguali, larghe $\Delta x = \dfrac{b-a}{n}$.
2. Su ogni parte disegna un rettangolo *sotto* la curva e uno che la contiene.
3. Somma le aree dei primi: è la **somma inferiore** $s_n$. Somma quelle dei secondi: è la **somma superiore** $S_n$.

L'area sta in mezzo: $s_n \le \text{area} \le S_n$. Guarda che cosa succede quando i rettangoli diventano più stretti.

[[animazione:riemann]]

>* Se $s_n$ e $S_n$ tendono allo stesso numero, $f$ è **integrabile** in $[a;b]$. Quel numero è l'**integrale definito**: $$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i)\,\Delta x.$$

Il simbolo $\int$ è una S allungata: sta per «somma». $f(x)\,dx$ è l'area di un rettangolo alto $f(x)$ e largo $dx$.

Ogni funzione continua in un intervallo chiuso e limitato è integrabile. Lo sono anche le funzioni limitate con un numero finito di discontinuità.

?? Che differenza c'è fra $\int x^2\,dx$ e $\int_0^3 x^2\,dx$?
[x] il primo è una famiglia di funzioni, $\frac{x^3}{3} + c$; il secondo è un numero, $9$
[ ] nessuna: sono due modi di scrivere la stessa cosa
[ ] il primo è un numero, il secondo una funzione
[ ] tutti e due sono funzioni, ma il secondo non ha la $c$
=> L'integrale **indefinito**, senza estremi, è l'insieme delle primitive. L'integrale **definito**, con gli estremi, è un numero: $\frac{3^3}{3} = 9$. Non ha la $c$ e non contiene la $x$.

Le proprietà si capiscono pensando alle aree:

1. $\int_a^a f(x)\,dx = 0$;
2. $\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ (scambiare gli estremi cambia il segno);
3. linearità: $\int_a^b [\alpha f + \beta g]\,dx = \alpha\int_a^b f\,dx + \beta\int_a^b g\,dx$;
4. additività: $\int_a^b f\,dx = \int_a^c f\,dx + \int_c^b f\,dx$, per ogni $c$;
5. se $f(x) \le g(x)$ in $[a;b]$, allora $\int_a^b f\,dx \le \int_a^b g\,dx$.

>! Se nel risultato di un integrale definito compare la $x$, c'è un errore. La variabile di integrazione è **muta**: $\int_a^b f(x)\,dx$ e $\int_a^b f(t)\,dt$ sono lo stesso numero.` },

    { id: 'teorema-fondamentale', titolo: 'Funzione integrale e teorema fondamentale', testo: R`Calcolare un integrale con i rettangoli sarebbe lunghissimo. C'è una strada corta, e passa per le primitive.

[[video:integrali/teorema-fondamentale]]

[[video:integrali/calcolo]]

Fissa l'estremo sinistro $a$ e lascia muovere quello destro. A ogni $x$ associ l'area accumulata da $a$ fino a $x$.

>* **Funzione integrale:** $$F(x) = \int_a^x f(t)\,dt.$$ Dentro l'integrale la variabile si chiama $t$, perché la $x$ è già l'estremo.

Nell'animazione guarda quanto cresce l'area a ogni passo. Dove la curva è alta cresce in fretta, dove è bassa cresce piano.

[[animazione:integrale-accumulo]]

La velocità con cui cresce l'area è l'altezza della curva. In simboli: la derivata della funzione integrale è la funzione di partenza.

>* **Teorema fondamentale del calcolo integrale (Torricelli–Barrow).** Se $f$ è continua in $[a;b]$, la funzione integrale $F$ è derivabile e $$F'(x) = f(x) \quad \text{per ogni } x \in [a;b].$$

Il perché: da $x$ a $x+h$ l'area cresce di una striscia alta circa $f(x)$ e larga $h$. Quindi $\dfrac{F(x+h)-F(x)}{h} \approx f(x)$. Con $h \to 0$ diventa un'uguaglianza.

Ne segue che **ogni funzione continua ha primitive**: una è la sua funzione integrale. Da qui arriva la formula dei calcoli.

>* **Formula fondamentale (Leibniz–Newton).** Se $G$ è una primitiva qualunque di $f$: $$\int_a^b f(x)\,dx = G(b) - G(a).$$

$G(b) - G(a)$ si scrive anche $\big[G(x)\big]_a^b$. La costante $c$ non serve, perché nella differenza si semplifica.

~ \int_1^2 3x^2\,dx :: l'area sotto $y = 3x^2$ fra $1$ e $2$
~ \big[\evid{x^3}\big]_1^2 :: una primitiva di $3x^2$ è $x^3$ (la $c$ non serve)
~ \evid{2^3} - \evid{1^3} :: si calcola la primitiva nell'estremo superiore, meno quella nell'estremo inferiore
~ 8 - 1 = \evidb{7} :: un numero, senza $x$ e senza $c$

Nel grafico trascina gli estremi $a$ e $b$. In alto leggi $G(b) - G(a)$, con $G(x) = \frac{x^3}{3}$. Poi porta $a$ a destra di $b$.

[[grafico:estremi]]

?? Quanto vale $\int_2^1 3x^2\,dx$, cioè con gli estremi scambiati?
[x] $-7$
[ ] $7$
[ ] $0$
=> $\big[x^3\big]_2^1 = 1 - 8 = -7$. Scambiare gli estremi cambia il segno. Chi risponde $7$ fa «grande meno piccolo». La formula è sempre «estremo di sopra meno estremo di sotto».

> Se l'estremo superiore è a sua volta una funzione, si usa la regola della catena: $D\!\left[\int_a^{g(x)} f(t)\,dt\right] = f(g(x))\cdot g'(x)$.` },

    { id: 'aree', titolo: 'Aree con il segno e valore medio', testo: R`Ogni rettangolo conta $f(x_i)\cdot\Delta x$. Dove la curva sta sotto l'asse $x$, $f(x_i)$ è negativo, e il rettangolo conta con il meno. Quindi l'integrale definito è un'area **con il segno**.

Trascina l'estremo $b$ e guarda i due numeri. Finché la sinusoide sta sopra l'asse crescono insieme. Oltre $\pi$ l'integrale scende, mentre l'area continua a salire.

[[grafico:segno-seno]]

Con $b = 2\pi$ le due gobbe hanno area $2$, ma segno opposto: $$\int_0^{2\pi} \sin x\,dx = \big[-\cos x\big]_0^{2\pi} = -1 + 1 = 0.$$

>* Per l'**area**, spezza l'intervallo dove $f$ cambia segno. Integra su ogni tratto e somma i **valori assoluti**. Per la sinusoide su $[0;2\pi]$: $A = \lvert 2 \rvert + \lvert -2 \rvert = 4$.

?? Quanto vale l'area della regione fra $y = x$, l'asse $x$ e le rette $x = -2$ e $x = 2$?
[x] $4$
[ ] $0$
[ ] $2$
=> Sono due triangoli di area $2$, uno sotto e uno sopra l'asse: l'area è $4$. L'integrale $\int_{-2}^{2} x\,dx$ invece vale $0$, perché i triangoli si cancellano. Chi risponde $0$ ha calcolato l'integrale, non l'area.

### Area fra due curve

>* **Area fra due curve**, con $f$ sopra e $g$ sotto: $$A = \int_a^b \big[f(x) - g(x)\big]\,dx$$

Gli estremi $a$ e $b$ sono le ascisse dei punti dove le curve si incontrano. La formula vale anche sotto l'asse $x$: conta solo quale curva sta sopra.

~ x^2 = x + 2 :: area fra la retta $y = x+2$ e la parabola $y = x^2$: prima cerco dove si incontrano
~ x = -1 \ \vee\ x = 2 :: risolvo $x^2 - x - 2 = 0$; per $x = 0$ la retta vale $2$ e la parabola $0$, quindi nel mezzo sta sopra la retta
~ A = \int_{-1}^{2} \big(\evid{x + 2} - \evid{x^2}\big)\,dx :: curva sopra meno curva sotto
~ \left[\evid{\frac{x^2}{2} + 2x - \frac{x^3}{3}}\right]_{-1}^{2} :: una primitiva, termine per termine
~ \evid{\frac{10}{3}} - \left(\evid{-\frac{7}{6}}\right) :: in $2$: $2 + 4 - \frac83 = \frac{10}{3}$; in $-1$: $\frac12 - 2 + \frac13 = -\frac76$
~ A = \evidb{\frac{9}{2}} :: $\frac{20}{6} + \frac{7}{6} = \frac{27}{6}$

### Valore medio

Un'auto fa $150$ km in $2$ ore. La velocità media è $75$ km/h: a quella velocità costante farebbe la stessa strada.

>* **Teorema della media.** Se $f$ è continua in $[a;b]$, esiste un punto $c$ in $[a;b]$ tale che $$f(c) = \frac{1}{b-a}\int_a^b f(x)\,dx.$$ $f(c)$ è il **valor medio**: l'altezza del rettangolo di base $b-a$ con la stessa area.

Esempio: il valor medio di $x^2$ in $[0;3]$ è $\dfrac{1}{3}\int_0^3 x^2\,dx = \dfrac{1}{3}\cdot 9 = 3$. Lo raggiunge in $c = \sqrt{3}$.

>! Se la funzione cambia segno, area e integrale sono diversi. Se il testo dice *area*, studia prima il segno.` },

    { id: 'volumi-impropri', titolo: 'Volumi di rotazione e integrali impropri', testo: R`### Solidi di rotazione

Fai ruotare la regione sotto il grafico di $f$ attorno all'asse $x$, come un pezzo di legno al tornio. Ottieni un solido.

Taglialo nel punto $x$: la sezione è un cerchio di raggio $f(x)$. La sua area è $\pi [f(x)]^2$. Il solido è fatto di tanti dischi sottili, e sommarli è un integrale.

>* **Volume del solido di rotazione attorno all'asse $x$:** $$V = \pi \int_a^b [f(x)]^2\,dx.$$

~ V = \pi\int_0^4 \big(\sqrt{x}\big)^2\,dx :: la regione sotto $y = \sqrt{x}$, per $x$ fra $0$ e $4$, ruota attorno all'asse $x$
~ V = \pi\int_0^4 \evid{x}\,dx :: il quadrato fa sparire la radice
~ V = \pi\left[\evid{\frac{x^2}{2}}\right]_0^4 :: primitiva di $x$
~ V = \pi\left(\evid{8 - 0}\right) = \evidb{8\pi} :: $\frac{16}{2} = 8$

> Prova la formula su un cono. Il segmento $y = \dfrac{r}{h}x$, per $x$ fra $0$ e $h$, ruotando dà un cono. E infatti $V = \pi\int_0^h \dfrac{r^2}{h^2}x^2\, dx = \dfrac{1}{3}\pi r^2 h$.

?? La regione sotto $y = x$, per $x$ fra $0$ e $3$, ruota attorno all'asse $x$. Quale integrale dà il volume?
[x] $\pi\int_0^3 x^2\,dx$
[ ] $\pi\int_0^3 x\,dx$
[ ] $\int_0^3 \pi x\,dx$
[ ] $2\pi\int_0^3 x\,dx$
=> Ogni sezione è un cerchio di raggio $x$, di area $\pi x^2$. Il volume è $\pi\int_0^3 x^2\,dx = 9\pi$. Senza il quadrato usi il raggio al posto dell'area del cerchio.

### Integrali impropri

E se l'intervallo arriva all'infinito, o la funzione ha un asintoto verticale? Calcoli l'integrale su un intervallo normale, poi fai un limite.

>* **Intervallo illimitato:** $$\int_a^{+\infty} f(x)\,dx = \lim_{b \to +\infty}\int_a^{b} f(x)\,dx.$$ Se il limite è un numero finito l'integrale **converge**, altrimenti **diverge**.

Trascina l'estremo $b$ verso destra e guarda l'area. Poi confrontala con quella sotto $\frac{1}{x}$, la curva tratteggiata.

[[grafico:improprio]]

~ \int_1^{+\infty}\frac{dx}{x^2} :: l'estremo è infinito: si mette al suo posto un numero $b$
~ \lim_{b \to +\infty}\evid{\left[-\frac{1}{x}\right]_1^{b}} :: una primitiva di $x^{-2}$ è $-x^{-1}$
~ \lim_{b \to +\infty}\left(\evid{-\frac{1}{b} + 1}\right) :: si calcola negli estremi $b$ e $1$, come sempre
~ \evidb{1} :: $\frac1b$ tende a zero: l'integrale converge

La regione è infinitamente lunga, ma ha area finita. Con $\frac{1}{x}$ invece $\int_1^{b}\dfrac{dx}{x} = \ln b$, che tende a $+\infty$: l'integrale diverge.

**Funzione illimitata.** Se $f$ ha un asintoto verticale in un estremo, ti avvicini a quell'estremo con un limite: $\int_0^1 \dfrac{dx}{\sqrt{x}} = \lim_{\varepsilon \to 0^+}\big[2\sqrt{x}\big]_\varepsilon^1 = \lim_{\varepsilon \to 0^+}\big(2 - 2\sqrt{\varepsilon}\big) = 2$.

>! Non sostituire $+\infty$ come se fosse un numero. Calcola l'integrale con l'estremo $b$ e **poi** fai il limite.` },

  ],

  grafici: {
    estremi: {
      tipo: 'piano', x: [-1.8, 3.4], y: [-1.5, 10.5],
      funzioni: [{ f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [-1.8, 3.3] }],
      parametri: [
        { nome: 'a', min: -1.5, max: 3, passo: 0.1, valore: 1, nascosto: true },
        { nome: 'b', min: -1.5, max: 3, passo: 0.1, valore: 2, nascosto: true }
      ],
      elementi: [
        { tipo: 'area', f: 'x^2', da: 'a', a: 'b' },
        { tipo: 'segmento', da: ['a', 0], a: ['a', 'a^2'], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: ['b', 0], a: ['b', 'b^2'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['a', 0], trascina: true, etichetta: 'a', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['b', 0], trascina: true, etichetta: 'b', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-1.65, 9.6], testo: 'G(b) = {{b^3/3}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.65, 8.4], testo: 'G(a) = {{a^3/3}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.65, 7.2], testo: '∫ = G(b) − G(a) = {{(b^3 - a^3)/3}}', ancora: 'start' }
      ],
      didascalia: 'Trascina a e b. Con G(x) = x³/3, la differenza G(b) − G(a) è l\'area colorata; se porti a a destra di b diventa negativa.'
    },
    'segno-seno': {
      tipo: 'piano', x: [-0.4, 6.8], y: [-1.6, 1.6], passo: [1, 0.5], altezza: 420,
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1 }],
      parametri: [{ nome: 'b', min: 0, max: 6.2832, passo: 0.05, valore: 2, nascosto: true }],
      elementi: [
        { tipo: 'area', f: '(sin(x) + abs(sin(x)))/2', da: 0, a: 'b', colore: 1 },
        { tipo: 'area', f: '(sin(x) - abs(sin(x)))/2', da: 0, a: 'b', colore: 2 },
        { tipo: 'punto', p: ['b', 0], trascina: true, etichetta: 'b', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [3.4, 1.4], testo: 'integrale = {{1 - cos(b)}}', ancora: 'start' },
        { tipo: 'testo', p: [3.4, 1.1], testo: 'area = {{2*floor(b/pi) + 1 - cos(b - pi*floor(b/pi))}}', ancora: 'start' }
      ],
      didascalia: 'Trascina b da 0 fino a 2π. La parte sotto l\'asse fa scendere l\'integrale, ma fa crescere l\'area.'
    },
    improprio: {
      tipo: 'piano', x: [0, 12.5], y: [-0.15, 1.35], passo: [1, 0.25], altezza: 320,
      funzioni: [
        { f: '1/x^2', colore: 1, dominio: [0.86, 12.5] },
        { f: '1/x', etichetta: 'y = 1/x', colore: 2, tratteggio: true, dominio: [0.74, 12.5] }
      ],
      parametri: [{ nome: 'b', min: 1, max: 12, passo: 0.1, valore: 3, nascosto: true }],
      elementi: [
        { tipo: 'area', f: '1/x', da: 1, a: 'b', colore: 2 },
        { tipo: 'area', f: '1/x^2', da: 1, a: 'b', colore: 1 },
        { tipo: 'punto', p: ['b', 0], trascina: true, etichetta: 'b', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [1.2, 1.2], testo: 'y = 1/x²', ancora: 'start' },
        { tipo: 'testo', p: [5, 1.2], testo: 'area sotto 1/x²: {{1 - 1/b}}', ancora: 'start' },
        { tipo: 'testo', p: [5, 1.02], testo: 'area sotto 1/x: {{ln(b)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina b verso destra: l\'area sotto 1/x² si avvicina a 1 senza superarlo, quella sotto 1/x continua a crescere.'
    }
  },

  esempi: [
    { titolo: 'Integrale indefinito immediato', problema: R`Calcola $\displaystyle\int \left(2x^3 + \frac{3}{x} - 5\sin x\right)dx$.`, passi: [
      R`Per la linearità l'integrale si spezza in tre e le costanti escono: $2\int x^3 dx + 3\int \dfrac{1}{x}dx - 5\int \sin x\,dx$.`,
      R`Con la regola della potenza, $\int x^3 dx = \dfrac{x^4}{4}$, quindi il primo pezzo dà $\dfrac{x^4}{2}$.`,
      R`Poi $\int \dfrac{1}{x}dx = \ln \lvert x \rvert$: il valore assoluto serve perché $\frac1x$ esiste anche per $x < 0$, mentre il logaritmo vuole un argomento positivo. Il secondo pezzo dà $3\ln \lvert x \rvert$.`,
      R`Infine $\int \sin x\,dx = -\cos x$, che moltiplicato per il $-5$ davanti diventa $+5\cos x$.`,
      R`Si sommano i tre pezzi e si aggiunge una sola costante $c$, che raccoglie quelle dei tre integrali.`,
      R`Verifica: derivando $\dfrac{x^4}{2} + 3\ln \lvert x \rvert + 5\cos x$ si ottiene $2x^3 + \dfrac{3}{x} - 5\sin x$, la funzione di partenza. ✓`
    ], risultato: R`$\dfrac{x^4}{2} + 3\ln \lvert x \rvert + 5\cos x + c$` },

    { titolo: 'Per sostituzione', problema: R`Calcola $\displaystyle\int \frac{e^{\sqrt{x}}}{\sqrt{x}}\,dx$.`, passi: [
      R`La parte "difficile" è $\sqrt{x}$ dentro l'esponenziale: si pone $t = \sqrt{x}$.`,
      R`Si trasforma anche il $dx$: derivando, $dt = \dfrac{1}{2\sqrt{x}}dx$, cioè $\dfrac{dx}{\sqrt{x}} = 2\,dt$. Nell'integranda c'è proprio $\dfrac{dx}{\sqrt{x}}$: è il segnale che la sostituzione è quella giusta.`,
      R`L'integrale diventa $\int e^t \cdot 2\,dt = 2e^t + c$, immediato.`,
      R`Si torna alla variabile di partenza rimettendo $\sqrt{x}$ al posto di $t$: $2e^{\sqrt{x}} + c$.`,
      R`Verifica: $D\!\left(2e^{\sqrt{x}}\right) = 2e^{\sqrt{x}}\cdot\dfrac{1}{2\sqrt{x}} = \dfrac{e^{\sqrt{x}}}{\sqrt{x}}$. ✓`
    ], risultato: R`$2e^{\sqrt{x}} + c$` },

    { titolo: 'Per parti', problema: R`Calcola $\displaystyle\int x\ln x\,dx$.`, passi: [
      R`È un prodotto di un logaritmo e di un polinomio: si integra per parti. Il logaritmo si semplifica derivando, quindi si sceglie $f(x) = \ln x$ come fattore finito e $g'(x) = x$ come fattore differenziale.`,
      R`Allora $f'(x) = \dfrac{1}{x}$ e $g(x) = \dfrac{x^2}{2}$.`,
      R`Formula: $\int x\ln x\,dx = \dfrac{x^2}{2}\ln x - \int \dfrac{x^2}{2}\cdot\dfrac{1}{x}\,dx = \dfrac{x^2}{2}\ln x - \dfrac{1}{2}\int x\,dx$.`,
      R`L'integrale rimasto è immediato: $\dfrac{1}{2}\int x\,dx = \dfrac{1}{2}\cdot\dfrac{x^2}{2} = \dfrac{x^2}{4}$.`,
      R`Si mettono insieme i due pezzi e si aggiunge la costante: $\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4} + c$.`,
      R`Perché non la scelta opposta? Con $f = x$ e $g' = \ln x$ bisognerebbe integrare $\ln x$ per trovare $g$, e il nuovo integrale sarebbe più difficile di quello di partenza.`
    ], risultato: R`$\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4} + c$` },

    { titolo: 'Funzione razionale fratta con Δ > 0', problema: R`Calcola $\displaystyle\int \frac{x+3}{x^2-x-2}\,dx$.`, passi: [
      R`Il numeratore ha grado minore del denominatore: non serve la divisione.`,
      R`Si scompone il denominatore: $x^2-x-2 = (x-2)(x+1)$, perché le radici sono $2$ e $-1$.`,
      R`Si cercano due fratti semplici: $\dfrac{x+3}{(x-2)(x+1)} = \dfrac{A}{x-2} + \dfrac{B}{x+1}$, da cui $A(x+1)+B(x-2) = x+3$.`,
      R`Si assegnano a $x$ i valori che azzerano un fattore: con $x=2$ si ha $3A = 5$, cioè $A = \dfrac{5}{3}$; con $x=-1$ si ha $-3B = 2$, cioè $B = -\dfrac{2}{3}$.`,
      R`Ogni pezzo è del tipo $\dfrac{f'}{f}$ a meno di costanti: $\dfrac{5}{3}\ln \lvert x-2 \rvert - \dfrac{2}{3}\ln \lvert x+1 \rvert + c$.`
    ], risultato: R`$\dfrac{5}{3}\ln \lvert x-2 \rvert - \dfrac{2}{3}\ln \lvert x+1 \rvert + c$` },

    { titolo: 'Un integrale definito', problema: R`Calcola $\displaystyle\int_0^2 (4 - x^2)\,dx$ e interpreta il risultato.`, passi: [
      R`Si cerca una primitiva qualsiasi: $G(x) = 4x - \dfrac{x^3}{3}$.`,
      R`Formula fondamentale: $\int_0^2 (4-x^2)dx = \big[4x - \frac{x^3}{3}\big]_0^2 = G(2) - G(0)$.`,
      R`$G(2) = 8 - \dfrac{8}{3} = \dfrac{16}{3}$ e $G(0) = 0$.`,
      R`In $[0;2]$ la parabola $y = 4-x^2$ sta sopra l'asse $x$, quindi il numero trovato è proprio l'area della regione: circa $5{,}33$.`
    ], risultato: R`$\dfrac{16}{3}$` },

    { titolo: 'Un volume di rotazione', problema: R`La regione sotto $y = \sqrt{x}$, con $0 \le x \le 4$, ruota di un giro completo attorno all'asse $x$. Calcola il volume del solido.`, passi: [
      R`La sezione perpendicolare all'asse in $x$ è un cerchio di raggio $f(x) = \sqrt{x}$, quindi di area $\pi (\sqrt{x})^2 = \pi x$.`,
      R`Formula: $V = \pi\int_0^4 \left(\sqrt{x}\right)^2 dx = \pi\int_0^4 x\,dx$. Elevare al quadrato ha fatto sparire la radice.`,
      R`$\pi\left[\dfrac{x^2}{2}\right]_0^4 = \pi\left(8 - 0\right) = 8\pi$.`,
      R`Controllo di ordine di grandezza: il solido sta dentro il cilindro di raggio $2$ e altezza $4$, che ha volume $16\pi$. Il risultato $8\pi$ è esattamente la metà: plausibile.`
    ], risultato: R`$V = 8\pi \approx 25{,}13$` }
  ],

  formulario: [
    { nome: 'Integrale indefinito', formula: R`\int f(x)\,dx = F(x) + c \iff F'(x) = f(x)`, nota: R`Vale in un **intervallo**: lì due primitive differiscono solo per una costante.` },
    { nome: 'Linearità', formula: R`\int [\alpha f(x) + \beta g(x)]\,dx = \alpha\!\int\! f(x)\,dx + \beta\!\int\! g(x)\,dx`, nota: R`Non esiste nulla di simile per prodotti e quozienti.` },
    { nome: 'Integrale di una potenza', formula: R`\int x^{\alpha}\,dx = \frac{x^{\alpha+1}}{\alpha+1} + c \quad (\alpha \ne -1)`, nota: R`Il caso escluso è $\alpha = -1$: $\int \dfrac{1}{x}\,dx = \ln \lvert x \rvert + c$.` },
    { nome: 'Esponenziali', formula: R`\int e^{x}\,dx = e^{x} + c, \qquad \int a^{x}\,dx = \frac{a^{x}}{\ln a} + c` },
    { nome: 'Goniometrici immediati', formula: R`\int \sin x\,dx = -\cos x + c, \qquad \int \cos x\,dx = \sin x + c`, nota: R`Attenzione al segno: è il seno che, integrato, cambia segno.` },
    { nome: 'Che danno tangente e arcotangente', formula: R`\int \frac{dx}{\cos^2 x} = \tan x + c, \qquad \int \frac{dx}{1+x^2} = \arctan x + c` },
    { nome: 'Integrali quasi immediati', formula: R`\int [f(x)]^{\alpha} f'(x)\,dx = \frac{[f(x)]^{\alpha+1}}{\alpha+1} + c, \qquad \int \frac{f'(x)}{f(x)}\,dx = \ln \lvert f(x) \rvert + c`, nota: R`Se manca solo un fattore numerico, si aggiusta moltiplicando e dividendo per una **costante**.` },
    { nome: 'Integrazione per parti', formula: R`\int f(x)\,g'(x)\,dx = f(x)\,g(x) - \int f'(x)\,g(x)\,dx`, nota: R`Fattore finito $f$ (si deriva): logaritmi, arcotangenti, polinomi. Fattore differenziale $g'$ (si integra): $e^x$, $\sin x$, $\cos x$.` },
    { nome: 'Integrazione per sostituzione', formula: R`\int f(g(x))\,g'(x)\,dx = \int f(t)\,dt \quad \text{con } t = g(x),\ dt = g'(x)\,dx`, nota: R`Negli integrali definiti gli estremi diventano $g(a)$ e $g(b)$, e non si torna alla variabile $x$.` },
    { nome: 'Formula fondamentale (Leibniz–Newton)', formula: R`\int_a^b f(x)\,dx = \big[G(x)\big]_a^b = G(b) - G(a)`, nota: R`$G$ è una primitiva **qualunque** di $f$: la costante si semplifica nella differenza.` },
    { nome: 'Derivata della funzione integrale', formula: R`\frac{d}{dx}\int_a^x f(t)\,dt = f(x)`, nota: R`Teorema di Torricelli–Barrow, con $f$ continua. Con estremo $g(x)$ si moltiplica per $g'(x)$.` },
    { nome: 'Area fra due curve', formula: R`A = \int_a^b \big[f(x) - g(x)\big]\,dx`, nota: R`Con $f$ sopra e $g$ sotto in tutto $[a;b]$; $a$ e $b$ sono di solito le ascisse delle intersezioni.` },
    { nome: 'Valor medio', formula: R`f(c) = \frac{1}{b-a}\int_a^b f(x)\,dx`, nota: R`Teorema della media: con $f$ continua un tale $c \in [a;b]$ esiste sempre.` },
    { nome: 'Volume di rotazione attorno all\'asse x', formula: R`V = \pi \int_a^b [f(x)]^2\,dx` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'primitive', tipo: 'definizione', fronte: R`Primitiva di una funzione`, retro: R`$F$ è una primitiva di $f$ in un intervallo se $F'(x) = f(x)$ in ogni punto dell'intervallo.` },
    { id: 'fc-02', sezione: 'primitive', tipo: 'concetto', fronte: R`Quante primitive ha una funzione?`, retro: R`Infinite: in un intervallo, due primitive della stessa funzione differiscono per una costante.` },
    { id: 'fc-03', sezione: 'primitive', tipo: 'formula', fronte: R`Linearità dell'integrale`, retro: R`$\int [\alpha f + \beta g]\,dx = \alpha\int f\,dx + \beta\int g\,dx$. Non vale per prodotti né per quozienti.` },
    { id: 'fc-04', sezione: 'immediati', tipo: 'formula', fronte: R`$\int x^\alpha\,dx$`, retro: R`$\dfrac{x^{\alpha+1}}{\alpha+1} + c$, per $\alpha \ne -1$. Per $\alpha = -1$ si ha $\ln \lvert x \rvert + c$.` },
    { id: 'fc-05', sezione: 'immediati', tipo: 'formula', fronte: R`$\int \sin x\,dx$ e $\int \cos x\,dx$`, retro: R`$-\cos x + c$ e $\sin x + c$.` },
    { id: 'fc-06', sezione: 'immediati', tipo: 'formula', fronte: R`$\int \dfrac{f'(x)}{f(x)}\,dx$`, retro: R`$\ln \lvert f(x) \rvert + c$.` },
    { id: 'fc-07', sezione: 'immediati', tipo: 'procedura', fronte: R`Come si riconosce un integrale quasi immediato?`, retro: R`Dentro l'integranda compare una funzione insieme alla sua derivata, a meno di un fattore numerico che si aggiusta con la linearità.` },
    { id: 'fc-08', sezione: 'sostituzione', tipo: 'procedura', fronte: R`Passi dell'integrazione per sostituzione`, retro: R`1) Si pone $t = g(x)$. 2) Si calcola $dt = g'(x)\,dx$. 3) Si riscrive tutto in $t$, $dx$ compreso. 4) Si integra e si torna a $x$.` },
    { id: 'fc-09', sezione: 'sostituzione', tipo: 'concetto', fronte: R`Sostituzione in un integrale definito`, retro: R`Si cambiano anche gli estremi: da $a$ e $b$ si passa a $g(a)$ e $g(b)$, e non si torna alla variabile $x$.` },
    { id: 'fc-10', sezione: 'per-parti', tipo: 'formula', fronte: R`Formula di integrazione per parti`, retro: R`$\int f\,g'\,dx = f\,g - \int f'\,g\,dx$.` },
    { id: 'fc-11', sezione: 'per-parti', tipo: 'procedura', fronte: R`Come si scelgono fattore finito e differenziale?`, retro: R`Finito ($f$, da derivare): ciò che si semplifica, come $\ln x$, $\arctan x$, un polinomio. Differenziale ($g'$, da integrare): $e^x$, $\sin x$, $\cos x$.` },
    { id: 'fc-12', sezione: 'per-parti', tipo: 'formula', fronte: R`$\int \ln x\,dx$`, retro: R`$x\ln x - x + c$: per parti con $f = \ln x$ e $g' = 1$.` },
    { id: 'fc-13', sezione: 'razionali-fratte', tipo: 'procedura', fronte: R`Primo passo con una funzione razionale fratta`, retro: R`Confrontare i gradi: se quello del numeratore è $\ge$ di quello del denominatore, si esegue la divisione fra polinomi.` },
    { id: 'fc-14', sezione: 'razionali-fratte', tipo: 'procedura', fronte: R`Denominatore di secondo grado con $\Delta > 0$`, retro: R`Si scompone in $(x-x_1)(x-x_2)$ e si decompone in fratti semplici $\dfrac{A}{x-x_1} + \dfrac{B}{x-x_2}$: il risultato è una somma di logaritmi.` },
    { id: 'fc-15', sezione: 'razionali-fratte', tipo: 'procedura', fronte: R`Denominatore di secondo grado con $\Delta < 0$`, retro: R`Si completa il quadrato: $\int \dfrac{du}{u^2+k^2} = \dfrac{1}{k}\arctan\dfrac{u}{k} + c$. Nel risultato compare un'arcotangente.` },
    { id: 'fc-16', sezione: 'definito', tipo: 'definizione', fronte: R`Integrale definito`, retro: R`Il limite comune delle somme inferiori e superiori dei rettangoli quando la loro base tende a zero: $\int_a^b f(x)\,dx$. È un **numero**.` },
    { id: 'fc-17', sezione: 'definito', tipo: 'concetto', fronte: R`Quali funzioni sono integrabili in $[a;b]$?`, retro: R`Tutte le continue; più in generale le limitate con un numero finito di punti di discontinuità.` },
    { id: 'fc-18', sezione: 'definito', tipo: 'formula', fronte: R`Additività rispetto all'intervallo`, retro: R`$\int_a^b f\,dx = \int_a^c f\,dx + \int_c^b f\,dx$. Inoltre $\int_b^a f\,dx = -\int_a^b f\,dx$.` },
    { id: 'fc-19', sezione: 'teorema-fondamentale', tipo: 'definizione', fronte: R`Funzione integrale`, retro: R`$F(x) = \int_a^x f(t)\,dt$: l'area con segno accumulata da $a$ fino a $x$.` },
    { id: 'fc-20', sezione: 'teorema-fondamentale', tipo: 'concetto', fronte: R`Teorema fondamentale del calcolo integrale`, retro: R`Se $f$ è continua, la funzione integrale è derivabile e $F'(x) = f(x)$. Quindi ogni funzione continua ha primitive.` },
    { id: 'fc-21', sezione: 'teorema-fondamentale', tipo: 'formula', fronte: R`Formula di Leibniz–Newton`, retro: R`$\int_a^b f(x)\,dx = G(b) - G(a)$, con $G$ primitiva qualunque di $f$.` },
    { id: 'fc-22', sezione: 'aree', tipo: 'concetto', fronte: R`Integrale definito e area: che differenza c'è?`, retro: R`L'integrale è un'area **con segno**: dove $f < 0$ conta negativamente. Per l'area si spezza l'intervallo e si sommano i valori assoluti.` },
    { id: 'fc-23', sezione: 'aree', tipo: 'formula', fronte: R`Valor medio di $f$ in $[a;b]$`, retro: R`$\dfrac{1}{b-a}\int_a^b f(x)\,dx$: l'altezza del rettangolo di base $b-a$ con la stessa area.` },
    { id: 'fc-24', sezione: 'volumi-impropri', tipo: 'formula', fronte: R`Volume di un solido di rotazione attorno all'asse $x$`, retro: R`$V = \pi\int_a^b [f(x)]^2\,dx$: ogni sezione è un cerchio di raggio $f(x)$.` },
    { id: 'fc-25', sezione: 'volumi-impropri', tipo: 'definizione', fronte: R`Integrale improprio su intervallo illimitato`, retro: R`$\int_a^{+\infty} f\,dx = \lim_{b \to +\infty}\int_a^b f\,dx$. Converge se il limite è finito, altrimenti diverge.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola $\int 4x^3\,dx$. Scrivi gli esponenti con ^, per esempio x^2. Il $+\,c$ puoi anche ometterlo.`, suggerimenti: [R`Regola della potenza: $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + c$.`], risposta: prim(['x^4']), soluzione: [R`L'esponente sale di uno: $x^3$ diventa $\dfrac{x^4}{4}$.`, R`Moltiplica per $4$: $4 \cdot \dfrac{x^4}{4} = x^4$. Risultato: $x^4 + c$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $\int (2x + 3)\,dx$.`, suggerimenti: [R`Integra un termine alla volta.`], risposta: prim(['x^2', '3x']), soluzione: [R`$\int 2x\,dx = 2 \cdot \dfrac{x^2}{2} = x^2$.`, R`$\int 3\,dx = 3x$.`, R`Risultato: $x^2 + 3x + c$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $\int \cos x\,dx$.`, suggerimenti: [R`Quale funzione ha per derivata $\cos x$?`], risposta: prim(['sin(x)']), soluzione: [R`$D(\sin x) = \cos x$.`, R`Quindi $\int \cos x\,dx = \sin x + c$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Calcola $\displaystyle\int_0^2 3x^2\,dx$.`, suggerimenti: [R`Una primitiva di $3x^2$ è $x^3$. Calcolala in $2$ e in $0$.`], risposta: val(8), soluzione: [R`Primitiva: $x^3$.`, R`$\big[x^3\big]_0^2 = 2^3 - 0^3 = 8$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Calcola $\displaystyle\int_1^4 2x\,dx$.`, suggerimenti: [R`Una primitiva di $2x$ è $x^2$.`], risposta: val(15), soluzione: [R`Primitiva: $x^2$.`, R`$\big[x^2\big]_1^4 = 16 - 1 = 15$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola $\int (6x^2 - 2x)\,dx$.`, suggerimenti: [R`Integra un termine alla volta: l'esponente sale di uno e dividi per il nuovo esponente.`], risposta: prim(['2x^3', '-x^2']), soluzione: [R`$\int 6x^2\,dx = 6 \cdot \dfrac{x^3}{3} = 2x^3$.`, R`$\int 2x\,dx = x^2$.`, R`Risultato: $2x^3 - x^2 + c$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola $\int (e^x + 2x)\,dx$.`, suggerimenti: [R`La derivata di $e^x$ è ancora $e^x$.`], risposta: prim(['e^x', 'x^2']), soluzione: [R`$\int e^x\,dx = e^x$.`, R`$\int 2x\,dx = x^2$.`, R`Risultato: $e^x + x^2 + c$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Calcola $\int \dfrac{1}{x^2}\,dx$.`, suggerimenti: [R`Scrivi $\dfrac{1}{x^2} = x^{-2}$ e usa la regola della potenza.`], risposta: prim(['-1/x'], ['-x^-1', '-x^(-1)', '-(1/x)', '-1/(x)']), soluzione: [R`$\dfrac{1}{x^2} = x^{-2}$.`, R`L'esponente sale di uno: $\dfrac{x^{-1}}{-1} = -x^{-1}$.`, R`Risultato: $-\dfrac{1}{x} + c$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Calcola $\displaystyle\int_0^1 (x^2 + 2x)\,dx$. Puoi scrivere una frazione, per esempio 5/3.`, suggerimenti: [R`Una primitiva è $\dfrac{x^3}{3} + x^2$.`], risposta: val(4 / 3), soluzione: [R`Primitiva: $\dfrac{x^3}{3} + x^2$.`, R`In $1$ vale $\dfrac{1}{3} + 1 = \dfrac{4}{3}$. In $0$ vale $0$.`, R`Risultato: $\dfrac{4}{3}$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Calcola $\displaystyle\int_0^3 (2x - 1)\,dx$.`, suggerimenti: [R`Una primitiva è $x^2 - x$.`], risposta: val(6), soluzione: [R`Primitiva: $x^2 - x$.`, R`$\big[x^2 - x\big]_0^3 = (9 - 3) - 0 = 6$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^{\pi} \sin x\,dx$.`, suggerimenti: [R`Una primitiva di $\sin x$ è $-\cos x$: attento al segno.`, R`$\cos \pi = -1$ e $\cos 0 = 1$.`], risposta: val(2), soluzione: [R`Primitiva: $-\cos x$.`, R`$\big[-\cos x\big]_0^{\pi} = -\cos \pi - (-\cos 0)$.`, R`$= 1 + 1 = 2$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^1 e^x\,dx$. Puoi scrivere e per il numero di Nepero.`, suggerimenti: [R`Una primitiva di $e^x$ è $e^x$. Ricorda che $e^0 = 1$.`], risposta: val(Math.E - 1), soluzione: [R`$\big[e^x\big]_0^1 = e^1 - e^0$.`, R`$= e - 1$, circa $1{,}72$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Calcola l'area della regione sotto $y = x^2$, sopra l'asse $x$, fra $x = 0$ e $x = 3$.`, suggerimenti: [R`In $[0; 3]$ la curva sta sopra l'asse: l'area è l'integrale.`], risposta: val(9), soluzione: [R`$x^2 \ge 0$, quindi l'area è $\displaystyle\int_0^3 x^2\,dx$.`, R`Primitiva: $\dfrac{x^3}{3}$.`, R`$\dfrac{27}{3} - 0 = 9$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Calcola l'area della regione fra la parabola $y = 4 - x^2$ e l'asse $x$.`, suggerimenti: [R`Trova dove la parabola taglia l'asse $x$: sono gli estremi.`, R`Fra $-2$ e $2$ la parabola sta sopra l'asse.`], risposta: val(32 / 3), soluzione: [R`$4 - x^2 = 0$ per $x = -2$ e $x = 2$. In mezzo la curva sta sopra l'asse.`, R`Primitiva: $4x - \dfrac{x^3}{3}$.`, R`In $2$ vale $8 - \dfrac{8}{3} = \dfrac{16}{3}$. In $-2$ vale $-\dfrac{16}{3}$.`, R`Area: $\dfrac{16}{3} + \dfrac{16}{3} = \dfrac{32}{3}$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Calcola l'area della regione fra la parabola $y = x^2 - 2x$ e l'asse $x$.`, suggerimenti: [R`La parabola taglia l'asse in $0$ e in $2$. In mezzo sta sotto l'asse.`, R`L'integrale viene negativo: l'area è il suo valore assoluto.`], risposta: val(4 / 3), soluzione: [R`$x^2 - 2x = 0$ per $x = 0$ e $x = 2$. In mezzo la curva sta sotto l'asse.`, R`$\displaystyle\int_0^2 (x^2 - 2x)\,dx = \left[\dfrac{x^3}{3} - x^2\right]_0^2 = \dfrac{8}{3} - 4 = -\dfrac{4}{3}$.`, R`L'area è il valore assoluto: $\dfrac{4}{3}$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Calcola l'area della regione fra la retta $y = x$ e l'asse $x$, per $x$ fra $-1$ e $3$.`, suggerimenti: [R`La retta cambia segno in $x = 0$: spezza l'integrale lì.`, R`Il pezzo sotto l'asse va preso con il segno cambiato.`], risposta: val(5), soluzione: [R`$\displaystyle\int_{-1}^{0} x\,dx = \left[\dfrac{x^2}{2}\right]_{-1}^{0} = -\dfrac{1}{2}$: sotto l'asse, area $\dfrac{1}{2}$.`, R`$\displaystyle\int_0^3 x\,dx = \dfrac{9}{2}$.`, R`Area: $\dfrac{1}{2} + \dfrac{9}{2} = 5$. L'integrale da $-1$ a $3$ invece vale $4$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^1 2x\,(x^2 + 1)^2\,dx$ con la sostituzione $t = x^2 + 1$.`, suggerimenti: [R`$dt = 2x\,dx$: è proprio il pezzo che c'è accanto.`, R`Cambia anche gli estremi: per $x = 0$ e $x = 1$ quanto vale $t$?`], risposta: val(7 / 3), soluzione: [R`$t = x^2 + 1$, $dt = 2x\,dx$. Estremi: da $t = 1$ a $t = 2$.`, R`L'integrale diventa $\displaystyle\int_1^2 t^2\,dt$.`, R`$\left[\dfrac{t^3}{3}\right]_1^2 = \dfrac{8}{3} - \dfrac{1}{3} = \dfrac{7}{3}$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^1 x\,e^{x^2}\,dx$ con la sostituzione $t = x^2$.`, suggerimenti: [R`$dt = 2x\,dx$, quindi $x\,dx = \dfrac{dt}{2}$.`, R`Gli estremi diventano $t = 0$ e $t = 1$.`], risposta: val((Math.E - 1) / 2), soluzione: [R`$t = x^2$, $x\,dx = \dfrac{dt}{2}$. Estremi: da $t = 0$ a $t = 1$.`, R`L'integrale diventa $\dfrac{1}{2}\displaystyle\int_0^1 e^t\,dt$.`, R`$\dfrac{1}{2}\big[e^t\big]_0^1 = \dfrac{e - 1}{2}$, circa $0{,}86$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^1 x\,e^x\,dx$ per parti.`, suggerimenti: [R`Deriva $x$ e integra $e^x$.`, R`Una primitiva è $x\,e^x - e^x$.`], risposta: val(1), soluzione: [R`$f = x$, $g' = e^x$: allora $f' = 1$ e $g = e^x$.`, R`$\int x\,e^x\,dx = x\,e^x - \int e^x\,dx = x\,e^x - e^x$.`, R`$\big[x\,e^x - e^x\big]_0^1 = (e - e) - (0 - 1) = 1$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^{\pi/2} x\cos x\,dx$ per parti.`, suggerimenti: [R`Deriva $x$ e integra $\cos x$.`, R`Una primitiva è $x\sin x + \cos x$.`], risposta: val(Math.PI / 2 - 1), soluzione: [R`$f = x$, $g' = \cos x$: allora $f' = 1$ e $g = \sin x$.`, R`$\int x\cos x\,dx = x\sin x - \int \sin x\,dx = x\sin x + \cos x$.`, R`In $\dfrac{\pi}{2}$ vale $\dfrac{\pi}{2} + 0$. In $0$ vale $0 + 1$.`, R`Risultato: $\dfrac{\pi}{2} - 1$, circa $0{,}57$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Calcola $\displaystyle\int (3x^2 - 4x + 1)\,dx$.`, suggerimenti: [R`Spezza con la linearità e integra un termine alla volta.`, R`Ogni potenza aumenta di uno l'esponente e si divide per il nuovo esponente.`], risposta: prim(['x^3', '-2x^2', 'x']), soluzione: [R`$\int 3x^2 dx = 3\cdot\dfrac{x^3}{3} = x^3$.`, R`$\int -4x\,dx = -4\cdot\dfrac{x^2}{2} = -2x^2$, e $\int 1\,dx = x$.`, R`Risultato: $x^3 - 2x^2 + x + c$. Verifica derivando: $3x^2 - 4x + 1$. ✓`] },

    { id: 'es-02', difficolta: 1, testo: R`Calcola $\displaystyle\int \frac{2}{x^3}\,dx$.`, suggerimenti: [R`Riscrivi la frazione come potenza con esponente negativo.`, R`$\dfrac{2}{x^3} = 2x^{-3}$: ora è la regola della potenza con $\alpha = -3$.`], risposta: prim(['-1/x^2'], ['-x^-2', '-x^(-2)', '-(1/x^2)']), soluzione: [R`$\dfrac{2}{x^3} = 2x^{-3}$.`, R`$\int 2x^{-3}dx = 2\cdot\dfrac{x^{-2}}{-2} = -x^{-2} = -\dfrac{1}{x^2}$.`, R`Verifica: $D\!\left(-x^{-2}\right) = 2x^{-3} = \dfrac{2}{x^3}$. ✓`] },

    { id: 'es-03', difficolta: 1, testo: R`Calcola $\displaystyle\int_0^1 (x^2 + 1)\,dx$.`, suggerimenti: [R`Trova una primitiva e usa la formula fondamentale.`, R`Una primitiva è $\dfrac{x^3}{3} + x$.`], risposta: { tipo: 'numero', valore: 1.3333, tolleranza: 0.01 }, soluzione: [R`Primitiva: $G(x) = \dfrac{x^3}{3} + x$.`, R`$G(1) - G(0) = \left(\dfrac{1}{3} + 1\right) - 0 = \dfrac{4}{3}$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Calcola $\displaystyle\int_0^{\pi/2} \cos x\,dx$.`, suggerimenti: [R`La primitiva del coseno è il seno.`, R`Ricorda che $\sin\dfrac{\pi}{2} = 1$ e $\sin 0 = 0$.`], risposta: { tipo: 'numero', valore: 1, tolleranza: 0.01 }, soluzione: [R`$\big[\sin x\big]_0^{\pi/2} = \sin\dfrac{\pi}{2} - \sin 0 = 1 - 0 = 1$.`, R`Il risultato è positivo perché in $\left[0;\dfrac{\pi}{2}\right]$ il coseno è positivo: è l'area sotto la curva.`] },

    { id: 'es-05', difficolta: 2, testo: R`Calcola $\displaystyle\int \frac{x}{x^2+4}\,dx$.`, suggerimenti: [R`Guarda la derivata del denominatore.`, R`$D(x^2+4) = 2x$: al numeratore c'è $x$, manca solo il fattore $2$.`], risposta: prim(['1/2ln(x^2+4)'], ['(1/2)ln(x^2+4)', 'ln(x^2+4)/2', '1/2*ln(x^2+4)', '0.5ln(x^2+4)', '1/2ln|x^2+4|', 'ln|x^2+4|/2', 'ln(√(x^2+4))']), soluzione: [R`Si moltiplica e si divide per $2$: $\dfrac{1}{2}\displaystyle\int \dfrac{2x}{x^2+4}\,dx$.`, R`Ora è della forma $\dfrac{f'}{f}$, quindi si ottiene $\dfrac{1}{2}\ln(x^2+4) + c$.`, R`Il valore assoluto non serve: $x^2+4$ è sempre positivo.`] },

    { id: 'es-06', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^{\pi} x\sin x\,dx$.`, suggerimenti: [R`Prodotto fra un polinomio e una funzione goniometrica: integrazione per parti.`, R`Prendi $f(x) = x$ come fattore finito e $g'(x) = \sin x$ come differenziale, così $g(x) = -\cos x$.`], risposta: { tipo: 'numero', valore: 3.1416, tolleranza: 0.01 }, soluzione: [R`Per parti: $\int_0^\pi x\sin x\,dx = \big[-x\cos x\big]_0^{\pi} + \int_0^{\pi}\cos x\,dx$.`, R`Primo pezzo: $-\pi\cos\pi + 0 = -\pi(-1) = \pi$.`, R`Secondo pezzo: $\big[\sin x\big]_0^\pi = 0$.`, R`Totale: $\pi \approx 3{,}14$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Calcola l'area della regione compresa fra la parabola $y = x^2$ e la retta $y = x$.`, suggerimenti: [R`Prima trova le ascisse dei punti di intersezione.`, R`$x^2 = x$ dà $x = 0$ e $x = 1$; fra questi valori la retta sta sopra.`], risposta: { tipo: 'numero', valore: 0.16667, tolleranza: 0.005 }, soluzione: [R`Intersezioni: $x^2 = x \Rightarrow x(x-1) = 0$, cioè $x = 0$ e $x = 1$.`, R`In $[0;1]$ si ha $x \ge x^2$, quindi $A = \displaystyle\int_0^1 (x - x^2)\,dx$.`, R`$\left[\dfrac{x^2}{2} - \dfrac{x^3}{3}\right]_0^1 = \dfrac{1}{2} - \dfrac{1}{3} = \dfrac{1}{6} \approx 0{,}167$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Calcola l'**area** della regione compresa fra la curva $y = x^3$, l'asse $x$ e le rette $x = -1$ e $x = 1$.`, suggerimenti: [R`Attenzione: è chiesta l'area, non l'integrale. Studia il segno di $x^3$.`, R`In $[-1;0]$ la curva sta sotto l'asse: quel pezzo va preso in valore assoluto.`, R`Per simmetria i due pezzi hanno la stessa area.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`$\displaystyle\int_{-1}^{0} x^3 dx = \left[\dfrac{x^4}{4}\right]_{-1}^{0} = 0 - \dfrac{1}{4} = -\dfrac{1}{4}$: negativo, quindi quell'area vale $\dfrac{1}{4}$.`, R`$\displaystyle\int_{0}^{1} x^3 dx = \dfrac{1}{4}$.`, R`Area totale: $\dfrac{1}{4} + \dfrac{1}{4} = \dfrac{1}{2}$. L'integrale su $[-1;1]$ invece vale $0$, perché la funzione è dispari.`] },

    { id: 'es-09', difficolta: 2, testo: R`Calcola $\displaystyle\int \frac{2x+3}{x^2+x-2}\,dx$.`, suggerimenti: [R`Il grado del numeratore è minore: scomponi subito il denominatore.`, R`$x^2+x-2 = (x+2)(x-1)$: cerca $A$ e $B$ con $\dfrac{A}{x+2} + \dfrac{B}{x-1}$.`], soluzione: [R`$x^2+x-2 = (x+2)(x-1)$, perché le radici sono $-2$ e $1$.`, R`Si impone $A(x-1) + B(x+2) = 2x+3$.`, R`Con $x = 1$: $3B = 5$, cioè $B = \dfrac{5}{3}$. Con $x = -2$: $-3A = -1$, cioè $A = \dfrac{1}{3}$.`, R`Risultato: $\dfrac{1}{3}\ln \lvert x+2 \rvert + \dfrac{5}{3}\ln \lvert x-1 \rvert + c$.`] },

    { id: 'es-10', difficolta: 3, testo: R`La regione delimitata da $y = x^2$, dall'asse $x$ e dalla retta $x = 2$ ruota di un giro completo attorno all'asse $x$. Calcola il volume del solido ottenuto.`, suggerimenti: [R`Usa $V = \pi\int_a^b [f(x)]^2 dx$, con $a = 0$ e $b = 2$.`, R`Il quadrato di $x^2$ è $x^4$.`], risposta: { tipo: 'numero', valore: 20.106, tolleranza: 0.05 }, soluzione: [R`$V = \pi\displaystyle\int_0^2 (x^2)^2 dx = \pi\int_0^2 x^4 dx$.`, R`$\pi\left[\dfrac{x^5}{5}\right]_0^2 = \pi\cdot\dfrac{32}{5} = \dfrac{32\pi}{5}$.`, R`Numericamente $\dfrac{32\pi}{5} \approx 20{,}11$. Controllo: il solido è contenuto nel cilindro di raggio $4$ e altezza $2$, di volume $32\pi$: il risultato è minore, come deve essere.`] },

    { id: 'es-11', difficolta: 3, testo: R`Stabilisci se $\displaystyle\int_1^{+\infty} \frac{dx}{x^3}$ converge e, in caso affermativo, calcolane il valore.`, suggerimenti: [R`Sostituisci $+\infty$ con un estremo $b$ finito, integra, e solo alla fine fai il limite.`, R`Una primitiva di $x^{-3}$ è $-\dfrac{1}{2x^2}$.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`$\displaystyle\int_1^{b} x^{-3} dx = \left[-\dfrac{1}{2x^2}\right]_1^{b} = -\dfrac{1}{2b^2} + \dfrac{1}{2}$.`, R`$\lim_{b \to +\infty}\left(\dfrac{1}{2} - \dfrac{1}{2b^2}\right) = \dfrac{1}{2}$: il limite è finito, quindi l'integrale **converge**.`, R`Valore: $\dfrac{1}{2}$. Con $\dfrac{1}{x}$ al posto di $\dfrac{1}{x^3}$ l'integrale divergerebbe.`] },

    { id: 'es-12', difficolta: 3, testo: R`Sia $F(x) = \displaystyle\int_0^x (t^2 - 4t)\,dt$. Determina l'ascissa del punto di minimo di $F$ nell'intervallo $[0; 5]$.`, suggerimenti: [R`Non serve calcolare $F$: serve la sua derivata.`, R`Per il teorema fondamentale $F'(x) = x^2 - 4x$.`, R`Studia il segno di $x(x-4)$ in $[0;5]$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.01 }, soluzione: [R`Per il teorema fondamentale del calcolo integrale $F'(x) = x^2 - 4x = x(x-4)$.`, R`In $[0;5]$: $F' < 0$ per $0 < x < 4$ (la funzione integrale scende), $F' > 0$ per $x > 4$ (risale).`, R`Il minimo è in $x = 4$. Vale $F(4) = \left[\dfrac{t^3}{3} - 2t^2\right]_0^4 = \dfrac{64}{3} - 32 = -\dfrac{32}{3}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Se $F$ è una primitiva di $f$ in un intervallo, tutte le primitive di $f$ in quell'intervallo sono…`, opzioni: [R`$F(x) + c$, con $c$ costante reale`, R`$c \cdot F(x)$, con $c$ costante reale`, R`solo $F(x)$`, R`$F(x) + kx$, con $k$ costante reale`], corretta: 0, spiegazione: R`Aggiungere una costante non cambia la derivata, e per il teorema di Lagrange non c'è altro modo di ottenere la stessa derivata in un intervallo. Moltiplicare per $c$ o aggiungere $kx$ cambierebbe la derivata.` },
    { id: 'q-02', domanda: R`L'integrale indefinito di una funzione è…`, opzioni: [R`un numero`, R`una famiglia di funzioni`, R`una sola funzione`, R`la derivata della funzione`], corretta: 1, spiegazione: R`$\int f\,dx = F(x) + c$ rappresenta tutte le primitive. Un numero è invece l'integrale **definito**; la derivata è l'operazione inversa.` },
    { id: 'q-03', domanda: R`La formula $\int x^\alpha dx = \dfrac{x^{\alpha+1}}{\alpha+1} + c$ vale…`, opzioni: [R`per ogni $\alpha$ reale`, R`solo per $\alpha$ intero positivo`, R`per ogni $\alpha \ne -1$`, R`solo per $\alpha > 0$`], corretta: 2, spiegazione: R`Con $\alpha = -1$ il denominatore $\alpha+1$ sarebbe nullo: quel caso dà $\ln \lvert x \rvert + c$. Per tutti gli altri esponenti, anche negativi o frazionari, la formula funziona.` },
    { id: 'q-04', domanda: R`Quale delle seguenti uguaglianze è **vera** per ogni coppia di funzioni integrabili?`, opzioni: [R`$\int f\,g\,dx = \int f\,dx \cdot \int g\,dx$`, R`$\int \dfrac{f}{g}\,dx = \dfrac{\int f\,dx}{\int g\,dx}$`, R`$\int f^2 dx = \left(\int f\,dx\right)^2$`, R`$\int (f + g)\,dx = \int f\,dx + \int g\,dx$`], corretta: 3, spiegazione: R`L'integrale è **lineare**: rispetta somme e prodotti per costanti. Non esiste invece alcuna regola per il prodotto, il quoziente o la potenza di due funzioni.` },
    { id: 'q-05', domanda: R`Nella sostituzione $t = g(x)$, che cosa va sostituito oltre alla funzione integranda?`, opzioni: [R`niente altro`, R`il differenziale $dx$, tramite $dt = g'(x)\,dx$`, R`soltanto il segno dell'integrale`, R`la costante di integrazione`], corretta: 1, spiegazione: R`Se resta un $dx$ nell'integrale scritto in $t$, il calcolo è privo di senso. Dimenticare di trasformare $dx$ è l'errore più comune del metodo.` },
    { id: 'q-06', domanda: R`In un integrale definito risolto per sostituzione, se si cambiano anche gli estremi…`, opzioni: [R`bisogna comunque tornare alla variabile $x$ alla fine`, R`non occorre tornare alla variabile $x$`, R`il risultato cambia segno`, R`l'integrale diventa indefinito`], corretta: 1, spiegazione: R`I nuovi estremi $g(a)$ e $g(b)$ si riferiscono a $t$: si calcola direttamente in $t$. Tornare a $x$ tenendo i nuovi estremi sarebbe un errore grave.` },
    { id: 'q-07', domanda: R`Per calcolare $\int \ln x\,dx$ per parti, la scelta corretta è…`, opzioni: [R`$f(x) = \ln x$ e $g'(x) = 1$`, R`$f(x) = 1$ e $g'(x) = \ln x$`, R`$f(x) = x$ e $g'(x) = \ln x$`, R`per parti non è applicabile, manca il prodotto`], corretta: 0, spiegazione: R`Si scrive $\ln x = \ln x \cdot 1$: il logaritmo si deriva (diventa $\frac{1}{x}$) e $1$ si integra (diventa $x$). Le altre scelte richiederebbero di saper già integrare $\ln x$, cioè il problema di partenza.` },
    { id: 'q-08', domanda: R`Integrando $\dfrac{N(x)}{D(x)}$ con $N$ di grado $3$ e $D$ di grado $2$, la prima cosa da fare è…`, opzioni: [R`scomporre il denominatore in fattori`, R`eseguire la divisione fra i polinomi`, R`completare il quadrato al denominatore`, R`derivare il numeratore`], corretta: 1, spiegazione: R`Con grado del numeratore maggiore o uguale a quello del denominatore si divide, ottenendo un polinomio più un resto di grado minore. Solo su quel resto si applicano i fratti semplici o il completamento del quadrato.` },
    { id: 'q-09', domanda: R`Se il denominatore è di secondo grado con $\Delta < 0$, quale funzione compare tipicamente nel risultato?`, opzioni: [R`l'arcotangente`, R`l'arcoseno`, R`una radice quadrata`, R`due logaritmi di fattori di primo grado`], corretta: 0, spiegazione: R`Con $\Delta < 0$ il trinomio è irriducibile: si completa il quadrato e si ricade su $\int \frac{du}{u^2+k^2} = \frac{1}{k}\arctan\frac{u}{k}$. I due logaritmi compaiono invece quando $\Delta > 0$.` },
    { id: 'q-10', domanda: R`L'integrale definito $\int_a^b f(x)\,dx$ è…`, opzioni: [R`una famiglia di funzioni`, R`una funzione della variabile $x$`, R`un numero`, R`sempre positivo`], corretta: 2, spiegazione: R`È il limite delle somme dei rettangoli: un numero, che non porta la costante $c$ e in cui la $x$ non compare (è variabile muta). Può essere negativo o nullo se $f$ assume valori negativi.` },
    { id: 'q-11', domanda: R`Se $f(x) < 0$ in tutto $[a;b]$, allora $\int_a^b f(x)\,dx$…`, opzioni: [R`è positivo`, R`è nullo`, R`è negativo, e il suo opposto è l'area della regione`, R`non esiste`], corretta: 2, spiegazione: R`I contributi dei rettangoli sotto l'asse contano negativamente. L'area, che è per definizione positiva, si ottiene cambiando segno al risultato.` },
    { id: 'q-12', domanda: R`Che cosa afferma il teorema fondamentale del calcolo integrale?`, opzioni: [R`che la funzione integrale $F(x) = \int_a^x f(t)\,dt$ ha derivata $f(x)$`, R`che la funzione integrale è costante`, R`che la funzione integrale coincide con $f$`, R`che ogni funzione ammette primitive`], corretta: 0, spiegazione: R`Con $f$ continua, $F'(x) = f(x)$: derivata e integrale sono operazioni inverse. Da qui segue che ogni funzione **continua** ha primitive: dire che **ogni** funzione ammette primitive dimentica proprio l'ipotesi di continuità.` },
    { id: 'q-13', domanda: R`Nella formula $\int_a^b f(x)\,dx = G(b) - G(a)$, la funzione $G$ è…`, opzioni: [R`la derivata di $f$`, R`una primitiva qualunque di $f$`, R`l'unica primitiva di $f$ che si annulla in $a$`, R`la funzione integranda stessa`], corretta: 1, spiegazione: R`Qualunque primitiva va bene: se se ne usa un'altra, differisce per una costante che si semplifica nella differenza $G(b) - G(a)$.` },
    { id: 'q-14', domanda: R`L'area della regione compresa fra $y = f(x)$ (sopra) e $y = g(x)$ (sotto) per $a \le x \le b$ vale…`, opzioni: [R`$\int_a^b [f(x) - g(x)]\,dx$`, R`$\int_a^b [g(x) - f(x)]\,dx$`, R`$\int_a^b f(x)\,dx \cdot \int_a^b g(x)\,dx$`, R`$\left\lvert \int_a^b f(x)\,dx \right\rvert - \left\lvert \int_a^b g(x)\,dx \right\rvert$`], corretta: 0, spiegazione: R`Si integra la differenza fra la curva superiore e quella inferiore. La formula vale anche se le curve stanno sotto l'asse $x$: conta solo quale sta sopra l'altra.` },
    { id: 'q-15', domanda: R`Il valor medio di una funzione continua $f$ in $[a;b]$ è…`, opzioni: [R`$\dfrac{f(a)+f(b)}{2}$`, R`$\dfrac{1}{b-a}\int_a^b f(x)\,dx$`, R`$\int_a^b f(x)\,dx$`, R`il massimo di $f$ in $[a;b]$`], corretta: 1, spiegazione: R`È l'altezza del rettangolo di base $b-a$ che ha la stessa area della regione sotto la curva. La media fra i valori agli estremi non tiene conto di ciò che succede in mezzo.` },
    { id: 'q-16', domanda: R`Il volume del solido ottenuto ruotando attorno all'asse $x$ la regione sotto $y = f(x)$ fra $a$ e $b$ è…`, opzioni: [R`$\pi\int_a^b f(x)\,dx$`, R`$2\pi\int_a^b f(x)\,dx$`, R`$\pi\int_a^b [f(x)]^2\,dx$`, R`$\pi^2\int_a^b f(x)\,dx$`], corretta: 2, spiegazione: R`Ogni sezione perpendicolare all'asse è un cerchio di raggio $f(x)$, quindi di area $\pi[f(x)]^2$; sommando i dischi si ottiene la formula. Senza il quadrato non si otterrebbe nemmeno un'area.` },
    { id: 'q-17', domanda: R`Che cosa si può dire di $\displaystyle\int_1^{+\infty}\frac{dx}{x}$?`, opzioni: [R`converge a $1$`, R`converge a $0$`, R`diverge`, R`non ha senso, perché $+\infty$ non è un numero`], corretta: 2, spiegazione: R`$\int_1^b \frac{dx}{x} = \ln b$, e $\ln b \to +\infty$: l'integrale diverge. Ha senso eccome, purché lo si definisca come limite; $\int_1^{+\infty}\frac{dx}{x^2}$, invece, converge a $1$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Ogni integrale indefinito si controlla da solo: deriva il risultato. Se non riottieni la funzione di partenza, c'è un errore.` },
    { tipo: 'errore', testo: R`Il $+c$ non è un vezzo: senza, hai scritto *una* primitiva, non l'integrale indefinito. Negli integrali definiti, invece, non va mai messo.` },
    { tipo: 'trucco', testo: R`Prima di cercare un metodo, chiediti se dentro l'integranda c'è una funzione insieme alla sua derivata: se c'è, l'integrale è quasi immediato e non serve nessuna tecnica.` },
    { tipo: 'errore', testo: R`Si può moltiplicare e dividere solo per **costanti**. $\int e^{x^2}dx$ non diventa $\dfrac{1}{2x}e^{x^2}$: quella $x$ al denominatore non può uscire dall'integrale.` },
    { tipo: 'metodo', testo: R`Per parti: come fattore finito scegli ciò che *migliora derivando*. $\ln x$ e $\arctan x$ vanno quasi sempre lì, perché non sai integrarli direttamente.` },
    { tipo: 'errore', testo: R`Nella sostituzione con estremi, o cambi gli estremi e resti in $t$, o tieni gli estremi e torni a $x$. Mescolare le due strade porta a un risultato sbagliato.` },
    { tipo: 'trucco', testo: R`Se il testo chiede l'**area** e non l'integrale, studia prima il segno della funzione: dove sta sotto l'asse, il contributo va preso in valore assoluto.` },
    { tipo: 'metodo', testo: R`Funzione razionale fratta: prima confronta i gradi (eventualmente dividi), poi guarda il $\Delta$ del denominatore. Il $\Delta$ decide il metodo.` },
    { tipo: 'trucco', testo: R`Nei volumi di rotazione il quadrato fa sparire le radici: $\left(\sqrt{x}\right)^2 = x$. Controlla poi l'ordine di grandezza con il cilindro che contiene il solido.` },
    { tipo: 'errore', testo: R`Nell'integrale improprio $+\infty$ non si sostituisce come se fosse un numero: si integra fino a $b$ e **poi** si fa il limite.` }
  ],

  aneddoti: [
    { matematico: 'Archimede', anni: '287–212 a.C.', titolo: 'Il Metodo ritrovato sotto un libro di preghiere', testo: R`Archimede aveva scritto a Eratostene una lettera, il *Metodo sui teoremi meccanici*, in cui rivelava come *trovava* aree e volumi prima di dimostrarli: immaginava le figure composte da infinite fettine sottilissime e le "pesava" appendendole idealmente a una leva. Il testo era considerato perduto. Nel 1906, a Costantinopoli, il filologo danese Johan Ludvig Heiberg esaminò un libro di preghiere del XIII secolo e riconobbe, sotto la scrittura liturgica, tracce di una scrittura più antica: la pergamena era stata raschiata e riusata, e sotto c'era Archimede. Il codice, sparito di nuovo per decenni, è ricomparso a un'asta nel 1998 ed è stato letto con i raggi X.`, legame: R`Le "fettine" di Archimede sono l'idea da cui nasce l'integrale: sommare infiniti contributi piccolissimi per ottenere un'area o un volume.` },

    { matematico: 'Bonaventura Cavalieri', anni: '1598–1647', titolo: 'Gli indivisibili e le botti di vino di Keplero', testo: R`Nel 1615 Keplero pubblicò la *Nova stereometria doliorum vinariorum*, la «nuova stereometria delle botti da vino». L'occasione era prosaica: aveva comprato del vino a Linz e non si fidava del metodo con cui il mercante ne stimava il volume, infilando un'asta di traverso nella botte. Per calcolarlo davvero Keplero immaginò le botti tagliate in dischi sottilissimi. Vent'anni dopo Bonaventura Cavalieri, allievo di Galileo e professore a Bologna, trasformò l'intuizione in un metodo generale nella *Geometria degli indivisibili* (1635): se due solidi, tagliati da piani paralleli, danno sempre sezioni di area uguale, allora hanno lo stesso volume. È il principio di Cavalieri, che si studia ancora in geometria solida.`, legame: R`I dischi di Keplero e Cavalieri sono esattamente le sezioni con cui si calcola il volume di un solido di rotazione, $V = \pi\int f^2 dx$.` },

    { matematico: 'Evangelista Torricelli e Isaac Barrow', anni: '1608–1647 e 1630–1677', titolo: 'Il teorema che in Italia porta due nomi', testo: R`Torricelli, allievo di Castelli e successore di Galileo a Firenze, è ricordato per il barometro, ma passò molto tempo sulle aree e sui volumi. Nel 1643 descrisse il "solido iperbolico acutissimo", ottenuto ruotando un ramo di iperbole: infinitamente lungo, con superficie infinita e volume finito. Il risultato parve un paradosso e fece discutere mezza Europa. In quegli anni intuì anche il legame fra il problema delle tangenti e quello delle aree. In Inghilterra Isaac Barrow, primo titolare della cattedra lucasiana a Cambridge, ne dimostrò una versione geometrica nelle *Lectiones geometricae* del 1670; nel 1669 aveva lasciato la cattedra a un suo giovane allievo, Isaac Newton.`, legame: R`Il teorema fondamentale del calcolo integrale, che lega la derivata all'area accumulata, sui libri italiani si chiama teorema di Torricelli–Barrow.` },

    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'Il 29 ottobre 1675 nasce il simbolo dell\'integrale', testo: R`In un manoscritto datato 29 ottobre 1675, Leibniz (allora a Parigi, diplomatico più che matematico di professione) scrisse per la prima volta una $S$ allungata al posto della parola latina *omnia*, «tutte». Quella $S$ sta per *summa*, e da allora indica l'integrale. Nello stesso periodo introdusse il $d$ dei differenziali e la scrittura $dx$. Newton era arrivato al calcolo prima, con simboli diversi (le "flussioni"), e ne nacque una disputa sulla priorità che avvelenò i rapporti fra la matematica inglese e quella continentale per un secolo. Oggi si riconosce che i due ci arrivarono in modo indipendente. Sulla notazione, invece, non c'è partita: quella di Leibniz è così efficiente che sembra lavorare da sola, ed è la nostra.`, legame: R`La scrittura $\int f(x)\,dx$ racconta la definizione: si somma («$\int$») il prodotto di $f(x)$ per una larghezza piccolissima («$dx$»).` },

    { matematico: 'Bernhard Riemann', anni: '1826–1866', titolo: 'La definizione nascosta in una tesi sulle serie', testo: R`Per quasi due secoli si integrò senza sapere con precisione che cosa fosse un integrale: bastava che i conti funzionassero. La definizione rigorosa arriva nel 1854, quando Riemann presenta a Gottinga il lavoro scritto per l'abilitazione all'insegnamento, dedicato alla rappresentazione delle funzioni mediante serie trigonometriche. Lì dentro, quasi come strumento tecnico di servizio, compaiono le somme sui rettangoli e la condizione perché il limite esista: è l'integrale che oggi porta il suo nome. Nella stessa abilitazione Riemann tenne anche la celebre lezione sui fondamenti della geometria, argomento scelto da Gauss fra i tre proposti. Morì di tubercolosi a trentanove anni in Italia, a Selasca sul Lago Maggiore.`, legame: R`Le somme inferiori e superiori con cui abbiamo definito l'integrale definito sono le somme di Riemann.` }
  ]
});
})();
