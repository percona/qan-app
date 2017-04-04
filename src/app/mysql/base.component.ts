import { OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavService, Navigation } from '../core/nav/nav.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

export interface QueryParams {
    from?: string;
    to?: string;
    'var-host'?: string | string[];
    search?: string;
    queryID?: string;
}

export class BaseComponent implements OnInit, OnDestroy {

    protected navSubscription: Subscription;
    protected queryParamsSubscription: Subscription;
    protected routerSubscription: Subscription;
    protected queryParams: QueryParams;

    constructor(protected route: ActivatedRoute, protected router: Router, protected navService: NavService) {
        this.routerSubscription = router.events.filter((e: any) => e instanceof NavigationEnd)
            .subscribe((val) => {
                this.queryParams = route.snapshot.queryParams as QueryParams;
                this.navService.setAlert('');
                // if (this.queryParams.search !== null) {
                //     this.navService.setNavigation({ 'search': this.queryParams.search });
                // }
                // if (this.queryParams.from !== null && this.queryParams.to !== null) {
                //     this.navService.setNavigation({ 'to': this.queryParams.to, 'from': this.queryParams.from });
                // }
                this.onChangeParams(this.queryParams);
            });
    }

    ngOnInit() {
        /*
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            params => {
                // discard alert.
                console.warn('deprecated?');
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
        */
    }

    onChangeParams(params) {
        console.log('onChangeParams', params);
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}
