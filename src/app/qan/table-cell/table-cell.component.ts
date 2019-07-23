import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../profile-table/models/metric.model';
import { QanProfileService } from '../profile/qan-profile.service';
import { metricCatalogue } from '../data/metric-catalogue';

@Component({
  selector: 'app-qan-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})
export class TableCellComponent implements OnInit {
  @Input() metricData: MetricModel;
  @Input() sparklineData: any;
  @Input() totalSum: any;

  @Input() set checkSparkline(state) {
    this.isDefaultColumn = this.defaultColumns.includes(this.metricData.metricName);
    const currentSparkName = this.setKeyForSparkline(this.metricData.metricName);
    this.sparklineData.forEach(item => {
      if (item[currentSparkName] === 'NaN') {
        item[currentSparkName] = 0
      }
    });
    this.isValues = this.sparklineData.some(item => !!item[currentSparkName]);
    this.isSparkline = state && this.isValues;
  }

  public metricDataInfo = metricCatalogue;
  public isSparkline: boolean;
  public isValues: boolean;
  public currentMetricInfo: any;
  public pipeInfo: any;
  private defaultColumns = ['load', 'count', 'num_queries'];
  public yKey: string;
  public isStats: boolean;
  public isDefaultColumn: boolean;
  public isNoData: boolean;
  public currentParams: any;

  constructor(private qanProfileService: QanProfileService) {
    this.currentParams = this.qanProfileService.getProfileParams.getValue();
  }

  ngOnInit() {
    this.currentMetricInfo = this.metricDataInfo[this.metricData.metricName];
    this.pipeInfo = this.currentMetricInfo.pipeTypes;
    this.yKey = this.setKeyForSparkline(this.metricData.metricName);
    this.isStats = Object.keys(this.metricData.stats).includes('min' && 'max');
    this.isNoData = Object.keys(this.metricData.stats).length === 1 && Object.keys(this.metricData.stats)[0] === 'cnt';
  }

  percentFromNumber(total, current) {
    const totalItem = total.find(item => item.metricName === this.metricData.metricName);
    return ((+current / (+totalItem.stats.sum || +totalItem.stats.sum_per_sec)) * 100).toFixed(2);
  }

  setKeyForSparkline(name: string): string {
    if (this.isDefaultColumn) {
      return this.setKeyForDefaultSparkline(name);
    } else {
      return `m_${name}_sum_per_sec`
    }
  }

  setKeyForDefaultSparkline(name: string): string {
    switch (name) {
      case 'load':
        return 'load';
      case 'count':
      case 'num_queries':
        return 'num_queries_per_sec';
      case 'latency':
        return 'm_query_time_avg';
      default:
        return ''
    }
  }
}
