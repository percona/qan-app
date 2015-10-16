(function(){
    'use strict';

    var ppl = angular.module('ppl', [
        'ngResource',
        'ui.router',
        'ui.grid',
        'ui.grid.selection',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'chart.js',
        'pplControllers',
        'pplServices',
        'pplDirectives',
        'angularMoment'
    ]).config(configure)
      .constant('constants', {})
      .constant('angularMomentConfig', {
              timezone: 'UTC'
      });

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$resourceProvider'];

    function configure($stateProvider, $urlRouterProvider, $resourceProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/client/qan/query_profile_grid.html',
            controller: 'QueryProfileController',
            resolve: {
                instance: function (Instance) {
                    return Instance.query()
                          .$promise
                          .then(function(resp) {
                              for (var i=0; i < resp.length; i++) {
                                  if (resp[i].DSN !== '') {
                                      return resp[i];
                                  }
                              }
                          })
                          .catch(function(resp){})
                          .finally(function(resp){});
                }
            }
        });
    }

    ppl.run(['$state', '$http', function($state, $http) {
        $http.defaults.headers.common['X-Percona-API-Key'] = 1;
        $state.go('home');
    }]);

})();
