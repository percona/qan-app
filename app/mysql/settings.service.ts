
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

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
        console.log('params: ', begin, end, params);
        return this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise()
            .then(response => response.json() as {})
            .catch(err => console.log(err));
    }
}