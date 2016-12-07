import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavService, Navigation } from '../core/nav.service';
import { Subscription } from 'rxjs/Subscription';

export class BaseComponent implements OnInit, OnDestroy {

    protected navSubscription: Subscription;
    protected paramsSubscription: Subscription;
    protected queryParamsSubscription: Subscription;
    // protected navigation: Navigation;

    constructor(protected route: ActivatedRoute, protected router: Router, protected navService: NavService) { }

    ngOnInit() {
        // this.navSubscription = this.navService.navigation$.subscribe(nav => this.navigation = nav);
        this.paramsSubscription = this.route.params.subscribe(
            params => {
                // discard alert.
                this.navService.setAlert('');
                if ('search' in params) {
                    this.navService.setNavigation({ 'search': params['search'] });
                }
                if ('to' in params && 'from' in params) {
                    this.navService.setNavigation({ 'to': params['to'], 'from': params['from'] });
                }
                this.onChangeParams(params);
            }
        );
    }

    onChangeParams(params) {
        console.log('onChangeParams', params);
    }

    ngOnDestroy() {
        // this.navSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }
}