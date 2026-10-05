#!/bin/sh
# Voce e montaggio per una lista di video: genera le battute con l'API di ElevenLabs, poi monta l'MP4 con voce ed effetti.
# Salta i video già montati (Videos/Compasso/<id>.mp4; i muti da cui si parte stanno in Videos/Compasso/_muti) e quelli senza testo parlato; non monta un video se
# manca anche una sola battuta (l'API può rifiutare richieste: si rilancia lo stesso comando e riprende da dove era).
# uso: sh strumenti/voce-lotto.sh limiti/infinito derivate/catena …
cd "$(dirname "$0")/.." || exit 1
for id in "$@"; do
  nome=$(echo "$id" | sed 's|/|--|')
  if [ -f "C:/Users/lfili/Videos/Compasso/$id.mp4" ]; then echo "già fatto: $id"; continue; fi
  if [ ! -f "voce-testi/$nome.txt" ]; then echo "manca il testo: $id"; continue; fi
  PYTHONIOENCODING=utf-8 python strumenti/elevenlabs.py genera "$id" > /dev/null || { echo "ERRORE voce: $id"; continue; }
  righe=$(grep -c . "voce-testi/$nome.txt")
  battute=$(ls "C:/Users/lfili/Videos/Compasso/_voce-battute/$nome" 2>/dev/null | grep -c '\.wav$')
  if [ "$battute" -lt "$righe" ]; then echo "ERRORE: $id ha $battute battute su $righe, non lo monto"; continue; fi
  node strumenti/voce-video.js "$id" "C:/Users/lfili/Videos/Compasso/_voce-battute/$nome" 2>&1 | tr '\r' '\n' | grep -E "pause|battute|rror" || echo "ERRORE montaggio: $id"
done
