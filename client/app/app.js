(function(){
    'use strict';

    var ppl = angular.module('ppl', [
        'ngResource',
        'ngCookies',
        'ui.router',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.grid.resizeColumns',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'chart.js',
        'hljs',
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

        $stateProvider.state('root', {
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
                                  if (resp[i].Subsystem === 'mysql') {
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
        })
        .state('root.instance-dt', {
            //url: 'instance/:uuid/'
            url: 'instance/:uuid/begin/:begin/end/:end/',
        })
        /*
        .state('root.instance.dtrange', {
            url: 'instance/:uuid/begin/:begin/end/:end/'
        })
        */
        .state('root.instance-dt.query', {
            url: 'query/:query_id/'
        });
    }

    ppl.run(['$rootScope', '$state', '$stateParams', '$http', function($rootScope, $state, $stateParams, $http) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$http.defaults.headers.common['X-Percona-API-Key'] = 1;
        //$state.go('root');
    }]);

})();
