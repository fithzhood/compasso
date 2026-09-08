/* Compasso — Zenone, la tartaruga mascotte.
   Espone window.CMASC: monta(), dici(), espressione(), chiudi(). */
(function () {
  'use strict';

  const SVG = `
<svg viewBox="0 0 130 100" class="zenone-svg" aria-hidden="true">
  <g class="zenone-corpo">
    <path d="M22 72 q-12 -3 -14 6 q7 3 14 -1z" fill="#6aa84f"/>
    <ellipse class="zampa zampa-1" cx="36" cy="81" rx="9" ry="6" fill="#7bb661"/>
    <ellipse class="zampa zampa-2" cx="72" cy="83" rx="9" ry="6" fill="#7bb661"/>
    <path d="M20 74 Q20 28 58 26 Q96 28 96 74 Z" fill="#3f7d3a"/>
    <path d="M27 74 Q29 38 58 34 Q87 38 89 74 Z" fill="#519a49"/>
    <path d="M50 42 l8 -5 l8 5 v9 l-8 5 l-8 -5z" fill="#6fb761"/>
    <path d="M31 54 l8 -5 l8 5 v9 l-8 5 l-8 -5z" fill="#6fb761"/>
    <path d="M69 54 l8 -5 l8 5 v9 l-8 5 l-8 -5z" fill="#6fb761"/>
    <path d="M50 66 l8 -5 l8 5 v5 h-16z" fill="#6fb761"/>
    <path d="M17 73 Q58 84 99 73 Q58 92 17 73z" fill="#2f5f2c"/>
    <ellipse class="zampa zampa-3" cx="88" cy="82" rx="9" ry="6" fill="#7bb661"/>
    <g class="zenone-testa">
      <path d="M84 58 q12 -10 24 -6 v18 q-10 6 -24 -2z" fill="#8cc472"/>
      <circle cx="106" cy="55" r="15" fill="#8cc472"/>
      <ellipse cx="112" cy="60" rx="7" ry="4" fill="#9fd485"/>
      <g class="occhio">
        <circle cx="109" cy="51" r="5" fill="#fff"/>
        <circle class="pupilla" cx="110" cy="51.5" r="2.4" fill="#1c2b1a"/>
        <circle cx="111" cy="50.3" r=".8" fill="#fff"/>
        <path class="palpebra" d="M104 51 a5 5 0 0 1 10 0 a5 5 0 0 1 -10 0z" fill="#8cc472"/>
      </g>
      <g class="occhiali" fill="none" stroke="#3b3b3b" stroke-width="1.5">
        <circle cx="109" cy="51" r="7"/>
        <path d="M102 51 h-6"/>
      </g>
      <path class="sopracciglio" d="M104 42.5 q5 -3 10 0" fill="none" stroke="#3f7d3a" stroke-width="1.8" stroke-linecap="round"/>
      <path class="bocca" d="M104 63 q5 3 10 0" fill="none" stroke="#2f5f2c" stroke-width="1.7" stroke-linecap="round"/>
      <ellipse class="guancia" cx="101" cy="60" rx="3" ry="1.8" fill="#f2a5a5" opacity=".55"/>
    </g>
  </g>
</svg>`;

  const BOCCHE = {
    neutro: 'M104 63 q5 3 10 0',
    felice: 'M103 62 q6 6 12 0',
    pensa: 'M104 63.5 h9',
    sorpreso: 'M107 61 a3 3.5 0 1 0 4 0 a3 3.5 0 1 0 -4 0',
    triste: 'M104 65 q5 -3 10 0',
    orgoglioso: 'M103 62 q6 6 12 0'
  };
  const SOPRACCIGLIA = {
    neutro: 'M104 42.5 q5 -3 10 0',
    felice: 'M104 42 q5 -3 10 0',
    pensa: 'M104 44 q5 -5 10 -1',
    sorpreso: 'M104 40 q5 -3 10 0',
    triste: 'M104 42 q5 1 10 -2',
    orgoglioso: 'M104 41 q5 -2 10 1'
  };

  let radice, bolla, testoEl, azioniEl, timerChiusura = null, svgEl;
  let ultimaEspressione = 'neutro';

  function monta(contenitore) {
    radice = document.createElement('div');
    radice.className = 'zenone';
    radice.innerHTML = '<div class="zenone-bolla" hidden><div class="zenone-bolla-tipo"></div><div class="zenone-bolla-testo"></div><div class="zenone-bolla-azioni"></div></div>' +
      '<button class="zenone-figura" type="button" aria-label="Zenone, la mascotte">' + SVG + '</button>';
    contenitore.appendChild(radice);
    bolla = radice.querySelector('.zenone-bolla');
    testoEl = radice.querySelector('.zenone-bolla-testo');
    azioniEl = radice.querySelector('.zenone-bolla-azioni');
    svgEl = radice.querySelector('svg');
    /* sbatte le palpebre ogni tanto */
    setInterval(() => { if (document.hidden) return; svgEl.classList.add('sbatte'); setTimeout(() => svgEl.classList.remove('sbatte'), 180); }, 4200 + Math.random() * 2000);
    return radice;
  }

  function espressione(nome) {
    if (!svgEl) return;
    nome = BOCCHE[nome] ? nome : 'neutro';
    ultimaEspressione = nome;
    svgEl.querySelector('.bocca').setAttribute('d', BOCCHE[nome]);
    svgEl.querySelector('.sopracciglio').setAttribute('d', SOPRACCIGLIA[nome]);
    svgEl.classList.remove('salta', 'dondola');
    void svgEl.offsetWidth;
    if (nome === 'felice' || nome === 'orgoglioso') svgEl.classList.add('salta');
    if (nome === 'pensa') svgEl.classList.add('dondola');
  }

  /* dici(testo, {tipo:'suggerimento'|'aneddoto'|'commento', titolo, html:bool, azioni:[{testo, fn}], durata:ms}) */
  function dici(testo, opz) {
    opz = opz || {};
    if (!radice) return;
    clearTimeout(timerChiusura);
    const tipoEl = radice.querySelector('.zenone-bolla-tipo');
    tipoEl.textContent = opz.titolo || ({ suggerimento: 'Un suggerimento', aneddoto: 'Lo sapevi?', commento: 'Zenone dice', errore: 'Occhio a questo errore' }[opz.tipo] || 'Zenone dice');
    bolla.dataset.tipo = opz.tipo || 'commento';
    if (opz.html) testoEl.innerHTML = testo; else testoEl.textContent = testo;
    azioniEl.innerHTML = '';
    (opz.azioni || []).forEach(a => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'zenone-azione'; b.textContent = a.testo;
      b.addEventListener('click', ev => { ev.stopPropagation(); a.fn(); });
      azioniEl.appendChild(b);
    });
    const chiudi = document.createElement('button'); chiudi.type = 'button'; chiudi.className = 'zenone-azione zenone-chiudi'; chiudi.textContent = 'Chiudi';
    chiudi.addEventListener('click', ev => { ev.stopPropagation(); chiudiBolla(); });
    azioniEl.appendChild(chiudi);
    bolla.hidden = false;
    bolla.classList.remove('appare'); void bolla.offsetWidth; bolla.classList.add('appare');
    if (opz.espressione) espressione(opz.espressione);
    if (opz.durata) timerChiusura = setTimeout(chiudiBolla, opz.durata);
    if (opz.dopoRender) opz.dopoRender(testoEl);
  }

  function chiudiBolla() { if (bolla) bolla.hidden = true; espressione('neutro'); }
  function visibile(si) { if (radice) radice.hidden = !si; }
  function aperta() { return bolla && !bolla.hidden; }

  window.CMASC = { monta, dici, espressione, chiudi: chiudiBolla, visibile, aperta, SVG };
})();
