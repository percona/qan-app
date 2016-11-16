/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    System.config({
        //use typescript for compilation
        transpiler: 'typescript',
        //typescript compiler options
        typescriptOptions: {
            emitDecoratorMetadata: true
        },
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
            'moment': 'npm:moment',
            'moment-timezone': 'npm:moment-timezone/builds/moment-timezone-with-data.js',
            'numeral': 'npm:numeral',
            'd3': 'npm:d3',
            'd3-array': 'npm:d3-array/',
            'd3-axis': 'npm:d3-axis/',
            'd3-collection': 'npm:d3-collection/',
            'd3-color': 'npm:d3-color/',
            'd3-dispatch': 'npm:d3-dispatch/',
            'd3-ease': 'npm:d3-ease/',
            'd3-format': 'npm:d3-format/',
            'd3-interpolate': 'npm:d3-interpolate/',
            'd3-path': 'npm:d3-path/',
            'd3-scale': 'npm:d3-scale/',
            'd3-selection': 'npm:d3-selection/',
            'd3-shape': 'npm:d3-shape/',
            'd3-time': 'npm:d3-time/',
            'd3-time-format': 'npm:d3-time-format/',
            'd3-timer': 'npm:d3-timer/',
            'd3-random': 'npm:d3-random/',
            'd3-transition': 'npm:d3-transition/',
            'd3-polygon': 'npm:d3-polygon',
            'd3-quadtree': 'npm:d3-quadtree',
            'd3-queue': 'npm:d3-queue',
            'd3-dsv': 'npm:d3-dsv',
            'd3-request': 'npm:d3-request',
            'd3-hierarchy': 'npm:d3-hierarchy',
            'd3-force': 'npm:d3-force',
            'd3-drag': 'npm:d3-drag',
            'd3-voronoi': 'npm:d3-voronoi',
            'd3-brush': 'npm:d3-brush',
            'd3-zoom': 'npm:d3-zoom',
            'd3-chord': 'npm:d3-chord',
            'd3-geo': 'npm:d3-geo',
            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'moment': { main: 'moment.js', defaultExtension: 'js' },
            'moment-timezone': { defaultExtension: 'js' },
            'numeral': { main: 'numeral.js', defaultExtension: 'js' },
            'd3': { main: 'index.js', defaultExtension: 'js' },
            'd3-array': { main: 'index.js', defaultExtension: 'js' },
            'd3-axis': { main: 'index.js', defaultExtension: 'js' },
            'd3-collection': { main: 'index.js', defaultExtension: 'js' },
            'd3-color': { main: 'index.js', defaultExtension: 'js' },
            'd3-dispatch': { main: 'index.js', defaultExtension: 'js' },
            'd3-ease': { main: 'index.js', defaultExtension: 'js' },
            'd3-format': { main: 'index.js', defaultExtension: 'js' },
            'd3-interpolate': { main: 'index.js', defaultExtension: 'js' },
            'd3-path': { main: 'index.js', defaultExtension: 'js' },
            'd3-scale': { main: 'index.js', defaultExtension: 'js' },
            'd3-selection': { main: 'index.js', defaultExtension: 'js' },
            'd3-shape': { main: 'index.js', defaultExtension: 'js' },
            'd3-time': { main: 'index.js', defaultExtension: 'js' },
            'd3-time-format': { main: 'index.js', defaultExtension: 'js' },
            'd3-timer': { main: 'index.js', defaultExtension: 'js' },
            'd3-random': { main: 'index.js', defaultExtension: 'js' },
            'd3-polygon': { main: 'index.js', defaultExtension: 'js' },
            'd3-quadtree': { main: 'index.js', defaultExtension: 'js' },
            'd3-queue': { main: 'index.js', defaultExtension: 'js' },
            'd3-dsv': { main: 'index.js', defaultExtension: 'js' },
            'd3-request': { main: 'index.js', defaultExtension: 'js' },
            'd3-hierarchy': { main: 'index.js', defaultExtension: 'js' },
            'd3-force': { main: 'index.js', defaultExtension: 'js' },
            'd3-drag': { main: 'index.js', defaultExtension: 'js' },
            'd3-voronoi': { main: 'index.js', defaultExtension: 'js' },
            'd3-brush': { main: 'index.js', defaultExtension: 'js' },
            'd3-zoom': { main: 'index.js', defaultExtension: 'js' },
            'd3-chord': { main: 'index.js', defaultExtension: 'js' },
            'd3-geo': { main: 'index.js', defaultExtension: 'js' },
            'd3-transition': { main: 'index.js', defaultExtension: 'js' }
        }
    });
})(this);

