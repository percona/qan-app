import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SummaryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getServer(agentUUID: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetServerSummary',
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

    getMySQL(agentUUID: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetMySQLSummary',
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
            Service: 'agent',
            Cmd: 'GetMongoSummary',
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
                }
                if (resp.Error === 'Unknown command: GetMongoSummary') {
                    err += ' - Please update your `pmm-client`.';
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
