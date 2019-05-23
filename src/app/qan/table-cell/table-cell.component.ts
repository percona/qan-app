import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../profile-table/models/metric.model';
import { QanProfileService } from '../profile/qan-profile.service';
import { DataFormatService } from '../services/data-format.service';

@Component({
  selector: 'app-qan-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})
export class TableCellComponent implements OnInit {
  @Input() metricData: MetricModel;
  @Input() sparklineData: any;
  @Input() totalSum: any;
  @Input() isSparkline = false;

  private defaultColumns = ['load', 'count', 'latency'];
  public yKey: string;
  public measurement: string;
  public pipeType: string;
  public isStats: boolean;
  public isSum: boolean;
  public isDefaultColumn: boolean;
  public isCount: boolean;
  public isLatency: boolean;
  public currentParams: any;

  constructor(
    private qanProfileService: QanProfileService,
    private dataFormat: DataFormatService
  ) {
    this.currentParams = this.qanProfileService.getProfileParams.getValue();
  }

  ngOnInit() {
    this.isStats = Object.keys(this.metricData.stats).includes('min' && 'max');
    this.isSum = this.metricData.stats.sum >= 0;
    this.isDefaultColumn = this.defaultColumns.includes(this.metricData.metricName);
    this.isCount = this.metricData.metricName === 'count';
    this.isLatency = this.metricData.metricName === 'latency';
    this.setCurrentSparkline(this.metricData.metricName);
  }

  /**
   * Set sparkline type and display column for config parameters
   * @param name - checked column-type name
   */
  setCurrentSparkline(name: string) {
    const { sumPipe = '', sparklineType = '' } = name ? this.dataFormat.setDataFormat(name) : {};

    this.pipeType = sumPipe;
    this.measurement = sparklineType;
    this.yKey = this.setKeyForSparkline(name);
  }

  percentFromNumber(total, current) {
    return ((+current / +total) * 100).toFixed(2)
  }

  setKeyForSparkline(name: string): string {
    if (this.isDefaultColumn) {
      return this.setKeyForDefaultSparkline(name);
    } else {
      return `m_${name}_sum`
    }
  }

  setKeyForDefaultSparkline(name: string): string {
    switch (name) {
      case 'load':
        return 'm_query_time_sum_per_sec';
      case 'count':
        return 'num_queries_sum';
      case 'latency':
        return 'm_query_time_avg';
      default:
        return ''
    }
  }
}
