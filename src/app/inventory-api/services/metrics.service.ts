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
class MetricsService extends __BaseService {
  static readonly GetMetricsPath = '/v1/qan/Metrics/Get';

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
  GetMetricsResponse(body: { filter_by?: string, group_by?: string, include_only_fields?: Array<string>, labels?: Array<{ key?: string, value?: Array<string> }>, period_start_from?: string, period_start_to?: string }): __Observable<__StrictHttpResponse<{ metrics?: { [key: string]: { avg?: number, cnt?: number, max?: number, min?: number, p99?: number, p_total?: number, rate?: number, sum?: number } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/qan/Metrics/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ metrics?: { [key: string]: { avg?: number, cnt?: number, max?: number, min?: number, p99?: number, p_total?: number, rate?: number, sum?: number } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetMetrics(body: { filter_by?: string, group_by?: string, include_only_fields?: Array<string>, labels?: Array<{ key?: string, value?: Array<string> }>, period_start_from?: string, period_start_to?: string }): __Observable<{ metrics?: { [key: string]: { avg?: number, cnt?: number, max?: number, min?: number, p99?: number, p_total?: number, rate?: number, sum?: number } } }> {
    return this.GetMetricsResponse(body).pipe(
      __map(_r => _r.body as { metrics?: { [key: string]: { avg?: number, cnt?: number, max?: number, min?: number, p99?: number, p_total?: number, rate?: number, sum?: number } } })
    );
  }
}

module MetricsService {
}

export { MetricsService }
