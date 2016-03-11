(function() {
    'use strict';

    var pplFilters = angular.module('pplFilters', []);

    /**
     * @desc basic format mysql
     * @example <div>{{ sql | reformat }}</div>
     */
    pplFilters.filter('sqlReformat',  function() {

        return function(input) {
            return vkbeautify.sql(input);
        };

    });

    /**
     * @desc humanize time duration
     * @example <div>{{ duration | humanize }}</div>
     */
    pplFilters.filter('humanize', function() {

        return function(input) {
            var dur = '';
            var dur_sec = moment.duration(input, 's');
            console.log('dur', dur_sec);
            switch (true) {
                case input === 0:
                    dur = 0;
                    break;
                case dur_sec.as('s') > 1:
                    dur =  dur_sec.as('s').toFixed(2) + 's';
                    break;
                case dur_sec.as('ms') < 1:
                    dur =  (dur_sec.as('ms') * 1000).toFixed(2) + '\µ';
                    break;
                default:
                    dur =  dur_sec.as('ms').toFixed(2) + 'ms';
                    break;
            }
            return dur;
        };

    });

    pplFilters.filter('unsafe', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);

})();
