Setup for temporary use
==
1. Download latest archive with [Query Analytics Web App] (https://www.percona.com/redir/downloads/TESTING/ppl/percona-webapp-latest.tar.bz2)

1. Unzip.

1. cd to unzipped dir

1. Run `python -m SimpleHTTPServer 8000`

1. SPA should be accessible in browser http://localhost:8000/


Setup development environment.
==
1. Install NVM, NodeJS and bower:

   ```bash
   curl https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash
   nvm ls-remote
   nvm install v0.12.2
   nvm use node
   npm install -g bower
   bower i
   python -m SimpleHTTPServer 8000
  ```
1. SPA should be accessible on http://localhost:8000/
