export const metricCatalogue = {
  bytes_sent: {
    humanizeName: 'Bytes Sent',
    tooltipText: 'The number of bytes sent to all clients',
    simpleName: 'bytes_sent',
    pipeTypes: {
      ratePipe: 'size',
      sumPipe: 'size',
      subSumPipe: 'percent',
      sparklineType: 'size',
      perQueryStatsPipe: 'size'
    }
  },
  blk_read_time: {
    humanizeName: 'Reading Blocks Time',
    tooltipText: 'Total time the statement spent reading blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)',
    simpleName: 'blk_read_time',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time'
    }
  },
  blk_write_time: {
    humanizeName: 'Writing Blocks Time',
    tooltipText: 'Total time the statement spent writing blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)',
    simpleName: 'blk_write_time',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time'
    }
  },
  local_blks_dirtied: {
    humanizeName: 'Local Blocks Dirtied',
    tooltipText: 'Total number of local blocks dirtied by the statement',
    simpleName: 'local_blks_dirtied',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  local_blks_hit: {
    humanizeName: 'Local Block Cache Hits',
    tooltipText: 'Total number of local block cache hits by the statement',
    simpleName: 'local_blks_hit',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  local_blks_read: {
    humanizeName: 'Local Blocks Read',
    tooltipText: 'Total number of local blocks read by the statement',
    simpleName: 'local_blks_read',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  local_blks_written: {
    humanizeName: 'Local Blocks Written',
    tooltipText: 'Total number of local blocks written by the statement',
    simpleName: 'local_blks_written',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  shared_blks_dirtied: {
    humanizeName: 'Query Count',
    tooltipText: 'Count',
    simpleName: 'shared_blks_dirtied',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  shared_blks_hit: {
    humanizeName: 'Shared Block Cache Hits',
    tooltipText: 'Total number of shared block cache hits by the statement',
    simpleName: 'shared_blks_hit',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  shared_blks_read: {
    humanizeName: 'Shared Blocks Read',
    tooltipText: 'Total number of shared blocks read by the statement\n',
    simpleName: 'shared_blks_read',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  shared_blks_written: {
    humanizeName: 'Shared Blocks Written',
    tooltipText: 'Total number of shared blocks written by the statement',
    simpleName: 'shared_blks_written',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  temp_blks_read: {
    humanizeName: 'Query Count',
    tooltipText: 'Count',
    simpleName: 'temp_blks_read',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  temp_blks_written: {
    humanizeName: 'Query Count',
    tooltipText: 'Count',
    simpleName: 'temp_blks_written',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  dbid: {
    humanizeName: 'Query Count',
    tooltipText: 'Count',
    simpleName: 'dbid',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  queryid: {
    humanizeName: 'Query ID',
    tooltipText: 'Internal hash code, computed from the statement\'s parse tree',
    simpleName: 'queryid',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  query: {
    humanizeName: 'Query',
    tooltipText: 'Text of a representative statement',
    simpleName: 'query',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  total_time: {
    humanizeName: 'Total time',
    tooltipText: 'Total time spent in the statement, in milliseconds',
    simpleName: 'total_time',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  rows: {
    humanizeName: 'Rows',
    tooltipText: 'Total number of rows retrieved or affected by the statement',
    simpleName: 'rows',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  calls: {
    humanizeName: 'Calls',
    tooltipText: 'Number of times executed',
    simpleName: 'calls',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  num_queries: {
    humanizeName: 'Query Count',
    tooltipText: 'Count',
    simpleName: 'num_queries',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  count: {
    humanizeName: 'Query Count',
    tooltipText: 'Count',
    simpleName: 'count',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  num_queries_with_errors: {
    humanizeName: 'Query Count with errors',
    tooltipText: 'Query Count with errors',
    simpleName: 'num_queries_with_errors',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  num_queries_with_warnings: {
    humanizeName: 'Query Count with warnings',
    tooltipText: 'Query Count with warnings',
    simpleName: 'num_queries_with_warnings',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  docs_scanned: {
    humanizeName: 'Docs scanned',
    tooltipText: 'The number of scanned documents',
    simpleName: 'docs_scanned',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  docs_returned: {
    humanizeName: 'Docs Returned',
    tooltipText: 'The number of returned documents',
    simpleName: 'docs_returned',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  filesort: {
    humanizeName: 'Filesort',
    tooltipText: 'The query used a filesort',
    simpleName: 'filesort',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: ''
    }
  },
  filesort_on_disk: {
    humanizeName: 'Filesort on Disk',
    tooltipText: 'The filesort was performed on disk',
    simpleName: 'filesort_on_disk',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: ''
    }
  },
  full_join: {
    humanizeName: 'Full Join',
    tooltipText: 'The query performed a full join (a join without indexes)',
    simpleName: 'full_join',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: ''
    }
  },
  full_scan: {
    humanizeName: 'Full Scan',
    tooltipText: 'The query performed a full table scan',
    simpleName: 'full_scan',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: ''
    }
  },
  innodb_io_r_bytes: {
    humanizeName: 'Innodb Read Bytes',
    tooltipText: 'Similar to innodb_IO_r_ops, but the unit is bytes',
    simpleName: 'innodb_io_r_bytes',
    pipeTypes: {
      ratePipe: 'size',
      sumPipe: 'size',
      subSumPipe: 'percent',
      sparklineType: 'size',
      perQueryStatsPipe: 'size'
    }
  },
  innodb_io_r_ops: {
    humanizeName: 'Innodb IO Read Ops',
    tooltipText: 'Counts the number of page read operations scheduled',
    simpleName: 'innodb_io_r_ops',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  innodb_io_r_wait: {
    humanizeName: 'Innodb IO Read Wait',
    tooltipText: 'Shows how long (in seconds) it took InnoDB to actually read the data from storage',
    simpleName: 'innodb_io_r_wait',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time'
    }
  },
  innodb_pages_distinct: {
    humanizeName: 'Innodb Pages Distinct',
    tooltipText: 'Counts approximately the number of unique pages the query accessed',
    simpleName: 'innodb_pages_distinct',
    pipeTypes: {
      ratePipe: '',
      sumPipe: '',
      subSumPipe: '',
      sparklineType: '',
      perQueryStatsPipe: 'number'
    }
  },
  innodb_queue_wait: {
    humanizeName: 'Innodb Queue Wait',
    tooltipText:
      'Shows how long( in seconds) the query spent either waiting to enter the InnoDB queue or inside that queue waiting for + execution',
    simpleName: 'innodb_queue_wait',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time'
    }
  },
  innodb_rec_lock_wait: {
    humanizeName: 'Innodb Rec Lock Wait',
    tooltipText: 'Shows how long( in seconds) the query waited for row locks',
    simpleName: 'innodb_rec_lock_wait',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time'
    }
  },
  load: {
    humanizeName: 'Load',
    tooltipText: 'Load',
    simpleName: 'Load',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  lock_time: {
    humanizeName: 'Lock Time',
    tooltipText: 'The time to acquire locks in seconds',
    simpleName: 'lock_time',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time'
    }
  },
  merge_passes: {
    humanizeName: 'Merge Passes',
    tooltipText: 'The number of merge passes that the sort algorithm has had to do',
    simpleName: 'merge_passes',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  no_good_index_used: {
    humanizeName: 'No Good Index Used',
    tooltipText: 'The number of queries without good index',
    simpleName: 'no_good_index_used',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  no_index_used: {
    humanizeName: 'No index used',
    tooltipText: 'The number of queries without index',
    simpleName: 'no_index_used',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  qc_hit: {
    humanizeName: 'Query Cache Hit',
    tooltipText: 'Query Cache hits',
    simpleName: 'qc_hit',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: ''
    }
  },
  query_length: {
    humanizeName: 'Query Length',
    tooltipText: 'Shows how long the query is',
    simpleName: 'query_length',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  query_time: {
    humanizeName: 'Query Time',
    tooltipText: 'The statement execution time in seconds',
    simpleName: 'query_time',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'time',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'time'
    }
  },
  response_length: {
    humanizeName: 'Response Length',
    tooltipText: 'The response length of the query result in bytes',
    simpleName: 'response_length',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  rows_affected: {
    humanizeName: 'Rows Affected',
    tooltipText: 'Number of rows changed -UPDATE, DELETE, INSERT',
    simpleName: 'rows_affected',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  rows_examined: {
    humanizeName: 'Rows Examined',
    tooltipText: 'Number of rows scanned -SELECT',
    simpleName: 'rows_examined',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  rows_read: {
    humanizeName: 'Bytes Read',
    tooltipText: 'The number of rows read from tables',
    simpleName: 'rows_read',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  rows_sent: {
    humanizeName: 'Rows Sent',
    tooltipText: 'The number of rows sent to the client',
    simpleName: 'rows_sent',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  select_full_range_join: {
    humanizeName: 'Select Full Range Join',
    tooltipText: 'The number of joins that used a range search on a reference table',
    simpleName: 'select_full_range_join',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  sort_range: {
    humanizeName: 'Sort Range',
    tooltipText: 'The number of sorts that were done using ranges',
    simpleName: 'sort_range',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  select_range: {
    humanizeName: 'Select Range',
    tooltipText: 'The number of joins that used ranges on the first table',
    simpleName: 'select_range',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  select_range_check: {
    humanizeName: 'Select Range Check',
    tooltipText: 'The number of joins without keys that check for key usage after each row',
    simpleName: 'select_range_check',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  sort_rows: {
    humanizeName: 'Sort Rows',
    tooltipText: 'The number of sorted rows',
    simpleName: 'sort_rows',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  sort_scan: {
    humanizeName: 'Sort Scan',
    tooltipText: 'The number of sorts that were done by scanning the table',
    simpleName: 'sort_scan',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  tmp_disk_tables: {
    humanizeName: 'Tmp Disk Tables',
    tooltipText: 'Number of temporary tables created on disk for the query',
    simpleName: 'tmp_disk_tables',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
  tmp_table: {
    humanizeName: 'Tmp Table',
    tooltipText: 'The query created an implicit internal temporary table',
    simpleName: 'tmp_table',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: ''
    }
  },
  tmp_table_on_disk: {
    humanizeName: 'Tmp Table on Disk',
    tooltipText: 'The querys temporary table was stored on disk',
    simpleName: 'tmp_table_on_disk',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: ''
    }
  },
  tmp_table_sizes: {
    humanizeName: 'Tmp Table Sizes',
    tooltipText: 'Total Size in bytes for all temporary tables used in the query',
    simpleName: 'tmp_table_sizes',
    pipeTypes: {
      ratePipe: 'size',
      sumPipe: 'size',
      subSumPipe: 'percent',
      sparklineType: 'size',
      perQueryStatsPipe: 'size'
    }
  },
  tmp_tables: {
    humanizeName: 'Tmp Tables',
    tooltipText: 'Number of temporary tables created on memory for the query',
    simpleName: 'tmp_tables',
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
};
