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
    pplFilters.filter('humanize',  function() {

        return function(input) {
            var dur = '';
            var dur_sec = moment.duration(input, 's');
            switch (true) {
                case dur_sec.as('d') > 1:
                    dur =  dur_sec.as('d').toFixed(2) + 'day';
                    break;
                case dur_sec.as('h') > 1:
                    dur =  dur_sec.as('h').toFixed(2) + 'h';
                    break;
                case dur_sec.as('m') > 1:
                    dur =  dur_sec.as('m').toFixed(2) + 'min';
                    break;
                case dur_sec.as('s') > 1:
                    dur =  dur_sec.as('s').toFixed(2) + 's';
                    break;
                default:
                    dur =  dur_sec.as('ms').toFixed(2) + 'ms';
                    break;
            }
            return dur;
        };

    });

})();
