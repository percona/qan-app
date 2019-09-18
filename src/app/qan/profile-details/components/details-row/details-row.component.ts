import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../../../profile-table/models/metric.model';
import { metricCatalogue } from '../../../data/metric-catalogue';

@Component({
  selector: 'app-details-row',
  templateUrl: './details-row.component.html',
  styleUrls: ['./details-row.component.scss']
})
export class DetailsRowComponent implements OnInit {
  @Input() currentMetric: MetricModel;
  @Input() currentTotal: MetricModel;
  @Input() allTotals: MetricModel[];
  @Input() queryCount: any;

  private metricData = metricCatalogue;
  public percentOfTotal: number;
  public currentMetricInfo: any;
  public defaultPipeInfo = {
    ratePipe: 'number',
    sumPipe: 'number',
    subSumPipe: 'percent',
    sparklineType: 'number',
    perQueryStatsPipe: 'number'
  };

  public pipeInfo: any;
  public isLatencyChart: boolean;
  public isRate: boolean;
  public isSum: boolean;
  public isStats: boolean;
  public isPercentOfTotal: boolean;

  constructor() {
  }

  ngOnInit() {
    this.currentMetricInfo = this.metricData[this.currentMetric.metricName] || this.currentMetric;
    this.pipeInfo = this.currentMetricInfo.pipeTypes || this.defaultPipeInfo;
    this.isLatencyChart = this.currentMetric.stats.min && this.currentMetric.stats.max;
    this.isRate = this.currentMetric.stats.rate >= 0;
    this.isSum = this.currentMetric.stats.sum >= 0;
    this.isStats = this.currentMetric.stats.avg >= 0;
    this.isPercentOfTotal = !!(this.currentMetric.stats.sum || this.currentMetric.stats.sum_per_sec);
    if (this.isPercentOfTotal) {
      this.percentOfTotal = +this.percentFromNumber(this.currentTotal, this.currentMetric);
    }
  }

  calculatePercentOfTotal(current, total) {
    return +((+current / +total) * 100).toFixed(2);
  }

  percentFromNumber(total, current) {
    const totalItem = this.allTotals.find(item => item.metricName === this.currentMetric.metricName);
    const key = current.stats.sum ? 'sum' : 'sum_per_sec';
    return this.calculatePercentOfTotal(current.stats[key], totalItem.stats[key]);
  }

  perQueryStat() {
    return (+this.currentMetric.stats['sum'] / +this.queryCount).toFixed(2)
  }
}
