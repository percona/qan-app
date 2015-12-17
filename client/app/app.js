(function(){
    'use strict';

    var ppl = angular.module('ppl', [
        'ngResource',
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'chart.js',
        'hljs',
        'pplControllers',
        'pplServices',
        'pplDirectives',
        'pplFilters',
        'angularMoment'
    ]).config(configure)
      .constant('constants', {
          // URI of datastore API
          API_PATH: window.location.protocol + '//'+ window.location.hostname + ':9001'
      })
      .constant('angularMomentConfig', {
              timezone: 'UTC'
      });


    configure.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider', '$resourceProvider'];

    function configure($stateProvider, $httpProvider, $urlRouterProvider, $resourceProvider) {

        // Intercept Angular external request to static files to append version number
        // to defeat the cache problem.
        $httpProvider.interceptors.push(function() {
            return {
                'request': function(config) {
                    config.url = setVersionedUrl(config.url);
                    return config;
                }
            };
        });

        function setVersionedUrl(url) {
            // catch /ng/views/ HTML templates only
            if (!url || url.indexOf('/client/') < 0) return url;
            var param = 'v=' + STATIC_VERSION;
            return url + '?' + param;
        }

        $httpProvider.interceptors.push(function($rootScope, $q) {
            $rootScope.alerts = [];
            $rootScope.closeAlert = function(index) {
                $rootScope.alerts.splice(index, 1);
            };
            return {
                request: function (config) {
                    config.timeout = 1000;
                    return config;
                },
                responseError: function (rejection) {
                    $rootScope.alerts.pop();
                    $rootScope.connect_error = false;
                    switch (rejection.status) {
                        case -1:
                            $rootScope.alerts.push({
                                msg: 'Cannot connect to percona datastore.',
                                type: 'danger'
                            });
                            $rootScope.connect_error = true;
                            break;
                        case 408:
                            $rootScope.alerts.push({
                                msg: 'Connection timed out.',
                                type: 'danger'
                            });
                            $rootScope.connect_error = true;
                            break;
                        default:
                            $rootScope.alerts.push({
                                msg: 'Could not connect to percona datastore.',
                                type: 'danger'
                            });
                            $rootScope.connect_error = true;
                    }
                    return $q.reject(rejection);
                }
            }
        });


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
                          .catch(function(resp, err){
                          })
                          .finally(function(resp){});
                }
            }
        })
        .state('root.instance-dt', {
            url: 'instance/:uuid/begin/:begin/end/:end/',
        })
        .state('root.instance-dt.query', {
            url: 'query/:query_id/'
        });
    }

    ppl.run(['$rootScope', '$state', '$stateParams', '$http', function($rootScope, $state, $stateParams, $http) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$http.defaults.headers.common['X-Percona-API-Key'] = 1;
    }]);

})();
