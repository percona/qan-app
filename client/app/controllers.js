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
            $scope.instance_uuid = instance.selected_instance.UUID;
            $scope.instance_DSN = instance.selected_instance.DSN.replace(/:[0-9a-zA-Z]+@/, ':************@');

            $rootScope.instances = instance.instances;
            $rootScope.instance = instance.selected_instance;

            $scope.init = function() {
                $scope.getAgent();
                $scope.query = '';
                // it is need to disable future dates.
                $rootScope.dtCal = null;
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

            $rootScope.$watch('instance', function(instance, old_instance) {
                $scope.getProfile();
            });

            var checkActive = function($view, min_date, max_date, date_i) {
                var isBetween = date_i.isBetween(min_date, max_date);
                var isSameMin = date_i.isSame(min_date, $view);
                var isSameMax = date_i.isSame(max_date, $view);
                if (isBetween || isSameMin || isSameMax) {
                    return true;
                }
                return false;
            };

            $rootScope.beforeRender = function($view, $dates, $leftDate, $upDate, $rightDate) {
                var now = moment();
                for (var i=0; i<$dates.length; i++) {
                    if ($view === 'hour') {
                        $dates[i].display = moment.utc($dates[i].utcDateValue).format('HH:mm');
                    }
                    var date_i = moment($dates[i].utcDateValue);
                    $dates[i].selectable = !date_i.isAfter(now, $view);
                    if ($scope.min_dt && $scope.max_dt) {
                        $dates[i].active = checkActive($view, $scope.min_dt, $scope.max_dt, date_i);
                    }
                }
            };

            $rootScope.onTimeSet = function(newDate, oldDate) {
                if (oldDate === null) {
                    return;
                }
                var date1 = $filter('date')(newDate, 'yyyy-MM-dd HH:mm:ss');
                date1 = moment.utc(date1, 'YYYY-MM-DD HH:mm:ss');
                if (oldDate === undefined) {
                    $rootScope.dtRange = date1.format('YYYY-MM-DD HH:mm:ss')
                                       + ' - Please select one more date';
                } else {
                    var date2 = $filter('date')(oldDate, 'yyyy-MM-dd HH:mm:ss');
                    date2 = moment.utc(date2, 'YYYY-MM-DD HH:mm:ss');
                    $scope.begin = moment.min(date1, date2);
                    $scope.end = moment.max(date1, date2);
                    $scope.min_dt = $scope.begin.clone();
                    $scope.max_dt = $scope.end.clone();
                    $scope.b = $scope.begin.clone();
                    $scope.e = $scope.end.clone();
                    $scope.begin = $scope.begin.format('YYYY-MM-DDTHH:mm:ss');
                    $scope.end = $scope.end.format('YYYY-MM-DDTHH:mm:ss');
                    $rootScope.dtRange = $scope.b.format('YYYY-MM-DD HH:mm:ss')
                                       + ' to '
                                       + $scope.e.format('YYYY-MM-DD HH:mm:ss')
                                       + ' UTC';
                    $scope.getProfile();
                }
            };

            /*
            $rootScope.setCalRange = function() {
                $scope.getProfile();
            };

            $rootScope.cancelCalRange = function() {
                $rootScope.time_range = $scope.old_time_range;
            };
            */

            $scope.setTimeRange = function(time_range) {
                var begin = moment.utc();
                var end = moment.utc();
                switch (time_range) {
                    case '1h':
                        begin.subtract(1, 'hours');
                        break
                    case '3h':
                        begin.subtract(3, 'hours');
                        break
                    case '6h':
                        begin.subtract(6, 'hours');
                        break
                    case '12h':
                        begin.subtract(12, 'hours');
                        break
                    case '1d':
                        begin.subtract(1, 'days');
                        break
                    case '5d':
                        begin.subtract(5, 'days');
                        break
                    case 'cal':
                        break
                    default:
                        begin.subtract(1, 'days');
                }
                $scope.begin = begin.format('YYYY-MM-DDTHH:mm:ss');
                $scope.end = end.format('YYYY-MM-DDTHH:mm:ss');
                $rootScope.dtRange = begin.format('YYYY-MM-DD HH:mm:ss')
                                   + ' to '
                                   + end.format('YYYY-MM-DD HH:mm:ss')
                                   + ' UTC';
                $scope.getProfile();
            };

            var footerCellTemplateNumber = '<div class="ui-grid-cell-contents">{{ col.getAggregationValue() | number: 5 }}</div>';

            $scope.profile_columns = [
                {
                    displayName: 'Rank',
                    field: 'Rank',
                    width: '5%'
                },
                {
                    displayName: 'Query Abstract',
                    field: 'Abstract',
                    cellTemplate: '<a href="#{{ row.entity.Id }}"><div class="ui-grid-cell-contents">{{ COL_FIELD }}</div></a>',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total</div>'
                },
                {
                    displayName: 'ID',
                    width: '13%',
                    field: 'Id'
                },
                {
                    displayName: '% of Grand Total Time',
                    width: '14%',
                    field: 'Percentage',
                    cellFilter: 'number: 3',
                },
                {
                    displayName: 'Total Time',
                    width: '8%',
                    field: 'Stats.Sum',
                    cellFilter: 'number: 2',
                },
                {
                    displayName: 'QPS',
                    width: '4%',
                    field: 'QPS',
                    type: 'number',
                    cellFilter: 'number: 2',
                },
                {
                    displayName: 'Min',
                    field: 'Stats.Min',
                    width: '7%',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ (COL_FIELD*1000).toFixed(2) }}ms</div>'
                },
                {
                    displayName: 'Avg',
                    field: 'Stats.Avg',
                    width: '7%',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ (COL_FIELD*1000).toFixed(2) }}ms</div>'
                },
                {
                    displayName: 'Med',
                    field: 'Stats.Med',
                    width: '7%',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ (COL_FIELD*1000).toFixed(2) }}ms</div>'
                },
                {
                    displayName: '95th',
                    field: 'Stats.P95',
                    width: '7%',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ (COL_FIELD*1000).toFixed(2) }}ms</div>'
                },
                {
                    displayName: 'Max',
                    field: 'Stats.Max',
                    width: '7%',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ (COL_FIELD*1000).toFixed(2) }}ms</div>'
                }
            ];

            $scope.qanGridOptions = {
                enableRowSelection: true,
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableSorting: false,
                enableColumnMenus: false,
                enableScrollbars: false,
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
                    instance_uuid: $rootScope.instance.UUID,
                    begin: $scope.begin,
                    end: $scope.end
                };
                QueryProfile.query(params)
                            .$promise
                            .then(function(resp) {
                                if (resp.Query !== null) {
                                    var skip_summary = resp.Query.shift();
                                    $scope.qanGridOptions.data = resp.Query;
                                    $scope.getQPTableHeight = function() {
                                        var rowHeight = 30; // row height
                                        var headerHeight = 33; // header height
                                        return {
                                            height: (resp.Query.length * rowHeight + headerHeight) + "px"
                                        };
                                    };
                                } else {
                                    $scope.qanGridOptions.data = [];
                                    $scope.getQPTableHeight = function() {
                                        return {
                                            height: "63px"
                                        };
                                    };
                                }
                            })
                            .catch(function(resp){})
                            .finally(function(resp){});

            };

            $scope.metrics_columns = [
                {
                    displayName: 'Metrics',
                    field: 'Metrics',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD.replace("_", " ") }}</div>',
                    sort: {
                        direction: uiGridConstants.ASC
                        //priority: 0,
                    }
                },
                {
                    displayName: 'Total',
                    field: 'Sum',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD % 1 === 0 ? COL_FIELD : COL_FIELD.toFixed(4) }}</div>'
                },
                {
                    displayName: 'Min',
                    field: 'Min',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD % 1 === 0 ? COL_FIELD : COL_FIELD.toFixed(4) }}</div>'
                },
                {
                    displayName: 'Avg',
                    field: 'Avg',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD % 1 === 0 ? COL_FIELD : COL_FIELD.toFixed(4) }}</div>'
                },
                {
                    displayName: 'Med',
                    field: 'Med',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD % 1 === 0 ? COL_FIELD : COL_FIELD.toFixed(4) }}</div>'
                },
                {
                    displayName: '95th',
                    field: 'P95',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD % 1 === 0 ? COL_FIELD : COL_FIELD.toFixed(4) }}</div>'
                },
                {
                    displayName: 'Max',
                    field: 'Max',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD % 1 === 0 ? COL_FIELD : COL_FIELD.toFixed(4) }}</div>'
                }
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


            $scope.getQueryExplain = function() {
                var data = {
                    "UUID": $scope.instance_uuid,
                    "Db": $scope.queryDb ? $scope.queryDb : $scope.example.Db,
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

            $scope.init();
    }]);


})();
