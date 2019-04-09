import { Injectable } from '@angular/core';
import { SelectOptionModel } from '../table-header-cell/modesl/select-option.model';
import { Subject } from 'rxjs/internal/Subject';
import { GetProfileBody, ObjectDetails, TimeRange } from '../profile-table/profile-table.service';

@Injectable()
export class ProfileService {
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
