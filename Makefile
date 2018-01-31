# GNU Make 3.8.2 and above

PATH := $(PATH):node_modules/.bin
SHELL := /bin/bash

.ONESHELL:
.SILENT:

all: fresh
	babel dist/app.js --presets=env | uglifyjs -o dist/app.js -c -m --source-map "url='app.js.map',content='dist/app.js.map'" &
	html-minifier --collapse-whitespace dist/index.html -o dist/index.html

deploy: all
	gh-pages -d dist

fresh: clean html js

clean:
	rm -rf dist
	mkdir dist

html:
	cp src/index.html -t dist

js:
	rollup src/app.js -o dist/app.js -f iife -m -c