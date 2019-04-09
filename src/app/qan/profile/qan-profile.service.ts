import { Injectable } from '@angular/core';
import { SelectOptionModel } from '../table-header-cell/modesl/select-option.model';
import { Subject } from 'rxjs/internal/Subject';

export interface ProfileInfo {
  timeRange: Subject<TimeRange>,
  profile: Subject<GetProfileBody>,
  details: Subject<ObjectDetails>,
  groupValue?: SelectOptionModel,
  defaultColumns: string[]
}

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

@Injectable()
export class QanProfileService {
  private profileInfo: ProfileInfo = {
    timeRange: new Subject<TimeRange>(),
    profile: new Subject<GetProfileBody>(),
    details: new Subject<ObjectDetails>(),
    defaultColumns: ['load', 'count', 'latency'],
  };

  private profileParamsState: GetProfileBody = {
    order_by: 'num_queries',
    group_by: 'queryid',
    columns: ['load', 'count', 'latency'],
  };

  constructor() {
  }

  updateProfileParams(params: GetProfileBody) {
    this.profileInfo.profile.next(params)
  }

  updateTimeRange(range: TimeRange) {
    this.profileInfo.timeRange.next(range)
  }

  updateObjectDetails(params: ObjectDetails) {
    this.profileInfo.details.next(params);
  }

  set setGroupByValue(group_by: SelectOptionModel) {
    this.profileInfo.groupValue = group_by;
  }

  get getProfileInfo() {
    return this.profileInfo
  }

  get getProfileParamsState(): GetProfileBody {
    return this.profileParamsState;
  }
}
