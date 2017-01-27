import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SummaryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getServer(agentUUID: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        let params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetServerSummary',
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => {
                let resp = response.json();
                if (!!resp.Error) {
                    return resp.Error === 'Executable file not found in $PATH' ? ' - Please install `pt-summary`.' : resp.Error;
                } else {
                    let str = window.atob(resp.Data);
                    str = str.replace(/\\n/g, '\n');
                    str = str.replace(/\\t/g, '\t');
                    return str.slice(1, -1);
                }
            })
            .catch(err => console.error(err.Error));
    }

    getMySQL(agentUUID: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        let params = {
            AgentUUID: agentUUID,
            Service: 'agent',
            Cmd: 'GetServerSummary',
        };

        return this.http
            .put(url, params, { headers: this.headers })
            .toPromise()
            .then(response => {
                let resp = response.json();
                if (!!resp.Error) {
                    return resp.Error === 'Executable file not found in $PATH' ? ' - Please install `pt-mysql-summary`.' : resp.Error;
                } else {
                    let str = window.atob(resp.Data);
                    str = str.replace(/\\n/g, '\n');
                    str = str.replace(/\\t/g, '\t');
                    return str.slice(1, -1);
                }

            })
            .catch(err => {
                console.log(err);
            });
    }
}
