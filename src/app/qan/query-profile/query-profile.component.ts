import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InstanceService } from '../../core/services/instance.service';
import { QueryProfileService } from './query-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MetricsNamesService } from '../../inventory-api/services/metrics-names.service';
const queryProfileError = 'No data. Please check pmm-client and database configurations on selected instance.';

@Component({
  moduleId: module.id,
  templateUrl: 'query-profile.component.html',
  styleUrls: ['./query-profile.component.scss'],
})
export class QueryProfileComponent implements OnInit {
  // @ViewChild('qanTable') table: ElementRef;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('table') table: ElementRef;

  public queryProfile: Array<{}>;
  public profileTotal;
  public offset: number;
  public totalAmountOfQueries: number;
  public searchValue: string;
  public isLoading: boolean;
  public isQueryLoading: boolean;
  public noQueryError: string;
  public isFirstSeenChecked = false;
  public testingVariable: boolean;
  public isSearchQuery = false;
  public measurement: string;

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected instanceService: InstanceService,
    public queryProfileService: QueryProfileService) {
  }

  ngOnInit() {
    console.log('table - ', this.table);
    console.log('filter - ', this.filter);
  }

  // /**
  //  * Set router parameters if query is checked in main qan-table
  //  * @param queryID - checked queries' id
  //  * @return query params of current query
  //  */
  // composeQueryParamsForGrid(queryID: string | null): QueryParams {
  //   const queryParams: QueryParams = Object.assign({}, this.queryParams);
  //   queryParams.queryID = queryID || 'TOTAL';
  //   return queryParams;
  // }

  // /**
  //  * Show search queries result for main qan-table
  //  */
  // search() {
  //   this.isSearchQuery = true;
  //   const params: QueryParams = Object.assign({}, this.queryParams);
  //   if (!!this.searchValue) {
  //     params.search = this.searchValue === 'null' ? 'NULL' : this.searchValue;
  //     this.testingVariable = true;
  //   } else {
  //     this.testingVariable = false;
  //     delete params.search;
  //   }
  //   delete params.queryID;
  //   this.router.navigate(['profile'], {queryParams: params});
  // }

  // /**
  //  * Show first-seen queries or restore default state of main qan-table queries
  //  * if isFirstSeenChecked is false
  //  * @param isFirstSeenChecked - state for checked switcher for first-seen
  //  */
  // toggleFirstSeen(isFirstSeenChecked = false) {
  //   this.isQueryLoading = true;
  //   this.isFirstSeenChecked = isFirstSeenChecked;
  //   const params: QueryParams = Object.assign({}, this.queryParams);
  //   if (isFirstSeenChecked) {
  //     this.testingVariable = true;
  //     params.first_seen = this.isFirstSeenChecked;
  //   } else {
  //     this.testingVariable = false;
  //     delete params.first_seen;
  //   }
  //   delete params.queryID;
  //   this.router.navigate(['profile'], {queryParams: params});
  //   this.isQueryLoading = false;
  // }
}
