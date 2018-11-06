import {Component, OnInit} from '@angular/core';
import {RemoteInstancesListService} from './remote-instances-list.service';
import {RemoteInstance, RemoteInstanceNode, RemoteInstanceService} from '../add-remote-instances/add-remote-instance.service';
import {environment} from '../environment';
import {AddAwsService} from '../add-aws/add-aws.service';

@Component({
  selector: 'app-remote-instances-list',
  templateUrl: './remote-instances-list.component.html',
  styleUrls: ['./remote-instances-list.component.scss']
})
export class RemoteInstancesListComponent implements OnInit {
  public allInstances: RemoteInstance[] = [];
  public path: string[] = ['instance']; // same variable as for the loop that generates the table rows
  order = 1;
  isSorted = false;
  isRegion = false;
  isDemo = false;
  isLoading: boolean;
  errorMessage: string;

  constructor(private remoteInstancesListService: RemoteInstancesListService, private awsService: AddAwsService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }

  async ngOnInit() {
    this.errorMessage = '';
    this.isLoading = true;
    try {
      this.allInstances = await this.remoteInstancesListService.getList();
    } catch (err) {
      this.errorMessage = err.json().error;
      this.isLoading = false;
      return;
    }
    this.errorMessage = this.allInstances === undefined ? 'The list of instances is empty' : '';
    this.isLoading = false;
  }

  async disableInstance(node: RemoteInstanceNode, service: RemoteInstanceService) {
    if (this.isDemo) {
      return false;
    }
    this.isLoading = false;
    const text = `Are you sure you want to delete? ${node.name}`;
    if (confirm(text)) {
      try {
        if (service.type !== 'rds') {
          const res = await this.remoteInstancesListService.disable(node, service);
        } else {
          const res = await this.awsService.disable(node);
        }
        this.allInstances = await this.remoteInstancesListService.getList();
      } catch (err) {
        this.errorMessage = err.json().error;
        this.isLoading = false;
        return;
      }
      this.errorMessage = this.allInstances === undefined ? 'The list of instances is empty' : '';
      this.isLoading = false;
    }
  }

  sortInstances(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1); // change order
    this.isSorted = true;
    this.isRegion = prop === 'node.region';
  }
}
