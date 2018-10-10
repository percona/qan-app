import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MongoQueryDetailsService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }
}
