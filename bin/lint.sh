#!/bin/bash
# lint JS

cd "$(dirname "$0")/.."
source ./bin/lib/strict-mode.sh

PATH=$(npm bin):$PATH
echo "linting..."
eslint app
echo ✓
