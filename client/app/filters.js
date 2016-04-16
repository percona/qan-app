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
           var timeCols = [
               'start_ts', 'End_ts', 'Query_time_sum',
               'Query_time_min', 'Query_time_max', 'Query_time_avg',
               'Query_time_p95', 'Query_time_stddev', 'Query_time_med',
               'Lock_time_sum', 'Lock_time_min', 'Lock_time_max',
               'Lock_time_avg', 'Lock_time_p95', 'Lock_time_stddev',
               'Lock_time_med', 'InnoDB_IO_r_bytes_sum',
               'InnoDB_IO_r_bytes_min', 'InnoDB_IO_r_bytes_max',
               'InnoDB_IO_r_bytes_avg', 'InnoDB_IO_r_bytes_p95',
               'InnoDB_IO_r_bytes_stddev', 'InnoDB_IO_r_bytes_med',
               'InnoDB_IO_r_wait_sum', 'InnoDB_IO_r_wait_min',
               'InnoDB_IO_r_wait_max', 'InnoDB_IO_r_wait_avg',
               'InnoDB_IO_r_wait_p95', 'InnoDB_IO_r_wait_stddev',
               'InnoDB_IO_r_wait_med', 'InnoDB_rec_lock_wait_sum',
               'InnoDB_rec_lock_wait_min', 'InnoDB_rec_lock_wait_max',
               'InnoDB_rec_lock_wait_avg', 'InnoDB_rec_lock_wait_p95',
               'InnoDB_rec_lock_wait_stddev', 'InnoDB_rec_lock_wait_med',
               'InnoDB_queue_wait_sum', 'InnoDB_queue_wait_min',
               'InnoDB_queue_wait_max', 'InnoDB_queue_wait_avg',
               'InnoDB_queue_wait_p95', 'InnoDB_queue_wait_stddev',
               'InnoDB_queue_wait_med'
           ];
           var sizeCols = [
               'Query_length_sum', 'Query_length_min',
               'Query_length_max', 'Query_length_avg', 'Query_length_p95',
               'Query_length_stddev', 'Query_length_med', 'Bytes_sent_sum',
               'Bytes_sent_min', 'Bytes_sent_max', 'Bytes_sent_avg',
               'Bytes_sent_p95', 'Bytes_sent_stddev', 'Bytes_sent_med',
               'Tmp_tables_sum', 'Tmp_tables_min', 'Tmp_tables_max',
               'Tmp_tables_avg', 'Tmp_tables_p95', 'Tmp_tables_stddev',
               'Tmp_tables_med', 'Tmp_disk_tables_sum', 'Tmp_disk_tables_min',
               'Tmp_disk_tables_max', 'Tmp_disk_tables_avg',
               'Tmp_disk_tables_p95', 'Tmp_disk_tables_stddev',
               'Tmp_disk_tables_med', 'Tmp_table_sizes_sum',
               'Tmp_table_sizes_min', 'Tmp_table_sizes_max',
               'Tmp_table_sizes_avg', 'Tmp_table_sizes_p95',
               'Tmp_table_sizes_stddev', 'Tmp_table_sizes_med'
           ];

           var countCols = [
               'query_count', 'lrq_count', 'Rows_sent_sum', 'Rows_sent_min',
               'Rows_sent_max', 'Rows_sent_avg', 'Rows_sent_p95',
               'Rows_sent_stddev', 'Rows_sent_med', 'Rows_examined_sum',
               'Rows_examined_min', 'Rows_examined_max', 'Rows_examined_avg',
               'Rows_examined_p95', 'Rows_examined_stddev',
               'Rows_examined_med', 'Rows_affected_sum', 'Rows_affected_min',
               'Rows_affected_max', 'Rows_affected_avg', 'Rows_affected_p95',
               'Rows_affected_stddev', 'Rows_affected_med', 'Rows_read_sum',
               'Rows_read_min', 'Rows_read_max', 'Rows_read_avg',
               'Rows_read_p95', 'Rows_read_stddev', 'Rows_read_med',
               'Merge_passes_sum', 'Merge_passes_min', 'Merge_passes_max',
               'Merge_passes_avg', 'Merge_passes_p95', 'Merge_passes_stddev',
               'Merge_passes_med', 'InnoDB_IO_r_ops_sum',
               'InnoDB_IO_r_ops_min', 'InnoDB_IO_r_ops_max',
               'InnoDB_IO_r_ops_avg', 'InnoDB_IO_r_ops_p95',
               'InnoDB_IO_r_ops_stddev', 'InnoDB_IO_r_ops_med',
               'InnoDB_pages_distinct_sum', 'InnoDB_pages_distinct_min',
               'InnoDB_pages_distinct_max', 'InnoDB_pages_distinct_avg',
               'InnoDB_pages_distinct_p95', 'InnoDB_pages_distinct_stddev',
               'InnoDB_pages_distinct_med', 'QC_Hit_sum', 'Full_scan_sum',
               'Full_join_sum', 'Tmp_table_sum', 'Tmp_table_on_disk_sum',
               'Filesort_sum', 'Filesort_on_disk_sum', 'Errors_sum',
               'Warnings_sum', 'Select_full_range_join_sum',
               'Select_range_sum', 'Select_range_check_sum', 'Sort_range_sum',
               'Sort_rows_sum', 'Sort_scan_sum', 'No_index_used_sum',
               'No_good_index_used_sum'
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
            switch (true) {
                case name === undefined:
                        res =  parceTime(input);
                        break;
                case name.indexOf('time') > -1 || name in timeCols:
                        res =  parceTime(input);
                        break;
                case name.indexOf('size') > -1 || name in sizeCols:
                        res =  numeral(input).format('0.0b');
                        break;
                case name in countCols:
                        res =  numeral(input).format('0.0a');
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
