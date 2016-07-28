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

                // handle case when it is not enough data to draw chart by adding empty data
                // works with parent scope. No need to add this to countSparklines chart
                if (scope.data.length === 1) {
                    scope.data.unshift({
                        'Start_ts': moment(scope.data[0].Start_ts).subtract(1, 'm').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
                        'Query_time_sum': 0,
                        'Query_count': 0
                    });
                }

                if (scope.data.length === 0) {
                    scope.data = [{
                        'Start_ts': moment.utc().subtract(1, 'm').format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
                        'Query_time_sum': 0,
                        'Query_count': 0
                    },
                        {
                            'Start_ts': moment.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
                            'Query_time_sum': 0,
                            'Query_count': 0
                        }];
                }

                var iso = d3.time.format.utc('%Y-%m-%dT%H:%M:%SZ');

                var chart = d3.select(element[0]);
                var svg = chart.append('svg')
                    .attr('class', 'load-sparklines');

                var margin = {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                };

                var height = 15 - margin.top - margin.bottom;
                var width = 150 - margin.left - margin.right;

                var xDomain = d3.extent(scope.data, function(d) {
                    return iso.parse(d.Start_ts);
                })
                var yDomain = d3.extent(scope.data, function(d) {
                    return d.Query_time_sum/60;
                });

                var xScale = d3.time.scale().range([0, width]).domain(xDomain);
                var yScale = d3.scale.linear().range([height, 0]).domain(yDomain);

                var line = d3.svg.line()
                    .x(function(d) {
                        return xScale(iso.parse(d.Start_ts));
                    })
                .y(function(d) {
                    return yScale(d.Query_time_sum/60);
                });

                var area = d3.svg.area()
                    .x(function(d) {
                        return xScale(iso.parse(d.Start_ts));
                    })
                .y0(function(d) {
                    return yScale(d.Query_time_sum/60);
                })
                .y1(height);

                var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

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

                        var bisectDate = d3.bisector(function(d) {
                            return iso.parse(d.Start_ts);
                        }).left;

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
                            var mouseDate = xScale.invert(mouse[0]);
                            var i = bisectDate(scope.data, mouseDate) || 1; // returns the index to the current data item
                            var d0 = scope.data[i-1]
                            var d1 = scope.data[i];
                            // work out which date value is closest to the mouse
                            var d = mouseDate - iso.parse(d0.Start_ts) > iso.parse(d1.Start_ts) - mouseDate ? d1 : d0;

                            var x = xScale(iso.parse(d.Start_ts));
                            var y = yScale(d.Query_time_sum/60);

                            var MIN = 0,
                            MAX = 1;
                            focus.select('#focusCircle')
                                .attr('cx', x)
                                .attr('cy', y);
                            focus.select('#focusLineX')
                                .attr('x1', x).attr('y1', yScale(yDomain[MIN]))
                                .attr('x2', x).attr('y2', yScale(yDomain[MAX]));

                            var load = d.Query_time_sum/60;
                            $rootScope.popover = $filter('humanize')(load, 'number') + ' at ' + moment(d.Start_ts).utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
                            $rootScope.$apply();
                            //focus.select("#focusText")
                            //    .text($filter('humanize')(load, 'number') + ' at ' + moment(d.Start_ts).utc().format('YYYY-MM-DD HH:mm:ss [UTC]'));
                        });

            }
        };
    });

    /**
     * @desc count sparklines
     * @example <count-sparklines></count-sparklines>
     * handling case when it is not enough data to draw chart is in loadSparklines directive
     */
    pplDirectives.directive('countSparklines',  function ($parse, $filter, $rootScope) {
        return {
            restrict: 'E',
            replace: false,
            scope: {data: '=chartData'},
            link: function(scope, element, attrs) {


                var iso = d3.time.format.utc('%Y-%m-%dT%H:%M:%SZ');

                var chart = d3.select(element[0]);
                var svg = chart.append('svg')
                    .attr('class', 'load-sparklines');

                var margin = {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                };

                var height = 15 - margin.top - margin.bottom;
                var width = 150 - margin.left - margin.right;

                var xDomain = d3.extent(scope.data, function(d) {
                    return iso.parse(d.Start_ts);
                })
                var yDomain = d3.extent(scope.data, function(d) {
                    return d.Query_count;
                });

                var xScale = d3.time.scale().range([0, width]).domain(xDomain);
                var yScale = d3.scale.linear().range([height, 0]).domain(yDomain);

                var line = d3.svg.line()
                    .x(function(d) {
                        return xScale(iso.parse(d.Start_ts));
                    })
                .y(function(d) {
                    return yScale(d.Query_count);
                });

                var area = d3.svg.area()
                    .x(function(d) {
                        return xScale(iso.parse(d.Start_ts));
                    })
                .y0(function(d) {
                    return yScale(d.Query_count);
                })
                .y1(height);

                var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

                        g.append('path')
                        .datum(scope.data)
                        .attr('class', 'area')
                        .attr('d', area);


                        g.append('path')
                        .datum(scope.data)
                        .attr('class', 'line')
                        .attr('d', line);

                        // focus tracking
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

                        var bisectDate = d3.bisector(function(d) {
                            return iso.parse(d.Start_ts);
                        }).left;

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
                            var mouseDate = xScale.invert(mouse[0]);
                            var i = bisectDate(scope.data, mouseDate) || 1; // returns the index to the current data item
                            var d0 = scope.data[i-1]
                            var d1 = scope.data[i];
                            // work out which date value is closest to the mouse
                            var d = mouseDate - iso.parse(d0.Start_ts) > iso.parse(d1.Start_ts) - mouseDate ? d1 : d0;

                            var x = xScale(iso.parse(d.Start_ts));
                            var y = yScale(d.Query_count);

                            var MIN = 0,
                            MAX = 1;
                            focus.select('#focusCircle')
                                .attr('cx', x)
                                .attr('cy', y);
                            focus.select('#focusLineX')
                                .attr('x1', x).attr('y1', yScale(yDomain[MIN]))
                                .attr('x2', x).attr('y2', yScale(yDomain[MAX]));

                            $rootScope.popover = $filter('humanize')(d.Query_count, 'number') + ' at ' + moment(d.Start_ts).utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
                            $rootScope.$apply();

                            // focus.select("#focusText")
                            //     .text($filter('humanize')(d.Query_count, 'number') + ' at ' + moment(d.Start_ts).utc().format('YYYY-MM-DD HH:mm:ss [UTC]'));
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
                    .attr('class', 'latency-chart');

                var x = d3.scale.log()
                    .domain([0.00001, 10000])
                    .range([2, 98])
                    .clamp(true);
                if (scope.data === undefined) {
                    return;
                }

                var min = scope.data.hasOwnProperty('Min') ? scope.data.Min : 0;
                var max = scope.data.hasOwnProperty('Max') ? scope.data.Max : 0;
                var avg = scope.data.hasOwnProperty('Avg') ? scope.data.Avg : 0;
                var p95 = scope.data.hasOwnProperty('P95') ? scope.data.P95 : 0;

                min = min ? min : 0.00001;
                max = max ? max : 0.00001;
                avg = avg ? avg : 0.00001;
                p95 = p95 ? p95 : 0.00001;

                var g = svg.append('g');

                var hrAxes = g.append('line')
                    .attr('class', 'latency-chart-x')
                    .attr('x1', '0%')
                    .attr('stroke-dasharray', '1, 1')
                    .attr('y1', '13px')
                    .attr('x2', '100%')
                    .attr('y2', '13px');

                var hrLine = g.append('line')
                    .attr('class', 'latency-chart-line')
                    .attr('x1', x(min) + '%')
                    .attr('y1', '13px')
                    .attr('x2', x(max) + '%')
                    .attr('y2', '13px');

                var minMark = g.append('line')
                    .attr('class', 'latency-chart-min')
                    .attr('x1', x(min) + '%')
                    .attr('y1', '13px')
                    .attr('x2', x(min) + '%')
                    .attr('y2', '19px');

                var maxMark = g.append('line')
                    .attr('class', 'latency-chart-max')
                    .attr('x1', x(max) + '%')
                    .attr('y1', '8px')
                    .attr('x2', x(max) + '%')
                    .attr('y2', '13px');

                var avgMark = g.append('circle')
                    .attr('class', 'latency-chart-avg')
                    .attr('r', 3)
                    .attr('cx', x(avg) + '%')
                    .attr('cy', '13px');

                var p95Mark = g.append('circle')
                    .attr('class', 'latency-chart-p95')
                    .attr('r', 2)
                    .attr('cx', x(p95) + '%')
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

                scope.cnt = numeral(cnt).format('0a');
                scope.qps = maybeLessHundredth(qps) || numeral(qps).format('0.00');
                scope.percentage = maybeLessHundredth(percentage) || numeral(percentage).format('0.00');
                scope.load = maybeLessHundredth(load) || numeral(load).format('0.00');

            } else {
                var metrics = scope.metrics;
                var load = $rootScope.selectedQuery.Load;
                var percentage = $rootScope.selectedQuery.Percentage;
                var qps = $rootScope.selectedQuery.QPS;
                var queryTime = scope.metrics.Query_time.Avg;
                var cnt = scope.metrics.Query_time.Cnt;

                scope.cnt = numeral(cnt).format('0a');
                scope.qps = maybeLessHundredth(qps) || numeral(qps).format('0.00');
                scope.percentage = maybeLessHundredth(percentage) || numeral(percentage).format('0.00');
                scope.load = maybeLessHundredth(load) || numeral(load).format('0.00');
            }




            data['queryCount'] = {
                'perSec': function() {
                    var perSec =  cnt / totalTime;
                    return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                }(),
                'sum': function() {
                    return numeral(cnt).format('0a');
                }()
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
                    var avgLoad = metrics.Lock_time.Avg / totalTime;
                    return maybeLessHundredth(avgLoad) ||  numeral(avgLoad).format('0.00%')
                }(),
                'avg': $filter('humanize')(metrics.Lock_time.Avg),
                'stats': metrics.Lock_time,
                'sum': $filter('humanize')(metrics.Lock_time.Sum),
                'percentOfQueryTime': function() {
                    var i = metrics.Lock_time.Avg / queryTime;
                    return maybeLessHundredth(i, '%') || numeral(i).format('0.00%')
                }()
            };


            data['innodbRowLockWait'] = {
                'show': function () {
                    try {
                        return Boolean(metrics.InnoDB_rec_lock_wait.Max);
                    } catch (err) {
                        return false;
                    }
                }(),
                'avg': function() {
                    try {
                        var avg =  metrics.InnoDB_rec_lock_wait.Avg;
                        return maybeLessHundredth(avg) || numeral(avg).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return $filter('humanize')(metrics.InnoDB_rec_lock_wait.Sum);
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'percentOfQueryTime': function() {
                    try {
                        var i = metrics.InnoDB_rec_lock_wait.Avg / queryTime;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var avg =  metrics.InnoDB_IO_r_wait.Avg;
                        return maybeLessHundredth(avg) || numeral(avg).format('0.00');
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
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var avg =  metrics.InnoDB_queue_wait.Avg;
                        return maybeLessHundredth(avg) || numeral(avg).format('0.00');
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
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var perSec = metrics.InnoDB_IO_r_ops.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';

                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.InnoDB_IO_r_ops.Sum).format('0a');
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
                        var perSec = metrics.InnoDB_IO_r_bytes.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.InnoDB_IO_r_bytes.Sum).format('0.00b');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'avg': function () {
                    try {
                        return numeral(metrics.InnoDB_IO_r_bytes.Avg).format('0.00b');
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
                        var perSec = metrics.QC_Hit.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.QC_Hit.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'percentRation': function() {
                    try {
                        var i = scope.QC_Hit.Avg / cnt;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%')
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
                        var perSec = metrics.Rows_sent.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Rows_sent.Sum).format('0.00a');
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
                        var perSec = metrics.Bytes_sent.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Bytes_sent.Sum).format('0.00b');
                    } catch (err) {
                        return '0.00B';
                    }
                }(),
                'perRow': function() {
                    try {
                        var i = metrics.Bytes_sent.Sum / summary.Rows_sent.Sum;
                        return maybeLessHundredth(i) || numeral(i).format('0.00');
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
                        var perSec = metrics.Rows_examined.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Rows_examined.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perRow': function() {
                    try {
                        var i = metrics.Rows_examined.Sum / summary.Rows_sent.Sum;
                        return maybeLessHundredth(i) || numeral(i).format('0.00a');
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
                        var perSec = metrics.Rows_affected.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Rows_affected.Sum).format('0.00b');
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
                        var perSec = metrics.Filesort.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Filesort.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Filesort.Sum / cnt;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var perSec = metrics.Filesort_on_disk.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Filesort_on_disk.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Filesort_on_disk.Sum / cnt;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var perSec = metrics.Merge_passes.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Merge_passes.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perExternalSort': function() {
                    try {
                        var i = metrics.Merge_passes.Sum / metrics.Merge_passes.Sum;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00a');
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
                        var perSec = metrics.Full_join.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Full_join.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Full_join.Sum / totalQueries;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var perSec = metrics.Full_scan.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Full_scan.Sum).format('0.00a')
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Full_scan.Sum / totalQueries;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var perSec = metrics.Tmp_table.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Tmp_table.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Tmp_table.Sum / totalQueries;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var perSec = metrics.Tmp_tables.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Tmp_tables.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueryWithTmpTable': function() {
                    try {
                        var i = metrics.Tmp_tables.Sum / metrics.Tmp_table.avg;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00a');
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
                        var perSec = metrics.Tmp_table_on_disk.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Tmp_table_on_disk.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Tmp_table_on_disk.Sum / totalQueries;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00a');
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
                        var perSec = metrics.Tmp_disk_tables.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Tmp_disk_tables.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueryWithTmpTable': function() {
                    try {
                        var i = metrics.Tmp_disk_tables.Sum / metrics.Tmp_table_on_disk.avg;
                        return maybeLessHundredth(i) || numeral(i).format('0.00a');
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
                        var perSec = metrics.Tmp_table_on_disk.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Tmp_table_on_disk.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQueries': function() {
                    try {
                        var i = metrics.Tmp_table_on_disk.Sum / totalQueries;
                        return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
                        var perSec = metrics.Tmp_table_sizes.Avg / totalTime;
                        return maybeLessHundredth(perSec) || numeral(perSec).format('0.00');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'sum': function () {
                    try {
                        return numeral(metrics.Tmp_table_sizes.Sum).format('0.00a');
                    } catch (err) {
                        return '0.00';
                    }
                }(),
                'perQuery': function() {
                    try {
                        var i = metrics.Tmp_table_sizes.Sum / cnt;
                        return maybeLessHundredth(i) || numeral(i).format('0.00a');
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
                            return maybeLessHundredth(i) || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['lockTime'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Lock_time.Avg / totalTime;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%')
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbRowLockWait'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_rec_lock_wait.Avg / totalTime;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbIOReadWait'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_IO_r_wait.Avg / totalTime;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbQueueWait'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_queue_wait.Avg / totalTime;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%')
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['innodbReadOps'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_IO_r_ops.Sum / summary.InnoDB_IO_r_ops.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%')
                        } catch (err) {
                            return '0.00%'
                        }
                    }()
                };

                data2['innodbReadBytes'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.InnoDB_IO_r_bytes.Avg / summary.InnoDB_IO_r_bytes.Avg;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['queryCacheHits'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.QC_Hit.Avg / summary.QC_Hit.Avg;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['rowsSent'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Rows_sent.Sum / summary.Rows_sent.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['bytesSent'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Bytes_sent.Sum / summary.Bytes_sent.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['rowsExamined'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Rows_examined.Sum / summary.Rows_examined.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['rowsAffected'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Rows_affected.Sum / summary.Rows_affected.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['externalSorts'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Filesort.Sum / summary.Filesort.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['externalSortsDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Filesort_on_disk.Sum / summary.Filesort_on_disk.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['externalSortPasses'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Merge_passes.Sum / summary.Merge_passes.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['cartesianProducts'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Full_join.Sum / summary.Full_join.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['fullTableScans'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Full_scan.Sum / summary.Full_scan.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['queriesRequiringTmpTableonDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table_on_disk.Sum / summary.Tmp_table_on_disk.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['numberTmpTableMemory'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_tables.Sum / summary.Tmp_tables.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['numberTmpTablesDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_disk_tables.Sum / summary.Tmp_disk_tables.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['queriesRequiringTmpTableInMemory'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table.Sum / summary.Tmp_table.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };


                data2['queriesRequiringTmpTableDisk'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table_on_disk.Sum / summary.Tmp_table_on_disk.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
                        } catch (err) {
                            return '0.00%';
                        }
                    }()
                };

                data2['totalSizeTmpTables'] = {
                    'percentOfTotal': function() {
                        try {
                            var i = metrics.Tmp_table_sizes.Sum / summary.Tmp_table_sizes.Sum;
                            return maybeLessHundredth(i, '%') || numeral(i).format('0.00%');
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
