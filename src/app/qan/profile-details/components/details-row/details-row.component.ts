import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../../../profile-table/models/metric.model';

@Component({
  selector: 'app-details-row',
  templateUrl: './details-row.component.html',
  styleUrls: ['./details-row.component.scss']
})
export class DetailsRowComponent implements OnInit {
  @Input() currentMetric: MetricModel;

  public yKey: string;
  public measurement: string;
  public pipeType: string;
  public additionalPipeType: string;

  constructor() {
  }

  ngOnInit() {
    this.setCurrentSparkline(this.currentMetric.metricName);
  }

  setCurrentSparkline(name: string) {
    switch (name) {
      case 'load':
        this.yKey = 'm_query_load';
        this.measurement = 'number';
        this.pipeType = 'number';
        break;
      case 'count':
        this.yKey = 'num_queries_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        break;
      case 'latency':
        this.yKey = 'm_query_time_avg';
        this.measurement = 'time';
        this.pipeType = 'time';
        break;
      case 'bytes_sent':
        this.yKey = 'm_bytes_sent_sum';
        this.measurement = 'size';
        this.pipeType = 'size';
        break;
      case 'lock_time':
        this.yKey = 'm_lock_time_sum';
        this.measurement = 'number';
        this.pipeType = 'time';
        break;
      case 'query_time':
        this.yKey = 'm_query_time_avg';
        this.measurement = 'time';
        this.pipeType = 'time';
        break;
      case 'rows_sent':
        this.yKey = 'm_rows_sent_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        break;
      case 'rows_examined':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        break;
      case 'filesort' || 'filesort_on_disk' || 'full_join' || 'full_scan' || 'innodb_io_r_ops' || 'response_length':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        break;
      case 'innodb_io_r_bytes':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'size';
        this.pipeType = 'size';
        break;
      case 'innodb_io_r_wait':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'size';
        this.pipeType = 'size';
        this.additionalPipeType = 'time';
        break;
      case 'innodb_pages_distinct':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        break;
      case 'innodb_queue_wait':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        this.additionalPipeType = 'time';
        break;
      case 'innodb_rec_lock_wait':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'time';
        this.pipeType = 'time';
        this.additionalPipeType = '';
        break;
      case 'merge_passes':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        this.additionalPipeType = '';
        break;
      case 'qc_hit':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        this.additionalPipeType = '';
        break;
      case 'tmp_disk_tables':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        this.additionalPipeType = '';
        break;
      case 'tmp_table_on_disk':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        this.additionalPipeType = '';
        break;
      case 'tmp_table_sizes':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'size';
        this.pipeType = 'size';
        this.additionalPipeType = '';
        break;
      case 'tmp_table' || 'tmp_table':
        this.yKey = 'm_rows_examined_sum';
        this.measurement = 'number';
        this.pipeType = 'number';
        this.additionalPipeType = '';
        break;
      case
        'no_good_index_used' || 'query_length' || 'no_index_used' || 'rows_affected' || 'rows_read' || 'select_full_range_join'
        || 'select_range' || 'select_range_check' || 'sort_range' || 'sort_rows' || 'sort_scan':
        this.yKey = '????';
        this.measurement = '???';
        this.pipeType = '???';
        this.additionalPipeType = '???';
        break;
      default: {
        this.yKey = '';
        this.measurement = '';
        this.pipeType = '';
        this.additionalPipeType = '';
        break;
      }
    }
  }
}
