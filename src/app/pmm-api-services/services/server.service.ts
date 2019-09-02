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
  static readonly ChangeSettingsPath = '/v1/Settings/Change';
  static readonly GetSettingsPath = '/v1/Settings/Get';
  static readonly CheckUpdatesPath = '/v1/Updates/Check';
  static readonly StartUpdatePath = '/v1/Updates/Start';
  static readonly UpdateStatusPath = '/v1/Updates/Status';
  static readonly ReadinessPath = '/v1/readyz';
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
  ChangeSettingsResponse(body: { data_retention?: string, disable_telemetry?: boolean, enable_telemetry?: boolean, metrics_resolutions?: { hr?: string, lr?: string, mr?: string } }): __Observable<__StrictHttpResponse<{ settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/Settings/Change`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeSettings(body: { data_retention?: string, disable_telemetry?: boolean, enable_telemetry?: boolean, metrics_resolutions?: { hr?: string, lr?: string, mr?: string } }): __Observable<{ settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } }> {
    return this.ChangeSettingsResponse(body).pipe(
      __map(_r => _r.body as { settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetSettingsResponse(body: {}): __Observable<__StrictHttpResponse<{ settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/Settings/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetSettings(body: {}): __Observable<{ settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } }> {
    return this.GetSettingsResponse(body).pipe(
      __map(_r => _r.body as { settings?: { data_retention?: string, metrics_resolutions?: { hr?: string, lr?: string, mr?: string }, telemetry_enabled?: boolean, updates_disabled?: boolean } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  CheckUpdatesResponse(body: { force?: boolean }): __Observable<__StrictHttpResponse<{ installed?: { full_version?: string, timestamp?: string, version?: string }, last_check?: string, latest?: { full_version?: string, timestamp?: string, version?: string }, latest_news_url?: string, update_available?: boolean }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/Updates/Check`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ installed?: { full_version?: string, timestamp?: string, version?: string }, last_check?: string, latest?: { full_version?: string, timestamp?: string, version?: string }, latest_news_url?: string, update_available?: boolean }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  CheckUpdates(body: { force?: boolean }): __Observable<{ installed?: { full_version?: string, timestamp?: string, version?: string }, last_check?: string, latest?: { full_version?: string, timestamp?: string, version?: string }, latest_news_url?: string, update_available?: boolean }> {
    return this.CheckUpdatesResponse(body).pipe(
      __map(_r => _r.body as { installed?: { full_version?: string, timestamp?: string, version?: string }, last_check?: string, latest?: { full_version?: string, timestamp?: string, version?: string }, latest_news_url?: string, update_available?: boolean })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  StartUpdateResponse(body: {}): __Observable<__StrictHttpResponse<{ auth_token?: string, log_offset?: number }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/Updates/Start`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ auth_token?: string, log_offset?: number }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  StartUpdate(body: {}): __Observable<{ auth_token?: string, log_offset?: number }> {
    return this.StartUpdateResponse(body).pipe(
      __map(_r => _r.body as { auth_token?: string, log_offset?: number })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  UpdateStatusResponse(body: { auth_token?: string, log_offset?: number }): __Observable<__StrictHttpResponse<{ done?: boolean, log_lines?: Array<string>, log_offset?: number }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/Updates/Status`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ done?: boolean, log_lines?: Array<string>, log_offset?: number }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  UpdateStatus(body: { auth_token?: string, log_offset?: number }): __Observable<{ done?: boolean, log_lines?: Array<string>, log_offset?: number }> {
    return this.UpdateStatusResponse(body).pipe(
      __map(_r => _r.body as { done?: boolean, log_lines?: Array<string>, log_offset?: number })
    );
  }

  /**
   * @return A successful response.
   */
  ReadinessResponse(): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/v1/readyz`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @return A successful response.
   */
  Readiness(): __Observable<{}> {
    return this.ReadinessResponse().pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param dummy Dummy parameter for internal testing. Do not use.
   * @return A successful response.
   */
  VersionResponse(dummy?: string): __Observable<__StrictHttpResponse<{ managed?: { full_version?: string, timestamp?: string, version?: string }, server?: { full_version?: string, timestamp?: string, version?: string }, version?: string }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (dummy != null) __params = __params.set('dummy', dummy.toString());
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
        return _r as __StrictHttpResponse<{ managed?: { full_version?: string, timestamp?: string, version?: string }, server?: { full_version?: string, timestamp?: string, version?: string }, version?: string }>;
      })
    );
  }
  /**
   * @param dummy Dummy parameter for internal testing. Do not use.
   * @return A successful response.
   */
  Version(dummy?: string): __Observable<{ managed?: { full_version?: string, timestamp?: string, version?: string }, server?: { full_version?: string, timestamp?: string, version?: string }, version?: string }> {
    return this.VersionResponse(dummy).pipe(
      __map(_r => _r.body as { managed?: { full_version?: string, timestamp?: string, version?: string }, server?: { full_version?: string, timestamp?: string, version?: string }, version?: string })
    );
  }
}

module ServerService {
}

export { ServerService }
