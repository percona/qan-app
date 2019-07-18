import { MetricModel } from './metric.model';

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

    row.metrics.num_queries = {
      stats: {
        // sum: row.num_queries,
        qps: row.qps || ''
      }
    };

    this.metrics = Object.entries(row.metrics).map(item => new MetricModel(item));
    this.sparkline = row.sparkline || [];
    this.dimension = row.dimension || '';
    this.fingerprint = row.fingerprint || '';
    this.rank = row.rank || 0;
    this.count = row.num_queries;
    this.load = row.load;
  }
}
