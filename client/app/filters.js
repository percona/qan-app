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


        return function(input, name) {
            function parceTime (input) {
                var dur = '';
                var dur_sec = moment.duration(input, 's');
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
            }
            var res = 0;
            switch (true) {
                case name === undefined:
                        res =  parceTime(input);
                        break;
                case name.indexOf('time') > -1 || name.indexOf('wait') > -1:
                        res =  parceTime(input);
                        break;
                case name.indexOf('size') > -1:
                        res =  numeral(input).format('0.0b');
                        break;
                default:
                        res =  numeral(input).format('0.0a');
                        break;
            }
            return res;
        };

    });

    pplFilters.filter('unsafe', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);

})();
