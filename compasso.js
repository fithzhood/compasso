/* Compasso — motore del sito: router, contenuti, flashcard, esercizi, quiz, mascotte, progressi. */
(function () {
  'use strict';

  const IND = window.COMPASSO_INDICE;
  const VER_TAG = ((document.currentScript && document.currentScript.src || '').match(/\?v=\d+/) || [''])[0];
  const VERSIONE = (VER_TAG.match(/\d+/) || ['dev'])[0];
  const app = document.getElementById('app');
  const GIORNO = 86400000;

  /* =====================================================================
     STATO PERSISTENTE
     ===================================================================== */
  const CHIAVE = 'compasso.v1';
  const statoBase = () => ({ progressi: {}, carte: {}, carteMie: {}, selezione: {}, impostazioni: { tema: 'auto', mascotte: true, mescola: true }, ultimo: null });
  let stato = statoBase();
  try { const s = localStorage.getItem(CHIAVE); if (s) stato = Object.assign(statoBase(), JSON.parse(s)); } catch (e) { /* niente memoria: si va avanti */ }
  function salva() { try { localStorage.setItem(CHIAVE, JSON.stringify(stato)); } catch (e) { /* ignora */ } }
  function progresso(id) { return stato.progressi[id] || (stato.progressi[id] = { eserciziFatti: [], quizMigliore: null, quizTot: null, visitato: null }); }

  /* =====================================================================
     TEMA
     ===================================================================== */
  function applicaTema() {
    const t = stato.impostazioni.tema;
    const scuro = t === 'scuro' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.tema = scuro ? 'scuro' : 'chiaro';
    const meta = document.querySelector('meta[name=theme-color]'); if (meta) meta.content = scuro ? '#13151b' : '#f4f1ea';
  }
  applicaTema();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applicaTema);
  document.getElementById('btn-tema').addEventListener('click', () => {
    const scuro = document.documentElement.dataset.tema === 'scuro';
    stato.impostazioni.tema = scuro ? 'chiaro' : 'scuro'; salva(); applicaTema();
  });

  /* =====================================================================
     REGISTRO DEGLI ARGOMENTI (caricati al volo)
     ===================================================================== */
  const registro = {}, inCorso = {}, registroLab = {}, labInCorso = {};
  window.COMPASSO = { registra(a) { registro[a.id] = a; }, registraLab(l) { registroLab[l.id] = l; } };
  function voce(id) { return IND.argomenti.find(a => a.id === id); }
  function area(id) { return IND.aree.find(a => a.id === id); }
  function labsDi(argId) { return (IND.laboratori || []).filter(l => l.argomento === argId); }
  function caricaLab(id) {
    if (registroLab[id]) return Promise.resolve(registroLab[id]);
    if (labInCorso[id]) return labInCorso[id];
    labInCorso[id] = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'laboratori/' + id + '.js' + VER_TAG;
      s.onload = () => { delete labInCorso[id]; registroLab[id] ? res(registroLab[id]) : rej(new Error('non registrato')); };
      s.onerror = () => { delete labInCorso[id]; rej(new Error('file mancante')); };
      document.head.appendChild(s);
    });
    return labInCorso[id];
  }
  let smontaLab = null;   /* pulizia del laboratorio aperto, chiamata a ogni cambio di pagina */
  function chiudiLab() { if (smontaLab) { try { smontaLab(); } catch (e) { /* niente */ } smontaLab = null; } if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }
  function caricaArgomento(id) {
    if (registro[id]) return Promise.resolve(registro[id]);
    if (inCorso[id]) return inCorso[id];
    inCorso[id] = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'argomenti/' + id + '.js' + VER_TAG;
      s.onload = () => { delete inCorso[id]; registro[id] ? res(registro[id]) : rej(new Error('non registrato')); };
      s.onerror = () => { delete inCorso[id]; rej(new Error('file mancante')); };
      document.head.appendChild(s);
    });
    return inCorso[id];
  }

  /* =====================================================================
     UTILITÀ
     ===================================================================== */
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const mescola = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const scegli = a => a[Math.floor(Math.random() * a.length)];
  function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  const ICONE = {
    libro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    lampadina: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>',
    carte: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 6V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/></svg>',
    penna: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    spunta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    formule: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h10M4 19h16"/></svg>',
    lab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6.5L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9.5V3"/><path d="M7.5 15h9"/></svg>',
    schermo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
    cerca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    mescola: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
    sinistra: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    destra: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    gira: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>'
  };
  const SCHEDE = [['teoria', 'Teoria', 'libro'], ['esempi', 'Esempi', 'lampadina'], ['flashcard', 'Flashcard', 'carte'], ['esercizi', 'Esercizi', 'penna'], ['quiz', 'Quiz', 'spunta'], ['formulario', 'Formulario', 'formule']];

  /* =====================================================================
     MINI-MARKDOWN + KATEX
     ===================================================================== */
  function tex(src, display) {
    try { return katex.renderToString(src, { throwOnError: false, displayMode: !!display, strict: 'ignore', output: 'html' }); }
    catch (e) { return '<code>' + esc(src) + '</code>'; }
  }
  function inline(s) {
    return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\n]+?)\*(?!\w)/g, '$1<em>$2</em>').replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  function md(src) {
    if (src == null) return '';
    const mat = [];
    let s = String(src);
    s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => { mat.push(tex(t, true)); return '' + (mat.length - 1) + ''; });
    s = s.replace(/\$([^$\n]+?)\$/g, (_, t) => { mat.push(tex(t, false)); return '' + (mat.length - 1) + ''; });
    s = esc(s);
    const righe = s.split('\n'); const out = []; let par = [], lista = null, tipoLista = '', quote = null, tipoQuote = '', tab = null;
    const chiudiPar = () => { if (par.length) { out.push('<p>' + inline(par.join(' ')) + '</p>'); par = []; } };
    const chiudiLista = () => { if (lista) { out.push('<' + tipoLista + '>' + lista.map(x => '<li>' + inline(x) + '</li>').join('') + '</' + tipoLista + '>'); lista = null; } };
    const chiudiQuote = () => { if (quote) { const cls = { '!': 'attenzione', '*': 'idea', '': 'nota' }[tipoQuote]; out.push('<div class="riquadro ' + cls + '"><p>' + inline(quote.join(' ')) + '</p></div>'); quote = null; } };
    const chiudiTab = () => {
      if (!tab) return;
      const righeT = tab.filter(r => !/^\|?\s*:?-{2,}/.test(r)).map(r => r.replace(/^\||\|$/g, '').split('|').map(c => inline(c.trim())));
      let html = '<div class="tabella-scroll"><table>';
      righeT.forEach((r, i) => { const tag = i === 0 ? 'th' : 'td'; html += '<tr>' + r.map(c => '<' + tag + '>' + c + '</' + tag + '>').join('') + '</tr>'; });
      out.push(html + '</table></div>'); tab = null;
    };
    const chiudiTutto = () => { chiudiPar(); chiudiLista(); chiudiQuote(); chiudiTab(); };
    for (let riga of righe) {
      const r = riga.trim();
      let m;
      if (!r) { chiudiTutto(); continue; }
      if ((m = r.match(/^\[\[grafico:([^\]]+)\]\]$/))) { chiudiTutto(); out.push('<div class="grafico-slot" data-grafico="' + esc(m[1]) + '"></div>'); continue; }
      if ((m = r.match(/^\[\[animazione:([^\]]+)\]\]$/))) { chiudiTutto(); out.push('<div class="grafico-slot" data-animazione="' + esc(m[1]) + '"></div>'); continue; }
      if ((m = r.match(/^###\s+(.+)$/))) { chiudiTutto(); out.push('<h4>' + inline(m[1]) + '</h4>'); continue; }
      if ((m = r.match(/^-\s+(.+)$/))) { chiudiPar(); chiudiQuote(); chiudiTab(); if (lista && tipoLista !== 'ul') chiudiLista(); tipoLista = 'ul'; (lista = lista || []).push(m[1]); continue; }
      if ((m = r.match(/^\d+[.)]\s+(.+)$/))) { chiudiPar(); chiudiQuote(); chiudiTab(); if (lista && tipoLista !== 'ol') chiudiLista(); tipoLista = 'ol'; (lista = lista || []).push(m[1]); continue; }
      if ((m = r.match(/^&gt;([!*]?)\s?(.*)$/))) { chiudiPar(); chiudiLista(); chiudiTab(); if (quote && tipoQuote !== m[1]) chiudiQuote(); tipoQuote = m[1]; (quote = quote || []).push(m[2]); continue; }
      if (/^\|/.test(r)) { chiudiPar(); chiudiLista(); chiudiQuote(); (tab = tab || []).push(r); continue; }
      if (lista) { lista[lista.length - 1] += ' ' + r; continue; }
      if (quote) { quote.push(r); continue; }
      chiudiTab(); par.push(r);
    }
    chiudiTutto();
    return out.join('\n').replace(/(\d+)/g, (_, i) => mat[+i]);
  }
  function montaGrafici(radice, arg) {
    radice.querySelectorAll('.grafico-slot').forEach(slot => {
      if (slot.dataset.animazione) { try { CGRAF.render({ tipo: 'animazione', nome: slot.dataset.animazione }, slot); } catch (e) { slot.textContent = 'Animazione non disponibile (' + e.message + ')'; } return; }
      const spec = arg && arg.grafici && arg.grafici[slot.dataset.grafico];
      if (spec) { try { CGRAF.render(spec, slot); } catch (e) { slot.textContent = 'Grafico non disponibile (' + e.message + ')'; } }
      else slot.textContent = 'Grafico "' + slot.dataset.grafico + '" mancante';
    });
  }
  function frammento(src, arg) { const d = document.createElement('div'); d.className = 'prosa'; d.innerHTML = md(src); montaGrafici(d, arg); return d; }

  /* =====================================================================
     ROUTER
     ===================================================================== */
  let paginaCorrente = null, argCorrente = null;
  function naviga(hash) { location.hash = hash; }
  function route() {
    const parti = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    const p = parti[0] || '';
    CMASC.chiudi(); chiudiLab();
    document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('attiva', a.dataset.pagina === (p || 'home')));
    if (p === 'argomento' && parti[1]) return paginaArgomento(parti[1], parti[2] || 'teoria', parti[3]);
    argCorrente = null;
    if (p === 'ripasso') return paginaRipasso(parti[1]);
    if (p === 'matematici') return paginaMatematici(parti[1]);
    if (p === 'impostazioni') return paginaImpostazioni();
    return paginaHome();
  }
  window.addEventListener('hashchange', route);

  function svuota() { app.innerHTML = ''; window.scrollTo(0, 0); }

  /* =====================================================================
     HOME
     ===================================================================== */
  function carteDaRipassare() {
    const ora = Date.now(); let n = 0;
    for (const a in stato.carte) for (const c in stato.carte[a]) if (stato.carte[a][c].prossima && stato.carte[a][c].prossima <= ora) n++;
    return n;
  }
  function aggiornaBadge() { const b = document.getElementById('nav-ripasso'); const n = carteDaRipassare(); b.textContent = n; b.hidden = !n; }
  function percentuale(id) {
    const p = stato.progressi[id]; if (!p || !p.visitato) return 0;
    let v = 0.2;
    if (p.quizTot) v += 0.45 * (p.quizMigliore / p.quizTot);
    if (p.nEsercizi) v += 0.35 * Math.min(1, p.eserciziFatti.length / p.nEsercizi);
    return Math.round(v * 100);
  }
  const CONSIGLI = [
    'Un argomento alla volta. Io sono arrivata dove sono un passo dopo l\'altro, e Achille ancora mi cerca.',
    'Le flashcard rendono di più in dosi piccole e frequenti: dieci minuti oggi, dieci domani.',
    'Nel quiz sbagliare è utile, a patto di leggere la spiegazione. È lì che si impara.',
    'Prima di aprire un argomento, dai un\'occhiata ai prerequisiti: se traballano, torna indietro un passo.',
    'Un esercizio fatto senza guardare la soluzione vale dieci letti.',
    'Se un\'idea non ti entra, prova a spiegarla ad alta voce come se io non la sapessi. Non la so, in effetti.',
    'I grafici con i cursori si possono muovere: prova a cambiare i numeri e guarda cosa succede.',
    'Nella scheda Flashcard puoi scegliere quali carte studiare e aggiungerne di tue.'
  ];
  function paginaHome() {
    paginaCorrente = 'home'; document.title = 'Compasso — la matematica, un argomento alla volta';
    svuota();
    const visitati = IND.argomenti.filter(a => stato.progressi[a.id] && stato.progressi[a.id].visitato).length;
    const superati = IND.argomenti.filter(a => { const p = stato.progressi[a.id]; return p && p.quizTot && p.quizMigliore / p.quizTot >= 0.7; }).length;
    const daRip = carteDaRipassare();
    const ultimo = stato.ultimo && voce(stato.ultimo);
    const eroe = h(`<section class="scheda eroe">
      <div>
        <h1>La matematica, un argomento alla volta</h1>
        <p>Spiegazioni, esempi svolti, flashcard da scegliere, esercizi e quiz di teoria per il liceo. E Zenone, la tartaruga, che ti racconta chi ha inventato tutto questo.</p>
        <div class="eroe-stat">
          <span class="stat"><b>${visitati}</b>/${IND.argomenti.length} argomenti aperti</span>
          <span class="stat"><b>${superati}</b> quiz superati</span>
          <span class="stat"><b>${daRip}</b> ${daRip === 1 ? 'carta' : 'carte'} da ripassare ${daRip ? '<a href="#/ripasso">→ ripassa</a>' : ''}</span>
          ${ultimo ? `<a class="stat" href="#/argomento/${ultimo.id}" style="text-decoration:none">Riprendi: <b style="font-size:1rem">${esc(ultimo.titolo)}</b></a>` : ''}
        </div>
      </div>
      <div class="eroe-mascotte">${CMASC.SVG}</div>
    </section>`);
    app.appendChild(eroe);

    const cerca = h(`<div class="cerca">${ICONE.cerca}<input type="search" id="cerca" placeholder="Cerca un argomento o una parola (parabola, delta, asintoto…)" autocomplete="off"></div>`);
    app.appendChild(cerca);
    const risultati = h('<div class="risultati" hidden></div>'); app.appendChild(risultati);
    const contenitoreAree = document.createElement('div'); app.appendChild(contenitoreAree);
    const inp = cerca.querySelector('input');
    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      risultati.innerHTML = ''; risultati.hidden = !q; contenitoreAree.hidden = !!q;
      if (!q) return;
      const trovati = IND.argomenti.map(a => {
        const testo = (a.titolo + ' ' + a.breve + ' ' + (a.parole || []).join(' ')).toLowerCase();
        let punti = 0; q.split(/\s+/).forEach(w => { if (a.titolo.toLowerCase().includes(w)) punti += 3; if ((a.parole || []).some(p => p.toLowerCase().includes(w))) punti += 2; if (testo.includes(w)) punti += 1; });
        return [punti, a];
      }).filter(x => x[0] > 0).sort((x, y) => y[0] - x[0]);
      if (!trovati.length) { risultati.innerHTML = '<div class="fc-vuoto">Niente con «' + esc(q) + '». Prova con un\'altra parola.</div>'; return; }
      trovati.slice(0, 12).forEach(([, a]) => {
        const ar = area(a.area);
        const paroleOk = (a.parole || []).filter(p => q.split(/\s+/).some(w => p.toLowerCase().includes(w)));
        risultati.appendChild(h(`<a class="risultato" href="#/argomento/${a.id}"><b>${esc(a.titolo)}</b> <span class="etichetta area" style="background:var(--${ar.colore})">${esc(ar.nome)}</span><small>${esc(a.breve)}${paroleOk.length ? ' · <mark>' + esc(paroleOk.join(', ')) + '</mark>' : ''}</small></a>`));
      });
    });

    if ((IND.laboratori || []).length) {
      const bl = h('<section class="area-blocco lab-blocco"><div class="area-testa"><span class="simbolo simbolo-lab">🧪</span><div><h2>Laboratori</h2><p>Piccoli giochi con dentro un concetto: si impara con le mani, senza leggere niente prima.</p></div></div><div class="griglia-lab"></div></section>');
      const g = bl.querySelector('.griglia-lab'); IND.laboratori.forEach(l => g.appendChild(tesseraLab(l, true)));
      contenitoreAree.appendChild(bl);
    }
    IND.aree.forEach(ar => {
      const blocco = h(`<section class="area-blocco"><div class="area-testa"><span class="simbolo" style="background:var(--${ar.colore})">${esc(ar.simbolo)}</span><div><h2>${esc(ar.nome)}</h2><p>${esc(ar.descrizione)}</p></div></div><div class="griglia-argomenti"></div></section>`);
      const griglia = blocco.querySelector('.griglia-argomenti');
      IND.argomenti.filter(a => a.area === ar.id).forEach(a => {
        const pc = percentuale(a.id);
        griglia.appendChild(h(`<a class="scheda tessera${stato.ultimo === a.id ? ' prossimo' : ''}" href="#/argomento/${a.id}" style="--colore-area:var(--${ar.colore})">
          <h3>${esc(a.titolo)}</h3><p>${esc(a.breve)}</p>
          <div class="tessera-pie"><span class="etichetta livello-${a.livello}">${['', '1º–2º anno', '3º–4º anno', '5º anno'][a.livello]}</span><span class="progresso"><i style="width:${pc}%"></i></span><span class="progresso-testo">${pc ? pc + '%' : ''}</span></div>
        </a>`));
      });
      contenitoreAree.appendChild(blocco);
    });
    app.appendChild(h(`<div class="versione">Compasso v${VERSIONE}</div>`));
    aggiornaBadge();
    if (stato.impostazioni.mascotte && !sessionStorage.getItem('compasso.salutato')) {
      sessionStorage.setItem('compasso.salutato', '1');
      setTimeout(() => { if (paginaCorrente !== 'home') return; CMASC.dici(daRip ? `Bentornato. Hai ${daRip} ${daRip === 1 ? 'carta' : 'carte'} da ripassare: vuoi cominciare da lì?` : 'Ciao, sono Zenone. Scegli un argomento, oppure toccami quando vuoi un consiglio o una storia.', { tipo: 'commento', espressione: 'felice', azioni: daRip ? [{ testo: 'Vai al ripasso', fn: () => naviga('#/ripasso') }] : [] }); }, 1200);
    }
  }

  /* =====================================================================
     PAGINA ARGOMENTO
     ===================================================================== */
  function paginaArgomento(id, scheda, ancora) {
    const v = voce(id);
    if (!v) { svuota(); app.appendChild(h('<div class="scheda fc-vuoto">Argomento sconosciuto. <a href="#/">Torna all\'elenco</a>.</div>')); return; }
    paginaCorrente = 'argomento'; document.title = v.titolo + ' — Compasso';
    if (argCorrente !== id) { svuota(); app.appendChild(h('<div class="fc-vuoto">Carico «' + esc(v.titolo) + '»…</div>')); }
    caricaArgomento(id).then(arg => {
      argCorrente = id;
      const p = progresso(id); const prima = !p.visitato;
      p.visitato = Date.now(); p.nEsercizi = arg.esercizi.length; p.nFlashcard = arg.flashcards.length; stato.ultimo = id; salva();
      disegnaArgomento(v, arg, scheda, ancora);
      if (stato.impostazioni.mascotte && !sessionStorage.getItem('compasso.detto.' + id)) {
        sessionStorage.setItem('compasso.detto.' + id, '1');
        setTimeout(() => { if (argCorrente !== id || CMASC.aperta()) return; const s = scegli(arg.suggerimenti); CMASC.dici(md(s.testo), { tipo: s.tipo === 'errore' ? 'errore' : 'suggerimento', html: true, espressione: 'pensa', azioni: [{ testo: 'Un aneddoto', fn: () => raccontaAneddoto(arg) }] }); }, prima ? 2500 : 4000);
      }
    }).catch(err => {
      svuota();
      app.appendChild(h(`<div class="scheda quiz-avvio"><h2>${esc(v.titolo)}</h2><p>Questo argomento è ancora in preparazione (${esc(err.message)}).</p><a class="btn" href="#/">Torna agli argomenti</a></div>`));
    });
  }

  function disegnaArgomento(v, arg, scheda, ancora) {
    const ar = area(v.area);
    let testa = app.querySelector('.arg-testa');
    if (!testa) {
      svuota();
      testa = h(`<header class="arg-testa">
        <div class="briciole"><a href="#/">Argomenti</a> › <span class="etichetta area" style="background:var(--${ar.colore})">${esc(ar.nome)}</span> <span class="etichetta livello-${v.livello}">${['', '1º–2º anno', '3º–4º anno', '5º anno'][v.livello]}</span></div>
        <h1>${esc(arg.titolo)}</h1>
        <div class="prerequisiti">${v.prerequisiti.length ? 'Prima conviene sapere: ' + v.prerequisiti.map(pid => { const pv = voce(pid); return pv ? `<a href="#/argomento/${pid}">${esc(pv.titolo)}</a>` : ''; }).join('') : 'Nessun prerequisito: si parte da qui.'}</div>
      </header>`);
      app.appendChild(testa);
      const nav = h('<nav class="schede-nav"><div class="schede-nav-int"></div></nav>');
      app.appendChild(nav);
      app.appendChild(h('<div id="pannello" class="pannello"></div>'));
      app.appendChild(h(`<div class="versione">Compasso v${VERSIONE}</div>`));
    }
    const navInt = app.querySelector('.schede-nav-int'); navInt.innerHTML = '';
    const p = progresso(v.id);
    const schede = SCHEDE.slice();
    if (labsDi(v.id).length) schede.splice(2, 0, ['lab', 'Laboratorio', 'lab']);
    schede.forEach(([sid, nome, icona]) => {
      let extra = '';
      if (sid === 'quiz' && p.quizTot) extra = ` <span class="spunta">${p.quizMigliore}/${p.quizTot}</span>`;
      if (sid === 'esercizi' && p.eserciziFatti.length) extra = ` <span class="spunta">${p.eserciziFatti.length}/${arg.esercizi.length}</span>`;
      navInt.appendChild(h(`<a class="scheda-tab${sid === scheda ? ' attiva' : ''}${sid === 'lab' ? ' tab-lab' : ''}" href="#/argomento/${v.id}/${sid}">${ICONE[icona]}${nome}${extra}</a>`));
    });
    const attiva = navInt.querySelector('.attiva'); if (attiva && attiva.scrollIntoView) setTimeout(() => attiva.scrollIntoView({ inline: 'center', block: 'nearest' }), 0);
    chiudiLab();
    const pannello = app.querySelector('#pannello'); pannello.innerHTML = ''; pannello.className = 'pannello';
    const disegna = { teoria: schedaTeoria, esempi: schedaEsempi, flashcard: schedaFlashcard, esercizi: schedaEsercizi, quiz: schedaQuiz, formulario: schedaFormulario, lab: schedaLab }[scheda] || schedaTeoria;
    disegna(pannello, arg, v, ancora);
    if (!ancora) window.scrollTo(0, 0);
  }

  /* ---------- scheda LABORATORIO: esperienze manipolative ---------- */
  function tesseraLab(l, conArgomento) {
    const va = voce(l.argomento);
    return h(`<a class="scheda tessera tessera-lab" href="#/argomento/${l.argomento}/lab/${l.id}">
      <div class="lab-icona">${esc(l.icona || '🧪')}</div>
      <div><h3>${esc(l.titolo)}</h3><p>${esc(l.sotto)}</p>${conArgomento && va ? `<small class="lab-arg">${esc(va.titolo)}</small>` : ''}</div></a>`);
  }
  function schedaLab(pannello, arg, v, labId) {
    const labs = labsDi(v.id);
    if (!labId && labs.length === 1) labId = labs[0].id;
    if (!labId) {
      pannello.appendChild(h('<p class="intro-scheda">Qui si impara con le mani: ogni laboratorio è un piccolo gioco che nasconde dentro il concetto. Non c\'è niente da leggere prima.</p>'));
      const g = h('<div class="griglia-lab"></div>'); labs.forEach(l => g.appendChild(tesseraLab(l))); pannello.appendChild(g); return;
    }
    const meta = labs.find(l => l.id === labId);
    if (!meta) { pannello.appendChild(h('<div class="scheda fc-vuoto">Laboratorio sconosciuto.</div>')); return; }
    const cornice = h(`<section class="lab-cornice">
      <header class="lab-testa"><div><h2>${esc(meta.icona || '🧪')} ${esc(meta.titolo)}</h2><p>${esc(meta.sotto)}</p></div>
        <div class="lab-azioni">${labs.length > 1 ? `<a class="btn piccolo" href="#/argomento/${v.id}/lab">Altri laboratori</a>` : ''}<button type="button" class="btn piccolo b-schermo" title="Schermo intero">${ICONE.schermo}</button></div></header>
      <div class="lab-stage" data-lab="${esc(meta.id)}"><div class="fc-vuoto">Carico il laboratorio…</div></div>
    </section>`);
    pannello.appendChild(cornice);
    const stage = cornice.querySelector('.lab-stage');
    cornice.querySelector('.b-schermo').addEventListener('click', () => { if (document.fullscreenElement) document.exitFullscreen(); else cornice.requestFullscreen().catch(() => {}); });
    const p = progresso(v.id); p.lab = p.lab || {}; const st = p.lab[meta.id] = p.lab[meta.id] || { livelli: [] };
    const ctx = {
      zenone: (testo, opz) => { if (stato.impostazioni.mascotte) CMASC.dici(testo, Object.assign({ tipo: 'commento', espressione: 'felice' }, opz || {})); },
      completato: (livello) => { if (!st.livelli.includes(livello)) st.livelli.push(livello); salva(); },
      stato: () => st, tema: () => document.documentElement.dataset.tema || 'chiaro', CGRAF: window.CGRAF,
      md: s => md(s), tex: (s, d) => (window.katex ? katex.renderToString(s, { throwOnError: false, displayMode: !!d, strict: 'ignore' }) : esc(s))
    };
    caricaLab(meta.id).then(lab => {
      if (!document.body.contains(stage)) return;
      stage.innerHTML = '';
      const sm = lab.monta(stage, ctx);
      smontaLab = typeof sm === 'function' ? sm : null;
      if (meta.intro && stato.impostazioni.mascotte && !sessionStorage.getItem('compasso.lab.' + meta.id)) {
        sessionStorage.setItem('compasso.lab.' + meta.id, '1');
        setTimeout(() => { if (document.body.contains(stage) && !CMASC.aperta()) CMASC.dici(meta.intro, { tipo: 'suggerimento', espressione: 'pensa' }); }, 1800);
      }
    }).catch(err => { stage.innerHTML = `<div class="fc-vuoto">Il laboratorio non si è caricato (${esc(err.message)}).</div>`; });
  }

  /* ---------- Teoria ---------- */
  function schedaTeoria(pan, arg, v, ancora) {
    const wrap = h('<div class="teoria"><aside class="sommario"><h4>In questa pagina</h4></aside><div class="colonna"></div></div>');
    const som = wrap.querySelector('.sommario'), col = wrap.querySelector('.colonna');
    som.appendChild(h('<a href="#/argomento/' + v.id + '/teoria/intro">Introduzione</a>'));
    const intro = h('<section class="intro sezione-intro" id="sez-intro"></section>'); intro.appendChild(frammento(arg.introduzione, arg)); col.appendChild(intro);
    arg.sezioni.forEach((s, i) => {
      som.appendChild(h(`<a href="#/argomento/${v.id}/teoria/${s.id}">${i + 1}. ${esc(s.titolo)}</a>`));
      const sez = h(`<section class="scheda sezione" id="sez-${esc(s.id)}"><h2><span class="num">${i + 1}.</span>${esc(s.titolo)}</h2></section>`);
      sez.appendChild(frammento(s.testo, arg)); col.appendChild(sez);
    });
    const fine = h(`<div class="riga-btn" style="margin:10px 0 30px"><a class="btn primario" href="#/argomento/${v.id}/esempi">Vai agli esempi svolti ${ICONE.destra}</a><a class="btn" href="#/argomento/${v.id}/flashcard">Ripassa con le flashcard</a></div>`);
    col.appendChild(fine);
    pan.appendChild(wrap);
    /* evidenzia la sezione visibile */
    const link = [...som.querySelectorAll('a')];
    const oss = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.id.replace(/^sez-/, ''); link.forEach(a => a.classList.toggle('attiva', a.getAttribute('href').endsWith('/' + id))); } });
    }, { rootMargin: '-120px 0px -70% 0px' });
    col.querySelectorAll('section').forEach(s => oss.observe(s));
    if (ancora) { const t = document.getElementById('sez-' + ancora); if (t) setTimeout(() => t.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }
  }

  /* ---------- Esempi ---------- */
  function schedaEsempi(pan, arg) {
    pan.appendChild(h('<p class="sotto-pagina">Esercizi svolti passo per passo, dal più semplice al più difficile. Prova a fare ogni passaggio prima di leggerlo.</p>'));
    arg.esempi.forEach((e, i) => {
      const card = h(`<article class="scheda esempio"><h3>Esempio ${i + 1} · ${esc(e.titolo)}</h3><div class="problema prosa"></div><ol class="passi"></ol></article>`);
      card.querySelector('.problema').innerHTML = md(e.problema);
      const ol = card.querySelector('.passi');
      e.passi.forEach(p => { const li = document.createElement('li'); li.className = 'prosa'; li.innerHTML = md(p); ol.appendChild(li); });
      if (e.risultato) { const r = h('<div class="risultato-finale prosa"></div>'); r.innerHTML = md(e.risultato); card.appendChild(r); }
      montaGrafici(card, arg); pan.appendChild(card);
    });
  }

  /* ---------- Formulario ---------- */
  function schedaFormulario(pan, arg) {
    const g = h('<div class="formulario"></div>');
    arg.formulario.forEach(f => {
      const c = h(`<div class="scheda formula"><h3>${esc(f.nome)}</h3><div class="f"></div>${f.nota ? '<div class="nota prosa"></div>' : ''}</div>`);
      c.querySelector('.f').innerHTML = tex(f.formula, true);
      if (f.nota) c.querySelector('.nota').innerHTML = md(f.nota);
      g.appendChild(c);
    });
    pan.appendChild(g);
  }

  /* =====================================================================
     FLASHCARD (Leitner a 4 scatole)
     ===================================================================== */
  const INTERVALLI = [0, 1, 3, 7, 14];   /* giorni per scatola 1..4 */
  function statoCarta(argId, cId) { const a = stato.carte[argId] || (stato.carte[argId] = {}); return a[cId] || (a[cId] = { scatola: 0, prossima: 0, viste: 0 }); }
  function valutaCarta(argId, cId, esito) {
    const c = statoCarta(argId, cId); c.viste++;
    if (esito === 'no') c.scatola = 1; else if (esito === 'quasi') c.scatola = Math.max(1, c.scatola); else c.scatola = Math.min(4, (c.scatola || 0) + 1);
    c.prossima = Date.now() + INTERVALLI[c.scatola] * GIORNO * (esito === 'no' ? 0 : 1) + (esito === 'no' ? 600000 : 0);
    salva(); aggiornaBadge();
  }
  function carteDi(arg) {
    const mie = (stato.carteMie[arg.id] || []).map(c => Object.assign({ mia: true }, c));
    return arg.flashcards.concat(mie);
  }
  function selezionate(arg) { const escl = new Set((stato.selezione[arg.id] || {}).esclusi || []); return carteDi(arg).filter(c => !escl.has(c.id)); }
  function impostaEsclusi(argId, ids) { stato.selezione[argId] = { esclusi: ids }; salva(); }

  /* componente di studio: mazzo = [{arg, carta}] */
  function studioFlashcard(pan, mazzo, opz) {
    opz = opz || {};
    if (!mazzo.length) { pan.appendChild(h('<div class="scheda fc-vuoto">' + (opz.vuoto || 'Nessuna carta selezionata: scegline qualcuna qui sotto.') + '</div>')); return; }
    let ordine = stato.impostazioni.mescola ? mescola(mazzo) : mazzo.slice();
    let i = 0, girata = false, serie = 0;
    const box = h(`<div>
      <div class="fc-barra"><span class="fc-contatore"></span><span class="spazio"></span>
        <button class="btn piccolo b-mescola" type="button">${ICONE.mescola} Mescola</button>
        ${opz.filtroDovute ? '<button class="btn piccolo b-dovute" type="button">Solo da ripassare</button>' : ''}
      </div>
      <div class="fc-scena"><div class="fc-carta" tabindex="0" role="button" aria-label="Flashcard: tocca per girare">
        <div class="fc-faccia fc-fronte"><span class="fc-tipo"></span><span class="fc-sez"></span><div class="testo prosa"></div><span class="fc-aiuto">tocca per girare</span></div>
        <div class="fc-faccia fc-retro"><span class="fc-tipo">Risposta</span><div class="testo prosa"></div><span class="fc-aiuto">Come è andata?</span></div>
      </div></div>
      <div class="fc-valuta" hidden>
        <button class="btn no" type="button" data-esito="no">Non la sapevo<small>la rivedrai subito</small></button>
        <button class="btn quasi" type="button" data-esito="quasi">Così così<small>domani</small></button>
        <button class="btn si" type="button" data-esito="si">La sapevo<small></small></button>
      </div>
      <div class="fc-nav"><button class="btn b-prev" type="button">${ICONE.sinistra} Precedente</button><button class="btn b-gira" type="button">${ICONE.gira} Gira</button><button class="btn b-next" type="button">Successiva ${ICONE.destra}</button></div>
    </div>`);
    pan.appendChild(box);
    const carta = box.querySelector('.fc-carta'), cont = box.querySelector('.fc-contatore'), valuta = box.querySelector('.fc-valuta');
    const fronte = box.querySelector('.fc-fronte .testo'), retro = box.querySelector('.fc-retro .testo');
    function mostra() {
      const { arg, carta: c } = ordine[i];
      girata = false; carta.classList.remove('girata'); valuta.hidden = true;
      fronte.innerHTML = md(c.fronte); retro.innerHTML = md(c.retro);
      box.querySelector('.fc-fronte .fc-tipo').textContent = c.tipo || (c.mia ? 'carta mia' : 'carta');
      box.querySelector('.fc-fronte').classList.toggle('mia', !!c.mia);
      const sez = arg.sezioni.find(s => s.id === c.sezione);
      box.querySelector('.fc-fronte .fc-sez').textContent = opz.multi ? arg.titolo : (sez ? sez.titolo : '');
      const sc = statoCarta(arg.id, c.id);
      box.querySelector('.si small').textContent = 'fra ' + INTERVALLI[Math.min(4, (sc.scatola || 0) + 1)] + ' giorni';
      cont.textContent = (i + 1) + ' / ' + ordine.length + (sc.scatola ? ' · scatola ' + sc.scatola : '');
    }
    function gira() { girata = !girata; carta.classList.toggle('girata', girata); valuta.hidden = !girata; }
    function avanti() { i = (i + 1) % ordine.length; mostra(); }
    function indietro() { i = (i - 1 + ordine.length) % ordine.length; mostra(); }
    carta.addEventListener('click', gira);
    carta.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); gira(); } });
    box.querySelector('.b-gira').addEventListener('click', gira);
    box.querySelector('.b-next').addEventListener('click', avanti);
    box.querySelector('.b-prev').addEventListener('click', indietro);
    box.querySelector('.b-mescola').addEventListener('click', () => { ordine = mescola(ordine); i = 0; mostra(); });
    if (opz.filtroDovute) box.querySelector('.b-dovute').addEventListener('click', ev => {
      const b = ev.currentTarget; const attivo = b.classList.toggle('attivo');
      const ora = Date.now();
      ordine = attivo ? mazzo.filter(x => { const c = statoCarta(x.arg.id, x.carta.id); return c.prossima > 0 && c.prossima <= ora; }) : (stato.impostazioni.mescola ? mescola(mazzo) : mazzo.slice());
      if (!ordine.length) { ordine = mazzo.slice(); b.classList.remove('attivo'); CMASC.dici('Non c\'è niente da ripassare oggi: le carte tornano quando è il momento. Studia pure tutto il mazzo.', { tipo: 'commento', durata: 5000 }); }
      i = 0; mostra();
    });
    valuta.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const { arg, carta: c } = ordine[i];
      valutaCarta(arg.id, c.id, b.dataset.esito);
      if (b.dataset.esito === 'si') { serie++; if (serie === 5) CMASC.dici('Cinque di fila. Vado a dirlo ad Achille.', { tipo: 'commento', espressione: 'orgoglioso', durata: 3500 }); } else serie = 0;
      if (b.dataset.esito === 'no' && !opz.multi) { /* la carta torna in coda */ ordine.push(ordine[i]); }
      avanti();
    }));
    const tasti = e => { if (!document.body.contains(box)) { window.removeEventListener('keydown', tasti); return; } if (e.target.matches('input,textarea,select')) return; if (e.key === 'ArrowRight') avanti(); else if (e.key === 'ArrowLeft') indietro(); else if (girata && ['1', '2', '3'].includes(e.key)) valuta.querySelectorAll('button')[+e.key - 1].click(); };
    window.addEventListener('keydown', tasti);
    mostra();
  }

  function schedaFlashcard(pan, arg, v) {
    const sel = selezionate(arg);
    const tot = carteDi(arg).length;
    pan.appendChild(h(`<p class="sotto-pagina">Tocca la carta per girarla, poi dimmi come è andata: le carte che non sai tornano prima, quelle che sai si allontanano (metodo Leitner). Stai studiando <b>${sel.length}</b> carte su ${tot}.</p>`));
    const studio = document.createElement('div'); pan.appendChild(studio);
    studioFlashcard(studio, sel.map(c => ({ arg, carta: c })), { filtroDovute: true });

    /* --- pannello di scelta --- */
    const det = h(`<details class="scheda fc-selezione"><summary>Scegli quali carte studiare, o aggiungine di tue</summary>
      <div class="riga-btn" style="margin-top:10px"><button class="btn piccolo b-tutte" type="button">Tutte</button><button class="btn piccolo b-nessuna" type="button">Nessuna</button><button class="btn piccolo b-inverti" type="button">Inverti</button><span class="fc-contatore b-conta"></span></div>
      <div class="gruppi"></div>
      <form class="fc-nuova"><b>Nuova carta mia</b>
        <label>Fronte (domanda)<textarea name="fronte" required placeholder="Puoi usare la matematica fra $…$"></textarea></label>
        <label>Retro (risposta)<textarea name="retro" required></textarea></label>
        <label>Sezione <select name="sezione">${arg.sezioni.map(s => `<option value="${esc(s.id)}">${esc(s.titolo)}</option>`).join('')}</select></label>
        <div class="riga-btn"><button class="btn primario piccolo" type="submit">Aggiungi la carta</button></div>
      </form></details>`);
    pan.appendChild(det);
    const gruppi = det.querySelector('.gruppi');
    function ridisegnaGruppi() {
      gruppi.innerHTML = '';
      const escl = new Set((stato.selezione[arg.id] || {}).esclusi || []);
      const tutte = carteDi(arg);
      const sezioni = arg.sezioni.concat([{ id: '__altre', titolo: 'Altre' }]);
      sezioni.forEach(s => {
        const carte = tutte.filter(c => (arg.sezioni.some(z => z.id === c.sezione) ? c.sezione : '__altre') === s.id);
        if (!carte.length) return;
        const g = h(`<div class="fc-gruppo"><div class="fc-gruppo-testa"><span>${esc(s.titolo)}</span><span class="fc-contatore">${carte.filter(c => !escl.has(c.id)).length}/${carte.length}</span><button class="btn piccolo fantasma" type="button">tutte / nessuna</button></div></div>`);
        g.querySelector('button').addEventListener('click', () => { const tutteSel = carte.every(c => !escl.has(c.id)); carte.forEach(c => tutteSel ? escl.add(c.id) : escl.delete(c.id)); impostaEsclusi(arg.id, [...escl]); ridisegnaGruppi(); });
        carte.forEach(c => {
          const sc = statoCarta(arg.id, c.id);
          const riga = h(`<label class="fc-voce"><input type="checkbox" ${escl.has(c.id) ? '' : 'checked'}><span><span class="fronte-mini prosa"></span><span class="retro-mini prosa"></span></span><span class="stato">${sc.scatola ? 'scatola ' + sc.scatola : ''}${c.mia ? ' <button class="btn piccolo fantasma b-elimina" type="button" title="Elimina">✕</button>' : ''}</span></label>`);
          riga.querySelector('.fronte-mini').innerHTML = md(c.fronte); riga.querySelector('.retro-mini').innerHTML = md(c.retro);
          riga.querySelector('input').addEventListener('change', ev => { ev.target.checked ? escl.delete(c.id) : escl.add(c.id); impostaEsclusi(arg.id, [...escl]); g.querySelector('.fc-contatore').textContent = carte.filter(x => !escl.has(x.id)).length + '/' + carte.length; aggiornaConta(); });
          const del = riga.querySelector('.b-elimina');
          if (del) del.addEventListener('click', ev => { ev.preventDefault(); stato.carteMie[arg.id] = (stato.carteMie[arg.id] || []).filter(x => x.id !== c.id); salva(); ridisegnaGruppi(); });
          g.appendChild(riga);
        });
        gruppi.appendChild(g);
      });
      aggiornaConta();
    }
    function aggiornaConta() { const n = selezionate(arg).length; det.querySelector('.b-conta').textContent = n + ' selezionate · ricarica la scheda per studiarle'; }
    det.querySelector('.b-tutte').addEventListener('click', () => { impostaEsclusi(arg.id, []); ridisegnaGruppi(); });
    det.querySelector('.b-nessuna').addEventListener('click', () => { impostaEsclusi(arg.id, carteDi(arg).map(c => c.id)); ridisegnaGruppi(); });
    det.querySelector('.b-inverti').addEventListener('click', () => { const escl = new Set((stato.selezione[arg.id] || {}).esclusi || []); impostaEsclusi(arg.id, carteDi(arg).filter(c => !escl.has(c.id)).map(c => c.id)); ridisegnaGruppi(); });
    det.querySelector('form').addEventListener('submit', ev => {
      ev.preventDefault(); const f = ev.target;
      const lista = stato.carteMie[arg.id] || (stato.carteMie[arg.id] = []);
      lista.push({ id: 'mia-' + Date.now().toString(36), fronte: f.fronte.value.trim(), retro: f.retro.value.trim(), sezione: f.sezione.value, tipo: 'concetto' });
      salva(); f.reset(); ridisegnaGruppi();
      CMASC.dici('Carta aggiunta al mazzo. La trovi mescolata alle altre alla prossima apertura della scheda.', { tipo: 'commento', espressione: 'felice', durata: 4000, azioni: [{ testo: 'Ricarica adesso', fn: () => disegnaArgomento(v, arg, 'flashcard') }] });
    });
    ridisegnaGruppi();
    det.querySelector('.b-conta').textContent = '';
    det.addEventListener('toggle', () => { if (!det.open && selezionate(arg).length !== sel.length) disegnaArgomento(v, arg, 'flashcard'); });
  }

  /* =====================================================================
     ESERCIZI
     ===================================================================== */
  function normalizza(s) {
    return String(s).toLowerCase().replace(/\s+/g, '').replace(/−/g, '-').replace(/×|·/g, '*').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/≠/g, '!=').replace(/²/g, '^2').replace(/³/g, '^3').replace(/,/g, '.').replace(/\.$/, '').replace(/\*\*/g, '^').replace(/^x=/, '').replace(/[«»"']/g, '');
  }
  function numeroDa(s) {
    s = String(s).trim().replace(/−/g, '-').replace(/,/g, '.').replace(/\s+/g, '');
    let m = s.match(/^([-+]?\d+(?:\.\d+)?)\/([-+]?\d+(?:\.\d+)?)$/); if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    m = s.match(/^([-+]?)(?:√|sqrt\(?)(\d+(?:\.\d+)?)\)?$/); if (m) return (m[1] === '-' ? -1 : 1) * Math.sqrt(parseFloat(m[2]));
    if (/^[-+]?\d+(?:\.\d+)?$/.test(s)) return parseFloat(s);
    if (/^[-+]?(inf|∞|infinito)$/.test(s)) return s.startsWith('-') ? -Infinity : Infinity;
    return NaN;
  }
  function numeriDa(s) {
    s = String(s).replace(/−/g, '-').replace(/,/g, '.');
    s = s.replace(/±\s*(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?)/g, '-$1 $1');
    const trovati = s.match(/[-+]?\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?/g) || [];
    return trovati.map(numeroDa).filter(n => isFinite(n));
  }
  const vicino = (a, b, tol) => Math.abs(a - b) <= (tol != null ? tol : Math.max(0.01, Math.abs(b) * 1e-3));
  function controllaRisposta(r, valoreUtente) {
    if (r.tipo === 'numero') { const n = numeroDa(valoreUtente); return isFinite(n) && vicino(n, r.valore, r.tolleranza); }
    if (r.tipo === 'numeri') {
      const dati = numeriDa(valoreUtente); if (dati.length !== r.valori.length) return false;
      const resto = r.valori.slice();
      for (const d of dati) { const k = resto.findIndex(v => vicino(d, v, r.tolleranza)); if (k < 0) return false; resto.splice(k, 1); }
      return true;
    }
    if (r.tipo === 'testo') { const u = normalizza(valoreUtente); return r.accettate.some(a => normalizza(a) === u); }
    if (r.tipo === 'intervallo') {
      const u = valoreUtente; const da = numeroDa(u.da), a = numeroDa(u.a);
      const rda = r.da === '-inf' ? -Infinity : r.da, ra = r.a === 'inf' ? Infinity : r.a;
      if (!(da === rda || vicino(da, rda, r.tolleranza)) || !(a === ra || vicino(a, ra, r.tolleranza))) return false;
      if (isFinite(rda) && !!u.chiusoDa !== !!r.chiusoDa) return false;
      if (isFinite(ra) && !!u.chiusoA !== !!r.chiusoA) return false;
      return true;
    }
    return false;
  }

  function schedaEsercizi(pan, arg, v) {
    const p = progresso(v.id);
    let filtro = 0, nascondiFatti = false;
    pan.appendChild(h('<p class="sotto-pagina">Prova da solo. Se ti blocchi, chiedi un suggerimento a Zenone: te li dà uno alla volta. La soluzione completa è sempre lì sotto, ma aprila per ultima.</p>'));
    const filtri = h(`<div class="es-filtri"><button class="btn piccolo attivo" data-d="0" type="button">Tutti</button><button class="btn piccolo" data-d="1" type="button">★ facili</button><button class="btn piccolo" data-d="2" type="button">★★ medi</button><button class="btn piccolo" data-d="3" type="button">★★★ difficili</button><span class="spazio" style="flex:1"></span><label class="fatto-spunta" style="display:inline-flex;gap:6px;align-items:center;font-size:.86rem;color:var(--testo2)"><input type="checkbox" class="b-nascondi"> nascondi i fatti</label></div>`);
    pan.appendChild(filtri);
    const lista = document.createElement('div'); pan.appendChild(lista);
    filtri.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => { filtro = +b.dataset.d; filtri.querySelectorAll('[data-d]').forEach(x => x.classList.toggle('attivo', x === b)); applica(); }));
    filtri.querySelector('.b-nascondi').addEventListener('change', e => { nascondiFatti = e.target.checked; applica(); });
    function applica() { lista.querySelectorAll('.esercizio').forEach(el => { const d = +el.dataset.d, fatto = el.classList.contains('fatto'); el.hidden = (filtro && d !== filtro) || (nascondiFatti && fatto); }); }

    arg.esercizi.forEach((e, i) => {
      const fatto = p.eserciziFatti.includes(e.id);
      const card = h(`<article class="scheda esercizio${fatto ? ' fatto' : ''}" data-d="${e.difficolta}" id="es-${esc(e.id)}">
        <div class="es-testa"><span class="numero">${i + 1}.</span><span class="stelle">${'★'.repeat(e.difficolta)}${'☆'.repeat(3 - e.difficolta)}</span><label class="fatto-spunta"><input type="checkbox" ${fatto ? 'checked' : ''}> fatto</label></div>
        <div class="testo prosa"></div>
        <div class="es-suggerimenti"></div>
        <div class="es-risposta" hidden></div>
        <div class="es-esito" hidden></div>
        <div class="es-azioni"><button class="btn piccolo b-sugg" type="button">${ICONE.lampadina} Suggerimento</button><button class="btn piccolo b-sol" type="button">Mostra la soluzione</button></div>
        <div class="es-soluzione" hidden><b>Soluzione</b><ol class="passi"></ol></div>
      </article>`);
      card.querySelector('.testo').innerHTML = md(e.testo);
      card.querySelector('.fatto-spunta input').addEventListener('change', ev => { segnaFatto(e.id, ev.target.checked); card.classList.toggle('fatto', ev.target.checked); });
      /* suggerimenti progressivi */
      let dati = 0; const sugg = card.querySelector('.es-suggerimenti');
      card.querySelector('.b-sugg').addEventListener('click', () => {
        if (dati >= e.suggerimenti.length) { CMASC.dici('Suggerimenti finiti: ora tocca a te. Se proprio non va, guarda la soluzione e poi rifallo da capo.', { tipo: 'commento', espressione: 'pensa', durata: 5000 }); return; }
        const s = e.suggerimenti[dati]; dati++;
        const r = h('<div class="riquadro nota prosa"></div>'); r.innerHTML = md(s); sugg.appendChild(r);
        CMASC.dici(md(s), { tipo: 'suggerimento', html: true, titolo: 'Suggerimento ' + dati + ' di ' + e.suggerimenti.length, espressione: 'pensa', azioni: dati < e.suggerimenti.length ? [{ testo: 'Un altro', fn: () => card.querySelector('.b-sugg').click() }] : [] });
        card.querySelector('.b-sugg').textContent = dati < e.suggerimenti.length ? 'Altro suggerimento (' + (e.suggerimenti.length - dati) + ')' : 'Suggerimenti finiti';
      });
      /* soluzione */
      const sol = card.querySelector('.es-soluzione'); const ol = sol.querySelector('.passi');
      e.soluzione.forEach(s => { const li = document.createElement('li'); li.className = 'prosa'; li.innerHTML = md(s); ol.appendChild(li); });
      card.querySelector('.b-sol').addEventListener('click', ev => { sol.hidden = !sol.hidden; ev.target.textContent = sol.hidden ? 'Mostra la soluzione' : 'Nascondi la soluzione'; if (!sol.hidden) montaGrafici(sol, arg); });
      /* risposta controllabile */
      if (e.risposta) {
        const box = card.querySelector('.es-risposta'); box.hidden = false;
        const esito = card.querySelector('.es-esito');
        let leggi;
        if (e.risposta.tipo === 'intervallo') {
          box.innerHTML = `<span class="intervallo"><select class="pa"><option value="(">(</option><option value="[">[</option></select><input class="da" placeholder="−∞ o numero"><span>;</span><input class="a" placeholder="+∞ o numero"><select class="pb"><option value=")">)</option><option value="]">]</option></select></span><button class="btn piccolo primario b-ok" type="button">Controlla</button>`;
          leggi = () => ({ da: box.querySelector('.da').value, a: box.querySelector('.a').value, chiusoDa: box.querySelector('.pa').value === '[', chiusoA: box.querySelector('.pb').value === ']' });
        } else {
          const ph = { numero: 'La tua risposta (es. 2,5 oppure 5/2)', numeri: 'Le soluzioni (es. -1; 3)', testo: 'La tua risposta' }[e.risposta.tipo];
          box.innerHTML = `<input type="text" placeholder="${ph}" autocomplete="off"><button class="btn piccolo primario b-ok" type="button">Controlla</button>`;
          leggi = () => box.querySelector('input').value;
          box.querySelector('input').addEventListener('keydown', ev => { if (ev.key === 'Enter') box.querySelector('.b-ok').click(); });
        }
        let tentativi = 0;
        box.querySelector('.b-ok').addEventListener('click', () => {
          const val = leggi(); if (val === '' || (typeof val === 'object' && !val.da && !val.a)) return;
          const ok = controllaRisposta(e.risposta, val); tentativi++;
          esito.hidden = false; esito.className = 'es-esito ' + (ok ? 'ok' : 'no');
          esito.textContent = ok ? 'Giusto!' : (tentativi >= 2 ? 'Non ancora. Prova un suggerimento, o guarda la soluzione.' : 'Non è questa. Ricontrolla i calcoli e riprova.');
          if (ok) { segnaFatto(e.id, true); card.classList.add('fatto'); card.querySelector('.fatto-spunta input').checked = true; CMASC.dici(scegli(['Giusto!', 'Esatto, proprio così.', 'Corretto. Avanti con il prossimo.', 'Sì. Lo sapevo che ce l\'avresti fatta.']), { tipo: 'commento', espressione: 'felice', durata: 2500 }); }
          else CMASC.espressione('pensa');
        });
      }
      montaGrafici(card, arg);
      lista.appendChild(card);
    });
    function segnaFatto(id, si) { const f = p.eserciziFatti; const k = f.indexOf(id); if (si && k < 0) f.push(id); if (!si && k >= 0) f.splice(k, 1); salva(); const tab = app.querySelector('.scheda-tab[href$="/esercizi"] .spunta'); if (tab) tab.textContent = f.length + '/' + arg.esercizi.length; }
  }

  /* =====================================================================
     QUIZ
     ===================================================================== */
  function schedaQuiz(pan, arg, v) {
    const p = progresso(v.id);
    const avvio = h(`<div class="scheda quiz-avvio"><h2>Quiz di teoria</h2><p>Domande su definizioni, proprietà e ragionamenti: niente calcoli lunghi. Dopo ogni risposta vedi subito se è giusta e perché.${p.quizTot ? `<br>Il tuo miglior risultato: <b>${p.quizMigliore}/${p.quizTot}</b>.` : ''}</p>
      <div class="quiz-opz"><span style="align-self:center;color:var(--testo2)">Quante domande?</span>${[5, 10, arg.quiz.length].filter((n, i, a) => n <= arg.quiz.length && a.indexOf(n) === i).map(n => `<button class="btn" data-n="${n}" type="button">${n === arg.quiz.length ? 'Tutte (' + n + ')' : n}</button>`).join('')}</div></div>`);
    pan.appendChild(avvio);
    avvio.querySelectorAll('[data-n]').forEach(b => b.addEventListener('click', () => avviaQuiz(pan, arg, v, +b.dataset.n)));
  }
  function avviaQuiz(pan, arg, v, n) {
    pan.innerHTML = '';
    const domande = mescola(arg.quiz).slice(0, n).map(q => {
      const opz = q.opzioni.map((o, i) => ({ testo: o, giusta: i === q.corretta }));
      return { q, opz: mescola(opz) };
    });
    let i = 0, punteggio = 0; const esiti = [];
    const barra = h('<div class="quiz-barra"><i style="width:0%"></i></div>'); pan.appendChild(barra);
    const card = h('<div class="scheda quiz-domanda"></div>'); pan.appendChild(card);
    function mostra() {
      const d = domande[i];
      barra.querySelector('i').style.width = (i / domande.length * 100) + '%';
      card.innerHTML = `<div class="num">Domanda ${i + 1} di ${domande.length}</div><h3 class="prosa">${md(d.q.domanda)}</h3><div class="quiz-opzioni"></div><div class="quiz-spiega prosa" hidden></div><div class="riga-btn" style="margin-top:14px;justify-content:flex-end"><button class="btn primario b-avanti" type="button" hidden>${i + 1 < domande.length ? 'Avanti' : 'Vedi il risultato'} ${ICONE.destra}</button></div>`;
      const cont = card.querySelector('.quiz-opzioni');
      d.opz.forEach((o, k) => {
        const b = h(`<button class="quiz-opzione prosa" type="button" data-lettera="${'ABCD'[k]}"></button>`); b.innerHTML = md(o.testo);
        b.addEventListener('click', () => {
          cont.querySelectorAll('button').forEach(x => { x.disabled = true; });
          b.classList.add(o.giusta ? 'giusta' : 'sbagliata');
          cont.querySelectorAll('button').forEach((x, j) => { if (d.opz[j].giusta) x.classList.add('giusta'); });
          if (o.giusta) punteggio++;
          esiti.push({ q: d.q, ok: o.giusta });
          const sp = card.querySelector('.quiz-spiega'); sp.hidden = false; sp.innerHTML = md(d.q.spiegazione);
          card.querySelector('.b-avanti').hidden = false;
          CMASC.espressione(o.giusta ? 'felice' : 'pensa');
        });
        cont.appendChild(b);
      });
      card.querySelector('.b-avanti').addEventListener('click', () => { i++; if (i < domande.length) mostra(); else fine(); });
      montaGrafici(card, arg);
      window.scrollTo({ top: Math.max(0, card.getBoundingClientRect().top + window.scrollY - 130), behavior: 'smooth' });
    }
    function fine() {
      const p = progresso(v.id);
      if (!p.quizTot || punteggio / domande.length > p.quizMigliore / p.quizTot) { p.quizMigliore = punteggio; p.quizTot = domande.length; }
      p.quizUltimo = punteggio; salva();
      barra.querySelector('i').style.width = '100%';
      const frazione = punteggio / domande.length;
      const commento = frazione === 1 ? 'Tutte giuste. Non ho niente da aggiungere, e per una tartaruga è raro.' : frazione >= 0.7 ? 'Bene. Le sbagliate le trovi qui sotto con la spiegazione: rileggile e sono tue.' : frazione >= 0.5 ? 'A metà strada. Torna alla teoria per le sezioni delle domande sbagliate, poi rifai il quiz.' : 'Questa volta è andata così. Ripassa la teoria con calma: il quiz non scappa, e nemmeno io.';
      card.innerHTML = `<div class="quiz-risultato"><div class="punteggio">${punteggio} / ${domande.length}</div><div class="commento">${esc(commento)}</div>
        <div class="riga-btn" style="justify-content:center"><button class="btn primario b-rifai" type="button">Rifai il quiz</button><a class="btn" href="#/argomento/${v.id}/teoria">Torna alla teoria</a><a class="btn" href="#/argomento/${v.id}/esercizi">Vai agli esercizi</a></div>
        <div class="quiz-riepilogo"></div></div>`;
      const rie = card.querySelector('.quiz-riepilogo');
      esiti.forEach(e => { const x = h(`<div class="voce ${e.ok ? 'ok' : 'no'}"><span class="segno">${e.ok ? '✓' : '✕'}</span><div class="prosa"></div></div>`); x.querySelector('.prosa').innerHTML = md(e.q.domanda) + (e.ok ? '' : '<div class="quiz-spiega">' + md(e.q.spiegazione) + '</div>'); rie.appendChild(x); });
      card.querySelector('.b-rifai').addEventListener('click', () => avviaQuiz(pan, arg, v, n));
      const tab = app.querySelector('.scheda-tab[href$="/quiz"]'); if (tab) { let s = tab.querySelector('.spunta'); if (!s) { s = document.createElement('span'); s.className = 'spunta'; tab.appendChild(document.createTextNode(' ')); tab.appendChild(s); } s.textContent = p.quizMigliore + '/' + p.quizTot; }
      CMASC.dici(commento, { tipo: 'commento', espressione: frazione >= 0.7 ? 'orgoglioso' : 'pensa', azioni: [{ testo: 'Raccontami un aneddoto', fn: () => raccontaAneddoto(arg) }] });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    mostra();
  }

  /* =====================================================================
     RIPASSO GLOBALE
     ===================================================================== */
  function paginaRipasso(azione) {
    paginaCorrente = 'ripasso'; document.title = 'Ripasso — Compasso';
    svuota();
    const ora = Date.now();
    const argomentiConCarte = IND.argomenti.filter(a => stato.progressi[a.id] && stato.progressi[a.id].visitato);
    app.appendChild(h(`<h1 class="titolo-pagina">Ripasso</h1><p class="sotto-pagina">Le flashcard di tutti gli argomenti che hai aperto, con il metodo delle scatole: una carta che sai passa alla scatola successiva e torna dopo più tempo (1, 3, 7, 14 giorni); una che non sai torna nella prima scatola. Studia solo le carte che hai selezionato in ogni argomento.</p>`));
    if (!argomentiConCarte.length) { app.appendChild(h('<div class="scheda fc-vuoto">Non hai ancora aperto nessun argomento. <a href="#/">Comincia da uno</a>: le sue carte compariranno qui.</div>')); return; }
    const scelta = h('<div class="scheda" style="padding:16px 20px"><b>Argomenti da includere</b><div class="scelta-argomenti"></div><div class="riga-btn"><button class="btn primario b-dovute" type="button">Ripassa le carte in scadenza</button><button class="btn b-tutte" type="button">Studia tutte le selezionate</button></div></div>');
    const griglia = scelta.querySelector('.scelta-argomenti');
    const inclusi = new Set(JSON.parse(sessionStorage.getItem('compasso.ripasso') || 'null') || argomentiConCarte.map(a => a.id));
    argomentiConCarte.forEach(a => {
      const carte = stato.carte[a.id] || {}; const dovute = Object.values(carte).filter(c => c.prossima && c.prossima <= ora).length;
      const l = h(`<label><input type="checkbox" ${inclusi.has(a.id) ? 'checked' : ''}> ${esc(a.titolo)} <small>${dovute ? dovute + ' in scadenza' : ''}</small></label>`);
      l.querySelector('input').addEventListener('change', e => { e.target.checked ? inclusi.add(a.id) : inclusi.delete(a.id); sessionStorage.setItem('compasso.ripasso', JSON.stringify([...inclusi])); });
      griglia.appendChild(l);
    });
    app.appendChild(scelta);
    const studio = document.createElement('div'); studio.style.marginTop = '18px'; app.appendChild(studio);
    async function avvia(soloDovute) {
      studio.innerHTML = '<div class="fc-vuoto">Preparo il mazzo…</div>';
      const ids = [...inclusi]; const argomenti = await Promise.all(ids.map(id => caricaArgomento(id).catch(() => null)));
      let mazzo = [];
      argomenti.forEach(arg => { if (!arg) return; selezionate(arg).forEach(c => { const sc = statoCarta(arg.id, c.id); if (!soloDovute || (sc.prossima > 0 && sc.prossima <= Date.now())) mazzo.push({ arg, carta: c }); }); });
      studio.innerHTML = '';
      if (soloDovute && !mazzo.length) { studio.appendChild(h('<div class="scheda fc-vuoto">Nessuna carta in scadenza oggi. Puoi studiare comunque tutte le selezionate.</div>')); CMASC.dici('Oggi niente da ripassare: le scatole sono in ordine. Torna domani, o studia tutto il mazzo.', { tipo: 'commento', espressione: 'felice', durata: 6000 }); return; }
      mazzo = mazzo.sort((x, y) => statoCarta(x.arg.id, x.carta.id).prossima - statoCarta(y.arg.id, y.carta.id).prossima);
      studioFlashcard(studio, mazzo, { multi: true, vuoto: 'Nessuna carta selezionata negli argomenti scelti.' });
      studio.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    scelta.querySelector('.b-dovute').addEventListener('click', () => avvia(true));
    scelta.querySelector('.b-tutte').addEventListener('click', () => avvia(false));
    if (azione === 'oggi' || carteDaRipassare()) avvia(true);
  }

  /* =====================================================================
     GALLERIA DEI MATEMATICI
     ===================================================================== */
  const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  /* stessa persona scritta in modi diversi ("Leonhard Euler", "Eulero", "Erone di Alessandria (e ...)") → una chiave sola */
  const ALIAS = { euler: 'eulero', descartes: 'cartesio', hopital: 'de-l-hopital', lhopital: 'de-l-hopital', khwarizmi: 'al-khwarizmi', nepero: 'napier', neper: 'napier', tolomeo: 'tolomeo', ptolemy: 'tolomeo', pythagoras: 'pitagora', euclid: 'euclide', archimedes: 'archimede', thales: 'talete', regiomontanus: 'regiomontano' };
  const FERMI = new Set(['di', 'da', 'de', 'del', 'della', 'dei', 'degli', 'von', 'van', 'la', 'le', 'il', 'lo', 'gli', 'i', 'the', 'alessandria', 'siracusa', 'cirene', 'pisa', 'milano', 'cusa', 'samo', 'mileto', 'elea', 'chio', 'cremona', 'norimberga', 'boemia', 'saint', 'vincent', 'jr', 'sr', 'ii', 'iii']);
  function chiaveMatematico(nome) {
    const base = String(nome).replace(/\([^)]*\)/g, '').trim();
    if (/\s+e\s+/i.test(base) && base.split(/\s+e\s+/).length === 2 && /^[A-ZÀ-Ý]/.test(base.split(/\s+e\s+/)[1] || '')) return slug(base);   /* coppie: "Tartaglia e Cardano" restano coppie */
    const tok = slug(base).split('-').filter(t => t && !FERMI.has(t));
    if (!tok.length) return slug(base);
    if (tok[0] === 'al' && tok[1]) return 'al-' + tok[1];
    const ultimo = tok[tok.length - 1];
    return ALIAS[ultimo] || ultimo;
  }
  function annoDa(anni) {
    const m = String(anni).match(/(\d{3,4})/); if (!m) return null;
    let a = parseInt(m[1], 10); if (/a\.\s?C/i.test(anni)) a = -a; return a;
  }
  const coloreDa = s => 'var(--a' + ((slug(s).split('').reduce((x, c) => x + c.charCodeAt(0), 0) % 6) + 1) + ')';
  function paginaMatematici(sel) {
    paginaCorrente = 'matematici'; document.title = 'I matematici — Compasso';
    svuota();
    app.appendChild(h('<h1 class="titolo-pagina">Le persone dietro le formule</h1><p class="sotto-pagina">Tutti gli aneddoti che Zenone racconta, raccolti per matematico. Tocca un nome per leggere le storie e vedere in quali argomenti compare.</p>'));
    const cont = h('<div class="fc-vuoto">Sto raccogliendo le storie da tutti gli argomenti…</div>'); app.appendChild(cont);
    Promise.all(IND.argomenti.map(a => caricaArgomento(a.id).catch(() => null))).then(argomenti => {
      const persone = {};
      argomenti.forEach(arg => { if (!arg) return; (arg.aneddoti || []).forEach(an => {
        const k = chiaveMatematico(an.matematico);
        const p = persone[k] || (persone[k] = { chiave: k, nome: an.matematico, anni: an.anni, anno: annoDa(an.anni), storie: [] });
        const pulito = String(an.matematico).replace(/\([^)]*\)/g, '').trim();
        if (pulito.length < p.nome.length && !/^(gli|i|le|la)\s/i.test(pulito)) p.nome = pulito;   /* la forma più corta è di solito la più pulita */
        if (p.anno == null && annoDa(an.anni) != null) { p.anno = annoDa(an.anni); p.anni = an.anni; }
        p.storie.push({ an, arg });
      }); });
      const lista = Object.values(persone).sort((a, b) => (a.anno == null ? 9999 : a.anno) - (b.anno == null ? 9999 : b.anno));
      cont.innerHTML = '';
      if (!lista.length) { cont.textContent = 'Nessun aneddoto disponibile.'; return; }
      /* dettaglio */
      const det = document.createElement('div'); cont.appendChild(det);
      function mostraDettaglio(p) {
        det.innerHTML = '';
        const d = h(`<section class="scheda mat-dettaglio"><div style="display:flex;gap:14px;align-items:center;margin-bottom:6px"><span class="ritratto" style="background:${coloreDa(p.nome)};width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-titoli);font-weight:700;font-size:1.3rem;flex:none">${esc(iniziali(p.nome))}</span><div><h2>${esc(p.nome)}</h2><div style="color:var(--testo2)">${esc(p.anni)}</div></div></div></section>`);
        p.storie.forEach(({ an, arg }) => {
          const a = h(`<article class="aneddoto"><h3>${esc(an.titolo)}</h3><div class="prosa"></div><div class="legame"></div></article>`);
          a.querySelector('.prosa').innerHTML = md(an.testo);
          a.querySelector('.legame').innerHTML = (an.legame ? md(an.legame) : '') + `<a href="#/argomento/${arg.id}">→ ${esc(arg.titolo)}</a>`;
          d.appendChild(a);
        });
        det.appendChild(d);
        det.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      /* linea del tempo */
      const conAnno = lista.filter(p => p.anno != null);
      if (conAnno.length > 1) {
        const min = Math.min(...conAnno.map(p => p.anno)), max = Math.max(...conAnno.map(p => p.anno));
        /* scala a tratti: l'antichità è lunga e vuota, gli ultimi cinque secoli sono pieni */
        const nodi = [[min, 0], [0, 0.18], [1500, 0.38], [Math.max(max, 1950), 1]].filter((n, i, a) => i === 0 || n[0] > a[i - 1][0]);
        const posTempo = anno => { for (let i = 1; i < nodi.length; i++) if (anno <= nodi[i][0]) return (nodi[i - 1][1] + (anno - nodi[i - 1][0]) / (nodi[i][0] - nodi[i - 1][0]) * (nodi[i][1] - nodi[i - 1][1])) * 100; return 100; };
        const lt = h('<div class="linea-tempo"><div class="asse"></div></div>'); const asse = lt.querySelector('.asse');
        conAnno.forEach(p => {
          const x = posTempo(p.anno);
          const t = h(`<span class="tacca" style="left:${x}%;background:${coloreDa(p.nome)}" title="${esc(p.nome)} (${esc(p.anni)})"></span>`);
          t.addEventListener('click', () => mostraDettaglio(p));
          asse.appendChild(t);
        });
        [-1800, -500, 0, 500, 1000, 1500, 1650, 1800, 1950].filter(a => a >= min - 100 && a <= Math.max(max, 1950)).forEach((a, i) => asse.appendChild(h(`<span class="anno ${i % 2 ? 'sopra' : ''}" style="left:${posTempo(a)}%">${a < 0 ? -a + ' a.C.' : a}</span>`)));
        cont.appendChild(lt);
      }
      const griglia = h('<div class="griglia-mat"></div>');
      lista.forEach(p => {
        const c = h(`<div class="scheda mat" role="button" tabindex="0"><span class="ritratto" style="background:${coloreDa(p.nome)}">${esc(iniziali(p.nome))}</span><div><h3>${esc(p.nome)}</h3><small>${esc(p.anni)} · ${p.storie.length} ${p.storie.length === 1 ? 'storia' : 'storie'}</small></div></div>`);
        c.addEventListener('click', () => { history.replaceState(null, '', '#/matematici/' + p.chiave); mostraDettaglio(p); });
        c.addEventListener('keydown', e => { if (e.key === 'Enter') c.click(); });
        griglia.appendChild(c);
      });
      cont.appendChild(griglia);
      if (sel) { const p = persone[sel] || persone[chiaveMatematico(sel.replace(/-/g, ' '))]; if (p) mostraDettaglio(p); }
    });
  }
  function iniziali(nome) { const parti = nome.replace(/^(gli|i|le|la|il)\s+/i, '').split(/\s+e\s+|\s+/).filter(w => /^[A-ZÀ-Ý]/.test(w)); return (parti[0] || nome)[0] + (parti.length > 1 ? parti[parti.length - 1][0] : ''); }

  /* =====================================================================
     IMPOSTAZIONI
     ===================================================================== */
  function paginaImpostazioni() {
    paginaCorrente = 'impostazioni'; document.title = 'Impostazioni — Compasso';
    svuota();
    const imp = stato.impostazioni;
    app.appendChild(h('<h1 class="titolo-pagina">Impostazioni</h1>'));
    app.appendChild(h('<p class="sotto-pagina">Tutto quello che fai (progressi, carte, selezioni) resta in questo browser. Puoi esportarlo e reimportarlo su un altro dispositivo.</p>'));
    const sez = h('<section class="scheda"></section>'); app.appendChild(sez);
    sez.innerHTML = `
      <div class="impostazione"><div class="desc">Tema<small>Chiaro, scuro o come il sistema.</small></div><select class="s-tema" style="padding:8px;border-radius:8px;border:1px solid var(--bordo2);background:var(--sup)"><option value="auto">Automatico</option><option value="chiaro">Chiaro</option><option value="scuro">Scuro</option></select></div>
      <div class="impostazione"><div class="desc">Zenone, la mascotte<small>Suggerimenti e aneddoti mentre studi. Spenta, resta comunque disponibile nei pulsanti «Suggerimento».</small></div><button class="interruttore s-masc" role="switch" aria-checked="${imp.mascotte}" type="button"></button></div>
      <div class="impostazione"><div class="desc">Mescola le flashcard<small>Se è spento, le carte seguono l'ordine della teoria.</small></div><button class="interruttore s-mesc" role="switch" aria-checked="${imp.mescola}" type="button"></button></div>
      <div class="impostazione"><div class="desc">Esporta i progressi<small>Un file JSON con progressi, carte tue e selezioni.</small></div><button class="btn piccolo s-esp" type="button">Esporta</button></div>
      <div class="impostazione"><div class="desc">Importa i progressi<small>Sostituisce quelli attuali.</small></div><label class="btn piccolo">Scegli il file<input type="file" accept="application/json" class="s-imp" hidden></label></div>
      <div class="impostazione"><div class="desc">Azzera tutto<small>Cancella progressi, carte tue e selezioni. Non si torna indietro.</small></div><button class="btn piccolo s-azz" type="button" style="color:var(--no);border-color:var(--no)">Azzera</button></div>`;
    app.appendChild(h(`<div class="versione">Compasso v${VERSIONE}</div>`));
    const tema = sez.querySelector('.s-tema'); tema.value = imp.tema; tema.addEventListener('change', () => { imp.tema = tema.value; salva(); applicaTema(); });
    sez.querySelector('.s-masc').addEventListener('click', e => { imp.mascotte = !imp.mascotte; e.target.setAttribute('aria-checked', imp.mascotte); salva(); CMASC.visibile(imp.mascotte); });
    sez.querySelector('.s-mesc').addEventListener('click', e => { imp.mescola = !imp.mescola; e.target.setAttribute('aria-checked', imp.mescola); salva(); });
    sez.querySelector('.s-esp').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(stato, null, 1)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'compasso-progressi.json'; document.body.appendChild(a); a.click(); a.remove();
    });
    sez.querySelector('.s-imp').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => { const d = JSON.parse(t); if (!d || typeof d !== 'object' || !d.progressi) throw new Error('formato'); stato = Object.assign(statoBase(), d); salva(); applicaTema(); route(); CMASC.dici('Progressi importati.', { tipo: 'commento', espressione: 'felice', durata: 3000 }); }).catch(() => alert('File non valido.'));
    });
    sez.querySelector('.s-azz').addEventListener('click', () => { if (confirm('Cancellare davvero tutti i progressi?')) { stato = statoBase(); salva(); applicaTema(); route(); } });
  }

  /* =====================================================================
     MASCOTTE: comportamenti
     ===================================================================== */
  function raccontaAneddoto(arg) {
    const an = scegli(arg.aneddoti);
    const html = `<p class="chi">${esc(an.matematico)} <small>${esc(an.anni)}</small></p><p><b>${esc(an.titolo)}</b></p>${md(an.testo)}${an.legame ? '<p style="color:var(--testo2);font-size:.88rem">' + md(an.legame).replace(/^<p>|<\/p>$/g, '') + '</p>' : ''}`;
    CMASC.dici(html, { tipo: 'aneddoto', html: true, espressione: 'felice', azioni: [{ testo: 'Un altro', fn: () => raccontaAneddoto(arg) }, { testo: 'Tutti i matematici', fn: () => naviga('#/matematici/' + chiaveMatematico(an.matematico)) }] });
  }
  function menuMascotte() {
    if (CMASC.aperta()) { CMASC.chiudi(); return; }
    const arg = argCorrente && registro[argCorrente];
    if (arg) {
      CMASC.dici('Sono qui. Vuoi un suggerimento su «' + arg.titolo + '» o una storia di chi l\'ha inventata?', { tipo: 'commento', espressione: 'felice', azioni: [
        { testo: 'Un suggerimento', fn: () => { const s = scegli(arg.suggerimenti); CMASC.dici(md(s.testo), { tipo: s.tipo === 'errore' ? 'errore' : 'suggerimento', html: true, espressione: 'pensa', azioni: [{ testo: 'Un altro', fn: () => document.querySelector('.zenone-figura').click() }] }); } },
        { testo: 'Un aneddoto', fn: () => raccontaAneddoto(arg) }
      ] });
    } else {
      CMASC.dici(scegli(CONSIGLI), { tipo: 'suggerimento', espressione: 'pensa', azioni: [
        { testo: 'Un altro', fn: () => { CMASC.chiudi(); menuMascotte(); } },
        { testo: 'Una storia a caso', fn: () => { const v = scegli(IND.argomenti); caricaArgomento(v.id).then(raccontaAneddoto).catch(() => CMASC.dici('Quella storia non è ancora pronta. Riprova.', { tipo: 'commento', durata: 3000 })); } }
      ] });
    }
  }
  CMASC.monta(document.body);
  document.querySelector('.zenone-figura').addEventListener('click', menuMascotte);
  CMASC.visibile(stato.impostazioni.mascotte);

  /* avvio */
  aggiornaBadge();
  route();
})();
