Setup for temporary use
==
1. Download latest archive with QA-webapp

1. Unzip.

1. Run `run.py`

1. SPA should be accessible in browser http://localhost:8000/

Setup for permanent  use
==

1. Install nginx

1. Download latest archive with QA-webapp

1. Unzip archive to public html directory (e.g. /usr/share/nginx/html)

1. Configure proxy in nginx config to datastore API (e.g /etc/nginx/sites-enabled/default)
```
location ^~ /api/v1 {
    rewrite /api/v1(.*) $1 break;
    proxy_pass              http://localhost:9001;
    proxy_redirect off;
    #proxy_set_header   Host $host;
}
```



Development environment setup.
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
