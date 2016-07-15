# bash strict mode
# http://redsymbol.net/articles/unofficial-bash-strict-mode/

set -o errexit
set -o errtrace
set -o pipefail
set -o posix

IFS="$(printf "\n\t")"
