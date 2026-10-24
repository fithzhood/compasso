#!/bin/sh
# Voce (ElevenLabs, Brittney) e MP4 per i video nuovi già rivisti. Un video alla volta, con pausa e controllo del calore
# (come monta-tutti.sh di Quanto): salta i video che hanno già l'MP4.
# uso: sh cmp_doppia.sh <id> [<id> …]
cd /c/Users/lfili/OneDrive/Documenti/app/Compasso || exit 1
CALDO=${CALDO:-70}; FRESCO=${FRESCO:-60}; PAUSA=${PAUSA:-120}
temp() { powershell -NoProfile -ExecutionPolicy Bypass -File ../Quanto/strumenti/temperatura.ps1 2>/dev/null | tr -dc '0-9'; }
raffredda() {
  sleep "$PAUSA"; t=$(temp); [ -z "$t" ] && return
  if [ "$t" -ge "$CALDO" ]; then
    echo "  $(date +%H:%M) $t °C: aspetto che scenda sotto $FRESCO"
    while t=$(temp); [ -n "$t" ] && [ "$t" -gt "$FRESCO" ]; do sleep 30; done
    echo "  $(date +%H:%M) $t °C: riparto"
  fi
}
for id in "$@"; do
  [ -f "C:/Users/lfili/Videos/Compasso/$id.mp4" ] && continue
  raffredda
  n=$(echo "$id" | sed 's|/|--|')
  echo "== $(date +%H:%M) $id"
  python strumenti/elevenlabs.py genera "$id" 2>&1 | tail -1
  timeout 1200 node strumenti/voce-video.js "$id" "C:/Users/lfili/Videos/Compasso/_voce-battute/$n" 2>&1 | tr '\r' '\n' | grep -E "battute|rror" | tail -1
done
echo "== $(date +%H:%M) finito"
