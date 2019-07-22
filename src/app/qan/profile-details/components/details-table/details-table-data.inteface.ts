import { MetricModel } from '../../../profile-table/models/metric.model';

export interface DetailsTableDataInterface {
  metrics?: MetricModel[];
  totals?: MetricModel[];
}
