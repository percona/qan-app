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
class FiltersService extends __BaseService {
  static readonly GetPath = '/v0/qan/Filters/Get';

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
  GetResponse(body: {main_metric_name?: string, period_start_from?: string, period_start_to?: string}): __Observable<__StrictHttpResponse<{labels?: {[key: string]: {name?: Array<{main_metric_per_sec?: number, main_metric_percent?: number, value?: string}>}}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/qan/Filters/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{labels?: {[key: string]: {name?: Array<{main_metric_per_sec?: number, main_metric_percent?: number, value?: string}>}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  Get(body: {main_metric_name?: string, period_start_from?: string, period_start_to?: string}): __Observable<{labels?: {[key: string]: {name?: Array<{main_metric_per_sec?: number, main_metric_percent?: number, value?: string}>}}}> {
    return this.GetResponse(body).pipe(
      __map(_r => _r.body as {labels?: {[key: string]: {name?: Array<{main_metric_per_sec?: number, main_metric_percent?: number, value?: string}>}}})
    );
  }
}

module FiltersService {
}

export { FiltersService }
