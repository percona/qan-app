import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';


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

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  async discover(rdsCredentials: RDSCredentials): Promise<RDSInstance[]> {
    const url = `/managed/v0/rds/discover`;
    const data = {
      aws_access_key_id: rdsCredentials.aws_access_key_id,
      aws_secret_access_key: rdsCredentials.aws_secret_access_key
    };
    const response: any = await this.httpClient
        .post(url, data, { headers: this.httpHeaders })
        .toPromise();
    console.log('response disc - ', response.instances);
    return response.instances as RDSInstance[];
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
    return await this.httpClient
        .post(url, data, { headers: this.httpHeaders })
        .toPromise();
  }

  async disable(node: RDSNode): Promise<{}> {
    const url = `/managed/v0/rds`;
    const body = {id: {name: node.name, region: node.region}};
    const response = await this.httpClient.request('delete', url, { headers: this.httpHeaders, body: body })
        .toPromise();
    console.log('response dis - ', response);
    return response;
  }

  async getRegistered(): Promise<RDSInstance[]> {
    const url = `/managed/v0/rds`;
    const response = await this.httpClient.request('get', url, { headers: this.httpHeaders  })
        .toPromise();
    console.log('response get reg - ', response);
    return response as RDSInstance[];
  }
}
