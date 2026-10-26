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
