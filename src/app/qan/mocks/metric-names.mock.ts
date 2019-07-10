export const metricNames = {
  bytes_sent: {
    humanizeName: 'Bytes Sent',
    tooltipText: 'The number of bytes sent to all clients',
    pipeTypes: {
      ratePipe: 'size',
      sumPipe: 'size',
      subSumPipe: 'percent',
      sparklineType: 'size',
      perQueryStatsPipe: 'size'
    }
  },
  num_queries: {
    humanizeName: 'Query Count',
    tooltipText: 'Count',
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
    pipeTypes: {
      ratePipe: 'number',
      sumPipe: 'number',
      subSumPipe: 'percent',
      sparklineType: 'number',
      perQueryStatsPipe: 'number'
    }
  },
};
