(function(){
    'use strict';

    var ppl = angular.module('ppl', [
        'ngResource',
        'ngSanitize',
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


        function setVersionedUrl(url) {
            // catch /ng/views/ HTML templates only
            if (!url || url.indexOf('/client/') < 0) return url;
            var param = 'v=' + STATIC_VERSION;
            return url + '?' + param;
        }

        $httpProvider.interceptors.push(function($rootScope, $q, constants) {
            $rootScope.alerts = [];
            $rootScope.closeAlert = function(index) {
                $rootScope.alerts.splice(index, 1);
            };
            return {
                request: function (config) {
                    config.timeout = 5000;
                    // Intercept Angular external request to static files
                    // to append version number to defeat the cache problem.
                    config.url = setVersionedUrl(config.url);
                    config.useLegacyPromise = false;
                    return config;
                },
                requestError: function(rejection) {
                    // do something on error
                    return $q.reject(rejection);
                },
                response: function(response) {
                    return response;
                },
                responseError: function (rejection) {
                    $rootScope.alerts.pop();
                    $rootScope.connect_error = false;
                    switch (rejection.status) {
                        case -1:
                            $rootScope.alerts.push({
                                msg: 'Cannot connect to the datastore. ' +
                                     'Please check it is running at ' +
                                     '<a href="' + constants.API_PATH + '">' +
                                     constants.API_PATH +
                                     '</a> and your firewall does not block it.',
                                type: 'danger'
                            });
                            $rootScope.connect_error = true;
                            break;
                        default:
                            $rootScope.alerts.push({
                                msg: 'Cannot connect to the datastore. ' +
                                     'Please check it is running at ' +
                                     '<a href="' + constants.API_PATH + '">' +
                                     constants.API_PATH +
                                     '</a> and your firewall does not block it.',
                                type: 'danger'
                            });
                            $rootScope.connect_error = true;
                    }
                    return $q.reject(rejection);
                }
            };
        });


        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            templateUrl: '/client/qan/query_profile_grid.html',
            controller: 'QueryProfileController',
            resolve: {
                instance: function (Instance, $rootScope) {
                    return Instance.query()
                          .$promise
                          .then(function(resp) {
                              var mysqls = [];
                              if (resp.length === 0) {
                                  $rootScope.alerts.push({
                                      msg: 'There are no MySQL instances. ' +
                                           'Install the agent on a server, ' +
                                           'then refresh this page.',
                                      type: 'danger'
                                  });
                                  $rootScope.connect_error = true;
                              } else {
                                  for (var i=0; i < resp.length; i++) {
                                      if (resp[i].Subsystem === 'mysql') {
                                          resp[i].DSN = resp[i].DSN.replace(/:[0-9a-zA-Z]+@/, ':************@');
                                          mysqls.push(resp[i]);
                                      }
                                  }

                              }

                              return {
                                  instances: mysqls,
                                  selected_instance: mysqls[0]
                              };
                          })
                          .catch(function(resp, err){
                              $rootScope.alerts.push({
                                  msg: 'Datastore API error: ' +
                                       'GET ' + API_PATH + '/instances ' +
                                       'returned status code ' + resp.status +
                                       ', expected 200. Check the datastore ' +
                                       'log file for more information.',
                                  type: 'danger'
                              });
                              $rootScope.connect_error = true;
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
    }]);

})();
