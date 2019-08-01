import { LabelsProfile } from './labels-profile.interface';

export interface ObjectDetails {
  filter_by?: string,
  group_by?: string,
  labels?: LabelsProfile[],
  include_only_fields?: string[]
  period_start_from?: string,
  period_start_to?: string
}
