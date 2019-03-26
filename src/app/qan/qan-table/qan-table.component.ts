import {Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {QueryParams} from '../../core/core.component';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';
import {TableDataModel} from './models/table-data.model';
import {MetricModel} from './models/metric.model';
import {ProfileService} from '../../inventory-api/services/profile.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {filter, map} from 'rxjs/operators';
import {MetricsNamesService} from '../../inventory-api/services/metrics-names.service';
import {GetProfileBody, QanTableService} from './qan-table.service';
import {ParseQueryParamDatePipe} from '../../shared/parse-query-param-date.pipe';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';

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
  public defParams: GetProfileBody;
  private parseQueryParamDatePipe = new ParseQueryParamDatePipe();
  public getReportParams = {} as GetProfileBody;
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
    // this.subscribeToRouter();
    // this.routerSubscription$ = this.router.events.pipe(
    //   filter((e: any) => e instanceof NavigationEnd)
    // ).subscribe((item) => {
    //   console.log('item - ', item);
    //   this.iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
    //   this.setProfileParams();
    //   console.log('iframeQueryParams - ', this.iframeQueryParams);
    //   console.log('getReportParams - ', this.getReportParams);
    // });

    this.metrics$ = this.metricsNamesService.GetMetricsNames({})
      .pipe(map(metrics => metrics.data))
      .subscribe(metrics =>
        this.metrics = Object.entries(metrics).map(metric => new SelectOptionModel(metric)));

    this.report$ = this.profileService.GetReport({
      'period_start_from': '2019-01-01 00:00:00',
      'period_start_to': '2019-01-01 01:00:00',
      'order_by': 'num_queries'
    }).subscribe(item => {
      this.tableData = item.rows.map(row => new TableDataModel(row));
      this.totalRows = item.total_rows;
    });

    this.qanTableService.groupBySource.subscribe(value => {
      console.log('groupByValue - ', value);
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.metrics.unsubscribe();
    this.report$.unsubscribe();
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

  subscribeToRouter() {

  }

  setProfileParams() {
    this.from = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.from, 'from');
    this.to = this.parseQueryParamDatePipe.transform(this.iframeQueryParams.to, 'to');

    this.getReportParams.period_start_from = this.from.utc().format('YYYY-MM-DD HH:mm:ss');
    this.getReportParams.period_start_to = this.to.utc().format('YYYY-MM-DD HH:mm:ss');

    this.prevGetReportParams = Object.assign({}, this.getReportParams);
  }
}
