import {NodeExporterModel} from './node-exporter.model';
import {ExternalExporterModel} from './external-exporter.model';
import {MongodbExporterModel} from './mongodb-exporter.model';
import {MysqlExporterModel} from './mysql-exporter.model';
import {PmmAgentModel} from './pmm-agent.model';
import {RdsExporterModel} from './rds-exporter.model';

export class AgentsTableModel {
  external_exporter?: Array<ExternalExporterModel>;
  mongodb_exporter?: Array<MongodbExporterModel>;
  mysqld_exporter?: Array<MysqlExporterModel>;
  node_exporter?: Array<NodeExporterModel>;
  pmm_agent?: Array<PmmAgentModel>;
  rds_exporter?: Array<RdsExporterModel>;

  constructor(agentsData) {
    // if (agentsData.external_exporter && agentsData.external_exporter.length) {
    //   this.external_exporter = agentsData.external_exporter.map(externalData => new ExternalExporterModel(externalData));
    // }
    // if (agentsData.mongodb_exporter && agentsData.mongodb_exporter.length) {
    //   this.mongodb_exporter = agentsData.mongodb_exporter.map(mongodbData => new MongodbExporterModel(mongodbData));
    // }
    // if (agentsData.mysqld_exporter && agentsData.mysqld_exporter.length) {
    //   this.mysqld_exporter = agentsData.mysqld_exporter.map(mysqlData => new MysqlExporterModel(mysqlData));
    // }
    // if (agentsData.node_exporter && agentsData.node_exporter.length) {
    //   this.node_exporter = agentsData.node_exporter.map(nodeData => new NodeExporterModel(nodeData));
    // }
    // if (agentsData.pmm_agent && agentsData.pmm_agent.length) {
    //   this.pmm_agent = agentsData.pmm_agent.map(pmmAgentData => new PmmAgentModel(pmmAgentData));
    // }
    // if (agentsData.rds_exporter && agentsData.rds_exporter.length) {
    //   this.rds_exporter = agentsData.rds_exporter.map(rdsData => new RdsExporterModel(rdsData));
    // }
  }
}

