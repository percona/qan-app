
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
  subPath: string = 'profile';
  search: string = '';
  from: any = moment.utc().subtract(1, 'h');
  to: any = moment.utc();
  isExtHidden: boolean = true;
}

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
      this.nav.from = moment(elems['from']).utc();
    }

    if ('to' in elems) {
      this.nav.to = moment(elems['to']).utc();
    }

    if ('search' in elems) {
      this.nav.search = elems['search'];
    }
    // this.alertSource.next('');
    this.navigationSource.next(this.nav);
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
