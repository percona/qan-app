import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {RemoteInstance, RemoteInstanceNode, RemoteInstanceService} from '../add-remote-instances/add-remote-instance.service';

@Injectable()
export class RemoteInstancesListService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  async getList(): Promise<RemoteInstance[]> {
    const url = `/managed/v0/remote`;
    const response: any = await this.httpClient
      .get(url, {headers: this.httpHeaders})
      .toPromise();
    return response.instances as RemoteInstance[];
  }

  async disable(node: RemoteInstanceNode, service: RemoteInstanceService): Promise<{}> {
    const url = `/managed/v0/${service.type}/${node.id}`;
    return await this.httpClient
      .delete(url, {headers: this.httpHeaders})
      .toPromise();
  }
}
