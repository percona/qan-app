import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {Observer} from 'rxjs/internal/types';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';

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

export interface LabelsProfile {
  key: string;
  value: string[];
}


@Injectable({
  providedIn: 'root'
})
export class QanTableService {
  private groupValue: SelectOptionModel;
  private groupBy = new Subject<string>();
  private profileParams = new Subject<GetProfileBody>();

  constructor() { }


  setGroupBy(group_by: string) {
    this.groupBy.next(group_by);
  }

  setProfileParams(params: GetProfileBody) {
    this.profileParams.next(params)
  }

  set setGroupByValue(group_by) {
    this.groupValue = group_by as SelectOptionModel;
  }

  get groupBySource(): Subject<string> {
    return this.groupBy;
  }

  get profileParamsSource(): Subject<GetProfileBody> {
    return this.profileParams;
  }

  get getGroupByValue(): SelectOptionModel {
    return this.groupValue;
  }
}
