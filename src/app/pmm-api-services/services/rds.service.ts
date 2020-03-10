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
class RDSService extends __BaseService {
  static readonly AddRDSPath = '/v1/management/RDS/Add';
  static readonly DiscoverRDSPath = '/v1/management/RDS/Discover';

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
  AddRDSResponse(body: {region?: string, az?: string, instance_id?: string, node_model?: string, address?: string, port?: number, engine?: 'DISCOVER_RDS_ENGINE_INVALID' | 'DISCOVER_RDS_MYSQL', node_name?: string, service_name?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, aws_access_key?: string, aws_secret_key?: string, rds_exporter?: boolean, qan_mysql_perfschema?: boolean, custom_labels?: {[key: string]: string}, skip_connection_check?: boolean, tls?: boolean, tls_skip_verify?: boolean, disable_query_examples?: boolean, tablestats_group_table_limit?: number}): __Observable<__StrictHttpResponse<{node?: {node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: {[key: string]: string}}, rds_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, node_id?: string, aws_access_key?: string, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number}, mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mysqld_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, tablestats_group_table_limit?: number, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number, tablestats_group_disabled?: boolean}, qan_mysql_perfschema?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, table_count?: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/management/RDS/Add`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{node?: {node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: {[key: string]: string}}, rds_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, node_id?: string, aws_access_key?: string, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number}, mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mysqld_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, tablestats_group_table_limit?: number, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number, tablestats_group_disabled?: boolean}, qan_mysql_perfschema?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, table_count?: number}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRDS(body: {region?: string, az?: string, instance_id?: string, node_model?: string, address?: string, port?: number, engine?: 'DISCOVER_RDS_ENGINE_INVALID' | 'DISCOVER_RDS_MYSQL', node_name?: string, service_name?: string, environment?: string, cluster?: string, replication_set?: string, username?: string, password?: string, aws_access_key?: string, aws_secret_key?: string, rds_exporter?: boolean, qan_mysql_perfschema?: boolean, custom_labels?: {[key: string]: string}, skip_connection_check?: boolean, tls?: boolean, tls_skip_verify?: boolean, disable_query_examples?: boolean, tablestats_group_table_limit?: number}): __Observable<{node?: {node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: {[key: string]: string}}, rds_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, node_id?: string, aws_access_key?: string, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number}, mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mysqld_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, tablestats_group_table_limit?: number, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number, tablestats_group_disabled?: boolean}, qan_mysql_perfschema?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, table_count?: number}> {
    return this.AddRDSResponse(body).pipe(
      __map(_r => _r.body as {node?: {node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: {[key: string]: string}}, rds_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, node_id?: string, aws_access_key?: string, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number}, mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mysqld_exporter?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, tablestats_group_table_limit?: number, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE', listen_port?: number, tablestats_group_disabled?: boolean}, qan_mysql_perfschema?: {agent_id?: string, pmm_agent_id?: string, disabled?: boolean, service_id?: string, username?: string, tls?: boolean, tls_skip_verify?: boolean, query_examples_disabled?: boolean, custom_labels?: {[key: string]: string}, status?: 'AGENT_STATUS_INVALID' | 'STARTING' | 'RUNNING' | 'WAITING' | 'STOPPING' | 'DONE'}, table_count?: number})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  DiscoverRDSResponse(body: {aws_access_key?: string, aws_secret_key?: string}): __Observable<__StrictHttpResponse<{rds_instances?: Array<{region?: string, az?: string, instance_id?: string, node_model?: string, address?: string, port?: number, engine?: 'DISCOVER_RDS_ENGINE_INVALID' | 'DISCOVER_RDS_MYSQL', engine_version?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/management/RDS/Discover`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{rds_instances?: Array<{region?: string, az?: string, instance_id?: string, node_model?: string, address?: string, port?: number, engine?: 'DISCOVER_RDS_ENGINE_INVALID' | 'DISCOVER_RDS_MYSQL', engine_version?: string}>}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  DiscoverRDS(body: {aws_access_key?: string, aws_secret_key?: string}): __Observable<{rds_instances?: Array<{region?: string, az?: string, instance_id?: string, node_model?: string, address?: string, port?: number, engine?: 'DISCOVER_RDS_ENGINE_INVALID' | 'DISCOVER_RDS_MYSQL', engine_version?: string}>}> {
    return this.DiscoverRDSResponse(body).pipe(
      __map(_r => _r.body as {rds_instances?: Array<{region?: string, az?: string, instance_id?: string, node_model?: string, address?: string, port?: number, engine?: 'DISCOVER_RDS_ENGINE_INVALID' | 'DISCOVER_RDS_MYSQL', engine_version?: string}>})
    );
  }
}

module RDSService {
}

export { RDSService }
