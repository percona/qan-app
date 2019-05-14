export class MetricModel {
  metricName: string;
  stats: any;
  sparkline: any;

  constructor(metric: Array<any> = ['', {}], sparkline = []) {
    const [metricName, stats] = metric;

    this.metricName = metricName;
    this.stats = stats.stats || stats;
    this.sparkline = sparkline || [];
  }
}
