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
class ServicesService extends __BaseService {
  static readonly AddMongoDBServicePath = '/v1/inventory/Services/AddMongoDB';
  static readonly AddMySQLServicePath = '/v1/inventory/Services/AddMySQL';
  static readonly AddPostgreSQLServicePath = '/v1/inventory/Services/AddPostgreSQL';
  static readonly AddProxySQLServicePath = '/v1/inventory/Services/AddProxySQL';
  static readonly GetServicePath = '/v1/inventory/Services/Get';
  static readonly ListServicesPath = '/v1/inventory/Services/List';
  static readonly RemoveServicePath = '/v1/inventory/Services/Remove';

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
  AddMongoDBServiceResponse(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<__StrictHttpResponse<{ mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/AddMongoDB`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMongoDBService(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<{ mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }> {
    return this.AddMongoDBServiceResponse(body).pipe(
      __map(_r => _r.body as { mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLServiceResponse(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<__StrictHttpResponse<{ mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/AddMySQL`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLService(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<{ mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }> {
    return this.AddMySQLServiceResponse(body).pipe(
      __map(_r => _r.body as { mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPostgreSQLServiceResponse(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<__StrictHttpResponse<{ postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/AddPostgreSQL`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPostgreSQLService(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<{ postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }> {
    return this.AddPostgreSQLServiceResponse(body).pipe(
      __map(_r => _r.body as { postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddProxySQLServiceResponse(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<__StrictHttpResponse<{ proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/AddProxySQL`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddProxySQLService(body: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_name?: string }): __Observable<{ proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }> {
    return this.AddProxySQLServiceResponse(body).pipe(
      __map(_r => _r.body as { proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetServiceResponse(body: { service_id?: string }): __Observable<__StrictHttpResponse<{ mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetService(body: { service_id?: string }): __Observable<{ mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } }> {
    return this.GetServiceResponse(body).pipe(
      __map(_r => _r.body as { mongodb?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, mysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, postgresql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }, proxysql?: { address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string } })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListServicesResponse(body: { node_id?: string }): __Observable<__StrictHttpResponse<{ mongodb?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, mysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, postgresql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, proxysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }> }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/List`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ mongodb?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, mysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, postgresql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, proxysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }> }>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListServices(body: { node_id?: string }): __Observable<{ mongodb?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, mysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, postgresql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, proxysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }> }> {
    return this.ListServicesResponse(body).pipe(
      __map(_r => _r.body as { mongodb?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, mysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, postgresql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }>, proxysql?: Array<{ address?: string, cluster?: string, custom_labels?: { [key: string]: string }, environment?: string, node_id?: string, port?: number, replication_set?: string, service_id?: string, service_name?: string }> })
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveServiceResponse(body: { force?: boolean, service_id?: string }): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/Remove`,
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
  RemoveService(body: { force?: boolean, service_id?: string }): __Observable<{}> {
    return this.RemoveServiceResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ServicesService {
}

export { ServicesService }
