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
  AddContainerNodeResponse(body: { node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }): __Observable<__StrictHttpResponse<{ container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>> {
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
        return _r as __StrictHttpResponse<{ container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddContainerNode(body: { node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }): __Observable<{ container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }> {
    return this.AddContainerNodeResponse(body).pipe(
      __map(_r => _r.body as { container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddGenericNodeResponse(body: { node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }): __Observable<__StrictHttpResponse<{ generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>> {
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
        return _r as __StrictHttpResponse<{ generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddGenericNode(body: { node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }): __Observable<{ generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }> {
    return this.AddGenericNodeResponse(body).pipe(
      __map(_r => _r.body as { generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteNodeResponse(body: { node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }): __Observable<__StrictHttpResponse<{ remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>> {
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
        return _r as __StrictHttpResponse<{ remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddRemoteNode(body: { node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }): __Observable<{ remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }> {
    return this.AddRemoteNodeResponse(body).pipe(
      __map(_r => _r.body as { remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetNodeResponse(body: { node_id?: string }): __Observable<__StrictHttpResponse<{ container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>> {
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
        return _r as __StrictHttpResponse<{ container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetNode(body: { node_id?: string }): __Observable<{ container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } }> {
    return this.GetNodeResponse(body).pipe(
      __map(_r => _r.body as { container?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, generic?: { node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }, remote?: { node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListNodesResponse(body: {}): __Observable<__StrictHttpResponse<{ generic?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, container?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, remote?: Array<{ node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }> }>> {
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
        return _r as __StrictHttpResponse<{ generic?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, container?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, remote?: Array<{ node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }> }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListNodes(body: {}): __Observable<{ generic?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, container?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, remote?: Array<{ node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }> }> {
    return this.ListNodesResponse(body).pipe(
      __map(_r => _r.body as { generic?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, distro?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, container?: Array<{ node_id?: string, node_name?: string, address?: string, machine_id?: string, container_id?: string, container_name?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }>, remote?: Array<{ node_id?: string, node_name?: string, address?: string, node_model?: string, region?: string, az?: string, custom_labels?: { [key: string]: string } }> })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveNodeResponse(body: { node_id?: string, force?: boolean }): __Observable<__StrictHttpResponse<{}>> {
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
  RemoveNode(body: { node_id?: string, force?: boolean }): __Observable<{}> {
    return this.RemoveNodeResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module NodesService {
}

export { NodesService }
