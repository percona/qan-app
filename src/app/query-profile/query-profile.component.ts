import { CoreComponent, QueryParams } from '../core/core.component';
import { Component } from '@angular/core';
import { Instance, InstanceService } from '../core/instance.service';
import { QueryProfileService } from './query-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MomentFormatPipe } from 'app/shared/moment-format.pipe';

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

    public fromDate: string;

    public toDate: string;

    public isLoading: boolean;

    public noQueryError: string;
    public momentFormatPipe = new MomentFormatPipe();

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected instanceService: InstanceService, protected queryProfileService: QueryProfileService) {
        super(route, router, instanceService);
    }

    onChangeParams(params) {
        this.fromDate = this.momentFormatPipe.transform(this.from, 'llll');
        this.toDate = this.momentFormatPipe.transform(this.to, 'llll');
        // only if host, from and to are diffrent from prev router - load queries.
        if (!this.previousQueryParams ||
            this.previousQueryParams['var-host'] !== this.queryParams['var-host'] ||
            this.previousQueryParams.from !== this.queryParams.from ||
            this.previousQueryParams.to !== this.queryParams.to ||
            this.previousQueryParams.search !== this.queryParams.search) {
            this.loadQueries();
        }
    }

    loadQueries() {
        this.isLoading = true;
        const search = this.queryParams.search;
        this.offset = 0;
        this.queryProfileService
            .getQueryProfile(this.dbServer.UUID, this.fromUTCDate, this.toUTCDate, this.offset, search)
            .then(data => {
                if (data.hasOwnProperty('Error') && data['Error'] !== '') {
                    this.isLoading = false;
                    throw new Error('Queries are not availible.');
                }
                this.totalAmountOfQueries = data['TotalQueries'];
                if (this.totalAmountOfQueries > 0) {
                    this.queryProfile = data['Query'];
                    this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
                    this.profileTotal = this.queryProfile[0];
                } else {
                    this.queryProfile = [];
                    this.leftInDbQueries = 0;
                }
                this.isLoading = false;
            }).catch(err => this.noQueryError = err.message);
    }

    loadMoreQueries() {
        this.isLoading = true;
        const dbServerUUID = this.dbServer.UUID;
        this.offset = this.offset + 10;
        this.queryProfileService
            .getQueryProfile(dbServerUUID, this.fromUTCDate, this.toUTCDate, this.offset)
            .then(data => {
                const _ = data['Query'].shift();
                for (const q of data['Query']) {
                    this.queryProfile.push(q);
                }
                this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
                this.isLoading = false;
            });
    }

    composeQueryParamsForGrid(queryID: string | null): QueryParams {
        const queryParams: QueryParams = Object.assign({}, this.queryParams);
        queryParams.queryID = queryID || 'TOTAL';
        return queryParams;
    }
}
