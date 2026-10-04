(function () {
const R = String.raw;
/* allenamento: tutte le scritture ragionevoli di una scomposizione.
   scomp('3', 'x+3', 'x-3') → 3(x+3)(x-3). Accetta: fattori in qualunque ordine, termini scambiati dentro
   la parentesi ((3+x)), segni scritti in modo diverso ((5-x) = -(x-5)), fattori uguali come ^2 o ripetuti,
   il numero o monomio davanti anche in fondo, con o senza *. Non accetta scomposizioni incomplete. */
const termini = f => f.replace(/^(?=[^+-])/, '+').match(/[+-][^+-]+/g);
const scrivi = t => t.join('').replace(/^\+/, '');
const opposti = t => t.map(s => (s[0] === '+' ? '-' : '+') + s.slice(1));
const ordini = t => t.length < 2 ? [t] : t.flatMap((s, i) => ordini(t.filter((_, j) => j !== i)).map(r => [s].concat(r)));
const permuta = a => a.length < 2 ? [a] : [...new Set(a)].flatMap(s => { const i = a.indexOf(s); return permuta(a.filter((_, j) => j !== i)).map(r => [s].concat(r)); });
function scomp(k, ...fattori) {
  const basi = [...new Set(fattori)].map(f => ({ t: termini(f), m: fattori.filter(g => g === f).length }));
  const forme = new Set();
  const giro = (i, segno, pezzi) => {
    if (i === basi.length) {
      pezzi.reduce((acc, p) => acc.flatMap(a => p.map(q => a.concat([q]))), [[]]).forEach(lista => {
        const gettoni = lista.flat();
        permuta(gettoni).forEach(ord => ['', '*'].forEach(sep => {
          const prod = ord.join(sep);
          const kk = segno > 0 ? k : (k === '' ? '-' : k[0] === '-' ? k.slice(1) : '-' + k);
          forme.add(kk + prod);
          if (kk && kk !== '-') forme.add(kk + '*' + prod);
          if (segno > 0 && k) { if (!/\d$/.test(prod)) forme.add(prod + k); forme.add(prod + '*' + k); }
        }));
      });
      return;
    }
    const b = basi[i];
    [b.t, opposti(b.t)].forEach((t, giraSegno) => {
      const s2 = giraSegno && b.m % 2 ? -segno : segno;
      const scritture = ordini(t).map(scrivi).flatMap(s => b.m === 1 ? [['(' + s + ')']] : [['(' + s + ')^' + b.m], Array(b.m).fill('(' + s + ')')]);
      giro(i + 1, s2, pezzi.concat([scritture]));
    });
  };
  giro(0, 1, []);
  return { tipo: 'testo', accettate: [...forme], segnaposto: 'es. 2(x+1)(x-3)' };
}
COMPASSO.registra({
  id: 'scomposizione',
  titolo: 'Scomposizione in fattori',

  introduzione: R`Con i prodotti notevoli vai da $(x - 2)(x - 3)$ a $x^2 - 5x + 6$. **Scomporre** è fare la strada al contrario: parti da $x^2 - 5x + 6$ e ritrovi $(x - 2)(x - 3)$.

La forma a prodotto dice subito una cosa che l'altra nasconde: il polinomio vale zero per $x = 2$ e per $x = 3$. Ti servirà nelle equazioni e nelle frazioni algebriche.

I metodi sono pochi. La parte difficile è scegliere quello giusto, e per questo c'è uno schema. Prima ripassa i prodotti notevoli e la regola di Ruffini.`,

  inBreve: [
    R`Scomporre vuol dire scrivere un polinomio come **prodotto**. Se alla fine hai una somma, non hai scomposto.`,
    R`Prova **sempre** per primo il raccoglimento totale. Poi conta i termini per scegliere il metodo. Se niente funziona, usa Ruffini.`,
    R`$A^2 - B^2 = (A + B)(A - B)$. La somma di quadrati $A^2 + B^2$ non si scompone.`,
    R`Nel quadrato di binomio controlla il **doppio prodotto**. Nel trinomio $x^2 + sx + p$ cerca due numeri con somma $s$ e prodotto $p$.`,
    R`Hai finito quando nessun fattore si scompone più. Poi rimoltiplica: deve tornare il polinomio di partenza.`,
    R`Nelle frazioni algebriche semplifichi i **fattori**, mai gli addendi. Le condizioni di esistenza si scrivono prima di semplificare.`
  ],

  sezioni: [
    { id: 'perche-scomporre', titolo: 'Che cosa vuol dire scomporre, e perché', testo: R`Un numero si scompone in fattori primi: $60 = 2^2 \cdot 3 \cdot 5$. Con i polinomi fai la stessa cosa.

>* **Scomporre** un polinomio vuol dire scriverlo come **prodotto** di polinomi di grado più basso. Un polinomio che non si scompone si dice **irriducibile**, come un numero primo.

Per esempio $x^2 - 5x + 6 = (x - 2)(x - 3)$. Per esserne sicuro, rifai il prodotto:

~ (x - 2)(x - 3) :: la scomposizione da controllare
~ x^2 \evid{- 3x - 2x} + 6 :: ogni termine per ogni termine
~ \evidb{x^2 - 5x + 6} :: torna il polinomio di partenza: la scomposizione è giusta

Fai questo controllo alla fine di **ogni** esercizio.

La scomposizione è **completa** quando nessun fattore si scompone più. $x^4 - 16 = (x^2 + 4)(x^2 - 4)$ è giusta, ma non è completa: $x^2 - 4$ diventa ancora $(x + 2)(x - 2)$.

?? Quale di queste è una scomposizione di $x^2 + 3x + 2$?
[ ] $x(x + 3) + 2$
[x] $(x + 1)(x + 2)$
[ ] $x^2 + 3(x + 1) - 1$
[ ] $(x + 3)(x + 2)$
=> $(x + 1)(x + 2)$ è un prodotto, e sviluppato dà $x^2 + 3x + 2$. $x(x + 3) + 2$ vale lo stesso, ma è una **somma**: quel $+ 2$ sta fuori, e il risultato deve essere un prodotto. $(x + 3)(x + 2)$ sviluppato dà $x^2 + 5x + 6$.

### A che cosa serve

1. **Equazioni.** Un prodotto vale zero solo se vale zero un fattore: è la *legge di annullamento del prodotto*. Da $(x - 2)(x - 3) = 0$ leggi subito $x = 2$ oppure $x = 3$.
2. **Frazioni algebriche.** Per semplificarle devi vedere i fattori comuni.
3. **MCD e mcm** di polinomi.` },

    { id: 'raccoglimento', titolo: 'Raccoglimento totale e parziale', testo: R`### Raccoglimento totale

Guarda $6x^3 - 4x^2 + 2x$. Ogni termine contiene un $2$ e almeno una $x$. Questo pezzo comune, $2x$, si porta fuori davanti a una parentesi.

>* **Raccoglimento totale:** porta fuori il **fattore comune** a tutti i termini. Nella parentesi scrivi ogni termine diviso per quel fattore.

Per trovarlo:

1. Calcola il MCD dei coefficienti.
2. Prendi le lettere presenti in tutti i termini, con l'esponente più piccolo.

~ 6x^3 - 4x^2 + 2x :: il polinomio
~ \evid{2x} \cdot 3x^2 - \evid{2x} \cdot 2x + \evid{2x} \cdot 1 :: MCD di $6, 4, 2$ è $2$; la $x$ è in tutti con esponente minimo $1$: il fattore comune è $2x$
~ \evid{2x}(3x^2 - 2x + 1) :: lo porto fuori; nella parentesi resta ogni termine diviso per $2x$

Il fattore comune può essere anche una parentesi: $2a(x - 1) + 5(x - 1) = (x - 1)(2a + 5)$.

?? Completa: $2x^2 + 2x = 2x(\ldots)$
[ ] $x$
[ ] $x + 0$
[x] $x + 1$
[ ] $x + 2x$
=> $2x : 2x = 1$, quindi nella parentesi resta $x + 1$. L'errore tipico è scrivere $0$ o dimenticare quel termine. Controllo: $2x(x + 1) = 2x^2 + 2x$ ✓.

Se il primo termine è negativo, raccogli anche il segno meno: $-x^2 - 3x = -x(x + 3)$. Nella parentesi cambiano tutti i segni.

### Raccoglimento parziale

A volte non c'è un fattore comune a **tutti** i termini, ma c'è **a gruppi**. Raccogli in ogni gruppo. Se le parentesi che restano sono uguali, raccogli ancora.

~ x^3 - 2x^2 + 3x - 6 :: quattro termini, nessun fattore comune a tutti
~ \evid{x^2}(x - 2) + \evid{3}(x - 2) :: raccolgo $x^2$ dai primi due e $3$ dagli ultimi due
~ \evid{(x - 2)}(x^2 + 3) :: le parentesi sono uguali: le raccolgo

Se le parentesi non sono uguali, prova a fare i gruppi in un altro modo.

>! Attenzione al meno davanti al secondo gruppo. In $x^3 + x^2 - x - 1$ il secondo gruppo è $-x - 1 = -(x + 1)$. Ottieni $x^2(x + 1) - (x + 1) = (x + 1)(x^2 - 1)$, e alla fine $(x + 1)^2(x - 1)$.

>* Prova **sempre** per primo il raccoglimento totale.` },

    { id: 'differenza-quadrati', titolo: 'Differenza di quadrati', testo: R`Sai già che $(A + B)(A - B) = A^2 - B^2$. Letta al contrario, questa uguaglianza scompone.

>* **Differenza di quadrati:** $$A^2 - B^2 = (A + B)(A - B)$$ La riconosci così: **due** termini, tutti e due **quadrati**, con un **meno** in mezzo.

Per prima cosa trova le **basi** $A$ e $B$. Sono ciò che è elevato al quadrato.

~ 4a^2 - 25b^2 :: due termini, un meno in mezzo
~ (\evid{2a})^2 - (\evid{5b})^2 :: $4a^2 = (2a)^2$ e $25b^2 = (5b)^2$: le basi sono $2a$ e $5b$
~ (\evid{2a} + \evid{5b})(\evid{2a} - \evid{5b}) :: somma delle basi per differenza delle basi

Altri esempi:

- $x^2 - 9 = (x + 3)(x - 3)$: le basi sono $x$ e $3$.
- $(x + 1)^2 - 4 = (x + 1 + 2)(x + 1 - 2) = (x + 3)(x - 1)$: una base può essere una parentesi.
- $x^4 - 1 = (x^2 + 1)(x^2 - 1) = (x^2 + 1)(x + 1)(x - 1)$: il fattore $x^2 - 1$ si scompone ancora.

Nella figura, a sinistra, un quadrato di lato $a$ ha perso l'angolo $b^2$. I due rettangoli colorati, messi in fila, formano un rettangolo di lati $a + b$ e $a - b$. L'area è la stessa.

[[grafico:differenza-quadrati]]

?? Come si scompone $x^2 - 9$?
[ ] $(x - 3)^2$
[x] $(x + 3)(x - 3)$
[ ] $(x + 9)(x - 9)$
[ ] non si scompone
=> $9 = 3^2$, quindi le basi sono $x$ e $3$: $(x + 3)(x - 3)$. $(x - 3)^2$ sviluppato dà $x^2 - 6x + 9$. In $(x + 9)(x - 9)$ la base è $9$, ma la base giusta è $3$.

>! La **somma** di quadrati non si scompone: $x^2 + 9$ è irriducibile.

Come sempre, prima raccogli: $3x^2 - 12 = 3(x^2 - 4) = 3(x + 2)(x - 2)$. Senza raccogliere, $3x^2$ non sembra un quadrato.` },

    { id: 'quadrati', titolo: 'Quadrato di binomio e di trinomio', testo: R`### Quadrato di binomio

$$\begin{gathered} A^2 + 2AB + B^2 = (A + B)^2 \\ A^2 - 2AB + B^2 = (A - B)^2 \end{gathered}$$

>* **Quadrato di binomio:** **tre** termini. Due sono quadrati con il segno più. Il terzo è il **doppio prodotto** delle basi, con il più o con il meno.

Il controllo decisivo è sul doppio prodotto.

~ 4x^2 - 12x + 9 :: tre termini
~ (\evid{2x})^2 \ldots (\evid{3})^2 :: i quadrati sono $4x^2 = (2x)^2$ e $9 = 3^2$: le basi sono $2x$ e $3$
~ 2 \cdot 2x \cdot 3 = \evid{12x} :: calcolo il doppio prodotto delle basi: coincide con il termine di mezzo
~ \evidb{(2x - 3)^2} :: il termine di mezzo è negativo, quindi fra le basi va il meno

Prendi invece $x^2 + 5x + 9$. Le basi sarebbero $x$ e $3$, e il doppio prodotto $6x$. Ma c'è $5x$: **non** è un quadrato.

?? Quale di questi trinomi è il quadrato di un binomio?
[ ] $x^2 + 4x + 16$
[x] $x^2 + 8x + 16$
[ ] $x^2 + 16x + 16$
[ ] $x^2 - 8x - 16$
=> Le basi sono $x$ e $4$. Il doppio prodotto è $2 \cdot x \cdot 4 = 8x$, quindi $x^2 + 8x + 16 = (x + 4)^2$. In $x^2 + 4x + 16$ c'è il prodotto semplice, non il doppio. In $x^2 - 8x - 16$ il $16$ è negativo: un quadrato non lo è mai.

L'animazione monta $x^2 + 6x + 9$ con i pezzi: un quadrato $x^2$, due rettangoli $3x$, un quadratino $9$. Insieme fanno il quadrato di lato $x + 3$.

[[animazione:completamento-quadrato]]

>! In $-x^2 - 6x - 9$ i quadrati sono negativi. Raccogli il meno: $-(x^2 + 6x + 9) = -(x + 3)^2$.

### Quadrato di trinomio

$$\begin{gathered} A^2 + B^2 + C^2 + 2AB + 2AC + 2BC \\ = (A + B + C)^2 \end{gathered}$$

>* **Quadrato di trinomio:** **sei** termini. Tre quadrati e tre doppi prodotti, uno per ogni coppia di basi.

~ x^2 + 4y^2 + 1 + 4xy + 2x + 4y :: sei termini
~ (\evid{x})^2 + (\evid{2y})^2 + (\evid{1})^2 + \ldots :: tre quadrati: le basi sono $x$, $2y$, $1$
~ \ldots + \evid{4xy} + \evid{2x} + \evid{4y} :: controllo i tre doppi prodotti: $2 \cdot x \cdot 2y = 4xy$, $2 \cdot x \cdot 1 = 2x$, $2 \cdot 2y \cdot 1 = 4y$. Ci sono tutti
~ \evidb{(x + 2y + 1)^2} :: tutti i doppi prodotti sono positivi, quindi le basi hanno lo stesso segno

Con segni diversi, guarda i doppi prodotti: $x^2 + y^2 + 4 - 2xy + 4x - 4y = (x - y + 2)^2$. Il $-2xy$ dice che $x$ e $y$ hanno segni opposti. Il $+4x$ dice che $x$ e $2$ hanno lo stesso segno.` },

    { id: 'cubi', titolo: 'Cubo di binomio, somma e differenza di cubi', testo: R`### Cubo di binomio

$$\begin{gathered} A^3 + 3A^2B + 3AB^2 + B^3 \\ = (A + B)^3 \end{gathered}$$

$$\begin{gathered} A^3 - 3A^2B + 3AB^2 - B^3 \\ = (A - B)^3 \end{gathered}$$

>* **Cubo di binomio:** **quattro** termini, cioè due cubi e due **tripli prodotti**. Nel cubo di una differenza i segni si alternano.

~ 8x^3 - 12x^2 + 6x - 1 :: quattro termini
~ (\evid{2x})^3 \ldots (\evid{1})^3 :: i cubi sono $8x^3 = (2x)^3$ e $1 = 1^3$: le basi sono $2x$ e $1$
~ \ldots \evid{12x^2} \ldots \evid{6x} \ldots :: controllo i due tripli prodotti: $3 \cdot (2x)^2 \cdot 1 = 12x^2$ e $3 \cdot 2x \cdot 1^2 = 6x$. Ci sono
~ \evidb{(2x - 1)^3} :: i segni si alternano $+ - + -$: è il cubo di una differenza

Allo stesso modo $x^3 + 6x^2 + 12x + 8 = (x + 2)^3$. Le basi sono $x$ e $2$, e i segni sono tutti più.

### Somma e differenza di cubi

$$\begin{gathered} A^3 + B^3 \\ = (A + B)(A^2 - AB + B^2) \end{gathered}$$

$$\begin{gathered} A^3 - B^3 \\ = (A - B)(A^2 + AB + B^2) \end{gathered}$$

>* **Somma e differenza di cubi:** **due** termini, tutti e due cubi. Il secondo fattore si chiama **falso quadrato**. Ha $AB$ al posto di $2AB$, e non si scompone.

~ 27a^3 - b^3 :: due termini, un meno
~ (\evid{3a})^3 - (\evid{b})^3 :: le basi sono $3a$ e $b$
~ (3a - b)(\ldots) :: nel binomio, le basi con lo **stesso** segno del polinomio di partenza
~ (3a - b)(\evid{9a^2} + \evid{3ab} + \evid{b^2}) :: falso quadrato: quadrato della prima base, prodotto delle basi con il segno **opposto**, quadrato della seconda

?? Come si scompone $x^3 + 8$?
[ ] $(x + 2)^3$
[ ] $(x + 2)(x^2 + 2x + 4)$
[x] $(x + 2)(x^2 - 2x + 4)$
[ ] non si scompone, è una somma
=> Somma di cubi con basi $x$ e $2$. Nel falso quadrato il termine di mezzo ha il segno opposto: $(x + 2)(x^2 - 2x + 4)$. $(x + 2)^3$ sviluppato ha quattro termini. La somma di cubi **si scompone**, la somma di quadrati no.

>! $x^2 - 2x + 4$ non è $(x - 2)^2$: quello fa $x^2 - 4x + 4$.` },

    { id: 'trinomio-speciale', titolo: 'Il trinomio speciale', testo: R`### Il caso $x^2 + sx + p$

Sviluppa $(x + 3)(x + 4)$: ottieni $x^2 + 7x + 12$. Il $7$ è la **somma** di $3$ e $4$. Il $12$ è il loro **prodotto**.

[[video:scomposizione/rettangolo]]

>* **Trinomio speciale:** $x^2 + sx + p = (x + m)(x + n)$, con $m + n = s$ e $m \cdot n = p$. Parti dal prodotto, che ha meno possibilità. Poi controlla la somma.

- $x^2 - 5x + 6$: prodotto $6$, somma $-5$. Sono $-2$ e $-3$: $(x - 2)(x - 3)$.
- $x^2 - x - 6$: prodotto $-6$, somma $-1$. Sono $-3$ e $2$: $(x - 3)(x + 2)$.

I segni li leggi dal prodotto:

- se $p > 0$, i due numeri hanno lo **stesso segno**, quello di $s$;
- se $p < 0$, hanno **segni opposti**. Il più grande in valore assoluto prende il segno di $s$.

~ x^2 + 2x - 15 :: somma $s = 2$, prodotto $p = -15$
~ p < 0 \;\Rightarrow\; \text{segni opposti} :: un prodotto negativo viene da un positivo e un negativo
~ 1 \cdot 15 \qquad \evid{3 \cdot 5} :: le coppie che danno $15$; la somma $2$ è una differenza piccola: provo $3$ e $5$
~ \evid{+5} + (\evid{-3}) = 2 :: la somma è positiva, quindi il più grande, $5$, prende il più
~ \evidb{(x + 5)(x - 3)} :: i due numeri entrano nelle parentesi con il loro segno

?? Come si scompone $x^2 - 7x + 10$?
[ ] $(x + 2)(x + 5)$
[x] $(x - 2)(x - 5)$
[ ] $(x - 2)(x + 5)$
[ ] $(x - 1)(x - 10)$
=> Il prodotto $+10$ dice: segni uguali. La somma $-7$ dice: tutti e due negativi. Sono $-2$ e $-5$. $(x + 2)(x + 5)$ è l'errore tipico: numeri giusti, segni sbagliati. $(x - 1)(x - 10)$ ha il prodotto giusto, ma la somma è $-11$.

### Il caso $ax^2 + bx + c$

Ora davanti a $x^2$ c'è un numero $a \ne 1$. Cerca due numeri con somma $b$ e prodotto $a \cdot c$. Con questi **spezza** il termine in $x$. Poi raccogli a coppie.

~ 3x^2 - 5x - 2 :: $a = 3$, $b = -5$, $c = -2$
~ a \cdot c = \evid{-6} \qquad b = \evid{-5} :: cerco due numeri con prodotto $-6$ e somma $-5$: sono $-6$ e $1$
~ 3x^2 \evid{- 6x + x} - 2 :: spezzo $-5x$ in $-6x + x$
~ \evid{3x}(x - 2) + \evid{1}(x - 2) :: raccolgo a coppie: $3x$ dai primi due, $1$ dagli ultimi due
~ \evidb{(x - 2)(3x + 1)} :: le parentesi sono uguali: le raccolgo

> Se non trovi due numeri interi adatti, questo metodo non basta. Il trinomio si riprende con le equazioni di secondo grado.` },

    { id: 'ruffini', titolo: 'Scomporre con Ruffini', testo: R`Se gli altri metodi non funzionano, resta Ruffini. L'idea: se un numero $a$ annulla il polinomio, allora $(x - a)$ è un fattore.

>* **Teorema di Ruffini:** $P(x)$ è divisibile per $(x - a)$ se e solo se $P(a) = 0$. Un numero $a$ con $P(a) = 0$ si chiama **zero** del polinomio.

> Viene dal **teorema del resto**: dividendo $P(x)$ per $(x - a)$, il resto è $P(a)$.

Trovato uno zero $a$, dividi con la regola di Ruffini. Ottieni $P(x) = (x - a) \cdot Q(x)$. Il quoziente $Q(x)$ ha un grado in meno: continua a scomporre lui.

### Dove cercare gli zeri

Se i coefficienti sono interi, gli zeri interi stanno fra i **divisori del termine noto**. Prendili con il più e con il meno.

~ P(x) = x^3 - 2x^2 - 5x + 6 :: il polinomio da scomporre
~ \pm 1,\ \pm 2,\ \pm 3,\ \pm 6 :: i candidati: i divisori del termine noto $6$, con tutti e due i segni
~ P(\evid{1}) = 1 - 2 - 5 + 6 = \evidb{0} :: provo il più semplice: funziona, quindi $(x - 1)$ è un fattore

?? Quali sono i candidati zeri interi di $x^3 + 4x^2 + x - 6$?
[ ] $\pm 1, \pm 4$
[ ] $1, 2, 3, 6$
[x] $\pm 1, \pm 2, \pm 3, \pm 6$
[ ] $\pm 1, \pm 6$
=> Sono i divisori del termine noto $-6$, con tutti e due i segni. L'errore tipico è dimenticare i negativi: qui due zeri su tre sono negativi.

Ecco la tabella di Ruffini per $x^3 - 2x^2 - 5x + 6$, con lo zero $1$:

| | $1$ | $-2$ | $-5$ | $6$ |
|---|---|---|---|---|
| $1$ | | $1$ | $-1$ | $-6$ |
| | $1$ | $-1$ | $-6$ | $0$ |

L'ultima riga dà il quoziente $Q(x) = x^2 - x - 6$ e il resto $0$. $Q(x)$ è un trinomio speciale: $-3$ e $2$.

$$x^3 - 2x^2 - 5x + 6 = (x - 1)(x - 3)(x + 2)$$

Due scorciatoie:

- se la **somma dei coefficienti** è zero, $(x - 1)$ è un fattore;
- se i coefficienti di grado pari e quelli di grado dispari hanno la stessa somma, $(x + 1)$ è un fattore.

> Se il primo coefficiente non è $1$, cerca anche zeri a frazione $\dfrac{p}{q}$. Qui $p$ divide il termine noto e $q$ divide il primo coefficiente.

>! Nella tabella scrivi **tutti** i coefficienti, anche gli zeri dei termini che mancano. Per $x^3 - 7x + 6$ la prima riga è $1$, $0$, $-7$, $6$.` },

    { id: 'schema-decisione', titolo: 'In che ordine provare i metodi', testo: R`Davanti a un polinomio nuovo, segui sempre questo ordine:

1. **Raccogli** il fattore comune, se c'è.
2. **Conta i termini** e prova il metodo della tabella.
3. Se niente funziona, usa **Ruffini**.
4. Ricomincia da **ogni fattore** che hai ottenuto.
5. **Controlla**: rimoltiplica e ritrova il polinomio di partenza.

>* Hai finito solo quando **nessun fattore** si scompone più.

[[video:scomposizione/in-che-ordine]]

| Termini | Che cosa provare |
|---|---|
| 2 | differenza di quadrati; somma o differenza di cubi |
| 3 | quadrato di binomio; trinomio speciale |
| 4 | cubo di binomio; raccoglimento parziale (2 + 2) |
| 6 | quadrato di trinomio; raccoglimento parziale (3 + 3 oppure 2 + 2 + 2) |
| qualunque | Ruffini, se c'è una sola lettera e il resto non funziona |

Lo schema all'opera su $2x^4 - 32$:

~ 2x^4 - 32 :: primo passo, sempre: c'è un fattore comune?
~ \evid{2}(x^4 - 16) :: sì, il $2$. Nella parentesi restano due termini: provo la differenza di quadrati
~ 2(\evid{x^2 + 4})(\evid{x^2 - 4}) :: $x^4 = (x^2)^2$ e $16 = 4^2$: basi $x^2$ e $4$
~ 2(x^2 + 4)(\evid{x + 2})(\evid{x - 2}) :: ricomincio da ogni fattore: $x^2 - 4$ è ancora una differenza di quadrati
~ \evidb{2(x^2 + 4)(x + 2)(x - 2)} :: $x^2 + 4$ è una somma di quadrati, irriducibile: ho finito

Altri due casi:

- $3x^2 + 6x + 3$: raccogli $3$ e trovi un quadrato. $3(x^2 + 2x + 1) = 3(x + 1)^2$.
- $x^3 - x^2 - 4x + 4$: quattro termini, ma i cubi non ci sono. Raccogli a coppie: $x^2(x - 1) - 4(x - 1) = (x - 1)(x^2 - 4)$. Poi $x^2 - 4 = (x + 2)(x - 2)$.

?? Qual è la scomposizione completa di $x^3 - 9x$?
[ ] $x(x^2 - 9)$
[x] $x(x + 3)(x - 3)$
[ ] $(x + 3)(x - 3)$
[ ] $x(x - 3)^2$
=> Raccogli $x$: $x(x^2 - 9)$. Poi $x^2 - 9$ è una differenza di quadrati: $x(x + 3)(x - 3)$. $x(x^2 - 9)$ è giusta ma **non completa**. $(x + 3)(x - 3)$ ha perso la $x$ raccolta.

>! L'errore più comune è fermarsi troppo presto. Un $(x^2 - 4)$ dentro un prodotto vuol dire che non hai finito.` },

    { id: 'mcd-mcm-frazioni', titolo: 'MCD, mcm e frazioni algebriche', testo: R`### MCD e mcm di polinomi

Come con i numeri, prima scomponi tutti i polinomi.

>* **MCD:** i fattori **comuni**, con l'esponente **più piccolo**. **mcm:** tutti i fattori, **comuni e non comuni**, con l'esponente **più grande**.

Esempio: $A = x^2 - 1 = (x + 1)(x - 1)$ e $B = x^2 + 2x + 1 = (x + 1)^2$.

- $\text{MCD}(A, B) = x + 1$
- $\text{mcm}(A, B) = (x + 1)^2(x - 1)$

### Frazioni algebriche

Una **frazione algebrica** ha un polinomio sopra e uno sotto, come $\dfrac{x^2 - 4}{x^2 + 4x + 4}$. Il denominatore non può valere zero. Le **condizioni di esistenza** (c.e.) dicono quali valori di $x$ sono permessi. Per trovarle, scomponi il denominatore e poni ogni fattore diverso da zero.

Per **semplificare**, scomponi sopra e sotto. Poi dividi per i fattori comuni.

~ \dfrac{x^2 - 4}{x^2 + 4x + 4} :: la frazione da semplificare
~ \dfrac{x^2 - 4}{\evid{(x + 2)^2}} \qquad x \ne -2 :: scompongo il denominatore (quadrato di binomio) e scrivo **subito** le c.e.
~ \dfrac{\evid{(x + 2)(x - 2)}}{(x + 2)^2} :: scompongo il numeratore (differenza di quadrati)
~ \dfrac{\cancel{(x + 2)}(x - 2)}{\cancel{(x + 2)}(x + 2)} :: il fattore $(x + 2)$ è sopra e sotto: lo semplifico una volta
~ \evidb{\dfrac{x - 2}{x + 2}} \qquad x \ne -2 :: risultato, con le c.e. della frazione di partenza

?? Quale semplificazione è corretta?
[ ] $\dfrac{x + 3}{x} = 3$
[ ] $\dfrac{x^2 + 4}{x^2} = 4$
[x] $\dfrac{3x + 6}{3} = x + 2$
[ ] $\dfrac{x + 6}{2} = x + 3$
=> $3x + 6 = 3(x + 2)$: il $3$ è un **fattore** di tutto il numeratore, e si semplifica con il $3$ sotto. Nelle altre si cancellano **addendi**, e non si può. Prova con $x = 1$: $\dfrac{1 + 3}{1} = 4$, non $3$.

Per sommare, usa come denominatore comune il **mcm** dei denominatori:

~ \dfrac{1}{x - 1} + \dfrac{1}{x^2 - 1} :: denominatori diversi
~ \dfrac{1}{x - 1} + \dfrac{1}{\evid{(x + 1)(x - 1)}} :: scompongo: c.e. $x \ne 1$ e $x \ne -1$
~ \dfrac{\evid{(x + 1)} + 1}{(x + 1)(x - 1)} :: il mcm è $(x + 1)(x - 1)$; alla prima frazione manca il fattore $(x + 1)$
~ \evidb{\dfrac{x + 2}{(x + 1)(x - 1)}} :: sommo i numeratori

>! Scrivi le c.e. **prima** di semplificare. $\dfrac{x^2 - 1}{x - 1}$ diventa $x + 1$, ma per $x = 1$ la frazione di partenza non esiste. Il risultato vale per $x \ne 1$.` }
  ],

  grafici: {
    'differenza-quadrati': {
      tipo: 'piano', x: [-2.4, 16.8], y: [-1.6, 7.2], assi: false, griglia: false,
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [5, 0], [5, 3], [0, 3]], riempi: true, colore: 1 },
        { tipo: 'poligono', punti: [[0, 3], [3, 3], [3, 5], [0, 5]], riempi: true, colore: 2 },
        { tipo: 'poligono', punti: [[3, 3], [5, 3], [5, 5], [3, 5]], riempi: false, colore: 4 },
        { tipo: 'testo', p: [4, 3.85], testo: 'b²' },
        { tipo: 'testo', p: [2.5, -0.8], testo: 'a' },
        { tipo: 'testo', p: [-0.3, 1.4], testo: 'a − b', ancora: 'end' },
        { tipo: 'testo', p: [-0.3, 3.9], testo: 'b', ancora: 'end' },
        { tipo: 'testo', p: [1.5, 5.5], testo: 'a − b' },
        { tipo: 'testo', p: [4, 5.5], testo: 'b' },
        { tipo: 'testo', p: [2.5, 6.6], testo: 'a² − b²' },
        { tipo: 'testo', p: [6.4, 1.4], testo: '=' },
        { tipo: 'poligono', punti: [[7.5, 0], [12.5, 0], [12.5, 3], [7.5, 3]], riempi: true, colore: 1 },
        { tipo: 'poligono', punti: [[12.5, 0], [14.5, 0], [14.5, 3], [12.5, 3]], riempi: true, colore: 2 },
        { tipo: 'testo', p: [10, -0.8], testo: 'a' },
        { tipo: 'testo', p: [13.5, -0.8], testo: 'b' },
        { tipo: 'testo', p: [14.8, 1.4], testo: 'a − b', ancora: 'start' },
        { tipo: 'segmento', da: [14.5, 3.6], a: [7.5, 3.6], etichetta: 'a + b', colore: 4 },
        { tipo: 'testo', p: [11, 6.6], testo: '(a + b)(a − b)' }
      ],
      didascalia: 'Segui i colori: il rettangolo arancione in alto si gira e va a destra di quello blu; insieme fanno (a + b) × (a − b).'
    }
  },

  esempi: [
    { titolo: 'Raccoglimento totale', problema: R`Scomponi $12a^3b^2 - 18a^2b^3 + 6a^2b^2$.`, passi: [
      R`Cerco il MCD dei tre termini. Coefficienti $12$, $18$, $6$: il MCD è $6$. La lettera $a$ compare con esponenti $3$, $2$, $2$: prendo $a^2$. La $b$ con esponenti $2$, $3$, $2$: prendo $b^2$. Fattore comune: $6a^2b^2$.`,
      R`Divido ogni termine per $6a^2b^2$: $12a^3b^2 : 6a^2b^2 = 2a$, $-18a^2b^3 : 6a^2b^2 = -3b$, $6a^2b^2 : 6a^2b^2 = 1$.`,
      R`Quindi $12a^3b^2 - 18a^2b^3 + 6a^2b^2 = 6a^2b^2(2a - 3b + 1)$. Il terzo termine è diventato $1$, non zero: è l'errore da evitare.`,
      R`Controllo: $6a^2b^2 \cdot 2a = 12a^3b^2$, $6a^2b^2 \cdot (-3b) = -18a^2b^3$, $6a^2b^2 \cdot 1 = 6a^2b^2$. ✓`
    ], risultato: R`$6a^2b^2(2a - 3b + 1)$` },

    { titolo: 'Un quadrato nascosto dietro un raccoglimento', problema: R`Scomponi $2x^3 - 12x^2 + 18x$.`, passi: [
      R`Tre termini con un fattore comune: raccolgo $2x$ e ottengo $2x(x^2 - 6x + 9)$.`,
      R`Il trinomio nella parentesi ha due quadrati, $x^2$ e $9 = 3^2$, e il termine di mezzo vale $-6x$. Il doppio prodotto delle basi è $2 \cdot x \cdot 3 = 6x$: coincide, con il segno meno.`,
      R`È il quadrato di una differenza: $x^2 - 6x + 9 = (x - 3)^2$.`,
      R`Scomposizione completa: $2x(x - 3)^2$. Controllo: $(x - 3)^2 = x^2 - 6x + 9$, per $2x$ dà $2x^3 - 12x^2 + 18x$. ✓`
    ], risultato: R`$2x(x - 3)^2$` },

    { titolo: 'Trinomio con il coefficiente di $x^2$ diverso da 1', problema: R`Scomponi $6x^2 + 7x - 3$.`, passi: [
      R`Non c'è fattore comune e non è un quadrato di binomio ($6$ non è un quadrato perfetto). Provo il trinomio speciale con $a \ne 1$: cerco due numeri con somma $b = 7$ e prodotto $a \cdot c = 6 \cdot (-3) = -18$.`,
      R`Prodotto negativo: segni discordi. Le coppie con prodotto $-18$ sono $(18, -1)$, $(9, -2)$, $(6, -3)$ e le opposte; la somma $7$ la dà $9$ e $-2$.`,
      R`Spezzo il termine di primo grado: $7x = 9x - 2x$, quindi $6x^2 + 9x - 2x - 3$.`,
      R`Raccoglimento parziale: $3x(2x + 3) - (2x + 3) = (2x + 3)(3x - 1)$.`,
      R`Controllo: $(2x + 3)(3x - 1) = 6x^2 - 2x + 9x - 3 = 6x^2 + 7x - 3$. ✓`
    ], risultato: R`$(2x + 3)(3x - 1)$` },

    { titolo: 'Raccoglimento parziale e differenza di cubi', problema: R`Scomponi completamente $x^4 - x^3 + 8x - 8$.`, passi: [
      R`Quattro termini senza fattore comune; non è un cubo di binomio (mancano i tripli prodotti). Provo il raccoglimento parziale a coppie: $x^3(x - 1) + 8(x - 1)$.`,
      R`Le parentesi coincidono, raccolgo $(x - 1)$: $(x - 1)(x^3 + 8)$.`,
      R`Il secondo fattore è una somma di cubi, $x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)$.`,
      R`Il falso quadrato $x^2 - 2x + 4$ è irriducibile: non è un quadrato (il doppio prodotto sarebbe $4x$) e non è un trinomio speciale (nessuna coppia di interi ha prodotto $4$ e somma $-2$).`,
      R`Scomposizione completa: $(x - 1)(x + 2)(x^2 - 2x + 4)$. Controllo rapido: per $x = 1$ il polinomio vale $1 - 1 + 8 - 8 = 0$, e infatti c'è il fattore $(x - 1)$. ✓`
    ], risultato: R`$(x - 1)(x + 2)(x^2 - 2x + 4)$` },

    { titolo: 'Con la regola di Ruffini', problema: R`Scomponi $P(x) = x^3 + 2x^2 - 5x - 6$.`, passi: [
      R`Nessun fattore comune, nessun prodotto notevole, il raccoglimento parziale non dà parentesi uguali: uso Ruffini. Il termine noto è $-6$, quindi i candidati sono $\pm 1$, $\pm 2$, $\pm 3$, $\pm 6$.`,
      R`$P(1) = 1 + 2 - 5 - 6 = -8 \ne 0$. $P(-1) = -1 + 2 + 5 - 6 = 0$: $x = -1$ è uno zero, quindi $(x + 1)$ è un fattore.`,
      R`Divido con Ruffini: $a = -1$, coefficienti $1$, $2$, $-5$, $-6$. Abbasso il primo, $1$.`,
      R`Moltiplico per $a$ e sommo al successivo: $-1 \cdot 1 = -1$ e $2 - 1 = 1$; poi $-1 \cdot 1 = -1$ e $-5 - 1 = -6$; infine $-1 \cdot (-6) = 6$ e $-6 + 6 = 0$. Il resto è $0$, come doveva essere.`,
      R`I numeri $1$, $1$, $-6$ sono i coefficienti del quoziente, di secondo grado: $Q(x) = x^2 + x - 6$, e $P(x) = (x + 1)(x^2 + x - 6)$.`,
      R`$Q(x)$ è un trinomio speciale: prodotto $-6$, somma $1$, cioè $3$ e $-2$: $Q(x) = (x + 3)(x - 2)$.`,
      R`Quindi $P(x) = (x + 1)(x + 3)(x - 2)$. Controllo: $(x + 1)(x + 3) = x^2 + 4x + 3$, e $(x^2 + 4x + 3)(x - 2) = x^3 - 2x^2 + 4x^2 - 8x + 3x - 6 = x^3 + 2x^2 - 5x - 6$. ✓`
    ], risultato: R`$(x + 1)(x + 3)(x - 2)$` },

    { titolo: 'Semplificare una frazione algebrica', problema: R`Scrivi le condizioni di esistenza e semplifica $\dfrac{x^3 - 4x}{x^2 - 4x + 4}$.`, passi: [
      R`Scompongo il denominatore: $x^2 - 4x + 4 = (x - 2)^2$ (doppio prodotto $2 \cdot x \cdot 2 = 4x$ ✓). C.e.: $(x - 2)^2 \ne 0$, cioè $x \ne 2$.`,
      R`Scompongo il numeratore: raccolgo $x$, $x(x^2 - 4)$, poi differenza di quadrati: $x(x + 2)(x - 2)$.`,
      R`La frazione diventa $\dfrac{x(x + 2)(x - 2)}{(x - 2)^2}$: il fattore comune è $(x - 2)$, lo semplifico una volta sopra e una sotto.`,
      R`Risultato: $\dfrac{x(x + 2)}{x - 2}$, valido per $x \ne 2$. La condizione resta anche se il denominatore è cambiato: la frazione di partenza in $x = 2$ non esiste.`
    ], risultato: R`$\dfrac{x(x + 2)}{x - 2}$ con c.e. $x \ne 2$` }
  ],

  formulario: [
    { nome: 'Raccoglimento totale', formula: R`AB + AC = A\,(B + C)`, nota: R`$A$ è il MCD dei termini: MCD dei coefficienti e lettere comuni con l'esponente minimo.` },
    { nome: 'Raccoglimento parziale', formula: R`AX + AY + BX + BY = (A + B)(X + Y)`, nota: R`Funziona solo se, dopo il primo raccoglimento, le parentesi coincidono.` },
    { nome: 'Differenza di quadrati', formula: R`A^2 - B^2 = (A + B)(A - B)`, nota: R`La somma di quadrati $A^2 + B^2$ è irriducibile.` },
    { nome: 'Quadrato di binomio', formula: R`A^2 \pm 2AB + B^2 = (A \pm B)^2`, nota: R`Controllo: il termine di mezzo deve essere il doppio prodotto delle basi.` },
    { nome: 'Quadrato di trinomio', formula: R`A^2 + B^2 + C^2 + 2AB + 2AC + 2BC = (A + B + C)^2`, nota: R`Sei termini: tre quadrati e tre doppi prodotti.` },
    { nome: 'Cubo di binomio', formula: R`A^3 \pm 3A^2B + 3AB^2 \pm B^3 = (A \pm B)^3`, nota: R`Quattro termini: due cubi e due tripli prodotti.` },
    { nome: 'Somma di cubi', formula: R`A^3 + B^3 = (A + B)(A^2 - AB + B^2)`, nota: R`Il secondo fattore è il falso quadrato, irriducibile.` },
    { nome: 'Differenza di cubi', formula: R`A^3 - B^3 = (A - B)(A^2 + AB + B^2)` },
    { nome: 'Trinomio speciale', formula: R`x^2 + sx + p = (x + m)(x + n), \quad m + n = s,\ mn = p` },
    { nome: 'Trinomio con a ≠ 1', formula: R`ax^2 + bx + c = ax^2 + mx + nx + c, \quad m + n = b,\ mn = ac`, nota: R`Poi si conclude con un raccoglimento parziale.` },
    { nome: 'Teorema del resto', formula: R`P(x) : (x - a) \ \text{ha resto } P(a)` },
    { nome: 'Teorema di Ruffini', formula: R`(x - a) \mid P(x) \iff P(a) = 0`, nota: R`Gli zeri interi si cercano fra i divisori del termine noto; quelli frazionari $\frac{p}{q}$ con $p$ divisore del termine noto e $q$ divisore del primo coefficiente.` },
    { nome: 'MCD e mcm di polinomi', formula: R`\text{MCD}: \text{fattori comuni, esponente minimo} \qquad \text{mcm}: \text{fattori comuni e non, esponente massimo}` },
    { nome: 'Frazione algebrica', formula: R`\frac{N(x)}{D(x)}, \qquad \text{c.e.: } D(x) \ne 0`, nota: R`Si semplifica dividendo numeratore e denominatore per i fattori comuni, mai per gli addendi.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'perche-scomporre', tipo: 'definizione', fronte: R`Scomporre un polinomio in fattori`, retro: R`Scriverlo come prodotto di polinomi di grado più basso.` },
    { id: 'fc-02', sezione: 'perche-scomporre', tipo: 'definizione', fronte: R`Polinomio irriducibile`, retro: R`Un polinomio che non si può scomporre: è l'analogo di un numero primo. Per esempio $x^2 + 1$.` },
    { id: 'fc-03', sezione: 'perche-scomporre', tipo: 'concetto', fronte: R`Perché la scomposizione serve nelle equazioni?`, retro: R`Per la legge di annullamento del prodotto: da $(x - 2)(x - 3) = 0$ si legge subito $x = 2$ oppure $x = 3$.` },
    { id: 'fc-04', sezione: 'perche-scomporre', tipo: 'procedura', fronte: R`Come si controlla una scomposizione?`, retro: R`Si moltiplicano i fattori: deve tornare il polinomio di partenza.` },
    { id: 'fc-05', sezione: 'raccoglimento', tipo: 'procedura', fronte: R`Che cosa si raccoglie nel raccoglimento totale?`, retro: R`Il MCD dei termini: MCD dei coefficienti per le lettere comuni a tutti i termini, con l'esponente minimo.` },
    { id: 'fc-06', sezione: 'raccoglimento', tipo: 'procedura', fronte: R`Raccoglimento parziale`, retro: R`Si raccoglie a gruppi; se le parentesi ottenute sono uguali si raccolgono a loro volta: $ax + ay + bx + by = (x + y)(a + b)$.` },
    { id: 'fc-07', sezione: 'raccoglimento', tipo: 'concetto', fronte: R`$2x^2 + 2x = 2x(x + \;?\;)$`, retro: R`$2x(x + 1)$: quando un termine coincide con il fattore raccolto resta $1$, non $0$.` },
    { id: 'fc-08', sezione: 'differenza-quadrati', tipo: 'formula', fronte: R`Differenza di quadrati`, retro: R`$A^2 - B^2 = (A + B)(A - B)$` },
    { id: 'fc-09', sezione: 'differenza-quadrati', tipo: 'concetto', fronte: R`$x^2 + 9$ si scompone?`, retro: R`No: la somma di due quadrati è irriducibile in $\mathbb{R}$ (non vale mai zero).` },
    { id: 'fc-10', sezione: 'quadrati', tipo: 'formula', fronte: R`Quadrato di binomio (al contrario)`, retro: R`$A^2 \pm 2AB + B^2 = (A \pm B)^2$` },
    { id: 'fc-11', sezione: 'quadrati', tipo: 'procedura', fronte: R`Come si riconosce un quadrato di binomio?`, retro: R`Tre termini: due quadrati (positivi) e un terzo termine uguale al doppio prodotto delle due basi, con segno più o meno.` },
    { id: 'fc-12', sezione: 'quadrati', tipo: 'formula', fronte: R`Quadrato di trinomio`, retro: R`$A^2 + B^2 + C^2 + 2AB + 2AC + 2BC = (A + B + C)^2$: sei termini.` },
    { id: 'fc-13', sezione: 'cubi', tipo: 'formula', fronte: R`Cubo di binomio (al contrario)`, retro: R`$A^3 \pm 3A^2B + 3AB^2 \pm B^3 = (A \pm B)^3$: due cubi e due tripli prodotti.` },
    { id: 'fc-14', sezione: 'cubi', tipo: 'formula', fronte: R`Somma di cubi`, retro: R`$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$` },
    { id: 'fc-15', sezione: 'cubi', tipo: 'formula', fronte: R`Differenza di cubi`, retro: R`$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$` },
    { id: 'fc-16', sezione: 'cubi', tipo: 'definizione', fronte: R`Falso quadrato`, retro: R`Il trinomio $A^2 \mp AB + B^2$ che compare nella somma e differenza di cubi: ha $AB$ al posto di $2AB$ ed è irriducibile.` },
    { id: 'fc-17', sezione: 'trinomio-speciale', tipo: 'procedura', fronte: R`Trinomio speciale $x^2 + sx + p$`, retro: R`Si cercano due numeri $m$, $n$ con $m + n = s$ e $mn = p$: allora $x^2 + sx + p = (x + m)(x + n)$.` },
    { id: 'fc-18', sezione: 'trinomio-speciale', tipo: 'procedura', fronte: R`Trinomio $ax^2 + bx + c$ con $a \ne 1$`, retro: R`Due numeri con somma $b$ e prodotto $ac$; si spezza $bx$ nei due addendi e si fa un raccoglimento parziale.` },
    { id: 'fc-19', sezione: 'trinomio-speciale', tipo: 'concetto', fronte: R`Segni dei due numeri nel trinomio speciale`, retro: R`Se $p > 0$ sono concordi, con il segno di $s$. Se $p < 0$ sono discordi, e il più grande in valore assoluto ha il segno di $s$.` },
    { id: 'fc-20', sezione: 'ruffini', tipo: 'definizione', fronte: R`Teorema del resto`, retro: R`Il resto della divisione di $P(x)$ per $(x - a)$ è $P(a)$.` },
    { id: 'fc-21', sezione: 'ruffini', tipo: 'definizione', fronte: R`Teorema di Ruffini`, retro: R`$P(x)$ è divisibile per $(x - a)$ se e solo se $P(a) = 0$.` },
    { id: 'fc-22', sezione: 'ruffini', tipo: 'procedura', fronte: R`Dove si cercano gli zeri per Ruffini?`, retro: R`Fra i divisori (positivi e negativi) del termine noto; se il primo coefficiente non è $1$, anche fra le frazioni $\frac{p}{q}$ con $p$ divisore del termine noto e $q$ divisore del primo coefficiente.` },
    { id: 'fc-23', sezione: 'ruffini', tipo: 'concetto', fronte: R`Somma dei coefficienti uguale a zero`, retro: R`Allora $P(1) = 0$ e $(x - 1)$ è un fattore. Se coefficienti pari e dispari hanno la stessa somma, $P(-1) = 0$ e $(x + 1)$ è un fattore.` },
    { id: 'fc-24', sezione: 'schema-decisione', tipo: 'procedura', fronte: R`In che ordine si provano i metodi?`, retro: R`1) Raccoglimento totale. 2) Conta i termini: 2 → quadrati o cubi; 3 → quadrato di binomio o trinomio speciale; 4 → cubo o parziale; 6 → quadrato di trinomio o parziale. 3) Ruffini. Poi si ripete su ogni fattore.` },
    { id: 'fc-25', sezione: 'mcd-mcm-frazioni', tipo: 'procedura', fronte: R`MCD e mcm di polinomi`, retro: R`Si scompongono. MCD: fattori comuni con l'esponente minimo. mcm: fattori comuni e non comuni con l'esponente massimo.` },
    { id: 'fc-26', sezione: 'mcd-mcm-frazioni', tipo: 'procedura', fronte: R`Condizioni di esistenza di una frazione algebrica`, retro: R`Si scompone il denominatore e si impone che ogni fattore sia diverso da zero. Vanno scritte prima di semplificare.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Scomponi $4x + 12$. Scrivi i fattori uno accanto all'altro, come *2(x+1)*.`, suggerimenti: [R`Quale numero divide sia $4$ sia $12$?`], risposta: scomp('4', 'x+3'), soluzione: [R`Il $4$ divide tutti e due i termini: è il fattore comune.`, R`$4x : 4 = x$ e $12 : 4 = 3$. Risultato: $4(x + 3)$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Scomponi $x^2 + 5x$.`, suggerimenti: [R`La $x$ compare in tutti e due i termini.`], risposta: scomp('x', 'x+5'), soluzione: [R`Il fattore comune è $x$.`, R`$x^2 : x = x$ e $5x : x = 5$. Risultato: $x(x + 5)$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Scomponi $x^2 - 25$.`, suggerimenti: [R`Due termini, un meno in mezzo, tutti e due quadrati: $25 = 5^2$.`], risposta: scomp('', 'x+5', 'x-5'), soluzione: [R`È una differenza di quadrati con basi $x$ e $5$.`, R`Somma delle basi per differenza delle basi: $(x + 5)(x - 5)$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Scomponi $x^2 + 6x + 9$. Per il quadrato usa ^, come *(x+1)^2*.`, suggerimenti: [R`$x^2$ e $9$ sono quadrati: controlla il doppio prodotto.`, R`$2 \cdot x \cdot 3 = 6x$.`], risposta: scomp('', 'x+3', 'x+3'), soluzione: [R`I quadrati sono $x^2$ e $9 = 3^2$: le basi sono $x$ e $3$.`, R`Il doppio prodotto $2 \cdot x \cdot 3 = 6x$ c'è, con il più.`, R`Risultato: $(x + 3)^2$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Scomponi $x^2 + 5x + 6$.`, suggerimenti: [R`Cerca due numeri con somma $5$ e prodotto $6$.`], risposta: scomp('', 'x+2', 'x+3'), soluzione: [R`Due numeri con prodotto $6$ e somma $5$: sono $2$ e $3$.`, R`Risultato: $(x + 2)(x + 3)$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Scomponi $3x^2 - 6x$.`, suggerimenti: [R`Raccogli il MCD dei coefficienti e la $x$.`], risposta: scomp('3x', 'x-2'), soluzione: [R`Il MCD di $3$ e $6$ è $3$. La $x$ è in tutti e due i termini.`, R`Fattore comune $3x$: $3x^2 : 3x = x$ e $-6x : 3x = -2$.`, R`Risultato: $3x(x - 2)$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Scomponi $4x^2 - 1$.`, suggerimenti: [R`$4x^2 = (2x)^2$ e $1 = 1^2$.`], risposta: scomp('', '2x+1', '2x-1'), soluzione: [R`È una differenza di quadrati con basi $2x$ e $1$.`, R`Risultato: $(2x + 1)(2x - 1)$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Scomponi $x^2 - 10x + 25$. Per il quadrato usa ^.`, suggerimenti: [R`Le basi sono $x$ e $5$. Il termine di mezzo è negativo.`], risposta: scomp('', 'x-5', 'x-5'), soluzione: [R`I quadrati sono $x^2$ e $25 = 5^2$. Il doppio prodotto è $2 \cdot x \cdot 5 = 10x$.`, R`Il termine di mezzo ha il meno: $(x - 5)^2$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Scomponi $x^2 - 7x + 12$.`, suggerimenti: [R`Prodotto $12$, somma $-7$: i due numeri hanno lo stesso segno.`, R`Sono tutti e due negativi.`], risposta: scomp('', 'x-3', 'x-4'), soluzione: [R`Prodotto positivo e somma negativa: due numeri negativi.`, R`$-3$ e $-4$ hanno prodotto $12$ e somma $-7$.`, R`Risultato: $(x - 3)(x - 4)$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Scomponi $6x^3 + 9x^2$. Per gli esponenti usa ^.`, suggerimenti: [R`MCD di $6$ e $9$, poi la $x$ con l'esponente più piccolo.`], risposta: scomp('3x^2', '2x+3'), soluzione: [R`Il MCD di $6$ e $9$ è $3$. La $x$ con l'esponente più piccolo è $x^2$.`, R`Fattore comune $3x^2$: $6x^3 : 3x^2 = 2x$ e $9x^2 : 3x^2 = 3$.`, R`Risultato: $3x^2(2x + 3)$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Scomponi $x^2 + 2x - 8$.`, suggerimenti: [R`Prodotto $-8$: i due numeri hanno segni opposti. La somma è $2$.`], risposta: scomp('', 'x+4', 'x-2'), soluzione: [R`Prodotto negativo: un numero positivo e uno negativo.`, R`$4$ e $-2$ hanno prodotto $-8$ e somma $2$.`, R`Risultato: $(x + 4)(x - 2)$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Scomponi $9x^2 - 16$.`, suggerimenti: [R`$9x^2 = (3x)^2$ e $16 = 4^2$.`], risposta: scomp('', '3x+4', '3x-4'), soluzione: [R`È una differenza di quadrati con basi $3x$ e $4$.`, R`Risultato: $(3x + 4)(3x - 4)$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Scomponi $4x^2 + 4x + 1$. Per il quadrato usa ^.`, suggerimenti: [R`$4x^2 = (2x)^2$ e $1 = 1^2$. Controlla il doppio prodotto.`], risposta: scomp('', '2x+1', '2x+1'), soluzione: [R`Le basi sono $2x$ e $1$.`, R`Il doppio prodotto $2 \cdot 2x \cdot 1 = 4x$ c'è, con il più.`, R`Risultato: $(2x + 1)^2$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Scomponi $x^2 - x - 12$.`, suggerimenti: [R`Prodotto $-12$, somma $-1$.`, R`Il numero più grande in valore assoluto è negativo.`], risposta: scomp('', 'x-4', 'x+3'), soluzione: [R`Prodotto negativo: i due numeri hanno segni opposti.`, R`$-4$ e $3$ hanno prodotto $-12$ e somma $-1$.`, R`Risultato: $(x - 4)(x + 3)$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Scomponi $25 - x^2$.`, suggerimenti: [R`Due quadrati con un meno in mezzo. Qui il primo quadrato è $25$.`], risposta: scomp('', '5+x', '5-x'), soluzione: [R`È una differenza di quadrati: $5^2 - x^2$, con basi $5$ e $x$.`, R`Risultato: $(5 + x)(5 - x)$. Va bene anche $-(x + 5)(x - 5)$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Scomponi $2x^2 - 18$.`, suggerimenti: [R`Prima raccogli il fattore comune.`, R`Dopo il raccoglimento resta una differenza di quadrati.`], risposta: scomp('2', 'x+3', 'x-3'), soluzione: [R`Raccolgo $2$: $2(x^2 - 9)$.`, R`$x^2 - 9$ è una differenza di quadrati: $(x + 3)(x - 3)$.`, R`Risultato: $2(x + 3)(x - 3)$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Scomponi $3x^2 + 6x + 3$. Per il quadrato usa ^.`, suggerimenti: [R`Raccogli $3$.`, R`Nella parentesi c'è un quadrato di binomio.`], risposta: scomp('3', 'x+1', 'x+1'), soluzione: [R`Raccolgo $3$: $3(x^2 + 2x + 1)$.`, R`$x^2 + 2x + 1 = (x + 1)^2$: il doppio prodotto è $2 \cdot x \cdot 1 = 2x$.`, R`Risultato: $3(x + 1)^2$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Scomponi $x^3 - 4x$.`, suggerimenti: [R`Raccogli $x$.`, R`Poi $x^2 - 4$ si scompone ancora.`], risposta: scomp('x', 'x+2', 'x-2'), soluzione: [R`Raccolgo $x$: $x(x^2 - 4)$.`, R`$x^2 - 4$ è una differenza di quadrati: $(x + 2)(x - 2)$.`, R`Risultato: $x(x + 2)(x - 2)$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Scomponi $2x^2 + 10x + 12$.`, suggerimenti: [R`Raccogli $2$.`, R`Poi cerca due numeri con somma $5$ e prodotto $6$.`], risposta: scomp('2', 'x+2', 'x+3'), soluzione: [R`Raccolgo $2$: $2(x^2 + 5x + 6)$.`, R`Trinomio speciale: $2$ e $3$ hanno somma $5$ e prodotto $6$.`, R`Risultato: $2(x + 2)(x + 3)$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Scomponi $x^3 - 6x^2 + 9x$. Per il quadrato usa ^.`, suggerimenti: [R`Raccogli $x$.`, R`Nella parentesi c'è un quadrato di binomio.`], risposta: scomp('x', 'x-3', 'x-3'), soluzione: [R`Raccolgo $x$: $x(x^2 - 6x + 9)$.`, R`$x^2 - 6x + 9 = (x - 3)^2$: il doppio prodotto è $6x$, con il meno.`, R`Risultato: $x(x - 3)^2$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Scomponi $3x^2 - 27$.`, suggerimenti: [R`Prima di tutto: c'è un fattore comune?`, R`Dopo aver raccolto $3$ resta una differenza di quadrati.`], risposta: { tipo: 'testo', accettate: ['3(x+3)(x-3)', '3(x-3)(x+3)', '3(x+3)(x−3)', '3(x−3)(x+3)', '(x+3)(x-3)3', '(x-3)(x+3)3', '3*(x+3)(x-3)', '3*(x-3)(x+3)'] }, soluzione: [R`Raccoglimento totale: $3x^2 - 27 = 3(x^2 - 9)$.`, R`$x^2 - 9$ è una differenza di quadrati con basi $x$ e $3$: $(x + 3)(x - 3)$.`, R`Scomposizione completa: $3(x + 3)(x - 3)$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Scomponi $x^2 - 8x + 16$.`, suggerimenti: [R`Tre termini, due dei quali sono quadrati: che cosa potrebbe essere?`, R`Controlla il doppio prodotto: $2 \cdot x \cdot 4 = 8x$.`], risposta: { tipo: 'testo', accettate: ['(x-4)^2', '(x-4)²', '(x−4)^2', '(x−4)²', '(x-4)(x-4)', '(x−4)(x−4)'] }, soluzione: [R`I quadrati sono $x^2$ e $16 = 4^2$; il doppio prodotto delle basi è $2 \cdot x \cdot 4 = 8x$, presente con il segno meno.`, R`È il quadrato di una differenza: $x^2 - 8x + 16 = (x - 4)^2$.`, R`Controllo: $(x - 4)^2 = x^2 - 8x + 16$. ✓`] },
    { id: 'es-03', difficolta: 1, testo: R`Scomponi $x^2 + 3x - 10$.`, suggerimenti: [R`Non è un quadrato: il doppio prodotto non torna. Prova il trinomio speciale.`, R`Cerca due numeri con prodotto $-10$ e somma $3$.`], risposta: { tipo: 'testo', accettate: ['(x+5)(x-2)', '(x-2)(x+5)', '(x+5)(x−2)', '(x−2)(x+5)'] }, soluzione: [R`Prodotto $-10$: i numeri sono discordi. Le coppie sono $(10, -1)$, $(5, -2)$ e le opposte.`, R`La somma $3$ la dà $5$ e $-2$: $x^2 + 3x - 10 = (x + 5)(x - 2)$.`, R`Controllo: $(x + 5)(x - 2) = x^2 - 2x + 5x - 10 = x^2 + 3x - 10$. ✓`] },
    { id: 'es-04', difficolta: 1, testo: R`Scomponi $x^3 - 27$.`, suggerimenti: [R`Due termini: $27$ è un cubo?`, R`Differenza di cubi: $A^3 - B^3 = (A - B)(A^2 + AB + B^2)$ con $A = x$ e $B = 3$.`], risposta: { tipo: 'testo', accettate: ['(x-3)(x^2+3x+9)', '(x^2+3x+9)(x-3)', '(x−3)(x²+3x+9)', '(x-3)(x²+3x+9)', '(x²+3x+9)(x−3)', '(x²+3x+9)(x-3)', '(x−3)(x^2+3x+9)', '(x^2+3x+9)(x−3)'] }, soluzione: [R`$27 = 3^3$, quindi $x^3 - 27$ è una differenza di cubi con basi $x$ e $3$.`, R`$x^3 - 27 = (x - 3)(x^2 + 3x + 9)$.`, R`Il falso quadrato $x^2 + 3x + 9$ non si scompone: il doppio prodotto sarebbe $6x$, e nessuna coppia di interi ha prodotto $9$ e somma $3$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Scomponi $2x^3 - 3x^2 + 4x - 6$.`, suggerimenti: [R`Quattro termini senza fattore comune: raggruppa a coppie.`, R`$x^2(2x - 3) + 2(2x - 3)$: le parentesi coincidono.`], risposta: { tipo: 'testo', accettate: ['(2x-3)(x^2+2)', '(x^2+2)(2x-3)', '(2x−3)(x²+2)', '(x²+2)(2x−3)', '(2x-3)(x²+2)', '(x²+2)(2x-3)', '(2x−3)(x^2+2)', '(x^2+2)(2x−3)'] }, soluzione: [R`Raccoglimento parziale: $2x^3 - 3x^2 + 4x - 6 = x^2(2x - 3) + 2(2x - 3)$.`, R`Raccolgo $(2x - 3)$: $(2x - 3)(x^2 + 2)$.`, R`$x^2 + 2$ è sempre positivo, quindi non ha zeri ed è irriducibile: la scomposizione è completa.`] },
    { id: 'es-06', difficolta: 2, testo: R`Per quali valori di $k$ il trinomio $x^2 + kx + 25$ è il quadrato di un binomio?`, suggerimenti: [R`Le basi sono $x$ e $5$. Che cosa deve essere il termine di mezzo?`, R`Il doppio prodotto $2 \cdot x \cdot 5$ può avere segno più o meno.`], risposta: { tipo: 'numeri', valori: [10, -10] }, soluzione: [R`I quadrati sono $x^2$ e $25 = 5^2$; il termine di mezzo deve essere $\pm 2 \cdot x \cdot 5 = \pm 10x$.`, R`Quindi $k = 10$, e il trinomio è $(x + 5)^2$, oppure $k = -10$, e il trinomio è $(x - 5)^2$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Scomponi $2x^2 - 5x - 3$.`, suggerimenti: [R`Il coefficiente di $x^2$ è $2$: usa il trinomio speciale con $a \ne 1$.`, R`Cerca due numeri con somma $-5$ e prodotto $a \cdot c = -6$.`, R`Sono $-6$ e $1$: spezza $-5x = -6x + x$ e raccogli a coppie.`], risposta: { tipo: 'testo', accettate: ['(x-3)(2x+1)', '(2x+1)(x-3)', '(x−3)(2x+1)', '(2x+1)(x−3)'] }, soluzione: [R`$a \cdot c = 2 \cdot (-3) = -6$ e $b = -5$: i numeri sono $-6$ e $1$.`, R`$2x^2 - 6x + x - 3 = 2x(x - 3) + (x - 3) = (x - 3)(2x + 1)$.`, R`Controllo: $(x - 3)(2x + 1) = 2x^2 + x - 6x - 3 = 2x^2 - 5x - 3$. ✓`] },
    { id: 'es-08', difficolta: 2, testo: R`Scomponi $P(x) = x^3 - 7x + 6$ con Ruffini e indica i suoi zeri.`, suggerimenti: [R`La somma dei coefficienti è $1 + 0 - 7 + 6 = 0$: che cosa ti dice?`, R`Nella tabella la prima riga è $1$, $0$, $-7$, $6$: non dimenticare lo zero del termine in $x^2$.`, R`Il quoziente $x^2 + x - 6$ è un trinomio speciale.`], risposta: { tipo: 'numeri', valori: [1, 2, -3] }, soluzione: [R`Somma dei coefficienti nulla, quindi $P(1) = 0$ e $(x - 1)$ è un fattore.`, R`Ruffini con $a = 1$ e coefficienti $1$, $0$, $-7$, $6$: abbasso $1$; $0 + 1 = 1$; $-7 + 1 = -6$; $6 - 6 = 0$. Quoziente $x^2 + x - 6$.`, R`$x^2 + x - 6$: prodotto $-6$, somma $1$, cioè $3$ e $-2$: $(x + 3)(x - 2)$.`, R`$P(x) = (x - 1)(x - 2)(x + 3)$; gli zeri sono $1$, $2$ e $-3$. Controllo: $P(2) = 8 - 14 + 6 = 0$ e $P(-3) = -27 + 21 + 6 = 0$. ✓`] },
    { id: 'es-09', difficolta: 2, testo: R`Semplifica $\dfrac{x^2 - 9}{x^2 - 6x + 9}$ dopo aver scritto le condizioni di esistenza.`, suggerimenti: [R`Scomponi numeratore e denominatore prima di qualunque semplificazione.`, R`Il denominatore è un quadrato di binomio; il numeratore una differenza di quadrati.`], risposta: { tipo: 'testo', accettate: ['(x+3)/(x-3)', '(x+3)/(x−3)', '(x+3):(x-3)', '(x+3):(x−3)'] }, soluzione: [R`Denominatore: $x^2 - 6x + 9 = (x - 3)^2$. C.e.: $x \ne 3$.`, R`Numeratore: $x^2 - 9 = (x + 3)(x - 3)$.`, R`$\dfrac{(x + 3)(x - 3)}{(x - 3)^2} = \dfrac{x + 3}{x - 3}$, per $x \ne 3$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Scomponi completamente $x^4 - 5x^2 + 4$ e indica tutti i valori di $x$ che lo annullano.`, suggerimenti: [R`Non è un quadrato di binomio. Guardalo come un trinomio in $x^2$.`, R`Due numeri con prodotto $4$ e somma $-5$: $-1$ e $-4$.`, R`Ognuno dei due fattori ottenuti è una differenza di quadrati.`], risposta: { tipo: 'numeri', valori: [-2, -1, 1, 2] }, soluzione: [R`Trinomio speciale in $x^2$: $x^4 - 5x^2 + 4 = (x^2 - 1)(x^2 - 4)$, perché $(-1) + (-4) = -5$ e $(-1)(-4) = 4$.`, R`Entrambi i fattori sono differenze di quadrati: $(x + 1)(x - 1)(x + 2)(x - 2)$.`, R`Il polinomio si annulla quando un fattore vale zero: $x = -1$, $x = 1$, $x = -2$, $x = 2$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Calcola MCD e mcm dei polinomi $A = x^3 - x$ e $B = x^2 - 2x + 1$.`, suggerimenti: [R`Scomponi entrambi fino in fondo.`, R`$A = x(x + 1)(x - 1)$ e $B = (x - 1)^2$: quali fattori sono comuni?`], soluzione: [R`$A = x^3 - x = x(x^2 - 1) = x(x + 1)(x - 1)$.`, R`$B = x^2 - 2x + 1 = (x - 1)^2$.`, R`Fattore comune: $(x - 1)$, con esponente minimo $1$. $\text{MCD}(A, B) = x - 1$.`, R`Tutti i fattori con l'esponente massimo: $\text{mcm}(A, B) = x(x + 1)(x - 1)^2$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Scrivi le condizioni di esistenza e semplifica $\dfrac{x^3 + 8}{x^2 - 4}$. Come risposta indica i valori di $x$ esclusi dalle c.e.`, suggerimenti: [R`Il denominatore è una differenza di quadrati: quali valori lo annullano?`, R`Il numeratore è una somma di cubi: $x^3 + 2^3$.`, R`Dopo la scomposizione un fattore compare sopra e sotto.`], risposta: { tipo: 'numeri', valori: [-2, 2] }, soluzione: [R`Denominatore: $x^2 - 4 = (x + 2)(x - 2)$. C.e.: $x \ne -2$ e $x \ne 2$.`, R`Numeratore: $x^3 + 8 = (x + 2)(x^2 - 2x + 4)$.`, R`$\dfrac{(x + 2)(x^2 - 2x + 4)}{(x + 2)(x - 2)} = \dfrac{x^2 - 2x + 4}{x - 2}$, con $x \ne \pm 2$.`, R`Il falso quadrato $x^2 - 2x + 4$ non si semplifica ulteriormente: è irriducibile.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Scomporre un polinomio in fattori significa…`, opzioni: [R`svilupparlo eliminando le parentesi`, R`scriverlo come prodotto di polinomi di grado più basso`, R`calcolarne il valore per $x = 0$`, R`dividerlo per il suo termine noto`], corretta: 1, spiegazione: R`Scomporre è l'operazione inversa dello sviluppare: si passa da una somma di termini a un prodotto di fattori. Le altre opzioni non producono un prodotto.` },
    { id: 'q-02', domanda: R`Qual è il primo metodo da provare, sempre, davanti a un polinomio da scomporre?`, opzioni: [R`il raccoglimento totale`, R`la regola di Ruffini`, R`la differenza di quadrati`, R`il trinomio speciale`], corretta: 0, spiegazione: R`Il raccoglimento totale va provato per primo: semplifica i numeri e fa comparire i prodotti notevoli. Ruffini è l'ultima risorsa, gli altri metodi dipendono dal numero di termini.` },
    { id: 'q-03', domanda: R`Il binomio $x^2 + 16$…`, opzioni: [R`si scompone come $(x + 4)^2$`, R`si scompone come $(x + 4)(x - 4)$`, R`è irriducibile in $\mathbb{R}$`, R`si scompone con Ruffini usando lo zero $x = 4$`], corretta: 2, spiegazione: R`Una somma di quadrati non si scompone. $(x + 4)^2 = x^2 + 8x + 16$ e $(x + 4)(x - 4) = x^2 - 16$ sono altri polinomi, e $P(4) = 32 \ne 0$.` },
    { id: 'q-04', domanda: R`Quale dei seguenti trinomi è il quadrato di un binomio?`, opzioni: [R`$x^2 + 5x + 25$`, R`$x^2 - 25$`, R`$x^2 + 10x - 25$`, R`$x^2 - 10x + 25$`], corretta: 3, spiegazione: R`Le basi sono $x$ e $5$, il doppio prodotto è $10x$: $x^2 - 10x + 25 = (x - 5)^2$. In $x^2 + 5x + 25$ il termine di mezzo non è il doppio prodotto; $x^2 - 25$ ha due termini; $x^2 + 10x - 25$ ha un quadrato negativo.` },
    { id: 'q-05', domanda: R`$A^3 + B^3$ è uguale a…`, opzioni: [R`$(A + B)^3$`, R`$(A + B)(A^2 - AB + B^2)$`, R`$(A + B)(A^2 + AB + B^2)$`, R`$(A - B)(A^2 + AB + B^2)$`], corretta: 1, spiegazione: R`Somma di cubi: binomio con lo stesso segno, falso quadrato con il segno opposto nel termine di mezzo. $(A + B)^3$ ha quattro termini; l'ultima opzione è la differenza di cubi.` },
    { id: 'q-06', domanda: R`Il raccoglimento parziale porta a una scomposizione quando…`, opzioni: [R`i termini sono almeno sei`, R`tutti i termini hanno un fattore comune`, R`dopo aver raccolto in ogni gruppo, le parentesi che restano sono uguali`, R`il polinomio ha grado pari`], corretta: 2, spiegazione: R`Solo se le parentesi coincidono si può raccogliere una seconda volta. Se tutti i termini hanno un fattore comune si usa il raccoglimento totale; numero di termini e grado non c'entrano.` },
    { id: 'q-07', domanda: R`Per scomporre $x^2 + sx + p$ come trinomio speciale si cercano due numeri che abbiano…`, opzioni: [R`somma $s$ e prodotto $p$`, R`somma $p$ e prodotto $s$`, R`differenza $s$ e prodotto $p$`, R`somma $-s$ e prodotto $-p$`], corretta: 0, spiegazione: R`Sviluppando $(x + m)(x + n)$ si ottiene $x^2 + (m + n)x + mn$: la somma è il coefficiente di $x$, il prodotto è il termine noto.` },
    { id: 'q-08', domanda: R`Nel trinomio speciale $x^2 + sx + p$, se $p < 0$ i due numeri cercati…`, opzioni: [R`sono entrambi negativi`, R`sono entrambi positivi`, R`non esistono mai`, R`hanno segni opposti`], corretta: 3, spiegazione: R`Un prodotto negativo richiede fattori di segno opposto; il segno di $s$ dice quale dei due è più grande in valore assoluto. Per esempio $x^2 + 3x - 10 = (x + 5)(x - 2)$.` },
    { id: 'q-09', domanda: R`Il teorema di Ruffini afferma che $P(x)$ è divisibile per $(x - a)$ se e solo se…`, opzioni: [R`$a$ è un divisore del termine noto`, R`$P(a) = 0$`, R`$P(0) = a$`, R`il grado di $P(x)$ è maggiore di $1$`], corretta: 1, spiegazione: R`Divisibile vuol dire resto zero, e il resto è $P(a)$ per il teorema del resto. I divisori del termine noto sono solo i candidati fra cui cercare $a$, non una garanzia.` },
    { id: 'q-10', domanda: R`Se $P(x)$ ha coefficienti interi, i suoi eventuali zeri interi vanno cercati…`, opzioni: [R`fra i divisori del coefficiente di grado massimo`, R`fra i numeri da $1$ al grado del polinomio`, R`fra i divisori, positivi e negativi, del termine noto`, R`solo fra $1$ e $-1$`], corretta: 2, spiegazione: R`Uno zero intero $a$ divide il termine noto (tutti gli altri termini contengono $a$ come fattore). Il primo coefficiente serve solo per i denominatori degli zeri frazionari.` },
    { id: 'q-11', domanda: R`Il resto della divisione di $P(x)$ per $(x + 2)$ è…`, opzioni: [R`$P(-2)$`, R`$P(2)$`, R`$P(0) + 2$`, R`sempre zero`], corretta: 0, spiegazione: R`$x + 2 = x - (-2)$, quindi $a = -2$ e il resto è $P(-2)$. Sbagliare il segno di $a$ è l'errore più frequente con il teorema del resto.` },
    { id: 'q-12', domanda: R`Il mcm di due polinomi scomposti è il prodotto…`, opzioni: [R`dei soli fattori comuni, con l'esponente minimo`, R`dei soli fattori comuni, con l'esponente massimo`, R`di tutti i fattori, ciascuno con l'esponente minimo`, R`dei fattori comuni e non comuni, ciascuno con l'esponente massimo`], corretta: 3, spiegazione: R`Come per i numeri: il mcm deve contenere ogni fattore di ciascun polinomio, con l'esponente più alto con cui compare. I soli fattori comuni con l'esponente minimo danno il MCD.` },
    { id: 'q-13', domanda: R`Dopo aver semplificato $\dfrac{x^2 - 1}{x - 1}$ in $x + 1$, le condizioni di esistenza…`, opzioni: [R`non servono più, perché il denominatore è sparito`, R`restano $x \ne 1$: la frazione di partenza non è definita per $x = 1$`, R`diventano $x \ne -1$`, R`diventano $x \ne 0$`], corretta: 1, spiegazione: R`Le c.e. si riferiscono alla frazione di partenza, che per $x = 1$ ha denominatore zero. La semplificazione vale solo dove la frazione esiste.` },
    { id: 'q-14', domanda: R`Quale semplificazione è corretta?`, opzioni: [R`$\dfrac{x^2 - 4}{x - 2} = x + 2$, per $x \ne 2$`, R`$\dfrac{x^2 + 4}{x^2} = 4$`, R`$\dfrac{x + 3}{x} = 3$`, R`$\dfrac{2x + 1}{2} = x + 1$`], corretta: 0, spiegazione: R`Si semplificano solo i fattori: $x^2 - 4 = (x + 2)(x - 2)$ e il fattore $(x - 2)$ si elide. Nelle altre si "semplificano" addendi, che non è lecito: per esempio con $x = 1$, $\dfrac{1 + 4}{1} = 5 \ne 4$.` },
    { id: 'q-15', domanda: R`Se la somma dei coefficienti di un polinomio $P(x)$ è zero, allora…`, opzioni: [R`il polinomio è irriducibile`, R`$P(0) = 0$, quindi si può raccogliere $x$`, R`$P(1) = 0$, quindi $(x - 1)$ è un fattore`, R`$P(-1) = 0$, quindi $(x + 1)$ è un fattore`], corretta: 2, spiegazione: R`Sostituendo $x = 1$ ogni termine diventa il suo coefficiente: $P(1)$ è la somma dei coefficienti. Se vale zero, per Ruffini $(x - 1)$ divide $P(x)$. $P(0)$ è invece il termine noto.` },
    { id: 'q-16', domanda: R`Lo sviluppo di $(A + B + C)^2$ ha…`, opzioni: [R`tre termini: i tre quadrati`, R`quattro termini`, R`nove termini tutti diversi`, R`sei termini: tre quadrati e tre doppi prodotti`], corretta: 3, spiegazione: R`$(A + B + C)^2 = A^2 + B^2 + C^2 + 2AB + 2AC + 2BC$: un doppio prodotto per ogni coppia di basi. I nove prodotti del calcolo si riducono a sei perché $AB$ e $BA$ sono uguali.` },
    { id: 'q-17', domanda: R`Il trinomio $x^2 + x + 1$, detto *falso quadrato*…`, opzioni: [R`è il quadrato di $(x + 1)$`, R`è irriducibile in $\mathbb{R}$ e compare nella scomposizione di $x^3 - 1$`, R`si scompone come $(x + 1)(x - 1)$`, R`si scompone con Ruffini`], corretta: 1, spiegazione: R`$x^3 - 1 = (x - 1)(x^2 + x + 1)$. Il falso quadrato non ha zeri ($P(1) = 3$, $P(-1) = 1$, e non vale mai zero), quindi né Ruffini né altri metodi lo scompongono. $(x + 1)^2 = x^2 + 2x + 1$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima raccogli, poi conta i termini: due, tre, quattro o sei. Il numero di termini ti dice quali prodotti notevoli provare.` },
    { tipo: 'errore', testo: R`$x^2 - 9$ non è $(x - 3)^2$, e $x^2 + 9$ non si scompone affatto. La differenza di quadrati dà $(x + 3)(x - 3)$.` },
    { tipo: 'trucco', testo: R`Per un quadrato di binomio fai il test del doppio prodotto: prendi le due basi, raddoppia il loro prodotto e confrontalo con il termine di mezzo. Se non coincide, non è un quadrato.` },
    { tipo: 'trucco', testo: R`Somma dei coefficienti uguale a zero? Allora $(x - 1)$ è un fattore. Coefficienti di grado pari e di grado dispari con la stessa somma? Allora c'è $(x + 1)$.` },
    { tipo: 'errore', testo: R`Una scomposizione finita a metà è sbagliata come una non fatta: se dentro un prodotto vedi $x^2 - 4$ o $x^2 - 1$, continua.` },
    { tipo: 'metodo', testo: R`Ultimo passo, sempre: moltiplica i fattori. Se non torna il polinomio di partenza, hai sbagliato un segno o un numero.` },
    { tipo: 'errore', testo: R`Nelle frazioni si semplificano i fattori, non gli addendi: $\dfrac{x + 3}{x}$ non è $3$. Prima scomponi, poi cancella.` },
    { tipo: 'trucco', testo: R`Nel trinomio speciale guarda prima il prodotto: se è negativo i due numeri hanno segni opposti, se è positivo hanno tutti e due il segno della somma.` },
    { tipo: 'errore', testo: R`Nella tabella di Ruffini i termini mancanti valgono $0$: per $x^3 - 7x + 6$ la prima riga è $1$, $0$, $-7$, $6$. Saltare lo zero sposta tutti i calcoli.` }
  ],

  aneddoti: [
    { matematico: 'Euclide', anni: 'circa 300 a.C.', titolo: 'L\'algoritmo più antico ancora in uso', testo: R`Degli *Elementi* di Euclide si ricordano i triangoli e i cerchi, ma tre dei tredici libri parlano di numeri interi. Il libro VII si apre con un procedimento per trovare la "massima misura comune" di due numeri: si toglie il più piccolo dal più grande, poi si ripete con il resto, finché non si arriva a zero. È l'**algoritmo di Euclide**, lo stesso che i computer usano oggi per il MCD, e funziona anche con i polinomi, sostituendo le sottrazioni con divisioni con resto. Di Euclide non si sa quasi nulla: insegnò ad Alessandria sotto Tolomeo I. Si racconta che uno studente, dopo il primo teorema, gli chiese che cosa ci avrebbe guadagnato; Euclide fece dare al ragazzo una moneta, «visto che deve guadagnare qualcosa da ciò che impara», e lo congedò.`, legame: R`Il MCD di polinomi che qui si calcola scomponendo in fattori è lo stesso oggetto che Euclide calcolava per i numeri, con l'algoritmo che porta il suo nome.` },
    { matematico: 'Blaise Pascal', anni: '1623–1662', titolo: 'Il triangolo con quattro nomi', testo: R`I coefficienti del cubo di binomio, $1, 3, 3, 1$, sono una riga del triangolo in cui ogni numero è la somma dei due sopra di lui. In Francia si chiama triangolo di Pascal, perché nel 1654 Pascal ne scrisse un trattato intero, il *Traité du triangle arithmétique*, dimostrandone le proprietà con il principio di induzione, che fu fra i primi a usare in modo esplicito. In Italia però si chiama triangolo di Tartaglia, che lo aveva pubblicato un secolo prima; in Iran si chiama di Khayyam, in Cina di Yang Hui, che lo disegnò nel 1261, e i matematici indiani lo conoscevano da secoli. Pascal era un prodigio: a sedici anni scrisse un trattato sulle coniche, a diciannove costruì una macchina calcolatrice per aiutare il padre, esattore delle tasse. A trentun anni abbandonò quasi del tutto la matematica per la religione.`, legame: R`Le righe del triangolo sono i coefficienti di $(A + B)^n$: quella del cubo, $1, 3, 3, 1$, è la firma da riconoscere per scomporre un cubo di binomio.` },
    { matematico: 'Sophie Germain', anni: '1776–1831', titolo: 'La scomposizione che porta il nome di una donna', testo: R`A tredici anni, chiusa in casa a Parigi durante la Rivoluzione, Sophie Germain lesse della morte di Archimede e decise di studiare matematica. I genitori le tolsero il fuoco e le candele per farla smettere; lei studiava di notte avvolta nelle coperte. L'École Polytechnique non ammetteva donne, così si procurò le dispense e mandò i compiti sotto il nome di uno studente, Antoine-Auguste Le Blanc. Con lo stesso nome scrisse per anni a Gauss, che scoprì la verità solo dopo che lei, nel 1806, fece intervenire un generale francese per proteggerlo durante l'occupazione di Braunschweig. Gauss le rispose con una lettera di ammirazione rimasta famosa. Fu la prima donna premiata dall'Accademia delle Scienze di Parigi, per uno studio sulle vibrazioni delle lastre. Porta il suo nome l'identità $a^4 + 4b^4 = (a^2 + 2b^2 + 2ab)(a^2 + 2b^2 - 2ab)$.`, legame: R`$a^4 + 4b^4$ è una somma di quadrati che si scompone lo stesso, ma non con una formula diretta: si aggiunge e toglie $4a^2b^2$ per completare il quadrato $(a^2 + 2b^2)^2$, e poi si applica la differenza di quadrati.` },
    { matematico: 'Paolo Ruffini', anni: '1765–1822', titolo: 'Il medico che divideva i polinomi', testo: R`Paolo Ruffini era un medico di Modena, e lo restò per tutta la vita: la matematica la faceva nel tempo che avanzava fra i pazienti. Nel 1798 rifiutò di giurare fedeltà alla Repubblica Cisalpina e perse la cattedra all'università; tornò a curare i malati e intanto scrisse, nel 1799, un libro di cinquecento pagine in cui sosteneva che per le equazioni di quinto grado non può esistere una formula risolutiva. Quasi nessuno lo lesse, e la dimostrazione aveva una lacuna, ma l'idea era giusta: oggi si parla di teorema di Abel–Ruffini. La regola che porta il suo nome compare in una memoria del 1804, premiata dalla Società Italiana delle Scienze, sul calcolo delle radici delle equazioni numeriche. Divenuto rettore dell'università, durante l'epidemia di tifo del 1817 continuò a visitare i malati, si contagiò e non si riprese mai del tutto.`, legame: R`La regola di Ruffini è il metodo con cui, trovato uno zero fra i divisori del termine noto, si abbassa il grado del polinomio e si continua a scomporre.` },
    { matematico: 'Niels Henrik Abel', anni: '1802–1829', titolo: 'Sei pagine per chiudere una domanda di tre secoli', testo: R`Dopo la formula di Cardano per il terzo grado e quella di Ferrari per il quarto, per quasi trecento anni i matematici cercarono la formula per il quinto. Nel 1824 un norvegese di ventun anni, Niels Henrik Abel, dimostrò che non esiste: nessuna formula con radici può risolvere l'equazione generale di quinto grado. Povero, stampò la dimostrazione a proprie spese e la compresse in sei pagine per risparmiare sulla tipografia, tanto che quasi nessuno riuscì a seguirla; Gauss non la lesse nemmeno. Un lungo lavoro spedito all'Accademia di Parigi fu smarrito da Cauchy. Abel si ammalò di tubercolosi e morì nell'aprile del 1829, a ventisei anni. Due giorni dopo arrivò da Berlino la lettera che gli offriva la cattedra universitaria che aveva sempre sperato. Il Premio Abel, istituito dalla Norvegia nel 2002, è oggi il riconoscimento più importante della matematica.`, legame: R`Poiché dal quinto grado in su non esiste una formula, per scomporre un polinomio di grado alto non c'è scorciatoia: si cerca uno zero fra i divisori del termine noto e si abbassa il grado con Ruffini.` }
  ]
});
})();
