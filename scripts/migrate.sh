#!/bin/bash
# =============================================================
# migrate.sh — Migração incremental para MySQL remoto
# Rastreia migrações aplicadas via tabela `_migrations`
# =============================================================
set -e

# --- Carrega variáveis de ambiente do .env (se existir) ---
if [ -f /app/.env ]; then
  export $(grep -v '^#' /app/.env | xargs)
fi

# --- Validação de variáveis obrigatórias ---
REQUIRED_VARS=("MYSQL_HOST" "MYSQL_PORT" "MYSQL_DATABASE" "MYSQL_USER" "MYSQL_PASS")
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Variável de ambiente '$var' não definida. Abortando."
    exit 1
  fi
done

MIGRATIONS_DIR="/app/migrations"

# --- Função helper para executar SQL ---
run_sql() {
  mysql \
    --host="$MYSQL_HOST" \
    --port="$MYSQL_PORT" \
    --user="$MYSQL_USER" \
    --password="$MYSQL_PASS" \
    --database="$MYSQL_DATABASE" \
    --batch \
    --skip-column-names \
    -e "$1"
}

run_sql_file() {
  mysql \
    --host="$MYSQL_HOST" \
    --port="$MYSQL_PORT" \
    --user="$MYSQL_USER" \
    --password="$MYSQL_PASS" \
    --database="$MYSQL_DATABASE" \
    < "$1"
}

# --- Aguarda MySQL ficar disponível (timeout 30s) ---
echo "⏳ Aguardando conexão com MySQL em $MYSQL_HOST:$MYSQL_PORT..."
RETRIES=30
until mysql \
  --host="$MYSQL_HOST" \
  --port="$MYSQL_PORT" \
  --user="$MYSQL_USER" \
  --password="$MYSQL_PASS" \
  --database="$MYSQL_DATABASE" \
  -e "SELECT 1" &>/dev/null; do
  RETRIES=$((RETRIES - 1))
  if [ $RETRIES -le 0 ]; then
    echo "❌ Timeout ao conectar no MySQL. Abortando."
    exit 1
  fi
  sleep 1
done
echo "✅ Conectado ao MySQL."

# --- Cria tabela de controle de migrações ---
run_sql "
CREATE TABLE IF NOT EXISTS _migrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL UNIQUE,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
"
echo "✅ Tabela _migrations verificada."

# --- Verifica se há migrações para rodar ---
if [ ! -d "$MIGRATIONS_DIR" ] || [ -z "$(ls -A "$MIGRATIONS_DIR"/*.sql 2>/dev/null)" ]; then
  echo "ℹ️  Nenhum arquivo de migração encontrado em $MIGRATIONS_DIR."
  exit 0
fi

# --- Aplica migrações pendentes ---
APPLIED=0
SKIPPED=0

for migration_file in $(ls "$MIGRATIONS_DIR"/*.sql | sort); do
  filename=$(basename "$migration_file")

  # Verifica se já foi aplicada
  already_applied=$(run_sql "SELECT COUNT(*) FROM _migrations WHERE filename = '$filename';")

  if [ "$already_applied" -gt 0 ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  echo "🔄 Aplicando migração: $filename ..."

  if run_sql_file "$migration_file"; then
    run_sql "INSERT INTO _migrations (filename) VALUES ('$filename');"
    echo "   ✅ $filename aplicada com sucesso."
    APPLIED=$((APPLIED + 1))
  else
    echo "   ❌ Falha ao aplicar $filename. Abortando."
    exit 1
  fi
done

echo ""
echo "========================================="
echo "  Migrações concluídas"
echo "  Aplicadas: $APPLIED | Já existentes: $SKIPPED"
echo "========================================="
exit 0
