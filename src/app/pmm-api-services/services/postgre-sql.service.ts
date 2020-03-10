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
class PostgreSQLService extends __BaseService {
  static readonly AddPostgreSQLPath = '/v1/management/PostgreSQL/Add';

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
  AddPostgreSQLResponse(body: { add_node?: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, node_id?: string, node_name?: string, service_name?: string, address?: string, port?: number, pmm_agent_id?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, qan_postgresql_pgstatements_agent?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean, tls?: boolean, tls_skip_verify?: boolean }): __Observable<__StrictHttpResponse<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/management/PostgreSQL/Add`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPostgreSQL(body: { add_node?: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, node_id?: string, node_name?: string, service_name?: string, address?: string, port?: number, pmm_agent_id?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, qan_postgresql_pgstatements_agent?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean, tls?: boolean, tls_skip_verify?: boolean }): __Observable<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }> {
    return this.AddPostgreSQLResponse(body).pipe(
      __map(_r => _r.body as { postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } })
    );
  }
}

module PostgreSQLService {
}

export { PostgreSQLService }
