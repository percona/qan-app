

deploy:
	rm -rf dist/*
	npm run build:prod
	npm run pack
	docker exec pmm-server bash -c 'rm -rf /usr/share/percona-qan-app/*'
	docker cp dist/qan-app pmm-server:/opt/
	docker exec pmm-server bash -c 'mv /opt/qan-app/* /usr/share/percona-qan-app/'

