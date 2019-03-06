import {Component, OnInit} from '@angular/core';
import {AgentsService} from '../../inventory-api/services/agents.service';
import {AddRDSExporter, ExternalExporter, MongoExporter, MySQLExporter, NodeExporter, PmmAgent} from '../inventory.service';
import {ExternalExporterModel} from './models/external-exporter.model';
import {RdsExporterModel} from './models/rds-exporter.model';
import {PmmAgentModel} from './models/pmm-agent.model';
import {NodeExporterModel} from './models/node-exporter.model';
import {MysqlExporterModel} from './models/mysql-exporter.model';
import {MongodbExporterModel} from './models/mongodb-exporter.model';
import {AgentsTableService} from './agents-table.service';

// import {CustomAgentsTableModel} from './models/custom-agents-table.model';

@Component({
  selector: 'app-agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.scss']
})
export class AgentsTableComponent implements OnInit {
  public agentsData: any;

  public externalExporter = new ExternalExporter();
  public mongoExporter = new MongoExporter();
  public mySQLExporter = new MySQLExporter();
  public nodeExporter = new NodeExporter();
  public rdsExporter = new AddRDSExporter();
  public pmmAgent = new PmmAgent();

  constructor(private agentsService: AgentsService, private agentTableService: AgentsTableService) {
    this.agentsService.ListAgents({}).subscribe(item => {
      const dataStructure = this.generateAgentStructure(item);
      this.agentTableService.setAgentsData(dataStructure);
    });
    this.agentTableService.agentsData.subscribe(agents => {
      if (agents.length) {
        this.agentsData = agents.filter(agent => !agent.isDeleted);
      }
    });
  }

  checkAgentType(params, type) {
    let model = {};
    switch (type) {
      case 'external_exporter':
        model = new ExternalExporterModel(params, type);
        break;
      case 'mongodb_exporter':
        model = new MongodbExporterModel(params, type);
        break;
      case 'mysqld_exporter':
        model = new MysqlExporterModel(params, type);
        break;
      case 'node_exporter':
        model = new NodeExporterModel(params, type);
        break;
      case 'pmm_agent':
        model = new PmmAgentModel(params, type);
        break;
      case 'rds_exporter':
        model = new RdsExporterModel(params, type);
        break;
    }
    return model;
  }

  generateAgentStructure(item) {
    const newData2 = Object.keys(item).map(agentType => new Object({agentType: agentType, params: item[agentType]}));
    const newResult = newData2.map(agent => agent['params'].map(arrItem => this.checkAgentType(arrItem, agent['agentType'])));
    return [].concat(...newResult);
  }

  ngOnInit() {
    // this.agentsData = {
    //   external_exporter: [
    //     {
    //       agent_id: 'agent_id',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       metrics_url: 'metrics_url'
    //     }
    //   ],
    //   mongodb_exporter: [
    //     {
    //       agent_id: 'agent_id',
    //       connection_string: 'connection_string',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       listen_port: 0,
    //       runs_on_node_id: 'runs_on_node_id',
    //       service_id: 'service_id',
    //       status: 'status'
    //     }
    //   ],
    //   mysqld_exporter: [
    //     {
    //       agent_id: 'agent_id',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       listen_port: 0,
    //       password: 'password',
    //       runs_on_node_id: 'runs_on_node_id',
    //       service_id: 'service_id',
    //       status: 'status',
    //       username: 'username'
    //     }
    //   ],
    //   node_exporter: [
    //     {
    //       agent_id: 'agent_id',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       listen_port: 0,
    //       node_id: 'node_id',
    //       status: 'status'
    //     }
    //   ],
    //   pmm_agent: [
    //     {
    //       agent_id: 'agent_id',
    //       connected: true,
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       node_id: 'node_id'
    //     }
    //   ],
    //   rds_exporter: [
    //     {
    //       agent_id: 'agent_id',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       listen_port: 0,
    //       runs_on_node_id: 'runs_on_node_id',
    //       service_ids: [
    //         'service_ids-0'
    //       ],
    //       status: 'AGENT_STATUS_INVALID'
    //     }
    //   ]
    // }
  }

  addExternalExporter() {
    this.agentsService.AddExternalExporter(this.externalExporter).subscribe();
  }

  addMongoDBExporter() {
    this.agentsService.AddMongoDBExporter(this.mongoExporter).subscribe();
  }

  addMySQLdExporter() {
    this.agentsService.AddMySQLdExporter(this.mySQLExporter).subscribe();
  }

  addNodeExporter() {
    this.agentsService.AddNodeExporter(this.nodeExporter).subscribe();
  }

  addPmmAgent() {
    this.agentsService.AddPMMAgent(this.pmmAgent).subscribe();
  }

  addRdsExporter() {
    this.agentsService.AddRDSExporter(this.rdsExporter).subscribe();
  }

  removeAgents(id) {
    this.agentsService.RemoveAgent({agent_id: id}).subscribe(() => {
      this.agentTableService.setAgentsData(this.agentsData);
    });
  }
}
