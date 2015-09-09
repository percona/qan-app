(function(){
    'use strict';

    var ppl = angular.module('ppl', [
        'ngResource',
        'ui.router',
        'ui.grid',
        'ui.grid.selection',
        'ui.bootstrap',
        'pplControllers',
        'pplServices',
        'pplDirectives'
    ]).config(configure)
      .constant('constants', {});

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/client/qan/query_profile_grid.html',
            controller: 'QueryProfileController'
        });
    }

    ppl.run(['$state', '$http', function($state, $http) {
        $http.defaults.headers.common['X-Percona-API-Key'] = 1;
        $state.go('home');
    }]);

})();
