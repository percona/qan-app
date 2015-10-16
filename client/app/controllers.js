(function(){
    'use strict';
    var pplControllers = angular.module('pplControllers', []);

    pplControllers.controller('QueryProfileController', [
        '$scope',
        '$rootScope',
        '$filter',
        'uiGridConstants',
        'QueryProfile',
        'Metric',
        'Agent',
        'Instance',
        'AgentCmd',
        '$modal',
        'instance',
        function($scope, $rootScope, $filter, uiGridConstants, QueryProfile,
                 Metric, Agent, Instance, AgentCmd, $modal, instance) {
            $scope.instance_uuid = instance.UUID;
            $scope.instance = instance;

            $scope.init = function() {
                $rootScope.fromDateCal = moment.utc().format('lll');
                $rootScope.toDateCal = moment.utc().format('lll');
                $scope.getAgent();
                $scope.query = '';
                $scope.queryExplain = '';
                $scope.queryExplainOptions = {
                    enableSorting: false,
                    enableColumnMenus: false,
                    enableScrollbars: false
                };

                $rootScope.time_range = '1d';
                $scope.getHistogtamData();
            };

            $scope.getHistogtamData = function() {
                var dateArray = [];
                var valueArray = [];
                var currentDate = moment.utc();
                while (dateArray.length <= 50) {
                    dateArray.push(currentDate.format('MMM D'));
                    valueArray.push(Math.floor(Math.random() * (100 + 1)));
                    currentDate = currentDate.subtract(1, 'days');

                };
                $scope.labels = dateArray.reverse();
                $scope.data = [valueArray];
            };


            $scope.getAgent = function () {
                Agent.query()
                      .$promise
                      .then(function(resp) {
                          console.log('agent', resp);
                          $scope.agent_uuid = resp[0].UUID;
                      })
                      .catch(function(resp){})
                      .finally(function(resp){});
            };

            $rootScope.$watch('time_range', function(time_range, old_time_range) {
                if (time_range === 'cal') {
                    $scope.old_time_range = old_time_range;
                } else {
                    $scope.setTimeRange(time_range);
                }
            });

            $rootScope.setCalRange = function() {
                var begin = moment.utc($rootScope.fromDateCal);
                var end = moment.utc($rootScope.toDateCal);
                $scope.begin = begin.format('YYYY-MM-DDTHH:mm:ss');
                $scope.end = end.format('YYYY-MM-DDTHH:mm:ss');
                $rootScope.begin = begin.format('lll');
                $rootScope.end = end.format('lll');
                $scope.getProfile();
            };

            $rootScope.cancelCalRange = function() {
                $rootScope.time_range = $scope.old_time_range;
            };

            $scope.setTimeRange = function(time_range) {
                var begin = moment.utc();
                var end = moment.utc();
                switch (time_range) {
                    case '1h':
                        begin.subtract(1, 'hours');
                        break
                    case '1d':
                        begin.subtract(1, 'days');
                        break
                    case '1w':
                        begin.subtract(7, 'days');
                        break
                    case '1m':
                        begin.subtract(1, 'months');
                        break
                    case '3m':
                        begin.subtract(3, 'months');
                        break
                    case '1y':
                        begin.subtract(1, 'years');
                        break
                    case 'cal':
                        break
                    default:
                        begin.subtract(1, 'days');
                }
                $scope.begin = begin.format('YYYY-MM-DDTHH:mm:ss');
                $scope.end = end.format('YYYY-MM-DDTHH:mm:ss');
                $rootScope.begin = begin.format('lll');
                $rootScope.end = end.format('lll');
                $scope.getProfile();
            };

            var footerCellTemplateNumber = '<div class="ui-grid-cell-contents">{{ col.getAggregationValue() | number: 5 }}</div>';

            $scope.profile_columns = [
                {
                    displayName: 'Rank',
                    field: 'Rank',
                    width: '4%'
                },
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
                        if ($scope.qanGridOptions.hasOwnProperty('footer_data')) {
                            return $scope.qanGridOptions.footer_data.Stats.Cnt;
                        } else {
                            return 0;
                        }
                    }
                },
                {
                    displayName: 'QPS',
                    field: 'QPS',
                    type: 'number',
                    cellFilter: 'number: 5',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">{{ col.getAggregationValue() }}</div>',
                    aggregationType: function(row, col) {
                        if ($scope.qanGridOptions.hasOwnProperty('footer_data')) {
                            return $scope.qanGridOptions.footer_data.QPS;
                        } else {
                            return 0;
                        }
                    }
                },
                {
                    displayName: 'Load',
                    field: 'Stats.Sum',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        if ($scope.qanGridOptions.hasOwnProperty('footer_data')) {
                            return $scope.qanGridOptions.footer_data.Stats.Sum;
                        } else {
                            return 0;
                        }
                    }
                },
                {
                    displayName: 'Avg Time',
                    field: 'Stats.Avg',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        if ($scope.qanGridOptions.hasOwnProperty('footer_data')) {
                            return $scope.qanGridOptions.footer_data.Stats.Avg;
                        } else {
                            return 0;
                        }
                    }
                },
                {
                    displayName: '95%',
                    field: 'Stats.P95',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        if ($scope.qanGridOptions.hasOwnProperty('footer_data')) {
                            return $scope.qanGridOptions.footer_data.Stats.P95;
                        } else {
                            return 0;
                        }
                    }
                },
                {
                    displayName: 'Max Time',
                    field: 'Stats.Max',
                    width: '8%',
                    cellFilter: 'number: 5',
                    footerCellTemplate: footerCellTemplateNumber,
                    aggregationType: function(row, col) {
                        if ($scope.qanGridOptions.hasOwnProperty('footer_data')) {
                            return $scope.qanGridOptions.footer_data.Stats.Max;
                        } else {
                            return 0;
                        }
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
                columnDefs: $scope.profile_columns
            };

            $scope.qanGridOptions.onRegisterApi = function(gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                    $scope.query_uuid = row.entity.Id;
                    $scope.getMetrics();
                });
            };

            $scope.getProfile = function() {
                $scope.queryExplain = '';
                $scope.query = '';
                var params = {
                    instance_uuid: $scope.instance_uuid,
                    begin: $scope.begin,
                    end: $scope.end
                };
                QueryProfile.query(params)
                            .$promise
                            .then(function(resp) {
                                if (resp.Query !== null) {
                                    $scope.qanGridOptions.footer_data = resp.Query.shift();
                                    $scope.qanGridOptions.data = resp.Query;
                                }
                            })
                            .catch(function(resp){})
                            .finally(function(resp){});

            };

            $scope.metrics_columns = [
                {
                    displayName: 'Metrics',
                    field: 'Metrics',
                },
                {
                    displayName: 'Count',
                    field: 'Cnt',
                },
                {
                    displayName: 'Total',
                    field: 'Sum',
                    cellFilter: 'number: 5',
                },
                {
                    displayName: 'Average',
                    field: 'Avg',
                    cellFilter: 'number: 5',
                },
                {
                    displayName: 'Minimum',
                    field: 'Min',
                    cellFilter: 'number: 5',
                },
                {
                    displayName: '95%',
                    field: 'P95',
                    cellFilter: 'number: 5',
                },
                {
                    displayName: 'Maximum',
                    field: 'Max',
                    cellFilter: 'number: 5',
                },
                {
                    displayName: 'Stddev',
                    field: '-',
                },
            ];
            $scope.metricsGridOptions = {
                enableSorting: false,
                enableColumnMenus: false,
                enableScrollbars: false,
                columnDefs: $scope.metrics_columns
            };

            $scope.getMetrics = function () {
                $scope.queryExplain = '';
                var params = {
                    instance_uuid: $scope.instance_uuid,
                    query_uuid: $scope.query_uuid,
                    begin: $scope.begin,
                    end: $scope.end
                };
                Metric.query(params)
                      .$promise
                      .then(function(resp) {
                          $scope.query = resp.Query;
                          $scope.example = resp.Example;

                          var data = [];
                          for (var key in resp.Metrics) {
                              var obj = {'Metrics': key};
                              angular.extend(obj, resp.Metrics[key]);
                              data.push(obj)
                          }
                          $scope.metricsGridOptions.data = data;
                      })
                      .catch(function(resp){})
                      .finally(function(resp){});
            }

            $scope.getMetricsTableHeight = function() {
                var rowHeight = 30; // row height
                var headerHeight = 32; // header height
                return {
                    height: ($scope.metricsGridOptions.data.length * rowHeight + headerHeight) + "px"
                };
            };

            $scope.getQPTableHeight = function() {
                /*
                var rowHeight = 30; // row height
                var headerHeight = 30; // header height
                var footerHeight = 32; // footer height
                return {
                    height: ($scope.qanGridOptions.data.length * rowHeight + headerHeight + footerHeight) + "px"
                };
                */
                return {height: "362px"};
            };

            $scope.getQueryExplain = function() {
                console.log('DB', $scope.example.Db);
                var data = {
                    "UUID": "848fa7964b694b1962a51f5482133090",
                    "Db": $scope.example.Db,
                    "Query": $scope.example.Query
                };
                var params = {
                    AgentUUID: $scope.agent_uuid,
                    Service: 'query',
                    Cmd: 'Explain',
                    Data: btoa(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $scope.agent_uuid}, agentCmd);
                p.$promise
                .then(function (data) {
                        $scope.queryExplain = true;
                        $scope.queryExplainError = '';
                        if (data.Error === '') {
                            var explain = JSON.parse(atob(data.Data));
                            $scope.queryExplainOptions.data = explain.Classic;
                        } else {
                            $scope.queryExplainError = data.Error;
                        }
                    })
                .catch(function(resp) {});
            };

            $scope.getExplainQueryTableHeight = function() {
                var rowHeight = 30; // row height
                var headerHeight = 30; // header height
                return {
                    height: ($scope.queryExplainOptions.data.length * rowHeight + headerHeight) + "px"
                };
            };


            // TODO: fix time range calendars
            $rootScope.items = ['item1', 'item2', 'item3'];
            $rootScope.open = function (size) {

                var modalInstance = $modal.open({
                    templateUrl: 'client/layout/range_calendars.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.init();
    }]);

    pplControllers.controller('ModalInstanceCtrl', [
        '$scope',
        '$rootScope',
        '$modalInstance',
        function ($scope, $rootScope, $modalInstance, items) {

            /*
            $rootScope.items = items;
            $rootScope.selected = {
                item: $rootScope.items[0]
            };

            $rootScope.ok = function () {
                $modalInstance.close($rootScope.selected.item);
            };

            $rootScope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            */
        }
    ]);


})();
