#!/bin/bash

run() {
    . ~/.nvm/nvm.sh
    . ~/.profile
    . ~/.bashrc
    nvm use node;
    node run.js
}

install() {
    . ~/.profile
    . ~/.bashrc
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.28.0/install.sh | bash
    nvm install node
    nvm use node
    echo "instaled"
}


$@
