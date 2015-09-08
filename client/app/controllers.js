(function(){
    'use strict';
    var pplControllers = angular.module('pplControllers', []);

    pplControllers.controller('QueryProfileController', [
        '$scope',
        '$filter',
        'uiGridConstants',
        'QueryProfile',
        'Metrics',
        function($scope, $filter, uiGridConstants, QueryProfile, Metrics) {

            $scope.columns = [
                {
                    displayName: 'Rank',
                    field: 'Rank',
                    width: '4%'
                },
                //{ displayName: 'Status'},
                {
                    displayName: 'Query (distilled)',
                    field: 'Abstract',
                    width: '25%',
                    cellTemplate: '/client/qan/cell_abstract.html'
                },
                {
                    displayName: 'Query ID',
                    field: 'Id'
                },
                {
                    displayName: 'Queries',
                    field: 'Stats.Cnt',
                    width: '6%'
                },
                {
                    displayName: 'QPS',
                    field: 'QPS',
                    type: 'number'
                },
                {
                    displayName: 'Load',
                    field: 'Stats.Sum'
                },
                //{ displayName: 'Load %', field: 'Stats.Med' },
                //{ displayName: 'Total Time' },
                {
                    displayName: 'Avg Time',
                    field: 'Stats.Avg'
                },
                {
                    displayName: '95%',
                    field: 'Stats.P95'
                },
                {
                    displayName: 'Max Time',
                    field: 'Stats.Max',
                    width: '5%'
                }
            ];

            $scope.qanGridOptions = {
                enableSorting: false,
                enableColumnMenus: false,
                enableScrollbars: false,
                columnDefs: $scope.columns,
            };

            var params = {
                instance_uuid: '848fa7964b694b1962a51f5482133090',
            };
            QueryProfile.query(params)
                        .$promise
                        .then(function(resp) {
                            $scope.qanGridOptions.data = resp.Query;
                        })
                        .catch(function(resp){})
                        .finally(function(resp){});

            $scope.metricsGridOptions = {
                enableSorting: false,
                enableColumnMenus: false,
                enableScrollbars: false,
            };

            Metrics.query()
                        .$promise
                        .then(function(resp) {
                            $scope.metricsGridOptions.data = resp;
                        })
                        .catch(function(resp){})
                        .finally(function(resp){});

            $scope.getMetricsTableHeight = function() {
                var rowHeight = 30; // row height
                var headerHeight = 30; // header height
                return {
                    height: ($scope.metricsGridOptions.data.length * rowHeight + headerHeight) + "px"
                };
            };

            $scope.getQueryProfileTableHeight = function() {
                var rowHeight = 30; // row height
                var headerHeight = 30; // header height
                return {
                    height: ($scope.qanGridOptions.data.length * rowHeight + headerHeight) + "px"
                };
            };


    }]);

})();
