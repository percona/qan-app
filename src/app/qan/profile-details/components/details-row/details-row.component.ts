import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../../../profile-table/models/metric.model';
import { DataFormatService } from '../../../services/data-format.service';

@Component({
  selector: 'app-details-row',
  templateUrl: './details-row.component.html',
  styleUrls: ['./details-row.component.scss']
})
export class DetailsRowComponent implements OnInit {
  @Input() currentMetric: MetricModel;

  public measurement: string;
  public ratePipe: string;
  public sumPipe: string;
  public subSumPipe: string;
  public perQueryStatsPipe: string;
  public isLatencyChart: boolean;
  public isRate: boolean;
  public isSum: boolean;
  public isStats: boolean;

  constructor(private dataFormat: DataFormatService) {
  }

  ngOnInit() {
    this.setDataFormat(this.currentMetric.metricName);
    this.isLatencyChart = this.currentMetric.stats.min && this.currentMetric.stats.max;
    this.isRate = this.currentMetric.stats.rate >= 0;
    this.isSum = this.currentMetric.stats.sum >= 0;
    this.isStats = this.currentMetric.stats.avg >= 0;
  }

  setDataFormat(name: string) {
    const { ratePipe = '', sumPipe = '', subSumPipe = '', perQueryStatsPipe = '' } = this.dataFormat.setDataFormat(name);

    console.log(`name - ${name}, pipe - ${sumPipe}`);
    this.ratePipe = ratePipe;
    this.sumPipe = sumPipe;
    this.subSumPipe = subSumPipe;
    this.perQueryStatsPipe = perQueryStatsPipe;
  }
}
