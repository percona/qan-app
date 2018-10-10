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
}
