import {CoreComponent, QueryParams, QanError} from '../core/core.component';
import {Component, OnInit} from '@angular/core';
import {InstanceService} from '../core/services/instance.service';
import {QueryProfileService} from './query-profile.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {QueryTableConfigService} from '../core/services/query-table-config.service';

const queryProfileError = 'No data. Please check pmm-client and database configurations on selected instance.';

@Component({
  moduleId: module.id,
  templateUrl: 'query-profile.component.html',
  styleUrls: ['./query-profile.component.scss'],
})
export class QueryProfileComponent extends CoreComponent implements OnInit {

  public queryProfile: Array<{}>;
  public profileTotal;
  public offset: number;
  public totalAmountOfQueries: number;
  public leftInDbQueries: number;
  public searchValue: string;
  public fromDate: string;
  public toDate: string;
  public quantityDbQueriesMessage: string;
  public isLoading: boolean;
  public isQuerySwitching: boolean;
  public noQueryError: string;
  public isFirstSeen: boolean;
  public isFirstSeenChecked = false;
  public isQueryDetails = false;
  public isCropped = false;
  public testingVariable: boolean;
  public isSearchQuery = false;
  public isQueryCol = true;
  public isRowsScannedCol = true;
  public defaultSelected = {name: '', columns: []};
  public selected = this.defaultSelected;
  public selectedConfig = {};
  public configs: any;

  public currentColumn: string;
  public yKey: string;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected instanceService: InstanceService,
              public queryProfileService: QueryProfileService,
              private configService: QueryTableConfigService) {
    super(route, router, instanceService);
    this.configService.source.subscribe(items => {
      if (!items.length) {
        return;
      }

      this.configs = items.filter((config: any) => !!config.checked);
      const firstElement = this.configs.length ? this.configs[0] : this.defaultSelected;
      this.selected = this.configs.find(item => item.name === this.selected.name) ? this.selected : firstElement;
      if (this.selected && this.selected.name) {
        this.onConfigChanges(this.selected.name);
      } else {
        this.isQueryCol = false;
        this.isRowsScannedCol = false;
      }
    });
  }

  ngOnInit() {
    this.toggleQueryDetails(!!this.queryParams.queryID)
  }

  onChangeParams(params) {
    // checks changing tz
    this.fromDate = moment(this.from).format('llll');
    this.toDate = moment(this.to).format('llll');

    // only if host, from and to are different from prev router - load queries.
    if (!this.previousQueryParams ||
      this.previousQueryParams['var-host'] !== this.queryParams['var-host'] ||
      this.previousQueryParams.from !== this.queryParams.from ||
      this.previousQueryParams.to !== this.queryParams.to ||
      this.previousQueryParams.search !== this.queryParams.search ||
      this.previousQueryParams.first_seen !== this.queryParams.first_seen ||
      this.previousQueryParams.tz !== this.queryParams.tz) {
      this.loadQueries();
    }
  }

  checkFirstSeen(currentQuery) {
    this.isFirstSeen = moment.utc(currentQuery['FirstSeen']).valueOf() > moment.utc(this.fromUTCDate).valueOf();
    return this.isFirstSeen;
  }

  public async loadQueries() {
    this.isQuerySwitching = true;

    // clear after error
    this.noQueryError = '';
    this.totalAmountOfQueries = this.leftInDbQueries = 0;
    this.queryProfile = [];
    this.searchValue = this.queryParams.search === 'null' ? '' : this.queryParams.search;
    const search = this.queryParams.search === 'null' && this.searchValue !== 'NULL' ? '' : this.queryParams.search;
    const firstSeen = this.queryParams.first_seen;
    this.offset = 0;
    try {
      const data = await this.queryProfileService
        .getQueryProfile(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);
      if (data.hasOwnProperty('Error') && data['Error'] !== '') {
        this.testingVariable = true;
        throw new QanError('Queries are not available.');
      }
      this.totalAmountOfQueries = data['TotalQueries'];
      if (this.totalAmountOfQueries > 0) {
        this.queryProfile = data['Query'];
        this.countDbQueries();
        this.profileTotal = this.queryProfile[0];
      }
    } catch (err) {
      this.noQueryError = err.name === QanError.errType ? err.message : queryProfileError;
    } finally {
      this.isQuerySwitching = false;
    }
  }

  public async loadMoreQueries() {
    this.isLoading = true;
    this.offset = this.offset + 10;
    const dbServerUUID = this.dbServer.UUID;
    const search =
      this.queryParams.search === 'null' &&
      this.searchValue !== 'NULL' && this.searchValue !== 'null' ? '' : this.queryParams.search;
    const firstSeen = this.queryParams.first_seen;
    const data = await this.queryProfileService
      .getQueryProfile(dbServerUUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);

    const _ = data['Query'].shift();
    for (const q of data['Query']) {
      this.queryProfile.push(q);
    }
    this.countDbQueries();
    this.isLoading = false;
  }

  countDbQueries() {
    this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
    this.quantityDbQueriesMessage = this.leftInDbQueries > 0 ?
      `Load next ${this.leftInDbQueries > 10 ? 10 : this.leftInDbQueries} queries` :
      'No more queries for selected time range';
  }

  composeQueryParamsForGrid(queryID: string | null): QueryParams {
    const queryParams: QueryParams = Object.assign({}, this.queryParams);
    queryParams.queryID = queryID || 'TOTAL';
    return queryParams;
  }

  search() {
    this.isSearchQuery = true;
    const params: QueryParams = Object.assign({}, this.queryParams);
    if (!!this.searchValue) {
      params.search = this.searchValue === 'null' ? 'NULL' : this.searchValue;
      this.testingVariable = true;
    } else {
      this.testingVariable = false;
      delete params.search;
    }
    delete params.queryID;
    this.router.navigate(['profile'], {queryParams: params});
  }

  getFirstSeen(isFirstSeenChecked = false) {
    this.isQuerySwitching = true;
    this.isFirstSeenChecked = isFirstSeenChecked;
    const params: QueryParams = Object.assign({}, this.queryParams);
    if (isFirstSeenChecked) {
      this.testingVariable = true;
      params.first_seen = this.isFirstSeenChecked;
    } else {
      this.testingVariable = false;
      delete params.first_seen;
    }
    delete params.queryID;
    this.router.navigate(['profile'], {queryParams: params});
    this.isQuerySwitching = false;
  }

  onConfigChanges(name) {
    this.selectedConfig = {};
    this.selected.columns.forEach(column =>
      this.selectedConfig[column.name.toLocaleLowerCase().replace(/\s+/g, '')] = column.value);
    this.currentColumn = name;
    this.setCurrentSparkline(name, this.selectedConfig);
  }

  setCurrentSparkline(name, config) {
    switch (name) {
      case 'Load':
        this.isQueryCol = config.sparkline || config.value;
        this.isRowsScannedCol = config.percentage;
        this.yKey = 'Query_load';
        break;
      case 'Count':
        this.isQueryCol = config.sparkline || config.queriespersecond;
        this.isRowsScannedCol = config.value || config.percentage;
        this.yKey = 'Query_count';
        break;
      case 'Avg Latency':
        this.isQueryCol = config.sparkline || config.value;
        this.isRowsScannedCol = config.distribution;
        this.yKey = 'Query_time_avg';
        break;
    }
  }

  toggleQueryDetails(isQueryDetails = true) {
    this.isQueryDetails = isQueryDetails;
  }
}
