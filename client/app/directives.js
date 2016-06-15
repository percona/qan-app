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
     * @desc load bar chart
     * @example <load-bar></load-bar>
     */
    pplDirectives.directive('loadBar',  function ($parse) {
        return {
            restrict: 'E',
            // this is important,
            // we don't want to overwrite our directive declaration
            // in the HTML mark-up
            replace: false,
            scope: {data: '=chartData'},
            link: function(scope, element, attrs) {
                var chart = d3.select(element[0]);
                chart.append('div')
                    .attr('class', 'chart')
                    .style('width', function() {return '100%'})
                    .selectAll('div')
                    .data(scope.data)
                    .enter()
                    .append('div')
                    .transition().ease('elastic')
                    .style('width', function(d) { return d.gtt + '%'; })
                    .text(function(d) {
                         var text = d.load < 0.01 ? '<0.01' : d.load;
                         text += ' (' + d.gtt + '%)';
                         return text;
                    });
            }
        };
    });

    /**
     * @desc count bar chart
     * @example <count-bar></count-bar>
     */
    pplDirectives.directive('countBar',  function ($parse) {
        return {
            restrict: 'E',
            replace: false,
            scope: {data: '=chartData'},
            link: function(scope, element, attrs) {
                var chart = d3.select(element[0]);
                chart.append('div')
                    .attr('class', 'chart')
                    .style('width', function() {return '100%'})
                    .selectAll('div')
                    .data(scope.data)
                    .enter()
                    .append('div')
                    .transition().ease('elastic')
                    .style('width', function(d) { return d.percentage + '%'; })
                    .text(function(d) {
                         var text = d.qps < 0.01 ? '<0.01' : d.qps;
                         text += ' (' + d.percentage + '%)';
                         return text;
                    });
            }
        };
    });

    /**
     * @desc latency box chart
     * @example <latency-box></latency-box>
     */
    pplDirectives.directive('latencyBox', function ($parse) {
        return {
            restrict: 'E',
            replace: false,
            scope: {data: '=chartData'},
            link: function(scope, element, attrs) {
                var chart = d3.select(element[0]);
                var svgContainer = chart.append('svg')
                    .attr('class', 'latency-box')
                    .attr("tooltip-append-to-body", true)
                    .attr("tooltip", function(d){
                        return 'Hello World!' + (scope.data.row === null ? 'bebe' : scope.data.row.Max);
                    })
                    .append('g');

                var maxX = function () {
                    if (scope.data.row === null) {
                        return '100%';
                    } else {
                        return (scope.data.row.Max / scope.data.total.Max * 100).toFixed(0) + '%';
                    }
                }();

                var posX = function(metricName) {
                    if(scope.data.row === null) {
                        return (scope.data.total[metricName] / scope.data.total.Max * 100).toFixed(0) + '%';
                    } else {
                        return (scope.data.row[metricName] / scope.data.total.Max * 100).toFixed(0) + '%' ;
                    }
                };

                var minX = posX('Min');

                // Draw the lines
                var hrLine = svgContainer.append("line")
                    .attr('class', 'latency-box-line')
                    .attr('x1', '0%')
                    .attr('y1', '9px')
                    .attr('x2', '100%')
                    .attr('y2', '9px');

                var hrLine = svgContainer.append("line")
                    .attr('class', 'latency-box-values')
                    .attr('x1', minX)
                    .attr('y1', '9px')
                    .attr('x2', maxX)
                    .attr('y2', '9px');

                var minLine = svgContainer.append("line")
                    .attr('class', 'latency-box-min')
                    .attr('x1', minX)
                    .attr('y1', '2px')
                    .attr('x2', minX)
                    .attr('y2', '15px');

                var maxLine = svgContainer.append("line")
                    .attr('class', 'latency-box-max')
                    .attr('x1', maxX)
                    .attr('y1', '2px')
                    .attr('x2', maxX)
                    .attr('y2', '15px');

                var avgX = posX('Avg');
                var avgLine = svgContainer.append("line")
                    .attr('class', 'latency-box-avg')
                    .attr('x1', avgX)
                    .attr('y1', '2px')
                    .attr('x2', avgX)
                    .attr('y2', '15px')
                    .attr('stroke-dasharray',  '1,1');

                var medX = posX('Med');
                var medLine = svgContainer.append("line")
                    .attr('class', 'latency-box-med')
                    .attr('x1', medX)
                    .attr('y1', '2px')
                    .attr('x2', medX)
                    .attr('y2', '15px')

                var p95X = posX('P95');
                var p95Line = svgContainer.append("line")
                    .attr('class', 'latency-box-p95')
                    .attr('x1', p95X)
                    .attr('y1', '2px')
                    .attr('x2', p95X)
                    .attr('y2', '15px');
            }
        };
    });

})();
