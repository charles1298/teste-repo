#!/usr/bin/env bash
#
# Restaura a imagem anterior quando o deploy novo nao passa na verificacao,
# e confirma que ela voltou a servir. Roda como root (via sudo), a partir do
# diretorio do deploy.

set -uo pipefail

IMAGE="${IMAGE:-mercadomap}"
PREV="${IMAGE}:previous"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! docker image inspect "$PREV" >/dev/null 2>&1; then
  echo "ERRO: ${PREV} nao existe — nao ha versao anterior para restaurar." >&2
  echo "O container segue com a versao quebrada; veja os logs do diagnostico." >&2
  exit 1
fi

echo "Deploy reprovado na verificacao. Restaurando ${PREV}..."
docker tag "$PREV" "${IMAGE}:latest"

# --no-build e essencial: sem ele o compose reconstroi o codigo quebrado.
if ! docker compose up -d --force-recreate --no-build app; then
  echo "ERRO: falha ao recriar o container a partir de ${PREV}." >&2
  exit 1
fi

echo "Confirmando que a versao anterior esta servindo..."
exec bash "${HERE}/verify-deploy.sh"
