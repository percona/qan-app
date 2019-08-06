import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QueryParams } from '../../core/core.component';
import { ActivatedRoute } from '@angular/router';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';
import { ObjectDetails } from './interfaces/object-details.interface';
import { ProfileInfo } from './interfaces/profile-info.interfaces';
import { TimeRange } from './interfaces/time-range.interface';
import { GetProfileBody } from './interfaces/get-profile-body.interfaces';


@Injectable()
export class QanProfileService {
  private iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
  private parseQueryParamDatePipe = new ParseQueryParamDatePipe();
  private defaultGroupBy = 'queryid';
  private defaultMainMetric = new BehaviorSubject('');
  private currentDetails: ObjectDetails = {};
  private defaultColumns = ['load', 'num_queries', 'query_time'];

  private params = {
    columns: this.iframeQueryParams.columns ? this.decodeColumns(this.iframeQueryParams.columns) : this.defaultColumns,
    first_seen: false,
    group_by: this.defaultGroupBy,
    include_only_fields: [],
    keyword: '',
    labels: this.setLabels(this.iframeQueryParams),
    limit: 10,
    offset: 0,
    order_by: this.iframeQueryParams.order_by ? this.iframeQueryParams.order_by : '-load',
    main_metric: this.iframeQueryParams.main_metric ? this.decodeMainMetric(this.iframeQueryParams.main_metric) : 'load',
    period_start_from: this.setTimeRange('from'),
    period_start_to: this.setTimeRange('to')
  };

  private profileInfo: ProfileInfo = {
    timeRange: new Subject<TimeRange>(),
    profile: new Subject<GetProfileBody>(),
    details: new Subject<ObjectDetails>(),
    detailsBy: new BehaviorSubject<string>('default'),
    fingerprint: new BehaviorSubject<string>(''),
    defaultColumns: ['load', 'count', 'latency'],
  };

  private profileParams = new BehaviorSubject<GetProfileBody>(this.params);
  private group_by = new BehaviorSubject<string>(this.defaultGroupBy);

  constructor(private route: ActivatedRoute) {
    console.log('this.iframeQueryParams - ', this.iframeQueryParams);
  }

  setTimeRange(value): string {
    const processed = this.parseQueryParamDatePipe.transform(this.iframeQueryParams[value], value);
    return processed.utc().format('YYYY-MM-DDTHH:mm:ssZ');
  }

  setLabels(iframeQueryParams) {
    return iframeQueryParams.filters ? this.prepareLabelsURLParams(this.decodeLabelsURLParams(iframeQueryParams.filters)) : [];
  }

  prepareLabelsURLParams(labels) {
    const arr = [];
    labels.forEach(item => {
      const existed = arr.find(it => it.key === item.groupName);
      if (!existed) {
        arr.push({ key: item.groupName, value: [item.filterName] })
      } else {
        existed.value.push(item.filterName);
      }
    });
    return arr;
  }

  decodeLabelsURLParams(params) {
    return params
      .split(',')
      .map(filterStr => {
        const divided = filterStr.split(':');
        return {
          filterName: divided[1],
          groupName: divided[0],
          state: true
        }
      })
  }

  decodeMainMetric(main_metric) {
    console.log('main_metric - ', main_metric);
    return main_metric.length ? main_metric : '';
  }

  decodeColumns(columns) {
    return columns.length ? JSON.parse(columns) : '';
  }

  updateProfileParams(params: GetProfileBody) {
    this.profileParams.next(params);
  }

  updateObjectDetails(params: ObjectDetails) {
    this.profileInfo.details.next(params);
    this.currentDetails = params;
  }

  updateFingerprint(fingerprint: string) {
    this.profileInfo.fingerprint.next(fingerprint);
  }

  updateGroupBy(group_by: string) {
    this.group_by.next(group_by);
  }

  updateDefaultMainMetric(metric: string) {
    this.defaultMainMetric.next(metric)
  }

  updateDetailsByValue(details_by: string) {
    this.profileInfo.detailsBy.next(details_by);
  }

  get getProfileParams(): BehaviorSubject<GetProfileBody> {
    return this.profileParams;
  }

  get getProfileInfo(): ProfileInfo {
    return this.profileInfo;
  }

  get getGroupBy(): BehaviorSubject<string> {
    return this.group_by;
  }

  get getCurrentDetails(): ObjectDetails {
    return this.currentDetails;
  }

  get getDefaultMainMetric(): BehaviorSubject<string> {
    return this.defaultMainMetric
  }
}
