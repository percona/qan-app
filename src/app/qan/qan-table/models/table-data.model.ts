import { MetricModel } from './metric.model';
import * as moment from 'moment';

export class TableDataModel {
  metrics: Array<MetricModel>;
  sparkline: Array<Object>;
  dimension: string;
  fingerprint: string;
  rank: number;
  load: number;
  num_queries: number;
  qps: number;

  constructor(row) {
    const defaultMetrics = {
      load: {
        stats: {
          sum: row.load
        }
      },
      count: {
        stats: {
          sum: row.num_queries
        }
      },
      latancy: {
        stats: {
          sum: row.qps
        }
      }
    };
    this.metrics = row.metrics ?
      Object.entries(row.metrics).map(item => new MetricModel(item)) : Object.entries(defaultMetrics).map(item => new MetricModel(item));
    this.sparkline = row.sparkline.map(sparklineValue => sparklineValue.values);
    this.sparkline.forEach(item => item['timestamp'] = moment.unix(item['timestamp']).format('YYYY-MM-DDTHH:mm:ssZ'));
    this.dimension = row.dimension || '';
    this.fingerprint = row.fingerprint || '';
    this.rank = row.rank || 0;
    this.load = row.load || '';
    this.num_queries = row.num_queries || '';
    this.qps = row.qps || '';
  }
}
