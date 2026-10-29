(function () {
const R = String.raw;
/* allenamento: coppie (x; y) in ordine, numeri, ed equazioni canoniche di ellisse e iperbole */
const cop = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. 6; 0' });
const num = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'es. 1/2' });
/* x²/A ± y²/B = 1 (A, B interi positivi; segno '+' ellisse, '-' iperbole con i fuochi sull'asse x), nelle forme
   ragionevoli: i due termini scambiati, i denominatori scritti come quadrati, e la forma intera B·x² ± A·y² = A·B.
   La casella toglie gli spazi e legge ² come ^2. */
function conica(A, B, segno) {
  const acc = [], rq = n => { const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };
  const den = [[String(A), String(B)]];
  if (rq(A) && rq(B)) den.push([rq(A) + '^2', rq(B) + '^2']);
  den.forEach(([p, q]) => {
    acc.push('x^2/' + p + segno + 'y^2/' + q + '=1');
    acc.push(segno === '+' ? 'y^2/' + q + '+x^2/' + p + '=1' : '-y^2/' + q + '+x^2/' + p + '=1');
  });
  const mcd = (p, q) => q ? mcd(q, p % q) : p, g = mcd(A, B), coef = n => (n === 1 ? '' : String(n));
  [1, g].forEach(k => acc.push(coef(B / k) + 'x^2' + segno + coef(A / k) + 'y^2=' + A * B / k));
  return { tipo: 'testo', accettate: Array.from(new Set(acc)), segnaposto: segno === '+' ? 'es. x²/16 + y²/9 = 1' : 'es. x²/25 − y²/4 = 1', simboli: ['x²', 'y²', '/', '+', '−', '='] };
}
COMPASSO.registra({
  id: 'ellisse-iperbole',
  titolo: 'Ellisse e iperbole',

  introduzione: R`La circonferenza ha un centro solo. Ellisse e iperbole hanno due punti fissi, i **fuochi**. Ogni punto della curva si descrive con le sue distanze dai due fuochi. Nell'ellisse le due distanze si sommano, nell'iperbole si sottraggono.

L'ellisse è la forma delle orbite dei pianeti, con il Sole in un fuoco. E un'iperbole l'hai già vista: è il grafico di $y=\frac{k}{x}$, la proporzionalità inversa.

Ti servono la distanza fra due punti, la circonferenza e il $\Delta$.`,

  inBreve: [
    R`Nell'ellisse è costante la **somma** delle distanze dai due fuochi: $PF_1+PF_2=2a$. Nell'iperbole è costante la **differenza**: $|PF_1-PF_2|=2a$.`,
    R`L'ellisse $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ ha i fuochi sull'asse del denominatore più grande. Con $a>b$ vale $c^2=a^2-b^2$.`,
    R`L'iperbole $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ ha $c^2=a^2+b^2$, una somma. I suoi asintoti sono $y=\pm\frac ba x$.`,
    R`L'eccentricità è $c$ diviso il semiasse dei fuochi. Nell'ellisse sta fra $0$ e $1$, nell'iperbole è maggiore di $1$.`,
    R`Per una retta e una conica, sostituisci e guarda il $\Delta$. La tangente in un punto della curva si trova con lo sdoppiamento.`,
    R`Con $x-x_0$ al posto di $x$ e $y-y_0$ al posto di $y$ la conica è la stessa, con il centro in $(x_0;y_0)$. Dall'equazione sviluppata ci arrivi completando i quadrati. Anche $y=\frac{ax+b}{cx+d}$ è una conica spostata: un'iperbole equilatera con asintoti $x=-\frac dc$ e $y=\frac ac$.`
  ],

  sezioni: [
    { id: 'coniche', titolo: 'Le coniche: sezioni di un cono', testo: R`Prendi un cono gelato vuoto e taglialo con un coltello. La forma del taglio dipende da come inclini la lama.

>* Le **coniche** sono le curve che ottieni tagliando un cono con un piano. Il tipo di curva dipende dall'inclinazione del piano.

Per l'iperbole serve un cono doppio: due coni uniti per la punta. Ognuna delle due metà si chiama **falda**.

| come tagli | che curva ottieni |
|---|---|
| perpendicolare all'asse | circonferenza |
| un po' inclinato, tagliando una falda sola da parte a parte | ellisse |
| parallelo a un lato del cono | parabola |
| più inclinato ancora, tanto da tagliare tutte e due le falde | iperbole (due pezzi, i **rami**) |

Quindi la circonferenza è un'ellisse particolare: quella del taglio dritto.

La parabola l'hai già studiata a parte. Qui studi ellisse e iperbole.

> Da qui in avanti le curve si definiscono con le distanze da due punti fissi. È una definizione equivalente, e con questa le equazioni si scrivono meglio.` },

    { id: 'ellisse-definizione', titolo: "L'ellisse come luogo geometrico", testo: R`Pianta due picchetti nel prato e legaci i capi di uno spago. Tendi lo spago con un bastoncino e fai il giro: il solco è un'ellisse. La lunghezza dello spago non cambia, quindi la somma delle distanze dai due picchetti resta la stessa.

[[animazione:ellisse-giardiniere]]

>* I due punti fissi $F_1$ e $F_2$ sono i **fuochi**. L'**ellisse** è l'insieme dei punti $P$ con la stessa somma delle distanze dai fuochi: $$PF_1+PF_2=2a$$ con $2a>F_1F_2$. Il punto medio di $F_1F_2$ è il **centro**.

[[video:ellisse-iperbole/ellisse-giardiniere]]

La costante si chiama $2a$ perché così $a$ è metà della larghezza dell'ellisse.

Esempio: fuochi $F_1(-4;0)$ e $F_2(4;0)$, spago lungo $2a=10$. Il punto $P(0;3)$ sta sull'ellisse? $PF_1=\sqrt{4^2+3^2}=5$ e anche $PF_2=5$. La somma è $10$, quindi sì.

Se i due picchetti coincidono, lo spago gira attorno a un punto solo. Ottieni una **circonferenza** di raggio $a$.

?? Due fuochi distano $8$ e lo spago è lungo $6$. Che cosa si disegna?
[ ] un'ellisse molto schiacciata
[ ] una circonferenza di raggio $3$
[x] niente: lo spago è troppo corto
=> Niente. Per ogni punto $P$ vale $PF_1+PF_2\ge F_1F_2=8$, quindi la somma non può valere $6$. Per questo la definizione chiede $2a>F_1F_2$.

>! $2a$ è la lunghezza dello spago, non la distanza fra i fuochi.

Nel laboratorio «Il giardiniere» disegni l'aiuola spostando i picchetti.` },

    { id: 'ellisse-equazione', titolo: 'Equazione canonica, vertici e semiassi', testo: R`Metti i fuochi in $F_1(-c;0)$ e $F_2(c;0)$. Il numero $c$ si chiama **semidistanza focale**. Per un punto $P(x;y)$ le distanze sono $PF_1=\sqrt{(x+c)^2+y^2}$ e $PF_2=\sqrt{(x-c)^2+y^2}$.

Per arrivare all'equazione togli le radici, un passo alla volta:

~ PF_1=2a-PF_2 :: dalla definizione $PF_1+PF_2=2a$ isolo una radice
~ PF_1^2=4a^2-4a\,PF_2+\evid{PF_2^2} :: elevo al quadrato
~ \evid{4cx}=4a^2-4a\,PF_2 :: $PF_1^2-PF_2^2=(x+c)^2-(x-c)^2=4cx$: le $y^2$ e i $c^2$ si cancellano
~ a\,PF_2=a^2-cx :: divido per $4$ e isolo la radice che resta
~ a^2\left[(x-c)^2+y^2\right]=(a^2-cx)^2 :: elevo di nuovo al quadrato
~ (a^2-c^2)x^2+a^2y^2=a^2(a^2-c^2) :: sviluppo: i due termini $-2a^2cx$ si cancellano
~ \evid{b^2}x^2+a^2y^2=a^2\evid{b^2} :: chiamo $b^2$ il numero $a^2-c^2$, positivo perché $a>c$
~ \evidb{\frac{x^2}{a^2}+\frac{y^2}{b^2}=1} :: divido tutto per $a^2b^2$

>* **Equazione canonica dell'ellisse:** $$\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$$ I numeri $a$ e $b$ si chiamano **semiassi**. Con i fuochi sull'asse $x$ vale $c^2=a^2-b^2$.

Con $y=0$ trovi $x=\pm a$, con $x=0$ trovi $y=\pm b$. I punti dove l'ellisse taglia gli assi sono i **vertici**: $A(-a;0)$, $A'(a;0)$, $B(0;-b)$, $B'(0;b)$. L'ellisse è larga $2a$ e alta $2b$.

Da dove viene $b^2=a^2-c^2$? Il vertice $B'$ dista $a$ da ogni fuoco, perché le due distanze sono uguali e sommano $2a$. Quindi il triangolo $OF_2B'$ ha cateti $b$ e $c$ e ipotenusa $a$. Nella figura l'ipotenusa resta $a=5$ in ogni posizione del fuoco.

[[grafico:fuochi]]

Se il denominatore più grande sta sotto $y^2$, cioè $b>a$, i fuochi stanno sull'asse $y$:

| | $a>b$ | $a<b$ |
|---|---|---|
| fuochi | $(\pm c;0)$, sull'asse $x$ | $(0;\pm c)$, sull'asse $y$ |
| semidistanza focale | $c^2=a^2-b^2$ | $c^2=b^2-a^2$ |
| asse maggiore | $2a$, orizzontale | $2b$, verticale |

Esempio: in $\frac{x^2}{25}+\frac{y^2}{9}=1$ il denominatore più grande è sotto $x^2$. Quindi i fuochi sono sull'asse $x$, con $c^2=25-9=16$: fuochi $(\pm4;0)$.

?? Dove sono i fuochi dell'ellisse $\frac{x^2}{9}+\frac{y^2}{25}=1$?
[x] in $(0;\pm4)$
[ ] in $(\pm4;0)$
[ ] in $(0;\pm\sqrt{34})$
[ ] in $(\pm\sqrt{34};0)$
=> In $(0;\pm4)$. Il denominatore più grande sta sotto $y^2$, quindi i fuochi sono sull'asse $y$, e $c^2=25-9=16$. Con $\sqrt{34}$ hai sommato, come per l'iperbole.

>! I fuochi stanno sull'asse del denominatore **più grande**, non del primo che leggi. E nell'ellisse fra $x^2$ e $y^2$ c'è il $+$: con il meno è un'iperbole.` },

    { id: 'eccentricita', titolo: "L'eccentricità", testo: R`Con lo stesso spago, più allontani i picchetti e più l'aiuola viene lunga e stretta. L'**eccentricità** misura questo schiacciamento.

[[video:ellisse-iperbole/eccentricita]]

>* **Eccentricità dell'ellisse:** $e$ è la semidistanza focale divisa per il semiasse su cui stanno i fuochi. Con $a>b$: $$e=\frac ca$$ Con $b>a$: $e=\frac cb$. Vale sempre $0\le e<1$.

| $e$ | com'è l'ellisse |
|---|---|
| $0$ | una circonferenza: i fuochi coincidono con il centro |
| vicino a $0$ | quasi rotonda |
| vicino a $1$ | molto allungata, con i fuochi vicini ai vertici |

Perché mai $1$ o più? I fuochi stanno dentro l'ellisse, quindi $c$ è più piccolo del semiasse maggiore.

Esempi: $\frac{x^2}{25}+\frac{y^2}{9}=1$ ha $c=4$ ed $e=\frac45=0{,}8$, piuttosto schiacciata. $\frac{x^2}{25}+\frac{y^2}{24}=1$ ha $c=1$ ed $e=0{,}2$, quasi rotonda. L'orbita della Terra ha $e\approx0{,}017$: sembra una circonferenza.

?? Quanto vale l'eccentricità dell'ellisse $\frac{x^2}{16}+\frac{y^2}{25}=1$?
[x] $\frac35$
[ ] $\frac34$
[ ] $\frac45$
[ ] $\frac53$
=> I fuochi sono sull'asse $y$, perché $25>16$. Poi $c^2=25-16=9$, $c=3$. Dividi per il semiasse dei fuochi, $b=5$: $e=\frac35$. Con $\frac34$ hai diviso per $a=4$. $\frac45$ è $\frac ab$, senza $c$. E un'ellisse non ha mai $e>1$.

>! $e$ si calcola dividendo per il semiasse **maggiore**, quello su cui stanno i fuochi.` },

    { id: 'ellisse-retta', titolo: 'Ellisse e retta: intersezioni e tangenti', testo: R`Una retta e un'ellisse possono avere due punti in comune, uno o nessuno. La retta è **secante**, **tangente** o **esterna**.

>* Sostituisci la retta nell'ellisse e guarda il $\Delta$. $\Delta>0$: secante. $\Delta=0$: tangente. $\Delta<0$: esterna.

Esempio: per quali $q$ la retta $y=x+q$ è tangente all'ellisse $\frac{x^2}{3}+y^2=1$?

~ \frac{x^2}{3}+y^2=1\ \Rightarrow\ x^2+3y^2=3 :: moltiplico per $3$ per togliere il denominatore
~ x^2+3(\evid{x+q})^2=3 :: al posto di $y$ scrivo $x+q$
~ 4x^2+6qx+3q^2-3=0 :: sviluppo il quadrato e ordino
~ \frac{\Delta}{4}=9q^2-4(3q^2-3)=\evid{-3q^2+12} :: uso il $\Delta$ ridotto, perché il coefficiente di $x$ è pari
~ -3q^2+12=0\ \Rightarrow\ q=\evidb{\pm2} :: tangente quando $\Delta=0$

Le tangenti sono due rette parallele, $y=x+2$ e $y=x-2$. Per $-2<q<2$ la retta è secante, per $|q|>2$ è esterna.

Con una retta $y=mx+q$ il conto porta sempre allo stesso risultato:

>* **Condizione di tangenza:** $$q^2=a^2m^2+b^2$$ Nell'esempio: $a^2=3$, $b^2=1$, $m=1$, quindi $q^2=4$.

Se conosci un punto $P_0(x_0;y_0)$ dell'ellisse, la tangente lì si trova con la **formula di sdoppiamento**. Sostituisci $x^2$ con $x_0x$ e $y^2$ con $y_0y$.

>* **Sdoppiamento:** la tangente all'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ nel suo punto $P_0(x_0;y_0)$ ha equazione $$\frac{x\,x_0}{a^2}+\frac{y\,y_0}{b^2}=1$$

Esempio: la tangente a $\frac{x^2}{25}+\frac{y^2}{9}=1$ nel vertice $P_0(5;0)$ è $\frac{5x}{25}+0=1$, cioè $x=5$.

?? Uno studente applica lo sdoppiamento a $\frac{x^2}{4}+y^2=1$ nel punto $(2;1)$ e ottiene $\frac x2+y=1$. Che cos'è quella retta?
[x] niente di utile: $(2;1)$ non sta sull'ellisse
[ ] la tangente nel punto $(2;1)$
[ ] la tangente nel vertice $(2;0)$
=> Niente di utile. Sostituendo viene $\frac44+1=2\ne1$, quindi il punto è fuori dall'ellisse. E lo sdoppiamento vale solo per un punto della curva.

>! Lo sdoppiamento funziona solo se $P_0$ **sta** sull'ellisse. Prima sostituisci le coordinate e controlla.` },

    { id: 'iperbole-definizione', titolo: "L'iperbole: definizione ed equazione", testo: R`Nell'ellisse era costante la somma delle distanze dai fuochi. Nell'iperbole è costante la **differenza**.

[[video:ellisse-iperbole/iperbole]]

>* L'**iperbole** è l'insieme dei punti $P$ con la stessa differenza delle distanze dai fuochi $F_1$ e $F_2$. La differenza si prende in valore assoluto: $$|PF_1-PF_2|=2a$$ con $2a<F_1F_2$.

Il valore assoluto serve perché i punti formano due gruppi, uno vicino a $F_1$ e uno vicino a $F_2$. Ogni gruppo è un pezzo di curva, detto **ramo**.

Con i fuochi in $(\pm c;0)$ i passaggi sono quelli dell'ellisse. Ma ora $c>a$, quindi chiami $b^2$ il numero $c^2-a^2$.

>* **Equazione canonica dell'iperbole** (fuochi sull'asse $x$): $$\begin{gathered}\frac{x^2}{a^2}-\frac{y^2}{b^2}=1\\ c^2=a^2+b^2\end{gathered}$$ Vertici $A(-a;0)$ e $A'(a;0)$. Asintoti $$y=\pm\frac ba x$$

Gli **asintoti** sono due rette a cui i rami si avvicinano senza toccarle. Sono le diagonali del rettangolo largo $2a$ e alto $2b$, centrato nell'origine. Metà diagonale è lunga $\sqrt{a^2+b^2}=c$.

La circonferenza di centro $O$ e raggio $OK$ passa per i fuochi.

[[grafico:iperbole]]

Esempio: $\frac{x^2}{4}-\frac{y^2}{9}=1$ ha $a=2$, $b=3$. Allora $c^2=4+9=13$, fuochi $(\pm\sqrt{13};0)$, e asintoti $y=\pm\frac32x$.

L'**eccentricità** è ancora $e=\frac ca$. Qui $c>a$, quindi $e>1$: nell'esempio $e=\frac{\sqrt{13}}{2}\approx1{,}8$.

Con $-1$ a destra, cioè $\frac{x^2}{a^2}-\frac{y^2}{b^2}=-1$, i rami si aprono in alto e in basso. Fuochi e vertici stanno sull'asse $y$: i vertici sono $(0;\pm b)$ ed $e=\frac cb$. Gli asintoti restano $y=\pm\frac bax$.

?? Quali sono i fuochi dell'iperbole $\frac{x^2}{16}-\frac{y^2}{9}=1$?
[x] $(\pm5;0)$
[ ] $(\pm\sqrt7;0)$
[ ] $(0;\pm5)$
[ ] $(\pm4;0)$
=> $c^2=a^2+b^2=16+9=25$, quindi $c=5$, sull'asse $x$. $\sqrt7$ viene dalla formula dell'ellisse, $(\pm4;0)$ sono i vertici.

>! Ellisse $c^2=a^2-b^2$, iperbole $c^2=a^2+b^2$. Nell'iperbole i fuochi stanno **fuori** dai vertici, quindi $c$ è il più grande.

### Iperbole e retta
Con l'iperbole il metodo è lo stesso dell'ellisse. Sostituisci la retta e calcola il $\Delta$ dell'equazione risolvente. Con $\Delta>0$ ci sono due punti comuni, con $\Delta=0$ uno, con $\Delta<0$ nessuno. Con $\Delta=0$ la retta è tangente.

Esempio: la retta $y=2x+3$ e l'iperbole $x^2-y^2=3$. Sostituendo viene $x^2-(2x+3)^2=3$, cioè $x^2+4x+4=0$. Qui $\Delta=0$: la retta è tangente nel punto $(-2;-1)$.

>! Una retta parallela a un asintoto taglia l'iperbole in un punto solo, ma non è tangente. Con $y=x+3$ e la stessa iperbole il termine $x^2$ sparisce: resta $-6x-9=3$, un'equazione di primo grado. Il punto è $(-2;1)$, e lì la retta attraversa la curva.` },

    { id: 'iperbole-equilatera', titolo: 'Iperbole equilatera e riferita agli asintoti', testo: R`Quando $a=b$ il rettangolo degli asintoti è un quadrato. Le sue diagonali sono perpendicolari: gli asintoti sono $y=x$ e $y=-x$.

>* **Iperbole equilatera:** $a=b$, equazione $x^2-y^2=a^2$, asintoti $y=\pm x$ perpendicolari fra loro. L'eccentricità è sempre $\sqrt2$, perché $c^2=a^2+a^2=2a^2$.

Se ruoti il foglio di $45°$, gli asintoti diventano gli assi cartesiani. L'equazione allora si semplifica.

>* **Iperbole equilatera riferita agli asintoti:** $$\begin{gathered}xy=k\\ k\ne0\end{gathered}$$ cioè $y=\frac kx$. Con $k>0$ i rami stanno nel primo e nel terzo quadrante, con $k<0$ nel secondo e nel quarto.

È la **proporzionalità inversa**: un rettangolo di area $12$ ha base $x$ e altezza $y$ con $xy=12$.

La curva passa per tutti i punti che danno un rettangolo della stessa area. Nel secondo e nel quarto quadrante $k$ è negativo.

[[grafico:equilatera]]

Esempio: $xy=12$ passa per $(3;4)$ e per $(-2;-6)$, ma non per $(2;-6)$.

?? L'iperbole $xy=-6$ passa per il punto $(-2;y)$. Quanto vale $y$?
[x] $3$
[ ] $-3$
[ ] $12$
[ ] $4$
=> Da $(-2)\cdot y=-6$ ricavi $y=3$. Con $k<0$ i rami stanno nel secondo e nel quarto quadrante, e $(-2;3)$ è nel secondo. Con $-3$ hai perso il segno di $-2$.

>! $xy=k$ è un'iperbole equilatera come $x^2-y^2=a^2$, vista da assi ruotati di $45°$. Per questo anche $xy=k$ ha eccentricità $\sqrt2$.` },

    { id: 'coniche-traslate', titolo: 'Coniche con il centro spostato', testo: R`Finora ellisse e iperbole avevano il centro nell'origine. Ma una curva si può spostare nel piano senza cambiarle forma. Con la circonferenza l'hai già visto: $(x-\alpha)^2+(y-\beta)^2=r^2$ ha il centro in $C(\alpha;\beta)$. Qui il centro lo chiamiamo $(x_0;y_0)$.

La regola vale per ogni curva. Scrivi $x-x_0$ al posto di $x$ e $y-y_0$ al posto di $y$. La curva si sposta di $x_0$ in orizzontale e di $y_0$ in verticale.

>* **Ellisse e iperbole con centro $C(x_0;y_0)$:** $$\begin{gathered}\frac{(x-x_0)^2}{a^2}+\frac{(y-y_0)^2}{b^2}=1\\ \frac{(x-x_0)^2}{a^2}-\frac{(y-y_0)^2}{b^2}=1\end{gathered}$$ I numeri $a$, $b$, $c$ sono quelli della curva con il centro nell'origine. Vertici, fuochi e asintoti si spostano insieme al centro.

Con il centro in $(x_0;y_0)$ basta aggiungere $x_0$ alle ascisse e $y_0$ alle ordinate:

- vertici $A$, $A'$: $(x_0\pm a;y_0)$
- vertici $B$, $B'$ dell'ellisse: $(x_0;y_0\pm b)$
- fuochi dell'ellisse con $a>b$, e dell'iperbole: $(x_0\pm c;y_0)$
- fuochi dell'ellisse con $b>a$: $(x_0;y_0\pm c)$

Gli asintoti dell'iperbole passano per il centro:
$$y-y_0=\pm\frac ba(x-x_0)$$

Esempio: l'iperbole $\frac{(x+1)^2}{9}-\frac{(y-2)^2}{16}=1$ ha $x_0=-1$ e $y_0=2$, quindi centro $(-1;2)$. Poi $a=3$, $b=4$ e $c^2=9+16=25$, cioè $c=5$. Vertici $(-4;2)$ e $(2;2)$, fuochi $(-6;2)$ e $(4;2)$. Gli asintoti sono $y-2=\pm\frac43(x+1)$.

>! In $(x+1)^2$ c'è $x-(-1)$: il centro ha ascissa $-1$, non $1$. Il segno nella parentesi è l'opposto della coordinata.

?? Qual è il centro dell'ellisse $\frac{(x+4)^2}{25}+\frac{(y-3)^2}{9}=1$?
[x] $(-4;3)$
[ ] $(4;-3)$
[ ] $(4;3)$
[ ] $(5;3)$
=> In $(x+4)^2$ c'è $x-(-4)$, quindi $x_0=-4$. In $(y-3)^2$ c'è $y_0=3$. Con $(4;-3)$ hai preso i segni delle parentesi; $5$ e $3$ sono i semiassi.

### Dall'equazione sviluppata al centro
Spesso l'equazione arriva sviluppata: oltre a $x^2$ e $y^2$ ci sono anche $x$ e $y$ di primo grado. Per trovare il centro **completi i quadrati**, come per il vertice della parabola.

[[video:ellisse-iperbole/traslata]]

Esempio: che curva è $4x^2+9y^2-16x+18y-11=0$?

~ 4x^2+9y^2-16x+18y-11=0 :: $x^2$ e $y^2$ hanno lo stesso segno: ci aspettiamo un'ellisse
~ 4(x^2-4x)+9(y^2+2y)=11 :: raggruppo i termini in $x$ e in $y$, raccolgo $4$ e $9$, porto $-11$ a destra
~ x^2-4x\evid{+4}=(x-2)^2 :: per avere un quadrato di binomio in $x$ manca $4$
~ y^2+2y\evid{+1}=(y+1)^2 :: in $y$ manca $1$
~ 4(x-2)^2+9(y+1)^2=11\evid{+16+9} :: aggiungo $4$ e $1$ dentro le parentesi; a sinistra entrano $4\cdot4$ e $9\cdot1$, e li aggiungo anche a destra
~ 4(x-2)^2+9(y+1)^2=36 :: sommo a destra
~ \evidb{\frac{(x-2)^2}{9}+\frac{(y+1)^2}{4}=1} :: divido per $36$, così a destra resta $1$

È l'ellisse $\frac{x^2}{9}+\frac{y^2}{4}=1$ spostata nel centro $C(2;-1)$. I semiassi sono $a=3$ e $b=2$, quindi $c^2=9-4=5$. Vertici $(-1;-1)$, $(5;-1)$, $(2;-3)$ e $(2;1)$. Fuochi $(2\pm\sqrt5;-1)$.

[[grafico:traslata]]

>! Dentro $4(\ldots)$ aggiungi $4$, ma il membro di sinistra cresce di $4\cdot4=16$. A destra va aggiunto $16$, non $4$.

Se alla fine a destra resta $0$, l'equazione ha un punto solo, il centro. Con un numero negativo non ha nessun punto: due quadrati sommati non sono mai negativi.

### L'ellisse come circonferenza schiacciata
Prendi la circonferenza $x^2+y^2=9$. Moltiplica per $\frac23$ l'ordinata di ogni punto, lasciando ferma l'ascissa. Il punto $(0;3)$ va in $(0;2)$, il punto $(3;0)$ resta dov'è. La circonferenza diventa l'ellisse $\frac{x^2}{9}+\frac{y^2}{4}=1$.

> L'ellisse di semiassi $a$ e $b$ è la circonferenza di raggio $a$ dilatata in verticale di un fattore $\frac ba$. Anche l'area si moltiplica per $\frac ba$: da $\pi a^2$ diventa $\pi ab$.` },

    { id: 'omografica', titolo: 'La funzione omografica', testo: R`Che grafico ha $y=\frac{2x+1}{x-1}$? Con un piccolo trucco diventa un'iperbole che conosci.

~ y=\frac{2x+1}{x-1} :: la funzione; condizione di esistenza $x\ne1$
~ y=\frac{2(x-1)+\evid{3}}{x-1} :: scrivo il numeratore come $2(x-1)$ più quello che manca: $2x-2+3=2x+1$
~ y=\evid{2}+\frac{3}{x-1} :: spezzo la frazione in due
~ \evidb{(y-2)(x-1)=3} :: porto il $2$ a sinistra e moltiplico per $x-1$

L'ultima riga è l'iperbole $xy=3$ spostata di $1$ a destra e di $2$ in alto: al posto di $x$ c'è $x-1$, al posto di $y$ c'è $y-2$. Gli asintoti diventano $x=1$ e $y=2$.

>* Una **funzione omografica** è $$\begin{gathered}y=\frac{ax+b}{cx+d}\\ c\ne0,\ \ ad-bc\ne0\end{gathered}$$ Il grafico è un'iperbole equilatera traslata. L'asintoto verticale è $x=-\frac dc$, dove si annulla il denominatore. L'asintoto orizzontale è $y=\frac ac$. Il **centro** $\left(-\frac dc;\frac ac\right)$ è dove si incrociano.

Con $c=0$ al denominatore non c'è la $x$, e il grafico è una retta. Con $ad-bc=0$ la frazione si semplifica e resta una costante: una retta orizzontale con un buco.

Con $a=2$, $b=4$, $c=1$, $d=2$ viene $ad-bc=0$: il grafico è la retta $y=2$ senza il punto $x=-2$.

[[grafico:omografica]]

?? Qual è l'asintoto orizzontale di $y=\frac{4x-1}{2x+6}$?
[x] $y=2$
[ ] $y=4$
[ ] $y=-\frac16$
[ ] $y=-3$
=> È il rapporto dei coefficienti di $x$: $\frac42=2$. Per $x$ molto grande $y$ si avvicina a $\frac{4x}{2x}=2$. Con $4$ non hai diviso per $c$, e $-3$ dà l'asintoto verticale.

>! Il punto $x=-\frac dc$ va escluso dal dominio, come in ogni frazione.` },

    { id: 'determinare-equazione', titolo: "Determinare l'equazione dai dati", testo: R`Negli esercizi hai un fuoco, un vertice, un punto della curva o l'eccentricità. Da questi dati ricostruisci $a$ e $b$. Le incognite sono due, quindi servono due dati.

Si fa in tre mosse.

1. Decidi **che forma** ha l'equazione: ellisse o iperbole, fuochi sull'asse $x$ o sull'asse $y$.
2. Traduci ogni dato in un'equazione in $a$, $b$, $c$.
3. Risolvi, usando la relazione fra $a$, $b$, $c$ della curva.

| dato | che cosa ti dice |
|---|---|
| un fuoco in $(c;0)$ o $(0;c)$ | il valore di $c$, e su quale asse stanno i fuochi |
| un vertice | direttamente $a$ oppure $b$ |
| un punto $P$ della curva | un'equazione: sostituisci le coordinate di $P$ |
| l'eccentricità | un legame fra $c$ e il semiasse dei fuochi |
| gli asintoti $y=\pm mx$ | $\frac ba=m$ |

Esempio: l'ellisse con i fuochi sull'asse $x$, eccentricità $\frac35$, che passa per $P(0;4)$.

~ b=4 :: $P(0;4)$ sta sull'asse $y$, quindi è il vertice $B'(0;b)$
~ c=\frac35a :: dall'eccentricità $e=\frac ca=\frac35$
~ a^2-\evid{\frac{9}{25}a^2}=16 :: sostituisco in $a^2-c^2=b^2$
~ \frac{16}{25}a^2=16\ \Rightarrow\ a^2=\evidb{25} :: risolvo
~ \frac{x^2}{25}+\frac{y^2}{16}=1 :: controllo: $c=3$, $e=\frac35$

Esempio con l'iperbole: vertice in $A(4;0)$ e asintoti $y=\pm\frac32x$. Il vertice dà $a=4$. Dagli asintoti $\frac ba=\frac32$, quindi $b=6$. L'equazione è $\frac{x^2}{16}-\frac{y^2}{36}=1$.

?? Un'ellisse ha un fuoco in $F(3;0)$ e passa per $P(0;5)$. Qual è la sua equazione?
[x] $\frac{x^2}{34}+\frac{y^2}{25}=1$
[ ] $\frac{x^2}{16}+\frac{y^2}{25}=1$
[ ] $\frac{x^2}{9}+\frac{y^2}{25}=1$
=> Il fuoco sull'asse $x$ dice che $c=3$ e che $a>b$. $P(0;5)$ è il vertice $B'$, quindi $b=5$. Da $c^2=a^2-b^2$ viene $a^2=9+25=34$. Con $a^2=25-9=16$ metti i fuochi sull'asse $y$, ma il fuoco è in $(3;0)$.

>! Prima dei conti chiediti su quale asse stanno i fuochi. Un punto sull'asse $x$ ha ordinata $0$, uno sull'asse $y$ ha ascissa $0$.` }
  ],

  grafici: {
    fuochi: {
      tipo: 'piano', x: [-6, 6], y: [-6, 6], proporzioni: 'uguali',
      parametri: [ { nome: 'c', min: 0, max: 4.5, passo: 0.5, valore: 3, nascosto: true } ],
      elementi: [
        { tipo: 'ellisse', centro: [0, 0], a: 5, b: 'sqrt(25 - c^2)' },
        { tipo: 'segmento', da: ['-c', 0], a: [0, 'sqrt(25 - c^2)'], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: ['c', 0], a: [0, 'sqrt(25 - c^2)'], colore: 2, etichetta: 'a = 5' },
        { tipo: 'segmento', da: [0, 0], a: ['c', 0], colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: [0, 'sqrt(25 - c^2)'], colore: 4 },
        { tipo: 'punto', p: [0, 'sqrt(25 - c^2)'], etichetta: "B'", posizione: 'alto-sinistra', colore: 4 },
        { tipo: 'punto', p: ['-c', 0], etichetta: 'F₁', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['c', 0], trascina: true, etichetta: 'F₂', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-5.8, -5.5], testo: 'c = {{c}}  ·  b = {{sqrt(25 - c^2)}}  ·  e = {{c/5}}', ancora: 'start' }
      ],
      didascalia: "Trascina il fuoco F₂. Lo spago resta lungo 2a = 10, quindi B' dista 5 da ogni fuoco: nel triangolo rettangolo 5² = b² + c². Guarda anche e = c/a."
    },
    iperbole: {
      tipo: 'piano', x: [-9, 9], y: [-9, 9], proporzioni: 'uguali',
      parametri: [
        { nome: 'a', min: 1, max: 5, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'b', min: 0.5, max: 5, passo: 0.5, valore: 3, nascosto: true }
      ],
      funzioni: [
        { f: 'b*sqrt(x^2/a^2 - 1)', colore: 1 },
        { f: '-b*sqrt(x^2/a^2 - 1)', colore: 1 }
      ],
      elementi: [
        { tipo: 'poligono', punti: [['-a', '-b'], ['a', '-b'], ['a', 'b'], ['-a', 'b']], riempi: false, colore: 4 },
        { tipo: 'retta', m: 'b/a', q: 0, tratteggio: true, colore: 3 },
        { tipo: 'retta', m: '-b/a', q: 0, tratteggio: true, colore: 3 },
        { tipo: 'cerchio', centro: [0, 0], raggio: 'sqrt(a^2 + b^2)', tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['-sqrt(a^2 + b^2)', 0], etichetta: 'F₁', posizione: 'basso-sinistra', colore: 2 },
        { tipo: 'punto', p: ['sqrt(a^2 + b^2)', 0], etichetta: 'F₂', posizione: 'basso-destra', colore: 2 },
        { tipo: 'punto', p: ['a', 'b'], trascina: true, etichetta: 'K', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [0, -7], testo: 'c = OK = {{sqrt(a^2 + b^2)}}  ·  y = ±{{b/a}} x' }
      ],
      didascalia: "Trascina K(a; b): gli asintoti sono le diagonali del rettangolo, e la circonferenza di raggio OK passa per i fuochi, perché c² = a² + b²."
    },
    equilatera: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8], proporzioni: 'uguali',
      parametri: [
        { nome: 'px', min: -7, max: 7, passo: 0.5, valore: 3, nascosto: true },
        { nome: 'py', min: -7, max: 7, passo: 0.5, valore: 2, nascosto: true }
      ],
      funzioni: [ { f: 'px*py/x', colore: 1 } ],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], ['px', 0], ['px', 'py'], [0, 'py']], colore: 2 },
        { tipo: 'punto', p: ['px', 'py'], trascina: true, etichetta: 'P({{px}}; {{py}})', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-7.6, -7.2], testo: 'k = x · y = {{px*py}}', ancora: 'start' }
      ],
      didascalia: "Trascina P: la curva è xy = k, l'insieme dei punti che fanno un rettangolo con la stessa area di quello colorato. Nel II e IV quadrante k è negativo."
    },
    traslata: {
      tipo: 'piano', x: [-4.5, 7.5], y: [-5.5, 5], passo: [2, 2], proporzioni: 'uguali',
      parametri: [
        { nome: 'h', min: -1, max: 4, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'k', min: -2, max: 2, passo: 0.5, valore: -1, nascosto: true }
      ],
      elementi: [
        { tipo: 'ellisse', centro: [0, 0], a: 3, b: 2, tratteggio: true, colore: 4 },
        { tipo: 'vettore', da: [0, 0], a: ['h', 'k'], colore: 4 },
        { tipo: 'ellisse', centro: ['h', 'k'], a: 3, b: 2, colore: 1 },
        { tipo: 'punto', p: ['h - 3', 'k'], colore: 1 },
        { tipo: 'punto', p: ['h + 3', 'k'], colore: 1 },
        { tipo: 'punto', p: ['h', 'k - 2'], colore: 1 },
        { tipo: 'punto', p: ['h', 'k + 2'], colore: 1 },
        { tipo: 'punto', p: ['h - sqrt(5)', 'k'], etichetta: 'F₁', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'punto', p: ['h + sqrt(5)', 'k'], etichetta: 'F₂', posizione: 'alto', colore: 2 },
        { tipo: 'punto', p: ['h', 'k'], trascina: true, etichetta: 'C', posizione: 'basso-destra', colore: 4 },
        { tipo: 'testo', p: [0.5, -5.1], testo: 'F({{h}} ± √5; {{k}})', ancora: 'start' }
      ],
      didascalia: "Trascina il centro C. La curva tratteggiata è x²/9 + y²/4 = 1: spostata lungo la freccia diventa (x − x₀)²/9 + (y − y₀)²/4 = 1. Semiassi e fuochi restano gli stessi rispetto al centro."
    },
    omografica: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8],
      parametri: [
        { nome: 'a', min: -4, max: 4, passo: 1, valore: 2, etichetta: 'a' },
        { nome: 'b', min: -4, max: 4, passo: 1, valore: 1, etichetta: 'b' },
        { nome: 'c', min: 1, max: 3, passo: 1, valore: 1, etichetta: 'c' },
        { nome: 'd', min: -4, max: 4, passo: 1, valore: -1, etichetta: 'd' }
      ],
      funzioni: [ { f: '(a*x + b)/(c*x + d)', colore: 1 } ],
      elementi: [
        { tipo: 'verticale', x: '-d/c', asintoto: true, colore: 3 },
        { tipo: 'orizzontale', y: 'a/c', asintoto: true, colore: 3 },
        { tipo: 'punto', p: ['-d/c', 'a/c'], etichetta: 'centro', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [-7.6, -6.6], testo: 'asintoti x = {{-d/c}}  ·  y = {{a/c}}', ancora: 'start' },
        { tipo: 'testo', p: [-7.6, -7.5], testo: 'ad − bc = {{a*d - b*c}}', ancora: 'start' }
      ],
      didascalia: "Cambia d e l'asintoto verticale si sposta; cambia a e si sposta quello orizzontale. Quando ad − bc = 0 l'iperbole diventa una retta."
    }
  },

  esempi: [
    { titolo: R`Fuochi ed eccentricità di un'ellisse`, problema: R`Data l'ellisse $\dfrac{x^2}{25}+\dfrac{y^2}{16}=1$, trova semiassi, vertici, fuochi ed eccentricità.`, passi: [
      R`$a^2=25$ e $b^2=16$, quindi $a=5$ e $b=4$. Poiché $a>b$, i fuochi sono sull'asse $x$.`,
      R`Vertici: $A(-5;0)$, $A'(5;0)$, $B(0;-4)$, $B'(0;4)$.`,
      R`$c^2=a^2-b^2=25-16=9$, quindi $c=3$: fuochi $F(-3;0)$, $F'(3;0)$.`,
      R`Eccentricità: $e=c/a=3/5=0{,}6$.`
    ], risultato: R`$a=5,\ b=4,\ c=3,\ F(\pm3;0),\ e=0{,}6$` },

    { titolo: "Un'ellisse con i fuochi sull'asse y", problema: R`Data l'ellisse $\dfrac{x^2}{4}+\dfrac{y^2}{13}=1$, trova le coordinate dei fuochi e l'eccentricità.`, passi: [
      R`Leggo i semiassi: $a^2=4$ (sotto $x^2$) e $b^2=13$ (sotto $y^2$), quindi $a=2$ e $b=\sqrt{13}$.`,
      R`Il denominatore più grande è sotto $y^2$ ($13>4$): l'ellisse è più alta che larga e i fuochi stanno sull'asse $y$.`,
      R`Con i fuochi sull'asse $y$ la semidistanza focale si calcola al contrario: $c^2=b^2-a^2=13-4=9$, quindi $c=3$ e i fuochi sono $F(0;-3)$, $F'(0;3)$.`,
      R`L'eccentricità si calcola dividendo per il semiasse dei fuochi, che qui è $b$: $e=\dfrac cb=\dfrac{3}{\sqrt{13}}\approx0{,}83$.`
    ], risultato: R`$F(0;\pm3),\ e\approx0{,}83$` },

    { titolo: R`Rette tangenti a un'ellisse da un punto esterno`, problema: R`Determina per quali valori di $m$ la retta $y=mx+2$ è tangente all'ellisse $\dfrac{x^2}{3}+y^2=1$.`, passi: [
      R`La retta ha $q=2$; l'ellisse ha $a^2=3$, $b^2=1$. Condizione di tangenza: $q^2=a^2m^2+b^2$.`,
      R`$4=3m^2+1$, quindi $3m^2=3$, cioè $m^2=1$.`,
      R`$m=1$ oppure $m=-1$: due rette tangenti, simmetriche rispetto all'asse $y$.`
    ], risultato: R`$m=1 \lor m=-1$` },

    { titolo: R`Tangente a un'ellisse in un suo punto`, problema: R`Scrivi la tangente all'ellisse $\dfrac{x^2}{8}+\dfrac{y^2}{2}=1$ nel suo punto $P_0(2;1)$.`, passi: [
      R`Verifico che $P_0$ sia sull'ellisse: $\dfrac{4}{8}+\dfrac{1}{2}=0{,}5+0{,}5=1$. ✓`,
      R`Sdoppiamento: sostituisco $x^2\to x\cdot x_0=2x$ e $y^2\to y\cdot y_0=y$: $\dfrac{2x}{8}+\dfrac{y}{2}=1$.`,
      R`Semplifico: $\dfrac{x}{4}+\dfrac{y}{2}=1$, e moltiplicando per $4$: $x+2y=4$.`
    ], risultato: R`$x+2y=4$` },

    { titolo: R`Vertici, fuochi e asintoti di un'iperbole`, problema: R`Data l'iperbole $\dfrac{x^2}{9}-\dfrac{y^2}{16}=1$, trova vertici, fuochi, asintoti ed eccentricità.`, passi: [
      R`$a^2=9$, $b^2=16$: $a=3$, $b=4$. Vertici $A(-3;0)$, $A'(3;0)$.`,
      R`$c^2=a^2+b^2=9+16=25$, $c=5$: fuochi $F(-5;0)$, $F'(5;0)$.`,
      R`Asintoti: $y=\pm\dfrac{b}{a}x=\pm\dfrac43x$.`,
      R`Eccentricità: $e=c/a=5/3\approx1{,}67$.`
    ], risultato: R`$A(\pm3;0),\ F(\pm5;0),\ y=\pm\dfrac43x,\ e\approx1{,}67$` },

    { titolo: "Un'iperbole con il centro spostato", problema: R`Riconosci la curva $x^2-4y^2-2x-8y-7=0$ e trova centro, vertici, fuochi e asintoti.`, passi: [
      R`$x^2$ e $y^2$ hanno segni opposti: ci aspettiamo un'iperbole. Raggruppo i termini in $x$ e in $y$, raccogliendo $-4$: $(x^2-2x)-4(y^2+2y)=7$.`,
      R`Completo i quadrati. Nella prima parentesi aggiungo $1$; nella seconda aggiungo $1$, ma davanti c'è $-4$, quindi a destra aggiungo $-4$: $(x^2-2x+1)-4(y^2+2y+1)=7+1-4$.`,
      R`Riconosco i quadrati di binomio: $(x-1)^2-4(y+1)^2=4$. Divido per $4$: $\dfrac{(x-1)^2}{4}-(y+1)^2=1$.`,
      R`È l'iperbole $\dfrac{x^2}{4}-y^2=1$ con il centro in $(1;-1)$. Quindi $a=2$, $b=1$ e $c^2=4+1=5$.`,
      R`Vertici $(1\pm2;-1)$, cioè $(-1;-1)$ e $(3;-1)$. Fuochi $(1\pm\sqrt5;-1)$.`,
      R`Asintoti $y+1=\pm\dfrac12(x-1)$, cioè $y=\dfrac12x-\dfrac32$ e $y=-\dfrac12x-\dfrac12$.`
    ], risultato: R`Centro $(1;-1)$, vertici $(-1;-1)$ e $(3;-1)$, fuochi $(1\pm\sqrt5;-1)$, asintoti $y=\dfrac12x-\dfrac32$ e $y=-\dfrac12x-\dfrac12$` },

    { titolo: 'Centro e asintoti di una funzione omografica', problema: R`Della funzione $y=\dfrac{3x-1}{x+2}$ trova centro di simmetria e asintoti.`, passi: [
      R`Confronto con $y=\dfrac{ax+b}{cx+d}$: $a=3$, $b=-1$, $c=1$, $d=2$. Controllo $ad-bc=3\cdot2-(-1)\cdot1=6+1=7\ne0$: è davvero una funzione omografica.`,
      R`Asintoto verticale: si annulla il denominatore, $x+2=0$, cioè $x=-2$.`,
      R`Asintoto orizzontale: $y=\dfrac{a}{c}=\dfrac31=3$.`,
      R`Centro di simmetria: $(-2;3)$, l'incrocio dei due asintoti.`
    ], risultato: R`Centro $(-2;3)$, asintoti $x=-2$ e $y=3$` }
  ],

  formulario: [
    { nome: R`Equazione canonica dell'ellisse`, formula: R`\frac{x^2}{a^2}+\frac{y^2}{b^2}=1`, nota: R`Fuochi sull'asse $x$ se $a>b$, sull'asse $y$ se $a<b$.` },
    { nome: R`Ellisse, fuochi sull'asse x`, formula: R`c^2=a^2-b^2 \quad (a>b>0)` },
    { nome: R`Ellisse, fuochi sull'asse y`, formula: R`c^2=b^2-a^2 \quad (b>a>0)` },
    { nome: R`Eccentricità dell'ellisse`, formula: R`e=\frac{c}{a}`, nota: R`Oppure $e=c/b$ se i fuochi sono sull'asse $y$. Vale sempre $0 \le e < 1$.` },
    { nome: R`Tangente per sdoppiamento (ellisse)`, formula: R`\frac{x\,x_0}{a^2}+\frac{y\,y_0}{b^2}=1`, nota: R`Tangente all'ellisse nel suo punto $P_0(x_0;y_0)$.` },
    { nome: R`Condizione di tangenza retta-ellisse`, formula: R`q^2=a^2m^2+b^2`, nota: R`Per la retta $y=mx+q$ tangente a $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$.` },
    { nome: R`Equazione canonica dell'iperbole (fuochi sull'asse x)`, formula: R`\frac{x^2}{a^2}-\frac{y^2}{b^2}=1` },
    { nome: R`Iperbole con i fuochi sull'asse y`, formula: R`\frac{x^2}{a^2}-\frac{y^2}{b^2}=-1`, nota: R`Equivalente a $\frac{y^2}{b^2}-\frac{x^2}{a^2}=1$: stessi asintoti, fuochi e vertici sull'asse $y$.` },
    { nome: R`Relazione fondamentale dell'iperbole`, formula: R`c^2=a^2+b^2` },
    { nome: R`Eccentricità dell'iperbole`, formula: R`e=\frac{c}{a}`, nota: R`Con $1$ a destra; sempre $e>1$, perché $c>a$. Con $-1$ a destra i fuochi sono sull'asse $y$ ed $e=\frac cb$.` },
    { nome: R`Asintoti dell'iperbole`, formula: R`y=\pm\frac{b}{a}x` },
    { nome: R`Iperbole equilatera riferita agli asintoti`, formula: R`xy=k`, nota: R`Curva $x^2-y^2=a^2$ vista negli assi dei propri asintoti.` },
    { nome: R`Ellisse con centro (x₀; y₀)`, formula: R`\frac{(x-x_0)^2}{a^2}+\frac{(y-y_0)^2}{b^2}=1`, nota: R`Stessi $a$, $b$, $c$ dell'ellisse con centro in $O$; vertici e fuochi si spostano di $x_0$ in orizzontale e di $y_0$ in verticale.` },
    { nome: R`Area dell'ellisse`, formula: R`A=\pi ab`, nota: R`L'area $\pi a^2$ del cerchio di raggio $a$, moltiplicata per il fattore di schiacciamento $\frac ba$.` },
    { nome: R`Iperbole con centro (x₀; y₀)`, formula: R`\frac{(x-x_0)^2}{a^2}-\frac{(y-y_0)^2}{b^2}=1`, nota: R`Asintoti $y-y_0=\pm\frac ba(x-x_0)$, fuochi $(x_0\pm c;y_0)$ con $c^2=a^2+b^2$.` },
    { nome: R`Funzione omografica: centro e asintoti`, formula: R`x=-\frac{d}{c}, \quad y=\frac{a}{c}`, nota: R`Per $y=\frac{ax+b}{cx+d}$, con $c \ne 0$ e $ad-bc \ne 0$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'coniche', tipo: 'definizione', fronte: R`Che cos'è una conica?`, retro: R`Una curva ottenuta intersecando un cono a doppia falda con un piano; il tipo dipende dall'inclinazione del piano rispetto all'asse del cono.` },
    { id: 'fc-02', sezione: 'coniche', tipo: 'concetto', fronte: R`Quali sono le quattro coniche?`, retro: R`Circonferenza, ellisse, parabola e iperbole, a seconda dell'angolo del piano di sezione.` },
    { id: 'fc-03', sezione: 'ellisse-definizione', tipo: 'definizione', fronte: R`Definizione di ellisse come luogo`, retro: R`$PF_1+PF_2=2a$: l'insieme dei punti la cui somma delle distanze da due fuochi fissi è costante.` },
    { id: 'fc-04', sezione: 'ellisse-definizione', tipo: 'concetto', fronte: R`Cosa succede se i due fuochi di un'ellisse coincidono?`, retro: R`L'ellisse diventa una circonferenza di raggio $a$.` },
    { id: 'fc-05', sezione: 'ellisse-equazione', tipo: 'formula', fronte: R`Equazione canonica dell'ellisse`, retro: R`$\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$` },
    { id: 'fc-06', sezione: 'ellisse-equazione', tipo: 'concetto', fronte: R`Come si capisce su quale asse sono i fuochi di un'ellisse?`, retro: R`Sull'asse del denominatore maggiore: se $a>b$ sono sull'asse $x$, se $a<b$ sull'asse $y$.` },
    { id: 'fc-07', sezione: 'ellisse-equazione', tipo: 'formula', fronte: R`Relazione fra $a$, $b$, $c$ nell'ellisse (fuochi sull'asse $x$)`, retro: R`$c^2=a^2-b^2$, con $a>b>0$.` },
    { id: 'fc-08', sezione: 'ellisse-equazione', tipo: 'definizione', fronte: R`Vertici dell'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$`, retro: R`$A(-a;0)$, $A'(a;0)$ sull'asse $x$; $B(0;-b)$, $B'(0;b)$ sull'asse $y$. L'asse maggiore è quello del semiasse più grande.` },
    { id: 'fc-09', sezione: 'eccentricita', tipo: 'formula', fronte: R`Eccentricità dell'ellisse`, retro: R`$e=c/a$ (oppure $c/b$ se i fuochi sono sull'asse $y$), sempre $0\le e<1$.` },
    { id: 'fc-10', sezione: 'eccentricita', tipo: 'concetto', fronte: R`Che forma ha un'ellisse con $e$ vicino a $0$?`, retro: R`È quasi una circonferenza: i fuochi sono vicini al centro.` },
    { id: 'fc-11', sezione: 'eccentricita', tipo: 'concetto', fronte: R`Che forma ha un'ellisse con $e$ vicino a $1$?`, retro: R`È molto schiacciata: i fuochi sono vicini ai vertici sull'asse maggiore.` },
    { id: 'fc-12', sezione: 'ellisse-retta', tipo: 'formula', fronte: R`Condizione di tangenza fra $y=mx+q$ e l'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$`, retro: R`$q^2=a^2m^2+b^2$.` },
    { id: 'fc-13', sezione: 'ellisse-retta', tipo: 'procedura', fronte: R`Formula di sdoppiamento per la tangente in un punto dell'ellisse`, retro: R`Nel punto $P_0(x_0;y_0)$ dell'ellisse: $\dfrac{x\,x_0}{a^2}+\dfrac{y\,y_0}{b^2}=1$.` },
    { id: 'fc-14', sezione: 'iperbole-definizione', tipo: 'definizione', fronte: R`Definizione di iperbole come luogo`, retro: R`$|PF_1-PF_2|=2a$: l'insieme dei punti per cui il valore assoluto della differenza delle distanze da due fuochi fissi è costante.` },
    { id: 'fc-15', sezione: 'iperbole-definizione', tipo: 'formula', fronte: R`Equazione canonica dell'iperbole (fuochi sull'asse x)`, retro: R`$\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$` },
    { id: 'fc-16', sezione: 'iperbole-definizione', tipo: 'formula', fronte: R`Relazione fra $a$, $b$, $c$ nell'iperbole`, retro: R`$c^2=a^2+b^2$ (una somma, a differenza dell'ellisse).` },
    { id: 'fc-17', sezione: 'iperbole-definizione', tipo: 'formula', fronte: R`Asintoti dell'iperbole $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$`, retro: R`$y=\pm\dfrac{b}{a}x$.` },
    { id: 'fc-18', sezione: 'iperbole-definizione', tipo: 'concetto', fronte: R`Perché l'eccentricità dell'iperbole è sempre maggiore di 1?`, retro: R`Perché $c>a$, dato che $c^2=a^2+b^2>a^2$.` },
    { id: 'fc-19', sezione: 'iperbole-definizione', tipo: 'concetto', fronte: R`Iperbole con i fuochi sull'asse y`, retro: R`Si scrive $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=-1$ (equivalente a $\dfrac{y^2}{b^2}-\dfrac{x^2}{a^2}=1$): stessi asintoti, fuochi e vertici sull'asse $y$.` },
    { id: 'fc-20', sezione: 'iperbole-equilatera', tipo: 'definizione', fronte: R`Iperbole equilatera`, retro: R`Iperbole con $a=b$: equazione $x^2-y^2=a^2$, asintoti perpendicolari $y=\pm x$, eccentricità $\sqrt2$.` },
    { id: 'fc-21', sezione: 'iperbole-equilatera', tipo: 'formula', fronte: R`Iperbole equilatera riferita ai propri asintoti`, retro: R`$xy=k$: gli assi cartesiani coincidono con gli asintoti.` },
    { id: 'fc-22', sezione: 'omografica', tipo: 'definizione', fronte: R`Funzione omografica`, retro: R`$y=\dfrac{ax+b}{cx+d}$, con $c\ne0$ e $ad-bc\ne0$: il suo grafico è un'iperbole equilatera traslata.` },
    { id: 'fc-23', sezione: 'omografica', tipo: 'formula', fronte: R`Centro e asintoti della funzione omografica $y=\dfrac{ax+b}{cx+d}$`, retro: R`Asintoto verticale $x=-d/c$, asintoto orizzontale $y=a/c$; centro $\left(-\dfrac{d}{c};\dfrac{a}{c}\right)$.` },
    { id: 'fc-24', sezione: 'omografica', tipo: 'concetto', fronte: R`Perché serve $ad-bc\ne0$ nella funzione omografica?`, retro: R`Se $ad=bc$ la frazione si riduce a una costante: non è più un'iperbole, ma una retta orizzontale privata di un punto.` },
    { id: 'fc-25', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Come trovare l'equazione di un'ellisse o iperbole dai dati?`, retro: R`Si individua l'orientamento (fuochi su $x$ o su $y$), si traducono i dati in equazioni su $a$, $b$, $c$ con le relazioni note, e si risolve il sistema.` },
    { id: 'fc-26', sezione: 'coniche-traslate', tipo: 'formula', fronte: R`Ellisse con il centro in $C(x_0;y_0)$`, retro: R`$\dfrac{(x-x_0)^2}{a^2}+\dfrac{(y-y_0)^2}{b^2}=1$. Stessi $a$, $b$, $c$ di quella con centro in $O$; vertici e fuochi spostati con il centro.` },
    { id: 'fc-27', sezione: 'coniche-traslate', tipo: 'procedura', fronte: R`Come trovi il centro di un'ellisse scritta come $4x^2+9y^2-16x+18y-11=0$?`, retro: R`Completi i quadrati: raggruppi i termini in $x$ e in $y$, raccogli i coefficienti di $x^2$ e $y^2$, aggiungi a destra ciò che aggiungi a sinistra. Qui viene $\dfrac{(x-2)^2}{9}+\dfrac{(y+1)^2}{4}=1$: centro $(2;-1)$.` },
    { id: 'fc-28', sezione: 'coniche-traslate', tipo: 'formula', fronte: R`Asintoti dell'iperbole $\dfrac{(x-x_0)^2}{a^2}-\dfrac{(y-y_0)^2}{b^2}=1$`, retro: R`$y-y_0=\pm\dfrac ba(x-x_0)$: passano per il centro $(x_0;y_0)$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Trova i semiassi dell'ellisse $\dfrac{x^2}{64}+\dfrac{y^2}{9}=1$. Scrivi *a; b*.`, suggerimenti: [R`Sotto $x^2$ c'è $a^2$, sotto $y^2$ c'è $b^2$.`], risposta: cop(8, 3), soluzione: [R`$a^2=64$, quindi $a=8$.`, R`$b^2=9$, quindi $b=3$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Trova il vertice di ascissa positiva dell'ellisse $\dfrac{x^2}{16}+\dfrac{y^2}{4}=1$. Scrivi *x; y*.`, suggerimenti: [R`I vertici sull'asse $x$ sono $(\pm a;0)$.`], risposta: cop(4, 0), soluzione: [R`$a^2=16$, quindi $a=4$.`, R`Il vertice è $A'(4;0)$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Trova il vertice di ordinata positiva dell'ellisse $\dfrac{x^2}{4}+\dfrac{y^2}{9}=1$. Scrivi *x; y*.`, suggerimenti: [R`I vertici sull'asse $y$ sono $(0;\pm b)$.`], risposta: cop(0, 3), soluzione: [R`$b^2=9$, quindi $b=3$.`, R`Il vertice è $B'(0;3)$.`] },
    { id: 'b-04', livello: 'base', sezione: 'ellisse-retta', difficolta: 2, testo: R`Trova il valore positivo di $q$ per cui la retta $y=2x+q$ è tangente all'ellisse $\dfrac{x^2}{4}+\dfrac{y^2}{9}=1$.`, suggerimenti: [R`Usa la condizione di tangenza $q^2=a^2m^2+b^2$.`, R`Qui $a^2=4$, $b^2=9$ e $m=2$.`], risposta: num(5), soluzione: [R`$a^2=4$, $b^2=9$, $m=2$.`, R`$q^2=4\cdot2^2+9=25$, quindi $q=\pm5$.`, R`Il valore positivo è $q=5$.`] },
    { id: 'b-05', livello: 'base', sezione: 'iperbole-definizione', difficolta: 1, testo: R`Scrivi l'asintoto con coefficiente angolare positivo dell'iperbole $\dfrac{x^2}{49}-\dfrac{y^2}{16}=1$, nella forma $y=mx$.`, suggerimenti: [R`Gli asintoti sono $y=\pm\dfrac bax$.`], risposta: { tipo: 'testo', accettate: ['y=4/7x', 'y=(4/7)x', 'y=4x/7', 'y=4/7*x', '7y=4x', '4x-7y=0', '4x=7y'], segnaposto: 'es. y = 2x', simboli: ['/', '(', ')', '−', '='] }, soluzione: [R`$a^2=49$ e $b^2=16$, quindi $a=7$ e $b=4$.`, R`Gli asintoti sono $y=\pm\dfrac47x$.`, R`Quello con $m>0$ è $y=\dfrac47x$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Trova il fuoco di ascissa positiva dell'ellisse $\dfrac{x^2}{20}+\dfrac{y^2}{4}=1$. Scrivi *x; y*.`, suggerimenti: [R`Il denominatore più grande è sotto $x^2$: i fuochi sono sull'asse $x$.`, R`Usa $c^2=a^2-b^2$.`], risposta: cop(4, 0), soluzione: [R`$a^2=20$ e $b^2=4$: i fuochi sono sull'asse $x$.`, R`$c^2=20-4=16$, quindi $c=4$.`, R`Il fuoco è $(4;0)$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Trova il fuoco di ascissa positiva dell'ellisse $\dfrac{x^2}{100}+\dfrac{y^2}{36}=1$. Scrivi *x; y*.`, suggerimenti: [R`Nell'ellisse $c^2=a^2-b^2$.`], risposta: cop(8, 0), soluzione: [R`$a^2=100$ e $b^2=36$: i fuochi sono sull'asse $x$.`, R`$c^2=100-36=64$, quindi $c=8$.`, R`Il fuoco è $(8;0)$.`] },
    { id: 'b-08', livello: 'base', sezione: 'iperbole-equilatera', difficolta: 1, testo: R`L'iperbole equilatera $xy=k$ passa per il punto $(-3;5)$. Trova $k$.`, suggerimenti: [R`Sostituisci le coordinate del punto in $xy=k$.`], risposta: num(-15), soluzione: [R`$k=x\cdot y=(-3)\cdot5=-15$.`, R`Con $k<0$ i rami stanno nel secondo e nel quarto quadrante: $(-3;5)$ è nel secondo.`] },
    { id: 'b-09', livello: 'base', sezione: 'omografica', difficolta: 1, testo: R`Trova il centro della funzione omografica $y=\dfrac{x+5}{x-4}$. Scrivi *x; y*.`, suggerimenti: [R`Il centro è l'incrocio dei due asintoti.`, R`L'asintoto verticale annulla il denominatore. L'orizzontale è $y=\dfrac ac$.`], risposta: cop(4, 1), soluzione: [R`$x-4=0$ dà l'asintoto verticale $x=4$.`, R`$a=1$ e $c=1$: l'asintoto orizzontale è $y=1$.`, R`Il centro è $(4;1)$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Trova il fuoco di ascissa positiva dell'iperbole $\dfrac{x^2}{5}-\dfrac{y^2}{4}=1$. Scrivi *x; y*.`, suggerimenti: [R`Nell'iperbole $c^2=a^2+b^2$. Qui non serve calcolare $a$.`], risposta: cop(3, 0), soluzione: [R`$a^2=5$ e $b^2=4$.`, R`$c^2=5+4=9$, quindi $c=3$.`, R`Il fuoco è $(3;0)$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Calcola l'eccentricità dell'ellisse $\dfrac{x^2}{169}+\dfrac{y^2}{25}=1$.`, suggerimenti: [R`Trova prima $c$ con $c^2=a^2-b^2$.`, R`Poi $e=\dfrac ca$.`], risposta: num(12 / 13), soluzione: [R`$a=13$ e $c^2=169-25=144$, quindi $c=12$.`, R`$e=\dfrac ca=\dfrac{12}{13}$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Calcola l'eccentricità dell'ellisse $\dfrac{x^2}{36}+\dfrac{y^2}{100}=1$.`, suggerimenti: [R`I fuochi sono sull'asse $y$: dividi per $b$.`], risposta: num(4 / 5), soluzione: [R`I fuochi sono sull'asse $y$, perché $100>36$.`, R`$c^2=100-36=64$, quindi $c=8$.`, R`$e=\dfrac cb=\dfrac{8}{10}=\dfrac45$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Calcola l'eccentricità dell'iperbole $\dfrac{x^2}{25}-\dfrac{y^2}{144}=1$. Scrivila come frazione.`, suggerimenti: [R`Nell'iperbole $c^2=a^2+b^2$, poi $e=\dfrac ca$.`], risposta: num(13 / 5), soluzione: [R`$c^2=25+144=169$, quindi $c=13$.`, R`$a=5$, quindi $e=\dfrac{13}{5}$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Trova il fuoco di ordinata positiva dell'iperbole $\dfrac{x^2}{7}-\dfrac{y^2}{9}=-1$. Scrivi *x; y*.`, suggerimenti: [R`Con $-1$ a destra i fuochi stanno sull'asse $y$.`, R`$c^2=a^2+b^2$ vale anche qui.`], risposta: cop(0, 4), soluzione: [R`A destra c'è $-1$: fuochi sull'asse $y$.`, R`$c^2=7+9=16$, quindi $c=4$.`, R`Il fuoco è $(0;4)$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Scrivi l'equazione dell'ellisse con i fuochi sull'asse $x$ e semiassi $a=5$ e $b=2$.`, suggerimenti: [R`Metti $a^2$ e $b^2$ in $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$.`], risposta: conica(25, 4, '+'), soluzione: [R`$a^2=25$ e $b^2=4$.`, R`$\dfrac{x^2}{25}+\dfrac{y^2}{4}=1$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Scrivi l'equazione dell'iperbole con i fuochi sull'asse $x$ e semiassi $a=6$ e $b=4$.`, suggerimenti: [R`L'iperbole ha il meno: $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$.`], risposta: conica(36, 16, '-'), soluzione: [R`$a^2=36$ e $b^2=16$.`, R`$\dfrac{x^2}{36}-\dfrac{y^2}{16}=1$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Un'ellisse ha i fuochi in $(\pm1;0)$ e un vertice in $(2;0)$. Scrivi la sua equazione.`, suggerimenti: [R`Il vertice dà $a=2$, il fuoco dà $c=1$.`, R`Trova $b^2$ con $b^2=a^2-c^2$.`], risposta: conica(4, 3, '+'), soluzione: [R`$a=2$ e $c=1$.`, R`$b^2=4-1=3$.`, R`$\dfrac{x^2}{4}+\dfrac{y^2}{3}=1$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Un'ellisse ha i fuochi in $(0;\pm2)$ e un vertice in $(0;3)$. Scrivi la sua equazione.`, suggerimenti: [R`I fuochi sono sull'asse $y$: il vertice dà $b=3$.`, R`Qui $a^2=b^2-c^2$.`], risposta: conica(5, 9, '+'), soluzione: [R`$b=3$ e $c=2$, fuochi sull'asse $y$.`, R`$a^2=9-4=5$.`, R`$\dfrac{x^2}{5}+\dfrac{y^2}{9}=1$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Un'iperbole ha i fuochi in $(\pm6;0)$ e i vertici in $(\pm4;0)$. Scrivi la sua equazione.`, suggerimenti: [R`$a=4$ e $c=6$.`, R`Nell'iperbole $b^2=c^2-a^2$.`], risposta: conica(16, 20, '-'), soluzione: [R`$a=4$ e $c=6$.`, R`$b^2=36-16=20$.`, R`$\dfrac{x^2}{16}-\dfrac{y^2}{20}=1$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Un'ellisse ha i fuochi sull'asse $x$, un vertice in $(6;0)$ ed eccentricità $\dfrac23$. Scrivi la sua equazione.`, suggerimenti: [R`Da $e=\dfrac ca$ con $a=6$ trovi $c$.`, R`Poi $b^2=a^2-c^2$.`], risposta: conica(36, 20, '+'), soluzione: [R`$a=6$ e $\dfrac c6=\dfrac23$, quindi $c=4$.`, R`$b^2=36-16=20$.`, R`$\dfrac{x^2}{36}+\dfrac{y^2}{20}=1$.`] },
    { id: 'b-21', livello: 'base', sezione: 'coniche-traslate', difficolta: 1, testo: R`Trova il centro dell'ellisse $\dfrac{(x-3)^2}{16}+\dfrac{(y+2)^2}{9}=1$. Scrivi *x; y*.`, suggerimenti: [R`Confronta con $(x-x_0)^2$ e $(y-y_0)^2$.`, R`$y+2=y-(-2)$.`], risposta: cop(3, -2), soluzione: [R`$(x-3)^2$ dà $x_0=3$.`, R`$(y+2)^2=(y-(-2))^2$ dà $y_0=-2$.`, R`Il centro è $(3;-2)$.`] },
    { id: 'b-22', livello: 'base', sezione: 'coniche-traslate', difficolta: 1, testo: R`Trova il fuoco di ascissa maggiore dell'ellisse $\dfrac{(x-2)^2}{25}+\dfrac{(y+3)^2}{9}=1$. Scrivi *x; y*.`, suggerimenti: [R`Trova prima il centro, poi $c$ con $c^2=a^2-b^2$.`, R`I fuochi sono $(x_0\pm c;y_0)$.`], risposta: cop(6, -3), soluzione: [R`Centro $(2;-3)$. Il denominatore più grande è sotto la $x$: fuochi in orizzontale.`, R`$c^2=25-9=16$, quindi $c=4$.`, R`Fuochi $(2\pm4;-3)$: quello di ascissa maggiore è $(6;-3)$.`] },
    { id: 'b-23', livello: 'base', sezione: 'coniche-traslate', difficolta: 2, testo: R`Trova il centro dell'iperbole $x^2-y^2-4x+6y-6=0$. Scrivi *x; y*.`, suggerimenti: [R`Raggruppa: $(x^2-4x)-(y^2-6y)=6$.`, R`Completa i quadrati con $4$ e con $9$. Attento al meno davanti alla seconda parentesi.`], risposta: cop(2, 3), soluzione: [R`$(x^2-4x+4)-(y^2-6y+9)=6+4-9$.`, R`$(x-2)^2-(y-3)^2=1$.`, R`Il centro è $(2;3)$.`] },
    { id: 'b-24', livello: 'base', sezione: 'coniche-traslate', difficolta: 2, testo: R`Trova il centro dell'ellisse $x^2+4y^2+6x-8y+9=0$. Scrivi *x; y*.`, suggerimenti: [R`Raggruppa e raccogli il $4$: $(x^2+6x)+4(y^2-2y)=-9$.`, R`Dentro le parentesi aggiungi $9$ e $1$; a destra $9$ e $4\cdot1$.`], risposta: cop(-3, 1), soluzione: [R`$(x^2+6x+9)+4(y^2-2y+1)=-9+9+4$.`, R`$(x+3)^2+4(y-1)^2=4$, cioè $\dfrac{(x+3)^2}{4}+(y-1)^2=1$.`, R`Il centro è $(-3;1)$.`] },
    { id: 'b-25', livello: 'base', sezione: 'coniche-traslate', difficolta: 2, testo: R`Scrivi l'asintoto con coefficiente angolare positivo dell'iperbole $\dfrac{(x-1)^2}{4}-\dfrac{(y-2)^2}{9}=1$, nella forma $y=mx+q$.`, suggerimenti: [R`Gli asintoti passano per il centro $(1;2)$.`, R`$y-2=\pm\dfrac ba(x-1)$, con $a=2$ e $b=3$.`], risposta: { tipo: 'testo', accettate: ['y=3/2x+1/2', 'y=(3/2)x+1/2', 'y=3x/2+1/2', 'y=1.5x+0.5', 'y=(3x+1)/2', 'y=1/2+3/2x', 'y=0.5+1.5x', '2y=3x+1', '3x-2y+1=0', 'y-2=3/2(x-1)', 'y-2=(3/2)(x-1)', 'y=3/2*x+1/2'], segnaposto: 'es. y = 2x − 1', simboli: ['/', '(', ')', '−', '='] }, soluzione: [R`Centro $(1;2)$, $a=2$, $b=3$.`, R`Asintoti $y-2=\pm\dfrac32(x-1)$.`, R`Con il più: $y=\dfrac32x-\dfrac32+2=\dfrac32x+\dfrac12$.`] },

    { id: 'es-01', sezione: 'ellisse-retta', difficolta: 2, testo: R`Trova i punti comuni all'ellisse $\dfrac{x^2}{12}+\dfrac{y^2}{4}=1$ e alla retta $y=x-2$. Nella casella scrivi la lunghezza della corda che li unisce.`, suggerimenti: [R`Togli i denominatori e sostituisci $y=x-2$.`, R`Viene un'equazione di secondo grado senza termine noto.`, R`Con i due punti usa la formula della distanza.`], risposta: num(3 * Math.SQRT2), soluzione: [R`Moltiplico per $12$: $x^2+3y^2=12$. Sostituisco: $x^2+3(x-2)^2=12$.`, R`$4x^2-12x=0$, cioè $4x(x-3)=0$: $x=0$ oppure $x=3$.`, R`I punti sono $(0;-2)$ e $(3;1)$.`, R`Corda: $\sqrt{3^2+3^2}=3\sqrt2\approx4{,}24$.`] },
    { id: 'es-02', sezione: 'ellisse-retta', difficolta: 3, testo: R`Dal punto $P(0;5)$ conduci le tangenti all'ellisse $\dfrac{x^2}{4}+\dfrac{y^2}{16}=1$. Trova i coefficienti angolari e i punti di tangenza. Nella casella scrivi i due coefficienti angolari.`, suggerimenti: [R`Le rette per $P$ sono $y=mx+5$.`, R`Condizione di tangenza: $q^2=a^2m^2+b^2$, con $q=5$.`, R`Per il punto di tangenza sostituisci la retta: la soluzione doppia è $x=-\dfrac{B}{2A}$.`], risposta: { tipo: 'numeri', valori: [1.5, -1.5] }, soluzione: [R`$a^2=4$, $b^2=16$, $q=5$: $25=4m^2+16$, quindi $m^2=\dfrac94$ e $m=\pm\dfrac32$.`, R`Sostituisco $y=mx+5$ in $4x^2+y^2=16$: $(4+m^2)x^2+10mx+9=0$.`, R`Con $m=\dfrac32$: $\dfrac{25}{4}x^2+15x+9=0$, soluzione doppia $x=-\dfrac65$, e $y=\dfrac32\cdot\left(-\dfrac65\right)+5=\dfrac{16}{5}$.`, R`Per simmetria, con $m=-\dfrac32$ il punto è $\left(\dfrac65;\dfrac{16}{5}\right)$.`] },
    { id: 'es-03', sezione: 'iperbole-definizione', difficolta: 3, testo: R`Per quali valori di $q$ la retta $y=x+q$ è tangente all'iperbole $\dfrac{x^2}{9}-\dfrac{y^2}{5}=1$? Usa il $\Delta$.`, suggerimenti: [R`Togli i denominatori: $5x^2-9y^2=45$.`, R`Sostituisci $y=x+q$ e ordina l'equazione in $x$.`, R`Tangente quando $\Delta=0$.`], risposta: { tipo: 'numeri', valori: [2, -2] }, soluzione: [R`$5x^2-9(x+q)^2=45$, cioè $4x^2+18qx+9q^2+45=0$.`, R`$\dfrac\Delta4=81q^2-4(9q^2+45)=45q^2-180$.`, R`$45q^2-180=0$: $q^2=4$, quindi $q=\pm2$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Scrivi l'equazione dell'ellisse con centro nell'origine, semiasse maggiore $6$ sull'asse $x$ e semiasse minore $4$.`, suggerimenti: [R`L'equazione canonica è $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$.`, R`Qui $a=6$ (sull'asse $x$) e $b=4$.`], risposta: { tipo: 'testo', accettate: ['x^2/36+y^2/16=1', 'y^2/16+x^2/36=1', 'x^2/6^2+y^2/4^2=1', '4x^2+9y^2=144', '16x^2+36y^2=576'] }, soluzione: [R`Semiasse maggiore $a=6$ sull'asse $x$, semiasse minore $b=4$.`, R`Equazione: $\dfrac{x^2}{36}+\dfrac{y^2}{16}=1$.`] },
    { id: 'es-05', sezione: 'determinare-equazione', difficolta: 2, testo: R`Un'iperbole con i fuochi sull'asse $x$ ha asintoti $y=\pm\dfrac23x$ e passa per $P(6;2)$. Scrivi la sua equazione.`, suggerimenti: [R`Dagli asintoti $\dfrac ba=\dfrac23$, quindi $b=\dfrac23a$.`, R`Sostituisci $P$ in $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$.`], risposta: conica(27, 12, '-'), soluzione: [R`$b=\dfrac23a$, quindi $b^2=\dfrac49a^2$.`, R`Con $P(6;2)$: $\dfrac{36}{a^2}-\dfrac{4}{\frac49a^2}=\dfrac{36}{a^2}-\dfrac{9}{a^2}=\dfrac{27}{a^2}=1$.`, R`$a^2=27$ e $b^2=\dfrac49\cdot27=12$.`, R`$\dfrac{x^2}{27}-\dfrac{y^2}{12}=1$.`] },
    { id: 'es-06', sezione: 'determinare-equazione', difficolta: 2, testo: R`Un'ellisse ha i fuochi sull'asse $x$, eccentricità $\dfrac12$ e passa per $P(2;3)$. Scrivi la sua equazione.`, suggerimenti: [R`Da $e=\dfrac ca=\dfrac12$ viene $c=\dfrac a2$.`, R`Allora $b^2=a^2-c^2=\dfrac34a^2$. Poi sostituisci $P$.`], risposta: conica(16, 12, '+'), soluzione: [R`$c=\dfrac a2$, quindi $b^2=a^2-\dfrac{a^2}{4}=\dfrac34a^2$.`, R`Con $P(2;3)$: $\dfrac{4}{a^2}+\dfrac{9}{\frac34a^2}=\dfrac{4}{a^2}+\dfrac{12}{a^2}=\dfrac{16}{a^2}=1$.`, R`$a^2=16$ e $b^2=12$.`, R`$\dfrac{x^2}{16}+\dfrac{y^2}{12}=1$.`] },
    { id: 'es-09', sezione: 'omografica', difficolta: 3, testo: R`Per quale valore di $a$ la funzione $y=\dfrac{ax+3}{x-1}$ ha il centro di simmetria sulla retta $y=2x$?`, suggerimenti: [R`Il centro è $\left(-\dfrac dc;\dfrac ac\right)$: qui $c=1$ e $d=-1$.`, R`Il centro deve soddisfare $y=2x$.`, R`Alla fine controlla che sia $ad-bc\ne0$.`], risposta: num(2), soluzione: [R`Centro $(1;a)$.`, R`Sta su $y=2x$ se $a=2\cdot1=2$.`, R`Controllo: $ad-bc=2\cdot(-1)-3\cdot1=-5\ne0$. È davvero un'iperbole.`, R`Con $a=-3$ verrebbe $ad-bc=0$: la funzione degenera in una retta.`] },
    { id: 'es-11', difficolta: 3, testo: R`Un pianeta descrive un'orbita ellittica con il Sole in un fuoco: il semiasse maggiore vale $10$ (unità astronomiche) e l'eccentricità $0{,}2$. Trova le distanze minima e massima dal Sole (perielio e afelio).`, suggerimenti: [R`Calcola $c=e\cdot a$.`, R`Perielio $=a-c$, afelio $=a+c$.`], risposta: { tipo: 'numeri', valori: [8, 12] }, soluzione: [R`$c=e\cdot a=0{,}2\cdot10=2$.`, R`Perielio: $a-c=10-2=8$. Afelio: $a+c=10+2=12$.`] },
    { id: 'es-12', sezione: 'coniche-traslate', difficolta: 2, testo: R`Dell'ellisse $9x^2+4y^2+36x-8y+4=0$ trova centro, semiassi, fuochi ed eccentricità. Nella casella scrivi l'eccentricità.`, suggerimenti: [R`Raggruppa e raccogli: $9(x^2+4x)+4(y^2-2y)=-4$.`, R`Completa i quadrati: a destra aggiungi $9\cdot4$ e $4\cdot1$.`, R`Il denominatore più grande sta sotto la $y$: i fuochi sono sulla verticale per il centro, ed $e=\dfrac cb$.`], risposta: num(Math.sqrt(5) / 3), soluzione: [R`$9(x^2+4x+4)+4(y^2-2y+1)=-4+36+4$, cioè $9(x+2)^2+4(y-1)^2=36$.`, R`Divido per $36$: $\dfrac{(x+2)^2}{4}+\dfrac{(y-1)^2}{9}=1$. Centro $(-2;1)$, semiassi $a=2$ e $b=3$.`, R`$b>a$: i fuochi stanno sulla retta $x=-2$. $c^2=9-4=5$, fuochi $(-2;1\pm\sqrt5)$.`, R`$e=\dfrac cb=\dfrac{\sqrt5}{3}\approx0{,}75$.`] },
    { id: 'es-13', sezione: 'coniche-traslate', difficolta: 2, testo: R`Un'ellisse ha centro $(1;3)$, un vertice in $(6;3)$ e un fuoco in $(4;3)$. Scrivi la sua equazione.`, suggerimenti: [R`Vertice e fuoco stanno sulla retta $y=3$ del centro: misura le distanze dal centro.`, R`$a=5$ e $c=3$; poi $b^2=a^2-c^2$.`], risposta: { tipo: 'testo', accettate: ['(x-1)^2/25+(y-3)^2/16=1', '(y-3)^2/16+(x-1)^2/25=1', '(x-1)^2/5^2+(y-3)^2/4^2=1', '(y-3)^2/4^2+(x-1)^2/5^2=1', '16(x-1)^2+25(y-3)^2=400', '16x^2+25y^2-32x-150y-159=0'], segnaposto: 'es. (x − 2)²/9 + (y + 1)²/4 = 1', simboli: ['x²', 'y²', '(', ')', '/', '+', '−', '='] }, soluzione: [R`Il vertice dista $6-1=5$ dal centro: $a=5$. Il fuoco dista $4-1=3$: $c=3$.`, R`$b^2=a^2-c^2=25-9=16$.`, R`$\dfrac{(x-1)^2}{25}+\dfrac{(y-3)^2}{16}=1$.`] },
    { id: 'es-14', sezione: 'coniche-traslate', difficolta: 2, testo: R`Un'aiuola ha la forma di un'ellisse larga $10$ m e profonda $8$ m. Quanti metri quadrati misura?`, suggerimenti: [R`Larghezza e profondità sono i due assi: i semiassi sono la loro metà.`, R`L'ellisse è un cerchio di raggio $a$ schiacciato di un fattore $\frac ba$: l'area è $\pi ab$.`], risposta: { tipo: 'numero', valore: 20 * Math.PI, tolleranza: 0.1, segnaposto: 'es. 3π oppure 9,42' }, soluzione: [R`I semiassi sono $a=5$ e $b=4$.`, R`Area $=\pi ab=\pi\cdot5\cdot4=20\pi\approx62{,}83\ \text{m}^2$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Le coniche (ellisse, parabola, iperbole, circonferenza) si ottengono tutte…`, opzioni: [R`tagliando un cono con un piano`, R`tagliando un cilindro con un piano`, R`tagliando una sfera con un piano`, R`facendo ruotare una retta attorno a un asse`], corretta: 0, spiegazione: R`Sono le sezioni di un cono a doppia falda: il tipo dipende dall'inclinazione del piano. Una sfera tagliata dà solo circonferenze, un cilindro solo circonferenze ed ellissi. Una retta che ruota attorno a un asse descrive il cono stesso, non le sue sezioni.` },
    { id: 'q-02', domanda: R`Quale grandezza è costante per tutti i punti di un'ellisse?`, opzioni: [R`la differenza delle distanze dai due fuochi`, R`la somma delle distanze dai due fuochi`, R`il prodotto delle distanze dai due fuochi`, R`la distanza dal centro`], corretta: 1, spiegazione: R`È la definizione stessa di ellisse: $PF_1+PF_2=2a$. La differenza costante è invece la definizione dell'iperbole.` },
    { id: 'q-03', domanda: R`Quale grandezza è costante per tutti i punti di un'iperbole?`, opzioni: [R`la somma delle distanze dai due fuochi`, R`il prodotto delle distanze dai due fuochi`, R`la differenza delle distanze, in valore assoluto`, R`la distanza dal centro`], corretta: 2, spiegazione: R`$|PF_1-PF_2|=2a$. Il valore assoluto serve perché su un ramo la differenza è positiva, sull'altro negativa. La somma costante dà l'ellisse, la distanza costante dal centro la circonferenza. Il prodotto costante non dà nessuna conica.` },
    { id: 'q-04', domanda: R`Nell'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ con $a>b>0$, dove sono i fuochi?`, opzioni: [R`sull'asse $y$, in $\left(0;\pm\sqrt{a^2-b^2}\right)$`, R`sull'asse $x$, in $\left(\pm\sqrt{a^2+b^2};0\right)$`, R`sull'asse $x$, in $(\pm a;0)$`, R`sull'asse $x$, in $\left(\pm\sqrt{a^2-b^2};0\right)$`], corretta: 3, spiegazione: R`Con $a>b$ l'asse maggiore è l'asse $x$, e i fuochi stanno lì, con $c^2=a^2-b^2$. Sull'asse $y$ starebbero se fosse $b>a$. Con $a^2+b^2$ usi la formula dell'iperbole. $(\pm a;0)$ sono i vertici, non i fuochi.` },
    { id: 'q-05', domanda: R`Se nell'equazione $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ risulta $b>a$, i fuochi dell'ellisse si trovano…`, opzioni: [R`sull'asse $y$`, R`sull'asse $x$`, R`fuori dagli assi`, R`nel punto $(a;b)$`], corretta: 0, spiegazione: R`I fuochi stanno sempre sull'asse maggiore: se $b>a$, è l'asse $y$. Sull'asse $x$ starebbero con $a>b$. Fuori dagli assi non vanno mai, perché l'ellisse è simmetrica rispetto a entrambi. $(a;b)$ è un vertice del rettangolo dei semiassi, non un fuoco.` },
    { id: 'q-06', domanda: R`Che cosa succede alla forma dell'ellisse quando l'eccentricità $e$ tende a $0$?`, opzioni: [R`diventa una retta`, R`diventa una circonferenza`, R`degenera in un punto`, R`diventa una parabola`], corretta: 1, spiegazione: R`$e=0$ significa $c=0$: i fuochi coincidono nel centro e l'ellisse è una circonferenza di raggio $a$. Non si riduce a un punto, perché $a$ non cambia. Retta e parabola non c'entrano: l'ellisse si allunga verso un segmento quando $e$ tende a $1$.` },
    { id: 'q-07', domanda: R`Quali valori può assumere l'eccentricità di un'ellisse?`, opzioni: [R`$e>1$`, R`$e=1$ sempre`, R`$0 \le e < 1$`, R`$e$ può essere negativa`], corretta: 2, spiegazione: R`Nell'ellisse $c<a$, quindi $e=c/a<1$; e $c\ge0$, quindi $e\ge0$. $e>1$ vale per l'iperbole. $e=1$ vorrebbe dire $c=a$ e $b=0$: l'ellisse sarebbe schiacciata in un segmento. $e$ è un rapporto fra lunghezze, quindi non è mai negativa.` },
    { id: 'q-08', domanda: R`Nell'ellisse con fuochi sull'asse $x$ (con $a>b$), quale relazione lega $a$, $b$, $c$?`, opzioni: [R`$c^2=a^2+b^2$`, R`$c=a\cdot b$`, R`$c^2=b^2-a^2$`, R`$c^2=a^2-b^2$`], corretta: 3, spiegazione: R`Nel triangolo $OF_2B'$ l'ipotenusa è $a$ e i cateti sono $b$ e $c$: quindi $c^2=a^2-b^2$. $c^2=a^2+b^2$ è dell'iperbole. $c^2=b^2-a^2$ vale con i fuochi sull'asse $y$, cioè con $b>a$. $c=a\cdot b$ non viene da nessun conto.` },
    { id: 'q-09', domanda: R`In un'iperbole, quale relazione lega $a$, $b$, $c$?`, opzioni: [R`$c^2=a^2+b^2$`, R`$c^2=a^2-b^2$`, R`$c^2=b^2-a^2$`, R`$c=a+b$`], corretta: 0, spiegazione: R`A differenza dell'ellisse, nell'iperbole vale $c^2=a^2+b^2$: è per questo che $c>a$ sempre.` },
    { id: 'q-10', domanda: R`Perché l'eccentricità di un'iperbole è sempre maggiore di 1?`, opzioni: [R`perché $a$ è sempre maggiore di $b$`, R`perché $c>a$, essendo $c^2=a^2+b^2$`, R`perché $b$ è sempre maggiore di $a$`, R`perché i fuochi stanno fra i due vertici`], corretta: 1, spiegazione: R`$c^2=a^2+b^2>a^2$, quindi $c>a$ ed $e=c/a>1$. Non conta quale semiasse è maggiore: vale anche con $a=b$. E i fuochi stanno fuori dai vertici, non fra i due.` },
    { id: 'q-11', domanda: R`Quali sono gli asintoti dell'iperbole $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$?`, opzioni: [R`$y=\pm\dfrac{a}{b}x$`, R`$x=\pm a$`, R`$y=\pm\dfrac{b}{a}x$`, R`$y=\pm b$`], corretta: 2, spiegazione: R`Gli asintoti sono le diagonali del rettangolo largo $2a$ e alto $2b$: $y=\pm\frac bax$. Con $\frac ab$ hai scambiato i semiassi. $x=\pm a$ sono le tangenti nei vertici. $y=\pm b$ sono i lati orizzontali del rettangolo, non le diagonali.` },
    { id: 'q-12', domanda: R`L'equazione $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=-1$, rispetto a $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$, descrive un'iperbole…`, opzioni: [R`senza punti reali, perché a destra c'è un negativo`, R`con gli stessi asintoti e i fuochi sull'asse $x$`, R`con asintoti $y=\pm\frac abx$ e i fuochi sull'asse $y$`, R`con gli stessi asintoti e i fuochi sull'asse $y$`], corretta: 3, spiegazione: R`Il $-1$ a destra porta fuochi e vertici sull'asse $y$. Gli asintoti restano $y=\pm\frac bax$, perché dipendono solo da $a$ e $b$. I punti reali ci sono, per esempio i vertici $(0;\pm b)$: è l'ellisse con $-1$ a destra che non ne ha.` },
    { id: 'q-13', domanda: R`Che cos'è un'iperbole equilatera?`, opzioni: [R`un'iperbole con i semiassi uguali, $a=b$`, R`un'iperbole con eccentricità uguale a $1$`, R`un'iperbole con $c=a+b$`, R`un'iperbole con i fuochi sull'asse $y$`], corretta: 0, spiegazione: R`Equilatera vuol dire $a=b$: gli asintoti diventano $y=\pm x$, perpendicolari. Allora $c^2=2a^2$ ed $e=\sqrt2$, non $1$: nessuna iperbole ha $e=1$. Fra $a$, $b$, $c$ vale $c^2=a^2+b^2$, non $c=a+b$. E la posizione dei fuochi non c'entra.` },
    { id: 'q-14', domanda: R`L'iperbole equilatera, riferita ai propri asintoti, ha equazione…`, opzioni: [R`$x^2-y^2=k$`, R`$xy=k$`, R`$y=kx$`, R`$x^2+y^2=k$`], corretta: 1, spiegazione: R`Scegliendo gli asintoti come assi (rotazione di $45°$), l'equazione diventa $xy=k$. $x^2-y^2=k$ è la stessa iperbole, ma riferita agli assi di simmetria. $y=kx$ è una retta, $x^2+y^2=k$ una circonferenza.` },
    { id: 'q-15', domanda: R`Perché nella funzione omografica $y=\dfrac{ax+b}{cx+d}$ si richiede $c\ne0$ e $ad-bc\ne0$?`, opzioni: [R`con $c=0$ o con $ad=bc$ il grafico è una parabola`, R`con $c=0$ o con $ad=bc$ il denominatore è sempre zero`, R`con $c=0$ o con $ad=bc$ il grafico è una retta`, R`con $c=0$ o con $ad=bc$ l'iperbole non è equilatera`], corretta: 2, spiegazione: R`Con $c=0$ al denominatore resta un numero: la funzione è di primo grado, una retta. Con $ad=bc$ la frazione si riduce a una costante: una retta orizzontale senza un punto. Una parabola non compare mai, e il denominatore si annulla solo in $x=-\frac dc$. Quando c'è l'iperbole, è sempre equilatera.` },
    { id: 'q-16', domanda: R`Il grafico della funzione omografica $y=\dfrac{ax+b}{cx+d}$, con $c\ne0$ e $ad-bc\ne0$, è…`, opzioni: [R`un'iperbole equilatera con centro $(0;0)$`, R`un'iperbole equilatera con centro $\left(\dfrac{d}{c};\dfrac{a}{c}\right)$`, R`un'iperbole equilatera con centro $\left(-\dfrac{d}{c};\dfrac{b}{d}\right)$`, R`un'iperbole equilatera con centro $\left(-\dfrac{d}{c};\dfrac{a}{c}\right)$`], corretta: 3, spiegazione: R`Gli asintoti sono $x=-\frac dc$, dove si annulla il denominatore, e $y=\frac ac$. Il centro è il loro incrocio. Con $\frac dc$ hai perso il segno: $cx+d=0$ dà $x=-\frac dc$. $\frac bd$ è il valore in $x=0$, non l'asintoto. $(0;0)$ vale solo per $y=\frac kx$, senza traslazione.` },
    { id: 'q-17', domanda: R`Qual è il centro dell'ellisse $\dfrac{(x+2)^2}{16}+\dfrac{(y-5)^2}{4}=1$?`, opzioni: [R`$(2;-5)$`, R`$(-2;5)$`, R`$(-2;-5)$`, R`$(4;2)$`], corretta: 1, spiegazione: R`$(x+2)^2=(x-(-2))^2$, quindi $x_0=-2$; da $(y-5)^2$ viene $y_0=5$. Con $(2;-5)$ hai copiato i segni delle parentesi; $4$ e $2$ sono i semiassi.` },
    { id: 'q-18', domanda: R`Rispetto a $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$, l'iperbole $\dfrac{(x-x_0)^2}{a^2}-\dfrac{(y-y_0)^2}{b^2}=1$ ha…`, opzioni: [R`gli stessi asintoti, perché $a$ e $b$ non cambiano`, R`un'eccentricità diversa, perché cambia $c$`, R`i fuochi ancora in $(\pm c;0)$, sull'asse $x$`, R`la stessa eccentricità e asintoti paralleli`], corretta: 3, spiegazione: R`Spostare una curva non la deforma: $a$, $b$, $c$ ed $e$ restano gli stessi. Gli asintoti passano ora per il centro $(x_0;y_0)$: hanno le stesse pendenze $\pm\frac ba$, quindi sono paralleli a quelli di prima ma non uguali. Anche i fuochi si spostano, sulla retta $y=y_0$.` },
    { id: 'q-19', domanda: R`Per completare il quadrato scrivi $4(y^2-2y)$ come $4(y^2-2y+1)$. Che cosa devi aggiungere all'altro membro?`, opzioni: [R`$4$`, R`$1$`, R`$2$`, R`niente: dentro la parentesi hai aggiunto e tolto $1$`], corretta: 0, spiegazione: R`Dentro la parentesi aggiungi $1$, ma la parentesi è moltiplicata per $4$: il membro cresce di $4\cdot1=4$. Per tenere l'uguaglianza aggiungi $4$ anche all'altro membro. Con $1$ dimentichi il coefficiente raccolto.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di scrivere qualunque formula, chiediti se hai un'ellisse (somma delle distanze, segno $+$) o un'iperbole (differenza, segno $-$): le formule di $c^2$ sono opposte.` },
    { tipo: 'errore', testo: R`Nell'ellisse $c^2=a^2-b^2$, nell'iperbole $c^2=a^2+b^2$: è la trappola più comune di questo argomento, perché le due formule si assomigliano.` },
    { tipo: 'trucco', testo: R`I fuochi stanno sempre sull'asse del denominatore **maggiore** (ellisse) o sull'asse della variabile che ha il segno **positivo** (iperbole): guarda i numeri prima di disegnare.` },
    { tipo: 'errore', testo: R`Nell'ellisse l'eccentricità si calcola dividendo per il semiasse maggiore, quello dei fuochi, non per quello che compare per primo. Nell'iperbole dividi per il semiasse dei vertici: $a$ se a destra c'è $1$, anche quando $b>a$.` },
    { tipo: 'metodo', testo: R`Per determinare l'equazione da un fuoco e un punto (o un vertice), scrivi tutto in funzione di $a$, $b$, $c$ e usa $c^2=a^2\mp b^2$ solo alla fine.` },
    { tipo: 'trucco', testo: R`Nella funzione omografica, il denominatore uguagliato a zero dà subito l'asintoto verticale, senza bisogno di ricordare la formula $-d/c$.` },
    { tipo: 'errore', testo: R`Lo sdoppiamento per la tangente funziona solo se il punto è già sulla curva: verificalo sempre prima di applicarlo.` },
    { tipo: 'errore', testo: R`In $\frac{(x+3)^2}{4}+\frac{(y-1)^2}{9}=1$ il centro è $(-3;1)$: il segno nella parentesi è l'opposto della coordinata.` },
    { tipo: 'trucco', testo: R`Un'iperbole equilatera $x^2-y^2=a^2$, ruotata di $45°$, prende la forma $xy=k$: la forma della curva non cambia, quindi anche $xy=k$ ha eccentricità $\sqrt2$.` }
  ],

  aneddoti: [
    { matematico: 'Apollonio di Perga', anni: 'circa 262–190 a.C.', titolo: 'I nomi ellisse, parabola, iperbole', testo: R`Apollonio di Perga era detto «il Grande Geometra». Nel III secolo a.C. scrisse le *Coniche*, un trattato in otto libri. Per quasi duemila anni fu il testo di riferimento sull'argomento. Fu lui a dare alle curve i nomi che usiamo ancora oggi. Li prese da un problema che i greci conoscevano bene: «applicare» un'area a un segmento dato. L'area poteva coincidere con il segmento, restare più corta o superarlo. In greco i tre casi si chiamavano parabolé, l'uguaglianza, élleipsis, il difetto, e hyperbolé, l'eccesso. Apollonio vide che la stessa distinzione separava le tre curve non circolari che si ottengono tagliando un cono. Così le chiamò parabola, ellisse e iperbole.`, legame: R`Qui studi le due curve che prendono il nome dal «difetto» (ellisse) e dall'«eccesso» (iperbole).` },
    { matematico: 'Johannes Kepler', anni: '1571–1630', titolo: 'Le orbite dei pianeti sono ellissi', testo: R`Per quasi duemila anni gli astronomi descrissero le orbite dei pianeti con cerchi, anche combinati fra loro. Il cerchio era la forma «perfetta», l'unica degna dei cieli. Keplero studiò per anni le osservazioni di Marte raccolte da Tycho Brahe, di cui era assistente. Con un'orbita circolare restava uno scarto di appena otto primi d'arco. Era una differenza piccolissima, ma Keplero si fidava della precisione di Tycho e non la ignorò. Inseguendo quello scarto arrivò nel 1609 alla sua prima legge. I pianeti si muovono su ellissi, con il Sole in uno dei due fuochi e non al centro. Fu una delle rotture più nette con duemila anni di astronomia.`, legame: R`È l'applicazione più famosa dell'ellisse: il Sole occupa uno dei due fuochi, non il centro della curva.` },
    { matematico: 'Germinal Pierre Dandelin', anni: '1794–1847', titolo: 'Le sfere che spiegano i fuochi', testo: R`Perché tagliando un cono si ottiene proprio una curva con la proprietà dei fuochi? Nel 1822 l'ingegnere e matematico franco-belga Germinal Pierre Dandelin trovò una dimostrazione elegante. Si mettono nel cono due sfere, una sopra e una sotto il piano di sezione. Ognuna tocca il cono lungo una circonferenza e il piano in un punto solo. Quei due punti sono proprio i fuochi della conica. La somma costante delle distanze, o la differenza, si ricava seguendo le generatrici del cono. Non serve scrivere una sola equazione. Per la parabola basta una sfera sola, e al posto del secondo fuoco compare la direttrice.`, legame: R`Le sfere di Dandelin legano la definizione con il cono a quella con i fuochi, usata in tutto l'argomento.` },
    { matematico: 'Edmond Halley', anni: '1656–1742', titolo: 'La cometa che tornò come previsto', testo: R`Halley non scoprì la cometa che porta il suo nome. La usò per mostrare che le leggi di Newton funzionavano davvero. Studiò con la meccanica di Newton le comete osservate nel 1531, nel 1607 e nel 1682. Si accorse che orbite e intervalli erano quelli di un solo oggetto, non di tre comete diverse. L'oggetto tornava periodicamente su un'ellisse molto allungata. Nel 1705 ne previde il ritorno per il 1758, tenendo conto anche dell'attrazione di Giove. Halley morì nel 1742, sedici anni prima della verifica. La cometa tornò puntuale alla fine del 1758, e da allora porta il suo nome.`, legame: R`È la prima previsione confermata di un ritorno su un'orbita ellittica molto eccentrica.` },
    { matematico: 'Ipazia di Alessandria', anni: 'circa 360–415', titolo: 'La matematica che insegnava le coniche', testo: R`Ipazia visse ad Alessandria d'Egitto. Era figlia del matematico Teone, che curò un'edizione degli *Elementi* di Euclide. Insegnò matematica, astronomia e filosofia, e i suoi allievi venivano da lontano. Le fonti antiche le attribuiscono commenti ai grandi testi dei greci. Fra questi c'erano l'*Aritmetica* di Diofanto e le *Coniche* di Apollonio, dove le tre curve hanno ricevuto il loro nome. Di questi commenti non ci è arrivato niente che si possa attribuire a lei con sicurezza. Nel 415 fu uccisa da una folla di cristiani, in un periodo di scontri violenti in città. È la prima donna matematica di cui sappiamo qualcosa di certo.`, legame: R`Ipazia studiava e spiegava le *Coniche* di Apollonio, da cui viene quello che si dice qui su ellisse e iperbole.` }
  ]
});
})();
