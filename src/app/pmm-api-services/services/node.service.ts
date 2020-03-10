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
  static readonly RegisterNodePath = '/v1/management/Node/Register';

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
  RegisterNodeResponse(body: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, address?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string }, reregister?: boolean }): __Observable<__StrictHttpResponse<{ container_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/management/Node/Register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ container_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  RegisterNode(body: { node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE', node_name?: string, address?: string, machine_id?: string, distro?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string }, reregister?: boolean }): __Observable<{ container_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } }> {
    return this.RegisterNodeResponse(body).pipe(
      __map(_r => _r.body as { container_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic_node?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, pmm_agent?: { agent_id?: string, runs_on_node_id?: string, custom_labels?: { [key: string]: string }, connected?: boolean } })
    );
  }
}

module NodeService {
}

export { NodeService }
