#!/bin/sh
BUNDLED_WITH_LINE=$(grep -n -E 'BUNDLED WITH' Gemfile.lock | cut -d: -f1)
VERSION_LINE_NUMBER=$(expr $BUNDLED_WITH_LINE + 1)
BUNDLE_VERSION=$(sed $VERSION_LINE_NUMBER'!d' Gemfile.lock)
gem install bundler -v"~> ""$BUNDLE_VERSION" --conservative