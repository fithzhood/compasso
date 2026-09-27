(function () {
const R = String.raw;
/* tangenti da P(px; py) a x² + y² = 25, scritte come espressioni per il grafico «tangentiEsterno».
   s = OP² − r²: s > 0 fuori (due tangenti), s = 0 sulla circonferenza (una), s < 0 dentro (nessuna).
   h vale 1 se s > 0 e 0 altrimenti; z vale 1 solo se s = 0: così i segmenti che non esistono si riducono a un punto. */
const TE = (function () {
  const s = '(px^2 + py^2 - 25)', D = '(px^2 + py^2 + 0.000001)';
  const sp = 'sqrt((' + s + ' + abs(' + s + '))/2)';
  const h = '((' + s + ' + abs(' + s + '))/(2*abs(' + s + ') + 0.000000001))';
  const z = '(1 - abs(' + s + ')/(abs(' + s + ') + 0.000000001))';
  const tx = (g, rad) => '(25*px - (' + g + ')*5*py*' + rad + ')/' + D;
  const ty = (g, rad) => '(25*py + (' + g + ')*5*px*' + rad + ')/' + D;
  return {
    t: (g, asse) => asse === 'x' ? tx(g, 'sqrt(' + s + ')') : ty(g, 'sqrt(' + s + ')'),
    a: (g, k, asse) => asse === 'x' ? 'px + (' + k + ')*' + h + '*(' + tx(g, sp) + ' - px)' : 'py + (' + k + ')*' + h + '*(' + ty(g, sp) + ' - py)',
    sulla: (g, asse) => asse === 'x' ? 'px - (' + g + ')*6*' + z + '*py/(sqrt(' + D + '))' : 'py + (' + g + ')*6*' + z + '*px/(sqrt(' + D + '))'
  };
})();
/* allenamento: coppie (x; y) in ordine, numeri, sì/no, posizione di una retta, equazioni di circonferenze */
const cop = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. 2; -1' });
const num = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'es. 6 o √5' });
const SI = { tipo: 'testo', accettate: ['sì', 'si', 'sì, ci sta', 'si, ci sta', 'ci sta', 'appartiene', 'sì, appartiene', 'sì appartiene', 'sta sulla circonferenza'], segnaposto: 'sì o no', simboli: [] };
const NO = { tipo: 'testo', accettate: ['no', 'no, non ci sta', 'non ci sta', 'non appartiene', 'no, non appartiene', 'no non appartiene', 'no, è fuori', 'no, è esterno', 'no, sta fuori'], segnaposto: 'sì o no', simboli: [] };
const pos = p => ({ tipo: 'testo', accettate: [p, 'è ' + p, 'la retta è ' + p, 'retta ' + p], segnaposto: 'secante, tangente o esterna', simboli: [] });
/* la circonferenza di centro (p; q) con r² = r2: forma canonica (anche con i due quadrati scambiati e con r² scritto
   come potenza) e forma generale (con il termine noto a sinistra o a destra, e con i termini in x vicini).
   Con solo = 'generale' accetta solo la forma generale. La casella toglie gli spazi e legge ² come ^2. */
function circ(p, q, r2, solo) {
  const quad = (v, k) => k === 0 ? v + '^2' : '(' + v + (k > 0 ? '-' + k : '+' + (-k)) + ')^2';
  const lin = (k, v) => k === 0 ? '' : (k > 0 ? '+' : '-') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + v;
  const cost = k => k === 0 ? '' : (k > 0 ? '+' : '-') + Math.abs(k);
  const acc = [];
  if (solo !== 'generale') {
    const r = Math.sqrt(r2), destre = [String(r2)].concat(Number.isInteger(r) ? [r + '^2'] : []);
    destre.forEach(d => { acc.push(quad('x', p) + '+' + quad('y', q) + '=' + d); acc.push(quad('y', q) + '+' + quad('x', p) + '=' + d); });
  }
  const a = -2 * p, b = -2 * q, c = p * p + q * q - r2;
  acc.push('x^2+y^2' + lin(a, 'x') + lin(b, 'y') + cost(c) + '=0');
  acc.push('x^2+y^2' + lin(a, 'x') + lin(b, 'y') + '=' + (-c));
  acc.push('x^2' + lin(a, 'x') + '+y^2' + lin(b, 'y') + cost(c) + '=0');
  return { tipo: 'testo', accettate: Array.from(new Set(acc)), segnaposto: solo === 'generale' ? 'es. x² + y² + 6x − 2y + 1 = 0' : 'es. (x − 1)² + (y + 2)² = 9', simboli: ['x²', 'y²', '(', ')', '+', '−', '='] };
}
COMPASSO.registra({
  id: 'circonferenza',
  titolo: 'La circonferenza',

  introduzione: R`Punta l'ago del compasso sul foglio e fai girare la matita. La curva che ottieni è una **circonferenza**. Ogni suo punto sta alla stessa distanza dall'ago.

Nel piano cartesiano questa idea diventa un'equazione con $x^2$ e $y^2$. Con l'equazione capisci se una retta taglia la circonferenza, la sfiora o le passa lontano. E trovi la circonferenza che passa per tre punti dati.

Ti servono la distanza fra due punti e quella di un punto da una retta. Servono anche l'equazione della retta e il $\Delta$.`,

  inBreve: [
    R`La circonferenza è fatta dei punti che distano $r$ dal centro $C(\alpha;\beta)$. La sua equazione è $(x-\alpha)^2+(y-\beta)^2=r^2$.`,
    R`Da $x^2+y^2+ax+by+c=0$ leggi il centro $\left(-\frac a2;-\frac b2\right)$ e il raggio $\sqrt{\frac{a^2}{4}+\frac{b^2}{4}-c}$. Se sotto la radice non c'è un numero positivo, la circonferenza non esiste.`,
    R`Prima di leggere centro e raggio, $x^2$ e $y^2$ devono avere coefficiente $1$. Se non ce l'hanno, dividi tutta l'equazione.`,
    R`Per una retta, confronta la distanza $d$ del centro con il raggio: $d<r$ secante, $d=r$ tangente, $d>r$ esterna.`,
    R`La tangente in un punto della circonferenza è perpendicolare al raggio. Da un punto esterno partono due tangenti.`,
    R`Se sottrai le equazioni di due circonferenze, spariscono $x^2$ e $y^2$. Resta una retta: l'asse radicale.`
  ],

  sezioni: [
    { id: 'definizione-luogo', titolo: 'La circonferenza come luogo geometrico', testo: R`Prendi il centro $C(1;2)$ e il raggio $3$. Il punto $P(4;2)$ sta $3$ quadretti a destra di $C$, quindi dista $3$ da $C$ e sta sulla circonferenza.

>* La **circonferenza** di centro $C$ e raggio $r>0$ è l'insieme dei punti $P$ che distano esattamente $r$ da $C$: $\overline{CP}=r$.

Una definizione così si chiama **luogo geometrico**. Si traduce subito in un calcolo con la formula della distanza.

Altri punti, con lo stesso centro e raggio:

- $Q(1;5)$ ci sta: è $3$ quadretti sopra $C$.
- $S(2;2)$ no: dista $1$ da $C$, quindi è dentro.
- $T(3;4)$ sembra sul bordo. Ma $\overline{CT}=\sqrt{2^2+2^2}=\sqrt8\approx2{,}83$: è dentro.

?? Il punto $P(4;6)$ sta sulla circonferenza di centro $C(1;2)$ e raggio $5$?
[x] sì: $\overline{CP}=\sqrt{3^2+4^2}=5$
[ ] no: $4+6$ non fa $5$
[ ] no: non è sulla riga né sulla colonna di $C$
=> Sì. Gli scarti da $C$ sono $3$ e $4$, e $\sqrt{9+16}=5$ è proprio il raggio. Conta solo la distanza dal centro, anche in diagonale.

>! **Circonferenza** e **cerchio** sono cose diverse. La circonferenza è solo la linea: i punti a distanza *esattamente* $r$. Il cerchio comprende anche la parte interna.` },

    { id: 'equazione-canonica', titolo: 'L’equazione canonica', testo: R`Prendi un punto $P(x;y)$ e chiedi che stia sulla circonferenza di centro $C(\alpha;\beta)$ e raggio $r$. Basta scrivere la definizione con la formula della distanza:

~ \overline{CP}=r :: la definizione: $P$ dista $r$ dal centro
~ \evid{\sqrt{(x-\alpha)^2+(y-\beta)^2}}=r :: scrivo la distanza fra $P(x;y)$ e $C(\alpha;\beta)$
~ (x-\alpha)^2+(y-\beta)^2=\evidb{r^2} :: elevo al quadrato: i due membri non sono negativi, quindi le soluzioni non cambiano

>* **Equazione canonica** (o *centro-raggio*): $$(x-\alpha)^2+(y-\beta)^2=r^2$$ Centro $C(\alpha;\beta)$, raggio $r$. Un punto sta sulla circonferenza quando le sue coordinate rendono vera l'uguaglianza.

Esempio: centro $C(3;-1)$ e raggio $4$ danno $(x-3)^2+(y+1)^2=16$.

Occhio ai segni. Nella formula c'è $x-\alpha$: con $\alpha=-2$ viene $x-(-2)=x+2$. Nel grafico trascina $C$ dove le coordinate sono negative, e $P$ per cambiare il raggio.

[[grafico:canonica]]

?? Qual è l'equazione della circonferenza di centro $C(-2;5)$ e raggio $3$?
[ ] $(x-2)^2+(y+5)^2=9$
[x] $(x+2)^2+(y-5)^2=9$
[ ] $(x+2)^2+(y-5)^2=3$
[ ] $(x-2)^2+(y-5)^2=9$
=> Con $\alpha=-2$ viene $x+2$, con $\beta=5$ viene $y-5$. Nelle parentesi i segni sono opposti a quelli del centro. A destra va $r^2=9$, non $3$.

>! A destra dell'uguale c'è il raggio **al quadrato**. In $(x-1)^2+(y-2)^2=9$ il raggio è $3$, non $9$.` },

    { id: 'equazione-generale', titolo: 'La forma generale e la condizione di esistenza', testo: R`Sviluppa i quadrati della forma canonica: ottieni un'equazione senza parentesi. Con centro $C(1;2)$ e raggio $3$:

~ (x-1)^2+(y-2)^2=9 :: forma canonica
~ \evid{x^2-2x+1}+\evid{y^2-4y+4}=9 :: sviluppo i due quadrati di binomio
~ x^2+y^2-2x-4y\evidb{-4}=0 :: porto il $9$ a sinistra e sommo i numeri: $1+4-9=-4$

Il risultato ha sempre questa forma.

>* **Forma generale:** $$x^2+y^2+ax+by+c=0$$ $x^2$ e $y^2$ hanno **lo stesso coefficiente** e non c'è il termine $xy$. Centro e raggio: $$C\left(-\frac{a}{2};-\frac{b}{2}\right)$$ $$r=\sqrt{\frac{a^2}{4}+\frac{b^2}{4}-c}$$

Da dove viene il centro? Sviluppando $(x-\alpha)^2$ compare $-2\alpha x$, quindi $a=-2\alpha$ e $\alpha=-\frac a2$. Allo stesso modo $\beta=-\frac b2$.

Se non ricordi le formule, **completa i quadrati**. Aggiungi ai due membri il numero che manca per avere un quadrato di binomio.

~ x^2+y^2-2x-4y-4=0 :: forma generale
~ (x^2-2x)+(y^2-4y)=4 :: metto vicini i termini in $x$ e quelli in $y$, porto il numero a destra
~ (x^2-2x\evid{+1})+(y^2-4y\evid{+4})=4\evid{+1+4} :: aggiungo il quadrato della metà di $-2$ e della metà di $-4$, a sinistra e a destra
~ (x-1)^2+(y-2)^2=\evidb{9} :: centro $(1;2)$, raggio $\sqrt9=3$

### La condizione di esistenza

Prova con $x^2+y^2-2x-4y+10=0$. Completando i quadrati viene $(x-1)^2+(y-2)^2=-5$. Ma una somma di quadrati non è mai negativa, quindi nessun punto va bene.

>* **Condizione di esistenza:** $$\frac{a^2}{4}+\frac{b^2}{4}-c>0$$ È il numero sotto la radice, cioè $r^2$. Se vale $0$ resta solo il centro, se è negativo non resta nessun punto.

Nel grafico aumenta $c$ e guarda $r^2$ in alto: a zero la circonferenza si stringe nel centro, poi sparisce.

[[grafico:coefficienti]]

?? Quale di queste equazioni può rappresentare una circonferenza?
[ ] $x^2+2y^2-4=0$
[ ] $x^2+y^2+xy-1=0$
[x] $3x^2+3y^2-6x-9=0$
[ ] $x^2-y^2+2x=0$
=> $3x^2+3y^2-6x-9=0$, divisa per $3$, diventa $x^2+y^2-2x-3=0$: centro $(1;0)$ e $r^2=1+3=4$. Le altre no: in $x^2+2y^2-4=0$ i coefficienti sono diversi, in $x^2+y^2+xy-1=0$ c'è il termine $xy$, in $x^2-y^2+2x=0$ i segni sono opposti.

>! Le formule valgono solo se $x^2$ e $y^2$ hanno coefficiente $1$. Con $2x^2+2y^2-4x+8y-10=0$ prima dividi per $2$: $x^2+y^2-2x+4y-5=0$, centro $(1;-2)$. Senza dividere troveresti il centro sbagliato $(2;-4)$.` },

    { id: 'casi-particolari', titolo: 'Casi particolari', testo: R`Quando alcuni coefficienti sono zero, capisci subito dove sta la circonferenza.

| se | l'equazione diventa | vuol dire che |
|---|---|---|
| $c=0$ | $x^2+y^2+ax+by=0$ | passa per l'origine |
| $b=0$ | $x^2+y^2+ax+c=0$ | il centro è sull'asse $x$ |
| $a=0$ | $x^2+y^2+by+c=0$ | il centro è sull'asse $y$ |
| $a=b=0$ | $x^2+y^2=r^2$ | il centro è l'origine |

Se sostituisci $O(0;0)$ nella forma generale resta solo $c$, quindi l'origine sta sulla circonferenza quando $c=0$. Il centro è $\left(-\frac a2;-\frac b2\right)$: con $b=0$ ha ordinata zero, con $a=0$ ha ascissa zero.

Esempio: $x^2+y^2+6x-8y=0$. Manca il termine noto, quindi passa per l'origine. Il centro è $(-3;4)$ e il raggio è $\sqrt{9+16}=5$.

>* Centro nell'origine e raggio $r$: $$x^2+y^2=r^2$$

?? Qual è il raggio della circonferenza $x^2+y^2=16$? E che cosa rappresenta $x^2+y^2=-16$?
=> Il raggio è $4$, perché a destra c'è $r^2$. La seconda non rappresenta niente: $x^2+y^2$ non è mai negativo.

>! Se manca un termine, la circonferenza c'è lo stesso. $x^2+y^2-6y=0$ ha $a=0$ e $c=0$: centro $(0;3)$, raggio $3$, e passa per l'origine.` },

    { id: 'retta-circonferenza', titolo: 'Posizione di una retta rispetto alla circonferenza', testo: R`Una retta e una circonferenza possono avere due punti in comune, uno o nessuno. La retta si dice **secante**, **tangente** o **esterna**.

### Con la distanza

Calcola la distanza $d$ del centro dalla retta e confrontala con il raggio $r$. Se la retta passa vicino al centro taglia la circonferenza, se passa lontano non la tocca.

| distanza | punti comuni | la retta è |
|---|---|---|
| $d<r$ | 2 | secante |
| $d=r$ | 1 | tangente |
| $d>r$ | 0 | esterna |

Trascina $Q$ e guarda $d$: i due punti comuni si fondono quando $d=5$, poi spariscono.

[[grafico:rettaCirconferenza]]

### Con il $\Delta$

Se sostituisci la retta nella circonferenza resta un'equazione di secondo grado. Quante soluzioni ha, tanti sono i punti comuni.

>* $\Delta>0$: secante (due punti). $\Delta=0$: tangente (un punto). $\Delta<0$: esterna (nessun punto).

Esempio: la retta $y=2x-5$ e la circonferenza $x^2+y^2=5$.

~ x^2+y^2=5 :: la circonferenza: centro $O$, raggio $\sqrt5$
~ x^2+(\evid{2x-5})^2=5 :: al posto di $y$ scrivo quello che vale secondo la retta
~ x^2+\evid{4x^2-20x+25}=5 :: sviluppo il quadrato del binomio
~ 5x^2-20x+20=0 :: porto tutto a sinistra e sommo i termini simili
~ x^2-4x+4=0 :: divido per $5$ per lavorare con numeri più piccoli
~ \Delta=16-16=\evidb{0} :: una sola soluzione: la retta è tangente

Con la distanza il verdetto è lo stesso, perché la retta $2x-y-5=0$ dista da $O$ $\;d=\frac{|-5|}{\sqrt{4+1}}=\sqrt5$, uguale al raggio.

?? Retta $y=x+1$ e circonferenza $x^2+y^2=1$: sostituendo si ottiene $2x^2+2x=0$. Com'è la retta?
[x] secante: punti comuni $(0;1)$ e $(-1;0)$
[ ] tangente: si vede subito la soluzione $x=0$
[ ] esterna: senza termine noto il $\Delta$ non si calcola
=> Raccogliendo viene $2x(x+1)=0$, con due soluzioni: $x=0$ e $x=-1$. Anche senza termine noto $\Delta=4-0=4>0$.

>! La distanza è più rapida, ma dice solo *quanti* sono i punti comuni. Per sapere *quali* sono, devi sostituire.` },

    { id: 'rette-tangenti', titolo: 'Le rette tangenti', testo: R`Il metodo cambia se il punto sta sulla circonferenza oppure fuori.

### Tangente in un punto della circonferenza

La tangente in $P_0$ è **perpendicolare al raggio** $CP_0$. Esempio con $x^2+y^2=25$ e $P_0(3;4)$:

~ m_{OP_0}=\frac{4-0}{3-0}=\frac43 :: pendenza del raggio da $O(0;0)$ a $P_0(3;4)$
~ m_t=\evid{-\frac34} :: la tangente è perpendicolare al raggio: antireciproco
~ y-4=-\frac34(x-3) :: retta per $P_0$ con quella pendenza
~ \evidb{3x+4y-25=0} :: moltiplico per $4$ e porto tutto a sinistra

La scorciatoia è la **formula di sdoppiamento**: sostituisci $x^2$ con $x_0x$, $y^2$ con $y_0y$, $x$ con $\frac{x+x_0}{2}$ e $y$ con $\frac{y+y_0}{2}$.

>* Tangente in $P_0(x_0;y_0)$ alla circonferenza $x^2+y^2+ax+by+c=0$: $$x_0x+y_0y+a\,\frac{x+x_0}{2}\;+$$ $$+\;b\,\frac{y+y_0}{2}+c=0$$ Vale solo se $P_0$ sta sulla circonferenza: controllalo prima.

Con $x^2+y^2=25$ e $P_0(3;4)$ dà subito $3x+4y-25=0$.

### Tangenti da un punto esterno

Da un punto esterno $P_1$ partono due tangenti. Per trovarle scrivi tutte le rette per $P_1$, cioè il **fascio** $y-y_1=m(x-x_1)$. Poi cerca le $m$ per cui la retta dista dal centro quanto il raggio. Esempio: tangenti a $x^2+y^2=25$ da $P_1(13;0)$.

~ mx-y-13m=0 :: il fascio per $P_1$ è $y=m(x-13)$; lo scrivo in forma implicita per poter usare la distanza
~ \frac{|\evid{-13m}|}{\sqrt{m^2+1}}=5 :: distanza di $O(0;0)$ dalla retta, uguale al raggio
~ 169m^2=\evid{25(m^2+1)} :: elevo al quadrato (i due membri sono positivi) e moltiplico per il denominatore
~ 144m^2=25 :: porto i termini con $m^2$ a sinistra
~ m=\evidb{\pm\frac{5}{12}} :: due valori di $m$, due tangenti: $5x-12y-65=0$ e $5x+12y-65=0$

Nel grafico trascina $P$. Fuori dalla circonferenza le tangenti sono due, sopra ne resta una, dentro nessuna. Poi porta $P$ in $(5;7)$: una tangente diventa verticale.

[[grafico:tangentiEsterno]]

?? Cerchi le tangenti a $x^2+y^2=25$ da $P(5;7)$ con il fascio $y-7=m(x-5)$. Trovi un solo valore di $m$. Perché?
[x] l'altra tangente è la verticale $x=5$
[ ] $P$ sta sulla circonferenza
[ ] c'è un errore di calcolo
=> Manca la verticale. $P$ è esterno, perché dista da $O$ $\sqrt{74}>5$, quindi le tangenti sono due. L'equazione in $m$ qui dà solo $m=\frac{12}{35}$. L'altra tangente è $x=5$, che nel fascio non c'è.

>! Il fascio $y-y_1=m(x-x_1)$ contiene tutte le rette per $P_1$, tranne quella verticale. Se trovi un solo valore di $m$, controlla la retta $x=x_1$.` },

    { id: 'due-circonferenze', titolo: 'Due circonferenze: posizione reciproca e asse radicale', testo: R`Fai scivolare due monete una verso l'altra: prima sono staccate, poi si toccano, poi si sovrappongono. Con due circonferenze di raggi $r_1\ge r_2$ decide la distanza $d$ fra i centri.

| distanza fra i centri | posizione | punti comuni |
|---|---|---|
| $d>r_1+r_2$ | esterne | 0 |
| $d=r_1+r_2$ | tangenti esternamente | 1 |
| $r_1-r_2<d<r_1+r_2$ | secanti | 2 |
| $d=r_1-r_2$ | tangenti internamente | 1 |
| $d<r_1-r_2$ | una dentro l'altra | 0 |

Se $d=0$ i centri coincidono: le circonferenze sono **concentriche**.

### L'asse radicale

Scrivi le due circonferenze in forma generale e **sottrai** le equazioni. $x^2$ e $y^2$ spariscono, perché in tutte e due hanno coefficiente $1$. Resta una retta: l'**asse radicale**.

~ \gamma_1:\ x^2+y^2-9=0 :: centro $O(0;0)$, raggio $3$
~ \gamma_2:\ x^2+y^2-8x+7=0 :: centro $(4;0)$, raggio $\sqrt{16-7}=3$
~ \gamma_1-\gamma_2:\ \evid{8x}-9\evid{-7}=0 :: $x^2$ e $y^2$ si cancellano; $-(-8x)$ diventa $+8x$ e $-(+7)$ diventa $-7$
~ \evidb{x=2} :: l'asse radicale

Un punto comune rende vere tutte e due le equazioni, quindi anche la loro differenza. Per questo l'asse radicale passa per i punti comuni.

>* **Asse radicale** di due circonferenze non concentriche: $$(a_1-a_2)x+(b_1-b_2)y\;+$$ $$+\;(c_1-c_2)=0$$ Se sono secanti, passa per i due punti comuni. Se sono tangenti, è la tangente comune. È sempre perpendicolare alla retta dei centri.

Trascina $C_2$: l'asse radicale resta perpendicolare alla retta dei centri.

[[grafico:assiRadicale]]

?? Qual è l'asse radicale di $x^2+y^2-4x=0$ e $x^2+y^2+2y-3=0$?
[x] $4x+2y-3=0$
[ ] $-4x+2y-3=0$
[ ] $4x+2y+3=0$
[ ] $2x^2+2y^2-4x+2y-3=0$
=> Sottrai la seconda dalla prima: $-4x-2y+3=0$, cioè $4x+2y-3=0$. Cambia segno a tutti i termini della seconda, anche al termine noto.

>! Se non sai quale raggio è più grande, nella tabella usa $|r_1-r_2|$ al posto di $r_1-r_2$.` },

    { id: 'determinare-equazione', titolo: 'Determinare l’equazione di una circonferenza', testo: R`Per scrivere l'equazione servono tre numeri: $\alpha$, $\beta$, $r$ nella forma canonica, oppure $a$, $b$, $c$ nella forma generale. I dati del problema servono a trovarli.

| dati | come si trova l'equazione |
|---|---|
| centro e un punto | $r$ = distanza fra centro e punto, poi forma canonica |
| centro e retta tangente | $r$ = distanza fra centro e retta, poi forma canonica |
| estremi di un diametro | centro = punto medio, $r$ = metà del diametro |
| tre punti | si sostituiscono nella forma generale: sistema in $a$, $b$, $c$ |

?? Una circonferenza ha centro $C(2;-1)$ ed è tangente alla retta $3x+4y+8=0$. Quanto vale il raggio?
[x] $2$
[ ] $\frac{10}{7}$
[ ] $10$
[ ] $\frac{18}{5}$
=> Il raggio è la distanza del centro dalla retta: $\frac{|3\cdot2+4\cdot(-1)+8|}{\sqrt{3^2+4^2}}=\frac{10}{5}=2$. Sotto la radice vanno i quadrati, non $3+4$. E $-1$ va messo con il suo segno.

Con tre punti, sostituisci le coordinate in $x^2+y^2+ax+by+c=0$. Ottieni equazioni di **primo grado** in $a$, $b$, $c$. Esempio con $A(-1;0)$, $B(3;0)$, $C(0;3)$:

~ \begin{cases} 1-a+c=0 \\ 9+3a+c=0 \\ 9+3b+c=0 \end{cases} :: sostituisco $A$, $B$ e $C$ nella forma generale
~ c=\evid{a-1} :: ricavo $c$ dalla prima equazione
~ 9+3a+\evid{a-1}=0\ \Rightarrow\ a=-2 :: lo sostituisco nella seconda: $4a+8=0$
~ c=\evid{-3} :: da $c=a-1$ con $a=-2$
~ 9+3b\evid{-3}=0\ \Rightarrow\ b=-2 :: sostituisco $c$ nella terza: $3b+6=0$
~ \evidb{x^2+y^2-2x-2y-3=0} :: centro $(1;1)$, raggio $\sqrt{1+1+3}=\sqrt5$

>* Scegli la forma che rende i conti più semplici: la canonica se conosci il centro, la generale se hai dei punti.

>! Per tre punti allineati non passa nessuna circonferenza. Se il sistema non ha soluzione, controlla se i punti sono allineati.` },

    { id: 'fasci-e-problemi', titolo: 'Fasci di circonferenze e problemi', testo: R`### Fasci di circonferenze (cenni)

Due circonferenze $\gamma_1$ e $\gamma_2$ si tagliano nei punti $A$ e $B$. Per $A$ e $B$ passano infinite altre circonferenze.

>* Il **fascio di circonferenze** generato da $\gamma_1$ e $\gamma_2$ è $$\gamma_1+k\,\gamma_2=0\qquad k\in\mathbb{R}$$ Per ogni $k$ ottieni una curva che passa per i punti comuni a $\gamma_1$ e $\gamma_2$.

In $A$ le due equazioni valgono zero, quindi vale zero anche $\gamma_1+k\,\gamma_2$. Per $k=-1$ i termini $x^2+y^2$ si cancellano: resta l'**asse radicale**.

### Problemi

Traduci i dati in equazioni e risolvi. Poi controlla il risultato: un raggio deve essere positivo.

Esempio: tre sensori stanno in $A(0;0)$, $B(6;0)$ e $C(0;8)$. Il ripetitore va nel centro della circonferenza per $A$, $B$, $C$: così è alla stessa distanza da tutti e tre.

1. La circonferenza passa per l'origine, quindi $c=0$.
2. Sostituisci $B$: $36+6a=0$, quindi $a=-6$.
3. Sostituisci $C$: $64+8b=0$, quindi $b=-8$.
4. L'equazione è $x^2+y^2-6x-8y=0$. Il ripetitore va in $(3;4)$, a distanza $5$ da ogni sensore.

>! Un'equazione di secondo grado in un parametro può dare due soluzioni. Scarta quelle che danno un raggio nullo o negativo, o che vanno contro un dato del problema.` }
  ],

  grafici: {
    canonica: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8], proporzioni: 'uguali',
      parametri: [
        { nome: 'cx', min: -5, max: 5, passo: 1, valore: 1, nascosto: true },
        { nome: 'cy', min: -5, max: 5, passo: 1, valore: 2, nascosto: true },
        { nome: 'px', min: -7, max: 7, passo: 1, valore: 4, nascosto: true },
        { nome: 'py', min: -7, max: 7, passo: 1, valore: 2, nascosto: true }
      ],
      elementi: [
        { tipo: 'cerchio', centro: ['cx', 'cy'], raggio: 'sqrt((px-cx)^2 + (py-cy)^2)' },
        { tipo: 'segmento', da: ['cx', 'cy'], a: ['px', 'py'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['cx', 'cy'], trascina: true, etichetta: 'C({{cx}}; {{cy}})', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['px', 'py'], trascina: true, etichetta: 'P', posizione: 'alto-destra', colore: 3 },
        { tipo: 'testo', p: [-7.6, -6.3], testo: '(x − ({{cx}}))² + (y − ({{cy}}))² = {{(px-cx)^2 + (py-cy)^2}}', ancora: 'start' },
        { tipo: 'testo', p: [-7.6, -7.4], testo: 'raggio = CP = {{sqrt((px-cx)^2 + (py-cy)^2)}}', ancora: 'start' }
      ],
      didascalia: R`Trascina C in un punto con coordinate negative: nell'equazione compare x − (−2), cioè x + 2. Trascina P per cambiare il raggio: a destra c'è il suo quadrato.`
    },
    coefficienti: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8], proporzioni: 'uguali',
      elementi: [
        { tipo: 'cerchio', centro: ['-a/2', '-b/2'], raggio: 'sqrt(a^2/4 + b^2/4 - c)', etichetta: 'γ' },
        { tipo: 'punto', p: ['-a/2', '-b/2'], etichetta: 'C', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-7.6, 7.2], testo: 'centro ({{-a/2}}; {{-b/2}})', ancora: 'start' },
        { tipo: 'testo', p: [-7.6, 6.2], testo: 'r² = {{a^2/4 + b^2/4 - c}}', ancora: 'start' }
      ],
      parametri: [
        { nome: 'a', min: -6, max: 6, passo: 0.1, valore: -2, etichetta: 'a' },
        { nome: 'b', min: -6, max: 6, passo: 0.1, valore: -4, etichetta: 'b' },
        { nome: 'c', min: -8, max: 8, passo: 0.1, valore: -4, etichetta: 'c' }
      ],
      didascalia: R`Aumenta c piano piano: r² cala, la circonferenza si stringe attorno al centro e quando r² passa sotto zero sparisce. Con a e b sposti il centro.`
    },
    rettaCirconferenza: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8], proporzioni: 'uguali',
      parametri: [{ nome: 'q', min: -8, max: 8, passo: 0.25, valore: 2, nascosto: true }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 5 },
        { tipo: 'retta', m: 0.75, q: 'q', colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: ['-0.48*q', '0.64*q'], tratteggio: true, colore: 4, etichetta: 'd' },
        { tipo: 'punto', p: ['(-1.5*q - sqrt(156.25 - 4*q^2))/3.125', '0.75*(-1.5*q - sqrt(156.25 - 4*q^2))/3.125 + q'], colore: 3 },
        { tipo: 'punto', p: ['(-1.5*q + sqrt(156.25 - 4*q^2))/3.125', '0.75*(-1.5*q + sqrt(156.25 - 4*q^2))/3.125 + q'], colore: 3 },
        { tipo: 'punto', p: [0, 'q'], trascina: true, etichetta: 'Q', posizione: 'sinistra', colore: 2 },
        { tipo: 'testo', p: [-7.6, 7.1], testo: 'd = {{abs(4*q)/5}}  ·  r = 5', ancora: 'start' }
      ],
      didascalia: R`Trascina Q su e giù: finché d < 5 la retta taglia la circonferenza in due punti, con d = 5 (Q a 6,25) la sfiora in uno, con d > 5 non la tocca.`
    },
    tangentiEsterno: {
      tipo: 'piano', x: [-10, 10], y: [-10, 10], proporzioni: 'uguali',
      parametri: [
        { nome: 'px', min: -9, max: 9, passo: 0.5, valore: 8, nascosto: true },
        { nome: 'py', min: -9, max: 9, passo: 0.5, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 5 },
        { tipo: 'segmento', da: [TE.a(-1, -0.4, 'x'), TE.a(-1, -0.4, 'y')], a: [TE.a(-1, 2.5, 'x'), TE.a(-1, 2.5, 'y')], colore: 2 },
        { tipo: 'segmento', da: [TE.a(1, -0.4, 'x'), TE.a(1, -0.4, 'y')], a: [TE.a(1, 2.5, 'x'), TE.a(1, 2.5, 'y')], colore: 2 },
        { tipo: 'segmento', da: [TE.sulla(-1, 'x'), TE.sulla(-1, 'y')], a: [TE.sulla(1, 'x'), TE.sulla(1, 'y')], colore: 2 },
        { tipo: 'punto', p: [TE.t(-1, 'x'), TE.t(-1, 'y')], etichetta: 'T₁', posizione: 'alto-sinistra', colore: 3 },
        { tipo: 'punto', p: [TE.t(1, 'x'), TE.t(1, 'y')], etichetta: 'T₂', posizione: 'basso-destra', colore: 3 },
        { tipo: 'punto', p: ['px', 'py'], trascina: true, etichetta: 'P({{px}}; {{py}})', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-9.6, 9.1], testo: 'OP = {{sqrt(px^2 + py^2)}}  ·  r = 5', ancora: 'start' }
      ],
      didascalia: R`Trascina P: fuori dalla circonferenza le tangenti sono due, sulla circonferenza una, dentro nessuna. Con P in (5; 7) una tangente diventa verticale.`
    },
    assiRadicale: {
      tipo: 'piano', x: [-4, 11], y: [-6, 6], proporzioni: 'uguali',
      parametri: [{ nome: 'd', min: 0.5, max: 8, passo: 0.5, valore: 4, nascosto: true }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, etichetta: 'γ₁' },
        { tipo: 'cerchio', centro: ['d', 0], raggio: 2, etichetta: 'γ₂', colore: 2 },
        { tipo: 'verticale', x: '(d^2 + 5)/(2*d)', tratteggio: true, colore: 4, etichetta: 'asse radicale' },
        { tipo: 'punto', p: ['(d^2 + 5)/(2*d)', 'sqrt(9 - ((d^2 + 5)/(2*d))^2)'], colore: 3 },
        { tipo: 'punto', p: ['(d^2 + 5)/(2*d)', '-sqrt(9 - ((d^2 + 5)/(2*d))^2)'], colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'C₁', posizione: 'basso-sinistra' },
        { tipo: 'punto', p: ['d', 0], trascina: true, etichetta: 'C₂', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-3.7, -4.1], testo: 'r₁ = 3', ancora: 'start' },
        { tipo: 'testo', p: [-3.7, -4.9], testo: 'r₂ = 2', ancora: 'start' },
        { tipo: 'testo', p: [-3.7, -5.7], testo: 'd = {{d}}', ancora: 'start' }
      ],
      didascalia: R`Trascina C₂. Secanti per 1 < d < 5, tangenti con d = 1 o d = 5; con d < 1 γ₂ sta dentro γ₁, con d > 5 sono esterne. L'asse radicale c'è sempre ed è perpendicolare alla retta dei centri.`
    }
  },

  esempi: [
    { titolo: 'Dal centro e dal raggio alla forma generale', problema: R`Scrivi l'equazione della circonferenza di centro $C(3;-1)$ e raggio $r=4$, sia in forma canonica sia in forma generale.`, passi: [
      R`Forma canonica: sostituisco $\alpha=3$, $\beta=-1$, $r=4$ in $(x-\alpha)^2+(y-\beta)^2=r^2$: $(x-3)^2+(y+1)^2=16$.`,
      R`Sviluppo i quadrati: $x^2-6x+9+y^2+2y+1=16$.`,
      R`Porto tutto a sinistra e riduco: $x^2+y^2-6x+2y+10-16=0$, cioè $x^2+y^2-6x+2y-6=0$.`,
      R`Verifica: $a=-6\Rightarrow -\dfrac{a}{2}=3=\alpha$ ✓; $b=2\Rightarrow -\dfrac{b}{2}=-1=\beta$ ✓; $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c=9+1+6=16=r^2$ ✓.`
    ], risultato: R`$x^2+y^2-6x+2y-6=0$, equivalente a $(x-3)^2+(y+1)^2=16$.` },

    { titolo: 'Dalla forma generale a centro e raggio', problema: R`Determina centro e raggio della circonferenza $x^2+y^2-2x-4y-4=0$, dopo aver verificato che rappresenti davvero una circonferenza.`, passi: [
      R`Confronto con $x^2+y^2+ax+by+c=0$: $a=-2$, $b=-4$, $c=-4$.`,
      R`Condizione di esistenza: $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c=1+4+4=9>0$, quindi è una vera circonferenza.`,
      R`Centro: $C\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)=C(1;2)$.`,
      R`Raggio: $r=\sqrt9=3$.`
    ], risultato: R`Centro $C(1;2)$, raggio $r=3$.` },

    { titolo: 'Posizione di una retta rispetto a una circonferenza', problema: R`Stabilisci la posizione della retta $y=2x-5$ rispetto alla circonferenza $x^2+y^2=5$.`, passi: [
      R`La circonferenza ha centro $O(0;0)$ e raggio $r=\sqrt5$ (perché $x^2+y^2=5$ è il caso particolare con centro nell'origine).`,
      R`Scrivo la retta in forma implicita: $2x-y-5=0$.`,
      R`Distanza dal centro: $d=\dfrac{|2\cdot0-0-5|}{\sqrt{2^2+(-1)^2}}=\dfrac{5}{\sqrt5}=\sqrt5$.`,
      R`$d=r=\sqrt5$: la retta è tangente. Verifica con il $\Delta$: sostituendo $y=2x-5$ in $x^2+y^2=5$ si ottiene $5x^2-20x+20=0$, cioè $x^2-4x+4=0$, con $\Delta=16-16=0$: stesso esito.`
    ], risultato: R`La retta è tangente alla circonferenza.` },

    { titolo: 'La tangente in un punto della circonferenza', problema: R`Scrivi l'equazione della tangente alla circonferenza $x^2+y^2-2x-4y-4=0$ nel suo punto $P_0(4;2)$.`, passi: [
      R`Verifico che $P_0$ appartiene alla circonferenza: $16+4-2\cdot4-4\cdot2-4=16+4-8-8-4=0$ ✓.`,
      R`Il centro è $C(1;2)$ (dai coefficienti: $-a/2=1$, $-b/2=2$). Il raggio $CP_0$ va da $(1;2)$ a $(4;2)$: è orizzontale.`,
      R`La tangente in $P_0$ è perpendicolare al raggio, quindi verticale: $x=4$.`,
      R`Verifica con lo sdoppiamento: $x\,x_0+y\,y_0+a\dfrac{x+x_0}{2}+b\dfrac{y+y_0}{2}+c=0$ con $x_0=4$, $y_0=2$, $a=-2$, $b=-4$, $c=-4$ diventa $4x+2y-(x+4)-2(y+2)-4=0$, cioè $3x-12=0$: stesso risultato.`
    ], risultato: R`Tangente: $x=4$.` },

    { titolo: 'Le tangenti da un punto esterno', problema: R`Trova le equazioni delle rette tangenti condotte dal punto $P(13;0)$ alla circonferenza $x^2+y^2=25$.`, passi: [
      R`Centro $O(0;0)$, raggio $r=5$. Distanza $OP=13>5$: $P$ è esterno, quindi esistono due tangenti.`,
      R`Fascio di rette per $P$ (non verticali): $y=m(x-13)$, cioè $mx-y-13m=0$.`,
      R`La retta è tangente quando dista dal centro quanto il raggio: $\dfrac{|{-13m}|}{\sqrt{m^2+1}}=5$.`,
      R`Elevo al quadrato e tolgo il denominatore: $169m^2=25(m^2+1)$, cioè $144m^2=25$, quindi $m=\pm\dfrac{5}{12}$.`,
      R`La retta verticale $x=13$ ha distanza $13\ne5$ da $O$: non è tangente, quindi non si perde nessuna soluzione.`,
      R`Le due tangenti sono $y=\dfrac{5}{12}(x-13)$ e $y=-\dfrac{5}{12}(x-13)$, cioè $5x-12y-65=0$ e $5x+12y-65=0$.`
    ], risultato: R`$5x-12y-65=0 \ \lor\ 5x+12y-65=0$.` },

    { titolo: 'L’equazione dai tre punti', problema: R`Determina l'equazione della circonferenza passante per $A(-1;0)$, $B(3;0)$, $C(0;3)$.`, passi: [
      R`Sostituisco ogni punto in $x^2+y^2+ax+by+c=0$: da $A$, $1-a+c=0$; da $B$, $9+3a+c=0$; da $C$, $9+3b+c=0$.`,
      R`Dalla prima equazione: $c=a-1$. Sostituendo nella seconda: $9+3a+(a-1)=0 \Rightarrow 4a+8=0 \Rightarrow a=-2$, quindi $c=-3$.`,
      R`Sostituendo $c=-3$ nella terza: $9+3b-3=0 \Rightarrow 3b+6=0 \Rightarrow b=-2$.`,
      R`Equazione: $x^2+y^2-2x-2y-3=0$. Condizione di esistenza: $1+1+3=5>0$ ✓. Centro $(1;1)$, raggio $\sqrt5$.`,
      R`Verifica sui tre punti: $A(-1;0)$: $1+0+2-0-3=0$ ✓; $B(3;0)$: $9+0-6-0-3=0$ ✓; $C(0;3)$: $0+9-0-6-3=0$ ✓.`
    ], risultato: R`$x^2+y^2-2x-2y-3=0$ (centro $(1;1)$, raggio $\sqrt5$).` }
  ],

  formulario: [
    { nome: 'Equazione canonica', formula: R`(x-\alpha)^2+(y-\beta)^2=r^2`, nota: R`Centro $C(\alpha;\beta)$, raggio $r$.` },
    { nome: 'Equazione generale', formula: R`x^2+y^2+ax+by+c=0` },
    { nome: 'Centro dai coefficienti', formula: R`C\left(-\frac{a}{2};\,-\frac{b}{2}\right)` },
    { nome: 'Raggio dai coefficienti', formula: R`r=\sqrt{\frac{a^2}{4}+\frac{b^2}{4}-c}`, nota: R`Esiste (reale e positivo) solo se $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$.` },
    { nome: 'Condizione di esistenza', formula: R`\frac{a^2}{4}+\frac{b^2}{4}-c>0`, nota: R`Se vale $0$: un solo punto. Se è negativa: nessun punto reale.` },
    { nome: 'Distanza centro-retta (richiamo)', formula: R`d=\frac{|m\,x_C-y_C+q|}{\sqrt{m^2+1}}`, nota: R`Distanza del centro $C(x_C;y_C)$ dalla retta $y=mx+q$; si confronta con $r$.` },
    { nome: 'Sdoppiamento (forma generale)', formula: R`x\,x_0+y\,y_0+a\,\frac{x+x_0}{2}+b\,\frac{y+y_0}{2}+c=0`, nota: R`Tangente nel punto $P_0(x_0;y_0)$ della circonferenza $x^2+y^2+ax+by+c=0$.` },
    { nome: 'Sdoppiamento (forma canonica)', formula: R`(x_0-\alpha)(x-\alpha)+(y_0-\beta)(y-\beta)=r^2`, nota: R`Stessa idea, per la forma canonica $(x-\alpha)^2+(y-\beta)^2=r^2$.` },
    { nome: 'Asse radicale', formula: R`(a_1-a_2)x+(b_1-b_2)y+(c_1-c_2)=0`, nota: R`Si ottiene sottraendo le equazioni di $x^2+y^2+a_1x+b_1y+c_1=0$ e $x^2+y^2+a_2x+b_2y+c_2=0$.` },
    { nome: 'Fascio di circonferenze', formula: R`\left(x^2+y^2+a_1x+b_1y+c_1\right)+k\left(x^2+y^2+a_2x+b_2y+c_2\right)=0`, nota: R`Al variare di $k\in\mathbb{R}$; per $k=-1$ si ottiene l'asse radicale.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione-luogo', tipo: 'definizione', fronte: R`Definizione di circonferenza come luogo`, retro: R`L'insieme dei punti del piano che hanno distanza costante $r$ (raggio) da un punto fisso $C$ (centro).` },
    { id: 'fc-02', sezione: 'definizione-luogo', tipo: 'concetto', fronte: R`Da quale condizione nasce l'equazione della circonferenza?`, retro: R`Dal richiedere che la distanza di un generico punto $P(x;y)$ dal centro sia sempre $r$: $\sqrt{(x-\alpha)^2+(y-\beta)^2}=r$.` },
    { id: 'fc-03', sezione: 'equazione-canonica', tipo: 'formula', fronte: R`Equazione canonica (centro-raggio)`, retro: R`$(x-\alpha)^2+(y-\beta)^2=r^2$, con centro $C(\alpha;\beta)$ e raggio $r$.` },
    { id: 'fc-04', sezione: 'equazione-canonica', tipo: 'procedura', fronte: R`Dalla forma canonica alla forma generale`, retro: R`Si sviluppano i quadrati e si riduce: $x^2+y^2+ax+by+c=0$ con $a=-2\alpha$, $b=-2\beta$, $c=\alpha^2+\beta^2-r^2$.` },
    { id: 'fc-05', sezione: 'equazione-generale', tipo: 'formula', fronte: R`Forma generale della circonferenza`, retro: R`$x^2+y^2+ax+by+c=0$, con coefficiente $1$ su $x^2$ e $y^2$ e nessun termine $xy$.` },
    { id: 'fc-06', sezione: 'equazione-generale', tipo: 'formula', fronte: R`Centro dai coefficienti`, retro: R`$C\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$.` },
    { id: 'fc-07', sezione: 'equazione-generale', tipo: 'formula', fronte: R`Raggio dai coefficienti`, retro: R`$r=\sqrt{\dfrac{a^2}{4}+\dfrac{b^2}{4}-c}$.` },
    { id: 'fc-08', sezione: 'equazione-generale', tipo: 'concetto', fronte: R`Condizione di esistenza della circonferenza`, retro: R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$. Se vale $0$: un solo punto. Se è negativa: nessun punto reale.` },
    { id: 'fc-09', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando la circonferenza passa per l'origine?`, retro: R`Quando $c=0$: sostituendo $(0;0)$ nell'equazione generale resta solo $c$.` },
    { id: 'fc-10', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando il centro sta sull'asse $x$?`, retro: R`Quando $b=0$, perché l'ordinata del centro $-b/2$ si annulla.` },
    { id: 'fc-11', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando il centro sta sull'asse $y$?`, retro: R`Quando $a=0$, perché l'ascissa del centro $-a/2$ si annulla.` },
    { id: 'fc-12', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Circonferenza con centro nell'origine`, retro: R`$a=b=0$: l'equazione diventa $x^2+y^2+c=0$, cioè $x^2+y^2=r^2$ con $c=-r^2<0$.` },
    { id: 'fc-13', sezione: 'retta-circonferenza', tipo: 'procedura', fronte: R`Posizione retta-circonferenza: metodo della distanza`, retro: R`Si confronta la distanza $d$ del centro dalla retta con il raggio $r$: $d>r$ esterna, $d=r$ tangente, $d<r$ secante.` },
    { id: 'fc-14', sezione: 'retta-circonferenza', tipo: 'procedura', fronte: R`Posizione retta-circonferenza: metodo del $\Delta$`, retro: R`Si sostituisce la retta nella circonferenza e si guarda il segno di $\Delta$: $\Delta>0$ secante, $\Delta=0$ tangente, $\Delta<0$ esterna.` },
    { id: 'fc-15', sezione: 'rette-tangenti', tipo: 'concetto', fronte: R`Tangente in un punto della circonferenza (primo metodo)`, retro: R`È la retta perpendicolare al raggio $CP_0$, passante per $P_0$.` },
    { id: 'fc-16', sezione: 'rette-tangenti', tipo: 'formula', fronte: R`Formula di sdoppiamento (forma generale)`, retro: R`Tangente in $P_0(x_0;y_0)$ a $x^2+y^2+ax+by+c=0$: $x\,x_0+y\,y_0+a\dfrac{x+x_0}{2}+b\dfrac{y+y_0}{2}+c=0$.` },
    { id: 'fc-17', sezione: 'rette-tangenti', tipo: 'procedura', fronte: R`Come si trovano le tangenti da un punto esterno?`, retro: R`Si scrive il fascio di rette per il punto, si impone $d=r$ (o $\Delta=0$) e si risolve rispetto a $m$; si controlla a parte l'eventuale retta verticale.` },
    { id: 'fc-18', sezione: 'rette-tangenti', tipo: 'concetto', fronte: R`Quante tangenti si possono condurre da un punto esterno?`, retro: R`Sempre due, perché il punto è esterno alla circonferenza.` },
    { id: 'fc-19', sezione: 'due-circonferenze', tipo: 'concetto', fronte: R`Quando due circonferenze sono secanti?`, retro: R`Quando $|r_1-r_2|<d<r_1+r_2$, con $d$ distanza tra i centri.` },
    { id: 'fc-20', sezione: 'due-circonferenze', tipo: 'formula', fronte: R`Asse radicale`, retro: R`Sottraendo $x^2+y^2+a_1x+b_1y+c_1=0$ e $x^2+y^2+a_2x+b_2y+c_2=0$ si ottiene $(a_1-a_2)x+(b_1-b_2)y+(c_1-c_2)=0$.` },
    { id: 'fc-21', sezione: 'due-circonferenze', tipo: 'concetto', fronte: R`Cos'è l'asse radicale quando le circonferenze sono secanti?`, retro: R`La retta che passa per i due punti di intersezione (la corda comune).` },
    { id: 'fc-22', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Equazione per tre punti`, retro: R`Si sostituisce ogni punto in $x^2+y^2+ax+by+c=0$: si ottiene un sistema lineare nelle incognite $a,b,c$.` },
    { id: 'fc-23', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Equazione dati centro e un punto della circonferenza`, retro: R`Il raggio è la distanza tra il centro e il punto; poi si scrive la forma canonica.` },
    { id: 'fc-24', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Equazione dati centro e retta tangente`, retro: R`Il raggio è la distanza tra il centro e la retta tangente.` },
    { id: 'fc-25', sezione: 'fasci-e-problemi', tipo: 'concetto', fronte: R`Cos'è un fascio di circonferenze?`, retro: R`L'insieme delle circonferenze $\gamma_1+k\,\gamma_2=0$ al variare di $k$, tutte passanti per i punti comuni a due circonferenze date.` },
    { id: 'fc-26', sezione: 'fasci-e-problemi', tipo: 'concetto', fronte: R`Elemento degenere del fascio`, retro: R`Per $k=-1$ i termini $x^2+y^2$ si cancellano: si ottiene l'asse radicale, una retta invece di una circonferenza.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Trova il centro della circonferenza $(x-2)^2+(y-5)^2=9$. Scrivi le coordinate come *x; y*.`, suggerimenti: [R`Nelle parentesi il segno è opposto a quello delle coordinate del centro.`], risposta: cop(2, 5), soluzione: [R`Confronto con $(x-\alpha)^2+(y-\beta)^2=r^2$: $\alpha=2$ e $\beta=5$.`, R`Centro $C(2;5)$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Trova il raggio della circonferenza $(x-1)^2+(y+3)^2=16$.`, suggerimenti: [R`A destra dell'uguale c'è $r^2$, non $r$.`], risposta: num(4), soluzione: [R`A destra c'è $r^2=16$.`, R`$r=\sqrt{16}=4$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Trova il raggio della circonferenza $x^2+y^2=49$.`, suggerimenti: [R`Il centro è l'origine, e a destra c'è $r^2$.`], risposta: num(7), soluzione: [R`È la forma $x^2+y^2=r^2$, con $r^2=49$.`, R`$r=\sqrt{49}=7$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Trova il centro della circonferenza $(x+4)^2+(y-1)^2=25$. Scrivi le coordinate come *x; y*.`, suggerimenti: [R`$x+4$ è lo stesso che $x-(-4)$.`], risposta: cop(-4, 1), soluzione: [R`$x+4=x-(-4)$, quindi $\alpha=-4$.`, R`Da $y-1$ viene $\beta=1$.`, R`Centro $C(-4;1)$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Scrivi l'equazione della circonferenza con centro nell'origine e raggio $5$.`, suggerimenti: [R`Con il centro nell'origine l'equazione è $x^2+y^2=r^2$.`], risposta: circ(0, 0, 25), soluzione: [R`Centro $O(0;0)$: la forma è $x^2+y^2=r^2$.`, R`$r^2=25$, quindi $x^2+y^2=25$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Scrivi l'equazione della circonferenza di centro $C(2;3)$ e raggio $4$.`, suggerimenti: [R`Metti centro e raggio in $(x-\alpha)^2+(y-\beta)^2=r^2$.`], risposta: circ(2, 3, 16), soluzione: [R`$\alpha=2$, $\beta=3$, $r^2=16$.`, R`$(x-2)^2+(y-3)^2=16$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Scrivi l'equazione della circonferenza di centro $C(-1;2)$ e raggio $3$.`, suggerimenti: [R`Con $\alpha=-1$ nella parentesi viene $x-(-1)$, cioè $x+1$.`], risposta: circ(-1, 2, 9), soluzione: [R`$x-(-1)=x+1$ e $y-2$.`, R`A destra $r^2=9$.`, R`$(x+1)^2+(y-2)^2=9$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Il punto $P(3;4)$ sta sulla circonferenza $x^2+y^2=25$? Scrivi *sì* o *no*.`, suggerimenti: [R`Metti $x=3$ e $y=4$ nell'equazione e guarda se viene vera.`], risposta: SI, soluzione: [R`$3^2+4^2=9+16=25$.`, R`L'uguaglianza è vera: sì, $P$ ci sta.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Il punto $P(1;5)$ sta sulla circonferenza $(x-1)^2+(y-2)^2=4$? Scrivi *sì* o *no*.`, suggerimenti: [R`Metti $x=1$ e $y=5$ a sinistra e confronta con $4$.`], risposta: NO, soluzione: [R`$(1-1)^2+(5-2)^2=0+9=9$.`, R`$9\ne4$: no. $P$ dista $3$ dal centro, più del raggio $2$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`La retta $y=3$ è secante, tangente o esterna alla circonferenza $x^2+y^2=4$?`, suggerimenti: [R`Centro $O(0;0)$, raggio $2$. Quanto dista la retta $y=3$ dall'origine?`], risposta: pos('esterna'), soluzione: [R`Centro $O(0;0)$, raggio $r=2$.`, R`La retta $y=3$ dista $3$ dall'origine: $d=3$.`, R`$d>r$: la retta è esterna.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Trova il centro della circonferenza $x^2+y^2-4x-6y+4=0$. Scrivi le coordinate come *x; y*.`, suggerimenti: [R`Il centro è $\left(-\frac a2;-\frac b2\right)$.`], risposta: cop(2, 3), soluzione: [R`$a=-4$ e $b=-6$.`, R`$-\frac{-4}{2}=2$ e $-\frac{-6}{2}=3$: centro $(2;3)$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Trova il centro della circonferenza $x^2+y^2-8x+2y+8=0$. Scrivi le coordinate come *x; y*.`, suggerimenti: [R`Il centro è $\left(-\frac a2;-\frac b2\right)$. Attento ai segni.`], risposta: cop(4, -1), soluzione: [R`$a=-8$ e $b=2$.`, R`$-\frac{-8}{2}=4$ e $-\frac{2}{2}=-1$: centro $(4;-1)$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Trova il raggio della circonferenza $x^2+y^2+2x-4y-4=0$.`, suggerimenti: [R`$r=\sqrt{\frac{a^2}{4}+\frac{b^2}{4}-c}$.`, R`Qui $a=2$, $b=-4$ e $c=-4$.`], risposta: num(3), soluzione: [R`$a=2$, $b=-4$, $c=-4$.`, R`$r^2=\frac{4}{4}+\frac{16}{4}-(-4)=1+4+4=9$.`, R`$r=\sqrt9=3$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Il punto $P(0;-2)$ sta sulla circonferenza $x^2+y^2-4x+2y=0$? Scrivi *sì* o *no*.`, suggerimenti: [R`Metti $x=0$ e $y=-2$ nell'equazione e guarda se viene $0$.`], risposta: SI, soluzione: [R`$0^2+(-2)^2-4\cdot0+2\cdot(-2)=0+4-0-4$.`, R`Viene $0$: sì, $P$ ci sta.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`La retta $x=5$ è secante, tangente o esterna alla circonferenza $(x-2)^2+(y-1)^2=9$?`, suggerimenti: [R`Centro $C(2;1)$, raggio $3$.`, R`La distanza di un punto dalla retta verticale $x=5$ è la differenza fra le ascisse.`], risposta: pos('tangente'), soluzione: [R`Centro $C(2;1)$, raggio $r=3$.`, R`La retta $x=5$ dista $|5-2|=3$ dal centro.`, R`$d=r$: la retta è tangente.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Scrivi l'equazione della circonferenza di centro $C(1;1)$ che passa per $P(4;5)$.`, suggerimenti: [R`Il raggio è la distanza fra $C$ e $P$.`, R`Poi usa $(x-\alpha)^2+(y-\beta)^2=r^2$.`], risposta: circ(1, 1, 25), soluzione: [R`$\overline{CP}=\sqrt{3^2+4^2}=\sqrt{25}=5$.`, R`Quindi $r^2=25$.`, R`$(x-1)^2+(y-1)^2=25$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`La retta $3x+4y+20=0$ è secante, tangente o esterna alla circonferenza $x^2+y^2=9$?`, suggerimenti: [R`Confronta con il raggio la distanza del centro $O$ dalla retta.`, R`$d=\frac{|3x_0+4y_0+20|}{\sqrt{3^2+4^2}}$, con $(x_0;y_0)$ il centro.`], risposta: pos('esterna'), soluzione: [R`Centro $O(0;0)$, raggio $r=3$.`, R`$d=\frac{|0+0+20|}{\sqrt{9+16}}=\frac{20}{5}=4$.`, R`$d>r$: la retta è esterna.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`La retta $3x+4y=0$ è secante, tangente o esterna alla circonferenza $(x-2)^2+(y-1)^2=25$?`, suggerimenti: [R`Centro $C(2;1)$, raggio $5$.`, R`$d=\frac{|3x_0+4y_0|}{\sqrt{3^2+4^2}}$, con $(x_0;y_0)$ il centro.`], risposta: pos('secante'), soluzione: [R`Centro $C(2;1)$, raggio $r=5$.`, R`$d=\frac{|3\cdot2+4\cdot1|}{\sqrt{9+16}}=\frac{10}{5}=2$.`, R`$d<r$: la retta è secante.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Una circonferenza ha centro $C(2;1)$ ed è tangente alla retta $3x+4y+5=0$. Trova il raggio.`, suggerimenti: [R`Se la retta è tangente, il raggio è la distanza del centro dalla retta.`], risposta: num(3), soluzione: [R`$r=d=\frac{|3\cdot2+4\cdot1+5|}{\sqrt{9+16}}$.`, R`$r=\frac{15}{5}=3$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Scrivi in forma generale l'equazione della circonferenza di centro $C(1;-2)$ e raggio $3$.`, suggerimenti: [R`Parti da $(x-1)^2+(y+2)^2=9$.`, R`Sviluppa i quadrati e porta tutto a sinistra.`], risposta: circ(1, -2, 9, 'generale'), soluzione: [R`Forma canonica: $(x-1)^2+(y+2)^2=9$.`, R`Sviluppo: $x^2-2x+1+y^2+4y+4=9$.`, R`Porto il $9$ a sinistra: $x^2+y^2-2x+4y-4=0$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Scrivi in forma generale l'equazione della circonferenza di centro $C(2;-3)$ e raggio $r=5$.`, suggerimenti: [R`Parti dalla forma canonica $(x-\alpha)^2+(y-\beta)^2=r^2$ e sviluppa i quadrati.`, R`Dovresti arrivare a coefficienti $a=-4$, $b=6$.`], risposta: { tipo: 'testo', accettate: ['x^2+y^2-4x+6y-12=0', 'x^2+y^2-4x+6y=12', 'x^2-4x+y^2+6y-12=0'] }, soluzione: [R`Forma canonica: $(x-2)^2+(y+3)^2=25$.`, R`Sviluppo: $x^2-4x+4+y^2+6y+9=25$.`, R`Riduco: $x^2+y^2-4x+6y+13-25=0$, cioè $x^2+y^2-4x+6y-12=0$.`, R`Verifica: centro $(2;-3)$ ✓, $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c=4+9+12=25=r^2$ ✓.`] },

    { id: 'es-02', difficolta: 1, testo: R`Determina le coordinate del centro (nella forma «$x;y$») della circonferenza $x^2+y^2+6x-8y=0$.`, suggerimenti: [R`Confronta con $x^2+y^2+ax+by+c=0$: qui $c=0$.`, R`Il centro è $\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$.`], risposta: { tipo: 'numeri', valori: [-3, 4], ordinati: true }, soluzione: [R`$a=6$, $b=-8$, $c=0$: passa per l'origine perché $c=0$.`, R`Centro: $\left(-\dfrac{6}{2};-\dfrac{-8}{2}\right)=(-3;4)$.`, R`Raggio: $r=\sqrt{9+16-0}=\sqrt{25}=5$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Per quali valori di $c$ l'equazione $x^2+y^2-6x+8y+c=0$ rappresenta una vera circonferenza (non un punto né l'insieme vuoto)?`, suggerimenti: [R`Applica la condizione di esistenza $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$.`, R`Qui $a=-6$ e $b=8$: calcola $9+16-c$.`], risposta: { tipo: 'intervallo', da: '-inf', a: 25, chiusoDa: false, chiusoA: false }, soluzione: [R`$a=-6$, $b=8$: condizione $\dfrac{36}{4}+\dfrac{64}{4}-c>0$, cioè $9+16-c>0$.`, R`$25-c>0 \Rightarrow c<25$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Stabilisci la posizione della retta $y=x-1$ rispetto alla circonferenza $x^2+y^2=2$.`, suggerimenti: [R`Centro e raggio si leggono subito: è il caso particolare con centro nell'origine.`, R`Sostituisci la retta nell'equazione della circonferenza e calcola $\Delta$.`], risposta: { tipo: 'testo', accettate: ['secante', 'la retta è secante', 'retta secante'] }, soluzione: [R`Centro $O(0;0)$, raggio $r=\sqrt2$.`, R`Sostituendo: $x^2+(x-1)^2=2 \Rightarrow 2x^2-2x-1=0$.`, R`$\Delta=4+8=12>0$: la retta è secante (due punti di intersezione).`] },

    { id: 'es-05', difficolta: 2, testo: R`Trova le ascisse dei punti in cui la retta $y=2$ interseca la circonferenza $x^2+y^2-2x-4y-4=0$.`, suggerimenti: [R`Sostituisci $y=2$ nell'equazione della circonferenza.`, R`Dovresti ottenere un'equazione di secondo grado con soluzioni intere.`], risposta: { tipo: 'numeri', valori: [-2, 4] }, soluzione: [R`Sostituendo $y=2$: $x^2+4-2x-8-4=0 \Rightarrow x^2-2x-8=0$.`, R`$(x-4)(x+2)=0 \Rightarrow x=4 \lor x=-2$.`, R`La retta $y=2$ passa per il centro $(1;2)$: i due punti sono gli estremi di un diametro orizzontale.`] },

    { id: 'es-06', difficolta: 2, testo: R`Scrivi l'equazione della retta tangente alla circonferenza $x^2+y^2=25$ nel suo punto $P(3;4)$.`, suggerimenti: [R`Verifica prima che $P$ appartenga davvero alla circonferenza.`, R`Usa la formula di sdoppiamento con $a=b=0$, $c=-25$: $x\,x_0+y\,y_0+c=0$.`], risposta: { tipo: 'testo', accettate: ['3x+4y-25=0', '3x+4y=25', 'y=-3/4x+25/4', 'y=-3x/4+25/4', 'y=-(3/4)x+25/4'] }, soluzione: [R`$P(3;4)$ è sulla circonferenza: $9+16=25$ ✓.`, R`Sdoppiamento: $x\cdot3+y\cdot4-25=0$, cioè $3x+4y-25=0$.`, R`Verifica con il raggio: la pendenza di $OP$ è $4/3$, la tangente ha pendenza $-3/4$: $y-4=-\dfrac34(x-3) \Rightarrow 3x+4y-25=0$. Stesso risultato.`] },

    { id: 'es-07', difficolta: 2, testo: R`Determina le equazioni delle tangenti alla circonferenza $x^2+y^2=4$ condotte dal punto $P(4;0)$.`, suggerimenti: [R`Verifica che $P$ sia esterno alla circonferenza.`, R`Scrivi il fascio $y=m(x-4)$ e imponi che la distanza dal centro sia uguale al raggio.`], soluzione: [R`Centro $O(0;0)$, raggio $2$; $OP=4>2$, quindi $P$ è esterno.`, R`Fascio: $mx-y-4m=0$. Distanza da $O$: $\dfrac{|-4m|}{\sqrt{m^2+1}}=2 \Rightarrow 16m^2=4(m^2+1) \Rightarrow 12m^2=4 \Rightarrow m^2=\dfrac13 \Rightarrow m=\pm\dfrac{\sqrt3}{3}$.`, R`La retta verticale $x=4$ ha distanza $4\ne2$ da $O$: non è tangente.`, R`Tangenti: $y=\dfrac{\sqrt3}{3}(x-4)$ e $y=-\dfrac{\sqrt3}{3}(x-4)$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Verifica che le circonferenze $x^2+y^2=9$ e $x^2+y^2-8x+7=0$ sono secanti, e trova l'equazione del loro asse radicale.`, suggerimenti: [R`Trova centri e raggi di entrambe, poi confronta la distanza tra i centri con la somma e la differenza dei raggi.`, R`L'asse radicale si trova sottraendo le due equazioni in forma generale.`], risposta: { tipo: 'testo', accettate: ['x=2', 'x = 2'] }, soluzione: [R`$\gamma_1$: centro $O(0;0)$, raggio $3$. $\gamma_2$: centro $(4;0)$, raggio $\sqrt{16+0-7}=3$.`, R`Distanza tra i centri: $d=4$. Poiché $0=|3-3|<4<3+3=6$, le circonferenze sono secanti.`, R`Sottraendo le equazioni: $(0-(-8))x+(0-0)y+(-9-7)=0 \Rightarrow 8x-16=0 \Rightarrow x=2$.`] },

    { id: 'es-09', difficolta: 2, testo: R`La circonferenza ha come diametro il segmento di estremi $A(-2;5)$ e $B(4;-3)$. Qual è il suo raggio?`, suggerimenti: [R`Il centro è il punto medio di $AB$; il raggio è metà della lunghezza di $AB$.`, R`$AB=\sqrt{(4-(-2))^2+(-3-5)^2}$.`], risposta: { tipo: 'numero', valore: 5 }, soluzione: [R`$AB=\sqrt{6^2+(-8)^2}=\sqrt{36+64}=\sqrt{100}=10$.`, R`Raggio $=\dfrac{AB}{2}=5$. (Centro: punto medio $=(1;1)$; equazione: $x^2+y^2-2x-2y-23=0$.)`] },

    { id: 'es-10', difficolta: 3, testo: R`Per quali valori del parametro $k$ la retta $y=x+k$ è tangente alla circonferenza $x^2+y^2=8$?`, suggerimenti: [R`Scrivi la retta in forma implicita e imponi che la distanza dal centro sia uguale al raggio.`, R`In alternativa, sostituisci nell'equazione della circonferenza e imponi $\Delta=0$.`], risposta: { tipo: 'numeri', valori: [4, -4] }, soluzione: [R`Retta: $x-y+k=0$. Raggio: $r=\sqrt8=2\sqrt2$. Distanza dal centro $O$: $\dfrac{|k|}{\sqrt2}=2\sqrt2 \Rightarrow |k|=4 \Rightarrow k=\pm4$.`, R`Verifica con il $\Delta$: sostituendo, $2x^2+2kx+k^2-8=0$, $\Delta=4k^2-8(k^2-8)=-4k^2+64$; $\Delta=0 \Rightarrow k^2=16 \Rightarrow k=\pm4$.`] },

    { id: 'es-11', difficolta: 3, testo: R`Scrivi, nella forma «$x;y$», le coordinate del punto della circonferenza $x^2+y^2=25$ più vicino al punto $A(8;6)$.`, suggerimenti: [R`Il punto cercato sta sul segmento che unisce il centro $O$ ad $A$, alla distanza $r$ da $O$.`, R`Calcola prima $OA$, poi scala il vettore $A-O$ fino a lunghezza $r$.`], risposta: { tipo: 'numeri', valori: [4, 3], ordinati: true }, soluzione: [R`Centro $O(0;0)$, raggio $r=5$. $OA=\sqrt{8^2+6^2}=\sqrt{100}=10$.`, R`Il punto più vicino è $O+r\cdot\dfrac{A-O}{OA}=5\cdot\dfrac{(8;6)}{10}=(4;3)$.`, R`Verifica: $4^2+3^2=16+9=25$ ✓.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è la condizione sui coefficienti $a$, $b$, $c$ perché $x^2+y^2+ax+by+c=0$ rappresenti una vera circonferenza?`, opzioni: [R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$`, R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}-c\ge0$`, R`$a^2+b^2-c>0$`, R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}+c>0$`], corretta: 0, spiegazione: R`Il raggio è $r=\sqrt{a^2/4+b^2/4-c}$: serve che sotto radice ci sia un numero positivo, non solo non negativo (altrimenti si avrebbe un punto, non una vera circonferenza). Le altre opzioni hanno un coefficiente o un segno sbagliato su $c$.` },
    { id: 'q-02', domanda: R`Il centro della circonferenza $x^2+y^2+ax+by+c=0$ è…`, opzioni: [R`$\left(\dfrac{a}{2};\dfrac{b}{2}\right)$`, R`$(a;b)$`, R`$(-a;-b)$`, R`$\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$`], corretta: 3, spiegazione: R`Espandendo la forma canonica si trova $a=-2\alpha$ e $b=-2\beta$, quindi $\alpha=-\dfrac{a}{2}$ e $\beta=-\dfrac{b}{2}$. Le altre opzioni dimenticano il segno meno o il fattore $\dfrac12$.` },
    { id: 'q-03', domanda: R`Una circonferenza $x^2+y^2+ax+by+c=0$ passa per l'origine se e solo se…`, opzioni: [R`$a=0$`, R`$b=0$`, R`$a=b=0$`, R`$c=0$`], corretta: 3, spiegazione: R`Sostituendo $x=0$, $y=0$ nell'equazione generale resta solo il termine $c$: è soddisfatta esattamente quando $c=0$, qualunque siano $a$ e $b$.` },
    { id: 'q-04', domanda: R`Il centro di una circonferenza sta sull'asse delle ordinate ($y$) quando…`, opzioni: [R`$a=0$`, R`$b=0$`, R`$c=0$`, R`$a=b$`], corretta: 0, spiegazione: R`Il centro è $\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$: sta sull'asse $y$ quando la sua ascissa è nulla, cioè quando $a=0$.` },
    { id: 'q-05', domanda: R`Se il centro di una circonferenza è nell'origine, l'equazione generale si riduce a…`, opzioni: [R`$x^2+y^2+ax+by=0$`, R`$x^2+y^2+c=0$ con $c<0$`, R`$x^2+y^2+c=0$ con $c>0$`, R`$x^2+y^2=0$`], corretta: 1, spiegazione: R`Centro nell'origine significa $a=b=0$: resta $x^2+y^2+c=0$, cioè $x^2+y^2=-c$. Perché $-c$ sia un raggio al quadrato positivo serve $c<0$.` },
    { id: 'q-06', domanda: R`Una retta è tangente a una circonferenza quando…`, opzioni: [R`la distanza del centro dalla retta è minore del raggio`, R`la distanza del centro dalla retta è uguale al raggio`, R`la distanza del centro dalla retta è maggiore del raggio`, R`il discriminante dell'equazione risolvente è positivo`], corretta: 1, spiegazione: R`$d=r$ è la condizione di tangenza. $d<r$ dà una retta secante, $d>r$ una retta esterna; $\Delta>0$ corrisponde al caso secante, non a quello tangente.` },
    { id: 'q-07', domanda: R`Sostituendo l'equazione di una retta in quella di una circonferenza si ottiene un'equazione di secondo grado. Se $\Delta<0$, la retta è…`, opzioni: [R`secante`, R`tangente`, R`esterna`, R`passante per il centro`], corretta: 2, spiegazione: R`$\Delta<0$ significa che l'equazione risolvente non ha soluzioni reali, cioè non ci sono punti in comune: la retta è esterna alla circonferenza.` },
    { id: 'q-08', domanda: R`La tangente a una circonferenza in un suo punto $P_0$ è…`, opzioni: [R`parallela al raggio $CP_0$`, R`perpendicolare al raggio $CP_0$`, R`la bisettrice dell'angolo in $P_0$`, R`sempre orizzontale`], corretta: 1, spiegazione: R`È una proprietà elementare della circonferenza: la tangente in un punto è sempre perpendicolare al raggio che unisce il centro a quel punto.` },
    { id: 'q-09', domanda: R`Da un punto esterno a una circonferenza si possono condurre…`, opzioni: [R`infinite rette tangenti`, R`una sola retta tangente`, R`due rette tangenti`, R`nessuna retta tangente`], corretta: 2, spiegazione: R`Da un punto esterno esistono sempre esattamente due rette tangenti alla circonferenza (da un punto della circonferenza ce n'è una sola, da un punto interno nessuna).` },
    { id: 'q-10', domanda: R`Cercando le tangenti da un punto esterno con il fascio $y-y_1=m(x-x_1)$, perché bisogna controllare a parte la retta verticale?`, opzioni: [R`perché la retta verticale non ha centro`, R`perché quel fascio non contiene la retta verticale, che non ha coefficiente angolare $m$`, R`perché la retta verticale è sempre tangente`, R`perché la retta verticale è sempre esterna`], corretta: 1, spiegazione: R`La scrittura $y-y_1=m(x-x_1)$ descrive tutte le rette per $P_1$ tranne quella verticale, che va controllata a parte confrontando la sua distanza dal centro con il raggio.` },
    { id: 'q-11', domanda: R`Due circonferenze di raggi $r_1$, $r_2$ e distanza tra i centri $d$ sono secanti quando…`, opzioni: [R`$d=r_1+r_2$`, R`$d>r_1+r_2$`, R`$|r_1-r_2|<d<r_1+r_2$`, R`$d<|r_1-r_2|$`], corretta: 2, spiegazione: R`Le circonferenze si intersecano in due punti esattamente quando la distanza tra i centri è minore della somma dei raggi e maggiore del valore assoluto della loro differenza.` },
    { id: 'q-12', domanda: R`L'asse radicale di due circonferenze $x^2+y^2+a_1x+b_1y+c_1=0$ e $x^2+y^2+a_2x+b_2y+c_2=0$ si ottiene…`, opzioni: [R`sommando le due equazioni`, R`sottraendo le due equazioni`, R`moltiplicando le due equazioni`, R`risolvendo il sistema per sostituzione`], corretta: 1, spiegazione: R`Sottraendo le due equazioni i termini $x^2+y^2$, uguali in entrambe, si eliminano: resta un'equazione di primo grado, cioè una retta.` },
    { id: 'q-13', domanda: R`Se due circonferenze sono secanti, l'asse radicale è…`, opzioni: [R`una retta esterna a entrambe`, R`la retta dei centri`, R`la retta che passa per i due punti di intersezione`, R`sempre parallela all'asse $x$`], corretta: 2, spiegazione: R`Quando le circonferenze si intersecano in due punti, l'asse radicale coincide con la corda comune; è invece sempre perpendicolare alla retta dei centri, non parallela a un asse in generale.` },
    { id: 'q-14', domanda: R`In un fascio $(x^2+y^2+a_1x+b_1y+c_1)+k(x^2+y^2+a_2x+b_2y+c_2)=0$, per quale valore di $k$ si ottiene una retta invece di una circonferenza?`, opzioni: [R`$k=0$`, R`$k=1$`, R`$k=-1$`, R`per nessun valore di $k$`], corretta: 2, spiegazione: R`Per $k=-1$ i termini $x^2+y^2$ si cancellano esattamente: resta l'equazione dell'asse radicale, una retta. È l'unico elemento degenere del fascio.` },
    { id: 'q-15', domanda: R`Per determinare l'equazione di una circonferenza per tre punti non allineati si impone che…`, opzioni: [R`i tre punti abbiano lo stesso centro`, R`le coordinate di ciascun punto soddisfino $x^2+y^2+ax+by+c=0$, ottenendo un sistema lineare in $a,b,c$`, R`la somma delle coordinate sia costante`, R`il discriminante di ciascun punto sia nullo`], corretta: 1, spiegazione: R`Sostituendo ogni punto nell'equazione generale si ottengono tre equazioni lineari (non quadratiche, perché $x^2$ e $y^2$ diventano numeri noti) nelle incognite $a$, $b$, $c$.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Il centro non è $(a;b)$ né $\left(\dfrac{a}{2};\dfrac{b}{2}\right)$: è $\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$. Il segno meno si dimentica facilmente.` },
    { tipo: 'errore', testo: R`Prima di calcolare centro e raggio, controlla la condizione di esistenza $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$: se non vale, quell'equazione non è una vera circonferenza.` },
    { tipo: 'metodo', testo: R`Per la posizione retta-circonferenza scegli il metodo più comodo: la distanza se conosci già centro e raggio, il $\Delta$ se devi comunque trovare i punti di intersezione.` },
    { tipo: 'trucco', testo: R`Se un punto $P_0$ dovrebbe stare sulla circonferenza, verificalo sempre sostituendo le sue coordinate nell'equazione prima di cercare la tangente: un errore di partenza rovina tutto il resto.` },
    { tipo: 'errore', testo: R`Le tangenti da un punto esterno cercate con $y-y_1=m(x-x_1)$ non includono la retta verticale per quel punto: va controllata a parte.` },
    { tipo: 'metodo', testo: R`Nella formula di sdoppiamento, il termine $x^2$ diventa $x\,x_0$ e il termine $x$ diventa $\dfrac{x+x_0}{2}$; stessa idea per $y$. Vale solo se $P_0$ è davvero sulla circonferenza.` },
    { tipo: 'trucco', testo: R`Per l'asse radicale basta sottrarre le due equazioni in forma generale: i termini $x^2+y^2$ spariscono sempre, qualunque siano i coefficienti.` },
    { tipo: 'errore', testo: R`Non confondere l'asse radicale con la retta dei centri: sono perpendicolari fra loro, non la stessa retta.` },
    { tipo: 'metodo', testo: R`Per l'equazione di una circonferenza per tre punti, imposta il sistema lineare in $a,b,c$ e risolvilo per sostituzione: sono equazioni di primo grado, anche se i punti hanno coordinate qualsiasi.` }
  ],

  aneddoti: [
    { matematico: 'Archimede', anni: '287–212 a.C.', titolo: 'I poligoni di 96 lati e il calcolo di pi greco', testo: R`Ad Archimede serviva un modo per calcolare $\pi$ senza poterlo misurare direttamente: scelse di inscrivere e circoscrivere alla circonferenza dei poligoni regolari con sempre più lati, partendo da un esagono e raddoppiando ogni volta i lati fino ad arrivare a poligoni di 96 lati. Il perimetro del poligono inscritto è sempre minore della circonferenza, quello del poligono circoscritto sempre maggiore: stringendo il confronto passo dopo passo, Archimede dimostrò che $\pi$ sta tra $3\frac{10}{71}$ e $3\frac{1}{7}$, cioè tra circa 3,1408 e 3,1429. Per farlo dovette calcolare a mano radici quadrate sempre più precise, senza numeri decimali né calcolatrici: un lavoro di una pazienza quasi incredibile.`, legame: R`Il metodo di Archimede stringe fra due poligoni proprio la figura di cui in questa scheda si studia l'equazione: la circonferenza.` },
    { matematico: 'Apollonio di Perga', anni: 'circa 262–190 a.C.', titolo: 'Il problema delle tre circonferenze', testo: R`Apollonio, soprannominato "il Grande Geometra" per il suo trattato sulle Coniche, scrisse anche un'opera dedicata a un problema elegante: date tre circonferenze qualsiasi nel piano, costruire con riga e compasso una quarta circonferenza tangente a tutte e tre. Il problema ammette, in generale, fino a otto circonferenze soluzione (una per ogni combinazione di tangenza interna o esterna alle tre date), ma il libro di Apollonio andò perduto, e con lui la sua soluzione. Nel 1600 François Viète ne ricostruì una con riga e compasso, e qualche decennio dopo Descartes affrontò il problema con l'algebra.`, legame: R`È il problema più famoso sulla posizione reciproca di più circonferenze, lo stesso tema (tangenza, distanza tra centri) trattato in questa scheda per due circonferenze.` },
    { matematico: 'Ferdinand von Lindemann', anni: '1852–1939', titolo: 'La quadratura del cerchio, impossibile per sempre', testo: R`Per oltre duemila anni i matematici cercarono di risolvere la «quadratura del cerchio»: costruire, con solo riga e compasso, un quadrato che avesse esattamente l'area di un cerchio dato. Il problema equivale a costruire un segmento lungo $\sqrt{\pi}$, e le costruzioni con riga e compasso possono produrre solo numeri «algebrici» (soluzioni di equazioni a coefficienti interi). Nel 1882 il matematico tedesco Ferdinand von Lindemann dimostrò che $\pi$ è invece un numero **trascendente**, cioè non algebrico: la quadratura del cerchio, di conseguenza, è impossibile in linea di principio, non solo difficile. La dimostrazione chiuse per sempre uno dei tre grandi problemi classici della geometria greca, insieme alla trisezione dell'angolo e alla duplicazione del cubo.`, legame: R`Il numero che compare nell'area e nella lunghezza di ogni circonferenza è proprio $\pi$: la sua natura più profonda ha richiesto duemila anni per essere capita davvero.` },
    { matematico: 'Ludolph van Ceulen', anni: '1540–1610', titolo: 'Le 35 cifre di pi greco sulla tomba', testo: R`Il matematico tedesco-olandese Ludolph van Ceulen dedicò gran parte della vita al calcolo di $\pi$ con il metodo di Archimede, spinto all'estremo: usò poligoni con un numero di lati pari a $2^{62}$ per ottenere 35 cifre decimali corrette, un record che resistette per secoli prima dell'arrivo di metodi più rapidi basati sulle serie infinite. Alla sua morte, nel 1610, quelle 35 cifre furono incise sulla sua lapide nella chiesa di San Pietro a Leida; quella lapide è andata perduta, e nel 2000 ne è stata posata una copia con lo stesso testo. In Germania e nei Paesi Bassi, ancora oggi, $\pi$ viene talvolta chiamato «numero di Ludolph» (Ludolphsche Zahl) in suo onore.`, legame: R`Van Ceulen ha spinto all'estremo lo stesso metodo di Archimede: più lati ha il poligono, meglio approssima la circonferenza.` }
  ]
});
})();
