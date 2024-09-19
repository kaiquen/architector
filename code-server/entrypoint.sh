#!/bin/bash
set -e

# Verificar se o GITHUB_TOKEN e REPO_URL estão definidos
if [ -z "$GITHUB_TOKEN" ] || [ -z "$REPO_URL" ]; then
  echo "Erro: GITHUB_TOKEN e REPO_URL são necessários."
  exit 1
fi

# Remover 'https://' caso já esteja presente no REPO_URL
REPO_URL=$(echo "$REPO_URL" | sed 's|https://||')


# Exibir o URL do repositório para depuração
echo "Clonando o repositório $REPO_URL..."

# Clonar o repositório em um diretório temporário
TMP_DIR=$(mktemp -d)
git clone https://$GITHUB_TOKEN:x-oauth-basic@$REPO_URL $TMP_DIR

if [ -d "$TMP_DIR/.git" ]; then
  echo "Repositório clonado com sucesso."

  
  echo "Iniciando o code-server com o diretório $TMP_DIR..."
  exec code-server --auth none --bind-addr 0.0.0.0:8080 $TMP_DIR
else
  echo "Falha ao clonar o repositório."
  exit 1
fi


