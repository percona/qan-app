import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Observable';

export type QueryClass = {
    Id: string,
    Abstract: string,
    Fingerprint: string,
    Tables: Array<{ Db: string, Table: string }> | null,
    FirstSeen: string,
    LastSeen: string,
    Status: string
};

export type QueryExample = {
    QueryId: string,
    InstanceUUID: string,
    Period: string,
    Ts: string,
    Db: string,
    QueryTime: number,
    Query: string
};

export type QueryDetails = {
    InstanceId: string,
    Begin: string,
    End: string,
    Query: QueryClass,
    Example: QueryExample,
    Metrics2: {},
    Sparks2: Array<{}>
};

@Injectable()
export class QueryDetailsService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getQueryDetails(dbServerUUID, queryUUID, begin, end: string): Promise<QueryDetails> {
        const url = `http://192.168.56.11:9001/qan/report/${dbServerUUID}/query/${queryUUID}`;

        let params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);

        return this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise()
            .then(response => response.json() as QueryDetails)
            .catch(err => console.log(err));
    }

    getTableInfo(agentUUID: string, dbServerUUID: string, dbName: string, tblName: string) {
        const url = `http://192.168.56.11:9001/agents/${agentUUID}/cmd`;

        let data = {
            UUID: dbServerUUID,
            Create: [{
                Db: dbName,
                Table: tblName
            }],
            Index: [{
                Db: dbName,
                Table: tblName
            }],
            Status: [{
                Db: dbName,
                Table: tblName
            }]
        };

        let params = {
            AgentUUID: agentUUID,
            Service: 'query',
            Cmd: 'TableInfo',
            Data: btoa(JSON.stringify(data))
        };

        return this.http
            .put(url, params)
            .toPromise()
            .then(response => JSON.parse(atob(response.json().Data)))
            .catch(err => console.error(err));
    }

    getExplain(agentUUID: string, dbServerUUID: string, dbName: string, query: string) {
        const url = `http://192.168.56.11:9001/agents/${agentUUID}/cmd`;
        let data = {
            UUID: dbServerUUID,
            Db: dbName,
            Query: query,
            Convert: true  // agent will convert if not SELECT and MySQL <= 5.5 or >= 5.6 but no privs
        };

        let params = {
            AgentUUID: agentUUID,
            Service: 'query',
            Cmd: 'Explain',
            Data: btoa(JSON.stringify(data))
        };

        return this.http
            .put(url, params)
            .toPromise()
            .then(response => JSON.parse(atob(response.json().Data)))
            .catch(err => console.error(err));
    }
}