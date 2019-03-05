import {Component, OnInit} from '@angular/core';
import {AgentsService} from '../../inventory-api/services/agents.service';
import {AddRDSExporter, ExternalExporter, MongoExporter, MySQLExporter, NodeExporter, PmmAgent} from '../inventory.service';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.scss']
})
export class AgentsTableComponent implements OnInit {
  public agentsData$: Observable<{}>;

  public externalExporter = new ExternalExporter();
  public mongoExporter = new MongoExporter();
  public mySQLExporter = new MySQLExporter();
  public nodeExporter = new NodeExporter();
  public rdsExporter = new AddRDSExporter();
  public pmmAgent = new PmmAgent();

  constructor(private agentsService: AgentsService) {
    this.agentsData$ = this.agentsService.ListAgents({});
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
    this.agentsService.RemoveAgent({agent_id: id}).subscribe();
  }
}
