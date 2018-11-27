import {CoreComponent, QueryParams, QanError} from '../core/core.component';
import {Component, OnChanges, OnInit} from '@angular/core';
import {InstanceService} from '../core/instance.service';
import {QueryProfileService} from './query-profile.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {QueryTableConfigurationService} from './query-table-configuration.service';

const queryProfileError = 'No data. Please check pmm-client and database configurations on selected instance.';

@Component({
  moduleId: module.id,
  templateUrl: 'query-profile.component.html',
  styleUrls: ['./query-profile.component.scss'],
})
export class QueryProfileComponent extends CoreComponent {

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
  public isFirsSeenChecked = false;
  public testingVariable: boolean;
  public isSearchQuery = false;
  public selectedOption: any;
  public checkedColumns: any;
  public isMainColumn: boolean;
  public isRowsScanned: boolean;
  public isLoad = false;
  public isCount = false;
  public isLatency = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected instanceService: InstanceService,
              public queryProfileService: QueryProfileService,
              private configService: QueryTableConfigurationService) {
    super(route, router, instanceService);
    this.configService.source.subscribe(items => {
      this.checkedColumns = items.filter((config: any) => !!config.checked);
      if (!!this.checkedColumns.length) {
        this.selectedOption = (!this.selectedOption || !this.checkedColumns.find(item => {return item.id === this.selectedOption.id})) ?
          this.checkedColumns[0] : this.selectedOption;
        this.checkEmptyColumn(this.selectedOption);
      } else {
        this.selectedOption = '';
      }
    });
  }

  checkEmptyColumn(selected) {
    const isEmptyColumn = !Object.keys(selected).length;

    switch (selected.id) {
      case 'load':
        this.isMainColumn = selected.sparkline || selected.value;
        this.isRowsScanned = selected.percentage;
        this.isLoad = !isEmptyColumn;
        this.isCount = false;
        this.isLatency = false;
        break;
      case 'count':
        this.isMainColumn = selected.sparkline || selected.queriesPerSecond;
        this.isRowsScanned = selected.value || selected.percentage;
        this.isCount = !isEmptyColumn;
        this.isLoad = false;
        this.isLatency = false;
        break;
      case 'latency':
        this.isMainColumn = selected.sparkline || selected.value;
        this.isRowsScanned = selected.distribution;
        this.isLatency = !isEmptyColumn;
        this.isLoad = false;
        this.isCount = false;
        break;
    }
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

  getFirstSeen(isFirsSeenChecked = false) {
    this.isQuerySwitching = true;
    this.isFirsSeenChecked = isFirsSeenChecked;
    const params: QueryParams = Object.assign({}, this.queryParams);
    if (isFirsSeenChecked) {
      this.testingVariable = true;
      params.first_seen = this.isFirsSeenChecked;
    } else {
      this.testingVariable = false;
      delete params.first_seen;
    }
    delete params.queryID;
    this.router.navigate(['profile'], {queryParams: params});
    this.isQuerySwitching = false;
  }
}
