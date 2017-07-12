import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QueryProfileService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    public async getQueryProfile(dbServerUUID, begin, end: string,
        offset = 0, search = ''): Promise<{}> {
        const url = `/qan-api/qan/profile/${dbServerUUID}`;
        const params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);
        params.set('offset', String(offset));
        if (search) {
            search = btoa(
                search.replace(/%([0-9A-F]{2})/g,
                    (match, p1) => String.fromCharCode(Number('0x' + p1)))
            );
            params.set('search', search);
        }
        let response = await this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise();
        return response.json();
    }
}
