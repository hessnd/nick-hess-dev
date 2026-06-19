#!/usr/bin/env bash
#
# post-song.sh — set the Song of the Day.
#
# Pulls SONG_API_SECRET from 1Password (never stored on disk) and POSTs an
# Apple Music link to /api/song.
#
# Usage:
#   ./scripts/post-song.sh "https://music.apple.com/us/album/.../...?i=123456"
#   ./scripts/post-song.sh "<apple-music-url>" 2026-06-18   # backfill a past date
#
# Requirements: 1Password CLI (`op`), signed in (`op signin`). curl + jq.
# Override the defaults below via env vars if your setup differs.

set -euo pipefail

# Where the secret lives in 1Password, and where it gets posted.
OP_REF="${SONG_OP_REF:-op://Private/nickhess-dev SONG_API_SECRET/credential}"
ENDPOINT="${SONG_ENDPOINT:-https://nickhess.dev/api/song}"

url="${1:-}"
date="${2:-}"

if [[ -z "$url" ]]; then
  echo "usage: $0 <apple-music-url> [YYYY-MM-DD]" >&2
  exit 1
fi

# Read the secret at call time; it never touches disk or shell history.
secret="$(op read "$OP_REF")"

# Build the JSON body safely (jq handles escaping). Include date only if given.
if [[ -n "$date" ]]; then
  body="$(jq -n --arg url "$url" --arg date "$date" '{url: $url, date: $date}')"
else
  body="$(jq -n --arg url "$url" '{url: $url}')"
fi

# -sS: quiet but show errors. -w prints the HTTP status on its own line.
response="$(curl -sS -w $'\n%{http_code}' \
  -X POST "$ENDPOINT" \
  -H "Authorization: Bearer ${secret}" \
  -H "Content-Type: application/json" \
  -d "$body")"

status="$(tail -n1 <<<"$response")"
payload="$(sed '$d' <<<"$response")"

echo "$payload" | jq . 2>/dev/null || echo "$payload"

if [[ "$status" != "200" ]]; then
  echo "✗ HTTP $status" >&2
  exit 1
fi
echo "✓ posted"
