import { Component, OnInit } from '@angular/core';
import { NavService, Instance } from '../core/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
    template: `<router-outlet></router-outlet>`,
})
export class MySQLComponent implements OnInit {
    private from: string;
    private to: string;

    constructor(private route: ActivatedRoute, private router: Router, private navService: NavService) {
        this.to = moment.utc().format();
        this.from = moment.utc().subtract(1, 'h').format();
    }

    ngOnInit() {
        this.navService.setNavigation({'subPath': 'profile'});
        let path = ['profile', this.navService.dbServers[0].Name, 'from', this.from, 'to', this.to];
        this.router.navigate(path, { relativeTo: this.route })
    }
}