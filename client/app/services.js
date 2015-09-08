(function(){
    'use strict';
    var pplServices = angular.module('pplServices', ['ngResource']);

    pplServices.factory('QueryProfile', [
        '$resource',
        '$filter',
        function($resource, $filter) {
            return $resource('/api/v1/qan/profile/:instance_uuid',
                {
                    begin: $filter('date')(new Date(), 'yyyy-MM-ddT00:00:00'),
                    end: $filter('date')(new Date(), 'yyyy-MM-ddT23:59:59')
                },
                {
                    query: {method: 'GET', params: {}, isArray: false},
                }
            );
        }
    ]);

    pplServices.factory('Metrics', [
        '$resource',
        function($resource, $filter) {
            //return $resource('/api/v1/metrics/mysql:uuid1/query/:uuid2',
            return $resource('client/content/metrics_data.json',
                {},
                {
                    query: {method: 'GET', params: {}, isArray: true},
                }
            );
        }
    ]);

})();
