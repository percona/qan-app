
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export type CollectFrom = 'slowlog' | 'perfschema';

@Injectable()
export class SettingsService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getAgentStatus(agentUUID: string): Promise<{}> {
        const url = `http://192.168.56.11:9001/agents/${agentUUID}/status`;

        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as {})
            .catch(err => console.log(err));
    }

    getAgentLog(agentUUID, begin, end: string): Promise<{}> {
        const url = `http://192.168.56.11:9001/agents/${agentUUID}/log`;

        let params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);
        return this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise()
            .then(response => response.json() as {})
            .catch(err => console.log(err));
    }

    getAgentDefaults(agentUUID: string, dbServerUUID: string): Promise<{}> {
        const url = `http://192.168.56.11:9001/agents/${agentUUID}/cmd`;
        let params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetDefaults',
            Data: btoa(JSON.stringify({ UUID: dbServerUUID }))
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => {
                let resp = response.json();
                if (!!resp.Error) {
                    console.error(resp.Error);
                    return null;
                } else {
                    return JSON.parse(atob(resp.Data));
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    setAgentDefaults(agentUUID: string, dbServerUUID: string, interval: number,
                     exampleQueries: boolean, collectFrom: CollectFrom): Promise<{}> {
        const url = `http://192.168.56.11:9001/agents/${agentUUID}/cmd`;

        let data = {
            UUID: dbServerUUID,
            Interval: interval * 60,
            ExampleQueries: exampleQueries,
            CollectFrom: collectFrom
        };

        let params = {
            AgentUUID: agentUUID,
            Service: 'qan',
            Cmd: 'RestartTool',
            Data: btoa(JSON.stringify(data))
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => {
                let resp = response.json();
                if (!!resp.Error) {
                    console.error(resp.Error);
                    return null;
                } else {
                    return JSON.parse(atob(resp.Data));
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    getQanConfig(dbServerUUID: string): Promise<{}> {
        const url = `http://192.168.56.11:9001/qan/config/${dbServerUUID}`;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as {})
            .catch(err => console.log(err));
    }
}