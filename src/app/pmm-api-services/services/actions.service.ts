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
class ActionsService extends __BaseService {
  static readonly CancelActionPath = '/v0/management/Actions/Cancel';
  static readonly GetActionPath = '/v0/management/Actions/Get';
  static readonly StartMySQLExplainActionPath = '/v0/management/Actions/StartMySQLExplain';
  static readonly StartMySQLExplainJSONActionPath = '/v0/management/Actions/StartMySQLExplainJSON';
  static readonly StartPTMySQLSummaryActionPath = '/v0/management/Actions/StartPTMySQLSummary';
  static readonly StartPTSummaryActionPath = '/v0/management/Actions/StartPTSummary';

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
  CancelActionResponse(body: { action_id?: string }): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/Actions/Cancel`,
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
   * @param body undefined
   * @return A successful response.
   */
  CancelAction(body: { action_id?: string }): __Observable<{}> {
    return this.CancelActionResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetActionResponse(body: { action_id?: string }): __Observable<__StrictHttpResponse<{ action_id?: string, done?: boolean, error?: string, output?: string, pmm_agent_id?: string }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/Actions/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ action_id?: string, done?: boolean, error?: string, output?: string, pmm_agent_id?: string }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetAction(body: { action_id?: string }): __Observable<{ action_id?: string, done?: boolean, error?: string, output?: string, pmm_agent_id?: string }> {
    return this.GetActionResponse(body).pipe(
      __map(_r => _r.body as { action_id?: string, done?: boolean, error?: string, output?: string, pmm_agent_id?: string })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  StartMySQLExplainActionResponse(body: { database?: string, pmm_agent_id?: string, query?: string, service_id?: string }): __Observable<__StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/Actions/StartMySQLExplain`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  StartMySQLExplainAction(body: { database?: string, pmm_agent_id?: string, query?: string, service_id?: string }): __Observable<{ action_id?: string, pmm_agent_id?: string }> {
    return this.StartMySQLExplainActionResponse(body).pipe(
      __map(_r => _r.body as { action_id?: string, pmm_agent_id?: string })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  StartMySQLExplainJSONActionResponse(body: { database?: string, pmm_agent_id?: string, query?: string, service_id?: string }): __Observable<__StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/Actions/StartMySQLExplainJSON`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  StartMySQLExplainJSONAction(body: { database?: string, pmm_agent_id?: string, query?: string, service_id?: string }): __Observable<{ action_id?: string, pmm_agent_id?: string }> {
    return this.StartMySQLExplainJSONActionResponse(body).pipe(
      __map(_r => _r.body as { action_id?: string, pmm_agent_id?: string })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  StartPTMySQLSummaryActionResponse(body: { pmm_agent_id?: string, service_id?: string }): __Observable<__StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/Actions/StartPTMySQLSummary`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  StartPTMySQLSummaryAction(body: { pmm_agent_id?: string, service_id?: string }): __Observable<{ action_id?: string, pmm_agent_id?: string }> {
    return this.StartPTMySQLSummaryActionResponse(body).pipe(
      __map(_r => _r.body as { action_id?: string, pmm_agent_id?: string })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  StartPTSummaryActionResponse(body: { node_id?: string, pmm_agent_id?: string }): __Observable<__StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/Actions/StartPTSummary`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ action_id?: string, pmm_agent_id?: string }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  StartPTSummaryAction(body: { node_id?: string, pmm_agent_id?: string }): __Observable<{ action_id?: string, pmm_agent_id?: string }> {
    return this.StartPTSummaryActionResponse(body).pipe(
      __map(_r => _r.body as { action_id?: string, pmm_agent_id?: string })
    );
  }
}

module ActionsService {
}

export { ActionsService }
