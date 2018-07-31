init:
	git config core.hooksPath .githooks
	npm ci

build:
	rm -rf dist/*
	npm run build
	npm run pack
deploy:
	docker exec pmm-server bash -c 'rm -rf /usr/share/percona-qan-app/*'
	docker cp dist/qan-app pmm-server:/opt/
	docker exec pmm-server bash -c 'mv /opt/qan-app/* /usr/share/percona-qan-app/'

