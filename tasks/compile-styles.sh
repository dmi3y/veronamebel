#!/usr/bin/env bash -x

echo "$@"

stylus "$@" -o ./build/ ./src/stylus/main.styl
