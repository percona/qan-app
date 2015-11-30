(function(){
    'use strict';
    var pplControllers = angular.module('pplControllers', []);

    pplControllers.controller('QueryProfileController', [
        '$scope',
        '$rootScope',
        '$filter',
        '$state',
        'uiGridConstants',
        'QueryProfile',
        'Metric',
        'Agent',
        'Instance',
        '$modal',
        'instance',
        function($scope, $rootScope, $filter, $state, uiGridConstants, QueryProfile,
                 Metric, Agent, Instance, $modal, instance) {
            $scope.instance_uuid = instance.selected_instance.UUID;
            $scope.instance_DSN = instance.selected_instance.DSN.replace(/:[0-9a-zA-Z]+@/, ':************@');

            $rootScope.instances = instance.instances;
            $rootScope.instance = instance.selected_instance;

            $scope.init = function() {
                $scope.colSize = 'col-md-6';
                $scope.getAgent();
                $scope.query = '';
                // it is need to disable future dates.
                $rootScope.dtCal = null;
                $scope.queryExplain = '';

                $rootScope.time_range = '1d';
                $scope.setTimeRange('1d');
            };

            $scope.getAgent = function () {
                Agent.query()
                      .$promise
                      .then(function(resp) {
                          $scope.agent_uuid = resp[0].UUID;
                          $rootScope.agent = resp[0];
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
                $state.go('root.instance-dt', {
                    uuid: instance.UUID
                });
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
                    $state.go('root.instance-dt', {
                        uuid: $rootScope.instance.UUID,
                        begin: $scope.begin,
                        end: $scope.end
                    });
                    $rootScope.dtRange = $scope.b.format('YYYY-MM-DD HH:mm:ss')
                                       + ' to '
                                       + $scope.e.format('YYYY-MM-DD HH:mm:ss')
                                       + ' UTC';
                    $scope.getProfile();
                }
            };

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

                $state.go('root.instance-dt', {
                    uuid: $rootScope.instance.UUID,
                    begin: $scope.begin,
                    end: $scope.end
                });
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
                    cellTemplate: '<a ui-sref="root.instance-dt.query({query_id: row.entity.Id})"><div class="ui-grid-cell-contents">{{ COL_FIELD }}</div></a>',
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
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ (COL_FIELD*100).toFixed(2) }}%</div>'
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
                    $scope.query_id = row.entity.Id;
                    $scope.query_abstract = row.entity.Abstract;
                    $state.go('root.instance-dt.query', {
                        query_id: row.entity.Id
                    });
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
                                    $scope.getQPTableHeight = function() {
                                        var rowHeight = 30; // row height
                                        var headerHeight = 33; // header height
                                        return {
                                            height: (resp.Query.length * rowHeight + headerHeight) + "px"
                                        };
                                    };
                                    $scope.qanGridOptions.data = resp.Query;
                                } else {
                                    $scope.getQPTableHeight = function() {
                                        return {
                                            height: "60px"
                                        };
                                    };
                                    $scope.qanGridOptions.data = [];
                                }
                            })
                            .catch(function(resp){})
                            .finally(function(resp){});

            };

            $scope.init();
    }]);

    pplControllers.controller('MetricsController', [
        '$scope',
        '$rootScope',
        '$state',
        'uiGridConstants',
        'Metric',
        function($scope, $rootScope, $state, uiGridConstants, Metric) {
            $scope.init = function () {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        if ($state.is('root.instance-dt.query')) {
                            $scope.getMetrics();
                        }
                    }
                );
            };

            $scope.metrics_columns = [
                {
                    displayName: 'Metrics',
                    field: 'Metrics',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD.split("_").join(" ") }}</div>',
                    sort: {
                        direction: uiGridConstants.ASC
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
                enableColumnResizing: true,
                enableScrollbars: uiGridConstants.scrollbars.ALWAYS,
                enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
                columnDefs: $scope.metrics_columns
            };

            $scope.getMetrics = function () {
                $scope.queryExplain = '';
                var params = {
                    instance_uuid: $state.params.uuid,
                    query_uuid: $state.params.query_id,
                    begin: $state.params.begin,
                    end: $state.params.end
                };
                Metric.query(params)
                      .$promise
                      .then(function(resp) {
                          $scope.query = resp.Query;
                          $rootScope.query = resp.Query;
                          $scope.example = resp.Example;
                          $rootScope.example = resp.Example;
                          console.log('query', $rootScope.query);
                          console.log('example', $rootScope.example);

                          var data = [];
                          for (var key in resp.Metrics) {
                              var obj = {'Metrics': key};
                              angular.extend(obj, resp.Metrics[key]);
                              data.push(obj)
                          }
                          $scope.metricsGridOptions.data = data;
                          $scope.getMetricsTableHeight = function() {
                              return {
                                  height: ($scope.metricsGridOptions.data.length * 30 + 32) + "px"
                              };
                          };
                      })
                      .catch(function(resp){})
                      .finally(function(resp){});
            }

            $scope.init();
    }]);

    pplControllers.controller('QueryController', [
        '$scope',
        '$rootScope',
        '$state',
        function($scope, $rootScope, $state) {
            $scope.init = function () {
                $scope.toggleQuery = 'example';
                $rootScope.$watch('query',
                    function (newValue, oldValue) {
                            $scope.changeQuery();
                    }
                );
            };

            $scope.changeQuery = function() {
                $scope.firstSeen = moment($rootScope.query.FirstSeen,
                                         'YYYY-MM-DDTHH:mm:ssZ').format('LLLL');
                $scope.lastSeen = moment($rootScope.query.LastSeen,
                                         'YYYY-MM-DDTHH:mm:ssZ').format('LLLL');
                $scope.firstSeenAgo = moment($rootScope.query.FirstSeen,
                                             'YYYY-MM-DDTHH:mm:ssZ').fromNow();
                $scope.lastSeenAgo = moment($rootScope.query.LastSeen,
                                            'YYYY-MM-DDTHH:mm:ssZ').fromNow();

                $scope.example = vkbeautify.sql($rootScope.example.Query);
                $scope.fingerprint = vkbeautify.sql($rootScope.query.Fingerprint);
            };

            $scope.init();
    }]);

    pplControllers.controller('QueryExplainController', [
        '$scope',
        '$rootScope',
        '$filter',
        'uiGridConstants',
        'AgentCmd',
        function($scope, $rootScope, $filter, uiGridConstants, AgentCmd) {
            $scope.init = function () {
                $scope.queryExplainOptions = {
                    enableSorting: false,
                    enableColumnMenus: false,
                    enableColumnResizing: true,
                    enableScrollbars: uiGridConstants.scrollbars.ALWAYS,
                    enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
                    columnDefs: $scope.explainColumns,
                    data: []
                };
                $rootScope.$watch('query',
                    function (newValue, oldValue) {
                            if (newValue.Tables === null || newValue.Tables.length === 0 || newValue.Tables[0].Db === '') {
                                $scope.db = '';
                            } else {
                                $scope.db = newValue.Tables[0].Db;
                                $scope.getQueryExplain();
                            }
                    }
                );
            };
            $scope.explainColumns = [
                {
                    displayName: 'Id',
                    field: 'Id',
                    width: '10%'
                },
                {
                    displayName: 'SelectType',
                    field: 'SelectType',
                    width: '20%'
                },
                {
                    displayName: 'Table',
                    field: 'Table',
                    width: '15%'
                },
                {
                    displayName: 'Partitions',
                    field: 'Partitions',
                    width: '20%'
                },
                {
                    displayName: 'CreateTable',
                    field: 'CreateTable',
                    width: '20%'
                },
                {
                    displayName: 'Type',
                    field: 'Type',
                    width: '10%'
                },
                {
                    displayName: 'PossibleKeys',
                    field: 'PossibleKeys',
                    width: '20%'
                },
                {
                    displayName: 'Key',
                    field: 'Key',
                    width: '10%'
                },
                {
                    displayName: 'KeyLen',
                    field: 'KeyLen',
                    width: '15%'
                },
                {
                    displayName: 'Ref',
                    field: 'Ref',
                    width: '10%'
                },
                {
                    displayName: 'Rows',
                    field: 'Rows',
                    width: '20%'
                },
                {
                    displayName: 'Extra',
                    field: 'Extra',
                    width: '80%'
                }
            ];


            $scope.getQueryExplain = function() {
                var db = $scope.db;
                if ($scope.queryDb) {
                    db = $scope.queryDb;
                }
                console.log('db', db);
                var data = {
                    "UUID": $rootScope.instance.UUID,
                    "Db": db,
                    "Query": $rootScope.example.Query
                };
                var params = {
                    AgentUUID: $rootScope.agent.UUID,
                    Service: 'query',
                    Cmd: 'Explain',
                    Data: btoa(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $rootScope.agent.UUID}, agentCmd);
                p.$promise
                .then(function (data) {
                        $scope.queryExplain = true;
                        $scope.queryExplainError = '';
                        if (data.Error === '') {
                            var explain = JSON.parse(atob(data.Data));
                            $scope.queryExplainOptions.data = explain.Classic;
                            $scope.getExplainQueryTableHeight = function() {
                                var height = $scope.queryExplainOptions.data.length
                                            * 30 + 33;
                                return {
                                    height: height + "px"
                                };
                            };
                        } else {
                            $scope.queryExplainError = data.Error;
                        }
                    })
                .catch(function(resp) {});
            };


            $scope.init();

    }]);

    pplControllers.controller('TableInfoController', [
        '$scope',
        '$rootScope',
        '$filter',
        'uiGridConstants',
        'AgentCmd',
        function($scope, $rootScope, $filter, uiGridConstants, AgentCmd) {
            $scope.init = function () {
                $scope.toggleTableInfo = 'create';
                $rootScope.$watch('query',
                    function (newValue, oldValue) {
                            if (newValue.Tables === null) {
                                $scope.dbTables = [
                                    {'Db': 'mysql', 'Table': 'user'},
                                ];
                            } else {
                                $scope.dbTables = newValue.Tables;
                            }
                            $scope.selectedDbTable = $scope.dbTables[0];
                            $scope.getTableInfo();
                    }
                );

                $scope.tblIndexesOptions = {
                    enableSorting: false,
                    enableColumnMenus: false,
                    enableColumnResizing: true,
                    enableScrollbars: uiGridConstants.scrollbars.ALWAYS,
                    enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
                    columnDefs: $scope.tblIndexesColumns,
                    data: []
                };
            };

            $scope.tblIndexesColumns = [
                {
                    displayName: 'KeyName',
                    field: 'KeyName',
                    width: '25%'
                },
                {
                    displayName: 'Type',
                    field: 'IndexType',
                    width: '18%'
                },
                {
                    displayName: 'NonUnique',
                    field: 'NonUnique',
                    width: '28%'
                },
                {
                    displayName: 'Packed',
                    field: 'Packed',
                    width: '20%'
                },
                {
                    displayName: 'Column',
                    field: 'ColumnName',
                    width: '30%'
                },
                {
                    displayName: 'Cardinality',
                    field: 'Cardinality',
                    width: '27%'
                },
                {
                    displayName: 'Collation',
                    field: 'Collation',
                    width: '25%'
                },
                {
                    displayName: 'Null',
                    field: 'Null',
                    width: '15%'
                },
                {
                    displayName: 'Comment',
                    field: 'Comment',
                    width: '20%'
                },
            ];

            $scope.getTableInfo = function() {
                var db = $scope.selectedDbTable.Db;
                var tbl = $scope.selectedDbTable.Table;
                var db_tbl = db + '.' + tbl;
                var data = {
                    "UUID": $rootScope.instance.UUID,
                    "Create": [{
                        "Db": db,
                        "Table": tbl
                    }],
                    "Index": [{
                        "Db": db,
                        "Table": tbl
                    }],
                    "Status": [{
                        "Db": db,
                        "Table": tbl
                    }],
                };
                var params = {
                    AgentUUID: $rootScope.agent.UUID,
                    Service: 'query',
                    Cmd: 'TableInfo',
                    Data: btoa(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $rootScope.agent.UUID}, agentCmd);
                p.$promise
                .then(function (data) {
                        $scope.tableInfo = JSON.parse(atob(data.Data));
                        if ('Errors' in $scope.tableInfo[db_tbl]) {
                            var errors = $scope.tableInfo[db_tbl].Errors;
                            for (var i=0; i<errors.length; i++) {
                                if (errors[i].startsWith('SHOW CREATE')) {
                                    $scope.tblCreateError = errors[i];
                                }
                                if (errors[i].startsWith('SHOW INDEX')) {
                                    $scope.tblIndexError = errors[i];
                                }
                                if (errors[i].startsWith('SHOW TABLE STATUS')) {
                                    $scope.tblStatusError = errors[i];
                                }
                            }
                        }
                        if ('Create' in $scope.tableInfo[db_tbl]) {
                            $scope.tblCreate = vkbeautify.sql($scope.tableInfo[db_tbl].Create);
                        } else {
                            $scope.tblCreate = false;
                        }
                        if ('Status' in $scope.tableInfo[db_tbl]) {
                            $scope.tblStatus = $scope.tableInfo[db_tbl].Status;
                        } else {
                            $scope.tblStatus = false;
                        }
                        if ('Index' in $scope.tableInfo[db_tbl]) {
                            var arr = [];
                            for(var key in $scope.tableInfo[db_tbl].Index) {
                                arr = arr.concat($scope.tableInfo[db_tbl].Index[key]);
                            }
                            $scope.tblIndexesTableHeight = function() {
                                return {
                                    height: (arr.length * 30 + 33) + "px"
                                };
                            };
                            $scope.tblIndexesOptions.data = arr;
                        }
                })
                .catch(function(resp) {});
            };

            $scope.addDbTable = function() {
                var dbTbl = $scope.dbTable.split('.');
                var option = {
                    'Db': dbTbl[0],
                    'Table': dbTbl[1]
                };
                $scope.dbTables.unshift(option);
                $scope.selectedDbTable = $scope.dbTables[0];
                $scope.getTableInfo();
                $scope.dbTable = '';
            };


            $scope.init();

    }]);


})();
