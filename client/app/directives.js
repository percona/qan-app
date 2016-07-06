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
    pplDirectives.directive('loadSparklines',  function ($parse) {
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
                    var width = 200 - margin.left - margin.right;

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

                        focus.select("#focusText")
                            // you may want to format the value here
                            .text((d.Query_time_sum/60).toFixed(2) + ' at ' + moment(d.Start_ts).utc().format('YYYY-MM-DD HH:mm:ss [UTC]'));
                    });

            }
        };
    });

    /**
     * @desc count sparklines
     * @example <count-sparklines></count-sparklines>
     * handling case when it is not enough data to draw chart is in loadSparklines directive
     */
    pplDirectives.directive('countSparklines',  function ($parse) {
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
                    var width = 200 - margin.left - margin.right;

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

                        focus.select("#focusText")
                            // you may want to format the value here
                            .text(d.Query_count + ' at ' + moment(d.Start_ts).utc().format('YYYY-MM-DD HH:mm:ss [UTC]'));
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
                    .domain([0.00001, 1000])
                    .range([15, 90])
                    .clamp(true);

                var min = $filter('humanize')(scope.data.Min);
                var max = $filter('humanize')(scope.data.Max);
                var avg = $filter('humanize')(scope.data.Avg);
                var p95 = $filter('humanize')(scope.data.P95);

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
                    .attr('x1', x(scope.data.Min) + '%')
                    .attr('y1', '13px')
                    .attr('x2', x(scope.data.Max) + '%')
                    .attr('y2', '13px');

                var minMark = g.append('line')
                    .attr('class', 'latency-chart-min')
                    .attr('x1', x(scope.data.Min) + '%')
                    .attr('y1', '13px')
                    .attr('x2', x(scope.data.Min) + '%')
                    .attr('y2', '19px');

                var maxMark = g.append('line')
                    .attr('class', 'latency-chart-max')
                    .attr('x1', x(scope.data.Max) + '%')
                    .attr('y1', '8px')
                    .attr('x2', x(scope.data.Max) + '%')
                    .attr('y2', '13px');

                var avgMark = g.append('circle')
                    .attr('class', 'latency-chart-avg')
                    .attr('r', 3)
                    .attr('cx', x(scope.data.Avg) + '%')
                    .attr('cy', '13px');

                var p95Mark = g.append('circle')
                    .attr('class', 'latency-chart-p95')
                    .attr('r', 2)
                    .attr('cx', x(scope.data.P95) + '%')
                    .attr('cy', '13px');
            }
        };
    }]);


})();
