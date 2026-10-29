(function () {
const R = String.raw;
/* risposte dell'allenamento. Equazioni: sol(8, -2) accetta i numeri in qualunque ordine;
   NESSUNA ha la stessa casella, così la casella non dice se le soluzioni ci sono.
   Disequazioni: esterni(-2, 1) accetta x<-2 o x>1 in tutte le scritture ragionevoli (o, oppure,
   v, ∨, ∪, ]-inf;-2[ ∪ ]1;+inf[ …); interni(-2, 1) accetta -2<x<1, ]-2;1[, (-2;1), x>-2 e x<1 …;
   con true gli estremi sono compresi (≤ e ≥ diventano <= e >= da soli). */
const SEGNA = 'Le soluzioni (es. -1; 3)', SEGNA_D = 'es. x<-1 o x>3';
const sol = (...v) => ({ tipo: 'numeri', valori: v, segnaposto: SEGNA });
const NESSUNA = { tipo: 'testo', segnaposto: SEGNA, accettate: ['nessuna', 'nessuna soluzione', 'nessuna soluzione reale', 'nessun numero', 'nessuno', 'impossibile', 'non ha soluzioni', 'non ci sono soluzioni', '∅', 'ø', '{}', 'S=∅', 'S={}', 'insieme vuoto', 'vuoto'] };
const INF = ['inf', '∞', 'infinito'], SEP = [';', ','];
const disq = f => ({ tipo: 'testo', accettate: f, segnaposto: SEGNA_D });
const esterni = (a, b, c) => {
  const lt = c ? '<=' : '<', gt = c ? '>=' : '>', f = [];
  const sx = ['x' + lt + a, a + gt + 'x'], dx = ['x' + gt + b, b + lt + 'x'];
  ['o', 'oppure', 'v', '∨', 'u', '∪', ',', ';'].forEach(o => sx.forEach(p => dx.forEach(q => f.push(p + o + q, q + o + p))));
  INF.forEach(i => SEP.forEach(s => {
    const ls = [']', '('].flatMap(ap => (c ? [']'] : ['[', ')']).map(ch => ap + '-' + i + s + a + ch));
    const rs = (c ? ['['] : [']', '(']).flatMap(ap => ['[', ')'].flatMap(ch => ['+', ''].map(p => ap + b + s + p + i + ch)));
    ['u', '∪', 'o', 'v', '∨'].forEach(o => ls.forEach(l => rs.forEach(r => f.push(l + o + r, r + o + l))));
  }));
  return disq(f);
};
const interni = (a, b, c) => {
  const lt = c ? '<=' : '<', gt = c ? '>=' : '>';
  const f = [a + lt + 'x' + lt + b, b + gt + 'x' + gt + a];
  const sx = ['x' + gt + a, a + lt + 'x'], dx = ['x' + lt + b, b + gt + 'x'];
  ['e', 'ed', '∧', ',', ';'].forEach(o => sx.forEach(p => dx.forEach(q => f.push(p + o + q, q + o + p))));
  SEP.forEach(s => (c ? [['[', ']']] : [[']', '['], ['(', ')']]).forEach(([ap, ch]) => f.push(ap + a + s + b + ch)));
  return disq(f);
};
COMPASSO.registra({
  id: 'valore-assoluto-irrazionali',
  titolo: 'Valore assoluto e irrazionali',

  introduzione: R`Una fabbrica taglia barre lunghe $50$ cm. Accetta un errore di $2$ mm, in più o in meno. Quindi una barra lunga $x$ cm va bene se $x$ dista da $50$ al massimo $0{,}2$. Si scrive $|x - 50| \le 0{,}2$.

Il simbolo $|\ |$ è il **valore assoluto**. Misura quanto un numero è lontano da un altro, a destra o a sinistra.

Le equazioni con il valore assoluto si risolvono **per casi**. Poi ci sono le **equazioni irrazionali**, con l'incognita sotto una radice. Per togliere la radice elevi al quadrato. Ma il quadrato può aggiungere soluzioni false, dette **estranee**: vanno riconosciute e scartate.

Ti servono le equazioni e le disequazioni di secondo grado.`,

  inBreve: [
    R`$|a|$ è la distanza di $a$ da zero, quindi non è mai negativo.`,
    R`$|x-3|=5$ vuol dire $x-3=5$ oppure $x-3=-5$.`,
    R`$|A|<k$ diventa $-k<A<k$: un tratto solo. $|A|>k$ diventa $A<-k$ oppure $A>k$: due pezzi.`,
    R`In $|A|=B$ risolvi $A=B$ e $A=-B$. Poi tieni solo le soluzioni con $B\ge 0$.`,
    R`In $\sqrt{A}=B$ imponi $B\ge 0$ e poi elevi al quadrato. Oppure controlli ogni soluzione nell'equazione di partenza.`,
    R`Con la radice cubica non serve nessuna condizione: elevi al cubo e basta.`
  ],

  sezioni: [
    { id: 'definizione-valore-assoluto', titolo: 'Il valore assoluto: definizione e proprietà', testo: R`Quanto dista $-7$ da zero? Sette passi, proprio come $7$. Questa distanza si chiama **valore assoluto**, o **modulo**, e si scrive fra due sbarre: $|7| = 7$ e $|{-7}| = 7$.

[[video:valore-assoluto-irrazionali/distanza]]

Per calcolarlo guarda il segno. Un numero positivo resta com'è, mentre a un numero negativo cambi segno.

>* **Definizione.** $$|a| = \begin{cases} a & \text{se } a \ge 0 \\ -a & \text{se } a < 0 \end{cases}$$ Se $a$ è negativo, $-a$ è positivo: per $a = -7$ si ha $-a = 7$. Il risultato non è mai negativo.

?? Sia $a < 0$. Quale scrittura è uguale a $|a|$?
[x] $-a$
[ ] $a$
[ ] $-|a|$
=> Prova con $a = -3$: $|a| = 3$, e $-a = -(-3) = 3$. Il meno davanti alla lettera cambia segno a un numero già negativo. Invece $a$ e $-|a|$ valgono $-3$: sono negativi, quindi non sono un valore assoluto.

La stessa regola vale con un'espressione fra le sbarre, quindi devi capire **dove** è positiva e dove è negativa. Questo lavoro si chiama «sciogliere il modulo».

~ |x - 3| :: dentro le sbarre c'è $x - 3$
~ x - 3 \ge 0 \iff \evid{x \ge 3} :: studio il segno di quello che sta dentro
~ |x - 3| = \evid{x - 3} \quad \text{se } x \ge 3 :: dove è positivo o nullo, lo copio così com'è
~ |x - 3| = \evid{-(x - 3)} = \evidb{3 - x} \quad \text{se } x < 3 :: dove è negativo, cambio segno a **tutta** l'espressione

$|a - b|$ è la distanza fra $a$ e $b$. Per esempio $|2 - 5| = 3$: fra $2$ e $5$ ci sono tre passi.

[[grafico:assolutoTrascina]]

Le proprietà che ti servono:

- $|a| \ge 0$, e $|a| = 0$ solo quando $a = 0$;
- $|{-a}| = |a|$;
- $|a \cdot b| = |a| \cdot |b|$ e $\left|\dfrac{a}{b}\right| = \dfrac{|a|}{|b|}$ (con $b \ne 0$);
- $|a|^2 = a^2$: elevando al quadrato le sbarre spariscono, e il segno non conta più.

>! $|a + b|$ **non** è uguale a $|a| + |b|$. Per esempio $|4 + (-6)| = |{-2}| = 2$, ma $|4| + |{-6}| = 10$.` },

    { id: 'equazioni-valore-assoluto', titolo: 'Equazioni con il valore assoluto', testo: R`Quali numeri hanno valore assoluto $2$? Solo $2$ e $-2$. Quindi se $|A| = 2$, allora $A = 2$ oppure $A = -2$. Risolvi **due** equazioni senza sbarre.

Le forme sono tre, e cambia solo il controllo finale:

| forma | si risolvono | controllo |
|---|---|---|
| $\lvert A(x)\rvert = k$, con $k$ numero | $A = k$ e $A = -k$ | se $k < 0$ è impossibile; se $k = 0$ basta $A = 0$ |
| $\lvert A(x)\rvert = B(x)$ | $A = B$ e $A = -B$ | si tengono solo le soluzioni con $B(x) \ge 0$ |
| $\lvert A(x)\rvert = \lvert B(x)\rvert$ | $A = B$ e $A = -B$ | nessuno |

**Primo caso.** $|x - 1| = 2$ dà $x - 1 = 2$, cioè $x = 3$, oppure $x - 1 = -2$, cioè $x = -1$. Infatti $3$ e $-1$ distano $2$ da $1$. Invece $|x - 1| = -2$ non ha soluzioni: un modulo non è mai negativo.

**Secondo caso.** A destra c'è un'espressione, e in certi punti è negativa. Lì il modulo non può esserle uguale, quindi le soluzioni che cadono lì si scartano.

~ |x + 3| = 2x :: a destra c'è un'espressione: servirà un controllo alla fine
~ x + 3 = \evid{2x} \Rightarrow x = 3 :: primo caso: dentro le sbarre c'è proprio $2x$
~ x + 3 = \evid{-2x} \Rightarrow 3x = -3 \Rightarrow x = -1 :: secondo caso: dentro le sbarre c'è l'opposto di $2x$
~ x = 3:\ 2x = 6 \ge 0 \quad \evidb{\text{accettabile}} :: controllo il segno del secondo membro
~ x = -1:\ 2x = -2 < 0 \quad \evidb{\text{da scartare}} :: infatti $|{-1} + 3| = 2$, che non è $-2$

?? Risolvendo $|x - 5| = x - 7$ con i due casi, il primo dà $-5 = -7$ (falso) e il secondo dà $x = 6$. Quali sono le soluzioni?
[x] nessuna: l'equazione è impossibile
[ ] $x = 6$
[ ] $x = 6$ e $x = -6$
=> Per $x = 6$ il secondo membro vale $6 - 7 = -1$: un modulo non può valere $-1$. Scartato $6$, non resta niente. Chi risponde $x = 6$ ha saltato il controllo del segno di $B(x)$.

**Terzo caso.** $|A| = |B|$ vuol dire $A = B$ oppure $A = -B$. Non serve nessun controllo: i due membri non sono mai negativi.

>! In $|A(x)| = B(x)$ il controllo del segno di $B(x)$ è obbligatorio.` },

    { id: 'grafico-modulo', titolo: 'Il grafico di y = |f(x)|', testo: R`Dal grafico di $y = f(x)$ ottieni quello di $y = |f(x)|$ senza conti. Dove la $y$ è positiva, resta com'è. Dove è negativa, cambia segno: il punto va nel suo simmetrico rispetto all'asse $x$.

[[video:valore-assoluto-irrazionali/grafico-modulo]]

>* **Regola.** Dove il grafico di $f$ sta sopra l'asse $x$, o sull'asse, non cambia. Dove sta sotto, si **ribalta verso l'alto**, come in uno specchio.

Per esempio $y = |x - 1|$. La retta $y = x - 1$ sta sotto l'asse per $x < 1$. Ribalti quel tratto e ottieni una **V** con la punta in $(1; 0)$.

Con una parabola vedi bene che cosa si ribalta.

[[grafico:ribaltaParabola]]

Dove il grafico di $f$ attraversa l'asse $x$ si formano delle punte, dette **punti angolosi**. Per $y = |x^2 - 4|$ sono in $x = -2$ e $x = 2$.

?? Com'è fatto il grafico di $y = |x^2 + 1|$?
[x] è identico a quello di $y = x^2 + 1$
[ ] è la parabola $y = x^2 + 1$ capovolta verso il basso
[ ] ha due punti angolosi, in $x = -1$ e $x = 1$
=> $x^2 + 1$ vale almeno $1$: la parabola sta tutta sopra l'asse e non c'è niente da ribaltare. Il modulo alza, non abbassa. E le punte nascono solo dove $f(x) = 0$.

>! Il modulo alza le parti sotto l'asse e **non tocca** quelle sopra.` },

    { id: 'disequazioni-valore-assoluto-rapide', titolo: 'Disequazioni |A| < k e |A| > k: le forme rapide', testo: R`Quali numeri distano da $1$ meno di $2$? Quelli fra $-1$ e $3$. In simboli, $|x - 1| < 2$ vuol dire $-1 < x < 3$. Quelli che distano **più** di $2$ stanno fuori: $x < -1$ oppure $x > 3$.

Al variare di $k$, guarda dove la retta $y=k$ taglia la V.

[[grafico:assolutoParametro]]

>* **Forme rapide**, con $k > 0$. $|A| < k$ diventa $-k < A < k$: $A$ sta **dentro**. $|A| > k$ diventa $A < -k$ oppure $A > k$: $A$ sta **fuori**.

Con il «minore» risolvi una doppia disuguaglianza. Fai la stessa operazione su tutti e tre i membri:

~ |2x - 5| \le 3 :: la forma è $|A| \le k$ con $k = 3$
~ -3 \le 2x - 5 \le 3 :: l'espressione dentro sta fra $-3$ e $3$
~ \evid{2} \le 2x \le \evid{8} :: aggiungo $5$ a tutti e tre i membri
~ \evidb{1 \le x \le 4} :: divido tutto per $2$, che è positivo: i versi restano. È l'intervallo $\Icc{1}{4}$

Con il «maggiore» risolvi due disequazioni e **unisci** le soluzioni:

~ |2x + 1| > 3 :: la forma è $|A| > k$ con $k = 3$
~ 2x + 1 < -3 \quad \lor \quad 2x + 1 > 3 :: l'espressione sta sotto $-3$ oppure sopra $3$
~ 2x < -4 \quad \lor \quad 2x > 2 :: tolgo $1$ in tutte e due
~ \evidb{x < -2 \quad \lor \quad x > 1} :: divido per $2$; il simbolo $\lor$ si legge «oppure». Con gli intervalli: $\Iaa{-\infty}{-2}\cup\Iaa{1}{+\infty}$

?? Quali sono le soluzioni di $|x| > 4$?
[x] $x < -4$ oppure $x > 4$
[ ] $x > 4$
[ ] $-4 < x < 4$
=> Servono i numeri che distano da $0$ più di $4$, da tutte e due le parti. Anche $-5$ va bene: $|{-5}| = 5 > 4$. Chi scrive solo $x > 4$ ha perso la parte negativa.

Se $k$ è negativo o zero non servono conti, perché un modulo non è mai negativo:

| disequazione | $k < 0$ | $k = 0$ |
|---|---|---|
| $\lvert A\rvert < k$ | impossibile | impossibile |
| $\lvert A\rvert > k$ | sempre vera | vera tranne dove $A = 0$ |

>! $|A| > k$ non si scrive $-k > A > k$: nessun numero è insieme minore di $-k$ e maggiore di $k$. Scrivi le due parti separate, con «oppure».` },

    { id: 'disequazioni-valore-assoluto-sistemi', titolo: 'Disequazioni |A| < B e |A| > B: quando serve il sistema', testo: R`Ora a destra c'è un'espressione $B(x)$ al posto del numero $k$. L'idea è la stessa: con il «minore» $A$ sta fra $-B$ e $B$, con il «maggiore» sta fuori. Ma $B$ dipende da $x$, quindi la doppia disuguaglianza diventa due disequazioni.

>* $$|A| < B \iff \begin{cases} A < B \\ A > -B \end{cases}$$ $$|A| > B \iff A > B \ \lor\ A < -B$$ Con il «minore» è un **sistema**: devono valere tutte e due. Con il «maggiore» è un'**unione**: basta che ne valga una.

~ |2x - 1| < x + 2 :: la forma è $|A| < B$: serve un sistema
~ 2x - 1 < x + 2 \Rightarrow \evid{x < 3} :: prima disequazione, $A < B$
~ 2x - 1 > -x - 2 \Rightarrow 3x > -1 \Rightarrow \evid{x > -\tfrac{1}{3}} :: seconda, $A > -B$: attento a cambiare segno a tutti e due i termini di $B$
~ \evidb{-\tfrac{1}{3} < x < 3} :: è un sistema: tengo solo i numeri che soddisfano tutte e due. È l'intervallo $\Iaa{-\tfrac13}{3}$

Non serve aggiungere $B(x) > 0$: il sistema lo contiene già.

Con il «maggiore» a volte un pezzo non dà niente. In $|x - 3| > x - 1$ il primo pezzo è $x - 3 > x - 1$, cioè $-3 > -1$: sempre falso. Il secondo è $x - 3 < -x + 1$, cioè $x < 2$, e quindi resta solo questo.

?? Senza fare conti: la disequazione $|x| < x - 1$ ha soluzioni?
=> No. Il sistema chiede $x < x - 1$, cioè $0 < -1$: falso per ogni $x$.

>! Qui non puoi guardare il segno di $B$ una volta sola, come con $k$: $B(x)$ cambia segno. Il sistema tiene conto di tutti i casi.` },

    { id: 'equazioni-irrazionali-una-radice', titolo: 'Equazioni irrazionali con una radice', testo: R`Un'equazione è **irrazionale** se l'incognita sta sotto una radice. Per esempio $\sqrt{x + 10} = x - 2$.

Per togliere la radice elevi al quadrato i due membri. Ma il quadrato cancella il segno: $3^2$ e $(-3)^2$ fanno tutti e due $9$. Così possono comparire soluzioni in più, dette **soluzioni estranee**.

[[video:valore-assoluto-irrazionali/soluzioni-in-piu]]

Una radice quadrata non è mai negativa. Quindi $\sqrt{A} = B$ può essere vera solo dove $B \ge 0$. Questa condizione scarta le estranee.

>* $$\sqrt{A} = B \iff \begin{cases} B \ge 0 \\ A = B^2 \end{cases}$$ $A$ e $B$ sono espressioni in $x$. La condizione $A \ge 0$ non serve: $A$ è uguale a un quadrato.

~ \sqrt{x + 10} = x - 2 :: a destra c'è un'espressione che può essere negativa
~ \evid{x - 2 \ge 0} \Rightarrow x \ge 2 :: prima la condizione: la radice non può uguagliare un numero negativo
~ x + 10 = \evid{(x - 2)^2} = x^2 - 4x + 4 :: elevo al quadrato i due membri
~ x^2 - 5x - 6 = 0 \Rightarrow (x - 6)(x + 1) = 0 :: porto tutto a destra e scompongo: due numeri con somma $-5$ e prodotto $-6$
~ x = 6 \quad \lor \quad x = -1 :: le soluzioni dell'equazione elevata al quadrato
~ \evidb{x = 6} :: solo $6$ rispetta $x \ge 2$; con $x = -1$ si avrebbe $\sqrt{9} = -3$, falso

Nel grafico le soluzioni sono i punti dove la retta incontra la curva della radice. Il quadrato aggiunge la curva tratteggiata, $y = -\sqrt{x + 10}$: lì cade la soluzione estranea.

[[grafico:irrazionaleEstranea]]

C'è anche un'altra strada. Elevi al quadrato senza condizioni e risolvi. Poi **sostituisci** ogni soluzione nell'equazione di partenza, e tieni quelle che funzionano.

?? Risolvendo $\sqrt{x + 1} = x - 5$ ed elevando al quadrato si trova $x = 3$ oppure $x = 8$. Quali sono le soluzioni?
[x] solo $x = 8$
[ ] $x = 3$ e $x = 8$
[ ] solo $x = 3$
=> Serve $x - 5 \ge 0$, cioè $x \ge 5$: resta solo $8$. Infatti $\sqrt{9} = 3$ e $8 - 5 = 3$. Per $x = 3$ verrebbe $\sqrt{4} = -2$, falso. Chi le tiene tutte e due ha controllato solo che la radice esista.

### Indice dispari
Con la radice cubica il problema non c'è. La radice cubica esiste anche per i negativi: $\sqrt[3]{-8} = -2$. E il cubo non cancella il segno, quindi elevi al cubo senza condizioni.

~ \sqrt[3]{x^3 - 7} = x - 1 :: indice dispari: nessuna condizione
~ x^3 - 7 = \evid{(x - 1)^3} = x^3 - 3x^2 + 3x - 1 :: elevo al cubo i due membri
~ 3x^2 - 3x - 6 = 0 \Rightarrow x^2 - x - 2 = 0 :: i cubi si cancellano; divido per $3$
~ \evidb{x = 2 \quad \lor \quad x = -1} :: tutte e due valgono: per $x = -1$, $\sqrt[3]{-8} = -2$, e anche $x - 1 = -2$

>! L'errore tipico: controllare solo $A(x) \ge 0$ e dimenticare $B(x) \ge 0$. È la seconda condizione che scarta le estranee.` },

    { id: 'equazioni-irrazionali-due-radici', titolo: 'Equazioni irrazionali con due radici', testo: R`Con due radici, le togli una alla volta: elevi al quadrato due volte.

Il caso più facile è $\sqrt{A} = \sqrt{B}$. I due membri non sono mai negativi, quindi elevi al quadrato una volta sola. Poi controlli che le radici esistano, ma basta un radicando perché, se $A = B$, l'altro è uguale.

>* $$\sqrt{A} = \sqrt{B} \iff \begin{cases} A = B \\ A \ge 0 \end{cases}$$

Per esempio $\sqrt{3x + 1} = \sqrt{x + 9}$ dà $3x + 1 = x + 9$, cioè $x = 4$. E $3 \cdot 4 + 1 = 13 \ge 0$: va bene.

Con un altro termine, come in $\sqrt{x + 7} - \sqrt{x + 2} = 1$, segui questi passi:

1. Scrivi le condizioni di esistenza: ogni radicando $\ge 0$.
2. Lascia **una** radice da sola in un membro.
3. Eleva al quadrato: una radice sparisce.
4. Isola la radice rimasta ed eleva di nuovo al quadrato.
5. Risolvi e **sostituisci** ogni soluzione nell'equazione di partenza.

~ \sqrt{x + 7} - \sqrt{x + 2} = 1 :: c.e.: $x + 7 \ge 0$ e $x + 2 \ge 0$, cioè $x \ge -2$
~ \sqrt{x + 7} = \evid{1 + \sqrt{x + 2}} :: sposto l'altra radice a destra, così a sinistra ne resta una sola
~ x + 7 = \evid{1 + 2\sqrt{x + 2} + (x + 2)} :: elevo al quadrato: a destra è il quadrato di un binomio, e c'è il doppio prodotto
~ 4 = 2\sqrt{x + 2} \Rightarrow \sqrt{x + 2} = 2 :: tolgo $x + 3$ da tutte e due le parti e divido per $2$
~ x + 2 = 4 \Rightarrow \evidb{x = 2} :: elevo al quadrato la seconda volta
~ \sqrt{9} - \sqrt{4} = 3 - 2 = 1 :: verifica nell'equazione di partenza: funziona

Non saltare il quinto passo. Dopo due quadrati è difficile seguire tutte le condizioni, invece sostituire è sicuro.

?? Quanto fa $\left(1 + \sqrt{x + 2}\right)^2$?
[x] $1 + 2\sqrt{x + 2} + x + 2$
[ ] $1 + x + 2$
[ ] $1 + \sqrt{x + 2} + x + 2$
=> È il quadrato di un binomio, $(a + b)^2 = a^2 + 2ab + b^2$, con $a = 1$ e $b = \sqrt{x + 2}$. Il doppio prodotto $2\sqrt{x + 2}$ non sparisce. Elevare «termine per termine» è l'errore più frequente.

>! Con due radici la verifica finale fa parte della soluzione.` },

    { id: 'disequazioni-irrazionali', titolo: 'Disequazioni irrazionali: √A < B e √A > B', testo: R`Anche qui serve un sistema. Ma devi chiederti di nuovo che cosa succede quando il secondo membro è negativo. La risposta cambia con il verso.

### Radice minore di B
Una radice non è mai negativa, quindi non può essere minore di un numero negativo. Allora $\sqrt{A} < B$ chiede $B > 0$. Poi servono la radice che esiste e il confronto dei quadrati.

>* $$\sqrt{A} < B \iff \begin{cases} A \ge 0 \\ B > 0 \\ A < B^2 \end{cases}$$

Per esempio $\sqrt{x - 1} < 3$. La radice esiste per $x \ge 1$. $3 > 0$ è sempre vero. $x - 1 < 9$ dà $x < 10$. Quindi $1 \le x < 10$, cioè $\Ica{1}{10}$.

?? Risolvendo $\sqrt{x} < x - 2$ un compagno scrive $x \ge 0$ e $x < (x - 2)^2$, e trova $0 \le x < 1 \ \lor\ x > 4$. Che cosa non va?
[x] ha dimenticato $x - 2 > 0$: la soluzione è solo $x > 4$
[ ] niente, la soluzione è giusta
[ ] ha sbagliato il trinomio: la soluzione è $1 < x < 4$
=> Prova $x = 0$: diventa $0 < -2$, falso. Nel pezzo $0 \le x < 1$ il secondo membro $x - 2$ è negativo, e lì una radice non può essere più piccola. Con $x - 2 > 0$, cioè $x > 2$, resta solo $x > 4$.

### Radice maggiore di B
Qui i casi sono due, e si **uniscono**:

- se $B(x) < 0$, la radice è sempre più grande, basta che esista;
- se $B(x) \ge 0$, confronti i quadrati.

>* $$\sqrt{A} > B \iff$$ $$\begin{cases} A \ge 0 \\ B < 0 \end{cases} \ \lor\ \begin{cases} B \ge 0 \\ A > B^2 \end{cases}$$

~ \sqrt{x + 2} > x :: il secondo membro è $x$, che può essere negativo o no: servono tutti e due i sistemi
~ \begin{cases} x + 2 \ge 0 \\ x < 0 \end{cases} \Rightarrow \evid{-2 \le x < 0} :: primo sistema: dove $x < 0$ la radice vince da sola, basta che esista
~ \begin{cases} x \ge 0 \\ x + 2 > x^2 \end{cases} :: secondo sistema: qui $x \ge 0$ e il confronto va fatto
~ x^2 - x - 2 < 0 \Rightarrow \evid{-1 < x < 2} :: il trinomio si annulla in $-1$ e $2$ ed è negativo fra i due
~ \evid{0 \le x < 2} :: tengo la parte comune con $x \ge 0$
~ \evidb{-2 \le x < 2} :: unisco i due sistemi: i pezzi si attaccano in $0$. È l'intervallo $\Ica{-2}{2}$

>! Con il «maggiore» l'errore più comune è dimenticare il primo sistema, quello con $B(x) < 0$. Così perdi soluzioni valide.` }
  ],

  grafici: {
    assolutoTrascina: {
      tipo: 'piano', x: [-5, 5], y: [-2, 6],
      parametri: [ { nome: 'p', min: -4, max: 4, passo: 0.1, valore: 3.5, nascosto: true } ],
      funzioni: [ { f: 'abs(x-1)', etichetta: 'y = |x − 1|', colore: 1 } ],
      elementi: [
        { tipo: 'segmento', da: [1, 0], a: ['p', 0], colore: 3 },
        { tipo: 'segmento', da: ['p', 0], a: ['p', 'abs(p-1)'], colore: 3, tratteggio: true },
        { tipo: 'punto', p: [1, 0], etichetta: '1', posizione: 'basso', colore: 3 },
        { tipo: 'punto', p: ['p', 'abs(p-1)'], colore: 1 },
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'p', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-4.7, -1.4], testo: 'distanza fra p e 1:  |p − 1| = {{abs(p-1)}}', ancora: 'start' }
      ],
      didascalia: "Trascina p lungo l'asse x. Il tratto verde da 1 a p è lungo |p − 1|; guarda che la stessa lunghezza, messa in piedi sopra p, arriva proprio sulla V di y = |x − 1|."
    },
    ribaltaParabola: {
      tipo: 'piano', x: [-4, 4], y: [-5, 7],
      parametri: [ { nome: 'v', min: -4.5, max: 3, passo: 0.1, valore: -4, nascosto: true } ],
      funzioni: [
        { f: 'x^2 + v', etichetta: 'y = f(x)', colore: 2, tratteggio: true },
        { f: 'abs(x^2 + v)', etichetta: 'y = |f(x)|', colore: 1 }
      ],
      elementi: [
        { tipo: 'punto', p: [0, 'v'], trascina: true, etichetta: 'V', posizione: 'sinistra', colore: 2 },
        { tipo: 'testo', p: [0.7, -4.6], testo: 'f(x) = x² + ({{v}})', ancora: 'start' }
      ],
      didascalia: "Trascina il vertice V della parabola tratteggiata su e giù. Guarda quale pezzo di y = |f(x)| si stacca: solo quello che finisce sotto l'asse x, e le punte nascono dove la parabola taglia l'asse."
    },
    assolutoParametro: {
      tipo: 'piano', x: [-4, 6], y: [-3, 6],
      parametri: [ { nome: 'k', min: -2, max: 4, passo: 0.5, valore: 2, etichetta: 'k' } ],
      funzioni: [
        { f: 'abs(x-1)', etichetta: 'y = |x − 1|', colore: 1 },
        { f: 'abs(x-1) + 0*sqrt(k - abs(x-1))', colore: 3 },
        { f: '0*sqrt(k - abs(x-1))', colore: 3 }
      ],
      elementi: [
        { tipo: 'orizzontale', y: 'k', etichetta: 'y = k', colore: 2 },
        { tipo: 'testo', p: [1.6, -2.3], testo: 'in verde: |x − 1| < k', ancora: 'start' }
      ],
      punti: [
        { x: '1 - sqrt(k)*sqrt(k)', y: 'k', etichetta: '1 − k', posizione: 'alto-sinistra', colore: 2 },
        { x: '1 + sqrt(k)*sqrt(k)', y: 'k', etichetta: '1 + k', posizione: 'alto-destra', colore: 2 }
      ],
      didascalia: "Muovi k e conta i punti in cui la retta taglia la V: sono le soluzioni di |x − 1| = k. Il pezzo di V che resta sotto la retta diventa verde, e sull'asse x si colorano le sue x: sono le soluzioni di |x − 1| < k. Che cosa succede quando k diventa negativo?"
    },
    irrazionaleEstranea: {
      tipo: 'piano', x: [-10.5, 8.5], y: [-5, 5.5], altezza: 400,
      parametri: [ { nome: 'q', min: -3, max: 5, passo: 0.5, valore: -2, nascosto: true } ],
      funzioni: [
        { f: 'sqrt(x+10)', colore: 1 },
        { f: '-sqrt(x+10)', colore: 1, tratteggio: true },
        { f: 'x + q', colore: 2 }
      ],
      elementi: [
        { tipo: 'punto', p: [0, 'q'], trascina: true, etichetta: 'q', posizione: 'destra', colore: 2 },
        { tipo: 'punto', p: ['(1 + sqrt(41 - 4*q))/2 - q', '(1 + sqrt(41 - 4*q))/2'], etichetta: 'soluzione', posizione: 'alto-sinistra', colore: 1 },
        { tipo: 'punto', p: ['(1 - sqrt(41 - 4*q))/2 - q', '(1 - sqrt(41 - 4*q))/2'], etichetta: 'estranea', posizione: 'sinistra', colore: 4, vuoto: true },
        { tipo: 'testo', p: [-10.1, 4.8], testo: '√(x + 10) = x + ({{q}})', ancora: 'start' }
      ],
      didascalia: "Trascina q sull'asse y per spostare la retta y = x + q. La soluzione vera è sempre sulla curva piena; guarda dove cade quella estranea: sul ramo tratteggiato y = −√(x + 10), che compare solo quando si eleva al quadrato."
    }
  },

  esempi: [
    { titolo: 'Equazione con due valori assoluti', problema: R`Risolvi $|x - 4| = |3x|$.`, passi: [
      R`È il caso $|A| = |B|$: non serve nessuna condizione aggiuntiva, basta risolvere $A = B$ e $A = -B$.`,
      R`$x - 4 = 3x \Rightarrow -4 = 2x \Rightarrow x = -2$.`,
      R`$x - 4 = -3x \Rightarrow 4x = 4 \Rightarrow x = 1$.`,
      R`Verifica: per $x=-2$, $|{-6}| = 6$ e $|{-6}| = 6$ ✓; per $x=1$, $|{-3}| = 3$ e $|3| = 3$ ✓.`
    ], risultato: R`$x = -2 \lor x = 1$` },

    { titolo: 'Disequazione con valore assoluto: la forma rapida', problema: R`Risolvi $|4x + 1| > 7$.`, passi: [
      R`È il caso $|A| > k$ con $k = 7 > 0$: si separa in $A > k$ oppure $A < -k$.`,
      R`$4x + 1 > 7 \Rightarrow 4x > 6 \Rightarrow x > \dfrac{3}{2}$.`,
      R`$4x + 1 < -7 \Rightarrow 4x < -8 \Rightarrow x < -2$.`,
      R`Le due condizioni si uniscono con «oppure», perché il modulo deve superare $7$ da uno dei due lati.`
    ], risultato: R`$x < -2 \lor x > \dfrac{3}{2}$, cioè $\Iaa{-\infty}{-2}\cup\Iaa{\tfrac32}{+\infty}$` },

    { titolo: "Un'equazione con il valore assoluto su un solo membro", problema: R`Risolvi $|x - 1| = 2x - 4$.`, passi: [
      R`È il caso $|A| = B$: si risolvono $A = B$ e $A = -B$, poi si tengono solo le soluzioni con $B(x) \ge 0$.`,
      R`$x - 1 = 2x - 4 \Rightarrow -x = -3 \Rightarrow x = 3$.`,
      R`$x - 1 = -(2x - 4) \Rightarrow x - 1 = -2x + 4 \Rightarrow 3x = 5 \Rightarrow x = \dfrac{5}{3}$.`,
      R`Verifico il segno di $B(x) = 2x - 4$: in $x = 3$, $B = 2 \ge 0$, accettabile; in $x = \dfrac{5}{3}$, $B = -\dfrac{2}{3} < 0$, da scartare.`
    ], risultato: R`$x = 3$ (l'altra soluzione algebrica, $x = \dfrac{5}{3}$, è estranea)` },

    { titolo: 'Disequazione con valore assoluto: il sistema', problema: R`Risolvi $|3x - 1| < x + 5$.`, passi: [
      R`È il caso $|A| < B$: sistema fra $A < B$ e $A > -B$.`,
      R`$3x - 1 < x + 5 \Rightarrow 2x < 6 \Rightarrow x < 3$.`,
      R`$3x - 1 > -(x + 5) \Rightarrow 3x - 1 > -x - 5 \Rightarrow 4x > -4 \Rightarrow x > -1$.`,
      R`Intersezione delle due condizioni: $-1 < x < 3$.`
    ], risultato: R`$-1 < x < 3$, cioè $\Iaa{-1}{3}$` },

    { titolo: 'Equazione irrazionale con un indice pari', problema: R`Risolvi $\sqrt{x + 14} = x + 2$.`, passi: [
      R`Il secondo membro $x + 2$ può essere negativo, e una radice non lo è mai: impongo $x + 2 \ge 0$, cioè $x \ge -2$.`,
      R`Elevo al quadrato i due membri: $x + 14 = (x+2)^2 = x^2 + 4x + 4$.`,
      R`Porto tutto a destra per avere un'equazione di secondo grado in forma normale: $x^2 + 3x - 10 = 0$.`,
      R`$\Delta = 9 + 40 = 49$, quindi $x = \dfrac{-3 \pm 7}{2}$: $x = 2$ oppure $x = -5$.`,
      R`Confronto con la condizione: $2 \ge -2$ va bene, $-5$ no e si scarta. Verifica: $\sqrt{16} = 4$ e $2 + 2 = 4$. ✓`
    ], risultato: R`$x = 2$` },

    { titolo: 'Equazione irrazionale con due radici', problema: R`Risolvi $\sqrt{x + 5} - \sqrt{x - 3} = 2$.`, passi: [
      R`C.e.: i radicandi non possono essere negativi, $x + 5 \ge 0$ e $x - 3 \ge 0$, cioè $x \ge 3$.`,
      R`Sposto la seconda radice a destra, così a sinistra ne resta una sola: $\sqrt{x + 5} = 2 + \sqrt{x - 3}$.`,
      R`Elevo al quadrato; a destra c'è il quadrato di un binomio, con il doppio prodotto: $x + 5 = 4 + 4\sqrt{x-3} + x - 3$.`,
      R`Tolgo $x + 1$ da entrambi i membri, così la radice rimasta resta sola: $4 = 4\sqrt{x - 3}$, cioè $\sqrt{x - 3} = 1$.`,
      R`Elevo al quadrato la seconda volta: $x - 3 = 1$, quindi $x = 4$, che rispetta $x \ge 3$.`,
      R`Dopo due quadrati verifico sostituendo: $\sqrt{9} - \sqrt{1} = 3 - 1 = 2$. ✓`
    ], risultato: R`$x = 4$` }
  ],

  formulario: [
    { nome: 'Definizione di valore assoluto', formula: R`|a| = \begin{cases} a & \text{se } a \ge 0 \\ -a & \text{se } a < 0 \end{cases}` },
    { nome: 'Valore assoluto di un prodotto', formula: R`|a \cdot b| = |a| \cdot |b|`, nota: R`Vale la stessa proprietà per il quoziente, con $b \ne 0$.` },
    { nome: 'Proprietà fondamentali', formula: R`\begin{gathered} |a| \ge 0 \\ |{-a}| = |a| \\ |a| = 0 \iff a = 0 \end{gathered}` },
    { nome: 'Quadrato del valore assoluto', formula: R`\begin{gathered} |a|^2 = a^2 \\ \sqrt{a^2} = |a| \end{gathered}`, nota: R`Questa identità collega il valore assoluto alle equazioni irrazionali: elevare al quadrato «toglie» il modulo.` },
    { nome: 'Equazione |A| = k', formula: R`\begin{gathered} |A(x)| = k \ (k>0) \ \Rightarrow \\ A(x) = k \ \lor\ A(x) = -k \end{gathered}`, nota: R`Impossibile se $k<0$; se $k=0$ si risolve solo $A(x)=0$.` },
    { nome: 'Equazione |A| = B', formula: R`\begin{gathered} |A(x)| = B(x) \ \Rightarrow \\ A(x)=B(x) \ \lor\ A(x)=-B(x) \end{gathered}`, nota: R`Le soluzioni trovate vanno accettate solo se $B(x) \ge 0$.` },
    { nome: 'Disequazioni rapide (k costante)', formula: R`\begin{gathered} |A(x)| < k \iff -k<A(x)<k \\ |A(x)|>k \iff \\ A(x)<-k \ \lor\ A(x)>k \end{gathered}`, nota: R`Valide solo con $k>0$.` },
    { nome: 'Disequazioni con secondo membro variabile', formula: R`\begin{gathered} |A(x)|<B(x) \iff \begin{cases} A(x)<B(x) \\ A(x)>-B(x)\end{cases} \\ |A(x)|>B(x) \iff \\ A(x)>B(x) \ \lor\ A(x)<-B(x) \end{gathered}` },
    { nome: 'Equazione irrazionale (indice pari)', formula: R`\sqrt{A(x)} = B(x) \iff \begin{cases} B(x) \ge 0 \\ A(x) = [B(x)]^2 \end{cases}` },
    { nome: 'Equazione irrazionale (indice dispari)', formula: R`\sqrt[3]{A(x)} = B(x) \iff A(x) = [B(x)]^3`, nota: R`Nessuna condizione: il cubo è reversibile su tutto $\mathbb{R}$.` },
    { nome: 'Disequazione √A < B', formula: R`\sqrt{A(x)} < B(x) \iff \begin{cases} A(x)\ge 0 \\ B(x)>0 \\ A(x)<[B(x)]^2 \end{cases}` },
    { nome: 'Disequazione √A > B', formula: R`\begin{gathered} \sqrt{A(x)} > B(x) \iff \\ \begin{cases} A(x)\ge 0 \\ B(x)<0\end{cases} \ \lor\ \begin{cases} B(x)\ge 0 \\ A(x)>[B(x)]^2\end{cases} \end{gathered}` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione-valore-assoluto', tipo: 'definizione', fronte: R`Definizione di $|a|$`, retro: R`$a$ se $a \ge 0$, $-a$ se $a<0$: è la distanza di $a$ da $0$.` },
    { id: 'fc-02', sezione: 'definizione-valore-assoluto', tipo: 'concetto', fronte: R`Perché $|a| \ge 0$ sempre?`, retro: R`Perché è una distanza, e una distanza non è mai negativa.` },
    { id: 'fc-03', sezione: 'definizione-valore-assoluto', tipo: 'formula', fronte: R`$|a|^2$`, retro: R`$|a|^2 = a^2$: è la proprietà che permette di eliminare il modulo elevando al quadrato.` },
    { id: 'fc-04', sezione: 'equazioni-valore-assoluto', tipo: 'procedura', fronte: R`Come si risolve $|A(x)| = k$ con $k>0$?`, retro: R`Si risolvono $A(x)=k$ e $A(x)=-k$: nessun'altra condizione.` },
    { id: 'fc-05', sezione: 'equazioni-valore-assoluto', tipo: 'procedura', fronte: R`Come si risolve $|A(x)| = B(x)$?`, retro: R`Si risolvono $A=B$ e $A=-B$, poi si tengono solo le soluzioni con $B(x)\ge 0$.` },
    { id: 'fc-06', sezione: 'equazioni-valore-assoluto', tipo: 'concetto', fronte: R`Serve verificare qualcosa in $|A(x)|=|B(x)|$?`, retro: R`No: $A=B$ o $A=-B$ sono già entrambe valide, senza condizioni aggiuntive.` },
    { id: 'fc-07', sezione: 'grafico-modulo', tipo: 'concetto', fronte: R`Come si ottiene il grafico di $y=|f(x)|$?`, retro: R`Si lascia invariata la parte dove $f(x)\ge 0$ e si ribalta verso l'alto la parte dove $f(x)<0$.` },
    { id: 'fc-08', sezione: 'grafico-modulo', tipo: 'concetto', fronte: R`Il grafico di $y=|f(x)|$ ha mai ordinate negative?`, retro: R`Mai: $|f(x)| \ge 0$ per ogni $x$ del dominio.` },
    { id: 'fc-09', sezione: 'grafico-modulo', tipo: 'concetto', fronte: R`Dove si formano i punti angolosi nel grafico di $y=|f(x)|$?`, retro: R`Nei punti dove il grafico di $f$ attraversa l'asse $x$: lì comincia il ribaltamento.` },
    { id: 'fc-10', sezione: 'disequazioni-valore-assoluto-rapide', tipo: 'formula', fronte: R`Forma rapida di $|A(x)|<k$ (con $k>0$)`, retro: R`$-k < A(x) < k$.` },
    { id: 'fc-11', sezione: 'disequazioni-valore-assoluto-rapide', tipo: 'formula', fronte: R`Forma rapida di $|A(x)|>k$ (con $k>0$)`, retro: R`$A(x)<-k$ oppure $A(x)>k$.` },
    { id: 'fc-12', sezione: 'disequazioni-valore-assoluto-rapide', tipo: 'concetto', fronte: R`Cosa succede a $|A(x)|<k$ se $k \le 0$?`, retro: R`È impossibile: un modulo non è mai minore di un numero non positivo.` },
    { id: 'fc-13', sezione: 'disequazioni-valore-assoluto-sistemi', tipo: 'formula', fronte: R`Sistema per $|A(x)|<B(x)$`, retro: R`$A(x)<B(x)$ e $A(x)>-B(x)$, insieme.` },
    { id: 'fc-14', sezione: 'disequazioni-valore-assoluto-sistemi', tipo: 'formula', fronte: R`Unione per $|A(x)|>B(x)$`, retro: R`$A(x)>B(x)$ oppure $A(x)<-B(x)$.` },
    { id: 'fc-15', sezione: 'disequazioni-valore-assoluto-sistemi', tipo: 'concetto', fronte: R`Perché non serve imporre $B(x)>0$ nel sistema di $|A|<B$?`, retro: R`Perché lo implicano già le altre due condizioni del sistema.` },
    { id: 'fc-16', sezione: 'equazioni-irrazionali-una-radice', tipo: 'formula', fronte: R`Sistema per $\sqrt{A(x)}=B(x)$`, retro: R`$B(x)\ge 0$ e $A(x)=[B(x)]^2$.` },
    { id: 'fc-17', sezione: 'equazioni-irrazionali-una-radice', tipo: 'concetto', fronte: R`Serve imporre $A(x)\ge0$ nel sistema di $\sqrt{A}=B$?`, retro: R`No: lo garantisce già $A(x)=[B(x)]^2$, un quadrato non è mai negativo.` },
    { id: 'fc-18', sezione: 'equazioni-irrazionali-una-radice', tipo: 'concetto', fronte: R`Cambia qualcosa se la radice ha indice dispari?`, retro: R`Sì: nessuna condizione di segno, $\sqrt[3]{A}=B \iff A=B^3$ sempre.` },
    { id: 'fc-19', sezione: 'equazioni-irrazionali-due-radici', tipo: 'procedura', fronte: R`Strategia con due radici quadrate nella stessa equazione`, retro: R`Si isola una radice alla volta e si eleva al quadrato, anche due volte.` },
    { id: 'fc-20', sezione: 'equazioni-irrazionali-due-radici', tipo: 'concetto', fronte: R`Come si controlla il risultato di un'equazione con due radici?`, retro: R`Sostituendo ogni soluzione trovata nell'equazione di partenza (verifica diretta).` },
    { id: 'fc-21', sezione: 'equazioni-irrazionali-due-radici', tipo: 'formula', fronte: R`Condizione per $\sqrt{A(x)}=\sqrt{B(x)}$`, retro: R`$A(x)=B(x)$ e $A(x)\ge 0$ (basta uno dei due, sono uguali).` },
    { id: 'fc-22', sezione: 'disequazioni-irrazionali', tipo: 'formula', fronte: R`Sistema per $\sqrt{A(x)}<B(x)$`, retro: R`$A(x)\ge 0$, $B(x)>0$, $A(x)<[B(x)]^2$.` },
    { id: 'fc-23', sezione: 'disequazioni-irrazionali', tipo: 'formula', fronte: R`I due sistemi per $\sqrt{A(x)}>B(x)$`, retro: R`$(A\ge 0 \land B<0)$ oppure $(B\ge 0 \land A>B^2)$.` },
    { id: 'fc-24', sezione: 'disequazioni-irrazionali', tipo: 'concetto', fronte: R`Perché $\sqrt{A(x)}>B(x)$ diventa un'unione di due sistemi?`, retro: R`Perché può essere vera per un motivo automatico ($B$ negativo) o per un confronto vero ($B\ge 0$ e $A>B^2$).` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Risolvi $|x|=4$. Scrivi le soluzioni separate da punto e virgola.`, suggerimenti: [R`Quali numeri distano $4$ da zero?`], risposta: sol(4, -4), soluzione: [R`$|x|=4$ vuol dire che $x$ dista $4$ da zero.`, R`I numeri sono due: $x=4$ e $x=-4$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Risolvi $|x-4|=7$.`, suggerimenti: [R`Quello che sta dentro le sbarre vale $7$ oppure $-7$.`, R`Risolvi $x-4=7$ e $x-4=-7$.`], risposta: sol(11, -3), soluzione: [R`$x-4=7$, quindi $x=11$.`, R`$x-4=-7$, quindi $x=-3$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Risolvi $|x+1|=-2$. Se non ci sono soluzioni, scrivi *nessuna*.`, suggerimenti: [R`Un valore assoluto può essere negativo?`], risposta: NESSUNA, soluzione: [R`Un valore assoluto non è mai negativo.`, R`Quindi non può valere $-2$: nessuna soluzione.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Risolvi $|x|<3$. Scrivi la soluzione come nell'esempio della casella.`, suggerimenti: [R`Quali numeri distano da zero meno di $3$?`], risposta: interni(-3, 3), soluzione: [R`$|x|<3$ vuol dire che $x$ dista da zero meno di $3$.`, R`Sono i numeri fra $-3$ e $3$: $-3<x<3$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Risolvi $\sqrt{x}=3$.`, suggerimenti: [R`Eleva al quadrato i due membri.`], risposta: sol(9), soluzione: [R`Elevo al quadrato: $x=9$.`, R`Verifica: $\sqrt{9}=3$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Risolvi $|2x-1|=5$.`, suggerimenti: [R`Risolvi $2x-1=5$ e $2x-1=-5$.`], risposta: sol(3, -2), soluzione: [R`$2x-1=5$, quindi $2x=6$ e $x=3$.`, R`$2x-1=-5$, quindi $2x=-4$ e $x=-2$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Risolvi $|x-2|=0$. Se non ci sono soluzioni, scrivi *nessuna*.`, suggerimenti: [R`Un valore assoluto vale zero solo se vale zero quello che sta dentro.`], risposta: sol(2), soluzione: [R`$|x-2|=0$ solo se $x-2=0$.`, R`Quindi $x=2$: una soluzione sola.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Risolvi $|x|>2$.`, suggerimenti: [R`Quali numeri distano da zero più di $2$? Pensa anche ai negativi.`], risposta: esterni(-2, 2), soluzione: [R`$|x|>2$ vuol dire che $x$ dista da zero più di $2$.`, R`Sono i numeri fuori dal tratto fra $-2$ e $2$: $x<-2\ \lor\ x>2$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Risolvi $|x-5|<2$.`, suggerimenti: [R`Scrivi $-2<x-5<2$.`, R`Somma $5$ a tutti e tre i membri.`], risposta: interni(3, 7), soluzione: [R`$|x-5|<2$ diventa $-2<x-5<2$.`, R`Sommo $5$ a tutti e tre i membri: $3<x<7$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Risolvi $\sqrt{x+3}=5$.`, suggerimenti: [R`Eleva al quadrato i due membri.`], risposta: sol(22), soluzione: [R`Elevo al quadrato: $x+3=25$.`, R`Quindi $x=22$.`, R`Verifica: $\sqrt{25}=5$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Risolvi $|2x+3|<5$.`, suggerimenti: [R`Scrivi $-5<2x+3<5$.`, R`Togli $3$ a tutti e tre i membri, poi dividi per $2$.`], risposta: interni(-4, 1), soluzione: [R`$|2x+3|<5$ diventa $-5<2x+3<5$.`, R`Tolgo $3$: $-8<2x<2$.`, R`Divido per $2$: $-4<x<1$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Risolvi $|x+1|\ge 4$. Per $\ge$ usa il tasto ≥ oppure scrivi *>=*.`, suggerimenti: [R`Con il «maggiore» le parti sono due: $x+1\le -4$ oppure $x+1\ge 4$.`], risposta: esterni(-5, 3, true), soluzione: [R`$x+1\le -4$, quindi $x\le -5$.`, R`$x+1\ge 4$, quindi $x\ge 3$.`, R`Unisco: $x\le -5\ \lor\ x\ge 3$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt{2x+1}=3$.`, suggerimenti: [R`Eleva al quadrato i due membri.`], risposta: sol(4), soluzione: [R`Elevo al quadrato: $2x+1=9$.`, R`$2x=8$, quindi $x=4$.`, R`Verifica: $\sqrt{9}=3$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Risolvi $|3x-6|\le 9$.`, suggerimenti: [R`Scrivi $-9\le 3x-6\le 9$.`, R`Somma $6$ a tutti e tre i membri, poi dividi per $3$.`], risposta: interni(-1, 5, true), soluzione: [R`$|3x-6|\le 9$ diventa $-9\le 3x-6\le 9$.`, R`Sommo $6$: $-3\le 3x\le 15$.`, R`Divido per $3$: $-1\le x\le 5$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt{x+4}=-3$. Se non ci sono soluzioni, scrivi *nessuna*.`, suggerimenti: [R`Una radice quadrata può essere negativa?`], risposta: NESSUNA, soluzione: [R`Una radice quadrata non è mai negativa.`, R`Quindi non può valere $-3$: nessuna soluzione.`, R`Elevando al quadrato troveresti $x=5$, ma $\sqrt{9}=3$, non $-3$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt{x+12}=x$. Controlla ogni soluzione che trovi.`, suggerimenti: [R`Serve $x\ge 0$, perché una radice non è mai negativa. Poi eleva al quadrato.`, R`Ottieni $x^2-x-12=0$.`], risposta: sol(4), soluzione: [R`Condizione: $x\ge 0$. Elevo al quadrato: $x+12=x^2$.`, R`$x^2-x-12=0$, cioè $(x-4)(x+3)=0$: $x=4$ oppure $x=-3$.`, R`$x=-3$ non rispetta $x\ge 0$: si scarta. Resta $x=4$, e infatti $\sqrt{16}=4$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt{x+7}=x+1$. Se non ci sono soluzioni, scrivi *nessuna*.`, suggerimenti: [R`Serve $x+1\ge 0$. Poi eleva al quadrato.`, R`Ottieni $x^2+x-6=0$.`], risposta: sol(2), soluzione: [R`Condizione: $x+1\ge 0$, cioè $x\ge -1$. Elevo al quadrato: $x+7=x^2+2x+1$.`, R`$x^2+x-6=0$, cioè $(x+3)(x-2)=0$: $x=-3$ oppure $x=2$.`, R`$x=-3$ non rispetta $x\ge -1$: si scarta. Resta $x=2$: $\sqrt{9}=3$ e $2+1=3$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt{x}=x-6$.`, suggerimenti: [R`Serve $x-6\ge 0$. Poi eleva al quadrato.`, R`Ottieni $x^2-13x+36=0$.`], risposta: sol(9), soluzione: [R`Condizione: $x-6\ge 0$, cioè $x\ge 6$. Elevo al quadrato: $x=x^2-12x+36$.`, R`$x^2-13x+36=0$, cioè $(x-4)(x-9)=0$: $x=4$ oppure $x=9$.`, R`$x=4$ non rispetta $x\ge 6$: si scarta. Resta $x=9$: $\sqrt{9}=3$ e $9-6=3$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt{x+5}=x-1$.`, suggerimenti: [R`Serve $x-1\ge 0$. Poi eleva al quadrato.`, R`Ottieni $x^2-3x-4=0$.`], risposta: sol(4), soluzione: [R`Condizione: $x-1\ge 0$, cioè $x\ge 1$. Elevo al quadrato: $x+5=x^2-2x+1$.`, R`$x^2-3x-4=0$, cioè $(x-4)(x+1)=0$: $x=4$ oppure $x=-1$.`, R`$x=-1$ non rispetta $x\ge 1$: si scarta. Resta $x=4$: $\sqrt{9}=3$ e $4-1=3$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Risolvi $\sqrt{5-x}=x+1$.`, suggerimenti: [R`Serve $x+1\ge 0$. Poi eleva al quadrato.`, R`Ottieni $x^2+3x-4=0$.`], risposta: sol(1), soluzione: [R`Condizione: $x+1\ge 0$, cioè $x\ge -1$. Elevo al quadrato: $5-x=x^2+2x+1$.`, R`$x^2+3x-4=0$, cioè $(x+4)(x-1)=0$: $x=-4$ oppure $x=1$.`, R`$x=-4$ non rispetta $x\ge -1$: si scarta. Resta $x=1$: $\sqrt{4}=2$ e $1+1=2$.`] },
    { id: 'es-01', difficolta: 2, testo: R`Risolvi $|x - 2| < 2x - 1$.`, suggerimenti: [R`A destra c'è un'espressione: è il caso $|A|<B$, che diventa un sistema.`, R`Risolvi insieme $x-2<2x-1$ e $x-2>-(2x-1)$, poi prendi la parte comune.`], risposta: { tipo: 'intervallo', da: 1, a: 'inf', chiusoDa: false, chiusoA: false }, soluzione: [R`È il caso $|A|<B$: sistema fra $A<B$ e $A>-B$.`, R`$x-2<2x-1 \Rightarrow -x<1 \Rightarrow x>-1$.`, R`$x-2>-2x+1 \Rightarrow 3x>3 \Rightarrow x>1$.`, R`Parte comune: $x>1$, cioè $\Iaa{1}{+\infty}$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi $|2x - 3| < 5$.`, suggerimenti: [R`È la forma rapida $|A|<k$: trasformala in una doppia disuguaglianza.`, R`Scrivi $-5<2x-3<5$, somma $3$ e dividi per $2$.`], risposta: { tipo: 'intervallo', da: -1, a: 4, chiusoDa: false, chiusoA: false }, soluzione: [R`Forma rapida: $-5<2x-3<5$.`, R`Sommo $3$: $-2<2x<8$.`, R`Divido per $2$: $-1<x<4$, cioè $\Iaa{-1}{4}$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Risolvi $|x - 4| > 2x + 1$.`, suggerimenti: [R`A destra c'è un'espressione: è il caso $|A|>B$, che diventa un'unione.`, R`Risolvi $x-4>2x+1$ e $x-4<-(2x+1)$, poi unisci i risultati.`], risposta: { tipo: 'intervallo', da: '-inf', a: 1, chiusoDa: false, chiusoA: false }, soluzione: [R`È il caso $|A|>B$: basta che valga $A>B$ oppure $A<-B$.`, R`$x-4>2x+1 \Rightarrow -x>5 \Rightarrow x<-5$.`, R`$x-4<-2x-1 \Rightarrow 3x<3 \Rightarrow x<1$.`, R`Unisco: $x<-5$ sta già dentro $x<1$. Soluzione: $x<1$, cioè $\Iaa{-\infty}{1}$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi $|3x + 2| = x + 6$.`, suggerimenti: [R`È il caso $|A|=B$: risolvi $3x+2=x+6$ e $3x+2=-(x+6)$.`, R`Alla fine controlla che $B(x)=x+6$ sia $\ge 0$ in entrambe le soluzioni trovate.`], risposta: { tipo: 'numeri', valori: [2, -2] }, soluzione: [R`$3x+2=x+6 \Rightarrow 2x=4 \Rightarrow x=2$.`, R`$3x+2=-(x+6) \Rightarrow 4x=-8 \Rightarrow x=-2$.`, R`Verifica $B(x)=x+6\ge 0$: in $x=2$, $B=8$; in $x=-2$, $B=4$. Entrambe accettabili.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi $|x + 1| = |x - 5|$.`, suggerimenti: [R`È il caso $|A|=|B|$: non serve nessuna condizione, ma attento se un caso non porta a nulla.`, R`Un caso porta a un'uguaglianza sempre falsa: scartalo e tieni solo l'altro.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.001 }, soluzione: [R`$x+1=x-5 \Rightarrow 1=-5$: falso, nessuna soluzione da questo caso.`, R`$x+1=-(x-5) \Rightarrow x+1=-x+5 \Rightarrow 2x=4 \Rightarrow x=2$.`, R`Verifica: $|2+1|=3$ e $|2-5|=3$. ✓`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $|x + 6| = x$. Se non ha soluzioni, scrivi "impossibile".`, suggerimenti: [R`È il caso $|A|=B$ con $B(x)=x$: trova prima le soluzioni algebriche.`, R`Controlla il segno di $B(x)=x$ in ogni candidato: forse nessuno lo rispetta.`], risposta: NESSUNA, soluzione: [R`$x+6=x \Rightarrow 6=0$: falso, nessuna soluzione da questo caso.`, R`$x+6=-x \Rightarrow 2x=-6 \Rightarrow x=-3$.`, R`Verifico il segno di $B(x)=x$: in $x=-3$, $B=-3<0$, va scartata.`, R`Nessuna delle due strade dà una soluzione accettabile: l'equazione è impossibile.`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi $\sqrt{2x + 3} = x$.`, suggerimenti: [R`Sistema: $x\ge 0$ e $2x+3=x^2$.`, R`Risolvi l'equazione di secondo grado e scarta la soluzione che non rispetta $x\ge 0$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`Sistema: $x\ge 0$ e $2x+3=x^2$.`, R`$x^2-2x-3=0 \Rightarrow (x-3)(x+1)=0 \Rightarrow x=3$ oppure $x=-1$.`, R`Solo $x=3$ rispetta $x\ge 0$. Verifica: $\sqrt{9}=3$. ✓`] },
    { id: 'es-08', difficolta: 1, testo: R`Risolvi $\sqrt[3]{2x - 1} = 3$.`, suggerimenti: [R`L'indice è dispari: nessuna condizione da imporre.`, R`Eleva al cubo entrambi i membri: $2x-1=27$.`], risposta: { tipo: 'numero', valore: 14, tolleranza: 0.001 }, soluzione: [R`Indice dispari: nessuna condizione. Elevo al cubo: $2x-1=27$.`, R`$2x=28 \Rightarrow x=14$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi $\sqrt{x + 1} + \sqrt{x + 6} = 5$.`, suggerimenti: [R`Isola una delle due radici prima di elevare al quadrato.`, R`Dopo il primo elevamento a potenza resterà ancora una radice: isolala ed eleva di nuovo.`, R`Alla fine verifica la soluzione trovata per sostituzione diretta nell'equazione di partenza.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`C.e.: $x\ge -1$ (che comprende anche $x+6\ge0$).`, R`Isolo: $\sqrt{x+1}=5-\sqrt{x+6}$. Elevo al quadrato: $x+1=25-10\sqrt{x+6}+x+6$.`, R`Semplifico: $1-31=-10\sqrt{x+6} \Rightarrow \sqrt{x+6}=3$.`, R`Elevo di nuovo: $x+6=9 \Rightarrow x=3$. Verifica: $\sqrt{4}+\sqrt{9}=2+3=5$. ✓`] },
    { id: 'es-10', difficolta: 3, testo: R`Risolvi $\sqrt{5x + 6} < x$.`, suggerimenti: [R`Serve il sistema per $\sqrt{A}<B$: tre condizioni insieme.`, R`Non dimenticare $B(x)=x>0$: senza questa condizione il confronto dei quadrati non basta.`], risposta: { tipo: 'intervallo', da: 6, a: 'inf', chiusoDa: false, chiusoA: false }, soluzione: [R`Sistema: $5x+6\ge0$ (cioè $x\ge -\dfrac{6}{5}$), $x>0$, $5x+6<x^2$.`, R`$x^2-5x-6>0 \Rightarrow (x-6)(x+1)>0 \Rightarrow x<-1 \lor x>6$.`, R`Intersecando con $x>0$ resta solo $x>6$; è già dentro il dominio.`] },
    { id: 'es-11', difficolta: 3, testo: R`Risolvi $\sqrt{|x - 3|} = 2$.`, suggerimenti: [R`Il radicando è $|x-3|$: pensa a cosa succede quando elevi al quadrato.`, R`Ottieni $|x-3|=4$: risolvilo come un'equazione $|A|=k$.`], risposta: { tipo: 'numeri', valori: [7, -1] }, soluzione: [R`Elevo al quadrato (lecito: $2\ge 0$): $|x-3|=4$.`, R`$x-3=4 \Rightarrow x=7$; oppure $x-3=-4 \Rightarrow x=-1$.`, R`Verifica: $\sqrt{|7-3|}=\sqrt{4}=2$ ✓; $\sqrt{|{-1}-3|}=\sqrt{4}=2$ ✓.`] },
    { id: 'es-12', difficolta: 3, testo: R`Risolvi $\sqrt{x + 4} > x - 2$.`, suggerimenti: [R`È il caso $\sqrt{A}>B$: servono due sistemi, uniti da «oppure».`, R`Primo sistema: la radice esiste e $x-2<0$. Secondo: $x-2\ge 0$ e confronto dei quadrati.`, R`Nel secondo ottieni $x^2-5x<0$, cioè $0<x<5$.`], risposta: { tipo: 'intervallo', da: -4, a: 5, chiusoDa: true, chiusoA: false }, soluzione: [R`Primo sistema: $x+4\ge 0$ e $x-2<0$, cioè $-4\le x<2$. Qui la radice vince da sola.`, R`Secondo sistema: $x\ge 2$ e $x+4>(x-2)^2=x^2-4x+4$.`, R`$x^2-5x<0 \Rightarrow x(x-5)<0 \Rightarrow 0<x<5$. Con $x\ge 2$ resta $2\le x<5$.`, R`Unisco i due pezzi, che si attaccano in $2$: $-4\le x<5$, cioè $\Ica{-4}{5}$. In $x=-4$ vale $0>-6$, quindi $-4$ è compreso.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale affermazione sul valore assoluto è sempre vera, per ogni numero reale $a$?`, opzioni: [R`$|a| \ge 0$`, R`$|a| = a$`, R`$|a| = -a$`, R`$|a| < 0$ se $a$ è negativo`], corretta: 0, spiegazione: R`$|a|$ è una distanza, quindi non è mai negativa. $|a|=a$ vale solo se $a\ge0$, $|a|=-a$ solo se $a\le0$, e un modulo non è mai negativo qualunque sia $a$.` },
    { id: 'q-02', domanda: R`Quanto vale $|{-3}| \cdot |2|$?`, opzioni: [R`$-6$`, R`$6$`, R`$1$`, R`$-1$`], corretta: 1, spiegazione: R`$|{-3}|=3$ e $|2|=2$: il prodotto è $6$. Il valore assoluto di un prodotto è il prodotto dei valori assoluti, ma resta sempre $\ge 0$: mai $-6$.` },
    { id: 'q-03', domanda: R`L'equazione $|A(x)| = k$, con $k<0$, ha…`, opzioni: [R`sempre due soluzioni`, R`una sola soluzione`, R`nessuna soluzione`, R`infinite soluzioni`], corretta: 2, spiegazione: R`Un modulo non è mai negativo, quindi non può mai uguagliare un numero $k<0$: l'equazione è impossibile.` },
    { id: 'q-04', domanda: R`Per risolvere $|A(x)| = B(x)$, dopo aver trovato le soluzioni di $A=B$ e $A=-B$, cosa bisogna fare?`, opzioni: [R`Niente, sono già tutte accettabili`, R`Verificare che $A(x) \ge 0$ in ciascuna soluzione trovata`, R`Scartare sempre la soluzione negativa`, R`Verificare che $B(x) \ge 0$ in ciascuna soluzione trovata`], corretta: 3, spiegazione: R`Un modulo non può uguagliare un valore negativo di $B(x)$: le soluzioni con $B(x)<0$ vanno scartate, anche se algebricamente derivano correttamente da $A=B$ o $A=-B$.` },
    { id: 'q-05', domanda: R`Per risolvere $|A(x)| = |B(x)|$, quale condizione aggiuntiva serve?`, opzioni: [R`Nessuna condizione`, R`$A(x) \ge 0$ nelle soluzioni`, R`$B(x) \ge 0$ nelle soluzioni`, R`$A(x) \ge 0$ e $B(x) \ge 0$`], corretta: 0, spiegazione: R`Elevando entrambi i membri al quadrato si ottiene $A(x)^2=B(x)^2$, sempre equivalente a $A=B$ o $A=-B$, senza bisogno di controllare segni. I due membri sono moduli, mai negativi: né $A(x)$ né $B(x)$ devono essere positivi.` },
    { id: 'q-06', domanda: R`Il grafico di $y=|f(x)|$ si ottiene da quello di $y=f(x)$…`, opzioni: [R`ribaltando verso il basso le parti dove $f(x)>0$`, R`ribaltando verso l'alto le parti dove $f(x)<0$`, R`traslando tutto il grafico verso l'alto`, R`ribaltando l'intero grafico rispetto all'asse $y$`], corretta: 1, spiegazione: R`Dove $f(x)\ge 0$ il modulo non cambia nulla; dove $f(x)<0$, $|f(x)|=-f(x)$, cioè il simmetrico rispetto all'asse $x$: si ribalta solo quella parte, verso l'alto.` },
    { id: 'q-07', domanda: R`Nella forma rapida $|A(x)|<k$ (con $k>0$), a cosa equivale la disequazione?`, opzioni: [R`$A(x)<k$`, R`$A(x)>-k$`, R`$-k<A(x)<k$`, R`$A(x)<-k$ oppure $A(x)>k$`], corretta: 2, spiegazione: R`«Minore di $k$ in valore assoluto» significa stare in una striscia intorno allo zero, ampia $k$ per lato: $-k<A(x)<k$. «$A(x)<-k$ oppure $A(x)>k$» è invece la forma rapida di $|A(x)|>k$; $A(x)<k$ da sola dimentica il limite dal basso.` },
    { id: 'q-08', domanda: R`Se $k < 0$, la disequazione $|A(x)| > k$…`, opzioni: [R`non ha nessuna soluzione`, R`equivale alla sola $A(x)>k$`, R`equivale alla sola $A(x)<-k$`, R`è vera dove $A(x)$ esiste`], corretta: 3, spiegazione: R`$|A(x)|\ge 0$ sempre, e $0 > k$ quando $k<0$: il modulo supera automaticamente un numero negativo, in ogni punto in cui $A(x)$ è definita. Le due forme «sole» perdono soluzioni: per esempio $A(x)>k$ esclude i punti con $A(x)\le k$, dove il modulo supera comunque $k$.` },
    { id: 'q-09', domanda: R`Nel sistema per $|A(x)| < B(x)$, perché non serve imporre a parte $B(x)>0$?`, opzioni: [R`Perché lo implicano già le altre due`, R`Perché non è mai vero`, R`Perché $B(x)$ è sempre positivo per definizione`, R`Serve comunque, è un errore ometterlo`], corretta: 0, spiegazione: R`Se $A(x)<B(x)$ e $A(x)>-B(x)$ insieme, allora $B(x)$ supera sia $A(x)$ sia $-A(x)$, quindi $B(x)>|A(x)|\ge 0$: la positività di $B$ è già garantita.` },
    { id: 'q-10', domanda: R`Quale delle seguenti è la traduzione corretta di $|A(x)|>B(x)$?`, opzioni: [R`$A(x)>B(x)$ e $A(x)<-B(x)$, insieme`, R`$A(x)>B(x)$ oppure $A(x)<-B(x)$`, R`$-B(x)<A(x)<B(x)$`, R`$A(x)=B(x)$ oppure $A(x)=-B(x)$`], corretta: 1, spiegazione: R`È un'unione: basta che valga una delle due. Chiederle «insieme» è sbagliato: servirebbe un $A(x)$ sopra $B(x)$ e sotto $-B(x)$, che dove $B(x)\ge 0$ non esiste. La doppia disuguaglianza $-B(x)<A(x)<B(x)$ è invece la traduzione di $|A(x)|<B(x)$.` },
    { id: 'q-11', domanda: R`Un'equazione irrazionale ha l'incognita…`, opzioni: [R`solo a denominatore`, R`solo come esponente`, R`sotto il segno di radice`, R`solo dentro un valore assoluto`], corretta: 2, spiegazione: R`È questa la caratteristica che dà il nome «irrazionale» all'equazione: la presenza dell'incognita in un radicando.` },
    { id: 'q-12', domanda: R`Nel sistema per $\sqrt{A(x)}=B(x)$, perché non serve imporre a parte $A(x)\ge0$?`, opzioni: [R`Perché $A(x)$ è sempre positivo`, R`Perché la radice esiste comunque`, R`In realtà serve, ed è un errore ometterlo`, R`Perché lo garantisce già $A(x)=[B(x)]^2$`], corretta: 3, spiegazione: R`Se $A(x)=[B(x)]^2$, il secondo membro è un quadrato, quindi $\ge 0$: la condizione di esistenza della radice è automaticamente rispettata.` },
    { id: 'q-13', domanda: R`Perché nell'equazione $\sqrt[3]{A(x)}=B(x)$ (indice dispari) non serve nessuna condizione di segno?`, opzioni: [R`Perché il cubo è un'operazione reversibile su tutto $\mathbb{R}$`, R`Perché le radici dispari non esistono per i numeri negativi`, R`Perché $B(x)$ è sempre positivo`, R`In realtà una condizione serve comunque`], corretta: 0, spiegazione: R`Il quadrato cancella il segno ($2^2 = (-2)^2$), il cubo no: $2^3 = 8$ e $(-2)^3 = -8$. Due numeri diversi hanno cubi diversi, quindi elevare al cubo non introduce soluzioni estranee. Le radici dispari dei numeri negativi esistono eccome: $\sqrt[3]{-8} = -2$.` },
    { id: 'q-14', domanda: R`Con due radici quadrate nella stessa equazione, qual è il modo più sicuro di controllare le soluzioni trovate?`, opzioni: [R`Fidarsi del sistema di condizioni sui segni, senza altro`, R`Sostituire ogni soluzione nell'equazione di partenza`, R`Non serve nessun controllo`, R`Controllare solo le condizioni di esistenza delle radici`], corretta: 1, spiegazione: R`Dopo due elevamenti a potenza, tracciare a mano tutte le condizioni di segno è complicato: la verifica diretta per sostituzione è il modo più affidabile.` },
    { id: 'q-15', domanda: R`Nel sistema per $\sqrt{A(x)} < B(x)$, quali condizioni servono insieme?`, opzioni: [R`$A(x)\ge0$ e $A(x)<[B(x)]^2$`, R`Basta elevare al quadrato: $A(x)<[B(x)]^2$`, R`$A(x)\ge0$, $B(x)>0$ e $A(x)<[B(x)]^2$`, R`$B(x)<0$ e $A(x)>[B(x)]^2$`], corretta: 2, spiegazione: R`Servono tutte e tre: la radice deve esistere, il secondo membro deve essere positivo, e poi si confrontano i quadrati. Chi dimentica $B(x)>0$ tiene punti dove una radice dovrebbe stare sotto un numero negativo.` },
    { id: 'q-16', domanda: R`La disequazione $\sqrt{A(x)}>B(x)$ diventa un'unione di due sistemi perché…`, opzioni: [R`ha sempre due famiglie di soluzioni distinte`, R`bisogna risolvere due equazioni diverse`, R`il segno di $A(x)$ può essere sia positivo sia negativo`, R`i casi $B(x)<0$ e $B(x)\ge0$ si trattano in modo diverso`], corretta: 3, spiegazione: R`Se $B(x)$ è negativo, una radice (sempre $\ge 0$) lo supera automaticamente; se $B(x)\ge 0$, serve davvero confrontare i quadrati. Sono due situazioni diverse, unite da un «oppure».` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di sciogliere qualunque valore assoluto, chiediti se il secondo membro è un numero o un'espressione: cambia il metodo da usare.` },
    { tipo: 'errore', testo: R`In $|A|=B$, dimenticare di controllare il segno di $B(x)$ è l'errore più frequente: porta ad accettare soluzioni che il modulo, per definizione, non può avere.` },
    { tipo: 'trucco', testo: R`$|A|=|B|$ è il caso più comodo: nessuna condizione da verificare, basta risolvere $A=B$ e $A=-B$.` },
    { tipo: 'metodo', testo: R`Con $|A|<k$ e $|A|>k$, se $k$ è negativo non serve fare calcoli: ragiona subito sul fatto che $|A|\ge 0$.` },
    { tipo: 'errore', testo: R`Scrivere $|A|>k$ come un'unica catena $-k>A>k$ non ha senso: è un'unione, va scritta con «oppure».` },
    { tipo: 'metodo', testo: R`Ogni equazione o disequazione irrazionale comincia con la stessa domanda: qual è la condizione che rende il secondo membro compatibile con una radice, che non è mai negativa?` },
    { tipo: 'trucco', testo: R`Se l'indice della radice è dispari, rilassati: nessuna condizione di segno, si eleva a potenza e basta.` },
    { tipo: 'errore', testo: R`Con due radici nella stessa equazione, fidarsi solo delle condizioni sui segni senza una verifica finale è rischioso: dopo due elevamenti a potenza conviene sempre controllare per sostituzione.` },
    { tipo: 'trucco', testo: R`Prima di elevare al quadrato una disequazione irrazionale con «>», ricordati del sistema con il secondo membro negativo: è la parte che si dimentica più spesso, e regala soluzioni gratis.` }
  ],

  aneddoti: [
    { matematico: 'Erone di Alessandria', anni: '10–70 d.C. circa', titolo: 'Un algoritmo per la radice quadrata, duemila anni fa', testo: R`Erone fu un ingegnere e matematico di Alessandria d'Egitto. Scrisse trattati pratici di meccanica, ottica e misura dei terreni. Nella sua *Metrica* spiega come calcolare la radice di un numero che non è un quadrato perfetto, per esempio $\sqrt{720}$. Si parte da un valore approssimato. Poi si fa la media fra quel valore e il numero diviso per quel valore. Ne esce una stima migliore, e il passo si ripete. Gli scribi babilonesi conoscevano un procedimento simile oltre mille anni prima. Erone però lo scrisse come regola generale, dentro un manuale greco di uso pratico. Il metodo converge in fretta: bastano due o tre passi per avere diverse cifre decimali esatte. E tutto questo molto prima delle calcolatrici.`, legame: R`Il metodo di Erone approssima i numeri irrazionali, come le radici di questa lezione, con la precisione che si vuole.` },
    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Il simbolo |x| e la funzione «tutta punte»', testo: R`Weierstrass è considerato il padre del rigore nell'analisi matematica. Eppure insegnò per quattordici anni nei licei di provincia, prima che le università si accorgessero di lui. Gli storici della notazione gli attribuiscono il simbolo $|x|$ per il valore assoluto. Compare in un suo manoscritto del 1841, pubblicato solo molti anni dopo. Lo usava anche per i numeri complessi, dove si chiama «modulo». Prima di allora non esisteva una scrittura condivisa. Nel 1872 presentò all'Accademia di Berlino un esempio ancora più sorprendente. Era una funzione continua ovunque, ma senza derivata in nessun punto. Il suo grafico è fatto di punte, per quanto lo si ingrandisca. All'epoca sembrò un mostro contro l'intuizione geometrica. Oggi è l'esempio classico di quanto continuità e derivabilità siano proprietà diverse.`, legame: R`Il simbolo $|x|$ usato in tutta questa lezione nasce, secondo gli storici, proprio con Weierstrass.` },
    { matematico: 'Isaac Newton', anni: '1642–1727', titolo: 'Avvicinarsi a una soluzione un passo alla volta', testo: R`Fra le tante cose per cui è ricordato, Newton descrisse un modo per avvicinarsi alla soluzione di un'equazione. Lo scrisse in un manoscritto del 1669, poi confluito nei suoi lavori sul calcolo. Serve quando l'equazione non si sa risolvere in modo esatto. Si parte da un valore vicino alla soluzione e lo si corregge, un passo dopo l'altro. Ogni correzione porta più vicino. Joseph Raphson, una ventina d'anni dopo, ne pubblicò una versione più semplice da usare. Per questo oggi si parla di «metodo di Newton-Raphson». La forma con la derivata, quella dei libri di oggi, arrivò solo nel Settecento. Il metodo si usa ancora: lavora dentro le calcolatrici e i programmi che cercano soluzioni approssimate.`, legame: R`Quando un'equazione irrazionale non si risolve con un sistema pulito, un metodo così trova comunque una soluzione approssimata.` }
  ]
});
})();
