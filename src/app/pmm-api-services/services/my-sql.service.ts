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
  static readonly AddMySQLPath = '/v0/management/MySQL/Add';

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
  AddMySQLResponse(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, password?: string, pmm_agent_id?: string, port?: number, qan_mysql_perfschema?: boolean, qan_mysql_slowlog?: boolean, replication_set?: string, service_name?: string, skip_connection_check?: boolean, username?: string }): __Observable<__StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_perfschema?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_slowlog?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/MySQL/Add`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_perfschema?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_slowlog?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQL(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, password?: string, pmm_agent_id?: string, port?: number, qan_mysql_perfschema?: boolean, qan_mysql_slowlog?: boolean, replication_set?: string, service_name?: string, skip_connection_check?: boolean, username?: string }): __Observable<{ mysqld_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_perfschema?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_slowlog?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }> {
    return this.AddMySQLResponse(body).pipe(
      __map(_r => _r.body as { mysqld_exporter?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_perfschema?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, qan_mysql_slowlog?: { agent_id?: string, custom_labels?: { [key: string]: string }, disabled?: boolean, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string }, service?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } })
    );
  }
}

module MySQLService {
}

export { MySQLService }
