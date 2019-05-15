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
class NodeService extends __BaseService {
  static readonly RegisterPath = '/v0/management/Node/Register';

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
  RegisterResponse(body: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_model?: string, node_name?: string, node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE' | 'REMOTE_AMAZON_RDS_NODE', region?: string, reregister?: boolean }): __Observable<__StrictHttpResponse<{ container_node?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic_node?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, pmm_agent?: { agent_id?: string, connected?: boolean, custom_labels?: { [key: string]: string }, runs_on_node_id?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v0/management/Node/Register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ container_node?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic_node?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, pmm_agent?: { agent_id?: string, connected?: boolean, custom_labels?: { [key: string]: string }, runs_on_node_id?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  Register(body: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_model?: string, node_name?: string, node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE' | 'REMOTE_AMAZON_RDS_NODE', region?: string, reregister?: boolean }): __Observable<{ container_node?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic_node?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, pmm_agent?: { agent_id?: string, connected?: boolean, custom_labels?: { [key: string]: string }, runs_on_node_id?: string } }> {
    return this.RegisterResponse(body).pipe(
      __map(_r => _r.body as { container_node?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic_node?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, pmm_agent?: { agent_id?: string, connected?: boolean, custom_labels?: { [key: string]: string }, runs_on_node_id?: string } })
    );
  }
}

module NodeService {
}

export { NodeService }
