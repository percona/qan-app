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
  AddMongoDBServiceResponse(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<__StrictHttpResponse<{mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>> {
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
        return _r as __StrictHttpResponse<{mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMongoDBService(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<{mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}> {
    return this.AddMongoDBServiceResponse(body).pipe(
      __map(_r => _r.body as {mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLServiceResponse(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<__StrictHttpResponse<{mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>> {
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
        return _r as __StrictHttpResponse<{mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLService(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<{mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}> {
    return this.AddMySQLServiceResponse(body).pipe(
      __map(_r => _r.body as {mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPostgreSQLServiceResponse(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<__StrictHttpResponse<{postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>> {
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
        return _r as __StrictHttpResponse<{postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddPostgreSQLService(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<{postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}> {
    return this.AddPostgreSQLServiceResponse(body).pipe(
      __map(_r => _r.body as {postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddProxySQLServiceResponse(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<__StrictHttpResponse<{proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>> {
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
        return _r as __StrictHttpResponse<{proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddProxySQLService(body: {service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}): __Observable<{proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}> {
    return this.AddProxySQLServiceResponse(body).pipe(
      __map(_r => _r.body as {proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetServiceResponse(body: {service_id?: string}): __Observable<__StrictHttpResponse<{mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>> {
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
        return _r as __StrictHttpResponse<{mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetService(body: {service_id?: string}): __Observable<{mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}}> {
    return this.GetServiceResponse(body).pipe(
      __map(_r => _r.body as {mysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, mongodb?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, postgresql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}, proxysql?: {service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListServicesResponse(body: {node_id?: string, service_type?: 'SERVICE_TYPE_INVALID' | 'MYSQL_SERVICE' | 'MONGODB_SERVICE' | 'POSTGRESQL_SERVICE' | 'PROXYSQL_SERVICE'}): __Observable<__StrictHttpResponse<{mysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, mongodb?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, postgresql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, proxysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>}>> {
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
        return _r as __StrictHttpResponse<{mysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, mongodb?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, postgresql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, proxysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListServices(body: {node_id?: string, service_type?: 'SERVICE_TYPE_INVALID' | 'MYSQL_SERVICE' | 'MONGODB_SERVICE' | 'POSTGRESQL_SERVICE' | 'PROXYSQL_SERVICE'}): __Observable<{mysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, mongodb?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, postgresql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, proxysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>}> {
    return this.ListServicesResponse(body).pipe(
      __map(_r => _r.body as {mysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, mongodb?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, postgresql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>, proxysql?: Array<{service_id?: string, service_name?: string, node_id?: string, address?: string, port?: number, environment?: string, cluster?: string, replication_set?: string, custom_labels?: {[key: string]: string}}>})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveServiceResponse(body: {service_id?: string, force?: boolean}): __Observable<__StrictHttpResponse<{}>> {
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
  RemoveService(body: {service_id?: string, force?: boolean}): __Observable<{}> {
    return this.RemoveServiceResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ServicesService {
}

export { ServicesService }
