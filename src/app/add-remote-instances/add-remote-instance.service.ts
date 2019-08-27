import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface AddNode {
  node_name: string
  node_type: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE' | 'REMOTE_AMAZON_RDS_NODE'
  machine_id?: string
  distro?: string
  container_id?: string
  container_name?: string
  node_model?: string
  region?: string
  az?: string
  custom_labels?: { [key: string]: string }
}

export interface BaseCredentials {
  node_id?: string
  add_node?: AddNode
  address?: string
  service_name?: string
  port?: number
  username?: string
  password?: string
  environment?: string
  replication_set?: string
  cluster?: string
  custom_labels?: { [key: string]: string }
  pmm_agent_id?: string
  skip_connection_check?: boolean
}

export interface AddMySQLCredentials extends BaseCredentials {
  qan_mysql_perfschema?: boolean
  qan_mysql_slowlog?: boolean
}

export interface NodeContainer {
  address?: string
  az?: string
  container_id?: string
  container_name?: string
  custom_labels?: { [key: string]: string }
  machine_id?: string
  node_id?: string
  node_model?: string
  node_name?: string
  region?: string
}

export interface NodeGeneric {
  address?: string
  az?: string
  custom_labels?: { [key: string]: string }
  distro?: string
  machine_id?: string
  node_id?: string
  node_model?: string
  node_name?: string
  region?: string
}

export interface NodeRemote {
  address?: string
  az?: string
  custom_labels?: { [key: string]: string }
  node_id?: string
  node_name?: string
  region?: string
}

export interface NodeRemoteAmazon {
  custom_labels?: { [key: string]: string }
  instance?: string
  node_id?: string
  node_name?: string
  region?: string
}

export interface Node {
  container?: Array<NodeContainer>
  generic?: Array<NodeGeneric>
  remote?: Array<NodeRemote>
  remote_amazon_rds?: Array<NodeRemoteAmazon>
}

export class NodeType {
  value: string;
  label: string;

  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
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

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  instanceUrlPart: string;

  constructor(private httpClient: HttpClient) {
  }

  // async enable(remoteInstanceCredentials: AddMySQLCredentials, currentUrl): Promise<{}> {
  //   this.instanceUrlPart = this.checkInstanceType(currentUrl);
  //
  //   const url = `/managed/v0/${this.instanceUrlPart}`;
  //   const data = {
  //     address: remoteInstanceCredentials.address,
  //     name: remoteInstanceCredentials.name,
  //     port: remoteInstanceCredentials.port,
  //     password: remoteInstanceCredentials.password,
  //     username: remoteInstanceCredentials.username
  //   };
  //   return await this.httpClient
  //     .post(url, data, { headers: this.httpHeaders })
  //     .toPromise()
  // }

  /**
   * Returns type of remote instance
   * @param currentUrl current page url
   */
  checkInstanceType(currentUrl) {
    return currentUrl === '/add-remote-postgres' ? 'postgresql' : 'mysql';
  }
}
