/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class MetricsNamesService extends __BaseService {
  static readonly GetMetricsNamesPath = '/v1/qan/GetMetricsNames';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetMetricsNamesResponse(body: {}): __Observable<__StrictHttpResponse<{ data?: { [key: string]: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/qan/GetMetricsNames`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ data?: { [key: string]: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetMetricsNames(body: {}): __Observable<{ data?: { [key: string]: string } }> {
    return this.GetMetricsNamesResponse(body).pipe(
      __map(_r => _r.body as { data?: { [key: string]: string } })
    );
  }
}

module MetricsNamesService {
}

export { MetricsNamesService }
