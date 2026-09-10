# Compasso — schema di un laboratorio

Un **laboratorio** è un'esperienza manipolativa: un piccolo gioco con una metafora fisica
che contiene un concetto. I modelli a cui somigliare sono **BaloonZ** (palloncini che
alzano e zavorre che abbassano una mongolfiera: i numeri relativi si sommano *facendo*) e
**Marea** (una barra da piegare che diventa parabola, un mare da alzare fino a quota zero: la
disequazione di secondo grado si *vede*). Non un grafico con cursori: un oggetto da
maneggiare, un obiettivo, un esito che si capisce a colpo d'occhio.

## Regole di progetto (le stesse di Marea)

1. **Una metafora fisica sola**, portata fino in fondo (pesi e piatti; mare e rive; palloncini e zavorra).
2. **Un obiettivo per livello**, e livelli che crescono: dal caso ovvio a quello che richiede il concetto.
3. **Il gioco non regala la risposta**: si vince solo se si è capito. Niente calamite, niente
   "quasi giusto" che aggancia da solo. Se serve un aiuto, un pulsante «?» che spiega il *come*, non il risultato.
4. **L'esito si legge dalla scena** (il piatto scende, il personaggio è sott'acqua, il pallone
   supera la quota), e solo dopo dai numeri.
5. **Ponte con la matematica scritta**: da qualche parte compare, aggiornata in tempo reale,
   l'equazione o la formula che la scena rappresenta (KaTeX con `ctx.tex`).
6. Funziona con **il dito** (pointer events, `touch-action: none` sull'area interattiva),
   su 384 px di larghezza in verticale e su schermo largo; niente hover indispensabile.
7. **Niente audio.** Animazioni brevi (< 600 ms) e pilotate da `requestAnimationFrame`, da fermare in `smonta`.
8. Testi in italiano, brevi, senza «Ciao!». Colori dai token del sito (`var(--s1)`…`var(--s4)`,
   `--ok`, `--no`, `--testo`, `--testo2`, `--sup`, `--sup2`, `--bordo`, `--accento`), così regge il tema scuro.

## Il contratto

File `laboratori/<id>.js`:

```js
(function () {
  const STILE = `
    .lab-<id> .lab-scena { aspect-ratio: 3 / 2; background: var(--sup2); }
    @media (max-width: 600px) { .lab-<id> .lab-scena { aspect-ratio: 4 / 5; } }
    ...`;
  COMPASSO.registraLab({
    id: '<id>',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-<id>')) { const s = document.createElement('style'); s.id = 'stile-lab-<id>'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-<id>');
      radice.innerHTML = `<div class="lab-scena">…</div><div class="lab-messaggio"></div><div class="lab-barra">…</div>`;
      /* … gioco … */
      return function smonta() { /* cancelAnimationFrame, removeEventListener su window/document */ };
    }
  });
})();
```

- `radice`: un `<div class="lab-stage">` vuoto, largo quanto la pagina (min 320 px). Il laboratorio
  decide l'altezza: di solito una `.lab-scena` con `aspect-ratio` e sotto una `.lab-barra` con i
  pulsanti (classi già pronte: `.lab-scena`, `.lab-barra`, `.lab-messaggio`, `.lab-livello`, `.btn`, `.btn.primario`, `.btn.piccolo`).
- `ctx.zenone(testo, { tipo: 'commento'|'suggerimento'|'errore', espressione: 'felice'|'pensa'|'sorpreso'|'triste'|'orgoglioso', durata: ms })`
  — la mascotte parla. Usala per i commenti di fine livello e per gli errori tipici, non a ogni tocco.
- `ctx.completato(livello)` — segna il livello (numero) come completato; `ctx.stato().livelli` è l'elenco.
- `ctx.tex(latex, display)` → HTML KaTeX; `ctx.md(markdown)` → HTML con matematica `$…$`.
- `ctx.tema()` → `'chiaro'` | `'scuro'`; `ctx.CGRAF` → il motore dei grafici (`render(spec, contenitore)`), se serve un piano cartesiano vero.
- Il ritorno di `monta` è la funzione di pulizia: viene chiamata a ogni cambio di pagina o scheda.
- Le immagini stanno in `laboratori/immagini/` (ci sono già `cielo.jpg`, `mongolfiera.png`, `palloncino.png`, `palloncino2.png`, `zavorra.png`).
- Il file va registrato in `compasso-indice.js` → `laboratori`: `{ id, argomento, titolo, icona (emoji), sotto (una riga), intro (la frase di Zenone all'apertura) }`.

## Verifica

- `node --check laboratori/<id>.js` (sintassi), poi il laboratorio va provato nel browser:
  `#/argomento/<argomento>/lab/<id>`. Deve reggere a 384 px di larghezza e a schermo intero.
- Il modello da leggere prima di scrivere: `laboratori/bilancia.js`.
