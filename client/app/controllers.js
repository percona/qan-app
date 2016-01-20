(function(){
    'use strict';
    var pplControllers = angular.module('pplControllers', []);

    pplControllers.controller('QueryProfileController', [
        '$scope',
        '$rootScope',
        '$filter',
        '$state',
        'constants',
        'QueryProfile',
        'Metric',
        'Agent',
        'Instance',
        'Config',
        '$modal',
        'instance',
        function($scope, $rootScope, $filter, $state, constants, QueryProfile,
                 Metric, Agent, Instance, Config, $modal, instance) {

            $scope.init = function() {
                $scope.qanData = [];
                if ($rootScope.alerts.length === 0) {
                    $scope.instance_uuid = instance.selected_instance.UUID;
                    $scope.instance_DSN = instance.selected_instance.DSN.replace(/:[0-9a-zA-Z]+@/, ':************@');

                    $rootScope.instances = instance.instances;
                    $rootScope.instance = instance.selected_instance;


                    $scope.query = '';
                    // it is need to disable future dates.
                    $rootScope.dtCal = null;
                    $scope.queryExplain = '';

                    $rootScope.time_range = '1h';
                    $scope.setTimeRange('1h');
                    $rootScope.$watch('time_range', function(time_range, old_time_range) {
                        if (time_range === 'cal') {
                            $scope.old_time_range = old_time_range;
                        } else {
                            $scope.setTimeRange(time_range);
                        }
                    });
                    $rootScope.$watch('instance', function(instance, old_instance) {
                        $scope.getConfig();
                        $scope.getProfile();
                        $state.go('root.instance-dt', {
                            uuid: $rootScope.instance.UUID,
                        });
                    });
                }
            };

            $scope.getConfig = function () {
                Config.query({instance_uuid: $rootScope.instance.UUID})
                      .$promise
                      .then(function(resp) {
                          $rootScope.config = resp;
                      })
                      .catch(function(resp) {
                          var msg = constants.DEFAULT_ERR;
                          if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                              msg = resp.data.Error;
                          }
                          $rootScope.alerts.push({
                              'type': 'danger',
                              'msg': msg
                          });
                      })
                      .finally(function(resp){});
            };



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

                    $rootScope.dtRange = $scope.date1.format('YYYY-MM-DD HH:mm:ss') +
                                         ' - Please select one more date';
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
                    $rootScope.query = null;
                    $state.go('root.instance-dt', {
                        uuid: $rootScope.instance.UUID,
                        begin: $scope.begin,
                        end: $scope.end
                    });
                    $rootScope.dtRange = $scope.b.format('YYYY-MM-DD HH:mm:ss') +
                                         ' to ' +
                                         $scope.e.format('YYYY-MM-DD HH:mm:ss') +
                                         ' UTC';
                    $scope.getProfile();
                    $scope.date1 = undefined;
                    $scope.date2 = undefined;
                }
            };

            $scope.setTimeRange = function(time_range) {
                $rootScope.query = null;
                var begin = moment.utc();
                var end = moment.utc();
                $scope.min_dt = undefined;
                $scope.max_dt = undefined;
                $rootScope.$broadcast('resetCal');
                switch (time_range) {
                    case '1h':
                        begin.subtract(1, 'hours');
                        break;
                    case '3h':
                        begin.subtract(3, 'hours');
                        break;
                    case '6h':
                        begin.subtract(6, 'hours');
                        break;
                    case '12h':
                        begin.subtract(12, 'hours');
                        break;
                    case '1d':
                        begin.subtract(1, 'days');
                        break;
                    case '5d':
                        begin.subtract(5, 'days');
                        break;
                    case 'cal':
                        break;
                    default:
                        begin.subtract(1, 'days');
                }
                $scope.begin = begin.format('YYYY-MM-DDTHH:mm:ss');
                $scope.end = end.format('YYYY-MM-DDTHH:mm:ss');
                $rootScope.dtRange = begin.format('YYYY-MM-DD HH:mm:ss') +
                                     ' to ' +
                                     end.format('YYYY-MM-DD HH:mm:ss') +
                                     ' UTC';

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
                $rootScope.query_abstract = row.Abstract;
                $state.go('root.instance-dt.query', {
                    query_id: row.Id
                });
            };

            $scope.getProfile = function() {
                $scope.queryExplain = '';
                $scope.query = '';
                $rootScope.query = null;
                $scope.query_id = null;
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
                            .catch(function(resp) {
                                var msg = constants.DEFAULT_ERR;
                                if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                                    msg = resp.data.Error;
                                }
                                $rootScope.alerts.push({
                                    'type': 'danger',
                                    'msg': msg
                                });
                            })
                            .finally(function(resp){});

            };

            $scope.init();
    }]);

    pplControllers.controller('MetricsController', [
        '$scope',
        '$rootScope',
        '$state',
        'constants',
        'Metric',
        function($scope, $rootScope, $state, constants, Metric) {
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
                              data.push(obj);
                          }
                          $scope.metricsData = data;
                      })
                      .catch(function(resp) {
                          var msg = constants.DEFAULT_ERR;
                          if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                              msg = resp.data.Error;
                          }
                          $rootScope.alerts.push({
                              'type': 'danger',
                              'msg': msg
                          });
                      })
                      .finally(function(resp){});
            };

            $scope.init();
    }]);

    pplControllers.controller('QueryController', [
        '$scope',
        '$rootScope',
        '$state',
        '$filter',
        'constants',
        function($scope, $rootScope, $state, $filter, constants) {
            $scope.init = function () {
                $scope.toggleQuery = 'example';
                $rootScope.$watch('query', function (newValue, oldValue) {
                    if ($rootScope.query !== null) {
                        $scope.changeQuery();
                    }
                });
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

                $scope.example = $filter('sqlReformat')($rootScope.example.Query);
                $scope.fingerprint = $filter('sqlReformat')($rootScope.query.Fingerprint);
            };

            $scope.init();
    }]);

    pplControllers.controller('QueryExplainController', [
        '$scope',
        '$rootScope',
        '$filter',
        'constants',
        'AgentCmd',
        function($scope, $rootScope, $filter, constants, AgentCmd) {
            $scope.init = function () {
                $rootScope.$watch('query', function (newValue, oldValue) {
                    if ($rootScope.query !== null) {
                        $scope.db = '';
                        $scope.queryExplainData = [];
                        $scope.queryExplainError = '';
                        if (newValue.Tables !== null && newValue.Tables.length > 0 && newValue.Tables[0].Db !== '') {
                            $scope.db = angular.copy(newValue.Tables[0].Db);
                            $scope.getQueryExplain();
                        }
                    }
                });
            };

            $scope.explainErrorMsg = function() {
                var allowedFor56= ['SELECT', 'DELETE', 'INSERT', 'REPLACE', 'UPDATE'];
                var ver = $rootScope.instance.Version.split('.');
                var majorVersion = ver[0];
                var minorVersion = ver[1];
                var isNewer56 = majorVersion == 5 && minorVersion >= 6 || majorVersion > 5;
                var action = $rootScope.query_abstract.split(' ')[0];
                if (allowedFor56.indexOf(action) === -1) {
                    return 'MySQL cannot EXPLAIN ' + action + ' queries';
                } else if (!isNewer56 && allowedFor56.indexOf(action) > 0) {
                    return 'MySQL 5.6 or newer and ' + action + ' privileges are required to EXPLAIN this ' + action + ' query';
                } else {
                    return '';
                }
            };

            $scope.getQueryExplain = function() {
                var db = $scope.db;
                var data = {
                    "UUID": $rootScope.instance.UUID,
                    "Db": db,
                    "Query": $rootScope.example.Query,
                    "Convert": true,  // agent will convert if not SELECT and MySQL <= 5.5 or >= 5.6 but no privs
                };
                var params = {
                    AgentUUID: $rootScope.config.AgentUUID,
                    Service: 'query',
                    Cmd: 'Explain',
                    Data: btoa(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $rootScope.config.AgentUUID}, agentCmd);
                p.$promise
                .then(function (data) {
                        $scope.queryExplain = true;
                        if (data.Error === '') {
                            var explain = JSON.parse(atob(data.Data));
                            $scope.queryExplainData = explain.Classic;
                            $scope.queryExplainError = '';
                        } else {
                            $scope.queryExplainError = data.Error;
                        }
                    })
                .catch(function(resp) {
                    var msg = constants.DEFAULT_ERR;
                    if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                        msg = resp.data.Error;
                    }
                    $rootScope.alerts.push({
                        'type': 'danger',
                        'msg': msg
                    });
                });
            };


            $scope.init();

    }]);

    pplControllers.controller('TableInfoController', [
        '$scope',
        '$rootScope',
        '$filter',
        'constants',
        'AgentCmd',
        function($scope, $rootScope, $filter, constants, AgentCmd) {
            $scope.init = function () {
                $scope.dbTables = [];
                $scope.toggleTableInfo = 'create';
                $rootScope.$watch('query', function (newValue, oldValue) {
                    if ($rootScope.query !== null) {
                        if (newValue.Tables === null || newValue.Tables[0].Db === '') {
                            $scope.dbTables = [];
                            $scope.reset();
                        } else {
                            $scope.dbTables = newValue.Tables;
                            $scope.selectedDbTable = $scope.dbTables[0].Db + '.' + $scope.dbTables[0].Table;
                            $scope.getTableInfo();
                        }
                    }
                });
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
                if ($scope.selectedDbTable === null) {
                    return null;
                }
                var dbTbl = $scope.selectedDbTable.split('.');
                var db = dbTbl[0];
                var tbl = dbTbl[1];
                var db_tbl = $scope.selectedDbTable;

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
                    AgentUUID: $rootScope.config.AgentUUID,
                    Service: 'query',
                    Cmd: 'TableInfo',
                    Data: btoa(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $rootScope.config.AgentUUID}, agentCmd);
                p.$promise
                .then(function (data) {
                        $scope.tableInfo = JSON.parse(atob(data.Data));
                        if ($scope.tableInfo instanceof Object && 'Errors' in $scope.tableInfo[db_tbl]) {
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
                        if ($scope.tableInfo instanceof Object && 'Create' in $scope.tableInfo[db_tbl]) {
                            $scope.tblCreate = $scope.tableInfo[db_tbl].Create;
                        }

                        // Get Status
                        if ($scope.tableInfo instanceof Object && 'Status' in $scope.tableInfo[db_tbl]) {
                            $scope.tblStatus = $scope.tableInfo[db_tbl].Status;
                        }

                        // Get indexes
                        if ($scope.tableInfo instanceof Object && 'Index' in $scope.tableInfo[db_tbl]) {
                            $scope.tblIndex = $scope.tableInfo[db_tbl].Index;
                        }
                })
                .catch(function(resp) {
                    var msg = constants.DEFAULT_ERR;
                    if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                        msg = resp.data.Error;
                    }
                    $rootScope.alerts.push({
                        'type': 'danger',
                        'msg': msg
                    });
                });
            };

            $scope.addDbTable = function() {
                var dbTbl = $scope.dbTable.split('.');
                var option = {
                    'Db': dbTbl[0],
                    'Table': dbTbl[1]
                };

                if ($scope.dbTables.length === 0) {
                    $scope.dbTables = [option];
                } else {
                    $scope.dbTables.unshift(option);
                }
                $scope.selectedDbTable = $scope.dbTables[0].Db + '.' + $scope.dbTables[0].Table;
                $scope.getTableInfo();
                $scope.dbTable = '';
            };


            $scope.init();

    }]);


})();
