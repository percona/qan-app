init:
	git config core.hooksPath .githooks
	npm ci

build:
	rm -rf dist/*
	npm run format
	npm run build
	npm run pack
deploy:
	docker exec pmm-server-remote bash -c 'rm -rf /usr/share/percona-qan-app/*'
	docker cp dist/qan-app pmm-server-remote:/opt/
	docker exec pmm-server-remote bash -c 'mv /opt/qan-app/* /usr/share/percona-qan-app/'
