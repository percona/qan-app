import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class QueryProfileService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  public async getQueryProfile(dbServerUUID, begin, end: string,
                               offset = 0, search = '', first_seen): Promise<{}> {
    const url = `/qan-api/qan/profile/${dbServerUUID}`;
    const searchValue = btoa(
      search.replace(/%([0-9A-F]{2})/g,
        (match, p1) => String.fromCharCode(Number('0x' + p1)))
    );
    const params = new HttpParams()
      .set('begin', begin)
      .set('end', end)
      .set('offset', String(offset))
      .set('first_seen', String(!!first_seen))
      .set('search', searchValue);

    return await this.httpClient
      .get(url, {headers: this.headers, params: params})
      .toPromise();
  }
}
