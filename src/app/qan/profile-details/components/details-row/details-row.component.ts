import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../../../profile-table/models/metric.model';

@Component({
  selector: 'app-details-row',
  templateUrl: './details-row.component.html',
  styleUrls: ['./details-row.component.scss']
})
export class DetailsRowComponent implements OnInit {
  @Input() currentMetric: MetricModel;

  private numberTypes = [
    'rows_sent', 'rows_examined', 'rows_affected', 'merge_passes', 'select_range_check', 'tmp_disk_tables',
    'innodb_io_r_ops', 'no_good_index_used', 'query_length', 'no_index_used', 'rows_read', 'tmp_tables',
    'select_full_range_join', 'select_range', 'sort_range', 'sort_rows', 'sort_scan', 'response_length',
    'docs_returned', 'docs_scanned'
  ];

  private sizeTypes = [
    'bytes_sent', 'innodb_io_r_bytes', 'tmp_table_sizes'
  ];

  private timeTypes = [
    'lock_time', 'query_time', 'innodb_io_r_wait', 'innodb_queue_wait', 'innodb_rec_lock_wait'
  ];

  private fileSortTypes = [
    'filesort', 'filesort_on_disk', 'full_scan', 'full_join', 'qc_hit', 'tmp_table_on_disk', 'tmp_table'
  ];

  private pagesDistinctTypes = [
    'innodb_pages_distinct'
  ];

  public conditions = [
    {
      isIncluded: name => this.numberTypes.includes(name),
      pipeTypes: {
        ratePipe: 'number',
        sumPipe: 'number',
        subSumPipe: 'percent',
        perQueryStatsPipe: 'number'
      }
    },
    {
      isIncluded: name => this.sizeTypes.includes(name),
      pipeTypes: {
        ratePipe: 'size',
        sumPipe: 'size',
        subSumPipe: 'percent',
        perQueryStatsPipe: 'size'
      }
    },
    {
      isIncluded: name => this.timeTypes.includes(name),
      pipeTypes: {
        ratePipe: 'number',
        sumPipe: 'time',
        subSumPipe: 'percent',
        perQueryStatsPipe: 'time'
      }
    },
    {
      isIncluded: name => this.fileSortTypes.includes(name),
      pipeTypes: {
        ratePipe: 'number',
        sumPipe: 'number',
        subSumPipe: 'percent',
        perQueryStatsPipe: ''
      }
    },
    {
      isIncluded: name => this.pagesDistinctTypes.includes(name),
      pipeTypes: {
        ratePipe: '',
        sumPipe: '',
        subSumPipe: '',
        perQueryStatsPipe: 'number'
      }
    }
  ];

  public yKey: string;
  public measurement: string;
  public pipeType: string;
  public additionalPipeType: string;
  public ratePipe: string;
  public sumPipe: string;
  public subSumPipe: string;
  public perQueryStatsPipe: string;

  constructor() {
  }

  ngOnInit() {
    this.setDataFormat(this.currentMetric.metricName);
  }

  setDataFormat(name: string) {
    const filtered = this.conditions.filter(condition => condition.isIncluded(name))[0];
    const { ratePipe = '', sumPipe = '', subSumPipe = '', perQueryStatsPipe = '' } = filtered.pipeTypes || {};

    this.ratePipe = ratePipe;
    this.sumPipe = sumPipe;
    this.subSumPipe = subSumPipe;
    this.perQueryStatsPipe = perQueryStatsPipe;
  }
}
