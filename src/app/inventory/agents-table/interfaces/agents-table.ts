import {ExternalExporterModel} from '../models/external-exporter.model';
import {MongodbExporterModel} from '../models/mongodb-exporter.model';
import {MysqlExporterModel} from '../models/mysql-exporter.model';
import {NodeExporterModel} from '../models/node-exporter.model';
import {PmmAgentModel} from '../models/pmm-agent.model';
import {RdsExporterModel} from '../models/rds-exporter.model';

export interface AgentsTable {
  external_exporter?: Array<ExternalExporterModel>;
  mongodb_exporter?: Array<MongodbExporterModel>;
  mysqld_exporter?: Array<MysqlExporterModel>;
  node_exporter?: Array<NodeExporterModel>;
  pmm_agent?: Array<PmmAgentModel>;
  rds_exporter?: Array<RdsExporterModel>;
}
