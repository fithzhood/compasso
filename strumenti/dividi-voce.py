"""Divide un mp3 di ElevenLabs che contiene, di fila, le battute di uno o più video, nelle battute singole.

Le battute stanno in voce-testi/<argomento>--<nome>.txt (una riga per fumetto). I tagli si scelgono fra le
pause con una programmazione dinamica: ogni pezzo deve durare circa quanto la sua frase (caratteri x velocità
media) e si preferiscono le pause lunghe. Le battute vanno in <uscita>/<argomento>--<nome>/f00.wav, f01.wav, …
uso: python strumenti/dividi-voce.py file.mp3 <uscita> derivate/derivata limiti/infinito …
"""
import subprocess, sys, os, numpy as np

SR = 48000
RADICE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src, uscita, ids = sys.argv[1], sys.argv[2], sys.argv[3:]
righe = []                                    # (id, indice, testo)
for vid in ids:
    with open(os.path.join(RADICE, 'voce-testi', vid.replace('/', '--') + '.txt'), encoding='utf-8') as f:
        for k, r in enumerate(l.strip() for l in f if l.strip()):
            righe.append((vid, k, r))

pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(pcm, '<i2').astype(np.float32) / 32768
win = int(0.02 * SR)
rms = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, 'same'))
muto = rms < 0.01
pause, i = [], 0
while i < len(muto):
    if muto[i]:
        j = i
        while j < len(muto) and muto[j]: j += 1
        if i > 0 and j < len(muto) and (j - i) > 0.15 * SR: pause.append(((i + j) // 2, (j - i) / SR))
        i = j
    else: i += 1
voce = np.where(~muto)[0]
inizio, fine = int(voce[0]), int(voce[-1])
car = np.array([len(r[2]) for r in righe], float)
attesa = car / car.sum() * (fine - inizio) / SR
cand = [inizio] + [p for p, _ in pause] + [fine]
lung = [9.0] + [d for _, d in pause] + [9.0]
N, C = len(righe), len(cand)
INF = 1e18
best = np.full((N + 1, C), INF); prev = np.zeros((N + 1, C), int)
best[0][0] = 0
for k in range(1, N + 1):
    for j in range(1, C):
        d = (np.array(cand[j]) - np.array(cand[:j])) / SR
        costo = best[k - 1][:j] + ((d - attesa[k - 1]) / attesa[k - 1]) ** 2 - 0.6 * min(lung[j], 1.0)
        m = int(np.argmin(costo))
        best[k][j], prev[k][j] = costo[m], m
tagli, j = [C - 1], C - 1
for k in range(N, 0, -1):
    j = prev[k][j]; tagli.append(j)
tagli = [cand[t] for t in reversed(tagli)]
peggiore = 0
for k, (vid, n, testo) in enumerate(righe):
    seg = x[tagli[k]:tagli[k + 1]]
    nz = np.where(np.abs(seg) > 0.01)[0]
    seg = seg[max(0, nz[0] - int(.03 * SR)): nz[-1] + int(.08 * SR)]
    cartella = os.path.join(uscita, vid.replace('/', '--')); os.makedirs(cartella, exist_ok=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', os.path.join(cartella, f'f{n:02d}.wav')], input=seg.tobytes())
    r = len(seg) / SR / attesa[k]
    peggiore = max(peggiore, abs(np.log(r)))
    segno = '  <-- da controllare' if r < 0.6 or r > 1.45 else ''
    print(f'{vid} {n:2d} {len(seg) / SR:5.2f} s (attesa {attesa[k]:4.1f}){segno}  {testo[:45]}')
print(f'{N} battute; scarto peggiore x{np.exp(peggiore):.2f}')
