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
  static readonly AddAmazonRDSMySQLServicePath = '/v1/inventory/Services/AddAmazonRDSMySQL';
  static readonly AddMySQLServicePath = '/v1/inventory/Services/AddMySQL';
  static readonly ChangeAmazonRDSMySQLServicePath = '/v1/inventory/Services/ChangeAmazonRDSMySQL';
  static readonly ChangeMySQLServicePath = '/v1/inventory/Services/ChangeMySQL';
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
  AddAmazonRDSMySQLServiceResponse(body: {address?: string, node_id?: string, port?: number, service_name?: string}): __Observable<__StrictHttpResponse<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/AddAmazonRDSMySQL`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddAmazonRDSMySQLService(body: {address?: string, node_id?: string, port?: number, service_name?: string}): __Observable<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}}> {
    return this.AddAmazonRDSMySQLServiceResponse(body).pipe(
      __map(_r => _r.body as {amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLServiceResponse(body: {address?: string, node_id?: string, port?: number, service_name?: string, unix_socket?: string}): __Observable<__StrictHttpResponse<{mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}>> {
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
        return _r as __StrictHttpResponse<{mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  AddMySQLService(body: {address?: string, node_id?: string, port?: number, service_name?: string, unix_socket?: string}): __Observable<{mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}> {
    return this.AddMySQLServiceResponse(body).pipe(
      __map(_r => _r.body as {mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeAmazonRDSMySQLServiceResponse(body: {address?: string, port?: number, service_id?: string, service_name?: string}): __Observable<__StrictHttpResponse<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/ChangeAmazonRDSMySQL`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeAmazonRDSMySQLService(body: {address?: string, port?: number, service_id?: string, service_name?: string}): __Observable<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}}> {
    return this.ChangeAmazonRDSMySQLServiceResponse(body).pipe(
      __map(_r => _r.body as {amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeMySQLServiceResponse(body: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}): __Observable<__StrictHttpResponse<{mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/inventory/Services/ChangeMySQL`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ChangeMySQLService(body: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}): __Observable<{mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}> {
    return this.ChangeMySQLServiceResponse(body).pipe(
      __map(_r => _r.body as {mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  GetServiceResponse(body: {service_id?: string}): __Observable<__StrictHttpResponse<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}, mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}>> {
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
        return _r as __StrictHttpResponse<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}, mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  GetService(body: {service_id?: string}): __Observable<{amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}, mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}}> {
    return this.GetServiceResponse(body).pipe(
      __map(_r => _r.body as {amazon_rds_mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}, mysql?: {address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  ListServicesResponse(body: {node_id?: string}): __Observable<__StrictHttpResponse<{amazon_rds_mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}>, mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}>}>> {
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
        return _r as __StrictHttpResponse<{amazon_rds_mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}>, mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}>}>;
      })
    );
  }
  /**
   * @param body undefined
   * @return A successful response.
   */
  ListServices(body: {node_id?: string}): __Observable<{amazon_rds_mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}>, mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}>}> {
    return this.ListServicesResponse(body).pipe(
      __map(_r => _r.body as {amazon_rds_mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string}>, mysql?: Array<{address?: string, node_id?: string, port?: number, service_id?: string, service_name?: string, unix_socket?: string}>})
    );
  }

  /**
   * @param body undefined
   * @return A successful response.
   */
  RemoveServiceResponse(body: {service_id?: string}): __Observable<__StrictHttpResponse<{}>> {
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
  RemoveService(body: {service_id?: string}): __Observable<{}> {
    return this.RemoveServiceResponse(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ServicesService {
}

export { ServicesService }
