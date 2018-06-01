
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export type CollectFrom = 'slowlog' | 'perfschema';

@Injectable()
export class SettingsService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    public async getAgentStatus(agentUUID: string): Promise<{}> {
        const url = `/qan-api/agents/${agentUUID}/status`;

        const response = await this.http
            .get(url, { headers: this.headers })
            .toPromise();
        return response.json() as {};
    }

    public async getAgentLog(agentUUID, begin, end: string): Promise<{}> {
        const url = `/qan-api/agents/${agentUUID}/log`;

        const params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);
        const response = await this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise();
        return response.json() as {};
    }

    public async getAgentDefaults(agentUUID: string, dbServerUUID: string): Promise<{}> {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetDefaults',
            Data: btoa(JSON.stringify({ UUID: dbServerUUID }))
        };

        const response = await this.http
            .put(url, params, { headers: this.headers })
            .toPromise();

        const resp = response.json();
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

        const response = await this.http
            .put(url, params, { headers: this.headers })
            .toPromise();

        const resp = response.json();
        if (!!resp.Error) {
            throw new Error(resp.Error);
        } else {
            return JSON.parse(atob(resp.Data));
        }
    }
}
