import {Component, OnInit} from '@angular/core';
import {RemoteInstancesListService} from './remote-instances-list.service';
import {RemoteInstance, RemoteInstanceNode, RemoteInstanceService} from '../add-remote-instances/add-remote-instance.service';
import {environment} from '../environment';

@Component({
  selector: 'app-remote-instances-list',
  templateUrl: './remote-instances-list.component.html',
  styleUrls: ['./remote-instances-list.component.scss']
})
export class RemoteInstancesListComponent implements OnInit {
  public allInstances: RemoteInstance[] = [];
  public remoteInstances: RemoteInstance[] = [];
  public registeredInstances: string[] = [];
  public path: string[] = ['instance']; // same variable as for the loop that generates the table rows
  order = 1;
  isSorted = false;
  isRegion = false;
  isDemo = false;
  isLoading: boolean;
  errorMessage: string;

  constructor(private remoteInstancesListService: RemoteInstancesListService) {
    this.isDemo = environment.demoHosts.includes(location.hostname);
  }

  async ngOnInit() {
    this.errorMessage = '';
    try {
      this.isLoading = true;
      this.allInstances = await this.remoteInstancesListService.getList();
    } catch (err) {
      this.errorMessage = err.json().error
    }
    this.errorMessage = this.allInstances.length === 0 ? 'The list of instances is empty' : '';
    this.isLoading = false;
  }

  async disableInstance(node: RemoteInstanceNode, service: RemoteInstanceService) {
    if (this.isDemo) {
      return false;
    }

    const text = `Are you sure you want to delete? ${node.name}`;
    if (confirm(text)) {
      try {
        const res = await this.remoteInstancesListService.disable(node, service);
        await this.getRegistered(service);
      } catch (err) {
        this.errorMessage = err.json().error;
      }
    }
  }

  async getRegistered(service: RemoteInstanceService) {
    this.errorMessage = '';
    try {
      this.allInstances = await this.remoteInstancesListService.getRegistered(service);
    } catch (err) {
      this.errorMessage = err.json().error;
    }
    this.errorMessage = this.allInstances.length === 0 ? 'The list of instances is empty' : '';
    this.registeredInstances = [];
    if (this.remoteInstances !== undefined) {
      this.remoteInstances.forEach(element => {
        this.registeredInstances.push(element.node.name + ':' + element.node.region);
      });
    }
  }

  sortInstances(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1); // change order
    this.isSorted = true;
    this.isRegion = prop === 'node.region';
  }
}
