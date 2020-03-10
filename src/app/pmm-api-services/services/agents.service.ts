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
class AgentsService extends __BaseService {
  static readonly AddMongoDBExporterPath = '/v1/inventory/Agents/AddMongoDBExporter';
  static readonly AddMySQLdExporterPath = '/v1/inventory/Agents/AddMySQLdExporter';
  static readonly AddNodeExporterPath = '/v1/inventory/Agents/AddNodeExporter';
  static readonly AddPMMAgentPath = '/v1/inventory/Agents/AddPMMAgent';
  static readonly AddPostgresExporterPath = '/v1/inventory/Agents/AddPostgresExporter';
  static readonly AddProxySQLExporterPath = '/v1/inventory/Agents/AddProxySQLExporter';
  static readonly AddQANMongoDBProfilerAgentPath = '/v1/inventory/Agents/AddQANMongoDBProfilerAgent';
  static readonly AddQANMySQLPerfSchemaAgentPath = '/v1/inventory/Agents/AddQANMySQLPerfSchemaAgent';
  static readonly AddQANMySQLSlowlogAgentPath = '/v1/inventory/Agents/AddQANMySQLSlowlogAgent';
  static readonly AddQANPostgreSQLPgStatementsAgentPath = '/v1/inventory/Agents/AddQANPostgreSQLPgStatementsAgent';
  static readonly ChangeMongoDBExporterPath = '/v1/inventory/Agents/ChangeMongoDBExporter';
  static readonly ChangeMySQLdExporterPath = '/v1/inventory/Agents/ChangeMySQLdExporter';
  static readonly ChangeNodeExporterPath = '/v1/inventory/Agents/ChangeNodeExporter';
  static readonly ChangePostgresExporterPath = '/v1/inventory/Agents/ChangePostgresExporter';
  static readonly ChangeProxySQLExporterPath = '/v1/inventory/Agents/ChangeProxySQLExporter';
  static readonly ChangeQANMongoDBProfilerAgentPath = '/v1/inventory/Agents/ChangeQANMongoDBProfilerAgent';
  static readonly ChangeQANMySQLPerfSchemaAgentPath = '/v1/inventory/Agents/ChangeQANMySQLPerfSchemaAgent';
  static readonly ChangeQANMySQLSlowlogAgentPath = '/v1/inventory/Agents/ChangeQANMySQLSlowlogAgent';
  static readonly ChangeQANPostgreSQLPgStatementsAgentPath = '/v1/inventory/Agents/ChangeQANPostgreSQLPgStatementsAgent';
  static readonly GetAgentPath = '/v1/inventory/Agents/Get';
  static readonly ListAgentsPath = '/v1/inventory/Agents/List';
  static readonly RemoveAgentPath = '/v1/inventory/Agents/Remove';

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
  AddMongoDBExporterResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddMongoDBExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMongoDBExporter(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.AddMongoDBExporterResponse(body).pipe(
      __map(_r => _r.body as { mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLdExporterResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddMySQLdExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLdExporter(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.AddMySQLdExporterResponse(body).pipe(
      __map(_r => _r.body as { mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddNodeExporterResponse(body: { pmm_agent_id?: string, custom_labels?: { [key: string]: string } }): __Observable<__StrictHttpResponse<{ node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddNodeExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddNodeExporter(body: { pmm_agent_id?: string, custom_labels?: { [key: string]: string } }): __Observable<{ node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.AddNodeExporterResponse(body).pipe(
      __map(_r => _r.body as { node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPMMAgentResponse(body: { runs_on_node_id?: string, custom_labels?: { [key: string]: string } }): __Observable<__StrictHttpResponse<{ pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddPMMAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPMMAgent(body: { runs_on_node_id?: string, custom_labels?: { [key: string]: string } }): __Observable<{ pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } }> {
    return this.AddPMMAgentResponse(body).pipe(
      __map(_r => _r.body as { pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPostgresExporterResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddPostgresExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPostgresExporter(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.AddPostgresExporterResponse(body).pipe(
      __map(_r => _r.body as { postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddProxySQLExporterResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddProxySQLExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddProxySQLExporter(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.AddProxySQLExporterResponse(body).pipe(
      __map(_r => _r.body as { proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMongoDBProfilerAgentResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddQANMongoDBProfilerAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMongoDBProfilerAgent(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }> {
    return this.AddQANMongoDBProfilerAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMySQLPerfSchemaAgentResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, disable_query_examples?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddQANMySQLPerfSchemaAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMySQLPerfSchemaAgent(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, disable_query_examples?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } }> {
    return this.AddQANMySQLPerfSchemaAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMySQLSlowlogAgentResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, disable_query_examples?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddQANMySQLSlowlogAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMySQLSlowlogAgent(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, disable_query_examples?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } }> {
    return this.AddQANMySQLSlowlogAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANPostgreSQLPgStatementsAgentResponse(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<__StrictHttpResponse<{ qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddQANPostgreSQLPgStatementsAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANPostgreSQLPgStatementsAgent(body: { pmm_agent_id?: string, service_id?: string, username?: string, password?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, skip_connection_check?: boolean }): __Observable<{ qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }> {
    return this.AddQANPostgreSQLPgStatementsAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeMongoDBExporterResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeMongoDBExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeMongoDBExporter(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.ChangeMongoDBExporterResponse(body).pipe(
      __map(_r => _r.body as { mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeMySQLdExporterResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeMySQLdExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeMySQLdExporter(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.ChangeMySQLdExporterResponse(body).pipe(
      __map(_r => _r.body as { mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeNodeExporterResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeNodeExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeNodeExporter(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.ChangeNodeExporterResponse(body).pipe(
      __map(_r => _r.body as { node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangePostgresExporterResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangePostgresExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangePostgresExporter(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.ChangePostgresExporterResponse(body).pipe(
      __map(_r => _r.body as { postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeProxySQLExporterResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeProxySQLExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeProxySQLExporter(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } }> {
    return this.ChangeProxySQLExporterResponse(body).pipe(
      __map(_r => _r.body as { proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANMongoDBProfilerAgentResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeQANMongoDBProfilerAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANMongoDBProfilerAgent(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }> {
    return this.ChangeQANMongoDBProfilerAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANMySQLPerfSchemaAgentResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeQANMySQLPerfSchemaAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANMySQLPerfSchemaAgent(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } }> {
    return this.ChangeQANMySQLPerfSchemaAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANMySQLSlowlogAgentResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeQANMySQLSlowlogAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANMySQLSlowlogAgent(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } }> {
    return this.ChangeQANMySQLSlowlogAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANPostgreSQLPgStatementsAgentResponse(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<__StrictHttpResponse<{ qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/ChangeQANPostgreSQLPgStatementsAgent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeQANPostgreSQLPgStatementsAgent(body: { agent_id?: string, common?: { enable?: boolean, disable?: boolean, custom_labels?: { [key: string]: string }, remove_custom_labels?: boolean } }): __Observable<{ qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }> {
    return this.ChangeQANPostgreSQLPgStatementsAgentResponse(body).pipe(
      __map(_r => _r.body as { qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetAgentResponse(body: { agent_id?: string }): __Observable<__StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }, postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }, postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetAgent(body: { agent_id?: string }): __Observable<{ mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }, postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } }> {
    return this.GetAgentResponse(body).pipe(
      __map(_r => _r.body as { mongodb_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, mysqld_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, node_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }, postgres_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, proxysql_exporter?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }, qan_mongodb_profiler_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_perfschema_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }, qan_mysql_slowlog_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }, qan_postgresql_pgstatements_agent?: { agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListAgentsResponse(body: { pmm_agent_id?: string, node_id?: string, service_id?: string }): __Observable<__StrictHttpResponse<{ pmm_agent?: Array<{ agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }>, node_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mysqld_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mongodb_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, postgres_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, proxysql_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, qan_mysql_perfschema_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }>, qan_mysql_slowlog_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }>, qan_mongodb_profiler_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }>, qan_postgresql_pgstatements_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }> }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/List`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ pmm_agent?: Array<{ agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }>, node_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mysqld_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mongodb_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, postgres_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, proxysql_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, qan_mysql_perfschema_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }>, qan_mysql_slowlog_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }>, qan_mongodb_profiler_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }>, qan_postgresql_pgstatements_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }> }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListAgents(body: { pmm_agent_id?: string, node_id?: string, service_id?: string }): __Observable<{ pmm_agent?: Array<{ agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }>, node_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mysqld_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mongodb_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, postgres_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, proxysql_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, qan_mysql_perfschema_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }>, qan_mysql_slowlog_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }>, qan_mongodb_profiler_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }>, qan_postgresql_pgstatements_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }> }> {
    return this.ListAgentsResponse(body).pipe(
      __map(_r => _r.body as { pmm_agent?: Array<{ agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean }>, node_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mysqld_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, mongodb_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, postgres_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, proxysql_exporter?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string }, listen_port?: number }>, qan_mysql_perfschema_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: { [key: string]: string } }>, qan_mysql_slowlog_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, max_slowlog_file_size?: string, custom_labels?: { [key: string]: string } }>, qan_mongodb_profiler_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }>, qan_postgresql_pgstatements_agent?: Array<{ agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, custom_labels?: { [key: string]: string } }> })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveAgentResponse(body: { agent_id?: string, force?: boolean }): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/Remove`,
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
  RemoveAgent(body: { agent_id?: string, force?: boolean }): __Observable<{}> {
    return this.RemoveAgentResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module AgentsService {
}

export { AgentsService }
