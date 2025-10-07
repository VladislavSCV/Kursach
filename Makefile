# Makefile для работы с npm

NODE_BIN := ./node_modules/.bin
PATH := $(NODE_BIN):$(PATH)

.PHONY: install
install:
	npm install

.PHONY: test
test:
	npm test

.PHONY: start
start:
	npm start

.PHONY: stop
stop:
	npm stop

.PHONY: restart
restart:
	npm restart

.PHONY: run
run:
	npm run $(filterword)

.PHONY: clean
clean:
	rm -rf ./node_modules ./package-lock.json

.PHONY: help
help:
	@echo "Makefile для работы с npm"
	@echo ""
	@echo "Targets:"
	@echo "         install    - установить зависимости"
	@echo "         test        - запустить тесты"
	@echo "         start      - запустить приложение"
	@echo "         stop       - остановить приложение"
	@echo "         restart    - перезапустить приложение"
	@echo "         run        - запустить скрипт"
	@echo "         clean      - очистить папку с зависимостями"
	@echo ""
