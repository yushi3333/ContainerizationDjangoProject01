#!/bin/sh
set -e

echo "✅ STARTING ENTRYPOINT"

# Default fallbacks
export PORT=${PORT:-8080}
export SQL_PORT=${SQL_PORT:-5432}

# Log vars
echo "📦 SQL_HOST=${SQL_HOST}"
echo "📦 SQL_PORT=${SQL_PORT}"
echo "📦 PORT=${PORT}"

# Validate SQL_PORT
if ! echo "$SQL_PORT" | grep -qE '^[0-9]+$'; then
  echo "❌ Invalid SQL_PORT: '${SQL_PORT}'"
  exit 1
fi

# Comment out DB check temporarily
# echo "🔧 ENTRYPOINT: Waiting for DB at $SQL_HOST:$SQL_PORT..."
# while ! nc -z "$SQL_HOST" "$SQL_PORT"; do
#   sleep 1
# done
# echo "✅ DB is up!"

python manage.py migrate --noinput
python manage.py collectstatic --noinput

echo "🚀 Launching Gunicorn on port $PORT..."
exec gunicorn social_book.wsgi:application --bind 0.0.0.0:$PORT
