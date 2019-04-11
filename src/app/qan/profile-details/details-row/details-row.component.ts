import { Component, Input, OnInit } from '@angular/core';
import { MetricModel } from '../../profile-table/models/metric.model';

@Component({
  selector: 'app-details-row',
  templateUrl: './details-row.component.html',
  styleUrls: ['./details-row.component.scss']
})
export class DetailsRowComponent implements OnInit {
  @Input() currentMetric: MetricModel;

  constructor() { }

  ngOnInit() {
  }

}
