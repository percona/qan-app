(function() {
    'use strict';

    var pplDirectives = angular.module('pplDirectives', []);

    /**
     * @desc top nav menu
     * @example <div topnav></div>
     */
    pplDirectives.directive('topnav',  function topnav() {
        var controller = ['$scope', function ($scope) {
            var now = new Date();
        }];
        return {
            restrict: 'EA',
            templateUrl: '/client/layout/topnav.html',
            link: function(scope, element, attrs) {},
            controller: controller
        };
    });

})();
