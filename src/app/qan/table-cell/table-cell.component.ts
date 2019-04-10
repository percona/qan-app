import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../profile-table/models/metric.model';
import { QanProfileService } from '../profile/qan-profile.service';

@Component({
  selector: 'app-qan-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})
export class TableCellComponent implements OnInit {
  @Input() metricData: MetricModel;
  @Input() sparklineData: any;
  @Input() totalSum: any;

  public yKey: string;
  public measurement: string;
  public pipeType: string;
  public isStats: boolean;
  public isDefaultColumn: boolean;
  public isLatency: boolean;
  public currentParams: any;

  constructor(private qanProfileService: QanProfileService) {
    this.currentParams =
      JSON.parse(JSON.stringify(this.qanProfileService.getProfileParams.getValue()));
  }

  ngOnInit() {
    this.isStats = Object.keys(this.metricData.stats).includes('min' && 'max');
    this.isDefaultColumn = this.currentParams.columns.includes(this.metricData.metricName);
    this.setCurrentSparkline(this.metricData.metricName);
  }

  /**
   * Set sparkline type and display column for config parameters
   * @param name - checked column-type name
   */
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
      default: {
        this.yKey = '';
        this.measurement = '';
        break;
      }
    }
  }

  percentFromNumber(total, current) {
    return +(current / total)
  }
}
