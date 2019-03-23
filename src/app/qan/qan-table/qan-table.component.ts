import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CoreComponent, QueryParams} from '../../core/core.component';
import {ActivatedRoute, Router} from '@angular/router';
import {InstanceService} from '../../core/services/instance.service';
import * as moment from 'moment';
import {SelectOptionModel} from '../qan-table-header-cell/modesl/select-option.model';
import {TableDataModel} from './models/table-data.model';
import {MetricModel} from './models/metric.model';
import {QanTableService} from './qan-table.service';

@Component({
  selector: 'app-qan-table',
  templateUrl: './qan-table.component.html',
  styleUrls: ['./qan-table.component.scss']
})
export class QanTableComponent extends CoreComponent implements OnInit, OnChanges {
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  public scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: false
  };

  public queryColumns = {
    data: {
      count: 'Count',
      latancy: 'Latancy',
      load: 'Load',
    }
  };
  public selectOptions: any;
  public listColumns = this.queryColumns.data;


  public queryTypes = ['Query', 'Schema', 'Server', 'Database', 'User', 'Host'];
  public selectedQueryType: string;
  public yKey: string;
  public measurement: string;
  public tableDataSubscription$: any;

  public queryProfile: Array<{}>;
  public isFirstSeen: boolean;

  public tableData: any;

  public totalRows: number;
  public queries: any;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected instanceService: InstanceService,
    private qanTableService: QanTableService
  ) {
    super(route, router, instanceService);
    this.selectedQueryType = this.queryTypes[0];
    this.qanTableService.getConfigs();
    this.tableDataSubscription$ = this.qanTableService.source.subscribe( tableD => {
      console.log(tableD.filter(row => row.metrics = row.metrics.filter(item => !item.isDeleted)));
      this.tableData = tableD;
    });
  }

  ngOnInit() {
    const entriesArray = Object.entries(this.listColumns);
    this.selectOptions = entriesArray.map(item => new SelectOptionModel(item));
  }

  ngOnChanges() {
  }

  addColumn() {
    this.tableData.forEach(query => query.metrics.push(new MetricModel()));
    this.qanTableService.setConfig(this.tableData);
    setTimeout(() => this.componentRef.directiveRef.scrollToRight(), 0);
  }

  /**
   * Check if current query is first seen for current date
   * @param currentQuery - query in main qan-table
   */
  checkFirstSeen(currentQuery) {
    this.isFirstSeen = moment.utc(currentQuery['FirstSeen']).valueOf() > moment.utc(this.fromUTCDate).valueOf();
    return this.isFirstSeen;
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


  onChangeParams(params): void {
  }
}
