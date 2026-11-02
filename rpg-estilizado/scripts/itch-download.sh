#!/bin/bash
# usage: itch_dl.sh <itch-url> <out.zip> [file-index=1]  (only works for packs with min price 0)
set -e
B=$1; OUT=$2; IDX=${3:-1}; CJ=$(mktemp)
tok(){ grep -oE 'csrf_token["'"'"']?[:=] *["'"'"'][^"'"'"']+' "$1" | head -1 | grep -oE '[A-Za-z0-9%_.=-]{20,}' | tail -1; }
curl -sS -m 30 -c $CJ -b $CJ "$B" -o $CJ.p
U=$(curl -sS -m 30 -c $CJ -b $CJ -X POST "$B/download_url" -H "X-Requested-With: XMLHttpRequest" -H "Referer: $B" --data-urlencode "csrf_token=$(tok $CJ.p)" | python3 -I -c 'import sys,json;print(json.load(sys.stdin)["url"])')
curl -sS -m 30 -c $CJ -b $CJ "$U" -o $CJ.d
grep -oE '<strong title="[^"]+"' $CJ.d | sed 's/<strong title=//' | nl
ID=$(grep -oE 'data-upload_id="[0-9]+"' $CJ.d | sed -n "${IDX}p" | grep -oE '[0-9]+')
D=$(curl -sS -m 30 -c $CJ -b $CJ -X POST "$B/file/$ID?source=game_download&as_props=1&after_download_lightbox=true" -H "X-Requested-With: XMLHttpRequest" -H "Referer: $U" --data-urlencode "csrf_token=$(tok $CJ.d)" | python3 -I -c 'import sys,json;print(json.load(sys.stdin)["url"])')
curl -sSL -m 600 -o "$OUT" -w "saved %{size_download} bytes\n" "$D"
