import {MetricModel} from './metric.model';

export class TableDataModel {
  metrics: Array<Object>;
  sparkline: Array<Object>;
  dimension: string;
  rank: number;

  constructor(row) {
    this.metrics = Object.entries(row.metrics).map(item => new MetricModel(item));
    this.sparkline = row.sparkline.map(sparklineValue => sparklineValue.values);
    this.dimension = row.dimension || '';
    this.rank = row.rank || 0
  }
}
