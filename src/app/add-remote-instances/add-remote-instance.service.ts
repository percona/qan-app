import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MySQLService } from '../pmm-api-services/services/my-sql.service';
import { PostgreSQLService } from '../pmm-api-services/services/postgre-sql.service';
import { Observable } from 'rxjs';
import { MongoDBService } from '../pmm-api-services/services/mongo-db.service';
import { ProxySQLService } from '../pmm-api-services/services/proxy-sql.service';

export interface AddNodeParams {
  node_name: string
  node_type: 'NODE_TYPE_INVALID' | 'GENERIC_NODE' | 'CONTAINER_NODE' | 'REMOTE_NODE'
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
  add_node?: AddNodeParams
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
  tls?: boolean
  tls_skip_verify?: boolean
}

export interface AddMySQLCredentials extends BaseCredentials {
  qan_mysql_perfschema?: boolean
  qan_mysql_slowlog?: boolean
}

export interface AddPostgreSQLCredentials extends BaseCredentials {
  qan_postgresql_pgstatements_agent?: boolean
}

export interface AddMongoDBCredentials extends BaseCredentials {
  qan_mongodb_profiler?: boolean
}

// tslint:disable-next-line:no-empty-interface
export interface AddProxySQLCredentials extends BaseCredentials { }

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

  constructor(
    private mySQLService: MySQLService,
    private postgreSQLService: PostgreSQLService,
    private mongodbService: MongoDBService,
    private proxySQLService: ProxySQLService
  ) {
  }
  /**
   * Returns type of remote instance
   * @param currentUrl current page url
   */
  checkInstanceType(currentUrl) {
    return currentUrl.replace('/add-remote-', '');
  }

  addService(remoteInstanceCredentials: BaseCredentials, currentUrl: string) {
    const instanceType = this.checkInstanceType(currentUrl);
    switch (instanceType) {
      case 'mysql':
        return this.mySQLService.AddMySQL(remoteInstanceCredentials);
      case 'postgresql':
        return this.postgreSQLService.AddPostgreSQL(remoteInstanceCredentials);
      case 'mongodb':
        return this.mongodbService.AddMongoDB(remoteInstanceCredentials);
      case 'proxysql':
        return this.proxySQLService.AddProxySQL(remoteInstanceCredentials);
      default:
        return Observable.throw({ error: { error: 'unsupported instance type' } });
    }
  }
}
