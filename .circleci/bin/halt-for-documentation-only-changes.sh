#!/bin/sh
CHANGED_FILES=$(git show --name-only --pretty="" $CIRCLE_SHA1)
if $(grep -qvE '(\.(md)$)' <<< $CHANGED_FILES) ; then
  exit 1
fi
echo "Only documentation was updated, stopping build!"
exit 0
