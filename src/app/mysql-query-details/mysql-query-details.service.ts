import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MySQLQueryDetailsService {

    constructor(private httpClient: HttpClient) { }

  /**
   * Rest DB tables data if current query id changes
   * @param queryID - id of current query
   * @param dbTables - object of current query table data
   * @return DB tables data for current query
   */
    updateTables(queryID: string, dbTables: Array<{}>) {
        const url = `/qan-api/queries/${queryID}/tables`;
        return this.httpClient
            .put(url, dbTables)
            .toPromise()
            .then(resp => console.log(resp));
    }
}
