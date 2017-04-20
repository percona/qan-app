import { BaseComponent, QueryParams } from '../base.component';
import { Component } from '@angular/core';
import { Instance, InstanceService } from '../../core/instance.service';
import { QueryProfileService } from './query-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MomentFormatPipe } from 'app/shared/moment-format.pipe';

@Component({
    moduleId: module.id,
    templateUrl: 'query-profile.component.html',
})
export class QueryProfileComponent extends BaseComponent {

    public queryProfile: Array<{}>;
    public profileTotal;
    public offset: number;
    public totalAmountOfQueries: number;
    public leftInDbQueries: number;

    public fromDate: string;

    public toDate: string;
    public momentFormatPipe = new MomentFormatPipe();

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected instanceService: InstanceService, protected queryProfileService: QueryProfileService) {
        super(route, router, instanceService);
    }

    onChangeParams(params) {
        this.fromDate = this.momentFormatPipe.transform(this.from, 'llll');
        this.toDate = this.momentFormatPipe.transform(this.to, 'llll');
        this.loadQueries();
    }

    loadQueries() {
        const search = this.queryParams.search;
        const from = this.from.format('YYYY-MM-DDTHH:mm:ss');
        const to = this.to.format('YYYY-MM-DDTHH:mm:ss');
        this.offset = 0;
        this.queryProfileService
            .getQueryProfile(this.dbServer.UUID, from, to, this.offset, search)
            .then(data => {
                this.totalAmountOfQueries = data['TotalQueries'];
                if (this.totalAmountOfQueries > 0) {
                    this.queryProfile = data['Query'];
                    this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
                    this.profileTotal = this.queryProfile[0];
                } else {
                    this.queryProfile = [];
                    this.leftInDbQueries = 0;
                }
            });
    }

    loadMoreQueries() {
        const dbServerUUID = this.dbServer.UUID;
        const from = this.from.format('YYYY-MM-DDTHH:mm:ss');
        const to = this.to.format('YYYY-MM-DDTHH:mm:ss');
        this.offset = this.offset + 10;
        this.queryProfileService
            .getQueryProfile(dbServerUUID, from, to, this.offset)
            .then(data => {
                const _ = data['Query'].shift();
                for (const q of data['Query']) {
                    this.queryProfile.push(q);
                }
                this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
            });
    }

    composeQueryParamsForGrid(queryID: string | null): QueryParams {
        const queryParams: QueryParams = Object.assign({}, this.queryParams);
        queryParams.queryID = queryID || 'TOTAL';
        return queryParams;
    }
}
