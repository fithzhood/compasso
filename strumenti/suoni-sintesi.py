"""Sintetizza la traccia degli effetti di un video dai suoi eventi (JSON su stdin) e scrive un WAV.

Gli effetti si fanno qui, non con campioni, perche' devono durare quanto l'animazione che accompagnano:
  ['tono', a, b, [p0, p1, ...]]  un suono che segue l'altezza di cio' che si muove (p da 0 basso a 1 alto)
  ['pop', t, p]                   qualcosa compare (p facoltativo: altezza)
  ['ding', t]                     un risultato, un «torna»
  ['traccia', a, b]               una linea che si disegna (matita)
  ['soffio', t]                   entra una scheda, cambia la scena
uso: node strumenti/eventi-video.js <id> | python strumenti/suoni-sintesi.py uscita.wav
"""
import json, sys, wave
import numpy as np

SR = 48000
ev = json.load(sys.stdin)
D = ev['durata']
mix = np.zeros(int(SR * (D + 1)))
rng = np.random.default_rng(7)          # fisso: lo stesso video da' sempre lo stesso suono


def freq(p):                             # 0..1 -> 220..660 Hz, un'ottava e mezza, in scala logaritmica (dolce, non sirena)
    return 220.0 * 3.0 ** np.clip(p, 0, 1)


def inviluppo(n, att=0.02, rel=0.08):
    e = np.ones(n)
    a, r = min(n // 2, int(att * SR)), min(n // 2, int(rel * SR))
    if a: e[:a] = np.linspace(0, 1, a) ** 2
    if r: e[-r:] = np.linspace(1, 0, r) ** 2
    return e


def metti(t, x, vol):
    i = int(t * SR)
    if i >= len(mix): return
    x = x[: len(mix) - i]
    mix[i:i + len(x)] += vol * x


def oscillatore(f):                      # f: frequenza istante per istante -> seno puro, il timbro piu' dolce
    fase = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(fase)


def tono(a, b, punti, vol=0.11):
    n = max(1, int((b - a) * SR))
    u = np.linspace(0, 1, n)
    k = np.linspace(0, 1, len(punti))
    p = np.interp(u, k, punti)
    metti(a, oscillatore(freq(p)) * inviluppo(n, 0.12, 0.25), vol)


def pop(t, p=0.55, vol=0.2):
    n = int(0.09 * SR)
    f = freq(p) * np.linspace(0.8, 1.25, n)
    env = np.exp(-np.linspace(0, 6, n)) * inviluppo(n, 0.004, 0.01)
    metti(t, oscillatore(f) * env, vol)


def ding(t, vol=0.22):
    for dt, f0 in ((0, 659.25), (0.09, 987.77)):          # mi e si: una quinta che «chiude»
        n = int(0.7 * SR)
        x = np.arange(n) / SR
        s = (np.sin(2 * np.pi * f0 * x) + 0.25 * np.sin(2 * np.pi * 3 * f0 * x)) * np.exp(-x * 5)
        metti(t + dt, s * inviluppo(n, 0.003, 0.05), vol)


def filtra(x, lo, hi):                   # passa-banda grezzo nel dominio delle frequenze
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(len(x), 1 / SR)
    X[(fr < lo) | (fr > hi)] = 0
    return np.fft.irfft(X, len(x))


def traccia(a, b, vol=0.05):
    n = max(1, int((b - a) * SR))
    x = filtra(rng.standard_normal(n), 1800, 6000)
    grana = 0.6 + 0.4 * np.abs(np.sin(np.linspace(0, (b - a) * 2 * np.pi * 9, n)))   # il gesto della matita
    metti(a, x / (np.abs(x).max() + 1e-9) * grana * inviluppo(n, 0.05, 0.08), vol)


def soffio(t, vol=0.07):
    n = int(0.45 * SR)
    x = filtra(rng.standard_normal(n), 400, 2500)
    env = np.sin(np.linspace(0, np.pi, n)) ** 2
    metti(t, x / (np.abs(x).max() + 1e-9) * env, vol)


FARE = {'tono': lambda e: tono(e[1], e[2], e[3]), 'pop': lambda e: pop(*e[1:]), 'ding': lambda e: ding(e[1]),
        'traccia': lambda e: traccia(e[1], e[2]), 'soffio': lambda e: soffio(e[1])}

suoni = list(ev.get('suoni') or [])
# Ada: si accende salendo e si spegne scendendo, festa = ding (se non c'e' gia' un ding li' vicino)
suoni.append(['tono', 0.9, 1.35, [0.2, 0.7]])
suoni.append(['tono', D - 2.0, D - 1.4, [0.6, 0.1]])
ding_t = [s[1] for s in suoni if s[0] == 'ding']
for f in ev['facce']:
    if f['faccia'] == 'festa' and all(abs(f['t'] - d) > 0.4 for d in ding_t):
        suoni.append(['ding', f['t']])
for s in suoni:
    FARE[s[0]](s)

picco = np.abs(mix).max()
if picco > 0: mix *= 10 ** (-9 / 20) / picco            # picco a -9 dBFS: effetti, non musica
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f"{len(suoni)} effetti, {D} s -> {sys.argv[1]}")
