import {Component, OnDestroy, OnInit} from '@angular/core';
import {NodesService} from '../../inventory-api/services/nodes.service';
import {Container, Generic, Remote, RemoteAmazonRDS} from '../inventory.service';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-nodes-table',
  templateUrl: './nodes-table.component.html',
  styleUrls: ['./nodes-table.component.scss']
})
export class NodesTableComponent implements OnInit {
  public nodeData$: Observable<{}>;

  public container = new Container();
  public generic = new Generic();
  public remote = new Remote();
  public remoteAmazonRDS = new RemoteAmazonRDS();

  constructor(private nodesService: NodesService) {
    this.nodeData$ = this.nodesService.ListNodes({});
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
