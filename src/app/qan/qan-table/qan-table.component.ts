import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { QueryParams } from '../../core/core.component';
import { SelectOptionModel } from '../qan-table-header-cell/modesl/select-option.model';
import { TableDataModel } from './models/table-data.model';
import { MetricModel } from './models/metric.model';
import { ProfileService } from '../../inventory-api/services/profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, retryWhen } from 'rxjs/operators';
import { MetricsNamesService } from '../../inventory-api/services/metrics-names.service';
import { GetProfileBody, QanTableService } from './qan-table.service';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { error } from '@angular/compiler/src/util';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

@Component({
  selector: 'app-qan-table',
  templateUrl: './qan-table.component.html',
  styleUrls: ['./qan-table.component.scss']
})
export class QanTableComponent implements OnInit, OnDestroy {
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  public scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: false
  };

  public iframeQueryParams: QueryParams;
  public measurement: string;
  public queryProfile: Array<{}>;
  public tableData: TableDataModel[];
  public previousTableData: TableDataModel[];
  public totalRows: number;
  public queries: any;
  public report$: Subscription;
  public metrics$;
  public metrics;
  private parseQueryParamDatePipe = new ParseQueryParamDatePipe();
  public getReportParams: GetProfileBody = {};
  public prevGetReportParams = {} as GetProfileBody;
  public groupBy: string;

  public from;
  public to;
  private routerSubscription$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private metricsNamesService: MetricsNamesService,
    private qanTableService: QanTableService
  ) {
    this.metrics$ = this.metricsNamesService.GetMetricsNames({})
      .pipe(map(metrics => metrics.data))
      .subscribe(metrics => this.metrics = Object.entries(metrics).map(metric => new SelectOptionModel(metric)));

    this.report$ = this.qanTableService.profileParamsSource
      .pipe(
        mergeMap(params => this.profileService.GetReport(params)),
        retryWhen(err => { console.log('err - ', err); return err }),
      )
      .subscribe(
        data => {
          console.log('data - ', data);
          if (!data.hasOwnProperty('error')) {
            this.tableData = data['rows'].map(row => new TableDataModel(row));
            this.tableData.forEach(row => {
              row.metrics = this.mapOrder(row.metrics, this.qanTableService.getProfileParamsState.columns, 'metricName')
            });
            this.previousTableData = JSON.parse(JSON.stringify(this.tableData));
            this.totalRows = data['total_rows'];
          } else {
            console.log('Here is error - ', data);
            // this.tableData = this.previousTableData;
          }
        },
        err => console.log('error - ', err),
        () => console.log('complete')
      );

    this.qanTableService.groupBySource.subscribe(value => {
      this.getReportParams.group_by = value;
      this.qanTableService.setProfileParamsState = this.getReportParams;
      this.qanTableService.setProfileParams(this.getReportParams);
    });
  }

  ngOnInit() {
    this.setTimeRange();
  }

  mapOrder(array, order, key) {
    array.sort(function(a, b) {
      const A = a[key], B = b[key];
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });

    return array;
  };

  ngOnDestroy() {
    this.metrics.unsubscribe();
    this.report$.unsubscribe();
  }

  setTimeRange() {
    this.iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
    this.from = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.from, 'from');
    this.to = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.to, 'to');

    this.qanTableService.getProfileParamsState.period_start_from = this.from.utc().format('YYYY-MM-DDTHH:mm:ssZ');
    this.qanTableService.getProfileParamsState.period_start_to = this.to.utc().format('YYYY-MM-DDTHH:mm:ssZ');
    this.qanTableService.setProfileParams(this.qanTableService.getProfileParamsState);
  }


  addColumn() {
    this.tableData.forEach(query => query.metrics.push(new MetricModel()));
    setTimeout(() => this.componentRef.directiveRef.scrollToRight(), 100);
  }

  /**
   * set timezone based on given query parameter.
   */
  setTimeZoneFromParams() {
    const tz = this.iframeQueryParams.tz || 'browser';
    const expireDays = moment().utc().add(7, 'y').toString();
    document.cookie = `timezone=${tz}; expires=${expireDays}; path=/`;
  }

  setThemeFromParams() {
    const theme = this.iframeQueryParams.theme || '';
    if (theme) {
      const expireDays = moment().utc().add(7, 'y').toString();
      document.cookie = `theme=app-theme-${theme}; expires=${expireDays}; path=/`;
    }
  }

  // /**
  //  * Set router parameters if query is checked in main qan-table
  //  * @param queryID - checked queries' id
  //  * @return query params of current query
  //  */
  // composeQueryParamsForGrid(queryID: string = ''): QueryParams {
  //   const queryParams: QueryParams = Object.assign({}, this.queryParams);
  //   queryParams.queryID = queryID || 'TOTAL';
  //   return queryParams;
  // }
  //
  // onChangeParams(params) {
  //
  // }

}
