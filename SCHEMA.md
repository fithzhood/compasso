# Compasso — schema di un argomento

Ogni argomento è **un solo file JS** in `argomenti/<id>.js`, che si registra così:

```js
(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'equazioni-secondo-grado',       // = nome del file senza .js, = id nell'indice
  titolo: 'Equazioni di secondo grado',
  introduzione: R`...markdown...`,
  sezioni: [ { id: 'forma-normale', titolo: '...', testo: R`...markdown...` }, ... ],
  grafici: { parabola: { tipo: 'piano', ... } },
  esempi: [ { titolo: '...', problema: R`...`, passi: [R`...`, R`...`], risultato: R`...` } ],
  formulario: [ { nome: '...', formula: R`\frac{-b \pm \sqrt{\Delta}}{2a}`, nota: R`...` } ],
  flashcards: [ { id: 'fc-01', sezione: 'forma-normale', tipo: 'definizione', fronte: R`...`, retro: R`...` } ],
  esercizi: [ { id: 'es-01', difficolta: 1, testo: R`...`, suggerimenti: [R`...`, R`...`],
                risposta: { tipo: 'numeri', valori: [-1, 3] }, soluzione: [R`...`, R`...`] } ],
  quiz: [ { id: 'q-01', domanda: R`...`, opzioni: [R`...`, R`...`, R`...`, R`...`], corretta: 2, spiegazione: R`...` } ],
  suggerimenti: [ { tipo: 'errore', testo: R`...` }, { tipo: 'trucco', testo: R`...` } ],
  aneddoti: [ { matematico: 'Girolamo Cardano', anni: '1501–1576', titolo: '...', testo: R`...`, legame: R`...` } ]
});
})();
```

**Tutti i testi vanno in `R\`...\`` (String.raw)**, così le barre rovesciate di LaTeX
restano intatte (`\frac`, `\sqrt`...). Dentro un `R\`...\`` **non** si possono usare
il backtick `` ` `` e la sequenza `${`. Le stringhe brevi senza LaTeX (titoli, nomi)
possono stare fra apici normali.

Verifica del file, da eseguire finché non dice `OK`:

```
node strumenti/verifica-argomento.js argomenti/<id>.js
```

---

## 1. Il mini-markdown dei testi

Vale per: `introduzione`, `sezioni[].testo`, `esempi[].problema/passi/risultato`,
`formulario[].nota`, `flashcards[].fronte/retro`, `esercizi[].testo/suggerimenti/soluzione`,
`quiz[].domanda/opzioni/spiegazione`, `suggerimenti[].testo`, `aneddoti[].testo/legame`.

- Paragrafi separati da una riga vuota.
- `**grassetto**`, `*corsivo*`, `` `codice` `` (raro).
- Elenchi: righe che iniziano con `- ` (puntato) o `1. ` (numerato).
- `### Titoletto` per un sottotitolo dentro una sezione (usare con parsimonia).
- Riquadri, una riga che inizia con:
  - `> ` → **nota** (un'osservazione)
  - `>! ` → **attenzione** (errore comune, trappola)
  - `>* ` → **idea chiave** (la cosa da ricordare)
- Tabelle in stile markdown:
  ```
  | x | f(x) |
  |---|------|
  | 0 | 1 |
  ```
- Un grafico: `[[grafico:nomeDelGrafico]]` **da solo su una riga**; il nome deve
  esistere in `grafici`.
- Matematica: `$...$` in linea, `$$...$$` in mostra (su righe proprie). Motore KaTeX:
  funzionano `\frac`, `\sqrt[n]{}`, `\cdot`, `\le \ge \ne \pm \mp`, `\infty`,
  `\lim_{x \to 0}`, `\int_a^b`, `\sum_{k=1}^n`, `\begin{cases} ... \\ ... \end{cases}`,
  `\text{...}`, `\mathbb{R}`, `\overline{AB}`, `\widehat{A}`, `\vec{v}`, `\Delta`,
  `\alpha \beta \gamma \pi \theta`, `\sin \cos \tan \log \ln`, `\left( \right)`,
  `\begin{pmatrix}`, `\binom{n}{k}`.
  **Non** usare `\( \)`, `\[ \]`, `\begin{align}`, `\begin{equation}`, `\textbf` dentro
  testo fuori dalla matematica, comandi che KaTeX non conosce.
- Il testo normale è italiano corretto: si scrive `x²` solo dentro `$x^2$`, mai con
  caratteri Unicode in apice fuori dalla matematica. I nomi delle funzioni vanno in
  matematica (`$f(x)$`, non f(x)).

## 2. I campi

### `introduzione` (markdown, 2–3 paragrafi)
Che cos'è l'argomento, **a cosa serve e dove si incontra** (un esempio concreto, anche
fuori dalla matematica), cosa bisogna già sapere. Tono: chiaro, diretto, da
insegnante che spiega a voce. Niente saluti, niente «in questo modulo».

### `sezioni` (5–9 voci) — la teoria
Ogni sezione copre **un** concetto, 150–400 parole, con la definizione in un
riquadro `>* `, almeno un esempio svolto nel testo, e gli errori tipici in `>! `.
Un grafico ovunque aiuti davvero (una funzione, un intervallo sulla retta reale, una
figura): meglio un grafico buono che tre decorativi. `id` in kebab-case, unico
nell'argomento; le flashcard lo citano.

### `grafici` (oggetto: nome → specifica)
Vedi §3. Ogni grafico va citato almeno una volta con `[[grafico:nome]]`.

### `esempi` (4–6) — esercizi svolti passo passo
`problema` (markdown), `passi` (array: un passaggio per elemento, ognuno con il
**perché**, non solo il calcolo), `risultato` (una riga). Dal facile al difficile.

### `formulario` (6–14)
`nome`, `formula` (**solo LaTeX, senza `$`**: viene mostrata in modalità display),
`nota` opzionale (quando si usa, condizioni).

### `flashcards` (16–26)
`fronte` è una domanda o un termine, `retro` la risposta **breve e precisa** (1–3
righe, niente digressioni). `sezione` = id della sezione a cui appartiene.
`tipo` ∈ `definizione | formula | procedura | concetto`. `id` = `fc-01`, `fc-02`...
L'utente sceglie quali carte studiare, quindi ogni carta deve reggersi da sola.

### `esercizi` (8–12) — da fare da soli
- `difficolta`: 1 (applicazione diretta), 2 (serve un'idea), 3 (impegnativo).
- `suggerimenti`: 1–3 indizi **progressivi** (il primo generico, l'ultimo quasi la
  strada). Li dà la mascotte, uno alla volta.
- `risposta` (opzionale, ma mettila in **almeno metà** degli esercizi):
  - `{ tipo: 'numero', valore: 2.5, tolleranza: 0.01 }` — accetta anche frazioni scritte `5/2`
  - `{ tipo: 'numeri', valori: [-1, 3] }` — insieme di numeri, ordine libero (soluzioni di un'equazione)
  - `{ tipo: 'testo', accettate: ['x>3', 'x > 3', ']3;+inf['] }` — confronto normalizzato (minuscole, senza spazi, `,`→`.`); metti tutte le forme ragionevoli
  - `{ tipo: 'intervallo', da: -1, a: 3, chiusoDa: true, chiusoA: false }` — l'app propone
    un piccolo modulo (estremi + inclusione) e lo confronta
  - omessa → l'esercizio si controlla solo leggendo la soluzione.
- `soluzione`: array di passi (markdown), come negli esempi. Sempre presente.

### `quiz` (12–18) — domande di **teoria**
Domande su definizioni, proprietà, condizioni, «quale affermazione è vera», «cosa
succede se». Non calcoli lunghi (per quelli ci sono gli esercizi). Esattamente **4
opzioni**, distrattori plausibili (errori tipici), `corretta` = indice 0–3,
`spiegazione` obbligatoria (perché è giusta e perché le altre no). Varia la posizione
della risposta corretta (l'app rimescola comunque).

### `suggerimenti` (6–10) — le pillole della mascotte
`tipo` ∈ `errore` (trappola tipica), `trucco` (scorciatoia, controllo rapido),
`metodo` (come impostare). 1–3 frasi. Vengono mostrate a caso mentre si studia.

### `aneddoti` (3–5) — storie di matematici
`matematico` (nome come lo si trova sui libri), `anni` (`1501–1576`, `287–212 a.C.`),
`titolo` (5–8 parole), `testo` (80–160 parole, una storia vera e raccontata bene),
`legame` (una frase: che cosa c'entra con **questo** argomento).
Accuratezza prima di tutto: se una storia è leggenda, dirlo («si racconta che»).
Fonte da consultare e riusare, adattando: `../Mathstory/mathstory.js` e
`../Mathstory/info/matematici_scuola_superiore.md` (aneddoti già scritti dall'utente).

## 3. I grafici

Tutti i numeri possono essere anche **espressioni** in stringa (`'a*x^2'`, `'2*k'`),
che usano i `parametri` dichiarati (cursori sotto il grafico). Sintassi delle
espressioni: `x^2 - 2x - 3`, `2x`, `3(x+1)`, `sin(x)`, `cos`, `tan`, `sqrt`, `abs`,
`exp`, `ln`, `log10`, `log2`, `floor`, `pi`, `e`, `x!`. La variabile della funzione è
sempre `x`. **Niente altro nome oltre a `x` e ai parametri.**

### `tipo: 'piano'` — piano cartesiano
```js
{ tipo: 'piano', x: [-3, 5], y: [-5, 6],          // finestra (obbligatoria)
  passo: [1, 1],                                  // opzionale: passo delle tacche
  proporzioni: 'uguali',                          // stessa scala sui due assi (automatico se ci sono cerchi, angoli, poligoni, ellissi o assi:false; 'libere' per disattivare)
  griglia: true, assi: true,                      // default true
  etichette: { x: 'x', y: 'y' },                  // nomi degli assi
  funzioni: [ { f: 'x^2 - 2x - 3', etichetta: 'y = x² − 2x − 3', colore: 1, tratteggio: false, dominio: [-3, 5] } ],
  punti: [ { x: -1, y: 0, etichetta: 'x₁', posizione: 'basso', vuoto: false } ],
  elementi: [
    { tipo: 'punto', p: [1, -4], etichetta: 'V', posizione: 'basso' },
    { tipo: 'segmento', da: [0, 0], a: [3, 2], etichetta: 'AB', tratteggio: true },
    { tipo: 'vettore', da: [0, 0], a: [3, 2], etichetta: 'v' },
    { tipo: 'retta', m: 2, q: -1, etichetta: 'r' },   // oppure per: [[x1,y1],[x2,y2]]
    { tipo: 'verticale', x: 1, asintoto: true, etichetta: 'x = 1' },
    { tipo: 'orizzontale', y: 2, asintoto: true },
    { tipo: 'poligono', punti: [[0,0],[4,0],[1,3]], etichette: ['A','B','C'], riempi: true },
    { tipo: 'cerchio', centro: [1, 1], raggio: 2, etichetta: 'γ' },
    { tipo: 'ellisse', centro: [0, 0], a: 3, b: 2 },
    { tipo: 'angolo', vertice: [0,0], da: [4,0], a: [1,3], etichetta: 'α', raggio: 0.8 },
    { tipo: 'area', f: 'x^2', da: 0, a: 2, etichetta: 'A' },         // area fra f e l'asse x (o fra f e g: g:'...')
    { tipo: 'tangente', f: 'x^2', x0: 'p' },                          // retta tangente in x0 (mostra la pendenza)
    { tipo: 'testo', p: [2, 3], testo: 'vertice' }
  ],
  parametri: [ { nome: 'a', min: -3, max: 3, passo: 0.1, valore: 1, etichetta: 'a' } ],
  didascalia: 'La parabola y = ax² con a variabile.' }
```
Colori: `colore` da 1 a 4 (blu, arancio, verde-acqua, viola). Le etichette dei punti
usano caratteri Unicode (`x₁`, `²`, `α`), **non** LaTeX: dentro l'SVG non c'è KaTeX.
Posizioni delle etichette: `alto | basso | destra | sinistra | alto-destra | ...`.
Il grafico ha già un mirino: passando il dito o il mouse mostra x e f(x).

### `tipo: 'retta-reale'` — intervalli (disequazioni)
```js
{ tipo: 'retta-reale', x: [-5, 5],
  intervalli: [ { da: -2, a: 3, chiusoDa: true, chiusoA: false, etichetta: '−2 ≤ x < 3' },
                { da: '-inf', a: 0, chiusoA: false, colore: 2 } ],
  punti: [ { x: 1, etichetta: '1', escluso: true } ],
  didascalia: '...' }
```

### `tipo: 'barre'` — statistica
```js
{ tipo: 'barre', categorie: ['A', 'B', 'C'], valori: [3, 7, 2],
  etichettaY: 'frequenza', etichettaX: 'voto',
  // oppure più serie: serie: [ { nome: '2024', valori: [...] }, { nome: '2025', valori: [...] } ]
  didascalia: '...' }
```

### `tipo: 'circonferenza-goniometrica'` — interattiva
```js
{ tipo: 'circonferenza-goniometrica', angolo: 60, mostra: ['sin', 'cos', 'tan'], didascalia: '...' }
```
Ha già un cursore per l'angolo.

### Punti trascinabili (interattività vera)
Un `punto` con `trascina: true` si sposta con il dito o il mouse e **aggiorna i parametri**
che lo definiscono; tutto il resto del grafico si ridisegna. I nomi in `p` devono essere
parametri dichiarati (anche `nascosto: true` per non avere il cursore). Nei `testo` e nelle
`etichetta` si può scrivere `{{espressione}}` per mostrare un valore che cambia.
```js
{ tipo: 'piano', x: [-5, 5], y: [-6, 6],
  parametri: [ { nome: 'x1', min: -4, max: 4, passo: 0.5, valore: -1, nascosto: true },
               { nome: 'x2', min: -4, max: 4, passo: 0.5, valore: 3, nascosto: true } ],
  funzioni: [ { f: '(x - x1)(x - x2)', etichetta: 'y = (x − x₁)(x − x₂)' } ],
  elementi: [ { tipo: 'punto', p: ['x1', 0], trascina: true, etichetta: 'x₁', posizione: 'basso', colore: 2 },
              { tipo: 'punto', p: ['x2', 0], trascina: true, etichetta: 'x₂', posizione: 'basso', colore: 2 },
              { tipo: 'testo', p: [-4.5, 5.2], testo: 'somma = {{x1 + x2}}   prodotto = {{x1 * x2}}', ancora: 'start' } ],
  didascalia: 'Trascina x₁ e x₂.' }
```
Usa i punti trascinabili quando c'è qualcosa da *scoprire* muovendo (per esempio: due punti
che definiscono una retta, un punto sulla circonferenza, i fuochi di un'ellisse).

### `[[animazione:nome]]` — le animazioni pronte
Piccoli "motion graphic" con avvio automatico, pausa e cursore di avanzamento; ognuno ha
già le sue didascalie a fasi. Si inseriscono nel testo con `[[animazione:nome]]` **da solo su
una riga** (non vanno definite in `grafici`). Nomi disponibili e dove hanno senso:

| nome | cosa mostra | argomenti |
|---|---|---|
| `pitagora` | dimostrazione per riordinamento di c² = a² + b² | geometria-euclidea, trigonometria |
| `euclide-primo` | primo teorema di Euclide: b² = c · m | geometria-euclidea |
| `somma-angoli` | gli angoli di un triangolo formano un angolo piatto | geometria-euclidea |
| `talete` | parallele e segmenti proporzionali | geometria-euclidea |
| `area-cerchio` | gli spicchi del cerchio diventano un rettangolo πr · r | geometria-euclidea, limiti |
| `quadrato-binomio` | (a + b)² = a² + 2ab + b² con i rettangoli | monomi-polinomi |
| `completamento-quadrato` | x² + 6x + 9 = (x + 3)² | equazioni-secondo-grado, scomposizione |
| `pendenza-retta` | il coefficiente angolare come rapporto Δy/Δx | piano-cartesiano-retta |
| `parabola-luogo` | la parabola come luogo dei punti equidistanti da fuoco e direttrice | parabola |
| `ellisse-giardiniere` | l'ellisse con due chiodi e lo spago | ellisse-iperbole |
| `circonferenza-sinusoide` | il punto che gira disegna la sinusoide | funzioni-goniometriche |
| `angoli-associati` | le simmetrie del punto sulla circonferenza goniometrica | funzioni-goniometriche |
| `crescita-esponenziale` | lineare contro esponenziale, passo dopo passo | esponenziali |
| `somma-dispari` | 1 + 3 + 5 + … = n² con le "L" | successioni, insiemi-numerici |
| `gauss` | 1 + 2 + … + n con le due scale | successioni |
| `fibonacci-spirale` | i quadrati di Fibonacci e la spirale | successioni |
| `achille-tartaruga` | il paradosso di Zenone e la somma infinita finita | limiti, successioni |
| `crivello` | il crivello di Eratostene fino a 60 | insiemi-numerici |
| `secante-tangente` | la secante che diventa tangente (derivata) | derivate |
| `riemann` | somme di rettangoli sempre più fitti | integrali |
| `integrale-accumulo` | l'area che si accumula è la funzione integrale | integrali |
| `galton` | la macchina di Galton e la campana binomiale | probabilita, statistica |

Ogni argomento dovrebbe usare **le animazioni che lo riguardano** (nel punto della teoria in
cui servono), senza forzarne altre.

### `tipo: 'svg'` — solo se davvero necessario
`{ tipo: 'svg', codice: '<svg viewBox="0 0 300 200">...</svg>', didascalia }`. Usare
`currentColor` per le linee e `var(--s1)`…`var(--s4)` per i colori. Preferire sempre
`piano` con `elementi`.

## 4. Regole di qualità

- **Tutto corretto.** Ogni risultato di esempi, esercizi e quiz va ricontrollato a
  mano prima di scriverlo. Un errore in un sito di ripasso è peggio di un argomento in
  meno.
- Livello: liceo (scientifico/scienze applicate), linguaggio dei libri di testo
  italiani (Bergamini, Sasso). Notazioni italiane: `\Delta` per il discriminante,
  «tabella dei segni», «c.e.» per le condizioni di esistenza, virgola decimale nel
  testo (`2,5`) ma punto nei numeri JS.
- Niente riempitivi: ogni frase porta un'informazione.
- Ogni sezione deve essere leggibile da sola (lo studente potrebbe aprire solo quella).
- Gli id (`fc-01`, `es-01`, `q-01`, sezioni) unici nel file.
