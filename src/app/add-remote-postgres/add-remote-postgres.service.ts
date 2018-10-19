import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';


export interface PostgreSQLCredentials {
  name: string
  address: string;
  port: number;
  username: string;
  password: string;
}

export interface PostgreSQLNode {
  id: number
  name: string
}

export interface PostgreSQLService {
  address: string;
  port: number;
  engine: string;
  engine_version: string;
}

export interface PostgreSQLInstance {
  node: PostgreSQLNode;
  service: PostgreSQLService;
}

@Injectable()
export class AddRemotePostgresService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  async enable(postgresCredentials: PostgreSQLCredentials): Promise<{}> {
    const url = `/managed/v0/postgresql`;
    const data = {
      name: postgresCredentials.name,
      address: postgresCredentials.address,
      port: postgresCredentials.port,
      password: postgresCredentials.password,
      username: postgresCredentials.username
    };
    const response = await this.http
      .post(url, data, {headers: this.headers})
      .toPromise();
    return response.json();
  }

  async disable(node: PostgreSQLNode): Promise<{}> {
    const url = `/managed/v0/postgresql/${node.id}`;
    const response = await this.http
      .delete(url, {headers: this.headers})
      .toPromise();
    return response.json();
  }

  async getRegistered(): Promise<PostgreSQLInstance[]> {
    const url = `/managed/v0/postgresql`;
    const response = await this.http
      .get(url, {headers: this.headers})
      .toPromise();
    return response.json().instances as PostgreSQLInstance[];
  }
}
