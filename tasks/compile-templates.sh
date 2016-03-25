#!/usr/bin/env bash -x

jade "$@" -O ./tasks/template-options.json -o ./build/ ./src/jade/*.jade
