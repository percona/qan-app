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
class ServiceService extends __BaseService {
  static readonly RemoveServiceMixin1Path = '/v1/management/Service/Remove';

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
  RemoveServiceMixin1Response(body: { service_id?: string, service_name?: string, service_type?: 'SERVICE_TYPE_INVALID' | 'MYSQL_SERVICE' | 'AMAZON_RDS_MYSQL_SERVICE' | 'MONGODB_SERVICE' | 'POSTGRESQL_SERVICE' }): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/v1/management/Service/Remove`,
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
  RemoveServiceMixin1(body: { service_id?: string, service_name?: string, service_type?: 'SERVICE_TYPE_INVALID' | 'MYSQL_SERVICE' | 'AMAZON_RDS_MYSQL_SERVICE' | 'MONGODB_SERVICE' | 'POSTGRESQL_SERVICE' }): __Observable<{}> {
    return this.RemoveServiceMixin1Response(body).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ServiceService {
}

export { ServiceService }
