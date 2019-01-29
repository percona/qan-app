import {OnDestroy} from '@angular/core';
import {Event, Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Instance, InstanceService} from './services/instance.service';
import {QueryParams} from './services/url-params.service';
import {ParseQueryParamDatePipe} from '../shared/parse-query-param-date.pipe';
import * as moment from 'moment';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import {environment} from '../environment';

/**
 * Base class for all components.
 */
export abstract class CoreComponent implements OnDestroy {

  public isDemo = false;
  protected routerSubscription: Subscription;
  public queryParams: QueryParams;
  public newQueryParams: any;
  public previousQueryParams: QueryParams;
  public agent: Instance | null;
  public dbServer: Instance | null;
  public dbServers: Array<Instance> = [];
  public dbServerMap: { [key: string]: Instance } = {};
  public from: any;
  public to: any;
  public isAllSelected: boolean;
  public isNotExistSelected: boolean;
  public isQueryDataAbsent: boolean;

  public fromUTCDate: string;
  public toUTCDate: string;
  protected customEvents = {
    checkFilters: new Event('checkFilters'),
    copySuccess: new Event('showSuccessNotification'),
    selectQuery: new Event('selectQuery'),
    searchQuery: new Event('searchQuery'),
    updateUrl: new Event('updateUrl'),
    sendEvent: (event) => setTimeout(() => document.dispatchEvent(event), 0)
  };

  parseQueryParamDatePipe = new ParseQueryParamDatePipe();

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected instanceService: InstanceService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
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
    this.routerSubscription = this.router.events
      .filter((e: any) => e instanceof NavigationEnd)
      .subscribe((event: Event) => {
        this.queryParams = this.route.snapshot.queryParams as QueryParams;
        this.newQueryParams = this.route.snapshot.queryParams.keys;
        this.parseParams();

        // trigger overriden method in child component
        console.log('subscribeToRouter');
        this.onChangeParams(this.queryParams);

        this.previousQueryParams = Object.assign({}, this.queryParams);
      });
  }

  /**
   * Parse and set params
   */
  parseParams() {
    this.isAllSelected = this.queryParams['var-host'] === 'All';
    this.isQueryDataAbsent = (this.dbServer === null) && (!this.isAllSelected) && (!this.isNotExistSelected);
    try {
      this.dbServer = this.dbServerMap[this.queryParams['var-host']];
      this.agent = this.dbServerMap[this.queryParams['var-host']].Agent;
    } catch (err) {
      if (this.queryParams.hasOwnProperty('var-host')) {
        this.dbServer = null;
        this.agent = null;
        this.isNotExistSelected = !this.isAllSelected;
      } else {
        this.dbServer = this.instanceService.dbServers[0];
        this.agent = this.instanceService.dbServers[0].Agent;
      }
    }
    this.setTimeZoneFromParams();
    this.setThemeFromParams();
    this.from = this.parseQueryParamDatePipe.transform(this.queryParams.from, 'from');
    this.to = this.parseQueryParamDatePipe.transform(this.queryParams.to, 'to');
    this.fromUTCDate = this.from.utc().format('YYYY-MM-DDTHH:mm:ss');
    this.toUTCDate = this.to.utc().format('YYYY-MM-DDTHH:mm:ss');
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
    const tz = this.queryParams.tz || 'browser';
    const expireDays = moment().utc().add(7, 'y').toString();
    document.cookie = `timezone=${tz}; expires=${expireDays}; path=/`;
  }

  setThemeFromParams() {
    const theme = this.queryParams.theme || '';
    if (theme) {
      const expireDays = moment().utc().add(7, 'y').toString();
      document.cookie = `theme=app-theme-${theme}; expires=${expireDays}; path=/`;
    }
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
