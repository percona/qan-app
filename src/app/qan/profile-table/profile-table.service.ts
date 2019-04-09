import { Injectable } from '@angular/core';

export interface GetProfileBody {
  columns?: string[];
  first_seen?: boolean;
  group_by?: string,
  include_only_fields?: string[]
  keyword?: string,
  labels?: LabelsProfile[],
  limit?: number,
  offset?: number,
  order_by?: string,
  period_start_from?: string,
  period_start_to?: string
}

export interface ObjectDetails {
  filter_by?: string,
  group_by?: string,
  include_only_fields?: string[]
  labels?: LabelsProfile[],
  period_start_from?: string,
  period_start_to?: string
}

export interface TimeRange {
  period_start_from: string,
  period_start_to: string
}

export interface LabelsProfile {
  key: string;
  value: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileTableService {

  constructor() {
  }
}
