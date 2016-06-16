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
                        return d.Query_time_sum;
                    });

                    var xScale = d3.time.scale().range([0, width]).domain(xDomain);
                    var xScale2 = d3.time.scale().range([0, 1]).domain(xDomain);
                    var yScale = d3.scale.linear().range([height, 0]).domain(yDomain);

                    var line = d3.svg.line()
                        .x(function(d) {
                            return xScale(iso.parse(d.Start_ts));
                        })
                        .y(function(d) {
                            return yScale(d.Query_time_sum);
                    });

                    var area = d3.svg.area()
                        .x(function(d) {
                            return xScale(iso.parse(d.Start_ts));
                        })
                        .y0(function(d) {
                            return yScale(d.Query_time_sum);
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
                    // TODO: cleanup

                    var focus = g.append('g').style('display', 'none');

                    focus.append('line')
                        .attr('id', 'focusLineX')
                        .attr('class', 'focusLine');

                    /*
                    focus.append('line')
                        .attr('id', 'focusLineY')
                        .attr('class', 'focusLine');
                    */

                    focus.append('circle')
                        .attr('id', 'focusCircle')
                        .attr('r', 1)
                        .attr('class', 'circle focusCircle');

                    /*
                    focus.append("text")
                        .attr('id', 'focusTexty')
                        .attr("x", 9)
                        .attr("dy", ".1em");
                    focus.append("text")
                        .attr('id', 'focusTextx')
                        .attr("x", 40)
                        .attr("dy", ".1em");
                    */

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
                        var y = yScale(d.Query_time_sum);

                        var MIN = 0,
                        MAX = 1;
                        focus.select('#focusCircle')
                            .attr('cx', x)
                            .attr('cy', y);
                        focus.select('#focusLineX')
                            .attr('x1', x).attr('y1', yScale(yDomain[MIN]))
                            .attr('x2', x).attr('y2', yScale(yDomain[MAX]));
                        /*
                        focus.select('#focusLineY')
                            .attr('x1', xScale(xDomain[MIN])).attr('y1', y)
                            .attr('x2', xScale(xDomain[MAX])).attr('y2', y);
                        focus.select("#focusTexty")
                            .attr("transform", "translate(" + xScale(xDomain[MIN]) + "," + (y + 3) + ")")
                            // you may want to format the value here
                            .text(d.Query_time_sum);
                        x = x - focus.select("#focusTextx").node().getComputedTextLength() * xScale2(iso.parse(d.Start_ts));
                        focus.select("#focusTextx")
                            .attr("transform", "translate(" + x + "," + (yScale(yDomain[MAX]) + 3) + ")")
                            // you may want to format the value here
                            .text(iso.parse(d.Start_ts));
                            */
                    });

            }
        };
    });

    /**
     * @desc count sparklines
     * @example <count-sparklines></count-sparklines>
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
                    var xScale2 = d3.time.scale().range([0, 1]).domain(xDomain);
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

                    /*
                    focus.append('line')
                        .attr('id', 'focusLineY')
                        .attr('class', 'focusLine');
                    */

                    focus.append('circle')
                        .attr('id', 'focusCircle')
                        .attr('r', 1)
                        .attr('class', 'circle focusCircle');

                    /*
                    focus.append("text")
                        .attr('id', 'focusTexty')
                        .attr("x", 9)
                        .attr("dy", ".1em");
                    focus.append("text")
                        .attr('id', 'focusTextx')
                        .attr("x", 40)
                        .attr("dy", ".1em");
                    */

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
                        /*
                        focus.select('#focusLineY')
                            .attr('x1', xScale(xDomain[MIN])).attr('y1', y)
                            .attr('x2', xScale(xDomain[MAX])).attr('y2', y);
                        focus.select("#focusTexty")
                            .attr("transform", "translate(" + xScale(xDomain[MIN]) + "," + (y + 3) + ")")
                            // you may want to format the value here
                            .text(d.Query_count);
                        x = x - focus.select("#focusTextx").node().getComputedTextLength() * xScale2(iso.parse(d.Start_ts));
                        focus.select("#focusTextx")
                            .attr("transform", "translate(" + x + "," + (yScale(yDomain[MAX]) + 3) + ")")
                            // you may want to format the value here
                            .text(iso.parse(d.Start_ts));
                            */
                    });

            }
        };
    });



})();
