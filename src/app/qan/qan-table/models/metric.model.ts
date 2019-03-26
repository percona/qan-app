export class MetricModel {
  metricName: string;
  stats: Object;

  constructor(metric: Array<any> = ['', {}]) {
    const [metricName, stats] = metric;

    this.metricName = metricName;
    this.stats = stats.stats || stats;
  }
}
