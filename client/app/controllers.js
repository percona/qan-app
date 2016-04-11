(function(){
    'use strict';

    function utf8_to_b64(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }))
    }

    function b64_to_utf8(str) {
        return decodeURIComponent(unescape(window.atob(str)));
    }

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

                    $scope.getConfig();

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
                }

            };

            $rootScope.changeInstance = function(instance) {
                $rootScope.instance = instance;
                $state.go('root.instance-dt', {
                    uuid: $rootScope.instance.UUID,
                });
                $scope.qanData = [];
                $scope.getConfig();
                $scope.getProfile();
            };

            $scope.getConfig = function () {
                Config.query({instance_uuid: $rootScope.instance.UUID})
                      .$promise
                      .then(function(resp) {
                          $rootScope.config = resp;
                      })
                      .catch(function(resp) {
                          var msg = constants.DEFAULT_ERR;
                          if (resp.status === 404) {
                              msg = constants.API_ERR;
                              msg = msg.replace('<err_msg>', 'MySQL Query Analytics configuration not found');
                          } else {
                              if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                                  msg = constants.API_ERR;
                                  msg = msg.replace('<err_msg>', resp.data.Error);
                              }
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
                $scope.qanData = [];
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
                                    msg = constants.API_ERR;
                                    msg = msg.replace('<err_msg>', resp.data.Error);
                                }
                                    $scope.qanData = [];
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
                              msg = constants.API_ERR;
                              msg = msg.replace('<err_msg>', resp.data.Error);
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
                    Data: utf8_to_b64(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $rootScope.config.AgentUUID}, agentCmd);
                p.$promise
                .then(function (data) {
                        $scope.queryExplain = true;
                        if (data.Error === '') {
                            if (data.hasOwnProperty('Data') && data.Data !== null) {
                                var explain = JSON.parse(b64_to_utf8(data.Data));
                                $scope.queryExplainData = explain.Classic;
                                $scope.queryExplainError = '';
                            } else {
                                $scope.queryExplainError = 'Unable to parse QAN API response.';
                            }
                        } else {
                            $scope.queryExplainError = data.Error;
                        }
                    })
                .catch(function(resp) {
                    var msg = constants.DEFAULT_ERR;
                    if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                        msg = constants.API_ERR;
                        msg = msg.replace('<err_msg>', resp.data.Error);
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
        'Table',
        'AgentCmd',
        function($scope, $rootScope, $filter, constants, Table, AgentCmd) {
            $scope.init = function () {
                $scope.dbTables = [];
                $scope.toggleTableInfo = 'create';
                $rootScope.$watch('query', function (newValue, oldValue) {
                    if ($rootScope.query !== null) {
                        if (newValue.Tables === null || newValue.Tables.length === 0 || newValue.Tables[0].Db === '') {
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

            $scope.updateTable = function () {
                var tables = [];
                var params = {
                    'queryId': $rootScope.query.Id
                };
                var tbls = $scope.dbTables;
                for(var i=0; i<tbls.length; i++) {
                    if ($scope.dbTables[i].isPersistent !== false) {
                        tables.push(new Table({
                            'Db': tbls[i].Db,
                            'Table': tbls[i].Table
                        }));
                    }
                }

                var p = Table.update(params, tables);
                p.$promise
                .then(function (resp) {
                })
                .catch(function (resp) {})
                .finally(function (resp) {});

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
                    Data: utf8_to_b64(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $rootScope.config.AgentUUID}, agentCmd);
                p.$promise
                .then(function (data) {
                        $scope.tableInfo = JSON.parse(b64_to_utf8(data.Data));
                        if ($scope.tableInfo instanceof Object && 'Errors' in $scope.tableInfo[db_tbl]) {
                            var errors = $scope.tableInfo[db_tbl].Errors;
                            var msg;
                            for (var t=0; t<$scope.dbTables.length; t++) {
                                if ($scope.dbTables[t].Db + '.' + $scope.dbTables[t].Table === $scope.selectedDbTable) {
                                    $scope.dbTables[t].isPersistent = false;
                                }
                            }
                            for (var i=0; i<errors.length; i++) {
                                if (errors[i].startsWith('SHOW CREATE')) {
                                    msg = constants.AGENT_ERR;
                                    $scope.tblCreateError = msg.replace('<err_msg>', errors[i]);
                                }
                                if (errors[i].startsWith('SHOW INDEX')) {
                                    msg = constants.AGENT_ERR;
                                    $scope.tblIndexError = msg.replace('<err_msg>', errors[i]);
                                }
                                if (errors[i].startsWith('SHOW TABLE STATUS')) {
                                    msg = constants.AGENT_ERR;
                                    $scope.tblStatusError = msg.replace('<err_msg>', errors[i]);
                                }
                            }
                        }
                        // Get table create
                        if ($scope.tableInfo instanceof Object && 'Create' in $scope.tableInfo[db_tbl]) {
                            $scope.tblCreate = $scope.tableInfo[db_tbl].Create;
                            if ($scope.isNewTable) {
                                $scope.updateTable();
                                $scope.isNewTable = false;
                            }
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
                        msg = constants.API_ERR;
                        msg = msg.replace('<err_msg>', resp.data.Error);
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
                $scope.isNewTable = true;

                if ($scope.dbTables.length === 0) {
                    $scope.dbTables = [option];
                } else {
                    var isUniq = true;
                    for (var i=0; i<$scope.dbTables.length; i++) {
                        if (option.Db === $scope.dbTables[i].Db && option.Table === $scope.dbTables[i].Table) {
                            isUniq = false;
                            $scope.isNewTable = false;
                        }
                    }
                    if (isUniq) {
                        $scope.dbTables.unshift(option);
                    }
                }
                $scope.selectedDbTable = $scope.dbTables[0].Db + '.' + $scope.dbTables[0].Table;
                $scope.getTableInfo();
                $scope.dbTable = '';
            };


            $scope.init();

    }]);

    pplControllers.controller('ManagementController', [
        '$scope',
        '$rootScope',
        '$window',
        'constants',
        '$timeout',
        '$interval',
        '$filter',
        '$state',
        'Instance',
        'AgentCmd',
        'AgentStatus',
        'AgentLog',
        'Config',
        'instances',
        function($scope, $rootScope, $window, constants, $timeout, $interval, $filter,
                 $state, Instance, AgentCmd, AgentStatus, AgentLog, Config, instances) {
            $scope.init = function () {
                $rootScope.treeRootLabel = 'Select an Instance';
                $scope.isSafari = $window.navigator.vendor.indexOf('Apple') > -1;
                $scope.instancesByUUID = instances.asDict;
                $scope.instances = instances.asArray;
                $scope.makeInstancesTree($scope.instances);
                $scope.managementFormUrl = '';
                $scope.rawQanConfig = null;
                $scope.qanConf = {
                    'config': 'auto',
                    'Interval': '',
                    'MaxSlowLogSize': '',
                    'RemoveOldSlowLogs': 'yes',
                    'ExampleQueries': 'yes',
                    'CollectFrom': 'slowlog',
                    'LongQueryTime': '',
                    'SlowLogVerbosity': 'Full',
                    'RateLimit': '',
                    'LogSlowAdminStatements': 'OFF',
                    'LogSlowSlaveStatemtents': 'OFF',
                };
                $scope.qanConfDefault = angular.copy($scope.qanConf);
                $scope.qanConfLock = {
                    'Interval': false,
                    'MaxSlowLogSize': false,
                    'RemoveOldSlowLogs': false,
                    'ExampleQueries': false,
                    'LongQueryTime': false,
                    'SlowLogVerbosity': false,
                    'RateLimit': false,
                    'LogSlowAdminStatements': false,
                    'LogSlowSlaveStatemtents': false,
                };
                $scope.qanConfNew = {};
                $scope.logTimeFrame = '1 h';
                $scope.severityLeveles = [
                    'emerg', 'alert', 'crit', 'err',
                    'warning', 'notice', 'info', 'debug'
                ];
                $scope.tooltipText = 'Copy the ID';
                $scope.initManagement();
            };

            $scope.initManagement = function () {
                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

                        if ($state.is('management')) {
                            $scope.resetConnectionStatus();
                            switch (toParams.subsystem) {
                                case 'mysql':
                                    $rootScope.managementFormUrl = '/client/templates/mysql_form.html';
                                    $timeout(function () {
                                        $scope.editMySQLFormData(toParams.uuid);
                                    }, 500);
                                    break;
                                case 'new-mysql':
                                    $rootScope.managementFormUrl = '/client/templates/mysql_form.html';
                                    $timeout(function () {
                                        $scope.newMySQLFormData();
                                    }, 200);
                                    break;
                                case 'agent':
                                    $rootScope.managementFormUrl = '/client/templates/agent_form.html';
                                    $timeout(function () {
                                        $scope.agentData(toParams.uuid);
                                    }, 200);
                                    break;
                                case 'os':
                                    $rootScope.managementFormUrl = '';
                                    $timeout(function () {
                                        var os = $scope.instancesByUUID[toParams.uuid];
                                        $rootScope.treeRootLabel = 'Host: ' + os.Name;
                                    }, 200);
                                    break;
                                default:
                                    $rootScope.managementFormUrl = '';
                                    $rootScope.treeRootLabel = 'Select an Instance';
                                    break;
                            }
                        }
                });
            };

            $scope.editMySQLFormData = function(uuid) {
                var re = new RegExp(/^(.+):(.+)@(unix|tcp)\((.+)\)\/.*(?:allowOldPasswords=(true|false))?.*$/);
                var mysql = $scope.instancesByUUID[uuid];
                if (mysql.Name.startsWith('MySQL')) {
                    $rootScope.treeRootLabel = mysql.Name;
                } else {
                    $rootScope.treeRootLabel = 'MySQL: ' + mysql.Name;
                }
                $scope.instance = new Instance(mysql);
                var arr = re.exec(mysql.DSN);
                $scope.instance.user = arr[1];
                $scope.instance.password = arr[2];
                $scope.instance.type = arr[3];
                if ($scope.instance.type === 'unix') {
                    $scope.instance.socket = arr[4];
                    $scope.instance.hostname = '';
                    $scope.instance.port = 3306;
                } else {
                    var hostPort = arr[4].split(':');
                    $scope.instance.hostname = hostPort[0];
                    $scope.instance.port = parseInt(hostPort[1]) || 3306;
                    $scope.instance.socket = '';
                }
                $scope.rawInstance= angular.copy($scope.instance);
                $scope.instance.allowOldPasswords = arr[5] === undefined ? false : arr[5];
                // QAN mgmt
                $scope.getRelatedAgent($scope.instance);
                $scope.qanConf.UUID = $scope.instance.UUID;
                $scope.trackQanConf();
                $scope.trackQanConfLock();

                // watch form changing to update DSN
                $scope.$watchCollection('instance', function(){
                    $scope.getDSN();
                });
            };

            $scope.newMySQLFormData = function() {
                $rootScope.treeRootLabel = 'Add MySQL Connection';
                $scope.instance = new Instance({});
                $scope.instance.user = '';
                $scope.instance.Distro = '';
                $scope.instance.password = '';
                $scope.instance.type = 'tcp';
                $scope.instance.hostname = '';
                $scope.instance.port = 3306;
                $scope.instance.socket = '';
                $scope.rawInstance= angular.copy($scope.instance);
                $scope.instance.allowOldPasswords = false;
                // watch form changing to update DSN
                $scope.$watchCollection('instance', function(){
                    $scope.getDSN();
                });
                $scope.trackQanConf();
                $scope.trackQanConfLock();
            };

            $scope.agentData = function(uuid) {
                $scope.agent = $scope.instancesByUUID[uuid];
                $rootScope.treeRootLabel = 'Agent: ' + $scope.agent.Name;
                $scope.getAgentStatus($scope.agent);
                $scope.getAgentLog($scope.agent, $scope.logTimeFrame);
            };

            $rootScope.treeHandler = function (branch) {
                if (branch.hasOwnProperty('data')) {
                    $state.go('management', {
                        'subsystem': branch.data.Subsystem,
                        'uuid': branch.data.UUID
                    });
                } else {
                    $state.go('management', {
                        'subsystem': 'none',
                        'uuid': ''
                    });
                }
            };

            $scope.onSuccess = function(e) {
                e.clearSelection();
            };

            $scope.onError = function(e) {
                // silent
            };


            $scope.getInstances = function () {
                Instance.query()
                    .$promise
                    .then(function (resp) {
                        $scope.makeInstancesTree(resp);
                    })
                    .catch(function (resp) {})
                    .finally(function (resp) {});
            };


            $scope.makeInstancesTree = function (instances) {

                $rootScope.treeData = $scope.treeData = [];
                var n = 0;
                var iter = 0;
                var len = instances.length;
                $scope.agents = [];
                $scope.mysqls = [];
                for (var i=0; len > i; i++) {
                    // refresh
                    $scope.instancesByUUID[instances[i].UUID] = instances[i];

                    if (instances[i].Subsystem === 'os') {
                        $scope.treeData.push({
                            'expanded': true,
                            'label': instances[i].Name,
                            'data': instances[i],
                            'children': [{
                                    'label': 'MySQL',
                                    'expanded': true,
                                    'children': []
                            }]
                        });
                    }
                    if (instances[i].Subsystem === 'mysql'
                            && instances[i].ParentUUID === ''
                            && moment(instances[i].Deleted) < moment('0001-01-02')) {
                        $scope.treeData.push({
                            'expanded': true,
                            'label': 'MySQL: ' + instances[i].Name,
                            'data': instances[i],
                            'children': []
                        });
                    }
                }

                for (i=0; len > i; i++) {
                    for (var k=0; k<$scope.treeData.length; k++) {
                        if ($scope.treeData[k].data.UUID === instances[i].ParentUUID) {
                            if (instances[i].Subsystem === 'agent') {
                                $scope.treeData[k].children.push({
                                    'label': 'Agent',
                                    'data': instances[i]
                                });
                                $scope.agents.push(instances[i]);
                            } else {
                                $scope.treeData[k].children[0].children.push({
                                    'label': instances[i].Name,
                                    'data': instances[i]
                                });
                                $scope.mysqls.push(instances[i]);
                            }
                        }
                    }
                }
            };

            $scope.stopAgent = function () {
                var data = {};
                var params = {
                    AgentUUID: $scope.agent.UUID,
                    Service: 'agent',
                    Cmd: 'Stop'
                };
                if (!confirm(constants.CONFIRM_STOP_AGENT)) {
                    return;
                }

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: $scope.agent.UUID}, agentCmd);
                p.$promise
                .then(function (data) {})
                .catch(function(resp) {})
                .finally(function() {
                    $scope.getAgentStatus();
                });
            };

            $scope.getRelatedAgent = function (mysql) {
                Config.query({instance_uuid: mysql.UUID})
                      .$promise
                      .then(function (resp) {
                          $scope.rawQanConfig = resp;
                          for (var i=0; i<$scope.agents.length; i++) {
                              if (resp.AgentUUID === $scope.agents[i].UUID) {
                                  $scope.selected_agent = $scope.agents[i];
                                  $scope.getQanDefaults($scope.selected_agent);
                              }
                          }
                      })
                      .catch(function (resp) {
                          // Silent
                          // No config yet
                      })
                      .finally(function() {});
            };

            $scope.getRelatedMySQL = function (agent) {
                for (var i=0; i<$scope.mysqls.length; i++) {
                    if (agent.ParentUUID === $scope.mysqls[i].ParentUUID) {
                        return $scope.mysqls[i];
                    }
                }
            };


            $scope.getDSN = function () {
                var dsn = '';
                if ($scope.instance.user) {
                    dsn = $scope.instance.user;
                    if ($scope.instance.password) {
                        dsn += ':' + $scope.instance.password;
                    }
                    dsn += '@';
                }

                if ($scope.instance.type === 'tcp') {
                    if (!($scope.instance.hostname === '' || $scope.instance.hostname === undefined)) {
                        dsn += 'tcp';
                        dsn += '(' + $scope.instance.hostname;
                        if ($scope.instance.port) {
                            dsn += ':' + $scope.instance.port;
                        }
                        dsn +=  ')';
                    }
                } else if ($scope.instance.type === 'unix') {
                    dsn += 'unix';
                    if ($scope.instance.socket) {
                        dsn += '(' + $scope.instance.socket + ')';
                    }
                }
                dsn += '/';
                if ($scope.instance.allowOldPasswords) {
                    dsn += '?allowOldPasswords=true';
                }
                $scope.popoverDSN = dsn;
                return dsn;
            };

            $scope.updateAgentInstance = function () {
                Instance.update({'instance_uuid': $scope.agent.UUID}, $scope.agent)
                    .$promise
                    .then(function (resp) {
                          $rootScope.treeRootLabel = 'Agent: ' + $scope.agent.Name;
                          $rootScope.alerts.push({
                              'type': 'info',
                              'msg': 'Agent has been updated.'
                          });
                    })
                    .catch(function (resp) {
                        var msg = constants.DEFAULT_ERR;
                        if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                            msg = constants.API_ERR;
                            msg = msg.replace('<err_msg>', resp.data.Error);
                        }
                        $rootScope.alerts.push({
                            'type': 'danger',
                            'msg': msg
                        });
                    })
                    .finally();
            };

            $scope.updateMySQLInstance = function () {
                $scope.instance.DSN = $scope.getDSN();
                Instance.update({'instance_uuid': $scope.instance.UUID}, $scope.instance)
                    .$promise
                    .then(function (resp) {
                        $scope.rawInstance = resp;
                        $rootScope.treeRootLabel = 'MySQL: ' + $scope.instance.Name;
                        $rootScope.alerts.push({
                            'type': 'info',
                            'msg': 'MySQL instance has been updated.'
                        });
                        $state.go('management', {
                            subsystem: 'mysql',
                            uuid: resp.UUID
                        });
                    })
                    .catch(function (resp) {
                        $rootScope.showAlert(resp);
                    })
                    .finally();
            };

            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                });
                return uuid;
            }

            $scope.createMySQLInstance = function () {
                $scope.instance.DSN = $scope.getDSN();
                $scope.instance.subsystem = 'mysql';
                $scope.instance.UUID = generateUUID();
                var inst = new Instance($scope.instance);
                inst.$save().then(function (resp) {
                          $rootScope.treeRootLabel = 'MySQL: ' + $scope.instance.Name;
                          $rootScope.alerts.push({
                              'type': 'info',
                              'msg': 'MySQL instance has been created.'
                          });
                        $state.go('management', {
                            subsystem: 'mysql',
                            uuid: resp.UUID
                        });
                    })
                    .catch(function (resp) {
                        var msg = constants.DEFAULT_ERR;
                        if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('Error')) {
                            msg = constants.API_ERR;
                            msg = msg.replace('<err_msg>', resp.data.Error);
                        }
                        $rootScope.alerts.push({
                            'type': 'danger',
                            'msg': msg
                        });
                    })
                    .finally();
            };

            $scope.deleteMysqlInstance = function (name) {

                var msg = 'Do you really want to remove MySQL instance "' + name + '"?' +
                          '\n(Data associated with the instance will not be removed.)';
                if(!confirm(msg)) {
                    return void 0;
                }
                Instance.delete({'instance_uuid': $scope.instance.UUID})
                    .$promise
                    .then(function (resp) {
                        $state.go('management', {
                            subsystem: 'instance',
                            uuid: ''
                        });
                    })
                    .catch(function (resp) {
                        var msg = constants.DEFAULT_ERR;
                        if (resp.hasOwnProperty('data') && resp.data !== null && resp.data.hasOwnProperty('Error')) {
                            msg = constants.API_ERR;
                            msg = msg.replace('<err_msg>', resp.data.Error);
                        }
                        $rootScope.alerts.push({
                            'type': 'danger',
                            'msg': msg
                        });
                    })
                    .finally();
            };

            $scope.resetConnectionStatus = function () {
                $scope.instanceOK = false;
                $scope.instanceError = false;
            };

            $scope.testConnectionToMySQL = function (agent) {
                $scope.qanError = '';
                var data = {
                    'Subsystem': 'mysql',
                    'DSN': $scope.rawInstance.DSN
                };
                var params = {
                    AgentUUID: agent.UUID,
                    Service: 'instance',
                    Cmd: 'GetInfo',
                    Data: utf8_to_b64(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: agent.UUID}, agentCmd);
                p.$promise
                    .then(function (resp) {
                        if (resp.Error !== "") {
                            $scope.qanError = resp.Error;
                            $scope.qanOK = false;
                        } else {
                            $scope.qanOK = true;
                            $scope.qanError = resp.Error;
                        }
                    })
                 .catch(function (resp) {
                     $scope.qanOK = false;
                     $scope.qanError = resp.Error;
                 })
                 .finally();
            };

            $scope.testAgentConnection = function (agent) {
                $scope.instanceError = '';
                $scope.instance.DSN = $scope.getDSN();
                var data = {
                    'Subsystem': 'mysql',
                    'DSN': $scope.instance.DSN
                };
                var params = {
                    AgentUUID: agent.UUID,
                    Service: 'instance',
                    Cmd: 'GetInfo',
                    Data: utf8_to_b64(JSON.stringify(data))
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: agent.UUID}, agentCmd);
                p.$promise
                 .then(function (resp) {
                     if (resp.Error !== "") {
                        $scope.instanceError = resp.Error;
                        $scope.instanceOK = false;
                     } else {
                        $scope.agentStatus = JSON.parse(b64_to_utf8(resp.Data));
                        $scope.instanceOK = true;
                        $scope.instanceError = false;
                     }
                 })
                 .catch(function (resp) {
                     $scope.instanceOK = false;
                     $scope.instanceError = resp.Error;
                 })
                 .finally();
            };

            $scope.getAgentStatus = function (agent) {
                $interval.cancel($scope.statusUpdatedFromNowObj);
                var updated = moment();
                $scope.statusUpdatedFromNow = updated.fromNow();
                $scope.statusUpdatedFromNowObj = $interval(function() {
                    $scope.statusUpdatedFromNow = updated.fromNow();
                }, 60000);
                AgentStatus.query({agent_uuid: agent.UUID})
                    .$promise
                    .then(function (resp) {
                        $scope.agentStatus = resp;
                        var qanAnalyzerKey = Object.keys($scope.agentStatus)
                            .filter(function(v) {
                                return v.startsWith('qan-analyzer') && !v.endsWith('interval') && !v.endsWith('worker');
                            });
                        $scope.agentStatus['qan-analyzer'] = resp[qanAnalyzerKey];

                    })
                    .catch(function (resp) {
                          var msg = constants.DEFAULT_ERR;
                          if (resp.hasOwnProperty('data') && resp.data !== null && resp.data.hasOwnProperty('Error')) {
                              msg = constants.API_ERR;
                              msg = msg.replace('<err_msg>', resp.data.Error);
                          }
                          $rootScope.alerts.push({
                              'type': 'danger',
                              'msg': msg
                          });
                    })
                    .finally(function (resp) {});
            };

            $scope.getAgentLog = function (agent, period) {
                period = period.split(' ');
                var begin = moment.utc().subtract(period[0], period[1]).format(constants.DTM_FORMAT);
                var end = moment.utc().format(constants.DTM_FORMAT);
                var params = {
                    agent_uuid: agent.UUID,
                    begin: begin,
                    end: end
                };
                AgentLog.query(params)
                    .$promise
                    .then(function (resp) {
                        $scope.agentLog = resp;
                    })
                    .catch(function (resp) {
                          var msg = constants.DEFAULT_ERR;
                          if (resp.hasOwnProperty('data') && resp.data !== null && resp.data.hasOwnProperty('Error')) {
                              msg = constants.API_ERR;
                              msg = msg.replace('<err_msg>', resp.data.Error);
                          }
                          $rootScope.alerts.push({
                              'type': 'danger',
                              'msg': msg
                          });
                    })
                    .finally(function (resp) {});
            };

            $scope.trackQanConf = function () {
                $scope.$watchCollection('qanConf', function(newVal, oldVal){
                    $scope.confToApiRepresentation();
                });
            };

            $scope.confToApiRepresentation = function() {
                $scope.qanConfNew = {};
                if ($scope.qanConf.config === 'auto') {
                    $scope.qanConfNew = {UUID: $scope.qanConf.UUID};
                } else {
                    $scope.qanConfNew.UUID = $scope.qanConf.UUID;

                    if($scope.qanConfLock.Interval) {
                        $scope.qanConfNew.Interval = String(moment.duration($scope.qanConf.Interval, 'm').asSeconds());
                    } else {
                        $scope.qanConf.Interval = $scope.qanConfDefault.Interval;
                    }
                    if($scope.qanConfLock.ExampleQueries) {
                        $scope.qanConfNew.ExampleQueries = $scope.qanConf.ExampleQueries ? 'yes' : 'no';
                    } else {
                        $scope.qanConf.ExampleQueries = $scope.qanConfDefault.ExampleQueries;
                    }

                    $scope.qanConfNew.CollectFrom = $scope.qanConf.CollectFrom;

                    if ($scope.qanConf.CollectFrom === 'slowlog') {

                        if ($scope.qanConfLock.LongQueryTime) {
                            $scope.qanConfNew.LongQueryTime = String($scope.qanConf.LongQueryTime);
                        } else {
                            $scope.qanConf.LongQueryTime = $scope.qanConfDefault.LongQueryTime;
                        }

                        if ($scope.qanConfLock.MaxSlowLogSize) {
                            $scope.qanConfNew.MaxSlowLogSize = String(numeral().unformat($scope.qanConf.MaxSlowLogSize));
                        } else {
                            $scope.qanConf.MaxSlowLogSize = $scope.qanConfDefault.MaxSlowLogSize;
                        }

                        if ($scope.qanConfLock.RemoveOldSlowLogs) {
                            $scope.qanConfNew.RemoveOldSlowLogs = $scope.qanConf.RemoveOldSlowLogs ? 'yes' : 'no';
                        } else {
                            $scope.qanConf.RemoveOldSlowLogs = $scope.qanConfDefault.RemoveOldSlowLogs;
                        }

                        if ($scope.instance.Distro.toLowerCase().indexOf('percona server') > -1) {

                            if ($scope.qanConfLock.SlowLogVerbosity) {
                                $scope.qanConfNew.SlowLogVerbosity = $scope.qanConf.SlowLogVerbosity;
                            } else {
                                $scope.qanConf.SlowLogVerbosity = $scope.qanConfDefault.SlowLogVerbosity;
                            }
                            if ($scope.qanConfLock.RateLimit) {
                                $scope.qanConfNew.RateLimit = String($scope.qanConf.RateLimit);
                            } else {
                                $scope.qanConf.RateLimit = $scope.qanConfDefault.RateLimit
                            }
                            if ($scope.qanConfLock.LogSlowAdminStatements) {
                                $scope.qanConfNew.LogSlowAdminStatements = $scope.qanConf.LogSlowAdminStatements ? 'yes' : 'no';
                            } else {
                                $scope.qanConf.LogSlowAdminStatements = $scope.qanConfDefault.LogSlowAdminStatements;
                            }
                            if ($scope.qanConfLock.LogSlowSlaveStatemtents) {
                                $scope.qanConfNew.LogSlowSlaveStatemtents = $scope.qanConf.LogSlowSlaveStatemtents ? 'yes' : 'no';
                            } else {
                                $scope.qanConf.LogSlowSlaveStatemtents = $scope.qanConfDefault.LogSlowSlaveStatemtents;
                            }
                        }
                    }
                }
            };

            $scope.trackQanConfLock = function () {
                $scope.$watchCollection('qanConfLock', function(newVal, oldVal){
                    $scope.confToApiRepresentation();
                });
            };

            /**
             * Get QAN config (then marge it with defaults)
             */
            $scope.getQanConfig = function (mysql) {

                function parseQanConf(resp) {
                    var conf = JSON.parse(resp.SetConfig);
                    if (Object.keys(conf).length > 1) {
                        $scope.qanConf.config = 'manual';
                    } else {
                        $scope.qanConf.config = 'auto';
                    }
                    for (var attr in conf) {
                        $scope.qanConf[attr] = conf[attr];
                        if (['SlowLogVerbosity', 'RateLimit', 'LogSlowAdminStatements', 'LogSlowSlaveStatemtents'].indexOf(attr) > -1) {
                            if ($scope.instance.Distro.toLowerCase().indexOf('percona server') > -1) {
                                $scope.qanConfLock[attr] = true;
                            }
                        } else {
                            $scope.qanConfLock[attr] = true;
                        }

                        if (attr === 'MaxSlowLogSize') {
                            $scope.qanConf.MaxSlowLogSize = numeral($scope.qanConf.MaxSlowLogSize).format('0b');
                        }
                        if (attr === 'Interval') {
                            $scope.qanConf.Interval = moment.duration(parseInt($scope.qanConf.Interval), 's').asMinutes();
                        }
                    }
                    $scope.trackQanConf();
                    $scope.trackQanConfLock();
                }

                if ($scope.rawQanConfig === null) {
                    Config.query({instance_uuid: mysql.UUID})
                        .$promise
                        .then(function (resp) { parseQanConf(resp); })
                        .catch(function (resp) {
                            var msg = constants.DEFAULT_ERR;
                            if (resp.hasOwnProperty('data') && resp.data !== null && resp.data.hasOwnProperty('Error')) {
                                msg = constants.API_ERR;
                                msg = msg.replace('<err_msg>', resp.data.Error);
                            }
                            $rootScope.alerts.push({
                                'type': 'danger',
                                'msg': msg
                            });
                    })
                    .finally(function (resp) {});
                } else {
                    parseQanConf($scope.rawQanConfig);
                }
            };

            /**
             * Get QAN defaults
             */
            $scope.getQanDefaults = function (agent) {

                var data = {};
                var params = {
                    AgentUUID: agent.UUID,
                    Service: 'agent',
                    Cmd: 'GetDefaults',
                    Data: utf8_to_b64('{}')
                };

                var agentCmd = new AgentCmd(params);
                var p = AgentCmd.update({agent_uuid: agent.UUID}, agentCmd);
                p.$promise
                    .then(function (data) {
                        if (data.Error !== "") {
                            var msg = constants.API_ERR;
                            msg = msg.replace('<err_msg>', data.Error);
                            $rootScope.alerts.push({
                                'type': 'danger',
                                'msg': msg
                            });
                        } else {
                            var res = JSON.parse(b64_to_utf8(data.Data));
                            var conf = res.qan;
                            for (var attr in conf) {
                                if (['ReportLimit', 'WorkerRunTime'].indexOf(attr) > -1) {
                                    continue;
                                }
                                $scope.qanConf[attr] = conf[attr];
                                if (attr === 'MaxSlowLogSize') {
                                    $scope.qanConf.MaxSlowLogSize = numeral($scope.qanConf.MaxSlowLogSize).format('0b');
                                }
                                if (attr === 'Interval') {
                                    $scope.qanConf.Interval = moment.duration($scope.qanConf.Interval, 's').asMinutes();
                                }
                            }
                            $scope.qanConfDefault = angular.copy($scope.qanConf);
                            $scope.getQanConfig($scope.instance);
                        }
                    })
                .catch(function(resp) {
                    var msg = 'QAN API error: "<err_msg>".<br />Check whether percona-qan-agent is started.'
                            + '<br /> <code>sudo /etc/init.d/percona-qan-agent start|stop|restart|status<code>'
                    $rootScope.showAlert(resp, undefined, msg);
                })
                .finally(function() {});
            };

            $scope.setQanConfig = function (selected_agent) {

                var stopParams = {
                    AgentUUID: selected_agent.UUID,
                    Service: 'qan',
                    Cmd: 'StopTool',
                    Data: utf8_to_b64($scope.instance.UUID)
                };

                var stopAgentCmd = new AgentCmd(stopParams);
                var p = AgentCmd.update({agent_uuid: selected_agent.UUID}, stopAgentCmd);
                p.$promise
                    .then(function (resp) {
                        if (resp.Error !== "") {
                            var msg = constants.API_ERR;
                            msg = msg.replace('<err_msg>', resp.Error);
                            $rootScope.alerts.push({
                                'type': 'danger',
                                'msg': msg
                            });
                        } else {
                            var data = angular.copy($scope.qanConfNew);
                            var startParams = {
                                AgentUUID: selected_agent.UUID,
                                Service: 'qan',
                                Cmd: 'StartTool',
                                Data: utf8_to_b64(JSON.stringify(data))
                            };

                            var startAgentCmd = new AgentCmd(startParams);
                            p = AgentCmd.update({agent_uuid: selected_agent.UUID}, startAgentCmd);
                            p.$promise
                                .then(function (data) {
                                    if (data.Error !== "") {
                                        var msg = constants.API_ERR;
                                        msg = msg.replace('<err_msg>', data.Error);
                                        $rootScope.alerts.push({
                                            'type': 'danger',
                                            'msg': msg
                                        });
                                    } else {
                                        var res = JSON.parse(b64_to_utf8(data.Data));
                                        var conf = res.qan;
                                    }
                                })
                            .catch(function(resp) {})
                                .finally(function() {});
                        }
                })
                .catch(function(resp) {
                })
                .finally(function() {});

            };

            $scope.init();

    }]);

})();
