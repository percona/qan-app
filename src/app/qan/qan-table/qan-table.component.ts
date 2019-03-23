import {Component, OnInit, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CoreComponent, QueryParams} from '../../core/core.component';
import {ActivatedRoute, Router} from '@angular/router';
import {InstanceService} from '../../core/services/instance.service';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';
import {TableDataModel} from './models/table-data.model';
import {MetricModel} from './models/metric.model';
import {QanTableService} from './qan-table.service';

@Component({
  selector: 'app-qan-table',
  templateUrl: './qan-table.component.html',
  styleUrls: ['./qan-table.component.scss']
})
export class QanTableComponent extends CoreComponent implements OnInit {
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  public scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: false
  };

  public queryParams: QueryParams;
  public measurement: string;
  public queryProfile: Array<{}>;
  public tableData: Array<TableDataModel>;
  public queries: any;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected instanceService: InstanceService,
    private qanTableService: QanTableService
  ) {
    super(route, router, instanceService);
    this.tableData = this.qanTableService.getTableData();
  }

  ngOnInit() {
  }

  addColumn() {
    this.tableData.forEach(query => query.metrics.push(new MetricModel()));
    setTimeout(() => this.componentRef.directiveRef.scrollToRight(), 0);
  }

  /**
   * Set router parameters if query is checked in main qan-table
   * @param queryID - checked queries' id
   * @return query params of current query
   */
  composeQueryParamsForGrid(queryID: string = ''): QueryParams {
    const queryParams: QueryParams = Object.assign({}, this.queryParams);
    queryParams.queryID = queryID || 'TOTAL';
    return queryParams;
  }

  onChangeParams(params) {

  }
}
