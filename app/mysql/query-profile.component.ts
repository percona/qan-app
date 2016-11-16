import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../core/nav.service';
import { BaseComponent } from './base.component';
import { QueryProfileService } from './query-profile.service';

@Component({
    templateUrl: '/app/mysql/query-profile.component.html',
})
export class QueryProfileComponent extends BaseComponent {

    private queryProfile;
    private profileTotal

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected navService: NavService, protected queryProfileService: QueryProfileService) {
        super(route, router, navService);
    }

    onChangeParams(params) {
        let dbServerUUID = this.navigation.dbServer.UUID;
        let from = this.navigation.from.format('YYYY-MM-DDTHH:mm:ss');
        let to = this.navigation.to.format('YYYY-MM-DDTHH:mm:ss');
        this.queryProfileService
            .getQueryProfile(dbServerUUID, from, to)
            .then(data => {
                this.profileTotal = data.Query.shift();
                this.queryProfile = data.Query;
            });
    }

    ngOnInit() {
        super.ngOnInit();
        this.navService.setNavigation({ 'subPath': 'profile' });
    }
}