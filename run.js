var express   = require('express'),
    logger = require('morgan'),
    proxyMiddleware = require('http-proxy-middleware');

const PORT = process.env.PORT || 8000;
const DATASTORE_URL = 'http://localhost:9001';
const API_CONTEXT = '/api/v1/';

// configure proxy middleware options
var options = {
    target: DATASTORE_URL, // target host
    logLevel: 'debug',
    pathRewrite: {
        '^/api/v1' : ''    // rewrite paths
    }
};

var proxy = proxyMiddleware(API_CONTEXT, options);

var app = express()
    .use(proxy)
    .use(logger('dev'))
    .use(express.static(__dirname))
    .listen(PORT, () => console.log(`Express server listening on port ${PORT}`));

module.exports = app;
