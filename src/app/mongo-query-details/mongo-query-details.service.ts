import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Observable';

export interface QueryClass {
    Id: string;
    Abstract: string;
    Fingerprint: string;
    Tables: Array<{ Db: string, Table: string }> | null;
    FirstSeen: string;
    LastSeen: string;
    Status: string;
};

export interface QueryExample {
    QueryId: string;
    InstanceUUID: string;
    Period: string;
    Ts: string;
    Db: string;
    QueryTime: number;
    Query: string;
};

export interface QueryDetails {
    InstanceId: string;
    Begin: string;
    End: string;
    Query: QueryClass;
    Example: QueryExample;
    Metrics2: {};
    Sparks2: Array<{}>;
};

export interface ServerSummary {
    InstanceId: string;
    Begin: string;
    End: string;
    Metrics2: {};
    Sparks2: Array<{}>;
};

@Injectable()
export class MongoQueryDetailsService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getQueryDetails(dbServerUUID, queryUUID, begin, end: string): Promise<QueryDetails> {
        const url = `/qan-api/qan/report/${dbServerUUID}/query/${queryUUID}`;

        const params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);

        return this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise()
            .then(response => response.json() as QueryDetails)
            .catch(err => console.log(err));
    }

    getSummary(dbServerUUID: string, begin: string, end: string): Promise<QueryDetails> {
        const url = `/qan-api/qan/report/${dbServerUUID}/server-summary`;

        const params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);

        return this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise()
            .then(response => response.json() as ServerSummary)
            .catch(err => console.log(err));
    }

    getTableInfo(agentUUID: string, dbServerUUID: string, dbName: string, tblName: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;

        const data = {
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

        const params = {
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

    async getExplain(agentUUID: string, dbServerUUID: string, dbName: string, query: string) {
        const url = `/qan-api/agents/${agentUUID}/cmd`;
        const data = {
            UUID: dbServerUUID,
            Db: dbName,
            Query: query,
            Convert: true  // agent will convert if not SELECT and MySQL <= 5.5 or >= 5.6 but no privs
        };

        const params = {
            AgentUUID: agentUUID,
            Service: 'query',
            Cmd: 'Explain',
            Data: btoa(JSON.stringify(data))
        };

        let response = await this.http
            .put(url, params)
            .toPromise();

        return response.json()
    }

    updateTables(queryID: string, dbTables: Array<{}>) {
        const url = `/qan-api/queries/${queryID}/tables`;
        return this.http
            .put(url, dbTables)
            .toPromise()
            .then(resp => console.log(resp))
            .catch(err => console.error(err));
    }
}
