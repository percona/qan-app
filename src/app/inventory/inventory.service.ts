import { Injectable } from '@angular/core';
import { ExternalExporterModel } from './agents-table/models/external-exporter.model';
import { MongodbExporterModel } from './agents-table/models/mongodb-exporter.model';
import { MysqlExporterModel } from './agents-table/models/mysql-exporter.model';
import { NodeExporterModel } from './agents-table/models/node-exporter.model';
import { PmmAgentModel } from './agents-table/models/pmm-agent.model';
import { RdsExporterModel } from './agents-table/models/rds-exporter.model';
import { ContainerModel } from './nodes-table/models/container.model';
import { GenericModel } from './nodes-table/models/generic.model';
import { RemoteModel } from './nodes-table/models/remote.model';
import { RemoteAmazonRdsModel } from './nodes-table/models/remote-amazon-rds.model';
import { AmazonRdsMysqlModel } from './services-table/models/amazon-rds-mysql.model';
import { MongodbModel } from './services-table/models/mongodb.model';
import { MysqlModel } from './services-table/models/mysql.model';
import { QanMysqlPerfschemaAgentModel } from './agents-table/models/qan-mysql-perfschema-agent.model';
import { PostgresExporterModel } from './agents-table/models/postgres-exporter.model';
import { PostgreSQLModel } from './services-table/models/postgresql.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() {
  }

  generateStructure(item) {
    const addAgentType = Object.keys(item).map(agentType => new Object({ agentType: agentType, params: item[agentType] }));
    const createParams = addAgentType.map(agent => agent['params'].map(arrItem => this.checkType(arrItem, agent['agentType'])));
    return [].concat(...createParams);
  }

  checkType(params, type) {
    switch (type) {
      case 'external_exporter':
        return new ExternalExporterModel(params, 'External exporter');
      case 'mongodb_exporter':
        return new MongodbExporterModel(params, 'MongoDB');
      case 'mysqld_exporter':
        return new MysqlExporterModel(params, 'MySQL exporter');
      case 'node_exporter':
        return new NodeExporterModel(params, 'Node exporter');
      case 'pmm_agent':
        return new PmmAgentModel(params, 'PMM Agent');
      case 'postgres_exporter':
        return new PostgresExporterModel(params, 'Postgres exporter');
      case 'qan_mysql_perfschema_agent':
        return new QanMysqlPerfschemaAgentModel(params, 'Qan MySQL Perfschema Agent');
      case 'rds_exporter':
        return new RdsExporterModel(params, 'RDS exporter');
      case 'container':
        return new ContainerModel(params, 'Container');
      case 'generic':
        return new GenericModel(params, 'Generic');
      case 'remote':
        return new RemoteModel(params, 'Remote');
      case 'remote_amazon_rds':
        return new RemoteAmazonRdsModel(params, 'Remote Amazon RDS');
      case 'amazon_rds_mysql':
        return new AmazonRdsMysqlModel(params, 'Amazon RDS MySQL');
      case 'mongodb':
        return new MongodbModel(params, 'MongoDB');
      case 'mysql':
        return new MysqlModel(params, 'MySQL');
      case 'postgresql':
        return new PostgreSQLModel(params, 'PostgreSQL');
      default:
        return {}
    }
  }
}
