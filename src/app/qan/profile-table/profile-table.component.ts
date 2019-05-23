import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { QueryParams } from '../../core/core.component';
import { SelectOptionModel } from '../table-header-cell/modesl/select-option.model';
import { TableDataModel } from './models/table-data.model';
import { MetricModel } from './models/metric.model';
import { ProfileService } from '../../pmm-api-services/services/profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MetricsNamesService } from '../../pmm-api-services/services/metrics-names.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-qan-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() finishRender = new EventEmitter();
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild('qanTable') qanTable: ElementRef;
  @ViewChild('mainTableWrapper') mainTableWrapper: ElementRef;
  @ViewChildren('tableRows') tableRows: QueryList<any>;

  public scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: true
  };

  public iframeQueryParams: QueryParams;
  public tableData: TableDataModel[] | any;
  public currentParams: GetProfileBody;
  public defaultColumns: string[];
  public detailsBy: string;
  public fingerprint: string;
  public report$: Subscription;
  public metrics$: Subscription;
  public detailsBy$: Subscription;
  public tableRows$: Subscription;
  public fingerprint$: Subscription;
  public metrics: SelectOptionModel[];

  public selectPaginationConfig = [10, 50, 100];
  public paginationConfig = {
    id: 'qan-table-pagination',
    itemsPerPage: this.selectPaginationConfig[0],
    currentPage: 1,
    totalItems: 0,
  };

  public currentPage = this.paginationConfig.currentPage;
  public perPage = this.paginationConfig.itemsPerPage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qanProfileService: QanProfileService,
    private profileService: ProfileService,
    private metricsNamesService: MetricsNamesService,
  ) {
    this.defaultColumns = ['load', 'count', 'latency'];

    this.report$ = this.qanProfileService.getProfileParams.pipe(
      map(params => {
        this.currentParams = params;
        return this.removeDefaultColumns(params)
      }),
      switchMap(parsedParams => this.profileService.GetReport(parsedParams).pipe(
        catchError(err => {
          console.log('error - ', err);
          return of([])
        }),
        map(data => this.generateTableData(data)),
        catchError(err => {
          console.log('error - ', err);
          return of([])
        })
      )),
    ).subscribe(
      data => {
        this.tableData = data;
      },
      err => {
        console.log('error - ', err)
      });

    this.metrics$ = this.metricsNamesService.GetMetricsNames({}).pipe(
      map(metrics => this.generateMetricsNames(metrics))
    ).subscribe(metrics => this.metrics = metrics);

    this.detailsBy$ = this.qanProfileService.getProfileInfo.detailsBy.subscribe(details_by => this.detailsBy = details_by);
    this.fingerprint$ = this.qanProfileService.getProfileInfo.fingerprint.subscribe(fingerprint => this.fingerprint = fingerprint);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.tableRows.changes.subscribe(() => {
      this.ngForRendered();
      this.finishRender.emit(true);
    })
  }

  ngOnDestroy() {
    this.metrics$.unsubscribe();
    this.report$.unsubscribe();
    this.detailsBy$.unsubscribe();
    this.fingerprint$.unsubscribe();
    this.tableRows$.unsubscribe();
  }

  ngForRendered() {
    const tableHeight = this.qanTable.nativeElement.offsetHeight;
    this.componentRef.directiveRef.scrollToRight();
    this.mainTableWrapper.nativeElement.style.setProperty('--table-height', `${tableHeight}px`);
  }

  showDetails(filter_by, fingerPrint = '') {
    this.qanProfileService.updateFingerprint(fingerPrint);
    this.qanProfileService.updateDetailsByValue(filter_by);
    this.qanProfileService.updateObjectDetails({
      filter_by: filter_by,
      group_by: this.currentParams.group_by,
      labels: this.currentParams.labels,
      period_start_from: this.currentParams.period_start_from,
      period_start_to: this.currentParams.period_start_to
    });
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

  removeDefaultColumns(params) {
    const parsedParams = JSON.parse(JSON.stringify(params));
    parsedParams.columns = parsedParams.columns.filter(column => !this.defaultColumns.includes(column));
    return parsedParams
  }

  generateMetricsNames(metrics) {
    return Object.entries(metrics.data).map(metric => new SelectOptionModel(metric));
  }

  generateTableData(data) {
    this.paginationConfig.totalItems = data['total_rows'];
    this.paginationConfig.itemsPerPage = data['limit'];
    this.currentPage = this.paginationConfig.currentPage = data['offset'] ? data['offset'] / data['limit'] + 1 : 1;
    const tableRows = data['rows'].map(row => new TableDataModel(row));
    console.log('tableRows gened model- ', tableRows);

    tableRows.forEach(row => {
      row.metrics = row.metrics.filter(metric => this.currentParams.columns.includes(metric.metricName));
      row.metrics = this.mapOrder(row.metrics, this.currentParams.columns, 'metricName');
    });
    console.log('tableRows - ', tableRows);
    return tableRows;
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
    this.currentParams.offset = this.perPage * (event - 1);
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

  onChangePerPage(event) {
    this.currentParams.limit = this.perPage = this.paginationConfig.itemsPerPage = event;
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

}
