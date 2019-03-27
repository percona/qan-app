import { MetricModel } from './metric.model';
import * as moment from 'moment';

export class TableDataModel {
  metrics: Array<MetricModel>;
  sparkline: Array<Object>;
  dimension: string;
  rank: number;

  constructor(row) {
    this.metrics = Object.entries(row.metrics).map(item => new MetricModel(item));
    this.sparkline = row.sparkline.map(sparklineValue => sparklineValue.values);
    this.sparkline.forEach(item => item['timestamp'] = moment.unix(item['timestamp']).format('YYYY-MM-DDTHH:mm:ssZ'));
    this.dimension = row.dimension || '';
    this.rank = row.rank || 0;
  }
}
