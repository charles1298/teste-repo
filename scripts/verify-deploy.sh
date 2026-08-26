#!/usr/bin/env bash
#
# Confirma que o container esta realmente servindo depois do deploy.
#
# Sem isso o workflow fica verde mesmo quando o `docker compose up -d` sobe um
# container que morre logo em seguida — foi assim que o site passou meses fora
# do ar sem nenhum sinal no GitHub Actions.
#
# Variaveis opcionais: APP_PORT (padrao 4102), TIMEOUT em segundos (padrao 90).

set -uo pipefail

APP_PORT="${APP_PORT:-4102}"
TIMEOUT="${TIMEOUT:-90}"
URL="http://127.0.0.1:${APP_PORT}/"

if ! command -v curl >/dev/null 2>&1; then
  echo "ERRO: curl nao encontrado no servidor; nao da para verificar o deploy." >&2
  exit 1
fi

echo "Aguardando ${URL} responder 200 (limite: ${TIMEOUT}s)..."

code=""
while (( SECONDS < TIMEOUT )); do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$URL" || true)"
  if [[ "$code" == "200" ]]; then
    echo "OK: ${URL} respondeu 200 apos ${SECONDS}s."
    exit 0
  fi
  sleep 3
done

echo "ERRO: ${URL} nao respondeu 200 em ${TIMEOUT}s (ultimo codigo HTTP: ${code:-nenhum})." >&2
echo "O Nginx do host vai devolver 502 nesse estado." >&2
exit 1
