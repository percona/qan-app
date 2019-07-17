import { metricCatalogue } from '../../data/metric-catalogue';

export class MetricModel {
  metricName: string;
  humanizeMetricName: string;
  tooltipText: string;
  stats: any;
  sparkline: any;

  constructor(metric: Array<any> = ['', {}], sparkline = []) {
    const metricsInfo = metricCatalogue;
    const [metricName, stats] = metric;

    this.metricName = metricName;
    if (metricsInfo[metricName]) {
      this.humanizeMetricName = metricsInfo[metricName].humanizeName;
      this.tooltipText = metricsInfo[metricName].tooltipText;
    } else {
      this.humanizeMetricName = metricName;
      this.tooltipText = metricName;
    }
    this.stats = stats.stats || stats;
    this.sparkline = sparkline.some(sparklinePoint => sparklinePoint.pointValue) ? sparkline : [];
  }

}
