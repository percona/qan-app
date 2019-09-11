import { LabelsProfile } from './labels-profile.interface';

export interface GetProfileBody {
  columns?: string[];
  first_seen?: boolean;
  group_by?: string,
  include_only_fields?: string[]
  main_metric?: string
  keyword?: string,
  labels?: LabelsProfile[],
  limit?: number,
  offset?: number,
  order_by?: string,
  period_start_from?: string,
  period_start_to?: string
}
