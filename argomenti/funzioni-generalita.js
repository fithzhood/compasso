(function () {
const R = String.raw;
/* allenamento. Domini: tutti con la stessa casella e gli stessi simboli, così la casella non dice
   che forma ha la risposta. dis('>', 1) accetta x>1, 1<x, ]1;+inf[, (1;+∞), x∈(1;+∞) …;
   tranne(2) accetta x≠2, R-{2}, x<2 o x>2, ]-∞;2[∪]2;+∞[ …; tranne2(-2, 2) per due valori esclusi.
   (≥, ≤, ≠ diventano >=, <=, != da soli nel confronto.) Pari e dispari: PARI, DISPARI, NESSUNA.
   Espressioni (composta e inversa): espr(['(x+4)/2', …], prefissi) aggiunge le varianti con * e
   con «y=» o «f^-1(x)=» davanti; le forme sono state valutate in punti a caso contro la funzione giusta. */
const SEGNA_D = 'es. x > 7 oppure x ≠ 7';
const SIMB_D = ['<', '>', '≤', '≥', '≠', '∞', '(', ')', ';', '−'];
const dominio = f => ({ tipo: 'testo', accettate: f.concat(f.map(a => 'x∈' + a), f.map(a => 'D=' + a)), segnaposto: SEGNA_D, simboli: SIMB_D });
const INF = ['inf', '∞', 'infinito'], SEP = [';', ','];
const disF = (op, n) => {
  const rov = { '>': '<', '<': '>', '>=': '<=', '<=': '>=' }[op], f = ['x' + op + n, n + rov + 'x'];
  INF.forEach(i => SEP.forEach(s => ['+', ''].forEach(p => {
    if (op === '>') f.push(']' + n + s + p + i + '[', '(' + n + s + p + i + ')');
    if (op === '>=') f.push('[' + n + s + p + i + '[', '[' + n + s + p + i + ')');
    if (op === '<') f.push(']-' + i + s + n + '[', '(-' + i + s + n + ')');
    if (op === '<=') f.push(']-' + i + s + n + ']', '(-' + i + s + n + ']');
  })));
  return f;
};
const dis = (op, n) => dominio(disF(op, n));
const menoF = ks => { const f = []; ['R', 'ℝ'].forEach(r => ['-', '\\', '∖'].forEach(m => SEP.forEach(s => f.push(r + m + '{' + ks.join(s) + '}', r + m + '{' + ks.slice().reverse().join(s) + '}')))); return f; };
const tranne = k => {
  const f = ['x≠' + k, k + '≠x', 'x<>' + k, 'x diverso da ' + k].concat(menoF([k]));
  const sx = ['x<' + k, k + '>x'], dx = ['x>' + k, k + '<x'];
  ['o', 'oppure', 'v', '∨', 'u', '∪', ',', ';'].forEach(o => sx.forEach(p => dx.forEach(q => f.push(p + o + q, q + o + p))));
  INF.forEach(i => SEP.forEach(s => ['u', '∪'].forEach(o => [[']', '['], ['(', ')']].forEach(([a, c]) => ['+', ''].forEach(p => f.push(a + '-' + i + s + k + c + o + a + k + s + p + i + c))))));
  return dominio(f);
};
const tranne2 = (a, b) => {
  const f = ['x≠±' + b, 'x≠' + a + ';' + b, 'x≠' + a + ',' + b, 'x≠' + b + ';' + a, 'x≠' + b + ',' + a].concat(menoF([a, b]));
  const u = ['x≠' + a, a + '≠x'], v = ['x≠' + b, b + '≠x'];
  ['e', 'ed', '∧', ',', ';'].forEach(o => u.forEach(p => v.forEach(q => f.push(p + o + q, q + o + p))));
  INF.forEach(i => SEP.forEach(s => ['u', '∪'].forEach(o => [[']', '['], ['(', ')']].forEach(([p, c]) => f.push(p + '-' + i + s + a + c + o + p + a + s + b + c + o + p + b + s + '+' + i + c, p + '-' + i + s + a + c + o + p + a + s + b + c + o + p + b + s + i + c)))));
  return dominio(f);
};
/* fuori(a, b): x ≤ a oppure x ≥ b (due semirette chiuse) */
const fuori = (a, b) => {
  const f = ['|x|>=' + b], sx = ['x<=' + a, a + '>=x'], dx = ['x>=' + b, b + '<=x'];
  ['o', 'oppure', 'v', '∨', 'u', '∪', ',', ';'].forEach(o => sx.forEach(p => dx.forEach(q => f.push(p + o + q, q + o + p))));
  INF.forEach(i => SEP.forEach(s => ['u', '∪'].forEach(o => [[']', '['], ['(', ')']].forEach(([A, C]) => ['+', ''].forEach(p => f.push(A + '-' + i + s + a + ']' + o + '[' + b + s + p + i + C))))));
  return dominio(f);
};
const SEGNA_PD = 'pari, dispari o nessuna';
const pd = f => ({ tipo: 'testo', accettate: f, segnaposto: SEGNA_PD, simboli: [] });
const PARI = pd(['pari', 'è pari', 'e pari', 'f è pari', 'la funzione è pari', 'funzione pari']);
const DISPARI = pd(['dispari', 'è dispari', 'e dispari', 'f è dispari', 'la funzione è dispari', 'funzione dispari']);
const NESSUNA = pd(['nessuna', 'nessuna delle due', 'né pari né dispari', 'ne pari ne dispari', 'nè pari nè dispari', 'non è né pari né dispari', 'non e ne pari ne dispari', 'nessuno', 'nessuna delle 2']);
const espr = (forme, prefissi) => {
  const f = [];
  forme.forEach(a => { const conStella = a.replace(/(\d)(x|\()/g, '$1*$2').replace(/\)(x|\()/g, ')*$1'); [a, conStella].forEach(b => ['', 'y='].concat(prefissi).forEach(p => { if (!f.includes(p + b)) f.push(p + b); })); });
  return { tipo: 'testo', accettate: f, segnaposto: 'es. 3x+1 oppure (x-2)/5', simboli: ['/', '(', ')', '^', '−'] };
};
const INV = ['f^-1(x)=', 'f^(-1)(x)=', 'f-1(x)=', 'f⁻¹(x)='];
COMPASSO.registra({
  id: 'funzioni-generalita',
  titolo: 'Le funzioni',

  introduzione: R`Un taxi chiede $3$ euro alla partenza più $1{,}20$ euro al chilometro. Una corsa di $8$ km costa $3 + 1{,}20 \cdot 8 = 12{,}60$ euro. Per ogni distanza c'è un solo prezzo: questa regola è una **funzione**, $f(x) = 3 + 1{,}2\,x$.

Quasi tutta la matematica che viene dopo parla di funzioni. Qui impari le parole che userai sempre: dominio, immagine, iniettiva, crescente, composta, inversa.

Ti serve saper risolvere equazioni e disequazioni, perché il dominio si trova così.`,

  inBreve: [
    R`Una funzione associa a **ogni** $x$ del dominio **un solo** valore $f(x)$. Sul grafico, ogni retta verticale lo taglia al massimo una volta.`,
    R`Per il dominio scrivi una condizione per ogni pezzo delicato: denominatore diverso da zero, radicando di indice pari non negativo, argomento del logaritmo positivo. Il dominio sono i valori che le rispettano **tutte insieme**.`,
    R`L'immagine sono i valori che escono davvero. Il dominio si legge sull'asse $x$, l'immagine sull'asse $y$.`,
    R`Iniettiva vuol dire che $x$ diversi danno sempre $y$ diversi. Solo una funzione biunivoca ha l'inversa, e il grafico dell'inversa è il simmetrico rispetto alla retta $y = x$.`,
    R`Nella composta $(g \circ f)(x) = g(f(x))$ si calcola prima $f$ e poi $g$. Scambiando l'ordine, di solito ottieni un'altra funzione.`,
    R`$y = f(x - h) + k$ è il grafico di $f$ spostato di $h$ verso destra e di $k$ verso l'alto. Attento al meno davanti ad $h$.`
  ],

  sezioni: [
    { id: 'definizione', titolo: 'Che cos\'è una funzione', testo: R`«A ogni persona associa il suo codice fiscale» è una funzione, perché ciascuno ne ha uno solo. «A ogni persona associa i suoi fratelli» non lo è: c'è chi non ne ha e chi ne ha tre.

>* Una **funzione** $f: A \to B$ associa a **ogni** elemento $x$ di $A$ **uno e un solo** elemento $f(x)$ di $B$.

$f(x)$ si legge «$f$ di $x$»: è il valore che la funzione associa a $x$.

Intorno a una funzione ci sono tre insiemi. Nella tabella l'esempio è $f(x) = x^2$, da $\mathbb{R}$ a $\mathbb{R}$:

| nome | che cos'è | per $x^2$ |
|---|---|---|
| **dominio** | le $x$ che puoi mettere dentro | $\mathbb{R}$ |
| **codominio** | dove cerchi i risultati | $\mathbb{R}$ |
| **immagine** | i risultati che escono davvero | $[0, +\infty)$ |

L'immagine può essere più piccola del codominio. Nel grafico c'è $f(x) = x^2 - 2x$: prova a far uscire un risultato qualunque.

[[grafico:immagine]]

Sotto $-1$ non si scende, perché $x^2 - 2x = (x-1)^2 - 1$ e un quadrato non è mai negativo. Quindi l'immagine è $[-1, +\infty)$, anche se il codominio è $\mathbb{R}$.

>! Il codominio lo scegli tu quando scrivi $f: A \to B$. L'immagine invece la decide la regola: sono i valori raggiunti davvero.

?? Qual è l'immagine di $f(x) = x^2 + 1$, da $\mathbb{R}$ a $\mathbb{R}$?
[x] $[1, +\infty)$
[ ] $\mathbb{R}$
[ ] $[0, +\infty)$
=> $x^2$ vale almeno $0$, quindi $x^2 + 1$ vale almeno $1$ e raggiunge ogni numero da $1$ in su. $\mathbb{R}$ è il codominio, non l'immagine. $[0, +\infty)$ è l'immagine di $x^2$: manca il $+1$.` },

    { id: 'grafico-funzione', titolo: 'Funzioni numeriche e il loro grafico', testo: R`D'ora in poi dominio e codominio sono fatti di numeri reali: sono **funzioni numeriche**. Il loro **grafico** è l'insieme dei punti $(x;\ f(x))$.

Come capisci da un disegno se è il grafico di una funzione? Fissa $x = 2$. La funzione dà un solo valore $f(2)$, quindi sulla retta $x = 2$ il grafico ha al massimo un punto.

>* **Test della retta verticale:** una curva è il grafico di una funzione se ogni retta verticale la taglia **al massimo in un punto**.

La circonferenza $x^2 + y^2 = 1$ non passa il test. La retta $x = 0{,}5$ la taglia in due punti, $(0{,}5;\ 0{,}87)$ e $(0{,}5;\ -0{,}87)$. La sola metà superiore, $y = \sqrt{1 - x^2}$, invece è una funzione.

>! Non ogni equazione in $x$ e $y$ è una funzione. Controlla che a ogni $x$ corrisponda *un solo* $y$.

?? Quale di queste curve è il grafico di una funzione?
[x] la parabola $y = x^2 - 4$
[ ] la parabola $x = y^2$
[ ] la retta $x = 3$
[ ] la circonferenza $x^2 + y^2 = 4$
=> In $y = x^2 - 4$ ogni $x$ dà un solo $y$. La parabola $x = y^2$ è coricata: per $x = 4$ dà $y = 2$ e $y = -2$. La retta $x = 3$ è proprio verticale. La circonferenza ha due punti su quasi ogni verticale.` },

    { id: 'classificazione', titolo: 'Come si classificano le funzioni', testo: R`Il nome di una funzione dice dove compare la $x$, e ogni tipo ha le sue condizioni sul dominio. Le funzioni **algebriche** usano le quattro operazioni, le potenze e le radici. Le altre sono **trascendenti**.

| tipo | come compare la $x$ | esempio |
|---|---|---|
| razionale intera (polinomio) | solo somme, prodotti, potenze | $y = x^3 - 2x + 1$ |
| razionale fratta | anche al denominatore | $y = \dfrac{x+1}{x-3}$ |
| irrazionale | sotto una radice | $y = \sqrt{2x - 1}$ |
| trascendente | in un esponente, in un logaritmo, in un seno… | $y = 2^x$, $y = \log x$, $y = \sin x$ |

>* **Razionale** vuol dire che la $x$ non sta sotto una radice. È **intera** se la $x$ non sta al denominatore, **fratta** se ci sta.

>! «Razionale» non riguarda i coefficienti. $y = \sqrt{2}\,x + 1$ è razionale intera, perché sotto la radice c'è il $2$, non la $x$.

?? Di che tipo è la funzione $y = \dfrac{\sqrt{3}\,x^2}{5}$?
[x] razionale intera
[ ] irrazionale
[ ] razionale fratta
=> Sotto la radice c'è solo il $3$, e al denominatore c'è solo il $5$. Quindi è il polinomio $\frac{\sqrt 3}{5}x^2$.` },

    { id: 'dominio-naturale', titolo: 'Il dominio naturale', testo: R`Quanto vale $\dfrac{1}{x-3}$ per $x = 3$? Niente, perché non si divide per zero. Il **dominio naturale**, o **campo di esistenza** (c.e.), sono i numeri per cui l'espressione si può calcolare. Per trovarlo guarda i pezzi che non accettano qualunque numero:

| se l'espressione contiene… | serve che… |
|---|---|
| un denominatore $D(x)$ | $D(x) \ne 0$ |
| una radice di indice pari, $\sqrt{A(x)}$, $\sqrt[4]{A(x)}$, … | $A(x) \ge 0$ |
| una radice di indice dispari, $\sqrt[3]{A(x)}$, … | nessuna condizione |
| un logaritmo $\log A(x)$ | $A(x) > 0$ |

Se i pezzi delicati sono più di uno, le condizioni devono valere **tutte insieme**: mettile a sistema.

~ f(x) = \dfrac{\sqrt{x+1}}{x-4} :: due pezzi delicati: una radice quadrata e un denominatore
~ \evid{x+1 \ge 0} :: la radice quadrata vuole il radicando non negativo
~ \evid{x-4 \ne 0} :: il denominatore non deve annullarsi
~ x \ge -1 \ \text{ e } \ x \ne 4 :: risolvo le due condizioni e le tengo insieme
~ D = \evidb{[-1, 4) \cup (4, +\infty)} :: da $-1$ compreso in su, saltando il $4$

>* Il dominio è fatto dai valori che rispettano **tutte** le condizioni: è l'intersezione, mai l'unione.

>! Con più pezzi delicati è facile dimenticarne uno. Scrivi una riga per ogni condizione.

?? Qual è il dominio di $f(x) = \dfrac{1}{\sqrt{x-2}}$?
[x] $x > 2$
[ ] $x \ge 2$
[ ] $x \ne 2$
=> La radice vuole $x - 2 \ge 0$. Però sta al denominatore, che non può valere zero: quindi $x - 2 > 0$. Con $x = 2$ otterresti $\frac{1}{0}$.` },

    { id: 'zeri-e-segno', titolo: 'Zeri e segno di una funzione', testo: R`Gli **zeri** sono le ascisse dei punti in cui il grafico incontra l'asse $x$.

>* Uno **zero** di $f$ è un $x_0$ **del dominio** con $f(x_0) = 0$: si trova risolvendo $f(x) = 0$. Il **segno** di $f$ dice dove $f(x) > 0$, cioè il grafico sta sopra l'asse $x$, e dove $f(x) < 0$.

Per il segno risolvi $f(x) > 0$. Con un prodotto o un quoziente usa la **tabella dei segni**, come nelle disequazioni fratte. Per $f(x) = \dfrac{x-1}{x+2}$ il numeratore è positivo per $x > 1$, il denominatore per $x > -2$.

| | $x < -2$ | $-2 < x < 1$ | $x > 1$ |
|---|---|---|---|
| $x - 1$ | $-$ | $-$ | $+$ |
| $x + 2$ | $-$ | $+$ | $+$ |
| $f(x)$ | $+$ | $-$ | $+$ |

Quindi $f$ è positiva per $x < -2$ e per $x > 1$, negativa fra $-2$ e $1$. Lo zero è $x = 1$, e in $x = -2$ la funzione non esiste.

>! «Positiva» non vuol dire «crescente». Il segno dice se il grafico sta sopra o sotto l'asse $x$, la crescenza se sale o scende.

?? Quali sono gli zeri di $f(x) = \dfrac{x^2 - 4}{x + 2}$?
[x] solo $x = 2$
[ ] $x = 2$ e $x = -2$
[ ] solo $x = -2$
=> Il numeratore si annulla in $2$ e in $-2$. Ma $x = -2$ annulla anche il denominatore: lì la funzione non esiste. Uno zero deve stare nel dominio, quindi resta solo $x = 2$.` },

    { id: 'iniettive-suriettive', titolo: 'Funzioni iniettive, suriettive, biunivoche', testo: R`Con $f(x) = x^2$ hai $f(2) = 4$ e anche $f(-2) = 4$. Se sai solo che è uscito $4$, non sai da dove sei partito.

>* $f$ è **iniettiva** se $x$ diversi danno sempre valori diversi: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$. Sul grafico, **ogni retta orizzontale lo taglia al massimo una volta**.

Trascina la retta orizzontale e conta i punti in cui taglia la parabola. Poi sposta con il cursore l'inizio del dominio e riprova.

[[grafico:iniettiva]]

Con il dominio da $0$ in su, ogni retta orizzontale taglia la curva una volta sola: $x^2$ ristretta a $[0, +\infty)$ è iniettiva.

Con i calcoli, parti da due ingressi con lo stesso risultato e guarda se sono per forza uguali. Per $f(x) = 2x + 3$:

~ f(x_1) = f(x_2) :: supponiamo che due ingressi diano lo stesso risultato
~ 2x_1 + 3 = 2x_2 + 3 :: scrivo la regola di $f$ per tutti e due
~ \evid{2x_1 = 2x_2} :: tolgo $3$ da entrambi i membri
~ \evidb{x_1 = x_2} :: divido per $2$: i due ingressi erano lo stesso numero, quindi $f$ è iniettiva

Con $x^2$ il conto si ferma a $x_1^2 = x_2^2$, che vale anche per $x_1 = -x_2$: non è iniettiva.

$f: A \to B$ è **suriettiva** se l'immagine è tutto il codominio $B$. Per esempio $x^2$ da $\mathbb{R}$ a $\mathbb{R}$ non è suriettiva, perché i negativi non escono mai. Da $\mathbb{R}$ a $[0, +\infty)$ invece sì.

Una funzione iniettiva **e** suriettiva è **biunivoca**: ogni elemento di $B$ viene da un solo elemento di $A$. Solo così si può invertire.

>! Una funzione pari non è iniettiva: per ogni $x \ne 0$, $x$ e $-x$ danno lo stesso risultato.

?? $f(x) = x^2$, con dominio $[0, +\infty)$ e codominio $\mathbb{R}$, è…
[x] iniettiva ma non suriettiva
[ ] biunivoca
[ ] suriettiva ma non iniettiva
[ ] né iniettiva né suriettiva
=> Con $x \ge 0$ ogni risultato viene da un solo $x$: è iniettiva. Però i negativi del codominio non escono mai, quindi non è suriettiva e nemmeno biunivoca. Con codominio $[0, +\infty)$ sarebbe biunivoca.` },

    { id: 'crescenza-monotonia', titolo: 'Funzioni crescenti, decrescenti, monotone', testo: R`Letto da sinistra a destra, un grafico ha tratti in cui sale e tratti in cui scende.

>* $f$ è **crescente** in un intervallo $I$ se, **per ogni** coppia $x_1 < x_2$ di $I$, vale $f(x_1) < f(x_2)$. È **decrescente** se $x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$. È **monotona** in $I$ se è crescente in tutto $I$ oppure decrescente in tutto $I$.

$f(x) = x^3$ è crescente su tutto $\mathbb{R}$. $f(x) = x^2$ invece non è monotona su $\mathbb{R}$: scende su $(-\infty, 0]$ e sale su $[0, +\infty)$.

La definizione vale per **ogni** coppia di punti, non per una sola.

?? Sai che $f(1) = 2$ e $f(3) = 5$. Puoi concludere che $f$ è crescente in $[1, 3]$?
=> No. Fra $1$ e $3$ la funzione potrebbe scendere e poi risalire, per esempio passando per $f(2) = 0$. Due valori non dicono cosa fa la funzione in mezzo.

Una funzione crescente su tutto il dominio è anche iniettiva. Il contrario non vale: $f(x) = \dfrac{1}{x}$ è iniettiva ma non è monotona.

>! Un grafico disegnato in una finestra stretta può ingannare: appena fuori, la funzione può cambiare andamento.` },

    { id: 'parita-periodicita', titolo: 'Funzioni pari e dispari, cenni sulle periodiche', testo: R`Che cosa succede se al posto di $x$ metti $-x$? Con $x^2$ il risultato non cambia: $(-3)^2 = 3^2 = 9$. Con $x^3$ cambia solo il segno: $(-2)^3 = -8$ e $2^3 = 8$.

>* Il dominio deve essere simmetrico rispetto a $0$. $f$ è **pari** se $f(-x) = f(x)$ per ogni $x$, e il grafico è simmetrico rispetto all'**asse $y$**. $f$ è **dispari** se $f(-x) = -f(x)$ per ogni $x$, e il grafico è simmetrico rispetto all'**origine**.

Trascina uno dei due punti pieni: il gemello in $-a$ si muove con lui.

[[grafico:parita]]

Sulla parabola il gemello sta alla stessa altezza. Sulla curva del cubo sta all'altezza opposta.

Con i calcoli, scrivi $f(-x)$ e confrontalo con $f(x)$ e con $-f(x)$. Per $f(x) = x^2 + x$:

~ f(-x) = (-x)^2 + (-x) :: metto $-x$ al posto di **ogni** $x$, con le parentesi
~ f(-x) = \evid{x^2 - x} :: il quadrato si mangia il segno, il termine di primo grado lo tiene
~ x^2 - x \ne x^2 + x :: non è uguale a $f(x)$: la funzione non è pari
~ x^2 - x \ne \evid{-x^2 - x} :: non è uguale nemmeno a $-f(x)$: non è dispari

>! «Non pari» non vuol dire «dispari». Quasi tutte le funzioni non sono né pari né dispari, come $x^2 + x$.

?? $f(x) = x^3 + 1$ è pari, dispari o nessuna delle due?
[x] nessuna delle due
[ ] dispari
[ ] pari
=> $f(-x) = -x^3 + 1$. Non è $f(x) = x^3 + 1$ e non è $-f(x) = -x^3 - 1$, perché il $+1$ non cambia segno. Chi risponde «dispari» guarda solo il cubo.

Una funzione è **periodica** di periodo $T > 0$ se $f(x + T) = f(x)$ per ogni $x$: il grafico si ripete ogni $T$. Succede con le funzioni goniometriche.` },

    { id: 'funzione-composta', titolo: 'La funzione composta', testo: R`Un negozio fa lo sconto di $10$ euro e poi aggiunge l'IVA, un altro fa il contrario: il prezzo finale è diverso. Fare due funzioni una dopo l'altra si chiama **comporle**, e l'ordine conta.

>* La **funzione composta** $g \circ f$ applica **prima $f$, poi $g$**: $$(g \circ f)(x) = g\big(f(x)\big).$$ Si legge «$g$ composto $f$», ma si esegue da destra a sinistra.

Con $f(x) = x - 1$ e $g(x) = \sqrt{x}$:

~ (g \circ f)(x) = g\big(f(x)\big) :: prima $f$, poi $g$ su quello che esce
~ = g(\evid{x - 1}) :: al posto di $f(x)$ scrivo la sua regola
~ = \sqrt{\evid{x - 1}} :: $g$ fa la radice di qualunque cosa riceva
~ x - 1 \ge 0 \ \Rightarrow \ \evidb{x \ge 1} :: la radice mette la sua condizione: è il dominio della composta

$f$ accetta ogni numero, ma $g$ accetta solo numeri non negativi: per questo la composta perde gli $x < 1$.

Nell'altro ordine: $(f \circ g)(x) = f(\sqrt{x}) = \sqrt{x} - 1$, definita per $x \ge 0$. È un'altra funzione.

?? Con $f(x) = x + 2$ e $g(x) = x^2$, quanto vale $(g \circ f)(1)$?
[x] $9$
[ ] $3$
[ ] $4$
=> Prima $f$: $f(1) = 3$. Poi $g$: $g(3) = 9$. Il $3$ esce con l'ordine sbagliato: è $f(g(1)) = f(1) = 3$.` },

    { id: 'funzione-inversa', titolo: 'La funzione inversa', testo: R`La funzione del taxi trasforma i chilometri nel prezzo. L'**inversa** fa il viaggio al contrario: dal prezzo ricava i chilometri. Per tornare indietro senza dubbi, $f$ deve essere biunivoca.

>* Se $f: A \to B$ è **biunivoca**, la **funzione inversa** $f^{-1}: B \to A$ disfa quello che fa $f$: $f^{-1}(f(x)) = x$. Per trovarla scambia $x$ e $y$ in $y = f(x)$ e ricava $y$. Il grafico di $f^{-1}$ è il simmetrico di quello di $f$ rispetto alla retta $y = x$.

Per $f(x) = 3x - 6$:

~ y = 3x - 6 :: parto dalla regola di $f$
~ \evid{x} = 3\evid{y} - 6 :: scambio $x$ e $y$: ora l'incognita da ricavare è $y$
~ x + 6 = 3y :: porto il $-6$ dall'altra parte
~ y = \evidb{\dfrac{x + 6}{3}} :: divido per $3$: questa è $f^{-1}(x)$

Controllo: $f\!\left(\dfrac{x+6}{3}\right) = 3 \cdot \dfrac{x+6}{3} - 6 = x$.

Trascina $P$ sulla parabola e guarda le coordinate di $Q$.

[[grafico:inversa]]

$Q$ ha le coordinate di $P$ scambiate: i due grafici sono simmetrici rispetto alla retta $y = x$. Qui $y = x^2$ è ristretta a $x \ge 0$, dove è iniettiva, e la sua inversa è $y = \sqrt{x}$.

>! $f^{-1}(x)$ **non** è $\dfrac{1}{f(x)}$: qui l'esponente $-1$ non vuol dire reciproco.

?? Qual è l'inversa di $f(x) = 2x$?
[x] $f^{-1}(x) = \dfrac{x}{2}$
[ ] $f^{-1}(x) = \dfrac{1}{2x}$
[ ] $f^{-1}(x) = -2x$
=> $f$ raddoppia, quindi l'inversa dimezza: $f^{-1}(6) = 3$. $\dfrac{1}{2x}$ è il reciproco di $f(x)$: con $x = 6$ darebbe $\frac{1}{12}$. $-2x$ è la funzione opposta.` },

    { id: 'traslazioni-dilatazioni', titolo: 'Traslazioni e dilatazioni del grafico', testo: R`I grafici di $f(x) + 3$, $f(x - 2)$, $-f(x)$ sono il grafico di $f$ spostato o ribaltato: si disegnano senza calcoli. Prova con la parabola $y = x^2$: trascina il vertice $V$ e muovi il cursore $a$.

[[grafico:traslazioni]]

Il vertice va dove lo porti, e l'equazione diventa $y = a(x - h)^2 + k$. Con $a > 1$ la parabola si allunga in verticale, con $0 < a < 1$ si schiaccia, con $a < 0$ si ribalta. Per ogni funzione valgono queste regole:

| scrivi | il grafico di $f$… |
|---|---|
| $f(x) + k$ | sale di $k$ (scende se $k < 0$) |
| $f(x - h)$ | va a **destra** di $h$ (a sinistra se $h < 0$) |
| $a \cdot f(x)$, $a > 0$ | si allunga in verticale se $a > 1$, si schiaccia se $a < 1$ |
| $-f(x)$ | si ribalta rispetto all'asse $x$ |
| $f(-x)$ | si ribalta rispetto all'asse $y$ |

>* $y = f(x - h) + k$ è il grafico di $f$ spostato di $h$ verso **destra** e di $k$ verso l'**alto**. Il meno davanti ad $h$ inganna: guarda dove si annulla la parentesi, $x - h = 0$, cioè $x = h$.

>! $y = f(x) - 2$ e $y = f(x - 2)$ sono diversi. Il primo grafico scende di $2$, il secondo va a destra di $2$.

?? Rispetto a $y = x^2$, il grafico di $y = (x + 3)^2$ è spostato…
[x] di $3$ verso sinistra
[ ] di $3$ verso destra
[ ] di $3$ verso l'alto
=> $(x + 3)^2 = (x - (-3))^2$, quindi $h = -3$ e il grafico va a sinistra. Controllo: la parentesi si annulla per $x = -3$, dove ora sta il vertice. Chi risponde «a destra» si è fidato del $+$.` },

    { id: 'valore-assoluto', titolo: 'Il valore assoluto di una funzione', testo: R`$|f(x)|$ e $f(|x|)$ hanno grafici molto diversi.

**$y = |f(x)|$ agisce sul risultato.** Dove $f(x) \ge 0$ non cambia niente. Dove $f(x) < 0$ il risultato cambia segno: il pezzo sotto l'asse $x$ viene ribaltato sopra. Trascina il vertice della parabola tratteggiata e guarda la curva piena.

[[grafico:valore-assoluto]]

**$y = f(|x|)$ agisce sull'ingresso.** Per $x \ge 0$ vale $|x| = x$, e il grafico è quello di $f$. Per $x < 0$ vale $f(|x|) = f(-x)$: a sinistra dell'asse $y$ vedi lo specchio della parte destra. Trascina di nuovo il vertice, anche a sinistra dell'asse $y$.

[[grafico:f-modulo]]

>* $|f(x)|$ ribalta sopra l'asse $x$ le parti negative. $f(|x|)$ tiene la parte con $x \ge 0$ e la copia allo specchio a sinistra: il suo grafico è sempre simmetrico rispetto all'asse $y$.

?? Per $f(x) = x - 2$, quanto valgono $|f(-1)|$ e $f(|-1|)$?
[x] $3$ e $-1$
[ ] $3$ e $3$
[ ] $-3$ e $-1$
=> $|f(-1)|$: prima la funzione, $f(-1) = -3$, poi il valore assoluto, $3$. $f(|-1|)$: prima il valore assoluto, $|-1| = 1$, poi la funzione, $f(1) = -1$. Quindi $f(|x|)$ può ancora essere negativa.` },

    { id: 'lettura-grafico', titolo: 'Leggere un grafico', testo: R`In una verifica, a volte di una funzione hai solo il disegno. Anche senza formula, dal grafico leggi quasi tutto.

| cosa | dove si guarda |
|---|---|
| **dominio** | le $x$ «coperte» dal grafico: lo si schiaccia sull'asse $x$ |
| **immagine** | le $y$ «coperte» dal grafico: lo si schiaccia sull'asse $y$ |
| **zeri** | dove il grafico tocca o attraversa l'asse $x$ |
| **segno** | positiva dove il grafico sta sopra l'asse $x$, negativa dove sta sotto |
| **crescenza** | dove il grafico sale, leggendolo da sinistra a destra |

>* Il dominio si legge sull'asse $x$, l'immagine sull'asse $y$.

Prova con il grafico di $y = \dfrac{x-1}{x+2}$. Passa il dito sulla curva per leggere le coordinate, poi rispondi alle domande.

[[grafico:dominio-fratta]]

?? Per quali $x$ la funzione è negativa?
=> Per $-2 < x < 1$. In quel tratto la curva sta sotto l'asse $x$, fra la retta tratteggiata $x = -2$ e il punto $x = 1$. È lo stesso risultato della tabella dei segni.

?? Qual è l'immagine della funzione?
=> Tutti i numeri reali tranne $1$. I due rami coprono tutte le quote tranne $y = 1$, a cui si avvicinano senza arrivarci. Lo conferma il calcolo: $\dfrac{x-1}{x+2} = 1$ porta a $-1 = 2$, impossibile.

Su ciascuno dei due rami la curva sale: la funzione è crescente in $(-\infty, -2)$ e in $(-2, +\infty)$, presi separatamente.

>! Crescente su ogni ramo non vuol dire crescente su tutto il dominio. Infatti $-3 < 0$, ma $f(-3) = 4$ è più grande di $f(0) = -\frac12$.` }
  ],

  grafici: {
    immagine: {
      tipo: 'piano', x: [-2, 4], y: [-2.5, 6],
      parametri: [ { nome: 'p', min: -1.5, max: 3.5, passo: 0.1, valore: 2.8, nascosto: true } ],
      funzioni: [ { f: 'x^2 - 2*x', etichetta: 'y = x² − 2x', colore: 1 } ],
      elementi: [
        { tipo: 'segmento', da: ['p', 0], a: ['p', 'p^2 - 2*p'], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: ['p', 'p^2 - 2*p'], a: [0, 'p^2 - 2*p'], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [0, 'p^2 - 2*p'], colore: 4 },
        { tipo: 'punto', p: ['p', 'p^2 - 2*p'], colore: 4 },
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'p', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [0.25, 5.3], testo: 'f({{p}}) = {{p^2 - 2*p}}', ancora: 'start' }
      ],
      didascalia: 'Trascina p lungo l\'asse x: il risultato f(p) si legge sull\'asse y. Qual è il valore più basso che riesci a ottenere?'
    },
    iniettiva: {
      tipo: 'piano', x: [-3, 3], y: [-1.5, 6.5],
      parametri: [
        { nome: 'a', min: -2.5, max: 0, passo: 0.1, valore: -2.5, etichetta: 'inizio del dominio' },
        { nome: 'k', min: -1, max: 6, passo: 0.1, valore: 2.5, nascosto: true }
      ],
      funzioni: [ { f: 'x^2', dominio: ['a', 2.5], etichetta: 'y = x²', colore: 1 } ],
      elementi: [
        { tipo: 'orizzontale', y: 'k', colore: 2 },
        { tipo: 'punto', p: ['sqrt(k) + 0*sqrt(2.5 - sqrt(k))', 'k'], colore: 4 },
        { tipo: 'punto', p: ['-sqrt(k) + 0*sqrt(-sqrt(k) - a)', 'k'], colore: 4 },
        { tipo: 'punto', p: [2.75, 'k'], trascina: true, etichetta: 'y = {{k}}', posizione: 'alto-sinistra', colore: 2 }
      ],
      didascalia: 'Trascina la retta orizzontale e conta i punti in cui taglia la curva. Poi porta il cursore «inizio del dominio» fino a 0 e riprova.'
    },
    parita: {
      tipo: 'piano', x: [-2.4, 2.4], y: [-9, 9],
      parametri: [ { nome: 'a', min: 0.3, max: 2, passo: 0.1, valore: 1.6, nascosto: true } ],
      funzioni: [
        { f: 'x^3', etichetta: 'y = x³ (dispari)', colore: 1 },
        { f: 'x^2', etichetta: 'y = x² (pari)', colore: 3 }
      ],
      elementi: [
        { tipo: 'segmento', da: ['a', 'a^3'], a: ['-a', '-a^3'], tratteggio: true, colore: 1 },
        { tipo: 'segmento', da: ['a', 'a^2'], a: ['-a', 'a^2'], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['-a', '-a^3'], vuoto: true, colore: 1, etichetta: '({{-a}}; {{-a^3}})', posizione: 'destra' },
        { tipo: 'punto', p: ['-a', 'a^2'], vuoto: true, colore: 3, etichetta: '({{-a}}; {{a^2}})', posizione: 'alto-destra' },
        { tipo: 'punto', p: ['a', 'a^3'], trascina: true, colore: 1, etichetta: '({{a}}; {{a^3}})', posizione: 'sinistra' },
        { tipo: 'punto', p: ['a', 'a^2'], trascina: true, colore: 3, etichetta: '({{a}}; {{a^2}})', posizione: 'basso-sinistra' }
      ],
      didascalia: 'Trascina uno dei punti pieni: il punto vuoto è il suo gemello in −a. Confronta le ordinate dei gemelli sulle due curve.'
    },
    inversa: {
      tipo: 'piano', x: [-1, 9.5], y: [-1, 9.5],
      proporzioni: 'uguali',
      parametri: [ { nome: 'a', min: 0, max: 3, passo: 0.05, valore: 2, nascosto: true } ],
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [0, 3] },
        { f: 'sqrt(x)', etichetta: 'y = √x', colore: 2, dominio: [0, 9.5] }
      ],
      elementi: [
        { tipo: 'retta', m: 1, q: 0, etichetta: 'y = x', tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: ['a', 'a^2'], a: ['a^2', 'a'], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: ['a^2', 'a'], colore: 2, etichetta: 'Q ({{a^2}}; {{a}})', posizione: 'basso-destra' },
        { tipo: 'punto', p: ['a', 'a^2'], trascina: true, colore: 1, etichetta: 'P ({{a}}; {{a^2}})', posizione: 'alto-sinistra' }
      ],
      didascalia: 'Trascina P lungo la parabola: Q sta sulla curva della radice e ha le coordinate di P scambiate.'
    },
    traslazioni: {
      tipo: 'piano', x: [-6, 6], y: [-5, 9],
      parametri: [
        { nome: 'h', min: -4, max: 4, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'k', min: -4, max: 7, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'a', min: -2, max: 2, passo: 0.25, valore: 1, etichetta: 'a' }
      ],
      funzioni: [
        { f: 'x^2', colore: 3, tratteggio: true },
        { f: 'a*(x - h)^2 + k', etichetta: 'y = a(x − h)² + k', colore: 1 }
      ],
      elementi: [
        { tipo: 'punto', p: ['h', 'k'], trascina: true, colore: 1, etichetta: 'V', posizione: 'basso' },
        { tipo: 'testo', p: [-5.7, -4.3], testo: 'h = {{h}} ;  k = {{k}}', ancora: 'start' }
      ],
      didascalia: 'La tratteggiata è y = x². Trascina il vertice V e muovi il cursore a: guarda come cambiano h, k e la forma della parabola.'
    },
    'valore-assoluto': {
      tipo: 'piano', x: [-4, 4], y: [-4, 6],
      parametri: [
        { nome: 'h', min: -2.5, max: 2.5, passo: 0.1, valore: 0.5, nascosto: true },
        { nome: 'k', min: -3.5, max: 3, passo: 0.1, valore: -3, nascosto: true }
      ],
      funzioni: [
        { f: '(x - h)^2 + k', colore: 3, tratteggio: true },
        { f: 'abs((x - h)^2 + k)', etichetta: 'y = |f(x)|', colore: 1 }
      ],
      elementi: [ { tipo: 'punto', p: ['h', 'k'], trascina: true, colore: 3, etichetta: 'V', posizione: 'basso' } ],
      didascalia: 'La tratteggiata è f(x), la piena è |f(x)|. Trascina il vertice V: portalo sotto l\'asse x, poi sopra.'
    },
    'f-modulo': {
      tipo: 'piano', x: [-4, 4], y: [-4, 6],
      parametri: [
        { nome: 'h', min: -2.5, max: 2.5, passo: 0.1, valore: 1.5, nascosto: true },
        { nome: 'k', min: -3.5, max: 3, passo: 0.1, valore: -2, nascosto: true }
      ],
      funzioni: [
        { f: '(x - h)^2 + k', colore: 3, tratteggio: true },
        { f: '(abs(x) - h)^2 + k', etichetta: 'y = f(|x|)', colore: 2 }
      ],
      elementi: [ { tipo: 'punto', p: ['h', 'k'], trascina: true, colore: 3, etichetta: 'V', posizione: 'basso' } ],
      didascalia: 'La tratteggiata è f(x), la piena è f(|x|). Trascina il vertice V a destra e a sinistra dell\'asse y.'
    },
    'dominio-fratta': {
      tipo: 'piano', x: [-8, 8], y: [-6, 6],
      funzioni: [ { f: '(x-1)/(x+2)', etichetta: 'y = (x − 1)/(x + 2)', colore: 1 } ],
      elementi: [ { tipo: 'verticale', x: -2, asintoto: true }, { tipo: 'testo', p: [-2.3, -5.2], testo: 'x = −2', ancora: 'end' } ],
      didascalia: 'Passa il dito sulla curva per leggere le coordinate. Dove manca il grafico? Dove taglia l\'asse x? A quale quota non arriva mai?'
    }
  },

  esempi: [
    { titolo: 'Il dominio di una funzione fratta', problema: R`Trova il dominio naturale di $f(x) = \dfrac{3x}{x^2 - 9}$.`, passi: [
      R`È una funzione razionale fratta: il denominatore non può annullarsi. Impongo $x^2 - 9 \ne 0$.`,
      R`Risolvo l'equazione associata (pura): $x^2 = 9 \Rightarrow x = \pm 3$. Questi sono i valori da escludere.`,
      R`Il dominio naturale è $\mathbb{R} \setminus \{-3, 3\}$, cioè $x \ne -3$ e $x \ne 3$.`
    ], risultato: R`Dominio: $x \ne -3$ e $x \ne 3$.` },

    { titolo: 'Dominio con radice e frazione insieme', problema: R`Trova il dominio naturale di $f(x) = \dfrac{\sqrt{x+1}}{x-4}$.`, passi: [
      R`Ci sono due condizioni da imporre insieme: il radicando non negativo (indice pari) e il denominatore diverso da zero.`,
      R`Radicando: $x + 1 \ge 0 \Rightarrow x \ge -1$. Denominatore: $x - 4 \ne 0 \Rightarrow x \ne 4$.`,
      R`Metto le due condizioni a sistema (intersezione): $x \ge -1$ e $x \ne 4$.`,
      R`Il dominio è $[-1, 4) \cup (4, +\infty)$.`
    ], risultato: R`Dominio: $[-1, 4) \cup (4, +\infty)$.` },

    { titolo: 'Parità di una funzione', problema: R`Stabilisci se $f(x) = x^4 - 3x^2 + 1$ è pari, dispari o nessuna delle due.`, passi: [
      R`Il dominio è tutto $\mathbb{R}$, simmetrico rispetto a $0$: posso procedere con il test.`,
      R`Calcolo $f(-x) = (-x)^4 - 3(-x)^2 + 1 = x^4 - 3x^2 + 1$.`,
      R`Confronto: $f(-x) = f(x)$ per ogni $x$. La funzione è **pari**.`
    ], risultato: R`$f$ è pari: il suo grafico è simmetrico rispetto all'asse $y$.` },

    { titolo: 'Funzione composta e il suo dominio', problema: R`Date $f(x) = \dfrac{1}{x - 2}$ e $g(x) = x^2 + 3$, trova $(f \circ g)(x)$ e il suo dominio.`, passi: [
      R`Nella composta $f \circ g$ si applica prima $g$, poi $f$: $(f \circ g)(x) = f\big(g(x)\big) = f(x^2 + 3)$.`,
      R`Applico la regola di $f$ mettendo $x^2 + 3$ al posto della $x$: $\dfrac{1}{(x^2 + 3) - 2} = \dfrac{1}{x^2 + 1}$.`,
      R`Il dominio richiede $g(x) \ne 2$ (perché $f$ non è definita in $2$), cioè $x^2 + 3 \ne 2 \Rightarrow x^2 \ne -1$.`,
      R`$x^2 \ne -1$ è vera per **ogni** $x$ reale, perché un quadrato non è mai negativo: nessuna $x$ va esclusa.`,
      R`Il dominio della composta è tutto $\mathbb{R}$, più ampio di quanto ci si aspetterebbe guardando solo $f$.`
    ], risultato: R`$(f \circ g)(x) = \dfrac{1}{x^2+1}$, dominio $\mathbb{R}$.` },

    { titolo: 'Trovare la funzione inversa', problema: R`Verifica che $f(x) = \dfrac{2x + 1}{3}$ è invertibile e trova $f^{-1}(x)$.`, passi: [
      R`$f$ è una funzione lineare non costante, quindi è iniettiva e suriettiva su $\mathbb{R}$: è biunivoca, dunque invertibile.`,
      R`Pongo $y = \dfrac{2x+1}{3}$ e scambio $x$ con $y$: $x = \dfrac{2y+1}{3}$.`,
      R`Risolvo rispetto a $y$: $3x = 2y + 1 \Rightarrow y = \dfrac{3x - 1}{2}$.`,
      R`Verifica: $f\big(f^{-1}(x)\big) = \dfrac{2 \cdot \frac{3x-1}{2} + 1}{3} = \dfrac{(3x - 1) + 1}{3} = \dfrac{3x}{3} = x$. ✓`
    ], risultato: R`$f^{-1}(x) = \dfrac{3x - 1}{2}$.` }
  ],

  formulario: [
    { nome: 'Dominio: denominatore', formula: R`D(x) \ne 0`, nota: R`Vale per ogni funzione razionale fratta.` },
    { nome: 'Dominio: radice di indice pari', formula: R`A(x) \ge 0`, nota: R`Il radicando non può essere negativo.` },
    { nome: 'Dominio: logaritmo', formula: R`A(x) > 0`, nota: R`L'argomento del logaritmo deve essere positivo.` },
    { nome: 'Funzione pari', formula: R`f(-x) = f(x)`, nota: R`Grafico simmetrico rispetto all'asse $y$.` },
    { nome: 'Funzione dispari', formula: R`f(-x) = -f(x)`, nota: R`Grafico simmetrico rispetto all'origine.` },
    { nome: 'Funzione periodica', formula: R`f(x + T) = f(x)`, nota: R`Per ogni $x$ del dominio, con $T > 0$ periodo.` },
    { nome: 'Funzione crescente', formula: R`x_1 < x_2 \Rightarrow f(x_1) < f(x_2)` },
    { nome: 'Funzione decrescente', formula: R`x_1 < x_2 \Rightarrow f(x_1) > f(x_2)` },
    { nome: 'Funzione iniettiva', formula: R`x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)` },
    { nome: 'Funzione suriettiva', formula: R`f(A) = B`, nota: R`L'immagine coincide con l'intero codominio.` },
    { nome: 'Funzione composta', formula: R`(g \circ f)(x) = g\big(f(x)\big)` },
    { nome: 'Funzione inversa', formula: R`f^{-1}\big(f(x)\big) = x`, nota: R`Vale per ogni $x$ del dominio di $f$; analogamente $f(f^{-1}(y)) = y$ per ogni $y$ del codominio.` },
    { nome: 'Traslazione del grafico', formula: R`y = f(x - h) + k`, nota: R`Sposta a destra di $h$ e in alto di $k$.` },
    { nome: 'Dilatazione e simmetria', formula: R`y = a \cdot f(x)`, nota: R`Dilata verticalmente per $|a| > 1$; se $a < 0$ ribalta anche rispetto all'asse $x$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Definizione di funzione`, retro: R`Una legge che ad ogni elemento del dominio associa uno e un solo elemento del codominio (proprietà di univocità).` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Differenza fra codominio e immagine`, retro: R`Il codominio è l'insieme in cui si cercano i valori; l'immagine è il sottoinsieme dei valori effettivamente raggiunti.` },
    { id: 'fc-03', sezione: 'grafico-funzione', tipo: 'concetto', fronte: R`Test della retta verticale`, retro: R`Un grafico rappresenta una funzione se e solo se ogni retta verticale lo interseca in al più un punto.` },
    { id: 'fc-04', sezione: 'classificazione', tipo: 'definizione', fronte: R`Funzione razionale intera`, retro: R`Un polinomio, $y = P(x)$: definita per ogni $x$ reale.` },
    { id: 'fc-05', sezione: 'classificazione', tipo: 'definizione', fronte: R`Funzione razionale fratta`, retro: R`Un rapporto di due polinomi, $y = \dfrac{P(x)}{Q(x)}$, con l'incognita anche a denominatore.` },
    { id: 'fc-06', sezione: 'dominio-naturale', tipo: 'procedura', fronte: R`Condizione di esistenza per un denominatore`, retro: R`Deve essere diverso da zero: $D(x) \ne 0$.` },
    { id: 'fc-07', sezione: 'dominio-naturale', tipo: 'procedura', fronte: R`Condizione di esistenza per una radice di indice pari`, retro: R`Il radicando deve essere non negativo: $A(x) \ge 0$.` },
    { id: 'fc-08', sezione: 'zeri-e-segno', tipo: 'definizione', fronte: R`Zero di una funzione`, retro: R`Un valore $x_0$ del dominio per cui $f(x_0) = 0$.` },
    { id: 'fc-09', sezione: 'zeri-e-segno', tipo: 'procedura', fronte: R`Come si studia il segno di $f$`, retro: R`Si risolve la disequazione $f(x) > 0$: dove è vera il grafico sta sopra l'asse $x$.` },
    { id: 'fc-10', sezione: 'iniettive-suriettive', tipo: 'definizione', fronte: R`Funzione iniettiva`, retro: R`A elementi distinti del dominio corrispondono immagini distinte: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$.` },
    { id: 'fc-11', sezione: 'iniettive-suriettive', tipo: 'definizione', fronte: R`Funzione biunivoca`, retro: R`Sia iniettiva sia suriettiva: corrispondenza uno a uno fra dominio e codominio.` },
    { id: 'fc-12', sezione: 'crescenza-monotonia', tipo: 'definizione', fronte: R`Funzione crescente in un intervallo`, retro: R`Per ogni $x_1 < x_2$ nell'intervallo, $f(x_1) < f(x_2)$.` },
    { id: 'fc-13', sezione: 'crescenza-monotonia', tipo: 'concetto', fronte: R`Funzione monotona`, retro: R`Crescente oppure decrescente in tutto l'intervallo considerato.` },
    { id: 'fc-14', sezione: 'parita-periodicita', tipo: 'definizione', fronte: R`Funzione pari`, retro: R`$f(-x) = f(x)$ per ogni $x$: grafico simmetrico rispetto all'asse $y$.` },
    { id: 'fc-15', sezione: 'parita-periodicita', tipo: 'definizione', fronte: R`Funzione dispari`, retro: R`$f(-x) = -f(x)$ per ogni $x$: grafico simmetrico rispetto all'origine.` },
    { id: 'fc-16', sezione: 'funzione-composta', tipo: 'formula', fronte: R`Funzione composta`, retro: R`$(g \circ f)(x) = g(f(x))$: si applica prima $f$, poi $g$.` },
    { id: 'fc-17', sezione: 'funzione-composta', tipo: 'concetto', fronte: R`Dominio della funzione composta`, retro: R`Le $x$ del dominio di $f$ per cui $f(x)$ appartiene al dominio di $g$.` },
    { id: 'fc-18', sezione: 'funzione-inversa', tipo: 'concetto', fronte: R`Condizione per l'esistenza dell'inversa`, retro: R`La funzione deve essere biunivoca (eventualmente restringendo il dominio).` },
    { id: 'fc-19', sezione: 'funzione-inversa', tipo: 'concetto', fronte: R`Grafico della funzione inversa`, retro: R`È il simmetrico del grafico di $f$ rispetto alla bisettrice $y = x$.` },
    { id: 'fc-20', sezione: 'traslazioni-dilatazioni', tipo: 'procedura', fronte: R`Traslazione orizzontale $y = f(x-h)$`, retro: R`Sposta il grafico a destra se $h > 0$, a sinistra se $h < 0$: segno controintuitivo.` },
    { id: 'fc-21', sezione: 'valore-assoluto', tipo: 'procedura', fronte: R`Effetto di $y = |f(x)|$`, retro: R`Ribalta sopra l'asse $x$ le parti di grafico che stavano sotto; lascia invariato il resto.` },
    { id: 'fc-22', sezione: 'lettura-grafico', tipo: 'procedura', fronte: R`Come si legge il dominio da un grafico`, retro: R`Si proietta il grafico sull'asse $x$: sono i valori coperti orizzontalmente.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Con $f(x) = 2x + 3$, calcola $f(4)$.`, suggerimenti: [R`Metti $4$ al posto di $x$.`], risposta: { tipo: 'numero', valore: 11, tolleranza: 0.005, segnaposto: 'es. 7 oppure 5/2' }, soluzione: [R`Metto $4$ al posto di $x$: $f(4) = 2 \cdot 4 + 3$.`, R`$8 + 3 = 11$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Con $f(x) = x^2 - 1$, calcola $f(-3)$.`, suggerimenti: [R`Metti $-3$ al posto di $x$, con le parentesi: $(-3)^2$.`], risposta: { tipo: 'numero', valore: 8, tolleranza: 0.005, segnaposto: 'es. 7 oppure 5/2' }, soluzione: [R`Metto $-3$ al posto di $x$: $f(-3) = (-3)^2 - 1$.`, R`$(-3)^2 = 9$, quindi $f(-3) = 9 - 1 = 8$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Con $f(x) = \sqrt{x + 5}$, calcola $f(4)$.`, suggerimenti: [R`Metti $4$ al posto di $x$ e calcola prima quello che sta sotto la radice.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.005, segnaposto: 'es. 7 oppure 5/2' }, soluzione: [R`Metto $4$ al posto di $x$: $f(4) = \sqrt{4 + 5} = \sqrt{9}$.`, R`$\sqrt9 = 3$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Trova gli zeri di $f(x) = 2x - 6$.`, suggerimenti: [R`Gli zeri sono le soluzioni di $f(x) = 0$.`], risposta: { tipo: 'numeri', valori: [3], segnaposto: 'es. 2 oppure -1; 3' }, soluzione: [R`Pongo $f(x) = 0$: $2x - 6 = 0$.`, R`$2x = 6$, quindi $x = 3$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Trova il dominio di $f(x) = \dfrac{1}{x - 2}$. Scrivilo come disuguaglianza, per esempio *x > 7* oppure *x ≠ 7*.`, suggerimenti: [R`Il denominatore non può valere zero.`], risposta: tranne(2), soluzione: [R`È una funzione fratta: il denominatore deve essere diverso da zero.`, R`$x - 2 \ne 0$, quindi $x \ne 2$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Trova il dominio di $f(x) = \sqrt{x - 3}$. Per $\ge$ usa il tasto ≥ oppure scrivi *>=*.`, suggerimenti: [R`Sotto una radice quadrata non ci può essere un numero negativo.`], risposta: dis('>=', 3), soluzione: [R`Radice quadrata: il radicando deve essere maggiore o uguale a zero.`, R`$x - 3 \ge 0$, quindi $x \ge 3$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Trova il dominio di $f(x) = \log(x - 1)$.`, suggerimenti: [R`L'argomento del logaritmo deve essere positivo.`], risposta: dis('>', 1), soluzione: [R`Logaritmo: l'argomento deve essere positivo, zero escluso.`, R`$x - 1 > 0$, quindi $x > 1$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Trova gli zeri di $f(x) = x^2 - 4x$. Scrivili separati da punto e virgola.`, suggerimenti: [R`Poni $f(x) = 0$ e raccogli $x$.`], risposta: { tipo: 'numeri', valori: [0, 4], segnaposto: 'es. 2 oppure -1; 3' }, soluzione: [R`Pongo $f(x) = 0$: $x^2 - 4x = 0$.`, R`Raccolgo $x$: $x(x - 4) = 0$.`, R`Un prodotto è zero se lo è un fattore: $x = 0$ oppure $x = 4$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Trova gli zeri di $f(x) = x^2 - 9$.`, suggerimenti: [R`Poni $f(x) = 0$: quali numeri hanno quadrato $9$?`], risposta: { tipo: 'numeri', valori: [-3, 3], segnaposto: 'es. 2 oppure -1; 3' }, soluzione: [R`Pongo $f(x) = 0$: $x^2 = 9$.`, R`Due numeri hanno quadrato $9$: $x = -3$ e $x = 3$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`$f(x) = x^4 + x^2$ è pari o dispari? Scrivi *pari*, *dispari* oppure *nessuna*.`, suggerimenti: [R`Calcola $f(-x)$: metti $-x$ al posto di ogni $x$.`], risposta: PARI, soluzione: [R`$f(-x) = (-x)^4 + (-x)^2 = x^4 + x^2$.`, R`È uguale a $f(x)$: la funzione è pari.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`$f(x) = x^3 + 5x$ è pari o dispari? Scrivi *pari*, *dispari* oppure *nessuna*.`, suggerimenti: [R`Calcola $f(-x)$ e confrontalo con $f(x)$ e con $-f(x)$.`, R`$(-x)^3 = -x^3$: la potenza dispari tiene il segno.`], risposta: DISPARI, soluzione: [R`$f(-x) = (-x)^3 + 5(-x) = -x^3 - 5x$.`, R`$-f(x) = -(x^3 + 5x) = -x^3 - 5x$.`, R`$f(-x) = -f(x)$: la funzione è dispari.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`$f(x) = x^2 + x$ è pari o dispari? Scrivi *pari*, *dispari* oppure *nessuna*.`, suggerimenti: [R`Calcola $f(-x)$ e confrontalo con $f(x)$ e con $-f(x)$.`], risposta: NESSUNA, soluzione: [R`$f(-x) = (-x)^2 + (-x) = x^2 - x$.`, R`Non è $f(x) = x^2 + x$, e non è $-f(x) = -x^2 - x$.`, R`Quindi non è né pari né dispari.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Trova il dominio di $f(x) = \dfrac{x + 1}{x^2 - 4}$. Se escludi due valori, scrivi per esempio *x ≠ 1 e x ≠ 5*.`, suggerimenti: [R`Il denominatore non può valere zero.`, R`Per quali $x$ vale $x^2 = 4$?`], risposta: tranne2(-2, 2), soluzione: [R`Il denominatore deve essere diverso da zero: $x^2 - 4 \ne 0$.`, R`$x^2 = 4$ per $x = -2$ e per $x = 2$.`, R`Quindi $x \ne -2$ e $x \ne 2$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Trova il dominio di $f(x) = \sqrt{6 - 2x}$.`, suggerimenti: [R`Il radicando deve essere maggiore o uguale a zero.`, R`Risolvi $6 - 2x \ge 0$: attento quando dividi per un numero negativo.`], risposta: dis('<=', 3), soluzione: [R`Radice quadrata: $6 - 2x \ge 0$.`, R`Porto $6$ a destra: $-2x \ge -6$.`, R`Divido per $-2$ e cambio il verso: $x \le 3$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Trova gli zeri di $f(x) = \dfrac{x^2 - 1}{x + 1}$.`, suggerimenti: [R`Prima il dominio: il denominatore non può valere zero.`, R`Poi annulla il numeratore, e tieni solo i valori del dominio.`], risposta: { tipo: 'numeri', valori: [1], segnaposto: 'es. 2 oppure -1; 3' }, soluzione: [R`Dominio: $x + 1 \ne 0$, cioè $x \ne -1$.`, R`Il numeratore si annulla per $x^2 = 1$: $x = -1$ oppure $x = 1$.`, R`$x = -1$ non sta nel dominio: l'unico zero è $x = 1$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Trova il dominio di $f(x) = \log(10 - 2x)$.`, suggerimenti: [R`L'argomento del logaritmo deve essere positivo.`, R`Risolvi $10 - 2x > 0$: attento quando dividi per un numero negativo.`], risposta: dis('<', 5), soluzione: [R`Logaritmo: $10 - 2x > 0$.`, R`Porto $10$ a destra: $-2x > -10$.`, R`Divido per $-2$ e cambio il verso: $x < 5$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Con $f(x) = x + 1$ e $g(x) = x^2$, calcola $(g \circ f)(2)$.`, suggerimenti: [R`Nella composta $g \circ f$ si calcola prima $f$.`, R`$f(2) = 3$. Ora applica $g$ a $3$.`], risposta: { tipo: 'numero', valore: 9, tolleranza: 0.005, segnaposto: 'es. 7 oppure 5/2' }, soluzione: [R`Prima $f$: $f(2) = 2 + 1 = 3$.`, R`Poi $g$ sul risultato: $g(3) = 3^2 = 9$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Con $f(x) = x + 3$ e $g(x) = 2x$, scrivi $(g \circ f)(x)$.`, suggerimenti: [R`$(g \circ f)(x) = g(f(x))$: $g$ raddoppia quello che riceve.`, R`$g$ riceve $x + 3$: raddoppia tutta la parentesi.`], risposta: espr(['2x+6', '6+2x', '2(x+3)', '2(3+x)'], ['(g∘f)(x)=', 'g(f(x))=']), soluzione: [R`Prima $f$: esce $x + 3$.`, R`$g$ raddoppia quello che riceve: $g(x + 3) = 2(x + 3)$.`, R`Svolgo: $(g \circ f)(x) = 2x + 6$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Trova l'inversa di $f(x) = x + 5$. Scrivi solo l'espressione, per esempio *3x+1*.`, suggerimenti: [R`Scambia $x$ e $y$ in $y = x + 5$, poi ricava $y$.`], risposta: espr(['x-5', '-5+x'], INV), soluzione: [R`Scrivo $y = x + 5$ e scambio $x$ e $y$: $x = y + 5$.`, R`Ricavo $y$: $y = x - 5$.`, R`Quindi $f^{-1}(x) = x - 5$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Trova l'inversa di $f(x) = 2x - 4$. Per le frazioni usa la barra, per esempio *(x-2)/5*.`, suggerimenti: [R`Scambia $x$ e $y$ in $y = 2x - 4$.`, R`Da $x = 2y - 4$ porta il $4$ a sinistra, poi dividi per $2$.`], risposta: espr(['(x+4)/2', '(4+x)/2', 'x/2+2', '2+x/2', '1/2x+2', '(1/2)x+2', '0.5x+2', '2+0.5x', 'x/2+4/2'], INV), soluzione: [R`Scrivo $y = 2x - 4$ e scambio $x$ e $y$: $x = 2y - 4$.`, R`Porto il $-4$ a sinistra: $x + 4 = 2y$.`, R`Divido per $2$: $f^{-1}(x) = \dfrac{x + 4}{2}$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Trova il dominio naturale di $f(x) = \dfrac{2x - 1}{x + 5}$.`, suggerimenti: [R`È una funzione razionale fratta: quale condizione riguarda il denominatore?`, R`Il denominatore si annulla per un solo valore di $x$.`], risposta: tranne(-5), soluzione: [R`Essendo una funzione razionale fratta, il denominatore non può annullarsi: $x + 5 \ne 0$.`, R`Cioè $x \ne -5$.`, R`Il dominio naturale è $\mathbb{R} \setminus \{-5\}$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Trova il dominio naturale di $f(x) = \sqrt{x - 4}$.`, suggerimenti: [R`Il radicando ha indice pari: quale condizione impone?`, R`Deve essere $x - 4 \ge 0$.`], risposta: { tipo: 'intervallo', da: 4, a: 'inf', chiusoDa: true, chiusoA: false }, soluzione: [R`Indice pari: il radicando deve essere non negativo, $x - 4 \ge 0$.`, R`Cioè $x \ge 4$.`, R`Il dominio è $[4, +\infty)$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Trova gli zeri di $f(x) = x^2 - 5x + 6$.`, suggerimenti: [R`Uno zero è un valore di $x$ per cui $f(x) = 0$: risolvi l'equazione di secondo grado associata.`, R`Cerca due numeri con somma $5$ e prodotto $6$.`], risposta: { tipo: 'numeri', valori: [2, 3] }, soluzione: [R`Risolvo $x^2 - 5x + 6 = 0$: cerco due numeri con somma $5$ e prodotto $6$, cioè $2$ e $3$.`, R`Gli zeri sono $x = 2$ e $x = 3$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Date $f(x) = 3x - 2$ e $g(x) = x + 1$, calcola $(f \circ g)(2)$.`, suggerimenti: [R`Calcola prima $g(2)$.`, R`Poi applica $f$ al risultato ottenuto.`], risposta: { tipo: 'numero', valore: 7 }, soluzione: [R`$g(2) = 2 + 1 = 3$.`, R`$(f \circ g)(2) = f(3) = 3 \cdot 3 - 2 = 7$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Stabilisci se $f(x) = x^3 - x$ è pari, dispari o nessuna delle due.`, suggerimenti: [R`Calcola $f(-x)$ e confrontalo con $f(x)$.`, R`$f(-x) = (-x)^3 - (-x) = -x^3 + x$: raccogli il segno.`], risposta: DISPARI, soluzione: [R`$f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)$.`, R`Poiché $f(-x) = -f(x)$ per ogni $x$, la funzione è **dispari**.`] },
    { id: 'es-06', difficolta: 2, testo: R`Trova il dominio naturale di $f(x) = \sqrt{4 - x^2}$.`, suggerimenti: [R`Indice pari: imponi il radicando non negativo.`, R`Risolvi la disequazione $4 - x^2 \ge 0$, cioè $x^2 \le 4$.`], risposta: { tipo: 'intervallo', da: -2, a: 2, chiusoDa: true, chiusoA: true }, soluzione: [R`Condizione: $4 - x^2 \ge 0$, cioè $x^2 \le 4$.`, R`Risolvendo (disequazione pura), $-2 \le x \le 2$.`, R`Il dominio è $[-2, 2]$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Trova il dominio naturale di $f(x) = \log(x - 1) + \dfrac{1}{x - 3}$.`, suggerimenti: [R`Ci sono due condizioni distinte da mettere a sistema: una per il logaritmo, una per il denominatore.`, R`Argomento del logaritmo: $x - 1 > 0$. Denominatore: $x - 3 \ne 0$.`, R`Il dominio è l'insieme dei valori che rispettano entrambe le condizioni insieme.`], soluzione: [R`Argomento del logaritmo positivo: $x - 1 > 0 \Rightarrow x > 1$.`, R`Denominatore diverso da zero: $x - 3 \ne 0 \Rightarrow x \ne 3$.`, R`A sistema: $x > 1$ e $x \ne 3$, cioè il dominio è $(1, 3) \cup (3, +\infty)$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Verifica che $f(x) = 2x + 7$ è invertibile e trova $f^{-1}(x)$.`, suggerimenti: [R`Una funzione lineare non costante è sempre biunivoca su $\mathbb{R}$.`, R`Scambia $x$ e $y$ in $y = 2x + 7$ e risolvi rispetto alla nuova $y$.`], risposta: espr(['(x-7)/2', 'x/2-7/2', 'x/2-3.5', '1/2x-7/2', '(1/2)x-7/2', '0.5x-3.5', '-7/2+x/2'], INV), soluzione: [R`$f$ è lineare e non costante: è biunivoca su $\mathbb{R}$, quindi invertibile.`, R`Pongo $y = 2x + 7$, scambio $x$ e $y$: $x = 2y + 7$.`, R`Risolvo rispetto a $y$: $y = \dfrac{x - 7}{2}$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Date $f(x) = \sqrt{x - 2}$ e $g(x) = x^2 + 1$, trova il dominio di $(f \circ g)(x)$.`, suggerimenti: [R`Calcola prima l'espressione di $(f \circ g)(x) = f(g(x))$.`, R`Poi imponi che il radicando sia non negativo.`, R`Arrivi a $x^2 + 1 - 2 \ge 0$, cioè $x^2 \ge 1$.`], risposta: fuori(-1, 1), soluzione: [R`$(f \circ g)(x) = f(x^2+1) = \sqrt{x^2 + 1 - 2} = \sqrt{x^2 - 1}$.`, R`Serve $x^2 - 1 \ge 0$, cioè $x^2 \ge 1$.`, R`Risolvendo (disequazione pura), $x \le -1$ oppure $x \ge 1$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Date $f(x) = \dfrac{1}{x}$ e $g(x) = x - 3$, scrivi l'espressione di $(g \circ f)(x)$ e stabilisci per quali $x$ è definita. Nella casella scrivi l'espressione.`, suggerimenti: [R`$(g \circ f)(x) = g(f(x))$: sostituisci $f(x)$ dentro $g$.`, R`Il denominatore di $f$ impone già una condizione.`], risposta: espr(['1/x-3', '(1-3x)/x', '-3+1/x', '1/x-3,x≠0', '1/x-3 con x≠0', '1/x-3;x≠0'], ['(g∘f)(x)=', 'g(f(x))=']), soluzione: [R`$(g \circ f)(x) = g\left(\dfrac{1}{x}\right) = \dfrac{1}{x} - 3$.`, R`È definita per $x \ne 0$, la stessa condizione richiesta da $f$: $g$ non aggiunge altre restrizioni, perché è definita per ogni numero reale.`] },
    { id: 'es-11', difficolta: 3, testo: R`Scrivi l'equazione della parabola ottenuta traslando $y = x^2$ di $3$ unità a destra e $2$ unità verso il basso.`, suggerimenti: [R`Una traslazione a destra di $h$ agisce sull'argomento: $y = f(x - h)$.`, R`Una traslazione verso il basso di $2$ significa $k = -2$ in $y = f(x) + k$.`], risposta: espr(['(x-3)^2-2', '-2+(x-3)^2', 'x^2-6x+7'], []), soluzione: [R`Traslazione a destra di $3$: si sostituisce $x$ con $x - 3$, ottenendo $y = (x-3)^2$.`, R`Traslazione verso il basso di $2$: si aggiunge $k = -2$.`, R`Equazione finale: $y = (x - 3)^2 - 2$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale delle seguenti è la definizione corretta di funzione da $A$ a $B$?`, opzioni: [R`Una relazione che associa ad ogni elemento di $B$ uno o più elementi di $A$`, R`Una relazione qualsiasi fra due insiemi $A$ e $B$`, R`Una legge che associa ad ogni elemento di $A$ uno e un solo elemento di $B$`, R`Un'equazione con due incognite $x$ e $y$`], corretta: 2, spiegazione: R`La proprietà che distingue una funzione da una relazione generica è l'univocità: a ogni $x$ del dominio corrisponde uno e un solo $y$. Le altre opzioni descrivono relazioni non necessariamente univoche, o generiche equazioni.` },
    { id: 'q-02', domanda: R`L'immagine di una funzione $f: A \to B$ è…`, opzioni: [R`l'insieme dei valori di $B$ effettivamente raggiunti da $f$`, R`sempre uguale al codominio $B$`, R`l'insieme di partenza $A$`, R`l'insieme dei punti in cui $f$ si annulla`], corretta: 0, spiegazione: R`L'immagine è un sottoinsieme del codominio, formato solo dai valori realmente ottenuti; coincide col codominio solo se la funzione è suriettiva.` },
    { id: 'q-03', domanda: R`A che cosa serve il test della retta verticale?`, opzioni: [R`a trovare gli zeri di una funzione`, R`a stabilire se un grafico rappresenta una funzione`, R`a stabilire se una funzione è pari`, R`a trovare il dominio naturale`], corretta: 1, spiegazione: R`Se una retta verticale interseca il grafico in più di un punto, a quella $x$ corrisponderebbero due valori di $y$: la relazione non sarebbe una funzione.` },
    { id: 'q-04', domanda: R`Una funzione razionale fratta è caratterizzata dal fatto che…`, opzioni: [R`ha coefficienti razionali`, R`l'incognita compare sotto una radice`, R`è definita per ogni $x$ reale`, R`l'incognita compare anche a denominatore`], corretta: 3, spiegazione: R`"Razionale" indica l'assenza di radici con l'incognita; "fratta" significa che l'incognita compare anche a denominatore, il che introduce condizioni di esistenza.` },
    { id: 'q-05', domanda: R`Il dominio naturale di $y = \sqrt{x + 2}$ è…`, opzioni: [R`$x \ge -2$`, R`$x > -2$`, R`$x \le -2$`, R`$x \ne -2$`], corretta: 0, spiegazione: R`L'indice della radice è pari, quindi il radicando deve essere non negativo: $x + 2 \ge 0 \Rightarrow x \ge -2$.` },
    { id: 'q-06', domanda: R`Il dominio naturale di $y = \log(3 - x)$ è…`, opzioni: [R`$x \ne 3$`, R`$x > 3$`, R`$x < 3$`, R`$x \le 3$`], corretta: 2, spiegazione: R`L'argomento del logaritmo deve essere positivo: $3 - x > 0 \Rightarrow x < 3$.` },
    { id: 'q-07', domanda: R`Uno zero di una funzione $f$ è…`, opzioni: [R`un punto in cui il grafico ha un massimo`, R`un valore di $x$ in cui $f$ non è definita`, R`un intervallo in cui $f$ è crescente`, R`un valore di $x$ per cui $f(x) = 0$`], corretta: 3, spiegazione: R`Per definizione, uno zero (o radice) è un valore del dominio in cui la funzione vale zero: l'ascissa di un punto in cui il grafico incontra l'asse $x$.` },
    { id: 'q-08', domanda: R`Una funzione $f$ è iniettiva quando…`, opzioni: [R`l'immagine coincide con il codominio`, R`a valori distinti del dominio corrispondono sempre immagini distinte`, R`è crescente su tutto il dominio`, R`ogni $x$ ha almeno due immagini`], corretta: 1, spiegazione: R`L'iniettività riguarda il non ripetersi delle immagini: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$. «L'immagine coincide con il codominio» descrive invece la suriettività; essere crescente basta per essere iniettiva, ma non è necessario ($\frac1x$ è iniettiva e non è crescente).` },
    { id: 'q-09', domanda: R`Una funzione $f: A \to B$ è suriettiva quando…`, opzioni: [R`ogni elemento di $A$ ha una sola immagine`, R`è sempre anche iniettiva`, R`il suo grafico passa per l'origine`, R`l'immagine di $f$ coincide con l'intero codominio $B$`], corretta: 3, spiegazione: R`Suriettiva significa che nessun elemento del codominio resta "scoperto": ognuno è immagine di almeno un elemento del dominio.` },
    { id: 'q-10', domanda: R`Una funzione biunivoca è…`, opzioni: [R`solo iniettiva`, R`solo suriettiva`, R`sia iniettiva sia suriettiva`, R`né iniettiva né suriettiva`], corretta: 2, spiegazione: R`Biunivoca (o biiettiva) significa iniettiva e suriettiva insieme: è la condizione che permette di costruire la funzione inversa.` },
    { id: 'q-11', domanda: R`Una funzione $f$ è crescente in un intervallo $I$ se, per ogni $x_1, x_2 \in I$…`, opzioni: [R`$x_1 < x_2 \Rightarrow f(x_1) < f(x_2)$`, R`$x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$`, R`$f(x_1) = f(x_2)$ sempre`, R`$x_1 = x_2 \Rightarrow f(x_1) = f(x_2)$`], corretta: 0, spiegazione: R`Crescente significa che a un $x$ maggiore corrisponde un $f(x)$ maggiore. Con $f(x_1) > f(x_2)$ si descrive invece una funzione decrescente.` },
    { id: 'q-12', domanda: R`Il grafico di una funzione pari è simmetrico rispetto…`, opzioni: [R`all'origine`, R`all'asse $y$`, R`all'asse $x$`, R`alla bisettrice $y=x$`], corretta: 1, spiegazione: R`Pari significa $f(-x) = f(x)$: i punti $(x, f(x))$ e $(-x, f(x))$ sono simmetrici rispetto all'asse $y$.` },
    { id: 'q-13', domanda: R`Una funzione dispari soddisfa la condizione…`, opzioni: [R`$f(-x) = -f(x)$`, R`$f(-x) = f(x)$`, R`$f(x) = -x$`, R`$f(0) = 0$ sempre e comunque`], corretta: 0, spiegazione: R`La condizione che definisce le funzioni dispari è $f(-x) = -f(x)$ per ogni $x$ del dominio; il grafico è simmetrico rispetto all'origine.` },
    { id: 'q-14', domanda: R`La funzione composta $(g \circ f)(x)$ si calcola…`, opzioni: [R`applicando prima $g$, poi $f$ al risultato`, R`moltiplicando $f(x)$ per $g(x)$`, R`applicando prima $f$, poi $g$ al risultato`, R`sommando $f(x)$ e $g(x)$`], corretta: 2, spiegazione: R`Nonostante si legga "g composto f", si esegue da destra a sinistra: prima $f$, poi $g$ sul risultato ottenuto.` },
    { id: 'q-15', domanda: R`Condizione necessaria perché una funzione ammetta inversa (sul suo dominio) è che sia…`, opzioni: [R`crescente`, R`pari`, R`periodica`, R`biunivoca`], corretta: 3, spiegazione: R`Solo una corrispondenza uno a uno fra dominio e codominio (biunivoca) può essere "disfatta" da una funzione inversa ben definita.` },
    { id: 'q-16', domanda: R`Il grafico della funzione inversa $f^{-1}$, rispetto al grafico di $f$, è…`, opzioni: [R`identico`, R`traslato di $1$ unità verso l'alto`, R`il simmetrico rispetto alla bisettrice $y = x$`, R`il simmetrico rispetto all'asse $x$`], corretta: 2, spiegazione: R`Scambiare $x$ e $y$ per trovare l'inversa corrisponde, graficamente, a riflettere il grafico rispetto alla retta $y = x$.` },
    { id: 'q-17', domanda: R`Il grafico di $y = |f(x)|$, rispetto a quello di $y = f(x)$…`, opzioni: [R`ha le parti sotto l'asse $x$ ribaltate sopra, il resto invariato`, R`è traslato verso l'alto di una unità`, R`è simmetrico rispetto all'asse $y$`, R`è identico a quello di $f$`], corretta: 0, spiegazione: R`Il valore assoluto rende positivo l'output: dove $f(x) < 0$ il grafico viene ribaltato sopra l'asse $x$; dove $f(x) \ge 0$ resta invariato.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Per il dominio naturale, elenca tutte le condizioni (denominatori, radicali, logaritmi) e mettile a sistema: il dominio è la loro **intersezione**, mai l'unione.` },
    { tipo: 'errore', testo: R`$|f(x)|$ e $f(|x|)$ non sono la stessa trasformazione: la prima agisce sul risultato (ribalta sopra l'asse $x$), la seconda sull'argomento (usa e specchia solo la parte con $x \ge 0$).` },
    { tipo: 'trucco', testo: R`Per stabilire se una funzione è pari o dispari, calcola $f(-x)$ e confrontalo sia con $f(x)$ sia con $-f(x)$: se non coincide con nessuno dei due, la funzione non è né pari né dispari (il caso più frequente).` },
    { tipo: 'errore', testo: R`Nella funzione composta $(g \circ f)(x)$ si applica prima $f$, poi $g$: leggila da destra a sinistra, non nell'ordine in cui è scritta.` },
    { tipo: 'metodo', testo: R`Per trovare l'inversa: scambia $x$ e $y$ in $y = f(x)$ e risolvi rispetto alla nuova $y$. Prima però controlla che $f$ sia biunivoca, altrimenti l'inversa non esiste.` },
    { tipo: 'trucco', testo: R`Il grafico di $f^{-1}$ si disegna "a specchio" rispetto alla bisettrice $y = x$, senza fare nessun calcolo: utile per un controllo veloce.` },
    { tipo: 'errore', testo: R`In $y = f(x - h)$ il grafico si sposta a **destra** se $h > 0$, non a sinistra: il segno è controintuitivo. Controlla dove si annulla l'argomento, $x - h = 0$.` },
    { tipo: 'trucco', testo: R`Per leggere dominio e immagine da un grafico, proietta la curva sull'asse $x$ (dominio) e sull'asse $y$ (immagine): sono due proiezioni su assi diversi.` },
    { tipo: 'metodo', testo: R`Il test della retta verticale dice se un grafico è una funzione; il test della retta orizzontale dice se quella funzione è iniettiva. Sono due controlli diversi.` }
  ],

  aneddoti: [
    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'La parola "funzione" compare per la prima volta', testo: R`Nel 1673, in un manoscritto sulle tangenti alle curve, Leibniz usò per primo la parola latina *functio* per indicare una quantità legata ai punti di una curva: la lunghezza della tangente, della sottotangente, del raggio di curvatura. Non era ancora il concetto moderno (pensava a curve geometriche, non a una corrispondenza fra numeri), ma il nome, e l'idea che valesse la pena dargli un nome, restarono. Leibniz discusse per anni, in lettere con Johann Bernoulli, come definire meglio il termine, e fu proprio in quella corrispondenza che la parola cominciò a indicare più in generale un'espressione costruita con una variabile.`, legame: R`È la prima comparsa storica della parola che dà il titolo a questo argomento: prima del 1673, semplicemente, non esisteva.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'La notazione $f(x)$', testo: R`Eulero fu il matematico più prolifico della storia (si stima abbia scritto più di ottocento lavori, molti dettati a memoria negli ultimi anni, quando era ormai completamente cieco). Nel 1734 introdusse, in un articolo per l'Accademia delle Scienze di San Pietroburgo, la notazione $f(x)$ per indicare "una funzione di $x$": prima di lui si scriveva a parole, o si usavano simboli diversi da autore ad autore. Eulero definì anche la funzione in modo più ampio dei suoi predecessori, come una qualunque "espressione analitica" costruita con una variabile, riunendo per la prima volta sotto lo stesso nome polinomi, radici, esponenziali e funzioni goniometriche.`, legame: R`La scrittura $f(x)$ che compare in ogni pagina di questo argomento è, alla lettera, un'invenzione di Eulero.` },
    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'La definizione che vale ancora oggi', testo: R`Nel 1837, studiando quando una serie di seni e coseni (le serie di Fourier) rappresenta davvero una funzione, Dirichlet si accorse che le definizioni precedenti erano troppo strette: legavano il concetto di funzione a un'unica formula o "espressione analitica". Propose allora la definizione che i libri di testo usano ancora oggi: $y$ è funzione di $x$ se ad ogni valore di $x$ in un certo insieme corrisponde uno ed un solo valore di $y$, **qualunque sia la legge** con cui questo valore è determinato: anche senza una formula, anche con regole diverse su parti diverse del dominio. Era, si racconta, un uomo di poche parole: alla nascita del suo primo figlio avrebbe telegrafato al suocero soltanto "$2 + 1 = 3$".`, legame: R`È esattamente la definizione con cui si apre questo argomento: una corrispondenza univoca, non necessariamente una formula.` },
    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'Una funzione impossibile da disegnare', testo: R`Per mostrare quanto possa essere ampia l'idea di funzione, Dirichlet costruì (già nel 1829, sempre studiando le serie di Fourier) un esempio estremo: la funzione che vale $1$ se $x$ è razionale e $0$ se $x$ è irrazionale. È una funzione a tutti gli effetti, perché a ogni $x$ corrisponde un solo valore, eppure non si può disegnare: fra due razionali, per quanto vicini, c'è sempre un irrazionale, e viceversa, quindi il grafico "salta" continuamente fra le altezze $0$ e $1$ senza che nessun tratto, per quanto piccolo, sia tracciabile con un tratto di penna continuo. Da allora si chiama, appunto, **funzione di Dirichlet**.`, legame: R`Ricorda che una funzione non deve avere per forza un grafico "bello" o tracciabile: bastano dominio, codominio e univocità, anche quando il grafico non si può nemmeno disegnare.` }
  ]
});
})();
