(function() {
    'use strict';

    var pplDirectives = angular.module('pplDirectives', []);

    /**
     * @desc top nav menu
     * @example <div query-nav></div>
     */
    pplDirectives.directive('queryNav',  function queryNav() {
        var controller = ['$scope', function ($scope) {
            var now = new Date();
        }];
        return {
            restrict: 'EA',
            templateUrl: 'client/templates/query_nav.html',
            link: function(scope, element, attrs) {},
            controller: controller
        };
    });

    /**
     * @desc top nav menu
     * @example <div management-nav></div>
     */
    pplDirectives.directive('managementNav',  function managementNav() {
        var controller = ['$scope', function ($scope) {
            var now = new Date();
        }];
        return {
            restrict: 'EA',
            templateUrl: 'client/templates/management_nav.html',
            link: function(scope, element, attrs) {},
            controller: controller
        };
    });

    /**
     * @desc load sparklines
     * @example <load-sparklines></load-sparklines>
     */
    pplDirectives.directive('loadSparklines',  function ($parse, $filter, $rootScope) {
        return {
            restrict: 'E',
            replace: false,
            scope: {data: '=chartData'},
            link: function(scope, element, attrs) {

                var iso = d3.time.format.utc('%Y-%m-%dT%H:%M:%SZ');
                var xkey = attrs.xkey;
                var ykey = attrs.ykey;

                var chart = d3.select(element[0]);
                var svg = chart.append('svg')
                    .attr('height', '20')
                    .attr('width', '100')
                    .attr('class', 'scaling-svg')
                    .attr('preserveAspectRatio', 'none')
                    .attr('viewBox', '0 0 100 20');

                var height = 15;
                var width = Math.floor(svg.node().getBoundingClientRect().width);
                svg.attr('width', width).attr('viewBox', '0 0 ' + width + ' 20');

                var xDomain = d3.extent(scope.data, function(d) {
                    return moment.utc(d[xkey]);
                });

                var xScale = d3.time.scale().range([0, width]).domain(xDomain);

                var yDomain = d3.extent(scope.data, function(d) {
                    return +(d[ykey]);
                });

                var yScale = d3.scale.linear().range([height, 0]).domain(yDomain);

                var line = d3.svg.line()
                    .x(function(d) {
                        return xScale(moment.utc(d[xkey]));
                    })
                .y(function(d) {
                    return yScale(+(d[ykey]));
                });

                var area = d3.svg.area()
                    .x(function(d) {
                        return xScale(moment.utc(d[xkey]));
                    })
                .y0(function(d) {
                    return yScale(+(d[ykey]));
                })
                .y1(height-1);

                var g = svg.append('g').attr('transform', 'translate(0, 0)');

                        g.append('path')
                        .datum(scope.data)
                        .attr('class', 'area')
                        .attr('d', area);


                        g.append('path')
                        .datum(scope.data)
                        .attr('class', 'line')
                        .attr('d', line);

                        var focus = g.append('g').style('display', 'none');

                        focus.append('line')
                        .attr('id', 'focusLineX')
                        .attr('class', 'focusLine');

                        focus.append('circle')
                        .attr('id', 'focusCircle')
                        .attr('r', 1)
                        .attr('class', 'circle focusCircle');

                        focus.append('text')
                            .attr('id', 'focusText')
                            .attr('font-size', '10')
                            .attr('x', 1)
                            .attr('y', 8);

                        var bisectDate = d3.bisector(function(d, x) {
                            return moment.utc(d[xkey]).isBefore(x);
                        }).right;

                        g.append('rect')
                            .attr('class', 'overlay')
                            .attr('width', width)
                            .attr('height', height)
                            .on('mouseover', function() {
                                focus.style('display', null);
                            })
                        .on('mouseout', function() {
                            focus.style('display', 'none');
                        })
                        .on('mousemove', function() {
                            var mouse = d3.mouse(this);
                            var mouseDate = moment.utc(xScale.invert(mouse[0]));
                            var i = bisectDate(scope.data, mouseDate); // returns the index to the current data item
                            i = i > 59 ? 59 : i;
                            i = i < 1 ? 1 : i;
                            var d0 = scope.data[i-1]
                            var d1 = scope.data[i];
                            // work out which date value is closest to the mouse
                            var d = mouseDate - moment.utc(d0[xkey]) > moment.utc(d1[xkey]) - mouseDate ? d1 : d0;

                            var x = xScale(iso.parse(d[xkey]));
                            var y = yScale(+(d[ykey]));

                            var MIN = 0,
                            MAX = 1;
                            focus.select('#focusCircle')
                                .attr('cx', x)
                                .attr('cy', y);
                            focus.select('#focusLineX')
                                .attr('x1', x).attr('y1', yScale(yDomain[MIN]))
                                .attr('x2', x).attr('y2', yScale(yDomain[MAX]));

                            var load = +(d[ykey]);
                            $rootScope.popover = $filter('humanize')(load, 'number') + ' at ' + moment(d[xkey]).utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
                            $rootScope.$apply();
                            //focus.select("#focusText")
                            //    .text($filter('humanize')(load, 'number') + ' at ' + moment(d[xkey]).utc().format('YYYY-MM-DD HH:mm:ss [UTC]'));
                        });

            }
        };
    });


    /**
     * @desc latency
     * @example <latency-chart></latency-chart>
     */
    pplDirectives.directive('latencyChart', ['$filter', function ($filter) {
        return {
            restrict: 'E',
            replace: false,
            scope: {data: '=chartData'},
            link: function(scope, element, attrs) {
                var chart = d3.select(element[0]);
                var svg = chart.append('svg')
                    .attr('height', '20')
                    .attr('width', '100')
                    .attr('class', 'scaling-svg')
                    .attr('viewBox', '0 0 100 20');

                var width = Math.floor(svg.node().getBoundingClientRect().width);
                svg.attr('width', width).attr('viewBox', '0 0 ' + width + ' 20');

                var x = d3.scale.log()
                    .clamp(true)
                    .domain([0.00001, 10000])
                    .range([2, width-2])
                    .nice();
                if (scope.data === undefined) {
                    return;
                }

                var min = scope.data.hasOwnProperty('Min') ? scope.data.Min : 0;
                var max = scope.data.hasOwnProperty('Max') ? scope.data.Max : 0;
                var avg = scope.data.hasOwnProperty('Avg') ? scope.data.Avg : 0;
                var p95 = scope.data.hasOwnProperty('P95') ? scope.data.P95 : 0;

                var g = svg.append('g');

                var hrAxes = g.append('line')
                    .attr('class', 'latency-chart-x')
                    .attr('x1', '0')
                    .attr('stroke-dasharray', '1, 1')
                    .attr('y1', '13px')
                    .attr('x2', width)
                    .attr('y2', '13px');

                var hrLine = g.append('line')
                    .attr('class', 'latency-chart-line')
                    .attr('x1', x(min) + '')
                    .attr('y1', '13px')
                    .attr('x2', x(max) + '')
                    .attr('y2', '13px');

                var minMark = g.append('line')
                    .attr('class', 'latency-chart-min')
                    .attr('x1', x(min) + '')
                    .attr('y1', '13px')
                    .attr('x2', x(min) + '')
                    .attr('y2', '19px');

                var maxMark = g.append('line')
                    .attr('class', 'latency-chart-max')
                    .attr('x1', x(max) + '')
                    .attr('y1', '8px')
                    .attr('x2', x(max) + '')
                    .attr('y2', '13px');

                var avgMark = g.append('circle')
                    .attr('class', 'latency-chart-avg')
                    .attr('r', 3)
                    .attr('cx', x(avg) + '')
                    .attr('cy', '13px');

                var p95Mark = g.append('circle')
                    .attr('class', 'latency-chart-p95')
                    .attr('r', 2)
                    .attr('cx', x(p95) + '')
                    .attr('cy', '13px');
            }
        };
    }]);

    /**
     * @desc metrics tables
     * @example <metrics></metrics>
     */
    pplDirectives.directive('metrics',  function($rootScope, $filter) {
        function maybeLessHundredth(val, suffix) {
            suffix = suffix || '';
            if (val < 0.01) {
                return '<0.01' + suffix;
            } else {
                return false;
            }
        };

        function setMetrics(scope, element, attrs) {
            var data = {};
            var data2 = {};

            var totalTime = $rootScope.totalTime;
            var totalQueries = scope.profileTotal.Stats.Cnt;
            var summary = $rootScope.summary;

            if ($rootScope.isServerSummary){
                var metrics = summary;
                scope.metrics = summary;

                var load = scope.profileTotal.Load;
                var percentage = scope.profileTotal.Percentage;
                var qps = scope.profileTotal.QPS;
                var queryTime = $rootScope.totalTime;
                var cnt = summary.Query_time.Cnt;

                scope.cnt = $filter('humanize')(cnt, 'number');
                scope.qps = $filter('humanize')(qps, 'number');
                scope.percentage = $filter('humanize')(percentage, 'percent');
                scope.load = $filter('humanize')(load, 'number');

            } else {
                var metrics = scope.metrics;
                var load = $rootScope.selectedQuery.Load;
                var percentage = $rootScope.selectedQuery.Percentage;
                var qps = $rootScope.selectedQuery.QPS;
                var queryTime = scope.metrics.Query_time.Avg;
                var cnt = scope.metrics.Query_time.Cnt;

                scope.cnt = $filter('humanize')(cnt, 'number');
                scope.qps = $filter('humanize')(qps, 'number');
                scope.percentage = $filter('humanize')(percentage, 'percent');
                scope.load = $filter('humanize')(load, 'number');
            }

            data['queryCount'] = {
                'perSec': function() {
                    var perSec =  cnt / scope.duration;
                    return $filter('humanize')(perSec, 'number');
                }(),
                'sum': function() {
                    return $filter('humanize')(cnt, 'number');
                }()
            };

            data['queryTime'] = {
                'sumLoad': function() {
                    var sumLoad = metrics.Query_time.Sum / scope.duration;
                    return $filter('humanize')(sumLoad, 'number');
                }(),
                'avg': $filter('humanize')(metrics.Query_time.Avg),
                'sum': $filter('humanize')(metrics.Query_time.Sum)
            };

            data['lockTime'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Lock_time.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'avgLoad': function() {
                    var avgLoad = metrics.Lock_time.Avg / scope.duration;
                    return $filter('humanize')(avgLoad, 'percent');
                }(),
                'avg': $filter('humanize')(metrics.Lock_time.Avg),
                'stats': metrics.Lock_time,
                'sum': $filter('humanize')(metrics.Lock_time.Sum),
                'percentOfQueryTime': function() {
                    var i = metrics.Lock_time.Avg / queryTime;
                    return $filter('humanize')(i, 'percent');
                }()
            };


            data['innodbRowLockWait'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.InnoDB_rec_lock_wait.Max, 'number');
                    } catch (err) {
                        return false;
                    }
                }(),
                'avg': function() {
                    try {
                        return $filter('humanize')(metrics.InnoDB_rec_lock_wait.Avg, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.InnoDB_rec_lock_wait.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'percentOfQueryTime': function() {
                    try {
                        var i = metrics.InnoDB_rec_lock_wait.Avg / queryTime;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['innodbIOReadWait'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.InnoDB_IO_r_wait.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'avg': function() {
                    try {
                        return $filter('humanize')(metrics.InnoDB_IO_r_wait.Avg / scope.duration, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.InnoDB_IO_r_wait.Sum);
                    } catch (err) {
                        return '0s';
                    }
                }(),
                'percentOfQueryTime': function() {
                    try {
                        var i = metrics.InnoDB_IO_r_wait.Avg / queryTime;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['innodbQueueWait'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.InnoDB_queue_wait.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'avg': function() {
                    try {
                        return $filter('humanize')(metrics.InnoDB_queue_wait.Avg);
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.InnoDB_queue_wait.Sum);
                    } catch (err) {
                        return '0s'
                    }
                }(),
                'percentOfQueryTime': function() {
                    try {
                        var i = metrics.InnoDB_queue_wait.Avg / queryTime;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['innodbReadOps'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.InnoDB_IO_r_ops.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.InnoDB_IO_r_ops.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';

                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.InnoDB_IO_r_ops.Sum, 'number');
                    } catch (err) {
                        return '0';
                    }
                }()
            };

            data['innodbReadBytes'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.InnoDB_IO_r_bytes.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.InnoDB_IO_r_bytes.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'size');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.InnoDB_IO_r_bytes.Sum, 'size');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'avgio': function () {
                    try {
                        return $filter('humanize')(metrics.InnoDB_IO_r_bytes.Sum/metrics.InnoDB_IO_r_ops.Sum, 'size');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };

            data['innodbDistinctPages'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.InnoDB_pages_distinct.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
            }

            data['queryCacheHits'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.QC_Hit.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.QC_Hit.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.QC_Hit.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'percentRation': function() {
                    try {
                        var i = scope.QC_Hit.Avg / cnt;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['rowsSent'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Rows_sent.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Rows_sent.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Rows_sent.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };

            data['bytesSent'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Bytes_sent.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Bytes_sent.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'size');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Bytes_sent.Sum, 'size');
                    } catch (err) {
                        return '0.00B';
                    }
                }(),
                'perRow': function() {
                    try {
                        var i = metrics.Bytes_sent.Sum / metrics.Rows_sent.Sum;
                        return $filter('humanize')(i, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };

            data['rowsExamined'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Rows_examined.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Rows_examined.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Rows_examined.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perRow': function() {
                    try {
                        var i = metrics.Rows_examined.Sum / metrics.Rows_sent.Sum;
                        return $filter('humanize')(i, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };

            data['rowsAffected'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Rows_affected.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Rows_affected.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Rows_affected.Sum, 'size');
                    } catch (err) {
                        return '0.00B';
                    }
                }()
            };

            data['externalSorts'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Filesort.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Filesort.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Filesort.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Filesort.Sum / cnt;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['externalSortsDisk'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Filesort_on_disk.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Filesort_on_disk.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Filesort_on_disk.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Filesort_on_disk.Sum / cnt;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['externalSortPasses'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Merge_passes.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Merge_passes.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Merge_passes.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perExternalSort': function() {
                    try {
                        var i = metrics.Merge_passes.Sum / metrics.Merge_passes.Sum;
                        return $filter('humanize')(i, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };

            data['cartesianProducts'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Full_join.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Full_join.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Full_join.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Full_join.Sum / totalQueries;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['fullTableScans'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Full_scan.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Full_scan.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Full_scan.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Full_scan.Sum / totalQueries;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['queriesRequiringTmpTableInMemory'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Tmp_table.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Tmp_table.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Tmp_table.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Tmp_table.Sum / totalQueries;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['numberTmpTableMemory'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Tmp_tables.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Tmp_tables.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Tmp_tables.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueryWithTmpTable': function() {
                    try {
                        var i = metrics.Tmp_tables.Sum / metrics.Tmp_table.avg;
                        return $filter('humanize')(i, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };

            data['queriesRequiringTmpTableonDisk'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Tmp_table_on_disk.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Tmp_table_on_disk.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Tmp_table_on_disk.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Tmp_table_on_disk.Sum / totalQueries;
                        return $filter('humanize')(i, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };


            data['numberTmpTablesDisk'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Tmp_disk_tables.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Tmp_disk_tables.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Tmp_disk_tables.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueryWithTmpTable': function() {
                    try {
                        var i = metrics.Tmp_disk_tables.Sum / metrics.Tmp_table_on_disk.avg;
                        return $filter('humanize')(i, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };


            data['queriesRequiringTmpTableDisk'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Tmp_table_on_disk.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Tmp_table_on_disk.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Tmp_table_on_disk.Sum, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Tmp_table_on_disk.Sum / totalQueries;
                        return $filter('humanize')(i, 'percent');
                    } catch (err) {
                        return '0.00%';
                    }
                }()
            };

            data['totalSizeTmpTables'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.Tmp_table_sizes.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'perSec': function() {
                    try {
                        var perSec = metrics.Tmp_table_sizes.Sum / scope.duration;
                        return $filter('humanize')(perSec, 'number');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.Tmp_table_sizes.Sum, 'size');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQuery': function() {
                    try {
                        var i = metrics.Tmp_table_sizes.Sum / cnt;
                        return $filter('humanize')(i, 'size');
                    } catch (err) {
                        return '0.00';
                    }
                }()
            };

            if (!$rootScope.isServerSummary) {

                data2['queryCount'] = {
                    'sumPercent': function() {
                        try {
                            var i =  cnt / totalQueries;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['queryTime'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Query_time.Sum / summary.Query_time.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['lockTime'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Lock_time.Sum / summary.Lock_time.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbRowLockWait'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_rec_lock_wait.Sum / summary.InnoDB_rec_lock_wait.Sum ;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbIOReadWait'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_IO_r_wait.Sum / summary.InnoDB_IO_r_wait.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbQueueWait'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_queue_wait.Sum / summary.InnoDB_queue_wait.Sum ;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbReadOps'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_IO_r_ops.Sum / summary.InnoDB_IO_r_ops.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%'
                        }
                    }()
                };

                data2['innodbReadBytes'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_IO_r_bytes.Sum / summary.InnoDB_IO_r_bytes.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['queryCacheHits'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.QC_Hit.Sum / summary.QC_Hit.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['rowsSent'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Rows_sent.Sum / summary.Rows_sent.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['bytesSent'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Bytes_sent.Sum / summary.Bytes_sent.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['rowsExamined'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Rows_examined.Sum / summary.Rows_examined.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['rowsAffected'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Rows_affected.Sum / summary.Rows_affected.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['externalSorts'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Filesort.Sum / summary.Filesort.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['externalSortsDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Filesort_on_disk.Sum / summary.Filesort_on_disk.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['externalSortPasses'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Merge_passes.Sum / summary.Merge_passes.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['cartesianProducts'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Full_join.Sum / summary.Full_join.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['fullTableScans'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Full_scan.Sum / summary.Full_scan.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['queriesRequiringTmpTableonDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table_on_disk.Sum / summary.Tmp_table_on_disk.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['numberTmpTableMemory'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_tables.Sum / summary.Tmp_tables.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['numberTmpTablesDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_disk_tables.Sum / summary.Tmp_disk_tables.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['queriesRequiringTmpTableInMemory'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table.Sum / summary.Tmp_table.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };


                data2['queriesRequiringTmpTableDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table_on_disk.Sum / summary.Tmp_table_on_disk.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['totalSizeTmpTables'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table_sizes.Sum / summary.Tmp_table_sizes.Sum;
                            return $filter('humanize')(i, 'percent');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };
            }

            scope.data = angular.merge(data, data2);
        }


        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'client/templates/metrics.html',
            link: function(scope, element, attrs) {
                scope.$watch('metrics',function(newValue, oldValue) {
                    setMetrics(scope, element, attrs);
                });
            }
        };
    });

})();
