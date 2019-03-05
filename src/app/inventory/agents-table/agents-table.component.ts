import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AgentsService} from '../../inventory-api/services/agents.service';
import {AddRDSExporter, ExternalExporter, MongoExporter, MySQLExporter, NodeExporter, PmmAgent} from '../inventory.service';

@Component({
  selector: 'app-agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.scss']
})
export class AgentsTableComponent implements OnInit, OnDestroy {
  public agentsData: any;
  private agentsSubscription: any;

  public externalExporter = new ExternalExporter();
  public mongoExporter = new MongoExporter();
  public mySQLExporter = new MySQLExporter();
  public nodeExporter = new NodeExporter();
  public rdsExporter = new AddRDSExporter();
  public pmmAgent = new PmmAgent();

  constructor(private agentsService: AgentsService) {
    this.agentsSubscription = this.agentsService.ListAgents({}).subscribe(data => this.agentsData = data);
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

  ngOnDestroy() {
    this.agentsSubscription.unsubscribe();
  }

  // Agents
  addExternalExporter() {
    this.agentsService.AddExternalExporter(this.externalExporter).subscribe(data => console.log('externalExporter - ', data));
  }

  addMongoDBExporter() {
    this.agentsService.AddMongoDBExporter(this.mongoExporter).subscribe(data => console.log('mongoExporter - ', data));
  }

  addMySQLdExporter() {
    this.agentsService.AddMySQLdExporter(this.mySQLExporter).subscribe(data => console.log('mySQLExporter - ', data));
  }

  addNodeExporter() {
    this.agentsService.AddNodeExporter(this.nodeExporter).subscribe(data => console.log('nodeExporter - ', data));
  }

  addPmmAgent() {
    this.agentsService.AddPMMAgent(this.pmmAgent).subscribe(data => console.log('pmmAgent - ', data));
  }

  addRdsExporter() {
    this.agentsService.AddRDSExporter(this.rdsExporter).subscribe(data => console.log('rdsExporter - ', data));
  }

  // END Agents

}
