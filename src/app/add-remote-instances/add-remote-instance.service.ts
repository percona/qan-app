import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export interface RemoteInstanceCredentials {
  address: string;
  name: string;
  port: string;
  username: string;
  password: string;
}

export interface RemoteInstanceNode {
  id: number
  name: string
  region: string
}

export interface RemoteInstanceService {
  type: string;
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

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  instanceUrlPart: string;

  constructor(private http: HttpClient) {
  }

  async enable(remoteInstanceCredentials: RemoteInstanceCredentials, currentUrl): Promise<{}> {
    this.instanceUrlPart = this.checkInstanceType(currentUrl);

    const url = `/managed/v0/${this.instanceUrlPart}`;
    const data = {
      address: remoteInstanceCredentials.address,
      name: remoteInstanceCredentials.name,
      port: remoteInstanceCredentials.port,
      password: remoteInstanceCredentials.password,
      username: remoteInstanceCredentials.username
    };
    return await this.http
      .post(url, data, {headers: this.headers})
      .toPromise();
  }

  /**
   * Returns type of remote instance
   * @param currentUrl current page url
   */
  checkInstanceType(currentUrl) {
    return currentUrl === '/add-remote-postgres' ? 'postgresql' : 'mysql';
  }
}
