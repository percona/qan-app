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

  constructor(private dataFormat: DataFormatService) {
  }

  ngOnInit() {
    this.setDataFormat(this.currentMetric.metricName);
  }

  setDataFormat(name: string) {
    const { ratePipe = '', sumPipe = '', subSumPipe = '', perQueryStatsPipe = '' } = this.dataFormat.setDataFormat(name);

    this.ratePipe = ratePipe;
    this.sumPipe = sumPipe;
    this.subSumPipe = subSumPipe;
    this.perQueryStatsPipe = perQueryStatsPipe;
  }
}
