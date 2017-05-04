import 'rxjs/add/operator/filter';
import { Instance, InstanceService } from '../core/instance.service';
import { OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ParseQueryParamDatePipe } from '../shared/parse-query-param-date.pipe';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

export interface QueryParams {
    from?: string;
    to?: string;
    'var-host'?: string; // | string[];
    search?: string;
    queryID?: string;
}

export class BaseComponent implements OnInit, OnDestroy {

    protected routerSubscription: Subscription;
    public queryParams: QueryParams;
    public previousQueryParams: QueryParams;
    public agent: Instance;
    public dbServer: Instance;
    public dbServers: Array<Instance> = [];
    public dbServerMap: { [key: string]: Instance } = {};
    public from: any;
    public to: any;

    public fromUTCDate: string;
    public toUTCDate: string;

    // @Output() showLoader = new EventEmitter();

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected instanceService: InstanceService) {
        this.dbServer = instanceService.dbServers[0];
        this.agent = instanceService.dbServers[0].Agent;
        this.dbServers = instanceService.dbServers;
        this.dbServerMap = instanceService.dbServerMap;
    }

    ngOnInit() {
        // this.showLoader.emit(true);
        const parseQueryParamDatePipe = new ParseQueryParamDatePipe();
        this.routerSubscription = this.router.events
            .filter((e: any) => e instanceof NavigationEnd)
            .subscribe((val) => {
                this.queryParams = this.route.snapshot.queryParams as QueryParams;

                try {
                    this.dbServer = this.dbServerMap[this.queryParams['var-host']];
                    this.agent = this.dbServerMap[this.queryParams['var-host']].Agent;
                } catch (err) {
                    // this required
                    this.dbServer = this.instanceService.dbServers[0];
                    this.agent = this.instanceService.dbServers[0].Agent;
                    console.warn('cannot change db instance');
                }

                this.from = parseQueryParamDatePipe.transform(this.queryParams.from, 'from');
                this.to = parseQueryParamDatePipe.transform(this.queryParams.to, 'to');
                this.fromUTCDate = this.from.utc().format('YYYY-MM-DDTHH:mm:ss');
                this.toUTCDate = this.to.utc().format('YYYY-MM-DDTHH:mm:ss');
                this.onChangeParams(this.queryParams);
                this.previousQueryParams = Object.assign({}, this.queryParams);
            });
    }

    onChangeParams(params) {
        console.log('onChangeParams', params);
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}
