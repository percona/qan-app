import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {RemoteInstance, RemoteInstanceNode, RemoteInstanceService} from '../add-remote-instances/add-remote-instance.service';

@Injectable()
export class RemoteInstancesListService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  async getList(): Promise<RemoteInstance[]> {
    const url = `/managed/v0/remote`;
    const response = await this.http
      .get(url, { headers: this.headers })
      .toPromise();
    return response.json().instances as RemoteInstance[];
  }

  async disable(node: RemoteInstanceNode, service: RemoteInstanceService): Promise<{}> {
    const url = `/managed/v0/${service.type}/${node.id}`;
    const response = await this.http
      .delete(url, {headers: this.headers})
      .toPromise();
    return response.json();
  }

  async getRegistered(service: RemoteInstanceService): Promise<RemoteInstance[]> {
    const url = `/managed/v0/${service.type}`;
    const response = await this.http
      .get(url, {headers: this.headers})
      .toPromise();
    return response.json().instances as RemoteInstance[];
  }
}
