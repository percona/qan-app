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
  static readonly RegisterPath = '/v1/management/Node/Register';

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
  RegisterResponse(body: {custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_name?: string, node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE' | 'REMOTE_AMAZON_RDS_NODE'}): __Observable<__StrictHttpResponse<{container_node?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic_node?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}>> {
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
        return _r as __StrictHttpResponse<{container_node?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic_node?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  Register(body: {custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_name?: string, node_type?: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE' | 'REMOTE_AMAZON_RDS_NODE'}): __Observable<{container_node?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic_node?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}> {
    return this.RegisterResponse(body).pipe(
      __map(_r => _r.body as {container_node?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic_node?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}})
    );
  }
}

module NodeService {
}

export { NodeService }
