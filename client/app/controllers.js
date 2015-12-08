(function(){
    'use strict';
    var pplControllers = angular.module('pplControllers', []);

    pplControllers.controller('QueryProfileController', [
        '$scope',
        '$rootScope',
        '$filter',
        '$state',
        'QueryProfile',
        'Metric',
        'Agent',
        'Instance',
        '$modal',
        'instance',
        function($scope, $rootScope, $filter, $state, QueryProfile,
                 Metric, Agent, Instance, $modal, instance) {
            $scope.connection_error = false;
            if ('error' in instance) {
                $scope.connection_error = instance.error;
                return null;
            }
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

                $rootScope.time_range = '1h';
                $scope.setTimeRange('1h');
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
                    var date_i = moment.utc($dates[i].utcDateValue);
                    $dates[i].selectable = !date_i.isAfter(now, $view);
                    if ($scope.min_dt && $scope.max_dt) {
                        $dates[i].active = checkActive($view, $scope.min_dt, $scope.max_dt, date_i);
                    }
                }
            };

            $rootScope.onTimeSet = function(newDate, oldDate) {
                if ($scope.date1 === undefined) {
                    $scope.begin = undefined;
                    $scope.end = undefined;
                    $scope.min_dt = undefined;
                    $scope.max_dt = undefined;
                    $scope.b = undefined;
                    $scope.e = undefined;
                    var date1 = $filter('date')(newDate, 'yyyy-MM-dd HH:mm:ss');
                    $scope.date1 = moment.utc(date1, 'YYYY-MM-DD HH:mm:ss');

                    $rootScope.dtRange = $scope.date1.format('YYYY-MM-DD HH:mm:ss')
                                       + ' - Please select one more date';
                } else {
                    var date2 = $filter('date')(newDate, 'yyyy-MM-dd HH:mm:ss');
                    $scope.date2 = moment.utc(date2, 'YYYY-MM-DD HH:mm:ss');
                }


                if ($scope.date1 !== undefined && $scope.date2 !== undefined) {
                    $scope.begin = moment.min($scope.date1, $scope.date2);
                    $scope.end = moment.max($scope.date1, $scope.date2);

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
                    $scope.date1 = undefined;
                    $scope.date2 = undefined;
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

            $scope.qanSelectRow = function(row) {
                $scope.query_id = row.Id;
                $scope.query_abstract = row.Abstract;
                $state.go('root.instance-dt.query', {
                    query_id: row.Id
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
                                    $scope.qanData = resp.Query;
                                } else {
                                    $scope.qanData = [];
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
        'Metric',
        function($scope, $rootScope, $state, Metric) {
            $scope.init = function () {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        if ($state.is('root.instance-dt.query')) {
                            $scope.getMetrics();
                        }
                    }
                );
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

                          var data = [];
                          for (var key in resp.Metrics) {
                              var obj = {'Metrics': key};
                              angular.extend(obj, resp.Metrics[key]);
                              data.push(obj)
                          }
                          $scope.metricsData = data;
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
        'AgentCmd',
        function($scope, $rootScope, $filter, AgentCmd) {
            $scope.init = function () {
                $rootScope.$watch('query',
                    function (newValue, oldValue) {
                        if (newValue.Tables === null || newValue.Tables.length === 0 || newValue.Tables[0].Db === '') {
                            $scope.db = '';
                            $scope.queryExplainData = [];
                        } else {
                            $scope.db = newValue.Tables[0].Db;
                            $scope.getQueryExplain();
                        }
                    }
                );
            };

            $scope.getQueryExplain = function() {
                var db = $scope.db;
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
                            $scope.queryExplainData = explain.Classic;
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
        'AgentCmd',
        function($scope, $rootScope, $filter, AgentCmd) {
            $scope.init = function () {
                $scope.toggleTableInfo = 'create';
                $rootScope.$watch('query',
                    function (newValue, oldValue) {
                            if (newValue.Tables === null || newValue.Tables[0].Db === '') {
                                $scope.dbTables = [];
                                $scope.reset();
                            } else {
                                $scope.dbTables = newValue.Tables;
                                $scope.selectedDbTable = $scope.dbTables[0];
                                $scope.getTableInfo();
                            }
                    }
                );

            };

            $scope.reset = function () {
                $scope.tblCreateError = null;
                $scope.tblIndexError = null;
                $scope.tblStatusError = null;
                $scope.tblCreate = false;
                $scope.tblStatus = [];
                $scope.tblIndex = [];
            };

            $scope.getTableInfo = function() {
                $scope.reset();
                if (!('Db' in $scope.selectedDbTable) || !('Table' in $scope.selectedDbTable)) {
                    return null;
                }
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
                        // Get table create
                        if ('Create' in $scope.tableInfo[db_tbl]) {
                            $scope.tblCreate = vkbeautify.sql($scope.tableInfo[db_tbl].Create);
                        }

                        // Get Status
                        if ('Status' in $scope.tableInfo[db_tbl]) {
                            $scope.tblStatus = $scope.tableInfo[db_tbl].Status;
                        }

                        // Get indexes
                        if ('Index' in $scope.tableInfo[db_tbl]) {
                            $scope.tblIndex = $scope.tableInfo[db_tbl].Index;
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
