import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SummaryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getServer(agentUUID: string, dbServerUUID: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const data = {
            UUID: dbServerUUID
        };
        const params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetServerSummary',
            Data: btoa(JSON.stringify(data))
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .then(resp => {
                // if not error - continue
                if (!resp.Error) {
                    return resp;
                }
                let err = resp.Error;
                if (resp.Error === 'Executable file not found in $PATH') {
                    err = ' - Please install `pt-summary`.';
                    err += ' (Output: ' +  resp.Error + ')';
                }
                throw new Error(err);
            })
            .then(resp => {
                let str = window.atob(resp.Data);
                str = str.replace(/\\n/g, '\n');
                str = str.replace(/\\t/g, '\t');
                return str.slice(1, -1);
            });
    }

    getMySQL(agentUUID: string, dbServerUUID: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const data = {
            UUID: dbServerUUID
        };
        const params = {
            AgentUUID: agentUUID,
            Service: 'query',
            Cmd: 'Summary',
            Data: btoa(JSON.stringify(data))
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .then(resp => {
                // if not error - continue
                if (!resp.Error) {
                    return resp;
                }
                let err = resp.Error;
                if (resp.Error === 'Executable file not found in $PATH') {
                    err = ' - Please install `pt-mysql-summary`.';
                    err += ' (Output: ' +  resp.Error + ')';
                }
                throw new Error(err);
            })
            .then(resp => {
                let str = window.atob(resp.Data);
                str = str.replace(/\\n/g, '\n');
                str = str.replace(/\\t/g, '\t');
                return str.slice(1, -1);
            });
    }

    getMongo(agentUUID: string, dbServerUUID: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const data = {
            UUID: dbServerUUID
        };

        const params = {
            AgentUUID: agentUUID,
            Service: 'query',
            Cmd: 'Summary',
            Data: btoa(JSON.stringify(data))
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .then(resp => {
                // if not error - continue
                if (!resp.Error) {
                    return resp;
                }
                let err = resp.Error;
                if (resp.Error === 'Executable file not found in $PATH') {
                    err = ' - Please install `pt-mongodb-summary`.';
                    err += ' (Output: ' +  resp.Error + ')';
                }
                if (resp.Error === 'Unknown command: GetMongoSummary') {
                    err = ' - Please update your `pmm-client`.';
                    err += ' (Output: ' +  resp.Error + ')';
                }
                throw new Error(err);
            })
            .then(resp => {
                let str = window.atob(resp.Data);
                str = str.replace(/\\n/g, '\n');
                str = str.replace(/\\t/g, '\t');
                return str.slice(1, -1);
            });
    }
}
