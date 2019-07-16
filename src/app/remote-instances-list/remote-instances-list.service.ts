import {Injectable} from '@angular/core';
import {RemoteInstance, RemoteInstanceNode, RemoteInstanceService} from '../add-remote-instances/add-remote-instance.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RemoteInstancesListService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
  }

  async getList(): Promise<RemoteInstance[]> {
    const url = `/managed/v0/remote`;
    const response = await this.http
      .get(url, { headers: this.headers })
      .toPromise();
    return response['instances'] as RemoteInstance[];
  }

  async disable(node: RemoteInstanceNode, service: RemoteInstanceService): Promise<{}> {
    const url = `/managed/v0/${service.type}/${node.id}`;
    return await this.http
      .delete(url, {headers: this.headers})
      .toPromise();
  }
}
