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
    switch (name) {
      case 'bytes_sent' || 'innodb_io_r_bytes' || 'tmp_table_sizes':
        this.ratePipe = 'size';
        this.sumPipe = 'size';
        this.subSumPipe = 'percent';
        this.perQueryStatsPipe = 'size';
        break;
      case 'lock_time' || 'query_time' || 'innodb_io_r_wait' || 'innodb_queue_wait' || 'innodb_rec_lock_wait':
        this.ratePipe = 'number';
        this.sumPipe = 'time';
        this.subSumPipe = 'percent';
        this.perQueryStatsPipe = 'time';
        break;
      case 'filesort' || 'filesort_on_disk' || 'full_scan' || 'full_join':
        this.ratePipe = 'number';
        this.sumPipe = 'number';
        this.subSumPipe = 'percent';
        this.perQueryStatsPipe = 'size'; // absent
        break;
      case 'innodb_pages_distinct':
        this.ratePipe = ''; // absent
        this.sumPipe = '';  // absent
        this.subSumPipe = ''; // absent
        this.perQueryStatsPipe = 'number';
        break;
      case 'rows_examined' || 'rows_sent' || 'rows_affected' || 'merge_passes' || 'select_range_check' ||
        'tmp_disk_tables' || 'innodb_io_r_ops' || 'innodb_io_r_ops' || 'no_good_index_used' ||
        'query_length' || 'no_index_used' || 'rows_read' || 'select_full_range_join' || 'select_range' ||
        'sort_range' || 'sort_rows' || 'sort_scan' || 'response_length':
        this.ratePipe = 'number';
        this.sumPipe = 'number';
        this.subSumPipe = 'percent';
        this.perQueryStatsPipe = 'number';
        break;
      case 'qc_hit' || 'tmp_table_on_disk' || 'tmp_table':
        this.ratePipe = 'number';
        this.sumPipe = 'number';
        this.subSumPipe = 'percent';
        this.perQueryStatsPipe = ''; // absent
        break;
      default: {
        this.yKey = '';
        this.measurement = '';
        this.pipeType = '';
        this.subSumPipe = '';
        this.additionalPipeType = '';
        break;
      }
    }
  }
}
