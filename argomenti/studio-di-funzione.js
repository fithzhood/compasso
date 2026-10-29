(function () {
const R = String.raw;
/* allenamento. Le risposte si controllano con le funzioni vere di compasso.js (normalizza toglie gli
   spazi, legge − come -, ≤ come <=, e la virgola come punto, sia qui sia in ciò che scrive lo studente).
   - Per crescenza e concavità gli estremi si possono scrivere inclusi o esclusi (dopo, fra: forme larghe).
   - Per dominio e segno conta l'inclusione: maggS, minoreS, fraS, fuoriS accettano solo le forme strette,
     minoreUg solo quelle con l'uguale.
   - pt(x, y): coordinate (x; y) nell'ordine;  xs(…): ascisse in ordine libero;  val(v): un numero.
   Tutte le forme sono state provate con controllaRisposta, insieme alle sbagliate tipiche. */
const SIMB_INT = ['<', '>', '≤', '≥', '∞', '(', ')', '[', ']', ',', '−'];
const SIMB_PT = ['(', ')', ';', '−', '/', '√'];
const INF = ['inf', '∞'], SEP = [';', ','];
const destraF = k => ['x>' + k, k + '<x', 'x>=' + k, k + '<=x'].concat(
  ['(', ']', '['].flatMap(ap => INF.flatMap(i => SEP.flatMap(s => ['+', ''].flatMap(p => [')', '['].map(ch => ap + k + s + p + i + ch))))));
const sinistraF = k => ['x<' + k, k + '>x', 'x<=' + k, k + '>=x'].concat(
  ['(', ']'].flatMap(ap => INF.flatMap(i => SEP.flatMap(s => [')', ']', '['].map(ch => ap + '-' + i + s + k + ch)))));
const fraF = (a, b) => {
  const f = [];
  ['<', '<='].forEach(p => ['<', '<='].forEach(q => { f.push(a + p + 'x' + q + b, b + q.replace('<', '>') + 'x' + p.replace('<', '>') + a); }));
  ['x>' + a, 'x>=' + a].forEach(p => ['x<' + b, 'x<=' + b].forEach(q => ['e', 'ed', '∧', ',', ';'].forEach(o => f.push(p + o + q, q + o + p))));
  ['(', ']', '['].forEach(ap => [')', '[', ']'].forEach(ch => SEP.forEach(s => f.push(ap + a + s + b + ch))));
  return f;
};
const fuoriF = (a, b) => {
  const f = [];
  const sd = ['x<' + a, 'x<=' + a, a + '>x', a + '>=x'], dd = ['x>' + b, 'x>=' + b, b + '<x', b + '<=x'];
  ['o', 'oppure', 'v', '∨', 'u', '∪', ',', ';'].forEach(o => sd.forEach(p => dd.forEach(q => f.push(p + o + q, q + o + p))));
  const si = sinistraF(a).slice(4), di = destraF(b).slice(4);
  ['u', '∪', 'o', 'v', '∨'].forEach(o => si.forEach(p => di.forEach(q => f.push(p + o + q, q + o + p))));
  return f;
};
/* forme strette: niente uguale e niente parentesi quadra chiusa su un estremo finito */
const stretta = f => f.filter(s => !/<=|>=/.test(s) && !/\d\]/.test(s) && !/\[-?\d/.test(s));
const conUguale = f => f.filter(s => /<=|>=/.test(s) || /\d\]$/.test(s));
const intv = f => ({ tipo: 'testo', accettate: f, segnaposto: 'es. −1 < x < 3', simboli: SIMB_INT });
const dopo = k => intv(destraF(k)), fra = (a, b) => intv(fraF(a, b));
const maggS = k => intv(stretta(destraF(k))), minoreS = k => intv(stretta(sinistraF(k)));
const minoreUg = k => intv(conUguale(sinistraF(k)));
const fraS = (a, b) => intv(stretta(fraF(a, b))), fuoriS = (a, b) => intv(stretta(fuoriF(a, b)));
const xs = (...v) => ({ tipo: 'numeri', valori: v, segnaposto: 'es. 1; 3', simboli: [';', '−', '/', '√'] });
const pt = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. (2; −1)', simboli: SIMB_PT });
const val = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'un numero', simboli: ['−', '/', '√', '^'] });
const ascissa = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'es. x = 2', simboli: ['−', '/', '√'] });
const retta = f => ({ tipo: 'testo', accettate: f, segnaposto: 'es. y = 3x − 2', simboli: ['−', '='] });
const sim = f => ({ tipo: 'testo', accettate: f, segnaposto: 'pari, dispari o nessuna', simboli: [] });
const PARI = sim(['pari', 'è pari', 'e pari', 'f è pari', 'funzione pari', 'simmetrica rispetto all\'asse y']);
const DISPARI = sim(['dispari', 'è dispari', 'e dispari', 'f è dispari', 'funzione dispari', 'simmetrica rispetto all\'origine']);
const NESSUNA = sim(['nessuna', 'nessuna delle due', 'nessuna simmetria', 'né pari né dispari', 'ne pari ne dispari', 'nè pari nè dispari', 'non è né pari né dispari', 'non e ne pari ne dispari', 'non ha simmetrie', 'no']);

/* la funzione guida: f(x) = (x² − x − 2)/(x − 3) = x + 2 + 4/(x − 3).
   Zeri −1 e 2, f(0) = 2/3, asintoti x = 3 e y = x + 2, massimo (1; 1), minimo (5; 9), f'' = 8/(x − 3)³.
   Il piano di lavoro di ogni passo usa la stessa finestra e gli stessi segni. */
const GUIDA = '(x^2 - x - 2)/(x - 3)';
const FIN = { tipo: 'piano', x: [-4, 10], y: [-8, 14], passo: [1, 2], mirino: false };
const VERT = { tipo: 'verticale', x: 3, tratteggio: true, colore: 4, etichetta: 'x = 3' };
const OBL = { tipo: 'retta', m: 1, q: 2, tratteggio: true, colore: 3 };
const OBL_ET = { tipo: 'testo', p: [9.9, 7.8], testo: 'y = x + 2', ancora: 'end' };
/* segno: si ombreggia dove la curva NON passa (viola = vietato) */
const SEGNO = [
  { tipo: 'area', f: '14', g: '0', da: -4, a: -1, colore: 4 },
  { tipo: 'area', f: '0', g: '-8', da: -1, a: 2, colore: 4 },
  { tipo: 'area', f: '14', g: '0', da: 2, a: 3, colore: 4 },
  { tipo: 'area', f: '0', g: '-8', da: 3, a: 10, colore: 4 }
];
const PUNTI = [
  { x: -1, y: 0, etichetta: 'A', posizione: 'alto-sinistra', colore: 1 },
  { x: 2, y: 0, etichetta: 'B', posizione: 'alto-sinistra', colore: 1 },
  { x: 0, y: 2 / 3, etichetta: 'C', posizione: 'alto-sinistra', colore: 1 }
];
const piano = (extra) => Object.assign({}, FIN, extra);
/* la tangente in P(p; f(p)) come trattino: ordinata, pendenza e mezza lunghezza in x */
const Y_TG = '((p^2 - p - 2)/(p - 3))', M_TG = '((p - 1)*(p - 5)/(p - 3)^2)', K_TG = '(1.2/sqrt(1 + ((p - 1)*(p - 5)/(p - 3)^2)^2))';

COMPASSO.registra({
  id: 'studio-di-funzione',
  titolo: 'Studio di funzione',

  introduzione: R`Studiare una funzione vuol dire disegnarne il grafico senza calcolare cento punti. Raccogli le informazioni una alla volta, in un ordine preciso. Ogni passo dice dove la curva **può** passare e dove no.

Le informazioni si segnano su un piano cartesiano che si riempie passo dopo passo. Ci sono rette tratteggiate dove la funzione non esiste e zone ombreggiate dove la curva non può stare. Poi punti, e frecce che salgono e scendono. Alla fine la curva si disegna quasi da sola.

Lo stesso metodo risolve i **problemi di ottimizzazione**, come la scatola che usa meno cartone. Ti servono il dominio, i limiti e gli asintoti, le derivate e i teoremi del calcolo differenziale.`,

  inBreve: [
    R`L'ordine è sempre lo stesso: dominio, simmetrie, intersezioni con gli assi, segno, limiti e asintoti, derivata prima, derivata seconda, grafico.`,
    R`Nel passo del segno ombreggi le zone dove la curva **non** passa. Alla fine il grafico deve stare tutto nelle zone libere.`,
    R`Gli asintoti si disegnano prima della curva, con i pezzi di ramo vicino: insieme al segno danno il grafico probabile.`,
    R`C'è un massimo dove $f'$ passa da $+$ a $-$, un minimo dove passa da $-$ a $+$. $f'' > 0$: concavità verso l'alto; $f'' < 0$: verso il basso.`,
    R`$f'(x_0) = 0$ non basta per un estremo, $f''(x_0) = 0$ non basta per un flesso: serve il cambio di segno.`,
    R`Ogni passo controlla gli altri: un punto che cade in una zona ombreggiata vuol dire un errore di calcolo.`
  ],

  sezioni: [
    { id: 'metodo', titolo: 'Il metodo e la funzione guida', testo: R`Studiare una funzione vuol dire capire com'è fatto il suo grafico. Non si calcolano cento punti: si raccolgono poche informazioni, una alla volta. Ognuna dice **dove la curva può passare** e dove no.

Le informazioni si segnano su un **piano di lavoro**: un piano cartesiano che si riempie passo dopo passo. All'inizio è vuoto. Alla fine la curva si disegna quasi da sola.

>* **Lo schema dello studio.** 1) Dominio. 2) Simmetrie. 3) Intersezioni con gli assi. 4) Segno. 5) Limiti agli estremi del dominio e asintoti. 6) Derivata prima: crescenza, massimi e minimi. 7) Derivata seconda: concavità e flessi. 8) Grafico.

In questo argomento segui sempre la stessa funzione, la **funzione guida**: $$f(x) = \frac{x^2 - x - 2}{x - 3}.$$ A ogni passo mostra qualcosa. Ha un punto dove non esiste, due zeri e un segno che cambia. Ha due asintoti, un massimo e un minimo.

Sul piano di lavoro userai sempre gli stessi segni:

- una retta verticale **tratteggiata** dove la funzione non esiste o ha un asintoto;
- una zona **ombreggiata** dove la curva non può passare;
- un **punto** per ogni coppia di coordinate calcolata;
- una **freccia** che sale o che scende per la crescenza.

?? Perché lo studio segue sempre lo stesso ordine?
[ ] Perché altrimenti i calcoli vengono diversi.
[x] Perché ogni passo usa i risultati dei passi prima, e li controlla.
[ ] Perché il libro lo chiede, ma l'ordine non conta.
=> I limiti si fanno agli estremi del **dominio**, quindi il dominio viene prima. Il segno serve a capire i segni dei limiti. E un punto calcolato dopo deve cadere dove il segno lo permette: così si scoprono gli errori.

>! Non saltare passi. Un errore di calcolo si scopre solo quando un altro passo lo contraddice.

> Alcuni passi usano i teoremi dell'argomento «Teoremi del calcolo differenziale». Qui li richiami in una riga, con il loro nome.` },

    { id: 'dominio', titolo: 'Primo passo: il dominio', testo: R`Il primo passo è capire **dove la funzione esiste**. È il suo dominio: l'insieme delle $x$ per cui la formula dà un numero.

[[video:studio-di-funzione/dominio]]

>* **Condizioni di esistenza (c.e.)** più comuni: un denominatore deve essere $\ne 0$. Il radicando di una radice di indice pari deve essere $\ge 0$. L'argomento di un logaritmo deve essere $> 0$.

Per la funzione guida c'è solo un denominatore.

~ f(x) = \frac{x^2 - x - 2}{x - 3} :: la funzione guida
~ x - 3 \ne 0 :: il denominatore non può valere zero
~ D = \mathbb{R} \setminus \{\evidb{3}\} :: la funzione esiste ovunque, tranne in $x = 3$

**Sul piano.** Tracci una retta verticale tratteggiata in $x = 3$. La curva non la toccherà mai, perché lì la funzione non c'è. Che cosa succede **vicino** a $3$ non lo sai ancora: lo dirà il passo dei limiti.

[[grafico:sfDominio]]

Con radici e logaritmi spesso sparisce un intero pezzo di asse $x$. Per esempio $g(x) = x\sqrt{4 - x^2}$ esiste solo se $4 - x^2 \ge 0$, cioè per $-2 \le x \le 2$. Sul piano **ombreggi** le due strisce $x < -2$ e $x > 2$: lì il grafico non può stare.

[[grafico:domZone]]

?? Qual è il dominio di $h(x) = \ln(x - 1)$?
[ ] $x \ge 1$
[x] $x > 1$
[ ] $x \ne 1$
=> L'argomento di un logaritmo deve essere **positivo**, non solo diverso da zero: $x - 1 > 0$. In $x = 1$ servirebbe il logaritmo di zero, che non esiste.

>! Il dominio si calcola sulla formula **di partenza**, prima di semplificare. $\frac{x^2 - 1}{x - 1}$ non esiste in $x = 1$, anche se semplificando diventa $x + 1$.` },

    { id: 'simmetrie', titolo: 'Secondo passo: le simmetrie', testo: R`Alcune funzioni hanno un grafico simmetrico. Se te ne accorgi subito, studi solo metà grafico. L'altra metà la ottieni con uno specchio.

>* $f$ è **pari** se $f(-x) = f(x)$ per ogni $x$ del dominio: il grafico è simmetrico rispetto all'asse $y$. $f$ è **dispari** se $f(-x) = -f(x)$: il grafico è simmetrico rispetto all'origine.

Per controllare, scrivi $-x$ al posto di $x$ e confronta con $f(x)$.

Esempio: $g(x) = e^{-x^2}$. Hai $g(-x) = e^{-(-x)^2} = e^{-x^2} = g(x)$, quindi $g$ è pari. **Sul piano** basta disegnare il ramo con $x \ge 0$. Poi lo specchi rispetto all'asse $y$: il punto $P$ va in $P'$.

[[grafico:specchio]]

Per una funzione dispari lo specchio è doppio. Ribalti il ramo destro rispetto all'asse $y$, poi rispetto all'asse $x$. In tutto è mezzo giro intorno all'origine. Per esempio $h(x) = x\sqrt{4 - x^2}$ è dispari: il punto $P$ del ramo destro va in $P'$.

[[grafico:sfSimmetrie]]

>! Prima guarda il dominio. Una funzione pari o dispari ha un dominio **simmetrico**: se contiene $x$, contiene anche $-x$.

Per la funzione guida il controllo è immediato. Il dominio esclude $3$, ma non $-3$: non è simmetrico. Quindi la funzione non è né pari né dispari. **Sul piano** non c'è niente da specchiare, e lo studio va fatto tutto.

> Le funzioni goniometriche sono spesso **periodiche**: $f(x + T) = f(x)$. Allora basta studiarle su un periodo, per esempio $\Icc{0}{2\pi}$, e poi ripetere il disegno.

?? $f(x) = x^3 - x$ è pari, dispari o nessuna delle due?
[ ] Pari.
[x] Dispari.
[ ] Nessuna delle due.
=> $f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)$. Quindi è dispari: il grafico è simmetrico rispetto all'origine.` },

    { id: 'intersezioni', titolo: 'Terzo passo: le intersezioni con gli assi', testo: R`Il terzo passo cerca dove il grafico **taglia gli assi**. Sono i primi punti sicuri del piano di lavoro.

>* **Asse $x$:** risolvi $f(x) = 0$. Ogni soluzione che sta nel dominio è uno **zero** della funzione. **Asse $y$:** calcola $f(0)$, se $0$ sta nel dominio.

Una frazione vale zero quando si annulla il numeratore, ma non il denominatore.

~ x^2 - x - 2 = 0 :: il numeratore della funzione guida
~ (x + 1)(x - 2) = 0 :: scompongo: due numeri con somma $1$ e prodotto $-2$
~ x = \evidb{-1}, \quad x = \evidb{2} :: tutti e due nel dominio: sono due zeri
~ f(0) = \frac{-2}{-3} = \evidb{\frac{2}{3}} :: l'intersezione con l'asse $y$

**Sul piano.** Segni tre punti: $A(-1; 0)$ e $B(2; 0)$ sull'asse $x$, $C\left(0; \frac{2}{3}\right)$ sull'asse $y$. Il grafico passa di sicuro di lì.

[[grafico:sfPunti]]

>! Uno zero del numeratore che annulla anche il denominatore **non** è uno zero: lì la funzione non esiste. In $\frac{x^2 - 9}{x - 3}$ il valore $x = 3$ va scartato.

> Gli zeri servono anche al passo dopo. Sono i punti in cui il segno di $f$ può cambiare.

?? Dove taglia l'asse $y$ la funzione $h(x) = \frac{1}{x}$?
=> Da nessuna parte. Lo $0$ non sta nel dominio, quindi $h(0)$ non esiste e il grafico non tocca l'asse $y$.` },

    { id: 'segno', titolo: 'Quarto passo: il segno', testo: R`Il segno dice se il grafico sta **sopra o sotto** l'asse $x$, intervallo per intervallo. È il passo che toglie più spazio alla curva.

[[video:studio-di-funzione/segno]]

>* Dove $f(x) > 0$ il grafico sta **sopra** l'asse $x$. Dove $f(x) < 0$ sta **sotto**. Il segno può cambiare solo negli zeri e nei punti esclusi dal dominio.

Per una frazione studi il segno del numeratore e del denominatore. Poi metti tutto in una **tabella dei segni**.

~ N(x) = (x + 1)(x - 2) :: numeratore: positivo per $x < -1$ e per $x > 2$, perché è una parabola verso l'alto
~ D(x) = x - 3 :: denominatore: positivo per $x > 3$
~ f(x) > 0 \iff \evidb{-1 < x < 2 \ \lor \ x > 3} :: la frazione è positiva dove i due segni sono uguali

[[grafico:sfTabellaSegno]]

**Sul piano** succede la cosa più utile di tutto lo studio. In ogni intervallo **ombreggi la metà del piano dove il grafico non passa**:

- dove $f < 0$ ombreggi la zona **sopra** l'asse $x$, perché la curva sta sotto;
- dove $f > 0$ ombreggi la zona **sotto** l'asse $x$, perché la curva sta sopra.

[[grafico:sfSegno]]

Guarda il risultato: le zone libere formano una scacchiera. La curva deve restare sempre nelle zone libere. Passa da sopra a sotto solo attraversando l'asse in uno zero, oppure saltando dall'altra parte della retta tratteggiata.

>! Il segno si studia solo **dentro il dominio**. Dove la funzione non esiste non è né positiva né negativa: lì la zona è già esclusa dal primo passo.

>! Ombreggia dove la curva **non** passa, non dove passa. Così alla fine il grafico sta tutto nelle zone libere, e ogni errore salta all'occhio.

>! Se uno zero è **doppio**, come in $(x - 2)^2$, il segno lì non cambia. La curva tocca l'asse e torna indietro, senza attraversarlo.

?? Per $x > 3$ la funzione guida è positiva. Quale zona ombreggi, a destra della retta $x = 3$?
[x] Quella sotto l'asse $x$.
[ ] Quella sopra l'asse $x$.
[ ] Nessuna: si ombreggia solo dove $f$ è negativa.
=> La curva sta sopra l'asse, quindi la zona vietata è quella sotto. Si ombreggiano sempre le zone dove il grafico non può stare, sia dove $f$ è positiva sia dove è negativa.` },
    { id: 'asintoti', titolo: 'Quinto passo: limiti e asintoti', testo: R`Ora guardi che cosa fa la funzione **ai bordi** del dominio: vicino ai punti esclusi e all'infinito. Servono i limiti. La teoria degli asintoti è nell'argomento «Continuità e asintoti»: qui la usi.

[[video:studio-di-funzione/asintoti]]

>* **Asintoto verticale** $x = x_0$: almeno uno dei due limiti laterali per $x \to x_0$ è infinito. **Orizzontale** $y = \ell$: il limite per $x \to \pm\infty$ è il numero $\ell$. **Obliquo** $y = mx + q$: $m = \lim \frac{f(x)}{x}$ e $q = \lim \left[f(x) - mx\right]$ sono finiti, con $m \ne 0$.

Vicino a $x = 3$ il numeratore tende a $9 - 3 - 2 = 4$, il denominatore a $0$.

~ \lim_{x \to 3^-} f(x) = \frac{4}{0^-} = \evid{-\infty} :: a sinistra di $3$ il denominatore è negativo
~ \lim_{x \to 3^+} f(x) = \frac{4}{0^+} = \evid{+\infty} :: a destra è positivo: $x = 3$ è asintoto verticale
~ \lim_{x \to \pm\infty} f(x) = \pm\infty :: il numeratore ha grado più alto: niente asintoto orizzontale
~ m = \lim_{x \to \infty} \frac{x^2 - x - 2}{x(x - 3)} = \evid{1} :: il grado sopra supera di uno quello sotto: si cerca l'obliquo
~ q = \lim_{x \to \infty} \left(f(x) - x\right) = \evid{2} :: denominatore comune: $f(x) - x = \frac{2x - 2}{x - 3}$, che tende a $2$
~ y = \evidb{x + 2} :: l'asintoto obliquo, a destra e a sinistra

I segni dei limiti tornano con il segno di $f$. A sinistra di $3$ la funzione è negativa e scende a $-\infty$. A destra è positiva e sale a $+\infty$.

**Sul piano.** Tracci la retta tratteggiata $y = x + 2$. Poi disegni i **pezzi di ramo**: brevi tratti di curva vicino agli asintoti, nella direzione dei limiti.

[[grafico:sfAsintoti]]

Poi allunghi i pezzi verso i punti noti, restando nelle zone libere. Ottieni il **grafico probabile**: la forma della curva prima delle derivate.

[[grafico:sfProbabile]]

>! Il grafico probabile è un'ipotesi. Fra $-1$ e $2$ la curva sale e poi scende, ma non sai ancora dove sta la cima. Lo dirà la derivata prima.

>! Dalla stessa parte, per $x \to +\infty$ oppure per $x \to -\infty$, non possono esserci insieme un asintoto orizzontale e uno obliquo. Se il limite è finito l'asintoto è orizzontale, e l'obliquo non si cerca.

> Con esponenziali e logaritmi, i limiti all'infinito si risolvono spesso con de l'Hôpital. Il teorema è nell'argomento «Teoremi del calcolo differenziale». All'infinito $e^x$ batte ogni potenza, e ogni potenza batte $\ln x$.

> Per una razionale fratta la divisione fra polinomi dà subito l'asintoto: $f(x) = x + 2 + \frac{4}{x - 3}$. Il termine $\frac{4}{x - 3}$ dice anche da che parte sta la curva: sotto l'asintoto per $x < 3$, sopra per $x > 3$.` },

    { id: 'derivata-prima', titolo: 'Sesto passo: la derivata prima', testo: R`La derivata prima dice dove la funzione **sale** e dove **scende**. Lo garantisce il criterio di monotonia, conseguenza del teorema di Lagrange: su un intervallo, $f' > 0$ vuol dire crescente e $f' < 0$ decrescente.

[[video:studio-di-funzione/derivata-prima]]

>* **Il metodo.** Calcola $f'(x)$ e studia il suo segno con una tabella dei segni. Prendi un punto del dominio in cui $f$ è continua. Se lì $f'$ passa da $+$ a $-$, c'è un **massimo** relativo. Se passa da $-$ a $+$, c'è un **minimo**.

Per la funzione guida conviene la forma $f(x) = x + 2 + \frac{4}{x - 3}$.

~ f'(x) = 1 - \frac{4}{(x - 3)^2} :: la derivata di $4(x - 3)^{-1}$ è $-4(x - 3)^{-2}$
~ f'(x) = \frac{\evid{(x - 1)(x - 5)}}{(x - 3)^2} :: denominatore comune: $(x - 3)^2 - 4 = x^2 - 6x + 5$, poi scompongo
~ f'(x) > 0 \iff x < 1 \ \lor \ x > 5 :: il denominatore è un quadrato: il segno lo decide il numeratore

[[grafico:sfTabellaDerivata]]

~ x = 1: \ + \to - \ \Rightarrow \ \text{massimo } \evidb{(1; 1)} :: $f(1) = \frac{1 - 1 - 2}{1 - 3} = \frac{-2}{-2} = 1$
~ x = 3: \ \text{fuori dal dominio} :: qui $f$ non esiste, e comunque $f'$ non cambia segno: niente estremo
~ x = 5: \ - \to + \ \Rightarrow \ \text{minimo } \evidb{(5; 9)} :: $f(5) = \frac{25 - 5 - 2}{5 - 3} = \frac{18}{2} = 9$

**Sul piano.** In ogni intervallo disegni una freccia che sale o che scende. Nei punti stazionari metti un **trattino orizzontale**: è la tangente, orizzontale perché lì $f' = 0$. Il teorema di Fermat ti dice dove cercare: dove $f$ è derivabile, i massimi e i minimi stanno fra questi punti.

[[grafico:sfMonotonia]]

>! Il massimo $(1; 1)$ sta più in basso del minimo $(5; 9)$. Non è un errore: «relativo» vuol dire più alto dei punti **vicini**. In mezzo c'è l'asintoto.

>! $f'(x_0) = 0$ non basta per un massimo o un minimo: serve il **cambio di segno** di $f'$. Per $y = x^3$ hai $f'(0) = 0$, ma la funzione cresce sempre.

>! Non scrivere «decrescente in $\Iaa{1}{3} \cup \Iaa{3}{5}$». In $3$ la funzione salta da $-\infty$ a $+\infty$: è decrescente in $\Iaa{1}{3}$ e in $\Iaa{3}{5}$, separatamente.

### Dove $f'$ non esiste

Se $f$ è continua in $x_0$ ma $f'(x_0)$ non esiste, segna il punto a parte: può essere un massimo o un minimo. I casi sono tre, studiati nell'argomento «Derivate».

- **Punto angoloso**: derivate destra e sinistra finite e diverse, come $|x^2 - 4|$ in $x = \pm 2$.
- **Cuspide**: derivate infinite di segno opposto, come $\sqrt[3]{x^2}$ in $0$.
- **Flesso a tangente verticale**: derivate infinite dello stesso segno, come $\sqrt[3]{x}$ in $0$.` },

    { id: 'derivata-seconda', titolo: 'Settimo passo: la derivata seconda', testo: R`La derivata seconda dice **da che parte si piega** il grafico.

[[video:studio-di-funzione/concavita]]

>* Se $f''(x) > 0$, la concavità è **verso l'alto**, come una tazza. Se $f''(x) < 0$, è **verso il basso**. Un **flesso** è un punto del grafico in cui la concavità cambia verso. Lì deve esistere la tangente, anche verticale.

~ f'(x) = 1 - 4(x - 3)^{-2} :: la derivata prima della guida, scritta come potenza
~ f''(x) = 8(x - 3)^{-3} = \evid{\frac{8}{(x - 3)^3}} :: derivo ancora: l'esponente $-2$ diventa $-3$
~ f''(x) > 0 \iff x > 3 :: un cubo ha il segno della sua base $x - 3$: verso l'alto a destra di $3$, verso il basso a sinistra

La concavità cambia in $x = 3$, dove la funzione non esiste. Quindi **nessun flesso**.

**Sul piano.** Su ogni ramo disegni un piccolo arco: a cupola dove la concavità è verso il basso, a tazza dove è verso l'alto.

[[grafico:sfConcavita]]

La guida non ha flessi: guardali allora su $g(x) = x^3 - 3x^2$.

~ g'(x) = 3x^2 - 6x :: derivo una volta
~ g''(x) = \evid{6x - 6} :: e poi ancora
~ g''(x) > 0 \iff x > 1 :: verso il basso prima di $1$, verso l'alto dopo: la concavità cambia
~ \text{flesso } \evidb{(1; -2)}, \quad g'(1) = -3 :: $g(1) = 1 - 3 = -2$, e lì la pendenza è $-3$
~ y = -3x + 1 :: la **tangente inflessionale**: $y + 2 = -3(x - 1)$

La tangente inflessionale **attraversa** la curva: da una parte la curva sta sopra, dall'altra sotto.

[[grafico:flesso]]

>! $f''(x_0) = 0$ non basta per un flesso: $f''$ deve anche **cambiare segno**. Per $y = x^4$ hai $f''(0) = 0$, ma $f''(x) = 12x^2$ resta positiva. In $0$ c'è un minimo.

| flesso | tangente | esempio nell'origine |
|---|---|---|
| a tangente orizzontale | $f'(x_0) = 0$ | $y = x^3$ |
| a tangente obliqua | $f'(x_0) \ne 0$ | $y = x^3 - 3x$ |
| a tangente verticale | $\lvert f'(x) \rvert \to +\infty$ | $y = \sqrt[3]{x}$ |

> **Test della derivata seconda.** Se $f'(x_0) = 0$ e $f''(x_0) < 0$, in $x_0$ c'è un massimo; se $f''(x_0) > 0$, un minimo. Se $f''(x_0) = 0$ il test non decide. Per la guida $f''(1) = -1$ e $f''(5) = 1$: massimo e minimo, come già sapevi.` },

    { id: 'grafico', titolo: 'Ottavo passo: il grafico', testo: R`Ora metti tutto insieme. Disegni gli asintoti e segni i punti. Poi tracci la curva seguendo le frecce e gli archi.

[[video:studio-di-funzione/grafico]]

>* Il grafico finale rispetta **tutti** i passi insieme. Sta nelle zone libere e passa per i punti trovati. Sale e scende come dicono le frecce, e si piega come dicono gli archi.

[[grafico:sfFinale]]

Prima di chiudere fai i **controlli di coerenza**. Ogni passo controlla gli altri.

- Ogni punto calcolato sta in una zona libera? Il massimo $(1; 1)$ cade in $\Iaa{-1}{2}$, dove $f > 0$: l'ordinata positiva torna. Anche il minimo $(5; 9)$ cade dove $f > 0$.
- I limiti hanno il segno giusto? A sinistra di $3$ la funzione è negativa e va a $-\infty$: torna.
- Fra due zeri c'è un massimo o un minimo? Fra $-1$ e $2$ la curva sale e poi scende: c'è il massimo in $1$.
- Concavità ed estremi vanno d'accordo? Il massimo sta su un arco a cupola, il minimo su un arco a tazza.

>! Se un controllo non torna, c'è un errore di calcolo. Un massimo dove il segno dice «sotto l'asse» deve avere ordinata **negativa**. Se ti viene positiva, rifai i conti.

### Leggere insieme $f$, $f'$ e $f''$

Nel grafico qui sotto ci sono $f(x) = x^3 - 3x$ e le sue derivate. Dove $f'$ sta sopra l'asse $x$, $f$ sale. Gli zeri di $f'$ sono i punti stazionari di $f$. Lo zero di $f''$ è il flesso di $f$.

[[grafico:derivate]]

?? Uno studente trova $f > 0$ per $x > 2$ e un minimo in $(4; -3)$. Che cosa gli dici?
[x] C'è un errore: per $x > 2$ l'ordinata deve essere positiva.
[ ] Va bene: un minimo sta sempre sotto l'asse.
[ ] Va bene: il segno di $f$ e i minimi non sono collegati.
=> Il segno dice che per $x > 2$ la curva sta sopra l'asse. Un punto con ordinata $-3$ cadrebbe in una zona ombreggiata. Uno dei due calcoli è sbagliato.` },

    { id: 'ottimizzazione', titolo: 'Problemi di ottimizzazione', testo: R`Molti problemi chiedono l'area più grande o il costo più basso. Si risolvono studiando una funzione, e lo schema è sempre lo stesso.

[[video:studio-di-funzione/ottimizzazione]]

1. Scegli la variabile e dalle un nome.
2. Scrivi la grandezza da ottimizzare in funzione di **quella sola variabile**.
3. Trova il **dominio del problema**: i valori che hanno senso.
4. Studia il segno della derivata e concludi. Controlla anche gli estremi del dominio.

>* Derivare è la parte facile. La parte difficile è scrivere la grandezza con **una sola** variabile e capire quali valori può prendere.

Esempio: fra tutti i rettangoli di perimetro $20$ cm, qual è quello di area massima?

~ A(x) = x(10 - x) :: base $x$; il semiperimetro è $10$, quindi l'altezza è $10 - x$
~ 0 < x < 10 :: dominio del problema: base e altezza devono essere positive
~ A'(x) = 10 - 2x :: derivo $A(x) = 10x - x^2$
~ A'(x) > 0 \iff x < 5 :: l'area cresce finché la base arriva a $5$, poi cala
~ x = \evidb{5}, \quad A(5) = \evidb{25}\ \text{cm}^2 :: massimo: base $5$ e altezza $10 - 5 = 5$

Fra tutti i rettangoli con lo stesso perimetro, il più grande è il **quadrato**.

Nel grafico ogni punto $P$ della curva è un rettangolo: in alto leggi base, altezza e area.

[[grafico:ottimizzazione]]

>! La formula $A(x) = 10x - x^2$ vale per ogni $x$. Ma una base negativa, o più lunga di $10$, non ha senso.

>! Se l'intervallo è **chiuso**, cerca il massimo anche agli estremi, dove la derivata può non annullarsi. Se è **aperto**, il massimo può anche mancare.

> Se la grandezza contiene una radice quadrata, come una distanza, lavora sul suo **quadrato**. I punti di massimo e di minimo sono gli stessi, e i conti sono più semplici.` }
  ],
  grafici: {
    /* ---- tabelle dei segni, come sul quaderno (tipo 'segni', SCHEMA.md §3) ---- */
    sfTabellaSegno: { tipo: 'segni', valori: ['-1', '2', '3'],
      righe: [ { nome: 'N', segni: ['+', '−', '+', '+'], zeri: [0, 1] }, { nome: 'D', segni: ['−', '−', '−', '+'], zeri: [2] } ],
      risultato: { nome: 'f', segni: ['−', '+', '−', '+'], zeri: [0, 1], esclusi: [2] },
      didascalia: 'N = (x + 1)(x − 2), D = x − 3. La funzione si annulla in −1 e in 2; in 3 non esiste (✗).' },
    sfTabellaDerivata: { tipo: 'segni', valori: ['1', '3', '5'],
      righe: [ { nome: "f'", segni: ['+', '−', '−', '+'], zeri: [0, 2], esclusi: [1] } ],
      andamento: { nome: 'f', frecce: ['↗', '↘', '↘', '↗'], punti: ['max', '', 'min'], esclusi: [1] },
      didascalia: 'Segno di f′ e andamento di f: in 3 né f né f′ esistono (✗), e lì non c\'è nessun estremo.' },
    esTabellaSegno: { tipo: 'segni', valori: ['-1', '0', '1'],
      righe: [ { nome: 'x', segni: ['−', '−', '+', '+'], zeri: [1] }, { nome: 'x^2 - 1', segni: ['+', '−', '−', '+'], zeri: [0, 2] } ],
      risultato: { nome: 'f', segni: ['−', '+', '−', '+'], zeri: [1], esclusi: [0, 2] },
      didascalia: 'Segno di f(x) = x/(x² − 1): zero in 0, e in −1 e in 1 la funzione non esiste (✗).' },
    /* ---- il piano di lavoro della funzione guida, passo dopo passo ---- */
    sfDominio: piano({
      elementi: [
        VERT,
        { tipo: 'testo', p: [3.3, -6.5], testo: 'qui f non esiste', ancora: 'start' }
      ],
      didascalia: 'Passo 1, il dominio. La funzione guida non esiste in x = 3: sul piano c\'è solo la retta tratteggiata x = 3, che la curva non toccherà mai.'
    }),
    sfSimmetrie: {
      tipo: 'piano', x: [-2.6, 2.6], y: [-2.6, 2.6], passo: [1, 1], mirino: false,
      funzioni: [
        { f: 'x*sqrt(4 - x^2)', colore: 1, dominio: [0, 2] },
        { f: 'x*sqrt(4 - x^2)', colore: 1, tratteggio: true, dominio: [-2, 0] }
      ],
      punti: [
        { x: 1, y: 'sqrt(3)', etichetta: 'P', posizione: 'alto-sinistra', colore: 2 },
        { x: -1, y: '-sqrt(3)', etichetta: 'P′', posizione: 'basso-destra', colore: 2 }
      ],
      elementi: [
        { tipo: 'segmento', da: [-1, '-sqrt(3)'], a: [1, 'sqrt(3)'], tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [1.5, -1.2], testo: 'studiato' },
        { tipo: 'testo', p: [-1.5, 1.4], testo: 'specchiato' }
      ],
      didascalia: 'h(x) = x√(4 − x²) è dispari: si studia il ramo con x ≥ 0 (linea piena) e gli si fa fare mezzo giro intorno all\'origine (tratteggio). P(1; √3) va in P′(−1; −√3).'
    },
    sfPunti: piano({
      punti: PUNTI,
      elementi: [VERT],
      didascalia: 'Passo 3, le intersezioni con gli assi: A(−1; 0), B(2; 0) e C(0; 2/3). Sono i primi punti sicuri della curva.'
    }),
    sfSegno: piano({
      punti: PUNTI,
      elementi: SEGNO.concat([
        VERT,
        { tipo: 'testo', p: [-2.5, -3.5], testo: 'f < 0' },
        { tipo: 'testo', p: [1.05, 5], testo: 'f > 0' },
        { tipo: 'testo', p: [2.5, -3.5], testo: '−' },
        { tipo: 'testo', p: [6.5, 4], testo: 'f > 0' }
      ]),
      didascalia: 'Passo 4, il segno. In viola le zone dove la curva non può passare: sopra l\'asse dove f è negativa, sotto dove è positiva. Il grafico deve restare nelle zone libere.'
    }),
    sfAsintoti: piano({
      punti: PUNTI,
      funzioni: [
        { f: GUIDA, colore: 1, dominio: [-4, -2.6] },
        { f: GUIDA, colore: 1, dominio: [2.55, 2.99] },
        { f: GUIDA, colore: 1, dominio: [3.01, 4] },
        { f: GUIDA, colore: 1, dominio: [8, 10] }
      ],
      elementi: SEGNO.concat([VERT, OBL, OBL_ET]),
      didascalia: 'Passo 5, limiti e asintoti. Le rette tratteggiate x = 3 e y = x + 2, con i pezzi di ramo: verso −∞ a sinistra di 3, verso +∞ a destra, e lungo l\'asintoto obliquo ai due lati.'
    }),
    sfProbabile: piano({
      punti: PUNTI,
      funzioni: [
        { f: GUIDA, colore: 1, tratteggio: true, dominio: [-4, -1] },
        { f: GUIDA, colore: 1, tratteggio: true, dominio: [2, 2.97] },
        { f: GUIDA, colore: 1, tratteggio: true, dominio: [3.03, 4.2] },
        { f: GUIDA, colore: 1, tratteggio: true, dominio: [7, 10] }
      ],
      elementi: SEGNO.concat([
        VERT, OBL, OBL_ET,
        { tipo: 'testo', p: [0.6, 3.4], testo: '?' },
        { tipo: 'testo', p: [5.6, 11.6], testo: '?' }
      ]),
      didascalia: 'Il grafico probabile: i pezzi di ramo allungati fino ad A e B, nelle zone libere. Fra A e B la curva deve salire e poi scendere; a destra di 3 deve scendere e poi risalire. Dove stiano le cime (i punti di domanda) lo dirà la derivata prima.'
    }),
    sfMonotonia: piano({
      punti: PUNTI.concat([
        { x: 1, y: 1, colore: 2 },
        { x: 5, y: 9, colore: 2 }
      ]),
      funzioni: [{ f: GUIDA, colore: 1, tratteggio: true }],
      elementi: SEGNO.concat([
        VERT, OBL, OBL_ET,
        { tipo: 'testo', p: [1.2, 3.2], testo: 'M(1; 1)' },
        { tipo: 'testo', p: [5, 10.8], testo: 'm(5; 9)' },
        { tipo: 'segmento', da: [0.3, 1], a: [1.7, 1], colore: 2 },
        { tipo: 'segmento', da: [4.3, 9], a: [5.7, 9], colore: 2 },
        { tipo: 'segmento', da: [-3.6, -7.4], a: [0.4, -5.4], freccia: true, colore: 2 },
        { tipo: 'segmento', da: [1.2, -5.4], a: [2.3, -7.4], freccia: true, colore: 2 },
        { tipo: 'segmento', da: [3.4, -5.4], a: [4.6, -7.4], freccia: true, colore: 2 },
        { tipo: 'segmento', da: [5.6, -7.4], a: [9.6, -5.4], freccia: true, colore: 2 }
      ]),
      didascalia: 'Passo 6, la derivata prima. Le frecce in basso dicono dove la curva sale e dove scende. Nel massimo M e nel minimo m il trattino orizzontale è la tangente.'
    }),
    sfConcavita: piano({
      punti: PUNTI.concat([
        { x: 1, y: 1, colore: 2 },
        { x: 5, y: 9, colore: 3 }
      ]),
      funzioni: [
        { f: GUIDA, colore: 2, dominio: [-4, 2.99] },
        { f: GUIDA, colore: 3, dominio: [3.01, 10] },
        { f: '-(x + 2.5)^2 + 8', colore: 2, dominio: [-3.3, -1.7] },
        { f: '(x - 7.5)^2 + 3.5', colore: 3, dominio: [6.7, 8.3] }
      ],
      elementi: SEGNO.concat([
        VERT, OBL, OBL_ET,
        { tipo: 'testo', p: [1.2, 3.2], testo: 'M' },
        { tipo: 'testo', p: [5, 10.8], testo: 'm' },
        { tipo: 'testo', p: [-2.5, 6], testo: 'verso il basso' },
        { tipo: 'testo', p: [7.5, 2.2], testo: 'verso l\'alto' }
      ]),
      didascalia: 'Passo 7, la derivata seconda. A sinistra di x = 3 la concavità è verso il basso (arancio, arco a cupola), a destra verso l\'alto (verde, arco a tazza). Cambia solo dove la funzione non esiste: nessun flesso.'
    }),
    sfFinale: {
      tipo: 'piano', x: [-4, 10], y: [-8, 14], passo: [1, 2],
      parametri: [{ nome: 'p', min: -3.95, max: 9.95, passo: 0.1, valore: 1, nascosto: true }],
      funzioni: [{ f: GUIDA, colore: 1 }],
      punti: PUNTI.concat([
        { x: 1, y: 1, colore: 1 },
        { x: 5, y: 9, colore: 1 }
      ]),
      elementi: SEGNO.concat([
        VERT, OBL, OBL_ET,
        { tipo: 'testo', p: [1.2, 3.2], testo: 'M(1; 1)' },
        { tipo: 'testo', p: [5, 10.8], testo: 'm(5; 9)' },
        /* la tangente in P: un trattino corto, per non confonderla con gli asintoti */
        { tipo: 'segmento', da: ['p - ' + K_TG, Y_TG + ' - ' + M_TG + '*' + K_TG], a: ['p + ' + K_TG, Y_TG + ' + ' + M_TG + '*' + K_TG], colore: 2 },
        { tipo: 'punto', p: ['p', '(p^2 - p - 2)/(p - 3)'], trascina: true, etichetta: 'P', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'testo', p: [3.3, -7], testo: "f'(p) = {{(p - 1)*(p - 5)/(p - 3)^2}}", ancora: 'start' }
      ]),
      didascalia: "Passo 8, il grafico. La curva sta tutta nelle zone libere, passa per A, B, C, M e m e si avvicina agli asintoti. P parte dal massimo M: trascinalo lungo la curva. Dove f'(p) vale zero il trattino arancio della tangente è orizzontale."
    },

    /* ---- grafici di appoggio ---- */
    domZone: {
      tipo: 'piano', x: [-3.6, 3.6], y: [-3, 3], passo: [1, 1], mirino: false,
      elementi: [
        { tipo: 'area', f: '3', g: '-3', da: -3.6, a: -2, colore: 4 },
        { tipo: 'area', f: '3', g: '-3', da: 2, a: 3.6, colore: 4 },
        { tipo: 'verticale', x: -2, colore: 4 },
        { tipo: 'verticale', x: 2, colore: 4 }
      ],
      didascalia: 'Il dominio di g(x) = x√(4 − x²) è −2 ≤ x ≤ 2. Le strisce viola sono escluse: lì il grafico non può stare.'
    },
    specchio: {
      tipo: 'piano', x: [-3, 3], y: [-0.3, 1.3], passo: [1, 0.5],
      funzioni: [
        { f: 'exp(-x^2)', colore: 1, dominio: [0, 3] },
        { f: 'exp(-x^2)', colore: 1, tratteggio: true, dominio: [-3, 0] }
      ],
      punti: [
        { x: 1, y: 'exp(-1)', etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { x: -1, y: 'exp(-1)', etichetta: 'P′', posizione: 'alto-sinistra', colore: 2 }
      ],
      elementi: [
        { tipo: 'segmento', da: [-1, 'exp(-1)'], a: [1, 'exp(-1)'], tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [1.9, 0.75], testo: 'studiato' },
        { tipo: 'testo', p: [-1.9, 0.75], testo: 'specchiato' }
      ],
      didascalia: 'g(x) = e^(−x²) è pari: si studia il ramo con x ≥ 0 (linea piena) e lo si specchia rispetto all\'asse y (tratteggio). P va in P′, alla stessa altezza.'
    },
    flesso: {
      tipo: 'piano', x: [-1.5, 3.5], y: [-5, 2], passo: [1, 1],
      funzioni: [
        { f: 'x^3 - 3x^2', colore: 2, dominio: [-1.5, 1] },
        { f: 'x^3 - 3x^2', colore: 3, dominio: [1, 3.5] }
      ],
      punti: [{ x: 1, y: -2, etichetta: 'F(1; −2)', posizione: 'destra', colore: 1 }],
      elementi: [{ tipo: 'retta', m: -3, q: 1, tratteggio: true, colore: 4 }],
      didascalia: 'g(x) = x³ − 3x²: concavità verso il basso fino a x = 1 (arancio), verso l\'alto dopo (verde). In F la tangente inflessionale y = −3x + 1 (viola) attraversa la curva.'
    },
    derivate: {
      tipo: 'piano', x: [-2.4, 2.4], y: [-6.5, 6.5], passo: [1, 2],
      parametri: [{ nome: 'p', min: -2.3, max: 2.3, passo: 0.05, valore: -1.6, nascosto: true }],
      funzioni: [
        { f: 'x^3 - 3x', etichetta: 'f', colore: 1 },
        { f: '3x^2 - 3', etichetta: "f'", colore: 2 },
        { f: '6x', etichetta: 'f″', colore: 3 }
      ],
      elementi: [
        { tipo: 'verticale', x: 'p', tratteggio: true, colore: 4 },
        { tipo: 'punto', p: ['p', '3p^2 - 3'], colore: 2 },
        { tipo: 'punto', p: ['p', '6p'], colore: 3 },
        { tipo: 'punto', p: ['p', 'p^3 - 3p'], trascina: true, etichetta: 'P', posizione: 'sinistra', colore: 1 },
        { tipo: 'testo', p: [0.2, -4.8], testo: "f'(x) = {{3p^2 - 3}}", ancora: 'start' },
        { tipo: 'testo', p: [0.2, -6], testo: "f″(x) = {{6p}}", ancora: 'start' }
      ],
      didascalia: "Trascina P lungo la curva blu (f). Fermati in x = −1 e in x = 1: f' vale zero e f ha la gobba. Fermati in x = 0: si annulla f″, e la curva blu cambia il verso in cui si piega."
    },
    esEsp: {
      tipo: 'piano', x: [-1.5, 7.5], y: [-1, 0.6], passo: [1, 0.2], altezza: 320,
      funzioni: [{ f: 'x*exp(-x)', etichetta: 'y = x·e^(−x)', colore: 1 }],
      punti: [
        { x: 0, y: 0, colore: 1 },
        { x: 1, y: 'exp(-1)', etichetta: 'M(1; 1/e)', posizione: 'alto', colore: 2 },
        { x: 2, y: '2*exp(-2)', etichetta: 'F', posizione: 'alto-destra', colore: 3 }
      ],
      didascalia: 'y = x·e^(−x): sale fino al massimo M(1; 1/e), poi scende verso l\'asintoto y = 0 (l\'asse x). In F(2; 2/e²) la concavità passa da verso il basso a verso l\'alto.'
    },
    esLog: {
      tipo: 'piano', x: [-0.5, 12], y: [-1.6, 0.6], passo: [1, 0.2], altezza: 340,
      funzioni: [{ f: 'ln(x)/x', etichetta: 'y = ln x / x', colore: 1, dominio: [0.02, 12] }],
      punti: [
        { x: 1, y: 0, colore: 1 },
        { x: 'e', y: 'exp(-1)', etichetta: 'M(e; 1/e)', posizione: 'alto', colore: 2 },
        { x: 'exp(1.5)', y: '1.5*exp(-1.5)', etichetta: 'F', posizione: 'alto-destra', colore: 3 }
      ],
      didascalia: 'y = ln x / x: viene da −∞ lungo l\'asse y (asintoto x = 0), taglia l\'asse x in 1, ha il massimo M(e; 1/e) e poi scende lentamente verso y = 0. F è il flesso, in x = e^(3/2).'
    },
    esRad: {
      tipo: 'piano', x: [-3, 3], y: [-2.6, 2.6], passo: [1, 1],
      funzioni: [{ f: 'x*sqrt(4 - x^2)', colore: 1 }],
      punti: [
        { x: 'sqrt(2)', y: 2, etichetta: 'M(√2; 2)', posizione: 'alto-destra', colore: 2 },
        { x: '-sqrt(2)', y: -2, etichetta: 'm(−√2; −2)', posizione: 'basso-sinistra', colore: 2 },
        { x: 0, y: 0, etichetta: 'F', posizione: 'alto-sinistra', colore: 3 },
        { x: -2, y: 0, colore: 1 }, { x: 2, y: 0, colore: 1 }
      ],
      elementi: [
        { tipo: 'area', f: '2.6', g: '-2.6', da: -3, a: -2, colore: 4 },
        { tipo: 'area', f: '2.6', g: '-2.6', da: 2, a: 3, colore: 4 },
        { tipo: 'retta', m: 2, q: 0, tratteggio: true, colore: 3 }
      ],
      didascalia: 'y = x√(4 − x²) esiste solo fra −2 e 2 (fuori, le strisce viola). È dispari: massimo M e minimo m sono simmetrici rispetto all\'origine, dove c\'è il flesso F con tangente y = 2x.'
    },
    ottimizzazione: {
      tipo: 'piano', x: [-1, 11], y: [-4, 30], passo: [1, 5],
      funzioni: [{ f: 'x*(10 - x)', etichetta: 'A(x) = x(10 − x)', colore: 1, dominio: [0, 10] }],
      elementi: [
        { tipo: 'segmento', da: ['b', 0], a: ['b', 'b*(10-b)'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['b', 'b*(10-b)'], trascina: true, etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [0.3, 28], testo: 'base x = {{b}}    altezza = {{10 - b}}    area = {{b*(10-b)}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'b', min: 0.5, max: 9.5, passo: 0.1, valore: 2, nascosto: true }],
      didascalia: "Rettangoli di perimetro 20. Trascina P: la base cambia, l'altezza si adegua e l'area sale e scende. Per quale base l'area smette di crescere?"
    }
  },
  esempi: [
    { titolo: 'Concavità e flessi di un polinomio', problema: R`Studia concavità e flessi di $f(x) = x^4 - 6x^2$.`, passi: [
      R`$f'(x) = 4x^3 - 12x = 4x(x^2 - 3)$, che si annulla in $x = 0$ e $x = \pm\sqrt{3}$: un massimo relativo in $(0; 0)$ e due minimi in $(\pm\sqrt{3}; -9)$.`,
      R`$f''(x) = 12x^2 - 12 = 12(x^2 - 1)$.`,
      R`$f'' > 0$ per $x < -1$ e per $x > 1$: concavità verso l'alto. Per $-1 < x < 1$ la concavità è verso il basso.`,
      R`In $x = \pm 1$ la derivata seconda si annulla **e cambia segno**: sono due flessi, di ordinata $f(\pm 1) = 1 - 6 = -5$.`,
      R`Le tangenti inflessionali non sono orizzontali: $f'(1) = -8$ e $f'(-1) = 8$. I flessi sono a tangente obliqua.`
    ], risultato: R`Flessi in $(-1; -5)$ e $(1; -5)$, a tangente obliqua; concavità verso l'alto fuori da $\Icc{-1}{1}$` },

    { titolo: 'Studio completo di un\'esponenziale', problema: R`Studia la funzione $f(x) = x\,e^{-x}$ e disegnane il grafico.`, passi: [
      R`**Dominio e simmetrie.** $x$ ed $e^{-x}$ esistono per ogni $x$: il dominio è $\mathbb{R}$. $f(-x) = -x\,e^{x}$, che non è né $f(x)$ né $-f(x)$: nessuna simmetria.`,
      R`**Intersezioni e segno.** $e^{-x}$ è sempre positivo, quindi $f(x) = 0$ solo per $x = 0$, e il segno di $f$ è quello di $x$. Sul piano ombreggi sotto l'asse per $x > 0$ e sopra l'asse per $x < 0$.`,
      R`**Limiti.** Per $x \to -\infty$: $x \to -\infty$ ed $e^{-x} \to +\infty$, quindi $f \to -\infty$. Per $x \to +\infty$ è la forma $\infty \cdot 0$: scrivi $\dfrac{x}{e^x}$ e con de l'Hôpital ottieni $\dfrac{1}{e^x} \to 0$. Asintoto orizzontale $y = 0$, solo a destra. A sinistra niente obliquo, perché $\dfrac{f(x)}{x} = e^{-x} \to +\infty$.`,
      R`**Derivata prima.** $f'(x) = e^{-x} - x\,e^{-x} = (1 - x)e^{-x}$. È positiva per $x < 1$ e negativa per $x > 1$: massimo in $\left(1; \dfrac{1}{e}\right)$, circa $(1; 0{,}37)$.`,
      R`**Derivata seconda.** $f''(x) = -e^{-x} - (1 - x)e^{-x} = (x - 2)e^{-x}$. Concavità verso il basso per $x < 2$, verso l'alto per $x > 2$: flesso in $\left(2; \dfrac{2}{e^2}\right)$, circa $(2; 0{,}27)$.`,
      R`**Grafico.** Sale da $-\infty$, passa per l'origine, raggiunge il massimo in $x = 1$, poi scende. Dopo il flesso si appoggia sull'asse $x$, restando sopra.

[[grafico:esEsp]]`
    ], risultato: R`Massimo $\left(1; \frac{1}{e}\right)$, flesso $\left(2; \frac{2}{e^2}\right)$, asintoto $y = 0$ per $x \to +\infty$` },

    { titolo: 'Studio completo di una funzione logaritmica', problema: R`Studia la funzione $f(x) = \dfrac{\ln x}{x}$.`, passi: [
      R`**Dominio.** Serve $x > 0$ per il logaritmo, e $x \ne 0$ per il denominatore: il dominio è $x > 0$. Sul piano ombreggi tutto il semipiano $x \le 0$. Simmetrie: impossibili, il dominio non è simmetrico.`,
      R`**Intersezioni e segno.** Il denominatore $x$ è positivo, quindi il segno è quello di $\ln x$: zero in $x = 1$, negativa per $0 < x < 1$, positiva per $x > 1$.`,
      R`**Limiti.** Per $x \to 0^+$: $\ln x \to -\infty$ e $x \to 0^+$, quindi $f \to -\infty$. L'asse $y$ è asintoto verticale. Per $x \to +\infty$ è $\dfrac{\infty}{\infty}$: con de l'Hôpital $\dfrac{1/x}{1} \to 0$. Asintoto orizzontale $y = 0$.`,
      R`**Derivata prima.** $f'(x) = \dfrac{\frac{1}{x} \cdot x - \ln x}{x^2} = \dfrac{1 - \ln x}{x^2}$. È positiva per $\ln x < 1$, cioè $x < e$: massimo in $\left(e; \dfrac{1}{e}\right)$.`,
      R`**Derivata seconda.** $f''(x) = \dfrac{-\frac{1}{x} \cdot x^2 - (1 - \ln x) \cdot 2x}{x^4} = \dfrac{2\ln x - 3}{x^3}$. Si annulla per $\ln x = \dfrac{3}{2}$, cioè $x = e^{3/2} \approx 4{,}48$, e lì cambia segno: è un flesso.`,
      R`**Controllo di coerenza.** Il massimo ha ordinata $\dfrac{1}{e} > 0$ e sta in $x = e > 1$, dove $f > 0$: torna.

[[grafico:esLog]]`
    ], risultato: R`Asintoti $x = 0$ e $y = 0$; massimo $\left(e; \frac{1}{e}\right)$; flesso in $x = e^{3/2}$` },

    { titolo: 'Studio completo di una funzione con radice', problema: R`Studia la funzione $f(x) = x\sqrt{4 - x^2}$.`, passi: [
      R`**Dominio.** $4 - x^2 \ge 0$, cioè $-2 \le x \le 2$. Sul piano ombreggi le strisce $x < -2$ e $x > 2$.`,
      R`**Simmetrie.** $f(-x) = -x\sqrt{4 - x^2} = -f(x)$: la funzione è dispari. Basta studiarla per $0 \le x \le 2$ e poi fare mezzo giro intorno all'origine.`,
      R`**Zeri e segno.** $f(x) = 0$ per $x = 0$ e per $x = \pm 2$. La radice non è mai negativa, quindi $f$ ha il segno di $x$.`,
      R`**Limiti.** Il dominio è un intervallo chiuso e limitato e $f$ è continua: nessun asintoto. Agli estremi $f(\pm 2) = 0$.`,
      R`**Derivata prima.** $f'(x) = \sqrt{4 - x^2} + x \cdot \dfrac{-x}{\sqrt{4 - x^2}} = \dfrac{4 - 2x^2}{\sqrt{4 - x^2}}$. Nella metà destra è positiva per $x < \sqrt{2}$: massimo in $(\sqrt{2}; 2)$, perché $f(\sqrt{2}) = \sqrt{2} \cdot \sqrt{2} = 2$. Per simmetria, minimo in $(-\sqrt{2}; -2)$.`,
      R`**Punti di bordo.** Per $x \to 2^-$ il numeratore di $f'$ tende a $-4$ e il denominatore a $0^+$: $f' \to -\infty$, la tangente in $(2; 0)$ è verticale. Lo stesso in $(-2; 0)$.`,
      R`**Concavità.** Si trova $f''(x) = \dfrac{2x(x^2 - 6)}{(4 - x^2)\sqrt{4 - x^2}}$. Dentro il dominio $x^2 - 6 < 0$, quindi $f''$ ha il segno opposto a $x$: flesso nell'origine, con tangente $y = f'(0)\,x = 2x$.

[[grafico:esRad]]`
    ], risultato: R`Dispari; massimo $(\sqrt{2}; 2)$, minimo $(-\sqrt{2}; -2)$, flesso $(0; 0)$; tangenti verticali agli estremi` },

    { titolo: 'Una razionale fratta sempre decrescente', problema: R`Studia $f(x) = \dfrac{x}{x^2 - 1}$, fino a concavità e flessi.`, passi: [
      R`**Dominio e simmetrie.** $x^2 - 1 \ne 0$: $D = \mathbb{R} \setminus \{-1; 1\}$, simmetrico. $f(-x) = \dfrac{-x}{x^2 - 1} = -f(x)$: dispari.`,
      R`**Zeri e segno.** Zero in $x = 0$. Tabella dei segni con $x$ e $(x - 1)(x + 1)$: negativa per $x < -1$, positiva fra $-1$ e $0$, negativa fra $0$ e $1$, positiva per $x > 1$.

[[grafico:esTabellaSegno]]`,
      R`**Limiti.** In $x = \pm 1$ il numeratore vale $\pm 1$ e il denominatore tende a $0$: due asintoti verticali. Per esempio $\lim_{x \to 1^+} f(x) = \dfrac{1}{0^+} = +\infty$. All'infinito il denominatore ha grado più alto: asintoto $y = 0$.`,
      R`**Derivata prima.** $f'(x) = \dfrac{(x^2 - 1) - x \cdot 2x}{(x^2 - 1)^2} = -\dfrac{x^2 + 1}{(x^2 - 1)^2}$, sempre negativa. Niente massimi né minimi: la funzione decresce su **ciascuno** dei tre intervalli del dominio.`,
      R`**Derivata seconda.** Si trova $f''(x) = \dfrac{2x(x^2 + 3)}{(x^2 - 1)^3}$. Il segno cambia in $0$, $-1$ e $1$, ma solo $0$ sta nel dominio: flesso in $(0; 0)$, con tangente $y = -x$, perché $f'(0) = -1$.`,
      R`**Controllo.** $2 > 0{,}5$, ma $f(2) = \dfrac{2}{3}$ è maggiore di $f(0{,}5) = -\dfrac{2}{3}$. Quindi la funzione non è decrescente su tutto il dominio: in mezzo c'è l'asintoto $x = 1$.`
    ], risultato: R`Dispari, asintoti $x = \pm 1$ e $y = 0$, decrescente su ogni intervallo del dominio, flesso $(0; 0)$` },

    { titolo: 'Un problema di ottimizzazione', problema: R`Con $40$ m di rete si vuole recintare un orto rettangolare addossato a un muro, che fa da quarto lato. Quali dimensioni danno l'area massima?`, passi: [
      R`Sia $x$ la misura di ciascuno dei due lati perpendicolari al muro. La rete copre quei due lati più il lato parallelo al muro, che misura quindi $40 - 2x$.`,
      R`Area: $A(x) = x(40 - 2x) = 40x - 2x^2$. Dominio del problema: $0 < x < 20$, perché tutte e due le dimensioni devono essere positive.`,
      R`$A'(x) = 40 - 4x$ si annulla per $x = 10$. È positiva prima e negativa dopo: in $x = 10$ c'è il massimo.`,
      R`Dimensioni: $10\ \text{m}$ e $40 - 20 = 20\ \text{m}$; area $A(10) = 200\ \text{m}^2$.`,
      R`L'orto migliore non è un quadrato: il lato parallelo al muro è il doppio degli altri due. Il vincolo dei tre lati cambia la risposta.`
    ], risultato: R`$10\ \text{m} \times 20\ \text{m}$, area massima $200\ \text{m}^2$` }
  ],

  formulario: [
    { nome: 'Condizioni di esistenza', formula: R`\begin{gathered} \frac{A}{B}: B \ne 0 \qquad \sqrt[2n]{A}: A \ge 0 \\ \log A: A > 0 \end{gathered}`, nota: R`Si impongono sulla formula di partenza, prima di semplificare.` },
    { nome: 'Funzione pari e funzione dispari', formula: R`\begin{gathered} \text{pari: } f(-x) = f(x) \\ \text{dispari: } f(-x) = -f(x) \end{gathered}`, nota: R`Pari: simmetrica rispetto all'asse $y$. Dispari: simmetrica rispetto all'origine. Il dominio deve essere simmetrico.` },
    { nome: 'Intersezioni con gli assi', formula: R`\text{asse } x: f(x) = 0 \qquad \text{asse } y: (0; f(0))`, nota: R`L'intersezione con l'asse $y$ esiste solo se $0$ sta nel dominio.` },
    { nome: 'Asintoto verticale', formula: R`\lim_{x \to x_0} f(x) = \pm\infty \ \Rightarrow \ x = x_0`, nota: R`Basta che il limite sia infinito da una parte sola.` },
    { nome: 'Asintoto orizzontale', formula: R`\lim_{x \to \pm\infty} f(x) = \ell \ \Rightarrow \ y = \ell`, nota: R`Il grafico può anche attraversarlo.` },
    { nome: 'Asintoto obliquo', formula: R`m = \lim_{x \to \infty} \frac{f(x)}{x}, \qquad q = \lim_{x \to \infty} \left[ f(x) - mx \right]`, nota: R`Esiste se $m$ è finito e diverso da zero e $q$ è finito. L'asintoto è $y = mx + q$.` },
    { nome: 'Crescenza e decrescenza', formula: R`\begin{gathered} f' > 0 \Rightarrow f \text{ crescente} \\ f' < 0 \Rightarrow f \text{ decrescente} \end{gathered}`, nota: R`Su un intervallo: è il criterio di monotonia, conseguenza del teorema di Lagrange.` },
    { nome: 'Massimi e minimi', formula: R`\begin{gathered} f': + \to - \ \Rightarrow \ \text{massimo} \\ f': - \to + \ \Rightarrow \ \text{minimo} \end{gathered}`, nota: R`Da cercare anche nei punti dove $f$ non è derivabile e negli estremi del dominio.` },
    { nome: 'Concavità', formula: R`\begin{gathered} f'' > 0 \Rightarrow \text{verso l'alto} \\ f'' < 0 \Rightarrow \text{verso il basso} \end{gathered}` },
    { nome: 'Condizione per il flesso', formula: R`f''(x_0) = 0 \ \text{ e } \ f'' \text{ cambia segno}`, nota: R`$f''(x_0) = 0$ da sola non basta: $y = x^4$ in $0$ ha un minimo. E un flesso può esserci anche dove $f''$ non esiste, come per $\sqrt[3]{x}$ in $0$.` },
    { nome: 'Test della derivata seconda', formula: R`\begin{gathered} f'(x_0) = 0 \text{ e} \\ f''(x_0) < 0 \Rightarrow \text{massimo} \\ f''(x_0) > 0 \Rightarrow \text{minimo} \end{gathered}`, nota: R`Se $f''(x_0) = 0$ il test non decide.` },
    { nome: 'Retta tangente (e tangente inflessionale)', formula: R`y - f(x_0) = f'(x_0)\,(x - x_0)`, nota: R`Nel punto di flesso è la tangente inflessionale, che attraversa la curva.` },
    { nome: 'Confronto all\'infinito', formula: R`\lim_{x \to +\infty} \frac{x^n}{e^x} = 0 \qquad \lim_{x \to +\infty} \frac{\ln x}{x^a} = 0 \ \ (a > 0)`, nota: R`L'esponenziale batte ogni potenza, ogni potenza batte il logaritmo. Si dimostra con de l'Hôpital.` }
  ],
  flashcards: [
    { id: 'fc-01', sezione: 'metodo', tipo: 'procedura', fronte: R`I passi dello studio di funzione, in ordine`, retro: R`Dominio; simmetrie; intersezioni con gli assi; segno; limiti e asintoti; $f'$ con crescenza ed estremi; $f''$ con concavità e flessi; grafico.` },
    { id: 'fc-02', sezione: 'metodo', tipo: 'concetto', fronte: R`Che cos'è il piano di lavoro?`, retro: R`Il piano cartesiano su cui segni, passo dopo passo, dove la curva non esiste, dove non può passare, i punti e le frecce di crescenza.` },
    { id: 'fc-03', sezione: 'dominio', tipo: 'definizione', fronte: R`Le condizioni di esistenza più comuni`, retro: R`Denominatore $\ne 0$; radicando di una radice di indice pari $\ge 0$; argomento del logaritmo $> 0$.` },
    { id: 'fc-04', sezione: 'dominio', tipo: 'procedura', fronte: R`Come si segna il dominio sul piano?`, retro: R`Una retta verticale tratteggiata in ogni punto escluso; una zona ombreggiata per ogni intervallo escluso.` },
    { id: 'fc-05', sezione: 'simmetrie', tipo: 'definizione', fronte: R`Funzione pari`, retro: R`$f(-x) = f(x)$ per ogni $x$ del dominio: il grafico è simmetrico rispetto all'asse $y$.` },
    { id: 'fc-06', sezione: 'simmetrie', tipo: 'definizione', fronte: R`Funzione dispari`, retro: R`$f(-x) = -f(x)$ per ogni $x$ del dominio: il grafico è simmetrico rispetto all'origine.` },
    { id: 'fc-07', sezione: 'simmetrie', tipo: 'concetto', fronte: R`A che cosa serve sapere che $f$ è pari o dispari?`, retro: R`Basta studiarla per $x \ge 0$; l'altra metà si ottiene con uno specchio (asse $y$ se pari, origine se dispari).` },
    { id: 'fc-08', sezione: 'intersezioni', tipo: 'procedura', fronte: R`Come si trovano le intersezioni con gli assi?`, retro: R`Asse $x$: si risolve $f(x) = 0$ nel dominio. Asse $y$: si calcola $f(0)$, se $0$ sta nel dominio.` },
    { id: 'fc-09', sezione: 'segno', tipo: 'procedura', fronte: R`Che cosa si ombreggia nel passo del segno?`, retro: R`La zona dove la curva **non** passa: sopra l'asse $x$ dove $f < 0$, sotto l'asse dove $f > 0$.` },
    { id: 'fc-10', sezione: 'segno', tipo: 'concetto', fronte: R`Dove può cambiare il segno di $f$?`, retro: R`Solo negli zeri e nei punti esclusi dal dominio. In uno zero doppio il segno non cambia: la curva tocca l'asse e torna indietro.` },
    { id: 'fc-11', sezione: 'asintoti', tipo: 'definizione', fronte: R`Asintoto verticale e asintoto orizzontale`, retro: R`Verticale $x = x_0$: $f(x) \to \pm\infty$ per $x \to x_0$. Orizzontale $y = \ell$: $f(x) \to \ell$ per $x \to \pm\infty$.` },
    { id: 'fc-12', sezione: 'asintoti', tipo: 'formula', fronte: R`Come si trova l'asintoto obliquo?`, retro: R`$m = \lim_{x \to \infty} \dfrac{f(x)}{x}$ e $q = \lim_{x \to \infty} [f(x) - mx]$, tutti e due finiti, con $m \ne 0$. L'asintoto è $y = mx + q$.` },
    { id: 'fc-13', sezione: 'asintoti', tipo: 'concetto', fronte: R`Che cos'è il grafico probabile?`, retro: R`Lo schizzo fatto con dominio, segno e asintoti, prima delle derivate: i pezzi di ramo raccordati nelle zone libere.` },
    { id: 'fc-14', sezione: 'derivata-prima', tipo: 'procedura', fronte: R`Come si trovano massimi e minimi con la tabella dei segni di $f'$?`, retro: R`Dove $f'$ passa da $+$ a $-$ c'è un massimo; da $-$ a $+$ un minimo; se il segno non cambia, nessun estremo.` },
    { id: 'fc-15', sezione: 'derivata-prima', tipo: 'definizione', fronte: R`I tre tipi di punti di non derivabilità`, retro: R`Punto angoloso (derivate laterali finite e diverse), cuspide (infinite di segno opposto), flesso a tangente verticale (infinite dello stesso segno).` },
    { id: 'fc-16', sezione: 'derivata-prima', tipo: 'concetto', fronte: R`Può un massimo relativo stare più in basso di un minimo relativo?`, retro: R`Sì, se sono su rami diversi: «relativo» vuol dire più alto dei punti vicini. Succede, per esempio, con un asintoto verticale in mezzo.` },
    { id: 'fc-17', sezione: 'derivata-seconda', tipo: 'concetto', fronte: R`Che cosa dice il segno di $f''$?`, retro: R`$f'' > 0$: concavità verso l'alto. $f'' < 0$: concavità verso il basso.` },
    { id: 'fc-18', sezione: 'derivata-seconda', tipo: 'definizione', fronte: R`Punto di flesso`, retro: R`Un punto del grafico in cui la concavità cambia verso. Se $f''$ esiste, lì si annulla e cambia segno.` },
    { id: 'fc-19', sezione: 'derivata-seconda', tipo: 'definizione', fronte: R`I tre tipi di flesso`, retro: R`A tangente orizzontale ($f'(x_0) = 0$), obliqua ($f'(x_0) \ne 0$), verticale ($|f'| \to +\infty$).` },
    { id: 'fc-20', sezione: 'derivata-seconda', tipo: 'concetto', fronte: R`Perché $f''(x_0) = 0$ non basta per un flesso?`, retro: R`Perché $f''$ deve anche cambiare segno: $y = x^4$ ha $f''(0) = 0$, ma in $0$ ha un minimo.` },
    { id: 'fc-21', sezione: 'derivata-seconda', tipo: 'formula', fronte: R`Tangente inflessionale`, retro: R`La tangente nel punto di flesso: $y - f(x_0) = f'(x_0)(x - x_0)$. Attraversa la curva.` },
    { id: 'fc-22', sezione: 'derivata-seconda', tipo: 'procedura', fronte: R`Test della derivata seconda`, retro: R`Se $f'(x_0) = 0$: $f''(x_0) < 0$ dà un massimo, $f''(x_0) > 0$ un minimo, $f''(x_0) = 0$ non decide.` },
    { id: 'fc-23', sezione: 'grafico', tipo: 'procedura', fronte: R`Quali controlli di coerenza si fanno sul grafico?`, retro: R`Ogni punto in una zona libera; segni dei limiti d'accordo con il segno di $f$; un estremo fra due zeri; massimi su archi a cupola, minimi su archi a tazza.` },
    { id: 'fc-24', sezione: 'asintoti', tipo: 'concetto', fronte: R`Chi vince all'infinito fra $e^x$, $x^n$ e $\ln x$?`, retro: R`$e^x$ batte ogni potenza, ogni potenza batte $\ln x$. Per esempio $x\,e^{-x} \to 0$ e $\dfrac{\ln x}{x} \to 0$ per $x \to +\infty$.` },
    { id: 'fc-25', sezione: 'ottimizzazione', tipo: 'procedura', fronte: R`I passi di un problema di ottimizzazione`, retro: R`1) Scegliere la variabile. 2) Scrivere la grandezza in funzione di essa. 3) Trovare il dominio del problema. 4) Studiare il segno di $f'$ e controllare gli estremi.` }
  ],
  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Dominio di $f(x) = \dfrac{x + 5}{x^2 - 9}$: quali valori di $x$ vanno esclusi? Scrivi le ascisse separate da punto e virgola.`, suggerimenti: [R`Il denominatore non può valere zero.`], risposta: xs(-3, 3), soluzione: [R`$x^2 - 9 = 0$ per $x^2 = 9$.`, R`Vanno esclusi $x = -3$ e $x = 3$: sul piano, due rette tratteggiate.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Trova il dominio di $f(x) = \sqrt{6 - 2x}$. Scrivi una disequazione, per esempio $x \ge 1$.`, suggerimenti: [R`Il radicando di una radice quadrata deve essere $\ge 0$.`], risposta: minoreUg(3), soluzione: [R`$6 - 2x \ge 0$, cioè $-2x \ge -6$.`, R`Divido per $-2$ e cambio il verso: $x \le 3$. Il valore $3$ è incluso, perché $\sqrt{0} = 0$ esiste.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Trova il dominio di $f(x) = \ln(x - 4)$.`, suggerimenti: [R`L'argomento del logaritmo deve essere positivo.`], risposta: maggS(4), soluzione: [R`$x - 4 > 0$, cioè $x > 4$.`, R`Il valore $4$ è escluso: $\ln 0$ non esiste. Sul piano ombreggi la zona $x \le 4$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`$f(x) = \dfrac{x^3}{x^2 + 1}$ è pari, dispari o nessuna delle due?`, suggerimenti: [R`Calcola $f(-x)$ e confrontalo con $f(x)$.`], risposta: DISPARI, soluzione: [R`Il dominio è $\mathbb{R}$, simmetrico.`, R`$f(-x) = \dfrac{(-x)^3}{(-x)^2 + 1} = \dfrac{-x^3}{x^2 + 1} = -f(x)$.`, R`È dispari: il grafico è simmetrico rispetto all'origine.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`$f(x) = \dfrac{x^2 - 1}{x^2 + 4}$ è pari, dispari o nessuna delle due?`, suggerimenti: [R`Le potenze pari non cambiano con $-x$.`], risposta: PARI, soluzione: [R`$f(-x) = \dfrac{(-x)^2 - 1}{(-x)^2 + 4} = \dfrac{x^2 - 1}{x^2 + 4} = f(x)$.`, R`È pari: il grafico è simmetrico rispetto all'asse $y$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`$f(x) = \dfrac{x + 1}{x - 2}$ è pari, dispari o nessuna delle due?`, suggerimenti: [R`Guarda prima il dominio: è simmetrico?`], risposta: NESSUNA, soluzione: [R`Il dominio esclude $2$ ma non $-2$: non è simmetrico.`, R`Quindi $f$ non può essere né pari né dispari.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Trova gli zeri di $f(x) = \dfrac{x^2 - 5x + 6}{x + 1}$. Scrivi le ascisse.`, suggerimenti: [R`Una frazione vale zero quando si annulla il numeratore.`, R`Controlla che gli zeri stiano nel dominio.`], risposta: xs(2, 3), soluzione: [R`$x^2 - 5x + 6 = (x - 2)(x - 3) = 0$ per $x = 2$ e $x = 3$.`, R`Il denominatore lì vale $3$ e $4$, non zero: sono due zeri.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`In quale punto $f(x) = \dfrac{2x - 6}{x + 3}$ taglia l'asse $y$? Scrivi l'ordinata.`, suggerimenti: [R`Calcola $f(0)$.`], risposta: val(-2), soluzione: [R`$0$ sta nel dominio, che esclude solo $-3$.`, R`$f(0) = \dfrac{-6}{3} = -2$: il punto è $(0; -2)$.`] },
    { id: 'b-09', livello: 'base', difficolta: 2, testo: R`Dove è positiva $f(x) = \dfrac{x - 4}{x + 2}$?`, suggerimenti: [R`Studia il segno del numeratore e del denominatore.`, R`La frazione è positiva dove hanno lo stesso segno.`], risposta: fuoriS(-2, 4), soluzione: [R`Numeratore positivo per $x > 4$, denominatore positivo per $x > -2$.`, R`Stesso segno per $x < -2$ (tutti e due negativi) e per $x > 4$ (tutti e due positivi).`, R`$f > 0$ per $x < -2$ oppure $x > 4$. Gli estremi sono esclusi: in $4$ vale zero, in $-2$ non esiste.`] },
    { id: 'b-10', livello: 'base', difficolta: 2, testo: R`Dove è negativa $f(x) = \dfrac{x + 1}{(x - 3)^2}$?`, suggerimenti: [R`Che segno ha un quadrato?`], risposta: minoreS(-1), soluzione: [R`Il denominatore è un quadrato: positivo per ogni $x \ne 3$.`, R`Il segno è quello di $x + 1$: negativo per $x < -1$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Dove è positiva $f(x) = \dfrac{3 - x}{x + 1}$?`, suggerimenti: [R`Attento al numeratore: $3 - x > 0$ quando $x < 3$.`], risposta: fraS(-1, 3), soluzione: [R`Numeratore positivo per $x < 3$; denominatore positivo per $x > -1$.`, R`Stesso segno fra $-1$ e $3$: $f > 0$ per $-1 < x < 3$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto verticale di $f(x) = \dfrac{2x + 1}{x - 4}$. Scrivi l'ascissa.`, suggerimenti: [R`Dove si annulla il denominatore, senza che si annulli il numeratore?`], risposta: ascissa(4), soluzione: [R`Il denominatore si annulla in $x = 4$, dove il numeratore vale $9$.`, R`$\lim_{x \to 4} f(x)$ è infinito: l'asintoto è $x = 4$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Trova l'asintoto orizzontale di $f(x) = \dfrac{6x - 1}{2x + 5}$. Scrivi il valore di $y$.`, suggerimenti: [R`Gradi uguali: conta il rapporto dei coefficienti di $x$.`], risposta: val(3), soluzione: [R`Numeratore e denominatore hanno grado $1$.`, R`$\lim_{x \to \pm\infty} f(x) = \dfrac{6}{2} = 3$: l'asintoto è $y = 3$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Trova l'asintoto obliquo di $f(x) = \dfrac{2x^2 + x - 1}{x - 1}$. Scrivi l'equazione, per esempio $y = 2x - 5$.`, suggerimenti: [R`$m = \lim \dfrac{f(x)}{x}$.`, R`$q = \lim [f(x) - mx]$: fai il denominatore comune.`], risposta: retta(['y=2x+3', 'y=3+2x', '2x+3', '3+2x']), soluzione: [R`$m = \lim_{x \to \infty} \dfrac{2x^2 + x - 1}{x^2 - x} = 2$.`, R`$q = \lim_{x \to \infty} \dfrac{2x^2 + x - 1 - 2x(x - 1)}{x - 1} = \lim_{x \to \infty} \dfrac{3x - 1}{x - 1} = 3$.`, R`L'asintoto obliquo è $y = 2x + 3$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Trova i punti stazionari di $f(x) = x + \dfrac{9}{x}$. Scrivi le ascisse.`, suggerimenti: [R`$\left(\dfrac{9}{x}\right)' = -\dfrac{9}{x^2}$.`], risposta: xs(-3, 3), soluzione: [R`$f'(x) = 1 - \dfrac{9}{x^2}$.`, R`$f'(x) = 0$ quando $x^2 = 9$: $x = -3$ e $x = 3$, tutti e due nel dominio $x \ne 0$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Dove cresce $f(x) = x\,e^{x}$?`, suggerimenti: [R`Regola del prodotto: $f'(x) = e^x + x\,e^x$.`, R`Raccogli $e^x$, che è sempre positivo.`], risposta: dopo(-1), soluzione: [R`$f'(x) = e^x(1 + x)$.`, R`$e^x > 0$, quindi $f' > 0$ per $x > -1$.`, R`$f$ cresce per $x > -1$; in $x = -1$ ha un minimo.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Trova il punto di massimo relativo di $f(x) = x^3 - 3x^2 - 9x$. Scrivi le coordinate, per esempio (2; −1).`, suggerimenti: [R`Scomponi $f'(x) = 3x^2 - 6x - 9$ raccogliendo $3$.`, R`Il massimo è dove $f'$ passa da $+$ a $-$; poi calcola la $y$.`], risposta: pt(-1, 5), soluzione: [R`$f'(x) = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1)$.`, R`$f'$ è positiva prima di $-1$, negativa fra $-1$ e $3$: in $x = -1$ c'è il massimo.`, R`$f(-1) = -1 - 3 + 9 = 5$. Il massimo è $(-1; 5)$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Trova l'ascissa del punto di flesso di $f(x) = x^3 + 6x^2 - 2$.`, suggerimenti: [R`Il flesso si cerca dove $f''$ cambia segno.`], risposta: ascissa(-2), soluzione: [R`$f'(x) = 3x^2 + 12x$, quindi $f''(x) = 6x + 12$.`, R`$f'' = 0$ per $x = -2$: prima è negativa, dopo positiva. Il flesso ha ascissa $-2$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Dove $f(x) = x^4 - 24x^2$ ha la concavità verso il basso?`, suggerimenti: [R`Concavità verso il basso dove $f''(x) < 0$.`], risposta: fra(-2, 2), soluzione: [R`$f'(x) = 4x^3 - 48x$, quindi $f''(x) = 12x^2 - 48 = 12(x^2 - 4)$.`, R`$f'' < 0$ per $-2 < x < 2$: lì la concavità è verso il basso. In $x = \pm 2$ ci sono due flessi.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Due numeri positivi hanno somma $20$. Qual è il loro prodotto più grande?`, suggerimenti: [R`Chiama $x$ un numero: l'altro è $20 - x$.`, R`Studia $P(x) = x(20 - x)$ con $0 < x < 20$.`], risposta: val(100), soluzione: [R`$P(x) = 20x - x^2$, con $0 < x < 20$.`, R`$P'(x) = 20 - 2x$ vale zero per $x = 10$: prima è positiva, dopo negativa. Massimo.`, R`I numeri sono $10$ e $10$, e $P(10) = 100$.`] },

    { id: 'es-01', difficolta: 2, testo: R`Studia $f(x) = \dfrac{x^2 + 3}{x - 1}$: dominio, asintoti, crescenza. Scrivi le coordinate del minimo relativo.`, suggerimenti: [R`Con la divisione: $f(x) = x + 1 + \dfrac{4}{x - 1}$.`, R`$f'(x) = 1 - \dfrac{4}{(x - 1)^2}$: dove si annulla?`], risposta: pt(3, 6), soluzione: [R`Dominio $x \ne 1$. Asintoto verticale $x = 1$; dalla divisione, asintoto obliquo $y = x + 1$.`, R`$f'(x) = \dfrac{(x - 1)^2 - 4}{(x - 1)^2} = \dfrac{(x - 3)(x + 1)}{(x - 1)^2}$.`, R`$f' > 0$ per $x < -1$ e per $x > 3$: massimo in $x = -1$, con $f(-1) = \dfrac{4}{-2} = -2$; minimo in $x = 3$, con $f(3) = \dfrac{12}{2} = 6$.`, R`Coerenza: $f(x) > 0$ per $x > 1$, e il minimo $(3; 6)$ ha ordinata positiva. Il massimo $(-1; -2)$ sta dove $f < 0$.`] },
    { id: 'es-02', difficolta: 2, testo: R`Trova il punto di massimo relativo di $f(x) = x^2 e^{-x}$. Scrivi l'ascissa.`, suggerimenti: [R`$f'(x) = 2x\,e^{-x} - x^2 e^{-x}$: raccogli $x\,e^{-x}$.`, R`$e^{-x}$ è sempre positivo: il segno lo decide $x(2 - x)$.`], risposta: ascissa(2), soluzione: [R`$f'(x) = x(2 - x)e^{-x}$.`, R`Segno: negativo per $x < 0$, positivo fra $0$ e $2$, negativo per $x > 2$.`, R`Minimo in $(0; 0)$, massimo in $\left(2; \dfrac{4}{e^2}\right)$, circa $(2; 0{,}54)$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Trova il valore minimo di $f(x) = x \ln x$, con dominio $x > 0$.`, suggerimenti: [R`$f'(x) = \ln x + 1$.`, R`$\ln x = -1$ quando $x = e^{-1}$.`], risposta: val(-1 / Math.E), soluzione: [R`$f'(x) = \ln x + x \cdot \dfrac{1}{x} = \ln x + 1$.`, R`$f' > 0$ per $\ln x > -1$, cioè $x > \dfrac{1}{e}$: prima decresce, poi cresce.`, R`Minimo in $\left(\dfrac{1}{e}; -\dfrac{1}{e}\right)$, circa $(0{,}37; -0{,}37)$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Trova gli asintoti di $f(x) = \dfrac{x^3}{x^2 - 4}$. Scrivi l'equazione dell'asintoto obliquo.`, suggerimenti: [R`Il grado del numeratore supera di uno quello del denominatore.`, R`Dividi: $x^3 = x(x^2 - 4) + 4x$.`], risposta: retta(['y=x', 'x', 'y=1x', 'y=x+0']), soluzione: [R`Dominio $x \ne \pm 2$; in $\pm 2$ il numeratore vale $\pm 8$: due asintoti verticali $x = -2$ e $x = 2$.`, R`$f(x) = x + \dfrac{4x}{x^2 - 4}$, e la frazione tende a $0$ all'infinito.`, R`Asintoto obliquo $y = x$. La funzione è dispari: tutto il grafico è simmetrico rispetto all'origine.`] },
    { id: 'es-05', difficolta: 2, testo: R`Trova le ascisse dei punti di massimo e di minimo relativo di $f(x) = x^3 + 3x^2 - 9x$.`, suggerimenti: [R`Scomponi $f'(x) = 3x^2 + 6x - 9$.`], risposta: xs(-3, 1), soluzione: [R`$f'(x) = 3(x^2 + 2x - 3) = 3(x + 3)(x - 1)$.`, R`$f' > 0$ fuori da $\Icc{-3}{1}$, negativa dentro.`, R`Massimo in $x = -3$, con $f(-3) = -27 + 27 + 27 = 27$. Minimo in $x = 1$, con $f(1) = 1 + 3 - 9 = -5$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Fra tutti i rettangoli di perimetro $24$ cm, determina l'area massima (in centimetri quadrati).`, suggerimenti: [R`Chiama $x$ la base: quanto vale l'altezza?`, R`Scrivi $A(x) = x(12 - x)$ con $0 < x < 12$ e annulla $A'$.`], risposta: { tipo: 'numero', valore: 36, tolleranza: 0.01 }, soluzione: [R`Semiperimetro $12$, quindi altezza $12 - x$ e $A(x) = 12x - x^2$, con $0 < x < 12$.`, R`$A'(x) = 12 - 2x$ si annulla in $x = 6$, positiva prima e negativa dopo: massimo.`, R`$A(6) = 36\ \text{cm}^2$: il rettangolo è il quadrato di lato $6$ cm.`] },
    { id: 'es-07', difficolta: 3, testo: R`Determina $a$ e $b$ in modo che $f(x) = x^3 + ax^2 + bx$ abbia un massimo relativo in $x = -1$ e un flesso in $x = 1$. Scrivi i due valori, prima $a$ e poi $b$.`, suggerimenti: [R`Traduci le due richieste in condizioni su $f'$ e $f''$.`, R`Massimo in $-1$ dà $f'(-1) = 0$; flesso in $1$ dà $f''(1) = 0$.`, R`$f'(x) = 3x^2 + 2ax + b$ e $f''(x) = 6x + 2a$: parti dalla seconda condizione, che contiene solo $a$.`], risposta: { tipo: 'numeri', valori: [-3, -9], ordinati: true }, soluzione: [R`$f'(x) = 3x^2 + 2ax + b$, $f''(x) = 6x + 2a$.`, R`Flesso in $x = 1$: $f''(1) = 6 + 2a = 0$, quindi $a = -3$.`, R`Massimo in $x = -1$: $f'(-1) = 3 - 2a + b = 0$, cioè $3 + 6 + b = 0$, quindi $b = -9$.`, R`Verifica: $f'(x) = 3x^2 - 6x - 9 = 3(x + 1)(x - 3)$, quindi $f'(-1) = 0$, e $f''(-1) = -12 < 0$: in $-1$ c'è davvero un massimo. In $x = 1$ la derivata seconda cambia segno: è un flesso.`] },
    { id: 'es-08', difficolta: 3, testo: R`Un rettangolo ha la base sul diametro di una semicirconferenza di raggio $5$ e i due vertici opposti sulla semicirconferenza. Determina l'area massima.`, suggerimenti: [R`Detta $x$ la semibase, l'altezza si ricava dal teorema di Pitagora.`, R`$A(x) = 2x\sqrt{25 - x^2}$ con $0 < x < 5$. Conviene studiare $A^2$, che ha i massimi negli stessi punti.`], risposta: { tipo: 'numero', valore: 25, tolleranza: 0.01 }, soluzione: [R`Con centro nell'origine e semibase $x$, l'altezza vale $\sqrt{25 - x^2}$, quindi $A(x) = 2x\sqrt{25 - x^2}$, con $0 < x < 5$.`, R`Studia $A^2 = 4x^2(25 - x^2) = 100x^2 - 4x^4$; la derivata è $200x - 16x^3 = 8x(25 - 2x^2)$.`, R`Si annulla per $x^2 = \dfrac{25}{2}$, cioè $x = \dfrac{5}{\sqrt{2}}$, con derivata positiva prima e negativa dopo: è il massimo.`, R`Allora $\sqrt{25 - x^2} = \dfrac{5}{\sqrt{2}}$ e $A = 2 \cdot \dfrac{5}{\sqrt{2}} \cdot \dfrac{5}{\sqrt{2}} = 25$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Trova le ascisse dei punti di flesso di $f(x) = e^{-2x^2}$.`, suggerimenti: [R`$f'(x) = -4x\,e^{-2x^2}$. Deriva ancora con la regola del prodotto.`, R`$e^{-2x^2}$ è sempre positivo: il segno di $f''$ lo decide un polinomio di secondo grado.`], risposta: xs(-0.5, 0.5), soluzione: [R`$f''(x) = -4e^{-2x^2} + 16x^2 e^{-2x^2} = 4(4x^2 - 1)e^{-2x^2}$.`, R`$f'' = 0$ per $x^2 = \dfrac{1}{4}$, cioè $x = \pm\dfrac{1}{2}$, e lì cambia segno.`, R`Flessi in $x = -\dfrac{1}{2}$ e $x = \dfrac{1}{2}$. La funzione è pari: i due flessi sono simmetrici.`] },
    { id: 'es-10', difficolta: 2, testo: R`Trova i punti di non derivabilità di $f(x) = |x^2 - 4|$ e dì di che tipo sono. Scrivi le ascisse.`, suggerimenti: [R`Scrivi la funzione senza valore assoluto, a tratti.`, R`Confronta la derivata sinistra e destra nei punti di raccordo.`], risposta: xs(-2, 2), soluzione: [R`$f(x) = x^2 - 4$ per $|x| \ge 2$ e $f(x) = 4 - x^2$ per $|x| < 2$.`, R`In $x = 2$: da sinistra $f'(x) = -2x \to -4$, da destra $f'(x) = 2x \to 4$. Derivate finite e diverse: punto angoloso.`, R`Per simmetria lo stesso in $x = -2$. Sono anche due minimi, con $f(\pm 2) = 0$.`] },
    { id: 'es-11', difficolta: 2, testo: R`Uno studente scrive: dominio $x \ne 2$; $f(x) < 0$ per $x < 2$; $\lim_{x \to 2^-} f(x) = +\infty$. Spiega perché c'è sicuramente un errore.`, suggerimenti: [R`Disegna sul piano il risultato del segno per $x < 2$.`, R`Dove può andare la curva vicino a $x = 2$, da sinistra?`], soluzione: [R`Per $x < 2$ la curva sta sotto l'asse: la zona sopra è ombreggiata.`, R`Vicino a $2$, da sinistra, la curva può solo scendere verso $-\infty$, non salire a $+\infty$.`, R`Il segno e il limite si contraddicono: uno dei due calcoli è sbagliato. È il controllo di coerenza fra i passi.`] },
    { id: 'es-12', difficolta: 3, testo: R`Una lattina cilindrica deve contenere $54\pi\ \text{cm}^3$. Quale raggio di base rende minima la superficie totale?`, suggerimenti: [R`Dal volume ricavi l'altezza: $h = \dfrac{54}{r^2}$.`, R`$S(r) = 2\pi r^2 + 2\pi r h = 2\pi r^2 + \dfrac{108\pi}{r}$, con $r > 0$.`], risposta: val(3), soluzione: [R`$\pi r^2 h = 54\pi$ dà $h = \dfrac{54}{r^2}$.`, R`$S(r) = 2\pi r^2 + 2\pi r \cdot \dfrac{54}{r^2} = 2\pi r^2 + \dfrac{108\pi}{r}$.`, R`$S'(r) = 4\pi r - \dfrac{108\pi}{r^2}$, che si annulla per $r^3 = 27$: $r = 3$. Prima è negativa, dopo positiva: minimo.`, R`Con $r = 3$ cm l'altezza è $h = 6$ cm: la lattina migliore è alta quanto il suo diametro.`] }
  ],
  quiz: [
    { id: 'q-01', domanda: R`Dopo il passo del dominio, sul piano c'è una retta verticale tratteggiata in $x = 2$. Che cosa significa?`, opzioni: [R`che la funzione non esiste in $x = 2$`, R`che la funzione vale zero in $x = 2$`, R`che in $x = 2$ c'è sicuramente un asintoto verticale`, R`che in $x = 2$ la funzione ha un massimo`], corretta: 0, spiegazione: R`Il dominio dice solo dove la funzione non esiste. Se lì ci sia un asintoto lo dicono i limiti: potrebbe anche esserci un buco, come per $\frac{x^2 - 4}{x - 2}$. Zeri e massimi arrivano in passi successivi.` },
    { id: 'q-02', domanda: R`Hai trovato $f(x) > 0$ per $x > 3$. Che cosa ombreggi sul piano, per $x > 3$?`, opzioni: [R`la zona sopra l'asse $x$`, R`la zona sotto l'asse $x$`, R`niente: si ombreggia solo dove $f < 0$`, R`la retta $x = 3$`], corretta: 1, spiegazione: R`Si ombreggia dove la curva **non** passa. Se $f > 0$ la curva sta sopra l'asse, quindi la zona vietata è quella sotto. Si fa lo stesso dove $f < 0$, ombreggiando sopra.` },
    { id: 'q-03', domanda: R`$f$ è dispari e hai disegnato il suo grafico per $x \ge 0$. Come ottieni la parte con $x < 0$?`, opzioni: [R`con la simmetria rispetto all'asse $y$`, R`con la simmetria rispetto all'asse $x$`, R`con la simmetria rispetto all'origine`, R`traslando il grafico verso sinistra`], corretta: 2, spiegazione: R`$f(-x) = -f(x)$: al punto $(x; y)$ corrisponde $(-x; -y)$, cioè la simmetria rispetto all'origine. La simmetria rispetto all'asse $y$ è quella delle funzioni pari. Lo specchio rispetto all'asse $x$ non dà nemmeno una funzione.` },
    { id: 'q-04', domanda: R`Per $x \to +\infty$, una funzione può avere…`, opzioni: [R`un asintoto orizzontale e uno obliquo insieme`, R`due asintoti obliqui diversi`, R`solo asintoti verticali`, R`al massimo un asintoto, orizzontale oppure obliquo`], corretta: 3, spiegazione: R`Per $x \to +\infty$ i valori di $f$ si avvicinano a una sola retta, se c'è. Se il limite è finito è orizzontale, altrimenti si cerca l'obliquo: mai tutti e due. Gli asintoti verticali riguardano i punti, non l'infinito.` },
    { id: 'q-05', domanda: R`$\lim_{x \to +\infty} f(x) = 3$. Che cosa si può dire della retta $y = 3$?`, opzioni: [R`è un asintoto orizzontale, e il grafico può anche attraversarla`, R`è un asintoto orizzontale che il grafico non tocca mai`, R`è un asintoto verticale`, R`non è un asintoto, perché $3$ è un numero finito`], corretta: 0, spiegazione: R`Limite finito all'infinito vuol dire asintoto orizzontale. Il grafico però può attraversarlo, anche infinite volte: $\frac{\sin x}{x}$ taglia la retta $y = 0$ in ogni $k\pi$, con $k \ne 0$.` },
    { id: 'q-06', domanda: R`$f$ ha dominio $\mathbb{R}$; $f'$ è positiva in $\Iaa{-\infty}{2}$, negativa in $\Iaa{2}{5}$, positiva in $\Iaa{5}{+\infty}$. Allora…`, opzioni: [R`$x = 2$ è un minimo e $x = 5$ un massimo`, R`$x = 2$ e $x = 5$ sono due massimi`, R`$x = 2$ è un massimo e $x = 5$ un minimo`, R`$x = 2$ e $x = 5$ sono due flessi`], corretta: 2, spiegazione: R`In $2$ la derivata passa da $+$ a $-$: la funzione sale e poi scende, quindi c'è un massimo. In $5$ passa da $-$ a $+$: minimo. I flessi li decide il segno di $f''$, non quello di $f'$.` },
    { id: 'q-07', domanda: R`Se $f'(x_0) = 0$ e $f''(x_0) > 0$, il punto $x_0$ è…`, opzioni: [R`un massimo relativo`, R`un minimo relativo`, R`un flesso a tangente orizzontale`, R`un punto di non derivabilità`], corretta: 1, spiegazione: R`Derivata seconda positiva vuol dire concavità verso l'alto: la tangente orizzontale è il fondo di una conca. Con $f''(x_0) < 0$ si avrebbe invece un massimo.` },
    { id: 'q-08', domanda: R`Se $f'(x_0) = 0$ e $f''(x_0) = 0$, che cosa si può concludere?`, opzioni: [R`è certamente un flesso, perché $f''(x_0) = 0$`, R`non può essere né un massimo né un minimo`, R`è certamente un minimo, perché la tangente è orizzontale`, R`niente di sicuro: serve il segno di $f'$`], corretta: 3, spiegazione: R`$y = x^4$ e $y = x^3$ hanno tutte e due $f'(0) = f''(0) = 0$. Però la prima ha un minimo e la seconda un flesso. Serve la tabella dei segni di $f'$.` },
    { id: 'q-09', domanda: R`Se $f''(x) < 0$ in un intervallo, in quell'intervallo…`, opzioni: [R`$f$ è decrescente`, R`la concavità è rivolta in basso`, R`il grafico sta sotto l'asse $x$`, R`$f$ ha un massimo assoluto`], corretta: 1, spiegazione: R`Il segno di $f''$ riguarda la concavità. Non dice la monotonia, che dipende da $f'$, e nemmeno il segno di $f$. Per esempio $y = -x^2 + 100$ ha $f'' < 0$, ma è positiva e crescente per $-10 < x < 0$.` },
    { id: 'q-10', domanda: R`Quando si ha un flesso a tangente verticale in $x_0$?`, opzioni: [R`quando $f'(x_0) = 0$ e $f''$ cambia segno attraversando $x_0$`, R`quando $f''(x_0) = 0$ e la tangente in $x_0$ è obliqua`, R`quando $f$ non è continua in $x_0$ e il grafico fa un salto`, R`quando $f$ è continua e $f' \to +\infty$ (o $-\infty$) dai due lati`], corretta: 3, spiegazione: R`È il caso di $y = \sqrt[3]{x}$ nell'origine. Se i due limiti della derivata fossero infiniti di segno opposto si avrebbe una cuspide. Con $f'(x_0) = 0$ il flesso sarebbe a tangente orizzontale.` },
    { id: 'q-11', domanda: R`Nel grafico di $f'$, un punto di massimo relativo di $f$ appare come…`, opzioni: [R`un massimo di $f'$`, R`uno zero di $f'$ con cambio di segno da positivo a negativo`, R`uno zero di $f'$ con cambio di segno da negativo a positivo`, R`un punto in cui $f'$ non è definita`], corretta: 1, spiegazione: R`Prima del massimo $f$ cresce, quindi $f' > 0$. Dopo decresce, quindi $f' < 0$: la derivata attraversa lo zero scendendo. Il cambio da negativo a positivo indica invece un minimo.` },
    { id: 'q-12', domanda: R`Il segno dice $f < 0$ per $1 < x < 4$, e trovi un massimo relativo in $(2; 3)$. Che cosa concludi?`, opzioni: [R`c'è un errore di calcolo`, R`va bene: un massimo relativo sta sempre sopra l'asse $x$`, R`va bene, e quel massimo è anche il massimo assoluto`, R`$x = 2$ è uno zero, perché lì la funzione cambia andamento`], corretta: 0, spiegazione: R`In $\Iaa{1}{4}$ la curva sta sotto l'asse, quindi ogni suo punto ha ordinata negativa. Un punto di ordinata $3$ cadrebbe in una zona ombreggiata: uno dei calcoli è sbagliato. Un massimo può benissimo stare sotto l'asse.` },
    { id: 'q-13', domanda: R`$f(x) = |x - 1|$ in $x = 1$ ha…`, opzioni: [R`un flesso a tangente verticale`, R`una cuspide`, R`un punto angoloso di minimo`, R`un punto stazionario`], corretta: 2, spiegazione: R`Da sinistra la pendenza è $-1$, da destra $+1$: derivate finite e diverse, cioè un punto angoloso. Lì $f$ vale $0$ ed è il valore più basso. Non è stazionario: $f'(1)$ non esiste.` },
    { id: 'q-14', domanda: R`La tangente inflessionale, nel punto di flesso…`, opzioni: [R`attraversa il grafico`, R`è sempre orizzontale`, R`lascia il grafico tutto da una parte`, R`esiste solo se $f'(x_0) = 0$`], corretta: 0, spiegazione: R`Nel flesso la concavità cambia verso: da una parte la curva sta sopra la tangente, dall'altra sotto. La tangente può essere orizzontale, obliqua o verticale.` },
    { id: 'q-15', domanda: R`In un problema di ottimizzazione, il «dominio del problema» è…`, opzioni: [R`sempre tutto $\mathbb{R}$`, R`il dominio naturale della funzione da ottimizzare`, R`l'insieme dei punti stazionari`, R`l'insieme dei valori che hanno senso nella situazione`], corretta: 3, spiegazione: R`La formula $A(x) = x(10 - x)$ esiste per ogni $x$, ma una base negativa o più lunga di $10$ non ha senso. Il dominio del problema è più piccolo del dominio naturale, e spesso decide dove sta il massimo.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Lo studio si fa nell'ordine: dominio, simmetrie, intersezioni, segno, limiti e asintoti, $f'$, $f''$, grafico. Saltare un passo si paga alla fine, quando il grafico non torna.` },
    { tipo: 'metodo', testo: R`Nel passo del segno ombreggia dove la curva **non** passa. Alla fine il grafico deve stare tutto nelle zone libere.` },
    { tipo: 'trucco', testo: R`Ogni punto calcolato deve cadere in una zona libera. Se un massimo cade dove il segno dice «sotto l'asse» con ordinata positiva, c'è un errore.` },
    { tipo: 'trucco', testo: R`Controlla subito le simmetrie: se $f(-x) = f(x)$ o $f(-x) = -f(x)$ studi solo le $x$ positive e poi specchi. Metà lavoro.` },
    { tipo: 'errore', testo: R`Non si scrive «decrescente in $\Iaa{1}{3} \cup \Iaa{3}{5}$» se in $3$ c'è un asintoto. La monotonia si dichiara un intervallo alla volta.` },
    { tipo: 'errore', testo: R`Un massimo relativo non è il punto più alto del grafico. Può stare più in basso di un minimo, se in mezzo c'è un asintoto.` },
    { tipo: 'trucco', testo: R`Se hai già calcolato $f''$ per la concavità, usala anche per i punti stazionari: il segno di $f''$ nel punto dice massimo o minimo.` },
    { tipo: 'errore', testo: R`$f''(x_0) = 0$ non basta per dire «flesso»: la derivata seconda deve anche cambiare segno. Il controesempio classico è $y = x^4$ nell'origine.` },
    { tipo: 'metodo', testo: R`Nei problemi di ottimizzazione la parte difficile non è derivare. È scrivere la grandezza in funzione di **una sola** variabile e stabilire il dominio del problema.` },
    { tipo: 'trucco', testo: R`Per una razionale fratta con il numeratore di grado più alto, fai la divisione fra polinomi: il quoziente è l'asintoto, e il resto dice da che parte sta la curva.` }
  ],

  aneddoti: [
    { matematico: 'Maria Gaetana Agnesi', anni: '1718–1799', titolo: 'La versiera che diventò una strega', testo: R`Maria Gaetana Agnesi nacque a Milano e da ragazza parlava già sette lingue. Nel 1748 pubblicò le *Instituzioni analitiche ad uso della gioventù italiana*: uno dei primi manuali completi di calcolo differenziale e integrale, scritto per chi voleva impararlo da zero. Nel libro studia una curva che il matematico Guido Grandi aveva chiamato **versiera**. Quando il testo fu tradotto in inglese, il traduttore confuse «versiera» con «avversiera», cioè diavolessa: da allora in inglese la curva si chiama *witch of Agnesi*, la strega di Agnesi. Nel 1750 papa Benedetto XIV le diede la cattedra di matematica all'Università di Bologna, ma lei non vi insegnò mai. Passò il resto della vita a occuparsi di poveri e malati a Milano.`, legame: R`La versiera $y = \dfrac{1}{1 + x^2}$ è un buon esercizio di studio di funzione: è pari, ha il massimo in $0$, l'asintoto $y = 0$ e due flessi in $x = \pm\dfrac{1}{\sqrt{3}}$.` },

    { matematico: 'Didone (leggenda)', anni: 'IX secolo a.C., secondo la tradizione', titolo: 'Una pelle di bue per fondare Cartagine', testo: R`Didone, che le fonti greche chiamano Elissa, era una principessa di Tiro. Secondo la leggenda raccontata anche da Virgilio nell'*Eneide*, fuggì dalla Fenicia dopo che il fratello Pigmalione le aveva ucciso il marito. Sbarcata sulla costa dell'Africa, ottenne di comprare tanta terra quanta ne poteva circondare una pelle di bue. Didone tagliò la pelle in strisce sottilissime e ne fece una lunghissima corda. Poi la stese ad arco, con le due estremità sul mare, e racchiuse un'intera collina: lì sarebbe sorta Cartagine. È una leggenda, ma la domanda è vera. Fra tutte le curve di lunghezza data, quale racchiude l'area più grande? È il cerchio, o il semicerchio se un lato è la riva. Gli antichi lo sapevano, ma una dimostrazione completa arrivò solo nell'Ottocento.`, legame: R`Il problema di Didone è uno dei più antichi problemi di ottimizzazione: a parità di perimetro, la figura di area massima. Il rettangolo migliore, il quadrato, ne è la versione più semplice.` },

    { matematico: 'Erone di Alessandria', anni: '10–70 d.C. circa', titolo: 'Lo specchio e la strada più corta', testo: R`Erone era un ingegnere di Alessandria d'Egitto. Costruiva macchine, misurava terreni e scriveva manuali. Nella *Catottrica*, il trattato sugli specchi che gli viene attribuito, affronta una domanda semplice. Perché un raggio di luce, quando rimbalza su uno specchio, forma due angoli uguali? La sua risposta è un ragionamento di minimo. Fra tutti i cammini che vanno da un punto allo specchio e poi a un altro punto, quello con gli angoli uguali è il più corto. Per dimostrarlo usa un'idea geniale. Ribalta uno dei due punti dall'altra parte dello specchio: il cammino spezzato diventa un segmento, e il segmento è la linea più corta fra due punti. Sedici secoli dopo Fermat estese l'idea alla rifrazione, cercando non il cammino più corto ma quello più veloce.`, legame: R`Il cammino di Erone è un problema di minimo risolto con la geometria. Oggi lo stesso problema si scrive come funzione di una variabile e si risolve con la derivata.` }
  ]
});
})();
