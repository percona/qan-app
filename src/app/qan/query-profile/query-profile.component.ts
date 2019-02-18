import {CoreComponent, QueryParams, QanError} from '../../core/core.component';
import {Component, Input, OnInit} from '@angular/core';
import {InstanceService} from '../../core/services/instance.service';
import {QueryProfileService} from './query-profile.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {FilterSearchService} from '../../core/services/filter-search.service';
import {QanEditColumnService} from '../qan-edit-column/qan-edit-column.service';

const queryProfileError = 'No data. Please check pmm-client and database configurations on selected instance.';

@Component({
  moduleId: module.id,
  templateUrl: 'query-profile.component.html',
  styleUrls: ['./query-profile.component.scss'],
})
export class QueryProfileComponent extends CoreComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('data') queryProfile: Array<{}> = [];
  public isFilterMenu = false;
  public isEditColumnMenu = false;
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
  public isFirstSeenChecked = false;
  public isQueryDetails = false;
  public testingVariable: boolean;
  public isSearchQuery = false;
  public selectedOption: any;
  public selectedPaginationOption: any = 10;
  public isQueryCol = true;
  public isRowsScannedCol = true;

  public defaultSelectedColumn = {name: '', columns: []};
  public selectedColumn = this.defaultSelectedColumn;
  public previousColumn = this.selectedColumn;
  public columnsConfig: any;
  public selectedColumnConfig = {};

  queryTypes = ['Query', 'Server', 'Host'];
  selectedQueryType = this.queryTypes[0];
  previousQueryType = this.selectedQueryType;

  public currentColumn: string;
  public yKey: string;
  public measurement: string;

  public isSearchable = false;
  public page = 1;
  public selectPaginationConfig = [10, 50, 100];
  public paginationConfig = {
    itemsPerPage: this.selectedPaginationOption,
    currentPage: 1,
    totalItems: 0
  };
  public paginationControlsConfig = {
    isAutoHide: true,
    previousLabel: '',
    nextLabel: ''
  };

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected instanceService: InstanceService,
              public queryProfileService: QueryProfileService,
              private configService: QanEditColumnService,
              private filterSearchService: FilterSearchService) {
    super(route, router, instanceService);
    this.configService.source.subscribe(items => {
      if (!items.length) {
        return;
      }

      this.columnsConfig = items.filter((config: any) => !!config.checked);
      const firstElement = this.columnsConfig.length ? this.columnsConfig[0] : this.defaultSelectedColumn;
      this.selectedColumn = this.columnsConfig.find(item => item.name === this.selectedColumn.name) ? this.selectedColumn : firstElement;
      if (this.selectedColumn && this.selectedColumn.name) {
        this.onColumnConfigChanges(this.selectedColumn);
      } else {
        this.isQueryCol = false;
        this.isRowsScannedCol = false;
      }
    });
  }

  ngOnInit() {
    this.toggleQueryDetails(this.queryParams.queryID !== 'null');
  }

  /**
   * Load query if params have been changed
   * @param params - current link params
   */
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
      this.getPage(this.paginationConfig.currentPage, this.selectedPaginationOption);
    }
  }

  /**
   * Check if current query is first seen for current date
   * @param currentQuery - query in main qan-table
   */
  checkFirstSeen(currentQuery) {
    this.isFirstSeen = moment.utc(currentQuery['FirstSeen']).valueOf() > moment.utc(this.fromUTCDate).valueOf();
    return this.isFirstSeen;
  }

  // /**
  //  * Load first 10 queries for main qan-table
  //  */
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

  public async getPage(page: number, selectOption: number) {
    this.noQueryError = '';
    this.searchValue = this.queryParams.search === 'null' ? '' : this.queryParams.search;
    this.offset = page * 10 - 10;

    const search = this.queryParams.search === 'null' && this.searchValue !== 'NULL' ? '' : this.queryParams.search;
    const firstSeen = this.queryParams.first_seen;
    const option = selectOption - 10;

    try {
      const data = await this.queryProfileService
        .getQueryProfile(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);
      if (data.hasOwnProperty('Error') && data['Error'] !== '') {
        throw new QanError('Queries are not available.');
      }
      this.paginationConfig.totalItems = data['TotalQueries'];
      if (this.paginationConfig.totalItems > 0) {
        this.paginationConfig.currentPage = page;
        this.profileTotal = page === 1 ? data['Query'][0] : data['Query'].shift();
        // [...this.queryProfile, ...data['Query']]; // ?????????
        this.queryProfile = data['Query']; // ?????????
        console.log('this.queryProfile - ', this.queryProfile);
        // console.log('this.queryProfile after - ', this.queryProfile);
      }
    } catch (err) {
      this.noQueryError = err.name === QanError.errType ? err.message : queryProfileError;
    }
  }

  // async getRows(page) {
  //   const data = await this.queryProfileService
  //     .getQueryProfile(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate, this.offset, search, firstSeen);
  //   if (data.hasOwnProperty('Error') && data['Error'] !== '') {
  //     throw new QanError('Queries are not available.');
  //   }
  //   this.paginationConfig.totalItems = data['TotalQueries'];
  //   if (this.paginationConfig.totalItems > 0) {
  //     this.paginationConfig.currentPage = page;
  //     // this.queryProfile = !selectOption ? data['Query'] : [...this.queryProfile, ...data['Query']]; // ?????????
  //     this.queryProfile = data['Query']; // ?????????
  //     this.profileTotal = page === 1 ? this.queryProfile[0] : data['Query'].shift();
  //   }
  // }

  // public rowsPerTable(selectOption) {
  //   this.queryProfile = [];
  //   this.paginationConfig.itemsPerPage = this.selectedPaginationOption;
  // for (let count = 0; count < selectOption; count += 10) {
  //   this.pushNewRow(count); // 0, 10, 20, 30, 40
  // }
  //   Promise.all([this.getPage(1, 0), this.getPage(1, 10), this.getPage(1, 20), this.getPage(1, 30), this.getPage(1, 40)]);
  // todo: calc height function
  // const qanTable = document.getElementById('qanTable');
  // const gridContentWrapper = document.getElementById('grid-content-wrapper');
  // const filters = document.getElementsByClassName('filter-menu') as HTMLCollectionOf<HTMLElement>;
  // setTimeout(() => {
  // filters[0].style.setProperty('--filters-height', `${qanTable.offsetHeight}px`);
  // gridContentWrapper.style.setProperty('--grid-content-wrapper', `${qanTable.offsetHeight}px`)
  // }, 0);
  // }

  // /**
  //  * Load next 10 queries for main qan-table
  //  */
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

  // /**
  //  * Count how queries left in main qan-table
  //  */
  // countDbQueries() {
  //   this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
  //   this.quantityDbQueriesMessage = this.leftInDbQueries > 0 ?
  //     `Load next ${this.leftInDbQueries > 10 ? 10 : this.leftInDbQueries} queries` :
  //     'No more queries for selected time range';
  // }

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

  /**
   * Show search queries result for main qan-table
   */
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

  /**
   * Show first-seen queries or restore default state of main qan-table queries
   * if isFirstSeenChecked is false
   * @param isFirstSeenChecked - state for checked switcher for first-seen
   */
  toggleFirstSeen(isFirstSeenChecked = false) {
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

  /**
   * Set selected config parameters when column type changes
   * @param selected - checked column-type
   */
  onColumnConfigChanges(selectedColumn) {
    if (!selectedColumn) {
      this.selectedColumn = selectedColumn = this.columnsConfig.length ? this.previousColumn : this.defaultSelectedColumn;
    }
    this.selectedColumnConfig = {};
    selectedColumn.columns.forEach(column =>
      this.selectedColumnConfig[this.filterSearchService.transformForSearch(column.name)] = column.value);
    this.currentColumn = selectedColumn.name;
    this.setCurrentSparkline(selectedColumn.name, this.selectedColumnConfig);
    this.previousColumn = this.selectedColumn;
  }

  onQueryTypeChanges(selectedQueryType) {
    if (!selectedQueryType) {
      this.selectedQueryType = this.previousQueryType;
    }
    this.previousQueryType = this.selectedQueryType;
  }

  /**
   * Set sparkline type and display column for config parameters
   * @param name - checked column-type name
   * @param config - checked config parameters
   */
  setCurrentSparkline(name: string, config) {
    switch (name) {
      case 'Load':
        this.isQueryCol = config.sparkline || config.value;
        this.isRowsScannedCol = config.percentage;
        this.yKey = 'Query_load';
        this.measurement = 'number';
        break;
      case 'Count':
        this.isQueryCol = config.sparkline || config.queriespersecond;
        this.isRowsScannedCol = config.value || config.percentage;
        this.yKey = 'Query_count';
        this.measurement = 'number';
        break;
      case 'Avg Latency':
        this.isQueryCol = config.sparkline || config.value;
        this.isRowsScannedCol = config.distribution;
        this.yKey = 'Query_time_avg';
        this.measurement = 'time';
        break;
    }
  }

  toggleQueryDetails(isQueryDetails = true) {
    this.isQueryDetails = isQueryDetails;
  }

  viewState(menuName) {
    this.isFilterMenu = menuName === 'filter-menu';
    this.isEditColumnMenu = !this.isFilterMenu;
  }
}
