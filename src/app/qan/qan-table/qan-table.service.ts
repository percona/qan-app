import { Injectable } from '@angular/core';
import { TableDataModel } from './models/table-data.model';
import { SelectOptionModel } from '../qan-table-header-cell/modesl/select-option.model';
import { Observable } from 'rxjs';
import { ProfileService } from '../../inventory-api/services/profile.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { groupBy } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

export interface GetProfileBody {
  columns: string[];
  first_seen: boolean;
  group_by: string,
  include_only_fields: string[]
  keyword: string,
  labels: LabelsProfile[],
  limit: number,
  offset: number,
  order_by: string,
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
  private groupBy = new Subject();

  constructor() { }


  setGroupBy(value) {
    this.groupBy.next(value);
  }

  get groupBySource() {
    return this.groupBy;
  }
}
