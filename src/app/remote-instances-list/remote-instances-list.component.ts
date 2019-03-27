import { Component, OnInit } from '@angular/core';
import { RemoteInstancesListService } from './remote-instances-list.service';
import { RemoteInstance, RemoteInstanceNode, RemoteInstanceService } from '../add-remote-instances/add-remote-instance.service';
import { environment } from '../environment';
import { AddAmazonRDSService } from '../add-amazon-rds/add-amazon-rds.service';

@Component({
  selector: 'app-remote-instances-list',
  templateUrl: './remote-instances-list.component.html',
  styleUrls: ['./remote-instances-list.component.scss']
})
export class RemoteInstancesListComponent implements OnInit {
  public allInstances: RemoteInstance[] = [];
  path: string[] = ['instance']; // same variable as for the loop that generates the table rows
  order = 1;
  isSorted = false;
  isRegion = false;
  isDemo = false;
  errorMessage: string;

  constructor(private remoteInstancesListService: RemoteInstancesListService, private awsService: AddAmazonRDSService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }

  async ngOnInit() {
    this.errorMessage = '';
    try {
      this.allInstances = await this.remoteInstancesListService.getList();
    } catch (err) {
      this.errorMessage = err.json().error;
      return;
    }
    this.errorMessage = this.allInstances === undefined ? 'The list of instances is empty' : '';
  }

  async disableInstance(node: RemoteInstanceNode, service: RemoteInstanceService) {
    if (this.isDemo) {
      return false;
    }
    const text = `Are you sure you want to delete? ${node.name}`;
    if (confirm(text)) {
      try {
        if (service.type !== 'rds') {
          await this.remoteInstancesListService.disable(node, service);
        } else {
          await this.awsService.disable(node);
        }
        this.allInstances = await this.remoteInstancesListService.getList();
      } catch (err) {
        this.errorMessage = err.json().error;
        return;
      }
      this.errorMessage = this.allInstances === undefined ? 'The list of instances is empty' : '';
    }
  }

  sortInstances(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1); // change order
    this.isSorted = true;
    this.isRegion = prop === 'node.region';
  }
}
