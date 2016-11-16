import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Instance, NavService, Navigation } from '../core/nav.service';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

export class BaseComponent implements OnInit, OnDestroy {

    protected navSubscription: Subscription;
    protected paramsSubscription: Subscription;
    protected navigation: Navigation;

    constructor(protected route: ActivatedRoute, protected router: Router, protected navService: NavService) { }

    ngOnInit() {
        this.navSubscription = this.navService.navigation$.subscribe(nav => this.navigation = nav);
        this.paramsSubscription = this.route.params.subscribe(
            params => {
                this.navService.setNavigation({ 'dbServerName': params.mysqlServer })
                this.onChangeParams(params);
            }
        );
    }

    onChangeParams(params) {
        console.log('onChangeParams', params);
    }

    ngOnDestroy() {
        this.navSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }
}