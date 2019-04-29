import { Injectable } from '@angular/core';
import { ExternalExporterModel } from './agents-table/models/external-exporter.model';
import { MongoMysqlExporterModel } from './agents-table/models/mongo-mysql-exporter.model';
import { NodeExporterModel } from './agents-table/models/node-exporter.model';
import { PmmAgentModel } from './agents-table/models/pmm-agent.model';
import { RdsExporterModel } from './agents-table/models/rds-exporter.model';
import { ContainerModel } from './nodes-table/models/container.model';
import { GenericModel } from './nodes-table/models/generic.model';
import { RemoteModel } from './nodes-table/models/remote.model';
import { RemoteAmazonRdsModel } from './nodes-table/models/remote-amazon-rds.model';
import { ServicesGeneralModel } from './services-table/models/services-general.model';
import { GeneralAgentModel } from './agents-table/models/general-agent.model';
import { PostgresExporterModel } from './agents-table/models/postgres-exporter.model';

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
      case 'mysqld_exporter':
        return new MongoMysqlExporterModel(params, 'MongoDB');
      case 'node_exporter':
        return new NodeExporterModel(params, 'Node exporter');
      case 'pmm_agent':
        return new PmmAgentModel(params, 'PMM Agent');
      case 'postgres_exporter':
        return new PostgresExporterModel(params, 'Postgres exporter');
      case 'qan_mysql_perfschema_agent':
      case 'qan_mongodb_profiler_agent':
      case 'qan_mysql_slowlog_agent':
        return new GeneralAgentModel(params, 'Qan MySQL Perfschema Agent');
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
      case 'mongodb':
      case 'mysql':
      case 'postgresql':
        return new ServicesGeneralModel(params, 'Amazon RDS MySQL');
      default:
        return {}
    }
  }
}
