
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export type CollectFrom = 'slowlog' | 'perfschema';

@Injectable()
export class SettingsService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getAgentStatus(agentUUID: string): Promise<{}> {
        const url = `/qan-api/agents/${agentUUID}/status`;

        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as {});
    }

    getAgentLog(agentUUID, begin, end: string): Promise<{}> {
        const url = `/qan-api/agents/${agentUUID}/log`;

        const params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);
        return this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise()
            .then(response => response.json() as {});
    }

    getAgentDefaults(agentUUID: string, dbServerUUID: string): Promise<{}> {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetDefaults',
            Data: btoa(JSON.stringify({ UUID: dbServerUUID }))
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => {
                const resp = response.json();
                if (!!resp.Error) {
                    throw new Error(resp.Error);
                } else {
                    return JSON.parse(atob(resp.Data));
                }
            });
    }

    setAgentDefaults(agentUUID: string, dbServerUUID: string, interval: number,
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

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => {
                const resp = response.json();
                if (!!resp.Error) {
                    throw new Error(resp.Error);
                } else {
                    return JSON.parse(atob(resp.Data));
                }
            });
    }

    getQanConfig(dbServerUUID: string): Promise<{}> {
        const url = `/qan-api/qan/config/${dbServerUUID}`;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as {});
    }
}