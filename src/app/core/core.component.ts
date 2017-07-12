import 'rxjs/add/operator/filter';
import { Instance, InstanceService } from '../core/instance.service';
import { OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ParseQueryParamDatePipe } from '../shared/parse-query-param-date.pipe';
import { Event, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { environment } from '../environment';

export interface QueryParams {
    from?: string;
    to?: string;
    'var-host'?: string; // | string[];
    search?: string;
    queryID?: string;
    tz?: string;
}

/**
 * Base class for all components.
 */
export abstract class CoreComponent implements OnDestroy {

    public isDemo = environment.demo;
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

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected instanceService: InstanceService) {
        this.dbServer = instanceService.dbServers[0];
        this.agent = instanceService.dbServers[0].Agent;
        this.dbServers = instanceService.dbServers;
        this.dbServerMap = instanceService.dbServerMap;
        this.subscribeToRouter();
    }

    /**
     * Extract and convert query parameters.
     * Trigger onChangeParams method (must be overridden) on route change.
     */
    subscribeToRouter() {
        const parseQueryParamDatePipe = new ParseQueryParamDatePipe();
        this.routerSubscription = this.router.events
            .filter((e: any) => e instanceof NavigationEnd)
            .subscribe((event: Event) => {
                this.queryParams = this.route.snapshot.queryParams as QueryParams;

                try {
                    this.dbServer = this.dbServerMap[this.queryParams['var-host']];
                    this.agent = this.dbServerMap[this.queryParams['var-host']].Agent;
                } catch (err) {
                    // this required
                    this.dbServer = this.instanceService.dbServers[0];
                    this.agent = this.instanceService.dbServers[0].Agent;
                    console.info('cannot change db instance - use defaults');
                }
                this.setTimeZoneFromParams();
                this.from = parseQueryParamDatePipe.transform(this.queryParams.from, 'from');
                this.to = parseQueryParamDatePipe.transform(this.queryParams.to, 'to');
                this.fromUTCDate = this.from.utc().format('YYYY-MM-DDTHH:mm:ss');
                this.toUTCDate = this.to.utc().format('YYYY-MM-DDTHH:mm:ss');

                // trigger overriden method in child component
                this.onChangeParams(this.queryParams);

                this.previousQueryParams = Object.assign({}, this.queryParams);
            });
    }

    /**
     * onChangeParams is invoked every time when route changes
     * @param params optional
     */
    abstract onChangeParams(params): void;

    /**
     * set timezone based on given query parameter.
     */
    setTimeZoneFromParams() {
        let tz = this.queryParams.tz || 'local';
        const expireDays = moment().utc().add(7, 'y').toString();
        document.cookie = `timezone=${tz}; expires=${expireDays}; path=/`;
    }

    /**
     * Destroys route subscription on component unload.
     */
    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}


export class QanError extends Error {
    static errType = 'QanError';
    name = 'QanError';
}
