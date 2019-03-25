import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CoreComponent, QueryParams} from '../../core/core.component';
import {ActivatedRoute, Router} from '@angular/router';
import {InstanceService} from '../../core/services/instance.service';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';
import {TableDataModel} from './models/table-data.model';
import {MetricModel} from './models/metric.model';
import {QanTableService} from './qan-table.service';
import {ProfileService} from '../../inventory-api/services/profile.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {map} from 'rxjs/operators';
import {MetricsNamesService} from '../../inventory-api/services/metrics-names.service';

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

  public queryParams: QueryParams;
  public measurement: string;
  public queryProfile: Array<{}>;
  public tableData: TableDataModel[];
  public totalRows: number;
  public queries: any;
  public report$: Subscription;
  public metrics$;
  public metrics;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected instanceService: InstanceService,
    private qanTableService: QanTableService,
    private profileService: ProfileService,
    private metricsNamesService: MetricsNamesService
  ) {
    // this.tableData = this.qanTableService.getTableData();
    this.metrics$ = this.metricsNamesService.GetMetricsNames({}).pipe(
      map(metrics => metrics.data)
    ).subscribe(metrics => this.metrics = Object.entries(metrics).map(metric => new SelectOptionModel(metric)))
  }

  ngOnInit() {
    this.report$ = this.profileService.GetReport({
      'period_start_from': '2019-01-01 00:00:00',
      'period_start_to': '2019-01-01 01:00:00',
      'order_by': 'num_queries',
      'columns': ['query_time', 'bytes_sent', 'lock_time', 'rows_sent']
    }).subscribe(item => {
      this.tableData = item.rows.map(row => new TableDataModel(row));
      this.totalRows = item.total_rows;
    });
  }

  ngOnDestroy() {
    if (this.report$) {
      this.report$.unsubscribe();
    }
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
