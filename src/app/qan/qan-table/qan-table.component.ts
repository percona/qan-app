import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { QueryParams } from '../../core/core.component';
import { SelectOptionModel } from '../qan-table-header-cell/modesl/select-option.model';
import { TableDataModel } from './models/table-data.model';
import { MetricModel } from './models/metric.model';
import { ProfileService } from '../../inventory-api/services/profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, filter, map, retryWhen, switchMap } from 'rxjs/operators';
import { MetricsNamesService } from '../../inventory-api/services/metrics-names.service';
import { GetProfileBody, QanTableService } from './qan-table.service';
import { ParseQueryParamDatePipe } from '../../shared/parse-query-param-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { throwError } from 'rxjs/internal/observable/throwError';

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
  public profileParams: GetProfileBody;
  public tableData: TableDataModel[];
  public defaultColumns: string[];
  public report$: Subscription;
  public metrics$: Subscription;
  public metrics: SelectOptionModel[];
  private parseQueryParamDatePipe = new ParseQueryParamDatePipe();

  private changes: MutationObserver;

  public selectedPaginationOption: any = 10;

  public page = 1;
  public selectPaginationConfig = [10, 50, 100];
  public paginationConfig = {
    id: 'qan-table-pagination',
    itemsPerPage: this.selectedPaginationOption,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private metricsNamesService: MetricsNamesService,
    private qanTableService: QanTableService
  ) {
    this.profileParams = this.qanTableService.getProfileParamsState;
    this.defaultColumns = this.qanTableService.getDefaultColumns;

    this.metrics$ = this.metricsNamesService.GetMetricsNames({})
      .pipe(map(metrics => metrics.data))
      .subscribe(metrics => this.metrics = Object.entries(metrics).map(metric => new SelectOptionModel(metric)));

    this.report$ = this.qanTableService.profileParamsSource
      .pipe(
        map(params => {
          const parsedParams = JSON.parse(JSON.stringify(params));
          // Remove default columns
          parsedParams.columns = parsedParams.columns.filter(column => !this.defaultColumns.includes(column));
          return parsedParams
        }),
        switchMap(parsedParams => this.profileService.GetReport(parsedParams)
          .pipe(
            catchError(err => {
              console.log('catch err - ', err);
              return throwError(err)
            }),
          )
        ),
        retryWhen(error => error)
      )
      .subscribe(
        data => {
          this.setTableData(data);
        }
      );
  }

  ngOnInit() {
    this.setTimeRange();
  }

  ngOnDestroy() {
    this.metrics$.unsubscribe();
    this.report$.unsubscribe();
  }

  mapOrder(array, order, key) {
    array.sort((a, b) => {
      const A = a[key];
      const B = b[key];
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });

    return array;
  };

  setTimeRange() {
    this.iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
    const from = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.from, 'from');
    const to = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.to, 'to');
    const fromUTC = from.utc().format('YYYY-MM-DDTHH:mm:ssZ');
    const toUTC = to.utc().format('YYYY-MM-DDTHH:mm:ssZ');

    this.profileParams.period_start_from = fromUTC;
    this.profileParams.period_start_to = toUTC;
    this.qanTableService.updateProfileParams(this.profileParams);
    this.qanTableService.updateTimeRange({ period_start_from: fromUTC, period_start_to: toUTC })
  }

  setTableData(data) {
    this.tableData = data['rows'].map(row => new TableDataModel(row));
    this.tableData.forEach(row => {
      row.metrics = row.metrics.filter(metric => this.profileParams.columns.includes(metric.metricName));
      row.metrics = this.mapOrder(row.metrics, this.profileParams.columns, 'metricName');
    });
    this.paginationConfig.totalItems = data['total_rows'];
    this.paginationConfig.currentPage = data['offset'] || 1;
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

  pageChanged(event) {
    this.profileParams.offset = event;
    this.qanTableService.updateProfileParams(this.profileParams);
    console.log('event - ', event);
    console.log('paginationConfig - ', this.paginationConfig);
  }

  onChangePerPage(event) {
    this.profileParams.limit = event;
    this.qanTableService.updateProfileParams(this.profileParams);
    console.log('perPage - ', event);
  }

  onDomChange(event) {
    console.log('event - ', event);
  }

}
