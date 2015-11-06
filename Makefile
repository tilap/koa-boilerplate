BIN = ./node_modules/.bin
FONT_DIR ?= ./src/browser/fonts/fontello
FONTELLO_HOST ?= http://fontello.com
SERVER_SCRIPT = lib/site.js
TOKENFILE = .projectmetas

NAME = boilerplate
VERSION = 0.0.1

help:
	@cat Makefile.help

init:
	@if [ -f $(TOKENFILE) ]; then \
		echo "Sorry, project already init"; \
	else \
		echo '{"name": "$(NAME)", "version":  "$(VERSION)"}' >> $(TOKENFILE); \
		sed -i 's/{{{PROJECT_NAME}}}/$(NAME)/g' bower.json package.json config-app.js; \
		sed -i 's/{{{PROJECT_VERSION}}}/$(VERSION)/g' bower.json package.json config-app.js; \
	fi;

install:
	npm prune && npm install
	$(BIN)/bower prune && $(BIN)/bower install

serve:
	@if [ ! -f $SERVER_SCRIPT ]; then \
		echo "No compiled server found. Gonna do it for you"; \
    	make build; \
	fi; \
	echo "Starting the server"
	@node $SERVER_SCRIPT

assets:
	$(BIN)/gulp assets:build

build:
	$(BIN)/gulp server:build
	$(BIN)/gulp front:build

watch:
	$(BIN)/gulp watch

clean:
	$(BIN)/gulp front:clean
	$(BIN)/gulp assets:clean
	$(BIN)/gulp server:clean

sync:
	$(BIN)/gulp browsersync

fontgettoken:
	@curl --silent --show-error --fail --output .fontello --form "config=@${FONT_DIR}/config.json" ${FONTELLO_HOST}

fontopen:
	@make fontgettoken
	@/opt/google/chrome/google-chrome --enable-plugins ${FONTELLO_HOST}/`cat .fontello`

fontopenmac:
	@make fontgettoken
	@ cat .fontello
	@ open -a "Google Chrome" ${FONTELLO_HOST}/`cat .fontello`

fontsave:
	@if test ! `which unzip` ; then \
		echo 'Install unzip first.' >&2 ; \
		exit 128 ; \
		fi

	rm -rf .fontello.src .fontello.zip

	curl --silent --show-error --fail --output .fontello.zip ${FONTELLO_HOST}/`cat .fontello`/get

	unzip .fontello.zip -d .fontello.src

	rm -rf ${FONT_DIR}
	mv `find ./.fontello.src -maxdepth 1 -name 'fontello-*'` ${FONT_DIR}
	rm -rf .fontello.src .fontello.zip
