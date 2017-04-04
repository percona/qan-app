
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

export class Instance {
  Created: string;
  DSN: string;
  Deleted: string;
  Distro: string;
  Id: number;
  Name: string;
  ParentUUID: string;
  Subsystem: string;
  UUID: string;
  Version: string;
  Agent?: Instance | null;
}

export class Navigation {
  dbServer: Instance;
  subPath = 'profile';
  search: string;
  from: any = moment.utc().subtract(1, 'h');
  to: any = moment.utc();
  isExtHidden = true;
}

type TimeEdge = 'from' | 'to';

@Injectable()
export class NavService {

  private instancesUrl = '/qan-api/instances?deleted=no';
  public dbServers: Array<Instance> = [];
  public dbServerMap: { [key: string]: Instance } = {};

  // Observable string sources
  private dbServerSource = new Subject<Instance>();
  private subPathSource = new Subject<string>();
  private navigationSource = new Subject<Navigation>();
  private alertSource = new Subject<string>();

  // Observable string streams
  dbServer$ = this.dbServerSource.asObservable();
  subPath$ = this.subPathSource.asObservable();
  navigation$ = this.navigationSource.asObservable();
  nav: Navigation = new Navigation();
  alert$ = this.alertSource.asObservable();

  constructor(private http: Http) { }

  setNavigation(elems: {}) {
    if ('dbServerName' in elems) {
      this.nav.dbServer = this.dbServerMap[elems['dbServerName']];
    }
    if ('subPath' in elems) {
      this.nav.subPath = elems['subPath'];
      this.nav.isExtHidden = (elems['subPath'] !== 'profile');
    }

    if ('from' in elems) {
      // this.nav.from = moment(elems['from']).utc();
      console.log('input date: ', elems['from']);
      this.nav.from = this.parseQueryParamDate(elems['from'], 'from');
      console.log('parsed date: ', this.nav.from);
    }

    if ('to' in elems) {
      // this.nav.to = moment(elems['to']).utc();
      this.nav.to = this.parseQueryParamDate(elems['to'], 'to');
    }

    if ('search' in elems) {
      this.nav.search = elems['search'];
    }
    // this.alertSource.next('');
    this.navigationSource.next(this.nav);
  }

  /**
   *
   * var spans = {
   *       's': {display: 'second'},
   *       'm': {display: 'minute'},
   *       'h': {display: 'hour'},
   *       'd': {display: 'day'},
   *       'w': {display: 'week'},
   *       'M': {display: 'month'},
   *       'y': {display: 'year'},
   * };
   *
   * var rangeOptions = [
   *   { from: 'now/d',    to: 'now/d',    display: 'Today',                 section: 2 },
   *   { from: 'now/d',    to: 'now',      display: 'Today so far',          section: 2 },
   *   { from: 'now/w',    to: 'now/w',    display: 'This week',             section: 2 },
   *   { from: 'now/w',    to: 'now',      display: 'This week so far',           section: 2 },
   *   { from: 'now/M',    to: 'now/M',    display: 'This month',            section: 2 },
   *   { from: 'now/y',    to: 'now/y',    display: 'This year',             section: 2 },
   *
   *   { from: 'now-1d/d', to: 'now-1d/d', display: 'Yesterday',             section: 1 },
   *   { from: 'now-2d/d', to: 'now-2d/d', display: 'Day before yesterday',  section: 1 },
   *   { from: 'now-7d/d', to: 'now-7d/d', display: 'This day last week',    section: 1 },
   *   { from: 'now-1w/w', to: 'now-1w/w', display: 'Previous week',         section: 1 },
   *   { from: 'now-1M/M', to: 'now-1M/M', display: 'Previous month',        section: 1 },
   *   { from: 'now-1y/y', to: 'now-1y/y', display: 'Previous year',         section: 1 },
   *
   *   { from: 'now-5m',   to: 'now',      display: 'Last 5 minutes',        section: 3 },
   *   { from: 'now-15m',  to: 'now',      display: 'Last 15 minutes',       section: 3 },
   *   { from: 'now-30m',  to: 'now',      display: 'Last 30 minutes',       section: 3 },
   *   { from: 'now-1h',   to: 'now',      display: 'Last 1 hour',           section: 3 },
   *   { from: 'now-3h',   to: 'now',      display: 'Last 3 hours',          section: 3 },
   *   { from: 'now-6h',   to: 'now',      display: 'Last 6 hours',          section: 3 },
   *   { from: 'now-12h',  to: 'now',      display: 'Last 12 hours',         section: 3 },
   *   { from: 'now-24h',  to: 'now',      display: 'Last 24 hours',         section: 3 },
   *
   *   { from: 'now-2d',   to: 'now',      display: 'Last 2 days',           section: 0 },
   *   { from: 'now-7d',   to: 'now',      display: 'Last 7 days',           section: 0 },
   *   { from: 'now-30d',  to: 'now',      display: 'Last 30 days',          section: 0 },
   *   { from: 'now-90d',  to: 'now',      display: 'Last 90 days',          section: 0 },
   *   { from: 'now-6M',   to: 'now',      display: 'Last 6 months',         section: 0 },
   *   { from: 'now-1y',   to: 'now',      display: 'Last 1 year',           section: 0 },
   *   { from: 'now-2y',   to: 'now',      display: 'Last 2 years',          section: 0 },
   *   { from: 'now-5y',   to: 'now',      display: 'Last 5 years',          section: 0 },
   * ];from=now-7d%2Fd&to=now-7d%2Fd
   */
  private parseQueryParamDate(date: string, edge: TimeEdge): moment.Moment {
    let parsedDate;
    // from=now
    if (date === 'now') {
      return moment().utc();
    }
    // from=now-5d&to=now-6M ... from=now/w&to=now/w
    if (date.length > 4 && date.startsWith('now-')) {
      // let subtrahend = date.substr(4);
      // ex: ["now-7d/d", "now", "-", "7", "d", "/", "d"]
      const parts = date.match('(now)(-|/)?([0-9]*)([YMdhms])(/)?([YMdhms])?');

      if (parts[1] === 'now') {
         parsedDate = moment().utc();
      }
      if (parts[2] === '-') {
        parsedDate.subtract(parts[3], parts[4]);
      }
      if (parts[2] === '/') {
        if (edge === 'from') {
          return parsedDate.startOf(parts[3]);
        } else {
          return parsedDate.endOf(parts[3]);
        }
      }
      if (parts.length > 4 && parts[5] === '/') {
        if (edge === 'from') {
          return parsedDate.startOf(parts[6]);
        } else {
          return parsedDate.endOf(parts[6]);
        }
      }
    } else {
      const isnum = /^\d+$/.test(date);
      if (isnum) {
        return moment(parseInt(date, 10)).utc();
      } else {
        return moment(date).utc();
      }
    }
    return parsedDate;
  }

  // Service message commands
  setDbServer(dbServerName: string) {
    this.dbServerSource.next(this.dbServerMap[dbServerName]);
  }

  setSubPath(subPath: string) {
    this.subPathSource.next(subPath);
  }

  setAlert(alert: string) {
    this.alertSource.next(alert);
  }

  getDBServers(): Promise<Instance[]> {
    return this.http.get(this.instancesUrl)
      .toPromise()
      .then(response => {
        const agents = response.json().filter((i: Instance) => i.Subsystem === 'agent') as Instance[];
        this.dbServers = response.json().filter((i: Instance) => i.Subsystem === 'mysql') as Instance[];
        const firstDB = this.dbServers[0];

        for (const srv of this.dbServers) {
          this.dbServerMap[srv.Name] = srv;
        }
        for (const agent of agents) {
          this.dbServerMap[agent.Name].Agent = agent;
        }

        this.nav.dbServer = this.dbServerMap[firstDB.Name];
        this.navigationSource.next(this.nav);
        return this.dbServers;
      })
      .catch(err => console.log(err));
  }
}
