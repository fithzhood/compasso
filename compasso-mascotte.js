/* Compasso — Ada, la mascotte: un vecchio computer con la faccia disegnata sullo schermo.
   Reagisce a quello che succede (risposte giuste e sbagliate, passi svelati, livelli superati,
   inattività) e parla con una bolla.
   Espone window.CMASC: monta(), dici(), espressione(), reagisci(), chiudi(), visibile(), aperta(). */
(function () {
  'use strict';

  const SVG = `
<svg viewBox="0 0 120 112" class="mascotte-svg" aria-hidden="true">
  <defs>
    <radialGradient id="ada-schermo" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="#23364a"/><stop offset="1" stop-color="#101a26"/></radialGradient>
    <pattern id="ada-righe" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#fff" opacity=".06"/></pattern>
    <linearGradient id="ada-scocca" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf4e2"/><stop offset="1" stop-color="#e4d6b6"/></linearGradient>
  </defs>
  <ellipse class="ada-ombra" cx="60" cy="106" rx="34" ry="4.5" fill="#000" opacity=".16"/>
  <g class="ada-corpo">
    <path d="M44 86 h32 l5 12 h-42z" fill="#d8c8a4"/>
    <rect x="30" y="96" width="60" height="8" rx="4" fill="#cdbb94"/>
    <rect x="9" y="6" width="102" height="82" rx="17" fill="url(#ada-scocca)" stroke="#bfae88" stroke-width="1.5"/>
    <rect x="13" y="9" width="94" height="10" rx="5" fill="#fff" opacity=".35"/>
    <rect class="ada-vetro" x="19" y="15" width="82" height="58" rx="11" fill="url(#ada-schermo)" stroke="#a8977a" stroke-width="2"/>
    <g class="ada-viso"></g>
    <rect x="19" y="15" width="82" height="58" rx="11" fill="none" class="ada-righe"/>
    <path d="M27 20 q10 -2 20 -1" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".16" fill="none"/>
    <rect x="22" y="79" width="22" height="3.5" rx="1.75" fill="#b9a883"/>
    <circle class="ada-led" cx="96" cy="80.5" r="2.6" fill="#4ade80"/>
    <circle cx="88" cy="80.5" r="1.6" fill="#b9a883"/>
  </g>
</svg>`;

  /* le facce: disegnate in coordinate dello schermo (centro circa 60, 44) */
  const O = (x, y, w, h) => `<rect class="ada-occhio" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}"/>`;
  const L = d => `<path d="${d}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* sopracciglia: sottili, dello stesso colore, seguono lo sguardo un po' meno degli occhi */
  const S = (sx, dx) => `<path class="ada-ciglio" d="${sx}" fill="none" stroke-linecap="round"/><path class="ada-ciglio" d="${dx}" fill="none" stroke-linecap="round"/>`;
  const FACCE = {
    neutro: () => S('M42 29 q5 -2 10 0', 'M68 29 q5 -2 10 0') + O(47, 41, 9, 13) + O(73, 41, 9, 13) + L('M53 56 q7 5 14 0'),
    felice: () => S('M41 31 q6 -5 12 0', 'M67 31 q6 -5 12 0') + L('M42 43 q5 -8 10 0') + L('M68 43 q5 -8 10 0') + L('M49 52 q11 11 22 0') + '<ellipse class="ada-guancia" cx="40" cy="52" rx="4" ry="2.2"/><ellipse class="ada-guancia" cx="80" cy="52" rx="4" ry="2.2"/>',
    occhiolino: () => S('M42 28 q5 -3 10 0', 'M67 36 q6 -1 11 1') + O(47, 41, 9, 13) + L('M68 42 q5 -5 10 0') + L('M50 53 q10 9 20 0'),
    pensa: () => S('M45 29 l9 2', 'M71 25 q5 -4 10 -1') + O(50, 38, 9, 12) + O(76, 38, 9, 12) + '<g class="ada-puntini"><circle cx="51" cy="57" r="2.8"/><circle cx="60" cy="57" r="2.8"/><circle cx="69" cy="57" r="2.8"/></g>',
    sorpreso: () => S('M40 26 q7 -5 14 0', 'M66 26 q7 -5 14 0') + O(47, 40, 11, 15) + O(73, 40, 11, 15) + '<ellipse class="ada-pieno" cx="60" cy="58" rx="4.5" ry="5.5"/>',
    triste: () => O(47, 43, 9, 10) + O(73, 43, 9, 10) + L('M40 36 l10 -4') + L('M80 36 l-10 -4') + L('M52 61 q8 -6 16 0') + '<path class="ada-pieno ada-lacrima" d="M79 50 q3 5 0 7 q-3 -2 0 -7z"/>',
    confuso: () => S('M40 26 q7 -5 14 0', 'M68 35 l10 -2') + O(47, 40, 11, 14) + O(73, 42, 7, 8) + L('M50 58 l5 -3 l5 3 l5 -3 l5 3') + '<text class="ada-testo" x="90" y="34">?</text>',
    ops: () => L('M42 36 l9 5 l-9 5') + L('M78 36 l-9 5 l9 5') + L('M50 58 q5 -4 10 0 q5 4 10 0'),
    festa: () => S('M40 29 q7 -6 14 0', 'M66 29 q7 -6 14 0') + '<path class="ada-pieno" d="M47 33 l2.6 5.4 5.9 .8 -4.3 4.1 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.3 -4.1 5.9 -.8z"/><path class="ada-pieno" d="M73 33 l2.6 5.4 5.9 .8 -4.3 4.1 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.3 -4.1 5.9 -.8z"/>' + '<path class="ada-pieno" d="M48 52 h24 q0 11 -12 11 q-12 0 -12 -11z"/>',
    orgoglioso: () => L('M42 42 q5 -7 10 0') + L('M68 42 q5 -7 10 0') + L('M49 53 q11 9 22 0') + '<rect class="ada-pieno" x="37" y="38" width="18" height="5" rx="2" opacity=".85"/><rect class="ada-pieno" x="65" y="38" width="18" height="5" rx="2" opacity=".85"/><path d="M55 40 h10" fill="none"/>',
    dorme: () => S('M42 37 q5 1 10 0', 'M68 37 q5 1 10 0') + L('M42 43 q5 4 10 0') + L('M68 43 q5 4 10 0') + L('M56 58 q4 2 8 0') + '<text class="ada-testo ada-zeta" x="84" y="32">z</text>',
    parla: () => S('M42 29 q5 -2 10 0', 'M68 29 q5 -2 10 0') + O(47, 41, 9, 13) + O(73, 41, 9, 13) + '<ellipse class="ada-pieno" cx="60" cy="57" rx="6" ry="4"/>'
  };
  /* nomi vecchi (dall'epoca della tartaruga) → facce nuove */
  const ALIAS = { felice: 'felice', pensa: 'pensa', sorpreso: 'sorpreso', triste: 'triste', orgoglioso: 'orgoglioso', neutro: 'neutro' };

  let radice, bolla, testoEl, azioniEl, tipoEl, timerChiusura = null, svgEl, viso, timerFaccia = null, timerSonno = null;
  let facciaAttuale = 'neutro', dorme = false;
  const moto = () => !matchMedia('(prefers-reduced-motion: reduce)').matches;

  function disegna(nome) {
    if (!viso) return;
    const f = FACCE[nome] || FACCE.neutro;
    viso.innerHTML = f();
    viso.dataset.faccia = nome;
  }
  function espressione(nome, perQuanto) {
    if (!svgEl) return;
    nome = FACCE[ALIAS[nome] || nome] ? (ALIAS[nome] || nome) : 'neutro';
    clearTimeout(timerFaccia);
    facciaAttuale = nome; disegna(nome);
    svgEl.classList.remove('salta', 'scuote', 'lampeggia', 'dondola', 'glitch');
    void svgEl.offsetWidth;
    if (!moto()) return;
    if (nome === 'felice' || nome === 'occhiolino') svgEl.classList.add('salta');
    if (nome === 'festa' || nome === 'orgoglioso') svgEl.classList.add('salta', 'lampeggia');
    if (nome === 'pensa') svgEl.classList.add('dondola');
    if (nome === 'ops' || nome === 'sorpreso') svgEl.classList.add('scuote');
    if (nome === 'confuso') svgEl.classList.add('glitch');
    if (perQuanto) timerFaccia = setTimeout(() => espressione(aperta() ? 'neutro' : 'neutro'), perQuanto);
  }

  /* parla: la bocca si apre e si chiude per un momento */
  function muoviBocca(volte) {
    if (!moto() || !viso) return;
    const base = facciaAttuale; let n = 0;
    const t = setInterval(() => { disegna(n % 2 ? base : 'parla'); if (++n >= volte * 2) { clearInterval(t); disegna(base); } }, 130);
  }

  function battito() {
    if (!svgEl || document.hidden || dorme) return;
    const occhi = viso.querySelectorAll('.ada-occhio');
    if (occhi.length) { viso.classList.add('batte'); setTimeout(() => viso.classList.remove('batte'), 140); }
  }

  /* gli occhi seguono il puntatore (solo con il mouse, e solo sulle facce con gli occhi aperti) */
  function guarda(ev) {
    if (!svgEl || ev.pointerType === 'touch' || dorme) return;
    const r = svgEl.getBoundingClientRect(); if (!r.width) return;
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.4;
    const dx = Math.max(-1, Math.min(1, (ev.clientX - cx) / 260)), dy = Math.max(-1, Math.min(1, (ev.clientY - cy) / 220));
    viso.style.transform = `translate(${(dx * 2.5).toFixed(2)}px, ${(dy * 1.8).toFixed(2)}px)`;
    viso.style.setProperty('--ox', (dx * 5.5).toFixed(2) + 'px');
    viso.style.setProperty('--oy', (dy * 4).toFixed(2) + 'px');
  }

  function sveglia() {
    clearTimeout(timerSonno);
    if (dorme) { dorme = false; svgEl.classList.remove('dorme'); espressione('sorpreso', 900); }
    timerSonno = setTimeout(() => { if (aperta()) return sveglia(); dorme = true; svgEl.classList.add('dorme'); espressione('dorme'); }, 75000);
  }

  function monta(contenitore) {
    radice = document.createElement('div');
    radice.className = 'mascotte';
    radice.innerHTML = '<div class="mascotte-bolla" hidden><div class="mascotte-bolla-tipo"></div><div class="mascotte-bolla-testo"></div><div class="mascotte-bolla-azioni"></div></div>' +
      '<button class="mascotte-figura" type="button" aria-label="Ada, la mascotte: tocca per un consiglio">' + SVG + '</button>';
    contenitore.appendChild(radice);
    bolla = radice.querySelector('.mascotte-bolla');
    tipoEl = radice.querySelector('.mascotte-bolla-tipo');
    testoEl = radice.querySelector('.mascotte-bolla-testo');
    azioniEl = radice.querySelector('.mascotte-bolla-azioni');
    bolla.addEventListener('pointerdown', () => clearTimeout(timerChiusura));
    bolla.addEventListener('click', ev => { if (document.body.classList.contains('in-lab') && !ev.target.closest('.mascotte-azione')) chiudiBolla(); });
    svgEl = radice.querySelector('svg');
    viso = svgEl.querySelector('.ada-viso');
    disegna('neutro');
    setInterval(battito, 3800 + Math.random() * 1800);
    window.addEventListener('pointermove', ev => { guarda(ev); if (dorme) sveglia(); }, { passive: true });
    ['pointerdown', 'keydown', 'scroll'].forEach(t => window.addEventListener(t, sveglia, { passive: true }));
    sveglia();
    return radice;
  }

  /* ---- i fumetti ----
     Un testo lungo si spezza in più fumetti brevi, sfogliabili (‹ 2/4 ›), invece di un blocco unico.
     Quando Ada parla da sola (spontaneo, il caso normale) il fumetto è compatto, mostra solo il primo
     pezzo e si chiude da solo; se c'era altro, compare «Dimmi di più». Quando è lo studente a
     chiedere (opz.chiesto) i pezzi sono un po' più lunghi e il fumetto resta finché non lo chiude. */
  const LIM_SPONTANEO = 120, LIM_CHIESTO = 230;
  const lunghezza = h => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').length;
  function spezza(html, lim) {
    /* prima i paragrafi, poi le frasi dentro i paragrafi lunghi (mai dentro un tag) */
    const paragrafi = /<p[\s>]/.test(html) ? (html.match(/<p[\s\S]*?<\/p>/g) || [html]).map(x => x.replace(/^<p[^>]*>|<\/p>$/g, '')) : [html];
    const frasi = [];
    paragrafi.forEach(par => {
      if (lunghezza(par) <= lim) { frasi.push('\x01' + par); return; }
      const pezzi = []; let buf = '', dentro = 0;
      for (let i = 0; i < par.length; i++) {
        const c = par[i]; buf += c;
        if (c === '<') dentro++; else if (c === '>') dentro = Math.max(0, dentro - 1);
        if (!dentro && /[.!?]/.test(c) && /\s/.test(par[i + 1] || '') && /[A-ZÀ-Ý«"(0-9$<]/.test((par.slice(i + 1).trimStart()[0]) || '')) { pezzi.push(buf.trim()); buf = ''; }
      }
      if (buf.trim()) pezzi.push(buf.trim());
      pezzi.forEach((f, i) => frasi.push((i ? '' : '\x01') + f));
    });
    const pagine = []; let cur = '';
    /* \x01 segna l'inizio di un paragrafo: nello stesso fumetto diventa un a capo */
    frasi.forEach(f => { const nuovo = f[0] === '\x01'; f = f.replace(/^\x01/, ''); if (cur && lunghezza(cur) + lunghezza(f) > lim) { pagine.push(cur); cur = f; } else cur = cur ? cur + (nuovo ? '</p><p>' : ' ') + f : f; });
    if (cur) pagine.push(cur);
    return pagine.length ? pagine : [html];
  }
  const escapa = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* dici(testo, {tipo:'suggerimento'|'aneddoto'|'commento'|'errore', titolo, html, chiesto, azioni:[{testo, fn}], durata, espressione}) */
  function dici(testo, opz) {
    opz = opz || {};
    if (!radice) return;
    clearTimeout(timerChiusura);
    if (dorme) sveglia();
    const html = opz.html ? String(testo) : escapa(testo);
    let chiesto = !!opz.chiesto;
    let pagine = spezza(html, chiesto ? LIM_CHIESTO : LIM_SPONTANEO), k = 0;
    const etichetta = opz.titolo || ({ suggerimento: 'Un suggerimento', aneddoto: 'Lo sapevi?', errore: 'Occhio' }[opz.tipo] || '');
    tipoEl.textContent = etichetta; tipoEl.hidden = !etichetta;
    bolla.dataset.tipo = opz.tipo || 'commento';
    bolla.classList.toggle('compatta', !chiesto);
    const mostra = () => {
      testoEl.innerHTML = '<p>' + pagine[k] + '</p>';
      azioniEl.innerHTML = '';
      const aggiungi = (testoB, fn, cls) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'mascotte-azione' + (cls ? ' ' + cls : ''); b.innerHTML = testoB; b.addEventListener('click', ev => { ev.stopPropagation(); fn(); }); azioniEl.appendChild(b); return b; };
      if (!chiesto && pagine.length > 1) {
        aggiungi('Dimmi di più ›', () => { chiesto = true; bolla.classList.remove('compatta'); clearTimeout(timerChiusura); pagine = spezza(html, LIM_CHIESTO); k = Math.min(1, pagine.length - 1); mostra(); muoviBocca(2); });
      } else if (pagine.length > 1) {
        aggiungi('‹', () => { k = Math.max(0, k - 1); mostra(); }, 'mascotte-freccia').disabled = k === 0;
        const n = document.createElement('span'); n.className = 'mascotte-pagina'; n.textContent = (k + 1) + '/' + pagine.length; azioniEl.appendChild(n);
        aggiungi('›', () => { k = Math.min(pagine.length - 1, k + 1); mostra(); muoviBocca(2); }, 'mascotte-freccia').disabled = k === pagine.length - 1;
      }
      if (k === pagine.length - 1 || !chiesto) (opz.azioni || []).forEach(a => aggiungi(escapa(a.testo), a.fn));
      aggiungi('✕', chiudiBolla, 'mascotte-chiudi').setAttribute('aria-label', 'Chiudi');
      if (opz.dopoRender) opz.dopoRender(testoEl);
    };
    mostra();
    bolla.hidden = false;
    bolla.classList.remove('appare'); void bolla.offsetWidth; bolla.classList.add('appare');
    espressione(opz.espressione || 'neutro');
    muoviBocca(Math.min(3, 1 + Math.round(lunghezza(pagine[0]) / 60)));
    /* chi parla da solo non resta lì a occupare lo schermo: si chiude, a meno che lo studente non lo tocchi */
    /* nei laboratori il fumetto resta finché non lo si tocca o non si cambia livello */
    if (document.body.classList.contains('in-lab')) return;
    const durata = opz.durata || (!chiesto ? 3500 + 45 * lunghezza(pagine[0]) : 0);
    if (durata && !chiesto) timerChiusura = setTimeout(chiudiBolla, durata);
    else if (opz.durata) timerChiusura = setTimeout(chiudiBolla, opz.durata);
  }

  /* reagisci(evento, testo?): la faccia cambia secondo quello che è successo; la bolla solo se serve */
  const FRASI = {
    giusto: null,
    'sbagliato-ancora': ['Due tentativi: prova a chiedere un suggerimento.', 'Ci sei vicino. Un suggerimento può sbloccarti.', 'Rileggi il testo con calma: a volte il dettaglio è lì.'],
    livello: null
  };
  function reagisci(evento, testo) {
    if (!svgEl || (radice && radice.hidden)) return;
    if (dorme) sveglia();
    switch (evento) {
      case 'giusto': espressione(Math.random() < 0.25 ? 'occhiolino' : 'felice', 1800); break;
      case 'sbagliato': espressione('sorpreso'); setTimeout(() => { if (facciaAttuale === 'sorpreso') espressione('pensa', 2200); }, 650); break;
      case 'sbagliato-ancora': espressione('confuso', 2600); if (!aperta()) dici(FRASI['sbagliato-ancora'][Math.floor(Math.random() * 3)], { tipo: 'commento', espressione: 'confuso', durata: 4000 }); break;
      case 'passo': espressione('pensa', 1100); break;
      case 'livello': espressione('festa', 2400); break;
      case 'traguardo': if (testo) dici(testo, { tipo: 'commento', espressione: 'orgoglioso', durata: 6000 }); else espressione('orgoglioso', 2600); break;
      case 'ops': espressione('ops', 1600); break;
      default: espressione(evento, 1600);
    }
  }

  function chiudiBolla() { if (bolla) bolla.hidden = true; clearTimeout(timerChiusura); if (!dorme) espressione('neutro'); }
  function visibile(si) { if (radice) radice.hidden = !si; }
  function aperta() { return !!(bolla && !bolla.hidden); }

  window.CMASC = { monta, dici, espressione, reagisci, chiudi: chiudiBolla, visibile, aperta, SVG };
})();
