import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { SelectOptionModel } from '../qan-table-header-cell/modesl/select-option.model';
import { FiltersSearchModel } from '../qan-filter/models/filters-search.model';

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
export class QanTableService {
  private groupValue: SelectOptionModel;
  private profileParams = new Subject<GetProfileBody>();
  private objectDetails = new Subject<ObjectDetails>();
  private timeRange = new Subject<TimeRange>();
  private defaultColumns: string[] = ['load', 'count', 'latency'];
  private profileParamsState: GetProfileBody = {
    order_by: 'num_queries',
    group_by: 'queryid',
    columns: ['load', 'count', 'latency'],
    labels: [],
    limit: 0,
    offset: 0,
  };

  constructor() {
  }

  updateProfileParams(params: GetProfileBody) {
    this.profileParams.next(params)
  }

  updateTimeRange(range: TimeRange) {
    this.timeRange.next(range)
  }

  updateObjectDetails(params: ObjectDetails) {
    this.objectDetails.next(params);
  }

  set setGroupByValue(group_by) {
    this.groupValue = group_by as SelectOptionModel;
  }

  get profileParamsSource(): Subject<GetProfileBody> {
    return this.profileParams;
  }

  get objectDetailsSource(): Subject<ObjectDetails> {
    return this.objectDetails;
  }

  get getGroupByValue(): SelectOptionModel {
    return this.groupValue;
  }

  get getProfileParamsState(): GetProfileBody {
    return this.profileParamsState;
  }

  get getDefaultColumns(): string[] {
    return this.defaultColumns;
  }

  get getTimeRange(): Subject<TimeRange> {
    return this.timeRange
  }
}
