import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MySQLQueryDetailsService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    updateTables(queryID: string, dbTables: Array<{}>) {
        const url = `/qan-api/queries/${queryID}/tables`;
        return this.http
            .put(url, dbTables)
            .toPromise()
            .then(resp => console.log(resp));
    }
}
