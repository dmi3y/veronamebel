#!/usr/bin/env bash

echo "$@"

stylus "$@" -o ./public/ ./src/stylus/main.styl
