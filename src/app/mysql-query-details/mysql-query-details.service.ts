import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

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
export class MySQLQueryDetailsService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  public async getQueryDetails(dbServerUUID, queryUUID, begin, end: string): Promise<QueryDetails> {
    const url = `/qan-api/qan/report/${dbServerUUID}/query/${queryUUID}`;
    const params = new HttpParams()
      .set('begin', begin)
      .set('end', end);

    const response = await this.httpClient
      .get(url, {headers: this.headers, params: params})
      .toPromise();
    return response as QueryDetails;
  }

  public async getSummary(dbServerUUID: string, begin: string, end: string): Promise<ServerSummary> {
    const url = `/qan-api/qan/report/${dbServerUUID}/server-summary`;

    const params = new HttpParams()
      .set('begin', begin)
      .set('end', end);

    const response = await this.httpClient
      .get(url, {headers: this.headers, params: params})
      .toPromise();
    return response as ServerSummary;
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

    return this.httpClient
      .put(url, params)
      .toPromise()
      .then(response => JSON.parse(atob(response['Data'])));
  }

  getExplain(agentUUID: string, dbServerUUID: string, dbName: string, query: string) {
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

    return this.httpClient
      .put(url, params)
      .toPromise()
      .then(response => response);
  }

  updateTables(queryID: string, dbTables: Array<{}>) {
    const url = `/qan-api/queries/${queryID}/tables`;
    return this.httpClient
      .put(url, dbTables)
      .toPromise()
      .then(resp => console.log(resp));
  }
}
