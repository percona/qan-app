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

  private metricData = metricCatalogue;
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

  constructor() {
  }

  ngOnInit() {
    this.currentMetricInfo = this.metricData[this.currentMetric.metricName] || this.currentMetric;
    this.pipeInfo = this.currentMetricInfo.pipeTypes || this.defaultPipeInfo;
    this.isLatencyChart = this.currentMetric.stats.min && this.currentMetric.stats.max;
    this.isRate = this.currentMetric.stats.rate >= 0;
    this.isSum = this.currentMetric.stats.sum >= 0;
    this.isStats = this.currentMetric.stats.avg >= 0;
  }
}
