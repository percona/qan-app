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
class MongoDBService extends __BaseService {
  static readonly AddMongoDBPath = '/v0/management/MongoDB/Add';

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
  AddMongoDBResponse(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, password?: string, pmm_agent_id?: string, port?: number, qan_mongodb_profiler?: boolean, replication_set?: string, service_name?: string, skip_connection_check?: boolean, username?: string }): __Observable<__StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mongodb_profiler?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/MongoDB/Add`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mongodb_profiler?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMongoDB(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, password?: string, pmm_agent_id?: string, port?: number, qan_mongodb_profiler?: boolean, replication_set?: string, service_name?: string, skip_connection_check?: boolean, username?: string }): __Observable<{ mongodb_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mongodb_profiler?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }> {
    return this.AddMongoDBResponse(body).pipe(
      __map(_r => _r.body as { mongodb_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mongodb_profiler?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } })
    );
  }
}

module MongoDBService {
}

export { MongoDBService }
