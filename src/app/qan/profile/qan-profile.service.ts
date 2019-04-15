import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QueryParams } from '../../core/core.component';
import { ActivatedRoute } from '@angular/router';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';

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

export interface ProfileInfo {
  timeRange: Subject<TimeRange>,
  profile: Subject<GetProfileBody>,
  details: Subject<ObjectDetails>,
  detailsBy: Subject<string>,
  fingerprint: Subject<string>,
  defaultColumns: string[]
}

@Injectable()
export class QanProfileService {
  private iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
  private parseQueryParamDatePipe = new ParseQueryParamDatePipe();

  private profileInfo: ProfileInfo = {
    timeRange: new Subject<TimeRange>(),
    profile: new Subject<GetProfileBody>(),
    details: new Subject<ObjectDetails>(),
    detailsBy: new BehaviorSubject<string>('default'),
    fingerprint: new BehaviorSubject<string>(''),
    defaultColumns: ['load', 'count', 'latency'],
  };

  private profileParams = new BehaviorSubject<GetProfileBody>({
    columns: ['load', 'count', 'latency'],
    first_seen: false,
    group_by: 'queryid',
    include_only_fields: [],
    keyword: '',
    labels: [],
    limit: 0,
    offset: 0,
    order_by: 'num_queries',
    period_start_from: this.setTimeRange('from'),
    period_start_to: this.setTimeRange('to')
  });


  constructor(private route: ActivatedRoute) {

  }

  setTimeRange(value): string {
    const processed = this.parseQueryParamDatePipe.transform(this.iframeQueryParams[value], value);
    return processed.utc().format('YYYY-MM-DDTHH:mm:ssZ');
  }

  updateProfileParams(params: GetProfileBody) {
    this.profileParams.next(params);
  }

  updateObjectDetails(params: ObjectDetails) {
    this.profileInfo.details.next(params);
  }

  updateFingerprint(fingerprint: string) {
    this.profileInfo.fingerprint.next(fingerprint);
  }

  updateDetailsByValue(details_by: string) {
    this.profileInfo.detailsBy.next(details_by);
  }

  get getProfileParams(): BehaviorSubject<GetProfileBody> {
    return this.profileParams;
  }

  get getProfileInfo() {
    return this.profileInfo
  }
}
