Setup for temporary use
==
1. Download latest archive with [Query Analytics Web App] (https://www.percona.com/redir/downloads/TESTING/ppl/percona-webapp-latest.tar.bz2)

1. Unzip.

1. Run `run.py`

1. SPA should be accessible in browser http://localhost:8000/

Setup at ubuntu (deb+upstart)
==
1. Download latest .deb package with [Query Analytics Web App] (https://www.percona.com/redir/downloads/TESTING/ppl/percona-webapp-latest.deb)

1. `sudo dpkg -i percona-webapp-*.deb`

1. To control use `sudo services percona-webapp start|stop|restart|status`

1. Or `sudo initctrl start|stop|restart|status percona-webapp`

1. SPA should be accessible in browser http://localhost:9003/

Setup for permanent  use (with nginx)
==

1. Install nginx

1. Download latest archive with QA-webapp

1. Unzip archive to public html directory (e.g. /opt/qa_web_app)

1. Configure proxy in nginx config to datastore API (e.g /etc/nginx/sites-enabled/default)
```
server {
    listen 9009;

    # Path to unarchived QA web app.
    root /opt/qa_web_app;
    index index.html index.htm;

    # Make site accessible from http://localhost/
    server_name localhost;

    location ^~ /api/v1 {
        rewrite /api/v1(.*) $1 break;
        proxy_pass              http://localhost:9001;
        proxy_redirect off;
    }

}
```



Setup development environment.
==
1. Install NVM, NodeJS and bower:

   ```bash
   curl https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash
   nvm ls-remote
   nvm install v0.12.2
   nvm use node
   npm install -g bower
   manage.sh install
   manage.sh run
  ```
1. SPA should be accessible on http://localhost:8000/
