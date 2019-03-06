import {Component, OnDestroy, OnInit} from '@angular/core';
import {NodesService} from '../../inventory-api/services/nodes.service';
import {Container, Generic, Remote, RemoteAmazonRDS} from '../inventory.service';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {of} from 'rxjs/internal/observable/of';
import {NodesTableService} from './nodes-table.service';
import {ExternalExporterModel} from '../agents-table/models/external-exporter.model';
import {MongodbExporterModel} from '../agents-table/models/mongodb-exporter.model';
import {MysqlExporterModel} from '../agents-table/models/mysql-exporter.model';
import {NodeExporterModel} from '../agents-table/models/node-exporter.model';
import {PmmAgentModel} from '../agents-table/models/pmm-agent.model';
import {RdsExporterModel} from '../agents-table/models/rds-exporter.model';
import {ContainerModel} from './models/container.model';
import {GenericModel} from './models/generic.model';
import {RemoteModel} from './models/remote.model';
import {RemoteAmazonRdsModel} from './models/remote-amazon-rds.model';

@Component({
  selector: 'app-nodes-table',
  templateUrl: './nodes-table.component.html',
  styleUrls: ['./nodes-table.component.scss']
})
export class NodesTableComponent implements OnInit {
  public nodesData: any;

  public container = new Container();
  public generic = new Generic();
  public remote = new Remote();
  public remoteAmazonRDS = new RemoteAmazonRDS();

  constructor(private nodesService: NodesService, private nodesTableService: NodesTableService) {
    this.nodesService.ListNodes({}).subscribe(item => {
      const dataStructure = this.generateAgentStructure(item);
      this.nodesTableService.setNodesData(dataStructure);
    });
    this.nodesTableService.nodesData.subscribe(agents => {
      if (agents.length) {
        this.nodesData = agents.filter(agent => !agent.isDeleted);
      }
    });
  }

  checkAgentType(params, type) {
    let model = {};
    switch (type) {
      case 'container':
        model = new ContainerModel(params, type);
        break;
      case 'generic':
        model = new GenericModel(params, type);
        break;
      case 'remote':
        model = new RemoteModel(params, type);
        break;
      case 'remote_amazon_rds':
        model = new RemoteAmazonRdsModel(params, type);
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
    // this.nodeData = {
    //   container: [
    //     {
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       docker_container_id: 'docker_container_id',
    //       docker_container_name: 'docker_container_name',
    //       machine_id: 'machine_id',
    //       node_id: 'node_id',
    //       node_name: 'node_name'
    //     }
    //   ],
    //   generic: [
    //     {
    //       address: 'address',
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       distro: 'distro',
    //       distro_version: 'distro_version',
    //       machine_id: 'machine_id',
    //       node_id: 'node_id',
    //       node_name: 'node_name'
    //     }
    //   ],
    //   remote: [
    //     {
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       node_id: 'node_id',
    //       node_name: 'node_name'
    //     }
    //   ],
    //   remote_amazon_rds: [
    //     {
    //       custom_labels: {
    //         additionalProp1: 'additionalProp1',
    //         additionalProp2: 'additionalProp2',
    //         additionalProp3: 'additionalProp3'
    //       },
    //       instance: 'instance',
    //       node_id: 'node_id',
    //       node_name: 'node_name',
    //       region: 'region'
    //     }
    //   ]
    // }
  }

  addContainer() {
    this.nodesService.AddContainerNode(this.container);
  }

  addGeneric() {
    this.nodesService.AddGenericNode(this.generic);
  }

  addRemote() {
    this.nodesService.AddRemoteNode(this.remote);
  }

  remoteAmazonRDSNode() {
    this.nodesService.AddRemoteAmazonRDSNode(this.remoteAmazonRDS);
  }

  removeNode(id) {
    this.nodesService.RemoveNode({node_id: id});
  }
}
