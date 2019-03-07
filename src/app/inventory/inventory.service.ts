import {Injectable} from '@angular/core';
import {ExternalExporterModel} from './agents-table/models/external-exporter.model';
import {MongodbExporterModel} from './agents-table/models/mongodb-exporter.model';
import {MysqlExporterModel} from './agents-table/models/mysql-exporter.model';
import {NodeExporterModel} from './agents-table/models/node-exporter.model';
import {PmmAgentModel} from './agents-table/models/pmm-agent.model';
import {RdsExporterModel} from './agents-table/models/rds-exporter.model';
import {ContainerModel} from './nodes-table/models/container.model';
import {GenericModel} from './nodes-table/models/generic.model';
import {RemoteModel} from './nodes-table/models/remote.model';
import {RemoteAmazonRdsModel} from './nodes-table/models/remote-amazon-rds.model';
import {AmazonRdsMysqlModel} from './services-table/models/amazon-rds-mysql.model';
import {MongodbModel} from './services-table/models/mongodb.model';
import {MysqlModel} from './services-table/models/mysql.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() {}

  generateStructure(item) {
    const addAgentType = Object.keys(item).map(agentType => new Object({agentType: agentType, params: item[agentType]}));
    const createParams = addAgentType.map(agent => agent['params'].map(arrItem => this.checkType(arrItem, agent['agentType'])));
    return [].concat(...createParams);
  }

  checkType(params, type) {
    let model = {};
    switch (type) {
      case 'external_exporter':
        model = new ExternalExporterModel(params, 'External exporter');
        break;
      case 'mongodb_exporter':
        model = new MongodbExporterModel(params, 'MongoDB');
        break;
      case 'mysqld_exporter':
        model = new MysqlExporterModel(params, 'MySQL exporter');
        break;
      case 'node_exporter':
        model = new NodeExporterModel(params, 'Node exporter');
        break;
      case 'pmm_agent':
        model = new PmmAgentModel(params, 'PMM Agent');
        break;
      case 'rds_exporter':
        model = new RdsExporterModel(params, 'RDS exporter');
        break;
      case 'container':
        model = new ContainerModel(params, 'Container');
        break;
      case 'generic':
        model = new GenericModel(params, 'Generic');
        break;
      case 'remote':
        model = new RemoteModel(params, 'Remote');
        break;
      case 'remote_amazon_rds':
        model = new RemoteAmazonRdsModel(params, 'Remote Amazon RDS');
        break;
      case 'amazon_rds_mysql':
        model = new AmazonRdsMysqlModel(params, 'Amazon RDS MySQL');
        break;
      case 'mongodb':
        model = new MongodbModel(params, 'MongoDB');
        break;
      case 'mysql':
        model = new MysqlModel(params, 'MySQL');
        break;
    }
    return model;
  }
}
