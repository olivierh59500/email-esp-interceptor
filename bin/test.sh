#!/bin/bash
# run unit tests

cd "$(dirname "$0")/.."
source ./bin/lib/strict-mode.sh

echo "cleaning..."
./bin/clean.sh

# always run local npm modules
PATH=$(npm bin):$PATH

export NODE_ENV=test
mocha_args="--slow 200 --reporter spec --colors --recursive --check-leaks"
echo ✓
echo "running coverage and mocha tests..."
IFS=" "
istanbul cover _mocha -x "**db** **logger** **config** **sentry**" \
  -- $mocha_args
echo ✓
./bin/lint.sh
