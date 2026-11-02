#!/bin/bash
# Baixa os kits de assets CC0 de referência para ./kits (fora do git).
# Uso: bash scripts/fetch-kits.sh
set -e
cd "$(dirname "$0")/.." && mkdir -p kits && cd kits
UA="Mozilla/5.0"
# Kenney: a página dá um id; /download-link/<id> devolve um link assinado
for k in mini-arena nature-kit survival-kit retro-textures-fantasy; do
  [ -s "kenney_$k.zip" ] && continue
  CJ=$(mktemp)
  id=$(curl -sS -A "$UA" -c "$CJ" -b "$CJ" "https://kenney.nl/assets/$k" | grep -oE "data-download-id='[0-9a-f]+'" | head -1 | cut -d"'" -f2)
  url=$(curl -sS -A "$UA" -c "$CJ" -b "$CJ" -H "Referer: https://kenney.nl/assets/$k" "https://kenney.nl/download-link/$id" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("url",""))')
  curl -sSL -A "$UA" -o "kenney_$k.zip" "$url" && echo "ok kenney $k"
done
# itch.io (preço "pague quanto quiser", download gratuito)
for pair in quaternius:lowpoly-modular-dungeon-pack quaternius:ultimate-platformer-pack kaylousberg:kaykit-medieval-builder-pack; do
  user=${pair%%:*}; slug=${pair##*:}
  [ -s "${user}_$slug.zip" ] || bash ../scripts/itch-download.sh "https://$user.itch.io/$slug" "${user}_$slug.zip" 1
done
# Quaternius RPG Characters: espelho oficial do autor no OpenGameArt (CC0)
[ -s quaternius_rpg-characters.zip ] || curl -sSL -A "$UA" -o quaternius_rpg-characters.zip https://opengameart.org/sites/default/files/rpg_characters_-_nov_2020.zip
# Quaternius "Ultimate Modular Ruins" só está no Google Drive do autor
# (quaternius.com/packs/ultimatemodularruins.html). Em 02/11/2026 o Drive respondia
# "Quota exceeded"; baixar manualmente pelo site quando a cota liberar.
ls -la
