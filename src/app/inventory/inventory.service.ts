import { Injectable } from '@angular/core';
import { ExternalExporterModel } from './agents-table/models/external-exporter.model';
import { GeneralDbExporterModel } from './agents-table/models/general-db-exporter.model';
import { NodeExporterModel } from './agents-table/models/node-exporter.model';
import { PmmAgentModel } from './agents-table/models/pmm-agent.model';
import { RdsExporterModel } from './agents-table/models/rds-exporter.model';
import { ContainerModel } from './nodes-table/models/container.model';
import { GenericModel } from './nodes-table/models/generic.model';
import { RemoteModel } from './nodes-table/models/remote.model';
import { RemoteAmazonRdsModel } from './nodes-table/models/remote-amazon-rds.model';
import { ServicesGeneralModel } from './services-table/models/services-general.model';
import { GeneralQanAgentModel } from './agents-table/models/general-qan-agent.model';

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
      case 'postgres_exporter':
      case 'proxysql_exporter':
        return new GeneralDbExporterModel(params, this.humanizeType(type));
      case 'node_exporter':
        return new NodeExporterModel(params, 'Node exporter');
      case 'pmm_agent':
        return new PmmAgentModel(params, 'PMM Agent');
      case 'qan_mongodb_profiler_agent':
      case 'qan_mysql_perfschema_agent':
      case 'qan_mysql_slowlog_agent':
      case 'qan_postgresql_pgstatements_agent':
        return new GeneralQanAgentModel(params, this.humanizeType(type));
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
      case 'proxysql':
        return new ServicesGeneralModel(params, this.humanizeType(type));
      default:
        return {}
    }
  }

  humanizeType(type: string) {
    switch (type) {
      case 'mongodb_exporter':
        return 'MongoDB exporter';
      case 'mysqld_exporter':
        return 'MySQL exporter';
      case 'postgres_exporter':
        return 'Postgres exporter';
      case 'proxysql_exporter':
        return 'ProxySQL exporter';
      case 'qan_mysql_perfschema_agent':
        return 'Qan MySQL Perfschema Agent';
      case 'qan_mongodb_profiler_agent':
        return 'Qan MongoDB Profiler Agent';
      case 'qan_mysql_slowlog_agent':
        return 'Qan MySQL Slowlog Agent';
      case 'qan_postgresql_pgstatements_agent':
        return 'QAN PostgreSQL PgStatements Agent';
      case 'amazon_rds_mysql':
        return 'Amazon RDS MySQL';
      case 'mongodb':
        return 'MongoDB';
      case 'mysql':
        return 'MySQL';
      case 'postgresql':
        return 'PostgreSQL';
      case 'proxysql':
        return 'ProxySQL';
      default:
        return '';
    }
  }
}
