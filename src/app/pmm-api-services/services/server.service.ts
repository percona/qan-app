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
class ServerService extends __BaseService {
  static readonly ChangeSettingsPath = '/v1/ChangeSettings';
  static readonly GetSettingsPath = '/v1/GetSettings';
  static readonly VersionPath = '/v1/version';

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
  ChangeSettingsResponse(body: { disable_telemetry?: boolean, enable_telemetry?: boolean, metrics_resolutions?: { hr?: string, lr?: string, mr?: string } }): __Observable<__StrictHttpResponse<{ settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/ChangeSettings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeSettings(body: { disable_telemetry?: boolean, enable_telemetry?: boolean, metrics_resolutions?: { hr?: string, lr?: string, mr?: string } }): __Observable<{ settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } }> {
    return this.ChangeSettingsResponse(body).pipe(
      __map(_r => _r.body as { settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetSettingsResponse(body: {}): __Observable<__StrictHttpResponse<{ settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/GetSettings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetSettings(body: {}): __Observable<{ settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } }> {
    return this.GetSettingsResponse(body).pipe(
      __map(_r => _r.body as { settings?: { metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry?: boolean } })
    );
  }

  /**
   * @return A successful response.
   */
  VersionResponse(): __Observable<__StrictHttpResponse<{ pmm_managed_commit?: string, timestamp?: string, version?: string }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/v1/version`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ pmm_managed_commit?: string, timestamp?: string, version?: string }>;
      })
    );
  }
  /**
   * @return A successful response.
   */
  Version(): __Observable<{ pmm_managed_commit?: string, timestamp?: string, version?: string }> {
    return this.VersionResponse().pipe(
      __map(_r => _r.body as { pmm_managed_commit?: string, timestamp?: string, version?: string })
    );
  }
}

module ServerService {
}

export { ServerService }
