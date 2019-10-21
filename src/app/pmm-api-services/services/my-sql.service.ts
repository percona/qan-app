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
class MySQLService extends __BaseService {
  static readonly AddMySQLPath = '/v1/management/MySQL/Add';

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
  AddMySQLResponse(body: { node_id?: string, add_node?: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, node_name?: string, service_name?: string, address?: string, port?: number, pmm_agent_id?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, qan_mysql_perfschema?: boolean, qan_mysql_slowlog?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean, disable_query_examples?: boolean, max_slowlog_file_size?: string, tls?: boolean, tls_skip_verify?: boolean }): __Observable<__StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mysql_perfschema?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/management/MySQL/Add`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mysql_perfschema?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQL(body: { node_id?: string, add_node?: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, node_name?: string, service_name?: string, address?: string, port?: number, pmm_agent_id?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, qan_mysql_perfschema?: boolean, qan_mysql_slowlog?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean, disable_query_examples?: boolean, max_slowlog_file_size?: string, tls?: boolean, tls_skip_verify?: boolean }): __Observable<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mysql_perfschema?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } }> {
    return this.AddMySQLResponse(body).pipe(
      __map(_r => _r.body as { mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mysql_perfschema?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, service?: { service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: { [key: string]: string } } })
    );
  }
}

module MySQLService {
}

export { MySQLService }
