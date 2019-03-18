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
class NodesService extends __BaseService {
  static readonly AddContainerNodePath = '/v1/inventory/Nodes/AddContainer';
  static readonly AddGenericNodePath = '/v1/inventory/Nodes/AddGeneric';
  static readonly AddRemoteNodePath = '/v1/inventory/Nodes/AddRemote';
  static readonly AddRemoteAmazonRDSNodePath = '/v1/inventory/Nodes/AddRemoteAmazonRDS';
  static readonly ChangeContainerNodePath = '/v1/inventory/Nodes/ChangeContainer';
  static readonly ChangeGenericNodePath = '/v1/inventory/Nodes/ChangeGeneric';
  static readonly ChangeRemoteNodePath = '/v1/inventory/Nodes/ChangeRemote';
  static readonly ChangeRemoteAmazonRDSNodePath = '/v1/inventory/Nodes/ChangeRemoteAmazonRDS';
  static readonly GetNodePath = '/v1/inventory/Nodes/Get';
  static readonly ListNodesPath = '/v1/inventory/Nodes/List';
  static readonly RemoveNodePath = '/v1/inventory/Nodes/Remove';

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
  AddContainerNodeResponse(body: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_name?: string}): __Observable<__StrictHttpResponse<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/AddContainer`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddContainerNode(body: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_name?: string}): __Observable<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}}> {
    return this.AddContainerNodeResponse(body).pipe(
      __map(_r => _r.body as {container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddGenericNodeResponse(body: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_name?: string}): __Observable<__StrictHttpResponse<{generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/AddGeneric`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddGenericNode(body: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_name?: string}): __Observable<{generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}> {
    return this.AddGenericNodeResponse(body).pipe(
      __map(_r => _r.body as {generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteNodeResponse(body: {custom_labels?: {[key: string]: string}, node_name?: string}): __Observable<__StrictHttpResponse<{remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/AddRemote`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteNode(body: {custom_labels?: {[key: string]: string}, node_name?: string}): __Observable<{remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}}> {
    return this.AddRemoteNodeResponse(body).pipe(
      __map(_r => _r.body as {remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteAmazonRDSNodeResponse(body: {custom_labels?: {[key: string]: string}, instance?: string, node_name?: string, region?: string}): __Observable<__StrictHttpResponse<{remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/AddRemoteAmazonRDS`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteAmazonRDSNode(body: {custom_labels?: {[key: string]: string}, instance?: string, node_name?: string, region?: string}): __Observable<{remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}> {
    return this.AddRemoteAmazonRDSNodeResponse(body).pipe(
      __map(_r => _r.body as {remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeContainerNodeResponse(body: {custom_labels?: {[key: string]: string}, docker_container_name?: string, node_id?: string, node_name?: string}): __Observable<__StrictHttpResponse<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/ChangeContainer`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeContainerNode(body: {custom_labels?: {[key: string]: string}, docker_container_name?: string, node_id?: string, node_name?: string}): __Observable<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}}> {
    return this.ChangeContainerNodeResponse(body).pipe(
      __map(_r => _r.body as {container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeGenericNodeResponse(body: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, node_id?: string, node_name?: string}): __Observable<__StrictHttpResponse<{generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/ChangeGeneric`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeGenericNode(body: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, node_id?: string, node_name?: string}): __Observable<{generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}}> {
    return this.ChangeGenericNodeResponse(body).pipe(
      __map(_r => _r.body as {generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeRemoteNodeResponse(body: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}): __Observable<__StrictHttpResponse<{remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/ChangeRemote`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeRemoteNode(body: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}): __Observable<{remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}}> {
    return this.ChangeRemoteNodeResponse(body).pipe(
      __map(_r => _r.body as {remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeRemoteAmazonRDSNodeResponse(body: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string}): __Observable<__StrictHttpResponse<{remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/ChangeRemoteAmazonRDS`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeRemoteAmazonRDSNode(body: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string}): __Observable<{remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}> {
    return this.ChangeRemoteAmazonRDSNodeResponse(body).pipe(
      __map(_r => _r.body as {remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetNodeResponse(body: {node_id?: string}): __Observable<__StrictHttpResponse<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}, remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}, remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}, remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}, remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetNode(body: {node_id?: string}): __Observable<{container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}, remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}, remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}}> {
    return this.GetNodeResponse(body).pipe(
      __map(_r => _r.body as {container?: {custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}, generic?: {address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}, remote?: {custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}, remote_amazon_rds?: {custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListNodesResponse(body: {}): __Observable<__StrictHttpResponse<{container?: Array<{custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}>, generic?: Array<{address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}>, remote?: Array<{custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}>, remote_amazon_rds?: Array<{custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/List`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{container?: Array<{custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}>, generic?: Array<{address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}>, remote?: Array<{custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}>, remote_amazon_rds?: Array<{custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}>}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListNodes(body: {}): __Observable<{container?: Array<{custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}>, generic?: Array<{address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}>, remote?: Array<{custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}>, remote_amazon_rds?: Array<{custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}>}> {
    return this.ListNodesResponse(body).pipe(
      __map(_r => _r.body as {container?: Array<{custom_labels?: {[key: string]: string}, docker_container_id?: string, docker_container_name?: string, machine_id?: string, node_id?: string, node_name?: string}>, generic?: Array<{address?: string, custom_labels?: {[key: string]: string}, distro?: string, distro_version?: string, machine_id?: string, node_id?: string, node_name?: string}>, remote?: Array<{custom_labels?: {[key: string]: string}, node_id?: string, node_name?: string}>, remote_amazon_rds?: Array<{custom_labels?: {[key: string]: string}, instance?: string, node_id?: string, node_name?: string, region?: string}>})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveNodeResponse(body: {node_id?: string}): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Nodes/Remove`,
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
  RemoveNode(body: {node_id?: string}): __Observable<{}> {
    return this.RemoveNodeResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module NodesService {
}

export { NodesService }