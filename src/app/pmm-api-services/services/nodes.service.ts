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
  AddContainerNodeResponse(body: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_model?: string, node_name?: string, region?: string }): __Observable<__StrictHttpResponse<{ container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } }>> {
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
        return _r as __StrictHttpResponse<{ container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddContainerNode(body: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_model?: string, node_name?: string, region?: string }): __Observable<{ container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } }> {
    return this.AddContainerNodeResponse(body).pipe(
      __map(_r => _r.body as { container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddGenericNodeResponse(body: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_model?: string, node_name?: string, region?: string }): __Observable<__StrictHttpResponse<{ generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } }>> {
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
        return _r as __StrictHttpResponse<{ generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddGenericNode(body: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_model?: string, node_name?: string, region?: string }): __Observable<{ generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } }> {
    return this.AddGenericNodeResponse(body).pipe(
      __map(_r => _r.body as { generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteNodeResponse(body: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_model?: string, node_name?: string, region?: string }): __Observable<__StrictHttpResponse<{ remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } }>> {
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
        return _r as __StrictHttpResponse<{ remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteNode(body: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_model?: string, node_name?: string, region?: string }): __Observable<{ remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } }> {
    return this.AddRemoteNodeResponse(body).pipe(
      __map(_r => _r.body as { remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetNodeResponse(body: { node_id?: string }): __Observable<__StrictHttpResponse<{ container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } }>> {
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
        return _r as __StrictHttpResponse<{ container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetNode(body: { node_id?: string }): __Observable<{ container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } }> {
    return this.GetNodeResponse(body).pipe(
      __map(_r => _r.body as { container?: { address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, generic?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }, remote?: { address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListNodesResponse(body: {}): __Observable<__StrictHttpResponse<{ container?: Array<{ address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, generic?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, remote?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string }> }>> {
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
        return _r as __StrictHttpResponse<{ container?: Array<{ address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, generic?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, remote?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string }> }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListNodes(body: {}): __Observable<{ container?: Array<{ address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, generic?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, remote?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string }> }> {
    return this.ListNodesResponse(body).pipe(
      __map(_r => _r.body as { container?: Array<{ address?: string, az?: string, container_id?: string, container_name?: string, custom_labels?: { [key: string]: string }, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, generic?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, distro?: string, machine_id?: string, node_id?: string, node_model?: string, node_name?: string, region?: string }>, remote?: Array<{ address?: string, az?: string, custom_labels?: { [key: string]: string }, node_id?: string, node_model?: string, node_name?: string, region?: string }> })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveNodeResponse(body: { force?: boolean, node_id?: string }): __Observable<__StrictHttpResponse<{}>> {
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
  RemoveNode(body: { force?: boolean, node_id?: string }): __Observable<{}> {
    return this.RemoveNodeResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module NodesService {
}

export { NodesService }
