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

            var footerCellTemplateNumber = '<div class="ui-grid-cell-contents">{{ col.getAggregationValue() | number: 5 }}</div>';
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
                    cellTemplate: '/client/qan/cell_abstract.html',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total</div>'
                },
                {
                    displayName: 'Query ID',
                    field: 'Id'
                },
                {
                    displayName: 'Queries',
                    field: 'Stats.Cnt',
                    width: '6%',
                    aggregationHideLabel: true,
                    footerCellTemplate: '<div class="ui-grid-cell-contents">{{ col.getAggregationValue() }}</div>',
                    aggregationType: function(row, col) {
                        return $scope.qanGridOptions.footer_data.Stats.Cnt;
                    }
                },
                {
                    displayName: 'QPS',
                    field: 'QPS',
                    type: 'number',
                    cellFilter: 'number: 5',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">{{ col.getAggregationValue() }}</div>',
                    aggregationType: function(row, col) {
                        return $scope.qanGridOptions.footer_data.QPS;
                    }
                },
                {
                    displayName: 'Load',
                    field: 'Stats.Sum',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        return $scope.qanGridOptions.footer_data.Stats.Sum;
                    }
                },
                {
                    displayName: 'Avg Time',
                    field: 'Stats.Avg',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        return $scope.qanGridOptions.footer_data.Stats.Avg;
                    }
                },
                {
                    displayName: '95%',
                    field: 'Stats.P95',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        return $scope.qanGridOptions.footer_data.Stats.P95;
                    }
                },
                {
                    displayName: 'Max Time',
                    field: 'Stats.Max',
                    width: '8%',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        return $scope.qanGridOptions.footer_data.Stats.Max;
                    }
                }
            ];

            $scope.qanGridOptions = {
                enableRowSelection: true,
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableSorting: false,
                enableColumnMenus: false,
                enableScrollbars: false,
                showColumnFooter: true,
                columnDefs: $scope.columns
            };

            $scope.qanGridOptions.onRegisterApi = function(gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                    console.log('Id of selected row:', row.entity.Id);
                });
            }

            var params = {
                instance_uuid: '848fa7964b694b1962a51f5482133090',
            };
            QueryProfile.query(params)
                        .$promise
                        .then(function(resp) {
                            //$scope.qanGridOptions.footer_data = resp.Query[0];
                            $scope.qanGridOptions.footer_data = resp.Query.shift();
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
                var headerHeight = 80; // header height
                return {
                    height: ($scope.metricsGridOptions.data.length * rowHeight + headerHeight) + "px"
                };
            };

            $scope.getQPTableHeight = function() {
                var rowHeight = 30; // row height
                var headerHeight = 30; // header height
                var footerHeight = 32; // footer height
                return {
                    height: ($scope.qanGridOptions.data.length * rowHeight + headerHeight + footerHeight) + "px"
                };
            };

    }]);

})();
