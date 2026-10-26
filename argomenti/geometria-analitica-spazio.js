(function () {
const R = String.raw;
/* Geometria analitica nello spazio (quinto anno). Ogni numero di teoria, esempi, esercizi, quiz e flashcard
   è stato ricalcolato con node (prodotti scalari, distanze, piani per tre punti, intersezioni, sfere).
   I video usano gli stessi esempi della teoria: P(3; 4; 2) e √29 (coordinate), A(1; 1; 1) con n = (1; 2; 2)
   e x + 2y + 2z − 5 = 0 (piano), A(1; 1; 3), B(2; 3; 2) e v = (1; 2; −1) (retta), x² + y² + z² = 9 tagliata
   da z = k (sfera-tangente). */

/* ---- lo spazio in assonometria, la stessa dei video ----
   proiezione ortogonale: chi guarda sta a 20° fra gli assi x e y, 22° più in alto.
   x viene verso chi guarda (in basso a sinistra), y va a destra, z sale. Il motore disegna nel piano:
   ogni punto (x; y; z) diventa la coppia pj(x, y, z), e le figure si fanno con segmenti, poligoni ed ellissi.
   Con coordinate scritte come espressioni (parametri dei cursori) pj restituisce espressioni. */
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const KX = [-Math.sin(TH), Math.cos(TH), 0];
const KY = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const SIN_PH = Math.sin(PH), COS_PH = Math.cos(PH);
const arr = v => Math.round(v * 10000) / 10000;
function pj(x, y, z) {
  const v = [x, y, z];
  if (v.every(c => typeof c === 'number')) return [arr(KX[0] * x + KX[1] * y), arr(KY[0] * x + KY[1] * y + KY[2] * z)];
  const espr = K => v.map((c, i) => K[i] === 0 ? '' : (K[i] < 0 ? ' - ' : ' + ') + Math.abs(K[i]).toFixed(5) + '*(' + c + ')').join('').replace(/^ \+ /, '').replace(/^ - /, '-');
  return [espr(KX), espr(KY)];
}
/* i tre assi, in viola, con le loro lettere */
function assi(lx, ly, lz) {
  const ex = pj(lx, 0, 0), ey = pj(0, ly, 0), ez = pj(0, 0, lz);
  return [
    { tipo: 'vettore', da: [0, 0], a: ex, colore: 4 },
    { tipo: 'vettore', da: [0, 0], a: ey, colore: 4 },
    { tipo: 'vettore', da: [0, 0], a: ez, colore: 4 },
    { tipo: 'testo', p: [ex[0] - 0.25, ex[1] - 0.15], testo: 'x' },
    { tipo: 'testo', p: [ey[0] + 0.1, ey[1] + 0.25], testo: 'y' },
    { tipo: 'testo', p: [ez[0] + 0.25, ez[1] - 0.05], testo: 'z' }
  ];
}
/* segmento fra due punti dello spazio */
const seg3 = (a, b, extra) => Object.assign({ tipo: 'segmento', da: pj(a[0], a[1], a[2]), a: pj(b[0], b[1], b[2]) }, extra || {});
/* angolo retto nello spazio: due trattini nel piano delle direzioni (unitarie) u e w uscenti da V */
function retto3(V, u, w, d, colore) {
  const q1 = [V[0] + d * u[0], V[1] + d * u[1], V[2] + d * u[2]];
  const q3 = [V[0] + d * w[0], V[1] + d * w[1], V[2] + d * w[2]];
  const q2 = [q1[0] + d * w[0], q1[1] + d * w[1], q1[2] + d * w[2]];
  return [seg3(q1, q2, { colore }), seg3(q2, q3, { colore })];
}
const unit = v => { const n = Math.hypot(v[0], v[1], v[2]); return v.map(c => c / n); };

/* ---- allenamento: risposte ---- */
const tre = (x, y, z) => ({ tipo: 'numeri', valori: [x, y, z], ordinati: true, segnaposto: 'es. (1; −2; 4)', simboli: ['(', ')', ';', '−', '/', '√'] });
const num = (v, seg) => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: seg || 'es. 5 o √6', simboli: ['−', '/', '√'] });
const xs = (...v) => ({ tipo: 'numeri', valori: v, segnaposto: 'es. 2; −7', simboli: [';', '−', '/'] });
const parola = (lista, seg) => ({ tipo: 'testo', accettate: lista, segnaposto: seg, simboli: [] });
const SI = parola(['sì', 'si', 'sì, ci sta', 'si, ci sta', 'ci sta', 'appartiene', 'sì, appartiene', 'sì appartiene', 'sta sul piano', 'sì, sta sul piano'], 'sì o no');
const NO = parola(['no', 'no, non ci sta', 'non ci sta', 'non appartiene', 'no, non appartiene', 'no non appartiene', 'non sta sulla retta', 'no, non sta sulla retta'], 'sì o no');
/* il piano ax + by + cz + d = 0 (interi) in tutte le forme ragionevoli: coefficienti ridotti ai minimi
   termini, con i due segni, con il termine noto a sinistra o a destra. La casella toglie gli spazi e legge − come -. */
const mcd = (p, q) => q ? mcd(q, p % q) : Math.abs(p);
function piano(a, b, c, d) {
  const g = mcd(mcd(mcd(a, b), c), d) || 1, acc = new Set();
  [1, -1].forEach(s => {
    const co = [a, b, c, d].map(k => s * k / g);
    let sx = '';
    [[co[0], 'x'], [co[1], 'y'], [co[2], 'z']].forEach(([k, v]) => {
      if (!k) return;
      const ass = Math.abs(k), segno = k < 0 ? '-' : (sx ? '+' : '');
      sx += segno + (ass === 1 ? '' : ass) + v;
    });
    acc.add(sx + (co[3] ? (co[3] > 0 ? '+' : '-') + Math.abs(co[3]) : '') + '=0');
    acc.add(sx + '=' + (co[3] ? -co[3] : 0));
  });
  return { tipo: 'testo', accettate: Array.from(acc), segnaposto: 'es. 2x − y + 3z − 4 = 0', simboli: ['x', 'y', 'z', '+', '−', '='] };
}

/* ---- le figure ---- */
/* il piano x + 2y + 2z − 5 = 0 dei video: taglia gli assi in (5; 0; 0), (0; 5/2; 0), (0; 0; 5/2) */
const TRIANGOLO = { tipo: 'poligono', punti: [pj(5, 0, 0), pj(0, 2.5, 0), pj(0, 0, 2.5)], colore: 1 };
/* il cubo di spigolo 3: vertice nascosto (0; 0; 0) */
const CUBO = (function () {
  const V = (x, y, z) => [3 * x, 3 * y, 3 * z];
  const spigoli = [
    [V(1, 0, 0), V(1, 0, 1)], [V(1, 0, 1), V(1, 1, 1)], [V(1, 0, 1), V(0, 0, 1)],
    [V(1, 1, 1), V(0, 1, 1)], [V(0, 1, 0), V(1, 1, 0)]
  ];
  const nascosti = [[V(0, 0, 0), V(1, 0, 0)], [V(0, 0, 0), V(0, 1, 0)], [V(0, 0, 0), V(0, 0, 1)]];
  return spigoli.map(s => seg3(s[0], s[1], { colore: 1 })).concat(nascosti.map(s => seg3(s[0], s[1], { colore: 1, tratteggio: true })));
})();
/* la sfera x² + y² + z² = 9 e il taglio z = k: il cerchio di taglio è un'ellisse con semiassi ρ e ρ·sin 22° */
const RHO = 'sqrt((9 - k^2 + abs(9 - k^2))/2)';
const PIASTRA = 3.6;

COMPASSO.registra({
  id: 'geometria-analitica-spazio',
  titolo: 'Geometria analitica nello spazio',

  introduzione: R`Un drone vola dentro un magazzino. Per dire dove si trova non basta la piantina: serve anche l'altezza. Con tre numeri, $P(x; y; z)$, ogni punto dello spazio ha il suo indirizzo.

La **geometria analitica nello spazio** porta il metodo del piano cartesiano fra piani, rette e sfere. Un piano diventa un'equazione di primo grado in $x$, $y$ e $z$. Una sfera diventa un'equazione di secondo grado. Così distanze, angoli retti e punti di contatto si calcolano senza disegnare. Nei libri di quinta è un capitolo intero, e nella seconda prova dell'esame torna spesso.

Ti servono la distanza fra due punti, la retta nel piano, la circonferenza e i sistemi lineari. Molte formule sono quelle del piano, con un termine in più.`,

  inBreve: [
    R`Un punto dello spazio ha tre coordinate, $P(x; y; z)$. La distanza fra due punti è Pitagora con tre quadrati: $\sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$.`,
    R`Il vettore $\vec{AB} = B - A$ ha per componenti le differenze delle coordinate. Due vettori sono perpendicolari quando il prodotto scalare $u_x v_x + u_y v_y + u_z v_z$ vale zero.`,
    R`Un piano ha equazione $ax + by + cz + d = 0$. I coefficienti $(a; b; c)$ formano il **vettore normale**, perpendicolare al piano.`,
    R`Una retta si scrive con un punto e un vettore direzione: $x = x_0 + lt$, $y = y_0 + mt$, $z = z_0 + nt$. Oppure come intersezione di due piani.`,
    R`Parallelismo e perpendicolarità si leggono sui vettori: le normali dei piani e le direzioni delle rette. Due rette possono anche essere **sghembe**.`,
    R`La sfera è $(x - \alpha)^2 + (y - \beta)^2 + (z - \gamma)^2 = r^2$. Un piano a distanza $d$ dal centro la taglia se $d < r$, la tocca se $d = r$.`
  ],

  sezioni: [
    { id: 'coordinate-distanza', titolo: 'Coordinate e distanza nello spazio', testo: R`Nel piano bastano due numeri per dire dove sta un punto. Nello spazio ne servono tre. Pensa a una stanza: un angolo del pavimento è l'**origine** $O$.

Da $O$ partono tre rette perpendicolari fra loro: gli **assi** $x$, $y$ e $z$. Gli assi $x$ e $y$ stanno sul pavimento, l'asse $z$ sale in verticale. Nei disegni l'asse $x$ viene verso di te e l'asse $y$ va a destra.

[[video:geometria-analitica-spazio/coordinate]]

Per arrivare a $P(3; 4; 2)$ parti da $O$. Fai $3$ passi lungo l'asse $x$, poi $4$ parallelamente all'asse $y$, poi sali di $2$.

>* Un punto dello spazio ha tre **coordinate**, in ordine: $P(x; y; z)$. Sono l'ascissa, l'ordinata e la **quota**.

[[grafico:gCoordinate]]

Gli assi, presi a due a due, formano i tre **piani coordinati**. Il piano $xy$ è il pavimento: lì vale $z = 0$. Il piano $xz$ ha $y = 0$, il piano $yz$ ha $x = 0$. Insieme dividono lo spazio in otto **ottanti**.

?? Dove sta il punto $Q(2; 0; 5)$?
[x] Nel piano $xz$.
[ ] Sull'asse $x$.
[ ] Nel piano $xy$.
=> La coordinata nulla è la $y$, quindi $Q$ sta nel piano $y = 0$, cioè il piano $xz$. Per stare sull'asse $x$ servirebbero due coordinate nulle: $y = 0$ e $z = 0$.

### La distanza

Quanto dista $P(3; 4; 2)$ dall'origine? Sotto $P$, sul pavimento, c'è $H(3; 4; 0)$. Usa Pitagora due volte.

~ \overline{OH}^2 = 3^2 + 4^2 = 25 :: sul pavimento: un triangolo rettangolo con cateti $3$ e $4$
~ \overline{OP}^2 = \overline{OH}^2 + 2^2 = \evid{25 + 4} :: un triangolo in piedi: cateti $\overline{OH}$ e la quota $2$
~ \overline{OP} = \evidb{\sqrt{29}} \approx 5{,}39 :: è la radice della somma dei quadrati delle tre coordinate

>* **Distanza fra due punti.** $$\overline{AB} = \sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$$ con $\Delta x = x_B - x_A$, e allo stesso modo $\Delta y$ e $\Delta z$. È la formula del piano con un quadrato in più.

Per esempio, con $A(1; 2; -1)$ e $B(3; -1; 5)$ le differenze sono $2$, $-3$ e $6$. Quindi $\overline{AB} = \sqrt{4 + 9 + 36} = \sqrt{49} = 7$.

>! Ogni differenza va al quadrato, anche quella negativa: $(-3)^2 = 9$. E attento ai segni: $5 - (-1) = 6$.` },

    { id: 'punto-medio-vettori', titolo: 'Punto medio, vettori e prodotto scalare', testo: R`Il **punto medio** di un segmento si trova come nel piano. Fai la media delle coordinate, una alla volta.

>* **Punto medio** di $AB$: $$M\left(\frac{x_A + x_B}{2}; \frac{y_A + y_B}{2}; \frac{z_A + z_B}{2}\right)$$

Con $A(1; 2; -1)$ e $B(3; -1; 5)$ viene $M\left(2; \frac{1}{2}; 2\right)$.

### I vettori

Per andare da $A$ a $B$ ti sposti lungo i tre assi: di $2$, di $-3$ e di $6$. Questi tre numeri formano il **vettore** $\vec{AB}$. È una freccia, con una direzione, un verso e una lunghezza.

>* **Componenti di un vettore:** $$\vec{AB} = B - A = (\Delta x; \Delta y; \Delta z)$$ cioè le differenze delle coordinate, «arrivo meno partenza». La lunghezza si chiama **modulo**: $|\vec v| = \sqrt{v_x^2 + v_y^2 + v_z^2}$. Il modulo di $\vec{AB}$ è la distanza $\overline{AB}$.

Due vettori sono **paralleli** quando le componenti sono proporzionali: $\vec v = k\,\vec u$. Per esempio $(2; -4; 6)$ e $(1; -2; 3)$ sono paralleli, con $k = 2$.

### Il prodotto scalare

>* **Prodotto scalare** di $\vec u = (u_x; u_y; u_z)$ e $\vec v = (v_x; v_y; v_z)$: $$\vec u \cdot \vec v = u_x v_x + u_y v_y + u_z v_z$$ Due vettori non nulli sono **perpendicolari** se e solo se $\vec u \cdot \vec v = 0$.

~ \vec u = (1; 2; 2),\quad \vec v = (2; 0; -1) :: due vettori
~ \vec u \cdot \vec v = 1 \cdot 2 + 2 \cdot 0 + 2 \cdot (-1) :: moltiplico le componenti corrispondenti e sommo
~ \vec u \cdot \vec v = 2 + 0 - 2 = \evidb{0} :: il risultato è zero: i due vettori sono perpendicolari

Il prodotto scalare dà anche l'angolo $\theta$ fra due vettori: $\cos\theta = \frac{\vec u \cdot \vec v}{|\vec u|\,|\vec v|}$. Quando il prodotto vale zero, $\theta = 90^\circ$.

?? $\vec u = (1; -1; 3)$ e $\vec v = (2; 5; 1)$ sono perpendicolari?
[x] Sì, perché $2 - 5 + 3 = 0$.
[ ] No, perché le componenti non sono proporzionali.
[ ] No, perché nessuna componente è zero.
=> Il prodotto scalare è $1 \cdot 2 + (-1) \cdot 5 + 3 \cdot 1 = 0$, quindi sono perpendicolari. Le componenti proporzionali servono per il parallelismo, non per la perpendicolarità.

>! Nel piano due rette perpendicolari hanno $m_1 \cdot m_2 = -1$. Nello spazio il coefficiente angolare non c'è: si usa il prodotto scalare.` },

    { id: 'piano', titolo: 'L\'equazione del piano', testo: R`Un piano è fissato da un suo punto e da una direzione perpendicolare. Pensa a un tavolo e a una freccia piantata dritta sul piano: la freccia dice come è inclinato il tavolo.

[[video:geometria-analitica-spazio/piano]]

Prendi il punto $A(1; 1; 1)$ e il vettore $\vec n = (1; 2; 2)$. Un punto $P(x; y; z)$ sta sul piano quando $\vec{AP}$ è perpendicolare a $\vec n$.

~ \vec{AP} \cdot \vec n = 0 :: $P$ sta sul piano se la freccia da $A$ a $P$ è perpendicolare a $\vec n$
~ \vec{AP} = \evid{(x - 1; y - 1; z - 1)} :: le componenti di $P - A$
~ 1(x - 1) + 2(y - 1) + 2(z - 1) = 0 :: prodotto scalare con $(1; 2; 2)$
~ \evidb{x + 2y + 2z - 5 = 0} :: tolgo le parentesi: $-1 - 2 - 2 = -5$

>* **Piano per $P_0(x_0; y_0; z_0)$ perpendicolare a $\vec n = (a; b; c)$:** $$a(x - x_0) + b(y - y_0)\;+$$ $$+\;c(z - z_0) = 0$$ Ogni piano ha un'equazione $ax + by + cz + d = 0$, con $a$, $b$, $c$ non tutti nulli. Il vettore $\vec n = (a; b; c)$ si chiama **vettore normale** al piano.

[[grafico:gPiano]]

Un punto sta sul piano quando le sue coordinate rendono vera l'equazione. $P(3; 1; 0)$ ci sta: $3 + 2 + 0 - 5 = 0$.

### Piani particolari

| equazione | il piano |
|---|---|
| $z = 0$ | è il piano $xy$ |
| $z = k$ | è parallelo al piano $xy$, a quota $k$ |
| $d = 0$ | passa per l'origine |
| manca la $z$, come $x + y - 4 = 0$ | è parallelo all'asse $z$ |

?? Qual è un vettore normale al piano $2x - y + 3z - 6 = 0$?
[x] $(2; -1; 3)$
[ ] $(2; 1; 3)$
[ ] $(2; -1; -6)$
=> Le sue componenti sono i coefficienti di $x$, $y$ e $z$, con il segno. Il termine noto $-6$ non c'entra: sposta il piano, ma non lo inclina.

>! Nello spazio $x + y - 4 = 0$ non è una retta. È un piano verticale: la $z$ manca, quindi può valere qualunque cosa.` },
    { id: 'piano-tre-punti', titolo: 'Il piano per tre punti', testo: R`Un tavolino a tre gambe non traballa mai. Tre punti non allineati individuano un solo piano.

Per trovarlo cerchi un vettore normale $\vec n$. Deve essere perpendicolare a $\vec{AB}$ e ad $\vec{AC}$, che stanno nel piano. Ecco un esempio con $A(1; 0; 1)$, $B(2; 1; 0)$ e $C(0; 2; 3)$.

~ \vec{AB} = (1; 1; -1),\ \vec{AC} = (-1; 2; 2) :: due vettori del piano
~ \begin{cases} a + b - c = 0 \\ -a + 2b + 2c = 0 \end{cases} :: $\vec n = (a; b; c)$ perpendicolare a tutti e due: prodotti scalari nulli
~ 3b + c = 0 \ \Rightarrow\ c = \evid{-3b} :: sommo le due equazioni: $a$ se ne va
~ a = c - b = \evid{-4b} :: lo ricavo dalla prima equazione
~ \vec n = \evidb{(4; -1; 3)} :: scelgo $b = -1$: va bene qualunque valore diverso da zero
~ 4(x - 1) - y + 3(z - 1) = 0 :: il piano per $A$ con quel vettore normale
~ \evidb{4x - y + 3z - 7 = 0} :: controllo con $C$: $0 - 2 + 9 - 7 = 0$

>* Per tre punti non allineati passa **uno e un solo** piano. Il vettore normale si trova imponendo $\vec n \cdot \vec{AB} = 0$ e $\vec n \cdot \vec{AC} = 0$.

Il sistema ha infinite soluzioni, tutte proporzionali. È giusto così: i vettori normali di un piano sono tutti paralleli fra loro. Con $(8; -2; 6)$ troveresti $8x - 2y + 6z - 14 = 0$, cioè lo stesso piano.

> **Scorciatoia: il prodotto vettoriale.** Il vettore $\vec u \times \vec v$ è perpendicolare sia a $\vec u$ sia a $\vec v$. La prima componente è $u_y v_z - u_z v_y$; le altre si ottengono ruotando le lettere: $u_z v_x - u_x v_z$ e $u_x v_y - u_y v_x$. Qui $\vec{AB} \times \vec{AC} = (4; -1; 3)$, lo stesso vettore normale.

C'è anche un altro metodo. Sostituisci i tre punti in $ax + by + cz + d = 0$. Ottieni tre equazioni in quattro incognite: una resta libera, e le dai il valore che vuoi.

> Se il piano taglia gli assi in $(p; 0; 0)$, $(0; q; 0)$ e $(0; 0; r)$, la sua equazione è $\frac{x}{p} + \frac{y}{q} + \frac{z}{r} = 1$. Si chiama **forma segmentaria**.

?? Quanti piani passano per $A(0; 0; 0)$, $B(1; 2; 3)$ e $C(2; 4; 6)$?
[ ] Uno solo.
[x] Infiniti.
[ ] Nessuno.
=> $\vec{AC} = 2\,\vec{AB}$: i tre punti sono allineati. Per una retta passano infiniti piani, come le pagine di un libro aperto intorno al dorso.

>! Prima di cercare il piano, controlla che i punti non siano allineati. Se $\vec{AB}$ e $\vec{AC}$ sono paralleli, le due condizioni diventano una sola e il piano non è unico.` },

    { id: 'retta', titolo: 'La retta nello spazio', testo: R`Nello spazio una retta non si scrive come $y = mx + q$. Si descrive con un punto che **cammina** lungo una freccia.

[[video:geometria-analitica-spazio/retta]]

Prendi $A(1; 1; 3)$ e $B(2; 3; 2)$. La freccia da $A$ a $B$ è $\vec v = B - A = (1; 2; -1)$. Un punto parte da $A$ e segue la freccia. Al tempo $t$ si trova in $A + t\,\vec v$.

~ P(t) = A + t\,\vec v :: si parte da $A$ e si fanno $t$ passi lungo $\vec v$
~ (x; y; z) = (1; 1; 3) + t\,(1; 2; -1) :: le componenti
~ \evidb{x = 1 + t,\ y = 1 + 2t,\ z = 3 - t} :: coordinata per coordinata

Con $t = 0$ il punto è in $A$, con $t = 1$ è in $B$. Con $t = 2$ è in $(3; 5; 1)$, oltre $B$. Con $t$ negativo sta prima di $A$.

>* **Equazioni parametriche** della retta per $P_0(x_0; y_0; z_0)$ con **vettore direzione** $\vec v = (l; m; n)$: $$\begin{cases} x = x_0 + l\,t \\ y = y_0 + m\,t \\ z = z_0 + n\,t \end{cases} \qquad t \in \mathbb{R}$$ I numeri da soli danno il punto, i coefficienti di $t$ danno la direzione.

[[grafico:gRetta]]

Un punto sta sulla retta se lo stesso valore di $t$ va bene per tutte e tre le equazioni. Prendi $Q(0; -1; 4)$: dalla prima viene $t = -1$. Con $t = -1$ tornano anche $y = -1$ e $z = 4$, quindi $Q$ sta sulla retta.

### La retta come intersezione di due piani

Due piani non paralleli si tagliano lungo una retta. Quindi anche un sistema di due equazioni di piani rappresenta una retta. Per passare alle parametriche, chiama $t$ una delle incognite.

~ \begin{cases} x + y - z - 2 = 0 \\ x - y + 3z - 4 = 0 \end{cases} :: i due piani
~ 2x + 2z - 6 = 0 :: sommo le equazioni: la $y$ se ne va
~ z = t,\ x = \evid{3 - t} :: chiamo $t$ la quota $z$
~ y = 2 - x + z = \evid{-1 + 2t} :: la ricavo dalla prima equazione
~ \evidb{x = 3 - t,\ y = -1 + 2t,\ z = t} :: vettore direzione $(-1; 2; 1)$

Il vettore direzione è perpendicolare ai vettori normali dei due piani. Controlla: $(-1; 2; 1) \cdot (1; 1; -1) = 0$ e $(-1; 2; 1) \cdot (1; -1; 3) = 0$.

>! Come parametro scegli un'incognita che sulla retta cambia. Se dal sistema esce, per esempio, $x = 1$, la $x$ è costante e non può fare da parametro: con $x = t$ andrebbe bene solo $t = 1$. Usa la $y$ o la $z$.

?? Qual è il vettore direzione della retta $x = 2 - 3t$, $y = 4$, $z = 1 + t$?
[x] $(-3; 0; 1)$
[ ] $(2; 4; 1)$
[ ] $(-3; 4; 1)$
=> I coefficienti di $t$ sono $-3$, $0$ e $1$. Nella seconda equazione $t$ non compare, quindi il suo coefficiente è zero. $(2; 4; 1)$ è invece il punto della retta con $t = 0$.

>! Una retta ha infinite equazioni parametriche. Puoi partire da un altro suo punto, o usare un multiplo del vettore direzione: la retta resta la stessa.` },

    { id: 'posizioni', titolo: 'Posizioni reciproche di rette e piani', testo: R`Le posizioni si decidono con due vettori: il **vettore normale** $\vec n$ di un piano e il **vettore direzione** $\vec v$ di una retta.

### Due piani

| condizione | i piani sono |
|---|---|
| $\vec n_1$ e $\vec n_2$ proporzionali | paralleli (o coincidenti) |
| non proporzionali | incidenti lungo una retta |
| in particolare, se $\vec n_1 \cdot \vec n_2 = 0$ | perpendicolari |

Per esempio $2x - y + z - 1 = 0$ e $4x - 2y + 2z + 3 = 0$ sono paralleli, perché $(4; -2; 2) = 2\,(2; -1; 1)$. Se anche i termini noti fossero nello stesso rapporto, sarebbero coincidenti.

### Due rette

Due rette con direzioni proporzionali sono **parallele**. Se non sono parallele, possono incontrarsi in un punto: sono **incidenti**. Oppure possono non incontrarsi mai.

>* Due rette sono **sghembe** quando non sono parallele e non hanno punti in comune. Non esiste un piano che le contenga tutte e due. Nel piano non succede mai.

[[grafico:gCubo]]

Per distinguere incidenti e sghembe, metti a sistema le parametriche, con due parametri diversi $t$ e $t'$. Se il sistema ha soluzione le rette sono incidenti, altrimenti sono sghembe.

Con $\vec v_1 \cdot \vec v_2 = 0$ le due direzioni sono perpendicolari. Due rette incidenti con questa proprietà sono **perpendicolari**. La parola **ortogonali** vale anche per due rette sghembe. Nel cubo, lo spigolo incidente è perpendicolare a $r$, quello sghembo è ortogonale a $r$.

### Retta e piano

| condizione | la retta è |
|---|---|
| $\vec v \cdot \vec n = 0$ | parallela al piano (o contenuta) |
| $\vec v \cdot \vec n \ne 0$ | incidente in un punto |
| in particolare, se $\vec v$ e $\vec n$ sono proporzionali | perpendicolare al piano |

Il punto d'incontro si trova sostituendo le parametriche nell'equazione del piano.

~ x = 1 + t,\ y = 2 - t,\ z = 3t :: la retta; il piano è $\pi: x + y + z - 6 = 0$. Poiché $\vec v \cdot \vec n = 1 - 1 + 3 = 3 \ne 0$, si incontrano
~ (1 + t) + (2 - t) + 3t - 6 = 0 :: al posto di $x$, $y$ e $z$ metto le parametriche
~ 3t - 3 = 0 \ \Rightarrow\ t = \evid{1} :: resta un'equazione nella sola $t$
~ \evidb{(2; 1; 3)} :: rimetto $t = 1$ nelle parametriche; controllo: $2 + 1 + 3 = 6$

?? Una retta ha $\vec v = (2; 1; -1)$, un piano ha $\vec n = (1; -1; 1)$. Che cosa puoi dire?
[x] È parallela al piano, o sta sul piano.
[ ] È perpendicolare al piano.
[ ] Taglia il piano in un solo punto.
=> $\vec v \cdot \vec n = 2 - 1 - 1 = 0$: la direzione della retta è perpendicolare alla normale, quindi la retta corre parallela al piano. Per sapere se ci sta sopra, prova un suo punto nell'equazione del piano.

>! Retta **perpendicolare** al piano vuol dire $\vec v$ **parallelo** a $\vec n$. E $\vec v \cdot \vec n = 0$ vuol dire retta **parallela** al piano. Le due parole si scambiano: è l'errore più comune.` },

    { id: 'distanze', titolo: 'Distanze: punto-piano e punto-retta', testo: R`La distanza di $P$ dal piano $\pi$ è la lunghezza del segmento più corto da $P$ a $\pi$. È il segmento perpendicolare al piano. Il suo piede $H$ si chiama **proiezione** di $P$ sul piano.

>* **Distanza di $P(x_0; y_0; z_0)$ da $\pi: ax + by + cz + d = 0$:** $$d(P, \pi) = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$$ È la formula della distanza punto-retta nel piano, con un termine in più.

~ P(4; 2; 3) :: il punto; il piano è $\pi: x + 2y + 2z - 5 = 0$, con $a = 1$, $b = 2$, $c = 2$, $d = -5$
~ |4 + 4 + 6 - 5| = \evid{9} :: numeratore: le coordinate di $P$ nel primo membro
~ \sqrt{1 + 4 + 4} = \evid{3} :: denominatore: il modulo del vettore normale
~ d(P, \pi) = \evidb{3} :: divido

Per trovare $H$, scendi da $P$ lungo la normale. La retta per $P$ con direzione $\vec n$ è $x = 4 + t$, $y = 2 + 2t$, $z = 3 + 2t$. Sostituita nel piano dà $9 + 9t = 0$, quindi $t = -1$ e $H(3; 0; 1)$.

[[grafico:gDistanza]]

> La distanza fra due piani paralleli è la distanza di un punto qualunque del primo dal secondo.

### Distanza di un punto da una retta (cenni)

Qui non serve una formula nuova. Si cerca il piede $H$ della perpendicolare, in tre passi:

1. scrivi il piano per $P$ perpendicolare alla retta: il suo vettore normale è $\vec v$;
2. trova il punto $H$ in cui la retta taglia quel piano;
3. calcola la distanza $\overline{PH}$.

?? Quanto dista l'origine dal piano $2x - y + 2z + 6 = 0$?
[x] $2$
[ ] $6$
[ ] $\frac{6}{\sqrt{5}}$
=> Con $O(0; 0; 0)$ il numeratore è $|6| = 6$. Il denominatore è $\sqrt{4 + 1 + 4} = 3$, quindi la distanza è $2$. Chi trova $\frac{6}{\sqrt{5}}$ ha dimenticato $c^2$ sotto la radice.

>! Sotto la radice vanno solo $a$, $b$ e $c$: il termine noto $d$ non ci va. E il numeratore vuole il valore assoluto, perché una distanza non è mai negativa.` },

    { id: 'sfera', titolo: 'La sfera', testo: R`La sfera è la sorella della circonferenza, con una dimensione in più. È fatta dai punti che stanno alla stessa distanza da un centro.

>* La **superficie sferica** di centro $C(\alpha; \beta; \gamma)$ e raggio $r > 0$ è l'insieme dei punti $P$ con $\overline{CP} = r$. La sua equazione è $$(x - \alpha)^2 + (y - \beta)^2 + (z - \gamma)^2 = r^2$$

Spesso si dice semplicemente **sfera**. L'equazione si trova come per la circonferenza: scrivi $\overline{CP} = r$ con la formula della distanza, poi elevi al quadrato. Con centro nell'origine e raggio $3$ viene $x^2 + y^2 + z^2 = 9$.

Taglia questa sfera con il piano orizzontale $z = k$. Al posto di $z$ metti $k$: resta $x^2 + y^2 = 9 - k^2$, una circonferenza. Ogni taglio orizzontale è una circonferenza, più piccola quanto più il piano si allontana dal centro.

[[grafico:gSfera]]

### La forma generale

Sviluppa i quadrati: ottieni $x^2 + y^2 + z^2 + ax + by + cz + d = 0$. I tre quadrati hanno coefficiente $1$, e non ci sono termini come $xy$.

Per tornare alla forma con il centro, **completa i quadrati**, come per la circonferenza. Una lettera alla volta, aggiungi e togli il quadrato della metà del suo coefficiente.

~ x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0 :: la forma generale
~ x^2 - 2x = (x - 1)^2 \evid{- 1} :: la metà di $-2$ è $-1$, e $(-1)^2 = 1$
~ y^2 + 4y = (y + 2)^2 \evid{- 4} :: la metà di $4$ è $2$, e $2^2 = 4$
~ z^2 - 6z = (z - 3)^2 \evid{- 9} :: la metà di $-6$ è $-3$, e $(-3)^2 = 9$
~ (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = \evidb{16} :: sostituisco e porto a destra $1 + 4 + 9 + 2$
~ C(1; -2; 3),\ r = \evidb{4} :: centro e raggio si leggono subito

Fatto una volta per tutte con le lettere, il conto dà le formule.

>* Da $x^2 + y^2 + z^2 + ax + by + cz + d = 0$ si leggono centro e raggio: $$C\left(-\frac{a}{2}; -\frac{b}{2}; -\frac{c}{2}\right)$$ $$r = \sqrt{\frac{a^2 + b^2 + c^2}{4} - d}$$ La sfera esiste se il numero sotto la radice è positivo. Se vale $0$ resta solo il centro, se è negativo non resta nessun punto.

Con le formule, nell'esempio: $C(1; -2; 3)$ e $r^2 = \frac{4 + 16 + 36}{4} + 2 = 16$.

?? Che cosa rappresenta l'equazione $x^2 + y^2 + z^2 + 2x + 5 = 0$?
[x] Nessun punto.
[ ] La sfera di centro $(-1; 0; 0)$ e raggio $\sqrt{5}$.
[ ] La sfera di centro $(1; 0; 0)$ e raggio $2$.
=> Viene $r^2 = 1 - 5 = -4$, negativo. Completando il quadrato si ha $(x + 1)^2 + y^2 + z^2 = -4$. Una somma di quadrati non è mai negativa: nessun punto rende vera l'equazione.

>! Prima di leggere centro e raggio, i quadrati devono avere coefficiente $1$. Con $2x^2 + 2y^2 + 2z^2 - 4x - 16 = 0$ dividi per $2$: centro $(1; 0; 0)$ e $r^2 = 1 + 8 = 9$.` },

    { id: 'sfera-piano', titolo: 'Sfera e piano, piano tangente', testo: R`Un piano può tagliare una sfera, sfiorarla o restarne fuori. Lo decide la distanza $d$ del centro dal piano, confrontata con il raggio $r$.

[[video:geometria-analitica-spazio/sfera-tangente]]

| distanza | il piano è | punti comuni |
|---|---|---|
| $d < r$ | secante | una circonferenza |
| $d = r$ | tangente | un punto |
| $d > r$ | esterno | nessuno |

Se il piano è secante, il taglio è una circonferenza. Il suo centro $H$ è la proiezione di $C$ sul piano. Il raggio $\rho$ viene da Pitagora: nel triangolo $CHQ$ i cateti sono $d$ e $\rho$, l'ipotenusa è $r$.

>* **Raggio della circonferenza sezione:** $$\rho = \sqrt{r^2 - d^2}$$

[[grafico:gSezione]]

~ C(1; -2; 3),\ r = 4 :: la sfera $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$ e il piano $\pi: x + 2y + 2z + 6 = 0$
~ d = \frac{|1 - 4 + 6 + 6|}{3} = \evid{3} :: distanza del centro dal piano: $3 < 4$, il piano è secante
~ \rho = \sqrt{16 - 9} = \evidb{\sqrt{7}} :: il raggio del taglio
~ H = C - \vec n = \evidb{(0; -4; 1)} :: il centro del taglio: il punto $C + t\,\vec n$ sta nel piano per $t = -1$

### Il piano tangente

Il piano tangente in un punto $P_0$ della sfera è **perpendicolare al raggio** $CP_0$. Succede lo stesso con la tangente alla circonferenza.

>* **Piano tangente** in $P_0$ alla sfera di centro $C$: è il piano per $P_0$ con vettore normale $\vec{CP_0} = P_0 - C$.

Esempio: la sfera $x^2 + y^2 + z^2 = 9$ e il punto $P_0(-1; 2; 2)$, che ci sta perché $1 + 4 + 4 = 9$. Il centro è l'origine, quindi il vettore normale è $P_0 - O = (-1; 2; 2)$. Il piano è $-(x + 1) + 2(y - 2) + 2(z - 2) = 0$, cioè $-x + 2y + 2z - 9 = 0$.

[[grafico:gTangente]]

> Vale anche la **formula di sdoppiamento**, come per la circonferenza. In $x^2 + y^2 + z^2 = 9$ scrivi $x_0 x + y_0 y + z_0 z = 9$: con $P_0(-1; 2; 2)$ viene subito $-x + 2y + 2z = 9$.

?? Come stanno il piano $z = 6$ e la sfera $x^2 + y^2 + z^2 = 25$?
[x] Il piano è esterno.
[ ] Il piano è tangente in $(0; 0; 5)$.
[ ] Il piano taglia una circonferenza di raggio $1$.
=> Il centro è l'origine e dista $6$ dal piano, più del raggio $5$. Mettendo $6$ al posto di $z$ viene $x^2 + y^2 = -11$: nessun punto. Il piano tangente in $(0; 0; 5)$ è $z = 5$.

>! Il raggio del taglio non è $r - d$. Il triangolo $CHQ$ è rettangolo in $H$: serve Pitagora, $\rho = \sqrt{r^2 - d^2}$.` }
  ],
  grafici: {
    gCoordinate: {
      tipo: 'piano', x: [-2.4, 6.2], y: [-2.7, 4.5], assi: false, griglia: false, mirino: false,
      parametri: [
        { nome: 'a', min: 0, max: 4, passo: 0.5, valore: 3, etichetta: 'x di P' },
        { nome: 'b', min: 0, max: 5, passo: 0.5, valore: 4, etichetta: 'y di P' },
        { nome: 'c', min: 0, max: 3, passo: 0.5, valore: 2, etichetta: 'z di P' }
      ],
      elementi: assi(4.8, 5.8, 3.8).concat([
        { tipo: 'segmento', da: [0, 0], a: pj('a', 0, 0), colore: 3, tratteggio: true },
        { tipo: 'segmento', da: pj('a', 0, 0), a: pj('a', 'b', 0), colore: 3, tratteggio: true },
        { tipo: 'segmento', da: [0, 0], a: pj('a', 'b', 0), colore: 1, tratteggio: true },
        { tipo: 'segmento', da: pj('a', 'b', 0), a: pj('a', 'b', 'c'), colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: pj('a', 'b', 'c'), colore: 2 },
        { tipo: 'punto', p: pj('a', 'b', 0), etichetta: 'H', posizione: 'basso-destra', colore: 1 },
        { tipo: 'punto', p: pj('a', 'b', 'c'), etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'sinistra', colore: 4 },
        { tipo: 'testo', p: [-2.3, 4.15], testo: 'P({{a}}; {{b}}; {{c}})     OP = {{sqrt(a^2 + b^2 + c^2)}}', ancora: 'start' }
      ]),
      didascalia: 'Muovi i cursori: P si raggiunge da O camminando lungo x, poi parallelamente a y (tratteggio verde), poi salendo. H è il punto sotto P, sul pavimento. La distanza OP (in arancio) è Pitagora due volte: prima OH, poi OP.'
    },
    gPiano: {
      tipo: 'piano', x: [-2.7, 4.0], y: [-2.6, 3.6], assi: false, griglia: false, mirino: false,
      elementi: [TRIANGOLO].concat(assi(6, 3.6, 3.4), [
        { tipo: 'segmento', da: pj(1, 1, 1), a: pj(3, 1, 0), colore: 3 },
        { tipo: 'vettore', da: pj(1, 1, 1), a: pj(2, 3, 3), colore: 2, etichetta: 'n' }
      ], retto3([1, 1, 1], unit([2, 0, -1]), unit([1, 2, 2]), 0.42, 2), [
        { tipo: 'punto', p: pj(1, 1, 1), etichetta: 'A', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: pj(3, 1, 0), etichetta: 'P', posizione: 'basso-sinistra', colore: 3 }
      ]),
      didascalia: 'Il piano x + 2y + 2z − 5 = 0, disegnato con il triangolo dei punti in cui taglia gli assi: (5; 0; 0), (0; 2,5; 0) e (0; 0; 2,5). Da A(1; 1; 1) parte il vettore normale n = (1; 2; 2), perpendicolare al segmento AP, che sta nel piano.'
    },
    gRetta: {
      tipo: 'piano', x: [-2.2, 7.0], y: [-2.6, 4.8], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 't', min: -1, max: 2.5, passo: 0.1, valore: 1.5, etichetta: 't' }],
      elementi: assi(4.5, 6.8, 4.4).concat([
        seg3([1 - 1.2, 1 - 2.4, 3 + 1.2], [1 + 2.6, 1 + 5.2, 3 - 2.6], { colore: 1 }),
        { tipo: 'vettore', da: pj(1, 1, 3), a: pj(2, 3, 2), colore: 2, etichetta: 'v' },
        { tipo: 'segmento', da: pj('1 + t', '1 + 2*t', '3 - t'), a: pj('1 + t', '1 + 2*t', 0), colore: 3 },
        { tipo: 'punto', p: pj('1 + t', '1 + 2*t', 0), colore: 3 },
        { tipo: 'punto', p: pj(1, 1, 3), etichetta: 'A', posizione: 'alto-destra', colore: 1 },
        { tipo: 'punto', p: pj(2, 3, 2), etichetta: 'B', posizione: 'alto-destra', colore: 1 },
        { tipo: 'punto', p: pj('1 + t', '1 + 2*t', '3 - t'), etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [2.0, 4.35], testo: 'P = ({{1 + t}}; {{1 + 2*t}}; {{3 - t}})', ancora: 'start' }
      ]),
      didascalia: 'La retta x = 1 + t, y = 1 + 2t, z = 3 − t. Muovi t: con t = 0 il punto P è in A, con t = 1 è in B, con t negativo torna indietro. Il segmento verde scende da P al pavimento e aiuta a vedere la profondità.'
    },
    gCubo: {
      tipo: 'piano', x: [-1.9, 4.6], y: [-2.0, 3.4], assi: false, griglia: false, mirino: false,
      elementi: CUBO.concat([
        seg3([3, 0, 0], [3, 3, 0], { colore: 2 }),
        seg3([0, 0, 3], [0, 3, 3], { colore: 3 }),
        seg3([3, 3, 0], [3, 3, 3], { colore: 3 }),
        seg3([0, 3, 0], [0, 3, 3], { colore: 3 }),
        { tipo: 'testo', p: [0.38, -1.65], testo: 'r' },
        { tipo: 'testo', p: [1.41, 2.9], testo: 'parallela a r' },
        { tipo: 'testo', p: [1.68, 0.4], testo: 'incidente', ancora: 'end' },
        { tipo: 'testo', p: [2.95, 1.0], testo: 'sghemba', ancora: 'start' }
      ]),
      didascalia: 'Gli spigoli di un cubo. Rispetto allo spigolo r (arancio), lo spigolo in alto dietro è parallelo, quello verticale che parte dalla sua estremità è incidente e perpendicolare, quello verticale dietro a destra è sghembo e ortogonale: non è parallelo a r e non lo incontra mai, ma la sua direzione è perpendicolare a quella di r.'
    },
    gDistanza: {
      tipo: 'piano', x: [-2.8, 1.4], y: [-1.9, 1.6], assi: false, griglia: false, mirino: false,
      elementi: [(function () {
        /* un pezzo del piano centrato su H(3; 0; 1), con due direzioni del piano perpendicolari fra loro */
        const H = [3, 0, 1], u = [2 / 3, -2 / 3, 1 / 3], w = [2 / 3, 1 / 3, -2 / 3], L = 1.3;
        const v = (s, r) => pj(H[0] + s * L * u[0] + r * L * w[0], H[1] + s * L * u[1] + r * L * w[1], H[2] + s * L * u[2] + r * L * w[2]);
        return { tipo: 'poligono', punti: [v(1, 1), v(1, -1), v(-1, -1), v(-1, 1)], colore: 1 };
      })()].concat([
        { tipo: 'testo', p: [-1.95, 0.8], testo: 'π' },
        seg3([3, 0, 1], [4, 2, 3], { colore: 2, etichetta: 'd = 3' })
      ], retto3([3, 0, 1], unit([1, 2, 2]), [2 / 3, -2 / 3, 1 / 3], 0.4, 2), [
        { tipo: 'punto', p: pj(4, 2, 3), etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'punto', p: pj(3, 0, 1), etichetta: 'H', posizione: 'basso-sinistra', colore: 2 }
      ]),
      didascalia: 'P(4; 2; 3) e un pezzo del piano x + 2y + 2z − 5 = 0, in azzurro. P sta fuori dal piano; il segmento più corto da P al piano è PH, parallelo al vettore normale: H(3; 0; 1) è la proiezione di P e PH = 3.'
    },
    gSfera: {
      tipo: 'piano', x: [-5, 5], y: [-3.4, 5.8], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 'k', min: 0, max: 4, passo: 0.1, valore: 2, etichetta: 'quota k del piano' }],
      elementi: [
        { tipo: 'poligono', punti: [pj(PIASTRA, PIASTRA, 'k'), pj(PIASTRA, -PIASTRA, 'k'), pj(-PIASTRA, -PIASTRA, 'k'), pj(-PIASTRA, PIASTRA, 'k')], colore: 3 },
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, colore: 1 },
        { tipo: 'ellisse', centro: [0, 0], a: 3, b: arr(3 * SIN_PH), colore: 1, tratteggio: true },
        { tipo: 'ellisse', centro: [0, COS_PH.toFixed(5) + '*k'], a: RHO, b: SIN_PH.toFixed(5) + '*' + RHO, colore: 2 },
        { tipo: 'vettore', da: [0, 0], a: pj(0, 0, 4.4), colore: 4 },
        { tipo: 'testo', p: [0.25, arr(4.4 * COS_PH)], testo: 'z', ancora: 'start' },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-destra', colore: 4 },
        { tipo: 'punto', p: pj(0, 0, 3), etichetta: 'T', posizione: 'alto-destra', colore: 1 },
        { tipo: 'testo', p: [-4.9, -2.55], testo: 'z = {{k}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.9, -3.15], testo: 'ρ = √(9 − k²) = {{sqrt(9 - k^2)}}', ancora: 'start' }
      ],
      didascalia: 'La sfera x² + y² + z² = 9 e il piano orizzontale z = k (in verde). Il taglio, in arancio, è la circonferenza x² + y² = 9 − k². Alza il piano: la circonferenza si stringe, a k = 3 resta il solo punto T, oltre non c\'è più niente.'
    },
    gSezione: {
      tipo: 'piano', x: [-4.2, 4.2], y: [-3.6, 4.9], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 'd', min: 0, max: 4, passo: 0.1, valore: 2, etichetta: 'distanza d del piano dal centro' }],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, colore: 1 },
        { tipo: 'orizzontale', y: 'd', colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: [0, 'd'], colore: 4, etichetta: 'd' },
        { tipo: 'segmento', da: [0, 'd'], a: ['sqrt((9 - d^2 + abs(9 - d^2))/2)', 'd'], colore: 2, etichetta: 'ρ' },
        { tipo: 'segmento', da: [0, 0], a: ['sqrt((9 - d^2 + abs(9 - d^2))/2)', '(d + 3 - abs(d - 3))/2'], colore: 1, etichetta: 'r = 3' },
        { tipo: 'angolo', vertice: [0, 'd'], da: [1, 'd'], a: [0, 'd - 1'], raggio: 0.4, colore: 4 },
        { tipo: 'punto', p: [0, 0], etichetta: 'C', posizione: 'basso-sinistra', colore: 1 },
        { tipo: 'punto', p: [0, 'd'], etichetta: 'H', posizione: 'alto-sinistra', colore: 4 },
        { tipo: 'punto', p: ['sqrt((9 - d^2 + abs(9 - d^2))/2)', '(d + 3 - abs(d - 3))/2'], etichetta: 'Q', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-4.0, 4.55], testo: 'd = {{d}}     ρ = √(9 − d²) = {{sqrt(9 - d^2)}}', ancora: 'start' }
      ],
      didascalia: 'La sfera di raggio 3 vista di taglio, con il piano (in verde) a distanza d dal centro C. Il triangolo CHQ è rettangolo in H, quindi ρ² + d² = 9. Con d = 3 il piano è tangente e ρ = 0; con d > 3 è esterno.'
    },
    gTangente: {
      tipo: 'piano', x: [-3.6, 3.8], y: [-3.4, 3.6], assi: false, griglia: false, mirino: false,
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, colore: 1 },
        { tipo: 'ellisse', centro: [0, 0], a: 3, b: arr(3 * SIN_PH), colore: 1, tratteggio: true },
        (function () {
          const P0 = [-1, 2, 2], u = [2 / 3, 2 / 3, -1 / 3], w = [-2 / 3, 1 / 3, -2 / 3], L = 1.15;
          const v = (s, r) => pj(P0[0] + s * L * u[0] + r * L * w[0], P0[1] + s * L * u[1] + r * L * w[1], P0[2] + s * L * u[2] + r * L * w[2]);
          return { tipo: 'poligono', punti: [v(1, 1), v(1, -1), v(-1, -1), v(-1, 1)], colore: 3 };
        })(),
        seg3([0, 0, 0], [-1, 2, 2], { colore: 2, tratteggio: true }),
        { tipo: 'vettore', da: pj(-1, 2, 2), a: pj(-1.5, 3, 3), colore: 2, etichetta: 'n' }
      ].concat(retto3([-1, 2, 2], unit([-1, 2, 2]), [2 / 3, 2 / 3, -1 / 3], 0.3, 2), [
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-sinistra', colore: 1 },
        { tipo: 'punto', p: pj(-1, 2, 2), etichetta: 'P₀', posizione: 'alto-sinistra', colore: 2 }
      ]),
      didascalia: 'La sfera x² + y² + z² = 9 e il piano tangente in P₀(−1; 2; 2), in verde: −x + 2y + 2z − 9 = 0. P₀ è vicino al contorno, e il piano si vede quasi di taglio, come una tangente. Il raggio OP₀ è perpendicolare al piano, quindi il vettore normale è n = (−1; 2; 2).'
    }
  },
  esempi: [
    { titolo: 'Il piano per tre punti, con il sistema', problema: R`Scrivi l'equazione del piano che passa per $A(2; 1; 0)$, $B(0; 3; 1)$ e $C(1; 0; 1)$.`, passi: [
      R`Controllo che i punti non siano allineati: $\vec{AB} = (-2; 2; 1)$ e $\vec{AC} = (-1; -1; 1)$ non sono proporzionali. Il piano è uno solo.`,
      R`Sostituisco i tre punti in $ax + by + cz + d = 0$: $\begin{cases} 2a + b + d = 0 \\ 3b + c + d = 0 \\ a + c + d = 0 \end{cases}$`,
      R`Sono tre equazioni in quattro incognite: esprimo tutto in funzione di $b$. Dalla terza $c = -a - d$; nella seconda diventa $3b - a = 0$, quindi $a = 3b$.`,
      R`Dalla prima $d = -2a - b = -7b$. Poi $c = -a - d = -3b + 7b = 4b$.`,
      R`Scelgo $b = 1$: $a = 3$, $c = 4$, $d = -7$. Il piano è $3x + y + 4z - 7 = 0$.`,
      R`Controllo con i tre punti: $6 + 1 - 7 = 0$, $3 + 4 - 7 = 0$, $3 + 4 - 7 = 0$.`
    ], risultato: R`$3x + y + 4z - 7 = 0$` },

    { titolo: 'Retta per due punti e piano', problema: R`Trova il punto in cui la retta per $A(2; -1; 1)$ e $B(4; 0; -1)$ incontra il piano $x - y + z - 2 = 0$.`, passi: [
      R`Vettore direzione: $\vec v = B - A = (2; 1; -2)$. Equazioni parametriche: $x = 2 + 2t$, $y = -1 + t$, $z = 1 - 2t$.`,
      R`Il piano ha $\vec n = (1; -1; 1)$ e $\vec v \cdot \vec n = 2 - 1 - 2 = -1 \ne 0$: la retta non è parallela al piano, quindi lo incontra in un punto.`,
      R`Sostituisco le parametriche nel piano: $(2 + 2t) - (-1 + t) + (1 - 2t) - 2 = 0$, cioè $2 - t = 0$, e $t = 2$.`,
      R`Con $t = 2$: $x = 6$, $y = 1$, $z = -3$. Controllo nel piano: $6 - 1 - 3 - 2 = 0$.`
    ], risultato: R`Il punto $(6; 1; -3)$` },

    { titolo: 'Dai due piani alla retta', problema: R`Scrivi in forma parametrica la retta $r: \begin{cases} 2x - y + z - 3 = 0 \\ x + y - z = 0 \end{cases}$ e dì come è disposta.`, passi: [
      R`Sommo le due equazioni: $y$ e $z$ se ne vanno insieme. Resta $3x - 3 = 0$, cioè $x = 1$ per tutti i punti della retta.`,
      R`Nella seconda equazione metto $x = 1$: $y - z = -1$, cioè $y = z - 1$.`,
      R`Chiamo $t$ la quota: $x = 1$, $y = -1 + t$, $z = t$. Vettore direzione $(0; 1; 1)$, punto $(1; -1; 0)$ per $t = 0$.`,
      R`Controllo: $(0; 1; 1)$ è perpendicolare a tutte e due le normali, perché $(0; 1; 1) \cdot (2; -1; 1) = 0$ e $(0; 1; 1) \cdot (1; 1; -1) = 0$.`,
      R`La $x$ vale sempre $1$: la retta sta nel piano $x = 1$, parallelo al piano $yz$.`
    ], risultato: R`$x = 1$, $y = -1 + t$, $z = t$` },

    { titolo: 'Due rette che si incontrano ad angolo retto', problema: R`Stabilisci la posizione delle rette $r: x = 2 + t,\ y = -1 + 2t,\ z = 1 - t$ e $s: x = 4 + t',\ y = 1,\ z = 1 + t'$.`, passi: [
      R`Direzioni $(1; 2; -1)$ e $(1; 0; 1)$: non sono proporzionali, quindi le rette non sono parallele.`,
      R`Cerco un punto comune con due parametri diversi: $\begin{cases} 2 + t = 4 + t' \\ -1 + 2t = 1 \\ 1 - t = 1 + t' \end{cases}$`,
      R`Dalla seconda $t = 1$. Nella prima: $3 = 4 + t'$, quindi $t' = -1$.`,
      R`Controllo la terza: $1 - 1 = 0$ e $1 + (-1) = 0$. Torna: le rette sono incidenti, nel punto $(3; 1; 0)$.`,
      R`Prodotto scalare delle direzioni: $1 + 0 - 1 = 0$. Le rette si incontrano e le loro direzioni sono perpendicolari: sono perpendicolari.`
    ], risultato: R`Incidenti e perpendicolari, nel punto $(3; 1; 0)$` },

    { titolo: 'Distanza di un punto da una retta', problema: R`Calcola la distanza di $P(5; -1; 2)$ dalla retta $r: x = 1 + 2t,\ y = t,\ z = 1 + 2t$.`, passi: [
      R`Il piano per $P$ perpendicolare a $r$ ha per vettore normale la direzione $(2; 1; 2)$: $2(x - 5) + (y + 1) + 2(z - 2) = 0$, cioè $2x + y + 2z - 13 = 0$.`,
      R`Cerco dove $r$ taglia questo piano: $2(1 + 2t) + t + 2(1 + 2t) - 13 = 0$, cioè $9t - 9 = 0$, e $t = 1$.`,
      R`Il piede della perpendicolare è $H(3; 1; 3)$.`,
      R`$\vec{HP} = (2; -2; -1)$, quindi $\overline{PH} = \sqrt{4 + 4 + 1} = 3$. Controllo: $\vec{HP} \cdot (2; 1; 2) = 4 - 2 - 2 = 0$.`
    ], risultato: R`$d(P, r) = 3$, con piede $H(3; 1; 3)$` },

    { titolo: 'La sfera di diametro AB e il piano tangente', problema: R`Scrivi la sfera che ha per diametro il segmento di estremi $A(3; 1; 5)$ e $B(-1; 3; 1)$, e il piano tangente in $A$.`, passi: [
      R`Il centro è il punto medio di $AB$: $M(1; 2; 3)$.`,
      R`Il raggio è metà del diametro: $\vec{AB} = (-4; 2; -4)$, $\overline{AB} = \sqrt{16 + 4 + 16} = 6$, quindi $r = 3$.`,
      R`La sfera è $(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 9$.`,
      R`Il piano tangente in $A$ è perpendicolare al raggio $MA$: vettore normale $A - M = (2; -1; 2)$.`,
      R`Piano: $2(x - 3) - (y - 1) + 2(z - 5) = 0$, cioè $2x - y + 2z - 15 = 0$. Controllo: la distanza di $M$ è $\frac{|2 - 2 + 6 - 15|}{3} = 3$, uguale al raggio.`
    ], risultato: R`$(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 9$; piano tangente $2x - y + 2z - 15 = 0$` }
  ],

  formulario: [
    { nome: 'Distanza fra due punti', formula: R`\overline{AB} = \sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}`, nota: R`Con $\Delta x = x_B - x_A$, $\Delta y = y_B - y_A$, $\Delta z = z_B - z_A$.` },
    { nome: 'Punto medio', formula: R`M\left(\frac{x_A + x_B}{2};\ \frac{y_A + y_B}{2};\ \frac{z_A + z_B}{2}\right)` },
    { nome: 'Vettore fra due punti e modulo', formula: R`\vec{AB} = B - A \qquad |\vec v| = \sqrt{v_x^2 + v_y^2 + v_z^2}`, nota: R`Due vettori sono paralleli se le componenti sono proporzionali: $\vec v = k\,\vec u$.` },
    { nome: 'Prodotto scalare', formula: R`\vec u \cdot \vec v = u_x v_x + u_y v_y + u_z v_z`, nota: R`Due vettori non nulli sono perpendicolari se e solo se $\vec u \cdot \vec v = 0$. L'angolo fra loro: $\cos\theta = \frac{\vec u \cdot \vec v}{|\vec u|\,|\vec v|}$.` },
    { nome: 'Piano per un punto, con il vettore normale', formula: R`a(x - x_0) + b(y - y_0) + c(z - z_0) = 0`, nota: R`$\vec n = (a; b; c)$ è perpendicolare al piano.` },
    { nome: 'Equazione generale del piano', formula: R`ax + by + cz + d = 0`, nota: R`$a$, $b$, $c$ non tutti nulli. Se manca una variabile, il piano è parallelo all'asse corrispondente.` },
    { nome: 'Forma segmentaria', formula: R`\frac{x}{p} + \frac{y}{q} + \frac{z}{r} = 1`, nota: R`Il piano che taglia gli assi in $(p; 0; 0)$, $(0; q; 0)$, $(0; 0; r)$.` },
    { nome: 'Equazioni parametriche della retta', formula: R`x = x_0 + l\,t, \quad y = y_0 + m\,t, \quad z = z_0 + n\,t`, nota: R`Passa per $P_0(x_0; y_0; z_0)$ con vettore direzione $\vec v = (l; m; n)$. Per due punti: $\vec v = B - A$.` },
    { nome: 'Piani perpendicolari', formula: R`\vec n_1 \cdot \vec n_2 = 0`, nota: R`Paralleli se $\vec n_1 = k\,\vec n_2$. Negli altri casi i due piani si tagliano lungo una retta.` },
    { nome: 'Retta parallela a un piano', formula: R`\vec v \cdot \vec n = 0`, nota: R`La retta può anche stare sul piano: prova un suo punto. È invece perpendicolare al piano se $\vec v = k\,\vec n$.` },
    { nome: 'Distanza di un punto da un piano', formula: R`d(P, \pi) = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}` },
    { nome: 'Sfera', formula: R`(x - \alpha)^2 + (y - \beta)^2 + (z - \gamma)^2 = r^2`, nota: R`Centro $C(\alpha; \beta; \gamma)$, raggio $r$.` },
    { nome: 'Raggio della sfera in forma generale', formula: R`r = \sqrt{\frac{a^2 + b^2 + c^2}{4} - d}`, nota: R`Per $x^2 + y^2 + z^2 + ax + by + cz + d = 0$, con centro $C\left(-\frac{a}{2}; -\frac{b}{2}; -\frac{c}{2}\right)$. Esiste se il radicando è positivo.` },
    { nome: 'Sfera e piano secante', formula: R`\rho = \sqrt{r^2 - d^2}`, nota: R`$d$ è la distanza del centro dal piano: secante se $d < r$, tangente se $d = r$. Il piano tangente in $P_0$ ha vettore normale $P_0 - C$.` }
  ],
  flashcards: [
    { id: 'fc-01', sezione: 'coordinate-distanza', tipo: 'definizione', fronte: R`Che cosa sono le coordinate di un punto dello spazio?`, retro: R`Tre numeri in ordine, $P(x; y; z)$: ascissa, ordinata e quota. Dicono quanto spostarsi da $O$ lungo i tre assi.` },
    { id: 'fc-02', sezione: 'coordinate-distanza', tipo: 'concetto', fronte: R`Quali sono i tre piani coordinati e le loro equazioni?`, retro: R`Il piano $xy$ ($z = 0$), il piano $xz$ ($y = 0$) e il piano $yz$ ($x = 0$).` },
    { id: 'fc-03', sezione: 'coordinate-distanza', tipo: 'formula', fronte: R`Distanza fra $A$ e $B$ nello spazio`, retro: R`$\overline{AB} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$` },
    { id: 'fc-04', sezione: 'coordinate-distanza', tipo: 'concetto', fronte: R`Perché nella distanza ci sono tre quadrati?`, retro: R`Si usa Pitagora due volte: prima sul pavimento con $\Delta x$ e $\Delta y$, poi in verticale con $\Delta z$.` },
    { id: 'fc-05', sezione: 'punto-medio-vettori', tipo: 'formula', fronte: R`Punto medio di $AB$ nello spazio`, retro: R`$M\left(\frac{x_A + x_B}{2}; \frac{y_A + y_B}{2}; \frac{z_A + z_B}{2}\right)$: la media delle coordinate, una alla volta.` },
    { id: 'fc-06', sezione: 'punto-medio-vettori', tipo: 'definizione', fronte: R`Componenti del vettore $\vec{AB}$`, retro: R`$\vec{AB} = B - A = (x_B - x_A; y_B - y_A; z_B - z_A)$. Il suo modulo è la distanza $\overline{AB}$.` },
    { id: 'fc-07', sezione: 'punto-medio-vettori', tipo: 'formula', fronte: R`Prodotto scalare di $\vec u$ e $\vec v$`, retro: R`$\vec u \cdot \vec v = u_x v_x + u_y v_y + u_z v_z$: un numero, non un vettore.` },
    { id: 'fc-08', sezione: 'punto-medio-vettori', tipo: 'concetto', fronte: R`Quando due vettori non nulli sono perpendicolari? E quando paralleli?`, retro: R`Perpendicolari: prodotto scalare uguale a zero. Paralleli: componenti proporzionali, $\vec v = k\,\vec u$.` },
    { id: 'fc-09', sezione: 'piano', tipo: 'formula', fronte: R`Piano per $P_0(x_0; y_0; z_0)$ con vettore normale $(a; b; c)$`, retro: R`$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$` },
    { id: 'fc-10', sezione: 'piano', tipo: 'definizione', fronte: R`Vettore normale del piano $ax + by + cz + d = 0$`, retro: R`$\vec n = (a; b; c)$, i coefficienti di $x$, $y$, $z$. È perpendicolare al piano; $d$ non c'entra.` },
    { id: 'fc-11', sezione: 'piano', tipo: 'concetto', fronte: R`Che cosa rappresenta $x + y - 4 = 0$ nello spazio?`, retro: R`Un piano parallelo all'asse $z$: la $z$ manca, quindi può valere qualunque cosa. Non è una retta.` },
    { id: 'fc-12', sezione: 'piano-tre-punti', tipo: 'procedura', fronte: R`Come si trova il piano per tre punti $A$, $B$, $C$?`, retro: R`Si controlla che non siano allineati. Si cerca $\vec n$ con $\vec n \cdot \vec{AB} = 0$ e $\vec n \cdot \vec{AC} = 0$, poi si scrive il piano per $A$.` },
    { id: 'fc-13', sezione: 'piano-tre-punti', tipo: 'formula', fronte: R`Forma segmentaria del piano`, retro: R`$\frac{x}{p} + \frac{y}{q} + \frac{z}{r} = 1$: il piano taglia gli assi in $(p; 0; 0)$, $(0; q; 0)$, $(0; 0; r)$.` },
    { id: 'fc-14', sezione: 'retta', tipo: 'formula', fronte: R`Equazioni parametriche della retta`, retro: R`$x = x_0 + lt$, $y = y_0 + mt$, $z = z_0 + nt$: passa per $(x_0; y_0; z_0)$ con vettore direzione $(l; m; n)$.` },
    { id: 'fc-15', sezione: 'retta', tipo: 'procedura', fronte: R`Come si passa da una retta data con due piani alle parametriche?`, retro: R`Si chiama $t$ una delle incognite e si ricavano le altre due dal sistema dei due piani.` },
    { id: 'fc-16', sezione: 'retta', tipo: 'concetto', fronte: R`Come si controlla se un punto sta su una retta in forma parametrica?`, retro: R`Si ricava $t$ da una equazione e si prova nelle altre due. Il punto ci sta se lo stesso $t$ va bene per tutte e tre.` },
    { id: 'fc-17', sezione: 'posizioni', tipo: 'definizione', fronte: R`Rette sghembe`, retro: R`Due rette non parallele e senza punti in comune. Nessun piano le contiene entrambe.` },
    { id: 'fc-18', sezione: 'posizioni', tipo: 'concetto', fronte: R`Retta con direzione $\vec v$ e piano con normale $\vec n$: quando sono paralleli? Quando perpendicolari?`, retro: R`Paralleli (o retta contenuta) se $\vec v \cdot \vec n = 0$. Perpendicolari se $\vec v$ e $\vec n$ sono proporzionali.` },
    { id: 'fc-19', sezione: 'posizioni', tipo: 'concetto', fronte: R`Quando due piani sono paralleli? Quando perpendicolari?`, retro: R`Paralleli se i vettori normali sono proporzionali. Perpendicolari se il prodotto scalare delle normali è zero.` },
    { id: 'fc-20', sezione: 'distanze', tipo: 'formula', fronte: R`Distanza di $P(x_0; y_0; z_0)$ dal piano $ax + by + cz + d = 0$`, retro: R`$\frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$` },
    { id: 'fc-21', sezione: 'distanze', tipo: 'procedura', fronte: R`Come si trova la distanza di un punto $P$ da una retta $r$?`, retro: R`Piano per $P$ perpendicolare a $r$; punto $H$ in cui $r$ lo taglia; distanza $\overline{PH}$.` },
    { id: 'fc-22', sezione: 'sfera', tipo: 'formula', fronte: R`Equazione della sfera di centro $C(\alpha; \beta; \gamma)$ e raggio $r$`, retro: R`$(x - \alpha)^2 + (y - \beta)^2 + (z - \gamma)^2 = r^2$` },
    { id: 'fc-23', sezione: 'sfera', tipo: 'formula', fronte: R`Centro e raggio di $x^2 + y^2 + z^2 + ax + by + cz + d = 0$`, retro: R`$C\left(-\frac{a}{2}; -\frac{b}{2}; -\frac{c}{2}\right)$, $r = \sqrt{\frac{a^2 + b^2 + c^2}{4} - d}$, se il radicando è positivo.` },
    { id: 'fc-24', sezione: 'sfera-piano', tipo: 'concetto', fronte: R`Posizione di un piano rispetto a una sfera`, retro: R`Si confronta la distanza $d$ del centro dal piano con il raggio: $d < r$ secante, $d = r$ tangente, $d > r$ esterno.` },
    { id: 'fc-25', sezione: 'sfera-piano', tipo: 'formula', fronte: R`Raggio della circonferenza in cui un piano taglia una sfera`, retro: R`$\rho = \sqrt{r^2 - d^2}$, con $d$ distanza del centro dal piano. Il centro del taglio è la proiezione del centro.` },
    { id: 'fc-26', sezione: 'sfera-piano', tipo: 'procedura', fronte: R`Piano tangente alla sfera di centro $C$ nel punto $P_0$`, retro: R`È il piano per $P_0$ con vettore normale $P_0 - C$: perpendicolare al raggio.` }
  ],
  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola la distanza fra $A(2; -1; 3)$ e $B(4; 3; -1)$.`, suggerimenti: [R`Calcola le tre differenze «arrivo meno partenza», poi Pitagora con tre quadrati.`], risposta: num(6), soluzione: [R`$\Delta x = 2$, $\Delta y = 3 - (-1) = 4$, $\Delta z = -1 - 3 = -4$.`, R`$\overline{AB} = \sqrt{4 + 16 + 16} = \sqrt{36} = 6$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Quanto dista dall'origine il punto $P(2; -1; 2)$?`, suggerimenti: [R`Dall'origine le differenze sono le coordinate stesse.`], risposta: num(3), soluzione: [R`$\overline{OP} = \sqrt{2^2 + (-1)^2 + 2^2} = \sqrt{4 + 1 + 4}$.`, R`$\overline{OP} = \sqrt{9} = 3$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Trova il punto medio di $A(2; 5; -1)$ e $B(4; -1; 3)$. Scrivi le coordinate come $(x; y; z)$.`, suggerimenti: [R`Fai la media delle ascisse, delle ordinate e delle quote.`], risposta: tre(3, 2, 1), soluzione: [R`$\frac{2 + 4}{2} = 3$, $\frac{5 - 1}{2} = 2$, $\frac{-1 + 3}{2} = 1$.`, R`$M(3; 2; 1)$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Trova le componenti del vettore $\vec{AB}$, con $A(1; 2; 3)$ e $B(4; 0; 5)$.`, suggerimenti: [R`$\vec{AB} = B - A$: sottrai coordinata per coordinata, partendo da $B$.`], risposta: tre(3, -2, 2), soluzione: [R`$\vec{AB} = (4 - 1; 0 - 2; 5 - 3)$.`, R`$\vec{AB} = (3; -2; 2)$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Calcola il prodotto scalare di $\vec u = (2; -1; 3)$ e $\vec v = (1; 4; 2)$.`, suggerimenti: [R`Moltiplica le componenti corrispondenti e somma i tre prodotti.`], risposta: num(4, 'un numero'), soluzione: [R`$\vec u \cdot \vec v = 2 \cdot 1 + (-1) \cdot 4 + 3 \cdot 2$.`, R`$= 2 - 4 + 6 = 4$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Per quale valore di $k$ i vettori $(1; k; 2)$ e $(4; 2; -1)$ sono perpendicolari?`, suggerimenti: [R`Perpendicolari vuol dire prodotto scalare uguale a zero.`], risposta: num(-1, 'un numero'), soluzione: [R`Prodotto scalare: $4 + 2k - 2 = 2 + 2k$.`, R`$2 + 2k = 0$ per $k = -1$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Il punto $P(1; 2; 0)$ sta sul piano $2x + y - 3z - 4 = 0$? Scrivi *sì* o *no*.`, suggerimenti: [R`Sostituisci le coordinate di $P$ nel primo membro.`], risposta: SI, soluzione: [R`$2 \cdot 1 + 2 - 3 \cdot 0 - 4 = 0$.`, R`L'equazione è vera: sì, $P$ sta sul piano.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Scrivi l'equazione del piano che passa per $P(1; 0; 2)$ ed è perpendicolare al vettore $\vec n = (3; -1; 1)$.`, suggerimenti: [R`Usa $a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$.`, R`Poi togli le parentesi e somma i numeri.`], risposta: piano(3, -1, 1, -5), soluzione: [R`$3(x - 1) - (y - 0) + (z - 2) = 0$.`, R`$3x - 3 - y + z - 2 = 0$, cioè $3x - y + z - 5 = 0$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`In quale punto il piano $2x + 3y - 4z - 8 = 0$ taglia l'asse $z$?`, suggerimenti: [R`Sull'asse $z$ i punti hanno $x = 0$ e $y = 0$.`], risposta: tre(0, 0, -2), soluzione: [R`Con $x = 0$ e $y = 0$ resta $-4z - 8 = 0$.`, R`$z = -2$: il punto è $(0; 0; -2)$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Scrivi il piano che passa per l'origine ed è parallelo al piano $2x - 5y + z - 3 = 0$.`, suggerimenti: [R`Piani paralleli possono avere lo stesso vettore normale.`, R`Un piano per l'origine ha $d = 0$.`], risposta: piano(2, -5, 1, 0), soluzione: [R`Stesso vettore normale $(2; -5; 1)$, quindi il piano è $2x - 5y + z + d = 0$.`, R`Passa per $O(0; 0; 0)$, quindi $d = 0$: $2x - 5y + z = 0$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`La retta ha equazioni $x = 1 + 2t$, $y = -3 + t$, $z = 4 - t$. Trova il suo punto con $t = 2$.`, suggerimenti: [R`Sostituisci $t = 2$ in tutte e tre le equazioni.`], risposta: tre(5, -1, 2), soluzione: [R`$x = 1 + 4 = 5$, $y = -3 + 2 = -1$, $z = 4 - 2 = 2$.`, R`Il punto è $(5; -1; 2)$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Il punto $Q(4; 7; 0)$ sta sulla retta $x = 1 + t$, $y = 1 + 2t$, $z = 2 - t$? Scrivi *sì* o *no*.`, suggerimenti: [R`Ricava $t$ dalla prima equazione.`, R`Poi controlla se lo stesso $t$ va bene anche per $y$ e per $z$.`], risposta: NO, soluzione: [R`Dalla prima: $4 = 1 + t$, quindi $t = 3$.`, R`Con $t = 3$: $y = 7$, torna; $z = 2 - 3 = -1$, ma $Q$ ha $z = 0$.`, R`Nessun $t$ va bene per tutte e tre: no, $Q$ non sta sulla retta.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Trova il punto in cui la retta $x = t$, $y = 1 + t$, $z = 2t$ incontra il piano $x + y + z - 9 = 0$.`, suggerimenti: [R`Sostituisci le parametriche nell'equazione del piano.`, R`Trovato $t$, rimettilo nelle parametriche.`], risposta: tre(2, 3, 4), soluzione: [R`$t + (1 + t) + 2t - 9 = 0$, cioè $4t - 8 = 0$, quindi $t = 2$.`, R`Il punto è $(2; 3; 4)$. Controllo: $2 + 3 + 4 = 9$.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`I piani $3x - y + 2z - 1 = 0$ e $6x - 2y + 4z + 5 = 0$ sono paralleli, perpendicolari o incidenti?`, suggerimenti: [R`Confronta i vettori normali: sono proporzionali? Il loro prodotto scalare vale zero?`], risposta: parola(['paralleli', 'sono paralleli', 'piani paralleli', 'paralleli e distinti', 'paralleli distinti', 'sono paralleli e distinti'], 'paralleli, perpendicolari o incidenti'), soluzione: [R`Normali $(3; -1; 2)$ e $(6; -2; 4)$: la seconda è il doppio della prima.`, R`I piani sono paralleli. Non coincidono, perché $5 \ne 2 \cdot (-1)$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Per quale $k$ i piani $2x + ky + z - 1 = 0$ e $x - y + 3z = 0$ sono perpendicolari?`, suggerimenti: [R`Due piani sono perpendicolari quando lo sono i loro vettori normali.`], risposta: num(5, 'un numero'), soluzione: [R`Normali $(2; k; 1)$ e $(1; -1; 3)$.`, R`Prodotto scalare: $2 - k + 3 = 5 - k = 0$, quindi $k = 5$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Calcola la distanza di $P(3; 1; 2)$ dal piano $2x - y + 2z + 3 = 0$.`, suggerimenti: [R`Numeratore: le coordinate di $P$ nel primo membro, in valore assoluto.`, R`Denominatore: $\sqrt{a^2 + b^2 + c^2}$.`], risposta: num(4), soluzione: [R`Numeratore: $|6 - 1 + 4 + 3| = 12$.`, R`Denominatore: $\sqrt{4 + 1 + 4} = 3$. La distanza è $\frac{12}{3} = 4$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Trova il centro della sfera $x^2 + y^2 + z^2 - 4x + 6y - 2z - 2 = 0$.`, suggerimenti: [R`Il centro ha per coordinate la metà dei coefficienti di $x$, $y$, $z$, con il segno cambiato.`], risposta: tre(2, -3, 1), soluzione: [R`$a = -4$, $b = 6$, $c = -2$.`, R`$C\left(-\frac{a}{2}; -\frac{b}{2}; -\frac{c}{2}\right) = (2; -3; 1)$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Trova il raggio della sfera $x^2 + y^2 + z^2 + 2x - 8z - 8 = 0$.`, suggerimenti: [R`Prima il centro, poi $r^2$ = somma dei quadrati delle coordinate del centro, meno $d$.`], risposta: num(5), soluzione: [R`Centro $(-1; 0; 4)$.`, R`$r^2 = 1 + 0 + 16 - (-8) = 25$, quindi $r = 5$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Il piano $2x + 2y - z + 5 = 0$ e la sfera $(x - 1)^2 + y^2 + (z + 2)^2 = 9$: il piano è secante, tangente o esterno?`, suggerimenti: [R`Calcola la distanza del centro dal piano.`, R`Confrontala con il raggio $3$.`], risposta: parola(['tangente', 'è tangente', 'e tangente', 'il piano è tangente', 'piano tangente'], 'secante, tangente o esterno'), soluzione: [R`Centro $(1; 0; -2)$, raggio $3$.`, R`$d = \frac{|2 + 0 + 2 + 5|}{\sqrt{4 + 4 + 1}} = \frac{9}{3} = 3$.`, R`$d = r$: il piano è tangente.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Il piano $2x + y + 2z - 18 = 0$ taglia la sfera $x^2 + y^2 + z^2 = 100$ lungo una circonferenza. Trova il suo raggio.`, suggerimenti: [R`Calcola la distanza $d$ del centro $O$ dal piano.`, R`Poi $\rho = \sqrt{r^2 - d^2}$.`], risposta: num(8), soluzione: [R`$d = \frac{|-18|}{\sqrt{4 + 1 + 4}} = \frac{18}{3} = 6$.`, R`$\rho = \sqrt{100 - 36} = \sqrt{64} = 8$.`] },

    { id: 'es-01', difficolta: 2, testo: R`Verifica che il triangolo di vertici $A(1; 1; 0)$, $B(3; 2; 2)$, $C(-1; 3; 1)$ è rettangolo in $A$, e calcola la sua area.`, suggerimenti: [R`L'angolo in $A$ è retto se $\vec{AB} \cdot \vec{AC} = 0$.`, R`In un triangolo rettangolo l'area è il semiprodotto dei cateti.`], risposta: num(4.5, 'un numero'), soluzione: [R`$\vec{AB} = (2; 1; 2)$, $\vec{AC} = (-2; 2; 1)$.`, R`$\vec{AB} \cdot \vec{AC} = -4 + 2 + 2 = 0$: l'angolo in $A$ è retto.`, R`I cateti misurano $\sqrt{4 + 1 + 4} = 3$ e $\sqrt{4 + 4 + 1} = 3$.`, R`Area $= \frac{3 \cdot 3}{2} = \frac{9}{2}$. Controllo con Pitagora: $\overline{BC}^2 = 16 + 1 + 1 = 18 = 9 + 9$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Scrivi l'equazione del piano che passa per $A(2; 0; 0)$, $B(0; 3; 0)$ e $C(0; 0; 6)$.`, suggerimenti: [R`I tre punti stanno sugli assi: usa la forma segmentaria.`, R`Poi moltiplica per $6$ per togliere i denominatori.`], risposta: piano(3, 2, 1, -6), soluzione: [R`Forma segmentaria: $\frac{x}{2} + \frac{y}{3} + \frac{z}{6} = 1$.`, R`Moltiplico per $6$: $3x + 2y + z = 6$, cioè $3x + 2y + z - 6 = 0$.`, R`Controllo: $A$ dà $6 - 6 = 0$, $B$ dà $6 - 6 = 0$, $C$ dà $6 - 6 = 0$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Scrivi il piano per $P(1; -1; 2)$ parallelo a $\pi: 2x - y + 3z + 5 = 0$. Poi calcola la distanza fra i due piani.`, suggerimenti: [R`Il piano cercato ha lo stesso vettore normale di $\pi$.`, R`La distanza fra due piani paralleli è la distanza di un punto dell'uno dall'altro: usa $P$.`], risposta: num(Math.sqrt(14)), soluzione: [R`Piano: $2(x - 1) - (y + 1) + 3(z - 2) = 0$, cioè $2x - y + 3z - 9 = 0$.`, R`Distanza di $P$ da $\pi$: $\frac{|2 + 1 + 6 + 5|}{\sqrt{4 + 1 + 9}} = \frac{14}{\sqrt{14}}$.`, R`$\frac{14}{\sqrt{14}} = \sqrt{14} \approx 3{,}74$.`] },
    { id: 'es-04', difficolta: 2, testo: R`La retta $r$ è l'intersezione dei piani $x + y + z - 3 = 0$ e $x - y + z - 1 = 0$. Scrivila in forma parametrica e trova il punto in cui taglia il piano $xy$.`, suggerimenti: [R`Sommando e sottraendo le due equazioni trovi $x + z$ e $y$.`, R`Il piano $xy$ ha equazione $z = 0$.`], risposta: tre(2, 1, 0), soluzione: [R`Sommo: $2x + 2z - 4 = 0$, cioè $x = 2 - z$. Sottraggo: $2y - 2 = 0$, cioè $y = 1$.`, R`Con $z = t$: $x = 2 - t$, $y = 1$, $z = t$. Vettore direzione $(-1; 0; 1)$.`, R`Nel piano $xy$ vale $z = 0$, quindi $t = 0$: il punto è $(2; 1; 0)$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Per quale valore di $k$ la retta $x = 1 + 2t$, $y = -t$, $z = 3 + kt$ è parallela al piano $x + 4y + 2z - 1 = 0$? In quel caso, la retta sta sul piano?`, suggerimenti: [R`Retta parallela al piano: direzione perpendicolare al vettore normale.`, R`Per l'ultima domanda prova il punto della retta con $t = 0$.`], risposta: num(1, 'un numero'), soluzione: [R`Direzione $(2; -1; k)$, normale $(1; 4; 2)$.`, R`$\vec v \cdot \vec n = 2 - 4 + 2k = 0$ per $k = 1$.`, R`Il punto $(1; 0; 3)$ dà $1 + 0 + 6 - 1 = 6 \ne 0$: la retta è parallela al piano, ma non ci sta sopra.`] },
    { id: 'es-06', difficolta: 2, testo: R`Le rette $r: x = 1 + t,\ y = 2t,\ z = 3$ e $s: x = 2 + t',\ y = 1 - t',\ z = t'$ sono parallele, incidenti o sghembe?`, suggerimenti: [R`Confronta prima i vettori direzione.`, R`Poi metti a sistema le parametriche, con due parametri diversi.`], risposta: parola(['sghembe', 'sono sghembe', 'rette sghembe', 'le rette sono sghembe'], 'parallele, incidenti o sghembe'), soluzione: [R`Direzioni $(1; 2; 0)$ e $(1; -1; 1)$: non proporzionali, quindi non parallele.`, R`Sistema: $1 + t = 2 + t'$, $2t = 1 - t'$, $3 = t'$.`, R`Dalla terza $t' = 3$, dalla prima $t = 4$. La seconda diventa $8 = -2$: falso.`, R`Nessun punto comune e direzioni diverse: le rette sono sghembe.`] },
    { id: 'es-07', difficolta: 2, testo: R`Trova il simmetrico di $P(2; -2; 3)$ rispetto al piano $x - 2y + 2z - 3 = 0$.`, suggerimenti: [R`Prima trova la proiezione $H$ di $P$ sul piano, lungo la retta $P + t\,\vec n$.`, R`$H$ è il punto medio fra $P$ e il simmetrico $P'$: quindi $P' = 2H - P$.`], risposta: tre(0, 2, -1), soluzione: [R`Retta per $P$ perpendicolare al piano: $x = 2 + t$, $y = -2 - 2t$, $z = 3 + 2t$.`, R`Nel piano: $(2 + t) - 2(-2 - 2t) + 2(3 + 2t) - 3 = 9 + 9t = 0$, quindi $t = -1$ e $H(1; 0; 1)$.`, R`$P' = 2H - P = (2 - 2; 0 + 2; 2 - 3) = (0; 2; -1)$.`, R`Controllo: $P'$ si ottiene con $t = -2$, il doppio della strada da $P$ a $H$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Scrivi la sfera di centro $C(1; 2; -1)$ tangente al piano $2x + y + 2z + 7 = 0$, e trova il punto di tangenza.`, suggerimenti: [R`Il raggio è la distanza del centro dal piano.`, R`Il punto di tangenza è la proiezione di $C$ sul piano: cerca $t$ in $C + t\,\vec n$.`], risposta: tre(-1, 1, -3), soluzione: [R`$r = \frac{|2 + 2 - 2 + 7|}{\sqrt{4 + 1 + 4}} = \frac{9}{3} = 3$.`, R`Sfera: $(x - 1)^2 + (y - 2)^2 + (z + 1)^2 = 9$.`, R`$C + t\,\vec n = (1 + 2t; 2 + t; -1 + 2t)$; nel piano: $9 + 9t = 0$, quindi $t = -1$.`, R`Punto di tangenza: $(-1; 1; -3)$. Controllo: $-2 + 1 - 6 + 7 = 0$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Verifica che $P_0(3; 4; 1)$ sta sulla sfera $x^2 + y^2 + z^2 - 2x - 4y - 4 = 0$ e scrivi il piano tangente in $P_0$.`, suggerimenti: [R`Trova il centro $C$ della sfera.`, R`Il vettore normale del piano tangente è $P_0 - C$.`], risposta: piano(2, 2, 1, -15), soluzione: [R`$9 + 16 + 1 - 6 - 16 - 4 = 0$: $P_0$ sta sulla sfera.`, R`Centro $C(1; 2; 0)$, raggio $\sqrt{1 + 4 + 4} = 3$.`, R`Vettore normale $P_0 - C = (2; 2; 1)$, di modulo $3$: è proprio un raggio.`, R`Piano: $2(x - 3) + 2(y - 4) + (z - 1) = 0$, cioè $2x + 2y + z - 15 = 0$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Calcola la distanza di $P(9; 1; 0)$ dalla retta $r: x = 1 + 2t,\ y = -1 + 2t,\ z = 2 + t$.`, suggerimenti: [R`Scrivi il piano per $P$ perpendicolare a $r$: il suo vettore normale è la direzione di $r$.`, R`Trova il punto $H$ in cui $r$ taglia quel piano, poi calcola $\overline{PH}$.`], risposta: num(6), soluzione: [R`Piano per $P$ con normale $(2; 2; 1)$: $2(x - 9) + 2(y - 1) + z = 0$, cioè $2x + 2y + z - 20 = 0$.`, R`Sostituisco $r$: $2(1 + 2t) + 2(-1 + 2t) + (2 + t) - 20 = 9t - 18 = 0$, quindi $t = 2$.`, R`$H(5; 3; 4)$ e $\vec{HP} = (4; -2; -4)$.`, R`$\overline{PH} = \sqrt{16 + 4 + 16} = 6$. Controllo: $(4; -2; -4) \cdot (2; 2; 1) = 0$.`] },
    { id: 'es-11', difficolta: 3, testo: R`*Nello stile della seconda prova.* Nel riferimento $Oxyz$ sono dati i punti $A(4; 0; 0)$, $B(0; 4; 0)$ e $C(0; 0; 2)$.

1. Scrivi l'equazione del piano $\pi$ che passa per $A$, $B$ e $C$.
2. Calcola la distanza dell'origine $O$ da $\pi$.
3. Calcola il volume del tetraedro $OABC$ e, da questo, l'area del triangolo $ABC$.
4. Scrivi la sfera di centro $O$ tangente a $\pi$ e trova il punto di tangenza.

Scrivi l'area del triangolo $ABC$.`, suggerimenti: [R`Per il piano usa la forma segmentaria.`, R`Il tetraedro ha per base il triangolo rettangolo $OAB$ e altezza $\overline{OC}$. Ma ha anche base $ABC$ e altezza $d(O, \pi)$.`, R`Uguaglia le due espressioni del volume: $\frac{1}{3} \cdot \text{area}(ABC) \cdot d(O, \pi) = V$.`], risposta: num(4 * Math.sqrt(6)), soluzione: [R`**1.** $\frac{x}{4} + \frac{y}{4} + \frac{z}{2} = 1$, cioè $x + y + 2z - 4 = 0$.`, R`**2.** $d(O, \pi) = \frac{|-4|}{\sqrt{1 + 1 + 4}} = \frac{4}{\sqrt{6}} = \frac{2\sqrt{6}}{3} \approx 1{,}63$.`, R`**3.** Con base $OAB$: $V = \frac{1}{3} \cdot \frac{4 \cdot 4}{2} \cdot 2 = \frac{16}{3}$. Con base $ABC$: $V = \frac{1}{3} \cdot \text{area}(ABC) \cdot \frac{4}{\sqrt{6}}$. Quindi $\text{area}(ABC) = \frac{3V}{d} = \frac{16}{4/\sqrt{6}} = 4\sqrt{6} \approx 9{,}80$.`, R`**4.** Il raggio è $\frac{4}{\sqrt{6}}$, quindi $r^2 = \frac{16}{6} = \frac{8}{3}$: la sfera è $x^2 + y^2 + z^2 = \frac{8}{3}$.`, R`Il punto di tangenza sta sulla retta $x = t$, $y = t$, $z = 2t$. Nel piano: $6t - 4 = 0$, $t = \frac{2}{3}$, e il punto è $\left(\frac{2}{3}; \frac{2}{3}; \frac{4}{3}\right)$.`, R`Controllo: $\frac{4}{9} + \frac{4}{9} + \frac{16}{9} = \frac{24}{9} = \frac{8}{3}$, cioè $r^2$.`] },
    { id: 'es-12', difficolta: 3, testo: R`*Nello stile della seconda prova.* Sono dati la sfera $S: x^2 + y^2 + z^2 - 4x + 2y - 4z = 0$ e, al variare di $k \in \mathbb{R}$, il piano $\pi_k: x + 2y + 2z + k = 0$.

1. Trova centro e raggio di $S$, e verifica che $S$ passa per l'origine.
2. Per quali valori di $k$ il piano $\pi_k$ è tangente a $S$? Trova i punti di tangenza.
3. Per quali valori di $k$ il piano $\pi_k$ taglia $S$ lungo una circonferenza di raggio $\sqrt{5}$?

Scrivi i valori di $k$ del punto 2.`, suggerimenti: [R`La distanza del centro da $\pi_k$ dipende da $k$: scrivila con il valore assoluto.`, R`Tangente: distanza uguale al raggio. Due soluzioni, una per lato.`, R`Per il punto 3: $\rho^2 = r^2 - d^2$, quindi $d^2 = 9 - 5$.`], risposta: xs(5, -13), soluzione: [R`**1.** $C(2; -1; 2)$, $r^2 = 4 + 1 + 4 - 0 = 9$, $r = 3$. Manca il termine noto, quindi $O(0; 0; 0)$ rende vera l'equazione.`, R`**2.** $d(C, \pi_k) = \frac{|2 - 2 + 4 + k|}{3} = \frac{|4 + k|}{3}$. Tangente se $|4 + k| = 9$: $k = 5$ oppure $k = -13$.`, R`I punti di tangenza sono $C + t\,(1; 2; 2)$ con $t = -\frac{4 + k}{9}$. Per $k = 5$: $t = -1$ e $T_1(1; -3; 0)$. Per $k = -13$: $t = 1$ e $T_2(3; 1; 4)$.`, R`Controllo: $T_1$ su $S$: $1 + 9 + 0 - 4 - 6 - 0 = 0$; $T_2$ su $S$: $9 + 1 + 16 - 12 + 2 - 16 = 0$.`, R`**3.** $\rho = \sqrt{5}$ vuol dire $d^2 = 9 - 5 = 4$, cioè $d = 2$: $|4 + k| = 6$, quindi $k = 2$ oppure $k = -10$.`] }
  ],
  quiz: [
    { id: 'q-01', domanda: R`Dove si trova il punto $(0; 3; 0)$?`, opzioni: [R`sull'asse $y$`, R`nel piano $xz$`, R`sull'asse $x$`, R`fuori da tutti i piani coordinati`], corretta: 0, spiegazione: R`Due coordinate su tre sono nulle, $x = 0$ e $z = 0$: il punto sta sull'asse $y$. Nel piano $xz$ servirebbe $y = 0$, e qui $y = 3$.` },
    { id: 'q-02', domanda: R`Nello spazio, che cosa rappresenta l'equazione $z = 0$?`, opzioni: [R`l'asse $z$`, R`l'asse $x$`, R`il piano $xy$`, R`l'origine`], corretta: 2, spiegazione: R`I punti con quota nulla sono tutti quelli del pavimento, cioè del piano $xy$, con $x$ e $y$ qualunque. L'asse $z$ è invece fatto dai punti con $x = 0$ e $y = 0$.` },
    { id: 'q-03', domanda: R`Nello spazio, l'equazione $x + y - 4 = 0$ rappresenta…`, opzioni: [R`una retta del piano $xy$`, R`un piano parallelo all'asse $z$`, R`un piano parallelo al piano $xy$`, R`un piano che passa per l'origine`], corretta: 1, spiegazione: R`Nello spazio un'equazione di primo grado è un piano. La $z$ manca, quindi può valere qualunque cosa: il piano contiene tutte le verticali per i punti della retta $x + y = 4$ del pavimento. Non passa per l'origine, perché $0 + 0 - 4 \ne 0$.` },
    { id: 'q-04', domanda: R`Due vettori non nulli dello spazio sono perpendicolari quando…`, opzioni: [R`hanno le componenti proporzionali`, R`hanno lo stesso modulo`, R`il prodotto delle prime componenti vale $-1$`, R`il loro prodotto scalare vale $0$`], corretta: 3, spiegazione: R`La condizione è $u_x v_x + u_y v_y + u_z v_z = 0$. Le componenti proporzionali indicano vettori paralleli. La regola del $-1$ vale per i coefficienti angolari delle rette nel piano, non qui.` },
    { id: 'q-05', domanda: R`Qual è un vettore normale al piano $3x - 2z + 1 = 0$?`, opzioni: [R`$(3; 0; -2)$`, R`$(3; -2; 1)$`, R`$(3; -2; 0)$`, R`$(0; 3; -2)$`], corretta: 0, spiegazione: R`Le componenti sono i coefficienti di $x$, $y$ e $z$. La $y$ manca, quindi il suo coefficiente è $0$: $(3; 0; -2)$. Il termine noto $1$ non fa parte del vettore normale.` },
    { id: 'q-06', domanda: R`Qual è il vettore direzione della retta $x = 2 + t$, $y = -1$, $z = 3t$?`, opzioni: [R`$(2; -1; 0)$`, R`$(1; -1; 3)$`, R`$(1; 0; 3)$`, R`$(2; -1; 3)$`], corretta: 2, spiegazione: R`Sono i coefficienti di $t$: $1$, $0$ e $3$. In $y = -1$ la $t$ non compare, quindi il coefficiente è zero. $(2; -1; 0)$ è il punto della retta con $t = 0$.` },
    { id: 'q-07', domanda: R`Due rette dello spazio non hanno punti in comune. Allora…`, opzioni: [R`sono sicuramente parallele`, R`sono parallele oppure sghembe`, R`sono sicuramente sghembe`, R`sono perpendicolari`], corretta: 1, spiegazione: R`Nel piano due rette senza punti comuni sono parallele. Nello spazio possono anche essere sghembe: direzioni diverse, e nessun piano che le contenga tutte e due.` },
    { id: 'q-08', domanda: R`Una retta ha direzione $\vec v$ e un piano ha vettore normale $\vec n$, con $\vec v \cdot \vec n = 0$. Allora la retta…`, opzioni: [R`è perpendicolare al piano, come $\vec n$`, R`taglia il piano in un solo punto`, R`ha la stessa direzione di $\vec n$`, R`è parallela al piano o sta sul piano`], corretta: 3, spiegazione: R`$\vec v$ è perpendicolare alla normale, quindi la retta corre parallela al piano. Se un suo punto sta sul piano, ci sta tutta. Per essere perpendicolare al piano, $\vec v$ dovrebbe essere proporzionale a $\vec n$.` },
    { id: 'q-09', domanda: R`Una retta è perpendicolare a un piano quando…`, opzioni: [R`il suo vettore direzione è proporzionale al vettore normale del piano`, R`il suo vettore direzione ha prodotto scalare nullo con il vettore normale`, R`il prodotto scalare fra direzione e normale vale $1$`, R`la retta passa per l'origine`], corretta: 0, spiegazione: R`La normale è la direzione perpendicolare al piano: una retta perpendicolare al piano ha la stessa direzione. Il prodotto scalare nullo dice invece che la retta è parallela al piano.` },
    { id: 'q-10', domanda: R`Due piani sono perpendicolari quando…`, opzioni: [R`i loro vettori normali sono proporzionali`, R`hanno lo stesso termine noto`, R`il prodotto scalare dei vettori normali vale $0$`, R`il prodotto dei coefficienti di $x$ vale $-1$`], corretta: 2, spiegazione: R`Due piani formano lo stesso angolo delle loro normali. Normali perpendicolari, cioè con prodotto scalare nullo, danno piani perpendicolari. Normali proporzionali danno piani paralleli.` },
    { id: 'q-11', domanda: R`Nella formula della distanza di un punto dal piano $ax + by + cz + d = 0$, il denominatore è…`, opzioni: [R`$\sqrt{a^2 + b^2 + c^2 + d^2}$`, R`$\sqrt{a^2 + b^2 + c^2}$`, R`$|a + b + c|$`, R`$\sqrt{a^2 + b^2}$`], corretta: 1, spiegazione: R`Al denominatore c'è il modulo del vettore normale $(a; b; c)$. Il termine noto $d$ sposta il piano ma non cambia la sua normale, quindi non ci va. Senza $c^2$ è la formula del piano cartesiano.` },
    { id: 'q-12', domanda: R`Che cosa rappresenta l'equazione $x^2 + y^2 + z^2 - 4y + 6 = 0$?`, opzioni: [R`la sfera di centro $(0; 2; 0)$ e raggio $\sqrt{6}$`, R`la sfera di centro $(0; -2; 0)$ e raggio $\sqrt{2}$`, R`il solo punto $(0; 2; 0)$`, R`nessun punto`], corretta: 3, spiegazione: R`Il centro sarebbe $(0; 2; 0)$, ma $r^2 = 4 - 6 = -2$. Completando il quadrato viene $x^2 + (y - 2)^2 + z^2 = -2$: impossibile. Il solo punto si avrebbe con $r^2 = 0$.` },
    { id: 'q-13', domanda: R`Un piano dista $d$ dal centro di una sfera di raggio $r$, con $d < r$. Il taglio è una circonferenza di raggio…`, opzioni: [R`$\sqrt{r^2 - d^2}$`, R`$r - d$`, R`$r$`, R`$\sqrt{r^2 + d^2}$`], corretta: 0, spiegazione: R`Il centro della sfera, il centro del taglio e un punto del taglio formano un triangolo rettangolo. L'ipotenusa è $r$, un cateto è $d$: l'altro è $\sqrt{r^2 - d^2}$. Il raggio vale $r$ solo se il piano passa per il centro.` },
    { id: 'q-14', domanda: R`Il piano tangente a una sfera di centro $C$ nel punto $P_0$…`, opzioni: [R`passa per il centro $C$`, R`è parallelo al raggio $CP_0$`, R`è perpendicolare al raggio $CP_0$`, R`è sempre perpendicolare a $\vec{OP_0}$`], corretta: 2, spiegazione: R`Come la tangente alla circonferenza, il piano tangente è perpendicolare al raggio nel punto di contatto: il suo vettore normale è $P_0 - C$. Coincide con $\vec{OP_0}$ solo se il centro è l'origine.` },
    { id: 'q-15', domanda: R`Quanti piani passano per tre punti allineati?`, opzioni: [R`uno solo`, R`nessuno`, R`tre`, R`infiniti`], corretta: 3, spiegazione: R`Tre punti allineati stanno su una retta, e per una retta passano infiniti piani: girano intorno a lei come le pagine di un libro. Un solo piano c'è quando i punti non sono allineati.` },
    { id: 'q-16', domanda: R`Il sistema formato dalle equazioni di due piani rappresenta una retta quando…`, opzioni: [R`sempre`, R`i vettori normali non sono proporzionali`, R`i termini noti sono diversi`, R`i vettori normali sono perpendicolari`], corretta: 1, spiegazione: R`Se le normali non sono proporzionali i piani si tagliano, e la loro intersezione è una retta. Con normali proporzionali i piani sono paralleli, e non c'è nessun punto comune, oppure coincidono. Le normali perpendicolari sono solo un caso particolare.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Nello spazio quasi tutto si decide con due vettori: il vettore normale dei piani e il vettore direzione delle rette. Scrivili per primi, prima di fare qualunque conto.` },
    { tipo: 'trucco', testo: R`Il vettore normale di un piano si legge senza conti: sono i coefficienti di $x$, $y$ e $z$. Se una variabile manca, il suo coefficiente è zero.` },
    { tipo: 'errore', testo: R`Nello spazio $x + y = 4$ non è una retta ma un piano: la variabile che manca è libera. Una retta ha bisogno di due equazioni, oppure delle parametriche.` },
    { tipo: 'errore', testo: R`Retta perpendicolare al piano: $\vec v$ proporzionale a $\vec n$. Retta parallela al piano: $\vec v \cdot \vec n = 0$. Le due condizioni si scambiano facilmente.` },
    { tipo: 'errore', testo: R`Per mettere a sistema due rette usa due parametri diversi, $t$ e $t'$. Con la stessa lettera cercheresti un punto dove i due «camminatori» arrivano nello stesso istante.` },
    { tipo: 'trucco', testo: R`Un punto trovato si controlla subito: deve rendere vere le equazioni di tutte le figure su cui sta. Bastano pochi secondi.` },
    { tipo: 'metodo', testo: R`Per proiettare un punto $P$ su un piano, scendi lungo la normale: metti $P + t\,\vec n$ nell'equazione del piano e trova $t$. Così trovi anche simmetrici e punti di tangenza.` },
    { tipo: 'errore', testo: R`Il raggio della circonferenza in cui un piano taglia una sfera è $\sqrt{r^2 - d^2}$, non $r - d$: serve Pitagora.` },
    { tipo: 'trucco', testo: R`Quasi tutte le formule sono quelle del piano cartesiano con un termine in più: distanza, punto medio, distanza da un piano, sfera. Se le ricordi nel piano, le ricordi anche qui.` }
  ],

  aneddoti: [
    { matematico: 'Alexis Clairaut', anni: '1713–1765', titolo: 'A diciotto anni, le curve nello spazio', testo: R`Alexis Clairaut crebbe a Parigi, figlio di un insegnante di matematica che lo istruì in casa. Nel 1731, a diciotto anni, pubblicò le *Recherches sur les courbes à double courbure*. Era uno dei primi studi sistematici delle curve che non stanno in un piano, descritte con tre coordinate. L'idea era guardare la curva da due lati: la sua ombra su due piani coordinati dà due equazioni, e le due equazioni insieme fissano la curva. Lo stesso anno l'Accademia delle scienze lo accolse fra i suoi membri, anche se non aveva ancora l'età prevista dal regolamento. Pochi anni dopo partì per la Lapponia, nella spedizione del 1736–1737 che misurò un grado di meridiano. Le misure confermarono che la Terra è schiacciata ai poli.`, legame: R`Clairaut descriveva una curva dello spazio con due equazioni insieme: è la stessa idea della retta come intersezione di due piani.` },
    { matematico: 'Gaspard Monge', anni: '1746–1818', titolo: 'La geometria tenuta segreta', testo: R`Gaspard Monge era figlio di un venditore ambulante di Beaune. Da giovane lavorò come disegnatore nella scuola militare del genio di Mézières. Lì gli chiesero di progettare una fortificazione riparata dai tiri nemici: un lavoro di calcoli lunghissimi. Monge lo risolse in fretta con un metodo grafico nuovo, che rappresentava i solidi con due proiezioni su due piani perpendicolari. Il metodo, la **geometria descrittiva**, fu considerato utile all'esercito e per anni non si poté insegnare fuori dalla scuola. Monge lo spiegò in pubblico solo nel 1795, all'École normale di Parigi, dopo la Rivoluzione. Fu anche fra i fondatori dell'École polytechnique, dove insegnò a usare le coordinate per studiare piani, rette e superfici.`, legame: R`Monge insegnò a passare dal solido alle sue proiezioni e dalle figure alle equazioni: i due modi di guardare lo spazio di questo argomento.` },
    { matematico: 'Hermann Grassmann', anni: '1809–1877', titolo: 'Il libro che nessuno lesse', testo: R`Hermann Grassmann insegnava in un liceo di Stettino, in Prussia. Nel 1844 pubblicò la *Lineale Ausdehnungslehre*, la teoria dell'estensione lineare. Dentro c'erano idee che oggi sono la base del calcolo con i vettori: sommarli, moltiplicarli per un numero, lavorare in quante dimensioni si vuole. Il libro era scritto in modo astratto e quasi nessuno lo lesse. Anche i matematici famosi a cui lo mandò lo trovarono troppo difficile. Negli anni seguenti sviluppò queste idee: in un lavoro del 1847 e nella nuova versione del libro, del 1862, compare un prodotto fra vettori che chiamò prodotto interno. È l'antenato del nostro prodotto scalare. Anche la versione del 1862 ebbe pochi lettori. Deluso, si dedicò allo studio del sanscrito: tradusse il *Rig Veda* e ne compilò un dizionario. Fu per questi studi che ricevette una laurea ad honorem.`, legame: R`Il prodotto scalare $u_x v_x + u_y v_y + u_z v_z$, che decide tutte le perpendicolarità di questo argomento, discende dal prodotto interno di Grassmann.` },
    { matematico: 'Josiah Willard Gibbs', anni: '1839–1903', titolo: 'Gli appunti stampati per gli studenti', testo: R`Josiah Willard Gibbs passò quasi tutta la vita a Yale, negli Stati Uniti. Nel 1863 vi ottenne il primo dottorato in ingegneria del paese. Insegnava fisica, e per i suoi studenti voleva uno strumento più semplice dei quaternioni, allora di moda per descrivere lo spazio. Fra il 1881 e il 1884 fece stampare a sue spese un opuscolo, *Elements of Vector Analysis*, e lo distribuì a studenti e colleghi. Lì compaiono il puntino del prodotto scalare e la crocetta del prodotto vettoriale, come li scriviamo ancora oggi. Negli stessi anni l'inglese Oliver Heaviside arrivò per conto suo a un calcolo molto simile. Nel 1901 un allievo di Gibbs, Edwin Bidwell Wilson, trasformò le sue lezioni in un libro, *Vector Analysis*.`, legame: R`La scrittura $\vec u \cdot \vec v$ che usi per perpendicolarità, piani e distanze viene dagli appunti di Gibbs.` }
  ]
});
})();
