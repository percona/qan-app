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


    constructor(protected route: ActivatedRoute, protected router: Router,
        protected navService: NavService, protected queryProfileService: QueryProfileService) {
        super(route, router, navService);
    }

    onChangeParams(params) {
        let from = this.navService.nav.from.format('YYYY-MM-DDTHH:mm:ss');
        let to = this.navService.nav.to.format('YYYY-MM-DDTHH:mm:ss');
        if ('to' in params) {
        } else {
            let path = ['mysql/profile', this.navService.dbServers[0].Name, 'from', from, 'to', to];
            this.router.navigate(path);
        }
        let dbServerUUID = this.navService.nav.dbServer.UUID;
        let search = this.navService.nav.search;
        this.offset = 0;
        this.queryProfileService
            .getQueryProfile(dbServerUUID, from, to, this.offset, search)
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
        let dbServerUUID = this.navService.nav.dbServer.UUID;
        let from = this.navService.nav.from.format('YYYY-MM-DDTHH:mm:ss');
        let to = this.navService.nav.to.format('YYYY-MM-DDTHH:mm:ss');
        this.offset = this.offset + 10;
        this.queryProfileService
            .getQueryProfile(dbServerUUID, from, to, this.offset)
            .then(data => {
                let _ = data['Query'].shift();
                for (let q of data['Query']) {
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
