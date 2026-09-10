/* Laboratorio «Marea»: incorpora l'app Marea (disequazioni di secondo grado piegando una barra e alzando il mare). */
(function () {
  COMPASSO.registraLab({
    id: 'marea',
    monta(radice) {
      const url = 'https://fithzhood.github.io/marea/marea.html';
      radice.innerHTML = '<iframe class="lab-iframe" title="Marea" allow="fullscreen" loading="lazy"></iframe>' +
        '<div class="lab-barra"><a class="btn piccolo" target="_blank" rel="noopener" href="' + url + '">Apri Marea in una scheda a parte</a>' +
        '<span class="lab-livello">Funziona meglio in verticale, sul telefono.</span></div>';
      radice.querySelector('iframe').src = url;
      return () => { const f = radice.querySelector('iframe'); if (f) f.src = 'about:blank'; };
    }
  });
})();
