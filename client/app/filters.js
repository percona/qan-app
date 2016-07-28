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


        return function(input, name, duration) {

            var timeCols = [
                'start_ts', 'End_ts', 'Query_time',
                'Lock_time',
                'InnoDB_IO_r_bytes',
                'InnoDB_IO_r_wait',
                'InnoDB_rec_lock_wait',
                'InnoDB_queue_wait',
            ];
            var sizeCols = [
                'Query_length',
                'Bytes_sent',
                'Tmp_tables',
                'Tmp_disk_tables',
                'Tmp_table_sizes',
            ];

            var countCols = [
                'query_count', 'lrq_count',
                'Rows_sent',
                'Rows_examined',
                'Rows_affected',
                'Rows_read',
                'Merge_passes',
                'InnoDB_IO_r_ops',
                'InnoDB_pages_distinct',
                'QC_Hit', 'Full_scan',
                'Full_join',
                'Tmp_table',
                'Tmp_table_on_disk',
                'Filesort', 'Filesort_on_disk', 'Errors',
                'Warnings', 'Select_full_range_join',
                'Select_range', 'Select_range_check', 'Sort_range',
                'Sort_rows', 'Sort_scan', 'No_index_used',
                'No_good_index_used'
            ];

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
                        dur =  (dur_sec.as('ms') * 1000).toFixed(2) + '\µs';
                        break;
                    default:
                        dur =  dur_sec.as('ms').toFixed(2) + 'ms';
                        break;
                }
                return dur;
            }
            var res = 0;
            var n = 0;
            switch (true) {
                // top 10 queries no name parameters
                case name === undefined:
                    res =  parceTime(input);
                    break;
                    // time
                case name.indexOf('time') > -1 || name in timeCols:
                    if (duration === undefined) {
                        res = input > 0.00001 ? '' : '<';
                        res += parceTime(input);
                    } else {
                        n = input/duration;
                        res = n > 0.0001 ? '' : '<';
                        res += numeral(n).format('0.00%');
                    }
                    break;
                    // size
                case name.indexOf('size') > -1 || name in sizeCols:
                    if (duration === undefined) {
                        res = input > 0.01 ? '' : '<';
                        res += numeral(input).format('0.00b');
                    } else {
                        n = input/duration;
                        if (n > 0.01) {
                            res += numeral(n).format('0.00b');
                        } else {
                            res += '<0.00b/sec';
                        }
                    }
                    break;
                    // ops
                case name.indexOf('number') > -1 || name in countCols:
                    if (duration === undefined) {
                        res = input > 0.01 ? '' : '<';
                        res += numeral(input).format('0.00a');
                    } else {
                        n = input/duration;
                        res = n > 0.01 ? '' : '<';
                        res += numeral(n).format('0.00a');
                    }
                    break;
                    // ops
                default:
                    if (duration === undefined) {
                        res = input > 0.01 ? '' : '<';
                        res += numeral(input).format('0.00a');
                    } else {
                        n = input/duration;
                        res = n > 0.01 ? '' : '<';
                        res += numeral(n).format('0.00a');
                    }
                    break;
            }
            return String(res).replace('<0.00', '<0.01');
        };

    });

    pplFilters.filter('unsafe', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);

})();
