import {Injectable} from '@angular/core';
// import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class QueryProfileService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private httpClient: HttpClient) { }

    public async getQueryProfile(dbServerUUID, begin, end: string,
        offset = 0, search = '', first_seen): Promise<{}> {
        const url = `/qan-api/qan/profile/${dbServerUUID}`;
        const params = new HttpParams();
        params.set('begin', begin);
        params.set('end', end);
        params.set('offset', String(offset));
        params.set('first_seen', first_seen);
        if (search) {
            search = btoa(
                search.replace(/%([0-9A-F]{2})/g,
                    (match, p1) => String.fromCharCode(Number('0x' + p1)))
            );
            params.set('search', search);
        }
      return await this.httpClient
          .get(url, {headers: this.headers, params: params})
          .toPromise();
    }
}
