import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavService } from '../../core/nav/nav.service';
import { BaseComponent } from '../base.component';
import { QueryProfileService } from './query-profile.service';

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
    public fromTs: string;
    public toTs: string;


    constructor(protected route: ActivatedRoute, protected router: Router,
        protected navService: NavService, protected queryProfileService: QueryProfileService) {
        super(route, router, navService);
    }

    onChangeParams(params) {
        this.fromTs = this.navService.nav.from.format('YYYY-MM-DDTHH:mm:ss');
        this.toTs = this.navService.nav.to.format('YYYY-MM-DDTHH:mm:ss');
        if (!('var-host' in params)) {
            setTimeout(() => {
                const navigationExtras = {
                    queryParams: {
                        'var-host': this.navService.nav.dbServer.Name,
                        'from': this.fromTs,
                        'to': this.toTs
                    }
                };
                this.router.navigate(['profile'], navigationExtras);
            }, 500);
        }
        // FIXME: use reactive here.
        if (this.navService.nav.dbServer === undefined) {
            setTimeout(() => this.loadQueries(), 500);
        } else {
            this.loadQueries();
        }
    }

    loadQueries() {
        const dbServerUUID = this.navService.nav.dbServer.UUID;
        const search = this.navService.nav.search;
        this.offset = 0;
        this.queryProfileService
            .getQueryProfile(dbServerUUID, this.fromTs, this.toTs, this.offset, search)
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
        const dbServerUUID = this.navService.nav.dbServer.UUID;
        this.offset = this.offset + 10;
        this.queryProfileService
            .getQueryProfile(dbServerUUID, this.fromTs, this.toTs, this.offset)
            .then(data => {
                const _ = data['Query'].shift();
                for (const q of data['Query']) {
                    this.queryProfile.push(q);
                }
                this.leftInDbQueries = this.totalAmountOfQueries - (this.queryProfile.length - 1);
            });
    }

    ngOnInit() {
        super.ngOnInit();
        this.navService.setNavigation({ 'subPath': 'profile' });
    }
}
