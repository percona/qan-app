import {Component, OnDestroy, OnInit} from '@angular/core';
import {NodesService} from '../../inventory-api/services/nodes.service';
import {Container, Generic, Remote, RemoteAmazonRDS} from '../inventory.service';

@Component({
  selector: 'app-nodes-table',
  templateUrl: './nodes-table.component.html',
  styleUrls: ['./nodes-table.component.scss']
})
export class NodesTableComponent implements OnInit, OnDestroy {
  public nodeData: any;
  private nodeSubscription: any;

  public container = new Container();
  public generic = new Generic();
  public remote = new Remote();
  public remoteAmazonRDS = new RemoteAmazonRDS();

  constructor(private nodesService: NodesService) {
    this.nodeSubscription = this.nodesService.ListNodes({}).subscribe(data => console.log('ListNodes - ', data));
  }

  ngOnInit() {
    this.nodeData = {
      container: [
        {
          custom_labels: {
            additionalProp1: 'additionalProp1',
            additionalProp2: 'additionalProp2',
            additionalProp3: 'additionalProp3'
          },
          docker_container_id: 'docker_container_id',
          docker_container_name: 'docker_container_name',
          machine_id: 'machine_id',
          node_id: 'node_id',
          node_name: 'node_name'
        }
      ],
      generic: [
        {
          address: 'address',
          custom_labels: {
            additionalProp1: 'additionalProp1',
            additionalProp2: 'additionalProp2',
            additionalProp3: 'additionalProp3'
          },
          distro: 'distro',
          distro_version: 'distro_version',
          machine_id: 'machine_id',
          node_id: 'node_id',
          node_name: 'node_name'
        }
      ],
      remote: [
        {
          custom_labels: {
            additionalProp1: 'additionalProp1',
            additionalProp2: 'additionalProp2',
            additionalProp3: 'additionalProp3'
          },
          node_id: 'node_id',
          node_name: 'node_name'
        }
      ],
      remote_amazon_rds: [
        {
          custom_labels: {
            additionalProp1: 'additionalProp1',
            additionalProp2: 'additionalProp2',
            additionalProp3: 'additionalProp3'
          },
          instance: 'instance',
          node_id: 'node_id',
          node_name: 'node_name',
          region: 'region'
        }
      ]
    }
  }

  ngOnDestroy() {
    this.nodeSubscription.unsubscribe();
  }

  addContainer() {
    this.nodesService.AddContainerNode(this.container).subscribe(data => console.log('addContainer - ', data));
  }

  addGeneric() {
    this.nodesService.AddGenericNode(this.generic).subscribe(data => console.log('addGeneric - ', data))
  }

  addRemote() {
    this.nodesService.AddRemoteNode(this.remote).subscribe(data => console.log('addRemote - ', data))
  }

  remoteAmazonRDSNode() {
    this.nodesService.AddRemoteAmazonRDSNode(this.remoteAmazonRDS).subscribe(data => console.log('remoteAmazonRDS - ', data))
  }

}
