export class MetricModel {
  metricName: string;
  stats: Object;
  isDeleted: boolean;

  constructor(metric: Array<any> = ['', {}]) {
    const [metricName, stats] = metric;

    this.metricName = metricName;
    this.stats = stats.stats || stats;
    this.isDeleted = false;
  }
}
