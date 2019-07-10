import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataFormatService {

  private numberTypes = [
    'rows_sent', 'rows_examined', 'rows_affected', 'merge_passes', 'select_range_check', 'tmp_disk_tables',
    'innodb_io_r_ops', 'no_good_index_used', 'query_length', 'no_index_used', 'rows_read', 'tmp_tables',
    'select_full_range_join', 'select_range!!!', 'sort_range', 'sort_rows', 'sort_scan', 'response_length',
    'docs_returned', 'docs_scanned', 'load', 'count', 'num_queries', 'num_queries_with_errors', 'num_queries_with_warnings'
  ];

  private sizeTypes = [
    'bytes_sent', 'innodb_io_r_bytes', 'tmp_table_sizes'
  ];

  private timeTypes = ['lock_time', 'query_time', 'innodb_io_r_wait', 'innodb_queue_wait', 'innodb_rec_lock_wait'];

  private fileSortTypes = [
    'filesort', 'filesort_on_disk', 'full_scan', 'full_join', 'qc_hit', 'tmp_table_on_disk', 'tmp_table'
  ];

  private pagesDistinctTypes = ['innodb_pages_distinct'];

  private defaultColumnsTypes = ['latency !!!'];

  public conditions = [
    {
      isIncluded: name => this.numberTypes.includes(name),
      pipeTypes: {
        ratePipe: 'number',
        sumPipe: 'number',
        subSumPipe: 'percent',
        sparklineType: 'number',
        perQueryStatsPipe: 'number'
      }
    },
    {
      isIncluded: name => this.sizeTypes.includes(name),
      pipeTypes: {
        ratePipe: 'size',
        sumPipe: 'size',
        subSumPipe: 'percent',
        sparklineType: 'size',
        perQueryStatsPipe: 'size'
      }
    },
    {
      isIncluded: name => this.timeTypes.includes(name),
      pipeTypes: {
        ratePipe: 'number',
        sumPipe: 'time',
        subSumPipe: 'percent',
        sparklineType: 'number',
        perQueryStatsPipe: 'time'
      }
    },
    {
      isIncluded: name => this.fileSortTypes.includes(name),
      pipeTypes: {
        ratePipe: 'number',
        sumPipe: 'number',
        subSumPipe: 'percent',
        sparklineType: 'number',
        perQueryStatsPipe: ''
      }
    },
    {
      isIncluded: name => this.pagesDistinctTypes.includes(name),
      pipeTypes: {
        ratePipe: '',
        sumPipe: '',
        subSumPipe: '',
        sparklineType: '',
        perQueryStatsPipe: 'number'
      }
    },
    {
      isIncluded: name => this.defaultColumnsTypes.includes(name),
      pipeTypes: {
        ratePipe: 'time',
        sumPipe: 'time',
        subSumPipe: 'percent',
        sparklineType: 'time',
        perQueryStatsPipe: undefined
      }
    }
  ];

  constructor() { }

  setDataFormat(name: string) {
    const filtered = this.conditions.filter(condition => condition.isIncluded(name))[0];
    return filtered.pipeTypes;
  }
}
