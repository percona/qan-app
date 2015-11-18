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
      .constant('constants', {
          // URI of datastore API
          API_PATH: window.location.protocol + '//'+ window.location.hostname + ':9001'
      })
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
                              var mysqls = [];
                              for (var i=0; i < resp.length; i++) {
                                  if (resp[i].Subsystem.Name === 'mysql') {
                                       resp[i].DSN = resp[i].DSN.replace(/:[0-9a-zA-Z]+@/, ':************@');
                                       mysqls.push(resp[i]);
                                  }
                              }

                              return {
                                  instances: mysqls,
                                  selected_instance: mysqls[0]
                              };
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
