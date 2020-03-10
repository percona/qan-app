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
  static readonly AddMongoDBPath = '/v1/management/MongoDB/Add';

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
  AddMongoDBResponse(body: { add_node?: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, node_id?: string, node_name?: string, service_name?: string, address?: string, port?: number, pmm_agent_id?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, qan_mongodb_profiler?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean, tls?: boolean, tls_skip_verify?: boolean }): __Observable<__StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/management/MongoDB/Add`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMongoDB(body: { add_node?: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, node_id?: string, node_name?: string, service_name?: string, address?: string, port?: number, pmm_agent_id?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, qan_mongodb_profiler?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean, tls?: boolean, tls_skip_verify?: boolean }): __Observable<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }> {
    return this.AddMongoDBResponse(body).pipe(
      __map(_r => _r.body as { mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } })
    );
  }
}

module MongoDBService {
}

export { MongoDBService }
