/* Laboratorio «Marea»: incorpora l'app Marea (disequazioni di secondo grado piegando una barra e alzando il mare).
   Schermata singola: l'iframe è la scena e riempie tutto lo spazio; sotto, una riga sottile col
   collegamento all'app intera. La modalità libera sta dentro Marea (app esterna): qui non si aggiunge. */
(function () {
  const STILE = `
    /* niente pannello a destra in orizzontale: l'app porta già tutto dentro di sé, fuori resta solo il collegamento */
    @container lab (min-aspect-ratio: 5 / 4) {
      .lab-marea .lab-layout { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) auto; }
      .lab-marea .lab-layout > .lab-lato { border-left: 0; border-top: 1px solid var(--bordo); padding: 6px 12px; }
    }
    .lab-marea .lab-scena { background: #0d3b5c; }
    .lab-marea .lab-scena > .lab-iframe { width: 100%; height: 100%; border: 0; display: block; }
    .lab-marea .lab-lato { flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: center; gap: 4px 14px; padding: 6px 12px; }
    .lab-marea .lab-lato > * { width: auto; margin: 0; }
    .lab-marea .lab-lato .btn { min-height: 38px; }
    .lab-marea .nota { font-size: .82rem; color: var(--testo2); }
    /* sul telefono il consiglio «meglio in verticale, sul telefono» è già seguito: via, e una riga in più all'app */
    @container lab (max-width: 480px) { .lab-marea .nota { display: none; } }
  `;
  COMPASSO.registraLab({
    id: 'marea',
    monta(radice) {
      if (!document.getElementById('stile-lab-marea')) { const s = document.createElement('style'); s.id = 'stile-lab-marea'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-marea');
      const url = 'https://fithzhood.github.io/marea/marea.html';
      radice.innerHTML = '<div class="lab-layout">' +
        '<div class="lab-scena"><iframe class="lab-iframe" title="Marea" allow="fullscreen" loading="lazy"></iframe></div>' +
        '<div class="lab-lato"><a class="btn piccolo" target="_blank" rel="noopener" href="' + url + '">Apri Marea in una scheda a parte</a>' +
        '<span class="nota">Funziona meglio in verticale, sul telefono.</span></div>' +
        '</div>';
      radice.querySelector('iframe').src = url;
      return () => { const f = radice.querySelector('iframe'); if (f) f.src = 'about:blank'; };
    }
  });
})();
