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
  static readonly AddExternalExporterPath = '/v1/inventory/Agents/AddExternalExporter';
  static readonly AddMongoDBExporterPath = '/v1/inventory/Agents/AddMongoDBExporter';
  static readonly AddMySQLdExporterPath = '/v1/inventory/Agents/AddMySQLdExporter';
  static readonly AddNodeExporterPath = '/v1/inventory/Agents/AddNodeExporter';
  static readonly AddPMMAgentPath = '/v1/inventory/Agents/AddPMMAgent';
  static readonly AddQANMySQLPerfSchemaAgentPath = '/v1/inventory/Agents/AddQANMySQLPerfSchemaAgent';
  static readonly AddRDSExporterPath = '/v1/inventory/Agents/AddRDSExporter';
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
  AddExternalExporterResponse(body: {custom_labels?: {[key: string]: string}, metrics_url?: string}): __Observable<__StrictHttpResponse<{external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddExternalExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddExternalExporter(body: {custom_labels?: {[key: string]: string}, metrics_url?: string}): __Observable<{external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}}> {
    return this.AddExternalExporterResponse(body).pipe(
      __map(_r => _r.body as {external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMongoDBExporterResponse(body: {custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, username?: string}): __Observable<__StrictHttpResponse<{mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}>> {
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
        return _r as __StrictHttpResponse<{mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMongoDBExporter(body: {custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, username?: string}): __Observable<{mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}> {
    return this.AddMongoDBExporterResponse(body).pipe(
      __map(_r => _r.body as {mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLdExporterResponse(body: {custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, username?: string}): __Observable<__StrictHttpResponse<{mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}>> {
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
        return _r as __StrictHttpResponse<{mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLdExporter(body: {custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, username?: string}): __Observable<{mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}> {
    return this.AddMySQLdExporterResponse(body).pipe(
      __map(_r => _r.body as {mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddNodeExporterResponse(body: {custom_labels?: {[key: string]: string}, pmm_agent_id?: string}): __Observable<__StrictHttpResponse<{node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}>> {
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
        return _r as __StrictHttpResponse<{node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddNodeExporter(body: {custom_labels?: {[key: string]: string}, pmm_agent_id?: string}): __Observable<{node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}> {
    return this.AddNodeExporterResponse(body).pipe(
      __map(_r => _r.body as {node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPMMAgentResponse(body: {custom_labels?: {[key: string]: string}, runs_on_node_id?: string}): __Observable<__StrictHttpResponse<{pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}}>> {
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
        return _r as __StrictHttpResponse<{pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPMMAgent(body: {custom_labels?: {[key: string]: string}, runs_on_node_id?: string}): __Observable<{pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}}> {
    return this.AddPMMAgentResponse(body).pipe(
      __map(_r => _r.body as {pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMySQLPerfSchemaAgentResponse(body: {custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, username?: string}): __Observable<__StrictHttpResponse<{qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}>> {
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
        return _r as __StrictHttpResponse<{qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddQANMySQLPerfSchemaAgent(body: {custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, username?: string}): __Observable<{qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}}> {
    return this.AddQANMySQLPerfSchemaAgentResponse(body).pipe(
      __map(_r => _r.body as {qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRDSExporterResponse(body: {custom_labels?: {[key: string]: string}, pmm_agent_id?: string, service_ids?: Array<string>}): __Observable<__StrictHttpResponse<{rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Agents/AddRDSExporter`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRDSExporter(body: {custom_labels?: {[key: string]: string}, pmm_agent_id?: string, service_ids?: Array<string>}): __Observable<{rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}> {
    return this.AddRDSExporterResponse(body).pipe(
      __map(_r => _r.body as {rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetAgentResponse(body: {agent_id?: string}): __Observable<__StrictHttpResponse<{external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}, mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}, qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}>> {
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
        return _r as __StrictHttpResponse<{external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}, mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}, qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetAgent(body: {agent_id?: string}): __Observable<{external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}, mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}, qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}}> {
    return this.GetAgentResponse(body).pipe(
      __map(_r => _r.body as {external_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}, mongodb_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, mysqld_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, node_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, pmm_agent?: {agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}, qan_mysql_perfschema_agent?: {agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}, rds_exporter?: {agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListAgentsResponse(body: {node_id?: string, pmm_agent_id?: string, service_id?: string}): __Observable<__StrictHttpResponse<{external_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}>, mongodb_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, mysqld_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, node_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>, pmm_agent?: Array<{agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}>, qan_mysql_perfschema_agent?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, rds_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>}>> {
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
        return _r as __StrictHttpResponse<{external_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}>, mongodb_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, mysqld_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, node_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>, pmm_agent?: Array<{agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}>, qan_mysql_perfschema_agent?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, rds_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListAgents(body: {node_id?: string, pmm_agent_id?: string, service_id?: string}): __Observable<{external_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}>, mongodb_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, mysqld_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, node_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>, pmm_agent?: Array<{agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}>, qan_mysql_perfschema_agent?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, rds_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>}> {
    return this.ListAgentsResponse(body).pipe(
      __map(_r => _r.body as {external_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, metrics_url?: string}>, mongodb_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, mysqld_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, node_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>, pmm_agent?: Array<{agent_id?: string, connected?: boolean, custom_labels?: {[key: string]: string}, runs_on_node_id?: string}>, qan_mysql_perfschema_agent?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, password?: string, pmm_agent_id?: string, service_id?: string, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', username?: string}>, rds_exporter?: Array<{agent_id?: string, custom_labels?: {[key: string]: string}, listen_port?: number, pmm_agent_id?: string, service_ids?: Array<string>, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}>})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveAgentResponse(body: {agent_id?: string}): __Observable<__StrictHttpResponse<{}>> {
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
  RemoveAgent(body: {agent_id?: string}): __Observable<{}> {
    return this.RemoveAgentResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module AgentsService {
}

export { AgentsService }
