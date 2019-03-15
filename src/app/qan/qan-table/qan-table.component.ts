import {Component, Input, OnInit} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CoreComponent, QueryParams} from '../../core/core.component';
import {ActivatedRoute, Router} from '@angular/router';
import {InstanceService} from '../../core/services/instance.service';
import * as moment from 'moment';

@Component({
  selector: 'app-qan-table',
  templateUrl: './qan-table.component.html',
  styleUrls: ['./qan-table.component.scss']
})
export class QanTableComponent extends CoreComponent implements OnInit {
  @Input() tableData: any;

  public scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: false
  };

  public queryTypes = ['Query', 'Schema', 'Server', 'Database', 'User', 'Host'];
  public selectedQueryType: string;

  public queryProfile: Array<{}>;
  public isFirstSeen: boolean;
  public mockQueryProfile = {};

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected instanceService: InstanceService,
  ) {
    super(route, router, instanceService);
    this.selectedQueryType = this.queryTypes[0];
  }

  ngOnInit() {
    console.log('tableData - ', this.tableData);
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
  composeQueryParamsForGrid(queryID: string | null): QueryParams {
    const queryParams: QueryParams = Object.assign({}, this.queryParams);
    queryParams.queryID = queryID || 'TOTAL';
    return queryParams;
  }

  onChangeParams(params): void {
  }
}
