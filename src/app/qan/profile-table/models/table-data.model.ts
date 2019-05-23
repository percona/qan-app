import { MetricModel } from './metric.model';
import * as moment from 'moment';

export class TableDataModel {
  metrics: Array<MetricModel>;
  sparkline: Array<Object>;
  dimension: string;
  fingerprint: string;
  rank: number;
  count: number;
  load: number;

  constructor(row) {
    row.metrics = row.metrics || {};
    row.metrics.load = {
      stats: {
        sum: row.load
      }
    };

    row.metrics.count = {
      stats: {
        sum: row.num_queries,
        qps: row.qps || ''
      }
    };

    // row.metrics.latency = {
    //   stats: {
    //     sum: row.latency || -1
    //   }
    // };
    this.metrics = Object.entries(row.metrics).map(item => new MetricModel(item));
    this.sparkline = row.sparkline || [];
    // console.log('row.sparkline - ', row.sparkline);
    // console.log('this.sparkline model - ', this.sparkline);
    // if (this.sparkline.length) {
    //   this.sparkline.forEach(item =>
    //     item['timestamp'] = moment.unix(item['timestamp']).format('YYYY-MM-DDTHH:mm:ssZ')
    //   );
    // }
    this.dimension = row.dimension || '';
    this.fingerprint = row.fingerprint || '';
    this.rank = row.rank || 0;
    this.count = row.num_queries;
    this.load = row.load;
  }
}
