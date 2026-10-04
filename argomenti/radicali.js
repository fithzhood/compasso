(function () {
const R = String.raw;
/* allenamento: la casella accetta la radice scritta con √, sqrt o rad (sul telefono √ non sempre c'è) */
const SEGNA = 'es. 3√2 o 3 rad 2';
const forme = f => {
  const alt = [s => s, s => s.replace(/√(\d+)/g, 'sqrt$1'), s => s.replace(/√(\d+)/g, 'sqrt($1)'), s => s.replace(/√(\d+)/g, '√($1)'),
    s => s.replace(/√(\d+)/g, 'rad$1'), s => s.replace(/√(\d+)/g, 'rad($1)'), s => s.replace(/(\d)√/g, '$1*√'),
    s => s.replace(/√(\d+)/g, 'radice di $1'), s => s.replace(/√(\d+)/g, 'radice $1')];
  return [...new Set(alt.map(g => g(f)))];
};
const rad = (...f) => ({ tipo: 'testo', accettate: f.flatMap(forme), segnaposto: SEGNA });
COMPASSO.registra({
  id: 'radicali',
  titolo: 'Radicali',

  introduzione: R`Un quadrato ha area $50\ \text{cm}^2$. Quanto misura il lato? Ti serve un numero che al quadrato dia $50$. Si scrive $\sqrt{50}$ e vale circa $7{,}07$.

La radice torna indietro da una potenza. Siccome $5^3 = 125$, la radice cubica di $125$ è $5$. La trovi nel teorema di Pitagora e nella formula delle equazioni di secondo grado.

Qui impari a fare i conti con i radicali senza calcolatrice. Ti servono le proprietà delle potenze.`,

  inBreve: [
    R`$\sqrt[n]{a}$ è il numero che elevato alla $n$ dà $a$. Con indice pari il radicando non può essere negativo, e il risultato non è mai negativo: $\sqrt{9}=3$, mai $-3$.`,
    R`$\sqrt{a^2}=|a|$: se non sai il segno di $a$, il valore assoluto resta.`,
    R`Moltiplichi e dividi solo radicali con lo stesso indice. Se gli indici sono diversi, prima li porti allo stesso indice.`,
    R`Sommi solo radicali simili, come i monomi simili. $\sqrt{a}+\sqrt{b}$ è diverso da $\sqrt{a+b}$.`,
    R`Per togliere la radice dal denominatore, moltiplica sopra e sotto per il fattore giusto.`,
    R`$a^{\frac{m}{n}}=\sqrt[n]{a^m}$, con $a>0$: il denominatore dell'esponente diventa l'indice.`
  ],

  sezioni: [
    { id: 'radice-n-esima', titolo: 'La radice n-esima', testo: R`Quale numero, elevato al cubo, dà $8$? È $2$. Si scrive $\sqrt[3]{8}=2$.

La **radice $n$-esima** di $a$ è il numero che elevato alla $n$ dà $a$. Nel simbolo $\sqrt[n]{a}$, $n$ è l'*indice* e $a$ è il *radicando*. L'indice $2$ non si scrive: $\sqrt{a}$ è la radice quadrata.

Conta se l'indice è pari o dispari.

| | indice pari | indice dispari |
|---|---|---|
| radicando negativo | non esiste: $\sqrt{-4}$ | esiste: $\sqrt[3]{-8}=-2$ |
| segno del risultato | sempre $\ge 0$ | come il radicando |

Con indice pari il radicando non può essere negativo. Una potenza pari non è mai negativa: $3^2=9$ e anche $(-3)^2=9$.

>* $\sqrt[n]{a}=b$ vuol dire $b^n=a$. Se $n$ è pari serve $a\ge 0$, e come risultato si prende $b\ge 0$.

Sia $3$ sia $-3$ al quadrato danno $9$. Ma il simbolo $\sqrt{9}$ indica solo $3$. Le due soluzioni $\pm 3$ sono dell'equazione $x^2=9$.

?? Quanto vale $\sqrt{(-5)^2}$?
[ ] $-5$
[x] $5$
[ ] non esiste, perché dentro c'è un numero negativo
=> Prima calcoli il radicando: $(-5)^2=25$. Poi $\sqrt{25}=5$. La trappola è semplificare radice e quadrato e scrivere $-5$: una radice quadrata non è mai negativa.

>! $\sqrt{a^2}=|a|$. Se $a\ge 0$ è proprio $a$. Se $a<0$ è il suo opposto. Finché non sai il segno di $a$, il valore assoluto resta.

Una radice rende sempre un numero più piccolo? Trascina il punto e scoprilo.

[[grafico:radiceN]]

Se il numero è maggiore di $1$, la radice lo rimpicciolisce. Se sta fra $0$ e $1$, lo ingrandisce: $\sqrt{0{,}25}=0{,}5$. Più l'indice è alto, più il risultato si avvicina a $1$.` },

    { id: 'proprieta-invariantiva', titolo: 'Proprietà invariantiva e semplificazione', testo: R`Con la calcolatrice, $\sqrt[4]{9}$ e $\sqrt{3}$ danno lo stesso numero: $1{,}732\ldots$ Il motivo è che $9=3^2$. In $\sqrt[4]{3^2}$ puoi dividere per $2$ sia l'indice sia l'esponente.

>* **Proprietà invariantiva:** moltiplica o dividi l'indice e l'esponente del radicando per lo stesso numero intero positivo. Il valore del radicale non cambia. $$\sqrt[n]{a^m}=\sqrt[n\cdot k]{a^{m\cdot k}}\qquad(a\ge 0)$$

Si usa in due modi:

- **dividendo**, per semplificare: dividi indice ed esponente per il loro MCD;
- **moltiplicando**, per portare più radicali allo stesso indice (sezione seguente).

Semplifica $\sqrt[6]{8}$.

~ \sqrt[6]{8} :: il radicando non sembra una potenza, ma lo è
~ \sqrt[6]{\evid{2^3}} :: scrivo $8$ come potenza: $8=2^3$
~ \sqrt[\evid{6:3}]{2^{\evid{3:3}}} :: il MCD fra l'indice $6$ e l'esponente $3$ è $3$: divido tutti e due per $3$
~ \evidb{\sqrt{2}} :: l'indice è diventato $2$, che non si scrive

Conviene semplificare subito: dopo è più facile confrontare e sommare.

?? Si può semplificare $\sqrt[6]{5^4}$?
[x] Sì: diventa $\sqrt[3]{5^2}$
[ ] Sì: diventa $\sqrt[3]{5^4}$
[ ] No: $6$ e $4$ non sono uno multiplo dell'altro
=> Il MCD fra $6$ e $4$ è $2$. Dividi per $2$ **sia** l'indice **sia** l'esponente: ottieni $\sqrt[3]{5^2}=\sqrt[3]{25}$. Dividere solo l'indice cambia il valore. Non serve che un numero sia multiplo dell'altro: basta un divisore comune.

>! Attento se il radicando può essere negativo. $\sqrt[4]{a^2}$ diventa $\sqrt{|a|}$, perché $a^2$ è positivo anche con $a$ negativo. E $\sqrt[3]{-2}$ è negativo, mentre $\sqrt[6]{(-2)^2}=\sqrt[6]{4}$ è positivo: moltiplicando per $2$ indice ed esponente, il valore è cambiato.` },

    { id: 'riduzione-stesso-indice', titolo: 'Riduzione allo stesso indice e confronto', testo: R`Quale è più grande, $\sqrt{2}$ o $\sqrt[3]{3}$? Gli indici sono diversi, quindi i radicandi da soli non bastano. Prima riscrivi i due numeri con lo **stesso indice**.

>* **Riduzione allo stesso indice:** calcola il mcm degli indici. Poi moltiplica indice ed esponente di ogni radicale per il numero che porta il suo indice al mcm.

~ \sqrt{2}\quad\text{e}\quad\sqrt[3]{3} :: gli indici sono $2$ e $3$: il loro mcm è $6$
~ \sqrt[\evid{2\cdot 3}]{2^{\evid{3}}}\quad\text{e}\quad\sqrt[\evid{3\cdot 2}]{3^{\evid{2}}} :: il primo va moltiplicato per $3$, il secondo per $2$, sia nell'indice sia nell'esponente
~ \sqrt[6]{8}\quad\text{e}\quad\sqrt[6]{9} :: calcolo le due potenze
~ \sqrt[6]{8}\ \evidb{<}\ \sqrt[6]{9} :: con lo stesso indice è più grande il radicale con il radicando più grande

Quindi $\sqrt{2}<\sqrt[3]{3}$. Con la calcolatrice: $\sqrt{2}\approx 1{,}414$ e $\sqrt[3]{3}\approx 1{,}442$.

>* Con lo stesso indice confronti i radicandi: se $0\le a<b$, allora $\sqrt[n]{a}<\sqrt[n]{b}$.

?? Quale dei due è maggiore, $\sqrt[3]{5}$ o $\sqrt{3}$?
[ ] $\sqrt[3]{5}$, perché $5>3$
[x] $\sqrt{3}$
[ ] sono uguali
=> All'indice $6$: $\sqrt[3]{5}=\sqrt[6]{5^2}=\sqrt[6]{25}$ e $\sqrt{3}=\sqrt[6]{3^3}=\sqrt[6]{27}$. Siccome $27>25$, è maggiore $\sqrt{3}$. Confrontare subito $5$ e $3$ è l'errore da evitare: con indici diversi i radicandi da soli non dicono niente.` },

    { id: 'moltiplicazione-divisione', titolo: 'Moltiplicazione e divisione di radicali', testo: R`Quanto fa $\sqrt{3}\cdot\sqrt{12}$? I due fattori sono scomodi, ma il prodotto no. Con lo stesso indice, metti i radicandi sotto un'unica radice.

[[video:radicali/prodotto]]

>* Con lo stesso indice: $$\sqrt[n]{a}\cdot\sqrt[n]{b}=\sqrt[n]{a\cdot b}$$ $$\frac{\sqrt[n]{a}}{\sqrt[n]{b}}=\sqrt[n]{\frac{a}{b}}$$ Se $n$ è pari servono $a,b\ge 0$; nella divisione $b\ne 0$.

Così $\sqrt{3}\cdot\sqrt{12}=\sqrt{36}=6$ e $\dfrac{\sqrt{18}}{\sqrt{2}}=\sqrt{9}=3$. Dopo il prodotto guarda il nuovo radicando: se è un quadrato perfetto, la radice sparisce.

Con indici diversi, prima porta i radicali allo stesso indice.

~ \sqrt{2}\cdot\sqrt[3]{2} :: indici diversi: così non si possono moltiplicare
~ \sqrt[\evid{6}]{2^{\evid{3}}}\cdot\sqrt[\evid{6}]{2^{\evid{2}}} :: porto tutti e due all'indice $6$, il mcm di $2$ e $3$
~ \sqrt[6]{2^{\evid{3+2}}} :: ora l'indice è lo stesso: moltiplico i radicandi, cioè sommo gli esponenti
~ \evidb{\sqrt[6]{32}} :: $2^5=32$

La regola vale per prodotti e quozienti. Per le somme no.

?? Quanto fa $\sqrt{9}+\sqrt{16}$?
[ ] $\sqrt{25}=5$
[x] $7$
[ ] $\sqrt{144}=12$
=> $\sqrt{9}+\sqrt{16}=3+4=7$. Con $\sqrt{9+16}=5$ hai usato per la somma la regola del prodotto. $\sqrt{144}$ è la radice del prodotto $9\cdot 16$.

>! $\sqrt{a+b}\ne\sqrt{a}+\sqrt{b}$. Vale anche per la differenza: $\sqrt{25-9}=\sqrt{16}=4$, mentre $\sqrt{25}-\sqrt{9}=5-3=2$.` },

    { id: 'trasporto-segno-radice', titolo: 'Portare fuori e portare dentro dal segno di radice', testo: R`$\sqrt{72}$ nasconde un quadrato perfetto: $72=36\cdot 2$. Siccome $\sqrt{36}=6$, il $6$ può uscire dalla radice.

~ \sqrt{72} :: cerco il quadrato perfetto più grande che divide $72$
~ \sqrt{\evid{36}\cdot 2} :: $72=36\cdot 2$, e $36=6^2$
~ \sqrt{36}\cdot\sqrt{2} :: la radice di un prodotto è il prodotto delle radici
~ \evidb{6}\sqrt{2} :: $\sqrt{36}=6$ esce dalla radice, il $2$ resta dentro

Il metodo generale:

1. Scomponi il radicando in fattori primi.
2. Un fattore con esponente uguale all'indice esce.
3. Se l'esponente è più grande, esce la parte multipla dell'indice. Il resto rimane dentro.

Con indice $3$ escono i cubi: $\sqrt[3]{54}=\sqrt[3]{27\cdot 2}=3\sqrt[3]{2}$.

>* **Portare fuori:** $$\sqrt[n]{a^n\cdot b}=a\sqrt[n]{b}\qquad(a\ge 0)$$ Con indice pari e una lettera di segno sconosciuto, esce il valore assoluto: $\sqrt{a^2 b}=|a|\sqrt{b}$.

Con le lettere, guarda prima le condizioni di esistenza (c.e.). A volte dicono già che il fattore è positivo.

~ \sqrt{18a^3} :: c.e.: serve $18a^3\ge 0$, cioè $a\ge 0$
~ \sqrt{\evid{9}\cdot 2\cdot\evid{a^2}\cdot a} :: separo i quadrati: $18=9\cdot 2$ e $a^3=a^2\cdot a$
~ \evidb{3a}\sqrt{2a} :: escono $\sqrt{9}=3$ e $\sqrt{a^2}=a$, senza valore assoluto perché sappiamo già che $a\ge 0$

**Portare dentro** è il percorso inverso: il fattore esterno entra elevato all'indice.

>* **Portare dentro:** $$a\sqrt[n]{b}=\sqrt[n]{a^n\cdot b}\qquad(a\ge 0)$$ Per esempio $3\sqrt{2}=\sqrt{3^2\cdot 2}=\sqrt{18}$.

E se il fattore fuori è negativo? Con indice pari il meno non può entrare, perché una radice quadrata non è mai negativa.

~ -3\sqrt{2} :: il numero è negativo: $\sqrt{2}$ è positivo e il meno sta davanti
~ \evid{-}\sqrt{3^2\cdot 2} :: dentro entra solo $3$; il meno resta fuori dalla radice
~ \evidb{-\sqrt{18}} :: il risultato è ancora negativo, come deve essere

Con indice dispari il meno può entrare: $-2\sqrt[3]{3}=\sqrt[3]{(-2)^3\cdot 3}=\sqrt[3]{-24}$.

?? Come si scrive $-5\sqrt{3}$ con il fattore dentro la radice?
[ ] $\sqrt{-75}$
[ ] $\sqrt{75}$
[x] $-\sqrt{75}$
=> Dentro entra $5^2=25$, e $25\cdot 3=75$. Il meno resta fuori, perché $-5\sqrt{3}$ è negativo. $\sqrt{-75}$ non esiste. $\sqrt{75}$ ha cambiato segno al numero.

>! Portando dentro, il fattore va elevato all'indice: $2\sqrt{5}=\sqrt{4\cdot 5}=\sqrt{20}$, e non $\sqrt{2\cdot 5}$.` },

    { id: 'potenza-radice-di-radicale', titolo: 'Potenza di un radicale e radice di radicale', testo: R`Due regole servono quando una radice è elevata a potenza, o sta dentro un'altra radice.

>* **Potenza di un radicale:** l'esponente entra nel radicando. $$\left(\sqrt[n]{a}\right)^m=\sqrt[n]{a^m}$$ **Radice di un radicale:** gli indici si moltiplicano. $$\sqrt[k]{\sqrt[n]{a}}=\sqrt[k\cdot n]{a}$$

Per la potenza: $(\sqrt{3})^4=\sqrt{3^4}=\sqrt{81}=9$. Più in fretta: $(\sqrt{3})^2=3$, quindi $(\sqrt{3})^4=3^2=9$.

Nella radice di radice spesso c'è un fattore in mezzo. Portalo dentro per primo.

~ \sqrt{2\sqrt{2}} :: davanti alla radice interna c'è un $2$: prima lo porto dentro
~ \sqrt{\sqrt{\evid{2^2}\cdot 2}} :: il $2$ entra elevato all'indice della radice interna
~ \sqrt{\sqrt{8}} :: $4\cdot 2=8$
~ \evidb{\sqrt[4]{8}} :: radice quadrata di una radice quadrata: gli indici si moltiplicano, $2\cdot 2=4$

?? A che cosa è uguale $\sqrt[3]{\sqrt{5}}$?
[x] $\sqrt[6]{5}$
[ ] $\sqrt[5]{5}$
[ ] $\sqrt[3]{5^2}$
=> Gli indici si moltiplicano: $3\cdot 2=6$. L'errore tipico è sommarli e scrivere $\sqrt[5]{5}$. In $\sqrt[3]{5^2}$ l'indice $2$ è diventato un esponente.

> Queste regole vengono dalle proprietà delle potenze: lo vedi nella sezione sull'esponente frazionario.` },

    { id: 'addizione-radicali-simili', titolo: 'Addizione di radicali simili', testo: R`$2\sqrt{3}+5\sqrt{3}$ funziona come $2x+5x$: fa $7\sqrt{3}$. Invece $\sqrt{2}+\sqrt{3}$ è come $x+y$: resta così.

>* Due radicali sono **simili** se, semplificati, hanno lo stesso indice e lo stesso radicando. Sommi solo radicali simili, sommando i coefficienti: $$p\sqrt[n]{a}+q\sqrt[n]{a}=(p+q)\sqrt[n]{a}$$

Spesso due radicali diventano simili solo dopo aver portato fuori qualcosa.

~ \sqrt{50}-\sqrt{18}+\sqrt{8} :: radicandi diversi: prima provo a semplificarli
~ \evid{5}\sqrt{2}-\evid{3}\sqrt{2}+\evid{2}\sqrt{2} :: $50=25\cdot 2$, $18=9\cdot 2$, $8=4\cdot 2$: da ciascuno esce un quadrato
~ (5-3+2)\sqrt{2} :: ora sono tutti simili: sommo i coefficienti
~ \evidb{4\sqrt{2}}

Radicali diversi si comportano come lettere diverse: $\sqrt{2}+\sqrt{3}-4\sqrt{2}+2\sqrt{3}=-3\sqrt{2}+3\sqrt{3}$.

?? Quanto fa $3\sqrt{2}+\sqrt{8}$?
[x] $5\sqrt{2}$
[ ] $3\sqrt{10}$
[ ] $4\sqrt{10}$
=> $\sqrt{8}=2\sqrt{2}$, quindi $3\sqrt{2}+2\sqrt{2}=5\sqrt{2}$. I radicandi non si sommano mai: si sommano i coefficienti dei radicali simili.

>! Anche i prodotti si sviluppano come fra polinomi: $(\sqrt{3}+1)^2=3+2\sqrt{3}+1=4+2\sqrt{3}$. Se scrivi solo $3+1=4$, perdi il doppio prodotto.` },

    { id: 'razionalizzazione', titolo: 'Razionalizzazione del denominatore', testo: R`Un risultato come $\dfrac{1}{\sqrt{2}}$ è corretto. Però per convenzione non si lasciano radici al denominatore. **Razionalizzare** vuol dire riscrivere la frazione senza radici sotto, con lo stesso valore.

[[video:radicali/razionalizzare]]

Moltiplica numeratore e denominatore per lo stesso fattore. È come moltiplicare per $1$: il valore non cambia. Scegli il fattore che fa sparire la radice sotto.

| sotto c'è | moltiplico sopra e sotto per |
|---|---|
| $\sqrt{a}$ | $\sqrt{a}$ |
| $\sqrt[n]{a^m}$, con $m<n$ | $\sqrt[n]{a^{n-m}}$ |
| $a+\sqrt{b}$ | $a-\sqrt{b}$ |
| $a-\sqrt{b}$ | $a+\sqrt{b}$ |

### Una radice quadrata al denominatore

~ \frac{3}{\sqrt{5}} :: sotto c'è $\sqrt{5}$
~ \frac{3}{\sqrt{5}}\cdot\evid{\frac{\sqrt{5}}{\sqrt{5}}} :: moltiplico per $\dfrac{\sqrt{5}}{\sqrt{5}}$, che vale $1$
~ \frac{3\sqrt{5}}{\evidb{5}} :: $\sqrt{5}\cdot\sqrt{5}=5$: il denominatore non ha più radici

### Una radice di indice più alto

Con $\sqrt[3]{4}$ sotto, moltiplicare per $\sqrt[3]{4}$ non basta: viene $\sqrt[3]{16}$, ancora una radice. L'esponente sotto radice deve arrivare a $3$.

~ \frac{2}{\sqrt[3]{4}} :: il denominatore è una radice cubica
~ \frac{2}{\sqrt[3]{2^{\evid{2}}}} :: scrivo $4=2^2$: all'esponente manca $1$ per arrivare a $3$
~ \frac{2}{\sqrt[3]{2^2}}\cdot\evid{\frac{\sqrt[3]{2}}{\sqrt[3]{2}}} :: moltiplico sopra e sotto per $\sqrt[3]{2}$
~ \frac{2\sqrt[3]{2}}{\sqrt[3]{2^{\evid{3}}}} :: sotto ora c'è $2^2\cdot 2=2^3$
~ \frac{2\sqrt[3]{2}}{2}=\evidb{\sqrt[3]{2}} :: $\sqrt[3]{2^3}=2$, e poi semplifico il $2$

### Un binomio al denominatore

Qui usi il prodotto notevole $(x+y)(x-y)=x^2-y^2$. I due termini finiscono al quadrato, e la radice sparisce. Il fattore da usare si chiama **razionalizzante**.

~ \frac{4}{\sqrt{5}-1} :: al denominatore c'è una differenza con una radice
~ \frac{4}{\sqrt{5}-1}\cdot\evid{\frac{\sqrt{5}+1}{\sqrt{5}+1}} :: moltiplico per il binomio con il segno centrale cambiato
~ \frac{4(\sqrt{5}+1)}{\evid{(\sqrt{5})^2-1^2}} :: sotto c'è una somma per una differenza
~ \frac{4(\sqrt{5}+1)}{4} :: $5-1=4$
~ \evidb{\sqrt{5}+1} :: semplifico il $4$

Con due radici è uguale: il razionalizzante di $\sqrt{a}+\sqrt{b}$ è $\sqrt{a}-\sqrt{b}$, e il prodotto dà $a-b$.

?? Per razionalizzare $\dfrac{1}{2+\sqrt{3}}$, per che cosa moltiplichi sopra e sotto?
[x] $2-\sqrt{3}$
[ ] $-2-\sqrt{3}$
[ ] $\sqrt{3}$
=> Serve $2-\sqrt{3}$: $(2+\sqrt{3})(2-\sqrt{3})=4-3=1$, senza radici. Con $-2-\sqrt{3}$ hai cambiato tutti e due i segni: il prodotto è $-(2+\sqrt{3})^2$, e la radice resta. Con $\sqrt{3}$ viene $2\sqrt{3}+3$: la radice resta anche qui.

>! Si moltiplica **sia** il numeratore **sia** il denominatore. Moltiplicare solo il denominatore cambia il valore della frazione.` },

    { id: 'esponente-frazionario', titolo: 'Potenze con esponente frazionario', testo: R`Che senso ha $8^{\frac{1}{3}}$? Se valgono ancora le proprietà delle potenze, $\left(8^{\frac13}\right)^3=8^{\frac13\cdot 3}=8^1=8$. Quindi $8^{\frac13}$ è il numero che al cubo dà $8$: $\sqrt[3]{8}=2$.

[[video:radicali/radice-come-potenza]]

>* **Potenza con esponente frazionario:** $$a^{\frac{m}{n}}=\sqrt[n]{a^m}\qquad(a>0)$$ Il denominatore dell'esponente diventa l'indice. Il numeratore diventa l'esponente del radicando.

~ 8^{\frac{2}{3}} :: il denominatore è $3$: sarà una radice cubica
~ \left(\sqrt[\evid{3}]{8}\right)^{\evid{2}} :: conviene estrarre prima la radice, così i numeri restano piccoli
~ 2^2 :: $\sqrt[3]{8}=2$
~ \evidb{4}

Con questa definizione valgono tutte le proprietà delle potenze. Così fai i conti anche con radici di indici diversi.

~ \sqrt{a}\cdot\sqrt[3]{a} :: indici diversi, con $a>0$
~ a^{\evid{\frac12}}\cdot a^{\evid{\frac13}} :: scrivo le radici come potenze
~ a^{\frac12+\frac13}=a^{\frac56} :: prodotto di potenze con la stessa base: si sommano gli esponenti
~ \evidb{\sqrt[6]{a^5}} :: e torno alla scrittura con la radice

?? Quanto vale $16^{\frac{3}{4}}$?
[ ] $12$
[x] $8$
[ ] $\sqrt[3]{16^4}$
=> Il denominatore $4$ è l'indice: $\left(\sqrt[4]{16}\right)^3=2^3=8$. Il $12$ viene da $16\cdot\frac34$: hai moltiplicato la base per l'esponente. $\sqrt[3]{16^4}$ ha scambiato indice ed esponente.

>! La definizione vale solo per basi positive. Con $-8$ avresti $(-8)^{\frac13}=\sqrt[3]{-8}=-2$. Ma $\frac13=\frac26$, e $(-8)^{\frac26}=\sqrt[6]{(-8)^2}=\sqrt[6]{64}=2$. Lo stesso esponente darebbe due risultati diversi.` },

    { id: 'radicali-doppi', titolo: 'Radicali doppi', testo: R`Un **radicale doppio** è una radice quadrata che ne contiene un'altra: $\sqrt{A+\sqrt{B}}$ oppure $\sqrt{A-\sqrt{B}}$. A volte diventa una somma o una differenza di due radicali semplici.

L'idea viene dal quadrato di un binomio: $(\sqrt{5}+\sqrt{2})^2=5+2+2\sqrt{10}=7+2\sqrt{10}$. Letto al contrario: $\sqrt{7+2\sqrt{10}}=\sqrt{5}+\sqrt{2}$.

>* Cerca due numeri $p\ge q\ge 0$ con $p+q=A$ e $p\cdot q=B$. Allora $$\sqrt{A\pm 2\sqrt{B}}=\sqrt{p}\pm\sqrt{q}$$

~ \sqrt{6+\sqrt{20}} :: il doppio prodotto non si vede ancora
~ \sqrt{6+\evid{2\sqrt{5}}} :: $\sqrt{20}=2\sqrt{5}$: ora c'è la forma $A+2\sqrt{B}$, con $A=6$ e $B=5$
~ \sqrt{\evid{5+1}+2\sqrt{5\cdot 1}} :: due numeri con somma $6$ e prodotto $5$: sono $5$ e $1$
~ \sqrt{\left(\sqrt{5}+1\right)^2} :: è il quadrato di $\sqrt{5}+\sqrt{1}$
~ \evidb{\sqrt{5}+1} :: la radice quadrata del quadrato di un numero positivo è il numero stesso

Con il segno meno, attento all'ordine.

?? Quanto vale $\sqrt{4-2\sqrt{3}}$?
[x] $\sqrt{3}-1$
[ ] $1-\sqrt{3}$
[ ] $2-\sqrt{3}$
=> Due numeri con somma $4$ e prodotto $3$: sono $3$ e $1$. Con il meno il più grande va davanti: $\sqrt{3}-1$, che è positivo. $1-\sqrt{3}$ è negativo: non può essere una radice quadrata. $2-\sqrt{3}$ viene dallo spezzare la radice sulla differenza, e questo non si può fare.

>! Non tutti i radicali doppi si semplificano. In $\sqrt{5+2\sqrt{3}}$ servono due numeri con somma $5$ e prodotto $3$, e non sono razionali. Allora il radicale resta così.` },

    { id: 'espressioni-equazioni', titolo: 'Espressioni ed equazioni con i radicali', testo: R`Nelle **espressioni** con i radicali l'ordine è quello solito: parentesi, potenze e radici, prodotti e divisioni, somme e differenze.

Un'**equazione irrazionale** ha l'incognita sotto radice, come $\sqrt{2x-3}=3$. Elevi al quadrato i due membri: $2x-3=9$, quindi $x=6$.

Però elevare al quadrato può far comparire soluzioni false. Prendi $x=2$: ha una sola soluzione. Al quadrato diventa $x^2=4$, che ha anche $-2$. Queste soluzioni in più si chiamano **estranee**.

Per risolvere $\sqrt{f(x)}=g(x)$:

1. Imponi $f(x)\ge 0$: è la condizione di esistenza.
2. Imponi $g(x)\ge 0$: una radice quadrata non è mai negativa.
3. Eleva al quadrato e risolvi.
4. Tieni solo le soluzioni che rispettano le condizioni.

>* In $\sqrt{f(x)}=g(x)$ servono $f(x)\ge 0$ e $g(x)\ge 0$. Se $g(x)$ è un numero negativo, l'equazione è impossibile.

~ \sqrt{2x+7}=x+2 :: la radice è già isolata a sinistra
~ \evid{x+2\ge 0}\ \Rightarrow\ x\ge -2 :: la radice non è mai negativa, quindi non deve esserlo neanche il secondo membro
~ 2x+7=\evid{(x+2)^2} :: elevo al quadrato i due membri
~ x^2+2x-3=0 :: sviluppo $(x+2)^2=x^2+4x+4$ e porto tutto a sinistra
~ x=-3\ \lor\ x=1 :: risolvo: due numeri con somma $-2$ e prodotto $-3$
~ \evidb{x=1} :: $x=-3$ non rispetta $x\ge -2$: è una soluzione estranea e si scarta

Verifica: con $x=1$ hai $\sqrt{9}=3$ e $1+2=3$. Con $x=-3$ hai $\sqrt{1}=1$, ma $-3+2=-1$: non torna.

?? Quante soluzioni ha $\sqrt{x-1}=-2$?
[ ] una: $x=5$
[x] nessuna
[ ] una: $x=-3$
=> Una radice quadrata non è mai negativa: non può valere $-2$. L'equazione è impossibile. Elevando al quadrato trovi $x-1=4$, cioè $x=5$. Ma la verifica dà $\sqrt{4}=2$, non $-2$.

>! Elevare al quadrato può aggiungere soluzioni. Confronta ogni soluzione con le condizioni, oppure sostituiscila nell'equazione di partenza.` }
  ],

  grafici: {
    radiceN: {
      tipo: 'piano', x: [0, 4], y: [0, 2.5], passo: [0.5, 0.5],
      parametri: [
        { nome: 'n', min: 2, max: 5, passo: 1, valore: 2, etichetta: 'indice n' },
        { nome: 'p', min: 0, max: 4, passo: 0.05, valore: 0.25, nascosto: true }
      ],
      funzioni: [
        { f: 'x^(1/n)', etichetta: 'y = ⁿ√x', colore: 1, dominio: [0, 4] },
        { f: 'x', etichetta: 'y = x', colore: 3, tratteggio: true }
      ],
      elementi: [
        { tipo: 'segmento', da: ['p', 0], a: ['p', 'p^(1/n)'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['p', 'p^(1/n)'], colore: 1 },
        { tipo: 'punto', p: ['p', 0], trascina: true, colore: 2 },
        { tipo: 'testo', p: [0.1, 2.3], testo: 'numero {{p}}  →  radice {{p^(1/n)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto arancione sull\'asse x, prima fra 0 e 1 e poi oltre 1: la radice (curva blu) sta sopra o sotto la retta tratteggiata y = x? Poi alza l\'indice n.'
    }
  },

  esempi: [
    { titolo: 'Semplificare portando fuori', problema: R`Semplifica $\sqrt{200}$ portando fuori dal segno di radice tutti i fattori possibili.`, passi: [
      R`Cerco il più grande quadrato perfetto che divide $200$: $200 = 100 \cdot 2$, e $100 = 10^2$.`,
      R`Uso la proprietà del prodotto: $\sqrt{200} = \sqrt{10^2 \cdot 2} = \sqrt{10^2}\cdot\sqrt{2} = 10\sqrt{2}$.`,
      R`Verifica elevando al quadrato: $(10\sqrt{2})^2 = 100 \cdot 2 = 200$. ✓`
    ], risultato: R`$\sqrt{200} = 10\sqrt{2}$` },

    { titolo: 'Confrontare radicali con indici diversi', problema: R`Confronta $\sqrt{2}$ e $\sqrt[3]{4}$: quale dei due è maggiore?`, passi: [
      R`Gli indici sono diversi ($2$ e $3$): calcolo $\text{mcm}(2,3)=6$ e riduco entrambi i radicali all'indice $6$ con la proprietà invariantiva.`,
      R`$\sqrt{2} = \sqrt[6]{2^3} = \sqrt[6]{8}$ (indice ed esponente moltiplicati per $3$).`,
      R`$\sqrt[3]{4} = \sqrt[6]{4^2} = \sqrt[6]{16}$ (indice ed esponente moltiplicati per $2$).`,
      R`Con lo stesso indice si confrontano i radicandi: $16 > 8$, quindi $\sqrt[6]{16} > \sqrt[6]{8}$.`
    ], risultato: R`$\sqrt[3]{4} > \sqrt{2}$` },

    { titolo: 'Razionalizzare un binomio', problema: R`Razionalizza $\dfrac{5}{3+\sqrt{2}}$.`, passi: [
      R`Il denominatore è un binomio con una radice: moltiplico numeratore e denominatore per il razionalizzante $3-\sqrt{2}$, cioè lo stesso binomio con il segno centrale cambiato.`,
      R`Al denominatore c'è una somma per una differenza: $(3+\sqrt{2})(3-\sqrt{2})=3^2-(\sqrt{2})^2=9-2=7$. La radice è sparita.`,
      R`Al numeratore distribuisco il $5$: $5(3-\sqrt{2})=15-5\sqrt{2}$.`,
      R`Controllo che non si possa semplificare: $15$ e $5$ hanno il fattore $5$, ma $7$ no. La frazione resta così.`
    ], risultato: R`$\dfrac{15-5\sqrt{2}}{7}$` },

    { titolo: 'Esponente frazionario', problema: R`Calcola $27^{\frac{2}{3}}$ senza calcolatrice.`, passi: [
      R`Per definizione $a^{\frac{m}{n}}=\sqrt[n]{a^m}$: qui $27^{\frac{2}{3}}=\sqrt[3]{27^2}$.`,
      R`Conviene estrarre prima la radice: $\sqrt[3]{27^2}=(\sqrt[3]{27})^2$, e $\sqrt[3]{27}=3$.`,
      R`Resta da elevare al quadrato il risultato della radice: $3^2=9$.`
    ], risultato: R`$27^{\frac{2}{3}}=9$` },

    { titolo: 'Un\'equazione con soluzione estranea', problema: R`Risolvi $\sqrt{x+3}=x-3$.`, passi: [
      R`Condizioni: il radicando dev'essere $\ge0$: $x+3\ge0 \Rightarrow x\ge-3$. Il primo membro è sempre $\ge0$, quindi anche il secondo deve esserlo: $x-3\ge0 \Rightarrow x\ge3$.`,
      R`Elevo al quadrato entrambi i membri: $x+3=(x-3)^2=x^2-6x+9$.`,
      R`Porto tutto a un membro: $x^2-7x+6=0$, cioè $(x-1)(x-6)=0$: $x=1$ oppure $x=6$.`,
      R`Confronto con la condizione $x\ge3$: $x=1$ non la rispetta ed è una soluzione **estranea**, introdotta dall'elevamento al quadrato. Resta $x=6$.`,
      R`Verifica: $\sqrt{6+3}=\sqrt{9}=3$ e $6-3=3$. ✓`
    ], risultato: R`$x=6$ (mentre $x=1$ è una soluzione estranea, da scartare)` },

    { titolo: 'Sdoppiare un radicale doppio', problema: R`Scrivi $\sqrt{8-2\sqrt{15}}$ come differenza di due radicali semplici.`, passi: [
      R`Il radicale ha la forma $\sqrt{A-2\sqrt{B}}$ con $A=8$ e $B=15$: cerco due numeri con somma $8$ e prodotto $15$.`,
      R`Sono $5$ e $3$: infatti $5+3=8$ e $5\cdot 3=15$.`,
      R`Quindi $8-2\sqrt{15}=5+3-2\sqrt{5\cdot 3}=(\sqrt{5}-\sqrt{3})^2$.`,
      R`Estraggo la radice. Con il segno meno il numero più grande va davanti, perché il risultato di una radice quadrata deve essere positivo: $\sqrt{5}-\sqrt{3}$.`,
      R`Verifica: $(\sqrt{5}-\sqrt{3})^2=5-2\sqrt{15}+3=8-2\sqrt{15}$. ✓`
    ], risultato: R`$\sqrt{8-2\sqrt{15}}=\sqrt{5}-\sqrt{3}$` }
  ],

  formulario: [
    { nome: 'Radice n-esima', formula: R`\sqrt[n]{a} = b \quad \text{se } b^n = a`, nota: R`Se $n$ è pari serve $a \ge 0$ e si prende $b \ge 0$; se $n$ è dispari, $a$ può essere qualunque numero reale.` },
    { nome: 'Radice quadrata di un quadrato', formula: R`\sqrt{a^2} = |a|` },
    { nome: 'Proprietà invariantiva', formula: R`\sqrt[n]{a^m} = \sqrt[kn]{a^{km}}`, nota: R`Vale per ogni intero $k \ge 1$; se il radicando è negativo, l'indice deve restare dispari.` },
    { nome: 'Prodotto di radicali', formula: R`\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{a \cdot b}`, nota: R`Stesso indice; se $n$ è pari servono $a, b \ge 0$.` },
    { nome: 'Quoziente di radicali', formula: R`\frac{\sqrt[n]{a}}{\sqrt[n]{b}} = \sqrt[n]{\frac{a}{b}}`, nota: R`Con $b \ne 0$.` },
    { nome: 'Portare fuori dal segno di radice', formula: R`\sqrt[n]{a^n \cdot b} = |a|\sqrt[n]{b}`, nota: R`Se $n$ è dispari il valore assoluto non serve: $\sqrt[n]{a^n b} = a\sqrt[n]{b}$.` },
    { nome: 'Portare dentro il segno di radice', formula: R`a\sqrt[n]{b} = \sqrt[n]{a^n \cdot b}`, nota: R`Vale per $a \ge 0$; se $a<0$ e $n$ è pari, si porta dentro $|a|$ e si lascia il segno meno fuori.` },
    { nome: 'Potenza di un radicale', formula: R`(\sqrt[n]{a})^m = \sqrt[n]{a^m}` },
    { nome: 'Radice di radicale', formula: R`\sqrt[k]{\sqrt[n]{a}} = \sqrt[kn]{a}`, nota: R`Gli indici si moltiplicano.` },
    { nome: 'Somma di radicali simili', formula: R`p\sqrt[n]{a} + q\sqrt[n]{a} = (p+q)\sqrt[n]{a}` },
    { nome: 'Razionalizzazione (denominatore monomio)', formula: R`\frac{1}{\sqrt{a}} = \frac{\sqrt{a}}{a}` },
    { nome: 'Razionalizzazione (radice di indice n)', formula: R`\frac{1}{\sqrt[n]{a^m}} = \frac{\sqrt[n]{a^{n-m}}}{a}`, nota: R`Con $m < n$.` },
    { nome: 'Razionalizzazione (denominatore binomio)', formula: R`\frac{1}{a \pm \sqrt{b}} = \frac{a \mp \sqrt{b}}{a^2 - b}` },
    { nome: 'Potenza con esponente frazionario', formula: R`a^{\frac{m}{n}} = \sqrt[n]{a^m}`, nota: R`Si definisce solo per $a > 0$: con base negativa lo stesso esponente scritto in due modi ($\frac13$ e $\frac26$) darebbe risultati diversi.` },
    { nome: 'Radicale doppio', formula: R`\sqrt{(p+q) \pm 2\sqrt{pq}} = \sqrt{p} \pm \sqrt{q}`, nota: R`Con $p \ge q \ge 0$; utile quando $p+q=A$ e $pq=B$ sono numeri semplici.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'radice-n-esima', tipo: 'definizione', fronte: R`Che cos'è la radice $n$-esima di $a$?`, retro: R`Il numero $b$ (se esiste) tale che $b^n = a$; con $n$ pari si richiede $a \ge 0$ e $b \ge 0$.` },
    { id: 'fc-02', sezione: 'radice-n-esima', tipo: 'concetto', fronte: R`Perché $\sqrt{a}$ esiste solo per $a \ge 0$?`, retro: R`Perché nessun numero reale elevato al quadrato dà un risultato negativo.` },
    { id: 'fc-03', sezione: 'radice-n-esima', tipo: 'formula', fronte: R`Quanto vale $\sqrt{a^2}$?`, retro: R`$|a|$, non $a$: la radice quadrata è sempre non negativa.` },
    { id: 'fc-04', sezione: 'radice-n-esima', tipo: 'concetto', fronte: R`Radice con indice dispari di un numero negativo`, retro: R`Esiste sempre, con lo stesso segno del radicando: $\sqrt[3]{-8} = -2$.` },
    { id: 'fc-05', sezione: 'proprieta-invariantiva', tipo: 'definizione', fronte: R`Enuncia la proprietà invariantiva dei radicali`, retro: R`Moltiplicando (o dividendo) indice ed esponente del radicando per lo stesso numero, il valore del radicale non cambia.` },
    { id: 'fc-06', sezione: 'proprieta-invariantiva', tipo: 'procedura', fronte: R`Come si semplifica un radicale con la proprietà invariantiva?`, retro: R`Si dividono indice ed esponente del radicando per il loro MCD.` },
    { id: 'fc-07', sezione: 'riduzione-stesso-indice', tipo: 'procedura', fronte: R`Come si confrontano $\sqrt{2}$ e $\sqrt[3]{3}$?`, retro: R`Si riducono allo stesso indice (il mcm di $2$ e $3$, cioè $6$) e poi si confrontano i radicandi.` },
    { id: 'fc-08', sezione: 'moltiplicazione-divisione', tipo: 'formula', fronte: R`Prodotto di due radicali con lo stesso indice`, retro: R`$\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{ab}$.` },
    { id: 'fc-09', sezione: 'moltiplicazione-divisione', tipo: 'concetto', fronte: R`$\sqrt{a} + \sqrt{b}$ è uguale a $\sqrt{a+b}$?`, retro: R`No. La radice di una somma non è la somma delle radici (verificalo con $a=9$, $b=16$).` },
    { id: 'fc-10', sezione: 'trasporto-segno-radice', tipo: 'procedura', fronte: R`Come si porta un fattore fuori dal segno di radice?`, retro: R`Si scompone il radicando isolando una potenza con esponente multiplo dell'indice, e la si estrae.` },
    { id: 'fc-11', sezione: 'trasporto-segno-radice', tipo: 'concetto', fronte: R`Perché $-3\sqrt{2}$ non si scrive $\sqrt{-18}$?`, retro: R`Con indice pari il radicale non è mai negativo: il segno meno resta fuori, dentro si porta solo $|-3| = 3$.` },
    { id: 'fc-12', sezione: 'potenza-radice-di-radicale', tipo: 'formula', fronte: R`Potenza di un radicale`, retro: R`$(\sqrt[n]{a})^m = \sqrt[n]{a^m}$.` },
    { id: 'fc-13', sezione: 'potenza-radice-di-radicale', tipo: 'formula', fronte: R`Radice di un'altra radice`, retro: R`$\sqrt[k]{\sqrt[n]{a}} = \sqrt[kn]{a}$: gli indici si moltiplicano.` },
    { id: 'fc-14', sezione: 'addizione-radicali-simili', tipo: 'definizione', fronte: R`Quando due radicali si dicono simili?`, retro: R`Quando, dopo aver semplificato, hanno lo stesso indice e lo stesso radicando.` },
    { id: 'fc-15', sezione: 'addizione-radicali-simili', tipo: 'procedura', fronte: R`Come si sommano $3\sqrt{2}$ e $-\sqrt{8}$?`, retro: R`Si semplifica $\sqrt{8}=2\sqrt{2}$; ora sono simili: $3\sqrt{2}-2\sqrt{2}=\sqrt{2}$.` },
    { id: 'fc-16', sezione: 'razionalizzazione', tipo: 'procedura', fronte: R`Come si razionalizza $\dfrac{1}{\sqrt{a}}$?`, retro: R`Si moltiplica numeratore e denominatore per $\sqrt{a}$: si ottiene $\dfrac{\sqrt{a}}{a}$.` },
    { id: 'fc-17', sezione: 'razionalizzazione', tipo: 'procedura', fronte: R`Come si razionalizza $\dfrac{1}{\sqrt[n]{a^m}}$ (con $m<n$)?`, retro: R`Si moltiplica per $\sqrt[n]{a^{n-m}}$, così l'esponente del radicando diventa $n$ e la radice sparisce.` },
    { id: 'fc-18', sezione: 'razionalizzazione', tipo: 'procedura', fronte: R`Come si razionalizza $\dfrac{1}{a+\sqrt{b}}$?`, retro: R`Si moltiplica per il razionalizzante $a-\sqrt{b}$: al denominatore resta $a^2-b$.` },
    { id: 'fc-19', sezione: 'esponente-frazionario', tipo: 'formula', fronte: R`Definizione di potenza con esponente frazionario`, retro: R`$a^{\frac{m}{n}} = \sqrt[n]{a^m}$, per $a>0$.` },
    { id: 'fc-20', sezione: 'esponente-frazionario', tipo: 'concetto', fronte: R`Perché $a^{\frac{m}{n}}$ si definisce solo per $a>0$?`, retro: R`Con base negativa si cade in contraddizione: $(-8)^{\frac13}=-2$, ma $(-8)^{\frac26}=\sqrt[6]{64}=2$, anche se $\frac13=\frac26$.` },
    { id: 'fc-21', sezione: 'radicali-doppi', tipo: 'definizione', fronte: R`Che cos'è un radicale doppio?`, retro: R`Un'espressione del tipo $\sqrt{a \pm \sqrt{b}}$, cioè una radice quadrata che contiene un'altra radice quadrata.` },
    { id: 'fc-22', sezione: 'radicali-doppi', tipo: 'formula', fronte: R`Come si sdoppia $\sqrt{A+2\sqrt{B}}$?`, retro: R`Si cercano $p,q$ con $p+q=A$ e $pq=B$: allora $\sqrt{A+2\sqrt{B}}=\sqrt{p}+\sqrt{q}$.` },
    { id: 'fc-23', sezione: 'espressioni-equazioni', tipo: 'procedura', fronte: R`Passi per risolvere $\sqrt{f(x)}=c$`, retro: R`C.e. $f(x)\ge0$; se $c<0$ impossibile; altrimenti si eleva al quadrato e si verifica la soluzione.` },
    { id: 'fc-24', sezione: 'espressioni-equazioni', tipo: 'concetto', fronte: R`Quando $\sqrt{f(x)}=c$ non ha soluzioni?`, retro: R`Quando $c<0$: il radicale aritmetico non è mai negativo, qualunque sia $f(x)$.` }
  ],

  esercizi: [
    /* allenamento: prodotti, quozienti, portare fuori, semplificare, razionalizzare; numeri piccoli */
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola $\sqrt{2}\cdot\sqrt{8}$.`, suggerimenti: [R`Stesso indice: metti i radicandi sotto un'unica radice.`], risposta: rad('4'), soluzione: [R`Moltiplico i radicandi: $\sqrt{2\cdot 8}=\sqrt{16}$.`, R`$\sqrt{16}=4$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $\sqrt{3}\cdot\sqrt{5}$. Per la radice scrivi √ oppure *rad*.`, suggerimenti: [R`Stesso indice: moltiplica i radicandi.`], risposta: rad('√15'), soluzione: [R`$\sqrt{3}\cdot\sqrt{5}=\sqrt{3\cdot 5}=\sqrt{15}$.`, R`$15=3\cdot 5$ non contiene quadrati: il risultato resta $\sqrt{15}$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $\dfrac{\sqrt{50}}{\sqrt{2}}$.`, suggerimenti: [R`Stesso indice: dividi i radicandi.`], risposta: rad('5'), soluzione: [R`Divido i radicandi: $\sqrt{\dfrac{50}{2}}=\sqrt{25}$.`, R`$\sqrt{25}=5$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Semplifica $\sqrt{12}$ portando fuori un fattore.`, suggerimenti: [R`Cerca un quadrato perfetto che divide $12$.`, R`$12=4\cdot 3$.`], risposta: rad('2√3'), soluzione: [R`$12=4\cdot 3$, e $4=2^2$.`, R`Il $2$ esce: $\sqrt{12}=2\sqrt{3}$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Semplifica $\sqrt{18}$ portando fuori un fattore.`, suggerimenti: [R`Cerca un quadrato perfetto che divide $18$.`, R`$18=9\cdot 2$.`], risposta: rad('3√2'), soluzione: [R`$18=9\cdot 2$, e $9=3^2$.`, R`Il $3$ esce: $\sqrt{18}=3\sqrt{2}$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Semplifica $\sqrt[4]{9}$ con la proprietà invariantiva.`, suggerimenti: [R`Scrivi $9$ come potenza: $9=3^2$.`, R`Dividi per $2$ l'indice e l'esponente.`], risposta: rad('√3'), soluzione: [R`$\sqrt[4]{9}=\sqrt[4]{3^2}$.`, R`Divido indice ed esponente per $2$: $\sqrt[2]{3^1}=\sqrt{3}$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola $\sqrt[3]{2}\cdot\sqrt[3]{4}$.`, suggerimenti: [R`Stesso indice $3$: moltiplica i radicandi.`, R`$2\cdot 4=8$, che è un cubo.`], risposta: rad('2'), soluzione: [R`Moltiplico i radicandi: $\sqrt[3]{2\cdot 4}=\sqrt[3]{8}$.`, R`$\sqrt[3]{8}=2$, perché $2^3=8$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Semplifica $\sqrt{50}$ portando fuori un fattore.`, suggerimenti: [R`Cerca un quadrato perfetto che divide $50$.`, R`$50=25\cdot 2$.`], risposta: rad('5√2'), soluzione: [R`$50=25\cdot 2$, e $25=5^2$.`, R`Il $5$ esce: $\sqrt{50}=5\sqrt{2}$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Razionalizza $\dfrac{1}{\sqrt{3}}$. Scrivi la frazione con la barra, per esempio √2/2.`, suggerimenti: [R`Moltiplica sopra e sotto per $\sqrt{3}$.`], risposta: rad('√3/3', '(√3)/3', '(1/3)√3', '1/3√3'), soluzione: [R`Moltiplico sopra e sotto per $\sqrt{3}$: $\dfrac{1\cdot\sqrt{3}}{\sqrt{3}\cdot\sqrt{3}}$.`, R`Sotto $\sqrt{3}\cdot\sqrt{3}=3$: il risultato è $\dfrac{\sqrt{3}}{3}$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Semplifica $\sqrt[6]{27}$ con la proprietà invariantiva.`, suggerimenti: [R`Scrivi $27$ come potenza di $3$.`, R`$27=3^3$: dividi indice ed esponente per $3$.`], risposta: rad('√3'), soluzione: [R`$27=3^3$, quindi $\sqrt[6]{27}=\sqrt[6]{3^3}$.`, R`Divido indice ed esponente per $3$: $\sqrt[2]{3^1}=\sqrt{3}$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Semplifica $\sqrt{45}$ portando fuori un fattore.`, suggerimenti: [R`Cerca un quadrato perfetto che divide $45$.`, R`$45=9\cdot 5$.`], risposta: rad('3√5'), soluzione: [R`$45=9\cdot 5$, e $9=3^2$.`, R`Il $3$ esce: $\sqrt{45}=3\sqrt{5}$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Razionalizza $\dfrac{6}{\sqrt{2}}$ e semplifica.`, suggerimenti: [R`Moltiplica sopra e sotto per $\sqrt{2}$.`, R`Alla fine semplifica il $6$ con il $2$.`], risposta: rad('3√2'), soluzione: [R`Moltiplico sopra e sotto per $\sqrt{2}$: $\dfrac{6\sqrt{2}}{2}$.`, R`Semplifico $6$ con $2$: $3\sqrt{2}$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Calcola $\sqrt{2}\cdot\sqrt{6}$ e porta fuori quello che puoi.`, suggerimenti: [R`Prima moltiplica i radicandi.`, R`Ottieni $\sqrt{12}$: ora porta fuori.`], risposta: rad('2√3'), soluzione: [R`Moltiplico i radicandi: $\sqrt{2\cdot 6}=\sqrt{12}$.`, R`$12=4\cdot 3$.`, R`Il $2$ esce: $2\sqrt{3}$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Calcola $2\sqrt{3}\cdot 5\sqrt{3}$.`, suggerimenti: [R`Moltiplica i numeri fuori fra loro e le radici fra loro.`, R`$\sqrt{3}\cdot\sqrt{3}=3$.`], risposta: rad('30'), soluzione: [R`Numeri fuori: $2\cdot 5=10$.`, R`Radici: $\sqrt{3}\cdot\sqrt{3}=3$.`, R`Risultato: $10\cdot 3=30$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Semplifica $\sqrt{48}$ portando fuori tutto quello che puoi.`, suggerimenti: [R`Cerca il quadrato perfetto più grande che divide $48$.`, R`$48=16\cdot 3$.`], risposta: rad('4√3'), soluzione: [R`$48=16\cdot 3$, e $16=4^2$.`, R`Il $4$ esce: $\sqrt{48}=4\sqrt{3}$.`, R`Se usi $48=4\cdot 12$ ottieni $2\sqrt{12}$: da $\sqrt{12}$ esce ancora un $2$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Razionalizza $\dfrac{10}{\sqrt{5}}$ e semplifica.`, suggerimenti: [R`Moltiplica sopra e sotto per $\sqrt{5}$.`, R`Alla fine semplifica il $10$ con il $5$.`], risposta: rad('2√5'), soluzione: [R`Moltiplico sopra e sotto per $\sqrt{5}$: $\dfrac{10\sqrt{5}}{5}$.`, R`Semplifico $10$ con $5$: $2\sqrt{5}$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Calcola $\sqrt{3}\cdot\sqrt{15}$ e porta fuori quello che puoi.`, suggerimenti: [R`Prima moltiplica i radicandi.`, R`$3\cdot 15=45=9\cdot 5$.`], risposta: rad('3√5'), soluzione: [R`Moltiplico i radicandi: $\sqrt{3\cdot 15}=\sqrt{45}$.`, R`$45=9\cdot 5$.`, R`Il $3$ esce: $3\sqrt{5}$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Calcola $\sqrt{12}+\sqrt{27}$.`, suggerimenti: [R`Così non sono simili: porta fuori in tutti e due.`, R`$\sqrt{12}=2\sqrt{3}$ e $\sqrt{27}=3\sqrt{3}$.`], risposta: rad('5√3'), soluzione: [R`$\sqrt{12}=\sqrt{4\cdot 3}=2\sqrt{3}$.`, R`$\sqrt{27}=\sqrt{9\cdot 3}=3\sqrt{3}$.`, R`Sono simili: sommo i coefficienti, $2\sqrt{3}+3\sqrt{3}=5\sqrt{3}$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Razionalizza $\dfrac{4}{\sqrt{6}}$ e semplifica. Scrivi la frazione con la barra.`, suggerimenti: [R`Moltiplica sopra e sotto per $\sqrt{6}$.`, R`Ottieni $\dfrac{4\sqrt{6}}{6}$: semplifica $4$ e $6$ per $2$.`], risposta: rad('2√6/3', '(2√6)/3', '(2/3)√6', '2/3√6'), soluzione: [R`Moltiplico sopra e sotto per $\sqrt{6}$: $\dfrac{4\sqrt{6}}{6}$.`, R`Divido $4$ e $6$ per $2$: $\dfrac{2\sqrt{6}}{3}$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Calcola $\sqrt{50}-\sqrt{8}$.`, suggerimenti: [R`Così non sono simili: porta fuori in tutti e due.`, R`$\sqrt{50}=5\sqrt{2}$ e $\sqrt{8}=2\sqrt{2}$.`], risposta: rad('3√2'), soluzione: [R`$\sqrt{50}=\sqrt{25\cdot 2}=5\sqrt{2}$.`, R`$\sqrt{8}=\sqrt{4\cdot 2}=2\sqrt{2}$.`, R`Sono simili: $5\sqrt{2}-2\sqrt{2}=3\sqrt{2}$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Semplifica $\sqrt{75}$ portando fuori dal segno di radice tutti i fattori possibili.`, suggerimenti: [R`Scomponi $75$ cercando il più grande quadrato perfetto che lo divide.`, R`$75 = 25 \cdot 3$.`], risposta: { tipo: 'testo', accettate: ['5√3', '5*sqrt(3)', '5 sqrt 3', '5sqrt(3)', '5sqrt3'] }, soluzione: [R`$75 = 25 \cdot 3$, e $25=5^2$.`, R`$\sqrt{75}=\sqrt{25\cdot3}=\sqrt{25}\cdot\sqrt{3}=5\sqrt{3}$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $\sqrt{3} \cdot \sqrt{12}$.`, suggerimenti: [R`Con lo stesso indice, moltiplica i radicandi.`, R`$3 \cdot 12 = 36$, un quadrato perfetto.`], risposta: { tipo: 'numero', valore: 6 }, soluzione: [R`$\sqrt{3}\cdot\sqrt{12}=\sqrt{3\cdot12}=\sqrt{36}$.`, R`$\sqrt{36}=6$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Semplifica $\sqrt[4]{36}$ usando la proprietà invariantiva.`, suggerimenti: [R`Scrivi $36$ come potenza: $36=6^2$.`, R`L'indice è $4$, l'esponente è $2$: dividili per il loro MCD.`], risposta: { tipo: 'testo', accettate: ['√6', 'sqrt(6)', 'sqrt 6'] }, soluzione: [R`$36=6^2$, quindi $\sqrt[4]{36}=\sqrt[4]{6^2}$.`, R`Il MCD tra indice $4$ ed esponente $2$ è $2$: dividendo entrambi si ottiene $\sqrt{6}$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Un cubo ha volume $125\ \text{cm}^3$. Calcola la misura dello spigolo.`, suggerimenti: [R`Se $\ell$ è lo spigolo, $\ell^3 = 125$.`, R`Estrai la radice cubica di $125$.`], risposta: { tipo: 'numero', valore: 5 }, soluzione: [R`Il volume di un cubo di spigolo $\ell$ è $\ell^3$: $\ell^3=125$.`, R`$\ell=\sqrt[3]{125}=5$ (perché $5^3=125$), misurato in cm.`] },
    { id: 'es-05', difficolta: 2, testo: R`Calcola $3\sqrt{5}+2\sqrt{5}-\sqrt{5}$.`, suggerimenti: [R`I tre radicali sono già simili: stesso indice, stesso radicando.`, R`Somma i coefficienti: $3+2-1$.`], risposta: { tipo: 'testo', accettate: ['4√5', '4*sqrt(5)', '4 sqrt 5', '4sqrt(5)', '4sqrt5'] }, soluzione: [R`Sono radicali simili (stesso indice $2$, stesso radicando $5$).`, R`$3\sqrt{5}+2\sqrt{5}-\sqrt{5}=(3+2-1)\sqrt{5}=4\sqrt{5}$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Scrivi $-2\sqrt{7}$ portando il fattore $2$ dentro il segno di radice.`, suggerimenti: [R`Il segno meno resta fuori dal radicale (l'indice è pari).`, R`Eleva $2$ al quadrato e moltiplicalo per $7$.`], risposta: { tipo: 'testo', accettate: ['-√28', '-sqrt(28)', '-sqrt 28', '-sqrt28'] }, soluzione: [R`$2\sqrt{7}=\sqrt{2^2\cdot7}=\sqrt{28}$.`, R`Il segno meno non entra (indice pari, radicale mai negativo): $-2\sqrt{7}=-\sqrt{28}$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Razionalizza $\dfrac{1}{\sqrt{5}}$.`, suggerimenti: [R`Moltiplica numeratore e denominatore per $\sqrt{5}$.`, R`Al denominatore ottieni $(\sqrt{5})^2=5$.`], risposta: { tipo: 'testo', accettate: ['√5/5', 'sqrt(5)/5', 'sqrt5/5'] }, soluzione: [R`$\dfrac{1}{\sqrt{5}}\cdot\dfrac{\sqrt{5}}{\sqrt{5}}=\dfrac{\sqrt{5}}{5}$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Calcola $16^{\frac{3}{4}}$ senza calcolatrice.`, suggerimenti: [R`Usa $a^{\frac{m}{n}}=\sqrt[n]{a^m}$: qui $n=4$, $m=3$.`, R`Conviene calcolare prima $\sqrt[4]{16}=2$, poi elevare al cubo.`], risposta: { tipo: 'numero', valore: 8 }, soluzione: [R`$16^{\frac{3}{4}}=(\sqrt[4]{16})^3$.`, R`$\sqrt[4]{16}=2$ (perché $2^4=16$), quindi $2^3=8$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Razionalizza $\dfrac{3}{2-\sqrt{3}}$.`, suggerimenti: [R`Il razionalizzante di $2-\sqrt{3}$ è $2+\sqrt{3}$.`, R`Al denominatore userai $2^2-3$.`], risposta: { tipo: 'testo', accettate: ['6+3√3', '6+3*sqrt(3)', '6+3 sqrt 3', '6+3sqrt(3)', '6+3sqrt3', '3√3+6', '3(2+√3)', '3rad3+6', '6+3rad3'] }, soluzione: [R`$\dfrac{3}{2-\sqrt{3}}\cdot\dfrac{2+\sqrt{3}}{2+\sqrt{3}}=\dfrac{3(2+\sqrt{3})}{4-3}$.`, R`$\dfrac{6+3\sqrt{3}}{1}=6+3\sqrt{3}$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Risolvi l'equazione irrazionale $\sqrt{2x-3}=3$, verificando le condizioni.`, suggerimenti: [R`Scrivi prima la condizione $2x-3\ge0$.`, R`Eleva al quadrato entrambi i membri.`], risposta: { tipo: 'numero', valore: 6 }, soluzione: [R`Condizione: $2x-3\ge0 \Rightarrow x\ge\dfrac32$.`, R`Elevo al quadrato: $2x-3=9 \Rightarrow x=6$.`, R`$x=6$ rispetta la condizione: è accettabile. Verifica: $\sqrt{9}=3$. ✓`] },
    { id: 'es-11', difficolta: 3, testo: R`Scrivi $\sqrt{7+2\sqrt{10}}$ come somma di due radicali semplici (radicale doppio).`, suggerimenti: [R`Cerca due numeri $p,q$ con $p+q=7$ e $pq=10$.`, R`Sono le soluzioni di $t^2-7t+10=0$.`], risposta: { tipo: 'testo', accettate: ['√5+√2', 'sqrt(5)+sqrt(2)', 'sqrt5+sqrt2', '√2+√5', 'sqrt(2)+sqrt(5)', 'sqrt2+sqrt5'] }, soluzione: [R`Cerco $p+q=7$, $pq=10$: sono $5$ e $2$.`, R`$\sqrt{7+2\sqrt{10}}=\sqrt{5}+\sqrt{2}$.`, R`Verifica: $(\sqrt{5}+\sqrt{2})^2=5+2+2\sqrt{10}=7+2\sqrt{10}$. ✓`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è la condizione sul radicando quando l'indice della radice è pari?`, opzioni: [R`Il radicando è sempre positivo`, R`Non c'è nessuna condizione`, R`Il radicando dev'essere maggiore o uguale a zero`, R`Il radicando dev'essere negativo`], corretta: 2, spiegazione: R`Con indice pari nessun numero reale elevato a quella potenza dà un risultato negativo: il radicando deve essere $\ge 0$ perché la radice esista in $\mathbb{R}$.` },
    { id: 'q-02', domanda: R`Quanto vale $\sqrt{a^2}$ per un numero reale $a$ qualunque?`, opzioni: [R`$a$`, R`$|a|$`, R`$-a$`, R`$a^2$`], corretta: 1, spiegazione: R`La radice quadrata restituisce sempre un valore non negativo: se $a<0$, $\sqrt{a^2}=-a=|a|$, non $a$.` },
    { id: 'q-03', domanda: R`Con indice dispari, il radicando può essere...`, opzioni: [R`solo i numeri positivi`, R`solo lo zero`, R`solo i numeri negativi`, R`qualunque numero reale`], corretta: 3, spiegazione: R`Con indice dispari la radice esiste sempre, qualunque sia il segno del radicando, e ha lo stesso segno del radicando.` },
    { id: 'q-04', domanda: R`Che cosa afferma la proprietà invariantiva dei radicali?`, opzioni: [R`Che moltiplicare (o dividere) indice ed esponente del radicando per lo stesso numero non cambia il valore del radicale`, R`Che si può cambiare il segno del radicando senza problemi`, R`Che si possono sommare due radicali qualsiasi`, R`Che elimina sempre l'indice della radice`], corretta: 0, spiegazione: R`È esattamente la definizione della proprietà invariantiva; non riguarda somme di radicali né il segno del radicando.` },
    { id: 'q-05', domanda: R`Per confrontare $\sqrt{2}$ e $\sqrt[3]{3}$, cosa conviene fare?`, opzioni: [R`Elevarli entrambi al quadrato`, R`Sommare i radicandi`, R`Ridurli allo stesso indice e confrontare i radicandi`, R`Confrontare direttamente gli indici`], corretta: 2, spiegazione: R`Con indici diversi il confronto diretto non ha senso: si riducono allo stesso indice (il mcm) con la proprietà invariantiva, poi si confrontano i radicandi.` },
    { id: 'q-06', domanda: R`Il prodotto $\sqrt{a} \cdot \sqrt{b}$ (con $a, b \ge 0$, stesso indice) è uguale a:`, opzioni: [R`$\sqrt{a+b}$`, R`$\sqrt{ab}$`, R`$a\sqrt{b}$`, R`$\sqrt{a}+\sqrt{b}$`], corretta: 1, spiegazione: R`Con lo stesso indice, il prodotto di radicali è il radicale del prodotto dei radicandi: $\sqrt{a}\cdot\sqrt{b}=\sqrt{ab}$.` },
    { id: 'q-07', domanda: R`Quali radicali si dicono "simili"?`, opzioni: [R`Quelli con lo stesso indice e lo stesso radicando`, R`Quelli con lo stesso segno`, R`Quelli con lo stesso valore numerico`, R`Quelli con lo stesso indice ma radicandi diversi`], corretta: 0, spiegazione: R`Solo radicali con indice e radicando (semplificati) uguali sono simili, e solo quelli si possono sommare direttamente.` },
    { id: 'q-08', domanda: R`Portare un fattore "dentro" il segno di radice significa...`, opzioni: [R`Semplificare il radicale dividendo per il MCD`, R`Cambiare l'indice della radice`, R`Eliminare il radicando`, R`Elevare il fattore alla potenza pari all'indice e moltiplicarlo per il radicando`], corretta: 3, spiegazione: R`È l'operazione inversa del portare fuori: si eleva il fattore alla potenza uguale all'indice e lo si moltiplica dentro il radicando.` },
    { id: 'q-09', domanda: R`Se $a<0$ e $n$ è pari, come si porta $a$ dentro $\sqrt[n]{b}$ nell'espressione $a\cdot\sqrt[n]{b}$?`, opzioni: [R`Si porta dentro $a$ così com'è`, R`Si porta dentro $|a|$ e si lascia il segno meno davanti al radicale`, R`Non si può fare l'operazione`, R`Si cambia l'indice in dispari`], corretta: 1, spiegazione: R`Il radicale con indice pari non è mai negativo: si porta dentro il valore assoluto e il segno meno resta fuori, altrimenti si scriverebbe la radice di un numero negativo.` },
    { id: 'q-10', domanda: R`$(\sqrt[n]{a})^m$ è uguale a:`, opzioni: [R`$\sqrt[n]{a^m}$`, R`$\sqrt[m]{a^n}$`, R`$n \cdot a^m$`, R`$a^{n/m}$`], corretta: 0, spiegazione: R`La potenza di un radicale si porta dentro come esponente del radicando, senza toccare l'indice: $(\sqrt[n]{a})^m=\sqrt[n]{a^m}$.` },
    { id: 'q-11', domanda: R`Qual è il primo passo per razionalizzare $\dfrac{1}{a+\sqrt{b}}$?`, opzioni: [R`Elevare tutto al quadrato`, R`Moltiplicare solo il numeratore per $\sqrt{b}$`, R`Moltiplicare numeratore e denominatore per $a-\sqrt{b}$`, R`Sommare $a$ e $\sqrt{b}$`], corretta: 2, spiegazione: R`Si moltiplica per il razionalizzante $a-\sqrt{b}$, sia sopra che sotto, sfruttando la differenza di quadrati per eliminare la radice dal denominatore.` },
    { id: 'q-12', domanda: R`Perché si usa proprio $a-\sqrt{b}$ come razionalizzante di $a+\sqrt{b}$?`, opzioni: [R`Perché annulla il numeratore`, R`Perché $(a+\sqrt{b})(a-\sqrt{b})=a^2-b$ elimina la radice dal denominatore`, R`Perché riduce l'indice della radice`, R`Perché cambia il segno di $a$`], corretta: 1, spiegazione: R`È la differenza di quadrati: il prodotto di un binomio per il suo "coniugato" elimina il termine con la radice.` },
    { id: 'q-13', domanda: R`L'esponente frazionario $a^{\frac{m}{n}}$ equivale a:`, opzioni: [R`$\sqrt[n]{a^m}$`, R`$\sqrt[m]{a^n}$`, R`$\dfrac{a^n}{m}$`, R`$\dfrac{m}{n}\cdot a$`], corretta: 0, spiegazione: R`Il denominatore dell'esponente è l'indice della radice, il numeratore è l'esponente del radicando: $a^{\frac{m}{n}}=\sqrt[n]{a^m}$.` },
    { id: 'q-14', domanda: R`Perché la potenza $a^{\frac{m}{n}}$ si definisce solo per $a>0$?`, opzioni: [R`Perché le radici di un numero negativo non esistono mai`, R`Perché con base negativa lo stesso esponente scritto in due modi darebbe risultati diversi`, R`Perché con base negativa il risultato sarebbe sempre zero`, R`Perché gli esponenti frazionari valgono solo per basi intere`], corretta: 1, spiegazione: R`$(-8)^{\frac13}$ darebbe $\sqrt[3]{-8}=-2$, mentre $(-8)^{\frac26}$ darebbe $\sqrt[6]{64}=2$, anche se $\frac13=\frac26$. Non è vero invece che le radici dei numeri negativi non esistono mai: quelle di indice dispari dei numeri negativi esistono, per esempio $\sqrt[3]{-8}=-2$.` },
    { id: 'q-15', domanda: R`Un "radicale doppio" è un'espressione del tipo:`, opzioni: [R`$\sqrt{a \pm \sqrt{b}}$`, R`Un radicale con indice maggiore di $10$`, R`La somma di due radicali qualsiasi`, R`Un radicale con radicando negativo`], corretta: 0, spiegazione: R`Il radicale doppio è una radice quadrata che contiene un'altra radice quadrata al suo interno.` },
    { id: 'q-16', domanda: R`Prima di elevare al quadrato per risolvere $\sqrt{f(x)}=c$, quale condizione va verificata?`, opzioni: [R`Che $f(x)$ sia negativo`, R`Che $c$ sia negativo`, R`Che $c$ sia maggiore o uguale a zero`, R`Nessuna condizione è necessaria`], corretta: 2, spiegazione: R`Il radicale aritmetico non è mai negativo: se $c<0$ l'equazione è già impossibile, senza bisogno di calcoli. Va controllata anche la condizione di esistenza $f(x)\ge0$.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`$\sqrt{a^2}$ non è $a$, è $|a|$: dimenticarlo quando $a$ potrebbe essere negativo porta a un segno sbagliato.` },
    { tipo: 'errore', testo: R`$\sqrt{a}+\sqrt{b}$ non è $\sqrt{a+b}$: i radicali si sommano solo se sono simili, mai sommando i radicandi.` },
    { tipo: 'trucco', testo: R`Prima di moltiplicare o dividere due radicali, controlla che abbiano lo stesso indice: se non ce l'hanno, riducili prima con la proprietà invariantiva.` },
    { tipo: 'metodo', testo: R`Per portare fuori un fattore, scomponi il radicando in fattori: le potenze con esponente maggiore o uguale all'indice escono, il resto rimane dentro.` },
    { tipo: 'errore', testo: R`Portando dentro un fattore negativo con indice pari, il segno meno resta fuori dal radicale: non esiste la radice quadrata di un numero negativo.` },
    { tipo: 'trucco', testo: R`Per razionalizzare un binomio $a\pm\sqrt{b}$, moltiplica sempre per il coniugato $a\mp\sqrt{b}$: la differenza di quadrati elimina la radice dal denominatore.` },
    { tipo: 'metodo', testo: R`In un'equazione con la radice isolata, dopo aver elevato alla potenza controlla sempre le condizioni scritte all'inizio: potresti aver introdotto una soluzione estranea.` },
    { tipo: 'errore', testo: R`Se risolvendo $\sqrt{f(x)}=c$ risulta $c<0$, l'equazione non ha soluzioni: nessun valore reale rende negativo un radicale con indice pari.` },
    { tipo: 'trucco', testo: R`Nell'esponente frazionario $a^{\frac{m}{n}}$ il denominatore è l'indice della radice e il numeratore è l'esponente del radicando: conviene calcolare prima la radice, poi la potenza, con numeri più piccoli.` }
  ],

  aneddoti: [
    { matematico: 'Ippaso di Metaponto (scuola pitagorica)', anni: 'V secolo a.C.', titolo: 'Il segreto della diagonale del quadrato', testo: R`I pitagorici credevano che "tutto è numero", cioè che ogni lunghezza si potesse esprimere come rapporto di due numeri interi. Applicando il teorema di Pitagora a un quadrato di lato $1$, la diagonale misura $\sqrt{2}$. Secondo la tradizione fu un membro della scuola, Ippaso di Metaponto, ad accorgersi che $\sqrt{2}$ **non** si può scrivere come frazione. Per i pitagorici fu uno scandalo, perché la scoperta smentiva l'idea su cui fondavano la loro visione del mondo. Si racconta che Ippaso sia stato annegato in mare dai suoi stessi compagni per aver rivelato il segreto fuori dalla setta, ma è una leggenda antica e non un fatto documentato.`, legame: R`$\sqrt{2}$ è il primo numero irrazionale della storia: proprio i numeri sotto radice che non si semplificano in una frazione danno senso a tutto questo argomento.` },
    { matematico: 'Teodoro di Cirene', anni: 'circa 465–398 a.C.', titolo: 'Una spirale di radici, fino a diciassette', testo: R`Nel dialogo *Teeteto* Platone racconta che Teodoro, maestro del giovane Teeteto, aveva dimostrato una per una che $\sqrt{3}$, $\sqrt{5}$, $\sqrt{6}$ e le altre radici di numeri non quadrati, fino a $\sqrt{17}$, sono irrazionali. Come ci sia riuscito non lo sappiamo: Platone non lo dice. Una delle ricostruzioni proposte in tempi moderni è una catena di triangoli rettangoli con un cateto lungo $1$, attaccati l'uno all'altro: le ipotenuse misurano $\sqrt{2}$, $\sqrt{3}$, $\sqrt{4}$, $\sqrt{5}$ e così via, e insieme disegnano una spirale, oggi chiamata **spirale di Teodoro**. Il triangolo di ipotenusa $\sqrt{17}$ è l'ultimo prima che la spirale cominci a sovrapporsi a sé stessa, e secondo alcuni storici questo spiegherebbe perché Teodoro si fermò proprio lì. È un'ipotesi suggestiva, non una certezza.`, legame: R`Ogni gradino della spirale è un'applicazione del teorema di Pitagora che produce una nuova radice quadrata: $\sqrt{n}$ diventa un cateto e l'ipotenusa successiva è $\sqrt{n+1}$.` },
    { matematico: 'Erone di Alessandria (e gli scribi babilonesi)', anni: 'I secolo d.C.; le tavolette babilonesi, circa 1800 a.C.', titolo: 'Come si calcolava una radice quadrata prima delle calcolatrici', testo: R`Molto prima delle calcolatrici, si calcolavano le radici quadrate per approssimazioni successive. Una tavoletta babilonese (nota come YBC 7289) riporta un'approssimazione di $\sqrt{2}$ corretta fino alla quinta cifra decimale. Il metodo, descritto esplicitamente secoli dopo da Erone di Alessandria nella sua opera *Metrica*, è semplice: si parte da una stima $x_0$, e si migliora ripetutamente con la media fra la stima e il numero diviso per la stima, $x_{n+1} = \dfrac{1}{2}\left(x_n + \dfrac{a}{x_n}\right)$. Ogni passo raddoppia circa il numero di cifre corrette. È lo stesso principio che userebbe, molti secoli dopo, il metodo di Newton per le equazioni in generale.`, legame: R`Anche oggi calcolatrici e computer calcolano $\sqrt{a}$ con un procedimento che assomiglia moltissimo a questo, non con una formula chiusa.` },
    { matematico: 'Rafael Bombelli', anni: '1526–1572', titolo: 'Radici dentro radici, per far tornare i conti', testo: R`Ingegnere idraulico bolognese, Bombelli si imbatté in espressioni con radici annidate una dentro l'altra lavorando sulla formula di Cardano per le equazioni di terzo grado: casi in cui la formula, pur avendo soluzioni reali evidenti, passava per radici quadrate di numeri negativi nascoste dentro altre radici. Invece di scartarle come "impossibili", come facevano i suoi contemporanei, Bombelli si mise a calcolare con questi oggetti scomodi, scoprendo le regole che permettevano di farli sparire e ritrovare la soluzione reale di partenza. Il suo trattato *L'Algebra* (1572) è tra i primi a trattare sistematicamente il calcolo con espressioni di questo tipo.`, legame: R`Il modo in cui oggi si sdoppia un radicale doppio, riscrivendo $\sqrt{a+\sqrt{b}}$ come somma di due radicali più semplici, nasce dalla stessa necessità di Bombelli: rendere maneggevole un'espressione con una radice dentro un'altra.` }
  ]
});
})();
