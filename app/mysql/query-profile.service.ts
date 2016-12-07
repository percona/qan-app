import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QueryProfileService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getQueryProfile(dbServerUUID, begin, end: string, offset: number = 0, search: string = ''): Promise<{}> {
        const url = `http://192.168.56.11:9001/qan/profile/${dbServerUUID}`;
        let params = new URLSearchParams();
        params.set('begin', begin);
        params.set('end', end);
        params.set('offset', String(offset));
        if (search) {
            search = btoa(search.replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
            params.set('search', search);
        }
        return this.http
            .get(url, { headers: this.headers, search: params })
            .toPromise()
            .then(response => response.json())
            .catch(err => console.log(err));
    }
}