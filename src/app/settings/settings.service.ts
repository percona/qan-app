import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

export type CollectFrom = 'slowlog' | 'perfschema';

@Injectable()
export class SettingsService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  public async getAgentStatus(agentUUID: string): Promise<{}> {
    const url = `/qan-api/agents/${agentUUID}/status`;

    const response = await this.httpClient
      .get(url, {headers: this.httpHeaders})
      .toPromise();
    return response as {};
  }

  public async getAgentLog(agentUUID, begin, end: string): Promise<{}> {
    const url = `/qan-api/agents/${agentUUID}/log`;

    let httpParams = new HttpParams();
    httpParams = httpParams.append('begin', begin);
    httpParams = httpParams.append('end', end);
    const response = await this.httpClient
      .get(url, {headers: this.httpHeaders, params: httpParams})
      .toPromise();
    return response as {};
  }

  public async getAgentDefaults(agentUUID: string, dbServerUUID: string): Promise<{}> {
    const url = `/qan-api/agents/${agentUUID}/cmd`;
    const params = {
      AgentUUID: agentUUID,
      Service: 'agent',
      Cmd: 'GetDefaults',
      Data: btoa(JSON.stringify({UUID: dbServerUUID}))
    };

    const resp: any = await this.httpClient
      .put(url, params, {headers: this.httpHeaders})
      .toPromise();

    if (!!resp.Error) {
      throw new Error(resp.Error);
    } else {
      return JSON.parse(atob(resp.Data));
    }
  }

  public async setAgentDefaults(agentUUID: string, dbServerUUID: string, interval: number,
                                exampleQueries: boolean, collectFrom: CollectFrom): Promise<{}> {
    const url = `/qan-api/agents/${agentUUID}/cmd`;

    const data = {
      UUID: dbServerUUID,
      Interval: interval * 60,
      ExampleQueries: exampleQueries,
      CollectFrom: collectFrom
    };

    const params = {
      AgentUUID: agentUUID,
      Service: 'qan',
      Cmd: 'RestartTool',
      Data: btoa(JSON.stringify(data))
    };

    const resp: any = await this.httpClient
      .put(url, params, {headers: this.httpHeaders})
      .toPromise();

    if (!!resp.Error) {
      throw new Error(resp.Error);
    } else {
      return JSON.parse(atob(resp.Data));
    }
  }
}
