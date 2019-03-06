import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class QueryProfileService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  public async getQueryProfile(dbServerUUID, begin, end: string,
                               offset = 0, search = '', first_seen): Promise<{}> {
    const url = `/qan-api/qan/profile/${dbServerUUID}`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('begin', begin);
    httpParams = httpParams.append('end', end);
    httpParams = httpParams.append('offset', String(offset));
    httpParams = httpParams.append('first_seen', first_seen);
    if (search) {
      search = btoa(
        search.replace(/%([0-9A-F]{2})/g,
          (match, p1) => String.fromCharCode(Number('0x' + p1)))
      );
      httpParams = httpParams.append('search', search);
    }
    return await this.httpClient
      .get(url, {headers: this.httpHeaders, params: httpParams})
      .toPromise();
  }
}
