import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
export class BaseQueryDetailsService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  // getQueryDetails(dbServerUUID, queryUUID, begin, end: string): Promise<void | QueryDetails> {
  //   const url = `/qan-api/qan/report/${dbServerUUID}/query/${queryUUID}`;
  //
  //   const params = new URLSearchParams();
  //   params.set('begin', begin);
  //   params.set('end', end);
  //
  //   return this.http
  //     .get(url, { headers: this.headers, search: params })
  //     .toPromise()
  //     .then(response => response.json() as QueryDetails)
  //     .catch(err => console.log(err));
  // }

  public async getQueryDetails(dbServerUUID, queryUUID, begin, end: string): Promise<QueryDetails> {
    const url = `/qan-api/qan/report/${dbServerUUID}/query/${queryUUID}`;

    const params = new URLSearchParams();
    params.set('begin', begin);
    params.set('end', end);

    const response = await this.http
      .get(url, { headers: this.headers, search: params })
      .toPromise();
    return response.json() as QueryDetails;
  }

  // getSummary(dbServerUUID: string, begin: string, end: string): Promise<void | ServerSummary> {
  //   const url = `/qan-api/qan/report/${dbServerUUID}/server-summary`;
  //
  //   const params = new URLSearchParams();
  //   params.set('begin', begin);
  //   params.set('end', end);
  //
  //   return this.http
  //     .get(url, { headers: this.headers, search: params })
  //     .toPromise()
  //     .then(response => response.json() as ServerSummary)
  //     .catch(err => console.log(err));
  // }

  public async getSummary(dbServerUUID: string, begin: string, end: string): Promise<ServerSummary> {
    const url = `/qan-api/qan/report/${dbServerUUID}/server-summary`;

    const params = new URLSearchParams();
    params.set('begin', begin);
    params.set('end', end);

    const response = await this.http
      .get(url, { headers: this.headers, search: params })
      .toPromise();
    return response.json() as ServerSummary;
  }

}
