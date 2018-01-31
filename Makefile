# GNU Make 3.8.2 and above

PATH := $(PATH):node_modules/.bin
SHELL := /bin/bash

.ONESHELL:
.SILENT:

all: fresh
	babel dist/app.js --presets=env | uglifyjs -o dist/app.js -c -m &
	html-minifier --collapse-whitespace dist/index.html -o dist/index.html
	rm dist/app.js.map

deploy: all
	gh-pages -d dist -m $(message)

fresh: clean html js

clean:
	rm -rf dist
	mkdir dist

html:
	cp demo/index.html -t dist

js:
	rollup demo/app.js -o dist/app.js -f iife -m -c
