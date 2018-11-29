import {CoreComponent, QueryParams, QanError} from '../core/core.component';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
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

  @Input('data') queryProfile: Array<{}> = [];
  public profileTotal;
  public totalAmountOfQueries: number;
  public searchValue: string;
  public offset: any;
  public fromDate: string;
  public toDate: string;
  public isLoading: boolean;
  public isQuerySwitching: boolean;
  public noQueryError: string;
  public isFirstSeen: boolean;
  public isFirsSeenChecked = false;
  public testingVariable: boolean;
  public isSearchQuery = false;
  public selectedOption: any;
  public selectedPaginationOption: any = 10;
  public checkedColumns: any;
  public isMainColumn: boolean;
  public isRowsScanned: boolean;
  public isLoad = false;
  public isCount = false;
  public isLatency = false;
  public isSearchable = false;
  public page = 1;
  public selectPaginationConfig = [10, 50, 100];
  public paginationConfig = {
    itemsPerPage: this.selectedPaginationOption,
    currentPage: 1,
    totalItems: 0
  };

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected instanceService: InstanceService,
              public queryProfileService: QueryProfileService,
              private configService: QueryTableConfigurationService) {
    super(route, router, instanceService);
    this.configService.source.subscribe(items => {
      this.checkedColumns = items.filter((config: any) => !!config.checked);
      if (!!this.checkedColumns.length) {
        this.selectedOption = (!this.selectedOption || !this.checkedColumns.find(item => {
          return item.id === this.selectedOption.id
        })) ?
          this.checkedColumns[0] : this.selectedOption;
        this.checkEmptyColumn(this.selectedOption);
      } else {
        this.selectedOption = '';
      }
    });
  }

  checkEmptyColumn(selected) {
    const isEmptyColumn = !Object.keys(selected).length;
    this.isLoad = false;
    this.isCount = false;
    this.isLatency = false;

    switch (selected.id) {
      case 'load':
        this.isMainColumn = selected.sparkline || selected.value;
        this.isRowsScanned = selected.percentage;
        this.isLoad = !isEmptyColumn;
        break;
      case 'count':
        this.isMainColumn = selected.sparkline || selected.queriesPerSecond;
        this.isRowsScanned = selected.value || selected.percentage;
        this.isCount = !isEmptyColumn;
        break;
      case 'latency':
        this.isMainColumn = selected.sparkline || selected.value;
        this.isRowsScanned = selected.distribution;
        this.isLatency = !isEmptyColumn;
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
      this.getPage(this.paginationConfig.currentPage);
    }
  }

  checkFirstSeen(currentQuery) {
    this.isFirstSeen = moment.utc(currentQuery['FirstSeen']).valueOf() > moment.utc(this.fromUTCDate).valueOf();
    return this.isFirstSeen;
  }

  // public async loadQueries() {
  //   this.isQuerySwitching = true;
  //
  //   // clear after error
  //   this.noQueryError = '';
  //   this.queryProfile = [];
  //   this.searchValue = this.queryParams.search === 'null' ? '' : this.queryParams.search;
  //   const search = this.queryParams.search === 'null' && this.searchValue !== 'NULL' ? '' : this.queryParams.search;
  //   const firstSeen = this.queryParams.first_seen;
  //   this.offset = 0;
  //   try {
  //     const data = await this.queryProfileService
  //       .getQueryProfile(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);
  //     if (data.hasOwnProperty('Error') && data['Error'] !== '') {
  //       this.testingVariable = true;
  //       throw new QanError('Queries are not available.');
  //     }
  //     this.totalAmountOfQueries = data['TotalQueries'];
  //     this.paginationConfig.totalItems = this.totalAmountOfQueries;
  //
  //     if (this.totalAmountOfQueries > 0) {
  //       this.queryProfile = data['Query'];
  //       // this.countDbQueries();
  //       this.profileTotal = this.queryProfile[0];
  //     }
  //   } catch (err) {
  //     this.noQueryError = err.name === QanError.errType ? err.message : queryProfileError;
  //   } finally {
  //     this.isQuerySwitching = false;
  //   }
  // }

  public async getPage(page: number, selectOption?: number) {
    this.noQueryError = '';
    this.searchValue = this.queryParams.search === 'null' ? '' : this.queryParams.search;
    this.offset = page * 10 - 10;

    const search = this.queryParams.search === 'null' && this.searchValue !== 'NULL' ? '' : this.queryParams.search;
    const firstSeen = this.queryParams.first_seen;

    try {
      const data = await this.queryProfileService
        .getQueryProfile(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);
      if (data.hasOwnProperty('Error') && data['Error'] !== '') {
        throw new QanError('Queries are not available.');
      }
      this.paginationConfig.totalItems = data['TotalQueries'];
      if (this.paginationConfig.totalItems > 0) {
        this.paginationConfig.currentPage = page;
        // this.queryProfile = !selectOption ? data['Query'] : [...this.queryProfile, ...data['Query']]; // ?????????
        this.queryProfile = data['Query']; // ?????????
        this.profileTotal = page === 1 ? this.queryProfile[0] : data['Query'].shift();
      }
    } catch (err) {
      this.noQueryError = err.name === QanError.errType ? err.message : queryProfileError;
    }
  }

  public rowsPerTable(selectOption) {
    this.queryProfile = [];
    this.paginationConfig.itemsPerPage = this.selectedPaginationOption;
    // for (let count = 0; count < selectOption; count += 10) {
    //   this.pushNewRow(count); // 0, 10, 20, 30, 40
    // }
    Promise.all([this.getPage(1, 0), this.getPage(1, 10), this.getPage(1, 20), this.getPage(1, 30), this.getPage(1, 40)]);
  }

  // public async loadMoreQueries() {
  //   this.isLoading = true;
  //   this.offset = this.offset + 10;
  //   const dbServerUUID = this.dbServer.UUID;
  //   const search =
  //     this.queryParams.search === 'null' &&
  //     this.searchValue !== 'NULL' && this.searchValue !== 'null' ? '' : this.queryParams.search;
  //   const firstSeen = this.queryParams.first_seen;
  //   const data = await this.queryProfileService
  //     .getQueryProfile(dbServerUUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);
  //
  //   const _ = data['Query'].shift();
  //   for (const q of data['Query']) {
  //     this.queryProfile.push(q);
  //   }
  //   this.countDbQueries();
  //   this.isLoading = false;
  // }

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
