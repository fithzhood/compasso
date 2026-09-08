#!/usr/bin/env python3
"""Copia il sito dalla cartella di lavoro (OneDrive) al repo WebApps\\compasso e timbra la versione.

uso:  python strumenti/pubblica.py <N>
- sostituisce ogni ?v=<vecchio> in compasso.html con ?v=<N> (nella sorgente e nel repo)
- copia i file del sito nel repo (esclusi .git e i file di lavoro non necessari)
- il commit e il push li fa chi lancia lo script (vedi HANDOFF.md)
"""
import re, shutil, sys, io, os
from pathlib import Path

SORGENTE = Path(__file__).resolve().parent.parent
REPO = Path(r'C:\Users\lfili\WebApps\compasso')
ESCLUDI = {'.git', '__pycache__', 'HANDOFF.md'}

def main():
    if len(sys.argv) < 2 or not sys.argv[1].isdigit():
        print(__doc__); sys.exit(2)
    n = sys.argv[1]
    html = SORGENTE / 'compasso.html'
    testo = io.open(html, encoding='utf-8').read()
    nuovo, k = re.subn(r'\?v=\d+', '?v=' + n, testo)
    io.open(html, 'w', encoding='utf-8', newline='\n').write(nuovo)
    print(f'versione ?v={n} scritta in {k} riferimenti')
    REPO.mkdir(parents=True, exist_ok=True)
    copiati = 0
    for src in SORGENTE.rglob('*'):
        rel = src.relative_to(SORGENTE)
        if any(p in ESCLUDI for p in rel.parts):
            continue
        dst = REPO / rel
        if src.is_dir():
            dst.mkdir(parents=True, exist_ok=True)
        else:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst); copiati += 1
    # file di servizio del repo
    (REPO / '.nojekyll').write_text('')
    (REPO / '.gitignore').write_text('.DS_Store\nThumbs.db\n')
    wf = REPO / '.github' / 'workflows'; wf.mkdir(parents=True, exist_ok=True)
    (wf / 'pages.yml').write_text(
        "name: Deploy to GitHub Pages\n\non:\n  push:\n    branches: [main]\n  workflow_dispatch:\n\n"
        "permissions:\n  contents: read\n  pages: write\n  id-token: write\n\n"
        "concurrency:\n  group: pages\n  cancel-in-progress: true\n\n"
        "jobs:\n  deploy:\n    environment:\n      name: github-pages\n      url: ${{ steps.deployment.outputs.page_url }}\n"
        "    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/configure-pages@v5\n"
        "      - uses: actions/upload-pages-artifact@v3\n        with:\n          path: '.'\n      - id: deployment\n        uses: actions/deploy-pages@v4\n")
    print(f'copiati {copiati} file in {REPO}')

if __name__ == '__main__':
    main()
