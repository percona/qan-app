import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

export interface Instance {
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

@Injectable()
export class InstanceService {
  private instancesUrl = '/qan-api/instances?deleted=no';
  public dbServers: Array<Instance> = [];
  public dbServerMap: { [key: string]: Instance } = {};
  constructor(private http: Http) { }

  public getDBServers(): Promise<Instance[]> {
    return this.http.get(this.instancesUrl)
      .toPromise()
      .then(response => {
        const agents = response.json().filter(
          (i: Instance) => i.Subsystem === 'agent'
        ) as Instance[];

        this.dbServers = (response.json().filter(
          (i: Instance) => i.Subsystem === 'mysql' || i.Subsystem === 'mongo'
        ) as Instance[]);

        const agentsByParentUUID: { [key: string]: Instance } = {};
        for (const agent of agents) {
          agentsByParentUUID[agent.ParentUUID] = agent;
        }

        for (const srv of this.dbServers) {
          this.dbServerMap[srv.Name] = srv;
          this.dbServerMap[srv.Name].Agent = agentsByParentUUID[srv.ParentUUID];
        }

        return this.dbServers;
      })
      .catch(err => console.log(err));
  }
}
