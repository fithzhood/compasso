(function () {
const R = String.raw;
/* Trasformazioni geometriche (terzo anno). Ogni numero di teoria, esempi, esercizi, quiz e flashcard è stato
   ricalcolato con node (immagini dei punti, distanze, aree, punti uniti, immagini delle rette).
   Gli esempi della teoria sono quelli dei video: la bandierina con base (1; 2), asta fino a (1; 5), drappo fino
   alla punta P(3; 5) e attacco (1; 4); le regole (x; y) → (−x; y), (y; x), (x + 3; y − 1) (video equazioni);
   il triangolo A(2; −1), B(3; −1), C(2; 1) con k = 2, −1, −2 (video omotetia); due specchi che fanno una
   rotazione di angolo doppio (video simmetrie). Come nei video, il trasformato si chiama P′ e la regola si
   scrive con la freccia: niente x′, y′. */

/* allenamento: coppie (x; y) in ordine, numeri, rette */
const SIMB_P = ['(', ')', ';', '−', '/'];
const cop = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. (2; −1)', simboli: SIMB_P });
const num = (v, seg) => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: seg || 'un numero', simboli: ['−', '/'] });
/* la retta ax + by + c = 0 (interi) in tutte le forme ragionevoli: lo stesso generatore di piano-cartesiano-retta */
const mcd = (p, q) => q ? mcd(q, p % q) : Math.abs(p);
const frazione = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = mcd(n, d) || 1; return { n: n / g, d: d / g }; };
const decimale = (a, d) => { const v = a / d; return String(v).length <= 5 ? [String(v)] : []; };
const noto = f => { const s = f.n < 0 ? '-' : '', a = Math.abs(f.n); return f.d === 1 ? [s + a] : [s + a + '/' + f.d].concat(decimale(a, f.d).map(v => s + v)); };
const perX = f => { const s = f.n < 0 ? '-' : '', a = Math.abs(f.n);
  if (f.d === 1) return a === 1 ? [s + 'x', s + '1x'] : [s + a + 'x'];
  return [s + a + '/' + f.d + 'x', s + (a === 1 ? '' : a) + 'x/' + f.d, s + '(' + a + '/' + f.d + ')x'].concat(s ? ['(-' + a + '/' + f.d + ')x'] : [], decimale(a, f.d).map(v => s + v + 'x')); };
const segno = t => (t[0] === '-' ? t : '+' + t);
function retta(a, b, c) {
  const acc = [];
  if (b === 0) noto(frazione(-c, a)).forEach(k => acc.push('x=' + k));
  else {
    const m = frazione(-a, b), q = frazione(-c, b);
    const mx = m.n === 0 ? [''] : perX(m), qq = q.n === 0 ? [''] : noto(q);
    mx.forEach(t => qq.forEach(k => {
      if (!t) acc.push('y=' + (k || '0'));
      else { acc.push('y=' + t + (k ? segno(k) : '')); if (k) acc.push('y=' + k + segno(t)); }
    }));
  }
  const g = mcd(mcd(a, b), c) || 1;
  [1, -1].forEach(s => {
    const A = s * a / g, B = s * b / g, C = s * c / g;
    const t = [];
    if (A) t.push(A === 1 ? 'x' : A === -1 ? '-x' : A + 'x');
    if (B) t.push(B === 1 ? 'y' : B === -1 ? '-y' : B + 'y');
    const sx = t.map((u, i) => (i ? segno(u) : u)).join('');
    acc.push(sx + (C ? segno(String(C)) : '') + '=0');
    acc.push(sx + '=' + (C ? -C : 0));
  });
  return { tipo: 'testo', accettate: Array.from(new Set(acc)), segnaposto: 'es. y = 2x − 1', simboli: ['=', 'x', 'y', '+', '−', '/', '(', ')'] };
}

/* ---- la bandierina dei video: [base, cima dell'asta, punta P, attacco basso del drappo] ----
   Il drappo sta a destra dell'asta: in un'isometria inversa passa a sinistra, e si vede subito.
   G è la bandierina piccola (metà di F): con l'omotetia di rapporto 2 diventa F. */
const F = [[1, 2], [1, 5], [3, 5], [1, 4]];
const G = F.map(p => [p[0] / 2, p[1] / 2]);
function band(pts, colore) {
  return [
    { tipo: 'poligono', punti: [pts[1], pts[2], pts[3]], colore },
    { tipo: 'segmento', da: pts[0], a: pts[1], colore },
    { tipo: 'punto', p: pts[0], colore }
  ];
}
/* la freccetta sull'asta, dalla base verso la cima: dice da che parte si guarda il drappo */
const verso = (pts, colore) => [{ tipo: 'vettore', da: pts[0], a: [pts[0][0] + 0.6 * (pts[1][0] - pts[0][0]), pts[0][1] + 0.6 * (pts[1][1] - pts[0][1])], colore }];
/* trasformazioni scritte come espressioni dei parametri dei cursori */
const par = v => '(' + v + ')';
const RAD = a => '(' + a + ')*pi/180';
const ruota = (p, ang) => [par(p[0]) + '*cos(' + RAD(ang) + ') - ' + par(p[1]) + '*sin(' + RAD(ang) + ')', par(p[0]) + '*sin(' + RAD(ang) + ') + ' + par(p[1]) + '*cos(' + RAD(ang) + ')'];
const scala = (p, k) => [k + '*' + par(p[0]), k + '*' + par(p[1])];

COMPASSO.registra({
  id: 'trasformazioni-geometriche',
  titolo: 'Trasformazioni geometriche',

  introduzione: R`Guarda un pavimento a mattonelle, un fregio greco, una carta da parati. Lo stesso disegno si ripete: spostato, girato, ribaltato come in uno specchio. Sono le **trasformazioni geometriche**: regole che prendono ogni punto del piano e lo portano in un altro punto.

Le più importanti non deformano niente. Cambiano il posto della figura, non le sue misure: sono le **isometrie**, cioè traslazioni, rotazioni e simmetrie. Poi ci sono le **omotetie**, che ingrandiscono o rimpiccioliscono, come lo zoom di una fotocopiatrice.

Nel piano cartesiano ogni trasformazione diventa una regola sulle coordinate, come $(x; y) \to (-x; y)$. Ti servono il piano cartesiano, la retta e le trasformazioni dei grafici dell'argomento «Le funzioni». Nei disegni segui una **bandierina**: ha il drappo da una parte sola, così vedi subito se la figura è stata ribaltata.`,

  inBreve: [
    R`Una trasformazione porta ogni punto $P$ del piano in un punto $P'$. Un'**isometria** conserva tutte le distanze: la figura cambia posto, non misure.`,
    R`Traslazioni e rotazioni lasciano la figura dritta; la simmetria assiale la **ribalta**. La simmetria centrale è una rotazione di mezzo giro.`,
    R`Due simmetrie assiali in fila fanno una rotazione di angolo doppio. Se gli assi sono paralleli, fanno una traslazione.`,
    R`L'omotetia di rapporto $k$ moltiplica le lunghezze per $|k|$ e le aree per $k^2$. Con $k < 0$ la figura passa dall'altra parte del centro.`,
    R`Una similitudine è un'omotetia seguita da un'isometria: cambia le misure, non la forma.`,
    R`Per l'immagine di una retta si usa la trasformazione inversa, quella che disfa la regola. Per una traslazione si cambia segno al vettore; una simmetria disfa sé stessa.`
  ],

  sezioni: [
    { id: 'trasformazioni', titolo: 'Trasformazioni e isometrie', testo: R`Una **trasformazione geometrica** è una regola che sposta i punti del piano. Prende ogni punto $P$ e gli associa un punto $P'$, la sua **immagine**. Ogni punto è immagine di un solo punto, quindi la regola si può sempre disfare.

>* Una **trasformazione** del piano è una corrispondenza biunivoca fra i punti del piano: si scrive $P' = T(P)$. Un **punto unito** è un punto che resta fermo: $T(P) = P$.

L'immagine di una figura si ottiene trasformando tutti i suoi punti.

### Le isometrie

>* Un'**isometria** è una trasformazione che conserva le distanze. Per ogni coppia di punti $P$ e $Q$ vale $P'Q' = PQ$.

Un'isometria conserva anche gli angoli, l'allineamento dei punti e il parallelismo delle rette. Quindi porta ogni figura in una figura **congruente**: stesse misure, in un altro posto.

Nel grafico la bandierina blu ha il drappo a destra dell'asta. Le altre due sono sue immagini in due isometrie diverse.

[[grafico:dueIsometrie]]

Percorri ogni asta dalla base alla cima e guarda il drappo. Nella copia arancio sta a sinistra: la figura è **ribaltata**. Nella copia verde sta ancora a destra: la figura è solo girata.

>* Un'isometria è **diretta** se lascia le figure dritte, **inversa** se le ribalta. Una figura ribaltata non torna sull'originale scivolando sul piano: bisogna sollevarla e girarla come una pagina.

Non ogni trasformazione è un'isometria. La regola $(x; y) \to (x + 1; 2y)$ porta $A(0; 0)$ in $A'(1; 0)$ e $B(0; 1)$ in $B'(1; 2)$. La distanza $AB$ vale $1$, ma $A'B'$ vale $2$.

>! Non basta che **una** distanza resti uguale. Nella regola di prima $C(1; 0)$ va in $C'(2; 0)$, e $A'C' = AC = 1$. Per un'isometria devono restare uguali **tutte** le distanze.

?? Una trasformazione porta il quadrato $ABCD$ in un rettangolo che non è un quadrato. Può essere un'isometria?
[ ] Sì, se il perimetro resta lo stesso.
[x] No: almeno un lato ha cambiato lunghezza.
[ ] Sì, perché gli angoli restano retti.
=> In un'isometria ogni lato conserva la sua lunghezza, quindi un quadrato resta un quadrato con lo stesso lato. Conservare gli angoli o il perimetro non basta.` },

    { id: 'traslazioni', titolo: 'Le traslazioni', testo: R`La **traslazione** fa scivolare tutta la figura nella stessa direzione e della stessa lunghezza. Lo spostamento è dato da un **vettore** $\vec{v}$: una freccia con direzione, verso e lunghezza.

>* La **traslazione** $t_{\vec{v}}$ di vettore $\vec{v}$ porta ogni punto $P$ in $P'$, con $\vec{PP'} = \vec{v}$. Tutti i punti fanno lo stesso passo.

Nel piano cartesiano il vettore si scrive con le sue componenti, $\vec{v} = (a; b)$: $a$ passi a destra e $b$ in alto. La regola è $$(x; y) \to (x + a; y + b).$$

Con $\vec{v} = (3; -1)$ la punta $P(3; 5)$ della bandierina va in $P'(6; 4)$: $3$ a destra e $1$ in basso. Nel grafico la freccia $\vec{v}$ parte dall'origine: se cambia, la bandierina la segue.

[[grafico:traslazione]]

- Una traslazione è un'isometria **diretta**: la bandierina resta dritta.
- Se $\vec{v}$ non è nullo, non ci sono punti uniti: si muovono tutti.
- Ogni retta va in una retta parallela. Le rette parallele a $\vec{v}$ scivolano su sé stesse: sono **rette unite**.

Una **retta unita** va in sé stessa, anche se i suoi punti si spostano. Per trovare il vettore di una traslazione basta un punto e la sua immagine.

~ A(2; 1) \to A'(-1; 3) :: un punto e la sua immagine
~ \vec{v} = (-1 - 2; \ 3 - 1) :: arrivo meno partenza, coordinata per coordinata
~ \vec{v} = \evidb{(-3; 2)} :: $3$ passi a sinistra e $2$ in alto

>! Il vettore va da $P$ a $P'$: arrivo meno partenza. Con l'ordine scambiato trovi il vettore opposto, e la figura va dalla parte sbagliata.

> Le traslazioni dei grafici le hai già viste nell'argomento «Le funzioni»: $y = f(x - h) + k$ è il grafico di $f$ traslato del vettore $(h; k)$. Qui la stessa idea vale per qualunque figura.

?? La traslazione di vettore $(2; -3)$ porta $Q$ in $Q'(5; 1)$. Chi è $Q$?
[x] $(3; 4)$
[ ] $(7; -2)$
[ ] $(3; -2)$
=> Per tornare indietro togli il vettore: $(5 - 2; 1 + 3) = (3; 4)$. Chi risponde $(7; -2)$ ha applicato la traslazione una seconda volta, invece di disfarla.` },

    { id: 'rotazioni', titolo: 'Le rotazioni', testo: R`La **rotazione** fa girare la figura intorno a un punto fisso, il **centro**. Ogni punto si muove su una circonferenza con centro lì. Il verso positivo è l'**antiorario**, come per gli angoli in goniometria.

>* La **rotazione** di centro $O$ e angolo $\alpha$ porta $P$ in $P'$, con $OP' = OP$ e l'angolo $\widehat{POP'} = \alpha$. Se $\alpha$ non è un giro intero, l'unico punto unito è il centro.

Nel grafico il centro è l'origine. Il punto $P$ e la sua immagine $P'$ stanno sulla stessa circonferenza tratteggiata.

[[grafico:rotazione]]

Con il centro nell'origine, le rotazioni più usate hanno regole semplici.

| rotazione intorno a $O$ | regola |
|---|---|
| $90^\circ$ in senso antiorario | $(x; y) \to (-y; x)$ |
| $180^\circ$ | $(x; y) \to (-x; -y)$ |
| $90^\circ$ in senso orario, cioè $-90^\circ$ | $(x; y) \to (y; -x)$ |

Fai girare di $90^\circ$ in senso antiorario la punta della bandierina.

~ P(3; 5) :: la punta della bandierina
~ (x; y) \to (-y; x) :: la rotazione di $90^\circ$ in senso antiorario
~ P'(\evidb{-5}; \evidb{3}) :: scambio le coordinate e cambio segno alla prima

Controllo: $OP$ e $OP'$ valgono tutti e due $\sqrt{9 + 25} = \sqrt{34}$.

- Una rotazione è un'isometria **diretta**: la bandierina gira, ma non si ribalta.
- La rotazione di $180^\circ$ ha un nome suo: **simmetria centrale**.

>! Per $90^\circ$ non basta scambiare le coordinate. La regola $(y; x)$ è una simmetria e ribalta la figura. Serve anche il segno meno: $(-y; x)$.

> Con seno e coseno si scrive ogni rotazione intorno all'origine: $(x; y) \to (x\cos\alpha - y\sin\alpha; \ x\sin\alpha + y\cos\alpha)$. Con $\alpha = 90^\circ$ ritrovi $(-y; x)$.

?? Una rotazione di centro $O$ porta $A(4; 0)$ in $A'(0; 4)$. Qual è l'angolo?
[x] $90^\circ$ in senso antiorario
[ ] $90^\circ$ in senso orario
[ ] $180^\circ$
=> $A$ sta sul semiasse $x$ positivo, $A'$ sul semiasse $y$ positivo: un quarto di giro in senso antiorario. Girando in senso orario, $A$ andrebbe in $(0; -4)$.` },

    { id: 'simmetria-assiale', titolo: 'Le simmetrie assiali', testo: R`La **simmetria assiale** è uno specchio. Si fissa una retta $r$, l'**asse**, e ogni punto passa dall'altra parte, alla stessa distanza da $r$.

>* Nella **simmetria** $s_r$ di asse $r$, $P$ va nel punto $P'$ per cui $r$ è l'asse di $PP'$. Quindi $PP'$ è perpendicolare a $r$, e $r$ passa per il suo punto medio. I punti di $r$ restano fermi.

Nel piano cartesiano la simmetria rispetto all'asse $y$ è $(x; y) \to (-x; y)$. La punta $P(3; 5)$ della bandierina va in $P'(-3; 5)$: stessa altezza, dall'altra parte dell'asse. Nel grafico l'asse è la retta verticale $x = h$, che parte da $x = 0$.

[[grafico:simmetriaAsse]]

Il drappo è passato a sinistra dell'asta: la simmetria assiale è un'isometria **inversa**.

| asse | regola |
|---|---|
| asse $x$ | $(x; y) \to (x; -y)$ |
| asse $y$ | $(x; y) \to (-x; y)$ |
| bisettrice $y = x$ | $(x; y) \to (y; x)$ |
| bisettrice $y = -x$ | $(x; y) \to (-y; -x)$ |
| retta $x = h$ | $(x; y) \to (2h - x; y)$ |
| retta $y = c$ | $(x; y) \to (x; 2c - y)$ |

Le ultime due righe vengono dal punto medio. Prova con $P(-1; 2)$ e l'asse $x = 2$.

~ P(-1; 2), \quad r: x = 2 :: l'asse è verticale: l'altezza non cambia
~ 2 - (-1) = 3 :: $P$ sta $3$ unità a sinistra dell'asse
~ P'(2 + 3; \ 2) = \evidb{(5; 2)} :: $3$ unità a destra dell'asse

In generale la nuova ascissa è $h + (h - x) = 2h - x$.

- **Punti uniti**: tutti i punti dell'asse. **Rette unite**: l'asse e tutte le rette perpendicolari all'asse.
- Una figura ha un **asse di simmetria** se la simmetria la porta in sé stessa. Il quadrato ne ha quattro, il cerchio infiniti, la bandierina nessuno.

>! Il punto va dall'altra parte in **perpendicolare** all'asse, non sempre in orizzontale. Con l'asse $y = x$ l'immagine di $(3; 5)$ è $(5; 3)$, non $(-3; 5)$.

> Le simmetrie rispetto agli assi $x$ e $y$ sono quelle dei grafici $y = -f(x)$ e $y = f(-x)$, nell'argomento «Le funzioni». Quella rispetto a $y = x$ lega una funzione alla sua inversa.

?? Qual è l'immagine di $(2; -6)$ nella simmetria rispetto alla bisettrice $y = x$?
[x] $(-6; 2)$
[ ] $(-2; -6)$
[ ] $(6; -2)$
=> Rispetto a $y = x$ le coordinate si scambiano: $(-6; 2)$. Il punto $(-2; -6)$ è lo specchio rispetto all'asse $y$, e $(6; -2)$ quello rispetto all'altra bisettrice, $y = -x$.` },

    { id: 'simmetria-centrale', titolo: 'La simmetria centrale', testo: R`La **simmetria centrale** manda ogni punto dall'altra parte di un punto fisso $M$, il **centro**, alla stessa distanza.

>* La **simmetria centrale** di centro $M$ porta $P$ nel punto $P'$ per cui $M$ è **punto medio** di $PP'$. Il centro è l'unico punto unito.

È la rotazione di $180^\circ$ intorno a $M$. La figura è **girata di mezzo giro**, non ribaltata: la simmetria centrale è un'isometria **diretta**.

Con il centro nell'origine la regola è $(x; y) \to (-x; -y)$. Con il centro in $M(a; b)$ la regola viene dal punto medio: $$(x; y) \to (2a - x; \ 2b - y).$$

Prendi il centro $M(2; 1)$ e la punta $P(3; 5)$ della bandierina.

~ M(2; 1), \quad P(3; 5) :: il centro e il punto da trasformare
~ P' = (2 \cdot 2 - 3; \ 2 \cdot 1 - 5) :: la regola $(2a - x; \ 2b - y)$
~ P'(\evidb{1}; \evidb{-3}) :: controllo: il punto medio fra $(3; 5)$ e $(1; -3)$ è proprio $(2; 1)$

[[grafico:simmetriaCentrale]]

- **Rette unite**: tutte le rette che passano per il centro. Ogni altra retta va in una retta parallela.
- Una figura ha un **centro di simmetria** se la simmetria centrale la porta in sé stessa. Il parallelogramma lo ha nel punto d'incontro delle diagonali, il cerchio nel suo centro. Un triangolo non lo ha mai.

>! La simmetria di centro $O$ cambia segno a **tutte e due** le coordinate. Non è uno specchio: la bandierina resta dritta, solo girata di mezzo giro.

> Le funzioni dispari hanno il grafico simmetrico rispetto all'origine: è la simmetria $(x; y) \to (-x; -y)$, nell'argomento «Le funzioni».

?? Nella simmetria di centro $M(1; 0)$, dove va il punto $A(4; 2)$?
[x] $(-2; -2)$
[ ] $(-4; -2)$
[ ] $(-2; 2)$
=> $(2 \cdot 1 - 4; \ 2 \cdot 0 - 2) = (-2; -2)$. Il punto $(-4; -2)$ è il simmetrico rispetto all'origine, non rispetto a $M$. In $(-2; 2)$ manca il cambio di segno della seconda coordinata.` },

    { id: 'composizione', titolo: 'Comporre le isometrie', testo: R`Due trasformazioni si possono fare una dopo l'altra. Il risultato è una nuova trasformazione, la **composizione**.

>* Se applichi prima $T_1$ e poi $T_2$, la composizione si scrive $T_2 \circ T_1$ e si legge da destra: $(T_2 \circ T_1)(P) = T_2(T_1(P))$.

Componendo due isometrie le distanze restano uguali due volte: il risultato è ancora un'isometria. Due isometrie dirette danno un'isometria diretta. Due inverse danno una diretta, perché due ribaltamenti si annullano.

[[video:trasformazioni-geometriche/simmetrie]]

### Due simmetrie assiali

>* Gli assi $r$ e $s$ si incontrano in $O$ con angolo $\alpha$? Allora $s_s \circ s_r$ è la **rotazione** di centro $O$ e angolo $2\alpha$. Il verso va da $r$ a $s$. Se gli assi sono paralleli a distanza $d$, è la **traslazione** di lunghezza $2d$, perpendicolare agli assi.

Prova in coordinate. Il primo asse $r$ è l'asse $x$, il secondo $s$ è la bisettrice $y = x$: l'angolo fra loro è $45^\circ$.

~ P(3; 5) :: la punta della bandierina
~ (x; y) \to (x; -y) :: prima lo specchio in $r$: $P$ va in $(3; -5)$
~ (x; y) \to (y; x) :: poi lo specchio in $s$: $(3; -5)$ va in $(-5; 3)$
~ (x; y) \to (\evid{-y}; \evid{x}) :: in tutto, la rotazione di $90^\circ = 2 \cdot 45^\circ$ in senso antiorario

Nel grafico l'angolo $\alpha$ fra i due assi cambia, e l'angolo fra $P$ e $P''$ resta sempre il doppio.

[[grafico:dueSpecchi]]

>! L'ordine conta. Prima lo specchio in $y = x$, poi nell'asse $x$: $(x; y) \to (y; x) \to (y; -x)$. È la rotazione di $90^\circ$ in senso **orario**. La composizione non è commutativa.

### Le altre composizioni

- Due traslazioni danno la traslazione del **vettore somma**: $(1; 4)$ e poi $(2; -1)$ fanno $(3; 3)$.
- Due rotazioni con lo stesso centro danno una rotazione: gli angoli si sommano.
- Una simmetria assiale seguita da una traslazione di vettore non nullo parallelo all'asse è una **glissosimmetria**. È l'isometria delle orme sulla sabbia: piede destro, piede sinistro, sempre avanti. È inversa e non ha punti uniti.

>* Ogni isometria del piano è una traslazione, una rotazione, una simmetria assiale o una glissosimmetria. Ognuna si ottiene componendo al massimo tre simmetrie assiali.

?? Componi due simmetrie assiali con assi perpendicolari che si incontrano in $M$. Che cosa ottieni?
[x] La simmetria centrale di centro $M$.
[ ] Una traslazione.
[ ] Una simmetria assiale con asse per $M$.
=> L'angolo fra gli assi è $90^\circ$, quindi la composizione è una rotazione di $180^\circ$ intorno a $M$: la simmetria centrale. Non può essere una simmetria assiale, che è inversa: due ribaltamenti danno una figura dritta.` },

    { id: 'omotetie', titolo: 'Le omotetie', testo: R`L'**omotetia** ingrandisce o rimpicciolisce una figura a partire da un punto, il **centro**. Funziona come la luce di un proiettore: più lo schermo è lontano, più l'immagine è grande.

>* L'**omotetia** di centro $O$ e rapporto $k \ne 0$ porta $P$ nel punto $P'$ della retta $OP$ con $\vec{OP'} = k \cdot \vec{OP}$. Quindi $OP' = |k| \cdot OP$. Se $k > 0$, $P'$ sta dalla stessa parte di $P$; se $k < 0$, dalla parte opposta.

[[video:trasformazioni-geometriche/omotetia]]

Con il centro nell'origine la regola è $(x; y) \to (kx; ky)$. Prendi il triangolo del video e $k = 2$.

~ A(2; -1), \ B(3; -1), \ C(2; 1) :: il triangolo; il centro $O$ è l'origine
~ (x; y) \to (2x; 2y) :: l'omotetia di rapporto $2$
~ A'(4; -2), \ B'(6; -2), \ C'(4; 2) :: ogni coordinata raddoppia
~ AB = 1 \ \to \ A'B' = \evidb{2} :: le lunghezze raddoppiano
~ \frac{1 \cdot 2}{2} = 1 \ \to \ \frac{2 \cdot 4}{2} = \evidb{4} :: l'area quadruplica: $4 = 2^2$

>* Un'omotetia moltiplica le lunghezze per $|k|$ e le aree per $k^2$. Gli angoli restano uguali, e ogni retta va in una retta parallela.

Nel grafico la bandierina piccola ha la punta in $P$, e il rapporto $k$ cambia. Con $k = 2$ ritrovi la bandierina grande delle altre sezioni.

[[grafico:omotetia]]

- Con $k = 1$ non si muove niente: è l'identità. Con $k = -1$ è la simmetria centrale di centro $O$.
- Con $|k| > 1$ la figura si ingrandisce, con $|k| < 1$ si rimpicciolisce.
- Con $k < 0$ la figura passa oltre il centro ed è girata di mezzo giro, non ribaltata.
- Se $k \ne 1$, il centro è l'unico punto unito. Le rette unite sono quelle per il centro.

Con il centro in un punto qualsiasi $(a; b)$ la regola è $(x; y) \to (a + k(x - a); \ b + k(y - b))$.

>! Un rapporto negativo non rende negative le lunghezze. Con $k = -3$ un segmento di $2$ cm diventa di $6$ cm. Il segno di $k$ dice da che parte, $|k|$ dice quanto lontano.

>! Se $k \ne 1$ e $k \ne -1$, un'omotetia **non** è un'isometria: le distanze cambiano.

?? Un'omotetia di rapporto $k = -\frac{1}{2}$ trasforma un quadrato di area $36$. Qual è l'area dell'immagine?
[x] $9$
[ ] $-18$
[ ] $18$
=> Le aree si moltiplicano per $k^2 = \frac{1}{4}$: $36 \cdot \frac{1}{4} = 9$. Un'area non è mai negativa. Il valore $18$ viene moltiplicando per $|k|$, che vale per le lunghezze.` },

    { id: 'similitudini', titolo: 'Le similitudini', testo: R`Una foto stampata in due formati mostra la stessa scena: le forme sono uguali, le misure no. Le due stampe sono **simili**.

>* Una **similitudine** di rapporto $k > 0$ moltiplica tutte le distanze per $k$: per ogni coppia di punti $P'Q' = k \cdot PQ$. Due figure sono **simili** se una similitudine porta l'una nell'altra.

Le isometrie sono le similitudini con $k = 1$. Un'omotetia di rapporto $h$ è una similitudine di rapporto $|h|$.

>* Ogni similitudine è un'omotetia seguita da un'isometria. Prima si cambiano le misure, poi si sposta, si gira o si ribalta.

Nel grafico la bandierina piccola subisce un'omotetia di centro $O$ e rapporto $k$. Poi gira intorno a $O$ di un angolo $\alpha$.

[[grafico:similitudine]]

Come le omotetie, le similitudini conservano gli angoli e i rapporti fra le lunghezze. I perimetri si moltiplicano per $k$, le aree per $k^2$. Ma le rette non vanno sempre in rette parallele: la figura può essere girata.

| | distanze | angoli | aree |
|---|---|---|---|
| isometria | uguali | uguali | uguali |
| omotetia | per $\lvert k \rvert$ | uguali | per $k^2$ |
| similitudine | per $k$ | uguali | per $k^2$ |

Tutte e tre mandano rette in rette. Solo l'omotetia le manda sempre in rette parallele.

Una carta geografica in scala $1 : 25\,000$ è simile al terreno. Su una carta, un bosco occupa $4\ \text{cm}^2$.

~ k = 25\,000 :: dalla carta al terreno ogni lunghezza si moltiplica per $25\,000$
~ 4 \cdot 25\,000^2 = 2{,}5 \cdot 10^{9}\ \text{cm}^2 :: le aree si moltiplicano per $k^2$
~ 2{,}5 \cdot 10^{9}\ \text{cm}^2 = \evidb{0{,}25\ \text{km}^2} :: in un $\text{km}^2$ ci sono $10^{10}\ \text{cm}^2$

>! Simile non vuol dire «un po' somigliante». Un rettangolo $2 \times 3$ e uno $4 \times 5$ non sono simili: il primo lato raddoppia, il secondo no.

> I criteri di similitudine dei triangoli e il teorema di Talete sono nella geometria del piano. Qui la similitudine è vista come trasformazione: la regola che sposta i punti.

?? Due triangoli sono simili con rapporto $3$. Un angolo del primo misura $40^\circ$. Quanto misura l'angolo corrispondente del secondo?
[x] $40^\circ$
[ ] $120^\circ$
[ ] $360^\circ$
=> Una similitudine moltiplica le lunghezze, non gli angoli: la forma resta la stessa. Del resto tre angoli da $120^\circ$ non starebbero in un triangolo.` },

    { id: 'coordinate', titolo: 'Le trasformazioni in coordinate', testo: R`Nel piano cartesiano una trasformazione è una regola sulle coordinate, come $(x; y) \to (-x; y)$. Il punto trasformato si chiama $P'$: la regola dice come calcolarlo.

[[video:trasformazioni-geometriche/equazioni]]

>* Le **equazioni** di una trasformazione danno le coordinate di $P'$ a partire da quelle di $P(x; y)$.

| trasformazione | regola |
|---|---|
| traslazione di vettore $(a; b)$ | $(x; y) \to (x + a; y + b)$ |
| rotazione di $90^\circ$ intorno a $O$ | $(x; y) \to (-y; x)$ |
| simmetria rispetto all'asse $x$ | $(x; y) \to (x; -y)$ |
| simmetria rispetto all'asse $y$ | $(x; y) \to (-x; y)$ |
| simmetria rispetto a $y = x$ | $(x; y) \to (y; x)$ |
| simmetria rispetto a $x = h$ | $(x; y) \to (2h - x; y)$ |
| simmetria rispetto a $y = c$ | $(x; y) \to (x; 2c - y)$ |
| simmetria di centro $(a; b)$ | $(x; y) \to (2a - x; 2b - y)$ |
| omotetia di centro $O$ e rapporto $k$ | $(x; y) \to (kx; ky)$ |

Nel grafico ci sono le prime due regole del video. La punta $P(3; 5)$ va in $(-3; 5)$ con lo specchio nell'asse $y$, e in $(5; 3)$ con lo scambio.

[[grafico:treRegole]]

### I punti uniti

Un punto è unito se la regola lo lascia dov'è. Si impone che le coordinate di arrivo siano uguali a quelle di partenza. Per $(x; y) \to (4 - x; y)$ serve $x = 4 - x$, cioè $x = 2$, per ogni $y$. I punti uniti formano la retta $x = 2$: è la simmetria con quell'asse.

### L'immagine di una retta

Un punto $(x; y)$ sta sulla retta immagine se il punto da cui **arriva** sta sulla retta di partenza. Quindi si torna indietro. Prendi la retta $y = 2x$ e la traslazione del video.

~ (x; y) \to (x + 3; y - 1) :: la traslazione di vettore $(3; -1)$
~ (x - 3; \ y + 1) :: il punto da cui arriva $(x; y)$: torno indietro
~ y + 1 = 2(x - 3) :: lo metto nell'equazione $y = 2x$
~ y = \evidb{2x - 7} :: l'immagine: una retta parallela, con la stessa pendenza

Controllo: l'origine sta su $y = 2x$ e va in $(3; -1)$. E infatti $2 \cdot 3 - 7 = -1$.

>! Tornare indietro vuol dire usare la trasformazione **inversa**, quella che disfa la regola. Per una traslazione si cambia segno al vettore; una simmetria disfa sé stessa. Scrivere $y - 1 = 2(x + 3)$ vuol dire traslare del vettore sbagliato, $(-3; 1)$.

### Un cenno: la matrice

Molte trasformazioni con centro nell'origine hanno regole del tipo $(x; y) \to (ax + by; \ cx + dy)$. I quattro numeri si raccolgono in una tabella, la **matrice** della trasformazione: $$\begin{pmatrix} a & b \\ c & d \end{pmatrix}$$ La prima colonna è l'immagine di $(1; 0)$, la seconda quella di $(0; 1)$. La rotazione $(x; y) \to (-y; x)$ ha matrice $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$. Le traslazioni non hanno una matrice così, perché spostano anche l'origine. Le matrici hanno un argomento tutto loro.

?? Che trasformazione è $(x; y) \to (-x; \ 6 - y)$?
[x] La simmetria centrale di centro $(0; 3)$.
[ ] La simmetria rispetto alla retta $y = 3$.
[ ] La traslazione di vettore $(0; 6)$.
=> Cambiano segno tutte e due le coordinate, quindi è un mezzo giro. Il punto unito risolve $x = -x$ e $y = 6 - y$: è $(0; 3)$. La simmetria rispetto a $y = 3$ lascerebbe uguale la $x$.` }
  ],
  grafici: {
    dueIsometrie: {
      tipo: 'piano', x: [-4, 8], y: [-0.5, 6.2], passo: [1, 1], mirino: false,
      elementi: [].concat(
        band(F, 1),
        band(F.map(p => [-p[0], p[1]]), 2),
        band(F.map(p => [8 - p[0], 7 - p[1]]), 3),
        verso(F, 1), verso(F.map(p => [-p[0], p[1]]), 2), verso(F.map(p => [8 - p[0], 7 - p[1]]), 3),
        [
          { tipo: 'testo', p: [2.4, 5.7], testo: 'partenza' },
          { tipo: 'testo', p: [-2, 5.7], testo: 'ribaltata' },
          { tipo: 'testo', p: [6, 5.7], testo: 'girata' }
        ]
      ),
      didascalia: 'In blu la bandierina di partenza. In arancio la sua immagine nello specchio dell\'asse y: il drappo è passato a sinistra, la figura è ribaltata. In verde l\'immagine nella rotazione di 180° intorno al punto (4; 3,5): percorrendo l\'asta dalla base alla cima, il drappo sta ancora a destra.'
    },
    traslazione: {
      tipo: 'piano', x: [-4.5, 7.5], y: [-2.5, 7.5], passo: [1, 1], mirino: false,
      parametri: [
        { nome: 'a', min: -4, max: 4, passo: 1, valore: 3, nascosto: true },
        { nome: 'b', min: -4, max: 2, passo: 1, valore: -1, nascosto: true }
      ],
      elementi: [].concat(
        band(F, 1),
        band(F.map(p => [p[0] + ' + a', p[1] + ' + b']), 3),
        [
          { tipo: 'segmento', da: [1, 2], a: ['1 + a', '2 + b'], tratteggio: true, freccia: true, colore: 2 },
          { tipo: 'segmento', da: [3, 5], a: ['3 + a', '5 + b'], tratteggio: true, freccia: true, colore: 2 },
          { tipo: 'vettore', da: [0, 0], a: ['a', 'b'], colore: 2 },
          { tipo: 'punto', p: [3, 5], etichetta: 'P', posizione: 'alto', colore: 1 },
          { tipo: 'punto', p: ['3 + a', '5 + b'], etichetta: 'P′', posizione: 'alto', colore: 3 },
          { tipo: 'punto', p: ['a', 'b'], trascina: true, etichetta: 'v', posizione: 'basso-destra', colore: 2 },
          { tipo: 'testo', p: [-4.3, 6.9], testo: 'v = ({{a}}; {{b}})', ancora: 'start' }
        ]
      ),
      didascalia: 'La bandierina blu, traslata del vettore v (arancio, dall\'origine), diventa quella verde. Le frecce tratteggiate dalla base alla base e da P a P′ sono uguali a v: tutti i punti fanno lo stesso passo. Spostando la punta di v, la bandierina la segue.'
    },
    rotazione: {
      tipo: 'piano', x: [-6.5, 6.5], y: [-6.5, 6.5], passo: [1, 1], mirino: false,
      parametri: [{ nome: 'a', min: -180, max: 180, passo: 5, valore: 90, etichetta: 'α (gradi)' }],
      elementi: [].concat(
        [
          { tipo: 'cerchio', centro: [0, 0], raggio: Math.sqrt(34), tratteggio: true, colore: 4 },
          { tipo: 'segmento', da: [0, 0], a: [3, 5], tratteggio: true, colore: 1 },
          { tipo: 'segmento', da: [0, 0], a: ruota([3, 5], 'a'), tratteggio: true, colore: 3 },
          { tipo: 'angolo', vertice: [0, 0], da: [3, 5], a: ruota([3, 5], 'a'), raggio: 1.3, colore: 2, etichetta: 'α', retto: false }
        ],
        band(F, 1),
        band(F.map(p => ruota(p, 'a')), 3),
        [
          { tipo: 'punto', p: [3, 5], etichetta: 'P', posizione: 'destra', colore: 1 },
          { tipo: 'punto', p: ruota([3, 5], 'a'), colore: 3 },
          { tipo: 'testo', p: ruota([3.33, 5.55], 'a'), testo: 'P′' },
          { tipo: 'testo', p: [-6.2, -6.1], testo: 'α = {{a}}°', ancora: 'start' }
        ]
      ),
      didascalia: 'La rotazione di centro O e angolo α porta la bandierina blu in quella verde. P e P′ stanno sulla stessa circonferenza di centro O. Con α = 90° la punta P(3; 5) va in P′(−5; 3); con α negativo la bandierina gira in senso orario. Non viene mai ribaltata.'
    },
    simmetriaAsse: {
      tipo: 'piano', x: [-5.5, 7.5], y: [-0.5, 6.5], passo: [1, 1], mirino: false,
      parametri: [{ nome: 'h', min: -1, max: 4, passo: 0.5, valore: 0, etichetta: 'h' }],
      elementi: [].concat(
        [{ tipo: 'verticale', x: 'h', tratteggio: true, colore: 4 }],
        band(F, 1),
        band(F.map(p => ['2*h - ' + par(p[0]), p[1]]), 2),
        [
          { tipo: 'segmento', da: [1, 2], a: ['2*h - 1', 2], tratteggio: true, colore: 4 },
          { tipo: 'punto', p: [3, 5], etichetta: 'P', posizione: 'alto', colore: 1 },
          { tipo: 'punto', p: ['2*h - 3', 5], etichetta: 'P′', posizione: 'alto', colore: 2 },
          { tipo: 'testo', p: ['h + 0.15', 0.4], testo: 'r: x = {{h}}', ancora: 'start' }
        ]
      ),
      didascalia: 'Lo specchio nella retta r: x = h (viola). Con h = 0 l\'asse è l\'asse y, e P(3; 5) va in P′(−3; 5). Il segmento tratteggiato fra le due basi è perpendicolare a r e ha il punto medio su r. Il drappo arancio sta a sinistra dell\'asta: la figura è ribaltata.'
    },
    simmetriaCentrale: {
      tipo: 'piano', x: [-2.5, 6], y: [-5.5, 6], passo: [1, 1], mirino: false,
      parametri: [
        { nome: 'a', min: 0.5, max: 3, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'b', min: 0, max: 2.5, passo: 0.5, valore: 1, nascosto: true }
      ],
      elementi: [].concat(
        band(F, 1),
        band(F.map(p => ['2*a - ' + par(p[0]), '2*b - ' + par(p[1])]), 3),
        [
          { tipo: 'segmento', da: [3, 5], a: ['2*a - 3', '2*b - 5'], tratteggio: true, colore: 4 },
          { tipo: 'punto', p: [3, 5], etichetta: 'P', posizione: 'destra', colore: 1 },
          { tipo: 'punto', p: ['2*a - 3', '2*b - 5'], etichetta: 'P′', posizione: 'sinistra', colore: 3 },
          { tipo: 'punto', p: ['a', 'b'], trascina: true, etichetta: 'M', posizione: 'destra', colore: 4 },
          { tipo: 'testo', p: [4, 5.5], testo: 'M({{a}}; {{b}})', ancora: 'start' }
        ]
      ),
      didascalia: 'La simmetria di centro M (viola): M è il punto medio fra P e P′. Con M(2; 1) la punta P(3; 5) va in P′(1; −3). La bandierina verde è girata di mezzo giro, non ribaltata. Spostando M, l\'immagine lo segue.'
    },
    dueSpecchi: {
      tipo: 'piano', x: [-6.2, 6.2], y: [-6.2, 6.2], passo: [1, 1], mirino: false,
      parametri: [{ nome: 'al', min: 10, max: 80, passo: 5, valore: 45, etichetta: 'α (gradi)' }],
      elementi: [].concat(
        [
          { tipo: 'retta', m: 0, q: 0, colore: 4 },
          { tipo: 'retta', m: 'tan(al*pi/180)', q: 0, colore: 4 },
          { tipo: 'testo', p: [5.8, 0.3], testo: 'r', ancora: 'end' },
          { tipo: 'testo', p: ['5.6*cos(al*pi/180) + 0.35', '5.6*sin(al*pi/180)'], testo: 's' },
          { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['cos(al*pi/180)', 'sin(al*pi/180)'], raggio: 0.9, colore: 4, etichetta: 'α' },
          { tipo: 'angolo', vertice: [0, 0], da: [3, 5], a: ruota([3, 5], '2*al'), raggio: 2.2, colore: 3, etichetta: '2α', retto: false }
        ],
        band(F, 1),
        band(F.map(p => [p[0], -p[1]]), 2),
        band(F.map(p => ruota(p, '2*al')), 3),
        [
          { tipo: 'punto', p: [3, 5], etichetta: 'P', posizione: 'destra', colore: 1 },
          { tipo: 'punto', p: [3, -5], etichetta: 'P′', posizione: 'destra', colore: 2 },
          { tipo: 'punto', p: ruota([3, 5], '2*al'), etichetta: 'P″', posizione: 'alto-sinistra', colore: 3 }
        ]
      ),
      didascalia: 'Prima lo specchio nell\'asse r (l\'asse x): la bandierina blu diventa quella arancio, ribaltata. Poi lo specchio in s: diventa quella verde, di nuovo dritta. Dalla blu alla verde si passa con la rotazione di centro O e angolo 2α. Con α = 45°, P(3; 5) va in P″(−5; 3).'
    },
    omotetia: {
      tipo: 'piano', x: [-4, 5], y: [-5.5, 7], passo: [1, 1], mirino: false,
      parametri: [
        { nome: 's', min: -1, max: 1, passo: 2, valore: 1, etichetta: 'segno di k' },
        { nome: 'm', min: 0.25, max: 2.5, passo: 0.25, valore: 2, etichetta: '|k|' }
      ],
      elementi: [].concat(
        [{ tipo: 'retta', per: [[0, 0], [1.5, 2.5]], tratteggio: true, colore: 4 }],
        band(G, 1),
        band(G.map(p => scala(p, 's*m')), 3),
        [
          { tipo: 'punto', p: [1.5, 2.5], etichetta: 'P', posizione: 'destra', colore: 1 },
          { tipo: 'punto', p: scala([1.5, 2.5], 's*m'), etichetta: 'P′', posizione: 'sinistra', colore: 3 },
          { tipo: 'testo', p: [-6.3, 6.6], testo: 'k = {{s*m}}', ancora: 'start' },
          { tipo: 'testo', p: [-6.3, 6.0], testo: 'lunghezze × {{m}}   aree × {{m^2}}', ancora: 'start' }
        ]
      ),
      didascalia: 'L\'omotetia di centro O e rapporto k porta la bandierina blu in quella verde. P′ sta sulla retta OP: dalla stessa parte di P se k > 0, oltre O se k < 0. Con k = 2 i lati raddoppiano e le aree quadruplicano. Il segno di k dice da che parte, |k| quanto lontano: k non vale mai zero.'
    },
    similitudine: {
      tipo: 'piano', x: [-4.7, 4.7], y: [-4.7, 4.7], passo: [1, 1], mirino: false,
      parametri: [
        { nome: 'k', min: 0.5, max: 1.5, passo: 0.25, valore: 1.5, etichetta: 'k' },
        { nome: 'a', min: -180, max: 180, passo: 15, valore: 90, etichetta: 'α (gradi)' }
      ],
      elementi: [].concat(
        [{ tipo: 'angolo', vertice: [0, 0], da: [1.5, 2.5], a: ruota(scala([1.5, 2.5], 'k'), 'a'), raggio: 0.8, colore: 2 }],
        band(G, 1),
        band(G.map(p => ruota(scala(p, 'k'), 'a')), 3),
        [
          { tipo: 'punto', p: [1.5, 2.5], etichetta: 'P', posizione: 'destra', colore: 1 },
          { tipo: 'punto', p: ruota(scala([1.5, 2.5], 'k'), 'a'), etichetta: 'P′', posizione: 'alto-sinistra', colore: 3 },
          { tipo: 'testo', p: [-4.55, -3.9], testo: 'rapporto {{k}}', ancora: 'start' },
          { tipo: 'testo', p: [-4.55, -4.5], testo: 'aree × {{k^2}}', ancora: 'start' }
        ]
      ),
      didascalia: 'Una similitudine: l\'omotetia di centro O e rapporto k, poi la rotazione di angolo α intorno a O. La bandierina verde ha la stessa forma della blu, le lunghezze moltiplicate per k e le aree per k². Con α diverso da 0° e da ±180° le rette non restano parallele.'
    },
    treRegole: {
      tipo: 'piano', x: [-4, 6], y: [-0.5, 6], passo: [1, 1], mirino: false,
      elementi: [].concat(
        [
          { tipo: 'retta', m: 1, q: 0, tratteggio: true, colore: 4 },
          { tipo: 'testo', p: [5.5, 5.75], testo: 'y = x', ancora: 'end' }
        ],
        band(F, 1),
        band(F.map(p => [-p[0], p[1]]), 2),
        band(F.map(p => [p[1], p[0]]), 3),
        [
          { tipo: 'punto', p: [3, 5], etichetta: 'P(3; 5)', posizione: 'alto', colore: 1 },
          { tipo: 'punto', p: [-3, 5], etichetta: 'P′(−3; 5)', posizione: 'alto', colore: 2 },
          { tipo: 'punto', p: [5, 3], etichetta: 'P′(5; 3)', posizione: 'alto', colore: 3 }
        ]
      ),
      didascalia: 'La bandierina blu con due regole. (x; y) → (−x; y): lo specchio nell\'asse y (arancio). (x; y) → (y; x): lo specchio nella bisettrice y = x (verde). Tutte e due ribaltano la figura.'
    }
  },

  esempi: [
    { titolo: 'Traslare un triangolo', problema: R`Trasla il triangolo $A(-2; 1)$, $B(1; 0)$, $C(0; 3)$ del vettore $\vec{v} = (4; -2)$. Controlla che $AB = A'B'$.`, passi: [
      R`La regola è $(x; y) \to (x + 4; \ y - 2)$: a ogni ascissa aggiungo $4$, da ogni ordinata tolgo $2$.`,
      R`$A'(2; -1)$, $B'(5; -2)$, $C'(4; 1)$.`,
      R`$AB = \sqrt{(1 + 2)^2 + (0 - 1)^2} = \sqrt{9 + 1} = \sqrt{10}$.`,
      R`$A'B' = \sqrt{(5 - 2)^2 + (-2 + 1)^2} = \sqrt{10}$. Le differenze fra le coordinate non cambiano, perché ai due punti si aggiunge lo stesso numero.`
    ], risultato: R`$A'(2; -1)$, $B'(5; -2)$, $C'(4; 1)$; $AB = A'B' = \sqrt{10}$` },

    { titolo: 'Lo specchio in una retta orizzontale', problema: R`Nella simmetria di asse $y = 1$ trova l'immagine del punto $P(3; 4)$ e della retta $y = x$.`, passi: [
      R`L'asse è $y = c$ con $c = 1$: la regola è $(x; y) \to (x; \ 2 - y)$. L'ascissa resta, l'ordinata si specchia intorno a $1$.`,
      R`$P(3; 4)$ va in $P'(3; -2)$: $P$ sta $3$ sopra l'asse, $P'$ sta $3$ sotto.`,
      R`Per la retta torno indietro. Una simmetria disfa sé stessa, quindi $(x; y)$ arriva da $(x; \ 2 - y)$.`,
      R`Metto quel punto in $y = x$: $2 - y = x$, cioè $y = -x + 2$.`,
      R`Controllo: $y = x$ taglia l'asse in $(1; 1)$, che è un punto unito. Infatti $(1; 1)$ sta anche su $y = -x + 2$.`
    ], risultato: R`$P'(3; -2)$; la retta immagine è $y = -x + 2$` },

    { titolo: 'Due specchi paralleli', problema: R`Componi la simmetria di asse $r: x = 1$ con quella di asse $s: x = 4$, prima $r$ e poi $s$. Che trasformazione ottieni? E con l'ordine scambiato?`, passi: [
      R`Con la regola di $x = h$: $s_r$ è $(x; y) \to (2 - x; y)$ e $s_s$ è $(x; y) \to (8 - x; y)$.`,
      R`Prima $s_r$, poi $s_s$: $(x; y) \to (2 - x; y) \to (8 - (2 - x); y) = (x + 6; y)$.`,
      R`È la traslazione di vettore $(6; 0)$: perpendicolare agli assi, lunga il doppio della loro distanza, $2 \cdot 3 = 6$.`,
      R`Con l'ordine scambiato: $(x; y) \to (8 - x; y) \to (2 - (8 - x); y) = (x - 6; y)$. Il vettore diventa $(-6; 0)$: la composizione non è commutativa.`,
      R`Controllo con $P(2; 3)$: $s_r$ lo porta in $(0; 3)$, poi $s_s$ in $(8; 3)$, che è proprio $(2 + 6; 3)$.`
    ], risultato: R`Traslazione di vettore $(6; 0)$; con l'ordine scambiato, di vettore $(-6; 0)$` },

    { titolo: 'Un\'omotetia con il centro fuori dall\'origine', problema: R`Trova l'immagine del triangolo $P(2; 1)$, $Q(4; 1)$, $R(2; 3)$ nell'omotetia di centro $C(1; 1)$ e rapporto $k = -2$. Confronta le aree.`, passi: [
      R`La regola è $(x; y) \to (1 + k(x - 1); \ 1 + k(y - 1))$. Prima calcolo lo spostamento dal centro, poi lo moltiplico per $-2$, poi lo riattacco al centro.`,
      R`$P$: dal centro $(1; 0)$, per $-2$ diventa $(-2; 0)$, quindi $P'(-1; 1)$.`,
      R`$Q$: $(3; 0)$ diventa $(-6; 0)$, quindi $Q'(-5; 1)$. $R$: $(1; 2)$ diventa $(-2; -4)$, quindi $R'(-1; -3)$.`,
      R`$PQR$ è rettangolo in $P$ con cateti $2$ e $2$: area $2$. $P'Q'R'$ è rettangolo in $P'$ con cateti $4$ e $4$: area $8$.`,
      R`$8 = 2 \cdot 4$: le aree si moltiplicano per $k^2 = 4$, anche se $k$ è negativo.`
    ], risultato: R`$P'(-1; 1)$, $Q'(-5; 1)$, $R'(-1; -3)$; l'area passa da $2$ a $8$` },

    { titolo: 'Riconoscere una rotazione dalla regola', problema: R`Che trasformazione è $(x; y) \to (2 - y; \ x)$? Trova il punto unito.`, passi: [
      R`Punto unito: servono $x = 2 - y$ e $y = x$. Sostituendo, $x = 2 - x$, quindi $x = 1$ e $y = 1$: è $U(1; 1)$.`,
      R`Provo con $A(3; 1)$: va in $A'(1; 3)$. Da $U$ ad $A$ si va di $(2; 0)$, da $U$ ad $A'$ di $(0; 2)$.`,
      R`Le due frecce sono lunghe uguali e perpendicolari, e la seconda è girata in senso antiorario.`,
      R`Vale per ogni punto: da $U$ a $P$ si va di $(x - 1; \ y - 1)$, da $U$ a $P'$ di $(1 - y; \ x - 1)$. È la regola $(x; y) \to (-y; x)$ applicata a quella freccia.`
    ], risultato: R`La rotazione di $90^\circ$ in senso antiorario intorno a $U(1; 1)$` },

    { titolo: 'L\'immagine di una retta in una simmetria centrale', problema: R`Trova l'immagine della retta $y = 2x - 1$ nella simmetria di centro $M(0; 2)$.`, passi: [
      R`La regola è $(x; y) \to (-x; \ 4 - y)$. La simmetria centrale disfa sé stessa: $(x; y)$ arriva da $(-x; \ 4 - y)$.`,
      R`Metto quel punto nella retta: $4 - y = 2 \cdot (-x) - 1$, cioè $4 - y = -2x - 1$.`,
      R`Ricavo $y$: $y = 2x + 5$.`,
      R`È una retta parallela, come doveva: $M$ non sta sulla retta di partenza, perché $2 \ne 2 \cdot 0 - 1$.`,
      R`Controllo: $(0; -1)$ sta sulla retta e va in $(0; 5)$. Infatti $2 \cdot 0 + 5 = 5$.`
    ], risultato: R`$y = 2x + 5$` }
  ],

  formulario: [
    { nome: 'Traslazione di vettore (a; b)', formula: R`(x; y) \to (x + a; \ y + b)`, nota: R`Il vettore è arrivo meno partenza: $\vec{v} = (x_{P'} - x_P; \ y_{P'} - y_P)$.` },
    { nome: 'Rotazioni di 90° intorno all\'origine', formula: R`\begin{gathered} +90^\circ: \ (x; y) \to (-y; x) \\ -90^\circ: \ (x; y) \to (y; -x) \end{gathered}`, nota: R`Angolo positivo: senso antiorario.` },
    { nome: 'Rotazione di angolo α intorno all\'origine', formula: R`\begin{gathered} (x; y) \to \\ (x\cos\alpha - y\sin\alpha; \ x\sin\alpha + y\cos\alpha) \end{gathered}`, nota: R`Serve la goniometria. Con $\alpha = 90^\circ$ ritrovi $(-y; x)$.` },
    { nome: 'Simmetrie rispetto agli assi', formula: R`\begin{gathered} \text{asse } x: \ (x; y) \to (x; -y) \\ \text{asse } y: \ (x; y) \to (-x; y) \end{gathered}` },
    { nome: 'Simmetrie rispetto alle bisettrici', formula: R`\begin{gathered} y = x: \ (x; y) \to (y; x) \\ y = -x: \ (x; y) \to (-y; -x) \end{gathered}` },
    { nome: 'Simmetrie rispetto a rette parallele agli assi', formula: R`\begin{gathered} x = h: \ (x; y) \to (2h - x; \ y) \\ y = c: \ (x; y) \to (x; \ 2c - y) \end{gathered}`, nota: R`Viene dal punto medio: l'asse sta a metà fra $P$ e $P'$.` },
    { nome: 'Simmetria centrale di centro (a; b)', formula: R`(x; y) \to (2a - x; \ 2b - y)`, nota: R`Il centro è il punto medio di $PP'$. Con centro nell'origine: $(-x; -y)$.` },
    { nome: 'Omotetia di centro O e rapporto k', formula: R`(x; y) \to (kx; \ ky), \qquad k \ne 0`, nota: R`Con $k = -1$ è la simmetria centrale di centro $O$.` },
    { nome: 'Omotetia di centro (a; b)', formula: R`(x; y) \to (a + k(x - a); \ b + k(y - b))` },
    { nome: 'Lunghezze e aree nell\'omotetia', formula: R`\ell' = |k| \cdot \ell \qquad A' = k^2 \cdot A`, nota: R`Gli angoli non cambiano.` },
    { nome: 'Similitudine di rapporto k', formula: R`P'Q' = k \cdot PQ, \qquad A' = k^2 \cdot A, \qquad k > 0`, nota: R`È un'omotetia seguita da un'isometria. Con $k = 1$ è un'isometria.` },
    { nome: 'Composizione di due simmetrie assiali', formula: R`\begin{gathered} \text{assi incidenti con angolo } \alpha: \\ \text{rotazione di } 2\alpha \\ \text{assi paralleli a distanza } d: \\ \text{traslazione di } 2d \end{gathered}`, nota: R`La rotazione va nel verso dal primo asse al secondo; la traslazione è perpendicolare agli assi.` }
  ],
  flashcards: [
    { id: 'fc-01', sezione: 'trasformazioni', tipo: 'definizione', fronte: R`Trasformazione geometrica del piano`, retro: R`Una corrispondenza biunivoca fra i punti del piano: a ogni punto $P$ associa un punto $P' = T(P)$, e ogni punto è immagine di uno solo.` },
    { id: 'fc-02', sezione: 'trasformazioni', tipo: 'definizione', fronte: R`Punto unito di una trasformazione`, retro: R`Un punto che resta fermo: $T(P) = P$.` },
    { id: 'fc-03', sezione: 'trasformazioni', tipo: 'definizione', fronte: R`Isometria`, retro: R`Una trasformazione che conserva le distanze: $P'Q' = PQ$ per ogni coppia di punti. Porta ogni figura in una figura congruente.` },
    { id: 'fc-04', sezione: 'trasformazioni', tipo: 'concetto', fronte: R`Isometria diretta e isometria inversa`, retro: R`Diretta: lascia le figure dritte (traslazioni, rotazioni). Inversa: le ribalta, come uno specchio (simmetrie assiali, glissosimmetrie).` },
    { id: 'fc-05', sezione: 'traslazioni', tipo: 'formula', fronte: R`Regola della traslazione di vettore $(a; b)$`, retro: R`$(x; y) \to (x + a; \ y + b)$: tutti i punti fanno lo stesso passo.` },
    { id: 'fc-06', sezione: 'traslazioni', tipo: 'concetto', fronte: R`Punti uniti e rette unite di una traslazione con vettore non nullo`, retro: R`Nessun punto unito. Le rette unite sono le rette parallele al vettore.` },
    { id: 'fc-07', sezione: 'rotazioni', tipo: 'definizione', fronte: R`Rotazione di centro $O$ e angolo $\alpha$`, retro: R`Porta $P$ in $P'$ con $OP' = OP$ e $\widehat{POP'} = \alpha$. Angolo positivo: senso antiorario.` },
    { id: 'fc-08', sezione: 'rotazioni', tipo: 'formula', fronte: R`Rotazione di $90^\circ$ in senso antiorario intorno all'origine`, retro: R`$(x; y) \to (-y; x)$. Per esempio $(3; 5)$ va in $(-5; 3)$.` },
    { id: 'fc-09', sezione: 'simmetria-assiale', tipo: 'definizione', fronte: R`Simmetria assiale di asse $r$`, retro: R`Porta $P$ nel punto $P'$ per cui $r$ è l'asse del segmento $PP'$: perpendicolare a $PP'$ e passante per il suo punto medio.` },
    { id: 'fc-10', sezione: 'simmetria-assiale', tipo: 'formula', fronte: R`Simmetrie rispetto all'asse $x$, all'asse $y$ e alla bisettrice $y = x$`, retro: R`Asse $x$: $(x; -y)$. Asse $y$: $(-x; y)$. Bisettrice $y = x$: $(y; x)$.` },
    { id: 'fc-11', sezione: 'simmetria-assiale', tipo: 'formula', fronte: R`Simmetria rispetto alla retta $x = h$`, retro: R`$(x; y) \to (2h - x; \ y)$: l'asse sta a metà fra $x$ e la nuova ascissa.` },
    { id: 'fc-12', sezione: 'simmetria-assiale', tipo: 'concetto', fronte: R`Punti uniti e rette unite di una simmetria assiale`, retro: R`Punti uniti: tutti i punti dell'asse. Rette unite: l'asse e le rette perpendicolari all'asse.` },
    { id: 'fc-13', sezione: 'simmetria-centrale', tipo: 'formula', fronte: R`Simmetria centrale di centro $M(a; b)$`, retro: R`$M$ è il punto medio di $PP'$: $(x; y) \to (2a - x; \ 2b - y)$.` },
    { id: 'fc-14', sezione: 'simmetria-centrale', tipo: 'concetto', fronte: R`Che cos'è, in realtà, una simmetria centrale?`, retro: R`Una rotazione di $180^\circ$ intorno al centro: la figura è girata di mezzo giro, non ribaltata. È un'isometria diretta.` },
    { id: 'fc-15', sezione: 'composizione', tipo: 'definizione', fronte: R`Che cosa vuol dire $T_2 \circ T_1$?`, retro: R`Prima $T_1$, poi $T_2$: $(T_2 \circ T_1)(P) = T_2(T_1(P))$. Si legge da destra.` },
    { id: 'fc-16', sezione: 'composizione', tipo: 'concetto', fronte: R`Due simmetrie assiali con assi che si incontrano in $O$ con angolo $\alpha$`, retro: R`La rotazione di centro $O$ e angolo $2\alpha$, nel verso che va dal primo asse al secondo.` },
    { id: 'fc-17', sezione: 'composizione', tipo: 'concetto', fronte: R`Due simmetrie assiali con assi paralleli a distanza $d$`, retro: R`Una traslazione perpendicolare agli assi, di lunghezza $2d$.` },
    { id: 'fc-18', sezione: 'composizione', tipo: 'definizione', fronte: R`Glissosimmetria`, retro: R`Una simmetria assiale seguita da una traslazione di vettore non nullo parallelo all'asse, come le orme sulla sabbia. È inversa e non ha punti uniti.` },
    { id: 'fc-19', sezione: 'composizione', tipo: 'concetto', fronte: R`Quali sono tutte le isometrie del piano?`, retro: R`Traslazioni, rotazioni, simmetrie assiali e glissosimmetrie. Ognuna è composizione di al massimo tre simmetrie assiali.` },
    { id: 'fc-20', sezione: 'omotetie', tipo: 'definizione', fronte: R`Omotetia di centro $O$ e rapporto $k \ne 0$`, retro: R`Porta $P$ in $P'$ con $\vec{OP'} = k \cdot \vec{OP}$. Con $k > 0$, $P'$ sta dalla parte di $P$; con $k < 0$, oltre $O$.` },
    { id: 'fc-21', sezione: 'omotetie', tipo: 'formula', fronte: R`Lunghezze e aree in un'omotetia di rapporto $k$`, retro: R`Le lunghezze si moltiplicano per $|k|$, le aree per $k^2$. Gli angoli restano uguali.` },
    { id: 'fc-22', sezione: 'omotetie', tipo: 'concetto', fronte: R`Omotetie con $k = 1$ e con $k = -1$`, retro: R`$k = 1$: l'identità, non si muove niente. $k = -1$: la simmetria centrale di centro $O$.` },
    { id: 'fc-23', sezione: 'similitudini', tipo: 'definizione', fronte: R`Similitudine di rapporto $k$`, retro: R`Una trasformazione che moltiplica tutte le distanze per lo stesso $k > 0$. È un'omotetia seguita da un'isometria.` },
    { id: 'fc-24', sezione: 'coordinate', tipo: 'procedura', fronte: R`Come si trova l'immagine di una retta con le equazioni?`, retro: R`Si torna indietro: si scrive il punto da cui arriva $(x; y)$ e lo si mette nell'equazione della retta di partenza.` },
    { id: 'fc-25', sezione: 'coordinate', tipo: 'concetto', fronte: R`Matrice di $(x; y) \to (ax + by; \ cx + dy)$`, retro: R`$\begin{pmatrix} a & b \\ c & d \end{pmatrix}$: la prima colonna è l'immagine di $(1; 0)$, la seconda quella di $(0; 1)$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $A(2; -3)$ nella traslazione di vettore $(-5; 4)$.`, suggerimenti: [R`Aggiungi $-5$ all'ascissa e $4$ all'ordinata.`], risposta: cop(-3, 1), soluzione: [R`$(2 - 5; \ -3 + 4)$.`, R`$A'(-3; 1)$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Una traslazione porta $A(1; 4)$ in $A'(6; 2)$. Trova le componenti del vettore.`, suggerimenti: [R`Il vettore è arrivo meno partenza.`], risposta: cop(5, -2), soluzione: [R`$(6 - 1; \ 2 - 4)$.`, R`$\vec{v} = (5; -2)$: $5$ a destra e $2$ in basso.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $P(4; 1)$ nella rotazione di $90^\circ$ in senso antiorario intorno all'origine.`, suggerimenti: [R`La regola è $(x; y) \to (-y; x)$.`], risposta: cop(-1, 4), soluzione: [R`Scambio le coordinate e cambio segno alla prima: $(-1; 4)$.`, R`Controllo: $OP = OP' = \sqrt{17}$, e $P'$ sta un quarto di giro più avanti in senso antiorario.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $P(3; 2)$ nella rotazione di $90^\circ$ in senso **orario** intorno all'origine.`, suggerimenti: [R`Il senso orario è l'angolo $-90^\circ$: la regola è $(x; y) \to (y; -x)$.`], risposta: cop(2, -3), soluzione: [R`$(x; y) \to (y; -x)$ dà $(2; -3)$.`, R`Controllo: $P$ sta nel primo quadrante, girando in senso orario di un quarto di giro finisce nel quarto. Infatti $(2; -3)$ ha $x > 0$ e $y < 0$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $(-4; 3)$ nella simmetria rispetto all'asse $x$.`, suggerimenti: [R`Lo specchio è orizzontale: cambia solo l'ordinata.`], risposta: cop(-4, -3), soluzione: [R`$(x; y) \to (x; -y)$.`, R`$(-4; -3)$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $(-2; 7)$ nella simmetria rispetto alla bisettrice $y = x$.`, suggerimenti: [R`Rispetto a $y = x$ le coordinate si scambiano.`], risposta: cop(7, -2), soluzione: [R`$(x; y) \to (y; x)$.`, R`$(7; -2)$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $(1; 4)$ nella simmetria rispetto alla retta $x = 3$.`, suggerimenti: [R`Il punto sta $2$ unità a sinistra dell'asse: dove va?`, R`La regola è $(x; y) \to (2h - x; \ y)$ con $h = 3$.`], risposta: cop(5, 4), soluzione: [R`$(6 - 1; \ 4) = (5; 4)$.`, R`Controllo: il punto medio fra $(1; 4)$ e $(5; 4)$ è $(3; 4)$, che sta sull'asse.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $(0; 1)$ nella simmetria rispetto alla retta $y = -2$.`, suggerimenti: [R`L'asse è orizzontale: l'ascissa non cambia.`, R`La regola è $(x; y) \to (x; \ 2c - y)$ con $c = -2$.`], risposta: cop(0, -5), soluzione: [R`$2c - y = -4 - 1 = -5$.`, R`$(0; -5)$: il punto stava $3$ sopra l'asse, ora sta $3$ sotto.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $P(5; 3)$ nella simmetria di centro $M(2; -1)$.`, suggerimenti: [R`$M$ è il punto medio di $PP'$.`, R`La regola è $(x; y) \to (2a - x; \ 2b - y)$.`], risposta: cop(-1, -5), soluzione: [R`$(4 - 5; \ -2 - 3)$.`, R`$P'(-1; -5)$. Controllo: il punto medio di $PP'$ è $(2; -1)$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Una simmetria centrale porta $P(1; 6)$ in $P'(7; -2)$. Trova il centro.`, suggerimenti: [R`Il centro è il punto medio di $PP'$.`], risposta: cop(4, 2), soluzione: [R`$\left(\frac{1 + 7}{2}; \ \frac{6 - 2}{2}\right)$.`, R`Il centro è $(4; 2)$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Trova il punto unito della trasformazione $(x; y) \to (4 - x; \ 6 - y)$.`, suggerimenti: [R`Imponi che il punto non si muova: $x = 4 - x$ e $y = 6 - y$.`], risposta: cop(2, 3), soluzione: [R`$x = 4 - x$ dà $x = 2$; $y = 6 - y$ dà $y = 3$.`, R`Il punto unito è $(2; 3)$: è la simmetria centrale con quel centro.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Componi la traslazione di vettore $(2; -1)$ con quella di vettore $(-5; 3)$. Trova il vettore della traslazione che ottieni.`, suggerimenti: [R`Due traslazioni in fila danno la traslazione del vettore somma.`], risposta: cop(-3, 2), soluzione: [R`$(2 - 5; \ -1 + 3)$.`, R`Vettore $(-3; 2)$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Gli assi di due simmetrie si incontrano in un punto e formano un angolo di $25^\circ$. Componendo le due simmetrie si ottiene una rotazione: di quanti gradi?`, suggerimenti: [R`L'angolo della rotazione è il doppio dell'angolo fra gli assi.`], risposta: num(50, 'in gradi'), soluzione: [R`$2 \cdot 25^\circ = 50^\circ$.`, R`Il centro della rotazione è il punto d'incontro degli assi.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`Due rette parallele distano $3$ cm. Componi le simmetrie che hanno quelle rette come assi: di quanti centimetri si sposta ogni punto?`, suggerimenti: [R`Due specchi paralleli danno una traslazione: quanto è lunga?`], risposta: num(6, 'in cm'), soluzione: [R`La traslazione è lunga il doppio della distanza fra gli assi.`, R`$2 \cdot 3 = 6$ cm, in direzione perpendicolare agli assi.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $(-1; 2)$ nell'omotetia di centro $O$ e rapporto $3$.`, suggerimenti: [R`Con centro nell'origine la regola è $(x; y) \to (kx; ky)$.`], risposta: cop(-3, 6), soluzione: [R`$(3 \cdot (-1); \ 3 \cdot 2)$.`, R`$(-3; 6)$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Trova l'immagine di $(6; -4)$ nell'omotetia di centro $O$ e rapporto $-\frac{1}{2}$.`, suggerimenti: [R`Moltiplica tutte e due le coordinate per $-\frac{1}{2}$.`], risposta: cop(-3, 2), soluzione: [R`$\left(-\frac{1}{2} \cdot 6; \ -\frac{1}{2} \cdot (-4)\right)$.`, R`$(-3; 2)$: metà distanza da $O$, dalla parte opposta.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Un segmento lungo $12$ cm subisce un'omotetia di rapporto $-\frac{1}{3}$. Quanto è lungo il segmento immagine, in centimetri?`, suggerimenti: [R`Le lunghezze si moltiplicano per $|k|$, non per $k$.`], risposta: num(4, 'in cm'), soluzione: [R`$|k| = \frac{1}{3}$.`, R`$12 \cdot \frac{1}{3} = 4$ cm. Una lunghezza non è mai negativa.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Un triangolo ha area $7$. Qual è l'area della sua immagine nell'omotetia di rapporto $-3$?`, suggerimenti: [R`Le aree si moltiplicano per $k^2$.`], risposta: num(63), soluzione: [R`$k^2 = (-3)^2 = 9$.`, R`$7 \cdot 9 = 63$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Due triangoli simili hanno due lati corrispondenti di $4$ cm e $10$ cm. Il primo ha area $6\ \text{cm}^2$. Quanto vale l'area del secondo, in centimetri quadrati?`, suggerimenti: [R`Il rapporto di similitudine è $\frac{10}{4}$.`, R`Le aree si moltiplicano per il quadrato del rapporto.`], risposta: num(37.5, 'in cm²'), soluzione: [R`$k = \frac{10}{4} = 2{,}5$, quindi $k^2 = 6{,}25$.`, R`$6 \cdot 6{,}25 = 37{,}5\ \text{cm}^2$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Trova l'equazione dell'immagine della retta $y = 3x + 1$ nella traslazione di vettore $(2; 0)$.`, suggerimenti: [R`Il punto $(x; y)$ arriva da $(x - 2; \ y)$.`, R`Metti $(x - 2; \ y)$ nell'equazione della retta.`], risposta: retta(3, -1, -5), soluzione: [R`$y = 3(x - 2) + 1$.`, R`$y = 3x - 5$: la retta si sposta a destra di $2$, e il termine noto scende di $6$.`] },

    { id: 'es-01', difficolta: 2, testo: R`Scrivi la regola della rotazione di $90^\circ$ in senso antiorario intorno a $C(2; 1)$. Poi trova l'immagine di $P(5; 3)$.`, suggerimenti: [R`Lavora sulla freccia da $C$ a $P$: girala di $90^\circ$ e riattaccala a $C$.`, R`La freccia $(x - 2; \ y - 1)$ diventa $(-(y - 1); \ x - 2)$.`], risposta: cop(0, 4), soluzione: [R`Da $C$ a $P$ la freccia è $(x - 2; \ y - 1)$. Girata di $90^\circ$ diventa $(1 - y; \ x - 2)$.`, R`Riattaccata a $C$: $(x; y) \to (3 - y; \ x - 1)$.`, R`$P(5; 3)$ va in $P'(0; 4)$. Controllo: $CP = CP' = \sqrt{13}$, e le frecce $(3; 2)$ e $(-2; 3)$ sono perpendicolari.`] },
    { id: 'es-02', difficolta: 2, testo: R`Componi la simmetria di asse $x = 1$ con quella di asse $y = 2$. Che trasformazione ottieni? Scrivi il suo punto unito.`, suggerimenti: [R`Gli assi sono perpendicolari: che cosa dà la composizione?`, R`Scrivi le due regole e applicale una dopo l'altra.`], risposta: cop(1, 2), soluzione: [R`$(x; y) \to (2 - x; \ y) \to (2 - x; \ 4 - y)$.`, R`È la simmetria centrale di centro $(1; 2)$: assi perpendicolari danno una rotazione di $2 \cdot 90^\circ = 180^\circ$.`, R`Il punto unito è il punto d'incontro degli assi, $(1; 2)$. In questo caso l'ordine non conta.`] },
    { id: 'es-03', difficolta: 2, testo: R`Parti dall'origine. Applica prima la traslazione di vettore $(2; 0)$ e poi la simmetria rispetto all'asse $y$. Poi rifai tutto nell'ordine opposto. Quanto distano i due punti d'arrivo?`, suggerimenti: [R`Segui il punto passo per passo, nei due ordini.`], risposta: num(4), soluzione: [R`Prima la traslazione: $(0; 0) \to (2; 0)$, poi lo specchio: $(-2; 0)$.`, R`Prima lo specchio: $(0; 0)$ resta dov'è, poi la traslazione: $(2; 0)$.`, R`I due punti distano $4$: la composizione non è commutativa.`] },
    { id: 'es-04', difficolta: 2, testo: R`Trova l'immagine della retta $2x + y - 4 = 0$ nella simmetria rispetto alla bisettrice $y = x$.`, suggerimenti: [R`La simmetria rispetto a $y = x$ disfa sé stessa: $(x; y)$ arriva da $(y; x)$.`], risposta: retta(1, 2, -4), soluzione: [R`Metto $(y; x)$ al posto di $(x; y)$: $2y + x - 4 = 0$.`, R`La retta immagine è $x + 2y - 4 = 0$, cioè $y = -\frac{1}{2}x + 2$.`, R`Controllo: $(2; 0)$ sta sulla retta di partenza e va in $(0; 2)$, che sta sulla nuova.`] },
    { id: 'es-05', difficolta: 2, testo: R`Trova l'equazione dell'immagine della parabola $y = x^2$ nella traslazione di vettore $(-1; 3)$.`, suggerimenti: [R`Il punto $(x; y)$ arriva da $(x + 1; \ y - 3)$.`, R`Il vertice va da $(0; 0)$ a $(-1; 3)$.`], risposta: { tipo: 'testo', accettate: ['y=x^2+2x+4', 'y=x²+2x+4', 'y=(x+1)^2+3', 'y=3+(x+1)^2', 'y-3=(x+1)^2', 'y=x^2+4+2x', 'x^2+2x+4=y'], segnaposto: 'es. y = x² − 1', simboli: ['=', 'x', 'y', '^', '+', '−', '(', ')'] }, soluzione: [R`Metto $(x + 1; \ y - 3)$ in $y = x^2$: $y - 3 = (x + 1)^2$.`, R`$y = (x + 1)^2 + 3 = x^2 + 2x + 4$.`, R`È la regola $y = f(x - h) + k$ dell'argomento «Le funzioni», con $h = -1$ e $k = 3$.`] },
    { id: 'es-06', difficolta: 3, testo: R`Un'omotetia porta $A(1; 1)$ in $A'(4; 7)$ e $B(3; 1)$ in $B'(0; 7)$. Trova il rapporto e il centro. Scrivi il centro.`, suggerimenti: [R`Il segmento $A'B'$ è $k$ volte il segmento $AB$, anche come freccia.`, R`Per il centro $C(a; b)$ vale $A' = C + k(A - C)$, coordinata per coordinata.`], risposta: cop(2, 3), soluzione: [R`Da $A$ a $B$ la freccia è $(2; 0)$, da $A'$ a $B'$ è $(-4; 0)$. Quindi $k = -2$.`, R`Per il centro $C(a; b)$ vale $A' = C + k(A - C)$: $4 = a - 2(1 - a)$ e $7 = b - 2(1 - b)$.`, R`Da $4 = 3a - 2$ viene $a = 2$; da $7 = 3b - 2$ viene $b = 3$. Il centro è $(2; 3)$.`, R`Controllo con $B$: $(2 - 2 \cdot 1; \ 3 - 2 \cdot (-2)) = (0; 7)$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Un modellino d'auto in scala $1 : 18$ ha il parabrezza di $40\ \text{cm}^2$. Quanto è grande il parabrezza vero, in metri quadrati?`, suggerimenti: [R`Dal modellino all'auto le lunghezze si moltiplicano per $18$.`, R`Le aree si moltiplicano per $18^2 = 324$. Ricorda che $1\ \text{m}^2 = 10\,000\ \text{cm}^2$.`], risposta: num(1.296, 'in m²'), soluzione: [R`$k = 18$, quindi le aree si moltiplicano per $324$.`, R`$40 \cdot 324 = 12\,960\ \text{cm}^2$.`, R`$12\,960 : 10\,000 = 1{,}296\ \text{m}^2$, circa $1{,}3\ \text{m}^2$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Componi la simmetria rispetto a $y = x$ con quella rispetto all'asse $x$, in quest'ordine. Che rotazione ottieni? Scrivi l'angolo con il segno.`, suggerimenti: [R`Applica le due regole una dopo l'altra: prima $(y; x)$, poi $(x; -y)$.`, R`Confronta il risultato con le regole delle rotazioni di $90^\circ$.`], risposta: { tipo: 'testo', accettate: ['-90', '-90°', '-90gradi', '270', '270°', '90orario', '90°orario', '90insensoorario', '90°insensoorario', '90gradiinsensoorario'], segnaposto: 'es. 45°', simboli: ['−', '°'] }, soluzione: [R`$(x; y) \to (y; x) \to (y; -x)$.`, R`È la regola della rotazione di $-90^\circ$, cioè $90^\circ$ in senso orario.`, R`Con la regola dei due specchi: da $y = x$ all'asse $x$ si gira di $-45^\circ$. La rotazione ha l'angolo doppio, $2 \cdot (-45^\circ) = -90^\circ$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Una glissosimmetria è la simmetria rispetto all'asse $x$ seguita dalla traslazione di vettore $(4; 0)$. Applicala **due volte** al punto $P(1; 2)$. Dove arriva?`, suggerimenti: [R`Una volta: $(x; y) \to (x + 4; \ -y)$.`, R`Due ribaltamenti si annullano: che cosa resta?`], risposta: cop(9, 2), soluzione: [R`Una volta: $(x; y) \to (x + 4; \ -y)$, quindi $P$ va in $(5; -2)$.`, R`La seconda volta: $(5; -2)$ va in $(9; 2)$.`, R`Due volte la stessa glissosimmetria danno la traslazione di vettore $(8; 0)$: gli specchi si annullano, gli spostamenti si sommano.`] },
    { id: 'es-10', difficolta: 2, testo: R`Considera la simmetria di centro $M(1; -2)$. Quale delle due rette $y = 3x - 5$ e $y = 3x + 1$ è unita? Scrivi la sua equazione.`, suggerimenti: [R`In una simmetria centrale sono unite le rette che passano per il centro.`], risposta: retta(3, -1, -5), soluzione: [R`$M$ sta su $y = 3x - 5$, perché $3 \cdot 1 - 5 = -2$. Non sta su $y = 3x + 1$, perché $3 \cdot 1 + 1 = 4$.`, R`La retta unita è $y = 3x - 5$.`, R`Controllo con le equazioni: $(x; y)$ arriva da $(2 - x; \ -4 - y)$. Nella prima retta: $-4 - y = 3(2 - x) - 5$, cioè $y = 3x - 5$, la stessa retta.`] },
    { id: 'es-11', difficolta: 3, testo: R`Mostra che $(x; y) \to (y + 1; \ -x + 2)$ è una rotazione. Trova il centro.`, suggerimenti: [R`Il centro è il punto unito: risolvi $x = y + 1$ e $y = -x + 2$.`, R`Guarda la parte senza i numeri: $(x; y) \to (y; -x)$ è una rotazione di quale angolo?`], risposta: cop(1.5, 0.5), soluzione: [R`Punto unito: da $x = y + 1$ e $y = -x + 2$ viene $x = -x + 3$, quindi $x = \frac{3}{2}$ e $y = \frac{1}{2}$.`, R`Da $U$ a $P$ la freccia è $\left(x - \frac{3}{2}; \ y - \frac{1}{2}\right)$; da $U$ a $P'$ è $\left(y - \frac{1}{2}; \ -x + \frac{3}{2}\right)$.`, R`È la regola $(x; y) \to (y; -x)$ applicata alla freccia: la rotazione di $90^\circ$ in senso orario intorno a $U\left(\frac{3}{2}; \frac{1}{2}\right)$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un triangolo di area $3$ subisce prima l'omotetia di centro $O$ e rapporto $2$, poi quella di centro $O$ e rapporto $-\frac{1}{4}$. Qual è l'area finale?`, suggerimenti: [R`Due omotetie con lo stesso centro danno l'omotetia con il prodotto dei rapporti.`], risposta: num(0.75), soluzione: [R`$(x; y) \to (2x; 2y) \to \left(-\frac{1}{2}x; \ -\frac{1}{2}y\right)$: è l'omotetia di rapporto $2 \cdot \left(-\frac{1}{4}\right) = -\frac{1}{2}$.`, R`L'area si moltiplica per $\left(-\frac{1}{2}\right)^2 = \frac{1}{4}$.`, R`$3 \cdot \frac{1}{4} = \frac{3}{4} = 0{,}75$.`] }
  ],
  quiz: [
    { id: 'q-01', domanda: R`Quale di queste trasformazioni **non** è un'isometria?`, opzioni: [R`la traslazione di vettore $(1; 2)$`, R`la rotazione di $30^\circ$ intorno all'origine`, R`la simmetria rispetto alla retta $y = 1$`, R`l'omotetia di centro $O$ e rapporto $2$`], corretta: 3, spiegazione: R`L'omotetia di rapporto $2$ raddoppia le distanze, quindi non le conserva. Traslazioni, rotazioni e simmetrie assiali spostano la figura senza cambiarne le misure.` },
    { id: 'q-02', domanda: R`Quanti punti uniti ha una simmetria assiale?`, opzioni: [R`infiniti: tutti i punti dell'asse`, R`nessuno, perché ogni punto cambia lato`, R`uno solo, il piede della perpendicolare`, R`due, uno per lato dell'asse`], corretta: 0, spiegazione: R`I punti dell'asse sono già alla distanza zero dallo specchio: restano dove sono. Tutti gli altri passano dall'altra parte.` },
    { id: 'q-03', domanda: R`Una traslazione di vettore non nullo ha…`, opzioni: [R`un solo punto unito, l'origine`, R`nessun punto unito`, R`infiniti punti uniti, su una retta`, R`un punto unito su ogni retta parallela al vettore`], corretta: 1, spiegazione: R`Ogni punto si sposta dello stesso vettore, che non è nullo: nessuno resta fermo. Restano ferme, come insieme, le rette parallele al vettore: sono rette unite, ma i loro punti scivolano.` },
    { id: 'q-04', domanda: R`Due simmetrie assiali hanno gli assi che si incontrano con un angolo di $30^\circ$. La loro composizione è…`, opzioni: [R`la simmetria rispetto alla bisettrice dei due assi`, R`una traslazione`, R`una rotazione di $60^\circ$`, R`una rotazione di $30^\circ$`], corretta: 2, spiegazione: R`Due specchi incidenti danno una rotazione intorno al punto d'incontro, di angolo doppio: $60^\circ$. Non può essere una simmetria, perché due ribaltamenti lasciano la figura dritta.` },
    { id: 'q-05', domanda: R`Componendo due simmetrie con assi paralleli si ottiene…`, opzioni: [R`una rotazione di $180^\circ$ intorno a un punto fra gli assi`, R`una traslazione perpendicolare agli assi`, R`una traslazione parallela agli assi`, R`una simmetria con asse parallelo ai due`], corretta: 1, spiegazione: R`Ogni punto si sposta in perpendicolare agli assi, del doppio della loro distanza. Una traslazione parallela agli assi, insieme a uno specchio, darebbe invece una glissosimmetria.` },
    { id: 'q-06', domanda: R`L'omotetia di centro $O$ e rapporto $-1$ è…`, opzioni: [R`l'identità`, R`la simmetria rispetto all'asse $y$`, R`la traslazione di vettore $(-1; -1)$`, R`la simmetria centrale di centro $O$`], corretta: 3, spiegazione: R`$(x; y) \to (-x; -y)$: ogni punto va dall'altra parte di $O$, alla stessa distanza. L'identità è l'omotetia con $k = 1$.` },
    { id: 'q-07', domanda: R`Un'omotetia di rapporto $3$ trasforma una figura. L'area…`, opzioni: [R`si moltiplica per $9$`, R`si moltiplica per $3$`, R`si moltiplica per $6$`, R`si moltiplica per $27$`], corretta: 0, spiegazione: R`Le lunghezze si moltiplicano per $3$ in tutte e due le direzioni, quindi l'area per $3^2 = 9$. Il $27$ è il fattore dei volumi, nello spazio.` },
    { id: 'q-08', domanda: R`Che cosa conserva sempre una similitudine?`, opzioni: [R`le lunghezze dei segmenti`, R`le aree delle figure`, R`le ampiezze degli angoli`, R`la direzione di ogni retta`], corretta: 2, spiegazione: R`Una similitudine cambia le misure ma non la forma: gli angoli restano uguali. Lunghezze e aree cambiano, se $k \ne 1$. Le direzioni restano solo nelle omotetie e nelle traslazioni: una similitudine può anche girare la figura.` },
    { id: 'q-09', domanda: R`Una simmetria centrale è…`, opzioni: [R`un'isometria inversa, come la simmetria assiale`, R`una traslazione di vettore doppio`, R`un'omotetia di rapporto $2$`, R`una rotazione di $180^\circ$ intorno al centro`], corretta: 3, spiegazione: R`Ogni punto gira di mezzo giro intorno al centro. Per questo la figura resta dritta: la simmetria centrale è diretta, non inversa.` },
    { id: 'q-10', domanda: R`Quale di queste isometrie ribalta le figure?`, opzioni: [R`la rotazione di $90^\circ$`, R`la simmetria assiale`, R`la simmetria centrale`, R`la traslazione`], corretta: 1, spiegazione: R`Lo specchio porta il drappo della bandierina dall'altra parte dell'asta: è un'isometria inversa. Rotazioni, simmetrie centrali e traslazioni lasciano la figura dritta.` },
    { id: 'q-11', domanda: R`La regola $(x; y) \to (-x; -y)$ è…`, opzioni: [R`la simmetria centrale di centro $O$`, R`la simmetria rispetto all'asse $y$`, R`la simmetria rispetto alla bisettrice $y = -x$`, R`la rotazione di $90^\circ$ intorno a $O$`], corretta: 0, spiegazione: R`Cambiano segno tutte e due le coordinate: è il mezzo giro intorno all'origine. Lo specchio nell'asse $y$ cambia solo la $x$; quello in $y = -x$ dà $(-y; -x)$; la rotazione di $90^\circ$ dà $(-y; x)$.` },
    { id: 'q-12', domanda: R`La composizione di due isometrie…`, opzioni: [R`è sempre commutativa`, R`è commutativa solo per le simmetrie assiali`, R`in generale non è commutativa`, R`dà sempre una traslazione`], corretta: 2, spiegazione: R`Cambiando l'ordine il risultato può cambiare. Due specchi incidenti scambiati danno la rotazione nel verso opposto. Fanno eccezione, per esempio, due traslazioni.` },
    { id: 'q-13', domanda: R`La composizione di due isometrie inverse è…`, opzioni: [R`un'isometria inversa`, R`un'isometria diretta`, R`un'omotetia di rapporto $-1$`, R`una trasformazione che cambia le distanze`], corretta: 1, spiegazione: R`Due ribaltamenti si annullano: la figura torna dritta. E le distanze restano uguali, perché ognuna delle due le conserva.` },
    { id: 'q-14', domanda: R`Quali sono le rette unite di una traslazione di vettore $\vec{v}$ non nullo?`, opzioni: [R`nessuna retta`, R`tutte le rette del piano`, R`le rette perpendicolari a $\vec{v}$`, R`le rette parallele a $\vec{v}$`], corretta: 3, spiegazione: R`Una retta parallela a $\vec{v}$ scivola su sé stessa. Una retta perpendicolare a $\vec{v}$ va in un'altra retta parallela a lei, spostata.` },
    { id: 'q-15', domanda: R`Un'omotetia trasforma una retta che non passa per il centro in…`, opzioni: [R`una retta parallela`, R`una retta perpendicolare`, R`una retta che passa per il centro`, R`una curva, se $k$ è negativo`], corretta: 0, spiegazione: R`Un'omotetia conserva gli angoli e le direzioni: ogni retta va in una retta parallela. Se la retta passa per il centro, va in sé stessa.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Per la rotazione di $90^\circ$ non basta scambiare le coordinate: $(y; x)$ è uno specchio. La regola è $(-y; x)$.` },
    { tipo: 'trucco', testo: R`Disegna una figura che non abbia simmetrie, come una bandierina o una F. Se il drappo cambia lato, l'isometria è inversa.` },
    { tipo: 'metodo', testo: R`Il vettore di una traslazione è arrivo meno partenza: $\vec{v} = (x_{P'} - x_P; \ y_{P'} - y_P)$.` },
    { tipo: 'trucco', testo: R`Nelle simmetrie controlla il punto medio di $PP'$: deve essere il centro, oppure stare sull'asse.` },
    { tipo: 'errore', testo: R`Per l'immagine di una retta si usa la trasformazione inversa. Con la traslazione $(x + 3; \ y - 1)$ si mette nella retta $(x - 3; \ y + 1)$; una simmetria, invece, disfa sé stessa.` },
    { tipo: 'metodo', testo: R`Per riconoscere una trasformazione dalla regola cerca prima i punti uniti: un punto solo fa pensare a una rotazione, una retta a uno specchio, nessuno a una traslazione.` },
    { tipo: 'errore', testo: R`Un rapporto negativo non dà lunghezze negative. Le lunghezze vanno per $|k|$, le aree per $k^2$.` },
    { tipo: 'trucco', testo: R`Due specchi in fila: se gli assi si incontrano, una rotazione di angolo doppio; se sono paralleli, una traslazione di distanza doppia.` },
    { tipo: 'errore', testo: R`$T_2 \circ T_1$ si legge da destra: prima $T_1$, poi $T_2$. Con l'ordine scambiato il risultato può cambiare.` }
  ],

  aneddoti: [
    { matematico: 'Felix Klein', anni: '1849–1925', titolo: 'Una geometria per ogni gruppo di trasformazioni', testo: R`Nel 1872 Felix Klein aveva ventitré anni e diventò professore all'università di Erlangen, in Baviera. Per l'occasione fece stampare un opuscolo, che oggi tutti chiamano **programma di Erlangen**. L'idea era semplice e potente. Una geometria si riconosce da un gruppo di trasformazioni e dalle proprietà che non cambiano quando le si applica. La geometria della scuola studia ciò che resta uguale con isometrie e similitudini: angoli, rapporti fra lunghezze, allineamenti. Altre geometrie ammettono trasformazioni più libere e conservano meno cose. Curiosamente, il discorso che Klein lesse davvero all'insediamento parlava d'altro: di come insegnare la matematica. L'opuscolo invece cambiò il modo di pensare la geometria per più di un secolo.`, legame: R`Per Klein sono proprio isometrie e similitudini, le trasformazioni di questo argomento, a definire la geometria che studi a scuola.` },
    { matematico: 'George Pólya', anni: '1887–1985', titolo: 'Diciassette modi di ripetere un disegno', testo: R`L'artista olandese Maurits Cornelis Escher (1898–1972) visitò l'Alhambra di Granada nel 1922 e di nuovo nel 1936. Con la moglie passò giorni a copiare le piastrelle dei palazzi arabi: disegni che si ripetono senza lasciare buchi. Escher non aveva studiato matematica. Fu il fratellastro Berend, professore di geologia, a segnalargli un articolo del 1924 del matematico ungherese George Pólya. Pólya mostrava che i modi di ripetere un disegno su tutto il piano sono soltanto diciassette, come aveva già dimostrato il russo Fëdorov nel 1891. Ognuno è un gruppo di traslazioni, rotazioni, simmetrie e glissosimmetrie che riportano il disegno su sé stesso. Escher diceva di non capire il testo, ma copiò a mano le figure. Da lì nacquero i suoi pesci, uccelli e rettili che riempiono il piano.`, legame: R`Una tassellazione resta uguale a sé stessa in certe traslazioni, rotazioni, simmetrie e glissosimmetrie: sono le isometrie di questo argomento.` },
    { matematico: 'Christoph Scheiner', anni: '1573–1650', titolo: 'Il pantografo, una macchina per ingrandire', testo: R`Christoph Scheiner era un gesuita tedesco, professore di matematica e astronomo. È ricordato soprattutto per le macchie solari, che osservò al telescopio dal 1611, e per la lunga lite con Galileo su chi le avesse viste per primo. Intorno al 1603 aveva inventato uno strumento per copiare i disegni ingrandendoli o rimpicciolendoli: il **pantografo**. È un parallelogramma di aste snodate, con un punto fissato al tavolo. Con una punta si ripassa il disegno, e una matita traccia la copia. Il punto fisso, la punta e la matita restano sempre allineati, e il rapporto fra le loro distanze non cambia. Nel 1631 Scheiner lo descrisse in un libro, *Pantographice*. Per secoli il pantografo servì a disegnatori, cartografi e incisori.`, legame: R`Il pantografo realizza un'omotetia: il punto fissato è il centro, e il rapporto fra le distanze è il rapporto $k$.` },
    { matematico: 'Leonardo da Vinci', anni: '1452–1519', titolo: 'Gli appunti da leggere allo specchio', testo: R`Leonardo da Vinci riempì migliaia di pagine di appunti: macchine, anatomia, corsi d'acqua, volo degli uccelli. Quasi tutto è scritto da destra verso sinistra, con le lettere rovesciate. Per leggerlo comodamente serve uno specchio. Si è detto spesso che scrivesse così per tenere segreti i suoi studi, ma è un'ipotesi senza prove. La spiegazione più probabile è un'altra: Leonardo era mancino. Scrivendo verso destra con la mano sinistra, la mano strisciava sull'inchiostro fresco e lo sbavava. Scrivendo verso sinistra, invece, la penna andava avanti e la mano la seguiva su un foglio ancora pulito. Per lui era il modo più naturale di scrivere.`, legame: R`La scrittura di Leonardo è l'immagine di quella normale in una simmetria assiale. Lo specchio ne applica una seconda, e due ribaltamenti si annullano.` }
  ]
});
})();
