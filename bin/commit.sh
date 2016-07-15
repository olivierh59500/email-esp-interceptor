#!/bin/bash

set -o errexit
set -o errtrace
set -o pipefail
set -o posix

cd "$(dirname "$0")/.."

commit_message="$1"
git config push.default current
git add . -A
git commit -m "$commit_message"
git push -u

