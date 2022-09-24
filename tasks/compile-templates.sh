#!/usr/bin/env bash

jade "$@" -O ./tasks/template-options.json -o ./public/ ./src/jade/*.jade
