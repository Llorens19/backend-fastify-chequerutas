#!/bin/bash
# wait-for-it.sh: Espera hasta que un servicio esté disponible en el host y puerto especificado

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

while ! nc -z "$host" "$port"; do
  echo "Esperando a que $host:$port esté disponible..."
  sleep 1
done

echo "$host:$port está disponible. Ejecutando comando..."
exec $cmd
