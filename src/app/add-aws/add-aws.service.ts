import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

export class RDSCredentials {
  constructor(public aws_access_key_id = '', public aws_secret_access_key = '') {}
}

export class MySQLCredentials {
  constructor(public username = '', public password = '') {}
}

export interface RDSNode {
  name: string;
  region: string;
}

export interface RDSService {
  address: string;
  port: number;
  engine: string;
  engine_version: string;
}

export interface RDSInstance {
  node: RDSNode;
  service: RDSService;
}

@Injectable()
export class AddAwsService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  async discover(rdsCredentials: RDSCredentials): Promise<RDSInstance[]> {
    const url = `/managed/v0/rds/discover`;
    const data = {
      aws_access_key_id: rdsCredentials.aws_access_key_id,
      aws_secret_access_key: rdsCredentials.aws_secret_access_key
    };
    const response = await this.http
        .post(url, data, { headers: this.headers })
        .toPromise();
    return response.json().instances as RDSInstance[];
  }

  async enable(rdsCredentials: RDSCredentials, node: RDSNode, mysqlCredentials: MySQLCredentials): Promise<{}> {
    const url = `/managed/v0/rds`;
    const data = {
      aws_access_key_id: rdsCredentials.aws_access_key_id,
      aws_secret_access_key: rdsCredentials.aws_secret_access_key,
      id: { name: node.name, region: node.region },
      password: mysqlCredentials.password,
      username: mysqlCredentials.username
    };
    const response = await this.http
        .post(url, data, { headers: this.headers })
        .toPromise();
    return response.json();
  }

  async disable(node: RDSNode): Promise<{}> {
    const url = `/managed/v0/rds`;
    const body = {id: {name: node.name, region: node.region}};
    const response = await this.http
        .delete(url, { headers: this.headers, body: body })
        .toPromise();
    return response.json();
  }

  async getRegistered(): Promise<RDSInstance[]> {
    const url = `/managed/v0/rds`;
    const response = await this.http
        .get(url, { headers: this.headers })
        .toPromise();
    console.log('response getReg - ', response);
    return response.json().instances as RDSInstance[];
  }
}
