import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';


export interface RemoteInstanceCredentials {
  name: string
  address: string;
  port: number;
  username: string;
  password: string;
}

export interface RemoteInstanceNode {
  id: number
  name: string
}

export interface RemoteInstanceService {
  address: string;
  port: number;
  engine: string;
  engine_version: string;
}

export interface RemoteInstance {
  node: RemoteInstanceNode;
  service: RemoteInstanceService;
}

@Injectable()
export class AddRemoteInstanceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  instanceUrlPart: string;

  constructor(private http: Http) {
  }

  async enable(remoteInstanceCredentials: RemoteInstanceCredentials, currentUrl): Promise<{}> {
    this.instanceUrlPart = this.checkInstanceType(currentUrl);

    const url = `/managed/v0/${this.instanceUrlPart}`;
    const data = {
      name: remoteInstanceCredentials.name,
      address: remoteInstanceCredentials.address,
      port: remoteInstanceCredentials.port,
      password: remoteInstanceCredentials.password,
      username: remoteInstanceCredentials.username
    };
    const response = await this.http
      .post(url, data, {headers: this.headers})
      .toPromise();
    return response.json();
  }

  async disable(node: RemoteInstanceNode, currentUrl): Promise<{}> {
    this.instanceUrlPart = this.checkInstanceType(currentUrl);

    const url = `/managed/v0/${this.instanceUrlPart}/${node.id}`;
    const response = await this.http
      .delete(url, {headers: this.headers})
      .toPromise();
    return response.json();
  }

  // async getRegistered(currentUrl): Promise<RemoteInstance[]> {
  //   this.instanceUrlPart = this.checkInstanceType(currentUrl);
  //
  //   const url = `/managed/v0/${this.instanceUrlPart}`;
  //   const response = await this.http
  //     .get(url, {headers: this.headers})
  //     .toPromise();
  //   return response.json().instances as RemoteInstance[];
  // }

  /**
   * Returns type of remote instance
   * @param currentUrl current page url
   */
  checkInstanceType(currentUrl) {
    return currentUrl === '/add-remote-postgres' ? 'postgresql' : 'mysql';
  }
}
