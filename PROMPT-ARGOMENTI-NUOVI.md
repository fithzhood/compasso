# Prompt per le pagine nuove (26/10/2026)

Si dà a un agente dicendo «leggi `PROMPT-ARGOMENTI-NUOVI.md` e segui il § Costruttore con ARG = <id>», più le note
specifiche dell'argomento (sezioni proposte, video, buco di programma in `COPERTURA-PROGRAMMI-2.md`, posto nell'indice).
Metodo: costruttore → revisore a contesto fresco (§ Revisore, non tocca i file) → correzioni allo stesso costruttore.

## Costruttore

Scrivi l'argomento nuovo **ARG** del sito di matematica **Compasso** (liceo scientifico; per gli argomenti dei soli
tecnici, istituto tecnico AFM/CAT), in italiano. Cartella `C:\Users\lfili\OneDrive\Documenti\app\Compasso` (Windows;
Bash POSIX o PowerShell; Write/Edit; un file lungo a pezzi con Edit successivi, non una Write unica). Script temporanei
nella scratchpad con il prefisso indicato.

Leggi prima: `SCHEMA.md` (il contratto: **alla lettera**; notazioni: punti (2; 4) col punto e virgola, intervalli (1, 3)
con la virgola e le macro `\Iaa` `\Icc` `\Ica` `\Iac`; tabelle dei segni col tipo `segni` nel formato del quaderno);
`argomenti/studio-di-funzione.js` come modello di densità, tono e grafici; gli argomenti vicini indicati nelle note; i
copioni dei video già pronti in `video/ARG/` (battute di Ada e scena) e le loro righe in fondo a `VIDEO.md`. Ogni video si
cita con `[[video:ARG/<nome>]]` nella sezione dove serve; teoria coerente con i video (stessi simboli e, dove si può,
stessi esempi). Cerca nel log di `HANDOFF.md` le note su ARG.

Regole che contano di più:
- **Matematica giusta**: ogni numero di esempi, esercizi (risposte e forme accettate), quiz e flashcard ricalcolato con
  `node -e`; grafici controllati punto per punto.
- **Spiegazioni facili**: frasi ≤ 20 parole, un concetto per sezione, esempi concreti;
  `node strumenti/leggibilita.js argomenti/ARG.js --frasi` a zero frasi lunghe.
- 6–9 sezioni; 20 esercizi base (`livello: 'base'`) e fino a 12 avanzati (per il quinto anno almeno uno in stile seconda
  prova); esercizi diversi dai numeri di teoria, esempi e video.
- Niente istruzioni d'interfaccia nel testo; quiz con la risposta giusta in posizioni varie e non visibilmente la più
  lunga; spiegazioni che non citano le opzioni per posizione.
- Aneddoti veri e nuovi (grep che la storia non sia già in un altro `argomenti/*.js`); anni veri, leggende dichiarate tali.
- `node strumenti/compatibilita.js argomenti/ARG.js` e `node strumenti/verifica-argomento.js argomenti/ARG.js` (OK).
- Voce in `compasso-indice.js` (area, livello, posizione e prerequisiti dalle note; `breve` e `parole` come le altre).

Collaudo col banco (`timeout 300 node strumenti/banco.js argomento/ARG/teoria/<sezione> --w 384 --h 1600 --shot
<scratchpad>/<pref>-<nome>.png`, anche `--scuro`): al massimo 6 foto, una alla volta (il PC si scalda, lavorano altri
agenti). Non toccare video, `compasso-video.js`, `compasso.js`, `compasso-grafici.js`, css, `VIDEO.md`, `SCHEMA*.md`,
`HANDOFF*.md`, `strumenti/`, altri argomenti. Niente git, niente pubblicazione. Risposta (max 200 parole): sezioni,
numeri (esempi, flashcard, esercizi base/avanzati, quiz, aneddoti), dove sono i video, controlli, limiti del motore, dubbi.

## Ritocchi a pagine esistenti (28/10)

Come il § Costruttore, ma su un argomento **che c'è già**: aggiungi le sezioni, i riquadri e gli esempi indicati nelle
note (le righe di `COPERTURA-PROGRAMMI-2.md` citate), senza riscrivere quello che c'è. Prima leggi il file intero: molti
buchi hanno già un video citato e due righe intorno; lì si amplia la trattazione attorno al video, che resta dov'è o si
sposta nella sezione nuova. Stesso tono, simboli e densità della pagina. Per ogni sezione nuova: teoria con almeno un
esempio svolto (derivazioni `~` se servono), 2–3 flashcard, 4–6 esercizi base e 1–2 avanzati (con `sezione:` giusto),
2–3 quiz; per un riquadro o un esempio basta il testo e un esercizio. Le sezioni nuove vanno anche negli `esempi` e nel
`formulario` se hanno formule. Gli id esistenti non cambiano (sono nei progressi degli studenti). Formule in display
che a 384 px scorrerebbero di lato (due formule affiancate con `\qquad`): una per riga con `\begin{gathered} … \\ …
\end{gathered}`. Numero e unità uniti con lo spazio non separabile vero (carattere U+00A0, i file sono String.raw).
Controlli come nel § Costruttore (leggibilità solo sulle parti nuove, verifica-argomento, compatibilita), al massimo
4 foto. Risposta (max 150 parole): che cosa hai aggiunto e dove, numeri, controlli, dubbi.

## Revisione delle pagine di settembre (29/10)

Come il § Revisore, ma su un argomento scritto a settembre e mai riletto a contesto fresco: rivedi **tutto il file**.
Priorità: 1) errori di matematica (ricalcola tutto con `node -e`: esempi, esercizi e forme accettate, quiz, flashcard,
formulario; grafici punto per punto; anni e fatti degli aneddoti, cercando se servono); 2) esercizi base che ripetono i
numeri della teoria, degli esempi o dei video, o doppioni fra loro; quiz con una risposta giusta sola e spiegazioni che
non citano le opzioni per posizione; 3) notazioni di `SCHEMA.md` (punti col punto e virgola, intervalli con le macro,
tabelle dei segni) e coerenza con gli argomenti vicini; istruzioni d'interfaccia nella teoria; 4) per gli argomenti del
quinto anno: se manca un esercizio avanzato in stile seconda prova (problema in più punti, con parametro o contesto),
proponine uno completo con risultati controllati. Il layout a 384 e 360 px è già stato collaudato (niente scorre né
viene tagliato): al massimo 3 foto, solo per i grafici. Non modifichi nessun file. Risposta in massimo 40 righe: difetti
per gravità (id, che cosa, correzione esatta, valore giusto), poi PASSA / PASSA CON CORREZIONI / NON PASSA e le scelte per
il coordinatore.

## Correttore delle pagine di settembre (29/10)

Applichi a `argomenti/ARG.js` le correzioni elencate nel messaggio (la revisione e le scelte del coordinatore), senza
riscrivere il resto. Gli id esistenti non cambiano, salvo esercizi tolti o sostituiti indicati nel messaggio. Ricalcola
con `node -e` ogni numero nuovo. Poi `verifica-argomento.js`, `compatibilita.js`, `leggibilita.js --frasi` (zero frasi
lunghe nelle parti toccate), e al massimo 2 foto se hai toccato un grafico. Formule in display: niente `\qquad` fra due
formule, una per riga con `gathered`; numero e unità col carattere U+00A0. Non toccare altri file oltre a quelli indicati.
Risposta in massimo 80 parole.

## Revisore

Sei il revisore a contesto fresco di `argomenti/ARG.js` (nuovo). Non l'hai scritto tu; **non modifichi nessun file**.
Leggi `SCHEMA.md`, il file per intero, la sua voce in `compasso-indice.js`, i copioni dei video citati e gli argomenti
vicini (coerenza di notazioni, niente doppioni o contraddizioni). Controlla, in ordine: 1) errori di matematica (ricalcola
con `node -e` ogni risultato di esempi, esercizi con le forme accettate, quiz, flashcard; grafici punto per punto; anni e
fatti degli aneddoti); 2) didattica (da zero, un concetto alla volta, idee sbagliate tipiche smontate, esercizi base
graduati e diversi dalla teoria, quiz con una sola giusta e distrattori plausibili); 3) contratto e notazioni di
`SCHEMA.md` (punti e intervalli, tabelle dei segni), video al posto giusto, niente istruzioni d'interfaccia;
4) leggibilità (`node strumenti/leggibilita.js … --frasi`); 5) a vista col banco, al massimo 8 foto a 384 px anche in scuro,
una alla volta con 60 s di pausa; 6) `verifica-argomento.js` e `compatibilita.js`. Risposta in massimo 40 righe: difetti
ordinati per gravità (file, sezione o id, che cosa, come si corregge, valore giusto se è un numero), poi PASSA / PASSA CON
CORREZIONI / NON PASSA e le scelte da far decidere al coordinatore.
