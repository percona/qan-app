Development environment setup on OS X
==
1. Install NVM, NodeJS and bower:

   ```bash
   curl https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash
   nvm ls-remote
   nvm install v0.12.2
   nvm use node
   npm install -g bower
   npm install simplehttpserver -g
  ```
1. For UI tests install protractor:

  ```bash
  npm install -g protractor
  webdriver-manager update
  ```
1. Pull UI libs
  ```bash
  cd web && bower install
  ```
1. API should be accessible on http://localhost:8000/api/v1/

1. Start the project
  ```bash
  simplehttpserver .
  ```
