import {Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {QueryParams} from '../../core/core.component';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';
import {TableDataModel} from './models/table-data.model';
import {MetricModel} from './models/metric.model';
import {ProfileService} from '../../inventory-api/services/profile.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {filter, flatMap, map, mergeMapTo, switchMap} from 'rxjs/operators';
import {MetricsNamesService} from '../../inventory-api/services/metrics-names.service';
import {GetProfileBody, QanTableService} from './qan-table.service';
import {ParseQueryParamDatePipe} from '../../shared/parse-query-param-date.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';

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
      .pipe(switchMap(params => this.profileService.GetReport(params)))
      .subscribe(data => {
        console.log(data);
        this.tableData = data.rows.map(row => new TableDataModel(row));
        this.totalRows = data.total_rows;
      });

    this.qanTableService.groupBySource.subscribe(value => {
      this.getReportParams.group_by = value;
      this.qanTableService.setProfileParams(this.getReportParams);
    });
  }

  ngOnInit() {
    this.setTimeRange();
  }

  ngOnDestroy() {
    this.metrics.unsubscribe();
    this.report$.unsubscribe();
  }

  setTimeRange() {
    this.iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
    this.from = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.from, 'from');
    this.to = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.to, 'to');

    this.getReportParams.period_start_from = this.from.utc().format('YYYY-MM-DD HH:mm:ss');
    this.getReportParams.period_start_to = this.to.utc().format('YYYY-MM-DD HH:mm:ss');
    this.getReportParams.order_by = 'num_queries';
    this.getReportParams.group_by = 'queryid';
    this.getReportParams.columns = ['query_time', 'bytes_sent', 'lock_time', 'rows_sent'];
    console.log('this.getReportParams - ', this.getReportParams);
    this.qanTableService.setProfileParams(this.getReportParams);
  }


  addColumn() {
    this.tableData.forEach(query => query.metrics.push(new MetricModel()));
    setTimeout(() => this.componentRef.directiveRef.scrollToRight(), 0);
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
