#!/usr/bin/env bash
#
# Marca a imagem que esta em producao agora como ponto de rollback, antes de o
# deploy novo sobrescrever ${IMAGE}:latest. Roda como root (via sudo).
#
# Nunca falha: no primeiro deploy ainda nao existe imagem para marcar.

set -uo pipefail

IMAGE="${IMAGE:-mercadomap}"

if docker image inspect "${IMAGE}:latest" >/dev/null 2>&1; then
  docker tag "${IMAGE}:latest" "${IMAGE}:previous"
  echo "Ponto de rollback salvo em ${IMAGE}:previous."
else
  echo "Nao existe ${IMAGE}:latest ainda (primeiro deploy) — sem ponto de rollback."
fi
