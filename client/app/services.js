(function(){
    'use strict';
    var pplServices = angular.module('pplServices', ['ngResource']);

    pplServices.factory('QueryProfile', [
        '$resource',
        '$filter',
        'constants',
        function($resource, $filter, constants) {
            return $resource(constants.API_PATH + '/qan/profile/:instance_uuid',
                {
                    begin: $filter('date')(new Date(), 'yyyy-MM-ddT00:00:00'),
                    end: $filter('date')(new Date(), 'yyyy-MM-ddT23:59:59'),
                    offset: 0
                },
                {
                    query: {method: 'GET', params: {}, isArray: false},
                }
            );
        }
    ]);

    pplServices.factory('Metric', [
        '$resource',
        '$filter',
        'constants',
        function($resource, $filter, constants) {
            return $resource(constants.API_PATH + '/qan/report/:instance_uuid/query/:query_uuid',
                {
                    begin: $filter('date')(new Date(), 'yyyy-MM-ddT00:00:00'),
                    end: $filter('date')(new Date(), 'yyyy-MM-ddT23:59:59')
                },
                {
                    query: {method: 'GET', params: {}},
                }
            );
        }
    ]);

    pplServices.factory('MetricSummary', [
        '$resource',
        '$filter',
        'constants',
        function($resource, $filter, constants) {
            return $resource(constants.API_PATH + '/qan/report/:instance_uuid/server-summary',
                {
                    begin: $filter('date')(new Date(), 'yyyy-MM-ddT00:00:00'),
                    end: $filter('date')(new Date(), 'yyyy-MM-ddT23:59:59')
                },
                {
                    query: {method: 'GET', params: {}},
                }
            );
        }
    ]);

    pplServices.factory('Table', [
        '$resource',
        'constants',
        function($resource, constants) {
            return $resource(constants.API_PATH + '/queries/:queryId/tables',
                {},
                {
                    query: {method: 'GET', params: {}},
                    update: {method: 'PUT', params: {}, isArray: true}
                }
            );
        }
    ]);

    pplServices.factory('Instance', [
        '$resource',
        'constants',
        function($resource, constants) {
            return $resource(constants.API_PATH + '/instances/:instance_uuid',
                {},
                {
                    query: {method: 'GET', params: {'deleted': 'no'}, isArray: true},
                    update: {method: 'PUT', params: {}, isArray: false}
                }
            );
        }
    ]);

    pplServices.factory('Agent', [
        '$resource',
        'constants',
        function($resource, constants) {
            return $resource(constants.API_PATH + '/agents/:instance_uuid',
                {},
                {
                    query: {method: 'GET', params: {}, isArray: true},
                }
            );
        }
    ]);

    pplServices.factory('AgentStatus', [
        '$resource',
        'constants',
        function($resource, constants) {
            return $resource(constants.API_PATH + '/agents/:agent_uuid/status',
                {},
                {
                    query: {method: 'GET', params: {}, isArray: false},
                }
            );
        }
    ]);

    pplServices.factory('AgentLog', [
        '$resource',
        'constants',
        function($resource, constants) {
            return $resource(constants.API_PATH + '/agents/:agent_uuid/log',
                {},
                {
                    query: {method: 'GET', params: {}, isArray: true},
                }
            );
        }
    ]);

    pplServices.factory('AgentCmd', [
        '$resource',
        'constants',
        function($resource, constants) {
            return $resource(constants.API_PATH + '/agents/:agent_uuid/cmd',
                {agent_uuid: '@agent_uuid'},
                {
                    update: {method: 'PUT', params: {}, isArray: false}
                }
            );
        }
    ]);

    pplServices.factory('Config', [
        '$resource',
        'constants',
        function($resource, constants) {
            return $resource(constants.API_PATH + '/qan/config/:instance_uuid',
                {instance_uuid: '@instance_uuid'},
                {
                    query: {method: 'GET', params: {}, isArray: false},
                    update: {method: 'PUT', params: {}, isArray: false}
                }
            );
        }
    ]);

})();
