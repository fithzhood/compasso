"""Voce di Ada con ElevenLabs (API). La chiave sta nella variabile d'ambiente ELEVENLABS_API_KEY dell'utente
(la si crea su elevenlabs.io → Developers → API Keys); questo script non la stampa mai.

  python strumenti/elevenlabs.py voci [cerca]                 elenco delle voci (nome e id)
  python strumenti/elevenlabs.py genera <id-video> [...]      una battuta per riga di voce-testi/<arg>--<nome>.txt
        → C:/Users/lfili/Videos/Compasso/_voce-battute/<arg>--<nome>/fNN.wav (salta quelle già fatte)
"""
import json, os, subprocess, sys, urllib.request, urllib.error

API = 'https://api.elevenlabs.io'
VOCE = 'Brittney - Social Media Voice - Fun, Youthful & Informative'
MODELLO = os.environ.get('ELEVENLABS_MODELLO', 'eleven_v4')   # lo stesso del sito (v4)
RADICE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
USCITA = 'C:/Users/lfili/Videos/Compasso/_voce-battute'


def chiave():
    k = os.environ.get('ELEVENLABS_API_KEY')
    if not k and os.name == 'nt':                      # variabile messa dopo l'avvio dell'app: la leggo dal registro
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, 'Environment') as r:
            k = winreg.QueryValueEx(r, 'ELEVENLABS_API_KEY')[0]
    if not k: raise SystemExit('manca ELEVENLABS_API_KEY')
    return k


def chiama(metodo, percorso, corpo=None, accetta='application/json'):
    dati = json.dumps(corpo).encode('utf-8') if corpo is not None else None
    req = urllib.request.Request(API + percorso, dati, method=metodo,
                                 headers={'xi-api-key': chiave(), 'Content-Type': 'application/json', 'Accept': accetta})
    import time
    for prova in range(8):                              # 429: troppe richieste insieme (Creator ne regge 5) → riprovo
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 429 and prova < 7:
                time.sleep(5 + 5 * prova); continue
            raise SystemExit(f'errore {e.code} su {percorso}: {e.read().decode("utf-8", "replace")[:300]}')


def voci(cerca=''):
    q = '?page_size=100' + ('&search=' + urllib.request.quote(cerca) if cerca else '')
    return json.loads(chiama('GET', '/v2/voices' + q))['voices']


def id_voce():
    for v in voci('Brittney'):
        if v['name'] == VOCE: return v['voice_id']
    raise SystemExit(f'voce non trovata fra le mie voci: {VOCE}')


def genera(vid, voce_id):
    nome = vid.replace('/', '--')
    with open(os.path.join(RADICE, 'voce-testi', nome + '.txt'), encoding='utf-8') as f:
        righe = [l.strip() for l in f if l.strip()]
    cartella = os.path.join(USCITA, nome); os.makedirs(cartella, exist_ok=True)
    usati = 0
    for k, testo in enumerate(righe):
        wav = os.path.join(cartella, f'f{k:02d}.wav')
        if os.path.exists(wav): continue
        mp3 = chiama('POST', f'/v1/text-to-speech/{voce_id}?output_format=mp3_44100_128',
                     {'text': testo, 'model_id': MODELLO, 'language_code': 'it'}, accetta='audio/mpeg')
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', '-', '-ac', '1', '-ar', '48000', wav], input=mp3, check=True)
        usati += len(testo)
        print(f'{vid} f{k:02d} ({len(testo)} car.)', flush=True)
    return usati


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else ''
    if cmd == 'voci':
        for v in voci(sys.argv[2] if len(sys.argv) > 2 else ''): print(v['voice_id'], v['name'])
    elif cmd == 'genera':
        vid_voce, tot = id_voce(), 0
        for vid in sys.argv[2:]: tot += genera(vid, vid_voce)
        print(f'fatto: circa {tot} caratteri')
    else:
        print(__doc__)
