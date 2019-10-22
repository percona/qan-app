import { CoreComponent, QueryParams, QanError } from '../core/core.component';
import { Component } from '@angular/core';
import { InstanceService } from '../core/instance.service';
import { QueryProfileService } from './query-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MomentFormatPipe } from '../shared/moment-format.pipe';

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
    public isLoading: boolean;
    public isQuerySwitching: boolean;
    public noQueryError: string;
    public isFirstSeen: boolean;
    public isFirsSeenChecked = false;
    public isSearchQuery = false;

    constructor(
      protected route: ActivatedRoute,
      protected router: Router,
      protected instanceService: InstanceService,
      protected queryProfileService: QueryProfileService
    ) {
        super(route, router, instanceService);
    }

    onChangeParams(params) {
        // checks changing tz
        const momentFormatPipe = new MomentFormatPipe();
        this.fromDate = momentFormatPipe.transform(this.from, 'llll');
        this.toDate = momentFormatPipe.transform(this.to, 'llll');
        // only if host, from and to are diffrent from prev router - load queries.
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
        this.dbServer = this.instanceService.dbServers[0];
        for (const dbServer of this.instanceService.dbServers) {
            if (dbServer.Name === this.queryParams['var-host']) {
                this.dbServer = dbServer;
            }
        }
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
                throw new QanError('Queries are not available.');
            }
            this.totalAmountOfQueries = data['TotalQueries'];
            if (this.totalAmountOfQueries > 0) {
                this.queryProfile = data['Query'];
                this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
                this.profileTotal = this.queryProfile[0];
            }
        } catch (err) {
            console.error(err);
            this.noQueryError = err.name === QanError.errType ? err.message : queryProfileError;
        } finally {
            this.isQuerySwitching = false;
        }
    }

    public async loadMoreQueries() {
        this.isLoading = true;
        const dbServerUUID = this.dbServer.UUID;
        this.offset = this.offset + 10;
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
        this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
        this.isLoading = false;
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
        } else {
            delete params.search;
        }
        delete params.queryID;
        this.router.navigate(['profile'], { queryParams: params });
    }

    getFirstSeen(isFirsSeenChecked = false) {
      this.isQuerySwitching = true;
      this.isFirsSeenChecked = isFirsSeenChecked;
      const params: QueryParams = Object.assign({}, this.queryParams);
      if (isFirsSeenChecked) {
        params.first_seen = this.isFirsSeenChecked;
      } else {
        delete params.first_seen;
      }
      delete params.queryID;
      this.router.navigate(['profile'], { queryParams: params });
      this.isQuerySwitching = false;
    }
}
