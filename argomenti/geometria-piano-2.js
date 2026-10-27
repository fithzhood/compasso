(function () {
const R = String.raw;
/* Geometria del piano 2 (secondo anno): nata il 26/10/2026 dalla divisione di geometria-euclidea.
   Il materiale del secondo anno è stato spostato da lì e poi arricchito: corde e tangenti, angoli al centro concavi,
   quadrilateri inscritti e circoscritti, equivalenza, commensurabili, corde e secanti, poligoni regolari.
   Il primo anno sta in geometria-piano-1: qui si richiama per nome, senza ripeterlo. */
/* ampiezza in gradi dell'angolo in V fra le semirette VU e VW (punti come coppie di espressioni) */
const ANG = (V, U, W) => {
  const ux = '((' + U[0] + ')-(' + V[0] + '))', uy = '((' + U[1] + ')-(' + V[1] + '))';
  const wx = '((' + W[0] + ')-(' + V[0] + '))', wy = '((' + W[1] + ')-(' + V[1] + '))';
  return 'acos((' + ux + '*' + wx + '+' + uy + '*' + wy + ')/(sqrt(' + ux + '^2+' + uy + '^2)*sqrt(' + wx + '^2+' + wy + '^2)))*180/pi';
};
/* angoli al centro e alla circonferenza: A e B simmetrici rispetto all'asse y, C trascinabile */
const PA = ['4*cos((90 + w/2)*pi/180)', '4*sin((90 + w/2)*pi/180)'];
const PB = ['4*cos((90 - w/2)*pi/180)', '4*sin((90 - w/2)*pi/180)'];
const PC = ['4*cos(t*pi/180)', '4*sin(t*pi/180)'];
/* angolo al centro concavo: A a 190°, B a 350° (arco piccolo di 160°), C sull'arco piccolo, D su quello grande */
const KA = [4 * Math.cos(190 * Math.PI / 180), 4 * Math.sin(190 * Math.PI / 180)];
const KB = [4 * Math.cos(350 * Math.PI / 180), 4 * Math.sin(350 * Math.PI / 180)];
/* quadrilatero inscritto: A a 280°, B a 340°, C a 60°, D trascinabile fra 80° e 260° (il quadrilatero resta convesso) */
const QA = [4 * Math.cos(280 * Math.PI / 180), 4 * Math.sin(280 * Math.PI / 180)];
const QB = [4 * Math.cos(340 * Math.PI / 180), 4 * Math.sin(340 * Math.PI / 180)];
const QC = [4 * Math.cos(60 * Math.PI / 180), 4 * Math.sin(60 * Math.PI / 180)];
const QD = ['4*cos(t*pi/180)', '4*sin(t*pi/180)'];
/* corde alla stessa distanza d dal centro: AB orizzontale, CD con la perpendicolare dal centro a 210° */
const SQ = 'sqrt(25-d^2)';
const CC = ['-0.8660254*d + 0.5*' + SQ, '-0.5*d - 0.8660254*' + SQ];
const CD = ['-0.8660254*d - 0.5*' + SQ, '-0.5*d + 0.8660254*' + SQ];
/* tangenti da P = (px; 0) alla circonferenza di centro O e raggio 3 */
const T1 = ['9/px', '3*sqrt(px^2-9)/px'], T2 = ['9/px', '-3*sqrt(px^2-9)/px'];
/* secante da P = (13; 0), raggio 5, inclinata di t gradi verso il basso: PA e PB misurati da P */
const COS = 'cos(t*pi/180)', SIN = 'sin(t*pi/180)', RQ = 'sqrt(169*' + COS + '^2-144)';
const SA = '(13*' + COS + ' - ' + RQ + ')', SB = '(13*' + COS + ' + ' + RQ + ')';
const SECA = ['13 - ' + SA + '*' + COS, '-' + SA + '*' + SIN], SECB = ['13 - ' + SB + '*' + COS, '-' + SB + '*' + SIN];
/* allenamento: una sola risposta numerica, ma con il tipo 'numeri', che pesca il numero dentro
   la scritta. Così passano anche «70°», «70 gradi», «20 cm» e «9π»; con 'numero' il segno ° la bocciava.
   In cambio non legge le radici («√64»): per questo il tasto √ non c'è, e i risultati sono numeri finiti. */
const gradi = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'in gradi, es. 40', simboli: ['°'] });
const num = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'solo il numero, es. 12', simboli: ['/'] });
/* aree: 'numero', perché la casella a un numero toglie l'unità in fondo («20 cm^2») e legge «25 π» con lo spazio */
const area = v => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: 'solo il numero, es. 12', simboli: ['/'] });
const conPi = v => ({ tipo: 'numero', valore: v * Math.PI, tolleranza: 0.01, segnaposto: 'con π, es. 4π', simboli: ['π'] });
const SI = { tipo: 'testo', accettate: ['sì', 'si', 'sì, è rettangolo', 'si, è rettangolo', 'sì è rettangolo', 'si è rettangolo', 'è rettangolo', 'rettangolo'], segnaposto: 'sì o no', simboli: [] };
COMPASSO.registra({
  id: 'geometria-piano-2',
  titolo: 'Geometria del piano 2',

  introduzione: R`Una scala appoggiata al muro, l'ombra di un albero, una pizza più grande dell'altra: dietro ci sono il teorema di Pitagora e la similitudine.

Si parte dalla circonferenza: corde, tangenti, angoli, poligoni che ci stanno dentro o intorno. Poi vengono le figure **equivalenti**, che hanno la stessa area senza essere uguali. Da lì nascono i teoremi di Pitagora e di Euclide, poi Talete e la similitudine.

I risultati li usi ancora oggi. Con Pitagora trovi la diagonale di uno schermo. Con la similitudine misuri un albero dalla sua ombra.

Ti servono la geometria del piano 1 (triangoli, congruenza, parallele, quadrilateri, luoghi), le proporzioni, le frazioni e le radici quadrate.`,

  inBreve: [
    R`Il centro sta sull'asse di ogni corda. Corde alla stessa distanza dal centro sono congruenti, e da un punto esterno partono due tangenti congruenti.`,
    R`L'angolo al centro è il doppio di quello alla circonferenza sullo stesso arco. Per questo un triangolo inscritto in una semicirconferenza è rettangolo.`,
    R`Un quadrilatero convesso è inscrivibile se gli angoli opposti sono supplementari, circoscrivibile se le somme dei lati opposti sono uguali.`,
    R`Figure equiscomponibili sono equivalenti: il parallelogramma vale quanto il rettangolo con la stessa base e la stessa altezza, il triangolo la metà.`,
    R`Pitagora: nel triangolo rettangolo $c^2=a^2+b^2$. Euclide: un cateto al quadrato è l'ipotenusa per la sua proiezione, e l'altezza al quadrato è il prodotto delle due proiezioni.`,
    R`Se due figure sono simili con rapporto $k$, i perimetri stanno nel rapporto $k$ e le aree nel rapporto $k^2$. Per due corde che si tagliano in $P$, $PA\cdot PB=PC\cdot PD$.`
  ],

  sezioni: [
    { id: 'circonferenza', titolo: 'Circonferenza, corde e tangenti', testo: R`La **circonferenza** è fatta dai punti che hanno la stessa distanza, il **raggio**, da un punto fisso, il **centro**. Il **cerchio** è la circonferenza con tutto quello che c'è dentro.

Una **corda** unisce due punti della circonferenza, che la dividono in due **archi**. Il **diametro** è la corda che passa per il centro.

### Le corde e il centro

Prendi una corda $AB$ in una circonferenza di centro $O$. I punti $A$ e $B$ distano tutti e due $r$ da $O$. Quindi $O$ sta sull'asse di $AB$, il luogo dei punti equidistanti da $A$ e da $B$.

>* L'asse di ogni corda passa per il centro. La perpendicolare a una corda condotta dal centro la divide a metà.

Chiama $H$ il piede della perpendicolare da $O$: $OH$ è la **distanza** della corda dal centro. Il triangolo $OHA$ è rettangolo in $H$, con ipotenusa $OA=r$. Con raggio $5$ e distanza $3$, metà corda è $\sqrt{25-9}=4$: la corda misura $8$.

>* **Corde e distanza dal centro.** Due corde sono congruenti se e solo se hanno la stessa distanza dal centro. Delle due, la più vicina al centro è la più lunga.

Ecco perché due corde $AB$ e $CD$ con la stessa distanza sono congruenti. Chiama $H$ e $K$ i piedi delle perpendicolari da $O$.

~ OA=OC :: sono due raggi
~ OH=OK :: le due corde hanno la stessa distanza dal centro
~ OHA\cong OKC :: triangoli rettangoli con l'ipotenusa e un cateto congruenti
~ AH=CK :: lati corrispondenti
~ \evidb{AB=CD} :: ogni corda è il doppio della sua metà

Il diametro, a distanza zero, è la corda più lunga.

[[grafico:cordeDistanza]]

?? In una circonferenza di raggio $10$ una corda dista $6$ dal centro. Quanto è lunga?
[x] $16$
[ ] $8$
[ ] $4$
[ ] $2\sqrt{34}$
=> Metà corda è $\sqrt{10^2-6^2}=\sqrt{64}=8$, e la corda è il doppio: $16$. Chi risponde $8$ si ferma a metà. $4$ è $10-6$, senza Pitagora. $2\sqrt{34}$ viene sommando i quadrati invece di sottrarli.

### Rette e circonferenza

Confronta la distanza $d$ della retta dal centro con il raggio $r$:

- $d<r$: la retta è **secante** (due punti in comune);
- $d=r$: la retta è **tangente** (un punto);
- $d>r$: la retta è **esterna** (nessun punto).

>* La **tangente** in un punto è **perpendicolare** al raggio che arriva in quel punto.

### Le tangenti da un punto esterno

Da un punto $P$ fuori dalla circonferenza partono **due** tangenti. Toccano la circonferenza nei punti $T_1$ e $T_2$.

~ O\widehat{T_1}P=O\widehat{T_2}P=90^\circ :: la tangente è perpendicolare al raggio
~ OT_1=OT_2 :: sono due raggi
~ OT_1P\cong OT_2P :: triangoli rettangoli con l'ipotenusa $OP$ in comune e un cateto congruente
~ \evidb{PT_1=PT_2} :: lati corrispondenti

>* I due **segmenti di tangente** condotti da un punto esterno sono congruenti. La retta $PO$ è la bisettrice dell'angolo fra le due tangenti.

Con raggio $3$ e $OP=5$ ognuno misura $\sqrt{25-9}=4$.

[[grafico:tangentiEsterne]]

### Due circonferenze

Due circonferenze hanno raggi $r_1>r_2$ e i centri a distanza $d$.

| posizione | condizione |
|---|---|
| esterne | $d>r_1+r_2$ |
| tangenti esternamente | $d=r_1+r_2$ |
| secanti | $r_1-r_2<d<r_1+r_2$ |
| tangenti internamente | $d=r_1-r_2$ |
| una dentro l'altra | $d<r_1-r_2$ |

Con raggi $5$ e $3$ sono tangenti esternamente se $d=8$, internamente se $d=2$.

>! Tangenti esternamente: i centri distano la **somma** dei raggi. Tangenti internamente: la **differenza**. Con $d=0$ le circonferenze sono **concentriche**.` },

    { id: 'angoli-circonferenza', titolo: 'Angoli al centro e alla circonferenza', testo: R`Prendi due punti $A$ e $B$ sulla circonferenza di centro $O$.

- $A\widehat{O}B$ ha il vertice nel centro: è un **angolo al centro**.
- $A\widehat{C}B$ ha il vertice $C$ sulla circonferenza: è un **angolo alla circonferenza**.

Tutti e due **insistono** sull'arco $AB$. Trascina $C$ lungo l'arco grande: l'angolo in $C$ non cambia, ed è la metà di $A\widehat{O}B$.

[[grafico:angoliCerchio]]

[[video:geometria-piano-2/angolo-alla-circonferenza]]

>* L'angolo al centro è il **doppio** dell'angolo alla circonferenza che insiste sullo stesso arco.

Perché il doppio? Guarda il caso in cui $CA$ è un diametro:

~ OC=OB :: sono due raggi
~ O\widehat{B}C=O\widehat{C}B=\alpha :: il triangolo $OBC$ è isoscele, quindi ha gli angoli alla base congruenti
~ A\widehat{O}B=\alpha+\alpha :: $A\widehat{O}B$ è un angolo esterno del triangolo $OBC$: per il secondo teorema dell'angolo esterno è la somma dei due interni non adiacenti
~ A\widehat{O}B=\evidb{2\alpha} :: l'angolo al centro è il doppio di quello in $C$

Se nessun lato dell'angolo passa per il centro, traccia il diametro $CE$. L'angolo in $C$ si spezza in due angoli, e per ognuno vale il caso appena visto.

- **Centro dentro l'angolo** $A\widehat{C}B$: si sommano i due pezzi. $A\widehat{O}B=A\widehat{O}E+E\widehat{O}B=2\,A\widehat{C}E+2\,E\widehat{C}B=2\,A\widehat{C}B$.
- **Centro fuori dall'angolo**, con $A$ più vicino a $E$: si sottraggono. $A\widehat{O}B=E\widehat{O}B-E\widehat{O}A=2\,E\widehat{C}B-2\,E\widehat{C}A=2\,A\widehat{C}B$.

Anche l'angolo al centro concavo rientra nel caso del centro dentro. È la somma di $A\widehat{O}E$ ed $E\widehat{O}B$, che insieme superano $180^\circ$.

>* Gli angoli alla circonferenza che insistono sullo stesso arco sono **congruenti**: sono tutti la metà dello stesso angolo al centro.

Angoli al centro congruenti stanno su archi congruenti, e le loro corde sono congruenti.

Se l'arco è una semicirconferenza, l'angolo al centro è piatto. Quindi l'angolo alla circonferenza è retto.

>* Un triangolo inscritto in una semicirconferenza, con un lato sul diametro, è **rettangolo**.

?? Un angolo alla circonferenza misura $40^\circ$. Quanto misura l'angolo al centro sullo stesso arco?
[x] $80^\circ$
[ ] $20^\circ$
[ ] $40^\circ$
[ ] $140^\circ$
=> L'angolo al centro è il doppio: $80^\circ$. Chi risponde $20^\circ$ ha dimezzato invece di raddoppiare. L'angolo con il vertice nel centro è sempre il più grande dei due.

### Angoli al centro più grandi di un angolo piatto

$A$ e $B$ dividono la circonferenza in due archi. Ognuno ha il suo angolo al centro, e insieme fanno un giro, $360^\circ$. L'angolo al centro dell'arco più grande è **concavo**: supera $180^\circ$.

Il teorema vale anche così. Nella figura l'arco piccolo $AB$ ha angolo al centro $160^\circ$, quello grande $360^\circ-160^\circ=200^\circ$.

- $D$ sta sull'arco grande: $A\widehat{D}B$ insiste sull'arco piccolo e misura $160^\circ:2=80^\circ$.
- $C$ sta sull'arco piccolo: $A\widehat{C}B$ insiste sull'arco grande e misura $200^\circ:2=100^\circ$.

[[grafico:angoloConcavo]]

Un angolo alla circonferenza è ottuso quando insiste su un arco più grande di una semicirconferenza. E $80^\circ+100^\circ=180^\circ$: non è un caso, lo ritrovi nei quadrilateri inscritti.

>! L'angolo in $C$ insiste sull'arco che **non** contiene $C$. Se $C$ sta sull'arco piccolo, il suo angolo è la metà dell'angolo al centro concavo.` },

    { id: 'punti-notevoli', titolo: 'I punti notevoli e il triangolo inscritto', testo: R`Un poligono è **inscritto** in una circonferenza se ha tutti i vertici sulla circonferenza. È **circoscritto** se tutti i suoi lati sono tangenti alla circonferenza.

In ogni triangolo ci sono quattro terne di linee speciali. Le tre linee di ogni terna si incontrano in un punto.

- Le **mediane** vanno da un vertice al punto medio del lato opposto. Si incontrano nel **baricentro**, che divide ogni mediana in due parti: una è il doppio dell'altra.
- Le **altezze** partono da un vertice e sono perpendicolari al lato opposto. Si incontrano nell'**ortocentro**.
- Le **bisettrici** dividono a metà gli angoli. Si incontrano nell'**incentro**, il centro della circonferenza inscritta.
- Gli **assi** sono le perpendicolari ai lati nel punto medio. Si incontrano nel **circocentro**, il centro della circonferenza circoscritta.

Per esempio, una mediana lunga $9$ è divisa dal baricentro in due pezzi di $6$ e $3$. Il pezzo lungo è quello verso il vertice.

### Il circocentro: ogni triangolo è inscrivibile

Perché i tre assi passano per lo stesso punto? Serve l'asse come luogo dei punti equidistanti, da Geometria del piano 1. Chiama $K$ il punto dove si tagliano gli assi di $AB$ e di $BC$.

~ KA=KB :: $K$ sta sull'asse di $AB$
~ KB=KC :: $K$ sta sull'asse di $BC$
~ KA=KC :: metto in fila le due uguaglianze
~ \evidb{K\ \text{sta sull'asse di}\ AC} :: è equidistante da $A$ e da $C$

$K$ ha la stessa distanza dai tre vertici. È il centro di una circonferenza che passa per $A$, $B$ e $C$.

>* Ogni triangolo è **inscrivibile** in una circonferenza, con centro nel circocentro. Ed è **circoscrivibile** a una circonferenza, con centro nell'incentro.

Per l'incentro il ragionamento è lo stesso. Si usa la bisettrice come luogo dei punti equidistanti dai lati.

Il circocentro sta dentro un triangolo acutangolo e fuori da un ottusangolo. Nel triangolo rettangolo è il **punto medio dell'ipotenusa**, perché l'ipotenusa è un diametro. Con cateti $6$ e $8$ l'ipotenusa è $10$: il raggio della circonferenza circoscritta è $5$.

>! Mediana, altezza e bisettrice dallo stesso vertice sono tre segmenti diversi. Coincidono solo nel triangolo isoscele, partendo dal vertice fra i lati congruenti.` },

    { id: 'quadrilateri-inscritti', titolo: 'Quadrilateri inscritti e circoscritti', testo: R`Un triangolo ha sempre la sua circonferenza circoscritta. Un quadrilatero no: per quattro punti presi a caso non passa nessuna circonferenza.

Un quadrilatero è **inscrivibile** se esiste una circonferenza che passa per i suoi quattro vertici.

[[video:geometria-piano-2/inscrivibile]]

>* Un quadrilatero convesso è **inscrivibile** in una circonferenza se e solo se i suoi angoli opposti sono **supplementari**: $\alpha+\gamma=180^\circ$ e $\beta+\delta=180^\circ$.

Ecco perché, se $ABCD$ è inscritto. I vertici $B$ e $D$ dividono la circonferenza in due archi. Chiama $\omega_1$ e $\omega_2$ i loro angoli al centro.

~ \omega_1+\omega_2=360^\circ :: i due archi formano tutta la circonferenza; uno dei due angoli al centro è concavo
~ \alpha=\frac{\omega_1}{2} :: $\alpha$, in $A$, insiste sull'arco che non contiene $A$
~ \gamma=\frac{\omega_2}{2} :: $\gamma$, in $C$, insiste sull'altro arco
~ \alpha+\gamma=\frac{\omega_1+\omega_2}{2}=\evidb{180^\circ} :: sommo e uso la prima riga

Per $\beta$ e $\delta$ basta un conto: gli angoli di un quadrilatero sommano $360^\circ$, quindi $\beta+\delta=360^\circ-180^\circ=180^\circ$.

Trascina $D$ sulla circonferenza: $\alpha$ e $\gamma$ cambiano, la loro somma no.

[[grafico:quadInscritto]]

Vale anche il viceversa, come nel video. Se $D$ esce dalla circonferenza, l'angolo $\delta$ cala e $\beta+\delta$ scende sotto $180^\circ$. Se entra, $\delta$ cresce e la somma supera $180^\circ$. Quindi con $\beta+\delta=180^\circ$ il punto $D$ può stare solo sulla circonferenza.

Rettangolo e trapezio isoscele sono sempre inscrivibili. Un parallelogramma lo è solo se è un rettangolo. I suoi angoli opposti sono congruenti, e sono anche supplementari solo se sono retti.

?? Il quadrilatero $ABCD$ è inscritto in una circonferenza, con $\alpha=70^\circ$ e $\beta=95^\circ$. Quanto misura $\gamma$?
[x] $110^\circ$
[ ] $70^\circ$
[ ] $85^\circ$
[ ] $95^\circ$
=> $\gamma$ è opposto ad $\alpha$: $180^\circ-70^\circ=110^\circ$. $85^\circ$ è $\delta$, l'angolo opposto a $\beta$. $70^\circ$ sarebbe giusto in un parallelogramma, dove gli angoli opposti sono congruenti.

### Quadrilateri circoscritti

Un quadrilatero è **circoscrivibile** se esiste una circonferenza tangente ai suoi quattro lati.

>* Un quadrilatero convesso è **circoscrivibile** a una circonferenza se e solo se le somme dei lati opposti sono uguali: $AB+CD=BC+DA$.

Una metà si vede con le tangenti da un punto esterno. Da ogni vertice partono due segmenti di tangente congruenti. Chiamali $x$ da $A$, $y$ da $B$, $z$ da $C$, $w$ da $D$.

~ AB=x+y,\quad CD=z+w :: ogni lato è fatto da due segmenti di tangente
~ BC=y+z,\quad DA=w+x :: lo stesso per gli altri due lati
~ AB+CD=\evidb{x+y+z+w}=BC+DA :: le due somme contengono gli stessi quattro pezzi

Il rombo è sempre circoscrivibile, perché ha i lati tutti congruenti. Un rettangolo lo è solo se è un quadrato. Un trapezio circoscritto con basi $10$ e $6$ ha i lati obliqui che insieme fanno $16$.

>! Inscritto e circoscritto si dicono guardando il poligono. Il quadrilatero è inscritto nella circonferenza, e la circonferenza è circoscritta al quadrilatero.` },

    { id: 'equivalenza', titolo: 'Figure equivalenti e aree', testo: R`Un rettangolo di lati $9$ e $4$ e un quadrato di lato $6$ non si sovrappongono. Eppure hanno la stessa area, $36$: sono due figure **equivalenti**.

>* Due figure sono **equivalenti** se hanno la stessa estensione, cioè la stessa area. Due figure congruenti sono anche equivalenti, ma non vale il contrario.

Come si dimostra che due figure sono equivalenti, senza misurarle? Si tagliano a pezzi.

>* Due figure sono **equiscomponibili** se si possono dividere in pezzi a due a due congruenti. Figure equiscomponibili sono equivalenti.

>! Il viceversa in generale non vale. Per i poligoni sì: due poligoni equivalenti sono sempre equiscomponibili, per il teorema di Bolyai–Gerwien. Per un cerchio no. Non lo puoi tagliare con le forbici in pezzi da ricomporre in un quadrato della stessa area.

[[video:geometria-piano-2/equivalenza]]

### Parallelogramma, triangolo, trapezio, rombo

- Un **parallelogramma** è equivalente al rettangolo con la stessa base e la stessa altezza. Si taglia un triangolo lungo un'altezza che cade sulla base, e lo si sposta dall'altra parte.
- Un **triangolo** è equivalente a metà del parallelogramma con la stessa base e la stessa altezza. Due copie congruenti del triangolo formano quel parallelogramma.
- Un **trapezio** è metà di un parallelogramma con base $B+b$ e la stessa altezza. Due copie congruenti del trapezio, una girata di mezzo giro, formano quel parallelogramma.
- Un **rombo** è metà del rettangolo che ha per lati le due diagonali.

Da qui vengono le formule delle aree, che partono tutte dal rettangolo: base per altezza.

| figura | area |
|---|---|
| parallelogramma | $b\cdot h$ |
| triangolo | $\frac{b\cdot h}{2}$ |
| trapezio | $\frac{(B+b)\cdot h}{2}$ |
| rombo | $\frac{d\cdot d'}{2}$ (diagonali) |

>* Triangoli con la stessa base e la stessa altezza sono equivalenti, anche se hanno forme diverse.

Nel triangolo la base può essere un lato qualunque. L'altezza è la distanza del vertice opposto dalla retta di **quel** lato.

Trascina il vertice $C$ in orizzontale: il triangolo cambia forma, ma base e altezza restano uguali, e quindi anche l'area.

[[grafico:areaTriangolo]]

Nel laboratorio «Il triangolo che si muove», in Geometria del piano 1, c'è un livello proprio così. La base è bloccata, e cerchi tre posizioni del vertice con la stessa area.

?? Un triangolo ha un lato di $6$ cm. Il vertice opposto dista $4$ cm dalla retta di quel lato, ma l'altezza cade fuori dal lato. Quanto vale l'area?
[x] $12\ \text{cm}^2$
[ ] $24\ \text{cm}^2$
[ ] non si può calcolare
=> $\frac{6\cdot4}{2}=12$. L'altezza è la distanza dalla **retta** della base, e può cadere fuori dal lato. La formula vale lo stesso. $24$ è l'area del parallelogramma: manca la divisione per $2$.

>! Equivalenti non vuol dire con lo stesso perimetro. Un rettangolo $1\times9$ e un quadrato di lato $3$ hanno tutti e due area $9$. I perimetri però sono $20$ e $12$.` },

    { id: 'pitagora-euclide', titolo: 'Il teorema di Pitagora e i teoremi di Euclide', testo: R`Una scala lunga $5$ metri è appoggiata al muro, con il piede a $3$ metri dal muro. Muro, pavimento e scala formano un triangolo rettangolo. La scala è l'ipotenusa, il lato opposto all'angolo retto.

Per trovare l'altezza $h$ scrivi $3^2+h^2=5^2$, quindi $h^2=25-9=16$ e $h=4$ metri.

>* **Teorema di Pitagora:** $$c^2=a^2+b^2$$ con $c$ ipotenusa e $a$, $b$ cateti.

Il video lo dimostra con le figure equivalenti. Dallo stesso quadrato di lato $a+b$ si tolgono quattro triangoli congruenti, in due modi diversi. Quello che resta vale $c^2$ in un caso, $a^2+b^2$ nell'altro.

[[video:geometria-piano-2/pitagora]]

[[animazione:pitagora]]

?? Un triangolo rettangolo ha ipotenusa $13$ e un cateto $5$. Quanto misura l'altro cateto?
[x] $12$
[ ] $\sqrt{194}$
[ ] $8$
[ ] $18$
=> $\sqrt{13^2-5^2}=\sqrt{169-25}=\sqrt{144}=12$. Per un cateto si fa la **differenza** dei quadrati; $\sqrt{194}$ viene dalla somma, come se $13$ fosse un cateto. $8$ e $18$ vengono dai lati senza elevare al quadrato.

C'è anche un livello del laboratorio «Il triangolo che si muove», in Geometria del piano 1. Lì costruisci i quadrati sui lati, con cateti $6$ e $8$.

### Il teorema inverso

I lati $5$, $12$, $13$ formano un triangolo rettangolo, perché $25+144=169$. Vale infatti anche il contrario: se il quadrato del lato più lungo è la somma degli altri due quadrati, il triangolo è rettangolo.

Trascina il vertice $C$. Quando $AC^2+BC^2=AB^2$, l'angolo in $C$ è retto e $C$ sta sulla semicirconferenza.

[[grafico:pitagoraInverso]]

### I teoremi di Euclide

Traccia l'altezza $h$ relativa all'ipotenusa. Divide l'ipotenusa $c$ in due pezzi, $m$ e $n$: sono le **proiezioni** dei cateti. La proiezione di un cateto è il pezzo di ipotenusa attaccato a lui.

[[animazione:euclide-primo]]

>* **Primo teorema di Euclide:** un cateto al quadrato è uguale all'ipotenusa per la sua proiezione: $b^2=c\cdot m$ e $a^2=c\cdot n$. **Secondo teorema di Euclide:** l'altezza al quadrato è il prodotto delle due proiezioni: $h^2=m\cdot n$.


Sul libro trovi spesso la stessa cosa scritta come proporzione: $c:b=b:m$. Per questo si dice che il cateto è **medio proporzionale** fra l'ipotenusa e la sua proiezione. Allo stesso modo l'altezza è medio proporzionale fra le due proiezioni.

Dal primo teorema viene fuori Pitagora:

~ b^2=c\cdot m :: primo teorema per il cateto $b$
~ a^2=c\cdot n :: primo teorema per il cateto $a$
~ a^2+b^2=c\cdot n+c\cdot m :: sommo membro a membro
~ a^2+b^2=c\,(\evid{m+n}) :: raccolgo $c$
~ a^2+b^2=c\cdot\evid{c}=\evidb{c^2} :: le due proiezioni, messe in fila, formano tutta l'ipotenusa

Il secondo teorema viene dal primo e da Pitagora. L'altezza $h$ e la proiezione $m$ sono i cateti di un triangolo rettangolo con ipotenusa $b$:

~ h^2=b^2-m^2 :: Pitagora nel triangolo che ha cateti $h$ e $m$
~ h^2=c\cdot m-m^2 :: primo teorema: $b^2=c\cdot m$
~ h^2=m\,(\evid{c-m})=\evidb{m\cdot n} :: raccolgo $m$; e $c-m$ è l'altra proiezione, $n$

Esempio: cateti $12$ e $16$. Trova ipotenusa, proiezioni e altezza.

~ c=\sqrt{144+256}=20 :: Pitagora
~ m=\frac{12^2}{20}=7{,}2 :: primo teorema per il cateto $12$: $m=\frac{b^2}{c}$
~ n=\frac{16^2}{20}=12{,}8 :: primo teorema per l'altro cateto; controllo: $7{,}2+12{,}8=20$
~ h=\sqrt{7{,}2\cdot12{,}8}=\evidb{9{,}6} :: secondo teorema

>! Ogni cateto va con la **sua** proiezione: $20\cdot7{,}2=144=12^2$. Con l'altra viene $20\cdot12{,}8=256=16^2$, il quadrato dell'altro cateto.

### Il primo teorema con l'equivalenza

Euclide lo enunciava con le figure. Il quadrato costruito su un cateto è **equivalente** al rettangolo che ha per lati l'ipotenusa e la proiezione. Il triangolo $ABC$ è rettangolo in $C$, con $AC=b$, $AB=c$ e $AH=m$. Il segno $\doteq$ vuol dire «è equivalente a».

- Sul cateto $AC$ costruisci il quadrato $ACDE$, dalla parte opposta a $B$.
- Dall'altra parte di $AB$ costruisci il rettangolo $AHKL$, con $AL=AB$.
- La perpendicolare ad $AB$ in $A$ taglia la retta $DE$ in $F$. Completa il parallelogramma $ACGF$, con $G$ sulla retta $DE$.

~ ACDE\doteq ACGF :: stessa base $AC$ e stessa altezza, perché $F$ e $G$ stanno sulla retta $DE$, parallela ad $AC$
~ AEF\cong ACB :: $AE=AC$, angoli retti in $E$ e in $C$, $E\widehat{A}F=C\widehat{A}B$ perché complementari di $C\widehat{A}F$: criterio ALA
~ AF=AB=AL :: lati corrispondenti; $AL=AB$ per costruzione
~ ACGF\doteq AHKL :: basi $AF$ e $AL$ congruenti sulla stessa retta; stessa altezza, la distanza di $C$ dalla retta $AL$, cioè $AH=m$
~ \evidb{b^2=c\cdot m} :: il quadrato di lato $b$ è equivalente al rettangolo di lati $c$ e $m$` },

    { id: 'talete-similitudine', titolo: 'Il teorema di Talete e la similitudine', testo: R`Un palo alto $3$ metri fa un'ombra di $2$ metri. Nello stesso momento un albero fa un'ombra di $10$ metri. Quanto è alto l'albero?

I raggi del sole arrivano paralleli, quindi i due triangoli hanno la stessa forma. L'ombra dell'albero è $5$ volte quella del palo. Allora anche l'albero è alto $5$ volte il palo: $15$ metri.

[[video:geometria-piano-2/piramide]]

>* **Teorema di Talete:** un fascio di rette parallele taglia due trasversali in segmenti proporzionali.

[[video:geometria-piano-2/talete]]

[[animazione:talete]]

Il piccolo teorema di Talete, in Geometria del piano 1, parlava di segmenti congruenti. Qui i segmenti sono proporzionali.

### Segmenti commensurabili e incommensurabili

Talete parla di **rapporti** fra segmenti. Per confrontare $AB$ e $CD$ cerchi un segmento $u$ che stia un numero intero di volte in tutti e due. Se $AB=4u$ e $CD=6u$, il rapporto è $\frac{AB}{CD}=\frac46=\frac23$.

>* Due segmenti sono **commensurabili** se hanno un sottomultiplo comune: il loro rapporto è un numero razionale. Se non ce l'hanno sono **incommensurabili**, e il rapporto è irrazionale.

Il lato $l$ e la diagonale $d$ di un quadrato sono incommensurabili. Per Pitagora $d^2=l^2+l^2=2l^2$, quindi $\frac{d}{l}=\sqrt2$. E $\sqrt2$ non è una frazione: la dimostrazione è in Insiemi numerici, fra i numeri irrazionali.

>! Incommensurabile non vuol dire impossibile da misurare. La diagonale del quadrato di lato $1$ misura esattamente $\sqrt2$. Ma nessun segmento $u$, per quanto piccolo, sta un numero intero di volte sia nel lato sia nella diagonale.

Il teorema di Talete vale anche per i segmenti incommensurabili. Per dimostrarlo in quel caso servono i numeri reali.

### La similitudine

Due figure sono **simili** se una è un ingrandimento dell'altra. Gli angoli corrispondenti sono congruenti. I lati corrispondenti sono moltiplicati tutti per lo stesso numero $k$, il **rapporto di similitudine**.

>* **Criteri di similitudine dei triangoli.** **Primo:** due angoli congruenti. **Secondo:** due lati in proporzione e l'angolo fra loro congruente. **Terzo:** i tre lati in proporzione.

### Perimetri e aree

Se i lati si moltiplicano per $k$, il perimetro si moltiplica per $k$. L'area invece si moltiplica per $k^2$:

~ A=\frac{b\cdot h}{2} :: area del triangolo di partenza
~ A'=\frac{\evid{k\,b}\cdot \evid{k\,h}}{2} :: nel triangolo simile base e altezza sono moltiplicate tutte e due per $k$
~ A'=\evidb{k^2}\cdot\frac{b\cdot h}{2}=k^2A :: i due $k$ si moltiplicano fra loro

>* Rapporto dei perimetri: $k$. Rapporto delle aree: $k^2$.

Trascina il vertice $B'$: quando i lati raddoppiano, l'area diventa quattro volte tanto.

[[grafico:simili]]

?? Una pizza ha diametro $30$ cm, un'altra $15$ cm. Quante pizze piccole fanno una pizza grande?
[x] $4$
[ ] $2$
[ ] $3{,}14$
=> Le due pizze sono simili con $k=2$, quindi le aree stanno nel rapporto $k^2=4$. Chi risponde $2$ confronta i diametri, non le superfici.

>! Se raddoppi i lati, l'area non raddoppia: si moltiplica per $4$.` },

    { id: 'corde-secanti', titolo: 'Corde, secanti e tangente', testo: R`La similitudine entra anche nella circonferenza. Prendi due corde, due secanti, oppure una secante e una tangente che passano per lo stesso punto $P$. C'è un prodotto che non cambia.

### Due corde che si tagliano

Le corde $AB$ e $CD$ si incontrano in un punto $P$ dentro la circonferenza.

[[video:geometria-piano-2/corde]]

>* **Teorema delle corde.** Se due corde $AB$ e $CD$ si tagliano in $P$, allora $PA\cdot PB=PC\cdot PD$.

Unisci $A$ con $C$ e $B$ con $D$. I triangoli $APC$ e $DPB$ sono simili:

~ A\widehat{P}C=D\widehat{P}B :: sono opposti al vertice
~ P\widehat{A}C=P\widehat{D}B :: angoli alla circonferenza che insistono sullo stesso arco $BC$
~ APC\sim DPB :: due angoli congruenti: primo criterio di similitudine
~ \frac{PA}{PD}=\frac{PC}{PB} :: lati corrispondenti in proporzione
~ \evidb{PA\cdot PB=PC\cdot PD} :: in una proporzione il prodotto dei medi è uguale al prodotto degli estremi

Esempio: $PA=3$, $PB=8$ e $PC=4$. Allora $3\cdot8=4\cdot PD$, quindi $PD=6$.

Nel video il prodotto vale $21=5^2-2^2$: il quadrato del raggio meno il quadrato di $OP$. Succede sempre, per ogni corda che passa per $P$: $PA\cdot PB=r^2-OP^2$. Lo dimostriamo in fondo alla sezione.

### Due secanti da un punto esterno

Da un punto $P$ fuori dalla circonferenza partono due secanti. La prima taglia la circonferenza in $A$ e $B$, la seconda in $C$ e $D$. I punti $A$ e $C$ sono i più vicini a $P$.

>* **Teorema delle secanti.** $PA\cdot PB=PC\cdot PD$. I segmenti partono tutti da $P$.

La dimostrazione è la stessa. I triangoli $PAD$ e $PCB$ hanno l'angolo in $P$ in comune. Gli angoli in $D$ e in $B$ insistono sullo stesso arco $AC$. Quindi $PAD\sim PCB$, e da $\frac{PA}{PC}=\frac{PD}{PB}$ viene il prodotto.

### La tangente

Ora fai girare la seconda secante finché diventa tangente in $T$. I punti $C$ e $D$ si avvicinano e finiscono tutti e due in $T$. Il prodotto $PC\cdot PD$ diventa $PT\cdot PT$.

>* **Teorema della tangente.** $PT^2=PA\cdot PB$: il segmento di tangente è medio proporzionale fra i due segmenti della secante.

Muovi l'inclinazione: la secante gira, $PA$ e $PB$ cambiano, ma il prodotto resta $144=12^2$.

[[grafico:secanteTangente]]

Qui il raggio è $5$ e $OP=13$. Il triangolo $OTP$ è rettangolo in $T$, e per Pitagora $PT^2=13^2-5^2=144$.

### Perché il prodotto non cambia

Chiama $H$ il punto medio della corda $AB$: $OH$ è perpendicolare alla secante. Con $P$ esterno e $A$ più vicino a $P$, $PA=PH-AH$ e $PB=PH+AH$.

~ PA\cdot PB=(PH-AH)(PH+AH)=PH^2-AH^2 :: somma per differenza
~ PH^2=OP^2-OH^2 :: Pitagora nel triangolo $OHP$, rettangolo in $H$
~ AH^2=r^2-OH^2 :: Pitagora nel triangolo $OHA$, che ha per ipotenusa il raggio
~ PA\cdot PB=OP^2-r^2 :: sottraggo: $OH^2$ se ne va
~ \evidb{PA\cdot PB=PT^2} :: Pitagora nel triangolo $OTP$: $PT^2=OP^2-r^2$

Il prodotto dipende solo da $OP$ e dal raggio, non dalla secante scelta: ecco il teorema delle secanti e quello della tangente. Con $P$ interno i conti sono gli stessi, ma $PA=AH-PH$. Viene $PA\cdot PB=AH^2-PH^2=r^2-OP^2$, come nel video.

?? Da $P$ una secante taglia la circonferenza in $A$ e $B$, con $PA=4$ e $AB=5$. Quanto misura il segmento di tangente $PT$?
[x] $6$
[ ] $\sqrt{20}$
[ ] $\sqrt{41}$
[ ] $9$
=> $PB=PA+AB=9$, quindi $PT^2=4\cdot9=36$ e $PT=6$. $\sqrt{20}$ viene da $4\cdot5$, con la corda $AB$ al posto di $PB$. $\sqrt{41}$ usa Pitagora dove non c'entra, e $9$ è $PB$.

>! I segmenti si misurano **sempre da $P$**. Nel teorema delle secanti si moltiplica $PA$ per $PB$, l'intera secante, non per la corda $AB$.` },

    { id: 'poligoni-regolari-cerchio', titolo: 'Poligoni regolari, circonferenza e cerchio', testo: R`Un poligono è **regolare** se ha i lati tutti congruenti e gli angoli tutti congruenti. Gli angoli interni di un poligono di $n$ lati sommano $(n-2)\cdot180^\circ$, come in Geometria del piano 1. Nell'esagono regolare ognuno misura $720^\circ:6=120^\circ$.

>* Ogni poligono regolare è inscrivibile in una circonferenza e circoscrivibile a un'altra. Le due circonferenze hanno lo stesso centro, il **centro** del poligono.

Il raggio della circonferenza inscritta si chiama **apotema**: è la distanza del centro da ogni lato.

Unisci il centro con i vertici. Il poligono si divide in $n$ triangoli isosceli congruenti, con base un lato $l$ e altezza l'apotema $a$.

~ A=n\cdot\frac{l\cdot a}{2} :: $n$ triangoli di base $l$ e altezza $a$
~ A=\frac{(\evid{n\cdot l})\cdot a}{2} :: $n\cdot l$ è il perimetro $2p$
~ A=\evidb{p\cdot a} :: semiperimetro per apotema

Nell'esagono regolare l'angolo al centro di ogni triangolo è $360^\circ:6=60^\circ$. I sei triangoli sono **equilateri**, quindi il lato è uguale al raggio. Un esagono regolare di lato $10$ ha apotema $\sqrt{100-25}=\sqrt{75}\approx8{,}66$ e area $30\cdot8{,}66\approx260$.

### Circonferenza e cerchio

Con raggio $5$ cm la circonferenza è lunga $2\pi\cdot5=10\pi\approx31{,}4$ cm. Il cerchio ha area $\pi\cdot5^2=25\pi\approx78{,}5\ \text{cm}^2$.

>* $$C=2\pi r\qquad A=\pi r^2$$

L'animazione taglia il cerchio in spicchi e li mette in fila. Viene quasi un rettangolo di base $\pi r$ e altezza $r$.

[[animazione:area-cerchio]]

L'esagono inscritto ha perimetro $6r$, più corto della circonferenza. Quindi $2\pi r>6r$, cioè $\pi>3$. Con poligoni inscritti e circoscritti di $96$ lati, Archimede trovò $3{,}1408<\pi<3{,}1429$.

### Archi e settori

Un **settore circolare** è la parte di cerchio fra due raggi. Il suo arco e la sua area sono proporzionali all'angolo al centro $\alpha$.

>* $$\ell=2\pi r\cdot\frac{\alpha}{360^\circ}\qquad A_{\text{settore}}=\pi r^2\cdot\frac{\alpha}{360^\circ}$$

Con $r=3$ e $\alpha=60^\circ$ si prende un sesto di tutto. L'arco è $6\pi:6=\pi$, il settore $9\pi:6=\frac32\pi$.

>! $\pi$ vale **circa** $3{,}14$: ha infinite cifre decimali. Nei conti tieni $\pi$ fino alla fine, per esempio $25\pi$. Approssima solo il risultato.` }
  ],

  grafici: {
    cordeDistanza: {
      tipo: 'piano', x: [-6, 6], y: [-6, 6], assi: false, griglia: false,
      parametri: [ { nome: 'd', min: 0.5, max: 4.5, passo: 0.5, valore: 3, etichetta: 'distanza dal centro' } ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 5, colore: 1 },
        { tipo: 'segmento', da: ['-' + SQ, 'd'], a: [SQ, 'd'], colore: 2 },
        { tipo: 'segmento', da: CC, a: CD, colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: [0, 'd'], tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: [0, 0], a: ['-0.8660254*d', '-0.5*d'], tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: [0, 0], a: [SQ, 'd'], colore: 3 },
        { tipo: 'angolo', vertice: [0, 'd'], da: [0, 0], a: [SQ, 'd'], raggio: 0.45, colore: 4 },
        { tipo: 'angolo', vertice: ['-0.8660254*d', '-0.5*d'], da: [0, 0], a: CC, raggio: 0.45, colore: 4 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'destra' },
        { tipo: 'punto', p: [SQ, 'd'], etichetta: 'A', posizione: 'destra' },
        { tipo: 'punto', p: ['-' + SQ, 'd'], etichetta: 'B', posizione: 'sinistra' },
        { tipo: 'punto', p: [0, 'd'], etichetta: 'H', posizione: 'alto' },
        { tipo: 'punto', p: CC, etichetta: 'C', posizione: 'basso' },
        { tipo: 'punto', p: CD, etichetta: 'D', posizione: 'sinistra' },
        { tipo: 'punto', p: ['-0.8660254*d', '-0.5*d'], etichetta: 'K', posizione: 'basso-destra' },
        { tipo: 'testo', p: [-5.8, -5.6], testo: 'OH = OK = {{d}}', ancora: 'start' },
        { tipo: 'testo', p: [5.8, -5.6], testo: 'AB = CD = {{2*sqrt(25-d^2)}}', ancora: 'end' }
      ],
      didascalia: 'Raggio 5. Le corde AB e CD hanno la stessa distanza dal centro e restano congruenti. Più si allontanano dal centro, più si accorciano: con distanza 3 misurano 8. Vicino al centro si avvicinano al diametro, lungo 10.'
    },
    tangentiEsterne: {
      tipo: 'piano', x: [-4, 10], y: [-4.5, 4.5], assi: false, griglia: false,
      parametri: [ { nome: 'px', min: 3.5, max: 9.5, passo: 0.5, valore: 5, nascosto: true } ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: ['px', 0], tratteggio: true, colore: 4 },
        { tipo: 'segmento', da: ['px', 0], a: T1, colore: 2 },
        { tipo: 'segmento', da: ['px', 0], a: T2, colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: T1, colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: T2, colore: 3 },
        { tipo: 'angolo', vertice: T1, da: [0, 0], a: ['px', 0], raggio: 0.45, colore: 3 },
        { tipo: 'angolo', vertice: T2, da: [0, 0], a: ['px', 0], raggio: 0.45, colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso' },
        { tipo: 'punto', p: T1, etichetta: 'T₁', posizione: 'alto' },
        { tipo: 'punto', p: T2, etichetta: 'T₂', posizione: 'basso' },
        { tipo: 'punto', p: ['px', 0], trascina: true, etichetta: 'P', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [-3.8, 4.1], testo: 'OP = {{px}}', ancora: 'start' },
        { tipo: 'testo', p: [9.8, 4.1], testo: 'PT₁ = PT₂ = {{sqrt(px^2-9)}}', ancora: 'end' }
      ],
      didascalia: 'Raggio 3. Trascina P: i due segmenti di tangente restano congruenti, e ciascuno è perpendicolare al raggio nel punto di contatto. Con OP = 5 misurano 4.'
    },
    angoliCerchio: {
      tipo: 'piano', x: [-5.5, 5.5], y: [-5.5, 5.5], assi: false, griglia: false,
      parametri: [
        { nome: 't', min: 0, max: 360, passo: 1, valore: 250, nascosto: true },
        { nome: 'w', min: 20, max: 180, passo: 2, valore: 100, etichetta: 'angolo AOB (°)' }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 4, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: PA, colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: PB, colore: 2 },
        { tipo: 'segmento', da: PC, a: PA, colore: 3 },
        { tipo: 'segmento', da: PC, a: PB, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: PB, a: PA, raggio: 0.9, colore: 2 },
        { tipo: 'angolo', vertice: PC, da: PA, a: PB, raggio: 0.9, colore: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-destra' },
        { tipo: 'punto', p: PA, etichetta: 'A', posizione: 'alto-sinistra' },
        { tipo: 'punto', p: PB, etichetta: 'B', posizione: 'alto-destra' },
        { tipo: 'punto', p: PC, etichetta: 'C', posizione: 'basso', colore: 3, trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true } },
        { tipo: 'testo', p: [-5.3, 5.1], testo: 'angolo AOB = {{w}}°', ancora: 'start' },
        { tipo: 'testo', p: [-5.3, 4.4], testo: 'angolo ACB = {{' + ANG(PC, PA, PB) + '}}°', ancora: 'start' }
      ],
      didascalia: "Trascina C lungo la circonferenza: sull'arco grande l'angolo in C resta la metà di AOB. Porta AOB a 180°: l'angolo in C è retto. Sull'arco piccolo, invece, diventa 180° meno quella metà."
    },
    angoloConcavo: {
      tipo: 'piano', x: [-5.5, 5.5], y: [-5.5, 5.5], assi: false, griglia: false,
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 4, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: KA, colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: KB, colore: 2 },
        { tipo: 'angolo', vertice: [0, 0], da: KB, a: [0, 4], raggio: 0.9, colore: 2 },
        { tipo: 'angolo', vertice: [0, 0], da: [0, 4], a: KA, raggio: 0.9, colore: 2 },
        { tipo: 'segmento', da: [0, -4], a: KA, colore: 3 },
        { tipo: 'segmento', da: [0, -4], a: KB, colore: 3 },
        { tipo: 'angolo', vertice: [0, -4], da: KB, a: KA, raggio: 0.9, colore: 3, etichetta: '100°' },
        { tipo: 'segmento', da: [0, 4], a: KA, colore: 4 },
        { tipo: 'segmento', da: [0, 4], a: KB, colore: 4 },
        { tipo: 'angolo', vertice: [0, 4], da: KA, a: KB, raggio: 0.9, colore: 4, etichetta: '80°' },
        { tipo: 'testo', p: [0, 1.4], testo: '200°' },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso' },
        { tipo: 'punto', p: KA, etichetta: 'A', posizione: 'sinistra' },
        { tipo: 'punto', p: KB, etichetta: 'B', posizione: 'destra' },
        { tipo: 'punto', p: [0, -4], etichetta: 'C', posizione: 'basso', colore: 3 },
        { tipo: 'punto', p: [0, 4], etichetta: 'D', posizione: 'alto', colore: 4 }
      ],
      didascalia: "L'arco piccolo AB ha angolo al centro 160°, quello grande 200°: un angolo concavo. L'angolo in C, sull'arco piccolo, insiste sull'arco grande e ne è la metà, 100°. L'angolo in D insiste sull'arco piccolo: 80°."
    },
    quadInscritto: {
      tipo: 'piano', x: [-5.5, 5.5], y: [-6.5, 5.5], assi: false, griglia: false,
      parametri: [ { nome: 't', min: 80, max: 260, passo: 1, valore: 150, nascosto: true } ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 4, colore: 1, tratteggio: true },
        { tipo: 'poligono', punti: [QA, QB, QC, QD], etichette: ['', '', '', ''], colore: 1 },
        { tipo: 'angolo', vertice: QA, da: QB, a: QD, raggio: 0.8, colore: 2, etichetta: 'α' },
        { tipo: 'angolo', vertice: QC, da: QD, a: QB, raggio: 0.8, colore: 2, etichetta: 'γ' },
        { tipo: 'angolo', vertice: QB, da: QC, a: QA, raggio: 0.6, colore: 3, etichetta: 'β' },
        { tipo: 'angolo', vertice: QD, da: QA, a: QC, raggio: 0.6, colore: 3, etichetta: 'δ' },
        { tipo: 'punto', p: QA, etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: QB, etichetta: 'B', posizione: 'destra' },
        { tipo: 'punto', p: QC, etichetta: 'C', posizione: 'alto-destra' },
        { tipo: 'punto', p: QD, etichetta: 'D', posizione: 'alto-sinistra', colore: 2, trascina: true, giro: { parametro: 't', centro: [0, 0], gradi: true } },
        { tipo: 'testo', p: [-5.3, -5.7], testo: 'α = {{' + ANG(QA, QB, QD) + '}}°   γ = {{' + ANG(QC, QD, QB) + '}}°', ancora: 'start' },
        { tipo: 'testo', p: [-5.3, -6.4], testo: 'α + γ = {{' + ANG(QA, QB, QD) + ' + ' + ANG(QC, QD, QB) + '}}°   β + δ = {{' + ANG(QB, QC, QA) + ' + ' + ANG(QD, QA, QC) + '}}°', ancora: 'start' }
      ],
      didascalia: 'Trascina D sulla circonferenza: α e γ cambiano, ma la loro somma resta 180°. Lo stesso per β e δ.'
    },
    pitagoraInverso: {
      tipo: 'piano', x: [-2.5, 7.5], y: [-1, 5.5], assi: false, proporzioni: 'uguali',
      parametri: [
        { nome: 'cx', min: -2, max: 7, passo: 0.5, valore: 3, nascosto: true },
        { nome: 'cy', min: 0.5, max: 5, passo: 0.5, valore: 3.5, nascosto: true }
      ],
      elementi: [
        { tipo: 'cerchio', centro: [2.5, 0], raggio: 2.5, tratteggio: true, colore: 4 },
        { tipo: 'poligono', punti: [[0, 0], [5, 0], ['cx', 'cy']], etichette: ['A', 'B', ''], colore: 1 },
        { tipo: 'angolo', vertice: ['cx', 'cy'], da: [0, 0], a: [5, 0], raggio: 0.6, colore: 2 },
        { tipo: 'punto', p: ['cx', 'cy'], trascina: true, etichetta: 'C', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-2.3, -0.6], testo: 'C = ({{cx}}; {{cy}})', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 5.1], testo: 'AC² + BC² = {{cx^2 + cy^2 + (cx-5)^2 + cy^2}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 4.4], testo: 'AB² = 25', ancora: 'start' },
        { tipo: 'testo', p: [-2.3, 3.7], testo: 'angolo in C = {{' + ANG(['cx', 'cy'], [0, 0], [5, 0]) + '}}°', ancora: 'start' }
      ],
      didascalia: "Trascina C. La somma AC² + BC² vale 25 solo quando C è sulla semicirconferenza, e lì l'angolo in C è retto: prova (4; 2), (1; 2), (2,5; 2,5)."
    },
    simili: {
      tipo: 'piano', x: [-0.5, 12], y: [-0.8, 6.5], assi: false, griglia: false,
      parametri: [ { nome: 'bx', min: 4.5, max: 11.5, passo: 0.5, valore: 7.5, nascosto: true } ],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [2, 0], [0, 1.5]], etichette: ['A', 'B', 'C'], colore: 1 },
        { tipo: 'poligono', punti: [[3.5, 0], ['bx', 0], [3.5, '0.75*(bx - 3.5)']], etichette: ['A′', '', 'C′'], colore: 2 },
        { tipo: 'punto', p: ['bx', 0], trascina: true, etichetta: 'B′', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [11.8, 6.0], testo: 'lati × {{(bx - 3.5)/2}}', ancora: 'end' },
        { tipo: 'testo', p: [11.8, 5.2], testo: 'perimetro × {{(bx - 3.5)/2}}', ancora: 'end' },
        { tipo: 'testo', p: [11.8, 4.4], testo: 'area × {{((bx - 3.5)/2)^2}}', ancora: 'end' }
      ],
      didascalia: "Trascina B′ per ingrandire A′B′C′, che resta simile ad ABC. Con i lati × 2 l'area è × 4; con i lati × 3 è × 9."
    },
    secanteTangente: {
      tipo: 'piano', x: [-6, 14], y: [-8.5, 6], assi: false, griglia: false,
      parametri: [ { nome: 't', min: 0, max: 22, passo: 1, valore: 12, etichetta: 'inclinazione della secante (°)' } ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 5, colore: 1 },
        { tipo: 'segmento', da: [13, 0], a: SECB, colore: 2 },
        { tipo: 'segmento', da: [13, 0], a: [25 / 13, 60 / 13], colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: [25 / 13, 60 / 13], tratteggio: true, colore: 4 },
        { tipo: 'angolo', vertice: [25 / 13, 60 / 13], da: [0, 0], a: [13, 0], raggio: 0.5, colore: 4 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso' },
        { tipo: 'punto', p: [13, 0], etichetta: 'P', posizione: 'destra' },
        { tipo: 'punto', p: [25 / 13, 60 / 13], etichetta: 'T', posizione: 'alto' },
        { tipo: 'punto', p: SECA, etichetta: 'A', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: SECB, etichetta: 'B', posizione: 'basso-sinistra', colore: 2 },
        { tipo: 'testo', p: [13.8, -6.4], testo: 'PA = {{' + SA + '}}   PB = {{' + SB + '}}', ancora: 'end' },
        { tipo: 'testo', p: [13.8, -7.4], testo: 'PA · PB = {{' + SA + '*' + SB + '}}', ancora: 'end' },
        { tipo: 'testo', p: [13.8, -8.3], testo: 'PT = 12, PT² = 144', ancora: 'end' }
      ],
      didascalia: 'Raggio 5, OP = 13. La secante gira intorno a P: PA e PB cambiano, il loro prodotto resta 144, il quadrato della tangente PT.'
    },
    areaTriangolo: {
      tipo: 'piano', x: [-2, 8], y: [-6, 7], assi: false,
      parametri: [
        { nome: 'cx', min: -1, max: 7, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'cy', min: -6, max: 6, passo: 0.5, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [6, 0], etichetta: 'B', posizione: 'basso' },
        { tipo: 'punto', p: ['cx', 'cy'], trascina: true, etichetta: 'C', posizione: 'alto', colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: [6, 0], etichetta: 'AB = 6' },
        { tipo: 'segmento', da: [0, 0], a: ['cx', 'cy'], colore: 1 },
        { tipo: 'segmento', da: [6, 0], a: ['cx', 'cy'], colore: 1 },
        { tipo: 'segmento', da: ['cx', 'cy'], a: ['cx', 0], tratteggio: true, etichetta: 'h', colore: 4 },
        { tipo: 'testo', p: [-1.8, 6.3], testo: 'area = {{3*abs(cy)}}', ancora: 'start' }
      ],
      didascalia: "Trascina C in orizzontale: la forma cambia, l'area no, perché l'altezza resta la stessa. In verticale invece l'area cresce con l'altezza h."
    }
  },
  esempi: [
    { titolo: 'Una corda e la sua distanza dal centro', problema: R`In una circonferenza di raggio $17\ \text{cm}$ una corda misura $30\ \text{cm}$. Quanto dista dal centro?`, passi: [
      R`La perpendicolare alla corda condotta dal centro $O$ la divide a metà nel punto $H$: ogni metà misura $15\ \text{cm}$.`,
      R`Il triangolo $OHA$, con $A$ estremo della corda, è rettangolo in $H$. L'ipotenusa è il raggio $OA=17\ \text{cm}$.`,
      R`Per Pitagora $OH=\sqrt{17^2-15^2}=\sqrt{289-225}=\sqrt{64}=8\ \text{cm}$.`
    ], risultato: R`La corda dista $8\ \text{cm}$ dal centro.` },

    { titolo: 'Gli angoli di un quadrilatero inscritto', problema: R`Il quadrilatero $ABCD$ è inscritto in una circonferenza. L'angolo in $A$ misura $85^\circ$, e l'angolo in $B$ è il doppio dell'angolo in $D$. Trova gli altri tre angoli.`, passi: [
      R`In un quadrilatero inscritto gli angoli opposti sono supplementari. $C$ è opposto ad $A$: $\gamma=180^\circ-85^\circ=95^\circ$.`,
      R`Anche $B$ e $D$ sono opposti: $\beta+\delta=180^\circ$. Con $\beta=2\delta$ viene $3\delta=180^\circ$, cioè $\delta=60^\circ$.`,
      R`Quindi $\beta=120^\circ$. Controllo: $85^\circ+120^\circ+95^\circ+60^\circ=360^\circ$. ✓`
    ], risultato: R`$\beta=120^\circ$, $\gamma=95^\circ$, $\delta=60^\circ$.` },

    { titolo: 'Riconoscere un triangolo rettangolo dai lati', problema: R`Un triangolo ha lati $8\ \text{cm}$, $15\ \text{cm}$ e $17\ \text{cm}$. È un triangolo rettangolo?`, passi: [
      R`Si applica il teorema di Pitagora *inverso*: se il quadrato del lato maggiore è uguale alla somma dei quadrati degli altri due, il triangolo è rettangolo.`,
      R`Il lato maggiore è $17\ \text{cm}$: $17^2 = 289$.`,
      R`Gli altri due: $8^2 + 15^2 = 64 + 225 = 289$.`,
      R`I due valori coincidono: il triangolo è rettangolo, con l'angolo retto opposto al lato di $17\ \text{cm}$.`
    ], risultato: R`Sì, è un triangolo rettangolo, perché $8^2 + 15^2 = 17^2$.` },

    { titolo: 'I teoremi di Euclide, insieme', problema: R`In un triangolo rettangolo i cateti misurano $15\ \text{cm}$ e $20\ \text{cm}$. Trova le proiezioni dei cateti sull'ipotenusa e l'altezza relativa a essa.`, passi: [
      R`Prima serve l'ipotenusa, con il teorema di Pitagora: $c = \sqrt{15^2+20^2} = \sqrt{225+400} = \sqrt{625} = 25\ \text{cm}$.`,
      R`Dal primo teorema di Euclide, $b^2 = c\cdot m$, si ricava la proiezione: $m = \dfrac{b^2}{c}$. Per il cateto di $15\ \text{cm}$: $m = \dfrac{225}{25} = 9\ \text{cm}$.`,
      R`Per il cateto di $20\ \text{cm}$: $n = \dfrac{400}{25} = 16\ \text{cm}$. Controllo: $m+n = 9+16=25\ \text{cm}$, l'intera ipotenusa. ✓`,
      R`Dal secondo teorema di Euclide, $h^2 = m\cdot n = 9 \cdot 16 = 144$, quindi $h = 12\ \text{cm}$.`,
      R`Controllo con l'area: $\dfrac{15\cdot20}{2}=150$ e $\dfrac{25\cdot12}{2}=150$. ✓`
    ], risultato: R`Proiezioni $9\ \text{cm}$ e $16\ \text{cm}$; altezza relativa all'ipotenusa $12\ \text{cm}$.` },

    { titolo: 'Similitudine: trovare i lati mancanti', problema: R`Il triangolo $ABC$, con $AB = 4\ \text{cm}$, $BC = 6\ \text{cm}$ e $CA = 8\ \text{cm}$, è simile al triangolo $A'B'C'$, in cui $A'B' = 6\ \text{cm}$. Quanto misurano $B'C'$ e $C'A'$?`, passi: [
      R`Il rapporto di similitudine si trova dal lato corrispondente noto: $k = \dfrac{A'B'}{AB} = \dfrac{6}{4} = 1{,}5$.`,
      R`Tutti i lati del secondo triangolo sono quelli del primo moltiplicati per $k$: $B'C' = 6 \cdot 1{,}5 = 9\ \text{cm}$.`,
      R`$C'A' = 8 \cdot 1{,}5 = 12\ \text{cm}$.`
    ], risultato: R`$B'C' = 9\ \text{cm}$ e $C'A' = 12\ \text{cm}$.` },

    { titolo: 'Tangente e secante per il centro', problema: R`Da un punto $P$ esterno il segmento di tangente misura $PT=8$. La secante da $P$ che passa per il centro $O$ incontra la circonferenza in $A$ e $B$, con $PA=4$. Trova il raggio e la distanza $OP$.`, passi: [
      R`Teorema della tangente: $PT^2=PA\cdot PB$, cioè $64=4\cdot PB$. Quindi $PB=16$.`,
      R`La secante passa per il centro: $AB$ è un diametro. $AB=PB-PA=16-4=12$, quindi il raggio è $6$.`,
      R`$OP=PA+r=4+6=10$.`,
      R`Controllo con Pitagora nel triangolo $OTP$, rettangolo in $T$: $6^2+8^2=36+64=100=10^2$. ✓`
    ], risultato: R`Raggio $6$, distanza $OP=10$.` }
  ],

  formulario: [
    { nome: 'Corda e distanza dal centro', formula: R`\left(\frac{AB}{2}\right)^2+d^2=r^2`, nota: R`$d$ = distanza della corda $AB$ dal centro, $r$ = raggio.` },
    { nome: 'Angolo al centro e angolo alla circonferenza', formula: R`A\widehat{O}B=2\cdot A\widehat{C}B`, nota: R`Sullo stesso arco $AB$. Vale anche quando l'angolo al centro è concavo.` },
    { nome: 'Quadrilatero inscrivibile', formula: R`\alpha+\gamma=\beta+\delta=180^\circ`, nota: R`Condizione necessaria e sufficiente per un quadrilatero convesso.` },
    { nome: 'Quadrilatero circoscrivibile', formula: R`AB+CD=BC+DA`, nota: R`Somme dei lati opposti uguali: condizione necessaria e sufficiente per un quadrilatero convesso.` },
    { nome: 'Area del triangolo', formula: R`\frac{b \cdot h}{2}`, nota: R`$b$ = un lato qualsiasi (base), $h$ = altezza relativa a quel lato.` },
    { nome: 'Area del trapezio', formula: R`\frac{(B + b)\cdot h}{2}`, nota: R`$B$, $b$ = basi maggiore e minore, $h$ = altezza.` },
    { nome: 'Area del rombo', formula: R`\frac{d \cdot d'}{2}`, nota: R`$d$, $d'$ = le due diagonali.` },
    { nome: 'Teorema di Pitagora', formula: R`c^2 = a^2 + b^2`, nota: R`$c$ = ipotenusa, $a$, $b$ = cateti.` },
    { nome: 'Teoremi di Euclide', formula: R`b^2 = c \cdot m \qquad h^2 = m \cdot n`, nota: R`Primo: $m$ = proiezione del cateto $b$ sull'ipotenusa $c$. Secondo: $h$ = altezza relativa all'ipotenusa, $m$ e $n$ = proiezioni dei cateti.` },
    { nome: 'Figure simili: perimetri e aree', formula: R`\frac{2p'}{2p} = k \qquad \frac{A'}{A} = k^2`, nota: R`$k$ = rapporto di similitudine, cioè il rapporto fra due lati corrispondenti.` },
    { nome: 'Teoremi delle corde e delle secanti', formula: R`PA\cdot PB=PC\cdot PD`, nota: R`Corde che si tagliano in $P$, oppure secanti da $P$ esterno. I segmenti partono tutti da $P$.` },
    { nome: 'Teorema della tangente', formula: R`PT^2=PA\cdot PB`, nota: R`$PT$ = segmento di tangente da $P$; $PA$ e $PB$ = segmenti di una secante da $P$.` },
    { nome: 'Area di un poligono regolare', formula: R`A=p\cdot a`, nota: R`$p$ = semiperimetro, $a$ = apotema, cioè il raggio della circonferenza inscritta.` },
    { nome: 'Circonferenza, cerchio, arco e settore', formula: R`C = 2\pi r \qquad A = \pi r^2 \qquad \ell=2\pi r\cdot\frac{\alpha}{360^\circ}`, nota: R`Il settore di angolo al centro $\alpha$ ha area $\pi r^2\cdot\frac{\alpha}{360^\circ}$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'circonferenza', tipo: 'concetto', fronte: R`Perpendicolare dal centro a una corda`, retro: R`Divide la corda a metà. L'asse di ogni corda passa per il centro.` },
    { id: 'fc-02', sezione: 'circonferenza', tipo: 'concetto', fronte: R`Corde e distanza dal centro`, retro: R`Due corde sono congruenti se e solo se hanno la stessa distanza dal centro. La più vicina al centro è la più lunga.` },
    { id: 'fc-03', sezione: 'circonferenza', tipo: 'concetto', fronte: R`Retta tangente a una circonferenza`, retro: R`Ha un solo punto in comune con la circonferenza ed è perpendicolare al raggio in quel punto.` },
    { id: 'fc-04', sezione: 'circonferenza', tipo: 'concetto', fronte: R`Tangenti da un punto esterno`, retro: R`Sono due, e i segmenti di tangente sono congruenti: $PT_1=PT_2$.` },
    { id: 'fc-05', sezione: 'circonferenza', tipo: 'procedura', fronte: R`Posizione di due circonferenze`, retro: R`Confronta la distanza dei centri $d$ con $r_1+r_2$ e con $r_1-r_2$. Tangenti esternamente: $d=r_1+r_2$. Internamente: $d=r_1-r_2$.` },
    { id: 'fc-06', sezione: 'angoli-circonferenza', tipo: 'concetto', fronte: R`Angolo al centro e angolo alla circonferenza`, retro: R`L'angolo al centro è il doppio dell'angolo alla circonferenza che insiste sullo stesso arco.` },
    { id: 'fc-07', sezione: 'angoli-circonferenza', tipo: 'concetto', fronte: R`Angoli alla circonferenza sullo stesso arco`, retro: R`Sono congruenti: ognuno è la metà dello stesso angolo al centro. Sulla semicirconferenza sono retti.` },
    { id: 'fc-08', sezione: 'angoli-circonferenza', tipo: 'concetto', fronte: R`Angolo al centro concavo`, retro: R`È l'angolo al centro di un arco più grande di una semicirconferenza: supera $180^\circ$. L'angolo alla circonferenza su quell'arco ne è la metà, ed è ottuso.` },
    { id: 'fc-09', sezione: 'punti-notevoli', tipo: 'definizione', fronte: R`Baricentro`, retro: R`Punto d'incontro delle tre mediane; divide ciascuna mediana in due parti, una doppia dell'altra.` },
    { id: 'fc-10', sezione: 'punti-notevoli', tipo: 'definizione', fronte: R`Incentro e circocentro`, retro: R`L'incentro (bisettrici) è centro della circonferenza inscritta; il circocentro (assi dei lati) è centro della circonferenza circoscritta.` },
    { id: 'fc-11', sezione: 'punti-notevoli', tipo: 'concetto', fronte: R`Circocentro del triangolo rettangolo`, retro: R`È il punto medio dell'ipotenusa. Il raggio della circonferenza circoscritta è metà ipotenusa.` },
    { id: 'fc-12', sezione: 'quadrilateri-inscritti', tipo: 'concetto', fronte: R`Quadrilatero inscrivibile`, retro: R`Un quadrilatero convesso è inscrivibile in una circonferenza se e solo se gli angoli opposti sono supplementari.` },
    { id: 'fc-13', sezione: 'quadrilateri-inscritti', tipo: 'concetto', fronte: R`Quadrilatero circoscrivibile`, retro: R`Un quadrilatero convesso è circoscrivibile a una circonferenza se e solo se $AB+CD=BC+DA$.` },
    { id: 'fc-14', sezione: 'equivalenza', tipo: 'definizione', fronte: R`Figure equivalenti`, retro: R`Figure con la stessa estensione, cioè la stessa area. Possono avere forme e perimetri diversi.` },
    { id: 'fc-15', sezione: 'equivalenza', tipo: 'definizione', fronte: R`Figure equiscomponibili`, retro: R`Si possono dividere in pezzi a due a due congruenti. Figure equiscomponibili sono equivalenti.` },
    { id: 'fc-16', sezione: 'equivalenza', tipo: 'concetto', fronte: R`Parallelogramma e triangolo per equivalenza`, retro: R`Il parallelogramma è equivalente al rettangolo con la stessa base e altezza. Il triangolo è equivalente a metà di quel parallelogramma.` },
    { id: 'fc-17', sezione: 'pitagora-euclide', tipo: 'formula', fronte: R`Teorema di Pitagora`, retro: R`$c^2 = a^2 + b^2$, con $c$ ipotenusa e $a$, $b$ cateti.` },
    { id: 'fc-18', sezione: 'pitagora-euclide', tipo: 'concetto', fronte: R`Teorema di Pitagora inverso`, retro: R`Se in un triangolo il quadrato del lato maggiore è uguale alla somma dei quadrati degli altri due, il triangolo è rettangolo.` },
    { id: 'fc-19', sezione: 'pitagora-euclide', tipo: 'formula', fronte: R`Primo teorema di Euclide`, retro: R`$b^2 = c \cdot m$. Il quadrato sul cateto è equivalente al rettangolo che ha per lati l'ipotenusa e la proiezione del cateto.` },
    { id: 'fc-20', sezione: 'pitagora-euclide', tipo: 'formula', fronte: R`Secondo teorema di Euclide`, retro: R`$h^2 = m \cdot n$: l'altezza relativa all'ipotenusa è medio proporzionale fra le due proiezioni dei cateti.` },
    { id: 'fc-21', sezione: 'talete-similitudine', tipo: 'concetto', fronte: R`Teorema di Talete`, retro: R`Un fascio di rette parallele taglia su due trasversali segmenti corrispondenti proporzionali.` },
    { id: 'fc-22', sezione: 'talete-similitudine', tipo: 'definizione', fronte: R`Segmenti commensurabili e incommensurabili`, retro: R`Commensurabili: hanno un sottomultiplo comune, e il rapporto è razionale. Incommensurabili: non ce l'hanno, come lato e diagonale del quadrato (rapporto $\sqrt2$).` },
    { id: 'fc-23', sezione: 'talete-similitudine', tipo: 'concetto', fronte: R`Rapporto fra le aree di poligoni simili`, retro: R`È il quadrato del rapporto di similitudine, $k^2$. I perimetri stanno invece nel rapporto $k$.` },
    { id: 'fc-24', sezione: 'corde-secanti', tipo: 'formula', fronte: R`Teorema delle corde`, retro: R`Se le corde $AB$ e $CD$ si tagliano in $P$: $PA\cdot PB=PC\cdot PD$.` },
    { id: 'fc-25', sezione: 'corde-secanti', tipo: 'formula', fronte: R`Teoremi delle secanti e della tangente`, retro: R`Da $P$ esterno, con due secanti: $PA\cdot PB=PC\cdot PD$. Con una secante e la tangente: $PT^2=PA\cdot PB$.` },
    { id: 'fc-26', sezione: 'poligoni-regolari-cerchio', tipo: 'formula', fronte: R`Aree del poligono regolare e del cerchio`, retro: R`Poligono regolare: $A=p\cdot a$, semiperimetro per apotema. Cerchio: $A=\pi r^2$, con circonferenza $C=2\pi r$.` }
  ],
  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`In una circonferenza di raggio $10$ una corda dista $8$ dal centro. Quanto è lunga la corda?`, suggerimenti: [R`La perpendicolare dal centro divide la corda a metà.`, R`Metà corda: $\sqrt{10^2-8^2}$.`], risposta: num(12), soluzione: [R`Metà corda e distanza sono i cateti di un triangolo rettangolo che ha per ipotenusa il raggio.`, R`Metà corda: $\sqrt{100-64}=\sqrt{36}=6$.`, R`La corda misura $2\cdot6=12$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Una circonferenza ha raggio $7$. Un punto $P$ dista $25$ dal centro. Quanto misura il segmento di tangente da $P$ alla circonferenza?`, suggerimenti: [R`La tangente è perpendicolare al raggio nel punto di contatto $T$.`, R`Nel triangolo $OTP$ l'ipotenusa è $OP$.`], risposta: num(24), soluzione: [R`Il triangolo $OTP$ è rettangolo in $T$, con ipotenusa $OP=25$ e cateto $OT=7$.`, R`$PT=\sqrt{25^2-7^2}=\sqrt{625-49}=\sqrt{576}=24$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Due circonferenze di raggi $7$ e $4$ sono tangenti internamente. Quanto distano i loro centri?`, suggerimenti: [R`Tangenti internamente: la distanza dei centri è la differenza dei raggi.`], risposta: num(3), soluzione: [R`Nella tangenza interna i centri distano $r_1-r_2$.`, R`$7-4=3$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Un angolo alla circonferenza misura $35^\circ$. Quanto misura l'angolo al centro che insiste sullo stesso arco?`, suggerimenti: [R`L'angolo al centro è il doppio di quello alla circonferenza.`], risposta: gradi(70), soluzione: [R`L'angolo al centro è il doppio.`, R`$2\cdot35^\circ=70^\circ$.`] },
    { id: 'b-05', livello: 'base', difficolta: 2, testo: R`I punti $A$ e $B$ dividono una circonferenza in due archi. L'angolo al centro dell'arco minore misura $130^\circ$. Il punto $C$ sta sull'arco minore. Quanto misura $A\widehat{C}B$?`, suggerimenti: [R`L'angolo in $C$ insiste sull'arco che non contiene $C$.`, R`L'arco maggiore ha angolo al centro $360^\circ-130^\circ$.`], risposta: gradi(115), soluzione: [R`$C$ sta sull'arco minore, quindi l'angolo in $C$ insiste sull'arco maggiore.`, R`Il suo angolo al centro è concavo: $360^\circ-130^\circ=230^\circ$.`, R`$A\widehat{C}B=230^\circ:2=115^\circ$.`] },
    { id: 'b-06', livello: 'base', difficolta: 2, testo: R`Un triangolo è inscritto in una semicirconferenza, con un lato sul diametro. Un suo angolo acuto misura $25^\circ$. Quanto misura l'altro angolo acuto?`, suggerimenti: [R`Che triangolo è un triangolo inscritto in una semicirconferenza?`, R`È rettangolo: i due angoli acuti sommano $90^\circ$.`], risposta: gradi(65), soluzione: [R`Il triangolo è rettangolo: l'angolo opposto al diametro è retto.`, R`I due angoli acuti sommano $90^\circ$.`, R`L'altro misura $90^\circ-25^\circ=65^\circ$.`] },
    { id: 'b-07', livello: 'base', difficolta: 2, testo: R`Un triangolo rettangolo ha i cateti di $9$ e $12$. Quanto misura il raggio della circonferenza circoscritta?`, suggerimenti: [R`Il circocentro di un triangolo rettangolo è il punto medio dell'ipotenusa.`, R`Trova l'ipotenusa con Pitagora e dividila per $2$.`], risposta: num(7.5), soluzione: [R`Ipotenusa: $\sqrt{81+144}=\sqrt{225}=15$.`, R`L'ipotenusa è un diametro della circonferenza circoscritta.`, R`Il raggio è $15:2=7{,}5$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Il quadrilatero $ABCD$ è inscritto in una circonferenza. L'angolo in $A$ misura $72^\circ$. Quanto misura l'angolo in $C$?`, suggerimenti: [R`In un quadrilatero inscritto gli angoli opposti sono supplementari.`], risposta: gradi(108), soluzione: [R`$A$ e $C$ sono opposti: insieme fanno $180^\circ$.`, R`L'angolo in $C$ misura $180^\circ-72^\circ=108^\circ$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Il quadrilatero $ABCD$ è circoscritto a una circonferenza, con $AB=9$, $BC=10$ e $CD=7$. Quanto misura $DA$?`, suggerimenti: [R`Nel quadrilatero circoscritto le somme dei lati opposti sono uguali: $AB+CD=BC+DA$.`], risposta: num(6), soluzione: [R`$AB+CD=9+7=16$.`, R`Quindi $BC+DA=16$, cioè $DA=16-10=6$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Un triangolo è equivalente a un quadrato di lato $6$. La base del triangolo misura $12$. Quanto misura l'altezza relativa a quella base?`, suggerimenti: [R`Equivalenti vuol dire con la stessa area. Il quadrato ha area $36$.`, R`Risolvi $\frac{12\cdot h}{2}=36$.`], risposta: num(6), soluzione: [R`Il quadrato ha area $6^2=36$, quindi anche il triangolo.`, R`$\frac{12\cdot h}{2}=36$, cioè $6h=36$ e $h=6$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Una circonferenza è lunga $10\pi$ cm. Quanto vale l'area del cerchio? Scrivi il risultato con $\pi$, per esempio *4π*.`, suggerimenti: [R`Da $C=2\pi r$ ricava il raggio.`, R`Poi usa $A=\pi r^2$.`], risposta: conPi(25), soluzione: [R`$2\pi r=10\pi$, quindi $r=5$ cm.`, R`$A=\pi\cdot5^2=25\pi\ \text{cm}^2$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha i cateti di $9$ e $40$. Quanto misura l'ipotenusa?`, suggerimenti: [R`Usa Pitagora: $c^2=a^2+b^2$.`], risposta: num(41), soluzione: [R`$c^2=9^2+40^2=81+1600=1681$.`, R`$c=\sqrt{1681}=41$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Un triangolo rettangolo ha l'ipotenusa di $37$ e un cateto di $12$. Quanto misura l'altro cateto?`, suggerimenti: [R`Per trovare un cateto fai la **differenza** dei quadrati.`], risposta: num(35), soluzione: [R`$b^2=37^2-12^2=1369-144=1225$.`, R`$b=\sqrt{1225}=35$.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`I lati di un triangolo misurano $20$, $21$ e $29$. È un triangolo rettangolo? Scrivi *sì* o *no*.`, suggerimenti: [R`Confronta il quadrato del lato più lungo con la somma dei quadrati degli altri due.`], risposta: SI, soluzione: [R`$20^2+21^2=400+441=841$.`, R`$29^2=841$: sono uguali.`, R`Per il teorema di Pitagora inverso il triangolo è rettangolo.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`In un triangolo rettangolo l'ipotenusa misura $16$ e un cateto $12$. Quanto misura la proiezione di questo cateto sull'ipotenusa?`, suggerimenti: [R`Usa il primo teorema di Euclide: $b^2=c\cdot m$.`, R`Ricava $m=\frac{b^2}{c}$.`], risposta: num(9), soluzione: [R`Primo teorema di Euclide: $12^2=16\cdot m$.`, R`$144=16\cdot m$, quindi $m=\frac{144}{16}=9$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`In un triangolo rettangolo le proiezioni dei cateti sull'ipotenusa misurano $4$ e $9$. Quanto misura l'altezza relativa all'ipotenusa?`, suggerimenti: [R`Usa il secondo teorema di Euclide: $h^2=m\cdot n$.`], risposta: num(6), soluzione: [R`Secondo teorema di Euclide: $h^2=4\cdot9=36$.`, R`$h=\sqrt{36}=6$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Due triangoli sono simili. Il primo ha i lati di $3$, $4$ e $5$. Nel secondo il lato che corrisponde a $3$ misura $6$. Quanto misura il lato che corrisponde a $5$?`, suggerimenti: [R`Trova prima il rapporto di similitudine: $6:3$.`], risposta: num(10), soluzione: [R`Il rapporto di similitudine è $k=6:3=2$.`, R`Ogni lato si moltiplica per $2$: $5\cdot2=10$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Due triangoli sono simili con rapporto $2$. Il più piccolo ha area $7\ \text{cm}^2$. Quanto vale l'area del più grande, in $\text{cm}^2$?`, suggerimenti: [R`Le aree stanno nel rapporto $k^2$, non nel rapporto $k$.`], risposta: area(28), soluzione: [R`Le aree stanno nel rapporto $k^2=2^2=4$.`, R`L'area grande è $7\cdot4=28\ \text{cm}^2$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Da un punto $P$ esterno una secante taglia la circonferenza in $A$ e $B$, con $PA=3$ e $PB=12$. Quanto misura il segmento di tangente $PT$?`, suggerimenti: [R`Teorema della tangente: $PT^2=PA\cdot PB$.`], risposta: num(6), soluzione: [R`$PT^2=3\cdot12=36$.`, R`$PT=\sqrt{36}=6$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Due corde $AB$ e $CD$ si tagliano nel punto $P$, con $PA=4$, $PB=9$ e $PC=3$. Quanto misura $PD$?`, suggerimenti: [R`Teorema delle corde: $PA\cdot PB=PC\cdot PD$.`], risposta: num(12), soluzione: [R`$4\cdot9=3\cdot PD$, cioè $36=3\cdot PD$.`, R`$PD=36:3=12$.`] },

    { id: 'es-01', difficolta: 2, testo: R`In una circonferenza di raggio $25\ \text{cm}$ ci sono due corde parallele, lunghe $48\ \text{cm}$ e $40\ \text{cm}$. Stanno da parti opposte rispetto al centro. Quanto distano fra loro (in cm)?`, suggerimenti: [R`Trova la distanza di ciascuna corda dal centro, con la perpendicolare e Pitagora.`, R`Le corde stanno da parti opposte: le due distanze si sommano.`], risposta: { tipo: 'numero', valore: 22 }, soluzione: [R`Prima corda: metà $24$, distanza $\sqrt{625-576}=\sqrt{49}=7$.`, R`Seconda corda: metà $20$, distanza $\sqrt{625-400}=\sqrt{225}=15$.`, R`Le corde sono parallele, quindi le due perpendicolari dal centro stanno sulla stessa retta. Da parti opposte: $7+15=22\ \text{cm}$. Dalla stessa parte sarebbero $15-7=8\ \text{cm}$.`] },

    { id: 'es-02', difficolta: 2, testo: R`Da un punto $P$ esterno si tracciano le tangenti $PA$ e $PB$ alla circonferenza di centro $O$. L'angolo $A\widehat{P}B$ misura $50^\circ$. Quanto misura l'angolo al centro $A\widehat{O}B$ (in gradi)?`, suggerimenti: [R`Guarda il quadrilatero $PAOB$: che angoli ha in $A$ e in $B$?`, R`La tangente è perpendicolare al raggio: in $A$ e in $B$ ci sono angoli retti. Gli angoli di un quadrilatero sommano $360^\circ$.`], risposta: gradi(130), soluzione: [R`Nel quadrilatero $PAOB$ gli angoli in $A$ e in $B$ sono retti, perché la tangente è perpendicolare al raggio.`, R`$A\widehat{O}B=360^\circ-90^\circ-90^\circ-50^\circ=130^\circ$.`] },

    { id: 'es-03', difficolta: 3, testo: R`La circonferenza inscritta nel triangolo $ABC$ tocca il lato $AB$ nel punto $H$. I lati misurano $AB=9$, $BC=11$ e $CA=8$. Quanto misura $AH$?`, suggerimenti: [R`Da ogni vertice partono due segmenti di tangente congruenti.`, R`Chiama $x$, $y$, $z$ i segmenti di tangente da $A$, $B$, $C$: $x+y=9$, $y+z=11$, $z+x=8$.`, R`Somma le tre uguaglianze: $2(x+y+z)=28$.`], risposta: num(3), soluzione: [R`I segmenti di tangente da uno stesso vertice sono congruenti: $x$ da $A$, $y$ da $B$, $z$ da $C$.`, R`$x+y=9$, $y+z=11$, $z+x=8$. Sommando: $2(x+y+z)=28$, quindi $x+y+z=14$.`, R`$AH=x=14-(y+z)=14-11=3$.`] },

    { id: 'es-04', difficolta: 2, testo: R`Il quadrilatero $ABCD$ è inscritto in una circonferenza. L'angolo in $A$ misura $2x+10^\circ$ e l'angolo in $C$ misura $3x-5^\circ$. Quanto misura l'angolo in $C$ (in gradi)?`, suggerimenti: [R`$A$ e $C$ sono angoli opposti di un quadrilatero inscritto.`, R`Imposta $(2x+10^\circ)+(3x-5^\circ)=180^\circ$.`], risposta: gradi(100), soluzione: [R`Gli angoli opposti sono supplementari: $5x+5^\circ=180^\circ$.`, R`$5x=175^\circ$, quindi $x=35^\circ$.`, R`Angolo in $C$: $3\cdot35^\circ-5^\circ=100^\circ$. Controllo: in $A$ c'è $80^\circ$, e $80^\circ+100^\circ=180^\circ$. ✓`] },

    { id: 'es-05', difficolta: 3, testo: R`Un trapezio isoscele è circoscritto a una circonferenza. Le basi misurano $18\ \text{cm}$ e $8\ \text{cm}$. Quanto vale l'area del trapezio (in $\text{cm}^2$)?`, suggerimenti: [R`Nel quadrilatero circoscritto le somme dei lati opposti sono uguali: i due lati obliqui insieme fanno $18+8$.`, R`Ogni lato obliquo misura $13$. Un'altezza stacca un triangolo rettangolo con un cateto di $\frac{18-8}{2}=5$.`], risposta: area(156), soluzione: [R`I lati obliqui sommano $18+8=26$ e sono congruenti: $13$ ciascuno.`, R`L'altezza stacca un triangolo rettangolo con ipotenusa $13$ e cateto $5$: $h=\sqrt{169-25}=12$.`, R`Area: $\frac{(18+8)\cdot12}{2}=156\ \text{cm}^2$.`] },

    { id: 'es-06', difficolta: 2, testo: R`In un triangolo rettangolo le proiezioni dei cateti sull'ipotenusa misurano $18$ e $32$. Quanto misura il perimetro del triangolo?`, suggerimenti: [R`L'ipotenusa è la somma delle due proiezioni.`, R`Per ogni cateto usa il primo teorema di Euclide: $b^2=c\cdot m$.`], risposta: num(120), soluzione: [R`Ipotenusa: $18+32=50$.`, R`Primo teorema di Euclide: $b^2=50\cdot18=900$, quindi $b=30$; $a^2=50\cdot32=1600$, quindi $a=40$.`, R`Perimetro: $30+40+50=120$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Nel triangolo $ABC$ una retta parallela a $BC$ taglia $AB$ in $D$ e $AC$ in $E$. Si sa che $AD=4$, $DB=6$ e $DE=5$. Quanto misura $BC$?`, suggerimenti: [R`I triangoli $ADE$ e $ABC$ hanno l'angolo in $A$ in comune e angoli corrispondenti congruenti: sono simili.`, R`Il rapporto di similitudine è $\frac{AB}{AD}=\frac{10}{4}$.`], risposta: num(12.5), soluzione: [R`$DE\parallel BC$: gli angoli in $D$ e in $B$ sono corrispondenti, quindi $ADE\sim ABC$ per il primo criterio.`, R`$AB=4+6=10$, e il rapporto è $k=\frac{10}{4}=2{,}5$.`, R`$BC=2{,}5\cdot5=12{,}5$.`] },

    { id: 'es-08', difficolta: 3, testo: R`Due triangoli simili hanno aree $12\ \text{cm}^2$ e $75\ \text{cm}^2$. Il perimetro del più piccolo è $14\ \text{cm}$. Quanto misura il perimetro del più grande (in cm)?`, suggerimenti: [R`Il rapporto delle aree è $k^2$, quello dei perimetri è $k$.`, R`$k^2=\frac{75}{12}=6{,}25$: quanto vale $k$?`], risposta: num(35), soluzione: [R`$k^2=\frac{75}{12}=6{,}25$, quindi $k=2{,}5$.`, R`I perimetri stanno nel rapporto $k$: $14\cdot2{,}5=35\ \text{cm}$.`] },

    { id: 'es-09', difficolta: 2, testo: R`Da un punto $P$ esterno partono due secanti. La prima taglia la circonferenza in $A$ e $B$, con $PA=5$ e $AB=7$. La seconda la taglia in $C$ e $D$, con $C$ più vicino a $P$ e $PC=6$. Quanto misura la corda $CD$?`, suggerimenti: [R`I segmenti si misurano da $P$: $PB=PA+AB$.`, R`Teorema delle secanti: $PA\cdot PB=PC\cdot PD$.`], risposta: num(4), soluzione: [R`$PB=5+7=12$.`, R`$5\cdot12=6\cdot PD$, quindi $PD=10$.`, R`$CD=PD-PC=10-6=4$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Da un punto $P$ esterno il segmento di tangente misura $PT=15$. La secante da $P$ che passa per il centro incontra la circonferenza in $A$ e $B$, con $PA=9$. Quanto misura il raggio?`, suggerimenti: [R`Teorema della tangente: $PT^2=PA\cdot PB$.`, R`La secante passa per il centro: $AB=PB-PA$ è un diametro.`], risposta: num(8), soluzione: [R`$225=9\cdot PB$, quindi $PB=25$.`, R`$AB=25-9=16$ è un diametro: il raggio è $8$.`, R`Controllo: $OP=9+8=17$, e $8^2+15^2=289=17^2$. ✓`] },

    { id: 'es-11', difficolta: 2, testo: R`Un quadrato è inscritto in una circonferenza di raggio $5\ \text{cm}$. Quanto vale l'area del quadrato (in $\text{cm}^2$)?`, suggerimenti: [R`La diagonale del quadrato è un diametro della circonferenza.`, R`Il quadrato è anche un rombo: area uguale al prodotto delle diagonali diviso $2$.`], risposta: area(50), soluzione: [R`Gli angoli del quadrato sono retti e insistono su un diametro: la diagonale misura $10\ \text{cm}$.`, R`Area: $\frac{10\cdot10}{2}=50\ \text{cm}^2$.`] },

    { id: 'es-12', difficolta: 2, testo: R`Un settore circolare ha raggio $6\ \text{cm}$ e angolo al centro di $120^\circ$. Quanto vale la sua area? Scrivi il risultato con $\pi$.`, suggerimenti: [R`L'area del settore è proporzionale all'angolo al centro.`, R`$120^\circ$ è un terzo dell'angolo giro.`], risposta: conPi(12), soluzione: [R`Area del cerchio: $\pi\cdot6^2=36\pi$.`, R`$\frac{120^\circ}{360^\circ}=\frac13$, quindi il settore vale $36\pi:3=12\pi\ \text{cm}^2$.`] }
  ],
  quiz: [
    { id: 'q-01', domanda: R`Due corde della stessa circonferenza hanno la stessa distanza dal centro. Allora…`, opzioni: [R`sono parallele`, R`sono congruenti`, R`sono due diametri`, R`si tagliano a metà`], corretta: 1, spiegazione: R`Corde equidistanti dal centro sono congruenti: i triangoli con il raggio come ipotenusa sono congruenti. Possono avere direzioni qualsiasi, quindi non per forza parallele. Un diametro ha distanza zero.` },
    { id: 'q-02', domanda: R`Una retta tangente a una circonferenza in un punto $P$…`, opzioni: [R`interseca la circonferenza in due punti`, R`passa per il centro`, R`è perpendicolare al raggio in $P$`, R`è parallela al raggio in $P$`], corretta: 2, spiegazione: R`La tangente ha un solo punto in comune con la circonferenza, $P$, ed è perpendicolare al raggio condotto in quel punto.` },
    { id: 'q-03', domanda: R`Da un punto $P$ esterno si tracciano le due tangenti, che toccano la circonferenza in $T_1$ e $T_2$. Che cosa vale sempre?`, opzioni: [R`$PT_1=PT_2$`, R`$PT_1=OP$`, R`$T_1T_2=OP$`, R`l'angolo fra le due tangenti è retto`], corretta: 0, spiegazione: R`I triangoli $OT_1P$ e $OT_2P$ sono rettangoli, con l'ipotenusa $OP$ in comune e i cateti $OT_1=OT_2$: sono congruenti. $PT_1$ è un cateto, quindi è più corto dell'ipotenusa $OP$. L'angolo fra le tangenti dipende da quanto è lontano $P$.` },
    { id: 'q-04', domanda: R`Due circonferenze hanno raggi $6$ e $2$, e i centri distano $4$. Come sono?`, opzioni: [R`esterne`, R`secanti`, R`tangenti internamente`, R`tangenti esternamente`], corretta: 2, spiegazione: R`$d=4=6-2$: la distanza dei centri è la differenza dei raggi, quindi sono tangenti internamente. Per la tangenza esterna servirebbe $d=6+2=8$.` },
    { id: 'q-05', domanda: R`L'angolo al centro di una circonferenza, rispetto all'angolo alla circonferenza che insiste sullo stesso arco, è…`, opzioni: [R`la metà`, R`uguale`, R`il triplo`, R`il doppio`], corretta: 3, spiegazione: R`L'angolo al centro è sempre il doppio dell'angolo alla circonferenza sullo stesso arco: per questo ogni triangolo inscritto in una semicirconferenza è rettangolo.` },
    { id: 'q-06', domanda: R`Un angolo alla circonferenza è ottuso. Allora l'arco su cui insiste…`, opzioni: [R`è minore di una semicirconferenza`, R`è maggiore di una semicirconferenza`, R`è proprio una semicirconferenza`, R`può essere uno qualsiasi`], corretta: 1, spiegazione: R`L'angolo alla circonferenza è la metà dell'angolo al centro. Se supera $90^\circ$, l'angolo al centro supera $180^\circ$: è concavo, e l'arco è più grande di una semicirconferenza. Sulla semicirconferenza l'angolo è retto.` },
    { id: 'q-07', domanda: R`Il baricentro di un triangolo è il punto d'incontro…`, opzioni: [R`delle tre altezze`, R`dei tre assi dei lati`, R`delle tre bisettrici`, R`delle tre mediane`], corretta: 3, spiegazione: R`Le altezze si incontrano nell'ortocentro, gli assi nel circocentro, le bisettrici nell'incentro: solo le mediane danno il baricentro.` },
    { id: 'q-08', domanda: R`Il circocentro di un triangolo è il centro della circonferenza…`, opzioni: [R`inscritta`, R`circoscritta`, R`tangente ai tre lati`, R`che passa per i punti medi dei lati`], corretta: 1, spiegazione: R`Il circocentro è equidistante dai vertici: è il centro della circonferenza circoscritta. La circonferenza inscritta, tangente ai lati, ha invece centro nell'incentro.` },
    { id: 'q-09', domanda: R`Dove sta il circocentro di un triangolo rettangolo?`, opzioni: [R`nel punto medio dell'ipotenusa`, R`nel vertice dell'angolo retto`, R`sempre fuori dal triangolo`, R`nel punto d'incontro delle mediane`], corretta: 0, spiegazione: R`L'angolo retto insiste su un diametro, quindi l'ipotenusa è un diametro della circonferenza circoscritta. Il centro è il suo punto medio. Fuori dal triangolo sta solo negli ottusangoli.` },
    { id: 'q-10', domanda: R`Quale quadrilatero è sempre inscrivibile in una circonferenza?`, opzioni: [R`il rombo`, R`il parallelogramma`, R`il trapezio isoscele`, R`il trapezio rettangolo`], corretta: 2, spiegazione: R`Nel trapezio isoscele gli angoli adiacenti a una base sono congruenti, quindi gli angoli opposti sono supplementari. Rombo e parallelogramma hanno gli angoli opposti congruenti: sono inscrivibili solo se retti.` },
    { id: 'q-11', domanda: R`Un quadrilatero convesso ha i lati $AB=7$, $BC=5$, $CD=4$, $DA=6$. È circoscrivibile a una circonferenza?`, opzioni: [R`no, perché i lati sono tutti diversi`, R`sì, perché $AB+CD=BC+DA$`, R`no, servono gli angoli opposti supplementari`, R`solo se è un rettangolo`], corretta: 1, spiegazione: R`$7+4=11$ e $5+6=11$: le somme dei lati opposti sono uguali, ed è la condizione per essere circoscrivibile. Gli angoli opposti supplementari riguardano invece i quadrilateri inscrivibili.` },
    { id: 'q-12', domanda: R`Due figure equivalenti…`, opzioni: [R`sono sempre congruenti`, R`hanno sempre lo stesso perimetro`, R`hanno la stessa area`, R`hanno la stessa forma`], corretta: 2, spiegazione: R`Equivalenti vuol dire con la stessa estensione, cioè la stessa area. Forma e perimetro possono essere diversi: un rettangolo $1\times9$ e un quadrato di lato $3$ sono equivalenti.` },
    { id: 'q-13', domanda: R`Un triangolo e un parallelogramma hanno la stessa base e la stessa altezza. Che cosa si può dire delle aree?`, opzioni: [R`sono uguali`, R`il triangolo ha area doppia`, R`dipende dalla forma del triangolo`, R`il triangolo ha metà area`], corretta: 3, spiegazione: R`Due copie congruenti del triangolo formano un parallelogramma con la stessa base e la stessa altezza: il triangolo è equivalente a metà parallelogramma, qualunque sia la sua forma.` },
    { id: 'q-14', domanda: R`Il primo teorema di Euclide afferma che ogni cateto è medio proporzionale fra…`, opzioni: [R`i due cateti`, R`le due proiezioni dei cateti sull'ipotenusa`, R`l'ipotenusa e l'altezza relativa a essa`, R`l'ipotenusa e la propria proiezione sull'ipotenusa`], corretta: 3, spiegazione: R`$b^2 = c \cdot m$: il cateto è medio proporzionale fra l'intera ipotenusa e la propria proiezione. Il secondo teorema riguarda invece l'altezza e le due proiezioni.` },
    { id: 'q-15', domanda: R`Il teorema di Talete riguarda…`, opzioni: [R`un fascio di rette parallele tagliato da due trasversali`, R`le diagonali di un parallelogramma, che si tagliano a metà`, R`gli angoli acuti di un triangolo rettangolo inscritto`, R`il rapporto fra le aree di due cerchi di raggio diverso`], corretta: 0, spiegazione: R`Talete: rette parallele tagliano su due trasversali qualsiasi segmenti proporzionali. È alla base della similitudine dei triangoli.` },
    { id: 'q-16', domanda: R`Se il rapporto di similitudine fra due poligoni è $k$, il rapporto fra le loro aree è…`, opzioni: [R`$\sqrt{k}$`, R`$2k$`, R`$k^2$`, R`$k$`], corretta: 2, spiegazione: R`Le aree si comportano come prodotti di due lunghezze, quindi il rapporto è $k^2$; il rapporto fra i perimetri, invece, resta $k$.` },
    { id: 'q-17', domanda: R`Il lato e la diagonale di un quadrato sono…`, opzioni: [R`commensurabili, con rapporto $2$`, R`incommensurabili: il rapporto è $\sqrt2$`, R`commensurabili, con rapporto $\frac32$`, R`incommensurabili, perché la diagonale non ha una misura`], corretta: 1, spiegazione: R`Per Pitagora $d^2=2l^2$, quindi $\frac{d}{l}=\sqrt2$, che non è razionale: nessun segmento sta un numero intero di volte in tutti e due. La diagonale una misura ce l'ha, ma è irrazionale.` },
    { id: 'q-18', domanda: R`Due corde $AB$ e $CD$ si tagliano nel punto $P$. Quale uguaglianza è sempre vera?`, opzioni: [R`$PA\cdot PB=PC\cdot PD$`, R`$PA+PB=PC+PD$`, R`$PA\cdot PC=PB\cdot PD$`, R`$\frac{PA}{PB}=\frac{PC}{PD}$`], corretta: 0, spiegazione: R`È il teorema delle corde: si moltiplicano i due pezzi della **stessa** corda. $PA+PB=PC+PD$ direbbe che le due corde sono congruenti, e in generale non lo sono. Le altre due mescolano pezzi di corde diverse.` }
  ],

  suggerimenti: [
    { tipo: 'trucco', testo: R`Davanti a una corda, traccia subito la perpendicolare dal centro. Nasce un triangolo rettangolo con ipotenusa $r$ e un cateto lungo metà corda.` },
    { tipo: 'metodo', testo: R`Per un quadrilatero inscrivibile guarda gli angoli opposti: devono essere supplementari. Per uno circoscrivibile guarda i lati opposti: le somme devono essere uguali.` },
    { tipo: 'errore', testo: R`Nella proiezione di un cateto sull'ipotenusa, non confondere quale segmento appartiene a quale cateto: la proiezione di un cateto è il pezzo di ipotenusa che ha un estremo in comune con lui.` },
    { tipo: 'trucco', testo: R`Per verificare al volo se un triangolo di lati interi è rettangolo, cerca prima le terne pitagoriche più comuni: $3, 4, 5$; $5, 12, 13$; $8, 15, 17$; $7, 24, 25$; e i loro multipli.` },
    { tipo: 'metodo', testo: R`Prima di applicare una formula di area, controlla sempre l'unità di misura: se i lati sono in centimetri, l'area viene in centimetri quadrati, non in centimetri.` },
    { tipo: 'errore', testo: R`Raddoppiare i lati di una figura non raddoppia l'area: la moltiplica per $4 = 2^2$. Il rapporto fra le aree è sempre il quadrato del rapporto di similitudine.` },
    { tipo: 'trucco', testo: R`Se un triangolo è inscritto in una semicirconferenza con un lato sul diametro, è automaticamente rettangolo: è una scorciatoia che evita calcoli.` },
    { tipo: 'errore', testo: R`Nei teoremi delle secanti e della tangente i segmenti partono tutti da $P$: si moltiplica $PA$ per $PB$, l'intera secante, non per la corda $AB$.` },
    { tipo: 'errore', testo: R`Mediana, altezza e bisettrice uscenti dallo stesso vertice non sono lo stesso segmento, salvo nel triangolo isoscele (dal vertice giusto) o equilatero: non scambiarle.` },
    { tipo: 'metodo', testo: R`Prima di usare $\pi \approx 3{,}14$, ricorda che è un'approssimazione: nei passaggi intermedi tienilo come $\pi$ e sostituisci il valore decimale solo alla fine.` }
  ],

  aneddoti: [
    { matematico: 'Talete di Mileto', anni: '625–546 a.C. circa', titolo: "La piramide misurata con un'ombra", testo: R`Talete è considerato il primo filosofo e matematico della tradizione greca. Gli antichi lo mettevano fra i Sette Savi. Diogene Laerzio e Plutarco raccontano che in Egitto stupì i sacerdoti: misurò l'altezza della grande piramide senza scalarla. Piantò un bastone verticale e aspettò il momento in cui la sua ombra era lunga quanto il bastone. In quell'istante anche l'ombra della piramide doveva essere lunga quanto la sua altezza. L'aneddoto arriva in più varianti: a volte si parla di un rapporto qualsiasi fra ombra e altezza. Il principio però è sempre lo stesso. Il sole è così lontano che i suoi raggi si possono considerare paralleli. Allora bastone e ombra, piramide e ombra, formano triangoli simili.`, legame: R`È la prima applicazione nota della similitudine dei triangoli, la stessa del video sull'ombra della piramide.` },

    { matematico: 'Pitagora di Samo', anni: '570–495 a.C. circa', titolo: 'Un teorema più vecchio di Pitagora', testo: R`Pitagora fondò a Crotone una comunità che era insieme scuola e confraternita religiosa. I suoi allievi lavoravano in gruppo, e le scoperte finivano tutte sotto il nome del maestro. Il teorema però è molto più antico. Una tavoletta babilonese d'argilla, scritta verso il 1800 a.C., ha quindici righe di numeri. Oggi si chiama Plimpton 322, dal nome dell'editore americano che la comprò nel 1922, e sta alla Columbia University di New York. La prima riga riporta $119$ e $169$: con $120$ formano i lati di un triangolo rettangolo. A che cosa servisse la tavoletta si discute ancora. Ai pitagorici si attribuisce comunque la prima dimostrazione generale. Una leggenda, riferita da Diogene Laerzio, dice che Pitagora festeggiò sacrificando cento buoi.`, legame: R`$119^2+120^2=169^2$: verificare una terna così è il teorema di Pitagora inverso.` },

    { matematico: 'James A. Garfield', anni: '1831–1881', titolo: 'Il presidente che dimostrò Pitagora', testo: R`Prima della politica, James Garfield aveva fatto l'insegnante, e poi il preside di un piccolo college dell'Ohio. Nel 1876 era deputato al Congresso degli Stati Uniti. In quell'anno trovò una dimostrazione nuova del teorema di Pitagora, e la pubblicò sul *New England Journal of Education*. L'idea è semplice. Due copie del triangolo rettangolo e un triangolo rettangolo isoscele formano un trapezio. L'area del trapezio si calcola in due modi: con la formula e come somma dei tre triangoli. Uguagliando le due espressioni esce $a^2+b^2=c^2$. Nel 1881 Garfield divenne il ventesimo presidente degli Stati Uniti. Pochi mesi dopo fu colpito da un attentatore, e morì a settembre per le ferite.`, legame: R`La sua dimostrazione è un ragionamento di aree: la stessa figura misurata in due modi, come nelle figure equivalenti.` },

    { matematico: 'Henri Pitot', anni: '1695–1771', titolo: 'Dai quadrilateri ai tubi degli aerei', testo: R`Henri Pitot era un ingegnere francese, membro dell'Accademia delle scienze di Parigi. Nel 1725 dimostrò un teorema sui quadrilateri circoscritti a una circonferenza: le somme dei lati opposti sono uguali. Il teorema inverso arrivò solo più di un secolo dopo, con lo svizzero Jakob Steiner. Pitot è famoso soprattutto per un'altra invenzione. Nel 1732 voleva misurare la velocità dell'acqua nella Senna, e costruì un tubicino piegato a squadra. L'acqua che ci entrava saliva tanto più in alto quanto più la corrente era veloce. Oggi i tubi di Pitot stanno sulle ali e sul muso degli aerei: misurano la velocità rispetto all'aria.`, legame: R`La condizione $AB+CD=BC+DA$ dei quadrilateri circoscritti si chiama teorema di Pitot.` },

    { matematico: 'Archimede di Siracusa', anni: '287–212 a.C. circa', titolo: 'La sfera nel cilindro', testo: R`Archimede fu matematico, fisico e ingegnere. Scoprì il principio della spinta idrostatica e costruì macchine da guerra per difendere Siracusa dai romani. Fra tutti i suoi risultati, quello di cui andava più fiero riguardava una sfera chiusa in un cilindro che la contiene esattamente. I loro volumi stanno nel rapporto $2$ a $3$, e anche le loro superfici. Chiese che sulla sua tomba fosse scolpita proprio una sfera inscritta in un cilindro. Più di un secolo dopo l'oratore romano Cicerone, questore in Sicilia, raccontò di averla ritrovata fra i rovi grazie a quel disegno. Secondo la tradizione Archimede morì nel sacco della città. Un soldato romano lo uccise mentre studiava figure tracciate sulla sabbia.`, legame: R`Per arrivarci Archimede usava gli strumenti di questo argomento: aree di cerchi, poligoni inscritti e circoscritti, proporzioni.` }
  ]
});
})();
