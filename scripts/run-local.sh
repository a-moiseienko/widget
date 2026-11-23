#!/usr/bin/env sh
# Start the widget dev server on http://localhost:5173 (needs Node.js and npm).
set -e
cd "$(dirname "$0")/.."
[ -d node_modules ] || npm ci
exec npm run dev
